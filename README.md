# 🎯 Personal Portfolio + Learning Archive System

A professional developer portfolio **and** a systematic learning archive — a static, JSON-driven website that documents every topic you learn, with real code files, honest notes, search, filters, code previews and ZIP downloads. Hosted free on **GitHub Pages**. No frameworks, no build step, no database.

> Built from the *Complete System Plan & Review* blueprint. Everything in `data/` is the brain; everything in `content/` is the evidence; everything in `website/` is the presentation.
>
> 📖 **Guides:** [`HOW_TO_CHANGE_ANYTHING.md`](HOW_TO_CHANGE_ANYTHING.md) — human task guide · [`AI_CONTEXT.md`](AI_CONTEXT.md) — zero-assumption knowledge base for handing changes to any AI

---

## 📁 Repository layout

```
/
├── index.html                ← tiny redirect → website/index.html
├── content/                  ← ALL your real code files, one folder per language
│   ├── c/                    (loops.c, arrays.c, pointers-basic.c, pointers-advanced.c)
│   ├── python/               (functions.py, lists.py, oop-basics.py)
│   ├── javascript/           (dom-manipulation.js, arrays.js)
│   ├── java/  sql/  html-css/
├── data/                     ← the JSON brain
│   ├── index.json            ← master index (table of contents + metadata)
│   ├── projects.json         ← project showcase entries (repo link + tech + status)
│   └── topics/<lang>/*.json  ← one file per topic: metadata + file list + notes
├── website/                  ← the public site
│   ├── index.html  about.html  archive.html  topic.html
│   ├── projects.html  resume.html  contact.html
│   ├── css/  js/  assets/
│   └── js/vendor/            ← jszip.min.js + highlight.min.js (self-contained)
├── tools/
│   ├── json-creator.html     ← form → topic JSON (+ full index.json rewrite via localStorage)
│   └── project-creator.html  ← minimalist form → project entry (+ full projects.json rewrite)
└── .github/workflows/deploy.yml ← auto-deploy to GitHub Pages
```

Key design rules:

1. **Code is never duplicated.** It lives only in `content/`; JSON files reference it by path.
2. **Content is never hand-typed into HTML.** Pages render from JSON at runtime.
3. **All paths are relative**, so the site works on any GitHub Pages base URL.

---

## 🚀 Running locally

`fetch()` does **not** work over `file://`, so run a small server from the repo root:

```bash
# Python (any version 3)
python -m http.server 8000

# or Node
npx serve .
```

Then open:

| URL | What |
|---|---|
| `http://localhost:8000` | Portfolio homepage (redirects to /website/) |
| `http://localhost:8000/website/archive.html` | ⭐ The Learning Archive |
| `http://localhost:8000/website/topic.html?id=c-pointers` | Topic detail view |
| `http://localhost:8000/tools/json-creator.html` | JSON Creator tool |

---

## ☁️ Deploying to GitHub Pages

The whole project lives in **one repo: `portfolio`** — it's a *project site*, served at
`https://pabitra27706-oss.github.io/portfolio/` (all paths are relative, so the
sub-folder URL works with zero changes).

**Option A — GitHub Actions (recommended, already configured):**

1. Push this repository to the `main` branch of `portfolio`.
2. In the repo: **Settings → Pages → Build and deployment → Source = "GitHub Actions"** ← this step is mandatory, or the workflow fails.
3. Every push now triggers `.github/workflows/deploy.yml`, which publishes the whole repo.
4. Live at `https://pabitra27706-oss.github.io/portfolio/` in ~2 minutes.

**Option B — classic Pages from a branch:**

1. **Settings → Pages → Source = "Deploy from a branch"**, branch `main`, folder `/ (root)`.
2. Done — GitHub serves the repo as-is; the root `index.html` redirects into `/website/`.

Both options work because the whole repo is published and all URLs are relative.

---

## 👤 Personalize (do this first!)

