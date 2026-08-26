# Loop spec: Webtemplates

**Branch:** `feature/web-templates`. One writer.
**This file is the operating contract. The loop reads it every cycle.**

## What we are building

Seven independent, self-contained website templates under `templates/`, plus a gallery index. Each template is a clean-room deep-copy of a reference site: we take its LAYOUT, GEOMETRY, SPACING RHYTHM, TYPE SCALE, MOTION and RESPONSIVE BEHAVIOR. We never take its content, assets or identity. Every section of the reference page becomes a namespaced, reusable component rendered from that template's config (Modularity contract below). Verified headless with playwright, side by side against the live reference, at three widths.

| ticket | slug | reference | class prefix |
|---|---|---|---|
| t10 | `fin-ai` | https://fin.ai/ | `fa-` |
| t20 | `posthog` | https://posthog.com/ | `ph-` |
| t30 | `cipher-tv` | https://cipher.tv/ | `ct-` |
| t40 | `michaelgatt` | https://michaelgatt.com | `mg-` |
| t50 | `likova` | https://likova.space | `lk-` |
| t55 | `otsuka-air` | https://otsuka-air.jp | `oa-` |
| t56 | `pi-dev` | https://pi.dev/ | `pi-` |

## Clean-room rules (hard, every template)

- Build ONLY from evidence scraped from the live page THIS cycle (curl the HTML and stylesheets, playwright-snapshot for dynamic class names). Never build from model memory of the brand; sites change and memory lies.
- Re-namespace everything under the template's prefix. Never ship a source class name.
- Rewrite ALL copy. Invent a neutral placeholder brand per template. No source product names, domains, emails, testimonials or body text. Strip Cloudflare `__cf_email__` artifacts.
- No source assets: no images, logos, fonts, illustrations, videos. Placeholders are CSS gradients, own inline SVG, solid blocks. Type uses system font stacks approximating the source's feel; no webfont fetching.
- No source JS. Reimplement observed behavior (reveal, marquee, accordion, nav) as small vanilla JS per template.
- Self-contained at runtime: zero external requests. Each template is one dir with `index.html`, built `style.css`, optional `main.js`.

## Modularity contract (hard, every template including the gallery)

- Everything mutable lives in `templates/<slug>/config.json`: brand name, nav items, every heading, paragraph, label and link, image/placeholder specs (gradient stops, inline-SVG params, alt text), theme tokens (colors, radii, accent), section order and each section's item lists.
- Every section is a component: `templates/<slug>/components/<section>.mjs`, a pure function `(config) => html string`. A component holds structure, classes and wiring only; no copy, url, image or color literal hardcoded inside it.
- Rendering happens at BUILD time: `bun run build` renders `index.html` from config + components, then builds the css. Build-time rendering keeps the no-JS guarantee (gate check) while making every template fully re-skinnable by editing config alone.
- The gate's render-drift check (Harness contract) enforces that the committed `index.html` is exactly what the config renders.

## Method (per site, condensed from the proven component-RE loop)

1. Scrape to scratch (never into the repo): page HTML + every linked stylesheet. Page CSS is often per-page plus one shared token file; fetch both.
2. Enumerate the page top to bottom: every section, its grid, its breakpoint behavior, every effect (reveal-on-scroll, stagger, hover lift, marquee, parallax, sticky nav, accordion, carousel). This inventory drives the build and the review verdict.
3. Extract fragments and rules mechanically (balanced-tag walk for HTML, prefix-matched rules plus `@media` recursion plus ALL `@keyframes` for CSS; minified CSS is one line, never read by eye). This step is bulk and delegable via `router` at d1-d2.
4. Resolve design tokens from the shared stylesheet; inline one-off values; keep only vars that earn their name.
5. Rebuild namespaced: Tailwind v4 utilities for layout/spacing/type, a per-template `components.css` (imported into the tailwind entry, the v4 CLI inlines it) for extracted effects, keyframes and gradients. Collapse per-theme rule soup into CSS vars. Stagger via `--i` with `transition-delay: calc(var(--i,0) * 60ms)` and delay reset on hover.
6. Reveal-on-scroll ships with three guards: IntersectionObserver adding `.visible` with a no-IO fallback that adds it immediately; `prefers-reduced-motion: reduce` forcing every hidden-by-default class visible; a `<noscript>` style block doing the same with `!important`.
7. Design judgment, composition and visual QA stay on this thread (the strong model). Only mechanical extraction gets delegated.

