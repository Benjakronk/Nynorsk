/* Minispela i «Blekkrannet» (spel.html).

   Kvart minispel stiller éitt spørsmål om gongen og byggjer på ordbanken i
   js/content/bank.js gjennom motoren i js/drills.js, så det er dei same orda
   og forklaringane som i mengdetreninga:

     kjonn  Kjønnsportane: eit substantiv fell ned mot tre portar, ein, ei og
            eit. Vel porten før ordet landar.
     vokal  Vokalskifte-trolldom: eit sterkt verb skal i preteritum eller
            perfektum. Vel rett formel før klokka går ut.
     v2     V2-brua: byggj setninga planke for planke. Verbalet står på plass to.
     val    Rytmeval: eit raskt val mellom to eller tre svar (då/når, kvar
            «ikkje» står, konjunksjon eller subjunksjon).

   Ein runde (Minispel.runde) er ei rekkje spørsmål med hjarte som liv. Ein
   bosskamp (Minispel.boss) blandar typane, og kvart rett svar tek eitt liv
   frå bossen. Evner frå kurset (sjå js/spel.js) gjer spela litt lettare. */
window.Minispel = (function () {
  "use strict";

  const E = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const stokk = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const lemma = key => key.slice(key.lastIndexOf(":") + 1);
  const vent = ms => new Promise(r => setTimeout(r, ms));
  const roleg = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Tastatur: eitt aktivt spørsmål tek imot tastane ---------- */
  let tast = null;
  document.addEventListener("keydown", e => { if (tast && !e.ctrlKey && !e.metaKey && !e.altKey) tast(e); });

  /* ---------- Oppgåvene frå ordbanken ---------- */
  function oppgaver(type, niv) {
    if (type === "kjonn") return Drills.build({ bank: "nouns", tasks: ["gender"] });
    if (type === "vokal") return Drills.build({ bank: "verbs", filter: { cls: ["sterk"] }, tasks: niv.tasks || ["pret"] });
    if (type === "v2") return Drills.build({ bank: "sentences", set: ["v2"] });
    if (type === "val") return Drills.build({ bank: "sentences", set: niv.sett || ["daNar"] });
    return [];
  }
  // Ord som ikkje er fanga enno, kjem først.
  function trekk(items, n, erFanga) {
    const nye = stokk(items.filter(i => !erFanga(i))), gamle = stokk(items.filter(i => erFanga(i)));
    return nye.concat(gamle).slice(0, n);
  }
  // Kva i ordboka eit rett svar fangar: substantiv og sterke verb.
  function fangst(item) {
    if (item.key.startsWith("nouns:")) return { bank: "n", ord: lemma(item.key) };
    if (item.key.startsWith("verbs:")) return { bank: "v", ord: lemma(item.key) };
    return null;
  }

  /* ---------- Hjelparar til spørsmåla ---------- */
  // Ei klokke som går ned. Kallar ute() når tida er ute, og kan stoppast.
  function klokke(el, ms, ute) {
    const t0 = performance.now();
    let raf = 0, stoppa = false;
    // Tida blir målt med performance.now(): tidsstempelet til requestAnimationFrame
    // kan liggje i ei anna tidslinje i somme nettlesarar.
    const steg = () => {
      if (stoppa) return;
      const u = Math.min(1, Math.max(0, (performance.now() - t0) / ms));
      el.style.setProperty("--att", String(1 - u));
      if (u >= 1) { stoppa = true; ute(); } else raf = requestAnimationFrame(steg);
    };
    raf = requestAnimationFrame(steg);
    return () => { stoppa = true; cancelAnimationFrame(raf); };
  }
  const forklar = (item, rett) => `<p class="ms-forklar ${rett ? "rett" : "feil"}">${rett ? "Rett!" : `Rett svar: <strong>${E(item.accept[0])}</strong>.`} ${item.why || ""}</p>`;

  // Eit val mellom knappar, med klokke. Brukt av vokal og val.
  function valSporsmal(item, flate, k, { klasse, hovud, ms }) {
    return new Promise(res => {
      const p = Drills.present(item, "choice");
      const alt = p.options || stokk(item.options || item.accept);
      flate.innerHTML = `
        <div class="ms-val ${klasse}">
          <div class="ms-klokke"><span></span></div>
          ${hovud}
          <div class="ms-alt">${alt.map((o, i) => `<button type="button" class="ms-knapp" data-i="${i}"><span class="ms-tast">${i + 1}</span>${E(o)}</button>`).join("")}</div>
          <div class="ms-svar"></div>
        </div>`;
      const knappar = [...flate.querySelectorAll(".ms-knapp")];
      let ferdig = false;
      const svar = i => {
        if (ferdig) return;
        ferdig = true; stopp(); tast = null;
        const valt = i == null ? null : alt[i];
        const rett = valt != null && item.accept.some(a => Drills.normalize(a) === Drills.normalize(valt));
        knappar.forEach((b, j) => {
          b.disabled = true;
          if (item.accept.some(a => Drills.normalize(a) === Drills.normalize(alt[j]))) b.classList.add("rett");
          else if (j === i) b.classList.add("feil");
        });
        flate.querySelector(".ms-svar").innerHTML = i == null ? `<p class="ms-forklar feil">Tida gjekk ut. Rett svar: <strong>${E(item.accept[0])}</strong>. ${item.why || ""}</p>` : forklar(item, rett);
        setTimeout(() => res({ rett }), rett ? 700 : 2600);
      };
      knappar.forEach((b, j) => b.addEventListener("click", () => svar(j)));
      tast = e => { const n = parseInt(e.key, 10); if (n >= 1 && n <= alt.length) { e.preventDefault(); svar(n - 1); } };
      const stopp = klokke(flate.querySelector(".ms-klokke"), ms, () => svar(null));
    });
  }

  /* ---------- Spørsmåla ---------- */
  const SPOR = {
    // Kjønnsportane: ordet fell, og porten må veljast før det landar.
    kjonn(item, flate, k) {
      return new Promise(res => {
        const ord = (item.prompt.match(/«(.+)»/) || [, item.prompt])[1];
        const artiklar = ["ein", "ei", "eit"];
        flate.innerHTML = `
          <div class="kp">
            <div class="kp-himmel"><div class="kp-ord">${E(ord)}</div></div>
            <div class="kp-portar">${artiklar.map((a, i) => `<button type="button" class="kp-port kp-${a}" data-a="${a}"><span class="ms-tast">${i + 1}</span>${a}</button>`).join("")}</div>
            <div class="ms-svar"></div>
          </div>`;
        const himmel = flate.querySelector(".kp-himmel"), kort = flate.querySelector(".kp-ord");
        const portar = [...flate.querySelectorAll(".kp-port")];
        const fall = k.falltid;
        const t0 = performance.now();
        let raf = 0, ferdig = false;
        const steg = () => {
          const u = Math.min(1, Math.max(0, (performance.now() - t0) / fall));
          kort.style.top = `${u * Math.max(0, himmel.clientHeight - kort.offsetHeight)}px`;
          if (u >= 1) svar(null); else raf = requestAnimationFrame(steg);
        };
        const svar = a => {
          if (ferdig) return;
          ferdig = true; cancelAnimationFrame(raf); tast = null;
          const rett = a === item.accept[0];
          portar.forEach(p => { p.disabled = true; if (p.dataset.a === item.accept[0]) p.classList.add("rett"); else if (p.dataset.a === a) p.classList.add("feil"); });
          kort.textContent = `${item.accept[0]} ${ord}`;
          kort.classList.add(rett ? "fanga" : "slapp");
          flate.querySelector(".ms-svar").innerHTML = a == null ? `<p class="ms-forklar feil">Ordet landa før du valde. ${item.why || ""}</p>` : forklar(item, rett);
          setTimeout(() => res({ rett }), rett ? 650 : 2600);
        };
        portar.forEach(p => p.addEventListener("click", () => svar(p.dataset.a)));
        tast = e => { const i = "123".indexOf(e.key); if (i >= 0) { e.preventDefault(); svar(artiklar[i]); } };
        raf = requestAnimationFrame(steg);
      });
    },

    // Vokalskifte-trolldom: infinitiven står i sirkelen, formelen er rett form.
    vokal(item, flate, k) {
      const inf = (item.prompt.match(/«å (.+)»/) || [, ""])[1];
      const pret = item.prompt.startsWith("Preteritum");
      return valSporsmal(item, flate, k, {
        klasse: "vs",
        ms: k.tidVokal,
        hovud: `<div class="vs-sirkel"><span class="vs-inf">å ${E(inf)}</span><span class="vs-cue">${pret ? "i går …" : "har …"}</span></div>
          <p class="ms-oppdrag">${pret ? "Kast formelen for <strong>preteritum</strong>." : "Kast formelen for <strong>perfektum</strong>."}</p>`,
      });
    },

    // Rytmeval: setninga med ei luke og to eller tre val.
    val(item, flate, k) {
      const tekst = E(item.prompt).replace("___", `<span class="ms-luke">?</span>`);
      return valSporsmal(item, flate, k, {
        klasse: "rv",
        ms: k.tidVal,
        hovud: `<p class="rv-setning">${tekst}</p>`,
      });
    },

    // V2-brua: plankane blir lagde ut éin etter éin. Den første ligg alt.
    v2(item, flate, k) {
      return new Promise(res => {
        const deler = item.cue.replace(/^\(|\)$/g, "").split(" / ");
        const plass = [deler[0]].concat(new Array(deler.length - 1).fill(null));
        let brikker = stokk(deler.slice(1).map((t, i) => ({ t, i })));
        flate.innerHTML = `
          <div class="vb">
            <div class="ms-klokke"><span></span></div>
            <p class="ms-oppdrag">Byggj brua: set orda i rett rekkjefølgje.${k.v2Kompass ? " Kompasset viser kvar verbalet skal." : ""}</p>
            <div class="vb-bru"></div>
            <div class="vb-elv"><div class="vb-brikker"></div></div>
            <div class="ms-svar"></div>
          </div>`;
        const bru = flate.querySelector(".vb-bru"), pool = flate.querySelector(".vb-brikker");
        let ferdig = false;
        const teikn = () => {
          bru.innerHTML = plass.map((t, i) => `<button type="button" class="vb-planke${t ? " lagd" : ""}${i === 0 ? " fast" : ""}${i === 1 && k.v2Kompass ? " kompass" : ""}" data-i="${i}"${i === 0 || !t ? " disabled" : ""}><span class="vb-nr">${i + 1}</span>${t ? E(t.t || t) : ""}</button>`).join("");
          pool.innerHTML = brikker.map((b, j) => `<button type="button" class="vb-brikke" data-j="${j}"><span class="ms-tast">${j + 1}</span>${E(b.t)}</button>`).join("");
          bru.querySelectorAll(".vb-planke.lagd:not(.fast)").forEach(p => p.addEventListener("click", () => ta(+p.dataset.i)));
          pool.querySelectorAll(".vb-brikke").forEach(b => b.addEventListener("click", () => legg(+b.dataset.j)));
        };
        const legg = j => {
          if (ferdig || !brikker[j]) return;
          const i = plass.indexOf(null);
          plass[i] = brikker[j]; brikker.splice(j, 1);
          teikn();
          if (!plass.includes(null)) sjekk();
        };
        const ta = i => { if (ferdig) return; brikker.push(plass[i]); plass[i] = null; for (let n = i; n < plass.length - 1; n++) { plass[n] = plass[n + 1]; plass[n + 1] = null; } teikn(); };
        const sjekk = (tidUte) => {
          if (ferdig) return;
          ferdig = true; stopp(); tast = null;
          const lagt = plass.map(t => t ? (t.t || t) : "").join(" ");
          const rett = !tidUte && item.accept.some(a => Drills.normalize(a) === Drills.normalize(lagt));
          bru.classList.add(rett ? "held" : "rasar");
          flate.querySelector(".ms-svar").innerHTML = rett ? `<p class="ms-forklar rett">Brua held! <em class="nn">${E(item.accept[0])}</em></p>`
            : `<p class="ms-forklar feil">${tidUte ? "Tida gjekk ut, og" : "Plankane gav etter, og"} setninga ramla i elva. Rett: <strong><em class="nn">${E(item.accept[0])}</em></strong> Verbalet står på plass to.</p>`;
          setTimeout(() => res({ rett }), rett ? 900 : 3000);
        };
        tast = e => {
          const n = parseInt(e.key, 10);
          if (n >= 1 && n <= brikker.length) { e.preventDefault(); legg(n - 1); }
          else if (e.key === "Backspace") { const i = plass.lastIndexOf(plass.filter(Boolean).pop()); if (i > 0) { e.preventDefault(); ta(i); } }
        };
        teikn();
        const stopp = klokke(flate.querySelector(".ms-klokke"), k.tidV2, () => sjekk(true));
      });
    },
  };

  /* ---------- Innstillingar etter nivå og evner ---------- */
  function ktx(niv, evner) {
    return {
      falltid: (niv.falltid || 6500) * (evner.kjonnssans ? 1.35 : 1),
      tidVokal: (niv.tid || 9000) + (evner.vokalstav ? 4000 : 0),
      tidVal: (niv.tid || 8000) + (evner.tidsauga ? 4000 : 0),
      tidV2: (niv.tid || 26000),
      v2Kompass: !!evner.v2kompass,
    };
  }
  const hjarte = (n, maks) => `<span class="ms-hjarte" aria-label="${n} liv att">${"♥".repeat(Math.max(0, n))}<span class="tomt">${"♥".repeat(Math.max(0, maks - n))}</span></span>`;

  /* ---------- Ein vanleg runde ---------- */
  // Gir { fullfort, rett, feil, fanga: [{bank, ord}], stjerner }
  async function runde({ niv, rot, evner, erFanga, paaFanga }) {
    const k = ktx(niv, evner);
    const maks = 3 + (evner.stipend ? 1 : 0);
    let liv = maks, rett = 0, feil = 0;
    const fanga = [];
    const items = trekk(oppgaver(niv.type, niv), niv.n || 10, i => { const f = fangst(i); return f ? erFanga(f) : false; });
    rot.innerHTML = `<div class="ms-topp"><span class="ms-namn">${E(niv.namn)}</span><span class="ms-teljar"></span>${""}<span class="ms-liv"></span></div><div class="ms-flate"></div>`;
    const flate = rot.querySelector(".ms-flate"), teljar = rot.querySelector(".ms-teljar"), livEl = rot.querySelector(".ms-liv");
    for (let i = 0; i < items.length && liv > 0; i++) {
      teljar.textContent = `${i + 1} av ${items.length}`;
      livEl.innerHTML = hjarte(liv, maks);
      if (niv.type === "kjonn") k.falltid *= 0.96;   // litt fortare for kvart ord
      const svar = await SPOR[niv.type](items[i], flate, k);
      if (svar.rett) {
        rett++;
        const f = fangst(items[i]);
        if (f) { fanga.push(f); paaFanga(f); }
      } else { feil++; liv--; livEl.innerHTML = hjarte(liv, maks); }
    }
    tast = null;
    const fullfort = liv > 0;
    return { fullfort, rett, feil, fanga, stjerner: !fullfort ? 0 : feil === 0 ? 3 : feil <= 2 ? 2 : 1 };
  }

  /* ---------- Bosskamp ---------- */
  async function boss({ niv, rot, evner, erFanga, paaFanga }) {
    const k = ktx(niv, evner);
    const maks = 3 + (evner.stipend ? 1 : 0);
    let liv = maks, hp = niv.hp, rett = 0, feil = 0;
    const fanga = [];
    // Éin kø med spørsmål per type, og typane går etter tur.
    const koar = niv.typar.map(t => ({ t, items: trekk(oppgaver(t.type, t), 40, i => { const f = fangst(i); return f ? erFanga(f) : false; }) }));
    rot.innerHTML = `
      <div class="ms-topp"><span class="ms-namn">${E(niv.namn)}</span><span class="ms-liv"></span></div>
      <div class="boss boss-${niv.boss}">
        <div class="boss-kunst">${KUNST[niv.boss] || ""}</div>
        <div class="boss-info"><strong>${E(niv.bossnamn)}</strong><div class="boss-hp"><span></span></div><p class="boss-replikk"></p></div>
      </div>
      <div class="ms-flate"></div>`;
    const flate = rot.querySelector(".ms-flate"), livEl = rot.querySelector(".ms-liv");
    const hpEl = rot.querySelector(".boss-hp span"), bossEl = rot.querySelector(".boss"), replikk = rot.querySelector(".boss-replikk");
    const oppdater = () => { livEl.innerHTML = hjarte(liv, maks); hpEl.style.width = `${(hp / niv.hp) * 100}%`; };
    let n = 0;
    replikk.textContent = niv.replikkar[0];
    while (hp > 0 && liv > 0) {
      oppdater();
      const ko = koar[n % koar.length];
      const item = ko.items[Math.floor(n / koar.length) % ko.items.length];
      n++;
      const kk = Object.assign({}, k, ktx(ko.t, evner));
      const svar = await SPOR[ko.t.type](item, flate, kk);
      if (svar.rett) {
        rett++; hp--;
        const f = fangst(item);
        if (f) { fanga.push(f); paaFanga(f); }
        bossEl.classList.remove("treft"); void bossEl.offsetWidth; bossEl.classList.add("treft");
      } else {
        feil++; liv--;
        bossEl.classList.remove("angrip"); void bossEl.offsetWidth; bossEl.classList.add("angrip");
      }
      replikk.textContent = niv.replikkar[n % niv.replikkar.length];
    }
    oppdater();
    tast = null;
    const fullfort = hp <= 0;
    if (fullfort && !roleg) { bossEl.classList.add("slegen"); await vent(900); }
    return { fullfort, rett, feil, fanga, stjerner: !fullfort ? 0 : feil === 0 ? 3 : feil <= 2 ? 2 : 1 };
  }

  /* ---------- Bossane, teikna i SVG ---------- */
  const KUNST = {
    // Sildesalaten: ei skål med raud salat i unionsfargane, med sild som stikk opp.
    sildesalat: `<svg viewBox="0 0 160 120" aria-hidden="true">
      <ellipse cx="80" cy="96" rx="62" ry="14" fill="#cfcab6"/>
      <path d="M20 70 Q80 128 140 70 Z" fill="#f2efe6" stroke="#8d8a85" stroke-width="3"/>
      <path d="M26 70 Q40 40 60 52 Q72 30 88 48 Q104 28 118 50 Q134 44 134 70 Z" fill="#b0392f"/>
      <path d="M40 66 L120 52 M46 52 L112 68" stroke="#1f3f7a" stroke-width="7"/>
      <path d="M60 60 L100 60" stroke="#f4c430" stroke-width="6"/>
      <path d="M92 44 q14 -26 30 -18 q-6 8 -14 10 q8 4 10 12 q-14 2 -26 -4 z" fill="#aab4be" stroke="#5f6b76" stroke-width="2"/>
      <path d="M52 46 q-10 -26 -28 -22 q6 8 14 12 q-8 2 -10 10 q14 4 24 0 z" fill="#aab4be" stroke="#5f6b76" stroke-width="2"/>
      <circle cx="116" cy="28" r="2.5" fill="#1c1d20"/><circle cx="30" cy="30" r="2.5" fill="#1c1d20"/>
      <circle cx="64" cy="82" r="5" fill="#1c1d20"/><circle cx="96" cy="82" r="5" fill="#1c1d20"/>
      <path d="M68 96 Q80 88 92 96" stroke="#1c1d20" stroke-width="3" fill="none"/>
    </svg>`,
    // Blekklatten: ein svart latt med sprut, auge og ei fjørpenn.
    blekk: `<svg viewBox="0 0 160 120" aria-hidden="true">
      <path d="M80 12 C112 10 138 34 132 58 C150 66 146 92 124 94 C120 112 92 114 80 104 C66 116 36 112 36 94 C14 90 12 64 30 58 C22 30 50 12 80 12 Z" fill="#1c1d20"/>
      <circle cx="146" cy="40" r="6" fill="#1c1d20"/><circle cx="16" cy="100" r="5" fill="#1c1d20"/><circle cx="140" cy="108" r="4" fill="#1c1d20"/>
      <ellipse cx="64" cy="54" rx="12" ry="14" fill="#fff"/><ellipse cx="98" cy="54" rx="12" ry="14" fill="#fff"/>
      <circle cx="67" cy="58" r="6" fill="#1c1d20"/><circle cx="95" cy="58" r="6" fill="#1c1d20"/>
      <path d="M54 38 L74 44 M108 38 L88 44" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <path d="M62 84 Q80 74 100 84" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M124 14 L100 40" stroke="#b76a2b" stroke-width="4"/><path d="M124 14 q16 -6 22 -2 q-10 10 -22 2 z" fill="#f2efe6"/>
    </svg>`,
  };

  return { runde, boss, fangst, KUNST };
})();
