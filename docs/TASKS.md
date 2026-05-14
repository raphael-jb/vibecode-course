# raphaelbaruch.com — Website Tasks

Generiert aus: Requirements-Analyse (Mai 2026)

---

## Legende: Wer macht was?

| Icon | Kategorie | Bedeutung |
|------|-----------|-----------|
| 🤖 | **CLAUDE CODE** | Claude generiert Code/Content vollständig. Du kopierst in Framer. |
| ✍️ | **DEIN INPUT** | Du lieferst das Rohmaterial zuerst. Dann übernimmt Claude. |
| 🎨 | **FRAMER** | Muss im Framer-Editor gemacht werden (SEO-Settings, Visual Editor). Claude bereitet Inhalte vor. |
| 🤝 | **HYBRID** | Claude entwirft, Du reviewst, dann in Framer. |

> **Wichtiger Hinweis zu Cowork + Framer:**
> Cowork kann theoretisch über "Claude in Chrome" Framer im Browser öffnen und navigieren.
> In der Praxis ist Framer's Canvas-Editor zu komplex für zuverlässige Automation.
> Der effiziente Workflow ist: **Claude Code / Cowork bereitet alle Inhalte und Code-Snippets vor →
> Du kopierst sie an die richtige Stelle in Framer.** Für Schema-Markup und Custom Code
> nutzt Du Framer's "Custom Code"-Sektion (Projekt-Einstellungen → Custom Code → Head/Body).

---

## P1 – Kritisch (sofort angehen)

---

### ☐ #1 · Sparring-Testimonials · Alle Seiten
**Kategorie:** ✍️ DEIN INPUT → 🤖 CLAUDE CODE → 🎨 FRAMER

**Problem:** Kein einziges Testimonial von einem Sparring-Klient:innen. Nur Mitarbeitendezitate aus der thekey.academy-Zeit sichtbar.

**Dein Input:**
- 3 Kunden kontaktieren und um ein kurzes Statement bitten
- Format pro Testimonial: Name oder Pseudonym (z.B. "CEO, HealthTech-Startup") + 2–4 Sätze + konkretes Ergebnis
- Falls keine echten Namen: vollständig anonymisiert ist okay ("Gründer:in, 45 Mio. EUR ARR-Unternehmen")

**Was Claude dann macht:**
- Testimonials redigieren und auf Tonalität der Website abstimmen
- Strukturierten HTML-Block für Framer vorbereiten
- Placement-Empfehlung je Seite geben

**Definition of Done:**
- [ ] Min. 3 Testimonials von Sparring-Klient:innen (nicht Mitarbeitenden) vorhanden
- [ ] Mind. 1 Testimonial auf Homepage sichtbar (above the fold oder direkt nach Angebots-Sektion)
- [ ] Jedes Testimonial nennt eine konkrete Situation oder ein konkretes Ergebnis (nicht nur "super Arbeit")
- [ ] Rolle/Kontext der Klient:in erkennbar (Branche, Unternehmensphase oder Rolle)

---

### ☑ #2 · Unique Meta Titles & Descriptions · Alle Seiten ✅
**Kategorie:** 🤖 CLAUDE CODE → 🎨 FRAMER (SEO-Settings)

**Problem:** Alle drei Seiten haben identische `<title>` und `<meta description>`. Google kann die Seiten semantisch nicht differenzieren.

**Was Claude macht:** Vollständig. Generiert alle drei optimierten Paare — du kopierst in Framer.

**In Framer:** Seite auswählen → Rechtes Panel → "Page" → "SEO" → Title und Description eintragen.

**Definition of Done:**
- [ ] `/` → Title: "Executive Sparring für Führungskräfte | Raphael Baruch" (max. 60 Zeichen)
- [ ] `/` → Description: Enthält "Executive Sparring", "Führungskräfte", "Klarheit" (max. 155 Zeichen)
- [ ] `/sparring` → Title: Enthält "Executive Sparring", "Peer Sparring" oder Format-Keyword
- [ ] `/sparring` → Description: Beschreibt Executive Sparring und die drei Formate konkret
- [ ] `/about` → Title: Enthält "Raphael Baruch" + Kontext (z.B. "ehemaliger Geschäftsführende")
- [ ] `/about` → Description: Erzählt die Kern-Story in einem Satz
- [ ] Alle Titles ≤ 60 Zeichen, alle Descriptions ≤ 155 Zeichen

