/* Lagar høgdekartet som 3D-kartet over reisene til Ivar Aasen er bygd på.

   Kjelder:
   - Høgder: Terrarium-fliser frå Mapzen/AWS Terrain Tiles (zoom 7, om lag
     0,6 km per piksel på 60° N), som samlar SRTM, GMTED og ETOPO1 (havdjup).
     https://registry.opendata.aws/terrain-tiles/
   - Landegrenser, innsjøar, brear og elvar: Natural Earth 1:10M (public
     domain). Grensene skil norsk land frå Sverige, Finland, Russland og
     Danmark og gir kystlinja; innsjøane og breane blir teikna i eigne
     fargar, og dei store elvane ligg som vektorliner i datafila (`elvar`,
     i km frå øvre venstre hjørne, med storleiksklassen frå Natural Earth)
     og blir teikna inn i kartbiletet av nettlesaren.

   Resultatet er to filer. data/noreg-terreng.js har eit PNG-bilete som base64
   i eit JS-objekt, slik at kartet òg verkar når kurset blir opna rett frå
   disk; det er grunnlaget for terrengnettet og reserve for kartbiletet.
   data/noreg-terreng-fin.png er same kartet med dobbel oppløysing (halve
   pikselstorleiken, fliser frå zoom Z + 1), som sida hentar separat når ho er
   på nett og bruker til kartbiletet, så relieffet blir finare.
   Raud kanal = høgd (sqrt-skala, 0 til hMaks) for land, og havdjup
   (sqrt-skala, 0 til 1000 m) for hav. Grøn kanal = avstand til kystlinja i
   landpolygona, med forteikn: 128 er sjølve kystlinja, over 128 er land,
   under er hav, 40 steg per kilometer, klemt til ±3,2 km. Denne avstanden
   kjem frå sjølve polygona, ikkje frå pikslane, så strandlinja i 3D-kartet
   blir ei jamn kurve òg når ein er nærare enn pikslane. (Relieffskuggen
   blir rekna i nettlesaren, for ein skugge per piksel komprimerer like
   dårleg som støy og ville doble fila.) Blå kanal: klasse i dei tre øvste
   bitane (0 hav, 1 innsjø, 2 anna land, 3 bre, 4 Noreg) og avstand til
   nærmaste innsjøkant i dei fem nedste (16 er kanten, over 16 er utanfor,
   16 steg per kilometer, klemt til ±1 km), så innsjøane òg får jamne
   strender i kartbiletet. Kvar piksel er eit snitt av 3 × 3 delprøver, så
   kartet er jamnare enn ei enkel utplukking. Kartet ligg i Lamberts konforme
   kjegleprojeksjon, same projeksjonen som js/aasen-reise.js bruker for å
   plassere stadene.

   Køyr: node tools/lag-terreng.js [ut-fil] [mellomlager]
   Den fine fila får namn etter ut-fila: noreg-terreng.js → noreg-terreng-fin.png  */
"use strict";
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const https = require("https");
const os = require("os");

const [OUT = "data/noreg-terreng.js", CACHE = path.join(os.tmpdir(), "noreg-terreng-cache")] = process.argv.slice(2);
const OUT_FIN = OUT.replace(/\.js$/, "-fin.png");
const Z = 7;
const KM_PER_PX = 1.25;
const DELPROVER = 3;   // delprøver per akse i kvar piksel
const H_MAKS = 2500;   // meter, toppen av sqrt-skalaen
const PROJ = { phi1: 60, phi2: 70, phi0: 64, lam0: 15, R: 6371 };
const LAND = { Norway: 255, Sweden: 128, Finland: 128, Russia: 128, Denmark: 128 };

fs.mkdirSync(CACHE, { recursive: true });

function hent(url) {
  const fil = path.join(CACHE, url.replace(/[^a-z0-9.]+/gi, "_"));
  if (fs.existsSync(fil)) return Promise.resolve(fs.readFileSync(fil));
  return new Promise((res, rej) => {
    https.get(url, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) return hent(r.headers.location).then(res, rej);
      if (r.statusCode !== 200) return rej(new Error(url + " gav " + r.statusCode));
      const deler = [];
      r.on("data", d => deler.push(d));
      r.on("end", () => { const b = Buffer.concat(deler); fs.writeFileSync(fil, b); res(b); });
    }).on("error", rej);
  });
}

