"""Inventar i kyrkja som heile figurar: altartavle med altar, alterring, preikestol og lysekrone.

Etter kyrkjene i Kvernes og Hove og altertavla i Fåberg (sjå konsept/): bondebarokk
med måla felt og forgylt treskurd, kvit altarduk med lysestakar, kvitmåla alterring
med raud knefallspute, brunraud åttekanta preikestol på ei søyle, lysekrone i messing.

  python tools/pikselkunst/inventar.py alle [--tving]     skriv kjelder/inne-*.pix

Figurane følgjer same regel som husa (bygg.py): breidda er fliser x 16 + 8, og dei
står med botnen nedst i den nedste flisraden sin. I kartet står dei under «bygg».
"""
import sys, os, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from bygg import Lerret, omriss, h

ROT = os.path.dirname(os.path.abspath(__file__))

PAL = [
    (".", "-", ""), ("o", "#0a0514", "omriss"),
    ("r", "#3a0e18", "raud djup"), ("R", "#6a1a2a", "raud"), ("E", "#983040", "raud lys"),
    ("y", "#f8d840", "gull lys"), ("Y", "#d0a030", "gull"), ("Z", "#8a5a18", "gull skugge"),
    ("w", "#f4f2f8", "kvit"), ("W", "#c8c6d4", "kvit skugge"), ("K", "#8a88a0", "kvit djup"),
    ("s", "#e8eef4", "sølv lys"), ("S", "#9aa2b4", "sølv"),
    ("l", "#fff4c0", "ljos"), ("L", "#f8b830", "flamme"),
    ("b", "#1c2448", "bilete djup"), ("B", "#3a4a8a", "bilete blå"), ("h", "#e8c8a8", "hud"), ("H", "#b08868", "hud skugge"),
    ("t", "#4a2418", "tre djup"), ("T", "#7a3a22", "tre brunraud"), ("U", "#a4583a", "tre lys"),
    ("g", "#6a7a8a", "blågrå skugge"), ("G", "#9aaabb", "blågrå"),
]


def altartavle():
    """Altartavle over altaret, 3 fliser breitt og 2 høgt (veggen og altaret)."""
    W, H = 3 * 16 + 8, 2 * 16 + 14
    L = Lerret(W, H)
    cx = W // 2
    # Tavla: sentralt bilete med søyler og forgylt ramme, krone øvst
    for y in range(4, 30):
        for x in range(cx - 18, cx + 19):
            L.p(x, y, "R")
    for y in range(4, 30):
        for x in (cx - 18, cx - 17, cx + 17, cx + 18): L.p(x, y, "Y")
        for x in (cx - 14, cx + 14): L.p(x, y, "y"); L.p(x + 1, y, "Z")     # søyler
    for x in range(cx - 18, cx + 19): L.p(x, 4, "y"); L.p(x, 5, "Y"); L.p(x, 29, "Z")
    # biletet: Kristus i kvitt mot blå himmel
    for y in range(8, 26):
        for x in range(cx - 10, cx + 11): L.p(x, y, "B" if y < 18 else "b")
    for y in range(11, 25): L.p(cx, y, "w"); L.p(cx + 1, y, "W")
    for y in range(14, 25):
        for x in range(cx - 3, cx + 4): L.p(x, y, "w" if x <= cx else "W")
    for x in range(cx - 6, cx + 7): L.p(x, 15, "w" if x <= cx else "W")     # armar ut
    L.p(cx, 11, "h"); L.p(cx + 1, 11, "H"); L.p(cx, 12, "h"); L.p(cx + 1, 12, "H")
    for x in range(cx - 2, cx + 3): L.p(x, 10, "y")                       # glorie
    # krone med treskurd øvst
    for y in range(0, 4):
        b = [2, 5, 8, 10][y]
        for x in range(cx - b, cx + b + 1): L.p(x, y, "Y" if (x + y) % 3 else "y")
    L.p(cx, 0, "y"); L.p(cx - 1, 0, "y")
    for (x, y) in [(cx - 21, 8), (cx + 20, 8), (cx - 21, 16), (cx + 20, 16)]:
        L.p(x, y, "Y"); L.p(x + 1, y + 1, "Z"); L.p(x, y + 1, "y")          # akantusranker
    # altaret: kvit duk over raudt antependium med gullkross, lysestakar
    ay = 30
    for y in range(ay, H - 1):
        for x in range(cx - 20, cx + 21): L.p(x, y, "R" if y > ay + 3 else "w")
    for x in range(cx - 20, cx + 21): L.p(x, ay + 3, "W"); L.p(x, H - 2, "r")
    for y in range(ay + 6, H - 3): L.p(cx, y, "Y")
    for x in range(cx - 3, cx + 4): L.p(x, ay + 8, "Y")
    for sx in (cx - 12, cx + 12):
        for y in range(ay - 6, ay): L.p(sx, y, "S")
        L.p(sx - 1, ay - 1, "s"); L.p(sx + 1, ay - 1, "S"); L.p(sx, ay - 7, "l"); L.p(sx, ay - 8, "L")
    omriss(L)
    return L


