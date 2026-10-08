# Menyar og kontrollar

Denne fana er ei oversikt over alle skjermar og vindauge i spelet og over kontrollane. Ho byggjer på det prototypen har, og på det figur- og systemfanene krev. Ho er eit utgangspunkt: detaljane blir justerte når skjermane blir bygde og prøvde. Det som står i fanene for systema (Ordboka, Magisystemet, Grunnsystemet, Figurar), gjeld føre denne fana når dei seier ulikt.

## Reglane frå prototypen

| Regel | Innhald |
| --- | --- |
| Berre tastar | Spelet blir styrt som eit konsollspel. Musa kan ikkje peike, klikke eller rulle på spelflata, og musepeikaren er gøymd. Nye element blir styrte med `Motor.lytt` og `Motor.liste` |
| Faste vindauge | Alle vindauge har fast storleik, som i Final Fantasy VI. Ein replikk som ikkje får plass, blir delt i sider. Ei liste som ikkje får plass, rullar |
| Rullelister | Berre radene som synest, blir teikna. Peikaren rullar ved kanten, ▲ og ▼ viser at det er meir, og lista går rundt frå første til siste |
| Skarpe pikslar | Alt i vindauga blir målt i heile skriftpikslar. Teksten har filteret `#skarp` og skugge éin skriftpiksel nede til høgre |
| Ramme og peikar | Pikselramma `ui/ramme.png` og peikarhanda `ui/peikar.png`. Gull og raudt for spørsmål i kampen |
| Lister med detaljfelt | Topplinje, rulleliste og eit fast felt nedst med detaljane til det peikaren står på (`MENYLISTER` i spel.js) |

## Kontrollane

| Tast | I feltet | I menyar | I kampen |
| --- | --- | --- | --- |
| Piltastar eller WASD | Gå | Flytte peikaren, venstre og høgre byter kolonne eller side | Flytte peikaren. I kommandovindauget: venstre gjev Rad, høgre gjev Byt |
| Z, Enter eller mellomrom | Snakke, undersøkje. Halde nede: springe | Velje | Velje |
| X, Esc eller Backspace | Opne pausemenyen | Tilbake | Tilbake |
| Q eller Tab |  | Byte sortering eller fane | I kommandovindauget: Gjenta. I lister: byte fane |
| C (framlegg) | Halde nede: Lytt |  | Leggje til Ande, opptil 3. Trykk nummer fire set Ande attende til 0 |
| 1 til 4 |  |  | Svar på spørsmål om form og trykk, og i stevjinga |

Styrekrossen på mobil og nettbrett ligg utanfor spelflata og sender same trykk som tastane. Han har i dag A, B og Q. Med framlegget over får han ein fjerde knapp, C, for Lytt og Ande.

Framlegget samlar Lytt og Ande på same tast fordi begge handlar om å trekkje pusten og ta inn. Lytteknappen i 1.1 («Spelaren held lytteknappen») har ingen tast i dag. Ande hos Octopath Traveler ligg på ein skulderknapp av same grunn: spelaren vel kor mykje før han vel kva.

## Skjermane

| Skjerm | Når | Fase |
| --- | --- | --- |
| Tittelskjermen | Start | 1 |
| Lagringsskjermen med dei fire hefta | Lagring og Hald fram | 1 |
| Samtaleboksen | Replikkar, val, kort med stad og tid | 1 |
| Nærbilete | Scenesteget `naerbilete` | 1 |
| Pausemenyen | X i feltet | 1 |
| Kampskjermen | Kamp | 1 |
| Valet etter kampen | Skriv, Hugs, Slepp for kvart nytt ord | 3 |
| Butikken | Butikkar og kremmarar | 2 |
| Verdskartet | Frå 2.2 | 4 |
| Rotrekonstruksjonen | Frå 1.12 | 3 |
| Runerissing | Frå 1.13 | 3 |
| Stevjinga | Frå 2.18 | 4 |
| Ordpuslespelet | 7.29 | 9 |
| Rulleteksten | 7.31 | 9 |

## Tittelskjermen

Tittelskjermen har Blekklatten over namnet på spelet i prototypen. Han får tre val: Ny soge, Hald fram og Innstillingar. Ny soge vel vanskegrad (Forteljing, Vanleg eller Saga) og startar prologen. Hald fram opnar lagringsskjermen. Når fase 10 er ferdig, kan tittelbiletet bytast til eit motiv frå prologen.

## Lagringsskjermen

Dei fire lagringsfilene står som fire hefte av Dagboka side om side på ei hylle, slik Grunnsystemet seier under Lagring. Eit tomt hefte har blanke permar. Peikaren står på eit hefte, og detaljfeltet viser dato og stad, partyet med portrett, nivået til figuren på plass 1, talet på oppslag i Ordboka, speletida og merket på permen. Z lagrar eller lastar, og eit hefte med innhald krev stadfesting. Kopier og Stryk ligg i eit lite vindauge som opnar seg med Q, og begge krev stadfesting.

## Samtaleboksen

