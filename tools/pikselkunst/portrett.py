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
    # Runde 60: Huldra og Ivar i FF6-stil (seks tonar i hud og hår, tonen 0 er omrisset)
    "hud_hu":   ["#40283a", "#86606e", "#c49ca0", "#ead4cc", "#f8ece4", "#fffcf6"],
    "har_hu":   ["#3a2418", "#9a6c34", "#c4943e", "#e4be62", "#f6dc90", "#fff4c8"],
    "iris_hu":  ["#0a1e1e", "#1c4a40", "#2e8a6e", "#6ad6a6", "#c8fae0"],
    "auge_hu":  ["#2a1424"],
    "augekvit": ["#3a3a4a", "#6a6e84", "#a4aac0", "#dde2ea", "#ffffff"],
    "kinn_hu":  ["#6a3a44", "#a05a62", "#c88088", "#e2a8a8"],
    "lepe_hu":  ["#4a2030", "#8a4656", "#b86a78", "#d8949a"],
    "kjole":    ["#101c16", "#20342a", "#36543e", "#527a56", "#7ea27a"],
    "sjal":     ["#1e1438", "#3a2a6a", "#5e4a9a", "#8a78c8", "#b8a8e8"],
    "lauv":     ["#14260e", "#2e4a1c", "#4e7a2c", "#80aa48"],
    "klokke":   ["#141438", "#2a2e78", "#4a56b0", "#7a8ae0"],
    "hud_iv":   ["#4a2028", "#94503e", "#cc8260", "#efb088", "#fbd4b0", "#fff0dc"],
    "har_iv":   ["#120808", "#2a1610", "#4a2a1a", "#6e4426", "#9a6636", "#c8945a"],
    "iris_iv":  ["#140806", "#3a1e10", "#6a3e1c", "#a06a30", "#dca664"],
    "kinn_iv":  ["#6a2a2a", "#b0584c", "#e08870"],
    "munn_iv":  ["#3a1016", "#7a3236", "#b05a54"],
    "trøye":    ["#0e1428", "#1e2c50", "#2e4678", "#4a68a4", "#7090cc"],
    "laer":     ["#1e0e06", "#40220e", "#6a3e1c", "#94622e"],
    "dis":      ["#0a1018", "#121c26", "#1c2c34", "#2a4044", "#3e5a58", "#5e7c74"],
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
        "ned":      ["........", ".LLLLLL.", "LLwkiiL.", "..llll.."],
    }[stil]
    P.rute(x, y, rader, f)


def nase(P, hud, x, y, lengd=6):
    """Nase i tre kvart mot høgre: lys rygg, spiss som stikk ut, skugge og nasebor under."""
    P.poly([(x - 1, y), (x, y), (x + 1, y + lengd - 1), (x - 1, y + lengd)], (hud, 3))
    P.linje([(x - 1, y), (x - 1, y + lengd - 2)], (hud, 4))
    P.linje([(x - 2, y + lengd), (x, y + lengd)], (hud, 1))
    P.p(x - 3, y + lengd - 1, (hud, 2))


# ---------------------------------------------------------------- FF6-verktøy (runde 60)
# Sjå «Portrett i FF6-stil» i STILGUIDE.md. Håret blir bygd av lokkar (lokk), kvar med
# skuggeside, lysside og ein glansring der ljoset treffer; andletet av flater med fem til seks
# tonar; auga av handteikna rutenett med vippeline, iris i tre tonar, pupill og glans.
LJOS = (0.6, -0.8)          # ljoset kjem framanfrå og ovanfrå (frå høgre, mot teksten)


def lokk(P, mat, pts, hw, glans=None, skugge=0, kant=0.8, lys=0.3, mork=-0.35, botn=1):
    """Ei hårlokk langs midtlina pts med halvbreidda hw (eitt tal per punkt, 0 gir spiss).
    Sida som vender mot ljoset blir lys, den andre mørk, og kanten på skuggesida blir den
    mørkaste tonen, så lokkane skil seg frå kvarandre som i FF6. glans: (t0, t1), delen av
    lokka (0 ved rota, 1 i tuppen) der ein glansstripe går langs lyssida, eller ein funksjon
    (x, y) -> True. skugge: kor mange tonar mørkare lokka er (håret bak hovudet ligg i skugge)."""
    lx, ly = LJOS
    seg = [math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]) for i in range(len(pts) - 1)]
    tot = sum(seg) or 1; acc = [0]
    for l in seg: acc.append(acc[-1] + l)
    xs = [p[0] for p in pts]; ys = [p[1] for p in pts]; m = max(hw) + 1
    for y in range(max(0, int(min(ys) - m)), min(H, int(max(ys) + m) + 1)):
        for x in range(max(0, int(min(xs) - m)), min(W, int(max(xs) + m) + 1)):
            px, py = x + 0.5, y + 0.5
            best = None
            for i in range(len(pts) - 1):
                (x0, y0), (x1, y1) = pts[i], pts[i + 1]
                dx, dy = x1 - x0, y1 - y0; L2 = dx * dx + dy * dy or 1e-9
                u = max(0.0, min(1.0, ((px - x0) * dx + (py - y0) * dy) / L2))
                cx, cy = x0 + u * dx, y0 + u * dy
                d = math.hypot(px - cx, py - cy); w = hw[i] + (hw[i + 1] - hw[i]) * u
                if w <= 0.25: continue
                if best is None or d - w < best[0]:
                    ln = math.sqrt(L2); nx, ny = -dy / ln, dx / ln
                    best = (d - w, ((px - cx) * nx + (py - cy) * ny) / w, nx * lx + ny * ly, (acc[i] + u * seg[i]) / tot, w)
            if best is None or best[0] > 0: continue
            s, vend, t = best[1], best[2], best[3]
            sl = s * (1 if vend >= 0 else -1) * max(abs(vend), 0.35)
            if sl < mork or (abs(s) > kant and sl < 0): tone = 1   # skuggesida og kanten mot naboen
            elif sl > lys: tone = 3                                    # lyssida
            else: tone = 2
            if glans and 0.0 < sl < 0.8:
                if callable(glans): g, mid = glans(x, y), True
                else:
                    rom = [glans] if isinstance(glans[0], (int, float)) else glans
                    g = mid = False
                    for t0, t1 in rom:
                        if t0 <= t <= t1:
                            g = True; mid = mid or abs(t - (t0 + t1) / 2) < (t1 - t0) / 4
                if g: tone = 5 if (0.15 < sl < 0.55 and mid and best[4] >= 1.8) else 4
            tone = max(botn, tone - skugge)                  # botn=0: håret bak hovudet, kantane blir djupaste tonen
            P.p(x, y, (mat, tone))


