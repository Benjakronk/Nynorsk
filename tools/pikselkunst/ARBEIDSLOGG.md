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
3. **Teikn.** Bruk verktøyet som passar (sjå SKILL.md): `portrett.py`,
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

## Runde 9: portretta

- **Svakast (frå brukaren):** Ivar var berre eit palettbyte av bror sin. Alle
  portretta hadde same andlet frå `portrettmal.py`.
- **Research:** Portretta i Final Fantasy VI Advance og «mugshots» frå Fire Emblem:
  The Sacred Stones (Spriters Resource):
  - Final Fantasy VI: tett utsnitt, andletet fyller ruta, ulike vinklar (profil,
    blikk ned), hår og hatt går ut over kanten, sterkt ljos med mørk skuggeside.
  - Fire Emblem: byste i tre kvart, 96 × 80 og 16 fargar. Silhuetten (hårform,
    pannebend, bart, klede) skil personane. Farga omriss, tjukt øvre augelok, iris
    med lys piksel, augebryn som ber lynnet.
- **Gjort:**
  - `portrett.py` erstattar `portrettmal.py`. Kvar person er ein eigen funksjon som
    teiknar polygon, liner og små handteikna rutenett (auge i fleire stilar, nase).
    Farga omriss blir lagt på til slutt.
  - Portretta er 48 × 48 (før 40 × 40), vist tre gonger så stort, så det er plass til
    auge og kjenneteikn.
  - Ni portrett: Ivar, storebror, syster, grannen og budeia på nytt, og nye for
    huldra, den framande, presten og haugbonden. Sjå STILGUIDE.md for kjenneteikna.
  - `pix.py sjekk` godtek farga omriss på portrett.
  - `skjerm.html` tek `tale=Namn:tekst`, så portretta kan sjåast i samtaleboksen.
- **Lærdom:** Kjenneteikn og silhuett gjer meir for å skilje personar enn fargar.
  Teikn andletsforma på nytt for kvar person.

### Står att etter runde 9

- Fellesansikt er laga (sjå under). Ein bifigur som får ei større rolle seinare,
  bør få eige portrett.
- Fleire uttrykk per person (glad, sint, redd), til dømes som eigne rammer.
- Knud Knudsen og spegelfiguren i seinare kapittel.

### Fellesansikt for bygdefolk

- Berre viktige personar får eige portrett (partiet, motstandarane,
  litteraturpersonar og dei som kjem att). Småroller deler fem fellesansikt, som
  dei generiske portretta i Fire Emblem: `bygd-mann`, `bygd-kvinne`,
  `bygd-gamal-mann`, `bygd-gamal-kone` og `bygd-gut`.
- Dei er med vilje nøytrale: same stil, men utan kjenneteikn. Koplinga frå namnet
  på den som talar, står i `PORTRETT` i `js/rpg/data.js`.

## Runde 10: dører, levande eld og ferdig lasta grafikk

- **Frå brukaren:** Dører skal opne seg når ein går inn, elementa skal ikkje poppe
  inn, og flammane i grua og omnen var ikkje lenger levande etter at dei vart faste bilete.
- **Gjort:**
  - Dører opnar seg: dørbladet sviv inn og opninga blir mørk. Så tonar skjermen raskt
    til svart og inn att i den nye scenen (`gjennomDor` og `DORFORM` i
    `js/rpg/motor.js`). Alle dører tonar, også inne. Forma på døra er målt i husbileta:
    vanleg hus, låve (dobbeldør), stabbur og kyrkje. (Første versjon let Ivar gå inn og
    bli gjennomsiktig. Det vart teke bort etter ønske frå brukaren.)
  - Spelaren kjem alltid inn ved døra, og ser bort frå henne. Stova på Åsen fekk eit
    eige merke ved døra, sidan merke 1 er staden der spelet byrjar.
  - Alle bilete (80) blir lasta før tittelskjermen syner (`Pikslar.forhandslast`,
    `alleBilete`), og alle lastarane brukar eitt felles lager. Ingenting poppar inn.
  - Levande eld (`ILD` og `ild` i `js/rpg/pikslar.js`): tunger som flakkar i grua og
    glør bak luka i kakkelomnen, teikna oppå inventaret, i same takt som lykta, ljosa
    og elva (150 ms per bilete). Gryta i grua er teikna på nytt som svart jern i ein
    kjetting, ikkje ei grå flate. Flammane blir berre teikna i
    mørket i eldstaden, så gryta og kroken ligg framfor.
  - `skjerm.html` tek `gaa=opp ventms=300`, så ein kan fange ei dør medan ho opnar seg.
