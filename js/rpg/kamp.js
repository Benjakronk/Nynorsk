/* Kampane i «Blekkranet»: turbasert med ATB-målar, som i dei klassiske
   Final Fantasy-spela. Målaren til kvar figur fyller seg etter farten.
   Når målaren til ein i partiet er full, stoppar tida (ventemodus), og
   spelaren vel Angrip, Ordkunst, Ting eller Flykt.

   Ordkunsta byggjer på ordbanken i kurset (js/content/bank.js, via
   js/drills.js). Før formelen verkar, kjem eit nynorskspørsmål. Rett svar
   gir full kraft og fangar ordet til notatboka. Feil svar gir ein svak
   formel. Slik er det nynorsken som vinn kampane.

   Kamp.start({ fiendar, boss, parti, gaaver, bakgrunn, paaOrd })
     parti: medlemmer frå tilstanden i js/rpg/spel.js (blir endra direkte)
     gir { utfall: "siger" | "tap" | "flukt", xp, pengar, fall } */
window.Kamp = (function () {
  "use strict";
  const $ = id => document.getElementById(id);
  const E = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const stokk = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const vent = ms => new Promise(r => setTimeout(r, ms));
  const rnd = (a, b) => a + Math.random() * (b - a);

  const rot = $("rpg-kamp");
  const g = Motor.g, L = Motor.lerret;

  /* ---------- Nynorskspørsmål ---------- */
  const kjelder = {};
  function kjelde(type) {
    if (kjelder[type]) return kjelder[type];
    let items = [];
    if (type === "kjonn") items = Drills.build({ bank: "nouns", tasks: ["gender"] });
    if (type === "vokal") items = Drills.build({ bank: "verbs", filter: { cls: ["sterk"] }, tasks: ["pret", "perf"] });
    if (type === "danaar") items = Drills.build({ bank: "sentences", set: ["daNar"] });
    if (type === "v2") items = Drills.build({ bank: "sentences", set: ["v2", "ikkjePlass"] });
    return (kjelder[type] = { items, ko: [] });
  }
  function nesteItem(type) {
    const k = kjelde(type);
    if (!k.ko.length) k.ko = stokk(k.items);
    return k.ko.pop();
  }
  const OVERSKRIFT = { kjonn: "Kva kjønn har ordet?", vokal: "Kva er rett form?", danaar: "Då eller når?", v2: "Kva for ei setning er rett?" };
  // Viser spørsmålet og gir { rett, item }.
  function spor(type, gaaver) {
    return new Promise(res => {
      const item = nesteItem(type);
      const p = Drills.present(item, "choice");
      let alt = p.options || [];
      if (type === "kjonn" && gaaver.kjonnsring) {
        const feil = alt.filter(o => !item.accept.includes(o));
        alt = alt.filter(o => o !== feil[Math.floor(Math.random() * feil.length)]);
      }
      const ms = (type === "kjonn" ? 7000 : type === "v2" ? 14000 : 10000) * (gaaver.tidsauga ? 1.5 : 1);
      const spm = type === "kjonn" ? `<span class="sp-ord">${E((item.prompt.match(/«(.+)»/) || [])[1])}</span>`
        : type === "vokal" ? `<span class="sp-ord">${E(item.prompt.replace(/ av «/, " av «"))}</span> <span class="sp-cue">${E(item.cue)}</span>`
        : `<span class="sp-setning">${E(item.prompt).replace("___", "<b>___</b>")}</span>`;
      const el = document.createElement("div");
      el.className = "kamp-sporsmal";
      el.innerHTML = `<p class="sp-overskrift">${OVERSKRIFT[type]}</p><div class="sp-klokke"><span></span></div><p class="sp-tekst">${spm}</p>
        <div class="sp-alt">${alt.map((o, i) => `<button type="button" data-i="${i}"><span class="sp-tast">${i + 1}</span>${E(o)}</button>`).join("")}</div>`;
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
        const rett = i != null && item.accept.some(a => Drills.normalize(a) === Drills.normalize(alt[i]));
        kn.forEach((b, j) => { b.disabled = true; if (item.accept.some(a => Drills.normalize(a) === Drills.normalize(alt[j]))) b.classList.add("rett"); else if (j === i) b.classList.add("feil"); });
        el.insertAdjacentHTML("beforeend", `<p class="sp-svar ${rett ? "rett" : "feil"}">${rett ? "Rett!" : i == null ? `Tida gjekk ut. Rett: <b>${E(item.accept[0])}</b>` : `Rett: <b>${E(item.accept[0])}</b>`}</p>`);
        setTimeout(() => { el.remove(); res({ rett, item }); }, rett ? 700 : 1700);
      };
      kn.forEach((b, i) => b.addEventListener("click", () => svar(i)));
      const tast = e => { const n = parseInt(e.key, 10); if (n >= 1 && n <= alt.length) { e.preventDefault(); e.stopPropagation(); svar(n - 1); } };
      document.addEventListener("keydown", tast, true);
      const sleppLytt = Motor.lytt({ a: () => svar(valt), retning: d => { if (d === 1 || d === 2) valt = (valt + alt.length - 1) % alt.length; else valt = (valt + 1) % alt.length; merk(); } });
      const slepp = () => { document.removeEventListener("keydown", tast, true); sleppLytt(); };
    });
  }
  // Kva ordet i eit rett svar var: substantiv og sterke verb går i notatboka.
  function ordFraItem(item) {
    const lemma = item.key.slice(item.key.lastIndexOf(":") + 1);
    if (item.key.startsWith("nouns:") || item.key.startsWith("verbs:")) return lemma;
    return null;
  }

  /* ---------- Kampen ---------- */
  async function start({ fiendar, boss, parti, gaaver, bakgrunn, paaOrd }) {
    const D = RPGData;
    const fi = fiendar.map((id, i) => {
      const d = D.FIENDAR[id];
      return { id, d, namn: d.namn + (fiendar.filter(x => x === id).length > 1 ? " " + "ABCD"[fiendar.slice(0, i + 1).filter(x => x === id).length - 1] : ""), hp: d.hp, maxhp: d.hp, atk: d.atk, def: d.def, spd: d.spd, atb: rnd(0, 40), tur: 0, blink: 0, fiende: true };
    });
    const pa = parti.map(m => Object.assign(m, { atb: rnd(20, 60), vern: 0, blink: 0, fram: 0 }));
    let utfall = null, travel = false, meldingTid = 0;
    const ventar = [];
    const tal = [];          // skadetal som flyt oppover

    rot.hidden = false;
    rot.innerHTML = `
      <p class="kamp-melding" hidden></p>
      <div class="kamp-botn">
        <div class="kamp-vindauge kamp-fiendar"></div>
        <div class="kamp-vindauge kamp-parti"></div>
      </div>
      <div class="kamp-vindauge kamp-meny" hidden></div>`;
    const melding = rot.querySelector(".kamp-melding"), fiListe = rot.querySelector(".kamp-fiendar"), paListe = rot.querySelector(".kamp-parti"), meny = rot.querySelector(".kamp-meny");
    const meld = (t, ms = 1400) => { melding.textContent = t; melding.hidden = false; meldingTid = performance.now() + ms; };

    // Plassering på lerretet (320 × 192), fiendar til venstre og partiet til høgre.
    const fiPos = (i, n) => ({ x: 56 + (i % 2) * 44 - (n === 1 ? -20 : 0), y: 40 + i * (n > 2 ? 30 : 42) + (n === 1 ? 14 : 0) });
    const paPos = i => ({ x: 236 + i * 14, y: 52 + i * 36 });
    const bossStor = boss ? 2 : 1.5;

    function oppdaterLister() {
      fiListe.innerHTML = fi.filter(f => f.hp > 0).map(f => `<p>${E(f.namn)}</p>`).join("");
      paListe.innerHTML = pa.map((m, i) => `<div class="kp-rad${m.hp <= 0 ? " fallen" : ""}${ventar[0] === m ? " aktiv" : ""}">
        <span class="kp-namn">${E(m.namn)}</span><span class="kp-hp">${Math.max(0, Math.round(m.hp))}<small>/${m.maxhp}</small></span>
        <span class="kp-mp">${m.mp}<small>/${m.maxmp}</small></span><span class="kp-atb"><i style="width:${Math.min(100, m.atb)}%"></i></span></div>`).join("");
    }

    /* Teikning */
    function teikn(no) {
      const grad = g.createLinearGradient(0, 0, 0, 192);
      const [a, b, c] = bakgrunn === "inne" ? ["#2a2230", "#3a3040", "#1c1820"] : bakgrunn === "by" ? ["#8fb3cf", "#c8d6dd", "#8a7a66"] : bakgrunn === "natt" ? ["#1a1430", "#2e2150", "#221a2c"] : ["#8fc0e0", "#cfe6ef", "#5d9b45"];
      grad.addColorStop(0, a); grad.addColorStop(0.55, b); grad.addColorStop(0.56, c); grad.addColorStop(1, c);
      g.fillStyle = grad; g.fillRect(0, 0, 320, 192);
      if (bakgrunn !== "inne") { g.fillStyle = "rgba(255,255,255,.12)"; for (let i = 0; i < 6; i++) g.fillRect((i * 57 + no / 90) % 340 - 20, 20 + (i % 3) * 14, 26, 4); }
      fi.forEach((f, i) => {
        if (f.hp <= 0 && f.borte) return;
        const p = fiPos(i, fi.length), bilde = Pikslar.fiende(f.d.bilete);
        const s = 32 * bossStor;
        const alpha = f.hp <= 0 ? Math.max(0, 1 - (no - f.dod) / 500) : 1;
        if (f.hp <= 0 && alpha <= 0) f.borte = true;
        g.globalAlpha = alpha;
        if (f.blink > no && Math.floor(no / 60) % 2) g.globalAlpha = 0.25;
        g.drawImage(bilde, Math.round(p.x - s / 2 + (f.fram > no ? 10 : 0)), Math.round(p.y - s / 2 + 16), s, s);
        g.globalAlpha = 1;
      });
      pa.forEach((m, i) => {
        const p = paPos(i);
        const rammer = m.sprite.rammer[2];
        const ramme = m.hp <= 0 ? rammer[0] : rammer[Math.floor(no / 260) % 2];
        if (m.blink > no && Math.floor(no / 60) % 2) return;
        g.save();
        if (m.hp <= 0) { g.translate(p.x + 16, p.y + 24); g.rotate(Math.PI / 2); g.drawImage(ramme, -16, -16, 32, 32); }
        else g.drawImage(ramme, Math.round(p.x - (m.fram > no ? 12 : 0) - (ventar[0] === m ? 6 : 0)), p.y, 32, 32);
        g.restore();
        if (m.vern > 0 && m.hp > 0) { g.strokeStyle = "rgba(244,196,48,.8)"; g.lineWidth = 1; g.strokeRect(p.x - 2, p.y - 2, 36, 36); }
      });
      for (let i = tal.length - 1; i >= 0; i--) {
        const t = tal[i], u = (no - t.t0) / 900;
        if (u >= 1) { tal.splice(i, 1); continue; }
        g.font = "bold 10px monospace"; g.textAlign = "center";
        g.fillStyle = "#1c1d20"; g.fillText(t.tekst, t.x + 1, t.y - u * 18 + 1);
        g.fillStyle = t.farge; g.fillText(t.tekst, t.x, t.y - u * 18);
      }
      if (melding && !melding.hidden && no > meldingTid && !travel) melding.hidden = true;
    }
    const visTal = (mål, tekst, farge) => {
      const i = mål.fiende ? fi.indexOf(mål) : pa.indexOf(mål);
      const p = mål.fiende ? fiPos(i, fi.length) : paPos(i);
      tal.push({ x: p.x + (mål.fiende ? 0 : 16), y: p.y + (mål.fiende ? 10 : 8), tekst: String(tekst), farge, t0: performance.now() });
    };

    /* Handlingar */
    function skade(frå, til, faktor = 1) {
      const vern = til.vern > 0 ? 1.6 : 1;
      const s = Math.max(1, Math.round((frå.atk * 2 + rnd(0, frå.atk / 2)) * faktor - til.def * vern));
      til.hp = Math.max(0, til.hp - s);
      til.blink = performance.now() + 400;
      if (til.hp <= 0 && til.fiende) til.dod = performance.now();
      visTal(til, s, til.fiende ? "#fff" : "#ffb0a0");
      return s;
    }
    async function fiendeTur(f) {
      travel = true;
      f.tur++;
      const levande = pa.filter(m => m.hp > 0);
      const sp = f.d.spesial;
      f.fram = performance.now() + 300;
      if (sp && f.tur % sp.kvar === 0) {
        meld(sp.tekst, 1800);
        await vent(700);
        for (const m of sp.alle ? levande : [levande[Math.floor(Math.random() * levande.length)]]) skade(f, m, sp.faktor);
      } else {
        const mål = levande[Math.floor(Math.random() * levande.length)];
        meld(`${f.namn} angrip ${mål.namn}!`);
        await vent(350);
        skade(f, mål);
      }
      await vent(650);
      f.atb = 0;
      pa.forEach(m => { if (m.vern > 0 && f === fi[0]) {} });
      travel = false;
    }
    async function partiHandling(m, kommando, mal, evneId, ting) {
      travel = true;
      if (kommando === "angrip") {
        m.fram = performance.now() + 300;
        meld(`${m.namn} angrip!`);
        await vent(300);
        skade(m, mal);
        await vent(600);
      } else if (kommando === "ordkunst") {
        const ev = RPGData.EVNER[evneId];
        m.mp -= ev.mp;
        meld(`${m.namn}: ${ev.namn}`, 1800);
        let rett = true, item = null;
        if (ev.sporsmal) {
          ({ rett, item } = await spor(ev.sporsmal, gaaver));
          if (rett && item) { const o = ordFraItem(item); if (o && paaOrd) paaOrd(o); }
        }
        m.fram = performance.now() + 300;
        if (ev.type === "skade") {
          let faktor = (ev.kraft + m.atk * 0.8) / (m.atk * 2.2);
          if (evneId === "vokalskifte" && gaaver.vokalstav) faktor *= 1.25;
          if (ev.sporsmal) faktor *= rett ? 1.6 : 0.35;
          for (const f of ev.mal === "alle" ? fi.filter(f => f.hp > 0) : [mal]) skade(m, f, faktor);
          meld(ev.sporsmal ? (rett ? `${ev.namn} treffer med full kraft!` : "Formelen fuska. Ordet slapp unna.") : `${ev.namn}!`);
        } else if (ev.type === "lækje") {
          const mengd = Math.round(ev.kraft * (ev.sporsmal ? (rett ? 1 : 0.4) : 1) + m.atk);
          for (const v of ev.mal === "alle" ? pa.filter(v => v.hp > 0) : [mal]) { const før = v.hp; v.hp = Math.min(v.maxhp, v.hp + mengd); visTal(v, `+${Math.round(v.hp - før)}`, "#9ff09f"); }
          meld(rett ? "Eit godt minne lækjer!" : "Minnet var uklart, men det hjelpte litt.");
        } else if (ev.type === "vern") {
          if (!ev.sporsmal || rett) {
            const rundar = ev.kraft + (gaaver.v2kompass ? 2 : 0);
            pa.forEach(v => { if (v.hp > 0) { v.vern = rundar; visTal(v, "Vern", "#f4c430"); } });
            meld("Verbalet står på plass to. Partiet står støtt!");
          } else meld("Setninga rasa. Ingen vern denne gongen.");
        }
        await vent(700);
      } else if (kommando === "ting") {
        const t = RPGData.TING[ting];
        ting && (m.brukTing(ting));
        if (t.lækje) { const før = mal.hp; mal.hp = Math.min(mal.maxhp, mal.hp + t.lækje); visTal(mal, `+${mal.hp - før}`, "#9ff09f"); }
        if (t.blekk) { const før = mal.mp; mal.mp = Math.min(mal.maxmp, mal.mp + t.blekk); visTal(mal, `+${mal.mp - før} blekk`, "#9fd0ff"); }
        if (t.vekk && mal.hp <= 0) { mal.hp = Math.round(mal.maxhp * t.vekk); visTal(mal, "Vaken!", "#9ff09f"); }
        meld(`${m.namn} brukar ${t.namn}.`);
        await vent(700);
      } else if (kommando === "flykt") {
        if (!boss && Math.random() < 0.65) { meld("Partiet kom seg unna!"); await vent(700); utfall = "flukt"; }
        else { meld(boss ? "Du kan ikkje flykte frå denne!" : "Kom ikkje unna!"); await vent(700); }
      }
      // Vernet varer eit visst tal på tur for heile partiet.
      if (m.vern > 0) m.vern--;
      m.atb = 0;
      travel = false;
    }

    /* Kommandomenyen */
    function meny_(m) {
      return new Promise(res => {
        const vis = (tittel, alt, tilbake) => new Promise(r => {
          meny.hidden = false;
          meny.innerHTML = `<p class="km-tittel">${E(tittel)}</p>${alt.map((a, i) => `<button type="button" data-i="${i}"${a.av ? " disabled" : ""}><span>${E(a.namn)}</span>${a.info ? `<small>${E(a.info)}</small>` : ""}</button>`).join("")}`;
          const kn = [...meny.querySelectorAll("button")];
          let valt = Math.max(0, alt.findIndex(a => !a.av));
          const merk = () => kn.forEach((b, i) => b.classList.toggle("peikar", i === valt));
          merk();
          const ferdig = i => { slepp(); r(i); };
          kn.forEach((b, i) => b.addEventListener("click", () => { if (!alt[i].av) ferdig(i); }));
          const slepp = Motor.lytt({
            a: () => { if (!alt[valt].av) ferdig(valt); },
            b: () => { if (tilbake) ferdig(-1); },
            retning: d => { const n = alt.length; let v = valt; do { v = (v + (d === 1 || d === 2 ? n - 1 : 1)) % n; } while (alt[v].av && v !== valt); valt = v; merk(); },
          });
        });
        const velMal = (type) => {
          const liste = type === "venn" || type === "venn-fall" ? pa.filter(v => type === "venn-fall" ? true : v.hp > 0) : fi.filter(f => f.hp > 0);
          if (type === "alle") return Promise.resolve(null);
          return vis("Kven?", liste.map(v => ({ namn: v.namn, info: v.fiende ? "" : `${Math.round(v.hp)}/${v.maxhp}` })), true).then(i => i < 0 ? undefined : liste[i]);
        };
        (async function hovud() {
          while (true) {
            const i = await vis(m.namn, [{ namn: "Angrip" }, { namn: "Ordkunst" }, { namn: "Ting", av: !Object.values(m.ting()).some(n => n > 0) }, { namn: "Flykt" }]);
            if (i === 0) { const mal = await velMal("ein"); if (mal) { meny.hidden = true; return res(["angrip", mal]); } }
            if (i === 1) {
              const evner = m.evner;
              const j = await vis("Ordkunst", evner.map(id => { const ev = RPGData.EVNER[id]; return { namn: ev.namn, info: `${ev.mp} blekk`, av: m.mp < ev.mp }; }), true);
              if (j >= 0) { const ev = RPGData.EVNER[evner[j]]; const mal = ev.mal === "alle" ? null : await velMal(ev.mal === "venn" ? "venn" : "ein"); if (mal !== undefined) { meny.hidden = true; return res(["ordkunst", mal, evner[j]]); } }
            }
            if (i === 2) {
              const eigd = Object.entries(m.ting()).filter(([, n]) => n > 0);
              const j = await vis("Ting", eigd.map(([id, n]) => ({ namn: RPGData.TING[id].namn, info: `×${n}` })), true);
              if (j >= 0) { const id = eigd[j][0]; const mal = await velMal(RPGData.TING[id].vekk ? "venn-fall" : "venn"); if (mal !== undefined) { meny.hidden = true; return res(["ting", mal, null, id]); } }
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
    const teiknLoop = no => { if (!rot.hidden) { teikn(performance.now()); requestAnimationFrame(teiknLoop); } };
    requestAnimationFrame(teiknLoop);
    while (!utfall) {
      await vent(30);
      const no = performance.now(), dt = Math.min(100, no - sist); sist = no;
      if (fi.every(f => f.hp <= 0)) { utfall = "siger"; break; }
      if (pa.every(m => m.hp <= 0)) { utfall = "tap"; break; }
      if (travel || menyOpen) continue;
      for (const x of [...fi, ...pa]) if (x.hp > 0 && !ventar.includes(x)) x.atb = Math.min(100, x.atb + x.spd * dt * 0.0045);
      for (const m of pa) if (m.hp > 0 && m.atb >= 100 && !ventar.includes(m)) ventar.push(m);
      oppdaterLister();
      const klarFiende = fi.find(f => f.hp > 0 && f.atb >= 100);
      if (klarFiende) { await fiendeTur(klarFiende); oppdaterLister(); continue; }
      const m = ventar[0];
      if (m) {
        if (m.hp <= 0) { ventar.shift(); continue; }
        menyOpen = true;
        oppdaterLister();
        const [k, mal, evne, ting] = await meny_(m);
        menyOpen = false;
        ventar.shift();
        let malet = mal;
        if (malet && malet.fiende && malet.hp <= 0) malet = fi.find(f => f.hp > 0);
        if (k !== "flykt" && k !== "ting" && !malet && k !== "ordkunst") continue;
        await partiHandling(m, k, malet, evne, ting);
        oppdaterLister();
      }
    }
    await vent(utfall === "siger" ? 700 : 300);
    const xp = utfall === "siger" ? fi.reduce((s, f) => s + f.d.xp, 0) : 0;
    const pengar = utfall === "siger" ? fi.reduce((s, f) => s + f.d.pengar, 0) : 0;
    const fall = [];
    if (utfall === "siger") for (const f of fi) for (const [id, sj] of f.d.fall || []) if (Math.random() < sj) fall.push(id);
    pa.forEach(m => { m.vern = 0; m.atb = 0; });
    rot.hidden = true; rot.innerHTML = "";
    return { utfall, xp, pengar, fall };
  }

  return { start, spor };
})();
