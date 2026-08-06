/* ============================================================
   topic.js — topic detail page. Loads the topic JSON from
   ?id=<topic-id>, renders metadata, files, learning notes and
   the syntax-highlighted code viewer.
   ============================================================ */

const EXT_TO_LANG = {
  c: "c", h: "c",
  py: "python",
  js: "javascript", mjs: "javascript",
  java: "java",
  sql: "sql",
  html: "xml", htm: "xml",
  css: "css",
  json: "json",
  md: "markdown",
  txt: "plaintext"
};

let currentTopicData = null;
let currentIndexEntry = null;

function languageForFile(fileName) {
  const ext = String(fileName).split(".").pop().toLowerCase();
  return EXT_TO_LANG[ext] || "plaintext";
}

/* Highlight with hljs, falling back to escaped text. */
function highlightCode(text, lang) {
  if (window.hljs && lang !== "plaintext") {
    try {
      if (hljs.getLanguage(lang)) {
        return hljs.highlight(text, { language: lang, ignoreIllegals: true }).value;
      }
    } catch (e) { /* fall through */ }
  }
  return escapeHTML(text);
}

/* Split highlighted HTML into lines, keeping multi-line tokens
   (block comments, docstrings) colored correctly on every line. */
function splitHighlightedLines(html) {
  const tagRe = /<span class="([^"]*)">|<\/span>/g;
  const parts = [];
  let last = 0, m;
  while ((m = tagRe.exec(html)) !== null) {
    if (m.index > last) parts.push({ t: "x", v: html.slice(last, m.index) });
    parts.push(m[0][1] === "/" ? { t: "c" } : { t: "o", cls: m[1] });
    last = tagRe.lastIndex;
  }
  if (last < html.length) parts.push({ t: "x", v: html.slice(last) });

  const stack = [];
  const lines = [];
  let buf = "";
  for (const p of parts) {
    if (p.t === "o") stack.push(p.cls);
    else if (p.t === "c") stack.pop();
    else {
      const segs = p.v.split("\n");
      segs.forEach((seg, i) => {
        if (i > 0) { lines.push(buf); buf = ""; }
        if (seg) {
          buf += stack.map((c) => `<span class="${c}">`).join("") + seg + "</span>".repeat(stack.length);
        }
      });
    }
  }
  lines.push(buf);
  if (lines.length > 1 && lines[lines.length - 1].trim() === "") lines.pop();
  return lines;
}

async function initTopicPage() {
  const root = document.getElementById("topicRoot");
  const id = new URLSearchParams(location.search).get("id");

  if (!id) {
    root.innerHTML = `
      <div class="container section">
        <div class="empty-state">
          <h3>No topic selected</h3>
          <p>Open a topic from the archive to see its details here.</p>
          <a class="btn btn-primary mt-2" href="archive.html">Go to the Archive</a>
        </div>
      </div>`;
    return;
  }

  try {
    const index = await fetchJSONCached(SITE.indexUrl);
    const entry = (index.topics || []).find((t) => t.id === id);
    if (!entry) throw new Error(`Topic "${id}" was not found in index.json`);
    currentIndexEntry = entry;

    const data = await fetchJSONCached(SITE.resolve(entry.topicFile));
    currentTopicData = data;
    renderTopic(root, entry, data);
    renderRelated(index, entry, data);
  } catch (err) {
    renderError(root, err);
  }
}

