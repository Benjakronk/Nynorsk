/* 3D-kartet over reisene til Ivar Aasen, og sida som viser modulen
   «Reisene til Ivar Aasen» (Del 1) éin seksjon om gongen.

   Kartet er eitt trekantnett bygd av høgdekartet i data/noreg-terreng.js
   (laga av tools/lag-terreng.js). Kvar piksel i høgdekartet er 1,25 km, og
   høgdene er overdrivne (EXAG) for at fjell og fjordar skal synast frå lufta.
   Fargane ligg i eit kartbilete som blir teikna éin gong ved oppstart:
   høgdefargar, relieffskugge frå høgdekartet, hav med djupfargar, innsjøar,
   brear og riksgrensa. Biletet blir lagt oppå terrenget som tekstur, så
   detaljane er per piksel, ikkje per hjørne i nettet.
   Stadene i js/content/aasen-reise.js blir plasserte med same
   kjegleprojeksjonen som høgdekartet. Kvart kapittel (lesson med `reise`)
   teiknar ruta si som ei slange lagd oppå terrenget, og ein liten figur av
   Aasen går langs henne. Oppgåvene mellom kapitla blir teikna av
   js/exercises.js og lagra som i resten av kurset, så modulen får framdrift
   og «Fullført» på oversikta.

   Alt her er reint klientside: three.js ligg i js/vendor, og høgdekartet er
   bakt inn som base64, så sida verkar òg opna rett frå disk. */
