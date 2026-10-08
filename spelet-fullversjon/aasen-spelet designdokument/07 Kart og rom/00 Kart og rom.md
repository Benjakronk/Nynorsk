# Kart og rom

Fanene under denne viser kvar stad i spelet som skjermar og rom: kva som står der i kvar epoke, korleis skjermane heng saman, kvar kistene står og kva dei inneheld, og kvar ein kan handle og kvile. Dei byggjer på fanene under Verda, dungeonfana, villmarksfana, manuset og møtetabellane i fanene 9b til 9d. Alt her er eit utkast til gjennomgang. Varene, butikktypane og kistereglane står i fana «13. Varer og kister» under Mekanikk.

## Korleis tabellane skal lesast

Kvar skjerm har ein ID med ein kode på tre bokstavar for staden og eit tal, til dømes LKG-02 for garden til Anders på Leikanger. Eit rom inne i eit hus får ein bokstav etter talet, som LKG-02a for stova på garden. Rom i ein dungeon har dungeonkoden og eit tal, som UBR-07. Alle ID-ane er eintydige over alle fanene, så dei kan brukast som nøklar i datafilene til spelet.

Kolonnen Utgangar viser kvar spelaren kan gå. Ei utgang til ein stad i ei anna fane står med namnet på staden, til dømes «Villmark V2, inngangsvarden». Kolonnen Epokar viser når skjermen finst. Scenenummer i parentes viser kvar i manuset noko skjer.

Ei kiste har ein ID med K, skjermen og eit løpenummer, som K-LKG-02-1. Kolonnen Tid viser tidene T1 til T4 frå fana Varer og kister. Ein butikk eller ein kvileplass står i ein eigen tabell under kvar stad, med butikktypen og det han sel i tillegg til det typen alltid har.

«Forslag» merkjer innhald som ber eiga forteljing og ikkje står i manuset. «(sjekk)» merkjer historiske opplysningar som må stadfestast.

## Fanene

| Fane | Dekkjer | Skjermar | Dungeonrom | Kister | Butikkar og kvile |
| --- | --- | --- | --- | --- | --- |
| Ørsta og Sunnmøre | Prologfjellet, Åsen, Ørsta, Volda, Ekset, Solnør, Ålesund og resten av Sunnmøre, med fire dungeonar og vegen opp i tårnet i Ørsta kyrkje | 81 | 25 | 35 | 21 |
| Bergen og Nordhordland | Bergen i alle epokar, Nordhordland og Osterfjorden, med ti dungeonar frå Arkivet under Rådstova til Djupet under Bryggen | 49 | 86 | 66 | 12 |
| Christiania | Byen frå 1845 til november 1853, med tolv dungeonar og superbossdungeonane på Akershus og hos Welhaven | 52 | 91 | 53 | 30 |
| Vestlandet, Sørlandet og Telemark | Sogn, Voss og Hardanger, Rogaland, Setesdal, Kristiansand og Telemark, med fem dungeonar | 88 | 35 | 59 | 32 |
| Austlandet, innlandet og verdskartet | Verdskartet med 49 knutepunkt, sambanda, og regionane frå Drammen til Dovre og Østfold, med fem dungeonar | 113 | 47 | 52 | 43 |
| Trøndelag og Nord-Noreg | Trondheim og Trøndelag, Nordmøre, Folla, Helgeland, Lofoten og Nord, og Kautokeino, med seks dungeonar | 75 | 34 | 49 | 19 |
| Villmarkene V1 til V6 | Etappane, dungeonane og vinterlaga frå Hjørundfjorden til Hardangervidda, med Havgrotta under Folgefonna | 92 | 43 | 54 | 19 |
| Villmarkene V7 til V12 | Etappane, dungeonane og vinterlaga frå Jotunfjella til Finnskogen, med sommarlaget på Dovrefjell | 75 | 37 | 48 | 22 |
| Sagahallen og superbossdungeonane | Sagahallen, dei åtte drakestadene, Olavsbrønnen, Skipet ned gjennom Folla og Utgard i Eidaskogen | 0 | 100 | 46 | 21 |
| Til saman |  | 625 | 498 | 462 | 219 |