def harflak(P, mat, ytre, indre, n, hw, glans=None, skugge=0, bolgje=(0.8, 11.0, 0.0), rot=0.5, tupp=0.35, ujamn=True, ytre_mork=True, lys=0.3, botn=1):
    """Eit flak av n lokkar mellom to kantliner (ytre og indre, like mange punkt), teikna frå
    ytre mot indre, så den mørke skuggekanten på kvar lokk ligg over lyssida på den førre: då
    les håret som lokkar med strie og glans, ikkje som ei flate. bolgje: (amplitude, bølgjelengd,
    fase) for bylgja hår. Lokkane er smale ved rota (rot) og i tuppen (tupp)."""
    for i in range(n):
        f = (i + 0.5) / n
        pts = [(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f) for a, b in zip(ytre, indre)]
        amp, bl, fase = bolgje
        ut, lengd = [], 0.0
        for j, (x, y) in enumerate(pts):
            if j: lengd += math.hypot(x - pts[j - 1][0], y - pts[j - 1][1])
            nx, ny = (pts[min(j + 1, len(pts) - 1)][1] - pts[max(j - 1, 0)][1]), -(pts[min(j + 1, len(pts) - 1)][0] - pts[max(j - 1, 0)][0])
            ln = math.hypot(nx, ny) or 1
            o = amp * math.sin(2 * math.pi * lengd / bl + fase + i * 1.3) if j else 0
            ut.append((x + nx / ln * o, y + ny / ln * o))
        kort = 0.55 + 0.45 * ((i * 0.618 + 0.3) % 1) if ujamn else 1.0  # ujamne tuppar
        (xa, ya), (xb, yb) = ut[-2], ut[-1]
        ut[-1] = (xa + (xb - xa) * kort, ya + (yb - ya) * kort)
        k = len(ut)
        b = [hw * (rot + (1 - rot) * min(1, j / 1.5)) if j < 2 else hw for j in range(k)]
        b[-1] = hw * tupp
        g = None
        if glans:
            rom = [glans] if isinstance(glans[0], (int, float)) else glans
            g = [(t0 + 0.05 * math.sin(i * 2.1), t1 + 0.05 * math.sin(i * 2.1)) for t0, t1 in rom]
        lokk(P, mat, ut, b, g, skugge + (1 if ytre_mork and f < 0.3 else 0), lys=lys, botn=botn)


def ellipse(P, cx, cy, rx, ry, c, berre=None):
    for y in range(int(cy - ry - 1), int(cy + ry + 2)):
        for x in range(int(cx - rx - 1), int(cx + rx + 2)):
            if ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2 <= 1:
                if berre is None or (P.get(x, y) and P.get(x, y)[0] == berre): P.p(x, y, c)


def rydd(P, mat):
    """Tek bort einsame pikslar i eit materiale: ein piksel utan nabo i same tone blir
    tonen som dei fleste naboane har (støy, sjå STILGUIDE.md)."""
    ut = [r[:] for r in P.g]
    for y in range(H):
        for x in range(W):
            c = P.g[y][x]
            if not c or c[0] != mat: continue
            nb = [P.get(x + dx, y + dy) for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))]
            if c in nb: continue
            nb8 = nb + [P.get(x + dx, y + dy) for dx, dy in ((1, 1), (-1, 1), (1, -1), (-1, -1))]
            if c in nb8: continue
            like = [n for n in nb if n and n[0] == mat]
            if len(like) >= 3:
                ut[y][x] = max(set(like), key=like.count)
    P.g = ut


def selout(P, mat, mot=(1, 0)):
    """Selektivt omriss: på lyssida blir omrisset den nest mørkaste tonen (FF6 lèt lyset ete
    omrisset litt, så forma ikkje blir tung)."""
    for y in range(H):
        for x in range(W):
            c = P.g[y][x]
            if c != (mat, 0): continue
            inn = P.get(x - mot[0], y - mot[1])
            if inn and inn[0] == mat and inn[1] >= 3: P.g[y][x] = (mat, 1)


def rute_k(P, x0, y0, rader, farge):
    """Som P.rute, men teiknet ' ' hoppar over og '.' òg (berre for lesbarheit)."""
    P.rute(x0, y0, [r.replace(" ", ".") for r in rader], farge)


# ---------------------------------------------------------------- personane
# Auga til Ivar etter kjensla: det nære (8 x 5 ved 20, 17) og det fjerne (4 x 4 ved 32, 18).
IVAR_AUGE = {
    None:     ([" LLLLLL ", "LwwiihiL", " wwmppm ", " wwggmw ", "   lll  "],
               [" LLL", "Lihi", " mpm", "  l "]),
    "ivrig":  ([" LLLLLL ", "LwwihhiL", " wwmpgm ", "  wgGg  ", "   lll  "],
               [" LLL", "Lihh", " mpg", "  l "]),
    "glad":   (["        ", "  LLLL  ", " L    L ", "L      L", "        "],
               ["    ", " LL ", "L  L", "    "]),
    "nikk":   (["        ", "        ", " LLLLLL ", "L      L", "        "],
               ["    ", "    ", "LLLL", "L   "]),
    "trist":  (["        ", " LLLLLL ", "LLLwiiL ", " wwmpm  ", "   lll  "],
               ["    ", "LLLL", "Lwim", " wmp"]),
    "sint":   (["LL      ", " LLLLLLL", " LwwhiiL", "  wwmpL ", "   lll  "],
               ["   L", "LLLL", "Lwhi", " wmL"]),
    "sjokk":  ([" LLLLLL ", "LwwwwwwL", " wwhiww ", " wwipww ", "  llll  "],
               ["LLLL", "Lhiw", "wipw", " ll "]),
    "tenkje": ([" LLLLLL ", "LwihiwwL", " wmpmww ", "  wwwww ", "   lll  "],
               [" LLL", "Lihw", " mpw", "  l "]),
    "les":    (["        ", "        ", " LLLLLL ", "LLwmpmL ", "   lll  "],
               ["    ", "    ", "LLLL", "Lmp "]),
}
IVAR_BRYN = {
    None:     ([(20, 15), (23, 14), (27, 14)], [(32, 15), (35, 14)]),
    "ivrig":  ([(20, 14), (23, 13), (27, 13)], [(32, 13), (35, 12)]),
    "glad":   ([(20, 15), (23, 14), (27, 14)], [(32, 15), (35, 14)]),
    "nikk":   ([(20, 16), (23, 15), (27, 15)], [(32, 16), (35, 15)]),
    "trist":  ([(20, 17), (24, 16), (27, 13)], [(32, 13), (35, 16)]),
    "sint":   ([(20, 14), (24, 15), (27, 16), (28, 17)], [(32, 17), (34, 15), (36, 14)]),
    "sjokk":  ([(20, 13), (23, 12), (27, 12)], [(32, 12), (35, 12)]),
    "tenkje": ([(20, 16), (24, 16), (27, 16)], [(32, 14), (34, 12), (36, 13)]),
    "les":    ([(20, 16), (27, 16)], [(32, 16), (35, 16)]),
}


