# Lydeffektar

Denne fana er utgangspunktet for å lage lydeffektane i spelet. Musikken finst alt i eit eige bibliotek med spor for nesten alt i dokumentet, og lyden for kvar stad står under «Musikk og lyd» i fanene for stadene. Her står lydeffektane: lydane som svarar på det spelaren gjer, og lydane som gjer ein stad levande. Lista er eit utkast. Ho blir justert når lydane blir prøvde i spelet.

## Reglar for lyden

Lydane skal passe saman med musikken og høyre til same tid som grafikken. Final Fantasy VI er forbiletet: korte samplingar med lite etterklang, tydelege i ein travel kamp, og aldri lengre enn handlinga dei høyrer til.

| Regel | Innhald |
| --- | --- |
| Lengd | Dei fleste under eitt sekund. Menylydar under 0,2 sekund |
| Klang | Same samplingsrate og same karakter som lydbanken musikken brukar, så lyd og musikk smeltar saman |
| Variasjon | Lydar som kjem ofte, som fotsteg, slag og treff, har to til fire variantar som blir valde tilfeldig |
| Tempo | I kampfart 2× og 4× blir lydane korta eller hoppa over der dei ville overlappe. Trykk, takt og stevjing har alltid full lyd |
| Tekst | Samtaleboksen har ingen lyd per teikn, slik som i Final Fantasy VI. Berre neste side har lyd |
| Historisk lyd | Miljølyd skal vere frå tida: ingen jernbane før 1854, dampfløyte frå 1820-åra, gasslykter i Christiania frå vinteren 1848–49 |
| Stille | Stille er eit verkemiddel. Fjøset på Åsen i fimbulvinteren og hybelen med pennen skal ha nesten ingen lyd |

Song, kved, joik, stev og fele er korte musikalske innslag og høyrer til musikkbiblioteket. Lista under har berre lyden når evna treffer. Fanfaren etter siger, tonen når eit nytt ord blir lært, og melodien ved kvile er òg musikk. Dei står nedst som innslag å sjekke mot biblioteket.

Kvar lyd har ein ID på forma `sfx.gruppe.namn`. ID-en blir brukt i datafilene og i scenemotoren, slik fana Datamodell seier. Kolonnen Fase viser fasen i produksjonsplanen der lyden trengst første gong.

## Menyar og tekst

| ID | Lyd | Når | Fase |
| --- | --- | --- | --- |
| sfx.meny.peikar | Kort, tørt klikk | Peikaren flyttar seg | 1 |
| sfx.meny.vel | Lys, kort tone | Z på eit val | 1 |
| sfx.meny.attende | Lågare, kort tone | X tilbake | 1 |
| sfx.meny.stengd | Dump tone | Valet kan ikkje brukast | 1 |
| sfx.meny.opne | Ei bokside som blir slegen opp | Pausemenyen opnar seg | 1 |
| sfx.meny.lukk | Boka blir lagd att | Pausemenyen lukkar seg | 1 |
| sfx.meny.sorter | Blad som blir bladd raskt | Q byter sortering | 1 |
| sfx.meny.fane | Eit papir som blir snudd | Ny fane i Ordboka eller Dagboka | 1 |
| sfx.tekst.neste | Mjukt klikk | Neste side i samtaleboksen | 1 |
| sfx.tekst.val | Same som sfx.meny.vel | Val i samtaleboksen | 1 |
| sfx.ord.hoyrt | Eit lite klokkespel som stig | Eit ord losnar frå ei setning og heng i lufta (Lytt i felt og samtale) | 2 |
| sfx.ord.skrive | Penn som skrapar to gonger | Skriv etter kamp | 3 |
| sfx.ord.hugsa | Mjuk pust med ein tone | Hugs etter kamp | 3 |
| sfx.ord.sleppt | Eit blad som fell | Slepp etter kamp | 3 |
| sfx.ord.gjeve | Varm tone som går ut | Gje vidare (6.18) | 8 |
| sfx.ord.halvgloymt | Tone som bleiknar | Eit hugsa ord blir halvgløymt | 3 |
| sfx.ord.tilbake | Tonen frå sfx.ord.hoyrt baklengs | Eit spor eller halvgløymt ord kjem att | 3 |
| sfx.ord.rettskrive | Pennestrok og eit lite stempel | Eit ord blir Rettskrive | 3 |
| sfx.dagbok.line | Penn som skriv kort | Ny line i Dagboka | 2 |
| sfx.dagbok.maal | Lys klang | Dagbokmålet når eit nytt trinn | 4 |
| sfx.lydtre.node | Kvist som knekk mjukt, med ein tone | Ein node blir kjøpt i Lydtreet | 3 |
| sfx.ting.pengar | Myntar | Skilling inn | 2 |
| sfx.ting.kjop | Myntar på disk | Kjøp | 2 |
| sfx.ting.sel | Myntar i pung | Sal | 2 |
| sfx.ting.utstyr | Klesplagg eller reiskap | Utstyr på eller av | 2 |
| sfx.ting.nokkel | Jernnøkkel | Ein nøkkelting blir funnen | 2 |
| sfx.lagre | Bok som blir lagd på ei hylle | Lagring i eit hefte | 1 |
| sfx.lagre.slett | Papir som blir rive | Stryke eit hefte | 1 |

