# Aasen: Språkvandringa, prototypen

Denne mappa held rollespelet i `spel.html`. Alt arbeidet til no er **prototypearbeid**. Historia og designet står i designdokumentet «Aasen-spelet: scenario og design» (Claude Docs), som er kjelda for kva spelet skal bli.

| Fil | Innhald |
|---|---|
| `data.js` | ord, figurar, kart, fiendar, scener og manus |
| `motor.js` | feltmotoren: kart, rørsle, folk, dører, samtalar, lys, toning og regi |
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

### Scener blir ikkje hoppa over
Spelaren kan ikkje hoppe over ei scene. Scenene skal difor vere stramme: ingen lange pausar og ingen rørsle utan meining.

### Steg
Figurane blir nemnde med namn: «Ivar» er spelaren, «Huldra» er følgjet når ho er med, og andre er personar på kartet (namn eller merke). Alle registeg verkar medan motoren er pausa.

| Steg | Gjer |
|---|---|
| `{ s, t, kjensle, kven }` | replikk, med kjensle på den som talar eller på `kven` |
| `{ scene: "id" }` | spelar ei scene frå `SCENER` |
| `{ gaa: "Namn", mot: "Ivar" }` | går bort til nokon og snur seg mot han (til ei ledig rute attmed, ikkje der ein annan står) |
| `{ gaa: "Namn", rute: [x, y] }` | går den kortaste vegen til ei rute, eller til eit merke (`rute: "@"`) |
| `{ gaa: "Namn", sti: "h3o2" }` | går ein fast sti (n ned, o opp, v venstre, h høgre), også ut over kanten |
| `ut: true` | på eit gaa-steg: figuren blir borte når han er framme (inn ei dør, ut over kanten). Saman med `ikkjeVent` kan spelaren gå medan han går. Går han inn ei dør, opnar ho seg når han kjem til henne og lukkar seg bak han (sjå «Dører») |
| `{ dor: [x, y], open: true }` | held døra open (eller eit merke i staden for `[x, y]`). `open: false` lukkar ho, og utan `open` opnar ho seg eit augneblink og lukkar seg att. Trengst sjeldan: ein figur som går gjennom ei dør, opnar ho av seg sjølv |
| `fart: 300` | ms per flis på eit gaa-steg |
| `{ snu: "Namn", retning: "opp" }` | snur seg (ned, opp, venstre, høgre), eller `mot: "Namn"`. Kjensla går bort når figuren snur seg |
| `{ snu: "Namn", fraa: "Ivar" }` | snur ryggen til nokon |
| `{ pose: "Namn", p: "knele" }` | pose: knele, sitje, peike, liggje eller sove (sjå under). `p: null` tek han bort |
| `{ sitje: "Namn", sete: [x, y], gaaDit: true }` | set seg på setet på ruta (eller eit merke), i retninga til setet (sjå «Sitjeplassar»). Med `gaaDit` går figuren dit først, til ei ledig rute attmed (ikkje bak ryggen) og inn som spelaren gjer, og set seg halvvegs i det siste steget; utan står han der med ein gong. Same mekanisme for Ivar, følgjet, folk og figurar frå `inn` |
| `{ liggje: "Namn", seng: [x, y], gaaDit, sove: false }` | legg seg i senga under dyna (søv, `pose: "sove"`). `sove: false`: ligg vaken med opne auge (`pose: "liggje"`); står han alt i senga, vaknar han |
| `{ reis: "Namn" }` | reiser seg frå setet eller står opp av senga og går eitt steg ut: framover (retninga til setet), elles til sida, ut av senga helst nedover |
| `{ inn: { namn, u, rute, retning, tale } }` | set ein ny person inn på kartet |
| `{ inn: { namn, vesen: "blekklatten", rute } }` | set eit vesen inn på kartet: fiendebiletet frå kampen i full storleik, midt på ruta |
| `{ byt: "Namn", namn, u }` | byter namn eller utsjånad på ein person (`vesen` for eit vesen). Kan stå saman med andre steg, til dømes ein blink eller ei forvandling |
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
| `{ blink: 1 }` | kort kvitt blink. Med `rgb: [r, g, b]` (0 til 31) blinkar skjermen i ein farge ($55 i FF6), og `ms` er lengda. Blinket går ned i åtte steg |
| `{ tone: "bakgrunn", rgb: [-8, -8, 0], ms }` | tonar bakgrunnen (`"bakgrunn"`), berre figurane (`"figurar"`) eller heile biletet (`"alle"`) gradvis mot ein fast farge som blir lagd til eller trekt frå (-31 til 31 per kanal), i heile steg som $50, $51 og $53 i FF6. `rgb: null` tonar attende. Varer til neste kart |
| `{ spot: "Ivar", r: 40, ms }` | spotlight ($63): ein skarp lyssirkel med radius `r` pikslar rundt ein figur eller ei rute (`[x, y]`), svart utanfor og eit dithera band på tre pikslar i kanten. Radien glir frå det han var. `{ spot: null, ms }` lèt sirkelen vekse ut og bli borte |
| `{ rist: ms, styrke }` | ristar biletet |
| `{ ton: "svart" }`, `{ ton: "kvitt" }`, `{ ton: "inn" }` | tonar ut til svart eller kvitt, eller inn att (`ms`), i 16 lysstyrketrinn som på Super Nintendo |
| `{ val, alt, svar, id }` | val. Med `id` blir valet hugsa i `st.val[id]`, og `RPGData.valt(id, i)` kan brukast i `dersom` |
| `{ traad: "id", tekst }` | opnar ein forteljartråd (`st.traadar`) |
| `{ traad: "id", lukk: 1 }` | lukkar han |
| `{ dagbok: "tekst" }` | skriv ei linje i Dagboka (`st.dagbok`) |
| `{ parti: "huldra", fra: "Huldra" }` | ny i partiet: følgjet står der personen på kartet stod, og personen er borte |
| `{ partiUt: "huldra", stille }` | går ut av partiet |
| `{ scenekart: "id", merke, retning, fylgje, ms }` | tonar over til eit scenekart (sjå under) |
| `{ scenekart: null, ms }` | tonar attende til kartet, ruta og retninga spelaren hadde før |

Dei eldre stega (`lytt`, `tilbod`, `fort`, `flagg`, `gi`, `kamp`, `til` og andre) står i toppen av `data.js`.

### Dører
Dørene opnar seg som i Final Fantasy VI (runde 96): kvar dør har to rammer, lukka og open, og ingen animasjon mellom dei.

