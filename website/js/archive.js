/* ============================================================
   archive.js — the Learning Archive engine: loads index.json,
   renders cards in 3 view modes, filters, searches, sorts and
   handles multi-select ZIP downloads.
   ============================================================ */

const state = {
  lang: "all",
  tag: null,
  q: "",
  sort: "newest",   // newest | oldest | files | language
  view: "grid",     // grid | list | timeline
  topics: [],
  selected: new Set()
};

/* ---------- URL sync (shareable filtered views) ---------- */
function readURL() {
  const p = new URLSearchParams(location.search);
  state.lang = p.get("lang") || "all";
  state.tag = p.get("tag") || null;
  state.q = p.get("q") || "";
  state.sort = p.get("sort") || "newest";
  state.view = p.get("view") || "grid";
}

function writeURL() {
  const p = new URLSearchParams();
  if (state.lang !== "all") p.set("lang", state.lang);
  if (state.tag) p.set("tag", state.tag);
  if (state.q) p.set("q", state.q);
  if (state.sort !== "newest") p.set("sort", state.sort);
  if (state.view !== "grid") p.set("view", state.view);
  const qs = p.toString();
  history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
}

/* ---------- Filtering pipeline ---------- */
function visibleTopics() {
  let list = [...state.topics];

  if (state.lang !== "all") list = list.filter((t) => t.language === state.lang);
  if (state.tag) list = list.filter((t) => (t.tags || []).includes(state.tag));
  if (state.q) {
    const q = state.q.toLowerCase();
    list = list.filter((t) =>
      t.title.toLowerCase().includes(q) ||
      (t.description || "").toLowerCase().includes(q) ||
      (t.tags || []).some((tag) => tag.toLowerCase().includes(q))
    );
  }

  switch (state.sort) {
    case "oldest":
      list.sort((a, b) => a.dateCreated.localeCompare(b.dateCreated));
      break;
    case "files":
      list.sort((a, b) => (b.fileCount || 0) - (a.fileCount || 0));
      break;
    case "language":
      list.sort((a, b) => a.language.localeCompare(b.language) || b.dateCreated.localeCompare(a.dateCreated));
      break;
    default:
      list.sort((a, b) => b.dateCreated.localeCompare(a.dateCreated));
  }
  return list;
}

/* ---------- Rendering ---------- */
function cardHTML(t, i = 0) {
  const checked = state.selected.has(t.id) ? "checked" : "";
  const selectedCls = state.selected.has(t.id) ? " selected" : "";
  const delay = Math.min(i * 40, 320);
  return `
    <article class="topic-card card-anim ${langSlugClass(t.language)}${selectedCls}" data-id="${escapeHTML(t.id)}" style="animation-delay:${delay}ms">
      <label class="card-check" title="Select for ZIP download">
        <input type="checkbox" data-select="${escapeHTML(t.id)}" ${checked} aria-label="Select ${escapeHTML(t.title)}">
      </label>
      <div class="card-top" style="padding-left:30px">
        <span class="card-date">${formatDate(t.dateCreated)}</span>
        ${langBadgeHTML(t.language)}
      </div>
      <h3 class="card-title"><a href="topic.html?id=${encodeURIComponent(t.id)}">${escapeHTML(t.title)}</a></h3>
      <p class="card-desc">${escapeHTML(t.description || "")}</p>
      <div class="tags">${(t.tags || []).map((tag) => `<button class="tag${state.tag === tag ? " active" : ""}" data-tag="${escapeHTML(tag)}">${escapeHTML(tag)}</button>`).join("")}</div>
      <div class="card-foot">
        <a class="card-view-link" href="topic.html?id=${encodeURIComponent(t.id)}">View Details <span class="arrow">→</span></a>
        <div class="card-actions">
          <span class="file-count">${ICONS.file} ${t.fileCount || 0}</span>
          <button class="btn-icon" data-zip="${escapeHTML(t.id)}" title="Download topic as ZIP" aria-label="Download ${escapeHTML(t.title)} as ZIP">${ICONS.download}</button>
        </div>
      </div>
    </article>`;
}