## Feltet

| ID | Lyd | Når | Fase |
| --- | --- | --- | --- |
| sfx.steg.gras | Fotsteg i gras | Gange og spring | 1 |
| sfx.steg.jord | Fotsteg på jord og sti |  | 1 |
| sfx.steg.tre | Fotsteg på golvplankar |  | 1 |
| sfx.steg.stein | Fotsteg på stein og brustein |  | 3 |
| sfx.steg.sno | Fotsteg i snø |  | 2 |
| sfx.steg.is | Glatte steg på is | Isvegane | 7 |
| sfx.steg.myr | Våte steg | Myr og våtmark | 4 |
| sfx.steg.grus | Steg på grus og ur |  | 4 |
| sfx.dor.tre | Tredør som går opp og igjen | Dører med to rammer | 1 |
| sfx.dor.kyrkje | Tung dør med jernbeslag | Kyrkjer og embetshus | 1 |
| sfx.dor.lem | Lem eller luke | Loft, kjellar, stabbur | 1 |
| sfx.dor.last | Låsen held | Låst dør | 1 |
| sfx.trapp | Steg i trapp | Trapper | 1 |
| sfx.sitje | Benk eller stol som knirkar | Setje seg | 1 |
| sfx.seng | Halm og dyne | Leggje seg | 1 |
| sfx.kiste.opne | Lokk med jernband | Kiste | 1 |
| sfx.kiste.tom | Lokk og tomt rom | Tom kiste | 1 |
| sfx.kiste.vent | Lokk og ein lys klang | Ventekiste som har fått betre innhald | 4 |
| sfx.kvile.lykt | Glas og veke som blir tend | Kvile ved lykta | 1 |
| sfx.kvile.baal | Eld som tek tak | Kvile ved bålet | 1 |
| sfx.kvile.rune | Kniv i tre, så ein tone | Kvilerune | 3 |
| sfx.lytt.felt | Lyden blir stille rundt, og ein tone stig | Lytt i felt | 1 |
| sfx.lytt.stadminne | Djup klang | Eit stadminne blir merkt | 4 |
| sfx.kamp.inn | Glasaktig sveip | Overgang til kamp, som virvelen i Final Fantasy VI | 1 |
| sfx.kamp.symbol | Kort varsel | Ein synleg fiende ser partyet | 1 |
| sfx.baat.ro | Årer i vatn | Robåt frå 1.11 | 3 |
| sfx.skyss.hest | Hest og karjol | Skyss frå 2.2 | 4 |
| sfx.dampskip.floyte | Dampfløyte | Dampskip frå 2.6, og i Christiania | 4 |
| sfx.dampskip.maskin | Damp og hjul | Ombord | 4 |
| sfx.slede | Meiar på snø og bjøller | Slede over isen | 7 |
| sfx.ski | Ski i snø | Ski frå 6.7b | 8 |
| sfx.verd.opne | Kart som blir rulla ut | Verdskartet opnar seg | 4 |

## Feltevner

