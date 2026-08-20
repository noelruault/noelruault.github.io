// Faces are the ones typstmd's browser build ships, so this and cv-typstmd.typ render alike.
// typst compile cv-typst.typ --input theme=dracula ../noel-ruault-cv-dracula.pdf

#let palettes = (
  dracula: (
    bg: rgb("#ffffff"),
    ink: rgb("#1b1c1e"),
    muted: rgb("#5a5c5e"),
    rule: rgb("#d9d9d9"),
    accent: rgb("#217a37"),
    display: ("Libertinus Serif",),
    body: ("Libertinus Serif",),
    mono: ("DejaVu Sans Mono",),
    mark: "block",
  ),
  aitelier: (
    bg: rgb("#f4ede2"),
    ink: rgb("#1d1a17"),
    muted: rgb("#6b625a"),
    rule: rgb("#d6c9b3"),
    accent: rgb("#7a1c1c"),
    display: ("Libertinus Serif",),
    body: ("Libertinus Serif",),
    mono: ("DejaVu Sans Mono",),
    mark: "dot",
  ),
)

#let theme = palettes.at(sys.inputs.at("theme", default: "dracula"))

#let name = "Noël Ruault"
#let role = "Site Reliability & DevOps Engineer"
#let contacts = (
  (text: "contact@noel.engineer", url: none),
  (text: "+34 722 122 274", url: none),
  (text: "Alicante, ES", url: none),
  (text: "noel.engineer", url: "https://noel.engineer"),
  (text: "linkedin.com/in/noelruault", url: "https://linkedin.com/in/noelruault"),
  (text: "github.com/noelruault", url: "https://github.com/noelruault"),
)

#set document(title: name + " — CV", author: name)

#set page(
  paper: "a4",
  margin: (x: 1.9cm, top: 1.5cm, bottom: 1.4cm),
  fill: theme.bg,
)

#set text(font: theme.body, size: 9.5pt, fill: theme.ink, lang: "en", hyphenate: false)
#set par(leading: 0.62em, spacing: 0.7em, justify: false)
#show link: set text(fill: theme.accent)

#let mono(size: 8pt, tracking: 0pt, fill: theme.muted, weight: "regular", body) = text(
  font: theme.mono, size: size, tracking: tracking, fill: fill, weight: weight,
)[#body]

#let section(title) = block(above: 1.35em, below: 0.55em, breakable: false)[
  #grid(
    columns: (auto, auto),
    column-gutter: 0.55em,
    align: horizon,
    line(length: 1.2em, stroke: 1.4pt + theme.accent),
    mono(size: 8pt, tracking: 0.16em, weight: "bold")[#upper(title)],
  )
]

// Title and dates share a row so dates stay flush right regardless of title length.
#let entry(title, org, dates, summary: none, bullets: ()) = block(above: 1em, breakable: true)[
  #grid(
    columns: (1fr, auto),
    align: (left + bottom, right + bottom),
    text(font: theme.display, size: 11pt, weight: "bold")[#title],
    mono(size: 8pt)[#dates],
  )
  #v(-0.15em)
  #mono(size: 8.5pt)[#org]
  #if summary != none [
    #v(-0.1em)
    #text(size: 9pt, style: "italic")[#summary]
  ]
  #if bullets.len() > 0 [
    #v(0.1em)
    #list(
      marker: text(fill: theme.accent)[•],
      indent: 0.3em,
      body-indent: 0.5em,
      spacing: 0.5em,
      ..bullets,
    )
  ]
]

#let skill(label, body) = (
  mono(size: 8pt, tracking: 0.08em, fill: theme.accent)[#upper(label)],
  text(size: 9pt)[#body],
)

// ── Header ──────────────────────────────────────────────────────────────────

#grid(
  columns: (1fr, auto),
  align: (left + bottom, right + bottom),
  [
    #text(font: theme.display, size: 27pt, weight: "bold")[
      #name#if theme.mark == "dot" [#text(fill: theme.accent)[.]] else [#h(0.12em)#box(
        fill: theme.accent, width: 0.14em, height: 0.72em,
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
        link(c.url, mono(size: 7.5pt, fill: theme.accent)[#c.text])
      }
      #linebreak()
    ]
  ],
)

