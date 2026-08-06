# 🧠 AI_CONTEXT.md — Complete Knowledge Base for This Project

> **Purpose of this document:** give any AI assistant full understanding of this website
> so it can modify **any part** correctly **without seeing the full source code**.
>
> **Version:** 1.0 · **Last synced:** 2026-08-05 · **Owner:** Pabitra Chakrabortty

---

## ⛔ SECTION 0 — WORKING PROTOCOL (READ FIRST, NON-NEGOTIABLE)

These rules override all default AI behavior for this project:

1. **NEVER assume file contents.** This document describes the *architecture*, not the
   current line-by-line content. Before editing any file, you must have its **actual
   current content** provided by the user. If you don't have it, **ask for that exact
   file by path** and wait.
2. **NEVER invent identifiers.** Do not guess ids, class names, JSON keys, function
   names, topic ids, file paths, dates, or personal details. Only use what is listed in
   this document or visible in files the user provided. If something is ambiguous —
   ask.
3. **Map the blast radius first.** For every request, use the **Dependency Map
   (Section 8)** to list *every* file affected. Present that list to the user before
   writing changes. If any affected file is missing from the conversation, request it.
4. **Duplicated blocks rule.** The site header/nav and footer are duplicated across
   7 HTML pages. Any change to them must be applied to **all 7** — or explicitly tell
   the user which pages still need the update.
5. **Preserve contracts.** Keep JSON schemas (Section 4), script load order (Section 5),
   relative-path rules (Section 2) and design-token usage (Section 7) exactly as
   specified. If a request conflicts with a contract, point it out before proceeding.
6. **Deliver complete, paste-ready results.** Output either (a) full new file contents
   with the file path as a heading, or (b) precise `OLD TEXT → NEW TEXT` replacements
   that match the file the user provided verbatim. Never output "…rest stays the same…".
7. **Verify before declaring done.** After proposing changes, list the exact checks from
   Section 10 that the user must run, and ask for their output if you need it.
8. **One clarification round.** If the request is ambiguous, ask all your questions in a
   single short list before doing any work.

**Response template for every change request:**

```
1. UNDERSTOOD — restate the request in one line.
2. AFFECTED FILES — list every file that must be read or edited (from Section 8).
   → If any are missing: "Please paste: <paths>" and STOP.
3. PLAN — 3–6 bullet steps.
4. CHANGES — complete file contents or exact OLD→NEW replacements.
5. VERIFY — commands/checks from Section 10.
```

---

## 1️⃣ PROJECT OVERVIEW

- **What:** Personal portfolio + Learning Archive for **Pabitra Chakrabortty**, a
  Computer Science diploma student (3rd semester, Acharya Prafulla Chandra Ray
  Polytechnic — APC Ray Polytechnic, Kolkata).
- **Core idea:** every learned topic is documented as JSON metadata + real code files;
  the website renders everything from that JSON at runtime.
- **Hosting:** GitHub Pages as a *project site* from the single `portfolio` repo
  (served at `https://pabitra27706-oss.github.io/portfolio/`), deployed via a GitHub
  Actions workflow that publishes the whole repo. Root `index.html` redirects to
  `/website/index.html` (relative redirect — works under any base path).
- **Stack:** plain HTML + CSS + vanilla ES6 JS. **No frameworks, no build step, no
  database.** Content = JSON files. Libraries (JSZip 3.10.1, highlight.js 11.9.0) are
  vendored locally. Google Fonts is the only optional external request.
- **Theme:** dark-first (`#0a0a0f`), light theme optional via toggle, persisted in
  `localStorage` under key `theme` (`"light"`; absent = dark).

## 2️⃣ HARD TECHNICAL CONSTRAINTS

1. **All runtime paths are relative** (pages fetch `../data/...`, `../content/...`).
   Never introduce absolute paths like `/data/...` in HTML/JS. JSON `filePath` /
   `topicFile` values are **repo-relative with NO leading slash**
   (e.g. `content/c/loops.c`).
