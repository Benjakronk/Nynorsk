/* Lærarsida: register for presentasjonar og lærarrettleiingar.

   Kvar innhaldsfil i larer/js/innhald/ kallar Larar.register(modulId, { guide, slides })
   éin gong per modul i kurset. Formatet er skildra i larer/README.md.

   Kompetansemåla er ordrett frå læreplanen i norsk (NOR01-08), etter 10. trinn,
   nynorsk utgåve. Rettleiingane viser til dei med nummer (1 til 16). */

const Larar = (() => {
  const data = {};

  function register(id, entry) {
    if (data[id]) throw new Error(`Lærarinnhald for «${id}» er registrert to gonger`);
    data[id] = entry;
  }
  function get(id) { return data[id] || null; }
  function ids() { return Object.keys(data); }

  const LAREPLAN = {
    kode: "NOR01-08",
    namn: "Læreplan i norsk (NOR01-08), kompetansemål etter 10. trinn",
    url: "https://www.udir.no/lk20/nor01-08/kompetansemaal-og-vurdering/kv1110?lang=nno",
    mal: [
      null,
      "lese skjønnlitteratur og sakprosa på bokmål og nynorsk og i omsetjing frå samiske og andre språk, og reflektere over formål, innhald, sjangertrekk og verkemiddel i tekstane",
      "samanlikne og tolke romanar, noveller, lyrikk og andre tekstar ut frå historisk kontekst og eiga samtid",
      "beskrive og reflektere over eigen bruk av lesestrategiar i lesing av skjønnlitteratur og sakprosa",
      "lytte til og lese tekstar på svensk og dansk og gjere greie for innhald og språklege trekk",
      "utforske og reflektere over korleis tekstar framstiller livssituasjonen til unge",
      "kjenne att og bruke språklege verkemiddel og retoriske appellformer",
      "bruke kjelder på ein kritisk måte, markere sitat og vise til kjelder på ein etterretteleg måte i eigne tekstar",
      "utforske og vurdere korleis digitale medium påverkar og endrar språk og kommunikasjon",
      "bruke fagspråk og argumentere sakleg i diskusjonar, samtalar, munnlege presentasjonar og skriftlege framstillingar om norskfaglege og tverrfaglege tema",
      "informere, fortelje, argumentere og reflektere i ulike munnlege og skriftlege sjangrar og for ulike formål tilpassa mottakar og medium",
      "skrive tekstar med funksjonell tekstbinding og riktig teiknsetjing og meistre rettskriving og ordbøying på hovudmål og sidemål",
      "bruke fagspråk og kunnskap om grammatikk, tekststruktur og sjanger i samtale om og vidare arbeid med tekstar",
      "uttrykkje seg i ulike sjangrar og eksperimentere med sjangrar på kreative måtar",
      "lage samansette tekstar og grunngi val av uttrykksformer",
      "forklare den historiske bakgrunnen for bokmål og nynorsk og reflektere over statusen til dei offisielle språka i Noreg i dag",
      "utforske språkleg variasjon og mangfald i Noreg og reflektere over haldningar til ulike språk og talespråkvariantar",
    ],
  };

  const DELAR = ["", "Del 1 · Språkhistorie", "Del 2 · Grammatikk", "Del 3 · Ordbok", "Del 4 · Skriving", "Del 5 · Lesing"];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, c => (
      { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
    ));
  }

  // Lenkje til elevmodulen, relativ til rota (lærarsidene har <base href="../">).
  function modulLenkje(m) { return m.href || `modul.html?id=${encodeURIComponent(m.id)}`; }

  function kicker(m) {
    const g = typeof Modules !== "undefined" ? Modules.groupOf(m) : null;
    return g ? `${DELAR[m.part]} · ${g.title}` : DELAR[m.part];
  }

  // Alle modulane i kursrekkjefølgje.
  function modular() {
    const ut = [];
    for (let p = 1; p <= 5; p++) ut.push(...Modules.orderedByPart(p));
    return ut;
  }

  /* Fasit til elevmodulen, bygd automatisk frå oppgåvene. Gir ei liste med
     { tittel, type, html } for kvar oppgåve som har eit fasitsvar. */
  const TYPENAMN = {
    multipleChoice: "Fleirval", fillIn: "Fyll inn", categorize: "Sortering", matching: "Para saman",
    translate: "Omsetjing", freeText: "Skriveoppgåve", drill: "Mengdetrening", findError: "Finn feilen",
    reading: "Leseoppgåve", freeShort: "Kort svar",
  };
  function fasit(m) {
    const ut = [];
    let nr = 0;
    const svarliste = arr => arr.map(a => `<em class="nn">${esc(a)}</em>`).join(" / ");
    const eitt = (s, type) => {
      switch (type) {
        case "multipleChoice":
          return `<p>${s.question}</p><p class="fasit-svar">${s.options[s.correct]}</p>`;
        case "fillIn":
          return `<p>${s.question || ""}</p><ol>${s.items.map(it => `<li>${esc(it.prompt).replace("___", `<b>${svarliste([].concat(it.accept).slice(0, 2))}</b>`)}</li>`).join("")}</ol>`;
        case "categorize":
          return `<p>${s.question}</p><ul>${Object.entries(s.categories).map(([k, v]) => `<li><b>${esc(k)}:</b> ${v.map(esc).join(", ")}</li>`).join("")}</ul>`;
        case "matching":
          return `<p>${s.question}</p><ul>${s.pairs.map(([a, b]) => `<li>${a} → ${b}</li>`).join("")}</ul>`;
        case "translate":
          return `<p>${s.question}</p><p><span class="bm">${esc(s.source)}</span></p><p class="fasit-svar">${esc([].concat(s.accept)[0])}</p>`;
        case "findError":
          return `<p>${esc(s.text)}</p><ul>${s.errors.map(e => `<li><span class="bm">${esc(e.token)}</span> → <em class="nn">${esc([].concat(e.accept)[0])}</em></li>`).join("")}</ul>`;
        case "freeShort":
          return `<p>${s.question}</p>${s.modelAnswer ? `<p class="fasit-svar">${s.modelAnswer}</p>` : ""}`;
        default: return null;
      }
    };
    for (const s of m.sections) {
      if (s.type === "exercise") {
        nr++;
        const html = eitt(s, s.exerciseType);
        if (html) ut.push({ nr, tittel: s.title || "", type: TYPENAMN[s.exerciseType] || s.exerciseType, html, forklaring: s.explanation || "" });
      } else if (s.type === "reading") {
        nr++;
        const delar = (s.questions || []).map((q, i) => {
          const h = eitt(q, q.type);
          return h ? `<div class="fasit-del"><span class="fasit-nr">${i + 1}</span>${h}</div>` : "";
        }).join("");
        if (delar) ut.push({ nr, tittel: s.title || "", type: "Leseoppgåve", html: delar, forklaring: "" });
      }
    }
    return ut;
  }

  function oppgaveTal(m) {
    const t = {};
    for (const s of m.sections) {
      if (s.type === "lesson") continue;
      const k = s.type === "exercise" ? s.exerciseType : s.type;
      t[k] = (t[k] || 0) + 1;
    }
    return Object.entries(t).map(([k, n]) => `${TYPENAMN[k] || k} ×${n}`);
  }

  return { register, get, ids, LAREPLAN, DELAR, esc, modulLenkje, kicker, modular, fasit, oppgaveTal, TYPENAMN };
})();

if (typeof module !== "undefined" && module.exports) module.exports = Larar;
