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

## Sjekkliste før grafikken blir teken i bruk

1. `pix.py sjekk` gir ingen merknader.
2. Førehandsvisinga i 8x: flatene er reine, omrisset er heilt, ingen støy.
3. Samanhengsbiletet i spelstorleik: figuren er lesbar og skil seg frå bakgrunnen.
4. Ved sida av Blekklatten og dei andre bileta i kontaktarket: same stil og lysretning.
5. I spelet: eit skjermbilete der grafikken er i bruk.
