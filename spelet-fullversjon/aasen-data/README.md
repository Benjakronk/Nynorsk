# Datafilene til Aasen-spelet

Mappa har importen som lagar datafilene til spelet frå designdokumentet, datafilene sjølve, ein lastar i JavaScript og ein sjekk. Arbeidet følgjer fana «5. Datamodell» under Produksjon.

## Innhald

| Sti | Kva det er |
| --- | --- |
| tools/importer.py | Importen. Les eksporten av dokumentet og skriv data/ |
| tools/sjekk.py | Sjekken. Les data/ og skriv data/rapport.md |
| data/ | JSON-filene, laga av importen |
| data/hand/ | Verdiar som ikkje står i dokumentet. Tom no. Sjå data/hand/README.md |
| data/rapport.md | Rapporten frå importen og sjekken |
| data/importlogg.json | Det importen ikkje kunne tolke, i maskinlesbar form. Sjekken brukar fila når han skriv rapporten |
| data/filer.json | Lista over datafilene. Lastaren les henne først |
| js/rpg/last.js | Lastaren til spelet |
| KART_FRA_PROTOTYPEN.md | Kva i prototypen (js/rpg/data.js) som svarar til kva i datafilene |

## Køyre importen

Skripta treng Python 3 og berre standardbiblioteket.

```
python3 tools/importer.py "/sti/til/Aasen-spelet designdokument"
```

Argumentet er mappa med markdown-eksporten av dokumentet, med éi fil per fane. Importen skriv alle filene under data/ på nytt, flettar inn filene i data/hand/ og køyrer sjekken til slutt. Med `--ut <mappe>` skriv han til ei anna mappe enn data/.

Importen gjev same resultat kvar gong for same kjelde. Han skriv ingen dato eller klokkeslett i filene. Han endrar ikkje eksporten.

## Køyre sjekken

```
python3 tools/sjekk.py data
```

Sjekken skriv tala til skjermen og heile rapporten til data/rapport.md. Han returnerer 1 om ein ID står to gonger i same eining, og elles 0. Brotne tilvisingar og andre funn står i rapporten.

Sjekken finn:

- ID-ar som står meir enn éin gong i same eining.
- Tilvisingar til noko som ikkje finst: ord, ting, fiendar, skjermar, scener, flagg, figurar, evner og lydar.
- Utgangar som berre går éin veg. Utgangar merkte som snarveg eller stengde, og skjermar der teksten seier at vegen lukkar seg, blir hoppa over.
- Oppslag i Ordboka som ingen scene, fiende eller stad gjev.
- Scener utan skjerm, møtesoner utan skjerm og skjermar med tilfeldige kampar utan møtesone.
- Kister med ting frå ei seinare tid enn kista, og ting over nivået i sona etter tabellen i Varer og kister.
- Tal som ikkje stemmer med kontrollsummane i fana Datamodell.

## Bruke lastaren

```html
<script src="js/rpg/last.js"></script>
<script>
  Spelsdata.last("data/").then(function (d) {
    var tunet = Spelsdata.finn("skjerm", "ASN-01");
    var ord = d.ord.oppslag;
  });
</script>
```

Lastaren hentar data/filer.json og så kvar fil med fetch. Resultatet er eitt objekt med same oppbygnad som mappene, til dømes d.verda.stader.christiania.skjermar og d.manus.scener.del1. Spelsdata.finn slår opp på ID i einingane oppslag, lydfamilie, trekk, figur, evne, fiende, boss, ting, utstyr, status, flagg, sfx, sone, scene, oppdrag, stad, skjerm og kiste. Ein skjerm kan òg finnast på alias-ID-en sin.

## Korleis importen les dokumentet

Importen les tabellane der dei finst og fri tekst berre der det ikkje finst tabell. Når eit felt er tolka frå fri tekst, står originalteksten ved sida av i eit felt som sluttar på `_tekst` eller heiter `kjelde_tekst`. Kvar post har feltet `kjelde` med fil og line i eksporten.

Verdiar som ikkje står i dokumentet, er null. Det som ikkje kunne tolkast, står i rapporten med fil og line. Motseiingar mellom fanene står òg der. Importen rettar ingenting i dokumentet.

Formlane (skade, røynsle, Røyst-skala, vekst) blir ikkje rekna ut. Teksten til formlane står i data/system/kurver.json, og tabellane står slik dokumentet har dei.

Nokre val er gjorde i importen:

- Lydfamilien til kvar form av eit oppslag (former[].fam) er rekna med regelrekkja i Magisystemet. Familien på oppslaget er den som står i ordlista.
- Stad, talar, år og scene for kvar form er lesne frå parentesen etter forma. Det som ikkje passar, står berre i kjelde_tekst.
- Ivar i Med-lina på ei scene blir figuren unge_ivar når scena er frå 1831 eller tidlegare, og aasen elles.
- Flagga har ikkje namn i dokumentet. Kvart val i manus gjev eit flagg `<scene>_val`. Tilvisingar som «val B i S1.28» i manus og kartfanene blir lesne som at staden les flagget.
- Scenene i sideoppdraga får ID-en til oppdraget med eit løpenummer (S1_1_1). I S2 står nummeret i manus (S2.1.1 blir S2_1_1). Samtalane undervegs heiter S1_samtale_1 og så bortetter.
- Ei møtesone blir kopla til skjermane i den bolken i kartfana der namnet på sona står i hermeteikn. Når lina nemner skjerm-ID-ar før namnet, gjeld sona berre dei.
- Ei sone utan årstal i overskrifta har ukjend epoke og ligg i data/fiendar/mote/utan_epoke.json.
- Skjermar som står i to faner (tabellen i Kart og rom), er éin skjerm med ID-en frå fana som eig han. Den andre ID-en står i feltet alias.
- Tida T1 til T4 på epokane er sett etter åra i tabellen Tidene i Varer og kister.

## Tillegg til datamodellen

Fana Datamodell seier at nye felt skal skrivast inn i fana. Desse felta og filene er lagde til og bør førast inn der:

| Fil | Nye felt eller verdiar |
| --- | --- |
| ting/ting.json | salspris for salsvarer, slag veska for ting frå manuset og løn frå villmarkene, tid (første tid tingen finst), ny (merket Ny i Status) |
| ting/utstyr.json | kven_regel (alle, alle_menn, alle_som_kan_bere_skrift), utanom, gaave, tid og ventekiste for kistefunn, villmarksloen |
| ting/butikktypar.json | kvile_pris, og tekstfelt for det som ikkje er ting |
| ting/kistereglar.json | Ny fil: kor mange kister per slag stad, kva kistene inneheld, og kva ting som høyrer til kvart nivå |
| ord/familiar.json | evne_tekst, regel_nr, regel_doeme, oppslag_tal, sfx |
| ord/trekk.json | royst_tillegg_gjeld (kv og smaa), typiske_tydingar |
| ord/oppslag.json | trekk_mot (eld for Rammar (eld)), trekk_grunn, ny_kjelde, fam_etter_regelen når regelen gjev ein annan familie |
| ord/kapittel.json | merke (Halvt, Fullt, Kjent) og rangar |
| ord/lydtre.json | greiner, nodar med pris og krav, meistring |
| system/statusar.json | gruppe (grunn eller fleire_kampar) |
| system/epokar.json | tider (T1 til T4 med år og nivå) |
| figurar/figurar.json | hugmaalar, prolog_meny, berre_prologen (Rasmus) |
| figurar/evner.json | under (kommandoen evna høyrer til), laert_scener |
| fiendar/*.json | lynne_tekst, hovudfamilie, fiendeark (teksten under Fiendeark), knep og lon for gullfiendar, start_andre |
| fiendar/bossar.json | slag (boss, sideoppdrag, villmark, superboss, mindre_kamp), party_tekst, villmark, slutt |
| fiendar/mote/*.json | stader, moterate_tekst, synleg_tekst, etter_forste_kampen_tekst |
| verda/stader/*.json | omraade (bolken i kartfana), soner, alias, ord (ordnummer i parentes på skjermen) |
| manus/scener/*.json | oppdrag, med_andre, lukking_tekst, opning_tekst, samtale. I steg: regi på ein replikk når regien står først i replikken, val på regi som er eit val |
| manus/sideoppdrag.json | region_og_tid, utloyst, gang_gjennom, omraade |
| system/flagg.json | verdiar (bokstavane i valet), skildring |
| manus/dagboka.json | tittel, etter_scene |

## Det som står att

- Fargar, teikn, portrett, kartfigurar og ikon står ikkje i dokumentet. Dei høyrer heime i data/hand/.
- Karta frå prototypen (Ørsta) er ikkje flytte. Sjå KART_FRA_PROTOTYPEN.md.
- Funna i rapporten må rettast i dokumentet. Etterpå køyrer ein importen på nytt.
