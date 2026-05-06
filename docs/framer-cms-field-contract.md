# Framer CMS Field Contract: Gedanken Articles

This contract supports the CMS-first `/gedanken/[slug]` Framer template. n8n writes structured CMS fields; Framer renders the article.

## Collection

Suggested collection name: `Gedanken`

Suggested template route: `/gedanken/[slug]`

## Required Fields

| Field | Type | Required | Fallback |
|---|---|---:|---|
| `Title` | Plain text | Yes | Use H1 without markdown syntax. |
| `Slug` | Slug / plain text | Yes | Derive from URL by removing `/gedanken/`. |
| `Meta Title` | Plain text | Yes | Use `Title`, trimmed to 60 characters. |
| `Meta Description` | Plain text | Yes | Use `Excerpt`, trimmed to 155 characters. |
| `Excerpt` | Plain text | Yes | Use the `Kurz gesagt` paragraph without label. |
| `Primary Keyword` | Plain text | Yes | Use selected topic primary keyword. |
| `Secondary Keywords` | Multi text / JSON array | Yes | Empty array only if source topic has none. |
| `Longtail Keywords` | Multi text / JSON array | Yes | Empty array only if source topic has none. |
| `Article Body` | Formatted text / rich text / HTML | Yes | Store Markdown if the endpoint converts it later; otherwise convert to HTML before sync. |
| `FAQ` | JSON / structured list | Yes | 3 concise FAQ items from the article. |
| `Video Brief` | Long text | Yes | One 60-90 second speaking arc. |
| `Carousel Brief` | Long text | Yes | 5-7 LinkedIn thought cards. |
| `Status` | Select / plain text | Yes | Always `Draft`. |
| `Review Notes` | Long text | Yes | Include editor status, warnings and Raphael proofread notes. |

## Sample Payload

```json
{
  "Title": "Einsamkeit an der Spitze: Warum Fuehrung leiser wird, je hoeher Du kommst",
  "Slug": "einsamkeit-an-der-spitze",
  "Meta Title": "Einsamkeit an der Spitze | Executive Sparring",
  "Meta Description": "Warum Fuehrung leiser wird, je hoeher Du kommst - und wie Executive Sparring wieder einen freien Denkraum schafft.",
  "Excerpt": "Einsamkeit an der Spitze entsteht nicht, weil Fuehrungskraefte keine Menschen um sich haben. Sie entsteht, weil immer weniger Gespraeche wirklich frei sind.",
  "Primary Keyword": "Einsamkeit an der Spitze",
  "Secondary Keywords": [
    "Executive Sparring",
    "Leadership Loneliness",
    "Fuehrungskraefte-Sparring"
  ],
  "Longtail Keywords": [
    "Wie gehe ich mit Einsamkeit an der Spitze um?",
    "Was hilft gegen Leadership Loneliness?"
  ],
  "Article Body": "# Einsamkeit an der Spitze...",
  "FAQ": [
    {
      "question": "Ist Einsamkeit an der Spitze normal?",
      "answer": "Sie ist fuer viele Menschen in Verantwortung vertraut, weil freie und folgenlose Gespraeche seltener werden."
    }
  ],
  "Video Brief": "60-90 Sekunden ueber den Sonntag-18-Uhr-Moment...",
  "Carousel Brief": "Card 1: Warum Fuehrung leiser wird...",
  "Status": "Draft",
  "Review Notes": "Approved by editor. Raphael prueft persoenliche Nuancen vor Veroeffentlichung."
}
```

## Endpoint Expectations

The n8n workflow expects a Framer-compatible sync endpoint that accepts `POST` with JSON. If the endpoint is a custom Framer plugin or middleware, map the payload fields above to the real Framer CMS field IDs there.

The workflow must never publish directly. It creates or updates CMS items with `Status = Draft`.
