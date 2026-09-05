# Lessons — Webtemplates

Durable gotchas only. Read every cycle, keep tight.

- `bunx playwright install chromium` is required even when the box has a playwright cache elsewhere: the sandbox HOME can differ from the real one, so a system-wide chromium cache is invisible to this repo's `node_modules/playwright`. Takes a few minutes over network the first time per box; cached after.
- `bun run <script> <args>` forwards trailing args to the underlying script directly, no `--` needed (unlike `npm run`). `bun run compare fin-ai https://fin.ai/` just works.
- Gate's reveal-target detector is `[class*="reveal" i]` (spec.md, harness contract) — every template's reveal wrapper class must contain "reveal" or the reveal/reduced-motion/no-js checks find zero targets and silently pass.
- Clean-room copy dies by measurement, not intention: first fin-ai draft carried 128 shared 5-word shingles despite conscious rewording (testimonial tails, heading predicates, footer taxonomy). Shingle-scan template text against the scraped source BEFORE the first commit; rewrite until the scan reports zero.
- compare.mjs full-page composites of a ~21,000px page are too squashed to judge geometry; they verify section order and color banding only. Judge grid/spacing parity from viewport-sized screenshots at fixed scroll offsets, both sides.
- Editing `manifest.json` with `python3 -c "...json.dump(...)"` for a live proof-then-revert (t00's stub pattern, t05's too) drops the file's trailing newline, leaving a spurious diff after the revert. Check `git diff templates/manifest.json` is empty before moving on, or just rewrite the exact original string.
- An ad-hoc playwright script only resolves `templates/node_modules/playwright` (the already-verified working chromium install) if it's run from inside `templates/` (e.g. copy it to `templates/scripts/` first); running the same script from `/tmp` or elsewhere resolves a different/missing playwright cache and fails with "Executable doesn't exist".
