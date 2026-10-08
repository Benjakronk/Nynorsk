# Produksjonsplan

Denne fana seier i kva rekkjefølgje spelet skal byggjast. Grunnlaget er rekkjefølgja som vart bestemt i oktober 2026: først grunnsystema, så spelet i kronologisk rekkjefølgje frå scene 1.1, og prologen når mykje av resten står. Historia skal vere spelbar frå start til slutt før sideoppdrag og anna valfritt innhald kjem inn. Planen har fasar med eit klart krav for når kvar fase er ferdig, og ho bind dei opne spørsmåla i dokumentet til fasen som treng svaret.

Planen seier ingenting om kor lang tid kvar fase tek. Det avheng av kor mange som arbeider, og det får vi vite etter dei første fasane. Fanene «Grafikk og stil», «Lydeffektar», «Menyar og kontrollar» og «Datamodell» under denne fana høyrer til planen.

## Omfanget

| Innhald | Mengd | Kjelde |
| --- | --- | --- |
| Scener i hovudhistoria | 209, med 6 i prologen | Manus, del 1 til 7 |
| Sideoppdrag | om lag 90 (S1.1 til S1.49 og S2.1 til S2.43) | Sideoppdrag 1 og 2 |
| Manus | om lag 135 000 ord, 100 000 av dei i hovudhistoria | Manus |
| Skjermar i feltet | 625 | Kart og rom |
| Rom i dungeonar | 498 | Kart og rom |
| Kister | 462, med 14 ventekister | Kart og rom, Varer og kister |
| Butikkar og kvileplassar | 219 rader | Kart og rom |
| Oppslag i Ordboka | 527 | Ordboka |
| Vanlege fiendar | 61 grunnformer med 452 variantar | 9a. Bestiarium: vanlege fiendar |
| Namngjevne fiendar | om lag 185 typar | Bestiaria for dyr, fabeldyr og menneske |
| Bossar | om lag 80 med villmarkene og superbossane | Fiendar og bossar, Superbossar |
| Spelbare figurar | 15, og unge Ivar | Figurar |
| Villmarker | 12, kvar med sommarlag og vinterlag | Villmarkene |

Til samanlikning har Final Fantasy VI om lag 380 fiendar og 14 spelbare figurar. Spelet vårt er større på dei fleste område, og det er grunnen til at rekkjefølgja betyr så mykje.

## Prinsippa

Planen følgjer rekkjefølgja som vart bestemt i oktober 2026, med fire tillegg. Grunnane står under kvart punkt.

### Grunnsystema er dei som heile spelet brukar

Fase 1 byggjer berre system som går gjennom heile spelet: feltet, scenemotoren, kampkjernen, Ordboka, lagringa, menyane og lyden. Eit system som berre éin figur eller éin del brukar, blir bygt når forteljinga kjem dit. Påkallingane til Asbjørnsen, Protokollen til Knudsen og fela til Ole Bull blir altså bygde i fimbulvinteren. Gjer vi dei før, byggjer vi dei utan å kunne prøve dei i den samanhengen dei skal stå i, og då må dei truleg skrivast om. Det var same grunn til at prototypen venta med prologen.

Til fase 1 høyrer òg ein prøvesal: eit lite kart utanfor forteljinga der kvart system kan prøvast åleine, med ein lærarfiende for kvar regel. Han tek over rolla som prototypescenarioet har hatt som testarena, og han blir aldri synleg for spelaren.

### Data før system

Fase 0 kjem før grunnsystema. Ho flyttar innhaldet frå dette dokumentet over i datafiler som spelet les, slik at systema i fase 1 blir bygde mot dei verkelege orda, fiendane og skjermane. Med 527 oppslag og 452 fiendevariantar kan vi ikkje skrive innhaldet inn for hand to gonger. Fana «Datamodell» er oppdraget til agenten som gjer dette.

### Kvar del blir bygd i to lag

Lag 1 er spelbart: karta brukar fliser og hus som finst, fiendane står med grunnforma si, musikken kjem frå biblioteket, og all tekst er ferdig. Lag 2 er ferdig: grafikken følgjer stilguiden, lydeffektane er på plass, og kampbakgrunnane er måla. Ein del får lag 2 etter at han har vore spelt igjennom i lag 1 minst éin gong. Speltesten flyttar ofte på ting, og då er det dyrt om skjermane alt er teikna ferdige. Grafikken kan difor gå éin fase etter koden.

