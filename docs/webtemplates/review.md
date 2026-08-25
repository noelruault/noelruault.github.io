# Review — Webtemplates

One line per group, appended by the builder that reviewed it inside the same cycle it built.

- reviewed t00-harness fcc83ed: REPAIRED — compare.mjs silently screenshotted a 404 page for a missing/unbuilt slug instead of failing; added an existsSync guard. The gate's `[class*="reveal" i]` selector convention was undocumented, meaning a future template that names its reveal wrapper differently would silently no-op every reveal/reduced-motion/no-js check; documented it in spec.md. Both fixed in 60397d7. No side-by-side parity verdict yet (no live template exists to compare — that starts at t10).
