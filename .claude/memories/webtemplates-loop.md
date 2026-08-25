---
name: webtemplates-loop
description: loopctl loop "webtemplates" builds five clean-room site templates under templates/ on branch feature/web-templates
metadata:
  type: project
---

Started 2026-08-25. loopctl loop `webtemplates` (configs in noelruault/loopctl `loops/webtemplates.{loop,prompt}`) builds five clean-room website templates into this repo under `templates/`, one dir per reference site: fin.ai, posthog.com, cipher.tv, michaelgatt.com, likova.space, plus a gallery index. Branch `feature/web-templates` (pushed), contract in `docs/webtemplates/spec.md`, account `--2` work.

Decisions: Noel's "this is the first one" was read as fin.ai (first URL of his list); the musicapp/recognition RE evidence is Spotify AUDIO recon, not UI, and is unrelated. Templates take layout/geometry/motion only: all copy rewritten, no source assets/JS/class names, forbidden-identity innerText scan in the gate. Model split per Noel: Fable 5 on the five [d5] visual tickets, sonnet d1-3 mechanical, opus d4 final verification (ROUTES two-field form only, three-field breaks router v0.1.1). No hard kills: CYCLE_TIMEOUT=0, CYCLE_BUDGET_USD=0, LOOP_BUDGET_USD=100 pauses between cycles, STALL_LIMIT=3.

Gate: `cd templates && bun run gate` (t00-harness builds it: tailwind v4 + playwright checks at 390/768/1440, overflow, console, reveal guards, identity scan; `bun run compare` makes side-by-side composites in `.backups/webtemplates-verify/`, advisory not gating).

**How to apply:** control with `loopctl webtemplates {status|log|pause|resume|stop}`; never run a second writer on `feature/web-templates` while it runs, and warn before switching branches in the website working tree (the loop shares it).
