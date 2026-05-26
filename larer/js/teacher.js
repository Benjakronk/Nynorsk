/* Teacher dashboard — load student backups, show progress and answers. */

const students = []; // [{name, fileName, data}]
let activeIndex = -1; // -1 = cohort overview

const cohortState = {
  query: "",
  classFilter: "",
  statusFilter: "", // "", "untouched", "started", "completed"
  sortKey: "className",
  sortDir: 1, // 1 asc, -1 desc
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("pick-folder").addEventListener("click", pickFolder);
  document.getElementById("pick-files").addEventListener("change", e => loadFromFileInput(e.target.files));

  if (!("showDirectoryPicker" in window)) {
    const btn = document.getElementById("pick-folder");
    btn.disabled = true;
    btn.title = "Krev Chrome/Edge/Opera. Bruk «Vel filer» i staden.";
    btn.style.opacity = ".5";
  }
});

async function pickFolder() {
  try {
    const handle = await window.showDirectoryPicker();
    const files = [];
    for await (const entry of handle.values()) {
      if (entry.kind === "file" && entry.name.toLowerCase().endsWith(".json")) {
        const file = await entry.getFile();
        files.push(file);
      }
    }
    await loadFromFileList(files);
  } catch (err) {
    if (err.name !== "AbortError") {
      setStatus("Feil ved opning av mappe: " + err.message);
    }
  }
}

async function loadFromFileInput(fileList) {
  await loadFromFileList(Array.from(fileList || []));
}

async function loadFromFileList(files) {
  students.length = 0;
  let ok = 0, bad = 0;
  for (const f of files) {
    try {
      const text = await f.text();
      const data = JSON.parse(text);
      if (!data || typeof data !== "object" || !data.progress || !data.texts) {
        bad++;
        continue;
      }
      const info = extractIdentity(data, f.name);
      students.push({
        name: info.name,
        firstName: info.firstName,
        lastName: info.lastName,
        className: info.className,
        fileName: f.name,
        data,
      });
      ok++;
    } catch (e) {
      bad++;
    }
  }
  students.sort((a, b) => {
    const c = (a.className || "").localeCompare(b.className || "", "nn");
    if (c !== 0) return c;
    const l = (a.lastName || "").localeCompare(b.lastName || "", "nn");
    if (l !== 0) return l;
    return (a.firstName || "").localeCompare(b.firstName || "", "nn");
  });
  setStatus(`${ok} ${ok === 1 ? "elev" : "elevar"} lasta inn${bad ? ` (${bad} fil${bad === 1 ? "" : "er"} feila eller var ikkje rett format)` : ""}.`);
  renderSidebar();
  if (students.length > 0) {
    showCohort();
  }
}

function titleCase(s) {
  return (s || "")
    .split(/[\s-]+/)
    .filter(Boolean)
    .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join(" ");
}

function extractIdentity(data, fileName) {
  // Prefer identity stored in the backup itself
  const id = data.meta && data.meta.identity;
  if (id && (id.firstName || id.lastName)) {
    const firstName = id.firstName || "";
    const lastName = id.lastName || "";
    const className = id.className || "";
    const name = [lastName, firstName].filter(Boolean).join(", ") || titleCase(fileName.replace(/\.json$/i, ""));
    return { firstName, lastName, className, name };
  }
  // Fall back to parsing "klasse_etternavn_fornavn" filename
  const stem = fileName.replace(/\.json$/i, "");
  const parts = stem.split(/[_]+/).filter(Boolean);
  if (parts.length >= 3) {
    const [className, lastName, ...rest] = parts;
    const firstName = rest.join(" ");
    return {
      firstName: titleCase(firstName),
      lastName: titleCase(lastName),
      className: className.toUpperCase(),
      name: titleCase(lastName) + ", " + titleCase(firstName),
    };
  }
  // Last resort: just clean up the filename
  return {
    firstName: "",
    lastName: "",
    className: "",
    name: titleCase(stem.replace(/[-_]+/g, " ")),
  };
}

function setStatus(msg) {
  document.getElementById("loader-status").textContent = msg;
}

/* ---------- Sidebar ---------- */

