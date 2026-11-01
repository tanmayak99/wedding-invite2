type M = { leaf: string; f1: string; f2: string; n: number };
const MOT: Record<string, M> = {
  peach: { leaf: "#6f9a5a", f1: "#e9758f", f2: "#f6c36a", n: 8 },
  mint: { leaf: "#2f8f6b", f1: "#e0a23a", f2: "#1f4d3a", n: 6 },
  lavender: { leaf: "#7a4fb0", f1: "#d1478a", f2: "#f2c14e", n: 5 },
  butter: { leaf: "#5d9a3a", f1: "#f3a712", f2: "#e07b00", n: 12 },
  blush: { leaf: "#4f8a52", f1: "#e8736c", f2: "#fbd6a0", n: 7 },
  cream: { leaf: "#4f7a42", f1: "#7a2f55", f2: "#ecd3b0", n: 5 },
  rose: { leaf: "#4f8a52", f1: "#d9608a", f2: "#f6c36a", n: 8 },
};
const flower = (k: number, x: number, y: number, s: number, m: M, t: number) => (
  <g key={k} transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(t + x) * 6})`}>
    {Array.from({ length: m.n }, (_, i) => <ellipse key={i} cy="-10" rx="4.6" ry="10" fill={m.f1} transform={`rotate(${(i * 360) / m.n})`} />)}
    <circle r="4.5" fill={m.f2} />
  </g>
);
function Vine({ a, b, m, t }: { a: number[]; b: number[]; m: M; t: number }) {
  const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.floor(Math.hypot(dx, dy) / 24), ang = (Math.atan2(dy, dx) * 180) / Math.PI;
  return (
    <g>
      <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={m.leaf} strokeWidth="1.6" />
      {Array.from({ length: n }, (_, i) => (
        <ellipse key={i} cx="9" rx="9" ry="3.4" fill={m.leaf}
          transform={`translate(${a[0] + (dx * (i + .5)) / n} ${a[1] + (dy * (i + .5)) / n}) rotate(${ang + (i % 2 ? 48 : -48) + Math.sin(t * 1.6 + i) * 7})`} />
      ))}
    </g>
  );
}
export function Border({ theme, t }: { theme: string; t: number }) {
  const m = MOT[theme] || MOT.peach, P = 16, W = 360, H = 600;
  return (
    <svg className="bd" viewBox="0 0 360 600">
      <Vine a={[50, P]} b={[310, P]} m={m} t={t} /><Vine a={[50, H - P]} b={[310, H - P]} m={m} t={t} />
      <Vine a={[P, 50]} b={[P, 550]} m={m} t={t} /><Vine a={[W - P, 50]} b={[W - P, 550]} m={m} t={t} />
      {[[P, P], [W - P, P], [P, H - P], [W - P, H - P]].map(([x, y], i) => (
        <g key={i}>{flower(i, x, y, 1.7, m, t)}{flower(i + 9, x + (x < 180 ? 26 : -26), y + (y < 300 ? 16 : -16), .9, m, t + 1)}</g>
      ))}
      {[90, 180, 270].map((x, i) => flower(20 + i, x, P, .7, m, t + i))}
    </svg>
  );
}
