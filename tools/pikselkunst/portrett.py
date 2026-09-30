"""Portretta i samtaleboksen (48 x 48, vist tre gonger så stort), teikna person for person.

Etter Final Fantasy VI (Advance) og Fire Emblem på GBA (sjå ARBEIDSLOGG.md, runde 9):
- Kvar hovudperson har sin eigen silhuett: hårforma, hovudplagg, klede og eit kjenneteikn
  (fjørpenn bak øyret, pipekrage, flosshatt, blome i håret). Ikkje palettbyte av ei grunnform.
- Tre kvart mot høgre (mot teksten), byste med skuldrer. Andletet fyller mykje av ruta,
  og hår og hatt kan gå ut over kanten slik som i Final Fantasy VI.
- Farga omriss (den mørkaste tonen i kvart materiale), ikkje svart, som i Fire Emblem.
- Store, uttrykksfulle auge: tjukt øvre augelok, iris med lys piksel, augebryn som
  fortel kven personen er. Ljos framanfrå (frå høgre), skugge bak mot øyret og under haka.
- Om lag 16 til 24 fargar. Flater med tre til fem tonar, teikna som polygon for hand.

  python tools/pikselkunst/portrett.py alle          skriv kjelder/portrett-<namn>.pix
  python tools/pikselkunst/portrett.py ivar huldra   berre desse
  python tools/pikselkunst/portrett.py ark           kontaktark i forhand/portrett-ark.png

Kjelda er dette skriptet. .pix-filene blir skrivne på nytt kvar gong.
"""
import os, sys, math

ROT = os.path.dirname(os.path.abspath(__file__))
W = H = 48

# ---------------------------------------------------------------- fargar (mørk til lys)
RAMPER = {
    "hud":      ["#4a2028", "#8a4a3e", "#c27c5c", "#eaaa84", "#f9d4ae"],
    "hud_bror": ["#4a2224", "#86463a", "#b8704e", "#dc9c74", "#f0c69e"],
    "hud_barn": ["#522430", "#944e44", "#cc8466", "#f0b28e", "#fcdcbc"],
    "hud_gml":  ["#462430", "#80505a", "#b27c72", "#d8a68e", "#f0cab0"],
    "hud_blek": ["#3e2a3c", "#7a5a6a", "#b4949a", "#dcbcb8", "#f6e0d8"],
    "hud_huld": ["#5a2a34", "#9a5c56", "#d4967a", "#f4c8a4", "#fee8d0"],
    "hud_vette":["#18241e", "#34483e", "#587462", "#809c84", "#adc4a8"],
    "har_ivar": ["#160c0e", "#34201a", "#583824", "#80542e", "#a87844"],
    "har_bror": ["#34200e", "#664424", "#976c3a", "#c29854", "#e4c47c"],
    "har_huld": ["#4a2a0e", "#8c5a18", "#c89030", "#ecc24e", "#fce690"],
    "har_svart":["#06040c", "#121020", "#221e36", "#383452", "#56527a"],
    "har_kvit": ["#302a3e", "#5e5870", "#9a96aa", "#cac8d6", "#f2f0f8"],
    "har_syst": ["#241210", "#4a2a1c", "#74462a", "#9c6a3e", "#c49058"],
    "blaa":     ["#10142a", "#1e2848", "#304470", "#48669e", "#6e90c8"],
    "brun":     ["#1e120a", "#3a2414", "#5c3a20", "#80562e", "#a67a46"],
    "lin":      ["#4a4452", "#8a8494", "#bcb6bc", "#dcd6d2", "#f6f2ea"],
    "svart":    ["#06040a", "#120e1a", "#201a2c", "#342c44", "#4e4462"],
    "graa":     ["#1c1a24", "#34323e", "#52505e", "#74727e", "#9a98a2"],
    "gronn":    ["#0e2016", "#1c3a24", "#2e5a36", "#44804a", "#6caa64"],
    "raud":     ["#2a0a12", "#561624", "#8a2a36", "#b8484a", "#dc7a6c"],
    "skaut_b":  ["#0e1636", "#1a2a5c", "#2a4288", "#4462ae", "#6c8ad0"],
    "mose":     ["#141e10", "#2a3a1e", "#44582c", "#62783c", "#8a9c52"],
    "gull":     ["#4a2c08", "#8a5a14", "#c89028", "#f0c040", "#fce888"],
    "kvit":     ["#6a6478", "#9a96a8", "#c8c6d2", "#e6e4ec", "#fcfcff"],
    "auge":     ["#0c0810", "#2a2030", "#56506a", "#f2f0f4", "#ffffff"],
    "iris_b":   ["#10182e", "#1e3058", "#3a5a96", "#6a90cc", "#a8c8f0"],
    "iris_br":  ["#140a08", "#2e1a12", "#5a3620", "#8a5c34", "#b8864e"],
    "iris_g":   ["#0a1a10", "#16362a", "#2a6048", "#4a9068", "#8ac890"],
    "iris_v":   ["#1a2822", "#3a5a4a", "#9adcc0", "#d8fff0", "#ffffff"],
    "munn":     ["#3a1418", "#6a2a2c", "#a04a48", "#c87068", "#e89a8a"],
    "tre":      ["#1a0e08", "#3a2212", "#6a4424", "#9a6c3a", "#c89a5a"],
    "blom":     ["#5a1a3a", "#a03a6a", "#e070a0", "#f8b0cc", "#ffffff"],
    "kinn":     ["#6a2a34", "#a84a4e", "#e08a7e", "#f2a896", "#fcc8b4"],
    "glas":     ["#2a2a3e", "#6a7a9a", "#b0c4e0", "#e4f0ff", "#ffffff"],
}


