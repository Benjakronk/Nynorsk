---
name: pikselkunst
description: Lag, test og forbetre pikselgrafikk (portrett, figurar, fiendar, fliser) til spelet «Aasen: Språkvandringa» i spel.html. Bruk når ny grafikk skal lagast, eller når eksisterande grafikk skal sjåast over og gjerast betre.
---

# Pikselkunst til «Aasen: Språkvandringa»

Grafikken blir laga i ein fast sløyfe: skriv kjelda, lag biletet, sjå på det,
vurder det mot stilguiden og forbetre. Gjenta til sjekklista er oppfylt.

Større løft skjer i rundar (research, finn det svakaste, teikn, sjekk,
dokumenter). Les `tools/pikselkunst/ARBEIDSLOGG.md` først: han skildrar
kvar runde, og «Står att» viser kvar neste runde bør starte.

## 0. Research

- `python tools/pikselkunst/hent_referansar.py sok "<søk>"` finn bilete på
  Wikimedia Commons. `... konsept <fil> "File:..." "<bruk>"` lastar ned eit
  bilete med fri lisens til `konsept/` og fører det inn i `konsept/KJELDER.md`.
- `... zelda "TMC <namn>.png"` lastar ned skjermbilete frå The Minish Cap til
  `forhand/referansar/` (verna, ikkje i git). Final Fantasy VI: sjå
  `hent_referansar.py`.
- `... ark konsept|referansar [prefiks]` lagar kontaktark å sjå på.

Les først `tools/pikselkunst/STILGUIDE.md`. Målestokken er Blekklatten
(`bilete/spel/blekklatten.png`). Referansar for norsk byggjeskikk, natur og kle
ligg i `tools/pikselkunst/konsept/` (sjå KJELDER.md der). Sjå på dei før du
teiknar noko nytt frå den tida.

## 1. Oppdrag

Skriv ned kva som skal lagast: type (portrett, figur, fiende, flis), storleik
frå stilguiden, kvar det skal brukast, og kva personen eller vesenet skal
uttrykkje.

## 2. Kjelde

Kjelda er alltid ei `.pix`-fil i `tools/pikselkunst/kjelder/` (formatet står
øvst i `tools/pikselkunst/pix.py`). Fem måtar å lage henne på:

- Portrett (48 × 48): skriv ein funksjon for personen i `tools/pikselkunst/portrett.py`
  (eigen silhuett og eit kjenneteikn, sjå STILGUIDE.md), legg han i `PERSONAR`, og køyr
  `python tools/pikselkunst/portrett.py <namn>` (skriv .pix og PNG). `portrett.py ark`
  lagar kontaktark. Sjå portrettet i spelet med
  `skjermbilete.py namn kart=utmarka m=1 "tale=Huldra:Tekst"`.
- Hus: legg huset til i `BYGG` i `tools/pikselkunst/bygg.py` (breidd, høgd, dører
  og vindauge i fliser) og køyr `python tools/pikselkunst/bygg.py <namn>`. Huset
  må ha same fotavtrykk og dør som i kartet, og står i `bygg` på kartet i `js/rpg/data.js`.
  `bakdor=[i]` gir inngang på baksida (bislag). Då ligg døra (`D`) i kartet i
  flisraden rett bak huset, og stien må kome ovanfrå. Hus med grue eller omn inne får
  `pipe=<flisnummer>` (mura steinpipe) og ei røykopning i `ROYK` i `js/rpg/pikslar.js`. Ei ny dørform (breidd, høgd)
  må førast inn i `DORFORM` i `js/rpg/motor.js`, så døra opnar seg rett.
- Nye bilete blir forhåndslasta automatisk når dei står i data.js (bygg, figurar,
  portrett, kampbakgrunnar). Andre bilete må leggjast til i `alleBilete` i `pikslar.js`.
