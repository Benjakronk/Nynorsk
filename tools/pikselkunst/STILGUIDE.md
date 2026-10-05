# Stilguide for pikselgrafikken i «Aasen: Språkvandringa»

Målet er 16-bits rollespel frå 90-talet, i same stil som Blekklatten
(`bilete/spel/blekklatten.png`, laga av Claude Opus 5.5). Han er målestokken.
Alt nytt skal kunne stå ved sida av han utan å skilje seg ut.

## Storleikar

| Type | Storleik (spelpikslar) | Vist i spelet |
| --- | --- | --- |
| Flis | 16 × 16 | lerretet er 320 × 192, skalert opp med heile tal |
| Figur på kartet og i kamp | 16 × 24 | på kartet teikna 12 pikslar over flisa, så føtene står midt i nedre halvdel (på vegen, ikkje på graskanten) |
| Portrett i samtaleboksen | 48 × 48 | tre gonger så stort (144 × 144) |
| Vanleg fiende | 20 × 20 til 48 × 48 | i kampen, føtene på bakken |
| Boss | opptil 96 × 80 | Blekklatten er 80 × 72 |

Éin spelpiksel er éin piksel i PNG-fila. Aldri skaler opp i fila.

## Fargar

- Kvart materiale (hud, hår, jakke, blekk) har ein skala på tre til fem tonar.
- Skuggane dreg mot djup fiolett (`#1a1238`), lyset mot varm kvit (`#fff1c4`).
  Ein skugge er aldri berre ein mørkare versjon av same fargen.
- Omrisset er nesten svart (`#0a0514`), éin piksel, rundt heile figuren.
  Inne i figuren skil ein flater med den mørkaste tonen i skalaen, ikkje med svart.
- Blekket: `#080010 #101028 #201848 #383070 #5848a0 #8878d0`, auge `#f8d840 #c06810`.
- Hud: `#6e3c46 #a8624e #d8926a #f0b890 #fcd8b4`.
- Maks fargar per bilete: flis 16, figur 24, fiende 32, portrett 40.

## Lys og form

- Lyset kjem alltid frå oppe til venstre.
- Flater, ikkje glidande overgangar (cel-skugge): tydelege felt med éin tone kvar.
  Ingen «putesmykking» (skugge langs alle kantar og lys i midten).
- Dithering (rutemønster mellom to tonar) berre på store flater og sparsamt.
- Ingen einsame pikslar som ikkje høyrer til ei flate (støy).
- Silhuetten skal vere lesbar i full storleik 1:1, også utan fargar.

## Portrett

Etter Final Fantasy VI (Advance) og Fire Emblem på GBA:

- Kvar person har sin eigen silhuett og eit kjenneteikn. Ivar: andletet til ein ung Ivar Aasen
  (sjå fotografia i konsept/: langt, breitt og rektangulært andlet, høg panne, brei, kantete kjeve og
  hake, lang og brei nase, lang overleppe, brei og rett munn, små, djupe auge under tunge augelok,
  store øyre), ustyrleg mørkt hår, fjørpenn oppå øyret, fregner, sekkeband. Storebror: stuttklypt sandhår, skjeggstubb,
  strå i munnen. Huldra: gullhår over kanten, blomekrans. Den framande: flosshatt,
  briller som blenkjer. Presten: pipekrage. Haugbonden: mosehatt, lysande auge.
  Aldri palettbyte av ei felles grunnform.
- Tre kvart mot høgre, byste med skuldrer. Hatt og hår kan gå ut over kanten.
- Andletsforma fortel alder og lynne: rundt barneandlet, kantete kjeve, spiss hake,
  tunge kjakar. Auga og bryna ber personlegdomen (store, smale, milde, knipne).
- Farga omriss (mørkaste tonen i materialet), ikkje svart. Ljos framanfrå (frå høgre),
  skugge mot øyret og under haka. Raudme i kinna med ein mjuk tone, ikkje rosa.
- Berre viktige personar får eige portrett. Småroller brukar eitt av fem
  fellesansikt (`bygd-mann`, `bygd-kvinne`, `bygd-gamal-mann`, `bygd-gamal-kone`,
  `bygd-gut`), som er nøytrale og utan kjenneteikn.
- Alle portretta blir teikna i `portrett.py`, éin funksjon per person.
- Kjensler i portrett: same namn som i figurarka (glad, trist, sint, sjokk, tenkje, nikk og
  eigne). Endre auge, bryn og munn, og legg til ting som fortel (tåre, hand under haka, bok).
- **Berre hovudpersonane (Ivar og Huldra) har kjensleportrett (runde 81).** Alle andre har eitt
  portrett med eit uttrykk som passar rolla, og figuren på kartet viser kjensla (kjensleramene i
  figurarket). Ein `kjensle` i manus på ein av dei andre viser det vanlege portrettet.
