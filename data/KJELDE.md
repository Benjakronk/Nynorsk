# Kjelder og lisensar for datafilene

Denne mappa har to datafiler: `nn-ordbank.txt` (ordlista til språksjekken) og
`noreg-terreng.js` (høgdekartet til 3D-kartet over reisene til Ivar Aasen).

## noreg-terreng.js

Eit PNG-bilete på 615 × 768 pikslar, bakt inn som base64 i eit JS-objekt, der
kvar piksel er 2 × 2 km i Lamberts konforme kjegleprojeksjon (standardparallellar
60° og 70° N, sentralmeridian 15° A). Raud kanal er høgda over havet i
kvadratrotskala (0 til 2500 m), grøn er havdjupet, og blå er ei maske: 0 hav,
128 anna land, 255 Noreg. Objektet har òg projeksjonsparametrane og hjørnet
øvst til venstre, slik at `js/aasen-reise.js` kan plassere stader på kartet.

Kjelder:

- **Høgder og havdjup:** Terrarium-fliser frå *Terrain Tiles* på AWS Open Data
  (Mapzen), zoom 6. Datasettet er sett saman av SRTM, GMTED2010 og ETOPO1,
  som alle er offentlege data utan opphavsrettslege krav.
  <https://registry.opendata.aws/terrain-tiles/>
- **Landegrenser:** Natural Earth 1:10M, Admin 0 Countries, public domain.
  <https://www.naturalearthdata.com/>

`node tools/lag-terreng.js` lastar ned flisene og grensene, projiserer om,
rasteriserer maska og skriv fila.

# Kjelde og lisens for nn-ordbank.txt

`nn-ordbank.txt` er 412 221 nynorske ordformer, kvar med morfologien sin
(ordklasse, kjønn, tal, bestemtheit, tempus). Fila blir brukt av
stavekontrollen i `js/spell.js` og grammatikksjekken i `js/grammatikk.js`.

## Format

Første linje er ein JSON-tabell med dei 123 tagkombinasjonane som finst, til
dømes `"subst fem eint ub"`. Kvar linje etter det er

    ord<TAB>id,id

der id-ane er posisjonar i tabellen, skrivne i base 36. Orda står med små
bokstavar og er sorterte. `bok` har til dømes berre éin tag,
`subst fem eint ub`, mens `kasta` har ni, sidan forma kan vere både verb,
substantiv og adjektiv.

## Kjelde

Formene og taggane er henta ut av **Norsk ordbank – nynorsk 2012**, versjonen
frå 1. februar 2022, publisert av **Nasjonalbiblioteket / Språkbanken**.

- Ressurskatalog: <https://www.nb.no/sprakbanken/ressurskatalog/oai-nb-no-sbr-41/>
- Fil: `20220201_norsk_ordbank_nno_2012.tar.gz`
- Varig identifikator: <https://hdl.handle.net/21.11146/41>

Ordbanken følgjer den offisielle rettskrivinga frå 2012, altså same norma som
kurset elles byggjer på.

## Lisens

**Creative Commons Namngjeving 4.0 (CC BY 4.0)**,
<https://creativecommons.org/licenses/by/4.0/deed.no>

Krav: namngjeving. Denne fila, saman med omtalen på «Om kurset»-sida, dekkjer
det kravet.

> Inneheld data frå Norsk ordbank – nynorsk 2012, Nasjonalbiblioteket
> (Språkbanken), lisensiert under CC BY 4.0.

## Slik blir fila laga på nytt

1. Last ned og pakk ut `20220201_norsk_ordbank_nno_2012.tar.gz`.
2. Køyr `node tools/lag-ordbank.js <sti-til>/fullformer_2012.txt data/nn-ordbank.txt`.

Skriptet tek kolonnane `OPPSLAG` og `TAG` frå alle radene som er merkte
`normert`, fjernar `$` (som markerer samansetningsledd), hoppar over former med
tal eller mellomrom, og gjer alt om til små bokstavar. Taggane blir forenkla
til dei trekka grammatikksjekken bruker, slik at 23 000 ulike taggar blir 123
kombinasjonar.
