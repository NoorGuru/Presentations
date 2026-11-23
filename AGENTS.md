# Agents guide

Hugo site with reveal.js decks, deployed to GitHub Pages (`present.bynoor.io`) on every push to `main`.

## Phone remote

The iPhone can control the slides on the Mac. Both devices only need internet. They do not need the same Wi-Fi.

- Mac: `present.bynoor.io/?deck=KEY`
- iPhone: `present.bynoor.io/?remote=KEY`

The phone lists every talk, opens the one you pick on both devices, and shows a live slide preview, speaker notes, and a timer. The timer starts on the first Next or Back in a talk. Tap it to pause, hold to reset. The key is not in this repo. It lives as a Cloudflare secret.

### How it works

- `remote-relay/` is a Cloudflare Worker with one Durable Object (`slide-remote.abukhleif94.workers.dev`). It passes messages between the Mac (`deck`) and the phone (`remote`) and remembers the Mac's last page and slide. It only accepts the right key, and only from `present.bynoor.io`, localhost, or private network addresses. The newest Mac tab takes control.
- `layouts/partials/remote.html` is the site side. It is included from `layouts/index.html` and `layouts/partials/reveal-hugo/body.html`, so it runs on the homepage and every deck. It does nothing unless the URL has `?deck=` or `?remote=`.
- `config.toml` has `remote_relay`, the Worker address.
- The phone's talk list is built from the same Hugo sections as the homepage. New talks show up on their own.

There is no fullscreen button on purpose. Browsers only allow entering fullscreen right after a click or key press on that computer, and a message from the phone does not count. Reveal's `F` fullscreen also ends when the page changes. Instead, put the Mac browser window in fullscreen once with `Ctrl` + `Cmd` + `F`. That survives switching talks.

### When to update what

| Change | What to do |
|---|---|
| Add or edit a talk | Nothing extra. Push as usual. |
| Change the remote UI or behavior | Edit `layouts/partials/remote.html`, then push. No Cloudflare deploy. |
| Change the relay code or `wrangler.jsonc` | `cd remote-relay && npx wrangler deploy` |
| Change the key | `cd remote-relay && npx wrangler secret put PRESENTER_KEY`. Takes effect right away, no deploy. Use the new key in both URLs. |
| New site domain | Add it to `ALLOWED_ORIGINS` in `remote-relay/wrangler.jsonc`, then deploy the relay. |
| New Worker URL | Update `remote_relay` in `config.toml`, then push. |

Wrangler needs a Cloudflare login: `npx wrangler login`. Run `npm install` in `remote-relay/` first.

### Testing locally

- Relay: `cd remote-relay && npx wrangler dev`. It reads the key from `remote-relay/.dev.vars` (`PRESENTER_KEY=devkey`, not committed).
- Site against the local relay: build with an extra config that sets `remote_relay = "ws://localhost:8787"`, for example `hugo -d /tmp/site --config config.toml,/tmp/remote-dev.toml`, then serve `/tmp/site`. `hugo server` drops the extra config on rebuild, so prefer a one-off build.
- Do not test against the live relay with the real key while a talk is running. You would join the same room.
- iPhone against the Mac's `hugo server`: `hugo server --bind 0.0.0.0 --baseURL http://<mac-ip>:1313/`. This one needs the same Wi-Fi.