Talet på butikkar og kvile tel kvar rad i tabellane, så ein stad som er både gjestgiveri og kvileplass, kan stå to gonger.

## Ventekistene

Alle fjorten ventekistene står på kartet.

| Ventekiste | Kiste | Skjerm | Fane |
| --- | --- | --- | --- |
| VK01 | K-SET-02a-1 | SET-02a Seterbua på Åsen-setra | Ørsta og Sunnmøre |
| VK02 | K-BGN-13a-1 | BGN-13a Sjøbua på Nøstet | Bergen og Nordhordland |
| VK03 | K-LRD-01b-1 | LRD-01b Lagerloftet hjå handelsmannen i Lærdal | Vestlandet, Sørlandet og Telemark |
| VK04 | K-HVR-02-1 | HVR-02 Jegerbua ved Totak | Villmarkene V1 til V6 |
| VK05 | K-TGJ-04-1 | TGJ-04 Under fallholet i Trollgjølet | Villmarkene V1 til V6 |
| VK06 | K-FIL-03-1 | FIL-03 Kyrkjestølane og varden på Filefjell | Austlandet, innlandet og verdskartet |
| VK07 | K-HKY-02-1 | HKY-02 Stova og dunbua på Vega | Villmarkene V7 til V12 |
| VK08 | K-CHR-12a-1 | CHR-12a Den første hybelen til Aasen | Christiania |
| VK09 | K-DOV-03b-1 | DOV-03b Kjellaren i fjellstua på Hjerkinn, same rom som HJK-10 i dungeonen | Austlandet, innlandet og verdskartet |
| VK10 | K-JTB-05-1 | JTB-05 Jøtulkammeret i Jøtulberget | Villmarkene V7 til V12 |
| VK11 | K-OYR-05-1 | OYR-05 Fløtarleiren ved Nordre Øyeren | Villmarkene V7 til V12 |
| VK12 | K-FSK-08-1 | FSK-08 Svedja på Finnskogen | Villmarkene V7 til V12 |
| VK13 | K-TRD-10b-1 | TRD-10b Sjøbua på Bakklandet | Trøndelag og Nord-Noreg |
| VK14 | K-SEL-03a-1 | SEL-03a Loftet hjå klokkaren i Seljord | Vestlandet, Sørlandet og Telemark |

## Stader som står i to faner

Nokre stader er teikna både i ei regionfane og i ei villmarks- eller superbossfane. Framlegget er at regionfana eig busetnader og hus, og at villmarks- og superbossfanene eig utmarka og dungeonane. Når same stad står to gonger, blir han éin skjerm i datafilene med ID-en frå den fana som eig han, og den andre ID-en peikar dit.

| Stad | Fane som eig han | Same stad i | Merknad |
| --- | --- | --- | --- |
| Hjerkinn fjellstue | Austlandet: DOV-03 | Villmarkene V7 til V12: FOK-06 Tunet på Hjerkinn | Ringen av pergament (FOK-12) står berre i villmarksfana |
| Lofthus og Ullensvang kyrkje | Vestlandet: LFH-01 | Villmarkene V1 til V6: FOL-01 | Etappe 1 i V3 byrjar her |
| Hå prestegard | Vestlandet: JAR-03 | Villmarkene V1 til V6: JRN-07 | Lyttestaden ved Håelva høyrer til villmarka |
| Kjelda ved Byklestigen og Valle | Vestlandet: VLE-03 og VLE-04 | Villmarkene V1 til V6: BYK-skjermane | Etappe 1 i V5 er vigslinga i Valle, som ligg nedanfor kjelda |
| Vågakallen | Sagahallen og superbossane: DVK | Trøndelag og Nord-Noreg: LFN-08 og LFN-09 | Regionfana har vegen opp, superbossfana har drakestaden |
| Stiklestad | Trøndelag og Nord-Noreg: TRL-05 | Sagahallen og superbossane: DST | Kongsormen ligg under jordet |
| Olavsbrønnen | Trøndelag og Nord-Noreg: OLA for 1846 | Sagahallen og superbossane: OLB for 1853 | Brønnrommet i 1846 kan vere etasje 1 i 1853 |
| Vor Frelsers kyrkje i november 1853 | Christiania | Sagahallen og superbossane: SGH-10 | Christiania-fana bør få natta i november 1853 som eige lag |

