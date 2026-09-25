#!/usr/bin/env node
/* Sjekkar lærarinnhaldet i larer/js/innhald/: at kvar modul har presentasjon og
   rettleiing, at felta er fylte ut, at spørsmål og tavleøvingar verkar, og at
   teksten følgjer skrivereglane i kurset (ingen tankestrek i prosa).

   Bruk:  node tools/validate-larar.js            alle filene
          node tools/validate-larar.js del3.js    berre modulane i éi fil */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROT = path.join(__dirname, "..");
const berreFil = process.argv[2] || null;

const ctx = { console, window: {}, document: { addEventListener() {} } };
ctx.window = ctx;
vm.createContext(ctx);
const last = f => vm.runInContext(fs.readFileSync(path.join(ROT, f), "utf8"), ctx, { filename: f });
// const/let på toppnivå blir ikkje eigenskapar på context, så vi hentar dei ut med eit uttrykk.
["js/modules.js", "js/content/part1.js", "js/content/aasen-reise.js", "js/content/part2-omgrep.js",
 "js/content/part2.js", "js/content/part2-trening.js", "js/content/part3.js", "js/content/part4.js",
 "js/content/part4-feil.js", "js/content/part4-rettelesing.js", "js/content/part5.js",
 "js/content/bank.js", "js/drills.js", "larer/js/larar.js"].forEach(last);

const html = fs.readFileSync(path.join(ROT, "larer/presentasjon.html"), "utf8");
const innhaldsfiler = [...html.matchAll(/src="(larer\/js\/innhald\/[^"]+)"/g)].map(m => m[1]);
const registrertI = {};
for (const f of innhaldsfiler) {
  if (!fs.existsSync(path.join(ROT, f))) { if (!berreFil) console.log(`(manglar enno: ${f})`); continue; }
  const før = new Set(vm.runInContext("Larar.ids()", ctx));
  last(f);
  vm.runInContext("Larar.ids()", ctx).filter(id => !før.has(id)).forEach(id => { registrertI[id] = path.basename(f); });
}

const Modules = vm.runInContext("Modules", ctx);
const Larar = vm.runInContext("Larar", ctx);
const Drills = vm.runInContext("Drills", ctx);

const feil = [], åtvaringar = [];
const err = (id, msg) => feil.push(`${id}: ${msg}`);
const warn = (id, msg) => åtvaringar.push(`${id}: ${msg}`);

const TYPAR = new Set(["standard", "sporsmal", "diskuter", "sitat", "bilete", "oppgave", "drill", "tekst"]);
const UTSTYR = new Set(["skrivebok", "ordbok", "pc"]);

/* Tavlegjennomgangen skal kunne køyrast åleine: elevane arbeider i skriveboka
   med det som står på tavla, ikkje i modulane på PC-en. Det elevane ser, og
   planen for økta, skal difor ikkje sende dei til modulen. PC er berre lov
   på oppgåvelysbilete som har `utstyr: ["pc"]`. */
const TIL_MODULEN = /\bmodulen\b|\bmodular\b|elevmodul|\bi kurset\b/i;
const TIL_PC = /\bpc\b|\bpc-en\b|datamaskin|nettbrett|chromebook/i;
const synleg = s => [s.title, s.kicker, s.body, s.svar, s.prompt, s.text, s.question, s.explain, s.intro, s.caption, s.kjelde,
  ...(s.steps || []), ...(s.options || [])].filter(Boolean).join(" ").replace(/<[^>]+>/g, " ");
const TAGGAR = ["p", "ul", "ol", "li", "div", "strong", "em", "b", "i", "span", "table", "tr", "td", "th", "h3", "blockquote", "a", "small", "figure", "figcaption"];