def ivar(P, k=None):
    """Ivar, 13 år: ivrig gardsgut frå Sunnmøre kring 1830, med blikk for ord. Mørkebrunt,
    ustyrleg hår i lokkar som står ut frå ein virvel, ein lugg som fell ned i panna, runde
    kinn med fregner og raudme frå å vere ute, store brune auge som ser fram mot teksten,
    ein fjørpenn stukken bak øyret, blå vadmålstrøye med ståkrage over kvit linskjorte og
    sekkeband av lêr over bringa."""
    hud, har, iris = "hud_iv", "har_iv", "iris_iv"
    # ---- trøya, skjorta og sekkebandet
    P.poly([(3, 48), (5, 42), (12, 38), (20, 36), (30, 36), (38, 38), (44, 43), (46, 48)], ("trøye", 2))
    P.poly([(3, 48), (5, 42), (12, 38), (16, 38), (13, 44), (11, 48)], ("trøye", 1))
    P.poly([(33, 38), (38, 38), (44, 43), (46, 48), (40, 48), (37, 42)], ("trøye", 3))
    P.linje([(38, 39), (42, 43)], ("trøye", 4))
    P.poly([(19, 36), (30, 36), (28, 43), (25, 46), (21, 42)], ("lin", 3))          # skjorta i halsopninga
    P.poly([(19, 36), (22, 36), (24, 44), (21, 42)], ("lin", 2))
    P.linje([(25, 39), (25, 46)], ("lin", 2))
    P.poly([(17, 34), (20, 33), (22, 38), (19, 41), (16, 38)], ("trøye", 3))       # ståkragen
    P.poly([(29, 34), (32, 34), (33, 39), (30, 41), (28, 38)], ("trøye", 3))
    P.linje([(17, 35), (19, 40)], ("trøye", 2)); P.linje([(32, 35), (32, 39)], ("trøye", 4))
    lokk(P, "laer", [(9, 39), (14, 42), (21, 46), (25, 48)], [2, 2, 2, 2])           # sekkebandet
    P.linje([(10, 38), (25, 47)], ("laer", 3)); P.p(16, 43, ("gull", 3)); P.p(17, 43, ("laer", 3))
    # ---- hals (bak kjeven)
    P.poly([(22, 27), (29, 30), (28.5, 37), (22, 37)], (hud, 2))
    P.poly([(26, 31), (29, 30), (28.5, 36), (27, 36)], (hud, 3))
    P.poly([(22, 28), (30, 33.5), (30, 35), (22, 31)], (hud, 1))
    # ---- andletet i tre kvart: rundt barneandlet, kjeven som ei jamn line frå øyret ned til ei smal
    # hake, og ei lita, oppstoppa nase. Ljoset kjem frå høgre: ei stor lys flate framme, ei smal
    # mellomtone og ei jamn skuggeside som følgjer kjeven.
    kantar = {8: (22, 31), 9: (21, 33), 10: (20, 34), 11: (19, 35), 12: (19, 36), 13: (18, 36), 14: (18, 37),
              15: (18, 37), 16: (18, 37), 17: (18, 37), 18: (18, 37), 19: (18, 36), 20: (18, 37), 21: (18, 37),
              22: (18, 38), 23: (18, 38), 24: (18, 39), 25: (18, 38), 26: (19, 37), 27: (20, 37), 28: (21, 37),
              29: (22, 36), 30: (24, 36), 31: (25, 35), 32: (27, 35), 33: (28, 34), 34: (30, 33)}
    for y, (xa, xb) in kantar.items():
        for x in range(xa, xb + 1):
            t = 2 if x < xa + 2 else 3 if x < xa + 4 else 4
            P.p(x, y, (hud, t))
    P.linje([(35, 18), (35, 19)], (hud, 3))                                      # augeholet ved nasen
    P.linje([(36, 22), (36, 24)], (hud, 3)); P.p(37, 25, (hud, 2)); P.p(36, 26, (hud, 3))   # nasa
    P.linje([(28, 33), (31, 33)], (hud, 2))
    P.linje([(29, 25), (32, 25)], ("kinn_iv", 2))                                 # raudme
    if k in ("glad", "ivrig", "sint"): P.linje([(30, 24), (32, 24)], ("kinn_iv", 2))
    for (x, y) in [(27, 23), (29, 22), (26, 25), (34, 24), (33, 26)]:              # fregner
        P.p(x, y, (hud, 3))
    # ---- auga og bryna etter kjensla
    f = {"L": (har, 0), "l": (hud, 1), "w": ("augekvit", 3), "v": ("augekvit", 2), "p": (iris, 0),
         "i": (iris, 1), "m": (iris, 2), "g": (iris, 3), "G": (iris, 4), "h": ("augekvit", 4)}
    naer, fjern = IVAR_AUGE[k]
    if k not in ("glad", "nikk", "les"): P.linje([(21, 16), (27, 16)], (hud, 3))
    rute_k(P, 20, 17, naer, f); rute_k(P, 32, 18, fjern, f)
    bn, bf = IVAR_BRYN[k]
    P.linje(bn, (har, 1)); P.linje(bf, (har, 1))
    if k in ("sint", "trist", "tenkje"):                                          # tjukke bryn som ber kjensla
        P.linje([(x, y + 1) for x, y in bn[-2:]], (har, 1)); P.linje([(x, y + 1) for x, y in bf[:2]], (har, 1))
    if k == "trist": P.p(26, 22, ("augekvit", 4)); P.p(26, 23, ("augekvit", 3))
    # ---- munnen
    M0, M1, M2 = ("munn_iv", 0), ("munn_iv", 1), ("munn_iv", 2)
    if k in ("glad", "ivrig"):                                                    # ope smil med tenner
        P.poly([(29, 27), (35, 26.5), (34, 30.5), (30, 30.5)], M0)
        P.linje([(30, 27), (34, 27)], ("lin", 4)); P.linje([(31, 30), (33, 30)], M2)
    elif k == "trist":                                                            # munnvikane ned
        P.p(30, 31, M1); P.p(31, 30, M1); P.linje([(32, 29), (33, 29)], M1); P.p(34, 30, M1); P.p(35, 31, M1)
    elif k == "sint":                                                             # bit tennene saman
        P.poly([(30, 28), (35, 28), (35, 30.5), (30, 30.5)], M0); P.linje([(31, 29), (34, 29)], ("lin", 4))
    elif k == "sjokk":
        P.poly([(31, 28), (34, 28), (34, 31.5), (31, 31.5)], M0); P.linje([(31, 31), (33, 31)], M2)
    elif k == "tenkje":                                                           # munnen trekt til sida
        P.linje([(32, 29), (33, 29)], M1); P.p(34, 28, M1); P.p(31, 30, M2)
    elif k == "nikk":
        P.p(30, 28, M1); P.linje([(31, 29), (33, 29)], M1); P.p(34, 28, M1)
    else:                                                                         # nøytral og les: lite, spørjande drag
        P.linje([(31, 29), (33, 29)], M1); P.p(34, 28, M1); P.p(32, 30, M2)
    # ---- håret: virvel øvst, lokkar som står ut, lugg ned i panna
    gl = (0.12, 0.32)
    harflak(P, har, [(22, 2), (14, 5), (10, 11), (9, 17), (11, 24)],
            [(25, 5), (19, 8), (17, 12), (17, 15), (17, 18)], 4, 2.3, (0.15, 0.3), bolgje=(0.6, 9, 0.0))
    # øyret der kjeven møter hovudet (over håret bak, under luggen)
    P.poly([(15, 19.5), (16.5, 18), (18.5, 18.5), (19.5, 20), (19.5, 24), (17.5, 25.5), (16, 25)], (hud, 3))
    P.poly([(16.5, 19.5), (18.5, 19.5), (18.5, 23.5), (17, 24)], (hud, 2)); P.linje([(17, 20), (17, 22)], (hud, 1))
    # fjørpennen ligg oppå øyret, stukken inn mellom øyret og håret
    lokk(P, "kvit", [(14, 13), (11, 8), (9, 3), (9, 0)], [1.4, 2.2, 2.0, 0.6])
    P.linje([(13, 12), (10, 2)], ("kvit", 4))
    P.linje([(19, 17), (16, 16), (14, 13)], ("kvit", 2))
    harflak(P, har, [(24, 3), (30, 1), (36, 4), (39, 9), (40, 15)],
            [(25, 6), (29, 6), (33, 9), (36, 13), (37, 16)], 3, 2.3, gl, bolgje=(0.5, 8, 1.0), ytre_mork=False)
    for pts, w in [([(25, 5), (23, 9), (21, 13), (20, 15)], 2.2), ([(26, 6), (26, 10), (25, 14)], 2.0),
                   ([(27, 6), (29, 10), (30, 15)], 2.0), ([(28, 6), (32, 9), (34, 14)], 2.0),
                   ([(30, 6), (35, 9), (37, 13), (38, 17)], 1.8)]:                # luggen
        lokk(P, har, pts, [w * 0.7, w, w * 0.8, 0.3][:len(pts)] if len(pts) == 4 else [w * 0.7, w, 0.3], (0.0, 0.3))
    for pts, w in [([(24, 4), (21, 0), (19, -1)], 1.6), ([(25, 4), (27, -1), (30, -2)], 1.5),
                   ([(22, 4), (16, 1), (13, 1)], 1.5), ([(11, 12), (6, 10)], 1.4), ([(10, 18), (6, 18)], 1.2)]:   # tjafsar som står ut
        lokk(P, har, pts, [w, w * 0.8, 0.3][:len(pts)] if len(pts) == 3 else [w, 0.3], (0.0, 0.4))
    # ---- hender og ting som høyrer til kjensla
    if k == "tenkje":                                                             # handa under haka
        P.poly([(27, 33), (34, 30), (37, 34), (35, 39), (29, 39)], (hud, 3))
        P.linje([(29, 36), (35, 34)], (hud, 2)); P.linje([(30, 34), (34, 32)], (hud, 4))
        P.poly([(33, 38), (37, 36), (41, 48), (35, 48)], ("trøye", 3))
    if k == "ivrig":                                                              # neven i været
        P.poly([(37, 33), (43, 31), (45, 37), (39, 39)], (hud, 3))
        P.linje([(38, 35), (44, 34)], (hud, 2)); P.linje([(38, 33), (42, 32)], (hud, 4))
        P.poly([(38, 39), (45, 37), (47, 48), (40, 48)], ("trøye", 3))
    if k == "les":                                                                # ei open bok nedst
        P.poly([(10, 40), (38, 40), (40, 48), (8, 48)], ("laer", 2))
        P.poly([(12, 41), (23, 42), (23, 48), (11, 48)], ("lin", 4)); P.poly([(25, 42), (36, 41), (37, 48), (25, 48)], ("lin", 3))
        for y in (43, 45, 47): P.linje([(13, y), (21, y)], ("lin", 1)); P.linje([(27, y), (35, y)], ("lin", 1))
        P.poly([(6, 42), (11, 41), (11, 48), (6, 48)], (hud, 3)); P.poly([(37, 41), (42, 42), (42, 48), (37, 48)], (hud, 3))




