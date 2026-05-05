# CTA-Audit — raphaelbaruch.com (Task #6)

**Korrekter Kalender-Link:**
```
https://calendar.app.google/TxnYmbFXwquFFQKK9
```

---

## Was im Code bereits gefixt wurde

Die folgenden Komponenten haben korrekte Defaults im Code:

| Komponente | Prop | War | Jetzt |
|---|---|---|---|
| `PageHeader` | `ctaHref` | `/erstgespraech` | ✅ Kalender-Link |
| `HeroAnimated` | `ctaHref` | `#` | ✅ Kalender-Link |
| `CollaborativeFAQ` | `ctaHref` | `#` | ✅ Kalender-Link |
| `QuestionnaireOverlay` | `bookingLink` | `/erstgespraech` | ✅ Kalender-Link |
| `QuestionnaireOverlay` | `ctaLink` (pro Result-Item) | `/erstgespraech` | ✅ Kalender-Link |

---

## Was du in Framer manuell ändern musst

> Framer speichert die Werte pro Instanz im Canvas — Code-Defaults gelten nur für neu eingefügte Komponenten. Bestehende Instanzen musst du einmal manuell updaten.

### Seite: `/` (Homepage)

| Wo | Komponente | Prop im Framer-Panel | Auf diesen Wert setzen |
|---|---|---|---|
| Header (global) | `PageHeader` | "CTA Link" | `https://calendar.app.google/TxnYmbFXwquFFQKK9` |
| Hero-Bereich | `HeroAnimated` | "CTA URL" | `https://calendar.app.google/TxnYmbFXwquFFQKK9` |
| FAQ-Sektion | `CollaborativeFAQ` | "CTA URL" | `https://calendar.app.google/TxnYmbFXwquFFQKK9` |

### Seite: `/sparring`

| Wo | Komponente | Prop im Framer-Panel | Auf diesen Wert setzen |
|---|---|---|---|
| Header (global) | `PageHeader` | "CTA Link" | `https://calendar.app.google/TxnYmbFXwquFFQKK9` |
| Quiz-Overlay | `QuestionnaireOverlay` | "Booking Link" | `https://calendar.app.google/TxnYmbFXwquFFQKK9` |
| Jedes Format-Result | `QuestionnaireOverlay` → Results | "CTA Link" (pro Item) | `https://calendar.app.google/TxnYmbFXwquFFQKK9` |

### Seite: `/about`

| Wo | Komponente | Prop im Framer-Panel | Auf diesen Wert setzen |
|---|---|---|---|
| Header (global) | `PageHeader` | "CTA Link" | `https://calendar.app.google/TxnYmbFXwquFFQKK9` |
| StoryBridge | `StoryBridge` | "CTA Link" | `https://calendar.app.google/TxnYmbFXwquFFQKK9` |

---

## Globaler Header — wichtigster Fix

Der Header erscheint auf allen Seiten. Wenn Framer den Header als geteilte Komponente (shared layer) behandelt, reicht **eine Änderung** für alle Seiten gleichzeitig.

Prüfe: Ist "PageHeader" im Framer-Canvas ein **Master-Component** (lila Rahmen)? Dann genügt eine Änderung.

---

## Noch nicht fixer: `buy.polar.sh`

Der Payment-Link taucht im Code nicht auf — er ist direkt in Framer als Link hinterlegt (nicht über eine Komponenten-Prop). Suche im Framer-Canvas nach Buttons/Links und prüfe deren `href`-Feld direkt im Link-Panel (Ketten-Symbol im rechten Panel).
