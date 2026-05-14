# Temp — Zum Kopieren

## Smoke Test — curl (finale Version)

```
curl -s -X POST https://n8n-latest-8exi.onrender.com/webhook/peer-sparring-intake -H "Content-Type: application/json" -d '{"client":{"name":"Test Führungskraft","email":"rb@raphaelbaruch.com"},"case_brief":{"konkreter_anlass":"Mein Co-Founder und ich sind seit drei Wochen im Dauerstreit über die Wachstumsstrategie.","entscheidung_oder_spannung":"Ich muss entscheiden ob ich die Investorenrunde jetzt schließe oder noch sechs Monate warte.","beteiligte":"Co-Founder, Board, zwei Lead-Investoren","bisher_versucht":"Offsite gemacht, externer Moderator, hat nichts gebracht","gutes_ergebnis":"Klarheit über meine eigene Position, bevor ich das nächste Board-Meeting eröffne"},"session_mode":"online","consent":{"data_processing":true,"marketing":false},"submitted_at":"2026-05-13T10:00:00.000Z"}'
```

---

## Notify Raphael — Body (komplett ersetzen)

```
{{ { from: $('Runtime Config').first().json.notificationFromEmail, to: [$('Runtime Config').first().json.raphaelEmail], subject: 'Neuer Peer Sparring Case Brief: ' + $('Extract Prep Markdown').first().json.case_title, text: 'Case-Titel: ' + $('Extract Prep Markdown').first().json.case_title + '\nClient: ' + $('Extract Prep Markdown').first().json.client_name + ' <' + $('Extract Prep Markdown').first().json.client_email + '>\nPrep Sheet: https://docs.google.com/document/d/' + ($('Write Prep Doc Body').first().json.documentId || $('Write Prep Doc Body').first().json.id) + '\n\nCase-ID: ' + $('Extract Prep Markdown').first().json.case_id } }}
```

---

## Write Prep Doc Body — Text-Feld (fx-Modus)

```
{{ $('Extract Prep Markdown').first().json.prepMarkdown }}
```

---

## Insert Case — JSON Body (komplett ersetzen)

```
{ "client_id": "{{ $('Upsert Client').first().json.id }}", "case_title": "{{ $('Validate Payload').first().json.case_title }}", "case_brief": {{ JSON.stringify($('Validate Payload').first().json.case_brief) }}, "session_mode": "{{ $('Validate Payload').first().json.session_mode }}", "status": "Brief received" }
```

---

## Check Open Case — Einrichtung

### URL (in das URL-Feld eintippen — der {{ }}-Block wird automatisch als Expression erkannt)
```
https://kzpbqbdnvaqeccnwyorj.supabase.co/rest/v1/cases?client_id=eq.{{ $json.clientId }}&status=in.("Brief received","Prepared","Session complete","Summary in review","Update available")&select=case_id
```

### Send Query Parameters — NUR apikey
| Name | Wert |
|------|------|
| `apikey` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6cGJxYmRudmFxZWNjbnd5b3JqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODUwODMwNywiZXhwIjoyMDk0MDg0MzA3fQ.F7WQdVEhajfOSHB8qdFj2SJArGM0jyflwU4SvsXFkZw` |

---

## Build Prep Prompt — vollständiger Code-Node (in n8n ersetzen)

```javascript
const payload = $('Validate Payload').first().json;
const caseRow = $('Insert Case').first().json;
const folder = $('Create Drive Folder').first().json;
const caseBriefJson = JSON.stringify(payload.case_brief, null, 2);

