---
title: Noël Ruault
---

## Profile

Site Reliability and DevOps engineer with ≈10 years across backend, cloud, and platform. I keep production honest: reliability and performance budgets enforced in CI, GitOps delivery on multi-cluster Kubernetes, and cost work backed by benchmarks rather than opinion. Security-minded throughout: I harden what I ship and review for the failure modes others miss. Go-first, measurement-first, and I build the tooling I need: a cloud-rightsizing service that opens evidence-backed PRs, a terminal UI for on-call triage, autonomous build-loop runners.

## Experience

### Site Reliability & DevOps Engineer `2025 – Present`

`WebBeds · Remote, ES`

*Reliability, delivery, and cost for a global B2B travel-booking platform on multi-cluster AWS EKS.*

- Operate **GitOps** delivery across the EKS clusters, manage secrets with **HashiCorp Vault + External Secrets**, and run observability across Grafana/Mimir, Datadog, and Prometheus.
- Built internal reliability and cost tooling: a **cloud-rightsizing service** that benchmarks candidate instance classes on ephemeral boxes and opens evidence-backed PRs, plus a keyboard-driven AWS TUI for on-call triage.
- Appointed organisation-wide **Claude Code champion**: set AI-assisted engineering standards, tooling, and guardrails for the team.

### Cybersecurity Lecturer & DevOps Trainer `2022 – Present`

`University of the Balearic Islands, ES`

*Designed and teach the university's cybersecurity curriculum.*

- Authored a full syllabus from scratch; **83% satisfaction** in the first cohort.
- Reskilled **50+ professionals** in modern web development and DevOps practices; mentored work-study interns.

### Founder & Solo Engineer, Freelance `2022 – 2025`

`Self-employed · Remote, ES`

*Ran an independent software practice: my own SaaS product plus client delivery, everything from code to on-call.*

- Built and ran a subscription SaaS end to end: grew to **≈300 paying subscribers at €50/mo (≈€15k MRR)**, sustained ≈2 years.
- Delivered client platforms including a real-estate agency site ([deepestateagency.com](https://deepestateagency.com)) and a **€30k** internal application for an educational institution to manage its healthcare-programme students and alumni.
- Full ownership across Go backends, React and vanilla-JS frontends, deployment automation, caching, and security hardening.

### Backend Engineer, Cloud Cost & Reliability `2022`

`CAST AI, LT`

*Cloud cost-optimisation and monitoring for Kubernetes clusters on GCP and AWS (Go, PostgreSQL).*

- Shipped cluster cost-optimisation and monitoring features; refactored core components for **+22% performance** and **14% faster deployments**.

### Backend Engineer `2021 – 2022`

`Gain.pro, NL`

*Data platform that digitises and enriches company financial profiles.*

- Rebuilt a data-migration path from **15 min to 2 s (99.78% faster)**; built text-recognition pipelines that raised data accuracy and saved analysts hours weekly.

### System Designer & Backend Engineer `2020 – 2021`

`Kokorokids, ES`

*Led the 5-engineer backend team behind the product API and its deployment.*

- Designed a scalable API from scratch that absorbed **300% more traffic**.
- Shipped company-wide **automated deployment** tooling (DevOps); **+130%** application performance.

### Backend Engineer `2019 – 2020`

`mx51, AU`

*Go services for a payments platform.*

- Built a Go **REST/gRPC** API (15+ endpoints); delivered 150+ changes across 10 services while maintaining cloud-infrastructure reliability.

### Full-Stack Developer `2017 – 2019`

`Qvantel (Nokia), ES / DZ`

*Telecom business-support system (BSS), on-site with an international team in Algiers.*

- Drove the migration from a legacy system to **microservices**, reducing downtime.

**Earlier:** `Software Developer, Aisoy Robotics, ES (2015 – 2017), robotics/IoT applications and emotion-recognition R&D for human-robot interaction.`

## Selected work · github.com/noelruault

- **oasis** `(cloud rightsizing, Go + Terraform)`: assumes a client's read-only IAM role, benches the cheaper instance class on an ephemeral throwaway box, and opens a reviewable PR with the bench evidence attached; never touches live infra. AWS (EC2/ASG/Cost Explorer/SSM), Grafana/Mimir.
- **ZooStats** `(macOS menubar app shipped like production infra, Swift 6)`: GitHub Actions signs and notarizes a DMG, publishes a Sparkle appcast to Cloudflare R2; a CI perf-budget gate (CPU / RSS / wake-rate) blocks merges.
- **lazyaws** `(terminal UI for AWS, Go)`: k9s/lazygit-style keyboard-driven service browsing, SSO-aware credential handling, optional Bedrock chat for on-call triage.
- **shapes-image-file-format** `(image-compression research, 20+ reports)`: a reproducible investigation into whether a shape-based format can beat WebP/AVIF; every claim re-derived from raw data, method and results published.
- **router / loopctl** `(AI build infrastructure, Go)`: model-routing core and an autonomous build-loop supervisor for Claude executors with a per-cycle cost ledger; routing cut run cost ≈70%.

## Skills

- `RELIABILITY` SLOs & perf budgets, incident response & on-call, observability (Grafana/Mimir, Datadog, Prometheus/PromQL), benchmark-gated change
- `CLOUD & INFRA` AWS (EKS, EC2/ASG, IAM, Cost Explorer, SSM, Bedrock), Kubernetes, Terraform, GitOps/ArgoCD, HashiCorp Vault + External Secrets, Cloudflare, Docker
- `CI/CD & RELEASE` GitHub Actions, benchmark-gated merges, notarized multi-channel release pipelines, GitHub/GitLab Apps
- `SECURITY` AppSec, vulnerability discovery and remediation, CTF authoring, Cedar authorization (PoC), threat-informed review
- `LANGUAGES` Go (primary), Swift, Bash, TypeScript/JavaScript, Python, Rust, Zig, C++, SQL (PostgreSQL)
- `AI ENGINEERING` Claude Code champion, agentic build systems, model routing, Amazon Bedrock

## Education

### B.Sc. Computer Science & Software Engineering `University of Alicante, ES`

- Coursework: system & database design patterns, algorithms, cybersecurity, information-systems architecture.