# Kjensler i portretta (same namn som i figurarka). Kvar variant blir <namn>-<kjensle>.png.
PORTRETT_KJENSLER = {"ivar": ("glad", "trist", "sint", "sjokk", "tenkje", "nikk", "ivrig", "les"),
                     "huldra": ("glad", "trist", "sint", "sjokk", "tenkje", "nikk", "lokk", "sky")}


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


def gran_siluett(P, cx, topp, botn, brei, c):
    """Ei gran som silhuett i disen: smal topp, greinlag med takka underkant."""
    for y in range(max(0, int(topp)), min(H, int(botn) + 1)):
        t = (y - topp) / max(1, botn - topp)
        hb = (brei * t + 0.5) * (0.7 + 0.3 * ((y - topp) % 4) / 3)
        for x in range(int(round(cx - hb)), int(round(cx + hb)) + 1):
            if 0 <= x < W: P.bak[y][x] = c


# Auga til Huldra etter kjensla (tre kvart framanfrå, begge auga synlege): det nære (7 x 5,
# øvre venstre hjørne 19, 19) og det fjerne (5 x 4 ved 29, 19). L vippeline, l nedre augelok,
# w/v augekvite (lys/skugge under loket), p pupill, i/m/g/G iris frå mørk til lysande, h glans.
HULDRA_AUGE = {
    None:     ([" LLLLL ", "LLvipiL", " wwmGh ", "  wgGg ", "   ll  "],
               [" LLLL", "Lvipi", " wmGh", "  gGl"]),
    "glad":   (["       ", " LLLLL ", "LLvmhmL", "  lgGl ", "       "],
               ["     ", " LLLL", "Lvmhm", " lgGl"]),
    "trist":  (["       ", " LLLLL ", "LLLLLLL", " wwmGm ", "   ll  "],
               ["     ", " LLLL", "LLLLL", " wmGm"]),
    "sint":   (["L      ", "LLLLLLL", " LwGpGL", "  wgGg ", "   ll  "],
               ["    L", "LLLLL", "LGpGL", " wgG "]),
    "sjokk":  ([" LLLLL ", "LwwiiwL", " wwpGw ", " wwgGw ", "  lll  "],
               ["LLLLL", "Lwiiw", "wwpGw", " lll "]),
    "tenkje": ([" LLLLL ", "LLwwpiL", " wwwgG ", "  wwww ", "   ll  "],
               [" LLLL", "Lwwpi", " wwgG", "  ll "]),
    "nikk":   (["       ", "       ", " LLLLL ", "L     L", "       "],
               ["     ", "     ", "LLLLL", "L   L"]),
    "lokk":   (["       ", " LLLLL ", "LLLLLLL", "LwpiGw ", "  gGl  "],
               ["     ", " LLLL", "LLLLL", "LpiGw", " gG  "]),
    "sky":    (["       ", " LLLLL ", "LLLLLLL", "  wmGm ", "   ll  "],
               ["     ", " LLLL", "LLLLL", " wmGm"]),
}
# Bryna: (nært, fjernt) som punktliner.
HULDRA_BRYN = {
    None:     ([(19, 16), (21, 15), (24, 15), (25, 16)], [(29, 16), (31, 15), (33, 15), (34, 16)]),
    "glad":   ([(19, 15), (21, 14), (24, 14), (25, 15)], [(29, 15), (31, 14), (33, 14), (34, 15)]),
    "trist":  ([(19, 17), (22, 16), (25, 14)], [(29, 14), (32, 16), (34, 17)]),
    "sint":   ([(19, 14), (22, 15), (25, 17)], [(29, 17), (32, 15), (34, 14)]),
    "sjokk":  ([(19, 14), (21, 13), (24, 13), (25, 14)], [(29, 14), (31, 13), (33, 13), (34, 14)]),
    "tenkje": ([(19, 17), (25, 17)], [(29, 14), (31, 12), (34, 13)]),
    "nikk":   ([(19, 17), (21, 16), (24, 16), (25, 17)], [(29, 17), (31, 16), (33, 16), (34, 17)]),
    "lokk":   ([(19, 17), (25, 16)], [(29, 15), (31, 13), (34, 14)]),
    "sky":    ([(19, 16), (22, 15), (25, 15)], [(29, 15), (32, 15), (34, 16)]),
}


