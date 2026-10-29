# Lærarsida

Lærarsida (`larer/index.html`) har ein presentasjon til tavleundervisning og ei
lærarrettleiing til kvar modul i kurset, og ei vurderingsside til kvar del.

- `larer/presentasjon.html?id=<modul-id>`: presentasjonen. Lysbileta blir teikna
  på ei fast flate på 1024 × 576 punkt og skalerte til skjermen.
- `larer/rettleiing.html?id=<modul-id>`: rettleiinga, med manus til
  presentasjonen og ein fasit til elevmodulen som blir bygd automatisk frå
  oppgåvene.
- `larer/vurdering.html?del=<1 til 5>`: vurderingane til ein del, sjå
  «Vurdering» nedanfor.
- `larer/js/innhald/*.js`: innhaldet, éi fil per del eller gruppe.
- `larer/js/larar.js`: registeret og kompetansemåla (NOR01-08, etter 10. trinn,
  ordrett frå udir.no).

Alle sidene i `larer/` har `<base href="../">`, så alle stiar i innhaldet er
relative til rota av prosjektet: `bilete/aasen.jpg`, `modul.html?id=…`.

Sjekk innhaldet med `node tools/validate-larar.js` (eller
`node tools/validate-larar.js del3.js` for éi fil).

## Formatet

```js
Larar.register("modul-id", {
  tittelnotat: "Notat til framsida, som blir laga automatisk av tittelen og samandraget til modulen.",
  slides: [ /* lysbileta etter framsida */ ],
  guide: { /* rettleiinga */ },
});
```

### Lysbilete

Alle typar kan ha `title`, `kicker` (liten overskrift over tittelen),
`notes` (notat til læraren, vist i talarvindauget og i manuset), `steps`
(HTML-bitar som kjem fram éin om gongen for kvart trykk) og `svar` (vist til
slutt, i ein grøn boks merkt «Svar»).

| type | felt | bruk |
|---|---|---|
| `standard` (kan sløyfast) | `title`, `body` | vanleg lysbilete |
| `sporsmal` | `question`, `options` (2 til 5), `correct` (indeks), `explain` | fleirval på tavla. Første trykk viser rett svar og forklaringa |
| `diskuter` | `prompt`, `form` (t.d. «Snakk med sidemannen»), `tid` (minutt) | samtaleoppgåve, med knapp som startar ei nedteljing. Klokka blir stoppa med same knappen, med klikk på nedteljinga eller med Escape |
| `sitat` | `text`, `kjelde` | sitat eller tekstutdrag i stor skrift |
| `bilete` | `src`, `alt`, `caption`, valfritt `body` | bilete frå `bilete/`, med tekst ved sida om `body` er med |
| `oppgave` | `title`, `body`, `tid`, `utstyr`, valfritt `form` og `svar` | «Elevane arbeider»: oppgåver som står på tavla og blir gjorde i skriveboka. `utstyr` er ei liste med `skrivebok` (standard), `ordbok` (ordbok på nett) og `pc`. `form` er t.d. «Åleine» eller «I par». `svar` er fasiten, som kjem fram til slutt |
| `tekst` | `text`, valfritt `kjelde` | lang tekst, til dømes ein lesetekst, som blir vist side for side. Avsnitta er `<p>`, og kvart trykk blar ei side |
| `drill` | `spec`, `n`, `intro` | tavleøving med `n` oppgåver trekte frå ordbanken. `spec` er same spesifikasjon som ein drill-seksjon i modulane (`bank`, `set`, `tasks`, `filter`, `mode`). Første trykk viser svaret, neste trykk neste oppgåve |

Skal noko i sjølve innhaldet haldast att, som ein kolonne eller rader i ein
tabell, får elementa klassen `steg`. Dei kjem fram eitt og eitt i den
rekkjefølgja dei står, før `steps` og `svar`. Element med same `data-steg`
kjem fram på same trykk, til dømes to celler i same rad:
`<td class="steg" data-steg="r1">`. Notata skal aldri be læraren dekkje til
tavla. Validatoren melder feil om dei gjer det.

Hjelpeklassar i `body` og `steps`: `stor`, `kjempe`, `midt`, `liten`, `merk`,
`to-kol` og `tre-kol` (kolonnar), `boks` (kvit boks), `callout`. Tabellar og
`<em class="nn">`/`<em class="bm">` verkar som i kurset. Figurane frå
modulane (`leddsetning`, `analyse`, `v2demo`, `daanaar`, `setningsboksar`,
`tidslinje`, `toliner`, `ordbygg`, `former`, `kjonnkort`, `ordartikkel`,
`ordklassar`, `tempuslinje`, `vokalskifte`, `pronomenpar`, `vegvisar`, `figur`)
kan kopierast rett inn og blir skalerte opp på tavla.

Eit lysbilete skal kunne lesast frå bakerste rad: få ord, stor skrift, maks
fire til fem punkt. Det lange står i notata.

### Rettleiing