class Portrett:
    def __init__(s):
        s.g = [[None] * W for _ in range(H)]

    def p(s, x, y, c):
        x, y = int(round(x)), int(round(y))
        if 0 <= x < W and 0 <= y < H: s.g[y][x] = c

    def get(s, x, y): return s.g[y][x] if 0 <= x < W and 0 <= y < H else None

    def poly(s, pts, c, berre=None):
        """Fyll eit polygon (scanline). berre: fyll berre pikslar som alt er dette materialet."""
        ys = [p[1] for p in pts]
        for y in range(max(0, int(min(ys))), min(H, int(max(ys)) + 1)):
            xs = []
            for i in range(len(pts)):
                (x0, y0), (x1, y1) = pts[i], pts[(i + 1) % len(pts)]
                if (y0 <= y + 0.5 < y1) or (y1 <= y + 0.5 < y0):
                    xs.append(x0 + (y + 0.5 - y0) * (x1 - x0) / (y1 - y0))
            xs.sort()
            for a, b in zip(xs[::2], xs[1::2]):
                for x in range(int(math.ceil(a - 0.5)), int(math.floor(b - 0.5)) + 1):
                    if berre is None or (s.get(x, y) and s.get(x, y)[0] == berre): s.p(x, y, c)

    def linje(s, pts, c, berre=None):
        for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
            n = max(abs(x1 - x0), abs(y1 - y0), 1)
            for k in range(int(n) + 1):
                x, y = x0 + (x1 - x0) * k / n, y0 + (y1 - y0) * k / n
                if berre is None or (s.get(round(x), round(y)) and s.get(round(x), round(y))[0] == berre): s.p(x, y, c)

    def rute(s, x0, y0, rader, farge):
        """Lim inn eit lite handteikna rutenett. farge: teikn -> (materiale, tone)."""
        for dy, rad in enumerate(rader):
            for dx, t in enumerate(rad):
                if t != "." and t in farge: s.p(x0 + dx, y0 + dy, farge[t])

    def omriss(s):
        """Farga omriss som i Fire Emblem: den mørkaste tonen i materialet ved sida av."""
        ut = [r[:] for r in s.g]
        for y in range(H):
            for x in range(W):
                if s.g[y][x] is not None: continue
                nb = [s.get(x + dx, y + dy) for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))]
                nb = [n for n in nb if n is not None and n[1] != 0]
                if nb: ut[y][x] = (nb[0][0], 0)
        s.g = ut


# ---------------------------------------------------------------- felles delar
def auge_far(P, x, y, iris, stil="open"):
    """Det fjerne auget (nær nasen), smalt. x, y: øvre venstre hjørne."""
    f = {"L": ("auge", 0), "w": ("auge", 3), "i": (iris, 1), "I": (iris, 3), "h": ("auge", 4), "k": (iris, 2)}
    if stil == "attlatne": P.rute(x, y + 1, [".LL.", "L..L"], f); return
    if stil == "smal": P.rute(x, y, ["LLLL", "LhiL", ".ki."], f); return
    P.rute(x, y, [".LLL", "LhiL", "wkI.", ".ii."], f)


def auge_naer(P, x, y, iris, stil="open"):
    """Det nære auget, breiare, med tjukt augelok og lys piksel i iris. Blikket mot høgre."""
    f = {"L": ("auge", 0), "l": ("auge", 1), "w": ("auge", 3), "i": (iris, 1), "I": (iris, 3),
         "h": ("auge", 4), "k": (iris, 2)}
    rader = {
        "open":     [".LLLLLL.", "LwwhiiL.", ".wwkIiw.", "..llll.."],
        "stor":     [".LLLLLL.", "LwwhiiwL", "LwwiIIw.", ".wwkIIw.", "..llll.."],
        "smal":     ["LLLLLLLL", ".LwhiiL.", "..wkIw..", "...ll..."],
        "mild":     ["..LLLL..", ".LwhiiL.", "LwwkIiw.", "..llll.."],
        "attlatne": [".LLLLL..", "L.....L.", ".l...l.."],
        "vid":      [".LLLLLL.", "LwwhiiwL", "LwwiIIwL", ".wwwwww.", "..llll.."],
    }[stil]
    P.rute(x, y, rader, f)


def nase(P, hud, x, y, lengd=6):
    """Nase i tre kvart mot høgre: lys rygg, spiss som stikk ut, skugge og nasebor under."""
    P.poly([(x - 1, y), (x, y), (x + 1, y + lengd - 1), (x - 1, y + lengd)], (hud, 3))
    P.linje([(x - 1, y), (x - 1, y + lengd - 2)], (hud, 4))
    P.linje([(x - 2, y + lengd), (x, y + lengd)], (hud, 1))
    P.p(x - 3, y + lengd - 1, (hud, 2))


