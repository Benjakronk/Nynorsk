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
   Motor.scene(byt)           rask toning til svart, byt() (til dømes Motor.last), og tilbake.
                              Standard mellom alle scener. Motor.tonUt() og tonInn() kvar for seg.
   Motor.pause(true|false)    stoppar rørsla (under samtalar, menyar og kamp)
   Regi i skripta scener (verkar også i pause, sjå js/rpg/README.md):
   Motor.gaa(kven, mal, fart), snu(kven, retning), inn(def), kamera(til, ms),
   kort(stad, tid), naerbilete(src, tekst), blink(), rist(ms), tonUt(ms, farge) */
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
  let spelar = { x: 0, y: 0, dir: 0, fx: 0, fy: 0, flytt: null, steg: 0, u: 0, sprite: null };
  let pausa = true, stegTilKamp = 20;
  let dorAnim = null;         // { tx, ty, form, t0 } medan ei dør opnar seg
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
      const dir = f.retning != null ? f.retning : 0;
      return Object.assign({}, f, { x, y, fx: x, fy: y, hx: x, hy: y, dir, grunndir: dir, steg: 0, flytt: null,
        neste: performance.now() + 800 + Math.random() * 2500, sprite: f.usynleg ? null : Pikslar.figur(RPGData.U[f.u]) });
    });
    kart = { id, def, w, h, fliser, merke, folk, kister: def.kister || [], dorer: (def.dorer || []).filter(d => d.til) };
    for (const a of regi) { a.regi.res(); a.regi = null; } regi.clear(); kam = null;      // nytt kart: regien byrjar på nytt
    const [sx, sy] = merke[merkeId] || merke["1"] || [1, 1];
    spelar.x = sx; spelar.y = sy; spelar.fx = sx; spelar.fy = sy; spelar.flytt = null;
    if (dir != null) spelar.dir = dir;
    else {                                                           // står ein ved ei dør, ser ein bort frå henne
      const d = kart.dorer.find(d => Math.abs(d.ved[0] - sx) + Math.abs(d.ved[1] - sy) === 1);
      if (d) spelar.dir = d.ved[1] > sy ? 1 : d.ved[1] < sy ? 0 : d.ved[0] > sx ? 2 : 3;
    }
    plasserFylgje();
    stegTilKamp = 12 + Math.floor(Math.random() * 14);
    $("rpg-stadnamn").textContent = def.namn;
    $("rpg-stadnamn").classList.remove("vis"); void $("rpg-stadnamn").offsetWidth; $("rpg-stadnamn").classList.add("vis");
    const inngang = (def.inngang || []).find(i => i.merke === merkeId);
    if (inngang && krokar.inngang) setTimeout(() => krokar.inngang(inngang), 50);
  }

  /* Set følgjet (huldra) ned attmed spelaren: éi flis bak han (motsett av der han ser), eller
     til sida om det ikkje går (til dømes når døra er bak han), elles på same flis. */
  function plasserFylgje() {
    if (!fylgje || !kart) return;
    const bak = [1, 0, 3, 2][spelar.dir], sider = spelar.dir < 2 ? [2, 3] : [0, 1];
    let [fx, fy] = [spelar.x, spelar.y];
    for (const d of [bak, ...sider]) {
      const x = spelar.x + DX[d], y = spelar.y + DY[d];
      if (kanGaa(x, y) && !doraVed(x, y)) { fx = x; fy = y; break; }
    }
    Object.assign(fylgje, { x: fx, y: fy, fx, fy, dir: spelar.dir, flytt: null, spor: [] });
  }
  // Set spelaren på ein stad (til dømes frå lagring) og følgjet attmed.
  function plasser(x, y, dir) {
    Object.assign(spelar, { x, y, fx: x, fy: y, flytt: null });
    if (dir != null) spelar.dir = dir;
    plasserFylgje();
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

  /* Figurane (16 × 24) blir teikna så mange pikslar over flisa si. Føtene står då om lag midt
     i nedre halvdel av flisa, så ein går på vegen og ikkje langs graskanten nedst. */
  const FOT = 12;

  /* ---------- Rørsle ---------- */
  const FART = 150;           // ms per flis
  // Plasserer spelaren (og følgjet) der dei skal vere no i steget.
  function flytt(no) {
    const u = Math.min(1, (no - spelar.flytt.t0) / FART);
    spelar.u = u;
    spelar.fx = spelar.flytt.fx + (spelar.x - spelar.flytt.fx) * u;
    spelar.fy = spelar.flytt.fy + (spelar.y - spelar.flytt.fy) * u;
    if (fylgje && fylgje.flytt) { fylgje.fx = fylgje.flytt.fx + (fylgje.x - fylgje.flytt.fx) * u; fylgje.fy = fylgje.flytt.fy + (fylgje.y - fylgje.flytt.fy) * u; }
    return u;
  }
  /* ---------- Folk som lever litt ----------
     atferd i data.js: «stille» (står i retninga si), «snu» (ser seg rundt av og til),
     «gaa» (går litt omkring innanfor radius fliser frå staden sin). retning: 0 ned,
     1 opp, 2 venstre, 3 høgre. Etter ein samtale går ein tilbake til vanen sin. */
  const FOLK_FART = 260;
  const naerDor = (x, y) => kart.dorer.some(d => Math.abs(d.ved[0] - x) + Math.abs(d.ved[1] - y) <= 1)
    || Object.entries(kart.merke).some(([m, [mx, my]]) => /[0-9]/.test(m) && mx === x && my === y);
  function folkKanGaa(f, x, y) {
    if (x < 0 || y < 0 || x >= kart.w || y >= kart.h) return false;
    const c = kart.fliser[y][x];
    if (Pikslar.FAST.has(c) || "DdE~Q".includes(c) || erVatn(x, y)) return false;
    if (Math.abs(x - f.hx) + Math.abs(y - f.hy) > (f.radius || 1)) return false;
    if (spelar.x === x && spelar.y === y) return false;
    if (spelar.flytt && Math.round(spelar.flytt.fx) === x && Math.round(spelar.flytt.fy) === y) return false;
    if (kart.folk.some(o => o !== f && ((o.x === x && o.y === y) || (o.flytt && o.flytt.fx === x && o.flytt.fy === y)))) return false;
    return !kisteVed(x, y) && !naerDor(x, y);
  }
  function oppdaterFolk(no) {
    for (const f of kart.folk) {
      if (!f.sprite || f.flis || f.regi) continue;
      if (f.flytt) {
        const u = Math.min(1, (no - f.flytt.t0) / FOLK_FART); f.u = u;
        f.fx = f.flytt.fx + (f.x - f.flytt.fx) * u; f.fy = f.flytt.fy + (f.y - f.flytt.fy) * u;
        if (u >= 1) f.flytt = null;
        continue;
      }
      if (no < f.neste) continue;
      const atferd = f.atferd || "stille";
      if (atferd === "stille") { f.dir = f.grunndir; f.neste = no + 1e9; continue; }
      if (atferd === "snu") {
        const val = f.snu || [0, 1, 2, 3];
        f.dir = Math.random() < 0.4 ? f.grunndir : val[Math.floor(Math.random() * val.length)];
        f.neste = no + 1800 + Math.random() * 3500;
        continue;
      }
      // gaa: eit steg i ei tilfeldig retning, eller berre snu seg om det ikkje går
      const dir = Math.floor(Math.random() * 4), nx = f.x + DX[dir], ny = f.y + DY[dir];
      f.dir = dir;
      if (Math.random() < 0.7 && folkKanGaa(f, nx, ny)) {
        f.flytt = { fx: f.x, fy: f.y, t0: no }; f.x = nx; f.y = ny; f.steg++; f.kjensle = null;
        f.neste = no + FOLK_FART + 600 + Math.random() * 2600;
      } else f.neste = no + 900 + Math.random() * 2000;
    }
  }
  function oppdater(no) {
    if (pausa || !kart || byter || spelar.regi) return;
    oppdaterFolk(no);
    let t0 = no;
    if (spelar.flytt) {
      if (flytt(no) < 1) return;
      // Steget er ferdig. Neste steg byrjar der dette slutta, i same biletet,
      // så figuren ikkje står i ro eit bilete eller to på kvar flis (det gav hakk).
      t0 = Math.max(spelar.flytt.t0 + FART, no - FART / 2);
      spelar.flytt = null; if (fylgje) fylgje.flytt = null;
      const k0 = kart;
      komFram();
      if (pausa || kart !== k0 || (krokar.modus && krokar.modus() !== "felt")) return;
    }
    if (!taSteg(t0)) return;
    spelar.kjensle = null; if (fylgje) fylgje.kjensle = null;        // ei kjensle varer til ein går
    flytt(no);
  }
  // Byrjar eit nytt steg i retninga som blir halden nede. Gir true om figuren flyttar seg.
  function taSteg(no) {
    const dir = [...halde].pop();
    if (dir == null) return false;
    spelar.dir = dir;
    const nx = spelar.x + DX[dir], ny = spelar.y + DY[dir];
    // Ut over kanten frå ei kantdør
    const her = doraVed(spelar.x, spelar.y);
    if ((nx < 0 || ny < 0 || nx >= kart.w || ny >= kart.h) && her && her.kant) { gaaGjennom(her); return false; }
    const dor = doraVed(nx, ny);
    if (dor && !(dor.kant && dor.ved[0] === spelar.x && dor.ved[1] === spelar.y)) {
      // Kantdører: ein går inn på ruta, og vidare. Vanlege dører: ein går rett gjennom.
      if (!dor.kant) { gaaGjennom(dor); return false; }
    }
    if (!kanGaa(nx, ny)) return false;
    if (fylgje) { fylgje.flytt = { fx: fylgje.x, fy: fylgje.y }; fylgje.dir = retningMot(fylgje.x, fylgje.y, spelar.x, spelar.y, fylgje.dir); fylgje.x = spelar.x; fylgje.y = spelar.y; }
    spelar.flytt = { fx: spelar.x, fy: spelar.y, t0: no };
    spelar.x = nx; spelar.y = ny;
    spelar.steg++;
    return true;
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
    if (f) { if (!f.usynleg) { f.dir = [1, 0, 3, 2][spelar.dir]; f.neste = performance.now() + 4000; } if (krokar.samtale) krokar.samtale(f); return; }
    const k = kisteVed(tx, ty);
    if (k && krokar.kiste) { krokar.kiste(k); return; }
    const c = kart.fliser[ty] && kart.fliser[ty][tx];
    if (c === "L" && krokar.lampe) { krokar.lampe(); return; }
    if ((c === "D" || c === "d" || c === "E") && krokar.laast) { const d = (kart.def.dorer || []).find(d => d.ved[0] === tx && d.ved[1] === ty); if (!d || !d.til) krokar.laast((d && d.laast) || "Døra er stengd."); }
  }
  // Tek bort ein person på kartet, etter merket eller namnet.
  function fjernFolk(kven) { if (kart) kart.folk = kart.folk.filter(f => f.merke !== kven && f.namn !== kven); }

  /* ---------- Regi: figurar, kamera og effektar i skripta scener ----------
     Alt her verkar også medan motoren er pausa (under samtalar og mellomsekvensar).
     Figurane blir nemnde med «spelar», «fylgje», namnet på ein person på kartet eller merket hans. */
  const RETNINGSNAMN = { ned: 0, opp: 1, venstre: 2, hogre: 3, "høgre": 3 };
  const regi = new Set();     // figurar som går etter manus no
  function aktor(kven) {
    if (kven === "spelar") return spelar;
    if (kven === "fylgje") return fylgje;
    return kart && kart.folk.find(f => f.namn === kven || f.merke === kven) || null;
  }
  // Stien som tekst: «h3o2» er tre steg til høgre og to opp (n ned, o opp, v venstre, h høgre).
  function lesSti(s) {
    const ut = [];
    for (const [, c, n] of s.matchAll(/([novh])(\d*)/g)) for (let i = 0; i < (+n || 1); i++) ut.push("novh".indexOf(c));
    return ut;
  }
  // Kortaste veg frå figuren a til (tx, ty), utanom faste ting og andre figurar. Gir retningane.
  function vegTil(a, tx, ty) {
    const fri = (x, y) => {
      if (x === tx && y === ty) return true;
      if (x < 0 || y < 0 || x >= kart.w || y >= kart.h) return false;
      const c = kart.fliser[y][x];
      if (Pikslar.FAST.has(c) || "DdE".includes(c) || erVatn(x, y) || kisteVed(x, y)) return false;
      if (a !== spelar && spelar.x === x && spelar.y === y) return false;
      return !kart.folk.some(f => f !== a && f.sprite && f.x === x && f.y === y);
    };
    const fra = new Map([[a.x + "," + a.y, null]]), ko = [[a.x, a.y]];
    while (ko.length) {
      const [x, y] = ko.shift();
      if (x === tx && y === ty) {
        const sti = [];
        for (let k = x + "," + y; fra.get(k); k = fra.get(k).k) sti.unshift(fra.get(k).d);
        return sti;
      }
      for (let d = 0; d < 4; d++) {
        const nx = x + DX[d], ny = y + DY[d], k = nx + "," + ny;
        if (!fra.has(k) && fri(nx, ny)) { fra.set(k, { k: x + "," + y, d }); ko.push([nx, ny]); }
      }
    }
    return null;
  }
  /* Lèt ein figur gå. mal: { sti: "h3o2" } eller [retningar], { rute: [x, y] }, eller
     { mot: kven } (går bort til ruta ved sida av den andre og snur seg mot han).
     fart: ms per flis. Når spelaren går, kjem følgjet etter. Løftet blir oppfylt når figuren står. */
  function gaa(kven, mal, fart) {
    const a = aktor(kven);
    if (!a || !kart) return Promise.resolve();
    let sti = [], snuMot = null;
    if (mal.sti) sti = typeof mal.sti === "string" ? lesSti(mal.sti) : mal.sti.slice();
    else {
      let maal = mal.rute;
      if (mal.mot) {
        snuMot = aktor(mal.mot);
        if (snuMot) {
          // Den næraste ledige ruta inntil den andre (kortaste veg).
          let best = null;
          for (let d = 0; d < 4; d++) {
            const v = vegTil(a, snuMot.x + DX[d], snuMot.y + DY[d]);
            if (v && (!best || v.length < best.length)) best = v;
          }
          sti = best || [];
        }
      } else if (maal) {
        if (typeof maal === "string") maal = kart.merke[maal];
        sti = (maal && vegTil(a, maal[0], maal[1])) || [];
        if (maal && !sti.length && (a.x !== maal[0] || a.y !== maal[1])) console.warn("Regi: fann ingen veg for", kven, maal);
      }
    }
    return new Promise(res => {
      a.regi = { sti, fart: fart || (a === spelar ? FART * 1.4 : FOLK_FART), res: () => {
        if (snuMot) a.dir = retningMot(a.x, a.y, snuMot.x, snuMot.y, a.dir);
        res();
      } };
      if (a === spelar) spelar.flytt = null;
      regi.add(a);
    });
  }
  function regiSteg(a, no) {
    const r = a.regi;
    let t0 = no;
    if (a.flytt) {
      const u = Math.min(1, (no - a.flytt.t0) / r.fart); a.u = u;
      a.fx = a.flytt.fx + (a.x - a.flytt.fx) * u; a.fy = a.flytt.fy + (a.y - a.flytt.fy) * u;
      const f = r.drag;
      if (f) { f.fx = f.flytt.fx + (f.x - f.flytt.fx) * u; f.fy = f.flytt.fy + (f.y - f.flytt.fy) * u; }
      if (u < 1) return;
      t0 = Math.max(a.flytt.t0 + r.fart, no - r.fart / 2);
      a.flytt = null; if (f) { f.flytt = null; r.drag = null; }
    }
    if (!r.sti.length) {
      regi.delete(a); a.regi = null;
      if (a.hx != null) { a.hx = a.x; a.hy = a.y; a.neste = no + 2000; }       // folk får ein ny heimstad
      r.res(); return;
    }
    const d = r.sti.shift(), x0 = a.x, y0 = a.y;
    a.dir = d; a.flytt = { fx: x0, fy: y0, t0 }; a.x += DX[d]; a.y += DY[d]; a.steg = (a.steg || 0) + 1; a.u = 0; a.kjensle = null;
    if (a === spelar && fylgje && !fylgje.regi) {
      fylgje.flytt = { fx: fylgje.x, fy: fylgje.y }; fylgje.dir = retningMot(fylgje.x, fylgje.y, x0, y0, fylgje.dir);
      fylgje.x = x0; fylgje.y = y0; r.drag = fylgje;
    }
  }
  function snu(kven, retning) {
    const a = aktor(kven); if (!a) return;
    const m = typeof retning === "string" && !(retning in RETNINGSNAMN) ? aktor(retning) : null;
    a.dir = m ? retningMot(a.x, a.y, m.x, m.y, a.dir) : typeof retning === "string" ? RETNINGSNAMN[retning] : retning;
    if (a.grunndir != null) { a.grunndir = a.dir; a.neste = performance.now() + 3000; }
  }
  // Set ein ny person inn på kartet: { namn, u, rute: [x, y] eller merke, retning, atferd, tale }.
  function inn(def) {
    if (!kart) return;
    const [x, y] = typeof def.rute === "string" ? kart.merke[def.rute] : def.rute;
    const dir = typeof def.retning === "string" ? RETNINGSNAMN[def.retning] : def.retning || 0;
    kart.folk.push(Object.assign({ atferd: "stille" }, def, { x, y, fx: x, fy: y, hx: x, hy: y, dir, grunndir: dir, steg: 0, flytt: null,
      neste: performance.now() + 2000, sprite: Pikslar.figur(RPGData.U[def.u]) }));
  }

  /* Kamera: til ei rute [x, y], til ein figur (som det så følgjer), eller null (tilbake til
     spelaren). Kameraet glir dit på ms millisekund. */
  let kam = null, sentrum = { x: 0, y: 0 };
  function kamera(til, ms = 900) {
    const a = typeof til === "string" ? aktor(til) : null;
    const mal = til == null ? () => ({ x: spelar.fx, y: spelar.fy }) : a ? () => ({ x: a.fx, y: a.fy }) : () => ({ x: til[0], y: til[1] });
    kam = { fra: { x: sentrum.x, y: sentrum.y }, t0: performance.now(), ms: Math.max(1, ms), mal, tilbake: til == null };
    return vent(ms);
  }
  function kameraSentrum(no) {
    if (!kam) return { x: spelar.fx, y: spelar.fy };
    const u = Math.min(1, (no - kam.t0) / kam.ms), e = u < 0.5 ? 2 * u * u : 1 - (-2 * u + 2) ** 2 / 2, m = kam.mal();
    if (u >= 1 && kam.tilbake) kam = null;
    return { x: kam ? kam.fra.x + (m.x - kam.fra.x) * e : m.x, y: kam ? kam.fra.y + (m.y - kam.fra.y) * e : m.y };
  }

  // Ristar biletet (eit skred, ein dør som smell).
  function rist(ms = 400, styrke = 3) {
    return new Promise(res => {
      const t0 = performance.now();
      const s = () => {
        const u = (performance.now() - t0) / ms;
        if (u >= 1) { lerret.style.translate = ""; res(); return; }
        const k = styrke * (1 - u);
        lerret.style.translate = `${Math.round((Math.random() * 2 - 1) * k)}px ${Math.round((Math.random() * 2 - 1) * k)}px`;
        requestAnimationFrame(s);
      };
      requestAnimationFrame(s);
    });
  }
  // Kort med stad og tid over scena, som ein undertekst i film. Går bort av seg sjølv, eller ved Z.
  function kort(stad, tid, ms = 2600) {
    return new Promise(res => {
      const el = document.createElement("div");
      el.className = "rpg-kort";
      el.innerHTML = `<p class="kort-stad">${E(stad)}</p>${tid ? `<p class="kort-tid">${E(tid)}</p>` : ""}`;
      $("rpg-skjerm").appendChild(el);
      let ferdig = false;
      const slutt = () => { if (ferdig) return; ferdig = true; slepp(); clearTimeout(tm); el.classList.add("ut"); setTimeout(() => { el.remove(); res(); }, 500); };
      const slepp = lytt({ a: slutt });
      requestAnimationFrame(() => el.classList.add("vis"));
      const tm = setTimeout(slutt, ms);
    });
  }
  // Nærbilete: eit bilete midt på skjermen (eit segl, ei side i ei bok), med tekst under. Ventar på Z.
  function naerbilete(src, tekst) {
    return new Promise(res => {
      const el = document.createElement("div");
      el.className = "rpg-forvandling rpg-naer";
      el.innerHTML = `<img src="${E(src)}" alt="">${tekst ? `<p class="rpg-vindauge fv-tekst">${E(tekst)}</p>` : ""}`;
      $("rpg-skjerm").appendChild(el);
      let ferdig = false;
      const slutt = () => { if (ferdig) return; ferdig = true; slepp(); el.classList.add("ut"); setTimeout(() => { el.remove(); res(); }, 400); };
      const slepp = lytt({ a: slutt });
      el.onclick = slutt;
    });
  }

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


  /* ---------- Dører som opnar seg, og toning mellom scener ----------
     Når spelaren går inn gjennom ei dør på eit hus, sviv dørbladet inn og opninga blir mørk.
     Så tonar skjermen raskt til svart, det nye kartet blir lasta, og skjermen tonar inn att.
     Forma på døra i kvart husbilete (pikslar i flisa): x og w, høgd h og avstand til botnen. */
  const DORFORM = {
    standard: { x: 2, w: 12, h: 13, bunn: 3 },
    loe: { x: 1, w: 14, h: 13, bunn: 3, dobbel: true },
    stabbur: { x: 2, w: 12, h: 11, bunn: 9 },
    kyrkje: { x: 3, w: 10, h: 14, bunn: 3, dobbel: true, farge: ["#3a0e18", "#6a1a2a", "#983040"] },
  };
  const DOR_TID = 240, TONING = 180;
  let byter = false;
  const vent = ms => new Promise(r => setTimeout(r, ms));
  /* Toning: rask overgang til svart og tilbake er standard mellom alle scener (kart, kamp,
     tittel, verdskart). Eit svart lag ligg over heile spelet, også kampen og vindauga. */
  const svartEl = $("rpg-svart");
  // farge: svart som standard, kvitt til dømes når «biletet går i kvitt» i ein mellomsekvens.
  function toning(til, ms = TONING, farge) {
    if (farge) svartEl.style.background = farge;
    else if (til > 0) svartEl.style.background = "";
    svartEl.style.transition = `opacity ${ms}ms linear`;
    svartEl.style.opacity = String(til);
    return vent(ms + 20);
  }
  const tonUt = (ms, farge) => toning(1, ms, farge), tonInn = ms => toning(0, ms);
  // Kort kvitt blink (ein ring som brest, eit lyn).
  async function blink(ms = 260) { await toning(0.9, ms * 0.3, "#fff"); await toning(0, ms * 0.7); }
  /* Pikseleffekten før kamp (som i Final Fantasy): eit kvitt blink, og biletet løyser seg opp
     i stadig større pikslar. Etterpå tonar skjermen til svart, og kuttet til kampscena skjer
     i svart (sjå kamp() i spel.js). */
  function overgang() {
    return new Promise(res => {
      const kopi = document.createElement("canvas"); kopi.width = lerret.width; kopi.height = lerret.height;
      kopi.getContext("2d").drawImage(lerret, 0, 0);
      const liten = document.createElement("canvas"), lg = liten.getContext("2d");
      const t0 = performance.now(), dur = 560;
      const steg = () => {
        const u = Math.min(1, (performance.now() - t0) / dur);
        const blokk = Math.max(1, Math.round(1 + u * u * 24));
        liten.width = Math.ceil(lerret.width / blokk); liten.height = Math.ceil(lerret.height / blokk);
        lg.imageSmoothingEnabled = false; lg.drawImage(kopi, 0, 0, liten.width, liten.height);
        g.imageSmoothingEnabled = false; g.drawImage(liten, 0, 0, liten.width * blokk, liten.height * blokk);
        g.fillStyle = u < 0.12 ? `rgba(255,255,255,${0.7 - u * 5})` : `rgba(10,5,20,${Math.min(0.35, (u - 0.2) * 0.5)})`;
        g.fillRect(0, 0, lerret.width, lerret.height);
        if (u < 1) requestAnimationFrame(steg); else res();
      };
      requestAnimationFrame(steg);
    });
  }
  // Byter scene: tonar ut, køyrer byt() (som kan vere async) og tonar inn att.
  async function scene(byt) {
    const var_ = byter; byter = true; halde.clear();
    await tonUt(); await byt(); await vent(40); await tonInn();
    byter = var_;
  }
  // Går gjennom ei dør: opnar ho om ho sit på eit hus, tonar til svart, kallar byt() (som lastar
  // det nye kartet) og tonar inn att.
  async function gjennomDor(dor, byt) {
    byter = true; halde.clear();
    const [tx, ty] = dor.ved;
    const b = (kart.def.bygg || []).find(b => {
      const img = Pikslar.bygg(b.id); if (!img) return false;
      const bf = Math.round((img.width - 8) / S);
      return tx >= b.x && tx < b.x + bf && ty === b.y + b.h - 1;
    });
    if (b && spelar.x === tx && spelar.y === ty + 1) {
      spelar.dir = 1;
      dorAnim = { tx, ty, form: DORFORM[b.id] || DORFORM.standard, t0: performance.now() };
      await vent(DOR_TID + 60);
    }
    await tonUt();
    dorAnim = null;
    byt();
    await vent(40);
    await tonInn();
    byter = false;
  }
  function teiknDor(no, ox, oy) {
    const { tx, ty, form: f, t0 } = dorAnim;
    const o = Math.min(1, (no - t0) / DOR_TID);                        // kor ope døra er
    const dx = Math.round((tx + ox) * S) + f.x, bunn = Math.round((ty + 1 + oy) * S) - f.bunn, dy = bunn - f.h;
    g.fillStyle = "#140c10"; g.fillRect(dx, dy, f.w, f.h);            // mørket inne
    g.fillStyle = "#2a1810"; g.fillRect(dx, bunn - 2, f.w, 2);         // litt varmt ljos ved dørstokken
    const tre = f.farge || ["#26160e", "#664228", "#8a6038"];
    const blad = (x, w, spegl) => {                                    // dørbladet, sett på skrå når det sviv inn
      if (w <= 0) return;
      g.fillStyle = tre[1]; g.fillRect(x, dy, w, f.h);
      g.fillStyle = tre[2]; g.fillRect(spegl ? x + w - 1 : x, dy, 1, f.h);
      g.fillStyle = tre[0]; g.fillRect(x, dy + 3, w, 1); g.fillRect(x, dy + f.h - 4, w, 1);
    };
    const opa = Math.max(1, Math.round((f.dobbel ? f.w / 2 : f.w) * (1 - o * 0.85)));
    if (f.dobbel) { blad(dx, opa, false); blad(dx + f.w - opa, opa, true); } else blad(dx, opa, false);
  }

  // Silhuetten av eit bilete i skuggefarge (til slagskuggen under hus og inventar).
  const skuggar = new WeakMap();
  function skuggeAv(img) {
    let c = skuggar.get(img);
    if (!c) {
      c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
      const sg = c.getContext("2d"); sg.drawImage(img, 0, 0);
      sg.globalCompositeOperation = "source-in"; sg.fillStyle = "rgb(20,24,50)"; sg.fillRect(0, 0, c.width, c.height);
      skuggar.set(img, c);
    }
    return c;
  }

  function teikn(no) {
    if (!kart) return;
    const sm = kameraSentrum(no);
    const kx = Math.max(0, Math.min(kart.w - VW, sm.x - (VW - 1) / 2));
    const ky = Math.max(0, Math.min(kart.h - VH, sm.y - (VH - 1) / 2));
    sentrum = { x: kx + (VW - 1) / 2, y: ky + (VH - 1) / 2 };       // der kameraet faktisk står (til neste kamerarørsle)
    const ox = kart.w < VW ? (VW - kart.w) / 2 : -kx, oy = kart.h < VH ? (VH - kart.h) / 2 : -ky;
    g.fillStyle = "#0e0c12"; g.fillRect(0, 0, lerret.width, lerret.height);
    const x0 = Math.floor(-ox) - 1, y0 = Math.floor(-oy) - 1;
    const naturFig = [];
    // Rada under skjermen er med, fordi høge figurar (tre, murar) står der og stikk opp i biletet.
    for (let y = Math.max(0, y0); y < Math.min(kart.h, y0 + VH + 5); y++) for (let x = Math.max(0, x0 - 1); x < Math.min(kart.w, x0 + VW + 3); x++) {
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
      // Kantar: gras over veg og sand, og høgt gras (villgras) over alt anna på bakken
      const kl = Pikslar.klasse(c);
      if (kl === "veg" || kl === "sand" || kl === "gras") {
        for (const [side, dx, dy] of KANTSIDER) {
          const n = kart.fliser[y + dy] && kart.fliser[y + dy][x + dx];
          if (n == null) continue;
          const nk = Pikslar.klasse(n);
          if (nk === "villgras") g.drawImage(Pikslar.kant("villgras", side, (x * 7 + y * 3) % 4), sx, sy);
          else if (nk === "gras" && kl !== "gras") g.drawImage(Pikslar.kant("gras", side, (x * 7 + y * 3) % 4), sx, sy);
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
    const figurar = kart.folk.filter(f => f.sprite).map(f => ({ y: f.fy, sp: f.sprite, x: f.fx, dir: f.dir, kjensle: f.kjensle,
      steg: f.flytt ? GANG[(f.steg % 2) * 2 + (f.u < 0.5 ? 0 : 1)] : 0 }));
    // Gangramma følgjer steget, ikkje klokka: to rammer per flis (steg, stå), annakvar fot.
    const steg = spelar.flytt ? GANG[(spelar.steg % 2) * 2 + (spelar.u < 0.5 ? 0 : 1)] : 0;
    // Følgjet går eit halvt steg forskyve, så dei to ikkje går i takt.
    const fv = spelar.u + 0.5, fsteg = fylgje && fylgje.regi ? (fylgje.flytt ? GANG[(fylgje.steg % 2) * 2 + (fylgje.u < 0.5 ? 0 : 1)] : 0)
      : spelar.flytt ? GANG[((spelar.steg + Math.floor(fv)) % 2) * 2 + (fv % 1 < 0.5 ? 0 : 1)] : 0;
    if (fylgje) figurar.push({ y: fylgje.fy, x: fylgje.fx, sp: fylgje.sprite, dir: fylgje.dir, steg: fsteg, kjensle: fylgje.kjensle });
    figurar.push({ y: spelar.fy, x: spelar.fx, sp: spelar.sprite, dir: spelar.dir, steg, kjensle: spelar.kjensle });
    for (const n of naturFig) figurar.push(n);
    // Hus blir sorterte saman med figurane etter den nedste flisraden sin.
    for (const b of kart.def.bygg || []) { const img = Pikslar.bygg(b.id); if (img) figurar.push({ y: b.over ? 999 : b.y + b.h - 1 + 0.01, by: b.y + b.h - 1, x: b.x, bygg: img, over: b.over, id: b.id }); }
    figurar.sort((a, b) => a.y - b.y);
    for (const f of figurar) {
      if (f.mur) { g.drawImage(f.mur, Math.round((f.x + ox) * S), Math.round((Math.floor(f.y) + oy) * S) - 6); continue; }
      if (f.natur) { g.drawImage(f.natur.img, Math.round((f.x + ox) * S) + f.natur.x, Math.round((Math.floor(f.y) + oy) * S) + f.natur.y); continue; }
      if (f.haug) { g.drawImage(f.haug, Math.round((f.x + ox) * S) - 1, Math.round((Math.floor(f.y) + 1 + oy) * S) - f.haug.height); continue; }
      if (f.over) { g.drawImage(f.bygg, Math.round((f.x + ox) * S) - 4, Math.round((f.by + 1 + oy) * S) - f.bygg.height); continue; }
      if (f.bygg) {
        // Slagskugge på bakken, mot høgre og ned (lyset kjem frå oppe til venstre): silhuetten
        // til huset forskoven, men berre nedst ved bakken, så høge ting (tårnet) ikkje kastar
        // ei stripe oppover i graset.
        const bx = Math.round((f.x + ox) * S) - 4, by = Math.round((f.y + 1 + oy) * S);
        g.save(); g.beginPath(); g.rect(bx, by - 22, f.bygg.width + 8, 26); g.clip();
        g.globalAlpha = 0.28; g.drawImage(skuggeAv(f.bygg), bx + 4, by - f.bygg.height + 3); g.restore();
        g.drawImage(f.bygg, bx, by - f.bygg.height);
        for (const r of Pikslar.ILD[f.id] || []) Pikslar.ild(g, bx + r.x, by - f.bygg.height + r.y, r.w, r.h, no, r.glo, Pikslar.ildMaske(f.bygg, r));
        if (dorAnim && f.by === dorAnim.ty) teiknDor(no, ox, oy);
        for (const [rx, ry] of Pikslar.ROYK[f.id] || []) Pikslar.royk(g, bx + rx, by - f.bygg.height + ry, no);
        continue; }
      const sx = Math.round((f.x + ox) * S), sy = Math.round((f.y + oy) * S);
      g.fillStyle = "rgba(10,5,20,.28)"; g.fillRect(sx + 3, sy + 10, 10, 3); g.fillRect(sx + 4, sy + 9, 8, 5);
      const bilde = f.kjensle && f.sp.kjensle && f.sp.kjensle[f.kjensle] ? f.sp.kjensle[f.kjensle] : f.sp.rammer[f.dir][f.steg];
      g.drawImage(bilde, sx, sy - FOT);
    }
    // Silhuett av spelaren (eller følgjet) bak eit hus, berre der huset har «silhuett: true» i kartet
    // (til spesielle høve, til dømes ein stad der ein må gå bak noko for å finne ein ting).
    for (const f of figurar) {
      if (!f.sp || (f.sp !== spelar.sprite && !(fylgje && f.sp === fylgje.sprite))) continue;
      const sx = Math.round((f.x + ox) * S), sy = Math.round((f.y + oy) * S) - FOT;
      const bak = (kart.def.bygg || []).some(b => {
        const img = Pikslar.bygg(b.id); if (!img || !b.silhuett || b.over || f.y >= b.y + b.h - 1) return false;
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
  // Portrettet til den som talar, med kjensla om det finst eit portrett for henne (PORTRETT_KJENSLER).
  function visPortrett(namn, kjensle) {
    const id = namn && (RPGData.PORTRETT || {})[namn];
    boks.classList.toggle("med-portrett", !!id);
    if (!id) return;
    const har = kjensle && ((RPGData.PORTRETT_KJENSLER || {})[id] || []).includes(kjensle);
    boksPortrett.src = `bilete/spel/portrett/${id}${har ? "-" + kjensle : ""}.png`;
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
  function tale(tekst, namn, kjensle) {
    return new Promise(res => {
      boks.hidden = false;
      boksNamn.textContent = namn || "";
      boksNamn.hidden = !namn;
      visPortrett(namn, kjensle);
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
    for (const a of regi) regiSteg(a, performance.now());
    oppdater(performance.now());
    teikn(performance.now());
  }
  requestAnimationFrame(loop);

  // Skalering med heile tal: kvar spelpiksel blir k × k skjermpikslar. Halve steg (2,5) gjorde
  // somme pikslar breiare enn andre. Vi reknar i skjermpikslar (devicePixelRatio), så det held
  // også med skalering i Windows (125 %, 150 %) og zoom i nettlesaren.
  function tilpass() {
    const rot = $("rpg-skjerm");
    const dpr = window.devicePixelRatio || 1;
    const b = rot.clientWidth * dpr, h = rot.clientHeight * dpr;
    const k = Math.max(1, Math.floor(Math.min(b / (VW * S), h / (VH * S))));
    lerret.style.width = `${VW * S * k / dpr}px`; lerret.style.height = `${VH * S * k / dpr}px`;
    // Portrettet (48 × 48): om lag 144 px (96 px på små skjermar), men med heil skala.
    const maal = matchMedia("(pointer: coarse), (max-width: 760px)").matches ? 96 : 144;
    const kp = Math.max(1, Math.round(maal * dpr / 48));
    boks.style.setProperty("--portrett", `${48 * kp / dpr}px`);
  }
  window.addEventListener("resize", tilpass);

  return {
    VW, VH, lerret, g, krokar, last, tale, val, fort, lytt, tilpass, fjernFolk, overgang, gjennomDor, tonUt, tonInn, scene,
    gaa, snu, inn, kamera, rist, kort, naerbilete, blink, aktor,
    pause(p) { pausa = p; if (p) halde.clear(); },
    get kart() { return kart; }, get spelar() { return spelar; },
    settSpelar(sprite) { spelar.sprite = sprite; },
    // Kjensle (glad, trist, sint, sjokk, tenkje, nikk, eller figuren sine eigne) for «spelar»,
    // «fylgje», namnet på ein person på kartet, eller «alle» (til å nullstille). null tek ho bort.
    // Ho varer til figuren går, eller til samtalen er slutt.
    kjensle(k, kven = "spelar") {
      k = k || null;
      if (kven === "alle") { spelar.kjensle = k; if (fylgje) fylgje.kjensle = k; if (kart) kart.folk.forEach(f => { f.kjensle = k; }); return; }
      if (kven === "spelar") { spelar.kjensle = k; return; }
      if (kven === "fylgje") { if (fylgje) fylgje.kjensle = k; return; }
      const f = kart && kart.folk.find(f => f.namn === kven);
      if (f) { f.kjensle = k; if (k) f.neste = performance.now() + 4000; }
    },
    settFylgje(sprite) { fylgje = sprite ? { sprite, x: spelar.x, y: spelar.y, fx: spelar.x, fy: spelar.y, dir: spelar.dir, flytt: null } : null; plasserFylgje(); },
    plasser,
    E,
  };
})();