def huldra(P, k=None):
    """Huldra: vakker og gåtefull. Langt, utslått gullhår i lokkar med glans som fell ned over
    skuldrene, krans av kvitveis, blåklokker og bjørkelauv, bleik hud med eit kjølig skjær,
    lysande grøne auge under tunge augelok som ser forbi oss, eit lite smil. Grøn kjole med
    kvit særk og fiolett sjal. Ein dusk av kuhalen kikar fram bak skuldra nede til venstre.
    Bak henne: skogen i dis (granar som silhuettar, lys dis i midten og lågt over bakken)."""
    hud, har, iris = "hud_hu", "har_hu", "iris_hu"
    # ---- bakgrunnen: skog i dis (eige lag, under omrisset)
    P.bak = [[("dis", 1)] * W for _ in range(H)]
    for y in range(H):
        for x in range(W):
            if ((x - 33) / 22) ** 2 + ((y - 26) / 20) ** 2 < 1: P.bak[y][x] = ("dis", 2)
            if ((x - 35) / 14) ** 2 + ((y - 30) / 12) ** 2 < 1: P.bak[y][x] = ("dis", 3)
    for (cx, topp, br) in [(13, 3, 5), (23, 9, 4), (38, 1, 5), (46, 7, 5), (30, 12, 3)]:
        gran_siluett(P, cx, topp, 47, br, ("dis", 2))
    for (cx, topp, br) in [(1, -6, 6), (47, -4, 5)]:
        gran_siluett(P, cx, topp, 47, br, ("dis", 0))
    for y in range(33, H):                                                   # disen lågt over bakken
        for x in range(W):
            if y > 37 + 2 * math.sin(x / 5.0 + 0.5): P.bak[y][x] = ("dis", 4)
            elif y > 34 and (x + 3 * y) % 17 < 6 and y % 3 == 1: P.bak[y][x] = ("dis", 3)
    for y in range(40, H):
        for x in range(W):
            if y > 42 + 1.5 * math.sin(x / 4.0 + 1): P.bak[y][x] = ("dis", 5)
    for (x, y) in [(7, 22), (44, 26), (36, 6)]:                              # irrlys langt inne i skogen
        P.bak[y][x] = (iris, 4)

    # ---- håret bak (i skugge, bak kroppen)
    harflak(P, har, [(17, 7), (9, 13), (5, 22), (3, 32), (2, 40), (1, 48)],
            [(23, 7), (17, 12), (14, 20), (13, 30), (12, 40), (12, 48)], 4, 2.6, (0.4, 0.48), bolgje=(1.4, 13, 0.5), lys=0.55)
    harflak(P, har, [(33, 6), (38, 12), (39, 21), (40, 31), (41, 38), (41, 44)],
            [(36, 6), (41, 12), (43, 21), (43, 31), (44, 37), (45, 42)], 2, 1.9, (0.32, 0.4), bolgje=(1.2, 12, 1.0), lys=0.55)
    # håret som heng rett bak hovudet: ei mørk ramme ved halsen og langs kinna (eitt steg mørkare)
    harflak(P, har, [(18, 9), (15, 17), (15, 27), (16, 35), (16, 44)],
            [(24, 10), (21, 18), (21, 28), (23, 34), (23, 42)], 3, 2.4, (0.5, 0.58), skugge=1, botn=0,
            bolgje=(0.6, 12, 1.0), lys=0.5, ytre_mork=False)
    harflak(P, har, [(32, 9), (35, 17), (35, 26), (32, 32), (31, 42)],
            [(37, 9), (40, 17), (41, 26), (40, 34), (40, 44)], 3, 2.4, (0.5, 0.58), skugge=1, botn=0,
            bolgje=(0.6, 12, 2.0), lys=0.5, ytre_mork=False)
    # ---- dusken på kuhalen, bak skuldra nede til venstre (berre eit hint)
    lokk(P, har, [(1, 48), (2, 44), (4, 42), (6, 43)], [0.9, 1.4, 1.5, 0.5], (0.4, 0.8))
    P.p(0, 46, (har, 1)); P.p(1, 45, (har, 1))
    # ---- kropp: hals, bringe, særk, kjole og sjal
    P.poly([(24.5, 30), (30.5, 30), (30.5, 41), (24, 41)], (hud, 3))
    P.poly([(24.5, 30), (26.5, 30), (26, 41), (24, 41)], (hud, 2))              # halsen i skugge mot venstre
    P.poly([(22, 31), (31, 32), (31, 35), (24, 34)], (hud, 2))                   # skuggen under kjeven
    P.poly([(6, 48), (9, 42), (16, 39), (22, 39), (31, 39), (38, 39), (44, 43), (47, 48)], ("kjole", 2))
    P.poly([(21, 39), (31, 39), (31.5, 41), (26, 43), (20.5, 41)], (hud, 3))       # bringa
    P.poly([(21, 39), (23.5, 39), (24, 42.5), (20.5, 41)], (hud, 2))
    P.poly([(18, 41), (26, 43.5), (34, 41), (35, 43), (26, 46), (17, 43)], ("lin", 3))   # særken
    for x in range(19, 34, 2): P.p(x, 43 + (1 if 22 < x < 30 else 0), ("kjole", 3))   # broderi i særken
    P.poly([(23, 46), (30, 46), (31, 48), (22, 48)], ("kjole", 3))
    P.poly([(6, 48), (9, 42), (16, 39), (21, 40), (17, 44), (15, 48)], ("sjal", 2))   # sjalet over skuldrene
    P.poly([(32, 39), (39, 39), (45, 43), (47, 48), (37, 48), (35, 43)], ("sjal", 3))
    # ---- andletet: tre kvart framanfrå, mjuk kjeve og smal hake. Rad for rad (venstre og høgre
    # kant). Ljoset kjem frå høgre: ei stor lys flate, ei smal mellomtone og ei jamn skuggeside.
    kantar = {7: (22, 31), 8: (20, 33), 9: (19, 34), 10: (18, 34), 11: (18, 35), 12: (17, 35), 13: (17, 35),
              14: (17, 35), 15: (17, 35), 16: (17, 35), 17: (17, 35), 18: (17, 35), 19: (17, 35), 20: (17, 35),
              21: (17, 35), 22: (17, 35), 23: (17, 35), 24: (18, 35), 25: (18, 35), 26: (18, 34), 27: (19, 34),
              28: (19, 34), 29: (20, 33), 30: (20, 33), 31: (21, 33), 32: (22, 32), 33: (23, 32), 34: (25, 31),
              35: (27, 30)}
    for y, (xa, xb) in kantar.items():
        for x in range(xa, xb + 1):
            kinn = 1 if 21 <= y <= 30 else 0                                     # kinnet bular litt ut
            grense = xa + 2 + kinn                                               # skuggesida mot venstre
            t = 2 if x < grense else 3 if x < grense + 3 + kinn else 4             # mjuk mellomtone langs kinnet
            if y >= 32 and x < 26 + (y - 32): t = 2                                # under kjeven
            elif y >= 30 and x < 29 + (y - 30): t = min(t, 3)
            if y >= 33: t = min(t, 3)
            P.p(x, y, (hud, t))
    # nasa: lys rygg (grunntonen) med skuggesida til venstre og ein liten skugge under
    P.linje([(28, 24), (28, 25)], (hud, 5)); P.linje([(27, 25), (27, 26)], (hud, 3))   # kort, lys naserygg
    P.p(28, 27, (hud, 2)); P.linje([(27, 28), (28, 28)], (hud, 3))
    P.linje([(28, 34), (30, 34)], (hud, 3))                                       # skugge under haka
    if k in ("glad", "sky"):                                                      # raudme
        P.linje([(20, 26), (22, 26)], ("lepe_hu", 3)); P.linje([(31, 26), (33, 26)], ("lepe_hu", 3))
    if k not in ("nikk", "glad"):                                                 # augelokfaldet
        P.linje([(20, 18), (24, 18)], (hud, 3)); P.linje([(30, 18), (33, 18)], (hud, 3))
    # ---- auga og bryna etter kjensla
    f = {"L": (har, 0), "l": (hud, 2), "w": ("augekvit", 3), "v": ("augekvit", 2), "p": (iris, 0),
         "i": (iris, 1), "m": (iris, 2), "g": (iris, 3), "G": (iris, 4), "h": ("augekvit", 4)}
    naer, fjern = HULDRA_AUGE[k]
    rute_k(P, 19, 19, naer, f); rute_k(P, 29, 19, fjern, f)
    bn, bf = HULDRA_BRYN[k]
    P.linje(bn, (har, 1)); P.linje(bf, (har, 1))
    if k in ("sint", "trist", "tenkje"):                                          # tjukke bryn som ber kjensla
        P.linje([(x, y + 1) for x, y in bn[-2:]], (har, 1)); P.linje([(x, y + 1) for x, y in bf[:2]], (har, 1))
    if k == "trist": P.p(24, 24, ("augekvit", 4)); P.p(24, 25, ("iris_hu", 3)); P.p(24, 26, ("iris_hu", 3))   # ei tåre
    # ---- munnen: litt fyldige lepper i ein dempa rosetone, inne i andletet
    L1, L2, L0 = ("lepe_hu", 1), ("lepe_hu", 2), ("lepe_hu", 0)
    if k in (None, "nikk", "sky"):                                                # lite, gåtefullt smil
        P.linje([(26, 30), (30, 30)], L1); P.p(31, 29, L1); P.linje([(27, 31), (29, 31)], L2)
    elif k == "glad":
        P.p(25, 29, L1); P.linje([(26, 30), (30, 30)], L1); P.p(31, 29, L1); P.linje([(27, 31), (29, 31)], L2)
    elif k == "lokk":                                                             # skeivt, lurt smil
        P.linje([(26, 30), (30, 30)], L1); P.p(31, 29, L1); P.p(32, 28, L1); P.linje([(27, 31), (28, 31)], L2)
    elif k == "trist":                                                            # munnvikane ned
        P.p(25, 32, L1); P.p(26, 31, L1); P.linje([(27, 30), (29, 30)], L1); P.p(30, 31, L1); P.p(31, 32, L1)
        P.linje([(27, 31), (29, 31)], L2)
    elif k == "sint":                                                             # samanbitne lepper
        P.p(25, 31, L0); P.linje([(26, 30), (30, 30)], L0); P.p(31, 31, L0); P.linje([(27, 31), (29, 31)], L2)
    elif k == "sjokk":
        P.linje([(27, 30), (29, 30)], L1); P.linje([(27, 31), (29, 31)], L0); P.linje([(27, 32), (29, 32)], L2)
    elif k == "tenkje":                                                           # munnen trekt til sida
        P.linje([(28, 30), (30, 30)], L1); P.p(31, 29, L1); P.linje([(29, 31), (30, 31)], L2)
    # ---- håret framme
    harflak(P, har, [(29, 2), (20, 2), (13, 6), (10, 15), (10, 25), (11, 34), (10, 42), (9, 48)],
            [(31, 6), (25, 7), (20, 10), (17, 16), (16, 24), (16, 32), (16, 40), (16, 48)], 4, 2.4,
            [(0.07, 0.2), (0.52, 0.6)], bolgje=(0.9, 13, 2.0), lys=0.45)
    harflak(P, har, [(30, 4), (35, 5), (38, 10), (39, 18)], [(31, 6), (34, 8), (36, 12), (37, 18)], 2, 1.8, (0.2, 0.55),
            bolgje=(0.3, 8, 0))
    lokk(P, har, [(29, 5), (25, 8), (22, 12)], [1.5, 1.4, 0.5], (0.1, 0.5))           # lause lokkar i panna
    lokk(P, har, [(31, 6), (33, 9), (34, 12)], [1.2, 1, 0.4], (0.1, 0.5))
    for pts in [[(20, 4), (17, 1)], [(33, 5), (36, 2)], [(10, 12), (7, 9)]]:          # lause hårstrå
        P.linje(pts, (har, 3))
    # ---- kransen: kvitveis, blåklokker og bjørkelauv over hovudet
    for (x, y) in [(15, 11), (19, 7), (30, 5), (36, 8), (24, 5)]:
        P.poly([(x - 2, y + 1), (x - 3, y - 1), (x, y - 1), (x + 1, y + 1)], ("kjole", 3))
        P.p(x - 2, y - 1, ("kjole", 4))
    for (x, y) in [(17, 9), (27, 5), (34, 6)]:                                      # kvitveis
        for dx, dy in [(0, -1), (-1, 0), (1, 0), (0, 1)]: P.p(x + dx, y + dy, ("lin", 4))
        P.p(x - 1, y - 1, ("lin", 3)); P.p(x, y, (har, 4))
    for (x, y) in [(22, 6), (38, 10), (13, 13)]:                                    # blåklokker
        P.p(x, y, ("klokke", 3)); P.p(x + 1, y, ("klokke", 2)); P.p(x, y + 1, ("klokke", 2)); P.p(x + 1, y + 1, ("klokke", 2))
    # ---- handa til kjensla
    if k == "tenkje":                                                             # fingeren mot leppa
        P.poly([(33, 48), (34, 42), (37, 38.5), (41, 40), (40, 48)], ("lin", 3))      # kvitt erme
        P.linje([(34, 42), (37, 39)], ("lin", 4)); P.linje([(37, 39), (40, 41)], ("lin", 4))
        P.poly([(29, 34), (32, 33), (35, 35.5), (36, 39), (33, 40.5), (30, 38), (28.5, 36)], (hud, 4))
        P.linje([(30, 31), (30, 33)], (hud, 4))                                  # peikefingeren mot leppa
        P.linje([(30, 36), (34, 36)], (hud, 3)); P.linje([(29, 34), (29, 36)], (hud, 3))


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