- Inventar inne (sjå `INVENTAR` i skriptet: kyrkja, bondestova og
  embetsmannsheimen med kakkelomn, skatoll, golvur, sofa, bokreolar …):
  `python tools/pikselkunst/inventar.py <namn>`. Står i `bygg` på kartet,
  `over: true` teiknar figuren over alt anna (lysekrona). Inventar med eld får
  flammerute i `ILD` i `js/rpg/pikslar.js` (levande eld teikna oppå biletet).
- Glød rundt ei lyskjelde (eld, ljos, lykt, krone): ei handteikna glødform i
  `tools/pikselkunst/glod.py`, éin funksjon per kjelde med parameteren `r` (flimmerramma).
  Slik lagar du glød for ei ny lyskjelde:
  1. Finn ankeret: der lyset kjem frå, i pikslar på skjermen (nedst midt i elden for inventar
     med `ILD`, midt i biletet elles, eller ein fast stad i flisa). Koordinatane i skriptet er
     relative til ankeret (x mot høgre, y nedover).
  2. Teikn forma i to eller tre trinn (1 ytst, 3 kjernen) med `G.rader` (rad for rad, til dømes
     for ei grue i eit hjørne), `G.profil` (symmetrisk, halvbreidda per rad) og `G.prikk`
     (handplasserte dither-pikslar i kanten, glisne og ujamne, ikkje eit sjakkbrett). Tenk på kva
     lyset treffer: golvet sett på skrå (lågt og breitt), veggen ved sida, bakken under ei lykt.
  3. Teikn to eller tre rammer der forma endrar seg litt (eld meir enn ljos og lykter), og før
     funksjonen inn i `FORMER` med talet på rammer.
  4. `python tools/pikselkunst/glod.py <namn>` skriv `kjelder/lys-<namn>.pix` og
     `bilete/spel/lys/<namn>.png`, og `forhand/lys-ark.png` viser alle rammene.
  5. Før kjelda inn i `LYSKJELDER` i `data.js` (`rammer` og `rekkje`, rekkjefølgja i
     flimmeret med 150 ms per steg) og i `lyskjelder()` i `motor.js` (kva bygg eller flis som
     lyser, og kvar ankeret er). Biletet blir forhåndslasta av seg sjølv.
  6. Sjå forma i spelet (`skjermbilete.py`), i alle stemningane ho kan lyse i. Fargane til
     trinna står i `glod` i `STEMNINGAR`.
- Møblere med bord, benk og stol (bondestova). Kvart møbel er eit eige bilete, så eit rom kan
  setjast saman på fleire måtar. `x`, `y` er øvre venstre flis, `h` talet på flisrader, og breidda
  er (biletbreidd - 8) / 16 fliser. Alle rutene møbelet dekkjer, skal vere `(` (fast golv) i `rader`.

  | Bilete (`bilete/spel/bygg/`) | Fliser (b × h) | Merknad |
  | --- | --- | --- |
  | `inne-langbord` | 4 × 2 | liggjande, utan stolar |
  | `inne-langbord-staande` | 2 × 4 | ståande (på langs nedover) |
  | `inne-benk`, `inne-benk-kort` | 4 × 1, 2 × 1 | liggjande benk utan rygg |
  | `inne-benk-staande`, `inne-benk-staande-kort` | 1 × 4, 1 × 2 | ståande benk |
  | `inne-kubbestol-ned`, `-opp`, `-venstre`, `-hogre` | 1 × 1 | retninga den som sit, ser; ryggen er bak |

  Bordplata ligg 14 pikslar over golvet og dekkjer heile fotavtrykket, så bordet går 14 pikslar opp
  i flisrada bak. Ein benk bak bordet blir difor gøymd av bordet (berre den som sit der, syner, frå
  livet og opp). Ein benk framfor bordet, kubbestolar ved endane (stolen ser mot bordet) og ståande
  benker langs sida av eit ståande bord syner godt. Døme: `asen-stova` i data.js.

  Sitjande: ein person med `pose: "sitje"` på ei rute som eit sete dekkjer (`SETE` i
  `js/rpg/pikslar.js`), blir lyft opp på setet og teikna utan skugge på golvet, utan
  pikselforskyvingar i kartet. Ein stol med `retning` snur den som set seg (og folk i kartet utan
  `retning`) same vegen. Den som sit, blir sortert etter den nedste flisrada til setet, så han
  sit oppå ein ståande benk. `fram: true` (stolen sett bakfrå, `inne-kubbestol-opp`)
  teiknar stolen over den som sit, så ryggen dekkjer nedre del av han. Nye stolar og benker
  må førast inn i `SETE` med `hogd` (setehøgd i pikslar, 5 for bondemøblane). `inne-stol` på Ekset
  står ikkje der: ryggen er så høg at han ville gøyme heile den som sit.
