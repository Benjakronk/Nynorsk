#!/usr/bin/env node
/* Validerer vurderingane på lærarsida (larer/js/vurdering/del*.js) utan nettlesar.
   Bruk:  node tools/validate-vurdering.js            alle delane
          node tools/validate-vurdering.js del2.js    berre éi fil
   Avsluttar med kode 1 om noko er gale. */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const CONTENT = ["part1", "aasen-reise", "part2-omgrep", "part2", "part2-trening", "part3", "part4", "part4-feil", "part4-rettelesing", "part5"]
  .map(f => `js/content/${f}.js`);
const DIR = "larer/js/vurdering";

const sandbox = { console };
sandbox.window = sandbox;
vm.createContext(sandbox);
const run = rel => vm.runInContext(fs.readFileSync(path.join(ROOT, rel), "utf8"), sandbox, { filename: rel });

const errors = [], warnings = [];
const err = (d, msg) => errors.push(`Del ${d}: ${msg}`);
const warn = (d, msg) => warnings.push(`Del ${d}: ${msg}`);

["js/modules.js", "js/content/bank.js", "js/drills.js", ...CONTENT, "larer/js/larar.js", "larer/js/vurdering.js"].forEach(run);

const berre = process.argv[2];
const filer = fs.readdirSync(path.join(ROOT, DIR)).filter(f => f.endsWith(".js") && (!berre || f === berre)).sort();
if (!filer.length) { console.error(`Fann ingen filer i ${DIR}${berre ? ` som heiter ${berre}` : ""}`); process.exit(1); }
for (const f of filer) {
  try { run(`${DIR}/${f}`); } catch (e) { errors.push(`${f}: ${e.message}`); }
}

const { Modules, Vurdering } = vm.runInContext("({ Modules, Vurdering })", sandbox);
const NIVA = Vurdering.NIVA.map(n => n.id);
const tekst = h => String(h || "").replace(/<[^>]+>/g, " ");

// Tankestrek er berre lov i talrekkjer (1814–1905) og i bøyingsrekkjer der ord står på begge sider av streken.
function tankestrek(d, stad, h) {
  const t = tekst(h);
  const re = /[–—]/g;
  let m;
  while ((m = re.exec(t))) {
    const før = t.slice(Math.max(0, m.index - 2), m.index), etter = t.slice(m.index + 1, m.index + 3);
    if (/\d\s?$/.test(før) && /^\s?\d/.test(etter)) continue;
    if (/<em[^>]*>[^<]*<\/em>\s*[–—]\s*<em/.test(String(h))) continue;
    warn(d, `${stad}: tankestrek i teksten («${t.slice(Math.max(0, m.index - 25), m.index + 25).trim()}»). Bruk kolon, komma eller ny setning`);
  }
}

function skjema(d, stad, rader, min) {
  if (!Array.isArray(rader) || rader.length < min) { err(d, `${stad} treng minst ${min} vurderingsområde`); return; }
  rader.forEach((r, i) => {
    if (!r.omrade) err(d, `${stad}[${i}] manglar omrade`);
    NIVA.forEach(n => { if (!r[n]) err(d, `${stad}[${i}] manglar ${n}`); else tankestrek(d, `${stad}[${i}].${n}`, r[n]); });
  });
}

const lareplan = (d, stad, arr) => {
  if (!Array.isArray(arr) || !arr.length) { err(d, `${stad}.lareplan manglar`); return; }
  arr.forEach(n => { if (!(Number.isInteger(n) && n >= 1 && n <= 16)) err(d, `${stad}.lareplan: ${n} er ikkje eit kompetansemål (1 til 16)`); });
};

for (const d of Vurdering.delar()) {
  const v = Vurdering.get(d);
  if (!(d >= 1 && d <= 5)) { err(d, "delen må vere 1 til 5"); continue; }
  for (const f of ["intro", "kompetanse"]) if (!v[f]) err(d, `${f} manglar`); else tankestrek(d, f, v[f]);
  lareplan(d, "del", v.lareplan);
  skjema(d, "kjenneteikn", v.kjenneteikn, 3);

  // Undervegsvurdering: éi til kvar modul i delen.
  const modular = Modules.orderedByPart(d).map(m => m.id);
  const u = v.undervegs || {};
  modular.forEach(id => { if (!u[id]) err(d, `undervegs manglar modulen «${id}»`); });
  Object.entries(u).forEach(([id, x]) => {
    if (!modular.includes(id)) { err(d, `undervegs: «${id}» er ikkje ein modul i del ${d}`); return; }
    for (const f of ["tittel", "oppgave", "framover"]) if (!x[f]) err(d, `undervegs.${id}.${f} manglar`); else tankestrek(d, `undervegs.${id}.${f}`, x[f]);
    if (!(x.tid > 0 && x.tid <= 20)) err(d, `undervegs.${id}.tid må vere mellom 1 og 20 minutt`);
    if (!Array.isArray(x.sjaa) || x.sjaa.length < 2) err(d, `undervegs.${id}.sjaa treng minst 2 punkt`);
    else x.sjaa.forEach((s, i) => tankestrek(d, `undervegs.${id}.sjaa[${i}]`, s));
    if (x.fasit) tankestrek(d, `undervegs.${id}.fasit`, x.fasit);
  });

  // Sluttvurderingar.
  if (!Array.isArray(v.provar) || !v.provar.length) err(d, "provar manglar");
  const ids = new Set();
  (v.provar || []).forEach((p, i) => {
    const stad = `provar[${i}]${p.id ? ` (${p.id})` : ""}`;
    if (!p.id || !/^[a-z0-9-]+$/.test(p.id)) err(d, `${stad}: id må vere små bokstavar, tal og bindestrek`);
    if (ids.has(p.id)) err(d, `${stad}: id-en finst frå før`);
    ids.add(p.id);
    if (!Vurdering.TYPAR[p.type]) err(d, `${stad}: type må vere ${Object.keys(Vurdering.TYPAR).join(", ")}`);
    for (const f of ["tittel", "tid", "form", "lararinfo", "elevark"]) if (!p[f]) err(d, `${stad}.${f} manglar`);
    for (const f of ["lararinfo", "elevark", "fasit"]) if (p[f]) tankestrek(d, `${stad}.${f}`, p[f]);
    if (typeof p.karaktergrunnlag !== "boolean") err(d, `${stad}.karaktergrunnlag må vere true eller false`);
    lareplan(d, stad, p.lareplan);
    (p.modular || []).forEach(id => { if (!Modules.get(id)) err(d, `${stad}.modular: «${id}» finst ikkje`); });
    skjema(d, `${stad}.skjema`, p.skjema, 3);
    if (p.poeng) {
      if (!(p.poeng.maks > 0)) err(d, `${stad}.poeng.maks manglar`);
      NIVA.forEach(n => { if (!p.poeng[n]) err(d, `${stad}.poeng.${n} manglar`); });
    }
    if (p.type === "skriftleg" && !p.fasit) err(d, `${stad}: ei skriftleg prøve treng fasit`);
  });

  if (!Array.isArray(v.eigenvurdering) || v.eigenvurdering.length < 4) err(d, "eigenvurdering treng minst 4 punkt");
}

warnings.forEach(w => console.log(`Åtvaring: ${w}`));
if (errors.length) {
  errors.forEach(e => console.log(`FEIL: ${e}`));
  console.log(`\n${errors.length} feil.`);
  process.exit(1);
}
console.log(`Alt i orden (${Vurdering.delar().length} delar sjekka${warnings.length ? `, ${warnings.length} åtvaringar` : ""}).`);