## Avgjerder til gjennomgang

Desse vala er tekne i arbeidet og står i fanene:

- VK01 har fått innhald i alle fire tidene, fordi Aasen kjem heim til Ørsta både i reiseåra og i Christiania-åra.
- Stilleprøva i V8 står berre i sommarlaget i 1847. Ein spelar som hoppar over det, går glipp av eitt av dei tolv stadminna, og det er greitt.
- Partyet får ski på Tveitli når Aslaug blir med i 6.7b. Det opnar vinterlaget i V6 for alle.
- Tre butikkting har fått ny stad: bukkehornet hjå skysskaren i Ringebu i 1851, vargskinnspelsen hjå skreddaren i Trondheim i fimbulvinteren og geologhammaren i ein jernvarehandel i Kongens gate i Christiania frå 1852.
- Partyet opnar ingen kister i hus der folk bur. Dungeonar i slike hus og dungeonar inne i ein tekst har få eller ingen kister. Det gjeld Hornet i Egils saga, Inne i måleriet, Hyllene hos Botten-Hansen, Welhavens salong og Inne i tingboka i Vardø.
- Eit kistefunn som Ullvottar eller Reiseskreppa kan liggje i meir enn éi kiste.
- Bergen står frosen i 1852, så butikkane og gjestgiveriet på Strandsiden er stengde det året. Felemakaren og auksjonen ligg i kvartalet ved Engen, som tinar i 6.3.
- Kremmarbua i Ørstavika er ein kremmar etter regelen om landhandel før 1857.
- Utstyr utan seljar i manuset er fordelt på butikkar der det passar: gode sko hjå skreddaren i Bergen, og prestekjole, skaut, reisekappe, skinnlue og bandgrind hjå handelsmannen i Lærdal og kremmarar og skreddarar på omgang.
- Nokre stadkodar er bytte ut for at alle ID-ar skal vere eintydige: AKK for Arkivkjellaren på Akershus, AKR for Arkivet i Krødsherad, HJK for Fjellstua på Hjerkinn, OSF for Østfold, VDR for Valdres, VLE for Valle, TVD for Bak Tvindefossen, OLA for Olavsbrønnen i 1846 og JRN for V4 på Jæren.

## Det viktigaste av dei opne spørsmåla

Kvar fane har ei full liste nedst. Desse påverkar fleire faner eller kan stengje noko for spelaren:

- Jøtulberget i V7 har inga opning i vinterlaget, så VK10 kan ikkje nåast i T4 om spelaren hoppa over V7 i 1845.
- Etappe 6 i vinterlaget i V3 krev Lokk frå huldra, medan S2.6 lèt spelaren ta Moe i staden for henne.
- Porten i Utgard krev tussen. Det må stadfestast at tussen kan vere med etter soga-fila.
- Nokre stader manglar møtesone i ein epoke: Trollgjølet i 1851, Vågå, Lom og Grue i vinterlaga, Innherred i reiseåra, Gauldalsvegen i fimbulvinteren, Radøy, Under Bryggen i 1848 og 1850, og vollane på Akershus i 1853.
- Kjeldene seier ulikt om fleire ting: når isvegane på Sunnmøre opnar (5.5b eller 6.9), om S1.36 er i august eller september 1845, om Trondheim er ope i fimbulvinteren, rekkjefølgja i Klasse 4 B, og kvar Grotormen og inngangen til Fåvne ligg.
- Fleire stader har fleire skjermar enn storleikstabellen i «Korleis verda er bygd» tillet, mellom dei Christiania med 52, Åsen og Solnør som heimebasar, og Rogaland og Østfold med kvar sin småby. Anten blir tabellen justert, eller nokre interiør blir slegne saman.