function listRowHTML(t, i = 0) {
  const checked = state.selected.has(t.id) ? "checked" : "";
  const selectedCls = state.selected.has(t.id) ? " selected" : "";
  const delay = Math.min(i * 30, 240);
  return `
    <div class="list-row card-anim ${langSlugClass(t.language)}${selectedCls}" data-id="${escapeHTML(t.id)}" style="animation-delay:${delay}ms">
      <input type="checkbox" data-select="${escapeHTML(t.id)}" ${checked} aria-label="Select ${escapeHTML(t.title)}">
      ${langBadgeHTML(t.language)}
      <a class="list-title" href="topic.html?id=${encodeURIComponent(t.id)}">${escapeHTML(t.title)}</a>
      <span class="list-meta">${formatDate(t.dateCreated)} · ${t.fileCount || 0} file${t.fileCount === 1 ? "" : "s"}</span>
      <div class="list-tags">${(t.tags || []).slice(0, 3).map((tag) => `<span class="tag tag-static">${escapeHTML(tag)}</span>`).join("")}</div>
      <div class="card-actions">
        <a class="btn btn-sm btn-secondary" href="topic.html?id=${encodeURIComponent(t.id)}">View</a>
        <button class="btn-icon" data-zip="${escapeHTML(t.id)}" title="Download topic as ZIP" aria-label="Download ${escapeHTML(t.title)} as ZIP">${ICONS.download}</button>
      </div>
    </div>`;
}

function timelineHTML(list) {
  const groups = [];
  let current = null;
  list.forEach((t) => {
    const label = monthLabel(t.dateCreated);
    if (!current || current.label !== label) {
      current = { label, items: [] };
      groups.push(current);
    }
    current.items.push(t);
  });
  return groups.map((g) => `
    <div class="tl-month">${escapeHTML(g.label)}</div>
    ${g.items.map((t, gi) => `
      <div class="tl-item card-anim ${langSlugClass(t.language)}" style="animation-delay:${Math.min(gi * 60, 300)}ms">
        <div class="tl-item-head">
          ${langBadgeHTML(t.language)}
          <a class="tl-item-title" href="topic.html?id=${encodeURIComponent(t.id)}">${escapeHTML(t.title)}</a>
          <span class="tl-item-meta">${formatDate(t.dateCreated)} · ${t.fileCount || 0} file${t.fileCount === 1 ? "" : "s"}</span>
        </div>
        <p class="tl-item-desc">${escapeHTML(t.description || "")}</p>
      </div>`).join("")}
  `).join("");
}

function skeletonCardHTML() {
  return `
    <div class="topic-card skeleton-card">
      <div style="display:flex;justify-content:space-between">
        <div class="skeleton" style="width:80px;height:14px"></div>
        <div class="skeleton" style="width:64px;height:22px;border-radius:9999px"></div>
      </div>
      <div class="skeleton" style="width:70%;height:20px"></div>
      <div class="skeleton" style="width:100%;height:13px"></div>
      <div class="skeleton" style="width:82%;height:13px"></div>
      <div style="display:flex;gap:6px;margin-top:4px">
        <div class="skeleton" style="width:62px;height:22px;border-radius:6px"></div>
        <div class="skeleton" style="width:78px;height:22px;border-radius:6px"></div>
        <div class="skeleton" style="width:52px;height:22px;border-radius:6px"></div>
      </div>
    </div>`;
}