function renderSidebar() {
  const wrap = document.getElementById("student-list");
  if (students.length === 0) {
    wrap.innerHTML = `<p class="muted small">Ingen elevar lasta inn enno.</p>`;
    return;
  }
  const totalModules = Modules.all().length;

  let html = `
    <h3>Elevar (${students.length})</h3>
    <input class="search" id="student-search" placeholder="Søk etter namn …" />
    <div class="student-item ${activeIndex === -1 ? "active" : ""}" data-idx="-1">
      <div class="name">Klasseoversikt</div>
      <div class="meta"><span>Heile klassa</span><span>${students.length} elevar</span></div>
    </div>
  `;
  let currentClass = null;
  students.forEach((s, i) => {
    const stats = computeStudentStats(s.data);
    const pct = totalModules > 0 ? (stats.completedModules / totalModules) * 100 : 0;
    if (s.className && s.className !== currentClass) {
      currentClass = s.className;
      html += `<div class="class-header">${escapeHtml(currentClass)}</div>`;
    }
    html += `
      <div class="student-item ${activeIndex === i ? "active" : ""}" data-idx="${i}">
        <div class="name">${escapeHtml(s.name)}</div>
        <div class="meta">
          <span>${stats.completedModules}/${totalModules} modular</span>
          <span>${stats.correct} rette</span>
        </div>
        <div class="bar"><span style="width:${pct.toFixed(0)}%"></span></div>
      </div>
    `;
  });
  wrap.innerHTML = html;

  wrap.querySelectorAll(".student-item").forEach(el => {
    el.addEventListener("click", () => {
      const idx = parseInt(el.dataset.idx, 10);
      activeIndex = idx;
      renderSidebar();
      if (idx === -1) showCohort();
      else showStudent(idx);
    });
  });

  const search = document.getElementById("student-search");
  if (search) {
    search.addEventListener("input", e => {
      const q = e.target.value.toLowerCase().trim();
      wrap.querySelectorAll(".student-item").forEach(el => {
        const idx = parseInt(el.dataset.idx, 10);
        if (idx === -1) return;
        const name = students[idx].name.toLowerCase();
        el.style.display = !q || name.includes(q) ? "" : "none";
      });
    });
  }
}

/* ---------- Stats ---------- */

function computeStudentStats(data) {
  let completedModules = 0;
  let correct = 0;
  let attempted = 0;
  let textCount = 0;
  let textWords = 0;

  for (const mod of Modules.all()) {
    const modProg = data.progress[mod.id];
    const modTexts = data.texts[mod.id] || {};
    if (modProg && modProg.completed) completedModules++;
    if (modProg && modProg.sections) {
      for (const sec of Object.values(modProg.sections)) {
        attempted++;
        if (sec.correct === true) correct++;
      }
    }
    for (const t of Object.values(modTexts)) {
      if (t && t.value && t.value.trim()) {
        textCount++;
        textWords += t.value.trim().split(/\s+/).length;
      }
    }
  }
  return { completedModules, correct, attempted, textCount, textWords };
}

/* ---------- Cohort overview ---------- */

function statusOf(st, totalModules) {
  if (st.attempted === 0 && st.textCount === 0) return "untouched";
  if (st.completedModules >= totalModules && totalModules > 0) return "completed";
  return "started";
}