function renderTopic(root, entry, data) {
  const topic = data.topic || {};
  const files = data.files || [];
  const notes = topic.learningNotes || {};
  const diff = (topic.difficulty || "").toLowerCase();

  root.innerHTML = `
    <div class="topic-hero">
      <div class="container">
        <div class="topic-hero-top">
          ${langBadgeHTML(topic.language || entry.language)}
          ${topic.category ? `<span class="tag tag-static">${escapeHTML(topic.category)}</span>` : ""}
          ${diff ? `<span class="badge badge-diff-${escapeHTML(diff)}">${escapeHTML(topic.difficulty)}</span>` : ""}
        </div>
        <h1>${escapeHTML(topic.title || entry.title)}</h1>
        <div class="tags">${(topic.tags || []).map((tag) => `<a class="tag" href="archive.html?tag=${encodeURIComponent(tag)}">${escapeHTML(tag)}</a>`).join("")}</div>
        <div class="topic-meta">
          <span>${ICONS.calendar} Created ${formatDate(topic.dateCreated || entry.dateCreated)}</span>
          <span>${ICONS.clock} Updated ${formatDate(topic.lastUpdated || topic.dateCreated || entry.dateCreated)}</span>
          <span>${ICONS.folder} ${files.length} file${files.length === 1 ? "" : "s"}</span>
        </div>
      </div>
    </div>

    <div class="container topic-layout">
      <div class="topic-main">
        <section class="mb-3">
          <h2 class="mb-2">About this topic</h2>
          <div class="prose"><p>${escapeHTML(topic.description || "")}</p></div>
        </section>

        ${(notes.whatILearned || notes.challenges || notes.nextSteps) ? `
        <section class="mb-3">
          <h2 class="mb-2">Learning notes</h2>
          <div class="notes-grid">
            ${notes.whatILearned ? `<div class="note-card"><h4>What I learned</h4><p>${escapeHTML(notes.whatILearned)}</p></div>` : ""}
            ${notes.challenges ? `<div class="note-card challenges"><h4>Challenges</h4><p>${escapeHTML(notes.challenges)}</p></div>` : ""}
            ${notes.nextSteps ? `<div class="note-card next"><h4>Next steps</h4><p>${escapeHTML(notes.nextSteps)}</p></div>` : ""}
          </div>
        </section>` : ""}

        <section class="mb-3">
          <h2 class="mb-2">Files (${files.length})</h2>
          <div class="file-list">
            ${files.map((f, i) => `
              <div class="file-row">
                <div class="file-row-head">
                  <span class="file-name">${ICONS.file} ${escapeHTML(f.fileName)}</span>
                  <span class="file-sub">${f.lines ? f.lines + " lines · " : ""}${escapeHTML(f.size || "")} · added ${formatDate(f.dateAdded)}</span>
                </div>
                <p class="file-desc">${escapeHTML(f.description || "")}</p>
                <div class="file-actions">
                  <button class="btn btn-sm btn-primary" data-view-file="${i}">${ICONS.eye} View code</button>
                  <button class="btn btn-sm btn-secondary" data-copy-file="${i}">${ICONS.copy} Copy</button>
                  <button class="btn btn-sm btn-download" data-download-file="${i}">${ICONS.download} Download</button>
                </div>
              </div>`).join("")}
          </div>
        </section>

        <section class="mb-3">
          <h2 class="mb-2">Code preview</h2>
          <div class="code-viewer">
            <div class="code-toolbar">
              <span class="file-label" id="codeFileLabel">
                <span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span>
                <span id="codeFileName">select a file above</span>
              </span>
              <button class="btn btn-sm btn-ghost" id="copyCodeBtn" style="color:#cbd5e1">${ICONS.copy} Copy</button>
            </div>
            <pre><code id="codeBlock" class="language-plaintext">Click "View code" on a file to preview it here with syntax highlighting.</code></pre>
          </div>
        </section>
      </div>

      <aside class="topic-side">
        <div class="side-card mb-2">
          <h3>Actions</h3>
          <div style="display:flex;flex-direction:column;gap:8px">
            <button class="btn btn-download" id="topicZipBtn">${ICONS.zip} Download topic (ZIP)</button>
            <a class="btn btn-secondary" id="githubLink" href="${escapeHTML(SITE_CONFIG.github)}" target="_blank" rel="noopener">${ICONS.github} View on GitHub</a>
            <button class="btn btn-secondary" id="shareLinkBtn">${ICONS.link} Copy share link</button>
            <a class="btn btn-ghost" href="archive.html">← Back to archive</a>
          </div>
        </div>
        <div class="side-card">
          <h3>File paths</h3>
          ${files.map((f) => `<div class="side-stat" style="display:block;font-family:var(--font-mono);font-size:0.75rem;word-break:break-all;color:var(--text-3);margin-bottom:6px">/${escapeHTML(f.filePath)}</div>`).join("")}
        </div>
      </aside>
    </div>

    <div class="container section-tight">
      <h2 class="mb-2">Related topics</h2>
      <div class="related-grid" id="relatedGrid"></div>
    </div>`;

  /* GitHub deep link: point to this topic's data file in the repo.
     Format must be: github.com/<user>/<repo>/blob/<branch>/<path> */
  const ghLink = document.getElementById("githubLink");
  if (ghLink && !SITE_CONFIG.githubUsername.startsWith("your-")) {
    const repo = SITE_CONFIG.githubRepo || (SITE_CONFIG.githubUsername + ".github.io");
    const branch = SITE_CONFIG.githubBranch || "main";
    ghLink.href = `${SITE_CONFIG.github}/${repo}/blob/${branch}/${entry.topicFile}`;
  }

  bindTopicEvents(files);

  /* auto-preview the first file */
  if (files.length) loadFileIntoViewer(files[0]);
}

