/* ============================================
   JSON Creator v2.0 - Logic Only
   Data loaded from lang-config.json
   ============================================ */

(function () {
  "use strict";

  /* ============================================
     STATE
     ============================================ */

  const state = {
    LANG_CONFIG:          {},       // loaded from lang-config.json
    selectedLang:         "C",
    selectedTemplate:     null,
    selectedTags:         new Set(),
    customTags:           [],
    detectedFile:         null,
    savedIndex:           null,
    currentDescStarter:   "",
    idTouched:            false,
    titleTouched:         false     // true once user manually edits title
  };

  /* ============================================
     LOCALSTORAGE KEYS
     ============================================ */

  const LS_KEYS = {
    INDEX: "arcIndexJson",
    THEME: "theme"
  };

  /* ============================================
     UTILITIES
     ============================================ */

  const utils = {

    slugify(str) {
      return String(str)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    },

    nowISO() {
      return new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
    },

    todayDate() {
      return utils.nowISO().slice(0, 10);
    },

    escapeHTML(str) {
      const d = document.createElement("div");
      d.textContent = str;
      return d.innerHTML;
    },

    /* "if-else-basic.c" → "If Else Basic" */
    fileNameToTitle(filename) {
      return utils
        .stripExtension(filename)          // if-else-basic
        .replace(/[-_]+/g, " ")            // if else basic
        .replace(/\b\w/g, (c) => c.toUpperCase()); // If Else Basic
    },

    stripExtension(filename) {
      return filename.replace(/\.[^/.]+$/, "");
    },

    detectLangFromExtension(filename) {
      const ext = filename.split(".").pop().toLowerCase();
      const map = {
        c: "C", h: "C",
        py: "Python",
        js: "JavaScript", jsx: "JavaScript",
        ts: "JavaScript", tsx: "JavaScript",
        java: "Java",
        sql: "SQL",
        html: "HTML/CSS", css: "HTML/CSS"
      };
      return map[ext] || null;
    },

    saveToLS(key, data) {
      try { localStorage.setItem(key, JSON.stringify(data)); }
      catch (e) { console.warn("LS save failed:", e); }
    },

    loadFromLS(key) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
      } catch (e) { return null; }
    },

    removeFromLS(key) {
      try { localStorage.removeItem(key); }
      catch (e) { console.warn("LS remove failed:", e); }
    }
  };

  /* ============================================
     DOM REFERENCES
     ============================================ */

  const $ = (id) => document.getElementById(id);
  const $$ = (sel) => document.querySelectorAll(sel);

  const DOM = {
    /* File detection */
    dropZone:       $("dropZone"),
    fileInput:      $("fileInput"),
    detectedInfo:   $("detectedInfo"),
    detectedLang:   $("detectedLang"),
    detectedFile:   $("detectedFile"),
    clearDetection: $("clearDetection"),

    /* Form */
    langSelect:      $("langSelect"),
    topicTemplates:  $("topicTemplates"),
    topicTitle:      $("topicTitle"),
    topicCategory:   $("topicCategory"),
    topicDifficulty: $("topicDifficulty"),
    topicId:         $("topicId"),
    topicDesc:       $("topicDesc"),
    whatLearned:     $("whatLearned"),
    challenges:      $("challenges"),
    nextSteps:       $("nextSteps"),

    /* Tags */
    tagSuggestions: $("tagSuggestions"),
    selectedTags:   $("selectedTags"),
    customTags:     $("customTags"),

    /* Description starter */
    descActions:    $("descActions"),
    useDescStarter: $("useDescStarter"),

    /* Files */
    fileRows:   $("fileRows"),
    addFileBtn: $("addFileBtn"),

    /* Inline errors */
    titleError: $("titleError"),
    descError:  $("descError"),

    /* Buttons */
    generateBtn:   $("generateBtn"),
    loadSampleBtn: $("loadSampleBtn"),
    clearFormBtn:  $("clearFormBtn"),

    /* Index manager */
    indexFile:        $("indexFile"),
    indexStatusPill:  $("indexStatusPill"),
    indexStatusText:  $("indexStatusText"),
    indexPasteToggle: $("indexPasteToggle"),
    indexPasteBox:    $("indexPasteBox"),
    indexPasteArea:   $("indexPasteArea"),
    indexPasteLoad:   $("indexPasteLoad"),
    indexRemoveBtn:   $("indexRemoveBtn"),

    /* Outputs */
    topicOutput:      $("topicOutput"),
    indexOutput:      $("indexOutput"),
    indexOutputTitle: $("indexOutputTitle"),
    indexOutputHint:  $("indexOutputHint"),
    downloadIndexBtn: $("downloadIndexBtn"),

    /* Copy / Download */
    copyTopicBtn:     $("copyTopicBtn"),
    downloadTopicBtn: $("downloadTopicBtn"),
    copyIndexBtn:     $("copyIndexBtn"),

    /* Theme */
    themeToggle: $("themeToggle")
  };

  /* ============================================
     LOAD lang-config.json
     ============================================ */

  async function loadLangConfig() {
    try {
      const res  = await fetch("lang-config.json");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      state.LANG_CONFIG = await res.json();
      init();
    } catch (err) {
      console.error("Failed to load lang-config.json:", err);
      document.body.innerHTML =
        `<div style="padding:40px;text-align:center;font-family:sans-serif">
           <h2>⚠️ Could not load lang-config.json</h2>
           <p>Make sure <code>lang-config.json</code> is in the same folder as this page.</p>
           <p style="color:#888;font-size:0.85rem">${err.message}</p>
         </div>`;
    }
  }

  /* ============================================
     FILE AUTO-DETECTION
     ============================================ */

  function handleFileDetection(file) {
    const lang = utils.detectLangFromExtension(file.name);

    if (!lang) {
      alert("Cannot detect language. Supported: .c .h .py .js .java .sql .html .css");
      return;
    }

    state.detectedFile = file;
    state.selectedLang = lang;

    /* Update detected badge */
    DOM.langSelect.value         = lang;
    DOM.detectedLang.textContent = lang;
    DOM.detectedFile.textContent = file.name;
    DOM.detectedInfo.classList.remove("hidden");

    /* Auto title from filename (unless user already edited it) */
    if (!state.titleTouched) {
      DOM.topicTitle.value = utils.fileNameToTitle(file.name);
      updateTopicId();
    }

    /* Trigger language change → templates, tags, categories */
    handleLanguageChange();

    /* Auto-fill first file row */
    const firstRow = DOM.fileRows.querySelector(".file-row-builder");
    if (firstRow) {
      const config = state.LANG_CONFIG[lang];
      firstRow.querySelector(".f-name").value = file.name;
      firstRow.querySelector(".f-path").value =
        `content/${config.folder}/${file.name}`;
    }
  }

  /* Drag & Drop */
  DOM.dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    DOM.dropZone.classList.add("dragover");
  });
  DOM.dropZone.addEventListener("dragleave", () =>
    DOM.dropZone.classList.remove("dragover")
  );
  DOM.dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    DOM.dropZone.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    if (file) handleFileDetection(file);
  });

  /* Browse */
  DOM.fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) handleFileDetection(file);
    e.target.value = "";
  });

  /* Clear detection */
  DOM.clearDetection.addEventListener("click", () => {
    state.detectedFile  = null;
    state.titleTouched  = false;
    DOM.detectedInfo.classList.add("hidden");
  });

  /* ============================================
     LANGUAGE CHANGE
     ============================================ */

  function handleLanguageChange() {
    const lang   = DOM.langSelect.value;
    state.selectedLang = lang;
    const config = state.LANG_CONFIG[lang];
    if (!config) return;

    /* Rebuild category dropdown */
    DOM.topicCategory.innerHTML = config.categories
      .map((cat) => `<option value="${cat}">${cat}</option>`)
      .join("");

    /* Reset difficulty */
    DOM.topicDifficulty.value = config.defaultDifficulty;

    /* Rebuild templates & tags */
    renderTopicTemplates();
    renderTagSuggestions();
    updateTopicId();
  }

  DOM.langSelect.addEventListener("change", handleLanguageChange);

  /* ============================================
     TOPIC TEMPLATES
     (only fills category / difficulty / tags
      title stays as filename-based)
     ============================================ */

  function renderTopicTemplates() {
    const templates = state.LANG_CONFIG[state.selectedLang].topicTemplates;

    DOM.topicTemplates.innerHTML = templates
      .map((tpl, idx) => `
        <div class="topic-chip" data-index="${idx}">
          <span class="topic-chip-icon">📄</span>
          ${utils.escapeHTML(tpl.name)}
        </div>`)
      .join("");

    DOM.topicTemplates.querySelectorAll(".topic-chip").forEach((chip) =>
      chip.addEventListener("click", () =>
        selectTopicTemplate(parseInt(chip.dataset.index))
      )
    );
  }

  function selectTopicTemplate(index) {
    const tpl = state.LANG_CONFIG[state.selectedLang].topicTemplates[index];

    /* Highlight chip */
    DOM.topicTemplates.querySelectorAll(".topic-chip").forEach((c, i) =>
      c.classList.toggle("active", i === index)
    );

    state.selectedTemplate = tpl;

    /* Fill category & difficulty only — title stays as filename */
    DOM.topicCategory.value   = tpl.category;
    DOM.topicDifficulty.value = tpl.difficulty;

    /* Pre-select tags */
    state.selectedTags.clear();
    tpl.tags.forEach((t) => state.selectedTags.add(t));
    renderSelectedTags();
    updateTagPillsState();

    /* Offer description starter */
    state.currentDescStarter = tpl.descStarter;
    DOM.useDescStarter.classList.remove("hidden");
  }

  DOM.useDescStarter.addEventListener("click", () => {
    DOM.topicDesc.value = state.currentDescStarter;
    DOM.useDescStarter.classList.add("hidden");
  });

  /* ============================================
     TAG SYSTEM
     ============================================ */

  function renderTagSuggestions() {
    const tags = state.LANG_CONFIG[state.selectedLang].tags;

    DOM.tagSuggestions.innerHTML = tags
      .map((tag) => `
        <div class="tag-pill" data-tag="${tag}">
          ${utils.escapeHTML(tag)}
        </div>`)
      .join("");

    DOM.tagSuggestions.querySelectorAll(".tag-pill").forEach((pill) =>
      pill.addEventListener("click", () => toggleTag(pill.dataset.tag))
    );

    updateTagPillsState();
  }

  function toggleTag(tag) {
    if (state.selectedTags.has(tag)) state.selectedTags.delete(tag);
    else state.selectedTags.add(tag);
    renderSelectedTags();
    updateTagPillsState();
  }

  function updateTagPillsState() {
    DOM.tagSuggestions.querySelectorAll(".tag-pill").forEach((pill) =>
      pill.classList.toggle("selected", state.selectedTags.has(pill.dataset.tag))
    );
  }

  function renderSelectedTags() {
    const allTags = [
      ...Array.from(state.selectedTags),
      ...state.customTags
    ];

    if (!allTags.length) {
      DOM.selectedTags.innerHTML =
        '<span class="no-tags-msg">No tags selected</span>';
      return;
    }

    DOM.selectedTags.innerHTML = allTags
      .map((tag) => {
        const isCustom = state.customTags.includes(tag);
        return `
          <div class="selected-tag-item ${isCustom ? "custom" : ""}">
            ${utils.escapeHTML(tag)}
            <button class="selected-tag-remove"
                    data-tag="${tag}" type="button">×</button>
          </div>`;
      })
      .join("");

    DOM.selectedTags.querySelectorAll(".selected-tag-remove").forEach((btn) =>
      btn.addEventListener("click", () => removeTag(btn.dataset.tag))
    );
  }

  function removeTag(tag) {
    state.selectedTags.delete(tag);
    state.customTags = state.customTags.filter((t) => t !== tag);
    renderSelectedTags();
    updateTagPillsState();
  }

  function commitCustomTags() {
    const raw = DOM.customTags.value.trim();
    if (!raw) return;
    raw.split(",")
      .map((t) => utils.slugify(t))
      .filter(Boolean)
      .forEach((tag) => {
        if (!state.selectedTags.has(tag) && !state.customTags.includes(tag))
          state.customTags.push(tag);
      });
    DOM.customTags.value = "";
    renderSelectedTags();
  }

  DOM.customTags.addEventListener("change", commitCustomTags);
  DOM.customTags.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); commitCustomTags(); }
  });

  /* ============================================
     AUTO TOPIC ID
     ============================================ */

  function updateTopicId() {
    if (state.idTouched) return;
    const title = DOM.topicTitle.value.trim();
    if (!title) { DOM.topicId.value = ""; return; }

    const prefix = {
      C: "c", Python: "python", JavaScript: "js",
      Java: "java", SQL: "sql", "HTML/CSS": "web"
    }[state.selectedLang] || "misc";

    DOM.topicId.value = `${prefix}-${utils.slugify(title)}`;
  }

  /* Title: track manual edits */
  DOM.topicTitle.addEventListener("input", () => {
    state.titleTouched = DOM.topicTitle.value.trim() !== "";
    updateTopicId();
    /* Clear title error */
    if (DOM.topicTitle.value.trim()) {
      DOM.titleError.classList.add("hidden");
      DOM.topicTitle.classList.remove("error");
    }
  });

  /* ID: track manual edits */
  DOM.topicId.addEventListener("input", () => {
    state.idTouched = DOM.topicId.value.trim() !== "";
  });

  /* ============================================
     FILE ROWS
     ============================================ */

  function addFileRow(data = {}) {
    const config      = state.LANG_CONFIG[state.selectedLang];
    const defaultPath = `content/${config.folder}/`;

    const row = document.createElement("div");
    row.className = "file-row-builder";
    row.innerHTML = `
      <button class="remove-file" title="Remove" type="button">×</button>
      <div class="file-row-grid">
        <div class="form-group" style="margin-bottom:10px">
          <label>File Name</label>
          <input class="form-control f-name"
                 placeholder="example${config.extension}"
                 value="${utils.escapeHTML(data.name || "")}">
        </div>
        <div class="form-group" style="margin-bottom:10px">
          <label>File Path</label>
          <input class="form-control f-path"
                 placeholder="${defaultPath}example${config.extension}"
                 value="${utils.escapeHTML(data.path || "")}">
        </div>
      </div>
      <div class="form-group" style="margin-bottom:10px">
        <label>Description</label>
        <input class="form-control f-desc"
               placeholder="What does this file demonstrate?"
               value="${utils.escapeHTML(data.desc || "")}">
      </div>
      <div class="file-row-grid">
        <div class="form-group" style="margin-bottom:0">
          <label>Lines (optional)</label>
          <input class="form-control f-lines"
                 type="number" min="0"
                 value="${data.lines || ""}">
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label>Size (optional)</label>
          <input class="form-control f-size"
                 placeholder="1.2KB"
                 value="${utils.escapeHTML(data.size || "")}">
        </div>
      </div>`;

    row.querySelector(".remove-file")
       .addEventListener("click", () => row.remove());

    /* Auto-fill path from name */
    const nameInput  = row.querySelector(".f-name");
    const pathInput  = row.querySelector(".f-path");
    let   pathTouched = !!data.path;

    nameInput.addEventListener("input", () => {
      if (pathTouched) return;
      const name = nameInput.value.trim();
      if (!name) { pathInput.value = ""; return; }

      /* Auto title from first row filename if title not touched */
      if (!state.titleTouched &&
          row === DOM.fileRows.querySelector(".file-row-builder")) {
        DOM.topicTitle.value = utils.fileNameToTitle(name);
        updateTopicId();
      }

      const fileName = name.includes(".") ? name : name + config.extension;
      pathInput.value = `${defaultPath}${fileName}`;
    });

    pathInput.addEventListener("input", () => {
      pathTouched = pathInput.value.trim() !== "";
    });

    DOM.fileRows.appendChild(row);
  }

  DOM.addFileBtn.addEventListener("click", () => addFileRow());

  function collectFiles() {
    return Array.from($$(".file-row-builder"))
      .map((row, i) => {
        const name = row.querySelector(".f-name").value.trim();
        const path = row.querySelector(".f-path").value.trim();
        if (!name && !path) return null;

        const config = state.LANG_CONFIG[state.selectedLang];
        const entry  = {
          id:          "file-" + String(i + 1).padStart(3, "0"),
          fileName:    name || path.split("/").pop(),
          filePath:    path || `content/${config.folder}/${name}`,
          description: row.querySelector(".f-desc").value.trim(),
          dateAdded:   utils.nowISO()
        };

        const lines = row.querySelector(".f-lines").value;
        if (lines) entry.lines = parseInt(lines, 10);

        const size = row.querySelector(".f-size").value.trim();
        if (size) entry.size = size;

        return entry;
      })
      .filter(Boolean);
  }

  /* ============================================
     FORM VALIDATION
     ============================================ */

  function validateForm() {
    let valid = true;

    if (!DOM.topicTitle.value.trim()) {
      DOM.titleError.textContent = "Topic title is required.";
      DOM.titleError.classList.remove("hidden");
      DOM.topicTitle.classList.add("error");
      valid = false;
    } else {
      DOM.titleError.classList.add("hidden");
      DOM.topicTitle.classList.remove("error");
    }

    if (!DOM.topicDesc.value.trim()) {
      DOM.descError.textContent = "Description is required.";
      DOM.descError.classList.remove("hidden");
      DOM.topicDesc.classList.add("error");
      valid = false;
    } else {
      DOM.descError.classList.add("hidden");
      DOM.topicDesc.classList.remove("error");
    }

    if (collectFiles().length === 0) {
      alert("Please add at least one file.");
      valid = false;
    }

    return valid;
  }

  DOM.topicDesc.addEventListener("input", () => {
    if (DOM.topicDesc.value.trim()) {
      DOM.descError.classList.add("hidden");
      DOM.topicDesc.classList.remove("error");
    }
  });

  /* ============================================
     JSON GENERATION
     ============================================ */

  function generateJSON() {
    if (!validateForm()) return;

    const config   = state.LANG_CONFIG[state.selectedLang];
    const title    = DOM.topicTitle.value.trim();
    const category = DOM.topicCategory.value.trim();
    const id       = DOM.topicId.value.trim() ||
                     utils.slugify(`${state.selectedLang}-${title}`);
    const files    = collectFiles();
    const allTags  = [
      ...Array.from(state.selectedTags),
      ...state.customTags
    ];

    /* topicFile → first file name, extension swapped to .json */
    const nameNoExt     = utils.stripExtension(files[0].fileName);
    const topicFilePath = `data/topics/${config.folder}/${nameNoExt}.json`;

    /* ── Topic JSON ── */
    const topicJSON = {
      topic: {
        id,
        title,
        language:    state.selectedLang,
        category:    category || undefined,
        difficulty:  DOM.topicDifficulty.value,
        dateCreated: utils.nowISO(),
        lastUpdated: utils.nowISO(),
        tags:        allTags,
        description: DOM.topicDesc.value.trim(),
        learningNotes: {
          whatILearned: DOM.whatLearned.value.trim(),
          challenges:   DOM.challenges.value.trim(),
          nextSteps:    DOM.nextSteps.value.trim()
        }
      },
      files
    };

    /* ── Index entry ── */
    const indexEntry = {
      id,
      title,
      language:    state.selectedLang,
      dateCreated: utils.todayDate(),
      lastUpdated: utils.todayDate(),
      fileCount:   files.length,
      tags:        allTags,
      description: DOM.topicDesc.value.trim().slice(0, 220),
      topicFile:   topicFilePath
    };

    /* Output topic JSON */
    DOM.topicOutput.value = JSON.stringify(topicJSON, null, 2);

    /* Output index */
    if (state.savedIndex) {
      const existIdx = state.savedIndex.topics.findIndex((t) => t.id === id);
      if (existIdx !== -1) {
        const ok = confirm(
          `Topic ID "${id}" already exists.\n\nOK = replace\nCancel = abort`
        );
        if (!ok) return;
        state.savedIndex.topics.splice(existIdx, 1);
      }

      const updated = JSON.parse(JSON.stringify(state.savedIndex));
      updated.topics = [indexEntry, ...updated.topics];
      updated.metadata.totalTopics = updated.topics.length;
      updated.metadata.totalFiles  = updated.topics
        .reduce((s, t) => s + (t.fileCount || 0), 0);
      updated.metadata.lastUpdated = utils.nowISO();

      if (!Array.isArray(updated.metadata.languages))
        updated.metadata.languages = [];
      if (!updated.metadata.languages.includes(state.selectedLang))
        updated.metadata.languages.push(state.selectedLang);
      if (!updated.metadata.firstEntryDate)
        updated.metadata.firstEntryDate = indexEntry.dateCreated;

      state.savedIndex = updated;
      utils.saveToLS(LS_KEYS.INDEX, updated);
      renderIndexStatus();

      DOM.indexOutput.value            = JSON.stringify(updated, null, 2);
      DOM.indexOutputTitle.textContent = "2 · Complete index.json (updated)";
      DOM.indexOutputHint.innerHTML    =
        `Your <b>full rewritten index.json</b> — download and replace <code>data/index.json</code>.`;
      DOM.downloadIndexBtn.classList.remove("hidden");

    } else {
      DOM.indexOutput.value            = JSON.stringify(indexEntry, null, 2);
      DOM.indexOutputTitle.textContent = "2 · index.json Entry (snippet)";
      DOM.indexOutputHint.innerHTML    =
        `Paste inside <code>"topics": []</code> in <code>data/index.json</code>, ` +
        `then update <code>totalTopics</code>, <code>totalFiles</code>, ` +
        `<code>languages</code> and <code>lastUpdated</code> manually. ` +
        `<b>Tip:</b> Upload your index.json above for automatic rewrites.`;
      DOM.downloadIndexBtn.classList.add("hidden");
    }

    /* Button feedback */
    const btnText   = DOM.generateBtn.querySelector(".btn-text");
    const btnLoader = DOM.generateBtn.querySelector(".btn-loader");
    btnText.classList.add("hidden");
    btnLoader.classList.remove("hidden");
    setTimeout(() => {
      btnText.classList.remove("hidden");
      btnLoader.classList.add("hidden");
    }, 800);
  }

  DOM.generateBtn.addEventListener("click", generateJSON);

  /* ============================================
     INDEX.JSON MANAGER
     ============================================ */

  function adoptIndex(parsed) {
    if (
      !parsed ||
      typeof parsed !== "object" ||
      Array.isArray(parsed) ||
      !Array.isArray(parsed.topics)
    ) throw new Error('Invalid index.json — missing "topics" array.');

    if (!parsed.metadata || typeof parsed.metadata !== "object")
      parsed.metadata = {};

    state.savedIndex = parsed;
    utils.saveToLS(LS_KEYS.INDEX, parsed);
    renderIndexStatus();
  }

  function renderIndexStatus() {
    if (state.savedIndex) {
      const m     = state.savedIndex.metadata || {};
      const n     = state.savedIndex.topics.length;
      const files = typeof m.totalFiles === "number" ? m.totalFiles : "?";
      DOM.indexStatusPill.textContent = "Loaded ✓";
      DOM.indexStatusPill.classList.add("loaded");
      DOM.indexStatusText.innerHTML =
        `Storing <b>${n}</b> topic${n === 1 ? "" : "s"} · ` +
        `${files} files · last updated ` +
        `<code>${utils.escapeHTML(m.lastUpdated || "—")}</code>. ` +
        `Every generate merges the new entry and rewrites this stored copy.`;
      DOM.indexRemoveBtn.classList.remove("hidden");
    } else {
      DOM.indexStatusPill.textContent = "Not loaded";
      DOM.indexStatusPill.classList.remove("loaded");
      DOM.indexStatusText.innerHTML =
        `Upload your <code>data/index.json</code> once — stored in this browser. ` +
        `Every generation gives you the <b>full rewritten file</b> automatically.`;
      DOM.indexRemoveBtn.classList.add("hidden");
    }
  }

  DOM.indexFile.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try   { adoptIndex(JSON.parse(reader.result)); }
      catch (err) { alert("Could not load: " + err.message); }
    };
    reader.readAsText(file);
    e.target.value = "";
  });

  DOM.indexPasteToggle.addEventListener("click", () =>
    DOM.indexPasteBox.classList.toggle("hidden")
  );

  DOM.indexPasteLoad.addEventListener("click", () => {
    const raw = DOM.indexPasteArea.value.trim();
    if (!raw) { alert("Paste your index.json first."); return; }
    try {
      adoptIndex(JSON.parse(raw));
      DOM.indexPasteBox.classList.add("hidden");
      DOM.indexPasteArea.value = "";
    } catch (err) { alert("Could not parse: " + err.message); }
  });

  DOM.indexRemoveBtn.addEventListener("click", () => {
    if (!confirm("Remove stored index.json from this browser?\n(Repo file not touched.)"))
      return;
    state.savedIndex = null;
    utils.removeFromLS(LS_KEYS.INDEX);
    renderIndexStatus();
  });

  DOM.downloadIndexBtn.addEventListener("click", () => {
    if (!state.savedIndex) return;
    const blob = new Blob(
      [JSON.stringify(state.savedIndex, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a   = document.createElement("a");
    a.href = url; a.download = "index.json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  });

  /* ============================================
     COPY / DOWNLOAD
     ============================================ */

  async function copyText(text, btn) {
    if (!text) { alert("Generate JSON first."); return; }
    try {
      await navigator.clipboard.writeText(text);
      const old = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => { btn.textContent = old; }, 1500);
    } catch (e) {
      alert("Copy failed — select and copy manually.");
    }
  }

  DOM.copyTopicBtn.addEventListener("click", () =>
    copyText(DOM.topicOutput.value, DOM.copyTopicBtn)
  );
  DOM.copyIndexBtn.addEventListener("click", () =>
    copyText(DOM.indexOutput.value, DOM.copyIndexBtn)
  );

  DOM.downloadTopicBtn.addEventListener("click", () => {
    const text = DOM.topicOutput.value;
    if (!text) { alert("Generate JSON first."); return; }
    const id   = (DOM.topicId.value.trim() || "topic")
                   .replace(/[^a-z0-9-]/gi, "-").toLowerCase();
    const blob = new Blob([text], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = `${id}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  });

  /* ============================================
     SAMPLE DATA
     ============================================ */

  DOM.loadSampleBtn.addEventListener("click", () => {
    DOM.langSelect.value = "C";
    handleLanguageChange();

    /* Set title from a sample filename */
    state.titleTouched   = false;
    DOM.topicTitle.value = "If Else Basic";
    updateTopicId();

    /* Select template index 3 = If-Else Statement */
    selectTopicTemplate(3);

    DOM.topicDesc.value   =
      "Conditional execution in C using if-else. Covers basic decisions, " +
      "nested conditions, and practical real-world examples.";
    DOM.whatLearned.value =
      "How to use if-else for decision making. Learned about boolean " +
      "condition evaluation and branching logic.";
    DOM.challenges.value  =
      "Initially confused about nested if-else indentation. " +
      "Resolved by drawing the logic flow first.";
    DOM.nextSteps.value   =
      "Study switch statements and ternary operators for cleaner branching.";

    DOM.fileRows.innerHTML = "";
    addFileRow({
      name:  "if-else-basic.c",
      path:  "content/c/if-else-basic.c",
      desc:  "Basic if-else examples with simple conditions",
      lines: 45,
      size:  "1.1KB"
    });
    addFileRow({
      name:  "if-else-nested.c",
      path:  "content/c/if-else-nested.c",
      desc:  "Nested if-else for complex decision trees",
      lines: 62,
      size:  "1.5KB"
    });
  });

  /* ============================================
     CLEAR FORM
     ============================================ */

  DOM.clearFormBtn.addEventListener("click", () => {
    if (!confirm("Clear all form data? (Stored index.json is kept.)")) return;

    [
      DOM.topicTitle, DOM.topicDesc, DOM.whatLearned,
      DOM.challenges, DOM.nextSteps, DOM.customTags,
      DOM.topicOutput, DOM.indexOutput, DOM.topicId
    ].forEach((el) => { el.value = ""; });

    state.selectedTags.clear();
    state.customTags         = [];
    state.selectedTemplate   = null;
    state.currentDescStarter = "";
    state.idTouched          = false;
    state.titleTouched       = false;
    state.detectedFile       = null;

    DOM.detectedInfo.classList.add("hidden");
    DOM.fileRows.innerHTML = "";
    addFileRow();

    renderSelectedTags();
    updateTagPillsState();
    DOM.topicTemplates.querySelectorAll(".topic-chip")
      .forEach((c) => c.classList.remove("active"));
    DOM.useDescStarter.classList.add("hidden");
    DOM.titleError.classList.add("hidden");
    DOM.descError.classList.add("hidden");
    DOM.topicTitle.classList.remove("error");
    DOM.topicDesc.classList.remove("error");
    updateTopicId();
  });

  /* ============================================
     THEME TOGGLE
     ============================================ */

  if (DOM.themeToggle) {
    const SUN  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    const MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

    const syncTheme = () => {
      const isLight =
        document.documentElement.getAttribute("data-theme") === "light";
      DOM.themeToggle.innerHTML = isLight ? MOON : SUN;
    };

    DOM.themeToggle.addEventListener("click", () => {
      const isLight =
        document.documentElement.getAttribute("data-theme") === "light";
      if (isLight) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem(LS_KEYS.THEME, "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem(LS_KEYS.THEME, "light");
      }
      syncTheme();
    });

    syncTheme();
  }

  /* ============================================
     INIT
     ============================================ */

  function init() {
    /* Restore saved index */
    const saved = utils.loadFromLS(LS_KEYS.INDEX);
    if (saved) {
      try { adoptIndex(saved); }
      catch (e) { console.warn("Saved index invalid:", e); }
    }

    renderIndexStatus();
    handleLanguageChange();
    addFileRow();
  }

  /* ── Entry point: load data first, then init ── */
  loadLangConfig();

})();