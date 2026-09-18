# Nynorskkurs for ungdomsskulen

Eit statisk nettsted som let elevar arbeide med nynorsk i sitt eige tempo.
Kurset er bygd på kompetansemåla i LK20 og følgjer gjeldande nynorskrettskriving
frå Språkrådet.

## Innhald

- **Del 1: Språkhistorie og debatt** (6 modular): bakgrunn før 1850, Ivar Aasen, språkstriden og samnorsk, nynorsk i dag, skriveoppgåver, repetisjonstest
- **Del 2: Grammatikk og skrivereglar**, delt i tre grupper:
  - *Grunnomgrep* (4 modular): ordet (stamme, ending, rot), ordklassane, bøyingsomgrep, setningslære
  - *Ordklassar* (4 modular): substantiv, verb, pronomen, adjektiv
  - *Mengdetrening* (5 modular): drill-rundar med tilfeldige oppgåver frå ein ordbank
- **Del 3: Skriving og tekstarbeid**, delt i to grupper:
  - *Skriv tekstar* (3 modular): omsetjing, korte tekstar, lengre tekstar
  - *Typiske feil* (6 modular): skrivereglar, bokmålsord, bøyingsfeil, småord, setningsbygnad, rettelesing
- **Del 4: Lesing og tekstforståing** (11 modular): forfattarportrett, ni lesemodular med éin tekst kvar, og ein samanliknande modul til slutt. Modulane om Vinje, Garborg og Duun har i tillegg ein ekte tekst av forfattaren, i original staving med ordliste. Dei seks andre har ei oppgåve som sender eleven til Nettbiblioteket for å lese ei ekte bok

## Funksjonalitet

- Ikkje-lineær progresjon: eleven vel sjølv modul
- Varierte oppgåvetypar: fleirval, fyll inn, omsetjing, dra-og-slepp/sortering, leseoppgåver, fritekst
- Mengdetrening (`drill`): éi oppgåve om gongen, trekt tilfeldig frå ordbanken, umiddelbar tilbakemelding, «Øv på feila», beste runde blir lagra
- Finn feilen (`findError`): eleven klikkar på feil ord i ein tekst og skriv rett form
- Automatisk fasit på objektive oppgåver
- Eigne tekstar blir lagra i `localStorage`
- Språksjekk i skriveoppgåvene: bokmålsvarsel bygd på ordbanken i kurset, og skrivefeil mot ei nynorsk ordliste på 412 000 former
- Heile sida er statisk og fungerer på GitHub Pages utan byggjesteg

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
│   ├── storage.js          localStorage
│   ├── modules.js          Modulregister (med grupper for Del 2 og 3)
│   ├── exercises.js        Oppgåvetypar (rendering + grading)
│   ├── drills.js           Motor for mengdetrening (ordbank → oppgåver)
│   ├── spell.js            Språksjekk for skriveoppgåvene
│   ├── app.js              Logikk for oversiktssida
│   ├── modul.js            Logikk for modulsida
│   └── content/
│       ├── bank.js              Ordbankar for mengdetrening
│       ├── part1.js             Del 1: språkhistorie
│       ├── part2-omgrep.js      Del 2: grunnomgrep
│       ├── part2.js             Del 2: ordklassar
│       ├── part2-trening.js     Del 2: mengdetrening
│       ├── part3.js             Del 3: skriv tekstar
│       ├── part3-feil.js        Del 3: typiske feil
│       ├── part3-rettelesing.js Del 3: rettelesing
│       └── part4.js             Del 4: lesing
├── data/
│   ├── nn-ordliste.txt     412 000 nynorske ordformer (sjå data/KJELDE.md)
│   └── KJELDE.md           Kjelde og CC BY 4.0-lisens for ordlista
├── sw.js                   Service worker: cachar berre ordlista
├── tools/
│   ├── validate-content.js Validerer alt innhald: node tools/validate-content.js
│   └── lag-ordliste.js     Lagar ordlista på nytt frå Norsk ordbank
└── README.md
```

## Språksjekk

`js/spell.js` sjekkar elevtekstane i to lag:

1. **Bokmålsvarsel** frå `js/content/bank.js`: dei registrerte bokmålsformene,
   pluss bøyingsformer som er systematisk feil (biler/bilene, boken, kastet).
   Treng ingen nedlasting.
2. **Ordliste** (`data/nn-ordliste.txt`): fangar skrivefeil. Ukjende ord blir
   prøvde delte som samansetning før dei blir melde, og forslag kjem frå ord
   som er eitt, eller for lengre ord to, teiknbyte unna.

Bokmålsvarselet går først, for ordlista er ei rein formliste og har ein del
bokmålsord som homografar (*hun*, *boken*). Lista `TVITYDIGE` øvst i
`spell.js` held att varsel for ord som er gyldig nynorsk i ein annan
samanheng (*si*, *bare*, *sette*).

`sw.js` cachar berre ordlista, aldri kursfilene, slik at ei oppdatering av
kurset aldri kan bli ståande i cachen hjå eleven.

## Leggje til eller endre innhald

Alt innhald ligg i `js/content/part*.js`. Kvar modul er eit objekt med ei liste
seksjonar: `lesson`, `exercise` eller `reading`. Sjå eksempel i `part1.js`.
Modular i Del 2 og 3 må ha eit `group`-felt (Del 2: `omgrep`, `ordklassar` eller `trening`; Del 3: `skriving` eller `feil`);
gruppene er definerte i `js/modules.js`. Nye innhaldsfiler må leggjast til som
`<script>` i `index.html` og `modul.html`.

Køyr `node tools/validate-content.js` etter endringar. Skriptet sjekkar skjema,
fasitar, drill-bankar og finn-feilen-tekstar utan nettlesar.

### Mengdetrening (`drill`)

```js
{ type: "exercise", exerciseType: "drill",
  title: "Bestemt form eintal", intro: "Skriv ordet i bestemt form.",
  bank: "nouns",                 // nouns | verbs | adjectives | words | sentences
  tasks: ["defSg"],              // sjå generatorane øvst i js/drills.js
  filter: { g: ["f"] },          // valfritt: berre hokjønnsord
  perRound: 10, mode: "type" }   // type | choice | mixed
```

Orda ligg i `js/content/bank.js`. Jamstilte former skriv du med `|`: `"gav|ga"`.

### Finn feilen (`findError`)

```js
{ type: "exercise", exerciseType: "findError",
  question: "Finn og rett feila. Det er <strong>2 feil</strong>.",
  text: "Jenten kastet ballen.",             // rein tekst
  errors: [ { token: "Jenten", accept: ["Jenta"] },
            { token: "kastet", accept: ["kasta"] } ],   // nth: 2 om ordet står fleire gonger
  explanation: "Hokjønn får -a; a-verb får -a i preteritum." }
```

### Oppgåvetypar

- `multipleChoice`: `options[]`, `correct` (index)
- `fillIn`: `items: [{prompt: "Eg ___ heim", accept: ["går"]}]`
- `translate`: `source`, `accept[]` (fleire tillatne svar)
- `matching`: `pairs: [[venstre, høgre]]`
- `categorize`: `categories: { "Namn": [ord, ord, …] }`
- `freeText`: `question`, `minWords`, `checklist[]` (ikkje automatisk retta)
- `reading`: `passage`, `questions[]` (kvar kan vere `multipleChoice` eller `freeShort`)