function bindTopicEvents(files) {
  document.querySelectorAll("[data-view-file]").forEach((btn) => {
    btn.addEventListener("click", () => loadFileIntoViewer(files[+btn.dataset.viewFile]));
  });

  document.querySelectorAll("[data-copy-file]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const f = files[+btn.dataset.copyFile];
      try {
        const text = await fetchRepoText(f.filePath);
        await copyToClipboard(text, `${f.fileName} copied!`);
      } catch (err) {
        showToast("Copy failed: " + err.message, "error");
      }
    });
  });

  document.querySelectorAll("[data-download-file]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const f = files[+btn.dataset.downloadFile];
      downloadSingleFile(f.filePath, f.fileName, btn);
    });
  });

  const zipBtn = document.getElementById("topicZipBtn");
  if (zipBtn) zipBtn.addEventListener("click", () => downloadTopicZIP(currentIndexEntry, zipBtn));

  const shareBtn = document.getElementById("shareLinkBtn");
  if (shareBtn) shareBtn.addEventListener("click", () => copyToClipboard(location.href, "Link copied!"));

  const copyCode = document.getElementById("copyCodeBtn");
  if (copyCode) {
    copyCode.addEventListener("click", async () => {
      const codeEl = document.getElementById("codeBlock");
      const raw = codeEl.dataset.rawText || codeEl.textContent;
      await copyToClipboard(raw, "Code copied!");
    });
  }
}

async function loadFileIntoViewer(file) {
  const codeEl = document.getElementById("codeBlock");
  const nameEl = document.getElementById("codeFileName");
  if (!codeEl) return;
  nameEl.textContent = file.fileName + " — loading…";
  try {
    const text = await fetchRepoText(file.filePath);
    const lang = languageForFile(file.fileName);
    const html = highlightCode(text, lang);
    const lines = splitHighlightedLines(html);
    codeEl.innerHTML = lines.map((ln, i) =>
      `<span class="code-line"><span class="line-num">${i + 1}</span><span class="line-content">${ln || " "}</span></span>`
    ).join("");
    codeEl.dataset.rawText = text;
    nameEl.textContent = `${file.fileName} · ${lang}${file.lines ? " · " + file.lines + " lines" : ""}`;
    codeEl.parentElement.scrollTop = 0;
    codeEl.parentElement.scrollLeft = 0;
  } catch (err) {
    nameEl.textContent = file.fileName + " — failed to load";
    codeEl.textContent = "Could not load this file: " + err.message;
    delete codeEl.dataset.rawText;
  }
}

function renderRelated(index, entry, data) {
  const grid = document.getElementById("relatedGrid");
  if (!grid) return;
  const myTags = new Set(data.topic?.tags || entry.tags || []);
  const related = (index.topics || [])
    .filter((t) => t.id !== entry.id)
    .map((t) => ({ t, score: (t.tags || []).filter((tag) => myTags.has(tag)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.t.dateCreated.localeCompare(a.t.dateCreated))
    .slice(0, 3);

  if (!related.length) {
    grid.innerHTML = `<p class="muted">No related topics yet — the archive is still growing.</p>`;
    return;
  }
  grid.innerHTML = related.map(({ t }) => `
    <a class="related-card" href="topic.html?id=${encodeURIComponent(t.id)}">
      ${langBadgeHTML(t.language)}
      <div class="t">${escapeHTML(t.title)}</div>
      <div class="muted" style="font-size:0.8rem;margin-top:4px">${formatDate(t.dateCreated)} · ${t.fileCount || 0} file${t.fileCount === 1 ? "" : "s"}</div>
    </a>`).join("");
}

document.addEventListener("DOMContentLoaded", initTopicPage);
