# The Learning Archive — moved

> **This repository is now a pointer.** The Learning Archive lives inside
> [`pabitrawriters06-oss/Study-with-ai`](https://github.com/pabitrawriters06-oss/Study-with-ai),
> in the `archive/` folder, and it is published at
> **[pabitrawriters06-oss.github.io/Study-with-ai/archive](https://pabitrawriters06-oss.github.io/Study-with-ai/archive)**.

## Why it moved

This repository was a separate archive with its own site. Publishing into it
meant:

```bash
git clone https://github.com/pabitrawriters06-oss/portfolio.git ~/portfolio
node scripts/export-to-portfolio.mjs ~/portfolio
cd ~/portfolio && git status && git diff
git commit -am "Add <topic> from the AI curriculum" && git push
```

Three folders, an index edited by hand, and a memory task — every time you
finished a task, on a phone. It showed: the exporter had only ever been run
against the demo pack, so a live-looking archive sat next to a repository that
changed every day, and the two read as two different projects.

Now the archive is a **view of the learning engine**:

```
you finish a task -> the agent judges it -> a verdict is written
   -> the archive is regenerated from your work and that verdict
   -> the site publishes it
```

Nothing to copy. Nothing to remember. It cannot fall behind.

## What is still here

Everything, untouched and still working:

| | |
|---|---|
| `website/` | the original static site — every deep link still resolves |
| `data/` | the catalogue: `index.json`, `topics/<lang>/*.json`, `projects.json` |
| `content/` | the code: 82 files |
| `tools/` | the JSON creator and the project creator |
| the git history | 16 commits, intact — and now also in the new repository, imported with `git subtree` |

The root page of this repository is a landing page that points to the new
archive. The old site is kept exactly as it was, so nothing that links here
breaks.

## The schema, for reference

Unchanged. A topic entry:

```jsonc
{
  "topic": {
    "id": "c-multiplication-table",
    "title": "Multiplication Table",
    "language": "C",
    "category": "Control Flow",
    "difficulty": "beginner",
    "dateCreated": "2026-08-10T15:53:39Z",
    "lastUpdated": "2026-08-10T15:53:39Z",
    "tags": ["for-loop", "loops", "iteration"],
    "description": "Iteration using for loops…",
    "learningNotes": { "whatILearned": "", "challenges": "", "nextSteps": "" }
  },
  "files": [
    {
      "id": "file-001",
      "fileName": "multiplication-table.c",
      "filePath": "content/c/multiplication-table.c",
      "description": "Create a Multiplication table for user.",
      "dateAdded": "2026-08-10T15:53:39Z"
    }
  ]
}
```

`data/index.json` holds the master list — `metadata` (counts, languages) and
`topics` (one entry per topic, pointing at its `topicFile`).

The full documentation is preserved in [`HOW_TO_CHANGE_ANYTHING.md`](HOW_TO_CHANGE_ANYTHING.md),
[`AI_CONTEXT.md`](AI_CONTEXT.md) and [`AI_JSON_FILLER_PROMPT.md`](AI_JSON_FILLER_PROMPT.md).

## Where to go now

| | |
|---|---|
| The archive | https://pabitrawriters06-oss.github.io/Study-with-ai/archive |
| The progress map | https://pabitrawriters06-oss.github.io/Study-with-ai/progress |
| The learning loop | https://pabitrawriters06-oss.github.io/Study-with-ai/learn |
| The repository | https://github.com/pabitrawriters06-oss/Study-with-ai |