2. **No `fetch()` over `file://`** — the site must be served (e.g.
   `python -m http.server` from repo root).
3. **Plain `<script>` tags, no ES modules** (GitHub Pages simplicity).
4. Vendored libs live in `website/js/vendor/` — never replace them with CDN links.
5. **`prefers-reduced-motion` must always be respected** for new animations.
6. Animations use `transform`/`opacity` only (no layout-triggering properties).
7. Mobile: touch targets ≥ 44px; inputs ≥ 16px font-size (iOS zoom prevention);
   safe-area insets for fixed bars.
8. Everything the user writes must survive **GitHub Pages**: static files only.

## 3️⃣ REPOSITORY FILE MAP (complete)

```
/
├── index.html                      ← repo root: meta-refresh redirect → website/index.html
├── README.md                       ← setup/deploy/workflow guide
├── HOW_TO_CHANGE_ANYTHING.md       ← human change guide
├── AI_CONTEXT.md                   ← THIS FILE
├── AI_JSON_FILLER_PROMPT.md        ← paste-into-any-AI prompt: user pastes their code,
│                                      AI returns all JSON fields as separate copy-ready
│                                      code blocks (topic mode A / project mode B)
├── .gitignore
├── .github/workflows/deploy.yml    ← GitHub Pages deploy (uploads whole repo on push to main)
│
├── content/                        ← ALL real source-code files (one folder per language)
│   ├── c/      loops.c · arrays.c · pointers-basic.c · pointers-advanced.c
│   ├── python/ functions.py · lists.py · oop-basics.py
│   ├── javascript/ dom-manipulation.js · arrays.js
│   └── java/ sql/ html-css/        ← empty (.gitkeep), ready for growth
│
├── data/                           ← THE BRAIN (JSON)
│   ├── index.json                  ← master index: metadata + one summary entry per topic
│   ├── projects.json               ← project showcase entries (repo link, tech, status)
│   └── topics/
│       ├── c/         loops.json · arrays.json · pointers.json
│       ├── python/    functions.json · lists.json · oop-basics.json
│       └── javascript/ dom.json · arrays.json
│
├── website/                        ← the public site
│   ├── index.html                  ← Home (hero, stats, featured, latest, skills, CTA)
│   ├── about.html                  ← static prose + journey timeline
│   ├── archive.html                ← ⭐ archive: filters, search, views, multi-select
│   ├── topic.html                  ← topic detail via ?id=<topic-id>
│   ├── projects.html               ← static project cards
│   ├── resume.html                 ← web resume + print-to-PDF
│   ├── contact.html                ← contact cards + mailto form
│   ├── css/
│   │   ├── main.css                ← design tokens, base, header/nav, hero, footer
│   │   ├── components.css          ← buttons/badges/cards/archive UI/code viewer/toasts…
│   │   └── responsive.css          ← breakpoints, mobile nav, touch fixes
│   ├── js/
│   │   ├── site-config.js          ← ALL personal config (SITE_CONFIG object)
│   │   ├── utils.js                ← SITE paths, fetch cache, LANG_META, helpers, ICONS
│   │   ├── download.js             ← single-file & ZIP downloads (needs JSZip)
│   │   ├── main.js                 ← shared UI + homepage + contact form
│   │   ├── archive.js              ← archive engine (filter/sort/views/selection)
│   │   ├── topic.js                ← topic page + code viewer with line numbers
│   │   └── vendor/                 ← jszip.min.js · highlight.min.js (DO NOT EDIT)
│   └── assets/{images,icons,resume}/
│
└── tools/
    ├── json-creator.html           ← form → topic JSON; holds an uploaded copy of
    │                                  index.json in localStorage (key "arcIndexJson")
    │                                  and outputs the FULL rewritten index.json
    │                                  (entry merged, metadata auto-fixed) each generate
    └── project-creator.html        ← minimalist form → project entry; same pattern with
                                       localStorage key "arcProjectsJson", outputs the
                                       FULL rewritten projects.json each generate
```

