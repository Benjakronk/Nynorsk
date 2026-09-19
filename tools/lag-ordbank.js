/* Lagar ei kompakt morfologifil av Norsk ordbank (nynorsk 2012).
   Format: første linje er ein JSON-tabell med tagkombinasjonar. Kvar linje
   etter det er «ord<TAB>id,id», der id-ane er base-36-indeksar i tabellen. */
const fs = require("fs");

const [SRC, OUT] = process.argv.slice(2);
const HALD = new Set([
  "mask", "fem", "nøyt", "m/f", "eint", "fl", "ub", "bu",
  "pos", "komp", "sup", "pres", "pret", "inf", "imp", "perf-part", "pass",
  "prop", "kvant", "dem", "poss", "pers", "nom", "akk",
]);
const OK = /^[a-zæøåéèêóòôäëüA-ZÆØÅÉÈÊÓÒÔÄËÜ.'-]+$/;

function reduser(tag) {
  const d = tag.split(" ");
  const f = [d[0], ...d.slice(1).filter(x => HALD.has(x))];
  if (d.includes("<perf-part>")) f.push("ptc");
  return f.join(" ");
}

const ord = new Map();
const linjer = fs.readFileSync(SRC, "latin1").split(/\r?\n/);
for (let i = 1; i < linjer.length; i++) {
  const c = linjer[i].split("\t");
  if (c.length < 9 || c[8] !== "normert") continue;
  const form = c[2].replace(/\$/g, "");
  if (!form || !OK.test(form)) continue;
  const key = form.toLowerCase();
  if (!ord.has(key)) ord.set(key, new Set());
  ord.get(key).add(reduser(c[3]));
}

const tabell = [];
const indeks = new Map();
const rader = [...ord.keys()].sort().map(w => {
  const ids = [...ord.get(w)].map(t => {
    if (!indeks.has(t)) { indeks.set(t, tabell.length); tabell.push(t); }
    return indeks.get(t).toString(36);
  });
  return w + "\t" + ids.join(",");
});

fs.writeFileSync(OUT, JSON.stringify(tabell) + "\n" + rader.join("\n") + "\n", "utf8");
console.log("ord:", rader.length, "| tagkombinasjonar:", tabell.length,
  "| MB:", (fs.statSync(OUT).size / 1e6).toFixed(2));
