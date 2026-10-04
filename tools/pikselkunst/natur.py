"""Naturelement som heile figurar: gran, furu, bjørk, stein og gravhaug.

Teknikken er henta frå The Minish Cap (store kroner bygde av runde lauvklumpar
med lys kant oppe til venstre, steinar med tydelege flater og sprekker),
forma og fargane frå norsk natur (sjå konsept/): gran med hengjande greinlag,
bjørk med kvit, kroklete stamme og svarte merke, grå stein med mose og lav.

  python tools/pikselkunst/natur.py alle [--tving]    skriv kjelder/natur-*.pix

Figurane står med botnen midt på flisa si. Motoren teiknar skuggen på bakken.
"""
import sys, os, math

ROT = os.path.dirname(os.path.abspath(__file__))

def h(x, y, s):
    n = (x * 374761393 + y * 668265263 + s * 1442695041) & 0xFFFFFFFF
    n = ((n ^ (n >> 13)) * 1274126177) & 0xFFFFFFFF
    return ((n ^ (n >> 16)) & 0xFFFFFFFF) / 4294967296

PAL = [
    (".", "-", ""), ("o", "#0a0514", "omriss"),
    ("0", "#0c1e1c", "gran djup"), ("1", "#163228", "gran skugge"), ("2", "#1f4a38", "gran"), ("3", "#2e6448", "gran lys"), ("4", "#4a8058", "gran glans"),
    ("a", "#2a1810", "stamme djup"), ("b", "#4a2c1c", "stamme"), ("c", "#6e4428", "stamme lys"),
    ("W", "#3a3440", "bjørk merke"), ("X", "#a8a4a0", "bjørk skugge"), ("Y", "#d8d4cc", "bjørk"), ("Z", "#f4f2ec", "bjørk lys"),
    ("5", "#223a22", "lauv djup"), ("6", "#38582a", "lauv skugge"), ("7", "#567c32", "lauv"), ("8", "#7ea040", "lauv lys"), ("9", "#b0c85e", "lauv glans"),
    ("A", "#26242e", "stein djup"), ("B", "#44424e", "stein skugge"), ("C", "#666472", "stein"), ("D", "#8c8a96", "stein lys"), ("E", "#b4b2bc", "stein glans"),
    ("m", "#4a6a2a", "mose skugge"), ("n", "#6e9038", "mose"), ("p", "#98b44c", "mose lys"), ("l", "#c8b050", "lav"),
    ("q", "#16301f", "villgras djup"), ("r", "#1d3f28", "villgras skugge"), ("s", "#285632", "villgras"), ("u", "#3a7236", "villgras lys"), ("v", "#548f42", "villgras glans"),
    ("N", "#08141a", "gran djupast"),
    ("d", "#2a1410", "furu stamme djup"), ("e", "#6a2e1c", "furu stamme"), ("f", "#a8502c", "furu flass"), ("i", "#d8884a", "furu flass lys"),
    ("k", "#64544a", "furu bork"), ("j", "#948070", "furu bork lys"),
    ("w", "#14281e", "furu nål djup"), ("x", "#264630", "furu nål skugge"), ("y", "#3e6a3a", "furu nål"), ("z", "#6c9450", "furu nål lys"),
    ("K", "#3c3634", "tørrgran skugge"), ("L", "#6e645c", "tørrgran"), ("M", "#9c9288", "tørrgran lys"),
    ("P", "#a4ac88", "skjegglav"), ("R", "#6c7660", "skjegglav skugge"), ("Q", "#7a4a2a", "brune nåler"), ("S", "#4a2c1c", "brune nåler skugge"),
    ("T", "#2a3264", "einerbær"), ("U", "#94a4d8", "einerbær dogg"), ("h", "#163430", "einer hole"), ("F", "#a0d098", "einer glans"),
    ("I", "#1a3632", "einer djup"), ("O", "#2a5848", "einer skugge"), ("V", "#408266", "einer"), ("t", "#66aa80", "einer lys"),
    ("g", "#35683a", "gras skugge"), ("G", "#4a8a3f", "gras"), ("H", "#68a84a", "gras lys"), ("J", "#92c65e", "gras glans"),
    ("+", "#a86a92", "lyng"), ("*", "#5e3c58", "lyng skugge"), ("~", "#8a9a86", "lav grågrøn"), ("^", "#d0d290", "lav lys"),
]


class Lerret:
    def __init__(s, w, h): s.w, s.h = w, h; s.g = [["." for _ in range(w)] for _ in range(h)]
    def p(s, x, y, c):
        if 0 <= x < s.w and 0 <= y < s.h: s.g[y][x] = c
    def get(s, x, y): return s.g[y][x] if 0 <= x < s.w and 0 <= y < s.h else "."
    def disk(s, cx, cy, r, fn):
        for y in range(int(cy - r - 1), int(cy + r + 2)):
            for x in range(int(cx - r - 1), int(cx + r + 2)):
                d = math.hypot(x + .5 - cx, y + .5 - cy)
                if d <= r: s.p(x, y, fn(x, y, (x + .5 - cx) / r, (y + .5 - cy) / r))


def omriss(L):
    ut = [r[:] for r in L.g]
    for y in range(L.h):
        for x in range(L.w):
            if L.g[y][x] == "." and any(L.get(x + dx, y + dy) not in ".o" for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))):
                ut[y][x] = "o"
    L.g = ut


