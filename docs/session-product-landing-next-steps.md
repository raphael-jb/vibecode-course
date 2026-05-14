# Session Product Landing Page — Next Steps

## Status

This document defines the incremental implementation path for the **Session** product landing page.

Context:

- `Executive Sparring` is the existing offer/category page.
- `Session`, `Stream`, and `Transformation` are the product landing pages below that offer.
- This document covers the first product page: **Session**.
- `Session` is the former single-case offer, but public copy must no longer use `Peer Sparring`.

## Product Positioning

**Product name:** Session

**Category:** Executive Sparring

**Core promise:** One concrete case. 90 minutes. A clearer read on the situation and a next step that holds.

**Current conversion model:** Interest first, purchase later.

**CTA:** `Case besprechen`

**Deferred:** Pricing, Stripe checkout, Session Credits, credit storage, and purchase automation stay out of the product page until real buying interest has been validated.

## Page Sitemap

### 1. Hero

Job: Make the product clear without making the first screen transactional.

Component:

- `src/components/SessionHero.tsx`

Content:

- Headline around `Session`.
- Subline: 90 minutes, one concrete case, confidential, reviewed summary.
- Primary CTA: `Case besprechen`.

Rules:

- Do not show price in the hero.
- Do not explain the full Executive Sparring architecture here.
- Avoid before/after framing.

### 2. Value Cards

Job: Show the positive state the Session creates.

Recommended component direction:

- Thought Card or InsightGallery-style cards.
- Centered section layout.
- Short, concrete cards.

Possible cards:

- `Eine sortierte Lage`
- `Ein klarer naechster Schritt`
- `Mehr Zugriff auf die eigene Urteilskraft`
- `Ein Raum ohne Buehne`

Rules:

- No generic transformation language.
- No "vorher/nachher" mechanism.
- No "unlock", "journey", "leverage", "best of both worlds".

### 3. Included Product Card

Job: Make the product tangible before the CTA.

Content:

- 90 minutes 1:1.
- Prepared through a Case Brief.
- Work on one concrete case.
- AI-assisted Session Summary after Raphael review.
- Confidential handling.

Visual direction:

- One centered Product/Status Card.
- White surface.
- Solid border.
- Optional orange Signature Glow.

### 4. Interactive Venn

Job: Explain why Session/Sparring is distinct without a heavy comparison table.

Labels:

- Left: `Coaching`
- Center: `Sparring`
- Right: `Consulting`

Core message:

> Sparring ist der Sweetspot fuer alle, die an sich selbst und am Unternehmen arbeiten moechten.

Interaction:

- Desktop: hover focuses one circle and softens the others.
- Mobile/tablet: tap toggles focused state.
- The `Sparring` circle sits visually in the center.
- Focused state can slightly scale, shift, and reveal one concise sentence.

Suggested copy:

- Coaching: `Reflexion, Muster, Selbstfuehrung.`
- Sparring: `Urteilskraft im konkreten Fuehrungskontext.`
- Consulting: `Analyse, Erfahrung, unternehmerischer Blick.`

Rules:

- Do not use a "best of both worlds" phrase.
- Do not degrade Coaching or Consulting.
- The page should signal: this is the right form when the person and the business question belong in the same room.

### 5. Process

Job: Reduce friction before the Case conversation.

Recommended structure:

1. `Case Brief`
   - Max. 10 minutes.
   - The case can be raw.
2. `Session`
   - 90 minutes on the concrete case.
   - No stage, no performance.
3. `Summary`
   - AI-assisted, reviewed by Raphael.
   - No client-facing automation without human review.

Rules:

- This section explains the Session flow, not the full Executive Sparring offer.
- Keep copy short.

### 6. Conversion Section

Job: Invite the right person into a first concrete conversation.

Content:

- One strong centered CTA block.
- Button text: `Case besprechen`.
- Short support line: `Wenn ein Case gerade Gewicht hat, klaeren wir zuerst, ob eine Session der richtige Raum ist.`

Rules:

- No pricing cards.
- No payment links.
- No credit packages.
- Do not introduce secondary CTAs in this section.

### 7. Confidentiality

Job: Address the trust barrier.

Recommended component:

- Existing `ConfidentialitySection`.

Principles:

- `Vertraulich`
- `Agenda-frei`
- `Konsequenzfrei`

Closing direction:

> Klarheit braucht einen Raum, in dem nichts performt werden muss.

### 8. Not For You

Job: Self-selection.

Placement:

- Product pages only.
- Do not add this block back to the Executive Sparring offer page.

Recommended component:

- Existing `SelectionFilter`.

Example item logic:

- `Du eine fertige Expertenantwort suchst.`
- `Du Verantwortung abgeben willst.`
- `Du eigentlich ein Umsetzungsdeck brauchst.`

Closing card:

> Klarheit beginnt mit dem Mut, Nein zu sagen.

### 9. FAQ

Job: Remove final process and trust friction.

Placement:

- Product pages only.
- Do not add FAQ back to the Executive Sparring offer page unless it is category-level FAQ.

Recommended questions:

- `Was passiert nach dem Case-Gespraech?`
- `Muss ich schon einen fertigen Case haben?`
- `Wann ist eine Session der richtige Raum?`
- `Was steht in der Summary?`
- `Was passiert mit vertraulichen Informationen?`

Recommended component:

- Existing `CollaborativeFAQ`, centered.

### 10. Final CTA

Job: Close the decision.

Copy direction:

> Wenn der Case Gewicht hat, gib ihm einen Raum.

CTA:

- `Case besprechen`

## Deferred: Stripe, Pricing and Credits

The full booking and credit flow is intentionally postponed.

Do not include on the product page yet:

- Public pricing section.
- Stripe Payment Links.
- Session Credit packages.
- Credit purchase automation.
- Client-facing or internal credit dashboard.

Revisit this only after at least one of these signals exists:

- A qualified lead asks to buy directly.
- Multiple people ask for packages or credits.
- Manual invoicing becomes repetitive.
- Raphael needs a credit balance to answer client questions.

## Rename / Language Cleanup

Public copy must not use:

- `Peer Sparring`
- `Peer Session`
- `Peer Credits`

Use:

- `Session`
- `Stream`
- `Transformation`
- `Executive Sparring` only for the category/dach offering.

Known places to update later:

- `docs/products.md`
- `src/components/CaseBriefIntake.tsx`
- `automations/n8n/peer-sparring/*`
- `docs/peer-sparring/*`
- sitemap and SEO docs where public terms appear

Implementation note:

- Internal folder names can be migrated later if changing them risks breaking active workflows.
- Public-facing copy and emails should be changed first.

## Acceptance Criteria

- `/session` reads as a concrete product landing page.
- No pricing appears on the Session page.
- The only CTA label is `Case besprechen`.
- The page does not re-explain the Executive Sparring offer architecture.
- Venn labels are `Coaching`, `Sparring`, `Consulting`, with `Sparring` in the center.
- `Nicht fuer Dich` and FAQ blocks remain product-page-only.
- Pricing, Stripe and credit automation are explicitly out of scope for the current page iteration.
- Public copy contains no `Peer Sparring`.
- Copy follows `docs/raphaelbaruch-style.md`.
