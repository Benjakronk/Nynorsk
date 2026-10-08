# Grafikk og stil

Denne fana samlar retningslinjene for grafikken slik dei er utvikla i prototypen, og seier kva heile spelet treng i tillegg. Stilguiden i `tools/pikselkunst/STILGUIDE.md` er den fulle kjelda for reglane, og arbeidsloggen i `tools/pikselkunst/ARBEIDSLOGG.md` viser korleis dei kom til, runde for runde (98 rundar i oktober 2026). Når stilguiden og denne fana seier ulikt, gjeld stilguiden, og fana blir retta.

## Målet og forbileta

Spelet skal sjå ut som eit 16-bits rollespel frå 1990-åra. Final Fantasy VI er forbiletet for portretta ved samtaleboksen, den mørke og tette teksturen, kampbakgrunnane, figurane, dørene, sengene og lyset. The Minish Cap er forbiletet for dei lyse fargane, dei store og runde tretoppane, stiane og objekta sett frå høg vinkel. Octopath Traveler er forbiletet for djupna, der det som ligg langt nede, er uskarpt, disig og lysare. Blekklatten er målestokken: alt nytt skal kunne stå ved sida av han utan å skilje seg ut.

## Målestokk

| Type | Storleik i spelpikslar | Merknad |
| --- | --- | --- |
| Lerretet | 320 × 192 | Skalert opp med heile tal |
| Flis | 16 × 16 |  |
| Figur på kartet og i kamp | 16 × 24 | Teikna 12 pikslar over flisa |
| Portrett | 48 × 48 | Vist tre gonger så stort |
| Vanleg fiende | 20 × 20 til 48 × 48 |  |
| Boss | Opptil 96 × 80 | Blekklatten er 80 × 72 |

Éin spelpiksel er éin piksel i PNG-fila. Hus, tre, møblar og altertavler er heile figurar teikna som eitt bilete kvar.

## Fargar og lys

| Regel | Innhald |
| --- | --- |
| Skala | Kvart materiale har tre til fem tonar. Skuggane dreg mot djup fiolett (`#1a1238`) og lyset mot varm kvit (`#fff1c4`) |
| Omriss | Nesten svart (`#0a0514`), éin piksel rundt heile figuren. Inne i figuren skil den mørkaste tonen flatene |
| Lysretning | Alltid oppe til venstre på kartet. Flater med cel-skugge. Dithering berre på store flater, aldri i andlet |
| Tal på fargar | Høgst 16 per flis, 24 per figur, 32 per fiende og 40 per portrett |
| Slagskugge | Ting som står på bakken, har skugge mot høgre og ned. Bakken har ikkje omriss |
| Tekstur | Klyngjer i fast mønster, aldri tilfeldige enkeltpikslar |

Lyset etterliknar fargerekninga på Super Nintendo. Det meste er måla inn i pikslane, og resten reknar motoren ut med faste fargar som blir lagde til, trekte frå eller halverte, i 15-bits fargar. Bakgrunnen og figurane kan tonast kvar for seg. Kvart kart vel ei stemning frå `STEMNINGAR`, og gløden rundt kvar lyskjelde er ei handteikna form med to eller tre trinn og harde kantar. Det finst ingen mjuke gradientar og ingen vignett.

## Perspektivet

Objekt blir sett frå høg vinkel, slik som i Final Fantasy VI og The Minish Cap. For eit objekt med djupn på éi flis er toppflata 9 til 13 pikslar og forsida 4 til 6, om lag 2 til 2,5 gonger så mykje toppflate som forside. Bein og sokkel er 2 til 4 pikslar. Runde ting som fat, font og brunn har ei opning som er 2/5 til 1/2 så høg som ho er brei. Kyrkjebenkane er unntaket med høg rygg sett bakfrå.

## Portretta

