# Nynorskkurs for 9. trinn

Eit statisk nettsted som let elevar arbeide med nynorsk i sitt eige tempo.
Kurset er bygd på kompetansemåla i LK20 og følgjer gjeldande nynorskrettskriving
frå Språkrådet.

## Innhald

- **Del 1 — Språkhistorie og debatt** (4 modular): bakgrunn før 1850, Ivar Aasen, språkstriden og samnorsk, nynorsk i dag
- **Del 2 — Grammatikk og skriveregler** (5 modular): substantiv, verb, pronomen, adjektiv, vanlege fallgruver
- **Del 3 — Skriving og tekstarbeid** (3 modular): omsetjing, korte tekstar, lengre tekstar

## Funksjonalitet

- Ikkje-lineær progresjon — eleven vel sjølv modul
- Varierte oppgåvetypar: fleirvalg, fyll inn, omsetjing, dra-og-slepp/sortering, leseoppgåver, fritekst
- Automatisk fasit på objektive oppgåver
- Eigne tekstar blir lagra i `localStorage`
- Backup som JSON kan lastast ned og lastast opp att
- Heile sida er statisk — fungerer på GitHub Pages utan byggjesteg

## Køyre lokalt

Berre opne `index.html` i ein nettlesar. Eller, om du vil ha ein lokal server:

```
npx serve .
```

## Publisere på GitHub Pages

1. Lag eit nytt repo på GitHub og last opp filene i denne mappa (inkludert `index.html` i rota).
2. Gå til **Settings → Pages**, og vel kjelde: branch `main`, mappe `/ (root)`.
3. Etter eit minutt blir sida tilgjengeleg på `https://<brukarnamn>.github.io/<repo>/`.

## Filstruktur

```
/
├── index.html              Oversiktsside / dashbord
├── modul.html              Sida for kvar modul (?id=<modul-id>)
├── om.html                 Kort om kurset
├── css/style.css
├── js/
│   ├── storage.js          localStorage + eksport/import
│   ├── modules.js          Modulregister
│   ├── exercises.js        Oppgåvetypar (rendering + grading)
│   ├── app.js              Logikk for oversiktssida
│   ├── modul.js            Logikk for modulsida
│   └── content/
│       ├── part1.js        Innhald: språkhistorie
│       ├── part2.js        Innhald: grammatikk
│       └── part3.js        Innhald: skriving
└── README.md
```

## Leggje til eller endre innhald

Alt innhald ligg i `js/content/part*.js`. Kvar modul er eit objekt med ei liste
seksjonar — `lesson`, `exercise` eller `reading`. Sjå eksempel i `part1.js`.

### Oppgåvetypar

- `multipleChoice` — `options[]`, `correct` (index)
- `fillIn` — `items: [{prompt: "Eg ___ heim", accept: ["går"]}]`
- `translate` — `source`, `accept[]` (fleire tillatne svar)
- `matching` — `pairs: [[venstre, høgre]]`
- `categorize` — `categories: { "Namn": [ord, ord, …] }`
- `freeText` — `question`, `minWords`, `checklist[]` (ikkje automatisk retta)
- `reading` — `passage`, `questions[]` (kvar kan vere `multipleChoice` eller `freeShort`)
