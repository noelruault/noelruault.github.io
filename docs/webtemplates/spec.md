# Loop spec: Webtemplates

**Branch:** `feature/web-templates`. One writer.
**This file is the operating contract. The loop reads it every cycle.**

## What we are building

Eight independent, self-contained website templates under `templates/`, plus a gallery index. Each template is a clean-room deep-copy of a reference site: we take its LAYOUT, GEOMETRY, SPACING RHYTHM, TYPE SCALE, MOTION and RESPONSIVE BEHAVIOR. We never take its content, assets or identity. Every section of the reference page becomes a namespaced, reusable component rendered from that template's config (Modularity contract below). Verified headless with playwright, side by side against the live reference, at three widths.

| ticket | slug | reference | class prefix |
|---|---|---|---|
| t10 | `fin-ai` | https://fin.ai/ | `fa-` |
| t20 | `posthog` | https://posthog.com/ | `ph-` |
| t30 | `cipher-tv` | https://cipher.tv/ | `ct-` |
| t40 | `michaelgatt` | https://michaelgatt.com | `mg-` |
| t50 | `likova` | https://likova.space | `lk-` |
| t55 | `otsuka-air` | https://otsuka-air.jp | `oa-` |
| t56 | `pi-dev` | https://pi.dev/ | `pi-` |
| t57 | `charm-land` | https://charm.land/ | `ch-` |

## Clean-room rules (hard, every template)

- Build ONLY from evidence scraped from the live page THIS cycle (curl the HTML and stylesheets, playwright-snapshot for dynamic class names). Never build from model memory of the brand; sites change and memory lies.
- Re-namespace everything under the template's prefix. Never ship a source class name.
- Rewrite ALL copy. Invent a neutral placeholder brand per template. No source product names, domains, emails, testimonials or body text. Strip Cloudflare `__cf_email__` artifacts.
- No source assets: no images, logos, fonts, illustrations, videos. Placeholders are CSS gradients, own inline SVG, solid blocks. Type uses system font stacks approximating the source's feel; no webfont fetching.
- No source JS. Reimplement observed behavior (reveal, marquee, accordion, nav) as small vanilla JS per template.
- Self-contained at runtime: zero external requests. Each template is one dir with `index.html`, built `style.css`, optional `main.js`.

## Modularity contract (hard, every template including the gallery)

- Everything mutable lives in `templates/<slug>/config.json`: brand name, nav items, every heading, paragraph, label and link, image/placeholder specs (gradient stops, inline-SVG params, alt text), theme tokens (colors, radii, accent), section order (`config.sections`, an ordered list of section names) and each section's item lists.
- Every section is a component: `templates/<slug>/components/<section>.mjs`, a pure function `(config) => html string`. A component holds structure, classes and wiring only; no copy, url, image or color literal hardcoded inside it.
- The document wrapper is `templates/<slug>/shell.mjs`, a pure function `(config, bodyHtml) => full html string`: doctype/html/head/body, plus any config-driven `<title>`/meta/description — the one place that assembles the sections (joined in `config.sections` order) into a full page.
- Rendering happens at BUILD time: `bun run build` renders `index.html` from config + components + shell (`templates/scripts/render.mjs`), then builds the css. Build-time rendering keeps the no-JS guarantee (gate check) while making every template fully re-skinnable by editing config alone.
- The gate's render-drift check (Harness contract) enforces that the committed `index.html` is exactly what the config renders: it snapshots the committed file before `bun run build` re-renders it, and fails if the two differ (a hand-edit or a forgotten rebuild after a config change).

## Responsive contract (hard, every template including the gallery)

