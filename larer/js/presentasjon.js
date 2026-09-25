/* Presentasjonsvisaren for tavleundervisning (larer/presentasjon.html?id=<modul>).

   Lysbileta blir teikna på ei fast flate på 1024 × 576 punkt som blir skalert
   til skjermen, så alt ser likt ut på projektor, smartboard og laptop.

   Tastar: → mellomrom PageDown  neste steg · ← PageUp  førre · Home/End
           F fullskjerm · N notat · T talarvindauge · I innhald · B svart skjerm

   Talarvindauget (…&talar=1) viser lysbiletet, notata, neste lysbilete og ei
   klokke. Dei to vindauga held seg i takt med postMessage, som òg verkar når
   sida er opna rett frå disken (file://). Tilfeldige tavleoppgåver frå
   ordbanken blir trekte med eit felles frø, så begge vindauga viser dei same. */
(function () {
  "use strict";
  const E = Larar.esc;
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const talar = params.get("talar") === "1";
  const fro = Number(params.get("fro")) || Math.floor(Math.random() * 1e9);
  const FIG = ".figur, .tidslinje, .toliner, .ordbygg, .former, .leddsetning, .v2demo, .kjonnkort, .ordartikkel, .ordklassar, .tempuslinje, .vegvisar, .analyse, .setningsboksar, .daanaar, .vokalskifte, .pronomenpar";

  /* ---------- tilfeldig, men likt i begge vindauga ---------- */
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function stokk(arr, r) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  /* ---------- lysbilete ---------- */
  // Kvar byggjar gir { el, steg, vis(k) }: steg er kor mange trykk lysbiletet har
  // før det går vidare, og vis(k) syner tilstanden etter k trykk.

  function ramme(s, klasse, inni) {
    const el = document.createElement("section");
    el.className = `lysbilete ${klasse}${s.klasse ? " " + s.klasse : ""}`;
    el.hidden = true;
    el.innerHTML = `${s.kicker ? `<p class="lb-kicker">${s.kicker}</p>` : ""}${s.title ? `<h2 class="lb-tittel">${s.title}</h2>` : ""}${inni}`;
    return el;
  }

  // Felles for alle typar: `steps` (vist eitt og eitt) og `svar` (vist til slutt).
  function stegOgSvar(s) {
    const steps = (s.steps || []).map(h => `<div class="steg">${h}</div>`).join("");
    const svar = s.svar ? `<div class="svar steg"><span class="svar-merke">Svar</span>${s.svar}</div>` : "";
    return steps + svar;
  }
  // Alt med klassen `steg` blir vist eitt og eitt, i den rekkjefølgja det står.
  // Element med same `data-steg` (t.d. to celler i same tabellrad) kjem fram på same trykk.
  function stegVisar(el) {
    const grupper = new Map();
    el.querySelectorAll(":scope .steg").forEach((d, j) => {
      const nøkkel = d.dataset.steg ? "g:" + d.dataset.steg : "e:" + j;
      if (!grupper.has(nøkkel)) grupper.set(nøkkel, []);
      grupper.get(nøkkel).push(d);
    });
    const liste = [...grupper.values()];
    return { tal: liste.length, vis: k => liste.forEach((g, j) => g.forEach(d => d.classList.toggle("vist", j < k))) };
  }

  const BYGG = {
    tittel(s, m) {
      const el = document.createElement("section");
      el.className = "lysbilete lb-framside";
      el.hidden = true;
      el.innerHTML = `
        <img class="lb-logo" src="ivar-aasen.png" alt="" width="96" height="96" />
        <p class="lb-kicker">${E(Larar.kicker(m))}</p>
        <h1>${E(m.title)}</h1>
        <p class="lb-ingress">${E(m.summary)}</p>
        <p class="lb-kurs">Nynorskkurs · ungdomsskulen</p>`;
      return { el, steg: 0, vis() {} };
    },

    standard(s) {
      const el = ramme(s, "lb-standard", `<div class="lb-kropp">${s.body || ""}${stegOgSvar(s)}</div>`);
      const v = stegVisar(el);
      return { el, steg: v.tal, vis: v.vis };
    },

    sporsmal(s) {
      const bokstav = "ABCDEFG";
      const el = ramme(Object.assign({ title: "Kva trur du?" }, s), "lb-sporsmal", `
        <div class="lb-kropp">
          <p class="lb-spm">${s.question}</p>
          <ol class="lb-alt">${s.options.map((o, i) => `<li data-rett="${i === s.correct}"><span class="alt-bokstav">${bokstav[i]}</span><span>${o}</span></li>`).join("")}</ol>
          <div class="lb-forklar steg">${s.explain || ""}</div>
        </div>`);
      const liste = el.querySelector(".lb-alt"), forklar = el.querySelector(".lb-forklar");
      return { el, steg: 1, vis: k => { liste.classList.toggle("avslort", k >= 1); forklar.classList.toggle("vist", k >= 1); } };
    },

    diskuter(s) {
      const el = ramme(Object.assign({ kicker: "Snakk saman" }, s), "lb-diskuter", `
        <div class="lb-kropp">
          <div class="lb-prat">${s.prompt || ""}</div>
          <p class="lb-form">${s.form ? E(s.form) : ""}${s.tid ? ` · <button type="button" class="lb-klokke-btn" data-min="${Number(s.tid) || 2}">Start klokka (${Number(s.tid) || 2} min)</button>` : ""}</p>
          ${stegOgSvar(s)}
        </div>`);
      const v = stegVisar(el);
      return { el, steg: v.tal, vis: v.vis };
    },

    sitat(s) {
      const el = ramme(s, "lb-sitat", `
        <div class="lb-kropp">
          <blockquote>${s.text}</blockquote>
          ${s.kjelde ? `<p class="lb-kjelde">${s.kjelde}</p>` : ""}
          ${stegOgSvar(s)}
        </div>`);
      const v = stegVisar(el);
      return { el, steg: v.tal, vis: v.vis };
    },

    bilete(s) {
      const bilde = `<figure class="lb-bilde"><img src="${E(s.src)}" alt="${E(s.alt || "")}" />${s.caption ? `<figcaption>${s.caption}</figcaption>` : ""}</figure>`;
      const tekst = (s.body || "") + stegOgSvar(s);
      const el = ramme(s, "lb-bilete", tekst ? `<div class="lb-kropp lb-bilde-rad">${bilde}<div class="lb-bilde-tekst">${tekst}</div></div>` : `<div class="lb-kropp">${bilde}</div>`);
      const v = stegVisar(el);
      return { el, steg: v.tal, vis: v.vis };
    },

    // Elevane arbeider med oppgåvene på tavla, i skriveboka om ikkje anna er sagt.
    // `utstyr` seier kva dei treng: skrivebok, ordbok (på nett) eller pc.
    oppgave(s) {
      const NAMN = { skrivebok: "I skriveboka", ordbok: "Ordbok på nett", pc: "På PC" };
      const utstyr = s.utstyr && s.utstyr.length ? s.utstyr : ["skrivebok"];
      const merke = utstyr.map(u => `<span class="lb-merke lb-merke-${E(u)}">${NAMN[u] || E(u)}</span>`).join("")
        + (s.form ? `<span class="lb-merke lb-merke-form">${E(s.form)}</span>` : "")
        + (s.tid ? `<span class="lb-merke lb-merke-tid">Om lag ${Number(s.tid)} min</span>` : "");
      const el = ramme(Object.assign({ kicker: "Elevane arbeider" }, s), "lb-oppgave", `
        <div class="lb-kropp">
          <p class="lb-merkerad">${merke}</p>
          ${s.body || ""}
          ${stegOgSvar(s)}
        </div>`);
      const v = stegVisar(el);
      return { el, steg: v.tal, vis: v.vis };
    },

    // Ein lang tekst (til dømes ein lesetekst) som blir vist side for side.
    // Talet på sider blir målt når lysbileta er bygde (sjå mål()).
    tekst(s) {
      const el = ramme(Object.assign({ kicker: "Les" }, s), "lb-tekst", `
        <div class="lb-kropp lb-tekstvindauge"><div class="lb-tekstinnhald">${s.text || ""}</div></div>
        <p class="lb-tekstbotn"><span>${s.kjelde || ""}</span><span class="lb-side"></span></p>`);
      const vindauge = el.querySelector(".lb-tekstvindauge"), inn = el.querySelector(".lb-tekstinnhald"), side = el.querySelector(".lb-side");
      let sider = 1, steglengd = 0, maks = 0;
      const b = { el, steg: 0, ingenSkala: true };
      b.mål = () => {
        const lh = parseFloat(getComputedStyle(inn).lineHeight) || 32;
        // Vindauget blir runda av til heile liner, så ingen line blir kutta på tvers nedst.
        vindauge.style.flex = ""; vindauge.style.height = "";
        const h = Math.max(lh, Math.floor(vindauge.clientHeight / lh) * lh);
        vindauge.style.flex = "none"; vindauge.style.height = h + "px";
        // Kvar side overlappar med éi line, så lesaren ikkje mistar tråden.
        steglengd = Math.max(lh, Math.floor(h / lh) * lh - lh);
        maks = Math.max(0, inn.scrollHeight - h);
        sider = maks > 2 ? 1 + Math.ceil(maks / steglengd) : 1;
        b.steg = sider - 1;
      };
      b.vis = k => {
        inn.style.transform = `translateY(${-Math.min(k * steglengd, maks)}px)`;
        side.textContent = sider > 1 ? `Side ${Math.min(k, sider - 1) + 1} av ${sider}` : "";
      };
      return b;
    },

    // Tavleoppgåver trekte frå ordbanken, med same spesifikasjon som ein drill-seksjon.
    drill(s, m, nr, ctx) {
      const n = s.n || 6;
      const el = ramme(Object.assign({ kicker: "Tavleøving" }, s), "lb-drill", `
        <div class="lb-kropp">
          ${s.intro ? `<p class="lb-drill-intro">${s.intro}</p>` : ""}
          <div class="drill-kort"></div>
          <p class="drill-botn"><span class="drill-teljar"></span><button type="button" class="lb-ny-drill">Nye oppgåver</button></p>
        </div>`);
      const kort = el.querySelector(".drill-kort"), teljar = el.querySelector(".drill-teljar");
      let alle = [];
      try { alle = Drills.build(s.spec); } catch (e) { kort.innerHTML = `<p class="feil">Fann ikkje oppgåvene: ${E(e.message)}</p>`; }
      let utval = [];
      const trekk = runde => {
        const r = rng(fro + nr * 7919 + runde * 104729);
        utval = stokk(alle, r).slice(0, n).map(it => ({
          it,
          alt: it.options && it.options.length >= 2 && s.spec.mode !== "type" ? stokk([...new Set(it.options)], r) : null,
        }));
      };
      trekk(0);
      const svarTekst = it => it.accept.map(E).join(" / ");
      const vis = k => {
        if (!utval.length) return;
        const idx = Math.min(Math.floor(k / 2), utval.length - 1), opp = k % 2 === 1 || k >= utval.length * 2;
        const { it, alt } = utval[idx];
        const blank = opp ? `<span class="blank fylt">${svarTekst(it)}</span>` : `<span class="blank">&nbsp;</span>`;
        const prompt = it.prompt.includes("___") ? E(it.prompt).replace("___", blank) : `${E(it.prompt)} ${blank}`;
        const rett = o => it.accept.some(a => Drills.normalize(a) === Drills.normalize(o));
        kort.innerHTML = `
          <p class="drill-prompt">${prompt}</p>
          ${it.cue && !(alt && alt.every(o => it.cue.includes(o))) ? `<p class="drill-cue">${E(it.cue)}</p>` : ""}
          ${alt ? `<ul class="drill-alt${opp ? " avslort" : ""}">${alt.map(o => `<li data-rett="${rett(o)}">${E(o)}</li>`).join("")}</ul>` : ""}
          <div class="drill-why${opp ? " vist" : ""}">${opp && it.why ? it.why : ""}</div>`;
        teljar.textContent = `Oppgåve ${idx + 1} av ${utval.length}`;
      };
      el.querySelector(".lb-ny-drill").addEventListener("click", e => { e.stopPropagation(); ctx.nyDrill(nr); });
      return { el, steg: Math.max(0, utval.length * 2 - 1), vis, runde: r => { trekk(r); } };
    },
  };

  /* ---------- oppstart ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const m = id ? Modules.get(id) : null;
    const entry = id ? Larar.get(id) : null;
    const scene = document.getElementById("scene"), stage = document.getElementById("stage");
    if (!m || !entry) {
      stage.innerHTML = `<section class="lysbilete lb-framside"><h1>Fann ikkje presentasjonen</h1><p class="lb-ingress"><a href="larer/index.html">Tilbake til lærarsida</a></p></section>`;
      stage.firstChild.hidden = false;
      fit();
      window.addEventListener("resize", fit);
      return;
    }
    document.title = `${m.title} · Presentasjon`;
    document.body.classList.toggle("talar", talar);

    const slides = [{ type: "tittel", title: m.title, notes: entry.tittelnotat }].concat(entry.slides);
    const ctx = { nyDrill: (nr, fraAnnan) => nyDrill(nr, fraAnnan) };
    const bygde = slides.map((s, nr) => {
      const b = (BYGG[s.type || "standard"] || BYGG.standard)(s, m, nr, ctx);
      b.s = s;
      b.el.insertAdjacentHTML("beforeend", `<p class="lb-fot"><span>${E(m.title)}</span><span>${nr + 1} / ${slides.length}</span></p>`);
      // Innhaldet i lysbiletet ligg i ein eigen boks som kan krympast om det ikkje får plass.
      const kropp = b.el.querySelector(".lb-kropp");
      if (kropp && !b.ingenSkala) {
        const skala = document.createElement("div");
        skala.className = "lb-skala";
        while (kropp.firstChild) skala.appendChild(kropp.firstChild);
        kropp.appendChild(skala);
        b.kropp = kropp; b.skala = skala;
      }
      stage.appendChild(b.el);
      return b;
    });
    // Lange tekstar blir målte når dei er på plass, så vi veit kor mange sider dei har.
    const mål = () => bygde.forEach(b => { if (b.mål) { const skjult = b.el.hidden; b.el.hidden = false; b.mål(); b.el.hidden = skjult; } });
    mål();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { mål(); vis(true); });
    const drillRunde = {};

    let i = 0, k = 0;
    const fraHash = () => {
      const [a, b] = location.hash.slice(1).split(".").map(Number);
      if (a >= 1 && a <= bygde.length) { i = a - 1; k = Math.min(Math.max(0, b || 0), bygde[i].steg); }
    };
    fraHash();

    const teljar = document.getElementById("teljar");
    const notat = document.getElementById("notat");
    const innhald = document.getElementById("innhald");
    innhald.querySelector("ol").innerHTML = slides.map((s, j) => `<li><button type="button" data-til="${j}">${s.title ? s.title.replace(/<[^>]+>/g, "") : "(utan tittel)"}</button></li>`).join("");

    function vis(fraAnnan) {
      bygde.forEach((b, j) => {
        const aktiv = j === i;
        if (b.el.hidden === aktiv) {
          b.el.hidden = !aktiv;
          if (aktiv) b.el.querySelectorAll(FIG).forEach(f => {
            f.classList.add("synleg");
            if (f.hasAttribute("data-spel")) { f.classList.remove("spelar"); void f.offsetWidth; f.classList.add("spelar"); }
          });
        }
      });
      bygde[i].vis(k);
      tilpass(bygde[i]);
      teljar.textContent = `${i + 1} / ${bygde.length}`;
      const n = bygde[i].s.notes;
      notat.querySelector(".notat-tekst").innerHTML = n || "<em>Ingen notat til dette lysbiletet.</em>";
      if (talar) {
        const neste = bygde[i + 1];
        document.getElementById("t-neste").innerHTML = neste ? (neste.s.title || m.title) : "<em>Slutt på presentasjonen</em>";
        document.getElementById("t-steg").textContent = bygde[i].steg ? `Steg ${k} av ${bygde[i].steg}` : "";
      }
      innhald.querySelectorAll("button").forEach((btn, j) => btn.classList.toggle("no", j === i));
      history.replaceState(null, "", location.pathname + location.search + `#${i + 1}${k ? "." + k : ""}`);
      if (!fraAnnan) send({ nn: "lysbilete", id, i, k });
    }

    // Får ikkje innhaldet plass, blir det krympt litt (aldri under 65 %), så ingenting blir kutta.
    function tilpass(b) {
      if (!b.skala) return;
      b.skala.style.zoom = 1;
      const plass = b.kropp.clientHeight, trengst = b.skala.scrollHeight;
      if (trengst > plass + 2) b.skala.style.zoom = Math.max(0.65, (plass / trengst) * 0.98);
      b.skala.querySelectorAll("img").forEach(img => {
        if (!img.complete) img.addEventListener("load", () => tilpass(b), { once: true });
      });
    }

    function neste() {
      if (k < bygde[i].steg) k++;
      else if (i < bygde.length - 1) { i++; k = 0; }
      vis();
    }
    function forrige() {
      if (k > 0) k--;
      else if (i > 0) { i--; k = bygde[i].steg; }
      vis();
    }
    function gaaTil(j, kk) { i = Math.max(0, Math.min(bygde.length - 1, j)); k = Math.max(0, Math.min(bygde[i].steg, kk || 0)); vis(); }
    function nyDrill(nr, fraAnnan) {
      drillRunde[nr] = (drillRunde[nr] || 0) + 1;
      bygde[nr].runde(drillRunde[nr]);
      if (nr === i) k = 0;
      vis(true);
      if (!fraAnnan) send({ nn: "drill", id, nr, runde: drillRunde[nr], i, k });
    }

    /* ---------- talarvindauge ---------- */
    let talarVindu = null;
    function send(msg) {
      const w = talar ? window.opener : talarVindu;
      if (w && !w.closed) { try { w.postMessage(msg, "*"); } catch (e) { /* vindauget er lukka */ } }
    }
    window.addEventListener("message", e => {
      const d = e.data || {};
      if (d.id !== id) return;
      if (d.nn === "svart") { svart.classList.toggle("paa"); return; }
      if (d.nn === "lysbilete") { i = d.i; k = d.k; vis(true); }
      else if (d.nn === "drill") {
        while ((drillRunde[d.nr] || 0) < d.runde) { drillRunde[d.nr] = (drillRunde[d.nr] || 0) + 1; }
        bygde[d.nr].runde(d.runde); i = d.i; k = d.k; vis(true);
      } else if (d.nn === "hei" && !talar) {
        Object.entries(drillRunde).forEach(([nr, r]) => send({ nn: "drill", id, nr: Number(nr), runde: r, i, k }));
        send({ nn: "lysbilete", id, i, k });
      }
    });
    function opneTalar() {
      if (talar) return;
      const url = `${location.pathname}?id=${encodeURIComponent(id)}&talar=1&fro=${fro}#${i + 1}.${k}`;
      talarVindu = window.open(url, "nn-talar", "width=1200,height=760");
    }
    if (talar && window.opener) send({ nn: "hei", id });

    /* ---------- kontrollar ---------- */
    const svart = document.getElementById("svart");
    const handling = {
      neste, forrige,
      notat: () => document.body.classList.toggle("vis-notat"),
      innhald: () => document.body.classList.toggle("vis-innhald"),
      talar: opneTalar,
      fullskjerm: () => {
        if (document.fullscreenElement) document.exitFullscreen();
        else (document.documentElement.requestFullscreen || (() => {})).call(document.documentElement);
      },
      svart: () => { if (talar) send({ nn: "svart", id }); else svart.classList.toggle("paa"); },
    };
    document.querySelectorAll("[data-a]").forEach(b => b.addEventListener("click", e => { e.stopPropagation(); handling[b.dataset.a](); }));
    innhald.addEventListener("click", e => {
      const b = e.target.closest("[data-til]");
      if (b) { gaaTil(Number(b.dataset.til), 0); document.body.classList.remove("vis-innhald"); }
    });

    document.addEventListener("keydown", e => {
      if ((e.target.closest && e.target.closest("input, textarea, select")) || e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.key;
      if (["ArrowRight", "PageDown", " ", "ArrowDown"].includes(t)) { e.preventDefault(); neste(); }
      else if (["ArrowLeft", "PageUp", "ArrowUp", "Backspace"].includes(t)) { e.preventDefault(); forrige(); }
      else if (t === "Home") gaaTil(0, 0);
      else if (t === "End") gaaTil(bygde.length - 1, 0);
      else if (t === "f" || t === "F") handling.fullskjerm();
      else if (t === "n" || t === "N") handling.notat();
      else if (t === "t" || t === "T") handling.talar();
      else if (t === "i" || t === "I") handling.innhald();
      else if (t === "b" || t === "B" || t === ".") handling.svart();
      else if (t === "Escape") { document.body.classList.remove("vis-notat", "vis-innhald"); svart.classList.remove("paa"); }
    });

    // Eit klikk på sjølve lysbiletet går vidare, men ikkje klikk på knappar og figurar.
    scene.addEventListener("click", e => {
      if (e.target.closest("button, a, input, textarea, select, [data-analyse], [data-v2], .ordklassar, .ordartikkel, .kontroll")) return;
      if (svart.classList.contains("paa")) { svart.classList.remove("paa"); return; }
      neste();
    });
    let tx = null;
    scene.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
    scene.addEventListener("touchend", e => {
      if (tx == null) return;
      const dx = e.changedTouches[0].clientX - tx; tx = null;
      if (Math.abs(dx) > 50) (dx < 0 ? neste : forrige)();
    });

    // Kontrollane forsvinn når musa står i ro.
    let tidar = null;
    const vekk = () => { document.body.classList.add("roleg"); };
    document.addEventListener("mousemove", () => { document.body.classList.remove("roleg"); clearTimeout(tidar); tidar = setTimeout(vekk, 2500); });
    tidar = setTimeout(vekk, 2500);

    /* ---------- klokke til samtaleoppgåver ----------
       Knappen på lysbiletet startar klokka og blir til ein stoppknapp. Klokka kan
       òg stoppast med eit klikk på sjølve nedteljinga eller med Escape, sjølv om
       læraren har gått vidare til eit anna lysbilete. Start og stopp blir sende
       til det andre vindauget, så tavla og talarvindauget viser same klokke. */
    const nedteljing = document.getElementById("nedteljing");
    nedteljing.title = "Klikk for å stoppe klokka";
    let slutt = 0, klokke = null, gøymTidar = null;
    const knappar = () => stage.querySelectorAll(".lb-klokke-btn");
    function merkKnappar() {
      knappar().forEach(k => {
        k.textContent = klokke ? "Stopp klokka" : `Start klokka (${k.dataset.min} min)`;
        k.classList.toggle("gaar", !!klokke);
      });
    }
    function stoppKlokke(fraAnnan) {
      clearInterval(klokke); clearTimeout(gøymTidar);
      klokke = null;
      nedteljing.hidden = true;
      nedteljing.classList.remove("ferdig");
      merkKnappar();
      if (!fraAnnan) send({ nn: "klokke", id, slutt: 0 });
    }
    function startKlokke(nySlutt, fraAnnan) {
      clearInterval(klokke); clearTimeout(gøymTidar);
      slutt = nySlutt;
      nedteljing.hidden = false; nedteljing.classList.remove("ferdig");
      const tikk = () => {
        const igjen = Math.max(0, Math.round((slutt - Date.now()) / 1000));
        nedteljing.textContent = `${Math.floor(igjen / 60)}:${String(igjen % 60).padStart(2, "0")}`;
        if (!igjen) {
          // Tida er ute: nedteljinga blinkar ei stund og forsvinn så av seg sjølv.
          clearInterval(klokke); klokke = null; merkKnappar();
          nedteljing.classList.add("ferdig");
          gøymTidar = setTimeout(() => { if (!klokke) nedteljing.hidden = true; }, 8000);
        }
      };
      klokke = setInterval(tikk, 500);
      tikk();
      merkKnappar();
      if (!fraAnnan) send({ nn: "klokke", id, slutt });
    }
    stage.addEventListener("click", e => {
      const b = e.target.closest(".lb-klokke-btn");
      if (!b) return;
      e.stopPropagation();
      if (klokke) stoppKlokke();
      else startKlokke(Date.now() + Number(b.dataset.min) * 60000);
    });
    nedteljing.addEventListener("click", e => { e.stopPropagation(); stoppKlokke(); });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && !nedteljing.hidden) stoppKlokke();
    });
    window.addEventListener("message", e => {
      const d = e.data || {};
      if (d.nn !== "klokke" || d.id !== id) return;
      if (d.slutt > Date.now()) startKlokke(d.slutt, true); else stoppKlokke(true);
    });

    if (talar) {
      const start = Date.now();
      const ur = document.getElementById("t-klokke");
      setInterval(() => {
        const s = Math.floor((Date.now() - start) / 1000);
        const no = new Date();
        ur.textContent = `${String(no.getHours()).padStart(2, "0")}:${String(no.getMinutes()).padStart(2, "0")} · ${Math.floor(s / 60)} min brukt`;
      }, 1000);
    }

    function fit() {
      const box = scene.getBoundingClientRect();
      const s = Math.min(box.width / 1024, box.height / 576);
      stage.style.transform = `translate(-50%, -50%) scale(${s})`;
    }
    window.addEventListener("resize", fit);
    fit();
    vis(true);
  });

  function fit() {
    const scene = document.getElementById("scene"), stage = document.getElementById("stage");
    const box = scene.getBoundingClientRect();
    stage.style.transform = `translate(-50%, -50%) scale(${Math.min(box.width / 1024, box.height / 576)})`;
  }
})();
