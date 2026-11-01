import { AbsoluteFill, Audio, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as serif } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as sans } from "@remotion/google-fonts/Poppins";
import cfg from "../../invite.config.json";
import { Card } from "../shared/Card";
import { Tabs } from "../shared/Tabs";
import { pagesOf } from "../shared/util";

serif("normal", { weights: ["500", "600"], subsets: ["latin"] });
sans("normal", { weights: ["500", "600"], subsets: ["latin"] });

const S = 2.6; // card is 360px wide -> 936px in a 1080 frame

export const Invite = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const per = cfg.video.secondsPerPage * fps;
  const page = Math.min(pagesOf(cfg).length - 1, Math.floor(frame / per));
  const flip = spring({ frame: frame - page * per, fps, durationInFrames: 20, config: { damping: 18 } });
  const k = pagesOf(cfg)[page].k;
  const cap = k === "cover" ? cfg.video.captions.cover : k === "event" ? cfg.video.captions.events : cfg.video.captions.closing;

  return (
    <AbsoluteFill style={{ background: "#f1c3c3", alignItems: "center" }}>
      {cfg.video.music && <Audio src={staticFile(cfg.video.music)} />}
      <div className="cap" style={{ marginTop: 50, fontSize: 42, padding: "16px 38px" }}>{cap}</div>
      <div style={{ position: "absolute", top: 190, left: (1080 - 360 * S) / 2, width: 360, transform: `scale(${S})`, transformOrigin: "top left" }}>
        <Tabs cfg={cfg} page={page} />
        <div style={{ marginTop: 24 }}>
          <Card cfg={cfg} page={page} flip={flip} asset={(p) => staticFile(p)} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