- **Spelaren:** går Ivar mot ei lukka dør han kan gå gjennom, byter ho med ein gong til den opne ramma, han går eitt steg inn i opninga, og skjermen tonar over til det nye kartet (`gjennomDor()` i motor.js). Der står døra han kom ut av, open eit augneblink (`DOR_UT`, 350 ms etter toninga) og lukkar seg. I FF6 står ein i døropninga med døra open når ein kjem ut, og ho smell att når ein går av ruta. Ivar startar éi rute framfor døra, så døra er open medan biletet tonar inn og lukkar seg rett etter, som om han nett har gått ut.
- **Kort trykk (runde 97):** eit kort trykk mot ei lukka dør (kortare enn `SNU_TID`, 100 ms) opnar henne utan at Ivar går gjennom: han snur seg mot døra, og ho opnar seg med ein gong. Ho står open så lenge han står framfor og ser mot henne, og lukkar seg 300 ms etter at han har gått bort eller snudd seg (ingen tidsgrense, så ho ikkje smell att medan han ser på henne). Held han tasten inne, går han gjennom etter 100 ms, og eit nytt trykk mot den opne døra går gjennom med ein gong. Midt i gangen går han rett gjennom som før. Låste dører gir teksten sin med ein gong, òg ved eit kort trykk (`kanOpne` i motor.js og spel.js).
- **Låste dører:** `krev` (utan flagget), `krevOrd` (før ordet er sunge), `vakt` og dører utan `til` opnar seg ikkje. Teksten eller vaktmanuset kjem som før, og Ivar blir ståande.
- **Figurar i scener:** ei dør (alle i `dorer` utanom kantdører) står open så lenge ein figur går inn på eller ut av ruta hennar, og lukkar seg `DOR_LUKK` (300 ms) etter det siste steget (`brukDorer()`). Ein figur som står i ro på ei lukka dørrute, er inne enno og blir ikkje teikna (syster før ho kjem ut i «skiftebrev»). Så `{ inn: { rute: [6, 4] } }` på døra og eit `gaa`-steg ut gjer at døra opnar seg, figuren kjem ut, og døra lukkar seg; `gaa` med `rute` på døra og `ut: true` gjer at døra opnar seg, figuren går inn og blir borte, og døra lukkar seg etter eit augneblink. Scenesteget `{ dor, open }` finst for scener som treng meir.
- **Bileta:** eit hus eller inventar i `OPEN_BYGG` (pikslar.js) har ei open ramme `<id>-open` (bygg.py og inventar.py med `ope=True`), og motoren byter til ho når ei dør i fotavtrykket er open (`byggBilete()`). Ein figur i opninga til ei open husdør (flisa `D` eller `d`) blir teikna framfor huset. Dørene inne er flisa `E` (lukka) og `E:open`, `E:opp` og `E:ned` (opne).
- **I data.js:** `open: true` på døra: ho står alltid open (stabburet inne, så dagslyset fell inn, og trappa ned til arkivet). `trapp: "opp"` eller `"ned"`: den opne døra viser trinn som går opp eller ned i mørket (galleritrappa, galleriet, tårnet, arkivet). `gang: true`: ei dør på same kartet, utan `til` (døra i pilasteren inn til preikestolen, 4,11).

### Trapper
`trapper: { "x,y": "loddrett" | "vassrett" }` på kartet seier kva retning ei trapperute kan gåast i (`trappStengd()` i motor.js). Sidene er faste: ein går berre inn på og ut av trappa frå botnen og toppen, eitt trinn per steg, og ingen kan gå inn på eit trinn midt i trappa frå sida. Gjeld spelaren, følgjet, folk som går omkring og regien. Galleritrappa i våpenhuset (8,38 til 8,40) er `loddrett`. Rampene ute (`/`) har skrent (`s`, fast) på sidene og treng det ikkje.

### Veggane inne
I innekarta med tømmer- eller murveggar (`X`, `c`) er bakveggen to fliser høg: over rad 0 teiknar motoren éi flis vegg til, med ei mørk takbjelke øvst (`bakveggOver()` i motor.js), så store møblar inntil bakveggen (grua med pipa, senga, hylla, skatollet, golvuret, bokreolane) står framfor veggen og ikkje stikk opp over han. Sideveggane og veggen nedst (sett ovanfrå) blir teikna att over møblane (`sideveggOver()`), så eit møbel inntil sideveggen ikkje dekkjer han. Kyrkja har sine eigne veggar (`G` og inventar) og er ikkje med. Store møblar inne (alt som ikkje er sete, flatt, høgt oppe eller har lag) blir delte i ei stripe per flisrad, kvar sortert etter rada si (runde 92), så ein figur ved sida av senga eller grua blir dekt berre av den delen som er lenger nede enn føtene hans. Inventar inntil ein sidevegg blir skuva 4 pikslar inn i rommet (`byggDx()`), så det står mot veggen og ikkje inne i han, og `dy` på eit bygg i kartet flyttar biletet opp eller ned (senga har `dy: -7`, så hovudgavlen står heilt inntil bakveggen).

### Lys
Lyset etterliknar Super Nintendo og Final Fantasy VI. Det meste av lyset er teikna inn i pikslane (lys frå oppe til venstre, eld og glød malt for hand). Resten er fargerekning (color math) som maskinvara gjorde: etter at kartet er teikna, reknar `lys()` i `motor.js` om kvar piksel med ein fast farge som blir lagd til eller trekt frå med klemming per kanal, eventuelt halvert (snitt), og fargane blir kvantiserte til 5 bit per kanal (15-bit fargar). Det skjer med éin `getImageData`, oppslagstabellar per rad (`Uint32Array`) og éin `putImageData`, om lag 1 ms per bilete. Pikslar utanfor kartet blir ikkje rekna om (som backdrop på SNES).

- **Bakgrunn og figurar kvar for seg.** Ei maske teiknar figurane (folk og vesen) i same rekkjefølgje som lerretet, og hus, tre og møblar som står framfor ein figur, viskar ut maska der dei dekkjer. Så kan bakgrunnen bli mørk medan figurane held fargane, som $51 og $53.
- **Stemningar** står i `STEMNINGAR` i `data.js`, og kvart kart vel ei med `stemning`. Ein ny stemning er ei ny oppføring i tabellen (sjå kommentaren der): `bak` og `fig` (fast farge `p`, `snitt`, lysstyrke `lys`), `hdma` (ein farge som endrar seg nedover skjermen i trinn på 8 rader, som HDMA), `glod` (tre nivå inni glødformene), `syklus` (palettanimasjon), `skyer` og `skugge`, `kjelder`, `ivar`, `straalar`, `sepia` og `dagslys`. Ingen vignett og ingen mjuke gradientar.
  - `morgon`: varmt lys, varmast øvst (hdma), og hardkanta skyskuggar som driv.
  - `kveld`: fiolett. Ein fast farge blir trekt frå bakgrunnen (meir nedst), litt mindre frå figurane. Lyktene lyser.
  - `inne`: rommet i skugge, varmt eldlys rundt grua, omnen og ljosa.
  - `mork`: nesten mørkt (arkivet), med ein lyssirkel rundt Ivar og rundt lampene.
  - `stabbur`: rommet i djup skugge utan eldstad. `dagslys` gir glødformene `dor` (døropninga `E` og ei vifte av lys over golvet framfor) og `glugge` (strålen skrått ned frå `inne-glugge` og ein lys flekk på golvet). Kjernen tek snittet mot kvitt, så opninga og flekken blir lyse.
  - `kyrkje`: lyst, med lysstrålar frå vindauga som eit gjennomsiktig lag i trinn (kjernen tek snittet mot kvitt).
  - `minne`: falma fargar mot brunt (palettendring) og lyse band øvst og nedst, i trinn.
