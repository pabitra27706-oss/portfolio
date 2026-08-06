# 🛠️ HOW TO CHANGE ANYTHING IN THIS PROJECT

> A practical, task-based guide. Find what you want to change, follow the steps.
> For the AI-friendly full knowledge base, see **`AI_CONTEXT.md`**.

---

## ⚡ 60-second map: "where does X live?"

| You want to change… | Open this |
|---|---|
| Your name, email, GitHub, LinkedIn, location, institute | `website/js/site-config.js` (+ static pages listed below) |
| Colors, fonts, radius, shadows, animation timing | `website/css/main.css` (design tokens at the top) |
| How a component looks (cards, buttons, badges, code viewer…) | `website/css/components.css` |
| Anything mobile/tablet specific | `website/css/responsive.css` |
| Hero text, typewriter phrases, featured topics | `website/index.html` + `website/js/site-config.js` |
| Archive content (topics, files, notes) | `data/index.json` + `data/topics/**` + `content/**` |
| Page text (About / Projects / Resume / Contact) | the matching `website/*.html` |
| Nav menu or footer | **all 7 pages** in `website/` (they are duplicated — see below) |
| Downloads / ZIP behavior | `website/js/download.js` |
| Archive filters / search / views | `website/js/archive.js` |
| Topic detail page / code viewer | `website/js/topic.js` |
| JSON entry generator | `tools/json-creator.html` |
| JSON without forms (paste code → AI returns copy-ready JSON) | `AI_JSON_FILLER_PROMPT.md` |
| Project entries | `data/projects.json` (+ `tools/project-creator.html`) |
| Hosting / deploy | `.github/workflows/deploy.yml` + repo settings |

⚠️ **Two things are duplicated by design:** the **nav header** and the **footer** appear in all 7 pages under `website/`. If you change one, change them all (search & replace helps — see each recipe below).

---

## 1️⃣ Personal details

**Step 1 — the config file (covers JS-driven spots):** edit `website/js/site-config.js`

```js
name, firstName, tagline, typewriter[],   // identity + hero
email, github, githubUsername, linkedin, location,
institute, course, semester, board, expectedCompletion,
learningStartDate, featuredTopics[], currentFocus
```

**Step 2 — static prose (find & replace in these files):**

| File | What to update |
|---|---|
| `website/about.html` | intro paragraph, institute, journey timeline |
| `website/resume.html` | header contact line, education years, achievements |
| `website/contact.html` | contact cards (email / GitHub / LinkedIn / location) |
| `website/projects.html` | project descriptions + repo/live links |
| `website/index.html` + all footers | the hard-coded GitHub/LinkedIn/mailto URLs |

> Tip: run `grep -rn "Pabitra27706-oss" website/` to find every remaining occurrence after a rename.

**Homepage status pill** ("Actively Learning · …"): change `currentFocus` in `site-config.js` — nothing else needed.

**Typewriter phrases**: edit the `typewriter: [...]` array in `site-config.js` (4 phrases is the sweet spot).

**Featured topics on homepage**: put up to 4 topic ids in `featuredTopics: [...]` in `site-config.js`.

---

## 2️⃣ Visual design

All design decisions are **tokens** at the top of `website/css/main.css`. Change the value once, the whole site follows.

```css
/* backgrounds */  --bg --surface-1 --surface-2 --surface-3 --border
/* text */         --text --text-2 --text-3 --text-4 --placeholder
/* accents */      --primary #4f7cff   --green --orange --red --purple
/* languages */    --lang-c --lang-python --lang-js --lang-java --lang-sql --lang-html
/* chrome */       --nav-bg --footer-bg --code-bg --code-header
/* fonts */        --font-sans (Inter) --font-display (Plus Jakarta Sans) --font-mono (JetBrains Mono)
/* radius */       --radius-sm 4px … --radius-xl 16px
/* motion */       --ease --ease-out --ease-in --ease-bounce
```

- **Change the accent color** → edit `--primary`, `--primary-hover`, `--primary-active`. (Search `rgba(79,124,255` in `components.css` if you also want to re-tint the glows.)
- **Change fonts** → update the Google Fonts `<link>` in the `<head>` of **all 8 HTML pages + `tools/json-creator.html`**, then update the three `--font-*` tokens.
- **Light theme values** → the `[data-theme="light"]` block, same file.
- **Disable all animation** → nothing to delete: the site already honors `prefers-reduced-motion` (see bottom of `responsive.css`).
- **Dark is the default.** Light is applied via `data-theme="light"` on `<html>`; the toggle logic lives in `website/js/main.js` (`themeBtn` handler) and in the tiny inline `<script>` inside every page's `<head>`.

---

---

## 3️⃣ Projects page

The Projects page is fully JSON-driven — **no HTML editing needed** to add projects.

### Add a project (~2 minutes)

1. Open `tools/project-creator.html` — first time only: **Upload projects.json** (`data/projects.json`)
2. Fill the minimalist form: name, **GitHub repo URL** (required), live URL, description, tech, status, featured
3. Click **⚡ Generate** → download the rewritten `data/projects.json` and replace your file
4. Commit & push → the Projects page updates itself

### Manual entry schema (`data/projects.json` → `projects[]`)

```jsonc
{
  "id": "kebab-slug",
  "name": "Project Name",
  "description": "One or two lines.",
  "repoUrl": "https://github.com/pabitra27706-oss/…",   // required
  "liveUrl": "https://…",            // optional
  "tech": ["HTML", "CSS"],
  "status": "live | in-progress | completed | paused",
  "featured": true,                   // featured sort first, get a ★ marker
  "dateAdded": "YYYY-MM-DD",          // optional
  "highlights": ["line 1", "line 2"]  // optional
}
```

