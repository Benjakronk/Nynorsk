/* Opningssekvensen: lastinga, logoen, tittelen og startsida.

   Grafikken er henta frå fullversjonen (bilete/spel/ui/opning-*.png, laga med
   tools/pikselkunst/opning.py i Aasen-spelet). Prototypen har «demo» som undertittel:
   pennen skriv «Nordmanden», strekar over og skriv «demo» under.

   1. Lastinga: blekkhuset fyllest medan grafikken blir lasta, så «Trykk ein tast».
      Tastetrykket opnar lyden. Leddet blir hoppa over om spelet har starta før i same økta.
   2. Logoen: eit fotavtrykk i gull (etter eit babyfotavtrykk på ein kopp) og «Lektor Ensrud presenterer».
   3. Tittelen: ein blekkdrope blir til AASEN, og undertittelen blir gull på mørk fiolett.
   4. Startsida: logotypen og «demo» i gull, nokre stjerner, og menyen frå spel.js over.

   Z, Enter, mellomrom eller X hoppar frå logoen til tittelen og frå tittelen til startsida.
   Står startsida urørd i eitt minutt, blir tittelen spela på nytt.
   Alt blir teikna på eit eige lerret på 320 × 192 over spelet, med same skalering. */
(() => {
  const W = 320, H = 192;
  const TEST = /[?&]test=1/.test(location.search);
  const NATT = "#0a0514", FIOLETT = "#1a1238";
  const LW = 176, LH = 40, HW = 96, HH = 24;                 // logotypen og handskrifta
  const LX = (W - LW) / 2, HX = (W - HW) / 2;
  const TITTEL_Y = 40, ORD_Y = 84, NY_Y = 106;               // under tittelen
  const START_LOGO = 16, START_ORD = 56;                     // på startsida
  const VERSJON = "demo 0.1";
  // Bokstavane i opning-namn.png: [ord, x0, y0, x1, y1] (ord 0 Lektor, 1 Ensrud, 2 presenterer)
  const BOKSTAVAR = [[0,9,2,20,21],[0,19,2,32,21],[0,31,2,42,21],[0,41,2,52,21],[0,51,2,64,21],[0,63,2,74,21],
    [1,73,2,94,21],[1,93,2,106,21],[1,105,2,118,21],[1,117,2,128,21],[1,127,2,140,21],[1,139,2,152,21],
    [2,49,28,55,40],[2,54,28,60,40],[2,59,28,66,40],[2,65,28,72,40],[2,71,28,78,40],[2,77,28,84,40],[2,83,28,89,40],
    [2,88,28,95,40],[2,94,28,100,40],[2,99,28,106,40],[2,105,28,111,40]];
  // Kor orda står i rutene sine på 96 × 24 (x0, x1), så pennen byrjar og sluttar der blekket er.
  const SPENN = { nordmanden: [5, 90], strek: [2, 94], demo: [29, 66] };
  const STJERNER = [[24, 22], [52, 70], [36, 128], [276, 18], [298, 64], [262, 112], [18, 96], [300, 146], [120, 8], [214, 6]];

  const lerret = document.createElement("canvas");
  lerret.width = W; lerret.height = H; lerret.className = "rpg-opning"; lerret.hidden = true;
  document.getElementById("rpg-skjerm").appendChild(lerret);
  const g = lerret.getContext("2d");
  g.imageSmoothingEnabled = false;
  const lyd = id => window.Lyd && Lyd.sfx(id);

  const B = {};
  const NAMN = ["blekkhus", "fot", "namn", "papir", "drope", "sproyt", "samandrag", "logo", "nordmanden", "strek", "demo", "penn", "stjerne"];
  const bileta = Promise.all(NAMN.map(n => new Promise(ok => {
    const im = new Image(); im.onload = im.onerror = () => ok(); im.src = `bilete/spel/ui/opning-${n}.png`; B[n] = im;
  })));

  // Ramme f frå eit ark med rammer side om side; kl er kor mange pikslar frå venstre som synest.
  function ramme(n, w, f, x, y, kl = w) {
    const im = B[n]; if (!im.width || kl <= 0) return;
    g.drawImage(im, f * w, 0, kl, im.height, Math.round(x), Math.round(y), kl, im.height);
  }

  // Spelskrift med harde pikslar: canvas glattar kantane, så alfa blir 0 eller 1 etterpå.
  const tekstar = {};
  function tekst(t, farge) {
    const k = t + farge;
    if (tekstar[k]) return tekstar[k];
    const c = document.createElement("canvas"), x = c.getContext("2d");
    x.font = '16px "Spelskrift"'; c.width = Math.ceil(x.measureText(t).width) + 2; c.height = 16;
    x.font = '16px "Spelskrift"'; x.textBaseline = "top"; x.fillStyle = farge; x.fillText(t, 0, 0);
    const d = x.getImageData(0, 0, c.width, c.height);
    for (let i = 3; i < d.data.length; i += 4) d.data[i] = d.data[i] >= 128 ? 255 : 0;
    x.putImageData(d, 0, 0);
    return (tekstar[k] = c);
  }

  /* ---------- Biletgangen: éin teiknefunksjon per ledd, og vent(n) ventar n bilete ---------- */
  let teikn = null, ton = 16, tonFarge = "#000", bilete = 0;
  let ventar = [];
  const HOPP = {};
  function vent(n) { return new Promise((ok, feil) => ventar.push({ n, ok, feil })); }
  function hopp() { const v = ventar; ventar = []; v.forEach(w => w.feil(HOPP)); }
  async function tonInn(farge = "#000") { tonFarge = farge; for (let l = 0; l <= 16; l++) { ton = l; await vent(2); } }
  async function tonUt(farge = "#000") { tonFarge = farge; for (let l = 16; l >= 0; l--) { ton = l; await vent(2); } }
  function loop() {
    requestAnimationFrame(loop);
    if (lerret.hidden) return;
    const m = window.Motor && Motor.lerret;
    if (m && m.style.width && lerret.style.width !== m.style.width) { lerret.style.width = m.style.width; lerret.style.height = m.style.height; }
    bilete++;
    if (teikn) teikn();
    if (ton < 16) { g.globalAlpha = 1 - ton / 16; g.fillStyle = tonFarge; g.fillRect(0, 0, W, H); g.globalAlpha = 1; }
    for (const v of ventar.slice()) if (--v.n <= 0) { ventar.splice(ventar.indexOf(v), 1); v.ok(); }
  }
  requestAnimationFrame(loop);

  // Tastane: hoppVed er leddet som kan hoppast over no; svelg stoppar tastane frå å nå menyen bak.
  let hoppVed = null, svelg = false, tastVentar = null, sistRort = performance.now();
  window.addEventListener("keydown", e => {
    sistRort = performance.now();
    if (tastVentar) { const t = tastVentar; tastVentar = null; t(); }
    else if (hoppVed && ["z", "Z", "x", "X", "Enter", " "].includes(e.key)) { e.preventDefault(); hopp(); }
    if (svelg) { e.stopImmediatePropagation(); e.preventDefault(); }
  }, true);
  window.addEventListener("pointerdown", () => { sistRort = performance.now(); if (tastVentar) { const t = tastVentar; tastVentar = null; t(); } }, true);

  /* ---------- 1. Lastinga ---------- */
  async function lasting(lastar) {
    let ferdig = false, steg = 0;
    lastar.then(() => { ferdig = true; });
    teikn = () => {
      g.fillStyle = NATT; g.fillRect(0, 0, W, H);
      ramme("blekkhus", 16, steg, (W - 16) / 2, 80);
      if (ferdig && steg === 4 && (bilete >> 5) % 2 === 0) { const t = tekst("Trykk ein tast", "#cfd4ff"); g.drawImage(t, Math.round((W - t.width) / 2), 104); }
    };
    ton = 16;
    while (!ferdig) { await vent(12); if (steg < 3) steg++; }
    while (steg < 4) { steg++; await vent(6); }
    await new Promise(ok => { tastVentar = ok; });
  }

  /* ---------- 2. Logoen ---------- */
  // Fotavtrykket blir trykt ned i gull, namnet kjem fram bokstav for bokstav, og ein glans går over gullet.
  async function logo() {
    const FX = (W - 64) / 2, FY = 22, NX = (W - 160) / 2, NY = 124;
    let fot = -1, skrive = 0, del = 0;
    teikn = () => {
      g.fillStyle = "#000"; g.fillRect(0, 0, W, H);
      if (fot >= 0) ramme("fot", 64, fot, FX, FY);
      BOKSTAVAR.forEach(([, x0, y0, x1, y1], i) => {
        const h = i < skrive ? y1 - y0 : i === skrive ? Math.round((y1 - y0) * del / 2) : 0;
        if (h > 0) g.drawImage(B.namn, x0, y0, x1 - x0, h, NX + x0, NY + y0, x1 - x0, h);
      });
    };
    await vent(20);
    for (fot = 0; fot < 3; fot++) await vent(4);                         // foten på veg ned
    fot = 3;
    await vent(24);
    for (skrive = 0; skrive < BOKSTAVAR.length; skrive++) for (del = 1; del <= 2; del++) await vent(2);
    await vent(16);
    for (fot = 4; fot < 8; fot++) await vent(4);                         // glansen over gullet
    fot = 3;
    await vent(60);
    await tonUt();
  }

  /* ---------- 3. Tittelen og 4. startsida ---------- */
  const T = {};                     // det som står på sida no
  function nullstill() {
    Object.assign(T, { lilla: 0, drope: null, sproyt: null, samandrag: null, logo: null, logoY: TITTEL_Y,
      nord: null, strek: null, demo: null, demoY: NY_Y, penn: null });
  }
  function teiknSida() {
    g.drawImage(B.papir, 0, 0);
    if (T.lilla) { g.globalAlpha = T.lilla / 16; g.fillStyle = FIOLETT; g.fillRect(0, 0, W, H); g.globalAlpha = 1; }
    if (T.drope) ramme("drope", 8, T.drope.f, W / 2 - 4, T.drope.y);
    if (T.sproyt != null) ramme("sproyt", LW, T.sproyt, LX, TITTEL_Y);
    if (T.samandrag != null) ramme("samandrag", LW, T.samandrag, LX, TITTEL_Y);
    if (T.logo != null) ramme("logo", LW, T.logo, LX, T.logoY);
    if (T.nord) ramme("nordmanden", HW, T.nord.f, HX, ORD_Y, T.nord.kl);
    if (T.strek) ramme("strek", HW, 0, HX, ORD_Y, T.strek.kl);
    if (T.demo) ramme("demo", HW, T.demo.f, HX, T.demoY, T.demo.kl);
    if (T.penn) g.drawImage(B.penn, Math.round(T.penn.x), Math.round(T.penn.y - 19));
  }
  // Pennen skriv fram eit ord frå venstre: klipperuta veks fart pikslar per bilete, og pennen følgjer kanten.
  async function skriv(obj, spenn, y, fart, bolgje = 3) {
    const [x0, x1] = spenn;
    for (let kl = x0; kl <= x1; kl += fart) {
      obj.kl = kl;
      T.penn = { x: HX + kl, y: y + 14 + Math.round(Math.sin(kl * 0.9) * bolgje) };
      await vent(1);
    }
    obj.kl = HW; T.penn = null;
  }

  async function tittel() {
    nullstill();
    teikn = teiknSida;
    await tonInn();
    await vent(20);
    T.drope = { f: 0, y: -12 };                                          // dropen fell mot midten av sida
    while (T.drope.y < TITTEL_Y + 8) { T.drope.y += 4; if (T.drope.y > TITTEL_Y - 4) T.drope.f = 1; await vent(1); }
    T.drope = null;
    lyd("opning.drope"); if (window.Lyd) Lyd.musikk("tittel");
    for (const [f, n] of [[0, 4], [1, 5], [2, 40], [3, 6], [2, 24]]) { T.sproyt = f; await vent(n); }
    T.sproyt = null;
    for (let f = 0; f < 4; f++) { T.samandrag = f; await vent(5); }
    T.samandrag = null; T.logo = 0;
    await vent(30);
    T.nord = { f: 0, kl: 0 }; lyd("opning.penn");
    await skriv(T.nord, SPENN.nordmanden, ORD_Y, 1.5);
    await vent(15);
    T.strek = { kl: 0 }; lyd("opning.strek");
    await skriv(T.strek, SPENN.strek, ORD_Y - 2, 12, 0);
    T.nord.f = 1; T.strek = null;
    await vent(15);
    T.demo = { f: 0, kl: 0 }; T.demoY = NY_Y; lyd("opning.penn");
    await skriv(T.demo, SPENN.demo, NY_Y, 1.2);
    await vent(20);
    for (const f of [2, 3, 4]) { T.nord.f = f; await vent(8); }          // det overstrokne ordet søkk inn i papiret
    T.nord = null;
    while (T.demoY > ORD_Y) { T.demoY--; await vent(1); }                // «demo» glir opp på plassen sin
    await vent(40);
    // Blekket tørkar: papiret toner til fiolett, bokstavane blir gull og glir opp éin piksel per bilete.
    for (let t = 0; t <= 32 || T.logoY > START_LOGO || T.demoY > START_ORD; t++) {
      T.lilla = Math.min(16, t >> 1);
      T.logo = Math.min(4, t >> 3); T.demo.f = T.logo;
      if (T.logoY > START_LOGO) T.logoY--;
      if (T.demoY > START_ORD) T.demoY--;
      await vent(1);
    }
  }

  // Startsida: berre fiolett, logotypen og «demo» i gull, stjerner (aldri meir enn to om gongen) og linene nedst.
  const blink = [];
  function teiknStart() {
    g.fillStyle = FIOLETT; g.fillRect(0, 0, W, H);
    for (let i = blink.length - 1; i >= 0; i--) {
      const s = blink[i], f = [0, 1, 2, 1, 0][Math.floor(s.t++ / 6)];
      if (f == null) { blink.splice(i, 1); continue; }
      ramme("stjerne", 5, f, s.x - 2, s.y - 2);
    }
    if (blink.length < 2 && Math.random() < 1 / 90) {
      const [x, y] = STJERNER[Math.floor(Math.random() * STJERNER.length)];
      if (!blink.some(s => s.x === x && s.y === y)) blink.push({ x, y, t: 0 });
    }
    ramme("logo", LW, 4, LX, START_LOGO);
    ramme("demo", HW, 4, HX, START_ORD);
    const hjelp = tekst("Piltastar: gå · Z: vel · X: tilbake · M: lyd", "#8890c0");
    g.drawImage(hjelp, Math.round((W - hjelp.width) / 2), 164);
    const c = tekst("© 2026 Lektor Ensrud", "#8890c0"), v = tekst(VERSJON, "#8890c0");
    g.drawImage(c, 6, 178); g.drawImage(v, W - 6 - v.width, 178);
  }
  function startside() {
    teikn = teiknStart; ton = 16;
    if (window.Lyd) Lyd.musikk("tittel");
  }

  // Køyrer eit ledd som kan hoppast over med tastane. Tastane når ikkje resten av spelet så lenge.
  async function ledd(fn) {
    const for_ = svelg;
    hoppVed = fn; svelg = true;
    try { await fn(); } catch (e) { if (e !== HOPP) throw e; }
    hoppVed = null; svelg = for_;
  }

  let paaStartsida = null, tomgang = null;
  window.Opning = {
    // Heile sekvensen fram til startsida. lastar er lovnaden om at grafikken til spelet er lasta.
    async start(lastar) {
      lerret.hidden = false;
      const alt = Promise.all([lastar, bileta, document.fonts ? document.fonts.load('16px "Spelskrift"').catch(() => {}) : null]);
      if (TEST && !/[?&]opning=1/.test(location.search)) { await alt; startside(); return; }   // ?opning=1: heile sekvensen i testane
      let sett = false;
      try { sett = sessionStorage.getItem("aasen-demo-opning") === "ja"; sessionStorage.setItem("aasen-demo-opning", "ja"); } catch (e) { }
      if (!sett) await lasting(alt); else await alt;
      await ledd(logo);
      ton = 0;
      await ledd(tittel);
      startside();
    },
    // Startsida bak menyen (el). Står ho urørd i eitt minutt, blir tittelen spela på nytt utan menyen.
    vis(el) {
      lerret.hidden = false; paaStartsida = el; startside(); sistRort = performance.now();
      clearInterval(tomgang);
      tomgang = setInterval(async () => {
        if (TEST || !paaStartsida || svelg || performance.now() - sistRort < 60000) return;
        svelg = true; el.hidden = true;
        try { await tonUt(); } catch (e) { }
        ton = 0;
        await ledd(tittel);
        startside(); svelg = false; sistRort = performance.now();
        if (paaStartsida) el.hidden = false;
      }, 1000);
    },
    gjoym() { paaStartsida = null; clearInterval(tomgang); lerret.hidden = true; },
  };
})();
