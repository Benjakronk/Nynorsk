/* Lagar høgdekartet som 3D-kartet over reisene til Ivar Aasen er bygd på.

   Kjelder:
   - Høgder: Terrarium-fliser frå Mapzen/AWS Terrain Tiles (zoom 6), som
     samlar SRTM, GMTED og ETOPO1 (havdjup). https://registry.opendata.aws/terrain-tiles/
   - Landegrenser: Natural Earth 1:10M (public domain), brukt til å skilje
     norsk land frå Sverige, Finland, Russland og Danmark.

   Resultatet er data/noreg-terreng.js: eit PNG-bilete som base64 i eit
   JS-objekt, slik at kartet òg verkar når kurset blir opna rett frå disk.
   Raud kanal = høgd (sqrt-skala, 0 til hMaks), grøn = havdjup, blå = maske
   (0 hav, 128 anna land, 255 Noreg). Kartet ligg i Lamberts konforme
   kjegleprojeksjon, same projeksjonen som js/aasen-reise.js bruker for å
   plassere stadene.

   Køyr: node tools/lag-terreng.js [ut-fil] [mellomlager]  */
"use strict";
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const https = require("https");
const os = require("os");

const [OUT = "data/noreg-terreng.js", CACHE = path.join(os.tmpdir(), "noreg-terreng-cache")] = process.argv.slice(2);
const Z = 6;
const KM_PER_PX = 2;
const H_MAKS = 2500;
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
function merc(lat, lon) {
  const s = 256 * Math.pow(2, Z);
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
  console.log(`utsnitt ${W}×${H} px, ${KM_PER_PX} km/px`);

  // Kva fliser trengst? Gå gjennom hjørna og kantane av utsnittet.
  let tminX = Infinity, tmaxX = -Infinity, tminY = Infinity, tmaxY = -Infinity;
  for (let i = 0; i <= 40; i++) for (const [x, y] of [[minX + (maxX - minX) * i / 40, minY], [minX + (maxX - minX) * i / 40, maxY], [minX, minY + (maxY - minY) * i / 40], [maxX, minY + (maxY - minY) * i / 40]]) {
    const g = tilbake(x, y), m = merc(g.lat, g.lon);
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

  // Maske: rasteriser landpolygona i utsnittet (scanline, partal/oddetal).
  const maske = new Uint8Array(W * H);
  const tilPx = (lon, lat) => { const p = fram(lat, lon); return [(p.x - minX) / KM_PER_PX, (maxY - p.y) / KM_PER_PX]; };
  for (const [namn, polys] of Object.entries(land)) {
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
          for (let col = Math.max(0, Math.round(kryss[k])); col < Math.min(W, Math.round(kryss[k + 1])); col++) maske[row * W + col] = LAND[namn];
        }
      }
    }
  }

  // Sampl høgda for kvar piksel (bilineært frå Mercator-rutenettet).
  const h = new Float32Array(W * H);
  for (let row = 0; row < H; row++) for (let col = 0; col < W; col++) {
    const g = tilbake(minX + (col + 0.5) * KM_PER_PX, maxY - (row + 0.5) * KM_PER_PX);
    const m = merc(g.lat, g.lon);
    const mx = m.x - fx0 * 256 - 0.5, my = m.y - fy0 * 256 - 0.5;
    const x0 = Math.max(0, Math.min(MW - 2, Math.floor(mx))), y0 = Math.max(0, Math.min(MH - 2, Math.floor(my)));
    const fx = Math.max(0, Math.min(1, mx - x0)), fy = Math.max(0, Math.min(1, my - y0));
    const i = y0 * MW + x0;
    h[row * W + col] = (hoegd[i] * (1 - fx) + hoegd[i + 1] * fx) * (1 - fy) + (hoegd[i + MW] * (1 - fx) + hoegd[i + MW + 1] * fx) * fy;
  }

  // Land som polygona ikkje dekkjer (småøyar, kystpikslar) får merket til næraste nabo.
  const erLand = i => h[i] > 0;
  for (let runde = 0; runde < 6; runde++) {
    const kopi = maske.slice();
    for (let i = 0; i < W * H; i++) {
      if (!erLand(i) || kopi[i]) continue;
      const nab = [i - 1, i + 1, i - W, i + W].filter(j => j >= 0 && j < W * H && kopi[j]);
      if (nab.length) maske[i] = kopi[nab[0]];
    }
  }

  const rgb = Buffer.alloc(W * H * 3);
  let noreg = 0;
  for (let i = 0; i < W * H; i++) {
    const v = h[i];
    rgb[i * 3] = v > 0 ? Math.round(Math.sqrt(Math.min(v, H_MAKS) / H_MAKS) * 255) : 0;
    rgb[i * 3 + 1] = v < 0 ? Math.round(Math.sqrt(Math.min(-v, 1000) / 1000) * 255) : 0;
    rgb[i * 3 + 2] = v > 0 ? maske[i] || 128 : 0;
    if (rgb[i * 3 + 2] === 255) noreg++;
  }
  const png = kodPng(W, H, rgb);
  fs.writeFileSync(path.join(CACHE, "noreg-terreng.png"), png);
  const ut = {
    breidd: W, hogd: H, kmPerPx: KM_PER_PX, hMaks: H_MAKS, proj: PROJ,
    x0: minX, y0: maxY,
    png: "data:image/png;base64," + png.toString("base64"),
  };
  fs.writeFileSync(OUT,
    "/* Høgdekart over Noreg for 3D-kartet over reisene til Ivar Aasen.\n" +
    "   Laga av tools/lag-terreng.js, sjå data/KJELDE.md. Ikkje rediger for hand. */\n" +
    "window.NOREG_TERRENG = " + JSON.stringify(ut) + ";\n", "utf8");
  console.log(`skreiv ${OUT}: ${(fs.statSync(OUT).size / 1e6).toFixed(2)} MB, PNG ${(png.length / 1e3).toFixed(0)} kB, ` +
    `norsk land ${(noreg * KM_PER_PX * KM_PER_PX / 1e3).toFixed(0)} tusen km²`);
}

main().catch(e => { console.error(e); process.exit(1); });
