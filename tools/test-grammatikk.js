/* Testar grammatikksjekken i js/grammatikk.js. Køyr frå rota av repoet:

     node tools/test-grammatikk.js

   Tre delar: konstruerte feil som skal fangast, konstruerte korrekte setningar
   som ikkje skal meldast, og all korrekt kursprosa, som ikkje skal gi falske
   alarmar. Ein ny regel skal gjennom alle tre før han kjem inn. Funn i
   kursprosaen må sjekkast for hand: nokre er ekte feil i teksten. */
const fs = require("fs"), vm = require("vm"), path = require("path");
const ROOT = path.join(__dirname, "..");
const MORF = path.join(ROOT, "data", "nn-ordbank.txt");

const t = fs.readFileSync(MORF, "utf8");
const nl = t.indexOf("\n");
const tabell = JSON.parse(t.slice(0, nl));
const map = new Map();
for (const l of t.slice(nl + 1).split("\n")) {
  if (!l) continue;
  const i = l.indexOf("\t");
  map.set(l.slice(0, i), l.slice(i + 1));
}
const tagar = w => {
  const v = map.get(w);
  return v ? v.split(",").map(x => tabell[parseInt(x, 36)]) : null;
};

const ctx = { console };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(ROOT + "/js/grammatikk.js", "utf8") + ";this.Grammatikk=Grammatikk;", ctx);
const G = ctx.Grammatikk;

/* ---- 1. Fangar han feila? Kvar rad: [tekst, forventa ord som skal meldast] ---- */
const feil = [
  ["Eg las eit bok i går.", "eit"],
  ["Vi budde i ein hus ved sjøen.", "ein"],
  ["Ho kjøpte ein ny jakke.", "ein"],
  ["Det var eit fin dag.", "eit"],            // dag er hankjønn: artikkelen er feil
  ["Dei bur i eit stor hus.", "stor"],
  ["Vi fekk eit fin gåve.", "eit"],           // gåve er hokjønn
  ["Det var eit fin vêr i går.", "fin"],
  ["Han har eit ny sykkel.", "eit"],          // sykkel er hankjønn
  ["Vi såg eit gammal hus.", "gammal"],
  ["Når vi kom fram, var det mørkt.", "Når"],
  ["Når eg gjekk heim i går, byrja det å regne.", "Når"],
  ["Eg vart glad når eg fekk brevet.", "når"],
  ["Ho kjøpte eit raud bil.", "eit"],
  ["Dei hadde eit lang møte.", "lang"],
];
/* ---- 2. Korrekt nynorsk som ikkje skal meldast ---- */
const rett = [
  "Eg las ei bok i går.", "Vi budde i eit hus ved sjøen.", "Det var ein fin dag.",
  "Dei bur i eit stort hus.", "Det var eit fint vêr.", "Vi såg eit gammalt hus.",
  "Når eg kjem heim, skal eg ete.", "Når vi kom heim, var mor alltid glad.",
  "Eg veit ikkje når han kom.", "Når kom du heim?", "Ein av dei kom seint.",
  "Ein veit aldri kva som skjer.", "Eit norsk hus er ofte raudt.", "Det var eit lite hus.",
  "Ho har eit godt hjarte.", "Eg fekk eit nytt nummer.", "Ein gong var det ein konge.",
  "Då vi kom fram, var det mørkt.", "Eit år seinare flytta dei.", "Ei jente og ein gut sat ute.",
];

let treff = 0;
console.log("== Feil som skal fangast");
for (const [tekst, venta] of feil) {
  const f = G.sjekk(tekst, tagar);
  const ok = f.some(x => x.word === venta);
  if (ok) treff++;
  console.log((ok ? "  ✓ " : "  ✗ ") + tekst.padEnd(46) + (f.map(x => x.word + "→" + x.right.join("/")).join(", ") || "(ingenting)"));
}
let falske = 0;
console.log("== Korrekte setningar som ikkje skal meldast");
for (const tekst of rett) {
  const f = G.sjekk(tekst, tagar);
  if (f.length) falske++;
  console.log((f.length ? "  ✗ " : "  ✓ ") + tekst.padEnd(46) + (f.map(x => x.word + "→" + x.right.join("/")).join(", ") || ""));
}
console.log(`\nFanga ${treff} av ${feil.length} feil. Falske alarmar: ${falske} av ${rett.length} korrekte setningar.`);

/* ---- 3. Korrekt kursprosa ---- */
let txt = "";
for (const f of ["part1", "part2-omgrep", "part2", "part3", "part5"]) txt += fs.readFileSync(ROOT + "/js/content/" + f + ".js", "utf8");
const prosa = (txt.match(/content: `[^`]+`|text: "[^"]{100,}"|passage: `[^`]+`/g) || []).join("\n")
  .replace(/<em class="bm">[^<]*<\/em>/g, " ")                            // bokmålsdøme er med vilje feil
  .replace(/<\/?(p|div|li|ul|ol|td|th|tr|table|h[1-6]|br)\b[^>]*>/gi, " ")   // blokktaggar skil ord
  .replace(/<[^>]+>/g, "")                                                  // innebygde taggar gjer det ikkje
  .replace(/&[a-z]+;/g, " ");
const ordtal = (prosa.match(/[a-zæøåA-ZÆØÅ]+/g) || []).length;
const f = G.sjekk(prosa, tagar);
console.log(`\n== Kursprosa: ${ordtal} ord, ${f.length} funn`);
for (const x of f) {
  const kontekst = prosa.slice(Math.max(0, x.start - 35), x.end + 35).replace(/\s+/g, " ");
  console.log("  " + x.word.padEnd(8) + "→ " + x.right.join("/").padEnd(8) + " … " + kontekst + " …");
}
