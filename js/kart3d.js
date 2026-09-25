/* Kartkjernen: 3D-kartet over Noreg, brukt av «Reisene til Ivar Aasen»
   (js/aasen-reise.js) og spelet «Blekkranet» (js/spel.js).

   Kartet er eitt trekantnett bygd av høgdekartet i data/noreg-terreng.js
   (laga av tools/lag-terreng.js). Kvar piksel i høgdekartet er 1,25 km, og
   høgdene er overdrivne (EXAG) for at fjell og fjordar skal synast frå lufta.
   Fargane ligg i eit kartbilete som blir teikna éin gong ved oppstart:
   høgdefargar, relieffskugge frå høgdekartet, hav med djupfargar, innsjøar,
   brear og riksgrensa. Er sida på nett, blir det finare kartet i
   data/noreg-terreng-fin.png henta i tillegg.

   Bruk:
     const K = Kart3D({ rot, canvas, stader, fintKart });
     K.start({ forRender(no), etterRender(no) }).then(...)
   `stader` er stadene i js/content/aasen-reise.js. Resultatet har kameraet,
   figuren av Aasen, rutene, scenene og hjelpefunksjonane sidene treng.

   Alt her er reint klientside: three.js ligg i js/vendor, og høgdekartet er
   bakt inn som base64, så sida verkar òg opna rett frå disk. */
