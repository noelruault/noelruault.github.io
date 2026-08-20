# CV

One design, three renderings: the web page, a standalone Typst PDF, and a typstmd (web) template.

| File | What it is |
| --- | --- |
| `index.html` + `cv.css` | The page at `noel.engineer/resume`. Components are light-DOM custom elements (`<cv-section>`, `<cv-entry>`, `<cv-skill>`) defined at the bottom of `index.html`; styling is Tailwind. |
| `cv.src.css` | Tailwind source. Holds the two palettes (`dracula` default, `aitelier` under `[data-theme="aitelier"]`) and the print rules. |
| `template/cv-typst.typ` | Standalone Typst CV. This is what produced the PDFs in this folder. |
| `template/cv-typstmd.typ` | The same design as a [typstmd](https://github.com/noelruault/typstmd) web template. |
| `template/cv.md` | The CV body in Markdown, the input for `cv-typstmd.typ`. |

## Rebuild

```bash
bun install                                                                  # once
bun run build                                                                # index.html + cv.src.css -> cv.css

cd template
typst compile cv-typst.typ --input theme=dracula  ../noel-ruault-cv-dracula.pdf
typst compile cv-typst.typ --input theme=aitelier ../noel-ruault-cv-aitelier.pdf
```

`bun run build` only emits the utilities it finds in `index.html`, so re-run it after adding a class, including classes inside the `<script>` block.

## Using the typstmd template

1. Open typstmd (web), paste `template/cv.md` into the editor.
2. Switch to **Template** view, replace the theme template with `template/cv-typstmd.typ`, compile. The template is saved per theme in `localStorage` on the first successful compile.
3. Switch the palette by editing `theme: "aitelier"` in the `conf` signature.

Markdown contract the template expects:

| Markdown | Renders as |
| --- | --- |
| `## Section` | Section label with the accent rule (`#` behaves the same) |
| ``### Job title `2025 – Present` `` | Entry title, with the trailing inline code pushed flush right as the date |
| `` `WebBeds · Remote, ES` `` alone in a paragraph | The muted mono org line |
| `*one line*` | The italic entry summary |
| `- item` | Accent-marked bullet |

## Why `cv-typst.typ` does not work in typstmd

typstmd concatenates `template + "#show: doc => conf(...)" + markdown body`, so the template must *define `conf`*, not *be a document*. Pasting the standalone file fails with `error: unknown variable: conf`. It also assumes macOS fonts: typstmd's WASM compiler preloads only Libertinus Serif, New Computer Modern and DejaVu Sans Mono, and has no package registry or virtual filesystem beyond `/main.typ`.

Avoid `~` in `cv.md`: typstmd does not escape it, so Typst reads a lone `~` as a non-breaking space and a `~pair~` as subscript. `≈` is used instead.