# ---------------------------------------------------------------- fellesansikt for bygdefolk
# Som dei generiske portretta i Fire Emblem: same stil, men nøytrale, utan kjenneteikn som
# stel merksemda frå hovudpersonane. Mange småroller deler eitt ansikt (sjå PORTRETT i data.js).

def bygd_mann(P):
    """Vaksen bygdemann: brunt hår, stutt skjegg, grå vadmålstrøye over kvit skjorte."""
    hud, har = "hud_bror", "har_syst"
    P.poly([(2, 48), (5, 41), (14, 37), (34, 37), (43, 41), (46, 48)], ("graa", 3))
    P.poly([(2, 48), (5, 41), (14, 37), (15, 48)], ("graa", 2))
    P.poly([(19, 36), (29, 36), (27, 42), (21, 42)], ("lin", 3))
    P.poly([(19, 29), (28, 30), (28, 37), (20, 37)], (hud, 2))
    P.poly([(13, 12), (17, 6), (26, 4), (33, 6), (36, 12), (37, 18), (36, 21), (37, 25), (36, 26),
            (36, 29), (34, 32), (29, 34), (23, 34), (18, 31), (15, 26), (13, 19)], (hud, 3))
    P.poly([(13, 19), (16, 17), (18, 25), (23, 34), (18, 31), (15, 26)], (hud, 2))
    nase(P, hud, 37, 19, 6)
    auge_naer(P, 21, 18, "iris_br", "open")
    auge_far(P, 31, 18, "iris_br")
    P.linje([(20, 16), (24, 15), (27, 16)], (har, 1)); P.linje([(31, 16), (34, 15)], (har, 1))
    P.poly([(17, 27), (22, 29), (30, 30), (36, 28), (36, 31), (32, 35), (24, 35), (18, 31)], (har, 2))   # stutt skjegg
    P.linje([(29, 29), (33, 29)], ("munn", 1))
    P.poly([(12, 20), (12, 10), (17, 4), (26, 2), (34, 4), (38, 10), (37, 15), (33, 11), (26, 10), (19, 11), (15, 16), (14, 22)], (har, 2))
    P.poly([(16, 6), (24, 3), (30, 4), (23, 6)], (har, 3))
    P.poly([(12, 19), (14, 18), (15, 23), (13, 24)], (hud, 2))