- Figurar (16 × 24): legg personen til i `U` i `js/rpg/data.js` og køyr
  `python tools/pikselkunst/figur.py <id>` (eller `alle`). Arket hamnar i
  `bilete/spel/figurar/<id>.png`. `figur.py ark` lagar eit kontaktark i
  `forhand/`. Nye frisyrar, plagg og kroppar blir teikna som delar i `figur.py`.
  Arket har gange (rad 0 til 3) og kampstillingar (rad 4 og 5). Nøklar for
  silhuetten: `krokrygg`, `stav` (`lang` eller `stokk`), `sid` (sid kjole),
  `band`, `blom`, `lue`, `strompe`, `kappe`. Kampstillingane kan sjåast med
  `skjermbilete.py namn kart=utmarka m=1 kamp=vette parti=huldra hp=ivar:5,huldra:0`.
- Hovudpersonar har handteikna ark (`ivar_figur.py`, `huldra_figur.py`, felles kode i
  `handfigur.py`, førde inn i `HANDTEIKNA` i figur.py) med kjensleramer i rad 6 og 7.
  Namna på kjenslene står i `kjensler` i utsjånaden, og `siger` vel kjensler til
  sigerfeiringa i kampen. Kjensler blir viste med `kjensle` i manus og
  kan sjåast med `skjermbilete.py namn kart=asen-stova m=1 kjensle=sjokk`.
  Posar i scener (knele, sitje, peike) står i rad 9 til 12 for alle figurar, laga av
  `poseramme()` i figur.py og av rammene `knele_ned`, `sitje_side` osb. i dei handteikna arka.
  Sjå dei med `skjermbilete.py namn kart=asen-stova m=1 pose=knele retning=1` (retning 0 til 3),
  og alle figurane sine posar saman i `forhand/figurar-posar.png` (`figur.py ark`).
  Sigerfeiring og løn i kampscena: `skjermbilete.py namn kart=utmarka m=1 kamp=vette parti=huldra vinn=1`.
- Kjensler: alle figurar har standardsettet glad, trist, sint, sjokk, tenkje, nikk (rad 6
  og 7, laga av `kjensle()` i figur.py). Portrett med kjensler: gi portrettfunksjonen ein
  parameter k, før personen inn i `PORTRETT_KJENSLER` i portrett.py og i data.js, og køyr
  `portrett.py <namn>`. Sjå begge i spelet med
  `skjermbilete.py namn kart=asen-stova m=1 kjensle=sjokk "tale=Ivar:Tekst"`.
- Kampbakgrunnar: `python tools/pikselkunst/bakgrunn.py <namn>` (malarverktøya ligg i
  `maleri.py`: støy, dithering, fjell, gras, gran, bjørk, stein) skriv
  `bilete/spel/kamp/<namn>.png` direkte (skriptet er kjelda). Namnet er
  `bakgrunn` på kartet i `js/rpg/data.js`.
- Vatn og steingard tilpassar seg naboane og blir teikna i `js/rpg/pikslar.js`
  (`vatn`, `steingard`), ikkje som faste bilete.