- **Lyskjelder** (`LYSKJELDER` i `data.js`): grua og kakkelomnen (der elden i `Pikslar.ILD` er), lykter (`L` ute, og `T`, som er ei lykt utan kvileplass: glødforma `lykt`; `L` inne: `lyktgolv`), bålplassen (`å`: `baal`), peis (`f`) og lysekrona. Morgonlyset (`morgon`) har òg `kjelder`, med ein dempa glød, så lyktene lyser svakt om dagen. Kvar type har si eiga handteikna glødform i `bilete/spel/lys/<namn>.png` (laga med `tools/pikselkunst/glod.py`): fargen i biletet er trinnet (1 til 3), og den magenta pikselen er ankeret der kjelda er. Motoren gjer kvar ramme om til strekar éin gong og stemplar dei inn i lysnivåa. Formene har to eller tre flimmerbilete som blir bytte i same takt som elden (150 ms, rekkjefølgja står i `rekkje`), og fargane i gløden går òg på rundgang. Ljoset rundt Ivar i arkivet (`ivar: true`) og skyskuggane (`sky`) er glødformer på same måten.
- **Scenesteg:** `tone`, `blink` med `rgb` og `spot` (sjå tabellen over). `ton` til svart og kvitt går i 16 trinn.
- **Fjernt (nivå 5):** pikslane der bakgrunnslaga syner (sjå «Parallakse og terreng»), får `fjern` frå stemninga (eller `bak` om han manglar) og hdma, men ingen skyskugge og ingen glød. Luftperspektivet (dis, lysare og kaldare fargar) er måla inn i bileta.

### Lagringsstader: lykta og bålplassen
Partiet kviler og kan lagre ved ei lykt (`L`) eller ein bålplass (`å`). Z mot ruta kallar `krokar.lampe(type)` (motor.js) med typen `lykt` eller `baal`, og spel.js lækjer partiet og spør «Vil du lagre?». Ved bålet set Ivar seg ned («Ivar set seg ved bålet»), i kyrkja syng kyrkjelyden. `kvile: "scene"` på kartet blir spela første gong partiet kviler der (minnet om far ved lampa i stova).

- **Lykta** er éi felles lykt (forma frå lykta i utmarka): ute står ho på ein stolpe (`L` ute og `T`, som berre lyser), inne står den same lykta på golvet (`L` inne). Lykter passar i bygda, på gardstun, inne i hus og i kyrkja.
- **Bålplassen** (`å`) passar ute: i utmarka, i skog og fjell, på setra og ved vegen. Han er ein steinring sett skrått ovanfrå med oske, kubbar og ein kaffikjel, flammar i fire rammer, gnistar, røyk og glødforma `baal`, som flakkar meir enn lykta. Ein stokk å sitje på er ein naturting ved sida av (`naturting: [{ ved: [x, y], bilete: "sitjestokk" }]` på ei `o`-rute). Eit nytt bål er berre `å` i kartet, gjerne med ein stokk attmed.
- Begge er figurar (`Pikslar.natur`, `eldstad()` i pikslar.js, bilete frå `tools/pikselkunst/eldstad.py`) som står nedst på flisa og blir sorterte med folka. `etter()` på ein naturfigur teiknar det som lever oppå biletet (flammane, framsida av ringen, gnistane og røyken).
- **Bålplassen med gryte** (`ÅÅ`, to fliser ved sida av kvarandre, runde 87): ein breiare ring, ein trefot av bjørkestenger og ei gryte som heng over elden, med damp. Han blir teikna éin gong, på den venstre flisa, og glødforma er `baalstor`. Z mot kva som helst av dei to flisene gir kvile og lagring.
- Lagringsstader no: lykt i stova og på tunet på Åsen, i kyrkja (to), i prestegarden, kontoret og arkivet, og på tunet og i boksamlinga på Ekset; bål med gryte på setervollen i utmarka (22 og 23,21) og bål ved sjøen på vegen til Ekset (7,11). `node tools/sjekk-spel.js` sjekkar at alle kan nåast.

### Sitjeplassar
Alt i `Pikslar.SETE` (stolar, benker, kubbestolar, kyrkjebenker, sofaen) og naturting med `sete` (stokken ved bålet) er sitjeplassar: spelaren kan gå inn på ruta, og då set han seg (`pose: "sitje"`, retninga til setet om det har ei). Går han vidare, reiser han seg. Andre møblar (bord, kister, senger, omnar) er faste som før.

