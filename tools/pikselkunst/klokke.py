"""Kyrkjeklokka i tårnet som eit vesen som kan svinge (kartet kyrkje-tarn).

  python tools/pikselkunst/klokke.py      skriv kjelder/klokke.pix og kjelder/klokke-gang.pix (og PNG)

Klokka med åket og krona er teikna for kvar vinkel rundt akselen i åket: kvar pikselen i ramma blir
rekna attende til klokka i kvile (rotasjon), og fargen kjem frå profilen der, så lyset følgjer klokka.
Gangarket har same oppsett som for vesen som går (GANGARK i pikslar.js): fire rader, tre like kolonnar.
Rad 0 («ned») er kvile, rad 1 («opp») eit lite utslag mot høgre, rad 2 («venstre») fullt utslag mot
venstre og rad 3 («høgre») fullt utslag mot høgre. Manuset klokketau snur vesenet (snu) for å velje
ramme. Ramma er 72 x 103: botnen står på golvet i ruta (6,6), og klokka heng i same høgd som i
klokkestolen (inne-klokkestol).
"""
import os, sys, math, subprocess
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from bygg import Lerret, omriss
from inventar import PAL

ROT = os.path.dirname(os.path.abspath(__file__))
W, H = 72, 103
CX, AKSEL = 34, 18                                       # midtlina og akselen (vinklane går rundt han)
PROF = [8, 10, 11, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 17, 17, 18,
        18, 19, 20, 21, 22, 23, 24, 24, 23]
VINKLAR = [0, -8, 20, -20]                               # grader (positiv: botnen mot venstre), rad 0 til 3


def i_kvile(x, y):
    """Fargen til klokka i kvile i punktet (x relativt til midtlina, y absolutt), eller None."""
    if 16 <= y < 22 and -12 <= x < 12:                                     # åket med jernbeslag
        if y in (17, 18) and (x + 12) % 6 == 0: return "V"
        return "c" if y < 19 else "A"
    if 22 <= y < 26 and -5 <= x < 5: return "Z" if x < 0 else "9"           # krona
    j = int(y) - 26
    if 0 <= j < len(PROF):
        b = PROF[j]
        if -b <= x < b:
            if j == len(PROF) - 1: return "y" if x < -6 else "Y" if x < 10 else "Z"   # slagringen
            if j in (6, 21) and -b + 1 <= x < b - 1: return "9"                  # band i relieff
            t = (x + b) / (2 * b)
            return "Y" if t < 0.12 else "Z" if t < 0.6 else "9" if t < 0.92 else "v"
    if len(PROF) + 26 <= y < len(PROF) + 30 and -1 <= x < 1: return "V" if x < 0 else "v"   # kolven
    return None


def ramme(vinkel):
    L = Lerret(W, H)
    a = math.radians(vinkel)
    for y in range(H):
        for x in range(W):
            dx, dy = x - CX + 0.5, y - AKSEL + 0.5
            ux = dx * math.cos(a) + dy * math.sin(a)                       # attende til kvile
            uy = -dx * math.sin(a) + dy * math.cos(a)
            c = i_kvile(math.floor(ux), uy + AKSEL)
            if c: L.p(x, y, c)
    for (x, y) in [(-9, 40), (-8, 41), (4, 36), (10, 52), (-14, 50)]:      # irr, roterte med klokka
        rx = round(CX + x * math.cos(a) - (y - AKSEL) * math.sin(a)); ry = round(AKSEL + x * math.sin(a) + (y - AKSEL) * math.cos(a))
        if L.get(rx, ry) not in ".": L.p(rx, ry, "i")
    omriss(L)
    return L


def pix(namn, rader, ut):
    brukt = {c for r in rader for c in r}
    linjer = [f"# namn: {namn}", "# type: fiende", f"# ut: {ut}", f"# storleik: {len(rader[0])}x{len(rader)}",
              "# Laga av tools/pikselkunst/klokke.py. Endre skriptet, ikkje denne fila.", "palett:"]
    linjer += [f"  {t} = {f}    {m}".rstrip() for t, f, m in PAL if t in brukt or t == "."]
    linjer.append("bilete:"); linjer += ["  " + "".join(r) for r in rader]
    sti = os.path.join(ROT, "kjelder", namn + ".pix")
    open(sti, "w", encoding="utf-8").write("\n".join(linjer) + "\n")
    subprocess.run([sys.executable, os.path.join(ROT, "pix.py"), "lag", sti], check=True)


if __name__ == "__main__":
    rammer = [ramme(v) for v in VINKLAR]
    pix("klokke", rammer[0].g, "bilete/spel/klokke.png")
    ark = []
    for r in rammer:
        for y in range(H): ark.append([c for _ in range(3) for c in r.g[y]])
    pix("klokke-gang", ark, "bilete/spel/klokke-gang.png")