#v(0.2em)
#line(length: 100%, stroke: 0.5pt + theme.rule)

// ── Profile ─────────────────────────────────────────────────────────────────

#section[Profile]

Site Reliability and DevOps engineer with \~10 years across backend, cloud, and
platform. I keep production honest: reliability and performance budgets enforced
in CI, GitOps delivery on multi-cluster Kubernetes, and cost work backed by
benchmarks rather than opinion. Security-minded throughout: I harden what I ship
and review for the failure modes others miss. Go-first, measurement-first, and I
build the tooling I need: a cloud-rightsizing service that opens evidence-backed
PRs, a terminal UI for on-call triage, autonomous build-loop runners.

// ── Experience ──────────────────────────────────────────────────────────────

#section[Experience]

#entry(
  "Site Reliability & DevOps Engineer",
  "WebBeds · Remote, ES",
  "2025 – Present",
  summary: [Reliability, delivery, and cost for a global B2B travel-booking platform on multi-cluster AWS EKS.],
  bullets: (
    [Operate *GitOps* delivery across the EKS clusters, manage secrets with *HashiCorp Vault + External Secrets*, and run observability across Grafana/Mimir, Datadog, and Prometheus.],
    [Built internal reliability and cost tooling: a *cloud-rightsizing service* that benchmarks candidate instance classes on ephemeral boxes and opens evidence-backed PRs, plus a keyboard-driven AWS TUI for on-call triage.],
    [Appointed organisation-wide *Claude Code champion*: set AI-assisted engineering standards, tooling, and guardrails for the team.],
  ),
)

#entry(
  "Cybersecurity Lecturer & DevOps Trainer",
  "University of the Balearic Islands, ES",
  "2022 – Present",
  summary: [Designed and teach the university's cybersecurity curriculum.],
  bullets: (
    [Authored a full syllabus from scratch; *83% satisfaction* in the first cohort.],
    [Reskilled *50+ professionals* in modern web development and DevOps practices; mentored work-study interns.],
  ),
)

#entry(
  "Founder & Solo Engineer, Freelance",
  "Self-employed · Remote, ES",
  "2022 – 2025",
  summary: [Ran an independent software practice: my own SaaS product plus client delivery, everything from code to on-call.],
  bullets: (
    [Built and ran a subscription SaaS end to end: grew to *\~300 paying subscribers at €50/mo (\~€15k MRR)*, sustained \~2 years.],
    [Delivered client platforms including a real-estate agency site (#link("https://deepestateagency.com")[deepestateagency.com]) and a *€30k* internal application for an educational institution to manage its healthcare-programme students and alumni.],
    [Full ownership across Go backends, React and vanilla-JS frontends, deployment automation, caching, and security hardening.],
  ),
)

#entry(
  "Backend Engineer, Cloud Cost & Reliability",
  "CAST AI, LT",
  "2022",
  summary: [Cloud cost-optimisation and monitoring for Kubernetes clusters on GCP and AWS (Go, PostgreSQL).],
  bullets: (
    [Shipped cluster cost-optimisation and monitoring features; refactored core components for *+22% performance* and *14% faster deployments*.],
  ),
)

#entry(
  "Backend Engineer",
  "Gain.pro, NL",
  "2021 – 2022",
  summary: [Data platform that digitises and enriches company financial profiles.],
  bullets: (
    [Rebuilt a data-migration path from *15 min to 2 s (99.78% faster)*; built text-recognition pipelines that raised data accuracy and saved analysts hours weekly.],
  ),
)

#entry(
  "System Designer & Backend Engineer",
  "Kokorokids, ES",
  "2020 – 2021",
  summary: [Led the 5-engineer backend team behind the product API and its deployment.],
  bullets: (
    [Designed a scalable API from scratch that absorbed *300% more traffic*.],
    [Shipped company-wide *automated deployment* tooling (DevOps); *+130%* application performance.],
  ),
)

#entry(
  "Backend Engineer",
  "mx51, AU",
  "2019 – 2020",
  summary: [Go services for a payments platform.],
  bullets: (
    [Built a Go *REST/gRPC* API (15+ endpoints); delivered 150+ changes across 10 services while maintaining cloud-infrastructure reliability.],
  ),
)

