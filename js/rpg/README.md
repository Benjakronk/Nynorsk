# Aasen: Språkvandringa, prototypen

Denne mappa held rollespelet i `spel.html`. Alt arbeidet til no er **prototypearbeid**. Historia og designet står i designdokumentet «Aasen-spelet: scenario og design» (Claude Docs), som er kjelda for kva spelet skal bli.

| Fil | Innhald |
|---|---|
| `data.js` | ord, figurar, kart, fiendar, scener og manus |
| `motor.js` | feltmotoren: kart, rørsle, folk, dører, samtalar, toning og regi |
| `spel.js` | tilstand og lagring, manuskøyring, meny, kamp-oppstart, verdskart |
| `kamp.js` | kampsystemet |
| `stev.js` | stev (prøve) |
| `pikslar.js` | grafikk, fliser, figurar, eld og røyk |

## Prototypen og designdokumentet

### Rolla til prototypen
Prototypen beheld sitt eige scenario: Ørsta 1826, den framande, haugbonden og blekklatten. Han er ein **testarena**, der grunnsystema blir bygde og prøvde i ein enkel setting før dei blir tekne i bruk i den nye historia.

Historia i designdokumentet blir ikkje bygd inn i prototypen enno. Ho kjem når systema ho treng, er ferdige og prøvde. Prologen på snøfjellet viser heile kampsystemet med full kraft, og han kan difor berre lagast til sist. Final Fantasy VI vart heller ikkje laga i den rekkjefølgja spelaren møter det.

### Kva designet krev av grunnsystema
Manus del 1 (prologen og første akt, 31 scener) tek i bruk nesten alle systema:

| System | Kva designet treng | Status |
|---|---|---|
| Scenemotor | stad og tid, figurar som går, kamera, nærbilete, mellomsekvensar, val som blir hugsa, trådar, Dagboka | **byrja, sjå under** |
| Kampmeny per figur | Påkall, Fortelje, Gamle ord, Samle, Flykt | ventar på designet |
| Statuseffektar og eigenskapar | Skam (galdr kostar dobbelt og verkar halvt), Einsleg, Mot til å skrive, rettskriven | ventar på designet |
| Lytting | halde inne ein knapp, ord stig opp som teikn som blir fanga, også i mengd | ventar på designet |
| Ordboka | «Sagt av», stad og år, vesen, ord som bleiknar når dei blir trykte | delvis (former og kjelder finst) |
| Lydtreet | grammatikk som byggjespel, reglar blir greiner | ventar på designet |
| Rotrekonstruksjon | tre former og ei eldre kjelde gir ei sterkare rotform | ventar på designet |
| Runer | rissing, kvilerune som lagringspunkt, straff for feil rune | ventar på designet |
| Påkalling og binding | bundne eventyr som utstyr, vesen som blir dregne inn i papiret | ventar på designet |
| Parti og tidshopp | figurar som kjem og går, same stad i ulike år, Ivar i fleire aldrar | delvis (partiUt finst) |
| Minispel | overhøyring, typesetjing, skriving ord for ord, takt | ventar på designet |

Kampmekanikken og dei andre spelsystema blir utvikla vidare i designdokumentet før vi byggjer dei. Då slepp vi store omskrivingar av koden om noko viser seg å ikkje fungere.

### Kva i prototypen som skil seg frå designet
- **Den framande:** i designet er antagonisten Munch, og han er gøymd heile første akt.
- **Følgjesvennen i Ørsta:** i designet er det tussen i fjøset. Huldra blir funnen på Solnør i 1841, då Aasen er vaksen.
- **Første blekkdungeon:** i designet ligg han i arkivet under Rådstova i Bergen.
- **Replikkane:** i designet talar presten og embetsfolk dansk, Asbjørnsen dansk med norske ord, og Aasen sunnmørsmål.
- **Haugbonden, kremmaren, bror og syster:** dei er ikkje med i designet.
- **Stevjinga:** ho er ikkje avgjord i designet. `stev.js` er ei prøve.

Desse skilnadene er greie så lenge prototypen er ein testarena.

## Scenemotoren

Ei scene følgjer same mal som manuset i designdokumentet: stad og tid, kven som er med, og stega i scena. Utfallet (ord, ting, trådar, val) står som steg i lista.

