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
| `ut: true` | på eit gaa-steg: figuren blir borte når han er framme (inn ei dør, ut over kanten). Saman med `ikkjeVent` kan spelaren gå medan han går |
| `fart: 300` | ms per flis på eit gaa-steg |
| `{ snu: "Namn", retning: "opp" }` | snur seg (ned, opp, venstre, høgre), eller `mot: "Namn"`. Kjensla går bort når figuren snur seg |
| `{ snu: "Namn", fraa: "Ivar" }` | snur ryggen til nokon |
| `{ pose: "Namn", p: "knele" }` | pose: knele, sitje, peike, liggje eller sove (sjå under). `p: null` tek han bort |
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
- **Lyskjelder** (`LYSKJELDER` i `data.js`): grua og kakkelomnen (der elden i `Pikslar.ILD` er), ljos (`L` inne), lykter (`L` ute, og `T`, som er ei lykt utan kvileplass), peis (`f`) og lysekrona. Kvar type har si eiga handteikna glødform i `bilete/spel/lys/<namn>.png` (laga med `tools/pikselkunst/glod.py`): fargen i biletet er trinnet (1 til 3), og den magenta pikselen er ankeret der kjelda er. Motoren gjer kvar ramme om til strekar éin gong og stemplar dei inn i lysnivåa. Formene har to eller tre flimmerbilete som blir bytte i same takt som elden (150 ms, rekkjefølgja står i `rekkje`), og fargane i gløden går òg på rundgang. Ljoset rundt Ivar i arkivet (`ivar: true`) og skyskuggane (`sky`) er glødformer på same måten.
- **Scenesteg:** `tone`, `blink` med `rgb` og `spot` (sjå tabellen over). `ton` til svart og kvitt går i 16 trinn.
- **Fjernt (nivå 5):** pikslane der bakgrunnslaga syner (sjå «Parallakse og terreng»), får `fjern` frå stemninga (eller `bak` om han manglar) og hdma, men ingen skyskugge og ingen glød. Luftperspektivet (dis, lysare og kaldare fargar) er måla inn i bileta.

### Parallakse og terreng
Åsen er ein ås med høgd, som klippene over Narshe i Final Fantasy VI og toppen av pyramiden i A Link to the Past: kartet er delt i nivå med bakkekantar, og nedst fell åsen bratt ned mot utsikta over Hovdebygda, som er eigne bakgrunnslag som flyttar seg saktare enn kartet.

- **Fliser:** `s` er ein skrent (bakkekanten mellom to nivå, sett framanfrå: graskledd skråning med jord og bergnabbar, slagskugge på graset under). Han flatar ut der han møter open mark eller ei rampe. `/` er ei rampe: stien gjennom skrenten, med trinn (ein kan gå der). `M` er stupet: bergveggen nedst, som løyser seg opp i dis i den nedste rada. `-` er luft: ingen bakke, ikkje gangbar, og bakgrunnen syner gjennom. Under eit stup er det meir stup eller luft, og under luft er det luft (`sjekk-spel.js` sjekkar det). Teikninga er `Pikslar.skrent`, `Pikslar.underSkrent`, `Pikslar.rampe` og `Pikslar.stup`.
- **Bakgrunnslag** (`parallakse` på kartet): `[{ bilete, faktor, ved: [kx, ky], x, y }, …]`, det fjernaste først. `bilete` er namnet på fila i `bilete/spel/parallakse/` (laga med `tools/pikselkunst/utsikt.py`). `x` og `y` er der øvre venstre hjørne står på skjermen (pikslar) når kameraet står med øvre venstre flis på `ved`, og laget flyttar seg `faktor` (eit tal eller `[fx, fy]`) så langt som kartet. Posisjonen blir runda til heile pikslar for seg, og han er ein monoton funksjon av kameraet (som òg står på heile pikslar og går i tikk), så ingenting ristar fram og attende. `luftfarge` fyller skjermen under laga. Laga blir berre teikna innanfor kartet.
- **Fast lag og variantar:** eit lag med faktor 1 står fast i terrenget (lia under stupet på Åsen). Eit lag med `variant: "namn"` blir berre teikna når kartet har `variant: "namn"` (standard «fast»). Åsen har `variant: "fast"` (lia som fast lag); `variant: "dal"` gir ei kortare li (`li-kort`) og dalbotnen med Hovdebygda (`dal-under`, faktor `[1, 1.8]`), som stig fram nedanfrå raskare enn kartet når kameraet glir ned. Sjå den med `skjermbilete.py namn kart=asen m=1 x=12 y=13 variant=dal`.
- **Forgrunn** (`forgrunn` på kartet): same format, med faktor over 1, teikna etter alt anna (før lyset). Bjørkegreiner i øvre hjørne når kameraet står øvst, høgt gras i nedre hjørne når det står nedst ved stupet. Dei går fort ut av biletet når kameraet flyttar seg.
- **Utsikt for kameraet** (`kameraNed: { fra, til, rader }`): når målet for kameraet går frå rad `fra` ned til rad `til`, glir kameraet jamt lenger ned, til `rader` rader (standard `(til - fra) / 2`). Når `rader / (til - fra)` er eit halvt tal, går farten opp i heile pikslar (spelaren 2 pikslar per tikk, kameraet 3 eller 5). `kameraOpp: { fra, til, rader }` er det same oppover: over rad `fra` ser kameraet opp til `rader` rader over kartet, der det er luft. Kanten der bakken fell bort er rad 0 og alle `N`-fliser (som har luft over seg); `Pikslar.nordkant` bøyer kanten ned mot sida der det er luft. Laga for utsikta øvst har `opp: true`.
- På Åsen: toppen er lengst oppe på midten, og kanten fell eit steg ned mot sidene. Øvst ser ein ut som i Narshe, i fire lag med kvar sin fart: himmelen (`himmel`, faktor 0,04), fjella (`fjell`, 0,1), lia opp mot utmarka med setra til venstre og Hovdebygda med kyrkja til høgre (`dal-nord`, 0,3), og nærast trekronene i lia under kanten (`naer`, 0,6), som glir fort og søkk bak kanten når kameraet går ned. Kameraet kan sjå seks rader over kartet. Nedst glir kameraet 3 rader ned dei to siste radene mot stupet, så Ivar står øvst på skjermen, og under stupet stuper lia vidare som eit fast lag som følgjer kartet (`li`, faktor 1): ein høg bergvegg før den første hylla, berghyller med gras, kratt og bjørk, ein ny bergvegg og bratt skog som går over i dis (ingen flat dalbotn, som glei feil med parallaksen). Minnet om far (`minne-far`) har same lia under stupet.

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

