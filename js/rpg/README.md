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
| `{ gaa: "Namn", mot: "Ivar" }` | går bort til nokon og snur seg mot han |
| `{ gaa: "Namn", rute: [x, y] }` | går den kortaste vegen til ei rute, eller til eit merke (`rute: "@"`) |
| `{ gaa: "Namn", sti: "h3o2" }` | går ein fast sti (n ned, o opp, v venstre, h høgre), også ut over kanten |
| `fart: 300` | ms per flis på eit gaa-steg |
| `{ snu: "Namn", retning: "opp" }` | snur seg (ned, opp, venstre, høgre), eller `mot: "Namn"` |
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

Dei eldre stega (`lytt`, `tilbod`, `fort`, `flagg`, `gi`, `kamp`, `til` og andre) står i toppen av `data.js`.

### Test
`tools/sjekk-scene.html` køyrer scenene «heime» og «framande» og eit prøvemanus. Han sjekkar at figurane går dit dei skal, at kameraet kjem attende, at val blir hugsa, og at trådar og Dagboka blir skrivne. Så hoppar han over «framande» og ei prøvescene og sjekkar at utfallet er gjort, at figurane står der dei skal, at val blir viste, og at skjermen er tona inn att. `node tools/sjekk-spel.js` sjekkar at scenene viser til ting som finst.

### Neste steg for scenemotoren
- Dagboka og trådane i menyen.
- Figurar med eigne animasjonar i scener (knele, setje seg, peike).
- Scener på kart som berre finst for scena (snøfjellet, ein draum).
