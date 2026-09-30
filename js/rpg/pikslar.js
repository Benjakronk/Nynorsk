/* Pikselgrafikken i «Aasen: Språkvandringa», i 16-bitsstil: fliser, figurar og fiendar.

   Nesten alt blir teikna i kode. Figurar og fiendar blir bygde som eit
   rutenett av «materiale» (hud, hår, jakke, blekk …). Så får kvart materiale
   ein fargeskala (fem tonar frå skugge til lys), lyset kjem frå oppe til
   venstre, og ein mørk omrisslinje blir lagd rundt. Det gir same uttrykket
   som i konsollspela på 90-talet. Blekklatten (bilete/spel/blekklatten.png)
   er teikna for hand og viser stilen resten følgjer.

   Pikslar.flis(teikn, t, x, y, golv)  16 × 16-lerret for eit flisteikn
   Pikslar.topp(teikn)                 det som stikk opp over flisa (tretoppar), eller null
   Pikslar.figur(utsjånad)             { rammer[retning][steg] }, 16 × 24 pikslar,
                                       retning 0 ned, 1 opp, 2 venstre, 3 høgre, steg 0 står, 1 og 2 går
   Pikslar.fiende(namn)                lerret for ein fiende i kamp */
window.Pikslar = (function () {
  "use strict";
  const S = 16, FW = 16, FH = 24;

  function lerret(w, h) { const c = document.createElement("canvas"); c.width = w; c.height = h == null ? w : h; return c; }
  const hash = (x, y, s) => { let h = (x * 374761393 + y * 668265263 + s * 1442695041) | 0; h = (h ^ (h >>> 13)) * 1274126177; return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
  const px = (g, x, y, f, w = 1, h = 1) => { g.fillStyle = f; g.fillRect(x, y, w, h); };

  /* ---------- Fargar ---------- */
  const hx = h => { h = h.replace("#", ""); if (h.length === 3) h = h.split("").map(c => c + c).join(""); const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const rgb = a => "#" + a.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
  const blend = (a, b, t) => { const A = hx(a), B = hx(b); return rgb(A.map((v, i) => v + (B[i] - v) * t)); };
  // Skuggane dreg mot djup fiolett og lyset mot varm kvit, slik pikselkunstnarar gjer.
  const SKUGGE = "#1a1238", LYS = "#fff1c4", OMRISS = "#0a0514";
  const rampar = new Map();
  function ramp(base) {
    if (rampar.has(base)) return rampar.get(base);
    const r = [blend(base, SKUGGE, 0.62), blend(base, SKUGGE, 0.34), base, blend(base, LYS, 0.26), blend(base, LYS, 0.52)];
    rampar.set(base, r);
    return r;
  }

  /* ---------- Materialrutenett ---------- */
  function Rutenett(w, h) {
    const m = Array.from({ length: h }, () => Array(w).fill(null));
    const R = {
      w, h, m,
      get: (x, y) => (x < 0 || y < 0 || x >= w || y >= h) ? null : m[y][x],
      set(k, x, y) { if (x >= 0 && y >= 0 && x < w && y < h) m[y][x] = k; return R; },
      rect(k, x, y, rw, rh) { for (let j = 0; j < rh; j++) for (let i = 0; i < rw; i++) R.set(k, x + i, y + j); return R; },
      ell(k, cx, cy, rx, ry) { for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) { const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry; if (dx * dx + dy * dy <= 1) R.set(k, x, y); } return R; },
      // Vassrett strek på rad y frå x0 til og med x1
      rad(k, y, x0, x1) { for (let x = x0; x <= x1; x++) R.set(k, x, y); return R; },
      // Fyller rad for rad: [[y, x0, x1], …]
      form(k, rader) { for (const [y, x0, x1] of rader) R.rad(k, y, x0, x1); return R; },
      spegl() { for (const rad of m) rad.reverse(); return R; },
    };
    return R;
  }
  /* Teiknar rutenettet. pal: { materiale: farge | { fast: farge } | { farge, rund: true } }.
     «fast» er ein farge utan skugge (auge, munn). «rund» gir mjuk skugge over heile
     forma (hovud, blekkropp), elles får berre kantane lys og skugge. */
  function mal(R, pal, opt = {}) {
    const c = lerret(R.w, R.h), g = c.getContext("2d");
    const boks = {};
    for (let y = 0; y < R.h; y++) for (let x = 0; x < R.w; x++) {
      const k = R.m[y][x]; if (k == null) continue;
      const b = boks[k] || (boks[k] = { x0: x, y0: y, x1: x, y1: y });
      b.x0 = Math.min(b.x0, x); b.y0 = Math.min(b.y0, y); b.x1 = Math.max(b.x1, x); b.y1 = Math.max(b.y1, y);
    }
    for (let y = 0; y < R.h; y++) for (let x = 0; x < R.w; x++) {
      const k = R.m[y][x]; if (k == null) continue;
      let p = pal[k]; if (p == null) p = "#ff00ff";
      if (typeof p === "string") p = { farge: p };
      if (p.fast) { px(g, x, y, p.fast); continue; }
      const r = ramp(p.farge);
      let v = 2;
      if (p.rund) {
        const b = boks[k], bw = Math.max(1, b.x1 - b.x0), bh = Math.max(1, b.y1 - b.y0);
        const u = ((x - b.x0) / bw) * 0.45 + ((y - b.y0) / bh) * 0.55;
        v = 3.6 - u * 3;
      }
      if (R.get(x, y - 1) !== k) v += 1;
      else if (R.get(x - 1, y) !== k) v += 0.5;
      if (R.get(x, y + 1) !== k) v -= 1;
      if (R.get(x + 1, y) !== k) v -= 0.6;
      const f = v - Math.floor(v);
      let i = Math.floor(v) + (f > 0.5 && (x + y) % 2 === 0 ? 1 : 0);
      i = Math.max(0, Math.min(4, i));
      px(g, x, y, r[i]);
    }
    if (opt.omriss !== false) {
      const d = g.getImageData(0, 0, R.w, R.h), a = d.data;
      const fylt = (x, y) => x >= 0 && y >= 0 && x < R.w && y < R.h && R.m[y][x] != null && !((pal[R.m[y][x]] || {}).utanOmriss);
      const [or, og, ob] = hx(opt.omrissFarge || OMRISS);
      for (let y = 0; y < R.h; y++) for (let x = 0; x < R.w; x++) {
        if (R.m[y][x] != null) continue;
        if (fylt(x - 1, y) || fylt(x + 1, y) || fylt(x, y - 1) || fylt(x, y + 1)) { const i = (y * R.w + x) * 4; a[i] = or; a[i + 1] = og; a[i + 2] = ob; a[i + 3] = 255; }
      }
      g.putImageData(d, 0, 0);
    }
    return c;
  }

  /* ---------- Fliser ---------- */
  const RAMP = {
    gras: ["#27502d", "#35683a", "#4a8a3f", "#68a84a", "#92c65e"],
    villgras: ["#1d3f28", "#285632", "#3a7236", "#548f42", "#79ad50"],
    vatn: ["#172c66", "#1f418c", "#2a5cac", "#4282cc", "#9ed2f2"],
    sand: ["#8a6a48", "#b08c5c", "#ceac74", "#e2c890", "#f2e2b4"],
    jord: ["#4a3020", "#6a4630", "#8a6040", "#a87c52", "#c89c6a"],
    stein: ["#2a2838", "#44425a", "#686680", "#8e8ca4", "#bcbccc"],
    tommer: ["#2a160e", "#4a2a18", "#6c4024", "#8c5a32", "#b07c48"],
    plank: ["#4a2e1a", "#6e4626", "#8e6034", "#ac7c46", "#c89a60"],
    kvit: ["#6e6c86", "#a2a2b8", "#d2d0dc", "#ecebf0", "#ffffff"],
    torv: ["#26401e", "#35582a", "#4a7234", "#628c40", "#86a852"],
    skifer: ["#1a1e2e", "#283046", "#3a4460", "#52607e", "#76849e"],
    korn: ["#6a4a1e", "#9a7028", "#c49a38", "#dcbc54", "#f0dc88"],
    raud: ["#3a0e18", "#62182a", "#8a2638", "#b03c46", "#d06a64"],
    blekk: ["#080010", "#101028", "#201848", "#383070", "#5848a0"],
    stamme: ["#2e1a14", "#4a2c1c", "#6a4428", "#8a5e36", "#a87c4c"],
  };
  const R_ = RAMP;
  function spreidd(v, fro, n, fn) { for (let i = 0; i < n; i++) fn(Math.floor(hash(i, v, fro) * S), Math.floor(hash(i, v + 17, fro + 3) * S), hash(i, v + 31, fro + 7)); }
  function gras(g, v) {
    const r = R_.gras;
    px(g, 0, 0, r[2], S, S);
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      const h = hash(x + v * 16, y, 11);
      if (h < 0.05) px(g, x, y, r[1]); else if (h > 0.95) px(g, x, y, r[3]);
    }
    spreidd(v, 5, 4, (x, y) => { px(g, x, y, r[1]); px(g, x - 1, y - 1, r[3]); px(g, x + 1, y - 1, r[3]); px(g, x, y - 2, r[4]); });
  }
  let golvNo = "P";
  const underGolv = (g, t, v) => (FLIS[golvNo] || FLIS.P)(g, t, v);
  const FLIS = {
    ".": (g, t, v) => {
      // I utmarka (golv «,») er vanleg gras mørkt som villgraset, men lågt.
      if (golvNo !== ",") return gras(g, v);
      const r = R_.villgras; px(g, 0, 0, r[2], S, S);
      for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) { const h = hash(x + v * 16, y, 23); if (h < 0.08) px(g, x, y, r[1]); else if (h > 0.94) px(g, x, y, r[3]); }
      spreidd(v, 25, 3, (x, y) => { px(g, x, y, r[1]); px(g, x, y - 1, r[3]); });
    },
    ",": (g, t, v) => {
      const r = R_.villgras;
      px(g, 0, 0, r[1], S, S);
      for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) if (hash(x + v * 16, y, 21) < 0.1) px(g, x, y, r[0]);
      for (let i = 0; i < 9; i++) {
        const x = Math.floor(hash(i, v, 22) * 15), y = 5 + Math.floor(hash(i, v, 23) * 11);
        px(g, x, y - 4, r[3]); px(g, x, y - 3, r[3]); px(g, x, y - 2, r[2]); px(g, x, y - 1, r[2]); px(g, x + 1, y - 2, r[2]); px(g, x + 1, y - 1, r[1]);
        px(g, x, y - 5, r[4]);
      }
    },
    '"': (g, t, v) => {
      gras(g, v);
      const blom = [["#f8f0d8", "#d8c8a0", "#f8d840"], ["#f8d840", "#c09020", "#f8f0d8"], ["#e878a8", "#a84068", "#f8e0f0"], ["#a8b8f8", "#6070c8", "#f8f8ff"]];
      spreidd(v, 31, 4, (x, y, h) => { const [a, b, c] = blom[Math.floor(h * 4)]; x = Math.min(13, Math.max(1, x)); y = Math.min(12, Math.max(1, y)); px(g, x - 1, y, a); px(g, x + 1, y, a); px(g, x, y - 1, a); px(g, x, y + 1, b); px(g, x, y, c); px(g, x, y + 2, R_.gras[1]); });
    },
    "~": (g, t, v) => {
      const r = R_.vatn, f = Math.floor(t / 250) % 8;
      px(g, 0, 0, r[2], S, S);
      for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) if ((x + y * 3) % 7 === 0 && y % 4 === 1) px(g, x, y, r[1]);
      for (let k = 0; k < 3; k++) {
        const y = 2 + k * 5, x = (k * 6 + f * 2 + v * 3) % S;
        px(g, x, y, r[3], 4, 1); px(g, (x + 1) % S, y - 1, r[4], 2, 1); px(g, (x + 4) % S, y + 1, r[1], 3, 1);
      }
      if ((f + v) % 4 === 0) px(g, (v * 5 + 3) % S, (v * 7 + 9) % S, "#ffffff");
    },
    "_": (g, t, v) => { const r = R_.sand; px(g, 0, 0, r[2], S, S); for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) { const h = hash(x + v * 16, y, 41); if (h < 0.1) px(g, x, y, r[1]); else if (h > 0.9) px(g, x, y, r[3]); } },
    "=": (g, t, v) => {
      const r = R_.jord; px(g, 0, 0, r[2], S, S);
      for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) { const h = hash(x + v * 16, y, 51); if (h < 0.09) px(g, x, y, r[1]); else if (h > 0.93) px(g, x, y, r[3]); }
      spreidd(v, 52, 3, (x, y) => { px(g, x, y, R_.stein[3], 2, 1); px(g, x, y + 1, R_.stein[1], 2, 1); });
    },
    "^": (g, t, v) => {
      const r = R_.stein; px(g, 0, 0, r[1], S, S);
      for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
        const lag = (y + Math.floor(hash(Math.floor(x / 5), v, 61) * 4)) % 6;
        px(g, x, y, lag === 0 ? r[3] : lag === 1 ? r[2] : lag === 5 ? r[0] : r[1]);
      }
      spreidd(v, 62, 2, (x, y) => { px(g, x, y, r[0], 1, 3); px(g, x + 1, y + 2, r[0], 1, 2); });
    },
    "o": (g, t, v) => { gras(g, v); const R = Rutenett(16, 16).ell("s", 8, 9.5, 6.5, 5); R.rad(null, 15, 0, 15); g.drawImage(mal(R, { s: { farge: "#686680", rund: true } }), 0, 0); },
    "h": (g, t, v) => { gras(g, v); const R = Rutenett(16, 16).ell("h", 8, 9, 7.5, 6.5); g.drawImage(mal(R, { h: { farge: "#4a8a3f", rund: true } }), 0, 0); px(g, 4, 6, R_.gras[4], 2, 1); px(g, 7, 5, R_.gras[4], 3, 1); },
    "x": (g, t, v) => {
      // Grav: annankvar trekross og gravstein, med ein låg grashaug framfor
      gras(g, v);
      px(g, 4, 13, "rgba(20,24,50,.3)", 9, 2);
      if (v % 2 === 0) {
        const R = Rutenett(16, 16).rect("k", 7, 2, 2, 12).rect("k", 4, 5, 8, 2);
        g.drawImage(mal(R, { k: "#7a5634" }), 0, 0);
      } else {
        const R = Rutenett(16, 16).ell("s", 8, 6, 4, 3.5).rect("s", 4, 6, 8, 7);
        g.drawImage(mal(R, { s: { farge: "#7a788a", rund: true } }), 0, 0);
        px(g, 6, 7, "#4a4858", 4, 1); px(g, 6, 9, "#4a4858", 4, 1); px(g, 5, 4, "#98b44c", 2, 1);
      }
      px(g, 4, 14, "#68a84a", 8, 1);
    },
    "|": (g, t, v) => {
      gras(g, v);
      const R = Rutenett(16, 16);
      for (const x of [2, 13]) R.rect("p", x, 3, 1, 12);
      for (let i = 0; i < 3; i++) for (let k = 0; k < 16; k++) R.set("s", k, 12 - Math.floor(k * 0.4) - i * 3);
      g.drawImage(mal(R, { p: "#6a4428", s: "#8e6034" }), 0, 0);
    },
    "j": (g, t, v) => gras(g, v),   // sjølve muren er ein figur, sjå steingard()
    "Y": (g, t, v) => {
      const r = R_.korn; px(g, 0, 0, r[1], S, S);
      for (let x = 0; x < S; x += 4) for (let y = 0; y < S; y += 2) { px(g, x + 1, y, r[3], 1, 2); px(g, x + 2, y, r[2], 1, 2); if ((y + x + v) % 6 === 0) px(g, x + 1, y, r[4]); }
      for (let x = 0; x < S; x += 4) px(g, x, 0, r[0], 1, S);
    },
    "Q": g => { const r = R_.plank; px(g, 0, 0, r[2], S, S); for (let y = 0; y < S; y += 4) { px(g, 0, y, r[3], S, 1); px(g, 0, y + 3, r[0], S, 1); } px(g, 3, 1, r[1], 1, 1); px(g, 11, 9, r[1], 1, 1); },
    /* Hus sett frå sida: tømmer, kvit panel, tak */
    "W": g => { const r = R_.tommer; for (let y = 0; y < S; y += 4) { px(g, 0, y, r[3], S, 1); px(g, 0, y + 1, r[2], S, 2); px(g, 0, y + 3, r[0], S, 1); } px(g, 5, 2, r[1], 2, 1); px(g, 11, 10, r[1], 3, 1); },
    "v": g => { FLIS.W(g); vindauge(g, "#8e6034"); },
    "w": g => { const r = R_.kvit; px(g, 0, 0, r[2], S, S); for (let x = 0; x < S; x += 4) { px(g, x, 0, r[1], 1, S); px(g, x + 1, 0, r[3], 1, S); } px(g, 0, 15, r[0], S, 1); },
    "V": g => { FLIS.w(g); vindauge(g, "#5a6e8a"); },
    "R": (g, t, v) => {
      const r = R_.torv; px(g, 0, 0, r[2], S, S);
      for (let y = 0; y < 13; y++) for (let x = 0; x < S; x++) { const h = hash(x + v * 16, y, 71); if (h < 0.12) px(g, x, y, r[1]); else if (h > 0.9) px(g, x, y, r[3]); else if (h > 0.87) px(g, x, y, r[4]); }
    },
    // Øvste rad av eit torvtak: mønet, med lys kant og lengre gras
    "Rt": (g, t, v) => { FLIS.R(g, t, v); const r = R_.torv; px(g, 0, 0, r[4], S, 1); px(g, 0, 1, r[3], S, 1); for (let x = 1; x < S; x += 3) { px(g, x, 2, r[4]); px(g, x + 1, 0, r[1]); } },
    // Nedste rad: takskjegget med never og tømmerende
    "Rb": (g, t, v) => { FLIS.R(g, t, v); const r = R_.torv; px(g, 0, 10, r[1], S, 1); for (let x = 0; x < S; x += 2) px(g, x, 11, r[hash(x, v, 151) > 0.5 ? 1 : 0]); px(g, 0, 12, R_.stamme[4], S, 1); px(g, 0, 13, R_.stamme[3], S, 1); px(g, 0, 14, R_.stamme[1], S, 1); px(g, 0, 15, R_.stamme[0], S, 1); },
    "Rtb": (g, t, v) => { FLIS.Rb(g, t, v); const r = R_.torv; px(g, 0, 0, r[4], S, 1); px(g, 0, 1, r[3], S, 1); },
    "r": g => {
      const r = R_.skifer; px(g, 0, 0, r[2], S, S);
      for (let y = 0; y < S; y += 4) { for (let x = (y / 4) % 2 ? 0 : 3; x < S; x += 6) { px(g, x, y, r[0], 1, 4); px(g, x + 1, y, r[3], 2, 1); } px(g, 0, y + 3, r[1], S, 1); }
    },
    "D": g => { FLIS.W(g); dor(g); },
    "d": g => { FLIS.w(g); dor(g); },
    "I": g => {
      FLIS.w(g);
      const R = Rutenett(16, 16).form("o", [[3, 6, 9], [4, 5, 10], [5, 4, 11]]).rect("o", 4, 6, 8, 7);
      g.drawImage(mal(R, { o: { fast: "#1c1428" } }, { omriss: false }), 0, 0);
      for (let y = 7; y < 13; y += 2) px(g, 5, y, "#4a3a2a", 6, 1);
    },
    "A": g => {
      px(g, 0, 0, "#8fc0e0", S, S);
      const R = Rutenett(16, 16); for (let y = 3; y < 16; y++) { const w = Math.floor((y - 3) * 0.62); R.rad("t", y, 8 - w, 7 + w); }
      R.rect("k", 7, 0, 2, 3).rect("k", 6, 1, 4, 1);
      g.drawImage(mal(R, { t: { farge: "#3a4460", rund: true }, k: "#c08018" }), 0, 0);
    },
    /* Inne */
    "P": (g, t, v) => { const r = R_.plank; px(g, 0, 0, r[2], S, S); for (let y = 0; y < S; y += 4) { px(g, 0, y, r[3], S, 1); px(g, 0, y + 3, r[0], S, 1); px(g, ((y * 5 + v * 3) % 12) + 2, y + 1, r[1], 1, 2); } },
    "X": g => { const r = R_.tommer; for (let y = 0; y < 12; y += 4) { px(g, 0, y, r[2], S, 1); px(g, 0, y + 1, r[1], S, 2); px(g, 0, y + 3, r[0], S, 1); } px(g, 0, 12, R_.plank[4], S, 1); px(g, 0, 13, R_.plank[2], S, 2); px(g, 0, 15, R_.plank[0], S, 1); },
    "c": g => { const r = R_.stein; px(g, 0, 0, r[2], S, S); for (let y = 0; y < S; y += 4) { for (let x = (y / 4) % 2 ? 0 : 4; x < S; x += 8) { px(g, x, y, r[0], 1, 4); px(g, x + 1, y, r[3], 5, 1); } px(g, 0, y + 3, r[1], S, 1); } },
    "g": (g, t, v) => { const r = ["#6a6474", "#8a8494", "#a8a2b0", "#c2bcc8", "#dcd8e0"]; px(g, 0, 0, r[2], S, S); for (let y = 0; y < S; y += 8) for (let x = (y / 8) % 2 ? -4 : 0; x < S; x += 8) { px(g, x, y, r[3], 7, 1); px(g, x, y + 7, r[0], 8, 1); px(g, x + 7, y, r[1], 1, 8); } if (v % 3 === 0) px(g, 5, 11, r[1], 2, 1); },
    "G": g => { const r = R_.kvit; px(g, 0, 0, r[3], S, 11); px(g, 0, 10, r[2], S, 1); px(g, 0, 11, "#6e4a3a", S, 1); px(g, 0, 12, "#8a5e44", S, 3); px(g, 0, 15, "#3a2418", S, 1); for (let x = 1; x < S; x += 5) px(g, x, 12, "#6e4a3a", 1, 3); },
    "B": (g, t, v) => {
      const r = R_.plank; px(g, 0, 0, r[1], S, S); px(g, 0, 0, r[3], S, 1);
      const bok = ["#8a2638", "#2c4288", "#3a7236", "#c08018", "#6a3a7a", "#4a2c1c"];
      for (let y = 1; y < S - 4; y += 5) {
        px(g, 1, y, r[0], 14, 4);
        for (let x = 1; x < 15;) { const b = Math.floor(hash(x, y + v * 16, 81) * 6), w = Math.min(15 - x, 1 + Math.floor(hash(x, y, 82) * 2)), hh = 3 + (hash(x, y, 83) > 0.7 ? 0 : 1); const rr = ramp(bok[b]); px(g, x, y + 4 - hh, rr[2], w, hh); px(g, x, y + 4 - hh, rr[3], 1, hh); x += w + (hash(x, y, 84) > 0.8 ? 1 : 0); }
        px(g, 0, y + 4, r[3], S, 1);
      }
    },
    "y": (g, t, v) => {
      FLIS.B(g, t, v);
      const b = R_.blekk;
      for (let y = 1; y < S - 4; y += 5) for (let x = 1; x < 15; x += 2) { px(g, x, y, b[hash(x, y, 91) > 0.5 ? 1 : 2], 2, 4); px(g, x, y, b[3], 1, 1); }
      const f = Math.floor(t / 300) % 4;
      px(g, 4 + v % 5, 5, b[3], 1, 3 + f); px(g, 11, 10, b[2], 1, 2 + (f + 2) % 4);
    },
    "K": g => {
      underGolv(g, 0, 0);
      const R = Rutenett(16, 16).rect("l", 1, 3, 14, 4).rect("k", 1, 7, 14, 7).rect("m", 7, 6, 2, 3);
      g.drawImage(mal(R, { l: "#2c4288", k: "#2c4288", m: "#c08018" }), 0, 0);
      for (const [x, y] of [[3, 10], [5, 9], [10, 9], [12, 10], [8, 11]]) px(g, x, y, "#d06a64");
      for (const [x, y] of [[4, 11], [11, 11]]) px(g, x, y, "#f8d840");
      px(g, 2, 4, "#6c8ccc", 12, 1);
    },
    "k": g => {
      underGolv(g, 0, 1);
      const R = Rutenett(16, 16).rect("t", 1, 3, 14, 8).rect("b", 2, 11, 2, 4).rect("b", 12, 11, 2, 4);
      g.drawImage(mal(R, { t: { farge: "#ac7c46", rund: true }, b: "#6e4626" }), 0, 0);
    },
    "z": g => { underGolv(g, 0, 2); const R = Rutenett(16, 16).ell("s", 8, 8, 5, 4).rect("b", 4, 11, 2, 3).rect("b", 10, 11, 2, 3); g.drawImage(mal(R, { s: { farge: "#8e6034", rund: true }, b: "#4a2e1a" }), 0, 0); },
    "b": g => {
      underGolv(g, 0, 3);
      const R = Rutenett(16, 16).rect("r", 1, 0, 14, 16).rect("p", 3, 1, 10, 4).rect("d", 2, 5, 12, 10);
      g.drawImage(mal(R, { r: "#6e4626", p: "#ecebf0", d: "#8a2638" }), 0, 0);
      for (let y = 7; y < 15; y += 3) for (let x = 3; x < 14; x += 3) px(g, x, y, "#d06a64");
    },
    "f": (g, t) => {
      const R = Rutenett(16, 16).rect("s", 0, 0, 16, 16).rect("o", 3, 5, 10, 11);
      g.drawImage(mal(R, { s: { farge: "#686680" }, o: { fast: "#140c10" } }, { omriss: false }), 0, 0);
      for (let y = 0; y < 5; y += 2) for (let x = (y / 2) % 2 ? 0 : 3; x < S; x += 6) px(g, x, y, R_.stein[1], 1, 2);
      const k = Math.floor(t / 150) % 3;
      px(g, 5, 12, "#8a2638", 6, 3); px(g, 6, 9 + k % 2, "#e86a20", 4, 5 - k % 2); px(g, 7, 7 + k, "#f8b830", 2, 6 - k); px(g, 7, 12, "#f8f0a0", 2, 2);
      px(g, 3, 15, "#4a2c1c", 10, 1);
    },
    "L": (g, t) => {
      underGolv(g, t, 0);
      if (golvNo === "." || golvNo === ",") {
        // Ute: ei lykt på ein stolpe
        const k = Math.floor(t / 300) % 2;
        g.fillStyle = "rgba(248,216,64,0.22)"; g.beginPath(); g.arc(8, 4, 6 + k, 0, Math.PI * 2); g.fill();
        const R = Rutenett(16, 16).rect("s", 7, 6, 2, 10).rect("l", 5, 1, 6, 6).rect("t", 4, 0, 8, 1);
        g.drawImage(mal(R, { s: "#6a4428", l: { fast: "#f8d840" }, t: "#2a2838" }), 0, 0);
        px(g, 6, 2, k ? "#fff8d0" : "#f8e890", 4, 4); px(g, 7, 2, "#3a3050", 1, 4); px(g, 5, 4, "#3a3050", 6, 1);
        return;
      }
      const k = Math.floor(t / 300) % 2;
      g.fillStyle = "rgba(248,216,64,0.2)"; g.beginPath(); g.arc(8, 5, 6 + k, 0, Math.PI * 2); g.fill();
      const R = Rutenett(16, 16).rect("m", 7, 6, 2, 7).form("m", [[13, 5, 10], [14, 4, 11]]).rect("l", 7, 4, 2, 2);
      g.drawImage(mal(R, { m: "#c08018", l: "#f2ead0" }), 0, 0);
      px(g, 7, 1 + k, "#f8d840", 2, 3 - k); px(g, 8, k, "#fff8d0", 1, 2);
    },
    "E": g => { px(g, 0, 0, "#140c10", S, S); px(g, 0, 0, R_.tommer[1], 2, S); px(g, 14, 0, R_.tommer[1], 2, S); px(g, 2, 13, R_.plank[3], 12, 1); px(g, 2, 14, R_.plank[2], 12, 2); },
    "n": (g, t, v) => {
      underGolv(g, t, v);
      const f = Math.floor(t / 400) % 4;
      const R = Rutenett(16, 16).ell("b", 8, 9, 7, 5).ell("b", 3, 4, 2, 2).ell("b", 13, 14, 2, 1.5);
      g.drawImage(mal(R, { b: { farge: "#201848", rund: true } }), 0, 0);
      px(g, 5, 7, "#8878d0", 2, 1); px(g, 4, 8, "#5848a0"); if (f === 1) { px(g, 10, 9, "#5848a0", 2, 2); px(g, 10, 9, "#8878d0"); }
    },
    "e": g => {
      FLIS.g(g, 0, 1);
      const R = Rutenett(16, 16).rect("s", 0, 5, 16, 6).rect("r", 0, 2, 16, 3).rect("b", 1, 11, 2, 3).rect("b", 13, 11, 2, 3);
      g.drawImage(mal(R, { s: "#8e6034", r: "#6e4626", b: "#4a2e1a" }), 0, 0);
    },
    "a": g => {
      FLIS.g(g, 0, 2);
      const R = Rutenett(16, 16).rect("d", 1, 4, 14, 11).rect("k", 1, 3, 14, 3).rect("l", 3, 0, 1, 3).rect("l", 12, 0, 1, 3);
      g.drawImage(mal(R, { d: "#8a2638", k: "#ecebf0", l: "#f2ead0" }), 0, 0);
      px(g, 7, 7, "#e8b830", 2, 6); px(g, 5, 9, "#e8b830", 6, 2);
    },
    "l": g => {
      const r = R_.raud; px(g, 0, 0, r[2], S, S); px(g, 0, 0, r[1], S, 1); px(g, 0, 15, r[1], S, 1);
      for (let y = 3; y < 14; y += 5) for (let x = 2; x < 15; x += 4) { px(g, x, y, "#e8b830", 2, 1); px(g, x - 1, y + 1, "#2c4288", 1, 1); px(g, x + 2, y + 1, "#2c4288", 1, 1); }
      for (let x = 0; x < S; x += 2) { px(g, x, 1, "#ecebf0"); px(g, x + 1, 14, "#ecebf0"); }
    },
    " ": g => px(g, 0, 0, "#0a0514", S, S),
    /* Kyrkja inne (etter Kvernes og Hove kyrkje) */
    // golv av breie, lyse furuplankar
    "q": (g, t, v) => {
      const r = ["#7a5a3a", "#a07a52", "#c09a6a", "#d4b080", "#e4c898"];
      px(g, 0, 0, r[2], S, S);
      for (let x = 0; x < S; x += 8) { px(g, x, 0, r[1], 1, S); px(g, x + 1, 0, r[3], 1, S); }
      for (let i = 0; i < 3; i++) { const x = 2 + ((i * 5 + v * 3) % 12), y = (i * 6 + v * 4) % 14; px(g, x, y, r[1], 1, 2); px(g, x + 1, y + 1, r[3]); }
      px(g, (v * 4 + 3) % 8 + (v % 2) * 8, (v * 5) % 16, r[4], 2, 1);
    },
    // kvit vegg med rundboga vindauge og smårutar
    "u": g => {
      FLIS.G(g);
      const R = Rutenett(16, 16).rect("k", 4, 1, 8, 10).rect("g", 5, 2, 6, 8);
      g.drawImage(mal(R, { k: "#8a88a0", g: { fast: "#6c8ccc" } }), 0, 0);
      px(g, 5, 2, "#d0e8ff", 2, 2); px(g, 7, 2, "#8a88a0", 1, 8); px(g, 5, 5, "#8a88a0", 6, 1); px(g, 5, 8, "#8a88a0", 6, 1);
      px(g, 4, 1, "#ecebf0", 1, 1); px(g, 11, 1, "#ecebf0", 1, 1);
    },
    // benk med måla benkedør i lys blågrått
    "e": g => {
      FLIS.q(g, 0, 1);
      const R = Rutenett(16, 16).rect("s", 0, 6, 16, 5).rect("r", 0, 2, 16, 4).rect("d", 0, 2, 3, 12);
      g.drawImage(mal(R, { s: "#8a9aab", r: "#6a7a8a", d: "#9aaabb" }), 0, 0);
      px(g, 1, 4, "#c8d0dc", 1, 8); px(g, 0, 13, "#4a5460", 3, 1);
    },
    // under altarringen og preikestolen: golv (figuren blir teikna oppå)
    // Golv under inventar som er figurar (alterring, preikestol, grue, bord …): golvet i rommet, men fast.
    "+": (g, t, v) => underGolv(g, t, v),
    "(": (g, t, v) => underGolv(g, t, v),
    // Veggtoppar: sideveggene og botnveggen sett ovanfrå
    "Xt": g => { const r = R_.tommer; px(g, 0, 0, r[1], S, S); for (let x = 1; x < S; x += 5) px(g, x, 0, r[0], 1, S); px(g, 0, 0, r[2], S, 1); px(g, 2, 3, r[2], 2, 5); px(g, 12, 9, r[2], 2, 4); },
    "ct": g => { const r = R_.stein; px(g, 0, 0, r[1], S, S); for (let y = 0; y < S; y += 5) { px(g, 0, y, r[0], S, 1); px(g, (y * 3) % 11, y + 1, r[2], 4, 1); } },
    "Gt": g => { const r = R_.kvit; px(g, 0, 0, r[2], S, S); px(g, 0, 0, r[3], S, 2); px(g, 0, 14, r[1], S, 2); },
  };
  function vindauge(g, ramme) {
    const R = Rutenett(16, 16).rect("r", 3, 3, 10, 9).rect("g", 4, 4, 8, 7);
    g.drawImage(mal(R, { r: ramme, g: { fast: "#2a3c6a" } }), 0, 0);
    px(g, 4, 4, "#6c8ccc", 3, 3); px(g, 9, 4, "#4462aa", 3, 3); px(g, 4, 8, "#4462aa", 3, 3); px(g, 9, 8, "#2c4288", 3, 3);
    px(g, 4, 4, "#bfe0ff", 1, 1); px(g, 7, 4, R_.kvit[3], 2, 7); px(g, 4, 7, R_.kvit[3], 8, 1);
  }
  function dor(g) {
    const R = Rutenett(16, 16).rect("k", 2, 1, 12, 15).rect("d", 3, 2, 10, 14);
    g.drawImage(mal(R, { k: "#4a2a18", d: "#8e6034" }), 0, 0);
    for (let x = 5; x < 12; x += 3) px(g, x, 3, R_.plank[1], 1, 12);
    px(g, 10, 9, "#e8b830", 1, 2); px(g, 3, 5, "#2e1a14", 10, 1); px(g, 3, 12, "#2e1a14", 10, 1);
  }

  /* Tre som stikk opp over flisa over seg: botnen blir flisa, toppen blir teikna etter figurane. */
  const TRE = {
    "#": () => {
      const R = Rutenett(16, 32);
      for (let lag = 0; lag < 4; lag++) { const y0 = 2 + lag * 6; for (let y = 0; y < 9; y++) { const w = Math.min(7.4, 1 + y * 0.7 + lag * 0.9); R.rad(lag % 2 ? "b" : "a", y0 + y, Math.round(8 - w), Math.round(7 + w)); } }
      R.rect("s", 7, 26, 2, 5);
      return mal(R, { a: { farge: "#1f4c38", rund: true }, b: { farge: "#265a42", rund: true }, s: "#4a2c1c" });
    },
    "t": () => {
      const R = Rutenett(16, 32);
      R.rect("s", 7, 20, 3, 10).set("s", 6, 29).set("s", 10, 29);
      R.ell("a", 8, 13, 7.5, 8).ell("b", 5, 10, 3.2, 3).ell("c", 11, 16, 3.5, 3);
      return mal(R, { a: { farge: "#347436", rund: true }, b: { farge: "#4a8a40", rund: true }, c: { farge: "#2c6630", rund: true }, s: "#6a4428" });
    },
  };
  const treCache = {};
  const treBilete = k => treCache[k] || (treCache[k] = TRE[k]());

  const FAST = new Set(["+", "(", "u", "#", "t", "~", "^", "o", "|", "j", "h", "x", "W", "v", "w", "V", "R", "r", "I", "A", "B", "y", "K", "k", "b", "L", "X", "c", "f", "z", "G", "e", "a", "n", " "]);
  const ANIM = new Set(["~", "L", "f", "n", "y"]);
  const VARIANT_EKSTRA = new Set(["Rt", "Rb", "Rtb"]);
  const VARIANT = new Set([".", ",", "~", "=", "_", "R", "P", "g", "B", "y", '"', "o", "|", "j", "h", "x", "#", "t"]);
  const cache = new Map();
  function flis(teikn, t = 0, x = 0, y = 0, golv = "P") {
    const v = VARIANT.has(teikn) || VARIANT_EKSTRA.has(teikn) ? Math.floor(hash(x, y, 7) * 4) : 0;
    const gl = "LnKkzb.#toh+(".includes(teikn) ? golv : "";
    const nokkel = `${teikn}${gl}:${v}:${ANIM.has(teikn) ? Math.floor(t / 150) % 16 : 0}`;
    if (cache.has(nokkel)) return cache.get(nokkel);
    const c = lerret(S), g = c.getContext("2d");
    golvNo = golv;
    if (TRE[teikn] || teikn === "o" || teikn === "h") { golvNo = golv; FLIS["."](g, t, v); }   // sjølve treet, steinen og haugen er figurar, sjå natur()
    else (FLIS[teikn] || FLIS[" "])(g, t, v);
    cache.set(nokkel, c);
    return c;
  }
  function topp(teikn) {
    if (!TRE[teikn]) return null;
    const k = "topp:" + teikn;
    if (cache.has(k)) return cache.get(k);
    const c = lerret(S); c.getContext("2d").drawImage(treBilete(teikn), 0, 0);
    cache.set(k, c);
    return c;
  }

  /* ---------- Vatn med strandkant ----------
     maske: kva naboar som er land. Bit 1 N, 2 A, 4 S, 8 V, 16 NA, 32 SA, 64 SV, 128 NV.
     bank: fargen på landet langs kanten («gras», «sand», «stein»).
     Etter The Minish Cap og Final Fantasy VI: grunt, lysare vatn nær land, bakken
     kastar skugge ned på vatnet i nord, skum som slår mot land, avrunda hjørne.
     Smale bekkar (land på begge sider) får kvit straum. */
  const BANK = {
    gras: { topp: "#4a8a3f", lys: "#68a84a", kant: "#6a4630", djup: "#3a2418" },
    sand: { topp: "#ceac74", lys: "#e2c890", kant: "#a0804e", djup: "#6a5030" },
    stein: { topp: "#7a788a", lys: "#9a98aa", kant: "#4a4858", djup: "#2a2838" },
  };
  const bolgje = (x, fro) => Math.floor(hash(x, fro, 211) * 2.2);
  function vatn(t, v, maske, bank, straum) {
    const f = Math.floor(t / 180) % 8;
    const k = `vatn:${maske}:${bank}:${v}:${f}:${straum ? 1 : 0}`;
    if (cache.has(k)) return cache.get(k);
    const c = lerret(S), g = c.getContext("2d");
    const r = R_.vatn, b = BANK[bank] || BANK.gras;
    const N = maske & 1, A = maske & 2, SO = maske & 4, V = maske & 8;
    // Djupn: avstand til næraste land i flisa
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      let d = 99;
      if (N) d = Math.min(d, y); if (SO) d = Math.min(d, 15 - y); if (V) d = Math.min(d, x); if (A) d = Math.min(d, 15 - x);
      if (maske & 16) d = Math.min(d, Math.hypot(15 - x, y) - 1); if (maske & 32) d = Math.min(d, Math.hypot(15 - x, 15 - y) - 1);
      if (maske & 64) d = Math.min(d, Math.hypot(x, 15 - y) - 1); if (maske & 128) d = Math.min(d, Math.hypot(x, y) - 1);
      let col = d < 4 ? r[3] : d < 6 && (x + y) % 2 === 0 ? r[3] : r[2];
      if (d > 8 && (x * 3 + y * 5 + v) % 11 === 0) col = r[1];
      px(g, x, y, col);
    }
    // Krusingar som flyttar seg
    for (let i = 0; i < 4; i++) {
      const y = (i * 4 + 1 + v) % S, x = (i * 7 + f * 2 + v * 5) % S;
      px(g, x, y, r[4], 3, 1); px(g, (x + 3) % S, y + 1, r[3], 2, 1);
    }
    if ((f + v) % 5 === 0) px(g, (v * 7 + 4) % 14 + 1, (v * 5 + 6) % 12 + 2, "#ffffff");
    // Bekk: kvit straum nedover, og ein stein med skum rundt
    if (straum) {
      for (let i = 0; i < 4; i++) {
        const x = 2 + ((i * 4 + v * 3) % 12), y = (i * 5 + f * 3) % S;
        px(g, x, y, "#e8f4ff", 1, 3); px(g, x, (y + 3) % S, r[4], 1, 2);
      }
      if (v === 2) { px(g, 7, 8, "#7a788a", 3, 2); px(g, 7, 8, "#9a98aa", 2, 1); px(g, 6, 10, "#e8f4ff", 5, 1); px(g, 10, 8, "#e8f4ff", 1, 2); }
    }
    if (A && V && !N && !SO) {
      for (let i = 0; i < 5; i++) {
        const x = 4 + ((i * 3 + v) % 8), y = (i * 5 + f * 3) % S;
        px(g, x, y, "#e8f4ff", 1, 3); px(g, x + 1, (y + 1) % S, r[4], 1, 2);
      }
    }
    // Strandkantar: landet går litt ut i vatnet med bølgjande kant
    const skum = (x, y) => px(g, x, y, (x + y + f) % 3 !== 0 ? "#e8f4ff" : r[4]);
    if (N) for (let x = 0; x < S; x++) {
      const d = 1 + bolgje(x + v * 16, 1);
      px(g, x, 0, b.topp, 1, d); px(g, x, d, b.kant); px(g, x, d + 1, b.djup);
      px(g, x, d + 2, r[1]); px(g, x, d + 3, r[1]);                 // skugge frå bakken
      if ((x + f) % 4 < 2) px(g, x, d + 4, r[4]);
    }
    if (SO) for (let x = 0; x < S; x++) {
      const d = 1 + bolgje(x + v * 16, 2);
      px(g, x, 16 - d, b.topp, 1, d); px(g, x, 16 - d, b.lys); skum(x, 15 - d);
    }
    if (V) for (let y = 0; y < S; y++) {
      const d = 1 + bolgje(y + v * 16, 3);
      px(g, 0, y, b.topp, d, 1); px(g, d, y, b.kant); skum(d + 1, y);
    }
    if (A) for (let y = 0; y < S; y++) {
      const d = 1 + bolgje(y + v * 16, 4);
      px(g, 16 - d, y, b.topp, d, 1); px(g, 15 - d, y, b.djup); skum(14 - d, y);
    }
    // Ytre hjørne: land berre på skrå
    const hjorne = (cx, cy) => { for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) { const d = Math.hypot(x + .5 - cx, y + .5 - cy); if (d < 3.2) px(g, x, y, b.topp); else if (d < 4.2) px(g, x, y, "#e8f4ff"); } };
    if ((maske & 16) && !N && !A) hjorne(16, 0);
    if ((maske & 32) && !SO && !A) hjorne(16, 16);
    if ((maske & 64) && !SO && !V) hjorne(0, 16);
    if ((maske & 128) && !N && !V) hjorne(0, 0);
    cache.set(k, c);
    return c;
  }

  /* ---------- Steingard ----------
     Tørrmur av flate, lyse gråsteinar (etter steingardane på Sunnmøre og i Løten):
     framside med to lag steinar, toppstein med mose og lav, skugge på bakken.
     maske: 1 N, 2 A, 4 S, 8 V er steingard. Vassrette murar viser framsida,
     loddrette murar blir sett ovanfrå som ei smal rad toppsteinar. */
  const MUR = ["#3a3842", "#6a6870", "#8e8c90", "#aeaca8", "#cac8c0"];
  function murstein(g, x, y, w, h, fro) {
    const m = MUR;
    px(g, x, y, m[2], w, h);
    px(g, x, y, m[3], w, 1); px(g, x, y, m[3], 1, h);
    if (w > 3 && hash(x, y, fro) > 0.5) px(g, x + 1, y, m[4], w - 2, 1);
    px(g, x, y + h - 1, m[1], w, 1); px(g, x + w - 1, y, m[1], 1, h);
  }
  function steingard(v, maske) {
    const k = `mur:${v}:${maske}`;
    if (cache.has(k)) return cache.get(k);
    const c = lerret(S, 22), g = c.getContext("2d");   // 6 pikslar høgare enn flisa: muren står opp
    const vass = (maske & 2) || (maske & 8) || !((maske & 1) || (maske & 4));
    const m = MUR, fro = v * 7;
    if (vass) {
      const x0 = (maske & 8) ? 0 : 1, x1 = (maske & 2) ? 16 : 15;
      g.fillStyle = "rgba(20,24,50,.3)"; g.fillRect(x0 + 1, 20, x1 - x0, 2);
      px(g, x0, 7, m[0], x1 - x0, 14);                               // fuger
      let x = x0;                                                   // nedre lag: store steinar
      while (x < x1) { const w = Math.min(x1 - x, 4 + Math.floor(hash(x, 1, fro) * 4)); murstein(g, x, 14, w, 6, fro); x += w; }
      x = x0 - 2;                                                   // øvre lag, forskote
      while (x < x1) { const w = 3 + Math.floor(hash(x, 2, fro) * 4); const xs = Math.max(x0, x), we = Math.min(x1, x + w) - xs; if (we > 0) murstein(g, xs, 9, we, 5, fro + 1); x += w; }
      // toppsteinar med mose
      px(g, x0, 5, m[1], x1 - x0, 4);
      x = x0;
      while (x < x1) { const w = Math.min(x1 - x, 3 + Math.floor(hash(x, 3, fro) * 3)); px(g, x, 5, m[3], w, 3); px(g, x, 5, m[4], Math.max(1, w - 1), 1); x += w + 1; }
      for (let i = 0; i < 4; i++) { const mx = x0 + Math.floor(hash(i, 4, fro) * (x1 - x0 - 2)); px(g, mx, 5, i % 2 ? "#6e9038" : "#98b44c", 2, 1); px(g, mx, 6, "#4a6a2a"); }
      px(g, x0 + 3 + v, 16, "#c8b050"); px(g, x1 - 5, 11, "#c8b050");
      if (!(maske & 8)) px(g, x0 - 1, 5, "#0a0514", 1, 16);
      if (!(maske & 2)) px(g, x1, 5, "#0a0514", 1, 16);
      px(g, x0, 4, "#0a0514", x1 - x0, 1); px(g, x0, 20, "#0a0514", x1 - x0, 1);
    }
    if ((maske & 1) || (maske & 4)) {
      // loddrett: toppsteinar sett ovanfrå, frå topp til botn av flisa
      const y0 = (maske & 1) ? 0 : 5, y1 = (maske & 4) ? 22 : 20;
      px(g, 3, y0, "#0a0514", 10, y1 - y0);
      let y = y0;
      while (y < y1 - 1) { const h = Math.min(y1 - 1 - y, 3 + Math.floor(hash(1, y, fro) * 3)); const w = 7 + Math.floor(hash(2, y, fro) * 2); murstein(g, 4 + Math.floor((8 - w) / 2), y, w, h, fro); y += h; }
      for (let i = 0; i < 3; i++) px(g, 5 + (i * 3) % 6, y0 + 3 + i * 5, i % 2 ? "#6e9038" : "#98b44c", 2, 1);
      g.fillStyle = "rgba(20,24,50,.3)"; g.fillRect(13, y0 + 2, 2, y1 - y0 - 2);
    }
    // Hjørne og endar (ved porten): ein stolpe av store, tilhogne steinar med dekkstein og mose,
    // litt høgare enn muren, så hjørnet og porten syner.
    const lodd = ((maske & 1) ? 1 : 0) + ((maske & 4) ? 1 : 0), vass2 = ((maske & 2) ? 1 : 0) + ((maske & 8) ? 1 : 0);
    if ((lodd && vass2) || lodd + vass2 <= 1) {
      g.fillStyle = "rgba(20,24,50,.3)"; g.fillRect(14, 3, 2, 19);
      px(g, 2, 0, "#0a0514", 12, 22);
      murstein(g, 3, 5, 10, 8, fro + 3); murstein(g, 3, 13, 10, 8, fro + 4);
      px(g, 2, 1, m[1], 12, 4); px(g, 3, 1, m[4], 10, 1); px(g, 3, 2, m[3], 10, 2);   // dekkstein
      px(g, 2, 4, "#0a0514", 12, 1);
      px(g, 4, 1, "#98b44c", 3, 1); px(g, 5, 2, "#6e9038", 2, 1); px(g, 10, 3, "#6e9038");
    }
    cache.set(k, c);
    return c;
  }

  /* ---------- Kantar mellom fliser ----------
     Gras veks inn over vegen og sanda, og vatnet får strandkant med skum.
     Motoren teiknar kantane oppå flisa, på sidene der naboen er av eit anna slag. */
  const KLASSE = { ".": "gras", ",": "gras", '"': "gras", "o": "gras", "h": "gras", "x": "gras", "|": "gras", "j": "gras", "#": "gras", "t": "gras", "=": "veg", "_": "sand", "~": "vatn" };
  const klasse = teikn => KLASSE[teikn] || null;
  function kant(type, side, v) {
    const k = `kant:${type}:${side}:${v}`;
    if (cache.has(k)) return cache.get(k);
    const c = lerret(S), g = c.getContext("2d");
    // Teikn alltid som om kanten er øvst, og roter etterpå.
    const t = lerret(S), tg = t.getContext("2d");
    if (type === "gras") {
      const r = R_.gras;
      for (let x = 0; x < S; x++) {
        const d = 1 + Math.floor(hash(x, v, 131) * 2.4) + (x % 5 === 2 ? 1 : 0);
        px(tg, x, 0, r[2], 1, d); px(tg, x, d - 1, r[1]);
        if (hash(x, v, 132) > 0.7) { px(tg, x, d, r[1]); px(tg, x, d - 1, r[3]); }
        if (hash(x, v, 133) > 0.86) px(tg, x, d + 1, r[1]);
      }
    } else if (type === "strand") {
      const r = R_.vatn;
      px(tg, 0, 0, "#1a2a44", S, 1); px(tg, 0, 1, r[0], S, 1);
      for (let x = 0; x < S; x++) {
        if (hash(x, v, 141) > 0.35) px(tg, x, 2, r[4]);
        if (hash(x, v, 142) > 0.75) px(tg, x, 3, r[3]);
      }
    }
    g.translate(8, 8); g.rotate({ n: 0, e: Math.PI / 2, s: Math.PI, w: -Math.PI / 2 }[side]); g.drawImage(t, -8, -8);
    cache.set(k, c);
    return c;
  }

  /* ---------- Figurar (16 × 24) ---------- */
  /* utsjånad: { hud, har, frisyre: kort|langt|skalle|skaut, skaut, jakke, bukse, kjole, sko,
     hatt, flosshatt, krage, skjegg, briller, hale, sekk, forkle, belte } */
  function figurRamme(u, dir, steg) {
    const R = Rutenett(FW, FH);
    const side = dir >= 2;
    const lang = !!u.kjole;
    const swing = steg === 1 ? 1 : steg === 2 ? -1 : 0;
    const f = u.frisyre || "kort";
    // Hår bak ryggen (langt hår)
    if (f === "langt" && dir !== 1) { if (!side) R.rect("har", 3, 8, 10, 7); else R.rect("har", 8, 8, 4, 8); }
    if (f === "langt" && dir === 1) R.rect("har", 4, 9, 8, 7);
    // Kuhala til huldra
    if (u.hale && dir !== 0) { if (side) R.rect("hale", 11, 16, 1, 4).rect("haletopp", 12, 19, 2, 2); else R.rect("hale", 8, 18, 1, 3).rect("haletopp", 7, 21, 3, 1); }
    // Bein og sko
    if (lang) {
      if (!side) R.form("kjole", [[15, 4, 11], [16, 4, 11], [17, 3, 12], [18, 3, 12], [19, 3, 12], [20, 3, 12]]);
      else R.form("kjole", [[15, 5, 10], [16, 5, 10], [17, 4, 11], [18, 4, 11], [19, 4, 11], [20, 4, 11]]);
      R.rect("sko", (side ? 5 : 4) + (swing > 0 ? -1 : 0), 21, 3, 1).rect("sko", (side ? 8 : 9) + (swing < 0 ? 1 : 0), 21 - (swing ? 0 : 0), 3, 1);
      if (u.forkle && dir === 0) R.rect("forkle", 6, 15, 4, 5);
    } else if (!side) {
      const l = steg === 1 ? 1 : 0, r = steg === 2 ? 1 : 0;
      R.rect("bukse", 4, 17, 3, 3 - l).rect("bukse", 9, 17, 3, 3 - r);
      R.rect("sko", 4, 20 - l, 3, 2).rect("sko", 9, 20 - r, 3, 2);
    } else if (swing === 0) {
      R.rect("bukse", 6, 17, 4, 3).rect("sko", 5, 20, 5, 2);
    } else {
      R.rect("buksebak", 9, 17, 3, 3).rect("bukse", 4, 17, 3, 3).rect("sko", 3, 20, 4, 2).rect("sko", 9, 20, 4, 2);
    }
    // Kropp og armar
    if (!side) {
      R.rect("jakke", 4, 11, 8, lang ? 4 : 6);
      R.rect("arm", 3, 12, 1, 4 - (swing > 0 ? 1 : 0)).rect("arm", 12, 12, 1, 4 - (swing < 0 ? 1 : 0));
      R.set("hand", 3, 16 - (swing > 0 ? 1 : 0)).set("hand", 12, 16 - (swing < 0 ? 1 : 0));
      if (dir === 0 && !u.krage) R.rect("skjorte", 7, 11, 2, 2);
      if (dir === 1 && u.sekk) R.rect("sekk", 5, 12, 6, 5);
      if (u.belte && !lang) R.rad("belte", 16, 4, 11);
    } else {
      if (u.sekk) R.rect("sekk", 10, 11, 3, 5);
      R.rect("jakke", 5, 11, 6, lang ? 4 : 6);
      R.rect("arm", 7 + swing, 12, 2, 4).set("hand", 7 + swing * 2, 16).set("hand", 8 + swing * 2, 16);
      if (u.belte && !lang) R.rad("belte", 16, 5, 10);
    }
    if (u.krage) { if (!side) R.form("krage", [[10, 4, 11], [11, 3, 12], [12, 4, 11]]); else R.form("krage", [[10, 4, 10], [11, 4, 11], [12, 5, 10]]); }
    // Hovud
    R.ell("hud", 8, 6.5, 5, 4.6);
    if (side) R.set("hud", 2, 7);
    // Hår
    if (f === "skaut") {
      if (dir === 1) R.ell("skaut", 8, 6, 5.3, 5.1).rect("skaut", 6, 10, 4, 2);
      else if (!side) R.form("skaut", [[1, 5, 10], [2, 4, 11], [3, 3, 12], [4, 3, 12], [5, 3, 4], [5, 11, 12], [6, 3, 3], [6, 12, 12], [7, 3, 3], [7, 12, 12], [8, 3, 3], [8, 12, 12]]);
      else R.form("skaut", [[1, 5, 10], [2, 4, 11], [3, 3, 12], [4, 5, 12], [5, 7, 13], [6, 8, 13], [7, 9, 13], [8, 9, 13], [9, 11, 13]]);
    } else if (f === "skalle") {
      if (dir === 1) R.form("har", [[6, 3, 12], [7, 3, 12], [8, 4, 11]]);
      else if (!side) R.rect("har", 3, 5, 1, 4).rect("har", 12, 5, 1, 4);
      else R.form("har", [[5, 10, 12], [6, 9, 12], [7, 9, 12], [8, 10, 11]]);
    } else {
      if (dir === 1) R.ell("har", 8, 6, 5.3, 4.9).rad("har", 10, 4, 11);
      else if (!side) { R.form("har", [[1, 5, 10], [2, 4, 11], [3, 3, 12], [4, 3, 12], [5, 3, 5], [5, 7, 8], [5, 10, 12], [6, 3, 3], [6, 12, 12]]); if (f === "langt") R.rect("har", 3, 7, 1, 5).rect("har", 12, 7, 1, 5); }
      else { R.form("har", [[1, 5, 10], [2, 4, 11], [3, 3, 12], [4, 4, 12], [5, 7, 12], [6, 8, 12], [7, 9, 12], [8, 9, 11]]); if (f === "langt") R.rect("har", 9, 9, 3, 4); }
    }
    // Andlet
    if (dir === 0) {
      R.rect("auge", 5, 6, 1, 2).rect("auge", 10, 6, 1, 2);
      if (u.briller) R.rad("brilleramme", 5, 5, 10).set("glas", 5, 6).set("glas", 10, 6);
      if (u.skjegg) R.form("skjegg", [[8, 4, 11], [9, 4, 11], [10, 5, 10], [11, 6, 9]]);
      else R.set("munn", 7, 9).set("munn", 8, 9);
      R.set("kinn", 4, 8).set("kinn", 11, 8);
    } else if (side) {
      R.rect("auge", 4, 6, 1, 2);
      if (u.briller) R.set("glas", 4, 6).set("brilleramme", 3, 5).set("brilleramme", 5, 5);
      if (u.skjegg) R.form("skjegg", [[8, 3, 8], [9, 3, 8], [10, 4, 7], [11, 5, 7]]);
      R.set("kinn", 5, 8);
    }
    // Hattar
    if (u.hatt) R.form("hatt", [[0, 5, 10], [1, 4, 11], [2, 2, 13]]);
    if (u.flosshatt) R.rect("hatt", 5, 0, 6, 2).rad("hattband", 2, 5, 10).rad("hatt", 3, 3, 12);
    if (dir === 3) R.spegl();
    const hud = u.hud || "#e8b890", jakke = u.jakke || "#3a5a8a", bukse = u.bukse || "#4a3a30";
    const pal = {
      hud: { farge: hud, rund: true }, hand: hud, kinn: { fast: blend(hud, "#d05060", 0.3) },
      har: u.har || "#6a4428", skaut: u.skaut || "#8a2638",
      jakke, arm: blend(jakke, SKUGGE, 0.14), skjorte: "#ecebf0",
      bukse, buksebak: blend(bukse, SKUGGE, 0.35), sko: u.sko || "#2a1c1c",
      kjole: u.kjole || "#2c4288", forkle: u.forkle || "#ecebf0", krage: "#f4f2f8", belte: "#2a1c1c",
      skjegg: u.skjegg || "#d0d0d8", hatt: u.hatt || u.flosshatt || "#1c1c28", hattband: "#6a3a2a",
      auge: { fast: "#140c1c" }, munn: { fast: blend(hud, "#6a2020", 0.45) }, glas: { fast: "#e8f4ff" }, brilleramme: { fast: "#3a3040" },
      sekk: "#8a5e36", hale: hud, haletopp: u.har || "#c8a050",
    };
    return mal(R, pal);
  }
  const figurCache = new Map();
  function figur(u) {
    const k = JSON.stringify(u);
    if (figurCache.has(k)) return figurCache.get(k);
    const rammer = [0, 1, 2, 3].map(dir => [0, 1, 2].map(steg => figurRamme(u, dir, steg)));
    // Kampstillingar (mot venstre). Til arket er lasta: gangrammer, og liggjande for slått ut.
    const kopi = src => { const c = lerret(FW, FH); c.getContext("2d").drawImage(src, 0, 0); return c; };
    const ute = lerret(FH, 16);
    { const g = ute.getContext("2d"); g.translate(FH / 2, 8); g.rotate(Math.PI / 2); g.drawImage(rammer[2][0], -FW / 2, -FH / 2); }
    const kamp = { atak: kopi(rammer[2][1]), galdr: kopi(rammer[2][0]), skadd: kopi(rammer[2][0]), svak: kopi(rammer[2][0]), ute };
    const f = { rammer, kamp, w: FW, h: FH };
    // Handteikna ark frå tools/pikselkunst/figur.py (48 x 144): rad 0 til 3 gange (steg bortover),
    // rad 4 åtak, galdr og skadd, rad 5 svak (på kne) og slått ut (24 x 16 nedst i ruta).
    // Når det er lasta, blir det teikna inn i dei same lerreta, så alle som held på figuren får det nye.
    if (u.id && typeof Image !== "undefined") {
      const img = hent(`bilete/spel/figurar/${u.id}.png`);
      const teiknInn = (c, sx, sy) => {
        const g = c.getContext("2d");
        g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, c.width, c.height);
        g.drawImage(img, sx, sy, c.width, c.height, 0, 0, c.width, c.height);
      };
      const bruk = () => {
        rammer.forEach((rad, dir) => rad.forEach((c, steg) => teiknInn(c, steg * FW, dir * FH)));
        if (img.height < FH * 6) return;
        teiknInn(kamp.atak, 0, FH * 4); teiknInn(kamp.galdr, FW, FH * 4); teiknInn(kamp.skadd, FW * 2, FH * 4);
        teiknInn(kamp.svak, 0, FH * 5); teiknInn(kamp.ute, FW, FH * 5 + 8);
      };
      if (klar(img)) bruk(); else img.addEventListener("load", bruk, { once: true });
    }
    figurCache.set(k, f);
    return f;
  }

  /* ---------- Fiendar ---------- */
  // Fargane til blekket er henta frå Blekklatten.
  const BLEKK = { farge: "#383070", rund: true }, GUL = { fast: "#f8d840" }, GULM = { fast: "#c06810" }, PUPILL = { fast: "#080010" };
  const TENN = { fast: "#f0e8c8" }, MUNN = { fast: "#400820" }, TUNGE = { fast: "#c84850" }, GLANS = { fast: "#8878d0" };
  function auge(R, x, y, stor) {
    if (stor) R.rect("gul", x, y, 3, 2).rect("gulm", x, y + 2, 3, 1).rect("pupill", x + 1, y, 1, 3);
    else R.rect("gul", x, y, 2, 1).rect("gulm", x, y + 1, 2, 1).rect("pupill", x + 1, y, 1, 2);
  }
  const FIENDAR = {
    blekkdrope() {
      const R = Rutenett(20, 22);
      R.ell("b", 10, 14, 7.5, 6.5); for (let y = 2; y < 10; y++) { const w = Math.floor((y - 2) * 0.7); R.rad("b", y, 10 - w, 10 + w); }
      R.ell("b", 3, 20, 1.5, 1).ell("b", 17, 20, 1.2, 1);
      auge(R, 6, 12); auge(R, 12, 12);
      R.rad("munn", 16, 8, 11).set("tann", 9, 16).set("tann", 11, 16);
      R.set("glans", 6, 9).set("glans", 7, 8).set("glans", 5, 11);
      return mal(R, { b: BLEKK, gul: GUL, gulm: GULM, pupill: PUPILL, munn: MUNN, tann: TENN, glans: GLANS });
    },
    blekkflekk() {
      const R = Rutenett(36, 32);
      R.ell("b", 18, 18, 13, 10.5);
      for (const [x, y, dx, dy, n] of [[8, 9, -1, -1, 5], [18, 7, 0, -1, 5], [27, 9, 1, -1, 5], [31, 18, 1, 0, 3], [6, 22, -1, 0.3, 4], [26, 27, 0.6, 1, 3]]) for (let i = 0; i < n; i++) { R.set("b", Math.round(x + dx * i), Math.round(y + dy * i)); if (i < n - 2) R.set("b", Math.round(x + dx * i) + 1, Math.round(y + dy * i)); }
      R.ell("b", 3, 8, 1.5, 1.5).ell("b", 33, 5, 1.2, 1.2).ell("b", 32, 29, 1.5, 1.2);
      auge(R, 11, 14, true); auge(R, 21, 13, true); auge(R, 17, 10);
      R.form("munn", [[21, 12, 24], [22, 12, 24], [23, 13, 23]]).set("tann", 13, 21).set("tann", 16, 21).set("tann", 20, 21).set("tann", 23, 21).rad("tunge", 23, 16, 20);
      R.set("glans", 11, 10).set("glans", 12, 9).set("glans", 13, 9).set("glans", 9, 12);
      return mal(R, { b: BLEKK, gul: GUL, gulm: GULM, pupill: PUPILL, munn: MUNN, tann: TENN, tunge: TUNGE, glans: GLANS });
    },
    protokollen() {
      const R = Rutenett(40, 36);
      for (let y = 6; y <= 21; y++) R.rad("perm", y, y === 6 || y === 21 ? 3 : 2, y === 6 || y === 21 ? 36 : 37);
      for (let y = 4; y <= 19; y++) { R.rad("side", y, y === 4 || y === 19 ? 5 : 4, 18); R.rad("side2", y, 21, y === 4 || y === 19 ? 34 : 35); }
      R.rect("rygg", 19, 3, 2, 18);
      for (let y = 6; y < 18; y += 2) { R.rad("tekst", y, 6, 7 + (y * 7) % 7); R.rad("tekst", y, 23, 26 + (y * 5) % 7); }
      R.rect("gul", 17, 9, 6, 3).rect("gulm", 17, 12, 6, 1).rect("pupill", 19, 9, 2, 4);
      for (const [x, n] of [[8, 9], [14, 12], [25, 10], [31, 7]]) { R.rect("b", x, 22, 2, n); R.ell("b", x + 1, 22 + n, 2, 1.5); }
      R.ell("b", 20, 24, 5, 3);
      return mal(R, { perm: "#62182a", side: "#e8dcc0", side2: "#dccfae", rygg: "#3a0e18", tekst: { fast: "#201848" }, gul: GUL, gulm: GULM, pupill: PUPILL, b: BLEKK });
    },
    fjorpennen() {
      const R = Rutenett(28, 44);
      for (let i = 0; i < 30; i++) { const cx = 18 - i * 0.28, cy = 3 + i, w = Math.max(0, Math.sin((i + 2) / 32 * Math.PI) * 6.5); R.rad("fjor", Math.round(cy), Math.round(cx - w), Math.round(cx + w * 0.8)); }
      for (let i = 0; i < 38; i++) R.set("skaft", Math.round(18 - i * 0.28), 3 + i);
      R.form("spiss", [[37, 6, 9], [38, 6, 9], [39, 7, 8], [40, 7, 8], [41, 7, 7]]);
      R.ell("b", 7, 43, 2.5, 1);
      auge(R, 11, 14, true); auge(R, 17, 15, true);
      R.rad("munn", 21, 13, 17).set("tann", 14, 21).set("tann", 16, 21);
      return mal(R, { fjor: { farge: "#d2d0dc", rund: true }, skaft: "#8e8ca4", spiss: "#383070", b: BLEKK, gul: GUL, gulm: GULM, pupill: PUPILL, munn: MUNN, tann: TENN });
    },
    stempelet() {
      const R = Rutenett(30, 36);
      R.ell("tre", 15, 5, 5, 4.5).rect("tre", 13, 9, 4, 8).form("tre", [[17, 6, 23], [18, 4, 25]]).rect("fot", 4, 19, 22, 9);
      R.form("lakk", [[28, 5, 24], [29, 5, 24], [30, 6, 23], [31, 8, 11], [31, 18, 21], [32, 9, 10]]);
      R.rect("gul", 8, 21, 4, 2).rect("gul", 18, 21, 4, 2).rect("pupill", 10, 21, 1, 2).rect("pupill", 20, 21, 1, 2).rad("bryn", 20, 7, 12).rad("bryn", 20, 17, 22);
      R.rad("munn", 25, 10, 20).set("tann", 12, 25).set("tann", 15, 25).set("tann", 18, 25);
      return mal(R, { tre: { farge: "#8a5e36", rund: true }, fot: { farge: "#6c4024", rund: true }, lakk: "#b03c46", gul: GUL, pupill: PUPILL, bryn: { fast: "#2e1a14" }, munn: MUNN, tann: TENN });
    },
    vette() {
      const R = Rutenett(24, 28);
      R.form("hette", [[2, 10, 13], [3, 8, 15], [4, 7, 16], [5, 6, 17], [6, 5, 18], [7, 5, 18], [8, 4, 19], [9, 4, 19], [10, 4, 19], [11, 4, 19], [12, 4, 19]]);
      R.ell("andlet", 12, 10, 4.5, 3.2);
      R.form("kropp", [[13, 5, 18], [14, 4, 19], [15, 4, 19], [16, 3, 20], [17, 3, 20], [18, 3, 20], [19, 3, 20], [20, 4, 19], [21, 4, 19]]);
      R.rect("fot", 6, 22, 3, 2).rect("fot", 15, 22, 3, 2);
      R.rect("lys", 9, 9, 2, 2).rect("lys", 14, 9, 2, 2);
      for (const [x, y] of [[8, 4], [13, 3], [16, 6], [6, 16], [18, 18], [10, 19]]) R.set("mose", x, y);
      return mal(R, { hette: { farge: "#4e6a4a", rund: true }, andlet: { fast: "#0e1210" }, kropp: { farge: "#5a5a48", rund: true }, fot: "#3a3428", lys: { fast: "#7ff0e0" }, mose: { fast: "#8cc060" } });
    },
    irrbloss() {
      const c = lerret(24, 28), g = c.getContext("2d");
      const gr = g.createRadialGradient(12, 13, 1, 12, 13, 12);
      gr.addColorStop(0, "rgba(220,255,250,1)"); gr.addColorStop(0.35, "rgba(127,240,224,.85)"); gr.addColorStop(0.7, "rgba(60,160,180,.35)"); gr.addColorStop(1, "rgba(40,80,120,0)");
      g.fillStyle = gr; g.fillRect(0, 0, 24, 28);
      const R = Rutenett(24, 28).ell("k", 12, 13, 4.5, 5).form("k", [[6, 11, 13], [5, 12, 12], [7, 10, 14]]).form("k", [[18, 10, 14], [19, 11, 13], [20, 12, 12], [21, 11, 11]]);
      R.rect("a", 10, 12, 1, 2).rect("a", 14, 12, 1, 2);
      g.drawImage(mal(R, { k: { fast: "#f0fffc" }, a: { fast: "#1f5a6a" } }, { omriss: false }), 0, 0);
      return c;
    },
    haugbonden() {
      const R = Rutenett(48, 52);
      R.ell("kappe", 23, 26, 13, 9);
      for (let y = 26; y < 47; y++) { const w = 13 + (y - 26) * 0.35; R.rad("kappe", y, Math.round(23 - w), Math.round(23 + w)); }
      for (const x of [14, 22, 30]) for (let y = 30; y < 47; y++) if ((y + x) % 7 !== 0) R.set("fald", x + Math.floor((y - 30) / 8) * (x < 22 ? -1 : x > 22 ? 1 : 0), y);
      R.form("hatt", [[2, 18, 28], [3, 16, 30], [4, 15, 31], [5, 14, 32], [6, 12, 34], [7, 10, 36]]);
      R.ell("hud", 23, 13, 8, 6);
      R.form("skjegg", [[15, 16, 30], [16, 15, 31], [17, 15, 31], [18, 15, 31], [19, 16, 30], [20, 16, 30], [21, 17, 29], [22, 17, 29], [23, 18, 28], [24, 18, 28], [25, 19, 27], [26, 20, 26], [27, 21, 25], [28, 22, 24], [29, 22, 24], [30, 23, 23]]);
      R.rect("stav", 42, 4, 2, 44).ell("stav", 43, 4, 2.5, 2.5);
      R.ell("hand", 40, 27, 3, 2.5).form("arm", [[25, 33, 38], [26, 34, 38], [27, 35, 38], [28, 35, 37]]);
      R.rect("lys", 19, 12, 2, 2).rect("lys", 26, 12, 2, 2).rad("bryn", 11, 18, 21).rad("bryn", 11, 25, 28);
      for (const [x, y] of [[20, 4], [26, 5], [15, 7], [31, 6], [12, 34], [33, 40], [18, 44], [28, 36]]) R.set("mose", x, y).set("mose", x + 1, y);
      return mal(R, { hatt: { farge: "#4e6a4a", rund: true }, hud: { farge: "#8a9a86", rund: true }, skjegg: { farge: "#c8ccd4", rund: true }, kappe: { farge: "#4a4a5a", rund: true }, fald: { fast: "#2a2838" }, arm: "#44425a", hand: { farge: "#8a9a86", rund: true }, stav: "#6a4428", lys: { fast: "#7ff0e0" }, bryn: { fast: "#e8ecf0" }, mose: { fast: "#8cc060" } });
    },
  };
  /* Handteikna fiendar: ei PNG-fil i bilete/spel/ med kvar spelpiksel som éin
     piksel (Blekklatten er 80 × 72). Til biletet er lasta, viser spelet ein
     reservefigur i same storleik. Fleire handteikna fiendar kan leggjast til her. */
  const PNG = {
    blekklatten: { fil: "bilete/spel/blekklatten.png", w: 80, h: 72, reserve: "blekkflekk" },
    // Den namnlause vetten (grå, halvt gjennomsiktig). Haugbonden er òg namnlaus når Ivar kjempar mot han.
    vette: { fil: "bilete/spel/vette3_nameless_1x.png", w: 47, h: 68, reserve: "vette" },
    haugbonden: { fil: "bilete/spel/vette3_nameless_1x.png", w: 47, h: 68, reserve: "haugbonden" },
  };
  function fraPng(d) {
    const c = lerret(d.w, d.h), g = c.getContext("2d");
    g.imageSmoothingEnabled = false;
    const r = FIENDAR[d.reserve](); g.drawImage(r, Math.round((d.w - r.width) / 2), d.h - r.height);
    const img = hent(d.fil);
    const bruk = () => { g.clearRect(0, 0, d.w, d.h); g.drawImage(img, 0, 0, d.w, d.h); };
    if (klar(img)) bruk(); else img.addEventListener("load", bruk, { once: true });
    return c;
  }
  /* Hus som heile figurar (bilete/spel/bygg/<id>.png, laga med tools/pikselkunst/bygg.py).
     Figuren stikk 4 pikslar ut på sidene og 8 opp. Til biletet er lasta, gir bygg() null,
     og kartet viser flisene under i staden. */
  /* Felles biletlager. forhandslast() lastar alle bileta før spelaren ser ein scene
     (tittelskjermen ventar på det), så ingenting poppar inn etterpå. */
  const bilete = new Map();
  function hent(sti) {
    let img = bilete.get(sti);
    if (!img) { img = new Image(); img.src = sti; bilete.set(sti, img); }
    return img;
  }
  const klar = img => img.complete && img.naturalWidth > 0;
  function forhandslast(stiar) {
    return Promise.all([...new Set(stiar)].map(sti => {
      const img = hent(sti);
      if (klar(img)) return Promise.resolve();
      return new Promise(res => { img.addEventListener("load", res, { once: true }); img.addEventListener("error", res, { once: true }); })
        .then(() => (img.decode ? img.decode().catch(() => {}) : null));
    }));
  }
  function lastBilete(sti) {
    const img = hent(sti);
    return klar(img) ? img : null;
  }
  const bygg = id => lastBilete(`bilete/spel/bygg/${id}.png`);
  /* Naturelement som heile figurar (bilete/spel/natur/, laga med tools/pikselkunst/natur.py).
     Gir { img, x, y } med plassering i pikslar relativt til flisa, eller null om det ikkje er noko å teikne.
     Til bileta er lasta, blir dei gamle, kodeteikna trea brukte. */
  // Variantar blir valde etter plassen. Vanlege former står fleire gonger, så dei kjem oftast.
  const NATURTYPE = {
    "#": ["gran1", "gran2", "gran3", "gran1", "gran2", "gran-ung"],
    "t": ["bjork1", "bjork2", "bjork3", "bjork1", "bjork-ung", "bjork-dobbel"],
    "o": ["stein1", "stein2", "stein3", "stein1", "heller", "roys", "einer", "einer", "bauta"],
  };
  function natur(teikn, x, y) {
    const typar = NATURTYPE[teikn];
    if (!typar) return null;
    const namn = typar[Math.floor(hash(x, y, 19) * typar.length)];
    const img = lastBilete(`bilete/spel/natur/${namn}.png`);
    if (img) return { img, x: 8 - Math.floor(img.width / 2), y: 16 - img.height + (teikn === "o" ? 0 : 2), skugge: teikn === "o" ? 6 : 7 };
    if (TRE[teikn]) return { img: treBilete(teikn), x: 0, y: -16 + 0, skugge: 6 };
    return { img: gamalStein(), x: 0, y: 0, skugge: 0 };
  }
  let gamalSteinC = null;
  function gamalStein() {
    if (gamalSteinC) return gamalSteinC;
    gamalSteinC = lerret(16); const R = Rutenett(16, 16).ell("s", 8, 9.5, 6.5, 5); R.rad(null, 15, 0, 15);
    gamalSteinC.getContext("2d").drawImage(mal(R, { s: { farge: "#686680", rund: true } }), 0, 0);
    return gamalSteinC;
  }
  const haugBilete = () => lastBilete("bilete/spel/natur/haug.png");

  /* Alle bileta spelet brukar, til forhandslast(). D er RPGData. */
  function alleBilete(D) {
    const ut = [];
    for (const k of Object.values(D.KART)) {
      for (const b of k.bygg || []) ut.push(`bilete/spel/bygg/${b.id}.png`);
      if (k.bakgrunn) ut.push(`bilete/spel/kamp/${k.bakgrunn}.png`);
    }
    for (const namn of new Set(Object.values(NATURTYPE).flat())) ut.push(`bilete/spel/natur/${namn}.png`);
    ut.push("bilete/spel/natur/haug.png");
    for (const id of Object.keys(D.U)) ut.push(`bilete/spel/figurar/${id}.png`);
    for (const id of Object.values(D.PORTRETT || {})) ut.push(`bilete/spel/portrett/${id}.png`);
    for (const d of Object.values(PNG)) ut.push(d.fil);
    return ut;
  }

  /* Levande eld i grua og kakkelomnen (inventaret er faste bilete, flammane blir teikna her).
     Rutene er i pikslar i biletet. glo: berre glør bak ei luke. */
  const ILD = {
    "inne-grue": [{ x: 5, y: 26, w: 14, h: 15 }],
    "inne-kakkelomn": [{ x: 8, y: 31, w: 8, h: 8, glo: true }],
  };
  // Kva pikslar i ruta flammane kan teiknast på: berre mørket i eldstaden og den faste elden
  // i biletet, så gryta, kroken og kanten ligg framfor flammane.
  const ildMasker = new WeakMap();
  function ildMaske(img, r) {
    let m = ildMasker.get(img);
    if (!m) { m = new Map(); ildMasker.set(img, m); }
    const k = `${r.x},${r.y}`;
    if (!m.has(k)) {
      const c = lerret(img.width, img.height), cg = c.getContext("2d"); cg.drawImage(img, 0, 0);
      const d = cg.getImageData(r.x, r.y, r.w, r.h).data, ok = [];
      for (let i = 0; i < r.w * r.h; i++) {
        const [R, G, B, A] = [d[i * 4], d[i * 4 + 1], d[i * 4 + 2], d[i * 4 + 3]];
        ok.push(A > 0 && ((R < 40 && G < 30 && B < 30) || (R > 200 && G > 80 && B < 80)));
      }
      m.set(k, ok);
    }
    return m.get(k);
  }
  function ild(g, x, y, w, h, t, glo, maske) {
    const k = Math.floor(t / 150);                                    // same takt som lykta, ljosa og elva
    const fyll = (px_, py_, farge) => { if (!maske || maske[(py_ - y) * w + (px_ - x)]) { g.fillStyle = farge; g.fillRect(px_, py_, 1, 1); } };
    for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) fyll(xx, yy, "#140a08");
    const farge = ["#7a1a10", "#c83a18", "#f0902a", "#f8d860", "#fff4c0"];
    for (let cx = 0; cx < w; cx++) {
      const midt = 1 - Math.abs(cx - (w - 1) / 2) / (w / 2);             // høgast på midten
      const flakk = hash(cx, k, 71) * 0.5 + Math.sin(k * 1.3 + cx * 1.9) * 0.18;
      const hh = Math.max(1, Math.round(Math.min(h, 10) * (glo ? 0.35 + flakk * 0.4 : 0.25 + midt * 0.7 + flakk * 0.4)));
      for (let dy = 0; dy < Math.min(h, hh); dy++) {
        const rel = dy / hh;                                             // 0 nede, 1 i tuppen
        let i = rel > 0.8 ? 0 : rel > 0.55 ? 1 : rel > 0.25 ? 2 : 3;
        if (!glo && rel < 0.2 && midt > 0.5 && hash(cx, k, 72) > 0.4) i = 4;
        if (glo) i = Math.min(3, i + (hash(cx, dy + k, 73) > 0.7 ? 1 : 0)) - 1;
        fyll(x + cx, y + h - 1 - dy, farge[Math.max(0, i)]);
      }
    }
    // glør nedst
    for (let cx = 0; cx < w; cx += 2) fyll(x + cx, y + h - 1, hash(cx, k, 74) > 0.5 ? "#f8d860" : "#c83a18");
  }
  const fiendeCache = new Map();
  function fiende(namn) {
    if (fiendeCache.has(namn)) return fiendeCache.get(namn);
    const c = PNG[namn] ? fraPng(PNG[namn]) : (FIENDAR[namn] || FIENDAR.blekkdrope)();
    fiendeCache.set(namn, c);
    return c;
  }

  return { S, FW, FH, flis, topp, kant, klasse, bygg, natur, haugBilete, vatn, steingard, FAST, figur, fiende, lerret, ramp, blend, RAMP,
    hent, klar, forhandslast, alleBilete, ILD, ild, ildMaske };
})();
