# Nivå, eigenskapar og utstyr

Denne fana samlar talsystemet under kampane: Liv og Røyst, dei seks eigenskapane, formlane for skade og lækjing, tidsmålaren, vekst per figur, røynslekurva, vekst utanom nivå, utstyret og pengane. Alt byggjer på grunnsystem.md, og namna derifrå er bindande. Tala er rekna ut med Python og er sette slik at dei stemmer med det fiendar\_bossar.md og superbossar.md alt seier: om lag 64 Liv per nivå, eit vanleg treff på om lag 15 prosent av Liv til den som slår, nivå 45 i Sagahallen, nivåtak 70, og ein figur på nivå 55 med om lag 3 500 Liv og 400 Røyst. Researchen står i research/stats\_nivaa.md, og der ein idé er henta frå eit anna spel, står det kort.

Tala er utgangspunkt for testing. Formlane er laga så ein speldesignar kan rekne dei med hovudrekning eller eit rekneark.

## 1 Eigenskapane

### Liv og Røyst

Liv er helsa til figuren. Ein figur med Liv-faktor 1,0 har 30 + 64 × nivå i Liv. Det gjev 94 på nivå 1, 2 910 på nivå 45 og 3 550 på nivå 55, og det er den «typiske figuren» alle andre tal blir målte mot. Liv-faktoren til kvar figur står i kapittel 3. Taket er 9 999, som i FF6, men ingen figur kjem nær det utan frø og sider frå eventyrboka.

Røyst er krafta til galdrar, song, joik og forteljing. Ein figur med Røyst-faktor 1,0 har 20 + nivå × nivå / 8 i Røyst. Kurva er kvadratisk med vilje. Figurfilene set Røyst-kostnadene for ein figur midt i spelet med 60 til 90 Røyst, og superbossar.md reknar med om lag 400 Røyst på nivå 55. Ei rett line kan ikkje treffe begge. Den kvadratiske kurva gjev 70 Røyst på nivå 20, 80 på nivå 22, 98 på nivå 25 og 398 på nivå 55. Taket er 999.

Røyst-kurva liknar MP i FF6 og Chrono Trigger, der ein magikar har lite å rutte med tidleg og mykje seint. For at kostnadene i figurfilene skal bety noko òg seint i spelet, gjeld Røyst-skalaen i kapittel 2. Jotunen og tussen har ingen Røyst. Jotunen brukar Ande og ordkort, og tussen brukar Mett.

### Dei seks eigenskapane

| Eigenskap | Kva han gjer | Tak | Henta frå |
| --- | --- | --- | --- |
| Kraft | Går inn i skaden frå slag, Kast, Steinn og alle fysiske åtak | 99 | Vigor i FF6, Power i Chrono Trigger |
| Ordkraft | Går inn i skaden og lækjinga frå galdr, song, stev, kved, joik, forteljing, slåttar og påkallingar | 99 | Magic Power i FF6 |
| Herdsle | Forsvar mot slag. Blir lagd saman med Vern frå kleda | 99 | Stamina og Defense i FF6 |
| Tole | Forsvar mot galdr og song frå fiendar, og motstand mot statusar | 99 | Magic Defense i FF6 og E.Def i Octopath |
| Snøggleik | Kor fort tidsmålaren fyllest | 50 | Speed i FF6, med tak som Speed i Chrono Trigger |
| Lukke | Sjanse for kritisk treff, flukt og stjeling | 50 | Critical i Octopath og Luck i Dragon Quest |

Kraft og Ordkraft er dei to åtakseigenskapane. Dei fleste figurane er sterke i den eine og svake i den andre, og det er det som skil ein åtakar frå ein galdrar på arket. Herdsle og Tole er dei to forsvarseigenskapane. Herdsle hjelper mot slag, bit, kast og skred. Tole hjelper mot alt som blir sagt, sunge, skrive eller lese mot figuren, og Tole avgjer òg kor ofte ein status bit.

Snøggleik og Lukke har lågare tak og veks sakte. Det er henta frå Chrono Trigger, der Speed aldri veks med nivå og har tak 16, slik at kvar Speed Tab blir eit stort val. Her veks Snøggleik litt med nivå, men dei store stega kjem frå frø og utstyr, og kvart poeng skal kjennast.

### Kvifor seks eigenskapar held

Ein sjuande eigenskap har vore vurdert to stader. Den første er ein eigenskap for Lytt, som styrer kor ofte Aasen høyrer eit ord. Den er utelaten fordi Øyra-greina i Lydtreet alt gjer jobben, og fordi Lytt skal handle om val og tolmod. Den andre er ein eigenskap for hugmålaren. Den er utelaten fordi hugmålaren fyllest av hendingar i kampen, og fordi kvar figur har sine eigne hendingar som fyller han. Figurane har alt sine eigne små målarar (Mett, Ekte, Tvil, krokar, Djupn, Vilje, ladefelt og Tillit). Ein sjuande eigenskap ville gje spelaren eitt tal til å halde styr på utan at det gav eit nytt val. Seks er nok.

## 2 Formlane

Formlane byggjer på FF6 slik Terii Senshi og rpglegion har skrive dei ned (research 1.3), men er forenkla. I FF6 står nivået i andre potens i den fysiske formelen og i første potens i den magiske. Her står nivået i første potens i begge, fordi Liv veks som ei rett line med nivået. Då held eit vanleg treff seg på om lag same del av Liv gjennom heile spelet, og ein designar kan seie at «denne fienden toler fem vanlege treff» utan å rekne på nytt for kvar epoke.

### Slag

Slagskade = (Reiskap + Kraft) × nivå / 3

Reiskap er slagverdien til våpenet (stokk, lasso, hammar, stein). Formelen svarar til Battle Power + Vigor i FF6, der våpen og eigenskap blir lagde saman før nivået gongar dei opp.

### Galdr, song, stev, kved, joik og forteljing

Ordskade = (Styrke + Ordkraft + Ord frå reiskapen) × nivå / 3

Styrke er styrken til ordet eller evna. Regelen er at Styrke er 2 × grunnkostnaden i Røyst for dialektforma. Eit hardt ord som kostar 9 Røyst, har Styrke 18. Ein slik kopling mellom pris og kraft er den same FF6 har mellom MP og Spell Power, berre gjord synleg. Evner som har prosent i figurfilene (Kvikk 140 prosent, Ekte 90 prosent, Frekk 60 prosent og Kved med krokar 80 til 250 prosent), gongar resultatet med prosenten. Påkallingar har Styrke lik Røyst-kostnaden per treff, fordi dei ofte treffer fleire gonger.

Ord frå reiskapen er tillegget frå ein penn, ei salmebok, ei fele eller eit avisblad. Talet er mindre enn slagverdien til våpen på same tid, fordi ordet sjølv har styrke.

### Lækjing

Lækjing = (Styrke + Ordkraft + Ord frå reiskapen) × nivå / 3

Lækjing går ikkje gjennom forsvar. Evner som alt har ein prosent i figurfilene, til dømes Salmesong (30 prosent av Liv) og Heimlengt (5 prosent per runde), held prosenten. Formelen gjeld for j-ord og andre evner som lækjer eit tal.

### Forsvar

Skaden blir gonga med 100 / (100 + Forsvar).

Forsvar mot slag er Herdsle + Vern frå kleda. Forsvar mot ordskade er Tole + Tole frå hovud og klede. Forsvar 100 halverer skaden, og Forsvar 300 tek bort tre firedelar. Ingen blir nokon gong immun. Research 6.6 rår til forsvar i prosent framfor trekk, slik FF6 gjer det, så ein svak figur alltid gjer litt skade. Denne forma er ei forenkling av (255 − Defense) / 256 i FF6 som ikkje sluttar i null.

Vanlege fiendar og bossar har Forsvar og Tole lik 3 × nivået sitt, med mindre fiendearket seier noko anna. Blekkvesen kan gjerne ha høg Herdsle og låg Tole, og dyr det motsette. Bossar er tunge fordi dei har meir Liv og fleire segl. Dei skal ikkje ha høgare forsvar enn vanlege fiendar på same nivå, så spelaren ikkje opplever bossen som ein vegg av tal.

### Spreiing

Skaden blir gonga med eit tilfeldig tal mellom 0,9 og 1,1. FF6 brukar 224 til 255 delt på 256, altså 87,5 til 100 prosent. Her ligg spreiinga på begge sider av snittet, så det utrekna talet er det spelaren ser oftast.

### Kritisk treff

Sjansen for kritisk treff er 3 + Lukke / 5 prosent. Lukke 20 gjev 7 prosent, og Lukke 50 gjev 13 prosent. Eit kritisk treff gjer dobbel skade, som i FF6. Berre slag kan bli kritiske. Galdr har innskrivinga Trykk i staden: rein uttale gjev 20 prosent meir og 2 Røyst att (figurar\_a.md). Fiendar har òg kritiske treff, og eit kritisk treff på Ole Bull medan han spelar, ryk ein streng.

### Ande

Kvar Ande gjev eitt treff til, slik grunnsystemet seier. Eit slag med 3 Ande er fire slag, og kvart kan ta eitt segl. Evner som berre har eitt treff, får 100 prosent meir verknad per Ande i staden, med mindre figurfila seier noko anna. Jotunen har sin eigen regel (50 prosent for første Ande), og ei dialektform tek imot høgst 2 Ande.

### Open fiende og andre multiplikatorar

| Høve | Faktor | Kjelde |
| --- | --- | --- |
| Fienden er open | × 2 ut runden og den neste | grunnsystem.md, Break i Octopath |
| Høvesbonus. Grunnord får × 2 og tek eitt segl | × 1,5 | figurar\_a.md |
| Rotform | × 1,5, ved lampa × 2, og tek imot 3 Ande | figurar\_a.md |
| Hugsa ord | × 1,25 | figurar\_a.md |
| Trykk, rein uttale | × 1,2 | figurar\_a.md |
| Kritisk slag | × 2 | FF6 |
| Ordskade mot alle fiendar | × 0,5 per mål, om evna ikkje seier anna | FF6, «targeting more than one target» |
| Slag gjeve frå bakrada | × 0,5 | FF6 og grunnsystem.md |
| Slag teke i bakrada | × 0,5 | FF6 og grunnsystem.md |
| Rettskriven | Berre grunnskade: lydfamilie, rotform og hugs fell bort. Grunnord held høvesbonusen | grunnsystem.md |

Eit kontrollert ord gjev i tillegg × 1,1 (ordboka\_system.md del 6), og ei rotform laga ved lampa frå Munch gjev × 2 i staden for × 1,5. Alle faktorane blir gonga saman, og skaden blir runda av til slutt. Eit treff kan ikkje gjere meir enn 9 999. Bakrada påverkar berre slag, slik grunnsystemet seier, og ein stokk som er lang nok (Askestokken), slår frå bakrada utan tap, slik somme våpen gjer i FF6.

### Tidsmålaren

Tid til full målar i sekund = 150 / (Snøggleik + 20)

Leddet + 20 kjem frå FF6, der ATB-målaren aukar med (96 × (Speed + 20)) / 16 per tikk (research 1.4). Det dempar skilnadene, så ein figur med dobbel Snøggleik får om lag 60 prosent fleire turar.

| Snøggleik | Sekund til full målar | Med Fimbul | Med Springar |
| --- | --- | --- | --- |
| 10 | 5,00 | 10,00 | 4,17 |
| 16 | 4,17 | 8,33 | 3,47 |
| 20 | 3,75 | 7,50 | 3,13 |
| 25 | 3,33 | 6,67 | 2,78 |
| 30 | 3,00 | 6,00 | 2,50 |
| 35 | 2,73 | 5,45 | 2,27 |
| 40 | 2,50 | 5,00 | 2,08 |
| 50 | 2,14 | 4,29 | 1,79 |

Fimbul gjer at målaren går halvt så fort, slik grunnsystemet seier. Springar frå Ole Bull gjer han 20 prosent raskare, og stad-joiken Vidda 15 prosent. Ved kampstart er målaren fylt med eit tilfeldig tal mellom 0 og Snøggleik prosent, så snøgge figurar ofte handlar først. Telemarksvidjene gjev første tur i snø uansett.

### Lukke: flukt og stjeling

Fluktsjansen er 40 + snitt-Lukke i det aktive partyet − fiendenivå / 2, i prosent, frå 5 til 95. Ein flukt som slår feil, kostar turen til den som prøvde. Frå bossar kan ingen flykte.

Stjeling med tusseordet Taka lukkast med 30 + Lukke − fiendenivå / 2 prosent. Andre evner som stel, brukar same formel.

### Statusar og Tole

Sjansen for at ein status bit, er grunnsjansen til evna − Tole / 2 prosentpoeng, men aldri under 10 prosent med mindre figuren er immun. Ei evne med 80 prosent grunnsjanse treffer ein figur med Tole 40 i 60 prosent av gongene. Jotunen er immun mot Skam, Taus og Rettskriven, og Aslaug mot Rettskriven, slik figurfilene seier. Bossar har ofte 100 prosent grunnsjanse på statusen dei lærer bort.

### Røyst-skala og Lytt

Røyst-kostnadene i figurfilene gjeld for ein figur på nivå 25 eller lågare. Over nivå 25 blir alle faste Røyst-tal gonga med nivå / 25. Det gjeld kostnadene og dei små tilbakebetalingane, til dømes frå Trykk. Ei evne med grunnkostnad 10 kostar 18 på nivå 45 og 22 på nivå 55. Utan skalaen ville ein figur på nivå 55 kunne bruke ei slik evne nesten 40 gonger på full Røyst, og kostnadene ville slutte å vere val.

| Nivå | Røyst (typisk) | Røyst-skala | Evne med grunnkostnad 10 kostar | Bruk på full Røyst |
| --- | --- | --- | --- | --- |
| 10 | 33 | 1,00 | 10 | 3 |
| 20 | 70 | 1,00 | 10 | 7 |
| 25 | 98 | 1,00 | 10 | 10 |
| 30 | 133 | 1,20 | 12 | 11 |
| 40 | 220 | 1,60 | 16 | 14 |
| 45 | 273 | 1,80 | 18 | 15 |
| 55 | 398 | 2,20 | 22 | 18 |
| 62 | 501 | 2,48 | 25 | 20 |
| 70 | 633 | 2,80 | 28 | 23 |