- Mobile-first. Every template is built AND judged at 390, 768 and 1440 and passes the gate at all three. The reference's breakpoint behavior is part of what we copy: where the source collapses a grid, changes column count, stacks a text+visual split, or swaps its nav for a toggle, ours does the same at the equivalent Tailwind breakpoint.
- Nothing is cut off: every text element and interactive control stays inside the viewport at every width. The gate enforces it (`checkTextOverflow`, names the offender). `overflow-x: hidden` on html/body is not a fix; fix the element that overflows.
- Grids collapse: multi-column grids reach one column at 390 (two only where the reference keeps two, e.g. a tile field). Splits stack. Nothing depends on a fixed px width wider than 390 without a responsive override.
- Nav is usable at 390: items wrap or collapse behind a toggle whose noscript fallback shows the list. Nothing is reachable only by hover on touch.
- Fluid media: placeholders, inline SVGs and gradient blocks are `w-full`/`max-w-full` with an aspect ratio, never a fixed px width.
- Type scales down: display sizes via responsive text utilities or `clamp()`; body text stays legible at 390 (no body copy under 14px, captions under 12px).
- Tap targets at 390: interactive controls are at least 44px tall, padding included.
- The review gate records the responsive verdict per width in `review.md` (the parity verdict's breakpoint-behavior item IS this contract).

## Tailwind contract (hard, every template including the gallery)

- Tailwind v4 utilities in the component `.mjs` markup are where layout, spacing, sizing, typography, color and breakpoints live. Responsive behavior is expressed with Tailwind variants (`sm:` `md:` `lg:` `xl:` = 40/48/64/80rem), not hand-written media queries.
- `src/main.css` is the entry: `@import "tailwindcss"`, `@import "./components.css"`, `@source "../"`, and an `@theme` block declaring the template's tokens as `--color-<prefix>-*` / `--font-<prefix>-*` so they are utilities (`bg-fa-paper`), never raw hex in markup or components.css.
- `components.css` holds only what utilities cannot express: `@keyframes`, multi-step transitions, gradient and pseudo-element recipes, 3D scenes, reduced-motion and noscript overrides. New work puts no layout in it (display, grid-template-*, flex, gap, padding, margin, width, max-width); existing templates are NOT refactored for this unless a ticket says so. Any `@media` it does need uses Tailwind's breakpoint values so it lines up with the variants.
- New templates import it layered, `@import "./components.css" layer(components);`, so a utility on the same element still wins (lessons.md: unlayered rules silently beat layered utilities). Existing templates keep their cascade.
- Inline `style` only carries config-driven custom properties (`--i` stagger, gradient stops, token overrides), never layout.
- No other CSS framework, no hand-written stylesheet you would port to utilities later.

## Method (per site, condensed from the proven component-RE loop)

0. Load the `reverse-engineer-web` skill FIRST (Skill tool, name `reverse-engineer-web`; on disk `~/.claude/skills/reverse-engineer-web/`: `SKILL.md`, `scripts/extract_fragment.py`, `scripts/extract_css.py`). Every template ticket (t10–t57, their sub-ids, and any fix ticket that touches a template) starts by invoking it: its working loop, rebuild rules and gotchas are this method's source, and its two scripts ARE step 3's mechanical extraction. A delegated `router` plan names the script paths explicitly so a cheap step runs them instead of re-implementing them. The handoff block's `did:` line names which scripts ran.
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
  - `checkTextOverflow`: no visible text element extends past the viewport (`right > innerWidth + 1` or `left < -1`) unless an ancestor below body has its own `overflow-x` (marquee, carousel, scroll pane). Catches leftward overflow `scrollWidth` cannot see and names the first offenders (Responsive contract);
  - all reveal targets end visible after scrolling the page (observer fired). The gate finds reveal
    targets by `[class*="reveal" i]` (case-insensitive substring match): name every reveal wrapper's
    class so it contains "reveal" (e.g. `fa-reveal`), or the reveal/reduced-motion/no-js checks find
    zero targets and silently pass on nothing;
  - with `prefers-reduced-motion: reduce` emulated, content visible without scrolling tricks;
  - with JS disabled, content visible (noscript guard works);
  - forbidden-identity scan: `document.title` + `document.body.innerText` match none of (case-insensitive): `fin.ai`, `intercom`, `posthog`, `cipher.tv`, `michaelgatt`, `likova`, `otsuka`, `pi.dev` (the literal domain, never the bare word "pi"), `charm.land` (the literal domain, never the bare word "charm");
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
- the full green gate passes end-to-end over all eight templates plus the gallery;
- every template renders entirely from its `config.json`: render-drift check green, no mutable content hardcoded in components;
- every template has a side-by-side parity verdict at 390/768/1440 recorded in `review.md`, with its effects inventory ticked off;
- every template honours the Responsive contract and the Tailwind contract, and its group's `review.md` line says so explicitly;
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
- **Every template ticket invokes the `reverse-engineer-web` skill first** (Method step 0) and builds under the Responsive and Tailwind contracts. The review gate checks both at 390/768/1440; the handoff names the skill scripts that ran.