const promptTemplate = `You are Raphael Baruch's internal Vorbereiter for Peer Sparring sessions.

Your output is never client-facing. You write for Raphael alone — to sharpen his attention before a 90-minute Peer Sparring session. You formulate hypotheses, mark Spannungsfelder, suggest Leitfragen. You do not produce solutions, action plans, or a "fix."

Source inputs (provided at runtime):
- client_name — leadership figure who submitted the Case Brief.
- case_brief — the structured intake object (German keys).
- case_title — derived short title for headings.

Voice constraints (non-negotiable — violations are blockers):

1. Never write "Sparringspartner" or "Sparringsraum" — always Sparringpartner and Sparringraum without Fugen-s.
2. No AI-slop patterns: no "Es ist nicht nur X, es ist Y", no adjective-piling ("comprehensive holistic seamless"), no smoothing verbs ("delve", "leverage", "journey", "pivotal", "vibrant"), no "Ultimately" or "In summary" closings.
3. Affirmativ statt Negation als Default — sag was etwas ist, nicht was es nicht ist. Negation als gelegentliche Pointe ist erlaubt, nicht als Standard-Opener.
4. Gendering: prefer neutral collective forms (Führungskraft, Mitarbeitende, Team, Gegenüber). When unavoidable, use the Doppelpunkt (Kolleg:in, Gründer:in). Never asterisk, Binnen-I, slash. Englische Begriffe (Coach, CEO, Founder) bleiben unangetastet.
5. Du-Ansprache wo direkt adressiert; ansonsten neutral. Niemals Sie/Du im selben Dokument mischen.
6. Substanz-Wörter erlaubt und erwünscht: Urteilskraft, Aushalten, Zäsur, Resonanzraum, Substanz, Tollkühnheit.

Output format:

Return plain text only — no Markdown syntax, no JSON wrapper. No asterisks, no pound signs, no backticks, no dashes used as list markers. The output is written verbatim into a private Google Doc and must read cleanly without any markup characters visible.

Use exactly this section order. Each section title appears on its own line in UPPERCASE, separated from the content below by one blank line. Sections are separated from each other by one blank line.

Use em dashes (—) as bullet substitutes where lists are needed. Use plain numbered lines (1. 2. 3.) for sequences.


PREP SHEET — {{case_title}}


AUSGANGSLAGE IN EINEM SATZ

Ein Satz. Maximal 220 Zeichen. Was liegt wirklich auf dem Tisch?


WAS STEHT WIRKLICH AUF DEM TISCH

3–5 Beobachtungen. Jede beginnt mit einem konkreten Detail aus dem Brief (z. B. eine Person, ein Ereignis, eine Zahl) — keine Verallgemeinerungen. Keine Diagnosen.


VERMUTETE KERNSPANNUNG

1–2 Hypothesen, jeweils ein bis zwei Sätze. Markiere sie explizit als Hypothese (z. B. "Mögliche Spannung:" oder "Hypothese:"). Diese Sektion ist Vermutung, kein Befund.


LEITFRAGEN FÜR DIE 90 MINUTEN

6–8 Fragen, gruppiert nach den Session-Phasen. Jede Phase als eigene Zeile, darunter die Fragen mit em dash.

Ankommen & Contracting (00–10)
— …

Case öffnen (10–30)
— …

Spannung zuspitzen (30–60)
— …

Optionen & Ownership (60–80)
— …

Commitment (80–90)
— …

Mindestens eine Frage pro Phase. Fragen sind offen formuliert, nicht suggestiv. Keine Frage hat eine implizite Antwort.


WOVOR WARNEN

Worüber Raphael bewusst nicht hinwegspringen sollte. 2–4 Punkte mit em dash. Markiere klar: "Klingt nach Symptom, ist vermutlich …" oder "Wird leicht als X gelesen, ist eher Y."


WAS BEWUSST NICHT VORBEREITEN

Was diese Person selbst sortieren muss. 1–3 Punkte mit em dash. Hier soll Raphael nicht zuerst eintreten — das ist Ownership-Territorium.


Quality bar:

The Prep Sheet is useful if Raphael, reading it 5 minutes before the session, knows:
— where the unobvious tension probably sits,
— which questions to not ask first (because they short-circuit the case),
— where to slow down rather than push.

The Prep Sheet is not useful if it:
— summarises the Case Brief back without adding hypotheses,
— offers a coaching framework or a decision matrix,
— recommends a specific action ("Du solltest X tun"),
— uses any of the voice-violations above.

If the Case Brief is too thin to support a real hypothesis (e.g. all optional fields blank and required fields under 60 chars), say so explicitly in the Vermutete Kernspannung section: "Brief reicht für gesicherte Hypothesen nicht aus — Sektion Leitfragen zielt auf Aufmachen, nicht auf Zuspitzen."

Inputs:

client_name: {{client_name}}
case_title: {{case_title}}
case_brief:
{{case_brief_json}}`;

const rendered = promptTemplate
  .replace(/\{\{client_name\}\}/g, payload.client.name)
  .replace(/\{\{case_title\}\}/g, payload.case_title)
  .replace(/\{\{case_brief_json\}\}/g, caseBriefJson);

return [{ json: {
  prompt: rendered,
  case_id: caseRow.case_id,
  case_title: payload.case_title,
  client_name: payload.client.name,
  client_email: payload.client.email,
  folder_id: folder.id || folder.fileId || folder.folderId
} }];
```
