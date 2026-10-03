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
  eit svart lag over heile spelet). Inn i kamp: først pikseleffekten (kvitt blink og
  stadig større pikslar, som i Final Fantasy), så toning til svart, og kuttet til
  kampscena skjer i svart før ho tonar inn. Kartet tonar inn att etter sigeren.
- Hus med grue eller omn inne har fått mura steinpipe på torvtaket (`pipe=` i
  `stove()` i bygg.py): stova på Åsen og Nedre Hovde, setra og Ekset. Alle piper, også
  teglpipene på prestegarden, har røyk som stig og driv med vinden (`ROYK` i pikslar.js).
- `skjerm.html` tek `etter=1` saman med `vinn=1`, så ein ser kartet kome att etter kampen.

## Runde 16: posar i scener

- **Frå brukaren:** Figurane skulle kunne knele, setje seg og peike i skripta scener (og gjerne
  sove), i same stil, for alle figurane.
- **Gjort:**
  - Ny del av arket: rad 9 til 12 er posane knele, sitje og peike i fire retningar (ned, opp,
    venstre, høgre, der høgre er venstre spegla). Rad 8 står tom i dei genererte arka, så posane
    ligg på same plass som i dei handteikna. Arket er no 48 x 312 for alle figurane.
  - `figur.py` (`poseramme()`): posane blir laga frå ståramma utan arm og stav. Overkroppen
    søkk to eller tre rader, og beina blir teikna på nytt i fargane til figuren (knebukser får
    strømpeleggar). Framanfrå kneler figuren med knea i golvet og sålane ut på sidene, og sit
    med hendene på knea. Frå sida kneler han med eitt kne fram og leggen bak i golvet, og sit
    med låret fram og leggen ned. Skjørt ligg utover golvet når ho kneler, og fell over fanget
    når ho sit. Peike: armen strak ut i skulderhøgd (framanfrå til sida, og figuren flytt éin
    kolonne mot venstre så handa får plass).
  - Ivar og huldra (`ivar_figur.py`, `huldra_figur.py`, hjelparane `senk` og `peik_ut` i
    `handfigur.py`): same posar, teikna frå rammene deira. Kneling frå sida er kroppen frå
    «svak» med hovudet oppreist. Huldra kneler med det stutte skjørtet over beina.
  - Liggje og sove brukar ramma for slått ut. Sove har to små z som stig opp (motor.js).
  - Motoren: `{ pose: "Namn", p: "knele" }` i manus, `Motor.pose()`. Posen varer til figuren
    går, eller til hendinga er slutt, og går framfor kjensla. Den som sit eller ligg, blir
    teikna over inventaret på same rad (benken, senga). Folk kan ha `pose` i kartet: syster
    sit ved langbordet i stova.
- **Vurdert i spelet:** Peike og kneling frå sida er tydelege. Å sitje frå sida les godt for
  Ivar og huldra. Framanfrå er kneling og sitjing berre to til tre pikslar lågare enn ståande,
  og skil seg mest på beina (sålane ut mot skoa fram). Dei les best ved eit bord eller ein benk.
  Svarte klede (presten, den framande) gøymer armen i sidekneling.
- **Står att:** Ein eigen sitjepose på golvet (med beina i kross) og ein liggjande pose sett
  ovanfrå i senga. Posar i kampscena er ikkje i bruk.

## Runde 17: nærbilete av skiftebrevet og kyrkjeboka

- **Oppdrag:** To nærbilete (96 x 72, vist tre gonger så stort med `Motor.naerbilete`) til
  augneblinkane der blekket kjem ut: det danske skiftebrevet etter far (sorenskrivaren i Ørsta,
  1826) og kyrkjeboka i arkivet, med namnet til far.
- **Gjort:**
  - Nytt skript `naerbilete.py` (kjelda, skriv `kjelder/naer-<namn>.pix`), ny type `naer` i
    `pix.py` (maks 40 fargar, samanhengsbilete på den mørke, fiolette glorien frå scena).
  - `skiftebrev`: gulna papir bretta i tre, med lys oppe til venstre og eit bretta hjørne,
    overskrifta «Skifte-Brev» i gotisk kanselliskrift, skråskrift av minimar, underskrift
    med krusedull og raudt lakksegl med band. Blekket smeltar ut av bokstavane, renn ned i
    buktande straumar (nokre endar i ein dråpe) og samlar seg under kanten til ein dråpe med
    gule auge, i same fargar som blekkdropen og Blekklatten.
  - `kyrkjebok-blekk` og `kyrkjebok`: oppslått kyrkjebok i skinnband, linjal med kolonnar,
    postar i skråskrift, og nedst på høgresida «† Ivar Jonsen 1826» med liten, lesbar skrift.
    Med blekk renn postane ut og ned i ein dråpe ved bladkanten. Etter kampen er postane over
    namnet bleikna (blekket har rent ut av dei), namnet står att, og ved sida av står ei
    fin, lilla line (glansfargen til blekket): «Det som er skrive, står.»
  - Brukt i scenene: skiftebrevet etter ristinga, før blekkdropen kjem inn på tunet. I
    arkivet kjem nærbiletet med blekk før dråpen, og det reine før Ivar les namnet. Dei to
    forteljarlinene om boka står att etter bileta (testane i sjekk-scene.html les dei).
    Forhåndslasta i `alleBilete` (`NAERBILETE` i pikslar.js).
- **Rundar:** 1) straumane var rette, tynne strekar og skrifta tunge klossar som lika arabisk
  skrift; namnet gjekk ut over sida. 2) Skråskrift, buktande straumar med dråpe, namnet på to
  liner. 3) Kjelda til straumane vart ein tverrstrek som såg ut som nagler og kors (uheldig i
  ei kyrkjebok); no er det berre ein liten våt klatt på grunnlina. Krona i seglet såg ut som
  eit hus og vart ei stjerne.
- **Vurdert i spelet:** Begge les godt midt på skjermen over teksten. Namnet og årstalet er
  lesbare, den fine lilla skrifta er berre ein antydning.
- **Står att:** Ein animert variant (blekket som renn) og nærbilete til andre scener.

## Runde 18: knele og sitje som syner

- **Frå brukaren:** Ein som ser figuren i spelet, skal straks sjå om han står, kneler eller sit,
  frå alle fire retningar. I runde 16 låg posane berre to til tre pikslar lågare framanfrå,
  knele og sitje var nesten like bakfrå, og armen forsvann i sidekneling i svarte klede.
  (Runde 17 er nærbileta, som vart laga samstundes.)
- **Research:** Terra og Celes i Final Fantasy VI (`ff6fig-terra2.png`, `ff6fig-celes.png`):
  knelande framanfrå søkk hovudet om lag fire rader, og silhuetten blir ein trapes som er
  breiast nedst (knea ut, hendene på låra). Bakfrå kneler Celes med skjørtet utover som ei klokke.
- **Gjort:**
  - `figur.py` (`poseramme()`, `BEIN_FRAMME`, `BEIN_SIDE`, `SOKK`): framanfrå og bakfrå søkk
    hovudet tre rader når figuren sit og fem når han kneler. Den som kneler, lener seg fram
    (overkroppen ei rad kortare, blikket ned), med eitt kne i golvet og det andre bøygd fram
    med handa på. Den som sit, har korte, lyse lår med hendene på knea og leggane i skugge.
    Bakfrå: lyse lærsålar under den som kneler, smale leggar og hælar under setet til den som
    sit, og albogane (ikkje hendene) ved sida. Skjørt: klokke utover golvet med tåa eller
    sålane synlege når ho kneler, fang breiast og skjørtet smalare under setet når ho sit.
    Frå sida søkk kneling fire rader (sitjing tre), og armen til kneet får ein skuggekant mot
    kroppen (`_legg_arm`), så han syner i svarte klede.
  - Ivar og huldra (`ivar_figur.py`, `huldra_figur.py`, ny hjelpar `set_saman` og `ned_blikk` i
    `handfigur.py`): same mål, teikna for hand frå rammene deira.
  - `figur.py ark` lagar no òg `forhand/figurar-posar.png`: stå, knele og sitje i tre retningar
    for alle figurane.
  - Rad 0 til 8 og peike er sjekka piksel for piksel mot arka før runden: like for alle 22.
- **Rundar:** 1) Første utkast: knelinga framanfrå var eit virvar av bein, presten mista
  pipekragen (rada med kragen vart hoppa over) og sidekneling bøygde hovudet ned i kragen.
  2) Kragerada med, større kne, lyse lår og mørke leggar når ein sit, ingen hender bakfrå når
  ein sit. 3) Presten bakfrå var berre hovud og krage over ein liten svart klump: skjørtet tek
  no to rader og overkroppen fire, med lyse sålar under. 4) Kneling frå sida éi rad lågare
  enn sitjing.
- **Vurdert i spelet:** Presten kneler tydeleg ved altarringen (bøygd hovud, krage, svart
  kjole med sålar under). Ivar sit og kneler tydeleg i alle retningar i stova. Syster sit ved
  langbordet og er tre rader lågare enn når ho står, men ho er sett bakfrå framfor benken, og
  utan noko under seg les ho mest som ein liten figur.
- **Står att:** Ein sitjepose på golvet (beina i kross) krev ein ny kolonne i arket og endringar i
  `POSAR` (data.js) og `ARKPOSAR` (pikslar.js). Syster kunne sitje på benken eller kubbestolen
  (eller sjå mot sida), så setet syner. Ein liggjande pose sett ovanfrå i senga.

## Runde 19: bord, benk og kubbestol som eigne bilete

- **Frå brukaren:** Bordet og stolane skal vere eigne bilete i fleire retningar, så eit rom kan
  møblerast på fleire måtar. Den som sit, skal sjå ut til å sitje på stolen, og ryggen på ein
  stol sett bakfrå skal dekkje nedre del av figuren. Syster skal sitje på ein kubbestol ved
  bordet, sett frå sida, og vere synleg når Ivar talar med henne.
- **Gjort:**
  - `inventar.py`: `langbord` (4 x 2, liggjande) og `langbord-staande` (2 x 4) utan stolar, med
    trefat og graut, flatbrød i stabel, brød, kniv og ølbolle, kvar med ein smal skugge på plata.
    Plata ligg 14 pikslar over golvet (`BORD_HOGD`) og dekkjer heile fotavtrykket.
    `benk`, `benk-kort` (4 og 2 fliser) og `benk-staande`, `benk-staande-kort`. `kubbestol-ned`,
    `-opp`, `-venstre`, `-hogre` (1 x 1): ein hol stokk med rundt sete og rygg rundt sidene, laga
    som små kubar (Z, djupn, X) som blir teikna bakfrå og fram med fast tone per flate.
    Ny farge `q` (furu lysast) til toppflatene.
  - Motoren: `SETE` i `pikslar.js` (hogd, retning, fram). Den som sit på ei rute eit sete dekkjer,
    blir lyft opp på setet (`SITJE_DY` i `motor.js` legg til tre pikslar framanfrå, så beina heng
    framfor setet), mistar skuggen på golvet og blir sortert etter den nedste rada til setet.
    `fram: true` teiknar stolen over den som sit. Ein stol med retning snur den som set seg.
    `sete: [dx, dy]` på folk er fjerna.
  - `asen-stova`: langbordet på rad 2 og 3, benk framfor, kubbestol ved kvar ende. Syster sit på
    stolen til venstre (2, 3) og ser mot bordet, storebror står på (8, 2). Testen i
    `sjekk-scene.html` set Ivar på (2, 4).
  - Ekset, prestegarden og kontoret er ikkje møblerte om. `inne-stol` (Ekset) vart prøvd som sete
    sett bakfrå, men den høge ryggen gøymde heile den som sit, så han står ikkje i `SETE`.
- **Rundar:** 1) Ryggen på kubbestolen var ti pikslar høg og gøymde alt under halsen bakfrå; no
  sju. Framanfrå sat figuren på bakre halvdel av setet; han blir no teikna tre pikslar lenger
  ned. 2) Stolen var bleik som ein sekk og hadde to sprekker som såg ut som auge; mørkare
  tonar per flate og ingen sprekker. 3) Årer i bordplata og benken var einsame pikslar; no
  korte strekar. Syster sat inntil grua; stolane flytte ei rad ned.
- **Vurdert i spelet:** Stova ser ryddig ut: bordet med ting, benken framfor og stolane ved
  endane. Syster sit tydeleg på stolen, og når Ivar står under henne, syner hovudet og
  overkroppen hennar over han. Alle fire retningar på kubbestolen og benkene les godt
  (demo med folk på alle seta, ikkje i spelet).
- **Står att:** Ein benk bak bordet blir gøymd av bordet (rett, men då syner berre den som sit).
  Ryggen rundt sida på `kubbestol-venstre` og `-hogre` ligg bak den som sit, også den delen som
  eigentleg er nærast kameraet. Prestegarden og kontoret har stolane inne i biletet til
  spisebordet og skrivepulten, og er ikkje møblerte om.

## Runde 20: auge som i Final Fantasy VI

- **Oppdrag:** Auga i Final Fantasy VI (Locke, Terra, Celes) brukar fleire pikslar enn vårt eine
  mørke strek per auge, og gir figurane meir uttrykk. Alle figurane (Ivar, huldra og NPC-ane)
  skal få same oppbygging.
- **Research:** Celes framanfrå (z-celes2.png, 10 px per piksel): ei mørk vippeline over kvart
  auge, så ei rad med augekvite ytst og mørk blå iris inst, og under berre irisen. Frå sida er
  irisen framme og kvita bak. Lukka auge er strekar.
- **Gjort:**
  - Ivar (`ivar_figur.py`) og huldra (`huldra_figur.py`): `ff6_auge()` byter augeradene etter
    innhald i gange, kamp og galdr, så posane (som blir avleidde etterpå) får dei same auga.
    Iris `I` mørk blå hjå Ivar, `E` grøn hjå huldra. Sjokk med store kvite auge og små
    pupillar, sint med skrå bryn, tenkje og sjenert ser til sides eller opp. Når dei kneler,
    ser dei ned (`blikk_ned`): kvita og den øvre irisen blir hud.
  - NPC-ane (`figur.py`): auga ligg i `HOVUD` (vippeline `e`, kvite `W`, iris `K` med fargen
    `auge` i utsjånaden, standard mørk blå). Kjenslene teiknar auga på nytt (glad ^ ^, trist
    med augneloka nede, sjokk, tenkje, nikk). Attlatne auge og blikket ned finn auga etter
    innhald (`auge_ruter`, `lukk_auge`). Under briller blir kvita og vippa hud.
- **Vurdert:** Forstørra utsnitt av åtte NPC-ar, Ivar og huldra framanfrå, frå sida, i alle
  kjensler og posar. Auga les godt hjå skalla, skjeggete, skaut, lue og briller. Der luggen
  dekkjer vippelina, glir ho over i håret, slik som hjå Locke.
- **Står att:** Portretta (48 x 48) er ikkje endra. Vippelina gjer bryna tunge frå sida.

## Runde 21: lyset som i Final Fantasy VI

- **Oppdrag:** Lyset skal likne Final Fantasy VI. Stemningane var mjuke canvas-gradientar (vignett,
  gradientar over heile kartet, mjuke radielle lyshol i eit mørkt lag), og ingenting av det kunne
  Super Nintendo gjere.
- **Research:** ff6hacking.com (hendingskommandoar), SNESdev wiki og nesdoug om color math. I FF6 er
  lyset mest teikna inn i pikslane. Maskinvara legg til, trekkjer frå eller tek snittet av ein fast
  farge (COLDATA) med klemming per kanal, i 15-bit fargar. HDMA endrar fargen linje for linje, i
  trinn. Fakler og vatn er palettanimasjon. $50/$51/$53 tonar heile skjermen, bakgrunnen eller
  figurane kvar for seg, $55 blinkar i ein farge, $63 er ein spotlight med skarp kant.
  Referansane `ff6bak-by.png` (tåka over byen: gjennomsiktige, hardkanta former) og
  `z-ff6-strand-by.png` (lyset teikna i flisene).
- **Gjort:**
  - `lys()` i `motor.js`: etter at kartet er teikna, éin `getImageData`, fargerekning per piksel med
    oppslagstabellar per band på 8 rader (`Uint32Array`), éin `putImageData`. 5 bit per kanal.
    Pikslar utanfor kartet blir ikkje rekna om (backdrop).
  - Figurmaske: folk og vesen blir teikna på eit eige lerret i same rekkjefølgje, og hus, tre, murar
    og møblar framfor viskar ut maska. Berre rektangelet rundt figurane blir lese. Bakgrunn og
    figurar har kvar sine innstillingar.
  - `STEMNINGAR` og `LYSKJELDER` i `data.js`: ein tabell med `bak`, `fig` (p, snitt, lys), `hdma`,
    `glod` (tre nivå), `syklus`, `skyer`/`skugge`, `kjelder`, `ivar`, `straalar` og `sepia`.
    Vignetten og alle gradientane er borte. Den mjuke gløden rundt lykta i flisa `L` er fjerna.
  - Glødformer: ellipsar i tre nivå med ein dithera kant på éin piksel (stempel som strekar), rundt
    grua og kakkelomnen (der elden i `Pikslar.ILD` er), ljos, lykter og peis. Fargane går på
    rundgang i same takt som elden (150 ms).
  - Kyrkja: lysstrålar frå vindauga som parallellogram skrått ned (eitt steg per to rader), i tre
    trinn, med snitt mot kvitt i kjernen. Arkivet: lyssirkel rundt Ivar og lampa, resten nesten mørkt.
  - Scenesteg: `tone` (alle, bakgrunn, figurar, i heile steg), `blink` med `rgb`, `spot` (skarp
    sirkel, svart utanfor, dithera band på tre pikslar). `ton` til svart og kvitt går i 16 trinn
    (`steps(16)`). Blekklatten-scena brukar dei: rommet mørknar medan blekklatten held fargane,
    fiolett blink, og spotlight på Ivar når han les i kyrkjeboka.
  - Sjekkar i `sjekk-spel.js` for stemningane, lyskjeldene og dei nye stega, og ein test i
    `sjekk-scene.html` for at toning og spotlight går attende.