Keep `metadata.totalProjects` and `metadata.lastUpdated` in sync (the tool does this for you).

---

## 4️⃣ Content: the Learning Archive

### Add a new topic (~5 minutes)

1. **Write the code** → save as `content/<language>/<name>.<ext>`
2. **Open `tools/json-creator.html`** — first time only: **Upload index.json** (picks your `data/index.json`, stores it in localStorage)
3. **Fill the form**, click **⚡ Generate JSON**
4. **Save the outputs:**
   - Topic JSON → `data/topics/<language>/<name>.json` (Download button included)
   - **Download the rewritten `index.json`** the tool produces (entry merged in, all metadata counts auto-fixed, localStorage copy updated) and replace your `data/index.json` with it
5. **Commit & push** → live in ~2 minutes

> Safety rails: duplicate topic ids are detected (replace-or-cancel), new languages are added to `metadata.languages` automatically, and the stored index keeps growing with every topic you generate. "Remove stored" clears the localStorage copy without touching your repo.

### Edit an existing topic
Edit its JSON in `data/topics/<language>/`. If you add/remove files, also fix `fileCount` in `data/index.json` and the files' metadata (`lines`, `size`, `dateAdded`). Bump `lastUpdated` in **both** files.

### Delete a topic
1. Remove its entry from `data/index.json` (and fix the metadata counts)
2. Delete `data/topics/<language>/<name>.json`
3. Delete its code files from `content/` (if not shared)

### Add a whole new language (e.g. Java)
1. `mkdir content/java` and add code files
2. `data/index.json` → add to `metadata.languages`
3. `website/js/utils.js` → confirm it's in `LANG_META` (C, Python, JavaScript, Java, SQL, HTML/CSS, Other are already there)
4. `website/css/components.css` → add `.badge-<x>` styles (dark + `[data-theme="light"]` override) and an `.lg-<x>` class with `--lang-color` / `--lang-glow` if you want card glows + timeline colors
5. `tools/json-creator.html` → it's already in the dropdown
6. Create topic JSONs as usual

---

## 4️⃣ Pages

### Edit text on About / Projects / Resume / Contact
Just edit the HTML. These are static prose pages — no JSON involved.

### Add a brand-new page
1. Copy `website/about.html` → `website/yourpage.html` (it has the correct head, nav, footer and script order)
2. Change `<title>`, meta description, and the `class="active"` nav link
3. Replace the inner content between `<main class="page-main">` and `</main>`
4. Add the link to the nav + footer in **all 7 existing pages** (search for `<li><a href="resume.html">` to find the spot)
5. Script rule — keep this exact order at the bottom:
   - normal pages: `site-config.js → utils.js → main.js`
   - pages that download/ZIP: add `js/vendor/jszip.min.js` before, and `download.js` after utils
   - the topic page additionally loads `js/vendor/highlight.min.js`

### Change the nav or footer
They are copy-pasted in 7 files: `index, archive, topic, about, projects, resume, contact`. Change one, then copy the same block into the others (or search & replace the old block). The JSON tool has its own minimal nav/footer — leave it unless you want to.

---

## 5️⃣ Behavior

| Change | Where |
|---|---|
| Contact form → real inbox | Sign up at formspree.io, then in `website/js/main.js` replace the `mailto:` handler inside the `form.addEventListener("submit")` block with a `fetch()` to your endpoint |
| Resume PDF | Put your file at `website/assets/resume/resume.pdf` and link it (the page's button currently uses Print → Save as PDF) |
| Search debounce / animation speeds | `website/js/archive.js` (`180`ms) · durations in `css/main.css` & `components.css` |
| Turn off sessionStorage cache while developing | `USE_CACHE = false` in `website/js/utils.js` |
| Code preview line numbers / colors | `website/js/topic.js` (`splitHighlightedLines`) · palette in `components.css` (One Dark) |

---

## 6️⃣ Deploy & test

**Local preview** (required — `fetch()` doesn't work on `file://`):

```bash
python -m http.server 8000      # from the repo root
# open http://localhost:8000
```

**Before every push:**

```bash
for f in website/js/*.js; do node --check "$f"; done          # JS syntax
python3 -m json.tool data/index.json > /dev/null && echo OK   # JSON valid
```

**GitHub Pages:** everything lives in the single `portfolio` repo → push `main` → repo Settings → Pages → Source: **GitHub Actions** (workflow already included). Live at `https://pabitra27706-oss.github.io/portfolio/` in ~2 minutes.

---

## 7️⃣ Common mistakes & fixes

| Symptom | Fix |
|---|---|
| "Couldn't load the archive data" | You opened the file from disk — run the local server |
| New topic doesn't appear | Missing comma in `index.json`, or `topicFile` path wrong (repo-relative, **no leading slash**) |
| ZIP/download fails | File path in the topic JSON doesn't match the real file in `content/` |
| `fileCount` mismatch warning in cross-check | Update the count in `index.json` |
| Changed footer/nav but it looks old on some pages | You edited 1 of 7 — update all pages |
| Stale content after editing JSON | Open a new tab (sessionStorage cache) or set `USE_CACHE = false` |
| Images/fonts not loading in the Arena preview iframe | Expected — the sandboxed preview has no network; the live server/downloaded site works fully |

---

**Golden rule:** code lives in `content/`, truth lives in `data/`, looks live in `css/`, behavior lives in `js/`. Never mix layers. 🎯
