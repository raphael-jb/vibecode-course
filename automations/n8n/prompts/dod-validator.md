# Definition Of Done Validator Prompt

Validate the final article before storage and Framer sync.

The output must be JSON only:

```json
{
  "ready_for_proofread": false,
  "blocking_gaps": [],
  "warnings": [],
  "final_checklist": [
    "Kurz gesagt block present",
    "primary keyword integrated naturally",
    "3-5 FAQ items present",
    "Framer Status is Draft",
    "no factual claims require citation unless explicitly marked for Raphael review",
    "manual publish reminder included"
  ]
}
```

This check does not publish. It only decides whether the draft can go to Raphael for personal proofreading.