- **Rundar:** 1) Gløden lyste opp det svarte utanfor stova: backdrop blir ikkje rekna om. 2) Lysekrona
    og altarljosa i kyrkja gav kvite skiver på golvet: kyrkja har ingen lyskjelder, berre strålar.
    Ljoset var for stort (r 30 til 24), og gløden frå grua låg oppe på veggen: midten flytt ned
    framfor grua. 3) Arkivet var for lyst og kaldt: grunnen mørkare (lys 6), varmare midt i
    lyset. 4) Kvelden var marineblå: mindre raudt trekt frå, litt blått lagt til, så han blir fiolett.
    Skyskuggane i kvelden var svarte flekkar (skugge og hdma blir lagde saman): svakare skugge.
- **Vurdert:** Før/etter for alle tretten karta (`forhand/skjerm/ark-for-*.png` og `ark-e-*.png`).
  Morgonen er varm med skyskuggar som tåka i FF6, kvelden fiolett, stovene lune med eldlys,
  arkivet mørkt, kyrkja lys med strålar, minnet falma. Toning av bakgrunnen held figurane
  fargesterke, som i FF6.
- **Yting:** Edge utan skjerm (programvareteikning): om lag 0,4 til 0,7 ms for sjølve rekninga, og
  0,7 til 1,4 ms median med lesinga av lerretet (som òg tvingar fram teikninga av kartet).
- **Står att:** Glødformene er rekna ellipsar, ikkje teikna for hand per kjelde. Elden i grua
  flimrar i pikslane, men gløden byter berre fargar (ikkje form). Kontoret har berre eitt ljos og
  ser nesten ut som før. Kampscena har framleis sine eigne blink.

## Runde 22: handteikna glød rundt kvar lyskjelde

- **Oppdrag:** Gløden rundt lyskjeldene var utrekna ellipsar i tre nivå med ein dithera kant, og
  flimmeret var berre fargar på rundgang. Som i Final Fantasy VI skal gløden vere malt for hand og
  høyre til kjelda, og forma skal flimre med elden.
- **Research:** `ff6bak-inne.png`, `ff6bak-by.png` og `z-ff6-strand-by.png`: lys og skugge i FF6 er
  hardkanta flater i to til tre tonar med ein smal, ujamn dither-overgang, og lampa ved døra kastar
  ein boge av lys opp på veggen. Golvet blir sett på skrå, så pølar er låge og breie.
- **Gjort:**
  - `tools/pikselkunst/glod.py`: éin funksjon per glødform, teikna rad for rad (`rader`, `profil`)
    med handplasserte dither-pikslar (`prikk`), og med parameteren `r` for flimmerramma. Skriv
    `kjelder/lys-<namn>.pix` (type `glod`) og `bilete/spel/lys/<namn>.png`, og `forhand/lys-ark.png`.
    Formene: `grue` (3 rammer: låg, brei pøl på hellene, kvitkalken, bogen opp på bakveggen til høgre
    for hetta og sideveggen), `kakkelomn` (3: glo i døra, glorie rundt omnen, vifte ut over golvet),
    `peis` (3: lys opp på muren ved sida og ei låg vifte), `lys` (2: smal og høg over flammen, liten
    pøl ved foten), `lykt` (2: rund glorie, midje langs stolpen, pøl og ein sterk flekk på bakken
    under), `krone` (2: små gloriar ved dei fire ljosa og ein pøl på golvet), `ivar` (2: ljoset Ivar
    ber i arkivet) og `sky` (skyskuggen). Fargen i biletet er trinnet (raudkanalen), og ein magenta
    piksel er ankeret.
  - `motor.js`: `glodform()` les biletet éin gong, finn ankeret og gjer kvar ramme om til strekar
    (rad, x frå, x til, nivå), og `stemple()` legg dei inn i lysnivåa som før. `glodRamme()` vel ramma
    etter `rekkje` i `LYSKJELDER` (150 ms per steg), forskoven per kjelde så dei ikkje flimrar i takt.
    Ellipsane (`glodForm`) og dei tre skyellipsane er fjerna. Fargerundgangen er behalden.
  - `LYSKJELDER` i `data.js` har `rammer` og `rekkje`, `ivar: true` i stemninga `mork`. Peisen
    (`f`) har eiga form og ankeret nedst i eldopninga. Grua og omnen har ankeret nedst midt i elden.
  - Nytt: flisa `T` (lykt på stolpe utan kvileplass) i utmarka ved setra og to på vegen til Ekset,
    så kveldskarta har lykter. Ein peis i kontoret. Kyrkja har `kjelder: true` (lysekrona og
    altarljoset).
  - Bileta er forhåndslasta (`alleBilete`), og `sjekk-spel.js` sjekkar at kvar glødform finst,
    at breidda går opp i rammene og at rekkja peikar på rammer som finst.
  - `skjerm.html` spelar opningsscena ferdig før kartet blir lasta (elles låg samtalen over
    biletet, og scena heldt fram på feil kart med feil i teikninga).
- **Rundar:** 1) Gløden var for lita og svak samanlikna med ellipsane: grua og kakkelomnen vart
  større, og trinna i `inne` litt sterkare. 2) Lykta ute gav gulgrønt lys på graset: trinna i
  `kveld` tek no snittet mot ein oransje farge, så lyset blir varmt. 3) Gloriane på lysekrona låg
  over ljosa som rosa dottar: flytte ned på flammane og gjort mindre.
- **Vurdert:** Før/etter for asen-stova, prestegarden, kontoret, nedre-hovde, ekset-stova, arkivet,
  kyrkja, utmarka og vegen (`forhand/skjerm/for22-*` og `e22-*`). Grua kastar bogen opp på veggen og
  ein trappa pøl over golvet, ljosa har smal, høg glød, kakkelomnen ei vifte, lykta ein glorie og ein
  pøl, lysekrona ein pøl på golvet. Ljoset rundt Ivar i arkivet er ein rund flekk i tre trinn med
  dithera kantar.
- **Yting:** Målt i Edge utan skjerm i verkeleg tid (median av 60 bilete): 0,7 til 1,2 ms med lesinga
  av lerretet og 0,4 til 0,6 ms for sjølve rekninga, same som før (runde 21).
- **Står att:** Grua er teikna for hjørnet til venstre (asen-stova og nedre-hovde). Ei grue på ein
  annan stad treng ei eiga form (spegla). Gløden blir ikkje skugga av møblar.

## Runde 23: vatn som i Final Fantasy VI

- **Oppdrag:** Bekken i utmarka, sjøen på Åsen og alt anna vatn var metta blått med små krusingar og
  glitter, og strandkanten var ei lita bølgje per flis. Vatnet skal teiknast slik Final Fantasy VI
  teiknar Lete-elva: lågare enn landet, med skrent, fritt teikna strandkant og breie band som flyt.
- **Research:** `forhand/referansar/elv/ff6-0122.png` til `ff6-0134.png` (flåteturen), `elv-ark.png` og
  `elv-naer.png`. Vatnet i FF6 har fire grå tonar (`#404848 #485050 #606860 #808880`): dei to mørke er
  nesten like, og dei lyse banda er vinklar på tvers av straumen, om lag ein tredel av flata, med
  dithera kantar. Breidda er ein skrent av lyst berg under ein grastopp, med ei lys skumline nedst og
  mørkare vatn under. Strandkanten buktar seg fritt over flisgrensene. Stryk er loddrette, lyse
  striper med ein vassrett skumkant nedst.
- **Gjort:**
  - `Pikslar.vatn(t, felt, x, y)` i `pikslar.js` er skriven om. Strandkanten er eit felt over
    kartpikslane: kor stor del av ein kvadrat på 32 pikslar rundt pikselen som er land, mot ein
    terskel med glatt verdistøy (`vstoy`). Indre hjørne blir fylte og ytre hjørne runda av, utan
    eigne reglar for hjørne, og naboflisene reknar same feltet, så kanten held fram. Bekken får
    mindre nes enn sjøen.
  - Vatnet ligg lågare: skrent på 3 eller 4 pikslar under landet i nord (jord under gras, berg ved
    stein og steingard) med mørk lepp av gras over, lyse klumpar og sprekker; tre pikslar side i vest
    (skugge) og aust (lys); skumline der skrenten møter vatnet og skuggestripe (2 pikslar og ei dithera
    rad) under. Sand har våt sand og skum, ingen skrent.
  - Fire dempa, grå-turkise tonar (`VATN`) og ein bandprofil på 16 pikslar (`BAND`). Bekken har vinklar
    som flyt nedover (eitt steg per 4 tikk), sjøen rolege band som rullar inn mot land (per 10 tikk).
    Krusingane, glitteret og steinen i bekken er fjerna.
  - Stryk: `vatn: { bekk: true, stryk: [...] }` på kartet. I utmarka der bekken kjem ned frå skogen
    (rad 0 og 1) og under brua (rad 13). Loddrette striper som renn to pikslar per fase, dither, og
    skumkant nedst med sprut øvst i flisa under.
  - Yting: det faste i kvar flis (land, skrent, skum, skugge, bandkoordinat) blir rekna éin gong
    (`vassGrunn`), og kvar av dei 16 fasane blir fylt med éin `putImageData` og lagra i cachen.
  - `motor.js`: `vassfelt()` per kart (kva som er land, brua er vatn under, `mjuk` bakke). Mjuke
    landfliser ved vatnet får eit vasslag, så vatnet et seg inn i spissen på ytre hjørne (ikkje ved
    bruendane). Skog på kartkanten under enden av ei brygge blir vatn (grana under brygga på Ekset).
  - `skjerm.html`: `stemning=ingen` tek bort lyset, så fargane kan sjåast utan kveldslys.
    `sjekk-spel.js` sjekkar at stryka ligg på vatn.
- **Rundar:** 1) Sidene av bekken var éin lys piksel og såg ut som eit omriss: tre pikslar skrent
  med sprekker, og glisnare skum på sidene. Neset var for lite til å syne: større kvadrat (R 16) og
  sterkare støy. 2) Banda var for breie og lyse, så vatnet såg lyst ut med mørke vinklar: lyse band
  om lag ein tredel, og dei to mørke tonane nesten like, som i FF6. 3) Spissen på landflisa ved eit
  steg i bekken vart ståande som ein rett vinkel: vasslag på mjuke landfliser.
- **Vurdert:** Før/etter (`forhand/skjerm/for23-*` og `e23-*`): bekken i utmarka (y 9 og y 3), sjøen på
  Åsen, vegen, Ekset og minnet om far. Bekken buktar seg mellom jordskrentar med skumline, banda flyt
  nedover, stryket under brua og ved skogen har kvite striper og skumkant. Sjøen har sandstrand med
  våt kant, jordskrent under graset og bergskrent ved steinen. Lyset (kveld, sepia) legg seg oppå som før.
- **Står att:** Skrenten er låg (3 til 4 pikslar) samanlikna med dei høge berga i FF6. Banda i sjøen er
  vassrette (alle sjøane har land i nord) og følgjer ikkje ei strand som går på skrå. Overgangen mellom
  sandstrand og grasskrent skjer ved flisgrensa.

## Runde 24: stiar som i The Minish Cap

- **Oppdrag:** Stiane (`=`) var raudbrun jord med grå småstein, éi flis breie, med ein mørk graskant per
  flis og runda hjørne (`stiHjorne`). Dei skal teiknast slik The Minish Cap teiknar vegar og stiar.
- **Research:** `forhand/referansar/tmc-shf-heil.png` (South Hyrule Field), `tmc-sti-naer1.png`,
  `tmc-sti-naer2.png` og `z-links-house.png`. Stien i Minish Cap er tråkka jord i gyllen oker som høyrer
  saman med graset (låg kontrast), med mjuke, ovale søkk og nokre lyse prikkar. Kanten har soner: lyst,
  kort gras næmast, og ei frynse av små, varme oransjebrune strå som lener seg inn over stien i ein
  bølgjande kant. Hovudvegane er om lag to fliser breie, kryssa har små plassar, og kanten følgjer ikkje
  rutenettet.
- **Gjort:**
  - `Pikslar.sti(felt, tx, ty)` i `pikslar.js`: stien er eit lag over grasflisa. Kanten er eit glatt felt
    over kartpikslane, som strandkanten i runde 23: delen veg i ein kvadrat på 24 pikslar rundt pikselen
    (`STI_R`), så svingane blir runde, indre hjørne fylte og kryssa får små plassar av seg sjølv. Feltet
    blir lese med ei forskyving på opptil 4 pikslar (låg frekvens, `vstoy`), så stien buktar seg litt
    bort frå rutenettet. Ved dører, murar, gjerde, bruer, hus, vatn og kartkanten er forskyvinga null
    (`stiFri`), så stien møter døra og kantdøra rett.
  - Sonene: lyst, kort gras (to pikslar) og mørke røter, så strå (1 til 4 pikslar) som veks inn over
    stien og lener seg til éi side, oransjebrune og nokre gulgrøne, i tette grupper og glisne parti.
    Mot høgt gras (villgras) heng mørke tuster inn over stien i staden.
  - Overflata: gyllen oker (`STIFARGE.lys`), ovale søkk på 5 til 8 pikslar (mørk midte, lys nedre kant)
    og glisne lyse prikkar. Ingen gråstein. I utmarka og på vegen (golv `,`) er okeren dempa og gulare
    (`STIFARGE.mork`), fordi kveldslyset trekkjer mykje grønt frå: han blir brun i kveldslyset, ikkje raud.
  - `motor.js`: `stifelt()` per kart (slag: veg, gras, villgras eller anna; fast). Vegflisa får grasflisa
    under (høgt gras om naboane mest er villgras), og grasfliser inntil ein sti får laget òg, så stien kan
    flytte seg inn på dei. Graskanten og `stiHjorne` gjeld no berre sand. Flisa `=` åleine er ny oker.
  - Kart (`data.js`, berre gras gjort om til sti): to fliser brei veg gjennom Hovdebygda (rad 10) og
    over tunet på Åsen (rad 8), plass framfor døra på stova og løa på Åsen, framfor kyrkjedøra (innanfor
    porten) og utanfor porten, framfor prestegarden, Nedre Hovde og bua. Vegen til Ekset er to fliser brei
    heile vegen, og på Ekset er vegen frå kanten brei og har ein plass framfor døra. Plass ved setra i
    utmarka. Ingen merke, dører, folk, kister eller bygg er flytte.
- **Rundar:** 1) Stråa var lange, tette strekar som såg ut som ein kam: glisnare strå som lener seg, og
  grupper med ulik lengd. 2) Søkka var tynne strekar: ovale søkk med mørk midte og lys nedre kant.
  3) Vegflisa i utmarka hadde lågt gras under, så rutenettet synte som lyse rektangel langs stien: høgt
  gras under når naboane er villgras. 4) Okeren vart raud i kveldslyset: gulare, dempa oker på mørk bakke.
- **Vurdert:** Før/etter (`forhand/skjerm/for24-*` og `e24-*`, med og utan lys): Åsen, Hovdebygda,
  utmarka, vegen og Ekset. Stiane er gyllen oker i morgonlyset som i Minish Cap, med lys graskant og ei
  frynse av strå, runde svingar og plassar i kryssa. Hovudvegane er breie, og kanten buktar seg litt.
  I kveldslyset er stien brun mot det mørke graset.
- **Står att:** Stråa følgjer retninga til kanten i fire retningar (ikkje på skrå i svingane). Søkka ligg
  i eit fast rutenett over kartet. Stiane har ikkje skrent eller trapp der dei går ned mot vatnet.

## Runde 25: Åsen som ein ås, med stup og utsikt

- **Oppdrag:** Kartet `asen` var flatt: tunet, bøen og ein sjø nedst. Det skal sjå ut som ein ås med
  høgd, som klippene over Narshe i prologen til Final Fantasy VI (høg bergvegg, figurane på ei hylle) og
  toppen av pyramiden i A Link to the Past (plattforma på kartlaget, landskapet langt nede som eit eige
  lag med parallakse). Utsikta er dalen med Hovdebygda og fjella rundt.
- **Research:** `forhand/referansar/narshe/ff6-0008.png` til `ff6-0014.png` og `narshe-ark.png`: berget i
  Narshe er store, runde knausar med lys venstre side og djupe, blåsvarte renner, småbrot i blokker, og
  fem til seks varme grå tonar. `konsept/hovdebygda.jpg` (Ørsta og Hovdebygda ovanfrå): dalbotnen med
  teigar, gardar og elva, skog i liene og fjell i dis bak.
- **Gjort (motoren):**
  - Parallakse (`motor.js`): `parallakse` og `forgrunn` på kartet, `[{ bilete, faktor, ved, x, y }]`.
    Posisjonen er `x - (kamera - ved) * faktor`, runda til heile pikslar for seg; kameraet står på heile
    pikslar, så laga flyttar seg monotont og ristar ikkje. Bakgrunnen blir teikna først (berre innanfor
    kartet), forgrunnen etter figurane og før lyset. `luftfarge` fyller under.
  - Luftfliser (`-`): ingen bakke, ikkje gangbare. Pikslane der bakgrunnen syner (luft, og dei opne
    pikslane nedst i stupet), blir nivå 5 i lyset: stemninga sin `fjern` (eller `bak`) og hdma, men ingen
    skyskugge og ingen glød. Luftperspektivet er måla inn i bileta.
  - `kameraNed: { fra, til }`: ved stupet ser kameraet ei halv rad lenger ned per rad (2 rader på Åsen),
    så utsikta får 80 pikslar. Spelaren går 2 pikslar per tikk og kameraet 3: framleis heile pikslar.
    `kameraPx()` gir øvre venstre hjørne i pikslar, og `kamera()` byrjar der kameraet faktisk står.
  - Terreng (`pikslar.js`): `Pikslar.skrent` (bakkekant), `underSkrent` (slagskuggen på flisa under),
    `rampe` (stien med trinn) og `stup` (bergveggen med dis og opne pikslar), alle over kartpikslane så
    kantane held fram frå flis til flis. `s`, `M` og `-` er faste, `/` er veg.
  - `sjekk-spel.js`: stup har stup eller luft under seg, luft har luft under, ramper ligg i ein skrent,
    bileta finst, faktoren er rett, og det bakaste laget dekkjer lufta for alle kameraposisjonar.
