# Verdiar som ikkje står i dokumentet

Denne mappa er tom med vilje. Her skal det berre liggje verdiar som spelet treng, men som designdokumentet ikkje har. Alt anna kjem frå fanene og blir laga av tools/importer.py.

## Korleis mappa blir brukt

Ei fil her har same sti som datafila ho skal flettast inn i. Fila hand/ord/familiar.json blir fletta inn i ord/familiar.json, og hand/figurar/figurar.json i figurar/figurar.json.

Fila er ei liste med postar. Kvar post har ein id og dei felta som skal leggjast til:

```json
[
 {"id": "diftong", "farge": "#f8d840"},
 {"id": "hard", "farge": "#e86a50"}
]
```

Importen legg felta på posten med same id. Har feltet alt ein verdi frå dokumentet, gjeld dokumentet. Importen skriv då ei line i rapporten om at handfila og dokumentet seier ulikt. Ein id som ikkje finst i datafila, går òg i rapporten.

## Kva som høyrer heime her

- Fargane til lydfamiliane. Dei står i prototypen (FAMILIAR i js/rpg/data.js), men ikkje i dokumentet. Dei høyrer heime i hand/ord/familiar.json.
- Teikna til lydfamiliane, når dei er bestemte i Grafikk og stil.
- Filnamn på portrett og kartfigurar (felta portrett og kartfigur i figurar.json). Prototypen har dei i PORTRETT og U.
- Ikon for statusar og ressursar.
- Kart i prototypformatet (rader, bygg, dorer, folk) for skjermar som har eit teikna kart, som feltet kart på skjermen.
- Andre tal som må prøvast ut i spelet og som dokumentet ikkje har enno.

## Kva som ikkje høyrer heime her

- Rettingar av feil i dokumentet. Ein feil blir retta i fana, og importen blir køyrd på nytt.
- Formlar. Dei står i koden til spelet.
- Verdiar som berre er gissa. Eit tomt felt er betre enn eit gissa felt.

Når ein verdi kjem inn i dokumentet, skal han fjernast herifrå.
