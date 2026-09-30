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
     og Final Fantasy VI (Caves of Narshe, sjå `hent_referansar.py`), og figurark
     frå Spriters Resource (`spriters-resource.com`, finn `/media/assets/...` på
     sida til kvart ark). Dei er
     verna og blir berre lagra i `forhand/referansar/`, som ikkje er i git.
   - Verkelegheita: bilete med fri lisens frå Wikimedia Commons
     (`hent_referansar.py sok` og `konsept`). Dei blir lagra i `konsept/` med
     opphav og lisens i `konsept/KJELDER.md`.
   - Lag kontaktark (`hent_referansar.py ark`) og sjå på dei. Skriv ned kva
     teknikkar og former du vil bruke.
3. **Teikn.** Bruk verktøyet som passar (sjå SKILL.md): `portrettmal.py`,
   `bygg.py`, `inventar.py`, `natur.py`, `bakgrunn.py`, `figur.py`, eller fliser i
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

- Fjell (`^`) og klipper er framleis fliser.
- Innsida av stova, prestegarden og arkivet har ikkje fått same løft som kyrkja.
- Figurane (16 × 24) er enklare enn portretta og husa.
- Kampbakgrunnane er rekna ut og kan få meir handteikna detalj.

## Runde 5: kampbakgrunnar og stova

- **Svakast:** Ei teljing av flisene i karta viste at fjell (`^`) ikkje er brukte
  nokon stad enno, så dei vart ikkje prioriterte. Skjermbileta viste at
  kampbakgrunnen inne berre var brune striper (han blir brukt i alle kampar
  innandørs), at dei andre bakgrunnane var tomme, og at stova på Åsen hadde små,
  generiske møblar.
- **Research:** Kampbakgrunnen i Final Fantasy VI (Wikipedia): skyer med lyse
  kantar, fjell i lag med snø, skogkant av einskilde gransilhuettar, eit smalt
  vassband og ei slette med småsteinar, horisont ein tredjedel ned. Frå
  Noreg: stovene frå Bjørnebergstølen og Gulsvik (Norsk Folkemuseum), rokk frå
  Nesset prestegard, og årestovene til Tidemand og Askevold.
- **Gjort:**
  - Fire kampbakgrunnar med `bakgrunn.py`: tunet ved fjorden med
    Sunnmørsalpane, utmarka i kveldsljos med granskog og tjønn, røykstova med
    grue, trefat, rosemaling, sengebenk og rokk, og arkivet med protokollar og
    blekk. Kampen brukar dei når dei er lasta, elles dei gamle.
  - Fjellskugge etter fjellsida: sider som vender mot ljoset er lyse, andre
    mørke, med snøkappe og renner. Ikkje skugge etter kolonne.
  - Landskapet er løfta 16 pikslar, og partiet står litt lågare, så Ivar står på
    bakken og ikkje i fjorden.
  - Inventar i stova (`inventar.py`): kvitkalka grue med hette, eld og gryte,
    hylle med trefat, sengebenk med raudt åklede, langbord med benk og
    kubbestolar, og rokk. Stova på Åsen og på Nedre Hovde.
  - Grua lyser som ein eldstad, sjølv om ho er ein figur og ikkje ei flis.
- **Lærdom:** Tel flisene i karta før du vel kva som skal betrast. Det som
  syner i kvar einaste kamp eller i det første rommet, er viktigast.

### Står att etter runde 5

- Figurane (16 × 24) er enklare enn portretta og husa. Raud topplue og kvit
  vadmålsjakke frå draktbiletet frå Sunnmøre er ikkje tekne i bruk.
- Prestegarden, kontoret og boksamlinga på Ekset har framleis gamle møblar.
  Prestegarden bør sjå meir dansk og embetsmannsaktig ut enn bondestova.
- Kampbakgrunn for vegen (bruker utmarka) og kyrkja finst ikkje.
- Fjell (`^`) må teiknast når eit kart treng dei (kapittel 2 og vidare).

## Runde 6: figurane

- **Svakast:** Figurane på kartet (16 × 24) var teikna i kode, utan omriss og
  med to tonar. Dei såg små og flate ut ved sida av husa og trea.
- **Research:** Figurark frå Final Fantasy VI (Terra, Locke, Strago, Relm,
  Banon og bybuarar) og The Minish Cap (Link, bybuarar, smeden) frå Spriters
  Resource. Vi forstørra enkeltrammer og talde fargar:
  - Hovudet er om lag halve figuren (11 til 12 av 24 rader). Kroppen er kort, med
    bein på tre til fire rader og sko på to.
  - Omriss nesten svart rundt heile silhuetten, men ikkje mellom flater inne i
    figuren. Der blir mørkare tonar av same farge brukte.
  - 11 til 14 fargar per figur, tre tonar per materiale. Håret er den største
    fargeflata og har eit lyst band.
  - Auga er mørke streker på to rader (Final Fantasy VI) eller 2 × 2 med ein lys
    piksel (The Minish Cap).
  - Tre rammer per retning i Final Fantasy VI (stå, steg, steg). Mot venstre og
    mot høgre er det same biletet spegla.
  - Eldre folk og kvinner skil seg ut med silhuetten: skaut, skjørt, krokrygg,
    skjegg.
