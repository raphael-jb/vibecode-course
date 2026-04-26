# Raphael Baruch — Design System Style Reference

> This file is the single source of truth for all visual decisions in the Raphael Baruch personal brand.  
> Use it as the design system input for Claude Design.

---

## 1. Brand Identity

**Brand name:** Raphael Baruch · raphaelbaruch.com  
**Voice & feel:** Warm, human, serious but not sterile. A sparring partner — not a consultant. Combines editorial clarity (Instrument Serif) with honest utility (Inter Display). Doodle illustrations signal approachability and craft.

**Logo:** Two-piece geometric mark — a filled rounded rectangle with an inner rounded cutout (top), and an outlined rounded square (bottom). Heavy corner radii. Available in: black, white, grey, orange (`brand-02`), purple (`brand-01`), yellow (`brand-03`).  
`/rb-logo/rb-logo-{black|white|grey|orange|purple|yellow}.png`

---

## 2. Typography

### 2.1 Fonts

| Role | Family | Weights Used |
|---|---|---|
| Headings | **Instrument Serif** | Regular, Italic |
| Body / UI | **Inter Display** | Light (300) |
| Captions | **Inter Display** | Light (300) |

**Typographic emphasis pattern:** Instrument Serif italic is used for emotionally weighted or key words within otherwise upright heading text. Example: "Ich bin Dein Sparringpartner für *Deine Weiterentwicklung.*" — the italic word carries the meaning, the upright sets the frame.

---

### 2.2 Heading Scale

