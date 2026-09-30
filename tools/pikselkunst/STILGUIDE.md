# Stilguide for pikselgrafikken i «Aasen: Språkvandringa»

Målet er 16-bits rollespel frå 90-talet, i same stil som Blekklatten
(`bilete/spel/blekklatten.png`, laga av Claude Opus 5.5). Han er målestokken.
Alt nytt skal kunne stå ved sida av han utan å skilje seg ut.

## Storleikar

| Type | Storleik (spelpikslar) | Vist i spelet |
| --- | --- | --- |
| Flis | 16 × 16 | lerretet er 320 × 192, skalert opp med heile tal |
| Figur på kartet og i kamp | 16 × 24 | føtene nedst i ruta |
| Portrett i samtaleboksen | 40 × 40 | tre gonger så stort (120 × 120) |
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

- Tre kvart mot høgre (mot teksten i samtaleboksen), hovud og skuldrer.
- Hovudet fyller om lag tre fjerdedelar av høgda. Botnen er skoren av.
- Auga: øvre augelok i omrissfarge, augekvitt og iris med ein lys piksel.
- Ansiktsuttrykket skal fortelje noko om personen.
- Grunnforma ligg i `portrettmal.py`. Nye personar blir varierte derifrå.

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

## Kampbakgrunnar og stova

- Kampbakgrunnar (320 × 192, `bakgrunn.py`) følgjer Final Fantasy VI:
  himmel med skyer som har lyse kantar, fjell i lag med snø, skogkant, eit
  smalt vassband, slette med tekstur og småsteinar. Bakken må byrje over
  partiet (høgre side, y om lag 68 til 100 i lerretet).
- Fjellskugge følgjer fjellsida (stig terrenget mot høgre, er sida lys), ikkje
  kolonnar. Snøkappa har ujamn nedre kant.
- Bondestova: kvitkalka grue med hette i hjørnet, langbord med benk og
  kubbestolar, sengebenk med raudt åklede, hylle med trefat, rokk. Varmt ljos
  frå grua, mørke hjørne.

## Sjekkliste før grafikken blir teken i bruk

1. `pix.py sjekk` gir ingen merknader.
2. Førehandsvisinga i 8x: flatene er reine, omrisset er heilt, ingen støy.
3. Samanhengsbiletet i spelstorleik: figuren er lesbar og skil seg frå bakgrunnen.
4. Ved sida av Blekklatten og dei andre bileta i kontaktarket: same stil og lysretning.
5. I spelet: eit skjermbilete der grafikken er i bruk.
