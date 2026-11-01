# Wedding invite: website + video from one config

Edit **`invite.config.json`** (names, dates, venues, captions, RSVP number). Both the website and the video update.

## Run locally
```bash
npm install
npm run dev        # website at http://localhost:5173
npm run studio     # preview/edit the video in Remotion Studio
npm run video      # render out/invite.mp4 (1080x1920, 30fps)
```

## Deploy the website (GitHub Pages)
1. Push this repo to GitHub (branch `main`).
2. Settings → Pages → Source: **GitHub Actions**.
3. Every push redeploys. Your link: `https://<username>.github.io/<repo>/`.

## Get the video from GitHub
Actions → **Render video** → Run workflow → download `invite-video` from the run's Artifacts.

## Customise
- **Own artwork:** put images in `public/art/` and set `"art": "art/mehndi.png"` on that event (transparent PNG/WebP works best). Empty = placeholder figures.
- **Colours:** `src/shared/themes.ts`. Add an event by copying one in the config and picking a `theme`.
- **Music:** put an audio file in `public/` and set `video.music`. Use only music you have rights to.
- **RSVP:** `rsvp.type` is `whatsapp` (uses `number`, country code, no +) or anything else (uses `url`).

Times are IST. Wedding and reception times/venues in the sample are placeholders.