| ID | Lyd | Kven | Fase |
| --- | --- | --- | --- |
| sfx.felt.skrivopp | Penn mot papir | Aasen, Skriv opp | 3 |
| sfx.felt.kyroyra | Ku som rautar langt borte | Tussen, Kyrøyra | 2 |
| sfx.felt.tussestorleik | Lyd som krympar | Tussen, Tussestorleik | 2 |
| sfx.felt.lokk | Kort lokk | Huldra, Lokk | 3 |
| sfx.felt.erte | Latter | Vinje, Erte | 4 |
| sfx.felt.folgjeheim | Lykt og steg | Landstad, Følgje heim | 4 |
| sfx.felt.kvedatt | Ein tone som kjem att | Aslaug, Kved att | 4 |
| sfx.felt.joike | Pust før joik | Ravdna, Joike | 7 |
| sfx.felt.blikket | Vifte som blir slegen opp | Collett, Blikket | 7 |
| sfx.felt.rett | Raud penn | Knudsen, Rett | 7 |
| sfx.felt.notere | Blyant | Asbjørnsen, Notere | 8 |
| sfx.felt.fortelje | Stemme som byrjar ei forteljing | Moe, Fortelje | 8 |
| sfx.felt.speleopp | Felestrok | Ole Bull, Spele opp | 8 |
| sfx.felt.samle | Bjølle | Berte, Samle til møte | 7 |
| sfx.felt.lyfte | Stein som blir lyfta | Jotunen, Lyfte | 8 |

## Kampen: felles

| ID | Lyd | Når | Fase |
| --- | --- | --- | --- |
| sfx.kamp.klar | Lite klikk | Målaren til ein figur er full | 1 |
| sfx.kamp.slag | Slag med kjepp eller hand | Angrip, tre variantar | 1 |
| sfx.kamp.slag.tungt | Tyngre slag | Kraftig treff | 1 |
| sfx.kamp.kritisk | Skarpt slag med klang | Kritisk treff | 1 |
| sfx.kamp.bom | Sus | Bom | 1 |
| sfx.kamp.vern | Dump blokk | Treff mot vern | 1 |
| sfx.kamp.laekje | Mjuk stigande tone | Liv attende | 1 |
| sfx.kamp.royst | Pust og tone | Røyst attende | 1 |
| sfx.kamp.ande | Kort innpust, éin per Ande | Ande blir brukt | 1 |
| sfx.kamp.lytt | Stille, så ein tone | Lytt i kamp | 1 |
| sfx.kamp.segl | Lite knepp | Eit segl går | 3 |
| sfx.kamp.open | Noko som brest, med klang | Fienden er open | 3 |
| sfx.kamp.lukka | Segla kjem att | Fienden er ikkje lenger open | 3 |
| sfx.kamp.hove | Lys tone over treffet | Høvesbonus | 2 |
| sfx.kamp.rad | Steg | Kommandoen Rad | 1 |
| sfx.kamp.ting | Veske | Ting | 1 |
| sfx.kamp.flukt | Steg som spring | Flykt | 1 |
| sfx.kamp.flukt.stengd | Dump tone | Flukt går ikkje | 1 |
| sfx.kamp.slegen | Fall | Ein figur er slegen ut | 1 |
| sfx.kamp.vekt | Pust | Ein figur blir vekt | 1 |
| sfx.kamp.fiende.roa | Lang pust som blir roleg | Eit folkevesen roar seg | 2 |
| sfx.kamp.fiende.blekk | Blekk som renn ut | Eit blekkvesen går i oppløysing | 3 |
| sfx.kamp.fiende.flyktar | Steg eller vengjer | Menneske eller dyr som flyktar | 2 |
| sfx.kamp.hugmaalar | Stigande klang | Hugmålaren er full | 3 |
| sfx.kamp.forteljarline | Penn eller stemme | Ei ny line i forteljarlina | 3 |
| sfx.kamp.avbrot | Ei line blir stroken | Forteljarlina går ei line tilbake | 3 |
| sfx.kamp.turrekkje | Mjukt klikk | Turrekkja blir rekna om etter ein forseinking | 1 |
| sfx.kamp.mot | Pust som går ut | Eit dyr mistar Mot | 2 |
| sfx.kamp.klokke | Kyrkjeklokke | Kyrkjeklokka slår i ein fast runde | 3 |
| sfx.kamp.morgon | Hane | Morgonteljaren er full | 3 |

## Galdr etter lydfamilie

Kvar lydfamilie har éin grunnlyd. Dansk form og svak form brukar same grunnlyd, matt og lågare. Trekket legg ein liten lyd oppå.