Talet på bruk veks frå 3 til 23 gjennom spelet. Spelaren kjenner seg rikare, slik ein gjer i FF6, utan at Røyst blir uendeleg. Lytt gjev att 10 prosent av maks Røyst. Ein kvileplass fyller alt.

### Kontroll mot tala i dei andre fanene

Tabellen viser ein typisk figur (Liv-faktor 1,0, Kraft 18 + 0,42 per nivå) med det beste slagvåpenet i butikken på nivået, mot ein fiende på same nivå som ikkje er open. Butikkreiskapen følgjer 6 + 0,6 × nivå.

| Nivå | Liv (typisk) | Røyst (typisk) | Kraft (typisk) | Butikkreiskap | Forsvar fiende | Vanleg treff | Prosent av Liv | 3 Ande, hugsa (×1,25) | 3 Ande, Kvikk (×1,4) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 94 | 20 | 18 | 7 | 3 | 8 | 8,6 | 40 | 45 |
| 10 | 670 | 33 | 22 | 12 | 30 | 87 | 12,9 | 433 | 485 |
| 20 | 1 310 | 70 | 26 | 18 | 60 | 183 | 14,0 | 916 | 1 026 |
| 25 | 1 630 | 98 | 28 | 21 | 75 | 234 | 14,3 | 1 169 | 1 309 |
| 30 | 1 950 | 133 | 30 | 24 | 90 | 285 | 14,6 | 1 426 | 1 597 |
| 40 | 2 590 | 220 | 34 | 30 | 120 | 390 | 15,1 | 1 951 | 2 185 |
| 45 | 2 910 | 273 | 36 | 33 | 135 | 443 | 15,2 | 2 217 | 2 484 |
| 47 | 3 038 | 296 | 37 | 34 | 141 | 464 | 15,3 | 2 318 | 2 596 |
| 55 | 3 550 | 398 | 41 | 39 | 165 | 551 | 15,5 | 2 756 | 3 087 |
| 62 | 3 998 | 501 | 44 | 43 | 186 | 626 | 15,7 | 3 130 | 3 505 |
| 70 | 4 510 | 633 | 47 | 48 | 210 | 715 | 15,9 | 3 575 | 4 003 |

Frå nivå 20 og opp ligg eit vanleg treff mellom 14 og 16 prosent av Liv, og på nivå 45 og 55 er det 15,2 og 15,5 prosent. Eit godt åtak med 3 Ande på nivå 55 gjer 2 756 med eit hugsa ord og 3 087 med ei Kvikk-line, altså om lag innanfor 2 500 til 3 000 som superbossar.md reknar med. Dei første nivåa ligg lågare, fordi grunnleddet 30 i Liv veg tungt når nivået er lite. Det gjer at kampane i Ørsta tek nokre treff meir, og det passar ein barndom der Ivar lærer menyen.

#### Døme 1: Vinje slår på nivå 45

Vinje har Kraft 44 og eit butikkvåpen med Slag 33. (33 + 44) × 45 / 3 = 1 155. Fienden på nivå 45 har Forsvar 135, så skaden blir gonga med 100 / 235. Det gjev 491, og med spreiing 442 til 540. Vinje har 3 346 Liv, så treffet er 14,7 prosent av hans eige Liv.

#### Døme 2: Eit godt åtak på nivå 55

Ein typisk figur med Kraft 41 og Slag 39 slår ein fiende på nivå 55 med Forsvar 165. (39 + 41) × 55 / 3 = 1 467, og 1 467 × 100 / 265 = 554. Med eit hugsa ord (× 1,25) og 3 Ande (fire treff) blir det 554 × 1,25 × 4 = 2 768, med spreiing 2 490 til 3 045. Det er talet superbossane er bygde for.

#### Døme 3: Aasen med rotform og høvesbonus på nivå 22

Aasen har Ordkraft 39 og Gåsefjørpennen (Ord 5). Eit hardt ord som kostar 9 Røyst i dialektform, har Styrke 18. (18 + 39 + 5) × 22 / 3 = 455. Fienden på nivå 22 har Tole 66, så 455 × 100 / 166 = 274. Som rotform (× 1,5) med høvesbonus (× 1,5) blir det 616, og med 3 Ande, som berre rotforma tek imot, er det fire treff og 2 464 skade og fire segl. Ein vanleg fiende på nivå 22 har om lag 1 000 Liv. Det er nær det største Aasen kan gjere midt i spelet, og det kostar tre turar med sparing av Ande. Slik viser formelen kvifor rotrekonstruksjonen er verd strevet.

#### Døme 4: Ein fiende slår Moe på nivå 45

Ein vanleg fiende på nivå 45 har Åtak 35. 35 × 45 / 3 = 525. Moe har Herdsle 25 og Vern 30, altså Forsvar 55, så 525 × 100 / 155 = 339. Det er 14,6 prosent av Liv til Moe. Figurfila seier at Moe mistar staden i eventyret når han blir treft av meir enn 15 prosent. Eit vanleg slag er rett under grensa, og eit kritisk slag eller eit bosslag er over. Spelaren lærer fort at Moe treng vern mot dei store slaga.

### Tal for fiendane

Tabellen er ein hjelp for dei som skriv bestiarium og fiendeark. Ein vanleg fiende toler om lag fem vanlege treff, slår ein typisk figur i framrada for 10 til 12 prosent av Liv, og har Forsvar og Tole lik 3 × nivå. Åtak følgjer 24 + nivå / 4, og fiendeslag brukar same formel som slaga til figurane: Åtak × nivå / 3 × 100 / (100 + Forsvar).

| Nivå | Liv, vanleg fiende | Forsvar og Tole | Åtak | Slag mot typisk figur, prosent av Liv | Røynsle | Røynsle, boss |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 40 | 3 | 24 | 7,2 | 6 | 15 |
| 5 | 210 | 15 | 25 | 9,7 | 21 | 105 |
| 10 | 430 | 30 | 27 | 10,6 | 51 | 330 |
| 15 | 670 | 45 | 28 | 10,7 | 91 | 680 |
| 20 | 920 | 60 | 29 | 10,8 | 138 | 1 155 |
| 25 | 1 170 | 75 | 30 | 10,8 | 192 | 1 755 |
| 30 | 1 430 | 90 | 32 | 11,2 | 250 | 2 480 |
| 35 | 1 690 | 105 | 33 | 11,2 | 315 | 3 330 |
| 40 | 1 950 | 120 | 34 | 11,2 | 383 | 4 305 |
| 45 | 2 220 | 135 | 35 | 11,2 | 457 | 5 405 |
| 50 | 2 490 | 150 | 37 | 11,6 | 534 | 6 630 |
| 55 | 2 760 | 165 | 38 | 11,6 | 616 | 7 980 |
| 60 | 3 030 | 180 | 39 | 11,5 | 701 | 9 455 |
| 65 | 3 300 | 195 | 40 | 11,5 | 790 | 11 055 |
| 70 | 3 570 | 210 | 42 | 11,8 | 882 | 12 780 |
| 75 | 3 840 | 225 | 43 | 12,1 | 977 | 14 630 |
| 80 | 4 110 | 240 | 44 | 12,4 | 1 075 | 16 605 |
| 85 | 4 380 | 255 | 46 | 12,9 | 1 176 | 18 705 |
| 90 | 4 650 | 270 | 47 | 13,2 | 1 280 | 20 930 |
| 95 | 4 920 | 285 | 48 | 13,5 | 1 387 | 23 280 |
| 99 | 5 140 | 297 | 49 | 13,8 | 1 474 | 25 160 |

Nivåtaket på 70 gjeld berre figurane. Fiendar kan stå over 70, og tabellen held fram til 99, slik fiendane i FF6 går til nivå 99. Over 70 veks fiendane medan figurane står stille, så slaga deira blir tyngre i prosent av Liv. Kolonnen Slag mot typisk figur reknar med ein figur på nivå 70. Røynsla over 70 kjem berre figurar i reserven til gode, og røynsla til ein figur som har nådd taket, går tapt.

Elitar kan ha to til tre gonger så mykje Liv, og bossar har Åtak 1,5 til 3 gonger ein vanleg fiende på same nivå for vanlege slag. Katastrofeåtak står i prosent av Liv i fiendearka (til dømes Varsla med 50 prosent, eller Tor med 40 prosent av Liv til jotunen), og dei treng ingen formel.

## 3 Vekst per figur

### Fast vekst

Kvar figur veks etter sin eigen faste tabell, slik figurane gjer i FF4 fram til nivå 70 og i Chrono Trigger. Det finst ingen terning ved nivåauke. Research 5.3 viser kva tilfeldig vekst gjer: spelarar lagrar og lastar på nytt for betre kast, og designaren kan ikkje balansere ein boss mot eitt tal. Med fast vekst veit teamet kva kvar figur kan på kvart nivå, og bossane i fiendar\_bossar.md kan stå med eitt tilrådd nivå.

Kvar eigenskap følgjer grunnverdi + vekst × (nivå − 1), runda av. Liv er Liv-faktor × (30 + 64 × nivå), og Røyst er Røyst-faktor × (20 + nivå × nivå / 8). I tabellen under står grunnverdi og vekst per nivå. «22 + 0,8» tyder 22 på nivå 1 og 0,8 meir for kvart nivå.

| Figur | Liv-faktor | Røyst-faktor | Kraft | Ordkraft | Herdsle | Tole | Snøggleik | Lukke |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Aasen | 0,80 | 1,25 | 12 + 0,25 | 22 + 0,8 | 10 + 0,25 | 18 + 0,55 | 24 + 0,1 | 18 + 0,2 |
| Tussen | 0,55 | ingen | 14 + 0,3 | 20 + 0,5 | 8 + 0,2 | 20 + 0,5 | 40 + 0,15 | 30 + 0,25 |
| Huldra | 0,85 | 1,30 | 10 + 0,2 | 26 + 0,75 | 14 + 0,3 | 26 + 0,7 | 30 + 0,1 | 22 + 0,2 |
| Vinje | 1,15 | 0,90 | 20 + 0,55 | 20 + 0,6 | 16 + 0,4 | 12 + 0,3 | 32 + 0,15 | 20 + 0,25 |
| Landstad | 0,95 | 1,20 | 12 + 0,25 | 20 + 0,65 | 15 + 0,35 | 22 + 0,6 | 18 + 0,05 | 14 + 0,15 |
| Aslaug | 0,95 | 1,00 | 12 + 0,3 | 24 + 0,7 | 14 + 0,35 | 22 + 0,55 | 16 + 0,05 | 20 + 0,2 |
| Ravdna | 1,05 | 1,05 | 16 + 0,4 | 22 + 0,6 | 16 + 0,4 | 24 + 0,55 | 26 + 0,1 | 22 + 0,2 |
| Collett | 0,85 | 1,10 | 10 + 0,2 | 20 + 0,6 | 12 + 0,3 | 24 + 0,6 | 34 + 0,15 | 24 + 0,25 |
| Knudsen | 1,10 | 0,80 | 16 + 0,35 | 18 + 0,6 | 20 + 0,5 | 18 + 0,45 | 22 + 0,08 | 14 + 0,1 |
| Asbjørnsen | 0,85 | 1,35 | 16 + 0,35 | 22 + 0,75 | 12 + 0,3 | 14 + 0,35 | 26 + 0,1 | 26 + 0,25 |
| Moe | 0,80 | 1,15 | 8 + 0,15 | 22 + 0,7 | 12 + 0,3 | 22 + 0,6 | 16 + 0,05 | 18 + 0,2 |
| Ole Bull | 0,95 | 1,10 | 14 + 0,3 | 22 + 0,65 | 14 + 0,3 | 18 + 0,45 | 28 + 0,12 | 28 + 0,3 |
| Berte | 1,00 | 1,15 | 12 + 0,3 | 22 + 0,65 | 16 + 0,4 | 26 + 0,7 | 18 + 0,05 | 18 + 0,2 |
| Jotunen | 1,50 | ingen | 34 + 0,95 | 4 + 0,05 | 30 + 0,75 | 20 + 0,45 | 18 + 0,05 | 8 + 0,05 |

Snittet av Liv-faktorane for dei tretten vaksne figurane er 0,98, så partyet som heilskap ligg på om lag 64 Liv per nivå, slik fiendar\_bossar.md seier.

### Profilane i korte trekk

Aasen er svak i Liv og Herdsle og sterk i Ordkraft og Røyst. Han veks raskast av alle i Ordkraft, og på nivå 70 har han 77. Krafta hans ligg i Ordboka og Lydtreet, så tala hans er laga for at han skal tole lite og seie mykje. Han treng vern frå huldra eller Vinje.

Tussen er liten og snøgg. Han har lågast Liv og høgast Snøggleik i spelet, og han har Lukke nok til at Taka ofte lukkast. Han har ingen Røyst, fordi alt han gjer, kostar Mett.

Huldra har høgast Tole og om lag same Ordkraft som Aasen. Ho er den beste til å stå imot galdr og statusar, og ho har nest mest Røyst. Liv-faktoren hennar er 0,85 før spelaren har skrive noko av henne, og han søkk for kvart ord som blir skrive (sjå under).

Vinje har høgast Liv-faktor blant menneska og er god i både Kraft og Ordkraft, fordi han både slår og stevjar. Tole er lågast i partyet, og det gjer han sårbar for Skam og Rettskriven. Med Snøggleik 32 handlar han ofte før fienden.

Landstad er sein, med Snøggleik 18 og nesten ingen vekst. Han har høg Tole og god Ordkraft, og Røyst-faktoren hans er høg, fordi visene kostar mykje. Han er bygd for å stå lenge i bakrada og lækje.

Aslaug er den tregaste i partyet saman med Moe, med vilje. Ordkrafta hennar er høg, og ho tener på at fienden får handle først. Tole er god, og Utan papir gjer henne immun mot Rettskriven.