```js
guide: {
  tid: "Éi økt på 45 minutt",
  intro: "<p>Kva modulen handlar om, og kvifor.</p>",
  mal: ["Elevane kan …"],                 // 2 til 5 læringsmål
  lareplan: [11, 12],                     // nummer på kompetansemål (1 til 16), sjå larar.js
  forkunnskapar: "…",
  forebuing: ["…"],
  okt: [{ fase: "Oppstart", min: 5, gjer: "<p>…</p>", lysbilete: "2 til 4" }],
  misoppfatningar: [{ feil: "«…»", hjelp: "…" }],
  samtale: ["…"],
  tilpassing: { stotte: ["…"], utfordring: ["…"] },
  vurdering: ["…"],
  vidare: "…",
}
```

Lysbilete blir nummererte frå 1, og framsida er nummer 1.

Skuletimane er på 45 minutt. `tid` er «Éi økt på 45 minutt» eller «To økter
på 45 minutt», og fasane i `okt` summerer til 45 minutt per økt. Går modulen
over to økter, byrjar økt 2 ved eit faseskifte etter 45 minutt, og fasane kan
heite «Økt 1: …» og «Økt 2: …». Validatoren sjekkar òg at samtaleklokkene
(`tid` på diskuter-lysbilete) og eigenarbeidet (`tid` på oppgåvelysbilete) får
plass i fasane som viser til lysbiletet.

## Tavlegjennomgangen skal kunne køyrast åleine

Elevane skal ikkje trenge PC eller elevmodulen for å følgje presentasjonen.
Alt dei skal arbeide med, står på tavla: oppgåvene på oppgåvelysbileta,
lesetekstane på tekstlysbilete og fasiten i `svar`. Dei skriv i
skriveboka. Ordbok på nett eller PC blir brukt berre når oppgåva krev det,
og då står det i `utstyr`. Elevmodulen kan nemnast i `guide.vidare` eller i
notata som lekse eller vidare arbeid, men lysbileta og planen for økta skal
ikkje sende elevane dit. Validatoren sjekkar dette.

## Vurdering

Kvar del har ei vurderingsside, `larer/vurdering.html?del=<1 til 5>`, med
lenkje frå oversikta og frå rettleiinga til kvar modul. Sida har:

- **Kjenneteikn på måloppnåing** for delen, på tre nivå (låg, middels og høg).
  Formuleringane byggjer på kjenneteikna til Utdanningsdirektoratet for norsk
  etter 10. trinn, med eigne rader for ordbøying, ordforråd, rettskriving og
  teiknsetjing på sidemålet.
- **Sluttvurdering**: prøver og oppgåver med elevark, fasit, eventuelle poeng
  og vurderingsskjema. `karaktergrunnlag` seier om vurderinga kan inngå i
  grunnlaget for karakter.
- **Undervegsvurdering** til kvar modul i delen: ei kort oppgåve til slutten
  av økta, med fasit, kva læraren ser etter og forslag til framovermelding.
- **Eigenvurdering**: eit skjema eleven fyller ut.

Elevarka, fasitane og eigenvurderinga kan skrivast ut kvar for seg med
knappane på sida. Innhaldet ligg i `larer/js/vurdering/del1.js` til `del5.js`,
registeret i `larer/js/vurdering.js` og sida i `larer/js/vurderingsside.js`.
Sjekk med `node tools/validate-vurdering.js` (eller `… del2.js` for éi fil).

```js
Vurdering.register(2, {
  intro: "<p>…</p>",
  lareplan: [11, 12],                      // kompetansemål (1 til 16)
  kompetanse: "<p>Kva eleven skal vise etter delen.</p>",
  kjenneteikn: [{ omrade: "Ordbøying på sidemålet", lag: "…", middels: "…", hog: "…" }],
  provar: [{
    id: "skriftleg-prove", tittel: "…",
    type: "skriftleg",                     // skriftleg | skriving | munnleg | praktisk
    tid: "60 minutt", form: "Individuelt", hjelpemiddel: "…",
    karaktergrunnlag: true,
    lareplan: [11, 12], modular: ["grammatikk-verb"],
    lararinfo: "<p>…</p>", elevark: "<h4>…</h4>…", fasit: "…",
    poeng: { maks: 60, lag: "18 til 32 poeng", middels: "…", hog: "…" },  // valfritt
    skjema: [{ omrade: "…", lag: "…", middels: "…", hog: "…" }],
  }],
  undervegs: {                             // éi til kvar modul i delen
    "grammatikk-verb": { tittel: "Exit-lapp", tid: 10, form: "Åleine",
      oppgave: "…", fasit: "…", sjaa: ["…", "…"], framover: "…" },
  },
  eigenvurdering: ["bøye sterke verb i preteritum", "…"],   // utan «Eg kan»
});
```

I elevarket gir `<div class="skrivelinjer"></div>` ei skrivelinje. Validatoren
krev undervegsvurdering til alle modulane i delen og åtvarar mot tankestrek i
prosa.

## Språk

Alt er på nynorsk, i same form som resten av kurset (e-infinitiv, `ikkje`, `eg`,
`kva`, `korleis`, `mellom anna`). Ingen tankestrek i brødteksten: bruk kolon,
komma eller ei ny setning. Tankestrek er berre lov i talrekkjer (1814–1905) og i ordrette tekstar og sitat (`text` på tekst- og sitatlysbilete).
