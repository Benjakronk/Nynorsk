"""Inventar som heile figurar: kyrkja (altartavle, alterring, preikestol, lysekrone), bondestova
(grue, hylle, sengebenk, rokk, og langbord, benk og kubbestol som eigne bilete i fleire retningar)
og embetsmannsheimen (kakkelomn, skatoll, golvur, sofa,
spisebord, skrivepult, bokreolar, lesebord, stol).

Etter kyrkjene i Kvernes og Hove og altertavla i Fåberg (sjå konsept/): bondebarokk
med måla felt og forgylt treskurd, kvit altarduk med lysestakar, kvitmåla alterring
med raud knefallspute, brunraud åttekanta preikestol på ei søyle, lysekrone i messing.

  python tools/pikselkunst/inventar.py alle [--tving]     skriv kjelder/inne-*.pix

Figurane følgjer same regel som husa (bygg.py): breidda er fliser x 16 + 8, og dei
står med botnen nedst i den nedste flisraden sin. I kartet står dei under «bygg».
Stolar og benker ein kan sitje på, står i SETE i js/rpg/pikslar.js (sjå SKILL.md).
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
    ("a", "#2e1a10", "furu djup"), ("A", "#5a3a22", "furu skugge"), ("c", "#8a5e36", "furu"), ("C", "#b08650", "furu lys"), ("q", "#d6b070", "furu lysast"),
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


# Møblar til bondestova som kan setjast saman på fleire måtar: langbord, benk og kubbestol.

# Felles mål (sjå SKILL.md): Setet på benken og kubbestolen er SETE_HOGD pikslar over golvet, og
# den som sit, blir lyft like mykje (SETE i js/rpg/pikslar.js). Bordplata ligg BORD_HOGD pikslar
# over golvet og dekkjer heile fotavtrykket, så bordkanten bak går 14 pikslar opp i flisraden bak
# bordet: den som sit på ein benk der, blir dekt frå hoftene og ned.
SETE_HOGD = 5
BORD_HOGD = 14


def _bordplate(L, x0, x1, y0, y1, langs):
    """Bordplate av furu med plankar på langs (langs="x": vassrette skøytar, "y": loddrette)."""
    for y in range(y0, y1 + 1):
        for x in range(x0, x1 + 1):
            fuge = (y - y0) % 8 == 7 if langs == "x" else (x - x0) % 8 == 7
            L.p(x, y, "c" if fuge else "C")                                 # skøytar mellom plankane
    # årer i treet: korte strekar på langs av plankane, ikkje einsame pikslar
    for i in range((x1 - x0) * (y1 - y0) // 60):
        ax, ay = x0 + 2 + int(h(i, 1, 41) * (x1 - x0 - 6)), y0 + 2 + int(h(i, 2, 41) * (y1 - y0 - 4))
        for k in range(3 + int(h(i, 3, 41) * 3)):
            px, py = (ax + k, ay) if langs == "x" else (ax, ay + k)
            if L.get(px, py) == "C": L.p(px, py, "c")
    for x in range(x0, x1 + 1): L.p(x, y0, "q")                             # kanten bak fangar lyset
    for y in range(y0, y1 + 1): L.p(x0, y, "q"); L.p(x1, y, "A")            # lys kant til venstre, skugge til høgre
    for x in range(x0, x1 + 1):                                             # framkanten
        L.p(x, y1 + 1, "c"); L.p(x, y1 + 2, "A"); L.p(x, y1 + 3, "a")
    L.p(x0, y1 + 1, "C"); L.p(x1, y1 + 1, "A")


def _bordbein(L, x0, x1, ytopp, ybotn):
    """To bein framme med sleid mellom, og mørkt under plata."""
    for x in range(x0 + 2, x1 - 1): L.p(x, ytopp, "a")                      # skugge under plata
    for xb in (x0 + 2, x1 - 4):
        for y in range(ytopp, ybotn + 1): L.p(xb, y, "C"); L.p(xb + 1, y, "c"); L.p(xb + 2, y, "a")
    sy = ybotn - 3
    for x in range(x0 + 5, x1 - 4): L.p(x, sy, "c"); L.p(x, sy + 1, "a")


def _paa_bordet(L, *ting):
    """Teiknar ting på bordplata, kvar med ein smal skugge mot høgre og ned (lyset frå oppe til venstre)."""
    for fn, *arg in ting:
        for_ = [r[:] for r in L.g]
        fn(L, *arg)
        ny = [(x, y) for y in range(L.h) for x in range(L.w) if L.g[y][x] != for_[y][x]]
        sett = set(ny)
        for x, y in ny:
            if (x + 1, y + 1) not in sett and L.get(x + 1, y + 1) in "Cc": L.p(x + 1, y + 1, "A")


def _fat(L, cx, cy):
    """Trefat med graut og smørauge, og ei skei ved sida."""
    for dy in range(-3, 4):
        for dx in range(-5, 6):
            d = dx * dx / 25 + dy * dy / 9
            if d <= 1: L.p(cx + dx, cy + dy, "T" if d > 0.55 else "k" if dy < 1 else "x")
    L.p(cx - 5, cy, "U"); L.p(cx + 5, cy, "t"); L.p(cx, cy - 1, "y")
    for k in range(4): L.p(cx + 7 + k // 2, cy - 2 + k, "U")
    L.p(cx + 7, cy - 3, "T")


def _brod(L, cx, cy):
    for dy in range(-2, 3):
        for dx in range(-4, 5):
            if dx * dx / 16 + dy * dy / 4 <= 1: L.p(cx + dx, cy + dy, "U" if dy < 0 else "T")
    L.p(cx - 1, cy - 1, "y"); L.p(cx + 1, cy, "t")


def _flatbrod(L, cx, cy):
    """Ein stabel flatbrød: tynne, runde leivar med brune flekker."""
    for k in (2, 1, 0):
        for dy in range(-3, 4):
            for dx in range(-6, 7):
                if dx * dx / 36 + dy * dy / 9 <= 1: L.p(cx + dx, cy + dy + k, "U" if k else ("q" if dy < 1 else "C"))
    for dx, dy in ((-3, -1), (1, -2), (3, 0), (-1, 1), (4, -1)): L.p(cx + dx, cy + dy, "U")


def _kniv(L, x, y, langs):
    for k in range(5): L.p(*((x + k, y) if langs == "x" else (x, y + k)), "X" if k < 3 else "t")


def _olbolle(L, cx, cy):
    """Måla ølbolle (rosemaling i blått og raudt)."""
    for dy in range(-2, 3):
        for dx in range(-3, 4):
            if dx * dx / 9 + dy * dy / 4 <= 1: L.p(cx + dx, cy + dy, "m" if dy >= 1 or abs(dx) == 3 else "A" if dy < 0 else "c")
    L.p(cx - 2, cy + 1, "E"); L.p(cx, cy + 2, "y"); L.p(cx + 2, cy + 1, "E"); L.p(cx - 1, cy - 1, "U")


def langbord():
    """Langbord av furu, liggjande (på tvers), 4 x 2 fliser, utan stolar. Plata dekkjer heile
    fotavtrykket og ligg BORD_HOGD pikslar over golvet, med trefat med graut, skeier, brød og
    ei måla ølbolle. Sjå benk() og kubbestol() for seta rundt."""
    W, H = 4 * 16 + 8, 2 * 16 + BORD_HOGD + 1
    L = Lerret(W, H)
    _bordplate(L, 4, W - 5, 1, H - BORD_HOGD - 2, "x")                  # plata: rad 1 til 31
    _bordbein(L, 4, W - 5, H - 12, H - 2)
    _paa_bordet(L, (_flatbrod, 14, 8), (_fat, 26, 19), (_brod, 40, 9), (_kniv, 46, 13, "x"), (_fat, 48, 25), (_olbolle, 60, 14))
    omriss(L)
    return L


def langbord_staande():
    """Langbord av furu, ståande (på langs nedover), 2 x 4 fliser, same plate og same ting."""
    W, H = 2 * 16 + 8, 4 * 16 + BORD_HOGD + 1
    L = Lerret(W, H)
    _bordplate(L, 4, W - 5, 1, H - BORD_HOGD - 2, "y")
    _bordbein(L, 4, W - 5, H - 12, H - 2)
    _paa_bordet(L, (_flatbrod, 13, 8), (_brod, 26, 19), (_kniv, 29, 23, "y"), (_fat, 14, 31), (_fat, 23, 46), (_olbolle, 14, 56))
    omriss(L)
    return L


def benk(n=4):
    """Liggjande benk av furu, n fliser lang: tjukk planke på bein, SETE_HOGD pikslar høg."""
    W, H = n * 16 + 8, 18
    L = Lerret(W, H)
    x0, x1 = 5, W - 6
    # Setet: planken sett ovanfrå (golv 5 til 12 i flisa, lyft SETE_HOGD), framkant og bein.
    for y in range(2, 9):
        for x in range(x0, x1 + 1): L.p(x, y, "q" if y == 2 else "C")
    for i in range(n * 2):                                         # årer: korte strekar på langs
        ax, ay = x0 + 3 + int(h(i, 1, 43) * (x1 - x0 - 8)), 4 + int(h(i, 2, 43) * 4)
        for k in range(3 + int(h(i, 3, 43) * 3)): L.p(ax + k, ay, "c")
    for y in range(2, 9): L.p(x0, y, "q"); L.p(x1, y, "A")
    for x in range(x0, x1 + 1): L.p(x, 9, "c"); L.p(x, 10, "A")
    for xb in [x0 + 2, x1 - 3] + ([W // 2 - 1] if n > 2 else []):
        for y in range(11, 15): L.p(xb, y, "c"); L.p(xb + 1, y, "a")
    omriss(L)
    return L


def benk_staande(n=4):
    """Ståande benk (på langs nedover), n fliser lang. Same planke, sett frå enden."""
    W, H = 16 + 8, n * 16 + 4
    L = Lerret(W, H)
    x0, x1 = 8, 15
    ybak, yfram = 1, H - 10                                        # setet: golv 2 til n*16-3, lyft 5
    for y in range(ybak, yfram + 1):
        for x in range(x0, x1 + 1):
            L.p(x, y, "q" if x == x0 else "A" if x == x1 else "C")
    for i in range(n * 2):                                         # årer: korte strekar på langs
        ax, ay = x0 + 2 + int(h(i, 1, 44) * 4), ybak + 3 + int(h(i, 2, 44) * (yfram - ybak - 8))
        for k in range(3 + int(h(i, 3, 44) * 3)): L.p(ax, ay + k, "c")
    for x in range(x0, x1 + 1): L.p(x, ybak, "q")
    for x in range(x0, x1 + 1): L.p(x, yfram + 1, "c"); L.p(x, yfram + 2, "A")
    for xb in (x0, x1 - 1):
        for y in range(yfram + 3, yfram + 7): L.p(xb, y, "c" if xb == x0 else "A"); L.p(xb + 1, y, "a")
    for y in range(ybak + 2, yfram + 1): L.p(x1 + 1, y, "a")                  # skuggesida under planken
    omriss(L)
    return L


RETNINGAR = {"ned": (0, -1), "opp": (0, 1), "venstre": (1, 0), "hogre": (-1, 0)}


def kubbestol(retning):
    """Kubbestol: ein hol stokk med rundt sete, og ryggen er resten av stokkveggen som går opp
    bak den som sit og bøyer seg rundt sidene. retning er den vegen den som sit, ser (ned, opp,
    venstre, høgre), så ryggen står på motsett side. 1 x 1 flis, setet er SETE_HOGD pikslar over
    golvet, midt på golvpunktet til figuren (rad H-5). Teikna med fast tone per flate (cel-skugge):
    toppen lysast, flata mot venstre lys, mot oss mellomtone, mot høgre skugge."""
    W, H = 16 + 8, 28
    L = Lerret(W, H)
    cx, base, K = 12, H - 5, 0.6                           # K: kor mykje djupna blir trykt saman
    R, RI = 7.5, 5.5                                       # radius på stokken og inni ryggen
    bx, bd = RETNINGAR[retning]                            # ryggen står mot (bx, bd) frå midten

    def rygg(X, D):
        r = math.hypot(X, D)
        if r > R or r < RI: return 0
        d = (X * bx + D * bd) / r
        return 0 if d < -0.2 else round(3 + 4 * max(0, d))  # høgast midt bak, lågare ut mot sidene

    def fast(X, D, Z):
        r = math.hypot(X, D)
        if r > R or Z < 0: return False
        if Z < SETE_HOGD: return True
        return Z < SETE_HOGD + rygg(X, D)

    vox = [(Z, D, X) for Z in range(0, SETE_HOGD + 11) for D in range(-8, 9) for X in range(-8, 9) if fast(X, D, Z)]
    vox.sort()
    for Z, D, X in vox:
        px, py = cx + X, base - Z + round(D * K)
        r = math.hypot(X, D) or 1
        if not fast(X, D, Z + 1):
            c = "q"                                         # kanten øvst på ryggen er lysast
            if Z == SETE_HOGD - 1:                          # setet, i skugge inntil ryggen
                c = "c" if any(fast(X + dx, D + dd, Z + 1) for dx, dd in ((0, -1), (-1, 0), (1, 0), (0, -2))) else "C"
        else:
            nx, nd = X / r, D / r
            if r < (R + RI) / 2: nx, nd = -nx, -nd          # innsida av ryggen
            lys = -nx * 0.8 + nd * 0.4
            c = "C" if lys > 0.55 else "c" if lys > 0 else "A" if lys > -0.6 else "a"
        L.p(px, py, c)
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
    "grue": grue, "hylle": hylle, "sengebenk": sengebenk, "langbord": langbord, "langbord-staande": langbord_staande,
    "benk": benk, "benk-kort": lambda: benk(2), "benk-staande": benk_staande, "benk-staande-kort": lambda: benk_staande(2),
    "kubbestol-ned": lambda: kubbestol("ned"), "kubbestol-opp": lambda: kubbestol("opp"),
    "kubbestol-venstre": lambda: kubbestol("venstre"), "kubbestol-hogre": lambda: kubbestol("hogre"),
    "rokk": rokk,"altartavle": altartavle, "altarring": altarring, "preikestol": preikestol, "lysekrone": lysekrone}


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