| ID | Lyd | Familie | Fase |
| --- | --- | --- | --- |
| sfx.galdr.diftong | Rund, lang klang som legg seg over partyet | Diftongar, vern | 2 |
| sfx.galdr.hard | Skarp konsonant som smell | Harde konsonantar, åtak | 2 |
| sfx.galdr.kv | Kort spørjande tone som stig | Kv-ord, avsløring | 2 |
| sfx.galdr.j | Mjuk, varm tone | J-ord, lindring | 2 |
| sfx.galdr.smaa | Rask, lett tone | Småord | 2 |
| sfx.galdr.grunn | Djup, enkel tone | Grunnord | 2 |
| sfx.galdr.nokkel | Lang klang med etterklang | Nøkkelord gjennom hugmålaren | 3 |
| sfx.galdr.dansk | Grunnlyden, matt | Dansk eller svak form | 2 |
| sfx.galdr.trykk.rett | Lys tone | Rett trykk | 2 |
| sfx.galdr.trykk.feil | Dump tone | Feil trykk | 2 |
| sfx.galdr.lant | Grunnlyden med eit ekko av stemma til figuren | Lånt ord frå ein ordplass | 4 |

## Trekka

| ID | Lyd | Trekk |
| --- | --- | --- |
| sfx.trekk.alle | Sveip over heile sida | Alle |
| sfx.trekk.gjennom | Stikk som går gjennom | Gjennom |
| sfx.trekk.naering | Tygging | Næring |
| sfx.trekk.kjelde | Vatn som renn | Kjelde |
| sfx.trekk.pust | Andedrag | Pust |
| sfx.trekk.rammar | Ekstra smell | Rammar |
| sfx.trekk.svevn | To tonar frå ein bånsull | Svevn |
| sfx.trekk.loyse | Lenke som fell | Løyse |
| sfx.trekk.syn | Glimt | Syn |
| sfx.trekk.snogg | Sus | Snøgg |
| sfx.trekk.stogg | Ur som stoppar | Stogg |
| sfx.trekk.tung | Djup dump | Tung |
| sfx.trekk.skjul | Tøy som blir lagt over | Skjul |
| sfx.trekk.varme | Eld som knitrar | Varme |
| sfx.trekk.togn | Lyden døyr bort | Togn |
| sfx.trekk.brot | Noko som sprekk | Brot |
| sfx.trekk.ekko | Grunnlyden att, svakare | Ekko |
| sfx.trekk.ro | Mjuk klang | Ro |
| sfx.trekk.troyst | Varm akkord | Trøyst |

Trekket Ingen har ingen eigen lyd, og trekket Eiga får lyden til evna det står for. Trekka kjem med Lydtreet og ordlistene frå fase 2.

## Statusar

Dei vanlegaste statusane får eigen lyd. Dei andre brukar ein felles lyd for vond og god status, til dei treng ein eigen.

| ID | Lyd | Status | Fase |
| --- | --- | --- | --- |
| sfx.status.vond | Låg, kort tone | Felles for vonde statusar | 1 |
| sfx.status.god | Lys, kort tone | Felles for gode statusar | 1 |
| sfx.status.over | Tone som løyser seg | Ein status går over | 1 |
| sfx.status.skam | Kviskring | Skam | 2 |
| sfx.status.rettskriven | Pennestrok og stempel | Rettskriven | 3 |
| sfx.status.taus | Lyden blir borte | Taus | 7 |
| sfx.status.bunden | Tau som blir stramma | Bunden | 3 |
| sfx.status.gloymsle | Tone som bleiknar | Gløymsle | 3 |
| sfx.status.fimbul | Frost som knitrar | Fimbul | 7 |
| sfx.status.tint | Drypp | Tint | 7 |
| sfx.status.stum | Hand over munnen | Stum | 2 |
| sfx.status.lytta | Øyre som blir vendt | Lytta | 2 |
| sfx.status.sint | Snerr | Sint | 2 |
| sfx.status.sov | Pust som går tungt | Søv | 2 |
| sfx.status.verna | Salt eller stål | Verna | 2 |

## Figurkommandoar