**Prompt für Claude Code:**
```
Schreibe optimierte SEO-Titles und Meta-Descriptions für drei Seiten
der Website raphaelbaruch.com. Zielgruppe: C-Level-Führungskräfte im
DACH-Raum, Haupt-Keyword: "Executive Sparring".
Regeln: Title max. 60 Zeichen, Description max. 155 Zeichen.
Seiten: / (Homepage), /sparring (Angebote), /about (Story).
```

---

### ☐ #3 · Format-Beschreibungen ausbauen · /sparring
**Kategorie:** 🤝 HYBRID → 🎨 FRAMER

**Problem:** Peer Sparring, Clarity Streaming und Transformation Teaming zeigen nur Teaser. Dauer, Rhythmus, Ablauf und Output-Versprechen fehlen vollständig.

**Dein Input:** Beantworte für jedes Format:
- Typische Sessiondauer?
- Rhythmus (wöchentlich / alle 2 Wochen / flexibel)?
- Mindest- oder Typischlaufzeit?
- Was passiert konkret in einer Session?
- Mit welchem konkreten Output verlässt die Klient:in die Session?

**Was Claude dann macht:** Draus lesbare, stimmungsgerechte Texte schreiben, die zur Tonalität der Site passen.

**Definition of Done:**
- [ ] Peer Sparring: Sessiondauer, Rhythmus und Mindestlaufzeit genannt
- [ ] Clarity Streaming: Anzahl Sessions, Zeitraum und Ziel-Output genannt
- [ ] Transformation Teaming: Scope (wer ist involviert?), Dauer und Ergebnis-Versprechen genannt
- [ ] Jedes Format hat min. 1 konkreten Output-Satz ("Am Ende hast Du...")
- [ ] "Mehr anzeigen+"-Akkordeons funktionieren und zeigen vollständigen Inhalt

---

### ☐ #4 · Anonymisierte Case Studies · /sparring oder neue Seite
**Kategorie:** ✍️ DEIN INPUT → 🤝 HYBRID → 🎨 FRAMER

**Problem:** Kein einziges Fallbeispiel. C-Level kauft keine abstrakte Dienstleistung ohne Proof of Concept.

**Dein Input:** Erzähl mir 3 reale Fälle (anonymisiert reicht) in diesem Format:
```
- Kontext: Wer war das? (Rolle, Branche, Unternehmensgröße — keine Namen nötig)
- Ausgangssituation: Was war das Problem / die Herausforderung?
- Wie habt ihr gearbeitet? (Format, Dauer, grober Ablauf)
- Ergebnis: Was hat sich verändert? (konkret, auch wenn weich)
```

**Was Claude dann macht:** Vollständige Case-Study-Texte schreiben, Website-ready.

**Definition of Done:**
- [ ] Min. 2 Case Studies vorhanden
- [ ] Jede Case Study folgt dem Schema: Situation → Herausforderung → Sparring → Ergebnis
- [ ] Keine echten Namen erforderlich, aber Rolle + Branche + Unternehmensgröße erkennbar
- [ ] Tonalität konsistent mit dem Rest der Site (kein:e Berater:in-Sprech)
- [ ] Placement: auf /sparring oder eigener /cases-Seite

---

## P2 – Hoch (innerhalb 4–8 Wochen)

---

### ☑ #5 · Prozess-Transparenz "Was passiert nach dem Klick" · / ✅
**Kategorie:** 🤖 CLAUDE CODE → 🎨 FRAMER

**Problem:** Kein Hinweis, was nach dem Klick auf "Case besprechen" passiert. Fehlende Vorhersehbarkeit hemmt die Handlung.

**Was Claude macht:** Vollständig. Entwirft einen kurzen 3-Schritte-Block ("So läuft es ab") im Stil der Site.

**Definition of Done:**
- [ ] Sichtbar auf Homepage, nahe am CTA
- [ ] Genau 3 Schritte (nicht mehr): z.B. "Termin buchen → Erstgespräch 30 min → Gemeinsam entscheiden"
- [ ] Kein Commitment-Sprech ("kostenlos", "unverbindlich" explizit erwähnt)
- [ ] Visuell in bestehende Site-Ästhetik integriert