Ravdna er jamn, med god Liv og god Tole. Kraft treng ho til Kast. Styrken hennar veks gjennom Djupn i joiken medan kampen går.

Collett er snøgg og har høg Tole. Ho skal kome før fienden med Taus, og då treng ho Snøggleik meir enn Kraft. Liv er låg, og stillinga Anonym er vernet hennar.

Knudsen har høgast Herdsle blant menneska og god Liv. Han skal halde ut over mange rundar medan ladefelta fyllest. Han har lite Røyst, fordi Ret ikkje kostar Røyst.

Asbjørnsen har mest Røyst av alle og god Ordkraft, fordi påkallingane er dyre og sterke. Liv og Tole er låge. Lukke er høg, og Granske passar ein mann som ser det andre ikkje ser.

Moe har lågast Kraft og låg Liv. Ordkrafta er god, og Tole er høg. Han er treg, og Snøggleik 16 gjer at han treng vern medan han fortel.

Ole Bull har høgast Lukke blant menneska og god Ordkraft. Røyst-faktoren er høg, fordi slåttane kostar Røyst kvar runde.

Berte har jamn Liv og høg Tole, og ho er treg. Røyst-faktoren er høg, fordi bønene kostar Røyst kvar runde. Mykje av krafta hennar står ikkje i tabellen. Ho ligg i rustninga, som gjev Vern, Tole og reglar til dei andre i partyet.

Jotunen har mest Liv og mest Kraft i spelet, og han når taket på 99 i Kraft på nivå 70. Ordkrafta er nesten null, og han har ingen Røyst. Herdsle er høgast i partyet. Han er treg og har lite Lukke.

### Liv

| Figur | Nivå 1 | Nivå 10 | Nivå 20 | Nivå 30 | Nivå 45 | Nivå 55 | Nivå 70 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Aasen | 75 | 536 | 1 048 | 1 560 | 2 328 | 2 840 | 3 608 |
| Tussen | 52 | 369 | 721 | 1 073 | 1 601 | 1 953 | 2 481 |
| Huldra | 80 | 570 | 1 114 | 1 658 | 2 474 | 3 018 | 3 834 |
| Vinje | 108 | 770 | 1 506 | 2 243 | 3 346 | 4 082 | 5 187 |
| Landstad | 89 | 637 | 1 245 | 1 853 | 2 765 | 3 373 | 4 285 |
| Aslaug | 89 | 637 | 1 245 | 1 853 | 2 765 | 3 373 | 4 285 |
| Ravdna | 99 | 704 | 1 376 | 2 048 | 3 056 | 3 728 | 4 736 |
| Collett | 80 | 570 | 1 114 | 1 658 | 2 474 | 3 018 | 3 834 |
| Knudsen | 103 | 737 | 1 441 | 2 145 | 3 201 | 3 905 | 4 961 |
| Asbjørnsen | 80 | 570 | 1 114 | 1 658 | 2 474 | 3 018 | 3 834 |
| Moe | 75 | 536 | 1 048 | 1 560 | 2 328 | 2 840 | 3 608 |
| Ole Bull | 89 | 637 | 1 245 | 1 853 | 2 765 | 3 373 | 4 285 |
| Berte | 94 | 670 | 1 310 | 1 950 | 2 910 | 3 550 | 4 510 |
| Jotunen | 141 | 1 005 | 1 965 | 2 925 | 4 365 | 5 325 | 6 765 |

### Røyst

| Figur | Nivå 1 | Nivå 10 | Nivå 20 | Nivå 30 | Nivå 45 | Nivå 55 | Nivå 70 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Aasen | 25 | 41 | 88 | 166 | 341 | 498 | 791 |
| Tussen | ingen | ingen | ingen | ingen | ingen | ingen | ingen |
| Huldra | 26 | 42 | 91 | 172 | 355 | 518 | 822 |
| Vinje | 18 | 29 | 63 | 119 | 246 | 358 | 569 |
| Landstad | 24 | 39 | 84 | 159 | 328 | 478 | 759 |
| Aslaug | 20 | 33 | 70 | 133 | 273 | 398 | 633 |
| Ravdna | 21 | 34 | 74 | 139 | 287 | 418 | 664 |
| Collett | 22 | 36 | 77 | 146 | 300 | 438 | 696 |
| Knudsen | 16 | 26 | 56 | 106 | 219 | 319 | 506 |
| Asbjørnsen | 27 | 44 | 95 | 179 | 369 | 537 | 854 |
| Moe | 23 | 37 | 81 | 152 | 314 | 458 | 727 |
| Ole Bull | 22 | 36 | 77 | 146 | 300 | 438 | 696 |
| Berte | 23 | 37 | 81 | 152 | 314 | 458 | 727 |
| Jotunen | ingen | ingen | ingen | ingen | ingen | ingen | ingen |

### Kraft

| Figur | Nivå 1 | Nivå 10 | Nivå 20 | Nivå 30 | Nivå 45 | Nivå 55 | Nivå 70 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Aasen | 12 | 14 | 17 | 19 | 23 | 26 | 29 |
| Tussen | 14 | 17 | 20 | 23 | 27 | 30 | 35 |
| Huldra | 10 | 12 | 14 | 16 | 19 | 21 | 24 |
| Vinje | 20 | 25 | 30 | 36 | 44 | 50 | 58 |
| Landstad | 12 | 14 | 17 | 19 | 23 | 26 | 29 |
| Aslaug | 12 | 15 | 18 | 21 | 25 | 28 | 33 |
| Ravdna | 16 | 20 | 24 | 28 | 34 | 38 | 44 |
| Collett | 10 | 12 | 14 | 16 | 19 | 21 | 24 |
| Knudsen | 16 | 19 | 23 | 26 | 31 | 35 | 40 |
| Asbjørnsen | 16 | 19 | 23 | 26 | 31 | 35 | 40 |
| Moe | 8 | 9 | 11 | 12 | 15 | 16 | 18 |
| Ole Bull | 14 | 17 | 20 | 23 | 27 | 30 | 35 |
| Berte | 12 | 15 | 18 | 21 | 25 | 28 | 33 |
| Jotunen | 34 | 43 | 52 | 62 | 76 | 85 | 99 |

### Ordkraft

| Figur | Nivå 1 | Nivå 10 | Nivå 20 | Nivå 30 | Nivå 45 | Nivå 55 | Nivå 70 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Aasen | 22 | 29 | 37 | 45 | 57 | 65 | 77 |
| Tussen | 20 | 25 | 30 | 35 | 42 | 47 | 55 |
| Huldra | 26 | 33 | 40 | 48 | 59 | 67 | 78 |
| Vinje | 20 | 25 | 31 | 37 | 46 | 52 | 61 |
| Landstad | 20 | 26 | 32 | 39 | 49 | 55 | 65 |
| Aslaug | 24 | 30 | 37 | 44 | 55 | 62 | 72 |
| Ravdna | 22 | 27 | 33 | 39 | 48 | 54 | 63 |
| Collett | 20 | 25 | 31 | 37 | 46 | 52 | 61 |
| Knudsen | 18 | 23 | 29 | 35 | 44 | 50 | 59 |
| Asbjørnsen | 22 | 29 | 36 | 44 | 55 | 63 | 74 |
| Moe | 22 | 28 | 35 | 42 | 53 | 60 | 70 |
| Ole Bull | 22 | 28 | 34 | 41 | 51 | 57 | 67 |
| Berte | 22 | 28 | 34 | 41 | 51 | 57 | 67 |
| Jotunen | 4 | 4 | 5 | 5 | 6 | 7 | 7 |

### Herdsle

| Figur | Nivå 1 | Nivå 10 | Nivå 20 | Nivå 30 | Nivå 45 | Nivå 55 | Nivå 70 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Aasen | 10 | 12 | 15 | 17 | 21 | 24 | 27 |
| Tussen | 8 | 10 | 12 | 14 | 17 | 19 | 22 |
| Huldra | 14 | 17 | 20 | 23 | 27 | 30 | 35 |
| Vinje | 16 | 20 | 24 | 28 | 34 | 38 | 44 |
| Landstad | 15 | 18 | 22 | 25 | 30 | 34 | 39 |
| Aslaug | 14 | 17 | 21 | 24 | 29 | 33 | 38 |
| Ravdna | 16 | 20 | 24 | 28 | 34 | 38 | 44 |
| Collett | 12 | 15 | 18 | 21 | 25 | 28 | 33 |
| Knudsen | 20 | 25 | 30 | 35 | 42 | 47 | 55 |
| Asbjørnsen | 12 | 15 | 18 | 21 | 25 | 28 | 33 |
| Moe | 12 | 15 | 18 | 21 | 25 | 28 | 33 |
| Ole Bull | 14 | 17 | 20 | 23 | 27 | 30 | 35 |
| Berte | 16 | 20 | 24 | 28 | 34 | 38 | 44 |
| Jotunen | 30 | 37 | 44 | 52 | 63 | 71 | 82 |

### Tole

| Figur | Nivå 1 | Nivå 10 | Nivå 20 | Nivå 30 | Nivå 45 | Nivå 55 | Nivå 70 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Aasen | 18 | 23 | 28 | 34 | 42 | 48 | 56 |
| Tussen | 20 | 25 | 30 | 35 | 42 | 47 | 55 |
| Huldra | 26 | 32 | 39 | 46 | 57 | 64 | 74 |
| Vinje | 12 | 15 | 18 | 21 | 25 | 28 | 33 |
| Landstad | 22 | 27 | 33 | 39 | 48 | 54 | 63 |
| Aslaug | 22 | 27 | 32 | 38 | 46 | 52 | 60 |
| Ravdna | 24 | 29 | 34 | 40 | 48 | 54 | 62 |
| Collett | 24 | 29 | 35 | 41 | 50 | 56 | 65 |
| Knudsen | 18 | 22 | 27 | 31 | 38 | 42 | 49 |
| Asbjørnsen | 14 | 17 | 21 | 24 | 29 | 33 | 38 |
| Moe | 22 | 27 | 33 | 39 | 48 | 54 | 63 |
| Ole Bull | 18 | 22 | 27 | 31 | 38 | 42 | 49 |
| Berte | 26 | 32 | 39 | 46 | 57 | 64 | 74 |
| Jotunen | 20 | 24 | 29 | 33 | 40 | 44 | 51 |

### Snøggleik

| Figur | Nivå 1 | Nivå 10 | Nivå 20 | Nivå 30 | Nivå 45 | Nivå 55 | Nivå 70 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Aasen | 24 | 25 | 26 | 27 | 28 | 29 | 31 |
| Tussen | 40 | 41 | 43 | 44 | 47 | 48 | 50 |
| Huldra | 30 | 31 | 32 | 33 | 34 | 35 | 37 |
| Vinje | 32 | 33 | 35 | 36 | 39 | 40 | 42 |
| Landstad | 18 | 18 | 19 | 19 | 20 | 21 | 21 |
| Aslaug | 16 | 16 | 17 | 17 | 18 | 19 | 19 |
| Ravdna | 26 | 27 | 28 | 29 | 30 | 31 | 33 |
| Collett | 34 | 35 | 37 | 38 | 41 | 42 | 44 |
| Knudsen | 22 | 23 | 24 | 24 | 26 | 26 | 28 |
| Asbjørnsen | 26 | 27 | 28 | 29 | 30 | 31 | 33 |
| Moe | 16 | 16 | 17 | 17 | 18 | 19 | 19 |
| Ole Bull | 28 | 29 | 30 | 31 | 33 | 34 | 36 |
| Berte | 18 | 18 | 19 | 19 | 20 | 21 | 21 |
| Jotunen | 18 | 18 | 19 | 19 | 20 | 21 | 21 |

### Lukke

| Figur | Nivå 1 | Nivå 10 | Nivå 20 | Nivå 30 | Nivå 45 | Nivå 55 | Nivå 70 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Aasen | 18 | 20 | 22 | 24 | 27 | 29 | 32 |
| Tussen | 30 | 32 | 35 | 37 | 41 | 44 | 47 |
| Huldra | 22 | 24 | 26 | 28 | 31 | 33 | 36 |
| Vinje | 20 | 22 | 25 | 27 | 31 | 34 | 37 |
| Landstad | 14 | 15 | 17 | 18 | 21 | 22 | 24 |
| Aslaug | 20 | 22 | 24 | 26 | 29 | 31 | 34 |
| Ravdna | 22 | 24 | 26 | 28 | 31 | 33 | 36 |
| Collett | 24 | 26 | 29 | 31 | 35 | 38 | 41 |
| Knudsen | 14 | 15 | 16 | 17 | 18 | 19 | 21 |
| Asbjørnsen | 26 | 28 | 31 | 33 | 37 | 40 | 43 |
| Moe | 18 | 20 | 22 | 24 | 27 | 29 | 32 |
| Ole Bull | 28 | 31 | 34 | 37 | 41 | 44 | 49 |
| Berte | 18 | 20 | 22 | 24 | 27 | 29 | 32 |
| Jotunen | 8 | 8 | 9 | 9 | 10 | 11 | 11 |

### Nivå når figurane blir med

Ein figur som blir med, får nivået til partyet etter regelen frå FF6: snittet av nivåa til dei aktive figurane, runda ned, pluss eit lite tillegg (research 1.6). Figurar som kjem att etter lang tid, får nivået til Aasen minus to eller sitt eige om det er høgare, slik figurar\_b.md seier. Tabellen viser venta nivå for ein spelar som følgjer tilrådd nivå.

