---
name: pikselkunst
description: Lag, test og forbetre pikselgrafikk (portrett, figurar, fiendar, fliser) til spelet «Aasen: Språkvandringa» i spel.html. Bruk når ny grafikk skal lagast, eller når eksisterande grafikk skal sjåast over og gjerast betre.
---

# Pikselkunst til «Aasen: Språkvandringa»

Grafikken blir laga i ein fast sløyfe: skriv kjelda, lag biletet, sjå på det,
vurder det mot stilguiden og forbetre. Gjenta til sjekklista er oppfylt.

Les først `tools/pikselkunst/STILGUIDE.md`. Målestokken er Blekklatten
(`bilete/spel/blekklatten.png`).

## 1. Oppdrag

Skriv ned kva som skal lagast: type (portrett, figur, fiende, flis), storleik
frå stilguiden, kvar det skal brukast, og kva personen eller vesenet skal
uttrykkje.

## 2. Kjelde

Kjelda er alltid ei `.pix`-fil i `tools/pikselkunst/kjelder/` (formatet står
øvst i `tools/pikselkunst/pix.py`). Tre måtar å lage henne på:

- Portrett: legg personen til i `PERSONAR` i `tools/pikselkunst/portrettmal.py`
  og køyr `python tools/pikselkunst/portrettmal.py <namn>`.
- Små bilete: skriv rutenettet for hand.
- Større bilete: eit lite Python-skript som teiknar flater med `span` og
  punkt, slik som `portrettmal.py`, og skriv `.pix`. Teikn flater for hand.
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
- Ta eit skjermbilete av spelet med grafikken i bruk (headless Edge, sjå
  korleis testsidene fryser lerretet med `toDataURL` før biletet blir teke),
  og sjå på det.
- Commit både `.pix`-kjelda og PNG-fila.