---

### ☑ #6 · CTA-Inkonsistenz bereinigen (polar.sh vs. calendar) · Alle Seiten ✅
**Kategorie:** 🤖 CLAUDE CODE (Audit) → 🎨 FRAMER (Fix)

**Problem:** Header-CTA verlinkt auf buy.polar.sh (Payment-Link). Alle anderen CTAs zeigen auf calendar.app.google. Payment-Link im Header ist kontraproduktiv für das Positioning.

**Was Claude macht:** Vollständiger Audit aller CTA-Links auf allen drei Seiten, mit Fundstellen.

**Definition of Done:**
- [ ] Alle "Case besprechen"-Buttons verlinken auf denselben Kalender-Link
- [ ] Kein Payment-Link erscheint vor dem Erstgespräch
- [ ] Überprüft auf: /, /sparring, /about, /contact
- [ ] Beide CTA-Link-Varianten im Framer-Editor auf einen einheitlichen Wert gesetzt

---

### ☑ #7 · Schema.org Markup implementieren · Alle Seiten ✅
**Kategorie:** 🤖 CLAUDE CODE → 🎨 FRAMER (Custom Code → Head)

**Problem:** Kein strukturiertes Markup. Kritisch für Entity Management und Name-Collision-Disambiguierung.

**Was Claude macht:** Vollständig. Generiert ein valides JSON-LD Snippet für `Person` + `ProfessionalService`, das Du in Framer's Custom Code (Head) einfügst.

**In Framer:** Projekt-Einstellungen → Custom Code → "Start of `<head>` tag" → Code einfügen.

**Definition of Done:**
- [ ] JSON-LD Snippet mit `@type: Person` vorhanden (Name, jobTitle, url, sameAs: LinkedIn-URL)
- [ ] JSON-LD Snippet mit `@type: ProfessionalService` vorhanden (name, description, areaServed: "DE, AT, CH")
- [ ] Validiert mit Google's Rich Results Test (search.google.com/test/rich-results)
- [ ] LinkedIn-URL im sameAs-Feld korrekt eingetragen

**Prompt für Claude Code:**
```
Generiere valides JSON-LD Schema.org Markup für raphaelbaruch.com.
Person: Raphael Baruch, Executive Sparringspartner mit Geschäftsführungserfahrung.
ProfessionalService: Executive Sparring für Führungskräfte, DACH-Raum, Remote.
LinkedIn-URL: [DEINE LINKEDIN-URL EINFÜGEN].
Format: Einzelner <script type="application/ld+json"> Block, validiert.
```

---

### ☐ #8 · Investitionsrahmen / Preissignal · /sparring
**Kategorie:** 🤝 HYBRID

**Problem:** Kein Hinweis auf Preisrahmen. Führt zu Preisschock im Erstgespräch.

**Dein Input:** Entscheide, wie viel Du kommunizieren willst:
- Option A: Exakter Einstiegspreis ("ab X EUR / Session")
- Option B: Rahmengefühl ("typische Engagements: X–Y EUR/Monat")
- Option C: Kein Preis, aber Signal ("Dieses Angebot richtet sich an Führungskräfte, die in ihre Entwicklung investieren")

**Definition of Done:**
- [ ] Min. Option C ist auf /sparring sichtbar
- [ ] Kein Preisschock im Erstgespräch (Klient:in hat eine Größenordnung im Kopf)
- [ ] Formulierung konsistent mit Premium-Positioning (kein "günstig" oder "flexibel")

---

### ☑ #9 · Quiz-Link fixen oder entfernen · /sparring ✅
**Kategorie:** 🤖 CLAUDE CODE → 🎨 FRAMER

**Problem:** "Nicht sicher, welches Format passt? Mach das kurze Quiz!" verlinkt auf `#quiz` — ein Anker, der nicht existiert. Broken Link.

**Sofortmaßnahme (Claude Code, 5 Minuten):** Link entfernen oder Text ersetzen durch "Schreib mir kurz Deinen Case →" mit Kalender-Link.

**Mittelfristig (optional):** 3–5-Fragen-Quiz als Framer-Component oder externes Tool (Typeform free tier).

