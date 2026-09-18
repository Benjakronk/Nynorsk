#!/usr/bin/env node
/* Validerer alt innhald i kurset utan nettlesar.
   Køyr:  node tools/validate-content.js
   Avsluttar med kode 1 om noko er gale. Åtvaringar stoppar ikkje køyringa. */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const CONTENT_FILES = [
  "js/content/part1.js",
  "js/content/part2-omgrep.js",
  "js/content/part2.js",
  "js/content/part2-trening.js",
  "js/content/part3.js",
  "js/content/part4.js",
  "js/content/part4-feil.js",
  "js/content/part4-rettelesing.js",
  "js/content/part5.js",
];

const errors = [];
const warnings = [];
function err(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

/* ---------- Load the same code the browser runs ---------- */
const sandbox = { console, module: { exports: {} }, exports: {} };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

function runFile(rel) {
  const full = path.join(ROOT, rel);
  if (!fs.existsSync(full)) { err(`Fila finst ikkje: ${rel}`); return false; }
  const code = fs.readFileSync(full, "utf8");
  try {
    vm.runInContext(code, sandbox, { filename: rel });
    return true;
  } catch (e) {
    err(`Syntaks-/køyrefeil i ${rel}: ${e.message}`);
    return false;
  }
}

runFile("js/modules.js");
runFile("js/content/bank.js");
runFile("js/drills.js");
CONTENT_FILES.forEach(runFile);

// Top-level const/let in the loaded files live in the context's lexical scope,
// not on the sandbox object, so pull them out with a tiny expression.
let Modules, Bank, Drills;
try {
  ({ Modules, Bank, Drills } = vm.runInContext("({ Modules, Bank, Drills })", sandbox));
} catch (e) {
  err(`Klarte ikkje hente Modules/Bank/Drills: ${e.message}`);
}
if (!Modules || !Bank || !Drills) {
  console.error("Kunne ikkje laste grunnfilene:\n" + errors.map(e => "  ✗ " + e).join("\n"));
  process.exit(1);
}

/* ---------- Script tags in the two HTML pages ---------- */
function checkScriptTags(htmlRel, prefix) {
  const html = fs.readFileSync(path.join(ROOT, htmlRel), "utf8");
  CONTENT_FILES.forEach(f => {
    if (!html.includes(`src="${prefix}${f}"`)) err(`${htmlRel} manglar <script src="${prefix}${f}">`);
  });
}
checkScriptTags("index.html", "");
checkScriptTags("modul.html", "");
{
  const html = fs.readFileSync(path.join(ROOT, "modul.html"), "utf8");
  const order = ["js/content/bank.js", "js/drills.js", "js/exercises.js", "js/modul.js"].map(f => html.indexOf(`src="${f}"`));
  if (order.some(i => i < 0) || order.some((v, i, a) => i > 0 && v < a[i - 1])) err("modul.html: bank.js, drills.js, exercises.js og modul.js må lastast i den rekkjefølgja");
}

/* ---------- Bank shape ---------- */
const GENDERS = ["m", "f", "n"];
const CLASSES = ["a", "e", "j", "kort", "sterk", "u"];
(Bank.nouns || []).forEach(n => {
  if (!n.w || !GENDERS.includes(n.g) || !Array.isArray(n.f) || n.f.length !== 4) err(`Bank.nouns «${n.w}»: treng w, g ∈ m/f/n og f med 4 former`);
  if (n.bm && n.bm.includes("|")) err(`Bank.nouns «${n.w}»: bm kan ikkje ha |`);
});
(Bank.verbs || []).forEach(v => {
  if (!v.inf || !CLASSES.includes(v.cls) || !Array.isArray(v.f) || v.f.length !== 3) err(`Bank.verbs «${v.inf}»: treng inf, cls ∈ ${CLASSES.join("/")} og f med 3 former`);
  if (v.bm && v.bm.includes("|")) err(`Bank.verbs «${v.inf}»: bm kan ikkje ha |`);
});
(Bank.adjectives || []).forEach(a => {
  if (!a.w || !a.f || !a.f.n || !a.f.pl || !a.f.komp || !a.f.sup) err(`Bank.adjectives «${a.w}»: treng w og f.{n, pl, komp, sup}`);
});
(Bank.words || []).forEach(w => {
  if (!w.bm || !w.nn) err(`Bank.words: treng bm og nn (${JSON.stringify(w)})`);
  if (w.bm && w.bm.includes("|")) err(`Bank.words «${w.bm}»: bm kan ikkje ha |`);
});
Object.entries(Bank.sentences || {}).forEach(([set, list]) => {
  list.forEach((it, i) => {
    if (!it.prompt || !it.prompt.includes("___")) err(`Bank.sentences.${set}[${i}]: prompt manglar ___`);
    if (!it.accept || !it.accept.length) err(`Bank.sentences.${set}[${i}]: tomt accept`);
  });
});
{
  const seen = new Map();
  (Bank.nouns || []).forEach(n => { if (seen.has(n.w)) warn(`Bank.nouns: «${n.w}» står to gonger`); seen.set(n.w, 1); });
}

/* ---------- Modules & sections ---------- */
const all = Modules.all();
const ids = new Set();
const stats = {}; // group/part → counts

function stripTags(s) { return String(s || "").replace(/<[^>]+>/g, ""); }

all.forEach(mod => {
  const where = `Modul «${mod.id}»`;
  if (ids.has(mod.id)) err(`${where}: id er brukt to gonger`);
  ids.add(mod.id);
  ["id", "part", "title", "summary", "estimatedMinutes", "sections"].forEach(k => {
    if (mod[k] === undefined) err(`${where}: manglar feltet ${k}`);
  });
  const defs = Modules.groupDefs(mod.part);
  if (defs.length && !defs.some(g => g.id === mod.group)) err(`${where}: manglar gyldig group (Del ${mod.part} har gruppene ${defs.map(g => g.id).join(", ")})`);

  const key = defs.length ? `Del ${mod.part} · ${mod.group}` : `Del ${mod.part}`;
  const st = stats[key] || (stats[key] = { modules: 0, sections: 0, exercises: 0, drillItems: 0 });
  st.modules++;

  (mod.sections || []).forEach((s, i) => {
    st.sections++;
    const sw = `${where}, seksjon ${s.id || i + 1}${s.title ? ` («${s.title}»)` : ""}`;
    if (s.type === "lesson") {
      if (!s.content) err(`${sw}: lesson utan content`);
      return;
    }
    if (s.type === "reading") {
      if (!s.passage || !Array.isArray(s.questions)) err(`${sw}: reading treng passage og questions`);
      (s.questions || []).forEach((q, qi) => {
        if (q.type === "multipleChoice" && (!Array.isArray(q.options) || q.correct == null || q.correct < 0 || q.correct >= q.options.length)) err(`${sw}: spørsmål ${qi + 1} har ugyldig correct/options`);
      });
      st.exercises++;
      return;
    }
    if (s.type !== "exercise") { err(`${sw}: ukjend type «${s.type}»`); return; }
    st.exercises++;
    const t = s.exerciseType;

    if (t === "multipleChoice") {
      if (!Array.isArray(s.options) || s.options.length < 2) err(`${sw}: MC treng minst 2 options`);
      else if (typeof s.correct !== "number" || s.correct < 0 || s.correct >= s.options.length) err(`${sw}: correct (${s.correct}) er utanfor options`);
    } else if (t === "fillIn") {
      if (!Array.isArray(s.items) || !s.items.length) err(`${sw}: fillIn utan items`);
      (s.items || []).forEach((it, k) => {
        if (!it.prompt || !it.prompt.includes("___")) err(`${sw}: item ${k + 1} manglar ___`);
        if (!Array.isArray(it.accept) || !it.accept.length) err(`${sw}: item ${k + 1} har tomt accept`);
      });
    } else if (t === "translate") {
      if (!s.source) err(`${sw}: translate utan source`);
      if (!Array.isArray(s.accept) || !s.accept.length) err(`${sw}: translate har tomt accept`);
    } else if (t === "matching") {
      if (!Array.isArray(s.pairs) || s.pairs.length < 2) err(`${sw}: matching treng pairs`);
      const rights = (s.pairs || []).map(p => p[1]);
      if (new Set(rights).size !== rights.length) err(`${sw}: høgreverdiane i matching må vere unike`);
    } else if (t === "categorize") {
      const allItems = [].concat(...Object.values(s.categories || {}));
      if (allItems.length < 2) err(`${sw}: categorize utan items`);
      if (new Set(allItems).size !== allItems.length) err(`${sw}: same ord ligg i fleire kategoriar`);
    } else if (t === "freeText") {
      if (!s.question) err(`${sw}: freeText utan question`);
    } else if (t === "drill") {
      let items = [];
      try { items = Drills.build(s); } catch (e) { err(`${sw}: drill feila: ${e.message}`); }
      const per = s.perRound || 10;
      if (items.length < per) err(`${sw}: drill gir berre ${items.length} oppgåver, men perRound er ${per}`);
      items.forEach(it => {
        if (!it.accept || !it.accept.length) err(`${sw}: drill-element «${it.prompt}» har tomt accept`);
        if (it.kind !== "type") {
          const p = Drills.present(it, "choice");
          if (p.kind === "choice" && (p.options.length < 3 || p.correct < 0)) err(`${sw}: drill-element «${it.prompt}» har for få distinkte val (${p.options.length})`);
        }
      });
      for (let r = 0; r < 200 && items.length; r++) {
        const smp = Drills.sample(items, per, new Set());
        if (new Set(smp.map(x => x.key)).size !== smp.length) { err(`${sw}: sample() gav same oppgåve to gonger`); break; }
      }
      st.drillItems += items.length;
    } else if (t === "findError") {
      if (!s.text) err(`${sw}: findError utan text`);
      if (/<[a-z/]/i.test(s.text || "")) err(`${sw}: text skal vere rein tekst utan HTML`);
      if (!Array.isArray(s.errors) || !s.errors.length) err(`${sw}: findError utan errors`);
      const tokens = tokenize(s.text || "");
      const used = new Set();
      (s.errors || []).forEach((e, k) => {
        if (!Array.isArray(e.accept) || !e.accept.length) err(`${sw}: feil ${k + 1} («${e.token}») har tomt accept`);
        if (e.accept && e.accept.some(a => a === e.token)) err(`${sw}: feil ${k + 1}: accept er lik token «${e.token}»`);
        const occ = tokens.map((tk, i) => (tk === e.token ? i : -1)).filter(i => i >= 0);
        if (!occ.length) { err(`${sw}: fann ikkje ordet «${e.token}» i teksten`); return; }
        if (occ.length > 1 && !e.nth) warn(`${sw}: «${e.token}» står ${occ.length} gonger. Legg til nth om ikkje det første skal rettast`);
        const pos = e.nth ? occ[e.nth - 1] : occ.find(i => !used.has(i));
        if (pos == null || used.has(pos)) err(`${sw}: klarte ikkje plassere feilen «${e.token}»`);
        used.add(pos);
      });
    } else {
      err(`${sw}: ukjend exerciseType «${t}»`);
    }
  });
});

function tokenize(text) {
  return text.split(/\s+/).filter(Boolean).map(t => {
    const mm = /^([«"“(\[]*)(.*?)([»"”)\].,;:!?…]*)$/.exec(t);
    return mm[2];
  });
}

