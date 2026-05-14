# Peer Sparring Operating System — Runbook

> Operating reference for the Peer Sparring automation. Mirror of `docs/weekly-seo-geo-editorial-automation.md` in scope and shape.
> Product spec: `docs/products.md` Appendix A (PRD).
> Last updated: 2026-05-11.

## Status

**Slice 1 of 4 — Intake + Prep Sheet.** Subsequent slices (Summary Draft, Customer Space + Magic Link, PDF + Retention) are planned in `/Users/raphaelbaruch/.claude/plans/read-docs-products-md-carefully-the-recursive-frog.md`.

## What Slice 1 does

A leader submits the Framer Case Brief form → n8n validates and persists to Supabase → creates a private Google Drive case folder → calls Claude with the Prep Sheet prompt → writes the result into a Google Doc → emails Raphael with the link → confirms the client (no case content in the email body).

End-state per case:
- One row in `clients`, one row in `cases` (`status='Prepared'`, `prep_doc_url` populated).
- Optional marketing opt-in is stored on `clients.marketing_consent` with `marketing_consent_at`.
- One Drive folder named `${case_id} — ${case_title}` under the configured root.
- One Google Doc inside that folder named `Prep Sheet — ${case_title}`.
- One internal email to Raphael, one confirmation email to the client.

## Runtime

- Self-hosted n8n (same host as the editorial pipeline).
- Timezone: `Europe/Berlin`.
- Supabase project (free tier sufficient for v1).
- Anthropic API (Claude — `claude-opus-4-7` default).
- Resend (transactional email).
- Google Workspace account (Drive + Docs scopes, Raphael's account).

## Credentials to add in n8n

Each appears as a `REPLACE_*` placeholder inside `intake-and-prep.json` — overwrite after import.

| Credential ID in JSON                | n8n Credential Type     | Notes                              |
|--------------------------------------|-------------------------|------------------------------------|
| `REPLACE_ANTHROPIC_CREDENTIAL_ID`    | Header Auth             | header `x-api-key: <key>` |
| `REPLACE_SUPABASE_SERVICEROLE_CRED`  | Header Auth             | headers `apikey: <key>`, `Authorization: Bearer <key>` |
| `REPLACE_GOOGLE_DRIVE_OAUTH`         | Google Drive / Docs OAuth2 | scopes: `drive.file`, `documents` |
| `REPLACE_RESEND_API_CRED`            | Header Auth             | header `Authorization: Bearer <key>` |

Never hard-code keys in the workflow JSON. Use n8n credentials.

## Supabase setup

1. Create a Supabase project. Note the Project URL and service-role key.
2. Run `supabase/migrations/001_init.sql` (Supabase Studio → SQL editor).
3. Set the service-role key in n8n as `REPLACE_SUPABASE_SERVICEROLE_CRED`.
4. Confirm tables `clients` and `cases` exist; confirm enums `session_status`, `session_mode`, `capture_source`.

## Google Drive setup

1. Create a root Drive folder for Peer Sparring cases (e.g. `Peer Sparring — Cases`).
2. Copy its folder ID (URL: `https://drive.google.com/drive/folders/<id>`).
3. Paste into Runtime Config → `driveCaseRootFolderId`.

## n8n import

1. In n8n, import `automations/n8n/peer-sparring/intake-and-prep.json`.
2. Open `Runtime Config`. Set:
   - `repoPath` — absolute path where this repo is mounted on the n8n host.
   - `supabaseUrl` — your Supabase project URL.
   - `driveCaseRootFolderId` — see above.
   - `raphaelEmail` — Raphael's inbox.
   - `notificationFromEmail` — a Resend-verified sender domain.
   - `publicSiteUrl` — your Framer-published domain (used downstream in Slice 3).
3. Wire each credential placeholder to its real n8n credential.
4. Activate the workflow. The webhook URL appears in the **Intake Webhook** node; paste it into the Framer component's `webhookUrl` property.

## Framer component

`src/components/CaseBriefIntake.tsx` is a Code Component. To use:

1. In Framer, create a new Code Component and paste the file's contents.
2. Add an instance on `/case-brief` (a new page — currently not in public navigation).
3. Set the `Webhook URL` property to the active n8n webhook URL.
4. Set `Privacy URL` and `Success CTA URL` to match the site.
5. Publish the page.

## Voice & brand guardrails

All copy in this automation must follow `docs/raphaelbaruch-style.md` §2. Specifically — and these are enforced in both the prompt and the form copy:

- **Sparringpartner / Sparringraum** (no Fugen-s).
- Affirmative framing; no "Es ist nicht nur X, es ist Y" defaults.
- Doppelpunkt-gendering when needed; English loanwords ungenderter.
- Solid borders only in the UI (no dashed/dotted).
- No AI-slop verbs / closings (`delve`, `leverage`, `Ultimately`, etc.).

## Manual test plan (Slice 1)

1. With the workflow active, submit a synthetic Case Brief via the Framer preview pointing at the active webhook.
2. Confirm 200 response with a `case_id`.
3. Verify in Supabase Studio: one row in `clients`, one row in `cases` with `status='Prepared'`, `prep_doc_url` non-null, `case_brief` jsonb populated, and `marketing_consent` matching the form opt-in.
4. Verify in Google Drive: a folder `${case_id} — …` exists under the root, containing the `Prep Sheet — …` Doc.
5. Open the Prep Sheet — check the 6 mandated sections from the prompt are present, and that no voice violations exist (`Sparringspartner`, `Ultimately`, "delve", "leverage", "journey", "pivotal").
6. Confirm Raphael's inbox got a notification email with the doc link.
7. Confirm the client inbox got a no-content confirmation email.
8. Submit a second Case Brief with the same email → expect `409 open_case_exists`.
9. Submit a payload with `konkreter_anlass` < 30 chars → expect `400 validation_failed` with the field listed in `details`.

## Storage policy

- Client case content lives in Supabase + Google Drive only — **never** in this repo.
- The `case_brief` jsonb column is in scope of Supabase RLS (Slice 3); until RLS lands, treat the service-role key as a high-sensitivity credential.
- Source captures (voice memos, transcripts) land in `_capture/` per case folder in Slice 2 and are subject to 90-day retention per PRD §11.

## Known limitations (v1, Slice 1)

- No HMAC signing on the webhook — relies on rate-limit + payload validation. Hardening lined up with Slice 3.
- No Supabase Auth user creation yet (lands in Slice 3 alongside RLS, so `client_id` and `auth.uid()` line up).
- No PDF, no portal, no magic link. Slices 2–4.
- Raphael's review gate is a manual step after Slice 2 ships; Slice 1's `status='Prepared'` only signals the Prep Sheet is ready.

## Cross-references

- Plan: `/Users/raphaelbaruch/.claude/plans/read-docs-products-md-carefully-the-recursive-frog.md`
- Webhook contract: `docs/peer-sparring/intake-payload-contract.md`
- Prompt: `automations/n8n/peer-sparring/prompts/prep-sheet.md`
- Style reference: `docs/raphaelbaruch-style.md`
- Sister automation: `automations/n8n/weekly-seo-geo-editorial.json` (template for n8n idioms).
