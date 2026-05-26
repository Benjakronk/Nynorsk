/* Module page: load module by ?id=, render sections, handle progress bar. */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const root = document.getElementById("module-root");
  const mod = id ? Modules.get(id) : null;

  if (!mod) {
    root.innerHTML = `
      <h1>Fann ikkje modulen</h1>
      <p>Sjekk lenkja eller gå <a href="index.html">tilbake til oversikta</a>.</p>
    `;
    return;
  }

  document.title = `${mod.title} · Nynorskkurs`;

  // Header
  const part = ["", "Del 1 · Språkhistorie", "Del 2 · Grammatikk", "Del 3 · Skriving", "Del 4 · Lesing"][mod.part] || "";
  const header = document.createElement("div");
  header.innerHTML = `
    <div class="crumbs">${escapeHtml(part)}</div>
    <h1>${escapeHtml(mod.title)}</h1>
    <p class="summary">${escapeHtml(mod.summary)}</p>
  `;
  root.appendChild(header);

  // Progress bar at top
  const progressWrap = document.createElement("div");
  progressWrap.className = "module-progress";
  progressWrap.innerHTML = `
    <span class="label">Framdrift</span>
    <div class="bar"><span style="width:0%"></span></div>
    <span class="ratio">0 / 0</span>
  `;
  root.appendChild(progressWrap);

  // Sections
  mod.sections.forEach(section => {
    const card = document.createElement("section");
    card.className = "section " + (section.type === "lesson" ? "lesson" : "exercise-wrap");
    if (section.title) {
      card.appendChild(headingEl(section));
    }
    const body = Exercises.render(section, mod.id);
    card.appendChild(body);
    root.appendChild(card);
  });

  // Bottom nav
  const nav = document.createElement("div");
  nav.className = "module-nav";
  const all = Modules.byPart(mod.part);
  const idx = all.findIndex(m => m.id === mod.id);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;
  nav.innerHTML = `
    <div>${prev ? `<a class="btn secondary" href="modul.html?id=${encodeURIComponent(prev.id)}">← ${escapeHtml(prev.title)}</a>` : ""}</div>
    <div><a class="btn secondary" href="index.html">Til oversikta</a></div>
    <div>${next ? `<a class="btn" href="modul.html?id=${encodeURIComponent(next.id)}">${escapeHtml(next.title)} →</a>` : ""}</div>
  `;
  root.appendChild(nav);

  updateProgress(mod, progressWrap);
  document.addEventListener("exercise-answered", () => updateProgress(mod, progressWrap));
});

function headingEl(section) {
  const h = document.createElement("h2");
  h.textContent = section.title;
  return h;
}

function updateProgress(mod, wrap) {
  const modProg = Store.getModule(mod.id);
  const all = Store.getAll();
  const total = mod.sections.filter(s => s.type === "exercise" || s.type === "reading").length;
  let done = 0;
  mod.sections.forEach(s => {
    if (s.type === "exercise") {
      if (s.exerciseType === "freeText") {
        const t = (all.texts[mod.id] || {})[s.id];
        if (t && t.value && t.value.trim()) done++;
      } else if ((modProg.sections || {})[s.id]) done++;
    } else if (s.type === "reading") {
      if ((modProg.sections || {})[s.id]) done++;
    }
  });
  const pct = total > 0 ? (done / total) * 100 : 0;
  wrap.querySelector(".bar > span").style.width = pct.toFixed(0) + "%";
  wrap.querySelector(".ratio").textContent = `${done} / ${total}`;
  const fullyDone = Modules.isModuleFullyDone(mod, modProg, all.texts);
  if (fullyDone && !modProg.completed) {
    Store.setCompleted(mod.id, true);
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}