| ID | Lyd | Kven og kva | Fase |
| --- | --- | --- | --- |
| sfx.fig.tussen.eittord | Eitt lite, klart ord | Tussen, Eitt ord | 2 |
| sfx.fig.tussen.et | Tygging | Tussen et ein ting | 2 |
| sfx.fig.huldra.gamleord | Gammal stemme under klangen | Huldra, Gamle ord | 3 |
| sfx.fig.ekko | Rop som kjem att frå fjellet | Unge Ivar, Ekko | 2 |
| sfx.fig.vinje.haan | Kort latter | Vinje, Hån og Frekk | 4 |
| sfx.fig.collett.taus | Vifte som blir slegen att | Collett, Taus | 7 |
| sfx.fig.collett.stilling | Stol som blir skuva | Collett, Ope og Anonym | 7 |
| sfx.fig.knudsen.ret | Raud penn som rettar | Knudsen, Ret | 7 |
| sfx.fig.knudsen.protokoll | Protokoll som blir slegen igjen | Knudsen, Protokollen | 7 |
| sfx.fig.asbjornsen.paakall | Bok som blir opna med ei kraft | Asbjørnsen, Påkall | 8 |
| sfx.fig.asbjornsen.granske | Lupe og blyant | Asbjørnsen, Granske | 8 |
| sfx.fig.moe.les | Bokside | Moe, Les det som står | 8 |
| sfx.fig.moe.fortel | Pust før ei forteljing | Moe, Fortel fritt | 8 |
| sfx.fig.berte.staarskrive | Bibel som blir slegen opp | Berte, Det står skrive | 7 |
| sfx.fig.jotun.slag | Stein mot stein | Jotunen | 8 |
| sfx.fig.paakalling | Kraft som kjem ut av papir | Påkallingar og bundne vesen | 3 |

Songen til huldra og Landstad, stevet til Vinje, kvedet til Aslaug, joiken til Ravdna og fela til Ole Bull er musikalske innslag.

## Fiendar

Kvar fiendegruppe har ein åtakslyd og ein lyd når ho tek skade. Bossane har i tillegg éin til tre eigne lydar, som står i fiendedata.

| ID | Gruppe | Fase |
| --- | --- | --- |
| sfx.fiende.blekk | Blekkvesen: sprut og renn | 3 |
| sfx.fiende.papir | Bøker, protokollar og plakatar: papir og paragrafar | 3 |
| sfx.fiende.stempel | Stempel og lakk | 3 |
| sfx.fiende.smaadyr | Mus, rotter og småfuglar | 2 |
| sfx.fiende.fugl | Kråker, ravnar og sjøfugl | 2 |
| sfx.fiende.storedyr | Okse, elg, bjørn | 4 |
| sfx.fiende.ulv | Hund, rev og ulv | 2 |
| sfx.fiende.vette | Vettar og tussar: knurr og kvisk | 2 |
| sfx.fiende.huldrefolk | Huldrefolk og alvar: lokk og latter | 4 |
| sfx.fiende.troll | Troll og jotnar: tungt og djupt | 4 |
| sfx.fiende.draug | Sjø og draugar: vatn og vind | 5 |
| sfx.fiende.eld | Eld og irrbloss | 2 |
| sfx.fiende.is | Is og frost | 4 |
| sfx.fiende.menneske | Folk: stokk, slag og hån | 3 |
| sfx.fiende.embete | Embetsfolk: papir, segl og stemme | 3 |
| sfx.fiende.ravn | Munchs ravnar | 7 |
| sfx.fiende.einherje | Sagahallen: våpen og skjold | 9 |

## Scener

Scenemotoren kan spele ein lyd som eit steg, slik han spelar blink og risting. Desse lydane er dei som går igjen i manus.

| ID | Lyd | Døme | Fase |
| --- | --- | --- | --- |
| sfx.scene.klokke | Kyrkjeklokke, DONG | Klokketårnet, Christiania | 1 |
| sfx.scene.rist | Rumling | Steget rist | 1 |
| sfx.scene.blink | Lyst sus | Steget blink | 1 |
| sfx.scene.forvandling | Lyd som glir over i ein annan | Steget forvandling | 1 |
| sfx.scene.penn | Penn som skriv | Brev, Dagboka, manuskript | 2 |
| sfx.scene.blekk | Blekk som renn | Blekket breier seg | 2 |
| sfx.scene.brev | Papir som blir bretta ut | Brev blir opna | 2 |
| sfx.scene.press | Trykkpresse som klikkar | Ekset (1.10), trykkeriet | 3 |
| sfx.scene.eld | Eld som tek tak | Ruinen på Ekset, bål | 3 |
| sfx.scene.brest | Is eller glas som brest | Ringen brest (0.5) | 10 |
| sfx.scene.vind | Vindkast | Fjellet, fimbulvinteren | 2 |
| sfx.scene.hjartslag | Hjartslag | Pulsslaget (3.18) | 5 |
| sfx.scene.dor.smell | Dør som smell | Scener med sinne | 2 |

