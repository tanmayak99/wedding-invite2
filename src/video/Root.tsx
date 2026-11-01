import { Composition } from "remotion";
import cfg from "../../invite.config.json";
import { pagesOf } from "../shared/util";
import { Invite } from "./Invite";

export const Root = () => (
  <Composition id="Invite" component={Invite} width={1080} height={1920} fps={30}
    durationInFrames={pagesOf(cfg).length * cfg.video.secondsPerPage * 30} />
);
