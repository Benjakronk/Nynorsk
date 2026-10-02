"""Hus som heile figurar (ikkje gjentekne fliser), i stil med The Minish Cap:
taket dominerer, har tjukt utheng og kastar skugge ned på veggen.

Byggjeskikken er frå Sunnmøre og Vestlandet på 1800-talet (sjå konsept/):
torvtak med never under torva, vindskier som kryssar over mønet, laft med
utstikkande laftehovud, små vindauge og grunnmur av stein. Stabburet står
på steinstolpar.

  python tools/pikselkunst/bygg.py stove      skriv kjelder/bygg-stove.pix
  python tools/pikselkunst/bygg.py alle [--tving]

Figuren dekkjer fotavtrykket i kartet (breidd x høgd i fliser) og stikk
4 pikslar ut på sidene og 8 pikslar opp (uthenget og vindskiene).
"""
import sys, os, math

ROT = os.path.dirname(os.path.abspath(__file__))
UT_X, UT_Y = 4, 8          # kor langt figuren stikk ut til venstre og opp

def h(x, y, s):            # fast «tilfeldig» tal for tekstur
    n = (x * 374761393 + y * 668265263 + s * 1442695041) & 0xFFFFFFFF
    n = ((n ^ (n >> 13)) * 1274126177) & 0xFFFFFFFF
    return ((n ^ (n >> 16)) & 0xFFFFFFFF) / 4294967296

PAL = [
    (".", "-", ""), ("o", "#0a0514", "omriss"),
    ("0", "#262c16", "torv djup"), ("1", "#434e24", "torv skugge"), ("2", "#6a7a34", "torv"), ("3", "#98a648", "torv lys"), ("4", "#ccc46c", "torv glans, solbleikt"),
    ("y", "#f4dc70", "blom gul"), ("q", "#f0eef4", "blom kvit"), ("p", "#d87aa0", "blom raud"),
    ("n", "#2a1c16", "never mørk"), ("N", "#6a5642", "never"),
    ("a", "#26160e", "tømmer djup"), ("b", "#44281a", "tømmer skugge"), ("c", "#664228", "tømmer"), ("d", "#8a6038", "tømmer lys"), ("e", "#b08650", "tømmer glans"),
    ("A", "#1e1a26", "stein djup"), ("B", "#3e3c4c", "stein skugge"), ("C", "#646274", "stein"), ("D", "#8e8ca0", "stein lys"),
    ("w", "#ece6d6", "vindaugsramme"), ("W", "#b0a890", "ramme skugge"), ("g", "#24345e", "glas"), ("G", "#5a7cbc", "glas lys"), ("r", "#c4e2ff", "refleks"),
    ("i", "#2a2838", "jern"),
    ("K", "#5a5a72", "panel djup"), ("L", "#9a9ab0", "panel skugge"), ("M", "#cfcfdc", "panel"), ("P", "#ecebf2", "panel lys"), ("Q", "#ffffff", "panel glans"),
    ("S", "#14161f", "skifer djup"), ("T", "#232838", "skifer skugge"), ("U", "#353d52", "skifer"), ("V", "#4f5a74", "skifer lys"), ("X", "#75809a", "skifer glans"),
    ("Y", "#f8d840", "gull"), ("Z", "#b07818", "gull skugge"),
    ("R", "#3a0e18", "dør raud djup"), ("E", "#6a1a2a", "dør raud"), ("F", "#983040", "dør raud lys"),
    ("H", "#7a3226", "tegl"), ("I", "#a8503a", "tegl lys"),
]


class Lerret:
    def __init__(s, w, h): s.w, s.h = w, h; s.g = [["." for _ in range(w)] for _ in range(h)]
    def p(s, x, y, c):
        if 0 <= x < s.w and 0 <= y < s.h: s.g[y][x] = c
    def rad(s, y, x0, x1, c):
        for x in range(x0, x1 + 1): s.p(x, y, c)
    def rect(s, x, y, w, h, c):
        for j in range(h): s.rad(y + j, x, x + w - 1, c)
    def get(s, x, y): return s.g[y][x] if 0 <= x < s.w and 0 <= y < s.h else "."


