# Lessons — Webtemplates

Durable gotchas only. Read every cycle, keep tight.

- `bunx playwright install chromium` is required even when the box has a playwright cache elsewhere: the sandbox HOME can differ from the real one, so a system-wide chromium cache is invisible to this repo's `node_modules/playwright`. Takes a few minutes over network the first time per box; cached after.
- `bun run <script> <args>` forwards trailing args to the underlying script directly, no `--` needed (unlike `npm run`). `bun run compare fin-ai https://fin.ai/` just works.
- Gate's reveal-target detector is `[class*="reveal" i]` (spec.md, harness contract) — every template's reveal wrapper class must contain "reveal" or the reveal/reduced-motion/no-js checks find zero targets and silently pass.
