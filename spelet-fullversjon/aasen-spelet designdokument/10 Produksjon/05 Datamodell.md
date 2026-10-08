# Datamodell: oppdrag til agenten

Denne fana er oppdraget til agenten som skal flytte innhaldet i designdokumentet over i datafiler som spelet les. Ho seier kva filene skal innehalde, korleis ID-ane skal lagast, og korleis arbeidet skal sjekkast. Ho er fase 0 i produksjonsplanen.

## Oppdraget

Spelet er bygt i rein JavaScript. Prototypen har alt innhaldet sitt i éi fil, `js/rpg/data.js`, som konstantar (`ORD`, `FIENDAR`, `KART`, `SCENER` og fleire). Heile spelet har for mykje innhald til det. Agenten skal lage:

1. Eit importskript som les markdown frå fanene i dokumentet og skriv JSON-filer etter modellen under. Skriptet skal kunne køyrast på nytt kvar gong dokumentet endrar seg, og gje same resultat for same kjelde.
2. JSON-filene, laga av skriptet.
3. Ein lastar i JavaScript, `js/rpg/last.js`, som les filene og gjer dei tilgjengelege for spelet.
4. Eit sjekkskript som finn brotne tilvisingar, ID-ar som står to gonger, og felt som manglar.
5. Ein rapport over det skriptet ikkje kunne tolke, og over motseiingar i kjeldene.

Agenten rører ikkje koden i prototypen. Han skriv ei liste over kva i `data.js` som svarar til kva i modellen, så den som byggjer, kan flytte prototypen over.

## Prinsippa

| Prinsipp | Innhald |
| --- | --- |
| Dokumentet er kjelda | Datafilene blir laga frå fanene. Ein feil blir retta i fana, og skriptet blir køyrt på nytt. Verdiar som ikkje står i dokumentet, blir lagde i eigne filer under `data/hand/` og flette inn av skriptet |
| Data, formlar og åtferd kvar for seg | Datafilene har det dokumentet seier om kvar ting: tal, namn, tilvisingar. Formlane (skade, røynsle, Røyst-skala) står i koden og blir ikkje rekna ut på førehand. Særreglar for éin fiende, boss eller evne er åtferd. Han får ein ID i datafila og ein modul i koden, og regelteksten frå dokumentet står med i feltet `regel` |
| Rå tekst blir verande | Når eit felt blir tolka frå fri tekst, står originalteksten i eit felt `kjelde_tekst` ved sida av. Det som ikkje kan tolkast sikkert, får `null` og ei line i rapporten |
| Ingenting blir dikta | Agenten fyller aldri inn verdiar som manglar. Eit tomt felt er betre enn eit gissa felt |
| Stabile ID-ar | Ein ID som finst, blir aldri endra. Om eit namn blir endra i dokumentet, står den gamle ID-en att |
| Nynorsk | Feltnamn og ID-ar er nynorsk utan æ, ø og å (`laekje`, `royst`, `snogg`). Verdiar som namn, tekst og replikkar står med full skrivemåte |

### ID-ar

| Slag | Regel | Døme |
| --- | --- | --- |
| Allmenn regel | Små bokstavar, æ blir ae, ø blir o, å blir aa, mellomrom og bindestrek blir understrek | Rømmegraut: `rommegraut` |
| Oppslag i Ordboka | Oppslagsordet etter regelen, med tal om to oppslag har same ord | `heim`, `kaka`, `mjolk` |
| Skjermar og rom | ID-en frå Kart og rom, som han står | `ASN-01a`, `UBR-07` |
| Kister | ID-en frå Kart og rom | `K-ASN-03a-1` |
| Ventekister | ID-en frå Varer og kister | `VK01` |
| Ting og utstyr | ID-en frå Varer og kister der han finst, elles allmenn regel | `flatbrod`, `fora_vadmalskappe` |
| Scener | `s` og nummeret med understrek | `s1_3`, `s2_24b`, `s0_1` |
| Sideoppdrag | Nummeret med understrek | `S1_28`, `S2_12b` |
| Trekk | ID-en frå Trekka til orda | `alle`, `gjennom` |
| Lydeffektar | ID-en frå fana Lydeffektar | `sfx.kamp.segl` |
| Flagg | Kva flagget gjeld, med scene eller oppdrag først | `s1_17_heimr_skrive`, `S1_28_val` |