- **Gjort (kartet og bileta):**
  - Åsen i tre nivå: skogen øvst (rad 0) over ein skrent (rad 1) med rampe ved kantdøra mot utmarka
    (13,1); tunet på midten (rad 2 til 8); ein skrent (rad 9) med ramper ved x 8 og x 24, og bøen med
    åkeren og stabburet under (rad 10 til 13). Nedst stupet (rad 14 og 15) og luft (rad 16 til 20), eit
    nes ved x 21 til 23 som stikk ut over stupet. Kartet er 21 rader (var 17); breidda, merka, dørene,
    folka og bygga står der dei stod. Gjerdet over åkeren og sjøen er borte.
  - `tools/pikselkunst/utsikt.py` (kjelda) skriv `bilete/spel/parallakse/`: `dal` (dalbotnen med
    Hovdekyrkja, elva, vegen, teigar med steingardar, gardar med torvtak, skogen nedst i åsen i dis øvst
    og skogen på andre sida nedst), `fjell` (alpine toppar på sidene og ei fjern rekkje i midten, himmel
    i dis), `greiner` og `gras` (forgrunn, med spegla `-h`). Bileta blir forhåndslasta.
  - Minnet om far (`minne-far`): sjøen er bytt ut med same stupet og utsikta, i sepia.
  - Flytt: ingenting i scenene. `EKSTRA_MERKE` gir `asen` merket 1 midt på tunet (13,7), for testar og
    skjermbilete (før landa dei på (1,1), som no er skrent). Testen der følgjet står i vegen
    (`sjekk-scene.html`, del 14 b) tek bort hindringa frå del a først, fordi følgjet ikkje lenger kan vike
    ned (rad 14 er stup); han sjekkar det same som før.
- **Rundar:** 1) Stupet var ein låg vegg av like søyler og hyller, og såg ut som ein steinmur: store
  knausar og renner som i Narshe, færre hyller. 2) Skrentane var ein band av grå stein og såg ut som
  steingardar: graskledd skråning med jord og nokre nabbar. 3) Fjella låg bak dalen og synte berre som
  snøflekker: toppane lenger ned, så dei står under skogkanten, og flankar med lys og skugge per rygg.
  Skystripene såg ut som strekar og er tekne bort. 4) Utsikta var berre 56 pikslar høg: `kameraNed`.
  5) Greinene var spreidde blad (støy): hengande kvistar med samla lauvklasar.
- **Vurdert:** Skjermbilete (`forhand/skjerm/r25*`, `r25-oversyn.png`): oppe ved skogen, på tunet, ved
  åkeren, ved stupet, på neset og ved kantdøra mot bygda, med og utan morgonlys, og scenene `framande`
  og `skiftebrev` (`tools/bilete-spel.py`). Åsen les som ein ås: tunet ligg på ei hylle mellom to
  bakkekantar, bergveggen fell ned i dis, og dalen med kyrkja, gardane og elva ligg langt nede og glir
  saktare forbi enn kartet, med fjella endå saktare.
- **Står att:** Skrenten øvst er berre éi rad, og mykje av han ligg bak taka. Rampene er rette (ikkje
  på skrå); ein skrå sti ville krevje rørsle på skrå eller fleire rader. Fjella er små (20 til 30 pikslar
  nedst i utsikta). Bekken eller dammen på tunet er ikkje laga. Sidene av neset er teikna med ei
  lys og ei mørk line, ikkje som eigne sideflater.

## Runde 26: utsikta øvst på Åsen

- **Oppdrag:** Brukaren: klippekanten nedst er grei, men sjølve utsikta bør liggje øvst på kartet. Fjella
  under stupet låg feil veg (kvite, skrå band under dalen).
- **Gjort:**
  - `kameraOpp: { fra, til }` (`motor.js`): når målet er ovanfor rad `fra`, ser kameraet ei halv rad
    lenger opp per rad, opptil `(fra - til) / 2` rader over kartet (fem på Åsen). Over kartet er det luft
    (bakgrunnen syner, nivå 5 i lyset). Koordinatane i kartet er dei same, ingen rader er lagde til øvst.
  - Kanten øvst: rad 0 er toppen av åsen. `N` (og alle flisene i rad 0 på eit kart med `kameraOpp`) blir
    teikna med `Pikslar.nordkant`: ei ujamn graskant 4 til 7 pikslar ned i flisa, lyst gras i kanten og
    nokre strå mot himmelen; over er flisa open. Sett ovanfrå syner ikkje lia bak kanten, berre graset
    som sluttar mot utsikta.
  - Kartet: rad 0 er `#NNNNtNNN#t##4##t#NNNtNNNNN#`: graskant med ei bjørk på kvar side, og skog rundt
    stien til kantdøra mot utmarka (13,0) på ein liten kolle. Rad 1 er gras, med skrent og rampe (13,1)
    berre under kollen. Merke, dører, folk, bygg og scener er uendra.
  - Laga øvst har `opp: true` og er forankra med kameraet fem rader over kartet: `fjell` (himmel med
    lange skyer med lys kant, ei fjern, disig fjellrekkje med snø, nærare fjell på sidene, faktor 0,12)
    og `dal-nord` (dalen sett utover: skogen på andre sida, teigar som blir smalare lenger borte, gardar,
    Hovdekyrkja, vegen og elva, faktor 0,3), som i Narshe-bileta: himmel øvst, fjell, dalen nedst
    nærast kanten.
  - Nedst under stupet: berre `dal` (dalbotnen ovanfrå), utan fjell, og disen aukar nedover til
    luftfargen. Minnet om far har same ordning nedst.
  - `sjekk-spel.js`: `N` berre i rad 0 med `kameraOpp`, og opp-laga dekkjer himmelen og når ned under
    kanten for alle kameraposisjonar. Det bakaste laget under kartet er det første utan `opp`.
- **Vurdert:** Skjermbilete frå toppen (`r26k-topp`), tunet (`r26k-tun`), stupet (`r26k-nede`) og minnet
  (`r26-minne`). Øvst ser ein over graskanten og skogkollen ut over dalen med kyrkja, fjella og himmelen,
  og utsikta glir saktare enn kartet. Nedst fell stupet ned i dis over dalbotnen.
- **Står att:** Fjella øvst er éi rekkje med lik snø; nærare, mørkare fjell syner berre i kantane.
  Kanten i rad 0 er ei line rett over kartet (ingen nes eller viker over fleire rader).

## Runde 27: lia over utmarka, med tjern, fossar og ei kiste på hylla

- **Oppdrag:** Brukaren: utmarka (32 × 22 fliser) skal vere større, med ei skattekiste ein kan finne
  litt høgare opp. Bekken skal halde fram oppover til der han spring ut, og ein skal gå oppover i lia
  med skrentar og ramper som på Åsen. Ikkje rotete: det skal vere lett å sjå kvar ein kan gå.
- **Gjort (kartet):**
  - 13 nye rader øvst (kartet er 32 × 35). Tre nivå: den gamle utmarka nedst (rad 13 til 34), ei hylle
    i lia over ein skrent (rad 12, rampe ved setervegen på 27,12) og tjernet øvst over ein skrent til
    (rad 5, rampe på 24,5). Skogbandet som stengde utmarka i nord (gamal rad 0 og 1) er opna til gras
    med nokre bjørker og graner.
  - Bekken spring ut av tjernet (rad 1 til 3), fell over begge skrentane og renn rett ned i den gamle
    bekken (x 18 og 19). Stryk på fossane (`17,4 18,4 17,5 18,5` og `18,11 19,11 18,12 19,12`) og under
    brua som før (`17,26 18,26`). Stryket der bekken kom ut av skogen er borte, for no held bekken fram.
  - Setervegen går frå vegen under setra (rad 22), opp aust for setra mellom huset og skogkanten (x 27),
    opp rampa til hylla, og vidare nord til tjernet (ein liten plass ved ein stein). Ein sideveg går vest
    over ei klopp (`Q`, rad 9) til kista.
  - Kista (`k-utmark-hylla`, 14,11) står ytst på hylla vest for bekken: 60 skilling og eitt luktesalt.
    Ein ser ho frå setervegen og frå graset under skrenten, men må opp rampa og over kloppa. `spel.js`:
    ei kiste kan no ha både pengar og ein ting («Ivar fann 60 skilling og Luktesalt.»).
  - Lia vest for tjernet kan ikkje nåast og har meir skog, så ho les som skogkant.
- **Flytt (13 rader ned):** kantdøra (15,34), den låste setra (24,19), setra i `bygg` (y 17), den gøymde
  kista (28,28), stryket under brua, `HAUG_UT` (haugbonden går inn i haugen på 8,20) og testane i
  `sjekk-scene.html` (huldra: `plasser(25, 21, 3)`, følgjet på 26,21 og 25,21; haugbonden:
  `plasser(8, 22, 1)` to gonger og haugen på 8,20). Folk står på merke og flytte seg sjølv. Merke 1 er
  framleis kantdøra nedst, så døra frå Åsen fører same staden. `nyeRader: { n: 13, fraH: 22 }` på kartet:
  ei lagring frå før (utan høgd, eller med 22 rader) blir flytt 13 rader ned når ho blir lasta, og
  `lagre()` skriv no høgda på kartet i `st.pos.h`. `sjekk-gange.html` brukar ikkje utmarka.
- **Rundar:** 1) Setervegen gjekk først langs bekken vest for setra (x 21): landkanten i vassflisa vart
  ei flat olivenstripe mellom vatnet og stien, og stien låg klemd mellom bekken og veggen. Han går no
  aust for setra. 2) Fossen over den nedre skrenten slutta i skum, og bekken byrja att eit stykke til
  høgre, fordi bekken tok to steg til sides på tre rader (vassfeltet kneip av hjørna): bekken over hylla
  er flytt éi rute aust, så han går rett ned frå fossen. 3) Bjørker rett under ein skrent dekte kanten
  med krona: flytte ei rad ned.
- **Vurdert:** Skjermbilete (`forhand/skjerm/r27e-*`, med og utan kveldslys, og `r27for-*` frå før):
  tjernet med fossen, hylla med kloppa og kista, setervegen med rampa, graset under skrenten og
  overgangen til setra. Skrentane les som bakkekantar med jord og stein, rampene har trinn, og bekken
  er éin samanhengande straum frå tjernet til brua. Kista syner godt mot graset ytst på hylla.
- **Står att:** Skrentane er éi rad høge, så lia er låg. Det er ikkje noko vad eller steinrekkje (berre
  klopp). Den høge, smale steinen (`o`-varianten på 22,14) står litt einsleg i graset. Lia vest for
  tjernet kan ein sjå, men ikkje gå til.

## Runde 28: stabburet inne og nøkkelen etter far

- **Frå brukaren:** Eit interiør til stabburet på Åsen, og ein nøkkel ein kan finne i stova etter
  den første kampen.
- **Gjort (teikninga):**
  - `inventar.py`: `kornbinge` (3 × 1, tre rom med stolpar, loka står opp mot veggen, korn og mjøl
    med ei trøskjeppe), `tonne` (gjordar av vidje, lok og stein oppå), `kagge` (liggjande på to
    krakkar, tapp i botnen), `flatbrodstabel` (tre stablar på ein låg benk), `spekemat` (fenalår og
    pølser på ei stong, eit band med urter), `stige` (opp til ei mørk luke med ein sekk på loftet),
    `glugge` (opning med dagslys, jernstenger og lem), `sekker` (to mjølsekker av lerret) og `skrin`
    (skrinet etter far i stova: mørk bjørk, jernbeslag, rosemålt lok og papir).
  - Ny golvflis `O` (`pikslar.js`): breie plankar, to per flis, med skøytar og spikarhovud.
  - `glod.py`: dagslys som glødformer, `glugge` (strålen skrått ned mot høgre og ein lys flekk på
    golvet, to rammer der nokre støvkorn flyttar seg) og `dor` (døropninga og ei vifte av lys inn
    over golvet).
  - `naerbilete.py`: `stabburnokkel`, den store nøkkelen av smidd jern med lærband i ringen, på eit
    bretta linklede med ei gulna kvittering.
- **Gjort (spelet):**
  - Stemninga `stabbur` (`data.js`): djup skugge, `dagslys` gir glødformene `dor` (på `E`) og `glugge`
    (på `inne-glugge`) i `lyskjelder()` i `motor.js`. Kjernen tek snittet mot kvitt.
  - Kartet `asen-stabbur` (10 × 7): kornbingane, glugga og spekematen mot bakveggen, stigen i hjørnet,
    tønne og kagge til venstre, flatbrød til høgre, sekker ved døra og ei kiste med rømmegraut og 20
    skilling. Døra (4,6) fører ut til merke 5 framfor stabburet på Åsen.
  - Døra på stabburet (18,10) er låst (`krev: "stabburnokkel"`, «Stabburet er låst. Far hadde
    nøkkelen …»). Første gong med nøkkelen går låsen opp (`vakt`, manus `opne_stabbur`).
  - Skrinet etter far står ved senga i stova (9,2) berre etter skiftebrevet: nye felt på kister,
    `vis` (vilkår), `bilete` (inventarbilete) og `manus` (`fars_skrin`: nærbiletet, nøkkeltinga
    `stabburnokkel` og flagget). Storebror nemner skrinet til Ivar har nøkkelen. Tom kiste: `tom`.
  - Scena `stabburet` første gong inne: Ivar går inn, lukta og lyset, og minnet om far. Dagboka.
  - Testar: `sjekk-scene.html` (låst før, ingen skrin før skiftebrevet, nøkkelen etter, tomt skrin,
    låsen, scena éin gong, ut att og inn att), `sjekk-spel.js` (kister med `vis`, `bilete`, `manus`,
    nøkkelting i kister, `dagslys`). `kjoyr-test.py` gir no 190 sekund virtuell tid.
    `skjerm.html` tek `flagg=` (kommaskilt).
- **Rundar:** 1) Kagga var teikna med botnen mot oss og såg ut som ein gris med tryne og bein: no
  liggjande frå sida med stavar på langs og to krakkar. Flatbrødstablane flaut saman til ein kake:
  smalare stablar med luft mellom og flatare toppar. Kornbinga hadde ein sekk over kanten som såg ut
  som ein kvit lapp, og kornet var berre ei stripe: djupare toppflate og ein haug med lys og skugge.
  Sekkene var så kvite at dei lyste i mørket: dempa lerret. 2) Lyset frå døra var ei smal stripe:
  breiare og lengre vifte. Kagga stod oppå tønna og vart eit tårn: no ved sida av. Golvet hadde dei
  smale plankane frå stova: eiga flis med breie plankar. 3) Skrinet var først kistefliser (to like,
  blå kister i stova): eige bilete. Den mørke kanten rundt jernet på nøkkelen mangla, og lærbandet
  var ein eigen ring: no ein sløyfe gjennom ringen.
- **Vurdert:** Skjermbilete `forhand/skjerm/r28-stabbur`, `stabbur`, `stova-skrin`,
  `asen-stabbur-laast`, `asen-stabbur-opnar` og `forhand/naer-stabburnokkel-8x.png`. Stabburet les
  som ei matbu: kornbingane og spekematen mot veggen, strålen frå glugga som ein lys flekk på golvet,
  og dagslyset frå døra. Skrinet i stova skil seg frå den blå kista. Døra opnar seg på Åsen.
- **Står att:** Spekematen og stigeluka heng over bakveggen i mørkret (taket), utan eigen takbjelke.
  Loftet er berre pynt. Rosemålinga på loket til skrinet er knapt synleg i 1:1. Ivar ser fram (ikkje
  mot kista) i kjensla «tenkje».

### Tillegg til runde 28: takbjelke i stabburet

- Spekematen og stigeluka hang i mørket over bakveggen. Ny `inne-takbjelke` (10 fliser, rad 0):
  ein rund stokk tvers over rommet øvst på bakveggen, med mørke takplankar bak.
- `inne-spekemat` er no 2 fliser høg og heng i hyssingar frå bjelken, ned i rommet.
- Luka i `inne-stige` er flytt ned, så ho er skoren inn i taket ved bjelken.

## Runde 29: toppen av Åsen, og lia som stuper ned under stupet

- **Oppdrag:** Brukaren: dalbotnen under stupet fungerte ikkje; heller klipper og hyller, og når ein
  står ved kanten, skal kameraet gli lenger ned så Ivar står øvst og biletet viser landskapet som
  stuper ned mot dalen. Toppen skal vere lengre på midten, som ein topp, med stien til utmarka litt til
  venstre i eit søkk. Hovdebygda skal liggje til høgre øvst, utsikt mot utmarka til venstre.
