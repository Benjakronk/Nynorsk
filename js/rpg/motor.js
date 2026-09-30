/* Feltmotoren i «Aasen: Språkvandringa»: kart sett ovanfrå, rørsle, dører, folk,
   kister, møte med fiendar, samtaleboksar og forteljarskjerm.

   Figurane er 16 × 24 pikslar og står med føtene nedst i ruta si. Tretoppar
   blir teikna etter figurane, så ein kan gå bak dei.

   Teikninga skjer på eit lerret på 320 × 192 pikslar (20 × 12 fliser), som
   blir skalert opp med heile tal utan utjamning. Samtalar, menyar og
   forteljing er HTML over lerretet, så teksten blir skarp.

   Motor.last(kartId, merke)  lastar eit kart og set spelaren på merket
   Motor.krokar               { tilstand(), modus(), samtale(folk), kiste(k), lampe(),
                                dor(d), laast(tekst), inngang(i), kamp(lag), meny(),
                                opna(k), synleg(k) }
   Motor.tale(tekst, namn)    samtaleboks, gir eit løfte som blir oppfylt ved Z.
                              ⟪ord⟫ i teksten blir utheva.
   Motor.fort(linjer)         forteljing på svart skjerm
   Motor.pause(true|false)    stoppar rørsla (under samtalar, menyar og kamp) */
