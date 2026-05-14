# Raphael Baruch — Design System Style Reference

> This file is the single source of truth for all visual decisions and the verbal identity of the Raphael Baruch personal brand.
> Last Updated: May 11, 2026 (Reflecting the "Baruch Code" & Status Quo)

---

## 1. Brand Tokens

### 1.1 Core Palette

| Token | Hex | Name | Role |
| :--- | :--- | :--- | :--- |
| `cream` | `#FCF8F1` | Warm Cream | **Primary Surface** (Main background) |
| `navy` | `#0E2616` | Navy | **Anchor Text** (Headlines & high-contrast UI) |
| `orange` | `#FF6403` | Action Orange | **Primary Action** (CTAs, primary accents) |
| `violet` | `#9C73FF` | Violet | **Secondary Accent** (Soft tension, creative) |
| `yellow` | `#FFC857` | Amber | **Tertiary Accent** (Warmth, optimism) |
| `white` | `#FFFFFF` | White | **Secondary Surface** (Cards & containers) |
| `muted` | `#767676` | Grey | **Subtle Text** (Body copy, descriptions) |
| `border` | `#E5E5E5` | Light Grey | **UI Structure** (Default solid borders) |

**Note on Navy:** Although technically a deep forest-green hex, it is strictly referred to and used as **Navy** across the system.

---

### 1.2 Typography

**Family:**
*   **Emotional/Headings:** `Instrument Serif` (Italic for emphasis)
*   **Utility/Body:** `Inter Display` (Light 300, Regular 400, Medium 500, SemiBold 600)

**Scale (Fluid):**
*   **H1:** `clamp(54px, 8vw, 88px)` | Line Height: `0.97` | Font: `Instrument Serif`
*   **H2:** `clamp(42px, 5.8vw, 68px)` | Line Height: `1.0` | Font: `Instrument Serif`
*   **H3:** `clamp(30px, 3.6vw, 44px)` | Line Height: `1.04` | Font: `Instrument Serif`

---

## 2. Voice & Copywriting (The Baruch Code)

To maintain a human, grounded, and serious brand voice, follow these linguistic signals to avoid "AI Slop."

### 2.1 Hard Negatives (AI Slop Detection)
If a text contains these, it is **off-brand**:
1.  **False Profundity:** "It's not just X, it's Y" or "More than a tool, a [Metaphor]."
2.  **Adjective Piling:** Using 2-3 generic adjectives like "comprehensive, holistic, seamless."
3.  **Lexical Smoothing:** Using safe, middle-of-the-road words. Avoid "delve," "leverage," "vibrant," "journey," "pivotal."
4.  **Register Inelasticity:** A tone that never breaks. AI stays formal; Baruch is atmospheric then punchy.
5.  **Summary Addiction:** Ending with "Ultimately," "In summary," or "In today's fast-paced world."

### 2.2 The "Human" Signals (Dos)
*   **Sensory Anchoring:** Start scenes or sections with a physical sensation (Smell: *Kirschblütenrauch*, Sound: *Knistern*, Light: *kaltes Leuchten*).
*   **Emotional Physicality:** Never name the emotion. Show the "Zittern der Hände" or "Pressen der Worte durch die Zähne."
*   **Vertical Breathing:** Use short fragments or single-word sentences as a "beat."
    *   *Example:*
        Stille.
        Atme.
        Dann die Antwort.
*   **Weighty Vocabulary:** Use words with friction: *Urteilskraft, Tollkühnheit, Resonanzraum, Substanz, Aushalten, Zäsur.*
*   **Affirmative Substanz:** Benenne direkt und konkret, *was* etwas ist — nicht, was es nicht ist. Wirkung entsteht aus dem positiven Anker, nicht aus der Abgrenzung. Negation ist ein rhetorischer Umweg; sie kann punktuell als Pointe funktionieren, taugt aber nicht als Standard-Opener. ("Ein präziser Sparringraum für Führungsfragen, die Substanz haben.")

---

### 2.3 Lexikon & Schreibweise

**Sparringpartner / Sparringraum** — beide Begriffe werden **ohne Fugen-s** geschrieben (nicht "Sparringspartner", nicht "Sparringsraum"). Grammatikalisch eine Grauzone, phonetisch klar überlegen. Diese Schreibweise ist für die gesamte Marke verbindlich — in Copy, Headlines, UI, SEO-Titeln und Metadaten gleichermaßen.

---

### 2.4 Gender-Richtlinien

Die Marke spricht inklusiv, aber nicht performativ. Drei Regeln, in dieser Reihenfolge angewendet:

1.  **Geschlechtsneutral, wo es geht.** Bevorzuge neutrale Sammel- und Funktionsbezeichnungen: *Mitarbeitende, Team, Führungskraft, Gegenüber, Personen, Menschen*. Das ist die erste Wahl — nicht der Workaround.
2.  **Wenn gendern, dann mit Doppelpunkt.** Wo eine neutrale Form nicht greift, ist der **Doppelpunkt** Marken-Standard: *Kolleg:in, Gründer:in, Mitarbeiter:in, Klient:in*. Kein Sternchen, kein Binnen-I, kein Schrägstrich, kein Unterstrich.
3.  **Englische Begriffe nicht gendern, nicht eindeutschen.** Englische Lehnwörter und Berufsbezeichnungen bleiben in ihrer Form: *Coach, CEO, Founder, Investor, Mentor*. Mehrzahl mit englischer Pluralform: *Coaches, CEOs, Founders*. Keine Konstruktionen wie "Coach:in" oder "Coachin".

---

## 3. Layout Patterns

### 3.1 Section Shell
*   **Container Width:** `max-width: 1180px`
*   **Desktop Padding:** `112px 0` (Vertical) | `40px` (Horizontal gutter)
*   **Mobile Padding:** `72px 0` (Vertical) | `22px` (Horizontal gutter)
*   **No Top Label Pattern:** Do not use the old orange-dot-plus-keyword row above section headlines. Start sections directly with the real headline or with substantive body copy.

### 3.2 Responsive Grid
*   **Gap:** Standardized at `22px` or `24px`.
*   **Grid-3:** `repeat(3, minmax(0, 1fr))` on desktop → `repeat(2, 1fr)` on tablet → `1fr` on mobile.

---

## 4. Component Recipes

### 4.1 Thought Cards
Used for quotes or case examples.
*   **Background:** `white` (#FFFFFF)
*   **Border:** `1px dashed [accent-color]` (Orange or Violet)
*   **Border Radius:** `16px`
*   **Typography:** Large H3 inside (`Instrument Serif`).

### 4.2 Product/Status Cards
*   **Solid Variant:** `1px solid border` (#E5E5E5)
*   **CTA Variant:** `1.5px solid orange` (#FF6403) with Signature Glow.
*   **Signature Glow:** `box-shadow: 0 2px 14px rgba(255, 100, 3, 0.25)`

---

## 5. Prompting Instruction (System Prompt)

> "Act as Raphael Baruch. You are geerdet, atmospheric, and serious. You hate 'coaching cheese' and marketing fluff. You write vertically. You start with sensory details. You show, don't tell. You use heavy German words like 'Substanz' and 'Urteilskraft'. You never conclude with a summary. Your goal is not to be liked, but to be clear."
