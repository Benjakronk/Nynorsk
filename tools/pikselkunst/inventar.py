"""Inventar som heile figurar: kyrkja (altartavle, alterring, preikestol, lysekrone), bondestova
(grue, hylle, sengebenk, langbord, rokk) og embetsmannsheimen (kakkelomn, skatoll, golvur, sofa,
spisebord, skrivepult, bokreolar, lesebord, stol).

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
    ("j", "#2a0e0c", "mahogni djup"), ("J", "#5a2418", "mahogni skugge"), ("M", "#8a3a22", "mahogni"), ("O", "#b8683e", "mahogni lys"),
    ("e", "#26402f", "stoff skugge"), ("i", "#3f6a52", "stoff grønt"), ("I", "#72a282", "stoff lys"),
    ("d", "#a88a48", "stripe skugge"), ("D", "#d8c078", "stripe"),
    ("v", "#1a1a24", "jern djup"), ("V", "#34343f", "jern"), ("X", "#5a5a6a", "jern lys"),
    ("p", "#d8d0b8", "papir"), ("P", "#a89e86", "papir skugge"),
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
    for y in range(24, 27): L.p(12, y, "v" if y % 2 else "X")          # kjetting frå hetta
    for (x, y) in [(11, 27), (10, 28), (13, 27), (14, 28)]: L.p(x, y, "v")  # hank
    for x in range(8, 16): L.p(x, 29, "X" if x < 13 else "V")           # gryta i svart jern, lys kant
    for y, (a, b) in {30: (8, 15), 31: (8, 15), 32: (9, 14), 33: (10, 13)}.items():
        for x in range(a, b + 1): L.p(x, y, "X" if x == a + 1 and y < 32 else "v" if x >= b - 1 else "V")
    for x in range(3, 22): L.p(x, H - 3, "x"); L.p(x, H - 2, "n")        # grueheller
    omriss(L)
    return L


def hylle():
    """Hylle på veggen med to rosemålte trefat på høgkant og eit ølkrus med lok,
    hyllebord på to knektar. 2 fliser breitt."""
    W, H = 2 * 16 + 8, 22
    L = Lerret(W, H)
    for x in range(2, W - 2): L.p(x, 14, "C"); L.p(x, 15, "c"); L.p(x, 16, "A")          # hyllebordet
    for (kx, retn) in [(6, 1), (W - 7, -1)]:                                             # knektar
        for k in range(5):
            for d in range(5 - k): L.p(kx + retn * d, 17 + k, "c" if d == 0 else "A")
    for cx in (9, 21):                                                                   # trefat på høgkant
        for y in range(3, 14):
            for x in range(cx - 5, cx + 6):
                d = ((x - cx) ** 2 + (y - 8) ** 2) ** 0.5
                if d <= 5.4: L.p(x, y, "T" if d > 4.4 else "C" if d > 3.2 else "U")
        for (dx, dy, c) in [(0, 0, "y"), (-1, 0, "E"), (1, 0, "E"), (0, -1, "E"), (0, 1, "E"),
                            (-2, -2, "m"), (2, -2, "m"), (-2, 2, "m"), (2, 2, "m"), (-3, 0, "m"), (3, 0, "m")]:
            L.p(cx + dx, 8 + dy, c)
        L.p(cx - 3, 5, "w"); L.p(cx - 2, 4, "w")                                         # glans
    for y in range(6, 14):                                                               # ølkrus med lok og hank
        for x in range(28, 35): L.p(x, y, "C" if x < 30 else "c" if x < 33 else "A")
    for x in range(28, 35): L.p(x, 7, "a"); L.p(x, 12, "a")                               # band
    for x in range(27, 36): L.p(x, 5, "U")
    L.p(30, 4, "U"); L.p(31, 4, "U")
    for y in range(7, 12): L.p(36, y, "A")
    L.p(35, 7, "A"); L.p(35, 11, "A")
    omriss(L)
    return L


def sengebenk():
    """Sengebenk sett ovanfrå på skrå: høg hovudgavl til venstre, låg fotgavl til høgre,
    kvit pute, laken bretta ned og eit raudt, vove åklede med rutemønster (etter
    sengebenken på Bjørnebergstølen og åklede frå Vestlandet). 2 fliser breitt."""
    W, H = 2 * 16 + 8, 30
    L = Lerret(W, H)
    # sengeflata: raudt åklede med ruter og border
    for y in range(9, 22):
        for x in range(7, 33): L.p(x, y, "R")
    for x in range(7, 33): L.p(x, 9, "E"); L.p(x, 10, "y"); L.p(x, 20, "y"); L.p(x, 21, "r")
    for (cx, cy) in [(20, 15), (27, 15), (23, 12), (30, 12), (23, 18), (30, 18)]:     # ruter i åkledet
        for dx, dy in [(0, -2), (-1, -1), (1, -1), (-2, 0), (2, 0), (-1, 1), (1, 1), (0, 2)]: L.p(cx + dx, cy + dy, "y")
        L.p(cx, cy, "w")
    # lakenet bretta ned over åkledet, og puta
    for y in range(9, 22): L.p(15, y, "w"); L.p(16, y, "W")
    for y in range(8, 16):
        for x in range(7, 15): L.p(x, y, "w" if (y < 14 and x < 13) else "W")
    for x in range(8, 14): L.p(x, 8, "w")
    L.p(8, 9, "K"); L.p(13, 15, "K")
    # sida framme
    for x in range(6, 34): L.p(x, 22, "C"); L.p(x, 23, "c"); L.p(x, 24, "A"); L.p(x, 25, "a")
    # høg hovudgavl med knott, låg fotgavl
    for y in range(3, 27):
        for x in range(2, 7): L.p(x, y, "C" if x < 4 else "c" if x < 6 else "A")
    for x in range(2, 7): L.p(x, 2, "U")
    L.p(3, 1, "U"); L.p(4, 1, "U"); L.p(4, 0, "T")
    for y in range(12, 27):
        for x in range(33, 38): L.p(x, y, "C" if x < 35 else "c" if x < 37 else "A")
    for x in range(33, 38): L.p(x, 11, "U")
    for (x0, x1) in [(3, 5), (34, 36)]:                                    # bein
        for y in range(27, 29):
            for x in range(x0, x1 + 1): L.p(x, y, "a")
    omriss(L)
    return L


def langbord():
    """Langbord av furu sett ovanfrå på skrå, 4 x 2 fliser. Benk bak bordet, bordplate med
    plankar på langs, trefat med graut, skeier, eit brød og ei måla ølbolle, bein med
    sleid under, og ein kubbestol ved kvar ende."""
    W, H = 4 * 16 + 8, 2 * 16 + 8
    L = Lerret(W, H)
    # benken bak bordet: sete sett ovanfrå og framkant
    for y in range(2, 8):
        for x in range(14, W - 14): L.p(x, y, "C" if y < 4 else "c" if y < 6 else "A")
    # bordplata: plankar på langs, lysare øvst, skøytar som vassrette liner
    for y in range(8, 25):
        for x in range(11, W - 11):
            c = "C"
            if y in (13, 19): c = "c"                                   # skøytar mellom plankane
            elif y == 8: c = "U"
            elif (x * 7 + y * 3) % 23 == 0: c = "c"                     # årer i treet
            L.p(x, y, c)
    for x in range(11, W - 11): L.p(x, 25, "c"); L.p(x, 26, "A"); L.p(x, 27, "a")   # framkant
    for y in range(8, 27): L.p(11, y, "U"); L.p(W - 12, y, "A")
    # bein og sleid
    for x0 in (14, W - 16):
        for y in range(28, H - 1): L.p(x0, y, "c"); L.p(x0 + 1, y, "a")
    for x in range(16, W - 16): L.p(x, H - 5, "A"); L.p(x, H - 4, "a")
    # trefat med graut og smørauge, skeier
    for (cx, cy) in [(22, 16), (46, 17)]:
        for dy in range(-3, 4):
            for dx in range(-5, 6):
                d = dx * dx / 25 + dy * dy / 9
                if d <= 1: L.p(cx + dx, cy + dy, "T" if d > 0.55 else "k" if dy < 1 else "x")
        L.p(cx - 5, cy, "U"); L.p(cx + 5, cy, "t"); L.p(cx, cy - 1, "y")
        for k in range(4): L.p(cx + 7 + k // 2, cy - 2 + k, "U")
        L.p(cx + 7, cy - 3, "T")
    # brød
    for dy in range(-2, 3):
        for dx in range(-4, 5):
            if dx * dx / 16 + dy * dy / 4 <= 1: L.p(34 + dx, 12 + dy, "U" if dy < 0 else "T")
    L.p(33, 11, "y"); L.p(35, 12, "t")
    # måla ølbolle
    for dy in range(-2, 3):
        for dx in range(-3, 4):
            if dx * dx / 9 + dy * dy / 4 <= 1: L.p(54 + dx, 20 + dy, "m" if dy >= 1 or abs(dx) == 3 else "A" if dy < 0 else "c")
    L.p(52, 21, "E"); L.p(54, 22, "y"); L.p(56, 21, "E"); L.p(53, 19, "U")
    # kubbestolar: hol stokk med rundt sete sett ovanfrå og rygg som bøyer seg rundt yttersida
    for (cx, ut) in [(4, -1), (W - 5, 1)]:
        for y in range(20, 34):                                         # kroppen, rund stokk
            for dx in range(-3, 4):
                L.p(cx + dx, y, "C" if dx < -1 else "c" if dx < 2 else "A")
        for dx in range(-3, 4): L.p(cx + dx, 34, "a")
        L.p(cx, 26, "a"); L.p(cx - 1, 29, "a")                         # sprekker i stokken
        for dy in range(-2, 2):                                         # setet
            for dx in range(-3, 4):
                if dx * dx / 9 + dy * dy / 3 <= 1: L.p(cx + dx, 20 + dy, "U" if dy < 0 else "C")
        for y in range(11, 20):                                         # ryggen på yttersida
            for k in range(3): L.p(cx + ut * (3 - k), y, "C" if k == 0 else "c" if k == 1 else "A")
            L.p(cx + ut * 1, y, "A") if y > 15 else None
        for k in range(3): L.p(cx + ut * (3 - k), 10, "U")
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


# ---- Prestegarden, kontoret og boksamlinga på Ekset (runde 7) ----
# Embetsmannsheimen skal sjå dansk og borgarleg ut ved sida av bondestova: mahogni,
# messing, kvite duker, kakkelomn og golvur i staden for grue og furu.

def panel(L, x0, y0, x1, y1, fyll="M", lys="O", mork="j"):
    """Fylling i eit møbel: mørk kant nede og til høgre, lys kant oppe og til venstre."""
    for y in range(y0, y1 + 1):
        for x in range(x0, x1 + 1):
            c = fyll
            if y == y0 or x == x0: c = lys
            if y == y1 or x == x1: c = mork
            L.p(x, y, c)


def kakkelomn():
    """Etasjeomn i støypejern på bein, med relieff, glør i ei luke og røyrpipe opp i veggen."""
    W, H = 16 + 8, 2 * 16 + 16
    L = Lerret(W, H)
    for y in range(0, 12): L.p(10, y, "V"); L.p(11, y, "X"); L.p(12, y, "V"); L.p(13, y, "v")     # røyr
    for x in range(5, 19): L.p(x, 12, "X"); L.p(x, 13, "V")                                           # krone
    for y in range(14, 26):                                                                           # øvre etasje
        for x in range(6, 18): L.p(x, y, "X" if x == 6 else "v" if x == 17 else "V")
    panel(L, 8, 16, 15, 23, "V", "X", "v")
    for x in range(4, 20): L.p(x, 26, "X"); L.p(x, 27, "v")                                           # hylle mellom
    for y in range(28, H - 4):                                                                        # nedre etasje
        for x in range(5, 19): L.p(x, y, "X" if x == 5 else "v" if x == 18 else "V")
    for y in range(31, 39):                                                                           # luke med glør
        for x in range(8, 16): L.p(x, y, "N" if y < 33 else "F" if (x + y) % 3 else "f")
    for x in range(8, 16): L.p(x, 30, "X"); L.p(x, 39, "v")
    for x in range(4, 20): L.p(x, H - 4, "X")
    for x in (6, 17):                                                                                 # bein
        for y in range(H - 3, H): L.p(x, y, "V")
    omriss(L)
    return L


def skatoll():
    """Skatoll (skrivekommode) i mahogni: skuffer nede, skråklaff med papir, skap med dører og krone.
    Ikkje høgare enn at krona held seg innanfor bakveggen."""
    W, H = 2 * 16 + 8, 2 * 16 + 8
    L = Lerret(W, H)
    for x in range(3, W - 3): L.p(x, 0, "O"); L.p(x, 1, "M"); L.p(x, 2, "j")                        # krone
    for y in range(3, 15):                                                                            # skap
        for x in range(5, W - 5): L.p(x, y, "J")
    panel(L, 7, 4, 18, 14); panel(L, 21, 4, 32, 14)
    L.p(18, 9, "Y"); L.p(21, 9, "Y")
    for y in range(15, 22):                                                                           # skråklaff
        for x in range(4 - (y - 15) // 4, W - 4 + (y - 15) // 4): L.p(x, y, "O" if y < 17 else "M")
    for (x, y) in [(10, 18), (11, 18), (12, 18), (13, 19), (26, 18), (27, 18)]: L.p(x, y, "p")          # papir
    L.p(30, 17, "b"); L.p(30, 16, "w")                                                                # blekkhus og fjørpenn
    for y in range(22, H - 3):                                                                        # skuffer
        for x in range(3, W - 3): L.p(x, y, "M")
    for sy in (22, 27, 32):
        for x in range(3, W - 3): L.p(x, sy, "O"); L.p(x, sy + 4, "j")
        L.p(12, sy + 2, "Y"); L.p(27, sy + 2, "Y")
    for x in range(3, W - 3): L.p(x, H - 3, "j")
    for x in (4, 5, W - 6, W - 5): L.p(x, H - 2, "J"); L.p(x, H - 1, "j")                          # føter
    omriss(L)
    return L


def golvur():
    """Golvur med rund urskive, messingpendel bak glas og krone, i mahogni."""
    W, H = 16 + 8, 2 * 16 + 8
    L = Lerret(W, H)
    for x in range(8, 16): L.p(x, 0, "Y")
    for x in range(5, 19): L.p(x, 1, "O"); L.p(x, 2, "J")
    for y in range(3, 17):                                                                            # hovudet med urskiva
        for x in range(4, 20): L.p(x, y, "M" if x > 5 else "O")
    for y in range(4, 16):
        for x in range(6, 18):
            if (x - 11.5) ** 2 + (y - 9.5) ** 2 <= 30: L.p(x, y, "w" if (x - 11.5) ** 2 + (y - 9.5) ** 2 < 20 else "Y")
    for (x, y) in [(11, 6), (11, 7), (11, 8), (11, 9), (12, 9), (13, 9), (14, 10)]: L.p(x, y, "b")      # visarar
    for y in range(17, H - 6):                                                                        # kassa
        for x in range(7, 17): L.p(x, y, "O" if x == 7 else "j" if x == 16 else "M")
    panel(L, 9, 19, 14, 31, "N", "J", "j")
    for y in range(20, 27): L.p(11, y, "Y")
    for y in range(26, 30):
        for x in range(10, 14): L.p(x, y, "y" if x < 12 else "Y")
    for y in range(H - 6, H):                                                                         # fot
        for x in range(5, 19): L.p(x, y, "O" if y == H - 6 else "M" if x < 17 else "j")
    omriss(L)
    return L


def sofa():
    """Empiresofa med svungne armlener i mahogni og grøn, stripete trekk, 3 fliser breitt."""
    W, H = 3 * 16 + 8, 30
    L = Lerret(W, H)
    for y in range(3, 16):                                                                            # rygg
        for x in range(6, W - 6):
            L.p(x, y, "I" if y < 5 else ("i" if (x // 3) % 2 else "e") if y < 14 else "e")
    for x in range(5, W - 5): L.p(x, 2, "O"); L.p(x, 3, "M")                                         # ramme øvst
    for y in range(16, 22):                                                                           # sete
        for x in range(8, W - 8): L.p(x, y, "I" if y == 16 else "i" if (x // 3) % 2 else "e")
    for x in range(5, W - 5): L.p(x, 22, "O"); L.p(x, 23, "M"); L.p(x, 24, "j")                     # framkant
    for (ax, retn) in [(3, 1), (W - 9, -1)]:                                                          # armlener
        for y in range(8, 24):
            for x in range(ax, ax + 6): L.p(x, y, "M" if 0 < x - ax < 5 else "O" if x == ax else "j")
        for x in range(ax - 1, ax + 7): L.p(x, 7, "O"); L.p(x, 8, "M")
        L.p(ax + 2, 10, "Y"); L.p(ax + 3, 10, "Y")
    for x in (6, 7, W - 8, W - 7):                                                                    # føter
        for y in range(25, H - 1): L.p(x, y, "J")
    omriss(L)
    return L


def spisebord():
    """Spisebord med kvit duk, tallerkar og lysestake, to stolar med rygg bak, 2 x 2 fliser."""
    W, H = 2 * 16 + 8, 2 * 16 + 10
    L = Lerret(W, H)
    for cx in (12, 28):                                                                               # stolryggar
        for y in range(0, 12):
            for x in range(cx - 5, cx + 5): L.p(x, y, "O" if x == cx - 5 else "j" if x == cx + 4 else "M")
        for y in range(3, 9):
            for x in range(cx - 2, cx + 2): L.p(x, y, "J")
    for y in range(12, 28):                                                                           # duken
        for x in range(3, W - 3): L.p(x, y, "w" if y < 26 else "W")
    for x in range(3, W - 3):
        for y in range(28, 31): L.p(x, y, "W" if (x + y) % 3 else "K")                               # blondekant
    for (x, y) in [(12, 17), (28, 17)]:                                                               # tallerkar
        for dx in range(-3, 4):
            for dy in range(-2, 3):
                if dx * dx / 9 + dy * dy / 4 <= 1: L.p(x + dx, y + dy, "s" if dx * dx / 9 + dy * dy / 4 < 0.5 else "S")
    for y in range(15, 23): L.p(20, y, "Y")                                                           # lysestake
    L.p(19, 22, "Z"); L.p(21, 22, "Z"); L.p(20, 14, "l"); L.p(20, 13, "L")
    for x in (6, 7, W - 8, W - 7):
        for y in range(31, H): L.p(x, y, "M" if x % 2 == 0 else "j")
    omriss(L)
    return L


def skrivepult():
    """Skrivepult på kontoret: skrå plate med protokoll og papir, blekkhus med fjørpenn, bøker i stabel."""
    W, H = 2 * 16 + 8, 2 * 16 + 10
    L = Lerret(W, H)
    for (x0, y0, c) in [(4, 8, "R"), (5, 4, "m"), (4, 0, "T")]:                                       # stabel med protokollar
        for y in range(y0, y0 + 4):
            for x in range(x0, x0 + 11): L.p(x, y, c if y > y0 else "p")
        L.p(x0 + 10, y0 + 2, "Y")
    for y in range(12, 28):                                                                           # skrå plate
        for x in range(3, W - 3): L.p(x, y, "O" if y < 14 else "M")
    for y in range(15, 25):                                                                           # open protokoll
        for x in range(9, 29): L.p(x, y, "p" if x != 19 else "P")
    for y in (17, 19, 21, 23):
        for x in list(range(11, 18)) + list(range(21, 28)):
            if (x * 7 + y) % 5: L.p(x, y, "g")
    L.p(24, 21, "b"); L.p(25, 22, "b"); L.p(26, 21, "b")                                               # blekkflekk
    for y in range(13, 16):                                                                           # blekkhus
        for x in range(31, 35): L.p(x, y, "b")
    for (x, y) in [(33, 12), (34, 11), (35, 10), (35, 9), (36, 8)]: L.p(x, y, "w")                    # fjørpenn
    for x in range(3, W - 3): L.p(x, 28, "O"); L.p(x, 29, "j")
    for y in range(30, H - 1):                                                                        # skuff og bein
        for x in range(3, W - 3):
            if y < 35: L.p(x, y, "M" if y != 34 else "j")
            elif x in (4, 5, W - 6, W - 5): L.p(x, y, "J")
    L.p(W // 2, 32, "Y")
    omriss(L)
    return L


BOKFARGAR = ["R", "E", "m", "B", "c", "T", "i", "Z", "J"]


def bokhylle_fyll(L, x0, x1, y0, y1, fro):
    """Ei hylle med bokryggar i ulike fargar og høgder, lys kant til venstre og gull på ryggen."""
    x = x0
    while x <= x1:
        w = 2 + int(h(x, y0, fro) * 2); c = BOKFARGAR[int(h(x, y0, fro + 1) * len(BOKFARGAR))]
        top = y0 + int(h(x, y0, fro + 2) * 3)
        if h(x, y0, fro + 3) > 0.9:                                   # ei bok som ligg skrått
            for k in range(w + 2):
                if x + k <= x1: L.p(x + k, y1 - k // 2, c)
            x += w + 3; continue
        for yy in range(top, y1 + 1):
            for xx in range(x, min(x + w, x1 + 1)): L.p(xx, yy, c)
        if h(x, y0, fro + 5) > 0.45: L.p(x, top, "y" if c in "RmJ" else "w")      # lys kant på somme
        if top + 2 <= y1 and h(x, y0, fro + 6) > 0.7: L.p(x + w - 1, top + 2, "Y")   # gulltrykk på få
        x += w + (1 if h(x, y0, fro + 4) > 0.75 else 0)


def bokreol():
    """Høg bokreol i mahogni med fire hyller, 2 x 2 fliser."""
    W, H = 2 * 16 + 8, 2 * 16 + 16
    L = Lerret(W, H)
    for x in range(2, W - 2): L.p(x, 0, "O"); L.p(x, 1, "M"); L.p(x, 2, "j")
    for y in range(3, H - 2):
        for x in range(3, W - 3): L.p(x, y, "J" if x in (3, 4) else "j" if x in (W - 5, W - 4) else "a")
    for k, hy in enumerate((13, 23, 33, 43)):
        bokhylle_fyll(L, 6, W - 7, hy - 9, hy - 1, 30 + k * 7)
        for x in range(3, W - 3): L.p(x, hy, "O"); L.p(x, hy + 1, "j")
    for x in range(2, W - 2): L.p(x, H - 2, "M"); L.p(x, H - 1, "j")
    omriss(L)
    return L


def bokreol_brei():
    """Låg, brei bokreol langs veggen med to hyller, 5 fliser breitt (boksamlinga på Ekset)."""
    W, H = 5 * 16 + 8, 32
    L = Lerret(W, H)
    for x in range(2, W - 2): L.p(x, 0, "O"); L.p(x, 1, "M"); L.p(x, 2, "j")
    for y in range(3, H - 2):
        for x in range(3, W - 3): L.p(x, y, "J" if x in (3, 4) else "j" if x in (W - 5, W - 4) else "a")
    for k, hy in enumerate((15, 27)):
        bokhylle_fyll(L, 6, W - 7, hy - 10, hy - 1, 60 + k * 9)
        for x in range(3, W - 3): L.p(x, hy, "O"); L.p(x, hy + 1, "j")
    for sx in (30, 57):                                                                               # stolpar
        for y in range(3, H - 2): L.p(sx, y, "J"); L.p(sx + 1, y, "j")
    for x in range(2, W - 2): L.p(x, H - 2, "M"); L.p(x, H - 1, "j")
    omriss(L)
    return L


def lesebord():
    """Lesebord med grøn duk, opa bok, lys i stake og ein globus, 3 fliser breitt."""
    W, H = 3 * 16 + 8, 30
    L = Lerret(W, H)
    for y in range(8, 20):
        for x in range(3, W - 3): L.p(x, y, "I" if y < 10 else "i" if y < 18 else "e")
    for x in range(3, W - 3): L.p(x, 20, "M"); L.p(x, 21, "j")
    for x in (5, 6, W - 7, W - 6):
        for y in range(22, H - 1): L.p(x, y, "M" if x % 2 else "J")
    for y in range(11, 17):                                                                           # opa bok
        for x in range(20, 36): L.p(x, y, "p" if x != 28 else "P")
    for y in (12, 14):
        for x in list(range(21, 27)) + list(range(29, 35)): L.p(x, y, "g" if x % 3 else "p")
    for x in range(19, 37): L.p(x, 17, "R")
    for y in range(4, 13): L.p(10, y, "w" if y > 5 else "l")                                          # lys
    L.p(10, 3, "L"); L.p(9, 13, "Y"); L.p(10, 13, "Y"); L.p(11, 13, "Y")
    gx, gy = 45, 5                                                                                    # globus
    for y in range(-5, 6):
        for x in range(-5, 6):
            if x * x + y * y <= 25:
                hav = "B" if x * x + y * y < 12 and x < 1 else "b"
                land = h(x + 3, y + 7, 77) > 0.62
                L.p(gx + x, gy + y + 2, ("i" if x < 1 else "e") if land else hav)
    for y in range(8, 14): L.p(gx, y + 2, "Y")
    for x in range(gx - 3, gx + 4): L.p(x, 16, "Z")
    omriss(L)
    return L


def stol():
    """Stol med høg rygg sett bakfrå (den som sit, ser mot bordet)."""
    W, H = 16 + 8, 26
    L = Lerret(W, H)
    for x in range(6, 18): L.p(x, 1, "O"); L.p(x, 2, "M")
    for y in range(3, 16):
        L.p(6, y, "O"); L.p(7, y, "M"); L.p(16, y, "J"); L.p(17, y, "j")
        if 5 <= y <= 12:
            for x in range(10, 14): L.p(x, y, "M" if x < 13 else "j")
    for y in range(16, 20):
        for x in range(5, 19): L.p(x, y, "i" if y < 18 else "e")
    for x in range(5, 19): L.p(x, 20, "j")
    for x in (6, 17):
        for y in range(21, H - 1): L.p(x, y, "J")
    omriss(L)
    return L


INVENTAR = {
    "kakkelomn": kakkelomn, "skatoll": skatoll, "golvur": golvur, "sofa": sofa, "spisebord": spisebord,
    "skrivepult": skrivepult, "bokreol": bokreol, "bokreol-brei": bokreol_brei, "lesebord": lesebord, "stol": stol,
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
