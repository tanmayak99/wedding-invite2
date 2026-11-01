const SK = "#c68a62", HR = "#2a1a1a";
const Face = ({ y = -150 }: { y?: number }) => (
  <g>
    <circle cy={y} r="19" fill={SK} />
    <circle cx="-7" cy={y} r="1.8" fill={HR} /><circle cx="7" cy={y} r="1.8" fill={HR} />
    <path d={`M-6 ${y + 9}Q0 ${y + 15} 6 ${y + 9}`} stroke={HR} strokeWidth="1.6" fill="none" strokeLinecap="round" />
  </g>
);
const Arms = () => <g stroke={SK} strokeWidth="7" strokeLinecap="round" fill="none"><path d="M-14 -118Q-27 -95 -18 -72" /><path d="M14 -118Q27 -95 18 -72" /></g>;
function Bride({ x, t, dance }: { x: number; t: number; dance: boolean }) {
  const s = dance ? 4 : 2, a = Math.sin(t * s + x) * (dance ? 6 : 2.5), b = Math.abs(Math.sin(t * s)) * (dance ? 6 : 2);
  return (
    <g transform={`translate(${x} ${196 - b}) rotate(${a})`}>
      <ellipse cy={b} rx="40" ry="4" fill="#0002" />
      <path d="M-21 -150Q-24 -176 0 -176Q24 -176 21 -150L25 -100Q10 -96 8 -120L-8 -120Q-10 -96 -25 -100Z" fill={HR} />
      <path d="M-14 -120L14 -120L46 0L-46 0Z" style={{ fill: "var(--acc)" }} /><path d="M-43 -10L43 -10" stroke="#e8b84a" strokeWidth="3" />
      <path d="M-16 -122Q-32 -80 -22 -30" stroke="#e8b84a" strokeWidth="6" fill="none" opacity=".8" />
      <Arms /><Face />
      <path d="M-20 -153Q0 -178 20 -153Q0 -163 -20 -153Z" fill={HR} /><circle cy="-160" r="2.2" fill="#c0262d" />
      <circle cx="-20" cy="-144" r="2.2" fill="#e8b84a" /><circle cx="20" cy="-144" r="2.2" fill="#e8b84a" />
    </g>
  );
}
function Groom({ x, t, dance }: { x: number; t: number; dance: boolean }) {
  const s = dance ? 4 : 2, a = Math.sin(t * s + x + 1.5) * (dance ? 6 : 2.5), b = Math.abs(Math.sin(t * s + 1.5)) * (dance ? 6 : 2);
  return (
    <g transform={`translate(${x} ${196 - b}) rotate(${a})`}>
      <ellipse cy={b} rx="34" ry="4" fill="#0002" />
      <path d="M-20 -30L-2 -30L-3 0L-20 0Z M20 -30L2 -30L3 0L20 0Z" fill="#efe0c4" />
      <path d="M-18 -122L18 -122L22 -30L-22 -30Z" fill="#f5e6cf" /><path d="M-18 -122L-6 -122L10 -30" stroke="var(--acc)" strokeWidth="8" fill="none" />
      <Arms /><Face />
      <path d="M-20 -152Q0 -180 20 -152Q10 -166 -20 -152Z" fill={HR} /><path d="M-6 -143Q0 -146 6 -143" stroke={HR} strokeWidth="1.4" fill="none" />
    </g>
  );
}
// Placeholder art. Set "art" in invite.config.json (a file in public/) to use your own image instead.
export function Figures({ n, art, t = 0, dance = false }: { n: number; art: string; t?: number; dance?: boolean }) {
  if (art) return <img className="art" src={art} alt="" />;
  return (
    <svg className="art" viewBox="0 0 240 200">
      {n === 1 ? <Bride x={120} t={t} dance={dance} /> : <><Bride x={78} t={t} dance={dance} /><Groom x={162} t={t} dance={dance} /></>}
    </svg>
  );
}