- **Lærdom:** Faste bilete tek livet frå ting som skal røre seg. Legg rørsla oppå som
  kode, avgrensa til dei pikslane i biletet som høyrer til elden.

## Runde 11: gangen

- **Frå brukaren:** Gange-animasjonen hadde mykje å gå på samanlikna med Final Fantasy VI.
- **Research:** Gangrammene til Locke og Terra (figurarka frå runde 6), lagde ved sida av
  Ivar og målte piksel for piksel mot ståramma:
  - Final Fantasy VI endrar 35 til 70 pikslar i overkroppen og 34 til 57 i beina per
    steg. Ivar endra 5 og 14. Heile kroppen arbeider, ikkje berre føtene.
  - Mot oss: armane svingar i motsett takt med beina. Armen fram kjem innover og ned
    framfor hofta med ein tydeleg neve, armen bak blir kortare. Foten på beinet fram blir
    breiare og går litt ut, beinet bak blir løfta.
  - Frå sida: langt steg med tjukke bein, foten fram strekt ut og hælen oppe på beinet
    bak. Armen svingar godt fram eller bak. Hovud og overkropp søkk éin piksel i steget.
  - Tre rammer per retning (stå, steg, steg), som før.
- **Gjort:** `figur.py` byggjer gangrammene av delar: overkroppen utan armar, armar i
  tre stillingar (ned, fram, bak) og bein i tre (stå, fram, løfta), og frå sida eit
  skuggesøkk på éin piksel. Gjeld bukse og kjole, stav, sekk, hale og krokrygg.
- **Lærdom:** Mål rørsla mot referansen (kor mange pikslar som endrar seg i kvar del),
  ikkje berre sjå på ho. Det viste med ein gong at overkroppen stod stille.

## Runde 12: møblar, naturvariantar og folk som lever

- **Frå brukaren:** Møblar som var vanskelege å tyde (langbordet, sengebenken, hylla),
  for lite variasjon i naturen, figurar som forsvann i kanten når ein gjekk opp og ned
  i Hovdebygda, og alle personar stod stille og såg nedover.
- **Gjort:**
  - Langbord sett ovanfrå på skrå (plankar på langs, trefat med graut, brød, ølbolle,
    bein med sleid, kubbestolar med luft til bordet), sengebenk med gavlar, pute,
    laken og raudt åklede, og hylle med rosemålte trefat på høgkant og ølkrus.
  - Nye naturvariantar i `natur.py`: ung bjørk, tvistamma bjørk, ung gran, berghelle,
    steinrøys, ståande stein og einerbusk. Vanlege former står fleire gonger i
    `NATURTYPE`, så dei kjem oftast.
  - Motoren tek med to-tre flisrader under skjermen og ei kolonne på kvar side når han
    samlar figurar, så høge tre ikkje forsvinn i kanten.
  - Folk har `atferd` (stille, snu, gaa), `retning` og `radius` i `data.js`. Dei som går,
    held seg nær staden sin og går ikkje framfor dører. Etter ein samtale går ein tilbake
    til vanen sin.
- **Lærdom:** Eit møbel sett ovanfrå må ha ei flate med gjenstandar på, og kantar og
  bein under. Loddrette skøytar og små mørke strekar blir lesne som skuffer og handtak.

### Huldra etter Terra

- Huldra har fått formene til Terra i Final Fantasy VI: hår med volum og taggete lugg,
  lokkar langs kinna og ei lang hestehale med lyst band (`frisyre: "hestehale"`), eit
  fiolett sjal med spissar over skuldrene (`sjal`), smal midje med gullbelte og eit
  stutt skjørt med gullborde, med berre bein og føter under (`kort: true`). Blomen i
  håret står der Terra har sløyfa, og kuhala heng under skjørtet.

