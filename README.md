# Nynorskkurs for ungdomsskulen

Eit statisk nettsted som let elevar arbeide med nynorsk i sitt eige tempo.
Kurset er bygd på kompetansemåla i LK20 og følgjer gjeldande nynorskrettskriving
frå Språkrådet.

## Innhald

- **Del 1: Språkhistorie og debatt** (7 modular): bakgrunn før 1850, Ivar Aasen, reisene til Ivar Aasen på eit 3D-kart, språkstriden og samnorsk, nynorsk i dag, skriveoppgåver, repetisjonstest
- **Del 2: Grammatikk og skrivereglar**, delt i tre grupper:
  - *Grunnomgrep* (4 modular): ordet (stamme, ending, rot), ordklassane, bøyingsomgrep, setningslære
  - *Ordklassar* (4 modular): substantiv, verb, pronomen, adjektiv
  - *Mengdetrening* (6 modular): drill-rundar med tilfeldige oppgåver frå ein ordbank, medrekna ei økt i setningslære (verbal, subjekt, ledd, heilsetning og leddsetning, ordstilling, predikativ)
- **Del 3: Ordbok og oppslag** (4 modular): dei tre ordbøkene og kva dei er laga for, finne oppslagsordet, lese ein ordbokartikkel, bruke ordboka mens du skriv
- **Del 4: Skriving og tekstarbeid**, delt i to grupper:
  - *Skriv tekstar* (3 modular): omsetjing, korte tekstar, lengre tekstar
  - *Typiske feil* (6 modular): skrivereglar, bokmålsord, bøyingsfeil, småord, setningsbygnad, rettelesing
- **Del 5: Lesing og tekstforståing** (11 modular): forfattarportrett, ni lesemodular med éin tekst kvar, og ein samanliknande modul til slutt. Modulane om Vinje, Garborg og Duun har i tillegg ein ekte tekst av forfattaren, i original staving med ordliste. Dei seks andre har ei oppgåve som sender eleven til Nettbiblioteket for å lese ei ekte bok

## Funksjonalitet