- `kanSitjeInn()` og `kanReiseSeg()` i motor.js: ruta må vere ledig (ingen folk, ikkje følgjet). Eit sete med `retning` kan ein ikkje gå inn i eller ut av bakfrå, over ryggen (`rygg: false` på stokken, som ingen rygg har). Langs ein benk går ein frå sete til sete. Kyrkjebenkene ser mot altaret med ryggen mot kameraet: ein går inn framfrå (frå rada mellom benkene ovanfor) eller frå midtgangen og sidegangen.
- **Modellen (runde 88):** på setet sit han alltid i retninga til setet (`seteRetning()`), aldri i retninga til siste tasten. Ein benk utan rygg får retninga på tvers av benken: mot eit møbel som står inntil (bordet i stova, orgelet), bort frå veggen, og elles dit han kom frå. Langs ein benk glir han sitjande til neste sete (`flytt.glid`), teikna med sitjeposen og setehøgda heile vegen. Ein tast dit han ikkje kan gå, gjer ingenting: han snur seg ikkje og blir sitjande. Han reiser seg når han går ut, framover (motsett av ryggen) eller ut til sida frå enden av benken. I eit steg inn på eit sete set han seg halvvegs, og i eit steg ut reiser han seg halvvegs (`spelarVis()`), så han aldri står på golvet bak ryggen. Etter ei hending blir han sitjande, og står han på eit sete frå lagringa, sit han.
- **Overgangane (runde 92):** han går heilt inn på ruta i vanleg gangtakt og byter så til sitjeposen i éi ramme, og høgda glir opp på setet på tre tikk (`sitT`). Ut att reiser han seg i éi ramme, og høgda glir ned att på fem tikk medan han går (`reisT`). Langs benken glir han med rammene for å flytte seg sidelengs (`skuvh1`, `skuvh2` mot høgre, `skuvv1`, `skuvv2` mot venstre, kolonne 3 til 6 i posradene i figurarket, laga av `skuv()` i handfigur.py for alle figurar). `figurVis()` reknar ut posen, setet, senga, ramma og høgda (`lyft`) for alle figurar.
- **Følgjet (runde 92):** `fylgjeEtter(tx, ty)` tek ruta spelaren gjekk frå når ho står inntil ho. Gjekk han frå eit sete eller ei seng, blir ho ståande om ho står inntil målet hans, elles tek ho eitt steg mot den næraste ledige ruta inntil han. Ho flyttar seg aldri meir enn éi rute per steg, og aldri inn på eit sete.
- **Teikneordenen (runde 95):** i steget inn på eller ut av eit sete (utan ryggen mot kameraet) blir figuren sortert som den som sit der (`foran` i `figurVis`), og sete blir delte i stripar per flisrad som dei andre store møblane, så ein ståande benk aldri dekkjer Ivar når han går inn, går ut eller står attmed. `Motor.spelarDekt` gir seta som ligg over spelaren i siste bilete (for testane).
- **Senga** (`Pikslar.SENG`: `inne-seng` i stova på Åsen og på Nedre Hovde, runde 89): senga står på langs inn frå bakveggen (1 x 2 fliser), som i Final Fantasy VI. Ivar går inn i senga og legg seg under dyna (`pose: "sove"`, z over hovudet). Hovudet ligg på puta sett framanfrå med lukka auge (`sovehovud()` i motor.js lagar det av ramma der figuren ser ned: augekvitt og iris blir hud, og under blir augeloket ein strek), og lakenet og åkledet (rektanglar i sengebiletet, `dyne`) blir teikna oppå, opp til haka. Som på eit vertshus i FF6 tonar skjermen til svart og inn att, og partiet har kvilt (`krokar.seng` i spel.js; ingen lagring). I senga kan han flytte seg til den andre ruta liggjande; ein tast ut av senga, og han står opp. Senga er fast for følgjet og folk.
- Folk og følgjet går aldri inn på eit sete (`folkKanGaa` og `vegTil` held seg til `FAST`). Går spelaren langs ein benk, ventar følgjet, og kjem han ut ein annan stad, går ho dit med regi (`fylgjeEtter()`).
- Ein plass der nokon sit i kartet (syster på kubbestolen, kyrkjefolket, organisten), er opptatt.
- Ein naturting blir sete med `sete: { hogd, retning, rygg: false }`: `{ ved: [21, 21], bilete: "sitjestokk", sete: { hogd: -2, retning: 3, rygg: false } }`.

### Parallakse og terreng
Åsen er ein ås med høgd, som klippene over Narshe i Final Fantasy VI og toppen av pyramiden i A Link to the Past: kartet er delt i nivå med bakkekantar, og nedst fell åsen bratt ned mot utsikta over Hovdebygda, som er eigne bakgrunnslag som flyttar seg saktare enn kartet.