function showCohort() {
  const pane = document.getElementById("main-pane");
  const totalModules = Modules.all().length;
  const classes = Array.from(new Set(students.map(s => s.className).filter(Boolean))).sort((a, b) => a.localeCompare(b, "nn"));

  pane.innerHTML = `
    <div class="cohort-overview">
      <h1>Klasseoversikt</h1>
      <p class="subtitle">${students.length} elevar · ${classes.length} ${classes.length === 1 ? "klasse" : "klassar"} · ${totalModules} modular totalt</p>

      <div class="cohort-controls">
        <input type="search" class="search cohort-search" id="cohort-search" placeholder="Søk etter namn …" value="${escapeAttr(cohortState.query)}" />
        <label class="filter-group">
          <span>Klasse</span>
          <select id="cohort-class">
            <option value="">Alle</option>
            ${classes.map(c => `<option value="${escapeAttr(c)}" ${cohortState.classFilter === c ? "selected" : ""}>${escapeHtml(c)}</option>`).join("")}
          </select>
        </label>
        <label class="filter-group">
          <span>Status</span>
          <select id="cohort-status">
            <option value="" ${cohortState.statusFilter === "" ? "selected" : ""}>Alle</option>
            <option value="untouched" ${cohortState.statusFilter === "untouched" ? "selected" : ""}>Ikkje byrja</option>
            <option value="started" ${cohortState.statusFilter === "started" ? "selected" : ""}>I gang</option>
            <option value="completed" ${cohortState.statusFilter === "completed" ? "selected" : ""}>Fullført</option>
          </select>
        </label>
        <button class="btn secondary small" id="cohort-reset">Nullstill filter</button>
      </div>

      <div class="cohort-count" id="cohort-count"></div>

      <table>
        <thead>
          <tr>
            ${sortableTh("className", "Klasse")}
            ${sortableTh("name", "Elev (etternamn, fornamn)")}
            ${sortableTh("completedModules", "Fullførte modular")}
            ${sortableTh("correct", "Rette svar")}
            ${sortableTh("attempted", "Oppgåver gjort")}
            ${sortableTh("textCount", "Tekstar")}
            ${sortableTh("textWords", "Ord skrivne")}
          </tr>
        </thead>
        <tbody id="cohort-tbody"></tbody>
      </table>
    </div>
  `;

  document.getElementById("cohort-search").addEventListener("input", e => {
    cohortState.query = e.target.value;
    renderCohortRows();
  });
  document.getElementById("cohort-class").addEventListener("change", e => {
    cohortState.classFilter = e.target.value;
    renderCohortRows();
  });
  document.getElementById("cohort-status").addEventListener("change", e => {
    cohortState.statusFilter = e.target.value;
    renderCohortRows();
  });
  document.getElementById("cohort-reset").addEventListener("click", () => {
    cohortState.query = "";
    cohortState.classFilter = "";
    cohortState.statusFilter = "";
    showCohort();
  });
  pane.querySelectorAll("th.sortable").forEach(th => {
    th.addEventListener("click", () => {
      const key = th.dataset.key;
      if (cohortState.sortKey === key) {
        cohortState.sortDir = -cohortState.sortDir;
      } else {
        cohortState.sortKey = key;
        cohortState.sortDir = 1;
      }
      showCohort();
    });
  });

  renderCohortRows();
}

function sortableTh(key, label) {
  const active = cohortState.sortKey === key;
  const arrow = active ? (cohortState.sortDir > 0 ? " ↑" : " ↓") : "";
  return `<th class="sortable${active ? " active" : ""}" data-key="${key}">${escapeHtml(label)}${arrow}</th>`;
}

function renderCohortRows() {
  const tbody = document.getElementById("cohort-tbody");
  const count = document.getElementById("cohort-count");
  if (!tbody) return;
  const totalModules = Modules.all().length;

  const rows = students
    .map((s, i) => ({ s, i, st: computeStudentStats(s.data) }))
    .filter(r => filterStudent(r.s, r.st, totalModules));

  rows.sort((a, b) => {
    const key = cohortState.sortKey;
    let av, bv;
    if (key === "name") { av = (a.s.lastName + " " + a.s.firstName).toLowerCase(); bv = (b.s.lastName + " " + b.s.firstName).toLowerCase(); }
    else if (key === "className") { av = (a.s.className || "").toLowerCase(); bv = (b.s.className || "").toLowerCase(); }
    else { av = a.st[key]; bv = b.st[key]; }
    if (av < bv) return -1 * cohortState.sortDir;
    if (av > bv) return 1 * cohortState.sortDir;
    // Tiebreaker: by name asc
    const an = (a.s.lastName + " " + a.s.firstName).toLowerCase();
    const bn = (b.s.lastName + " " + b.s.firstName).toLowerCase();
    return an.localeCompare(bn, "nn");
  });

  if (rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7"><em>Ingen elevar passar filtra.</em></td></tr>`;
  } else {
    tbody.innerHTML = rows.map(r => {
      const pct = totalModules > 0 ? (r.st.completedModules / totalModules) * 100 : 0;
      return `
        <tr class="clickable" data-idx="${r.i}">
          <td>${escapeHtml(r.s.className || "—")}</td>
          <td><strong>${escapeHtml(r.s.name)}</strong></td>
          <td><span class="mini-bar"><span style="width:${pct.toFixed(0)}%"></span></span>${r.st.completedModules}/${totalModules}</td>
          <td class="num">${r.st.correct}</td>
          <td class="num">${r.st.attempted}</td>
          <td class="num">${r.st.textCount}</td>
          <td class="num">${r.st.textWords}</td>
        </tr>
      `;
    }).join("");
    tbody.querySelectorAll("tr.clickable").forEach(tr => {
      tr.addEventListener("click", () => {
        activeIndex = parseInt(tr.dataset.idx, 10);
        renderSidebar();
        showStudent(activeIndex);
      });
    });
  }

  if (count) {
    count.textContent = rows.length === students.length
      ? `Syner alle ${students.length} elevar`
      : `Syner ${rows.length} av ${students.length} elevar`;
  }
}

