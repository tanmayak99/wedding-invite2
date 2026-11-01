// Placeholder art. Set "art" in invite.config.json (a file in public/) to replace it with your own image.
export function Figures({ n, art }: { n: number; art: string }) {
  if (art) return <img className="art" src={art} alt="" />;
  const fig = (x: number, skin: string, cloth: string) => (
    <g transform={`translate(${x} 0)`}>
      <circle cx="0" cy="62" r="22" style={{ fill: skin }} />
      <path d="M-34 190 Q-34 100 0 100 Q34 100 34 190Z" style={{ fill: cloth }} />
    </g>
  );
  return (
    <svg className="art" viewBox="0 0 240 200">
      {n === 1 ? fig(120, "#c68a62", "var(--acc)") : <>{fig(80, "#c68a62", "var(--acc)")}{fig(160, "#b87850", "var(--ink)")}</>}
    </svg>
  );
}