| Regel | Innhald |
| --- | --- |
| Utsnitt | Tett, hovudet om lag 28 pikslar høgt, skuldrene i dei nedste 8 til 10 radene. Tre kvart forfrå, lyset frå høgre mot teksten |
| Hud | Tre til fire tonar i store, rolege flater. Ingen glanspunkt på kinn og nase. Farga omriss |
| Hår | Klumpar på 3 til 5 pikslar med mørk kant mot naboen. Glansen i ein ring over issen |
| Auge | Tjukk vippeline, iris 3 × 3 i tre tonar og éin kvit glanspiksel. Irisen synest i minst to rader |
| Hovudform | Ingen deler omriss. Kvar person har eiga andletsform |
| Kjenneteikn | Eigen silhuett og eitt kjenneteikn: fjørpennen til Ivar, blomekransen til huldra. Aldri fargebytte av ei felles grunnform |
| Kjensler | Bryn, augelok og munnvikar ber uttrykket |
| Småroller | Deler fem nøytrale fellesandlet |

Historiske personar blir teikna etter ekte forbilete, slik Ivar er teikna etter fotografia av Aasen frå 1871 til 1884 og bysten av Augusta Finne, som ein ung versjon av same andletet. Forbiletet skal vere frå den tida personen er i spelet, så langt det finst.

## Kart, vatn og terreng

Vatnet ligg lågare enn landet, med ein skrent på 3 til 4 pikslar under landet, skumline og skuggestripe. Strandkanten er glatt over flisgrensene. Stiane er tråkka jord i gyllen oker med låg kontrast mot graset, og hovudvegar er to fliser breie. Skrent, rampe, stup, overheng og luft er eigne kartteikn som blir teikna over flisgrensene. Element som heng saman med naboane, som vatn, steingard, sti og skogkant, blir laga i kode med ei nabomaske.

Byggjeskikken følgjer referansar med fri lisens i `tools/pikselkunst/konsept/`: torvtak som dominerer huset, laft med laftehovud og grunnmur av stein, stabbur på steinstolpar, bondestove med kalka grue, embetsheim med mahogni og kakkelomn. Klesdrakta på Sunnmøre rundt 1800 er raud topplue og kvit vadmålsjakke for menn, raud trøye, mørkt skjørt og kvitt skaut for kvinner.

## Å skildre i staden for å animere

Det som er dyrt å animere, kan teksten skildre. Ei kort setning i manus saman med effektane som finst (blink, risting, toning, bytte av bilete, ein pose) held for hendingar som skjer éin gong. Animasjon er for det spelaren ser ofte: gange, sitjing, eld, vatn og kjensler.

## Skrifta

Spelet har to eigne pikselskrifter, Spelskrift og Runeskrift, teikna glyf for glyf. Store bokstavar er 9 pikslar høge og små 6. I manus blir `⟪ord⟫` eit ord Ivar lærer, i gull, `⟨...⟩` norrøn tale i eigen farge og `⟦...⟧` runer i raud oker.

Manuset brukar fleire teikn enn Spelskrift har no. Desse manglar og må teiknast før fasen som brukar dei:

| Teikn | Kvar dei trengst | Før fase |
| --- | --- | --- |
| ò, è | Nynorsk «òg», «lèt» og «forlèt», om lag 150 gonger frå del 1 | 1 |
| ê | «vêr» og «lêr» frå del 2 | 4 |
| ä, ö, Ö | Svensk i fimbulvinteren («är», «säger», Rosenschöld) og Göttingen i del 3 | 5 |
| á, č, đ, š, ŋ, ž og store former | Samisk hos Ravdna i del 5 og i Kautokeino i del 6 | 7 |

Pixelify Sans står som reserve for teikn som manglar, men han passar ikkje saman med Spelskrift og skal ikkje synast i det ferdige spelet.

## Kva heile spelet treng

Prototypen har grafikk for Ørsta, Ekset og eit arkiv. Tabellen viser kva resten av spelet treng, med reglane som gjer mengda handterleg.

