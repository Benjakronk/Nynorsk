/* «Aasen: Språkvandringa»: eit rollespel om Ivar Aasen (spel.html).

   Denne fila held saman resten: tilstanden og lagringa, tittelskjermen,
   manus (samtalar og hendingar frå js/rpg/data.js), orda Ivar samlar,
   menyen med ordboka, nivå og røynsle, butikkar, gåver frå kurset og
   verdskartet (3D-kartet frå «Reisene til Ivar Aasen», js/kart3d.js),
   som blir teke i bruk frå kapittel 2.

   Modus: «tittel», «felt» (js/rpg/motor.js), «kamp» (js/rpg/kamp.js) og
   «verd» (verdskartet). Spelet har sin eigen lagringsnøkkel, så det kan
   nullstillast utan å røre framdrifta i kurset. */
(function () {
  "use strict";
  const D = RPGData, E = Motor.E;
  const $ = id => document.getElementById(id);
  const NOKKEL = "nynorskkurs:rpg:v2";
  let modus = "tittel";

  /* ---------- Tilstand ---------- */
  const ny = () => ({
    kart: "asen-stova", merke: "1", flagg: {}, opne: [], stad: "aasen",
    parti: [{ id: "ivar", niva: 1, xp: 0, hp: null, rost: null }],
    ting: { flatbrod: 1 }, nokkel: [], pengar: 0, opna: [], kapittel: 1,
    ord: {},          // { id: { former: { form: { stad, kven } } } }
    vesen: {},        // { id: { sett, slegne } }
    huldra: { skrive: 0 },
    avdekt: {},       // kart der gøymde ting er funne
    stev: [],         // stev Ivar har lært
    scener: {},       // scener som er spela: { id: true }
    val: {},          // val som skal hugsast: { id: indeks }
    traadar: {},      // forteljartrådar: { id: { tekst, opna: kapittel, lukka } }
    dagbok: [],       // [{ tekst, stad, kapittel }]
    obSett: [],       // ord Ivar har sett på i Ordboka (dei andre er merkte «ny»)
    obSortering: "alfabetisk",   // alfabetisk, lært eller lydfamilie (Q byter i Ordboka)
  });
  let st = ny();
  const lagra = () => { try { return JSON.parse(localStorage.getItem(NOKKEL) || "null"); } catch (e) { return null; } };
  // På eit scenekart (ein draum, eit minne) blir staden før scena lagra.
  function lagre() {
    if (forScene) { st.kart = forScene.kart; st.pos = { x: forScene.x, y: forScene.y, dir: forScene.dir }; }
    else {
      st.kart = Motor.kart ? Motor.kart.id : st.kart;
      st.pos = Motor.spelar ? { x: Motor.spelar.x, y: Motor.spelar.y, dir: Motor.spelar.dir } : null;
    }
    if (st.pos && D.KART[st.kart]) st.pos.h = D.KART[st.kart].rader.length;   // høgda på kartet (sjå nyeRader)
    try { localStorage.setItem(NOKKEL, JSON.stringify(st)); return true; } catch (e) { return false; }
  }

  /* ---------- Gåver frå kurset ---------- */
  function gaaver() {
    const ut = {};
    for (const gv of D.GAAVER) ut[gv.id] = typeof Store !== "undefined" && gv.modular.some(id => Store.getModule(id).completed);
    return ut;
  }

  /* ---------- Partiet ---------- */
  const xpNeste = n => Math.round(16 * Math.pow(n, 1.5));
  const ordtal = () => Object.keys(st.ord).length;
  // Huldra blir veikare for kvart ord Ivar skriv ned etter henne.
  const huldrekraft = () => Math.max(0.5, 1 - 0.12 * st.huldra.skrive);
  function stat(m) {
    const b = D.PARTI[m.id], v = b.vekst, n = m.niva - 1, gv = gaaver();
    const k = m.id === "huldra" ? huldrekraft() : 1;
    return {
      maxhp: Math.round((b.hp + v.hp * n) * k + (m.id === "ivar" && gv.heimbygda ? 15 : 0)),
      maxrost: Math.round(b.rost + v.rost * n + (m.id === "ivar" ? Math.floor(ordtal() / 4) : 0)),
      atk: Math.round((b.atk + v.atk * n) * k * 10) / 10, def: Math.round((b.def + v.def * n) * k * 10) / 10, spd: b.spd + v.spd * n,
    };
  }
  function fyll(m) { const s = stat(m); if (m.hp == null || m.hp > s.maxhp) m.hp = s.maxhp; if (m.rost == null || m.rost > s.maxrost) m.rost = s.maxrost; }
  function lækjAlle() { st.parti.forEach(m => { const s = stat(m); m.hp = s.maxhp; m.rost = s.maxrost; }); }
  const sprite = id => Pikslar.figur(D.U[D.PARTI[id].u]);

  /* ---------- Orda ---------- */
  // Gir «nytt» for eit nytt ord, «form» for ei ny form av eit kjent ord, elles null.
  function leggTilForm(id, form, kven) {
    const o = D.ORD[id]; if (!o) return null;
    const stad = Motor.kart ? Motor.kart.def.namn : "";
    if (!st.ord[id]) { st.ord[id] = { former: { [form]: { stad, kven: kven || "" } } }; return "nytt"; }
    if (st.ord[id].former[form]) return null;
    st.ord[id].former[form] = { stad, kven: kven || "" };
    return "form";
  }
  async function meldOrd(id, form, kva) {
    const o = D.ORD[id], fam = D.FAMILIAR[o.fam];
    if (kva === "nytt") Motor.kjensle("ivrig");                      // Ivar blir glad for kvart nytt ord
    if (kva === "nytt") {
      const forste = ordtal() === 1;
      await Motor.tale(`Nytt ord: «${form}» (${o.aasen}). ${fam.namn} gir ${fam.evne.toLowerCase()}.`, "Ordboka");
      if (forste) await Motor.tale("Kvart ord Ivar høyrer, blir ein galdr han kan syngje i kamp. Lydfamilien til ordet avgjer kva galdren gjer.", "Ordboka");
    } else if (kva === "form") {
      await Motor.tale(`Ny form: «${form}» av «${o.aasen}». Jo fleire former Ivar kjenner, jo sterkare blir galdren.`, "Ordboka");
    }
  }

  /* ---------- Manus ----------
     Steg-typane står i toppen av js/rpg/data.js og i js/rpg/README.md. */
  let sistTalar = "";
  // Namnet på ein figur i manus -> namnet motoren brukar: Ivar er spelaren, huldra er
  // følgjet når ho er med, andre er personar på kartet (namn eller merke).
  const regiNamn = kven => kven === "Ivar" ? "spelar" : kven === "Huldra" && st.parti.some(m => m.id === "huldra") ? "fylgje" : kven;
  // Steg for regien i scener: figurar, kamera og effektar. Gir eit løfte.
  function regiSteg(s) {
    // byt kan stå saman med andre steg (ein blink, ei forvandling), så det går vidare etterpå.
    if (s.byt) Motor.byt(regiNamn(s.byt), { namn: s.namn, u: s.u, vesen: s.vesen });
    // Møblar (runde 90): set seg på eit sete, legg seg i ei seng (sove: false: vaken), reis seg.
    if (s.sitje) return Motor.brukMoebel(regiNamn(s.sitje), s.sete, s.gaaDit, "sitje");
    if (s.liggje) return Motor.brukMoebel(regiNamn(s.liggje), s.seng, s.gaaDit, s.sove === false ? "liggje" : "sove");
    if (s.reis) return Motor.reis(regiNamn(s.reis));
    // Dører (runde 96): { dor: [x, y], open: true } held døra open, open: false lukkar ho, utan open
    // opnar ho seg og lukkar seg att etter eit augneblink. Går ein figur gjennom ei dør, skjer det av seg sjølv.
    if (s.dor) { Motor.dorSteg(s.dor, s.open); return null; }
    if (s.gaa) return Motor.gaa(regiNamn(s.gaa), { sti: s.sti, rute: s.rute, mot: s.mot && regiNamn(s.mot), ut: s.ut }, s.fart);
    if (s.snu && s.fraa) {                                           // snur ryggen til nokon
      const a = Motor.aktor(regiNamn(s.snu)), b = Motor.aktor(regiNamn(s.fraa));
      if (a && b) Motor.snu(regiNamn(s.snu), a.x > b.x ? 3 : a.x < b.x ? 2 : a.y > b.y ? 0 : 1);
      return null;
    }
    if (s.snu) { Motor.snu(regiNamn(s.snu), s.mot ? regiNamn(s.mot) : s.retning); return null; }
    if (s.inn) { Motor.inn(s.inn); return null; }
    if (s.pose) { Motor.pose(s.p, regiNamn(s.pose)); return null; }
    if (s.kamera !== undefined) return Motor.kamera(s.kamera && (typeof s.kamera === "string" ? regiNamn(s.kamera) : s.kamera), s.ms);
    if (s.vent) return Motor.vent(s.vent);
    if (s.ton) return s.ton === "inn" ? Motor.tonInn(s.ms || 600) : Motor.tonUt(s.ms || 600, s.ton === "kvitt" ? "#fff" : null);
    if (s.blink) return Motor.blink(s.ms, s.rgb);
    // Lyset (sjå «Lys» i js/rpg/README.md): toning av bakgrunn eller figurar, og spotlight.
    if (s.tone) return Motor.tone(s.tone, s.rgb, s.ms);
    if (s.spot !== undefined) return Motor.spot(s.spot && (typeof s.spot === "string" ? regiNamn(s.spot) : s.spot), s.r, s.ms);
    if (s.rist) return Motor.rist(s.rist, s.styrke);
    return null;
  }
  /* Scenekart: kart som berre finst for ei scene (KART med scene: true), som ein draum eller
     eit minne. forScene er kartet, ruta og retninga spelaren hadde før, og det er han lagre()
     lagrar. Følgjet er med på scenekartet berre med fylgje: true. Attende (scenekart: null)
     blir kartet lasta på nytt: folk står på plassane sine, og folk frå inn-steg er borte. */
  let forScene = null;
  const harHuldra = () => st.parti.some(m => m.id === "huldra");
  async function scenekart(s) {
    if (s.scenekart) {
      const def = D.KART[s.scenekart];
      if (!def || !def.scene) { console.warn("Ikkje eit scenekart:", s.scenekart); return; }
      // Scenekart i scenekart: staden før den første scena er den som gjeld.
      if (!forScene) forScene = { kart: Motor.kart.id, x: Motor.spelar.x, y: Motor.spelar.y, dir: Motor.spelar.dir, pose: Motor.spelar.pose };
      await Motor.scene(() => {
        Motor.settFylgje(s.fylgje && harHuldra() ? sprite("huldra") : null);
        Motor.last(s.scenekart, s.merke || "1", s.retning);
      }, s.ms);
      return;
    }
    const f = forScene; if (!f) return;
    forScene = null;
    await Motor.scene(() => {
      Motor.settFylgje(harHuldra() ? sprite("huldra") : null);
      Motor.last(f.kart, null, f.dir);
      Motor.plasser(f.x, f.y, f.dir);
      Motor.pose(f.pose);                                              // sat han før scena, sit han att
    }, s.ms);
  }
  async function kjoyr(steg) {
    if (typeof steg === "function") steg = steg(st);
    for (const s of steg || []) {
      if (s.dersom) { const r = await kjoyr(s.dersom(st) ? s.da : s.elles); if (r === "stopp") return "stopp"; continue; }
      if (s.scene) { const r = await spelScene(s.scene); if (r === "stopp") return "stopp"; continue; }
      // Fleire lister samstundes (to figurar som går, kamera og rørsle). Ventar på alle.
      if (s.saman) { const r = await Promise.all(s.saman.map(kjoyr)); if (r.includes("stopp")) return "stopp"; continue; }
      if (s.scenekart !== undefined) await scenekart(s);
      const p = regiSteg(s);
      if (p && !s.ikkjeVent) await p;
      if (s.kort) await Motor.kort(s.kort[0], s.kort[1]);
      if (s.naerbilete) await Motor.naerbilete(s.naerbilete, s.tekst);
      if (s.fjern) Motor.fjernFolk(s.fjern);
      // Kjensle: gjeld den som talar (s), eller den som står i «kven».
      const kven = s.kven || s.s || "Ivar";
      if (s.kjensle !== undefined) Motor.kjensle(s.kjensle, regiNamn(kven));
      if (s.fort) await Motor.fort(s.fort);
      else if (s.t) { await Motor.tale(s.t, s.s, s.kjensle && kven === s.s ? s.kjensle : null, { norront: s.norront }); sistTalar = s.s || sistTalar; }
      if (s.lytt) { const [id, form] = s.lytt; await meldOrd(id, form, leggTilForm(id, form, sistTalar)); }
      if (s.tilbod) {
        const [id, form] = s.tilbod;
        const i = await Motor.val(`Skal Ivar skrive ned «${form}» i ordboka?`, ["Skriv det ned", "Berre lytt"]);
        if (i === 0) {
          const kva = leggTilForm(id, form, "Huldra");
          st.huldra.skrive++;
          Motor.kjensle("sjokk", regiNamn("Huldra"));                 // på kartet eller i følgjet
          await Motor.tale("Huldra kveppar. «Eg kjende det. Ein liten bit av meg vart til blekk.»");
          await meldOrd(id, form, kva);
        } else { Motor.kjensle("glad", regiNamn("Huldra")); await Motor.tale("Huldra smiler. «Takk. Nokre ord skal berre seiast.»"); }
      }
      if (s.val) {
        const i = await Motor.val(s.val, s.alt);
        if (s.id) st.val[s.id] = i;                                   // val med id blir hugsa (sjå valt())
        const r = await kjoyr(s.svar && s.svar[i]); if (r === "stopp") return "stopp";
      }
      if (s.traad) {
        if (s.lukk) { if (st.traadar[s.traad]) st.traadar[s.traad].lukka = st.kapittel; }
        else if (!st.traadar[s.traad]) st.traadar[s.traad] = { tekst: s.tekst || s.traad, opna: st.kapittel };
      }
      if (s.dagbok) st.dagbok.push({ tekst: s.dagbok, stad: Motor.kart ? Motor.kart.def.namn : "", kapittel: st.kapittel });
      if (s.partiUt) {
        st.parti = st.parti.filter(m => m.id !== s.partiUt);
        if (s.partiUt === "huldra") Motor.settFylgje(null);
        if (!s.stille) await Motor.tale(`${D.PARTI[s.partiUt].namn} gjekk ut av partiet.`);
      }
      if (s.flagg) st.flagg[s.flagg] = true;
      if (s.uflagg) delete st.flagg[s.uflagg];
      if (s.gi) { if (D.TING[s.gi]) st.ting[s.gi] = (st.ting[s.gi] || 0) + (s.n || 1); else if (!st.nokkel.includes(s.gi)) st.nokkel.push(s.gi); }
      if (s.pengar) st.pengar += s.pengar;
      if (s.forvandling) await forvandling(s.forvandling, s.tekst);
      if (s.parti && !st.parti.some(m => m.id === s.parti)) {
        // fra: personen på kartet som blir med. Følgjet står der ho stod, og ho er borte frå kartet.
        const fra = s.fra && Motor.aktor(s.fra);
        const m = { id: s.parti, niva: st.parti[0].niva, xp: 0, hp: null, rost: null };
        fyll(m); st.parti.push(m); Motor.settFylgje(sprite(s.parti), fra);
        if (fra) Motor.fjernFolk(s.fra);
        await Motor.tale(`${D.PARTI[s.parti].namn} er med i partiet.`);
      }
      if (s.kamp) {
        const r = await kamp(s.kamp, !!s.boss, !!s.rettleiing); if (r === "tap") return "stopp";
        Motor.pause(true);                                             // hendinga held fram: ingen går omkring
      }
      if (s.stev && !st.stev.includes(s.stev)) {
        st.stev.push(s.stev);
        const def = D.STEVGALDR[s.stev], s2 = Stev.status(def, st.ord);
        await Motor.tale(`Ivar lærte «${def.namn}» av ${def.kjelde}. ${s2.manglar.length ? `${s2.manglar.length} av orda i stevet manglar enno.` : "Han har alle orda som trengst."}`, "Ordboka");
        if (st.stev.length === 1) await Motor.tale("Stev er dei sterkaste galdrane. Når kvedemålaren til Ivar er full i ein kamp, kan han kvede eit stev. Hola i stevet fyller han med ord han har funne.", "Ordboka");
      }
      if (s.til) await Motor.scene(() => Motor.last(s.til[0], s.til[1]));
      if (s.lagre) lagre();
      if (s.lækje) lækjAlle();
      if (s.butikk) await butikk(s.butikk);
      if (s.verd) { await verdskart(); return "stopp"; }
      if (s.kapittelslutt) { await kapittelslutt(); return "stopp"; }
    }
  }
  // Eit bilete glir over i eit anna, midt på skjermen (til dømes ein vette som får namnet att).
  function forvandling([for_, etter], tekst) {
    return new Promise(res => {
      const el = document.createElement("div");
      el.className = "rpg-forvandling";
      el.innerHTML = `<div class="fv-bilete"><img class="fv-for" src="${for_}" alt=""><img class="fv-etter" src="${etter}" alt=""></div>${tekst ? `<p class="rpg-vindauge fv-tekst"><span>${E(tekst)}</span></p>` : ""}`;
      $("rpg-skjerm").appendChild(el);
      let ferdig = false;
      const slutt = () => { if (ferdig) return; ferdig = true; slepp(); el.classList.add("ut"); setTimeout(() => { el.remove(); res(); }, 400); };
      const slepp = Motor.lytt({ a: () => { if (el.classList.contains("klar")) slutt(); } });
      setTimeout(() => el.classList.add("glir"), 500);
      setTimeout(() => el.classList.add("klar"), 2600);
      setTimeout(slutt, 6000);
    });
  }
  /* Ein scene frå D.SCENER: { namn, stad, tid, steg }. Stad og tid kjem som eit kort først
     (om ikkje kort: false), og scena blir merkt som spela i st.scener. */
  async function spelScene(id) {
    const sc = D.SCENER[id];
    if (!sc) { console.warn("Ukjend scene:", id); return; }
    if (sc.stad && sc.kort !== false) await Motor.kort(sc.stad, sc.tid);
    const r = await kjoyr(sc.steg);
    st.scener[id] = true;
    return r;
  }
  let hendingar = 0;                                                 // kor mange hendingar som køyrer (for testane)
  /* Når den siste hendinga er slutt, går kjensler og posar bort, kameraet kjem attende til Ivar
     om ei scene let det stå, og spelaren kan gå. Har eit tap starta ei ny hending (ei ny reise
     med «heime»), får ho halde fram i fred. */
  async function hending(steg) {
    Motor.pause(true); hendingar++;
    try { await kjoyr(steg); } finally {
      if (--hendingar === 0) {
        Motor.kjensle(null, "alle"); Motor.pose(null, "alle");
        if (Motor.kameraBorte) Motor.kamera(null, 600);
        if (modus === "felt") Motor.pause(false);
      }
    }
  }

  /* ---------- Kamp ---------- */
  async function kamp(lag, boss, rettleiing, startKved = 0) {
    modus = "kamp";
    Motor.pause(true);
    const gv = gaaver();
    const parti = st.parti.map(m => {
      fyll(m);
      const s = stat(m);
      return Object.assign({ ref: m, namn: D.PARTI[m.id].namn, sprite: sprite(m.id), hp: m.hp, rost: m.rost, galdr: m.id === "ivar", evner: D.PARTI[m.id].evner, ting: () => st.ting, brukTing: id => { st.ting[id]--; } }, s);
    });
    // Inn i kampen: pikseleffekt, så toning til svart. Kampscena tonar inn når ho er teikna.
    await Motor.overgang();
    await Motor.tonUt();
    const bakgrunn = (Motor.kart && Motor.kart.def.bakgrunn) || "tun";
    const r = await Kamp.start({
      fiendar: lag, boss, parti, gaaver: gv, bakgrunn, ord: st.ord, stev: st.stev, startKved, rettleiing,
      paaVesen: (id, slegen) => { const v = st.vesen[id] || (st.vesen[id] = { sett: 0, slegne: 0 }); if (slegen) v.slegne++; else v.sett++; },
      // Løna blir delt ut og vist i kampscena. Gir linene som skal visast.
      paaSiger: async ({ xp: rxp, pengar, fall }) => {
        const xp = Math.round(rxp * (gv.reisestav ? 1.1 : 1));
        const linjer = [`Fekk ${xp} røynsle.`];
        if (pengar) { st.pengar += pengar; linjer.push(`Fekk ${pengar} skilling.`); }
        for (const id of fall) { st.ting[id] = (st.ting[id] || 0) + 1; linjer.push(`Fann ${D.TING[id].namn}!`); }
        for (const m of st.parti) {
          const p = parti.find(p => p.ref === m);
          if (p && p.hp <= 0) continue;                                   // den som ligg, får ikkje røynsle
          m.xp += xp;
          while (m.xp >= xpNeste(m.niva)) { m.xp -= xpNeste(m.niva); const før = stat(m); m.niva++; const etter = stat(m); m.hp += etter.maxhp - før.maxhp; m.rost += etter.maxrost - før.maxrost; linjer.push(`${D.PARTI[m.id].namn} er no på nivå ${m.niva}!`); }
        }
        return linjer;
      },
    });
    parti.forEach(p => { p.ref.hp = Math.max(0, Math.round(p.hp)); p.ref.rost = p.rost; });
    modus = "felt";
    requestAnimationFrame(() => Motor.tonInn());                      // kartet er teikna att: ton inn
    if (r.utfall === "tap") { await tap(); return "tap"; }
    if (r.utfall === "siger") for (const m of st.parti) if (m.hp <= 0) m.hp = 1;   // den som fall, reiser seg med litt liv
    Motor.pause(false);
    return r.utfall;
  }
  async function tap() {
    await Motor.fort(["Blekket la seg over alt.", "Orda vart borte, éin etter éin."]);
    const s = lagra();
    if (s) { st = Object.assign(ny(), s); start(true); await Motor.tale("Du held fram frå sist du lagra."); }
    else { st = ny(); start(false); }
  }

  /* ---------- Butikk ---------- */
  async function butikk(varer) {
    while (true) {
      const i = await Motor.val(`Kva vil du kjøpe? Du har ${st.pengar} skilling.`, [...varer.map(v => `${D.TING[v].namn} (${D.TING[v].pris} sk.)`), "Ingenting"]);
      if (i >= varer.length) return;
      const t = D.TING[varer[i]];
      if (st.pengar < t.pris) { await Motor.tale("Det har du ikkje råd til."); continue; }
      st.pengar -= t.pris; st.ting[varer[i]] = (st.ting[varer[i]] || 0) + 1;
      await Motor.tale(`Du kjøpte ${t.namn}.`);
    }
  }

  /* ---------- Galdrar og ting utanfor kamp ---------- */
  async function feltGaldr() {
    const ivar = st.parti[0];
    const ider = Object.keys(st.ord).filter(id => D.ORD[id].felt);
    if (!ider.length) { await Motor.tale("Ivar kan ingen galdrar som verkar utanfor kamp enno. J-orda lækjer, og «kvar» finn gøymde ting."); return; }
    const kost = id => Math.max(1, D.FAMILIAR[D.ORD[id].fam].rost - (gaaver().oppslagsord ? 1 : 0));
    const i = await Motor.val(`Kva ord vil Ivar syngje? Røyst: ${ivar.rost}`, [...ider.map(id => `${D.ORD[id].aasen} (${kost(id)})`), "Ingen"]);
    if (i >= ider.length) return;
    const id = ider[i], o = D.ORD[id];
    if (ivar.rost < kost(id)) { await Motor.tale("Ivar har ikkje nok røyst att. Kvil ved ei lykt eller eit bål, eller drikk kaffi."); return; }
    ivar.rost -= kost(id);
    if (o.felt === "leit") {
      const gøymde = (Motor.kart.def.kister || []).filter(k => k.gøymd);
      if (gøymde.length && !st.avdekt[Motor.kart.id]) { st.avdekt[Motor.kart.id] = true; await Motor.tale(`Ivar spør: «${o.former[1] || o.aasen}?» Noko glimtar til der ingen har sett før.`); }
      else await Motor.tale(`Ivar spør: «${o.former[1] || o.aasen}?» Men her er ingenting gøymt.`);
      return;
    }
    const mål = o.verknad.alle ? st.parti : [st.parti[await Motor.val("Kven skal få lækjing?", st.parti.map(m => D.PARTI[m.id].namn))]];
    const n = Math.round((o.verknad.lækje + stat(ivar).atk) * 1.2 * (1 + 0.12 * (Object.keys(st.ord[id].former).length - 1)));
    for (const m of mål) { const s = stat(m); m.hp = Math.min(s.maxhp, Math.max(m.hp, 0) + n); }
    await Motor.tale(`Ivar syng «${o.aasen}». ${mål.map(m => D.PARTI[m.id].namn).join(" og ")} får att kreftene.`);
  }
  // valtId: tingen er alt vald (frå lista i menyen).
  async function feltTing(valtId) {
    const eigd = Object.entries(st.ting).filter(([id, n]) => n > 0 && (D.TING[id].lækje || D.TING[id].rost));
    if (!eigd.length) { await Motor.tale("Ivar har ingen ting å bruke no."); return; }
    const i = valtId ? eigd.findIndex(([id]) => id === valtId) : await Motor.val("Kva vil du bruke?", [...eigd.map(([id, n]) => `${D.TING[id].namn} ×${n}`), "Ingenting"]);
    if (i < 0 || i >= eigd.length) return;
    const id = eigd[i][0], t = D.TING[id];
    const m = st.parti[st.parti.length > 1 ? await Motor.val("Kven?", st.parti.map(m => D.PARTI[m.id].namn)) : 0];
    const s = stat(m);
    if (t.lækje) m.hp = Math.min(s.maxhp, m.hp + t.lækje);
    if (t.rost) m.rost = Math.min(s.maxrost, m.rost + t.rost);
    st.ting[id]--;
    await Motor.tale(`${D.PARTI[m.id].namn} brukte ${t.namn}.`);
  }

  /* ---------- Krokane til feltmotoren ---------- */
  Object.assign(Motor.krokar, {
    tilstand: () => st,
    modus: () => modus,
    opna: k => st.opna.includes(k.id),
    synleg: () => !!(Motor.kart && st.avdekt[Motor.kart.id]),
    samtale: f => { const m = D.MANUS[f.tale]; if (m) hending(m); },
    laast: t => hending([{ t }]),
    // Ein naturting sett ut med vilje (til dømes ein bauta): manuset hans når Ivar undersøkjer han.
    undersok: n => hending(D.MANUS[n.manus]),
    inngang: i => hending(D.MANUS[i.manus]),
    kamp: lag => kamp(lag, false),
    meny: () => meny(),
    kiste: k => {
      if (st.opna.includes(k.id)) return hending([{ t: k.tom || "Kista er tom." }]);
      st.opna.push(k.id);
      // Ei kiste med manus (til dømes skrinet etter far) spelar manuset i staden for å gi noko sjølv.
      if (k.manus) return hending(D.MANUS[k.manus]);
      // Ei kiste kan ha pengar, ein ting eller begge.
      const steg = [], fann = [];
      if (k.pengar) { steg.push({ pengar: k.pengar }); fann.push(`${k.pengar} skilling`); }
      if (k.ting) { const t = D.TING[k.ting] || D.NOKKELTING[k.ting]; steg.push({ gi: k.ting, n: k.n }); fann.push(`${k.n > 1 ? k.n + " × " : ""}${t.namn}`); }
      return hending([...steg, { t: `Ivar fann ${fann.join(" og ")}.` }]);
    },
    // Kvile ved ei lykt eller eit bål (type «lykt» eller «baal»). kvile: "scene" på kartet blir
    // spela første gong partiet kviler der. Ved bålet set Ivar seg ned.
    // Ivar har lagt seg under dyna (Motor.setSeg i senga): han kviler, men det er ingen lagring her.
    // Som på eit vertshus i FF6: ei kort stund, så tonar skjermen til svart og inn att, og så teksten.
    seng: () => hending([{ vent: 700 }, { ton: "ut", ms: 900 }, { lækje: 1 }, { vent: 900 }, { ton: "inn", ms: 900 },
      { t: "Ivar kraup under dyna og sov ei god stund. Alle er friske att." }]),
    lampe: (type = "lykt") => {
      const def = Motor.kart && Motor.kart.def, kyrkje = def && def.fristad, baal = type === "baal";
      const kvile = def && def.kvile && !st.scener[def.kvile] ? [{ scene: def.kvile }] : [];
      const tekst = kyrkje ? "Kyrkjelyden syng ein salme. Songen fyller kyrkja, og partiet får att alle kreftene."
        : baal ? "Ivar set seg ved bålet. Elden knitrar og varmar, og partiet kviler. Alle er friske att."
        : "Lyset er varmt. Partiet kviler, og alle er friske att.";
      hending([...(baal ? [{ pose: "Ivar", p: "sitje" }] : []), { lækje: 1 }, { t: tekst }, ...kvile]).then(async () => {
        Motor.pause(true);
        const i = await Motor.val("Vil du lagre?", ["Lagre", "Ikkje no"]);
        if (i === 0) { lagre(); await Motor.tale("Spelet er lagra."); }
        Motor.pause(false);
      });
    },
    dor: async d => {
      // Ei vakt (manus før ein får gå) stoppar Ivar på ruta. Etterpå går spelaren sjølv vidare.
      if (d.vakt && !st.flagg[d.vakt.flagg]) { await hending(D.MANUS[d.vakt.manus]); return; }
      if (d.krevOrd && !st.flagg["opna:" + d.krevOrd]) {
        if (!st.ord[d.krevOrd]) { await hending([{ t: d.laast }]); return; }
        await hending([{ t: `Ivar syng «${D.ORD[d.krevOrd].aasen}». Eit varmt ljos fyller trappa ned til arkivet, og blekket trekkjer seg unna.` }, { flagg: "opna:" + d.krevOrd }]);
      }
      if (d.verd) { await verdskart(); return; }
      await Motor.gjennomDor(d, () => Motor.last(d.til[0], d.til[1]));
    },
    // Kan døra opnast med eit kort trykk (runde 97)? Ikkje når ei vakt eller eit ord stoppar Ivar først.
    kanOpne: d => !(d.vakt && !st.flagg[d.vakt.flagg]) && !(d.krevOrd && !st.flagg["opna:" + d.krevOrd]) && !d.verd,
  });

  /* ---------- Menyen ---------- */
  const menyEl = $("rpg-meny");
  const FAM_ORDEN = ["hard", "diftong", "j", "sporjeord", "smaaord", "nokkel"];
  /* Lister med detaljar i menyen (Ordboka, Ting, Stev, Vesen, Nøkkelting), som i FF6: ei rulleliste
     med fast storleik (Motor.liste) og eit fast felt under med detaljane til det peikaren står på.
     Z på menyvalet går inn i lista, B går attende. Kvar liste gir { topp, alt, ider, detalj(i, aktiv),
     kolonner, vel(i), sorter() } eller { tom: "tekst" }. */
  const SORTERINGAR = ["alfabetisk", "lært", "lydfamilie"];
  const nnSort = (a, b) => a.localeCompare(b, "nn");
  const MENYLISTER = {
    Ordboka() {
      if (!st.nokkel.includes("ordboka") && !ordtal()) return { tom: "Ivar har inga bok å skrive i enno." };
      const kjende = Object.keys(st.ord).filter(id => D.ORD[id]);
      const former = kjende.reduce((n, id) => n + Object.keys(st.ord[id].former).length, 0);
      const sort = SORTERINGAR.includes(st.obSortering) ? st.obSortering : "alfabetisk";
      const ider = kjende.slice();                                     // «lært»: rekkjefølgja dei kom i
      if (sort === "alfabetisk") ider.sort((a, b) => nnSort(D.ORD[a].aasen, D.ORD[b].aasen));
      if (sort === "lydfamilie") ider.sort((a, b) => FAM_ORDEN.indexOf(D.ORD[a].fam) - FAM_ORDEN.indexOf(D.ORD[b].fam) || nnSort(D.ORD[a].aasen, D.ORD[b].aasen));
      const sett = st.obSett || (st.obSett = []);
      const nokkel = Object.keys(D.ORD).filter(id => D.ORD[id].fam === "nokkel"), nokkelHar = nokkel.filter(id => st.ord[id]).length;
      return {
        topp: `${kjende.length} ord og ${former} former · sortert ${sort} <span class="mn-sorter">(Q byter)</span>`,
        topp2: `Nøkkelord: ${nokkelHar} av ${nokkel.length}. Dei krev rota frå mange bygder.`,
        ider, kolonner: 2, tomListe: "Ingen ord enno.",
        alt: ider.map(id => ({ namn: `${E(D.ORD[id].aasen)}${sett.includes(id) ? "" : ' <b class="ob-ny">ny</b>'}`, farge: D.FAMILIAR[D.ORD[id].fam].farge })),
        detalj(i, aktiv) {
          const id = ider[i], o = D.ORD[id], fam = D.FAMILIAR[o.fam], f = st.ord[id].former;
          if (aktiv && !sett.includes(id)) sett.push(id);
          const famIder = Object.keys(D.ORD).filter(x => D.ORD[x].fam === o.fam);
          return `<p><span class="ob-ordet">${E(o.aasen)}</span> <small>«${E(o.tyding)}»</small></p>
            <p class="ob-fam-line" style="--fam:${fam.farge}">${E(fam.namn)} <small>${E(fam.evne)} · ${famIder.filter(x => st.ord[x]).length} av ${famIder.length}</small></p>
            <p><small>Former: ${Object.entries(f).map(([form, k]) => `<span class="ob-form">${E(form)}</span> <span class="ob-kjelde">(${E(k.kven ? k.kven + ", " : "")}${E(k.stad)})</span>`).join(" · ")}</small></p>
            <p><small>Dansk: ${E(o.dansk)} · Norrønt: ${st.kapittel >= 2 ? E(o.norront || "ukjent") : "??? (frå kapittel 2)"}</small></p>
            <p><small>Galdr: ${E(o.tekst)}</small></p>`;
        },
        sorter() { st.obSortering = SORTERINGAR[(SORTERINGAR.indexOf(sort) + 1) % SORTERINGAR.length]; },
      };
    },
    Ting() {
      const ider = Object.keys(st.ting).filter(id => st.ting[id] > 0 && D.TING[id]);
      const kanBruke = id => !!(D.TING[id].lækje || D.TING[id].rost);
      return {
        topp: `Skreppa: ${ider.length ? ider.reduce((n, id) => n + st.ting[id], 0) + " ting" : "tom"} · ${st.pengar} skilling`, topp2: "Trykk Z på ein ting for å bruke han.",
        ider, tomListe: "Skreppa er tom.",
        alt: ider.map(id => ({ namn: E(D.TING[id].namn), info: `×${st.ting[id]}`, av: !kanBruke(id) })),
        detalj: i => `<p><span class="ob-ordet">${E(D.TING[ider[i]].namn)}</span> <small>×${st.ting[ider[i]]}</small></p><p><small>${E(D.TING[ider[i]].tekst)}</small></p>${kanBruke(ider[i]) ? "<p class=\"mn-liten\">Z: bruk</p>" : ""}`,
        vel: i => feltTing(ider[i]),
      };
    },
    Stev() {
      const ider = Object.keys(D.STEVGALDR);
      return {
        topp: `Ivar har lært ${st.stev.length} av ${ider.length} stev.`, topp2: "Eit stev kan kvedast i kamp når kvedemålaren er full. Hola fyller han med ord han har funne.",
        ider, alt: ider.map(id => ({ namn: st.stev.includes(id) ? E(D.STEVGALDR[id].namn) : "???" })),
        detalj(i) {
          const def = D.STEVGALDR[ider[i]];
          if (!st.stev.includes(ider[i])) return "<p>???</p>";
          const linje = l => Stev.delLine(l).map(w => w.hol ? `<b class="stev-hol ${st.ord[def.hol[w.hol].ord] ? "rett" : "tomt"}">${st.ord[def.hol[w.hol].ord] ? E(def.hol[w.hol].rett[0]) : "???"}</b>${E(w.etter)}` : E(w.tekst)).join(" ");
          return `<p><span class="ob-ordet">${E(def.namn)}</span> <small>frå ${E(def.kjelde)}</small></p>${def.liner.map(l => `<p class="stev-line">${linje(l)}</p>`).join("")}<p class="mn-liten">${E(def.tekst)}</p>`;
        },
      };
    },
    Vesen() {
      const ider = Object.keys(D.FIENDAR);
      return {
        topp: `Vesen Ivar har møtt: ${Object.keys(st.vesen).length} av ${ider.length}.`,
        ider, alt: ider.map(id => ({ namn: st.vesen[id] ? E(D.FIENDAR[id].namn) : "???" })),
        detalj(i) {
          const v = st.vesen[ider[i]], d = D.FIENDAR[ider[i]];
          return v ? `<p><span class="ob-ordet">${E(d.namn)}</span></p><p><small>${E(d.slag)} · slegne: ${v.slegne}</small></p><p><small>${E(d.tekst)}</small></p>` : "<p>???</p><p class=\"mn-liten\">Ivar har ikkje møtt dette vesenet enno.</p>";
        },
      };
    },
    Nøkkelting() {
      const ider = st.nokkel.filter(id => D.NOKKELTING[id]);
      return {
        topp: `Nøkkelting: ${ider.length}`, ider, tomListe: "Ingen nøkkelting enno.",
        alt: ider.map(id => ({ namn: E(D.NOKKELTING[id].namn) })),
        detalj: i => `<p><span class="ob-ordet">${E(D.NOKKELTING[ider[i]].namn)}</span></p><p><small>${E(D.NOKKELTING[ider[i]].tekst)}</small></p>`,
      };
    },
  };
  // Lista og detaljfeltet i høgre del av menyen. passiv: berre vist (peikaren står i venstre del).
  function menyListe(def, opt = {}) {
    const h = menyEl.querySelector(".mn-hogre");
    if (def.tom) { h.innerHTML = `<p>${E(def.tom)}</p>`; return null; }
    h.classList.add("mn-delt");
    h.innerHTML = `<p class="mn-topp">${def.topp || ""}${def.topp2 ? `<br><small>${E(def.topp2)}</small>` : ""}</p><div class="mn-lista"></div><div class="mn-detalj"></div>`;
    const lista = h.querySelector(".mn-lista"), detalj = h.querySelector(".mn-detalj");
    if (!def.alt.length) { lista.innerHTML = `<p class="mn-liten">${E(def.tomListe || "")}</p>`; return null; }
    const fp = parseFloat(getComputedStyle($("rpg-skjerm")).getPropertyValue("--fp")) || 2;
    const rader = Math.max(2, Math.floor(lista.clientHeight / (17 * fp)));
    return Motor.liste(lista, def.alt, Object.assign({ rader, kolonner: def.kolonner || 1, tilbake: true, merk: i => { detalj.innerHTML = def.detalj(i, !opt.passiv); if (opt.vedMerk) opt.vedMerk(i); } }, opt));
  }
  /* Dagboka: trådane i forteljinga (opne først) og linjene Ivar har skrive, kapittel for kapittel. */
  function dagbokHtml() {
    const kap = n => { const k = (D.KAPITTEL || []).find(k => k.nr === n); return k ? `Kapittel ${n}: ${k.namn}` : `Kapittel ${n}`; };
    const tr = Object.entries(st.traadar);
    const opne = tr.filter(([, t]) => !t.lukka), lukka = tr.filter(([, t]) => t.lukka);
    let h = `<h3>Trådar <small>${opne.length} opne · ${lukka.length} lukka</small></h3>`;
    h += tr.length ? `<ul class="mn-liste db-traadar">${opne.map(([, t]) => `<li class="db-open">${E(t.tekst)}</li>`).join("")}${lukka.map(([, t]) => `<li class="db-lukka">${E(t.tekst)}</li>`).join("")}</ul>`
      : `<p class="mn-liten">Ingen spørsmål står opne enno.</p>`;
    h += `<h3>Dagboka</h3>`;
    if (!st.dagbok.length) return h + `<p class="mn-liten">Ivar har ikkje skrive noko enno.</p>`;
    let sist = null;
    for (const l of st.dagbok) {
      if (l.kapittel !== sist) { sist = l.kapittel; h += `<p class="db-kapittel">${E(kap(l.kapittel))}</p>`; }
      h += `<p class="db-linje">${E(l.tekst)}${l.stad ? ` <span class="db-stad">${E(l.stad)}</span>` : ""}</p>`;
    }
    return h;
  }
  async function meny() {
    if (modus !== "felt") return;
    Motor.pause(true);
    const valg = ["Status", "Galdr", "Stev", "Ting", "Ordboka", "Dagboka", "Vesen", "Nøkkelting", "Kurset", "Til kurssida", "Lukk"];
    let valt = 0;
    menyEl.hidden = false;
    const innhald = () => {
      const v = valg[valt];
      if (v === "Status") return st.parti.map(m => { fyll(m); const s = stat(m); return `<div class="mn-kort"><img class="mn-figur" src="${sprite(m.id).rammer[0][0].toDataURL()}" alt=""><div><h3>${E(D.PARTI[m.id].namn)} <small>nivå ${m.niva}</small></h3><p>HP ${m.hp}/${s.maxhp} · Røyst ${m.rost}/${s.maxrost}</p><p>Åtak ${Math.round(s.atk)} · Vern ${Math.round(s.def)} · Fart ${Math.round(s.spd)}</p><p class="mn-liten">Røynsle ${m.xp} av ${xpNeste(m.niva)} til neste nivå${m.id === "huldra" ? ` · Kraft ${Math.round(huldrekraft() * 100)} %` : ""}</p></div></div>`; }).join("") + `<p class="mn-liten">Pengar: ${st.pengar} skilling · Stad: ${E(Motor.kart ? Motor.kart.def.namn : "")}</p>`;
      if (v === "Galdr") return `<p>Trykk Z eller Enter for å syngje ein galdr her ute. J-orda lækjer, og «kvar» finn gøymde ting.</p><p class="mn-liten">I kamp kan Ivar bruke alle orda. Lydfamilien avgjer kva galdren gjer:</p><ul class="mn-liste">${FAM_ORDEN.slice(0, 5).map(f => `<li style="--fam:${D.FAMILIAR[f].farge}" class="ob-fam-li"><b>${E(D.FAMILIAR[f].namn)}: ${E(D.FAMILIAR[f].evne)}</b><br><small>${E(D.FAMILIAR[f].tekst)}</small></li>`).join("")}</ul>`;
      if (MENYLISTER[v]) return "";                                // lista blir teikna av menyListe()
      if (v === "Dagboka") return dagbokHtml();
      if (v === "Til kurssida") return `<p>Trykk Z eller Enter for å gå attende til kurssida.</p><p class="mn-liten">Det du ikkje har lagra, går tapt. Du kan lagre ved ei lykt eller eit bål.</p>`;
      if (v === "Kurset") { const gv = gaaver(); return `<p>Fullfører du modular i nynorskkurset, får du gåver i spelet.</p><ul class="mn-liste">${D.GAAVER.map(x => `<li class="${gv[x.id] ? "har" : ""}"><b>${gv[x.id] ? "✓" : "🔒"} ${E(x.namn)}</b><br><small>${E(x.tekst)} Modul: ${x.modular.map(id => E((Modules.get(id) || {}).title || id)).join(" eller ")}.</small></li>`).join("")}</ul>`; }
      return "";
    };
    const teikn = () => {
      menyEl.innerHTML = `<div class="mn-venstre">${valg.map((v, i) => `<button type="button" class="${i === valt ? "peikar" : ""}" data-i="${i}">${v}</button>`).join("")}</div><div class="mn-hogre">${innhald()}</div><span class="mn-opp" hidden>▲</span><span class="mn-ned" hidden>▼</span>`;
      // Lange lister (Ordboka, Ting, Galdr, Stev): fast vindauge som blar ei side med venstre og høgre, med ▲ og ▼.
      const h = menyEl.querySelector(".mn-hogre"), piler = () => { menyEl.querySelector(".mn-opp").hidden = h.scrollTop <= 0; menyEl.querySelector(".mn-ned").hidden = h.scrollTop + h.clientHeight >= h.scrollHeight - 1; };
      if (MENYLISTER[valg[valt]]) menyListe(MENYLISTER[valg[valt]](), { passiv: true });
      h.onscroll = piler; piler();
    };
    let slepp = null;
    const lukk = () => { menyEl.hidden = true; slepp(); Motor.pause(false); };
    const handling = async () => {
      const v = valg[valt];
      if (v === "Lukk") return lukk();
      if (v === "Til kurssida") {
        menyEl.hidden = true; slepp();
        const i = await Motor.val("Gå attende til kurssida? Det du ikkje har lagra, går tapt.", ["Gå til kurssida", "Bli i spelet"]);
        if (i === 0) { await Motor.tonUt(); location.href = "index.html"; return; }
        menyEl.hidden = false; slepp = Motor.lytt(lyttar); teikn(); return;
      }
      // Lister: Z går inn i lista (peikaren flyttar seg dit), B går attende til menyvala.
      if (MENYLISTER[v] && !MENYLISTER[v]().tom && MENYLISTER[v]().alt.length) {
        slepp();
        menyEl.querySelector(".mn-venstre .peikar").classList.add("vald");
        let start = 0;
        while (true) {
          const def = MENYLISTER[v](), avbryt = {};
          const sorter = () => { if (!def.sorter) return; const id = def.ider[aktiv]; def.sorter(); avbryt.no(-2); start = MENYLISTER[v]().ider.indexOf(id); };
          let aktiv = start;
          const tastQ = e => { if (["q", "Q", "Tab"].includes(e.key)) { e.preventDefault(); sorter(); } };
          document.addEventListener("keydown", tastQ);
          const p = menyListe(def, { start, avbryt, vedMerk: j => { aktiv = j; } });
          const i = await p;
          document.removeEventListener("keydown", tastQ);
          if (i === -2) continue;
          if (i < 0) break;
          start = i;
          if (def.vel) { menyEl.hidden = true; await def.vel(i); menyEl.hidden = false; }
        }
        slepp = Motor.lytt(lyttar); teikn(); return;
      }
      if (v === "Galdr") { menyEl.hidden = true; slepp(); await (v === "Galdr" ? feltGaldr() : feltTing()); menyEl.hidden = false; slepp = Motor.lytt(lyttar); teikn(); }
    };
    const lyttar = { a: handling, b: lukk, retning: d => { if (d === 1) valt = (valt + valg.length - 1) % valg.length; if (d === 0) valt = (valt + 1) % valg.length; if (d === 2 || d === 3) { const h = menyEl.querySelector(".mn-hogre"); if (h) h.scrollTop += (d === 3 ? 1 : -1) * Math.max(40, h.clientHeight - 40); return; } teikn(); } };
    slepp = Motor.lytt(lyttar);
    teikn();
  }

  /* ---------- Verdskartet (frå kapittel 2) ---------- */
  let K = null, kartKlart = null, gang = null;
  const verdEl = $("rpg-verd"), verdPanel = $("rpg-verd-panel");
  function initKart() {
    if (kartKlart) return kartKlart;
    // Testar kan slå av 3D-kartet (?utankart=1); då er verdskartet berre lista.
    if (/[?&]utankart=1/.test(location.search) || typeof Kart3D === "undefined") { $("rpg-verd-lastar").innerHTML = "<p>Vel reisemål i lista.</p>"; return (kartKlart = Promise.resolve(false)); }
    K = Kart3D({ rot: $("rpg-verd-kart"), canvas: $("rpg-verd-lerret"), stader: window.AASEN_REISE.stader, fintKart: () => { bygdFor = 0; } });
    kartKlart = K.start({ forRender, etterRender: plasserEtikettar }).then(() => { $("rpg-verd-lastar").hidden = true; K.figur.g.visible = true; return true; }).catch(() => { $("rpg-verd-lastar").innerHTML = "<p>Kartet kan ikkje visast i denne nettlesaren. Vel reisemål i lista.</p>"; return false; });
    return kartKlart;
  }
  let bygdFor = 0;
  function forRender() {
    if (!K) return;
    if (gang) {
      const u = Math.min(1, (performance.now() - gang.t0) / gang.dur);
      if (gang.mesh) {
        gang.mesh.geometry.setDrawRange(0, Math.floor(Math.max(0, u) * gang.seg) * 36);
        const sti = gang.mesh.geometry.parameters.path, p = sti.getPointAt(Math.max(0, u)), t = sti.getTangentAt(Math.max(0, u));
        K.figur.g.position.set(p.x, p.y + K.figur.g.scale.x * 0.15, p.z);
        if (t.x || t.z) K.figur.g.rotation.y = Math.atan2(t.x, t.z);
        K.stillFigur(u * gang.lengd / (1.1 * K.figur.g.scale.x) * Math.PI);
      }
      if (u >= 1) { const g2 = gang; gang = null; g2.ferdig(); }
    }
    if (!bygdFor || Math.abs(K.kam.avstand - bygdFor) > bygdFor * 0.3) byggRuter();
  }
  function byggRuter() {
    const radius = Math.max(0.35, K.kam.avstand * 0.0032);
    K.byggLinjer(radius);
    K.tomGruppe(K.gruppeNo);
    const kule = new THREE.SphereGeometry(radius * 1.9, 12, 8);
    for (const s of D.STADER) {
      if (!st.opne.includes(s.id)) continue;
      const p = K.stadXZ(s.id);
      const dot = new THREE.Mesh(kule, K.materialStopp);
      dot.position.set(p.x, K.hoegdVed(p.x, p.z) * K.EXAG + radius * 1.4 + 0.15 * K.EXAG, p.z);
      K.gruppeNo.add(dot);
    }
    if (gang) { gang.mesh = K.ruteMesh(gang.punkt, radius, K.materialNo); gang.seg = gang.mesh.geometry.parameters.tubularSegments; K.gruppeNo.add(gang.mesh); }
    K.figur.g.scale.setScalar(radius * 2.8);
    if (!gang) { const p = K.stadXZ(st.stad); K.figur.g.position.set(p.x, K.hoegdVed(p.x, p.z) * K.EXAG + 0.1 * K.EXAG, p.z); K.stillFigur(0); }
    bygdFor = K.kam.avstand;
  }
  const etikettar = new Map();
  let projV = null;
  function plasserEtikettar() {
    if (!projV) projV = new THREE.Vector3();
    const c = $("rpg-verd-lerret"), w = c.clientWidth, h = c.clientHeight;
    for (const [id, el] of etikettar) {
      const p = K.stadXZ(id);
      projV.set(p.x, K.hoegdVed(p.x, p.z) * K.EXAG, p.z).project(K.camera);
      if (projV.z > 1 || Math.abs(projV.x) > 1.05 || Math.abs(projV.y) > 1.05) { el.style.display = "none"; continue; }
      el.style.display = "";
      el.style.transform = `translate(${((projV.x + 1) / 2 * w).toFixed(0)}px, ${((1 - projV.y) / 2 * h).toFixed(0)}px)`;
    }
  }
  function verdskart() {
    return new Promise(async res => {
      modus = "verd";
      Motor.pause(true);
      lagre();
      await Motor.tonUt();
      verdEl.hidden = false;
      setTimeout(() => Motor.tonInn(), 60);
      const klar = await initKart();
      if (klar) K.tilpass();
      const opne = D.STADER.filter(s => st.opne.includes(s.id));
      const etEl = $("rpg-verd-etikettar");
      etEl.innerHTML = ""; etikettar.clear();
      for (const s of opne) { const el = document.createElement("div"); el.className = "stad-etikett" + (s.id === st.stad ? " aktiv" : ""); el.innerHTML = `<span class="stad-namn">${E(s.namn)}</span>`; etEl.appendChild(el); etikettar.set(s.id, el); }
      if (klar && opne.length) { bygdFor = 0; K.flyTil(K.passTil(opne.map(s => K.stadXZ(s.id))), 1200); }
      verdPanel.innerHTML = `<p class="vp-tittel">Kvar vil Ivar reise?</p>${opne.map(s => `<button type="button" data-id="${s.id}" class="${s.id === st.stad ? "her" : ""}"><b>${E(s.namn)}</b>${s.id === st.stad ? " <small>(her)</small>" : ""}<br><small>${E(s.tekst)}</small></button>`).join("")}`;
      const kn = [...verdPanel.querySelectorAll("button")];
      let valt = Math.max(0, opne.findIndex(s => s.id !== st.stad));
      const merk = () => kn.forEach((b, i) => b.classList.toggle("peikar", i === valt));
      merk();
      const reis = async i => {
        slepp();
        const mal = opne[i];
        if (klar && mal.id !== st.stad) {
          const punkt = K.lagRute([st.stad, mal.id]);
          let km = 0; for (let j = 1; j < punkt.length; j++) km += Math.hypot(punkt[j].x - punkt[j - 1].x, punkt[j].z - punkt[j - 1].z);
          K.flyTil(K.passTil(punkt), 1000);
          await new Promise(r => { gang = { punkt, lengd: K.ruteKurve(punkt, 1).getLength(), t0: performance.now() + 1100, dur: Math.max(1500, km / (gaaver().reisestav ? 0.12 : 0.06)), mesh: null, seg: 0, ferdig: r }; bygdFor = 0; });
        }
        st.stad = mal.id;
        await Motor.tonUt();
        verdEl.hidden = true;
        modus = "felt";
        requestAnimationFrame(() => Motor.tonInn());
        if (mal.kart) { Motor.last(mal.kart, mal.merke); Motor.pause(false); }
        else if (mal.manus) { await hending(D.MANUS[mal.manus]); }
        res();
      };
      const slepp = Motor.lytt({ a: () => reis(valt), retning: d => { valt = (valt + (d === 1 || d === 2 ? kn.length - 1 : 1)) % kn.length; merk(); } });
    });
  }

  /* ---------- Kapittelslutt ---------- */
  async function kapittelslutt() {
    await Motor.fort([
      "Presten takka Ivar, men han spurde aldri meir om trolldom. Folk i Hovdebygda byrja å tale som før.",
      "I 1831 vart Ivar omgangsskulelærar i heimbygda. Han gjekk frå gard til gard og lærte borna å lese.",
      "Om kveldane skreiv han ned ord. Ikkje for å feste dei, men for å forstå korleis dei heng saman.",
      "Men blekket er ikkje borte. Det skriv vidare i tusen protokollar over heile landet. Og ein stad sit ein lærd mann med ei nål og ventar. Han vil eige orda, for den som eig orda, eig galdrane.",
      "Slutt på kapittel 1: Ørsta.",
      ...D.KAPITTEL.filter(k => k.nr > 1).map(k => `Kapittel ${k.nr}: ${k.namn} (${k.tid}). ${k.tekst} Kjem seinare.`),
    ]);
    st.kapittel = 2; st.flagg.kapittel1 = true;
    lagre();
    visTittel();
  }

  /* ---------- Tittelskjerm og start ---------- */
  const tittelEl = $("rpg-tittel");
  function visTittel() {
    modus = "tittel";
    Motor.pause(true);
    tittelEl.hidden = false;
    const s = lagra();
    const alt = (s ? [["hald", "Hald fram"], ["ny", "Ny reise"]] : [["ny", "Ny reise"]]).concat([["stev", "Prøv stev (prototype)"], ["kurs", "Til kurssida"]]);
    $("rpg-tittel-val").innerHTML = alt.map(([id, t], i) => `<button type="button" data-id="${id}" class="${i === 0 ? "peikar" : ""}">${t}</button>`).join("") +
      (s ? `<p class="tt-lagra">Lagra: kapittel ${s.kapittel}, ${E((D.KART[s.kart] || {}).namn || "")}, Ivar nivå ${s.parti[0].niva}, ${Object.keys(s.ord || {}).length} ord</p>` : "");
    const kn = [...$("rpg-tittel-val").querySelectorAll("button")];
    let valt = 0;
    const merk = () => kn.forEach((b, i) => b.classList.toggle("peikar", i === valt));
    const vel = async i => {
      slepp();
      await Motor.tonUt();
      if (alt[i][0] === "kurs") { location.href = "index.html"; return; }
      tittelEl.hidden = true;
      requestAnimationFrame(() => requestAnimationFrame(() => Motor.tonInn()));
      if (alt[i][0] === "stev") { await provStev(); return; }
      if (alt[i][0] === "hald") { st = Object.assign(ny(), s); start(true); }
      else {
        if (s && !confirm("Vil du byrje ei ny reise? Den lagra reisa blir overskriven når du lagrar neste gong.")) { visTittel(); return; }
        st = ny(); start(false);
      }
    };
    const slepp = Motor.lytt({ a: () => vel(valt), retning: d => { valt = (valt + (d === 1 ? kn.length - 1 : 1)) % kn.length; merk(); } });
  }
  // Prøvekamp for stev-prototypen: Ivar og huldra med orda frå kapittel 1 og full kvedemålar.
  async function provStev() {
    const ekte = st;
    st = ny();
    for (const [id, form] of [["stein", "stein"], ["stein", "stæin"], ["draum", "draum"], ["kaka", "kake"], ["ljos", "ljos"], ["mjolk", "mjølk"], ["kvat", "ka"]]) leggTilForm(id, form, "prøve");
    st.stev = ["steinstevet", "tungestevet"];
    st.parti.push({ id: "huldra", niva: 3, xp: 0, hp: null, rost: null }); st.parti[0].niva = 3;
    st.parti.forEach(fyll);
    Motor.settSpelar(sprite("ivar"));
    Motor.last("utmarka", "1");
    modus = "felt";
    await Motor.tale("Prøvekamp: kvedemålaren til Ivar er full. Vel «Stev» i menyen hans. Steinstevet har alle orda. Tungestevet manglar to nøkkelord.");
    await kamp(["blekkflekk", "blekkdrope", "fjorpennen"], false, false, 100);
    st = ekte;
    visTittel();
  }
  function start(fraLagring) {
    modus = "felt";
    forScene = null;
    Motor.settSpelar(sprite("ivar"));
    Motor.settFylgje(st.parti.some(m => m.id === "huldra") ? sprite("huldra") : null);
    st.parti.forEach(fyll);
    // Eit kart som er bygd om (nyttOppsett: { fraH, merke }): ei lagring med ei anna høgd (fraH når
    // lagringa ikkje har høgda) har ein stad som ikkje finst lenger, så Ivar startar på merket.
    const nytt = D.KART[st.kart] && D.KART[st.kart].nyttOppsett;
    const ombygd = fraLagring && st.pos && nytt && (st.pos.h || nytt.fraH) !== D.KART[st.kart].rader.length;
    Motor.last(st.kart, ombygd ? nytt.merke || "1" : "1");
    if (ombygd) st.pos = null;
    // Eit kart som har fått nye rader øvst sidan spelet vart lagra: flytt staden like mange rader ned.
    const nye = D.KART[st.kart] && D.KART[st.kart].nyeRader;
    if (fraLagring && st.pos && nye && (st.pos.h || nye.fraH) === nye.fraH) { st.pos.y += nye.n; st.pos.h = D.KART[st.kart].rader.length; }
    if (fraLagring && st.pos) Motor.plasser(st.pos.x, st.pos.y, st.pos.dir);   // huldra blir sett ned attmed Ivar
    Motor.tilpass();
    if (!fraLagring) hending(D.MANUS.start); else Motor.pause(false);
  }

  // Last all grafikk (og pikselskrifta) før tittelskjermen syner, så ingenting poppar inn seinare.
  Motor.tilpass();
  $("rpg-tittel-val").innerHTML = '<p class="tt-lagra">Lastar grafikk …</p>';
  Promise.all([Pikslar.forhandslast(Pikslar.alleBilete(D)), document.fonts ? document.fonts.load('16px "Pixelify Sans"').catch(() => {}) : null])
    .then(() => { Pikslar.figur(D.U.ivar); visTittel(); });
  // Til automatiske testar: les tilstanden og modusen.
  window.RPGTest = { st: () => st, modus: () => modus, lagre, lagra, hending, scene: id => hending([{ scene: id }]), forScene: () => forScene, iHending: () => hendingar > 0 };
})();