Personal details are already set to **Pabitra Chakrabortty** (GitHub `Pabitra27706-oss`, APC Ray Polytechnic). Two things still need your attention:

1. **Replace the sample archive content** — everything in `content/` and `data/` is demo material. Swap it for your real learning entries using the workflow below.
2. **LinkedIn** — if you have a profile, update the URL in `website/js/site-config.js`, `website/contact.html`, `website/index.html` (footer) and `website/resume.html`. Otherwise delete those links.

**One-file config (covers nav, footer, hero, contact form, GitHub links):**
edit `website/js/site-config.js`.

**Remaining touch-ups** (identity is already filled in — these still need your real content):

| File | What's left |
|---|---|
| `website/about.html` | adjust the journey timeline to your actual dates/milestones |
| `website/resume.html` | real marks/achievements, and the "(replace…)" note |
| `website/projects.html` | point project links at your real repos once they're pushed |
| `website/index.html` | "Currently learning" pill — keep it fresh |
| `data/index.json` + `data/topics/**` | sample topics → replace with YOUR real entries |
| `content/**` | sample code files → your real code |

**Step 3 — contact form:** it currently opens the visitor's email app (`mailto:`). To receive messages on the site, sign up at [Formspree](https://formspree.io), then change the handler in `website/js/main.js` to `fetch()` your form endpoint.

**Step 4 — resume PDF (optional):** put a designed PDF at `website/assets/resume/resume.pdf` and link it; the page's "Download as PDF" button uses the browser's Print → Save as PDF meanwhile.

---

## ➕ Adding a new learning entry (the ~5-minute workflow)

1. **Code first.** Write, test, then save your file: `content/<language>/<file>.<ext>`.
2. **Open** `tools/json-creator.html` in a browser. First time only: click **Upload index.json** and pick `data/index.json` — it's stored in the browser's localStorage.
3. **Fill the form** (title, language, tags, description, notes, files). Dates & IDs auto-fill. Click **⚡ Generate JSON**.
4. **Save the outputs:**
   - Topic JSON → `data/topics/<language>/<name>.json` (or use the Download button).
   - The tool outputs your **complete rewritten `index.json`** (new entry merged in, `totalTopics` / `totalFiles` / `languages` / `lastUpdated` fixed automatically, and the localStorage copy updated). Download it and replace `data/index.json`. No index loaded? You get the entry snippet to paste manually instead.
5. **Commit & push:**
   ```bash
   git add .
   git commit -m "Added: Pointers in C - advanced concepts"
   git push origin main
   ```
6. GitHub Pages redeploys automatically. Live in ~2 minutes. ✅

> The homepage stats, archive cards, filters, tag cloud and timelines all update themselves from `index.json`.

---

## 🧩 JSON schemas

### `data/index.json`

```jsonc
{
  "metadata": {
    "siteName": "Learning Archive",
    "lastUpdated": "2026-08-05T06:30:00Z",   // ISO 8601
    "firstEntryDate": "2026-01-08",           // drives the "days learning" stat
    "totalTopics": 8,
    "totalFiles": 9,
    "languages": ["C", "Python", "JavaScript"]
  },
  "topics": [
    {
      "id": "c-pointers",                     // unique, lowercase, kebab-case
      "title": "Pointers in C",
      "language": "C",                        // C|Python|JavaScript|Java|SQL|HTML/CSS|Other
      "dateCreated": "2026-02-10",            // YYYY-MM-DD
      "lastUpdated": "2026-02-18",
      "fileCount": 2,
      "tags": ["pointers", "memory"],
      "description": "Short summary used for search + cards.",
      "topicFile": "data/topics/c/pointers.json"  // repo-relative path
    }
  ]
}
```

### Topic JSON (`data/topics/<lang>/<name>.json`)

