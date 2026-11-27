# Presentations

Slide decks hosted at **[present.bynoor.io](https://present.bynoor.io/)**, built with [Hugo](https://gohugo.io/) and [`reveal-hugo`](https://github.com/joshed-io/reveal-hugo).

## Talks

| Talk | URL |
|---|---|
| The AI-Augmented Software Engineer: Beyond Code Generation | [`/ai-swe-2026/`](https://present.bynoor.io/ai-swe-2026/) |
| Cracking the Tech Job Interview | [`/interview/`](https://present.bynoor.io/interview/) |
| Cracking the Tech Job Market | [`/market/`](https://present.bynoor.io/market/) |
| The New Java | [`/java/`](https://present.bynoor.io/java/) |

## Local Development

Clone with submodules so the `reveal-hugo` theme is included:

```sh
git clone --recursive https://github.com/NoorGuru/Presentations.git
cd Presentations
hugo server
```

> If you already cloned without `--recursive`, run `git submodule update --init --recursive`.

## Project Structure

- `content/` — Markdown slide decks (one directory per talk)
- `layouts/` — Custom Hugo templates, homepage, and remote client (`layouts/partials/remote.html`)
- `remote-relay/` — Cloudflare Worker + Durable Object WebSocket relay for controlling slides from a phone (`?deck=KEY` on the screen, `?remote=KEY` on the phone)
- `themes/reveal-hugo/` — `reveal-hugo` theme submodule

## Deployment

Pushing to `main` triggers [`.github/workflows/gh-pages.yml`](.github/workflows/gh-pages.yml), which builds the site with `hugo --minify` and deploys `./public` to GitHub Pages.

For details on running or updating the phone remote relay, see [`AGENTS.md`](AGENTS.md).