- `heime`: storebror går bort til Ivar. `framande`: den framande gir ordboka og går opp vegen.
- `syster_kake`: syster står opp frå bordet, gir Ivar flatbrød og set seg att.
- Tunet ligg på midtnivået under toppen: to kollar med skog, og stien til kantdøra mot utmarka (10,0) går i søkket mellom dei, litt til venstre (rampa på (10,1)). Bøen med åkeren og stabburet ligg under ein skrent til (ramper ved x 8 og x 24). Nedst er stupet og utsikta.
- `skiftebrev`: den første kampen. Ivar står ved kanten mot bygda. Kameraet går til stova, der syster kjem ut døra med brevet og ropar, og følgjer henne bort til Ivar. Storebror kjem etter, og Ivar snur og går eitt steg attende frå skogkanten, så dei tre står saman på vegen. Biletet ristar, blekket renn ut av brevet og blir ein dråpe på tunet (`Blekkdropen`, eit vesen), som kryp bort til Ivar, og kampen byrjar. Etter kampen er dropen borte. Etterpå står dei attmed Ivar og talar, og så går dei inn att i stova (`ut: true`) medan spelaren kan gå. Dei er berre med i stova på kartet, så dei er aldri to stader.
- Stabburet (`asen-stabbur`): døra (18,10) har `krev: "stabburnokkel"` og er låst til Ivar har funne nøkkelen. Etter skiftebrevet står skrinet etter far ved senga i stova (ei kiste med `vis`, `bilete: "inne-skrin"` og `manus: "fars_skrin"`): nærbiletet av nøkkelen, nøkkeltinga og flagget. Storebror nemner skrinet til Ivar har nøkkelen. Første gong går låsen opp (`vakt` med `opne_stabbur`), og første gong inne spelar `stabburet` (inngang på merke 1): Ivar går eitt steg inn, kjenner lukta og minnest far. Døra inne fører ut att til merke 5 framfor stabburet.
- Vakta ved kantane (`ikkje_enno`, og `skiftebrev` med for få ord): Ivar går eitt steg attende.
- Småprat (storebror, granne og budeia) er manus med kjensler.

### Hendingane i Hovdebygda
Hovdebygda (bygda, kyrkja, prestegarden, Nedre Hovde og vegen) brukar òg scenemotoren:

- `framande2`: Den framande står ved kyrkjestien og viser fram sommarfuglane, snur seg mot kyrkja og attende. Lekpredikanten høyrer det og kjem opp til vegen. Etterpå går den framande austover vegen mot Ekset, kameraet blir ståande til han er ute av biletet, og så blir han teken bort. Han står i Dagboka.
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

Ei dør med `vakt` stoppar Ivar på ruta når vaktmanuset har gått, også når flagget vart sett. Spelaren går sjølv vidare.