| Figur | Blir med | Nivå | Tillegg |
| --- | --- | --- | --- |
| Unge Ivar | 1.1, 1816 | 1 |  |
| Tussen | 1.3, julekvelden 1820 | 3 | Same nivå som Ivar |
| Aasen, vaksen | Ekset 1833 | Same som unge Ivar | Sjå under |
| Huldra | 1.17, Solnør 1841 | 8 | Same nivå som Aasen |
| Landstad | 2.24b, Seljord 1845 | 20 | Snittet |
| Vinje | 2.27, Rauland 1845 | 22 | Snittet |
| Aslaug, gjest | 2.27, Rauland 1845 | 22 | Snittet. Berre i Telemark, og ho blir verande i Rauland i 2.28 |
| Berte | 5.5b, Årflot, januar 1851 | 34 | Same nivå som Aasen |
| Collett | 5.12, april 1851 | 35 | Snittet |
| Knudsen | 5.22, eige kapittel | 36 | Fast |
| Ravdna | 5.16, Lofoten 1851 | 37 | Snittet |
| Ole Bull | 6.3, 1852 | 39 | Snittet |
| Landstad, att | 6.5, Drammen, juni 1852 | 39 | Aasen minus to eller eige |
| Moe og Asbjørnsen | 6.8 og 6.9 | 40 | Snittet |
| Aslaug | 6.7b, Rauland, juli 1852 | 40 | Snittet, +2 om spelaren valde B i S1.28 |
| Jotunen | 6.13, Hjerkinn | 41 | Snittet |
| Ravdna, att | 6.19b, Akershus, august 1853 | 43 | Aasen minus to eller eige |

Valet i S1.28 gjev Aslaug «sterkare startverdiar» i manuset. Her blir det to nivå ekstra, som Locke og Edgar i FF6 får når dei kjem.

### Unge Ivar og tidshoppa

Unge Ivar har ein eigen barneprofil frå 1816 til 1831. Han har Liv-faktor 0,60 og lite Kraft, og Ordkrafta veks like fort som hos den vaksne Aasen. Han står i partyet frå nivå 1 til om lag nivå 6 når Ørsta-delen er over.

| Nivå | Liv | Røyst | Kraft | Ordkraft | Herdsle | Tole | Snøggleik | Lukke |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 56 | 20 | 6 | 16 | 6 | 12 | 26 | 20 |
| 2 | 95 | 21 | 6 | 17 | 6 | 13 | 26 | 20 |
| 3 | 133 | 21 | 7 | 18 | 7 | 13 | 26 | 20 |
| 4 | 172 | 22 | 7 | 18 | 7 | 14 | 27 | 21 |
| 5 | 210 | 23 | 7 | 19 | 7 | 14 | 27 | 21 |
| 6 | 248 | 25 | 8 | 20 | 7 | 15 | 27 | 21 |
| 7 | 287 | 26 | 8 | 21 | 8 | 15 | 27 | 21 |
| 8 | 325 | 28 | 8 | 22 | 8 | 16 | 27 | 21 |

Ved tidshoppet til Ekset i 1833 blir nivået ståande, og eigenskapane blir rekna på nytt etter vaksenprofilen til Aasen. Ein Ivar på nivå 6 blir ein Aasen på nivå 6 med 331 Liv i staden for 248. Ingen røynsle går tapt, og spelaren mistar ingenting. Det som verkeleg følgjer han gjennom hoppa, er Ordboka og Lydtreet, slik bibelen og figurar\_b.md seier: orda han har høyrt og nodane han har kjøpt i Lydtreet. Nivået er den mindre delen av krafta hans, og det skal spelaren kjenne når han står åleine i Ørsta i 1850 og vinn på orda.

Same regel gjeld for minna med den unge Camilla Wergeland (4.3 og 4.4). Ho har tala til Collett på nivået partyet har i Christiania, med Liv-faktor 0,70.

### Huldra og nedskrivne ord

Huldra mistar 5 prosent av maks Liv for godt kvar gong spelaren skriv ned eit av orda hennar. Heimr i 1.17 er unntaket: då mistar ho 10 prosent av maks Liv for resten av første akt, slik manuset seier (figurar\_a.md). Tabellen reknar med at heimr er eitt av dei skrivne orda. Prosentane og nivå 10 viser slutten av første akt, då heimr enno kostar 10 prosent. Frå nivå 30 kostar heimr ingenting, og kvart av dei andre orda kostar 5 prosent. I tabellane over står huldra slik ho er om ingen ord er skrivne. Tabellen under viser kva skrivinga gjer med Liv:

| Skrivne huldreord, heimr medrekna | Maks Liv i første akt | Nivå 10 | Nivå 30 | Nivå 45 | Nivå 55 |
| --- | --- | --- | --- | --- | --- |
| 0 | 100 % | 570 | 1 658 | 2 474 | 3 018 |
| 1 | 90 % | 513 | 1 658 | 2 474 | 3 018 |
| 2 | 85 % | 485 | 1 575 | 2 350 | 2 867 |
| 3 | 80 % | 456 | 1 492 | 2 227 | 2 716 |
| 5 | 70 % | 399 | 1 326 | 1 979 | 2 414 |
| 8 | 55 % | 314 | 1 078 | 1 608 | 1 962 |

Tapet kjem i tillegg til veksten. Huldra veks framleis for kvart nivå, men alltid frå eit lågare tak, og spelaren ser at kvart skrive ord følgjer henne resten av spelet. Tapet frå prologen, der kvar Samle tok 5 prosent utan at talet blei vist, ligg alt inne i Liv-faktoren 0,85.

Status Nedskriven frå Hallingdal 1845 (3.8) til jula 1847 gjer maks kraft ein fjerdedel lågare. I tala betyr det at Ordkraft og maks Røyst er gonga med 0,75 i den tida. Når Nedskriven går over, er tala tilbake der profilen seier, utan noko tap.

### Prologpartyet

Prologen på Snøfjellet har fast styrke. Asbjørnsen, Moe og huldra har tala sine for nivå 35, med 999 Røyst og 3 Ande frå første runde, og Rasmus har 400 Liv og berre Flykt. Overmakta er den same som Magitek-rustningane i Narshe i FF6. Spelaren skal sjå store tal i prologen og så små tal når Ivar byrjar i Ørsta, og forstå at tala ikkje var deira eigne.

### Hovudhandlingar på nivå 45 og 55

Tabellen viser den vanlegaste skadehandlinga til kvar figur, med butikkutstyr og utan open fiende, høvesbonus eller Ande der ikkje anna står. Prosenten er målt mot Liv til ein typisk figur.

| Figur | Handling | Nivå 45 | Prosent av typisk Liv | Nivå 55 | Prosent av typisk Liv |
| --- | --- | --- | --- | --- | --- |
| Aasen | Galdr, hardt ord (10 Røyst), dialektform | 594 | 20 % | 719 | 20 % |
| Aasen | Same ordet som rotform og hugsa (×1,5 × 1,25) | 1 113 | 38 % | 1 349 | 38 % |
| Huldra | Gamle ord (15 Røyst) | 670 | 23 % | 803 | 23 % |
| Vinje | Slag | 491 | 17 % | 616 | 17 % |
| Vinje | Stev, Kvikk (8 Røyst, ×1,4) | 697 | 24 % | 843 | 24 % |
| Landstad | Folkevise mot blekk (10 Røyst) | 543 | 19 % | 650 | 18 % |
| Aslaug | Kved med 3 krokar (8 Røyst, ×2,5) | 1 388 | 48 % | 1 678 | 47 % |
| Ravdna | Kast (4 Røyst) som slag | 428 | 15 % | 533 | 15 % |
| Collett | Kvass replikk (6 Røyst) | 472 | 16 % | 574 | 16 % |
| Knudsen | Slag | 409 | 14 % | 512 | 14 % |
| Asbjørnsen | Trolla på Hedalsskogen, tre treff (16 Røyst) | 1 666 | 57 % | 2 034 | 57 % |
| Moe | Slag | 306 | 11 % | 381 | 11 % |
| Ole Bull | Dobbelgrep (6 Røyst) | 504 | 17 % | 609 | 17 % |
| Jotunen | Steinn (slag ×1,5) | 1 044 | 36 % | 1 287 | 36 % |
| Vinje | Stev, Kvikk med 3 Ande (fire vers) | 2 788 | 96 % | 3 371 | 95 % |
| Typisk figur | Slag med butikkreiskap | 443 | 15 % | 551 | 16 % |

Aasen gjer om lag 1,3 gonger eit vanleg treff med eit vanleg ord, og to og ein halv gong så mykje med ei hugsa rotform. Asbjørnsen gjer mest på éin tur, slik figurar\_b.md seier, og betaler med Vilje. Aslaug kjem nær han når ho har venta. Moe og Knudsen slår lite, fordi styrken deira ligg i Fortelje og Ret. Ravdna slår lite ho òg, for ho vinn med joiken.

Slik slår ein vanleg fiende på nivå 45 kvar figur i framrada, med Herdsle frå tabellen og butikk-klede:

| Figur | Forsvar (Herdsle + Klede) | Slag frå vanleg fiende | Prosent av eigen Liv |
| --- | --- | --- | --- |
| Aasen | 51 | 350 | 15,0 % |
| Tussen | 47 | 360 | 22,5 % |
| Huldra | 57 | 337 | 13,6 % |
| Vinje | 64 | 322 | 9,6 % |
| Landstad | 60 | 330 | 12,0 % |
| Aslaug | 59 | 333 | 12,0 % |
| Ravdna | 64 | 322 | 10,6 % |
| Collett | 55 | 341 | 13,8 % |
| Knudsen | 72 | 307 | 9,6 % |
| Asbjørnsen | 55 | 341 | 13,8 % |
| Moe | 55 | 341 | 14,7 % |
| Ole Bull | 57 | 337 | 12,2 % |
| Jotunen | 93 | 274 | 6,3 % |

Tussen og Aasen tek mest i prosent, og jotunen minst. Aasen bør stå i bakrada, der han tek halv skade av slag.

## 4 Røynsle

### Kurva

Røynsle til neste nivå = 5 × nivå × nivå + 15 × nivå + 10

Kurva er kvadratisk per nivå, slik FF6 er (om lag 8,2 × nivå² per nivå, research 1.6), og den samla kurva er nær kubisk. Ho er slakare enn FF6, fordi taket her er 70, og fordi ein ungdom ikkje skal grinde i timevis. Frå nivå 1 til 70 trengst 596 390 røynsle, mot 934 208 til nivå 70 i FF6.

Røynsle frå ein vanleg fiende på nivå E = 1,5 × E^1,5 + 4, runda av. Ein boss gjev halvparten av det som trengst frå nivået sitt til det neste. Fienderøynsla veks litt saktare enn kravet, og difor stig talet på kampar per nivå sakte gjennom spelet, frå to eller tre i Ørsta til åtte i Sagahallen. Det er Schreiber si «slightly increasing curve, where each area takes a little more time than the last» (research 6.2).

| Nivå | Til neste nivå | Samla ved nivået | Røynsle, vanleg fiende på nivået | Kampar per nivå (tre fiendar) |
| --- | --- | --- | --- | --- |
| 1 | 30 | 0 | 6 | 1,7 |
| 2 | 60 | 30 | 8 | 2,5 |
| 3 | 100 | 90 | 12 | 2,8 |
| 4 | 150 | 190 | 16 | 3,1 |
| 5 | 210 | 340 | 21 | 3,3 |
| 6 | 280 | 550 | 26 | 3,6 |
| 8 | 450 | 1 190 | 38 | 3,9 |
| 10 | 660 | 2 190 | 51 | 4,3 |
| 12 | 910 | 3 630 | 66 | 4,6 |
| 15 | 1 360 | 6 790 | 91 | 5,0 |
| 20 | 2 310 | 15 390 | 138 | 5,6 |
| 25 | 3 510 | 29 240 | 192 | 6,1 |
| 30 | 4 960 | 49 590 | 250 | 6,6 |
| 34 | 6 300 | 71 390 | 301 | 7,0 |
| 38 | 7 800 | 98 790 | 355 | 7,3 |
| 41 | 9 030 | 123 400 | 398 | 7,6 |
| 45 | 10 810 | 162 140 | 457 | 7,9 |
| 47 | 11 760 | 184 230 | 487 | 8,0 |
| 50 | 13 260 | 220 990 | 534 | 8,3 |
| 55 | 15 960 | 292 590 | 616 | 8,6 |
| 60 | 18 910 | 378 190 | 701 | 9,0 |
| 65 | 22 110 | 479 040 | 790 | 9,3 |
| 69 | 24 850 | 571 540 | 864 | 9,6 |

Kolonnen til høgre reknar med tre fiendar per kamp på same nivå som figuren. Mange kampar har to eller fire fiendar, og bossar, gullfiendar og roa folkevesen gjev meir, så det reelle talet ligg litt lågare.

### Kven som får røynsle

Kvar aktiv figur som står når kampen er over, får full røynsle. Røynsla blir ikkje delt på figurane, slik ho blir i FF6. Delinga i FF6 straffar den som tek med fleire, og her skal spelaren vere fri til å stille fire. Figurar i reserve får 75 prosent, slik grunnsystemet seier. Figurar som er slegne ut når kampen er over, får òg 75 prosent, som reserven. Gjestar får ingen røynsle og kan ikkje utstyrast, slik figurar\_b.md seier.

Reserven ligg mellom FF4, der fråverande figurar får alt, og FF6, der dei får ingenting og blir sette til snittet når dei kjem att (research 6.3). Saman med gummibandet under gjer det at ein figur som har stått i reserve ei stund, tek att dei andre utan at spelaren må grinde for han.

### Gummiband

Røynsla blir justert etter nivåskilnaden mellom fienden og kvar einskild figur. For kvart nivå fienden er over figuren, får figuren 10 prosent meir, opp til det doble. For kvart nivå figuren er over fienden, får han 12 prosent mindre, ned til 10 prosent. Pokémon gjer det same med ein potensformel (research 6.3). Her er det lineært, så ein lærar kan vise det på tavla.

| Fienden over (+) eller under (−) figuren | Røynsle | Kampar per nivå for ein figur på nivå 30 |
| --- | --- | --- |
| −10 | 10 % | 119,8 |
| −8 | 10 % | 104,0 |
| −6 | 28 % | 32,8 |
| −4 | 52 % | 15,7 |
| −2 | 76 % | 9,6 |
| 0 | 100 % | 6,6 |
| +2 | 120 % | 5,0 |
| +4 | 140 % | 3,9 |
| +6 | 160 % | 3,2 |
| +8 | 180 % | 2,6 |
| +10 | 200 % | 2,2 |

