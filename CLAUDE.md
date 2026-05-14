# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo actually is

Despite the directory name "Gemini Course", this is the **Peakline / Raphael Baruch** personal-brand workspace. It contains three workstreams that share a brand:

1. **Framer code components** (`src/components/*.tsx`) — standalone TSX files pasted into Framer as Code Components. There is **no build system, package.json, or test runner**. Files import from `"framer"` and `"framer-motion"`; those packages exist only inside Framer's runtime. Do not add a bundler, `npm install`, or try to run these files locally — they will not execute outside Framer. Type-check by reading; verify visually inside Framer.
2. **Weekly editorial pipeline** (`automations/n8n/weekly-seo-geo-editorial.json` + `automations/n8n/prompts/*.md`) — an n8n workflow that generates German SEO articles via Claude (writer/orchestrator) and OpenAI (editor/validator), commits artifacts under `docs/editorial-pipeline/<date>-<slug>/`, and syncs a draft into Framer CMS. Runtime/setup is in `docs/weekly-seo-geo-editorial-automation.md`.
3. **Peer Sparring Operating System** (`automations/n8n/peer-sparring/` + `docs/peer-sparring/` + `supabase/migrations/`) — the productised intake-to-portal automation behind the 1:1 Peer Sparring product (`docs/products.md` Appendix A). Slice 1 (intake + AI Prep Sheet) is in place; Slices 2–4 are tracked in the plan file at `~/.claude/plans/read-docs-products-md-carefully-the-recursive-frog.md`. Runbook: `docs/peer-sparring/README.md`. Slice 1 components touch Supabase, Google Drive/Docs, Anthropic, Resend.

There is no application to build or deploy from this repo. "Shipping" means (a) pasting a component into Framer, (b) the editorial n8n workflow committing artifacts and pushing a Framer CMS draft, or (c) the Peer Sparring n8n workflow persisting to Supabase + Google Drive and emailing Raphael.

## Source of truth for brand/voice

`docs/raphaelbaruch-style.md` is **the** style reference — palette, type scale, voice rules, gender guidance, lexicon. Treat it as binding for any copy or visual change.

Voice rules that are easy to violate and must not be:

- **"Sparringpartner" / "Sparringraum"** — written **without Fugen-s**. Never "Sparringspartner" / "Sparringsraum". Applies in copy, headlines, UI labels, meta tags, SEO titles.
- **Affirmative framing first.** Say what something *is*, not what it isn't. "Kein X. Ein Y." works as a punctual rhetorical move, never as a default opener.
- **Gendering:** prefer neutral forms (*Mitarbeitende, Führungskraft, Gegenüber*). When gendering is necessary, use the **Doppelpunkt** (*Kolleg:in, Gründer:in*). No asterisk, no Binnen-I, no slash. English loanwords (*Coach, CEO, Founder*) are never gendered and never Germanized.
- **Borders are solid or absent.** Never `dashed`/`dotted` in component CSS, even if older recipes in `docs/raphaelbaruch-style.md` §4 still show dashed — that recipe is being retired; do not propagate it.
- **No "AI slop"** patterns from §2.1: "It's not just X, it's Y," adjective piles, "delve/leverage/journey/pivotal," closing with "Ultimately" or "In summary."

## Product vs. marketing — keep the wall

- `docs/products.md` = **Core products**, all strictly **1:1 with Raphael** (Peer Sparring, Clarity Streaming, Transformation Teaming). The 1:1 constraint is constitutive, not a scaling limit.
- `docs/marketing.md` = **Top-of-funnel formats** (group sessions, editorial, SEO anchors). These lead *to* the offer; they are not the offer.
- If a new format would be a group session, it does **not** belong in `products.md` and must not be called "Peer Sparring".

## Editorial pipeline — read before editing

When changing anything under `automations/n8n/` or `docs/editorial-pipeline/`:

- Prompts (`automations/n8n/prompts/{orchestrator,writer,editor-validator,dod-validator,framer-payload-formatter}.md`) are loaded by the n8n workflow at runtime. Renaming a file or changing its top-level contract breaks the workflow.
- Topic-selection logic (see `docs/weekly-seo-geo-editorial-automation.md` §"Topic Selection") reads `docs/editorial-phase-0/*.md` and previous `run-log.json` files to avoid duplicates. Adding/removing Phase-0 topic files changes scheduling behavior.
- The Framer CMS payload must conform to `docs/framer-cms-field-contract.md`. Every field listed there is required; the workflow always writes `Status = Draft` (never publishes).
- Revision loop is bounded at 3 rounds; round 3 finalizes with `needs_human_decision = true` even if not approved. Don't "improve" by removing the cap.

## Sister-agent files

This repo ships instructions for three different agents. **Edit only the one you are.**

- `CLAUDE.md` — this file. For Claude Code.
- `GEMINI.md` — for Gemini CLI. Brand DNA + project structure summary.
- `AGENTS.md` — generic "Sparring Partner" persona/guardrails for any other agent.

Their content overlaps deliberately (brand tokens, voice). When a brand fact changes (palette, voice rule, lexicon), update `docs/raphaelbaruch-style.md` first and let the agent files reference it — do not duplicate substantive brand rules into the agent files.

## Working with `src/components/`

- Each `.tsx` file is a self-contained Framer Code Component. Property controls use `addPropertyControls` + `ControlType` from `"framer"`.
- Components consume brand tokens by literal hex (`#FCF8F1`, `#0E2616`, `#FF6403`) — there is no theme provider. If you add a token, mirror it in `docs/raphaelbaruch-style.md` §1.1.
- `OldSparringHeroEditorial.tsx` and similarly-prefixed `Old*` files are retired variants kept for reference. Don't import from them; don't "modernize" them unless asked.
- Visual verification is manual inside Framer — there is no Storybook, screenshot test, or dev server here. Ask the user for a screenshot when a visual change matters.

## Working with the Peer Sparring automation

- The product spec is `docs/products.md` Appendix A. Treat its acceptance criteria (§12) as authoritative — anything that drifts from the PRD needs a deliberate update there first.
- Per-slice plan: `~/.claude/plans/read-docs-products-md-carefully-the-recursive-frog.md`. Slice boundaries: (1) intake + Prep Sheet, (2) summary draft + Raphael review, (3) Customer Space + magic link, (4) PDF + retention.
- Webhook contract: `docs/peer-sparring/intake-payload-contract.md`. **German field keys are deliberate** — the downstream Anthropic prompt reads them verbatim and the German keys anchor voice consistency. Do not translate them.
- Supabase migrations live in `supabase/migrations/`. v1 is service-role-only; RLS lands in Slice 3 with `auth.uid() === clients.id`.
- Prep Sheet output is **never client-facing** (PRD §10 "Human-in-the-loop Rule"). Slice 1's Anthropic call writes an internal Google Doc only. Email body to clients carries no case content beyond the case title.

## Local conventions

- The directory `private/` is gitignored-by-convention (contains drafts/notes); don't surface its contents in PRs or commits.
- `Manuscript/` holds long-form prose drafts organized by act — treat as content, not code.
- `.claude/settings.local.json` controls local permission grants for this workspace; the user maintains it.
- Dates in docs are written `YYYY-MM-DD` and reflect Europe/Berlin time (matches the n8n schedule).
