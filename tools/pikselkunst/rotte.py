"""Rottene i stabburet på Åsen: låverotta og rottemora (fiendar i kampen).

Sett frå sida, vend mot høgre (mot partiet). Stor, grå-brun låverotte med
krokrygg og bust som reiser seg, lang naken hale i ein S-boge, raude auge,
gule gnagartenner og skjeggstrå. Farleg nok, men litt komisk: for store
tenner, sint bryn og ein hale som krøllar seg.

Skuggane er cel-flater som følgjer silhuetten: lys langs kanten oppe til
venstre, skugge og djup skugge langs kanten nede til høgre (lyset kjem frå
oppe til venstre). Ingen kuleformlar.

  python tools/pikselkunst/rotte.py alle      skriv kjelder/fiende-rotte*.pix
  python tools/pikselkunst/rotte.py rotte     berre éi
Så: python tools/pikselkunst/pix.py lag kjelder/fiende-rotte.pix
"""
import sys, os, math

ROT = os.path.dirname(os.path.abspath(__file__))

PAL = [
    (".", "-", ""), ("o", "#0a0514", "omriss"),
    # pels: grå-brun, skuggen dreg mot fiolett
    ("0", "#160f22", "pels djup"), ("1", "#352b40", "pels skugge"), ("2", "#5a4e58", "pels"),
    ("3", "#857470", "pels lys"), ("4", "#bcaa9c", "pels glans"),
    # buken og snuten: lysare, gråare
    ("5", "#6c6470", "buk skugge"), ("6", "#9a8e8c", "buk"),
    # naken hud: hale, øyre, føter, nase
    ("a", "#5a2438", "hud djup"), ("b", "#94485a", "hud skugge"), ("c", "#c87480", "hud"), ("d", "#eaa8a8", "hud lys"),
    # auge
    ("m", "#400820", "munn"), ("r", "#7a0c1c", "auge mørk"), ("R", "#e8283a", "auge"), ("w", "#fff1c4", "glimt"),
    # tenner
    ("t", "#b8883c", "tann skugge"), ("T", "#f0dc98", "tann"),
    # skjeggstrå
    ("s", "#c8c0c8", "skjeggstrå"),
    # flatbrød (rottemora har eit stykke i kjeften)
    ("f", "#8a5a28", "flatbrød skugge"), ("F", "#c89a58", "flatbrød"), ("G", "#e8c888", "flatbrød lys"),
    # gamal pels (grå snute på rottemora)
    ("g", "#a49ca4", "grå pels"),
]


class Lerret:
    def __init__(s, w, h): s.w, s.h = w, h; s.g = [["." for _ in range(w)] for _ in range(h)]
    def p(s, x, y, c):
        if 0 <= x < s.w and 0 <= y < s.h: s.g[y][x] = c
    def get(s, x, y): return s.g[y][x] if 0 <= x < s.w and 0 <= y < s.h else "."
    def rad(s, y, x0, x1, c):
        for x in range(x0, x1 + 1): s.p(x, y, c)
    def tekst(s, x0, y0, rader, tyding):
        """Handteikna bit: strengar der kvar bokstav slår opp i tyding (mellomrom = ingenting)."""
        for dy, r in enumerate(rader):
            for dx, c in enumerate(r):
                if c != " ": s.p(x0 + dx, y0 + dy, tyding.get(c, c))


def maske(w, h, former):
    """Ei maske (set av rutene) frå ellipsar (cx, cy, rx, ry) og spennvidder (y, x0, x1)."""
    m = set()
    for f in former:
        if len(f) == 4:
            cx, cy, rx, ry = f
            for y in range(h):
                for x in range(w):
                    if ((x + .5 - cx) / rx) ** 2 + ((y + .5 - cy) / ry) ** 2 <= 1: m.add((x, y))
        else:
            y, x0, x1 = f
            for x in range(x0, x1 + 1): m.add((x, y))
    return m


def mangekant(punkt):
    """Rutene inne i ein mangekant (punkta i rekkjefølgje rundt kanten)."""
    m = set()
    ys = [p[1] for p in punkt]
    for y in range(min(ys), max(ys) + 1):
        kryss = []
        for (x0, y0), (x1, y1) in zip(punkt, punkt[1:] + punkt[:1]):
            if (y0 <= y + .5 < y1) or (y1 <= y + .5 < y0):
                kryss.append(x0 + (y + .5 - y0) * (x1 - x0) / (y1 - y0))
        kryss.sort()
        for a, b in zip(kryss[::2], kryss[1::2]):
            for x in range(round(a), round(b)): m.add((x, y))
    return m