Unntaket er første akt. Han får lag 2 med ein gong og blir den vertikale skiva: éin del av spelet som ser ut og høyrest ut slik heile spelet skal gjere. Prototypen har gjort mykje av dette arbeidet alt.

### Kritisk sti, og innhald som fargar historia

Hovudhistoria i fasane 2 til 9 er den kritiske stien: alt spelaren må gjennom for å nå rulleteksten. Tre ting som ser valfrie ut, høyrer likevel til der:

- Dei to villmarkene på hovudvegen, Folgefonna og Sørfjorden i 1844 (V3, mellom 2.12 og 2.13) og Dovrefjell i 1845 og 1852 (V8, i 3.16 og 6.12).
- Jotunsporet i 6.12 og 6.13. Jotunen må vere med før 7.1.
- Flagga frå sideoppdrag som hovudhistoria les. Talet på vesen Aasen har skrive ned, fargar replikkane til huldra i Hallingdal i 1845. Valet i S1.28 gjev Aslaug to nivå ekstra. Fleire oppdrag har slike utfall. I hovudløpet får kvart slikt flagg ein standardverdi, og historia les det. Når oppdraget kjem inn seinare, set det flagget, og historia treng ikkje rørast.

Alt anna valfritt innhald kjem i fase 11, etter at heile historia er spelbar. Det gjeld dei ti andre villmarkene, sideoppdraga, dei personlege oppdraga i fimbulvinteren, samleobjekta og superbossane. Dei personlege oppdraga brukar figurar som kjem seint, og mange regionar blir vitja att i fimbulvinteren. Løna i sideoppdraga må dessutan setjast mot den ferdige nivåkurva.

## Fasane

| Fase | Innhald | Scener | Ferdig når |
| --- | --- | --- | --- |
| 0 | Overgang frå prototypen: datamodell, import, sjekkverktøy |  | Spelet les alt innhald frå datafiler, og sjekken finn ingen brotne tilvisingar |
| 1 | Grunnsystema og prøvesalen |  | Kvart system er prøvt i prøvesalen, og kampsimulatoren held tilrådd nivå for bossane i første akt |
| 2 | Ørsta 1816–1831 | 1.1 til 1.9 | Spelbar frå 1.1 til 1.9 |
| 3 | Ekset, Solnør og Bergen 1833–1841 | 1.10 til 1.25 | Første akt er spelbar og i lag 2. Vertikal skive |
| 4 | Reiseåra, første del, 1842–1845 | 2.1 til 2.28 | Spelbar frå 1.1 til 2.28 |
| 5 | Reiseåra, andre del, 1845–1847 | 3.1 til 3.25 | Spelbar til 3.25 |
| 6 | Christiania 1847–1850 | 4.1 til 4.31 | Spelbar til 4.31 |
| 7 | Fimbulvinteren, første del, 1850–1852 | 5.1 til 5.27 | Spelbar til 5.27 |
| 8 | Fimbulvinteren, andre del, 1852–1853 | 6.1 til 6.22 | Spelbar til den store opninga |
| 9 | Sluttkampen og epilogen | 7.1 til 7.32 | Heile historia er spelbar frå 1.1 til etter rulleteksten |
| 10 | Prologen | 0.1 til 0.6 | Spelet byrjar på snøfjellet |
| 11 | Valfritt innhald, region for region | S1, S2, V1 til V12 | Alt i Sideoppdrag 1 og 2 og Villmarkene er spelbart |
| 12 | Tilgjengelegheit, balansering og finpuss |  | Klart for utgjeving |

Lag 2 for fasane 4 til 9 går parallelt, éin fase etter koden. Lag 2 for valfrie stader kjem med fase 11.

## Fase 0: Overgang frå prototypen

Prototypen har sitt eige scenario med Ørsta i 1826, den framande, haugbonden og Blekklatten. Det blir lagt bort, og systema og grafikken blir verande. Karta for Åsen, stova, stabburet, utmarka, Hovdebygda, kyrkja med galleri og tårn og Ekset blir startpunktet for skjermane med kodane ASN, SET, HVD, ORV og EKS i Kart og rom. Kyrkja står i Ørstavika i designet, og Kyrkjegrimen i tårnet er alt ein del av designet som løynd boss. Arkivet frå prototypen kan bli eit utgangspunkt for Arkivet under Rådstova i Bergen.