**Definition of Done:**
- [ ] Kein Broken Link mehr auf /sparring
- [ ] Entweder: Link entfernt, oder: Quiz implementiert und funktionsfähig
- [ ] Falls Quiz: Empfehlung am Ende zu konkretem Format, mit CTA zum Erstgespräch

---

### ☑ #10 · Bridge: Story → heutige Tätigkeit · /about ✅
**Kategorie:** 🤖 CLAUDE CODE → 🎨 FRAMER

**Problem:** About-Page endet mit der Transformation-Phase. Kein expliziter Abschluss "Und deshalb mache ich heute, was ich tue."

**Was Claude macht:** Vollständig. Entwirft 3 Varianten des Abschluss-Absatzes, du wählst.

**Definition of Done:**
- [ ] About-Page hat einen finalen Abschnitt, der die Story mit dem heutigen Angebot verbindet
- [ ] Enthält einen CTA ("Case besprechen →")
- [ ] Klingt nach Raphael, nicht nach Beratungsbroschüre
- [ ] Max. 3–4 Sätze (Dichte > Länge)

---

### ☐ #11 · Externe Credentials, Certifications & LinkedIn-Link · /about
**Kategorie:** 🤝 HYBRID → 🎨 FRAMER

**Problem:** thekey.academy wird erwähnt, aber kein Link. Kein LinkedIn. Kein externer Nachweis, dass die erzählte Story stimmt. Zusätzlich fehlt ein sauberer Ort für relevante Certifications / Weiterbildungen.

**Dein Input:**
- LinkedIn-URL
- Optional: Link zu thekey.academy (falls noch aktiv oder archiviert)
- Liste relevanter Certifications / Ausbildungen / Weiterbildungen mit Institution + Jahr

**Vorbereitet:**
- Framer-Komponente `CredentialsSwipeCards.tsx` mit Swipe-Cards, optionalem Logo/Icon-Upload und bis zu 2 inhaltlichen Bullets pro Credential

**Definition of Done:**
- [ ] LinkedIn-Profil-Link auf /about sichtbar und korrekt
- [ ] thekey.academy entweder verlinkt oder mit erklärendem Satz versehen ("heute Teil von X" oder "2022 erfolgreich verkauft")
- [ ] Business-Coach-Ausbildung kurz erwähnt (Institution + Jahr reicht)
- [ ] Weitere relevante Certifications können modular ergänzt werden (Titel, Institution, Jahr, optional Link)

---

## P3 – Mittel (mittelfristig, 2–4 Monate)

---

### ☐ #12 · Outcomes-Sektion: Was nimmt die Klient:in mit? · /sparring
**Kategorie:** 🤝 HYBRID → 🎨 FRAMER

**Definition of Done:**
- [ ] Min. 3 konkrete Output-Formulierungen sichtbar (keine abstrakten Versprechen)
- [ ] Formulierungen in Ich-Perspektive des Klient:innen ("Ich verlasse das Gespräch mit...")
- [ ] Keine messbaren KPIs versprochen (Integrität wahren)

---

### ☐ #13 · Negativfilter "Das ist nicht für Dich, wenn..." · /sparring
**Kategorie:** 🤖 CLAUDE CODE → 🎨 FRAMER

**Definition of Done:**
- [ ] 3–4 klare Ausschluss-Kriterien sichtbar auf /sparring
- [ ] Tonalität respektvoll, nicht arrogant
- [ ] Erhöht die Selbst-Selektion vor dem Erstgespräch messbar (weniger Fehl-Leads)

---

### ☐ #14 · FAQ-Antworten server-seitig rendern · / (Homepage)
**Kategorie:** 🤖 CLAUDE CODE (Analyse) → 🎨 FRAMER

**Problem:** FAQ-Akkordeons werden möglicherweise rein client-seitig gerendert. Google indexiert die Antworten dann nicht.

**Was Claude macht:** Analysiert, ob das ein Problem ist (Framer rendert je nach Setup unterschiedlich), und empfiehlt Fix.

**Definition of Done:**
- [ ] FAQ-Antworten in Google Search Console als indexiert bestätigt
- [ ] Alternativ: FAQ-Inhalte als statischer Text auf Seite zugänglich (nicht nur im Akkordeon versteckt)

---

### ☐ #15 · Content-Hub / Blog aufbauen · Neue Seite /blog
**Kategorie:** ✍️ DEIN INPUT → 🤝 HYBRID

