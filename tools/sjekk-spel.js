/* Sjekkar innhaldet i spelet «Aasen: Språkvandringa» (js/rpg/data.js):
   karta (like lange rader, dører på dørfliser, merke som finst), folk og manus,
   ord og former, stev og bygg. Køyr: node tools/sjekk-spel.js */
global.window = {};
require(require("path").join(__dirname, "..", "js", "rpg", "data.js"));
const D = window.RPGData; const feil = [];
const MERKE = /[0-9@%$!&*]/;
const merkeI = {};
for (const [id, k] of Object.entries(D.KART)) {
  const w = k.rader[0].length;
  k.rader.forEach((r, y) => { if (r.length !== w) feil.push(`${id} rad ${y} er ${r.length} lang, ikkje ${w}`); });
  const m = {};
  k.rader.forEach((r, y) => [...r].forEach((c, x) => { if (MERKE.test(c)) m[c] = [x, y]; }));
  Object.assign(m, (D.EKSTRA_MERKE || {})[id] || {});
  merkeI[id] = m;
}
for (const [id, k] of Object.entries(D.KART)) {
  for (const d of k.dorer || []) {
    const c = k.rader[d.ved[1]] && k.rader[d.ved[1]][d.ved[0]];
    if (!d.kant && !"DdE".includes(c)) feil.push(`${id}: dør ${d.ved} står på «${c}»`);
    if (d.kant && !MERKE.test(c) && c !== "=") feil.push(`${id}: kantdør ${d.ved} står på «${c}»`);
    if (d.til) { if (!D.KART[d.til[0]]) feil.push(`${id}: ukjent kart ${d.til[0]}`); else if (!merkeI[d.til[0]][d.til[1]]) feil.push(`${id}: merket ${d.til[1]} finst ikkje i ${d.til[0]}`); }
    if (d.vakt && !D.MANUS[d.vakt.manus]) feil.push(`${id}: vaktmanus ${d.vakt.manus} manglar`);
    if (d.krevOrd && !D.ORD[d.krevOrd]) feil.push(`${id}: krevOrd ${d.krevOrd}`);
  }
  for (const f of k.folk || []) { if (!merkeI[id][f.merke]) feil.push(`${id}: merket ${f.merke} til ${f.namn} manglar`); if (!D.MANUS[f.tale]) feil.push(`${id}: manus ${f.tale} manglar`); if (!D.U[f.u]) feil.push(`${id}: utsjånad ${f.u}`); }
  for (const i of k.inngang || []) if (!D.MANUS[i.manus]) feil.push(`${id}: inngang ${i.manus}`);
  for (const ks of k.kister || []) { const c = k.rader[ks.ved[1]][ks.ved[0]]; if (!ks.gøymd && c !== "K") feil.push(`${id}: kiste ${ks.ved} på «${c}»`); if (ks.gøymd && !MERKE.test(c) && c !== k.golv) feil.push(`${id}: gøymd kiste på «${c}»`); if (ks.ting && !D.TING[ks.ting]) feil.push(`${id}: ting ${ks.ting}`); }
  for (const lag of (k.fiendar || {}).lag || []) for (const f of lag) if (!D.FIENDAR[f]) feil.push(`${id}: fiende ${f}`);
}
// Hus og inventar som figurar: bildefila må finnast
const fs_ = require("fs"), sti_ = require("path");
for (const [id, k] of Object.entries(D.KART)) for (const b of k.bygg || []) {
  const f = sti_.join(__dirname, "..", "bilete", "spel", "bygg", b.id + ".png");
  if (!fs_.existsSync(f)) feil.push(`${id}: bygg ${b.id} manglar bilete (${f})`);
  if (typeof b.h !== "number") feil.push(`${id}: bygg ${b.id} manglar h`);
}
// Manus: lytt, tilbod, kamp, gi
function gå(steg, stad) {
  if (!Array.isArray(steg)) return;
  for (const s of steg) {
    for (const k of ["lytt", "tilbod"]) if (s[k]) { const [id, form] = s[k]; const o = D.ORD[id]; if (!o) feil.push(`${stad}: ukjent ord ${id}`); else if (!o.former.includes(form)) feil.push(`${stad}: forma «${form}» står ikkje i ordlista for ${id}`); }
    if (s.kamp) for (const f of s.kamp) if (!D.FIENDAR[f]) feil.push(`${stad}: fiende ${f}`);
    if (s.gi && !D.TING[s.gi] && !D.NOKKELTING[s.gi]) feil.push(`${stad}: gi ${s.gi}`);
    if (s.t && (s.t.match(/⟪/g) || []).length !== (s.t.match(/⟫/g) || []).length) feil.push(`${stad}: ubalanserte ⟪⟫`);
    if (s.t && /[—–]/.test(s.t.replace(/\d–\d/g, ""))) feil.push(`${stad}: tankestrek`);
    gå(s.da, stad); gå(s.elles, stad); (s.svar || []).forEach(x => gå(x, stad));
  }
}
for (const [id, m] of Object.entries(D.MANUS)) gå(m, id);
// Formspørsmål: kvar familie med spørsmål må ha minst éi sterk og éi veik form
for (const [id, o] of Object.entries(D.ORD)) {
  const fam = D.FAMILIAR[o.fam];
  if (!fam) { feil.push(`ord ${id}: ukjend familie`); continue; }
  if (fam.sterk) { const alle = [...o.former, o.dansk]; if (!alle.some(f => fam.sterk(f, o))) feil.push(`ord ${id}: ingen sterk form`); if (fam.sterk(o.dansk, o)) feil.push(`ord ${id}: den danske forma «${o.dansk}» blir rekna som sterk`); }
}
const lytta = new Set(); (function samle(x) { if (Array.isArray(x)) x.forEach(samle); else if (x && typeof x === "object") { if (x.lytt) lytta.add(x.lytt[0]); if (x.tilbod) lytta.add(x.tilbod[0]); Object.values(x).forEach(samle); } })(D.MANUS);
console.log("Ord som kan samlast i kapittel 1:", [...lytta].join(", "));
console.log("Ord som ikkje finst i kapittel 1:", Object.keys(D.ORD).filter(i => !lytta.has(i)).join(", "));
console.log(feil.length ? feil.join("\n") : "Alt ser rett ut.");
