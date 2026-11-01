import { AbsoluteFill, Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as serif } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as sans } from "@remotion/google-fonts/Poppins";
import cfg from "../../invite.config.json";
import { Card } from "../shared/Card";
import { R } from "../shared/Fx";
import { Tabs } from "../shared/Tabs";
import { pagesOf } from "../shared/util";

serif("normal", { weights: ["500", "600"], subsets: ["latin"] });
sans("normal", { weights: ["500", "600"], subsets: ["latin"] });

const S = 2.6; // card is 360px wide -> 936px in a 1080 frame
const music = cfg.video.music || "music/theme.mp3"; // "none" = silent

export const Invite = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames: D } = useVideoConfig();
  const t = frame / fps;
  const per = cfg.video.secondsPerPage * fps;
  const page = Math.min(pagesOf(cfg).length - 1, Math.floor(frame / per));
  const local = frame - page * per;
  const flip = spring({ frame: local, fps, durationInFrames: 20, config: { damping: 18 } });
  const pop = spring({ frame: local, fps, config: { damping: 12 } });
  const k = pagesOf(cfg)[page].k;
  const cap = k === "cover" ? cfg.video.captions.cover : k === "event" ? cfg.video.captions.events : cfg.video.captions.closing;

  return (
    <AbsoluteFill style={{ background: "linear-gradient(160deg,#f6cfcf,#eeb3c0 55%,#e9a5b8)", alignItems: "center", overflow: "hidden" }}>
      {music !== "none" && (
        <Audio src={staticFile(music)} volume={(f) => interpolate(f, [0, 30, D - 45, D], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      )}
      {Array.from({ length: 12 }, (_, i) => { // drifting bokeh
        const r = 60 + R(i, 1) * 120;
        return <div key={i} style={{ position: "absolute", left: R(i, 2) * 1080 - r, width: r * 2, height: r * 2, borderRadius: "50%", background: "#fff",
          opacity: 0.08 + R(i, 5) * 0.1, top: ((((R(i, 3) * 2000 - t * (20 + R(i, 4) * 30)) % 2100) + 2100) % 2100) - 100 }} />;
      })}
      <div className="cap" style={{ marginTop: 50, fontSize: 42, padding: "16px 38px", transform: `scale(${0.85 + 0.15 * pop})`, opacity: Math.min(1, pop) }}>{cap}</div>
      <div style={{ position: "absolute", top: 190, left: 360, width: 360, transform: `scale(${S * (1 + (0.035 * frame) / D)})`, transformOrigin: "top center" }}>
        <Tabs cfg={cfg} page={page} />
        <div style={{ marginTop: 24 }}>
          <Card cfg={cfg} page={page} flip={flip} time={t} asset={(p) => staticFile(p)} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