/* PNG utan bibliotek: dekoding av 8-bits gråtone/RGB/RGBA utan interlace,
   og koding av RGB med enkel filterval per rad. */
function dekodPng(buf) {
  let pos = 8, w, h, djup, type, interlace;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const namn = buf.toString("ascii", pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (namn === "IHDR") { w = data.readUInt32BE(0); h = data.readUInt32BE(4); djup = data[8]; type = data[9]; interlace = data[12]; }
    else if (namn === "IDAT") idat.push(data);
    else if (namn === "IEND") break;
    pos += 12 + len;
  }
  const kanalar = { 0: 1, 2: 3, 6: 4 }[type];
  if (djup !== 8 || interlace !== 0 || !kanalar) throw new Error("PNG-format som ikkje er støtta");
  const raa = zlib.inflateSync(Buffer.concat(idat));
  const stride = w * kanalar, ut = Buffer.alloc(h * stride);
  let ip = 0;
  for (let y = 0; y < h; y++) {
    const f = raa[ip++], o = y * stride, p = o - stride;
    for (let x = 0; x < stride; x++) {
      const a = x >= kanalar ? ut[o + x - kanalar] : 0;
      const b = y > 0 ? ut[p + x] : 0;
      const c = x >= kanalar && y > 0 ? ut[p + x - kanalar] : 0;
      let v = raa[ip++];
      if (f === 1) v += a;
      else if (f === 2) v += b;
      else if (f === 3) v += (a + b) >> 1;
      else if (f === 4) { const q = a + b - c, pa = Math.abs(q - a), pb = Math.abs(q - b), pc = Math.abs(q - c); v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c; }
      ut[o + x] = v & 255;
    }
  }
  return { w, h, kanalar, data: ut };
}