Ein spelar som står fire nivå over området, treng om lag 16 kampar for neste nivå i staden for 7, og ein som står åtte nivå over, treng over hundre. Grinding er mogleg, men ho stoppar av seg sjølv, og ingen går seg fast i eit gammalt område. Ein figur som ligg fire nivå under partyet, får 140 prosent, og i reserve 105 prosent. Han tek att dei andre på nokre få nivå.

Fiendenivået står i Ordboka på sida til kvar fiendetype etter første møte. Trinna I til IV i bestiarium-filene svarar om lag til nivå 1 til 8 (I), 9 til 27 (II), 28 til 39 (III) og 40 til 47 (IV). Kvar fiendetype har eitt fast nivå innanfor trinnet sitt.

### Kampar per del

Tabellen viser kor mange kampar på tilrådd nivå ein spelar treng for å nå neste del, utan bossar og utan bonusar. Med bossar og roa vesen blir talet om lag 20 prosent lågare.

| Del | Nivå | Nivå i alt | Kampar på nivå (om lag) | Snitt per nivå |
| --- | --- | --- | --- | --- |
| Ørsta 1816–1831 | 1 til 6 | 5 | 13 | 2,7 |
| Ekset, Solnør og Bergen 1833–1841 | 6 til 10 | 4 | 15 | 3,8 |
| Reiseåra 1842–1847 | 10 til 27 | 17 | 90 | 5,3 |
| Christiania 1847–1850 | 27 til 34 | 7 | 46 | 6,6 |
| Fimbulvinteren 1850–1853 | 34 til 45 | 11 | 81 | 7,4 |
| Sagahallen 1853 | 45 til 47 | 2 | 16 | 7,9 |
| Superbossar (valfritt) | 47 til 62 | 15 | 128 | 8,6 |

Ein spelar som tek dei fleste kampane han møter på vegen, når nivå 45 ved Sagahallen utan å grinde. Superbossane krev om lag 130 kampar ekstra på nivå for å nå 62. Dei er laga for entusiastane, og gullfiendane i bestiariet (Marmælet, Smørharen, Elgen, Lundehunden og fleire) kortar ned vegen.

Villmarkene endrar ikkje tabellen. Kampane der er vanlege kampar på nivået i regionen og tel med i kampane på nivå. Dei nitten nye bossane i villmarkene gjev røynsle etter same regel som andre bossar, halvparten av det som trengst frå nivået deira til det neste. Tekne på tilrådd nivå gjev dei åtte i reiseåra til saman 9 755 røynsle, om lag 28 prosent av det som trengst frå nivå 10 til 27. Dei to i 1849 gjev 5 445, om lag 16 prosent av vegen frå 27 til 34, og dei ni i vinterlaga gjev 38 300, om lag 42 prosent av vegen frå 34 til 45. Ein spelar som tek alle villmarkene, kjem difor over kurva. Gummibandet gjev 12 prosent mindre røynsle for kvart nivå han står over, og det skal halde han nær kurva (sjå Bør justerast).

### Tilrådd nivå per del og per boss

Nivåa er henta frå vanskekurva i fiendar\_bossar.md og superbossar.md. Dagboka viser tilrådd nivå på kvart spor og kvart oppdrag, slik Octopath viser det på kapittelflagget (research 4.4).

| Del | Nivå inn | Nivå ut | Bossar med tilrådd nivå |
| --- | --- | --- | --- |
| Prologen 1841 | fast | fast | Fonnkjerringa (fast prologstyrke) |
| Ørsta 1816–1831 | 1 | 6 | Gassen 2, Musekongen 3 |
| Ekset og Solnør 1833–1841 | 6 | 8 | Ingen store bossar |
| Bergen 1841 | 8 | 10 | Stiftskrivaren 9, Debitoren 10 |
| Reiseåra 1842–1847 | 10 | 27 | Djurra i Trollgjølet 10, Plakaten imod Banden 11, Nøkken 12, Takstprotokollen i isen 12, Brannvaka 14, Tingbokvesenet 15, Samlaren 17, Røysvorden 17, Tarjei 19, Blestervetten 19, Blekkpresten 20, Ormen på isen 21, Aslaug mot Vinje 22, Falkonerdraugen 22, Stilebokblekket 24, Jøtulen i Jøtulberget 24, Frostvette 25, Draugen over Folla 26, Griffenfeld 27, Hellervorden 27, Steinspranget 27 |
| Christiania 1847–1850 | 28 | 34 | Den trykte huldra 28 til 32, Settardjevelen 29 til 33, Nøkken i vasen 31, Svedjeelden 32, Suffløren 30 til 34, Trollet i døra 33 |
| Fimbulvinteren 1850–1853 | 34 | 44 | Ravnen i margen 34, Fossegrimen i isen 34, Botten-Hansen 35, Fanen 36, Knudsens kapittel 36, Kvitørna over Lovund 37, Lofoten 37 til 38, Uvêret over Revet 38, personlege oppdrag 38 til 43, Rimsuffløren 39, Breframstøyten 40, Førsteordenspunktet på Hårteigen 40, Iskappa på Glittertind 41, Kjettingskrivaren 41, Rimvargen 41, Aslaug mot Vinje igjen 42, Frostrøyken 42, Kanslisskrivarane 43, Kaldblesteren 44, Bokstavravnane 44 |
| Sagahallen 1853 | 45 | 47 | Glåm 45, Harald og Olav 46, Tor og Odin 46, Munch 47 |
| Superbossar | 50 | 70 | Kongsormen 53 som den første, Ormen i Lofotveggen 50 med joik, Fåvne og Lindormen 52, Sjøormen og Grotormen 54, Fjelldraken 55, Nidhoggsungen 56, Kansellisten og Den blinde kongen 60, Heildraugen 62, Den første skrivaren 68 til 70 |

Spor i Dagboka som kan takast i fri rekkjefølgje, har eit spenn i staden for eitt tal. Villmarkene har eitt tal kvar, fordi dei følgjer nivået i regionen i epoken (verda/06\_villmarkene.md). I fimbulvinteren følgjer sideoppdraga og regionane nivåkurva i bestiarium\_oversikt.md, med nivået når dei opnar. Det løyser problemet frå Octopath, der alle kapittel 4 var balanserte for nivå 45 og det siste blei for lett (research 6.5). Gummibandet gjer resten: den som tek eit spor seint, får mindre røynsle der.

### Røynsle etter utgang

Grunnsystemet seier at ingen døyr i kamp. Utgangen avgjer røynsla, og den som lyttar, får mest.

| Utgang | Røynsle | Kjelde |
| --- | --- | --- |
| Folkevesen roa: open, og nokon lyttar | 150 prosent | fiendar\_bossar.md |
| Folkevesen med tom Liv | 100 prosent |  |
| Folkevesen roa medan Ravdna joikar | 100 prosent, inga ord | figurar\_a.md |
| Dyr Roleg | 150 prosent | bestiarium\_dyr.md |
| Dyr Mett eller Skremd | 100 prosent | bestiarium\_dyr.md |
| Dyr Slegen | 50 prosent | bestiarium\_dyr.md |
| Menneske gjev opp | 100 prosent |  |
| Menneske flyktar | 50 prosent |  |
| Pressa folk | Ingen | bestiarium\_menneske.md |
| Blekkvesen, sagavesen og fimbulvintervesen | 100 prosent |  |
| Gullfiendar | 3 til 5 gonger vanleg, Marmælet tre gonger ved Set ut att | bestiarium\_oversikt.md |
| Boss | Halve nivået, sjå fiendetabellen |  |

### Vanskegrad

Forteljingsmodus gjev 25 prosent meir røynsle og 25 prosent meir Liv, og før kvar boss i hovudhistoria blir figurar under tilrådd nivå minus to løfta dit. Ein spelar som har hoppa over kampar, møter aldri ein boss han ikkje kan vinne på tala.

Vanleg modus brukar tala i denne fana.

Saga-modus gjev same røynsle, men gummibandet har inga auke for fiendar over figuren, og røynsla fell med 15 prosent per nivå figuren er over. Fiendane har 30 prosent fleire segl, slik grunnsystemet seier, og hint blir tekne bort. Saga-modus skal ikkje kunne løysast med nivå.

## 5 Vekst utanom nivå

### Lydtre-poeng

Lydtreet er Aasens vekst utanom nivå, og det er der den største delen av krafta hans kjem frå. Poenga blir gjevne slik figurar\_a.md seier: 1 for eit nytt ord, 1 for ei ny form, 3 for ei rotform, 2 for eit ord som blir gjeve vidare og 2 når eit gjeve ord kjem att i ny form. Slepp gjev 1. Kvar dagbokside gjev 2 når Dagbokmålet er over 50 prosent. Gullfiendar gjev 6 til 8, og unge Ivar får 25 prosent meir når han er åleine (Einsleg).

Lydtre-poenga er ein eigen valuta, slik ABP er det i FF5 (research 2.2). Røynsla gjev tal, og Lydtre-poenga gjev evner. Dei to kurvene går kvar for seg. Ein spelar som lyttar mykje og slåst lite, kan ha ein sterk Aasen på eit lågt nivå, og det er meininga.

Nodane i Lydtreet kostar om lag 1 882 poeng til saman, og prisen stig med epoken noden opnar seg i, frå 5 poeng for Øyra I til 93 for den sjuande Hugsen-plassen. Ein grundig spelar har om lag 1 509 poeng ved Sagahallen og råd til om lag 80 prosent av treet. Prisane og utrekninga står i ordboka\_system.md del 10, og figurar\_a.md har dei same prisane.

### Sider frå eventyrboka

Frå Asbjørnsen blir med i 6.9 til Aasen gjev frå seg boka i 7.2, kan kvar figur bere éi side frå eventyrboka i ein eigen plass, Side. Når figuren stig eitt nivå med sida på, får han bonusen til sida. Det er magicite og esper-bonusar frå FF6 (research 1.5), der Bahamut gjev 50 prosent meir HP-auke og Odin +2 Speed.

Bonusen kjem frå eit bunde vesen, og vesenet betaler. Kvar bonus tek 1 Vilje frå sida. Har sida 0 Vilje, kjem ingen bonus. Kvar tredje bonus frå same side tek 1 maks Vilje for godt, slik maks Vilje søkk når ei side går tom hos Asbjørnsen. Ved kvar bonus ser spelaren vesenet lyfte seg litt frå sida og leggje seg att, tynnare. Sider som aldri gjekk tom for Vilje, held betre når Munch dreg i dei i 7.9b (fiendar\_bossar.md, Draget). Den som tappar sidene for å bli sterk, betaler i Vor Frelsers kyrkje.

| Side | Vilje | Bonus per nivå | Merknad |
| --- | --- | --- | --- |
| Trolla på Hedalsskogen | 5 | Kraft +1 |  |
| Trollet med tre hovud | 4 | Kraft +2 | Som Bismarck i FF6 |
| Kjetta på Dovre | 4 | Liv +30 prosent av nivåauken | Som Midgardsormr |
| Bukkane Bruse | 6 | Herdsle +1 |  |
| Nøkken frå Ringerike | 5 | Ordkraft +1 |  |
| Kverna på havsens botn | 3 | Røyst +30 prosent av nivåauken | Som Fenrir |
| Askeladden som kappåt med trollet | 6 | Lukke +1 |  |
| Tussen | Ingen | Liv +10 prosent av nivåauken | Kostar ingen Vilje, fordi tussen hugsar |
| Lyngtrollet (S1.19, val A) | 4 | Herdsle +2 |  |
| Seljordsormen | 4 | Liv +50 prosent av nivåauken | Som Bahamut |
| Draugen over Folla (3.21, val A) | 5 | Tole +2 | Huldra mistar 1 prosent maks Liv ved kvar bonus |
| Nøkken i Hafslovatnet (S1.10, om han blei skriven) | 5 | Ordkraft +2 |  |

Huldresidene er låste, slik figurar\_b.md seier. Ingen kan bere ei side og samstundes bruke henne til Påkall i same kamp. Ein figur på nivå 40 som ber Seljordsormen til nivå 50, får om lag 320 Liv ekstra, og ormen har mista 3 maks Vilje.

FF6-fella i research 1.5 er at kvart nivå utan esper er ein tapt bonus. Her er fella mindre, fordi vindauget er kort (om lag nivå 40 til 47 for dei fleste, lenger for dei som tek superbossane) og bonusane er små. Prisen i Vilje gjer i tillegg at det å la vere blir eit val spelaren tek med vilje.

### Styrkjetinga

Varige auke er sjeldne og har kvar si historie, som tabs i Chrono Trigger og frøa i Dragon Quest (research 3 og 5.1). Her er tinga færre og verknaden større. Ingen av dei kan kjøpast. Dei kjem frå folketru og eventyr, og spelaren får dei frå vesen som er roa, i sideoppdrag, frå gullfiendar og frå superbossar. Den vanlege maten (flatbrød, rømmegraut og kaffi) gjev berre Liv og Røyst att, sjå brukstinga under. Verknaden er fast, utan terning, og taka gjeld òg her.