- **Gjort:**
  - Toppen: rad 0 og 1 er `----N#tN##4#NoNtN#NNNNNN----` og `NNNN.sssss/sssssss......NNNN`. To kollar
    med skog og ein stein på toppen står over skrentar, og kanten (`N`) fell eit steg ned mot sidene,
    der rad 0 er luft. `Pikslar.nordkant` gjeld no alle `N`-fliser (med luft over) og bøyer kanten i ein
    rund boge ned mot sida der det er luft. Stien til utmarka går i søkket mellom kollane: kantdøra er
    flytt frå (13,0) til (10,0), med rampa på (10,1) og stien over (10,2) til (13,2).
  - Utsikta øvst (`utsikt.py`): `dal-nord` har lia opp mot utmarka til venstre (skog nedst, fjellbeite
    med stein, ein bekk og setra langt oppe) og Hovdebygda til høgre (kyrkja ved x 278), med ein
    skogkledd rygg på skrå mellom dei. `fjell` og himmelen er som før.
  - Nedst: det flate dal-laget er teke bort (`dal.png` sletta). Det nye laget `li` (faktor 0,5) viser
    lia som stuper ned: berget held fram, to hyller med gras, kratt, einer og bjørk, ein ny, mindre
    bergvegg, bratt skog som blir mindre og disigare nedover, og dalen langt nede i dis. `kameraNed`
    har fått `rader`: frå rad 11 til 13 glir kameraet 3 rader ned (5 pikslar per tikk når Ivar går 2),
    så han står øvst på skjermen og lia har over 100 pikslar under stupet. Kartet er 24 rader høgt
    (luft nedst lagd til), ingen koordinatar er flytte der. Minnet om far har same lia under stupet.
  - `sjekk-spel.js`: `N` må ha luft over seg (eller stå i rad 0), luft over kanten er lov, lufta nedst
    blir skild frå lufta øvst, og `dal-nord` må nå ned under den lågaste kanten.
- **Flytt:** kantdøra mot utmarka og merket 4 frå (13,0) til (10,0); den framande går til (10,1) og ut
  nordover (`framande` i `data.js`); testen for vakta mot utmarka (`sjekk-scene.html`, del 10 b) brukar
  (10,0) og (10,1). Utmarka sin kantdør (15,34) går framleis til merket 4.
- **Rundar:** 1) Ivar stod så høgt at hovudet var utanfor skjermen (4,5 rader): 3 rader. 2) Grastuva i
  hjørnet vart ein stor, mørk klump på neset: ho står lenger ned. 3) Skiljet mellom lia og dalen øvst
  var ei loddrett line: ein rygg på skrå. 4) Skogen og dalen i lia var for disige og grå, og skystripene
  såg ut som prikkete strekar: mindre dis, ingen striper.
- **Vurdert:** `forhand/skjerm/r29-oversyn.png`: toppen til venstre (lia og setra), midten (kollane og
  søkket med stien), høgre (Hovdebygda med kyrkja), tunet, bøen og ved stupet og neset med kameraet
  nede. Toppen les som ein topp, og lia under stupet les som eit landskap som stuper ned mot dalen.
- **Står att:** Bergveggene i lia har jamne, loddrette striper. Dalen nedst i lia er mest dis.

## Runde 30: kyrkja inne får eit løft

- **Frå brukaren:** Kan interiøret i kyrkja få eit grafisk løft?
- **Svakast (skjermbilete `forhand/skjerm/kyrkje-for*`):** Bakveggen var ei kvit stripe på éi flis med
  to små, blå vindauge heilt øvst, så rommet såg ut som ei open eske. Benkene var flisa `e`, grå
  rekkverk utan benkedører. Preikestolen var ein brun kopp på ein stav utan himling, altartavla lita og
  enkel, og det var ingen døypefont.
- **Research:** Dale kyrkje i Luster (kalkmåleri og altartavle i bondebarokk) og Nordfjordeid kyrkje
  (benkedører med rosemåling, måla himling, preikestol med himling), nye i `konsept/`. Kvernes, Hove
  og Fåberg frå før. Biblioteket i The Minish Cap: bakveggen er to til tre fliser høg med mykje
  detalj, sideveggene sett ovanfrå.
- **Gjort:**
  - `inventar.py`: `korvegg` (11 × 2 fliser): blå himling med gullstjerner, gesims, raudt draperi med
    gulldusk, kvitkalka mur med to skriftfelt og ein vase med tulipanar (kalkmåleri), to rundboga
    vindauge med blyglas og eit marmorert brystpanel. `altartavle` (3 × 3) er teikna på nytt: to
    etasjar, vridde gullsøyler, krusifiks med Maria og Johannes, akantusvenger, solkrone øvst, og
    altaret med kniplingsduk, antependium og to lysestakar. `preikestol` med himling (krone, gesims,
    lambrekin), ryggbrett, preikestolklede og bibel på pute. `kyrkjebenk-h` og `-v` (5 × 1): lukka
    benker sett bakfrå med fyllingar, ein raud strek under handlista, ei salmebok og benkedøra mot
    midtgangen med utskoren topp og rose. `dopefont`: døypefont av kleberstein med dåpsfat av messing.
    Nytt verktøy `_stempel` for små handteikna motiv (vase, venger, figurar).
  - Kartet `kyrkja` har fått ei rad til øvst (12 rader, fyller skjermen): bakveggen er to fliser høg,
    og vindauga (`u`) står i den nedste rada, så lysstrålane startar ved blyglaset. Benkene er bilete
    på `(`, døypefonten står på (11,4). Alt er flytt éi rad ned: presten kneler på (7,4) (merket `p`),
    står i ringen på (6,3) etter blekklatten, klokkaren står på (2,6) og går til (5,6) i scena
    `presten`, døra er (6,11). Testane i `sjekk-scene.html` er oppdaterte.
  - `motor.js`: inne fell slagskuggen under inventar berre på golvet mellom sideveggene (benkene og
    bakveggen kasta skugge inn på den høgre sideveggen).
- **Rundar:** 1) Maria og Johannes på altartavla såg ut som to flasker: no figurar med slør og hår.
  Lysestakane stod inntil søylene og vart kvite stolpar: flytte inn framfor predellaen. Søylene var
  einsame pikslar: spiralband på to pikslar. 2) Blyglaset var eit sjakkbrett: større ruter. Døypefonten
  var ein pokal: breiare kum, kort fot. Benkene var monotone: raud strek under lista. 3) Skuggen frå
  benkene og bakveggen låg på sideveggen: klipt mot golvet.
- **Vurdert:** `forhand/skjerm/kyrkje-e2`, `kyrkje-e2-ingen` og `kyrkje-e3` (presten i ringen og
  samtale). Koret les som eit kor: høg, måla bakvegg med vindauge som strålane kjem frå, altartavla
  over altaret, preikestolen med himling til venstre og døypefonten til høgre. Benkedørene står
  parvis langs løparen.
- **Står att:** Sideveggene (`Gt`) er framleis kvite blokker sett ovanfrå. Koret har same furugolv som
  skipet (ingen steinheller eller korstrinn; kvileplassen `L` teiknar golvet til kartet under seg).
  Ingen galleri eller klokkarstol. Altarljosa har ingen glød (berre `L` og lysekrona). Flisa `e`
  (gamle benker) er ikkje lenger i bruk.

## Runde 31: høgare stup før første hylla, lia utan dalbotn, og meir djupn øvst

- **Oppdrag:** Brukaren: det første klippenivået nedst skal gå lenger ned, parallaksen fungerte ikkje
  med dalbotnen, og toppen av Åsen skal ha endå meir djupn.
- **Gjort:**
  - `li` (`utsikt.py`): den første bergveggen går dobbelt så langt ned (første hylla ved y 46, var 22),
    den andre hylla og skogen ligg lenger nede. Den flate dalbotnen er borte: ei flate langt borte
    skulle ha glidd mykje saktare enn lia, så ho glei feil. No blir skogen disigare nedover og går over
    i dis (kronene får same dis som skogen under, så dei ikkje flyt).
  - Øvst er det fire lag med kvar sin fart: `himmel` (ny, 0,04: blå, lysare mot horisonten, skyer som
    blir flatare og lysare lenger nede), `fjell` (0,1, no utan himmel og med meir dis), `dal-nord`
    (0,3, sterkare luftperspektiv: meir dis øvst) og `naer` (ny, 0,6: mørke granar og bjørker i lia
    under kanten som stikk opp over graskanten og søkk bak han når kameraet går ned).
  - `kameraOpp: { fra: 12, til: 0, rader: 6 }`: kameraet ser seks rader over kartet (var fem), og
    glir ei halv rad per rad (3 pikslar per tikk). `sjekk-spel.js` brukar `rader`.
  - Ingen merke, dører, folk eller scener er flytte.
- **Vurdert:** `forhand/skjerm/r31-oversyn.png` og `r31q-topp`: øvst stikk trekronene opp over kanten,
  bak dei ligg den disige lia og bygda, fjella og himmelen, og laga glir med ulik fart. Nedst er
  stupet høgt før den første hylla, og lia går over i dis.
- **Står att:** Disen nedst i lia er ei jamn, lys flate.

## Runde 32: lia under stupet som fast lag, og dalen som stig fram (variant)

- **Oppdrag:** Brukaren: parallaksen nedst på Åsen fungerer dårleg; heller eit fast lag med
  pikselkunst, eller prøve å la dalen scrolle inn frå den andre sida.
- **Gjort:**
  - `li` er no eit fast lag (faktor 1, 448 pikslar breitt som kartet): bergveggen, hyllene og skogen
    som går over i dis heng fast i terrenget og glir ikkje mot kartet. `kameraNed` er som før.
  - Variantar: eit lag kan ha `variant: "namn"` og blir berre teikna når kartet har same `variant`
    (standard «fast»). Varianten «dal» har `li-kort` (lia sluttar under den andre hylla) og `dal-under`
    (dalbotnen med Hovdekyrkja og gardane frå runde 26, 448 breitt) med faktor `[1, 1.8]`: han står fast
    sidelengs, men stig fram nedanfrå, raskare enn kartet, når kameraet glir ned ved stupet.
    `skjerm.html` har `variant=dal`. `sjekk-spel.js` godtek faktor opp til 2 bak kartet og sjekkar
    dekninga for laga i varianten kartet brukar.
  - Minnet om far har lia som fast lag.
  - Standard er «fast»: biletet står stødig og heng saman med stupet, utan noko som glir feil. Dalen
    i «dal» syner berre i ei smal stripe nedst (20 til 50 pikslar) og stig fort, så det ser ut som ho
    kjem mot ein.
- **Vurdert:** Seriar medan kameraet glir ned (Ivar på rad 10 til 13 og på neset):
  `forhand/skjerm/r32-serie-fast.png` og `r32-serie-dal.png`.
- **Står att:** Ein lengre dal-variant ville krevje fleire rader med luft under kartet.

## Runde 33: kanten på stupet, overgangen til lia, roleg kamera og gras i vinden

- **Oppdrag:** Brukaren: kameraet skal gli ned først når Ivar står på den nedste flisa, og saktare;
  firkanta hakk der to fliser i kanten stikk lenger ned; overgangen frå den første klippeflisa til lia
  fungerer ikkje; overgangen mellom graset og klippekanten er unaturleg og for jamn; graset i
  forgrunnen kunne vaie i vinden.
- **Research:** Final Fantasy VI (Narshe-klippene) og The Minish Cap skjuler flisrutenettet med kantar
  som går over flisgrensene: graset ligg i tunger over klippekanten, overheng med skugge under, kratt,
  røter og steinar i kanten, og runde hjørne på nes og hyller. Octopath Traveler (HD-2D) gir djupn med
  djupnuskarpheit (det fjerne er uskarpt), volumetrisk tåke som fargar det fjerne blåare og lysare,
  lysstrålar og lag som overlappar (kjelde: Wikipedia om HD-2D og Octopath Traveler, og omtalar av
  tilt-shift og fog i HD-2D).
- **Gjort:**
  - `kameraNed: { fra: 13, rader: 3, fart: 1 }`: kameraet glir ned berre når Ivar står på den nedste
    flisa (rad 13, eller neset), 1 piksel per tikk (0,8 sekund), og attende når han går opp. Glidinga går
    for seg sjølv i tikk-takt (`nedPx`), så ho er uavhengig av gang og sprang.
  - `Pikslar.stup`: ujamn kant (2 til 8 pikslar), strå som heng over, jord med røter, steinar i
    graskanten, rund graskant inn i hjørnet ved eit nes, det bakre berget i ein boge inn i neset, og
    runde nedre hjørne på neset. Med `stupFast` (Åsen og minnet) løyser ikkje berget seg opp i dis
    lenger, men endar i eit mørkt overheng med ujamn kant.
  - `li`: skugge under overhenget (smalare under neset), og djupn som i Octopath: skogen langt nede er
    uskarp (pikslane dobla 2 × 2), disig, og svake lysstrålar fell skrått ned gjennom disen.
  - Graset i forgrunnen vaiar: tre rammer der toppane går 0, 1 og 2 pikslar til sides, i rekkja
    0, 1, 2, 1 med 40 tikk per steg (`rammer`, `rekkje`, `takt` på laget, `lagRamme` i `motor.js`).
- **Vurdert:** `forhand/skjerm/r33-serie-glid.png` (150, 400, 700 og 1100 ms etter at Ivar går ned på
  den nedste flisa: kameraet står i ro til han er framme, og glir så roleg ned), `r33c-nes-naer.png`
  (neset: rund graskant, steinar, røter, overheng) og `r33-gras.png` (rammene i graset).
- **Står att:** Overhenget under neset er framleis eit tydeleg mørkt band.

## Runde 34: dalen under Åsen sett rett ovanfrå

- **Oppdrag:** Brukaren: dalen under Åsen må sjåast meir rett ovanfrå for å verke overtydande.
- **Research:** Landskapet under pyramiden i A Link to the Past og verdskartet i FF6 viser landskap langt
  nede som eit kart: tre som runde klumpar med lys og skugge, åkrar som fargefelt, elvar som band og hus
  som tak.
- **Gjort:**
  - `utsikt.py`: `ovanfra()` teiknar lia og dalen rett ovanfrå: ur og flate knausar ved foten av stupet,
    tett skog som trekroner (gran mørk, bjørk lysare, takka kant, skugge nede til høgre), dalbotnen med
    teigar (furer og kornrader som striper) med steingardar og skigardar som liner, elva med bredd og
    grusører, vegen med bru, gardane som torvtak med tun, Hovdekyrkja som skifertak med kvitt tårn,
    muren og gravsteinar, og tre skyer under oss med skugge på bakken. Dempa og disig, svake lysstrålar,
    og skuggen under overhenget nedst i stupet. `li` (448 × 180), `li-kort` (berre ura og skogen) og
    `dal-under` (dalbotnen) kjem frå same teikninga.
  - `data.js`: kameraet glir 4 rader ned (var 3), så meir av dalen syner, og kartet har ni rader luft
    nedst (var sju), så neset òg får plass. Ingenting anna er flytt.
- **Vurdert:** `forhand/skjerm/r34-li.png` (laget) og `r34-serie.png` (300, 700 og 1200 ms etter at Ivar
  går ned på den nedste flisa, og neset): rett under stupet ura og skogen, så dalen med teigar, vegen,
  kyrkja og elva langt nede, og skyer mellom.
- **Står att:** Teigane er rette firkantar; dei kunne følgt terrenget og elva meir.

## Runde 35: gran og furu, og ein ujamn granskogkant

- **Oppdrag:** Brukaren: gran og furu som eigne objekt, meir detaljerte graner og fleire variantar i
  skogkanten, og ein kant som ikkje er loddrett på venstre og høgre side. Seinare skal det kome fleire
  kartkanttypar; i prototypen held granskog.
- **Research:** Skogkantane i The Minish Cap (`tmc-south-hyrule-field.png`): trekronene overlappar kvarandre
  og blir ein samanhengande masse med ujamn kant, og enkelttre står litt ute framfor. Gran og furu frå
  `konsept/gran-keila.jpg` og `hertervig-skog.jpg`: grana med hengjande greinlag, furua med raudt flass
  oppe, grå bork nedst og flat krone.
- **Gjort:**
  - `natur.py`: `granfigur()` byggjer grana av greinlag som skjørt (smalt oppe, breitt nedst), med
    undersida som bøyer ned mot spissane, sagtakk, ujamne tonegrenser og lyse nålestrøk på venstre side.
    Variantar: `gran1` til `gran3`, `gran-smal`, `gran-gamal` (høg, glisne lag som heng), `gran-ung`,
    `gran-liten`, `gran-lys` (framme i kanten) og `gran-mork1`/`gran-mork2` (innst). `furu()` teiknar
    furua: skeiv stamme, raudt flass oppe og grå, sprukken bork nedst, greiner ut til flate nåleputer
    med tustar, og tynne tørre kvistar. Variantar: `furu1`, `furu2`, `furu-ung`, `furu-gamal`. `torrgran`:
    grå, naken stamme med hengjande kvistar, brune nåler øvst og skjegglav.
  - Nye kartteikn: `i` (frittståande gran) og `F` (furu), med variantar i `NATURTYPE`, faste og med gras
    under. `#` er no berre skogkanten.
  - Kartkantar: `kant: "granskog"` på kartet (standard), typane står i `KANTTYPE` i `pikslar.js`.
    `skogkant()` i `motor.js` finn opne sider (bakke, gras, vatn og kartkanten), `Pikslar.kantfigurar` set
    det fremste treet 0 til 7 pikslar ute mot open mark, eit mørkt tre bak (trekt tilbake), og av og til
    eit lite tre ute på graset. Nedst på kartet berre graner (`nede`), så høge furustammer ikkje står som
    stolpar framfor skogen. `Pikslar.kantflis` gir mørk skogbotn med graset som går ujamt inn frå opne
    sider og frå vatn (glatt felt over kartpikslane). Under strandkanten ved skog er det gras, ikkje skogbotn.
  - Karta: skogen går 1 til 3 fliser inn somme stader på venstre og høgre side i Åsen, utmarka, Hovdebygda,
    vegen og Ekset, og nokre `i` og `F` står i utmarka, på vegen, i bygda, i Ekset og på Åsen.
    Einskildgraner inne på kartet (`#` midt i utmarka) er no `i` og `F`.
  - `sjekk-spel.js`: alle dører, talmerke, kister og folk må kunne nåast frå den første døra (fast grunn
    frå `FAST` i `pikslar.js`), og kanttypen må finnast i `KANTTYPE`.