- **Fliser:** `s` er ein skrent (bakkekanten mellom to nivå, sett framanfrå: graskledd skråning med jord og bergnabbar, slagskugge på graset under). Han flatar ut der han møter open mark eller ei rampe. `/` er ei rampe: stien gjennom skrenten, med trinn (ein kan gå der). `M` er stupet: bergveggen nedst, som løyser seg opp i dis i den nedste rada, eller (med `stupFast`) endar i ein ujamn, open botn over ura øvst i lia. `U` er eit overheng under bakke som stikk lengst ut (neset, hylla): graset heng over i ein rund boge, ei tynn kant av torv og berg med skugge under, og berget bak trekt inn, i same høgd som stupet ved sida. `Z` er same overhenget med spiss form (kantvariant for variasjon): graset heng i ein V mot spissen, med luft rett under spissen og berg berre mot endane. Skriv `Z` i staden for `U` under eit framspring for å velje han (på Åsen: det vesle framspringet vest på platået, 1,15 og 2,15). `-` er luft: ingen bakke, ikkje gangbar, og bakgrunnen syner gjennom. Under eit stup er det meir stup eller luft, og under luft er det luft (`sjekk-spel.js` sjekkar det). Teikninga er `Pikslar.skrent`, `Pikslar.underSkrent`, `Pikslar.rampe` og `Pikslar.stup`.
- **Bakgrunnslag** (`parallakse` på kartet): `[{ bilete, faktor, ved: [kx, ky], x, y }, …]`, det fjernaste først. `bilete` er namnet på fila i `bilete/spel/parallakse/` (laga med `tools/pikselkunst/utsikt.py`). `x` og `y` er der øvre venstre hjørne står på skjermen (pikslar) når kameraet står med øvre venstre flis på `ved`, og laget flyttar seg `faktor` (eit tal eller `[fx, fy]`) så langt som kartet. Posisjonen blir runda til heile pikslar for seg, og han er ein monoton funksjon av kameraet (som òg står på heile pikslar og går i tikk), så ingenting ristar fram og attende. `luftfarge` fyller skjermen under laga. Laga blir berre teikna innanfor kartet.
- **Fast lag og variantar:** eit lag med faktor 1 står fast i terrenget (lia under stupet på Åsen). Eit lag med `variant: "namn"` blir berre teikna når kartet har `variant: "namn"` (standard «fast»). Åsen har `variant: "fast"` (lia som fast lag); `variant: "dal"` gir ei kortare li (`li-kort`) og dalbotnen med Hovdebygda (`dal-under`, faktor `[1, 1.8]`), som stig fram nedanfrå raskare enn kartet når kameraet glir ned. Sjå den med `skjermbilete.py namn kart=asen m=1 x=12 y=13 variant=dal`.
- **Animerte lag:** `rammer: n` (rammene side om side i biletet), `rekkje` og `takt` (tikk per steg), og `drift: n` (laget glir éin piksel mot høgre per n tikk og går rundt). Graset på bergnabbane i forgrunnen på Åsen vaiar i vinden (`[0, 1, 2, 1]`, 40 tikk per steg), og fuglane over dalen slår med vengene og driv bortover.
- **Forgrunn** (`forgrunn` på kartet): same format, med faktor over 1, teikna etter alt anna (før lyset). Bjørkegreiner i øvre hjørne når kameraet står øvst, høgt gras i nedre hjørne når det står nedst ved stupet. Dei går fort ut av biletet når kameraet flyttar seg.
- **Inventar som heng høgt** (`bygg` med `over: true`): `faktor` (tal eller `[fx, fy]`, over 1) gir parallakse, så lysekroner, kyrkjeskipet og galleriet i kyrkja flyttar seg raskare enn golvet (`byggPos()` i `motor.js`). Dei står på plassen sin i kartet når midten av fotavtrykket er midt på skjermen. `tak` (takfaktoren, større enn `faktor`) teiknar kjettingen opp til taket frå festet i `Pikslar.KJEDE` (`kjede()`): han blir lengre øvst på skjermen og kortare nedst. Ljos på inventar står i `Pikslar.LJOS` (glødform og anker i biletet, følgjer parallaksen); `golv: true` legg i tillegg lyspølen `kronegolv` fast på golvet under. `silhuett: true` på eit slikt bygg viser Ivar gjennom det når han går under.
- **Utsikt for kameraet** (`kameraNed: { fra, rader, fart }`, `{ kant: true, rader, fart }` eller `{ ruter: ["x,y", …], rader, fart }`): først når målet står på rad `fra` eller lenger nede, på ei flis med stup rett under seg (`kant`), eller på ei av utløysarrutene (`ruter`; Åsen: neset og ytst på hylla), glir kameraet `rader` rader ned for seg sjølv i tikk-takt, `fart` pikslar per tikk (standard 1), og attende når målet går opp att (`nedPx` i `motor.js`). `kameraOpp: { fra, rader, fart }` glir roleg opp over kanten øvst når målet er på rad `fra` eller høgare (Åsen: rad 4, seks rader, 1 piksel per tikk), så laga i utsikta stig fram over horisonten etter kvart; utan `fart` (`{ fra, til, rader }`) ser kameraet jamt lenger opp når målet går opp mot kanten: over rad `fra` ser kameraet opp til `rader` rader over kartet, der det er luft. Kanten der bakken fell bort er rad 0 og alle `N`-fliser (som har luft over seg); `Pikslar.nordkant` bøyer kanten ned mot sida der det er luft. Laga for utsikta øvst har `opp: true`.
- På Åsen: toppen er lengst oppe på midten, og kanten fell eit steg ned mot sidene. Øvst ser ein ut som i Narshe, i fire lag med kvar sin fart: himmelen (`himmel`, faktor 0,04), fjella (`fjell`, 0,1), lia opp mot utmarka med setra til venstre og Hovdebygda med kyrkja til høgre (`dal-nord`, 0,3), og nærast trekronene i lia under kanten (`naer`, 0,6), som glir fort og søkk bak kanten når kameraet går ned. Kameraet kan sjå seks rader over kartet. Nedst er kanten ujamn: platået stikk ut i eit nes og går inn i ei vik, og under midten går ein skrent med rampe (11,14) ned til ei hylle eitt nivå lenger nede (rad 15 og 16) før det stuper. Stupet er tre rader høgt. Kameraet glir roleg 4 rader ned (1 piksel per tikk) når Ivar står på ei flis rett over stupet (på platået, neset, i vika eller på hylla), så han står øvst på skjermen, og under stupet ser ein først ned langs dalsida (bergveggar, hyller og skog skrått framanfrå) som glir over i dalen rett ovanfrå som eit kart frå lufta, eit fast lag som følgjer kartet (`li`, faktor 1): ur og skog som trekroner sett ovanfrå, og dalbotnen med teigar, steingardar, elva, vegen, gardane som tak og kyrkja med tårnet, og skyer som driv sakte bortover under oss (`skyer`, `drift: 12`), og elva renn (`elv`, fire rammer). Kartet har åtte rader luft nedst. Minnet om far (`minne-far`) har same lia under stupet.

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

Dømet i prototypen er `minne_far`: første gong Ivar kviler ved lampa i stova (`kvile: "minne_far"` på kartet), set han seg, og minnest far som peikar ut over bøen og lærer han namna på plassane rundt Åsen. Etterpå spør lampa om lagring som vanleg.

### Hendingane på Åsen
Alle hendingane på Åsen (stova og tunet) brukar scenemotoren:

- `heime`: Ivar søv i senga i stova (`liggje` i `start`), biletet tonar inn, han vaknar (`sove: false`) og står opp (`reis`) når storebror seier «Ivar, du er vaken», og storebror går bort til han. `framande`: den framande gir ordboka og går opp vegen.
- `syster_kake`: syster står opp frå bordet, gir Ivar flatbrød og set seg att.
- Tunet ligg på midtnivået under toppen: to kollar med skog, og stien til kantdøra mot utmarka (10,0) går i søkket mellom dei, litt til venstre (rampa på (10,1)). Bøen med åkeren og stabburet ligg under ein skrent til (ramper ved x 8 og x 24). Nedst er stupet og utsikta.
- `skiftebrev`: den første kampen. Ivar står ved kanten mot bygda. Kameraet går til stova, der syster kjem ut døra med brevet og ropar, og følgjer henne bort til Ivar. Storebror kjem etter, og Ivar snur og går eitt steg attende frå skogkanten, så dei tre står saman på vegen. Biletet ristar, blekket renn ut av brevet og blir ein dråpe på tunet (`Blekkdropen`, eit vesen), som kryp bort til Ivar, og kampen byrjar. Etter kampen er dropen borte. Etterpå står dei attmed Ivar og talar, og så går dei inn att i stova (`ut: true`) medan spelaren kan gå. Dei er berre med i stova på kartet, så dei er aldri to stader.
- Stabburet (`asen-stabbur`): døra (18,10) har `krev: "stabburnokkel"` og er låst til Ivar har funne nøkkelen. Etter skiftebrevet står skrinet etter far ved senga i stova (ei kiste med `vis`, `bilete: "inne-skrin"` og `manus: "fars_skrin"`): nærbiletet av nøkkelen, nøkkeltinga og flagget. Storebror nemner skrinet til Ivar har nøkkelen. Første gong går låsen opp (`vakt` med `opne_stabbur`), og første gong inne spelar `stabburet` (inngang på merke 1): Ivar går eitt steg inn, kjenner lukta og minnest far. Døra inne fører ut att til merke 5 framfor stabburet. Det første steget Ivar tek etter den scena (merka 2, 3 og 4 rundt ruta han står på, og merke 1 ved døra), spelar `rotta`: det raslar bak kornbingane, ei lita rotte (`vesen: "rotte-kart"`, eit bilete berre til kartet) spring fram til flatbrødbenken, snur seg (`byt` til `rotte-kart-v`) og kjem mot Ivar, og så blir det kamp mot låverotta. Etterpå er det tilfeldige rottemøte i stabburet (`fiendar` med `vis`, som held når scena er spela): ei til tre rotter eller rottemora. Rottene kan stele flatbrød frå sekken i kampen (spesial `type: "stel"`). Etter `rotta` spring rotta omkring på kartet (folk med `vesen`, `atferd: "gaa"` og `vis`). Talar Ivar til henne, spelar `rottesverm` éin gong: ho piper, fire til kjem fram frå hola, og det blir kamp mot fem smårotter (`svermrotte`, veike kvar for seg). Kampen har plass til fem fiendar, tre bak og to framme, med namna A til E.
- Vakta ved kantane (`ikkje_enno`, og `skiftebrev` med for få ord): Ivar går eitt steg attende.
- Småprat (storebror, granne og budeia) er manus med kjensler.

