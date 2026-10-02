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

- Kvar person har sin eigen silhuett og eit kjenneteikn. Ivar: ustyrleg mørkt hår,
  fjørpenn bak øyret, fregner, sekkeband. Storebror: stuttklypt sandhår, skjeggstubb,
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
- Gran: smal og spiss, greinlag som heng ned med sagtakka underkant, mørk
  blågrøn med lyse greinspissar på venstre side.
- Bjørk: kvit, kroklete stamme med svarte merke, lett krone av lauvklumpar
  i dempa gulgrønt, med mørkare klumpar innst for djupn.
- Stein: grå med tydelege flater, ei sprekk, mose og lav på toppen.
- Gravhaug: kuvla, mørk side mot sør, gras i tuster, steinar ved foten.
- Kyrkja er ei kvit langkyrkje etter Vartdal kyrkje: ståande panel, høge
  rundboga vindauge, skifertak, tårn midt framme med høgt, slankt spir og kors.
- I utmarka er vanleg gras mørkt som villgraset, så det ikkje blir lyse flekkar.

## Vatn, murar og kyrkja inne

- Vatn tilpassar seg naboane: bølgjande strandkant i fargen til landet (gras,
  sand eller stein), skugge frå bakken på nordsida, skum mot land, avrunda
  hjørne og lysare, grunt vatn nær land. Bekkar har kvit straum og steinar.
- Tre står aldri i vatnet. Skog på kartkanten ved vatn blir vatn.
- Steingard er tørrmur av lyse, flate gråsteinar i to lag, toppstein med mose
  og lav, og murar som heng saman med naboane sine.
- Kyrkja inne er lys: furugolv, lyseblå benker med benkedører, raud løpar,
  altertavle i bondebarokk (raudt og gull) over kvit altarduk, kvit alterring
  med raud pute, brunraud preikestol, lysekrone i messing og ljosstrålar frå
  vindauga.

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

- Alle dører skal ha sti fram til seg frå vegnettet. Talmerket framfor døra blir
  sti automatisk når det ligg inntil ein sti.
- Variér inngangane: somme hus har døra på baksida (bislag som stikk opp bak
  mønet), og stien kjem då ovanfrå.
- Ein skal kunne gå bak tårn og høge ting. Figuren blir då gøymd bak huset. Ein svak
  silhuett blir berre vist der huset har `silhuett: true` i kartet (spesielle høve).

## Sjekkliste før grafikken blir teken i bruk

1. `pix.py sjekk` gir ingen merknader.
2. Førehandsvisinga i 8x: flatene er reine, omrisset er heilt, ingen støy.
3. Samanhengsbiletet i spelstorleik: figuren er lesbar og skil seg frå bakgrunnen.
4. Ved sida av Blekklatten og dei andre bileta i kontaktarket: same stil og lysretning.
5. I spelet: eit skjermbilete der grafikken er i bruk.