- **Vurdert:** `forhand/skjerm/r35-vegen.png` (høgre kant: kanten går inn og ut, mørk skog innst, lyse
  graner framme), `r35-bygda.png` (kanten nedst: graner i ulik høgd, ingen rekkje), `r4-asen-topp.png`
  (graner mot himmelen øvst), `r5-utmark-nede.png`, `r6-ekset` (graset ved vatnet) og `r8-minne.png`
  (trea går ikkje ut over kanten av det vesle kartet). Før: `for-vegen.png` og `for-utmark.png` (ei loddrett
  rekkje like graner).
- **Står att:** Fleire kanttypar (lauvskog, berg, myr). Tørrgrana er tynn og blir borte mot graset.
  Furukrona kunne hatt fleire, mindre puter og meir lys i toppen.

## Runde 36: rottene i stabburet

- **Oppdrag:** Brukaren: ein rotte-fiende som Ivar møter i stabburet. Fiende i kampen (same storleik og
  stil som dei andre), ei lita rotte på kartet til scena, og møtet i stabburet.
- **Research:** Wererat i Final Fantasy VI står halvt oppreist med labbane framme; låverotter er
  grå-brune med naken, ringa hale, rosa øyre og føter og gule gnagartenner.
- **Gjort:**
  - `rotte.py` (skriptet er kjelda, skriv `kjelder/fiende-*.pix`): `rotte` (48 × 40) halvt reist på
    bakbeina, vend mot partiet, med krokrygg og bust som reiser seg over silhuetten, lang naken hale i
    ein S-boge, stort rosa øyre, raudt auge under eit sint bryn, glis og to store gule tenner (farleg,
    men litt komisk). `rottemor` (64 × 52): feitare, grå snute, rive øyre, tre rifter over skulderen,
    og ho gneg på eit flatbrødstykke ho held i labbane. `rotte-kart` og `rotte-kart-v` (24 × 14): lita
    rotte på fire føter til kartet, mot høgre og venstre. Skuggen er cel-flater frå silhuetten (lys
    langs kanten oppe til venstre, skugge nede til høgre) og lyse hårstrok i lyset. Pelsen er kjøleg
    grå-brun, så rotta skil seg frå golvplankane.
  - `pikslar.js`: dei fire bileta i `PNG` (utan reservefigur, `reserve` er no valfri).
  - `data.js`: `rotte` (Låverotte, slag «dyr», 18 HP) og `rottemor` (52 HP) i `FIENDAR`. Ny spesial
    `type: "stel"` i `kamp.js`: fienden et eit flatbrød frå sekken og får att HP, eller bit om sekken er
    tom. Scena `rotta`, og `fiendar.vis` på stabburet (tilfeldige rottemøte først etter scena, `motor.js`).
- **Vurdert:** `forhand/skjerm/rotte-kamp-spel.png`, `rotte-flokk-spel.png` (tre rotter) og
  `rottemor-kamp-spel.png` (rottemora og ei rotte) på kampbakgrunnen `inne`, og scena i stabburet
  (rotta ved flatbrødbenken, og etter at ho har snudd seg mot Ivar).
- **Står att:** Rotta på kartet er mørk i stabburlyset. `pix.py sjekk` meiner rottemora er lysare nede
  til høgre (flatbrødet); det er medvite. Kampbakgrunnen er stova (`inne`); ein eigen stabburbakgrunn
  ville passe betre.
- **Tillegg (dei to punkta som stod att):**
  - Kartrotta (`rotte-kart`, `-v`) er ein tone lysare enn kamprotta, med ei kald, lys kantlinje langs
    ryggen og hovudet (dagslyset frå glugga), eit raudt auge som blenkjer, lys snute og ein lys, naken
    hale med ringar. Ho syner no godt i skuggen ved flatbrødbenken i stemninga `stabbur`.
  - Ny kampbakgrunn `stabbur` i `bakgrunn.py`: mørkt, kaldt tømmer utan eldstad, takbjelke med
    spekeskinker og pølser i snorer, tre kornbingar med loka oppe (korn, mjøl, korn), ein benk med
    tynne flatbrødleivar i stablar, to tønner med vidjegjordar, breie golvplankar med slagskugge langs
    veggen, og ein skrå stråle frå glugga med støv som fell ned i ein lys flekk på golvet der fiendane
    står. `asen-stabbur` har `bakgrunn: "stabbur"` (biletet blir forhåndslasta frå kartet).
  - Vurdert: `forhand/skjerm/r36b-rotte-spel.png` og `r36b-mor-spel.png` (rottemora og to rotter):
    rottene står i lysflekken og skil seg godt frå golvet, og strålen går bak dei. Scena i stabburet:
    kartrotta ved benken syner tydeleg.
  - Står att: kartrotta har ingen gangrammer (ho glir).

## Runde 37: hylle og ujamn kant nedst, dalsida som glir over i kart, skyer og elv som rører seg

- **Oppdrag:** Brukaren: den første klippeveggen éi flis lenger; øvst i dalbiletet dalside som glir over
  i perspektivet ovanfrå; kanten meir ujamn i kartet sjølv; ei hylle eitt nivå under platået som ein kan
  gå ned på før det stuper. Og: skyene i dalen skal drive sakte, og elva bør vere animert.
- **Gjort:**
  - Kartet (rad 13 til 27): platået stikk ut i neset (x 21 til 23) og går inn i ei vik (x 25 til 27,
    kanten i rad 12), og under midten (x 4 til 17) går ein skrent med rampe på (11,14) ned til ei hylle
    (rad 15 og 16, med bjørker og ein stein) før det stuper. Stupet er tre rader høgt overalt (var to).
    28 rader i alt. Ingen merke, dører, folk eller scener er flytte; rutene testane brukar på rad 11 til
    13 er gangbare som før.
  - `kameraNed: { kant: true, rader: 4, fart: 1 }`: kameraet glir ned når Ivar står på ei flis med stup
    rett under seg (platået, neset, vika eller hylla), og attende når han går vekk frå kanten.
  - `li` (448 × 212): øvst dalsida skrått framanfrå (tre bergveggar med grashyller som blir lågare og
    breiare nedover, kratt og bjørker på hyllene, skog der granane går frå spisse silhuettar til runde
    kroner sett ovanfrå), så dalbiletet ovanfrå frå y 84, der dei nedste kronene overlappar. Skuggen
    under overhenget følgjer kvar lufta byrjar i kvar kolonne (`LUFTRAD`).
  - Skyene er eit eige lag (`skyer`, med halvgjennomsiktig skugge på bakken) som driv éin piksel per 12
    tikk og går rundt (`drift` i `motor.js`: to kopiar side om side). Elva er eit eige lag (`elv`, fire
    rammer, 10 tikk per steg): lyse band og glimt flyt nedover på ei bølgje på 16 pikslar, berre der elva
    syner (ikkje under tre), med same dis som dalen. Rammene blir klipte ut éin gong.
  - Graset i forgrunnen står lenger nede (kameraet går lenger ned no).
- **Vurdert:** `forhand/skjerm/r37-kantar.png` (platået, neset, vika, hylla), `r37-serie-glid.png`
  (kameraet glir ned når Ivar går ned på den nedste hylleflisa) og `r37-rorsle.png` (fire bilete med
  1,4 sekund mellom: skya driv mot høgre, elva renn).
- **Står att:** Sidene av hylla mot stupet på platået er rette, loddrette kantar.

## Runde 38: overheng, skrå sider på hylla, ur under veggane, og ei roligare utsikt øvst

- **Oppdrag:** Brukaren: det som stikk lengst ut nedst, skal ikkje ha to heile flisar bergvegg under,
  men sjå ut som eit overheng; sidene på hylla skal ikkje vere loddrette; overgangen frå bergveggane
  til dalsida skal vere naturleg. Øvst: det mørkegrøne fjellet på det tredje laget steig bratt og stupte
  rett ned, og kameraet og parallaksen skal vere saktare, så landskapet opnar seg som utsikt.
- **Research:** Klippene over Narshe (FF6) og Minish Cap viser overheng som ei tynn kant med skugge
  under og veggen trekt inn, og skrå, ujamne sider der bergvegg møter lågare mark; foten av ein vegg
  går over i ur og kratt. Octopath og FF6 lèt utsikta frå ein topp stige fram roleg, med dei fjerne
  laga nesten stille.
- **Gjort:**
  - Nytt kartteikn `U` (overheng): under neset (rad 15) og hylla (rad 17). `Pikslar.stup` reknar toppen
    av slike stup éi rad opp (bakken over), så berget bak held fram i same høgd som stupet ved sida, og
    teiknar ei tynn kant (gras, torv, jord med røter, ei berglist, mørk underside), ei skuggestripe og
    berget bak i skugge. Mot lufta på sida smalnar berget under av på skrå. Neset og hylla har no éi
    rad overheng og éi rad vegg (var tre heile rader).
  - Sidene på hylla: stupveggen frå platået går ned på skrå mot hylla, breiare nedst, med kant etter
    ljoset.
  - Botnen av alle stupveggar over lia er ujamn og open (2 til 9 pikslar), og `li` har ei ur av stein i
    same fargar under veggbotnen, med kratt og einer, skugge og litt dis, som glir ned i dalsida.
    `LUFTRAD` følgjer dei nye radene.
  - `dal-nord`: omrisset er samanhengande (lia mot utmarka, ein rund kolle og skogen på andre sida;
    det høgaste vinn), så det er ikkje lenger eit fjell som stuper loddrett ned. Dei andre laga er sjekka.
  - `kameraOpp: { fra: 4, rader: 6, fart: 1 }`: kameraet glir roleg opp (1 piksel per tikk) når Ivar er
    på rad 4 eller høgare, i staden for å følgje kvar rad. Faktorane er lågare: fjell 0,08, dal-nord
    0,22, naer 0,45, så laga stig sakte fram over horisonten.
- **Vurdert:** `forhand/skjerm/r38-nede.png` og `r38-naer.png` (neset med overheng, hylla med kameraet
  nede og oppe, vestkanten), `r38-side.png` (dei skrå sidene på hylla) og `r38-serie-opp.png` (200, 900,
  1600 og 2600 ms medan Ivar går opp mot toppen: utsikta opnar seg roleg).
- **Står att:** Fjella øvst er éi rekkje med lik snø.

## Runde 39: rotta går, og ein sverm på fem rotter

- **Oppdrag:** Brukaren: gangrammer for rotta på kartet, og eit møte med ein sverm på fem rotter etter
  den første kampen.
- **Gjort:**
  - `rotte.py`: `rotte-kart-gang` (72 × 64): tre rammer (står, steg 1, steg 2) i fire retningar som
    figurane (ned, opp, venstre, høgre), 24 × 16 per rute. Frå sida går annakvart beinpar fram og halen
    sviv, framanfrå og bakfrå går labbane opp og ned, og steg 1 lyftar kroppen ein piksel. Den lyse
    pelsen og kantlyset frå runde 36 er med. Framanfrå: store øyre, raude auge, snute og tenner;
    bakfrå: rygg, øyre og halen.
  - `pikslar.js`: `GANGARK` og `vesenGang(namn)` (rammer[retning][steg], forhåndslasta).
    `motor.js`: eit vesen med gangark blir teikna med ramma for retninga og steget, utan gynging.
    I scena `rotta` snur rotta seg med `snu` (ikkje `byt`).
  - Rottesvermen: etter scena `rotta` står rotta som folk på kartet (`vesen`, `atferd: "gaa"`,
    `vis`) og spring omkring ved spekematen. Når Ivar talar til henne, spelar `rottesverm`: ho piper,
    fire til kjem fram frå hola langs veggene, og det blir kamp mot fem `svermrotte` (Smårotte: 9 HP,
    atk 2, def 0, spd 9, xp 3; ho gjer 1 til 2 i skade på Ivar på nivå 1, så svermen er overkomeleg
    åleine). Etterpå er rottene borte for godt.
  - `kamp.js`: plass til fem fiendar (tre bak, to framme i luka mellom dei) og namna A til E.
- **Vurdert:** `sverm-kamp`: fem smårotter på stabburbakgrunnen, alle lesbare, og lista A til E får
  plass. Gangrammene i scena (tolv bilete med 45 ms mellom): rotta spring mot høgre og så ned, og ramma
  skiftar med steget. Scena med svermen: fire rotter står rundt i rommet og ser mot Ivar.
- **Står att:** Rammene framanfrå og bakfrå er enkle; ei rotte sett ovanfrå ville lese betre.

## Runde 40: spiss overheng, og tre variantar av skråkanten

- **Oppdrag:** Brukaren: hylla som stikk ut over dalen skal få ei spissare form, der spissen lengst ned
  nesten berre har graskanten som heng over, med luft rett under. Overgangen mellom skråkanten og det som
  ligg bak og under (berget bak, ura, dalsida) stemmer ikkje heilt.
- **Gjort:**
  - `Pikslar.stup`: overhenget («U») under neset og hylla er ein spiss. Graset heng lengst ned midt på
    (opptil 12 pikslar) og blir kortare mot endane, med ei tynn kant av torv og ei berglist under.
    Berget under finst berre mot endane, der hylla eller neset heng fast; under spissen er det luft
    rett ned, og botnen av berget går på skrå opp mot spissen (skråkanten).
  - Tre variantar av skråkanten (`skra` på kartet, `skra=a|b|c` i `skjerm.html`): a) berget bak ligg
    lenger inn i djup skugge langs kanten, b) ein lys rygg langs kanten som går over i stein og ur
    utan skilje, c) berre ei mørk underside, og dalen syner rett under. Samanlikningsark med etikettar:
    `tools/pikselkunst/forhand/skjerm/r39-skrakant-samanlikning.png` (hylla til venstre, neset til
    høgre, same utsnitt).
  - Valt: b (`skra: "b"` på Åsen). Ryggen og steinane har fargane til ura øvst i lia, så overhenget,
    berget og dalsida heng saman utan skilje, og spissen står fritt.
- **Vurdert:** Samanlikningsarket; i a skil skuggen laga tydeleg, men ser ut som eit hol, i c heng
  berget i lufta med ein hard kant.
- **Står att:** Hylla er så brei at spissen blir ein slak boge; ein smalare hylle i kartet ville gi ein
  spissare form.

## Runde 41: rundt nes, ei hylle som smalnar av til éi flis, og kamera berre ytst

- **Oppdrag:** Brukaren: neset skal bli meir buet att, hylla skal utvidast så høgre side stikk djupare
  ned til éi gangbar flis ytst, og kameraet skal berre gli ned på neset og ytst på hylla.
- **Gjort:**
  - `Pikslar.stup`: graset over overhenget heng i ein rund boge (lengst midt på, buktar seg ut), og
    berget under veks berre mot endane, lågt og rundt, så neset ikkje lenger har ein V og store, mørke
    blokker på sidene. Skråkanten er framleis variant b (lys rygg over i ura).
  - Kartet (rad 17 til 21): hylla held fram under høgre del og smalnar av, fem flisar på rad 17
    (x 13 til 17), tre på rad 18 (x 15 til 17) og éi ytst på (16,19). Under kvar ytste rute er det
    overheng («U») og éi rad berg, så luft. Kartet er 30 rader høgt (luft nedst lagd til); ingen merke,
    dører, folk, scener eller testruter er flytte, og nyeRader gjeld ikkje (radene er lagde til nedst).
  - `Pikslar.sidekant`: bakke med luft ved sida (dei ytste flisene på hylla) får ein ujamn kant, rundt
    nedste hjørne og ei smal stripe jord, og er open utanfor, så dalen syner.
  - `kameraNed.ruter`: ei liste med utløysarruter på kartet (neset 21,14 til 23,14, og 15,18, 16,19 og
    17,18 ytst på hylla). Berre der glir kameraet ned; langs resten av kanten står det stille.
    `sjekk-spel.js` sjekkar at utløysarrutene er bakke.
  - `utsikt.py`: `LUFTRAD` følgjer dei nye radene, og `li` er 244 pikslar høgt.
- **Vurdert:** `forhand/skjerm/r41-oversyn.png` (neset og spissen, med kameraet oppe og nede) og
  `r41-naer.png` (nærbilete av neset og spissen). Spissen heng som ei grastunge ut over dalen, med luft
  på sidene og under, og neset har ein rund kant.
- **Står att:** Hylla smalnar av i trinn (fem, tre, éi flis); sidekantane rundar trinna, men omrisset er
  framleis litt trappeforma.

## Runde 42: forgrunnen står på noko, og fleire element over stupet

- **Oppdrag:** Brukaren: fleire forgrunnselement, og graset i forgrunnen hang i lause lufta når ein stod
  ytst på hylla.
- **Gjort:**
  - Graset i forgrunnen (`gras`, `gras-h`) er bytt ut med to bergnabbar (`nabb`, `nabb-h`, laga i
    `utsikt.py`): mørkt, skugga berg som kjem inn frå sida, med jord, gras som vaiar (tre rammer), lyng og
    ei lita bjørk som lener seg ut på den venstre. Berget er 272 pikslar høgt, så der toppen syner, når
    berget ned til kanten av biletet: nabben står alltid på noko. Den venstre syner ytst på hylla, den
    høgre på neset (og som ein mørk pilar i høgre kant ytst på hylla); oppe på tunet er dei ute av biletet.
  - `fuglar`: tre små fuglar som svevar langt nede over dalen (to rammer med venger opp og ned, driv
    éin piksel per 6 tikk), som eit lag over lia.
- **Vurdert:** `forhand/skjerm/r42-oversyn.png`: øvst (toppen), ved kanten på platået, på neset og ytst på
  hylla (med kameraet glidd ned). Nabbane rammar inn utsikta i hjørna og dekkjer ikkje Ivar eller spissen.
- **Står att:** Ytst på hylla er den høgre nabben ein høg, mørk pilar langs høgre kant.

## Runde 43: lys og tekstur på nabbane, ingen søyle til høgre, og spiss kantvariant

- **Oppdrag:** Brukaren: meir lys og tekstur på nabbane, fjern søyla til høgre, og la den spisse forma
  neset hadde i runde 40 bli ein kantvariant for variasjon ved andre klipper og fjellhyller.