function filterStudent(s, st, totalModules) {
  if (cohortState.query) {
    const q = cohortState.query.toLowerCase().trim();
    const hay = [s.firstName, s.lastName, s.className, s.name].join(" ").toLowerCase();
    if (!hay.includes(q)) return false;
  }
  if (cohortState.classFilter && s.className !== cohortState.classFilter) return false;
  if (cohortState.statusFilter) {
    if (statusOf(st, totalModules) !== cohortState.statusFilter) return false;
  }
  return true;
}

function escapeAttr(s) {
  return escapeHtml(s);
}

/* ---------- Student detail ---------- */

function showStudent(idx) {
  const s = students[idx];
  if (!s) return;
  const pane = document.getElementById("main-pane");
  const st = computeStudentStats(s.data);
  const totalModules = Modules.all().length;

  let html = `
    <div class="student-detail">
      <h1>${escapeHtml([s.firstName, s.lastName].filter(Boolean).join(" ") || s.name)}</h1>
      <p class="subtitle">${s.className ? `Klasse <strong>${escapeHtml(s.className)}</strong> · ` : ""}Frå fila <code>${escapeHtml(s.fileName)}</code></p>

      <div class="metrics">
        <div class="metric"><div class="label">Fullførte modular</div><div class="value">${st.completedModules}/${totalModules}</div></div>
        <div class="metric"><div class="label">Rette svar</div><div class="value">${st.correct}</div></div>
        <div class="metric"><div class="label">Oppgåver prøvde</div><div class="value">${st.attempted}</div></div>
        <div class="metric"><div class="label">Tekstar</div><div class="value">${st.textCount}</div></div>
        <div class="metric"><div class="label">Ord skrivne</div><div class="value">${st.textWords}</div></div>
      </div>
  `;

  for (let part = 1; part <= 4; part++) {
    const mods = Modules.byPart(part);
    if (mods.length === 0) continue;
    const partName = ["", "Del 1 · Språkhistorie og debatt", "Del 2 · Grammatikk og skriveregler", "Del 3 · Skriving og tekstarbeid", "Del 4 · Lesing og tekstforståing"][part];
    html += `<div class="part-group"><h2>${escapeHtml(partName)}</h2>`;
    mods.forEach(mod => {
      html += renderModuleBlock(mod, s.data);
    });
    html += `</div>`;
  }

  html += `</div>`;
  pane.innerHTML = html;
}

function renderModuleBlock(mod, data) {
  const modProg = data.progress[mod.id] || { sections: {}, completed: false };
  const modTexts = data.texts[mod.id] || {};
  const gradable = mod.sections.filter(s => s.type === "exercise" || s.type === "reading");
  let done = 0, right = 0;

  gradable.forEach(s => {
    if (s.type === "exercise" && s.exerciseType === "freeText") {
      const t = modTexts[s.id];
      if (t && t.value && t.value.trim()) done++;
    } else {
      const rec = modProg.sections[s.id];
      if (rec) {
        done++;
        if (rec.correct === true) right++;
      }
    }
  });

  let statusTag;
  if (done === 0) {
    statusTag = `<span class="untouched">Ikkje opna</span>`;
  } else if (modProg.completed || done === gradable.length) {
    statusTag = `<span class="done-tag">Fullført</span>`;
  } else {
    statusTag = `<span class="partial-tag">${done}/${gradable.length}</span>`;
  }

  const open = done > 0 && done < gradable.length;

  const bodyRows = mod.sections
    .filter(s => s.type === "exercise" || s.type === "reading")
    .map(s => renderSectionRow(mod, s, modProg, modTexts))
    .join("");

  return `
    <details class="mod-block"${open ? " open" : ""}>
      <summary>
        <span class="mod-title">${escapeHtml(mod.title)}</span>
        <span class="mod-status">
          <span>${right}/${gradable.length} rett</span>
          ${statusTag}
        </span>
      </summary>
      ${done > 0 ? `<div class="mod-body">${bodyRows}</div>` : ""}
    </details>
  `;
}

