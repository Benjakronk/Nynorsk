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
    if (d.til) { if (!D.KART[d.til[0]]) feil.push(`${id}: ukjent kart ${d.til[0]}`); else if (!merkeI[d.til[0]][d.til[1]]) feil.push(`${id}: merket ${d.til[1]} finst ikkje i ${d.til[0]}`); else if (D.KART[d.til[0]].scene) feil.push(`${id}: dør til scenekartet ${d.til[0]}`); }
    if (d.vakt && !D.MANUS[d.vakt.manus]) feil.push(`${id}: vaktmanus ${d.vakt.manus} manglar`);
    if (d.krevOrd && !D.ORD[d.krevOrd]) feil.push(`${id}: krevOrd ${d.krevOrd}`);
  }
  for (const f of k.folk || []) { if (!merkeI[id][f.merke]) feil.push(`${id}: merket ${f.merke} til ${f.namn} manglar`); if (!D.MANUS[f.tale]) feil.push(`${id}: manus ${f.tale} manglar`); if (!D.U[f.u]) feil.push(`${id}: utsjånad ${f.u}`); }
  for (const i of k.inngang || []) if (!D.MANUS[i.manus]) feil.push(`${id}: inngang ${i.manus}`);
  if (k.kvile && !D.SCENER[k.kvile]) feil.push(`${id}: kvilescena ${k.kvile} finst ikkje`);
  for (const ks of k.kister || []) { const c = k.rader[ks.ved[1]][ks.ved[0]]; if (!ks.gøymd && c !== "K") feil.push(`${id}: kiste ${ks.ved} på «${c}»`); if (ks.gøymd && !MERKE.test(c) && c !== k.golv) feil.push(`${id}: gøymd kiste på «${c}»`); if (ks.ting && !D.TING[ks.ting]) feil.push(`${id}: ting ${ks.ting}`); }
  for (const lag of (k.fiendar || {}).lag || []) for (const f of lag) if (!D.FIENDAR[f]) feil.push(`${id}: fiende ${f}`);
}
/* Stemningar og lys (sjå «Lys» i js/rpg/README.md): kvart kart må ha ei stemning som finst, og
   fargane er 5 bit per kanal (heile tal, -31..31 for p, 0..31 for snitt, lys 0..15). */
