/* «Blekkranet»: ei rollespelforteljing om Ivar Aasen (spel.html).

   Denne fila held saman resten: tilstanden og lagringa, tittelskjermen,
   manus (samtalar og hendingar frå js/rpg/data.js), menyen, nivå og
   røynsle, butikkar, gåver frå kurset og verdskartet, som er 3D-kartet frå
   «Reisene til Ivar Aasen» (js/kart3d.js).

   Modus: «tittel», «felt» (js/rpg/motor.js), «kamp» (js/rpg/kamp.js) og
   «verd» (verdskartet). Spelet har sin eigen lagringsnøkkel, så det kan
   nullstillast utan å røre framdrifta i kurset. */
(function () {
  "use strict";
  const D = RPGData, E = Motor.E;
  const $ = id => document.getElementById(id);
  const NOKKEL = "nynorskkurs:rpg:v1";
  let modus = "tittel";

  /* ---------- Tilstand ---------- */
  const ny = () => ({
    kart: "asen-stova", merke: "1", flagg: {}, opne: ["aasen"], stad: "aasen",
    parti: [{ id: "ivar", niva: 1, xp: 0, hp: null, mp: null, evner: ["kjonnsord"] }],
    ting: { flatbrod: 1 }, nokkel: [], pengar: 0, notatboka: [], plukka: [], opna: [], planter: 0, kapittel: 1,
  });
  let st = ny();
  const lagra = () => { try { return JSON.parse(localStorage.getItem(NOKKEL) || "null"); } catch (e) { return null; } };
  function lagre() {
    st.kart = Motor.kart ? Motor.kart.id : st.kart;
    st.pos = Motor.spelar ? { x: Motor.spelar.x, y: Motor.spelar.y, dir: Motor.spelar.dir } : null;
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
  function stat(m) {
    const b = D.PARTI[m.id], v = b.vekst, n = m.niva - 1, gv = gaaver();
    return {
      maxhp: Math.round(b.hp + v.hp * n + (m.id === "ivar" && gv.heimbygda ? 15 : 0)),
      maxmp: Math.round(b.mp + v.mp * n + Math.floor(st.notatboka.length / 10) * (m.id === "ivar" ? 2 : 0)),
      atk: Math.round((b.atk + v.atk * n) * 10) / 10, def: Math.round((b.def + v.def * n) * 10) / 10, spd: b.spd + v.spd * n,
    };
  }
  function fyll(m) { const s = stat(m); if (m.hp == null || m.hp > s.maxhp) m.hp = s.maxhp; if (m.mp == null || m.mp > s.maxmp) m.mp = s.maxmp; }
  function lækjAlle() { st.parti.forEach(m => { const s = stat(m); m.hp = s.maxhp; m.mp = s.maxmp; }); }
  const sprite = id => id === "skreppa" ? Pikslar.skreppa() : Pikslar.figur(D.U[D.PARTI[id].u]);
  function leggTilOrd(ord) {
    if (!ord || st.notatboka.includes(ord)) return false;
    st.notatboka.push(ord);
    return true;
  }

  /* ---------- Manus ---------- */
  async function kjoyr(steg) {
    if (typeof steg === "function") steg = steg(st);
    for (const s of steg || []) {
      if (s.dersom) { const r = await kjoyr(s.dersom(st) ? s.da : s.elles); if (r === "stopp") return "stopp"; continue; }
      if (s.fort) await Motor.fort(s.fort);
      else if (s.t) await Motor.tale(s.t, s.s);
      if (s.flagg) st.flagg[s.flagg] = true;
      if (s.uflagg) delete st.flagg[s.uflagg];
      if (s.gi) { if (D.TING[s.gi]) st.ting[s.gi] = (st.ting[s.gi] || 0) + (s.n || 1); else if (!st.nokkel.includes(s.gi)) st.nokkel.push(s.gi); }
      if (s.ta) st.nokkel = st.nokkel.filter(k => k !== s.ta);
      if (s.pengar) st.pengar += s.pengar;
      if (s.ord) s.ord.forEach(leggTilOrd);
      if (s.evne) { const ivar = st.parti[0]; if (!ivar.evner.includes(s.evne)) ivar.evner.push(s.evne); }
      if (s.parti && !st.parti.some(m => m.id === s.parti)) {
        const m = { id: s.parti, niva: st.parti[0].niva, xp: 0, hp: null, mp: null, evner: D.PARTI[s.parti].evner.slice() };
        fyll(m); st.parti.push(m); Motor.settFylgje(sprite(s.parti));
      }
      if (s.kamp) { const r = await kamp(s.kamp, !!s.boss); if (r === "tap") return "stopp"; }
      if (s.til) Motor.last(s.til[0], s.til[1]);
      if (s.opne && !st.opne.includes(s.opne)) st.opne.push(s.opne);
      if (s.lagre) lagre();
      if (s.lækje) lækjAlle();
      if (s.butikk) await butikk(s.butikk);
      if (s.verd) { await verdskart(); return "stopp"; }
      if (s.kapittelslutt) { await kapittelslutt(); return "stopp"; }
    }
  }
  async function hending(steg) {
    Motor.pause(true);
    try { await kjoyr(steg); } finally { if (modus === "felt") Motor.pause(false); }
  }

  /* ---------- Kamp ---------- */
  async function kamp(lag, boss) {
    modus = "kamp";
    Motor.pause(true);
    const gv = gaaver();
    const parti = st.parti.map(m => {
      fyll(m);
      const s = stat(m);
      return Object.assign({ ref: m, namn: D.PARTI[m.id].namn, sprite: sprite(m.id), hp: m.hp, mp: m.mp, evner: m.evner, ting: () => st.ting, brukTing: id => { st.ting[id]--; } }, s);
    });
    const bakgrunn = Motor.kart && Motor.kart.def.inne ? "inne" : Motor.kart && Motor.kart.id === "bergen" ? (boss ? "natt" : "by") : "ute";
    const nyeOrd = [];
    const r = await Kamp.start({ fiendar: lag, boss, parti, gaaver: gv, bakgrunn, paaOrd: o => { if (leggTilOrd(o)) nyeOrd.push(o); } });
    parti.forEach(p => { p.ref.hp = Math.max(0, Math.round(p.hp)); p.ref.mp = p.mp; });
    modus = "felt";
    if (r.utfall === "tap") { await tap(); return "tap"; }
    if (r.utfall === "siger") {
      const xp = Math.round(r.xp * (gv.reisestav ? 1.1 : 1));
      const linjer = [`Siger! ${xp} røynsle${r.pengar ? ` og ${r.pengar} skilling` : ""}.`];
      st.pengar += r.pengar;
      for (const id of r.fall) { st.ting[id] = (st.ting[id] || 0) + 1; linjer.push(`Du fann ${D.TING[id].namn}.`); }
      if (nyeOrd.length) linjer.push(`Nye ord i notatboka: ${nyeOrd.join(", ")}.`);
      for (const m of st.parti) {
        if (m.hp <= 0) m.hp = 1;          // den som fall, reiser seg med litt liv etter kampen
        m.xp += xp;
        while (m.xp >= xpNeste(m.niva)) { m.xp -= xpNeste(m.niva); const før = stat(m); m.niva++; const etter = stat(m); m.hp += etter.maxhp - før.maxhp; m.mp += etter.maxmp - før.maxmp; linjer.push(`${D.PARTI[m.id].namn} er no på nivå ${m.niva}!`); }
      }
      for (const l of linjer) await Motor.tale(l);
    }
    Motor.pause(false);
    return r.utfall;
  }
  async function tap() {
    await Motor.fort(["Blekket la seg over alt.", "Orda vart borte, éin etter éin."]);
    const s = lagra();
    if (s) { st = s; start(true); await Motor.tale("Du held fram frå sist du lagra."); }
    else { st = ny(); start(false); }
  }

  /* ---------- Butikk ---------- */
  async function butikk(varer) {
    while (true) {
      const i = await Motor.val(`Kva vil du kjøpe? Du har ${pengetekst(st.pengar)}.`, [...varer.map(v => `${D.TING[v].namn} (${D.TING[v].pris} sk.)`), "Ingenting"]);
      if (i >= varer.length) return;
      const t = D.TING[varer[i]];
      if (st.pengar < t.pris) { await Motor.tale("Det har du ikkje råd til."); continue; }
      st.pengar -= t.pris; st.ting[varer[i]] = (st.ting[varer[i]] || 0) + 1;
      await Motor.tale(`Du kjøpte ${t.namn}.`);
    }
  }
  const pengetekst = sk => sk >= 120 ? `${Math.floor(sk / 120)} spd ${sk % 120} sk.` : `${sk} skilling`;

  /* ---------- Krokane til feltmotoren ---------- */
  Object.assign(Motor.krokar, {
    tilstand: () => st,
    modus: () => modus,
    opna: k => st.opna.includes(k.id),
    plukka: (x, y) => st.plukka.includes(`${Motor.kart.id}:${x},${y}`),
    samtale: f => { const m = D.MANUS[f.tale]; if (m) hending(m); },
    laast: t => hending([{ t }]),
    inngang: i => hending(D.MANUS[i.manus]),
    kamp: lag => kamp(lag, false),
    meny: () => meny(),
    kiste: k => {
      if (st.opna.includes(k.id)) return hending([{ t: "Kista er tom." }]);
      st.opna.push(k.id);
      const t = D.TING[k.ting] || D.NOKKELTING[k.ting];
      hending([{ gi: k.ting, n: k.n }, { t: `Ivar fann ${k.n > 1 ? k.n + " × " : ""}${t.namn}.` }]);
    },
    lampe: () => hending([{ lækje: 1 }, { t: "Leselampa lyser varmt. Partiet kviler, og alle er friske att." }]).then(async () => {
      Motor.pause(true);
      const i = await Motor.val("Vil du lagre reisa?", ["Lagre", "Ikkje no"]);
      if (i === 0) { lagre(); await Motor.tale("Reisa er lagra."); }
      Motor.pause(false);
    }),
    plante: async (x, y) => {
      if (Motor.kart.id === "skogen" && x === 23 && y === 9 && !st.flagg.kraake_slegen) { await hending(D.MANUS.kraake); if (!st.flagg.kraake_slegen) return; }
      if (st.flagg.planter_ferdig) return;
      st.plukka.push(`${Motor.kart.id}:${x},${y}`);
      st.planter++;
      Motor.fjernFlis(x, y);
      const steg = [{ t: `Ivar pressa ein sjeldan plante i notatboka. ${st.planter} av 5.` }];
      if (st.planter >= 5) steg.push({ flagg: "planter_ferdig" }, { gi: "plantesamling" }, { t: "Plantesamlinga er ferdig! Gå attende til kaptein Daae." });
      await hending(steg);
    },
    dor: async d => {
      if (d.verd) { await verdskart(); return; }
      Motor.last(d.til[0], d.til[1]);
      // I Bergen ventar skuggen når biskopen har gitt stipendet.
      if (d.til[0] === "bergen" && st.flagg.skugge_kjem && !st.flagg.skugge_slegen) await hending(D.MANUS.skugge);
    },
  });

  /* ---------- Menyen ---------- */
  const menyEl = $("rpg-meny");
  async function meny() {
    if (modus !== "felt") return;
    Motor.pause(true);
    const valg = ["Status", "Ting", "Ordkunst", "Notatboka", "Nøkkelting", "Kurset", "Lukk"];
    let valt = 0;
    menyEl.hidden = false;
    const innhald = () => {
      const v = valg[valt];
      if (v === "Status") return st.parti.map(m => { fyll(m); const s = stat(m); return `<div class="mn-kort"><h3>${E(D.PARTI[m.id].namn)} <small>nivå ${m.niva}</small></h3><p>HP ${m.hp}/${s.maxhp} · Blekk ${m.mp}/${s.maxmp}</p><p>Åtak ${Math.round(s.atk)} · Vern ${Math.round(s.def)} · Fart ${Math.round(s.spd)}</p><p class="mn-liten">Røynsle ${m.xp} av ${xpNeste(m.niva)} til neste nivå</p></div>`; }).join("") + `<p class="mn-liten">Pengar: ${pengetekst(st.pengar)} · Stad: ${E(Motor.kart ? Motor.kart.def.namn : "")}</p>`;
      if (v === "Ting") { const t = Object.entries(st.ting).filter(([, n]) => n > 0); return t.length ? `<ul class="mn-liste">${t.map(([id, n]) => `<li><b>${E(D.TING[id].namn)}</b> ×${n}<br><small>${E(D.TING[id].tekst)}</small></li>`).join("")}</ul><p class="mn-liten">Ting brukar du i kamp. Leselampane lækjer heile partiet.</p>` : "<p>Skreppa er tom.</p>"; }
      if (v === "Ordkunst") return st.parti.map(m => `<h3>${E(D.PARTI[m.id].namn)}</h3><ul class="mn-liste">${m.evner.map(id => { const ev = D.EVNER[id]; return `<li><b>${E(ev.namn)}</b> <small>${ev.mp} blekk</small><br><small>${E(ev.tekst)}</small></li>`; }).join("")}</ul>`).join("");
      if (v === "Notatboka") return `<p>${st.notatboka.length} ord. Kvart tiande ord gir Ivar meir blekk.</p><p class="mn-ord">${st.notatboka.map(o => `<span>${E(o)}</span>`).join("") || "<em>Ingen ord enno.</em>"}</p>`;
      if (v === "Nøkkelting") return st.nokkel.length ? `<ul class="mn-liste">${st.nokkel.map(id => `<li><b>${E(D.NOKKELTING[id].namn)}</b><br><small>${E(D.NOKKELTING[id].tekst)}</small></li>`).join("")}</ul>` : "<p>Ingen nøkkelting enno.</p>";
      if (v === "Kurset") { const gv = gaaver(); return `<p>Fullfører du modular i nynorskkurset, får du gåver i spelet.</p><ul class="mn-liste">${D.GAAVER.map(x => `<li class="${gv[x.id] ? "har" : ""}"><b>${gv[x.id] ? "✓" : "🔒"} ${E(x.namn)}</b><br><small>${E(x.tekst)} Modul: ${x.modular.map(id => E((Modules.get(id) || {}).title || id)).join(" eller ")}.</small></li>`).join("")}</ul>`; }
      return "";
    };
    const teikn = () => {
      menyEl.innerHTML = `<div class="mn-venstre">${valg.map((v, i) => `<button type="button" class="${i === valt ? "peikar" : ""}" data-i="${i}">${v}</button>`).join("")}</div><div class="mn-hogre">${innhald()}</div>`;
      menyEl.querySelectorAll("[data-i]").forEach(b => b.addEventListener("click", () => { valt = +b.dataset.i; if (valg[valt] === "Lukk") lukk(); else teikn(); }));
    };
    let slepp = null;
    const lukk = () => { menyEl.hidden = true; slepp(); Motor.pause(false); };
    slepp = Motor.lytt({ a: () => { if (valg[valt] === "Lukk") lukk(); }, b: lukk, retning: d => { if (d === 1) valt = (valt + valg.length - 1) % valg.length; if (d === 0) valt = (valt + 1) % valg.length; teikn(); } });
    teikn();
  }

  /* ---------- Verdskartet ---------- */
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
      verdEl.hidden = false;
      const klar = await initKart();
      if (klar) K.tilpass();
      const opne = D.STADER.filter(s => st.opne.includes(s.id));
      const etEl = $("rpg-verd-etikettar");
      etEl.innerHTML = ""; etikettar.clear();
      for (const s of opne) { const el = document.createElement("div"); el.className = "stad-etikett" + (s.id === st.stad ? " aktiv" : ""); el.innerHTML = `<span class="stad-namn">${E(s.namn)}</span>`; etEl.appendChild(el); etikettar.set(s.id, el); }
      if (klar) { bygdFor = 0; K.flyTil(K.passTil(opne.map(s => K.stadXZ(s.id)).concat([K.stadXZ("bergen"), K.stadXZ("aasen")])), 1200); }
      verdPanel.innerHTML = `<p class="vp-tittel">Kvar vil Ivar reise?</p>${opne.map(s => `<button type="button" data-id="${s.id}" class="${s.id === st.stad ? "her" : ""}"><b>${E(s.namn)}</b>${s.id === st.stad ? " <small>(her)</small>" : ""}<br><small>${E(s.tekst)}</small></button>`).join("")}`;
      const kn = [...verdPanel.querySelectorAll("button")];
      let valt = Math.max(0, opne.findIndex(s => s.id !== st.stad && !besokt(s)));
      if (valt < 0) valt = 0;
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
        verdEl.hidden = true;
        modus = "felt";
        if (mal.kart) { Motor.last(mal.kart, mal.merke); Motor.pause(false); }
        else if (mal.manus) { await hending(D.MANUS[mal.manus]); }
        res();
      };
      kn.forEach((b, i) => b.addEventListener("click", () => reis(i)));
      const slepp = Motor.lytt({ a: () => reis(valt), retning: d => { valt = (valt + (d === 1 || d === 2 ? kn.length - 1 : 1)) % kn.length; merk(); } });
    });
  }
  const besokt = s => s.id === "heroy" ? st.flagg.heroy : s.id === "solnor" ? st.flagg.daae_helst : s.id === "bergen" ? st.flagg.stipend : true;

  /* ---------- Kapittelslutt ---------- */
  async function kapittelslutt() {
    await Motor.fort([
      "«Intet kan sammenlignes med Reiser», skreiv Ivar i dagboka etter Bergensturen.",
      "Den 29. september 1842 legg han ut frå Ekset. Han skal gjennom Nordfjord, Sunnfjord og inn i Sogn, og han skal skrive ned kvart ord han høyrer.",
      "Ein stad i Christiania ligg Blekklatten i ei skuff og veks.",
      "Slutt på kapittel 1: Guten frå Åsen.",
      "Kapittel 2: Reisa kjem seinare.",
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
    const alt = s ? [["hald", "Hald fram"], ["ny", "Ny reise"]] : [["ny", "Ny reise"]];
    $("rpg-tittel-val").innerHTML = alt.map(([id, t], i) => `<button type="button" data-id="${id}" class="${i === 0 ? "peikar" : ""}">${t}</button>`).join("") +
      (s ? `<p class="tt-lagra">Lagra: kapittel ${s.kapittel}, ${E((D.KART[s.kart] || {}).namn || "")}, Ivar nivå ${s.parti[0].niva}</p>` : "");
    const kn = [...$("rpg-tittel-val").querySelectorAll("button")];
    let valt = 0;
    const merk = () => kn.forEach((b, i) => b.classList.toggle("peikar", i === valt));
    const vel = async i => {
      slepp();
      tittelEl.hidden = true;
      if (alt[i][0] === "hald") { st = Object.assign(ny(), s); start(true); }
      else {
        if (s && !confirm("Vil du byrje ei ny reise? Den lagra reisa blir overskriven når du lagrar neste gong.")) { visTittel(); return; }
        st = ny(); start(false);
      }
    };
    kn.forEach((b, i) => b.addEventListener("click", () => vel(i)));
    const slepp = Motor.lytt({ a: () => vel(valt), retning: d => { valt = (valt + (d === 1 ? kn.length - 1 : 1)) % kn.length; merk(); } });
  }
  function start(fraLagring) {
    modus = "felt";
    Motor.settSpelar(sprite("ivar"));
    Motor.settFylgje(st.parti.some(m => m.id === "skreppa") ? sprite("skreppa") : null);
    st.parti.forEach(fyll);
    Motor.last(st.kart, "1");
    if (fraLagring && st.pos) { Object.assign(Motor.spelar, { x: st.pos.x, y: st.pos.y, fx: st.pos.x, fy: st.pos.y, dir: st.pos.dir }); }
    Motor.tilpass();
    if (!fraLagring) hending(D.MANUS.start); else Motor.pause(false);
  }

  Motor.tilpass();
  visTittel();
  // Til automatiske testar: les tilstanden og modusen.
  window.RPGTest = { st: () => st, modus: () => modus };
})();
