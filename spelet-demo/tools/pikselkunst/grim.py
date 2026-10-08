"""Kyrkjegrimen: vetten som vaktar kyrkja (løyndomskampen i klokketårnet).

Etter folketrua vart eit dyr grave ned levande under kyrkja då ho vart bygd, oftast eit
svart lam (kyrkjelammet), og det går att som kyrkjegrimen og vaktar kyrkja og kyrkjegarden.
Her er han eit magert, svart vêrlam med krøllete, matta ull full av sot og kyrkjejord,
små krokete horn, tynne bein med klauver og glødande auge. Han står med hovudet senka mot
partiet (mot høgre) som ein vêr som skal stange, på ein haug av svart mold som han har
grave seg opp gjennom.

Cel-skugge som i rotte.py: flater som følgjer silhuetten, lys oppe til venstre, ingen
kuleformlar. Ulla er klyngjer (krøller og tjafsar), ikkje støy.

  python tools/pikselkunst/grim.py alle        skriv kjelder/fiende-kyrkjegrimen*.pix
Så: python tools/pikselkunst/pix.py lag kjelder/fiende-kyrkjegrimen.pix
"""
import sys, os
from rotte import Lerret, maske, mangekant, omriss

ROT = os.path.dirname(os.path.abspath(__file__))

PAL = [
    (".", "-", ""), ("o", "#0a0514", "omriss"),
    # ull: svart med kald, blåfiolett glans (lyset frå lydlukene)
    ("0", "#0e0b16", "ull djup"), ("1", "#1c1828", "ull skugge"), ("2", "#2c2638", "ull"),
    ("3", "#433b52", "ull lys"), ("4", "#6a6086", "ull glans"), ("5", "#9890b6", "ull kant"),
    # andletet: grå, naken hud på snuten
    ("6", "#3a3440", "snute"), ("7", "#58505c", "snute lys"),
    # horn
    ("h", "#2a1e1a", "horn djup"), ("H", "#5a4636", "horn"), ("j", "#8a7458", "horn lys"), ("J", "#b8a07c", "horn glans"),
    # auge og glød
    ("r", "#5a1408", "glød djup"), ("R", "#c0400c", "glød"), ("Y", "#f8a020", "auge"), ("w", "#fff1c4", "auge kjerne"),
    # munnen
    ("m", "#2a0812", "munn"),
    # klauver
    ("k", "#14100e", "klauv"), ("K", "#3a302a", "klauv lys"),
    # kyrkjejord og mold
    ("a", "#1a120c", "mold djup"), ("b", "#34241a", "mold"), ("c", "#56402a", "mold lys"), ("d", "#7c6044", "mold kant"),
    # sot som stig
    ("s", "#3a3446", "sot"), ("S", "#5c5468", "sot lys"),
    # roleg (etter kampen): augo slokna til glør
    ("q", "#a4602e", "glør"),
]


import math
from maleri import h as hash2


