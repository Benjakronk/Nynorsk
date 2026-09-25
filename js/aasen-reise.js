/* Sida som viser modulen «Reisene til Ivar Aasen» (Del 1) éin seksjon om gongen.

   Sjølve 3D-kartet (terreng, hav, kamera, figuren, scenene og rutene) ligg i
   js/kart3d.js, som spelet «Blekkranet» òg brukar. Her ligg det som høyrer
   til modulen: stadene i js/content/aasen-reise.js blir plasserte på kartet,
   kvart kapittel (lesson med `reise`) teiknar ruta si som ei slange lagd oppå
   terrenget, og ein liten figur av Aasen går langs henne. Oppgåvene mellom
   kapitla blir teikna av js/exercises.js og lagra som i resten av kurset, så
   modulen får framdrift og «Fullført» på oversikta. */
(function () {
  "use strict";

  const STADER = window.AASEN_REISE.stader;
  const MOD = Modules.get("historie-aasen-reise");
  const SEKS = MOD.sections;
  const erKapittel = s => s.type === "lesson" && !!s.reise;
  const rotEl = document.getElementById("kart");
  const canvas = document.getElementById("kart-lerret");
  const etikettEl = document.getElementById("etikettar");
  const lastEl = document.getElementById("kart-lastar");

  const K = Kart3D({ rot: rotEl, canvas, stader: STADER, fintKart: () => { bygdForAvstand = 0; } });
  const { EXAG, stadXZ, hoegdVed, kam, camera, flyTil, passTil, LANDET, klemAvstand, reduserRorsle,
    figur, stillFigur, lagRute, ruteKurve, ruteMesh, tomGruppe, gruppeFor, gruppeNo,
    materialNo, materialFor, materialStopp, byggScener, visScene, byggLinjer } = K;

  document.addEventListener("keydown", e => {
    if (e.target.closest("input, textarea, select, button")) return;
    if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); gaaTil(seksIdx + 1); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); gaaTil(seksIdx - 1); }
    else if (e.key === " ") { e.preventDefault(); settPause(!pausa); }
    else if (e.key === "Home") { e.preventDefault(); gaaTil(0); }
    else if (e.key === "End") { e.preventDefault(); gaaTil(SEKS.length - 1); }
  });

  /* ---------- Seksjonar: kapittel og oppgåver ---------- */
  let seksIdx = -1;        // gjeldande seksjon i modulen
  let kapIdx = -1;         // siste kapittelet som er vist (kartet viser det)
  let noRute = null;       // { punkt, idar, stoppPos, lengd, framdrift, dur, t0, mesh, seg, ferdig }
  let bygdForAvstand = 0;
  let autoTimer = null;
  let pausa = false, pauseStart = 0;
  const etikettar = new Map(); // stad-id -> element

  const kapTid = document.getElementById("kap-tid"), kapTittel = document.getElementById("kap-tittel"),
    kapTekst = document.getElementById("kap-tekst"), kapTeljar = document.getElementById("kap-teljar"),
    oppFramdrift = document.getElementById("opp-framdrift"),
    ruteListe = document.getElementById("rute-liste"), forreBtn = document.getElementById("forre"),
    nesteBtn = document.getElementById("neste"), kapListe = document.getElementById("kap-liste"),
    autoBtn = document.getElementById("auto-btn"), pauseBtn = document.getElementById("pause-btn"),
    modulNav = document.getElementById("modul-nav");

  function gaaTil(i) {
    if (i < 0 || i >= SEKS.length || i === seksIdx) return;
    visSeksjon(i);
  }

  function visSeksjon(i) {
    seksIdx = i;
    const s = SEKS[i];
    clearTimeout(autoTimer);
    if (history.replaceState) history.replaceState(null, "", "#k=" + (i + 1));

    kapTeljar.textContent = `${i + 1} av ${SEKS.length}`;
    forreBtn.disabled = i === 0;
    nesteBtn.disabled = i === SEKS.length - 1;
    modulNav.hidden = i !== SEKS.length - 1;
    for (const li of kapListe.children) li.classList.toggle("aktiv", +li.dataset.idx === i);
    const aktivLi = kapListe.children[i];
    if (aktivLi && aktivLi.scrollIntoView) aktivLi.scrollIntoView({ block: "nearest" });
    document.querySelector(".reise-panel").scrollTop = 0;

    kapTekst.innerHTML = "";
    if (erKapittel(s)) {
      kapTid.textContent = s.reise.tid;
      kapTittel.textContent = s.title;
      kapTekst.innerHTML = s.content;
      visKapittel(i);
    } else {
      kapTid.textContent = "Oppgåve undervegs";
      kapTittel.textContent = s.title || "Prøv deg";
      const kort = document.createElement("section");
      kort.className = "section exercise-wrap";
      kort.appendChild(Exercises.render(s, MOD.id));
      kapTekst.appendChild(kort);
      ruteListe.parentElement.hidden = true;
      // Kartet blir ståande på det siste kapittelet, og figuren står i ro.
      if (auto && erSvart(s)) planleggNeste();
    }
  }

  function visKapittel(i) {
    kapIdx = i;
    const k = SEKS[i].reise;
    settPause(false);

    // Stopplista i panelet
    ruteListe.innerHTML = "";
    k.stopp.forEach(([id, dato], j) => {
      const li = document.createElement("li");
      const b = document.createElement("button");
      b.type = "button";
      b.innerHTML = `<span class="rute-namn">${STADER[id].namn}</span><span class="rute-dato">${dato}</span>`;
      b.addEventListener("click", () => hoppTilStopp(j));
      li.appendChild(b);
      ruteListe.appendChild(li);
    });
    ruteListe.parentElement.hidden = k.stopp.length === 0;

    // Tidlegare ruter, dempa
    tomGruppe(gruppeFor); tomGruppe(gruppeNo);
    const punktFor = [];
    for (let j = 0; j < i; j++) if (erKapittel(SEKS[j]) && SEKS[j].reise.stopp.length >= 2) punktFor.push(lagRute(SEKS[j].reise.stopp.map(s => s[0])));
    gruppeFor.userData.ruter = punktFor;

    // Denne ruta
    const idar = k.stopp.map(s => s[0]);
    const punkt = idar.length ? lagRute(idar) : [];
    noRute = null;
    if (punkt.length >= 2) {
      const lengd = ruteKurve(punkt, 1).getLength();
      const stoppPos = [];
      let akk = 0;
      for (let j = 0; j < idar.length; j++) {
        if (j > 0) { const a = stadXZ(idar[j - 1]), b = stadXZ(idar[j]); akk += Math.hypot(b.x - a.x, b.z - a.z); }
        stoppPos.push({ id: idar[j], t: akk });
      }
      const tot = stoppPos[stoppPos.length - 1].t || 1;
      stoppPos.forEach(s => { s.t = s.t / tot; });
      // Tidsplan: figuren går om lag 50 km i sekundet, jamt frå første til
      // siste stopp utan å stoppe undervegs, og tek til når kameraet er på plass.
      const fasar = [];
      let akkMs = 0;
      for (let j = 1; j < stoppPos.length; j++) {
        const km = (stoppPos[j].t - stoppPos[j - 1].t) * tot;
        const ms = reduserRorsle ? 0 : Math.max(200, km / 0.05);
        fasar.push({ type: "gang", j, fra: stoppPos[j - 1].t, til: stoppPos[j].t, start: akkMs, dur: ms });
        akkMs += ms;
      }
      noRute = { punkt, idar, stoppPos, lengd, fasar, dur: akkMs, framdrift: 0, t0: performance.now() + 1600, mesh: null, seg: 0, ferdig: false };
    }
    bygdForAvstand = 0; // tvinger ny oppbygging med rett tjukkleik

    // Etikettar
    etikettEl.innerHTML = ""; etikettar.clear();
    const synlege = [...new Set(idar)];
    for (const id of synlege) {
      const el = document.createElement("div");
      el.className = "stad-etikett";
      el.innerHTML = `<span class="stad-namn">${STADER[id].namn}</span><span class="stad-dato"></span>`;
      etikettEl.appendChild(el);
      etikettar.set(id, el);
    }

    byggScener(synlege, !noRute);

    // Kamera: oversikt over heile kapittelet. Eleven snur og zoomar sjølv.
    const alle = k.kamera === "land" ? null : punkt.length ? punkt : synlege.map(stadXZ);
    flyTil(alle ? passTil(alle) : LANDET(), 1800);
    figur.g.visible = punkt.length >= 1;
    pauseBtn.hidden = !noRute;
    oppdaterMarkor();
  }

  function hoppTilStopp(j) {
    if (!noRute) return;
    const s = noRute.stoppPos[j];
    noRute.framdrift = s.t; noRute.ferdig = true;
    const p = stadXZ(s.id);
    flyTil({ maal: new THREE.Vector3(p.x, hoegdVed(p.x, p.z) * EXAG, p.z), avstand: Math.min(kam.avstand, 140) }, 1200);
    pauseBtn.hidden = true;
    oppdaterMarkor();
    planleggNeste();
  }

  function settPause(p) {
    if (!noRute || noRute.ferdig) p = false;
    if (p === pausa) return;
    pausa = p;
    const no = performance.now();
    if (pausa) pauseStart = no; else if (noRute) noRute.t0 += no - pauseStart;
    pauseBtn.textContent = pausa ? "Hald fram" : "Pause";
    pauseBtn.setAttribute("aria-pressed", pausa);
  }

  function byggRuter() {
    const radius = Math.max(0.35, kam.avstand * 0.0032);
    byggLinjer(radius);
    tomGruppe(gruppeFor); tomGruppe(gruppeNo);
    for (const punkt of gruppeFor.userData.ruter || []) { const m = ruteMesh(punkt, radius * 0.8, materialFor); if (m) gruppeFor.add(m); }
    const kule = new THREE.SphereGeometry(radius * 1.9, 12, 8);
    const stoppIdar = noRute ? noRute.stoppPos.map(s => s.id) : kapIdx >= 0 ? SEKS[kapIdx].reise.stopp.map(s => s[0]) : [];
    for (const id of stoppIdar) {
      const p = stadXZ(id);
      const dot = new THREE.Mesh(kule, materialStopp);
      dot.position.set(p.x, hoegdVed(p.x, p.z) * EXAG + radius * 1.4 + 0.15 * EXAG, p.z);
      gruppeNo.add(dot);
    }
    if (noRute) {
      const m = ruteMesh(noRute.punkt, radius, materialNo);
      noRute.mesh = m; noRute.seg = m.geometry.parameters.tubularSegments;
      gruppeNo.add(m);
    }
    figur.g.scale.setScalar(radius * 2.8);
    bygdForAvstand = kam.avstand;
    oppdaterMarkor();
  }

  function oppdaterMarkor() {
    const s = figur.g.scale.x;
    if (!noRute || !noRute.mesh) {
      if (kapIdx >= 0 && SEKS[kapIdx].reise.stopp.length === 1) {
        const p = stadXZ(SEKS[kapIdx].reise.stopp[0][0]);
        figur.g.position.set(p.x, hoegdVed(p.x, p.z) * EXAG + 0.1 * EXAG, p.z);
      }
      stillFigur(0);
      return;
    }
    const u = Math.min(1, Math.max(0, noRute.framdrift));
    noRute.mesh.geometry.setDrawRange(0, Math.max(0, Math.floor(u * noRute.seg)) * 6 * 6);
    const sti = noRute.mesh.geometry.parameters.path;
    const p = sti.getPointAt(u);
    figur.g.position.set(p.x, p.y + s * 0.15, p.z);
    const t = sti.getTangentAt(u);
    if (t.x || t.z) figur.g.rotation.y = Math.atan2(t.x, t.z);
    // Gangsyklusen følgjer avstanden som er gått: eitt steg er om lag ei figurbreidd.
    stillFigur(noRute.ferdig ? 0 : (u * noRute.lengd) / (1.1 * s) * Math.PI);

    // Datoen står berre ved det siste stoppet figuren har nådd.
    let aktiv = null;
    for (const st of noRute.stoppPos) if (st.t <= u + 1e-6) aktiv = st;
    const stopp = SEKS[kapIdx].reise.stopp;
    for (const [id, el] of etikettar) {
      const erAktiv = aktiv && aktiv.id === id;
      el.classList.toggle("aktiv", !!erAktiv);
      const naadd = noRute.stoppPos.some(st => st.id === id && st.t <= u + 1e-6);
      el.classList.toggle("naadd", naadd);
      if (naadd) visScene(id);
      if (erAktiv) {
        const same = noRute.stoppPos.slice(0, noRute.stoppPos.indexOf(aktiv) + 1).filter(st => st.id === id).length - 1;
        const treff = stopp.filter(st => st[0] === id);
        el.querySelector(".stad-dato").textContent = (treff[same] || treff[0])[1];
      }
    }
  }

  const projV = new THREE.Vector3();
  function plasserEtikettar() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    const viste = [];
    const rekkje = [...etikettar.entries()].sort((a, b) => (b[1].classList.contains("aktiv") - a[1].classList.contains("aktiv")));
    for (const [id, el] of rekkje) {
      const p = stadXZ(id);
      projV.set(p.x, hoegdVed(p.x, p.z) * EXAG, p.z).project(camera);
      if (projV.z > 1 || projV.x < -1.05 || projV.x > 1.05 || projV.y < -1.05 || projV.y > 1.05) { el.style.display = "none"; continue; }
      const x = (projV.x + 1) / 2 * w, y = (1 - projV.y) / 2 * h;
      el.style.display = "";
      const r = { x1: x - 4, y1: y - 22, x2: x + el.offsetWidth + 6, y2: y + el.offsetHeight - 14 };
      if (viste.some(v => r.x1 < v.x2 && r.x2 > v.x1 && r.y1 < v.y2 && r.y2 > v.y1)) { el.style.display = "none"; continue; }
      viste.push(r);
      el.style.transform = `translate(${x.toFixed(0)}px, ${y.toFixed(0)}px)`;
    }
  }

  /* ---------- Framdrift i modulen ---------- */
  function erSvart(s) {
    const prog = Store.getModule(MOD.id);
    if (s.exerciseType === "freeText") { const t = Store.getText(MOD.id, s.id); return !!(t && t.value && t.value.trim()); }
    return !!(prog.sections || {})[s.id];
  }
  function oppdaterFramdrift() {
    const oppg = SEKS.filter(s => s.type === "exercise" || s.type === "reading");
    const gjort = oppg.filter(erSvart).length;
    oppFramdrift.textContent = `${gjort} av ${oppg.length} oppgåver`;
    SEKS.forEach((s, i) => { if (s.type === "exercise") kapListe.children[i].classList.toggle("svart", erSvart(s)); });
    const prog = Store.getModule(MOD.id);
    if (Modules.isModuleFullyDone(MOD, prog, Store.getAll().texts) && !prog.completed) Store.setCompleted(MOD.id, true);
  }
  document.addEventListener("exercise-answered", () => {
    oppdaterFramdrift();
    if (auto && seksIdx >= 0 && SEKS[seksIdx].type === "exercise") planleggNeste(5000);
  });

  /* ---------- Automatisk framdrift ---------- */
  let auto = false;
  autoBtn.addEventListener("click", () => {
    auto = !auto;
    autoBtn.setAttribute("aria-pressed", auto);
    autoBtn.textContent = auto ? "Stopp automatikken" : "Spel av automatisk";
    if (!auto) { clearTimeout(autoTimer); return; }
    const s = SEKS[seksIdx];
    if (erKapittel(s) ? !noRute || noRute.ferdig : erSvart(s)) planleggNeste();
  });
  // Går vidare av seg sjølv når ruta er gått og teksten er lesen. Ved ei
  // oppgåve ventar vi til eleven har svart.
  function planleggNeste(vent) {
    clearTimeout(autoTimer);
    if (!auto || seksIdx >= SEKS.length - 1) return;
    const s = SEKS[seksIdx];
    if (s.type === "exercise" && !erSvart(s)) return;
    const ord = (s.content || s.question || "").replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
    autoTimer = setTimeout(() => gaaTil(seksIdx + 1), vent ?? Math.max(9000, ord * 380));
  }

  /* ---------- Knappar og lister ---------- */
  forreBtn.addEventListener("click", () => gaaTil(seksIdx - 1));
  nesteBtn.addEventListener("click", () => gaaTil(seksIdx + 1));
  pauseBtn.addEventListener("click", () => settPause(!pausa));
  document.getElementById("landet-btn").addEventListener("click", () => flyTil(LANDET(), 1500));
  SEKS.forEach((s, i) => {
    const li = document.createElement("li");
    li.dataset.idx = i;
    li.className = erKapittel(s) ? "kapittel" : "oppgaave";
    const b = document.createElement("button");
    b.type = "button";
    const tid = document.createElement("span");
    tid.className = "kap-liste-tid";
    tid.textContent = erKapittel(s) ? s.reise.tid : "Oppgåve";
    b.append(tid, " ", s.title || "Prøv deg");
    b.addEventListener("click", () => gaaTil(i));
    li.appendChild(b);
    kapListe.appendChild(li);
  });
  const listeBtn = document.getElementById("liste-btn");
  listeBtn.addEventListener("click", () => {
    const open = kapListe.parentElement.toggleAttribute("hidden");
    listeBtn.setAttribute("aria-expanded", !open);
  });
  {
    // Lenkjer til modulane før og etter i Del 1, som på modulsida.
    const alle = Modules.orderedByPart(MOD.part);
    const idx = alle.findIndex(m => m.id === MOD.id);
    const lenkje = m => m.href || `modul.html?id=${encodeURIComponent(m.id)}`;
    const forrige = idx > 0 ? alle[idx - 1] : null, neste = idx < alle.length - 1 ? alle[idx + 1] : null;
    const a = (m, kl, tekst) => { const e = document.createElement("a"); e.className = "btn " + kl; e.href = lenkje(m); e.textContent = tekst; return e; };
    if (forrige) modulNav.appendChild(a(forrige, "secondary", forrige.title));
    const del = document.createElement("a"); del.className = "btn secondary"; del.href = `index.html#del-${MOD.part}`; del.textContent = `Til Del ${MOD.part}`;
    modulNav.appendChild(del);
    if (neste) modulNav.appendChild(a(neste, "", neste.title));
  }

  /* ---------- Teiknesløyfa: figuren, rutene og etikettane ---------- */
  function forRender(no) {
    if (noRute && !noRute.ferdig && !pausa) {
      const gaatt = no - noRute.t0;
      if (gaatt >= 0) {
        if (noRute.dur === 0 || gaatt >= noRute.dur) {
          noRute.framdrift = 1; noRute.ferdig = true; pauseBtn.hidden = true; planleggNeste();
        } else {
          let f = noRute.fasar.findIndex(x => gaatt < x.start + x.dur);
          if (f < 0) f = noRute.fasar.length - 1;
          const fase = noRute.fasar[f];
          noRute.framdrift = fase.fra + (fase.til - fase.fra) * Math.min(1, (gaatt - fase.start) / fase.dur);
        }
        oppdaterMarkor();
      }
    }
    if (!bygdForAvstand || Math.abs(kam.avstand - bygdForAvstand) > bygdForAvstand * 0.3) byggRuter();
  }

  /* ---------- Start ---------- */
  K.start({ forRender, etterRender: plasserEtikettar }).then(() => {
    const m = /#k=(\d+)/.exec(location.hash);
    const idx = m ? Math.min(SEKS.length, Math.max(1, +m[1])) - 1 : 0;
    lastEl.hidden = true;
    oppdaterFramdrift();
    // Startar eleven midt i modulen, må kartet først vise det siste kapittelet før.
    let sisteKap = idx;
    while (sisteKap > 0 && !erKapittel(SEKS[sisteKap])) sisteKap--;
    if (sisteKap !== idx && erKapittel(SEKS[sisteKap])) { visSeksjon(sisteKap); if (noRute) { noRute.framdrift = 1; noRute.ferdig = true; pauseBtn.hidden = true; } }
    visSeksjon(idx);
    const zoom = +new URLSearchParams(location.search).get("zoom");   // til testing: startavstand i km
    if (zoom) { K.fullforTween(); kam.avstand = klemAvstand(zoom); }
  }).catch(e => {
    lastEl.innerHTML = e.message === "webgl"
      ? "<p>Nettlesaren din kan ikkje vise 3D-grafikk (WebGL). Prøv ein nyare nettlesar, eller les om reisene i modulen <a href=\"modul.html?id=historie-aasen\">Ivar Aasen og landsmålet</a>.</p>"
      : `<p>Kartet kunne ikkje lastast: ${e.message}</p>`;
  });
})();