| Oppgåve | Merknad |
| --- | --- |
| Datamodell og import | Agenten les fanene og skriv JSON etter fana «Datamodell». Prototypen blir tilpassa modellen |
| Sjekkverktøy | `sjekk-spel.js` blir utvida: kvar scene, skjerm, kiste, butikk, møtesone, fiende og ord som blir nemnt, finst. Kvar ID er eintydig. Kvart oppslag i Ordboka kan nåast |
| Prøvesalen | Eit kart med lærarfiendar og ein meny for å setje flagg, år, party og nivå |
| Speltestlogg | Spelet loggar nivå, tid og tap ved kvar boss, så vi kan samanlikne med tilrådd nivå |
| Kursmodulen | Gåvene frå kurset, menyvala Kurset og Til kurssida og lagringsnøkkelen til kurset blir skilde ut som ein valfri modul, så spelet står på eigne bein |

## Fase 1: Grunnsystema

Rekkjefølgja inne i fasen går frå det andre system byggjer på, til det som ligg øvst.

| Nr | System | Status i prototypen | Kjelde i dokumentet |
| --- | --- | --- | --- |
| 1 | Tilstand, flagg, val, epokar og år, lagring i fire hefte | Delvis | Grunnsystemet, Lagring |
| 2 | Feltet: kart, dører, trapper, sitjeplassar, lys, parallakse | Ferdig | Grafikk og stil |
| 3 | Scenemotoren | Ferdig, med punkta under «Neste steg» i README | Grafikk og stil |
| 4 | Møtesoner, møterate, synlege fiendar, formasjonar | Delvis | Grunnsystemet, Kampskjermen og feltet |
| 5 | Kister med tidene T1 til T4, butikkar, kvileplassar | Delvis | Varer og kister |
| 6 | Kampkjernen: tidsmålaren, turrekkja, framrad og bakrad, Røyst, Ande, Lytt, statusane | Delvis | Grunnsystemet, Nivå, eigenskapar og utstyr |
| 7 | Galdr: lydfamiliane, former og Trykk, høvesbonus, trekk, segl og opning | Delvis | Magisystemet, Trekka til orda |
| 8 | Ordboka: oppslag, former, Høyrt-brettet, Skriv, Hugs, Slepp, kontroll | Delvis | Ordboka, Magisystemet |
| 9 | Nivå, røynsle, eigenskapar, utstyr, gummiband | Delvis | Nivå, eigenskapar og utstyr |
| 10 | Kamptempo, Gjenta, vanskegrad | Nei | Grunnsystemet, Kamptempo |
| 11 | Menyane og samtaleboksen | Delvis | Menyar og kontrollar |
| 12 | Lyd: musikk og lydeffektar | Nei | Lydeffektar |
| 13 | Dagboka med spor, tilrådd nivå og Dagbokmålet | Delvis | Figurar, Ivar Aasen |
| 14 | Kampsimulatoren | Nei | Køyrer formlane utan grafikk og prøver kvar boss mot partyet på tilrådd nivå |

Systema som ventar til forteljinga treng dei, står i fasen der dei kjem. Grafikk og lyd i lag 2 for fellesdelar som menyramme, peikar, statusikon og lydfamiliar høyrer òg til fase 1, fordi dei står på skjermen i heile spelet.

Grunnsystema skal byggjast slik at to ting kan leggjast til seinare utan omskriving. Lydfamiliane skal ha eit teikn i tillegg til fargen, og all tekst skal gå gjennom same tekstsystem, så tekstfart og storleik kan gjerast om til innstillingar i fase 12.

## Fase 2: Ørsta 1816–1831

Første akt er barneversjonen av spelet. Ordboka er ein hugs, det finst ingen segl, og tussen er med frå 1.3. Kvart tidshopp gjev same bygda i eit nytt år, og 1.9 lukkar barndomen.

| Kva | Innhald |
| --- | --- |
| Scener | 1.1 til 1.9 |
| Stader | Åsen, Åsen-setra, Hovdebygda, Ørstavika og kyrkja, Årflot, Ekset, Volda og grendene i den grad manus brukar dei |
| Nye system | Lytt og det første oppslaget (1.1), galdr (1.2), tussen og Eitt ord (1.3), Skam med trinn, tidshopp |
| Bossar | Gassen og Musekongen |
| Opplæring | Kvar lydfamilie blir møtt åleine første gongen |

## Fase 3: Ekset, Solnør og Bergen 1833–1841

| Kva | Innhald |
| --- | --- |
| Scener | 1.10 til 1.25 og tre dagboksider |
| Stader | Ekset med pressa, Solnør, Ura i lia, Bergen, Arkivet under Rådstova |
| Nye system | Robåt (1.11), rotrekonstruksjon (1.12), runer (1.13), Lydtreet (1.16), valet mellom Skriv og Hugs (1.16), huldra og Gamle ord (1.17), segl og full Ande (1.23), den første blekkdungeonen |
| Bossar | Stiftskrivaren og Debitoren |