- **Gjort:**
  - `nabb_ramme` i `utsikt.py`: kantlys på toppen og på sida mot ljoset (den høgre nabben er teikna
    spegla, men med ljoset framleis frå venstre), ujamne lag og hyller med lys overkant og skugge under,
    sprekker, mose på hyllene, lav og lyng, og mellomtonar; framleis mørkare enn midtplanet.
  - Den høgre nabben har faktor `[2, 1]`: på neset står han nede i hjørnet, men ytst på hylla er han ute
    av biletet, så den mørke søyla langs høgre kant er borte. Ingen andre kameraposisjonar får han.
  - Nytt kartteikn `Z`: overheng med spiss form (graset heng i ein V mot spissen, luft rett under, berg
    mot endane), medan `U` er rund. `Pikslar.stup` vel forma etter teiknet i overhengsrada. Brukt i eit
    lite framspring vest på platået (bakke på 1,14 og 2,14, `Z` under); neset er framleis rundt.
    `sjekk-spel.js` sjekkar `Z` som `U`, og forgrunnslag kan ha faktor 1 i éi retning.
- **Vurdert:** `forhand/skjerm/r43-oversyn.png` (neset med nabben, ytst på hylla utan søyle, det spisse
  framspringet og hylla) og `r43-naer.png` (nærbilete av framspringet og nabben).
- **Står att:** Nabbane er framleis enkle former; dei kunne fått fleire steinblokker.

## Runde 44: bergnabbane bygde av steinblokker

- **Oppdrag:** Brukaren: gjer nabbane tydelegare med lysare flater og steinblokker. Den høgre nabben var
  mest ei mørk, rutete flate, og kantlyset berre ei tynn stripe.
- **Gjort:** `nabb_ramme` i `utsikt.py` byggjer nabben av rader med store steinblokker (30 til 64 pikslar
  breie, 30 til 70 høge), forskovne rad for rad. Kvar blokk har ei lys toppflate (med ei lysare øvste
  line), ei lys skråkant på sida mot ljoset, ei roleg mellomtone på framsida (to tonar, nesten ikkje
  dither), mørk side bort frå ljoset, og mørk skugge berre i fugene og under blokker som stikk ut. Toppen
  av kvar blokk er skrå og ujamn, hjørna er runde, og fugene vrir seg litt. Mose og lyng på toppflatene,
  gras og bjørka som før.
- **Vurdert:** Før og etter: `forhand/skjerm/r44-for-etter.png` (neset og ytst på hylla), og
  `r44-nabb.png` (nabbane åleine).
- **Står att:** Blokkradene ligg framleis litt for jamt over kvarandre.

## Runde 45: sprekker, lav og fargevariasjon på nabbane

- **Oppdrag:** Brukaren: legg til sprekker, lav og litt fargevariasjon på forsida av blokkene.
- **Gjort:** `nabb_ramme` i `utsikt.py`: kvar blokk får ein tone (nøytral, varm brungrå eller kald blågrå)
  og ein svak lysovergang nedover framsida i tre flate band. Etter at blokkene er teikna, får kvar blokk
  to til tre sprekker som går på skrå og byter retning, nokre med ei grein, teikna som ei mørk line med
  ei lys kant til høgre (veggen i sprekka som vender mot ljoset), og lav langs sprekkene. Små klynger av
  lav (gulgrøn, grågrøn og ein og annan rustoransje) ligg nær toppkanten, og éi sprekk har ei mørk
  vassstripe nedover. Ingen dither. Kantbandet øvst er som før.
- **Vurdert:** `forhand/skjerm/r45-for-etter.png` (same utsnitt som r44: neset og ytst på hylla) og
  `r45-nabb.png` (nabbane åleine). I spelet syner berre toppen av nabbane, så det er dei øvste sprekkene
  og lavflekkene som syner.
- **Står att:** Ingenting nytt.

## Runde 46: einerbusken ved stabburet

- **Oppdrag:** Brukaren: busken ved sida av stabburet treng eit løft. Det er `einer` (kartteiknet `o` på
  15,11 vel einer etter plassen i `NATURTYPE`).
- **Gjort:** `einer()` i `natur.py` er teikna om (20 × 22, var 18 × 17): ti nåleklasar lagde frå bak (nede
  til høgre, mørke) til fram (oppe til venstre, lyse), så omrisset er ujamt med to toppar og breiast
  nede. Kvar klase har ein smal sigd av lys oppe til venstre (ny glanstone) og skugge nede, det er mørke
  holer inni mellom klasane, korte nålestrøk på lyssida, stikkande tuster i overkanten, tre klasar av
  blåsvarte bær med lys dogg, ein tørr kvist som stikk ut til høgre, og ei mørk kontaktline mot bakken
  (i tillegg til slagskuggen motoren teiknar). `pix.py sjekk`: ser bra ut, 13 fargar. Variantvalet i
  `NATURTYPE` er uendra, så andre `o` på kartet er framleis steinar, heller, røys og bauta.
- **Vurdert:** `forhand/skjerm/r46-for-etter.png` (ved stabburet, før og etter) og `r46-einer.png`
  (busken åleine, gammal og ny).
- **Står att:** Busken er framleis mørk i morgonlyset; han kunne fått litt meir kontrast mot graset.

## Runde 47: lysare einer, skogkanten og lykta nedst til venstre på Åsen

- **Oppdrag:** Brukaren: gje einerbusken lysare fargar og omrissline, sjå på skogstripa i kartkanten,
  og lykta nedst til venstre på Åsen blir dekt av eit kanttre.
- **Einer:** Eiga blågrøn fargetrapp i `natur.py` (I djup, O skugge, V, t lys, F glans, h hole), om lag
  like lys som bjørkekrona, i staden for dei nesten svarte grantonane. Det mørkaste er no lysare enn
  omrisset, så den mørke omrisslina syner rundt heile busken. Kvar klase blir skuggelagd ferdig før den
  neste blir lagd oppå, så kanten mellom klasane syner. Bæra er einskilde og spreidde (par såg ut som
  auge); kvisten står att. `pix.py sjekk`: 11 fargar, åtvarar om 6 % einsame pikslar (nålestrøk og bær,
  med vilje).
- **Skogkanten:** Fann (1) høge, nakne stammer (furu, tørrgran) i fremste rekkja øvst mot lufta, som
  stod som stolpar mot himmelen, (2) at kanten langs sidene var ei nesten rett loddrett line, sidan
  kvart tre lente seg tilfeldig ut og naboane jamna det ut, og (3) at tre kunne lene seg ut over ting
  som står på naboflisa. Retta: `skogkant()` gir no `himmel` (luft eller bakkekant ved sida), og då står
  dei låge trea frå `nede`; kor langt ute følgjer glatt støy langs kanten (bukter over fleire fliser);
  ytst på kartet står det alltid eit mørkt tre bak, så skogbotnen ikkje syner som eit hol bak eit tre
  som lener seg langt ut.
- **Lykta:** Det vesle treet på graset framfor (1,12) stod med foten oppå lykta på (2,13), og det
  fremste treet lente seg 7 pikslar ut mot henne. Generell løysing: `Pikslar.STAAR` (lykter, grav,
  kister, inventar i bakken) og i `skogkant()` er ei side ikkje «gras» om det står noko slikt på
  naboflisa eller flisa under henne. Utlegget er no avgrensa for kvar retning (`utx`, `uty`), ikkje
  berre når ingen side har gras. Andre kart: berre `vegen` har ei lykt (26,10) nær kanten; ho var
  fri før og er det framleis.
- **Vurdert:** `forhand/skjerm/r47-einer-for-etter.png`, `r47-lykt-for-etter.png`,
  `r47-skogkant-for-etter.png` (venstre og høgre side), og `r47-for-vegen-spel.png` / `r47-etter-vegen-spel.png`.
- **Står att:** Den frittståande furua (`F` på 1,8) står tett inn i kanten og blandar seg med granene.

## Runde 48: tydelegare sprekker, samla lav og fleire nabbar mot midten

- **Oppdrag:** Brukaren: gjer sprekkene i nabbane tydelegare, samle laven, og gjerne fleire nabbar mot
  midten av biletet når ein står ytst på hylla.
- **Sprekker:** Færre og tydelegare (`nsprekk` per nabb, dei største blokkene øvst får dei). Kvar startar
  i toppkanten av blokka, så ho syner sjølv når berre toppen av nabben er i biletet: mørk kjerne tre
  pikslar brei øvst, to nedover og éin nedst, lys kant til høgre (veggen i sprekka vender mot ljoset)
  og ein mørk skuggekile øvst der sprekka opnar seg.
- **Lav:** `lavflekk()` teiknar nokre få flekker på 4 til 8 pikslar med ujamn kant og lysare midte:
  gulgrøn, grågrøn og éin rustoransje, langs toppkanten av blokkene og ved sprekkene. Færre mosepunkt
  på hyllene, så flekkene ikkje druknar i småprikkar.
- **Nye nabbar:** `nabb_ramme` tek no form (topp, inner, ytre), blokkstorleik og tal på sprekker, og
  gir `nabb-m` (låg, brei bergrygg) og `nabb-m2` (mindre stein). Sidene vert breiare nedover og når
  biletkanten først under skjermkanten, så dei står på noko. I `data.js` står dei i forgrunnen med
  `ved: [6.25, 19]` (kameraet ytst på hylla), faktor 1.15 og 1.1 for djupn. Dei rammar inn utsikta
  midt nede utan å dekkje Ivar, spissen eller elva, og er ute av biletet på neset og elles på hylla.
- **Vurdert:** `forhand/skjerm/r48-for-etter.png` (ytst på hylla og neset, før og etter) og
  `r48-nabb.png` (dei gamle sidenabbane, så dei nye fire). Sjekka òg `r48-etter-midt-spel.png`
  (hylla utan kameraglid): dei nye nabbane syner ikkje der.
- **Står att:** I utsnittet ytst på hylla syner berre dei øvste 20 til 30 pikslane av nabbane, så
  berre den øvste sprekka og laven der syner i spelet.

## Runde 49: midtnabbane står nær kameraet, og sidenabbane høgare opp

- **Oppdrag:** Midtnabbane såg ut som mørke kuplar som låg oppå dalbotnen, med ei lys stripe under den
  midtre og ein rustoransje lavflekk som likna eit lite dyr. Sprekkene i sidenabbane synte nesten ikkje.
- **Midtnabbane:** `nabb_ramme` har fått `toppdjup`, `sider`, `lys`, `grasdjup` og `heng`. `nabb-m` og
  `nabb-m2` er no breie steinar med flat topp og tjukk graskappe med ujamn kant, lyng og grastuster
  som heng ned over kanten, lysare og djupare toppflate (`MIDT_LYS`), ei brei lys side mot venstre og
  ei mørk side mot høgre. Sidene vert breiare ned mot biletkanten, og dei står høgare i biletet, så dei
  les som berg nær kameraet framfor og under dalen. Dei dekkjer ikkje Ivar, spissen eller elva, og det
  er ei glipe mellom dei der dalen syner.
- **Stripa og laven:** Éi høg blokkrad (ingen lys toppflate frå rad to tvers over biletet). Ingen
  rustlav på dei små nabbane, berre gulgrøn og grågrøn. Laven kan no liggje på toppflatene òg.
- **Sidenabbane:** 20 pikslar høgare (`y` 98 og 100), så sprekkene og laven syner både ytst på hylla
  og på neset.
- **Vurdert:** `forhand/skjerm/r49-for-etter.png` (same utsnitt som r48: ytst på hylla og neset).

## Runde 50: berget under spissen ytst på hylla trekkjer seg inn

- **Oppdrag:** Brukaren: under den T-forma grastunga ytst på hylla hang ei brei, grå steinmasse rett
  ned til vegen og såg ut som eit ras. Berget skal skråne inn under graset.
- **Funne:** Massen var stupveggen under spissen («M» på 15,20, 17,20 og 16,21) og ura i `li` under
  han, som gjekk 6 til 18 pikslar ned i lia og vart breiare ut til sidene.
- **Gjort:** Kartet: dei tre «M» under spissen er luft, så tunga endar i overhenga («U» på 15,19, 17,19
  og 16,20) med mørk underside og ope under. `LUFTRAD` følgjer med ([20, 21, 20] under spissen). I
  `li` er det inga ur under spissen (`ROT_X`); i staden teiknar `rot()` berget som trekkjer seg inn
  under overhenget: djup skugge øvst, smalare nedover, litt lys på sida mot venstre og mørk mot høgre,
  og det forsvinn i dis til ei smal rot godt over dalbotnen. Vegen og dalen syner fritt rundt og under.
- **Småting:** Sidenabbane har høgare første blokkrad (84), så toppen av neste rad (den lyse stripa)
  ikkje lenger syner nedst i biletet ytst på hylla eller på neset. Ingen rustlav att.
- **Vurdert:** `forhand/skjerm/r50-for-etter.png`: ytst på hylla med kameraet oppe, ytst på hylla med
  kameraet glidd ned, og neset.

## Runde 51: nabbane sett skrått ovanfrå

- **Oppdrag:** Brukaren: forgrunnsnabbane ved dalen må sjåast skrått ovanfrå, elles øydelegg dei
  perspektivet ned i dalen. Dei var teikna nesten rett framanfrå med høge, loddrette framsider.
- **Gjort:** Ny `nabb_ovanfra()` i `utsikt.py` erstattar `nabb_ramme()`. Toppflata er den største flata:
  rolege steinflater i flate tonar (utan dithering), grasmatter mest langs toppkanten og i nokre store
  flekker (mørk kant der graset ligg oppå steinen), lyng i klyngjer, lav i få flekker og lange sprekker
  sett ovanfrå, høgt nok til å syne i spelet. Kanten mot dalen har ei lys rand og korte grastuster som
  heng over han. Sidene er eit smalt band i skugge (lys mot venstre, mørk mot høgre). Venstre nabb har
  ein liten busk sett ovanfrå i staden for bjørka som stod opp.
- **Færre element:** `nabb-m2` er teken bort. Med nabbane sett ovanfrå er éin låg nabb midt nede nok til
  å ramme inn utsikta ytst på hylla, og meir av dalen syner. `nabb-m` er flatare og står litt lågare.
  Parallaksfaktorane er uendra (1.25, [2, 1] og 1.15), sidan nabbane no står i same perspektiv som dalen.
- **Vurdert:** `forhand/skjerm/r51-for-etter.png` (ytst på hylla og neset med kameraet glidd ned).

## Runde 52: ei stor langkyrkje med parallakse på lysekronene

- **Frå brukaren:** Kyrkja skal vidareutviklast: parallakse på lysekrona, lang nok til at det tek tid å gå
  frå døra opp til altaret (først fem sekund, så 50 fliser), større kart så altaret, lysekrona og
  inventaret kan bli større, og altartavla inspirert av ekte altartavler.
- **Research:** Kvernes stavkyrkje (altartavla frå 1695 i bondebarokk med store fargerike akantusvolutter,
  korskiljet og lysekrona i koret, altaret med kniplingsduk og messingstakar) og Grytten kyrkje i Romsdal
  (1829, kyrkjerom frå tida: blågrøne lukka benker, raud løpar, alterring med dreia balustrar og ei
  stor lysekrone), nye i `konsept/`. Fåberg (to etasjar, marmorerte felt, vridde søyler, figur med
  sigersfane øvst), Hove, Dale i Luster, Lygra og Nordfjordeid frå før.
- **Kartet:** 21 × 61 fliser. Frå døra: våpenhuset (rad 55 til 59), skipet (rad 14 til 53) med galleri over
  dei bakste radene, tre benkeblokker (5, 5 og 4 rader) og to tverrgangar med gravheller i golvet, framme
  preikestolen med trapp og døypefonten, korskiljet under korbogen (rad 13), og koret (11 fliser breitt)
  med korstolar, lysestakar, altarring, altar og altartavle. Frå merke 1 (10,59) til framfor
  altarringen (10,9) er det 50 fliser: 10,0 sekund å gå og 6,7 sekund å springe, målt i spelet med den
  nye testen `tools/sjekk-kyrkjegang.html`.
- **Inventar (`inventar.py`):** `korvegg` 11 × 5 med høge vindauge, rankeverk, medaljongar og vasar.
  `altartavle` 5 × 7: nattverden i predellaen, krossfestinga med Maria, Johannes og Maria Magdalena i
  hovudfeltet, Moses og Johannes døyparen i nisjar mellom vridde søyler, akantusvenger, oppstoda i
  øvste etasjen, skjel og Kristus med sigersfane øvst; altaret med kniplingsduk, raudt alterklede med
  gullkross og rosar, krusifiks, bibel og to messingstakar (korte ljos, så profetane syner). `altarring`
  7 × 3 med sider. `skipvegg-v` og `-h` (austveggen ved korbogen med pilaster, salmetavla til høgre).
  `korskilje` (blågrøn balustrade). `preikestol` 3 × 2 med lydhimling, evangelistar og trapp.
  `dopefont` 2 × 1 med dåpskanne. `kyrkjebenk-h` og `-v` er 8 fliser lange. Nye ting som heng høgt:
  `lysekrone` (to kransar med 14 ljos, kule og ørn), `kyrkjeskip` (votivskip) og `galleri` (21 × 3).
  Nye fliser i `pikslar.js`: `Ø`/`ø` (vindauge i sideveggene, sett ovanfrå) og `Æ`/`æ` (gravhelle).
- **Parallakse for inventar (`motor.js`):** `bygg` med `over: true` kan ha `faktor` (over 1). `byggPos()`
  skuvar biletet utover frå midten av skjermen, så det flyttar seg raskare enn golvet. `tak` teiknar
  kjettingen opp til taket (`kjede()`, festet i `Pikslar.KJEDE`): taket har større faktor, så
  kjettingen blir lengre øvst på skjermen og kortare nedst. Gløden følgjer krona (`Pikslar.LJOS`), men
  lyspølen på golvet (`kronegolv`, ny i `glod.py`) ligg fast der krona heng. `silhuett: true` viser
  Ivar gjennom galleriet. Lysstrålar kjem òg frå `Ø`. Veggar over sidevindauge og tomrom (` `) blir
  teikna som toppar.