**Warum:** Topical Authority für Google + Auffindbarkeit in ChatGPT, Perplexity & Co. (GEO).

**Dein Input:** 3 Themen, zu denen Du eine klare Meinung hast (z.B. "Warum Einsamkeit in der Führung kein Soft-Skill-Problem ist").

**Definition of Done:**
- [ ] Min. 1 Artikel live (min. 1.200 Wörter, eigene Meinung, kein:e Berater:in-Generisch)
- [ ] /blog als Seite in Framer eingerichtet
- [ ] Artikel intern verlinkt (von Homepage und /about)
- [ ] Rhythmus definiert: min. 1 Artikel / Monat

---

### ☐ #16 · Raphael's inhaltliche Haltung sichtbar machen · /about
**Kategorie:** ✍️ DEIN INPUT → 🤖 CLAUDE CODE → 🎨 FRAMER

**Dein Input:** 2–3 Sätze zu: "Was glaubst Du über Führung, das die meisten falsch sehen?"

**Definition of Done:**
- [ ] Min. 2 pointierte "Ich glaube, dass..."-Aussagen auf /about sichtbar
- [ ] Keine vagen Buzzwords, echte Position

---

### ☐ #17 · Räumliche Reichweite kommunizieren · / (Homepage)
**Kategorie:** 🤖 CLAUDE CODE → 🎨 FRAMER

**Definition of Done:**
- [ ] Kurzer Hinweis auf Arbeitsweise sichtbar (remote / hybrid / Berlin)
- [ ] Max. 1 Satz, natürlich eingebettet (kein extra-Abschnitt nötig)

---