**Current data inventory (verify before relying on it):** 8 topics / 9 code files,
languages C, Python, JavaScript. `metadata.firstEntryDate = 2026-01-08`.

## 4️⃣ DATA SCHEMAS (strict contracts)

### `data/index.json`

```jsonc
{
  "metadata": {
    "siteName": "Learning Archive",
    "lastUpdated": "<ISO 8601, e.g. 2026-08-05T06:30:00Z>",
    "firstEntryDate": "YYYY-MM-DD",      // drives the "days learning" stat
    "totalTopics": <int>,                 // MUST equal topics.length
    "totalFiles": <int>,                  // MUST equal sum of all fileCount
    "languages": ["C", "Python", ...]     // display order = chip order
  },
  "topics": [                              // newest first by convention
    {
      "id": "<lang-prefix>-<kebab-slug>",  // unique, lowercase, e.g. c-pointers
      "title": "Pointers in C",
      "language": "C",                     // C|Python|JavaScript|Java|SQL|HTML/CSS|Other
      "dateCreated": "YYYY-MM-DD",
      "lastUpdated": "YYYY-MM-DD",
      "fileCount": <int>,                  // MUST equal files.length in the topic JSON
      "tags": ["kebab-or-word", ...],
      "description": "Short summary — used for cards AND search.",
      "topicFile": "data/topics/<lang>/<name>.json"   // repo-relative, NO leading slash
    }
  ]
}
```

### Topic JSON (`data/topics/<lang>/<name>.json`)

```jsonc
{
  "topic": {
    "id": "c-pointers",                    // MUST match the index entry id
    "title": "Pointers in C",
    "language": "C",
    "category": "Memory Management",
    "difficulty": "beginner|intermediate|advanced",
    "dateCreated": "<ISO 8601 with Z>",
    "lastUpdated": "<ISO 8601 with Z>",
    "tags": ["pointers", "memory"],
    "description": "Full description…",
    "learningNotes": {
      "whatILearned": "…", "challenges": "…", "nextSteps": "…"
    }
  },
  "files": [
    {
      "id": "file-001",                    // file-00N sequential within topic
      "fileName": "pointers-basic.c",      // used for display + download name
      "filePath": "content/c/pointers-basic.c",  // MUST exist; repo-relative, NO leading slash
      "description": "…",
      "dateAdded": "<ISO 8601 with Z>",
      "lines": 67,                          // int, measured with `wc -l`
      "size": "2.2KB"                       // string, measured from bytes
    }
  ]
}
```

**Validation rules (all enforced by the cross-check in Section 10):**
every `topicFile` exists · topic `id` matches its index entry · `fileCount`
matches `files.length` · every `filePath` exists on disk.

### `data/projects.json`

```jsonc
{
  "metadata": { "lastUpdated": "<ISO 8601>", "totalProjects": <int> },  // MUST match projects.length
  "projects": [
    {
      "id": "<kebab-slug>",                          // unique
      "name": "Project Name",
      "description": "…",
      "repoUrl": "https://github.com/…",             // REQUIRED — every project has a repo
      "liveUrl": "https://…",                        // optional
      "tech": ["HTML", "CSS"],
      "status": "live | in-progress | completed | paused",
      "featured": <bool>,                            // featured sort first
      "dateAdded": "YYYY-MM-DD",                     // optional
      "highlights": ["…"]                            // optional
    }
  ]
}
```

## 5️⃣ PAGE / SCRIPT ARCHITECTURE

**Script load order (bottom of `<body>`) — order matters, never reshuffle:**

| Page | Scripts in order |
|---|---|
| index / about / resume / contact | `site-config.js → utils.js → main.js` |
| projects.html | `site-config.js → utils.js → main.js → projects.js` |
| archive.html | `vendor/jszip → site-config → utils → download.js → main.js → archive.js` |
| topic.html | `vendor/jszip → vendor/highlight → site-config → utils → download.js → main.js → topic.js` |

