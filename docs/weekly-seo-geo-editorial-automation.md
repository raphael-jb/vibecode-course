# Weekly SEO/GEO Editorial Automation

This is the setup runbook for `automations/n8n/weekly-seo-geo-editorial.json`.

## Runtime

- Self-hosted n8n server.
- Timezone: `Europe/Berlin`.
- Schedule: every Thursday at 08:30.
- Repo mounted on the n8n host, for example `/data/raphaelbaruch`.
- Publishing stays manual after Raphael proofreads.

## Editorial Language Rule

Raphael's content uses gendergerechte Sprache.

- `Geschäftsführende`, not `Geschäftsführer`.
- `Kolleg:innen`, not `Kollegen`.
- `Mitarbeitende`, not `Mitarbeiter`.
- `alle` or a concrete neutral construction, not generic `jeder` or `jeden`.

The Writer must follow this rule. The Editor/Validator must reject drafts that do not.

## Credentials To Add In n8n

- GitHub access for pulling and pushing the repo.
- Anthropic API key for Orchestrator and Writer.
- OpenAI API key for Editor/Validator.
- SMTP credential for email notification.
- Framer sync endpoint credential or middleware token.

Use n8n credentials. Do not hardcode secrets in the workflow JSON.

## Import

1. In n8n, import `automations/n8n/weekly-seo-geo-editorial.json`.
2. Open `Runtime Config`.
3. Set:
   - `repoPath`
   - `githubArtifactBaseUrl`
   - `framerEndpointUrl`
   - `raphaelEmail`
   - model names if needed
4. Attach credentials to the Anthropic, OpenAI, Framer and email nodes.
5. Run `Manual Dry Run` with `dryRunSlug = einsamkeit-an-der-spitze`.
6. Confirm artifacts are written to `docs/editorial-pipeline/<date>-<slug>/`.
7. Confirm the Framer item is created or updated as `Draft`.
8. Activate the weekly schedule.

## Topic Selection

The workflow reads:

- `docs/seo-geo-content-plan.md`
- `docs/editorial-phase-0/*.md`
- existing `docs/editorial-pipeline/**/run-log.json`

Selection rule:

1. Manual dry-run slug wins.
2. Otherwise choose the first Phase-0 slug that has not appeared in a previous `run-log.json`.
3. If Phase 0 is complete, choose from the remaining content pillars in `docs/seo-geo-content-plan.md` and mark it as `needs-human-topic-expansion`.

## Revision Loop

The workflow has three explicit rounds:

1. Claude writes draft v1.
2. OpenAI reviews v1.
3. If approved, finalize.
4. If not approved, Claude revises v2.
5. OpenAI reviews v2.
6. If approved, finalize.
7. If not approved, Claude revises v3.
8. OpenAI reviews v3.
9. Finalize even if not approved, with `needs_human_decision = true`.

## Stored Artifacts

Each run writes:

- `brief.md`
- `draft-v1.md`
- `draft-v2.md` when used
- `draft-v3.md` when used
- `editor-review-v1.md`
- `editor-review-v2.md` when used
- `editor-review-v3.md` when used
- `final.md`
- `framer-payload.json`
- `run-log.json`

Commit message:

`Add editorial draft: <slug>`

## Manual Test Plan

- Dry run with `einsamkeit-an-der-spitze`.
- Confirm no already-produced Phase-0 topic is selected twice.
- Confirm GitHub artifacts are committed and pushed.
- Confirm writer output includes all Framer fields.
- Confirm editor rejects an intentionally weak draft.
- Confirm loop stops after approval or after round 3.
- Confirm Framer CMS item is a draft, not published.
- Confirm email includes proofread link, artifact links, editor status and checklist.
- Confirm Thursday schedule is active.
