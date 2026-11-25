# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Jekyll (`github-pages` + `mmistakes/minimal-mistakes` remote theme) with custom SCSS (`_sass/minimal-mistakes/skins/_custom.scss`) and static HTML/Markdown pages (`_pages/works.md`, `_pages/about.md`, `index.html`).

## Users

Hiring managers, AI research leads, and engineering teams evaluating 阿湯 (RTon) for AI Research Engineer and software/product engineering roles, as well as technical peers exploring published research papers (`DuoAD`, `LSSGen`) and open-source projects.

## Product Purpose

A personal technical portfolio and research blog (`ImRTon's coding space`) that presents the author's end-to-end capability: taking frontier AI research from algorithm design and academic publication all the way to industrial production deployment, alongside 0-to-1 independent software products, interactive computer graphics, and functional hardware prototypes.

## Positioning

Demonstrates both peer-reviewed/preprint AI research (`DuoAD`, `LSSGen`) with real industrial deployment metrics (4000×3000 high-resolution edge inspection on a single NVIDIA A2000 < 4 GB VRAM, 99.9% recall) and full-cycle independent product engineering (`How's the Weather`, `Expense Bucket`) built with agentic workflows. Structure must cleanly accommodate upcoming production deployment case studies.

## Operating Context

- Evaluated on both desktop monitors (by hiring managers and engineers reviewing architecture diagrams, metrics, and links to project pages/arXiv/GitHub) and mobile viewports (quick portfolio browsing from resumes or social links).
- Built and previewed locally via Jekyll (`bundle exec jekyll serve`).

## Capabilities and Constraints

- Must integrate cleanly with the Minimal Mistakes Jekyll theme while giving `/works/` a flagship product-showcase layout.
- Factual claims, publication venues, benchmark numbers (`1 / 4-shot`, `97.7%` MVTec-AD AUROC, `0 training`, `1/16x` computation, `54s → 36s` vs FLUX.1-dev, `< 4 GB VRAM`, `Recall 99.9%`), and project links must be preserved accurately.
- Wide academic architecture diagrams (`DuoAD` teaser 4822×1986 & framework 7195×3222; `LSSGen` teaser 3072×1230 & DynaFlow 2411×1591) and tall portrait Android app screenshots (`How's the Weather`, `Expense Bucket`) require dedicated, aspect-aware staging so neither is cramped on desktop nor disorderly on mobile.

## Brand Commitments

- Refined light product-showcase aesthetic (inspired by Apple product pages, Linear Light, and Stripe Editorial): warm alabaster/stone light surfaces, crisp ink typography, cohesive accent hierarchy, and generous architectural whitespace that harmonizes with the rest of the site.

## Evidence on Hand

- Flagship AI Research assets under `/assets/imgs/Papers/DuoAD/` and `/assets/imgs/Papers/LSSGen/`, with dedicated project pages (`/%E8%AB%96%E6%96%87/DuoAD/`, `/%E8%AB%96%E6%96%87/LSSGen/`), arXiv preprints, and GitHub repositories.
- Independent Android product screenshots from `ImRTon/Hows-The-Weather` and `ImRTon/Expense-Bucket`.
- Visual/interactive graphics, VFX, game, and hardware prototype photography under `/assets/imgs/Projects/`.

## Product Principles

1. **Product-Grade Presentation for Technical Work**: Present research papers, deployed systems, and apps with the clarity, visual rhythm, and polish of a flagship product launch page.
2. **Research-to-Production Proof**: Highlight real deployment impact and quantitative benchmarks as first-class architecture alongside algorithmic diagrams, with extensible slots for future deployment case studies.
3. **Aspect-Honest Media Staging**: Stage wide academic figures in wide horizontal showcases and portrait mobile screens in balanced device showcases—never force incompatible aspect ratios into cramped columns.
4. **Mobile Parity Without Clutter**: Every showcase card must reflow into a calm, scannable vertical hierarchy on mobile screens without overlapping margins, crushed figures, or stacked walls of text.