```js
// data.js
const SCENER = {
  heime: {
    namn: "Heime", stad: "Stova på Åsen", tid: "våren 1826", med: ["Ivar", "Storebror"],
    steg: [
      { snu: "Storebror", mot: "Ivar" },
      { s: "Storebror", t: "Ivar, du er vaken." },
      { gaa: "Storebror", mot: "Ivar" },
      { s: "Storebror", t: "…", kjensle: "trist", kven: "Ivar" },
      { gaa: "Storebror", rute: "@", ikkjeVent: true },
    ],
  },
};
// i manus: { scene: "heime" }
```

Ei scene byrjar med eit kort med stad og tid, om ikkje `kort: false` står på scena. Når ho er ferdig, står ho i `st.scener`.

### Mellomsekvensar
Ei scene med `hopp: true` er ein mellomsekvens. Trykkjer spelaren X eller Esc under scena, spør spelet «Hoppe over scena?». Ved ja køyrer resten av scena i snøggmodus (`Motor.hopp()`):

- replikkar, forteljing, kort, nærbilete, vent, kamera, blink, rist og toning blir ferdige med ein gong
- figurar som går, blir sette rett på målruta, snudde slik dei gjekk (eller mot den dei gjekk til)
- alt utfall blir gjort: flagg, ting, ord, trådar, Dagboka, parti, folk inn og ut, flytting
- val og kampar blir viste som vanleg (snøggmodusen er av for det steget), og tilbodet frå huldra òg
- når scena er slutt, tonar skjermen inn att om han stod svart

Ved nei kjem replikken attende, og scena held fram. Nye vindauge ventar til spørsmålet er svara. Lyttarane for tastane ligg i ein stabel (`Motor.lytt`), så eit kort som går bort under spørsmålet, tek ikkje spørsmålet med seg.

Merk scener som mellomsekvensar når dei mest er regi og prat. Ei scene der spelaren skal lære noko viktig (ein ny knapp, ein ny meny), bør ikkje kunne hoppast over, eller leggje den lærdomen i eit eige steg etter scena.

### Steg
Figurane blir nemnde med namn: «Ivar» er spelaren, «Huldra» er følgjet når ho er med, og andre er personar på kartet (namn eller merke). Alle registeg verkar medan motoren er pausa.

| Steg | Gjer |
|---|---|
| `{ s, t, kjensle, kven }` | replikk, med kjensle på den som talar eller på `kven` |
| `{ scene: "id" }` | spelar ei scene frå `SCENER` |
| `{ gaa: "Namn", mot: "Ivar" }` | går bort til nokon og snur seg mot han (til ei ledig rute attmed, ikkje der ein annan står) |
| `{ gaa: "Namn", rute: [x, y] }` | går den kortaste vegen til ei rute, eller til eit merke (`rute: "@"`) |
| `{ gaa: "Namn", sti: "h3o2" }` | går ein fast sti (n ned, o opp, v venstre, h høgre), også ut over kanten |
| `ut: true` | på eit gaa-steg: figuren blir borte når han er framme (inn ei dør, ut over kanten). Saman med `ikkjeVent` kan spelaren gå medan han går |
| `fart: 300` | ms per flis på eit gaa-steg |
| `{ snu: "Namn", retning: "opp" }` | snur seg (ned, opp, venstre, høgre), eller `mot: "Namn"`. Kjensla går bort når figuren snur seg |
| `{ snu: "Namn", fraa: "Ivar" }` | snur ryggen til nokon |
| `{ pose: "Namn", p: "knele" }` | pose: knele, sitje, peike, liggje eller sove (sjå under). `p: null` tek han bort |
| `{ inn: { namn, u, rute, retning, tale } }` | set ein ny person inn på kartet |
| `{ fjern: "Namn" }` | tek ein person bort (namn eller merke) |
| `{ kamera: "Namn" }` | kameraet glir til ein figur og følgjer han |
| `{ kamera: [x, y] }` | kameraet glir til ei rute |
| `{ kamera: null }` | kameraet glir attende til spelaren |
| `ms: 900` | kor lenge kameraet brukar |
| `{ saman: [[…], […]] }` | køyrer fleire lister samstundes og ventar på alle |
| `ikkjeVent: true` | manus går vidare medan eit registeg held fram |
| `{ vent: ms }` | pause |
| `{ kort: ["Stad", "tid"] }` | kort med stad og tid |
| `{ naerbilete: "bilete/….png", tekst }` | nærbilete midt på skjermen, ventar på Z |
| `{ blink: 1 }` | kort kvitt blink |
| `{ rist: ms, styrke }` | ristar biletet |
| `{ ton: "svart" }`, `{ ton: "kvitt" }`, `{ ton: "inn" }` | tonar ut til svart eller kvitt, eller inn att (`ms`) |
| `{ val, alt, svar, id }` | val. Med `id` blir valet hugsa i `st.val[id]`, og `RPGData.valt(id, i)` kan brukast i `dersom` |
| `{ traad: "id", tekst }` | opnar ein forteljartråd (`st.traadar`) |
| `{ traad: "id", lukk: 1 }` | lukkar han |
| `{ dagbok: "tekst" }` | skriv ei linje i Dagboka (`st.dagbok`) |
| `{ partiUt: "huldra", stille }` | går ut av partiet |
| `{ scenekart: "id", merke, retning, fylgje, ms }` | tonar over til eit scenekart (sjå under) |
| `{ scenekart: null, ms }` | tonar attende til kartet, ruta og retninga spelaren hadde før |