## Runde 13: måla kampbakgrunnar

- **Frå brukaren:** Kampbakgrunnane var for enkle i stilen samanlikna med Final Fantasy VI.
- **Research:** Alle 50 kampbakgrunnane frå Final Fantasy VI (Spriters Resource). Slette,
  skog, fjell og inne forstørra og samanlikna:
  - Måla bilete gjorde om til pikslar, 26 til 46 fargar. Tekstur og dithering overalt,
    ingen flate band og ingen svarte omriss.
  - Luftperspektiv: fjell langt borte er blålege og har lite kontrast, forgrunnen er mettast.
  - Skyer i lange, stripete formasjonar med lyse kantar (fersken, turkis).
  - Bakken har store flekkar av ljos og skugge og fin tekstur. Ting blir større nærare oss.
  - Store former i forgrunnen (stammer med røter, bergveggar) bryt horisonten.
  - Inne: rom med djupn, vegger med mønster og tekstur, golv i perspektiv, mørke hjørne.
- **Gjort:**
  - `maleri.py`: fargeskalaer, ordna dithering (Bayer 4 x 4), verdistøy og fBm, fjellrygg,
    og malarstrøk for gran, gras, stein og bjørk.
  - Nye hjelparar i `bakgrunn.py`: himmel med stripete skyer, fjell med relieff (lyssett
    2D-støyflate) og snø, bakke med ljosflekkar, stamme med bork og røter, tømmervegg,
    plankegolv i perspektiv, ljos som fell av, og mørke hjørne.
  - Alle seks bakgrunnane er måla på nytt: tunet (Sunnmørsalpane, mørke åsar, fjord,
    bø med steinar), utmarka (kveldshimmel, granskog i lag, tjønn, stamme i kanten),
    vegen (gyllen kveld, åker, grusveg, skigard, bjørker), røykstova (laftevegg, grue med
    eld, plankegolv, varmt ljos), arkivet (steinmur, protokollar, blekkpytt, lysestake)
    og kyrkja (panel med årer, måla himmel, altartavle, ljosstrålar).
- **Lærdom:** Skugge på fjell må kome frå ei 2D-flate (relieff), ikkje frå hellinga til
  profilen åleine. Då blir det loddrette striper. Og: ein skripta klipp mellom to merke i
  fila må sjekkast mot rekkjefølgja av funksjonane, elles kan han ta med seg for mykje.

## Runde 14: Ivar som Locke

- **Frå brukaren:** Gangen skulle vere like livleg som Locke sin, og Ivar opplevdest mindre
  uttrykksfull og med mindre personlegdom enn Locke. Han trong kjensleramer.
- **Research:** Figurarket til Locke kartlagt ramme for ramme (gange, kamp, kjensler) og
  samanlikna med Ivar på ei side (artifact «Ivar og Locke»). Målt: Locke endrar 58 til 68
  pikslar i overkroppen per steg mot oss, Ivar 13 til 14. Locke har 11 fargar, Ivar 25.
- **Gjort:**
  - Ivar har eit eige, handteikna ark (`ivar_figur.py`) i staden for malen i figur.py:
    hovudet 11 rader og lengre bein som Locke, 18 fargar der den mørke tonen er delt
    mellom hår, bukse og sko, ein hårvirvel som stikk opp, fjørpenn bak øyret, sekk med
    reimar og ein hasselkjepp i åtaket.
  - Gange som Locke: neven kjem fram framfor magen, armen bak forsvinn, beinet bak blir
    bøygd og løfta, og overkroppen vrir seg éin piksel mot armen som svingar fram. No
    64 til 67 pikslar i overkroppen mot oss.
  - Kjensler (rad 6 og 7 i arket): latter, sjokk, sorg, tenkjer, ivrig og les. Eit
    manussteg kan ha `kjensle`, og han varer til samtalen er slutt eller Ivar går.
    Ivar blir ivrig for kvart nytt ord, er sorgtung i opninga og les i boka på slutten.
  - `figur.py alle` hoppar over figurar med eige ark (`HANDTEIKNA`).