Boksen har fast storleik nedst på lerretet: namnelina, fire tekstliner og portrettet til venstre. Replikken blir lagd ut heil frå starten, så lina blir broten på same stad frå første til siste bokstav. ▼ og Z gjev neste side. Val står i same boks som ei liste med høgst fem rader. Kort med stad og tid står midt på skjermen. Orda Ivar lærer, står i gull, norrøn tale i eigen farge og runer i raud oker.

## Pausemenyen

Dagboka er hovudmenyen, slik figurfana til Aasen seier. Pausemenyen er difor ei opna dagbok: menyvala står i ein smal kolonne til venstre, som i prototypen, og høgre side viser det valet peikaren står på. Når menyen opnar seg, står peikaren på Dagboka, og høgre side viser sida for det sporet spelaren er på.

Nedst i den venstre kolonnen står dato, stad, speletid og skilling.

| Val | Innhald | Fase |
| --- | --- | --- |
| Dagboka | Sidene i Dagboka, spora med tilrådd nivå, Dagbokmålet på omslaget, sida for superbossane | 1 |
| Ordboka | Oppslaga, med fanene under | 1 |
| Lydtreet | Treet med greinene og Lydtre-poenga | 3 |
| Evner | Galdr og evner som kan brukast utanfor kamp, som lækjing | 1 |
| Ting | Brukstinga i veska. Fana Nøkkelting viser nøkkeltinga, Bokhylla og Stevpungen | 1 |
| Utstyr | Dei fem plassane til kvar figur. Fana Ordplassar frå 2.6 | 2 |
| Status | Figuren med eigenskapar, ressurs, hugmålar og statusar | 1 |
| Formasjon | Kven er aktive, rekkjefølgja og framrad eller bakrad | 3 |
| Innstillingar | Sjå under | 1 |

Prototypen har i tillegg Galdr, Stev, Vesen, Kurset og Til kurssida. Galdr og Stev går inn i Evner, og Vesen blir Bestiariet i Ordboka. Kurset og Til kurssida høyrer til kursmodulen og står berre der han er slått på.

### Dagboka

Dagboka viser éi side om gongen og blar med venstre og høgre, som i prototypen. Fanene er Spor, Sider og Superbossar.

| Fane | Innhald |
| --- | --- |
| Spor | Opne spor med tilrådd nivå, slik Octopath viser det på kapittelflagget. I Christiania 1847–1850 og fimbulvinteren kan spelaren velje kva spor som er merkt på kartet. Valfrie villmarker og vinterlag står som eigne sider når dei opnar seg |
| Sider | Alle dagbokssidene i rekkjefølgje, med det danske som er bytt ut med landsmål etter kvart som rotformer blir funne |
| Superbossar | Frå den første superbossen er opna. Ein rad for kvar, med spørsmålsteikn for dei som ikkje er funne |

Dagbokmålet står som ein smal målar på omslaget, synleg i alle fanene.

### Ordboka

Ordboka i prototypen har orda i to kolonner, sortering med Q (alfabetisk i nynorsk rekkjefølgje, rekkjefølgja dei vart lærde, eller etter lydfamilie), merket «ny» og eit detaljfelt. Heile spelet treng fleire faner og meir i detaljfeltet.

| Fane | Innhald |
| --- | --- |
| Alle | Alle oppslag, med Q for sortering |
| Kapittel | Dei fjorten kapitla med talet på oppslag, plassane, kapittelløna og rangen |
| Hugsen | Hugsa ord, med halvgløymde i grått, og Lokkerop |
| Lomma | Dei tolv favorittane. Z på eit ord i ei anna fane set eller tek bort blekkkrosset |
| Spor | Sleppte ord som står att som spor med familie, første bokstav, stad og talar |
| Bestiariet | Vesena spelaren har møtt, med ord og sårbarheiter som er funne |

Detaljfeltet for eit oppslag viser tyding, lydfamilie, trekket, formene med kven og kvar, dansk, norrønt, høvesbonusen, rotforma når ho er funnen, og galdren med Røyst. Feltet har plass til fire liner. Er det meir, blar spelaren i detaljfeltet med venstre og høgre.

### Lydtreet

Lydtreet er eit tre med greiner der kvar node kostar Lydtre-poeng. Skjermen viser treet som ein teikning i Dagboka, med noder som lyser når dei er kjøpte og står grå når spelaren ikkje har råd. Peikaren går mellom nodane med piltastane, og detaljfeltet viser namn, pris og verknad. Greinene som opnar seg seinare (Bøyingsgreina og Avleiing i Christiania), står som utviska blyantstrek til dei opnar seg.

### Utstyr og Ordplassar

Utstyrsskjermen viser dei fem plassane til figuren: reiskap, klede, hovud og to lommer. Lista under viser det spelaren kan setje på, med ▲ og ▼ ved kvar ting for om han gjer figuren sterkare eller veikare, slik som i Final Fantasy VI. Q byter figur.

Fana Ordplassar opnar seg i 2.6. Ho viser plassane til figuren (to, så tre ved 150 oppslag og fire ved 300) og lista over ord figuren kan ta imot. Huldra og Aslaug kan berre ta hugsa ord, og Knudsen og Asbjørnsen berre skrivne. Detaljfeltet viser verknaden på 75 prosent og eigenarten til figuren. Figurar utan ordplassar står grå i lista over figurar.