- Kvart portrett har ein eigen bakgrunn inne i ruta (`P.bak`) som passar personen: løa bak storebror,
  tømmerveggen i stova bak syster, skogen i dis bak Huldra (Ivar er gjennomsiktig).

## Portrett i FF6-stil (runde 60)

Målt i portretta frå Final Fantasy VI Advance (`forhand/referansar/ff6a-portrett.png`: Terra, Locke,
Edgar, Celes, Relm). Huldra og Ivar er teikna etter dette; dei andre portretta står att.

- **Storleik og utsnitt:** FF6 har om lag 32 × 40 (34 × 34 synleg i arket), tett utsnitt der hovudet
  fyller nesten heile ruta og skuldrene berre så vidt kjem med. Vi held på 48 × 48 (vist 144 × 144;
  vurdert på nytt i runde 63: rolege flater, ikkje fleire pikslar, var det som mangla),
  men brukar plassen til fleire tonar og finare auge, ikkje til å vise meir av kroppen: hovudet er om
  lag 28 pikslar høgt (panne til hake), skuldrene er dei nedste 8 til 10 radene, og håret går ut over
  kanten.
- **Fargar:** FF6 har 15 fargar per portrett (16 med gjennomsiktig). Vi tillèt 40, fordelt slik:
  hud 6 (tonen 0 er omrisset), hår 6, iris 4 til 5, augekvite 3, lepper 3, klede 3 til 4 per plagg.
- **Hud (runde 63):** tre til fire tonar i store, samanhengande flater, som i FF6: ei stor lys flate mot
  ljoset (frå høgre), ei smal mellomtone på 2 pikslar, og ei jamn skuggeside mot øyret og under kjeven.
  Ingen glanspunkt, lyse flekker eller små felt på kinn og nase: i spelstorleik bryt dei opp andletet.
  Fregner og raudme er i ein tone like ved huda (fregner i mellomtonen, raudme som éi stripe på 3
  pikslar).
- **Nasa** blir berre antyda: ryggen er den lyse grunnflata, med mellomtonen på skuggesida, eit nasebor
  og ein liten skugge under. I nesten-profil (Ivar) stikk tippen 1 piksel ut over profilen.
- **Vinkel:** tre kvart framanfrå (som Terra og Celes) når begge auga skal tale, som hos Huldra: det nære
  auget 7 pikslar breitt, det fjerne 5, nasa mellom dei og munnen inne i andletet, ikkje på kanten.
  Nesten-profil (Ivar) passar for ivrige personar som ser fram mot teksten. Andletet og profilen blir
  handplasserte rad for rad (`kantar` i portrett.py).
- **Munn:** leppene i ein dempa rosetone, overleppa som ei line i den mørke tonen, underleppa 2 til 3
  pikslar i ein lysare tone. Kjensla blir lesen av munnvikane.
- **Uttrykk med få pikslar (runde 69):** som i FF6 ber bryna, augeloka og munnvikane kjensla. Ved trist,
  sint og tenkje blir bryna to pikslar tjukke i den indre halvdelen, og dei hallar tydeleg (trist: indre
  ende opp, sint: indre ende ned, tenkje: det eine brynet høgt). Munnvikane flyttar seg ein til to
  pikslar (ned ved trist, samanbitne lepper ved sint, munnen trekt til sida ved tenkje). Sjekk alltid i
  spelstorleik.
- **Andletsform i tre kvart:** kjeven er ei jamn, skrå line frå øyret ned til ei smal hake, og
  skuggesida følgjer kjeven (ikkje ei loddrett grense). Øyret sit bak kjeven, i høgd med auga og nasa,
  4 til 5 pikslar breitt, og ikkje så langt fram at det rører det nære auget. Kinnet bular berre litt
  ut, med mellomtonen langs kanten.
- **Håret bak hovudet** syner ved halsen og langs kinna, eitt steg mørkare enn håret framme
  (`skugge=1, botn=0`), så andletet ligg framfor ei mørk hårramme og ikkje rett mot bakgrunnen.
- **Hår i lokkar med glans:** håret er klumpar på 3 til 5 pikslar, kvar med mørk kant mot naboen,
  grunntone og lys side mot ljoset. Glansen ligg som korte striper langs lyssida, samla i ein ring
  over issen og på bylgjene, ikkje som spreidde prikkar. Tuppane er ujamne, og nokre lause strå bryt
  silhuetten. I koden: `lokk()` (éi lokk langs ei midtline) og `harflak()` (eit flak av lokkar mellom
  to kantliner, teikna frå skuggesida mot lyssida, så den mørke kanten på kvar lokk ligg over lyssida
  på den førre). Håret bak hovudet har færre lyse pikslar (`lys=0.55`) og les difor som lenger bak.
- **Auge:** tjukk vippeline (to rader ved den ytre kroken), augekvite i to tonar (skugge under loket),
  iris 3 × 3 i tre tonar med mørk pupill øvst og lysare nedst, og éin kvit glanspiksel. Det fjerne
  auget er 4 til 5 pikslar breitt. Augelokfaldet er ei line i skuggetonen over auget. Bryna er tynne liner i
  den mørke hårtonen.