def bygd_kvinne(P):
    """Vaksen bygdekvinne: mørkt skaut knytt under haka, brunt hår i panna, raudt liv."""
    hud, har = "hud", "har_syst"
    P.poly([(6, 48), (9, 41), (17, 37), (31, 37), (39, 41), (42, 48)], ("lin", 3))
    P.poly([(14, 40), (20, 41), (22, 48), (13, 48)], ("raud", 2)); P.poly([(28, 41), (34, 40), (35, 48), (26, 48)], ("raud", 3))
    for y in range(42, 48, 2): P.linje([(22, y), (26, y + 1)], ("raud", 1))
    P.poly([(20, 30), (28, 31), (28, 38), (21, 38)], (hud, 2))
    P.poly([(14, 13), (18, 8), (26, 6), (33, 8), (36, 13), (37, 18), (36, 21), (37, 24), (36, 25),
            (36, 28), (34, 31), (29, 34), (24, 34), (19, 31), (16, 26), (14, 20)], (hud, 3))
    P.poly([(14, 20), (17, 18), (19, 25), (24, 34), (19, 31), (16, 26)], (hud, 2))
    nase(P, hud, 37, 19, 5)
    auge_naer(P, 21, 18, "iris_b", "mild")
    auge_far(P, 31, 18, "iris_b")
    P.linje([(21, 16), (24, 15), (27, 16)], (har, 2)); P.linje([(31, 16), (34, 16)], (har, 2))
    P.linje([(29, 29), (32, 29)], ("munn", 2))
    P.poly([(16, 14), (22, 11), (30, 11), (34, 14), (29, 13), (22, 14), (18, 17)], (har, 3))
    P.poly([(11, 22), (12, 12), (17, 6), (26, 4), (34, 6), (38, 11), (39, 17), (37, 19), (35, 14),
            (29, 11), (22, 11), (16, 14), (15, 24), (16, 32), (13, 32)], ("graa", 2))
    P.poly([(11, 22), (12, 12), (17, 6), (15, 14), (14, 26), (13, 32)], ("graa", 1))
    P.poly([(17, 6), (25, 4), (30, 5), (24, 7)], ("graa", 3))
    P.poly([(24, 34), (30, 34), (28, 38), (26, 39)], ("graa", 2))