Every page's `<head>` also contains a **tiny inline theme script** that applies
`data-theme="light"` if `localStorage.theme === "light"` (prevents flash). If you
change theme logic, you must update: that inline script in **all 8 pages + tools/json-creator.html**, plus `main.js` (themeBtn handler) and `tools/json-creator.html` (its own inline toggle).

**Key runtime behaviors:**
- `archive.js` reads URL params `?lang=&tag=&q=&sort=&view=` on load and writes them
  back on change (`history.replaceState`) — filtered views are shareable.
- `topic.js` resolves the topic via `?id=` → finds entry in `index.json` → fetches the
  topic JSON → renders; code preview = fetch raw file → `hljs.highlight()` →
  `splitHighlightedLines()` (keeps multi-line tokens colored) → line numbers.
- Fetching is cached in `sessionStorage` (`USE_CACHE` flag in `utils.js`).
- Selection state (archive checkboxes) is in-memory only (`state.selected` Set).

## 6️⃣ JS API REFERENCE (what exists — do not redefine)

**`utils.js`:** `SITE.indexUrl`, `SITE.resolve(path)`, `fetchJSONCached(url)`,
`fetchTextCached(url)`, `LANG_META` (badge class + slug per language),
`langBadgeClass(l)`, `langSlugClass(l)` → `"lg-c"` etc., `langBadgeHTML(l)`,
`formatDate(iso)`, `monthLabel(iso)`, `daysSince(iso)`, `todayStamp()`,
`escapeHTML(s)`, `debounce(fn,ms)`, `showToast(msg, "info|success|error")`,
`setBusy(btn,bool,label)`, `copyToClipboard(text,msg)`, `renderError(el,err)`,
`ICONS` (file, download, copy, eye, calendar, clock, folder, search, github,
linkedin, mail, pin, link, zip, code).

**`download.js`:** `fetchRepoText(repoPath)`, `triggerBlobDownload(blob,name)`,
`downloadSingleFile(repoPath,fileName,btn)`, `loadTopicData(indexEntry)`,
`downloadTopicZIP(indexEntry,btn)` (folder = topic id, adds `_topic-info.json`,
name `<id>-YYYY-MM-DD.zip`), `downloadMultiZIP(indexEntries,btn)`
(name `selected-topics-YYYY-MM-DD.zip`, adds `README.txt` manifest).

**`main.js`:** `initSharedUI()` (nav toggle w/ hamburger morph, theme toggle,
header `.scrolled`, scroll-progress bar `#scrollProgress`, pointer ripple,
`[data-site-name]` fill, `#statusBadge` ← `SITE_CONFIG.currentFocus`, year,
contact form mailto), `initReveal()` (IntersectionObserver on `.hero-inner,
.page-hero, main.page-main .section, .section-tight, .cta-band` → class
`reveal-visible`), `animateCount(el,n)` (1.5s ease-out), `initTypewriter()`
(el `#typewriter`, phrases `SITE_CONFIG.typewriter`), `initHome()`,
`topicCardHTML(t,i)`, `renderFeatured/Latest/Skills`.

**`archive.js`:** `state {lang,tag,q,sort,view,topics,selected}`,
`readURL()/writeURL()`, `visibleTopics()`, `cardHTML/listRowHTML/timelineHTML/
skeletonCardHTML`, `render()`, `renderLanguageChips(languages)` (All chip carries
total count), `renderSidebar(topics,languages)`, `updateSelectBar()` (bar toggles
class `.show`), `toggleSelect(id,checked)`, `bindEvents()` (delegated: `[data-zip]`,
`[data-tag]`, `[data-reset]`, `[data-lang]`, `[data-select]`, search + `#searchClear`,
`#sortSelect`, `[data-view]`, `#downloadSelected`, `#clearSelection`),
`resetFilters()`, `languagesOf(topics)`, `initArchive()`.