### ☐ #18 · LinkedIn & externe Verlinkungen für Entity Management · /about
**Kategorie:** 🎨 FRAMER (nach #11 automatisch erledigt)

**Definition of Done:**
- [ ] LinkedIn im Footer oder /about verlinkt
- [ ] LinkedIn-Profil konsistent mit Website (gleiche Positionierung, gleicher Titel)
- [ ] sameAs-Feld in Schema.org (Task #7) mit LinkedIn-URL befüllt

---

## Peer Sparring Operating System — Slice 1 Wiring

> Eigener Workstream, nicht Website-Content. Slice 1 (Intake + AI Prep Sheet) ist code-seitig fertig — diese Tasks bringen es live.
> Operativer Runbook: `docs/peer-sparring/README.md`. Vollständiger Plan über alle 4 Slices: `~/.claude/plans/read-docs-products-md-carefully-the-recursive-frog.md`.

---

### ☐ #19 · Phase A — Externe Accounts einrichten · Peer Sparring
**Kategorie:** ✍️ DEIN INPUT
**Zeitschätzung:** ~30 min
**Kosten:** alles im Free Tier (Anthropic ausgenommen — läuft über bestehenden Editorial-Pipeline-Key)

**Definition of Done:**
- [ ] **Supabase**: neues Projekt erstellt; Project URL und service-role key gesichert (Settings → API → service_role)
- [ ] **Supabase**: `supabase/migrations/001_init.sql` im SQL Editor ausgeführt — `clients`, `cases` und Enums `session_status`, `session_mode`, `capture_source` existieren
- [ ] **Google Drive**: Parent-Ordner (z. B. `Peer Sparring — Cases`) angelegt; Folder-ID aus URL `/folders/<id>` gesichert
- [ ] **Resend**: Account erstellt; Sender-Domain via DNS-Record verifiziert; API-Key gesichert
- [ ] **Anthropic**: API-Key vorhanden (i. d. R. derselbe wie für die Editorial Pipeline)

---

### ☐ #20 · Phase B — n8n Workflow wiring · Peer Sparring
**Kategorie:** ✍️ DEIN INPUT (n8n)
**Zeitschätzung:** ~20 min
**Voraussetzung:** #19 abgeschlossen

**Definition of Done:**
- [ ] Dieses Repo auf dem n8n-Host gemountet (gleicher Pfad wie für die Editorial Pipeline)
- [ ] `automations/n8n/peer-sparring/intake-and-prep.json` in n8n importiert
- [ ] **Runtime Config** Node befüllt: `repoPath`, `supabaseUrl`, `driveCaseRootFolderId`, `raphaelEmail`, `notificationFromEmail`, `publicSiteUrl`
- [ ] Credential `REPLACE_ANTHROPIC_CREDENTIAL_ID` → echter Anthropic Header-Auth Credential
- [ ] Credential `REPLACE_SUPABASE_SERVICEROLE_CRED` → echter Supabase service-role Header-Auth Credential (`apikey` + `Authorization: Bearer`)
- [ ] Credential `REPLACE_GOOGLE_DRIVE_OAUTH` → Google Drive/Docs OAuth2 (Scopes `drive.file`, `documents`)
- [ ] Credential `REPLACE_RESEND_API_CRED` → Resend Header-Auth Credential (`Authorization: Bearer`)
- [ ] Workflow aktiviert; produktive Webhook-URL aus **Intake Webhook** Node kopiert

---

### ☐ #21 · Phase C — Framer Intake Form einbauen · Peer Sparring
**Kategorie:** 🎨 FRAMER
**Zeitschätzung:** ~15 min
**Voraussetzung:** #20 abgeschlossen

**Definition of Done:**
- [ ] Neue Code Component in Framer angelegt mit dem Inhalt aus `src/components/CaseBriefIntake.tsx`
- [ ] Neue Seite `/case-brief` angelegt — **nicht** in die öffentliche Navigation aufnehmen (sechs sichtbare Seiten bleiben sechs)
- [ ] `CaseBriefIntake` Component auf die Seite gezogen
- [ ] Property `Webhook URL` auf die n8n-URL aus #20 gesetzt
- [ ] Properties `Privacy URL` und `Success CTA URL` gesetzt
- [ ] Seite publiziert

---

### ☐ #22 · Phase D — End-to-End Smoke Test · Peer Sparring
**Kategorie:** ✍️ DEIN INPUT
**Zeitschätzung:** ~10 min
**Voraussetzung:** #21 abgeschlossen

**Definition of Done:**
- [ ] Synthetischen Case Brief über das Framer-Formular eingereicht → Server antwortet mit `200` und `case_id`
- [ ] In Supabase Studio: ein Row in `clients`, ein Row in `cases` mit `status='Prepared'` und nicht-leerer `prep_doc_url`
- [ ] In Google Drive: Folder `<case_id> — <case_title>` existiert mit dem Prep-Sheet-Doc darin
- [ ] Prep Sheet liest sich wie Raphaels Stimme — kein `Sparringspartner` mit Fugen-s, kein `Ultimately`, kein `delve/leverage/journey/pivotal`
- [ ] Raphaels Inbox: Benachrichtigungs-Mail mit Doc-Link und Case-ID
- [ ] Test-Client-Inbox: Empfangs-Mail ohne Case-Inhalt
- [ ] Duplikat-Test: zweite Submission mit derselben E-Mail → `409 open_case_exists`
- [ ] Validierungs-Test: Submission mit `konkreter_anlass` < 30 Zeichen → `400 validation_failed` mit Feld-Detail

---

## Empfohlene Reihenfolge

```
Sprint 1 (diese Woche, 1–2h):
  #2 Meta Tags       → Claude Code, 15 min → Framer eintragen
  #6 CTA Fix         → Claude Code, 10 min → Framer korrigieren
  #9 Quiz Link       → Framer, 5 min
  #7 Schema Markup   → Claude Code, 20 min → Framer Custom Code einfügen

Sprint 2 (nächste 2 Wochen, Dein Input nötig):
  #1 Testimonials    → Du sammelst → Claude redigiert → Framer
  #4 Case Studies    → Du erzählst 3 Fälle → Claude schreibt → Framer
  #10 Bridge /about  → Claude entwirft → Du wählst → Framer
  #11 LinkedIn       → Du lieferst URL → Framer

Sprint 3 (Monat 2):
  #3 Format-Details  → Du beantwortest Fragen → Claude schreibt → Framer
  #5 Prozess-Block   → Claude entwirft → Framer
  #8 Preissignal     → Du entscheidest Level → Claude formuliert → Framer

Mittelfristig (Monat 2–4):
  #12 Outcomes
  #13 Negativfilter
  #14 FAQ-Indexierung
  #15 Blog / Content
  #16 Haltung /about
  #17 Remote-Hinweis
  #18 (via #11 + #7 bereits erledigt)
```
