/* Feltmotoren i «Aasen: Språkvandringa»: kart sett ovanfrå, rørsle, dører, folk,
   kister, møte med fiendar, samtaleboksar og forteljarskjerm.

   Figurane er 16 × 24 pikslar og står med føtene nedst i ruta si. Tretoppar
   blir teikna etter figurane, så ein kan gå bak dei.

   Teikninga skjer på eit lerret på 320 × 192 pikslar (20 × 12 fliser), som
   blir skalert opp med heile tal utan utjamning. Samtalar, menyar og
   forteljing er HTML over lerretet, så teksten blir skarp.

   Motor.last(kartId, merke, retning)  lastar eit kart og set spelaren på merket
   Motor.krokar               { tilstand(), modus(), samtale(folk), kiste(k), lampe(),
                                dor(d), laast(tekst), inngang(i), kamp(lag), meny(),
                                opna(k), synleg(k) }
   Motor.tale(tekst, namn)    samtaleboks, gir eit løfte som blir oppfylt ved Z.
                              ⟪ord⟫ i teksten blir utheva.
   Motor.fort(linjer)         forteljing på svart skjerm
   Motor.scene(byt, ms)       rask toning til svart, byt() (til dømes Motor.last), og tilbake.
                              Standard mellom alle scener. Motor.tonUt() og tonInn() kvar for seg.
   Motor.pause(true|false)    stoppar rørsla (under samtalar, menyar og kamp)
   Regi i skripta scener (verkar også i pause, sjå js/rpg/README.md):
   Motor.gaa(kven, mal, fart), snu(kven, retning), inn(def), byt(kven, ny), kamera(til, ms),
   kort(stad, tid), naerbilete(src, tekst), blink(ms, rgb), rist(ms), tonUt(ms, farge),
   tone(lag, rgb, ms), spot(kven, r, ms) (lyset: sjå «Lys» under) */