- **Lys:** framanfrå og ovanfrå (frå høgre, mot teksten). Lyssida et omrisset litt: der huda er lys
  inntil kanten, blir omrisset den nest mørkaste tonen (`selout()`).
- **Omriss:** farga (den mørkaste tonen i materialet), aldri svart. FF6 brukar mørkegrått.
- **Dithering:** ikkje i andletet. Berre i bakgrunn og dis, og då sparsamt.
- **Bakgrunn:** vanlegvis gjennomsiktig (samtaleboksen syner bak). Overnaturlege vesen kan få ein
  eigen stemningsbakgrunn inne i ruta (`P.bak`, under omrisset), som skogen i dis bak Huldra.

### Variasjon i hovudform og auge (runde 84)

FF6 skil Terra, Locke, Edgar, Sabin, Strago og Relm like mykje på andletsforma og auga som på håret:
Relm har eit rundt barneandlet med store, runde auge og mykje glans, Cyan og Strago lange, magre andlet
med djupe auge og rynker, Sabin ein brei, kantete kjeve. Hos oss gjeld dette:

- **Ingen deler omriss.** Kvar person får si eiga andletsform frå `kant()` i portrett.py: breidd (`xl`, `xr`),
  lengd (`y0`, `y1`), kor rund issen er (`krune`), kor langt nede kjeven byrjar (`kjeve`), kjeveforma
  (`kantete`, `rund`, `oval`, `spiss`), haka (`hake`), kinn som bular ut (`kinn_ut`) eller er innsokne
  (`kinn_inn`), og `ujamn` for knudrete former. Forma skal passe alder og rolle:
  - kantete kjeve og brei hake: storebror, bygdemannen
  - rundt med kort hake og runde kinn: syster, guten (mindre enn dei vaksne), budeia (breiare), grannen og kona
  - langt og smalt med høg panne: presten, den gamle mannen (innsokne kinn)
  - tynt og innsokke med spiss hake: den framande
  - breitt og knudrete: haugbonden
- **Samanlikn silhuettane:** teikn berre hudpikslane i éin farge for alle personane side om side. Om to
  silhuettar er like, er forma ikkje skild nok, same kor ulikt håret er.
- **Vakne auge.** Irisen skal syne i minst to rader, med glanspiksel (`h`), og loket skal ikkje skjere
  irisen på midten. Halvlukka, tunge lok berre når personen skal sjå trøytt, kald eller lur ut (den
  framande). Rolege, alvorlege auge (storebror) får eit rett lok, men heile irisen.
- **Alder i auga:** unge får store, runde auge med mykje kvitt og glans (syster, guten). Gamle får
  posar under auget og smilerynker eller kråkefot ved den ytre kroken (`r` i augerutene, huda tone 3),
  ikkje tunge lok. Glade auge: det nedre loket bular opp (`l` på sidene av irisen i den nedste rada).
- **Karakter i auga og bryna:** bekymra (presten) har den indre enden av bryna løfta og loket hallande ned
  mot den ytre kroken, kalde (den framande) eit smalt auge med bleik, isblå iris og rett, lågt bryn.
  Varier blikkretninga òg: mot teksten, opp (guten), litt ned (bygdekvinna, kona).
- **Augefarge (runde 85):** varier irisfargen over heile galleriet, truverdig for Vestlandet: blå, grå,
  blågrå, bleik grå hos gamle, brun, hasselbrun og grøn. Sysken kan dele farge (syster har `iris_iv` som
  Ivar). Overnaturlege vesen og kalde figurar kan skilje seg ut (haugbonden lyser, den framande er isblå).
- **Hol i håret:** `python tools/pikselkunst/portrett.py hol` finn bakgrunn som syner gjennom hår eller
  hovudplagg (lukka hol og smale hakk). Når andletet blir smalare eller kjeven kortare, må håret i
  nakken eller halsen fylle opp bak kjeven (budeia og den framande). Opningar som skal vere der, står i `HOL_LOV`.

## Lærdommar frå Final Fantasy VI og The Minish Cap

- Hus er heile figurar, ikkje gjentekne fliser. Taket dominerer (tre fjerdedelar
  av høgda), har tjukt utheng og kastar skugge ned på veggen. Sjå `bygg.py`.
- Ting som står på bakken (hus, tre, steinar), har slagskugge mot høgre og ned
  og mørkt omriss. Bakken sjølv har ikkje omriss.
- Tekstur blir laga med klyngjer i fast mønster (tuster, klumpar, stokkar),
  ikkje med tilfeldige enkeltpikslar.
- Lyse, varme fargar i lyset og kjølige, blågrøne i skuggen. Taket og bakken
  skal ha ulik farge, elles glid huset inn i graset.