function renderSectionRow(mod, section, modProg, modTexts) {
  if (section.type === "exercise" && section.exerciseType === "freeText") {
    return renderFreeText(section, modTexts);
  }
  if (section.type === "reading") {
    return renderReadingResult(section, modProg);
  }
  return renderExerciseResult(section, modProg);
}

function renderExerciseResult(section, modProg) {
  const rec = (modProg.sections || {})[section.id];
  if (!rec) {
    return `
      <div class="q-row">
        <div class="q-head">
          <div class="q-mark untouched">·</div>
          <div class="q-text">
            <div class="q-prompt">${promptText(section)}</div>
            <div class="q-attempts">Ikkje prøvd.</div>
          </div>
        </div>
      </div>
    `;
  }

  const mark = rec.correct ? "right" : "wrong";
  const markChar = rec.correct ? "✓" : "✗";
  const ans = formatAnswer(section, rec.answer);
  const corr = formatCorrect(section);

  return `
    <div class="q-row">
      <div class="q-head">
        <div class="q-mark ${mark}">${markChar}</div>
        <div class="q-text">
          <div class="q-prompt">${promptText(section)}</div>
          <div class="q-answer ${mark}">
            <span class="label">Svar:</span><span class="val">${ans}</span>
          </div>
          ${!rec.correct ? `<div class="q-correct"><strong>Fasit:</strong> ${corr}</div>` : ""}
          <div class="q-attempts">${rec.attempts || 1} forsøk · ${formatDate(rec.updated)}</div>
        </div>
      </div>
    </div>
  `;
}

function renderReadingResult(section, modProg) {
  const rec = (modProg.sections || {})[section.id];
  if (!rec) {
    return `
      <div class="q-row">
        <div class="q-head">
          <div class="q-mark untouched">·</div>
          <div class="q-text">
            <div class="q-prompt"><strong>Les og svar:</strong> ${escapeHtml(section.title || "")}</div>
            <div class="q-attempts">Ikkje prøvd.</div>
          </div>
        </div>
      </div>
    `;
  }
  const answers = rec.answer || [];
  let inner = `<div class="q-prompt"><strong>Les og svar:</strong> ${escapeHtml(section.title || "")}</div>`;
  section.questions.forEach((q, i) => {
    const ans = answers[i];
    if (q.type === "multipleChoice") {
      const correct = ans === q.correct;
      inner += `
        <div class="q-row" style="border:none;padding:6px 0 0;">
          <div class="q-head">
            <div class="q-mark ${ans === undefined || ans === -1 ? "untouched" : (correct ? "right" : "wrong")}">${ans === undefined || ans === -1 ? "·" : (correct ? "✓" : "✗")}</div>
            <div class="q-text">
              <div class="q-prompt">${escapeHtml(stripHtml(q.question))}</div>
              <div class="q-answer ${correct ? "right" : "wrong"}">
                <span class="label">Svar:</span><span class="val">${ans !== undefined && ans >= 0 ? escapeHtml(stripHtml(q.options[ans])) : "<em>ikkje svart</em>"}</span>
              </div>
              ${!correct ? `<div class="q-correct"><strong>Fasit:</strong> ${escapeHtml(stripHtml(q.options[q.correct]))}</div>` : ""}
            </div>
          </div>
        </div>
      `;
    } else if (q.type === "freeShort") {
      const val = (ans || "").trim();
      inner += `
        <div class="q-row" style="border:none;padding:6px 0 0;">
          <div class="q-head">
            <div class="q-mark ${val ? "text" : "untouched"}">${val ? "✎" : "·"}</div>
            <div class="q-text">
              <div class="q-prompt">${escapeHtml(stripHtml(q.question))}</div>
              ${val ? `<div class="text-block">${escapeHtml(val)}</div>` : `<div class="q-attempts">Ikkje svart.</div>`}
              ${q.modelAnswer ? `<div class="q-correct"><strong>Døme på svar:</strong> ${escapeHtml(stripHtml(q.modelAnswer))}</div>` : ""}
            </div>
          </div>
        </div>
      `;
    }
  });
  inner += `<div class="q-attempts">${rec.attempts || 1} forsøk · ${formatDate(rec.updated)}</div>`;
  return `<div class="q-row">${inner}</div>`;
}