window.Motor = (function () {
  "use strict";
  const S = Pikslar.S, VW = 20, VH = 12;
  const $ = id => document.getElementById(id);
  const E = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const lerret = $("rpg-lerret"), g = lerret.getContext("2d", { willReadFrequently: true });   // lyset les pikslane kvart bilete
  lerret.width = VW * S; lerret.height = VH * S;
  g.imageSmoothingEnabled = false;

  const DX = [0, 0, -1, 1], DY = [1, -1, 0, 0];
  let kart = null;            // { id, def, w, h, fliser, merke, folk, kister, dorer }

  // Setet (stol eller benk med oppføring i Pikslar.SETE) som dekkjer ruta (x, y), eller null.
  // Breidda til inventaret er (biletbreidd - 8) / 16 fliser, høgda er h i kartet.
  function seteVed(x, y) {
    if (!kart) return null;
    x = Math.round(x); y = Math.round(y);
    for (const b of kart.def.bygg || []) {
      const s = Pikslar.SETE && Pikslar.SETE[b.id]; if (!s) continue;
      const img = Pikslar.bygg(b.id), w = img ? Math.max(1, Math.round((img.width - 8) / 16)) : 1;
      if (x >= b.x && x < b.x + w && y >= b.y && y < b.y + b.h) return { b, s };
    }
    return null;
  }
  // Kor mykje lenger ned den som sit, blir teikna, etter retninga han ser (ned, opp, venstre,
  // høgre): framanfrå heng beina ned framfor setet, bakfrå sit han lenger inn mot ryggen.
  const SITJE_DY = [3, -1, 0, 0];
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
  // Lyttarane ligg i ein stabel: den øvste får tastane. Når ein blir sleppt, går han ut av
  // stabelen same kvar han ligg, så eit kort som går bort under eit val, ikkje tek valet med seg.
  const lyttarar = [];
  function lytt(l) {
    lyttarar.push(l); paaTrykk = l;
    return () => { const i = lyttarar.lastIndexOf(l); if (i >= 0) lyttarar.splice(i, 1); paaTrykk = lyttarar[lyttarar.length - 1] || null; };
  }

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
      // pose på personen i kartet (til dømes sitje ved bordet) er grunnposen, som han får att etter kvar hending.
      return Object.assign({}, f, { x, y, fx: x, fy: y, hx: x, hy: y, dir, grunndir: dir, steg: 0, flytt: null, grunnpose: f.pose || null,
        neste: performance.now() + 800 + Math.random() * 2500, sprite: spriteAv(f) });
    });
    kart = { id, def, w, h, fliser, merke, folk, kister: def.kister || [], dorer: (def.dorer || []).filter(d => d.til) };
    // Den som sit på ein stol utan retning i kartet, ser same vegen som stolen.
    for (const f of folk) if (f.grunnpose === "sitje" && f.retning == null) { const st = seteVed(f.x, f.y); if (st && st.s.retning != null) f.dir = f.grunndir = st.s.retning; }
    for (const a of regi) { a.regi.res(); a.regi = null; } regi.clear(); kam = null;      // nytt kart: regien byrjar på nytt
    nullstillLys();                                                  // toning og spotlight varer til neste kart
    const [sx, sy] = merke[merkeId] || merke["1"] || [1, 1];
    spelar.x = sx; spelar.y = sy; spelar.fx = sx; spelar.fy = sy; spelar.flytt = null;
    spelar.pose = null; if (fylgje) fylgje.pose = null;                 // på eit nytt kart står ein
    if (typeof dir === "string") dir = RETNINGSNAMN[dir];
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

  // Biletet til ein person: ein figur frå U, eller eit vesen (vesen: "blekklatten") som blir teikna
  // med fiendebiletet frå kampen, i full storleik.
  const spriteAv = f => f.usynleg ? null : f.vesen ? { vesen: Pikslar.fiende(f.vesen) } : Pikslar.figur(RPGData.U[f.u]);

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
  /* Rørsle i tikk som på SNES: 60 tikk i sekundet, og alle fartar er eit heilt tal tikk per
     flis (8 tikk = 2 pikslar per tikk, 16 tikk = 1 piksel per tikk). Då flyttar figurane og
     kameraet seg like mange pikslar i kvart bilete, og gangen blir jamn. Med ms og ein fart
     som ikkje går opp i bileta, flytta somme bilete seg éin piksel og andre ingen (hakk). */
  const TIKK = 1000 / 60;
  const tikk = ms => Math.round(ms / TIKK);
  // Ein fart i ms per flis blir runda til næraste av 4, 8, 16, 32 eller 64 tikk.
  const tikkFart = ms => [4, 8, 16, 32, 64].reduce((b, t) => Math.abs(Math.log(t * TIKK / ms)) < Math.abs(Math.log(b * TIKK / ms)) ? t : b) * TIKK;
  // Kor langt (0 til 1) eit steg som byrja t0 og varer fart ms, er kome no, i heile tikk.
  const stegDel = (no, t0, fart) => Math.min(1, Math.max(0, tikk(no) - tikk(t0)) / tikk(fart));   // same tikk-rutenett som kameraet
  const FART = 8 * TIKK;      // spelaren: 8 tikk per flis (133 ms, 2 pikslar per tikk)
  // Plasserer spelaren (og følgjet) der dei skal vere no i steget.
  function flytt(no) {
    const u = stegDel(no, spelar.flytt.t0, FART);
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
  const FOLK_FART = 16 * TIKK;  // folk: 16 tikk per flis (267 ms, 1 piksel per tikk)
  const naerDor = (x, y) => kart.dorer.some(d => Math.abs(d.ved[0] - x) + Math.abs(d.ved[1] - y) <= 1)
    || Object.entries(kart.merke).some(([m, [mx, my]]) => /[0-9]/.test(m) && mx === x && my === y);
  function folkKanGaa(f, x, y) {
    if (x < 0 || y < 0 || x >= kart.w || y >= kart.h) return false;
    const c = kart.fliser[y][x];
    if (Pikslar.FAST.has(c) || "DdE~Q".includes(c) || erVatn(x, y)) return false;
    if (Math.abs(x - f.hx) + Math.abs(y - f.hy) > (f.radius || 1)) return false;
    if (spelar.x === x && spelar.y === y) return false;
    if (spelar.flytt && Math.round(spelar.flytt.fx) === x && Math.round(spelar.flytt.fy) === y) return false;
    if (fylgje && ((fylgje.x === x && fylgje.y === y) || (fylgje.flytt && Math.round(fylgje.flytt.fx) === x && Math.round(fylgje.flytt.fy) === y))) return false;
    if (kart.folk.some(o => o !== f && ((o.x === x && o.y === y) || (o.flytt && o.flytt.fx === x && o.flytt.fy === y)))) return false;
    return !kisteVed(x, y) && !naerDor(x, y);
  }
  function oppdaterFolk(no) {
    for (const f of kart.folk) {
      if (!f.sprite || f.flis || f.regi) continue;
      if (f.flytt) {
        const u = stegDel(no, f.flytt.t0, FOLK_FART); f.u = u;
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
        f.flytt = { fx: f.x, fy: f.y, t0: no }; f.x = nx; f.y = ny; f.steg++; f.kjensle = null; f.pose = null;
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
    spelar.kjensle = null; if (fylgje) fylgje.kjensle = null;        // ei kjensle varer til ein går (posen òg)
    spelar.pose = null; if (fylgje) fylgje.pose = null;
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
     Alt her verkar også medan motoren er pausa (under samtalar og scener).
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
  /* Står ein annan figur på ruta, eller er han på veg inn på eller ut av henne? Spelaren og
     følgjet byter plass når spelaren går, så følgjet stengjer ikkje for spelaren. Med viker: true
     tel ikkje følgjet når ho står i ro, for ho går til sides for den som kjem (sjå regiSteg). */
  function opptatt(a, x, y, viker) {
    const her = o => o && o !== a && ((o.x === x && o.y === y) || (o.flytt && Math.round(o.flytt.fx) === x && Math.round(o.flytt.fy) === y));
    if (her(spelar)) return true;
    if (a !== spelar && her(fylgje) && !(viker && !fylgje.regi && !fylgje.flytt)) return true;
    return kart.folk.some(f => f.sprite && her(f));
  }
  // Kortaste veg frå figuren a til (tx, ty), utanom faste ting og andre figurar. Gir retningane.
  function vegTil(a, tx, ty) {
    const fri = (x, y) => {
      if (x === tx && y === ty) return true;
      if (x < 0 || y < 0 || x >= kart.w || y >= kart.h) return false;
      const c = kart.fliser[y][x];
      if (Pikslar.FAST.has(c) || "DdE".includes(c) || erVatn(x, y) || kisteVed(x, y)) return false;
      return !opptatt(a, x, y, true);
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
     ut: true tek figuren bort frå kartet når han er framme (inn ei dør, ut over kanten).
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
          // Den næraste ledige ruta inntil den andre (kortaste veg). Ikkje inn i ein vegg, og ikkje
          // inn på ruta til ein annan figur (Ivar, følgjet eller folk som står attmed).
          // Er følgjet på den einaste ledige ruta, går ein dit likevel (han flyttar seg ikkje).
          let best = null;
          const opptatt = (x, y, medFylgje) => (a !== spelar && spelar.x === x && spelar.y === y) || (medFylgje && fylgje && a !== fylgje && fylgje.x === x && fylgje.y === y)
            || kart.folk.some(f => f !== a && f.sprite && f.x === x && f.y === y);
          for (const medFylgje of [true, false]) {
            for (let d = 0; d < 4; d++) {
              const cx = snuMot.x + DX[d], cy = snuMot.y + DY[d], c = (kart.fliser[cy] || [])[cx];
              if (c == null || Pikslar.FAST.has(c) || "DdE".includes(c) || erVatn(cx, cy) || kisteVed(cx, cy) || opptatt(cx, cy, medFylgje)) continue;
              const v = vegTil(a, cx, cy);
              if (v && (!best || v.length < best.length)) best = v;
            }
            if (best) break;
          }
          sti = best || [];
        }
      } else if (maal) {
        if (typeof maal === "string") maal = kart.merke[maal];
        sti = (maal && vegTil(a, maal[0], maal[1])) || [];
        if (maal && !sti.length && (a.x !== maal[0] || a.y !== maal[1])) console.warn("Regi: fann ingen veg for", kven, maal);
      }
    }
    let mx = a.x, my = a.y;
    for (const d of sti) { mx += DX[d]; my += DY[d]; }
    return new Promise(res => {
      a.regi = { sti, maal: [mx, my], fart: fart ? tikkFart(fart) : FOLK_FART, res: () => {
        if (snuMot) a.dir = retningMot(a.x, a.y, snuMot.x, snuMot.y, a.dir);
        // Inn døra: borte frå kartet han gjekk på (eit nytt kart har ikkje figuren).
        if (mal.ut && kart && a !== spelar && a !== fylgje) kart.folk = kart.folk.filter(f => f !== a);
        res();
      } };
      if (a === spelar) spelar.flytt = null;
      if (sti.length) a.pose = null;                                    // ein pose varer til figuren går
      regi.add(a);
    });
  }
  function regiSteg(a, no) {
    const r = a.regi;
    let t0 = no;
    if (a.flytt) {
      const u = stegDel(no, a.flytt.t0, r.fart); a.u = u;
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
    // Står nokon i vegen, går figuren rundt (ny veg til målet), eller ventar litt. Han går aldri
    // inn på ruta til ein annan. Er det framleis stengt etter ei stund, stoppar han der han er.
    const nx = a.x + DX[r.sti[0]], ny = a.y + DY[r.sti[0]];
    if (opptatt(a, nx, ny)) {
      // Står følgjet i vegen, går ho eitt steg til sides (ikkje inn i stien til den som kjem).
      if (fylgje && a !== spelar && !fylgje.regi && !fylgje.flytt && fylgje.x === nx && fylgje.y === ny) {
        let px = a.x, py = a.y; const stien = new Set();
        for (const d of r.sti) { px += DX[d]; py += DY[d]; stien.add(px + "," + py); }
        const til = [0, 1, 2, 3].map(d => [d, nx + DX[d], ny + DY[d]]).find(([, x, y]) => !stien.has(x + "," + y) && !(x === a.x && y === a.y)
          && kanGaa(x, y) && !doraVed(x, y) && !opptatt(fylgje, x, y));
        if (til) { gaa("fylgje", { sti: [til[0]] }); return; }
      }
      if (!r.stengd) r.stengd = no;
      if (!r.leita || no - r.leita > 250) {
        r.leita = no;
        const v = vegTil(a, r.maal[0], r.maal[1]);
        if (v && v.length && !opptatt(a, a.x + DX[v[0]], a.y + DY[v[0]])) { r.sti = v; r.stengd = 0; }
      }
      if (r.stengd && no - r.stengd > 1500) { console.warn("Regi: vegen er stengd for", a.namn || "spelaren", r.maal); r.sti = []; }
      if (r.stengd) { a.dir = r.sti.length ? r.sti[0] : a.dir; return; }
    }
    r.stengd = 0;
    const d = r.sti.shift(), x0 = a.x, y0 = a.y;
    a.dir = d; a.flytt = { fx: x0, fy: y0, t0 }; a.x += DX[d]; a.y += DY[d]; a.steg = (a.steg || 0) + 1; a.u = 0; a.kjensle = null; a.pose = null;
    if (a === spelar && fylgje && !fylgje.regi) {
      fylgje.flytt = { fx: fylgje.x, fy: fylgje.y }; fylgje.dir = retningMot(fylgje.x, fylgje.y, x0, y0, fylgje.dir);
      fylgje.x = x0; fylgje.y = y0; r.drag = fylgje; fylgje.pose = null;
    }
  }
  function snu(kven, retning) {
    const a = aktor(kven); if (!a) return;
    const m = typeof retning === "string" && !(retning in RETNINGSNAMN) ? aktor(retning) : null;
    a.dir = m ? retningMot(a.x, a.y, m.x, m.y, a.dir) : typeof retning === "string" ? RETNINGSNAMN[retning] : retning;
    a.kjensle = null;                                                // kjensla vender mot oss: ho går bort når figuren snur seg
    if (a.grunndir != null) { a.grunndir = a.dir; a.neste = performance.now() + 3000; }
  }
  // Set ein ny person inn på kartet: { namn, u, rute: [x, y] eller merke, retning, atferd, tale }.
  function inn(def) {
    if (!kart) return;
    const [x, y] = typeof def.rute === "string" ? kart.merke[def.rute] : def.rute;
    const dir = typeof def.retning === "string" ? RETNINGSNAMN[def.retning] : def.retning || 0;
    kart.folk.push(Object.assign({ atferd: "stille" }, def, { x, y, fx: x, fy: y, hx: x, hy: y, dir, grunndir: dir, steg: 0, flytt: null,
      neste: performance.now() + 2000, sprite: spriteAv(def) }));
  }
  // Byter namn eller utsjånad på ein person: { namn, u } eller { vesen } (vetten som får namnet
  // sitt att, kvinna ved setra som er huldra, blekklatten som renn saman til ein dråpe).
  function byt(kven, ny) {
    const a = aktor(kven); if (!a || a === spelar || a === fylgje) return;
    if (ny.namn) a.namn = ny.namn;
    if (ny.u || ny.vesen) { a.u = ny.u || a.u; a.vesen = ny.vesen; a.sprite = spriteAv(a); }
  }

  /* Kamera: til ei rute [x, y], til ein figur (som det så følgjer), eller null (tilbake til
     spelaren). Kameraet glir dit på ms millisekund. */
  let kam = null, sentrum = { x: 0, y: 0 };
  /* Kameraet fylgjer etter med fast fart i heile pikslar per tikk, som i FF6, og ikkje med ei
     mjuk glidning: med glidning mot noko som går, flytta biletet seg ujamt. Farten blir rekna
     slik at kameraet er framme på ms (minst 1 piksel per tikk). Går målet, flyttar kameraet seg
     med målet i tillegg, så det fangar det og så går i takt. kam.px er øvre venstre hjørne i pikslar. */
  const kameraMaal = m => ({                                           // øvre venstre hjørne for eit sentrum, innanfor kartet
    x: kart.w < VW ? 0 : Math.round(Math.max(0, Math.min(kart.w - VW, m.x - (VW - 1) / 2)) * S),
    y: kart.h < VH ? 0 : Math.round(Math.max(0, Math.min(kart.h - VH, m.y - (VH - 1) / 2)) * S),
  });
  function kamera(til, ms = 900) {
    const a = typeof til === "string" ? aktor(til) : null;
    const mal = til == null ? () => ({ x: spelar.fx, y: spelar.fy }) : a ? () => ({ x: a.fx, y: a.fy }) : () => ({ x: til[0], y: til[1] });
    const px = kameraMaal(sentrum), m = kameraMaal(mal()), n = Math.max(1, tikk(ms));
    kam = { px, mal, sistMaal: m, tikk: tikk(performance.now()), tilbake: til == null,
      fart: { x: Math.max(1, Math.ceil(Math.abs(m.x - px.x) / n)), y: Math.max(1, Math.ceil(Math.abs(m.y - px.y) / n)) } };
    return vent(ms);
  }
  function kameraSentrum(no) {
    if (!kam) return { x: spelar.fx, y: spelar.fy };
    const t = tikk(no), n = t - kam.tikk;
    if (n > 0) {
      kam.tikk = t;
      const m = kameraMaal(kam.mal());
      for (const k of ["x", "y"]) {
        kam.px[k] += m[k] - kam.sistMaal[k];                           // med målet når det går
        const att = m[k] - kam.px[k];
        kam.px[k] += Math.sign(att) * Math.min(Math.abs(att), kam.fart[k] * n);
      }
      kam.sistMaal = m;
      if (kam.tilbake && kam.px.x === m.x && kam.px.y === m.y) { kam = null; return { x: spelar.fx, y: spelar.fy }; }
    }
    return { x: kam.px.x / S + (VW - 1) / 2, y: kam.px.y / S + (VH - 1) / 2 };
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
  const erVatnTeikn = c => c === "~";
  function erVatn(x, y) {
    const r = kart.fliser[y]; if (!r) return false;
    const c = r[x];
    if (c === "~") return true;
    if (c !== "#") return false;
    const kantrute = x === 0 || y === 0 || x === kart.w - 1 || y === kart.h - 1;
    if (!kantrute) return false;
    if ((kart.fliser[y - 1] || [])[x] === "Q") return true;           // under enden av ei brygge
    return [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [1, -1], [-1, 1], [1, 1]].some(([dx, dy]) => (kart.fliser[y + dy] || [])[x + dx] === "~");
  }
  /* Vassfeltet til Pikslar.vatn: kva som er land (brua «Q» er vatn under), om vatnet er ein bekk
     med straum (kart.def.vatn.bekk) og kvar det er stryk (kart.def.vatn.stryk, «x,y»). */
  function vassfelt() {
    if (kart.vassfelt) return kart.vassfelt;
    const v = kart.def.vatn || {};
    kart.vassfelt = {
      id: kart.id, w: kart.w, h: kart.h, golv: kart.def.golv, bekk: !!v.bekk, stryk: new Set(v.stryk || []),
      land: (x, y) => { const c = kart.fliser[y][x]; return c === "Q" || erVatn(x, y) ? null : c; },
      // Mjuk bakke: vatnet kan runde av hjørna. Ikkje ved brua, så vegen møter brua med heile hjørne.
      mjuk: (x, y) => !!Pikslar.klasse(kart.fliser[y][x]) && !KANTSIDER.some(([, dx, dy]) => (kart.fliser[y + dy] || [])[x + dx] === "Q"),
    };
    return kart.vassfelt;
  }

  /* Stifeltet til Pikslar.sti: kva slag bakke kvar flis er (veg, gras, villgras, eller null for
     anna), og kva som held stien på plass (dører, murar, gjerde, bruer, hus, vatn). */
  function stifelt() {
    if (kart.stifelt) return kart.stifelt;
    const slag = (x, y) => {
      const r = kart.fliser[y]; if (!r || r[x] == null || erVatn(x, y)) return null;
      const kl = Pikslar.klasse(r[x]);
      return kl === "veg" || kl === "gras" || kl === "villgras" ? kl : null;
    };
    kart.stifelt = {
      id: kart.id, w: kart.w, h: kart.h, golv: kart.def.golv, slag,
      fast: (x, y) => { const r = kart.fliser[y]; if (!r || r[x] == null) return true; return slag(x, y) == null || "j|x".includes(r[x]); },
    };
    return kart.stifelt;
  }

  /* ---------- Lys: fargerekning som på Super Nintendo ----------
     Final Fantasy VI har lyset mest teikna inn i pikslane. Resten gjer maskinvara: fargerekning
     (color math) som legg til, trekkjer frå eller tek snittet av ein fast farge, med klemming
     per kanal, og 15-bit fargar (5 bit per kanal). Her blir det gjort etter at kartet er teikna:
     éin getImageData, ei rekning per piksel med oppslagstabellar (Uint32Array), éin putImageData.
     Bakgrunnen og figurane har kvar sine innstillingar (som $51 og $53 i FF6), så ei maske held
     styr på figurpikslane (folk og vesen) i same teikneorden: hus, tre og møblar som står framfor
     ein figur, viskar ut maska der dei dekkjer.
     Innstillingane står i RPGData.STEMNINGAR (kart.def.stemning). Lyskjeldene får handteikna,
     hardkanta glødformer i tre nivå (lysNiva, bileta i bilete/spel/lys/) som flimrar i same takt
     som elden, og fargane i gløden går på rundgang (palettanimasjon).
     Ingen mjuke gradientar: ein fargeovergang nedover skjermen (hdma) går i trinn på 8 rader. */
  const LW = VW * S, LH = VH * S;
  const lysNiva = new Uint8Array(LW * LH);         // 0 grunn, 1 til 3 glød, 4 skyskugge
  const figLerret = document.createElement("canvas"); figLerret.width = LW; figLerret.height = LH;
  const fg = figLerret.getContext("2d", { willReadFrequently: true });
  let figMaske = false;                            // er maska i bruk i dette biletet
  const figBoks = [0, 0, 0, 0];                    // rektangelet rundt figurane (berre det blir lese)
  function nyMaske() {
    fg.globalCompositeOperation = "source-over"; fg.clearRect(0, 0, LW, LH);
    figBoks[0] = LW; figBoks[1] = LH; figBoks[2] = figBoks[3] = 0;
  }
  // Figurmaska: teikn (figur) eller visk ut (noko som dekkjer) i same rekkjefølgje som på lerretet.
  function maske(img, x, y, dekkjer) {
    if (!figMaske) return;
    if (!dekkjer) {
      figBoks[0] = Math.max(0, Math.min(figBoks[0], x)); figBoks[1] = Math.max(0, Math.min(figBoks[1], y));
      figBoks[2] = Math.min(LW, Math.max(figBoks[2], x + img.width)); figBoks[3] = Math.min(LH, Math.max(figBoks[3], y + img.height));
    } else if (x >= figBoks[2] || y >= figBoks[3] || x + img.width <= figBoks[0] || y + img.height <= figBoks[1]) return;
    fg.globalCompositeOperation = dekkjer ? "destination-out" : "source-over";
    fg.drawImage(img, x, y);
  }
  // Scenestega: toning av bakgrunn og figurar ($50, $51, $53), blink ($55) og spotlight ($63).
  const effekt = { tone: { bak: null, fig: null }, blink: null, spot: null };
  const null3 = [0, 0, 0];
  function framdrift(e, no) { return Math.max(0, Math.min(1, (no - e.t0) / e.ms)); }
  // Toninga no: heile steg (1/31 av ein kanal) frå fra til til, kumulativt som $50.
  function toneNo(e, no) {
    if (!e) return null3;
    const u = framdrift(e, no);
    return e.fra.map((v, i) => Math.round(v + (e.til[i] - v) * u));
  }
  // Ein oppslagstabell (3 × 256) for ein operasjon: 8 bit inn, 5 bit rekning, 8 bit ut.
  const lutar = new Map();
  function lut(p, snitt, lys) {
    const k = p.join(",") + "|" + (snitt ? snitt.join(",") : "") + "|" + lys;
    let t = lutar.get(k);
    if (t) return t;
    if (lutar.size > 600) lutar.clear();
    t = new Uint8Array(768);
    for (let ch = 0; ch < 3; ch++) for (let v = 0; v < 256; v++) {
      let c = (v >> 3) + p[ch];
      c = c < 0 ? 0 : c > 31 ? 31 : c;
      if (snitt) c = (c + snitt[ch]) >> 1;
      c = (c * lys / 15) | 0;
      t[ch * 256 + v] = (c << 3) | (c >> 2);
    }
    lutar.set(k, t);
    return t;
  }
  // Fargen frå hdma-stoppa for rada y, rekna for midten av kvart band på 8 rader og runda.
  function hdma(stopp, y) {
    if (!stopp) return null3;
    const yc = (y & ~7) + 4;
    let a = stopp[0], b = stopp[stopp.length - 1];
    for (let i = 0; i < stopp.length - 1; i++) if (yc >= stopp[i][0] && yc <= stopp[i + 1][0]) { a = stopp[i]; b = stopp[i + 1]; break; }
    const u = b[0] === a[0] ? 0 : Math.max(0, Math.min(1, (yc - a[0]) / (b[0] - a[0])));
    return a[1].map((v, i) => Math.round(v + (b[1][i] - v) * u));
  }
  const sum3 = (...v) => [v.reduce((s, x) => s + x[0], 0), v.reduce((s, x) => s + x[1], 0), v.reduce((s, x) => s + x[2], 0)];
  /* Glødformer: handteikna bilete (bilete/spel/lys/<namn>.png, laga med tools/pikselkunst/glod.py).
     Raudkanalen fortel trinnet (om lag 96, 176 og 248 for nivå 1, 2 og 3), og den magenta pikselen
     i første ramma er ankeret. Kvar ramme blir gjord om éin gong til strekar (rad, x frå, x til,
     nivå) relativt til ankeret, så stemplinga hoppar over det tomme rundt forma. */
  const glodformer = new Map();
  function glodform(namn) {
    let f = glodformer.get(namn);
    if (f) return f;
    const k = (RPGData.LYSKJELDER || {})[namn], img = k && Pikslar.hent(`bilete/spel/lys/${namn}.png`);
    if (!img || !Pikslar.klar(img)) return null;                     // ikkje lasta enno: prøv att neste bilete
    const w = img.naturalWidth, h = img.naturalHeight, rw = Math.floor(w / k.rammer);
    const c = document.createElement("canvas"); c.width = w; c.height = h;
    const cg = c.getContext("2d", { willReadFrequently: true }); cg.drawImage(img, 0, 0);
    const d = cg.getImageData(0, 0, w, h).data;
    const niva = (x, y) => { const i = (y * w + x) * 4; return d[i + 3] < 128 ? 0 : Math.min(3, Math.max(1, ((d[i] + 42) / 85) | 0)); };
    let ax = 0, ay = 0;
    for (let y = 0; y < h; y++) for (let x = 0; x < rw; x++) { const i = (y * w + x) * 4; if (d[i] > 240 && d[i + 1] < 16 && d[i + 2] > 240 && d[i + 3] > 128) { ax = x; ay = y; } }
    const rammer = [];
    for (let r = 0; r < k.rammer; r++) {
      const runs = [];
      for (let y = 0; y < h; y++) for (let x = 0; x < rw;) {
        const v = niva(r * rw + x, y);
        let e = x + 1;
        while (e < rw && niva(r * rw + e, y) === v) e++;
        if (v) runs.push(y - ay, x - ax, e - ax, v);
        x = e;
      }
      rammer.push({ runs: Int16Array.from(runs) });
    }
    f = { rammer, rekkje: k.rekkje || [0] }; glodformer.set(namn, f);
    return f;
  }
  // Ramma no for ei glødform. fase skil kjeldene frå kvarandre, så dei ikkje flimrar i takt.
  function glodRamme(f, no, fase) {
    const r = f.rekkje[(Math.floor(no / 150) + fase) % f.rekkje.length];
    return f.rammer[r] || f.rammer[0];
  }
  // Stemplar ei form inn i lysnivåa. fast: alle pikslane i forma får dette nivået (skyskugge),
  // men berre der det ikkje lyser frå før. Elles vinn det høgaste nivået, og lys vinn over skugge.
  function stemple(form, cx, cy, fast) {
    cx = Math.round(cx); cy = Math.round(cy);
    const r = form.runs;
    for (let j = 0; j < r.length; j += 4) {
      const y = cy + r[j]; if (y < 0 || y >= LH) continue;
      const v = fast != null ? fast : r[j + 3], x0 = Math.max(0, cx + r[j + 1]), x1 = Math.min(LW, cx + r[j + 2]);
      for (let i = y * LW + x0, slutt = y * LW + x1; i < slutt; i++) {
        const n = lysNiva[i];
        if (fast != null ? n === 0 : n === 4 || v > n) lysNiva[i] = v;
      }
    }
  }
  // Lysstrålar frå eit vindauge: eit parallellogram skrått ned mot høgre (eitt steg per to rader),
  // i trinn: kjerne og kant, sterkast øvst, med ein dithera kant.
  function straale(sx, sy) {
    for (let dy = 0; dy < 104; dy++) {
      const y = sy + dy; if (y < 0 || y >= LH) continue;
      const xl = sx + (dy >> 1), sterk = dy < 36 ? 3 : dy < 70 ? 2 : 1;
      for (let dx = -1; dx < 11; dx++) {
        const x = xl + dx; if (x < 0 || x >= LW) continue;
        let lv = dx >= 2 && dx < 8 ? sterk : sterk - 1;
        if (dx < 0 || dx >= 10) lv = (x + y) & 1 ? 0 : Math.max(0, sterk - 1);
        const i = y * LW + x;
        if (lv > lysNiva[i]) lysNiva[i] = lv;
      }
    }
  }
  // Lyskjeldene på kartet: [x, y, type, fase], x og y i skjermpikslar (typane står i RPGData.LYSKJELDER).
  function lyskjelder(ox, oy) {
    const ut = [];
    for (const b of kart.def.bygg || []) {
      const type = b.id === "inne-grue" ? "grue" : b.id === "inne-kakkelomn" ? "kakkelomn" : b.id === "inne-lysekrone" ? "krone" : null;
      const img = type && Pikslar.bygg(b.id); if (!img) continue;
      const bx = Math.round((b.x + ox) * S) - 4, by = Math.round((b.y + b.h + oy) * S) - img.height;
      const r = (Pikslar.ILD[b.id] || [])[0];                         // elden i grua og omnen: ankeret er nedst midt i elden
      ut.push(r ? [bx + r.x + (r.w >> 1), by + r.y + r.h, type, b.x * 3 + b.y] : [bx + (img.width >> 1), by + (img.height >> 1), type, b.x * 3 + b.y]);
    }
    const ute = kart.def.golv === "." || kart.def.golv === ",";
    for (let y = 0; y < kart.h; y++) for (let x = 0; x < kart.w; x++) {
      const c = kart.fliser[y][x], fase = x * 3 + y * 5;
      if (c === "f") ut.push([(x + ox) * S + 8, (y + oy) * S + 14, "peis", fase]);
      else if (c === "L") ut.push([(x + ox) * S + 8, (y + oy) * S + (ute ? 4 : 3), ute ? "lykt" : "lys", fase]);
      else if (c === "T") ut.push([(x + ox) * S + 8, (y + oy) * S + 4, "lykt", fase]);
    }
    return ut;
  }
  const BAKGRUNN = 0xff120c0e;                    // #0e0c12, fargen utanfor kartet (teikn())
  // Tida lyset brukte i siste bilete (for testane): alt, og berre lesinga av lerretet. Lesinga
  // tvingar nettlesaren til å teikne ferdig biletet, så ho inneheld òg teikninga av kartet.
  let lysMs = 0, lesMs = 0;
  function lys(no, ox, oy) {
    const t0 = performance.now();
    const st = (RPGData.STEMNINGAR || {})[kart.def.stemning] || {};
    const tb = toneNo(effekt.tone.bak, no), tf = toneNo(effekt.tone.fig, no);
    let bl = null3;
    if (effekt.blink) {
      const u = framdrift(effekt.blink, no);
      if (u >= 1) effekt.blink = null;
      else { const tr = Math.ceil((1 - u) * 8) / 8; bl = effekt.blink.farge.map(v => Math.round(v * tr)); }   // åtte steg ned
    }
    const sp = spotNo(no, ox, oy);
    if (!kart.def.stemning && !effekt.tone.bak && !effekt.tone.fig && !effekt.blink && !sp) return;
    // Lysnivå: skyskuggar, så glød og strålar.
    lysNiva.fill(0);
    const sky = st.skyer && glodform("sky");
    if (sky) {
      const kw = kart.w * S + 240, kh = kart.h * S + 120;
      for (let i = 0; i < st.skyer; i++) {
        const cx = Math.round(((no * 0.008 + i * 311) % kw) - 120 + ox * S), cy = Math.round(((i * 97 + no * 0.003) % kh) - 60 + oy * S);
        stemple(sky.rammer[0], cx, cy, 4);
      }
    }
    if (st.glod) {
      if (st.kjelder) for (const [x, y, type, fase] of lyskjelder(ox, oy)) { const f = glodform(type); if (f) stemple(glodRamme(f, no, fase), x, y); }
      const iv = st.ivar && glodform("ivar");
      if (iv) stemple(glodRamme(iv, no, 0), (spelar.fx + ox) * S + 8, (spelar.fy + oy) * S + 2);
      if (st.straalar) for (let y = 0; y < kart.h; y++) for (let x = 0; x < kart.w; x++) if (kart.fliser[y][x] === "u") straale(Math.round((x + ox) * S) + 4, Math.round((y + oy) * S) + 11);
    }
    // Operasjonane for kvart nivå (0 grunn, 1 til 3 glød, 4 skugge), for bakgrunn og figurar.
    const syk = st.syklus ? Math.floor(no / 150) : 0;
    const opNiva = (l, n) => n === 4 ? (st.skugge || {})[l] || st[l] || {} : n > 0 && st.glod ? st.glod[l][n - 1] : st[l] || {};
    const lag = (l, n, y, tone) => {
      const op = opNiva(l, n);
      const sy = n > 0 && n < 4 && st.syklus ? st.syklus[(syk + n) % st.syklus.length] : null3;
      const h = l === "bak" && (n === 0 || n === 4) ? hdma(st.hdma, y) : null3;
      return lut(sum3(op.p || null3, h, sy, tone, bl), op.snitt, op.lys == null ? 15 : op.lys);
    };
    // Figurmaska: berre rektangelet rundt figurane blir lese.
    const [fx0, fy0, fx1, fy1] = figBoks, fw = fx1 - fx0;
    const fm = figMaske && fw > 0 && fy1 > fy0 ? fg.getImageData(fx0, fy0, fw, fy1 - fy0).data : null;
    const tl = performance.now();
    const bilde = g.getImageData(0, 0, LW, LH), px = new Uint32Array(bilde.data.buffer);
    lesMs = performance.now() - tl;
    const sa = Math.round((st.sepia || 0) * 256), sb = 256 - sa;
    const lb = [], lf = [];
    for (let y = 0; y < LH; y++) {
      if ((y & 7) === 0) for (let n = 0; n < 5; n++) { lb[n] = lag("bak", n, y, tb); lf[n] = fm ? lag("fig", n, y, tf) : lb[n]; }
      const mrad = fm !== null && y >= fy0 && y < fy1 ? (y - fy0) * fw - fx0 : null;   // maskeindeks for x i rada
      // Spotlight: utanfor sirkelen er det svart, i eit band på tre pikslar rundt kanten annakvar piksel.
      let ia = 0, ib = LW, ua = 0, ub = LW;
      if (sp) {
        const dy = y - sp.y, inn = sp.r * sp.r - dy * dy, ut_ = (sp.r + 3) * (sp.r + 3) - dy * dy;
        const hi = inn >= 0 ? Math.floor(Math.sqrt(inn)) : -1, ho = ut_ >= 0 ? Math.floor(Math.sqrt(ut_)) : -1;
        ia = sp.x - hi; ib = sp.x + hi + 1; ua = sp.x - ho; ub = sp.x + ho + 1;
        if (hi < 0) ia = ib = 0;
        if (ho < 0) ua = ub = 0;
      }
      const rad = y * LW;
      for (let x = 0; x < LW; x++) {
        const i = rad + x;
        if (sp && (x < ia || x >= ib) && (x < ua || x >= ub || ((x + y) & 1))) { px[i] = 0xff000000; continue; }
        const c = px[i];
        if (c === BAKGRUNN) continue;                // utanfor kartet: ingen fargerekning (som backdrop på SNES)
        let r = c & 255, gg = (c >> 8) & 255, b = (c >> 16) & 255;
        if (sa) {                                   // falma mot brunt: lysverdien i ein varm tone
          const l = (r * 77 + gg * 150 + b * 29) >> 8;
          r = (r * sb + Math.min(255, l * 1.08 + 10) * sa) >> 8; gg = (gg * sb + l * 0.94 * sa) >> 8; b = (b * sb + l * 0.74 * sa) >> 8;
        }
        const t = mrad !== null && x >= fx0 && x < fx1 && fm[(mrad + x) * 4 + 3] > 127 ? lf[lysNiva[i]] : lb[lysNiva[i]];
        px[i] = 0xff000000 | t[r] | (t[256 + gg] << 8) | (t[512 + b] << 16);
      }
    }
    g.putImageData(bilde, 0, 0);
    lysMs = performance.now() - t0;
  }
  // Spotlighten no: midten i skjermpikslar og radien (glir mot målet i heile pikslar).
  function spotNo(no, ox, oy) {
    const s = effekt.spot;
    if (!s) return null;
    const u = framdrift(s, no), r = Math.round(s.fra + (s.til - s.fra) * u);
    if (u >= 1 && s.slutt) { effekt.spot = null; return null; }
    let x, y;
    if (Array.isArray(s.kven)) { x = (s.kven[0] + ox) * S + 8; y = (s.kven[1] + oy) * S + 2; }
    else { const a = aktor(s.kven); if (!a) return null; x = (a.fx + ox) * S + 8; y = (a.fy + oy) * S + 2; }
    return { x: Math.round(x), y: Math.round(y), r };
  }
  /* Scenesteg for lyset. Alle gir eit løfte som blir oppfylt når toninga er ferdig.
     tone(lag, rgb, ms): bakgrunnen («bakgrunn»), figurane («figurar») eller begge («alle») blir
       gradvis tona mot ein fast farge [r, g, b] (-31..31 per kanal, lagt til eller trekt frå),
       i heile steg, som $50, $51 og $53 i FF6. rgb null tonar attende. Varer til neste kart.
     blinkFarge(rgb, ms): eit blink i ein farge som går ned i åtte steg ($55).
     spot(kven, r, ms): ein skarp lyssirkel rundt nokon (eller ei rute [x, y]) med radius r i
       pikslar, svart utanfor og eit dithera band i kanten ($63). kven null: sirkelen veks ut og
       blir borte. */
  function tone(lagNamn, rgb, ms = 1000) {
    const no = performance.now(), til = rgb || null3;
    for (const l of lagNamn === "alle" ? ["bak", "fig"] : [lagNamn === "figurar" ? "fig" : "bak"]) {
      effekt.tone[l] = { fra: toneNo(effekt.tone[l], no), til: til.slice(), t0: no, ms: Math.max(1, ms) };
    }
    return vent(ms);
  }
  function blinkFarge(rgb, ms = 300) { effekt.blink = { farge: rgb || [31, 31, 31], t0: performance.now(), ms }; return vent(ms); }
  function spot(kven, r = 40, ms = 800) {
    const no = performance.now(), gml = effekt.spot;
    const fraR = gml ? Math.round(gml.fra + (gml.til - gml.fra) * framdrift(gml, no)) : LW;
    if (kven == null) { if (gml) effekt.spot = Object.assign({}, gml, { fra: fraR, til: LW, t0: no, ms: Math.max(1, ms), slutt: true }); return vent(ms); }
    effekt.spot = { kven, fra: fraR, til: r, t0: no, ms: Math.max(1, ms) };
    return vent(ms);
  }
  function nullstillLys() { effekt.tone.bak = effekt.tone.fig = null; effekt.blink = null; effekt.spot = null; }

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
    // I 16 trinn, som lysstyrka på Super Nintendo (INIDISP), ikkje mjuk opasitet.
    svartEl.style.transition = `opacity ${ms}ms steps(16, end)`;
    svartEl.style.opacity = String(til);
    return vent(ms + 20);
  }
  const tonUt = (ms, farge) => toning(1, ms, farge), tonInn = ms => toning(0, ms);
  // Kort blink (ein ring som brest, eit lyn): kvitt, eller i fargen rgb ([r, g, b], 0..31), som $55.
  function blink(ms = 260, rgb) { return blinkFarge(rgb, ms); }
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
  // ms: kor lenge kvar toning varer (standard rask, lengre inn i ein draum eller eit minne).
  async function scene(byt, ms) {
    const var_ = byter; byter = true; halde.clear();
    await tonUt(ms); await byt(); await vent(40); await tonInn(ms);
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
    // Kameraet står alltid på heile pikslar (som på SNES). Med brøkdelar blir fliser og figurar
    // runda kvar for seg, og figurane ristar éin piksel mot bakken når kameraet glir.
    const kx = Math.round(Math.max(0, Math.min(kart.w - VW, sm.x - (VW - 1) / 2)) * S) / S;
    const ky = Math.round(Math.max(0, Math.min(kart.h - VH, sm.y - (VH - 1) / 2)) * S) / S;
    sentrum = { x: kx + (VW - 1) / 2, y: ky + (VH - 1) / 2 };       // der kameraet faktisk står (til neste kamerarørsle)
    const ox = kart.w < VW ? (VW - kart.w) / 2 : -kx, oy = kart.h < VH ? (VH - kart.h) / 2 : -ky;
    g.fillStyle = "#0e0c12"; g.fillRect(0, 0, lerret.width, lerret.height);
    // Figurmaska til lyset (sjå lys()): berre når kartet har ei stemning eller ei toning av figurane.
    figMaske = !!((RPGData.STEMNINGAR || {})[kart.def.stemning] || effekt.tone.fig || effekt.tone.bak);
    if (figMaske) nyMaske();
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
        // Vatn med fritt teikna strandkant og skrent (sjå Pikslar.vatn). Landet i flisa er
        // gjennomsiktig, så bakken frå naboflisa blir teikna under først.
        let maske = 0;
        for (const [bit, dx, dy] of NABOBIT) {
          const n = kart.fliser[y + dy] && kart.fliser[y + dy][x + dx];
          if (n != null && !erVatn(x + dx, y + dy) && n !== "Q") maske |= bit;
        }
        // Bakken under strandkanten: den første naboen som er bakke (gras, sand, veg), elles golvet.
        if (maske) {
          let under = kart.def.golv;
          for (const [, dx, dy] of KANTSIDER) {
            const n = kart.fliser[y + dy] && kart.fliser[y + dy][x + dx];
            if (n && Pikslar.klasse(n) && Pikslar.klasse(n) !== "vatn") { under = n; break; }
          }
          if (under !== "~") g.drawImage(Pikslar.flis(under, no, x, y, kart.def.golv), sx, sy);
        }
        g.drawImage(Pikslar.vatn(no, vassfelt(), x, y), sx, sy);
      } else if (Pikslar.klasse(c) === "veg") {
        // Sti (sjå Pikslar.sti): graset under (høgt gras om naboane mest er villgras), og stien
        // som eit lag over med fri kant.
        let vill = 0, lag = 0;
        for (const [, dx, dy] of NABOBIT) { const k = Pikslar.klasse((kart.fliser[y + dy] || [])[x + dx]); if (k === "villgras") vill++; else if (k === "gras") lag++; }
        g.drawImage(Pikslar.flis(vill > lag ? "," : ".", no, x, y, kart.def.golv), sx, sy);
        const sl = Pikslar.sti(stifelt(), x, y);
        if (sl) g.drawImage(sl, sx, sy);
      } else {
        g.drawImage(Pikslar.flis(fk, no, x, y, kart.def.golv), sx, sy);
        // Grasflis ved ein sti: stien kan flytte seg inn på graset, og frynsa ligg her.
        const sk = Pikslar.klasse(c);
        if ((sk === "gras" || sk === "villgras") && NABOBIT.some(([, dx, dy]) => Pikslar.klasse((kart.fliser[y + dy] || [])[x + dx]) === "veg")) {
          const sl = Pikslar.sti(stifelt(), x, y);
          if (sl) g.drawImage(sl, sx, sy);
        }
      }
      // Steingard: muren er ein figur som blir sortert etter djupn
      if (c === "j") {
        const nb = (dx, dy) => (kart.fliser[y + dy] && kart.fliser[y + dy][x + dx]) === "j";
        const maske = (nb(0, -1) ? 1 : 0) | (nb(1, 0) ? 2 : 0) | (nb(0, 1) ? 4 : 0) | (nb(-1, 0) ? 8 : 0);
        naturFig.push({ y: y + 0.003, x, mur: Pikslar.steingard((x * 3 + y) % 3, maske) });
      }
      // Kantar: gras over sand, og høgt gras (villgras) over gras og sand. Stiane har kanten sin i
      // Pikslar.sti, med soner og frynse som i The Minish Cap.
      const kl = Pikslar.klasse(c);
      if (kl === "sand" || kl === "gras") {
        for (const [side, dx, dy] of KANTSIDER) {
          const n = kart.fliser[y + dy] && kart.fliser[y + dy][x + dx];
          if (n == null) continue;
          const nk = Pikslar.klasse(n);
          if (nk === "villgras") g.drawImage(Pikslar.kant("villgras", side, (x * 7 + y * 3) % 4), sx, sy);
          else if (nk === "gras" && kl !== "gras") g.drawImage(Pikslar.kant("gras", side, (x * 7 + y * 3) % 4), sx, sy);
        }
        // Endane på sandstriper: runda med gras, så dei ser naturlege ut og ikkje teikna med linjal.
        // Ved sjøen kan det eine nabohjørnet vere vatn (enden på ei sandstripe).
        if (kl === "sand") {
          const nb = (dx, dy) => (kart.fliser[y + dy] || [])[x + dx];
          const grasaktig = n => n != null && (Pikslar.klasse(n) === "gras" || Pikslar.klasse(n) === "villgras");
          const same = n => n != null && Pikslar.klasse(n) === kl;
          const open = n => grasaktig(n) || (kl === "sand" && n != null && erVatnTeikn(n));
          [[0, -1, -1], [1, 1, -1], [2, 1, 1], [3, -1, 1]].forEach(([hj, dx, dy]) => {
            const sida = nb(dx, 0), opp = nb(0, dy), skra = nb(dx, dy), v = (x * 5 + y * 3 + hj) % 4;
            if (open(sida) && open(opp) && (grasaktig(sida) || grasaktig(opp)))
              g.drawImage(Pikslar.stiHjorne(grasaktig(opp) ? opp : sida, hj, true, v, kart.def.golv), sx, sy);
            else if (same(sida) && same(opp) && grasaktig(skra)) g.drawImage(Pikslar.stiHjorne(skra, hj, false, v, kart.def.golv), sx, sy);
          });
        }
      }
      // Landflis ved vatnet: vatnet rundar av spissen på ytre hjørne (sjå Pikslar.vatn).
      if (!erVatn(x, y) && vassfelt().mjuk(x, y) && NABOBIT.some(([, dx, dy]) => kart.fliser[y + dy] && kart.fliser[y + dy][x + dx] != null && erVatn(x + dx, y + dy))) {
        const vb = Pikslar.vatn(no, vassfelt(), x, y);
        if (vb) g.drawImage(vb, sx, sy);
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
    const figurar = kart.folk.filter(f => f.sprite).map(f => ({ y: f.fy, sp: f.sprite, x: f.fx, dir: f.dir, kjensle: f.kjensle, pose: f.pose,
      steg: f.flytt ? GANG[(f.steg % 2) * 2 + (f.u < 0.5 ? 0 : 1)] : 0 }));
    // Gangramma følgjer steget, ikkje klokka: to rammer per flis (steg, stå), annakvar fot.
    const steg = spelar.flytt ? GANG[(spelar.steg % 2) * 2 + (spelar.u < 0.5 ? 0 : 1)] : 0;
    // Følgjet går eit halvt steg forskyve, så dei to ikkje går i takt.
    const fv = spelar.u + 0.5, fsteg = fylgje && fylgje.regi ? (fylgje.flytt ? GANG[(fylgje.steg % 2) * 2 + (fylgje.u < 0.5 ? 0 : 1)] : 0)
      : spelar.flytt ? GANG[((spelar.steg + Math.floor(fv)) % 2) * 2 + (fv % 1 < 0.5 ? 0 : 1)] : 0;
    if (fylgje) figurar.push({ y: fylgje.fy, x: fylgje.fx, sp: fylgje.sprite, dir: fylgje.dir, steg: fsteg, kjensle: fylgje.kjensle, pose: fylgje.pose });
    figurar.push({ y: spelar.fy, x: spelar.fx, sp: spelar.sprite, dir: spelar.dir, steg, kjensle: spelar.kjensle, pose: spelar.pose });
    // Den som sit på ein stol eller benk (Pikslar.SETE), sit på setet: sjå sete i løkka under.
    for (const f of figurar) if (f.pose === "sitje" && f.y === Math.round(f.y) && f.x === Math.round(f.x)) f.sete = seteVed(f.x, f.y);
    for (const n of naturFig) figurar.push(n);
    // Hus blir sorterte saman med figurane etter den nedste flisraden sin.
    // Eit sete med ryggen mot kameraet (fram) kjem etter den som sit på det.
    for (const b of kart.def.bygg || []) { const img = Pikslar.bygg(b.id), fram = Pikslar.SETE && Pikslar.SETE[b.id] && Pikslar.SETE[b.id].fram;
      if (img) figurar.push({ y: b.over ? 999 : b.y + b.h - 1 + (fram ? 0.03 : 0.01), by: b.y + b.h - 1, x: b.x, bygg: img, over: b.over, id: b.id }); }
    // Den som sit eller ligg, blir teikna over inventaret på same rad (benken, senga). Den som sit
    // på eit sete, blir sortert etter den nedste rada til setet (ein ståande benk er fleire fliser).
    const djupn = f => (f.sete ? f.sete.b.y + f.sete.b.h - 1 : f.y) + (f.pose && f.pose !== "knele" && f.pose !== "peike" ? 0.02 : 0);
    figurar.sort((a, b) => djupn(a) - djupn(b));
    for (const f of figurar) {
      if (f.mur) { const mx = Math.round((f.x + ox) * S), my = Math.round((Math.floor(f.y) + oy) * S) - 6; g.drawImage(f.mur, mx, my); maske(f.mur, mx, my, true); continue; }
      if (f.natur) { const nx = Math.round((f.x + ox) * S) + f.natur.x, ny = Math.round((Math.floor(f.y) + oy) * S) + f.natur.y; g.drawImage(f.natur.img, nx, ny); maske(f.natur.img, nx, ny, true); continue; }
      if (f.haug) { const hx = Math.round((f.x + ox) * S) - 1, hy = Math.round((Math.floor(f.y) + 1 + oy) * S) - f.haug.height; g.drawImage(f.haug, hx, hy); maske(f.haug, hx, hy, true); continue; }
      if (f.over) { const ux = Math.round((f.x + ox) * S) - 4, uy = Math.round((f.by + 1 + oy) * S) - f.bygg.height; g.drawImage(f.bygg, ux, uy); maske(f.bygg, ux, uy, true); continue; }
      if (f.bygg) {
        // Slagskugge på bakken, mot høgre og ned (lyset kjem frå oppe til venstre): silhuetten
        // til huset forskoven, men berre nedst ved bakken, så høge ting (tårnet) ikkje kastar
        // ei stripe oppover i graset.
        const bx = Math.round((f.x + ox) * S) - 4, by = Math.round((f.y + 1 + oy) * S);
        g.save(); g.beginPath(); g.rect(bx, by - 22, f.bygg.width + 8, 26); g.clip();
        g.globalAlpha = 0.28; g.drawImage(skuggeAv(f.bygg), bx + 4, by - f.bygg.height + 3); g.restore();
        g.drawImage(f.bygg, bx, by - f.bygg.height); maske(f.bygg, bx, by - f.bygg.height, true);
        for (const r of Pikslar.ILD[f.id] || []) Pikslar.ild(g, bx + r.x, by - f.bygg.height + r.y, r.w, r.h, no, r.glo, Pikslar.ildMaske(f.bygg, r));
        if (dorAnim && f.by === dorAnim.ty) teiknDor(no, ox, oy);
        for (const [rx, ry] of Pikslar.ROYK[f.id] || []) Pikslar.royk(g, bx + rx, by - f.bygg.height + ry, no);
        continue; }
      // Den som sit på eit sete, blir lyft opp på det (hogd), og setet har sin eigen skugge.
      const sx = Math.round((f.x + ox) * S), sy = Math.round((f.y + oy) * S) + (f.sete ? SITJE_DY[f.dir] - f.sete.s.hogd : 0);
      // Eit vesen står midt på flisa med botnen på bakken, og gyng litt opp og ned.
      if (f.sp.vesen) {
        const c = f.sp.vesen, gy = Math.round((Math.sin(no / 420) + 1) * 0.8);
        g.fillStyle = "rgba(10,5,20,.32)"; g.beginPath(); g.ellipse(sx + 8, sy + 13, Math.max(6, c.width * 0.42), 3 + c.width / 40, 0, 0, Math.PI * 2); g.fill();
        g.drawImage(c, sx + 8 - Math.round(c.width / 2), sy + 15 - c.height - gy); maske(c, sx + 8 - Math.round(c.width / 2), sy + 15 - c.height - gy);
        continue;
      }
      // Ein pose (knele, sitje, peike) går framfor kjensla. Liggje og sove er ramma for slått ut (24 x 16).
      const pose = f.pose && f.sp.pose && f.sp.pose[f.pose];
      if (pose && !Array.isArray(pose)) {
        g.fillStyle = "rgba(10,5,20,.28)"; g.fillRect(sx - 2, sy + 10, 20, 3); g.fillRect(sx, sy + 9, 16, 5);
        g.drawImage(pose, sx - 4, sy - FOT + 8); maske(pose, sx - 4, sy - FOT + 8);
        if (f.pose === "sove") teiknZz(g, sx + 14, sy - FOT + 4, no);
        continue;
      }
      if (!f.sete) { g.fillStyle = "rgba(10,5,20,.28)"; g.fillRect(sx + 3, sy + 10, 10, 3); g.fillRect(sx + 4, sy + 9, 8, 5); }
      const bilde = pose ? pose[f.dir] : f.kjensle && f.sp.kjensle && f.sp.kjensle[f.kjensle] ? f.sp.kjensle[f.kjensle] : f.sp.rammer[f.dir][f.steg];
      g.drawImage(bilde, sx, sy - FOT); maske(bilde, sx, sy - FOT);
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
    lys(no, ox, oy);
  }

  // Den som søv: to små z som stig opp og blir borte, om att og om att (kvit med mørkt omriss).
  const ZZ = ["####", "..#.", ".#..", "####"];
  function teiknZz(g, x, y, no) {
    for (let i = 0; i < 2; i++) {
      const t = ((no / 1600) + i * 0.5) % 1, zx = Math.round(x + i * 4 + t * 3), zy = Math.round(y - t * 9);
      g.globalAlpha = Math.min(1, (1 - t) * 2.5);
      g.fillStyle = "#180f18";
      ZZ.forEach((r, ry) => [...r].forEach((c, rx) => { if (c === "#") g.fillRect(zx + rx - 1, zy + ry - 1, 3, 3); }));
      g.fillStyle = "#f4f0e8";
      ZZ.forEach((r, ry) => [...r].forEach((c, rx) => { if (c === "#") g.fillRect(zx + rx, zy + ry, 1, 1); }));
    }
    g.globalAlpha = 1;
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
      const lengd = [...tekst.replace(/[⟪⟫]/g, "")].length;
      let i = 0, ferdig = false, skriv = null;
      const vis = () => {
        boks.hidden = false;
        boksNamn.textContent = namn || "";
        boksNamn.hidden = !namn;
        visPortrett(namn, kjensle);
        boksTekst.innerHTML = taleHtml(tekst, ferdig ? Infinity : i);
        boks.classList.toggle("klar", ferdig);
        boks.onclick = () => paaTrykk && paaTrykk.a && paaTrykk.a();
      };
      vis();
      skriv = setInterval(() => {
        i += 2;
        boksTekst.innerHTML = taleHtml(tekst, i);
        if (i >= lengd) { clearInterval(skriv); ferdig = true; boks.classList.add("klar"); }
      }, 16);
      const slutt = () => { clearInterval(skriv); slepp(); boks.hidden = true; res(); };
      const slepp = lytt({
        a: () => {
          if (!ferdig) { clearInterval(skriv); boksTekst.innerHTML = taleHtml(tekst, Infinity); ferdig = true; boks.classList.add("klar"); return; }
          slutt();
        },
      });
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
    gaa, snu, inn, byt, kamera, rist, kort, naerbilete, blink, tone, spot, aktor, vent,
    get lysMs() { return lysMs; }, get lysLesMs() { return lesMs; },  // tida lyset brukte i siste bilete
    get lysEffekt() { return effekt; },                               // toning, blink og spotlight (for testane)
    // Kameraet står ved noko anna enn spelaren (ei scene let det stå).
    get kameraBorte() { return !!kam && !kam.tilbake; },
    get kameraSentrum() { return { x: sentrum.x, y: sentrum.y }; },   // der kameraet står (for testane)
    get svart() { return +svartEl.style.opacity > 0; },
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
    // Pose (knele, sitje, peike, liggje, sove) for «spelar», «fylgje», namnet eller merket til ein
    // person på kartet, eller «alle» (til å nullstille). null tek han bort. Han varer til figuren går.
    pose(p, kven = "spelar") {
      p = p || null;
      if (kven === "alle") {
        spelar.pose = p; if (fylgje) fylgje.pose = p;
        if (kart) kart.folk.forEach(f => {
          const ny = p || f.grunnpose || null;
          if (f.pose !== ny) f.neste = performance.now() + 2000;
          f.pose = ny;
        });
        return;
      }
      const a = aktor(kven);
      if (!a) return;
      a.pose = p;
      if (p === "sitje") { const st = seteVed(a.x, a.y); if (st && st.s.retning != null) a.dir = st.s.retning; }   // set seg rett på stolen
      if (p && a.hx !== undefined) a.neste = performance.now() + 1e9;     // folk står i ro så lenge posen varer
      else if (a.hx !== undefined) a.neste = performance.now() + 2000;
    },
    // ved: ein person på kartet som blir følgjet (huldra som slår seg i lag med Ivar). Følgjet står
    // då der personen stod, og ser same vegen.
    settFylgje(sprite, ved) {
      fylgje = sprite ? { sprite, x: spelar.x, y: spelar.y, fx: spelar.x, fy: spelar.y, dir: spelar.dir, flytt: null } : null;
      plasserFylgje();
      if (fylgje && ved) Object.assign(fylgje, { x: ved.x, y: ved.y, fx: ved.x, fy: ved.y, dir: ved.dir, spor: [] });
    },
    plasser,
    E,
  };
})();
