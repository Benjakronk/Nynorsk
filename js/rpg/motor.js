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
                                opna(k), synleg(k), undersok(naturting) }
   Motor.tale(tekst, namn)    samtaleboks, gir eit løfte som blir oppfylt ved Z.
                              ⟪ord⟫ blir utheva, ⟨…⟩ er norrønt og ⟦…⟧ runer.
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
  const S = Pikslar.S, VW = 20, VH = 12, LW = VW * S, LH = VH * S;
  const $ = id => document.getElementById(id);
  const E = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const lerret = $("rpg-lerret"), g = lerret.getContext("2d", { willReadFrequently: true });   // lyset les pikslane kvart bilete
  lerret.width = VW * S; lerret.height = VH * S;
  g.imageSmoothingEnabled = false;

  const DX = [0, 0, -1, 1], DY = [1, -1, 0, 0];
  let kart = null;            // { id, def, w, h, fliser, merke, folk, kister, dorer }

  // Setet (stol eller benk med oppføring i Pikslar.SETE) som dekkjer ruta (x, y), eller null.
  // Breidda til inventaret er (biletbreidd - 8) / 16 fliser, høgda er h i kartet.
  const byggBreidd = b => { const img = Pikslar.bygg(b.id); return img ? Math.max(1, Math.round((img.width - 8) / 16)) : 1; };
  const dekkjer = (b, x, y) => x >= b.x && x < b.x + byggBreidd(b) && y >= b.y && y < b.y + b.h;
  function seteVed(x, y) {
    if (!kart) return null;
    x = Math.round(x); y = Math.round(y);
    for (const b of kart.def.bygg || []) {
      const s = Pikslar.SETE && Pikslar.SETE[b.id]; if (!s) continue;
      if (dekkjer(b, x, y)) return { b, s };
    }
    // Ein naturting med sete (stokken ved bålet): { ved, bilete, sete: { hogd, retning } }.
    const n = (kart.def.naturting || []).find(n => n.sete && n.ved[0] === x && n.ved[1] === y);
    return n ? { b: { x, y, h: 1, naturting: n }, s: n.sete } : null;
  }
  // Senga (Pikslar.SENG: sengebenken) som dekkjer ruta (x, y), eller null.
  function sengVed(x, y) {
    if (!kart || !Pikslar.SENG) return null;
    x = Math.round(x); y = Math.round(y);
    for (const b of kart.def.bygg || []) { const s = Pikslar.SENG[b.id]; if (s && dekkjer(b, x, y)) return { b, s }; }
    return null;
  }
  /* Sitjeplassar og senger (runde 87 og 88). Modellen:
     - Spelaren kan gå inn på ei rute som eit sete eller ei seng dekkjer. Ikkje der nokon sit (folk,
       følgjet) og ikkje over ryggen: eit sete med retning kan ein ikkje gå inn i bakfrå.
     - På setet sit han alltid i retninga til setet (seteRetning), aldri i retninga til siste tasten.
     - Langs ein benk glir han sitjande til neste sete (flytt.glid), teikna med sitjeposen og
       setehøgda heile vegen, og retninga står.
     - Ein tast dit han ikkje kan gå (bakover over ryggen, inn i bordet, mot ein som sit) gjer ingenting:
       han snur seg ikkje, han blir sitjande.
     - Han reiser seg når han går ut: framover (motsett av ryggen), eller ut til sida frå enden av ein benk.
     - I senga ligg han under dyna; ein tast ut av senga, og han står opp.
     Folk og følgjet går aldri inn på sete eller senger (dei er faste for alle andre). */
  const MOTSETT = [1, 0, 3, 2];
  const ledig = (x, y) => !folkVed(x, y) && !kisteVed(x, y) && !(fylgje && fylgje.x === x && fylgje.y === y);
  function kanSitjeInn(x, y, dir) {
    if (x < 0 || y < 0 || x >= kart.w || y >= kart.h) return false;
    const st = seteVed(x, y);
    if (!st || !ledig(x, y)) return false;
    return st.s.retning == null || st.s.rygg === false || dir !== st.s.retning;   // ikkje inn bakfrå (rygg: false, stokken, har ingen rygg)
  }
  const kanLeggjeSeg = (x, y) => x >= 0 && y >= 0 && x < kart.w && y < kart.h && !!sengVed(x, y) && ledig(x, y);
  // Kan spelaren gå ut av setet han sit på, i retninga dir (ikkje over ryggen)?
  function kanReiseSeg(dir) {
    const her = seteVed(spelar.x, spelar.y);
    return !her || her.s.retning == null || her.s.rygg === false || dir !== MOTSETT[her.s.retning];
  }
  /* Retninga den som sit på setet st (på ruta x, y) ser. Eit sete med retning: den. Ein benk utan
     rygg: på tvers av benken (opp eller ned for ein liggjande, til sidene for ein ståande), mot eit
     møbel som står inntil (bordet, orgelet), bort frå veggen, og elles dit han kom frå (inn er
     retninga han gjekk inn med). */
  function seteRetning(st, x, y, inn) {
    if (st.s.retning != null) return st.s.retning;
    const ligg = byggBreidd(st.b) >= st.b.h, kand = ligg ? [0, 1] : [3, 2];
    const poeng = d => {
      const nx = x + DX[d], ny = y + DY[d], c = (kart.fliser[ny] || [])[nx];
      let p = 0;
      if ((kart.def.bygg || []).some(b => b !== st.b && !b.flat && !(Pikslar.SETE || {})[b.id] && dekkjer(b, nx, ny))) p += 2;
      else if (c == null || (Pikslar.FAST.has(c) && !seteVed(nx, ny))) p -= 2;
      if (inn != null && d === MOTSETT[inn]) p += 1;
      return p;
    };
    return kand.reduce((a, d) => poeng(d) > poeng(a) ? d : a);
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
  const trykt = {};           // når kvar retning sist vart trykt ned (for å snu seg på flisa)
  const trykk = d => { if (!halde.has(d)) trykt[d] = performance.now(); halde.add(d); };
  const RETNING = { ArrowDown: 0, s: 0, S: 0, ArrowUp: 1, w: 1, W: 1, ArrowLeft: 2, a: 2, A: 2, ArrowRight: 3, d: 3, D: 3 };
  let paaTrykk = null;        // éin lyttar for Z/Enter/mellomrom (samtale, meny, kamp)
  document.addEventListener("keydown", e => {
    if (e.target.closest && e.target.closest("input, textarea")) return;
    if (e.key in RETNING) { trykk(RETNING[e.key]); if (!pausa || paaTrykk) e.preventDefault(); if (paaTrykk && paaTrykk.retning) paaTrykk.retning(RETNING[e.key]); }
    else if (["z", "Z", "Enter", " "].includes(e.key)) { e.preventDefault(); springTast = true; if (e.repeat) return; trykkA(); }
    else if (["x", "X", "Escape", "Backspace"].includes(e.key)) { if (e.repeat) return; trykkB(e); }
  });
  document.addEventListener("keyup", e => {
    if (e.key in RETNING) halde.delete(RETNING[e.key]);
    if (["z", "Z", "Enter", " "].includes(e.key)) springTast = false;
  });
  window.addEventListener("blur", () => { halde.clear(); springTast = false; });
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
      if (v === "a") { springTast = true; trykkA(); } else if (v === "b") trykkB();
      else { trykk(+v); if (paaTrykk && paaTrykk.retning) paaTrykk.retning(+v); }
    };
    const opp = () => { if (v === "a") springTast = false; else if (v !== "b") halde.delete(+v); };
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
      if ([[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => "=/".includes((fliser[y + dy] || [])[x + dx] || "x"))) fliser[y][x] = "=";
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
    nedPx = 0; oppPx = 0;                                            // utsikta byrjar der kameraet står
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
  // med fiendebiletet frå kampen, i full storleik. Eit vesen med gangark (kartrotta) får gangrammer.
  // opp: innstillingar for vesenet (stille: ikkje gyng, skugge: false utan skugge på golvet; sjå PNG i pikslar.js).
  const spriteAv = f => f.usynleg ? null : f.vesen ? { vesen: Pikslar.fiende(f.vesen), gang: Pikslar.vesenGang(f.vesen), opp: Pikslar.vesenOpp(f.vesen) } : Pikslar.figur(RPGData.U[f.u]);

  /* Set følgjet (huldra) ned attmed spelaren: éi flis bak han (motsett av der han ser), eller
     til sida om det ikkje går (til dømes når døra er bak han), elles på same flis. */
  function plasserFylgje() {
    if (!fylgje || !kart) return;
    // Går følgjet etter med regi (fylgjeEtter), er den gamle stien ugyldig no: stopp han.
    if (fylgje.regi) { const r = fylgje.regi; regi.delete(fylgje); fylgje.regi = null; r.res(); }
    const bak = [1, 0, 3, 2][spelar.dir], sider = spelar.dir < 2 ? [2, 3] : [0, 1];
    let [fx, fy] = [spelar.x, spelar.y];
    let funne = false;
    for (const d of [bak, ...sider, spelar.dir]) {
      const x = spelar.x + DX[d], y = spelar.y + DY[d];
      if (kanGaa(x, y) && !doraVed(x, y)) { fx = x; fy = y; funne = true; break; }
    }
    // Sit spelaren på eit sete eller ligg i senga utan ledig rute attmed: næraste ledige rute litt unna
    // (følgjet står aldri på eit sete).
    if (!funne && (seteVed(spelar.x, spelar.y) || sengVed(spelar.x, spelar.y)))
      for (let r = 2; r <= 4 && !funne; r++) for (let dy = -r; dy <= r && !funne; dy++) for (const dx of [r - Math.abs(dy), Math.abs(dy) - r]) {
        const x = spelar.x + dx, y = spelar.y + dy;
        if (kanGaa(x, y) && !doraVed(x, y)) { fx = x; fy = y; funne = true; break; }
      }
    Object.assign(fylgje, { x: fx, y: fy, fx, fy, dir: spelar.dir, flytt: null, spor: [] });
  }
  // Set spelaren på ein stad (til dømes frå lagring) og følgjet attmed.
  function plasser(x, y, dir) {
    Object.assign(spelar, { x, y, fx: x, fy: y, flytt: null });
    if (dir != null) spelar.dir = dir;
    setSeg();                                                        // på eit sete (frå lagring): han sit
    plasserFylgje();
  }

  const doraVed = (x, y) => kart.dorer.find(d => d.ved[0] === x && d.ved[1] === y);
  // Ei gøymd kiste syner når ho er avdekt; ei kiste med vis berre når vilkåret held (til dømes etter eit flagg).
  const kisteSynleg = k => (!k.gøymd || (krokar.synleg && krokar.synleg(k))) && (!k.vis || !!k.vis(krokar.tilstand()));
  const kisteVed = (x, y) => kart.kister.find(k => k.ved[0] === x && k.ved[1] === y && kisteSynleg(k));
  // Naturting sett ut med vilje (kart.naturting: { ved, bilete, manus }), til dømes ein bauta på ei «o»-rute.
  const naturtingVed = (x, y) => (kart.def.naturting || []).find(n => n.ved[0] === x && n.ved[1] === y);
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
  /* Spelaren går 12 tikk per flis (200 ms, 1, 1 og 2 pikslar per tikk på rundgang), og spring
     8 tikk per flis (133 ms, 2 pikslar per tikk) så lenge Z, Enter, mellomrom eller A er halden
     nede. Farten blir vald når eit steg byrjar, så skiftet mellom gange og sprang er reint. */
  const GA_FART = 12 * TIKK, SPRING_FART = 8 * TIKK;
  let springTast = false;
  // Plasserer spelaren (og følgjet) der dei skal vere no i steget.
  function flytt(no) {
    const u = stegDel(no, spelar.flytt.t0, spelar.flytt.fart);
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
      t0 = Math.max(spelar.flytt.t0 + spelar.flytt.fart, no - spelar.flytt.fart / 2);
      const glid = spelar.flytt.glid, inn = spelar.flytt.dir;
      spelar.flytt = null; if (fylgje) fylgje.flytt = null;
      const k0 = kart;
      komFram(glid, inn);
      if (pausa || kart !== k0 || (krokar.modus && krokar.modus() !== "felt")) return;
    }
    if (!taSteg(t0, t0 !== no)) return;
    spelar.kjensle = null; if (fylgje) fylgje.kjensle = null;        // ei kjensle varer til ein går (posen òg)
    if (!spelar.flytt.glid) spelar.pose = null;                      // langs benken blir han sitjande
    if (fylgje) fylgje.pose = null;
    flytt(no);
  }
  /* Byrjar eit nytt steg i retninga som blir halden nede. Gir true om figuren flyttar seg.
     Står spelaren i ro og ein trykkjer kort på ei anna retning enn den han ser, snur han seg
     berre på flisa. Held ein tasten lenger enn SNU_TID, går han. Midt i gangen (vidare) snur
     og går han med ein gong. */
  const SNU_TID = 6 * TIKK;
  function taSteg(no, vidare) {
    const dir = [...halde].pop();
    if (dir == null) { spelar.snudd = false; return false; }
    // På eit sete eller i senga: glid langs benken, gå ut (reis seg), eller ingenting (ikkje snu).
    const sete = seteVed(spelar.x, spelar.y), seng = sengVed(spelar.x, spelar.y);
    if ((sete && spelar.pose === "sitje") || (seng && (spelar.pose === "sove" || spelar.pose === "liggje"))) {
      spelar.snudd = false;
      const nx = spelar.x + DX[dir], ny = spelar.y + DY[dir];
      const same = (sete && (seteVed(nx, ny) || {}).b === sete.b) || (seng && (sengVed(nx, ny) || {}).b === seng.b);
      if (same) {
        if (!ledig(nx, ny)) return false;
        fylgjeEtter(nx, ny);
        spelar.flytt = { fx: spelar.x, fy: spelar.y, t0: no, fart: GA_FART, glid: true, dir: spelar.dir };
        spelar.x = nx; spelar.y = ny;
        return true;
      }
      if (!kanReiseSeg(dir) || (!kanGaa(nx, ny) && !kanSitjeInn(nx, ny, dir))) return false;
      const sitDir = spelar.dir;
      spelar.reisLyft = figurVis(spelar).lyft; spelar.reisT = performance.now();   // høgda glir ned att (figurVis)
      spelar.dir = dir; fylgjeEtter(nx, ny);
      spelar.flytt = { fx: spelar.x, fy: spelar.y, t0: no, fart: GA_FART, reis: seng ? "seng" : "sete", sitDir, dir };
      spelar.x = nx; spelar.y = ny; spelar.steg++;
      return true;
    }
    if (!vidare && dir !== spelar.dir) { spelar.dir = dir; spelar.snudd = true; return false; }
    if (!vidare && spelar.snudd && performance.now() - (trykt[dir] || 0) < SNU_TID) return false;
    spelar.snudd = false;
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
    if (!kanGaa(nx, ny) && !kanSitjeInn(nx, ny, dir) && !kanLeggjeSeg(nx, ny)) return false;
    fylgjeEtter(nx, ny);
    // Inn på eit sete: retninga han skal sitje i, er kjend alt no.
    const inn = seteVed(nx, ny);
    spelar.flytt = { fx: spelar.x, fy: spelar.y, t0: no, fart: springTast ? SPRING_FART : GA_FART, dir,
      sitDir: inn ? seteRetning(inn, nx, ny, dir) : null };
    spelar.x = nx; spelar.y = ny;
    spelar.steg++;
    return true;
  }
  const retningMot = (x0, y0, x1, y1, d) => x1 > x0 ? 3 : x1 < x0 ? 2 : y1 > y0 ? 0 : y1 < y0 ? 1 : d;
  /* Følgjet (runde 92): når spelaren går frå (spelar.x, spelar.y) til (tx, ty), tek følgjet ruta han gjekk
     frå om ho står inntil ho (vanleg følgje). Gjekk han frå eit sete eller ei seng (langs benken, ut av
     benken), går ho aldri dit: står ho alt inntil målet hans, blir ho ståande, elles tek ho eitt steg på
     kortaste vegen mot den næraste ledige ruta inntil målet. Ho flyttar seg aldri meir enn éi rute per
     steg, og aldri inn på eit sete eller i ei seng. */
  function fylgjeEtter(tx, ty) {
    if (!fylgje || fylgje.regi) return;
    const fx = spelar.x, fy = spelar.y, avst = (x, y) => Math.abs(fylgje.x - x) + Math.abs(fylgje.y - y);
    const steg = (x, y) => { fylgje.flytt = { fx: fylgje.x, fy: fylgje.y }; fylgje.dir = retningMot(fylgje.x, fylgje.y, x, y, fylgje.dir); fylgje.x = x; fylgje.y = y; };
    if (kanGaa(fx, fy) && !doraVed(fx, fy) && avst(fx, fy) === 1) { steg(fx, fy); return; }
    if (fylgje.x === fx && fylgje.y === fy) { if (kanGaa(fx, fy)) return; }   // står på ruta hans (ved start): blir der
    if (avst(tx, ty) === 1 && kanGaa(fylgje.x, fylgje.y)) return;
    let best = null;
    for (let d = 0; d < 4; d++) {
      const x = tx + DX[d], y = ty + DY[d];
      if ((x === fylgje.x && y === fylgje.y) || !kanGaa(x, y) || doraVed(x, y) || (x === fx && y === fy)) continue;
      const v = vegTil(fylgje, x, y);
      if (v && v.length && (!best || v.length < best.length)) best = v;
    }
    if (best) steg(fylgje.x + DX[best[0]], fylgje.y + DY[best[0]]);
  }

  function gaaGjennom(dor) {
    if (dor.krev && !krokar.tilstand().flagg[dor.krev]) { if (krokar.laast) krokar.laast(dor.laast || "Døra er stengd."); return; }
    if (krokar.dor) krokar.dor(dor);
  }
  /* Spelaren set seg når han står på eit sete, i retninga til setet (seteRetning; inn er retninga han
     gjekk inn med). Utan inn (glid langs benken, etter ei hending, frå lagringa) held han retninga si
     om ho passar setet. I senga legg han seg under dyna og søv. */
  /* Ein figur (spelaren, følgjet, folk) set seg på setet eller legg seg i senga han står på. Same
     mekanisme for spelaren som går inn på eit sete, for scenesteg (sitje, liggje) og for pose: "sitje"
     i kartet og i manus. Retninga kjem frå setet; i senga ligg ein med andletet opp (retning 0).
     ligg: posen i senga ("sove" eller "liggje"). */
  function setjeSeg(a, inn, ligg = "sove") {
    if (sengVed(a.x, a.y)) { a.pose = ligg; a.dir = 0; return "seng"; }
    const st = seteVed(a.x, a.y);
    if (!st) return false;
    if (a.pose !== "sitje") a.sitT = performance.now();               // høgda glir opp på setet (figurVis)
    a.pose = "sitje";
    const liggjande = byggBreidd(st.b) >= st.b.h, passar = st.s.retning != null ? a.dir === st.s.retning : (liggjande ? a.dir < 2 : a.dir >= 2);
    if (inn != null || !passar) a.dir = seteRetning(st, a.x, a.y, inn);
    return "sete";
  }
  const setSeg = inn => setjeSeg(spelar, inn);
  /* Scenesteg: figuren kven set seg på setet eller legg seg i senga på ruta [x, y] (pose «sitje»,
     «sove» eller «liggje»). Med gaaDit går han dit først: til ei ledig rute attmed (ikkje bak ryggen),
     og så inn som spelaren gjer; elles står han der med ein gong. Han går heilt inn og set seg i éi
     ramme, og høgda glir opp på setet (figurVis). */
  async function brukMoebel(kven, rute, gaaDit, pose) {
    const a = aktor(kven); if (!a || !kart) return;
    const [x, y] = typeof rute === "string" ? kart.merke[rute] || [] : rute || [];
    const st = seteVed(x, y), sg = sengVed(x, y), b = (st || sg || {}).b;
    if (!b) { console.warn("Regi: ingen sete eller seng på", rute); return; }
    const del = (sx, sy) => ((seteVed(sx, sy) || sengVed(sx, sy) || {}).b === b);
    let inn = null;
    if (gaaDit && !(a.x === x && a.y === y)) {
      let best = null;
      for (let d = 0; d < 4; d++) {
        const ex = x - DX[d], ey = y - DY[d];                          // står på (ex, ey) og går inn i retning d
        if (st && st.s.retning != null && st.s.rygg !== false && d === st.s.retning) continue;
        if (del(ex, ey)) continue;
        const her = ex === a.x && ey === a.y;
        if (!her && (!kanGaa(ex, ey) || opptatt(a, ex, ey))) continue;
        const v = her ? [] : vegTil(a, ex, ey);
        if (v && (!best || v.length < best.length)) best = [...v, d];
      }
      if (best) {
        if (best.length > 1) await gaa(kven, { sti: best.slice(0, -1) });
        inn = best[best.length - 1];
        await gaa(kven, { sti: [inn] });
      }
    }
    if (a.x !== x || a.y !== y) Object.assign(a, { x, y, fx: x, fy: y, flytt: null });
    setjeSeg(a, inn, st ? "sitje" : pose);
    if (a.hx !== undefined) { a.hx = x; a.hy = y; a.neste = performance.now() + 1e9; }   // folk blir sitjande eller liggjande
    if (a === spelar && fylgje && fylgje.x === x && fylgje.y === y) plasserFylgje();
  }
  /* Scenesteg: figuren kven reiser seg frå setet eller står opp av senga og går eitt steg ut: framover
     (retninga til setet), elles til sidene, ut av senga helst nedover. Han reiser seg i éi ramme. */
  async function reis(kven) {
    const a = aktor(kven); if (!a || !kart) return;
    const st = seteVed(a.x, a.y), sg = sengVed(a.x, a.y), b = (st || sg || {}).b;
    if (!b) { a.pose = null; return; }
    const fram = st && st.s.retning != null ? st.s.retning : st ? a.dir : 0;
    const rekkje = [fram, ...[2, 3, 0, 1].filter(d => d !== fram)].filter(d => !(st && st.s.retning != null && st.s.rygg !== false && d === MOTSETT[st.s.retning]));
    const d = rekkje.find(d => { const nx = a.x + DX[d], ny = a.y + DY[d]; const n = seteVed(nx, ny) || sengVed(nx, ny);
      return !(n && n.b === b) && kanGaa(nx, ny) && !opptatt(a, nx, ny) && !doraVed(nx, ny); });
    if (d == null) { console.warn("Regi: ingen veg ut av", b.id, "for", kven); a.pose = null; return; }
    a.reisLyft = figurVis(a).lyft; a.reisT = performance.now();       // høgda glir ned att (figurVis)
    await gaa(kven, { sti: [d] });                                    // gaa tek posen bort: han reiser seg i éi ramme
    a.pose = null;
    if (a.hx !== undefined) { a.hx = a.x; a.hy = a.y; a.neste = performance.now() + 2000; }
  }
  /* Korleis ein figur blir teikna (runde 92): på eit sete sit han, i ei seng ligg han under dyna. Han
     går heilt inn på ruta i vanleg gangtakt og byter så til sitjeposen i éi ramme, og høgda (lyft:
     setehøgda og SITJE_DY) glir på tre tikk (sitT). Ut att reiser han seg i éi ramme og går ut. Langs ein
     benk glir spelaren sitjande (flytt.glid) med rammene for å flytte seg sidelengs (skuvh1, skuvh2 mot
     høgre, skuvv1, skuvv2 mot venstre). py er biletrada til føtene (for testane). */
  function figurVis(a) {
    const v = { x: a.fx, y: a.fy, dir: a.dir, pose: a.pose, sete: null, seng: null, lyft: 0 };
    const f = a.flytt;
    if (f && f.glid) {
      const st = seteVed(a.x, a.y), u = a.u || 0;
      if (st) {
        Object.assign(v, { pose: "sitje", sete: st });
        const mot = a.x - f.fx, fase = u < 0.4 ? 1 : u < 0.8 ? 2 : 0;
        if (fase) v.skuv = (mot < 0 && a.dir < 2 ? "skuvv" : "skuvh") + fase;
      } else v.seng = sengVed(a.x, a.y);
    } else if (!f) {
      if (v.pose === "sitje") v.sete = seteVed(v.x, v.y);
      else if (v.pose === "sove" || v.pose === "liggje") v.seng = sengVed(v.x, v.y);
    }
    if (v.sete) {
      const k = a.sitT ? Math.min(1, Math.max(0, (performance.now() - a.sitT) / (3 * TIKK))) : 1;
      v.lyft = Math.round((SITJE_DY[v.dir] - v.sete.s.hogd) * k);
    } else if (a.reisT && a.reisLyft && v.pose !== "sitje") {         // reist seg: høgda glir ned att på fem tikk (han går samstundes)
      const k = Math.min(1, (performance.now() - a.reisT) / (5 * TIKK));
      if (k < 1) v.lyft = Math.round(a.reisLyft * (1 - k));
    }
    v.py = Math.round(v.y * S) + v.lyft - hogdVed(v.x, v.y);
    return v;
  }
  const spelarVis = () => figurVis(spelar);
  function komFram(glid, inn) {
    const sett = setSeg(glid ? null : inn);
    if (sett === "seng" && !glid && krokar.seng) krokar.seng();        // kvile under dyna (spel.js)
    if (sett) return;
    const dor = doraVed(spelar.x, spelar.y);
    if (dor && dor.kant) { gaaGjennom(dor); return; }
    for (const [m, [x, y]] of Object.entries(kart.merke)) {
      const inn = (kart.def.inngang || []).find(i => i.merke === m);
      if (inn && x === spelar.x && y === spelar.y && krokar.inngang) { krokar.inngang(inn); return; }
    }
    const f = kart.def.fiendar;
    const c = kart.fliser[spelar.y][spelar.x];
    // fiendar.vis (valfri): møta finst berre når vilkåret held (rottene i stabburet etter scena «rotta»).
    if (f && !kart.def.fristad && (f.alle || c === ",") && (!f.vis || f.vis(krokar.tilstand())) && krokar.kamp) {
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
    const nt = naturtingVed(tx, ty);
    if (nt && nt.manus && krokar.undersok) { krokar.undersok(nt); return; }
    const c = kart.fliser[ty] && kart.fliser[ty][tx];
    if ((c === "L" || c === "å" || c === "Å") && krokar.lampe) { krokar.lampe(c === "L" ? "lykt" : "baal"); return; }   // lagringsstadene
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
    if (a === spelar && fylgje && !fylgje.regi && !((seteVed(x0, y0) || sengVed(x0, y0)) && !kanGaa(x0, y0))) {   // ikkje inn på eit sete eller i ei seng
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
  let kam = null, sentrum = { x: 0, y: 0 }, kameraNo = { x: 0, y: 0 };   // kameraNo: øvre venstre hjørne i pikslar no
  let kameraGrunn = { x: 0, y: 0 };                                    // same, utan utsikta nedst (nedPx)
  /* Kameraet fylgjer etter med fast fart i heile pikslar per tikk, som i FF6, og ikkje med ei
     mjuk glidning: med glidning mot noko som går, flytta biletet seg ujamt. Farten blir rekna
     slik at kameraet er framme på ms (minst 1 piksel per tikk). Går målet, flyttar kameraet seg
     med målet i tillegg, så det fangar det og så går i takt. kam.px er øvre venstre hjørne i pikslar. */
  /* Utsikt nedst (kart.def.kameraNed = { fra, rader, fart } eller { kant: true, rader, fart }): først
     når målet står på rad fra eller lenger nede, eller (kant) på ei flis med stup («M») rett under seg,
     glir kameraet rader rader ned, og attende når målet går vekk frå kanten. Glidinga går for seg sjølv i tikk-takt, fart pikslar per tikk (standard 1), så ho er
     roleg og i heile pikslar (nedPx). På Åsen står Ivar då øvst på skjermen, og lia syner under.
     Utsikt øvst (kart.def.kameraOpp = { fra, til, rader }): når målet er ovanfor rad fra, ser kameraet
     jamt lenger opp, til rader rader over kartet ved rad til, der det er luft og utsikta syner (sjå
     nordkant). Farten går opp i heile pikslar når rader / (fra - til) er eit halvt tal. */
  let nedPx = 0, nedTikk = 0, oppPx = 0;
  /* kameraOpp med fart ({ fra, rader, fart }): når målet er på rad fra eller høgare oppe, glir
     kameraet roleg opp over kanten, fart pikslar per tikk, og laga i utsikta stig fram over
     horisonten etter kvart (dei fjerne flyttar seg minst). Utan fart ser kameraet jamt lenger opp
     etter kor høgt målet er (sjå forskuv). */
  function oppdaterNed(no, malX, malY) {
    const k = kart.def.kameraNed, t = tikk(no), n = Math.max(0, t - nedTikk);
    nedTikk = t;
    // Scenekameraet overstyrer: medan ei hending køyrer (pausa) eller kameraet går etter regi (kam),
    // står utsikta i ro der ho er, og kameraet() tek ho med seg inn i kam.px (sjå kamera).
    if (pausa || kam) return;
    const ko = kart.def.kameraOpp;
    if (ko && ko.fart) {
      const maalO = malY <= ko.fra + 0.001 ? Math.round(ko.rader * S) : 0;
      oppPx += Math.sign(maalO - oppPx) * Math.min(Math.abs(maalO - oppPx), ko.fart * Math.min(n, 8));
    } else oppPx = 0;
    if (!k) { nedPx = 0; return; }
    // ruter: ["x,y", …] er utløysarrutene (neset og spissen av hylla på Åsen): berre der glir kameraet ned.
    // Mellom to ruter gjeld begge: går ein frå ei utløysarrute til ei anna (langs neset), blir kameraet nede.
    const ved = k.ruter ? [Math.floor(malX + 0.01), Math.ceil(malX - 0.01)].every(x => [Math.floor(malY + 0.01), Math.ceil(malY - 0.01)].every(y => k.ruter.includes(x + "," + y)))
      : k.kant ? ("MUZ".includes((kart.fliser[Math.round(malY) + 1] || [])[Math.round(malX)] || "x") && Math.abs(malY - Math.round(malY)) < 0.01) : malY >= k.fra - 0.001;
    const maal = ved ? Math.round(k.rader * S) : 0, fart = Math.max(1, k.fart || 1);
    nedPx += Math.sign(maal - nedPx) * Math.min(Math.abs(maal - nedPx), fart * Math.min(n, 8));
  }
  const forskuv = (k, y) => {
    if (!k) return 0;
    const lengd = Math.abs(k.til - k.fra), rader = k.rader != null ? k.rader : lengd / 2;
    return Math.max(0, Math.min(1, (k.til > k.fra ? y - k.fra : k.fra - y) / lengd)) * rader;
  };
  const utsiktOpp = y => kart.def.kameraOpp && kart.def.kameraOpp.fart ? 0 : forskuv(kart.def.kameraOpp, y);
  const kameraMaal = m => {                                            // øvre venstre hjørne for eit sentrum, innanfor kartet
    const k = kart.def.kameraOpp, opp = k ? (k.rader != null ? k.rader : (k.fra - k.til) / 2) : 0;    // kor mange rader kameraet kan sjå over kartet
    return {
      x: kart.w < VW ? 0 : Math.round(Math.max(0, Math.min(kart.w - VW, m.x - (VW - 1) / 2)) * S),
      // hogd over 0: kameraet følgjer figuren der han syner (oppe i preikestolen), ikkje ruta han står på.
      y: kart.h < VH ? 0 : Math.round(Math.max(-opp, Math.min(kart.h - VH, m.y - Math.max(0, hogdVed(m.x, m.y)) / S - utsiktOpp(m.y) - (VH - 1) / 2)) * S),
    };
  };
  function kamera(til, ms = 900) {
    const a = typeof til === "string" ? aktor(til) : null;
    const mal = til == null ? () => ({ x: spelar.fx, y: spelar.fy }) : a ? () => ({ x: a.fx, y: a.fy }) : () => ({ x: til[0], y: til[1] });
    // Kameraet byrjar der biletet står no, med utsikta (nedPx, oppPx) teken med, og så styrer scena åleine.
    const px = { x: kameraGrunn.x, y: kameraNo.y }, m = kameraMaal(mal()), n = Math.max(1, tikk(ms));
    nedPx = 0; oppPx = 0;
    kam = { px, mal, sistMaal: m, tikk: tikk(performance.now()), tilbake: til == null,
      fart: { x: Math.max(1, Math.ceil(Math.abs(m.x - px.x) / n)), y: Math.max(1, Math.ceil(Math.abs(m.y - px.y) / n)) } };
    return vent(ms);
  }
  // Øvre venstre hjørne til kameraet no, i heile pikslar, med utsikta nedst (nedPx) lagd til.
  function kameraPx(no) {
    const g = kameraGrunnPx(no);
    kameraGrunn = g;
    const mal = kam ? kam.mal() : { x: spelar.fx, y: spelar.fy };
    oppdaterNed(no, mal.x, mal.y);
    const ko = kart.def.kameraOpp, opp = ko ? (ko.rader != null ? ko.rader : (ko.fra - ko.til) / 2) * S : 0;
    return { x: g.x, y: kart.h < VH ? g.y : Math.max(-opp, Math.min((kart.h - VH) * S, g.y + nedPx - oppPx)) };
  }
  function kameraGrunnPx(no) {
    if (!kam) return kameraMaal({ x: spelar.fx, y: spelar.fy });
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
      if (kam.tilbake && kam.px.x === m.x && kam.px.y === m.y) { kam = null; return kameraMaal({ x: spelar.fx, y: spelar.fy }); }
    }
    return { x: kam.px.x, y: kam.px.y };
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
      el.innerHTML = `<p class="kort-stad">${merkHtml(stad)}</p>${tid ? `<p class="kort-tid">${merkHtml(tid)}</p>` : ""}`;
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
      el.innerHTML = `<img src="${E(src)}" alt="">${tekst ? `<p class="rpg-vindauge fv-tekst"><span>${merkHtml(tekst)}</span></p>` : ""}`;
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
  /* Skogkanten («#»): kva sider som har open mark (bit 1 nord, 2 aust, 4 sør, 8 vest). opne er all
     bakke (gras, sti, sand), gras berre gras, der trea kan stå ute og små tre kan stå framfor kanten,
     og vatn sidene mot vatn (der går graset inn i skogbotnen, men trea står ikkje ut). */
  function skogkant(x, y) {
    const k = x + "," + y;
    if (!kart.skogkant) kart.skogkant = {};
    if (kart.skogkant[k]) return kart.skogkant[k];
    let opne = 0, gras = 0, vatn = 0, ute = 0, himmel = 0;
    for (const [bit, dx, dy] of [[1, 0, -1], [2, 1, 0], [4, 0, 1], [8, -1, 0]]) {
      const n = (kart.fliser[y + dy] || [])[x + dx];
      if (n == null) ute |= bit;
      if (n === "-" || n === "N") himmel |= bit;
      if (n != null && erVatn(x + dx, y + dy)) { vatn |= bit; continue; }
      if (n == null || n === "#") continue;
      const kl = Pikslar.klasse(n);
      if (kl === "gras" || kl === "villgras" || kl === "veg" || kl === "sand") opne |= bit;
      // Gras der eit tre kan lene seg ut eller stå: ikkje om det står noko oppreist (ei lykt, ein grav)
      // på naboflisa eller på flisa under henne, for treet står med foten nedst på naboflisa.
      const under = (kart.fliser[y + dy + 1] || [])[x + dx];
      if ((kl === "gras" || kl === "villgras") && !Pikslar.FAST.has(n) && !(Pikslar.STAAR && Pikslar.STAAR.has(under))) gras |= bit;
    }
    return (kart.skogkant[k] = { opne, gras, vatn, ute, himmel });
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

  /* Terrengfeltet til Pikslar.skrent, Pikslar.stup og Pikslar.rampe: teiknet på kvar flis (utanfor
     kartet blir kanten forlengd), så skrentar og stup kan sjå på naboane sine. */
  function terrengfelt() {
    if (kart.terrengfelt) return kart.terrengfelt;
    const kx = v => Math.max(0, Math.min(kart.w - 1, v)), ky = v => Math.max(0, Math.min(kart.h - 1, v));
    kart.terrengfelt = { id: kart.id, w: kart.w, h: kart.h, golv: kart.def.golv, stupFast: !!kart.def.stupFast, skra: kart.def.skra, c: (x, y) => kart.fliser[ky(y)][kx(x)] };
    return kart.terrengfelt;
  }

  // Ei kantflis: «N», eller rad 0 på eit kart med kameraOpp. Bakken (gras, eller sti med graset under)
  // med kanten der bakken fell bort oppå (Pikslar.nordkant). Éin gong per flis (ikkje animerte).
  const erKant = (c, y) => c === "N" || (y === 0 && !!kart.def.kameraOpp && c !== LUFT);
  // Bakke ein kan gå på, med luft ved sida (spissen av hylla over dalen): Pikslar.sidekant.
  const erSidekant = (c, x, y) => y > 0 && c !== LUFT && !Pikslar.FAST.has(c) && !!Pikslar.klasse(c) && ((kart.fliser[y][x - 1]) === LUFT || kart.fliser[y][x + 1] === LUFT);
  function nordkant(x, y, fk) {
    const k = kart.nordkantar || (kart.nordkantar = new Map()), nk = x + "," + y;
    if (k.has(nk)) return k.get(nk);
    const c = kart.fliser[y][x], base = document.createElement("canvas"); base.width = base.height = S;
    const bg = base.getContext("2d");
    if (Pikslar.klasse(c) === "veg") {
      bg.drawImage(Pikslar.flis(".", 0, x, y, kart.def.golv), 0, 0);
      const sl = Pikslar.sti(stifelt(), x, y); if (sl) bg.drawImage(sl, 0, 0);
    } else bg.drawImage(Pikslar.flis(c === "N" ? "." : fk, 0, x, y, kart.def.golv), 0, 0);
    const kf = erKant(c, y) ? Pikslar.nordkant(base, terrengfelt(), x, y) : Pikslar.sidekant(base, terrengfelt(), x, y);
    k.set(nk, kf);
    return kf;
  }

  /* ---------- Parallakse: bakgrunnslag og forgrunn ----------
     Som på Super Nintendo (toppen av pyramiden i A Link to the Past, klippene over Narshe i FF6):
     landskapet langt nede er eigne lag som flyttar seg saktare enn kartet (faktor under 1), og
     forgrunnen (greiner, høgt gras) flyttar seg raskare (faktor over 1). Laga står i kart.def:
       parallakse: [{ bilete, faktor, ved: [kx, ky], x, y }, …]   bak kartet, det fjernaste først
       forgrunn:   [{ bilete, faktor, ved: [kx, ky], x, y }, …]   over alt anna
     bilete er namnet på fila i bilete/spel/parallakse/. x og y er der øvre venstre hjørne står på
     skjermen (i pikslar) når kameraet står med øvre venstre flis på ved. faktor er eit tal eller
     [fx, fy]. Kameraet står på heile pikslar, og laget blir runda til heile pikslar for seg:
     posisjonen er ein monoton funksjon av kameraet, så ingenting ristar fram og attende.
     Eit lag med faktor 1 står fast i terrenget (lia under stupet på Åsen). drift: n lèt laget gli
     éin piksel mot høgre per n tikk og gå rundt (skyene under Åsen), teikna to gonger side om side. Eit lag med variant: "namn"
     blir berre teikna når kartet har variant: "namn" (standard «fast»), så ein kan prøve ulike utsikter.
     Bakgrunnen syner gjennom luftfliser («-»: ikkje gangbare, ingen bakke) og der stupet («M»)
     løyser seg opp i dis nedst. luftfarge fyller skjermen under laga. */
  const LUFT = "-";
  const parallaksebilete = namn => Pikslar.hent(`bilete/spel/parallakse/${namn}.png`);
  function lagPos(l, camX, camY) {
    const f = Array.isArray(l.faktor) ? l.faktor : [l.faktor, l.faktor], ved = l.ved || [0, 0];
    return [Math.round(l.x - (camX - ved[0] * S) * f[0]), Math.round(l.y - (camY - ved[1] * S) * f[1])];
  }
  /* Eit lag kan vere animert: rammer: n (rammene side om side i biletet), rekkje: [ramme, …] og takt:
     tikk per steg (graset i forgrunnen vaiar i vinden). Kvar ramme blir klipt ut éin gong. */
  const rammeLerret = new WeakMap();
  function lagRamme(img, l, no) {
    if (!l.rammer || l.rammer < 2) return img;
    let rs = rammeLerret.get(img);
    if (!rs) {
      const fw = Math.floor(img.naturalWidth / l.rammer); rs = [];
      for (let r = 0; r < l.rammer; r++) {
        const c = document.createElement("canvas"); c.width = fw; c.height = img.naturalHeight;
        c.getContext("2d").drawImage(img, r * fw, 0, fw, img.naturalHeight, 0, 0, fw, img.naturalHeight); rs.push(c);
      }
      rammeLerret.set(img, rs);
    }
    const rekkje = l.rekkje || rs.map((_, i) => i);
    return rs[rekkje[Math.floor(tikk(no) / (l.takt || 30)) % rekkje.length]] || rs[0];
  }
  function teiknLag(lag, camX, camY, forgrunn, no) {
    for (const l of lag || []) {
      if (l.variant && l.variant !== (kart.def.variant || "fast")) continue;   // berre laga i varianten kartet har valt
      const kjelde = parallaksebilete(l.bilete);
      if (!Pikslar.klar(kjelde)) continue;
      const img = lagRamme(kjelde, l, no), iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
      const [x0, y] = lagPos(l, camX, camY);
      if (l.drift) {                                                     // driv rundt: to kopiar side om side
        const x = x0 + Math.floor(tikk(no) / l.drift) % iw;
        g.drawImage(img, x, y); g.drawImage(img, x - iw, y);
        continue;
      }
      const x = x0;
      if (x >= LW || y >= LH || x + iw <= 0 || y + ih <= 0) continue;
      g.drawImage(img, x, y);
      if (forgrunn) { maske(img, x, y, true); luftUt(img, x, y); }
    }
  }
  // Luftmaska: pikslane der bakgrunnen syner (luftfliser og opne pikslar i stupet). Lyset reknar
  // dei med nivå 5 (fjernt: ingen skyskuggar og ingen glød, sjå lys()).
  const luftMaske = new Uint8Array(LW * LH);
  let harLuft = false;
  function luftRute(sx, sy, ope) {
    harLuft = true;
    for (let y = 0; y < S; y++) {
      const yy = sy + y; if (yy < 0 || yy >= LH) continue;
      for (let x = 0; x < S; x++) {
        const xx = sx + x; if (xx < 0 || xx >= LW) continue;
        if (!ope || ope[y * S + x]) luftMaske[yy * LW + xx] = 1;
      }
    }
  }
  // Eit forgrunnselement som dekkjer lufta, høyrer til forgrunnen (alfa frå biletet, éin gong).
  const alfar = new WeakMap();
  function luftUt(img, x0, y0) {
    if (!harLuft) return;
    let a = alfar.get(img);
    if (!a) {
      const c = document.createElement("canvas"); c.width = img.naturalWidth || img.width; c.height = img.naturalHeight || img.height;
      const cg = c.getContext("2d", { willReadFrequently: true }); cg.drawImage(img, 0, 0);
      const d = cg.getImageData(0, 0, c.width, c.height).data; a = new Uint8Array(c.width * c.height);
      for (let i = 0; i < a.length; i++) a[i] = d[i * 4 + 3] > 0 ? 1 : 0;
      alfar.set(img, a);
    }
    const w = img.naturalWidth || img.width, h = img.naturalHeight || img.height;
    for (let y = Math.max(0, -y0); y < h && y0 + y < LH; y++) for (let x = Math.max(0, -x0); x < w && x0 + x < LW; x++)
      if (a[y * w + x]) luftMaske[(y0 + y) * LW + x0 + x] = 0;
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
  const lysNiva = new Uint8Array(LW * LH);         // 0 grunn, 1 til 3 glød, 4 skyskugge, 5 fjernt (bakgrunnslaga)
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
  // Støv i strålane (stov i stemninga): einskilde pikslar i kjernen lyser sterkt og søkk sakte nedover.
  // inne(x, y): om skjermpikselen ligg over golvet i rommet; strålen blir klipt utanfor (veggar, tomrom).
  function straale(sx, sy, no = 0, stov = false, inne = null) {
    const fall = Math.floor(no / 160);
    for (let dy = 0; dy < 104; dy++) {
      const y = sy + dy; if (y < 0 || y >= LH) continue;
      const xl = sx + (dy >> 1), sterk = dy < 36 ? 3 : dy < 70 ? 2 : 1;
      for (let dx = -1; dx < 11; dx++) {
        const x = xl + dx; if (x < 0 || x >= LW) continue;
        if (inne && !inne(x, y)) continue;
        let lv = dx >= 2 && dx < 8 ? sterk : sterk - 1;
        if (dx < 0 || dx >= 10) lv = (x + y) & 1 ? 0 : Math.max(0, sterk - 1);
        else if (stov && dy > 8 && dx >= 1 && dx < 9 && (((dx * 13 + (dy - fall) * 7) % 61) + 61) % 61 === 0) lv = 3;
        const i = y * LW + x;
        if (lv > lysNiva[i]) lysNiva[i] = lv;
      }
    }
  }
  /* Øvre venstre hjørne for inventar på skjermen (pikslar). Inventar som heng høgt (over: true, til
     dømes lysekrona) kan ha faktor (tal eller [fx, fy]) over 1: det heng nærare kameraet enn golvet
     og flyttar seg difor raskare enn kartet når kameraet går (parallakse). Det står på plassen sin i
     kartet når midten av fotavtrykket er midt på skjermen, og blir skuva utover mot kantane elles.
     Posisjonen er runda til heile pikslar og monoton i kameraet, så ingenting ristar. */
  /* Høgd på ruter (kart.def.hogd: { "x,y": pikslar }): den som står der, blir teikna så mange pikslar
     høgare, til dømes trappa opp til preikestolen og korga der (inventaret framfor blir teikna etter
     og dekkjer føtene). Mellom rutene glir høgda jamt, så ein går opp trinn for trinn. */
  // Ein verdi kan vere eit tal (pikslar opp, negativ: ned) eller [opp, dx] med ei forskyving sidelengs
  // (Ivar står midt i korga på preikestolen, som står mellom to ruter).
  function hogdVed(x, y, del = 0) {
    const H = kart && kart.def.hogd; if (!H) return 0;
    const x0 = Math.floor(x), y0 = Math.floor(y), tx = x - x0, ty = y - y0;
    const h = (a, b) => { const v = H[a + "," + b]; return v == null ? 0 : typeof v === "number" ? (del ? 0 : v) : v[del] || 0; };
    const ovre = h(x0, y0) * (1 - tx) + h(x0 + 1, y0) * tx, nedre = h(x0, y0 + 1) * (1 - tx) + h(x0 + 1, y0 + 1) * tx;
    return Math.round(ovre * (1 - ty) + nedre * ty);
  }
  /* Inventar inntil ein sidevegg inne (runde 92): biletet er 8 pikslar breiare enn fotavtrykket, så
     det går 4 pikslar ut på kvar side. Står det inntil sideveggen, blir det skuva 4 pikslar inn i rommet,
     så det står mot veggen og ikkje inne i han. dy på bygget i kartet flyttar biletet opp eller ned
     (senga med hovudgavlen heilt inntil bakveggen). */
  function byggDx(b) {
    if (!kart.def.inne || b.over || b.flat || b.faktor) return 0;
    const w = byggBreidd(b), vegg = (x, y) => "XcG".includes((kart.fliser[y] || [])[x] || "");
    let v = false, h = false;
    for (let y = b.y; y < b.y + b.h; y++) { if (vegg(b.x - 1, y)) v = true; if (vegg(b.x + w, y)) h = true; }
    if (v === h) return 0;
    // Berre så mykje som biletet faktisk går ut over fotavtrykket (ei smal seng held seg inne og står der ho står).
    const [x0, x1] = synlegeKolonnar(Pikslar.bygg(b.id));
    return v ? Math.max(0, 4 - x0) : -Math.max(0, x1 - (4 + w * S - 1));
  }
  const kolonneCache = new WeakMap();
  function synlegeKolonnar(img) {
    if (!img) return [4, 4];
    if (!kolonneCache.has(img)) {
      const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
      const cg = c.getContext("2d"); cg.drawImage(img, 0, 0); const d = cg.getImageData(0, 0, img.width, img.height).data;
      let x0 = img.width, x1 = -1;
      for (let y = 0; y < img.height; y++) for (let x = 0; x < img.width; x++) if (d[(y * img.width + x) * 4 + 3]) { if (x < x0) x0 = x; if (x > x1) x1 = x; }
      kolonneCache.set(img, [x0, x1]);
    }
    return kolonneCache.get(img);
  }
  function byggPos(b, img, ox, oy) {
    const x = Math.round((b.x + ox) * S) - 4 + byggDx(b), y = Math.round((b.y + b.h + oy) * S) - img.height + (b.dy || 0);
    if (!b.faktor) return [x, y];
    const f = Array.isArray(b.faktor) ? b.faktor : [b.faktor, b.faktor];
    const mx = (b.x + (img.width - 8) / S / 2 + ox) * S - LW / 2, my = (b.y + b.h - 0.5 + oy) * S - LH / 2;
    return [x + Math.round(mx * (f[0] - 1)), y + Math.round(my * (f[1] - 1)), mx, my];
  }
  /* Kjettingen opp til taket for inventar som heng (Pikslar.KJEDE: festet i biletet, og tak: faktoren
     for taket i kartet, større enn faktor). Taket er høgare enn krona og flyttar seg difor endå
     raskare (berre loddrett: loddrette ting står loddrett i 3/4-vinkelen, som veggane): kjettingen
     går frå festet til eit punkt KJEDE_LENGD pikslar over, flytta med takfaktoren, så han blir
     lengre øvst på skjermen og kortare nedst, som i perspektiv. Øvst er ein liten takrosett. */
  const KJEDE_LENGD = 56;
  function kjede(b, img, ux, uy, mx, my, ox, oy) {
    const fest = Pikslar.KJEDE && Pikslar.KJEDE[b.id]; if (!fest || !b.tak) return;
    const fy = Array.isArray(b.faktor) ? b.faktor[1] : b.faktor || 1;
    const ax = ux + fest[0], ay = uy + fest[1], bx = ax;
    const by = ay - KJEDE_LENGD + Math.round(my * (b.tak - fy));
    const n = ay - by; if (n <= 0 || by >= LH || ay < 0) return;
    for (let i = 0; i <= n; i++) {
      const y = ay - i; if (y >= LH) continue; if (y < 0) break;
      const x = ax;
      g.fillStyle = "#0a0514"; g.fillRect(x - 1, y, 4, 1);                   // to pikslar med omriss, som stubben i biletet
      g.fillStyle = i % 4 < 2 ? "#8a5a18" : "#d0a030"; g.fillRect(x, y, 1, 1);
      g.fillStyle = i % 4 < 2 ? "#4e300c" : "#8a5a18"; g.fillRect(x + 1, y, 1, 1);
    }
    g.fillStyle = "#0a0514"; g.fillRect(bx - 3, by - 2, 7, 3);                 // takrosetten
    g.fillStyle = "#8a5a18"; g.fillRect(bx - 2, by - 1, 5, 1); g.fillStyle = "#d0a030"; g.fillRect(bx - 2, by - 1, 2, 1);
  }
  // Lyskjeldene på kartet: [x, y, type, fase], x og y i skjermpikslar (typane står i RPGData.LYSKJELDER).
  function lyskjelder(ox, oy) {
    const ut = [];
    for (const b of kart.def.bygg || []) {
      // Ljos på inventar (Pikslar.LJOS): lysekrona og altarljosa. Ankeret følgjer parallaksen.
      const ljos = Pikslar.LJOS && Pikslar.LJOS[b.id];
      if (ljos) {
        const img = Pikslar.bygg(b.id); if (!img) continue;
        const [bx, by] = byggPos(b, img, ox, oy);
        for (const [i, l] of ljos.entries()) {
          ut.push([bx + l.x, by + l.y, l.type, b.x * 3 + b.y + i * 5]);
          if (l.golv) ut.push([Math.round((b.x + (img.width - 8) / S / 2 + ox) * S), Math.round((b.y + b.h + oy) * S) + 8, "kronegolv", b.x * 3 + b.y]);
        }
        continue;
      }
      const type = b.id === "inne-grue" ? "grue" : b.id === "inne-kakkelomn" ? "kakkelomn" : b.id === "inne-jernomn" ? "lys" : b.id === "inne-glugge" ? "glugge" : null;
      const img = type && Pikslar.bygg(b.id); if (!img) continue;
      const [bx, by] = byggPos(b, img, ox, oy);
      const r = (Pikslar.ILD[b.id] || [])[0];                         // elden i grua og omnen: ankeret er nedst midt i elden
      ut.push(r ? [bx + r.x + (r.w >> 1), by + r.y + r.h, type, b.x * 3 + b.y] : [bx + (img.width >> 1), by + (img.height >> 1), type, b.x * 3 + b.y]);
    }
    const ute = kart.def.golv === "." || kart.def.golv === ",";
    // Dagslys (stabburet): lyset fell inn gjennom døropninga (E) og over golvet framfor.
    const dagslys = ((RPGData.STEMNINGAR || {})[kart.def.stemning] || {}).dagslys;
    for (let y = 0; y < kart.h; y++) for (let x = 0; x < kart.w; x++) {
      const c = kart.fliser[y][x], fase = x * 3 + y * 5;
      if (c === "f") ut.push([(x + ox) * S + 8, (y + oy) * S + 14, "peis", fase]);
      else if (c === "L") ut.push([(x + ox) * S + 8, (y + oy) * S + (ute ? 1 : 10), ute ? "lykt" : "lyktgolv", fase]);
      else if (c === "å") ut.push([(x + ox) * S + 8, (y + oy) * S + 9, "baal", fase]);
      else if (c === "Å" && kart.fliser[y][x - 1] !== "Å") ut.push([(x + ox) * S + 16, (y + oy) * S + 9, "baalstor", fase]);   // midt mellom dei to flisene
      else if (c === "T") ut.push([(x + ox) * S + 8, (y + oy) * S + 1, "lykt", fase]);   // ankeret midt i glaset
      else if (c === "E" && dagslys) ut.push([(x + ox) * S + 8, (y + oy) * S + 8, "dor", fase]);
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
      // Strålane startar ved blyglaset: i bakveggen (u) og ved innsida av vindauga i venstre sidevegg (Ø).
      // Strålane og støvet blir berre teikna over golvet i rommet, ikkje over veggar, vindauge eller
      // tomrommet utanfor huset (fliser som ikkje er golv).
      const golvVed = (px, py) => { const c = (kart.fliser[Math.floor(py / S - oy)] || [])[Math.floor(px / S - ox)]; return c != null && !" GXcĜØøÖöuE-#".includes(c); };
      if (st.straalar) for (let y = 0; y < kart.h; y++) for (let x = 0; x < kart.w; x++) {
        const c = kart.fliser[y][x];
        if (c === "u") straale(Math.round((x + ox) * S) + 4, Math.round((y + oy) * S) + 11, no, st.stov, golvVed);
        else if (c === "Ø" || c === "Ö") straale(Math.round((x + 1 + ox) * S) - 3, Math.round((y + oy) * S) + (c === "Ø" ? 3 : 0), no, st.stov, golvVed);
      }
    }
    // Bakgrunnslaga (dalen og fjella langt nede) får nivå 5: ingen skyskugge eller glød der,
    // berre fjern-operasjonen til stemninga (eller bak) og hdma.
    if (harLuft) for (let i = 0; i < luftMaske.length; i++) if (luftMaske[i]) lysNiva[i] = 5;
    // Operasjonane for kvart nivå (0 grunn, 1 til 3 glød, 4 skugge, 5 fjernt), for bakgrunn og figurar.
    const syk = st.syklus ? Math.floor(no / 150) : 0;
    const opNiva = (l, n) => n === 5 ? st.fjern || st[l] || {} : n === 4 ? (st.skugge || {})[l] || st[l] || {} : n > 0 && st.glod ? st.glod[l][n - 1] : st[l] || {};
    const lag = (l, n, y, tone) => {
      const op = opNiva(l, n);
      const sy = n > 0 && n < 4 && st.syklus ? st.syklus[(syk + n) % st.syklus.length] : null3;
      const h = l === "bak" && (n === 0 || n >= 4) ? hdma(st.hdma, y) : null3;
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
      if ((y & 7) === 0) for (let n = 0; n < 6; n++) { lb[n] = lag("bak", n, y, tb); lf[n] = fm ? lag("fig", n, y, tf) : lb[n]; }
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
    // Kameraet står alltid på heile pikslar (som på SNES). Med brøkdelar blir fliser og figurar
    // runda kvar for seg, og figurane ristar éin piksel mot bakken når kameraet glir.
    kameraNo = kameraPx(no);
    const kx = kameraNo.x / S, ky = kameraNo.y / S;
    sentrum = { x: kx + (VW - 1) / 2, y: ky + (VH - 1) / 2 };       // der kameraet faktisk står (for testane)
    const ox = kart.w < VW ? (VW - kart.w) / 2 : -kx, oy = kart.h < VH ? (VH - kart.h) / 2 : -ky;
    g.fillStyle = "#0e0c12"; g.fillRect(0, 0, lerret.width, lerret.height);
    // Figurmaska til lyset (sjå lys()): berre når kartet har ei stemning eller ei toning av figurane.
    figMaske = !!((RPGData.STEMNINGAR || {})[kart.def.stemning] || effekt.tone.fig || effekt.tone.bak);
    if (figMaske) nyMaske();
    // Bakgrunnslaga (parallakse): det fjernaste først. Kameraet i heile pikslar.
    const camX = Math.round(-ox * S), camY = Math.round(-oy * S);
    if (harLuft) { luftMaske.fill(0); harLuft = false; }
    if (kart.def.parallakse) {
      // Berre innanfor kartet: eit lite kart (minnet) har mørkt rundt seg, ikkje utsikt.
      // Med kameraOpp er det luft over kartet òg (utsikta over kanten øvst).
      const y0k = kart.def.kameraOpp ? 0 : Math.round(oy * S), y1k = Math.round((oy + kart.h) * S);
      g.save(); g.beginPath(); g.rect(Math.round(ox * S), y0k, kart.w * S, y1k - y0k); g.clip();
      if (kart.def.luftfarge) { g.fillStyle = kart.def.luftfarge; g.fillRect(0, 0, LW, LH); }
      teiknLag(kart.def.parallakse, camX, camY, false, no);
      g.restore();
      if (kart.def.kameraOpp && oy > 0) {                                  // lufta over kartet
        harLuft = true; luftMaske.fill(1, 0, Math.min(LH, Math.round(oy * S)) * LW);
      }
    }
    const x0 = Math.floor(-ox) - 1, y0 = Math.floor(-oy) - 1;
    const naturFig = [];
    // Rada under skjermen er med, fordi høge figurar (tre, murar) står der og stikk opp i biletet.
    for (let y = Math.max(0, y0); y < Math.min(kart.h, y0 + VH + 5); y++) for (let x = Math.max(0, x0 - 1); x < Math.min(kart.w, x0 + VW + 3); x++) {
      const c = kart.fliser[y][x];
      const sx = Math.round((x + ox) * S), sy = Math.round((y + oy) * S);
      // Luft: ingen bakke, bakgrunnslaga syner gjennom.
      if (c === LUFT) { luftRute(sx, sy, null); continue; }
      // Stupet: bergveggen som fell ned mot utsikta, og løyser seg opp i dis nedst (Pikslar.stup).
      if (c === "M" || c === "U" || c === "Z") { const st = Pikslar.stup(terrengfelt(), x, y); g.drawImage(st, sx, sy); if (st.ope) luftRute(sx, sy, st.ope); continue; }
      // Veggar med vegg eller dør under seg er sidevegger: dei blir teikna ovanfrå.
      const under = y + 1 < kart.h ? kart.fliser[y + 1][x] : null;
      const topp = "XcG".includes(c) && (under === null || "XcGEØøÖöĜ ".includes(under));   // òg over sidevindauge og tomrom (« ») utanfor huset
      let fk = topp ? c + "t" : c;
      if (c === "R") { const over = y > 0 && kart.fliser[y - 1][x] === "R"; fk = !over && under !== "R" ? "Rtb" : !over ? "Rt" : under !== "R" ? "Rb" : "R"; }
      if (erKant(c, y) || erSidekant(c, x, y)) {
        // Kanten øvst: bakken fell bort, og utsikta syner over graskanten (Pikslar.nordkant).
        const kf = nordkant(x, y, fk); g.drawImage(kf, sx, sy); luftRute(sx, sy, kf.ope);
      } else if (erVatn(x, y)) {
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
            if (n && Pikslar.klasse(n) && Pikslar.klasse(n) !== "vatn") { under = n === "#" ? kart.def.golv : n; break; }   // under skogkanten: graset, ikkje skogbotnen
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
        // Rampa («/») er stien som går ned gjennom ein skrent, med trinn i den tråkka jorda.
        const sl = c === "/" ? Pikslar.rampe(stifelt(), terrengfelt(), x, y) : Pikslar.sti(stifelt(), x, y);
        if (sl) g.drawImage(sl, sx, sy);
      } else if (c === "s") {
        // Skrent mellom to nivå (terrassar): graset over og under, bakkekanten oppå (Pikslar.skrent).
        g.drawImage(Pikslar.flis(".", no, x, y, kart.def.golv), sx, sy);
        g.drawImage(Pikslar.skrent(terrengfelt(), x, y), sx, sy);
      } else {
        // Skogkanten («#»): skogbotn, med graset frå naboflisa som går ujamt inn (Pikslar.kantflis).
        if (c === "#") g.drawImage(Pikslar.kantflis(kart.def.kant || "granskog", skogkant(x, y).opne | skogkant(x, y).vatn, x, y, kart.def.golv, no), sx, sy);
        else g.drawImage(Pikslar.flis(fk, no, x, y, kart.def.golv), sx, sy);
        // Grasflis ved ein sti: stien kan flytte seg inn på graset, og frynsa ligg her.
        const sk = Pikslar.klasse(c);
        if ((sk === "gras" || sk === "villgras") && NABOBIT.some(([, dx, dy]) => Pikslar.klasse((kart.fliser[y + dy] || [])[x + dx]) === "veg")) {
          const sl = Pikslar.sti(stifelt(), x, y);
          if (sl) g.drawImage(sl, sx, sy);
        }
      }
      // Under ein skrent: slagskuggen frå bakkekanten held fram på denne flisa.
      if (y > 0 && c !== "s" && kart.fliser[y - 1][x] === "s") { const us = Pikslar.underSkrent(terrengfelt(), x, y); if (us) g.drawImage(us, sx, sy); }
      // Steingard: muren er ein figur som blir sortert etter djupn
      if (c === "j") {
        const nb = (dx, dy) => (kart.fliser[y + dy] && kart.fliser[y + dy][x + dx]) === "j";
        const maske = (nb(0, -1) ? 1 : 0) | (nb(1, 0) ? 2 : 0) | (nb(0, 1) ? 4 : 0) | (nb(-1, 0) ? 8 : 0);
        naturFig.push({ y: y + 0.003, x, mur: Pikslar.steingard((x * 5 + y * 3) % 6, maske) });   // seks variantar, ulike langs rada
      }
      // Skigard: ein figur som står opp over flisa, så ein kan gå bak han.
      if (c === "|") {
        const nb = (dx, dy) => (kart.fliser[y + dy] && kart.fliser[y + dy][x + dx]) === "|";
        const maske = (nb(0, -1) ? 1 : 0) | (nb(1, 0) ? 2 : 0) | (nb(0, 1) ? 4 : 0) | (nb(-1, 0) ? 8 : 0);
        naturFig.push({ y: y + 0.003, x, mur: Pikslar.skigard(0, maske), loft: Pikslar.SKIGARD_LOFT });
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
      const nt = naturtingVed(x, y);
      const nf = erVatn(x, y) ? null : nt ? Pikslar.naturting(nt.bilete) : Pikslar.natur(c, x, y, kart.def.golv, no, kart.fliser[y][x - 1]);
      if (nf) {
        if (nf.skugge) { g.fillStyle = "rgba(20,24,50,0.3)"; g.beginPath(); g.ellipse(sx + 9, sy + 14, nf.skugge, 2.5, 0, 0, Math.PI * 2); g.fill(); }
        naturFig.push({ y: y + 0.005, x, natur: nf });
      }
      // Skogkanten: fleire tre per flis, ulikt langt ute mot open mark (sjå Pikslar.kantfigurar).
      if (c === "#" && !erVatn(x, y)) {
        const sk = skogkant(x, y);
        for (const f of Pikslar.kantfigurar(kart.def.kant || "granskog", x, y, sk.opne, sk.gras, sk.ute, sk.himmel)) {
          if (f.skugge) { g.fillStyle = "rgba(20,24,50,0.3)"; g.beginPath(); g.ellipse(sx + 9 + f.sx, sy + 14 + f.sy, f.skugge, 2.5, 0, 0, Math.PI * 2); g.fill(); }
          naturFig.push({ y: y + 0.005 + f.dz, rad: y, x, natur: f });
        }
      }
      if (c === "h" && kart.fliser[y][x - 1] !== "h" && (y === 0 || kart.fliser[y - 1][x] !== "h")) {
        const hb = Pikslar.haugBilete();
        if (hb) naturFig.push({ y: y + 1.004, x, haug: hb });
      }
      const k = kisteVed(x, y);
      // Kista er eit inventarbilete (inventar.py: inne-kiste, og inne-kiste-open når ho er opna), eller
      // eit eige bilete (bilete: skrinet etter far). Ho står nedst i flisa og blir sortert saman med
      // figurane, så loket dekkjer føtene til den som står bak. slag: slagskugge som under inventaret.
      const kb = k && Pikslar.bygg(k.bilete || (krokar.opna && krokar.opna(k) ? "inne-kiste-open" : "inne-kiste"));
      if (kb) naturFig.push({ y: y + 0.004, x, natur: { img: kb, x: -4, y: S - kb.height, slag: true } });
    }
    if (kart.def.inne) bakveggOver(ox, oy, no);
    const GANG = [1, 0, 2, 0];
    const figurar = kart.folk.filter(f => f.sprite).map(f => Object.assign({ sp: f.sprite, kjensle: f.kjensle,
      steg: f.flytt ? GANG[(f.steg % 2) * 2 + (f.u < 0.5 ? 0 : 1)] : 0 }, figurVis(f)));
    // Gangramma følgjer steget, ikkje klokka: to rammer per flis (steg, stå), annakvar fot.
    const steg = spelar.flytt ? GANG[(spelar.steg % 2) * 2 + (spelar.u < 0.5 ? 0 : 1)] : 0;
    // Følgjet går eit halvt steg forskyve, så dei to ikkje går i takt.
    const fv = spelar.u + 0.5, fsteg = fylgje && fylgje.regi ? (fylgje.flytt ? GANG[(fylgje.steg % 2) * 2 + (fylgje.u < 0.5 ? 0 : 1)] : 0)
      : spelar.flytt ? GANG[((spelar.steg + Math.floor(fv)) % 2) * 2 + (fv % 1 < 0.5 ? 0 : 1)] : 0;
    if (fylgje) figurar.push(Object.assign({ sp: fylgje.sprite, steg: fsteg, kjensle: fylgje.kjensle }, figurVis(fylgje)));
    figurar.push(Object.assign({ sp: spelar.sprite, steg, kjensle: spelar.kjensle }, spelarVis()));
    // Den som sit på ein stol eller benk (Pikslar.SETE), sit på setet: sjå sete i løkka under.
    for (const f of figurar) if (f.pose === "sitje" && !f.sete && f.y === Math.round(f.y) && f.x === Math.round(f.x)) f.sete = seteVed(f.x, f.y);
    for (const n of naturFig) figurar.push(n);
    // Hus blir sorterte saman med figurane etter den nedste flisraden sin.
    // Eit sete med ryggen mot kameraet (fram) kjem etter den som sit på det.
    for (const b of kart.def.bygg || []) { const img = Pikslar.bygg(b.id), fram = Pikslar.SETE && Pikslar.SETE[b.id] && Pikslar.SETE[b.id].fram;
      // flat: true (gravheller, golvteppe) ligg på golvet og blir teikna før alle figurane, utan slagskugge.
      // lag: n på eit bygg gir det ein fast plass i teikneorden (karmen rundt opninga bak preikestolen).
      if (!img) continue;
      /* Store møblar inne (runde 92) blir delte i ei stripe per flisrad, kvar sortert etter rada si, så
         ein figur som står attmed møbelet, blir dekt berre av den delen som er lenger nede enn føtene
         hans (Ivar ved sida av senga). Den øvste stripa tek med alt over møbelet (pipa, gavlen). */
      const del = kart.def.inne && !b.over && !b.flat && b.lag == null && !b.faktor && !(Pikslar.SETE && Pikslar.SETE[b.id]);
      if (del) { for (let r = b.y; r < b.y + b.h; r++) figurar.push({ y: r - 0.05, by: b.y + b.h - 1, x: b.x, bygg: img, id: b.id, b, stripe: [r === b.y ? null : r, r === b.y + b.h - 1 ? null : r + 1], botn: r === b.y + b.h - 1 }); continue; }
      figurar.push({ y: b.over ? 999 + b.y / 1000 : b.flat ? -1 : b.lag != null ? b.lag : b.y + b.h - 1 + (fram ? 0.03 : 0.01), by: b.y + b.h - 1, x: b.x, bygg: img, over: b.over, id: b.id, b, botn: true }); }
    // Den som sit eller ligg, blir teikna over inventaret på same rad (benken, senga). Den som sit
    // på eit sete, blir sortert etter den nedste rada til setet (ein ståande benk er fleire fliser).
    // kart.def.lag: { "x,y": djupn } gir den som står på ruta ein annan plass i teikneorden (til dømes i
    // korga på preikestolen: etter veggen og laget bak, før framsida).
    const lagVed = f => f.sp && kart.def.lag && kart.def.lag[Math.round(f.x) + "," + Math.round(f.y)];
    const djupn = f => lagVed(f) || (f.sete ? f.sete.b.y + f.sete.b.h - 1 : f.seng ? f.seng.b.y + f.seng.b.h - 1 : f.y) + (f.pose && f.pose !== "knele" && f.pose !== "peike" ? 0.02 : 0);
    figurar.sort((a, b) => djupn(a) - djupn(b));
    let klipt = false;                                   // klippet for ein figur i ein gang i muren (sjå under)
    for (const f of figurar) {
      if (klipt) { g.restore(); if (figMaske) fg.restore(); klipt = false; }
      if (f.mur) { const mx = Math.round((f.x + ox) * S), my = Math.round((Math.floor(f.y) + oy) * S) - (f.loft || 6); g.drawImage(f.mur, mx, my); maske(f.mur, mx, my, true); continue; }
      if (f.natur) { const nx = Math.round((f.x + ox) * S) + f.natur.x, ny = Math.round(((f.rad ?? Math.floor(f.y)) + oy) * S) + f.natur.y;
        if (f.natur.slag) { g.save(); g.globalAlpha = 0.28; g.drawImage(skuggeAv(f.natur.img), nx + 4, ny + 3); g.restore(); }
        g.drawImage(f.natur.img, nx, ny); maske(f.natur.img, nx, ny, true);
        if (f.natur.etter) f.natur.etter(g, nx, ny);                   // det som lever oppå (flammane i bålet)
        continue; }
      if (f.haug) { const hx = Math.round((f.x + ox) * S) - 1, hy = Math.round((Math.floor(f.y) + 1 + oy) * S) - f.haug.height; g.drawImage(f.haug, hx, hy); maske(f.haug, hx, hy, true); continue; }
      if (f.over) {
        const [ux, uy, mx, my] = byggPos(f.b, f.bygg, ox, oy);
        if (f.b.tak) kjede(f.b, f.bygg, ux, uy, mx || 0, my || 0, ox, oy);
        g.drawImage(f.bygg, ux, uy); maske(f.bygg, ux, uy, true); continue;
      }
      if (f.bygg && f.b && f.b.flat) { const [fx, fy] = byggPos(f.b, f.bygg, ox, oy); g.drawImage(f.bygg, fx, fy); continue; }
      if (f.bygg) {
        // Slagskugge på bakken, mot høgre og ned (lyset kjem frå oppe til venstre): silhuetten
        // til huset forskoven, men berre nedst ved bakken, så høge ting (tårnet) ikkje kastar
        // ei stripe oppover i graset. Inne fell skuggen berre på golvet, ikkje på sideveggene.
        const bx = Math.round((f.x + ox) * S) - 4 + byggDx(f.b), by = Math.round((f.by + 1 + oy) * S) + (f.b.dy || 0);   // botnrada (ikkje sorteringa, som kan vere lag)
        const sx0 = kart.def.inne ? Math.max(bx, Math.round((1 + ox) * S)) : bx;
        const sx1 = kart.def.inne ? Math.min(bx + f.bygg.width + 8, Math.round((kart.w - 1 + ox) * S)) : bx + f.bygg.width + 8;
        if (f.botn) { g.save(); g.beginPath(); g.rect(sx0, by - 22, sx1 - sx0, 26); g.clip();
          g.globalAlpha = 0.28; g.drawImage(skuggeAv(f.bygg), bx + 4, by - f.bygg.height + 3); g.restore(); }
        // Ei stripe av eit stort møbel: berre biletradene som høyrer til flisrada (stripe [frå, til], null: ope).
        const klipp = f.stripe && (c => { c.save(); c.beginPath(); const y0 = f.stripe[0] == null ? -1e4 : Math.round((f.stripe[0] + oy) * S), y1 = f.stripe[1] == null ? 1e4 : Math.round((f.stripe[1] + oy) * S); c.rect(-1e4, y0, 2e4, y1 - y0); c.clip(); });
        if (klipp) { klipp(g); if (figMaske) klipp(fg); }
        g.drawImage(f.bygg, bx, by - f.bygg.height); maske(f.bygg, bx, by - f.bygg.height, true);
        if (klipp) { g.restore(); if (figMaske) fg.restore(); }
        if (!f.botn) continue;
        for (const r of Pikslar.ILD[f.id] || []) Pikslar.ild(g, bx + r.x, by - f.bygg.height + r.y, r.w, r.h, no, r.glo, Pikslar.ildMaske(f.bygg, r));
        if (dorAnim && f.by === dorAnim.ty) teiknDor(no, ox, oy);
        for (const [rx, ry] of Pikslar.ROYK[f.id] || []) Pikslar.royk(g, bx + rx, by - f.bygg.height + ry, no);
        continue; }
      // Gang inni ein vegg (kart.def.skjult: ["x,y", …], flisa «Ĝ»): muren dekkjer figuren der. Den delen
      // av figuren som er over ei skjult rute (og opp over ho, der hovudet er), blir klipt bort, resten
      // blir teikna som vanleg. Slik glir han inn i muren og ut att, som bak noko som overlappar han,
      // utan å syne over den kvite veggen. Kameraet følgjer han likevel.
      const gang = f.sp && kart.def.skjult ? [Math.floor(f.x), Math.ceil(f.x)].flatMap(gx => [...new Set([Math.floor(f.y), Math.ceil(f.y)])].map(gy => [gx, gy])).filter(([gx, gy], i, a) => kart.def.skjult.includes(gx + "," + gy) && a.findIndex(([x2, y2]) => x2 === gx && y2 === gy) === i) : [];
      if (gang.length) {
        const kdx = hogdVed(f.x, f.y, 1);                // klippet følgjer figuren når han er flytt sidelengs (hogd)
        for (const c of figMaske ? [g, fg] : [g]) {
          c.save(); c.beginPath(); c.rect(0, 0, LW, LH);
          for (const [gx, gy] of gang) { const x0 = Math.round((gx + ox) * S) + kdx, y1 = Math.round((gy + 1 + oy) * S); c.rect(x0, y1 - 3 * S, Math.round((gx + 1 + ox) * S) + kdx - x0, 3 * S); }
          c.clip("evenodd");
        }
        klipt = true;
      }
      // Den som sit på eit sete, blir lyft opp på det (hogd), og setet har sin eigen skugge.
      const sx = Math.round((f.x + ox) * S) + hogdVed(f.x, f.y, 1), sy = Math.round((f.y + oy) * S) + (f.lyft != null ? f.lyft : f.sete ? SITJE_DY[f.dir] - f.sete.s.hogd : 0) - hogdVed(f.x, f.y);
      // I senga (runde 88): liggjeramma spegla, så hovudet ligg på puta, og dyna (den delen av
      // sengebiletet) teikna over kroppen, så berre hovudet stikk ut. Søv han, stig det z.
      if (f.seng && f.sp.rammer) {
        const img = Pikslar.bygg(f.seng.b.id), r = sovehovud(f.sp, f.pose === "liggje"), s = f.seng.s;   // liggje: vaken, med opne auge
        if (img) {
          const [bx, by] = byggPos(f.seng.b, img, ox, oy), [hx, hy] = s.hovud;
          const [k0, kb] = s.klipp || [0, r.width];                      // klipp: berre kolonnane k0 til k0 + kb av hovudet
          g.drawImage(r, k0, 0, kb, r.height, bx + hx, by + hy, kb, r.height); maske(r, bx + hx - k0, by + hy);
          for (const [dx, dy, dw, dh] of s.dyne) g.drawImage(img, dx, dy, dw, dh, bx + dx, by + dy, dw, dh);
          if (f.pose === "sove") teiknZz(g, bx + hx + 12, by + hy - 1, no);
          continue;
        }
      }
      // Eit vesen står midt på flisa med botnen på bakken, og gyng litt opp og ned.
      if (f.sp.vesen) {
        // Med gangark: ramma for retninga og steget (gangrammene lyftar seg sjølv, så ingen gynging).
        const o = f.sp.opp || {}, c = f.sp.gang ? f.sp.gang[f.dir][f.steg] : f.sp.vesen, gy = f.sp.gang || o.stille ? 0 : Math.round((Math.sin(no / 420) + 1) * 0.8);
        if (o.skugge !== false) { g.fillStyle = "rgba(10,5,20,.32)"; g.beginPath(); g.ellipse(sx + 8, sy + 13, Math.max(6, (o.skuggeB || c.width) * 0.42), 3 + (o.skuggeB || c.width) / 40, 0, 0, Math.PI * 2); g.fill(); }
        g.drawImage(c, sx + 8 - Math.round(c.width / 2), sy + 15 - c.height - gy); maske(c, sx + 8 - Math.round(c.width / 2), sy + 15 - c.height - gy);
        continue;
      }
      // Ein pose (knele, sitje, peike) går framfor kjensla. Liggje og sove er ramma for slått ut (24 x 16).
      const pose = f.pose && f.sp.pose && f.sp.pose[f.skuv && f.sp.skuv ? f.skuv : f.pose];   // skuv: sidelengs på benken
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
    if (klipt) { g.restore(); if (figMaske) fg.restore(); }
    if (kart.def.inne) sideveggOver(ox, oy, no);
    // Silhuett av spelaren (eller følgjet) bak eit hus, berre der huset har «silhuett: true» i kartet
    // (til spesielle høve, til dømes ein stad der ein må gå bak noko for å finne ein ting).
    for (const f of figurar) {
      if (!f.sp || (f.sp !== spelar.sprite && !(fylgje && f.sp === fylgje.sprite))) continue;
      const sx = Math.round((f.x + ox) * S), sy = Math.round((f.y + oy) * S) - FOT;
      const bak = (kart.def.bygg || []).some(b => {
        // Inventar som heng over alt (over: true, til dømes galleriet i kyrkja) dekkjer òg den som står framfor.
        const img = Pikslar.bygg(b.id); if (!img || !b.silhuett || (!b.over && f.y >= b.y + b.h - 1)) return false;
        const [bx, by] = byggPos(b, img, ox, oy);
        return sx + 12 > bx + 4 && sx + 4 < bx + img.width - 4 && sy + 22 > by + 4 && sy + 4 < by + img.height;
      });
      if (bak) { g.globalAlpha = 0.4; g.drawImage(f.sp.rammer[f.dir][f.steg], sx, sy); g.globalAlpha = 1; }
    }
    // Forgrunnen (greiner, høgt gras) over alt anna, raskare enn kartet.
    if (kart.def.forgrunn) teiknLag(kart.def.forgrunn, camX, camY, true, no);
    lys(no, ox, oy);
  }

  // Den som søv: to små z som stig opp og blir borte, om att og om att (kvit med mørkt omriss).
  const ZZ = ["####", "..#.", ".#..", "####"];
  /* Veggane i innekarta (runde 90). Bakveggen er to fliser høg: over rad 0 blir veggen teikna éi flis
     til (same tømmer eller mur, og vegg over ei dør i bakveggen), med ei mørk takbjelke øvst. Store
     møblar inntil bakveggen (grua med pipa, senga, hylla, skatollet og golvuret) står då framfor veggen
     og går opp mot han, ikkje over han ut i tomrommet. Sideveggane og veggen nedst (sett ovanfrå) blir
     teikna att over møblane, så eit møbel inntil sideveggen ikkje dekkjer han. Gjeld kart med inne og
     veggar av tømmer (X) eller mur (c); kyrkja har sine eigne veggar (G og inventar). */
  const VEGG = "Xc";
  const veggTopp = (x, y) => {
    const c = kart.fliser[y][x], under = y + 1 < kart.h ? kart.fliser[y + 1][x] : null;
    return VEGG.includes(c) && (under === null || "XcGEØøÖöĜ ".includes(under));
  };
  function bakveggOver(ox, oy, no) {
    if (![...kart.fliser[0]].some((c, x) => VEGG.includes(c) && !veggTopp(x, 0))) return;   // ingen bakvegg (tårnet)
    const sy = Math.round((oy - 1) * S);
    for (let x = 0; x < kart.w; x++) {
      const c = kart.fliser[0][x];
      if (!VEGG.includes(c) && c !== "E") continue;
      const sx = Math.round((x + ox) * S), fk = c === "E" ? "X" : veggTopp(x, 0) ? c + "t" : c;
      g.drawImage(Pikslar.flis(fk, no, x, -1, kart.def.golv), sx, sy);
      if (fk === "X" || fk === "c") { g.fillStyle = "#140c10"; g.fillRect(sx, sy, S, 2); g.fillStyle = "#2a1a1c"; g.fillRect(sx, sy + 2, S, 1); }   // takbjelka
    }
  }
  function sideveggOver(ox, oy, no) {
    const x0 = Math.max(0, Math.floor(-ox) - 1), y0 = Math.max(0, Math.floor(-oy) - 1);
    for (let y = y0; y < Math.min(kart.h, y0 + VH + 3); y++) for (let x = x0; x < Math.min(kart.w, x0 + VW + 3); x++) {
      if (!veggTopp(x, y)) continue;
      g.drawImage(Pikslar.flis(kart.fliser[y][x] + "t", no, x, y, kart.def.golv), Math.round((x + ox) * S), Math.round((y + oy) * S));
    }
  }
  /* Den sovande ramma i senga (runde 89, som i FF6): hovudet frå ramma der figuren står og ser ned
     (rad 0 til 10), med lukka auge. Rada med augekvitt blir hud (augeloket), og irisen i rada under
     blir ein mørk strek (augevippene på det lukka auget). Laga éin gong per figur. */
  const sovCache = new WeakMap();
  const vakenCache = new WeakMap();
  function sovehovud(sp, vaken) {
    const cache = vaken ? vakenCache : sovCache;
    if (cache.has(sp)) return cache.get(sp);
    const kj = sp.rammer[0][0], c = document.createElement("canvas"); c.width = 16; c.height = 11;
    const cg = c.getContext("2d"); cg.drawImage(kj, 0, 0);
    if (vaken) { vakenCache.set(sp, c); return c; }                     // vaken i senga: opne auge
    const d = cg.getImageData(0, 0, 16, 11), p = d.data, ix = (x, y) => (y * 16 + x) * 4;
    const rgb = (x, y) => [p[ix(x, y)], p[ix(x, y) + 1], p[ix(x, y) + 2], p[ix(x, y) + 3]];
    const kvit = ([r, g, b, a]) => a && r > 215 && g > 215 && b > 200 && Math.max(r, g, b) - Math.min(r, g, b) < 40;
    const hud = ([r, g, b, a]) => a && r > 180 && r > g && g > b && r - b > 40;
    const set = (x, y, [r, g, b]) => { p[ix(x, y)] = r; p[ix(x, y) + 1] = g; p[ix(x, y) + 2] = b; };
    let mork = [255, 255, 255];                                         // den mørkaste fargen i hovudet utanom omrisset
    for (let y = 0; y < 11; y++) for (let x = 0; x < 16; x++) { const q = rgb(x, y); if (q[3] && q[0] + q[1] + q[2] > 80 && q[0] + q[1] + q[2] < mork[0] + mork[1] + mork[2]) mork = q; }
    for (let y = 4; y < 10; y++) {
      const kvitt = [...Array(16).keys()].filter(x => kvit(rgb(x, y)));
      if (!kvitt.length) continue;
      const hudar = [...Array(16).keys()].map(x => rgb(x, y)).filter(hud);
      const hf = hudar[Math.floor(hudar.length / 2)] || [230, 168, 120];
      const iris = new Set();
      for (const x of kvitt) for (const nx of [x - 1, x + 1]) { const q = rgb(nx, y); if (q[3] && !kvit(q) && !hud(q) && q[0] + q[1] + q[2] > 60) iris.add(q.slice(0, 3).join()); }
      // Auget (kvitt og iris i rada) blir hud, og under det blir augeloket ein strek like brei som auget.
      const auge = [...Array(16).keys()].filter(x => { const q = rgb(x, y); return kvit(q) || iris.has(q.slice(0, 3).join()); });
      for (let x = 0; x < 16; x++) { const q = rgb(x, y + 1); if (iris.has(q.slice(0, 3).join())) set(x, y + 1, hf); }
      for (const x of auge) { set(x, y, hf); set(x, y + 1, mork); }
      break;
    }
    cg.putImageData(d, 0, 0);
    sovCache.set(sp, c);
    return c;
  }
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
  /* Merke i teksten (sjå README.md, «Skrift og tekst i manus»):
       ⟪ord⟫      ord Ivar lærer (gull)
       ⟨tekst⟩    norrøn tale (eigen farge; dei norrøne bokstavane er i Spelskrift)
       ⟦ᚱᚢᚾᛅᛦ⟧    runer i Runeskrift (raud oker)
     teiknAv() deler teksten i teikn med klassane o, n og r. */
  const MERKE = { "⟪": "o", "⟨": "n", "⟦": "r" }, MERKE_SLUTT = { "⟫": "o", "⟩": "n", "⟧": "r" };
  function teiknAv(tekst, grunn) {
    const ut = [], open = new Set(grunn ? [grunn] : []);
    for (const c of tekst) {
      if (MERKE[c]) { open.add(MERKE[c]); continue; }
      if (MERKE_SLUTT[c]) { open.delete(MERKE_SLUTT[c]); continue; }
      ut.push({ c, k: [...open].join(" ") });
    }
    return ut;
  }
  // Tekst med merke som HTML (val, forteljing, nærbilete): rpg-ord, rpg-nor og rpg-run.
  const MERKE_KLASSE = { o: "rpg-ord", n: "rpg-nor", r: "rpg-run" };
  function merkHtml(tekst) {
    return teiknAv(String(tekst)).reduce((ut, t, i, a) => {
      const k = t.k && t.k.split(" ").map(x => MERKE_KLASSE[x]).join(" ");
      const forrige = i && a[i - 1].k;
      if (t.k !== forrige && forrige) ut += "</span>";
      if (t.k !== forrige && t.k) ut += `<span class="${k}">`;
      ut += E(t.c);
      if (i === a.length - 1 && t.k) ut += "</span>";
      return ut;
    }, "");
  }
  // Samtaleboksen har plass til TALE_LINER liner (Motor.tilpass gir han fast høgd). Heile replikken
  // blir lagd ut med kvart teikn i eit span, usynleg (.u) til skrivemaskina kjem dit, så ingen
  // ord hoppar til neste line undervegs. Ein replikk med fleire liner blir delt i sider.
  const TALE_LINER = 4;
  function sidestart(sp) {
    const linjer = []; let forrige = -Infinity;
    sp.forEach((s, j) => { if (s.offsetTop > forrige + 2) { linjer.push(j); forrige = s.offsetTop; } });
    const ut = [];
    for (let l = 0; l < linjer.length; l += TALE_LINER) ut.push(linjer[l]);
    return ut.length ? ut : [0];
  }
  // opt.norront: heile replikken er norrøn tale (sjå norront: true i manus).
  function tale(tekst, namn, kjensle, opt = {}) {
    return new Promise(res => {
      let sp = [], start = [0], side = 0, i = 0, slutt = 0, ferdig = false, skriv = null, slepp = null;
      const ferdigSide = () => { clearInterval(skriv); for (; i < slutt; i++) sp[i].classList.remove("u"); ferdig = true; boks.classList.add("klar"); };
      const visSide = () => {
        i = start[side]; slutt = side + 1 < start.length ? start[side + 1] : sp.length;
        for (let j = 0; j < i; j++) sp[j].classList.add("s");
        ferdig = false; boks.classList.remove("klar");
        clearInterval(skriv);
        skriv = setInterval(() => { const til = Math.min(slutt, i + 2); for (; i < til; i++) sp[i].classList.remove("u"); if (i >= slutt) ferdigSide(); }, 16);
      };
      const opne = () => {
        boks.hidden = false; boks.classList.remove("med-val", "klar");
        boksNamn.textContent = namn || "";
        boksNamn.hidden = !namn;
        visPortrett(namn, kjensle);
        boksTekst.innerHTML = teiknAv(String(tekst), opt.norront ? "n" : "").map(t => `<span class="u${t.k ? " " + t.k : ""}">${E(t.c)}</span>`).join("");
        sp = [...boksTekst.children];
        start = sidestart(sp);
        boks.onclick = () => paaTrykk && paaTrykk.a && paaTrykk.a();
        visSide();
      };
      // Skrifta må vere lasta før lina blir broten (elles blir sidene rekna med ei anna skrift).
      const klar = document.fonts && document.fonts.load ? document.fonts.load('16px "Spelskrift"').catch(() => {}) : Promise.resolve();
      klar.then(opne);
      slepp = lytt({
        a: () => {
          if (!sp.length) return;
          if (!ferdig) return ferdigSide();
          if (side + 1 < start.length) { side++; visSide(); return; }
          clearInterval(skriv); slepp(); boks.hidden = true; res();
        },
      });
    });
  }
  // Val mellom alternativ i samtaleboksen. Gir indeksen.
  function val(tekst, alt, namn) {
    return new Promise(res => {
      boks.hidden = false; boks.classList.add("med-val");
      boksNamn.textContent = namn || ""; boksNamn.hidden = !namn; visPortrett(namn);
      boksTekst.innerHTML = `${merkHtml(tekst)}<span class="rpg-val">${alt.map((a, i) => `<button type="button" data-i="${i}">${merkHtml(a)}</button>`).join("")}</span>`;
      boks.classList.add("klar");
      let valt = 0;
      const kn = [...boksTekst.querySelectorAll("button")];
      const merk = () => kn.forEach((b, i) => b.classList.toggle("peikar", i === valt));
      merk();
      let svart = false;                                   // eit val blir berre svara éin gong
      const ferdig = i => { if (svart) return; svart = true; slepp(); boks.hidden = true; boks.classList.remove("med-val"); boksTekst.innerHTML = ""; boks.onclick = null; res(i); };
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
        p.innerHTML = merkHtml(linjer[i++]);
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
    tilpassUI(k, dpr);
  }
  /* Skrift og vindauge (css/rpg.css): --fp er éin piksel i Spelskrift, eit heilt tal skjermpikslar
     (om lag 2 CSS-pikslar, eller 2/3 av spelpikselen på store skjermar), og --kp éin piksel i
     portrettet. Vindauga får stad og storleik i heile skjermpikslar, så kantane blir skarpe:
     menyen og kampen dekkjer lerretet (--lx, --ly, --lb, --lh), og samtaleboksen står nedst på
     lerretet med fast storleik (namnelina og TALE_LINER liner, eller portrettet). */
  function tilpassUI(k, dpr) {
    const rot = $("rpg-skjerm"), smal = matchMedia("(pointer: coarse), (max-width: 760px)").matches;
    const n = Math.max(1, Math.round((smal ? 1.6 : 2) * dpr), Math.round(k * 2 / 3));
    const kp = smal ? n : n + Math.floor(n / 2);
    const r = lerret.getBoundingClientRect(), rr = rot.getBoundingClientRect();
    const lx = Math.round((r.left - rr.left) * dpr), ly = Math.round((r.top - rr.top) * dpr);
    const lb = Math.round(r.width * dpr), lh = Math.round(r.height * dpr), m = 4 * n;
    const innhald = Math.max(15 * n * (TALE_LINER + 1), 48 * kp);
    const th = 16 * n + innhald, tb = Math.min(lb - 2 * m, 48 * kp + 330 * n);
    const tx = lx + Math.round((lb - tb) / 2), ty = ly + lh - m - th;
    const px = v => `${v / dpr}px`, s = rot.style;
    s.setProperty("--fp", px(n)); s.setProperty("--kp", px(kp)); s.setProperty("--np", px(kp));
    s.setProperty("--lx", px(lx)); s.setProperty("--ly", px(ly)); s.setProperty("--lb", px(lb)); s.setProperty("--lh", px(lh));
    s.setProperty("--tale-x", px(tx)); s.setProperty("--tale-y", px(ty)); s.setProperty("--tale-b", px(tb)); s.setProperty("--tale-h", px(th));
    s.setProperty("--tale-botn", px(Math.round(rr.height * dpr) - ty - th));
    const skugge = document.getElementById("skarp-skugge");       // skuggen i filteret #skarp: éin skriftpiksel
    if (skugge) { skugge.setAttribute("dx", n / dpr); skugge.setAttribute("dy", n / dpr); }
    snappAlle();
  }
  // Vindauge som blir midtstilte (translate(-50%), flex, fr i grid), kan hamne på ein halv
  // skjermpiksel, og då blir teksten uskarp. snapp() flyttar dei til næraste heile skjermpiksel.
  // Dei blir sjekka når dei kjem til, endrar storleik eller noko anna i skjermen endrar seg.
  const SNAPP = ".kamp-sporsmal, .kamp-melding, .kamp-hint, .kamp-vindauge, .rpg-stadnamn, .rpg-kort, .fv-tekst, .rpg-naer img, .rpg-fort p, .rpg-tittel > *, .rpg-verd-panel";
  function snapp(el) {
    const dpr = window.devicePixelRatio || 1;
    el.style.translate = "";
    const r = el.getBoundingClientRect();
    const dx = Math.round(r.left * dpr) / dpr - r.left, dy = Math.round(r.top * dpr) / dpr - r.top;
    if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) el.style.translate = `${dx}px ${dy}px`;
  }
  let snappVentar = false;
  function snappAlle() {
    if (snappVentar) return;
    snappVentar = true;
    requestAnimationFrame(() => { snappVentar = false; document.querySelectorAll(SNAPP).forEach(el => { if (!el.hidden) snapp(el); }); });
  }
  if (window.MutationObserver) new MutationObserver(snappAlle).observe($("rpg-skjerm"), { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden", "class"] });
  window.addEventListener("resize", tilpass);

  return {
    VW, VH, lerret, g, krokar, last, tale, val, fort, lytt, tilpass, fjernFolk, overgang, gjennomDor, tonUt, tonInn, scene,
    gaa, snu, inn, byt, brukMoebel, reis, kamera, rist, kort, naerbilete, blink, tone, spot, aktor, vent,
    get lysMs() { return lysMs; }, get lysLesMs() { return lesMs; },  // tida lyset brukte i siste bilete
    get lysEffekt() { return effekt; },                               // toning, blink og spotlight (for testane)
    spelarVis, figurVis, seteVed, sengVed,                                    // korleis spelaren blir teikna, sete og senger (for testane)
    // Retningane spelaren kan reise seg og gå ut av setet eller senga han er på (for testane).
    utvegar: () => [0, 1, 2, 3].filter(d => { const nx = spelar.x + DX[d], ny = spelar.y + DY[d], st = seteVed(spelar.x, spelar.y), sg = sengVed(spelar.x, spelar.y);
      if ((st && (seteVed(nx, ny) || {}).b === st.b) || (sg && (sengVed(nx, ny) || {}).b === sg.b)) return false;
      return kanReiseSeg(d) && (kanGaa(nx, ny) || kanSitjeInn(nx, ny, d)); }),
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
        const forPose = spelar.pose;
        spelar.pose = p; if (fylgje) fylgje.pose = p;
        if (!p && kart && !spelar.flytt) setjeSeg(spelar, null, forPose === "liggje" ? "liggje" : "sove");   // på eit sete blir spelaren sitjande, i senga liggjande
        if (kart) kart.folk.forEach(f => {
          // Folk som sit på eit sete eller ligg i ei seng (scenesteg sitje, liggje), blir der.
          const ny = p || f.grunnpose || (seteVed(f.x, f.y) && Pikslar.FAST.has(kart.fliser[f.y][f.x]) ? "sitje" : sengVed(f.x, f.y) && Pikslar.FAST.has(kart.fliser[f.y][f.x]) ? (f.pose === "liggje" ? "liggje" : "sove") : null);
          if (f.pose !== ny) f.neste = performance.now() + 2000;
          f.pose = ny;
        });
        return;
      }
      const a = aktor(kven);
      if (!a) return;
      if ((p === "sitje" || p === "sove" || p === "liggje") && (seteVed(a.x, a.y) || sengVed(a.x, a.y))) setjeSeg(a, null, p === "liggje" ? "liggje" : "sove");   // set seg rett på stolen, legg seg i senga
      a.pose = p;
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