- Vatn (`~`) blir teikna som i Final Fantasy VI (Lete-elva, sjå `forhand/referansar/elv-ark.png`):
  `Pikslar.vatn(t, felt, x, y)` får eit vassfelt frå motoren (`vassfelt()` i `motor.js`). Strandkanten
  er eit glatt felt over kartpikslane (delen land i ein kvadrat på 32 pikslar rundt kvar piksel, med
  støy i terskelen), så nes og viker held fram over flisgrensene, og hjørna blir runde av seg sjølv.
  Vatnet ligg lågare enn landet: skrent på 3 til 4 pikslar (jord, eller berg ved stein) under landet i
  nord, smalare sider i vest (skugge) og aust (lys), skumline og skuggestripe. Sand har ingen skrent.
  Fire dempa, grå-turkise tonar (`VATN` i pikslar.js) i band som går på rundgang i tikk-takt: vinklar
  nedover i ein bekk, rolege band mot land i sjøen. På kartet: `vatn: { bekk: true, stryk: ["x,y"] }`
  gir straum og stryk (loddrette striper og skumkant nedst). Mjuke landfliser ved vatnet (bakke, ikkje
  ved bruendar) får òg eit vasslag, så vatnet rundar av spissen på ytre hjørne. Sjå med
  `skjermbilete.py namn kart=utmarka m=1 x=17 y=9 stemning=ingen` (`stemning=ingen` tek bort kveldslyset).
- Tre, steinar og haugar: `python tools/pikselkunst/natur.py <namn>` (sjå `NATUR`).
  Kartteikna `#` (gran), `t` (bjørk) og `o` (stein, einer) vel variant etter plassen
  frå `NATURTYPE` i `js/rpg/pikslar.js`. Nye variantar må førast inn der.
- Små bilete: skriv rutenettet for hand.
- Større bilete: eit lite Python-skript som teiknar flater med `span` og
  punkt, slik som `portrett.py`, og skriv `.pix`. Teikn flater for hand.
  Ikkje rekn ut skugge med kuleformlar: det gir blass, støyete grafikk.

## 3. Lag og sjekk

```
python tools/pikselkunst/pix.py lag kjelder/<namn>.pix
python tools/pikselkunst/pix.py sjekk kjelder/<namn>.pix
python tools/pikselkunst/pix.py ark
```

Sjå på `tools/pikselkunst/forhand/<namn>-8x.png`, `<namn>-samanheng.png` og
`kontaktark.png` med Read-verktøyet.

## 4. Vurder

Gå gjennom sjekklista i stilguiden, og skriv ned konkrete feil med koordinatar,
til dømes «mørk flekk på øyret (9–10, 18) ser ut som eit sår». Vanlege feil:
skitne skuggar, søvnige auge, sur munn, støy, tonar som flyt saman, figur som
forsvinn mot bakgrunnen.

## 5. Forbetre

Rett feila i kjelda og gå tilbake til steg 3. Normalt trengst to til fire
rundar. Stopp når sjekklista er oppfylt, og skriv kva som eventuelt står att.

## 6. Ta i bruk

- Portrett: fila hamnar i `bilete/spel/portrett/`, og namnet må stå i
  `PORTRETT` i `js/rpg/data.js`.
- Fiendar: legg fila inn i `PNG` i `js/rpg/pikslar.js`.
- Sjekk karta: `node tools/sjekk-spel.js`.
- Ta skjermbilete av spelet med grafikken i bruk:
  `python tools/pikselkunst/skjermbilete.py <namn> kart=<kart> m=<merke> x=<x> y=<y>`
  (eller `kamp=fiende1,fiende2`), og sjå på `forhand/skjerm/<namn>-spel.png`.
- Skriv runden inn i `ARBEIDSLOGG.md`.
- Commit både `.pix`-kjelda og PNG-fila.