## Miljø

Miljølydane går i lykkjer under musikken og kjem frå bolkane «Musikk og lyd» i fanene for stadene. Dei skrur seg av når fimbulvinteren tek lydane bort, slik fanene skildrar.

| ID | Lyd | Kvar | Fase |
| --- | --- | --- | --- |
| sfx.miljo.graut | Graut som småkokar | Stova på Åsen | 2 |
| sfx.miljo.kvern | Kverna i bekken | Åsen, står i fimbulvinteren | 2 |
| sfx.miljo.tun | Hane og kyr | Tunet på Åsen | 2 |
| sfx.miljo.fjord | Bølgjer mot strand | Fjordbygdene | 2 |
| sfx.miljo.bekk | Bekk | Utmark | 2 |
| sfx.miljo.skog | Vind i tre og fuglar | Skog | 2 |
| sfx.miljo.klokke.stove | Klokka i stova | Solnør | 3 |
| sfx.miljo.griffel | Griffel mot tavle | Solnør, omgangsskulen | 2 |
| sfx.miljo.bokbikube | Summing bak ein vegg | Biblioteket på Ekset | 2 |
| sfx.miljo.regn | Regn | Bergen | 3 |
| sfx.miljo.brygge | Folk, tau og båtar | Bryggen | 3 |
| sfx.miljo.brustein | Vogner og karjolar på brustein | Christiania, Bergen | 3 |
| sfx.miljo.vektar | Nattevektar som ropar timen | Christiania | 5 |
| sfx.miljo.gass | Gasslykt som susar | Christiania frå vinteren 1848–49 | 6 |
| sfx.miljo.hammar | Hammarslag og meislar | Stillaset på kyrkja i 1849–50 | 6 |
| sfx.miljo.foss | Foss | Vestlandet og dalane | 4 |
| sfx.miljo.bre | Is som knakar | Breane | 4 |
| sfx.miljo.fjellvind | Vind over vidda | Fjellet | 4 |
| sfx.miljo.fuglevaer | Sjøfugl | Helgeland, Lofoten | 5 |
| sfx.miljo.isveg | Isen knakar, hundar langt borte | Isvegane | 7 |
| sfx.miljo.nordlys | Svakt, høgt sus | Christiania i fimbulvinteren | 7 |
| sfx.miljo.frost | Frost som knitrar i takrenner | Fimbulvinteren | 7 |
| sfx.miljo.drypp | Takskjegg som dryp | Etter oppgjeret | 9 |
| sfx.miljo.takrenne | Takrenner som renn over | 7.12 | 9 |
| sfx.miljo.vaar | Fuglar som byrjar éin og éin | 7.13 | 9 |

## Minispel

| ID | Lyd | Minispel | Fase |
| --- | --- | --- | --- |
| sfx.mini.rot.form | Ei form som fell på plass | Rotrekonstruksjonen | 3 |
| sfx.mini.rot.ferdig | Djup klang | Rotforma er funnen | 3 |
| sfx.mini.rune.riss | Kniv i tre | Runerissing | 3 |
| sfx.mini.rune.feil | Kniven glir | Feil rune | 3 |
| sfx.mini.takt | Fotslag | Takt i stevjinga og fakkeltoget | 4 |
| sfx.mini.typesetjing | Blytypar | Typesetjing i trykkeriet (4.12) | 6 |
| sfx.mini.overhoyring | Kviskring og ein klokke som tikkar | Overhøyringa før konfirmasjonen (1.5) | 2 |
| sfx.mini.puslespel | Ord som glir på plass | Ordpuslespelet i 7.29 | 9 |

## Musikalske innslag å sjekke mot biblioteket

Desse er korte musikkstykke. Dei står her så vi ser at dei finst i biblioteket.

| Innslag | Når |
| --- | --- |
| Siger | Etter ein vanleg kamp og ein boss |
| Tap | Partyet er slege |
| Nytt ord | Eit ord blir lært for første gong |
| Ny figur | Ein figur blir med i partyet |
| Kvile | Natt på ein kvileplass |
| Nøkkelting | Ein nøkkelting blir funnen |
| Superboss | Ein superboss er slegen |
| Lagring av Etter soga | Stjerna på permen |
