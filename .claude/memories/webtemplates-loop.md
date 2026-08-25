---
name: webtemplates-loop
description: loopctl loop "webtemplates" builds six clean-room, config-driven site templates under templates/ on branch feature/web-templates
metadata:
  type: project
---

Started 2026-08-25. loopctl loop `webtemplates` (configs in noelruault/loopctl `loops/webtemplates.{loop,prompt}`) builds six clean-room website templates into this repo under `templates/`, one dir per reference site: fin.ai, posthog.com, cipher.tv, michaelgatt.com, likova.space, otsuka-air.jp, plus a gallery index. Branch `feature/web-templates` (pushed), contract in `docs/webtemplates/spec.md`, account `--2` work (`--1` personal was org-disabled for Claude Code as of 2026-08-18, see arch-showcase log).

Modularity contract (Noel, 2026-08-25): every template fully modular, all mutable content (text, images/placeholders, theme tokens, section lists) in per-template `config.json`, sections as pure-function `components/*.mjs`, `index.html` rendered at BUILD time (keeps the no-JS gate guarantee), render-drift check in the gate. t10-fin-ai shipped before this contract; `t11-fin-ai-modular` retrofits it.

Decisions: Noel's "this is the first one" was read as fin.ai (first URL of his list); the musicapp/recognition RE evidence is Spotify AUDIO recon, not UI, and is unrelated. Templates take layout/geometry/motion only: all copy rewritten, no source assets/JS/class names, forbidden-identity innerText scan in the gate. Model split per Noel: Fable 5 on the five [d5] visual tickets, sonnet d1-3 mechanical, opus d4 final verification (ROUTES two-field form only, three-field breaks router v0.1.1). No hard kills: CYCLE_TIMEOUT=0, CYCLE_BUDGET_USD=0, LOOP_BUDGET_USD=100 pauses between cycles, STALL_LIMIT=3.

Gate: `cd templates && bun run gate` (t00-harness builds it: tailwind v4 + playwright checks at 390/768/1440, overflow, console, reveal guards, identity scan; `bun run compare` makes side-by-side composites in `.backups/webtemplates-verify/`, advisory not gating).

**How to apply:** control with `loopctl webtemplates {status|log|pause|resume|stop}`; never run a second writer on `feature/web-templates` while it runs, and warn before switching branches in the website working tree (the loop shares it).