- **Gjort:**
  - `figur.py` set saman figurane av handteikna delar: hovud i tre retningar,
    hår (kort, langt, skalle, skaut), hovudplagg (raud topplue, hatt,
    flosshatt), skjegg, briller, kropp (bukse eller kjole) med tre rammer og
    tilbehøyr (forkle, pipekrage, sekk, hale). Omrisset blir lagt rundt til slutt.
  - Utsjånaden blir lesen frå `U` i `js/rpg/data.js`. Nye nøklar: `lue`,
    `strompe` (knebukser med kvite strømper) og `kappe` (prestekjole).
  - Kjole har eit liv i kjolefargen over kvit skjorte, som på bunaden.
  - Sunnmørsdrakta frå draktbiletet i `konsept/`: bonden har raud topplue, kvit
    vadmålsjakke og knebukser. Gjetaren har topplue, granne og bestefar knebukser.
  - Spelet teiknar figuren i kode til arket i `bilete/spel/figurar/` er lasta, og
    teiknar då arket inn i dei same lerreta.
- **Lærdom:** Legg omrisset utanpå til slutt, så kan delane teiknast med berre
  synlege fargar. Då blir dei enkle å skrive for hand og å kombinere.

### Står att etter runde 6

- Prestegarden, kontoret og boksamlinga på Ekset har framleis gamle møblar.
- Kampbakgrunn for vegen og kyrkja finst ikkje.
- Kampposar (åtak, galdr, skadd, slått ut) manglar. Figurane i kampen brukar
  gangrammene mot venstre.
- Eldre folk kunne hatt krokrygg og stav, og huldra ein eigen kjole og
  tydelegare hale.
- Fjell (`^`) må teiknast når eit kart treng dei.

## Runde 7: gamle folk, kampstillingar, embetsmannsheimen

- **Svakast:** Alle «Står att»-punkta frå runde 6. Gamle folk såg ut som unge
  med kvitt hår, figurane i kampen hadde ingen eigne stillingar, og
  prestegarden hadde same fliser som bondestova.
- **Research:** Figurarka frå runde 6. Final Fantasy VI har eigne rammer for
  åtak, magi, treft, lite liv (på kne) og slått ut (liggjande). Gamle folk i
  bybuararka skil seg frå kvarandre: somme er krokete, somme har stav, somme
  begge delar.
- **Gjort:**
  - Nye nøklar i `U`: `krokrygg` (hovudet lågare og fram, pukkel bak) og
    `stav` (`"lang"` stav eller `"stokk"`). Variantane er spreidde, så ikkje alle
    gamle ser like ut: bestefaren har stokk, grannen lang stav, kona er
    krokrygga utan stav, og haugbonden har både krokrygg og lang stav.
  - Kampstillingar i figurarket (48 × 144): åtak (arm rett fram, steg fram),
    galdr (arm opp, open munn), skadd (kasta bakover, attlatne auge), svak
    (på kne når livet er under ein firedel) og slått ut (liggjande, 24 × 16).
    Kampen vel stilling etter kva figuren gjer.
  - Huldra har eigen sid, grøn kjole med gullborde nedst, kvite ermar, ein
    blome i håret og ein tjukkare kuhale med dusk (synleg bakfrå og frå sida).
  - Embetsmannsheimen (`inventar.py`): kakkelomn i støypejern som lyser,
    skatoll, golvur, empiresofa og spisebord med kvit duk i prestegarden,
    skrivepultar på kontoret, bokreolar, lesebord med globus og stolar på Ekset.
  - Kampbakgrunnar: vegen til Ekset (grusveg med hjulspor, skigard, åker,
    gardar i lia, milestein) og Hovdekyrkja (måla himmel i taket, rosemaling,
    altartavle, alterring, blå benkar med benkedører og ljos frå vindauga).
  - `bakgrunn.py` teiknar no 16 pikslar høgare og skjer av toppen, i staden for
    å kopiere rader nedst. Det gav hakk i vegen.
  - `skjerm.html` tek `parti=` og `hp=`, så kampstillingane kan sjåast på skjermbilete.
- **Lærdom:** Variasjon mellom figurar av same slag kjem frå silhuetten
  (krokrygg, stav), ikkje frå fargane. Og: eit møbel ved bakveggen bør ikkje vere
  høgare enn at toppen held seg innanfor veggraden.

### Står att etter runde 7

- Kampstillingane for figurar som ikkje er med i partiet (vettane, haugbonden
  som menneske) er ikkje i bruk.
- Stillingane er berre mot venstre. Figurane på kartet har ikkje eigne rammer
  for å snakke, sitje eller arbeide.
- Arkivet og kontoret har framleis bokhyller som fliser (`y`, med blekk som renn).
- Fjell (`^`) må teiknast når eit kart treng dei.

## Runde 8: gå bak, stiar og bakdør

- **Svakast (frå brukaren):** Ein kunne ikkje gå bak kyrkjetårnet, stiane til
  dei to nedste husa i bygda enda på taket (baksida) medan døra var framme, og
  alle hus hadde inngangen på same staden.
- **Gjort:**
  - Tårnet står ikkje lenger på ei fast flis, så ein kan gå bak kyrkja og tårnet.
  - Når spelaren (eller følgjet) står bak eit hus eller tårn, blir han vist som
    ein svak silhuett over biletet, så ein ser kvar ein er.
  - Talmerke framfor dører som ligg inntil ein sti, blir sti. Stiane går no
    heilt fram til dørene.
  - Sti rundt hjørnet til døra på Nedre Hovde, og nye stiar til stabburet på
    Åsen og setrene på Ekset og i utmarka.
  - Bakdør: `stove(..., bakdor=[i])` i `bygg.py` teiknar eit bislag som stikk
    bakover. I 3/4-vinkelen syner berre torvtaket, som ei takrygg opp frå mønet
    med gavlspiss og vindskier øvst. Døra i kartet ligg i flisraden bak huset.
    Kremmarbua (`stove-bak`) har inngangen bak, der stien frå vegen kjem.
- **Lærdom:** Det som ligg bakom eit hus, syner høgare oppe på skjermen. Ein
  inngang på baksida blir difor vist med det som stikk opp over mønet.
