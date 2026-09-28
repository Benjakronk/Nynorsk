/* Stevjing i «Aasen: Språkvandringa» (prototype).

   Kappkveding var ein levande tradisjon: to kvedarar svara kvarandre med
   stev. I spelet er stevjinga ein duell i tre rundar:

   1. Motstandaren kveder eit stev på to liner. Det tek mot frå Ivar.
   2. Ivar vel første lina si: ho skal svare på det motstandaren sa.
      Eitt val er godt, eitt er stivt kanselli-dansk, eitt er berre frekt.
   3. Ivar vel andre lina: ho skal rime på den første. Den danske forma
      øydelegg rimet, med mindre heile verset er på dansk.
   4. Ivar kveder verset, og spelaren slår takta (Z) på dei trykktunge orda.

   Svar, rim og takt tek mot frå motstandaren. Den som først står utan mot,
   har tapt. Data for kvar motstandar ligg i RPGData.STEV. I versa er
   trykktunge ord merkte med ^.

   Stevjing.start({ id, parti }) gir { utfall: "siger" | "tap" } */
window.Stevjing = (function () {
  "use strict";
  const $ = id => document.getElementById(id);
  const E = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const vent = ms => new Promise(r => setTimeout(r, ms));
  const g = Motor.g;
  const TEMPO = 620;          // ms mellom slaga
  const VINDAUGE = 170;       // kor nær slaget eit trykk må vere

  const reint = l => l.replace(/\^/g, "");
  const sisteOrd = l => reint(l).trim().split(/\s+/).pop().replace(/[.,!?«»:;]/g, "");
  const htmlLine = (l, aktiv = -1) => {
    let n = -1;
    return l.split(" ").map(w => { const tung = w.includes("^"); if (tung) n++; const t = E(w.replace(/\^/g, "")); return tung ? `<b class="stev-tung${n === aktiv ? " no" : ""}">${t}</b>` : t; }).join(" ");
  };

  /* Ein liten tikkelyd for takta, laga med Web Audio. */
  let lyd = null;
  function tikk(hoy) {
    try {
      lyd = lyd || new (window.AudioContext || window.webkitAudioContext)();
      const o = lyd.createOscillator(), v = lyd.createGain();
      o.type = "square"; o.frequency.value = hoy ? 880 : 440;
      v.gain.setValueAtTime(0.06, lyd.currentTime); v.gain.exponentialRampToValueAtTime(0.0001, lyd.currentTime + 0.09);
      o.connect(v); v.connect(lyd.destination); o.start(); o.stop(lyd.currentTime + 0.1);
    } catch (e) { /* utan lyd går det òg */ }
  }

  async function start({ id, parti }) {
    const D = RPGData, def = D.STEV[id];
    const rot = document.createElement("div");
    rot.className = "rpg-stev";
    $("rpg-skjerm").appendChild(rot);
    rot.innerHTML = `
      <div class="stev-mot">
        <div class="kamp-vindauge"><span>${E(def.namn)}</span><span class="stev-malar"><i class="hans"></i></span></div>
        <div class="kamp-vindauge"><span>Ivar</span><span class="stev-malar"><i class="min"></i></span></div>
      </div>
      <p class="kamp-melding" hidden></p>
      <div class="kamp-vindauge stev-vers"></div>
      <div class="kamp-vindauge stev-val" hidden></div>`;
    const versEl = rot.querySelector(".stev-vers"), valEl = rot.querySelector(".stev-val"), melding = rot.querySelector(".kamp-melding");
    const hansMal = rot.querySelector(".hans"), minMal = rot.querySelector(".min");
    let hansMot = def.mot, minMot = 100, kveder = null, ferdig = false;
    const malar = () => { hansMal.style.width = `${Math.max(0, hansMot / def.mot * 100)}%`; minMal.style.width = `${Math.max(0, minMot)}%`; };
    const meld = async (t, ms = 1900) => { melding.textContent = t; melding.hidden = false; await ventA(ms); melding.hidden = true; };
    // Vent, men la spelaren hoppe fram med Z.
    const ventA = ms => new Promise(r => { let ute = false; const slepp = Motor.lytt({ a: () => { if (!ute) { ute = true; slepp(); r(); } } }); setTimeout(() => { if (!ute) { ute = true; slepp(); r(); } }, ms); });
    malar();

    /* Teikning: bakgrunn, motstandaren til venstre, Ivar til høgre. */
    const ivar = parti.sprite, hans = Pikslar.fiende(def.bilete), bak = Kamp.bakgrunnBilete(def.bakgrunn);
    const loop = () => {
      if (ferdig) return;
      const no = performance.now();
      g.drawImage(bak, 0, 0);
      const hopp = k => kveder === k ? Math.round(Math.abs(Math.sin(no / (TEMPO / Math.PI))) * -3) : 0;
      g.fillStyle = "rgba(10,5,20,.35)"; g.beginPath(); g.ellipse(84, 112, hans.width * 0.38, 4, 0, 0, Math.PI * 2); g.fill();
      g.drawImage(hans, Math.round(84 - hans.width / 2), 112 - hans.height + hopp("hans"));
      g.fillRect(241, 108, 14, 3);
      g.drawImage(ivar.rammer[2][kveder === "ivar" ? 1 + Math.floor(no / TEMPO) % 2 : 0], 240, 86 + hopp("ivar"));
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    /* Val av line */
    function vel(tittel, alt) {
      return new Promise(res => {
        valEl.hidden = false;
        valEl.innerHTML = `<p class="km-tittel">${E(tittel)}</p>${alt.map((a, i) => `<button type="button" data-i="${i}"><span class="sp-tast">${i + 1}</span>${htmlLine(a.tekst)}</button>`).join("")}`;
        const kn = [...valEl.querySelectorAll("button")];
        let valt = 0;
        const merk = () => kn.forEach((b, i) => b.classList.toggle("peikar", i === valt));
        merk();
        const ok = i => { slepp(); document.removeEventListener("keydown", tast, true); valEl.hidden = true; res(alt[i]); };
        kn.forEach((b, i) => b.addEventListener("click", () => ok(i)));
        const tast = e => { const n = parseInt(e.key, 10); if (n >= 1 && n <= alt.length) { e.preventDefault(); e.stopPropagation(); ok(n - 1); } };
        document.addEventListener("keydown", tast, true);
        const slepp = Motor.lytt({ a: () => ok(valt), retning: d => { valt = (valt + (d === 1 || d === 2 ? alt.length - 1 : 1)) % alt.length; merk(); } });
      });
    }

    /* Takta: fire slag per line. Gir tal på treff. */
    function takt(liner) {
      return new Promise(res => {
        const slag = liner.length * 4;
        let treff = 0, neste = 0;
        const truffe = new Array(slag).fill(false);
        versEl.innerHTML = `<p class="stev-hjelp">Slå takta! Trykk Z (eller trykk her) når eit utheva ord blir kvede.</p>
          ${liner.map((l, i) => `<p class="stev-line ivar" data-l="${i}">${htmlLine(l)}</p>`).join("")}
          <div class="stev-slag">${truffe.map((_, i) => `<i data-s="${i}"></i>`).join("")}</div>`;
        const prikkar = [...versEl.querySelectorAll(".stev-slag i")];
        const t0 = performance.now() + TEMPO * 2;
        tikk(false); setTimeout(() => tikk(false), TEMPO);
        kveder = "ivar";
        const trykk = () => {
          const no = performance.now(), i = Math.round((no - t0) / TEMPO);
          if (i < 0 || i >= slag || truffe[i]) return;
          if (Math.abs(no - (t0 + i * TEMPO)) <= VINDAUGE) { truffe[i] = true; treff++; prikkar[i].className = "treff"; tikk(true); }
          else prikkar[Math.min(slag - 1, Math.max(0, i))].classList.add("bom");
        };
        const slepp = Motor.lytt({ a: trykk });
        versEl.onpointerdown = e => { e.preventDefault(); trykk(); };
        const tid = setInterval(() => {
          const no = performance.now(), i = Math.floor((no - t0 + TEMPO / 2) / TEMPO);
          if (i >= 0 && i < slag && i !== neste - 1 && i >= neste) {
            neste = i + 1;
            prikkar.forEach((p, k) => p.classList.toggle("no", k === i));
            const l = Math.floor(i / 4);
            versEl.querySelectorAll(".stev-line").forEach((p, k) => { p.innerHTML = htmlLine(liner[k], k === l ? i % 4 : -1); });
          }
          if (no > t0 + (slag - 0.5) * TEMPO + VINDAUGE) { clearInterval(tid); slepp(); versEl.onpointerdown = null; kveder = null; res(treff); }
        }, 20);
      });
    }

    let utfall = null;
    for (const intro of def.intro || []) await Motor.tale(intro);
    for (let r = 0; r < def.runder.length && !utfall; r++) {
      const runde = def.runder[r];
      // Motstandaren kveder
      kveder = "hans";
      versEl.innerHTML = `<p class="stev-runde">Runde ${r + 1} av ${def.runder.length}</p>${runde.hans.map(l => `<p class="stev-line hans">${htmlLine(l)}</p>`).join("")}`;
      await ventA(2600);
      kveder = null;
      minMot -= def.skade; malar();
      if (minMot <= 0) { utfall = "tap"; break; }
      // Første line: svaret
      const l1 = await vel("Første line: svar han", runde.linje1);
      versEl.insertAdjacentHTML("beforeend", `<p class="stev-line ivar">${htmlLine(l1.tekst)}</p>`);
      let poeng = 0;
      if (l1.svar === "god") { poeng += 12; await meld("Godt svar! Lina svarer på det han sa."); }
      else if (l1.svar === "dansk") { poeng += 3; await meld(`${def.namn} grin: «Kanselli-mål! Det har inga kraft her.»`); }
      else { minMot -= 6; malar(); await meld("Tilhøyrarane ristar på hovudet. Eit stev skal svare, ikkje berre skjelle."); }
      // Andre line: rimet
      const l2 = await vel(`Andre line: rim på «${sisteOrd(l1.tekst)}»`, runde.linje2);
      versEl.insertAdjacentHTML("beforeend", `<p class="stev-line ivar">${htmlLine(l2.tekst)}</p>`);
      const a = sisteOrd(l1.tekst), b = sisteOrd(l2.tekst);
      if (l2.rim === l1.rim && !l2.dansk) { poeng += 14; await meld(`«${a}» og «${b}» rimar!`); }
      else if (l2.rim === l1.rim) { poeng += 8; await meld(`«${a}» og «${b}» rimar, men på dansk. Verset mistar noko av krafta.`); }
      else if (l2.dansk) { await meld(`«${a}» og «${b}» rimar ikkje. Den danske forma har mista lyden som skulle rime.`); }
      else { await meld(`«${a}» og «${b}» rimar ikkje.`); }
      // Takta
      const treff = await takt([l1.tekst, l2.tekst]);
      poeng += Math.round(treff * 1.75);
      await meld(`Takta: ${treff} av 8 slag. Verset tek ${poeng} mot frå ${def.namn}.`, 2200);
      hansMot -= poeng; malar();
      if (hansMot <= 0) utfall = "siger";
    }
    if (!utfall) utfall = hansMot < minMot ? "siger" : "tap";
    await meld(utfall === "siger" ? `${def.namn} har ikkje fleire svar. Du vann stevjinga!` : `${def.namn} kveder deg i senk. Du tapte stevjinga.`, 2400);
    ferdig = true;
    rot.remove();
    return { utfall };
  }
  return { start };
})();