# ---------------------------------------------------------------- personane
def ivar(P):
    """Ivar, 13 år: gardsgut med blikk for ord. Mørkt, ustyrleg hår med ein virvel, lang
    lugg som fell over det eine auget, fregner, merksemd i blikket (han høyrer etter),
    ein fjørpenn stukken bak øyret, blå vadmålstrøye med sekkeband over skuldra."""
    hud, har, kle = "hud_barn", "har_ivar", "blaa"
    # skuldrer og trøye (smale, gutekropp)
    P.poly([(6, 48), (8, 41), (14, 37), (21, 36), (30, 37), (37, 40), (42, 48)], (kle, 3))
    P.poly([(6, 48), (8, 41), (14, 37), (17, 37), (15, 42), (13, 48)], (kle, 2))
    P.poly([(33, 38), (37, 40), (42, 48), (36, 48)], (kle, 4))
    P.linje([(14, 40), (18, 48)], (kle, 1)); P.linje([(29, 39), (27, 48)], (kle, 2))
    # kvit linskjorte i halsopninga
    P.poly([(18, 36), (27, 36), (25, 42), (22, 44), (19, 41)], ("lin", 3))
    P.linje([(22, 38), (22, 44)], ("lin", 1))
    # sekkeband (lær) over venstre skulder
    P.poly([(9, 40), (12, 38), (20, 48), (16, 48)], ("tre", 2)); P.linje([(12, 38), (20, 48)], ("tre", 3))
    # hals
    P.poly([(17, 29), (26, 30), (26, 37), (18, 37)], (hud, 2))
    P.poly([(22, 31), (26, 30), (26, 36), (23, 36)], (hud, 3))
    # andletet: tre kvart mot høgre, rundt barneandlet
    P.poly([(12, 13), (16, 8), (24, 6), (32, 8), (35, 13), (36, 18), (35, 21), (36, 25), (35, 26),
            (35, 28), (33, 31), (29, 33), (24, 34), (19, 32), (15, 28), (12, 23), (11, 17)], (hud, 3))
    # skugge bak (mot øyret) og under kinnbeinet
    P.poly([(11, 17), (15, 16), (17, 22), (18, 28), (21, 33), (15, 28), (12, 23)], (hud, 2))
    P.poly([(24, 34), (29, 33), (33, 31), (29, 32), (25, 33)], (hud, 2))
    # lys på kinnet og nasen
    P.poly([(28, 24), (31, 23), (32, 25), (29, 26)], (hud, 4))
    nase(P, hud, 35, 20)
    # øyre
    P.poly([(12, 19), (15, 18), (16, 22), (15, 25), (12, 24)], (hud, 2)); P.linje([(13, 20), (13, 23)], (hud, 1))
    # auge: merksame, blikket litt opp mot høgre
    auge_naer(P, 20, 17, "iris_br", "stor")
    auge_far(P, 30, 18, "iris_br")
    # augebryn: litt løfta, nysgjerrig
    P.linje([(20, 15), (23, 14), (27, 14)], (har, 1)); P.linje([(30, 15), (33, 14)], (har, 1))
    # munn: lukka, eit lite, spørjande drag
    P.linje([(29, 29), (32, 28)], ("munn", 2)); P.p(33, 28, ("munn", 1))
    # fregner
    for (x, y) in [(26, 24), (28, 25), (30, 24), (32, 25), (24, 25)]: P.p(x, y, (hud, 2))
    # håret: mørkt og ustyrleg, virvel øvst, lugg som fell ned over høgre auge
    P.poly([(8, 16), (9, 9), (14, 3), (22, 0), (31, 1), (37, 5), (39, 11), (37, 15), (33, 13),
            (30, 16), (27, 13), (24, 17), (21, 14), (17, 16), (14, 21), (12, 24), (10, 22)], (har, 2))
    P.poly([(14, 4), (22, 1), (30, 2), (27, 5), (20, 5), (15, 8)], (har, 3))          # lyst band
    P.poly([(18, 3), (25, 1), (23, 3)], (har, 4))
    P.poly([(33, 13), (37, 15), (38, 19), (36, 17), (35, 20)], (har, 2))               # lugg over kanten
    P.poly([(24, 17), (27, 13), (30, 16), (31, 20), (28, 16)], (har, 2))              # lugg ned mot auget
    P.linje([(20, 5), (15, 12), (13, 18)], (har, 1)); P.linje([(28, 6), (26, 12)], (har, 1))
    P.linje([(33, 4), (35, 9)], (har, 1))
    P.poly([(22, 0), (24, -3), (26, 0)], (har, 2)); P.poly([(27, 1), (31, -2), (30, 2)], (har, 2))   # virvel
    P.poly([(8, 16), (10, 22), (12, 24), (9, 25), (7, 20)], (har, 1))                 # nakkehår
    for (x0, x1, y1) in [(14, 18, 19), (18, 22, 16), (21, 25, 17), (29, 32, 19), (32, 35, 16)]:   # tjafsar i luggen
        P.poly([(x0, 12), (x1, 12), ((x0 + x1) / 2 + 1, y1)], (har, 2))
    for pts in [[(17, 6), (13, 13)], [(25, 4), (23, 10)], [(31, 5), (33, 10)], [(21, 8), (19, 13)]]:
        P.linje(pts, (har, 3))
    P.linje([(22, 2), (18, 7)], (har, 4))
    # fjørpenn bak øyret: kvit fjør som stikk opp bak hovudet
    P.linje([(12, 25), (6, 10)], ("kvit", 2))
    P.poly([(6, 10), (4, 4), (6, 1), (8, 6), (9, 14)], ("kvit", 3))
    P.linje([(6, 2), (7, 12)], ("kvit", 4)); P.linje([(5, 5), (6, 11)], ("kvit", 1))


