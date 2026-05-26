# Lærarverktøy

Eit reint statisk verktøy for å sjå over elevbackupar frå nynorskkurset.

## Slik brukar du det

1. Be elevane laste ned backup-fila si frå kurset (knappen «Last ned backup (JSON)»
   i Data-menyen). Dei får ein dialog som spør om fornamn, etternamn og klasse.
2. Filnamnet blir automatisk på forma `klasse_etternamn_fornamn.json`, t.d.
   `9a_nordmann_ola.json`. Sjølve namnet og klassa ligg òg lagra inne i JSON-fila.
3. Samle alle filene i ein mappe på maskina di.
4. Opne `larer/index.html` i nettlesaren og vel mappa (eller alle filene).

Alt går føre seg lokalt i nettlesaren — ingenting blir sendt nokon stad.

## Kva du ser

- **Klasseoversikt** med tal på fullførte modular, rette svar og skrivne ord per elev.
- **Per elev**: kvar modul med kva spørsmål eleven har svart rett/feil på, kva fasiten var, kor mange forsøk dei tok, og heile dei skrivne tekstane.
- **Modular eleven har byrja men ikkje fullført** opnar seg automatisk.

## Krav

- Mappevalg krev Chrome, Edge eller Opera (File System Access API).
- I andre nettlesarar brukar du «Vel filer» og merkar JSON-filene manuelt.

## Filplassering

Mappa `larer/` ligg ved sida av elevsida. Han brukar dei same modul-definisjonane
(`../js/modules.js` og `../js/content/*.js`), så fasiten er alltid i synk med
det elevane møter.
