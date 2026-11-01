import { useEffect, useRef, useState } from "react";
import cfg from "../../invite.config.json";
import { Card } from "../shared/Card";
import { Tabs } from "../shared/Tabs";
import { pagesOf } from "../shared/util";
import { saveDate } from "./ics";

const music = cfg.video.music || "music/theme.mp3"; // set video.music to "none" to disable

export default function App() {
  const n = pagesOf(cfg).length;
  const [page, setPage] = useState(0);
  const [flip, setFlip] = useState(1);
  const [s, setS] = useState(1);
  const [time, setTime] = useState(0);
  const [on, setOn] = useState(false);
  const au = useRef<HTMLAudioElement>(null);
  const started = useRef(false);

  useEffect(() => { // continuous clock for petals, sparkles, swaying figures
    let id = 0;
    const loop = (t: number) => { setTime(t / 1000); id = requestAnimationFrame(loop); };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

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

  useEffect(() => {
    const r = () => setS(Math.min(1.5, (innerWidth - 24) / 360, (innerHeight - 170) / 600));
    r(); addEventListener("resize", r);
    return () => removeEventListener("resize", r);
  }, []);

  const start = () => { // browsers only allow audio after a tap
    if (started.current || music === "none") return;
    started.current = true;
    au.current?.play().then(() => setOn(true)).catch(() => {});
  };
  const toggle = () => {
    const a = au.current!; started.current = true;
    if (a.paused) { a.play(); setOn(true); } else { a.pause(); setOn(false); }
  };
  const pick = (p: number) => { start(); setPage(p); };
  const go = (d: number) => pick(Math.max(0, Math.min(n - 1, page + d)));

  return (
    <div className="stage">
      <Tabs cfg={cfg} page={page} onPick={pick} />
      <div style={{ width: 360 * s, height: 600 * s, marginTop: 14 }}>
        <div style={{ width: 360, height: 600, transform: `scale(${s})`, transformOrigin: "top left" }}>
          <Card cfg={cfg} page={page} flip={flip} time={time} asset={(p) => import.meta.env.BASE_URL + p} onSave={(i) => saveDate(cfg, i)} />
        </div>
      </div>
      <nav>
        <button onClick={() => go(-1)} disabled={page === 0}>‹ Back</button>
        <button onClick={() => go(1)} disabled={page === n - 1}>Next ›</button>
        {music !== "none" && <button className="mus" onClick={toggle}>{on ? "🔊 Music" : "🔇 Music"}</button>}
      </nav>
      {music !== "none" && <audio ref={au} src={import.meta.env.BASE_URL + music} loop />}
    </div>
  );
}