window.Kart3D = function (opt) {
  "use strict";
  const T = window.NOREG_TERRENG;
  const STADER = opt.stader;
  const rotEl = opt.rot, canvas = opt.canvas;

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
  // Les eit høgdekart-PNG (sjå tools/lag-terreng.js for kanalane) til tabellar.
  // Det innebygde kartet er ein data-URL og går gjennom eit Image-element. Det
  // fine kartet blir henta med fetch og dekoda med createImageBitmap, som
  // ikkje gir opp like lett på store bilete når WebGL alt held mykje minne.
  function lesHoegdekart(src, breidd, hogd) {
    const tilTabellar = bilete => {
      const c = document.createElement("canvas");
      c.width = breidd; c.height = hogd;
      const ctx = c.getContext("2d");
      ctx.drawImage(bilete, 0, 0);
      const d = ctx.getImageData(0, 0, breidd, hogd).data;
      const n = breidd * hogd;
      const L = { W: breidd, H: hogd, hoegd: new Float32Array(n), maske: new Uint8Array(n), djup: new Float32Array(n), kyst: new Float32Array(n), vatn: new Float32Array(n) };
      for (let i = 0; i < n; i++) {
        const r = d[i * 4] / 255;
        L.maske[i] = d[i * 4 + 2] >> 5;
        L.vatn[i] = ((d[i * 4 + 2] & 31) - 16) / T.vatnPerKm;   // km til innsjøkant, negativ i innsjø
        L.hoegd[i] = L.maske[i] ? r * r * T.hMaks / 1000 : 0;
        L.djup[i] = L.maske[i] ? 0 : r;
        L.kyst[i] = (d[i * 4 + 1] - 128) / T.kystPerKm;   // km til kystlinja, negativ i hav
      }
      return L;
    };
    if (!src.startsWith("data:") && window.createImageBitmap) {
      return fetch(src)
        .then(r => { if (!r.ok) throw new Error("Fekk ikkje " + src + " (" + r.status + ")"); return r.blob(); })
        .then(blob => createImageBitmap(blob))
        .then(bm => { const L = tilTabellar(bm); bm.close(); return L; });
    }
    return new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => { try { res(tilTabellar(img)); } catch (e) { rej(e); } };
      img.onerror = () => rej(new Error("Kunne ikkje lese høgdekartet"));
      img.src = src;
    });
  }
  // Kystlinja: kvar piksel har avstanden til kystlinja i landpolygona (km,
  // negativ i hav), rekna av tools/lag-terreng.js frå sjølve polygonkantane.
  // Difor blir strandlinja ei jamn kurve òg når nettet er tettare enn pikslane.
  let kystBasis = null, vatnBasis = null;
  function lesTerreng() {
    return lesHoegdekart(T.png, W, H).then(L => { hoegd = L.hoegd; maske = L.maske; djup = L.djup; kystBasis = L.kyst; vatnBasis = L.vatn; });
  }
  // Høgd i km på eit punkt i verda (bilineær mellom pikselsentra).
  // Bruker det fine laget når det er lasta, så ruter og figur følgjer same
  // terrenget som nettet nær kameraet.
  function hoegdVed(x, z) {
    const L = finLag || basisLag || { W, H, km: KM, hoegd };
    const c = Math.min(L.W - 1.001, Math.max(0, (x + BREIDD_KM / 2) / L.km - 0.5));
    const r = Math.min(L.H - 1.001, Math.max(0, (z + HOGD_KM / 2) / L.km - 0.5));
    const c0 = Math.floor(c), r0 = Math.floor(r), fc = c - c0, fr = r - r0;
    const i = r0 * L.W + c0, hg = L.hoegd;
    const h = (hg[i] * (1 - fc) + hg[i + 1] * fc) * (1 - fr) + (hg[i + L.W] * (1 - fc) + hg[i + L.W + 1] * fc) * fr;
    return Math.max(h, 0);
  }

  /* ---------- Fargar ---------- */
  const RAMPE = [
    [0.00, [0.66, 0.75, 0.55]], [0.15, [0.75, 0.78, 0.56]], [0.45, [0.80, 0.74, 0.54]],
    [0.90, [0.72, 0.66, 0.56]], [1.40, [0.78, 0.76, 0.72]], [1.90, [0.93, 0.93, 0.91]], [2.50, [1, 1, 1]],
  ];
  const ANNA_LAND = [0.90, 0.89, 0.85];
  const INNSJO = [0.30, 0.52, 0.68], BRE = [0.95, 0.97, 0.99];
  function rampe(h) {
    for (let i = 1; i < RAMPE.length; i++) if (h <= RAMPE[i][0]) {
      const [h0, a] = RAMPE[i - 1], [h1, b] = RAMPE[i], t = (h - h0) / (h1 - h0);
      return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
    }
    return RAMPE[RAMPE.length - 1][1];
  }
  const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  const SKUGGE_Z = 4;   // overdriving av hellinga i skuggen
  // Teiknar kartbiletet for eit lag L = { W, H, km, hoegd, maske, djup }.
  function lagKartbilete(L) {
    const { W, H, km, hoegd, maske, vatn } = L;
    const hLand = i => maske[i] ? hoegd[i] : 0;
    // Relieffskugge: lys frå nordvest 45° over horisonten, rekna av hellinga
    // i høgdekartet.
    const skugge = i => {
      const r = i % W, k = (i - r) / W;
      const dx = (hLand(k * W + Math.min(W - 1, r + 1)) - hLand(k * W + Math.max(0, r - 1))) / (2 * km) * SKUGGE_Z;
      const dy = (hLand(Math.min(H - 1, k + 1) * W + r) - hLand(Math.max(0, k - 1) * W + r)) / (2 * km) * SKUGGE_Z;
      const n = 1 / Math.sqrt(dx * dx + dy * dy + 1);
      return Math.max(0, (dx * 0.5 + dy * 0.5 + Math.SQRT1_2) * n);
    };
    const farge = i => {
      const kl = maske[i];
      // Havet blir teikna av havplanet, så landteksturen har ikkje blått: ein
      // havpiksel får låglandsfargen. Elles ville trekanten mellom ein djup
      // fjordpiksel og fjellpikselen ved sida av strekkje blått oppover
      // heile fjellveggen, for fjorden er berre éin piksel brei i teksturen.
      if (kl === KL.hav) { const c = rampe(0), s = 0.52 + 0.48 * skugge(i); return [c[0] * s, c[1] * s, c[2] * s]; }
      let c = kl === KL.bre ? BRE : rampe(hoegd[i]);
      if (kl === KL.annaLand) c = mix(c, ANNA_LAND, 0.7);
      // Litt grunnlys, så nordaustsidene ikkje blir svarte.
      const s = 0.52 + 0.48 * skugge(i);
      c = [c[0] * s, c[1] * s, c[2] * s];
      // Innsjøane: fargen går mjukt over kanten etter avstanden til
      // innsjøpolygonet, så strendene blir jamne kurver og ikkje pikselkantar.
      const v = vatn[i];
      // Breidda på overgangen følgjer pikselstorleiken, så det grove laget
      // (frå disk) òg får jamne kantar.
      const kant = 0.25 * km, breidd = 1.4 * km;
      if (v < kant) { const w = Math.min(1, Math.max(0, (kant - v) / breidd)); c = mix(c, INNSJO, w * w * (3 - 2 * w)); }
      return c;
    };
    const c = document.createElement("canvas");
    c.width = W; c.height = H;
    const ctx = c.getContext("2d");
    const bilete = ctx.createImageData(W, H), d = bilete.data;
    for (let i = 0; i < W * H; i++) {
      const f = farge(i);
      d[i * 4] = f[0] * 255; d[i * 4 + 1] = f[1] * 255; d[i * 4 + 2] = f[2] * 255; d[i * 4 + 3] = 255;
    }
    ctx.putImageData(bilete, 0, 0);
    const tekstur = new THREE.CanvasTexture(c);
    tekstur.flipY = false;
    tekstur.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return tekstur;
  }
  // Det fine kartbiletet (dobbel oppløysing) blir henta separat når sida er
  // på nett. Frå disk (file:) kan ikkje nettlesaren lese pikslane i eit bilete,
  // så då står det innebygde kartet.
  function hentFintKart(forsok) {
    if (!T.fin || location.protocol === "file:" || new URLSearchParams(location.search).get("fin") === "0") { registrerSW(); return; }
    lesHoegdekart("data/" + T.fin.fil + "?v=" + (T.fin.versjon || "1"), T.fin.breidd, T.fin.hogd)
      .then(L => {
        L.km = T.fin.kmPerPx;
        const ny = lagKartbilete(L);
        const gammal = landMaterial.map;
        landMaterial.map = ny;
        landMaterial.needsUpdate = true;
        kartbilete = ny;
        if (gammal) gammal.dispose();
        finLag = L;          // bitane nær kameraet blir bygde om frå det fine laget
        if (opt.fintKart) opt.fintKart();   // sida byggjer rutene om, så dei følgjer det fine terrenget
      })
      .then(registrerSW, e => {
        // Eit nettverksglipp første gongen: prøv ein gong til før vi gir oss.
        if (!forsok) setTimeout(() => hentFintKart(true), 1500);
        else { console.warn("Fint kart ikkje lasta:", e && e.message); registrerSW(); }
      });
  }
  // Service workeren held det fine kartet og ordlista i cache (sjå sw.js). Han
  // blir registrert først etter at det fine kartet er henta, så installeringa
  // hans ikkje kjem i vegen for den hentinga.
  function registrerSW() {
    if ("serviceWorker" in navigator && location.protocol !== "file:") navigator.serviceWorker.register("sw.js").catch(() => {});
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

  /* ---------- Terreng i bitar med detaljnivå ----------
     Landet er delt i bitar på CHUNK × CHUNK pikslar i det innebygde kartet.
     Kvar bit blir bygd på eitt av tre nivå etter kor nær kameramålet ho er:
     grov (kvar andre piksel), mellom (kvar piksel) eller fin (det fine
     høgdelaget, dobbelt så tett) når det er lasta. Nivåa blir vurderte på
     nytt medan kameraet flyttar seg, og nokre få bitar blir bygde om per
     bilete, så det ikkje hakkar. Kantane på bitane får eit «skjørt» som heng
     ned, så det ikkje blir sprekker der to nivå møtest.

     Havet er eit eige, flatt plan med eigen shader (sjå lagHav). Landnettet
     held fram under havflata med havbotnen, så strandlinja er snittet mellom
     dei to og ikkje ein kant i nettet der teksturen blir dregen ut. */
  const CHUNK = 64;                  // pikslar i grunnlaget per bit
  const SKJORT = 1.5;                // kor langt skjørtet heng ned
  const landMaterial = new THREE.MeshBasicMaterial();
  const landGruppe = new THREE.Group();
  scene.add(landGruppe);
  let kartbilete = null, basisLag = null, finLag = null, kvalitet = 1, laasKvalitet = false;   // kvalitet 0 = treg maskin
  const bitar = [];                  // { x0, y0, x1, y1, x, z, nivaa, mesh }
  let ventande = [];                 // bitar som skal byggjast om

  // Bikubisk (Catmull-Rom) prøve av eit felt mellom pikslane, med kantane
  // klemde. Brukt på det finaste nivået, der nettet er tettare enn pikslane:
  // lineært mellom pikslane gir knekk i kvar piksel, bikubisk gir ei jamn kurve.
  function bikubisk(felt, W, H, x, y) {
    const x0 = Math.floor(x), y0 = Math.floor(y), tx = x - x0, ty = y - y0;
    const cr = (p0, p1, p2, p3, t) => 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
    const rad = new Array(4);
    for (let k = -1; k <= 2; k++) {
      const yy = Math.min(H - 1, Math.max(0, y0 + k)) * W;
      const xa = Math.min(W - 1, Math.max(0, x0 - 1)), xb = Math.min(W - 1, Math.max(0, x0)), xc = Math.min(W - 1, Math.max(0, x0 + 1)), xd = Math.min(W - 1, Math.max(0, x0 + 2));
      rad[k + 1] = cr(felt[yy + xa], felt[yy + xb], felt[yy + xc], felt[yy + xd], tx);
    }
    return cr(rad[0], rad[1], rad[2], rad[3], ty);
  }

  // Bygg ei bit av laget L, pikslar x0..x1 og y0..y1 (begge inkluderte, så
  // nabobitar deler kantane), med kvar steg-te piksel (steg 0,5 gir eit nett
  // som er dobbelt så tett som pikslane).
  function lagBit(L, x0, y0, x1, y1, steg) {
    const cols = Math.ceil((x1 - x0) / steg) + 1, rows = Math.ceil((y1 - y0) / steg) + 1;
    const kant = [];
    for (let c = 0; c < cols; c++) kant.push([c, 0]);
    for (let r = 1; r < rows; r++) kant.push([cols - 1, r]);
    for (let c = cols - 2; c >= 0; c--) kant.push([c, rows - 1]);
    for (let r = rows - 2; r > 0; r--) kant.push([0, r]);
    const n = cols * rows, nk = kant.length;
    const pos = new Float32Array((n + nk) * 3), uv = new Float32Array((n + nk) * 2);
    // Land står på høgda si, hav ligg under havflata med botnen, så flata skjer landet i strandlinja.
    // Rein hav og reint land står på sitt; i kystsona går høgda mjukt frå
    // like under havflata til landhøgda etter kystfeltet, så strandlinja
    // (der nettet skjer havflata) følgjer ei avrunda kurve.
    // Nærmast kystlinja er høgda ei rett skråning gjennom null, like bratt på
    // begge sider (SKRAA einingar per km). Lenger ute går ho mjukt over i
    // landhøgda eller havbotnen. Skråninga må vere lik på begge sider: elles
    // ville ei høg fjellside dra strandlinja (der nettet skjer havflata) mot
    // havpikslane, og ho hadde følgt pikselkantane att i staden for kystlinja.
    const SONE1 = 1.3 * L.km, SONE2 = 2.6 * L.km, SKRAA = 1.0;
    const yAv = (h, k, d) => {
      const maal = k >= 0 ? Math.max(h, 0.03) * EXAG : -(0.08 + 0.6 * d) * EXAG;
      const t = Math.min(1, Math.max(0, (Math.abs(k) - SONE1) / (SONE2 - SONE1))), glatt = t * t * (3 - 2 * t);
      return SKRAA * k * (1 - glatt) + maal * glatt;
    };
    let v = 0;
    const sett = (c, r, senk) => {
      const px = Math.min(x1, x0 + c * steg), py = Math.min(y1, y0 + r * steg);
      let y;
      if (Number.isInteger(px) && Number.isInteger(py)) {
        const i = py * L.W + px;
        y = yAv(L.hoegd[i], L.kyst[i], L.djup[i]);
      } else {
        // Tettare enn pikslane: bikubisk mellom dei, så strandlinja blir ei jamn kurve.
        y = yAv(bikubisk(L.hoegd, L.W, L.H, px, py), bikubisk(L.kyst, L.W, L.H, px, py), bikubisk(L.djup, L.W, L.H, px, py));
      }
      pos[v * 3] = (px + 0.5) * L.km - BREIDD_KM / 2;
      pos[v * 3 + 1] = y - senk;
      pos[v * 3 + 2] = (py + 0.5) * L.km - HOGD_KM / 2;
      uv[v * 2] = (px + 0.5) / L.W; uv[v * 2 + 1] = (py + 0.5) / L.H;
      v++;
    };
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) sett(c, r, 0);
    for (const [c, r] of kant) sett(c, r, SKJORT);
    const idx = new Uint32Array((cols - 1) * (rows - 1) * 6 + nk * 12);
    let k = 0;
    for (let r = 0; r < rows - 1; r++) for (let c = 0; c < cols - 1; c++) {
      const a = r * cols + c, b = a + 1, d = a + cols, e = d + 1;
      idx[k++] = a; idx[k++] = d; idx[k++] = b; idx[k++] = b; idx[k++] = d; idx[k++] = e;
    }
    // Skjørtet: ein vegg frå kvar kant ned til den senka kopien, teikna frå begge sider.
    for (let q = 0; q < nk; q++) {
      const [c0, r0] = kant[q], [c1, r1] = kant[(q + 1) % nk];
      const t0 = r0 * cols + c0, t1 = r1 * cols + c1, s0 = n + q, s1 = n + (q + 1) % nk;
      idx[k++] = t0; idx[k++] = s0; idx[k++] = t1; idx[k++] = t1; idx[k++] = s0; idx[k++] = s1;
      idx[k++] = t0; idx[k++] = t1; idx[k++] = s0; idx[k++] = t1; idx[k++] = s1; idx[k++] = s0;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    g.setIndex(new THREE.BufferAttribute(idx, 1));
    return g;
  }

  function nivaaFor(b) {
    const d = Math.hypot(b.x - kam.maal.x, b.z - kam.maal.z), a = kam.avstand;
    // Tett på: nettet dobbelt så tett som det fine laget, bikubisk mellom pikslane.
    if (finLag && kvalitet && a < 280 && d < Math.max(70, a * 0.55)) return 3;
    if (a < 900 && d < Math.max(140, a * 0.6)) return finLag && kvalitet ? 2 : 1;
    if (d < a * 1.3 + 120) return kvalitet ? 1 : 0;
    return 0;
  }
  // Finn bitane som treng eit anna nivå, nærast kameramålet først.
  function planleggLOD() {
    ventande = bitar.filter(b => nivaaFor(b) !== b.nivaa)
      .sort((p, q) => Math.hypot(p.x - kam.maal.x, p.z - kam.maal.z) - Math.hypot(q.x - kam.maal.x, q.z - kam.maal.z));
  }
  function byggVentande(maks) {
    for (let i = 0; i < maks && ventande.length; i++) {
      const b = ventande.shift(), n = nivaaFor(b);
      if (n === b.nivaa) continue;
      if (b.mesh) { landGruppe.remove(b.mesh); b.mesh.geometry.dispose(); }
      const L = n >= 2 ? finLag : basisLag, f = n >= 2 ? 2 : 1, steg = n === 0 ? 2 : n === 3 ? 0.5 : 1;
      b.mesh = new THREE.Mesh(lagBit(L, b.x0 * f, b.y0 * f, b.x1 * f, b.y1 * f, steg), landMaterial);
      b.nivaa = n;
      landGruppe.add(b.mesh);
    }
  }
  function byggTerreng() {
    basisLag = { W, H, km: KM, hoegd, maske, djup, kyst: kystBasis, vatn: vatnBasis };
    kartbilete = lagKartbilete(basisLag);
    landMaterial.map = kartbilete;
    landMaterial.needsUpdate = true;
    for (let y0 = 0; y0 < H - 1; y0 += CHUNK) for (let x0 = 0; x0 < W - 1; x0 += CHUNK) {
      const x1 = Math.min(W - 1, x0 + CHUNK), y1 = Math.min(H - 1, y0 + CHUNK);
      bitar.push({ x0, y0, x1, y1, x: ((x0 + x1) / 2 + 0.5) * KM - BREIDD_KM / 2, z: ((y0 + y1) / 2 + 0.5) * KM - HOGD_KM / 2, nivaa: -1, mesh: null });
    }
    planleggLOD();
    byggVentande(bitar.length);
    lagHav();
  }

  /* ---------- Havet ----------
     Eit flatt plan i havflata med eigen shader: fargen går frå grunt til
     djupt etter havdjupet i høgdekartet, det er små bølgjer i normalen som
     gir eit svakt solglimt når ein er nær, og ei lys strandkant der planet
     grensar til land. */
  let havMaterial = null;
  function lagHav() {
    const data = new Uint8Array(W * H * 4);
    for (let i = 0; i < W * H; i++) { data[i * 4] = djup[i] * 255; data[i * 4 + 1] = Math.max(0, Math.min(255, 128 + basisLag.kyst[i] * T.kystPerKm)); data[i * 4 + 3] = 255; }
    const kart = new THREE.DataTexture(data, W, H, THREE.RGBAFormat);
    kart.magFilter = kart.minFilter = THREE.LinearFilter;
    kart.needsUpdate = true;
    havMaterial = new THREE.ShaderMaterial({
      uniforms: { kart: { value: kart }, tid: { value: 0 }, sol: { value: new THREE.Vector3(-0.5, 0.65, -0.4).normalize() } },
      side: THREE.DoubleSide,
      vertexShader: `
        varying vec2 vUv; varying vec3 vPos;
        void main() {
          vUv = uv;
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vPos = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }`,
      fragmentShader: `
        uniform sampler2D kart; uniform float tid; uniform vec3 sol;
        varying vec2 vUv; varying vec3 vPos;
        void main() {
          vec2 k = texture2D(kart, vUv).rg;
          float djup = k.r;      // 0..1 i kvadratrotskala, 1 = 1000 m
          float kyst = (k.g - 0.5) * 255.0 / ${T.kystPerKm}.0;   // km til kystlinja, negativ i hav
          vec3 grunt = vec3(0.26, 0.50, 0.66);
          vec3 djupt = vec3(0.05, 0.19, 0.38);
          vec3 farge = mix(grunt, djupt, smoothstep(0.05, 0.8, djup));
          // Lange, låge bølgjer i normalen, berre til solglimtet, og berre når
          // ein er nær: på avstand ville dei gi striper (moaré) i biletet.
          float naer = clamp(1.0 - length(cameraPosition - vPos) / 320.0, 0.0, 1.0);
          float w1 = sin(vPos.x * 0.45 + vPos.z * 0.25 + tid * 0.6);
          float w2 = sin(vPos.x * 0.17 - vPos.z * 0.5 - tid * 0.45);
          vec3 n = normalize(vec3(0.03 * naer * (w1 + 0.5 * w2), 1.0, 0.03 * naer * (w2 - 0.5 * w1)));
          vec3 v = normalize(cameraPosition - vPos);
          vec3 h = normalize(sol + v);
          float glimt = pow(max(dot(n, h), 0.0), 60.0) * 0.25 * naer;
          float lys = 0.92 + 0.08 * max(dot(n, sol), 0.0);
          // Strandkanta: lysare og grønare vatn inn mot land.
          float strand = smoothstep(-1.4, 0.05, kyst);
          farge = mix(farge, vec3(0.50, 0.74, 0.80), strand * 0.75);
          gl_FragColor = vec4(farge * lys + glimt, 1.0);
        }`,
    });
    const g = new THREE.PlaneGeometry(BREIDD_KM, HOGD_KM);
    g.rotateX(Math.PI / 2);   // v = 0 i nord, som i høgdekartet
    const havMesh = new THREE.Mesh(g, havMaterial);
    havMesh.visible = new URLSearchParams(location.search).get("hav") !== "0";   // til testing
    scene.add(havMesh);
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
      const nSeg = Math.max(1, Math.ceil(Math.hypot(p.x - q.x, p.z - q.z) / 1.0));
      for (let j = 1; j <= nSeg; j++) {
        const x = q.x + (p.x - q.x) * j / nSeg, z = q.z + (p.z - q.z) * j / nSeg;
        punkt.push({ x, z, h: hoegdVed(x, z) });
      }
    }
    return punkt;
  }
  function ruteKurve(punkt, radius) {
    const loft = radius * 1.4 + 0.2 * EXAG;
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

  /* ---------- Elvar og riksgrense som band på terrenget ----------
     Vektorlinene frå datafila (km frå øvre venstre hjørne) blir til flate
     band drapert på terrenget, med breidd som følgjer zoomen slik rutene
     gjer. Som geometri er dei skarpe uansett kor nær ein kjem, i motsetnad
     til liner teikna inn i kartbiletet. */
  const materialElv = new THREE.MeshBasicMaterial({ color: 0x3a6c9e, side: THREE.DoubleSide });
  const materialGrense = new THREE.MeshBasicMaterial({ color: 0x8a6e5c, side: THREE.DoubleSide });
  const linjeGruppe = new THREE.Group();
  scene.add(linjeGruppe);
  function band(punkt, breidd, loft, material) {
    // punkt: [x, z, x, z, …] i verdskoordinatar; band av kvart segment med rund skøyt
    const n = punkt.length / 2;
    if (n < 2) return null;
    const pos = [], idx = [];
    for (let i = 0; i < n; i++) {
      const x = punkt[i * 2], z = punkt[i * 2 + 1];
      const x0 = punkt[Math.max(0, i - 1) * 2], z0 = punkt[Math.max(0, i - 1) * 2 + 1];
      const x1 = punkt[Math.min(n - 1, i + 1) * 2], z1 = punkt[Math.min(n - 1, i + 1) * 2 + 1];
      let dx = x1 - x0, dz = z1 - z0;
      const l = Math.hypot(dx, dz) || 1; dx /= l; dz /= l;
      const nx = -dz * breidd / 2, nz = dx * breidd / 2;
      for (const s of [-1, 1]) {
        const px = x + nx * s, pz = z + nz * s;
        pos.push(px, hoegdVed(px, pz) * EXAG + loft, pz);
      }
      if (i > 0) { const a = (i - 1) * 2; idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    return new THREE.Mesh(g, material);
  }
  // Legg ei line med jamne mellomrom (så bandet følgjer terrenget) og flytt til verdskoordinatar
  function tettLine(p, steg) {
    const ut = [];
    if (p.some(v => !Number.isFinite(v))) return ut;   // eit ugyldig punkt ville hamna i hjørnet av kartet
    for (let k = 0; k < p.length - 2; k += 2) {
      const x0 = p[k] - BREIDD_KM / 2, z0 = p[k + 1] - HOGD_KM / 2, x1 = p[k + 2] - BREIDD_KM / 2, z1 = p[k + 3] - HOGD_KM / 2;
      const m = Math.max(1, Math.ceil(Math.hypot(x1 - x0, z1 - z0) / steg));
      for (let s = 0; s < m; s++) ut.push(x0 + (x1 - x0) * s / m, z0 + (z1 - z0) * s / m);
    }
    ut.push(p[p.length - 2] - BREIDD_KM / 2, p[p.length - 1] - HOGD_KM / 2);
    return ut;
  }
  function byggLinjer(radius) {
    tomGruppe(linjeGruppe);
    // Tett nok til at bandet følgjer terrenget òg i det fine nettet, og
    // med nok loft til at det ikkje dukkar under mellom to prøver.
    const loft = 0.1 * EXAG, steg = Math.min(0.35, Math.max(0.2, radius));
    for (const e of T.elvar || []) {
      if (e.v) continue;   // innsjø-midtlinene blir ikkje teikna: innsjøen er alt blå
      const m = band(tettLine(e.p, steg), Math.max(0.3, radius * (e.s <= 7 ? 0.9 : 0.6)), loft, materialElv);
      if (m) linjeGruppe.add(m);
    }
    for (const g of T.grenser || []) {
      const m = band(tettLine(g.p, steg), Math.max(0.25, radius * 0.5), loft + 0.02, materialGrense);
      if (m) linjeGruppe.add(m);
    }
  }


  /* ---------- Storleik og teiknesløyfe ---------- */
  function tilpass() {
    const w = rotEl.clientWidth, h = rotEl.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", tilpass);

  let krokar = { forRender() {}, etterRender() {} };
  const rammetider = [];
  let sistRamme = 0, ramme = 0;
  function teikn(no) {
    requestAnimationFrame(teikn);
    stegTween(no);
    if (++ramme % 12 === 0) planleggLOD();
    byggVentande(4);
    if (havMaterial) havMaterial.uniforms.tid.value = no / 1000;
    krokar.forRender(no);
    stegScener(no);
    oppdaterKamera();
    renderer.render(scene, camera);
    krokar.etterRender(no);

    // Går det tregt på denne maskina, hald terrenget grovare.
    if (kvalitet === 1 && sistRamme && !ventande.length) {
      rammetider.push(no - sistRamme);
      if (rammetider.length === 90) {
        const sortert = rammetider.slice().sort((a, b) => a - b);
        if (sortert[45] > 34 && !laasKvalitet) { kvalitet = 0; planleggLOD(); }
      }
    }
    sistRamme = no;
  }

  // Les terrenget, byggjer kartet og startar teiknesløyfa. Avvist om
  // nettlesaren ikkje kan vise WebGL.
  function start(k) {
    const glTest = document.createElement("canvas");
    if (!(glTest.getContext("webgl2") || glTest.getContext("webgl"))) return Promise.reject(new Error("webgl"));
    krokar = Object.assign(krokar, k || {});
    return lesTerreng().then(() => {
      const kv = new URLSearchParams(location.search).get("kvalitet");   // 0 = grov, 1 = full utan nedjustering
      if (kv === "0") kvalitet = 0;
      if (kv === "1") laasKvalitet = true;
      byggTerreng();
      tilpass();
      Object.assign(kam, LANDET());
      kam.avstand *= 1.6;
      oppdaterKamera();
      requestAnimationFrame(teikn);
      hentFintKart(false);
    });
  }

  return {
    start, tilpass, scene, camera, renderer, kam, EXAG, STADER, reduserRorsle,
    verdXZ, stadXZ, hoegdVed, flyTil, passTil, LANDET, klemAvstand,
    fullforTween() { if (tween) kam.maal.copy(tween.til.maal); tween = null; },
    figur, stillFigur, lagRute, ruteKurve, ruteMesh, tomGruppe,
    gruppeFor, gruppeNo, materialNo, materialFor, materialStopp,
    byggScener, visScene, byggLinjer,
  };
};