Font: Instrument Serif Regular · Color: `text-primary` (#000000)

| Token | Name      | Size  | Line Height |
|-------|-----------|-------|-------------|
| `h1`  | Heading 1 | 80px  | 1.0         |
| `h2`  | Heading 2 | 65px  | 1.0         |
| `h3`  | Heading 3 | 50px  | 1.0         |
| `h4`  | Heading 4 | 40px  | 1.0         |
| `h5`  | Heading 5 | 28px  | 1.2         |
| `h6`  | Heading 6 | 20px  | 1.2         |

**Usage note:** Headings at H1–H4 intentionally use a tight line-height (1.0). They are display-scale text — do not add extra spacing between lines.

---

### 2.3 Body / Paragraph Scale

Font: Inter Display Light · Color: `text-secondary` (#767676)

| Token      | Name   | Size | Line Height |
|------------|--------|------|-------------|
| `body`     | Body   | 20px | 1.2         |
| `body-2`   | Body 2 | 18px | 1.4         |
| `body-3`   | Body 3 | 16px | 1.2         |
| `blog-text`| Blog   | 20px | 1.4         |

**Usage note:** `blog-text` is the long-form reading variant — slightly looser leading for sustained reading comfort.

---

### 2.4 Caption Scale

Font: Inter Display Light · Color: `text-secondary` (#767676)

| Token       | Name      | Size | Line Height |
|-------------|-----------|------|-------------|
| `caption`   | Caption   | 10px | 1.2         |
| `caption-2` | Caption 2 | 12px | 1.2         |
| `caption-3` | Caption 3 | 12px | 1.2         |

---

## 3. Color Tokens

### 3.1 Backgrounds

| Token                  | Hex       | Notes |
|------------------------|-----------|-------|
| `background-primary`   | `#F0EDED` | Main light surface — warm near-white |
| `background-secondary` | `#101010` | Dark surface — near-black |
| `background-tertiary`  | `#000000` | True black — deepest layer |
| `background-alt`       | `#FCF8F1` | Warm cream — used for cards and sections on light bg |

**Usage pattern observed on site:** `background-alt` (#FCF8F1) is the dominant page background. `background-primary` (#F0EDED) appears as a slightly cooler alternative. Dark surfaces (`background-secondary`, `background-tertiary`) for contrast sections or overlays.

---

### 3.2 Text Colors

| Token            | Hex       | Notes |
|------------------|-----------|-------|
| `text-primary`   | `#000000` | Headlines, high-emphasis text |
| `text-secondary` | `#767676` | Body copy, default paragraph color |
| `text-tertiary`  | `#767676` | Same as secondary — reserved for future differentiation |
| `text-invert`    | `#FFFFFF` | Text on dark/brand surfaces |

---

### 3.3 Border Colors

| Token            | Hex       | Notes |
|------------------|-----------|-------|
| `border-primary` | `#E5E5E5` | Default border — light grey |

**Usage pattern:** Cards use `border-primary` as a 1px solid border. Some card variants use a **dashed** border stroke of the same color for a sketch-like, editorial feel.

---

### 3.4 Brand Colors

| Token      | Hex       | Name              | Personality |
|------------|-----------|-------------------|-------------|
| `brand-01` | `#9C73FF` | Violet / Purple   | Creative, emotional, depth |
| `brand-02` | `#FF6403` | Orange            | Energy, action, CTA |
| `brand-03` | `#FFC857` | Amber / Yellow    | Warmth, optimism |
| `brand-04` | `#767676` | Grey / Neutral    | Balance, text |
| `brand-05` | `#7DB79F` | Teal / Green      | Growth, calm |
| `brand-06` | `#00A8E8` | Sky Blue / Cyan   | Clarity, openness |
| `brand-07` | `#E5E5E5` | Light Grey        | Borders, subtle fill |
| `brand-08` | `#0E2616` | Forest Green      | Grounding, nature |

**Primary accent:** `brand-02` (#FF6403) Orange — used for CTAs, links (Link 2), logo variants.  
**Secondary accent:** `brand-01` (#9C73FF) Violet — used in gradients, holo illustration effects.

---

## 4. Gradients

Both gradients are linear at **315°** (top-right → bottom-left).

### Gradient 1 — Warm Spectrum
`brand-01` → `brand-06` → `brand-03`

```css
background: linear-gradient(315deg, #FFC857 0%, #00A8E8 50%, #9C73FF 100%);
```

### Gradient 2 — Cool Spectrum
`brand-03` → `brand-02` → `brand-01`

```css
background: linear-gradient(315deg, #9C73FF 0%, #FF6403 50%, #FFC857 100%);
```

| Token    | Hex       | Role in gradients |
|----------|-----------|-------------------|
| `brand-01` | `#9C73FF` | Gradient 1 start · Gradient 2 end |
| `brand-03` | `#FFC857` | Gradient 1 end · Gradient 2 start |
| `brand-06` | `#00A8E8` | Gradient 1 midpoint |
| `brand-02` | `#FF6403` | Gradient 2 midpoint |

---

## 5. Link Styles

### Link 1 — Standard (blue)

| State   | Color     | Decoration |
|---------|-----------|------------|
| Default | `#0099FF` | None |
| Hover   | `#0088FF` | Underline |
| Current | `#111111` | Underline |

### Link 2 — Brand (orange)

| State   | Color              | Decoration |
|---------|--------------------|------------|
| Default | `brand-02` (#FF6403) | None |
| Hover   | `brand-02` (#FF6403) | Underline |
| Current | `brand-02` (#FF6403) | Underline |

---

## 6. Spacing

Base unit: **4px**

| Token       | Value  | Usage |
|-------------|--------|-------|
| `space-1`   | 4px    | Micro gaps |
| `space-2`   | 8px    | Tight — icon padding, inline gaps |
| `space-3`   | 12px   | Compact — small component padding |
| `space-4`   | 16px   | Default — base component padding |
| `space-6`   | 24px   | Section-internal spacing |
| `space-8`   | 32px   | Component separation |
| `space-10`  | 40px   | Section gaps |
| `space-12`  | 48px   | Large section margins |
| `space-16`  | 64px   | Hero/section vertical padding |
| `space-24`  | 96px   | Major section breaks |
| `space-32`  | 128px  | Page-level vertical rhythm |

---

## 7. Border Radius

Derived from logo geometry — the brand favors heavy, generous rounding.

| Token     | Value   | Usage |
|-----------|---------|-------|
| `radius-sm`  | 4px  | Tags, pills, small chips |
| `radius-md`  | 8px  | Input fields, small cards |
| `radius-lg`  | 16px | Standard cards, panels |
| `radius-xl`  | 24px | Large cards, image frames |
| `radius-2xl` | 32px | Hero sections, modals |
| `radius-full`| 9999px | Buttons (pill), avatars, badges |

**Usage pattern from site:** Cards use `radius-lg` (16px). Logo mark uses approx. `radius-2xl` (32px) internally.

---

## 8. Borders

| Token            | Style | Width | Color |
|------------------|-------|-------|-------|
| `border-default` | solid | 1px   | `border-primary` (#E5E5E5) |
| `border-dashed`  | dashed | 1px  | `border-primary` (#E5E5E5) |
| `border-brand`   | solid | 1.5px | `brand-02` (#FF6403) |

**Dashed border usage:** Used on editorial/content cards to echo the hand-drawn, doodle aesthetic of the illustration system.

---

## 9. Shadows

Light, non-intrusive — the brand avoids heavy elevation/depth effects.

| Token         | Value | Usage |
|---------------|-------|-------|
| `shadow-none` | none  | Default state |
| `shadow-sm`   | `0 1px 3px rgba(0,0,0,0.06)` | Subtle lift |
| `shadow-md`   | `0 4px 16px rgba(0,0,0,0.08)` | Cards on hover |
| `shadow-lg`   | `0 8px 32px rgba(0,0,0,0.10)` | Modals, floating elements |

---

## 10. Motion

| Token               | Value    | Notes |
|---------------------|----------|-------|
| `duration-fast`     | 100ms    | Micro-interactions |
| `duration-default`  | 200ms    | Standard transitions |
| `duration-slow`     | 350ms    | Page transitions, reveals |
| `easing-default`    | `ease`   | Standard |
| `easing-in-out`     | `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth UI transitions |
| `easing-spring`     | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful, on-brand bouncy |

---

## 11. Layout & Grid

### Breakpoints

| Token  | Breakpoint | Label |
|--------|------------|-------|
| `sm`   | 640px      | Mobile landscape |
| `md`   | 768px      | Tablet |
| `lg`   | 1024px     | Desktop |
| `xl`   | 1280px     | Wide desktop |
| `2xl`  | 1536px     | Ultra-wide |

### Grid

- **Columns:** 12 (desktop) · 4 (mobile)
- **Gutter:** 24px (desktop) · 16px (mobile)
- **Max content width:** 1200px
- **Page horizontal padding:** 40px (desktop) · 24px (tablet) · 16px (mobile)

---

## 12. Icon System

Three icon sets — all in Noun Project doodle style. Available as SVG + PNG pairs.

### 12.1 Arrows & General
~53 pairs — Arrows (directional, curved, bold), symbols (check, star, heart, light bulb, message, diamond, ribbon, microphone, pencil, package, plus/minus, etc.)  
Path: `/Icons/Arrows & General/noun-{name}-{id}.svg`

### 12.2 Food Icon Doodle
~270 pairs — Food-themed hand-drawn doodle icons.  
Path: `/Icons/Food Icon Doodle/`

### 12.3 Pattern Doodles
~45 pairs — Repeating pattern elements and decorative doodles.  
Path: `/Icons/Pattern Doodles/`

**Icon usage rules:**
- Use SVG as primary format for UI.
- Default icon color: `text-primary` (#000000) or `text-secondary` (#767676).
- On dark backgrounds: `text-invert` (#FFFFFF).
- Brand accent icons: `brand-01` (#9C73FF) or `brand-02` (#FF6403).
- Do not apply gradients directly to icons — use solid brand colors only.

---

## 13. Illustration System

### Style: B/W Doodle

- **Line quality:** Rough, unperfect, slightly jittery outlines. Hatched/crosshatched details. Marker-style weight. No smooth vector curves.
- **Line colors:** `#000000` (black) or `#767676` (dark grey) only — as outlines, not fills.
- **Fill:** None. Interior of all shapes is empty white space.
- **Background:** Always `#FFFFFF` — solid, no gradients or textures.
- **Composition:** Single isolated motif, maximum whitespace, no scenes or backgrounds.
- **Text:** Never included unless explicitly specified.

### Style: Holo (Neon Outline)

Same rough line base as B/W Doodle, plus:

- **Color application:** Neon outline running parallel to the black rough contours. Applied ONLY as outline — interior stays empty.
- **Allowed holo colors:** Strictly the brand palette:
  - `brand-01` #9C73FF (Violet)
  - `brand-02` #FF6403 (Orange)
  - `brand-03` #FFC857 (Amber)
  - `brand-05` #7DB79F (Teal)
  - `brand-06` #00A8E8 (Blue)
- **"holo bunt":** Multiple brand holo colors simultaneously.
- **"holo [color]":** Single specified color only.
- **"holo" (no color):** Single self-chosen brand color — strict monochrome holo.
- **Minimal accents:** A few isolated neon sparks/lines in the same chosen color around the motif — no more.
- **Background:** Always `#FFFFFF`.

### Illustration generator
The rb Illustration Generator Gemini Gem is the primary tool for generating new illustrations consistent with this style. Prompt format: `[Motiv]` for B/W, `[Motiv] holo` for single-color holo, `[Motiv] holo bunt` for multi-color holo.

---

## 14. Component Patterns

### Cards
- Background: `background-alt` (#FCF8F1) on light pages
- Border: `border-default` (1px solid #E5E5E5) — or `border-dashed` for editorial/content cards
- Border radius: `radius-lg` (16px)
- Padding: `space-8` (32px) desktop · `space-6` (24px) mobile
- Shadow: `shadow-none` default · `shadow-md` on hover
- Transition: `duration-default` (200ms) `easing-default`

### Buttons (inferred from brand)

| Variant | Background | Text | Border | Radius |
|---------|------------|------|--------|--------|
| Primary | `brand-02` (#FF6403) | `text-invert` | none | `radius-full` |
| Secondary | transparent | `text-primary` | `border-default` | `radius-full` |
| Ghost | transparent | `brand-02` | none | `radius-full` |
| Dark | `background-secondary` | `text-invert` | none | `radius-full` |

Button sizing:
- Height: 48px (default) · 40px (small) · 56px (large)
- Padding: `space-6` (24px) horizontal
- Font: Inter Display Light · 16px

### Navigation
- Background: transparent (scrolled: `background-primary` or white with backdrop blur)
- Logo: `rb-logo-black.png` on light · `rb-logo-white.png` on dark
- Links: `text-primary` default · `brand-02` on active/hover

---

## 15. Logo Usage

| Variant | File | Use on |
|---------|------|--------|
| Black | `rb-logo-black.png` | Light backgrounds |
| White | `rb-logo-white.png` | Dark backgrounds |
| Grey | `rb-logo-grey.png` | Subtle/watermark use |
| Orange | `rb-logo-orange.png` | Brand accent contexts |
| Purple | `rb-logo-purple.png` | Brand accent contexts |
| Yellow | `rb-logo-yellow.png` | Brand accent contexts |

**Clear space:** Minimum padding around logo = logo height × 0.5 on all sides.  
**Minimum size:** 24px height.  
**Do not:** Rotate, stretch, recolor, or apply gradients to the logo.

---

## 16. Design Principles

1. **Human before polished** — Instrument Serif italic for the emotional word. Doodle illustrations over stock photography. Rough lines over perfect vectors.
2. **Generous whitespace** — Content breathes. Never crowd. Cards float on their backgrounds.
3. **Warm neutrals first** — The default surface is warm cream (#FCF8F1), not cold white or grey. Brand colors are accents, not dominants.
4. **One accent at a time** — Orange (#FF6403) for action. Violet (#9C73FF) for creative/emotional. Never both at once in the same component.
5. **Dashed = editorial** — Dashed borders signal a content/thought card. Solid borders signal a functional/interactive component.
6. **Typography carries weight** — The typographic hierarchy does heavy lifting. Illustrations and icons are supporting cast, not heroes.