- **Rundar:** 1) Eit triumfkrusifiks i ein kjetting midt over korbogen og kroner over midtgangen la
  kjettingen rett over Ivar: krusifikset er teke bort, og kronene heng i par over benkeblokkene. 2) Faste
  kjettingar på 120 og 230 pikslar ende midt i lufta når krona var under skjermen: no teiknar motoren
  kjettingen til eit takpunkt med eigen faktor. 3) Kjettingen halla sidelengs og såg ut som han var
  festa i veggen: berre loddrett no. 4) Glorien frå altarljosa vaska ut profetane i nisjane: kortare ljos.
  5) Skipet var monotont: galleri over inngangen, kyrkjeskip og gravheller i tverrgangane.
- **Scener og lagring:** Presten kneler på (11,9) (merke `p`), står i ringopninga (10,8) etter
  blekklatten, klokkaren står i koret på (6,11) og går til (9,11) i `presten`. Testane i
  `sjekk-scene.html` er oppdaterte (164 OK). `nyttOppsett: { fraH: 12, merke: "2" }`: ei lagring frå
  den vesle kyrkja startar framfor altarringen (spel.js).
- **Nytt verktøy:** `oversikt.py` (og `oversikt.html`) set saman alle skjermane på eit kart til eitt bilete.
- **Vurdert:** `forhand/skjerm/kyrkje-oversikt-to.png` (heile kyrkja i to kolonnar), `k51-alter-heil.png`
  og `k51-alter-naer.png` (koret og altartavla), `k51-fram`, `k51-skip2`, `k51-under` og `k51-dor`.
- **Står att:** Benkeblokkene er like; folk på benkene eller salmebøker ville gje liv. Sidevindauga er små
  sett ovanfrå. Koret har same furugolv som skipet. Oversiktsbiletet har små sprang i skøytane der
  ting med parallakse står ulikt i kvar skjerm.

## Runde 53: ei mørk kyrkje med liv i skipet, eige korgolv, og trappa opp til galleriet og tårnet

- **Frå brukaren:** Meir variasjon i midtdelen, eige golv i koret, eit mørkare kyrkjerom. Og ei trapp opp
  til galleriet («koret» over dei bakste benkene) og klokketårnet.
- **Før:** `forhand/skjerm/k52-for-oversikt-to.png` og `k52-for-kor-heil.png`.
- **Mørkt rom:** ny stemning `kyrkjerom` (bakgrunnen -9/-9/-5, figurane -4/-4/-2, strålar og
  lyskjelder). Som i dei mørke interiøra i FF6 kjem lyset berre frå kjeldene: strålane frå vindauga
  (kjernen tek snittet mot kvitt), den nye glødforma `altar` (glod.py) over heile altartavla og altaret,
  så dei er det lysaste i kyrkja, altarljosa, lysekronene med lyspølane, lysestakane og jernomnen.
  Figurane er lysare enn rommet og lesbare.
- **Korgolvet:** breie, mørke eikeplankar på tvers (`Þ`, fast `þ`, med variantar så skøytane ikkje står i
  rutenett) mot dei lyse furuplankane på langs i skipet. Lysestakane (kvileplassen) står no framfor
  korskiljet, og merka `%` og `@` i koret ligg i `EKSTRA_MERKE`, så golvet under dei er korgolv.
- **Variasjon i skipet:**
  - Benkene i fire variantar (`kyrkjebenk-h2` til `-h4`, `-v2` til `-v4`): namneplate på døra
    (gardsbenk), éi til tre salmebøker, svart hatt, raudt sjal over ryggen, stokk, slitt handlist og
    flekkar i målinga, ulik farge på rosa. Ingen rad er lik naboen.
  - Fire kyrkjefolk sit i benkene (nye figurar `kyrkjekone`, `kyrkjemann`, `kyrkjegamal`, sett
    bakfrå): `pose: "sitje"` og `flis: "("`, og benkene står i `SETE` med `fram: true`, så ryggen
    dekkjer nedre del av dei. Dei har eigne småreplikkar og fellesportrett, og står ikkje i midtgangen.
  - Epitafium på sideveggene (`epitaf-v` og `-h`, sett skrått), høge vindauge på to fliser
    (`Ø`/`Ö` og `ø`/`ö`, strålar frå begge halvdelane), tre ulike gravheller i tverrgangane (`flat: true`:
    ny i motor.js, bygget ligg på golvet under figurane utan slagskugge), jernomn med glo i den andre
    tverrgangen og fattigblokk ved inngangen. Ein jernomn i ei bygdekyrkje kring 1830 er tidleg, men
    mange kyrkjer fekk omn utover 1800-talet.
- **Trappa, galleriet og tårnet:** trappa (`trapp`, flat) går frå våpenhuset opp til ei opning i veggen
  (`E` på 8,54) til kartet `kyrkje-galleri`: brystninga framme med utsyn ned i skipet
  (`inne-skip-utsyn.png`, rad 45 til 49 i kyrkja utan lys frå `oversikt.py ... stemning=ingen`, mørkna
  med dis i tre trinn), to rader benker og vindauge. Døra bak til høgre fører til `kyrkje-tarn`:
  laftevegger, to lydluker med lamellar der lyset fell inn, klokka i klokkestolen med tau ned til golvet,
  og to grove bjelkar høgt oppe (`over`, faktor 1,3). `sjekk-kyrkjegang.html` går opp og ned att.
- **Rundar:** 1) Jernomnen fekk glødforma til kakkelomnen og vart kvitvaska: no den vesle `lys`. 2)
  Sitjande folk synte berre hovudet: setehøgd 6. 3) Korgolvet låg i rutenett som murstein: lange
  plankar med skøyt berre på kvar andre flis. 4) Døropninga i bakveggen hamna på feil flis og stengde
  midtgangen: retta, og gangtida er målt på nytt. 5) Den øvste bjelken i tårnet låg over lydlukene.
- **Vurdert:** `k52-etter-oversikt-to.png`, `k52-etter-kor-heil.png`, `k52-folk-heil.png`,
  `k52-trapp-heil.png`, `k52-galleri-heil.png` og `k52-tarn-heil.png`.
- **Står att:** Galleriet og tårnet har ingen folk eller hendingar. Utsynet frå galleriet er eit fast
  bilete (lysekronene i det rører seg ikkje). Tårnet har ingen trapp vidare opp eller tau Ivar kan dra i.

## Runde 54: galleriet ser ned i djupet, klokketårnet får golv og ei stor klokke, og Ivar går opp på preikestolen

- **Frå brukaren:** Ein runde på galleriet og tårnet, og Ivar skal kunne gå opp på preikestolen.
- **Før:** `forhand/skjerm/k53-for-galleri.png` og `k53-for-tarn.png`. Utsynet frå galleriet var i same
  målestokk som galleriet, så skipet såg ut til å halde fram. Tårnet var ein brun plankevegg med ei lita
  klokke, og golv og vegg flaut saman.
- **Galleriet:**
  - Utsynet er laga på nytt (`utsyn_galleri.py`): skipet utan lys, utan det som heng høgt og utan folk
    (nye parametrar `utanOver` og `utanFolk` i oversikt.html), i halv storleik, mørkt, kaldt og dempa,
    rett ovanfrå, med hovud i benkene og lysekronene sett ovanfrå, og mørke veggar ned i djupet på
    sidene. Det ligg flatt med låg parallakse (faktor 0,75), djupare enn galleriet.
  - Brystninga er kraftig og mørk: tjukk handlist, dreia balustrar med glipe der djupet syner, stolpar.
  - Benkene står i trinn (`galleritrinn`), og eit lite orgel (`orgel`, positiv med tinnpiper) står
    framme til høgre. Organisten (ny figur `organist`) sit ved det og har to replikkar.
- **Klokketårnet:** lyse golvplankar sett ovanfrå mot mørkt laft, og laftet berre som bakvegg
  (`tarnvegg`, med lydlukene) og smale kantar. Klokka er mykje større (5 x 2 fliser) i ein solid
  klokkestol av grove bjelkar, sett skrått ovanfrå. Tauet heng ned til golvet (vesenet `klokketau`, med
  raudt og kvitt handgrep). Lyset frå lydlukene fell på golvet, og ny `stov` i stemninga lèt støv søkke
  i strålane (motor.js). Ei due og fuglelort på bjelken (`tarnbjelke-due`), og ein stige vidare opp.
  Z mot tauet: klokka slår to gonger med `rist` og «DONG», og Ivar seier noko. Kan gjentakast.
- **Preikestolen:** ny `hogd` på kartet (`hogdVed()` i motor.js): (3,16) midt i trappa 27 pikslar,
  (2,16) øvst 48, (1,16) i korga 58, og høgda glir jamt mellom rutene. Preikestolen er delt i to lag
  (`preikestol-bak` med ryggbrett og lydhimling bak Ivar, `preikestol` med korga, bibelen og trappa
  framfor), så han står i korga med brystninga framfor seg. Rutene rundt (rad 15 og 17) er faste, så
  ein berre kjem opp og ned trappa. Z mot bibelen (ein usynleg person): val mellom ei lita preike om
  ordet «bok» (bonden seier amen, kona ler, klokkaren skjenner) og å sjå utover benkene.
- **Testar:** `sjekk-kyrkjegang.html` går opp trappa til preikestolen, preikar, og drar to gonger i
  klokketauet.
- **Vurdert:** `k53-galleri-heil.png`, `k53-tarn-heil.png`, `k53-trapp-heil.png` (Ivar midt i trappa)
  og `k53-stol-heil.png` (Ivar i preikestolen).
- **Står att:** Ivar står litt til venstre i korga (korga står mellom to ruter). Utsynet frå galleriet er
  framleis eit fast bilete med måla hovud. Klokka svingar ikkje når ho slår, og spelet har ingen lyd.

## Runde 55: klokka svingar, Ivar midt i preikestolen, brei midtgang og benker som dekkjer

- **Frå brukaren:** La klokka svinge når ho slår, sentrer Ivar i preikestolen, midtgangen tre fliser
  brei, og kyrkjebenkene skal skjule Ivar delvis når han går mellom dei.
- **Før:** `forhand/skjerm/k54-for-klokke.png`, `k54-for-stol-heil.png` og `k54-for-benk-heil.png`
  (midtgangen éi flis, Ivar mellom benkene heilt synleg).
- **Klokka:** klokkestolen (`klokkestol`) og klokka er skilde. Klokka med åket er eit vesen med gangark
  frå det nye `klokke.py`: kvar ramme er klokka rotert rundt akselen (kvar piksel rekna attende til
  klokka i kvile, så lyset følgjer med), 0, 8 og 20 grader. Retninga vel ramma (ned kvile, opp lite
  utslag, venstre og høgre fullt utslag). Manuset `klokketau` snur klokka: tauet rykkjer
  (`klokketau-dradd`), klokka svingar ut til høgre og slår (rist og «DONG»), over til venstre og slår
  att, og svinginga døyr ut til kvile. Ny parameter `snu=namn:retning` i skjerm.html.
- **Preikestolen:** `hogd` kan vere `[opp, dx]`: korga gir 61 pikslar opp og 5 mot høgre, så Ivar står
  midt i korga og syner frå brystet og opp. Kameraet følgjer figuren der han syner (positiv hogd), så
  heile preikestolen med lydhimlingen er med. Mot venstre kan ikkje kameraet gå lenger enn kartkanten.
- **Midtgangen:** tre fliser brei (x 9 til 11) med løparen midt i. Benkene er sju fliser lange (x 2 til 8 og
  12 til 18), også på galleriet. Kyrkjefolket sit framleis i benkene, og 50 fliser frå døra er uendra.
- **Benkene dekkjer:** negative verdiar i `hogd` senkar figuren. Rada rett bak kvar benk (der beina står
  når ein går mellom benkeradene) gir -9 pikslar, så benken framfor dekkjer den nedre delen av den som
  går der. Det glir jamt når ein går inn frå midtgangen. Dei som sit, var alt rette (`fram: true`).
- **Testar:** `sjekk-kyrkjegang.html` sjekkar òg at klokka svingar til begge sider og heng stille etterpå.
- **Etter:** `k54-klokke-rammer.png` (fire rammer i spelet), `k54-klokke-heil.png`, `k54-stol-heil.png`,
  `k54-midtgang-heil.png` og `k54-benk-heil.png`.
- **Står att:** Klokka svingar i fire faste rammer (ingen mellomrammer). Ingen lyd.

## Runde 56: mjuk klokke, dua som flyg, brei løpar og eit høgare standardperspektiv

- **Frå brukaren:** Fleire mellomrammer i klokka, dua skal fly når Ivar ringjer, løparen nesten tre fliser
  brei, og objekta skal sjåast frå ein høgare vinkel, meir som i FF6 og The Minish Cap.
- **Før:** `forhand/skjerm/k55-for-klokke-rammer.png`, `k55-for-benk.png`, `k55-for-font-heil.png` og
  `k55-for-lopar.png`.
- **Research:** borda i Figaro (`forhand/referansar/ff6-0055.png`) og senga i Narshe (`ff6-0031.png`) målt i
  spelpikslar: bordet har 13 pikslar toppflate, 5 framside og 4 bein, senga om lag 3/4 toppflate. Skrive
  ned som «Standardperspektiv for objekt» i STILGUIDE.md: 9 til 13 pikslar toppflate og 4 til 6
  framside per flis djupn, runde opningar som ein brei oval, rekkverk med brei handlist og korte
  balustrar.
- **Klokka:** ni rammer (`klokke-0` til `klokke-8`, fem grader frå kvarandre, frå `klokke.py`) i staden
  for fire. Manuset byter ramme med 45 til 85 ms mellom (`sving()` i data.js), slaga kjem på
  ytterpunkta, og svinginga døyr ut. Vesen kan no ha `stille: true` (ingen gynging), `skugge: false` og
  ein fast skuggebreidd (`skuggeB`) i `PNG` (`vesenOpp()` i pikslar.js).
- **Dua:** eit eige vesen (`due`, ruta 7,6) som sit på toppbjelken i klokkestolen. Biletet er stort og
  tomt, så sju flygerammer (`due-fly-1` til `-7`, vengene opp og ned) fører dua ut gjennom den venstre
  lydluka utan at vesenet flyttar seg. Ho flyg samstundes med det første slaget (`saman`) og er borte
  til Ivar kjem inn i tårnet att. Bjelken med dua er erstatta av den vanlege bjelken.
- **Løparen:** 40 pikslar brei i skipet: `Ł` og `ł` er kantane (golv, gyllen bord med kvite prikkar,
  blå blom), `l` midten med rutemønster og ein gul rute. Smal gjennom korskiljet, døropninga og
  våpenhuset. Utsynet frå galleriet er laga på nytt, så løparen er brei der òg.
- **Standardperspektivet i kyrkja:**
  - Kyrkjebenkene (alle variantane, òg på galleriet) er teikna om: setet er ei stor toppflate i eit eige,
    flatt lag (`kyrkjebenk-sete`) under figurane, og laget framfor har handlista som toppflate (4
    pikslar) og ei kort bakside (5 pikslar) med fyllingar, døra med toppkant, bøker, hatt og sjal sett
    ovanfrå. Figurane i benkerada er senka 16 pikslar, så ryggen framfor dekkjer beina. Kyrkjefolket
    sit framleis rett.
  - Døypefonten: kanten og dåpsfatet er ein stor oval sett ovanfrå, kort side på kummen, sokkel med
    toppflater.
  - Korskiljet og altarringen: breiare handlist og kortare balustrar.
- **Testar:** `sjekk-kyrkjegang.html` sjekkar at klokka går gjennom ytterrammene og endar i kvile, at dua
  flyg, og at ho er attende når Ivar kjem inn att. Nye parametrar i skjerm.html: `vesen=namn:bilete`.
- **Etter:** `k55-klokke-rammer.png` (fem av rammene, med dua på veg ut), `k55-due-heil.png`,
  `k55-lopar-heil.png`, `k55-benk-heil.png`, `k55-font-heil.png` og `k55-galleri-heil.png`.
- **Står att (for låg vinkel etter den nye regelen, ikkje teikna om enno; stova og kistene er gjorde i
  runde 59):**
  - Stabburet: kornbingane, tønna og kaggen (frå sida), sekkene.
  - Prestegarden og boksamlinga på Ekset: skatollet, sofaen, spisebordet, stolane og lesebordet bør
    sjåast over.
  - Ute: skigarden og steingarden (sett nesten frå sida).
  - I kyrkja: korstolane (bondebenkene), fattigblokka, jernomnen, orgelet og brystninga på galleriet.

## Runde 57: kolven heng etter, ingen galleri over skipet, kroner og preikestol ovanfrå, skøytte plankar

- **Frå brukaren:** Kolven skal røre seg rett, galleriet («koret») over dei bakste radene kan fjernast,
  lysekronene og preikestolen skal få nytt perspektiv, Ivar skal gå annleis mellom benkeradene, færre sjal
  og hattar og fleire salmebøker, plankane i golvet skal vere skøytte, og gravhellene passar ikkje i ei
  luthersk bygdekyrkje. Døypefonten er urørd.
- **Før:** `forhand/skjerm/k56-for-kolv.png`, `k56-for-bak-heil.png` (med galleriet), `k56-for-benk.png`,
  `k56-for-stol.png` og `k56-for-golv.png`.
- **Kolven** (`klokke.py`): ein eigen del som heng frå krona. I rammene på vegen heng han rett ned i
  verda og heng difor etter klokka (kula syner under munnen mot den sida klokka kjem frå). På
  ytterpunkta har han slege mot kanten (42 grader inne i klokka), og der kjem «DONG».
- **Galleriet** er teke bort som lag over skipet. Rad 52 har fått ei benkerad til, så den bakste delen
  ser naturleg ut. Trappa i våpenhuset og kartet `kyrkje-galleri` er der framleis. Biletet `galleri` er
  sletta.
