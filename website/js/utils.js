/* ============================================================
   utils.js — shared helpers used by every page
   ============================================================ */

/* Pages live in /website/, while data and content live one level
   up. Relative paths keep the site working on GitHub Pages under
   any base URL (user site or project page). */
const SITE = {
  indexUrl: "../data/index.json",
  /* Resolve a repo-relative path (e.g. "content/c/loops.c") from a page. */
  resolve(path) {
    return "../" + String(path).replace(/^\/+/, "");
  }
};

/* Set to false while developing if stale sessionStorage data annoys you. */
const USE_CACHE = true;

async function fetchJSONCached(url) {
  const key = "arc-cache:" + url;
  if (USE_CACHE) {
    try {
      const cached = sessionStorage.getItem(key);
      if (cached) return JSON.parse(cached);
    } catch (e) { /* fall through to network */ }
  }
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Could not load ${url} (HTTP ${res.status})`);
  const data = await res.json();
  if (USE_CACHE) {
    try { sessionStorage.setItem(key, JSON.stringify(data)); } catch (e) { /* quota */ }
  }
  return data;
}

async function fetchTextCached(url) {
  const key = "arc-cache:" + url;
  if (USE_CACHE) {
    try {
      const cached = sessionStorage.getItem(key);
      if (cached !== null) return cached;
    } catch (e) { /* ignore */ }
  }
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Could not load ${url} (HTTP ${res.status})`);
  const text = await res.text();
  if (USE_CACHE) {
    try { sessionStorage.setItem(key, text); } catch (e) { /* quota */ }
  }
  return text;
}

/* ---------- Language metadata ---------- */
const LANG_META = {
  "C":          { badge: "badge-c",          slug: "c" },
  "Python":     { badge: "badge-python",     slug: "python" },
  "JavaScript": { badge: "badge-javascript", slug: "javascript" },
  "Java":       { badge: "badge-java",       slug: "java" },
  "SQL":        { badge: "badge-sql",        slug: "sql" },
  "HTML/CSS":   { badge: "badge-htmlcss",    slug: "html" },
  "Other":      { badge: "badge-other",      slug: "other" }
};

function langBadgeClass(lang) {
  return (LANG_META[lang] || LANG_META.Other).badge;
}
function langSlugClass(lang) {
  return "lg-" + (LANG_META[lang] || LANG_META.Other).slug;
}
function langBadgeHTML(lang) {
  return `<span class="badge ${langBadgeClass(lang)}">${escapeHTML(lang)}</span>`;
}

/* ---------- Formatting ---------- */
function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso.length === 10 ? iso + "T00:00:00" : iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function monthLabel(iso) {
  const d = new Date(iso.length === 10 ? iso + "T00:00:00" : iso);
  return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

function daysSince(iso) {
  const start = new Date(iso.length === 10 ? iso + "T00:00:00" : iso);
  return Math.max(0, Math.floor((Date.now() - start.getTime()) / 86400000));
}

function todayStamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function escapeHTML(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function debounce(fn, wait = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

/* ---------- Tiny UI helpers ---------- */
const TOAST_ICONS = {
  success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
};

function showToast(message, type = "info") {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.setAttribute("role", "status");
  el.innerHTML = `${TOAST_ICONS[type] || TOAST_ICONS.info}<span>${escapeHTML(message)}</span>`;
  document.body.appendChild(el);
  setTimeout(() => {
    el.classList.add("out");
    setTimeout(() => el.remove(), 220);
  }, 3000);
}

function setBusy(btn, busy, busyLabel = "Working…") {
  if (!btn) return;
  if (busy) {
    /* remember the real label only the first time we enter busy state,
       so progress updates don't overwrite it */
    if (!btn.dataset.isBusy) {
      btn.dataset.originalLabel = btn.textContent;
      btn.dataset.isBusy = "1";
    }
    btn.textContent = busyLabel;
    btn.disabled = true;
  } else {
    if (btn.dataset.isBusy) {
      btn.textContent = btn.dataset.originalLabel || btn.textContent;
      delete btn.dataset.isBusy;
      delete btn.dataset.originalLabel;
    }
    btn.disabled = false;
  }
}

async function copyToClipboard(text, okMessage = "Copied to clipboard!") {
  try {
    await navigator.clipboard.writeText(text);
    showToast(okMessage, "success");
  } catch (e) {
    /* fallback for older browsers / non-secure contexts */
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    showToast(okMessage, "success");
  }
}

/* Friendly error box — also explains the file:// problem. */
function renderError(container, err) {
  console.error(err);
  if (!container) return;
  container.innerHTML = `
    <div class="empty-state">
      <h3>Couldn't load the archive data</h3>
      <p>${escapeHTML(err.message || String(err))}</p>
      <p class="muted mt-1">Tip: if you opened this file directly from disk (file://),
      run a local server instead — see README.md ("Running locally").</p>
    </div>`;
}

/* ---------- Shared icons (inline SVG) ---------- */
const ICONS = {
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  zip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8v13H3V8"/><path d="M1 3h22v5H1z"/><line x1="10" y1="12" x2="14" y2="12"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>'
};