Dei eldre stega (`lytt`, `tilbod`, `fort`, `flagg`, `gi`, `kamp`, `til` og andre) står i toppen av `data.js`.

### Posar
Figurane kan knele, sitje, peike, liggje og sove i ei scene (`D.POSAR`). Posen varer til figuren går, eller til hendinga er slutt, og han går framfor kjensla.

```js
{ snu: "Far", retning: "høgre" },
{ pose: "Far", p: "peike" },        // far peikar utover
{ s: "Far", t: "Neset der ute …" },
{ pose: "Far", p: null },           // og står vanleg att
```

- Knele, sitje og peike finst i alle fire retningar, så figuren held retninga si. Snu han først (`snu`) om posen skal vise frå sida. Frå sida er knele og sitje tydelegast.
- Liggje og sove brukar ramma for slått ut (24 x 16). Over den som søv, stig det små z.
- Den som sit eller ligg, blir teikna over inventaret på same rad, så ein kan sitje på ein benk eller liggje i senga.
- Folk kan ha `pose` i kartet (syster sit ved langbordet i stova). Etter ei hending får dei han att.
- På eit nytt kart står ein. Etter eit scenekart får Ivar att posen han hadde før.
- Rammene står i rad 9 til 12 i figurarket (ned, opp, venstre, høgre) og blir laga med `tools/pikselkunst/figur.py`, `ivar_figur.py` og `huldra_figur.py`. Sjå ARBEIDSLOGG.md, runde 16.

### Scenekart
Eit scenekart er eit kart som berre finst for ei scene: ein draum, eit minne, seinare snøfjellet i prologen. Det står i `KART` med `scene: true`, og ingen dør, `til`-steg eller stad på verdskartet fører dit (`sjekk-spel.js` passar på det).

```js
{ scenekart: "minne-far", merke: "1", retning: "ned", ms: 1400 },   // inn i minnet
{ s: "Far", t: "…" },
{ scenekart: null, ms: 1400 },                                     // attende
```

- `merke` er startruta (standard `"1"`), `retning` kva veg Ivar ser, og `ms` kor lenge kvar toning varer (standard rask). Lengre toningar passar til draumar og minne.
- Følgjet (huldra) er med berre med `fylgje: true`. Attende er ho med att om ho er i partiet.
- Staden før scena blir hugsa i spel.js. `lagre()` på eit scenekart lagrar han, ikkje scenekartet.
- Attende blir kartet lasta på nytt: folk står på plassane sine, og folk frå `inn`-steg er borte.
- Scena må sjølv gå attende. `sjekk-spel.js` melder frå om ei scene som går til eit scenekart og ikkje attende.
- Stemninga `minne` gir falma, varme fargar og lyse kantar.
- Hoppar spelaren over scena, blir begge overgangane gjorde med ein gong, og Ivar står der han stod.

Dømet i prototypen er `minne_far`: første gong Ivar kviler ved lampa i stova (`kvile: "minne_far"` på kartet), set han seg, og minnest far som peikar ut over bøen og lærer han namna på plassane rundt Åsen. Etterpå spør lampa om lagring som vanleg.

### Hendingane på Åsen
Alle hendingane på Åsen (stova og tunet) brukar scenemotoren:

- `heime` (storebror går bort til Ivar) og `framande` (den framande gir ordboka og går opp vegen) er mellomsekvensar.
- `syster_kake`: syster står opp frå bordet, gir Ivar flatbrød og set seg att.
- `skiftebrev`: den første kampen. Ivar står ved kanten mot bygda. Kameraet går til stova, der syster kjem ut døra med brevet og ropar, og følgjer henne bort til Ivar. Storebror kjem etter. Biletet ristar, blekket renn ut av brevet, og kampen byrjar. Etterpå står dei attmed Ivar og talar, og så går dei inn att i stova (`ut: true`) medan spelaren kan gå. Dei er berre med i stova på kartet, så dei er aldri to stader.
- Vakta ved kantane (`ikkje_enno`, og `skiftebrev` med for få ord): Ivar går eitt steg attende.
- Småprat (storebror, granne og budeia) er manus med kjensler.

### Hendingane i Hovdebygda
Hovdebygda (bygda, kyrkja, prestegarden, Nedre Hovde og vegen) brukar òg scenemotoren:

- `framande2` er ein mellomsekvens. Den framande står ved kyrkjestien og viser fram sommarfuglane, snur seg mot kyrkja og attende. Lekpredikanten høyrer det og kjem opp til vegen. Etterpå går den framande austover vegen mot Ekset, kameraet blir ståande til han er ute av biletet, og så blir han teken bort. Han står i Dagboka.
- `presten` er ein mellomsekvens. Presten kneler attmed løparen framfor altarringen (pose i kartet, så vegen til lysestaken er open). Han står opp, peikar mot prestegarden, og klokkaren kjem bort og lyttar. Ved «Kanskje litt» snur presten ryggen til Ivar (`fraa`). Valet blir hugsa i `st.val.trolldom`. Etterpå kneler presten att, og klokkaren går attende. Når blekklatten er slegen, står presten innanfor altarringen.
- `skammen` på Nedre Hovde: bestefaren talar, mora går bort til han, og dottera kjem etter. Ved feil svar snur han ryggen til, og Ivar kan prøve att.
- Småprat (bonde, kone, kremmar, lekpredikant, klokkar, tenestejente, mor, dotter, fiskar) er manus med kjensler. Folk snur seg mot det dei talar om (kona mot utmarka, tenestejenta mot kontordøra, fiskaren mot elva), og lekpredikanten peikar på Ivar.

Ei dør med `vakt` stoppar Ivar på ruta når vaktmanuset har gått, også når flagget vart sett. Spelaren går sjølv vidare.

Etter ein kamp midt i ei hending er motoren pausa att, så ingen går omkring medan scena held fram.

### Test
`tools/sjekk-scene.html` køyrer scenene «heime» og «framande» og eit prøvemanus. Han sjekkar at figurane går dit dei skal, at kameraet kjem attende, at val blir hugsa, og at trådar og Dagboka blir skrivne. Så hoppar han over «framande» og ei prøvescene og sjekkar at utfallet er gjort, at figurane står der dei skal, at val blir viste, og at skjermen er tona inn att. Til sist kviler Ivar ved lampa i stova og får minnet om far på scenekartet: testen sjekkar at huldra ikkje er med, at lagring i minnet lagrar stova, og at Ivar kjem attende til same rute og retning, også når ei scene med scenekart blir hoppa over. Han sjekkar at Ivar set seg og far peikar i minnet, at posane er lesne frå arket i fire retningar, at ein pose varer til figuren går eller hendinga er slutt, og at syster sit ved bordet att. Til slutt spelar han hendingane på Åsen: syster som gir niste, vakta ved kantane, og skiftebrevet med ein stubba kamp. Han sjekkar at syster kjem ut døra, at begge står attmed Ivar når blekket kjem, at den som talar, står på kartet, at dei går inn att og berre finst i stova, at Ivar kan gå vidare til bygda, og at kampen kjem også når scena blir hoppa over. Så spelar han hendingane i Hovdebygda: den framande (og ein gong hoppa over), presten med valet «Kanskje litt», skammen med feil og rett svar, og all småpraten. Han sjekkar at lekpredikanten kjem opp til vegen, at den framande går ut av biletet, at presten peikar, snur ryggen til og kneler att, at mora og dottera går bort til bestefaren, at ingen står på same rute, og at den som talar, står på kartet. `RPGTest.iHending()` seier om ei hending køyrer. `node tools/sjekk-spel.js` sjekkar at scenene viser til ting som finst.

### Neste steg for scenemotoren
- Hendingane i prototypen over til scener med regi, der dei som talar, står på kartet. Åsen og Hovdebygda er ferdige.