const er3 = (v, min, max) => Array.isArray(v) && v.length === 3 && v.every(x => Number.isInteger(x) && x >= min && x <= max);
function sjekkOp(op, stad) {
  if (!op || typeof op !== "object") { feil.push(`${stad}: manglar operasjon`); return; }
  for (const k of Object.keys(op)) if (!["p", "snitt", "lys"].includes(k)) feil.push(`${stad}: ukjend nøkkel «${k}»`);
  if (op.p !== undefined && !er3(op.p, -31, 31)) feil.push(`${stad}: p må vere [r, g, b] med heile tal frå -31 til 31`);
  if (op.snitt !== undefined && !er3(op.snitt, 0, 31)) feil.push(`${stad}: snitt må vere [r, g, b] med heile tal frå 0 til 31`);
  if (op.lys !== undefined && !(Number.isInteger(op.lys) && op.lys >= 0 && op.lys <= 15)) feil.push(`${stad}: lys må vere eit heilt tal frå 0 til 15`);
}
for (const [id, st] of Object.entries(D.STEMNINGAR || {})) {
  const stad = `stemning ${id}`;
  for (const k of Object.keys(st)) if (!["bak", "fig", "hdma", "glod", "syklus", "kjelder", "ivar", "skyer", "skugge", "straalar", "sepia"].includes(k)) feil.push(`${stad}: ukjend nøkkel «${k}»`);
  if (st.bak) sjekkOp(st.bak, stad + " bak"); if (st.fig) sjekkOp(st.fig, stad + " fig");
  if (st.hdma && !(Array.isArray(st.hdma) && st.hdma.every((h, i) => Number.isInteger(h[0]) && h[0] >= 0 && h[0] <= 192 && er3(h[1], -31, 31) && (i === 0 || h[0] >= st.hdma[i - 1][0])))) feil.push(`${stad}: hdma må vere [[rad, [r, g, b]], …] med stigande rader frå 0 til 192`);
  if (st.glod) for (const l of ["bak", "fig"]) { if (!Array.isArray(st.glod[l]) || st.glod[l].length !== 3) feil.push(`${stad}: glod.${l} må ha tre nivå`); else st.glod[l].forEach((op, i) => sjekkOp(op, `${stad} glod.${l}[${i}]`)); }
  if ((st.kjelder || st.ivar || st.straalar) && !st.glod) feil.push(`${stad}: kjelder, ivar og straalar treng glod`);
  if (st.syklus && !(Array.isArray(st.syklus) && st.syklus.every(v => er3(v, -31, 31)))) feil.push(`${stad}: syklus må vere ei liste med [r, g, b]`);
  if (st.ivar !== undefined && st.ivar !== true) feil.push(`${stad}: ivar må vere true (glødforma ivar i LYSKJELDER)`);
  if (st.skugge) for (const l of ["bak", "fig"]) if (st.skugge[l]) sjekkOp(st.skugge[l], `${stad} skugge.${l}`);
  if (st.sepia !== undefined && !(st.sepia >= 0 && st.sepia <= 1)) feil.push(`${stad}: sepia må vere frå 0 til 1`);
}
// Glødformene (glod.py): biletet må finnast, breidda må gå opp i rammene, og rekkja må peike på rammer som finst.
for (const id of ["grue", "kakkelomn", "peis", "lys", "lykt", "krone", "ivar", "sky"]) if (!(D.LYSKJELDER || {})[id]) feil.push(`LYSKJELDER manglar glødforma ${id} (sjå lyskjelder() i motor.js)`);
for (const [id, k] of Object.entries(D.LYSKJELDER || {})) {
  const fil = require("path").join(__dirname, "..", "bilete", "spel", "lys", id + ".png");
  if (!(Number.isInteger(k.rammer) && k.rammer >= 1)) feil.push(`lyskjelde ${id}: rammer må vere eit heilt tal, 1 eller meir`);
  if (!(Array.isArray(k.rekkje) && k.rekkje.length && k.rekkje.every(r => Number.isInteger(r) && r >= 0 && r < k.rammer))) feil.push(`lyskjelde ${id}: rekkje må vere ei liste med rammer frå 0 til ${k.rammer - 1}`);
  if (!require("fs").existsSync(fil)) { feil.push(`lyskjelde ${id}: bilete/spel/lys/${id}.png finst ikkje (køyr tools/pikselkunst/glod.py ${id})`); continue; }
  const w = require("fs").readFileSync(fil).readUInt32BE(16);                       // breidda står i IHDR
  if (w % k.rammer) feil.push(`lyskjelde ${id}: breidda ${w} går ikkje opp i ${k.rammer} rammer`);
}
// Vatn: stryk må liggje på vatn («~», eller skog på kartkanten ved vatn), og bekk er sann eller usann.
for (const [id, k] of Object.entries(D.KART)) if (k.vatn) {
  for (const p of k.vatn.stryk || []) {
    const [x, y] = String(p).split(",").map(Number), c = (k.rader[y] || "")[x];
    const kant = x === 0 || y === 0 || y === k.rader.length - 1 || x === k.rader[0].length - 1;
    if (!(c === "~" || (c === "#" && kant))) feil.push(`${id}: stryk på ${p} ligg ikkje på vatn («${c}»)`);
  }
  if ("bekk" in k.vatn && typeof k.vatn.bekk !== "boolean") feil.push(`${id}: vatn.bekk skal vere true eller false`);
}
for (const [id, k] of Object.entries(D.KART)) if (k.stemning && !(D.STEMNINGAR || {})[k.stemning]) feil.push(`${id}: ukjend stemning «${k.stemning}» (sjå STEMNINGAR)`);
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
    if (s.scene && !D.SCENER[s.scene]) feil.push(`${stad}: ukjend scene ${s.scene}`);
    if (s.inn && !(s.inn.vesen ? D.FIENDAR[s.inn.vesen] : D.U[s.inn.u])) feil.push(`${stad}: utsjånad ${s.inn.vesen || s.inn.u}`);
    if (s.byt && ((s.u && !D.U[s.u]) || (s.vesen && !D.FIENDAR[s.vesen]))) feil.push(`${stad}: byt til ukjend utsjånad ${s.u || s.vesen}`);
    if (s.pose !== undefined && (typeof s.pose !== "string" || !("p" in s) || (s.p !== null && !D.POSAR.includes(s.p)))) feil.push(`${stad}: pose «${s.p}» for ${s.pose} (kjende: ${D.POSAR.join(", ")}, eller null)`);
    if (s.sti && typeof s.sti === "string" && !/^([novh]\d*)+$/.test(s.sti)) feil.push(`${stad}: sti «${s.sti}»`);
    if (s.dagbok && /[—–]/.test(s.dagbok)) feil.push(`${stad}: tankestrek i dagboka`);
    if (s.scenekart) { const k = D.KART[s.scenekart]; if (!k || !k.scene) feil.push(`${stad}: ${s.scenekart} er ikkje eit scenekart`); else if (!merkeI[s.scenekart][s.merke || "1"]) feil.push(`${stad}: merket ${s.merke || "1"} finst ikkje i ${s.scenekart}`); }
    // Lyset: tone, blink i ein farge og spotlight (namnet blir sjekka i sjekkNamn).
    if (s.tone !== undefined && !["alle", "bakgrunn", "figurar"].includes(s.tone)) feil.push(`${stad}: tone «${s.tone}» (alle, bakgrunn eller figurar)`);
    if (s.tone !== undefined && s.rgb !== null && !er3(s.rgb, -31, 31)) feil.push(`${stad}: tone treng rgb: [r, g, b] med heile tal frå -31 til 31 (eller null)`);
    if (s.blink && s.rgb !== undefined && !er3(s.rgb, 0, 31)) feil.push(`${stad}: blink med rgb: [r, g, b] frå 0 til 31`);
    if (s.spot !== undefined && s.spot !== null && typeof s.spot !== "string" && !(Array.isArray(s.spot) && s.spot.length === 2)) feil.push(`${stad}: spot må vere eit namn, ei rute [x, y] eller null`);
    if (s.spot && s.r !== undefined && !(s.r > 0 && s.r <= 400)) feil.push(`${stad}: spot med radius r ${s.r}`);
    if ("rgb" in s && s.tone === undefined && !s.blink) feil.push(`${stad}: rgb utan tone eller blink`);
    if (s.til && D.KART[s.til[0]] && D.KART[s.til[0]].scene) feil.push(`${stad}: til-steg til scenekartet ${s.til[0]} (bruk scenekart)`);
    gå(s.da, stad); gå(s.elles, stad); (s.svar || []).forEach(x => gå(x, stad)); (s.saman || []).forEach(x => gå(x, stad));
  }
}
for (const [id, m] of Object.entries(D.MANUS)) gå(m, id);
for (const [id, sc] of Object.entries(D.SCENER)) {
  gå(sc.steg, "scene " + id); if (!sc.namn) feil.push(`scene ${id}: manglar namn`);
  // Ei scene som går til eit scenekart, må gå attende òg.
  const ut = []; (function samle(x) { if (Array.isArray(x)) x.forEach(samle); else if (x && typeof x === "object") { if ("scenekart" in x) ut.push(x.scenekart); Object.values(x).forEach(samle); } })(sc.steg);
  if (ut.some(k => k) && ut[ut.length - 1] !== null) feil.push(`scene ${id}: går ikkje attende frå scenekartet`);
}
/* Namn i regien: den som talar, går, snur seg, får pose eller kamera, må finnast på kartet der
   manuset blir spela (folk i kartet, merke, folk frå inn-steg, nye namn frå byt), elles gir
   motoren null, og steget blir stilt hoppa over. Manus blir knytte til karta gjennom folk (tale),
   inngang, vakt og kvile, og scener gjennom manusa som spelar dei. Scenekart i manuset er med. */
