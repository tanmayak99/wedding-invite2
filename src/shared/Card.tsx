import type { CSSProperties } from "react";
import "./card.css";
import { themes } from "./themes";
import { Figures } from "./Figures";
import { Cfg, fmtDate, fmtTime, mapUrl, pagesOf, rsvpUrl } from "./util";

function Month({ iso }: { iso: string }) {
  const d = new Date(iso + "T00:00:00Z");
  const y = d.getUTCFullYear(), m = d.getUTCMonth(), day = d.getUTCDate();
  const first = (new Date(Date.UTC(y, m, 1)).getUTCDay() + 6) % 7;
  const n = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  const cells = [...Array(first).fill(0), ...Array.from({ length: n }, (_, i) => i + 1)];
  return (
    <div className="month">
      <h4>{d.toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" })}</h4>
      <div className="grid">
        {"MTWTFSS".split("").map((c, i) => <b key={i}>{c}</b>)}
        {cells.map((c, i) => <span key={i} className={c === day ? "on" : ""}>{c || ""}</span>)}
      </div>
    </div>
  );
}

type Props = { cfg: Cfg; page: number; flip: number; asset: (p: string) => string; onSave?: (i: number) => void };

// Pure view: page + flip (0..1) in, markup out. The website and the video both drive it.
export function Card({ cfg, page, flip, asset, onSave }: Props) {
  const p = pagesOf(cfg)[page];
  const ev = p.k === "event" ? cfg.events[p.i!] : null;
  const t = themes[ev ? ev.theme : p.k === "closing" ? "rose" : "peach"];
  const vars = { "--bg": t.bg, "--ink": t.ink, "--acc": t.acc, "--soft": t.soft } as CSSProperties;
  return (
    <div className="card" style={vars}>
      <div className="rings">{Array.from({ length: 14 }, (_, i) => <i key={i} />)}</div>
      <div className="sheet" style={{ transform: `rotateX(${(1 - flip) * -80}deg)`, opacity: 0.3 + 0.7 * flip }}>
        <div className="frame">
          {p.k === "cover" && (
            <div className="mid">
              <small>{cfg.couple.eyebrow}</small>
              <h1>{cfg.couple.bride}</h1><em>&amp;</em><h1>{cfg.couple.groom}</h1>
              <p className="date">{fmtDate(cfg.couple.date)}</p>
              <p className="tag">{cfg.couple.tagline}</p>
            </div>
          )}
          {ev && (
            <>
              <small>Let's celebrate</small>
              <h2>{ev.title}</h2>
              <Figures n={ev.figures} art={ev.art ? asset(ev.art) : ""} />
              {ev.chip && <span className="chip">{ev.chip}</span>}
              <div className="meta">
                <div>
                  <b>{fmtDate(ev.date)}</b><br />{fmtTime(ev.time)}<br />
                  <a onClick={() => onSave?.(p.i!)}>Save date ↓</a>
                </div>
                <div className="r">
                  <b>{ev.venue.name}</b><br />{ev.venue.address}<br />
                  <a href={mapUrl(ev.venue)} target="_blank" rel="noreferrer">Area map ↗</a>
                </div>
              </div>
            </>
          )}
          {p.k === "closing" && (
            <>
              <small>{cfg.closing.eyebrow}</small>
              <h2>{cfg.closing.title}</h2>
              <Month iso={cfg.couple.date} />
              <p className="msg">{cfg.closing.message}</p>
              <a className="rsvp" href={rsvpUrl(cfg)} target="_blank" rel="noreferrer">RSVP</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