- Final Fantasy VI har mørkare, tettare tekstur og portrett ved sida av teksten.
  The Minish Cap har lysare fargar, store runde tretoppar og tydelege former.

## Standardperspektiv for objekt (runde 56)

Objekt (møblar, kister, benker, fontar, tønner, gjerde) blir sett frå ein høg vinkel, som i Final
Fantasy VI og The Minish Cap: toppflatene er store og tydelege, og framsidene er korte og forkorta.
Målt i FF6 (`forhand/referansar/ff6-0055.png`, borda i Figaro, og `ff6-0031.png`, senga i Narshe),
i spelpikslar:

| Objekt i FF6 | Toppflate | Framside | Bein eller sokkel |
| --- | --- | --- | --- |
| Bord, 3 fliser breitt | 13 | 5 (skuffer) | 4 |
| Seng | om lag 3/4 av høgda (madrassen) | 4 (fotbrett) | 0 |

- **Regelen:** for eit objekt med djupn éi flis (16 pikslar) skal toppflata vere 9 til 13 pikslar og
  framsida 4 til 6 pikslar, altså om lag 2 til 2,5 gonger så mykje toppflate som framside. Bein og
  sokkel er korte (2 til 4 pikslar). Ein høg ting (skap, preikestol, altartavle, klokkestol) kan ha
  lang framside, men toppflata syner òg der.
- **Runde ting** (fat, font, tønne, brønn): opninga eller toppen er ein brei oval som er 2/5 til 1/2 så
  høg som han er brei, og sida under er kort.
- **Rekkverk og balustradar:** handlista er ei brei toppflate (4 til 5 pikslar), balustrane korte (5 til
  6 pikslar).
- **Unntak: benker med rygg** (kyrkjebenkene, runde 58) har høg rygg sett bakfrå (13 pikslar), så
  dei passar med folka som sit i dei. Golvet i benken ligg som eit flatt lag (`flat: true`) over heile
  benkerada, så radene står tett utan golv imellom. Den som går i benkerada, er senka litt med `hogd`
  (5 pikslar), så setet og ryggen framfor dekkjer føtene, og dei som sit, er lyfte lite (`SETE` hogd 2),
  så hovudet til den som står bak, syner over dei.
- **Trapper ein går i** (trappa til preikestolen): trinna er eit flatt lag under figuren, med brei, lys
  tråflate og kort, mørk framside, og rekkverket er laget framfor. `hogd` følgjer trinnet under føtene.
- Gjeld nye objekt frå no av. Eldre objekt med for låg vinkel står i ARBEIDSLOGG.md (runde 56).

## Norsk byggjeskikk, natur og kle (sjå konsept/)

- Torvtak: solbleikt olivengrønt og gult om sommaren, med tuster og blomar,
  never under torva ved takskjegget, og vindskier som kryssar over mønet.
- Laft: liggjande stokkar med utstikkande laftehovud på hjørna, grunnmur av
  stein. Løa har ståande bord. Stabburet står på steinstolpar med luft under.
- Inne: røykstove eller årestove med mørkt tømmer, open eldstad og gryte på krok.
- Kle på Sunnmøre kring 1800: menn med raud topplue og kvit vadmålsjakke,
  kvinner med raud trøye, mørkt skjørt og kvitt skaut.
- Landskap: bratte fjell med snø, fjord, bjørk og gran, lys frå låg sol.
- Vettar og troll hos Kittelsen er ein del av landskapet: mose, stein og røter.

## Natur og kyrkje

- Tre, steinar og haugar er figurar som står på ei grasflis, med skugge på
  bakken, og blir sorterte etter djupn saman med personane (`natur.py`).
- Gran: smal og spiss, greinlag som heng ned som skjørt med sagtakka underkant og
  spissar som heng ned ytst, mørk blågrøn, lys overside mot venstre og mørk underside.
  Gamle graner er høge med glisne lag som heng meir, unge er låge og tette.
- Furu: høg, raudbrun stamme med oransje flass oppe og grå, sprukken bork nedst, ofte
  skeiv, og ei flat, ujamn krone av nåleputer høgt oppe (lys overside, tustar under).
- Skogkanten langs kartkanten er tett og mørk innst, med lysare tre framme som står ulikt
  langt ute, nokre små tre ute på graset og ei og anna furu eller tørrgran. Aldri ei rett
  rekkje: kanten går inn og ut, og graset går ujamt inn i den mørke skogbotnen.
- Bjørk: kvit, kroklete stamme med svarte merke, lett krone av lauvklumpar
  i dempa gulgrønt, med mørkare klumpar innst for djupn.
- Stein: grå med tydelege flater, ei sprekk, mose og lav på toppen.
- Gravhaug: kuvla, mørk side mot sør, gras i tuster, steinar ved foten.
- Kyrkja er ei kvit langkyrkje etter Vartdal kyrkje: ståande panel, høge
  rundboga vindauge, skifertak, tårn midt framme med høgt, slankt spir og kors.