**`topic.js`:** `EXT_TO_LANG` (ext→hljs lang), `highlightCode(text,lang)`,
`splitHighlightedLines(html)`, `initTopicPage()`, `renderTopic(root,entry,data)`,
`bindTopicEvents(files)`, `loadFileIntoViewer(file)` (stores raw text in
`codeEl.dataset.rawText` for copying), `renderRelated(index,entry,data)` (tag-overlap,
top 3). GitHub deep-link uses `SITE_CONFIG.github + /blob/main/ + topicFile`.

**`projects.js`:** `STATUS_LABEL` map, `monogramOf(name)`, `thumbClass(seed)`,
`projectCardHTML(p,i)`, `initProjects()` — fetches `data/projects.json`, sorts
featured-first then `dateAdded` desc, renders into `#projectsGrid`, count into
`#projectsCount`.

**`site-config.js` — `SITE_CONFIG` fields:** `name, firstName, tagline, typewriter[],
email, github, githubUsername, githubRepo, githubBranch, linkedin, location, institute,
course, semester, board, expectedCompletion, learningStartDate, featuredTopics[],
currentFocus`. The topic-page "View on GitHub" deep link is built as
`<github>/<githubRepo>/blob/<githubBranch>/<topicFile>`.

## 7️⃣ DESIGN SYSTEM REGISTRY

**Tokens (`:root` in `css/main.css`, dark default):**
`--bg #0a0a0f · --surface-1 #111118 · --surface-2 #1a1a24 · --surface-3 #222230 ·
--border #2a2a3a · --text #f0f0ff · --text-2 #a0a0b8 · --text-3 #606078 ·
--text-4 #404058 · --primary #4f7cff (hover #6b93ff, active #3d64e8) ·
--green #22c55e · --orange #f59e0b · --red #ef4444 · --purple #a855f7 ·
--lang-c #60aeff · --lang-python #ffd343 · --lang-js #fde047 · --lang-java #fb923c ·
--lang-sql #a78bfa · --lang-html #ff7a59 · --header-h 64px ·
--font-sans Inter · --font-display "Plus Jakarta Sans" · --font-mono "JetBrains Mono" ·
--radius-sm 4 / --radius 8 / --radius-md 10 / --radius-lg 12 / --radius-xl 16 ·
--ease / --ease-out / --ease-in / --ease-bounce`. Light overrides live in
`[data-theme="light"]` (bg `#f8f9ff`, surface `#ffffff`…). Overlay tokens `--ov-1/2/3`,
`--ov-border` swap between white-alpha (dark) and navy-alpha (light) — always use them
instead of raw `rgba(255,255,255,…)`.

**Language context classes:** `.lg-c .lg-python .lg-javascript .lg-java .lg-sql
.lg-html .lg-other` set `--lang-color` + `--lang-glow` (card corner gradient,
timeline dot/border). **Badges:** `.badge-c .badge-python .badge-javascript .badge-java
.badge-sql .badge-htmlcss .badge-other` (+ light-mode overrides) and
`.badge-diff-beginner/intermediate/advanced`.

