/* 3D-kartet over reisene til Ivar Aasen.

   Kartet er eitt trekantnett bygd av høgdekartet i data/noreg-terreng.js
   (laga av tools/lag-terreng.js). Kvar piksel i høgdekartet er 2 km, og
   høgdene er overdrivne (EXAG) for at fjell og fjordar skal synast frå lufta.
   Stadene i js/content/aasen-reise.js blir plasserte med same
   kjegleprojeksjonen som høgdekartet, og ruta i kvart kapittel blir teikna som
   ei slange lagd oppå terrenget, som veks fram medan markøren flyttar seg.

   Alt her er reint klientside: three.js ligg i js/vendor, og høgdekartet er
   bakt inn som base64, så sida verkar òg opna rett frå disk. */
(function () {
  "use strict";

  const T = window.NOREG_TERRENG;
  const D = window.AASEN_REISE;
  const rotEl = document.getElementById("kart");
  const canvas = document.getElementById("kart-lerret");
  const etikettEl = document.getElementById("etikettar");
  const lastEl = document.getElementById("kart-lastar");

  const EXAG = 6.5;               // vertikal overdriving av høgdene
  const KM = T.kmPerPx, W = T.breidd, H = T.hogd;
  const BREIDD_KM = W * KM, HOGD_KM = H * KM;
  const reduserRorsle = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Projeksjon (må vere lik tools/lag-terreng.js) ---------- */
  const rad = g => g * Math.PI / 180;
  const { phi1, phi2, phi0, lam0, R } = T.proj;
  const n = Math.log(Math.cos(rad(phi1)) / Math.cos(rad(phi2))) /
    Math.log(Math.tan(Math.PI / 4 + rad(phi2) / 2) / Math.tan(Math.PI / 4 + rad(phi1) / 2));
  const F = Math.cos(rad(phi1)) * Math.pow(Math.tan(Math.PI / 4 + rad(phi1) / 2), n) / n;
  const rho0 = F / Math.pow(Math.tan(Math.PI / 4 + rad(phi0) / 2), n);
  function verdXZ(lat, lon) {
    const rho = F / Math.pow(Math.tan(Math.PI / 4 + rad(lat) / 2), n);
    const th = n * rad(lon - lam0);
    const px = R * rho * Math.sin(th), py = R * (rho0 - rho * Math.cos(th));
    return { x: px - T.x0 - BREIDD_KM / 2, z: T.y0 - py - HOGD_KM / 2 };
  }

  /* ---------- Høgdekartet ---------- */
  let hoegd, maske, djup;      // per piksel: km over havet, landmaske, havdjup 0..1
  function lesTerreng() {
    return new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas");
        c.width = W; c.height = H;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const d = ctx.getImageData(0, 0, W, H).data;
        hoegd = new Float32Array(W * H); maske = new Uint8Array(W * H); djup = new Float32Array(W * H);
        for (let i = 0; i < W * H; i++) {
          const r = d[i * 4] / 255;
          hoegd[i] = r * r * T.hMaks / 1000;
          djup[i] = d[i * 4 + 1] / 255;
          maske[i] = d[i * 4 + 2];
        }
        res();
      };
      img.onerror = () => rej(new Error("Kunne ikkje lese høgdekartet"));
      img.src = T.png;
    });
  }
  // Høgd i km på eit punkt i verda (bilineær mellom pikselsentra).
  function hoegdVed(x, z) {
    const c = Math.min(W - 1.001, Math.max(0, (x + BREIDD_KM / 2) / KM - 0.5));
    const r = Math.min(H - 1.001, Math.max(0, (z + HOGD_KM / 2) / KM - 0.5));
    const c0 = Math.floor(c), r0 = Math.floor(r), fc = c - c0, fr = r - r0;
    const i = r0 * W + c0;
    const h = (hoegd[i] * (1 - fc) + hoegd[i + 1] * fc) * (1 - fr) + (hoegd[i + W] * (1 - fc) + hoegd[i + W + 1] * fc) * fr;
    return Math.max(h, 0);
  }

  /* ---------- Fargar ---------- */
  const RAMPE = [
    [0.00, [0.66, 0.75, 0.55]], [0.15, [0.75, 0.78, 0.56]], [0.45, [0.80, 0.74, 0.54]],
    [0.90, [0.72, 0.66, 0.56]], [1.40, [0.78, 0.76, 0.72]], [1.90, [0.93, 0.93, 0.91]], [2.50, [1, 1, 1]],
  ];
  const HAV_GRUNT = [0.78, 0.86, 0.91], HAV_DJUPT = [0.62, 0.75, 0.84], ANNA_LAND = [0.89, 0.88, 0.84];
  function rampe(h) {
    for (let i = 1; i < RAMPE.length; i++) if (h <= RAMPE[i][0]) {
      const [h0, a] = RAMPE[i - 1], [h1, b] = RAMPE[i], t = (h - h0) / (h1 - h0);
      return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
    }
    return RAMPE[RAMPE.length - 1][1];
  }
  function farge(i) {
    if (!maske[i]) { const t = djup[i]; return [HAV_GRUNT[0] + (HAV_DJUPT[0] - HAV_GRUNT[0]) * t, HAV_GRUNT[1] + (HAV_DJUPT[1] - HAV_GRUNT[1]) * t, HAV_GRUNT[2] + (HAV_DJUPT[2] - HAV_GRUNT[2]) * t]; }
    const c = rampe(hoegd[i]);
    if (maske[i] === 255) return c;
    return [c[0] + (ANNA_LAND[0] - c[0]) * 0.7, c[1] + (ANNA_LAND[1] - c[1]) * 0.7, c[2] + (ANNA_LAND[2] - c[2]) * 0.7];
  }

  /* ---------- Scene ---------- */
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue("--bg").trim() || "#fbfaf6");
  const camera = new THREE.PerspectiveCamera(42, 1, 1, 20000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const sol = new THREE.DirectionalLight(0xffffff, 0.85);
  sol.position.set(-900, 1100, -500);
  scene.add(sol);

  let terrengMesh = null;
  function byggTerreng(steg) {
    if (terrengMesh) { scene.remove(terrengMesh); terrengMesh.geometry.dispose(); }
    const cols = Math.ceil(W / steg), rows = Math.ceil(H / steg);
    const pos = new Float32Array(cols * rows * 3), col = new Float32Array(cols * rows * 3);
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const px = Math.min(W - 1, c * steg), py = Math.min(H - 1, r * steg), i = py * W + px, o = (r * cols + c) * 3;
      pos[o] = (px + 0.5) * KM - BREIDD_KM / 2;
      pos[o + 1] = maske[i] ? Math.max(hoegd[i], 0.03) * EXAG : -0.3 * EXAG;
      pos[o + 2] = (py + 0.5) * KM - HOGD_KM / 2;
      const f = farge(i); col[o] = f[0]; col[o + 1] = f[1]; col[o + 2] = f[2];
    }
    const idx = new Uint32Array((cols - 1) * (rows - 1) * 6);
    let k = 0;
    for (let r = 0; r < rows - 1; r++) for (let c = 0; c < cols - 1; c++) {
      const a = r * cols + c, b = a + 1, d = a + cols, e = d + 1;
      idx[k++] = a; idx[k++] = d; idx[k++] = b; idx[k++] = b; idx[k++] = d; idx[k++] = e;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    g.setIndex(new THREE.BufferAttribute(idx, 1));
    g.computeVertexNormals();
    terrengMesh = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ vertexColors: true }));
    scene.add(terrengMesh);
  }

  /* ---------- Kamera: krinsar om eit mål på bakken ---------- */
  const kam = { maal: new THREE.Vector3(0, 0, 0), avstand: 2000, theta: 0, phi: 0.5 };
  let tween = null;
  const easing = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  function oppdaterKamera() {
    const { maal, avstand, theta, phi } = kam;
    camera.position.set(maal.x + avstand * Math.sin(phi) * Math.sin(theta), maal.y + avstand * Math.cos(phi), maal.z + avstand * Math.sin(phi) * Math.cos(theta));
    camera.lookAt(maal);
    camera.near = Math.max(0.5, avstand / 200); camera.far = avstand * 8 + 4000;
    camera.updateProjectionMatrix();
  }
  function flyTil(til, varigheit) {
    if (reduserRorsle || varigheit === 0) {
      Object.assign(kam, { avstand: til.avstand ?? kam.avstand, theta: til.theta ?? kam.theta, phi: til.phi ?? kam.phi });
      if (til.maal) kam.maal.copy(til.maal);
      tween = null; return;
    }
    let dTheta = ((til.theta ?? kam.theta) - kam.theta) % (2 * Math.PI);
    if (dTheta > Math.PI) dTheta -= 2 * Math.PI; if (dTheta < -Math.PI) dTheta += 2 * Math.PI;
    tween = {
      fra: { maal: kam.maal.clone(), avstand: kam.avstand, theta: kam.theta, phi: kam.phi },
      til: { maal: til.maal ? til.maal.clone() : kam.maal.clone(), avstand: til.avstand ?? kam.avstand, theta: kam.theta + dTheta, phi: til.phi ?? kam.phi },
      t0: performance.now(), dur: varigheit,
    };
  }
  function stegTween(no) {
    if (!tween) return;
    const u = easing(Math.min(1, (no - tween.t0) / tween.dur));
    kam.maal.lerpVectors(tween.fra.maal, tween.til.maal, u);
    kam.avstand = tween.fra.avstand + (tween.til.avstand - tween.fra.avstand) * u;
    kam.theta = tween.fra.theta + (tween.til.theta - tween.fra.theta) * u;
    kam.phi = tween.fra.phi + (tween.til.phi - tween.fra.phi) * u;
    if (u >= 1) tween = null;
  }
  // Kameraoppsett som viser alle punkta (i XZ-planet).
  function passTil(punkt, ekstra) {
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (const p of punkt) { minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x); minZ = Math.min(minZ, p.z); maxZ = Math.max(maxZ, p.z); }
    const cx = (minX + maxX) / 2, cz = (minZ + maxZ) / 2;
    const utstrekning = Math.max(maxX - minX, (maxZ - minZ) * 1.15, 40);
    const aspekt = Math.min(1, renderer.domElement.clientWidth / Math.max(1, renderer.domElement.clientHeight));
    const avstand = Math.max(70, utstrekning / aspekt / (2 * Math.tan(rad(camera.fov / 2))) * 1.25 + 30);
    return Object.assign({ maal: new THREE.Vector3(cx, hoegdVed(cx, cz) * EXAG, cz), avstand, theta: 0, phi: 0.72 }, ekstra);
  }
  const LANDET = () => passTil([{ x: -BREIDD_KM * 0.42, z: -HOGD_KM * 0.46 }, { x: BREIDD_KM * 0.3, z: HOGD_KM * 0.46 }], { phi: 0.42, theta: 0 });

  /* ---------- Peikar og tastatur ---------- */
  const peikarar = new Map();
  let brukarHarSnudd = false, sistPinch = 0;
  canvas.addEventListener("pointerdown", e => { canvas.setPointerCapture(e.pointerId); peikarar.set(e.pointerId, { x: e.clientX, y: e.clientY, knapp: e.button, shift: e.shiftKey || e.ctrlKey }); });
  canvas.addEventListener("pointerup", e => peikarar.delete(e.pointerId));
  canvas.addEventListener("pointercancel", e => peikarar.delete(e.pointerId));
  canvas.addEventListener("pointermove", e => {
    const p = peikarar.get(e.pointerId); if (!p) return;
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    p.x = e.clientX; p.y = e.clientY;
    tween = null; brukarHarSnudd = true;
    if (peikarar.size >= 2) {
      const [a, b] = [...peikarar.values()];
      const avst = Math.hypot(a.x - b.x, a.y - b.y);
      if (sistPinch) kam.avstand = klemAvstand(kam.avstand * sistPinch / avst);
      sistPinch = avst;
      panorer(dx / 2, dy / 2);
      return;
    }
    sistPinch = 0;
    if (p.knapp === 2 || p.shift) panorer(dx, dy);
    else { kam.theta -= dx * 0.005; kam.phi = Math.min(1.35, Math.max(0.1, kam.phi - dy * 0.005)); }
  });
  canvas.addEventListener("contextmenu", e => e.preventDefault());
  canvas.addEventListener("wheel", e => { e.preventDefault(); tween = null; brukarHarSnudd = true; kam.avstand = klemAvstand(kam.avstand * Math.exp(e.deltaY * 0.0012)); }, { passive: false });
  const klemAvstand = a => Math.min(4500, Math.max(25, a));
  function panorer(dx, dy) {
    const k = kam.avstand * 0.0016;
    const fx = -Math.sin(kam.theta), fz = -Math.cos(kam.theta);   // framover langs bakken
    const rx = Math.cos(kam.theta), rz = -Math.sin(kam.theta);    // til høgre
    kam.maal.x = Math.min(BREIDD_KM / 2, Math.max(-BREIDD_KM / 2, kam.maal.x - rx * dx * k - fx * dy * k));
    kam.maal.z = Math.min(HOGD_KM / 2, Math.max(-HOGD_KM / 2, kam.maal.z - rz * dx * k - fz * dy * k));
    kam.maal.y = hoegdVed(kam.maal.x, kam.maal.z) * EXAG;
  }
  document.addEventListener("keydown", e => {
    if (e.target.closest("input, textarea, select")) return;
    if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") { e.preventDefault(); gaaTil(kapIdx + 1); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); gaaTil(kapIdx - 1); }
    else if (e.key === "Home") { e.preventDefault(); gaaTil(0); }
    else if (e.key === "End") { e.preventDefault(); gaaTil(D.kapittel.length - 1); }
  });

  /* ---------- Ruter og markørar ---------- */
  const RUTE_NO = new THREE.Color("#b76a2b"), RUTE_FOR = new THREE.Color("#c9ad8e"), MARKOR = new THREE.Color("#1f5d4c");
  const materialNo = new THREE.MeshBasicMaterial({ color: RUTE_NO });
  const materialFor = new THREE.MeshBasicMaterial({ color: RUTE_FOR });
  const materialStopp = new THREE.MeshBasicMaterial({ color: RUTE_NO });
  const gruppeFor = new THREE.Group(), gruppeNo = new THREE.Group();
  scene.add(gruppeFor, gruppeNo);
  const markor = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), new THREE.MeshLambertMaterial({ color: MARKOR }));
  const markorRing = new THREE.Mesh(new THREE.RingGeometry(1.6, 2.2, 32), new THREE.MeshBasicMaterial({ color: MARKOR, side: THREE.DoubleSide, transparent: true, opacity: 0.55 }));
  markorRing.rotation.x = -Math.PI / 2;
  markor.visible = markorRing.visible = false;
  scene.add(markor, markorRing);

  // Ei rute er ei liste punkt {x, z, h} med ~2,5 km mellomrom, drapert på terrenget.
  function lagRute(stoppIdar) {
    const punkt = [];
    for (let i = 0; i < stoppIdar.length; i++) {
      const s = D.stader[stoppIdar[i]];
      const p = verdXZ(s.lat, s.lon);
      if (i === 0) { punkt.push({ x: p.x, z: p.z, h: hoegdVed(p.x, p.z) }); continue; }
      const q = punkt[punkt.length - 1];
      const nSeg = Math.max(1, Math.ceil(Math.hypot(p.x - q.x, p.z - q.z) / 2.5));
      for (let j = 1; j <= nSeg; j++) {
        const x = q.x + (p.x - q.x) * j / nSeg, z = q.z + (p.z - q.z) * j / nSeg;
        punkt.push({ x, z, h: hoegdVed(x, z) });
      }
    }
    return punkt;
  }
  function ruteKurve(punkt, radius) {
    const loft = radius * 1.4 + 0.15 * EXAG;
    const v = punkt.map(p => new THREE.Vector3(p.x, p.h * EXAG + loft, p.z));
    const sti = new THREE.CurvePath();
    for (let i = 1; i < v.length; i++) sti.add(new THREE.LineCurve3(v[i - 1], v[i]));
    return sti;
  }
  function ruteMesh(punkt, radius, material) {
    if (punkt.length < 2) return null;
    const sti = ruteKurve(punkt, radius);
    const seg = Math.max(2, Math.round(sti.getLength() / 2));
    return new THREE.Mesh(new THREE.TubeGeometry(sti, seg, radius, 6, false), material);
  }
  function tomGruppe(g) { while (g.children.length) { const c = g.children.pop(); if (c.geometry) c.geometry.dispose(); } }

  /* ---------- Kapittel ---------- */
  let kapIdx = -1;
  let noRute = null;       // { punkt, mesh, seg, framdrift, dur, t0, stoppPos: [{id, t}] }
  let bygdForAvstand = 0;
  let autoTimer = null;
  const etikettar = new Map(); // id -> element

  const kapTid = document.getElementById("kap-tid"), kapTittel = document.getElementById("kap-tittel"),
    kapTekst = document.getElementById("kap-tekst"), kapTeljar = document.getElementById("kap-teljar"),
    ruteListe = document.getElementById("rute-liste"), forreBtn = document.getElementById("forre"),
    nesteBtn = document.getElementById("neste"), kapListe = document.getElementById("kap-liste"),
    autoBtn = document.getElementById("auto-btn");

  function gaaTil(i) {
    if (i < 0 || i >= D.kapittel.length || i === kapIdx) return;
    visKapittel(i);
  }

  function visKapittel(i) {
    kapIdx = i;
    const k = D.kapittel[i];
    clearTimeout(autoTimer);
    brukarHarSnudd = false;
    if (history.replaceState) history.replaceState(null, "", "#k=" + (i + 1));

    kapTid.textContent = k.tid;
    kapTittel.textContent = k.tittel;
    kapTekst.innerHTML = k.tekst;
    kapTeljar.textContent = `Kapittel ${i + 1} av ${D.kapittel.length}`;
    forreBtn.disabled = i === 0;
    nesteBtn.disabled = i === D.kapittel.length - 1;
    nesteBtn.textContent = i === D.kapittel.length - 1 ? "Slutt" : "Neste";
    for (const li of kapListe.children) li.classList.toggle("aktiv", +li.dataset.idx === i);
    const aktivLi = kapListe.children[i];
    if (aktivLi && aktivLi.scrollIntoView) aktivLi.scrollIntoView({ block: "nearest" });
    document.querySelector(".reise-panel").scrollTop = 0;

    // Stopplista i panelet
    ruteListe.innerHTML = "";
    k.stopp.forEach(([id, dato], j) => {
      const li = document.createElement("li");
      const b = document.createElement("button");
      b.type = "button";
      b.innerHTML = `<span class="rute-namn">${D.stader[id].namn}</span><span class="rute-dato">${dato}</span>`;
      b.addEventListener("click", () => hoppTilStopp(j));
      li.appendChild(b);
      ruteListe.appendChild(li);
    });
    ruteListe.parentElement.hidden = k.stopp.length === 0;

    // Tidlegare ruter, dempa
    tomGruppe(gruppeFor); tomGruppe(gruppeNo);
    const punktFor = [];
    for (let j = 0; j < i; j++) if (D.kapittel[j].stopp.length >= 2) punktFor.push(lagRute(D.kapittel[j].stopp.map(s => s[0])));
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
        if (j > 0) { const a = verdXZ(D.stader[idar[j - 1]].lat, D.stader[idar[j - 1]].lon), b = verdXZ(D.stader[idar[j]].lat, D.stader[idar[j]].lon); akk += Math.hypot(b.x - a.x, b.z - a.z); }
        stoppPos.push({ id: idar[j], t: akk });
      }
      const tot = stoppPos[stoppPos.length - 1].t || 1;
      stoppPos.forEach(s => { s.t = s.t / tot; });
      noRute = { punkt, idar, stoppPos, lengd, framdrift: 0, dur: reduserRorsle ? 0 : Math.min(11000, Math.max(2500, lengd / 0.13)), t0: performance.now() + 900, mesh: null, seg: 0 };
    }
    bygdForAvstand = 0; // tvinger ny oppbygging med rett tjukkleik

    // Etikettar
    etikettEl.innerHTML = ""; etikettar.clear();
    const synlege = idar.length ? [...new Set(idar)] : [];
    for (const id of synlege) {
      const el = document.createElement("div");
      el.className = "stad-etikett";
      el.innerHTML = `<span class="stad-namn">${D.stader[id].namn}</span><span class="stad-dato"></span>`;
      etikettEl.appendChild(el);
      etikettar.set(id, el);
    }

    // Kamera
    const alle = k.kamera === "land" ? null : punkt.length ? punkt : synlege.map(id => verdXZ(D.stader[id].lat, D.stader[id].lon));
    flyTil(alle ? passTil(alle) : LANDET(), 1800);
    markor.visible = markorRing.visible = punkt.length >= 2;
    if (punkt.length === 1) { markor.visible = markorRing.visible = true; }
    oppdaterMarkor();
  }

  function hoppTilStopp(j) {
    if (!noRute) return;
    const s = noRute.stoppPos[j];
    noRute.framdrift = s.t; noRute.t0 = -Infinity; noRute.ferdig = true;
    const st = D.stader[s.id], p = verdXZ(st.lat, st.lon);
    brukarHarSnudd = true;
    flyTil({ maal: new THREE.Vector3(p.x, hoegdVed(p.x, p.z) * EXAG, p.z), avstand: Math.min(kam.avstand, 140) }, 1200);
    oppdaterMarkor();
    planleggNeste();
  }

  function byggRuter() {
    const radius = Math.max(0.35, kam.avstand * 0.0032);
    tomGruppe(gruppeFor); tomGruppe(gruppeNo);
    for (const punkt of gruppeFor.userData.ruter || []) { const m = ruteMesh(punkt, radius * 0.8, materialFor); if (m) gruppeFor.add(m); }
    if (noRute) {
      const m = ruteMesh(noRute.punkt, radius, materialNo);
      noRute.mesh = m; noRute.seg = m.geometry.parameters.tubularSegments;
      gruppeNo.add(m);
      const kule = new THREE.SphereGeometry(radius * 1.9, 12, 8);
      for (const s of noRute.stoppPos) {
        const st = D.stader[s.id], p = verdXZ(st.lat, st.lon);
        const dot = new THREE.Mesh(kule, materialStopp);
        dot.position.set(p.x, hoegdVed(p.x, p.z) * EXAG + radius * 1.4 + 0.15 * EXAG, p.z);
        gruppeNo.add(dot);
      }
    } else if (kapIdx >= 0) {
      const kule = new THREE.SphereGeometry(radius * 1.9, 12, 8);
      for (const [id] of D.kapittel[kapIdx].stopp) {
        const st = D.stader[id], p = verdXZ(st.lat, st.lon);
        const dot = new THREE.Mesh(kule, materialStopp);
        dot.position.set(p.x, hoegdVed(p.x, p.z) * EXAG + radius * 1.4 + 0.15 * EXAG, p.z);
        gruppeNo.add(dot);
      }
    }
    const s = radius * 2.6;
    markor.scale.setScalar(s); markorRing.scale.setScalar(s);
    bygdForAvstand = kam.avstand;
    oppdaterMarkor();
  }

  function oppdaterMarkor() {
    if (!noRute || !noRute.mesh) {
      if (kapIdx >= 0 && D.kapittel[kapIdx].stopp.length === 1) {
        const st = D.stader[D.kapittel[kapIdx].stopp[0][0]], p = verdXZ(st.lat, st.lon);
        markor.position.set(p.x, hoegdVed(p.x, p.z) * EXAG + markor.scale.x, p.z);
        markorRing.position.set(p.x, hoegdVed(p.x, p.z) * EXAG + 0.3, p.z);
      }
      return;
    }
    const u = noRute.framdrift;
    noRute.mesh.geometry.setDrawRange(0, Math.max(0, Math.floor(u * noRute.seg)) * 6 * 6);
    const sti = noRute.mesh.geometry.parameters.path;
    const p = sti.getPointAt(Math.min(1, Math.max(0, u)));
    markor.position.set(p.x, p.y + markor.scale.x * 0.6, p.z);
    markorRing.position.set(p.x, hoegdVed(p.x, p.z) * EXAG + 0.3, p.z);
    // Datoen står berre ved det siste stoppet markøren har nådd.
    let aktiv = null;
    for (const s of noRute.stoppPos) if (s.t <= u + 1e-6) aktiv = s;
    const kap = D.kapittel[kapIdx];
    for (const [id, el] of etikettar) {
      const erAktiv = aktiv && aktiv.id === id;
      el.classList.toggle("aktiv", !!erAktiv);
      const naadd = noRute.stoppPos.some(s => s.id === id && s.t <= u + 1e-6);
      el.classList.toggle("naadd", naadd);
      if (erAktiv) {
        const stopp = kap.stopp.filter(s => s[0] === id);
        const j = noRute.stoppPos.indexOf(aktiv);
        const same = noRute.stoppPos.slice(0, j + 1).filter(s => s.id === id).length - 1;
        el.querySelector(".stad-dato").textContent = (stopp[same] || stopp[0])[1];
      }
    }
  }

  const projV = new THREE.Vector3();
  function plasserEtikettar() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    const viste = [];
    const rekkje = [...etikettar.entries()].sort((a, b) => (b[1].classList.contains("aktiv") - a[1].classList.contains("aktiv")));
    for (const [id, el] of rekkje) {
      const st = D.stader[id], p = verdXZ(st.lat, st.lon);
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

  /* ---------- Automatisk framdrift ---------- */
  let auto = false;
  autoBtn.addEventListener("click", () => {
    auto = !auto;
    autoBtn.setAttribute("aria-pressed", auto);
    autoBtn.textContent = auto ? "Stopp automatikken" : "Spel av automatisk";
    if (auto && noRute && noRute.ferdig) planleggNeste();
    if (auto && !noRute) planleggNeste();
    if (!auto) clearTimeout(autoTimer);
  });
  function planleggNeste() {
    clearTimeout(autoTimer);
    if (!auto || kapIdx >= D.kapittel.length - 1) return;
    const ord = D.kapittel[kapIdx].tekst.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
    autoTimer = setTimeout(() => gaaTil(kapIdx + 1), Math.max(9000, ord * 380));
  }

  /* ---------- Knappar ---------- */
  forreBtn.addEventListener("click", () => gaaTil(kapIdx - 1));
  nesteBtn.addEventListener("click", () => gaaTil(kapIdx + 1));
  document.getElementById("landet-btn").addEventListener("click", () => { brukarHarSnudd = true; flyTil(LANDET(), 1500); });
  D.kapittel.forEach((k, i) => {
    const li = document.createElement("li");
    li.dataset.idx = i;
    const b = document.createElement("button");
    b.type = "button";
    b.innerHTML = `<span class="kap-liste-tid">${k.tid}</span> ${k.tittel}`;
    b.addEventListener("click", () => gaaTil(i));
    li.appendChild(b);
    kapListe.appendChild(li);
  });
  const listeBtn = document.getElementById("liste-btn");
  listeBtn.addEventListener("click", () => {
    const open = kapListe.parentElement.toggleAttribute("hidden");
    listeBtn.setAttribute("aria-expanded", !open);
  });

  /* ---------- Storleik og teiknesløyfe ---------- */
  function tilpass() {
    const w = rotEl.clientWidth, h = rotEl.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", tilpass);

  const rammetider = [];
  let steg = 1, sistRamme = 0;
  function teikn(no) {
    requestAnimationFrame(teikn);
    stegTween(no);
    if (noRute && !noRute.ferdig) {
      const u = noRute.dur === 0 ? 1 : Math.min(1, (no - noRute.t0) / noRute.dur);
      if (u >= 0) {
        noRute.framdrift = u;
        if (u >= 1) { noRute.ferdig = true; planleggNeste(); }
        oppdaterMarkor();
      }
    }
    if (!bygdForAvstand || Math.abs(kam.avstand - bygdForAvstand) > bygdForAvstand * 0.3) byggRuter();
    oppdaterKamera();
    renderer.render(scene, camera);
    plasserEtikettar();

    // Går det tregt på denne maskina, bygg terrenget grovare.
    if (steg === 1 && sistRamme) {
      rammetider.push(no - sistRamme);
      if (rammetider.length === 90) {
        const sortert = rammetider.slice().sort((a, b) => a - b);
        if (sortert[45] > 34) { steg = 2; byggTerreng(2); }
      }
    }
    sistRamme = no;
  }

  /* ---------- Start ---------- */
  function start() {
    const parm = new URLSearchParams(location.search);
    if (parm.get("steg") === "2") steg = 2;
    byggTerreng(steg);
    tilpass();
    const m = /#k=(\d+)/.exec(location.hash);
    const idx = m ? Math.min(D.kapittel.length, Math.max(1, +m[1])) - 1 : 0;
    Object.assign(kam, LANDET());
    kam.avstand *= 1.6;
    oppdaterKamera();
    lastEl.hidden = true;
    visKapittel(idx);
    requestAnimationFrame(teikn);
  }

  const glTest = document.createElement("canvas");
  if (!(glTest.getContext("webgl2") || glTest.getContext("webgl"))) {
    lastEl.innerHTML = "<p>Nettlesaren din kan ikkje vise 3D-grafikk (WebGL). Prøv ein nyare nettlesar, eller les om reisene i modulen <a href=\"modul.html?id=historie-aasen\">Ivar Aasen og landsmålet</a>.</p>";
  } else {
    lesTerreng().then(start).catch(e => { lastEl.innerHTML = `<p>Kartet kunne ikkje lastast: ${e.message}</p>`; });
  }
})();