- I utmarka er vanleg gras mørkt som villgraset, så det ikkje blir lyse flekkar.

## Vatn, murar og kyrkja inne

- Vatn som i Final Fantasy VI (Lete-elva): vatnet ligg lågare enn landet. Under landet i
  nord syner ein skrent på 3 til 4 pikslar (jord under gras, berg ved stein) med ein mørk
  grastopp over, så ei lys skumline der skrenten møter vatnet og ei mørk skuggestripe i
  vatnet under. Landet i vest har ei mørk side og kastar skugge austover, landet i aust ei
  lys side. Sandstrand har ingen skrent, berre våt sand og skum.
- Strandkanten er fritt teikna og held fram over flisgrensene: nes og viker, aldri ein
  rett vinkel (indre hjørne blir fylte, ytre hjørne runda av, også inn i landflisa).
- Vatnet er dempa grå-turkis i fire tonar, der dei to mørke nesten er like og dei lyse
  banda er om lag ein tredel av flata. Banda går på tvers av straumen: vinklar som
  flyt nedover i bekken, rolege band som rullar inn mot land i sjøen. Ingen glitter og
  ingen små krusingar.
- Stryk og små fall: loddrette, lyse striper med dither som renn fort, og ei vassrett
  skumkant nedst der stryket sluttar.
- Tre står aldri i vatnet. Skog på kartkanten ved vatn blir vatn.
- Steingard er tørrmur av lyse, flate gråsteinar i to lag, toppstein med mose
  og lav, og murar som heng saman med naboane sine.
- Kyrkja inne er lys: furugolv, lyseblå benker med benkedører, raud løpar,
  altertavle i bondebarokk (raudt og gull) over kvit altarduk, kvit alterring
  med raud pute, brunraud preikestol, lysekrone i messing og ljosstrålar frå
  vindauga.
- Koret (runde 30): bakveggen er to fliser høg (`korvegg`) med blå himling og gullstjerner, raudt
  draperi under gesimsen, kalkmåleri (skriftfelt, vase med tulipanar) på kvitkalken, rundboga vindauge
  med blyglas og marmorert brystpanel. Altartavla i to etasjar med vridde gullsøyler og akantusvenger,
  preikestolen har himling, døypefonten er av grågrøn kleberstein. Benkene er lukka, sett bakfrå, med
  ei måla benkedør med rose mot midtgangen.

## Lys og glød (sjå glod.py)

- Lyset over eit kart er fargerekning som på Super Nintendo (`lys()` i `motor.js`): ein fast
  farge lagd til, trekt frå eller halvert per trinn. Ingen mjuke gradientar og ingen vignett.
- Gløden rundt kvar lyskjelde er ei handteikna form, som i Final Fantasy VI, og ho høyrer til
  kjelda: eldlys frå grua ligg lågt og breitt over golvet framfor og kastar ein boge av lys opp
  på veggen ved sida, eit stearinlys har ein smal og høg glød over flammen og ein liten pøl ved
  foten, ei lykt har ein rund glorie, ei smal midje langs stolpen og ein flat pøl på bakken under
  seg, lysekrona har små gloriar ved ljosa og ein pøl på golvet under, kakkelomnen og peisen
  kastar ei vifte ut over golvet frå eldopninga. Bålet har ein stor, låg pøl over bakken rundt
  ringen og ein glorie oppover rundt flammane, men kjernen ligg berre i flammane, så steinane i
  ringen held fargane sine (runde 86).
- To til tre trinn med harde kantar. Overgangen får nokre handplasserte dither-pikslar (glisne,
  helst i hjørna av trappesteget i kanten), ikkje eit utrekna mønster rundt heile forma.
- Kantane er trappesteg med jamn rytme (1, 1, 2, 3 … pikslar), slik som ein sirkel i pikselkunst.
- Elden flimrar: to eller tre rammer der forma endrar seg litt (pølen veks og krympar, bogen på
  veggen pustar), i takt med flammene (150 ms). Ljos og lykter flimrar mindre.
- Ute om kvelden blir lyset varmt med snitt mot ein oransje farge, elles blir gras gulgrønt.

## Hjørne og skuggar

- Steingarden har ein stolpe av store, tilhogne steinar med dekkstein i kvart hjørne
  og der muren sluttar (porten). Stolpen er litt høgare enn muren.
- Slagskuggen under hus og inventar er silhuetten av biletet, forskoven mot høgre og
  ned, men berre nedst ved bakken. Høge ting (tårn, piper) kastar ikkje skugge oppover.

## Kampbakgrunnar og stova

- Kampbakgrunnar er måla med `maleri.py`: tekstur og dithering overalt, ingen flate band
  og ingen omriss, luftperspektiv, stripete skyer med lyse kantar, relieff på fjella.
