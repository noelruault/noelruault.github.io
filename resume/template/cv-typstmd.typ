// typstmd appends `#show: doc => conf(...)` + the markdown body, so renaming `conf`, dropping one of
// its five keyword params, or moving `doc` off the end breaks it (README.md has the markdown contract).
// Font list is fixed by typst.ts: Libertinus Serif, New Computer Modern, DejaVu Sans Mono.

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

#let conf(
  title: none,
  authors: (),
  date: none,
  lang: "en",
  toc: false,
  font: "Libertinus Serif",
  fontsize: 9.5pt,
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
  doc,
) = {
  let t = palettes.at(theme)
  let mono-font = "DejaVu Sans Mono"
  // Frontmatter wins over the defaults so one template can serve more than one person.
  let name = if title != none { title } else { name }
  let contacts = if authors.len() > 0 { authors.map(a => (text: a.name, url: none)) } else { contacts }

  let mono(size: 8pt, tracking: 0pt, fill: t.muted, weight: "regular", body) = text(
    font: mono-font, size: size, tracking: tracking, fill: fill, weight: weight,
  )[#body]

  set page(paper: "a4", margin: (x: 1.9cm, top: 1.5cm, bottom: 1.4cm), fill: t.bg)
  set text(font: font, size: fontsize, fill: t.ink, lang: lang, hyphenate: false)
  set par(leading: 0.62em, spacing: 0.7em, justify: false)
  set list(marker: text(fill: t.accent)[•], indent: 0.3em, body-indent: 0.5em, spacing: 0.5em)
  set table(inset: (x: 0pt, y: 3pt), stroke: none)
  show link: set text(fill: t.accent)
  show raw.where(block: false): set text(font: mono-font, size: 8.5pt, fill: t.muted)

  show heading.where(level: 1): it => block(above: 1.35em, below: 0.55em, breakable: false)[
    #grid(
      columns: (auto, auto),
      column-gutter: 0.55em,
      align: horizon,
      line(length: 1.2em, stroke: 1.4pt + t.accent),
      mono(size: 8pt, tracking: 0.16em, weight: "bold")[#upper(it.body)],
    )
  ]
  show heading.where(level: 2): it => [#heading(level: 1, it.body)]

  // An entry heading carries its date as trailing inline code; split it out so it sits flush right.
  show heading.where(level: 3): it => {
    let parts = it.body.at("children", default: (it.body,))
    let dates = parts.filter(c => c.func() == raw)
    let title = parts.filter(c => c.func() != raw)
    block(above: 1em, below: 0.4em, breakable: false)[
      #grid(
        columns: (1fr, auto),
        align: (left + bottom, right + bottom),
        text(size: 11pt, weight: "bold")[#title.join()],
        if dates.len() > 0 { mono(size: 8pt)[#dates.first().text] },
      )
    ]
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

  if toc {
    outline(title: none, depth: 2)
  }

  doc

  v(0.9em)
  line(length: 100%, stroke: 0.5pt + t.rule)
  v(0.2em)
  grid(
    columns: (1fr, auto),
    mono(size: 7.5pt)[#name · #role],
    mono(size: 7.5pt)[#if date != none { date } else [References on request · live copy at noel.engineer]],
  )
}
