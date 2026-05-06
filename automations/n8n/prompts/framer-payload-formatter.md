# Framer Payload Formatter Prompt

Convert the approved article package into the exact Framer CMS payload.

Rules:
- Preserve the field names exactly as written in `docs/framer-cms-field-contract.md`.
- `Status` must be `Draft`.
- Do not add fields that are not in the contract unless the endpoint explicitly supports them.
- If a field is unavailable, use the documented fallback value and explain the fallback in `Review Notes`.
- Output JSON only.

Required fields:
- Title
- Slug
- Meta Title
- Meta Description
- Excerpt
- Primary Keyword
- Secondary Keywords
- Longtail Keywords
- Article Body
- FAQ
- Video Brief
- Carousel Brief
- Status
- Review Notes