window.Motor = (function () {
  "use strict";
  const S = Pikslar.S, VW = 20, VH = 12;
  const $ = id => document.getElementById(id);
  const E = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const lerret = $("rpg-lerret"), g = lerret.getContext("2d");
  lerret.width = VW * S; lerret.height = VH * S;
  g.imageSmoothingEnabled = false;

  const DX = [0, 0, -1, 1], DY = [1, -1, 0, 0];
  let kart = null;            // { id, def, w, h, fliser, merke, folk, kister, dorer }
  let spelar = { x: 0, y: 0, dir: 0, fx: 0, fy: 0, flytt: null, steg: 0, sprite: null };
  let pausa = true, stegTilKamp = 20;
  const krokar = {};
  let fylgje = null;          // den i partiet som går etter Ivar

  /* ---------- Tastatur og berøring ---------- */
  const halde = new Set();
  const RETNING = { ArrowDown: 0, s: 0, S: 0, ArrowUp: 1, w: 1, W: 1, ArrowLeft: 2, a: 2, A: 2, ArrowRight: 3, d: 3, D: 3 };
  let paaTrykk = null;        // éin lyttar for Z/Enter/mellomrom (samtale, meny, kamp)
  document.addEventListener("keydown", e => {
    if (e.target.closest && e.target.closest("input, textarea")) return;
    if (e.key in RETNING) { halde.add(RETNING[e.key]); if (!pausa || paaTrykk) e.preventDefault(); if (paaTrykk && paaTrykk.retning) paaTrykk.retning(RETNING[e.key]); }
    else if (["z", "Z", "Enter", " "].includes(e.key)) { e.preventDefault(); if (e.repeat) return; trykkA(); }
    else if (["x", "X", "Escape", "Backspace"].includes(e.key)) { if (e.repeat) return; trykkB(e); }
  });
  document.addEventListener("keyup", e => { if (e.key in RETNING) halde.delete(RETNING[e.key]); });
  window.addEventListener("blur", () => halde.clear());
  function trykkA() {
    if (paaTrykk && paaTrykk.a) { paaTrykk.a(); return; }
    if (!pausa && !spelar.flytt) samhandle();
  }
  function trykkB(e) {
    if (paaTrykk && paaTrykk.b) { if (e) e.preventDefault(); paaTrykk.b(); return; }
    if (!pausa && !spelar.flytt && krokar.meny) { if (e) e.preventDefault(); krokar.meny(); }
  }
  // Styrekrossen på skjermen (mobil og nettbrett)
  document.querySelectorAll("[data-pad]").forEach(b => {
    const v = b.dataset.pad;
    const ned = e => {
      e.preventDefault();
      if (v === "a") trykkA(); else if (v === "b") trykkB();
      else { halde.add(+v); if (paaTrykk && paaTrykk.retning) paaTrykk.retning(+v); }
    };
    const opp = () => { if (v !== "a" && v !== "b") halde.delete(+v); };
    b.addEventListener("pointerdown", ned);
    b.addEventListener("pointerup", opp); b.addEventListener("pointerleave", opp); b.addEventListener("pointercancel", opp);
  });
  function lytt(l) { const gammal = paaTrykk; paaTrykk = l; return () => { paaTrykk = gammal; }; }

  /* ---------- Kart ---------- */
  function last(id, merkeId, dir) {
    const def = RPGData.KART[id];
    const rader = def.rader;
    const h = rader.length, w = Math.max(...rader.map(r => r.length));
    const fliser = [], merke = {};
    for (let y = 0; y < h; y++) {
      fliser.push([]);
      for (let x = 0; x < w; x++) {
        let c = rader[y][x] || "#";
        if (/[0-9@%$!&*]/.test(c)) { merke[c] = [x, y]; c = def.golv; }
        fliser[y].push(c);
      }
    }
    // Talmerke (framfor dører og ved kantane) som ligg inntil ein sti, blir sti, så stien går heilt fram til døra.
    for (const [m, [x, y]] of Object.entries(merke)) {
      if (!/[0-9]/.test(m)) continue;
      if ([[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => (fliser[y + dy] || [])[x + dx] === "=")) fliser[y][x] = "=";
    }
    Object.assign(merke, (RPGData.EKSTRA_MERKE || {})[id] || {});
    const folk = (def.folk || []).filter(f => merke[f.merke] && (!f.vis || f.vis(krokar.tilstand()))).map(f => {
      const [x, y] = merke[f.merke];
      if (f.flis) fliser[y][x] = f.flis;
      return Object.assign({}, f, { x, y, dir: 0, sprite: f.usynleg ? null : Pikslar.figur(RPGData.U[f.u]) });
    });
    kart = { id, def, w, h, fliser, merke, folk, kister: def.kister || [], dorer: (def.dorer || []).filter(d => d.til) };
    const [sx, sy] = merke[merkeId] || merke["1"] || [1, 1];
    spelar.x = sx; spelar.y = sy; spelar.fx = sx; spelar.fy = sy; spelar.flytt = null;
    if (dir != null) spelar.dir = dir;
    if (fylgje) { fylgje.x = sx; fylgje.y = sy; fylgje.fx = sx; fylgje.fy = sy; fylgje.spor = []; }
    stegTilKamp = 12 + Math.floor(Math.random() * 14);
    $("rpg-stadnamn").textContent = def.namn;
    $("rpg-stadnamn").classList.remove("vis"); void $("rpg-stadnamn").offsetWidth; $("rpg-stadnamn").classList.add("vis");
    const inngang = (def.inngang || []).find(i => i.merke === merkeId);
    if (inngang && krokar.inngang) setTimeout(() => krokar.inngang(inngang), 50);
  }

  const doraVed = (x, y) => kart.dorer.find(d => d.ved[0] === x && d.ved[1] === y);
  const kisteSynleg = k => !k.gøymd || (krokar.synleg && krokar.synleg(k));
  const kisteVed = (x, y) => kart.kister.find(k => k.ved[0] === x && k.ved[1] === y && kisteSynleg(k));
  const folkVed = (x, y) => kart.folk.find(f => f.x === x && f.y === y);
  function kanGaa(x, y) {
    if (x < 0 || y < 0 || x >= kart.w || y >= kart.h) return false;
    const c = kart.fliser[y][x];
    if (c === "D" || c === "d" || c === "E") return !!doraVed(x, y);
    if (Pikslar.FAST.has(c)) return false;
    if (folkVed(x, y) || kisteVed(x, y)) return false;
    return true;
  }

  /* ---------- Rørsle ---------- */
  const FART = 150;           // ms per flis
  function oppdater(no) {
    if (pausa || !kart) return;
    if (spelar.flytt) {
      const u = Math.min(1, (no - spelar.flytt.t0) / FART);
      spelar.fx = spelar.flytt.fx + (spelar.x - spelar.flytt.fx) * u;
      spelar.fy = spelar.flytt.fy + (spelar.y - spelar.flytt.fy) * u;
      if (fylgje && fylgje.flytt) { fylgje.fx = fylgje.flytt.fx + (fylgje.x - fylgje.flytt.fx) * u; fylgje.fy = fylgje.flytt.fy + (fylgje.y - fylgje.flytt.fy) * u; }
      if (u >= 1) { spelar.flytt = null; if (fylgje) fylgje.flytt = null; komFram(); }
      return;
    }
    const dir = [...halde].pop();
    if (dir == null) return;
    spelar.dir = dir;
    const nx = spelar.x + DX[dir], ny = spelar.y + DY[dir];
    // Ut over kanten frå ei kantdør
    const her = doraVed(spelar.x, spelar.y);
    if ((nx < 0 || ny < 0 || nx >= kart.w || ny >= kart.h) && her && her.kant) { gaaGjennom(her); return; }
    const dor = doraVed(nx, ny);
    if (dor && !(dor.kant && dor.ved[0] === spelar.x && dor.ved[1] === spelar.y)) {
      // Kantdører: ein går inn på ruta, og vidare. Vanlege dører: ein går rett gjennom.
      if (!dor.kant) { gaaGjennom(dor); return; }
    }
    if (!kanGaa(nx, ny)) return;
    if (fylgje) { fylgje.flytt = { fx: fylgje.x, fy: fylgje.y }; fylgje.dir = retningMot(fylgje.x, fylgje.y, spelar.x, spelar.y, fylgje.dir); fylgje.x = spelar.x; fylgje.y = spelar.y; }
    spelar.flytt = { fx: spelar.x, fy: spelar.y, t0: no };
    spelar.x = nx; spelar.y = ny;
    spelar.steg++;
  }
  const retningMot = (x0, y0, x1, y1, d) => x1 > x0 ? 3 : x1 < x0 ? 2 : y1 > y0 ? 0 : y1 < y0 ? 1 : d;

  function gaaGjennom(dor) {
    if (dor.krev && !krokar.tilstand().flagg[dor.krev]) { if (krokar.laast) krokar.laast(dor.laast || "Døra er stengd."); return; }
    if (krokar.dor) krokar.dor(dor);
  }
  function komFram() {
    const dor = doraVed(spelar.x, spelar.y);
    if (dor && dor.kant) { gaaGjennom(dor); return; }
    for (const [m, [x, y]] of Object.entries(kart.merke)) {
      const inn = (kart.def.inngang || []).find(i => i.merke === m);
      if (inn && x === spelar.x && y === spelar.y && krokar.inngang) { krokar.inngang(inn); return; }
    }
    const f = kart.def.fiendar;
    const c = kart.fliser[spelar.y][spelar.x];
    if (f && !kart.def.fristad && (f.alle || c === ",") && krokar.kamp) {
      if (--stegTilKamp <= 0) {
        stegTilKamp = 14 + Math.floor(Math.random() * 14);
        const lag = f.lag[Math.floor(Math.random() * f.lag.length)];
        krokar.kamp(lag);
      }
    }
  }

  function samhandle() {
    const tx = spelar.x + DX[spelar.dir], ty = spelar.y + DY[spelar.dir];
    const f = folkVed(tx, ty);
    if (f) { if (!f.usynleg) f.dir = [1, 0, 3, 2][spelar.dir]; if (krokar.samtale) krokar.samtale(f); return; }
    const k = kisteVed(tx, ty);
    if (k && krokar.kiste) { krokar.kiste(k); return; }
    const c = kart.fliser[ty] && kart.fliser[ty][tx];
    if (c === "L" && krokar.lampe) { krokar.lampe(); return; }
    if ((c === "D" || c === "d" || c === "E") && krokar.laast) { const d = (kart.def.dorer || []).find(d => d.ved[0] === tx && d.ved[1] === ty); if (!d || !d.til) krokar.laast((d && d.laast) || "Døra er stengd."); }
  }
  function fjernFolk(merke) { if (kart) kart.folk = kart.folk.filter(f => f.merke !== merke); }

  /* ---------- Teikning ---------- */
  const KANTSIDER = [["n", 0, -1], ["s", 0, 1], ["w", -1, 0], ["e", 1, 0]];
  const NABOBIT = [[1, 0, -1], [2, 1, 0], [4, 0, 1], [8, -1, 0], [16, 1, -1], [32, 1, 1], [64, -1, 1], [128, -1, -1]];
  /* Vatn: «~», og skog på kanten av kartet som grensar til vatn (så trea ikkje står i vatnet). */
  function erVatn(x, y) {
    const r = kart.fliser[y]; if (!r) return false;
    const c = r[x];
    if (c === "~") return true;
    if (c !== "#") return false;
    const kantrute = x === 0 || y === 0 || x === kart.w - 1 || y === kart.h - 1;
    if (!kantrute) return false;
    return [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [1, -1], [-1, 1], [1, 1]].some(([dx, dy]) => (kart.fliser[y + dy] || [])[x + dx] === "~");
  }

  /* ---------- Stemning: lys og skugge over kartet ----------
     kart.def.stemning: «morgon» (varmt lys og skyskuggar), «kveld», «inne»
     (mørkare rom med varme ljoskjelder), «mork» (berre ljos rundt Ivar og lampene). */
  const morke = document.createElement("canvas"); morke.width = VW * S; morke.height = VH * S;
  const mg = morke.getContext("2d");
  function ljosPunkt(ctx, x, y, r, a) {
    const gr = ctx.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, `rgba(0,0,0,${a})`); gr.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gr; ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  function glod(x, y, r, farge, a) {
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, `rgba(${farge},${a})`); gr.addColorStop(1, `rgba(${farge},0)`);
    g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2);
  }
  function stemning(no, ox, oy) {
    const st = kart.def.stemning;
    if (!st) return;
    const W = VW * S, Hh = VH * S;
    if (st === "morgon" || st === "kveld") {
      const gr = g.createLinearGradient(0, 0, 0, Hh);
      if (st === "morgon") { gr.addColorStop(0, "rgba(255,222,160,0.22)"); gr.addColorStop(0.5, "rgba(255,210,150,0.06)"); gr.addColorStop(1, "rgba(60,40,110,0.14)"); }
      else { gr.addColorStop(0, "rgba(120,60,140,0.28)"); gr.addColorStop(1, "rgba(30,20,70,0.30)"); }
      g.fillStyle = gr; g.fillRect(0, 0, W, Hh);
      // Skyskuggar som driv over landskapet
      const kw = kart.w * S + 240;
      for (let i = 0; i < 3; i++) {
        const cx = ((no * 0.008 + i * 311) % kw) - 120 + ox * S, cy = ((i * 97 + no * 0.003) % (kart.h * S + 120)) - 60 + oy * S;
        const gr2 = g.createRadialGradient(cx, cy, 4, cx, cy, 70);
        gr2.addColorStop(0, "rgba(20,24,60,0.2)"); gr2.addColorStop(1, "rgba(20,24,60,0)");
        g.fillStyle = gr2; g.fillRect(cx - 70, cy - 70, 140, 140);
      }
    } else if (st === "kyrkje") {
      // Lyst kyrkjerom: ljosstrålar skrått ned frå vindauga i veggen
      g.globalCompositeOperation = "lighter";
      for (let x = 0; x < kart.w; x++) for (let y = 0; y < kart.h; y++) {
        if (kart.fliser[y][x] !== "u") continue;
        const sx = (x + ox) * S, sy = (y + oy) * S + 10, puls = 0.08 + Math.sin(no / 1400 + x) * 0.015;
        const gr = g.createLinearGradient(sx, sy, sx + 40, sy + 90);
        gr.addColorStop(0, `rgba(255,236,190,${puls + 0.06})`); gr.addColorStop(1, "rgba(255,236,190,0)");
        g.fillStyle = gr; g.beginPath(); g.moveTo(sx + 4, sy); g.lineTo(sx + 12, sy); g.lineTo(sx + 52, sy + 90); g.lineTo(sx + 30, sy + 90); g.closePath(); g.fill();
      }
      g.globalCompositeOperation = "source-over";
    } else {
      const djup = st === "mork" ? 0.8 : st === "inne" ? 0.34 : 0.2;
      mg.globalCompositeOperation = "source-over"; mg.clearRect(0, 0, W, Hh);
      mg.fillStyle = `rgba(14,8,28,${djup})`; mg.fillRect(0, 0, W, Hh);
      mg.globalCompositeOperation = "destination-out";
      const ljos = [];
      if (st === "mork") ljos.push([(spelar.fx + ox) * S + 8, (spelar.fy + oy) * S + 4, 58 + Math.sin(no / 300) * 2, 1, null]);
      // Grua er ein figur (inventar): ho gir eld-ljos på staden sin.
      for (const b of kart.def.bygg || []) if (b.id === "inne-grue" || b.id === "inne-kakkelomn") ljos.push([(b.x + ox) * S + 8, (b.y + oy) * S + 26, 62 + Math.sin(no / 90 + b.x) * 3, 1, "255,140,50"]);
      for (let y = 0; y < kart.h; y++) for (let x = 0; x < kart.w; x++) {
        const c = kart.fliser[y][x];
        if (c === "f" || c === "L") ljos.push([(x + ox) * S + 8, (y + oy) * S + (c === "L" ? 3 : 10), (c === "f" ? 54 : 40) + Math.sin(no / 90 + x) * 2.5, 1, c === "f" ? "255,140,50" : "255,210,110"]);
      }
      for (const [x, y, r, a] of ljos) ljosPunkt(mg, x, y, r, a);
      mg.globalCompositeOperation = "source-over";
      g.drawImage(morke, 0, 0);
      g.globalCompositeOperation = "lighter";
      for (const [x, y, r, , farge] of ljos) if (farge) glod(x, y, r * 0.7, farge, 0.16);
      g.globalCompositeOperation = "source-over";
    }
    // Vignett
    const v = g.createRadialGradient(W / 2, Hh / 2, Hh * 0.45, W / 2, Hh / 2, W * 0.62);
    v.addColorStop(0, "rgba(10,5,20,0)"); v.addColorStop(1, "rgba(10,5,20,0.32)");
    g.fillStyle = v; g.fillRect(0, 0, W, Hh);
  }

  /* Overgang inn i kamp: kvit blink, så blir biletet grovare og mørknar. */
  function overgang() {
    return new Promise(res => {
      const kopi = document.createElement("canvas"); kopi.width = lerret.width; kopi.height = lerret.height;
      kopi.getContext("2d").drawImage(lerret, 0, 0);
      const liten = document.createElement("canvas"), lg = liten.getContext("2d");
      const t0 = performance.now(), dur = 620;
      const steg = () => {
        const u = Math.min(1, (performance.now() - t0) / dur);
        const blokk = Math.max(1, Math.round(1 + u * u * 24));
        liten.width = Math.ceil(lerret.width / blokk); liten.height = Math.ceil(lerret.height / blokk);
        lg.imageSmoothingEnabled = false; lg.drawImage(kopi, 0, 0, liten.width, liten.height);
        g.imageSmoothingEnabled = false; g.drawImage(liten, 0, 0, liten.width * blokk, liten.height * blokk);
        g.fillStyle = u < 0.12 ? `rgba(255,255,255,${0.7 - u * 5})` : `rgba(10,5,20,${Math.min(1, (u - 0.2) * 1.3)})`;
        g.fillRect(0, 0, lerret.width, lerret.height);
        if (u < 1) requestAnimationFrame(steg); else res();
      };
      requestAnimationFrame(steg);
    });
  }

  function teikn(no) {
    if (!kart) return;
    const kx = Math.max(0, Math.min(kart.w - VW, spelar.fx - (VW - 1) / 2));
    const ky = Math.max(0, Math.min(kart.h - VH, spelar.fy - (VH - 1) / 2));
    const ox = kart.w < VW ? (VW - kart.w) / 2 : -kx, oy = kart.h < VH ? (VH - kart.h) / 2 : -ky;
    g.fillStyle = "#0e0c12"; g.fillRect(0, 0, lerret.width, lerret.height);
    const x0 = Math.floor(-ox) - 1, y0 = Math.floor(-oy) - 1;
    const naturFig = [];
    for (let y = Math.max(0, y0); y < Math.min(kart.h, y0 + VH + 2); y++) for (let x = Math.max(0, x0); x < Math.min(kart.w, x0 + VW + 2); x++) {
      const c = kart.fliser[y][x];
      const sx = Math.round((x + ox) * S), sy = Math.round((y + oy) * S);
      // Veggar med vegg eller dør under seg er sidevegger: dei blir teikna ovanfrå.
      const under = y + 1 < kart.h ? kart.fliser[y + 1][x] : null;
      const topp = "XcG".includes(c) && (under === null || "XcGE".includes(under));
      let fk = topp ? c + "t" : c;
      if (c === "R") { const over = y > 0 && kart.fliser[y - 1][x] === "R"; fk = !over && under !== "R" ? "Rtb" : !over ? "Rt" : under !== "R" ? "Rb" : "R"; }
      if (erVatn(x, y)) {
        // Vatn med strandkant etter naboane (sjå Pikslar.vatn)
        let maske = 0, bank = "gras";
        for (const [bit, dx, dy] of NABOBIT) {
          const n = kart.fliser[y + dy] && kart.fliser[y + dy][x + dx];
          if (n != null && !erVatn(x + dx, y + dy) && n !== "Q") {
            maske |= bit;
            if (bit < 16) bank = n === "_" ? "sand" : "^ocj".includes(n) ? "stein" : bank;
          }
        }
        // Straum: vatn med vatn over og under, men land på sida (bekken i utmarka)
        const straum = !(maske & 1) && !(maske & 4) && ((maske & 2) || (maske & 8)) && kart.def.golv === ",";
        g.drawImage(Pikslar.vatn(no, (x * 7 + y * 3) % 4, maske, bank, straum), sx, sy);
      } else g.drawImage(Pikslar.flis(fk, no, x, y, kart.def.golv), sx, sy);
      // Steingard: muren er ein figur som blir sortert etter djupn
      if (c === "j") {
        const nb = (dx, dy) => (kart.fliser[y + dy] && kart.fliser[y + dy][x + dx]) === "j";
        const maske = (nb(0, -1) ? 1 : 0) | (nb(1, 0) ? 2 : 0) | (nb(0, 1) ? 4 : 0) | (nb(-1, 0) ? 8 : 0);
        naturFig.push({ y: y + 0.003, x, mur: Pikslar.steingard((x * 3 + y) % 3, maske) });
      }
      // Kantar: gras over veg og sand
      const kl = Pikslar.klasse(c);
      if (kl === "veg" || kl === "sand") {
        for (const [side, dx, dy] of KANTSIDER) {
          const n = kart.fliser[y + dy] && kart.fliser[y + dy][x + dx];
          if (n == null) continue;
          const nk = Pikslar.klasse(n);
          if (nk === "gras") g.drawImage(Pikslar.kant("gras", side, (x * 7 + y * 3) % 4), sx, sy);
        }
      }
      const nf = erVatn(x, y) ? null : Pikslar.natur(c, x, y);
      if (nf) {
        if (nf.skugge) { g.fillStyle = "rgba(20,24,50,0.3)"; g.beginPath(); g.ellipse(sx + 9, sy + 14, nf.skugge, 2.5, 0, 0, Math.PI * 2); g.fill(); }
        naturFig.push({ y: y + 0.005, x, natur: nf });
      }
      if (c === "h" && kart.fliser[y][x - 1] !== "h" && (y === 0 || kart.fliser[y - 1][x] !== "h")) {
        const hb = Pikslar.haugBilete();
        if (hb) naturFig.push({ y: y + 1.004, x, haug: hb });
      }
      const k = kisteVed(x, y);
      if (k && k.gøymd) g.drawImage(Pikslar.flis("K", 0, 0, 0, kart.def.golv), sx, sy);
      if (k && krokar.opna && krokar.opna(k)) { g.fillStyle = "rgba(10,5,20,.45)"; g.fillRect(sx + 2, sy + 4, 12, 3); }
    }
    const GANG = [1, 0, 2, 0];
    const figurar = kart.folk.filter(f => f.sprite).map(f => ({ y: f.y, sp: f.sprite, x: f.x, dir: f.dir, steg: 0 }));
    const gaar = !!spelar.flytt;
    const steg = gaar ? GANG[Math.floor(no / 110) % 4] : 0;
    if (fylgje) figurar.push({ y: fylgje.fy, x: fylgje.fx, sp: fylgje.sprite, dir: fylgje.dir, steg });
    figurar.push({ y: spelar.fy, x: spelar.fx, sp: spelar.sprite, dir: spelar.dir, steg });
    for (const n of naturFig) figurar.push(n);
    // Hus blir sorterte saman med figurane etter den nedste flisraden sin.
    for (const b of kart.def.bygg || []) { const img = Pikslar.bygg(b.id); if (img) figurar.push({ y: b.over ? 999 : b.y + b.h - 1 + 0.01, by: b.y + b.h - 1, x: b.x, bygg: img, over: b.over }); }
    figurar.sort((a, b) => a.y - b.y);
    for (const f of figurar) {
      if (f.mur) { g.drawImage(f.mur, Math.round((f.x + ox) * S), Math.round((Math.floor(f.y) + oy) * S) - 6); continue; }
      if (f.natur) { g.drawImage(f.natur.img, Math.round((f.x + ox) * S) + f.natur.x, Math.round((Math.floor(f.y) + oy) * S) + f.natur.y); continue; }
      if (f.haug) { g.drawImage(f.haug, Math.round((f.x + ox) * S) - 1, Math.round((Math.floor(f.y) + 1 + oy) * S) - f.haug.height); continue; }
      if (f.over) { g.drawImage(f.bygg, Math.round((f.x + ox) * S) - 4, Math.round((f.by + 1 + oy) * S) - f.bygg.height); continue; }
      if (f.bygg) {
        // slagskugge på bakken, mot høgre og ned (lyset kjem frå oppe til venstre)
        const bx = Math.round((f.x + ox) * S), by = Math.round((f.y + 1 + oy) * S), bw = f.bygg.width - 8;
        g.fillStyle = "rgba(20,24,50,0.28)"; g.fillRect(bx + 3, by, bw, 4); g.fillRect(bx + bw, by - f.bygg.height + 14, 4, f.bygg.height - 10);
        g.drawImage(f.bygg, Math.round((f.x + ox) * S) - 4, Math.round((f.y - (f.bygg.height - 8) / S + 1 + oy) * S) - 8 + 0); continue; }
      const sx = Math.round((f.x + ox) * S), sy = Math.round((f.y + oy) * S);
      g.fillStyle = "rgba(10,5,20,.28)"; g.fillRect(sx + 3, sy + 13, 10, 3); g.fillRect(sx + 4, sy + 12, 8, 5);
      g.drawImage(f.sp.rammer[f.dir][f.steg], sx, sy - 9);
    }
    // Står spelaren (eller følgjet) bak eit hus eller tårn, blir han vist som ein svak silhuett over.
    for (const f of figurar) {
      if (!f.sp || (f.sp !== spelar.sprite && !(fylgje && f.sp === fylgje.sprite))) continue;
      const sx = Math.round((f.x + ox) * S), sy = Math.round((f.y + oy) * S) - 9;
      const bak = (kart.def.bygg || []).some(b => {
        const img = Pikslar.bygg(b.id); if (!img || b.over || f.y >= b.y + b.h - 1) return false;
        const bx = Math.round((b.x + ox) * S) - 4, by = Math.round((b.y + b.h + oy) * S) - img.height;
        return sx + 12 > bx + 4 && sx + 4 < bx + img.width - 4 && sy + 22 > by + 4 && sy + 4 < by + img.height;
      });
      if (bak) { g.globalAlpha = 0.4; g.drawImage(f.sp.rammer[f.dir][f.steg], sx, sy); g.globalAlpha = 1; }
    }
    stemning(no, ox, oy);
  }

  /* ---------- Samtalar og forteljing ---------- */
  const boks = $("rpg-tale"), boksNamn = $("rpg-tale-namn"), boksTekst = $("rpg-tale-tekst"), boksPortrett = $("rpg-tale-portrett");
  // Portrett: bilete/spel/portrett/<id>.png, der id kjem frå RPGData.PORTRETT[namn].
  function visPortrett(namn) {
    const id = namn && (RPGData.PORTRETT || {})[namn];
    boks.classList.toggle("med-portrett", !!id);
    if (id) boksPortrett.src = `bilete/spel/portrett/${id}.png`;
  }
  // ⟪ord⟫ blir utheva. Skrivemaskinteksten viser dei første n teikna.
  function taleHtml(tekst, n) {
    let ut = "", i = 0, inne = false;
    for (const ch of tekst) {
      if (ch === "⟪") { inne = true; ut += '<b class="rpg-ord">'; continue; }
      if (ch === "⟫") { inne = false; ut += "</b>"; continue; }
      if (i++ >= n) break;
      ut += E(ch);
    }
    return ut + (inne ? "</b>" : "");
  }
  function tale(tekst, namn) {
    return new Promise(res => {
      boks.hidden = false;
      boksNamn.textContent = namn || "";
      boksNamn.hidden = !namn;
      visPortrett(namn);
      boksTekst.textContent = "";
      const lengd = [...tekst.replace(/[⟪⟫]/g, "")].length;
      let i = 0, ferdig = false;
      const skriv = setInterval(() => {
        i += 2;
        boksTekst.innerHTML = taleHtml(tekst, i);
        if (i >= lengd) { clearInterval(skriv); ferdig = true; boks.classList.add("klar"); }
      }, 16);
      boks.classList.remove("klar");
      const slepp = lytt({
        a: () => {
          if (!ferdig) { clearInterval(skriv); boksTekst.innerHTML = taleHtml(tekst, Infinity); ferdig = true; boks.classList.add("klar"); return; }
          slepp(); boks.hidden = true; res();
        },
      });
      boks.onclick = () => paaTrykk && paaTrykk.a && paaTrykk.a();
    });
  }
  // Val mellom alternativ i samtaleboksen. Gir indeksen.
  function val(tekst, alt, namn) {
    return new Promise(res => {
      boks.hidden = false;
      boksNamn.textContent = namn || ""; boksNamn.hidden = !namn; visPortrett(namn);
      boksTekst.innerHTML = `${E(tekst)}<span class="rpg-val">${alt.map((a, i) => `<button type="button" data-i="${i}">${E(a)}</button>`).join("")}</span>`;
      boks.classList.add("klar");
      let valt = 0;
      const kn = [...boksTekst.querySelectorAll("button")];
      const merk = () => kn.forEach((b, i) => b.classList.toggle("peikar", i === valt));
      merk();
      const ferdig = i => { slepp(); boks.hidden = true; boks.onclick = null; res(i); };
      kn.forEach((b, i) => b.addEventListener("click", e => { e.stopPropagation(); ferdig(i); }));
      const slepp = lytt({ a: () => ferdig(valt), b: () => ferdig(alt.length - 1), retning: d => { if (d === 1 || d === 2) valt = (valt + alt.length - 1) % alt.length; if (d === 0 || d === 3) valt = (valt + 1) % alt.length; merk(); } });
      boks.onclick = null;
    });
  }
  const fortEl = $("rpg-fort");
  function fort(linjer) {
    return new Promise(res => {
      fortEl.hidden = false; fortEl.innerHTML = "";
      let i = 0;
      const neste = () => {
        if (i >= linjer.length) { slepp(); fortEl.classList.add("ut"); setTimeout(() => { fortEl.hidden = true; fortEl.classList.remove("ut"); res(); }, 350); return; }
        const p = document.createElement("p");
        p.textContent = linjer[i++];
        fortEl.appendChild(p);
      };
      const slepp = lytt({ a: neste });
      fortEl.onclick = () => neste();
      neste();
    });
  }

  /* ---------- Løkke ---------- */
  function loop(no) {
    requestAnimationFrame(loop);
    if (krokar.modus && krokar.modus() !== "felt") return;
    oppdater(performance.now());
    teikn(performance.now());
  }
  requestAnimationFrame(loop);

  function tilpass() {
    const rot = $("rpg-skjerm");
    const b = rot.clientWidth, h = rot.clientHeight;
    const k = Math.max(1, Math.floor(Math.min(b / (VW * S), h / (VH * S)) * 2) / 2);
    lerret.style.width = `${VW * S * k}px`; lerret.style.height = `${VH * S * k}px`;
  }
  window.addEventListener("resize", tilpass);

  return {
    VW, VH, lerret, g, krokar, last, tale, val, fort, lytt, tilpass, fjernFolk, overgang,
    pause(p) { pausa = p; if (p) halde.clear(); },
    get kart() { return kart; }, get spelar() { return spelar; },
    settSpelar(sprite) { spelar.sprite = sprite; },
    settFylgje(sprite) { fylgje = sprite ? { sprite, x: spelar.x, y: spelar.y, fx: spelar.x, fy: spelar.y, dir: spelar.dir, flytt: null } : null; },
    E,
  };
})();
