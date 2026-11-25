---
name: "ImRTon Portfolio & Research Showcase"
description: "Keynote editorial & full-bleed alternating product-showcase system for AI research, production deployments, and independent engineering artifacts."
colors:
  alabaster-canvas: "#faf9f6"
  soft-stone: "#f1f0ec"
  pure-white: "#ffffff"
  hairline-stone: "#e5e3db"
  hairline-strong: "#d4d1c7"
  obsidian-ink: "#111317"
  charcoal-body: "#323741"
  slate-muted: "#565d68"
  vermilion-brand: "#a31616"
  duoad-stage: "#0d1117"
  duoad-amber: "#f5b55c"
  duoad-emerald: "#34d399"
  lssgen-stage: "#06131f"
  lssgen-cyan: "#56dcf7"
  close-obsidian: "#111317"
typography:
  display:
    fontFamily: "Manrope, 'Noto Sans TC', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "3.45rem"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  flagship:
    fontFamily: "Manrope, 'Noto Sans TC', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "4.1rem"
    fontWeight: 800
    lineHeight: 1.0
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Manrope, 'Noto Sans TC', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "2.85rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Manrope, 'Noto Sans TC', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.32rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, 'Noto Sans TC', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.96rem"
    fontWeight: 400
    lineHeight: 1.68
    letterSpacing: "0em"
  mono:
    fontFamily: "'Noto Sans Mono TC', Manrope, monospace"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1.35
rounded:
  sm: "6px"
  md: "10px"
  lg: "14px"
  device: "22px"
  pill: "999px"
spacing:
  band-y: "clamp(4.25rem, 7.5vw, 7rem)"
  container-x: "clamp(1.25rem, 5vw, 4rem)"
  grid-gap: "clamp(1.25rem, 2.2vw, 1.75rem)"
---

# Design System: ImRTon Portfolio & Research Showcase

## Overview

**Creative North Star: "Keynote Editorial & Full-Bleed Product Stage"**

The `/works/` portfolio removes nested box-in-box chrome in favor of an Apple / Stripe product-launch cadence: a calm warm-alabaster keynote opening (`#faf9f6`) with a hairline-divided proof ledger, a full-width sticky chapter subnav, full-bleed dark flagship chapters for `DuoAD` (`#0d1117`) and `LSSGen` (`#06131f`) with monumental hairline-separated metrics and museum-grade pure-white figure plates, alternating soft-stone (`#f1f0ec`) split showcases for 0→1 Android products, and crisp artifact-first editorial galleries for Applied AI, Visual & Interactive, and Hardware.

**Key Characteristics:**
- **Zero nested boxes**: Flagship research metrics sit directly on full-bleed dark bands separated by `1px` hairlines (`rgba(255,255,255,0.12)`), never frosted-glass boxes inside rounded cards.
- **Alternating full-bleed chapter rhythm**: Alabaster Hero → Sticky Subnav → Obsidian-Bronze (`DuoAD`) → Deep Ocean-Ink (`LSSGen`) → Alabaster (`Applied AI`) → Soft Stone (`Independent Products`) → Pure White (`Visual & Interactive`) → Alabaster (`Hardware`) → Obsidian (`Closing CTA`).
- **Highlight-first artifact cards**: Every archive project surfaces a concise crimson highlight (`#a31616`, > 6:1 contrast on white/alabaster) directly under the title, paired with compact monospace skill tokens in a hairline-separated footer.
- **Aspect-honest media staging**: Wide academic figures in pure-white `16:9` museum plates; portrait Android screens in floating bezel frames without enclosing boxes.

## Colors

### Light Surfaces & Ink
- **Alabaster Canvas** (`#faf9f6`): Hero opening, masthead, Applied AI, and Hardware chapters.
- **Soft Stone** (`#f1f0ec`): Independent Products split showcase band and skill tag chips.
- **Pure White** (`#ffffff`): Visual & Interactive chapter, archive cards on alabaster, and academic figure plates.
- **Obsidian Ink** (`#111317`): Primary display headlines, primary buttons, and active subnav indicator.
- **Vermilion Brand** (`#a31616`): Project highlight lines, resume link, and brand continuity.

### Flagship Dark Stages
- **DuoAD Stage** (`#0d1117` over subtle right-bleed `DuoAD/cover.jpg`): Warm Amber (`#f5b55c`) for Research SOTA metrics and primary CTA; Emerald (`#34d399`) for Industrial Production deployment metrics.
- **LSSGen Stage** (`#06131f` over subtle right-bleed `LSSGen/cover.jpg`): Luminous Cyan (`#56dcf7`) for Inference Speedup & Adapter Compatibility metrics and primary CTA.

## Typography
- **Display & Body**: `Manrope` paired with `'Noto Sans TC'`, `text-wrap: balance` on headings, `font-variant-numeric: tabular-nums` on all proof and benchmark numerals.
- **Technical Metadata**: `'Noto Sans Mono TC'` for inline `[CLS]` tokens, years, and compact skill tags.

## Implementation
- Markup: `_pages/works.md`
- Modular stylesheet: `_sass/minimal-mistakes/skins/_works.scss` imported by `_sass/minimal-mistakes/skins/_custom.scss`.