const karteFor = {};                                                  // manus- eller scene-id -> Set med kart
const knyt = (nokkel, kart) => (karteFor[nokkel] || (karteFor[nokkel] = new Set())).add(kart);
for (const [id, k] of Object.entries(D.KART)) {
  for (const f of k.folk || []) knyt("m:" + f.tale, id);
  for (const i of k.inngang || []) knyt("m:" + i.manus, id);
  for (const d of k.dorer || []) if (d.vakt) knyt("m:" + d.vakt.manus, id);
  if (k.kvile) knyt("s:" + k.kvile, id);
}
knyt("m:start", "asen-stova");                                         // ei ny reise byrjar i stova
const alleSteg = x => { const ut = []; (function samle(x) { if (Array.isArray(x)) x.forEach(samle); else if (x && typeof x === "object") { ut.push(x); Object.values(x).forEach(samle); } })(x); return ut; };
// Scener får karta til manuset som spelar dei.
for (let n = 0; n < 4; n++) for (const [id, m] of Object.entries(D.MANUS)) for (const s of alleSteg(m)) if (s.scene) for (const k of karteFor["m:" + id] || []) knyt("s:" + s.scene, k);
function sjekkNamn(nokkel, steg, stad) {
  const kart = karteFor[nokkel];
  if (!kart) return;
  const st = alleSteg(steg);
  const namn = new Set(["Ivar", "Huldra"]);
  for (const s of st) { if (s.inn) namn.add(s.inn.namn); if (s.byt && s.namn) namn.add(s.namn); if (s.scenekart) for (const f of D.KART[s.scenekart].folk || []) namn.add(f.namn); }
  for (const k of kart) {
    const lov = new Set([...namn, ...(D.KART[k].folk || []).map(f => f.namn), ...Object.keys(merkeI[k])]);
    for (const s of st) for (const f of ["s", "gaa", "snu", "pose", "byt", "fjern", "kven", "fraa", "fra", "mot", "spot"]) {
      const v = s[f];
      if (typeof v === "string" && !(f === "mot" && "s" in s) && !lov.has(v) && !(f === "fra" && !s.parti)) feil.push(`${stad} på ${k}: «${v}» (${f}) finst ikkje på kartet`);
    }
    for (const s of st) if (typeof s.kamera === "string" && !lov.has(s.kamera)) feil.push(`${stad} på ${k}: kamera mot «${s.kamera}» som ikkje finst`);
  }
}
for (const [id, m] of Object.entries(D.MANUS)) sjekkNamn("m:" + id, m, id);
for (const [id, sc] of Object.entries(D.SCENER)) sjekkNamn("s:" + id, sc.steg, "scene " + id);
const utanKart = Object.keys(D.SCENER).filter(id => !karteFor["s:" + id]);
if (utanKart.length) feil.push(`scener som ingen stad spelar: ${utanKart.join(", ")}`);
for (const s of D.STADER || []) if (s.kart && D.KART[s.kart] && D.KART[s.kart].scene) feil.push(`stad ${s.id}: scenekartet ${s.kart} på verdskartet`);
// Formspørsmål: kvar familie med spørsmål må ha minst éi sterk og éi veik form
for (const [id, o] of Object.entries(D.ORD)) {
  const fam = D.FAMILIAR[o.fam];
  if (!fam) { feil.push(`ord ${id}: ukjend familie`); continue; }
  if (fam.sterk) { const alle = [...o.former, o.dansk]; if (!alle.some(f => fam.sterk(f, o))) feil.push(`ord ${id}: ingen sterk form`); if (fam.sterk(o.dansk, o)) feil.push(`ord ${id}: den danske forma «${o.dansk}» blir rekna som sterk`); }
}
const lytta = new Set(); (function samle(x) { if (Array.isArray(x)) x.forEach(samle); else if (x && typeof x === "object") { if (x.lytt) lytta.add(x.lytt[0]); if (x.tilbod) lytta.add(x.tilbod[0]); Object.values(x).forEach(samle); } })([D.MANUS, D.SCENER]);
console.log("Ord som kan samlast i kapittel 1:", [...lytta].join(", "));
console.log("Ord som ikkje finst i kapittel 1:", Object.keys(D.ORD).filter(i => !lytta.has(i)).join(", "));
console.log(feil.length ? feil.join("\n") : "Alt ser rett ut.");