Når fasen er ferdig, er heile første akt spelbar i lag 2 med musikk og lydeffektar. Dette er den vertikale skiva. Ho blir spelt av folk som ikkje har vore med på å byggje henne, og det vi lærer der, går inn i grunnsystema før fase 4 byrjar.

## Fase 4: Reiseåra, første del

| Kva | Innhald |
| --- | --- |
| Scener | 2.1 til 2.28 |
| Stader | Verdskartet, Sogn, Nordhordland og Bergen, Under Bryggen, Voss og Hardanger, V3 Folgefonna og Sørfjorden, Rogaland, Setesdal, Kristiansand, Telemark |
| Nye system | Verdskartet og skyss (2.2), dampskip og ordplassar (2.6), runelesing (2.9), stevjing (2.18 og 2.19), Landstad (2.24b), Vinje og Aslaug (2.27), lydlag og mange former per ord |

Før fasen byrjar, må vi avgjere korleis verdskartet skal sjå ut. Designet skildrar eit amtskart frå 1840-åra sett ovanfrå, og prototypen brukar 3D-kartet frå «Reisene til Ivar Aasen».

## Fase 5: Reiseåra, andre del

| Kva | Innhald |
| --- | --- |
| Scener | 3.1 til 3.25 |
| Stader | Hallingdal, Christiania i 1845, Valdres, Gudbrandsdalen og Dovre, V8 Dovrefjell, Trondheim, Nordmøre, Helgeland og Namdalen, Eidsvoll |
| Nye system | Dagboka byrjar å skifte mål (Nordmøre 1846), dei siste reisemåtane i reiseåra |

## Fase 6: Christiania 1847–1850

Byen er open med hybelen som base, og spora A til H kan takast i fri rekkjefølgje. Spor F, bryllaupet på Gulsvik (4.18), er valfritt og ventar til fase 11. Frå 4.24 går historia i fast rekkjefølgje.

| Kva | Innhald |
| --- | --- |
| Scener | 4.1 til 4.31, utan 4.18 |
| Nye system | Fritt val av spor i Dagboka, Bøyingsgreina og Avleiing i Lydtreet, Hugin og Munin som stel ord (4.29) |

Før fasen byrjar, må vi avgjere om Christiania får fleire skjermar enn storleikstabellen tillet (52 i Kart og rom), eller om nokre interiør blir slegne saman.

## Fase 7: Fimbulvinteren, første del

| Kva | Innhald |
| --- | --- |
| Scener | 5.1 til 5.27 |
| Stader | Ørsta og Årflot i vinterlaget, Christiania i fimbulvinteren, Lofoten og Nord, Klasse 4 B og Knudsens kapittel |
| Nye system | Vinterlaget på kartet og isvegane, kulde utan kvile, Berte (5.5b), Collett (5.12), Ravdna og joik (5.16), Knudsen med Ret og Protokollen (5.22), vinterord og Brenn |

Før fasen byrjar, må tre motseiingar i kjeldene vere løyste: når isvegane på Sunnmøre opnar, om Trondheim er ope i fimbulvinteren, og rekkjefølgja i Klasse 4 B.

## Fase 8: Fimbulvinteren, andre del

| Kva | Innhald |
| --- | --- |
| Scener | 6.1 til 6.22 |
| Stader | Bergen i 1852, Drammen og Hallingdal, Tveitli og Rauland, Hjerkinn og V8 i vinterlaget, Kautokeino, Telemark, Fredrikshald og Akershus, Krødsherad |
| Nye system | Ole Bull og fela (6.3), Landstad att (6.5), ski (6.7b), Moe og forteljing (6.8), Asbjørnsen og påkallingane (6.9), jotunen (6.13), pennen lagd bort og Gje vidare (6.17 og 6.18), den store opninga |

Den store opninga etter 6.22 er med i fasen, men berre med det hovudhistoria treng: kartet er ope, og trykkeriet i Christiania startar 7.1 når jotunen er med.

## Fase 9: Sluttkampen og epilogen

| Kva | Innhald |
| --- | --- |
| Scener | 7.1 til 7.32 |
| Stader | Sagahallen, Christiania etter oppgjeret, epilogen 1885–1896 |
| Nye system | Prøvelesing og Dagbokmålet på 100 prosent (7.1), menyen Svar, Lytt og Vis mot Munch, avslutningssekvensen med éin figur om gongen, ordpuslespelet (7.29), Etter soga-fila |