| Del | Mengd | Regel |
| --- | --- | --- |
| Fliser og hus | Elleve regionsett | Sjå «Regionane» under |
| Interiør og møblar | Eitt grunnsett for bondestove, embetsheim, kyrkje, kontor og byhus, med regionale tillegg | Kvart møbel er eit eige bilete, så romma kan setjast saman |
| Kartfigurar | 15 spelbare figurar, unge Ivar og dei namngjevne personane i manus (talet kjem frå datamodellen) | Gange i fire retningar og posane knele, sitje, peike, liggje og sove |
| Folk på kartet | Fellesfigurar i regionale drakter | Same kropp, ny drakt per region |
| Portrett | Sjå «Portretta i heile spelet» under |  |
| Vanlege fiendar | 61 grunnformer | Variantane er fargebytte av grunnforma, slik 9a seier |
| Namngjevne fiendar | Om lag 185 | Éin sprite kvar, høgst 32 fargar |
| Bossar | Om lag 80 | Opptil 96 × 80. Ein ny fase brukar same sprite med fargebytte og blink, og får ny sprite berre der manus skildrar ei ny form |
| Kampbakgrunnar | Overslag: om lag 25 terreng og om lag 25 eigne bakgrunnar for bossar og dungeonar | Vinter og fimbulvinter er fargelag og snø over same måleri |
| Galdr og evner i kamp | Éin grunnanimasjon per lydfamilie og éin per figurkommando | Trekket legg eit lite tillegg over grunnanimasjonen |
| Nærbilete | Kvart `naerbilete`-steg i manus | Same storleik og ramme som i prototypen |
| Verdskartet | Eitt kart med vinterlag og fimbullag | Avgjerd om stil før fase 4 |
| Brukargrensesnitt | Ramme, peikar, ikon for lydfamiliar, statusar, ressursprikkar, segl og turrekkja | Fase 1 |

### Regionane

Kvar region får eit sett som byggjer på settet for Sunnmøre, med det som skil regionen ut. Settet blir lagt til i fasen der regionen kjem først.

| Sett | Regionar | Det som skil ut | Fase |
| --- | --- | --- | --- |
| Sunnmøre | Ørsta, Volda, Solnør, Skodje | Finst | 2 |
| Bergen | Bergen | Bryggen, steinhus, brustein, Rådstova | 3 |
| Fjordbygd | Sogn, Nordhordland, Voss og Hardanger, Ryfylke | Stavkyrkje, frukthagar, bratte lier og stølar | 4 |
| Jæren og sørlandsby | Rogaland, Kristiansand | Lynghei, steingardar, kvitmåla trehus | 4 |
| Indre dal | Setesdal, Telemark, Hallingdal, Valdres, Gudbrandsdalen | Loft, ramloft og store tømmertun | 4 |
| Christiania | Christiania og Drammen | Mur i empire, gasslykter frå vinteren 1848–49, stillaset på Vor Frelsers kyrkje i 1849–50 | 5 |
| Fjellet | Dovre, Filefjell, vidda, breane | Fjellstuer, vardar, bre og myr | 4 |
| Trondheim | Trondheim og Trøndelag | Trehus og Nidarosdomen med skipet i ruin | 5 |
| Kyst og skjergard | Nordmøre, Helgeland, Lofoten | Naust, rorbuer, fiskehjell, fuglevær | 5 |
| Finnmark | Kautokeino | Gammer, vidde og reinflokkar (sjekk detaljane mot kjelder) | 8 |
| Sagahallen | Sagahallen og drakestadene | Norrøn ornamentikk, gull og ravnesvart | 9 |

### Epokane

Kvar epoke har ei stemning som går igjen i alle regionane. Stemninga er lyset frå `STEMNINGAR` og ein palett for kampbakgrunnane, og ho kostar lite fordi ho blir lagd over grafikken som finst.