def storebror(P):
    """Storebror, om lag 20: har teke over garden etter far. Breitt, kantete andlet, sterk
    kjeve med skjeggstubb, stuttklypt sandfarga hår, trøytte og alvorlege auge under tunge
    bryn, open linskjorte med oppbretta ermar og brun vest. Står rakare, hovudet litt ned."""
    hud, har, kle = "hud_bror", "har_bror", "brun"
    P.poly([(0, 48), (2, 40), (10, 35), (22, 34), (34, 35), (44, 39), (48, 44), (48, 48)], ("lin", 3))
    P.poly([(0, 48), (2, 40), (10, 35), (13, 36), (9, 48)], ("lin", 2))
    P.poly([(3, 48), (5, 41), (12, 37), (17, 39), (16, 48)], (kle, 3))                  # vest
    P.poly([(31, 38), (38, 37), (45, 42), (46, 48), (33, 48)], (kle, 3))
    P.poly([(31, 38), (34, 38), (35, 48), (33, 48)], (kle, 4))
    P.poly([(18, 36), (29, 36), (27, 44), (23, 46), (19, 43)], (hud, 2))                # open skjorte, bringe
    P.linje([(17, 36), (23, 46), (29, 36)], ("lin", 1))
    # tjukk hals
    P.poly([(15, 26), (28, 27), (29, 37), (16, 37)], (hud, 2))
    P.poly([(23, 28), (28, 27), (29, 36), (25, 36)], (hud, 3))
    # breitt, kantete andlet
    P.poly([(11, 11), (15, 6), (24, 4), (33, 6), (36, 11), (37, 17), (36, 20), (38, 24), (36, 25),
            (36, 28), (35, 31), (32, 33), (26, 34), (19, 32), (14, 27), (11, 21), (10, 15)], (hud, 3))
    P.poly([(10, 15), (15, 15), (17, 22), (19, 32), (14, 27), (11, 21)], (hud, 2))
    P.poly([(19, 32), (26, 34), (32, 33), (35, 31), (33, 29), (29, 31), (24, 31), (20, 29)], (hud, 2))  # skjeggstubb
    for (x, y) in [(22, 30), (25, 32), (28, 31), (31, 32), (33, 30), (27, 33), (23, 32)]: P.p(x, y, (hud, 1))
    P.poly([(29, 23), (32, 22), (33, 24), (30, 25)], (hud, 4))
    nase(P, hud, 36, 19, 6)
    P.poly([(11, 18), (14, 17), (15, 21), (14, 24), (11, 23)], (hud, 2)); P.linje([(12, 19), (12, 22)], (hud, 1))
    # auge: smale, trøytte, under tunge bryn
    auge_naer(P, 21, 18, "iris_b", "smal")
    auge_far(P, 32, 18, "iris_b")
    P.poly([(20, 16), (24, 15), (28, 16), (28, 17), (20, 17)], (har, 1))              # tunge, rette bryn
    P.poly([(31, 16), (35, 15), (35, 16), (31, 17)], (har, 1))
    P.linje([(22, 21), (26, 22)], (hud, 2))                                           # poser under auga
    # munn: rett og alvorleg
    P.linje([(28, 28), (33, 28)], ("munn", 1)); P.p(34, 29, ("munn", 1))
    # stuttklypt hår: tett til hovudet, rett lugg
    P.poly([(10, 14), (11, 7), (17, 2), (26, 1), (34, 3), (38, 8), (38, 13), (35, 12), (32, 10),
            (27, 11), (20, 11), (15, 13), (13, 18), (11, 20)], (har, 2))
    P.poly([(14, 5), (22, 2), (30, 3), (24, 6), (17, 8)], (har, 3))
    P.poly([(19, 3), (26, 2), (22, 4)], (har, 4))
    for x in range(15, 36, 3): P.linje([(x, 10), (x + 1, 7)], (har, 1))
    # eit strå frå låven i munnviken
    P.linje([(33, 28), (41, 25)], ("gull", 3)); P.p(42, 24, ("gull", 4))


def huldra(P):
    """Huldra: vakker og framand. Langt gullhår som flyt ut over kanten og ned over skuldra,
    krans av blomar og lauv, lure grøne auge med lange vipper, eit lite smil i munnviken,
    grøn kjole over kvit særk."""
    hud, har = "hud_huld", "har_huld"
    # håret bak: ein stor, bylgjande masse som går ut av ruta til venstre og nedover
    P.poly([(2, 48), (0, 30), (2, 16), (7, 6), (15, 1), (26, 0), (34, 3), (38, 9), (38, 16), (34, 20),
            (30, 30), (22, 40), (16, 48)], (har, 2))
    P.poly([(0, 30), (2, 16), (5, 12), (6, 24), (4, 36), (5, 48), (2, 48)], (har, 1))
    for x0 in (3, 8):                                                             # lokkar bak
        P.linje([(x0 + 3, 12), (x0, 24), (x0 + 2, 34), (x0, 46)], (har, 3))
    # kjole og særk
    P.poly([(10, 48), (13, 41), (20, 38), (30, 38), (38, 41), (44, 48)], ("gronn", 3))
    P.poly([(10, 48), (13, 41), (18, 39), (17, 48)], ("gronn", 2))
    P.poly([(34, 40), (38, 41), (44, 48), (39, 48)], ("gronn", 4))
    P.poly([(17, 39), (33, 39), (31, 43), (19, 43)], ("lin", 4))                   # særken
    P.linje([(18, 43), (32, 43)], ("gull", 3))                                    # gullborde
    for x in range(19, 32, 3): P.p(x, 42, ("lin", 2))
    # hals, smal
    P.poly([(20, 29), (27, 30), (28, 39), (21, 39)], (hud, 2))
    P.poly([(24, 31), (27, 30), (28, 38), (25, 38)], (hud, 3))
    # andletet: smalt, spiss haka
    P.poly([(14, 12), (18, 7), (26, 5), (33, 7), (36, 12), (37, 17), (36, 20), (37, 24), (36, 25),
            (36, 27), (34, 30), (30, 33), (26, 34), (21, 32), (17, 27), (14, 22), (13, 17)], (hud, 3))
    P.poly([(13, 17), (16, 16), (18, 23), (21, 32), (17, 27), (14, 22)], (hud, 2))
    P.poly([(28, 23), (31, 22), (32, 24), (29, 25)], (hud, 4))
    P.linje([(28, 26), (31, 26)], ("kinn", 3))                                     # raudme i kinnet
    nase(P, hud, 36, 19, 5)
    # lure auge med vipper
    f = {"L": ("auge", 0), "l": ("auge", 1), "w": ("auge", 3), "i": ("iris_g", 1), "I": ("iris_g", 3),
         "h": ("auge", 4), "k": ("iris_g", 2)}
    P.rute(19, 17, ["..LLLLLL", "LLLwhiiL", "..wwkIw.", "...lll.."], f)
    P.rute(31, 17, ["LLLL.", "LhiLL", ".kI.."], f)
    P.linje([(21, 15), (24, 13), (28, 14)], (har, 1)); P.linje([(31, 14), (34, 14)], (har, 1))
    # smil
    P.linje([(28, 29), (31, 29)], ("munn", 2)); P.p(32, 28, ("munn", 2)); P.linje([(29, 30), (31, 30)], ("munn", 4))
    # håret framme: skil og lokkar som rammar inn andletet
    P.poly([(12, 18), (13, 10), (18, 5), (26, 3), (34, 6), (38, 12), (37, 16), (34, 11), (29, 8),
            (24, 9), (19, 12), (16, 18), (15, 26), (13, 30)], (har, 2))
    P.poly([(16, 6), (24, 3), (31, 4), (26, 6), (19, 8)], (har, 3))
    P.poly([(21, 4), (27, 3), (24, 5)], (har, 4))
    P.poly([(15, 20), (17, 16), (18, 26), (20, 34), (22, 40), (20, 46), (16, 40), (14, 30)], (har, 2))  # lokk framom øyret
    P.linje([(17, 20), (18, 30), (20, 38)], (har, 3)); P.linje([(15, 24), (16, 34)], (har, 1))
    P.poly([(34, 11), (38, 12), (39, 22), (37, 18), (36, 14)], (har, 2))          # lokk bak det fjerne kinnet
    # blomekrans med lauv
    for (x, y) in [(13, 9), (18, 5), (24, 3), (30, 4), (35, 7)]:
        P.poly([(x - 1, y + 1), (x - 3, y - 1), (x - 1, y - 1)], ("gronn", 3))
    for k, (x, y) in enumerate([(15, 7), (21, 4), (27, 3), (33, 5), (37, 9)]):
        c = "blom" if k % 2 == 0 else "kvit"
        for dx, dy in [(0, -1), (-1, 0), (1, 0), (0, 1)]: P.p(x + dx, y + dy, (c, 3))
        P.p(x - 1, y - 1, (c, 4)); P.p(x, y, ("gull", 3))


