import type { Cfg } from "./util";
export const Tabs = ({ cfg, page, onPick }: { cfg: Cfg; page: number; onPick?: (p: number) => void }) => (
  <div className="tabs">
    {cfg.events.map((e, i) => (
      <button key={e.id} className={page === i + 1 ? "on" : ""} onClick={() => onPick?.(i + 1)}>
        {e.title} {e.emoji}
      </button>
    ))}
  </div>
);
