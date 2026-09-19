/* Grammatikksjekk for fritekstoppgåvene: tre reglar for feil elevane gjer
   heile tida, og som kan avgjerast av orda rundt utan å analysere setninga.

     1. Kjønn på artikkelen:   eit bok, ein hus       → ei bok, eit hus
     2. Samsvar etter «eit»:   eit stor hus            → eit stort hus
     3. «når» om éi hending:   Når vi kom fram, …      → Då vi kom fram, …

   Motoren får ein funksjon tagar(ord) som gir morfologien til ei ordform, til
   dømes ["subst fem eint ub"] for «bok», eller null om ordet er ukjent. Sjå
   Spell.tagar i js/spell.js.

   Kvar regel er skriven for å teie heller enn å gjette. 18 % av ordformene i
   ordbanken kan tolkast på fleire måtar, og ein regel som tek feil, lærer
   eleven noko gale. Difor held regelen att så snart eit ord er ukjent, har
   stor forbokstav midt i setninga, eller kan vere noko anna enn det regelen
   føreset. */

const Grammatikk = (() => {
  const ORD = /[a-zæøåéèêóòôäëüA-ZÆØÅÉÈÊÓÒÔÄËÜ]+(?:-[a-zæøåéèêóòôäëüA-ZÆØÅÉÈÊÓÒÔÄËÜ]+)*/g;

  // Deler teksten i ord, og merkjer om det står teiknsetjing mellom eit ord og
  // det neste. Reglane ser aldri forbi eit komma eller punktum.
  function ordlista(tekst) {
    const ut = [];
    let m;
    ORD.lastIndex = 0;
    while ((m = ORD.exec(tekst)) !== null) {
      const forrige = ut[ut.length - 1];
      if (forrige) forrige.brot = /[.,;:!?«»"()–—]/.test(tekst.slice(forrige.end, m.index));
      ut.push({ ord: m[0], lav: m[0].toLowerCase(), start: m.index, end: m.index + m[0].length, brot: false });
    }
    return ut;
  }

  // Stor forbokstav etter noko anna enn setningsstart er truleg eit namn.
  function erNamn(tok, tekst) {
    if (tok.ord[0] === tok.lav[0]) return false;
    return !/(^|[.!?]\s*)$/.test(tekst.slice(0, tok.start).trimEnd() + " ");
  }

  const har = (tagar, fn) => (tagar || []).some(fn);
  const ordklasse = t => t.split(" ")[0];
  const trekk = (t, x) => t.split(" ").includes(x);

  const ARTIKKEL = { ein: "mask", ei: "fem", eit: "nøyt" };
  const ARTIKKEL_FOR = { mask: "ein", fem: "ei", nøyt: "eit" };
  const KJONN_NAMN = { mask: "hankjønn", fem: "hokjønn", nøyt: "inkjekjønn" };

  const ubEint = t => ordklasse(t) === "subst" && trekk(t, "eint") && trekk(t, "ub") && !trekk(t, "prop");

  // Eit ord som òg kan vere verbal (ein veit aldri, ein låg der), pronomen,
  // preposisjon eller bindeord (i, då, sjølv), er for tvitydig til å vere
  // substantivet i frasen. Det same gjeld einskildbokstavar.
  const FUNKSJONSORD = new Set(["pron", "det", "prep", "konj", "sbu", "adv", "interj"]);
  function kanVereSubst(tok, t) {
    if (tok.lav.length < 2 || !har(t, ubEint)) return false;
    if (har(t, x => ordklasse(x) === "verb" && (trekk(x, "pres") || trekk(x, "pret")))) return false;
    if (har(t, x => FUNKSJONSORD.has(ordklasse(x)))) return false;
    return true;
  }
  const kjonnAv = t => ["mask", "fem", "nøyt"].find(k => trekk(t, k));
  const nøytAdj = t => ordklasse(t) === "adj" && trekk(t, "nøyt") && trekk(t, "ub") && trekk(t, "eint");

  // Finn substantivet artikkelen høyrer til: opptil tre adjektiv, så eit
  // substantiv i ubestemt form eintal. Alt anna tyder at «ein» ikkje er ein
  // artikkel her (ein av dei, ein veit aldri), og då teier regelen.
  function frase(toks, i, tekst, tagar) {
    const adjektiv = [];
    for (let j = i + 1; j < toks.length && j <= i + 4; j++) {
      if (toks[j - 1].brot) return null;
      const tok = toks[j];
      if (erNamn(tok, tekst)) return null;
      const t = tagar(tok.lav);
      if (!t) return null;
      const erAdj = har(t, x => ordklasse(x) === "adj");
      const erSubst = har(t, ubEint);

      if (erAdj && !erSubst) { adjektiv.push({ tok, t }); continue; }
      if (erSubst && !erAdj) return kanVereSubst(tok, t) ? { adjektiv, subst: { tok, t } } : null;
      if (!erAdj) return null;

      // Både adjektiv og substantiv (ny, lys, norsk). Neste ord avgjer: er det
      // eit klart substantiv, er dette adjektivet. Er neste ord ukjent eller
      // sjølv tvitydig, veit vi ikkje nok og teier.
      const nesteTok = toks[j + 1];
      const neste = nesteTok && !tok.brot ? tagar(nesteTok.lav) : null;
      if (nesteTok && !tok.brot) {
        if (!neste) return null;
        if (har(neste, ubEint)) {
          if (kanVereSubst(nesteTok, neste)) { adjektiv.push({ tok, t }); continue; }
          return null;
        }
      }
      return kanVereSubst(tok, t) ? { adjektiv, subst: { tok, t } } : null;
    }
    return null;
  }

  /* ---------- Regel 1: kjønn på artikkelen ---------- */
  function kjonnPaArtikkel(toks, tekst, tagar, funn) {
    toks.forEach((tok, i) => {
      const kjonn = ARTIKKEL[tok.lav];
      if (!kjonn) return;
      const f = frase(toks, i, tekst, tagar);
      if (!f) return;
      const moglege = new Set(f.subst.t.filter(ubEint).map(kjonnAv).filter(Boolean));
      if (!moglege.size || moglege.has(kjonn)) return;

      const rett = [...moglege].map(k => ARTIKKEL_FOR[k]);
      const namn = [...moglege].map(k => KJONN_NAMN[k]).join(" eller ");
      funn.push({
        type: "grammatikk",
        word: tok.ord, start: tok.start, end: tok.end,
        right: rett,
        why: `<em class="nn">${f.subst.tok.lav}</em> er ${namn}, så artikkelen skal vere `
          + rett.map(r => `<em class="nn">${r}</em>`).join(" eller ") + ".",
      });
    });
  }

  /* ---------- Regel 2: samsvarsbøying etter «eit» ---------- */
  // Kandidatar for inkjekjønnsforma: stor → stort, ny → nytt, blå → blått
  function nøytForm(ord, tagar) {
    const kandidatar = [ord + "t", ord + "tt"];
    if (/e$/.test(ord)) kandidatar.unshift(ord.slice(0, -1) + "t");
    return kandidatar.filter(k => har(tagar(k), nøytAdj));
  }

  function samsvarEtterEit(toks, tekst, tagar, funn) {
    toks.forEach((tok, i) => {
      if (tok.lav !== "eit") return;
      const f = frase(toks, i, tekst, tagar);
      if (!f || !f.adjektiv.length) return;
      // Berre når substantivet verkeleg er inkjekjønn. Elles er det artikkelen
      // som er feil, og det tek regel 1 seg av.
      if (!har(f.subst.t, t => ubEint(t) && trekk(t, "nøyt"))) return;

      f.adjektiv.forEach(({ tok: adj, t }) => {
        if (har(t, nøytAdj)) return;
        // Ubøyelege adjektiv: eit sovande barn, eit større hus
        if (har(t, x => ordklasse(x) === "adj" && !["m/f", "nøyt", "fl", "bu"].some(k => trekk(x, k)))) return;
        const rett = nøytForm(adj.lav, tagar);
        funn.push({
          type: "grammatikk",
          word: adj.ord, start: adj.start, end: adj.end,
          right: rett,
          why: `Etter <em class="nn">eit</em> får adjektivet inkjekjønnsform, som oftast med -t: `
            + `<em class="nn">eit stort hus</em>, <em class="nn">eit fint vêr</em>.`,
        });
      });
    });
  }

  /* ---------- Regel 3: «når» om éi hending i fortida ---------- */
  // Tekst som tyder at noko skjedde fleire gonger. Då er «når» rett.
  const GJENTEKE = /\b(kvar gong|kvar gang|alltid|ofte|pleidde|pla|stundom|somme tider|kvart år|kvar dag|kvar veke)\b/i;
  // Verb som innleier eit indirekte spørsmål: «eg veit ikkje når han kom».
  const SPØR = new Set(["veit", "visste", "spør", "spurde", "lurer", "lurte", "hugsar", "hugsa",
    "fortel", "fortalde", "forstår", "forstod", "skjønar", "skjøna", "undrast", "tenkjer", "tenkte", "sa", "seier"]);

  function naarMedPreteritum(toks, tekst, tagar, funn) {
    toks.forEach((tok, i) => {
      if (tok.lav !== "når") return;

      // Setninga «når» står i
      const fraStart = tekst.slice(0, tok.start);
      const sStart = Math.max(fraStart.lastIndexOf("."), fraStart.lastIndexOf("!"), fraStart.lastIndexOf("?")) + 1;
      const etter = tekst.slice(tok.end);
      const sSlutt = tok.end + (etter.search(/[.!?]/) + 1 || etter.length);
      const setning = tekst.slice(sStart, sSlutt);
      if (GJENTEKE.test(setning) || /\?/.test(setning)) return;

      // Indirekte spørsmål: eit spørjeverb like før «når»
      for (let j = Math.max(0, i - 4); j < i; j++) {
        if (SPØR.has(toks[j].lav)) return;
      }

      // Subjektet først (pronomen, namn eller substantiv med determinativ),
      // så verbalet. Kjem verbet rett etter «når», er det eit spørsmål.
      let j = i + 1;
      let subjekt = false;
      while (j < toks.length && j <= i + 3 && !toks[j - 1].brot) {
        const t = tagar(toks[j].lav);
        const namn = erNamn(toks[j], tekst);
        if (!namn && !t) return;
        const verb = t && har(t, x => ordklasse(x) === "verb" && (trekk(x, "pret") || trekk(x, "pres")));
        const subjektord = namn || har(t, x => ["pron", "subst", "det"].includes(ordklasse(x)));
        if (verb && subjekt) {
          const pret = har(t, x => ordklasse(x) === "verb" && trekk(x, "pret"));
          const ikkjePret = har(t, x => ordklasse(x) === "verb" && (trekk(x, "pres") || trekk(x, "inf")));
          if (pret && !ikkjePret) {
            funn.push({
              type: "grammatikk",
              word: tok.ord, start: tok.start, end: tok.end,
              right: [tok.ord[0] === "N" ? "Då" : "då"],
              why: `Skjedde dette <strong>éin gong</strong> i fortida, heiter det <em class="nn">då</em>: `
                + `<em class="nn">Då vi kom fram, …</em> Skjedde det fleire gonger, er `
                + `<em class="nn">når</em> rett: <em class="nn">Når vi kom heim, var mor alltid glad.</em>`,
            });
          }
          return;
        }
        if (!subjektord) return;
        subjekt = true;
        j++;
      }
    });
  }

  function sjekk(tekst, tagar) {
    const toks = ordlista(tekst);
    const funn = [];
    kjonnPaArtikkel(toks, tekst, tagar, funn);
    samsvarEtterEit(toks, tekst, tagar, funn);
    naarMedPreteritum(toks, tekst, tagar, funn);
    return funn.sort((a, b) => a.start - b.start);
  }

  return { sjekk };
})();
