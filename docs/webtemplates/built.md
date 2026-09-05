# Built ledger — Webtemplates

One line per shipped ticket, appended by the builder: `- <id> <sha> — summary`.

- t00-harness fcc83ed — templates/ bun workspace: manifest-driven build/gate, playwright hard checks (overflow, reveal-visibility, console/pageerrors, forbidden-identity), gate-wired selftest proving each check, compare.mjs for local-vs-live composites.
- t10-fin-ai 1729f6d — clean-room fin.ai deep-copy: Vela brand, pinned-hero curtain, 22 numbered reasons, testimonials, marquee, own SVG knot/charts, reveal with 3 guards; gate green at 3 widths.
- t05-modular-render 16b6b67 — build renders index.html from config.json + shell.mjs + components/*.mjs (render.mjs, only for slugs shipping a config), gate's render-drift check fails on a hand-edit or a missed rebuild, rendertest.mjs proves both with an assert-based tmp-dir fixture.
- t11-fin-ai-modular 0f1a647 — fin-ai retrofit to modularity contract: config.json carries every mutable value, 5 components (header/hero/reasons/footerCta/footer), reasons.mjs dispatches 22 items through per-layout renderers; pixel parity verified at 390/768/1440 across 4 scroll depths against the pre-retrofit render; gate green including render-drift.
