"""Felles for handteikna figurark (ivar_figur.py, huldra_figur.py).

Kvar figur har rammer som rutenett (24 rader à 16 teikn) og ein palett. lag() set saman
arket (48 x 192) i same oppsett som figur.py, med kjensler i rad 6 og 7:

  rad 0 til 3  gange ned, opp, venstre, høgre (høgre er venstre spegla)
  rad 4        åtak, galdr, skadd
  rad 5        svak (på kne) og slått ut (24 x 16, sida rotert)
  rad 6 og 7   standardkjenslene (glad, trist, sint, sjokk, tenkje, nikk), same for alle figurar
  rad 8        figuren sine eigne kjensler (Ivar: ivrig, les. Huldra: lokk, sky)
  rad 9 til 12 posane knele, sitje og peike (ned, opp, venstre, høgre), same som i figur.py.
               Rammene heiter knele_ned, sitje_opp, peike_side og så vidare.

Omrisset blir lagt rundt til slutt, så rammene blir teikna med berre synlege fargar.
"""
from PIL import Image

W, H = 16, 24


def omriss(g):
    h, w = len(g), len(g[0]); ut = [list(r) for r in g]
    for y in range(h):
        for x in range(w):
            if g[y][x] != ".": continue
            if any(0 <= y + dy < h and 0 <= x + dx < w and g[y + dy][x + dx] != "." for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))):
                ut[y][x] = "o"
    return ut


def hx(s): s = s.lstrip("#"); return tuple(int(s[i:i + 2], 16) for i in (0, 2, 4))


def sjekk(R):
    for namn, g in R.items():
        assert len(g) == H and all(len(r) == W for r in g), (namn, [len(r) for r in g])


POSAR = ("knele", "sitje", "peike")
POSERAD = 9


def senk(g, til, n, bein=()):
    """Radene 0 til og med til flytte n rader ned, og bein under (fram til nest nedste rad)."""
    ny = ["." * W] * H
    for y in range(til + 1):
        if y + n < H: ny[y + n] = g[y]
    for i, r in enumerate(bein): ny[H - 1 - len(bein) + i] = r
    return ny


def set_saman(g, sokk, til, rader):
    """Ny poseramme: radene 1 til og med til i g flytte sokk rader ned, og så rader (mål: kjelde)
    der kjelda er eit radnummer i g eller ei teikna rad. Slik kan overkroppen bli kortare (somme
    rader blir hoppa over) når figuren kneler og lener seg fram."""
    ny = ["." * W] * H
    for y in range(1, til + 1): ny[y + sokk] = g[y]
    for y, k in rader.items(): ny[y] = g[k] if isinstance(k, int) else k
    return ny


def ned_blikk(g, y, auge="o", hud="h"):
    """Auga ser ned (bøygd hovud): auga i rad y blir hud, så berre den nedre delen står att."""
    g = list(g); g[y] = g[y].replace(auge, hud); return g


def peik_ut(g, y0, y1, arm, rad13, rad14):
    """Framanfrå eller bakfrå: armen til høgre i biletet (kolonne 12 til 14, rad y0 til y1) blir
    teken bort, figuren flytt éin kolonne mot venstre, og ein arm ut til sida blir teikna i rad 13 og 14
    frå kolonne 11 (rad13 og rad14 er teikna frå kolonne 11)."""
    g = [list(r) for r in g]
    for y in range(y0, y1 + 1):
        for x in (12, 13, 14):
            if g[y][x] in arm: g[y][x] = "."
    g = [r[1:] + ["."] for r in g]
    for y, t in ((13, rad13), (14, rad14)):
        for k, c in enumerate(t):
            if c != ".": g[y][11 + k] = c
    return ["".join(r) for r in g]


def lag(R, PAL, kjensler, attlatne="j"):
    sjekk(R)
    def teikn(im, g, x0, y0, spegl=False):
        for y, rad in enumerate(g):
            for x, c in enumerate(rad):
                if c != ".": im.putpixel((x0 + (len(rad) - 1 - x if spegl else x), y0 + y), hx(PAL[c]) + (255,))
    ramme = lambda namn: omriss(R[namn])
    posar = all(f"{p}_{d}" in R for p in POSAR for d in ("ned", "opp", "side"))
    im = Image.new("RGBA", (W * 3, H * (POSERAD + 4 if posar else 6 + (len(kjensler) + 2) // 3)), (0, 0, 0, 0))
    for d, pre in enumerate(("ned", "opp", "side")):
        for s in range(3): teikn(im, ramme(f"{pre}{s}"), s * W, d * H)
    for s in range(3): teikn(im, ramme(f"side{s}"), s * W, 3 * H, spegl=True)
    for n, namn in enumerate(("atak", "galdr", "skadd")): teikn(im, ramme(namn), n * W, 4 * H)
    teikn(im, ramme("svak"), 0, 5 * H)
    g = R["side0"]                                                     # slått ut: sida rotert, auga att
    rot = [[g[H - 1 - x][y] for x in range(H)] for y in range(W)]
    rot = [[attlatne if c == "o" else c for c in r] for r in rot]
    teikn(im, omriss(rot), W, 5 * H + 8)
    for n, namn in enumerate(kjensler):
        teikn(im, ramme(namn), (n % 3) * W, (6 + n // 3) * H)
    if posar:
        for n, p in enumerate(POSAR):
            for d, pre in enumerate(("ned", "opp", "side")): teikn(im, ramme(f"{p}_{pre}"), n * W, (POSERAD + d) * H)
            teikn(im, ramme(f"{p}_side"), n * W, (POSERAD + 3) * H, spegl=True)
    return im
