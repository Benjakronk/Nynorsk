# Lærarsida

Lærarsida (`larer/index.html`) har ein presentasjon til tavleundervisning og ei
lærarrettleiing til kvar modul i kurset.

- `larer/presentasjon.html?id=<modul-id>`: presentasjonen. Lysbileta blir teikna
  på ei fast flate på 1024 × 576 punkt og skalerte til skjermen.
- `larer/rettleiing.html?id=<modul-id>`: rettleiinga, med manus til
  presentasjonen og ein fasit til elevmodulen som blir bygd automatisk frå
  oppgåvene.
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
| `oppgave` | `title`, `body`, `tid`, valfritt `del` | «Elevane arbeider»: går over til arbeid i modulen |
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
over to økter, byrjar økt 2 ved eit fasskifte etter 45 minutt, og fasane kan
heite «Økt 1: …» og «Økt 2: …». Validatoren sjekkar òg at samtaleklokkene
(`tid` på diskuter-lysbilete) og eigenarbeidet (`tid` på oppgåvelysbilete) får
plass i fasane som viser til lysbiletet.

## Språk

Alt er på nynorsk, i same form som resten av kurset (a-mål, `ikkje`, `eg`,
`kva`, `korleis`, `mellom anna`). Ingen tankestrek i brødteksten: bruk kolon,
komma eller ei ny setning. Tankestrek er berre lov i talrekkjer (1814–1905).