### Hendingane i Hovdebygda
Hovdebygda (bygda, kyrkja, prestegarden, Nedre Hovde og vegen) brukar òg scenemotoren:

- `framande2`: Den framande står ved kyrkjestien og viser fram sommarfuglane, snur seg mot kyrkja og attende. Lekpredikanten høyrer det og kjem opp til vegen. Etterpå går den framande austover vegen mot Ekset, kameraet blir ståande til han er ute av biletet, og så blir han teken bort. Han står i Dagboka.
- Kyrkja (`kyrkja`) er ei stor langkyrkje: 50 fliser frå døra til altarringen, 10 sekund å gå og om lag 6,7 sekund å springe. Våpenhus, skip, benkeblokker og tverrgangar, preikestol og døypefont framme, korskilje, og koret med eige golv, altarring og altartavle. Stemninga `kyrkjerom` gjer rommet mørkt, så altartavla (glødforma `altar`), ljosa, lysekronene og vindauga lyser. Kyrkjefolk sit i benkene (`pose: "sitje"`, `flis: "("`, benkene står i `SETE` med `fram: true`). Trappa i våpenhuset fører opp på galleriet (`kyrkje-galleri`, med utsyn ned i skipet) og vidare opp i klokketårnet (`kyrkje-tarn`). `flat: true` på eit bygg (golvet i benkene, trappa i våpenhuset, trinna til preikestolen, utsynet) legg det på golvet under figurane, utan slagskugge. Ivar kan gå opp trappa til preikestolen: `hogd: { "x,y": pikslar }` på kartet lyftar den som står på ruta (`hogdVed()` i motor.js, jamt mellom rutene; `[opp, dx]` flyttar òg sidelengs, så Ivar står midt i korga, og negative verdiar senkar figuren, så benken framfor dekkjer den nedre delen når ein går mellom benkeradene; kameraet følgjer figuren når han er lyft), og preikestolen er delt i to bilete (`preikestol-bak` bak, `preikestol` framfor). Z mot bibelen (ein usynleg person, `usynleg: true`) gir ei lita preike med svar frå kyrkjefolket. På galleriet sit organisten ved orgelet, og i tårnet kan Ivar dra i klokketauet (vesenet `klokketau`, som rykkjer med `byt`): klokka er eit vesen med ni rammer (`klokke-0` til `klokke-8`, klokke.py) som manuset byter mellom, så ho svingar mjukt ut til begge sider med `rist` og «DONG» på ytterpunkta og døyr ut, så ofte han vil. Dua på klokkestolen flyg ut gjennom lydluka ved første slaget og er attende neste gong. Vesen kan ha `stille: true`, `skugge: false` og `skuggeB` i `PNG` i pikslar.js. Løparen i skipet er 40 pikslar brei (flisene `Ł`, `l`, `ł`), og kyrkjebenkene har høg rygg og golvet i eit flatt lag, så radene står tett (unntaket for benker i STILGUIDE.md). Midtgangen i skipet er tre fliser brei med løparen midt i, og benkene er sju fliser lange. `stov: true` i stemninga gir støv som søkk i lysstrålane. `nyttOppsett: { fraH, merke }` på kartet: ei lagring frå kartet før det vart bygd om (anna høgd, eller `fraH` når lagringa ikkje har høgda) startar på merket i staden for den gamle staden (spel.js).
- `presten`: Presten kneler attmed løparen framfor altarringen (pose i kartet, så vegen til lysestaken er open). Han står opp, peikar mot prestegarden, og klokkaren kjem bort og lyttar. Ved «Kanskje litt» snur presten ryggen til Ivar (`fraa`). Valet blir hugsa i `st.val.trolldom`. Etterpå kneler presten att, og klokkaren går attende. Når blekklatten er slegen, står presten innanfor altarringen.
- `skammen` på Nedre Hovde: bestefaren talar, mora går bort til han, og dottera kjem etter. Ved feil svar snur han ryggen til, og Ivar kan prøve att.
- Småprat (bonde, kone, kremmar, lekpredikant, klokkar, tenestejente, mor, dotter, fiskar) er manus med kjensler. Folk snur seg mot det dei talar om (kona mot utmarka, tenestejenta mot kontordøra, fiskaren mot elva), og lekpredikanten peikar på Ivar.

### Hendingane i utmarka, på Ekset og i arkivet
Utmarka, Ekset (tunet og boksamlinga) og arkivet brukar òg scenemotoren:

- `huldra`: Kvinna ved setra står med ryggen til Ivar, så halen syner, og snur seg. Når ho seier kven ho er, får ho namnet Huldra (`byt`). Ho ser opp mot fjellet når ho kjenner snøen, og slår seg i lag med Ivar med `parti` og `fra`: følgjet står der ho stod.
- `haugbonde`: Vetten står framfor haugen og spør kven han er. Med rett namn får han namnet og den nye utsjånaden (`haugbonde_namn`, raud luve) i forvandlinga, gir Ivar Steinstevet, og huldra gir «auga» om ho er med. Med feil namn blir det kamp først. Huldra går fram frå bak Ivar og stiller seg attmed haugbonden før ho talar. Til slutt går han inn i haugen (`ut: true`), så han aldri blir borte midt i ein replikk.
- `tenar`: Tenaren står mellom stolane ved lesebordet. Ivar går til sides, tenaren hentar kongesoga frå hylla, gir henne til Ivar og går attende til bordet.
- `blekklatten`: Ivar går gjennom opninga i hylleveggen (merke 5). Kyrkjeboka ligg open på lesepulten. Ein dråpe renn ut av henne, biletet ristar, og dråpen veks til blekklatten (eit vesen på kartet). Etter kampen renn han saman til ein dråpe og siv ned i golvet, og Ivar går bort og les i boka.
- Småprat (gjetarguten, husmannen og kona på Ekset) er manus med kjensler. Gjetarguten ser opp mot haugen, husmannen mot trykkjeriet og kona mot hovudhuset.
- Over utmarka ligg lia (rad 0 til 12): setervegen går aust for setra opp ei rampe (27,12) til ei hylle, og over ein skrent til (rampe ved 24,5) ligg tjernet der bekken spring ut. Bekken fell over begge skrentane. Kista ytst på hylla (14,11) ser ein frå setervegen, men ein må opp rampa og over kloppa (rad 9) for å nå ho. Ho har pengar og ein ting (ei kiste kan ha begge). `nyeRader` på kartet flyttar staden i ei eldre lagring like mange rader ned.
- Bautasteinane er sette ut med vilje (`naturting` på kartet: `{ ved, bilete, manus }`), ikkje valde etter plassen: på hylla på Åsen (12,15, manus `bauta_hylla`) og ved den gamle vegen over brua i utmarka (20,24, `bauta_vegen`). Ein naturting står på ei «o»-rute (fast og med skugge), biletet frå `natur.py` kjem i staden for den tilfeldige steinen, og Ivar undersøkjer han med Z (`krokar.undersok`).