(function () {
  "use strict";

  const T = window.NOREG_TERRENG;
  const STADER = window.AASEN_REISE.stader;
  const MOD = Modules.get("historie-aasen-reise");
  const SEKS = MOD.sections;
  const erKapittel = s => s.type === "lesson" && !!s.reise;
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
  const stadXZ = id => verdXZ(STADER[id].lat, STADER[id].lon);

  /* ---------- Høgdekartet ---------- */
  const KL = T.klassar;        // hav, innsjo, annaLand, bre, noreg
  let hoegd, maske, djup;      // per piksel: km over havet, klasse, havdjup 0..1
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
  const HAV_GRUNT = [0.80, 0.88, 0.92], HAV_DJUPT = [0.58, 0.73, 0.84], ANNA_LAND = [0.90, 0.89, 0.85];
  const INNSJO = [0.62, 0.78, 0.88], BRE = [0.95, 0.97, 0.99], GRENSE = [0.55, 0.47, 0.42];
  function rampe(h) {
    for (let i = 1; i < RAMPE.length; i++) if (h <= RAMPE[i][0]) {
      const [h0, a] = RAMPE[i - 1], [h1, b] = RAMPE[i], t = (h - h0) / (h1 - h0);
      return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
    }
    return RAMPE[RAMPE.length - 1][1];
  }
  const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  function farge(i) {
    const kl = maske[i];
    if (kl === KL.hav) return mix(HAV_GRUNT, HAV_DJUPT, djup[i]);
    if (kl === KL.innsjo) return INNSJO;
    let c = kl === KL.bre ? BRE : rampe(hoegd[i]);
    if (kl === KL.annaLand) c = mix(c, ANNA_LAND, 0.7);
    // Relieffskugge: lys frå nordvest 45° over horisonten, rekna av hellinga
    // i høgdekartet, med litt grunnlys så nordaustsidene ikkje blir svarte.
    const s = 0.52 + 0.48 * skugge(i);
    return [c[0] * s, c[1] * s, c[2] * s];
  }
  const SKUGGE_Z = 4;   // overdriving av hellinga i skuggen
  const hLand = i => maske[i] ? hoegd[i] : 0;
  function skugge(i) {
    const r = i % W, k = (i - r) / W;
    const dx = (hLand(k * W + Math.min(W - 1, r + 1)) - hLand(k * W + Math.max(0, r - 1))) / (2 * KM) * SKUGGE_Z;
    const dy = (hLand(Math.min(H - 1, k + 1) * W + r) - hLand(Math.max(0, k - 1) * W + r)) / (2 * KM) * SKUGGE_Z;
    const n = 1 / Math.sqrt(dx * dx + dy * dy + 1);
    return Math.max(0, (dx * 0.5 + dy * 0.5 + Math.SQRT1_2) * n);
  }
  // Riksgrensa: norsk landpiksel med anna land som nabo
  function erGrense(i) {
    if (maske[i] !== KL.noreg) return false;
    const r = i % W;
    for (const n of [i - 1, i + 1, i - W, i + W]) {
      if (n < 0 || n >= W * H) continue;
      if ((n === i - 1 && r === 0) || (n === i + 1 && r === W - 1)) continue;
      if (maske[n] === KL.annaLand) return true;
    }
    return false;
  }
  function lagKartbilete() {
    const c = document.createElement("canvas");
    c.width = W; c.height = H;
    const ctx = c.getContext("2d");
    const bilete = ctx.createImageData(W, H), d = bilete.data;
    for (let i = 0; i < W * H; i++) {
      const f = erGrense(i) ? GRENSE : farge(i);
      d[i * 4] = f[0] * 255; d[i * 4 + 1] = f[1] * 255; d[i * 4 + 2] = f[2] * 255; d[i * 4 + 3] = 255;
    }
    ctx.putImageData(bilete, 0, 0);
    const tekstur = new THREE.CanvasTexture(c);
    tekstur.flipY = false;
    tekstur.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return tekstur;
  }

  /* ---------- Scene ---------- */
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue("--bg").trim() || "#fbfaf6");
  const camera = new THREE.PerspectiveCamera(42, 1, 1, 20000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  // Lyset er for figuren, rutene og scenene. Terrenget har skuggen bakt inn i kartbiletet.
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const sol = new THREE.DirectionalLight(0xffffff, 0.85);
  sol.position.set(-900, 1100, -500);
  scene.add(sol);

  let terrengMesh = null, kartbilete = null;
  function byggTerreng(steg) {
    if (terrengMesh) { scene.remove(terrengMesh); terrengMesh.geometry.dispose(); }
    if (!kartbilete) kartbilete = lagKartbilete();
    const cols = Math.ceil(W / steg), rows = Math.ceil(H / steg);
    const pos = new Float32Array(cols * rows * 3), uv = new Float32Array(cols * rows * 2);
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const px = Math.min(W - 1, c * steg), py = Math.min(H - 1, r * steg), i = py * W + px, o = (r * cols + c) * 3;
      pos[o] = (px + 0.5) * KM - BREIDD_KM / 2;
      pos[o + 1] = maske[i] ? Math.max(hoegd[i], 0.03) * EXAG : -0.3 * EXAG;
      pos[o + 2] = (py + 0.5) * KM - HOGD_KM / 2;
      uv[(r * cols + c) * 2] = (px + 0.5) / W; uv[(r * cols + c) * 2 + 1] = (py + 0.5) / H;
    }
    const idx = new Uint32Array((cols - 1) * (rows - 1) * 6);
    let k = 0;
    for (let r = 0; r < rows - 1; r++) for (let c = 0; c < cols - 1; c++) {
      const a = r * cols + c, b = a + 1, d = a + cols, e = d + 1;
      idx[k++] = a; idx[k++] = d; idx[k++] = b; idx[k++] = b; idx[k++] = d; idx[k++] = e;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    g.setIndex(new THREE.BufferAttribute(idx, 1));
    terrengMesh = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ map: kartbilete }));
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
    const avstand = Math.max(110, utstrekning / aspekt / (2 * Math.tan(rad(camera.fov / 2))) * 1.25 + 30);
    return Object.assign({ maal: new THREE.Vector3(cx, hoegdVed(cx, cz) * EXAG, cz), avstand, theta: 0, phi: 0.72 }, ekstra);
  }
  const LANDET = () => passTil([{ x: -BREIDD_KM * 0.42, z: -HOGD_KM * 0.46 }, { x: BREIDD_KM * 0.3, z: HOGD_KM * 0.46 }], { phi: 0.42, theta: 0 });

  /* ---------- Peikar og tastatur ---------- */
  const peikarar = new Map();
  let sistPinch = 0;
  canvas.addEventListener("pointerdown", e => { canvas.setPointerCapture(e.pointerId); peikarar.set(e.pointerId, { x: e.clientX, y: e.clientY, knapp: e.button, shift: e.shiftKey || e.ctrlKey }); });
  canvas.addEventListener("pointerup", e => peikarar.delete(e.pointerId));
  canvas.addEventListener("pointercancel", e => peikarar.delete(e.pointerId));
  canvas.addEventListener("pointermove", e => {
    const p = peikarar.get(e.pointerId); if (!p) return;
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    p.x = e.clientX; p.y = e.clientY;
    tween = null;
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
  canvas.addEventListener("wheel", e => { e.preventDefault(); tween = null; kam.avstand = klemAvstand(kam.avstand * Math.exp(e.deltaY * 0.0012)); }, { passive: false });
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
    if (e.target.closest("input, textarea, select, button")) return;
    if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); gaaTil(seksIdx + 1); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); gaaTil(seksIdx - 1); }
    else if (e.key === " ") { e.preventDefault(); settPause(!pausa); }
    else if (e.key === "Home") { e.preventDefault(); gaaTil(0); }
    else if (e.key === "End") { e.preventDefault(); gaaTil(SEKS.length - 1); }
  });

  /* ---------- Ruter, stopp og figuren ---------- */
  const RUTE_NO = new THREE.Color("#b76a2b"), RUTE_FOR = new THREE.Color("#c9ad8e");
  const materialNo = new THREE.MeshBasicMaterial({ color: RUTE_NO });
  const materialFor = new THREE.MeshBasicMaterial({ color: RUTE_FOR });
  const materialStopp = new THREE.MeshBasicMaterial({ color: RUTE_NO });
  const gruppeFor = new THREE.Group(), gruppeNo = new THREE.Group();
  scene.add(gruppeFor, gruppeNo);

  /* Ein liten, stilisert Ivar Aasen: svart frakk, flosshatt, skreppe på
     ryggen og stav i handa. Figuren er om lag 3,2 einingar høg og blir
     skalert etter kameraavstanden, slik at han alltid er synleg. */
  function lagFigur() {
    const svart = new THREE.MeshLambertMaterial({ color: 0x2a2a30 });
    const hud = new THREE.MeshLambertMaterial({ color: 0xe6c7a6 });
    const brun = new THREE.MeshLambertMaterial({ color: 0x7a5a3a });
    const graa = new THREE.MeshLambertMaterial({ color: 0x4a4a54 });
    const g = new THREE.Group();
    const lem = (r1, r2, lengd, y, x, mat) => {
      const ledd = new THREE.Group();
      const m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, lengd, 8), mat);
      m.position.y = -lengd / 2;
      ledd.add(m);
      ledd.position.set(x, y, 0);
      g.add(ledd);
      return ledd;
    };
    const beinV = lem(0.15, 0.12, 0.9, 0.9, -0.17, graa), beinH = lem(0.15, 0.12, 0.9, 0.9, 0.17, graa);
    const armV = lem(0.12, 0.1, 0.85, 1.95, -0.5, svart), armH = lem(0.12, 0.1, 0.85, 1.95, 0.5, svart);
    const kropp = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.52, 1.25, 10), svart); kropp.position.y = 1.45;
    const hovud = new THREE.Mesh(new THREE.SphereGeometry(0.32, 14, 10), hud); hovud.position.y = 2.38;
    const brem = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.06, 16), svart); brem.position.y = 2.63;
    const pull = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.32, 0.55, 16), svart); pull.position.y = 2.93;
    const skreppe = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.65, 0.3), brun); skreppe.position.set(0, 1.65, -0.5);
    const stav = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.6, 6), brun);
    stav.position.set(0.05, -0.55, 0.3); stav.rotation.x = 0.2; armH.add(stav);
    const skugge = new THREE.Mesh(new THREE.CircleGeometry(0.75, 20), new THREE.MeshBasicMaterial({ color: 0x1f5d4c, transparent: true, opacity: 0.35 }));
    skugge.rotation.x = -Math.PI / 2; skugge.position.y = 0.02;
    g.add(kropp, hovud, brem, pull, skreppe, skugge);
    g.visible = false;
    scene.add(g);
    return { g, beinV, beinH, armV, armH, hovud, brem, pull };
  }
  const figur = lagFigur();
  function stillFigur(fase) {
    // fase i radianar langs gangsyklusen; 0 = stå i ro
    const sving = Math.sin(fase);
    figur.beinV.rotation.x = sving * 0.55; figur.beinH.rotation.x = -sving * 0.55;
    figur.armV.rotation.x = -sving * 0.45; figur.armH.rotation.x = sving * 0.45 + 0.25;
    const bob = Math.abs(Math.cos(fase)) * 0.06;
    figur.hovud.position.y = 2.38 + bob; figur.brem.position.y = 2.63 + bob; figur.pull.position.y = 2.93 + bob;
  }
  stillFigur(0);

  /* ---------- Små scener ved viktige stopp ----------
     Kvar scene er ei gruppe av enkle primitiv (boksar, kjegler, sylindrar)
     med fast storleik på kartet, bygd av byggjarane i SCENER. Ho dukkar opp med
     ei lita veksing når figuren når stoppet. Kva stopp som får kva scene, står
     i feltet `scene` i js/content/aasen-reise.js. */
  const M = {
    raud: new THREE.MeshLambertMaterial({ color: 0xb0392f }), kvit: new THREE.MeshLambertMaterial({ color: 0xf2efe6 }),
    oker: new THREE.MeshLambertMaterial({ color: 0xd9b25c }), tak: new THREE.MeshLambertMaterial({ color: 0x9a5a44 }),
    gron: new THREE.MeshLambertMaterial({ color: 0x4f7a45 }), stein: new THREE.MeshLambertMaterial({ color: 0x8d8a85 }),
    brun: new THREE.MeshLambertMaterial({ color: 0x7a5a3a }), mork: new THREE.MeshLambertMaterial({ color: 0x2a2a30 }),
    sno: new THREE.MeshLambertMaterial({ color: 0xf7f7f4 }), blom: new THREE.MeshLambertMaterial({ color: 0xe9b7c4 }),
    segl: new THREE.MeshLambertMaterial({ color: 0xf4efe2, side: THREE.DoubleSide }), fisk: new THREE.MeshLambertMaterial({ color: 0xd8c9a3 }),
    royk: new THREE.MeshLambertMaterial({ color: 0xb9b9b9, transparent: true, opacity: 0.7 }),
    bok1: new THREE.MeshLambertMaterial({ color: 0x8a3b2e }), bok2: new THREE.MeshLambertMaterial({ color: 0x2f4f6f }), bok3: new THREE.MeshLambertMaterial({ color: 0x5b6b3a }),
  };
  const boks = (b, h, d, mat, x = 0, y = 0, z = 0) => { const m = new THREE.Mesh(new THREE.BoxGeometry(b, h, d), mat); m.position.set(x, y + h / 2, z); return m; };
  const syl = (r1, r2, h, mat, x = 0, y = 0, z = 0, seg = 12) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, seg), mat); m.position.set(x, y + h / 2, z); return m; };
  const kule = (r, mat, x, y, z) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 8), mat); m.position.set(x, y, z); return m; };
  const takGeo = new Map();
  function tak(b, d, h, mat, x = 0, y = 0, z = 0) {
    const key = [b, d, h].join();
    if (!takGeo.has(key)) {
      const sh = new THREE.Shape(); sh.moveTo(-b / 2, 0); sh.lineTo(b / 2, 0); sh.lineTo(0, h); sh.closePath();
      const g = new THREE.ExtrudeGeometry(sh, { depth: d, bevelEnabled: false }); g.translate(0, 0, -d / 2); takGeo.set(key, g);
    }
    const m = new THREE.Mesh(takGeo.get(key), mat); m.position.set(x, y, z); return m;
  }
  function hus(g, b, h, d, vegg, x = 0, z = 0, rot = 0, takMat = M.tak) {
    const k = new THREE.Group();
    k.add(boks(b, h, d, vegg), tak(b + 0.16, d + 0.16, h * 0.55, takMat, 0, h));
    k.position.set(x, 0, z); k.rotation.y = rot; g.add(k); return k;
  }
  const gran = (g, x, z, h = 1.2) => { g.add(syl(0.05, 0.08, h * 0.35, M.brun, x, 0, z, 6), syl(0, h * 0.35, h * 0.75, M.gron, x, h * 0.3, z, 8)); };
  const lauv = (g, x, z, mat = M.gron, r = 0.45) => { g.add(syl(0.06, 0.09, 0.5, M.brun, x, 0, z, 6), kule(r, mat, x, 0.5 + r * 0.8, z)); };
  function kyrkje(g, stor) {
    const s = stor ? 1.5 : 1, vegg = stor ? M.stein : M.kvit;
    hus(g, 1.5 * s, 1.2 * s, 2.6 * s, vegg);
    g.add(boks(0.7 * s, 2.2 * s, 0.7 * s, vegg, 0, 0, 1.3 * s), syl(0, 0.5 * s, 1.1 * s, M.tak, 0, 2.2 * s, 1.3 * s, 4));
    if (stor) { g.add(boks(0.7 * s, 2.2 * s, 0.7 * s, vegg, -0.9, 0, 1.3 * s), syl(0, 0.5 * s, 1.1 * s, M.tak, -0.9, 2.2 * s, 1.3 * s, 4)); g.children[2].position.x = 0.9; g.children[3].position.x = 0.9; }
  }
  function baat(g, x = 0, z = 0, rot = 0.4) {
    const k = new THREE.Group();
    const skrog = boks(2.2, 0.45, 0.8, M.brun); skrog.scale.set(1, 1, 1); k.add(skrog);
    k.add(syl(0.04, 0.04, 2.1, M.brun, 0.1, 0.4, 0, 6));
    const segl = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.3), M.segl); segl.position.set(0.15, 1.5, 0.02); k.add(segl);
    k.position.set(x, 0, z); k.rotation.y = rot; g.add(k);
  }
  const SCENER = {
    gard(g) { hus(g, 1.7, 1.0, 1.2, M.kvit, -0.9, 0.2, 0.15); hus(g, 2.3, 1.2, 1.3, M.raud, 1.2, -0.6, -0.3); gran(g, -1.9, -1.0); gran(g, 2.6, 0.9, 1.0); },
    herregard(g) { hus(g, 2.8, 1.5, 1.4, M.kvit, 0, 0, 0.1); hus(g, 1.3, 0.9, 1.0, M.raud, 2.3, -1.2, 0.3); lauv(g, -2.2, 0.6); lauv(g, -1.6, -1.2); lauv(g, 1.6, 1.4); },
    by(g) {
      const fargar = [M.kvit, M.oker, M.raud, M.kvit, M.kvit, M.oker];
      for (let i = 0; i < 7; i++) { const a = i * 2.4 + 0.7, r = 1.4 + (i % 3) * 0.5; hus(g, 0.9 + (i % 2) * 0.3, 0.8 + (i % 3) * 0.35, 0.9, fargar[i % fargar.length], Math.cos(a) * r, Math.sin(a) * r, a); }
      const k = new THREE.Group(); kyrkje(k, false); k.scale.setScalar(0.6); g.add(k);
      baat(g, 3.2, 0.6, 0.3); baat(g, 3.0, -1.4, -0.5);
    },
    hovudstad(g) {
      SCENER.by(g);
      const k = new THREE.Group(); k.add(boks(3.2, 1.5, 1.4, M.oker), tak(3.4, 1.6, 0.5, M.tak, 0, 1.5));
      for (let i = 0; i < 4; i++) k.add(syl(0.1, 0.1, 1.5, M.kvit, -1.1 + i * 0.73, 0, 0.75, 8));
      k.position.set(-0.6, 0, -3.0); g.add(k);
    },
    kyrkje(g) { kyrkje(g, false); gran(g, -1.5, -0.6, 1.0); },
    domkyrkje(g) { kyrkje(g, true); },
    stabbur(g) {
      for (const [x, z] of [[-0.45, -0.35], [0.45, -0.35], [-0.45, 0.35], [0.45, 0.35]]) g.add(syl(0.08, 0.1, 0.5, M.brun, x, 0, z, 6));
      g.add(boks(1.1, 0.7, 0.9, M.brun, 0, 0.5, 0), boks(1.4, 0.6, 1.15, M.brun, 0, 1.2, 0), tak(1.55, 1.3, 0.6, M.tak, 0, 1.8));
      hus(g, 1.6, 0.9, 1.1, M.brun, 2.0, -0.4, 0.2); gran(g, -1.6, 0.8);
    },
    vinter(g) { hus(g, 1.7, 1.0, 1.2, M.kvit, -0.9, 0.2, 0.15, M.sno); hus(g, 2.3, 1.2, 1.3, M.raud, 1.2, -0.6, -0.3, M.sno); gran(g, -1.9, -1.0); const d = new THREE.Mesh(new THREE.CircleGeometry(3.2, 24), M.sno); d.rotation.x = -Math.PI / 2; d.position.y = 0.01; g.add(d); },
    frukt(g) { hus(g, 1.7, 1.0, 1.2, M.kvit, 0, -0.9, 0.1); for (const [x, z] of [[-1.6, 0.9], [-0.5, 1.2], [0.7, 1.3], [1.8, 0.8], [2.1, -0.6]]) lauv(g, x, z, M.blom, 0.42); },
    jaeren(g) { hus(g, 1.9, 0.8, 1.1, M.kvit, 0, 0, 0.05); g.add(boks(4.0, 0.3, 0.25, M.stein, 0.4, 0, 1.5)); for (const [x, z] of [[-1.6, -1.0], [-0.9, -1.4], [1.9, -0.9]]) g.add(kule(0.28, M.kvit, x, 0.3, z), kule(0.14, M.mork, x + 0.25, 0.38, z)); },
    bok(g) { g.add(boks(1.1, 0.2, 0.8, M.bok1, 0, 0, 0), boks(1.0, 0.2, 0.75, M.bok2, 0.08, 0.2, 0.05), boks(1.05, 0.2, 0.8, M.bok3, -0.05, 0.4, -0.03)); const v = boks(0.7, 0.06, 0.9, M.kvit, -0.34, 0.6, 0); v.rotation.z = 0.18; const h = boks(0.7, 0.06, 0.9, M.kvit, 0.34, 0.6, 0); h.rotation.z = -0.18; g.add(v, h); },
    varde(g) { g.add(syl(0.55, 0.6, 0.4, M.stein, 0, 0, 0, 8), syl(0.42, 0.5, 0.4, M.stein, 0, 0.4, 0, 8), syl(0.3, 0.38, 0.4, M.stein, 0, 0.8, 0, 8), syl(0.15, 0.24, 0.4, M.stein, 0, 1.2, 0, 8)); for (const [x, z, r] of [[-1.6, 0.6, 0.7], [1.4, -0.8, 0.5], [0.8, 1.5, 0.45]]) { const d = new THREE.Mesh(new THREE.CircleGeometry(r, 12), M.sno); d.rotation.x = -Math.PI / 2; d.position.set(x, 0.02, z); g.add(d); } },
    baat(g) { baat(g, 0, 0, 0.3); baat(g, 1.6, -1.6, -0.6); },
    dampskip(g) {
      const k = new THREE.Group();
      k.add(boks(3.2, 0.6, 1.0, M.mork), boks(1.6, 0.5, 0.7, M.kvit, -0.2, 0.6, 0), syl(0.16, 0.16, 0.9, M.mork, 0.4, 1.1, 0, 10), syl(0.17, 0.17, 0.2, M.raud, 0.4, 1.7, 0, 10));
      k.add(kule(0.2, M.royk, 0.5, 2.2, 0), kule(0.28, M.royk, 0.75, 2.65, 0.1), kule(0.36, M.royk, 1.1, 3.1, 0.2));
      k.rotation.y = 0.5; g.add(k);
    },
    hjell(g) {
      for (const x of [-1.2, 1.2]) for (const s of [-1, 1]) { const p = syl(0.05, 0.05, 1.9, M.brun, x + s * 0.45, 0, 0, 6); p.rotation.z = -s * 0.42; p.position.y = 0.9; g.add(p); }
      const tv = syl(0.04, 0.04, 2.8, M.brun, 0, 1.6, 0, 6); tv.rotation.z = Math.PI / 2; g.add(tv);
      for (let i = 0; i < 8; i++) g.add(boks(0.1, 0.5, 0.2, M.fisk, -1.05 + i * 0.3, 1.1, 0));
      baat(g, 0.6, 2.0, 1.3);
    },
  };
  const scener = new Map();   // stad-id -> { g, synt, t0 }
  // Scenene har fast storleik på kartet (km per figureining), uavhengig av
  // zoomen: eit hus er om lag tre kilometer og ei kyrkje fem. Figuren derimot
  // blir skalert med zoomen, så han alltid er synleg.
  const sceneSkala = 2.0;
  function tomScener() { for (const { g } of scener.values()) { scene.remove(g); g.traverse(o => { if (o.geometry && !takGeo.has(o.geometry.uuid)) o.geometry.dispose(); }); } scener.clear(); }
  // Scenene står eit stykke ut til sida for ruta, vinkelrett på gangretninga
  // ved stoppet, så figuren ikkje går tvers gjennom husa. Sida blir vald mot
  // aust (og elles sør), slik at kystbyane hamnar på land og ikkje i sjøen.
  function byggScener(idar, straks) {
    tomScener();
    idar.forEach((id, i) => {
      const st = STADER[id];
      if (!st.scene || !SCENER[st.scene] || scener.has(id)) return;
      const g = new THREE.Group();
      SCENER[st.scene](g);
      const p = stadXZ(id);
      const fra = i > 0 ? stadXZ(idar[i - 1]) : p, til = i < idar.length - 1 ? stadXZ(idar[i + 1]) : p;
      let tx = til.x - fra.x, tz = til.z - fra.z;
      if (Math.hypot(tx, tz) < 1e-6) { tx = 0; tz = 1; }
      const l = Math.hypot(tx, tz);
      let px = -tz / l, pz = tx / l;
      if (px < -1e-6 || (Math.abs(px) <= 1e-6 && pz < 0)) { px = -px; pz = -pz; }
      g.rotation.y = Math.atan2(-px, -pz);
      g.scale.setScalar(0.0001);
      scene.add(g);
      scener.set(id, { g, synt: !!straks, t0: straks ? -Infinity : 0, x: p.x, z: p.z, px, pz });
    });
  }
  function visScene(id) { const s = scener.get(id); if (s && !s.synt) { s.synt = true; s.t0 = performance.now(); } }
  function stegScener(no) {
    const d = sceneSkala * 4.5;
    for (const s of scener.values()) {
      const x = s.x + s.px * d, z = s.z + s.pz * d;
      s.g.position.set(x, hoegdVed(x, z) * EXAG + 0.05, z);
      if (!s.synt) continue;
      const u = Math.min(1, (no - s.t0) / 600), k = 1 - Math.pow(1 - u, 3);
      s.g.scale.setScalar(Math.max(0.0001, sceneSkala * k));
    }
  }

  // Ei rute er ei liste punkt {x, z, h} med ~2,5 km mellomrom, drapert på terrenget.
  function lagRute(stoppIdar) {
    const punkt = [];
    for (let i = 0; i < stoppIdar.length; i++) {
      const p = stadXZ(stoppIdar[i]);
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
    stegScener(no);
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
    const idx = m ? Math.min(SEKS.length, Math.max(1, +m[1])) - 1 : 0;
    Object.assign(kam, LANDET());
    kam.avstand *= 1.6;
    oppdaterKamera();
    lastEl.hidden = true;
    oppdaterFramdrift();
    // Startar eleven midt i modulen, må kartet først vise det siste kapittelet før.
    let sisteKap = idx;
    while (sisteKap > 0 && !erKapittel(SEKS[sisteKap])) sisteKap--;
    if (sisteKap !== idx && erKapittel(SEKS[sisteKap])) { visSeksjon(sisteKap); if (noRute) { noRute.framdrift = 1; noRute.ferdig = true; pauseBtn.hidden = true; } }
    visSeksjon(idx);
    requestAnimationFrame(teikn);
  }

  const glTest = document.createElement("canvas");
  if (!(glTest.getContext("webgl2") || glTest.getContext("webgl"))) {
    lastEl.innerHTML = "<p>Nettlesaren din kan ikkje vise 3D-grafikk (WebGL). Prøv ein nyare nettlesar, eller les om reisene i modulen <a href=\"modul.html?id=historie-aasen\">Ivar Aasen og landsmålet</a>.</p>";
  } else {
    lesTerreng().then(start).catch(e => { lastEl.innerHTML = `<p>Kartet kunne ikkje lastast: ${e.message}</p>`; });
  }
})();