Etter ein kamp midt i ei hending er motoren pausa att, så ingen går omkring medan scena held fram.

Når den siste hendinga er slutt, går kjensler og posar bort, og kameraet glir attende til Ivar om ei scene let det stå. Sluttar ei hending medan ei anna køyrer (eit tap i den første kampen startar ei ny reise med «heime»), står motoren pausa til den siste er ferdig.

### Test
`tools/sjekk-scene.html` køyrer scenene «heime» og «framande» og eit prøvemanus. Han sjekkar at figurane går dit dei skal, at kameraet kjem attende, at val blir hugsa, og at trådar og Dagboka blir skrivne. Til sist kviler Ivar ved lampa i stova og får minnet om far på scenekartet: testen sjekkar at huldra ikkje er med, at lagring i minnet lagrar stova, og at Ivar kjem attende til same rute og retning. Han sjekkar at Ivar set seg og far peikar i minnet, at posane er lesne frå arket i fire retningar, at ein pose varer til figuren går eller hendinga er slutt, og at syster sit ved bordet att. Til slutt spelar han hendingane på Åsen: syster som gir niste, vakta ved kantane, og skiftebrevet med ein stubba kamp. Han sjekkar at syster kjem ut døra, at begge står attmed Ivar når blekket kjem, at den som talar, står på kartet, at dei går inn att og berre finst i stova, at Ivar kan gå vidare til bygda. Stabburet: før skiftebrevet er skrinet etter far ikkje i stova og døra er låst; etterpå finn Ivar nøkkelen (med nærbiletet), skrinet er tomt andre gongen, låsen går opp, scena «stabburet» blir spela første gong inne og ikkje andre gongen, og døra fører ut att framfor stabburet. Så spelar han hendingane i Hovdebygda: den framande, presten med valet «Kanskje litt», skammen med feil og rett svar, og all småpraten. Han sjekkar at lekpredikanten kjem opp til vegen, at den framande går ut av biletet, at presten peikar, snur ryggen til og kneler att, at mora og dottera går bort til bestefaren, at ingen står på same rute, og at den som talar, står på kartet. Til sist spelar han hendingane i utmarka, på Ekset og i arkivet: huldra, haugbonden med rett og feil namn, tenaren, småpraten og blekklatten med kapittelslutten. Han sjekkar at huldra snur ryggen til og blir følgjet der ho stod, at haugbonden har fargane att og går inn i haugen, at tenaren hentar boka og går attende, at dråpen veks til blekklatten, at Ivar les i kyrkjeboka, og at spelet er lagra med blekklatten slegen. Han sjekkar òg at blekkdropen kryp bort til Ivar i skiftebrevet, at huldra stiller seg attmed haugbonden, at ei hending som sluttar inne i ei anna, ikkje lèt spelaren gå, at B under ei scene ikkje gjer noko, og at ingen figurar står på same rute (følgjet, folk som går omkring, og figurar i scener som går rundt den som står i vegen). Testen brukar om lag 155 sekund virtuell tid, og `kjoyr-test.py` gir han 190 sekund som standard. Eit mykje større budsjett kan gjere at Edge brukar minutt på resten etter testen. `RPGTest.iHending()` seier om ei hending køyrer. `node tools/sjekk-spel.js` sjekkar at scenene viser til ting som finst, og at kvar figur som talar, går, snur seg, får pose eller kamera, finst på kartet der manuset blir spela (folk i kartet, merke, folk frå `inn`, nye namn frå `byt`, og folka på scenekart). Elles gir motoren null, og steget blir stilt hoppa over. Manus blir knytte til karta gjennom folk, inngangar, vakter, kister med manus og kvile, og scener gjennom manusa som spelar dei.

### Neste steg for scenemotoren
Alle hendingane i prototypen brukar no scenemotoren, og dei som talar, står på kartet. Det som står att:
- Eit nærbilete av skiftebrevet (og av sida i kyrkjeboka med namnet til far), så blekket kan syne seg på papiret før det renn ut.
- Storebror og syster har ingen nye replikkar etter skiftebrevet, og folka i bygda seier det same etter blekklatten. Nokre få nye linjer ville gjere verda meir levande.
- Ei scene som må halde på folk frå `inn`-steg etter eit scenekart, treng at motoren hugsar folka på kartet før scena.
- Følgjet går attende til plassen bak Ivar først når han går. Eit steg som set følgjet attende (`{ gaa: "Huldra", bak: true }` eller liknande) ville gjere det reinare etter scener der huldra har gått fram.
- Kampane er stubba i sjekk-scene.html. Ein test som køyrer den ekte rettleiingskampen inne i skiftebrevet, manglar.
