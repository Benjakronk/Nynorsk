/* Pikselgrafikken i «Blekkranet»: fliser, figurar og fiendar, teikna i kode.

   Alt blir teikna éin gong til små lerret (16 × 16 pikslar for fliser og
   figurar, 32 × 32 for fiendar) og skalert opp utan utjamning, så det ser ut
   som eit gammalt konsollspel. Spelet treng difor ingen biletfiler.

   Pikslar.flis(teikn, t)        lerret for eit flisteikn (t = tid, for vatn)
   Pikslar.figur(utsjånad)       { rammer[retning][steg] } for ein person
   Pikslar.fiende(namn)          lerret for ein fiende
   Retningane er 0 ned, 1 opp, 2 venstre, 3 høgre. */
window.Pikslar = (function () {
  "use strict";
  const S = 16;

  function lerret(w, h) { const c = document.createElement("canvas"); c.width = w; c.height = h || w; return c; }
  // Eit enkelt, fast tilfeldig tal per (x, y, frø), så grasmønsteret er likt kvar gong.
  const hash = (x, y, s) => { let h = (x * 374761393 + y * 668265263 + s * 2147483647) | 0; h = (h ^ (h >>> 13)) * 1274126177; return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
  const px = (g, x, y, f, w = 1, h = 1) => { g.fillStyle = f; g.fillRect(x, y, w, h); };

  const F = {
    gras: "#5d9b45", gras2: "#4f8a3b", gras3: "#6fae52", villgras: "#467a36", villgras2: "#3c6b2e",
    jord: "#b89060", jord2: "#a37d50", stein: "#8d8a85", stein2: "#6f6c68", stein3: "#aaa7a0",
    vatn: "#2f6fa8", vatn2: "#3f86c2", vatn3: "#9fd0ee",
    tre: "#2f6b3a", tre2: "#23542d", tre3: "#3f8248", stamme: "#6b4a2a",
    raud: "#9c3b2e", raud2: "#7e2d23", kvit: "#e9e4d4", kvit2: "#cfc8b4",
    torv: "#5f8a3a", torv2: "#4b7030", skifer: "#4d5663", skifer2: "#3a424d",
    plank: "#a8804f", plank2: "#8e6a40", plank3: "#c09462",
    mork: "#2a2530", mork2: "#1c1820", gull: "#e0b43c", papir: "#f1ead6",
  };

  /* ---------- Fliser ---------- */
  function gras(g, x0, y0, base, a, b, fro) {
    px(g, 0, 0, base, S, S);
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      const r = hash(x + x0, y + y0, fro);
      if (r < 0.08) px(g, x, y, a); else if (r > 0.94) px(g, x, y, b);
    }
  }
  const FLIS = {
    ".": g => gras(g, 0, 0, F.gras, F.gras2, F.gras3, 1),
    ",": g => { gras(g, 0, 0, F.villgras, F.villgras2, F.gras2, 2); for (const [x, y] of [[3, 5], [10, 3], [6, 11], [13, 12]]) { px(g, x, y, F.gras3); px(g, x, y - 1, F.gras3); px(g, x + 1, y - 2, F.gras3); } },
    '"': g => { gras(g, 0, 0, F.gras, F.gras2, F.gras3, 3); for (const [x, y, c] of [[3, 4, "#f2d34b"], [11, 6, "#e8e8f0"], [6, 11, "#d9577a"], [13, 13, "#f2d34b"]]) { px(g, x, y, c); px(g, x - 1, y, c); px(g, x + 1, y, c); px(g, x, y - 1, c); px(g, x, y + 1, "#2e5a24"); } },
    "u": g => { FLIS["."](g); px(g, 7, 9, "#2e5a24", 2, 6); px(g, 4, 5, "#c65fd6", 3, 3); px(g, 9, 4, "#c65fd6", 3, 3); px(g, 7, 2, "#e38af0", 2, 3); px(g, 5, 6, "#f4d8f7"); px(g, 10, 5, "#f4d8f7"); },
    "#": g => { FLIS["."](g); px(g, 7, 12, F.stamme, 2, 4); for (let r = 0; r < 12; r++) { const w = 2 + Math.floor(r * 0.9); px(g, 8 - w / 2 | 0, r, r % 3 === 2 ? F.tre2 : F.tre, w, 1); } px(g, 6, 3, F.tre3, 2, 1); px(g, 5, 7, F.tre3, 2, 1); },
    "t": g => { FLIS["."](g); px(g, 7, 10, F.stamme, 2, 6); px(g, 2, 2, F.tre, 12, 9); px(g, 3, 1, F.tre, 10, 1); px(g, 1, 4, F.tre, 14, 5); px(g, 4, 3, F.tre3, 4, 2); px(g, 3, 8, F.tre2, 10, 2); },
    "~": (g, t) => { px(g, 0, 0, F.vatn, S, S); const f = Math.floor(t / 400) % 4; for (let y = 2; y < S; y += 5) for (let x = 0; x < S; x += 8) { const xx = (x + f * 2 + (y % 2) * 3) % S; px(g, xx, y, F.vatn2, 4, 1); px(g, (xx + 1) % S, y - 1, F.vatn3, 2, 1); } },
    "_": g => { px(g, 0, 0, "#dcc79a", S, S); for (let i = 0; i < 12; i++) px(g, hash(i, 1, 4) * S | 0, hash(i, 2, 4) * S | 0, "#c7b081"); },
    "=": g => { px(g, 0, 0, F.jord, S, S); for (let i = 0; i < 14; i++) px(g, hash(i, 3, 5) * S | 0, hash(i, 4, 5) * S | 0, i % 2 ? F.jord2 : "#c9a574"); },
    "^": g => { px(g, 0, 0, F.stein2, S, S); for (let r = 0; r < S; r++) { const w = S - Math.abs(8 - r) * 0; px(g, 0, r, r < 3 ? F.kvit : r % 4 === 0 ? F.stein2 : F.stein, w, 1); } px(g, 2, 5, F.stein3, 5, 1); px(g, 9, 9, F.stein3, 4, 1); px(g, 0, 15, F.stein2, S, 1); },
    "o": g => { FLIS["."](g); px(g, 3, 6, F.stein2, 10, 8); px(g, 4, 5, F.stein, 8, 8); px(g, 5, 6, F.stein3, 3, 2); },
    "|": g => { FLIS["."](g); for (const x of [1, 8, 15]) px(g, x - 1, 4, F.plank2, 2, 10); for (const y of [6, 10]) px(g, 0, y, F.plank, S, 2); },
    "W": g => { px(g, 0, 0, F.raud, S, S); for (let y = 3; y < S; y += 4) px(g, 0, y, F.raud2, S, 1); px(g, 0, 0, F.raud2, 1, S); },
    "w": g => { px(g, 0, 0, F.kvit, S, S); for (let y = 3; y < S; y += 4) px(g, 0, y, F.kvit2, S, 1); },
    "v": g => { px(g, 0, 0, F.raud, S, S); for (let y = 3; y < S; y += 4) px(g, 0, y, F.raud2, S, 1); px(g, 4, 4, F.kvit, 8, 8); px(g, 5, 5, "#6aa3c9", 6, 6); px(g, 7, 5, F.kvit, 2, 6); px(g, 5, 7, F.kvit, 6, 2); },
    "V": g => { FLIS.w(g); px(g, 4, 4, F.raud2, 8, 8); px(g, 5, 5, "#6aa3c9", 6, 6); px(g, 7, 5, F.raud2, 2, 6); px(g, 5, 7, F.raud2, 6, 2); },
    "R": g => { px(g, 0, 0, F.torv, S, S); for (let i = 0; i < 20; i++) px(g, hash(i, 5, 6) * S | 0, hash(i, 6, 6) * S | 0, i % 2 ? F.torv2 : F.gras3); px(g, 0, 15, F.stamme, S, 1); },
    "r": g => { px(g, 0, 0, F.skifer, S, S); for (let y = 0; y < S; y += 4) for (let x = (y / 4) % 2 ? 0 : 4; x < S; x += 8) px(g, x, y, F.skifer2, 1, 4); for (let y = 3; y < S; y += 4) px(g, 0, y, F.skifer2, S, 1); },
    "D": g => { px(g, 0, 0, F.raud, S, S); px(g, 3, 2, F.plank2, 10, 14); px(g, 4, 3, F.plank, 8, 13); px(g, 10, 9, F.gull, 1, 2); },
    "d": g => { px(g, 0, 0, F.kvit, S, S); px(g, 3, 2, F.plank2, 10, 14); px(g, 4, 3, F.plank, 8, 13); px(g, 10, 9, F.gull, 1, 2); },
    "E": g => { px(g, 0, 0, F.plank2, S, S); px(g, 2, 0, F.mork, 12, S); px(g, 3, 12, F.plank3, 10, 4); },
    "P": g => { px(g, 0, 0, F.plank, S, S); for (let y = 0; y < S; y += 4) { px(g, 0, y + 3, F.plank2, S, 1); px(g, (y * 5) % S, y, F.plank2, 1, 3); } },
    "X": g => { px(g, 0, 0, F.mork, S, S); px(g, 0, 12, F.plank2, S, 4); px(g, 0, 12, F.plank3, S, 1); },
    "B": g => { px(g, 0, 0, F.plank2, S, S); for (let y = 1; y < S; y += 5) { px(g, 1, y, F.mork2, 14, 4); for (let x = 2; x < 14; x += 2) px(g, x, y + (x % 3 === 0 ? 1 : 0), ["#8a3b2e", "#2f4f6f", "#5b6b3a", "#b08a3a", "#6b3f6f"][(x + y) % 5], 1, 4 - (x % 3 === 0 ? 1 : 0)); } },
    "K": g => { FLIS.P(g); px(g, 2, 5, F.plank2, 12, 9); px(g, 2, 4, "#8a5a2a", 12, 3); px(g, 2, 7, F.gull, 12, 1); px(g, 7, 7, F.gull, 2, 3); },
    "k": g => { FLIS.P(g); px(g, 1, 4, F.plank3, 14, 6); px(g, 1, 10, F.plank2, 14, 1); px(g, 2, 11, F.plank2, 2, 4); px(g, 12, 11, F.plank2, 2, 4); px(g, 6, 5, F.papir, 4, 3); },
    "b": g => { FLIS.P(g); px(g, 1, 1, F.plank2, 14, 14); px(g, 2, 2, F.kvit, 12, 4); px(g, 2, 6, "#3d6fa0", 12, 9); },
    "p": g => { FLIS.P(g); px(g, 2, 2, F.mork, 12, 12); px(g, 3, 3, "#4a4450", 10, 4); px(g, 7, 0, F.stein2, 2, 3); px(g, 4, 9, F.papir, 8, 3); px(g, 5, 10, F.mork, 6, 1); },
    "S": g => { FLIS.P(g); px(g, 1, 2, F.plank2, 14, 12); for (let y = 3; y < 13; y += 3) for (let x = 2; x < 14; x += 3) px(g, x, y, F.stein3, 2, 2); },
    "L": (g, t) => { FLIS.P(g); px(g, 5, 10, F.plank2, 6, 5); px(g, 7, 4, F.gull, 2, 6); const f = (Math.floor(t / 300) % 2) ? "#ffe9a0" : "#ffd35c"; px(g, 6, 1, f, 4, 4); px(g, 7, 0, "#fff6d0", 2, 2); },
    "Y": g => { px(g, 0, 0, "#8a6b3a", S, S); for (let x = 1; x < S; x += 3) for (let y = 1; y < S; y += 4) { px(g, x, y, "#d6b54a", 1, 3); px(g, x + 1, y, "#c49d34", 1, 2); } },
    "Q": g => { px(g, 0, 0, F.plank, S, S); for (let x = 0; x < S; x += 4) px(g, x + 3, 0, F.plank2, 1, S); },
    "c": g => { px(g, 0, 0, F.stein3, S, S); for (let y = 0; y < S; y += 4) for (let x = (y / 4) % 2 ? 0 : 4; x < S; x += 8) px(g, x, y, F.stein, 1, 4); for (let y = 3; y < S; y += 4) px(g, 0, y, F.stein, S, 1); },
    "f": (g, t) => { px(g, 0, 0, F.stein2, S, S); px(g, 2, 2, F.stein, 12, 12); px(g, 4, 6, F.mork2, 8, 8); const k = Math.floor(t / 200) % 2; px(g, 6, 9 - k, "#f08a24", 4, 5 + k); px(g, 7, 10, "#ffd35c", 2, 3); },
    "z": g => { FLIS.P(g); px(g, 4, 3, F.plank2, 8, 2); px(g, 4, 8, F.plank3, 8, 3); px(g, 4, 11, F.plank2, 1, 4); px(g, 11, 11, F.plank2, 1, 4); },
    "g": g => { px(g, 0, 0, "#3a3540", S, S); px(g, 0, 0, "#4a4450", S, 2); for (let i = 0; i < 6; i++) px(g, hash(i, 7, 8) * S | 0, 3 + hash(i, 8, 8) * 12 | 0, "#26222b", 2, 1); },
    "G": g => { px(g, 0, 0, "#58505e", S, S); for (let y = 0; y < S; y += 4) for (let x = (y / 4) % 2 ? 0 : 4; x < S; x += 8) px(g, x, y, "#46404b", 1, 4); for (let y = 3; y < S; y += 4) px(g, 0, y, "#46404b", S, 1); },
    "n": g => { FLIS.P(g); px(g, 3, 6, "#1c1d20", 10, 7); px(g, 2, 5, "#1c1d20", 12, 2); px(g, 5, 3, "#1c1d20", 6, 3); px(g, 6, 7, "#fff", 1, 1); px(g, 9, 7, "#fff", 1, 1); },
    " ": g => px(g, 0, 0, "#0e0c12", S, S),
  };
  const FAST = new Set(["#", "t", "~", "^", "o", "|", "W", "w", "v", "V", "R", "r", "B", "K", "k", "b", "p", "S", "L", "X", "c", "f", "z", "G", "n", " "]);
  const cache = new Map();
  function flis(teikn, t = 0) {
    const anim = teikn === "~" || teikn === "L" || teikn === "f";
    const nokkel = anim ? `${teikn}:${Math.floor(t / 200) % 8}` : teikn;
    if (cache.has(nokkel)) return cache.get(nokkel);
    const c = lerret(S), g = c.getContext("2d");
    (FLIS[teikn] || FLIS[" "])(g, t);
    cache.set(nokkel, c);
    return c;
  }

  /* ---------- Figurar ---------- */
  // utsjånad: { hud, har, jakke, bukse, hatt, kjole, skjegg, sekk }
  function figur(u) {
    const rammer = [[], [], [], []];
    for (let dir = 0; dir < 4; dir++) for (let steg = 0; steg < 2; steg++) {
      const c = lerret(S), g = c.getContext("2d");
      const beinSkil = steg === 1 ? 1 : 0;
      // skugge
      px(g, 4, 14, "rgba(0,0,0,.25)", 8, 2);
      // bein
      if (u.kjole) { px(g, 4, 9, u.kjole, 8, 5); px(g, 5, 14, u.sko || "#2a2530", 2, 1); px(g, 9, 14, u.sko || "#2a2530", 2, 1); }
      else if (dir < 2) { px(g, 5, 10 + beinSkil, u.bukse, 2, 4 - beinSkil); px(g, 9, 10 + (1 - beinSkil), u.bukse, 2, 4 - (1 - beinSkil)); px(g, 5, 14, "#2a2530", 2, 1); px(g, 9, 14, "#2a2530", 2, 1); }
      else { px(g, 6 + (steg ? -1 : 1), 10, u.bukse, 2, 4); px(g, 8 + (steg ? 1 : -1), 10, u.bukse, 2, 4); px(g, 6, 14, "#2a2530", 4, 1); }
      // kropp
      if (!u.kjole) px(g, 4, 6, u.jakke, 8, 5); else px(g, 4, 6, u.jakke, 8, 4);
      px(g, 3, 7, u.jakke, 1, 3); px(g, 12, 7, u.jakke, 1, 3);
      px(g, 3, 10, u.hud, 1, 1); px(g, 12, 10, u.hud, 1, 1);
      if (u.sekk && dir !== 0) px(g, dir === 2 ? 11 : dir === 3 ? 2 : 5, 6, "#7a5a3a", dir === 1 ? 6 : 3, 5);
      // hovud
      px(g, 5, 1, u.hud, 6, 5);
      px(g, 5, 0, u.har, 6, 2);
      if (dir === 1) px(g, 5, 1, u.har, 6, 4);
      else if (dir === 2) px(g, 9, 1, u.har, 2, 3);
      else if (dir === 3) px(g, 5, 1, u.har, 2, 3);
      else { px(g, 5, 1, u.har, 1, 2); px(g, 10, 1, u.har, 1, 2); }
      if (dir !== 1) {
        const ax = dir === 2 ? [6] : dir === 3 ? [9] : [6, 9];
        for (const x of ax) px(g, x, 3, "#1c1d20");
        if (u.skjegg) px(g, dir === 2 ? 5 : dir === 3 ? 7 : 6, 5, u.skjegg, dir === 0 ? 4 : 4, 1);
      }
      if (u.hatt) { px(g, 4, 0, u.hatt, 8, 1); px(g, 5, -1 + 0, u.hatt, 6, 1); }
      rammer[dir][steg] = c;
    }
    return { rammer };
  }

  /* ---------- Fiendar ---------- */
  const FIENDAR = {
    blekkflekk(g) {
      const b = "#1c1d20";
      for (let y = 8; y < 30; y++) { const w = Math.round(22 * Math.sin(Math.PI * (y - 6) / 26)); px(g, 16 - w / 2, y, b, w, 1); }
      px(g, 4, 26, b, 4, 3); px(g, 25, 25, b, 4, 4); px(g, 27, 12, b, 3, 3);
      px(g, 10, 14, "#fff", 4, 5); px(g, 18, 14, "#fff", 4, 5); px(g, 12, 16, b, 2, 2); px(g, 19, 16, b, 2, 2);
      px(g, 12, 23, "#fff", 8, 1); px(g, 13, 24, "#fff", 1, 1); px(g, 18, 24, "#fff", 1, 1);
    },
    stavefeil(g) {
      px(g, 11, 6, "#e6c9a8", 10, 9); px(g, 10, 3, "#7a3fa0", 12, 4); px(g, 14, 0, "#7a3fa0", 4, 3); px(g, 16, 0, "#e0b43c", 2, 2);
      px(g, 13, 9, "#1c1d20", 2, 2); px(g, 18, 9, "#1c1d20", 2, 2); px(g, 14, 13, "#8a2020", 5, 1);
      px(g, 10, 15, "#7a3fa0", 12, 10); px(g, 11, 25, "#3a2a4a", 3, 5); px(g, 18, 25, "#3a2a4a", 3, 5);
      px(g, 23, 12, "#f1ead6", 7, 9); px(g, 24, 13, "#8a2020", 5, 1); px(g, 24, 16, "#1c1d20", 4, 1); px(g, 24, 18, "#1c1d20", 5, 1);
      px(g, 25, 14, "#8a2020", 1, 3);
    },
    kraake(g) {
      const s = "#1f1d24";
      px(g, 8, 10, s, 16, 12); px(g, 6, 12, s, 4, 8); px(g, 22, 8, s, 6, 7); px(g, 28, 11, "#e0b43c", 4, 2);
      px(g, 25, 9, "#fff", 2, 2); px(g, 26, 10, s, 1, 1);
      px(g, 4, 14, "#2f2d36", 6, 4); px(g, 2, 16, "#2f2d36", 4, 3);
      px(g, 12, 22, "#e0b43c", 1, 5); px(g, 17, 22, "#e0b43c", 1, 5);
      px(g, 20, 3, "#9c3b2e", 8, 5); px(g, 19, 7, "#9c3b2e", 10, 1);          // raud embetsmannshatt
      px(g, 9, 13, "#c9ad8e", 1, 10); px(g, 8, 12, "#f1ead6", 3, 2);           // fjørpenn
    },
    glose(g) {
      const bokst = ["L", "A", "T", "I", "N"];
      for (let i = 0; i < 5; i++) { const x = 3 + i * 5, y = 16 + Math.round(Math.sin(i) * 5); px(g, x, y, "#d9c79a", 6, 7); px(g, x + 1, y + 1, "#f1ead6", 4, 5); px(g, x + 2, y + 2, "#5a3f2a", 2, 3); }
      px(g, 27, 12, "#d9c79a", 5, 7); px(g, 28, 14, "#1c1d20", 1, 1); px(g, 30, 14, "#1c1d20", 1, 1); px(g, 28, 17, "#8a2020", 3, 1);
      void bokst;
    },
    setjekasse(g) {
      px(g, 4, 6, "#6b4a2a", 24, 22); px(g, 5, 7, "#8e6a40", 22, 20);
      for (let y = 8; y < 26; y += 4) for (let x = 6; x < 26; x += 4) px(g, x, y, "#aaa7a0", 3, 3);
      px(g, 9, 11, "#1c1d20", 4, 3); px(g, 19, 11, "#1c1d20", 4, 3); px(g, 10, 12, "#ff6040", 2, 1); px(g, 20, 12, "#ff6040", 2, 1);
      px(g, 11, 20, "#1c1d20", 10, 2);
      px(g, 0, 12, "#6b4a2a", 4, 10); px(g, 28, 12, "#6b4a2a", 4, 10); px(g, 7, 28, "#6b4a2a", 5, 4); px(g, 20, 28, "#6b4a2a", 5, 4);
    },
    skugge(g) {
      for (let y = 2; y < 32; y++) { const w = Math.round(28 * Math.sin(Math.PI * y / 34)); px(g, 16 - w / 2, y, y % 5 === 0 ? "#2a1f3a" : "#140f1c", w, 1); }
      px(g, 9, 11, "#b0f", 4, 3); px(g, 19, 11, "#b0f", 4, 3); px(g, 10, 12, "#fff", 2, 1); px(g, 20, 12, "#fff", 2, 1);
      px(g, 11, 20, "#b0f", 10, 1); px(g, 10, 19, "#b0f", 1, 1); px(g, 21, 19, "#b0f", 1, 1);
      px(g, 26, 2, "#c9ad8e", 2, 10); px(g, 25, 0, "#f1ead6", 4, 3);
    },
  };
  function fiende(namn) {
    const nokkel = "fiende:" + namn;
    if (cache.has(nokkel)) return cache.get(nokkel);
    const c = lerret(32), g = c.getContext("2d");
    (FIENDAR[namn] || FIENDAR.blekkflekk)(g);
    cache.set(nokkel, c);
    return c;
  }

  /* ---------- Skreppa: ein levande ryggsekk ---------- */
  function skreppa() {
    const rammer = [[], [], [], []];
    for (let dir = 0; dir < 4; dir++) for (let steg = 0; steg < 2; steg++) {
      const c = lerret(S), g = c.getContext("2d");
      const hopp = steg ? 1 : 0;
      px(g, 4, 14, "rgba(0,0,0,.25)", 8, 2);
      px(g, 3, 4 - hopp, "#7a5a3a", 10, 10); px(g, 4, 3 - hopp, "#8e6a40", 8, 2); px(g, 3, 7 - hopp, "#5f4428", 10, 1);
      px(g, 2, 5 - hopp, "#5f4428", 1, 7); px(g, 13, 5 - hopp, "#5f4428", 1, 7);
      if (dir !== 1) { px(g, dir === 3 ? 7 : 5, 9 - hopp, "#fff", 2, 2); px(g, dir === 2 ? 7 : 9, 9 - hopp, "#fff", 2, 2); px(g, dir === 3 ? 8 : 5, 10 - hopp, "#1c1d20", 1, 1); px(g, dir === 2 ? 7 : 10, 10 - hopp, "#1c1d20", 1, 1); }
      px(g, 5, 14, "#5f4428", 2, 1); px(g, 9, 14, "#5f4428", 2, 1);
      rammer[dir][steg] = c;
    }
    return { rammer };
  }

  return { S, flis, FAST, figur, fiende, skreppa, lerret, F };
})();
