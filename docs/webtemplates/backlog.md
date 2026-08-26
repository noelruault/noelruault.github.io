# Backlog: Webtemplates (feature/web-templates)

Build the topmost unbuilt `- [ ]` id not already in `built.md`. ids are **append-only + stable**
(never renumber/delete). Priority order top to bottom. Each must pass the green gate (spec.md).
Every group is reviewed and repaired inside the cycle that built it (spec.md), so nothing else queues.

- [ ] `t00-harness` [d2] HUGE: build the templates/ workspace and gate per spec.md "Harness contract": bun + tailwind v4 + playwright, `manifest.json`, `bun run build`, `bun run gate` (check.mjs hard checks at 390/768/1440), `bun run compare <slug> <url>` side-by-side composites into `.backups/webtemplates-verify/`. Prove it on a tiny stub template (add to manifest, gate exits 0), then MUTATE one check (e.g. force an overflow) and confirm the gate exits non-zero; remove the stub or keep it as `_stub` excluded from manifest. Acceptance: `cd templates && bun install && bun run gate` exits 0.
- [ ] `t05-modular-render` [d3]: extend the harness per spec.md "Modularity contract": per-template `config.json` + `components/*.mjs` pure functions, `bun run build` renders `index.html` from config before the css build, gate gains the render-drift check (re-render, fail on diff). Convert the t00 stub to prove it. Acceptance: gate green; a hand-edit of a rendered index.html without a config change makes the gate exit non-zero.
- [ ] `t10-fin-ai` [d5] HUGE: deep-copy https://fin.ai/ into `templates/fin-ai/` (prefix `fa-`) per spec.md method, clean-room rules and modularity contract. Full page: every section rebuilt as a namespaced component, every observed effect reimplemented, responsive at 390/768/1440. Acceptance: gate green with `fin-ai` in manifest; side-by-side parity verdict at the three widths plus effects inventory recorded in review.md.
- [ ] `t11-fin-ai-modular` [d3] (needs: `t05-modular-render`): retrofit the shipped `templates/fin-ai/` to the modularity contract: extract all mutable content into `config.json`, split sections into `components/*.mjs`, rendered output visually identical (compare full-page screenshots before/after at the three widths; byte-identical html not required, pixel parity is). Acceptance: gate green including render-drift on fin-ai.
- [ ] `t20-posthog` [d5] HUGE: same as t10 for https://posthog.com/ into `templates/posthog/` (prefix `ph-`). Acceptance: same as t10.
- [ ] `t30-cipher-tv` [d5] HUGE: same as t10 for https://cipher.tv/ into `templates/cipher-tv/` (prefix `ct-`). Acceptance: same as t10.
- [ ] `t40-michaelgatt` [d5] HUGE: same as t10 for https://michaelgatt.com into `templates/michaelgatt/` (prefix `mg-`). Acceptance: same as t10.
- [ ] `t50-likova` [d5] HUGE: same as t10 for https://likova.space into `templates/likova/` (prefix `lk-`). Acceptance: same as t10.
- [ ] `t55-otsuka` [d5] HUGE: same as t10 for https://otsuka-air.jp into `templates/otsuka-air/` (prefix `oa-`). Japanese-language reference: placeholder copy is our own (keep Japanese type feel via system JP font stacks like Hiragino/Yu Gothic if the design calls for it); confirm `otsuka` is in the forbidden-identity list in check.mjs. Acceptance: same as t10.
- [ ] `t56-pi-dev` [d5] HUGE: same as t10 for https://pi.dev/ into `templates/pi-dev/` (prefix `pi-`); add `pi.dev` to the forbidden-identity list in check.mjs matching the literal domain, never the bare word "pi" (false positives). Acceptance: same as t10.
- [ ] `t60-gallery` [d3]: `templates/index.html` gallery page, own design (not copied from any reference), config-driven per the modularity contract, one preview card per template linking into it, added to manifest and gated. Acceptance: gate green including the gallery.

## Terminal

- [ ] `final-dod` [d4] HUGE. **The only ticket that may emit "backlog empty", and it is dispatched ALONE** (that is what the HUGE token buys: batched with other tickets, a cycle could reach the stop sentinel while its group was still open). Confirm every group carries a
  `- reviewed <id>` line in `review.md`, then that the full Definition of Done (spec.md) holds and the
  green gate passes end-to-end. If
  ANY item fails, file append-only fix tickets and KEEP LOOPING. Only when every item passes, end the
  cycle with the literal phrase `backlog empty`.

<!-- Tickets are dispatched in GROUPS (default 3 per cycle), because a
     cycle's cost is orientation, not the edit. A ticket that genuinely fills a whole cycle on its own
     gets the token HUGE somewhere on its line and is then dispatched alone. Use it sparingly. -->

<!-- DIFFICULTY: every ticket carries a `[dN]` marker, N in 1..5. The runner routes the cycle's model
     from the top unbuilt ticket's marker via ROUTES in webtemplates.loop: d1-3 sonnet (mechanical),
     d4 opus (verification judgment), d5 fable (visual work; operator wants Fable on the visuals).
     For a GROUP, mark it with its HARDEST member's difficulty; never under-power a group. -->