function renderFreeText(section, modTexts) {
  const t = modTexts[section.id];
  const val = t && t.value ? t.value : "";
  if (!val.trim()) {
    return `
      <div class="q-row">
        <div class="q-head">
          <div class="q-mark untouched">·</div>
          <div class="q-text">
            <div class="q-prompt"><strong>Skriv:</strong> ${escapeHtml(stripHtml(section.question || section.title || ""))}</div>
            <div class="q-attempts">Ingen tekst lagra.</div>
          </div>
        </div>
      </div>
    `;
  }
  const words = val.trim().split(/\s+/).length;
  return `
    <div class="q-row">
      <div class="q-head">
        <div class="q-mark text">✎</div>
        <div class="q-text">
          <div class="q-prompt"><strong>Skriv:</strong> ${escapeHtml(stripHtml(section.question || section.title || ""))}</div>
          <div class="text-block">${escapeHtml(val)}</div>
          <div class="text-meta">
            <span>${words} ord${section.minWords ? ` (mål: minst ${section.minWords})` : ""}</span>
            <span>Sist endra: ${formatDate(t.updated)}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ---------- Answer formatting ---------- */

function promptText(section) {
  const t = section.exerciseType;
  if (t === "multipleChoice") return escapeHtml(stripHtml(section.question || ""));
  if (t === "fillIn") return `<strong>Fyll inn:</strong> ${escapeHtml(stripHtml(section.question || ""))}`;
  if (t === "translate") return `<strong>Set om:</strong> «${escapeHtml(section.source)}»`;
  if (t === "matching") return `<strong>Para saman:</strong> ${escapeHtml(stripHtml(section.question || ""))}`;
  if (t === "categorize") return `<strong>Sorter:</strong> ${escapeHtml(stripHtml(section.question || ""))}`;
  return escapeHtml(stripHtml(section.question || ""));
}

function formatAnswer(section, answer) {
  const t = section.exerciseType;
  if (answer === undefined || answer === null) return "<em>ikkje svart</em>";
  if (t === "multipleChoice") {
    if (answer < 0 || answer >= section.options.length) return "<em>ikkje svart</em>";
    return escapeHtml(stripHtml(section.options[answer]));
  }
  if (t === "fillIn") {
    if (!Array.isArray(answer)) return escapeHtml(String(answer));
    return answer.map(a => `<code>${escapeHtml(a || "")}</code>`).join(", ");
  }
  if (t === "translate") {
    return `«${escapeHtml(answer)}»`;
  }
  if (t === "matching") {
    if (typeof answer !== "object") return escapeHtml(String(answer));
    return Object.entries(answer).map(([k, v]) => `${escapeHtml(k)} → ${escapeHtml(v || "—")}`).join("; ");
  }
  if (t === "categorize") {
    if (typeof answer !== "object") return escapeHtml(String(answer));
    return Object.entries(answer).map(([k, v]) => `${escapeHtml(k)} → ${escapeHtml(v || "—")}`).join("; ");
  }
  return escapeHtml(String(answer));
}

function formatCorrect(section) {
  const t = section.exerciseType;
  if (t === "multipleChoice") {
    return escapeHtml(stripHtml(section.options[section.correct]));
  }
  if (t === "fillIn") {
    return section.items.map(it => `<code>${escapeHtml(it.accept[0])}</code>`).join(", ");
  }
  if (t === "translate") {
    return section.accept.map(a => `«${escapeHtml(a)}»`).join(" eller ");
  }
  if (t === "matching") {
    return section.pairs.map(([l, r]) => `${escapeHtml(l)} → ${escapeHtml(r)}`).join("; ");
  }
  if (t === "categorize") {
    return Object.entries(section.categories).map(([cat, items]) => `${escapeHtml(cat)}: ${items.map(escapeHtml).join(", ")}`).join(" | ");
  }
  return "";
}

function stripHtml(s) {
  return String(s || "").replace(/<[^>]+>/g, "");
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function formatDate(iso) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleString("nn-NO", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return iso;
  }
}