- **Lærdom:** Ein hovudperson treng eige, handteikna ark. Malen gir like figurar, og
  personlegdomen kjem frå små ting som bryt forma (virvelen, fjøra, kjeppen) og frå
  kjensleramer.

### Etter runde 14: roleg overkropp, hårsprett og huldra

- Skuldervriinga i gangen opp og ned såg ut som dans og er teken bort. I staden sprett
  virvelen og luggen til Ivar éin piksel til kvar side i takt med stega.
- Huldra har fått eige, handteikna ark (`huldra_figur.py`, felles kode i `handfigur.py`)
  etter Terra og Celes: langt, gyllent hår med strå over heile ryggen (strå som flyttar
  seg i stega, så håret svaiar), lokkar langs andletet, fiolett sjal, grønt liv, gullbelte,
  stutt skjørt, berre bein og kuhale. Kjensler: fnis, sjokk, sorg, tenkjer, lokk og
  sjenert. Namna står i `kjensler` i utsjånaden, og `kjensle` på ei replikk frå huldra
  gjeld henne når ho følgjer Ivar.

### Siger i kampscena

- Etter ein vunnen kamp blir kampscena ståande som i Final Fantasy VI: partiet snur seg
  mot oss og feirar (Ivar lyftar neven, huldra syng kulokk og fnisar), og røynsle,
  skilling, funne ting og nye nivå kjem i eit vindauge øvst, éi line om gongen.
  Sigerrammene står i `siger` i utsjånaden. Den som ligg, får ikkje røynsle.
- Retta: det kvite blinket når ein fiende fell, dekte heile ruta rundt fienden (eit
  grått rektangel). No blir det teikna i forma til fienden.
- `skjerm.html` tek `vinn=1`, som vinn kampen, så sigeren kan sjåast på skjermbilete.

## Runde 15: kjensler for alle, og portrett som følgjer

- **Frå brukaren:** Portrettet til Ivar skulle få kjensler som følgjer rammene, og alle
  figurar skulle ha eit standardsett med kjensler som kan brukast i skripta scener.
- **Gjort:**
  - Standardsettet: glad, trist, sint, sjokk, tenkje og nikk, i fast rekkjefølgje i rad 6
    og 7 i alle figurark. `figur.py` lagar dei for alle figurane frå malen ved å endre
    auge, bryn, munn og hender der andletet er (`kjensle()`), og ved nikk bøyer hovudet seg.
  - Ivar og huldra har standardsettet (nye: sint og nikk) og sine eigne kjensler i rad 8
    (Ivar: ivrig, les. Huldra: lokk, sky). Gamle namn er bytte: latter og fnis er glad,
    sorg er trist.
  - Manus: `kjensle` gjeld den som talar, eller den som står i `kven` (Ivar, Huldra eller
    ein person på kartet). Kjensla varer til samtalen er slutt eller figuren går.
  - Portrett med kjensler: `portrett.py` lagar `<namn>-<kjensle>.png` for personar i
    `PORTRETT_KJENSLER` (no Ivar, alle åtte). Samtaleboksen viser varianten når den som
    talar har ei kjensle, og vanleg portrett elles. Dei blir forhåndslasta.
  - `skjerm.html` tek `kjensle` saman med `tale`, så portrett og figur kan sjåast saman.
- **Står att:** Portrettkjensler for huldra, den framande, presten og dei andre med eige portrett.

### Toning mellom alle scener, og piper med røyk

- Rask toning til svart og tilbake er standard mellom alle scener: dører, inn i og ut av
  kamp, tittelskjermen, verdskartet og kartbyte i manus (`Motor.scene`, `tonUt`, `tonInn`,
  eit svart lag over heile spelet). Kampscena tonar inn først når ho er teikna, og kartet
  tonar inn att etter sigeren. Den gamle pikseloppløysinga før kamp er teken bort.
- Hus med grue eller omn inne har fått mura steinpipe på torvtaket (`pipe=` i
  `stove()` i bygg.py): stova på Åsen og Nedre Hovde, setra og Ekset. Alle piper, også
  teglpipene på prestegarden, har røyk som stig og driv med vinden (`ROYK` i pikslar.js).
- `skjerm.html` tek `etter=1` saman med `vinn=1`, så ein ser kartet kome att etter kampen.
