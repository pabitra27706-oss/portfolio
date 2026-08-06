/* ============================================================
   main.js — shared UI: glassy nav, theme, scroll progress,
   ripple, scroll-reveal, homepage (count-up stats, typewriter,
   featured/latest/skills) and the contact form.
   ============================================================ */

document.documentElement.classList.add("js");

/* ---------- Shared UI ---------- */
function initSharedUI() {
  /* Mobile nav — animated hamburger, closes on link tap */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    const close = () => {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  }

  /* Theme toggle — dark is the default; toggle applies "light" */
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    const sunSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    const moonSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    const isLight = () => document.documentElement.getAttribute("data-theme") === "light";
    const syncIcon = () => {
      /* show what you would switch TO */
      themeBtn.innerHTML = isLight() ? moonSVG : sunSVG;
      themeBtn.setAttribute("aria-label", isLight() ? "Switch to dark mode" : "Switch to light mode");
    };
    themeBtn.addEventListener("click", () => {
      if (isLight()) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
      syncIcon();
    });
    syncIcon();
  }

  /* Header density + scroll progress bar */
  const header = document.querySelector(".site-header");
  const progress = document.createElement("div");
  progress.id = "scrollProgress";
  document.body.appendChild(progress);
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 20);
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    const ind = document.querySelector(".scroll-indicator");
    if (ind) ind.classList.toggle("hidden-scroll", y > 100);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Button ripple (skipped for reduced motion) */
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.addEventListener("pointerdown", (e) => {
      const btn = e.target.closest(".btn, .btn-icon");
      if (!btn || btn.disabled) return;
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const r = document.createElement("span");
      r.className = "ripple";
      r.style.width = r.style.height = size + "px";
      r.style.left = (e.clientX - rect.left - size / 2) + "px";
      r.style.top = (e.clientY - rect.top - size / 2) + "px";
      btn.appendChild(r);
      setTimeout(() => r.remove(), 650);
    });
  }

  /* Personalise repeated elements from config */
  document.querySelectorAll("[data-site-name]").forEach((el) => {
    el.textContent = SITE_CONFIG.name;
  });
  const statusBadge = document.getElementById("statusBadge");
  if (statusBadge && SITE_CONFIG.currentFocus) {
    statusBadge.innerHTML = `<span class="dot"></span> Actively Learning &middot; ${escapeHTML(SITE_CONFIG.currentFocus)}`;
  }
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Contact form (contact.html) */
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("[name=name]").value.trim();
      const from = form.querySelector("[name=email]").value.trim();
      const message = form.querySelector("[name=message]").value.trim();
      if (!name || !from || !message) {
        showToast("Please fill in all fields", "error");
        return;
      }
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name}\n${from}`);
      window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
      showToast("Opening your email app…", "success");
    });
  }
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;
  const targets = document.querySelectorAll(
    ".hero-inner, .page-hero, main.page-main .section, main.page-main .section-tight, .cta-band"
  );
  if (!targets.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("reveal-visible");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.06 });
  targets.forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });
}

/* ---------- Count-up ---------- */
function animateCount(el, target) {
  target = Number(target) || 0;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = target;
    return;
  }
  const dur = 1500;
  const start = performance.now();
  (function tick(now) {
    const p = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3); /* ease-out cubic */
    el.textContent = Math.round(target * eased);
    if (p < 1) requestAnimationFrame(tick);
  })(start);
}

/* ---------- Typewriter ---------- */
function initTypewriter() {
  const el = document.getElementById("typewriter");
  if (!el) return;
  const phrases = SITE_CONFIG.typewriter || [SITE_CONFIG.tagline];
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = phrases[0];
    return;
  }
  let pi = 0, ci = 0, deleting = false;
  (function step() {
    const phrase = phrases[pi];
    if (!deleting) {
      ci++;
      el.textContent = phrase.slice(0, ci);
      if (ci === phrase.length) {
        deleting = true;
        setTimeout(step, 2000);
        return;
      }
      setTimeout(step, 60);
    } else {
      ci--;
      el.textContent = phrase.slice(0, ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        setTimeout(step, 350);
        return;
      }
      setTimeout(step, 30);
    }
  })();
}

/* ---------- Homepage ---------- */
async function initHome() {
  const statsEls = {
    topics: document.getElementById("stats-topics"),
    files: document.getElementById("stats-files"),
    langs: document.getElementById("stats-langs"),
    days: document.getElementById("stats-days")
  };
  try {
    const index = await fetchJSONCached(SITE.indexUrl);
    const meta = index.metadata || {};
    const topics = index.topics || [];

    if (statsEls.topics) animateCount(statsEls.topics, meta.totalTopics ?? topics.length);
    if (statsEls.files) animateCount(statsEls.files, meta.totalFiles ?? topics.reduce((s, t) => s + (t.fileCount || 0), 0));
    if (statsEls.langs) animateCount(statsEls.langs, (meta.languages || []).length);
    const start = meta.firstEntryDate || SITE_CONFIG.learningStartDate;
    if (statsEls.days) animateCount(statsEls.days, daysSince(start));

    renderFeatured(topics);
    renderLatest(topics);
    renderSkills(topics);
  } catch (err) {
    renderError(document.getElementById("home-data-error"), err);
  }
}

function topicCardHTML(t, i = 0) {
  const delay = Math.min(i * 60, 360);
  return `
    <article class="topic-card card-anim ${langSlugClass(t.language)}" style="animation-delay:${delay}ms">
      <div class="card-top">
        <span class="card-date">${formatDate(t.dateCreated)}</span>
        ${langBadgeHTML(t.language)}
      </div>
      <h3 class="card-title"><a href="topic.html?id=${encodeURIComponent(t.id)}">${escapeHTML(t.title)}</a></h3>
      <p class="card-desc">${escapeHTML(t.description || "")}</p>
      <div class="tags">${(t.tags || []).slice(0, 3).map((tag) => `<span class="tag tag-static">${escapeHTML(tag)}</span>`).join("")}</div>
      <div class="card-foot">
        <a class="card-view-link" href="topic.html?id=${encodeURIComponent(t.id)}">View Details <span class="arrow">→</span></a>
        <span class="file-count">${ICONS.file} ${t.fileCount || 0} file${t.fileCount === 1 ? "" : "s"}</span>
      </div>
    </article>`;
}

function renderFeatured(topics) {
  const grid = document.getElementById("featured-grid");
  if (!grid) return;
  const byId = Object.fromEntries(topics.map((t) => [t.id, t]));
  let featured = (SITE_CONFIG.featuredTopics || [])
    .map((id) => byId[id])
    .filter(Boolean)
    .slice(0, 4);
  if (!featured.length) {
    featured = [...topics]
      .sort((a, b) => b.dateCreated.localeCompare(a.dateCreated))
      .slice(0, 4);
  }
  grid.innerHTML = featured.map(topicCardHTML).join("");
}

function renderLatest(topics) {
  const list = document.getElementById("latest-timeline");
  if (!list) return;
  const latest = [...topics]
    .sort((a, b) => (b.lastUpdated || b.dateCreated).localeCompare(a.lastUpdated || a.dateCreated))
    .slice(0, 6);
  list.innerHTML = latest.map((t, i) => `
    <div class="activity-item card-anim" style="animation-delay:${Math.min(i * 50, 300)}ms">
      <div class="activity-date">${formatDate(t.lastUpdated || t.dateCreated)}</div>
      <div class="activity-body">
        <a href="topic.html?id=${encodeURIComponent(t.id)}">${escapeHTML(t.title)}</a>
        <div class="muted">${escapeHTML(t.language)} · ${t.fileCount || 0} file${t.fileCount === 1 ? "" : "s"}${(t.lastUpdated && t.lastUpdated !== t.dateCreated) ? " · updated" : ""}</div>
      </div>
    </div>`).join("");
}

function renderSkills(topics) {
  const box = document.getElementById("skills-overview");
  if (!box) return;
  const byLang = {};
  topics.forEach((t) => {
    byLang[t.language] = byLang[t.language] || { topics: 0, files: 0 };
    byLang[t.language].topics += 1;
    byLang[t.language].files += t.fileCount || 0;
  });
  const rows = Object.entries(byLang).sort((a, b) => b[1].files - a[1].files);
  const maxFiles = Math.max(1, ...rows.map(([, v]) => v.files));
  box.innerHTML = rows.map(([lang, v]) => `
    <div class="skill-row">
      <div class="skill-head">
        <span class="skill-name">${langBadgeHTML(lang)}</span>
        <span class="skill-count">${v.topics} topics · ${v.files} files</span>
      </div>
      <div class="skill-bar"><div class="skill-bar-fill" style="width:0%" data-width="${Math.round((v.files / maxFiles) * 100)}%"></div></div>
    </div>`).join("");
  /* animate bars in after paint */
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      box.querySelectorAll(".skill-bar-fill").forEach((f) => { f.style.width = f.dataset.width; });
    });
  });
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initSharedUI();
  initReveal();
  initTypewriter();
  if (document.getElementById("home")) initHome();
});
