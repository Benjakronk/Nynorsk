/* Home page: render module grid, hero stats, data menu. */

document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  renderParts();
  renderPartProgress();
  wireDataMenu();
  if (typeof Spell !== "undefined") Spell.warm();
  showView();
  window.addEventListener("hashchange", () => { showView(); window.scrollTo(0, 0); });
});

function renderStats() {
  const t = Store.totals();
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set("stat-done", t.completed);
  set("stat-correct", t.correct);
  set("stat-texts", t.texts);
}

// Tabs: #del-1 … #del-4 show one part; anything else shows the overview.
function showView() {
  const m = location.hash.match(/^#del-([1-5])$/);
  const view = m ? `del-${m[1]}` : "oversikt";
  document.querySelectorAll(".view").forEach(el => { el.hidden = el.dataset.view !== view; });
  setActiveTab(view);
}

function renderPartProgress() {
  document.querySelectorAll(".part-card").forEach(card => {
    const mods = Modules.orderedByPart(parseInt(card.dataset.part, 10));
    const done = mods.filter(mod => Store.moduleStats(mod.id).completed).length;
    const ratio = mods.length ? done / mods.length : 0;
    card.querySelector(".part-progress").innerHTML = `
      <div class="mod-meta"><span>${mods.length} modular</span><span>${done} fullførte</span></div>
      <div class="progress" aria-hidden="true"><span style="width:${(ratio * 100).toFixed(0)}%"></span></div>
    `;
  });
}

function renderParts() {
  document.querySelectorAll(".modules").forEach(container => {
    const part = parseInt(container.dataset.part, 10);
    const groups = Modules.groupsFor(part);
    container.innerHTML = "";
    let counter = 0;

    if (groups.length === 1 && !groups[0].group) {
      container.classList.remove("grouped");
      groups[0].modules.forEach(mod => container.appendChild(renderModuleCard(mod, ++counter)));
      return;
    }

    // Part with named groups: heading + blurb + its own grid per group.
    container.classList.add("grouped");
    groups.forEach(({ group, modules }) => {
      const head = document.createElement("h3");
      head.className = "group-head";
      head.id = `group-${part}-${group.id}`;
      head.textContent = group.title;
      container.appendChild(head);
      if (group.blurb) {
        const blurb = document.createElement("p");
        blurb.className = "group-blurb";
        blurb.textContent = group.blurb;
        container.appendChild(blurb);
      }
      const grid = document.createElement("div");
      grid.className = "modules-grid";
      modules.forEach(mod => grid.appendChild(renderModuleCard(mod, ++counter)));
      container.appendChild(grid);
    });
  });
}

function renderModuleCard(mod, indexInPart) {
  const stats = Store.moduleStats(mod.id);
  const totalGradable = Modules.exerciseCount(mod);
  const ratio = totalGradable > 0 ? Math.min(1, stats.done / totalGradable) : 0;

  const a = document.createElement("a");
  a.href = mod.href || `modul.html?id=${encodeURIComponent(mod.id)}`;
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

function setActiveTab(key) {
  document.querySelectorAll(".tabs a").forEach(a => {
    const on = a.dataset.tab === key;
    a.classList.toggle("active", on);
    if (on) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
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

  document.getElementById("reset-btn").addEventListener("click", () => {
    if (confirm("Er du heilt sikker? All framdrift og alle tekstar blir sletta. Det kan ikkje angrast.")) {
      Store.reset();
      location.reload();
    }
  });
}