- **Lysekronene:** kransane er tydelege ovalar sett ovanfrå (ry 6 og 10), stamma kort, ljosa korte med
  dryppskål, kula midt under den nedste kransen. Parallakse, kjetting og glød (ankeret flytt) er som før.
- **Ivar mellom benkeradene:** senka 12 pikslar i staden for 16, så han står på setet med heile
  overkroppen synleg, og ryggen framfor dekkjer berre føtene. Det glir jamt inn frå midtgangen.
- **Ting i benkene:** ny variant `kyrkjebenk-h5`/`-v5` med fem salmebøker, og fleire bøker i dei andre.
  Hatt og sjal står no berre i benkene der folk sit (sjal ved konene, hatt ved mennene) og eitt gløymt
  sjal. Variantane er sette rad for rad i data.js.
- **Preikestolen** i standardperspektivet: lydhimlingen som ein stor raud oval med gylne ribber og krone,
  korga som ein open oval med kant og golv, kort framside med evangelistane, breie trinn i trappa.
  Grensa mellom laget bak og framfor går midt i korga, og Ivar står midt i ho (hogd 56, dx 5).
- **Golvet:** furuplankane i skipet (og galleriet og tårnet) har endeskøytar på ulik stad frå rute til
  rute (variantane til flisa `q`), så kvar planke er 2 til 4 fliser lang. Eikeplankane i koret har
  skøyt på om lag kvar fjerde flis.
- **Gravhellene** er tekne bort frå golvet og biletet sletta. Epitafia og minnetavlene på veggene minner
  om dei døde. Den gamle mannen talar no om minnetavla.
- **Etter:** `k56-kolv-rammer.png` (fem av rammene i spelet), `k56-bak-heil.png`, `k56-benk-heil.png`
  (lysekroner og Ivar mellom benkeradene), `k56-stol-heil.png`, `k56-kor-heil.png` og golvet i alle.
- **Står att:** Kula til kolven er lita og syner dårleg på ytterpunkta. Lista over andre objekt med for låg
  vinkel frå runde 56 gjeld framleis.

## Runde 58: den venstre nabben når alltid ut til skjermkanten

- **Oppdrag:** Brukaren: når Ivar står på den venstre flisa i spissen av hylla (15,18), sluttar den
  venstre nabben før skjermkanten, så det blir ei loddrett stripe med luft.
- **Funne:** Med faktor 1.25 skuvar parallaksen nabben om lag 25 pikslar mot høgre når kameraet står ei
  flis lenger til venstre, og venstre kanten av biletet (x -18) kom inn på skjermen.
- **Gjort:** Sidenabbane er 40 pikslar breiare ut mot biletkanten (`NABB_W` 132, forma flytt like
  mykje), og den venstre står på x -58, så han når skjermkanten med god margin. Den høgre veks ut mot
  høgre, så x er uendra.
- **Sjekka:** Alle utløysarrutene på hylla (15,18), (16,19), (17,18) og på neset (21,14), (22,14),
  (23,14): den venstre når venstre skjermkant, den høgre når høgre skjermkant der han syner, og
  midtnabben står fritt med sider som skrånar ut nedst, som før.
- **Vurdert:** `forhand/skjerm/r58-oversikt.png` (alle seks posisjonane).

## Runde 58: tette benkerader med høg rygg, og preikestolen med kuppel og trinn

- **Frå brukaren:** Kyrkjebenkene skal tilbake til den høgare ryggen som passa med folka som sit, stå tett
  utan golv imellom men så ein kan gå der; preikestolen treng eit tak med form og trinn Ivar går på.
- **Før:** `forhand/skjerm/k57-for-bakkona-heil.png` (Ivar rett bak kona på 5,20), `k57-for-benk-heil.png`,
  `k57-for-trapp-heil.png` og `k57-for-stol-heil.png`.
- **Benkene:** ryggen frå før runde 56 er attende (13 pikslar, seteripe bak handlista, dør med rose),
  med salmebøkene, hatt og sjal ved folka, og variant 5 med fem bøker. Nytt flatt lag `kyrkjebenk-golv`
  (to rader høgt: golvet inne i benken med fotfjøl og blågrå sidebord) fyller heile benkerada, så radene
  står tett. Den som går i benkerada, er senka 5 pikslar (setet og ryggen framfor dekkjer føtene), og
  dei som sit, er lyfte 2 pikslar (`SETE`), så hovudet til den som står rett bak, syner over dei.
  Prøvd og forkasta: 8 pikslar og teikning etter den som sit (då forsvann kona bak Ivar, og med
  vanleg rekkjefølgje forsvann Ivar bak kona). STILGUIDE.md: benker er eit unntak med høgare rygg.
- **Preikestolen, tre rundar:**
  1. Lydhimlingen fekk volum: ein kvelva kuppel (lys oppe til venstre, mørk nede til høgre), gylne
     ribber, gesims, raud lambrekin med bogar og gylne duskar, krone med kross og kule, og skugge på
     ryggbrettet. Trinna fekk lys tråflate og mørk framside. Men Ivar stod bak trappa: trinna låg i
     laget framfor.
  2. Trinna er eit eige flatt lag (`preikestol-trapp`), rekkverket ligg framfor. Ivar står no oppå
     trinnet. Handlista gjekk gjennom andletet hans og vart flytt lågare; gullkant på lambrekinen.
  3. Trappa er lenger og slakare: seks trinn med brei tråflate (8 x 10 pikslar) og 3 pikslar framside,
     ut på den fjerde flisa. Preikestolen er 5 fliser brei. `hogd` følgjer trinnet under føtene:
     (4,16) 17, (3,16) 35, (2,16) 53, korga 56. Flisene ved den nedste trappeflisa er faste.
- **Etter:** `k57-etter-bakkona-heil.png`, `k57-etter-benk-heil.png` (Ivar attmed bonden),
  `k57-etter-trapp-heil.png`, `k57-etter-stol-heil.png`, og `k57-stol-rad.png` (Ivar på kvart trinn opp).
- **Står att:** Trinna blir mørke i det mørke kyrkjerommet. Den som sit, syner berre hovudet.

## Runde 59: stova på Åsen og kistene i standardperspektivet

- **Frå brukaren:** Teikn om stova og kistene etter det nye perspektivet (objekta skal sjåast frå ein
  høgare vinkel, som i FF6, sjå «Standardperspektiv for objekt» i STILGUIDE.md og runde 56).
- **Før:** `forhand/skjerm/r59-for-stova-spel.png`, `r59-for-sitje-spel.png` (Ivar på benken),
  `r59-for-kister-spel.png` (den opne kista var berre ei mørk stripe over loket) og `r59-for-vegen-spel.png`.
- **Stova** (`inventar.py`, alle med same fotavtrykk som før, så kartet og kollisjonen er uendra):
  - Langbordet (og det ståande): plata er 26 pikslar toppflate for to fliser djupn, framkanten 3 og beina
    5 (før 31 og 14). `BORD_HOGD` er 9, og bordet går 3 pikslar opp i rada bak i staden for 14. Fata,
    flatbrødet og ølbollen er breie ovalar sett ovanfrå.
  - Benken: 10 pikslar toppflate (før 7), framkant 2 og bein 3, til saman setehøgda 5. Gjeld òg
    `benk-kort` (organisten på galleriet). Dei ståande benkene (korstolane i kyrkja) er urørde.
  - Kubbestolane (alle fire retningar): setet er ein breiare oval (djupna trykt saman med 0,42 i staden
    for 0,6), ryggen er lågare, og setet har lys framkant og årringar.
  - Sengebenken: større sengeflate, sengestokken framme med smal toppflate og kort framside, og gavlane
    med lys toppkant på langs og kort, mørk endeved. Fotgavlen er låg.
  - Rokken: benken sett ovanfrå med korte bein og trøde, hjulet som ein stor, litt brei oval med dreidde
    eiker, rokkehovudet med spole og garn til venstre.
  - Grua: kanten på hetta er boga, golvet i eldstaden (oske og vedskier) og gruehellene er toppflater.
    Elden står der han stod (`ILD` er uendra).
  - Hylla: hyllebordet syner toppflata, og ølkruset har ovalt lok sett ovanfrå.
  - Skrinet etter far: eit breiare skrin med loket slått opp bakover (rosemålt innside), papira sett
    ovanfrå og kort framside.
- **Kistene** (alle kister på karta, inne og ute, òg gøymde): `inne-kiste` og `inne-kiste-open`, laga av
  `_kasse()` i inventar.py (same funksjon som skrinet). Loket er ei stor, blåmåla toppflate (10 pikslar)
  med rose og to jernband, framsida er 4 pikslar med gyllen lås. Den opne kista har loket slått opp
  bakover (raud innside med rose) og syner innsida ovanfrå: kant rundt, innvegg bak i skugge, ein lys
  sidevegg og botnen. Ny farge `Q` (lys rosemaling blå) i paletten.
  - Motoren (`kisteVed` i motor.js) teiknar biletet for alle synlege kister, vel det opne når kista er
    opna, og sorterer det saman med figurane (så loket dekkjer føtene til den som står bak), med
    slagskugge som under inventaret. Flisa `K` er berre golv no, og den mørke stripa over opna kister er
    borte. Bileta blir forhåndslasta (`alleBilete` i pikslar.js).
  - skjerm.html har fått `opna=k-stova,k-skrin` (kister som er opna).
- **Sitjinga:** Setehøgda er 5 som før, så `SETE` er uendra. Syster sit rett på kubbestolen ved bordet,
  Ivar sit rett på benken og på kubbestolen ved den andre enden, og kvilen ved lampa (på golvet) er som før.
- **Testar:** `sjekk-spel.js` (alt rett), `sjekk-scene.html` (164 OK, 0 FEIL), `sjekk-gange.html` og
  `sjekk-kyrkjegang.html` (alt rett).
- **Etter:** `r59-etter-stova-spel.png`, `r59-etter-sitje-spel.png`, `r59-etter-kister-spel.png`,
  `r59-vegen-spel.png` og `r59-vegen2-spel.png` (ute, open og lukka), `r59-stabbur-spel.png`,
  `r59-etter-hovde-spel.png` (Nedre Hovde med same bord, grue og seng), og samanlikningane
  `r59-samanlikning-stova.png`, `r59-samanlikning-sitje.png` og `r59-samanlikning-kister.png`.
- **Står att (for låg vinkel):** stabburet (kornbingane, tønna, kaggen, sekkene), skatollet, sofaen,
  spisebordet, stolane og lesebordet på Ekset og i prestegarden, skigarden og steingarden ute, og i
  kyrkja korstolane (dei ståande benkene), fattigblokka, jernomnen, orgelet og brystninga på galleriet.
  Kubbestolen sett frå sida (`-venstre`, `-hogre`) er framleis litt klumpete.

## Runde 59: preikestolen med lange korgveggar, kjegle under og repos frå trappa

- **Frå brukaren:** Overgangen frå trappa til preikestolen var dårleg, korgveggane skal vere lange som i
  originalen, så søyla blir lågare, og botnen skal sjå ut som søyla står bak og støttar midt under.
- **Før:** `forhand/skjerm/k58-for-rad.png` (preikestolen utan Ivar, Ivar på dei to øvste trinna og i korga).
- **Runde 1:** framsida av korga er 24 pikslar lang som i originalen (list midt på, evangelistar øvst og
  fyllingar nedst). Under er ein kjegle som smalnar inn mot søyla, mest i skugge, med ein gyllen dropp, og
  søyla kjem ut under kjeglen, øvst i skugge, og er mykje kortare. Øvst i trappa er ein repos i same høgd
  som korggolvet, som går inn under kanten, med ein dørstolpe i korgkanten, og handlista byrjar ved
  korgkanten. Fem trinn ned. `hogd`: (4,16) 19, (3,16) 37, reposen 56, korga 56, så Ivar ikkje hoppar.
- **Runde 2:** på reposen stod Ivar halvt bak korga: skuva 6 pikslar mot høgre (`[56, 6]`), så han står
  på reposen ved døra og går rett inn i korga (`[56, 5]`).
- **Etter:** `k58-rad.png` (utan Ivar, på trinn 3, på reposen og i korga) og `k58-naer.png` (reposen nært).
- **Står att:** Reposen og trinna blir mørke i det mørke rommet.

## Runde 60: portretta i FF6-stil (pilot: Huldra og Ivar)

- **Frå brukaren:** Portretta skal vere meir detaljerte og naturlege, med detaljnivå og skugge som i
  Final Fantasy VI. Huldra skal vere vakker og gåtefull. Pilot med Huldra og Ivar før resten.
- **Research:** `forhand/referansar/ff6a-portrett.png` (Terra, Locke, Edgar, Celes, Relm), målt piksel for
  piksel (`forhand/ff6a-rad0.png`, `ff6a-rad1.png`): 15 fargar per portrett, mørkegrått omriss, fire til
  fem tonar i huda og håret, hår i klumpar med mørk kant og glansstriper, auge med vippeline, iris og éin
  kvit piksel, nesten inga nase, lepper som ein liten farga flekk, inga dithering i andletet. Sjå
  «Portrett i FF6-stil» i STILGUIDE.md.
- **Gjort:**
  - Nye verktøy i `portrett.py`: `lokk()` og `harflak()` (hår i lokkar med skuggekant, lysside og glans),
    andletsprofil rad for rad (`kantar`), `selout()` (lyssida et omrisset), `rydd()`, `ellipse()`, og
    `P.bak` (eigen bakgrunn under omrisset).
  - **Huldra:** langt, bylgja gullhår i lokkar, krans av kvitveis, blåklokker og bjørkelauv, bleik hud med
    kjølig skjær, lysande grøne auge under tunge augelok som ser forbi oss, eit lite smil, grøn kjole med
    kvit særk og fiolett sjal, ein dusk av kuhalen bak skuldra nede til venstre, og bak henne skogen i
    dis (granar som silhuettar, dis lågt over bakken, tre irrlys). Kjensler: glad, trist, sint, sjokk,
    tenkje (fingeren mot leppa), nikk, lokk og sky (same namn som figurarket). Ført inn i
    `PORTRETT_KJENSLER` i portrett.py og data.js.
  - **Ivar:** mørkebrunt, ustyrleg hår med virvel, tjafsar og lugg, synleg øyre med fjørpennen bak,
    runde kinn med fregner og raudme, store brune auge, blå vadmålstrøye med ståkrage, linskjorte og
    sekkeband av lêr. Alle åtte kjenslene (glad, trist, sint, sjokk, tenkje, nikk, ivrig, les).
- **Rundar:** (1) håret var éi flate med spreidde glansflekkar: bygd om til flak av smale lokkar teikna
  frå skuggesida. (2) Håret bak var ein flat, brun vegg (skuggeforskyvinga åt opp kantane): no same
  tonar, men færre lyse pikslar. (3) Andletet var for breitt og grått: profilen handplassert rad for rad,
  kjølegare, men reinare hudtonar. (4) Kinn og nasetipp flaut saman til ein kvit flekk i spelstorleik:
  berre nasetippen har den lysaste tonen. (5) Munnen låg på profilkanten: flytt inn eitt steg.
- **Etter:** `forhand/r59-samanlikning.png` (før og etter med kjensler), `forhand/r59-mot-ff6.png` (ved
  sida av Terra og Relm), og i spelet `forhand/skjerm/r59-huldra-spel.png`, `r59-huldra-lokk-spel.png`,
  `r59-ivar-spel.png` og `r59-ivar-sjokk-spel.png`.
- **Står att:** Dei andre portretta i same stil: storebror, den framande, presten, haugbonden, syster,
  grannen, budeia og dei fem fellesansikta (`bygd-mann`, `bygd-kvinne`, `bygd-gamal-mann`,
  `bygd-gamal-kone`, `bygd-gut`). Huldra kan få litt meir form i håret over issen, og haka til Ivar er
  litt brei.

## Runde 61: kista, open og lukka frå same vinkel

- **Frå koordinatoren:** Den opne kista frå runde 59 var høg og smal og minte om eit skap eller ei
  biletramme, fordi det oppslegne loket gjorde ho høgare enn den lukka.
- **Research:** FF6-tilesetet «Town Interior» frå Spriters Resource (`forhand/referansar/ff6tile-541477.png`,
  utsnitt `z-ff6-kister2.png`): den opne kista er like høg som den lukka, loket står opp bak som ei
  stripe på 3 til 4 pikslar, og innsida er ein mørk brunn med jernkant. Ekte kister frå 1700- og
  1800-talet (`konsept/kiste-folkemuseum-1897.jpg`, `kiste-folkemuseum-1930.jpg`, `kiste-rosemalt-nb.jpg`,
  ført inn i KJELDER.md): buelok, breie jernband over loket og ned framsida, kista om lag dobbelt så
  brei som djup, og innsida av loket er kvit furu med svarte hengsle.
- **Rundar:**
  1. Den opne kista er like høg som den lukka: loket er ei forkorta stripe på 3 pikslar (kvit furu med
     hengsle), innsida ein mørk brunn med kant rundt.
  2. Begge var nesten kvadratiske og las som skap: kista er no heile flisa brei (14 pikslar kasse) og
     lokflata 8 pikslar djup, så ho er brei og låg. Innveggen bak er 2 rader.
  3. Buelok: lys rygg i dei to bakre radene av loket og mørkare kant framme der loket bøyer ned.
     Jernbanda på loket er mørke (dei forsvann mot det blå).
- **Etter:** `forhand/skjerm/r60-samanlikning-kister.png` (frå venstre: lukka og open frå runde 59, lukka og
  open no, og open ute ved vegen), `r60-kister-spel.png`, `r60-kister-open-spel.png`, `r60-vegen-spel.png`.
- **Står att:** stabburet, kubbestolen frå sida, Ekset og prestegarden, kyrkja og skigarden og
  steingarden ute (rekkjefølgja i dei neste rundane).