**Component classes (components.css):** `.btn .btn-primary .btn-secondary .btn-ghost
.btn-download .btn-light .btn-outline-light .btn-sm .btn-lg .btn-icon .ripple` ·
`.badge .tag .tag-static` · `.stats-grid .stat-card(.c-topics/.c-files/.c-langs/.c-days)
.stat-icon .stat-value .stat-label` · `.card-grid .topic-card .card-top .card-title
.card-desc .card-meta .card-foot .card-view-link .card-check .card-anim .skeleton
.skeleton-card` · `.list-view .list-row` · `.timeline-view .tl-month .tl-item` ·
`.activity-list .activity-item` · `.skill-row .skill-bar .skill-bar-fill` ·
`.archive-layout .filter-bar .chip .chip-count .search-box .search-clear .select-input
.view-toggle .archive-sidebar .side-card .lang-row .side-stat` · `.select-bar(.show)
.count-pill` · `.empty-state .empty-icon .loading-box .spinner` · `.topic-hero
.topic-meta .topic-layout .notes-grid .note-card(.challenges/.next) .file-list .file-row
.code-viewer .code-toolbar .code-line .line-num .line-content .related-grid` ·
`.project-grid .project-card .project-thumb(.thumb-1..4) .tech-chip` · `.form-group
.form-control .form-row-2 .contact-grid .contact-card` · `.toast(.success/.error/.out)` ·
`.resume …` · `.breadcrumb .page-hero .status-badge .hero .hero-float .gradient-text
.tw-cursor .scroll-indicator .cta-band .footer-grid .footer-status` (main.css).

**New CSS rule of thumb:** colors/shadows/spacing only via tokens; hover effects inside
`@media (hover:hover)`; mobile overrides in `responsive.css`.

## 8️⃣ DEPENDENCY MAP — "changing X touches files Y"

| Change | Files you MUST have & edit |
|---|---|
| Name / email / GitHub / LinkedIn / location / institute | `website/js/site-config.js` **and** static prose in `about.html`, `resume.html`, `contact.html`, `projects.html` **and** footer/nav copies in **all 7 pages** |
| Accent/theme colors | `css/main.css` tokens (+ glow `rgba(79,124,255,…)` spots in `components.css` if re-tinting) |
| Fonts | Google Fonts `<link>` in **8 pages + json-creator.html** + `--font-*` tokens |
| Typewriter phrases / featured topics / status pill | `site-config.js` only |
| Hero copy / CTAs / floating glyphs | `index.html` only |
| Add/edit/delete a topic | `content/<lang>/<file>` + `data/topics/<lang>/<x>.json` + `data/index.json` (entry + metadata counts + lastUpdated) |
| New programming language | `utils.js` `LANG_META` · `components.css` `.badge-*` + `.lg-*` (+ light overrides) · `content/<lang>/` · `data/index.json` metadata.languages · `tools/json-creator.html` dropdown |
| Archive filter/sort/view logic | `archive.js` only |
| Projects page content | `data/projects.json` (edit manually or via `tools/project-creator.html`); rendering logic in `website/js/projects.js`; styles in `components.css` (`.project-*`, `.proj-status`) |
| Archive look (cards/chips/sidebar/select-bar) | `components.css` + possibly `archive.js` markup strings |
| Topic page layout/features | `topic.js` + `components.css` |
| ZIP contents / filenames | `download.js` only |
| Code viewer colors/line numbers | `topic.js` + hljs palette in `components.css` |
| Nav menu items or footer | **all 7 pages** in `website/` (duplicated blocks) |
| Add a new page | new `website/<page>.html` (copy `about.html` as template) + nav+footer links in all 7 pages |
| Theme default / toggle logic | inline head script in **8 pages + json-creator**, `main.js` theme handler, `json-creator.html` inline handler |
| Contact form backend | `main.js` (submit handler) |
| Resume content / print behavior | `resume.html` + `@media print` block in `components.css` |
| Deployment | `.github/workflows/deploy.yml` + GitHub repo Pages settings (not code) |
| Mobile behavior of any component | `responsive.css` |

**If a change request touches anything not listed here:** stop, reason from Sections
3–7, and if still uncertain, ask the user which file holds it — never guess.

## 9️⃣ RECIPES (exact procedures for common tasks)

**R1 — Add a topic manually:** write code → save under `content/<lang>/` → measure
`wc -l` + byte size → create topic JSON per Section 4 → add index entry at top of
`topics[]` → bump `totalTopics/totalFiles/lastUpdated` → run Section 10 checks.
(Or use `tools/json-creator.html`: uploading the current `data/index.json` stores it
in localStorage under key `arcIndexJson`, after which each generate outputs the full
rewritten index.json — new entry prepended, `totalTopics`/`totalFiles`/`languages`/
`lastUpdated` recomputed, duplicate ids detected with replace-or-cancel.)