Ei dør med `vakt` stoppar Ivar på ruta når vaktmanuset har gått, også når flagget vart sett. Spelaren går sjølv vidare.

Etter ein kamp midt i ei hending er motoren pausa att, så ingen går omkring medan scena held fram.

Når den siste hendinga er slutt, går kjensler og posar bort, og kameraet glir attende til Ivar om ei scene let det stå. Sluttar ei hending medan ei anna køyrer (eit tap i den første kampen startar ei ny reise med «heime»), står motoren pausa til den siste er ferdig.

### Test
`tools/sjekk-scene.html` køyrer scenene «heime» og «framande» og eit prøvemanus. Han sjekkar at figurane går dit dei skal, at kameraet kjem attende, at val blir hugsa, og at trådar og Dagboka blir skrivne. Til sist kviler Ivar ved lampa i stova og får minnet om far på scenekartet: testen sjekkar at huldra ikkje er med, at lagring i minnet lagrar stova, og at Ivar kjem attende til same rute og retning. I «heime» sjekkar han at Ivar søv i senga, vaknar og står opp før storebror kjem. Scenestega for møblar: storebror set seg på kubbestolen og reiser seg, legg seg i senga og står opp, ein figur frå inn set seg på benken, og Ivar set seg og legg seg i ei scene. Ved bålplassen med gryte i utmarka sjekkar han at Ivar set seg ved bålet, at partiet blir friskt, og at lagringa held kartet og ruta. Sitjeplassane: Ivar set seg på benken og kubbestolen i stova, i kyrkjebenken og på stokken ved bålet, går langs benken, reiser seg når han går, kjem ikkje inn eller ut over ryggen, plassane der folk sit, er opptatte, og følgjet går aldri inn på eit sete. Han sjekkar at Ivar set seg og far peikar i minnet, at posane er lesne frå arket i fire retningar, at ein pose varer til figuren går eller hendinga er slutt, og at syster sit ved bordet att. Til slutt spelar han hendingane på Åsen: syster som gir niste, vakta ved kantane, og skiftebrevet med ein stubba kamp. Han sjekkar at syster kjem ut døra, at begge står attmed Ivar når blekket kjem, at den som talar, står på kartet, at dei går inn att og berre finst i stova, at Ivar kan gå vidare til bygda. Stabburet: før skiftebrevet er skrinet etter far ikkje i stova og døra er låst; etterpå finn Ivar nøkkelen (med nærbiletet), skrinet er tomt andre gongen, låsen går opp, scena «stabburet» blir spela første gong inne og ikkje andre gongen, og døra fører ut att framfor stabburet. Det første steget etter scena spelar «rotta» med éin kamp mot rotta, som sprang til flatbrødet og kom bort til Ivar, og rotta kjem ikkje att. Så spelar han hendingane i Hovdebygda: den framande, presten med valet «Kanskje litt», skammen med feil og rett svar, og all småpraten. Han sjekkar at lekpredikanten kjem opp til vegen, at den framande går ut av biletet, at presten peikar, snur ryggen til og kneler att, at mora og dottera går bort til bestefaren, at ingen står på same rute, og at den som talar, står på kartet. Til sist spelar han hendingane i utmarka, på Ekset og i arkivet: huldra, haugbonden med rett og feil namn, tenaren, småpraten og blekklatten med kapittelslutten. Han sjekkar at huldra snur ryggen til og blir følgjet der ho stod, at haugbonden har fargane att og går inn i haugen, at tenaren hentar boka og går attende, at dråpen veks til blekklatten, at Ivar les i kyrkjeboka, og at spelet er lagra med blekklatten slegen. Han sjekkar òg at blekkdropen kryp bort til Ivar i skiftebrevet, at huldra stiller seg attmed haugbonden, at ei hending som sluttar inne i ei anna, ikkje lèt spelaren gå, at B under ei scene ikkje gjer noko, og at ingen figurar står på same rute (følgjet, folk som går omkring, og figurar i scener som går rundt den som står i vegen). Testen brukar om lag 190 sekund virtuell tid, og `kjoyr-test.py` gir han 220 sekund som standard. Eit mykje større budsjett kan gjere at Edge brukar minutt på resten etter testen. `RPGTest.iHending()` seier om ei hending køyrer. `tools/sjekk-kyrkjegang.html` (`python tools/kjoyr-test.py tools/sjekk-kyrkjegang.html 60000`) måler tida frå døra i kyrkja til altarringen, gåande og springande, og sjekkar at Ivar kjem opp trappa til galleriet og tårnet og ned att. `node tools/sjekk-spel.js` sjekkar at scenene viser til ting som finst, og at kvar figur som talar, går, snur seg, får pose eller kamera, finst på kartet der manuset blir spela (folk i kartet, merke, folk frå `inn`, nye namn frå `byt`, og folka på scenekart). Elles gir motoren null, og steget blir stilt hoppa over. Manus blir knytte til karta gjennom folk, inngangar, vakter, kister med manus og kvile, og scener gjennom manusa som spelar dei.

