"""Felles for handteikna figurark (ivar_figur.py, huldra_figur.py).

Kvar figur har rammer som rutenett (24 rader à 16 teikn) og ein palett. lag() set saman
arket (48 x 192) i same oppsett som figur.py, med kjensler i rad 6 og 7:

  rad 0 til 3  gange ned, opp, venstre, høgre (høgre er venstre spegla)
  rad 4        åtak, galdr, skadd
  rad 5        svak (på kne) og slått ut (24 x 16, sida rotert)
  rad 6 og 7   standardkjenslene (glad, trist, sint, sjokk, tenkje, nikk), same for alle figurar
  rad 8        figuren sine eigne kjensler (Ivar: ivrig, les. Huldra: lokk, sky)

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


def lag(R, PAL, kjensler, attlatne="j"):
    sjekk(R)
    def teikn(im, g, x0, y0, spegl=False):
        for y, rad in enumerate(g):
            for x, c in enumerate(rad):
                if c != ".": im.putpixel((x0 + (len(rad) - 1 - x if spegl else x), y0 + y), hx(PAL[c]) + (255,))
    ramme = lambda namn: omriss(R[namn])
    im = Image.new("RGBA", (W * 3, H * (6 + (len(kjensler) + 2) // 3)), (0, 0, 0, 0))
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
    return im