def klump(L, cx, cy, r, tonar, fro):
    """Ein rund lauv- eller barklump: lys kant oppe til venstre, mørk nede til høgre."""
    lys, mid, mork, djup = tonar
    def f(x, y, nx, ny):
        v = -nx * 0.55 - ny * 0.8
        if v > 0.55: return lys
        if v > -0.1: return mid
        if v > -0.6: return mork
        return djup
    L.disk(cx, cy, r, f)


def bjork(v):
    W, H = 32, 40
    L = Lerret(W, H)
    # kroklete kvit stamme med svarte merke
    x0 = 15 + (v - 1)
    sti = [(x0 + round(math.sin(y / 5 + v) * 1.4), y) for y in range(14, 39)]
    for (x, y) in sti:
        for dx, c in ((-1, "Z"), (0, "Y"), (1, "X")): L.p(x + dx, y, c)
        if h(x, y, v + 3) > 0.72: L.p(x + (0 if h(y, x, v) > 0.5 else -1), y, "W"); L.p(x + 1, y, "W")
    L.p(sti[-1][0] - 2, 38, "X"); L.p(sti[-1][0] + 2, 38, "X")
    # greiner
    for (sy, retn, lengd) in [(20, -1, 6), (17, 1, 6), (24, 1, 5)]:
        x, y = sti[sy - 14]
        for k in range(1, lengd): L.p(x + retn * k, y - k // 2, "X" if k < 3 else "W")
    # krone av lauvklumpar, lett og open (ikkje heilt tett som ei eik)
    for i, (kx, ky, r) in enumerate([(15, 11, 6.5), (10, 13, 4.5), (21, 13, 4.5)]):
        klump(L, kx + (v - 1), ky, r, ("7", "6", "5", "5"), v)
    klumpar = [(15, 7, 5.5), (9, 10, 4.2), (22, 10, 4.4), (12, 4, 3.8), (20, 4, 3.7), (6, 15, 3), (26, 15, 3.2), (16, 2.5, 2.6)]
    if v == 2: klumpar = [(k[0] - 1, k[1] + 1, k[2]) for k in klumpar]
    if v == 3: klumpar = klumpar[:-2] + [(24, 7, 3.4)]
    for i, (kx, ky, r) in enumerate(klumpar):
        kx += (h(i, v, 2) - 0.5) * 2; ky += (h(i, v, 3) - 0.5) * 1.5
        klump(L, kx + (v - 1), ky, r, ("9", "8", "7", "6"), v)
    # små hol i krona der stammen skin gjennom, og nokre mørke lauvtuster
    for i in range(6):
        x = 8 + int(h(i, v, 5) * 16); y = 4 + int(h(i, v, 6) * 11)
        if L.get(x, y) in "678": L.p(x, y, "5")
    for i in range(10):
        x = 5 + int(h(i, v, 7) * 22); y = 2 + int(h(i, v, 8) * 15)
        if L.get(x, y) in "78": L.p(x, y, "9" if y < 9 else "6")
    omriss(L)
    return L


def stein(v):
    W, H = 18, 15
    L = Lerret(W, H)
    if v == 3:
        W, H = 18, 15
    rx, ry = (7.5, 5.8) if v != 2 else (6.2, 5)
    cx, cy = 9, 8.5
    def f(x, y, nx, ny):
        s = -nx * 0.5 - ny * 0.85
        c = "E" if s > 0.62 else "D" if s > 0.18 else "C" if s > -0.35 else "B" if s > -0.75 else "A"
        return c
    for y in range(H):
        for x in range(W):
            nx, ny = (x + .5 - cx) / rx, (y + .5 - cy) / ry
            # litt kanta form: flatare botn
            if ny > 0.55: ny = 0.55 + (ny - 0.55) * 1.8
            if nx * nx + ny * ny <= 1: L.p(x, y, f(x, y, nx, ny))
    # sprekk og flate
    for k in range(4): L.p(int(cx) + 1 + k // 2, 5 + k, "B")
    L.p(int(cx) - 3, 6, "D"); L.p(int(cx) - 2, 6, "D")
    if v in (1, 3):   # mose og lav på toppen
        for x in range(W):
            for y in range(H):
                if L.get(x, y) in "EDC" and y < cy - 1 + math.sin(x * 1.3 + v) * 1.4:
                    L.p(x, y, "p" if y < 4 else "n" if (x + y) % 3 else "m")
        L.p(int(cx) + 4, 9, "l"); L.p(int(cx) + 5, 9, "l"); L.p(int(cx) - 5, 10, "l")
    omriss(L)
    return L


def haug():
    """Gravhaug på 3 x 2 fliser i utmarka: mørkt, tett gras, tydeleg kuvla form,
    ein krans av steinar rundt foten og ei ung bjørk på toppen."""
    W, H = 50, 36
    L = Lerret(W, H)
    cx, cy, rx, ry = 25, 20, 22, 15
    for y in range(H):
        for x in range(W):
            nx, ny = (x + .5 - cx) / rx, (y + .5 - cy) / ry
            if nx * nx + ny * ny <= 1:
                s_ = -nx * 0.35 - ny * 1.1 + 0.15
                c = "v" if s_ > 0.7 else "u" if s_ > 0.25 else "s" if s_ > -0.3 else "r" if s_ > -0.7 else "q"
                L.p(x, y, c)
    # grastuster i rader, lyse oppe og mørke nede
    for rad, y in enumerate(range(12, 32, 4)):
        for x in range(6 + (rad % 2) * 3, 45, 6):
            if L.get(x, y) == ".": continue
            under = L.get(x, y)
            lys = {"v": "v", "u": "v", "s": "u", "r": "s", "q": "r"}[under]
            mork = {"v": "u", "u": "s", "s": "r", "r": "q", "q": "q"}[under]
            L.p(x, y - 1, lys); L.p(x - 1, y, lys); L.p(x + 1, y, mork); L.p(x, y + 1, mork)
    # nokre steinar ved foten framme
    for (x, y) in [(10, 30), (17, 33), (31, 33), (39, 30)]:
        L.p(x, y, "D"); L.p(x + 1, y, "C"); L.p(x, y + 1, "B"); L.p(x + 1, y + 1, "A")
    # ung bjørk på toppen
    for y in range(4, 12): L.p(24, y, "Y" if y % 3 else "W"); L.p(25, y, "X")
    klump(L, 24, 5, 3.2, ("9", "8", "7", "6"), 1); klump(L, 27, 7, 2.4, ("8", "7", "6", "5"), 1)
    omriss(L)
    return L


# ---------------------------------------------------------------- variantar (runde 12)
# Fleire former av same slag, så skogen og bøen ikkje ser kopierte ut: ung bjørk og
# tvistamma bjørk, ung gran, flat berghelle, steinrøys, ståande stein og einerbusk.

def steinklump(L, cx, cy, rx, ry, mose=False, fro=1):
    """Ein stein med flater: lys oppe til venstre, mørk nede, flatare botn, mose på toppen."""
    for y in range(L.h):
        for x in range(L.w):
            nx, ny = (x + .5 - cx) / rx, (y + .5 - cy) / ry
            if ny > 0.55: ny = 0.55 + (ny - 0.55) * 1.8
            if nx * nx + ny * ny > 1: continue
            sv = -nx * 0.5 - ny * 0.85
            c = "E" if sv > 0.62 else "D" if sv > 0.18 else "C" if sv > -0.35 else "B" if sv > -0.75 else "A"
            if mose and c in "ED" and ny < -0.3 + math.sin(x * 1.3 + fro) * 0.25: c = "p" if ny < -0.7 else "n"
            L.p(x, y, c)


def bjork_ung():
    """Ung bjørk: tynn, rett stamme og ei lita, open krone."""
    W, H = 20, 30
    L = Lerret(W, H)
    for y in range(12, 29):
        x = 10 + round(math.sin(y / 6) * 0.6)
        L.p(x, y, "Y"); L.p(x + 1, y, "X")
        if h(x, y, 41) > 0.75: L.p(x, y, "W")
    for (kx, ky, r) in [(10, 9, 4.5), (6, 11, 3), (14, 11, 3.2)]:
        klump(L, kx, ky, r, ("7", "6", "5", "5"), 4)
    for (kx, ky, r) in [(10, 6, 3.8), (6, 8, 2.8), (14, 8, 2.9), (10, 3, 2.4)]:
        klump(L, kx, ky, r, ("9", "8", "7", "6"), 4)
    omriss(L)
    return L


def bjork_dobbel():
    """Tvistamma bjørk: to kvite stammer frå same rot, brei krone."""
    W, H = 36, 42
    L = Lerret(W, H)
    for (x0, lut, fro) in [(16, -0.18, 1), (19, 0.2, 2)]:
        for y in range(14, 41):
            x = round(x0 + lut * (40 - y) + math.sin(y / 4 + fro) * 0.7)
            L.p(x, y, "Z" if fro == 1 else "Y"); L.p(x + 1, y, "X")
            if h(x, y, fro + 40) > 0.72: L.p(x, y, "W")
    for x in range(14, 23): L.p(x, 40, "X")
    for (kx, ky, r) in [(12, 13, 5.5), (24, 13, 5.5), (18, 15, 4)]:
        klump(L, kx, ky, r, ("7", "6", "5", "5"), 6)
    for (kx, ky, r) in [(11, 8, 5), (25, 8, 5), (18, 6, 4.6), (6, 13, 3.4), (30, 13, 3.4), (14, 3, 3.2), (23, 3, 3.3)]:
        klump(L, kx, ky, r, ("9", "8", "7", "6"), 6)
    for i in range(8):
        x = 6 + int(h(i, 6, 5) * 24); y = 2 + int(h(i, 6, 6) * 14)
        if L.get(x, y) in "78": L.p(x, y, "9" if y < 9 else "6")
    omriss(L)
    return L


def heller():
    """Flat berghelle som stikk opp av graset, med lav."""
    W, H = 22, 12
    L = Lerret(W, H)
    steinklump(L, 11, 6.5, 10, 4.2, fro=3)
    for x in range(3, 19):                                       # flat topp
        for y in range(3, 6):
            if L.get(x, y) != ".": L.p(x, y, "D" if y < 5 else "C")
    for (x, y) in [(6, 4), (7, 4), (14, 3), (15, 4)]: L.p(x, y, "l")
    for k in range(5): L.p(9 + k, 7 + k // 3, "B")                # sprekk
    omriss(L)
    return L


def roys():
    """Steinrøys: tre steinar i ein klynge, den største bak."""
    W, H = 22, 15
    L = Lerret(W, H)
    steinklump(L, 12, 6, 6.2, 4.8, mose=True, fro=2)
    steinklump(L, 6, 9.5, 4.2, 3.4, fro=5)
    steinklump(L, 16, 10.5, 3.6, 3, fro=7)
    omriss(L)
    return L


def bauta():
    """Bautastein (sjå konsept/bautastein-hedlehaugen.jpg og bautastein-naustdal.jpg): høg, smal og litt
    skeiv, breiast nede og smalare mot ein ujamn, skrå topp, over to fliser i høgda. Standardperspektivet:
    toppflata syner ovanfrå som ein lys flekk, framsida er den store flata, sida mot høgre eit smalt
    mørkt band. Lys frå venstre. Lav i nokre flekker (gul og grågrøn med lys midte), mose nedst, svake
    runer (hakk) midt på framsida, og gras og lyng rundt foten."""
    W, H = 16, 36
    L = Lerret(W, H)
    botn = 31
    cx = lambda y: 7.0 + (botn - y) / (botn - 3) * 2.4                        # toppen lener seg mot høgre
    hw = lambda y: 3.4 + 2.4 * ((y - 3) / (botn - 3)) ** 0.9
    # Ujamne sider: kvar side har sine eigne bulkar (glatta over tre rader), og eit hakk til høgre.
    bulk = lambda y, s_: (h(0, y // 3, s_) * (3 - y % 3) + h(0, y // 3 + 1, s_) * (y % 3)) / 3 - 0.5
    xl = lambda y: cx(y) - hw(y) - bulk(y, 401) * 1.4
    xr = lambda y: cx(y) + hw(y) + bulk(y, 407) * 1.4 - (1.2 if 15 <= y <= 18 else 0)
    # Skrå, ujamn topp: høgast oppe til venstre (eit brot), lågare mot høgre.
    ytopp = lambda x: 3 + max(0, x - 7.5) * 1.1 + max(0, 5.5 - x) * 1.4 + (h(x, 0, 408) > 0.6)
    toppen = {}
    for y in range(3, botn + 1):
        for x in range(W):
            a_, b_ = xl(y), xr(y)
            u = (x + .5 - a_) / (b_ - a_)
            if u < 0 or u > 1 or y < ytopp(x): continue
            if x not in toppen: toppen[x] = y
            dt = y - toppen[x]
            if dt < 2 and y < 14: c = "E" if u < 0.6 else "D"                  # toppflata, sett ovanfrå
            elif u < 0.2: c = "D"                                              # sida mot ljoset
            elif u > 0.86: c = "A" if u > 0.95 else "B"                        # sida bort frå ljoset
            elif u < 0.38: c = "D" if h(x // 2, y // 6, 403) > 0.25 else "C"      # framsida: lysare mot venstre
            elif u > 0.7: c = "B" if h(x, y // 6, 402) > 0.55 else "C"
            else: c = "C"
            L.p(x, y, c)
    # Skuggelina under toppflata (kanten der toppen møter framsida).
    for x, y0 in toppen.items():
        if y0 < 10 and L.get(x, y0 + 2) in "CD": L.p(x, y0 + 2, "B" if L.get(x, y0 + 2) == "C" else "C")
    # Svake runer: korte hakk midt på framsida (mørk line, lys kant til høgre).
    for k, (dy, form) in enumerate([(12, "|<"), (16, "|>"), (20, "|<"), (24, "|")]):
        x = round(cx(dy))
        for i in range(3):
            if L.get(x, dy + i) in "CD": L.p(x, dy + i, "A" if i == 1 else "B")
            if L.get(x + 1, dy + i) in "CD": L.p(x + 1, dy + i, "D")
        if "<" in form and L.get(x - 1, dy) in "CD": L.p(x - 1, dy, "B")
        if ">" in form and L.get(x + 1, dy + 1) in "CDB": L.p(x + 1, dy + 1, "B")
    # Lav i flekker: gulgrøn og grågrøn med lys midte.
    for (lx, ly, slag) in [(5, 10, "l"), (11, 13, "~"), (4, 19, "~"), (10, 27, "l")]:
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1, 2):
                if (dx in (-1, 2) and dy != 0) or h(lx + dx, ly + dy, 404) < 0.2: continue
                if L.get(lx + dx, ly + dy) in "ABCDE": L.p(lx + dx, ly + dy, slag)
        if L.get(lx, ly) != ".": L.p(lx, ly, "^")
    # Mose nedst på steinen, mest på framsida.
    for y in range(24, botn + 1):
        for x in range(W):
            if L.get(x, y) in "BCD" and h(x, y, 405) < (y - 24) / 9:
                L.p(x, y, "p" if L.get(x, y) == "D" else "n" if L.get(x, y) == "C" else "m")
    # Gras og lyng rundt foten: ein tuve som dekkjer botnen, strå som stikk opp, og nokre lyngkvistar.
    for x in range(1, W - 1):
        top = botn - 1 + int(h(x, 1, 406) * 2.5) - (1 if 4 < x < 12 else 0)
        for y in range(top, botn + 3):
            c = "J" if y == top and h(x, 2, 406) > 0.6 else "H" if y < top + 2 else "G" if y < botn + 2 else "g"
            L.p(x, y, c)
        if h(x, 3, 406) > 0.55:
            for k in range(1 + int(h(x, 4, 406) * 3)): L.p(x + (k > 1) * (1 if x > 8 else -1), top - 1 - k, "H" if k < 2 else "J")
    for (x, y) in [(2, botn), (3, botn - 1), (12, botn + 1), (13, botn), (7, botn + 2)]:
        L.p(x, y, "+"); L.p(x, y + 1, "*")
    omriss(L)
    return L


def einer():
    """Einerbusk (vanleg i lia på Sunnmøre): ein tett, ujamn busk av mange små nåleklasar i mørk blågrøn,
    breiast nede og med to ujamne toppar. Lys frå venstre: lyse nålespissar på klasane oppe til venstre,
    mellomtonar, og mørke holer inni mellom klasane. Stikkande nåletuster i kanten, nokre blåsvarte bær
    med lys dogg, ein tørr kvist som stikk ut, og ei mørk kontaktline mot bakken."""
    W, H = 20, 22
    L = Lerret(W, H)
    # Klasane frå bak (nede til høgre, mørke) til fram (oppe til venstre, lyse), så dei lyse ligg oppå.
    klasar = [(14, 16, 4.0, 0), (9, 16, 4.6, 0), (16, 11, 2.6, 0), (4, 16, 3.0, 1), (12, 11, 3.4, 1),
              (6, 12, 3.2, 1), (11, 6, 2.8, 2), (7, 7, 2.6, 2), (14, 4, 2.0, 2), (3, 10, 1.8, 2)]
    # Eigen blågrøn fargetrapp (I djup, O skugge, V, t lys, F glans), like lys som bjørkekrona.
    tonar = [("V", "O", "O", "I"), ("t", "V", "O", "I"), ("t", "V", "V", "O")]
    # Kvar klase blir ferdig skuggelagd før den neste (framfor) blir lagd oppå: ein smal sigd av lys
    # oppe til venstre (dei framme lysast) og mørk skugge i botnen, så kanten mellom klasane syner.
    for i, (kx, ky, r, t) in enumerate(klasar):
        klump(L, kx, ky, r, tonar[t], i)
        for y in range(int(ky - r) - 1, int(ky + r) + 2):
            for x in range(int(kx - r) - 1, int(kx + r) + 2):
                nx, ny = (x + .5 - kx) / r, (y + .5 - ky) / r; d = math.hypot(nx, ny)
                if 0.45 < d <= 1.0 and nx + ny < -0.55 and L.get(x, y) != ".": L.p(x, y, "F" if t == 2 and d > 0.7 else "t" if t >= 1 else "V")
                elif 0.68 < d <= 1.0 and ny > 0.5 and L.get(x, y) != ".": L.p(x, y, "O" if t == 2 else "I")
    # Holer inni mellom klasane (mørkast), der klasane møtest.
    for (x, y) in [(8, 13), (12, 14), (10, 10), (6, 14), (14, 9), (11, 17), (7, 9)]:
        if L.get(x, y) != ".": L.p(x, y, "h")
    # Nålestrøk: korte, skrå strekar i lysare tone på sida mot ljoset.
    for k in range(12):
        x, y = int(2 + h(k, 1, 91) * 12), int(3 + h(k, 2, 91) * 10)
        if L.get(x, y) in "OVt" and L.get(x + 1, y - 1) in "IOVt":
            c = {"O": "V", "V": "t", "t": "F"}[L.get(x, y)]
            L.p(x, y, c); L.p(x + 1, y - 1, c)
    # Stikkande nåletuster langs kanten: lyse oppe til venstre, mørke nede til høgre.
    for x in range(W):
        for y in range(H):
            if L.get(x, y) == "." and h(x, y, 92) > 0.72 and y < 14:
                nb = [L.get(x + dx, y + dy) for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))]
                if any(c not in ".o" for c in nb) and y < 19:
                    L.p(x, y, "t" if (x < 10 and y < 12) else "V" if y < 14 else "O")
    # Blåsvarte bær med lys dogg: einskilde bær spreidde, ikkje par (to og to ser ut som auge).
    for (x, y, d) in [(6, 10, 1), (13, 8, 1), (10, 15, 1), (15, 13, 0), (4, 14, 0)]:
        L.p(x, y, "T")
        if d: L.p(x, y - 1, "U")
    # Ein tørr kvist som stikk ut til høgre, og kontaktlina mot bakken.
    for k in range(4): L.p(17 + (k > 1), 18 - k, "b" if k else "a")
    for x in range(3, 18):
        if L.get(x, 20) != "." or L.get(x, 19) != ".": L.p(x, 20, "I" if L.get(x, 20) != "." else L.get(x, 20))
    omriss(L)
    return L


# ---------------------------------------------------------------- gran og furu (runde 34)
# Granene er bygde av greinlag som heng ned som paraplyar: lys overside mot venstre, mørk
# underside, greinspissar som heng ned i sagtakk, og lyse nålestrøk som fortel kvar greinene
# går. Gamle graner har fleire lag som heng meir, unge er låge og tette. Same funksjon gir
# dei mørke granene innst i skogkanten (tone=-1) og dei lyse framme (tone=1).

def _tone(c, steg):
    """Flytt ein grantone opp eller ned i skalaen (0 djup til 4 glans, N under 0)."""
    skala = "N01234"
    i = max(0, min(len(skala) - 1, skala.index(c) + steg))
    return skala[i]


def granfigur(W, H, hogd, r, nlag, heng=1.0, fro=1, tone=0, skeiv=0.0, stamme=4, glis=0.0, smal=1.0):
    """Ei gran på eit lerret W x H. Bakken er rad H-2, toppen hogd pikslar over.
    r: halve breidda nedst, nlag: talet på greinlag, heng: kor mykje greinene heng,
    skeiv: kor mange pikslar toppen lener seg (positiv mot høgre), stamme: synleg stamme,
    glis: del av greinlaga som manglar bitar (gamle, vêrbitne graner), smal: smalare topp."""
    L = Lerret(W, H)
    botn = H - 2
    topp = botn - hogd
    kb = botn - stamme                                    # nedste kanten av krona
    cx0 = W / 2

    def midt(y):                                          # stammen kan lene seg litt mot toppen
        t = (kb - y) / max(1, kb - topp)
        return cx0 + skeiv * t * t

    # stamme med rotfot
    for y in range(kb - 6, botn + 1):
        x = midt(y)
        for dx, c in ((-1, "c"), (0, "b"), (1, "a")):
            L.p(int(x) + dx, y, c)
    L.p(int(cx0) - 2, botn, "b"); L.p(int(cx0) + 2, botn, "a")
    # greinlaga: startrad for kvart lag, tettare mot toppen
    start = [topp + (kb - topp) * ((i / nlag) ** 1.1) for i in range(nlag)]
    lag = []
    for i, y0 in enumerate(start):
        y1 = (start[i + 1] if i + 1 < nlag else kb) + 2 + (1 if i > nlag // 2 else 0)
        rb = r * (((y1 - topp) / (kb - topp)) ** (0.95 * smal)) * (0.9 + 0.2 * h(i, fro, 1))
        lag.append((y0, y1, rb, i))
    SKALA = "01234"
    def lysne(c, n): return SKALA[max(0, min(4, SKALA.index(c) + n))]
    # Kvart lag er eit skjørt: smalt oppe under laget over, breitt nedst, med ytste greinene som
    # heng ned. Teikna nedanfrå og opp, så skjørtet over heng over toppen av laget under.
    for (y0, y1, rb, i) in reversed(lag):
        T = max(2.0, y1 - y0)
        dropn = heng * (1 + rb / 8)
        cxy = midt(y0)
        for side in (-1, 1):
            # ujamne lag: kvar side har si eiga lengd, og gamle graner har nokre korte greiner
            rs = rb * (0.86 + 0.28 * h(i, side + 5, fro))
            if glis and h(i, side, fro + 11) < glis: rs *= 0.7
            for y in range(int(y0), int(y1 + dropn) + 2):
                v = max(0.0, (y - y0) / T)
                for x in range(W):
                    dx = x + .5 - cxy
                    if dx * side < 0 and abs(dx) > 0.6: continue
                    a = abs(dx) / max(1, rs)
                    if a > 1 or a > 0.22 + 0.78 * (v ** 1.3): continue
                    yb = y1 + dropn * (a ** 1.5)                    # undersida bøyer ned mot spissane
                    if y > yb: continue
                    d = yb - y - (0.9 if (x + i) % 3 == 0 else 0)     # ujamne grenser mellom tonane
                    s_ = dx / max(1, rs)
                    if d < 1: c = "1" if s_ < -0.3 else "0"
                    elif d < 2.2: c = "2" if s_ < -0.25 else "1"
                    else: c = "4" if (s_ < -0.5 and d > 3) else "3" if s_ < -0.1 else "2" if s_ < 0.45 else "1"
                    L.p(x, y, c)
        # nålestrøk: små lyse tustar langs oversida på venstre side
        for k in range(2, int(rb) - 1, 3):
            if h(k, i, fro + 13) < 0.5: continue
            a = k / max(1, rb)
            x = int(cxy - k)
            yb = y1 + dropn * (a ** 1.5)
            y = int(yb - 3)
            if L.get(x, y) in "23": L.p(x, y, "4"); L.p(x - 1, y + 1, "3")
        # spissane nedst heng som små dråpar i sagtakk, over laget under eller ut i lufta
        for k in range(int(-rb) + 1, int(rb)):
            if abs(k) < 1.5 or (k + i) % 2 or h(k, i, fro + 3) < 0.3: continue
            a = abs(k) / max(1, rb)
            x = int(cxy + k)
            yb = int(y1 + dropn * (a ** 1.5))
            if L.get(x, yb) not in "01234": continue
            lang = 2 if h(k, i, fro + 4) > 0.7 and a > 0.4 else 1
            for j in range(1, lang + 1): L.p(x, yb + j, "0" if k > 0 or j > 1 else "1")
    # toppskotet
    tx = int(midt(topp))
    L.p(tx, topp - 1, "4"); L.p(tx, topp, "3")
    if tone:
        for y in range(H):
            for x in range(W):
                c = L.g[y][x]
                if c in "01234": L.g[y][x] = _tone(c, tone)
    omriss(L)
    return L


def torrgran(fro=1):
    """Tørrgran: grå, naken stamme med tynne greinstumpar som heng ned, litt raudbrune nåler
    att øvst og skjegglav som heng. Kvistane blir teikna etter omrisset, så dei blir tynne."""
    W, H = 22, 46
    L = Lerret(W, H)
    botn = H - 2; topp = 3; cx = 11
    stamme = []
    for y in range(topp, botn + 1):
        x = cx + (1 if y < 12 and fro == 2 else 0)
        stamme.append((x, y))
        if y < topp + 4: L.p(x, y, "L"); continue
        L.p(x - 1, y, "M"); L.p(x, y, "L"); L.p(x + 1 if y > topp + 10 else x, y, "K")
    L.p(cx - 2, botn, "L"); L.p(cx + 2, botn, "K")
    # brune nåler att i toppen
    for (x, y, c) in [(cx - 1, 6, "Q"), (cx + 1, 7, "S"), (cx - 2, 9, "Q"), (cx + 2, 10, "S"), (cx - 1, 10, "Q")]: L.p(x, y, c)
    omriss(L)
    kvist = []
    for i, y in enumerate(range(topp + 5, botn - 6, 3)):
        lengd = min(8, 2 + (y - topp) // 5) - (2 if h(i, fro, 2) > 0.65 else 0)
        for side in (-1, 1):
            if h(i, side, fro) < 0.2: continue
            x0 = cx + side * 2
            for k in range(lengd):
                kvist.append((x0 + side * k, y + (k * k) // 10 + (1 if k > 2 else 0), "K"))
            if lengd > 3 and h(i, side, fro + 4) > 0.5:          # skjegglav som heng under greina
                x = x0 + side * (lengd - 2); yy = y + ((lengd - 2) ** 2) // 10 + 2
                kvist += [(x, yy, "P"), (x, yy + 1, "P"), (x, yy + 2, "R"), (x - side, yy, "R")]
    for (x, y, c) in kvist:
        if L.get(x, y) == ".": L.p(x, y, c)
    return L


def furu(W, H, hogd, lean, kroner, fro=1, ung=False, gamal=False):
    """Furu: høg, raudbrun stamme med flass, grå og sprukken nedst, og ei flat, ujamn krone
    høgt oppe av flate nåleputer på greiner som går ut frå stammen.
    kroner: liste med (dy frå toppen, dx frå stammen, rx, ry) for nåleputene."""
    L = Lerret(W, H)
    botn = H - 2; topp = botn - hogd; cx0 = W // 2 - int(lean * 0.5)

    def midt(y):
        t = (botn - y) / max(1, hogd)
        return cx0 + lean * (t ** 1.4) + math.sin(t * 5 + fro) * 0.6

    tjukk = 3 if gamal else 2
    # greinene først (under putene)
    for (dy, dx, rx, ry) in kroner:
        y = topp + dy; sx = midt(y + ry + 2)
        ex = sx + dx
        steg = max(1, int(abs(dx)))
        for k in range(steg + 1):
            x = sx + dx * k / steg; yy = y + ry + 2 - (k / steg) * (ry + 1) * 0.8
            L.p(int(x), int(yy), "e"); L.p(int(x), int(yy) + 1, "d")
    # stammen
    flassgrense = topp + (hogd * (0.6 if not ung else 0.8))
    for y in range(topp + 2, botn + 1):
        x = midt(y)
        b = tjukk + (1 if y > botn - 3 else 0)
        for k in range(b):
            if y < flassgrense:                                   # raudt flass oppe
                c = "i" if k == 0 else "f" if k < b - 1 else "e"
                if k == 0 and h(int(x), y, fro) > 0.7: c = "f"
            else:                                                 # grå, sprukken bork nedst
                c = "j" if k == 0 else "k" if k < b - 1 else "d"
                if (y + k * 2 + fro) % 5 == 0: c = "d"
            L.p(int(x) - b // 2 + k, y, c)
        if flassgrense - 4 < y < flassgrense and h(y, fro, 3) > 0.5: L.p(int(x) - b // 2, y, "f")
    L.p(int(midt(botn)) - tjukk // 2 - 1, botn, "k"); L.p(int(midt(botn)) + tjukk - tjukk // 2, botn, "d")
    # nåleputene: flate, ujamne, lys overside, mørk underside med tustar som heng
    # dei nedste putene først, så dei øvste ligg oppå (ein ser krona litt ovanfrå)
    for j, (dy, dx, rx, ry) in sorted(enumerate(kroner), key=lambda e: -e[1][0]):
        y = topp + dy; x0 = midt(y + ry + 2) + dx
        for yy in range(int(y - ry - 1), int(y + ry + 2)):
            for xx in range(int(x0 - rx - 1), int(x0 + rx + 2)):
                nx = (xx + .5 - x0) / rx; ny = (yy + .5 - y) / ry
                # ujamn kant: tustar langs kanten
                kant = 1 + 0.18 * math.sin(xx * 1.7 + j * 3 + fro) + 0.12 * math.sin(xx * 3.1 + fro)
                if ny < 0: kant += 0.1 * math.sin(xx * 2.3 + j)
                if nx * nx + ny * ny > kant: continue
                v = -nx * 0.45 - ny * 0.9
                c = "z" if v > 0.62 else "y" if v > 0.05 else "x" if v > -0.55 else "w"
                L.p(xx, yy, c)
        # tustar under puta som heng ned, og lyse tustar oppå
        for k in range(int(-rx) + 1, int(rx), 2):
            if h(k, j, fro + 2) < 0.45: continue
            xx = int(x0 + k)
            for yy in range(int(y + ry + 2), int(y - 1), -1):
                if L.get(xx, yy) in "wxyz":
                    L.p(xx, yy + 1, "w"); break
        for k in range(int(-rx) + 2, int(rx) - 1, 3):
            xx = int(x0 + k + h(k, j, fro) * 1.5)
            for yy in range(int(y - ry - 2), int(y + 1)):
                if L.get(xx, yy) in "xy": L.p(xx, yy, "z" if k < rx * 0.3 else "y"); L.p(xx + 1, yy + 1, "x"); break
    omriss(L)
    # nokre tørre kvistar på stammen under krona, tynne (etter omrisset)
    for i in range(3 if not ung else 1):
        y = int(flassgrense + 2 + i * 6)
        if y >= botn - 4: break
        side = 1 if h(i, fro, 6) > 0.5 else -1
        x = int(midt(y)) + (tjukk if side > 0 else -2)
        for k in range(3 + (i == 0)):
            if L.get(x + side * k, y - k // 2) == ".": L.p(x + side * k, y - k // 2, "K")
    return L


def furu1():
    """Gammal furu, skeiv mot høgre, med ei flat, ujamn krone i tre etasjar."""
    return furu(32, 58, 54, 4, [(3, -1, 7, 2.6), (6, 6, 6, 2.4), (9, -6, 5.5, 2.4), (12, 2, 7, 2.8), (16, -4, 5, 2.2), (19, 6, 4.5, 2)], fro=1)


def furu2():
    """Furu som lener seg mot venstre, med ei brei, flat krone og ein lang grein mot høgre."""
    return furu(34, 54, 50, -5, [(3, 1, 8, 2.8), (7, -6, 6, 2.6), (9, 8, 5.5, 2.2), (12, 0, 6.5, 2.6), (16, -7, 4.5, 2)], fro=2)


def furu_ung():
    """Ung furu: lågare, rett, rundare krone som går lenger ned på stammen."""
    return furu(24, 38, 34, 1, [(3, 0, 5, 2.6), (7, -3, 5, 2.6), (8, 3, 5, 2.6), (12, 0, 6, 2.6), (16, -2, 5, 2.2), (17, 4, 3.5, 2)], fro=3, ung=True)


def furu_gamal():
    """Gammal, høg furu med tjukk stamme og ei vid, flat krone heilt oppe (som ei paraply)."""
    return furu(38, 64, 60, 2, [(3, 0, 10, 3), (5, -9, 6, 2.4), (6, 9, 6.5, 2.4), (9, 2, 8, 2.6), (12, -6, 5, 2.2), (13, 8, 4.5, 2)], fro=4, gamal=True)


def granar():
    """Variantane av grana. Frittståande (kartteiknet i) og i skogkanten (#)."""
    return {
        # vanlege, middels store graner
        "gran1": lambda: granfigur(24, 44, 40, 10.5, 8, heng=1.0, fro=1),
        "gran2": lambda: granfigur(22, 40, 36, 9.5, 7, heng=0.8, fro=2, skeiv=0.8),
        "gran3": lambda: granfigur(26, 46, 42, 11.5, 8, heng=1.2, fro=3, skeiv=-0.8),
        # smal og høg (står tett i skogen)
        "gran-smal": lambda: granfigur(18, 46, 42, 7.5, 9, heng=0.9, fro=4, smal=0.8),
        # gammal, høg gran med lange, hengjande greiner og glisne lag
        "gran-gamal": lambda: granfigur(30, 56, 52, 13.5, 10, heng=1.9, fro=5, glis=0.22, stamme=3),
        # ung og liten
        "gran-ung": lambda: granfigur(18, 30, 26, 7.5, 5, heng=0.5, fro=6, stamme=3),
        "gran-liten": lambda: granfigur(14, 20, 16, 5, 4, heng=0.3, fro=7, stamme=2),
        # mørke graner innst i skogen og lyse graner framme i kanten
        "gran-mork1": lambda: granfigur(24, 44, 40, 10.5, 8, heng=1.0, fro=8, tone=-1),
        "gran-mork2": lambda: granfigur(20, 46, 42, 8.5, 9, heng=1.0, fro=9, tone=-1, smal=0.85),
        "gran-lys": lambda: granfigur(22, 40, 36, 9.5, 7, heng=0.9, fro=10, tone=1),
        "torrgran": lambda: torrgran(1),
    }


NATUR = {
    **{k: v for k, v in granar().items()},
    "furu1": furu1, "furu2": furu2, "furu-ung": furu_ung, "furu-gamal": furu_gamal,
    "bjork1": lambda: bjork(1), "bjork2": lambda: bjork(2), "bjork3": lambda: bjork(3),
    "bjork-ung": bjork_ung, "bjork-dobbel": bjork_dobbel,
    "stein1": lambda: stein(1), "stein2": lambda: stein(2), "stein3": lambda: stein(3),
    "heller": heller, "roys": roys, "bauta": bauta, "einer": einer,
    "haug": haug,
}


def pix(namn, L):
    brukt = {c for r in L.g for c in r}
    ut = [f"# namn: natur-{namn}", "# type: fiende", f"# ut: bilete/spel/natur/{namn}.png", f"# storleik: {L.w}x{L.h}", "palett:"]
    ut += [f"  {t} = {f}    {m}".rstrip() for t, f, m in PAL if t in brukt or t == "."]
    ut.append("bilete:"); ut += ["  " + "".join(r) for r in L.g]
    return "\n".join(ut) + "\n"


if __name__ == "__main__":
    tving = "--tving" in sys.argv
    namn = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not namn: print(__doc__); sys.exit(0)
    if namn == ["alle"]: namn = list(NATUR)
    for n in namn:
        sti = os.path.join(ROT, "kjelder", f"natur-{n}.pix")
        if os.path.exists(sti) and not tving: print(f"natur-{n}.pix finst alt (bruk --tving)"); continue
        open(sti, "w", encoding="utf-8").write(pix(n, NATUR[n]())); print(f"skreiv kjelder/natur-{n}.pix")
