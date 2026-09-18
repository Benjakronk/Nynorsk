# Kjelde og lisens for nn-ordliste.txt

`nn-ordliste.txt` er 412 221 nynorske ordformer, ei linje per form, små
bokstavar, sorterte. Fila blir brukt av språksjekken i `js/spell.js`.

## Kjelde

Formene er henta ut av **Norsk ordbank – nynorsk 2012**, versjonen frå
1. februar 2022, publisert av **Nasjonalbiblioteket / Språkbanken**.

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
2. Køyr `node tools/lag-ordliste.js <sti-til>/fullformer_2012.txt data/nn-ordliste.txt`.

Skriptet tek kolonnen `OPPSLAG` frå alle radene som er merkte `normert`,
fjernar `$` (som markerer samansetningsledd), hoppar over former med tal eller
mellomrom, gjer alt om til små bokstavar og sorterer.
