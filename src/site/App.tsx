import { useEffect, useState } from "react";
import cfg from "../../invite.config.json";
import { Card } from "../shared/Card";
import { Tabs } from "../shared/Tabs";
import { pagesOf } from "../shared/util";
import { saveDate } from "./ics";

export default function App() {
  const n = pagesOf(cfg).length;
  const [page, setPage] = useState(0);
  const [flip, setFlip] = useState(1);
  const [s, setS] = useState(1);

  useEffect(() => { // calendar-flip on every page change
    let t0 = 0, id = 0;
    const step = (t: number) => {
      t0 = t0 || t;
      const f = Math.min(1, (t - t0) / 600);
      setFlip(1 - Math.pow(1 - f, 3));
      if (f < 1) id = requestAnimationFrame(step);
    };
    setFlip(0);
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [page]);

  useEffect(() => { // scale the 360x600 card to fit the screen
    const r = () => setS(Math.min(1.5, (innerWidth - 24) / 360, (innerHeight - 170) / 600));
    r(); addEventListener("resize", r);
    return () => removeEventListener("resize", r);
  }, []);

  const go = (d: number) => setPage((p) => Math.max(0, Math.min(n - 1, p + d)));
  return (
    <div className="stage">
      <Tabs cfg={cfg} page={page} onPick={setPage} />
      <div style={{ width: 360 * s, height: 600 * s, marginTop: 14 }}>
        <div style={{ width: 360, height: 600, transform: `scale(${s})`, transformOrigin: "top left" }}>
          <Card cfg={cfg} page={page} flip={flip} asset={(p) => import.meta.env.BASE_URL + p} onSave={(i) => saveDate(cfg, i)} />
        </div>
      </div>
      <nav>
        <button onClick={() => go(-1)} disabled={page === 0}>‹ Back</button>
        <button onClick={() => go(1)} disabled={page === n - 1}>Next ›</button>
      </nav>
    </div>
  );
}