def altarring():
    """Alterring framfor altaret: kvite balustrar, gylt handlist og raud knefallspute, 5 fliser breitt."""
    W, H = 5 * 16 + 8, 22
    L = Lerret(W, H)
    for x in range(2, W - 2):
        L.p(x, 3, "Y"); L.p(x, 4, "y")                                # handlist
        L.p(x, 5, "W")
    for x in range(4, W - 4, 4):                                     # balustrar
        for y in range(6, 15): L.p(x, y, "w"); L.p(x + 1, y, "W")
        L.p(x, 9, "W"); L.p(x + 1, 9, "K")
    for x in range(2, W - 2): L.p(x, 15, "W"); L.p(x, 16, "K")
    for x in range(3, W - 3):                                        # knefallspute
        L.p(x, 18, "E"); L.p(x, 19, "R"); L.p(x, 20, "r")
    # opning i midten til presten
    for y in range(3, 21):
        for x in range(W // 2 - 6, W // 2 + 6): L.p(x, y, ".")
    for y in range(3, 17): L.p(W // 2 - 7, y, "Y"); L.p(W // 2 + 6, y, "Y")
    omriss(L)
    return L


def preikestol():
    """Brunraud åttekanta preikestol med gullfelt på ei søyle, med trapp. 1 flis breitt."""
    W, H = 16 + 8, 42
    L = Lerret(W, H)
    cx = W // 2
    for y in range(26, 40):                                            # søyla
        L.p(cx - 1, y, "U"); L.p(cx, y, "T"); L.p(cx + 1, y, "t")
    for x in range(cx - 5, cx + 6): L.p(x, 40, "T"); L.p(x, 41, "t")
    # sjølve stolen: tre synlege flater (åttekant)
    for y in range(8, 26):
        t = (y - 8) / 18
        b = 10 if y < 22 else int(10 - (y - 22) * 2)
        for x in range(cx - b, cx + b + 1):
            flate = "U" if x < cx - 4 else "T" if x <= cx + 4 else "t"
            L.p(x, y, flate)
    for y in range(11, 20):                                            # gullfelt
        for x in (cx - 8, cx - 2, cx + 4):
            for k in range(3): L.p(x + k, y, "Y" if y in (11, 19) or k in (0, 2) else "R")
    for x in range(cx - 11, cx + 12): L.p(x, 7, "Y"); L.p(x, 6, "y")    # kant øvst
    for x in range(cx - 10, cx + 11): L.p(x, 5, "t")                   # bibelen på kanten
    L.p(cx - 2, 4, "w"); L.p(cx - 1, 4, "w"); L.p(cx, 4, "W"); L.p(cx + 1, 4, "r")
    # trapp langs sida
    for k in range(6): L.p(cx + 10 + (k // 3), 26 + k * 2, "T"); L.p(cx + 11 + (k // 3), 27 + k * 2, "t")
    omriss(L)
    return L


def lysekrone():
    """Lysekrone i messing med levande ljos. Heng over midtgangen."""
    W, H = 16 + 8, 24
    L = Lerret(W, H)
    cx = W // 2
    for y in range(0, 8): L.p(cx, y, "Z")                               # kjetting
    for y in range(8, 18): L.p(cx, y, "Y"); L.p(cx + 1, y, "Z")
    L.p(cx, 18, "y"); L.p(cx + 1, 18, "Y"); L.p(cx, 19, "Z")
    for (dx, y) in [(-9, 14), (-5, 12), (5, 12), (9, 14)]:              # armar
        for k in range(abs(dx)):
            xx = cx + (k if dx > 0 else -k); L.p(xx, y + (1 if k > abs(dx) // 2 else 0), "Y")
        xx = cx + dx
        L.p(xx, y - 1, "Y"); L.p(xx, y - 2, "w"); L.p(xx, y - 3, "w"); L.p(xx, y - 4, "L"); L.p(xx, y - 5, "l")
    omriss(L)
    return L


INVENTAR = {"altartavle": altartavle, "altarring": altarring, "preikestol": preikestol, "lysekrone": lysekrone}


def pix(namn, L):
    brukt = {c for r in L.g for c in r}
    ut = [f"# namn: inne-{namn}", "# type: bygg", f"# ut: bilete/spel/bygg/inne-{namn}.png", f"# storleik: {L.w}x{L.h}", "palett:"]
    ut += [f"  {t} = {f}    {m}".rstrip() for t, f, m in PAL if t in brukt or t == "."]
    ut.append("bilete:"); ut += ["  " + "".join(r) for r in L.g]
    return "\n".join(ut) + "\n"


if __name__ == "__main__":
    tving = "--tving" in sys.argv
    namn = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not namn: print(__doc__); sys.exit(0)
    if namn == ["alle"]: namn = list(INVENTAR)
    for n in namn:
        sti = os.path.join(ROT, "kjelder", f"inne-{n}.pix")
        if os.path.exists(sti) and not tving: print(f"inne-{n}.pix finst alt (bruk --tving)"); continue
        open(sti, "w", encoding="utf-8").write(pix(n, INVENTAR[n]())); print(f"skreiv kjelder/inne-{n}.pix")
