/* Lagar data/nn-ordliste.txt av Norsk ordbank (nynorsk 2012) frå Nasjonalbiblioteket. */
const fs = require("fs");

const SRC = process.argv[2];
const OUT = process.argv[3];

const lines = fs.readFileSync(SRC, "latin1").split(/\r?\n/);
const set = new Set();
const normeringar = new Set();
let normerte = 0;

const OK = /^[a-zæøåéèêóòôäëüA-ZÆØÅÉÈÊÓÒÔÄËÜ.'-]+$/;

for (let i = 1; i < lines.length; i++) {
  const c = lines[i].split("\t");
  if (c.length < 9) continue;
  let ord = c[2];
  const norm = c[8];
  normeringar.add(norm);
  if (norm !== "normert") continue;
  normerte++;
  ord = ord.replace(/\$/g, "");           // $ markerer samansetningsledd
  if (!ord || !OK.test(ord)) continue;
  set.add(ord.toLowerCase());
}

const out = [...set].sort();
fs.writeFileSync(OUT, out.join("\n") + "\n", "utf8");
console.log("normeringsverdiar:", [...normeringar].join(" | "));
console.log("normerte former:", normerte, "| unike ord:", out.length,
  "| MB:", (fs.statSync(OUT).size / 1e6).toFixed(2));

const prov = ["ikke", "hun", "være", "boken", "bilene", "kastet", "spiste", "si", "de", "bare",
  "skole", "skule", "sitte", "ligge", "legge", "lærar", "lærer", "jenta", "gamal", "sjølv",
  "so", "lav", "ikkje", "eg", "bilar", "bilane", "boka", "kasta", "skulebibliotek"];
console.log(prov.map(w => (set.has(w) ? "+" : "-") + w).join(" "));