def kutt(m, former):
    """Tek ruter bort frå maska (same formformat som maske)."""
    ut = maske(200, 200, former)
    return m - ut


def pels(L, m, glans_fra=None):
    """Cel-skugge frå silhuetten: lys oppe til venstre, skugge nede til høgre."""
    inn = lambda x, y: (x, y) in m
    for (x, y) in m:
        c = "2"
        if not inn(x + 3, y + 4) or not inn(x + 4, y + 2): c = "1"
        if not inn(x + 1, y + 2) and not inn(x, y + 1): c = "0"
        if not inn(x - 2, y - 3) or not inn(x - 3, y - 2): c = "3"
        if (not inn(x, y - 1) or not inn(x - 1, y - 1)) and (glans_fra is None or glans_fra(x, y)): c = "4"
        L.p(x, y, c)


def strak(L, a, b, c, tjukk=1):
    """Ei strek frå a til b (tjukk: 1 eller 2 pikslar)."""
    (x0, y0), (x1, y1) = a, b
    n = max(abs(x1 - x0), abs(y1 - y0), 1)
    for i in range(n + 1):
        x, y = round(x0 + (x1 - x0) * i / n), round(y0 + (y1 - y0) * i / n)
        L.p(x, y, c)
        if tjukk > 1: L.p(x, y + 1, c)


def glansstrok(L, m, punkt):
    """Lyse hårstrok i lyset: to pikslar på skrå bakover og ned (håret ligg mot halen)."""
    for x, y in punkt:
        for dx, dy, c in ((0, 0, "4"), (-1, 1, "4"), (-2, 1, "3")):
            if (x + dx, y + dy) in m and L.get(x + dx, y + dy) in "23": L.p(x + dx, y + dy, c)


def tuster(L, m, punkt):
    """Pelsklumpar: korte skrå strekar i skuggetonen med lys kant over (håret ligg bakover og ned)."""
    for x, y in punkt:
        for i in range(3):
            if (x - i, y + i // 2) in m and L.get(x - i, y + i // 2) in "23": L.p(x - i, y + i // 2, "1")
        if (x + 1, y - 1) in m and L.get(x + 1, y - 1) == "2": L.p(x + 1, y - 1, "3")


def omriss(L):
    ut = [r[:] for r in L.g]
    for y in range(L.h):
        for x in range(L.w):
            if L.g[y][x] == "." and any(L.get(x + dx, y + dy) not in ".o" for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))):
                ut[y][x] = "o"
    L.g = ut


def hale(L, punkt, tjukk):
    """Naken hale langs ein boge av punkt, med ringar (hud skugge) kvar tredje piksel."""
    sti = []
    for (x0, y0), (x1, y1) in zip(punkt, punkt[1:]):
        n = max(abs(x1 - x0), abs(y1 - y0), 1)
        for i in range(n):
            sti.append((round(x0 + (x1 - x0) * i / n), round(y0 + (y1 - y0) * i / n)))
    sti.append(punkt[-1])
    reint = []
    for p in sti:
        if not reint or reint[-1] != p: reint.append(p)
    for i, (x, y) in enumerate(reint):
        t = tjukk if i < len(reint) * 0.45 else (2 if i < len(reint) * 0.8 else 1)
        ring = i % 3 == 2
        L.p(x, y, "b" if ring else "c")
        if t >= 2: L.p(x, y + 1, "b" if ring else "b")
        if t >= 2 and not ring: L.p(x, y, "d" if i % 3 == 0 else "c")
        if t >= 3: L.p(x, y - 1, "c" if not ring else "b"); L.p(x, y + 1, "a" if ring else "b")


