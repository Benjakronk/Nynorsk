/* Stev: dei sterkaste galdrane i «Aasen: Språkvandringa» (prototype).

   Det finst eit fast tal stev i spelet (RPGData.STEVGALDR). Ivar lærer eit
   stev av nokon han møter, men stevet har hol: ord han sjølv må ha funne i
   bygdene før holet kan fyllast. Stevet kan kvedast når kvedemålaren i kampen
   er full.

   Kvedinga har to steg:
   1. For kvart fylt hol vel spelaren forma som rimar. Den danske forma
      øydelegg rimet.
   2. Stevet blir kvede, og spelaren slår takta (Z eller trykk) på dei
      trykktunge orda. Hol som manglar eller har feil form, er stumme slag.

   Krafta er treff delt på alle slag, og kvart hol som manglar ord, tek
   40 % av krafta. I versa er trykktunge ord merkte med ^, og hol står som
   [ordId]. Eit hol er alltid trykktungt.

   Stev.kved(id, { ord, gaaver }) gir { kraft, treff, slag, manglar } */
window.Stev = (function () {
  "use strict";
  const E = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const stokk = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const vent = ms => new Promise(r => setTimeout(r, ms));
  const VINDAUGE = 170;       // kor nær slaget eit trykk må vere (ms)

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

  /* Deler ei line i ord. Kvart ord: { tekst, tung, hol } */
  function delLine(l) {
    return l.split(" ").map(w => {
      const m = w.match(/^\[(\w+)\](.*)$/);
      if (m) return { hol: m[1], etter: m[2], tung: true };
      return { tekst: w.replace(/\^/g, ""), tung: w.includes("^") };
    });
  }
  // Alle hol i stevet, i rekkjefølgje
  const hola = def => def.liner.flatMap(delLine).filter(w => w.hol);
  // Kva hol som kan fyllast med orda Ivar har
  const status = (def, ord) => { const h = def.hol; const fylte = Object.keys(h).filter(id => ord[h[id].ord]); return { fylte, manglar: Object.keys(h).filter(id => !ord[h[id].ord]) }; };

  function kved(id, { ord = {}, gaaver = {} } = {}) {
    const def = RPGData.STEVGALDR[id];
    const rot = document.getElementById("rpg-kamp");
    return new Promise(async res => {
      const el = document.createElement("div");
      el.className = "kamp-sporsmal stev-kveding";
      rot.appendChild(el);
      const { manglar } = status(def, ord);
      const val = {};            // holId -> { form, rett }
      const tempo = def.tempo || 560;

      // Steg 1: vel forma som rimar, for kvart hol som kan fyllast
      for (const w of hola(def)) {
        const h = def.hol[w.hol], o = RPGData.ORD[h.ord];
        if (!ord[h.ord]) continue;
        const sett = new Set(), alt = [];
        for (const f of [...o.former, o.dansk]) { const k = f.toLowerCase(); if (!sett.has(k)) { sett.add(k); alt.push(f); } }
        const valt = stokk(alt).slice(0, 4);
        if (!valt.some(f => h.rett.includes(f))) valt[0] = h.rett[0];
        if (!valt.some(f => f.toLowerCase() === o.dansk.toLowerCase())) valt[valt.length - 1] = o.dansk;
        const liste = stokk(valt);
        const svar = await new Promise(r => {
          el.innerHTML = `<p class="sp-overskrift">${E(def.namn)}: fyll holet</p>
            <p class="sp-tekst">Vel forma av <span class="sp-ord">${E(o.aasen)}</span> som rimar på «${E(h.rimPaa)}».</p>
            <div class="sp-alt">${liste.map((f, i) => `<button type="button"><span class="sp-tast">${i + 1}</span>${E(f)}</button>`).join("")}</div>`;
          const kn = [...el.querySelectorAll("button")];
          let v = 0, ferdig = false;
          const merk = () => kn.forEach((b, i) => b.classList.toggle("peikar", i === v));
          merk();
          const ok = async i => {
            if (ferdig) return; ferdig = true; slepp(); document.removeEventListener("keydown", tast, true);
            const rett = h.rett.includes(liste[i]);
            kn.forEach((b, j) => { b.disabled = true; if (h.rett.includes(liste[j])) b.classList.add("rett"); else if (j === i) b.classList.add("feil"); });
            el.insertAdjacentHTML("beforeend", `<p class="sp-svar ${rett ? "rett" : "feil"}">${rett ? `«${E(liste[i])}» rimar på «${E(h.rimPaa)}».` : `«${E(liste[i])}» rimar ikkje på «${E(h.rimPaa)}». Slaget blir stumt.`}</p>`);
            await vent(rett ? 900 : 1800);
            r({ form: liste[i], rett });
          };
          kn.forEach((b, i) => b.addEventListener("click", () => ok(i)));
          const tast = e => { const n = parseInt(e.key, 10); if (n >= 1 && n <= liste.length) { e.preventDefault(); e.stopPropagation(); ok(n - 1); } };
          document.addEventListener("keydown", tast, true);
          const slepp = Motor.lytt({ a: () => ok(v), retning: d => { v = (v + (d === 1 || d === 2 ? liste.length - 1 : 1)) % liste.length; merk(); } });
        });
        val[w.hol] = svar;
      }

      // Steg 2: kveding og takt
      const liner = def.liner.map(delLine);
      const slagListe = [];      // { line, ord, stum }
      liner.forEach((l, li) => l.forEach((w, wi) => { if (w.tung) slagListe.push({ line: li, ord: wi, stum: !!w.hol && !(val[w.hol] && val[w.hol].rett) }); }));
      const ordHtml = (w, aktiv) => {
        if (w.hol) {
          const v = val[w.hol];
          const tekst = v ? v.form : "???";
          return `<b class="stev-tung stev-hol${v ? (v.rett ? " rett" : " feil") : " tomt"}${aktiv ? " no" : ""}">${E(tekst)}</b>${E(w.etter)}`;
        }
        return w.tung ? `<b class="stev-tung${aktiv ? " no" : ""}">${E(w.tekst)}</b>` : E(w.tekst);
      };
      const teiknLiner = aktiv => liner.map((l, li) => `<p class="stev-line">${l.map((w, wi) => ordHtml(w, aktiv && aktiv.line === li && aktiv.ord === wi)).join(" ")}</p>`).join("");
      const truffe = slagListe.map(() => false);
      el.innerHTML = `<p class="sp-overskrift">${E(def.namn)}</p><p class="stev-hjelp">Slå takta! Trykk Z (eller trykk her) når eit utheva ord blir kvede.${manglar.length ? ` ${manglar.length} ord manglar enno.` : ""}</p>
        <div class="stev-liner">${teiknLiner(null)}</div>
        <div class="stev-slag">${slagListe.map(s => `<i class="${s.stum ? "stum" : ""}"></i>`).join("")}</div>`;
      const linerEl = el.querySelector(".stev-liner"), prikkar = [...el.querySelectorAll(".stev-slag i")];
      await vent(700);
      const t0 = performance.now() + tempo * 2;
      tikk(false); setTimeout(() => tikk(false), tempo);
      let treff = 0, sist = -1;
      const trykk = () => {
        const no = performance.now(), i = Math.round((no - t0) / tempo);
        if (i < 0 || i >= slagListe.length || truffe[i] || slagListe[i].stum) return;
        if (Math.abs(no - (t0 + i * tempo)) <= VINDAUGE) { truffe[i] = true; treff++; prikkar[i].classList.add("treff"); tikk(true); }
        else prikkar[i].classList.add("bom");
      };
      const slepp = Motor.lytt({ a: trykk });
      el.onpointerdown = e => { e.preventDefault(); trykk(); };
      await new Promise(r => {
        const tid = setInterval(() => {
          const no = performance.now(), i = Math.floor((no - t0 + tempo / 2) / tempo);
          if (i !== sist && i >= 0 && i < slagListe.length) {
            sist = i;
            prikkar.forEach((p, k) => p.classList.toggle("no", k === i));
            linerEl.innerHTML = teiknLiner(slagListe[i]);
          }
          if (no > t0 + (slagListe.length - 0.5) * tempo + VINDAUGE) { clearInterval(tid); r(); }
        }, 15);
      });
      slepp(); el.onpointerdown = null;
      const kraft = Math.max(0.2, (treff / slagListe.length) * Math.pow(0.6, manglar.length));
      el.insertAdjacentHTML("beforeend", `<p class="sp-svar ${kraft > 0.6 ? "rett" : "feil"}">Takta: ${treff} av ${slagListe.length} slag${manglar.length ? `, ${manglar.length} hol utan ord` : ""}. Krafta er ${Math.round(kraft * 100)} %.</p>`);
      await vent(1600);
      el.remove();
      res({ kraft, treff, slag: slagListe.length, manglar: manglar.length });
    });
  }

  return { kved, status, delLine };
})();