def framande(P):
    """Den framande: embetsmann frå byen, spegelfiguren. Høg flosshatt som går ut av ruta,
    runde briller der glaset blenkjer og gøymer det eine auget, bleikt, kantete andlet med
    innsokne kinn, tynt smil, stiv kvit krage med svart halsbind og gullnål."""
    hud, har = "hud_blek", "har_svart"
    P.poly([(2, 48), (5, 40), (14, 36), (22, 36), (32, 36), (42, 40), (46, 48)], ("svart", 3))
    P.poly([(2, 48), (5, 40), (14, 36), (16, 48)], ("svart", 2))
    P.poly([(14, 37), (20, 38), (18, 48), (12, 48)], ("svart", 4))                  # slag på frakken
    P.poly([(30, 38), (36, 37), (38, 48), (32, 48)], ("svart", 4))
    P.poly([(18, 34), (23, 38), (22, 44), (20, 44)], ("kvit", 3))                   # kragesnippar
    P.poly([(30, 34), (25, 38), (27, 44), (29, 44)], ("kvit", 2))
    P.poly([(21, 38), (27, 38), (26, 44), (22, 44)], ("svart", 1))                  # halsbind
    P.p(24, 40, ("gull", 4)); P.p(24, 41, ("gull", 2))
    P.poly([(19, 30), (28, 31), (28, 37), (20, 37)], (hud, 2))
    # langt, kantete andlet
    P.poly([(15, 12), (33, 11), (36, 15), (36, 20), (37, 24), (36, 25), (36, 28), (34, 31),
            (31, 34), (27, 36), (22, 34), (18, 29), (15, 23), (14, 16)], (hud, 3))
    P.poly([(14, 16), (17, 15), (19, 23), (22, 34), (18, 29), (15, 23)], (hud, 2))
    P.linje([(28, 27), (31, 28)], (hud, 2))                                        # innsokne kinn
    P.linje([(27, 25), (32, 24)], (hud, 4))                                        # skarpt kinnbein
    nase(P, hud, 36, 18, 7)
    # briller: det nære glaset blenkjer, det fjerne auget er smalt og kaldt
    P.poly([(19, 17), (26, 17), (27, 21), (25, 23), (20, 23), (18, 21)], ("glas", 3))
    P.poly([(20, 18), (23, 18), (19, 22)], ("glas", 4))
    P.linje([(19, 17), (26, 17)], ("svart", 1)); P.linje([(18, 21), (20, 23), (25, 23), (27, 21)], ("svart", 1))
    P.linje([(27, 19), (30, 19)], ("svart", 1))
    P.rute(30, 18, ["LLLL", "LhiL", ".ki."], {"L": ("auge", 0), "h": ("auge", 4), "i": ("iris_b", 1), "k": ("iris_b", 2)})
    P.linje([(30, 17), (34, 17)], ("glas", 2)); P.linje([(34, 17), (34, 21)], ("glas", 2))
    P.linje([(19, 15), (23, 14), (27, 15)], (har, 2)); P.linje([(30, 15), (34, 16)], (har, 2))   # skråe bryn
    # tynt smil som går opp i den eine munnviken
    P.linje([(27, 30), (30, 31), (33, 30)], ("munn", 1)); P.p(34, 29, ("munn", 1))
    # svart, rett hår under hatten
    P.poly([(12, 11), (19, 11), (17, 18), (16, 28), (14, 31), (12, 24)], (har, 2))
    P.linje([(15, 13), (14, 26)], (har, 3))
    P.poly([(33, 11), (37, 11), (37, 18), (35, 14)], (har, 2))
    # flosshatten: brem og høg pipe som går ut av ruta
    P.poly([(13, 0), (35, 0), (34, 9), (14, 9)], ("svart", 2))
    P.poly([(16, 0), (21, 0), (20, 9), (16, 9)], ("svart", 3))
    P.linje([(17, 0), (17, 8)], ("svart", 4))
    P.poly([(14, 6), (34, 6), (34, 9), (14, 9)], ("raud", 1))                       # hattband
    P.poly([(7, 10), (12, 9), (36, 9), (41, 10), (38, 13), (10, 13)], ("svart", 2))
    P.linje([(9, 10), (38, 10)], ("svart", 4))