def bust(L, m, xar, lengd, fro=0):
    """Stive hår som reiser seg over silhuetten langs ryggen, peikar bakover (mot venstre) og opp."""
    for i, x in enumerate(xar):
        topp = min((y for (xx, y) in m if xx == x), default=None)
        if topp is None: continue
        n = lengd[i % len(lengd)]
        for k in range(1, n + 1):
            L.p(x - k // 2, topp - k, "1" if k < n else "0")
            m.add((x - k // 2, topp - k))
        L.p(x + 1, topp, "1")


def rotte():
    W, H = 48, 40
    L = Lerret(W, H)
    # Halen først (kroppen dekkjer roten): langs golvet bakover og krølla opp att.
    hale(L, [(8, 35), (4, 37), (1, 35), (1, 30), (3, 26), (6, 24), (7, 21), (5, 18), (2, 18)], 2)
    # Kroppen: halvt reist på bakbeina, krokrygg, hovudet fram og opp mot partiet.
    m = maske(W, H, [
        (16, 30.5, 10, 7),          # bakkropp og lår
        (21, 25.5, 8.5, 8.5),       # mage
        (26, 19.5, 6.5, 6.5),       # bringe og skuldrer
        (33, 13.5, 7.2, 6.4),       # hovud
    ])
    for y, x0, x1 in [(10, 38, 41), (11, 38, 43), (12, 39, 45), (13, 39, 46), (14, 39, 46), (15, 39, 46), (16, 39, 45), (17, 38, 43)]:
        m |= {(x, y) for x in range(x0, x1 + 1)}       # snuten
    m -= {(x, y) for (x, y) in m if y >= 37}           # står på golvet
    pels(L, m, glans_fra=lambda x, y: 11 <= x <= 22 or 27 <= x <= 33)
    glansstrok(L, m, [(10, 27), (13, 24), (16, 22), (19, 20), (23, 18), (13, 28), (17, 25)])
    # Bringa og magen: lysare grå-brun (i skugge, men lysare pels).
    for y, x0, x1 in [(21, 30, 32), (22, 29, 32), (23, 28, 31), (24, 27, 30), (25, 27, 30), (26, 26, 29), (27, 26, 28), (28, 25, 28), (29, 24, 27)]:
        for x in range(x0, x1 + 1):
            if (x, y) in m: L.p(x, y, "6" if x < x1 else "5")
    # Snuten: grå og lysare, kinnet i skugge under.
    for y, x0, x1 in [(13, 40, 44), (14, 39, 45), (15, 39, 45)]:
        for x in range(x0, x1 + 1): L.p(x, y, "6")
    for x in range(38, 44): L.p(x, 16, "5")
    # Munnline som glisar, og dei store gnagartennene som heng ned.
    for x, y in [(36, 17), (37, 17), (38, 17), (39, 17), (40, 16), (41, 16), (42, 16), (43, 16)]: L.p(x, y, "0")
    L.p(35, 16, "0")
    L.tekst(42, 17, ["TT", "Tt", "Tt"], {})
    # Låret: bogen skil låret frå kroppen med den mørkaste tonen.
    for x, y in [(8, 27), (9, 26), (10, 25), (11, 25), (12, 25), (13, 25), (14, 26), (15, 26), (16, 27), (17, 28), (18, 29), (18, 30), (19, 31), (19, 32), (19, 33), (19, 34)]:
        L.p(x, y, "1")
    for x, y in [(10, 26), (11, 26), (12, 26), (9, 27)]: L.p(x, y, "3")
    # Bust: stive hår som reiser seg langs ryggen og nakken.
    bust(L, m, [9, 12, 14, 17, 19, 22, 25], [2, 3, 2, 3, 3, 2, 2])
    # Øyret: stort og rundt, naken hud inni.
    L.tekst(25, 4, [
        "  111  ",
        " 1cdd1 ",
        "1ccdd31",
        "1bccd31",
        "1abcb31",
        " 1aa31 ",
        "  1111 ",
    ], {})
    # Auget: raudt med glimt, og eit sint bryn som skrår ned mot snuten.
    L.tekst(32, 8, [
        "000     ",
        " 00000  ",
        "  rRRR1 ",
        "  rwRR1 ",
        "   rr1  ",
    ], {})
    # Nasa ytst på snuten.
    L.tekst(45, 11, [" d", "cd", "bc"], {})
    # Skjeggstrå.
    for x, y in [(44, 10), (45, 9), (46, 8), (47, 8), (45, 15), (46, 15), (47, 16)]: L.p(x, y, "s")
    # Armane: den bakre i skugge, den fremre lyft med klørne ute.
    strak(L, (30, 24), (34, 27), "1", 2); L.tekst(34, 26, ["bcd", "abcT"], {})
    strak(L, (30, 21), (35, 21), "2", 2); strak(L, (30, 20), (34, 20), "3")
    L.tekst(35, 19, [" cdT", "bcddT", "abcd", " ab"], {})
    # Bakfoten: lang og rosa, flat på golvet.
    L.tekst(15, 35, ["  bccc  ", "bcddddcd", "abbbbbbb"], {})
    omriss(L)
    return L


def rottemor():
    """Rottemora: større og feitare, grå i snuten, riven i øyret og med eit arr, og ho held
    ein flatbrødleiv med begge framlabbane og gneg på kanten."""
    W, H = 64, 52
    L = Lerret(W, H)
    hale(L, [(12, 47), (6, 49), (2, 47), (1, 41), (3, 35), (7, 32), (9, 28), (7, 24), (3, 24), (2, 26)], 3)
    m = maske(W, H, [
        (21, 40, 14.5, 10.5),       # tung bakkropp og lår
        (28, 33.5, 12, 11.5),       # mage
        (35, 25.5, 9, 8.5),         # bringe og skuldrer
        (44, 17.5, 9.2, 8.2),       # hovud
    ])
    for y, x0, x1 in [(12, 51, 54), (13, 51, 56), (14, 52, 58), (15, 52, 60), (16, 52, 61), (17, 52, 62), (18, 52, 62), (19, 52, 62), (20, 52, 61), (21, 52, 59), (22, 51, 57)]:
        m |= {(x, y) for x in range(x0, x1 + 1)}
    m -= {(x, y) for (x, y) in m if y >= 49}
    pels(L, m, glans_fra=lambda x, y: 14 <= x <= 30 or 36 <= x <= 44)
    glansstrok(L, m, [(13, 35), (17, 31), (20, 28), (24, 26), (28, 24), (17, 36), (22, 32), (27, 29), (39, 13), (42, 12)])
    for y, x0, x1 in [(29, 39, 42), (30, 38, 42), (31, 37, 41), (32, 36, 41), (33, 36, 40), (34, 35, 40), (35, 35, 39), (36, 34, 39), (37, 34, 38), (38, 33, 37), (39, 32, 36)]:
        for x in range(x0, x1 + 1):
            if (x, y) in m: L.p(x, y, "6" if x < x1 else "5")
    # Grå snute (ho er gamal), kinnet i skugge under.
    for y, x0, x1 in [(15, 54, 58), (16, 53, 60), (17, 53, 60), (18, 52, 61), (19, 52, 61), (20, 52, 59)]:
        for x in range(x0, x1 + 1): L.p(x, y, "g" if y < 19 else "6")
    for x in range(51, 58): L.p(x, 21, "5")
    # Låret.
    for x, y in [(11, 35), (12, 34), (13, 33), (14, 33), (15, 32), (16, 32), (17, 32), (18, 33), (19, 33), (20, 34), (21, 35), (22, 36), (23, 37), (24, 38), (24, 39), (25, 40), (25, 41), (26, 42), (26, 43), (26, 44), (26, 45)]:
        L.p(x, y, "1")
    for x, y in [(13, 34), (14, 34), (15, 33), (16, 33), (17, 33), (12, 35)]: L.p(x, y, "3")
    # Arr over skulderen: tre parallelle rifter (naken hud) med mørk kant.
    for x0, y0 in [(31, 20), (33, 21), (35, 22)]:
        for i in range(4): L.p(x0 + i // 2, y0 + i, "b" if i % 2 else "c")
    # Bust: høgare og tettare enn på ungane.
    bust(L, m, [12, 14, 16, 19, 21, 24, 27, 30, 33, 36], [3, 2, 4, 3, 4, 3, 4, 3, 3, 2])
    # Øyret med eit hakk (riven i ein slåstkamp).
    L.tekst(35, 4, [
        "  1111  ",
        " 1cddc1 ",
        "1ccddc31",
        "1ccddc31",
        "1bccdb31",
        "1abccb31",
        " 1abb31 ",
        "  1111  ",
    ], {".": "."})
    for x, y in [(39, 4), (40, 4), (41, 4), (40, 5), (41, 5), (40, 6)]: L.p(x, y, ".")
    # Auget: smalt og sint under eit tungt bryn, med ein grå ring rundt (gamal).
    L.tekst(44, 11, [
        "0000      ",
        " 000000   ",
        "  g0000   ",
        "  rRRRR1  ",
        "  rwRRR1  ",
        "   rrr1   ",
    ], {})
    # Nasa.
    L.tekst(61, 15, [" d", "cd", "bc", "a "], {})
    for x, y in [(60, 13), (61, 12), (62, 11), (63, 10), (60, 21), (61, 21), (62, 22), (63, 22)]: L.p(x, y, "s")
    # Flatbrødstykket: eit tynt, kantete brot med sprekker, og tennene i hjørnet øvst.
    leiv = mangekant([(44, 26), (51, 23), (58, 23), (60, 30), (55, 36), (46, 34)])
    for (x, y) in leiv:
        inn = lambda a, b: (a, b) in leiv
        c = "F"
        if not inn(x - 1, y) or not inn(x, y - 1): c = "G"
        if not inn(x + 1, y + 1) and (not inn(x + 1, y) or not inn(x, y + 1)): c = "f"
        L.p(x, y, c)
    # Ei sprekk på skrå og nokre brune bakeflekker i klyngjer.
    for x, y in [(47, 33), (48, 32), (49, 32), (50, 31), (51, 30), (51, 29), (52, 28), (53, 27)]: L.p(x, y, "f")
    for x, y in [(48, 31), (50, 30), (52, 27)]: L.p(x, y, "G")
    for x, y in [(55, 30), (56, 30), (55, 31), (47, 27), (48, 27)]: L.p(x, y, "f")
    # Bitemerket: hakk i kanten øvst til høgre.
    for x, y in [(57, 23), (58, 23), (58, 24), (59, 25)]: L.p(x, y, ".")
    # Munnen, og tennene som gneg på hjørnet.
    for x, y in [(48, 22), (49, 22), (50, 22), (51, 21), (52, 21), (53, 21), (54, 21), (55, 21), (56, 21)]: L.p(x, y, "0")
    L.tekst(55, 22, ["TTT", "TtT", "Tt "], {})
    # Labbane på kanten av leiven, med klør.
    strak(L, (37, 30), (42, 28), "2", 2); strak(L, (37, 29), (42, 27), "3")
    L.tekst(42, 26, [" cdT", "bcdd", "bccT", "abc "], {})
    strak(L, (39, 36), (52, 36), "1", 2)
    L.tekst(52, 34, [" bcT", "abcd", " abT"], {})
    # Bakfoten.
    L.tekst(19, 46, ["   bcccc  ", "bccddddccd", "abbbbbbbbb"], {})
    omriss(L)
    return L


def rotte_kart(spegl=False):
    """Lita rotte til kartet (vesen i scena): på fire føter med rund rygg, vend mot høgre
    (eller spegla mot venstre)."""
    W, H = 24, 14
    L = Lerret(W, H)
    hale(L, [(5, 9), (3, 10), (1, 9), (1, 7), (2, 5)], 1)
    spenn = {3: (8, 12), 4: (6, 14), 5: (5, 17), 6: (4, 19), 7: (4, 21), 8: (4, 20), 9: (5, 18), 10: (6, 16)}
    m = {(x, y) for y, (x0, x1) in spenn.items() for x in range(x0, x1 + 1)}
    inn = lambda x, y: (x, y) in m
    for (x, y) in m:
        c = "2"
        if not inn(x + 1, y + 2): c = "1"
        if not inn(x, y + 1): c = "0"
        if not inn(x - 1, y - 1) or not inn(x - 2, y): c = "3"
        if not inn(x, y - 1) and 8 <= x <= 13: c = "4"
        L.p(x, y, c)
    for x in range(17, 21): L.p(x, 8, "5")
    for x in range(18, 21): L.p(x, 7, "6")
    L.tekst(14, 3, ["1c", "1dc"], {})                   # øyret
    L.tekst(16, 5, ["00", "rR"], {})                    # sint bryn og raudt auge
    L.p(21, 7, "c"); L.p(22, 7, "d")                    # nasa
    L.p(19, 9, "T"); L.p(19, 10, "T")                   # tanna
    for x in (7, 8, 14, 15): L.p(x, 11, "c")            # føtene
    for x in (8, 10, 12): L.p(x - 1, 2, "1")            # bust
    omriss(L)
    if spegl: L.g = [r[::-1] for r in L.g]
    return L


ROTTER = {"rotte": rotte, "rottemor": rottemor, "rotte-kart": rotte_kart, "rotte-kart-v": lambda: rotte_kart(True)}


def pix(namn, L):
    brukt = {c for r in L.g for c in r}
    ut = [f"# namn: fiende-{namn}", "# type: fiende", f"# ut: bilete/spel/{namn}.png", f"# storleik: {L.w}x{L.h}", "palett:"]
    ut += [f"  {t} = {f}    {m}".rstrip() for t, f, m in PAL if t in brukt or t == "."]
    ut.append("bilete:"); ut += ["  " + "".join(r) for r in L.g]
    return "\n".join(ut) + "\n"


if __name__ == "__main__":
    namn = sys.argv[1:]
    if not namn: print(__doc__); sys.exit(0)
    if namn == ["alle"]: namn = list(ROTTER)
    for n in namn:
        sti = os.path.join(ROT, "kjelder", f"fiende-{n}.pix")
        open(sti, "w", encoding="utf-8").write(pix(n, ROTTER[n]())); print(f"skreiv kjelder/fiende-{n}.pix")