### Neste steg for scenemotoren
Alle hendingane i prototypen brukar no scenemotoren, og dei som talar, står på kartet. Det som står att:
- Eit nærbilete av skiftebrevet (og av sida i kyrkjeboka med namnet til far), så blekket kan syne seg på papiret før det renn ut.
- Storebror og syster har ingen nye replikkar etter skiftebrevet, og folka i bygda seier det same etter blekklatten. Nokre få nye linjer ville gjere verda meir levande.
- Ei scene som må halde på folk frå `inn`-steg etter eit scenekart, treng at motoren hugsar folka på kartet før scena.
- Følgjet går attende til plassen bak Ivar først når han går. Eit steg som set følgjet attende (`{ gaa: "Huldra", bak: true }` eller liknande) ville gjere det reinare etter scener der huldra har gått fram.
- Kampane er stubba i sjekk-scene.html. Ein test som køyrer den ekte rettleiingskampen inne i skiftebrevet, manglar.

## Skrift, vindauge og tekst i manus

### Skriftene
Spelet har to eigne pikselskrifter, teikna for hand glyf for glyf til dette spelet (Claude Opus 5.5, 2026). Dei er ikkje kopierte frå andre skrifter. Pixelify Sans (OFL) ligg att berre som reserve for teikn som manglar.

| Skrift | Kjelde | Innhald |
|---|---|---|
| Spelskrift | `tools/skrift/spelskrift.txt` | latinske bokstavar, tal og teiknsetjing, Æ Ø Å, « » „ " – … ⟪ ⟫, dei norrøne Þ Ð Ǫ Œ Ę Ǽ Ǿ (store og små) og vokalar med akutt, ♪ ♫ ▼ ✓ |
| Runeskrift | `tools/skrift/runeskrift.txt` | runeblokka U+16A0 til U+16FF: den eldre futharken, den yngre (langkvist og stuttkvist), punkterte runer og skiljeteikna ᛫ ᛬ ᛭ |

Kjeldene er rutenett per glyf (`#` er ein piksel, formatet står øvst i fila). Store bokstavar er 9 pikslar høge, små 6, med 3 pikslar under grunnlina og plass til aksentar over. Samansette glyfar (`glyf á = a + akutt`) set merket over basen. Kerning står nedst i spelskrift.txt (`kern T @smaa -1`).

`python tools/skrift/bygg.py` byggjer `fonts/spelskrift.woff2` og `fonts/runeskrift.woff2` (og `.ttf`) med fontTools (`pip install fonttools brotli`). Kvar piksel blir eit kvadrat på 128 einingar (16 pikslar per em), og omrisset blir spora rundt flatene. Skripta lagar òg prøveark: `tools/skrift/provark-spelskrift.png` (alle glyfane) og `provark-spelskrift-tekst.png` (prøvetekst sett med sjølve fila), og det same for runeskrift.

### Skarpe pikslar
Alt i vindauga blir målt i skriftpikslar: `--fp` er éin piksel i skrifta, eit heilt tal skjermpikslar (om lag 2 CSS-pikslar, eller 2/3 av spelpikselen på store skjermar). Skrifta er `16 × --fp` og linene `15 × --fp`. `Motor.tilpass` (tilpassUI) set `--fp`, portrettskalaen `--kp`, staden til lerretet (`--lx`, `--ly`, `--lb`, `--lh`) og samtaleboksen (`--tale-x/y/b/h`), alt på heile skjermpikslar. Midtstilte vindauge blir flytta til næraste heile piksel (`snapp`). Windows glattar ut tekstkantar sjølv når glyfane står rett, så tekstelementa har filteret `#skarp` (i spel.html): kvar piksel blir heilt dekt eller open, og skuggen blir lagd éin skriftpiksel nede til høgre. Tekst på lerretet (skadetal, ord som blir kasta) blir teikna med Spelskrift i 16 px på eit eige lerret og gjord skarp på same vis (`pikselTekst` i kamp.js).

Vindauga har pikselramma `bilete/spel/ui/ramme.png` (border-image, kjelde `tools/pikselkunst/kjelder/ui-ramme.pix`, i gull og raudt for spørsmålet i kampen), og peikarhanda `bilete/spel/ui/peikar.png` (`ui-peikar.pix`).

### Samtaleboksen
Boksen har fast storleik: namnelina og fire tekstliner (eller portrettet, om det er høgare), og står nedst på lerretet. Heile replikken blir lagd ut med kvart teikn i eit span frå starten, og teikna som ikkje er skrivne enno, er usynlege. Difor blir lina broten på same stad frå første til siste bokstav, og boksen endrar seg ikkje. Ein replikk som treng meir enn fire liner, blir delt i sider (▼ og Z for neste side). `python tools/kjoyr-test.py tools/sjekk-tale.html 90000` sjekkar dette og tel liner i alle replikkane i manus.

### Vindauga i kampen og lister
Alle vindauga i kampen har fast storleik, som i FF6: meldinga øvst er éi line over heile breidda, fiendane og partiet har plass til fem og fire, kommandoane og «Kven?» står i eit smalt vindauge med fem rader, og listene (Galdr, Song, Ting, Stev) i eit breitt vindauge med to kolonner og fire rader og skildringa av det som er valt på éi fast line. Sigeren viser to liner om gongen: kvar Z gir ei ny line, og den eldste går ut øvst.

Listene er `Motor.liste(el, alt, { rader, kolonner })`: berre ruta som syner, blir teikna, så lista er like rask med 100 ord. Peikaren rullar lista ved kanten, ▲ og ▼ syner når det er meir over eller under, opp frå første rad går til siste ord, og ned frå siste rad til første. Val i samtaleboksen (`Motor.val`) brukar same lista med høgst fem rader. Menyen (Ordboka, Ting, Galdr, Stev) blar ei side om gongen med venstre og høgre, med ▲ og ▼. `python tools/kjoyr-test.py tools/sjekk-kamp-ui.html 90000` gir Ivar 100 ord og sjekkar at peikaren når første og siste ord, og at ingen vindauge i kampen endrar storleik, heller ikkje i ein siger med 18 liner.

### Norrønt og runer i manus
| Skriv | Blir |
|---|---|
| `⟪ord⟫` | ord Ivar lærer, i gull |
| `⟨Þat skal æ uppi⟩` | norrøn tale inne i ein replikk (eigen farge) |
| `{ s: "Vetten", t: "…", norront: true }` | heile replikken er norrøn tale |
| `⟦ᚱᛅᛁᛋᛏᛁ᛫ᛋᛏᛅᛁᚾ⟧` | runer i Runeskrift (raud oker, slik runesteinane var måla) |

Dei norrøne bokstavane (þ ð ǫ œ ę á é í ó ú ý ǽ ǿ) finst i Spelskrift og kan skrivast rett i teksten. Runer utan `⟦ ⟧` blir òg viste med Runeskrift, men utan fargen. Merka verkar i replikkar, val, forteljing (`fort`), nærbilete og kort. Døme: bautaen på hylla (`bauta_hylla`) viser dei utviska runene.
