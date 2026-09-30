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
    ("k", "#e8e4dc", "kalk"), ("x", "#b8b4ac", "kalk skugge"), ("n", "#6a6070", "sot"), ("N", "#140a08", "eldstad"),
    ("f", "#f8b830", "eld gul"), ("F", "#e86a20", "eld"),
    ("a", "#2e1a10", "furu djup"), ("A", "#5a3a22", "furu skugge"), ("c", "#8a5e36", "furu"), ("C", "#b08650", "furu lys"),
    ("m", "#2c4288", "rosemaling blå"),
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


def grue():
    """Kvitkalka grue med hette i hjørnet, eld og gryte på krok (etter Bjørnebergstølen og Askevold)."""
    W, H = 16 + 8, 2 * 16 + 12
    L = Lerret(W, H)
    for y in range(0, H - 2):
        b = 9 if y > 16 else int(4 + y * 0.32)
        for x in range(12 - b, 12 + b + 1): L.p(x, y, "k" if x < 12 + b * 0.3 else "x")
    for x in range(3, 22): L.p(x, 16, "x"); L.p(x, 17, "n")            # kant på hetta, sot under
    for y in range(24, H - 3):
        for x in range(5, 19): L.p(x, y, "N")
    for y in range(34, H - 3):
        for x in range(6, 18):
            if h(x, y, 3) > 0.25 + (H - 3 - y) / 14: L.p(x, y, "f" if h(x, y, 4) > 0.6 else "F")
    for y in range(18, 29): L.p(12, y, "n")                             # krok
    for y in range(29, 34):
        for x in range(8, 16): L.p(x, y, "n" if x < 12 else "N")          # gryte
    for x in range(3, 22): L.p(x, H - 3, "x"); L.p(x, H - 2, "n")        # grueheller
    omriss(L)
    return L


def hylle():
    """Hylle på veggen med trefat og eit måla krus, 2 fliser breitt."""
    W, H = 2 * 16 + 8, 20
    L = Lerret(W, H)
    for x in range(2, W - 2): L.p(x, 14, "C"); L.p(x, 15, "A"); L.p(x, 16, "a")
    for k, x in enumerate(range(6, W - 6, 7)):
        for dy in range(-6, 0):
            for dx in range(-3, 4):
                if dx * dx / 9 + dy * dy / 36 <= 1: L.p(x + dx, 14 + dy, "C" if dx < 0 else "c")
        L.p(x - 1, 9, "m" if k % 2 else "E")
    for y in range(9, 14): L.p(W - 7, y, "T"); L.p(W - 6, y, "U")
    omriss(L)
    return L


def sengebenk():
    """Sengebenk av furu med raudt åklede og kvit pute, 2 fliser breitt."""
    W, H = 2 * 16 + 8, 26
    L = Lerret(W, H)
    for y in range(2, H - 1):
        for x in range(3, W - 3): L.p(x, y, "c" if y < 6 else "A")
    for y in range(6, H - 4):
        for x in range(5, W - 5): L.p(x, y, "R" if (x + y) % 7 else "E")
    for y in range(6, 11):
        for x in range(6, 16): L.p(x, y, "w" if y < 10 else "W")
    for x in range(5, W - 5, 6):
        for y in range(12, H - 4):
            if (x + y) % 6 == 0: L.p(x, y, "y")
    for y in range(0, H - 1): L.p(3, y, "C"); L.p(W - 4, y, "a")
    omriss(L)
    return L


def langbord():
    """Langbord av furu med benk bak og kubbestolar ved endane, 4 x 2 fliser.
    Lys bordplate med plankar, tydeleg kant og skugge, benken bak i ein mørkare tone."""
    W, H = 4 * 16 + 8, 2 * 16 + 8
    L = Lerret(W, H)
    for y in range(3, 9):                                               # benken bak bordet
        for x in range(8, W - 8): L.p(x, y, "U" if y == 3 else "T" if y < 7 else "t")
    for y in range(10, 25):                                             # bordplata
        for x in range(10, W - 10):
            c = "C"
            if (x - 10) % 13 == 0: c = "c"                               # plankeskøytar
            if y == 10: c = "U"
            L.p(x, y, c)
    for x in range(10, W - 10): L.p(x, 25, "c"); L.p(x, 26, "A"); L.p(x, 27, "a")   # kant
    for x in (14, W - 16):                                              # bordbein med sleide
        for y in range(28, H - 2): L.p(x, y, "A"); L.p(x + 1, y, "a")
    for x in range(14, W - 14): L.p(x, H - 4, "A")
    for (cx, cy) in [(5, 22), (W - 6, 22)]:                             # kubbestolar
        for y in range(cy - 8, cy + 8):
            for x in range(cx - 4, cx + 5): L.p(x, y, "c" if x < cx else "A")
        for x in range(cx - 4, cx + 5): L.p(x, cy - 8, "C"); L.p(x, cy - 7, "c")
    for (x, y) in [(24, 16), (44, 18)]:                                 # trefat med graut
        for dx in range(-3, 4): L.p(x + dx, y, "T"); L.p(x + dx, y + 1, "t")
        for dx in range(-2, 3): L.p(x + dx, y - 1, "w")
    L.p(34, 14, "S"); L.p(35, 14, "s"); L.p(55, 15, "w"); L.p(56, 15, "W")
    omriss(L)
    return L


def rokk():
    """Rokk (spinnehjul) med stort hjul og tre bein (etter rokken frå Nesset)."""
    W, H = 16 + 8, 30
    L = Lerret(W, H)
    cx, cy, r = 12, 11, 8
    for a in range(0, 360, 3):
        L.p(cx + round(math.cos(math.radians(a)) * r), cy + round(math.sin(math.radians(a)) * r), "E")
    for a in range(0, 360, 45):
        for k in range(1, r): L.p(cx + round(math.cos(math.radians(a)) * k), cy + round(math.sin(math.radians(a)) * k), "U")
    L.p(cx, cy, "Y")
    for k in range(10): L.p(4 + k, 22, "T")                              # benk
    for (x0, dx) in [(5, -1), (13, 1), (9, 0)]:
        for k in range(7): L.p(x0 + (dx * k) // 3, 23 + k, "t")
    for y in range(12, 22): L.p(5, y, "T")
    omriss(L)
    return L


INVENTAR = {
    "grue": grue, "hylle": hylle, "sengebenk": sengebenk, "langbord": langbord, "rokk": rokk,"altartavle": altartavle, "altarring": altarring, "preikestol": preikestol, "lysekrone": lysekrone}


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
