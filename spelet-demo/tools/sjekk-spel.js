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
    if (!d.kant && !d.gang && !"DdE".includes(c)) feil.push(`${id}: dør ${d.ved} står på «${c}»`);
    // Dørene som i FF6 (runde 96): trapp ("opp" eller "ned") viser trinn i den opne døra inne (flisa E),
    // open: true står alltid open, og gang: true er ei dør på same kartet (utan til), på ei rute ein kan gå på.
    if (d.trapp !== undefined && !(["opp", "ned"].includes(d.trapp) && c === "E")) feil.push(`${id}: trapp på døra ${d.ved} må vere "opp" eller "ned", på ei E-flis`);
    if (d.open !== undefined && d.open !== true) feil.push(`${id}: open på døra ${d.ved} må vere true`);
    if (d.gang && (d.til || d.kant || "DdE".includes(c) || !c)) feil.push(`${id}: gangdøra ${d.ved} skal stå på ei rute ein går på, utan til og kant`);
    if (d.kant && !MERKE.test(c) && c !== "=") feil.push(`${id}: kantdør ${d.ved} står på «${c}»`);
    if (d.til) { if (!D.KART[d.til[0]]) feil.push(`${id}: ukjent kart ${d.til[0]}`); else if (!merkeI[d.til[0]][d.til[1]]) feil.push(`${id}: merket ${d.til[1]} finst ikkje i ${d.til[0]}`); else if (D.KART[d.til[0]].scene) feil.push(`${id}: dør til scenekartet ${d.til[0]}`); }
    if (d.vakt && !D.MANUS[d.vakt.manus]) feil.push(`${id}: vaktmanus ${d.vakt.manus} manglar`);
    if (d.krevOrd && !D.ORD[d.krevOrd]) feil.push(`${id}: krevOrd ${d.krevOrd}`);
  }
  // Trapper (runde 96): { "x,y": "loddrett" | "vassrett" }, på ruter ein kan gå på.
  for (const [r, v] of Object.entries(k.trapper || {})) { const [x, y] = r.split(",").map(Number), c = (k.rader[y] || "")[x];
    if (!["loddrett", "vassrett"].includes(v)) feil.push(`${id}: trappa ${r} må vere "loddrett" eller "vassrett"`);
    if (c == null || "DdE#".includes(c)) feil.push(`${id}: trappa ${r} står på «${c}»`); }
  for (const f of k.folk || []) { if (!merkeI[id][f.merke]) feil.push(`${id}: merket ${f.merke} til ${f.namn} manglar`); if (!D.MANUS[f.tale]) feil.push(`${id}: manus ${f.tale} manglar`); if (f.vesen ? !(D.FIENDAR[f.vesen] || require("fs").existsSync(require("path").join(__dirname, "..", "bilete", "spel", f.vesen + ".png"))) : !D.U[f.u]) feil.push(`${id}: utsjånad ${f.vesen || f.u}`); }
  for (const i of k.inngang || []) if (!D.MANUS[i.manus]) feil.push(`${id}: inngang ${i.manus}`);
  if (k.kvile && !D.SCENER[k.kvile]) feil.push(`${id}: kvilescena ${k.kvile} finst ikkje`);
  for (const ks of k.kister || []) { const c = k.rader[ks.ved[1]][ks.ved[0]]; if (!ks.gøymd && !ks.vis && c !== "K") feil.push(`${id}: kiste ${ks.ved} på «${c}»`); if ((ks.gøymd || ks.vis) && !MERKE.test(c) && c !== k.golv) feil.push(`${id}: gøymd kiste eller kiste med vis på «${c}»`); if (ks.ting && !D.TING[ks.ting] && !D.NOKKELTING[ks.ting]) feil.push(`${id}: ting ${ks.ting}`); if (ks.manus && !D.MANUS[ks.manus]) feil.push(`${id}: kistemanus ${ks.manus} manglar`); if (ks.vis && typeof ks.vis !== "function") feil.push(`${id}: vis på kista ${ks.id} må vere ein funksjon`); if (ks.bilete && !require("fs").existsSync(require("path").join(__dirname, "..", "bilete", "spel", "bygg", ks.bilete + ".png"))) feil.push(`${id}: kistebiletet ${ks.bilete} finst ikkje`); }
  // Naturting sett ut med vilje (bauta): på ei «o»-rute (fast, med skugge), med bilete og gyldig manus.
  for (const n of k.naturting || []) { const c = (k.rader[n.ved[1]] || "")[n.ved[0]]; if (c !== "o") feil.push(`${id}: naturting ${n.ved} på «${c}», skal stå på «o»`); if (n.manus && !D.MANUS[n.manus]) feil.push(`${id}: naturtingmanus ${n.manus} manglar`); if (!require("fs").existsSync(require("path").join(__dirname, "..", "bilete", "spel", "natur", n.bilete + ".png"))) feil.push(`${id}: naturtingbiletet ${n.bilete} finst ikkje`); }
  for (const lag of (k.fiendar || {}).lag || []) for (const f of lag) if (!D.FIENDAR[f]) feil.push(`${id}: fiende ${f}`);
  if (k.fiendar && k.fiendar.vis && typeof k.fiendar.vis !== "function") feil.push(`${id}: fiendar.vis må vere ein funksjon`);
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
  for (const k of Object.keys(st)) if (!["bak", "fig", "fjern", "hdma", "glod", "syklus", "kjelder", "ivar", "skyer", "skugge", "straalar", "stov", "sepia", "dagslys"].includes(k)) feil.push(`${stad}: ukjend nøkkel «${k}»`);
  if (st.bak) sjekkOp(st.bak, stad + " bak"); if (st.fig) sjekkOp(st.fig, stad + " fig"); if (st.fjern) sjekkOp(st.fjern, stad + " fjern");
  if (st.hdma && !(Array.isArray(st.hdma) && st.hdma.every((h, i) => Number.isInteger(h[0]) && h[0] >= 0 && h[0] <= 192 && er3(h[1], -31, 31) && (i === 0 || h[0] >= st.hdma[i - 1][0])))) feil.push(`${stad}: hdma må vere [[rad, [r, g, b]], …] med stigande rader frå 0 til 192`);
  if (st.glod) for (const l of ["bak", "fig"]) { if (!Array.isArray(st.glod[l]) || st.glod[l].length !== 3) feil.push(`${stad}: glod.${l} må ha tre nivå`); else st.glod[l].forEach((op, i) => sjekkOp(op, `${stad} glod.${l}[${i}]`)); }
  if (st.dagslys && !(st.kjelder && D.LYSKJELDER && D.LYSKJELDER.dor && D.LYSKJELDER.glugge)) feil.push(`${stad}: dagslys treng kjelder og glødformene dor og glugge`);
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
/* Terreng og parallakse (sjå «Parallakse» i motor.js): luft («-») berre med bakgrunnslag, under eit
   stup («M») er det meir stup eller luft, ramper («/») ligg i ein skrent med bakke over og under,
   bileta finst, faktoren er under 1 bak kartet og over 1 i forgrunnen, og det bakaste laget dekkjer
   heile skjermen der lufta kan synast, for alle kameraposisjonar. */
{
  const fsP = require("fs"), stiP = require("path");
  const pngStorleik = f => { const b = fsP.readFileSync(f); return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) }; };
  const VW = 20, VH = 12, S = 16;
  for (const [id, k] of Object.entries(D.KART)) {
    const R = k.rader, h = R.length, w = R[0].length, c = (x, y) => (R[y] || "")[x];
    if (R.some(r => r.includes("-")) && !(k.parallakse || []).length) feil.push(`${id}: luftfliser («-») utan parallakse`);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      if (c(x, y) === "N" && !(k.kameraOpp && (y === 0 || c(x, y - 1) === "-"))) feil.push(`${id}: kanten «N» på ${x},${y} skal ha luft over seg (eller stå i rad 0) på eit kart med kameraOpp`);
      if ("UZ".includes(c(x, y)) && (y === 0 || !"M-".includes(c(x, y + 1)) || /[MUZ\-s#]/.test(c(x, y - 1)))) feil.push(`${id}: overhenget «${c(x, y)}» på ${x},${y} skal ha bakke over seg og stup eller luft under`);
      if (c(x, y) === "M" && y < h - 1 && !"M-".includes(c(x, y + 1))) feil.push(`${id}: under stupet på ${x},${y} er «${c(x, y + 1)}» (skal vere stup eller luft)`);
      if (c(x, y) === "-" && y < h - 1 && !(c(x, y + 1) === "-" || (k.kameraOpp && c(x, y + 1) === "N" && R.slice(0, y + 1).every(r => r[x] === "-")))) feil.push(`${id}: under lufta på ${x},${y} er «${c(x, y + 1)}»`);
      if (c(x, y) === "/") {
        if (!"s/".includes(c(x - 1, y) || "s") || !"s/".includes(c(x + 1, y) || "s")) feil.push(`${id}: rampa på ${x},${y} ligg ikkje i ein skrent`);
        for (const dy of [-1, 1]) { const n = c(x, y + dy); if (n && /[sM\-#tiFRWv|]/.test(n)) feil.push(`${id}: rampa på ${x},${y} har «${n}» ${dy < 0 ? "over" : "under"} seg`); }
      }
    }
    if (k.kameraNed && k.kameraNed.ruter) for (const r of k.kameraNed.ruter) { const [x, y] = String(r).split(",").map(Number); if (!c(x, y) || /[MU\-s#]/.test(c(x, y))) feil.push(`${id}: kameraNed-ruta ${r} er ikkje bakke ein kan stå på`); }
    if (k.kameraNed && !((Number.isFinite(k.kameraNed.fra) || k.kameraNed.kant === true || Array.isArray(k.kameraNed.ruter)) && k.kameraNed.rader > 0 && (k.kameraNed.fart == null || Number.isInteger(k.kameraNed.fart)))) feil.push(`${id}: kameraNed treng fra, rader over 0 og fart i heile pikslar per tikk`);
    if (k.kameraOpp && !(Number.isFinite(k.kameraOpp.fra) && (k.kameraOpp.fart ? k.kameraOpp.rader > 0 : Number.isFinite(k.kameraOpp.til) && k.kameraOpp.fra > k.kameraOpp.til && k.kameraOpp.til >= 0))) feil.push(`${id}: kameraOpp treng fra > til >= 0, eller fra, rader og fart`);
    // Utsikta øvst: det første opp-laget dekkjer skjermen frå toppen, og det siste når ned under
    // graskanten i rad 0, for alle kameraposisjonar der lufta over kartet syner.
    const opp = (k.parallakse || []).filter(l => l.opp);
    if (k.kameraOpp && !opp.length) feil.push(`${id}: kameraOpp utan bakgrunnslag med opp: true`);
    if (k.kameraOpp && opp.length) {
      const lagPos = (l, kx, ky) => { const fk = Array.isArray(l.faktor) ? l.faktor : [l.faktor, l.faktor], ved = l.ved || [0, 0];
        return [Math.round(l.x - (kx - ved[0] * S) * fk[0]), Math.round(l.y - (ky - ved[1] * S) * fk[1])]; };
      const fil = l => stiP.join(__dirname, "..", "bilete", "spel", "parallakse", l.bilete + ".png");
      if (opp.every(l => fsP.existsSync(fil(l)))) {
        let kantRad = 0; R.forEach((r, y) => { if (y < 4 && r.includes("N")) kantRad = y; });   // den lågaste kanten øvst
        const [forst, sist] = [opp[0], opp[opp.length - 1]], df = pngStorleik(fil(forst)), ds = pngStorleik(fil(sist));
        stopp: for (let ky = -(k.kameraOpp.rader != null ? k.kameraOpp.rader : (k.kameraOpp.fra - k.kameraOpp.til) / 2) * S; ky < 0; ky++) for (const kx of [0, Math.max(0, w - VW) * S]) {
          const [fx, fy] = lagPos(forst, kx, ky), [sx, sy] = lagPos(sist, kx, ky);
          if (fx > 0 || fx + df.w < VW * S || (fy > 0 && !k.luftfarge)) { feil.push(`${id}: ${forst.bilete} dekkjer ikkje himmelen med kameraet på ${kx},${ky}`); break stopp; }
          if (sy + ds.h < kantRad * S + S - ky || sx > 0 || sx + ds.w < VW * S) { feil.push(`${id}: ${sist.bilete} når ikkje ned til kanten med kameraet på ${kx},${ky}`); break stopp; }
        }
      }
    }
    const lag = [["parallakse", k.parallakse], ["forgrunn", k.forgrunn]];
    for (const [namn, liste] of lag) (liste || []).forEach((l, i) => {
      const stad = `${id} ${namn}[${i}]`, f = stiP.join(__dirname, "..", "bilete", "spel", "parallakse", l.bilete + ".png");
      if (!fsP.existsSync(f)) { feil.push(`${stad}: bilete/spel/parallakse/${l.bilete}.png finst ikkje (køyr tools/pikselkunst/utsikt.py)`); return; }
      const fk = Array.isArray(l.faktor) ? l.faktor : [l.faktor, l.faktor];
      if (!fk.every(v => typeof v === "number" && (namn === "parallakse" ? v >= 0 && v <= 2 : v >= 1)) || (namn === "forgrunn" && !fk.some(v => v > 1))) feil.push(`${stad}: faktor ${l.faktor} (bak kartet 0 til 2, 1 er fast, i forgrunnen over 1)`);
      if (l.variant && !(liste || []).some(m => m !== l && m.variant === (k.variant || "fast")) && l.variant !== (k.variant || "fast")) feil.push(`${stad}: varianten ${l.variant}, men kartet har ingen lag i varianten ${k.variant || "fast"}`);
      if (!Number.isFinite(l.x) || !Number.isFinite(l.y) || (l.ved && !(Array.isArray(l.ved) && l.ved.length === 2))) feil.push(`${stad}: treng x, y og ved: [kx, ky]`);
      const iBruk = m => !m.opp && (!m.variant || m.variant === (k.variant || "fast"));   // laga under kartet i varianten kartet brukar
      if (namn !== "parallakse" || !iBruk(l) || liste.findIndex(iBruk) !== i) return;   // det bakaste laget under kartet
      // Det bakaste laget: dekkjer det skjermen frå toppen av stupet og ned, der lufta kan syne?
      const { w: bw, h: bh } = pngStorleik(f), ved = l.ved || [0, 0];
      let luftRad = R.findIndex((r, y) => y > 0 && r.includes("-") && [...r].some((ch, x) => ch === "-" && "M-".includes(c(x, y - 1)) && !R.slice(0, y).every(rr => rr[x] === "-")));   // lufta nedst, ikkje den øvst
      for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) if ("MUZ".includes(c(x, y)) && c(x, y + 1) === "-") luftRad = Math.min(luftRad, y);   // nedste stupflis løyser seg opp
      if (luftRad < 0) return;
      for (let ky = 0; ky <= Math.max(0, h - VH) * S; ky++) {
        const topp = luftRad * S - ky; if (topp >= VH * S) continue;
        for (const kx of [0, Math.max(0, w - VW) * S]) {
          const sx = Math.round(l.x - (kx - ved[0] * S) * fk[0]), sy = Math.round(l.y - (ky - ved[1] * S) * fk[1]);
          if (sx > 0 || sx + bw < VW * S || sy > Math.max(0, topp) || sy + bh < VH * S) { feil.push(`${stad}: dekkjer ikkje lufta med kameraet på ${kx},${ky} (biletet står på ${sx},${sy}, ${bw} × ${bh})`); return; }
        }
      }
    });
  }
}
/* Skogkanten og trea («#», «i», «F») må ikkje stengje vegen: frå den første døra eller det første
   talmerket skal ein nå alle dører, talmerke, kister og folk (kister og folk frå ei rute ved sida av).
   Fast grunn står i FAST i js/rpg/pikslar.js. */
{
  const kjelde = require("fs").readFileSync(require("path").join(__dirname, "..", "js", "rpg", "pikslar.js"), "utf8");
  const FAST = new Set(JSON.parse(kjelde.match(/const FAST = new Set\((\[[^\]]*\])\)/)[1]));
  // Kanttypen (kant på kartet) må finnast i KANTTYPE i pikslar.js.
  const kanttypar = [...kjelde.match(/const KANTTYPE = \{([\s\S]*?)\n  \};/)[1].matchAll(/\n    (\w+): \{/g)].map(m => m[1]);
  for (const [id, k] of Object.entries(D.KART)) if (k.kant && !kanttypar.includes(k.kant)) feil.push(`${id}: ukjend kanttype «${k.kant}» (kjende: ${kanttypar.join(", ")})`);
  for (const [id, k] of Object.entries(D.KART)) {
    if (k.scene || k.inne) continue;
    const R = k.rader, h = R.length, w = R[0].length, m = merkeI[id];
    const dor = (x, y) => (k.dorer || []).some(d => d.ved[0] === x && d.ved[1] === y);
    const fast = (x, y) => { const c = (R[y] || "")[x]; if (c == null) return true; if ("DdE".includes(c)) return !dor(x, y); return FAST.has(c) && !/[0-9@%$!&*]/.test(c); };
    const mal = [...(k.dorer || []).map(d => [d.ved, false]), ...Object.entries(m).filter(([c]) => /[0-9]/.test(c)).map(([, p]) => [p, false]),
      ...(k.kister || []).map(ks => [ks.ved, true]), ...(k.folk || []).map(f => [m[f.merke], true]),
      // Lagringsstadene (lykta L og bålplassane å og ÅÅ) må nåast frå ei rute ved sida av.
      ...R.flatMap((r, y) => [...r].map((c, x) => "LåÅ".includes(c) ? [[x, y], true] : null).filter(Boolean))].filter(([p]) => p);
    if (!mal.length) continue;
    const start = mal.find(([, ved]) => !ved)?.[0] || mal[0][0], sett = new Set([start + ""]), ko = [start];
    const kisteVed = (x, y) => (k.kister || []).some(ks => ks.ved[0] === x && ks.ved[1] === y);
    while (ko.length) {
      const [x, y] = ko.shift();
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy, n = nx + "," + ny;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h || sett.has(n) || fast(nx, ny) || kisteVed(nx, ny)) continue;
        sett.add(n); ko.push([nx, ny]);
      }
    }
    for (const [[x, y], ved] of mal) {
      const ok = ved ? [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => sett.has((x + dx) + "," + (y + dy))) : sett.has(x + "," + y);
      if (!ok) feil.push(`${id}: ${x},${y} kan ikkje nåast frå ${start} (stengjer skogkanten eller eit tre vegen?)`);
    }
  }
}
// Hus og inventar som figurar: bildefila må finnast
const fs_ = require("fs"), sti_ = require("path");
for (const [id, k] of Object.entries(D.KART)) for (const b of k.bygg || []) {
  const f = sti_.join(__dirname, "..", "bilete", "spel", "bygg", b.id + ".png");
  if (!fs_.existsSync(f)) feil.push(`${id}: bygg ${b.id} manglar bilete (${f})`);
  if (typeof b.h !== "number") feil.push(`${id}: bygg ${b.id} manglar h`);
}
// Eit vesen på kartet er ein fiende i FIENDAR, eller eit handteikna bilete berre til kartet
// (bilete/spel/<namn>.png, til dømes den vesle rotta i stabburet).
const vesen = v => !!D.FIENDAR[v] || require("fs").existsSync(require("path").join(__dirname, "..", "bilete", "spel", v + ".png"));
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
    if (s.inn && !(s.inn.vesen ? vesen(s.inn.vesen) : D.U[s.inn.u])) feil.push(`${stad}: utsjånad ${s.inn.vesen || s.inn.u}`);
    if (s.byt && ((s.u && !D.U[s.u]) || (s.vesen && !vesen(s.vesen)))) feil.push(`${stad}: byt til ukjend utsjånad ${s.u || s.vesen}`);
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
   inngang, vakt, kister og kvile, og scener gjennom manusa som spelar dei. Scenekart i manuset er med. */
const karteFor = {};                                                  // manus- eller scene-id -> Set med kart
const knyt = (nokkel, kart) => (karteFor[nokkel] || (karteFor[nokkel] = new Set())).add(kart);
for (const [id, k] of Object.entries(D.KART)) {
  for (const f of k.folk || []) knyt("m:" + f.tale, id);
  for (const i of k.inngang || []) knyt("m:" + i.manus, id);
  for (const d of k.dorer || []) if (d.vakt) knyt("m:" + d.vakt.manus, id);
  for (const ks of k.kister || []) if (ks.manus) knyt("m:" + ks.manus, id);
  if (k.kvile) knyt("s:" + k.kvile, id);
}
knyt("m:start", "asen-stova");                                         // ei ny reise byrjar i stova
const alleSteg = x => { const ut = []; (function samle(x) { if (Array.isArray(x)) x.forEach(samle); else if (x && typeof x === "object") { ut.push(x); Object.values(x).forEach(samle); } })(x); return ut; };
// Scener får karta til manuset som spelar dei.
for (let n = 0; n < 4; n++) for (const [id, m] of Object.entries(D.MANUS)) for (const s of alleSteg(m)) if (s.scene) for (const k of karteFor["m:" + id] || []) knyt("s:" + s.scene, k);
// Kva bygg som er sete og senger (SETE og SENG i pikslar.js), og breidda til eit bygg i fliser (frå PNG-fila).
const pikslarKjelde = require("fs").readFileSync(require("path").join(__dirname, "..", "js", "rpg", "pikslar.js"), "utf8");
const moeblar = { SETE: new Set(), SENG: new Set() };
for (const krav of ["SETE", "SENG"]) {
  const fra = pikslarKjelde.indexOf(`const ${krav} = {`), blokk = pikslarKjelde.slice(fra, pikslarKjelde.indexOf("\n  };", fra));
  for (const m of blokk.matchAll(/"(inne-[a-z0-9-]+)"/g)) moeblar[krav].add(m[1]);
  for (const m of blokk.matchAll(/inne-kyrkjebenk-\$\{d\}\$\{v\}/g)) for (const d of ["h", "v"]) for (const v of ["", "2", "3", "4", "5"]) moeblar[krav].add(`inne-kyrkjebenk-${d}${v}`);
}
function byggBreidd(id) {
  const b = require("fs").readFileSync(require("path").join(__dirname, "..", "bilete", "spel", "bygg", id + ".png"));
  return Math.max(1, Math.round((b.readUInt32BE(16) - 8) / 16));
}
function sjekkNamn(nokkel, steg, stad) {
  const kart = karteFor[nokkel];
  if (!kart) return;
  const st = alleSteg(steg);
  const namn = new Set(["Ivar", "Huldra"]);
  for (const s of st) { if (s.inn) namn.add(s.inn.namn); if (s.byt && s.namn) namn.add(s.namn); if (s.scenekart) for (const f of D.KART[s.scenekart].folk || []) namn.add(f.namn); }
  for (const k of kart) {
    const lov = new Set([...namn, ...(D.KART[k].folk || []).map(f => f.namn), ...Object.keys(merkeI[k])]);
    for (const s of st) for (const f of ["s", "gaa", "snu", "pose", "byt", "fjern", "kven", "fraa", "fra", "mot", "spot", "sitje", "liggje", "reis"]) {
      const v = s[f];
      if (typeof v === "string" && !(f === "mot" && "s" in s) && !lov.has(v) && !(f === "fra" && !s.parti)) feil.push(`${stad} på ${k}: «${v}» (${f}) finst ikkje på kartet`);
    }
    for (const s of st) if (typeof s.kamera === "string" && !lov.has(s.kamera)) feil.push(`${stad} på ${k}: kamera mot «${s.kamera}» som ikkje finst`);
    // Dørsteget { dor: [x, y] eller merke, open: true | false }: ruta må vere ei dør på kartet (ikkje ei kantdør).
    for (const s of st) if ("dor" in s) {
      const r = typeof s.dor === "string" ? merkeI[k][s.dor] : s.dor;
      if (!Array.isArray(r) || !(D.KART[k].dorer || []).some(d => !d.kant && d.ved[0] === r[0] && d.ved[1] === r[1])) feil.push(`${stad} på ${k}: dor ${JSON.stringify(s.dor)} er inga dør på kartet`);
      if (s.open !== undefined && typeof s.open !== "boolean") feil.push(`${stad} på ${k}: open på dørsteget må vere true eller false`);
    }
    // Møblar (sitje, liggje): ruta må vere eit sete (bygg i SETE eller naturting med sete) eller ei seng (bygg i SENG).
    for (const s of st) for (const [f, kva, krav] of [["sitje", "sete", "SETE"], ["liggje", "seng", "SENG"]]) {
      if (!(f in s)) continue;
      const r = typeof s[kva] === "string" ? merkeI[k][s[kva]] : s[kva];
      if (!Array.isArray(r)) { feil.push(`${stad} på ${k}: ${f} utan ${kva}`); continue; }
      const [x, y] = r, kjende = moeblar[krav];
      const ok = (D.KART[k].bygg || []).some(b => kjende.has(b.id) && x >= b.x && x < b.x + byggBreidd(b.id) && y >= b.y && y < b.y + b.h)
        || (krav === "SETE" && (D.KART[k].naturting || []).some(n => n.sete && n.ved[0] === x && n.ved[1] === y));
      if (!ok) feil.push(`${stad} på ${k}: ${f} på ${x},${y}, men der er ikkje noko ${kva}`);
    }
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
/* Lyd (js/rpg/lyd.js): kvar låt og kvar lydeffekt koden viser til, finst i lyd/. Låtene og
   miljølydane som skal loope, har looppunkt (LOOPSTART og LOOPLENGTH) innanfor lengda av fila,
   og fanfaren har ingen. Lengda er siste granulposisjon i Ogg-fila delt på samplefrekvensen.
   Om lyden faktisk spelar, må prøvast i ein nettlesar: Edge utan skjerm dekodar ikkje lyd. */
{
  const fs = require("fs"), sti = require("path"), lydMappe = sti.join(__dirname, "..", "lyd");
  Object.assign(window, { addEventListener: () => {} }); global.location = { search: "" };
  global.localStorage = { getItem: () => null, setItem: () => {} };
  require(sti.join(__dirname, "..", "js", "rpg", "lyd.js"));
  const K = window.Lyd.kjelder;
  const ogg = fil => {
    const b = fs.readFileSync(fil), s = b.toString("latin1", 0, Math.min(b.length, 8192));
    const v = s.indexOf("\x01vorbis"), rate = v >= 0 ? b.readUInt32LE(v + 12) : 44100;
    const j = b.lastIndexOf("OggS"), lengd = Number(b.readBigInt64LE(j + 6)) / rate;
    const st = /LOOPSTART=(\d+)/.exec(s), ln = /LOOPLENGTH=(\d+)/.exec(s);
    return { lengd, loop: st && ln ? { start: +st[1] / rate, slutt: (+st[1] + +ln[1]) / rate } : null };
  };
  const sjekkFil = (fil, skalLoope, kven) => {
    if (!fs.existsSync(fil)) return feil.push(`lyd: ${sti.relative(lydMappe, fil)} finst ikkje (${kven})`);
    const { lengd, loop } = ogg(fil);
    if (skalLoope && !loop) feil.push(`lyd: ${sti.basename(fil)} skal loope, men har ikkje looppunkt`);
    if (!skalLoope && loop) feil.push(`lyd: ${sti.basename(fil)} skal ikkje loope`);
    if (loop && (loop.slutt > lengd + 0.05 || loop.slutt <= loop.start)) feil.push(`lyd: looppunkta i ${sti.basename(fil)} ligg utanfor fila`);
  };
  const musikk = new Set([...K.faste, ...Object.values(K.BOSS_LAAT), ...Object.values(K.KART_LYD).map(v => v[0])]);
  // Tittellåta har ikkje looppunkt (ho blir spela heil og byrjar på nytt), og fanfaren loopar ikkje.
  for (const id of musikk) sjekkFil(sti.join(lydMappe, "musikk", id + ".ogg"), !["tittel", ...K.EIN_GONG].includes(id), "musikk");
  for (const [k, [, mi]] of Object.entries(K.KART_LYD)) { if (!D.KART[k]) feil.push(`lyd: kartet ${k} i KART_LYD finst ikkje`); if (mi) sjekkFil(sti.join(lydMappe, "sfx", `sfx.${mi}.ogg`), true, "miljø på " + k); }
  for (const k of Object.keys(D.KART)) if (!K.KART_LYD[k]) feil.push(`lyd: kartet ${k} har inga låt i KART_LYD`);
  // Lydeffektane: lyd("…") og Lyd.sfx("…") i koden, { lyd: "…" } i manus, og dei som blir sette saman i kamp.js.
  const kode = ["motor.js", "spel.js", "kamp.js", "data.js"].map(f => fs.readFileSync(sti.join(__dirname, "..", "js", "rpg", f), "utf8")).join(String.fromCharCode(10));
  const sfx = new Set([...kode.matchAll(/\blyd\(\s*"([a-z.]+)"/g), ...kode.matchAll(/Lyd\.sfx\(\s*"([a-z.]+)"/g), ...kode.matchAll(/\blyd: "([a-z.]+)"/g)].map(m => m[1]));
  for (const l of kode.split(String.fromCharCode(10)).filter(l => /\blyd\(/.test(l) && /\?/.test(l))) for (const s of l.matchAll(/"([a-z]+\.[a-z.]+)"/g)) sfx.add(s[1]);   // val med ?: i lyd(…)
  for (const g of ["blekk", "papir", "vette", "eld", "smaadyr"]) { sfx.add(`fiende.${g}.aatak`); sfx.add(`fiende.${g}.skade`); }
  for (const f of ["diftong", "hard", "kv", "j", "smaa", "grunn"]) { sfx.add(`galdr.${f}`); sfx.add(`galdr.${f}.dansk`); }
  sfx.add("galdr.nokkel");
  for (const id of sfx) {
    const n = K.VARIANTAR[id];
    for (const v of n ? Array.from({ length: n }, (_, i) => `.${i + 1}`) : [""]) sjekkFil(sti.join(lydMappe, "sfx", `sfx.${id}${v}.ogg`), false, "lydeffekt");
  }
  const brukt = new Set([...sfx].flatMap(id => K.VARIANTAR[id] ? Array.from({ length: K.VARIANTAR[id] }, (_, i) => `sfx.${id}.${i + 1}.ogg`) : [`sfx.${id}.ogg`]).concat(Object.values(K.KART_LYD).map(v => v[1]).filter(Boolean).map(m => `sfx.${m}.ogg`)));
  const ubrukt = fs.readdirSync(sti.join(lydMappe, "sfx")).filter(f => !brukt.has(f));
  if (ubrukt.length) feil.push(`lyd: lydeffektar ingen brukar: ${ubrukt.join(", ")}`);
  console.log(`Lyd: ${musikk.size} låtar og ${sfx.size} lydeffektar sjekka.`);
}
const lytta = new Set(); (function samle(x) { if (Array.isArray(x)) x.forEach(samle); else if (x && typeof x === "object") { if (x.lytt) lytta.add(x.lytt[0]); if (x.tilbod) lytta.add(x.tilbod[0]); Object.values(x).forEach(samle); } })([D.MANUS, D.SCENER]);
console.log("Ord som kan samlast i kapittel 1:", [...lytta].join(", "));
console.log("Ord som ikkje finst i kapittel 1:", Object.keys(D.ORD).filter(i => !lytta.has(i)).join(", "));
console.log(feil.length ? feil.join("\n") : "Alt ser rett ut.");