- Kampbakgrunnar (320 × 192, `bakgrunn.py`) følgjer Final Fantasy VI:
  himmel med skyer som har lyse kantar, fjell i lag med snø, skogkant, eit
  smalt vassband, slette med tekstur og småsteinar. Bakken må byrje over
  partiet (høgre side, y om lag 68 til 100 i lerretet).
- Fjellskugge følgjer fjellsida (stig terrenget mot høgre, er sida lys), ikkje
  kolonnar. Snøkappa har ujamn nedre kant.
- Bondestova: kvitkalka grue med hette i hjørnet, langbord med benk og
  kubbestolar, sengebenk med raudt åklede, hylle med trefat, rokk. Varmt ljos
  frå grua, mørke hjørne.
- Stabburet: mørkt tømmer og breie golvplankar, ingen eldstad. Kornbingar mot bakveggen (loka
  står opp, korn og mjøl i dei opne romma), spekemat på ei stong under taket, stige opp til ei mørk
  luke, tønner med gjordar av vidje, kagge på bukk, mjølsekker og flatbrød i stablar. Lyset er kaldt
  dagslys frå døra og glugga: ein skrå stråle og ein lys flekk på golvet, resten i djup skugge.
- Bord, benk og stol er eigne bilete (sjå SKILL.md). Setet er 5 pikslar over golvet og bordplata
  14, og plata dekkjer heile fotavtrykket. Kubbestolen er ein hol stokk med rundt sete og rygg
  som bøyer seg rundt sidene, teikna med fast tone per flate: toppen lysast, flata mot venstre
  lys, mot oss mellomtone, mot høgre skugge. Ting på bordet har ein smal skugge mot høgre og ned.
  Årer i treet er korte strekar på langs av plankane, aldri einsame pikslar.

## Figurar (16 × 24)

- Hovudet er rad 0 til 12 (med omriss), kroppen rad 12 til 23. Auga er mørke
  streker på to rader, fem pikslar frå kvarandre.
- Omriss (`#181020`) berre rundt silhuetten. Inne skil ein flatene med
  skuggetonen: arm mot kropp, bein mot bein, hake mot hals.
- Tre tonar per materiale. Svarte klede får sterkare lys, elles forsvinn forma.
- Folk frå bygda i 1820-åra: knebukser med kvite strømper, kvit eller grå
  vadmålsjakke, raud topplue. Kvinner: skaut knytt under haka, liv over kvit
  skjorte, skjørt og forkle. Presten: svart kjole og kvit pipekrage.
- Gamle folk: variér silhuetten. Krokrygg (`krokrygg: true`), stav
  (`stav: "lang"` eller `"stokk"`) eller begge. Ikkje gi alle gamle det same.
- Kampstillingar (mot venstre): åtak, galdr, skadd, svak (på kne), slått ut.
  Dei ligg i rad 4 og 5 i figurarket.
- Posar i scener (rad 9 til 12, ned, opp, venstre, høgre): knele, sitje og peike. Ein pose må
  lesast på silhuetten åleine, også bakfrå. Framanfrå og bakfrå søkk hovudet tre rader når
  figuren sit og fem når han kneler (frå sida tre og fire). Den som kneler, lener seg fram:
  overkroppen blir ei rad kortare, blikket går ned, og silhuetten blir breiast nedst (eitt kne
  i golvet, det andre bøygd fram med handa på, skjørtet utover golvet som ei klokke). Den som
  sit, har korte, lyse lår (toppen av låret fangar lyset ovanfrå), hendene på knea og leggane
  i skugge under. Bakfrå: lyse lærsålar under den som kneler, og smale leggar og hælar under
  setet til den som sit. Armen på sida får ein skuggekant mot kroppen (mørkaste tonen) og den
  lysaste tonen framme, elles forsvinn han i svarte klede. Peike er armen strak ut i
  skulderhøgd. Liggje og sove er ramma for slått ut. Sjå alle med `figur.py ark`
  (`forhand/figurar-posar.png`).
- Embetsmannsheimen (prestegarden, Ekset): mahogni, messing, kvit duk,
  kakkelomn og golvur. Bondestova: furu, grue, trefat, rosemaling.
- Gange som i Final Fantasy VI: armane svingar i motsett takt med beina (neven fram
  framfor hofta), foten fram blir breiare, beinet bak blir løfta. Frå sida: langt steg,
  hælen oppe på beinet bak, og overkroppen søkk éin piksel.
- Alle figurar blir laga med `figur.py`. Nye personar får ein oppføring i `U` i
  `js/rpg/data.js`, og deretter `python tools/pikselkunst/figur.py <id>`.

## Hus, dører og stiar

- Stiar som i The Minish Cap (`Pikslar.sti`): tråkka jord i gyllen oker som høyrer saman med graset
  (låg kontrast), aldri raudbrun og aldri med gråstein. Overflata har mjuke, ovale søkk (mørk midte,
  lys nedre kant) og nokre få lyse prikkar. På mørk bakke (utmarka, kveld) er okeren dempa og gul nok
  til å bli brun, ikkje raud, i kveldslyset.