- Ikkje-lineær progresjon: eleven vel sjølv modul
- Varierte oppgåvetypar: fleirval, fyll inn, omsetjing, dra-og-slepp/sortering, leseoppgåver, fritekst
- Mengdetrening (`drill`): éi oppgåve om gongen, trekt tilfeldig frå ordbanken, umiddelbar tilbakemelding, «Øv på feila», beste runde blir lagra
- Finn feilen (`findError`): eleven klikkar på feil ord i ein tekst og skriv rett form
- Automatisk fasit på objektive oppgåver. Modular med `fasit: true` (Reisene til Ivar Aasen) viser òg rett svar under forklaringa når svaret er feil
- Eigne tekstar blir lagra i `localStorage`
- Språksjekk i skriveoppgåvene: bokmålsvarsel bygd på ordbanken i kurset, og skrivefeil mot ei nynorsk ordliste på 412 000 former, med tyding og direktelenkje til ordbokene.no for kvart forslag
- Reisene til Ivar Aasen (`aasen-reise.html`): modul med interaktiv forelesing på eit 3D-kart over Noreg, der eleven følgjer ein liten Aasen-figur langs ruta kapittel for kapittel, med stoppestader, datoar og oppgåver undervegs
- Bilete og små animerte figurar i modulane: portrett og historiske bilete frå Wikimedia Commons (`bilete/`, lisensar i `bilete/KJELDE.md`), tidslinje, «to liner»-diagram, ordbygg, dei fire formene, setningsledd, V2-demonstrasjon, kjønnskort og ein nummerert ordbokartikkel (`js/figurar.js` og «Figurar» i `css/style.css`)
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
├── aasen-reise.html        Reisene til Ivar Aasen: 3D-kart med forelesing
├── bilete/                 Portrett og historiske bilete (kjelder i bilete/KJELDE.md)
├── css/style.css
├── css/aasen-reise.css     Stil for kartsida
├── js/
│   ├── aasen-reise.js      3D-kartet: terreng, kamera, ruter, figuren og seksjonane
│   ├── vendor/three.min.js three.js r147 (MIT), einaste eksterne bibliotek
│   ├── storage.js          localStorage
│   ├── modules.js          Modulregister (med grupper for Del 2 og 4)
│   ├── exercises.js        Oppgåvetypar (rendering + grading)
│   ├── drills.js           Motor for mengdetrening (ordbank → oppgåver)
│   ├── spell.js            Språksjekk for skriveoppgåvene
│   ├── grammatikk.js       Grammatikksjekk: kjønn, samsvar, då/når
│   ├── ordbok.js           Oppslag i Nynorskordboka (ord.uib.no)
│   ├── app.js              Logikk for oversiktssida
│   ├── modul.js            Logikk for modulsida
│   ├── figurar.js          Figurar og små animasjonar i modulane
│   └── content/
│       ├── bank.js              Ordbankar for mengdetrening
│       ├── part1.js             Del 1: språkhistorie
│       ├── part2-omgrep.js      Del 2: grunnomgrep
│       ├── part2.js             Del 2: ordklassar
│       ├── part2-trening.js     Del 2: mengdetrening
│       ├── part3.js             Del 3: ordbokbruk
│       ├── part4.js             Del 4: skriv tekstar
│       ├── part4-feil.js        Del 4: typiske feil
│       ├── part4-rettelesing.js Del 4: rettelesing
│       ├── part5.js             Del 5: lesing
│       └── aasen-reise.js       Modulen «Reisene til Ivar Aasen»: stader, kapittel, oppgåver
├── data/
│   ├── nn-ordbank.txt      412 000 nynorske ordformer med morfologi (sjå data/KJELDE.md)
│   ├── noreg-terreng.js    Høgdekart over Noreg (PNG som base64) for 3D-kartet
│   ├── noreg-terreng-fin.png Same kartet med dobbel oppløysing, henta når sida er på nett
│   └── KJELDE.md           Kjelder, format og lisensar for datafilene
├── sw.js                   Service worker: cachar ordbanken og det fine høgdekartet
├── tools/
│   ├── validate-content.js Validerer alt innhald: node tools/validate-content.js
│   ├── lag-ordbank.js      Lagar ordbanken på nytt frå Norsk ordbank
│   ├── lag-terreng.js      Lagar høgdekartet på nytt frå opne terrengdata
│   └── test-grammatikk.js  Testar grammatikkreglane mot feil og kursprosa
└── README.md
```

## Reisene til Ivar Aasen

Modulen `historie-aasen-reise` i Del 1 blir vist på `aasen-reise.html`, ikkje
på `modul.html` (feltet `href` i modulen sender dit, og oversikta lenkjer rett
dit). Sida viser modulen éin seksjon om gongen ved sida av eit 3D-kart over
Noreg: 19 kapittel og 11 oppgåver. Kvart kapittel er ein `lesson`-seksjon med eit
`reise`-felt (tid, stopp med datoar, eventuelt `kamera: "land"`); ruta veks fram
på kartet medan ein liten figur av Aasen går langs henne, om lag 50 km i
sekundet, jamt frå første til siste stopp. Kameraet viser heile kapittelet,
og eleven snur og zoomar sjølv. Viktige stopp har ein liten stilisert modell (gard, by, kyrkje,
stabbur, båt, dampskip, fiskehjell og så vidare) som dukkar opp når figuren kjem
fram; kva stopp som får kva, står i feltet `scene` på staden, og modellane er
bygde av enkle primitiv i `SCENER` i `js/aasen-reise.js`. Modellane har fast
storleik på kartet (eit hus er om lag tre kilometer), medan figuren blir
skalert med zoomen så han alltid er synleg. Oppgåvene mellom kapitla er vanlege oppgåvetypar frå `js/exercises.js`,
og svara blir lagra som i resten av kurset, så modulen får framdrift og
«Fullført» på oversikta. Eleven blar med knappane eller piltastane, kan snu og
zoome kartet, stoppe figuren med mellomrom, hoppe til eit stopp ved å klikke på
det i lista, eller la forelesinga gå av seg sjølv (ho ventar ved oppgåvene til
eleven har svart).

Innhaldet ligg i `js/content/aasen-reise.js`: `stader` er stoppestadene med
koordinatar (frå stadnamnregisteret til Kartverket), og modulen registrerer seg
som dei andre, med `after: "historie-aasen"` for å hamne rett etter modulen om
Aasen i Del 1. Datoane kjem frå reisekarta i skriftserien til Ivar
Aasen-selskapet, slik dei er attgjevne på allmenning.no/reiser, og frå Ottar
Grepstads biografi på nynorsk.no. Stader som ikkje lét seg plassere sikkert, er
utelatne, og ruta er teikna som rette liner mellom stoppa. Pengesummar
(stipendet på 150 spesidalar og så vidare) er forklarte for eleven både som
kjøpekraft i dag, rekna om med konsumprisindeksen til Norges Bank og SSB, og
som årsløner den gongen (dreng, lærar, rektor). Tala og kjeldene står i
kommentaren øvst i innhaldsfila.

Kartet (`js/aasen-reise.js`) er bygd av høgdekartet i `data/noreg-terreng.js`,
1,25 km per piksel, i Lamberts konforme kjegleprojeksjon. Høgdene er
overdrivne 6,5 gonger for at fjordar og fjell skal synast frå lufta. Landet er
delt i bitar på 64 × 64 pikslar som blir bygde på tre detaljnivå etter kor nær
kameramålet dei er: grov, mellom og fin (det fine høgdelaget, når det er
lasta). Nivåa blir vurderte på nytt medan kameraet flyttar seg, med skjørt
langs kantane så det ikkje blir sprekker. Havet er eit eige flatt plan med
eigen shader: fargen går frå grunt til djupt etter havdjupet, det er ei lys
strandkant inn mot land og eit svakt solglimt frå låge bølgjer når ein er
nær. Landnettet held fram under havflata med havbotnen, så strandlinja er
snittet mellom plan og land, ikkje ein kant i nettet. Kysten og innsjøkantane
kjem frå avstandsfelt rekna av sjølve polygona i verktøyet (lagra i
høgdekartet), ikkje frå pikslane: nærmast kystlinja er høgda ei rett skråning
gjennom null, like bratt på begge sider, så strandlinja følgjer polygonkysten,
og dei næraste bitane blir bygde dobbelt så tett som pikslane med bikubisk
interpolasjon. Innsjøane får fargen sin etter avstanden til innsjøkanten. Difor
er strendene jamne kurver òg når ein zoomar tett inn. Fargane ligg i eit kartbilete som blir teikna éin gong ved
oppstart og lagt oppå terrenget som tekstur: høgdefargar, relieffskugge med lys
frå nordvest rekna av høgdekartet, hav med djupfargar, innsjøar og brear. Dei
store elvane og riksgrensa er vektorliner frå Natural Earth i datafila og blir
teikna som band oppå terrenget, med breidd som følgjer zoomen, så dei er
skarpe uansett kor nær ein kjem. Difor er detaljane per piksel, ikkje per hjørne i nettet. Er sida
på nett, hentar ho i tillegg `data/noreg-terreng-fin.png`, same kartet med
0,625 km per piksel (om lag 3 MB, cacha av `sw.js`), og teiknar kartbiletet
på nytt frå det. Opna frå disk står det innebygde kartet, for nettlesaren
kan ikkje lese pikslane i eit bilete frå `file:`.
Kystlinja følgjer landpolygona frå Natural Earth, ikkje høgdedataa, for
høgdedataa fyller att tronge sund som Drøbaksundet.
Høgdekartet er bakt inn som base64, og three.js ligg i `js/vendor`, så sida
verkar òg opna rett frå disk. Går teikninga tregt, held sida terrenget på dei
grovare nivåa. Kjelder og lisensar for terrengdata står i
`data/KJELDE.md`, og `node tools/lag-terreng.js` lagar høgdekartet på nytt.

## Språksjekk

`js/spell.js` sjekkar elevtekstane i to lag:

1. **Bokmålsvarsel** frå `js/content/bank.js`: dei registrerte bokmålsformene,
   pluss bøyingsformer som er systematisk feil (biler/bilene, boken, kastet).
   Treng ingen nedlasting.
2. **Ordliste** (`data/nn-ordbank.txt`): fangar skrivefeil. Ukjende ord blir
   prøvde delte som samansetning før dei blir melde, og forslag kjem frå ord
   som er eitt, eller for lengre ord to, teiknbyte unna. Forslaga blir sorterte
   etter kor likt ordet er det eleven skreiv, der starten av ordet tel dobbelt.
   To bonusar på toppen: ord som set tilbake ein diftong (*løse* → *løyse*), og
   ord eleven møter i kurset. Bokmålsformer fell ut av forslagslista, for eit
   forslag skal aldri vere bokmål.

### Grammatikksjekk

`js/grammatikk.js` bruker morfologien i `data/nn-ordbank.txt` til tre reglar:

1. **Kjønn på artikkelen**: *eit bok* → *ei bok*, *ein hus* → *eit hus*
2. **Samsvar etter «eit»**: *eit stor hus* → *eit stort hus*
3. **«når» om éi hending i fortida**: *Når vi kom fram* → *Då vi kom fram*

Kvar regel er skriven for å teie heller enn å gjette. 18 % av ordformene kan
tolkast på fleire måtar, så regelen held att når eit ord er ukjent, kan vere
eit namn, eller kan vere eit verbal, pronomen eller bindeord (*ein veit aldri*,
*ein låg der*, *i*, *då*). Regel 3 teier om setninga tyder på gjentaking
(*alltid*, *kvar gong*), er eit spørsmål, eller er eit indirekte spørsmål
(*eg veit ikkje når han kom*).

Målt ved innføringa: 14 av 14 konstruerte feil fanga, 0 av 20 korrekte
konstruerte setningar melde, og 0 falske alarmar i 15 000 ord kursprosa. Nye
reglar skal gjennom same testen før dei kjem inn: `node tools/test-grammatikk.js`.

Panelet viser eitt funn om gongen, med teljar og knappar for å bla, og ordet
blir markert i teksten. Markeringa ligg i eit lag bak skrivefeltet (`.ta-wrap`
og `.ta-overlay` i CSS-en), som må ha same skrift, innrykk og linjehøgd som
skrivefeltet for at orda skal hamne oppå kvarandre. Sjekken startar på
knappen, men heng deretter med i skrivinga: rettar eleven noko, blir funna
etter rettinga flytte med ein gong, så markeringa og teljaren stemmer, og funn
som låg der eleven skreiv, forsvinn. Litt etter går sjekken over teksten på
nytt i det stille og held fram der eleven var: står same ordet att omtrent
same staden, blei det ikkje retta, og eleven blir verande. Er ordet borte, går
panelet til det første funnet etter det. Ein ny gjennomgang er billig, for
`Spell.check` hugsar om eit ord er godkjent og kva forslag det fekk; det dyre
er forslaga til ukjende ord, og dei blir rekna ut éin gong per ord. Berre det
funnet som er på skjermen, slår opp tydingar. Sjekken finst i alle skrivefelt:
dei lengre tekstane, omsetjingane og dei korte svara i leseoppgåvene, og
knappen slår sjekken av att for feltet. Sjekken er berre aktiv for felta
eleven har slått han på i, og køyrer berre på det feltet eleven skriv i.

Bokmålsvarselet går først, for ordlista er ei rein formliste og har ein del
bokmålsord som homografar (*hun*, *boken*). Lista `TVITYDIGE` øvst i
`spell.js` held att varsel for ord som er gyldig nynorsk i ein annan
samanheng (*si*, *bare*, *sette*).

`sw.js` cachar berre ordlista og det fine høgdekartet, aldri kursfilene, slik
at ei oppdatering av kurset aldri kan bli ståande i cachen hjå eleven.

`js/ordbok.js` hentar ordklasse, grunnform og første tyding frå det opne API-et
til ordbokene.no (`ord.uib.no`), som svarar på tvers av domene. Lenkjene går til
grunnforma: `ordbokene.no/nno/nn/lærarane` gir null treff og ei side som berre
seier at ordet er ei bøygd form, mens `/nno/nn/lærar` gir artikkelen. Berre det første
forslaget per funn blir slege opp, høgst tolv per sjekk, og svara blir
mellomlagra. Har eit ord fleire artiklar, går funksjonsord (pronomen, adverb)
føre innhaldsord, for elles blir <em>eg</em> til substantivet «eg» (ego) og
<em>ho</em> til eit hodyr. Feilar oppslaget, står forslaget att utan tyding, og
lenkjene verkar framleis. Dette er den einaste staden kurset kontaktar ein
annan tenar.

## Leggje til eller endre innhald

Alt innhald ligg i `js/content/part*.js`. Kvar modul er eit objekt med ei liste
seksjonar: `lesson`, `exercise` eller `reading`. Sjå eksempel i `part1.js`.
Modular i Del 2 og 4 må ha eit `group`-felt (Del 2: `omgrep`, `ordklassar` eller `trening`; Del 4: `skriving` eller `feil`);
gruppene er definerte i `js/modules.js`. Nye innhaldsfiler må leggjast til som
`<script>` i `index.html` og `modul.html`.

Køyr `node tools/validate-content.js` etter endringar. Skriptet sjekkar skjema,
fasitar, drill-bankar, finn-feilen-tekstar og at bileta finst og har alt-tekst,
utan nettlesar.

### Figurar

Eit bilete i ein lesson er ein `<figure class="figur">` med `<img>` og
`<figcaption>`; klassen `portrett` legg det til høgre i teksten, `brei` over
heile breidda. Bilettekstane skal namngje opphavsperson og lisens. Dei små
figurane (`.tidslinje`, `.toliner`, `.ordbygg`, `.former`, `.leddsetning`,
`.v2demo`, `.kjonnkort`, `.ordartikkel`, `.ordklassar`, `.tempuslinje`,
`.vegvisar`, `.analyse`, `.setningsboksar`, `.daanaar`, `.vokalskifte`,
`.pronomenpar`) er rein HTML med klassar, styrte av `js/figurar.js`: dei glir inn når dei kjem til syne, `data-spel` startar ein
animasjon, og alt står i ro for elevar som har slått på redusert rørsle.

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