Avslutningssekvensen har scener for figurar som er valfrie, som Ole Bull og Ravdna. I denne fasen blir dei bygde som om figuren er med, og spelet hoppar over scena når flagget manglar.

Når fasen er ferdig, kan heile historia spelast frå 1.1 til etter rulleteksten. Det er den viktigaste milepælen i planen. Ein full gjennomspeling viser om nivåkurva held, og kor lang tid historia tek.

## Fase 10: Prologen

Prologen viser heile kampsystemet med full kraft og kan difor først byggjast når systema i fasane 2 til 9 står. Prologpartyet har fast styrke. Prologen er det første spelaren ser, så han får lag 2 med ein gong. Tittelskjermen og overgangen 0.6 til 1.1 høyrer til her.

## Fase 11: Valfritt innhald

Det valfrie innhaldet blir bygt i ei ny runde gjennom spelet i kronologisk rekkjefølgje. Kvar region får sideoppdraga sine, sommarlaget i den valfrie villmarka si og grafikken i lag 2 for stadene som berre sideoppdraga brukar. Då blir kvar region gjord ferdig éin gong.

| Steg | Innhald |
| --- | --- |
| 11a | Oppdrag som set flagg hovudhistoria les. Dei kjem først fordi dei gjer historia rikare der ho alt er bygd |
| 11b | Reiseåra, region for region: S1-oppdraga og sommarlaga i V1, V2, V4, V5, V6, V7, V9 og V10 |
| 11c | Christiania 1847–1850: Spor F på Gulsvik, S2.13 til S2.18, S2.40 og S2.43, sommarlaga i V11 og V12 |
| 11d | Fimbulvinteren: dei personlege oppdraga S2.1 til S2.12b, sideoppdraga i regionane (S2.19 til S2.28 og S2.42), vinterlaga i villmarkene |
| 11e | Samleobjekt og minispel (S2.34 til S2.39) og samtalane undervegs |
| 11f | Superbossane (S2.29 til S2.33 og S2.41), Kyrkjegrimen, Etter soga-fila og Utgard |

Superbossane kjem sist fordi dei krev alt anna: alle figurane, alle påkallingane og den ferdige nivåkurva opp til 70.

Før steg 11b til 11f må desse opne spørsmåla vere løyste: Jøtulberget i V7 har inga opning i vinterlaget, etappe 6 i vinterlaget i V3 krev Lokk medan S2.6 lèt spelaren ta Moe, porten i Utgard krev tussen, og kvar Grotormen og inngangen til Fåvne ligg. Møtesonene som manglar (Trollgjølet i 1851, Vågå, Lom og Grue i vinterlaga og fleire), må vere fylte før regionen blir bygd.

## Fase 12: Tilgjengelegheit, balansering og finpuss

Tilgjengelegheit blir sett nærare på her. Fase 1 har sørgt for at lydfamiliane har teikn i tillegg til farge, og at tekstfarten kan gjerast om til ei innstilling. Elles høyrer fasen til balansering mot speltestloggen, ein siste runde med lag 2 der noko står att, og lokal finpuss som ein ikkje ser før alt står saman.

## Speltest og sjekk i kvar fase

Kvar fase sluttar med fire ting:

1. Ei gjennomspeling frå 1.1 til slutten av fasen utan prøvesalen og utan snarvegar.
2. Sjekkverktøyet finn ingen brotne tilvisingar, ingen ID-ar som står to gonger, og ingen scene der ein figur som talar, manglar på kartet.
3. Kampsimulatoren prøver kvar boss i fasen mot partyet på tilrådd nivå. Ein boss som tapar eller vinn mykje oftare enn tabellen i «Nivå, eigenskapar og utstyr» seier, blir justert.
4. Ein speltest med nokon som ikkje har bygt fasen. Loggen frå testen blir samanlikna med tilrådd nivå og tida i «Korleis verda er bygd».

## Avgjerder som må takast før ein fase byrjar

| Avgjerd | Før fase |
| --- | --- |
| Formatet på datafilene (fana Datamodell) | 0 |
| Korleis portretta til dei nye figurane skal vere (fana Grafikk og stil) | 4 |
| Korleis verdskartet skal sjå ut | 4 |
| Storleiken på Christiania | 6 |
| Motseiingane om isvegane på Sunnmøre, Trondheim i fimbulvinteren og Klasse 4 B | 7 |
| Opne spørsmål om villmarkene, Utgard og drakestadene | 11 |