def torvtak(L, x0, x1, y0, y1, fro):
    """Torvtak frå mønet (y0) til takskjegget (y1): avrunda silhuett, lyse og mørke band,
    torvklumpar med lys oppe til venstre, og ei tjukk leppe av torv over neveren."""
    hoyd = y1 - y0
    band = lambda t: "4" if t < 0.06 else "3" if t < 0.34 else "2" if t < 0.78 else "1"
    for y in range(y0, y1 + 1):
        t = (y - y0) / max(1, hoyd)
        for x in range(x0, x1 + 1):
            c = band(t)
            # rutemønster i overgangane mellom banda
            if band(t + 0.035) != c and (x + y) % 2 == 0: c = band(t + 0.035)
            L.p(x, y, c)
    # avrunda hjørne
    for (dx, dy) in [(0, 0), (1, 0), (0, 1), (2, 0)]:
        L.p(x0 + dx, y0 + dy, "."); L.p(x1 - dx, y0 + dy, ".")
    # torvklumpar i forskotne rader, som takstein
    rad = 0
    for y in range(y0 + 3, y1 - 1, 5):
        for x in range(x0 + 3 + (rad % 2) * 4, x1 - 3, 8):
            x_ = x + int(h(x, y, fro) * 3) - 1
            under = L.get(x_, y)
            lys = {"4": "4", "3": "4", "2": "3", "1": "2"}.get(under, "3")
            mork = {"4": "3", "3": "2", "2": "1", "1": "0"}.get(under, "1")
            for dx, dy in [(-1, 0), (0, -1), (1, -1)]: L.p(x_ + dx, y + dy, lys)
            for dx, dy in [(1, 1), (2, 0), (0, 1)]: L.p(x_ + dx, y + dy, mork)
        rad += 1
    # nokre blomar øvst på taket
    for i in range(max(2, (x1 - x0) // 14)):
        x = x0 + 4 + int(h(i, 3, fro) * (x1 - x0 - 8)); y = y0 + 2 + int(h(i, 4, fro) * hoyd * 0.45)
        L.p(x, y, "yqp"[i % 3])
    # grastuster som stikk opp over mønet
    for x in range(x0 + 3, x1 - 2, 4):
        if h(x, 0, fro) > 0.35: L.p(x, y0 - 1, "3"); L.p(x + 1, y0 - 1, "4")
    # leppa: torva bular fram over neveren
    for x in range(x0 + 1, x1):
        L.p(x, y1 + 1, "2" if h(x, 8, fro) > 0.25 else "3")
        L.p(x, y1 + 2, "1")
        if h(x, 9, fro) > 0.55: L.p(x, y1 + 3, "0")
    L.rad(y1 + 3, x0 + 2, x1 - 2, "n") if False else None
    for x in range(x0 + 2, x1 - 1):
        if L.get(x, y1 + 3) != "0": L.p(x, y1 + 3, "N")
        L.p(x, y1 + 4, "n")


def vindskier(L, x, y0, y1, venstre):
    """Vindskier langs gavlen. Over mønet kryssar dei og stikk opp som ein X."""
    for y in range(y0 + 2, y1 + 1):
        L.p(x, y, "d"); L.p(x + (1 if venstre else -1), y, "b")
    top = y0 + 2
    for k in range(6):
        xa = x + (k if venstre else -k); xb = x + ((5 - k) if venstre else -(5 - k))
        L.p(xa, top - k, "e"); L.p(xb, top - k, "c")


def laft(L, x0, x1, y0, y1, fro, staande=False):
    """Laftevegg: liggjande stokkar (4 pikslar) med sprekker, eller ståande bord (løe)."""
    for y in range(y0, y1 + 1):
        for x in range(x0, x1 + 1):
            if staande:
                k = (x - x0) % 5
                c = "d" if k == 0 else "c" if k < 3 else "b" if k == 3 else "a"
            else:
                k = (y - y0) % 4
                c = "d" if k == 0 else "c" if k in (1, 2) else "b"
                if k == 3 and h(x, y, fro) < 0.3: c = "a"
            if h(x, y, fro + 5) < 0.06: c = {"d": "c", "c": "b", "b": "a", "a": "a"}[c]
            L.p(x, y, c)
    # laftehovud: stokkendar som stikk ut på hjørna
    if not staande:
        for y in range(y0, y1 + 1, 4):
            for x in (x0 - 4, x1 + 1):
                L.rect(x, y, 4, 4, "c"); L.rad(y, x, x + 3, "d"); L.p(x, y, "e"); L.p(x + 1, y + 1, "d"); L.rad(y + 3, x, x + 3, "b"); L.p(x + 3, y + 2, "b"); L.p(x + 2, y + 2, "a")


def vindauge(L, x, y):
    L.rect(x, y, 8, 8, "w"); L.rad(y + 7, x, x + 7, "W"); L.p(x + 7, y + 1, "W")
    L.rect(x + 1, y + 1, 6, 6, "g"); L.rect(x + 1, y + 1, 2, 2, "G"); L.p(x + 1, y + 1, "r")
    L.rad(y + 3, x + 1, x + 6, "w"); L.rad(y + 4, x + 1, x + 6, "W")
    for yy in range(y + 1, y + 7): L.p(x + 3, yy, "w"); L.p(x + 4, yy, "W")


def dor(L, x, y, h_, dobbel=False):
    b = 12 if not dobbel else 14
    L.rect(x - 1, y - 1, b + 2, h_ + 1, "a")
    for xx in range(x, x + b):
        k = (xx - x) % 4
        for yy in range(y, y + h_): L.p(xx, yy, "d" if k == 0 else "c" if k < 3 else "b")
    L.rad(y + 3, x, x + b - 1, "a"); L.rad(y + h_ - 4, x, x + b - 1, "a")
    if dobbel:
        for yy in range(y, y + h_): L.p(x + b // 2, yy, "a")
    L.p(x + b - 3, y + h_ // 2, "i"); L.p(x + b - 3, y + h_ // 2 + 1, "i")


def grunnmur(L, x0, x1, y0, y1, fro):
    for y in range(y0, y1 + 1):
        for x in range(x0, x1 + 1):
            rad = (y - y0) // 2; stein = (x + rad * 3) // 5
            kant = (x + rad * 3) % 5 == 0 or (y - y0) % 2 == 1 and h(stein, rad, fro) > 0.5
            L.p(x, y, "B" if kant else "D" if (y - y0) % 2 == 0 and h(x, y, fro) > 0.6 else "C")


def omriss(L):
    ut = [r[:] for r in L.g]
    for y in range(L.h):
        for x in range(L.w):
            if L.g[y][x] == "." and any(L.get(x + dx, y + dy) not in ".o" for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))):
                ut[y][x] = "o"
    L.g = ut


def bislag(L, cx, y0, y1, fro):
    """Bislag (inngangsparti) på baksida av huset. Det stikk bakover, og i 3/4-vinkelen
    syner difor berre torvtaket: ei takrygg som går opp frå mønet til huset, med mønet mot oss.
    Øvst ligg gavlen der bak som ein spiss (^), med vindskier i kross."""
    hb = 10
    for x in range(cx - hb, cx + hb + 1):
        d = x - cx
        top = y0 + 4 + (abs(d) + 1) // 2                             # gavlen: spiss på midten
        for y in range(top, y1 + 1):
            if d < 0: c = "4" if d > -3 else "3" if (x + y) % 5 else "4"
            else: c = "1" if d < 3 else "2" if (x * 3 + y) % 7 else "1"
            if y == top: c = "e" if d < 0 else "c"                   # vindskier langs gavlen
            elif abs(d) >= hb - 1: c = "n" if d < 0 else "N"          # neveren under torva langs kanten
            L.p(x, y, c)
    for y in range(y0 + 10, y1, 5):                                  # torvklumpar
        for x in (cx - 6, cx + 4):
            x_ = x + int(h(x, y, fro) * 2)
            L.p(x_, y, "4" if x < cx else "2"); L.p(x_ + 1, y + 1, "3" if x < cx else "0")
    for k in range(4):                                               # vindskiene kryssar over spissen
        L.p(cx - 2 + k, y0 + 4 - k, "e"); L.p(cx + 2 - k, y0 + 4 - k, "c")
    for y in range(y0 + 5, y1 + 1): L.p(cx, y, "4")                  # mønet på bislaget


def steinpipe(L, px, ybot):
    """Mura pipe av gråstein på torvtaket, med heller på toppen (hus med grue eller omn)."""
    for y in range(1, ybot):
        for x in range(px, px + 6):
            rad = y // 3
            fuge = y % 3 == 2 or (x - px + (rad % 2) * 3) % 6 == 0
            L.p(x, y, "B" if fuge else "D" if x < px + 2 else "C")
    L.rad(0, px - 1, px + 6, "D"); L.rad(1, px - 1, px + 6, "B")          # helle på toppen
    L.p(px + 2, 0, "B"); L.p(px + 3, 0, "B")                                # røykopninga


def stove(bf, hf, dorar, vindauge_pos, fro=1, staande=False, dobbel=False, bakdor=(), pipe=None):
    """Hus på bf x hf fliser. dorar og vindauge_pos er flisnummer frå venstre.
    bakdor: flisnummer for inngang på baksida (bislag som stikk opp bak mønet).
    Då blir biletet 16 pikslar høgare, og døra i kartet ligg i flisraden bak huset."""
    if bakdor:
        hus = stove(bf, hf, dorar, vindauge_pos, fro, staande, dobbel)
        L = Lerret(hus.w, hus.h + 16)
        for i in bakdor: bislag(L, UT_X + i * 16 + 8, 0, 22, fro)
        omriss(L)
        for y in range(hus.h):                                       # huset framfor bislaget
            for x in range(hus.w):
                if hus.g[y][x] != ".": L.p(x, y + 16, hus.g[y][x])
        return L
    W, H = bf * 16 + UT_X * 2, hf * 16 + UT_Y
    L = Lerret(W, H)
    vegg_y0 = UT_Y + (hf - 1) * 16 - 2          # veggen er den nedste flisraden
    grunnmur(L, UT_X, UT_X + bf * 16 - 1, H - 3, H - 1, fro)
    laft(L, UT_X, UT_X + bf * 16 - 1, vegg_y0, H - 4, fro, staande)
    # skugge frå takskjegget på veggen
    for x in range(UT_X, UT_X + bf * 16):
        for y in range(vegg_y0, vegg_y0 + 3):
            L.p(x, y, {"e": "c", "d": "b", "c": "b", "b": "a", "a": "a"}.get(L.get(x, y), L.get(x, y)))
    for i in vindauge_pos: vindauge(L, UT_X + i * 16 + 4, vegg_y0 + 4)
    for i in dorar: dor(L, UT_X + i * 16 + 2 - (1 if dobbel else 0), H - 3 - 13, 13, dobbel)
    torvtak(L, 1, W - 2, 3, vegg_y0 - 6, fro)
    vindskier(L, 1, 3, vegg_y0 - 3, True); vindskier(L, W - 3, 3, vegg_y0 - 3, False)
    if pipe is not None: steinpipe(L, UT_X + pipe * 16 + 5, 14)
    omriss(L)
    return L


def stabbur(fro=3):
    """Stabbur på 3 x 2 fliser, med gavlen mot oss, slik stabbura står på Sunnmøre: høgt på
    stolpar med flate stabbursteinar (så mus og fukt ikkje kjem inn), ei frittståande trapp opp
    til døra, eit nedre rom av laft og ein oppstugu som stikk ut over det nedre, ein bratt gavl
    av ståande bord med vindskier som kryssar over mønet, og torvtaket som går bakover frå
    gavlen. Døra står i midtre flis med botnen 9 pikslar over biletkanten (sjå DORFORM.stabbur)."""
    bf = 3
    W, H = bf * 16 + UT_X * 2, 72
    L = Lerret(W, H)
    x0, x1 = UT_X, UT_X + bf * 16 - 1                                  # det nedre rommet
    golv = H - 9                                                       # golvet i stabburet (botnen av døra)
    # Stolpar på stabbursteinar, med mørk luft under huset
    L.rect(x0 + 2, golv, x1 - x0 - 3, 6, "a")
    for sx in (x0 + 2, x0 + 22, x1 - 5):
        L.rect(sx, golv, 4, 5, "c"); L.p(sx, golv, "d"); L.rad(golv + 4, sx, sx + 3, "b")
        L.rect(sx - 1, golv + 5, 6, 2, "C"); L.rad(golv + 5, sx - 1, sx + 4, "D"); L.rad(golv + 7, sx - 1, sx + 4, "B")   # stabbursteinen
        L.rect(sx, golv + 8, 4, 1, "C")
    # Frittståande trapp opp til døra (ho rører ikkje huset, så musene ikkje kjem opp)
    for k, ty in enumerate((golv + 2, golv + 5, golv + 8)):
        L.rad(ty, x0 + 17 - k, x0 + 30 + k, "e"); L.rad(ty + 1, x0 + 17 - k, x0 + 30 + k, "c"); L.rad(ty + 2, x0 + 17 - k, x0 + 30 + k, "b")
    # Det nedre rommet: laft, med døra midt på
    nedre_y0 = golv - 13
    laft(L, x0, x1, nedre_y0, golv - 1, fro)
    dor(L, x0 + 16 + 2, golv - 11, 11)
    # Skugge under oppstugua på det nedre rommet
    L.rad(nedre_y0, x0, x1, "a"); L.rad(nedre_y0 + 1, x0, x1, "b")
    # Oppstugua stikk 2 pikslar ut på kvar side, med ei lita glugge
    o0, o1 = x0 - 3, x1 + 3
    ovre_y0 = nedre_y0 - 12
    laft(L, o0, o1, ovre_y0, nedre_y0 - 1, fro + 2)
    L.rad(nedre_y0 - 1, o0, o1, "a")                                   # botnstokken som ber utkragninga
    for x in range(o0, x0): L.p(x, nedre_y0, "a"); L.p(x, nedre_y0 - 1, "a")
    for x in range(x1 + 1, o1 + 1): L.p(x, nedre_y0, "a"); L.p(x, nedre_y0 - 1, "a")
    for (gx, gy) in ((x0 + 21, ovre_y0 + 3),):
        L.rect(gx - 1, gy - 1, 8, 6, "a"); L.rect(gx, gy, 6, 4, "A"); L.rad(gy, gx, gx + 5, "B")
    # Gavlen: ståande bord i ein bratt trekant
    topp = ovre_y0 - 18
    cx = (o0 + o1) // 2
    for y in range(topp, ovre_y0):
        t = (y - topp) / (ovre_y0 - topp)
        hb = int(t * (o1 - o0) / 2) + 1
        for x in range(cx - hb, cx + hb + 1):
            k = (x - cx) % 4
            L.p(x, y, "d" if k == 0 else "c" if k < 3 else "b")
    L.rad(ovre_y0 - 1, o0, o1, "a")
    # Torvtaket går bakover frå gavlen. Sett ovanfrå og framanfrå ligg den bakre gavlkanten DJUP
    # pikslar høgare enn den framre, og takflatene mellom dei er torv: ei tjukk, lys leppe langs
    # den framre kanten, mørkare bakover, og eit lyst møne som går rett innover frå toppen.
    DJUP = 14
    halv = (o1 - o0) / 2 + 3
    def rake(x): return topp + abs(x - cx) * (ovre_y0 - topp) / halv
    for x in range(o0 - 3, o1 + 4):
        r0 = rake(x)
        for y in range(int(r0 - DJUP), int(r0)):
            if y < 0 or L.get(x, y) != ".": continue
            d = r0 - y                                                  # kor langt bak den framre kanten
            band = "3" if d < 3 else "2" if d < 8 else "1"
            if band == "2" and h(x, y, fro + 9) < 0.12: band = "3"
            if band == "1" and h(x, y, fro + 11) < 0.15: band = "2"
            L.p(x, y, band)
        L.p(x, int(r0 - DJUP), "0")                                     # den bakre kanten
    for y in range(topp - DJUP, topp):                                   # mønet: lyst band rett innover
        for x in (cx - 1, cx, cx + 1):
            if 0 <= y: L.p(x, y, "4" if x == cx else "3")
    # Vindskier langs gavlen, kryssa over mønet
    for x in range(o0 - 2, o1 + 3):
        dxs = abs(x - cx)
        rake = int(round(topp + dxs * (ovre_y0 - topp) / ((o1 - o0) / 2)))
        if topp - 1 <= rake <= ovre_y0 + 1:
            L.p(x, rake - 1, "e"); L.p(x, rake, "d"); L.p(x, rake + 1, "b")
    for k in range(5):
        L.p(cx - 2 + k, topp - 3 - k, "e"); L.p(cx + 2 - k, topp - 3 - k, "d")
    omriss(L)
    return L


def panel(L, x0, x1, y0, y1):
    """Kvitmåla ståande panel med blågrå skuggar."""
    for y in range(y0, y1 + 1):
        for x in range(x0, x1 + 1):
            k = (x - x0) % 4
            L.p(x, y, "P" if k == 0 else "M" if k < 3 else "L")


def skifertak(L, x0, x1, y0, y1, fro):
    """Skifertak: rader med skiferplater, lyst ved mønet og mørkare mot takskjegget."""
    for y in range(y0, y1 + 1):
        t = (y - y0) / max(1, y1 - y0)
        rad = (y - y0) // 3
        for x in range(x0, x1 + 1):
            base = "V" if t < 0.2 else "U" if t < 0.7 else "T"
            k = (y - y0) % 3
            if k == 2: base = {"V": "U", "U": "T", "T": "S"}[base]
            elif (x + rad * 2) % 4 == 0: base = {"V": "U", "U": "T", "T": "S"}[base]
            elif k == 0 and h(x, y, fro) > 0.8: base = {"V": "X", "U": "V", "T": "U"}[base]
            L.p(x, y, base)
    L.rad(y0, x0, x1, "X")
    for x in range(x0, x1 + 1): L.p(x, y1 + 1, "S"); L.p(x, y1 + 2, "K")


def rundvindauge(L, x, y, b, hoyd):
    """Høgt kyrkjevindauge med rund boge og små ruter."""
    for yy in range(y, y + hoyd):
        for xx in range(x, x + b):
            L.p(xx, yy, "g")
    for xx in (x, x + b - 1): L.p(xx, y, "M")          # rund boge
    for yy in range(y, y + hoyd):
        L.p(x - 1, yy, "K"); L.p(x + b, yy, "L")
    L.rad(y - 1, x, x + b - 1, "K")
    for yy in range(y + 2, y + hoyd, 3): L.rad(yy, x, x + b - 1, "M")
    for yy in range(y + 1, y + hoyd): L.p(x + b // 2, yy, "M")
    L.p(x + 1, y + 1, "G"); L.p(x + 1, y + 2, "r"); L.rad(y + hoyd, x - 1, x + b, "L")


def kyrkje():
    """Kvit langkyrkje (etter Vartdal kyrkje), 7 x 3 fliser, tårn midt framme med spir og kors."""
    bf, hf, ekstra = 7, 3, 44
    W, H = bf * 16 + UT_X * 2, hf * 16 + UT_Y + ekstra
    L = Lerret(W, H)
    topp = UT_Y + ekstra                          # øvst i fotavtrykket
    vegg_y0 = topp + 2 * 16 - 2
    grunnmur(L, UT_X, UT_X + bf * 16 - 1, H - 3, H - 1, 4)
    panel(L, UT_X, UT_X + bf * 16 - 1, vegg_y0, H - 4)
    for x in range(UT_X, UT_X + bf * 16):
        for y in range(vegg_y0, vegg_y0 + 3): L.p(x, y, {"Q": "M", "P": "M", "M": "L", "L": "K"}.get(L.get(x, y), L.get(x, y)))
    for i in (1, 5): rundvindauge(L, UT_X + i * 16 + 5, vegg_y0 + 4, 6, 12)
    for i in (0, 2, 4, 6): rundvindauge(L, UT_X + i * 16 + 6, vegg_y0 + 5, 4, 9)
    skifertak(L, 1, W - 2, topp - 2, vegg_y0 - 3, 4)
    # tårnet: kvitt, frå veggen og opp over mønet
    tx0, tx1 = UT_X + 3 * 16 - 2, UT_X + 4 * 16 + 1
    panel(L, tx0, tx1, topp - 22, H - 4)
    for y in range(topp - 22, H - 3): L.p(tx0 - 1, y, "K"); L.p(tx1 + 1, y, "L"); L.p(tx1, y, "L")
    # lydopningar med spiler
    for bx in (tx0 + 4, tx1 - 7):
        for y in range(topp - 18, topp - 10):
            for x in range(bx, bx + 4): L.p(x, y, "S" if (y % 2) else "T")
        L.p(bx, topp - 19, "M"); L.p(bx + 3, topp - 19, "M")
    L.rad(topp - 23, tx0 - 2, tx1 + 2, "K"); L.rad(topp - 22, tx0 - 2, tx1 + 2, "L")
    # spiret: høg, slank skiferkjegle med gullkors
    mid = (tx0 + tx1) // 2
    spir_topp, spir_botn = 5, topp - 25
    for y in range(spir_topp, spir_botn + 1):
        t = (y - spir_topp) / max(1, spir_botn - spir_topp)
        b = int(t * ((tx1 - tx0) / 2 - 1))
        for x in range(mid - b, mid + b + 2):
            L.p(x, y, "V" if x < mid - b // 3 else "U" if x <= mid + b // 3 else "T")
        if y % 4 == 0 and b > 1: L.p(mid - b, y, "X")
    # takskjørt nedst på spiret
    L.rad(spir_botn + 1, tx0 - 3, tx1 + 3, "T"); L.rad(spir_botn + 2, tx0 - 2, tx1 + 2, "S")
    mid = (tx0 + tx1) // 2
    for y in range(0, 5): L.p(mid, y, "Y"); L.p(mid + 1, y, "Z")
    L.p(mid - 1, 1, "Y"); L.p(mid + 2, 1, "Z")
    # lite rundt vindauge på tårnet
    L.p(mid, topp - 4, "g"); L.p(mid + 1, topp - 4, "g"); L.p(mid, topp - 3, "g"); L.p(mid + 1, topp - 3, "G")
    # inngangen: raud dobbeldør med boge
    dx, dy = tx0 + 5, H - 3 - 14
    for y in range(dy, dy + 14):
        for x in range(dx, dx + 10): L.p(x, y, "F" if (x - dx) % 5 == 0 else "E")
        L.p(dx + 5, y, "R")
    L.rad(dy - 1, dx + 1, dx + 8, "K"); L.p(dx, dy, "M"); L.p(dx + 9, dy, "M")
    L.p(dx + 3, dy + 7, "Y"); L.p(dx + 7, dy + 7, "Y")
    omriss(L)
    return L


def kvitthus(bf, hf, dorar, vindauge_pos, piper, fro=6):
    """Kvitt hus med skifertak (prestegard), dør med lite tak over, og piper av tegl."""
    W, H = bf * 16 + UT_X * 2, hf * 16 + UT_Y
    L = Lerret(W, H)
    vegg_y0 = UT_Y + (hf - 1) * 16 - 6
    grunnmur(L, UT_X, UT_X + bf * 16 - 1, H - 3, H - 1, fro)
    panel(L, UT_X, UT_X + bf * 16 - 1, vegg_y0, H - 4)
    for x in range(UT_X, UT_X + bf * 16):
        for y in range(vegg_y0, vegg_y0 + 3): L.p(x, y, {"Q": "M", "P": "M", "M": "L", "L": "K"}.get(L.get(x, y), L.get(x, y)))
    for i in vindauge_pos: vindauge(L, UT_X + i * 16 + 4, vegg_y0 + 5); vindauge(L, UT_X + i * 16 + 4, vegg_y0 + 5)
    for i in dorar:
        dor(L, UT_X + i * 16 + 2, H - 3 - 13, 13)
        L.rad(H - 3 - 16, UT_X + i * 16, UT_X + i * 16 + 15, "U"); L.rad(H - 3 - 15, UT_X + i * 16, UT_X + i * 16 + 15, "S")
    skifertak(L, 1, W - 2, 3, vegg_y0 - 3, fro)
    for i in piper:
        px = UT_X + i * 16 + 5
        for y in range(0, 9):
            for x in range(px, px + 5): L.p(x, y, "I" if x < px + 2 else "H")
        L.rad(0, px - 1, px + 5, "T")
    omriss(L)
    return L


BYGG = {
    "kyrkje": kyrkje,
    "prestegard": lambda: kvitthus(9, 3, [4], [1, 3, 5, 7], [2, 6]),
    "stove": lambda: stove(5, 3, [2], [1, 3], fro=1, pipe=1),            # grue inne: pipe
    "stove-bak": lambda: stove(5, 3, [], [1, 3], fro=5, bakdor=[1]),     # kremmarbua: inngang bak
    "loe": lambda: stove(6, 3, [3], [], fro=2, staande=True, dobbel=True),
    "stabbur": lambda: stabbur(3),
    "seter": lambda: stove(4, 3, [2], [], fro=7, pipe=1),
    "ekset-hovud": lambda: stove(6, 3, [3], [1, 5], fro=9, pipe=4),
}


def pix(namn, L):
    brukt = {c for r in L.g for c in r}
    ut = [f"# namn: bygg-{namn}", "# type: bygg", f"# ut: bilete/spel/bygg/{namn}.png", f"# storleik: {L.w}x{L.h}", "palett:"]
    ut += [f"  {t} = {f}    {m}".rstrip() for t, f, m in PAL if t in brukt or t == "."]
    ut.append("bilete:"); ut += ["  " + "".join(r) for r in L.g]
    return "\n".join(ut) + "\n"


if __name__ == "__main__":
    tving = "--tving" in sys.argv
    namn = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not namn: print(__doc__); sys.exit(0)
    if namn == ["alle"]: namn = list(BYGG)
    for n in namn:
        sti = os.path.join(ROT, "kjelder", f"bygg-{n}.pix")
        if os.path.exists(sti) and not tving: print(f"bygg-{n}.pix finst alt (bruk --tving)"); continue
        open(sti, "w", encoding="utf-8").write(pix(n, BYGG[n]())); print(f"skreiv kjelder/bygg-{n}.pix")