#entry(
  "Full-Stack Developer",
  "Qvantel (Nokia), ES / DZ",
  "2017 – 2019",
  summary: [Telecom business-support system (BSS), on-site with an international team in Algiers.],
  bullets: (
    [Drove the migration from a legacy system to *microservices*, reducing downtime.],
  ),
)

#block(above: 0.7em)[
  #text(font: theme.display, size: 9pt, weight: "bold")[Earlier:]
  #mono(size: 8.5pt)[Software Developer, Aisoy Robotics, ES (2015 – 2017), robotics/IoT applications and emotion-recognition R&D for human-robot interaction.]
]

// ── Selected work ───────────────────────────────────────────────────────────

#section[Selected work · github.com/noelruault]

#list(
  marker: text(fill: theme.accent)[•],
  indent: 0.3em,
  body-indent: 0.5em,
  spacing: 0.5em,
  [*oasis* #mono(size: 8pt)[(cloud rightsizing, Go + Terraform)]: assumes a client's read-only IAM role, benches the cheaper instance class on an ephemeral throwaway box, and opens a reviewable PR with the bench evidence attached; never touches live infra. AWS (EC2/ASG/Cost Explorer/SSM), Grafana/Mimir.],
  [*ZooStats* #mono(size: 8pt)[(macOS menubar app shipped like production infra, Swift 6)]: GitHub Actions signs and notarizes a DMG, publishes a Sparkle appcast to Cloudflare R2; a CI perf-budget gate (CPU / RSS / wake-rate) blocks merges.],
  [*lazyaws* #mono(size: 8pt)[(terminal UI for AWS, Go)]: k9s/lazygit-style keyboard-driven service browsing, SSO-aware credential handling, optional Bedrock chat for on-call triage.],
  [*shapes-image-file-format* #mono(size: 8pt)[(image-compression research, 20+ reports)]: a reproducible investigation into whether a shape-based format can beat WebP/AVIF; every claim re-derived from raw data, method and results published.],
  [*router / loopctl* #mono(size: 8pt)[(AI build infrastructure, Go)]: model-routing core and an autonomous build-loop supervisor for Claude executors with a per-cycle cost ledger; routing cut run cost \~70%.],
)

// ── Skills ──────────────────────────────────────────────────────────────────

#section[Skills]

#grid(
  columns: (8.4em, 1fr),
  column-gutter: 0.6em,
  row-gutter: 0.45em,
  ..skill("Reliability", [SLOs & perf budgets, incident response & on-call, observability (Grafana/Mimir, Datadog, Prometheus/PromQL), benchmark-gated change]),
  ..skill("Cloud/infra", [AWS (EKS, EC2/ASG, IAM, Cost Explorer, SSM, Bedrock), Kubernetes, Terraform, GitOps/ArgoCD, HashiCorp Vault + External Secrets, Cloudflare, Docker]),
  ..skill("CI/CD", [GitHub Actions, benchmark-gated merges, notarized multi-channel release pipelines, GitHub/GitLab Apps]),
  ..skill("Security", [AppSec, vulnerability discovery and remediation, CTF authoring, Cedar authorization (PoC), threat-informed review]),
  ..skill("Languages", [Go (primary), Swift, Bash, TypeScript/JavaScript, Python, Rust, Zig, C++, SQL (PostgreSQL)]),
  ..skill("AI systems", [Claude Code champion, agentic build systems, model routing, Amazon Bedrock]),
)

// ── Education ───────────────────────────────────────────────────────────────

#section[Education]

#grid(
  columns: (1fr, auto),
  align: (left + bottom, right + bottom),
  text(font: theme.display, size: 11pt, weight: "bold")[B.Sc. Computer Science & Software Engineering],
  mono(size: 8pt)[University of Alicante, ES],
)

#v(0.25em)
#list(
  marker: text(fill: theme.accent)[•],
  indent: 0.3em,
  body-indent: 0.5em,
  [Coursework: system & database design patterns, algorithms, cybersecurity, information-systems architecture.],
)

#v(0.9em)
#line(length: 100%, stroke: 0.5pt + theme.rule)
#v(0.2em)
#grid(
  columns: (1fr, auto),
  mono(size: 7.5pt)[#name · #role],
  mono(size: 7.5pt)[References on request · live copy at noel.engineer],
)