| Ting | Verknad | Tal i spelet | Kvar dei finst |
| --- | --- | --- | --- |
| Vatn frå ei heilag kjelde | Liv +100 | 5 | Olavsbrønnen under Nidarosdomen (S1.40) og fire andre kjelder, éi i kvar landsdel. Alle er tildekte av blekk, is eller stein og må opnast. Folk trudde at vatnet frå slike kjelder lækte |
| Ein drope skaldemjød | Røyst +20 | 5 | Skaldar i fimbulvinteren og Sagahallen (sjeldan), Den blinde kongen og Kongsormen. Mjøden som gjorde den som drakk, til skald |
| Ein slurk frå trollflaska | Kraft +3 | 4 | Troll som er roa og ikkje slegne. Etter Soria Moria slott, der Halvor drikk av flaska og kan løfte sverdet |
| Ei fjør frå Hugin | Ordkraft +3 | 4 | Hugin og Munin (4.29), boka med «kvar» i 7.9, og to ravnar av is i fimbulvinteren. Hugin er tanken |
| Bork frå tuntreet | Herdsle +3 | 4 | Gardvord som er roa, og gardar der partyet ikkje har krenkt tunet. Gardvorden gjev barken sjølv. Den som hoggar, får ingenting |
| Ein stein med hol | Tole +3 | 4 | Etter at Mara er roa, og i fjøs der nokon har hengt han opp. Steinen med hol verna mot mara i folketrua |
| Ein hestesko frå nøkken | Snøggleik +3 | 3 | Ved elvar der nøkken er roa i hesteform. Nøkken som kvit hest er snøggare enn noko anna |
| Ein firkløver plukka jonsoknatta | Lukke +3 | 3 | Berre jonsoknatta, i tre sideoppdrag i ulike år. Firkløver plukka den natta skulle gje lukke |

Kvar ting har ei Ordboka-side med segna han kjem frå, og ei line i Dagboka når han blir brukt. Snøggleik og Lukke er sjeldnast, fordi taket er 50, slik Speed Tabs er dei sjeldnaste i Chrono Trigger. Thonky rår til å gje Speed Tabs til dei tregaste, og spelaren her vil gjere det same med Moe og Aslaug. Til saman gjev tinga om lag det same som tolv små auke av kvart slag ville gjort, så tala i vekstabellane står ved lag.

### Andre vegar til vekst

Fleire figurar har sin eigen vekst utanom nivå, og han står i figurfilene. Knudsen får 1 prosent meir maks Liv for kvar runde han stod i fase 3 i Sagahallen 1852, opp til 10 prosent. Huldra får gamle ord att gjennom Minnevevet. Tussen får nye ord ved at Ivar lærer han ord i fjøset. Jotunen får nye ordkort gjennom Tillit og gåver. Vinje får Ekte, og Landstad får eit tak på Tvil etter 7.4. Ingen av desse er tal i tabellane over, og dei gjer figurane ulike på andre måtar enn med eigenskapar.

## 6 Utstyr

### Plassane

Kvar figur har fem plassar, etter FF6 (research 1.7 og 7.1):

| Plass | Kva han gjev |
| --- | --- |
| Reiskap | Slag (våpen) eller Ord (penn, bok, fele, horn, vifte). Éin reiskap om gongen |
| Klede | Vern, som blir lagt til Herdsle. Somme klede gjev òg Tole |
| Hovud | Tole, som blir lagt til Tole frå eigenskapen. Somme hovudplagg gjev litt Vern |
| Lomme 1 og Lomme 2 | Tilbehøyr med ein eigen regel, som relikviane i FF6 |

Lommene heiter vestlomme og frakkelomme i menyen hos menn og lomme og pung hos kvinner. Manuset kallar tinga der tilbehøyr. Dei fire første plassane følgjer ei rein oppgraderingskurve gjennom butikkane. Lommene er der byggjevala ligg, og dei beste tinga der blir ikkje selde. Det er same deling som FF6 har mellom våpen og rustning på den eine sida og relikviar på den andre (research 7.2 og 7.4).

I tillegg har kvar figur plassen Side medan eventyrboka finst (6.9 til 7.2). Sjå kapittel 5.

### Kven kan bere kva

| Figur | Reiskap | Klede og hovud | Lomme |
| --- | --- | --- | --- |
| Unge Ivar | Kjepp eller griffel | Barneklede og lue | Éi lomme |
| Aasen | Stokk eller penn | Alt for menn | To |
| Tussen | Ingenting | Ingenting | Ingen. Tussen et det han får, slik figurar\_a.md seier |
| Huldra | Horn og lurar, aldri noko skrive | Kjolar og skaut, aldri noko skrive | To, aldri noko skrive |
| Vinje | Stokk eller avisblad | Alt for menn | To |
| Landstad | Salmebok eller stav | Alt for menn, prestekjole | To |
| Aslaug | Handarbeid som bandgrind, aldri noko skrive | Kjolar og skaut | To, aldri noko skrive |
| Ravdna | Lasso | Kofte og vinterklede, skaut | To |
| Collett | Vifte eller penn | Kjolar og skaut | To |
| Knudsen | Penn, raudblyant eller linjal | Alt for menn | To |
| Asbjørnsen | Hammar eller notisbok | Alt for menn | To, og han ber eventyrboka |
| Moe | Bok eller stokk | Alt for menn | To |
| Ole Bull | Fele | Alt for menn | To |
| Berte | Stav | Kjolar og skaut | To. Rustninga ligg i ein eigen meny og blir lånt ut til dei andre |
| Jotunen | Stein eller åre, berre gåver | Ingenting | To, berre gåver |

Jotunen ber berre gåver, ting som er gjevne og aldri skrivne, slik figurar\_b.md seier. I tabellane er dei merkte «gåve». Kvar gåve opnar eit nytt ordkort, og Draugens åre opnar Haf. Huldra og Aslaug ber aldri noko skrive. Bøker og brev kan ikkje leggjast på dei, og menyen viser ei hand som trekkjer seg unna.

Sidegraderingar er brukte der det passar, etter Game Wisdom: «the choices should be big enough that there is a viable difference between item A and item B» (research 7.2). Aasen vel mellom Askestokken, som slår frå bakrada, og ein penn som styrkjer orda. Knudsen vel mellom Raudblyanten, som ladar raskare, og Messinglinjalen, som vernar. Fjørpennen frå Griffenfeld vernar mot blekk og gjer Aasen tyngre, og Stålpenn gjev Lydtre-poeng og gjer Trykk vanskelegare.

### Prisar langs kurva

Prisen på det beste reiskapet i ein butikk er om lag 1,5 × nivå × nivå + 10 skilling, der nivå er tilrådd nivå for staden. Klede kostar fire femdelar av det, hovudplagg halvparten, og tilbehøyr i butikk halvannan gong. Det gjev om lag 1 spd 40 s på nivå 10, 5 spd på nivå 20, 11 spd på nivå 30 og 25 spd på nivå 45. Research 7.4 viser prinsippet frå FF6: det beste våpenet i ein ny by kostar om lag det spelaren har tent sidan førre by. Spelaren som ikkje grindar, får råd til det viktigaste.

Salsprisen er halvparten av kjøpsprisen, som i FF6. Ting merkte «Ikkje til sals» kan ikkje seljast.

### Reiskap

| Gjenstand | Kven | Verdi | Særeige | Pris | Stad og tid |
| --- | --- | --- | --- | --- | --- |
| Hasselkjepp | Unge Ivar | Slag 7 | Ingen | 4 s | Ørsta 1820, kremmaren |
| Griffel | Unge Ivar | Ord 3 | Ingen | 3 s | Omgangsskulen 1831 (1.8) |
| Griffeltavla med kuhovud | Aasen | Ord 4 | Ord frå Hugsen gjer 10 prosent meir | Ikkje til sals | Solnør 1835 (1.11) |
| Gåsefjørpenn | Aasen, Knudsen | Ord 5 | Trykk-vindauget er litt breiare | 1 spd 40 s | Bergen 1841, bokhandelen der Torget møter Vågen |
| Askestokk | Aasen, Vinje, Moe | Slag 13 | Slag frå bakrada gjer full skade | 1 spd 110 s | Sogn 1842, handelsmannen i Lærdal |
| Lur av never | Huldra | Ord 7 | Lokk kostar halv Røyst | Ikkje til sals | Voss 1844, gjeven av ei budeie |
| Kingos salmebok | Landstad | Ord 8 | Salmesong lækjer 10 prosent meir | 5 spd 10 s | Seljord 1845, klokkaren |
| Fjørpennen frå Griffenfeld | Aasen | Ord 12 | Blekkåtak mot beraren gjer 30 prosent mindre. Snøggleik −3, «Den blir tung» | Ikkje til sals | Munkholmen 1846 (S1.39, om samtalen blir vald) |
| Stålpenn | Aasen, Knudsen | Ord 11 | Skriv etter kamp gjev 1 Lydtre-poeng ekstra. Trykk-vindauget er smalare | 11 spd 40 s | Christiania 1848, papirhandelen i Kirkegata |
| Bukkehorn | Huldra | Ord 12 | Første Gamle ord i kampen tek 1 Ande gratis | 14 spd 60 s | Gudbrandsdalen, fimbulvinteren 1851, skysskaren i Ringebu |
| Drammens Tiidende | Vinje | Ord 13 | Kvikk-liner gjer 10 prosent meir | 16 spd 30 s | Christiania 1851 |
| Vifte med perlemor | Collett | Ord 13 | Markøren i Blikket går 20 prosent seinare | 15 spd 50 s | Christiania 1851 |
| Lasso av lærreim | Ravdna | Slag 28 | Kast seinkar i 2 rundar | 17 spd 20 s | Lofoten 1851, notbuda på Værøy |
| Raudblyant | Knudsen | Ord 13 | Kvar tredje Ret fyller eitt felt ekstra | 18 spd 20 s | Christiania 1852 |
| Messinglinjal | Knudsen | Slag 29 | Herdsle +6 | 18 spd 20 s | Christiania 1852 |
| Hardingfele frå Valdres | Ole Bull | Ord 14 | Slått frå Valdres verkar 20 prosent meir | 19 spd 10 s | Bergen 1852, felemakaren |
| Geologhammar | Asbjørnsen | Slag 30 | Granske kostar 0 Røyst | 20 spd 10 s | Christiania 1852, jernvarehandelen i Kongens gate |
| Notisboka | Asbjørnsen | Ord 14 | Påkall kostar 10 prosent mindre Røyst | 20 spd 10 s | Christiania 1852 |
| Preikeboka | Moe | Ord 14 | Fortel fritt kostar 6 Røyst i staden for 7 | 20 spd 10 s | Christiania 1852, Vor Frelsers kyrkje |
| Bandgrind | Aslaug | Ord 14 | Første Bie i kampen gjev 2 krokar | 21 spd 10 s | Rauland 1852 |
| Kampestein frå Hjerkinn | Jotunen | Slag 31 | Gåve frå fjellet. Steinn treffer òg ein annan fiende, vald tilfeldig, med halv skade | Ikkje til sals | Hjerkinn 1852 (6.13) |
| Legdsstaven | Landstad | Ord 15 | Lækjing på ein figur under ein fjerdedel Liv gjer 50 prosent meir | Ikkje til sals | Voss, fimbulvinteren (S2.24) |
| Settarens vinkelhake | Vinje | Slag 32 | Snøggleik +4. Slag gjer dobbel skade mot blekkvesen | Ikkje til sals | Christiania, fimbulvinteren (S2.19) |
| Ørnefjør | Aasen | Ord 16 | Lytt høyrer ord med 10 prosent større sjanse | Ikkje til sals | Værøy 1851, Havørna (bestiariet) |
| Gasparo da Salò-fela | Ole Bull | Ord 17 | Alle slåttar verkar 15 prosent meir. Eit kritisk treff på Bull tek to strengar | 80 spd | Auksjonen i Bergen, fimbulvinteren |
| Grimsfela | Ole Bull | Ord 19 | Dobbelgrep gjer dobbel skade. Fossegrimslåtten er låst | Ikkje til sals | S2.8, val B |
| Welhavens sølvpenn | Collett | Ord 19 | Stevmålaren startar eitt steg på hennar side | Ikkje til sals | Welhavens salong (S2.32) |
| Kansellistens penn | Knudsen | Ord 20 | Kvar Ret fyller to felt | Ikkje til sals | Akershus (S2.30) |
| Draugens åre | Jotunen | Slag 43 | Opnar kortet Haf | Ikkje til sals | Folla (S2.33) |

### Klede og hovud

«Alle» tyder alle som har plassen. Tussen og jotunen ber ikkje klede eller hovudplagg.

| Gjenstand | Plass | Kven | Verdi | Særeige | Pris | Stad og tid |
| --- | --- | --- | --- | --- | --- | --- |
| Vadmålstrøye | Klede | Alle | Vern 4 | Ingen | 16 s | Ørsta 1816 |
| Kufte med messingknappar | Klede | Alle menn | Vern 9 | Ingen | 1 spd 10 s | Ekset 1833 |
| Bergensfrakk | Klede | Alle menn | Vern 11 | Ingen | 2 spd | Bergen 1841 |
| Reisekappe av vadmål | Klede | Alle | Vern 15 | Ingen | 4 spd 10 s | Sogn 1842 |
| Prestekjole | Klede | Landstad | Vern 16, Tole +8 | Embete tek 30 prosent mindre skade i staden for 20 | 4 spd 110 s | Seljord 1845 |
| Skinnkufte | Klede | Alle | Vern 19 | Fimbul varer 1 runde kortare | 6 spd 100 s | Hallingdal 1845 |
| Studentfrakk | Klede | Alle menn | Vern 21 | Ingen | 9 spd 10 s | Christiania 1848 |
| Silkekjole | Klede | Collett | Vern 24, Tole +10 | I stillinga Anonym tek ho 10 prosent mindre skade | 12 spd 40 s | Christiania 1851 |
| Kofte | Klede | Ravdna | Vern 25, Tole +8 | Ingen | 13 spd 90 s | Lofoten 1851 |
| Asbjørnsens frakk | Klede | Asbjørnsen, Aasen | Vern 26, Tole +6 | Hos Asbjørnsen: første påkallinga i kampen kostar ingen Vilje | Ikkje til sals | Trappa ved Universitetet (5.24), henta i eit lite sideoppdrag |
| Den lånte frakken | Klede | Vinje | Vern 27 | Stev gjer 15 prosent meir | Ikkje til sals | S2.1 |
| Vargskinnspels | Klede | Alle | Vern 29 | Fimbul går halvt så fort | 18 spd 70 s | Trondheim, fimbulvinteren, skreddaren |
| Karolinarkappa | Klede | Alle | Vern 29 | Kan ikkje bli Fimbul | Ikkje til sals | Fredriksten (S2.26) |
| Lindormskinnet | Klede | Alle | Vern 34 | Vern mot Bunden | Ikkje til sals | Mjøsa (S2.29) |
| Topplue | Hovud | Alle | Tole 3 | Ingen | 6 s | Ørsta 1816 |
| Skinnlue | Hovud | Alle utanom huldra | Tole 8 | Vern +3 | 1 spd 80 s | Sogn 1842 |
| Skaut | Hovud | Huldra, Aslaug, Collett, Ravdna | Tole 12 | Skam startar på trinn 1 og kan ikkje hoppe over eit trinn | 3 spd 80 s | Voss 1844 |
| Flosshatt | Hovud | Alle menn | Tole 14 | Lukke +3 | 5 spd 80 s | Christiania 1847 |
| Pelslue av oter | Hovud | Alle | Tole 19 | Fimbul varer 1 runde kortare | 11 spd 10 s | Trondheim, fimbulvinteren |

