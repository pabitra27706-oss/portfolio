/* ============================================================
   download.js — single-file downloads, copy, and ZIP bundles
   Requires: utils.js, JSZip (js/vendor/jszip.min.js)
   ============================================================ */

async function fetchRepoText(repoPath) {
  return fetchTextCached(SITE.resolve(repoPath));
}

function triggerBlobDownload(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

/* Download one source file with its original name. */
async function downloadSingleFile(repoPath, fileName, btn) {
  try {
    setBusy(btn, true, "Fetching…");
    const text = await fetchRepoText(repoPath);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    triggerBlobDownload(blob, fileName || repoPath.split("/").pop());
    showToast(`Downloading ${fileName || repoPath}`, "success");
  } catch (err) {
    showToast("Download failed: " + err.message, "error");
  } finally {
    setBusy(btn, false);
  }
}

function ensureJSZip() {
  if (typeof JSZip === "undefined") {
    showToast("JSZip library is missing — check js/vendor/jszip.min.js", "error");
    return false;
  }
  return true;
}

/* Load a topic's full JSON from its index entry. */
function loadTopicData(indexEntry) {
  return fetchJSONCached(SITE.resolve(indexEntry.topicFile));
}

/* ZIP one topic: folder named after the topic id, containing all
   code files plus a _topic-info.json snapshot of the metadata. */
async function downloadTopicZIP(indexEntry, btn) {
  if (!ensureJSZip()) return;
  try {
    setBusy(btn, true, "Preparing ZIP…");
    const data = await loadTopicData(indexEntry);
    const zip = new JSZip();
    const folder = zip.folder(indexEntry.id);

    let i = 0;
    for (const f of data.files) {
      setBusy(btn, true, `File ${++i}/${data.files.length}…`);
      btn.disabled = true;
      const text = await fetchRepoText(f.filePath);
      folder.file(f.fileName, text);
    }
    folder.file("_topic-info.json", JSON.stringify(data, null, 2));

    const blob = await zip.generateAsync({ type: "blob" });
    triggerBlobDownload(blob, `${indexEntry.id}-${todayStamp()}.zip`);
    showToast(`Downloaded "${indexEntry.title}" as ZIP`, "success");
  } catch (err) {
    showToast("ZIP failed: " + err.message, "error");
  } finally {
    setBusy(btn, false);
  }
}

/* ZIP several selected topics:
   selected-topics-YYYY-MM-DD.zip
     ├── c-pointers/...
     └── python-lists/...                                    */
async function downloadMultiZIP(indexEntries, btn) {
  if (!ensureJSZip()) return;
  if (!indexEntries.length) {
    showToast("Select at least one topic first");
    return;
  }
  try {
    setBusy(btn, true, "Preparing ZIP…");
    const zip = new JSZip();
    const manifest = [];

    for (const entry of indexEntries) {
      const data = await loadTopicData(entry);
      const folder = zip.folder(entry.id);
      let i = 0;
      for (const f of data.files) {
        setBusy(btn, true, `${entry.id}: ${++i}/${data.files.length}`);
        btn.disabled = true;
        const text = await fetchRepoText(f.filePath);
        folder.file(f.fileName, text);
      }
      folder.file("_topic-info.json", JSON.stringify(data, null, 2));
      manifest.push(`${entry.id} — ${entry.title} (${data.files.length} file${data.files.length === 1 ? "" : "s"})`);
    }

    zip.file("README.txt",
      "Learning Archive export\n" +
      `Generated: ${new Date().toLocaleString()}\n\nTopics included:\n` +
      manifest.map((m) => "  • " + m).join("\n") + "\n");

    const blob = await zip.generateAsync({ type: "blob" });
    triggerBlobDownload(blob, `selected-topics-${todayStamp()}.zip`);
    showToast(`Downloaded ${indexEntries.length} topic${indexEntries.length === 1 ? "" : "s"} as ZIP`, "success");
  } catch (err) {
    showToast("ZIP failed: " + err.message, "error");
  } finally {
    setBusy(btn, false);
  }
}
