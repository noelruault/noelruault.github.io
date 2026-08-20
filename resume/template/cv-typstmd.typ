// Fonts are limited to what typstmd's browser build loads: Libertinus Serif, DejaVu Sans Mono.
// Markdown conventions this relies on are documented in ../README.md.

#let palettes = (
  dracula: (
    bg: rgb("#ffffff"),
    ink: rgb("#1b1c1e"),
    muted: rgb("#5a5c5e"),
    rule: rgb("#d9d9d9"),
    accent: rgb("#217a37"),
    mark: "block",
  ),
  aitelier: (
    bg: rgb("#f4ede2"),
    ink: rgb("#1d1a17"),
    muted: rgb("#6b625a"),
    rule: rgb("#d6c9b3"),
    accent: rgb("#7a1c1c"),
    mark: "dot",
  ),
)

#let cv(
  theme: "aitelier",
  name: "Noël Ruault",
  role: "Site Reliability & DevOps Engineer",
  contacts: (
    (text: "contact@noel.engineer", url: none),
    (text: "+34 722 122 274", url: none),
    (text: "Alicante, ES", url: none),
    (text: "noel.engineer", url: "https://noel.engineer"),
    (text: "linkedin.com/in/noelruault", url: "https://linkedin.com/in/noelruault"),
    (text: "github.com/noelruault", url: "https://github.com/noelruault"),
  ),
  footer-note: "References on request · live copy at noel.engineer",
  body,
) = {
  let t = palettes.at(theme)
  let mono-font = "DejaVu Sans Mono"

  let mono(size: 8pt, tracking: 0pt, fill: t.muted, weight: "regular", it) = text(
    font: mono-font, size: size, tracking: tracking, fill: fill, weight: weight,
  )[#it]

  set page(paper: "a4", margin: (x: 1.9cm, top: 1.5cm, bottom: 1.4cm), fill: t.bg)
  set text(font: "Libertinus Serif", size: 9.5pt, fill: t.ink, lang: "en", hyphenate: false)
  set par(leading: 0.62em, spacing: 0.7em, justify: false)
  set list(marker: text(fill: t.accent)[•], indent: 0.3em, body-indent: 0.5em, spacing: 0.5em)
  show link: set text(fill: t.accent)

  // Skills read as an aligned two-column block, which a GFM table is the only plain-Markdown way to express. Its header row exists because GFM requires one, and is hidden here.
  // Columns come from the emitted table, and an explicit argument beats a set rule, so keep every skill label at 12 characters or fewer: past that typstmd sizes it as prose and the two columns split the page evenly instead of hugging the labels.
  set table(stroke: none, inset: (x: 0pt, y: 3pt), column-gutter: 0.9em)
  show table.cell.where(y: 0): none
  show table.cell.where(x: 0): it => mono(size: 8pt, tracking: 0.08em, fill: t.accent)[#upper(it)]

  // A paragraph body is a sequence of text, space and quote elements, not one text run, so reading `.text` off it silently yields nothing.
  let plain-text(it) = {
    if type(it) == str { it }
    else if it.has("text") { it.text }
    else if it.has("children") { it.children.map(plain-text).join("") }
    else if repr(it.func()) == "space" { " " }
    else { "" }
  }

  let section-label(it) = block(above: 1.35em, below: 0.55em, breakable: false)[
    #grid(
      columns: (auto, auto),
      column-gutter: 0.55em,
      align: horizon,
      line(length: 1.2em, stroke: 1.4pt + t.accent),
      mono(size: 8pt, tracking: 0.16em, weight: "bold")[#upper(it)],
    )
  ]

  show heading.where(level: 1): it => section-label(it.body)
  show heading.where(level: 2): it => section-label(it.body)
  show heading.where(level: 3): it => block(
    above: 1.1em,
    below: 0.45em,
    breakable: false,
    text(size: 11pt, weight: "bold", it.body),
  )

  // Detected by shape, not by position. Counting paragraphs from the last heading needs
  // `state` inside `context`, which reads and writes the same value: Typst then re-lays out the document until it gives up with "layout did not converge", and it measured 2x slower.
  // A meta line is dot-separated and ends in a year or Present; the trailing field goes right.
  let meta-line = regex("·.*(\\d{4}|Present)\\s*$")

  show par: it => {
    let line = plain-text(it.body)
    if line.find(meta-line) == none {
      it
    } else {
      let parts = line.split(" · ")
      // box, not a bare content block: the block would form a new paragraph, this rule would fire on its own output, and the second pass would split the already-composed line,
      // gluing the middle field to the date. A grid instead of h(1fr) recurses the same way
      // until Typst aborts with "maximum show rule depth exceeded".
      box(width: 100%, mono(size: 8.5pt)[#parts.slice(0, -1).join(" · ")#h(1fr)#parts.last()])
    }
  }

  grid(
    columns: (1fr, auto),
    align: (left + bottom, right + bottom),
    [
      #text(size: 27pt, weight: "bold")[
        #name#if t.mark == "dot" [#text(fill: t.accent)[.]] else [#h(0.12em)#box(
          fill: t.accent, width: 0.14em, height: 0.72em,
        )]
      ]
      #v(0.35em)
      #mono(size: 9.5pt, tracking: 0.14em)[#upper(role)]
    ],
    [
      #set par(leading: 0.5em)
      #for c in contacts [
        #if c.url == none {
          mono(size: 7.5pt)[#c.text]
        } else {
          link(c.url, mono(size: 7.5pt, fill: t.accent)[#c.text])
        }
        #linebreak()
      ]
    ],
  )

  v(0.2em)
  line(length: 100%, stroke: 0.5pt + t.rule)

  body

  v(0.9em)
  line(length: 100%, stroke: 0.5pt + t.rule)
  v(0.2em)
  grid(
    columns: (1fr, auto),
    mono(size: 7.5pt)[#name · #role],
    mono(size: 7.5pt)[#footer-note],
  )
}
