/* Feltmotoren i «Blekkranet»: kart sett ovanfrå, rørsle, dører, folk,
   kister, møte med fiendar, samtaleboksar og forteljarskjerm.

   Teikninga skjer på eit lerret på 320 × 192 pikslar (20 × 12 fliser), som
   blir skalert opp med heile tal utan utjamning. Samtalar, menyar og
   forteljing er HTML over lerretet, så teksten blir skarp.

   Motor.last(kartId, merke)  lastar eit kart og set spelaren på merket
   Motor.krokar               { samtale(folk), kiste(k), lampe(), plante(x, y),
                                dor(d), inngang(i), kamp(lag), verd(), meny() }
   Motor.tale(tekst, namn)    samtaleboks, gir eit løfte som blir oppfylt ved Z
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
  let fylgje = null;          // skreppa som går etter Ivar

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
    Object.assign(merke, (RPGData.EKSTRA_MERKE || {})[id] || {});
    const folk = (def.folk || []).filter(f => merke[f.merke] && (!f.vis || f.vis(krokar.tilstand()))).map(f => {
      const [x, y] = merke[f.merke];
      if (f.flis) fliser[y][x] = f.flis;
      return Object.assign({}, f, { x, y, dir: 0, sprite: f.usynleg ? null : Pikslar.figur(RPGData.U[f.u]) });
    });
    kart = { id, def, w, h, fliser, merke, folk, kister: def.kister || [], dorer: def.dorer || [] };
    const [sx, sy] = merke[merkeId] || merke["1"] || [1, 1];
    spelar.x = sx; spelar.y = sy; spelar.fx = sx; spelar.fy = sy; spelar.flytt = null;
    if (dir != null) spelar.dir = dir;
    if (fylgje) { fylgje.x = sx; fylgje.y = sy; fylgje.fx = sx; fylgje.fy = sy; fylgje.spor = []; }
    stegTilKamp = 12 + Math.floor(Math.random() * 14);
    $("rpg-stadnamn").textContent = def.namn;
    $("rpg-stadnamn").classList.remove("vis"); void $("rpg-stadnamn").offsetWidth; $("rpg-stadnamn").classList.add("vis");
    // Plantene som alt er plukka, er vanleg gras.
    if (def.planter) for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (fliser[y][x] === "u" && krokar.plukka && krokar.plukka(x, y)) fliser[y][x] = def.golv;
    const inngang = (def.inngang || []).find(i => i.merke === merkeId);
    if (inngang && krokar.inngang) setTimeout(() => krokar.inngang(inngang), 50);
  }

  const doraVed = (x, y) => kart.dorer.find(d => d.ved[0] === x && d.ved[1] === y);
  const kisteVed = (x, y) => kart.kister.find(k => k.ved[0] === x && k.ved[1] === y);
  const folkVed = (x, y) => kart.folk.find(f => f.x === x && f.y === y);
  function kanGaa(x, y) {
    if (x < 0 || y < 0 || x >= kart.w || y >= kart.h) return false;
    const c = kart.fliser[y][x];
    if (c === "D" || c === "d" || c === "E") return !!doraVed(x, y);
    if (Pikslar.FAST.has(c)) return false;
    if (folkVed(x, y)) return false;
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
    if (f && (f.alle || c === ",") && krokar.kamp) {
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
    if (c === "u" && kart.def.planter && krokar.plante) { krokar.plante(tx, ty); return; }
    if ((c === "D" || c === "d") && !doraVed(tx, ty) && krokar.laast) krokar.laast("Døra er stengd.");
  }
  function fjernFlis(x, y) { kart.fliser[y][x] = kart.def.golv; }

  /* ---------- Teikning ---------- */
  function teikn(no) {
    if (!kart) return;
    const kx = Math.max(0, Math.min(kart.w - VW, spelar.fx - (VW - 1) / 2));
    const ky = Math.max(0, Math.min(kart.h - VH, spelar.fy - (VH - 1) / 2));
    const ox = kart.w < VW ? (VW - kart.w) / 2 : -kx, oy = kart.h < VH ? (VH - kart.h) / 2 : -ky;
    g.fillStyle = "#0e0c12"; g.fillRect(0, 0, lerret.width, lerret.height);
    const x0 = Math.floor(-ox) - 1, y0 = Math.floor(-oy) - 1;
    for (let y = Math.max(0, y0); y < Math.min(kart.h, y0 + VH + 2); y++) for (let x = Math.max(0, x0); x < Math.min(kart.w, x0 + VW + 2); x++) {
      const c = kart.fliser[y][x];
      // Folk som står på ei flis (setjekassa, pulten), har sin eigen tegnrute.
      g.drawImage(Pikslar.flis(c, no), Math.round((x + ox) * S), Math.round((y + oy) * S));
      const k = kisteVed(x, y);
      if (k && krokar.opna && krokar.opna(k)) { g.fillStyle = "rgba(0,0,0,.35)"; g.fillRect(Math.round((x + ox) * S) + 2, Math.round((y + oy) * S) + 4, 12, 3); }
    }
    const figurar = kart.folk.filter(f => f.sprite).map(f => ({ y: f.y, sp: f.sprite, x: f.x, dir: f.dir, steg: 0 }));
    const gaar = !!spelar.flytt;
    if (fylgje) figurar.push({ y: fylgje.fy, x: fylgje.fx, sp: fylgje.sprite, dir: fylgje.dir, steg: gaar ? Math.floor(no / 140) % 2 : 0 });
    figurar.push({ y: spelar.fy, x: spelar.fx, sp: spelar.sprite, dir: spelar.dir, steg: gaar ? Math.floor(no / 140) % 2 : 0 });
    figurar.sort((a, b) => a.y - b.y);
    for (const f of figurar) g.drawImage(f.sp.rammer[f.dir][f.steg], Math.round((f.x + ox) * S), Math.round((f.y + oy) * S) - 2);
  }

  /* ---------- Samtalar og forteljing ---------- */
  const boks = $("rpg-tale"), boksNamn = $("rpg-tale-namn"), boksTekst = $("rpg-tale-tekst");
  function tale(tekst, namn) {
    return new Promise(res => {
      boks.hidden = false;
      boksNamn.textContent = namn || "";
      boksNamn.hidden = !namn;
      boksTekst.textContent = "";
      let i = 0, ferdig = false;
      const skriv = setInterval(() => {
        i += 2;
        boksTekst.textContent = tekst.slice(0, i);
        if (i >= tekst.length) { clearInterval(skriv); ferdig = true; boks.classList.add("klar"); }
      }, 16);
      boks.classList.remove("klar");
      const slepp = lytt({
        a: () => {
          if (!ferdig) { clearInterval(skriv); boksTekst.textContent = tekst; ferdig = true; boks.classList.add("klar"); return; }
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
      boksNamn.textContent = namn || ""; boksNamn.hidden = !namn;
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
    VW, VH, lerret, g, krokar, last, tale, val, fort, lytt, tilpass, fjernFlis,
    pause(p) { pausa = p; if (p) halde.clear(); },
    get kart() { return kart; }, get spelar() { return spelar; },
    settSpelar(sprite) { spelar.sprite = sprite; },
    settFylgje(sprite) { fylgje = sprite ? { sprite, x: spelar.x, y: spelar.y, fx: spelar.x, fy: spelar.y, dir: spelar.dir, flytt: null } : null; },
    E,
  };
})();