**R2 — Add a component to the homepage:** edit `index.html` (markup) → style in
`components.css` → if data-driven, extend `initHome()` in `main.js` → add `reveal`
compatibility: `initReveal()` already observes `.section` containers.

**R3 — Add a language:** follow the Dependency Map row; badge needs dark style **and**
`[data-theme="light"]` override; add `.lg-<slug>` with `--lang-color`/`--lang-glow`.

**R4 — Rename the site/owner:** `site-config.js` + grep all HTML for the old strings
(footers, titles, resume header) — footers exist in 7 files.

**R5 — Change a design token:** edit `:root` (and check `[data-theme="light"]`),
then grep `components.css`/`main.css` for hard-coded `rgba(79,124,255,` if the accent
itself changed.

## 🔟 VERIFICATION PROTOCOL (run from repo root after any change)

```bash
# 1. JS syntax
for f in website/js/*.js tools/json-creator.html; do :; done
for f in website/js/*.js; do node --check "$f" || echo "FAIL $f"; done

# 2. JSON validity
python3 -m json.tool data/index.json > /dev/null && echo "index OK"
for f in data/topics/*/*.json; do python3 -m json.tool "$f" > /dev/null || echo "FAIL $f"; done

# 3. Cross-file integrity (paths, ids, fileCount)
python3 - <<'EOF'
import json, os
idx = json.load(open('data/index.json'))
for t in idx['topics']:
    assert os.path.exists(t['topicFile']), t['topicFile']
    d = json.load(open(t['topicFile']))
    assert d['topic']['id'] == t['id']
    assert len(d['files']) == t['fileCount'], t['id']
    for f in d['files']: assert os.path.exists(f['filePath']), f['filePath']
print("integrity OK:", len(idx['topics']), "topics")
EOF

# 4. Serve & smoke-test (fetch never works over file://)
python3 -m http.server 8000   # then:
#   /website/index.html /website/archive.html "/website/topic.html?id=c-pointers"
#   /website/about.html /website/projects.html /website/resume.html
#   /website/contact.html /tools/json-creator.html  → all must return 200

# 5. Manual checks
#   - dark AND light theme render correctly
#   - mobile width (~390px): nav menu, chips scroll, select bar, code scroll
#   - reduced-motion: animations disabled gracefully
```

**The AI must include these checks in every delivery and must not claim success
without them (or without asking the user to run them).**

## 1️⃣1️⃣ FORBIDDEN ACTIONS

- ❌ Introducing frameworks, build tools, npm dependencies, or CDNs
- ❌ Embedding code content inside JSON (always reference `filePath`)
- ❌ Hand-editing HTML to add archive content (content belongs in JSON)
- ❌ Absolute paths (`/data/…`, `/content/…`) in fetch calls or JSON paths
- ❌ Editing `website/js/vendor/*`
- ❌ Force-pushing or rewriting history
- ❌ Changing JSON schema keys without updating `archive.js`, `topic.js`,
  `main.js`, `download.js` **and** `tools/json-creator.html` together
- ❌ Guessing any value this document tells you to verify

## 1️⃣2️⃣ HANDOFF TEMPLATE (paste this WITH your request)

```
You are working on my portfolio + Learning Archive. Attached/pasted below is
AI_CONTEXT.md, the complete knowledge base — follow Section 0 strictly.

My request: <describe the change>

Files I have pasted for you: <list>
```

If you are the AI receiving this: start with the **Response template in Section 0**.
If the files you need aren't pasted, your FIRST reply is the list of file paths you
need — nothing else.

---

*This document describes the system as of v1.0. When the project structure changes
(new pages, new JS files, schema changes), update Sections 3–8 in the same commit.*