### Lomme

Tussen har ingen lommer. Jotunen kan berre bere ting merkte «gåve».

| Tilbehøyr | Kven | Verknad | Pris | Stad og tid |
| --- | --- | --- | --- | --- |
| Halmknuten | Alle, gåve | J-ord og anna lækjing frå beraren gjer 15 prosent meir | Ikkje til sals | Fjøset på Åsen, 1.9 |
| Julelyset | Alle | Éin gong per kamp verneskikken Lys utan å bruke ein gjenstand. Mørkeredsle varer 1 runde kortare | Ikkje til sals | Julekvelden 1820, 1.3 |
| Brent margnotat | Alle | Halv sjanse for Skam frå fiendeevner | Ikkje til sals | Ekset, S1.15 |
| Gyda-pinnen | Aasen | Runer frå Rist varer 1 runde lenger, og heim i alle former gjer 25 prosent meir. Runepinnar Aasen finn seinare, legg seg i skinnpungen saman med henne, og kvar gjev 2 prosent meir skade mot sagavesen, opp til 20 prosent | Kan ikkje seljast eller missast | Under Bryggen, 2.9 |
| Svidd saga | Aasen | Forstokka varer 1 runde kortare | Ikkje til sals | 2.10, val A |
| Munchs avskrift | Aasen | Nøkkelorda gjer 25 prosent meir. Løynt: avskrifta melder kvar Aasen er | Ikkje til sals | 3.5 |
| Hallagers Norsk Ordsamling | Aasen | 10 prosent større sjanse til å høyre gamle ord ved Lytt | Ikkje til sals | Christiania 1845, 3.10 |
| Døypefontbit | Alle | Blekkåtak gjer 30 prosent mindre i kyrkjerom | Ikkje til sals | S1.14, val A |
| Pilegrimsmerke i bly | Alle | Beraren tek 15 prosent mindre skade i kyrkjer og på pilegrimsvegen | Ikkje til sals | S1.40 |
| Hornkniven | Alle, gåve | Éin gong per kamp verneskikken Stål utan å bruke ein gjenstand | Ikkje til sals | S1.44, val B |
| Beinstykket | Huldra | Vern mot Bunden | Ikkje til sals | Helgeland, 3.22 |
| Forkynnarens psalmebok | Alle som kan bere skrift | Vern mot Forvirra | Ikkje til sals | Lofoten, 5.18 |
| Moes skjerf | Moe eller Knudsen | Hos Moe: mistar ikkje staden i eventyret første gongen han blir treft hardt i ein kamp. Hos Knudsen: Tole +6 | Ikkje til sals | Universitetstrappa 5.24, attende i 6.8 |
| Gros halmfletting | Alle, gåve | Vern mot Taus | Ikkje til sals | S2.2 |
| Heftet til broren | Alle som kan bere skrift | Skam kan ikkje gå over trinn 1 for nokon i partyet | Ikkje til sals | S2.4, val B |
| Knudsens margnotat | Knudsen | 10 prosent sjanse for at Rettskriven slår tilbake på fienden | Ikkje til sals | S2.16 |
| Bispebrevet | Alle som kan bere skrift | Vern mot Skam og mot evner som brukar smiger | Ikkje til sals | S2.18 |
| Unionsløva | Alle | Vern mot svenske formular og Rättstavad | Ikkje til sals | S2.20 |
| Løftet | Ole Bull | Styrkjande slåttar gjer 25 prosent meir så lenge ingen har falle, og Storplanen verkar dobbelt | Ikkje til sals | S2.21 |
| Telemarksvidjene | Alle, gåve | Partyet får første tur i alle kampar i snø | Ikkje til sals | Morgedal, S2.25 |
| Kurerens kappe | Alle | Målaren startar full ved kampstart | Ikkje til sals | Hjerkinn, S2.27 |
| Steinen frå Steilneset | Alle, gåve | Ingen tal. «Du veit kvifor du ber han.» | Ikkje til sals | Vardø, S2.28 |
| Gullskjelet | Alle, gåve | Beraren kan halde opptil 6 Ande | Ikkje til sals | Fåvne, S2.29 |
| Grotsteinen | Alle, gåve | Stevmålaren startar eitt steg på partyets side | Ikkje til sals | Grotormen, S2.29 |
| Urnesranken | Alle, gåve | Beraren kan lytte utan å ta imot Skam frå fiendar | Ikkje til sals | Nidhoggsungen, S2.29 |
| Salmeboka frå Fyn | Alle som kan bere skrift | Vern mot Takt og mot evner som tvingar fram fast rekkjefølgje | Ikkje til sals | S2.40 |
| Seks tær | Alle, gåve | Fiendeevner kan ikkje flytte beraren ut av rada | Ikkje til sals | Lundehunden på Værøy, bestiarium\_dyr.md |
| Fellehorn | Alle, gåve | 1 Ande ekstra ved kampstart | Ikkje til sals | Elgen i Trøndelag, bestiarium\_dyr.md |
| Fugledåre | Alle | Vern mot Dåra | 6 s | Vestlandet, våren 1852, bestiarium\_dyr.md |
| Gode sko | Alle utanom jotunen | Dobbel gangfart i felt | 3 spd | Bergen 1841 |
| Lesebriller | Alle utanom huldra og jotunen | Kv-ord avslører éi sårbarheit ekstra | 18 spd | Christiania 1849 |
| Lommeur | Alle utanom jotunen | Snøggleik +5 | 30 spd | Urmakaren i Christiania, 1849 |

Dei tre siste er butikkting i FF6-stil, der det som endrar korleis ein spelar, kostar meir enn våpen frå same stad og blir eit sparemål (Sprint Shoes og Earrings i research 1.7). Lommeuret er ei sjeldan sak i 1849, og prisen viser det.

Kurerens kappe og Gullskjelet er dei to tinga som endrar rytmen mest. Den første gjev første handling i kvar kamp, den andre gjer at ein figur kan spare til to store handlingar. Fellehorn og Gullskjelet saman på same figur gjev ein ny måte å spele på, slik Genji Glove og Offering gjer det i FF6.

### Andre ting frå manuset

Desse tinga ligg i veska. Dei har ein verknad i kamp eller på systemet.

| Ting | Kva det gjer | Stad |
| --- | --- | --- |
| Lampa frå Munch | Står fast i hybelen. Rotformer laga ved henne gjer dobbel kraft resten av delen | 4.1 |
| Eventyrboka | Asbjørnsen ber henne. Gjev Påkall og plassen Side | 6.9 til 7.2 |
| Stipendbrevet | Gjev pengar kvar gong eit nytt kapittel i Dagboka blir opna | 5.11 |
| Tørrfisken frå Synnøve | Lækjer fullt i kamp, éin gong | S1.8 |
| Korga med kirsebær | Full lækjing for heile partyet, fem gonger | S1.18 |
| Klippfisken frå Oline | Mat som aldri går ut på dato. Mettar dyr med Driv Svolt og vernar mot Dåra | S1.41 |
| Rimkvist | Lita lækjing som aldri blir brukt opp, éin gong per kamp | 2.21 |
| Olavsbrødet | Lækjer heile partyet fullt og kan brukast att etter kvar kvile | S2.31 |
| Tarjeis stev | Ferdig svarvers i éin stevduell | S1.22 |
| Brudeblom | Løftar Skam frå éin | S1.16, val B |
| Skåla til tussen | Tussen startar kvar kamp med 1 Mett ekstra | 6.10 |
| Prøver af Landsmaalet | Opnar Prøvelesing | 7.1 |
| Visebok frå 1840 | Kan ikkje utstyrast. Huldra mistar litt livskraft kvar natt boka ligg i veska | 1.24, val A |
| Norske Huldre-Eventyr og Folkesagn | Kan ikkje utstyrast eller kastast | 3.8 |
| Grimm-boka | Kan ikkje utstyrast. Opnar sida «Same eventyret, mange mål» i Ordboka | 6.9 |
| Knudsens skilling | Kan ikkje brukast eller seljast. Teksten seier «Fyrretyve Aar» | 7.28 |

Feltting utan tal i kamp står i manuset og blir ikkje rørte her: tingboka og brevet frå Christie, huldras hårlokk, Tandberg-kartet, Welhavens nøkkel, Munchs segl, Seljord-lista, Unionsmerket, Emigrantkista, Tavlekritt, Posthorn, Karis svar, Avisutklippet, skillingsvisa og Dølen.

### Løn frå villmarkene

Desse tinga er løn etter bossane i villmarkene (fiendar\_bossar.md, Bossar i villmarkene, og verda/06\_villmarkene.md). Ingen av dei er til sals.

| Ting | Plass | Kven | Verknad | Stad |
| --- | --- | --- | --- | --- |
| Røykjelse | Veska | Alle | Vernegjenstand for verneskikken eld og lys (bestiarium\_fabeldyr.md). Brukt med Ting eller Brenn mot Molaup-ormen stillar ho sjøen i 2 rundar | Djurra i Trollgjølet, V1, 1842. Ligg i krambua i Ørstavika i 1851 om partyet ikkje har henne |
| Falkehetta | Lomme | Vinje | Kampar på vidda startar i Førsteslag | Falkonerdraugen, V6, 1845 |
| Den glatte steinen | Lomme | Alle, gåve | Det første kastet frå ein jotun eller eit troll mot beraren i kvar kamp gjer ingen skade | Jøtulen i Jøtulberget, V7, 1845 |
| Jarnbiten frå Hovden | Lomme | Alle, gåve | Den første Fimbul beraren får i kvar kamp, blir stogga. Mot Kaldblesteren gjev den første varmeverknaden frå beraren Tint sjølv om belgen går | Blestervetten, V5, 1844 |
| Duputa | Veska | Alle | Løftar Fimbul frå heile partyet éin gong per kamp og blir ikkje brukt opp | Dunkona på Vega etter Hellervorden, V9, 1846 |
| Steinen frå toppen av Romsdalshornet | Lomme | Alle, gåve | Steg-teljingar på beraren, som Borte og Freista, startar eitt steg høgare | Steinspranget, V10, 1847 |
| Fløtarhaken | Reiskap | Aasen, Vinje | Slag 25. Slag mot ting-mål gjer dobbel skade | Fløtarane etter Nøkken i vasen, V11, 1849 |
| Neveren med merket | Lomme | Alle, gåve | Eldåtak gjer 30 prosent mindre på beraren. Han får inga side i Ordboka | Den vise kona etter Svedjeelden, V12, 1849 |

### Brukstinga i butikk

Maten er det spelet brukar i staden for Potion og Ether i FF6: flatbrød og rømmegraut gjev Liv att, og kaffi gjev Røyst att. Han har faste prisar gjennom heile spelet. Prosentane kan justerast til prototypen.

| Ting | Pris | Verknad |
| --- | --- | --- |
| Flatbrød | 2 s | Lækjer 25 prosent Liv på éin. Mettar òg dyr med Driv Svolt |
| Rømmegraut | 8 s | Lækjer 60 prosent Liv på éin |
| Kaffi | 10 s | Gjev att 25 prosent Røyst på éin |
| Graut | 3 s | Den enkle grauten tussen får i fjøset. 3 Mett til tussen og litt lækjing |
| Smør | 4 s | Neste handling til tussen verkar dobbelt |
| Hoffmannsdropar | 10 s | Løftar Ridd, Klumsa og Dåra på éin |
| Honningvatn | 6 s | Løftar Taus på éin |
| Kritt | 1 s | Verneskikk: kross og ring |
| Salt | 2 s | Verneskikk |
| Lys | 2 s | Verneskikk |
| Einer | 2 s | Røyk mot svermar |
| Tjøre | 3 s | Verneskikk: kross |
| Øl | 3 s | Gåve til vesen |
| Lusekam | 4 s | Tek eitt segl frå lusa utan å skade beraren |
| Stål | 12 s | Verneskikk. Ein kniv eller eit ljåblad |
| Juksa med jernkjetting | 24 s | Opnar Kast mot håkjerringa. Berre i krambua til Heggelund i Nord-Troms |

## 7 Pengar

### Speciedalar og skilling

Pengane i spelet er speciedalar og skilling. I myntsystemet frå 1816 gjekk det 120 skilling på ein speciedalar (snl.no, «skilling»). Mellomleddet ort, som var 24 skilling, blir ikkje brukt i menyane, fordi det gjer rekninga tyngre for spelaren. Menyen skriv «spd» og «s», til dømes 2 spd 40 s. I 1875 blei speciedalaren bytt ut med fire kroner, men då er spelet over.

120 kan delast på 2, 3, 4, 5, 6, 8, 10 og 12, så pruting hos høkarkona i Vika går opp i heile skilling.

### Kvar pengane kjem frå

Fiendar gjev nesten ingenting. Menneske som gjev opp, kan miste ein skilling eller to, og handelsmenn og pengelånarar kan ha ein pung med 6 til 12 skilling som fell når dei er opne. Dyr og vesen av alle slag gjev ingen pengar. Ingen i spelet tener pengar på å slåst, og spelaren skal merke at Aasen lever av orda.

Pengane kjem frå desse kjeldene:

