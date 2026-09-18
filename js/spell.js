/* Nynorsk språksjekk for fritekstoppgåvene. To lag som utfyller kvarandre:

   1. Bokmålsvarsel. Byggjer på ordbanken i js/content/bank.js: dei registrerte
      bokmålsformene, pluss bøyingsformer som er systematisk feil på nynorsk
      (biler/bilene for bilar/bilane, boken for boka, kastet for kasta).
      Dette laget treng ingen nedlasting og går alltid.

   2. Ordliste. data/nn-ordliste.txt er 412 000 nynorske ordformer henta frå
      Norsk ordbank (nynorsk 2012) hjå Nasjonalbiblioteket. Ho blir lasta ned i
      bakgrunnen (sjå sw.js) og fangar vanlege skrivefeil. Ukjende ord blir
      først prøvde delte som samansetning, slik at skulebiblioteket, som ikkje
      står i lista, ikkje blir melt som feil.

   Bokmålsvarselet går først. Ordlista er ei formliste utan ordklasseskilje, og
   ein del bokmålsord har ein sjeldan nynorsk homograf (hun, boken), så lista
   kan ikkje avgjere kva som er bokmål. Det gjer ordbanken i kurset. */

const Spell = (() => {
  const LIST_URL = "data/nn-ordliste.txt";
  const ALPHA = "abcdefghijklmnopqrstuvwxyzæøåéèêóòôäëü";

  let words = null;          // Set med nynorske former, null til lista er lasta
  let loading = null;        // Promise medan lasting går føre seg
  let bokmal = null;         // Map: feilform → { right: [...], why }
  let correct = null;        // Alle rette nynorskformer i ordbanken

  /* Bokmålsformer som samtidig er vanlege, rette nynorskord. Ordbanken i
     bank.js parar dei med ei betre nynorskform (si → seie, skole → skule), men
     som einskildord i ein elevtekst er dei heilt i orden: «boka si», «eg sette
     meg», «læraren lærer oss», «bare føter». Difor blir dei aldri melde. */
  const TVITYDIGE = new Set([
    "si", "de", "bare", "sette", "lærer", "skole", "sitte", "ligge", "legge",
    "bo", "se", "løpe", "vann", "øre", "lav", "hel", "ren", "tykk", "holde",
    "bære", "følge", "spille", "regne", "huske", "telle", "tro", "begynne",
    "gren", "søster", "myk", "sen", "stue",
  ]);

  /* ---------- Lag 1: bokmålsformer frå ordbanken ---------- */

  function forms(value) {
    return (Array.isArray(value) ? value : [value])
      .flatMap(f => String(f || "").split("|"))
      .map(f => f.trim())
      .filter(Boolean);
  }

  // Bokmålsforma til eitt ord kan vere ei rett nynorskform av eit anna:
  // sette er bokmål for setje, men òg preteritum av setje. Slike slepp forbi.
  function buildCorrect() {
    const set = new Set();
    if (typeof Bank === "undefined") return set;
    const add = v => forms(v).forEach(f => set.add(f.toLowerCase()));
    (Bank.nouns || []).forEach(n => add(n.f));
    (Bank.verbs || []).forEach(v => { add(v.inf); add(v.f); });
    (Bank.adjectives || []).forEach(a => { add(a.w); add(Object.values(a.f || {})); });
    (Bank.words || []).forEach(w => add(w.nn));
    return set;
  }

  function addWrong(map, wrong, right, why) {
    if (!wrong || !right) return;
    const key = wrong.toLowerCase();
    if (correct.has(key) || TVITYDIGE.has(key)) return;
    const right_ = forms(right);
    if (!right_.length || right_.some(f => f.toLowerCase() === key)) return;
    const prev = map.get(key);
    if (prev) {
      right_.forEach(f => { if (!prev.right.includes(f)) prev.right.push(f); });
      if (!prev.why && why) prev.why = why;
      return;
    }
    map.set(key, { right: right_, why: why || "" });
  }

  function buildBokmal() {
    const map = new Map();
    correct = buildCorrect();
    if (typeof Bank === "undefined") return map;

    // Berre bm-feltet. wrong-lista er distraktorar for mengdetreninga, og fleire
    // av dei (so, gamal, sjøl) er fullgod nynorsk i ein elevtekst.
    (Bank.words || []).forEach(w => addWrong(map, w.bm, w.nn, w.why));

    (Bank.nouns || []).forEach(n => {
      const [sg, sgDef, pl, plDef] = n.f;
      addWrong(map, n.bm, sg);
      // Bøygde bokmålsformer av eit ord som heiter noko anna på nynorsk:
      // lærer → lærere, lærerne; skole → skoler, skolene
      if (n.bm) {
        const b = n.bm;
        const bmForms = b.endsWith("e") ? [b + "r", b + "n", b + "ne"]
          : b.endsWith("er") ? [b + "e", b + "ne", b + "en"]
            : [b + "er", b + "ene", b + "en"];
        bmForms.forEach(f => addWrong(map, f, [pl, plDef, sgDef], "Ordet heiter " + sg + " på nynorsk."));
      }
      // Hokjønn: bestemt eintal er -a, ikkje -en
      if (n.g === "f" && sgDef.endsWith("a")) {
        addWrong(map, sgDef.slice(0, -1) + "en", sgDef, "Hokjønnsord har bestemt form på -a på nynorsk.");
      }
      // Hankjønn: fleirtal er -ar/-ane, ikkje -er/-ene
      if (pl.endsWith("ar")) {
        addWrong(map, pl.slice(0, -2) + "er", pl, "Hankjønnsord har fleirtal på -ar og -ane på nynorsk.");
      }
      if (plDef.endsWith("ane")) {
        addWrong(map, plDef.slice(0, -3) + "ene", plDef, "Hankjønnsord har fleirtal på -ar og -ane på nynorsk.");
      }
    });

    (Bank.verbs || []).forEach(v => {
      const [pres, pret] = v.f;
      addWrong(map, v.bm, v.inf);
      // Bøygde bokmålsformer av eit verb som heiter noko anna på nynorsk:
      // spise → spiser, spiste, spist
      if (v.bm && v.bm.endsWith("e")) {
        const stem = v.bm.slice(0, -1);
        const why = "Verbet heiter " + v.inf + " på nynorsk.";
        // Ikkje stem + et: den forma kolliderer med bestemt form av inkjekjønn
        // (løpet, svaret), som er heilt rett nynorsk.
        [v.bm + "r", stem + "te", stem + "de", stem + "t"]
          .forEach(f => addWrong(map, f, [v.inf, pres, pret], why));
      }
      // A-verb: preteritum er -a, ikkje -et
      if (v.cls === "a" && pret.endsWith("a")) {
        addWrong(map, pret.slice(0, -1) + "et", pret,
          "A-verb får -a i preteritum på nynorsk, ikkje -et. Er ordet derimot eit "
          + "substantiv i bestemt form (eit " + pret.slice(0, -1) + " → " + pret.slice(0, -1) + "et), er alt i orden.");
      }
      // Presens av svake verb har ikkje -r på nynorsk
      if (v.cls !== "sterk" && v.cls !== "u" && !pres.endsWith("r")) {
        addWrong(map, pres + "r", pres, "Svake verb har ikkje -r i presens på nynorsk.");
      }
    });

    (Bank.adjectives || []).forEach(a => addWrong(map, a.bm, a.w));

    return map;
  }

  function bokmalMap() {
    if (!bokmal) bokmal = buildBokmal();
    return bokmal;
  }

  /* ---------- Lag 2: ordlista ---------- */

  // Registrerer service workeren, som hentar ordlista i bakgrunnen og held
  // henne i cache. Krev http(s): opnar du filene direkte frå disk, hoppar vi
  // over dette, og lista blir henta på vanleg vis når eleven treng henne.
  function registerWorker() {
    if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }

  // Set i gang nedlastinga utan å byggje oppslagstabellen. Brukt på oversikta,
  // der eleven ikkje skriv: då ligg lista klar når han opnar ein skrivemodul.
  function warm() {
    registerWorker();
    if (!("serviceWorker" in navigator) || location.protocol === "file:") {
      fetch(LIST_URL).catch(() => {});
    }
  }

  function load() {
    if (words) return Promise.resolve(words);
    if (loading) return loading;
    loading = fetch(LIST_URL)
      .then(res => {
        if (!res.ok) throw new Error("Fann ikkje ordlista (" + res.status + ")");
        return res.text();
      })
      .then(text => {
        const set = new Set();
        for (const line of text.split("\n")) {
          // trim: fila kan ha fått CRLF på vegen
          const word = line.trim();
          if (word) set.add(word);
        }
        words = set;
        loading = null;
        return words;
      })
      .catch(err => {
        loading = null;
        throw err;
      });
    return loading;
  }

  function isReady() { return words !== null; }

  function known(word) {
    return words.has(word);
  }

  // Samansetning: del ordet i to eller tre kjende delar. Fugelyden -s og -e er
  // med, og dobbel konsonant som fell bort i skrift (fotball + laget).
  function isCompound(word, depth) {
    const min = 4;
    const maxDepth = depth === undefined ? 2 : depth;
    if (word.length < min * 2) return false;
    for (let i = min; i <= word.length - min; i++) {
      const head = word.slice(0, i);
      const tail = word.slice(i);
      const heads = [head];
      if (head.endsWith("s") || head.endsWith("e")) heads.push(head.slice(0, -1));
      if (tail[0] === head[head.length - 1]) heads.push(head + tail[0]);
      if (!heads.some(known)) continue;
      if (known(tail)) return true;
      if (maxDepth > 1 && isCompound(tail, maxDepth - 1)) return true;
    }
    return false;
  }

  function accepted(word) {
    if (known(word)) return true;
    // Bindestrekord: kvar del for seg
    if (word.includes("-")) {
      const parts = word.split("-").filter(Boolean);
      if (parts.length > 1 && parts.every(p => known(p) || isCompound(p))) return true;
    }
    return isCompound(word);
  }

  // Alle strengar eitt teiknbyte unna ordet.
  function edits(word) {
    const out = [];
    for (let i = 0; i < word.length; i++) {
      out.push(word.slice(0, i) + word.slice(i + 1));
      if (i < word.length - 1) out.push(word.slice(0, i) + word[i + 1] + word[i] + word.slice(i + 2));
      for (const c of ALPHA) {
        out.push(word.slice(0, i) + c + word.slice(i + 1));
        out.push(word.slice(0, i) + c + word.slice(i));
      }
    }
    for (const c of ALPHA) out.push(word + c);
    return out;
  }

  // Forslag: alle ord i lista som er eitt teiknbyte unna. Lista inneheld ein
  // del bokmålsformer, så eit forslag som står i bokmålsvarselet blir bytt ut
  // med nynorskforma si.
  function suggest(word, max, deep) {
    const out = [];
    const bm = bokmalMap();
    const seen = new Set([word]);
    const push = cand => {
      if (seen.has(cand)) return;
      seen.add(cand);
      if (!words.has(cand)) return;
      const hit = bm.get(cand);
      if (hit) {
        hit.right.forEach(r => { if (!out.includes(r)) out.push(r); });
        return;
      }
      out.push(cand);
    };
    for (let i = 0; i < word.length; i++) {
      push(word.slice(0, i) + word.slice(i + 1));
      if (i < word.length - 1) {
        push(word.slice(0, i) + word[i + 1] + word[i] + word.slice(i + 2));
      }
      for (const c of ALPHA) {
        push(word.slice(0, i) + c + word.slice(i + 1));
        push(word.slice(0, i) + c + word.slice(i));
      }
    }
    for (const c of ALPHA) push(word + c);
    // Ingen treff eitt byte unna: prøv to for ord som er lange nok til at
    // to feil er sannsynleg (vansklig → vanskeleg).
    if (deep && !out.length && word.length >= 6) {
      for (const mellom of edits(word)) {
        for (const cand of edits(mellom)) push(cand);
        if (out.length >= (max || 3) * 3) break;
      }
    }
    // Ord eleven møter i kurset først, deretter dei som liknar mest på starten
    const felles = cand => {
      let i = 0;
      while (i < cand.length && i < word.length && cand[i] === word[i]) i++;
      return i;
    };
    out.sort((a, b) => (correct.has(b) - correct.has(a)) || (felles(b) - felles(a)));
    return out.slice(0, max || 3);
  }

  /* ---------- Sjekken ---------- */

  const TOKEN = /[a-zæøåéèêóòôäëüA-ZÆØÅÉÈÊÓÒÔÄËÜ]+(?:-[a-zæøåéèêóòôäëüA-ZÆØÅÉÈÊÓÒÔÄËÜ]+)*/g;

  // Returnerer { checkedList, findings: [{ word, start, end, type, right, why }] }
  // type er "bokmal" eller "ukjent". Ukjende ord kjem berre med når lista er lasta.
  function check(text) {
    const bm = bokmalMap();
    const findings = [];
    const seenUnknown = new Set();
    const seenBokmal = new Set();
    let m;
    TOKEN.lastIndex = 0;
    while ((m = TOKEN.exec(text)) !== null) {
      const raw = m[0];
      const word = raw.toLowerCase();
      const hit = bm.get(word);
      if (hit) {
        if (!seenBokmal.has(word)) {
          seenBokmal.add(word);
          findings.push({ word: raw, start: m.index, end: m.index + raw.length, type: "bokmal", right: hit.right, why: hit.why });
        }
        continue;
      }
      if (!words || word.length < 2) continue;
      // Eit ord med stor forbokstav midt i teksten er truleg eit namn
      if (raw[0] !== word[0] && m.index > 0 && !/[.!?]\s*$/.test(text.slice(0, m.index))) continue;
      if (accepted(word)) continue;
      if (seenUnknown.has(word)) continue;
      seenUnknown.add(word);
      // Det djupe søket tek ~0,2 sekund per ord, så det går berre på dei første
      // ukjende orda. Resten får forslag om dei er eitt teiknbyte unna.
      const right = suggest(word, 3, seenUnknown.size <= 5);
      findings.push({ word: raw, start: m.index, end: m.index + raw.length, type: "ukjent", right, why: "" });
    }
    return { checkedList: words !== null, findings };
  }

  return { warm, load, isReady, check, suggest, LIST_URL };
})();
