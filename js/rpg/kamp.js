/* Kampane i «Aasen: Språkvandringa»: turbasert med ATB-målar, som i dei klassiske
   Final Fantasy-spela. Målaren til kvar figur fyller seg etter farten.
   Når målaren til ein i partiet er full, stoppar tida (ventemodus).

   Ivar kjempar med galdrar: orda han har samla (js/rpg/data.js, ORD).
   Lydfamilien til ordet avgjer kva galdren gjer. Før galdren verkar, vel
   spelaren kva form av ordet som ber krafta: forma som har teke vare på
   lyden (diftongen, den harde konsonanten, kv-en, j-en), eller den danske.
   Rett form gir full kraft. Småorda er raske og har ikkje spørsmål.

   Blekkfiendar kan «rettskrive» eit ord til dansk. Då står ordet på dansk
   i menyen, og galdren verkar berre om spelaren finn den rette forma att.

   Kamp.start({ fiendar, boss, parti, gaaver, bakgrunn, ord, rettleiing, paaVesen })
     parti: medlemmer frå tilstanden i js/rpg/spel.js (blir endra direkte)
     ord:   st.ord, orda Ivar har høyrt, med formene
     gir { utfall: "siger" | "tap" | "flukt", xp, pengar, fall } */
window.Kamp = (function () {
  "use strict";
  const $ = id => document.getElementById(id);
  const E = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const stokk = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const vent = ms => new Promise(r => setTimeout(r, ms));
  let siger = 0;              // tidspunktet sigerfeiringa byrja, eller 0
  const kvitt = document.createElement("canvas");
  function kvittLerret(bilde, styrke) {
    kvitt.width = bilde.width; kvitt.height = bilde.height;
    const k = kvitt.getContext("2d"); k.drawImage(bilde, 0, 0);
    k.globalCompositeOperation = "source-atop"; k.fillStyle = `rgba(255,255,255,${styrke})`; k.fillRect(0, 0, bilde.width, bilde.height);
    k.globalCompositeOperation = "source-over";
    return kvitt;
  }
  const rnd = (a, b) => a + Math.random() * (b - a);

  const rot = $("rpg-kamp");
  const g = Motor.g;
  // Tekst på lerretet i Spelskrift: 16 px er éin skriftpiksel per spelpiksel, og teksten står på
  // heile pikslar. Han blir teikna éin gong på eit eige lerret, der kvar piksel blir heilt dekt
  // eller heilt open (som filteret #skarp i spel.html), så kantane ikkje blir utglatta.
  // omriss: [farge, [[dx, dy], …]].
  const tekstLager = new Map();
  function tekstBilete(tekst, farge) {
    const nokkel = tekst + "|" + farge;
    if (tekstLager.has(nokkel)) return tekstLager.get(nokkel);
    const c = document.createElement("canvas"), x = c.getContext("2d");
    x.font = '16px "Spelskrift", monospace';
    c.width = Math.max(1, Math.ceil(x.measureText(tekst).width) + 2); c.height = 18;
    x.font = '16px "Spelskrift", monospace'; x.textBaseline = "alphabetic"; x.fillStyle = farge;
    x.fillText(tekst, 0, 13);
    const d = x.getImageData(0, 0, c.width, c.height);
    for (let i = 3; i < d.data.length; i += 4) d.data[i] = d.data[i] >= 128 ? 255 : 0;
    x.putImageData(d, 0, 0);
    if (tekstLager.size > 200) tekstLager.clear();
    if (!document.fonts || document.fonts.check('16px "Spelskrift"')) tekstLager.set(nokkel, c);   // ikkje hugs reserveskrifta
    return c;
  }
  function pikselTekst(tekst, x, y, farge, omriss) {
    const b = tekstBilete(tekst, farge), x0 = Math.round(x - (b.width - 2) / 2), y0 = Math.round(y) - 13;
    if (omriss) { const s = tekstBilete(tekst, omriss[0]); for (const [dx, dy] of omriss[1]) g.drawImage(s, x0 + dx, y0 + dy); }
    g.drawImage(b, x0, y0);
  }
  const SKUGGE = ["#0a0514", [[1, 1]]], OMRISS = ["#0a0514", [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1]]];
  const FAM_ORDEN = ["hard", "diftong", "j", "sporjeord", "smaaord"];

  /* ---------- Formspørsmålet ---------- */
  function formval(o, fam) {
    const sett = new Set(), alle = [];
    for (const f of [...o.former, o.dansk]) { const k = f.toLowerCase(); if (!sett.has(k)) { sett.add(k); alle.push(f); } }
    const sterke = alle.filter(f => fam.sterk(f, o));
    const veike = alle.filter(f => !fam.sterk(f, o) && f !== o.dansk);
    const val = [o.dansk, ...stokk(veike).slice(0, 1), ...stokk(sterke).slice(0, 2)];
    return stokk(val.slice(0, 4));
  }
  function ros(f, fam, famId) {
    if (famId === "diftong") return `«${f}» har diftongen.`;
    if (famId === "hard") return `«${f}» har den harde konsonanten.`;
    if (famId === "sporjeord") return `«${f}» har ${/^kv/i.test(f) ? "kv" : "k"}, ikkje hv.`;
    if (famId === "j") return `«${f}» har j-en.`;
    return "Rett!";
  }
  /* Viser spørsmålet over kampen. Gir { rett, form }. */
  function formSpor(ordId, { rettskriven, gaaver = {}, rettleiing } = {}) {
    const o = RPGData.ORD[ordId], famId = o.fam, fam = RPGData.FAMILIAR[famId];
    return new Promise(res => {
      const alt = formval(o, fam);
      const ms = (rettskriven ? 6500 : 9500) * (gaaver.tidsauga ? 1.5 : 1);
      const el = document.createElement("div");
      el.className = "kamp-sporsmal" + (rettskriven ? " rettskriven" : "");
      el.innerHTML = `<p class="sp-overskrift">${rettskriven ? "Ordet er rettskrive! Finn forma att" : "Kva form ber krafta?"}</p>
        <div class="sp-klokke"><span></span></div>
        <p class="sp-tekst"><span class="sp-ord">${E(o.aasen)}</span> <span class="sp-cue">«${E(o.tyding)}» · ${E(fam.namn)}</span></p>
        <p class="sp-hint">${E(fam.hint)}${rettleiing ? " Den danske forma har mista lyden." : ""}</p>
        <div class="sp-alt">${alt.map((f, i) => `<button type="button" data-i="${i}"><span class="sp-tast">${i + 1}</span>${E(f)}</button>`).join("")}</div>`;
      rot.appendChild(el);
      const kn = [...el.querySelectorAll("button")];
      let valt = 0, ferdig = false;
      const merk = () => kn.forEach((b, i) => b.classList.toggle("peikar", i === valt));
      merk();
      const t0 = performance.now();
      const klokke = el.querySelector(".sp-klokke span");
      const tikk = () => {
        if (ferdig) return;
        const u = Math.min(1, (performance.now() - t0) / ms);
        klokke.style.width = `${(1 - u) * 100}%`;
        if (u >= 1) svar(null); else requestAnimationFrame(tikk);
      };
      requestAnimationFrame(tikk);
      const svar = i => {
        if (ferdig) return;
        ferdig = true; slepp();
        const form = i == null ? null : alt[i];
        const rett = form != null && fam.sterk(form, o);
        kn.forEach((b, j) => { b.disabled = true; if (fam.sterk(alt[j], o)) b.classList.add("rett"); else if (j === i) b.classList.add("feil"); });
        const forklaring = rett ? ros(form, fam, famId) : form == null ? `Tida gjekk ut. «${o.aasen}» hadde bore krafta.` : fam.kvifor(form, o);
        el.insertAdjacentHTML("beforeend", `<p class="sp-svar ${rett ? "rett" : "feil"}">${rett ? "Rett! " : ""}${E(forklaring)}</p>`);
        setTimeout(() => { el.remove(); res({ rett, form }); }, rett ? 1100 : 2600);
      };
      const tast = e => { const n = parseInt(e.key, 10); if (n >= 1 && n <= alt.length) { e.preventDefault(); e.stopPropagation(); svar(n - 1); } };
      document.addEventListener("keydown", tast, true);
      const sleppLytt = Motor.lytt({ a: () => svar(valt), retning: d => { if (d === 1 || d === 2) valt = (valt + alt.length - 1) % alt.length; else valt = (valt + 1) % alt.length; merk(); } });
      const slepp = () => { document.removeEventListener("keydown", tast, true); sleppLytt(); };
    });
  }

  /* ---------- Bakgrunnar i 16-bitsstil ---------- */
  const bakCache = {};
  /* Handteikna bakgrunnar (bilete/spel/kamp/<type>.png, laga med tools/pikselkunst/bakgrunn.py).
     Til biletet er lasta, blir den utrekna bakgrunnen under brukt. */
  function bakgrunnBilete(type) {
    const img = Pikslar.hent(`bilete/spel/kamp/${type}.png`);
    if (Pikslar.klar(img)) return img;
    return reknaBakgrunn(type);
  }
  function reknaBakgrunn(type) {
    if (bakCache[type]) return bakCache[type];
    const c = Pikslar.lerret(320, 192), b = c.getContext("2d");
    const band = (farger, y0, y1) => { const n = farger.length, h = (y1 - y0) / n; farger.forEach((f, i) => { b.fillStyle = f; b.fillRect(0, Math.round(y0 + i * h), 320, Math.ceil(h) + 1); }); for (let i = 1; i < n; i++) { b.fillStyle = farger[i]; const y = Math.round(y0 + i * h) - 1; for (let x = i % 2; x < 320; x += 2) b.fillRect(x, y, 1, 1); } };
    const fjell = (farge, topp, snø, basis, fro) => {
      b.fillStyle = farge; b.beginPath(); b.moveTo(0, basis);
      const pkt = [];
      for (let x = 0; x <= 320; x += 4) { const h = topp + Math.sin(x / 37 + fro) * 14 + Math.sin(x / 13 + fro * 2) * 5 + Math.sin(x / 71 + fro) * 10; pkt.push([x, h]); b.lineTo(x, h); }
      b.lineTo(320, basis); b.closePath(); b.fill();
      if (snø) { b.fillStyle = snø; for (const [x, h] of pkt) if (h < topp - 6) b.fillRect(x, Math.round(h), 4, Math.round(topp - 6 - h) + 1); }
    };
    const R = Pikslar.RAMP;
    if (type === "tun" || type === "utmark") {
      const dag = type === "tun";
      band(dag ? ["#5a8ad8", "#6c9ae0", "#82ace6", "#9cc0ec", "#b8d4f0"] : ["#2c2250", "#4a2e62", "#72406a", "#a8586a", "#d8806a"], 0, 70);
      fjell(dag ? "#6a78a0" : "#3a3458", 46, dag ? "#e8ecf8" : "#b8a8c8", 90, 1);
      fjell(dag ? "#4a5a80" : "#2a2440", 62, null, 92, 3);
      if (dag) { b.fillStyle = R.vatn[2]; b.fillRect(0, 74, 320, 10); b.fillStyle = R.vatn[3]; for (let x = 0; x < 320; x += 9) b.fillRect(x + (x % 5), 77 + (x % 3) * 2, 5, 1); }
      for (let x = 0; x < 320; x += 12) { const h = 10 + ((x * 7) % 9); b.fillStyle = dag ? "#1f4c38" : "#141c26"; b.beginPath(); b.moveTo(x, 90); b.lineTo(x + 6, 90 - h); b.lineTo(x + 12, 90); b.fill(); }
      band(dag ? [R.gras[1], R.gras[2], R.gras[2], R.gras[3]] : [R.villgras[0], R.villgras[1], R.villgras[1], R.villgras[2]], 90, 192);
      for (let i = 0; i < 90; i++) { const x = (i * 97) % 320, y = 96 + ((i * 53) % 90); b.fillStyle = dag ? R.gras[4] : R.villgras[3]; b.fillRect(x, y, 1, 2); b.fillRect(x + 1, y - 1, 1, 1); }
    } else if (type === "arkiv") {
      band(["#0e0a18", "#141026", "#1a1430"], 0, 96);
      for (let x = 6; x < 320; x += 52) { b.fillStyle = "#2a1c20"; b.fillRect(x, 10, 44, 78); for (let y = 16; y < 84; y += 14) { b.fillStyle = "#140c10"; b.fillRect(x + 3, y, 38, 10); for (let k = 0; k < 9; k++) { b.fillStyle = ["#201848", "#383070", "#62182a", "#101028"][(k + y) % 4]; b.fillRect(x + 4 + k * 4, y + 1 + (k % 3 === 0 ? 1 : 0), 3, 9 - (k % 3 === 0 ? 1 : 0)); } } b.fillStyle = "#383070"; b.fillRect(x + 12, 88, 2, 6); b.fillRect(x + 30, 88, 1, 4); }
      band(["#2a2838", "#232030", "#1c1a28", "#16141f"], 96, 192);
      b.fillStyle = "rgba(56,48,112,.55)"; b.beginPath(); b.ellipse(90, 150, 70, 12, 0, 0, Math.PI * 2); b.fill();
    } else {
      for (let y = 0; y < 96; y += 8) { b.fillStyle = R.tommer[2]; b.fillRect(0, y, 320, 8); b.fillStyle = R.tommer[3]; b.fillRect(0, y, 320, 1); b.fillStyle = R.tommer[0]; b.fillRect(0, y + 7, 320, 1); }
      band([R.plank[1], R.plank[2], R.plank[2], R.plank[1]], 96, 192);
      for (let y = 100; y < 192; y += 8) { b.fillStyle = R.plank[0]; b.fillRect(0, y, 320, 1); }
    }
    return (bakCache[type] = c);
  }

  /* ---------- Kampen ---------- */
  async function start({ fiendar, boss, parti, gaaver = {}, bakgrunn, ord = {}, stev = [], startKved = 0, rettleiing, paaVesen, paaSiger }) {
    const D = RPGData;
    const fi = fiendar.map((id, i) => {
      const d = D.FIENDAR[id];
      const nr = fiendar.filter(x => x === id).length > 1 ? " " + "ABCDE"[fiendar.slice(0, i + 1).filter(x => x === id).length - 1] : "";
      return { id, d, namn: d.namn + nr, hp: d.hp, maxhp: d.hp, atk: d.atk, def: d.def, spd: d.spd, atb: rnd(0, 40), tur: 0, blink: 0, fiende: true, avslort: 0, sov: 0 };
    });
    fi.forEach(f => paaVesen && paaVesen(f.id, false));
    const pa = parti.map(m => Object.assign(m, { atb: rnd(20, 60), vern: 0, blink: 0, fram: 0, kved: m.galdr ? startKved : 0 }));
    // Kvedemålaren til Ivar fyller seg når han tek skade eller gjer noko. Full målar = stev.
    const kvedAuke = (m, n) => { if (m && m.galdr && m.hp > 0 && stev.length) m.kved = Math.min(100, m.kved + n); };
    const rettskrivne = new Set();
    let utfall = null, travel = false, meldingTid = 0;
    const ventar = [];
    const tal = [];

    rot.hidden = false;
    rot.innerHTML = `
      <p class="kamp-melding" hidden></p>
      ${rettleiing ? '<p class="kamp-hint">Vel <b>Galdr</b> og syng eit ord. Vel så forma som har teke vare på lyden.</p>' : ""}
      <div class="kamp-botn">
        <div class="kamp-vindauge kamp-fiendar"></div>
        <div class="kamp-vindauge kamp-parti"></div>
      </div>
      <div class="kamp-vindauge kamp-meny" hidden></div>
      <div class="kamp-vindauge kamp-siger" hidden></div>`;
    const melding = rot.querySelector(".kamp-melding"), fiListe = rot.querySelector(".kamp-fiendar"), paListe = rot.querySelector(".kamp-parti"), meny = rot.querySelector(".kamp-meny");
    const meld = (t, ms = 1400) => { melding.innerHTML = `<span>${E(t)}</span>`; melding.hidden = false; meldingTid = performance.now() + ms; };

    // Plassering på lerretet (320 × 192): fiendar til venstre med føtene på bakken, partiet til høgre.
    const SLOT = { 1: [[88, 118]], 2: [[64, 106], [126, 120]], 3: [[52, 102], [104, 120], [150, 104]], 4: [[46, 100], [96, 118], [140, 100], [176, 120]],
      // Fem (rottesvermen): tre bak og to framme i luka mellom dei, så alle syner. Dei bakre blir teikna først.
      5: [[38, 94], [94, 94], [150, 94], [64, 132], [122, 132]] };
    const fiPos = i => { const [x, y] = SLOT[Math.min(5, fi.length)][i]; return { x, y }; };
    const paPos = i => ({ x: 246 + i * 16, y: 68 + i * 30 });

    function oppdaterLister() {
      fiListe.innerHTML = fi.filter(f => f.hp > 0).map(f => `<p>${E(f.namn)}${f.avslort > 0 ? ` <small class="avslort">${Math.round(f.hp)}/${f.maxhp}${D.ORD && f.d.slag ? " · " + E(f.d.slag) : ""}</small>` : ""}${f.sov > 0 ? ' <small class="sov">søv</small>' : ""}</p>`).join("");
      paListe.innerHTML = pa.map(m => `<div class="kp-rad${m.hp <= 0 ? " fallen" : ""}${ventar[0] === m ? " aktiv" : ""}">
        <span class="kp-namn">${E(m.namn)}</span><span class="kp-hp">${Math.max(0, Math.round(m.hp))}<small>/${m.maxhp}</small></span>
        <span class="kp-mp">${m.rost}<small>/${m.maxrost}</small></span><span class="kp-atb"><i style="width:${Math.min(100, m.atb)}%"></i></span>${m.galdr && stev.length ? `<span class="kp-kved${m.kved >= 100 ? " full" : ""}" title="Kvedemålar"><i style="width:${m.kved}%"></i></span>` : ""}</div>`).join("");
    }

    /* Effektar: ord som flyg, gneistar, ringar, blekksprut, notar og skjelving.
       Kvar effekt har ein type, ein starttid og ei varigheit. */
    const fx = [];
    let skjelvTil = 0, skjelvKraft = 0, blits = null;
    const leggFx = f => { f.t0 = performance.now() + (f.forseinking || 0); f.dur = f.dur || 600; if (f.n) f.del = Array.from({ length: f.n }, (_, i) => ({ v: (i / f.n) * Math.PI * 2 + rnd(-0.3, 0.3), fart: rnd(0.5, 1) })); fx.push(f); };
    const skjelv = (ms, kraft = 2) => { skjelvTil = performance.now() + ms; skjelvKraft = kraft; };
    const blink = (farge, ms = 140) => { blits = { farge, t0: performance.now(), dur: ms }; };
    const midtFi = f => { const i = fi.indexOf(f), p = fiPos(i), h = Pikslar.fiende(f.d.bilete).height; return { x: p.x, y: p.y - h / 2 }; };
    const midtPa = m => { const p = paPos(pa.indexOf(m)); return { x: p.x + 8, y: p.y + 12 }; };
    const midt = v => v.fiende ? midtFi(v) : midtPa(v);
    function teiknFx(no) {
      for (let i = fx.length - 1; i >= 0; i--) {
        const f = fx[i], u = (no - f.t0) / f.dur;
        if (u < 0) continue;
        if (u >= 1) { fx.splice(i, 1); if (f.etter) f.etter(); continue; }
        g.save();
        if (f.type === "ordkast") {
          const x = f.fra.x + (f.til.x - f.fra.x) * u, y = f.fra.y + (f.til.y - f.fra.y) * u - Math.sin(u * Math.PI) * 18;
          for (let k = 3; k >= 0; k--) {
            const uu = Math.max(0, u - k * 0.06), xx = f.fra.x + (f.til.x - f.fra.x) * uu, yy = f.fra.y + (f.til.y - f.fra.y) * uu - Math.sin(uu * Math.PI) * 18;
            g.globalAlpha = k ? 0.25 / k : 1; pikselTekst(f.tekst, xx, yy, f.farge, SKUGGE);
          }
          void x; void y;
        } else if (f.type === "brest") {
          for (const d of f.del) {
            const r = u * f.r * d.fart, x = Math.round(f.x + Math.cos(d.v) * r), y = Math.round(f.y + Math.sin(d.v) * r + (f.tyngd ? u * u * 20 : 0));
            g.globalAlpha = 1 - u; g.fillStyle = f.farge; g.fillRect(x, y, u < 0.5 ? 2 : 1, u < 0.5 ? 2 : 1);
          }
        } else if (f.type === "ring") {
          g.globalAlpha = 1 - u; g.strokeStyle = f.farge; g.lineWidth = 2;
          g.beginPath(); g.ellipse(f.x, f.y, f.r0 + (f.r1 - f.r0) * u, (f.r0 + (f.r1 - f.r0) * u) * (f.flat || 1), 0, 0, Math.PI * 2); g.stroke();
        } else if (f.type === "glitter") {
          for (const d of f.del) {
            const x = Math.round(f.x + Math.cos(d.v) * 10 * d.fart), y = Math.round(f.y + 8 - u * 26 * d.fart + Math.sin(d.v) * 4);
            g.globalAlpha = Math.min(1, (1 - u) * 1.5); g.fillStyle = f.farge;
            g.fillRect(x, y - 1, 1, 3); g.fillRect(x - 1, y, 3, 1);
          }
        } else if (f.type === "kutt") {
          g.globalAlpha = 1 - u; g.strokeStyle = "#ffffff"; g.lineWidth = 1;
          for (let k = -1; k <= 1; k++) { g.beginPath(); g.moveTo(f.x - 10 + k * 4, f.y - 10); g.lineTo(f.x - 10 + k * 4 + 20 * Math.min(1, u * 3), f.y - 10 + 20 * Math.min(1, u * 3)); g.stroke(); }
        } else if (f.type === "noter") {
          for (let k = 0; k < 7; k++) {
            const x = 300 - ((u * 340 + k * 48) % 340), y = 40 + Math.sin(u * 8 + k) * 12 + (k % 3) * 18;
            g.globalAlpha = Math.min(1, (1 - u) * 2); pikselTekst(k % 2 ? "♪" : "♫", x, y, "#f8d840", SKUGGE);
          }
        }
        g.restore();
      }
      if (blits) { const u = (no - blits.t0) / blits.dur; if (u >= 1) blits = null; else { g.fillStyle = blits.farge.replace("A", String(0.55 * (1 - u))); g.fillRect(0, 0, 320, 192); } }
    }

    /* Teikning */
    function teikn(no) {
      g.save();
      if (skjelvTil > no) g.translate(Math.round(rnd(-skjelvKraft, skjelvKraft)), Math.round(rnd(-skjelvKraft, skjelvKraft)));
      g.drawImage(bakgrunnBilete(bakgrunn), 0, 0);
      const skjelv = f => (f.blink > no ? Math.round(Math.sin(no / 25) * 2) : 0);
      fi.forEach((f, i) => {
        if (f.hp <= 0 && f.borte) return;
        const p = fiPos(i), bilde = Pikslar.fiende(f.d.bilete);
        if (f.hp <= 0 && !f.dod) f.dod = no;                             // fall utan skade (til dømes i testar)
        const alpha = f.hp <= 0 ? Math.max(0, 1 - (no - f.dod) / 600) : 1;
        if (f.hp <= 0 && alpha <= 0) f.borte = true;
        const x = Math.round(p.x - bilde.width / 2 + (f.fram > no ? 8 : 0) + skjelv(f)), y = Math.round(p.y - bilde.height + (f.id === "irrbloss" ? Math.sin(no / 300) * 3 : f.hp > 0 ? Math.sin(no / 420 + i * 1.7) * 1.2 : 0));
        g.fillStyle = "rgba(10,5,20,.35)"; g.beginPath(); g.ellipse(p.x, p.y, bilde.width * 0.38, 4, 0, 0, Math.PI * 2); g.fill();
        g.globalAlpha = alpha;
        if (f.blink > no && Math.floor(no / 60) % 2) g.globalAlpha = 0.35 * alpha;
        if (f.hp <= 0) {
          // Kvitt blink i forma til fienden (på eit eige lerret, så det ikkje dekkjer bakgrunnen).
          const c = kvittLerret(bilde, 0.6 * alpha); g.drawImage(c, x, y);
        } else g.drawImage(bilde, x, y);
        g.globalAlpha = 1;
        if (f.avslort > 0 && f.hp > 0) { g.fillStyle = "#7fd0f0"; g.fillRect(x + bilde.width / 2 - 1, y - 6, 3, 3); }
      });
      pa.forEach((m, i) => {
        const p = paPos(i);
        const rammer = m.sprite.rammer[2], kp = m.sprite.kamp;
        // Den som har tur, står eit steg framom dei andre med ei grå pil over seg.
        const aktiv = ventar[0] === m && m.hp > 0, fram = aktiv ? 8 : 0;
        g.fillStyle = "rgba(10,5,20,.35)"; g.fillRect(p.x + 3 - fram, p.y + 22, 10, 3);
        // Slått ut: ligg på bakken. Treft: skadd. Handlar: åtak eller galdr. Lite liv: på kne (som i Final Fantasy VI).
        if (m.hp <= 0) { g.drawImage(kp.ute, p.x - 4, p.y + 9); return; }
        if (siger) {
          // Siger (som i Final Fantasy VI): snur seg mot oss og vekslar mellom sigerstilling og ståramme.
          const sp = m.sprite, fase = Math.floor((no - siger) / 320 + i) % 2;
          const sigerRammer = (sp.siger && sp.siger.length) ? sp.siger : [sp.rammer[0][1], sp.rammer[0][2]];
          const b = fase ? sigerRammer[Math.floor((no - siger) / 640) % sigerRammer.length] : sp.rammer[0][0];
          g.drawImage(b, p.x, p.y - (fase ? 2 : 0));
          return;
        }
        const ramme = m.blink > no ? kp.skadd
          : m.fram > no ? (m.pose === "galdr" ? kp.galdr : kp.atak)
          : aktiv ? rammer[0]
          : m.hp < m.maxhp * 0.25 ? kp.svak : rammer[0];
        const rx = Math.round(p.x - (m.fram > no ? (m.pose === "galdr" ? 6 : 12) : 0) - fram);
        g.drawImage(ramme, rx, p.y);
        if (aktiv && !(m.fram > no)) {
          const px = rx + 8, py = p.y - 8;
          for (const [dy, w, c] of [[0, 4, "#1a1a24"], [1, 3, "#1a1a24"], [2, 2, "#1a1a24"], [3, 1, "#1a1a24"], [4, 0, "#1a1a24"]]) {
            g.fillStyle = c; g.fillRect(px - w - 1, py + dy, (w + 1) * 2, 1);
          }
          for (const [dy, w] of [[0, 3], [1, 2], [2, 1], [3, 0]]) {
            g.fillStyle = dy === 0 ? "#e4e4ec" : "#a8a8b6"; g.fillRect(px - w, py + dy, w * 2, 1);
          }
        }
        if (m.vern > 0) { g.strokeStyle = "rgba(248,216,64,.8)"; g.lineWidth = 1; g.beginPath(); g.ellipse(p.x + 8, p.y + 13, 11, 14, 0, 0, Math.PI * 2); g.stroke(); }
      });
      for (let i = tal.length - 1; i >= 0; i--) {
        const t = tal[i], u = (no - t.t0) / 1000;
        if (u >= 1) { tal.splice(i, 1); continue; }
        const hopp = u < 0.3 ? -Math.sin(u / 0.3 * Math.PI) * 8 : 0;
        pikselTekst(t.tekst, t.x, t.y + hopp - u * 6, t.farge, OMRISS);
      }
      teiknFx(no);
      g.restore();
      if (melding && !melding.hidden && no > meldingTid && !travel) melding.hidden = true;
    }
    const visTal = (mål, tekst, farge) => {
      const i = mål.fiende ? fi.indexOf(mål) : pa.indexOf(mål);
      const p = mål.fiende ? fiPos(i) : paPos(i);
      const h = mål.fiende ? Pikslar.fiende(mål.d.bilete).height : 24;
      tal.push({ x: p.x + (mål.fiende ? 0 : 8), y: mål.fiende ? p.y - h / 2 : p.y + 8, tekst: String(tekst), farge, t0: performance.now() });
    };

    /* Handlingar */
    function skade(frå, til, faktor = 1, { gjennom } = {}) {
      const vern = til.vern > 0 && !gjennom ? 1.8 : 1;
      const avsl = til.avslort > 0 ? 1.5 : 1;
      let s = (frå.atk * 2 + rnd(0, frå.atk / 2)) * faktor * avsl - (gjennom ? 0 : til.def * vern);
      if (til.vern > 0 && !gjennom) s *= 0.6;
      s = Math.max(1, Math.round(s));
      til.hp = Math.max(0, til.hp - s);
      til.blink = performance.now() + 400;
      if (til.hp <= 0 && til.fiende) { til.dod = performance.now(); paaVesen && paaVesen(til.id, true); }
      if (!til.fiende) kvedAuke(til, 12);
      const m0 = midt(til);
      if (til.fiende) {
        leggFx({ type: "brest", x: m0.x, y: m0.y, farge: "#ffffff", r: 14, n: 10, dur: 380 });
        if (til.hp <= 0) leggFx({ type: "brest", x: m0.x, y: m0.y, farge: til.d.slag === "blekk" ? "#5848a0" : "#c8ccd4", r: 30, n: 22, dur: 900, tyngd: true });
      } else leggFx({ type: "kutt", x: m0.x, y: m0.y, dur: 260 });
      if (s >= Math.max(12, til.maxhp * 0.2)) skjelv(260, 2);
      visTal(til, s, til.fiende ? "#fff" : "#ffb0a0");
      return s;
    }
    const lækj = (v, n) => { const før = v.hp; v.hp = Math.min(v.maxhp, v.hp + Math.round(n)); visTal(v, `+${Math.round(v.hp - før)}`, "#9ff09f"); };
    const levandeFi = () => fi.filter(f => f.hp > 0);
    const levandePa = () => pa.filter(m => m.hp > 0);
    function rettskriv(f, sp) {
      const ivar = pa.find(m => m.galdr && m.hp > 0);
      const kand = Object.keys(ord).filter(id => { const o = D.ORD[id]; return o && o.fam !== "smaaord" && o.fam !== "nokkel" && !rettskrivne.has(id); });
      if (!ivar || !kand.length) return false;
      if (gaaver.vaktaren && Math.random() < 0.5) { meld("Vaktaren prellar av rettskrivinga!", 1800); return true; }
      const id = kand[Math.floor(Math.random() * kand.length)], o = D.ORD[id];
      rettskrivne.add(id);
      meld(`${sp.tekst} «${o.aasen}» vart rettskrive til «${o.dansk}».`, 2400);
      ivar.blink = performance.now() + 400;
      return true;
    }
    async function fiendeTur(f) {
      travel = true;
      f.tur++;
      if (f.avslort > 0) f.avslort--;
      if (f.sov > 0) { f.sov--; meld(`${f.namn} drøymer og gjer ingenting.`); await vent(700); f.atb = 0; travel = false; return; }
      const levande = levandePa();
      let sp = f.d.spesial;
      if (sp && sp.veksle && f.tur % sp.veksle.kvar === 0) sp = sp.veksle;
      else if (sp && f.tur % sp.kvar !== 0) sp = null;
      f.fram = performance.now() + 300;
      if (sp && sp.type === "rettskriv") {
        await vent(300);
        if (!rettskriv(f, sp)) { const mål = levande[Math.floor(Math.random() * levande.length)]; meld(`${f.namn} angrip ${mål.namn}!`); skade(f, mål); }
        await vent(900);
      } else if (sp && sp.type === "stel") {
        // Stel mat frå sekken (rottene): ein ting forsvinn, og fienden et han og får att HP.
        // Er sekken tom, bit han i staden.
        await vent(300);
        const sekk = pa.find(m => m.ting), lager = sekk && sekk.ting();
        if (lager && lager[sp.ting] > 0) {
          lager[sp.ting]--;
          meld(sp.tekst, 2000);
          lækj(f, sp.lækje || 10);
        } else {
          const mål = levande[Math.floor(Math.random() * levande.length)];
          meld(sp.tom || `${f.namn} angrip ${mål.namn}!`, 1600);
          skade(f, mål, sp.faktor || 1);
        }
        await vent(900);
      } else if (sp) {
        meld(sp.tekst, 1800);
        blink("rgba(88,72,160,A)", 260); skjelv(400, 3);
        await vent(700);
        for (const m of sp.alle ? levande : [levande[Math.floor(Math.random() * levande.length)]]) skade(f, m, sp.faktor || 1);
        await vent(650);
      } else {
        const mål = levande[Math.floor(Math.random() * levande.length)];
        meld(`${f.namn} angrip ${mål.namn}!`);
        await vent(350);
        skade(f, mål);
        await vent(650);
      }
      f.atb = 0;
      // Vernet varer eit visst tal på fiendeturar.
      pa.forEach(m => { if (m.vern > 0) m.vern -= 0.5; });
      travel = false;
    }
    const formFaktor = id => 1 + 0.12 * Math.max(0, Object.keys((ord[id] || {}).former || {}).length - 1);
    const rostKost = (m, id) => {
      const fam = D.ORD[id].fam;
      if (fam === "smaaord" && gaaver.smaaordring) return 0;
      return Math.max(1, D.FAMILIAR[fam].rost - (gaaver.oppslagsord ? 1 : 0));
    };
    async function galdr(m, id, mal) {
      const o = D.ORD[id], fam = D.FAMILIAR[o.fam], v = o.verknad || {};
      const rs = rettskrivne.has(id);
      m.rost -= rostKost(m, id);
      meld(`${m.namn} syng «${rs ? o.dansk : o.aasen}»`, 1600);
      let rett = true;
      if (fam.sterk) {
        ({ rett } = await formSpor(id, { rettskriven: rs, gaaver, rettleiing }));
        if (rs && !rett) { meld("Galdren fuskar. Ordet står framleis på dansk."); await vent(900); return; }
        if (rs && rett) { rettskrivne.delete(id); visTal(m, "Fri!", "#f8d840"); }
      }
      const mult = formFaktor(id) * (fam.sterk ? (rett ? 1.5 : 0.45) : 1);
      m.fram = performance.now() + 500; m.pose = "galdr";
      {
        const fra = midtPa(m), mål = mal ? midt(mal) : v.lækje || v.vern ? { x: 250, y: 90 } : { x: 90, y: 80 };
        leggFx({ type: "ordkast", fra, til: mål, tekst: o.aasen, farge: fam.farge, dur: 460 });
        await vent(460);
        const ber = rett ? 1 : 0.5;
        if (v.vern) levandePa().forEach(p => { const c = midtPa(p); leggFx({ type: "ring", x: c.x, y: c.y, r0: 4, r1: 18, flat: 1.2, farge: "#f8d840", dur: 700 }); });
        if (v.lækje) (v.alle ? levandePa() : [mal || m]).forEach(p => { const c = midtPa(p); leggFx({ type: "glitter", x: c.x, y: c.y, farge: "#9ff09f", n: 10, dur: 900 }); });
        if (v.avslor) (v.avslor === "alle" ? levandeFi() : [mal]).filter(Boolean).forEach(f => { const c = midtFi(f); leggFx({ type: "ring", x: c.x, y: c.y, r0: 26, r1: 4, farge: "#7fd0f0", dur: 600 }); leggFx({ type: "ring", x: c.x, y: c.y, r0: 34, r1: 8, farge: "#7fd0f0", dur: 600, forseinking: 150 }); });
        if (o.fam === "smaaord") leggFx({ type: "brest", x: mål.x, y: mål.y, farge: "#d8c8f8", r: 18, n: 12, dur: 500 });
        if (v.skade) leggFx({ type: "brest", x: mål.x, y: mål.y, farge: fam.farge, r: 22 * ber, n: 16, dur: 600 });
      }
      const passar = f => o.mot && o.mot.includes(f.d.slag);
      let tekst = rett ? `«${o.aasen}» ber krafta!` : "Galdren vart veik. Forma hadde mista lyden.";
      if (v.skade) {
        const mål = v.alle ? levandeFi() : [mal];
        for (const f of mål) {
          const bonus = passar(f) ? 1.6 : 1;
          if (bonus > 1) tekst = `Ordet passar! «${o.aasen}» råkar ${f.namn} hardt.`;
          skade(m, f, (v.skade + m.atk * 0.8) / (m.atk * 2.2) * mult * bonus, { gjennom: v.gjennom });
        }
      }
      if (v.skadeMot) {
        for (const f of levandeFi().filter(passar)) { skade(m, f, (v.skadeMot + m.atk * 0.5) / (m.atk * 2.2) * mult); tekst = `Ordet passar! ${f.d.slag === "blekk" ? "Ljoset brenn blekket." : "Snøen sløkkjer ljoset."}`; }
      }
      if (v.lækje) for (const p of v.alle ? levandePa() : [mal || m]) lækj(p, (v.lækje + m.atk) * mult);
      if (v.meto) lækj(m, v.meto * mult);
      if (v.vern) {
        const rundar = rett ? v.vern : 1;
        levandePa().forEach(p => { p.vern = Math.max(p.vern, rundar); visTal(p, "Vern", "#f8d840"); });
      }
      if (v.avslor) {
        const mål = v.avslor === "alle" ? levandeFi() : [mal];
        for (const f of mål) { f.avslort = rett ? 3 : 1; visTal(f, "Avslørt", "#7fd0f0"); }
        if (v.avslor === "ein" && mal) tekst = `${mal.namn}: ${mal.d.tekst}`;
        if (passar(mal || {}) && mal && mal.d.slag === "vette") { mal.sov = 1; tekst = `«${o.aasen} er du?» Vetten blir forvirra.`; }
      }
      if (v.sov && mal && rett) { mal.sov = 1; visTal(mal, "Zzz", "#d8c8f8"); }
      if (v.loys && rettskrivne.size) { rettskrivne.clear(); tekst = "Alle rettskrivne ord er laus att!"; }
      if (v.stopp && mal) { mal.atb = 0; visTal(mal, "Stopp", "#d8c8f8"); tekst = `«${o.aasen}»! ${mal.namn} stoppar opp.`; }
      if (v.snogg) tekst = `«${o.aasen}»! ${m.namn} er klar att med ein gong.`;
      meld(tekst, 2000);
      await vent(800);
      if (v.snogg) m.atb = 100 - 0.001;
    }
    async function partiHandling(m, kommando, mal, id, ting) {
      travel = true;
      let snogg = false;
      if (kommando === "angrip") {
        m.fram = performance.now() + 300; m.pose = "atak";
        meld(`${m.namn} angrip!`);
        await vent(300);
        skade(m, mal);
        kvedAuke(m, 5);
        await vent(600);
      } else if (kommando === "stev") {
        const def = D.STEVGALDR[id], v = def.verknad;
        m.kved = 0;
        meld(`${m.namn} kveder ${def.namn}!`, 1600);
        await vent(600);
        const { kraft } = await Stev.kved(id, { ord, gaaver });
        m.fram = performance.now() + 1200; m.pose = "galdr";
        leggFx({ type: "noter", dur: 1600 }); blink("rgba(248,216,64,A)", 320);
        leggFx({ type: "ring", x: 160, y: 90, r0: 10, r1: 150, flat: 0.5, farge: "#f8d840", dur: 900 });
        if (v.skade) skjelv(600, 3);
        await vent(500);
        if (v.skade) for (const f of v.alle ? levandeFi() : [mal]) skade(m, f, (v.skade * kraft + m.atk) / (m.atk * 2.2) * (v.mot && v.mot.includes(f.d.slag) ? 1.6 : 1), { gjennom: true });
        if (v.lækjeProsent) levandePa().forEach(p => lækj(p, p.maxhp * v.lækjeProsent / 100 * kraft));
        if (v.vern) levandePa().forEach(p => { p.vern = Math.max(p.vern, Math.max(1, Math.round(v.vern * kraft))); visTal(p, "Vern", "#f8d840"); });
        meld(kraft >= 0.8 ? `${def.namn} fyller heile rommet!` : kraft >= 0.45 ? `${def.namn} ber godt.` : `${def.namn} vart svakt. Det manglar noko.`, 1800);
        await vent(900);
      } else if (kommando === "galdr") {
        await galdr(m, id, mal);
        kvedAuke(m, 8);
        snogg = D.ORD[id].verknad && D.ORD[id].verknad.snogg;
      } else if (kommando === "song") {
        const ev = D.EVNER[id];
        m.rost -= ev.rost;
        m.fram = performance.now() + 600; m.pose = "galdr";
        meld(`${m.namn} syng ${ev.namn}`, 1500);
        await vent(400);
        if (ev.type === "lækje") levandePa().forEach(p => lækj(p, ev.kraft + m.atk));
        if (ev.type === "sov" && mal) { mal.sov = 1; visTal(mal, "Zzz", "#d8c8f8"); meld(`${mal.namn} blir lokka inn i ein draum.`); }
        await vent(700);
      } else if (kommando === "ting") {
        const t = D.TING[ting];
        m.brukTing(ting);
        if (t.lækje) lækj(mal, t.lækje);
        if (t.rost) { const før = mal.rost; mal.rost = Math.min(mal.maxrost, mal.rost + t.rost); visTal(mal, `+${mal.rost - før} røyst`, "#9fd0ff"); }
        if (t.vekk && mal.hp <= 0) { mal.hp = Math.round(mal.maxhp * t.vekk); visTal(mal, "Vaken!", "#9ff09f"); }
        meld(`${m.namn} brukar ${t.namn}.`);
        await vent(700);
      } else if (kommando === "flykt") {
        if (!boss && Math.random() < 0.65) { meld("Partiet kom seg unna!"); await vent(700); utfall = "flukt"; }
        else { meld(boss ? "Du kan ikkje flykte frå denne!" : "Kom ikkje unna!"); await vent(700); }
      }
      m.atb = snogg ? 99.9 : 0;
      travel = false;
    }

    /* Kommandomenyen */
    function meny_(m) {
      return new Promise(res => {
        /* Vindauga har fast storleik (som i Final Fantasy VI): kommandoane og «Kven?» i eit
           smalt vindauge med fem rader, lister (Galdr, Song, Ting, Stev) i eit breitt vindauge med
           to kolonner og fire rader som rullar, og ei fast line med skildringa av det som er valt. */
        const vis = (tittel, alt, tilbake, liste = false) => {
          meny.hidden = false;
          meny.classList.toggle("brei", liste);
          meny.innerHTML = `<p class="km-tittel">${E(tittel)}</p><div class="km-alt"></div>${liste ? '<p class="km-info"><span></span></p>' : ""}`;
          const info = meny.querySelector(".km-info span");
          return Motor.liste(meny.querySelector(".km-alt"), alt.map(a => Object.assign({}, a, { namn: E(a.namn), info: a.info ? E(a.info) : "" })), {
            rader: liste ? 4 : 5, kolonner: liste ? 2 : 1, tilbake,
            start: Math.max(0, alt.findIndex(a => !a.av)),
            merk: i => { if (info) info.textContent = alt[i].tekst || " "; },
          });
        };
        const velMal = type => {
          if (type === "ingen") return Promise.resolve(null);
          const liste = type === "venn" ? pa.filter(v => v.hp > 0) : type === "venn-fall" ? pa : levandeFi();
          return vis("Kven?", liste.map(v => ({ namn: v.namn, info: v.fiende ? (v.avslort > 0 ? `${Math.round(v.hp)}/${v.maxhp}` : "") : `${Math.round(v.hp)}/${v.maxhp}` })), true).then(i => i < 0 ? undefined : liste[i]);
        };
        const malType = v => (v.skade && !v.alle) || v.avslor === "ein" || v.stopp || v.sov ? "fiende" : (v.lækje && !v.alle) ? "venn" : "ingen";
        (async function hovud() {
          while (true) {
            const hovudval = m.galdr
              ? [{ namn: "Angrip" }, { namn: "Galdr", av: !Object.keys(ord).some(id => D.ORD[id] && D.ORD[id].fam !== "nokkel" && m.rost >= rostKost(m, id)) }, ...(stev.length ? [{ namn: "Stev", av: m.kved < 100, info: m.kved < 100 ? `${Math.floor(m.kved)} %` : "klar" }] : []), { namn: "Ting", av: !Object.values(m.ting()).some(n => n > 0) }, { namn: "Flykt" }]
              : [{ namn: "Angrip" }, { namn: "Song", av: !m.evner.some(id => m.rost >= D.EVNER[id].rost) }, { namn: "Ting", av: !Object.values(m.ting()).some(n => n > 0) }, { namn: "Flykt" }];
            const ix = await vis(m.namn, hovudval);
            const valNamn = hovudval[ix] && hovudval[ix].namn;
            const i = { Angrip: 0, Galdr: 1, Song: 1, Ting: 2, Flykt: 3, Stev: 9 }[valNamn];
            if (i === 9) {
              const j = await vis("Stev", stev.map(id => { const def = D.STEVGALDR[id], s2 = Stev.status(def, ord); return { namn: def.namn, info: `${s2.fylte.length}/${Object.keys(def.hol).length} ord`, tekst: def.tekst + (s2.manglar.length ? ` Manglar ${s2.manglar.length} ord.` : "") }; }), true, true);
              if (j >= 0) { meny.hidden = true; return res(["stev", null, stev[j]]); }
            }
            if (i === 0) { const mal = await velMal("fiende"); if (mal) { meny.hidden = true; return res(["angrip", mal]); } }
            if (i === 1 && m.galdr) {
              const ider = Object.keys(ord).filter(id => D.ORD[id] && D.ORD[id].fam !== "nokkel").sort((a, b) => FAM_ORDEN.indexOf(D.ORD[a].fam) - FAM_ORDEN.indexOf(D.ORD[b].fam));
              const j = await vis("Galdr", ider.map(id => {
                const o = D.ORD[id], rs = rettskrivne.has(id), fam = D.FAMILIAR[o.fam];
                return { namn: rs ? o.dansk : o.aasen, info: `${fam.evne} · ${rostKost(m, id)}`, av: m.rost < rostKost(m, id), farge: fam.farge, klasse: rs ? "rettskriven" : "", tekst: rs ? `Rettskrive til dansk! Finn den rette forma for å få ordet att.` : o.tekst };
              }), true, true);
              if (j >= 0) { const id = ider[j], v = D.ORD[id].verknad || {}; const mal = await velMal(malType(v)); if (mal !== undefined) { meny.hidden = true; return res(["galdr", mal, id]); } }
            }
            if (i === 1 && !m.galdr) {
              const j = await vis("Song", m.evner.map(id => { const ev = D.EVNER[id]; return { namn: ev.namn, info: `${ev.rost} røyst`, av: m.rost < ev.rost, tekst: ev.tekst }; }), true, true);
              if (j >= 0) { const ev = D.EVNER[m.evner[j]]; const mal = await velMal(ev.mal === "alle" ? "ingen" : "fiende"); if (mal !== undefined) { meny.hidden = true; return res(["song", mal, m.evner[j]]); } }
            }
            if (i === 2) {
              const eigd = Object.entries(m.ting()).filter(([, n]) => n > 0);
              const j = await vis("Ting", eigd.map(([id, n]) => ({ namn: D.TING[id].namn, info: `×${n}`, tekst: D.TING[id].tekst })), true, true);
              if (j >= 0) { const id = eigd[j][0]; const mal = await velMal(D.TING[id].vekk ? "venn-fall" : "venn"); if (mal !== undefined) { meny.hidden = true; return res(["ting", mal, null, id]); } }
            }
            if (i === 3) { meny.hidden = true; return res(["flykt"]); }
          }
        })();
      });
    }

    /* Løkka */
    oppdaterLister();
    meld(boss ? `${fi[0].namn}!` : fi.length > 1 ? "Fiendar dukkar opp!" : `${fi[0].namn} dukkar opp!`, 1500);
    let sist = performance.now(), menyOpen = false;
    siger = 0;
    window.KampTest = { fiendar: fi };                                // til automatiske testar (skjerm.html vinn=1)
    const teiknLoop = () => { if (!rot.hidden) { teikn(performance.now()); requestAnimationFrame(teiknLoop); } };
    requestAnimationFrame(teiknLoop);
    requestAnimationFrame(() => requestAnimationFrame(() => Motor.tonInn()));   // kampscena er teikna: ton inn
    while (!utfall) {
      await vent(30);
      const no = performance.now(), dt = Math.min(100, no - sist); sist = no;
      if (fi.every(f => f.hp <= 0)) { utfall = "siger"; break; }
      if (pa.every(m => m.hp <= 0)) { utfall = "tap"; break; }
      if (travel || menyOpen) continue;
      for (const x of [...fi, ...pa]) if (x.hp > 0 && !ventar.includes(x)) x.atb = Math.min(100, x.atb + x.spd * dt * 0.0045 * (rettleiing && x.fiende ? 0.6 : 1));
      for (const m of pa) if (m.hp > 0 && m.atb >= 99.9 && !ventar.includes(m)) ventar.push(m);
      oppdaterLister();
      const klarFiende = fi.find(f => f.hp > 0 && f.atb >= 100);
      if (klarFiende) { await fiendeTur(klarFiende); oppdaterLister(); continue; }
      const m = ventar[0];
      if (m) {
        if (m.hp <= 0) { ventar.shift(); continue; }
        menyOpen = true;
        oppdaterLister();
        const [k, mal, id, ting] = await meny_(m);
        menyOpen = false;
        ventar.shift();
        let malet = mal;
        if (malet && malet.fiende && malet.hp <= 0) malet = levandeFi()[0];
        await partiHandling(m, k, malet, id, ting);
        oppdaterLister();
      }
    }
    await vent(utfall === "siger" ? 800 : 300);
    const xp = utfall === "siger" ? fi.reduce((s, f) => s + f.d.xp, 0) : 0;
    const pengar = utfall === "siger" ? fi.reduce((s, f) => s + f.d.pengar, 0) : 0;
    const fall = [];
    if (utfall === "siger") for (const f of fi) for (const [id, sj] of f.d.fall || []) if (Math.random() < sj) fall.push(id);
    // Sigeren blir vist i kampscena: partiet feirar, og røynsle, pengar og funne ting kjem
    // i eit vindauge, éi line om gongen (som i Final Fantasy VI).
    if (utfall === "siger" && paaSiger) {
      siger = performance.now();
      melding.hidden = true;
      const linjer = await paaSiger({ xp, pengar, fall });
      const vin = rot.querySelector(".kamp-siger");
      vin.hidden = false; vin.innerHTML = "";
      // Fast vindauge med to liner: ei ny line for kvar Z, og den eldste går ut øvst.
      for (const l of linjer) {
        const p = document.createElement("p"); p.textContent = l; vin.appendChild(p);
        while (vin.children.length > 2) vin.firstChild.remove();
        vin.classList.add("klar");
        await new Promise(res => { const slepp = Motor.lytt({ a: () => { slepp(); res(); } }); });
        vin.classList.remove("klar");
      }
      siger = 0;
    }
    pa.forEach(m => { m.vern = 0; m.atb = 0; });
    await Motor.tonUt();                                              // ton ut før kartet kjem att
    rot.hidden = true; rot.innerHTML = "";
    return { utfall, xp, pengar, fall };
  }

  return { start, formSpor, formval, bakgrunnBilete };
})();