| Kjelde | Kva spelaren får | Når |
| --- | --- | --- |
| Reiseposen | Ei rate av stipendet kvar gong eit nytt kapittel i Dagboka opnar seg. Om lag tre firedelar går til skyss og kost og blir førte i Reiseberetninga. Resten går i pungen | Frå 2.1, 1842 |
| Stipendbrevet | Same ordninga med stipendet frå Stortinget, som er dobbelt så stort | Frå 5.11, 1851 |
| Honorar frå Videnskabsselskabet | 6 skilling per skrive ord i ordlistene Aasen sender frå ein stad med post. Hugsa ord kan ikkje sendast | Frå 1842 |
| Skrivearbeid | 1 til 4 spd per oppdrag i Dagboka: brev for folk som ikkje kan skrive, avskrifter, korrektur | Heile spelet |
| Sal | Ting frå dyr (ull, fjør, egg), skinn som bønder gjev som takk når partyet har roa eit dyr som plaga bygda, og overflødig utstyr til halv pris | Heile spelet |
| Skillingsviser | 12 skilling for visene på marknaden, om spelaren vel det (1.10, val A) | Ekset 1833 |

Honoraret er ein del av temaet. Skrivne ord gjev pengar og tryggleik, og hugsa ord gjev kraft og risiko. Spelaren som skriv mykje, har råd til betre frakkar, og han ser kva det kostar huldra og Aslaug.

### Pengar per del

| Del | Pengar spelaren styrer (om lag) | Viktigaste kjelder | Beste reiskap i butikk |
| --- | --- | --- | --- |
| Ørsta 1816–1831 | 40 s | Småtenester på gardane, mor | 3 til 12 s |
| Ekset og Solnør 1833–1841 | 8 spd | Visene, løn som huslærar på Solnør | 20 s til 1 spd |
| Bergen 1841 | 4 spd | Skrivearbeid, resten av lønna | 1 til 2 spd |
| Reiseåra 1842–1847 | 250 spd | Stipendet frå Videnskabsselskabet, honorar, sal | 2 til 9 spd |
| Christiania 1847–1850 | 170 spd | Stipendet, skrivearbeid i byen | 9 til 16 spd |
| Fimbulvinteren 1850–1853 | 380 spd | Stipendbrevet, skrivearbeid, honorar, sal | 16 til 25 spd |

Pengane rekk til det beste reiskapet og eitt klesplagg for dei fire aktive i kvar ny del, og til nokre tilbehøyr. Dei rekk ikkje til å utstyre heile reserven. I fimbulvinteren, med tolv figurar, må spelaren velje kven som får det nye, slik ein vel i World of Ruin i FF6. Seint i spelet finst det pengesluk for den som har spart: auksjonen i Bergen (Gasparo da Salò-fela til 80 spd og sjeldne lommeting) og antikvariatet til Botten-Hansen. Auksjonen i Jidoor i FF6 er mønsteret (research 1.8).

Kvile på gjestgiveri kostar 8 skilling per figur. Stover og kvileplassar som partyet har fått gjennom oppdrag, er gratis.

### Historiske prisar

Prisane i butikkane er spelprisar og følgjer kurva. Tabellen under gjev omtrentlege historiske tal til samanlikning.

| Ting | Pris (omtrentleg) | Kjelde |
| --- | --- | --- |
| Dagløn for ein slåttekar | 16 skilling, ei taus 12 skilling | Tydal 1822, tydalsboka.no |
| Ei tønne bygg | om lag 4 spd | Tydal, 1850-åra |
| Ei tønne rug | litt over 5 spd | Tydal, 1850-åra |
| Årsløn for ein stigar ved gruvene | 120 spd | Tydal |
| Stipendet til Aasen frå Videnskabsselskabet | 150 spd i året frå 1842 | nynorsk.no |
| Statsstipendet til Aasen | 300 spd i året frå 1851, 400 frå 1857 | nynorsk.no |
| Eit hefte av Norske Folkeeventyr | 12 skilling | manuset, 1.24 og S2 |

Stipendet frå Videnskabsselskabet var meir enn årsløna til ein stigar ved gruvene, og ein slåttekar måtte arbeide nesten 1 100 dagar for det same. Spelet trekkjer frå tre firedelar til reise, og då står Aasen att med om lag det ein arbeidskar tente. Det er ein god samtale i ein samfunnsfagtime.

## 8 Balansering

### Tal som no er stadfesta

| Tal | Står i | Resultat i denne fana |
| --- | --- | --- |
| Om lag 64 Liv per nivå | fiendar\_bossar.md | 64 per nivå med Liv-faktor 1,0. Snittet i partyet er 0,98 |
| Vanleg treff om lag 15 prosent av Liv til den som slår | fiendar\_bossar.md | 15,2 prosent på nivå 45 og 15,5 på nivå 55. Mellom 14 og 16 prosent frå nivå 20 |
| Nivå 45 inn i Sagahallen, 45 til 47 der | fiendar\_bossar.md | 162 140 røynsle samla på nivå 45, om lag 245 kampar på nivå frå start |
| Nivåtak 70 | superbossar.md | Gjeld figurane. Røynslekurva og figurtabellane sluttar på 70. Fiendetabellen går til 99 |
| Om lag 3 500 Liv på nivå 55 | superbossar.md | 3 550 for ein typisk figur |
| Om lag 400 Røyst på nivå 55 | superbossar.md | 398 for ein typisk figur |
| 2 500 til 3 000 skade for eit godt åtak med 3 Ande | superbossar.md | 2 768 med eit hugsa ord, 3 087 med ei Kvikk-line |
| 60 til 90 Røyst midt i spelet | figurar\_b.md | 70 på nivå 20, 80 på nivå 22 og 98 på nivå 25 |
| Kvar Ande gjev eitt treff til | grunnsystem.md | Same regel i formlane |
| Reserven får 75 prosent | grunnsystem.md | Same, og slegne ut får det same |
| Gjestar får inga røynsle og kan ikkje utstyrast | figurar\_b.md | Same |
| Moe mistar staden ved treff over 15 prosent av Liv | figurar\_b.md | Vanleg fiendeslag på nivå 45 er 14,6 prosent. Kritiske treff og bosslag går over |
| Figurar som kjem att, får nivået til Aasen minus to | figurar\_b.md | Same, og nye figurar får snittet etter FF6 |

### Bossane mot formlane

Tabellen viser kor mange vanlege treff kvar boss toler på tilrådd nivå, og eit overslag over rundar. Overslaget reknar med at kvar figur i snitt gjer halvannan gong eit vanleg treff per runde med Ande, og 30 prosent ekstra frå tida fienden er open.

| Boss | Nivå | Figurar | Liv | Vanleg treff | Treff i alt | Rundar (om lag) |
| --- | --- | --- | --- | --- | --- | --- |
| Plakaten imod Banden | 11 | 2 | 1 400 | 97 | 14 | 4 |
| Brannvaka | 14 | 2 | 3 200 | 123 | 26 | 7 |
| Blekkpresten | 20 | 3 | 5 600 | 183 | 31 | 5 |
| Draugen over Folla | 26 | 3 | 10 000 | 246 | 41 | 7 |
| Settardjevelen | 31 | 4 | 9 000 | 298 | 30 | 4 |
| Suffløren | 32 | 3 | 10 000 | 305 | 33 | 6 |
| Fristaren på Årflot | 34 | 2 | 6 000 | 328 | 18 | 5 |
| Fanen | 36 | 4 | 11 000 | 350 | 31 | 4 |
| Fristaren i tårnet | 36 | 4 | 12 000 | 350 | 34 | 5 |
| Rimsuffløren | 39 | 4 | 15 000 | 377 | 40 | 5 |
| Kjettingskrivaren | 41 | 4 | 9 000 | 403 | 22 | 3 |
| Glåm (fase 1) | 45 | 3 | 14 000 | 443 | 32 | 5 |
| Fristaren i messa | 46 | 1 og 2 gjestar | 14 000 | 454 | 31 | 6 |
| Munch (fase 1 og 2) | 47 | 4 | 42 000 | 464 | 91 | 12 |
| Fåvne | 52 | 4 | 38 000 | 517 | 73 | 9 |
| Fjelldraken | 55 | 4 | 40 000 | 551 | 73 | 9 |
| Heildraugen (seks fasar) | 62 | 4 | 84 000 | 626 | 134 | 17 |

Dei fleste bossane i hovudhistoria tek 4 til 7 rundar, og Munch tek om lag 12 over to fasar. Det passar med at ein vanleg boss skal lære bort éin ting, og at sluttbossen skal vere lang. Superbossane tek 9 til 17 rundar, innanfor 12 til 25 minutt som superbossar.md set. Talet på segl og dei spesielle reglane gjer kampane lengre enn tabellen viser, men Liv er ikkje flaskehalsen nokon stad.

### Skalering i Sagahallen

Sagahallen speglar den som går inn. Når snittnivået i partyet er over 47, får Glåm, Harald Hårfagre og Olav den heilage, Tor og Odin og Munch 4 prosent meir Liv og Åtak for kvart nivå over 47, opp til 60 prosent på nivå 62. Forsvaret deira følgjer same nivå (3 × nivå). Segla, fasane og reglane er dei same, så ein spelar på nivå 45 møter kampane slik dei er skrivne, og ein spelar som har teke superbossane, får ein sluttkamp som held. I forteljinga er det sagakrafta som måler den som kjem: Munch har bygd hallen til å vekse mot motstanden. Vanlege fiendar i hallen skalerer ikkje, og røynsla frå bossane er fast, så skaleringa gjev ingen grunn til å grinde.

### Bør justerast

| Fane | Kva | Forslag |
| --- | --- | --- |
| superbossar.md og fiendar\_bossar.md | Superbossane er tilrådde for nivå 50 til 70, men stengjer når partyet går inn i Sagahallen (45 til 47). Den som tek dei, går inn i Sagahallen 10 til 20 nivå for høgt, og Glåm, kongane, gudane og Munch blir for lette | Avgjort: bossane i Sagahallen skalerer med nivået til partyet, sjå Skalering i Sagahallen over |
| grunnsystem.md, figurar\_a.md, figurar\_b.md | Røyst-kostnadene er sette for midt i spelet. Utan skalering kan ein figur på nivå 55 bruke ei evne nesten 40 gonger på full Røyst | Skriv inn Røyst-skalaen: over nivå 25 blir faste Røyst-tal gonga med nivå / 25. Det gjeld òg Trykk (2 Røyst att) og By (5 Røyst per steg) |
| figurar\_a.md | Nodane i Lydtreet kostar om lag 90 poeng til saman utan grammatikknodane, medan kvart nytt ord og kvar ny form gjev 1 poeng | Avgjort: prisane er rekna om i ordboka\_system.md del 10, om lag 1 882 poeng til saman mot 1 509 poeng ved Sagahallen, og figurar\_a.md har dei same prisane |
| figurar\_a.md | Nedskriven (3.8) gjev «maks kraft ein fjerdedel lågare» utan tal | Skriv at Ordkraft og maks Røyst blir gonga med 0,75 frå 3.8 til jula 1847 |
| figurar\_a.md | S1.28 val B gjev Aslaug «sterkare startverdiar» utan tal | Skriv at ho kjem inn to nivå over snittet |
| bestiarium\_dyr.md | Vågekvalen i Bergen-tida har 2 000 Liv. På nivå 9 er det 27 vanlege treff, nesten like mykje som Stiftskrivaren | Set han til 1 200 Liv, eller flytt han til trinn II seint i reiseåra |
| bestiarium\_oversikt.md | Trinna I til IV har ikkje nivå | Skriv inn I = nivå 1 til 8, II = 9 til 27, III = 28 til 39 og IV = 40 til 47, og gje kvar fiendetype eitt nivå |
| fiendar\_bossar.md | Kansellisten har 9 000 Liv på nivå 60, som er om lag 14 vanlege treff | Kampen er bygd på lover, så talet kan stå, men det bør testast om Unntak frå Knudsen kan korte kampen ned til to rundar |
| figurar\_b.md | Påkall med tre treff gjer om lag 57 prosent av typisk Liv på éin tur | Det stemmer med at Asbjørnsen slår hardast. Om testing viser at Vilje ikkje held han nede, set Styrke per treff til tre firedelar av Røyst-kostnaden |
| superbossar.md | Ei Kvikk-line frå Vinje med 3 Ande gjer om lag 3 370 på nivå 55, litt over 3 000 | Kan stå, fordi Kvikk kostar Ekte og kan gje Skam. Alternativt kan Kvikk gå ned til 130 prosent |
| fiendar\_bossar.md | Tor slår for 40 prosent av Liv til jotunen | Det krev eit Åtak på om lag fem gonger ein vanleg fiende. Tal i prosent er rett for katastrofeåtak og kan stå |
| fiendar\_bossar.md og verda/06\_villmarkene.md | Dei ni bossane i vinterlaga gjev om lag 42 prosent av røynsla mellom nivå 34 og 45 når dei blir tekne på nivå, i tillegg til sideoppdraga i fimbulvinteren | Test om gummibandet held ein spelar som tek alle villmarkene, innanfor to nivå over kurva. Gjer det ikkje det, kan bossane i dei valfrie villmarkene gje ein fjerdedel av røynsla til neste nivå i staden for halvparten |

Fem av justeringane er no gjorde i dei andre fanene: Røyst-skalaen står i Grunnsystemet, Nedskriven har fått talet 0,75, val B i S1.28 gjev Aslaug to nivå over snittet, Vågekvalen har 1 200 Liv, og trinna i bestiariet har fått nivå. Sagahallen skalerer no med nivået til partyet. Prisane i Lydtreet er sette i fana Ordboka, del 10, ut frå den ferdige ordlista.

### Kjelder

Formlane og tala for andre spel er henta frå research/stats\_nivaa.md med kjeldene der. Nye kjelder for denne fana:

- https://snl.no/skilling (120 skilling på ein speciedalar frå 1816)
- https://www.nynorsk.no/biografi (stipenda til Aasen)
- https://tydalsboka.no/index.php/naeringslivet-2/ (dagløn, kornprisar og årsløn)