- Kanten i soner: lyst, kort gras næmast, så ei frynse av små, varme oransjebrune (og nokre gulgrøne)
  strå som lener seg inn over stien i ein bølgjande kant. Mot høgt gras heng tustene inn over.
- Kanten er fri: runde svingar og plassar i kryssa (aldri 90 grader), og han kan flytte seg ei halv
  flis bort frå rutenettet, men ikkje ved dører, porter, bruer og kartkanten.
- Hovudvegar er to fliser breie (gjennom bygda, over tunet), med små plassar framfor dører og porten.
  Stiar i utmarka er éi flis.
- Alle dører skal ha sti fram til seg frå vegnettet. Talmerket framfor døra blir
  sti automatisk når det ligg inntil ein sti.
- Variér inngangane: somme hus har døra på baksida (bislag som stikk opp bak
  mønet), og stien kjem då ovanfrå.
- Ein skal kunne gå bak tårn og høge ting. Figuren blir då gøymd bak huset. Ein svak
  silhuett blir berre vist der huset har `silhuett: true` i kartet (spesielle høve).

## Høgd og djupn: terrassar, stup og utsikt (Åsen)

Etter klippene over Narshe i Final Fantasy VI (`forhand/referansar/narshe-ark.png`) og toppen av
pyramiden i A Link to the Past: høgd blir lesen av bakkekantar mellom nivå, ein høg bergvegg og eit
landskap langt nede som flyttar seg saktare enn kartet.

- Skrent (`s`) mellom to nivå: graskledd skråning sett framanfrå. Nivået over endar i ein lys graskant
  (somme pikslar lysast), så bøyer graset over, og skråninga er villgras i skugge (vender bort frå
  ljoset), mørkare nedover, med strå, flekker av open jord (mørk skugge øvst under graset, lys kant til
  venstre) og nokre bergnabbar (lys flate oppe til venstre). Mørk fot, og ei slagskugge på 2 til 3
  pikslar på graset under. Skrenten flatar ut (lågare og lågare) der han møter open mark eller ei rampe.
- Rampe (`/`): stien går rett ned gjennom ein kleiv i skrenten, med trinn (mørk line, lys kant under)
  kvar fjerde rad. Rampene ligg der stiane alt gjekk, så scenene finn vegen.
- Stup (`M`): store, runde knausar som lener seg litt, med lys side mot venstre og djupe, blåsvarte
  renner (som Narshe), småbrot i blokker på 2 × 3 pikslar, ein lys kant øvst under graset. Nedover blir
  berget disigare i trinn (blanda mot disfargen `#a6b4bc`), og i den nedste rada løyser det seg opp i
  dis med dither, så bakgrunnen syner gjennom. Eit nes som stikk ut, kastar skugge på berget til høgre.
- Toppen av åsen er lengst oppe på midten (to kollar med skrent under seg), og kanten (`N`) fell eit
  steg ned mot sidene, der han bøyer rundt ned mot lufta. Stien til utmarka går i søkket mellom kollane.
- Utsikta øvst opnar seg roleg: kameraet glir opp når ein er nær toppen, og dei fjerne laga flyttar seg
  minst (fjell 0,08, dal 0,22, trekroner 0,45), så landskapet stig fram over horisonten. Omrissa i laga
  heng saman (ingen loddrette stup der to former møtest).
- Djupn øvst kjem av fleire lag med ulik fart og sterkt luftperspektiv: himmelen står nesten still,
  fjella er svært disige, dalen og lia disige og kalde, og trekronene rett under kanten er mørke og
  metta og glir fort (faktor 0,6), så dei søkk bak kanten når kameraet går ned.
- Utsikta ligg øvst, over kanten: som i Narshe-bileta himmel øvst (blå, lysare nedover, lange skyer
  med lys kant), fjella under (disige, alpine toppar med snø) og nærast kanten lia opp mot utmarka til
  venstre (skog nedst, fjellbeite med stein, ein bekk og setra langt oppe) og Hovdebygda til høgre, med
  ein skogkledd rygg på skrå mellom dei. Kanten er graset som sluttar i ei ujamn, lys line med strå mot
  himmelen; lia bak syner ikkje.
- Kanten nedst går ut og inn i kartet sjølv (nes, viker), og ei hylle eitt nivå under platået (skrent
  med rampe) gjer at det søkk litt før det stuper.
- Øvst i biletet under stupet ser ein ned langs dalsida, skrått framanfrå: bergveggar med grashyller som
  blir lågare og breiare nedover, og skog der granane først står opp som spisse silhuettar og så blir
  runde kroner sett ovanfrå. Dei nedste kronene overlappar dalbiletet, så perspektivet glir frå dalside
  til kart utan skøyt.