```jsonc
{
  "topic": {
    "id": "c-pointers",                       // must match the index entry
    "title": "Pointers in C",
    "language": "C",
    "category": "Memory Management",
    "difficulty": "intermediate",             // beginner|intermediate|advanced
    "dateCreated": "2026-02-10T14:30:00Z",
    "lastUpdated": "2026-02-18T10:15:00Z",
    "tags": ["pointers", "memory"],
    "description": "Full description…",
    "learningNotes": {
      "whatILearned": "…",
      "challenges": "…",
      "nextSteps": "…"
    }
  },
  "files": [
    {
      "id": "file-001",
      "fileName": "pointers-basic.c",         // shown + used for downloads
      "filePath": "content/c/pointers-basic.c", // repo-relative, NO leading slash
      "description": "…",
      "dateAdded": "2026-02-10T14:30:00Z",
      "lines": 67,
      "size": "2.2KB"
    }
  ]
}
```

---

## ✨ Feature map

| Feature | Where | How |
|---|---|---|
| Live stats dashboard | homepage | reads `data/index.json` |
| Featured topics | homepage | ids listed in `site-config.js` |
| Latest activity timeline | homepage | sorted by `lastUpdated` |
| Language / tag / search filters | archive | client-side, shareable URLs (`?lang=&tag=&q=`) |
| Grid / List / Timeline views | archive | view toggle |
| Multi-select ZIP | archive | checkboxes + JSZip |
| Code preview + highlighting | topic page | highlight.js (vendored) |
| Copy / single-file download | topic page + archive | Blob downloads |
| Topic ZIP | archive + topic page | JSZip, includes `_topic-info.json` |
| Dark-first theme | everywhere | toggle to light, persisted in `localStorage`, no flash on load |
| Motion system | everywhere | typewriter hero, count-up stats, ripple buttons, scroll-reveal, skeleton loaders, staggered cards — all respect `prefers-reduced-motion` |
| Responsive | everywhere | 1/2/3-column layouts, mobile nav |
| JSON Creator | `tools/` | form → topic JSON; upload your `index.json` once (stored in localStorage) and it outputs the **full rewritten index.json** on every generate |
| Project Creator | `tools/` | minimalist form → project entry with GitHub repo link; same localStorage pattern for **full projects.json rewrites** |
| Projects showcase | projects.html | JSON-driven from `data/projects.json` — status badges, tech chips, repo/live buttons |

Dependencies are **vendored** in `website/js/vendor/` (JSZip 3.10.1, highlight.js 11.9.0), so the site works offline-first; Google Fonts is the only optional external request and degrades to system fonts.

---

## 🛠️ Troubleshooting

| Symptom | Fix |
|---|---|
| "Couldn't load the archive data" | You opened the HTML from disk. Run `python -m http.server` from the repo root. |
| Stale data after editing JSON | The site caches in `sessionStorage`; open a new tab, or set `USE_CACHE = false` in `website/js/utils.js` while developing. |
| ZIP button says JSZip missing | Restore `website/js/vendor/jszip.min.js`. |
| Broken images/links after renaming folders | All references are repo-relative — search the old folder name and update paths. |
| 404 on GitHub Pages | Confirm Pages source (Actions vs branch) and that you pushed to `main`. |

---

## 🗺️ Roadmap (from the blueprint)

- **Phase 1 ✅** structure + JSON-driven cards + deploy
- **Phase 2 ✅** filters, search, topic pages, highlighting, downloads
- **Phase 3 ✅** multi-select ZIP, view modes, tag filtering, JSON Creator
- **Phase 4 🔜** content polish: replace sample topics with your real learning
- **Future:** blog section, GitHub API live stats, Algolia search, auto-generated index via script

---

## 📏 Rules of the house (from the plan)

✅ Use the JSON Creator for every entry · commit after every topic · meaningful commit messages · test on your phone
❌ Never paste code *into* JSON · never hand-edit HTML to add content · never force-push · don't add features before content

**The system is the tool. The habit is the goal. One learning at a time.** 🚀
