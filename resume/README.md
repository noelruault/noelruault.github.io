# CV

One design, three renderings: the web page, a standalone Typst PDF, and a [typstmd](https://github.com/noelruault/typstmd) template driven by Markdown.

| File | What it is |
| --- | --- |
| `index.html` + `cv.css` | The page at `noel.engineer/resume`. Components are light-DOM custom elements (`<cv-section>`, `<cv-entry>`, `<cv-skill>`) defined at the bottom of `index.html`; styling is Tailwind. |
| `cv.src.css` | Tailwind source: the two palettes (`dracula` default, `aitelier` under `[data-theme="aitelier"]`) and the print rules. |
| `template/cv-typst.typ` | Standalone Typst CV. Produces the PDFs in this folder. |
| `template/cv-typstmd.typ` | The same design as a typstmd template, driven by `cv.md`. |
| `template/cv.md` | The CV content in Markdown. |
| `check-links.sh` | Fails if the page or this README points at a local file that does not exist. |

Published PDFs: `noel-ruault-cv-aitelier.pdf` and `noel-ruault-cv-dracula.pdf`, plus `noel-ruault-cv.pdf` as a copy of the aitelier default so existing links keep working.

## Rebuild

```bash
bun install                                                                       # once
bun run build                                                                     # index.html + cv.src.css -> cv.css
./check-links.sh

cd template
typst compile cv-typst.typ --input theme=aitelier --ignore-system-fonts ../noel-ruault-cv-aitelier.pdf
typst compile cv-typst.typ --input theme=dracula  --ignore-system-fonts ../noel-ruault-cv-dracula.pdf
cp ../noel-ruault-cv-aitelier.pdf ../noel-ruault-cv.pdf
```

`--ignore-system-fonts` is deliberate: it restricts Typst to Libertinus Serif and DejaVu Sans Mono, which are exactly the faces typstmd's browser build loads, so the PDF you commit matches what the web renders. `bun run build` only emits the utilities it finds in `index.html`, including classes inside its `<script>` block, so re-run it after adding one.

## Using the typstmd template

1. Open typstmd, paste `template/cv.md` into the editor.
2. Switch to **Template** view and paste `template/cv-typstmd.typ`, then add the call that selects a palette:

   ```typst
   #show: cv.with(theme: "aitelier")
   ```

3. Compile. The template is saved per theme in `localStorage` on the first successful compile.

Identity lives in the template's arguments, the way every Typst Universe template does it, so it is never duplicated in the Markdown:

```typst
#show: cv.with(theme: "dracula", name: "Someone Else", role: "Their Role", contacts: (...))
```

## What the Markdown has to look like

Plain Markdown, no invented syntax:

| Markdown | Renders as |
| --- | --- |
| `## Section` | Section label with the accent rule |
| `### Entry title` | Bold entry heading |
| A line like `WebBeds · Remote, ES · 2025 – Present` | Muted mono meta line, last field pushed flush right |
| `*One sentence.*` | The italic entry summary |
| `- item` | Accent-marked bullet |
| A two-column table | The skills block, its GFM header row hidden |

Two constraints worth knowing before editing `cv.md`:

- A meta line is recognised by shape: dot-separated, ending in a year or `Present`. Ordinary prose is left alone.
- Keep skill labels to 12 characters or fewer. Past that, typstmd sizes the column as prose and the two columns split the page evenly instead of hugging the labels.