## Filene

```
data/
  ord/oppslag.json          dei 527 oppslaga
  ord/familiar.json         lydfamiliane med regel, verknad og Røyst
  ord/trekk.json            dei 21 trekka
  ord/kapittel.json         dei 14 kapitla med plassar og løn
  ord/lydtre.json           greiner og nodar
  figurar/figurar.json      spelbare figurar, vekst og ressurs
  figurar/evner.json        evner, kommandoar, samspel, feltevner
  fiendar/familiar.json     dei 61 familiane med grunnform
  fiendar/vanlege.json      dei 452 variantane
  fiendar/namngjevne.json   fiendane frå bestiaria for dyr, fabeldyr og menneske
  fiendar/bossar.json       bossar med fasar
  fiendar/mote/<epoke>.json møtesoner og grupper
  verda/stader/<fane>.json  skjermar, rom, utgangar, kister, butikkar, kvile
  verda/verdskart.json      knutepunkt og samband
  verda/villmarker.json     etappar, lag og stadminne
  ting/ting.json            mat, lækjing, verneskikkar, salsvarer
  ting/utstyr.json          utstyr med plass, kven og verdi
  ting/butikktypar.json     butikktypane og kva dei alltid sel
  ting/ventekister.json     VK01 til VK14 med innhald for T1 til T4
  system/statusar.json      statusane
  system/kurver.json        nivåtabellar, røynslekurve, tal for fiendar
  system/epokar.json        epokar, år, tidene T1 til T4
  system/flagg.json         alle flagg med standardverdi og kven som set og les dei
  lyd/sfx.json              lydeffektane
  manus/scener/<del>.json   scenene i hovudhistoria
  manus/sideoppdrag.json    sideoppdraga
  manus/dagboka.json        dagbokssider og spor
  hand/                     verdiar som ikkje står i dokumentet
```

## Einingane

Tabellane viser dei viktigaste felta. Agenten kan leggje til felt når kjelda har meir, og skal skrive dei inn i denne fana etterpå.

### Oppslag i Ordboka

Kjelde: Ordlista kapittel 1 til 14, Trekka til orda, Magisystemet, Ordboka. Prototypen har felta `fam`, `aasen`, `former`, `norront`, `dansk`, `tyding`, `verknad`, `mot` og `tekst`. Modellen held på dei som passar.

| Felt | Type | Innhald |
| --- | --- | --- |
| id | tekst | `heim` |
| nr | tekst | Nummeret i ordlista, `1.01` |
| kapittel | tal | 1 til 14 |
| oppslag | tekst | Oppslagsforma i Aasen-normal, `heim` |
| ordklasse | tekst | `m.`, `f.`, `n.`, `adv.` og så bortetter |
| fam | tekst | Lydfamilien til hovudforma: `diftong`, `hard`, `kv`, `j`, `smaa`, `grunn`, `nokkel` |
| trekk | tekst eller null | ID frå trekka. Null for grunnord og nøkkelord |
| former | liste | Kvar form med `form`, `fam` (familien følgjer forma), `stad`, `kven`, `aar`, `scene`, `dansk` (sann eller usann) og `kjelde_tekst` |
| tyding | tekst |  |
| norront | tekst eller null |  |
| dansk | tekst eller null |  |
| kjelde\_i\_spelet | liste | Scener og oppdrag der ordet kjem, som ID-ar |
| hove | tekst | Høvesbonusen som tekst, og `hove_merke` som liste over tydingsmerke når dei kan tolkast |
| rotform | objekt eller null | Forma og talet på former som trengst |
| felt | tekst eller null | Bruk utanfor kamp, som `leit` eller `laekje` |

Formene står i fri tekst i ordlista, til dømes «heim (Åsen, mor, 1816; far, 1826); Heimr (ekkoet på setra, 1820)». Skriptet deler på semikolon utanfor parentes og prøver å lese stad, talar, år og scene. Det som ikkje passar, står berre i `kjelde_tekst`.

### Lydfamiliar og trekk

| Fil | Felt |
| --- | --- |
| familiar.json | `id`, `namn`, `evne` (vern, åtak, avsløring, lindring, raske), `royst_dialekt`, `royst_rot`, `ande` (kva kvar Ande gjev), `farge`, `teikn` (eit symbol i tillegg til fargen, sjå Grafikk og stil), `regel` |
| trekk.json | `id`, `namn`, `verknad_tekst`, `verknad_prosent`, `royst_tillegg`, `passar_til` (liste over familiar), `ande_regel`, `sfx` |

