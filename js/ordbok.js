/* Oppslag i Nynorskordboka for språksjekken.

   ordbokene.no har eit ope API (ord.uib.no) som svarar på tvers av domene, så
   vi kan hente tydinga til eit ord rett frå nettlesaren til eleven. To kall:

     /api/articles?w=<ord>&dict=nn   → id-ane til artiklane om ordet
     /nn/article/<id>.json           → sjølve artikkelen

   Innhaldet kjem frå Nynorskordboka, utgjeven av Språkrådet og Universitetet i
   Bergen. Vi viser berre den første tydinga og lenkjer vidare til artikkelen.

   Oppslaget er det einaste i heile kurset som snakkar med ein annan tenar. Det
   skjer først når eleven har bedt om ein språksjekk, og det er berre sjølve
   ordet som blir sendt. Slår det feil, til dømes utan nett, viser vi lenkjene
   og ikkje noko feilmelding. */

const Ordbok = (() => {
  const API = "https://ord.uib.no";
  const cache = new Map();

  // Ord eleven kan klikke seg vidare til. Lexin lagrar søkjeordet lokalt i
  // staden for i adressa, så der kan vi berre lenkje til framsida.
  function artikkelUrl(word, dict) {
    return "https://ordbokene.no/nno/" + (dict === "bm" ? "bm" : "nn") + "/" + encodeURIComponent(word);
  }
  function lexinUrl() {
    return "https://lexin.oslomet.no/";
  }

  const ORDKLASSE = {
    NOUN: "substantiv", VERB: "verb", ADJ: "adjektiv", ADV: "adverb",
    PRON: "pronomen", DET: "determinativ", PREP: "preposisjon",
    CCONJ: "konjunksjon", SCONJ: "subjunksjon", INTJ: "interjeksjon",
  };
  const KJONN = { Masc: "hankjønn", Fem: "hokjønn", Neuter: "inkjekjønn" };

  function ordklasse(article) {
    const lemma = (article.lemmas || [])[0];
    const tags = ((lemma && lemma.paradigm_info) || []).flatMap(p => p.tags || []);
    const klasse = tags.map(t => ORDKLASSE[t]).find(Boolean);
    const kjonn = tags.map(t => KJONN[t]).find(Boolean);
    return [klasse, kjonn].filter(Boolean).join(" ");
  }

  // Teksten i artikkelen har $ der eit oppslagsord, ei forkorting eller eit
  // døme skal setjast inn. items kjem i same rekkjefølgje som dollarteikna.
  function fyllInn(node) {
    const items = node.items || [];
    let i = 0;
    return String(node.content || "").replace(/\$/g, () => {
      const item = items[i++];
      if (!item) return "";
      if (item.lemmas && item.lemmas.length) return item.lemmas[0].lemma;
      if (item.text) return item.text;
      if (item.id) return String(item.id);
      return "";
    }).replace(/\s+/g, " ").trim();
  }

  // Første tyding: forklaringa om ho finst, elles orda artikkelen viser til.
  function forsteTyding(article) {
    const tekstar = [];
    const tilvisingar = [];

    (function gaGjennom(nodes) {
      for (const node of nodes || []) {
        if (tekstar.length) return;
        if (node.type_ === "definition") gaGjennom(node.elements);
        else if (node.type_ === "explanation") {
          const tekst = fyllInn(node);
          if (!tekst) continue;
          // «$» åleine er ei rein tilvising til eit anna oppslagsord
          if (String(node.content || "").trim() === "$") tilvisingar.push(tekst);
          else tekstar.push(tekst);
        }
      }
    })((article.body || {}).definitions);

    if (tekstar.length) return tekstar[0];
    if (tilvisingar.length) return "same som " + tilvisingar.slice(0, 3).join(", ");
    return "";
  }

  // Eit ord kan ha fleire artiklar: eg er både pronomen og substantivet «eg»
  // (ego), ho er både pronomen og eit hodyr. Eleven meiner nesten alltid
  // småordet, så funksjonsorda går føre innhaldsorda.
  const PRIORITET = ["PRON", "DET", "ADV", "CCONJ", "SCONJ", "PREP", "INTJ", "VERB", "ADJ", "NOUN"];

  function rangering(article) {
    const tags = ((article.lemmas || [])[0] || {}).paradigm_info || [];
    const alle = tags.flatMap(p => p.tags || []);
    const plass = alle.map(t => PRIORITET.indexOf(t)).filter(i => i >= 0);
    return plass.length ? Math.min(...plass) : PRIORITET.length;
  }

  function hentArtikkel(id, dict) {
    return fetch(API + "/" + dict + "/article/" + id + ".json")
      .then(res => (res.ok ? res.json() : Promise.reject(new Error("HTTP " + res.status))));
  }

  // Returnerer { word, lemma, tyding, ordklasse, url } eller null om ordet ikkje
  // finst. Feilar oppslaget, blir det null, og den som kallar viser berre ordet.
  // dict er "nn" (standard) eller "bm".
  function lookup(word, dict) {
    const ordbok = dict === "bm" ? "bm" : "nn";
    const key = ordbok + ":" + word.toLowerCase();
    if (cache.has(key)) return Promise.resolve(cache.get(key));

    const svar = fetch(API + "/api/articles?w=" + encodeURIComponent(word.toLowerCase()) + "&dict=" + ordbok)
      .then(res => (res.ok ? res.json() : Promise.reject(new Error("HTTP " + res.status))))
      .then(data => {
        const ids = ((data.articles || {}).nn || data.articles[ordbok]) || [];
        if (!ids.length) return null;
        return Promise.all(ids.slice(0, 3).map(id => hentArtikkel(id, ordbok))).then(artiklar => {
          const beste = artiklar.slice().sort((a, b) => rangering(a) - rangering(b))[0];
          // Grunnforma, så lenkja går til artikkelen og ikkje til ei side som
          // berre seier at lærarane er ei bøygd form av lærar.
          const lemma = ((beste.lemmas || [])[0] || {}).lemma || word.toLowerCase();
          return {
            word: word.toLowerCase(),
            lemma,
            tyding: forsteTyding(beste),
            ordklasse: ordklasse(beste),
            url: artikkelUrl(lemma, ordbok),
          };
        });
      })
      .catch(() => null)
      .then(resultat => {
        cache.set(key, resultat);
        return resultat;
      });

    cache.set(key, svar);      // hindrar dobbeltoppslag mens vi ventar
    return svar;
  }

  return { lookup, artikkelUrl, lexinUrl };
})();
