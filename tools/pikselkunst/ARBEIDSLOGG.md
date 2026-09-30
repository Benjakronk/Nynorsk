# Arbeidslogg for grafikken i «Aasen: Språkvandringa»

Grafikken blir betra i rundar. Kvar runde startar med research, finn dei
svakaste elementa i spelet, lagar nye versjonar med verktøya her og sluttar med
skjermbilete og ei oppføring i denne loggen. Slik kan arbeidet halde fram på
same måte, uansett kven som tek over.

## Slik gjer du ei runde

1. **Finn dei svakaste elementa.** Ta skjermbilete av dei viktigaste staden
   (`skjermbilete.py`) og sjå på dei. Start med punkta under «Står att» frå
   førre runde.
2. **Research.**
   - Pikselgrafikk: skjermbilete frå The Minish Cap (`hent_referansar.py zelda`)
     og Final Fantasy VI (Caves of Narshe, sjå `hent_referansar.py`). Dei er
     verna og blir berre lagra i `forhand/referansar/`, som ikkje er i git.
   - Verkelegheita: bilete med fri lisens frå Wikimedia Commons
     (`hent_referansar.py sok` og `konsept`). Dei blir lagra i `konsept/` med
     opphav og lisens i `konsept/KJELDER.md`.
   - Lag kontaktark (`hent_referansar.py ark`) og sjå på dei. Skriv ned kva
     teknikkar og former du vil bruke.
3. **Teikn.** Bruk verktøyet som passar (sjå SKILL.md): `portrettmal.py`,
   `bygg.py`, `inventar.py`, `natur.py`, eller fliser og figurar i
   `js/rpg/pikslar.js` når elementet må tilpasse seg naboane sine (vatn, murar).
4. **Sjekk.** `pix.py sjekk` for kjeldene, `node tools/sjekk-spel.js` for
   karta, og skjermbilete i spelet. Vurder mot sjekklista i STILGUIDE.md og
   rett til det held.
5. **Dokumenter.** Legg til ei ny runde nedst i denne loggen, oppdater
   STILGUIDE.md med nye reglar og SKILL.md med nye verktøy, og commit.

## Runde 1: arbeidsflyten og portretta

- **Research:** Blekklatten (laga av Claude Opus 5.5) som målestokk.
- **Svakast:** Grafikken var teikna i kode og såg flat og «rekna ut» ut.
- **Gjort:** `pix.py` (lag, sjekk, kontaktark), stilguide, seks portrett med
  `portrettmal.py`, pikselskrift, kantar mellom fliser, stemningsljos, effektar
  i kampen.
- **Lærdom:** Skugge rekna ut med kuleformlar blir blass og støyete. Flater
  teikna for hand med tre til fem tonar held mykje betre.

## Runde 2: vettane, husa og konseptkunst

- **Research:** Final Fantasy VI og The Minish Cap. Tidemand, Gude, Dahl,
  Kittelsen, drakter frå Sunnmøre og eit stabbur frå Ørsta.
- **Svakast:** Taka var flate fliser som gjentok seg.
- **Gjort:** Hus som heile figurar (`bygg.py`): torvtak med tuster, never og
  vindskier, laft, grunnmur og stabbur på steinstolpar. Dei namnlause vettane i
  bruk, og forvandling når haugbonden får namnet sitt.
- **Lærdom:** Taket skal dominere og ha ein annan farge enn bakken.

## Runde 3: natur og kyrkja utanfrå

- **Research:** Kyrkjer på Sunnmøre (Vartdal, Dale i Norddal), bjørk, gran,
  mosegrodde steinar, gravhaug, Dahl og Hertervig.
- **Svakast:** Små tre på éi flis, flate steinar, kyrkja av fliser.
- **Gjort:** Gran, bjørk, stein og gravhaug som figurar (`natur.py`), kyrkja
  og prestegarden som heile figurar, graver og mørkt gras i utmarka.
- **Lærdom:** Figurar som blir sorterte etter djupn saman med personane, gir
  djupn utan eit eige lag for tretoppar.

## Runde 4: vatn, steingard og kyrkja inne

- **Research:** Final Fantasy VI (strand på øya, murar i byane), bekk og fjøre
  på Vestlandet, steingardar i Norddal, Ørsta og Løten, kyrkjene i Kvernes og
  Hove, preikestol i Lygra og altertavle i Fåberg. Zelda Wiki var nede denne
  gongen.
- **Svakast:** Vatnet var firkanta fliser, grantre stod i vatnet langs
  kartkanten, steingarden såg ut som grå sekker, og kyrkja inne var tom.
- **Gjort:**
  - Vatn som tilpassar seg naboane (`Pikslar.vatn`): bølgjande strandkant i
    fargen til landet, skugge frå bakken, skum, avrunda hjørne, grunt vatn nær
    land, og kvit straum med steinar i bekken.
  - Skog på kartkanten som grensar til vatn, blir teikna som vatn.
  - Steingard som tørrmur (`Pikslar.steingard`): to lag lyse steinar,
    toppsteinar med mose og lav, loddrette murar sett ovanfrå.
  - Kyrkja inne: altartavle, alterring, preikestol og lysekrone som figurar
    (`inventar.py`), furugolv, blå benker med benkedører, vindauge og
    ljosstrålar.
  - Nye verktøy: `hent_referansar.py`, `skjermbilete.py` og `skjerm.html`, og
    `tools/sjekk-spel.js` for karta.
- **Lærdom:** Element som skal henge saman med naboane (vatn, murar), blir
  laga med ei nabomaske i koden, ikkje som faste bilete.

### Står att etter runde 4

- Fjell (`^`) og klipper er framleis fliser. Final Fantasy VI har klipper med
  lagdelte, skuggelagde kantar.
- Innsida av stova, prestegarden og arkivet har ikkje fått same løft som kyrkja.
- Figurane (16 × 24) er enklare enn portretta og husa. Raud topplue og kvit
  vadmålsjakke frå draktbiletet frå Sunnmøre er ikkje tekne i bruk.
- Kampbakgrunnane er rekna ut og kan få meir handteikna detalj (fjord, bjørk).