Fargane i prototypen (`#f8d840` for diftongar og så bortetter) blir verande.

### Figurar og evner

Kjelde: Figurar Aasen til Ravdna, Figurar Collett til jotunen, Nivå, eigenskapar og utstyr.

| Felt | Innhald |
| --- | --- |
| id | `aasen`, `unge_ivar`, `tussen`, `huldra`, `vinje` og så bortetter |
| namn, kort\_namn |  |
| blir\_med | Scene og nivåregel frå tabellen «Nivå når figurane blir med» |
| profil | Faktorane for Liv, Røyst, Kraft, Ordkraft, Herdsle, Tole, Snøggleik og Lukke |
| vekst | Tabellen for nivå 1 til 70, eller ein tilvising til `kurver.json` |
| meny | Kommandoane i rekkjefølgje, som ID-ar til `evner.json` |
| ressurs | Den eigne ressursen: `id`, `namn`, `maks`, `ikon` |
| ordplassar | Kor mange, kva ord figuren tek (hugsa, skrivne eller begge) og eigenarten |
| feltevne | ID-ar |
| utstyr | Kva plassar figuren kan bruke og kva slag ting |
| portrett, kartfigur | Filnamn |

Evner har `id`, `figur`, `namn`, `kostnad`, `verknad_tekst`, `laert` (nivå, scene eller oppdrag), `type` (kommando, evne, samspel, hugmaalar, feltevne) og `aatferd` når evna treng eigen kode.

Prototypen brukar `hp`, `rost`, `atk`, `def` og `spd`. Modellen brukar namna i dokumentet: `liv`, `royst`, `kraft`, `ordkraft`, `herdsle`, `tole`, `snogg`, `lukke`.

### Fiendar

Kjelde: 9a. Bestiarium: vanlege fiendar, bestiaria for dyr, fabeldyr og menneske, Bestiarium: oversikt, Fiendar og bossar, Superbossar.

| Felt | Innhald |
| --- | --- |
| id | Allmenn regel frå namnet: `kraaka_paa_boen` |
| namn |  |
| familie | ID i `fiendar/familiar.json` for vanlege fiendar, eller familien i bestiaria |
| grunnform | ID-en til grunnforma når fienden er ein variant. Grafikken er då fargebytte av grunnforma |
| kvar\_og\_naar | Liste over sone-ID-ar og epokar når dei kan tolkast, og `kjelde_tekst` |
| trinn, niva |  |
| liv |  |
| segl | Tal og slag: `{ "tal": 4, "slag": ["tust", "tust", "rim", "rim"] }` |
| sarbar | Liste: lydfamiliar, trekk, verneskikkar, ting, tydingsmerke |
| driv, mot | For dyr |
| monster | Regelteksten frå kolonnen Mønster |
| start | Tilfeldig, Synleg, Samtale, Historie, Unntak |
| ordboka | Ordet og lina fienden gjev |
| gull | Sann for gullfiendar, med `knep` og `lon` |
| aatferd | ID for fiendar med særreglar som treng eigen kode |
| bilete | Filnamn, eller grunnforma med palett |

Bossar har i tillegg `fasar` med `liv`, `segl`, `sarbar` og `monster` per fase, `tilraadd_niva`, `scene` eller `oppdrag`, `lon` og `sfx`.

### Møtesoner

Kjelde: 9b, 9c og 9d. Kvar sone har ein overskrift, ei line med møterate og nivå, og ein tabell med kolonnene Gruppe, Fiendar, Vekt og Formasjon.

| Felt | Innhald |
| --- | --- |
| id | Allmenn regel frå fila og overskrifta |
| namn | Overskrifta |
| skjermar | Skjerm-ID-ar i Kart og rom som sona dekkjer. Skriptet finn dei ved å samanlikne namn. Det som ikkje passar, går i rapporten |
| epoke |  |
| moterate | Ingen, Låg, Vanleg, Høg, Svært høg |
| niva |  |
| grupper | Liste med `fiendar` (ID og tal), `vekt`, `formasjonar` og `sjeldan` |

### Stader, skjermar og rom