// Tekstsjekk på alle strengar i eit objekt.
function sjekkTekst(id, stad, s) {
  if (typeof s !== "string") return;
  // `text` på tekst- og sitatlysbilete er ordrette tekstar og sitat, og der skal teiknsetjinga stå som i originalen.
  const ordrett = /\.slides\[\d+\]\.text$/.test(stad);
  if (!ordrett && s.includes("—")) err(id, `${stad}: tankestrek (—) i teksten`);
  const utanRekkjer = s.replace(/\d\s*–\s*\d/g, "");
  if (!ordrett && utanRekkjer.includes("–")) err(id, `${stad}: tankestrek (–) i teksten, bruk kolon, komma eller ny setning`);
  for (const t of TAGGAR) {
    const opne = (s.match(new RegExp(`<${t}[\\s>]`, "g")) || []).length;
    const lukka = (s.match(new RegExp(`</${t}>`, "g")) || []).length;
    if (opne !== lukka) err(id, `${stad}: <${t}> er opna ${opne} gonger og lukka ${lukka}`);
  }
  for (const m of s.matchAll(/src="([^"]+)"/g)) {
    if (!/^https?:/.test(m[1]) && !fs.existsSync(path.join(ROT, m[1]))) err(id, `${stad}: fann ikkje biletet ${m[1]}`);
  }
}
function gåGjennom(id, stad, v) {
  if (typeof v === "string") sjekkTekst(id, stad, v);
  else if (Array.isArray(v)) v.forEach((x, i) => gåGjennom(id, `${stad}[${i}]`, x));
  else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) if (k !== "spec") gåGjennom(id, `${stad}.${k}`, x);
}

/* Skuletimane er på 45 minutt. Kvar modul er planlagd for éi eller to økter,
   og øktene må gå opp: fasane summerer til 45 per økt, og ei ny økt byrjar ved
   eit fasskifte. Samtaleklokkene (diskuter.tid) og eigenarbeidet
   (oppgave.tid) må få plass i fasane som viser til lysbiletet. */
const ØKTER = { "Éi økt på 45 minutt": 1, "To økter på 45 minutt": 2, "Tre økter på 45 minutt": 3 };
function lysbileteI(tekst) {
  const ut = new Set();
  const s = String(tekst || "");
  for (const m of s.matchAll(/(\d+)\s*til\s*(\d+)/g)) for (let n = +m[1]; n <= +m[2]; n++) ut.add(n);
  for (const m of s.replace(/(\d+)\s*til\s*(\d+)/g, "").matchAll(/\d+/g)) ut.add(+m[0]);
  return ut;
}
function sjekkTider(id, g, slides) {
  const økter = ØKTER[g.tid];
  if (!økter) { err(id, `guide.tid må vere ${Object.keys(ØKTER).map(t => `«${t}»`).join(" eller ")}, ikkje «${g.tid}»`); return; }
  const sum = g.okt.reduce((s, f) => s + (Number(f.min) || 0), 0);
  if (sum !== 45 * økter) err(id, `fasane summerer til ${sum} minutt, men ${økter} økt${økter > 1 ? "er" : ""} er ${45 * økter}`);
  let akk = 0;
  const skifte = new Set();
  g.okt.forEach(f => { akk += Number(f.min) || 0; skifte.add(akk); });
  for (let k = 1; k < økter; k++) if (!skifte.has(45 * k)) err(id, `økt ${k + 1} byrjar ikkje ved eit fasskifte (etter ${45 * k} minutt)`);
  const fasar = g.okt.map(f => ({ min: Number(f.min) || 0, nr: lysbileteI(f.lysbilete), klokke: 0 }));
  slides.forEach((s, i) => {
    const nr = i + 2;
    const mine = fasar.filter(f => f.nr.has(nr));
    if (s.type === "diskuter" && s.tid) {
      if (!mine.length) err(id, `lysbilete ${nr}: samtaleklokka (${s.tid} min) er ikkje med i nokon fase i økta`);
      else mine[0].klokke += Number(s.tid);
    }
    if (s.type === "oppgave" && s.tid) {
      const tid = mine.reduce((t, f) => t + f.min, 0);
      if (!mine.length) err(id, `lysbilete ${nr}: eigenarbeidet (${s.tid} min) er ikkje med i nokon fase i økta`);
      else if (Number(s.tid) > tid) err(id, `lysbilete ${nr}: eigenarbeidet er ${s.tid} min, men fasane har berre ${tid} min`);
    }
  });
  fasar.forEach((f, i) => { if (f.klokke > f.min) err(id, `guide.okt[${i}] har ${f.min} min, men samtaleklokkene i fasen tek ${f.klokke} min`); });
}