## Harness contract (built by t00, used by every later ticket)

- `templates/` is a bun workspace: `package.json`, `bun.lock`, tailwind v4, playwright as devDependency (`bunx playwright install chromium` once).
- `templates/manifest.json`: array of built slugs. Every shipped template is added here; the gate iterates it.
- `bun run build`: renders each manifest slug's `index.html` from `config.json` + `components/` (Modularity contract; t05 adds this stage to the t00 harness), then builds its tailwind entry to `templates/<slug>/style.css`. Rendered html and built css are committed; gh-pages serves static files.
- `bun run gate`: build, then `check.mjs` per manifest slug. Hard, local, deterministic checks per slug at widths 390, 768, 1440 against a local static server (Bun.serve on an ephemeral port):
  - zero console errors and zero pageerrors;
  - `document.body.scrollWidth <= window.innerWidth + 1` (no horizontal overflow);
  - all reveal targets end visible after scrolling the page (observer fired). The gate finds reveal
    targets by `[class*="reveal" i]` (case-insensitive substring match): name every reveal wrapper's
    class so it contains "reveal" (e.g. `fa-reveal`), or the reveal/reduced-motion/no-js checks find
    zero targets and silently pass on nothing;
  - with `prefers-reduced-motion: reduce` emulated, content visible without scrolling tricks;
  - with JS disabled, content visible (noscript guard works);
  - forbidden-identity scan: `document.title` + `document.body.innerText` match none of (case-insensitive): `fin.ai`, `intercom`, `posthog`, `cipher.tv`, `michaelgatt`, `likova`, `otsuka`, `pi.dev` (the literal domain, never the bare word "pi");
  - render-drift check: re-render every manifest slug's `index.html` from its config + components and fail if the committed file differs (a hand-edit of rendered output is a defect).
- `bun run compare <slug> <live-url>`: side-by-side evidence, NOT part of the gate (live network is flaky; a down site must not redden the gate). Screenshots local and live full-page at the three widths, writes composites to `.backups/webtemplates-verify/<slug>/`. The cycle LOOKS at the composites during the review gate and records a parity verdict (section order, grid geometry, spacing rhythm, breakpoint behavior, motion presence) in `review.md`. If the live fetch fails, note it and judge from the scraped evidence.

## Green gate (trust exit codes, from repo root)

```
cd templates && bun install && bun run gate
```

t00 creates this; until t00 ships there is nothing to gate. Docs-only cycles have nothing to gate. Noisy warnings are not failures; trust `$?`. **Never commit red.** Non-trivial pure logic leaves ONE assert-based unit test wired into the gate.

## Definition of Done (the builder only stops when ALL hold)

The terminal `final-dod` ticket emits the literal phrase `backlog empty` ONLY when:

- every backlog ticket is in built.md;
- every group has been reviewed in-cycle and carries a `- reviewed <id> <sha>: …` line in `review.md`;
- the full green gate passes end-to-end over all seven templates plus the gallery;
- every template renders entirely from its `config.json`: render-drift check green, no mutable content hardcoded in components;
- every template has a side-by-side parity verdict at 390/768/1440 recorded in `review.md`, with its effects inventory ticked off;
- the forbidden-identity scan is clean on every template;
- each template dir is self-contained (no external requests, no node_modules, built css committed).

If any item is not yet true, KEEP LOOPING; split the gap into new append-only tickets.

## Out of scope (never becomes a ticket)

- Merging to `gh-pages`, deploys, DNS, CNAME.
- Editing anything outside `templates/`, `docs/webtemplates/`, `scripts/`, root `.gitignore` (the existing site: `index.html`, `blog/`, `resume/`, `portfolio/`, `css/`, `js/`, `images/` stays untouched).
- Pushing any branch other than `feature/web-templates`.
- Committing node_modules, screenshots, or scraped source material.
- Copying source images, fonts, logos, body copy or JS (clean-room rules above are not tunable).

## Pipeline conventions (baked in: do not re-derive)

- **One loop, one branch (`feature/web-templates`), one group per cycle, green-only.**
- **Review is a BLOCKING step inside the cycle**, not a second loop: the same cycle that builds a
  group audits it against the handoff and the diff, FIXES what it finds, records one line in
  `review.md`, and only then closes the group. It never files a review ticket: a review queue costs
  a cycle of orientation per finding and grows without bound.
- ids are **append-only + stable**. Never renumber/delete.
