export const R = (i: number, k: number) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
// Deterministic (no Math.random) so the website and the rendered video look identical.
export function Fx({ t }: { t: number }) {
  return (
    <svg className="fx" viewBox="0 0 360 600">
      {Array.from({ length: 16 }, (_, i) => {
        const y = ((t * (18 + R(i, 1) * 28) + R(i, 2) * 640) % 660) - 30, x = R(i, 3) * 360 + Math.sin(t * 1.1 + i) * 16;
        return <ellipse key={i} rx={5 + R(i, 4) * 3} ry="2.6" opacity=".75" style={{ fill: i % 3 ? "var(--acc)" : "var(--soft)" }}
          transform={`translate(${x} ${y}) rotate(${t * 50 * (R(i, 5) - .5) * 2 + i * 40})`} />;
      })}
      {Array.from({ length: 10 }, (_, i) => {
        const o = .5 + .5 * Math.sin(t * 2.6 + i * 2.1);
        return <path key={i} d="M0-6Q0 0 6 0Q0 0 0 6Q0 0-6 0Q0 0 0-6Z" fill="#e8b84a" opacity={o * .9}
          transform={`translate(${20 + R(i, 6) * 320} ${40 + R(i, 7) * 520}) scale(${.6 + o * .8})`} />;
      })}
    </svg>
  );
}