def presten(P):
    """Presten: dansk-utdanna embetsmann i femtiåra. Høg panne med kvitt hår strøke bakover,
    tunge, buskute bryn, lang rett nase, smal munn med djupe furer, og ein stor, kvit
    pipekrage over den svarte prestekjolen."""
    hud, har = "hud_gml", "har_kvit"
    P.poly([(0, 48), (3, 43), (12, 40), (36, 40), (46, 44), (48, 48)], ("svart", 3))
    P.poly([(0, 48), (3, 43), (12, 40), (14, 48)], ("svart", 2))
    # pipekrage: rund, i fleire lag med foldar
    P.poly([(8, 42), (10, 36), (16, 32), (24, 31), (33, 32), (39, 36), (41, 42), (34, 45), (24, 46), (14, 45)], ("kvit", 3))
    for k in range(10, 40, 3):
        P.linje([(k, 38 + abs(k - 24) // 8), (k + 1, 44 - abs(k - 24) // 6)], ("kvit", 1))
        P.linje([(k + 1, 37 + abs(k - 24) // 8), (k + 2, 43 - abs(k - 24) // 6)], ("kvit", 4))
    P.linje([(10, 41), (24, 45), (39, 41)], ("kvit", 2))
    P.poly([(19, 28), (29, 29), (29, 34), (20, 34)], (hud, 2))
    # langt andlet med tunge kjakar
    P.poly([(14, 11), (18, 5), (27, 3), (34, 6), (37, 11), (37, 17), (36, 20), (38, 25), (36, 26),
            (36, 29), (34, 32), (30, 35), (24, 35), (19, 32), (15, 26), (13, 19)], (hud, 3))
    P.poly([(13, 19), (16, 17), (18, 24), (20, 31), (24, 35), (19, 32), (15, 26)], (hud, 2))
    P.poly([(30, 5), (34, 7), (35, 11), (31, 9)], (hud, 4))                        # blank panne
    P.linje([(31, 26), (29, 29), (30, 32)], (hud, 1))                              # djup fure
    P.linje([(21, 22), (25, 23)], (hud, 2)); P.linje([(22, 27), (24, 30)], (hud, 2))
    nase(P, hud, 37, 17, 8)
    auge_naer(P, 21, 18, "iris_b", "smal")
    auge_far(P, 32, 18, "iris_b", "smal")
    P.poly([(19, 16), (23, 14), (28, 15), (28, 17), (22, 17)], (har, 3))             # buskute bryn
    P.poly([(31, 16), (35, 15), (36, 16), (31, 17)], (har, 3))
    P.linje([(20, 15), (27, 16)], (har, 1))
    P.linje([(29, 31), (34, 31)], ("munn", 1)); P.p(34, 32, ("munn", 1)); P.p(28, 32, ("munn", 1))  # nedoversnudd munn
    P.poly([(12, 20), (15, 19), (16, 24), (13, 25)], (hud, 2))
    # kvitt hår, strøke bakover, berre på sidene og bak
    P.poly([(11, 22), (11, 12), (15, 6), (21, 4), (18, 8), (16, 14), (16, 20), (14, 27)], (har, 3))
    P.poly([(15, 6), (22, 3), (19, 6)], (har, 4))
    P.linje([(13, 10), (12, 22)], (har, 2)); P.linje([(15, 9), (14, 20)], (har, 4))


def haugbonden(P):
    """Haugbonden: den gamle vetten i gravhaugen. Grågrøn hud, stor mosegrodd hatt som skuggar
    over auga, bleike, lysande auge, svær nase, djupe rynker og eit langt, kvitt skjegg med
    røter og lav."""
    hud, har = "hud_vette", "har_kvit"
    P.poly([(0, 48), (2, 40), (10, 35), (38, 35), (46, 40), (48, 48)], ("graa", 2))
    P.poly([(0, 48), (2, 40), (10, 35), (12, 48)], ("graa", 1))
    # andletet, breitt og gamalt
    P.poly([(11, 12), (37, 12), (39, 18), (38, 22), (41, 27), (38, 28), (37, 31), (33, 34), (24, 35),
            (17, 32), (12, 25), (10, 18)], (hud, 3))
    P.poly([(10, 18), (14, 15), (17, 24), (17, 32), (12, 25)], (hud, 2))
    P.poly([(11, 12), (38, 12), (37, 18), (12, 18)], (hud, 1))                    # skugge under bremmen
    nase(P, hud, 38, 18, 9)
    P.poly([(35, 20), (38, 21), (39, 26), (36, 26)], (hud, 4))
    for (a, b) in [((20, 22), (25, 23)), ((30, 22), (33, 23)), ((14, 20), (16, 26))]:
        P.linje([a, b], (hud, 1))
    # lysande auge i skuggen
    for (x, y, w) in [(20, 16, 5), (31, 16, 3)]:
        P.linje([(x, y), (x + w - 1, y)], ("iris_v", 2)); P.p(x + w // 2, y, ("iris_v", 4))
        P.linje([(x, y - 1), (x + w - 1, y - 1)], ("iris_v", 1))
    # langt, kvitt skjegg med røter
    P.poly([(14, 26), (18, 30), (24, 30), (30, 31), (36, 29), (39, 30), (40, 38), (36, 46), (30, 48),
            (18, 48), (14, 42), (12, 34)], (har, 3))
    P.poly([(14, 26), (18, 30), (17, 44), (18, 48), (14, 42), (12, 34)], (har, 2))
    P.poly([(31, 27), (36, 26), (38, 28), (33, 30), (28, 30)], (har, 3))            # bart
    for x in range(16, 38, 4): P.linje([(x, 32), (x + 1, 46)], (har, 2))
    for x in range(18, 38, 4): P.linje([(x, 33), (x - 1, 44)], (har, 4))
    for (x, y) in [(20, 40), (31, 38), (25, 45)]:                                    # røter og lav
        P.linje([(x, y), (x + 2, y + 3), (x + 1, y + 6)], ("tre", 2)); P.p(x - 1, y, ("mose", 3))
    # mosegrodd hatt med vid brem
    P.poly([(14, 0), (34, 0), (35, 9), (13, 9)], ("mose", 2))
    P.poly([(16, 0), (22, 0), (21, 9), (15, 9)], ("mose", 3))
    P.poly([(2, 12), (10, 8), (38, 8), (46, 12), (40, 14), (8, 14)], ("mose", 2))
    P.linje([(4, 11), (44, 11)], ("mose", 4))
    for x in range(6, 44, 5): P.p(x, 13, ("mose", 1)); P.p(x + 2, 9, ("mose", 4))
    P.p(26, 4, ("blom", 3)); P.p(27, 3, ("kvit", 4))                               # ein liten blome i mosen


def syster(P):
    """Syster, om lag ti år: rundt andlet, store auge, raude kinn, blått skaut knytt under haka
    med brune hårlokkar framom, og eit breitt smil med glugg i tanngarden."""
    hud, har = "hud_barn", "har_syst"
    P.poly([(8, 48), (11, 42), (18, 39), (30, 39), (37, 42), (40, 48)], ("raud", 3))
    P.poly([(8, 48), (11, 42), (16, 40), (15, 48)], ("raud", 2))
    P.poly([(17, 39), (31, 39), (29, 44), (19, 44)], ("lin", 4))
    for y in range(40, 48, 2): P.p(23, y, ("raud", 1)); P.p(25, y + 1, ("raud", 1))   # snøring
    P.poly([(19, 32), (28, 33), (28, 39), (20, 39)], (hud, 2))
    # rundt andlet
    P.poly([(14, 15), (18, 10), (26, 9), (33, 11), (36, 16), (36, 21), (37, 25), (36, 26), (36, 28),
            (34, 32), (29, 35), (23, 35), (18, 32), (15, 27), (13, 21)], (hud, 3))
    P.poly([(13, 21), (16, 20), (18, 27), (23, 35), (18, 32), (15, 27)], (hud, 2))
    P.poly([(27, 27), (30, 26), (31, 27), (28, 28)], ("kinn", 3))                  # raude kinn
    nase(P, hud, 36, 22, 4)
    auge_naer(P, 20, 19, "iris_br", "stor")
    auge_far(P, 30, 20, "iris_br")
    P.linje([(21, 17), (25, 16)], (har, 2)); P.linje([(30, 18), (33, 17)], (har, 2))
    # ope smil med glugg
    P.poly([(28, 30), (34, 29), (33, 32), (29, 32)], ("munn", 1))
    P.linje([(29, 30), (33, 30)], ("kvit", 4)); P.p(31, 30, ("munn", 1))
    # skautet: knytt under haka, hårlokkar i panna
    P.poly([(10, 22), (11, 12), (16, 6), (25, 4), (33, 6), (38, 11), (39, 18), (37, 20), (35, 14),
            (29, 12), (22, 12), (16, 15), (14, 24), (15, 32), (12, 32)], ("skaut_b", 3))
    P.poly([(10, 22), (11, 12), (16, 6), (14, 14), (13, 26), (12, 32)], ("skaut_b", 2))
    P.poly([(16, 7), (24, 5), (30, 6), (24, 8)], ("skaut_b", 4))
    for (x, y) in [(18, 8), (26, 7), (32, 9), (13, 18), (22, 10)]: P.p(x, y, ("kvit", 4))   # kvite prikkar
    P.poly([(16, 15), (22, 12), (29, 12), (33, 15), (28, 14), (22, 15), (18, 18)], (har, 3))
    P.poly([(24, 35), (30, 35), (28, 39), (26, 40)], ("skaut_b", 3))                # knuten
    P.poly([(26, 38), (22, 43), (25, 42)], ("skaut_b", 2)); P.poly([(28, 38), (31, 43), (29, 42)], ("skaut_b", 4))


def granne(P):
    """Grannen: gamal og godlynt. Skalla med kvitt hår i ein krans, tjukt kvitt skjegg,
    knipne auge som smiler, raud nase, pipe i munnviken med røyk som stig opp."""
    hud, har = "hud_gml", "har_kvit"
    P.poly([(2, 48), (5, 41), (14, 37), (34, 37), (43, 41), (46, 48)], ("graa", 3))
    P.poly([(2, 48), (5, 41), (14, 37), (15, 48)], ("graa", 2))
    P.poly([(20, 30), (28, 31), (28, 37), (21, 37)], (hud, 2))
    P.poly([(13, 13), (17, 6), (26, 4), (33, 6), (37, 12), (37, 18), (36, 21), (38, 25), (36, 26),
            (36, 29), (33, 33), (27, 35), (20, 33), (16, 28), (13, 21)], (hud, 3))
    P.poly([(13, 21), (16, 19), (18, 26), (20, 33), (16, 28)], (hud, 2))
    P.poly([(23, 5), (30, 5), (33, 9), (26, 8)], (hud, 4))                          # blank skalle
    nase(P, hud, 37, 19, 6)
    P.poly([(35, 22), (38, 23), (38, 25), (35, 25)], ("munn", 3))                   # raud nase
    auge_naer(P, 21, 19, "iris_b", "attlatne")
    auge_far(P, 31, 19, "iris_b", "attlatne")
    P.linje([(19, 21), (20, 23)], (hud, 2)); P.linje([(34, 22), (35, 23)], (hud, 2))   # smilerynker
    P.poly([(19, 15), (23, 14), (27, 15), (23, 16)], (har, 3)); P.poly([(30, 15), (34, 15), (32, 16)], (har, 3))
    # kvitt skjegg og bart
    P.poly([(17, 27), (22, 28), (29, 29), (35, 27), (38, 29), (37, 35), (32, 40), (24, 41), (18, 37), (15, 31)], (har, 3))
    P.poly([(17, 27), (20, 30), (20, 38), (18, 37), (15, 31)], (har, 2))
    for x in range(20, 36, 3): P.linje([(x, 31), (x, 38)], (har, 4))
    # pipa: kritpipe med røyk
    P.linje([(33, 30), (40, 32)], ("kvit", 3)); P.poly([(40, 29), (43, 29), (43, 33), (40, 33)], ("tre", 2))
    P.p(41, 30, ("raud", 4))
    for (x, y) in [(42, 26), (43, 24), (42, 21), (43, 18)]: P.p(x, y, ("kvit", 2)); P.p(x + 1, y - 1, ("kvit", 1))
    # kvit hårkrans
    P.poly([(11, 22), (11, 14), (14, 10), (16, 14), (15, 22), (14, 28)], (har, 3))
    P.linje([(12, 14), (12, 22)], (har, 4)); P.linje([(14, 12), (14, 24)], (har, 2))
    P.poly([(36, 12), (39, 13), (38, 19), (36, 16)], (har, 3))


def budeia(P):
    """Budeia: sterk og blid, om lag atten. Raudt skaut knytt i nakken, lys flette over
    skuldra, breitt smil med tenner, oppbretta ermar og blått liv."""
    hud, har = "hud", "har_huld"
    P.poly([(4, 48), (7, 41), (15, 37), (33, 37), (41, 41), (44, 48)], ("lin", 3))
    P.poly([(4, 48), (7, 41), (13, 38), (12, 48)], ("lin", 2))
    P.poly([(14, 41), (34, 41), (33, 48), (15, 48)], ("blaa", 3))
    P.poly([(14, 41), (18, 41), (18, 48), (15, 48)], ("blaa", 2))
    P.poly([(20, 30), (28, 31), (28, 38), (21, 38)], (hud, 2))
    P.poly([(13, 13), (17, 7), (26, 5), (33, 7), (36, 12), (37, 17), (36, 20), (38, 24), (36, 25),
            (36, 28), (34, 31), (29, 34), (23, 34), (18, 31), (15, 26), (13, 20)], (hud, 3))
    P.poly([(13, 20), (16, 18), (18, 25), (23, 34), (18, 31), (15, 26)], (hud, 2))
    P.poly([(27, 25), (30, 24), (31, 25), (28, 26)], ("kinn", 3))
    nase(P, hud, 37, 18, 6)
    auge_naer(P, 20, 17, "iris_b", "mild")
    auge_far(P, 31, 18, "iris_b")
    P.linje([(20, 15), (23, 14), (26, 15)], (har, 2)); P.linje([(31, 15), (34, 15)], (har, 2))
    # breitt smil med tenner
    P.poly([(27, 28), (35, 27), (33, 31), (29, 31)], ("munn", 1))
    P.linje([(28, 28), (34, 28)], ("kvit", 4)); P.linje([(29, 30), (32, 30)], ("munn", 3))
    # hår i panna, raudt skaut knytt bak
    P.poly([(14, 13), (19, 8), (27, 7), (34, 9), (36, 14), (32, 12), (25, 11), (18, 13), (16, 18)], (har, 3))
    P.poly([(19, 9), (26, 8), (22, 10)], (har, 4))
    P.poly([(11, 16), (12, 7), (18, 2), (27, 1), (35, 4), (38, 10), (35, 10), (28, 7), (20, 8), (15, 12), (14, 20)], ("raud", 3))
    P.poly([(11, 16), (12, 7), (18, 2), (15, 9), (13, 18)], ("raud", 2))
    P.poly([(19, 3), (27, 2), (24, 4)], ("raud", 4))
    P.poly([(8, 12), (12, 10), (12, 16), (6, 20), (7, 15)], ("raud", 2))              # knuten bak
    # fletta over skuldra
    for k, y in enumerate(range(22, 46, 4)):
        x = 14 + k // 2
        P.poly([(x - 2, y), (x + 2, y), (x + 1, y + 4), (x - 2, y + 3)], (har, 3 if k % 2 else 2))
        P.p(x - 1, y + 1, (har, 4))
    P.poly([(15, 46), (18, 46), (17, 48), (15, 48)], ("raud", 3))                    # band i fletta


PERSONAR = {"ivar": ivar, "storebror": storebror, "huldra": huldra, "framande": framande, "presten": presten,
            "haugbonden": haugbonden, "syster": syster, "granne": granne, "budeia": budeia}


# ---------------------------------------------------------------- ut
def lag(namn):
    P = Portrett()
    PERSONAR[namn](P)
    P.omriss()
    brukt = sorted({c for r in P.g for c in r if c})
    TEIKN = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!$%&*+=?@^~<>"
    kart = {c: TEIKN[i] for i, c in enumerate(brukt)}
    linjer = [f"# namn: portrett-{namn}", "# type: portrett", f"# ut: bilete/spel/portrett/{namn}.png",
              f"# storleik: {W}x{H}", "# laga med tools/pikselkunst/portrett.py", "palett:", "  . = -"]
    linjer += [f"  {kart[c]} = {RAMPER[c[0]][c[1]]}    {c[0]} {c[1]}" for c in brukt]
    linjer.append("bilete:")
    linjer += ["  " + "".join(kart[c] if c else "." for c in r) for r in P.g]
    sti = os.path.join(ROT, "kjelder", f"portrett-{namn}.pix")
    open(sti, "w", encoding="utf-8").write("\n".join(linjer) + "\n")
    return sti, len(brukt)


def ark():
    from PIL import Image
    namn = list(PERSONAR)
    ut = Image.new("RGB", (len(namn) * 150 + 6, 156), (20, 26, 82))
    for i, n in enumerate(namn):
        im = Image.open(os.path.join(ROT, "..", "..", "bilete", "spel", "portrett", f"{n}.png")).convert("RGBA")
        im = im.resize((144, 144), Image.NEAREST)
        ut.paste(im, (6 + i * 150, 6), im)
    sti = os.path.join(ROT, "forhand", "portrett-ark.png"); ut.save(sti); return sti


if __name__ == "__main__":
    if len(sys.argv) < 2: print(__doc__); sys.exit(0)
    if sys.argv[1] == "ark": print(ark()); sys.exit(0)
    val = list(PERSONAR) if sys.argv[1] == "alle" else sys.argv[1:]
    import subprocess
    for n in val:
        sti, nf = lag(n)
        subprocess.run([sys.executable, os.path.join(ROT, "pix.py"), "lag", sti], stdout=subprocess.DEVNULL)
        print(f"{n}: {nf} fargar")