const CRC = new Int32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c; });
function crc32(b) { let c = -1; for (const x of b) c = CRC[(c ^ x) & 255] ^ (c >>> 8); return (c ^ -1) >>> 0; }
function chunk(namn, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const kropp = Buffer.concat([Buffer.from(namn, "ascii"), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(kropp));
  return Buffer.concat([len, kropp, crc]);
}
function kodPng(w, h, rgb) {
  const stride = w * 3, raa = Buffer.alloc((stride + 1) * h);
  const prøve = [Buffer.alloc(stride), Buffer.alloc(stride), Buffer.alloc(stride)];
  for (let y = 0; y < h; y++) {
    const o = y * stride;
    let best = 0, bestSum = Infinity;
    for (let f = 0; f < 3; f++) {
      const p = prøve[f]; let sum = 0;
      for (let x = 0; x < stride; x++) {
        const a = x >= 3 ? rgb[o + x - 3] : 0, b = y > 0 ? rgb[o - stride + x] : 0;
        const v = (rgb[o + x] - (f === 1 ? a : f === 2 ? b : 0)) & 255;
        p[x] = v; sum += v < 128 ? v : 256 - v;
      }
      if (sum < bestSum) { bestSum = sum; best = f; }
    }
    raa[y * (stride + 1)] = best;
    prøve[best].copy(raa, y * (stride + 1) + 1);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 2;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raa, { level: 9 })), chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* Lamberts konforme kjegleprojeksjon (sfærisk), i km. */
const rad = g => g * Math.PI / 180;
const { phi1, phi2, phi0, lam0, R } = PROJ;
const n = Math.log(Math.cos(rad(phi1)) / Math.cos(rad(phi2))) /
  Math.log(Math.tan(Math.PI / 4 + rad(phi2) / 2) / Math.tan(Math.PI / 4 + rad(phi1) / 2));
const F = Math.cos(rad(phi1)) * Math.pow(Math.tan(Math.PI / 4 + rad(phi1) / 2), n) / n;
const rho0 = F / Math.pow(Math.tan(Math.PI / 4 + rad(phi0) / 2), n);
function fram(lat, lon) {
  const rho = F / Math.pow(Math.tan(Math.PI / 4 + rad(lat) / 2), n);
  const th = n * rad(lon - lam0);
  return { x: R * rho * Math.sin(th), y: R * (rho0 - rho * Math.cos(th)) };
}
function tilbake(x, y) {
  const xr = x / R, yr = y / R;
  const rho = Math.sign(n) * Math.hypot(xr, rho0 - yr);
  const th = Math.atan2(xr, rho0 - yr);
  const lat = 2 * Math.atan(Math.pow(F / rho, 1 / n)) - Math.PI / 2;
  return { lat: lat * 180 / Math.PI, lon: lam0 + th / n * 180 / Math.PI };
}

/* Web Mercator-pikslar på zoom Z (256 px per flis). */
function merc(lat, lon, z) {
  const s = 256 * Math.pow(2, z);
  const l = rad(lat);
  return { x: (lon + 180) / 360 * s, y: (1 - Math.log(Math.tan(l) + 1 / Math.cos(l)) / Math.PI) / 2 * s };
}

async function main() {
  // Landegrenser først, for dei avgjer utsnittet.
  const ne = JSON.parse((await hent("https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson")).toString("utf8"));
  const land = {};
  for (const f of ne.features) {
    const namn = f.properties.ADMIN || f.properties.NAME;
    if (!(namn in LAND)) continue;
    const polys = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
    land[namn] = polys;
  }
  const NE = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/";
  const polysAv = fil => JSON.parse((fil).toString("utf8")).features
    .flatMap(f => f.geometry ? (f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.type === "MultiPolygon" ? f.geometry.coordinates : []) : []);
  const innsjoar = polysAv(await hent(NE + "ne_10m_lakes.geojson"));
  const brear = polysAv(await hent(NE + "ne_10m_glaciated_areas.geojson"));
  // Elvar: hovudfila og Europa-tillegget, berre elvar (ikkje innsjø-midtliner).
  const elvLinjer = [];
  for (const fil of ["ne_10m_rivers_lake_centerlines.geojson", "ne_10m_rivers_europe.geojson"]) {
    for (const f of JSON.parse((await hent(NE + fil)).toString("utf8")).features) {
      if (!f.geometry || /lake/i.test(f.properties.featurecla || "")) continue;
      const linjer = f.geometry.type === "LineString" ? [f.geometry.coordinates] : f.geometry.type === "MultiLineString" ? f.geometry.coordinates : [];
      for (const l of linjer) elvLinjer.push({ s: f.properties.scalerank || 10, l });
    }
  }
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const ring of land.Norway.flat()) for (const [lon, lat] of ring) {
    if (lat > 72 || lat < 57 || lon < 3) continue; // Svalbard, Jan Mayen, Bjørnøya og Bouvetøya er ikkje med
    const p = fram(lat, lon);
    minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
  }
  const marg = 30;
  minX -= marg; maxX += marg; minY -= marg; maxY += marg;
  const W = Math.ceil((maxX - minX) / KM_PER_PX), H = Math.ceil((maxY - minY) / KM_PER_PX);

  // Byggjer eitt lag: høgder frå fliser på zoom Z, W × H pikslar à kmPx km.
  async function lagLag(Z, kmPx, W, H) {
    console.log(`lag ${W}×${H} px, ${kmPx} km/px, zoom ${Z}`);
    // Kva fliser trengst? Gå gjennom hjørna og kantane av utsnittet.
    let tminX = Infinity, tmaxX = -Infinity, tminY = Infinity, tmaxY = -Infinity;
    for (let i = 0; i <= 40; i++) for (const [x, y] of [[minX + (maxX - minX) * i / 40, minY], [minX + (maxX - minX) * i / 40, maxY], [minX, minY + (maxY - minY) * i / 40], [maxX, minY + (maxY - minY) * i / 40]]) {
      const g = tilbake(x, y), m = merc(g.lat, g.lon, Z);
      tminX = Math.min(tminX, m.x); tmaxX = Math.max(tmaxX, m.x); tminY = Math.min(tminY, m.y); tmaxY = Math.max(tmaxY, m.y);
    }
    const fx0 = Math.floor(tminX / 256), fx1 = Math.floor(tmaxX / 256), fy0 = Math.floor(tminY / 256), fy1 = Math.floor(tmaxY / 256);
    const MW = (fx1 - fx0 + 1) * 256, MH = (fy1 - fy0 + 1) * 256;
    const hoegd = new Float32Array(MW * MH);
    for (let ty = fy0; ty <= fy1; ty++) for (let tx = fx0; tx <= fx1; tx++) {
      const png = dekodPng(await hent(`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${Z}/${tx}/${ty}.png`));
      for (let y = 0; y < 256; y++) for (let x = 0; x < 256; x++) {
        const i = (y * 256 + x) * png.kanalar;
        hoegd[(ty - fy0) * 256 * MW + (tx - fx0) * 256 + y * MW + x] = png.data[i] * 256 + png.data[i + 1] + png.data[i + 2] / 256 - 32768;
      }
    }
    console.log(`henta ${(fx1 - fx0 + 1) * (fy1 - fy0 + 1)} fliser`);
  
    // Maske: rasteriser polygona i utsnittet (scanline, partal/oddetal).
    const maske = new Uint8Array(W * H);
    const tilPx = (lon, lat) => { const p = fram(lat, lon); return [(p.x - minX) / kmPx, (maxY - p.y) / kmPx]; };
    function rasteriser(polys, mal, verdi) {
      for (const poly of polys) {
        const ringar = poly.map(r => r.map(([lon, lat]) => tilPx(lon, lat)));
        let rMin = Infinity, rMax = -Infinity;
        for (const r of ringar) for (const [, y] of r) { rMin = Math.min(rMin, y); rMax = Math.max(rMax, y); }
        for (let row = Math.max(0, Math.floor(rMin)); row < Math.min(H, Math.ceil(rMax)); row++) {
          const yc = row + 0.5, kryss = [];
          for (const r of ringar) for (let i = 0; i < r.length - 1; i++) {
            const [x1, y1] = r[i], [x2, y2] = r[i + 1];
            if ((y1 <= yc) !== (y2 <= yc)) kryss.push(x1 + (yc - y1) / (y2 - y1) * (x2 - x1));
          }
          kryss.sort((a, b) => a - b);
          for (let k = 0; k + 1 < kryss.length; k += 2) {
            for (let col = Math.max(0, Math.round(kryss[k])); col < Math.min(W, Math.round(kryss[k + 1])); col++) mal[row * W + col] = verdi;
          }
        }
      }
    }
    for (const [namn, polys] of Object.entries(land)) rasteriser(polys, maske, LAND[namn]);
    const vatn = new Uint8Array(W * H), bre = new Uint8Array(W * H);
    rasteriser(innsjoar, vatn, 1);
    rasteriser(brear, bre, 1);
  
    // Sampl høgda for kvar piksel: snittet av DELPROVER × DELPROVER bilineære
    // prøver frå Mercator-rutenettet, så fjell og dalar blir jamne og ikkje
    // hakkete når flisene er finare enn kartet.
    const h = new Float32Array(W * H);
    const proveVed = (x, y) => {
      const g = tilbake(x, y);
      const m = merc(g.lat, g.lon, Z);
      const mx = m.x - fx0 * 256 - 0.5, my = m.y - fy0 * 256 - 0.5;
      const x0 = Math.max(0, Math.min(MW - 2, Math.floor(mx))), y0 = Math.max(0, Math.min(MH - 2, Math.floor(my)));
      const fx = Math.max(0, Math.min(1, mx - x0)), fy = Math.max(0, Math.min(1, my - y0));
      const i = y0 * MW + x0;
      return (hoegd[i] * (1 - fx) + hoegd[i + 1] * fx) * (1 - fy) + (hoegd[i + MW] * (1 - fx) + hoegd[i + MW + 1] * fx) * fy;
    };
    for (let row = 0; row < H; row++) for (let col = 0; col < W; col++) {
      let sum = 0;
      for (let a = 0; a < DELPROVER; a++) for (let b = 0; b < DELPROVER; b++) {
        sum += proveVed(minX + (col + (a + 0.5) / DELPROVER) * kmPx, maxY - (row + (b + 0.5) / DELPROVER) * kmPx);
      }
      h[row * W + col] = sum / (DELPROVER * DELPROVER);
    }
  
    // Kystlinja følgjer landpolygona, ikkje høgdedataa: høgdedataa fyller att
    // tronge sund som Drøbaksundet, så Oslofjorden og andre smale fjordar
    // vart brotne av land.
    // Land er nøyaktig det som ligg inne i landpolygona. Høgdedataa avgjer
    // ikkje kystlinja: dei er generaliserte annleis enn polygona, og land frå
    // høgdedataa utanfor polygona gav harde pikselkantar som kystavstanden
    // ikkje kunne jamne (han er rekna av polygona).
    const polyLand = maske.slice();
    const erLand = new Uint8Array(W * H);
    for (let i = 0; i < W * H; i++) erLand[i] = polyLand[i] ? 1 : 0;
    // Avstand til kystlinja (polygonkantane), i km, med forteikn: positiv på
    // land, negativ i hav, klemt til ±KYST_MAKS. Kantane blir lagde i eit
    // rutenett av celler, og kvar piksel som har ein kant innan rekkjevidd,
    // måler avstanden til dei nærmaste kantane.
    // Avstand til nærmaste polygonkant, i km, med forteikn: positiv der
    // `inne` er sann, negativ elles, klemt til ±maks. Kantane blir lagde i
    // eit rutenett av celler, og kvar piksel måler avstanden til kantane i
    // cellene rundt seg.
    function avstandsfelt(polyListe, inne, maks) {
      const celle = Math.ceil(maks / kmPx) + 1;
      const CW = Math.ceil(W / celle) + 1;
      const celler = new Map();
      for (const polys of polyListe) for (const poly of polys) for (const ring of poly) {
        for (let i = 0; i < ring.length - 1; i++) {
          const [x1, y1] = tilPx(ring[i][0], ring[i][1]), [x2, y2] = tilPx(ring[i + 1][0], ring[i + 1][1]);
          if (Math.max(x1, x2) < -celle || Math.min(x1, x2) > W + celle || Math.max(y1, y2) < -celle || Math.min(y1, y2) > H + celle) continue;
          const cx0 = Math.floor(Math.min(x1, x2) / celle), cx1 = Math.floor(Math.max(x1, x2) / celle);
          const cy0 = Math.floor(Math.min(y1, y2) / celle), cy1 = Math.floor(Math.max(y1, y2) / celle);
          for (let cy = cy0; cy <= cy1; cy++) for (let cx = cx0; cx <= cx1; cx++) {
            const nr = cy * CW + cx;
            if (!celler.has(nr)) celler.set(nr, []);
            celler.get(nr).push(x1, y1, x2, y2);
          }
        }
      }
      const felt = new Float32Array(W * H);
      for (let row = 0; row < H; row++) for (let col = 0; col < W; col++) {
        const px = col + 0.5, py = row + 0.5, cx = Math.floor(px / celle), cy = Math.floor(py / celle);
        let best = Infinity;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          const seg = celler.get((cy + dy) * CW + cx + dx);
          if (!seg) continue;
          for (let s = 0; s < seg.length; s += 4) {
            const ax = seg[s], ay = seg[s + 1], bx = seg[s + 2] - ax, by = seg[s + 3] - ay;
            const l2 = bx * bx + by * by;
            const u = l2 ? Math.max(0, Math.min(1, ((px - ax) * bx + (py - ay) * by) / l2)) : 0;
            const ex = ax + u * bx - px, ey = ay + u * by - py;
            const d2 = ex * ex + ey * ey;
            if (d2 < best) best = d2;
          }
        }
        const d = Math.min(maks, Math.sqrt(best) * kmPx);
        felt[row * W + col] = inne[row * W + col] ? d : -d;
      }
      return felt;
    }
    const KYST_MAKS = 3.2, VATN_MAKS = 1.0;
    const kyst = avstandsfelt(Object.values(land), erLand, KYST_MAKS);          // positiv på land
    const vatnAvst = avstandsfelt([innsjoar], vatn.map(v => v ? 0 : 1), VATN_MAKS);   // negativ i innsjø

    // Land som polygona ikkje dekkjer, får merket til næraste nabo.
    for (let runde = 0; runde < 6; runde++) {
      const kopi = maske.slice();
      for (let i = 0; i < W * H; i++) {
        if (!erLand[i] || kopi[i]) continue;
        const nab = [i - 1, i + 1, i - W, i + W].filter(j => j >= 0 && j < W * H && kopi[j]);
        if (nab.length) maske[i] = kopi[nab[0]];
      }
    }
  
    const rgb = Buffer.alloc(W * H * 3);
    let noreg = 0;
    for (let i = 0; i < W * H; i++) {
      const v = h[i];
      rgb[i * 3] = erLand[i] ? Math.round(Math.sqrt(Math.min(Math.max(v, 0), H_MAKS) / H_MAKS) * 255)
        : Math.round(Math.sqrt(Math.min(Math.max(-v, 0), 1000) / 1000) * 255);
      rgb[i * 3 + 1] = Math.max(0, Math.min(255, Math.round(128 + kyst[i] * 40)));
      // Blå kanal: klassen i dei tre øvste bitane, avstand til innsjøkant i dei fem nedste.
      const klasse = !erLand[i] ? 0 : bre[i] ? 3 : vatn[i] ? 1 : maske[i] === 255 ? 4 : 2;
      const vatnKode = Math.max(0, Math.min(31, Math.round(16 + vatnAvst[i] * 16)));
      rgb[i * 3 + 2] = (klasse << 5) | vatnKode;
      if (klasse === 4) noreg++;
    }
    return { rgb, noreg };
  }

  // Elvane i utsnittet, i km frå øvre venstre hjørne, forenkla til punkt
  // med minst 0,3 km mellom seg og runda til 0,1 km.
  const elvar = [];
  for (const { s, l } of elvLinjer) {
    const p = [];
    let sistX = Infinity, sistY = Infinity;
    for (const [lon, lat] of l) {
      const q = fram(lat, lon), ex = q.x - minX, ey = maxY - q.y;
      if (ex < 0 || ey < 0 || ex > maxX - minX || ey > maxY - minY) { if (p.length >= 4) elvar.push({ s, p }); p.length = 0; sistX = Infinity; continue; }
      if (Math.hypot(ex - sistX, ey - sistY) < 0.3) continue;
      p.push(Math.round(ex * 10) / 10, Math.round(ey * 10) / 10);
      sistX = ex; sistY = ey;
    }
    if (p.length >= 4) elvar.push({ s, p: p.slice() });
  }
  console.log(`elvar i utsnittet: ${elvar.length} liner, ${elvar.reduce((a, e) => a + e.p.length / 2, 0)} punkt`);

  const grov = await lagLag(Z, KM_PER_PX, W, H);
  const rgb = grov.rgb, noreg = grov.noreg;
  const png = kodPng(W, H, rgb);
  fs.writeFileSync(path.join(CACHE, "noreg-terreng.png"), png);
  const ut = {
    format: 4, breidd: W, hogd: H, kmPerPx: KM_PER_PX, hMaks: H_MAKS, kystPerKm: 40, kystMaks: 3.2, proj: PROJ,
    klassar: { hav: 0, innsjo: 1, annaLand: 2, bre: 3, noreg: 4 },   // blå kanal >> 5
    vatnPerKm: 16, vatnMaks: 1.0,                                       // blå kanal & 31, minus 16
    x0: minX, y0: maxY,
    elvar,
    fin: { fil: "noreg-terreng-fin.png", breidd: W * 2, hogd: H * 2, kmPerPx: KM_PER_PX / 2, versjon: "" },
    png: "data:image/png;base64," + png.toString("base64"),
  };
  fs.writeFileSync(OUT,
    "/* Høgdekart over Noreg for 3D-kartet over reisene til Ivar Aasen.\n" +
    "   Laga av tools/lag-terreng.js, sjå data/KJELDE.md. Ikkje rediger for hand. */\n" +
    "window.NOREG_TERRENG = " + JSON.stringify(ut) + ";\n", "utf8");
  console.log(`skreiv ${OUT}: ${(fs.statSync(OUT).size / 1e6).toFixed(2)} MB, PNG ${(png.length / 1e3).toFixed(0)} kB, ` +
    `norsk land ${(noreg * KM_PER_PX * KM_PER_PX / 1e3).toFixed(0)} tusen km²`);

  // Det fine laget: same utsnitt, dobbel oppløysing, finare fliser.
  const fin = await lagLag(Z + 1, KM_PER_PX / 2, W * 2, H * 2);
  const pngFin = kodPng(W * 2, H * 2, fin.rgb);
  fs.writeFileSync(OUT_FIN, pngFin);
  // Versjonen (ein hash av fila) står i adressa sida hentar, så ein ny
  // versjon aldri blir forveksla med ein gammal i nettlesaren eller
  // service workeren sin cache.
  ut.fin.versjon = require("crypto").createHash("sha1").update(pngFin).digest("hex").slice(0, 10);
  fs.writeFileSync(OUT,
    "/* Høgdekart over Noreg for 3D-kartet over reisene til Ivar Aasen.\n" +
    "   Laga av tools/lag-terreng.js, sjå data/KJELDE.md. Ikkje rediger for hand. */\n" +
    "window.NOREG_TERRENG = " + JSON.stringify(ut) + ";\n", "utf8");
  console.log(`skreiv ${OUT_FIN}: ${(pngFin.length / 1e6).toFixed(2)} MB`);
}

main().catch(e => { console.error(e); process.exit(1); });
