# Peer Sparring — Intake Payload Contract

> Contract between the Framer intake form (`src/components/CaseBriefIntake.tsx`) and the n8n webhook `POST /webhook/peer-sparring-intake` (`automations/n8n/peer-sparring/intake-and-prep.json`).

## Endpoint

```
POST {{n8nHost}}/webhook/peer-sparring-intake
Content-Type: application/json
```

No auth header in v1 — the webhook is single-purpose, rate-limited at n8n, and protected by payload validation. Hardening (HMAC-signed timestamp) is a Slice 3 follow-up.

## Request payload

All field keys are German because the downstream Prep Sheet prompt reads them verbatim. Do not translate the keys.

```json
{
  "client": {
    "name": "string",
    "email": "string"
  },
  "case_brief": {
    "konkreter_anlass": "string",
    "entscheidung_oder_spannung": "string",
    "beteiligte": "string",
    "bisher_versucht": "string",
    "gutes_ergebnis": "string",
    "dringlichkeit": "string|null",
    "constraints": "string|null",
    "aktuelle_hypothese": "string|null",
    "optionaler_kontext": "string|null"
  },
  "session_mode": "offline|live|online",
  "consent": {
    "data_processing": true,
    "marketing": false
  },
  "submitted_at": "2026-05-11T14:22:00.000Z"
}
```

## Field requirements

| Field | Required | Validation |
|---|---|---|
| `client.name` | yes | trimmed, length 2..120 |
| `client.email` | yes | matches `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, lowercased on the server side |
| `case_brief.konkreter_anlass` | yes | trimmed, length ≥ 30 |
| `case_brief.entscheidung_oder_spannung` | yes | trimmed, length ≥ 30 |
| `case_brief.beteiligte` | yes | trimmed, length ≥ 3 |
| `case_brief.bisher_versucht` | yes | trimmed, length ≥ 3 |
| `case_brief.gutes_ergebnis` | yes | trimmed, length ≥ 3 |
| `case_brief.dringlichkeit` | no | free text |
| `case_brief.constraints` | no | free text |
| `case_brief.aktuelle_hypothese` | no | free text |
| `case_brief.optionaler_kontext` | no | free text or links |
| `session_mode` | yes | one of `offline`, `live`, `online` |
| `consent.data_processing` | yes | must be `true` — server rejects `false` |
| `consent.marketing` | no | boolean, default `false`; persisted on `clients.marketing_consent` |
| `submitted_at` | yes | ISO-8601, server-side comparison rejects deltas >24h |

## Server-side normalisation

- `client.email` → `email.trim().toLowerCase()`
- `client.name` → collapsed inner whitespace
- `consent.marketing` → stored as `clients.marketing_consent`; if `true`, `clients.marketing_consent_at` is set from `submitted_at`
- All `case_brief.*` strings → `.trim()`, preserve internal line breaks
- `case_title` is derived (not sent by Framer): first 60 chars of `konkreter_anlass`, trimmed at word boundary, no trailing punctuation

## Responses

### 200 OK

```json
{
  "ok": true,
  "case_id": "8f4f6c20-2c9c-4f0a-9a3b-9c4f6c20a3b9"
}
```

### 400 Bad Request — validation failure

```json
{
  "ok": false,
  "error": "validation_failed",
  "details": [
    { "field": "case_brief.konkreter_anlass", "rule": "min_length", "expected": 30 }
  ]
}
```

The Framer form should map `details[].field` back to its step and surface the inline error.

### 409 Conflict — open case already exists for the email

```json
{
  "ok": false,
  "error": "open_case_exists",
  "message": "Es gibt bereits einen offenen Case für diese E-Mail. Raphael meldet sich dort."
}
```

n8n treats `clients` as upserted-by-email; if a non-archived case already exists for the same client, the webhook returns `409` and does not create a duplicate. v1 surface this as a friendly note.

### 5xx — n8n or upstream failure

The form falls back to "Bitte versuche es in einem Moment noch einmal — oder schreibe direkt an raphael@…". Do not silently swallow.