### Status og Formasjon

Status viser Liv, Røyst, nivå, røynsle til neste nivå, dei seks eigenskapane, hugmålaren, den eigne ressursen og statusane. Formasjon viser dei fire aktive plassane og reserven. Z på ein figur og Z på ein annan byter dei. Venstre og høgre flyttar figuren mellom framrad og bakrad. Figurar som historia held fast, står med ein lås.

### Innstillingar

| Innstilling | Val | Fase |
| --- | --- | --- |
| Kampfart | 1×, 2×, 4× | 1 |
| Møterate | Vanleg, Halv, Ingen. Saga-modus har berre Vanleg og Halv | 1 |
| Tidsmålaren | Aktiv eller Vent, slik Grunnsystemet seier under Tid og tur. Vent er standard i forteljingsmodus | 1 |
| Musikk | Lydstyrke | 1 |
| Lydeffektar | Lydstyrke | 1 |
| Vindaugefarge | Fargen på vindauga, slik Final Fantasy VI har det | 12 |
| Tekstfart | Kor fort replikkane blir skrivne | 12 |
| Tastar | Endre tastane | 12 |

Vanskegraden blir vald i Ny soge. Om ho skal kunne endrast undervegs, er eit ope spørsmål.

## Kampskjermen

Fiendane står til venstre og partyet til høgre, og alle vindauga har fast storleik.

| Del | Innhald |
| --- | --- |
| Turrekkja | Øvst. Dei neste seks turane som små hovud, rekna ut frå målarane og snøggleiken. Ein open fiende viser i tillegg neste handling. Meldingar legg seg over turrekkja medan dei blir viste |
| Fiendane | Segla står som små teikn over fienden: ravnar, blekkdropar, knutar, knappar, rimkrystallar, tustar, bokmerke eller steinar. Sårbarheiter som er funne, står som ikon under segla. Forteljarlina står over hovudet til fienden |
| Fiendevindauget | Nedst til venstre. Namna på fiendane, opptil fem |
| Partyvindauget | Nedst til høgre. Kvar rad har namn, Liv, Røyst og målar. Under namnet står ressursprikkane (gule når ressursen kan brukast, grå når han er tom) og Ande-prikkane, kvar to pikslar høge |
| Kommandovindauget | Smalt, fem rader. Angrip øvst, så dei eigne kommandoane, så Ord når figuren har ordplassar, så Lytt og Ting. Situasjonskommandoar som Stå still kjem nedst. Venstre gjev Rad, og høgre gjev Byt med ein figur i reserve (framlegg). Ande blir vist som prikkar i toppen av vindauget |
| Listevindauget | Breitt, to kolonner og fire rader, med skildringa på éi fast line. Brukt for Galdr, Ord, Song, Ting, Stev og dei andre listene |
| Spørsmålet om form | Gull og raudt. Svar med piltastar og Z eller med 1 til 4 |
| Sigeren | To liner om gongen. Z gjev neste line |

### Galdr-lista

Galdr opnar Ordboka i kamp slik Ordboka-fana seier under «Ordboka i kamp». Øvst står snarvegsrada med dei fire sist brukte orda og Høyrt-brettet med to plassar. Under står fanene Hugsen, Lomma, Høve og dei seks lydfamiliane. Q byter fane, og ei bokstavrad hoppar til første bokstav. Vegen til eit ord skal vere to trykk med Lomma eller snarvegsrada og tre med ei fane.

### Valet etter kampen

Etter sigeren står kvart nytt ord frå Høyrt-brettet i eit eige vindauge med forma, talaren og familien. Valet er Skriv, Hugs eller Slepp, og frå 6.18 Gje vidare der det går. I barndomen kjem ikkje dette vindauget, for heile Ordboka er ein hugs.

## Feltet

Feltet har ingen faste vindauge på skjermen, slik som i Final Fantasy VI. Namnet på staden kjem som eit kort når spelaren kjem inn. Medan Lytt i felt verkar (50 steg), står eit lite øyre i hjørnet. Feltevnene blir brukte når spelaren snakkar med nokon eller undersøkjer noko: då kjem eit lite val med Tal og feltevnene til dei aktive figurane som passar der. Framlegget held skjermen rein og gjer feltevnene synlege der dei kan brukast.

## Butikken

Butikken har vala Kjøp, Sel og Gå. Lista viser varene med pris i skilling eller speciedalar og skilling. For utstyr viser detaljfeltet kven som kan bere tingen, med ▲ og ▼ for kvar figur, slik som i Final Fantasy VI. Kremmarar på omgang brukar same skjerm.

## Det som kjem seinare

Desse skjermane blir spesifiserte i fasen der dei trengst, ut frå fanene som skildrar dei: verdskartet med reisemåtane (fase 4), stevjinga (fase 4), Protokollen til Knudsen (fase 7), påkallingane (fase 8), menyen Svar, Lytt og Vis mot Munch (fase 9) og ordpuslespelet (fase 9). Tilgjengelegheit, som tekstfart, tekststorleik og lesehjelp, kjem i fase 12.