function render() {
  const container = document.getElementById("topicContainer");
  const countEl = document.getElementById("resultCount");
  const list = visibleTopics();

  if (countEl) {
    const files = list.reduce((s, t) => s + (t.fileCount || 0), 0);
    countEl.textContent = `Showing ${list.length} topic${list.length === 1 ? "" : "s"} · ${files} file${files === 1 ? "" : "s"}`;
  }

  if (!list.length) {
    container.className = "";
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">${ICONS.search}</div>
        <h3>No topics match your filters</h3>
        <p>Try a different language, tag or search term.</p>
        <button class="btn btn-primary btn-sm mt-2" data-reset>Reset filters</button>
      </div>`;
    return;
  }

  if (state.view === "list") {
    container.className = "list-view";
    container.innerHTML = list.map(listRowHTML).join("");
  } else if (state.view === "timeline") {
    container.className = "timeline-view";
    container.innerHTML = timelineHTML(list);
  } else {
    container.className = "card-grid";
    container.innerHTML = list.map(cardHTML).join("");
  }
}

/* ---------- Sidebar & chips ---------- */
function renderLanguageChips(languages) {
  const row = document.getElementById("langChips");
  if (!row) return;
  const countFor = (lang) => state.topics.filter((t) => t.language === lang).length;
  row.innerHTML =
    `<button class="chip${state.lang === "all" ? " active" : ""}" data-lang="all">All <span class="chip-count">${state.topics.length}</span></button>` +
    languages.map((l) =>
      `<button class="chip${state.lang === l ? " active" : ""}" data-lang="${escapeHTML(l)}">${escapeHTML(l)} <span class="chip-count">${countFor(l)}</span></button>`
    ).join("");
}

function renderSidebar(topics, languages) {
  /* quick stats */
  const stats = document.getElementById("sideStats");
  if (stats) {
    const files = topics.reduce((s, t) => s + (t.fileCount || 0), 0);
    stats.innerHTML = `
      <h3>Quick stats</h3>
      <div class="side-stat"><span>Topics</span><b>${topics.length}</b></div>
      <div class="side-stat"><span>Code files</span><b>${files}</b></div>
      <div class="side-stat"><span>Languages</span><b>${languages.length}</b></div>
      <div class="side-stat"><span>Days learning</span><b>${daysSince(SITE_CONFIG.learningStartDate)}</b></div>`;
  }

  /* language breakdown */
  const langBox = document.getElementById("langBreakdown");
  if (langBox) {
    const byLang = {};
    topics.forEach((t) => {
      byLang[t.language] = byLang[t.language] || { topics: 0, files: 0 };
      byLang[t.language].topics += 1;
      byLang[t.language].files += t.fileCount || 0;
    });
    langBox.innerHTML = Object.entries(byLang)
      .sort((a, b) => b[1].topics - a[1].topics)
      .map(([lang, v]) => `
        <button class="lang-row${state.lang === lang ? " active" : ""}" data-lang="${escapeHTML(lang)}">
          <span>${escapeHTML(lang)}</span>
          <span class="count">${v.topics} · ${v.files} files</span>
        </button>`).join("");
  }

  /* tag cloud */
  const tagBox = document.getElementById("tagCloud");
  if (tagBox) {
    const counts = {};
    topics.forEach((t) => (t.tags || []).forEach((tag) => { counts[tag] = (counts[tag] || 0) + 1; }));
    const tags = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 24);
    tagBox.innerHTML = tags.map(([tag]) =>
      `<button class="tag${state.tag === tag ? " active" : ""}" data-tag="${escapeHTML(tag)}">${escapeHTML(tag)}</button>`
    ).join("");
  }
}

/* ---------- Selection ---------- */
function updateSelectBar() {
  const bar = document.getElementById("selectBar");
  const countEl = document.getElementById("selectCount");
  if (!bar || !countEl) return;
  const n = state.selected.size;
  bar.classList.toggle("show", n > 0);
  bar.setAttribute("aria-hidden", String(n === 0));
  countEl.textContent = `${n} topic${n === 1 ? "" : "s"} selected`;
}

function toggleSelect(id, checked) {
  if (checked) state.selected.add(id);
  else state.selected.delete(id);
  document.querySelectorAll(`[data-id="${CSS.escape(id)}"]`).forEach((el) => {
    el.classList.toggle("selected", checked);
  });
  updateSelectBar();
}

/* ---------- Events (delegation) ---------- */
function bindEvents() {
  const container = document.getElementById("topicContainer");

  document.addEventListener("click", (e) => {
    const zipBtn = e.target.closest("[data-zip]");
    if (zipBtn) {
      const entry = state.topics.find((t) => t.id === zipBtn.dataset.zip);
      if (entry) downloadTopicZIP(entry, zipBtn);
      return;
    }
    const tagBtn = e.target.closest("[data-tag]");
    if (tagBtn && !tagBtn.classList.contains("tag-static")) {
      const tag = tagBtn.dataset.tag;
      state.tag = state.tag === tag ? null : tag;
      writeURL(); renderSidebar(state.topics, languagesOf(state.topics)); render();
      return;
    }
    if (e.target.closest("[data-reset]")) {
      resetFilters();
      return;
    }
    const langBtn = e.target.closest("[data-lang]");
    if (langBtn) {
      state.lang = langBtn.dataset.lang;
      writeURL();
      renderLanguageChips(languagesOf(state.topics));
      renderSidebar(state.topics, languagesOf(state.topics));
      render();
    }
  });

  container.addEventListener("change", (e) => {
    const cb = e.target.closest("[data-select]");
    if (cb) toggleSelect(cb.dataset.select, cb.checked);
  });

  /* search + clear button */
  const searchInput = document.getElementById("searchInput");
  const searchClear = document.getElementById("searchClear");
  const syncClear = () => { if (searchClear) searchClear.hidden = !searchInput.value; };
  if (searchInput) {
    searchInput.value = state.q;
    syncClear();
    searchInput.addEventListener("input", debounce(() => {
      state.q = searchInput.value.trim();
      syncClear();
      writeURL(); render();
    }, 180));
  }
  if (searchClear) {
    searchClear.addEventListener("click", () => {
      searchInput.value = "";
      state.q = "";
      syncClear();
      writeURL(); render();
      searchInput.focus();
    });
  }

  /* sort */
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.value = state.sort;
    sortSelect.addEventListener("change", () => {
      state.sort = sortSelect.value;
      writeURL(); render();
    });
  }

  /* view toggle */
  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.view === state.view));
    btn.addEventListener("click", () => {
      state.view = btn.dataset.view;
      document.querySelectorAll("[data-view]").forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.view === state.view)));
      writeURL(); render();
    });
  });

  /* select bar actions */
  const downloadBtn = document.getElementById("downloadSelected");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const entries = state.topics.filter((t) => state.selected.has(t.id));
      downloadMultiZIP(entries, downloadBtn);
    });
  }
  const clearBtn = document.getElementById("clearSelection");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      state.selected.clear();
      document.querySelectorAll(".topic-card.selected, .list-row.selected")
        .forEach((el) => el.classList.remove("selected"));
      document.querySelectorAll("[data-select]").forEach((cb) => { cb.checked = false; });
      updateSelectBar();
    });
  }
}

function resetFilters() {
  state.lang = "all"; state.tag = null; state.q = ""; state.sort = "newest";
  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = "";
  const searchClear = document.getElementById("searchClear");
  if (searchClear) searchClear.hidden = true;
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) sortSelect.value = "newest";
  writeURL();
  renderLanguageChips(languagesOf(state.topics));
  renderSidebar(state.topics, languagesOf(state.topics));
  render();
}

function languagesOf(topics) {
  const seen = new Set();
  const out = [];
  topics.forEach((t) => { if (!seen.has(t.language)) { seen.add(t.language); out.push(t.language); } });
  return out;
}

/* ---------- Boot ---------- */
async function initArchive() {
  readURL();
  try {
    const index = await fetchJSONCached(SITE.indexUrl);
    state.topics = index.topics || [];
    const languages = (index.metadata && index.metadata.languages) || languagesOf(state.topics);

    renderLanguageChips(languages);
    renderSidebar(state.topics, languagesOf(state.topics));
    bindEvents();
    render();
    updateSelectBar();
  } catch (err) {
    renderError(document.getElementById("topicContainer"), err);
  }
}

document.addEventListener("DOMContentLoaded", initArchive);