/* ---------- Links between modules ---------- */
all.forEach(mod => {
  (mod.sections || []).forEach(s => {
    const html = (s.content || "") + (s.question || "") + (s.passage || "");
    const re = /modul\.html\?id=([a-z0-9-]+)/g;
    let m;
    while ((m = re.exec(html))) {
      if (!ids.has(m[1])) warn(`Modul «${mod.id}» lenkjer til ukjend modul «${m[1]}»`);
    }
  });
});

/* ---------- Report ---------- */
console.log("Innhald per del/gruppe:");
Object.entries(stats).forEach(([k, v]) => {
  console.log(`  ${k.padEnd(22)} ${String(v.modules).padStart(2)} modular  ${String(v.exercises).padStart(3)} oppgåver${v.drillItems ? `  (${v.drillItems} drill-element)` : ""}`);
});
console.log(`Ordbank: ${(Bank.nouns || []).length} substantiv, ${(Bank.verbs || []).length} verb, ${(Bank.adjectives || []).length} adjektiv, ${(Bank.words || []).length} småord, ${Object.values(Bank.sentences || {}).reduce((a, b) => a + b.length, 0)} setningar`);

if (warnings.length) {
  console.log(`\n${warnings.length} åtvaring(ar):`);
  warnings.forEach(w => console.log("  ! " + w));
}
if (errors.length) {
  console.log(`\n${errors.length} feil:`);
  errors.forEach(e => console.log("  ✗ " + e));
  process.exit(1);
}
console.log("\nAlt i orden.");