- Skyene under oss driv sakte (eit eige lag), og elva i dalen renn: lyse band og glimt flyt nedover på
  ei bølgje som går opp i fire rammer.
- Under stupet nedst ser ein rett ned (som landskapet under pyramiden i A Link to the Past og
  verdskartet i FF6), eit fast lag som følgjer kartet (`li`, faktor 1): ur og flate knausar med lys kant
  oppe til venstre ved foten av stupet, skog som trekroner sett ovanfrå (runde, takka klumpar med lys
  side oppe til venstre og skugge nede til høgre, bjørk lysare enn gran), dalbotnen med teigar som
  fargefelt (furer og kornrader som striper) med steingardar (grå line) og skigardar (brun, prikka
  line), elva som eit band med mørk bredd og grusører, vegen som ei lys line, gardane som små torvtak
  med møne og tun, og kyrkja som skifertak med kvitt tårn og muren rundt. Alt er dempa og disig (langt
  nede), og nokre kvite skyer driv mellom oss og dalen med skuggen sin på bakken nede til høgre.
- Utsikta (`tools/pikselkunst/utsikt.py`): luftperspektiv måla inn. Dalen er lysare og
  blåare enn kartet, små gardar (torvtak, raud eller grå vegg),
  Hovdekyrkja kvit med skifertak og spir, teigar i grønt og gult med steingardar, elva og vegen.
  Fjella (faktor 0,12) er endå disigare: alpine toppar med lys flanke til venstre for ryggen og skugge
  til høgre, snø øvst. Ingen svarte omriss i bakgrunnen.
- Kanten på stupet er ujamn over flisgrensene (FF6, Minish Cap): graset går ned i tunger og viker (2 til
  8 pikslar), strå og tuster heng over kanten, så eit band av mørk jord med røter som heng ned, og her og
  der ein stein som stikk opp i graskanten. Der stupet møter bakke ved sida (eit nes), rundar graset
  hjørnet inn i flisa, og det bakre berget held fram inn i hjørnet av neset i ein boge; dei nedste
  hjørna på neset er runde. Aldri eit firkanta hakk.
- Der bakken stikk lengst ut (neset, hylla), står det ikkje heile flisar med bergvegg under: overhenget
  (`U`) er ei tynn kant av torv, jord og ei berglist med mørk underside, ei skuggestripe, og berget bak
  trekt inn (same høgd som stupet ved sida). Mot lufta på sida smalnar berget under av på skrå.
- Sidene på hylla mot stupet frå platået er skrå og ujamne: veggen er breiare nedst, med mørk kant
  der han vender mot høgre og lys der han vender mot venstre.
- Botnen av bergveggane er ujamn og open (2 til 9 pikslar), og under held det fram i ei ur av stein i
  same fargar, med kratt og einer, skugge frå overhenget og litt dis, som glir ned i lia. Veggen og
  dalsida møtest utan skøyt.
- Djupn nedover (etter Octopath Traveler): det som er langt nede, er uskarpt (pikslane dobla), disig
  og lysare, og svake lysstrålar fell skrått ned gjennom disen.
- Bergnabbane i forgrunnen er sett skrått ovanfrå, same perspektiv som kartet og dalen (Minish Cap,
  FF6): toppflata er den største flata, med rolege steinflater (flate tonar, lite dither), grasmatter
  mest langs kanten øvst, lyng i klyngjer, lav i nokre få flekker (gulgrøn og grågrøn, ikkje oransje på
  små nabbar, det les som eit dyr) og nokre lange sprekker (mørk kjerne, lys kant mot ljoset). Kanten
  mot dalen har ei lys rand og gras som heng litt over. Sidene er berre eit smalt band i skugge (lys mot
  venstre, mørk mot høgre). Ingen høge, loddrette framsider, og graset stikk ikkje rett opp i silhuett.
- Forgrunnen over stupet står alltid på noko: bergnabbar som kjem inn frå sida av biletet, med gras, lyng
  og ei lita bjørk på toppen, og berg som går så langt ned at det når kanten av biletet i alle
  kameraposisjonar. Aldri gras som heng fritt i lufta.
- Langt nede over dalen svevar nokre små, mørke fuglar (to rammer, driv sakte), sparsamt.
- Forgrunnen (faktor 1,3): nesten silhuettar i mørkt grøn (nær kameraet, i skugge), berre i hjørna,
  og berre når kameraet står ved kanten av kartet. Aldri midt i biletet.

## Sjekkliste før grafikken blir teken i bruk

1. `pix.py sjekk` gir ingen merknader.
2. Førehandsvisinga i 8x: flatene er reine, omrisset er heilt, ingen støy.
3. Samanhengsbiletet i spelstorleik: figuren er lesbar og skil seg frå bakgrunnen.
4. Ved sida av Blekklatten og dei andre bileta i kontaktarket: same stil og lysretning.
5. I spelet: eit skjermbilete der grafikken er i bruk.
