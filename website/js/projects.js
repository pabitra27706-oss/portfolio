/* ============================================================
   projects.js — renders the Projects page from data/projects.json
   Minimalist by design: name, description, tech, status,
   repository link (always) and optional live link.
   ============================================================ */

const STATUS_LABEL = {
  "live": "Live",
  "in-progress": "In Progress",
  "completed": "Completed",
  "paused": "Paused"
};

function monogramOf(name) {
  const words = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "•";
  const initials = words.length === 1 ? words[0].slice(0, 2) : words[0][0] + words[1][0];
  return escapeHTML(initials.toUpperCase());
}

function thumbClass(seed) {
  let h = 0;
  for (const ch of String(seed || "x")) h = (h * 31 + ch.charCodeAt(0)) % 4;
  return "thumb-" + (h + 1);
}

function projectCardHTML(p, i = 0) {
  const delay = Math.min(i * 60, 360);
  const status = STATUS_LABEL[p.status]
    ? `<span class="proj-status ${escapeHTML(p.status)}"><span class="dot"></span>${STATUS_LABEL[p.status]}</span>`
    : "";
  const live = p.liveUrl
    ? `<a class="btn btn-sm btn-primary" href="${escapeHTML(p.liveUrl)}" target="_blank" rel="noopener">Live Demo</a>`
    : "";
  const repo = p.repoUrl
    ? `<a class="btn btn-sm btn-secondary" href="${escapeHTML(p.repoUrl)}" target="_blank" rel="noopener">${ICONS.github} Repository</a>`
    : "";
  const highlights = (Array.isArray(p.highlights) && p.highlights.length)
    ? `<ul class="project-highlights">${p.highlights.map((h) => `<li>${escapeHTML(h)}</li>`).join("")}</ul>`
    : "";
  const date = p.dateAdded ? `<span class="project-date">${formatDate(p.dateAdded)}</span>` : "";

  return `
    <article class="project-card card-anim${p.featured ? " featured" : ""}" style="animation-delay:${delay}ms">
      <div class="project-thumb ${thumbClass(p.id || p.name)}"><span class="project-monogram">${monogramOf(p.name)}</span></div>
      <div class="project-body">
        <div class="project-top">
          <h3>${escapeHTML(p.name || "Untitled project")}</h3>
          ${status}
        </div>
        <p>${escapeHTML(p.description || "")}</p>
        ${highlights}
        <div class="tech-chips">${(p.tech || []).map((t) => `<span class="tech-chip">${escapeHTML(t)}</span>`).join("")}</div>
        <div class="project-links">${live}${repo}</div>
        ${date}
      </div>
    </article>`;
}

async function initProjects() {
  const grid = document.getElementById("projectsGrid");
  const countEl = document.getElementById("projectsCount");
  try {
    const data = await fetchJSONCached(SITE.resolve("data/projects.json"));
    const projects = [...(data.projects || [])].sort((a, b) =>
      ((b.featured ? 1 : 0) - (a.featured ? 1 : 0)) ||
      String(b.dateAdded || "").localeCompare(String(a.dateAdded || ""))
    );
    if (countEl) countEl.textContent = `${projects.length} project${projects.length === 1 ? "" : "s"}`;

    if (!projects.length) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <div class="empty-icon">${ICONS.folder}</div>
          <h3>No projects yet</h3>
          <p>Add your first one with the Project Creator tool.</p>
          <a class="btn btn-primary btn-sm mt-2" href="../tools/project-creator.html">Open Project Creator</a>
        </div>`;
      return;
    }
    grid.innerHTML = projects.map(projectCardHTML).join("");
  } catch (err) {
    renderError(grid, err);
  }
}

document.addEventListener("DOMContentLoaded", initProjects);