def bygd_gamal_mann(P):
    """Gamal bygdemann: tunt kvitt hår, skjeggstubb, rynker, brun trøye."""
    hud, har = "hud_gml", "har_kvit"
    P.poly([(3, 48), (6, 41), (15, 37), (33, 37), (42, 41), (45, 48)], ("brun", 3))
    P.poly([(3, 48), (6, 41), (15, 37), (16, 48)], ("brun", 2))
    P.poly([(20, 30), (28, 31), (28, 37), (21, 37)], (hud, 2))
    P.poly([(13, 12), (17, 6), (26, 4), (33, 6), (37, 12), (37, 18), (36, 21), (38, 25), (36, 26),
            (36, 29), (34, 32), (29, 35), (23, 35), (18, 32), (15, 27), (13, 20)], (hud, 3))
    P.poly([(13, 20), (16, 18), (18, 25), (23, 35), (18, 32), (15, 27)], (hud, 2))
    P.poly([(18, 30), (23, 34), (29, 35), (34, 32), (35, 29), (30, 31), (23, 31)], (hud, 2))
    for (x, y) in [(22, 32), (26, 33), (30, 33), (33, 31)]: P.p(x, y, ("har_kvit", 2))
    nase(P, hud, 37, 19, 7)
    auge_naer(P, 21, 19, "iris_b", "mild")
    auge_far(P, 31, 19, "iris_b")
    P.linje([(20, 23), (24, 24)], (hud, 2)); P.linje([(30, 27), (29, 30)], (hud, 1))
    P.linje([(20, 16), (24, 15), (27, 17)], (har, 3)); P.linje([(31, 16), (34, 16)], (har, 3))
    P.linje([(29, 30), (33, 30)], ("munn", 1))
    P.poly([(11, 22), (11, 13), (15, 7), (22, 4), (29, 4), (24, 6), (18, 9), (16, 16), (15, 24)], (har, 3))
    P.linje([(13, 12), (12, 21)], (har, 2)); P.linje([(17, 8), (23, 5)], (har, 4))


def bygd_gamal_kone(P):
    """Gamal bygdekone: svart skaut, rynker, milde auge, grå trøye med kvitt sjal."""
    hud = "hud_gml"
    P.poly([(5, 48), (8, 41), (16, 37), (32, 37), (40, 41), (43, 48)], ("graa", 2))
    P.poly([(12, 40), (24, 44), (36, 40), (33, 46), (24, 48), (15, 46)], ("lin", 3))
    P.poly([(20, 30), (28, 31), (28, 38), (21, 38)], (hud, 2))
    P.poly([(14, 13), (18, 8), (26, 6), (33, 8), (36, 13), (37, 18), (36, 21), (37, 25), (36, 26),
            (36, 29), (33, 32), (28, 34), (23, 34), (19, 31), (16, 26), (14, 20)], (hud, 3))
    P.poly([(14, 20), (17, 18), (19, 25), (23, 34), (19, 31), (16, 26)], (hud, 2))
    nase(P, hud, 37, 19, 6)
    auge_naer(P, 21, 19, "iris_br", "mild")
    auge_far(P, 31, 19, "iris_br")
    for pts in [[(20, 23), (23, 24)], [(29, 27), (28, 30)], [(33, 28), (34, 31)], [(22, 27), (23, 30)]]:
        P.linje(pts, (hud, 2))
    P.linje([(21, 17), (26, 16)], ("har_kvit", 2)); P.linje([(31, 17), (34, 17)], ("har_kvit", 2))
    P.linje([(29, 30), (32, 30)], ("munn", 1))
    P.poly([(16, 14), (22, 12), (30, 12), (34, 14), (29, 14), (22, 15), (18, 17)], ("har_kvit", 3))
    P.poly([(11, 22), (12, 12), (17, 6), (26, 4), (34, 6), (38, 11), (39, 17), (37, 19), (35, 14),
            (29, 12), (22, 12), (16, 14), (15, 24), (16, 32), (13, 32)], ("svart", 3))
    P.poly([(11, 22), (12, 12), (17, 6), (15, 14), (14, 26), (13, 32)], ("svart", 2))
    P.poly([(17, 6), (25, 4), (30, 5), (24, 7)], ("svart", 4))
    P.poly([(24, 34), (30, 34), (28, 38), (26, 39)], ("svart", 3))


def bygd_gut(P):
    """Gut frå bygda: lyst, stritt hår, runde kinn, lue på snei, brun trøye."""
    hud, har = "hud_barn", "har_bror"
    P.poly([(8, 48), (11, 42), (18, 39), (30, 39), (37, 42), (40, 48)], ("brun", 3))
    P.poly([(8, 48), (11, 42), (16, 40), (15, 48)], ("brun", 2))
    P.poly([(20, 32), (28, 33), (28, 39), (21, 39)], (hud, 2))
    P.poly([(14, 15), (18, 10), (26, 9), (33, 11), (36, 16), (36, 21), (37, 25), (36, 26), (36, 28),
            (34, 32), (29, 35), (23, 35), (18, 32), (15, 27), (13, 21)], (hud, 3))
    P.poly([(13, 21), (16, 20), (18, 27), (23, 35), (18, 32), (15, 27)], (hud, 2))
    P.poly([(28, 27), (31, 26), (32, 27), (29, 28)], ("kinn", 3))
    nase(P, hud, 36, 22, 4)
    auge_naer(P, 20, 19, "iris_b", "stor")
    auge_far(P, 30, 20, "iris_b")
    P.linje([(21, 17), (25, 16)], (har, 2)); P.linje([(30, 18), (33, 17)], (har, 2))
    P.linje([(29, 31), (32, 30)], ("munn", 2))
    P.poly([(12, 22), (12, 14), (16, 12), (22, 13), (30, 12), (36, 14), (37, 18), (33, 15), (27, 15), (21, 16), (16, 19), (14, 25)], (har, 3))
    for x in range(16, 36, 4): P.poly([(x, 14), (x + 3, 14), (x + 1, 18)], (har, 3))
    P.poly([(11, 14), (14, 7), (22, 4), (31, 5), (37, 9), (38, 14), (30, 12), (20, 12), (13, 15)], ("brun", 3))   # lue
    P.poly([(11, 14), (14, 7), (18, 5), (16, 12)], ("brun", 2))
    P.linje([(12, 13), (37, 13)], ("brun", 1))


PERSONAR = {"ivar": ivar, "storebror": storebror, "huldra": huldra, "framande": framande, "presten": presten,
            "haugbonden": haugbonden, "syster": syster, "granne": granne, "budeia": budeia,
            "bygd-mann": bygd_mann, "bygd-kvinne": bygd_kvinne, "bygd-gamal-mann": bygd_gamal_mann,
            "bygd-gamal-kone": bygd_gamal_kone, "bygd-gut": bygd_gut}


# ---------------------------------------------------------------- ut
def lag(namn, k=None):
    P = Portrett()
    if k: PERSONAR[namn](P, k)
    else: PERSONAR[namn](P)
    namn = f"{namn}-{k}" if k else namn
    P.omriss()
    if namn.split("-")[0] in ("huldra", "ivar"): selout(P, "hud_hu" if namn.startswith("huldra") else "hud_iv")
    if getattr(P, "bak", None):                                     # bakgrunnen under omrisset (Huldra)
        for y in range(H):
            for x in range(W):
                if P.g[y][x] is None: P.g[y][x] = P.bak[y][x]
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
        for k in (None,) + PORTRETT_KJENSLER.get(n, ()):
            sti, nf = lag(n, k)
            subprocess.run([sys.executable, os.path.join(ROT, "pix.py"), "lag", sti], stdout=subprocess.DEVNULL)
            print(f"{n}{'-' + k if k else ''}: {nf} fargar")