const moduler = [];
for (let p = 1; p <= 5; p++) moduler.push(...Modules.orderedByPart(p));
const kjende = new Set(moduler.map(m => m.id));

for (const id of Larar.ids()) if (!kjende.has(id)) err(id, "lærarinnhald for ein modul som ikkje finst");

let sjekka = 0;
for (const m of moduler) {
  const l = Larar.get(m.id);
  if (berreFil && registrertI[m.id] !== berreFil) continue;
  if (!l) { if (!berreFil) err(m.id, "manglar presentasjon og rettleiing"); continue; }
  sjekka++;
  const id = m.id;
  const slides = l.slides || [];
  const tal = slides.length + 1;

  if (slides.length < 6) err(id, `berre ${slides.length} lysbilete (minst 6 i tillegg til framsida)`);
  if (!l.tittelnotat) warn(id, "framsida har ikkje notat (tittelnotat)");
  let utanNotat = 0;
  slides.forEach((s, i) => {
    const stad = `lysbilete ${i + 2}`;
    const type = s.type || "standard";
    if (!TYPAR.has(type)) { err(id, `${stad}: ukjend type «${type}»`); return; }
    if (!s.notes) utanNotat++;
    // Det som skal haldast att, skal vere steg i presentasjonen, ikkje noko læraren dekkjer til på tavla.
    if (/\bdekk?(je)? (over|til)\b|\bdekkjer (over|til)\b|\bskjul\b|\bgøym (dei|det|kolonn|rad)/i.test(String(s.notes || "").replace(/<[^>]+>/g, "")))
      err(id, `${stad}: notatet ber læraren dekkje til eller gøyme noko. Bruk steg (steps eller class="steg") i staden`);
    if (type === "standard" && !s.title) err(id, `${stad}: manglar title`);
    if (type === "standard" && !s.body && !(s.steps && s.steps.length)) err(id, `${stad}: manglar body og steps`);
    if (type === "sporsmal") {
      if (!s.question) err(id, `${stad}: spørsmål utan question`);
      if (!Array.isArray(s.options) || s.options.length < 2 || s.options.length > 5) err(id, `${stad}: treng 2 til 5 options`);
      else if (!(s.correct >= 0 && s.correct < s.options.length)) err(id, `${stad}: correct peikar utanfor options`);
      if (!s.explain) err(id, `${stad}: spørsmål utan explain`);
    }
    if (type === "diskuter" && !s.prompt) err(id, `${stad}: diskuter utan prompt`);
    if (type === "sitat" && !s.text) err(id, `${stad}: sitat utan text`);
    if (type === "tekst" && !s.text) err(id, `${stad}: tekst utan text`);
    {
      const t = synleg(s);
      if (TIL_MODULEN.test(t)) err(id, `${stad}: lysbiletet sender elevane til modulen («${t.match(TIL_MODULEN)[0]}»). Oppgåvene skal stå på tavla`);
      if (TIL_PC.test(t) && !(type === "oppgave" && (s.utstyr || []).includes("pc"))) err(id, `${stad}: lysbiletet nemner PC, men har ikkje utstyr: ["pc"]`);
    }
    if (type === "bilete") {
      if (!s.src || !fs.existsSync(path.join(ROT, s.src))) err(id, `${stad}: fann ikkje biletet ${s.src}`);
      if (!s.alt) err(id, `${stad}: biletet manglar alt-tekst`);
    }
    if (type === "oppgave" && !s.title) err(id, `${stad}: oppgåve utan title`);
    if (type === "oppgave" && !s.body) err(id, `${stad}: oppgåve utan body (oppgåvene skal stå på tavla)`);
    if (type === "oppgave" && s.utstyr && !(Array.isArray(s.utstyr) && s.utstyr.every(u => UTSTYR.has(u)))) err(id, `${stad}: utstyr må vere ei liste med skrivebok, ordbok og/eller pc`);
    if (type === "drill") {
      if (!s.spec) err(id, `${stad}: drill utan spec`);
      else {
        try {
          const items = Drills.build(JSON.parse(JSON.stringify(s.spec)));
          if (items.length < (s.n || 6)) err(id, `${stad}: spec gir berre ${items.length} oppgåver, treng ${s.n || 6}`);
        } catch (e) { err(id, `${stad}: spec feilar: ${e.message}`); }
      }
    }
  });
  if (utanNotat > slides.length * 0.25) warn(id, `${utanNotat} av ${slides.length} lysbilete manglar notat`);

  const g = l.guide;
  if (!g) { err(id, "manglar guide"); }
  else {
    for (const f of ["tid", "intro", "forkunnskapar", "vidare"]) if (!g[f]) err(id, `guide.${f} manglar`);
    if (!Array.isArray(g.mal) || g.mal.length < 2) err(id, "guide.mal treng minst 2 læringsmål");
    if (!Array.isArray(g.lareplan) || !g.lareplan.length) err(id, "guide.lareplan manglar");
    else g.lareplan.forEach(n => { if (!(Number.isInteger(n) && n >= 1 && n <= 16)) err(id, `guide.lareplan: ${n} er ikkje eit kompetansemål (1 til 16)`); });
    if (!Array.isArray(g.forebuing) || !g.forebuing.length) err(id, "guide.forebuing manglar");
    if (!Array.isArray(g.okt) || g.okt.length < 3) err(id, "guide.okt treng minst 3 fasar");
    else g.okt.forEach((f, i) => {
      if (!f.fase || !f.gjer || !(f.min > 0)) err(id, `guide.okt[${i}] treng fase, min og gjer`);
      if (TIL_MODULEN.test(String(f.gjer).replace(/<[^>]+>/g, " "))) err(id, `guide.okt[${i}]: fasen sender elevane til modulen. Tavlegjennomgangen skal kunne køyrast utan`);
      if (f.lysbilete) {
        const nr = String(f.lysbilete).match(/\d+/g) || [];
        nr.forEach(n => { if (Number(n) > tal) err(id, `guide.okt[${i}]: lysbilete ${n} finst ikkje (${tal} i alt)`); });
      }
    });
    if (Array.isArray(g.okt)) sjekkTider(id, g, slides);
    if (!Array.isArray(g.misoppfatningar) || g.misoppfatningar.length < 2) err(id, "guide.misoppfatningar treng minst 2");
    else g.misoppfatningar.forEach((x, i) => { if (!x.feil || !x.hjelp) err(id, `guide.misoppfatningar[${i}] treng feil og hjelp`); });
    if (!Array.isArray(g.samtale) || g.samtale.length < 2) err(id, "guide.samtale treng minst 2 spørsmål");
    if (!g.tilpassing || !(g.tilpassing.stotte || []).length || !(g.tilpassing.utfordring || []).length) err(id, "guide.tilpassing treng stotte og utfordring");
    if (!Array.isArray(g.vurdering) || !g.vurdering.length) err(id, "guide.vurdering manglar");
  }
  gåGjennom(id, "innhald", l);
}

åtvaringar.forEach(w => console.log("Åtvaring: " + w));
if (feil.length) {
  feil.forEach(e => console.log("FEIL: " + e));
  console.log(`\n${feil.length} feil i ${sjekka} modular.`);
  process.exit(1);
}
console.log(`Alt i orden (${sjekka} modular sjekka).`);
