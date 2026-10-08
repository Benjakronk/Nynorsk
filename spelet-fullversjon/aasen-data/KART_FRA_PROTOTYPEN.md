# Frå prototypen til datamodellen

Lista viser kva i js/rpg/data.js (window.RPGData) som svarar til kva i datafilene under data/. Ho er skriven for den som flyttar prototypen over. Prototypen er ikkje endra.

Prototypen dekkjer kapittel 1 (Ørsta 1826 til 1831). Datafilene dekkjer heile dokumentet. Mykje i data.js er difor ein liten del av ei større fil, og nokre ID-ar har fått ny form etter ID-reglane i fana Datamodell.

## Konstantane i data.js

| data.js | Datamodellen | Merknad |
| --- | --- | --- |
| FAMILIAR | data/ord/familiar.json | Sjå tabellen over lydfamiliane under |
| ORD | data/ord/oppslag.json | Sjå tabellen over orda under |
| U (utsjånad per person) | Ingen datafil | Utsjånaden står ikkje i dokumentet. Han høyrer heime i data/hand/ eller i koden til figurteikninga |
| POSAR | Ingen datafil | Del av scenemotoren |
| PORTRETT, PORTRETT_KJENSLER | Feltet portrett i data/figurar/figurar.json | Feltet er null. Filnamna står berre i prototypen og høyrer heime i data/hand/figurar/figurar.json. Grafikk og stil har lista over kven som får kjensleportrett |
| STEMNINGAR | Feltet stemning i data/system/epokar.json | Epokefila har stemninga som tekst frå Grafikk og stil. Tala for fargerekninga står berre i prototypen og høyrer til koden |
| LYSKJELDER | Ingen datafil | Grafikk og motor |
| KART | Feltet kart på skjermane i data/verda/stader/orsta_og_sunnmore.json | Sjå tabellen over karta under. Skjermfila er skjelettet. Rader, bygg, dorer og folk blir lagde på som feltet kart |
| EKSTRA_MERKE | Feltet kart på skjermen | Høyrer saman med kartet |
| STADER (tom) | data/verda/verdskart.json | Knutepunkta VDK-01 til VDK-49 og sambanda |
| FIENDAR | data/fiendar/vanlege.json, namngjevne.json og bossar.json | Sjå tabellen over fiendane under |
| PARTI | data/figurar/figurar.json | hp, rost, atk, def og spd heiter liv, royst, kraft, herdsle og snogg i modellen. Veksten står i feltet profil og i data/system/kurver.json (vekst og eigenskapar_per_niva) |
| EVNER (kulokk, huldrelokk) | data/figurar/evner.json | Huldrelokk er huldra_huldrelokk (hugmålar-evne). Kulokk står ikkje som evne i dokumentet. Lokkerop som kulokk står i Grunnsystemet under Minne og blekk |
| TING | data/ting/ting.json | flatbrod, kaffi og luktesalt har same ID. romegraut heiter rommegraut. Prisane og verknadene i dokumentet er andre enn i prototypen (flatbrød 2 s og 25 prosent Liv) |
| NOKKELTING | data/ting/ting.json med slag veska | Ordboka, prestenokkel, stabburnokkel og sagabok står ikkje i tabellane i dokumentet |
| GAAVER (gåver frå kurset) | Ingen datafil | Gåvene står ikkje i dokumentet |
| KAPITTEL | data/ord/kapittel.json og data/system/epokar.json | Kapitla i Ordboka er 14 regionar, ikkje kapitla i prototypen. Epokane er laga i Verda |
| STEVGALDR | data/figurar/evner.json (stevjing) og data/ord/oppslag.json | Steinstevet og Tungestevet står ikkje som tabell i dokumentet |
| SCENER | data/manus/scener/del1.json | Sjå tabellen over scenene under |
| MANUS (samtalar per person og merke) | Ingen datafil | Samtalane med folk på kartet står ikkje som tabell i dokumentet. Dei høyrer til kartet på skjermen |
| harOrd, talOrd, valt, HAUG_* | Ingen datafil | Kode. Vala i manus er flagg i data/system/flagg.json, til dømes s1_2_val |

## Lydfamiliane

| FAMILIAR | ord/familiar.json | Felta |
| --- | --- | --- |
| diftong | diftong | evne Vern blir vern. rost 3 svarar til royst_dialekt og royst_rot, som er spenn i dokumentet |
| hard | hard | evne Åtak blir aatak |
| sporjeord | kv | Namnet Spørjeorda er Kv-ord i dokumentet |
| j | j | evne Lindring blir lindring |
| smaaord | smaa | evne Raske galdrar blir raske |
| nokkel | nokkel | evne er null. Dokumentet seier «Legendariske evner» |
| (manglar) | grunn | Grunnord er ein ny familie i dokumentet |

farge flyttar til data/hand/ord/familiar.json. tekst svarar til evne_tekst og regel. hint, sterk og kvifor er kode og følgjer regelrekkja i feltet regel.

## Orda

ORD har 26 ord. Alle utanom vita og mat finst i ordlista med same ID. Felta svarar slik:

| ORD | oppslag.json |
| --- | --- |
| fam | fam (sporjeord blir kv, smaaord blir smaa) |
| aasen | oppslag |
| former (liste av tekst) | former, liste av objekt med form, fam, stad, kven, aar, scene, dansk og kjelde_tekst |
| norront | norront |
| dansk | dansk |
| tyding | tyding |
| verknad | Ingen. Verknaden kjem av fam og trekk, og formlane står i koden |
| mot | trekk_mot (for trekket Rammar) og hove |
| felt | felt (null, sjå rapporten) |
| tekst | verknad_tekst på trekket i ord/trekk.json |

| ORD-id | Nr i ordlista | Merknad |
| --- | --- | --- |
| stein, heim, kaka, gata, bok, kvat, kven, kvar, snjo, mjolk, eg, ikkje, berre | 1.05, 1.01, 1.06, 1.54, 1.53, 1.39, 1.14, 1.13, 1.09, 1.08, 1.35, 1.58, 1.57 | Kapittel 1 |
| draum | 1.55 | |
| auga | 13.24 | Kapittel 13 i ordlista |
| hoyra | 6.11 | Kapittel 6 |
| heilag | 6.45 | |
| laus | 10.17 | |
| ljos | 11.05 | |
| maal, tunga, hugsa, minne | 14.08, 14.02, 14.01, 14.09 | Nøkkelord |
| vita, mat | Finst ikkje | Ordlista har vit (13.07) og vitne (8.34), men ikkje vita eller mat |

## Fiendane

| FIENDAR | Datamodellen | Merknad |
| --- | --- | --- |
| haugbonden | fiendar/namngjevne.json: haugbonden | |
| kyrkjegrimen | fiendar/bossar.json: kyrkjegrimen_i_orsta_kyrkje | Superboss (løynd) |
| protokollen | fiendar/bossar.json: protokollen | |
| blekklatten | Finst ikkje | Blekklatten står i Grafikk og stil og i Menyar og kontrollar, men ikkje i bestiaria eller bosslista |
| blekkdrope, blekkflekk | Familien blekkdropane i fiendar/familiar.json | Variantane har namn etter staden |
| fjorpennen, stempelet, vette, irrbloss, rotte, svermrotte, rottemor | Finst ikkje med desse namna | Næraste familiar: rottene, runevettane, blekkdropane |

hp, atk, def og spd blir liv og tala i data/system/kurver.json (fiendar_per_niva). xp og pengar blir rekna i koden etter kurva. fall (drop) står ikkje i dokumentet. spesial blir aatferd (ID) og regel (teksten frå kolonnen Mønster).

## Karta

| KART | Skjerm i Kart og rom |
| --- | --- |
| asen | ASN-01 Tunet på Åsen |
| asen-stova | ASN-01a Stova |
| asen-stabbur | ASN-03a Stabburet |
| minne-far (Bøen på Åsen) | ASN-05 Bøen og sommarenga |
| utmarka | SET-01 til SET-03 (Åsen-setra) |
| bygda (Hovdebygda) | HVD-01 Bygdevegen i Hovdebygda |
| kyrkja (Hovdekyrkja) | ORV-02a Kyrkjerommet. Dokumentet kallar kyrkja Ørsta kyrkje |
| kyrkje-galleri | Ingen eigen skjerm. Næraste er ORV-02b Tårntrappa |
| kyrkje-tarn | ORV-02c Klokkerommet |
| prestegarden | VOL-02b Prestegarden (i Volda) |
| kontoret, arkivet | VOL-02c Arkivet |
| nedre-hovde | HVD-02a Røykstova på Hovden er næraste |
| vegen (Vegen til Ekset) | VOL-01 Eidet |
| ekset | EKS-01 Tunet på Ekset |
| ekset-stova | EKS-01a Biblioteket |

Den som byggjer, set kartet frå prototypen som feltet kart på skjermen, til dømes data/hand/verda/stader/orsta_og_sunnmore.json med ein post per skjerm. Merke og dører (dorer med til) må få skjerm-ID-ane over.

## Scenene

Prototypen har eigne scener for kapittel 1. Manus i dokumentet har andre scener og andre år. Lista viser den næraste scena.

| SCENER | Scene i manus | Merknad |
| --- | --- | --- |
| heime | s1_4 Far (stova og fjøset på Åsen, 1826) | Same år og stad |
| minne_far | s1_2 Tunet og setra (Åsen og setra, 1820) | Faren og setra |
| framande, framande2 | Finst ikkje | Ingen scene i manus svarar til desse |
| skiftebrev, stabburet, rotta, rottesverm | Finst ikkje | |
| presten, skammen | s1_5 «Man siger jeg» (prestegarden i Volda, 1828) | Skam kjem i 1.5 |
| huldra | s1_17 Kvinna i snøen (Solnør, 1841) | Huldra blir med på Solnør i 1841 |
| haugbonde, tenar, blekklatten, kyrkjegrimen | Finst ikkje som scener i manus | Kyrkjegrimen er ein løynd superboss |

Stega i prototypen (s, t, kjensle) er same form som replikkane i dei rå scenene. Regien i manus står som { regi } og blir ikkje gjord om til registeg som gaa og snu. kjensle står ikkje i manus.