def ull(L, m, seed=7):
    """Ulla som krøllete klumpar (som på ein sau): kvar klump er ein liten ellipse med eigen
    cel-skugge (lys topp mot venstre, mørk kant nede til høgre), lagt tett i tett ovanfrå og ned.
    Grunntonen følgjer silhuetten (lys oppe til venstre, skugge nede til høgre)."""
    inn = lambda x, y: (x, y) in m
    grunn = {}
    for (x, y) in m:
        v = 2
        if not inn(x, y + 6) or not inn(x + 7, y + 3): v = 1          # skuggesida nede til høgre
        if not inn(x, y + 3) or not inn(x + 3, y + 2): v = 0
        if not inn(x - 2, y - 6) or not inn(x - 6, y - 3): v = 3        # lyssida oppe til venstre
        grunn[(x, y)] = v
        L.p(x, y, "0" if v <= 1 else "1")
    xs = [p[0] for p in m]; ys = [p[1] for p in m]
    klumpar = []
    for gy in range(min(ys) - 2, max(ys) + 3, 4):
        for gx in range(min(xs) - 2, max(xs) + 3, 4):
            ox = (gy // 4) % 2 * 2 + (hash2(gx, gy, seed) - 0.5) * 1.4
            oy = (hash2(gx, gy, seed + 1) - 0.5) * 1.4
            cx, cy = gx + ox, gy + oy
            if inn(round(cx), round(cy)): klumpar.append((cy, cx, 2.5 + hash2(gx, gy, seed + 2) * 0.6, 2.4 + hash2(gx, gy, seed + 3) * 0.5))
    klumpar.sort()
    for cy, cx, rx, ry in klumpar:
        for y in range(int(cy - ry) - 1, int(cy + ry) + 2):
            for x in range(int(cx - rx) - 1, int(cx + rx) + 2):
                d = ((x + .5 - cx) / rx) ** 2 + ((y + .5 - cy) / ry) ** 2
                if d > 1 or not inn(x, y): continue
                v = grunn[(x, y)]
                u, w = (x + .5 - cx) / rx, (y + .5 - cy) / ry
                if u + w * 1.3 < -0.5: v += 1             # lys topp mot venstre
                if u * 0.6 + w > 0.45: v -= 1             # mørk kant under
                if d > 0.6 and w > 0.15: v = 0 if grunn[(x, y)] <= 2 else 1   # fuga mellom klumpane
                L.p(x, y, str(max(0, min(4, v))))
        # krølla: eit lyst punkt oppe til venstre i klumpen, og ein mørk boge inni
        hx_, hy_ = round(cx - 1.2), round(cy - 1.1)
        if inn(hx_, hy_):
            c = "4" if grunn[(hx_, hy_)] >= 2 else "3"
            L.p(hx_, hy_, c)
            if inn(hx_ + 1, hy_): L.p(hx_ + 1, hy_, c)          # krølltoppen er to pikslar, ikkje ein einsam prikk
        if inn(hx_, hy_) and inn(hx_ + 2, hy_ + 1) and grunn[(hx_, hy_)] >= 1: L.p(hx_ + 1, hy_ + 1, "1"); L.p(hx_ + 2, hy_ + 1, "1")
    # glans: kantlys langs ryggen og skuldrene (kaldt lys frå lydlukene)
    for (x, y) in m:
        if not inn(x, y - 1) and grunn[(x, y)] >= 2 and L.get(x, y) in "234": L.p(x, y, "5" if x % 3 else "4")


def lokkar(L, m, xar, lengd):
    """Matta lokkar som heng ned under buken: spisse, med jord i tuppen."""
    for i, x in enumerate(xar):
        n = lengd[i % len(lengd)]
        y0 = max((y for (xx, y) in m if xx == x + 1), default=None)
        if y0 is None: continue
        sk = (i % 3) - 1
        for k in range(n):
            w = 3 if k < n * 0.45 else 2 if k < n * 0.8 else 1
            xx = x + (k * sk) // 4
            for d in range(w):
                L.p(xx + d, y0 + 1 + k, "2" if d == 0 and w == 3 else "1" if d < w - 1 or w == 1 else "0")
                m.add((xx + d, y0 + 1 + k))
        L.p(x + ((n - 1) * sk) // 4, y0 + n, "b")


# Bakbeinet til ein sau: lår, hase som knekk bakover, og ein tynn legg ned til klauva.
BEIN_BAK = [
    " 21 ",
    " 21 ",
    "  21",
    "  21",
    "  21",
    " 21 ",
    " 21 ",
    "21  ",
    "21  ",
    "21  ",
    "kKk ",
    "k.k ",
]
BEIN_FRAM = [
    "21 ",
    "21 ",
    "21 ",
    "121",
    "21 ",
    "21 ",
    "21 ",
    "21 ",
    "21 ",
    "21 ",
    "Kkk",
    "k.k",
]

def horn(L, cx, cy, spegl=False, r0=5.2, svingar=1.25):
    """Vêrhorn som spiral: armen startar oppe ved hovudet, går ut og bakover, ned og fram att og
    krøllar seg innover. Tjukkast ved rota. Rifler (H og j annakvar), lys ytterkant oppe mot venstre."""
    for y in range(int(cy - r0 - 3), int(cy + r0 + 4)):
        for x in range(int(cx - r0 - 3), int(cx + r0 + 4)):
            dx, dy = x + .5 - cx, y + .5 - cy
            if spegl: dx = -dx
            rho = math.hypot(dx, dy)
            th = (math.atan2(dy, dx) + math.pi / 2) % (2 * math.pi)       # 0 rett opp, aukar med klokka
            for k in range(2):
                t = (th + 2 * math.pi * k) / (2 * math.pi)
                if t > svingar: continue
                R = r0 - 3.2 * t; w = 1.9 - 1.1 * t
                if abs(rho - R) <= w:
                    ytre = rho - R > w * 0.35; indre = rho - R < -w * 0.45
                    rifle = int(t * 18) % 2 == 0
                    lys = (dx * (-1 if spegl else 1) < 0.5 and dy < 0.5)
                    c = "h" if indre else ("J" if ytre and lys and rifle else "j" if ytre or (lys and rifle) else "H" if not rifle else "h")
                    L.p(x, y, c)
                    break


def hovud(L, roleg=False):
    """Hovudet i trekvart, senka mot partiet: tung panneflokk, to glødande auge djupt inne under
    han, lang og knokete snute ned mot høgre, og vêrhorn på begge sider."""
    horn(L, 55, 36, spegl=True, r0=4.6)                   # det fjerne hornet, bak flokken
    ans = mangekant([(57, 34), (70, 33), (72, 39), (71, 46), (75, 53), (72, 57), (67, 57), (63, 52), (59, 45), (56, 39)])
    inn = lambda a, b: (a, b) in ans
    for (x, y) in ans:
        c = "1"
        if not inn(x - 1, y - 1) or not inn(x - 2, y): c = "6"
        if x >= 70 or y >= 52 or not inn(x + 2, y + 1): c = "0"
        L.p(x, y, c)
    for x, y in [(65, 41), (66, 42), (66, 43), (67, 44), (67, 45), (68, 46), (68, 47), (69, 48), (70, 49), (71, 50), (72, 51)]:
        L.p(x, y, "7"); L.p(x + 1, y, "6")                                                       # naseryggen i lyset
    for x, y in [(58, 42), (59, 44), (60, 46), (61, 48), (62, 50)]: L.p(x, y, "6")               # kinnbeinet
    for x, y in [(74, 53), (73, 54), (72, 55)]: L.p(x, y, "6")                                    # mulen
    # Panneflokken: ulla heng ned over pannen og kastar skugge over augo.
    flokk = maske(80, 68, [(63.5, 32, 8, 4.2), (60, 34.5, 4, 2.5), (68, 34, 4, 2.6)])
    ull(L, flokk, seed=11)
    for x in range(58, 71): 
        if L.get(x, 37) in "67": L.p(x, 37, "1")        # skuggen under flokken
    horn(L, 73, 37, r0=5.4)                               # det nære hornet
    # Augo: glødande glør (eller slokna, etter kampen).
    if roleg:
        L.tekst(58, 38, ["0qq0", " 11 "], {}); L.tekst(66, 38, ["0qq0", " 11 "], {})
    else:
        for x0 in (58, 66):
            L.tekst(x0, 38, ["0rR0", "rYwY", "0RYr", " 0r "], {})
    # Nasebora og munnen.
    L.p(73, 53, "0"); L.p(71, 54, "0")
    if roleg:
        for x in range(67, 73): L.p(x, 56, "0")
    else:
        L.tekst(67, 55, ["0mmmm0", " 0mm0 "], {})


def grim(roleg=False):
    W, H = 80, 68
    L = Lerret(W, H)
    # Moldhaugen han har grave seg opp gjennom golvet, med to brotne plankeendar.
    haug = {(x, y) for (x, y) in maske(W, H, [(38, 66, 34, 6.5)]) if y <= 65}
    for (x, y) in haug:
        inn = lambda a, b: (a, b) in haug
        c = "b"
        if not inn(x, y - 1) or not inn(x - 2, y - 1): c = "c"
        if not inn(x, y - 2) and not inn(x - 3, y - 1) and x < 46: c = "d"
        if not inn(x + 2, y + 1) or y >= 64: c = "a"
        L.p(x, y, c)
    for x, y in [(12, 62), (13, 62), (26, 61), (52, 61), (53, 61), (63, 63), (9, 64), (35, 62), (45, 62), (20, 64), (58, 64)]:
        L.p(x, y, "d"); L.p(x + 1, y + 1, "a")
    L.tekst(4, 57, ["  Jj", " JjH", "jjHh", "jHh "], {})
    L.tekst(68, 57, ["jJ  ", "HjJ ", "hHjj", " hHj"], {})
    # Beina (dei bakre i skugge), før kroppen, så ulla heng over.
    skugg = {"2": "1", "1": "0", "K": "k"}
    L.tekst(17, 50, [r.translate(str.maketrans(skugg)) for r in BEIN_BAK], {".": "."})
    L.tekst(47, 50, [r.translate(str.maketrans(skugg)) for r in BEIN_FRAM], {".": "."})
    L.tekst(22, 51, BEIN_BAK, {".": "."})
    L.tekst(53, 51, BEIN_FRAM, {".": "."})
    # Kroppen: tung, krokrygga, med ragget opp over skuldrene og hovudet senka mot partiet.
    m = maske(W, H, [
        (33, 40, 18, 11),           # kropp
        (44, 30, 11, 11.5),         # skuldrer og ragg, høgast
        (19, 42, 9, 9),             # bakparten, lågare
        (27, 35, 9, 8),             # ryggen fell av mot bakparten
        (55, 42, 6, 6),             # nakken ned mot hovudet
    ])
    # Ragget: stive ulltjafsar som reiser seg langs ryggen og over skuldrene.
    for x, n in [(23, 2), (27, 3), (31, 3), (34, 4), (37, 5), (40, 6), (43, 7), (46, 6), (49, 5), (52, 3)]:
        topp = min((y for (xx, y) in m if xx == x), default=None)
        if topp is None: continue
        for k in range(1, n + 1):
            for d in (0, 1):
                if d == 1 and k > n - 2: continue
                m.add((x + d - k // 2, topp - k))
    ull(L, m)
    lokkar(L, m, [12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 51], [4, 6, 5, 7, 5, 6, 4, 7, 5, 4, 3])
    # Halestumpen.
    L.tekst(9, 38, [" 32", "321", "21 "], {})
    # Hovudet.
    hovud(L, roleg)
    omriss(L)
    if not roleg:
        # Sot som stig opp frå ulla, i små flak over silhuetten.
        for x, y in [(20, 25), (28, 21), (34, 16), (35, 15), (41, 11), (47, 14), (14, 28), (53, 18), (38, 6)]:
            L.p(x, y, "S" if (x + y) % 3 else "s")
            L.p(x + 1, y - 1, "s")
        for x, y in [(75, 49), (76, 48), (77, 50), (78, 49)]: L.p(x, y, "s")    # pusten
    return L


GRIM = {"kyrkjegrimen": grim, "kyrkjegrimen-roleg": lambda: grim(roleg=True)}


def pix(namn, L):
    brukt = {c for r in L.g for c in r}
    ut = [f"# namn: fiende-{namn}", "# type: fiende", f"# ut: bilete/spel/{namn}.png", f"# storleik: {L.w}x{L.h}", "palett:"]
    ut += [f"  {t} = {f}    {m}".rstrip() for t, f, m in PAL if t in brukt or t == "."]
    ut.append("bilete:"); ut += ["  " + "".join(r) for r in L.g]
    return "\n".join(ut) + "\n"


if __name__ == "__main__":
    namn = sys.argv[1:]
    if not namn: print(__doc__); sys.exit(0)
    if namn == ["alle"]: namn = list(GRIM)
    for n in namn:
        sti = os.path.join(ROT, "kjelder", f"fiende-{n}.pix")
        open(sti, "w", encoding="utf-8").write(pix(n, GRIM[n]())); print(f"skreiv kjelder/fiende-{n}.pix")
