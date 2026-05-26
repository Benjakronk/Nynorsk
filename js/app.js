/* Home page: render module grid, hero stats, data menu. */

document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  renderParts();
  wireDataMenu();
});

function renderStats() {
  const t = Store.totals();
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set("stat-done", t.completed);
  set("stat-correct", t.correct);
  set("stat-texts", t.texts);
}

function renderParts() {
  document.querySelectorAll(".modules").forEach(container => {
    const part = parseInt(container.dataset.part, 10);
    const mods = Modules.byPart(part);
    container.innerHTML = "";
    mods.forEach((mod, idx) => {
      container.appendChild(renderModuleCard(mod, idx + 1));
    });
  });
}

function renderModuleCard(mod, indexInPart) {
  const stats = Store.moduleStats(mod.id);
  const totalGradable = Modules.exerciseCount(mod);
  const ratio = totalGradable > 0 ? Math.min(1, stats.done / totalGradable) : 0;

  const a = document.createElement("a");
  a.href = `modul.html?id=${encodeURIComponent(mod.id)}`;
  a.className = "mod-card" + (stats.completed ? " done" : "");

  a.innerHTML = `
    <div class="mod-no">Modul ${mod.part}.${indexInPart}</div>
    <h3>${escapeHtml(mod.title)}</h3>
    <p>${escapeHtml(mod.summary)}</p>
    <div class="mod-meta">
      <span>≈ ${mod.estimatedMinutes} min</span>
      <span>${stats.done}/${totalGradable} oppgåver</span>
    </div>
    <div class="progress" aria-hidden="true"><span style="width:${(ratio * 100).toFixed(0)}%"></span></div>
    ${stats.completed ? `<div class="badge">Fullført</div>` : ""}
  `;
  return a;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function slugify(s) {
  return (s || "")
    .replace(/æ/gi, "ae").replace(/ø/gi, "o").replace(/å/gi, "a")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function openExportModal() {
  const modal = document.getElementById("export-modal");
  const id = Store.getIdentity() || {};
  document.getElementById("ef-firstname").value = id.firstName || "";
  document.getElementById("ef-lastname").value = id.lastName || "";
  document.getElementById("ef-class").value = id.className || "";
  modal.hidden = false;
  setTimeout(() => {
    const first = document.getElementById("ef-firstname");
    if (!first.value) first.focus();
    else document.getElementById("ef-class").focus();
  }, 0);
}

function closeExportModal() {
  document.getElementById("export-modal").hidden = true;
}

function wireExportModal() {
  const modal = document.getElementById("export-modal");
  if (!modal) return;
  modal.querySelector(".modal-backdrop").addEventListener("click", closeExportModal);
  document.getElementById("ef-cancel").addEventListener("click", closeExportModal);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !modal.hidden) closeExportModal();
  });
  document.getElementById("export-form").addEventListener("submit", e => {
    e.preventDefault();
    const firstName = document.getElementById("ef-firstname").value.trim();
    const lastName = document.getElementById("ef-lastname").value.trim();
    const className = document.getElementById("ef-class").value.trim();
    if (!firstName || !lastName || !className) return;

    Store.setIdentity({ firstName, lastName, className });

    const fileName = [
      slugify(className),
      slugify(lastName),
      slugify(firstName),
    ].filter(Boolean).join("_") + ".json";

    const blob = new Blob([Store.exportJSON()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    closeExportModal();
  });
}

function wireDataMenu() {
  const btn = document.getElementById("data-menu-btn");
  const menu = document.getElementById("data-menu");
  if (!btn || !menu) return;
  btn.addEventListener("click", e => {
    e.stopPropagation();
    menu.hidden = !menu.hidden;
  });
  document.addEventListener("click", e => {
    if (!menu.hidden && !menu.contains(e.target) && e.target !== btn) menu.hidden = true;
  });

  document.getElementById("export-btn").addEventListener("click", () => {
    menu.hidden = true;
    openExportModal();
  });

  document.getElementById("import-input").addEventListener("change", async e => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      Store.importJSON(text);
      alert("Backup lasta inn. Sida blir oppdatert.");
      location.reload();
    } catch (err) {
      alert("Klarte ikkje å lese fila: " + err.message);
    }
  });

  wireExportModal();

  document.getElementById("reset-btn").addEventListener("click", () => {
    if (confirm("Er du heilt sikker? All framdrift og alle tekstar blir sletta. Det kan ikkje angrast (med mindre du har lasta ned ein backup).")) {
      Store.reset();
      location.reload();
    }
  });
}