Kjelde: Kart og rom med dei ni underfanene. Kvar fane har skjermtabellar, dungeontabellar, kistetabellar og tabellar for butikkar og kvile.

| Eining | Felt |
| --- | --- |
| Stad | `id` (koden på tre bokstavar), `namn`, `fane`, `storleik`, `skildring` |
| Skjerm | `id`, `stad`, `namn`, `innhald_tekst`, `scener` (scene-ID-ar frå parentesane i «Kva som er der»), `utgangar` (liste over skjerm-ID-ar, `verdskartet` eller ein namngjeven stad i ei anna fane), `epokar` |
| Rom i dungeon | Som skjerm, med `dungeon`, `lag` og merke for `kvile`, `snarveg`, `boss` og `gaate` |
| Kiste | `id`, `skjerm`, `behaldar`, `innhald` (liste med ting-ID og tal, eller pengar i skilling), `tid` (T1 til T4), `ventekiste` (VK-ID eller null), `merknad` |
| Butikk og kvile | `skjerm`, `type` (ID i butikktypar.json eller `kvile`), `kven`, `ekstra` (ting-ID-ar), `tid` |

Utgangar som peikar til ein stad i ei anna fane, står med namn i dokumentet («Villmark V2, inngangsvarden»). Skriptet slår opp namnet og skriv ID-en. Stader som står i to faner (tabellen «Stader som står i to faner» i Kart og rom), blir éin skjerm med ID-en frå fana som eig han, og den andre ID-en står som `alias`.

Kartet sjølv, med fliser, bygg og folk, finst berre i prototypen for Ørsta og blir laga av den som byggjer. Skjermfila er skjelettet som kartet blir bygt på, og kartet i prototypen-formatet (`rader`, `bygg`, `dorer`, `folk`) blir eit felt `kart` på skjermen når det finst.

### Ting og utstyr

Kjelde: Varer og kister, Nivå, eigenskapar og utstyr kapittel 6.

| Fil | Felt |
| --- | --- |
| ting.json | `id`, `namn`, `pris` (i skilling), `verknad_tekst`, `verknad` (tolka når det går), `forste_butikk`, `slag` (mat, laekjing, vern, gaave, sal) |
| utstyr.json | `id`, `namn`, `plass` (reiskap, klede, hovud, lomme), `kven` (figur-ID-ar), `verdi` (`slag`, `ord`, `vern`, `tole`), `saereige`, `pris`, `stad_og_tid`, `kistefunn` |
| butikktypar.json | `id`, `namn`, `kvar`, `alltid`, `fraa_T2`, `fraa_T4` |
| ventekister.json | `id`, `skjerm`, `grunn`, `line`, `innhald` per tid T1 til T4 |

Pengar står i skilling i alle felt. 1 speciedalar er 120 skilling, slik Nivå, eigenskapar og utstyr seier under Speciedalar og skilling.

### Statusar, kurver og epokar

| Fil | Felt |
| --- | --- |
| statusar.json | `id`, `namn`, `verknad_tekst`, `loftast_med`, `god` (sann eller usann), `sfx`, `ikon` |
| kurver.json | Tabellane frå Nivå, eigenskapar og utstyr: vekst per figur, røynslekurva, Røyst-skalaen, tal for fiendar per nivå |
| epokar.json | `id`, `namn`, `fraa`, `til`, `tid` (T1 til T4), stemning |

### Scener

Kjelde: Manus del 1 til 7 og Sideoppdrag 1 og 2. Scenene har ei fast form som skriptet kan lese:

```
### Scene 1.3: Tussen i båsen

Stad og tid: Fjøset på Åsen, julekvelden 1820
Med: Ivar, tussen
Spel: Utforsking i mørkret. Tussen blir med i partyet.

(Regi i parentes.)

IVAR: Replikk.
TUSSEN: (regi) Replikk.

Utfall: ...
Overgang: ...
```

Agenten lagar éi rå scene per scene i manus:

| Felt | Innhald |
| --- | --- |
| id | `s1_3` |
| namn | `Tussen i båsen` |
| del | 1 til 7, eller `S1` og `S2` for sideoppdrag |
| stad\_tekst, tid\_tekst | Frå «Stad og tid» |
| skjerm | Skjerm-ID frå Kart og rom der scena står i parentes, elles null |
| aar | Året |
| med | Figur-ID-ar |
| spel | Teksten frå «Spel» |
| steg | Liste i rekkjefølgje: `{ "s": "Tussen", "t": "Grauten." }` for replikkar, `{ "regi": "..." }` for regi i parentes, `{ "kamp": "musekongen" }` når regien seier at ein kamp byrjar og bossen kan finnast |
| utfall\_tekst | Teksten frå «Utfall» |
| ord | Ord-ID-ar som utfallet gjev |
| ting | Ting-ID-ar som utfallet gjev |
| flagg\_set, flagg\_les | Flagg som scena set eller les |
| overgang\_tekst | Teksten frå «Overgang» |
| neste | Scene-ID-en som kjem etter, når overgangen seier det |

Replikkane blir steg i same form som scenemotoren i prototypen brukar (`s`, `t`, `kjensle`). Regien blir ikkje gjord om til registeg som `gaa` og `snu`. Det gjer den som byggjer scena. Markeringane `⟪ord⟫`, `⟨...⟩` og `⟦...⟧` står som dei er i teksten.

### Flagg

`system/flagg.json` har alle flagg som manus, sideoppdrag og kartfanene nemner. Kvart flagg har `id`, `standard`, `set_av` (scener og oppdrag) og `lese_av`. Det er dette registeret som gjer at hovudhistoria kan byggjast før sideoppdraga: eit flagg som eit sideoppdrag set, har ein standardverdi frå starten, og historia les han.

### Dagboka og spor

`manus/dagboka.json` har dagbokssidene frå manus med `id`, `dato`, `stad`, `tekst` og kvar sida kjem. Spora har `id`, `namn`, `epoke`, `tilraadd_niva`, `opnar_seg` (scene eller flagg) og `scener`.

## Sjekken

Sjekkskriptet skal finne:

- ID-ar som står meir enn éin gong i same eining.
- Tilvisingar til noko som ikkje finst: ord i ein scene, ting i ei kiste, fiendar i ei møtegruppe, skjermar i ei utgang, scener på ein skjerm, lydar i ei eining.
- Utgangar som berre går éin veg der dokumentet ikkje seier at det er meint.
- Oppslag i Ordboka som ingen scene, fiende eller stad gjev.
- Scener som ingen skjerm har.
- Møtesoner utan skjerm og skjermar med kampar utan møtesone.
- Kister med ting som ikkje høyrer til tida (T1 til T4) eller regionen etter reglane i Varer og kister.
- Tal som ikkje stemmer med summane i dokumentet: 527 oppslag, 61 familiar med 452 variantar, 625 skjermar, 498 rom, 462 kister og 219 rader med butikkar og kvile.

## Rapporten

Rapporten er éi markdownfil, `data/rapport.md`, med fire bolkar: tal på einingar per fil, det skriptet ikkje kunne tolke (med fil og line), brotne tilvisingar, og motseiingar mellom faner. Rapporten skal vere skriven slik at kvar line kan rettast i dokumentet.

## Kvar kjeldene ligg

Fanene finst som markdown i eksporten av dokumentet. Når agenten ikkje har eksporten, kan han lese fanene med verktøyet for Claude Docs. Namna på fanene står i lista under.

| Eining | Fane |
| --- | --- |
| Oppslag | Ordlista: kapittel 1 til 3, 4 til 7, 8 til 10 og 12, 11, 13 og 14 |
| Familiar, trekk, galdr | Magisystemet, Trekka til orda, Ordboka |
| Figurar | 3. Figurar: Aasen til Ravdna, 4. Figurar: Collett til jotunen |
| Kurver, utstyr | 2. Nivå, eigenskapar og utstyr |
| Statusar, kampreglar | 1. Grunnsystemet |
| Fiendar | 5. Fiendar og bossar, 6 til 9a Bestiarium, 10. Superbossar |
| Møtesoner | 9b, 9c og 9d Møtetabellar |
| Ting, butikkar, kister | 13. Varer og kister |
| Skjermar og rom | Kart og rom med dei ni underfanene |
| Verdskartet, reiser | 12. Verda og reisene, Korleis verda er bygd under Verda |
| Villmarker | Villmarkene under Verda |
| Scener | Manus del 1 til 7, Sideoppdrag 1 og 2 |
| Lydar | Lydeffektar under Produksjon |
