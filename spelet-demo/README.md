# Aasen: Språkvandringa (prototype)

Denne mappa er prototypen av rollespelet «Aasen: Språkvandringa». Alt her er
prototypearbeid: kart, scener, grafikk, kamp og system er laga for å prøve ut
stil og mekanikk. Fullversjonen blir planlagd i `../spelet-fullversjon/`
(designdokument, datamodell og musikk).

Spelet blir opna på `spelet-demo/spel.html`. Det bruker innhaldet i kurset
(`../js/storage.js`, `../js/modules.js` og `../js/content/`) og stilen til
sida (`../css/style.css`), så mappa må liggje i kurset.

```
spelet-demo/
├── spel.html          Spelet
├── css/rpg.css        Stil for spelet
├── js/rpg/            pikslar.js, data.js, motor.js, kamp.js, stev.js, spel.js (sjå js/rpg/README.md)
├── bilete/spel/       All pikselgrafikken
├── fonts/             Spelskrift, Runeskrift og Pixelify Sans
├── docs/              grafikk-og-design.md med skjermbilete
└── tools/             Testar (sjekk-*.html, sjekk-spel.js, kjoyr-test.py, edge.py),
                       pikselkunst/ (verktøy, STILGUIDE.md, ARBEIDSLOGG.md) og skrift/
```

Stiar i dokumentasjonen inne i mappa (til dømes `tools/pikselkunst/` eller
`js/rpg/data.js`) er rekna frå `spelet-demo/`. Testane kan køyrast frå
rota av kurset:

```
node spelet-demo/tools/sjekk-spel.js
python spelet-demo/tools/kjoyr-test.py spelet-demo/tools/sjekk-scene.html
```