| Epoke | Stemning |
| --- | --- |
| Barndomen 1816–1831 | Lyst og varmt, Minish Cap-fargar. Morgon og kveld etter tida i manus |
| Ekset, Solnør og Bergen 1833–1841 | Lampelys inne, regn og grått i Bergen |
| Reiseåra 1842–1847 | Årstida følgjer manus: haust i Sogn, vår i Hardanger, jul i Kristiansand, vinter i Telemark |
| Christiania 1847–1850 | Bylys, salongar, gasslykter frå 1848–49 |
| Fimbulvinteren 1850–1853 | Kaldt og blågrått med lite metting. Nordlyset over Christiania er det einaste sterke lyset |
| Sagahallen 1853 | Gull, ravnesvart og ein kald himmel |
| Etter oppgjeret | Grålysing og tining, vatn som renn |
| Epilogen 1885–1896 | Mildt seinsommarlys |

## Portretta i heile spelet

Etter regelen i prototypen har berre hovudpersonane kjensleportrett, og alle andre har eitt portrett. Ivar finst i fleire aldrar, og fleire figurar har mange replikkar. Framlegget er difor slik, og det må avgjerast før fase 4:

| Kven | Portrett | Kjensler |
| --- | --- | --- |
| Ivar som barn, 1816–1823 | Eitt | Vanleg, glad, trist, redd |
| Ivar som gut, 1824–1831 | Eitt (finst) | Alle ni |
| Aasen som ung mann, 1833–1847 | Eitt | Alle ni |
| Aasen i Christiania og fimbulvinteren, 1847–1853 | Eitt | Alle ni |
| Aasen som gamal, 1885–1896 | Eitt | Vanleg, glad, trist |
| Huldra | Eitt (finst) | Alle ni |
| Dei andre spelbare figurane | Eitt kvar | Vanleg, glad, trist, sint |
| Munch | Eitt | Vanleg, sint, glad |
| Namngjevne personar som ikkje er med i partyet | Eitt kvar | Ingen |
| Småroller | Fem fellesandlet per drakt | Ingen |

Med dette får om lag tjue portrett fleire kjensler. Talet på personar med eitt portrett kjem frå datamodellen, og fellesandleta trengst i om lag åtte regionale drakter.

## Arbeidsflyten

Grafikken blir laga i ei fast sløyfe: kjelda er ei `.pix`-fil i `tools/pikselkunst/kjelder/`, `pix.py lag` lagar PNG og førehandsvising, `pix.py sjekk` varslar om for mange fargar, einslege pikslar og hol i omrisset, og eit skjermbilete viser grafikken i spelet. Større løft skjer i rundar med research, teikning, sjekk og ei oppføring i arbeidsloggen. Nye reglar går inn i stilguiden.

I produksjonsplanen går grafikken i to lag. Lag 1 brukar det som finst, og fiendane står med grunnforma si. Lag 2 følgjer reglane i denne fana. Første akt og prologen får lag 2 med ein gong. Resten får lag 2 éin fase etter koden.

## Det som står att frå prototypen

Desse punkta frå arbeidsloggen er ikkje løyste:

- Kyrkjegrimen har inga eiga animasjon på kartet (runde 98).
- Dørbladet i den opne ramma er smalt på små dører, og Ivar er høgare enn døropninga (runde 96).
- Ivar i kyrkjebenken synest berre med håret over ryggen (runde 87).
- Storebror og bygdemannen liknar kvarandre, og fellesandleta deler bakgrunn (runde 84). Storebror og syster er ikkje med i designet, så punktet gjeld berre fellesandleta.
- Utsynet frå galleriet er eit fast bilete med måla hovud (runde 54 og 55).
- Fleire kanttypar for kartkanten: lauvskog, berg og myr (runde 35).
- Teigane i dalen er rette firkantar (runde 34), og fjella øvst på Åsen har lik snø (runde 38).
- Strå langs stiane følgjer berre fire retningar (runde 24).
- Ein sitjepose på golvet med beina i kross (runde 18).
