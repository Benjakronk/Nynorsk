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
  python tools/pikselkunst/portrett.py hol           finn hol og hakk i hår og hovudplagg (runde 84)

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
    # Runde 81: dei andre portretta i FF6-stil (seks tonar i huda, tonen 0 er omrisset)
    "hud_br6":  ["#4a2224", "#8a4a3a", "#b8724e", "#dc9c74", "#f0c49c", "#fce0c4"],
    "hud_ba6":  ["#522430", "#9a5448", "#d08a6c", "#f2b494", "#fcd8bc", "#fff0e2"],
    "har_br6":  ["#34200e", "#664424", "#976c3a", "#c29854", "#e4c47c", "#f8e4a8"],
    "har_sy6":  ["#241210", "#4a2a1c", "#74462a", "#9c6a3e", "#c49058", "#e0b07c"],
    "stubb":    ["#3a2420", "#7a5040", "#a87a5c", "#cc9e7e"],
    "lade":     ["#120a06", "#24160c", "#342212", "#5a3c1e", "#c89a52"],
    "stove":    ["#140c08", "#24160e", "#382416", "#4e3420", "#6a4a2c"],
    "hud_gm6":  ["#462430", "#86565a", "#b88478", "#dcac94", "#f0ccb4", "#fce8d8"],
    "hud_bl6":  ["#3e2a3c", "#7a5a6a", "#b0949c", "#d8c0c0", "#f0e2de", "#fff8f4"],
    "har_kv6":  ["#302a3e", "#5e5870", "#9a96aa", "#cac8d6", "#ecebf2", "#ffffff"],
    "har_sv6":  ["#06040c", "#121020", "#221e36", "#383452", "#56527a", "#8480a8"],
    "spegel":   ["#06060e", "#0e0e1c", "#18182c", "#262640", "#3a3a5a"],
    "kalk":     ["#4a4e5e", "#7a8090", "#b4b8c4", "#d2d4da", "#f4f2e8"],
    "kveld":    ["#1a1020", "#3a2040", "#7a3a4a", "#c06a48", "#f0a860"],
    "himmel":   ["#3a5a8a", "#6a86a8", "#8ab0d8", "#b8d4ee", "#f4f8ff"],
    "hud_ve6":  ["#18241e", "#34483e", "#587462", "#809c84", "#a8c0a4", "#cce0c4"],
    "haug":     ["#080604", "#16120c", "#241c12", "#3e2e1a", "#6a8a48"],
    "iris_is":  ["#101a26", "#2a4458", "#6a9ab4", "#a8d4e8", "#e4f6ff"],   # runde 84: kaldt, isblått (den framande)
    # Runde 85: eigne augefargar, så irisen ikkje er den same lyseblå hos alle
    "iris_gr":  ["#14161c", "#383e46", "#646e78", "#96a2aa", "#ccd6dc"],   # grå (storebror)
    "iris_bg":  ["#121824", "#2a3c56", "#4e6c90", "#7c9cc0", "#b8cce2"],   # blågrå (presten)
    "iris_pg":  ["#1c1e24", "#50565e", "#80888e", "#adb5ba", "#dce2e6"],   # bleik grå (den gamle mannen)
    "iris_hz":  ["#1a0e06", "#4a2a10", "#7a5020", "#a8803c", "#d4b070"],   # hasselbrun (grannen)
    "iris_hg":  ["#141a0e", "#34401e", "#5e7038", "#8ea05a", "#c4d08e"],   # olivengrøn (bygdekvinna)
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


# ---------------------------------------------------------------- felles delar i FF6-stil (runde 81)
# Andlet i tre kvart framanfrå med ljoset frå høgre, som Huldra og Ivar: ei stor lys flate, ei smal
# mellomtone og ei jamn skuggeside som følgjer kjeven. Hudrampene har seks tonar (0 er omrisset).
def andlet(P, hud, kantar, kinn=(21, 31), haka=None):
    """Fyller andletet rad for rad (kantar: y -> (venstre, høgre)). kinn: radene der kinnet bular
    ut (breiare skuggeside). haka: (x0, x1, y) for lys på hakespissen."""
    for y, (xa, xb) in kantar.items():
        k = 1 if kinn[0] <= y <= kinn[1] else 0
        for x in range(xa, xb + 1):
            t = 2 if x < xa + 2 + k else 3 if x < xa + 4 + k else 4
            if y >= kinn[1] and x < xa + 4 + (y - kinn[1]) // 2: t = min(t, 3)   # under kinnbeinet
            P.p(x, y, (hud, t))
    y1 = max(kantar)
    for x in range(kantar[y1][0], kantar[y1][1] + 1): P.p(x, y1, (hud, 3))     # undersida av haka
    if haka: P.linje([(haka[0], haka[2]), (haka[1], haka[2])], (hud, 5))


def nase34(P, hud, x, y0, y1):
    """Nase i tre kvart framanfrå som peikar mot høgre: skuggesida til venstre frå mellom auga ned
    til tippen, kort lys rygg, nasebor og skugge under."""
    P.linje([(x, y0), (x, y1 - 3), (x + 1, y1 - 1)], (hud, 3))
    P.linje([(x + 2, y1 - 3), (x + 2, y1 - 1)], (hud, 5))
    P.p(x + 1, y1, (hud, 2)); P.linje([(x + 2, y1 + 1), (x + 3, y1 + 1)], (hud, 3)); P.p(x + 4, y1, (hud, 3))


def oyre(P, hud, x, y):
    """Øyret til venstre for andletet (5 x 9): lys kant, indre form og skugge."""
    P.rute(x, y, [" RRr ", "Rriii", "Ridii", "ridii", "riidi", "rriii", " rrii", "  rri", "   r "],
           {"R": (hud, 4), "r": (hud, 3), "i": (hud, 2), "d": (hud, 1)})


def hals(P, hud, x0, x1, y0, y1=42):
    """Halsen i skugge under haka, lysare stripe mot høgre."""
    P.poly([(x0, y0), (x1, y0), (x1, y1), (x0, y1)], (hud, 2))
    P.poly([(x1 - 3, y0 + 3), (x1, y0 + 3), (x1, y1), (x1 - 2.5, y1)], (hud, 3))
    P.poly([(x0, y0 + 1), (x1, y0 + 2.5), (x1, y0 + 4.5), (x0, y0 + 3.5)], (hud, 1))


AUGE_F = lambda har, hud, iris: {"L": (har, 0), "l": (hud, 2), "w": ("augekvit", 3), "v": ("augekvit", 2),
                                 "p": (iris, 0), "i": (iris, 1), "m": (iris, 2), "g": (iris, 3),
                                 "G": (iris, 4), "h": ("augekvit", 4), "r": (hud, 3), "k": (hud, 2), "d": (hud, 1)}


# ---------------------------------------------------------------- hovudformer (runde 84)
# Kvar person har si eiga andletsform, ikkje same omriss med anna hår. kant() lagar kantane rad for
# rad (y -> (venstre, høgre)) ut frå nokre få mål, og ujamn / tillegg kan flytte enkeltrader for hand.
def kant(y0, y1, xl, xr, krune=5, kjeve=0.62, form="rund", hake=(24, 30), kinn=None, kinn_ut=0,
         kinn_inn=0, ujamn=None):
    """Andletsomriss i tre kvart mot høgre.
    y0, y1: øvst i panna og nedst på haka. xl, xr: breiaste venstre og høgre kant (kinnbeina).
    krune: kor mange rader issen rundar seg over (fleire gir rundare, lægre gir flatare panne).
    kjeve: kor langt nede (0 til 1) kjeven byrjar å gå inn mot haka.
    form: «kantete» (kjeven held breidda lenge og knekkjer så), «rund» (sirkelboge), «oval» (jamn) eller
    «spiss» (nesten rett line inn til ei smal hake). hake: venstre og høgre kant nedst på haka.
    kinn: (ya, yb) radene der kinna bular ut (kinn_ut pikslar) eller er innsokne (kinn_inn, berre
    høgre side, den som vender mot ljoset). ujamn: {y: (dl, dr)} flyttar enkeltrader (knudrete form)."""
    k = {}
    ky = y0 + kjeve * (y1 - y0)
    r = (xr - xl) / 2
    for y in range(y0, y1 + 1):
        a, b = float(xl), float(xr)
        i = y - y0
        if i < krune:                                                       # issen rundar seg
            t = (krune - i - 0.5) / krune
            inn = r * 0.62 * (1 - math.sqrt(max(0.0, 1 - t * t)))
            a += inn; b -= inn
        if y > ky:
            u = (y - ky) / (y1 - ky)
            f = {"kantete": u ** 2.6, "rund": 1 - math.sqrt(max(0.0, 1 - u * u)), "oval": u ** 1.5,
                 "spiss": u ** 0.9}[form]
            a = a + (hake[0] - xl) * f; b = b - (xr - hake[1]) * f
        if kinn and kinn[0] <= y <= kinn[1]:
            m = math.sin(math.pi * (y - kinn[0] + 0.5) / (kinn[1] - kinn[0] + 1))
            a -= kinn_ut * m; b += kinn_ut * m
            b -= kinn_inn * m
        if ujamn and y in ujamn: a += ujamn[y][0]; b += ujamn[y][1]
        k[y] = (int(round(a)), int(round(b)))
    return k


def auge(P, har, hud, iris, naer, fjern, xn, yn, xf, yf, bryn=None, tjukk=0):
    """Auga og bryna: naer og fjern er handteikna rutenett (sjå AUGE_F for teikna), xn, yn og xf, yf
    øvre venstre hjørne. bryn: (nært, fjernt) som punktliner i den mørke hårtonen; tjukk=1 gir
    to pikslar tjukke bryn i den indre halvdelen."""
    f = AUGE_F(har, hud, iris)
    rute_k(P, xn, yn, naer, f); rute_k(P, xf, yf, fjern, f)
    if bryn:
        bn, bf = bryn
        c = (har, 1) if har != "har_kv6" else (har, 2)
        P.linje(bn, c); P.linje(bf, c)
        if tjukk:
            P.linje([(x, y + 1) for x, y in bn[-2:]], c); P.linje([(x, y + 1) for x, y in bf[:2]], c)


def bak_fyll(P, mat, rader):
    """Bakgrunn i band: rader er ei liste (y_til, tone); kvart band går til og med y_til."""
    P.bak = [[None] * W for _ in range(H)]
    y0 = 0
    for yt, t in rader:
        for y in range(y0, min(H, yt + 1)):
            for x in range(W): P.bak[y][x] = (mat, t)
        y0 = yt + 1


def bak_p(P, x, y, c):
    if 0 <= x < W and 0 <= y < H: P.bak[y][x] = c


def bak_poly(P, pts, c):
    """Polygon i bakgrunnslaget."""
    lag = P.g; P.g = P.bak; P.poly(pts, c); P.g = lag


def bak_linje(P, pts, c):
    lag = P.g; P.g = P.bak; P.linje(pts, c); P.g = lag


# ---------------------------------------------------------------- personane
# Auga til Ivar etter kjensla: det nære (6 x 4 ved 19, 20) og det fjerne (5 x 4 ved 28, 20).
# Små, djupt liggjande auge under tunge augelok, som hos Ivar Aasen på fotografia.
IVAR_AUGE = {
    None:     (["LLLLLL", "LwwihL", "LwwmpL", " llll "],
               ["LLLLL", "wwihL", "wwmpL", " lll "]),
    "ivrig":  (["LLLLLL", "LwihhL", " wmpG ", "  ll  "],
               ["LLLLL", "wihhL", " mpG ", "  l  "]),
    "glad":   (["      ", " LLLL ", "L    L", "      "],
               ["     ", " LLL ", "L   L", "     "]),
    "nikk":   (["      ", "      ", "LLLLLL", "L    L"],
               ["     ", "     ", "LLLLL", "L   L"]),
    "trist":  (["      ", "LLLLLL", "LwmpwL", "  ll  "],
               ["     ", "LLLLL", "wmpwL", "  l  "]),
    "sint":   (["L     ", "LLLLLL", " LwhiL", "  ll  "],
               ["    L", "LLLLL", "LhiL ", "  l  "]),
    "sjokk":  ([" LLLL ", "LwwwwL", "LwhiwL", " wipw ", "  ll  "],
               ["LLLL ", "wwwwL", "whiwL", "wipw ", " ll  "]),
    "tenkje": (["LLLLLL", "LwhiwL", " wmww ", "  ll  "],
               ["LLLLL", "whiwL", " mww ", "  l  "]),
    "les":    (["      ", "      ", "LLLLLL", " wmp  "],
               ["     ", "     ", "LLLLL", " wmp "]),
}
# Bryna: rette og tunge, ytre enden litt ned (det alvorlege, litt tungsindige draget hos Aasen).
IVAR_BRYN = {
    None:     ([(19, 17), (22, 16), (24, 16)], [(28, 16), (31, 16), (33, 17)]),
    "ivrig":  ([(19, 17), (22, 16), (24, 16)], [(28, 16), (31, 16), (33, 17)]),
    "glad":   ([(19, 17), (22, 16), (24, 17)], [(28, 17), (31, 16), (33, 17)]),
    "nikk":   ([(19, 18), (24, 18)], [(28, 18), (33, 18)]),
    "trist":  ([(19, 19), (22, 18), (24, 16)], [(28, 16), (31, 18), (33, 19)]),
    "sint":   ([(19, 16), (22, 17), (24, 19)], [(28, 19), (31, 17), (33, 16)]),
    "sjokk":  ([(19, 16), (22, 15), (24, 15)], [(28, 15), (31, 15), (33, 16)]),
    "tenkje": ([(19, 18), (24, 18)], [(28, 16), (30, 15), (33, 16)]),
    "les":    ([(19, 18), (24, 18)], [(28, 18), (33, 18)]),
}


def ivar(P, k=None):
    """Ivar, om lag 19 år: ein ung Ivar Aasen (sjå fotografia frå 1871 til 1884 i konsept/).
    Langt, breitt og rektangulært andlet med høg panne og brei, kantete kjeve og haka, breie
    kinnbein, ei lang, rett og brei nase, lang overleppe og ein brei, rett munn, små, djupt
    liggjande auge under tunge augelok og rette bryn, store øyre. Ung hud og fyldigare kinn,
    mørkebrunt, ustyrleg hår med sideskil, fjørpenn oppå øyret, blå vadmålstrøye med
    ståkrage, kvit linskjorte og sekkeband av lêr. Tre kvart framanfrå, ljoset frå høgre."""
    hud, har, iris = "hud_iv", "har_iv", "iris_iv"
    # ---- trøya, skjorta og sekkebandet
    P.poly([(3, 48), (5, 44), (12, 41), (20, 40), (31, 40), (38, 41), (44, 45), (46, 48)], ("trøye", 2))
    P.poly([(3, 48), (5, 44), (12, 41), (16, 41), (13, 46), (11, 48)], ("trøye", 1))
    P.poly([(33, 41), (38, 41), (44, 45), (46, 48), (40, 48), (37, 44)], ("trøye", 3))
    P.linje([(38, 42), (42, 45)], ("trøye", 4))
    P.poly([(21, 40), (30, 40), (28.5, 46), (25.5, 48), (22.5, 46)], ("lin", 3))       # skjorta
    P.poly([(21, 40), (23, 40), (24.5, 47), (22.5, 46)], ("lin", 2))
    P.poly([(17, 39), (21, 38), (23.5, 42), (20, 45), (16.5, 42)], ("trøye", 3))       # ståkragen
    P.poly([(30, 38), (34, 39), (34.5, 42), (31, 45), (28, 42)], ("trøye", 3))
    P.linje([(18, 40), (20, 44)], ("trøye", 2)); P.linje([(33, 40), (33, 43)], ("trøye", 4))
    lokk(P, "laer", [(9, 42), (14, 44), (20, 47), (23, 48)], [2, 2, 2, 2])           # sekkebandet
    P.linje([(10, 41), (23, 48)], ("laer", 3)); P.p(16, 45, ("gull", 3)); P.p(17, 45, ("laer", 3))
    # ---- halsen, i skugge under haka
    P.poly([(20, 33), (31, 33), (31, 41), (20, 41)], (hud, 2))
    P.poly([(28, 37), (31, 37), (31, 41), (28.5, 41)], (hud, 3))
    P.poly([(20, 34), (24, 36), (32, 38), (32, 40), (20, 38)], (hud, 1))           # skuggen under kjeven og haka
    # ---- øyret: forma, med lys kant, indre form og skugge, bak kjeven i høgd med auga og nasa
    P.rute(10, 20, [" RRr ",
                    "Rriii",
                    "Ridii",
                    "ridii",
                    "riidi",
                    "rriii",
                    " rrii",
                    "  rri",
                    "   r "], {"R": (hud, 4), "r": (hud, 3), "i": (hud, 2), "d": (hud, 1)})
    # ---- andletet: langt og breitt (breiast over kinnbeina og kjeven), høg panne, kantete hake.
    # Ljoset kjem frå høgre: ei stor lys flate med lys panne og kinnbein, mellomtone langs kinnbeinet
    # og under kjeven, og ei jamn skuggeside mot øyret.
    kantar = {9: (20, 31), 10: (18, 33), 11: (17, 34), 12: (16, 35), 13: (16, 35), 14: (16, 35), 15: (16, 35),
              16: (16, 35), 17: (16, 35), 18: (16, 35), 19: (16, 35), 20: (15, 36), 21: (15, 36), 22: (15, 36),
              23: (15, 36), 24: (15, 36), 25: (15, 36), 26: (15, 36), 27: (15, 36), 28: (15, 36), 29: (15, 36),
              30: (15, 36), 31: (15, 36), 32: (16, 35), 33: (17, 35), 34: (18, 34), 35: (19, 34), 36: (21, 33),
              37: (22, 33), 38: (24, 32)}
    for y, (xa, xb) in kantar.items():
        for x in range(xa, xb + 1):
            kinn = 1 if 21 <= y <= 31 else 0
            t = 2 if x < xa + 3 + kinn else 3 if x < xa + 5 + kinn else 4
            if 27 <= y <= 34 and x < xa + 5 + (y - 27) // 2: t = min(t, 3)       # under kinnbeinet
            if y >= 35 and x < 24: t = 2                                          # kjeven på skuggesida
            elif y == 38: t = 3                                                   # undersida av haka
            P.p(x, y, (hud, t))
    # haka: brei og firkanta, stikk litt fram, med lys på hakespissen og ei grop under underleppa
    P.poly([(28, 35), (31, 35), (31.5, 37), (28.5, 37)], (hud, 5)); P.linje([(26, 34), (29, 34)], (hud, 3))
    P.poly([(28, 10.5), (31, 10.5), (33, 12), (33.5, 14), (29, 14.5), (27.5, 12.5)], (hud, 5))   # lys på panna
    P.poly([(30, 23), (34, 23), (34.5, 25), (31, 25)], (hud, 5))                  # lys på kinnbeinet
    P.linje([(18, 19), (25, 19)], (hud, 3)); P.linje([(27, 19), (34, 19)], (hud, 3))   # skugge under bryna
    P.linje([(18, 20), (18, 22)], (hud, 3))                                       # augeholet ytst
    # nasa: lang, rett og brei, og peikar same veg som andletet (mot høgre). Ryggen går frå mellom auga
    # ned og litt mot høgre til tippen; skuggesida ligg til venstre, nasebor og skugge under tippen.
    P.linje([(26, 21), (26, 25), (27, 28)], (hud, 3)); P.linje([(28, 25), (28, 27)], (hud, 5))
    P.p(27, 29, (hud, 2)); P.linje([(28, 30), (29, 30)], (hud, 3)); P.p(30, 29, (hud, 3))
    if k in ("glad", "ivrig", "sint"):                                            # raudme
        P.linje([(20, 28), (22, 28)], ("kinn_iv", 2)); P.linje([(31, 27), (33, 27)], ("kinn_iv", 2))
    for (x, y) in [(22, 27), (23, 25), (31, 28), (33, 26)]:                       # fregner
        P.p(x, y, (hud, 3))
    # ---- auga og bryna etter kjensla
    f = {"L": (har, 0), "l": (hud, 2), "w": ("augekvit", 3), "v": ("augekvit", 2), "p": (iris, 0),
         "i": (iris, 1), "m": (iris, 2), "g": (iris, 3), "G": (iris, 4), "h": ("augekvit", 4)}
    naer, fjern = IVAR_AUGE[k]
    rute_k(P, 19, 20, naer, f); rute_k(P, 28, 20, fjern, f)
    bn, bf = IVAR_BRYN[k]
    P.linje(bn, (har, 1)); P.linje(bf, (har, 1))
    if k in ("sint", "trist"):                                                    # tjukke bryn som ber kjensla
        P.linje([(x, y + 1) for x, y in bn[-2:]], (har, 1)); P.linje([(x, y + 1) for x, y in bf[:2]], (har, 1))
    if k == "tenkje": P.linje([(29, 16), (30, 16)], (har, 1))                     # det løfta brynet
    if k == "trist": P.p(24, 24, ("augekvit", 4)); P.p(24, 25, ("augekvit", 3))    # ei tåre
    # ---- munnen: brei og rett, under ei lang overleppe
    M0, M1, M2 = ("munn_iv", 0), ("munn_iv", 1), ("munn_iv", 2)
    if k in ("glad", "ivrig"):                                                    # ope smil med tenner
        P.poly([(23, 31.5), (32, 31.5), (30.5, 34.5), (24.5, 34.5)], M0)
        P.linje([(24, 32), (30, 32)], ("lin", 4)); P.linje([(26, 34), (29, 34)], M2)
    elif k == "trist":                                                            # munnvikane ned
        P.p(24, 33, M1); P.linje([(25, 32), (29, 32)], M1); P.p(30, 33, M1)
    elif k == "sint":                                                             # bit tennene saman
        P.poly([(24, 31.5), (31, 31.5), (31, 33.5), (24, 33.5)], M0); P.linje([(25, 32), (30, 32)], ("lin", 4))
    elif k == "sjokk":
        P.poly([(25.5, 31.5), (29.5, 31.5), (29.5, 34.5), (25.5, 34.5)], M0); P.linje([(26, 34), (28, 34)], M2)
    elif k == "tenkje":                                                           # munnen trekt til sida
        P.linje([(27, 32), (29, 32)], M1); P.p(30, 31, M1)
    elif k == "nikk":
        P.p(23, 31, M1); P.linje([(24, 32), (30, 32)], M1); P.p(31, 31, M1)
    elif k == "les":
        P.linje([(24, 32), (30, 32)], M1); P.linje([(25, 33), (28, 33)], M2)
    else:                                                                         # nøytral: eit lite, nysgjerrig smil
        P.linje([(24, 32), (29, 32)], M1); P.p(30, 31, M1); P.linje([(25, 33), (28, 33)], M2)
    # ---- håret: mørkebrunt og ustyrleg, sideskil, høg panne
    harflak(P, har, [(20, 1), (12, 4), (8, 10), (9, 16), (11, 20)],
            [(23, 4), (18, 7), (16, 11), (16, 15), (16, 19)], 4, 2.3, (0.15, 0.3), bolgje=(0.6, 9, 0.0))
    # fjørpennen: over øyret, stukken inn i håret på sida, og peikar bakover og opp bort frå andletet
    P.linje([(15, 20), (11, 17)], ("kvit", 2))
    lokk(P, "kvit", [(11, 17), (7, 13), (4, 8), (3, 5)], [1.1, 2.0, 1.8, 0.5])
    P.linje([(10, 16), (4, 7)], ("kvit", 4))
    lokk(P, har, [(18, 13), (16, 17), (15, 19)], [1.8, 1.6, 0.6], (0.0, 0.3))     # hårlokken over pennerota
    harflak(P, har, [(21, 1), (28, 0), (35, 2), (38, 7), (38, 14)],
            [(21, 5), (27, 6), (32, 8), (35, 11), (36, 16)], 3, 2.3, (0.12, 0.32), bolgje=(0.5, 8, 1.0), ytre_mork=False)
    for pts, w in [([(21, 4), (23, 8), (24, 11)], 1.8), ([(24, 4), (28, 7), (30, 10)], 2.0),
                   ([(27, 4), (31, 7), (33, 11)], 1.8), ([(19, 4), (17, 8), (16, 12)], 1.8)]:   # luggen
        lokk(P, har, pts, [w * 0.7, w, 0.3], (0.0, 0.35))
    for pts, w in [([(22, 3), (20, -1), (18, -1)], 1.5), ([(24, 3), (27, -1), (30, -2)], 1.4),
                   ([(18, 4), (13, 1), (10, 1)], 1.4), ([(36, 6), (40, 4)], 1.2)]:              # tjafsar som står ut
        lokk(P, har, pts, [w, w * 0.8, 0.3][:len(pts)] if len(pts) == 3 else [w, 0.3], (0.0, 0.4))
    # ---- hender og ting som høyrer til kjensla
    if k == "tenkje":                                                             # handa under haka
        P.poly([(30, 41), (35, 39), (41, 48), (33, 48)], ("trøye", 3)); P.linje([(31, 42), (34, 48)], ("trøye", 1))
        P.poly([(24, 36), (31, 34.5), (34, 37), (33, 41), (26, 41.5)], (hud, 4))
        P.linje([(26, 38), (32, 37)], (hud, 3)); P.linje([(26, 40), (32, 39)], (hud, 3))
        P.linje([(24, 36), (26, 41)], (hud, 2))
    if k == "ivrig":                                                              # neven i været
        P.poly([(37, 33), (43, 31), (45, 37), (39, 39)], (hud, 4))
        P.linje([(38, 35), (44, 34)], (hud, 3)); P.linje([(38, 37), (39, 38)], (hud, 3))
        P.poly([(38, 39), (45, 37), (47, 48), (40, 48)], ("trøye", 3))
    if k == "les":                                                                # ei open bok nedst
        P.poly([(10, 41), (38, 41), (40, 48), (8, 48)], ("laer", 2))
        P.poly([(12, 42), (23, 43), (23, 48), (11, 48)], ("lin", 4)); P.poly([(25, 43), (36, 42), (37, 48), (25, 48)], ("lin", 3))
        for y in (44, 46): P.linje([(13, y), (21, y)], ("lin", 1)); P.linje([(27, y), (35, y)], ("lin", 1))
        P.poly([(6, 43), (11, 42), (11, 48), (6, 48)], (hud, 4)); P.poly([(37, 42), (42, 43), (42, 48), (37, 48)], (hud, 4))


# Kjensler i portretta (same namn som i figurarka). Kvar variant blir <namn>-<kjensle>.png.
PORTRETT_KJENSLER = {"ivar": ("glad", "trist", "sint", "sjokk", "tenkje", "nikk", "ivrig", "les"),
                     "huldra": ("glad", "trist", "sint", "sjokk", "tenkje", "nikk", "lokk", "sky")}


def storebror(P):
    """Storebror, om lag 20: har teke over garden etter far. Breitt, kantete andlet med sterk
    kjeve og skjeggstubb, stuttklypt sandfarga hår, rolege og alvorlege (men vakne) auge under
    tunge, rette bryn, eit strå frå løa i munnviken, open linskjorte og brun vest. Bak: veggen i løa, mørke
    ståande bord med ein lysstripe gjennom ei glipe."""
    hud, har, iris = "hud_br6", "har_br6", "iris_gr"
    P.hud = hud
    # ---- bakgrunnen: ståande bord i løa
    bak_fyll(P, "lade", [(47, 1)])
    for x in range(W):
        for y in range(H):
            if x % 7 == 0: bak_p(P, x, y, ("lade", 0))
            elif x % 7 in (1, 2): bak_p(P, x, y, ("lade", 2))
    for y in range(H): bak_p(P, 43, y, ("lade", 4)); bak_p(P, 44, y, ("lade", 3))   # lys gjennom glipa
    for y in range(38, H):                                                     # høy på golvet
        for x in range(W):
            if y > 41 + 2 * math.sin(x / 3.0): bak_p(P, x, y, ("gull", 1 if (x + y) % 5 else 2))
    # ---- skjorta og vesten
    P.poly([(0, 48), (2, 42), (10, 38), (22, 36), (30, 36), (38, 38), (46, 42), (48, 48)], ("lin", 3))
    P.poly([(0, 48), (2, 42), (10, 38), (13, 39), (9, 48)], ("lin", 2))
    P.poly([(21, 37), (30, 37), (28, 43), (25.5, 45), (23, 43)], (hud, 3))       # open skjorte, bringe
    P.poly([(21, 37), (23.5, 37), (24.5, 44), (23, 43)], (hud, 2))
    P.linje([(20, 37), (25, 45), (31, 37)], ("lin", 2))
    P.poly([(2, 48), (4, 42), (11, 39), (16, 40), (18, 48)], ("brun", 2))       # vesten
    P.poly([(32, 40), (38, 39), (45, 43), (47, 48), (33, 48)], ("brun", 3))
    P.linje([(33, 40), (34, 48)], ("brun", 4)); P.linje([(16, 41), (17, 48)], ("brun", 1))
    # ---- hals, øyre og andlet: breitt og kantete
    hals(P, hud, 19, 32, 33)
    oyre(P, hud, 9, 20)
    # breitt, kantete andlet: kjeven held breidda langt ned og knekkjer brått inn mot ei brei hake
    kantar = kant(9, 38, 14, 37, krune=4, kjeve=0.72, form="kantete", hake=(21, 33))
    andlet(P, hud, kantar, kinn=(21, 31))
    P.poly([(28, 11), (32, 11), (33.5, 14), (29, 14)], (hud, 5))                 # lys på panna
    P.poly([(31, 23), (35, 23), (35.5, 25), (32, 25)], (hud, 5))                 # og kinnbeinet
    # skjeggstubb: kjeven og haka i ein mørkare, gråare tone (rolig flate, ikkje prikkar)
    for y in range(30, 39):
        xa, xb = kantar[y]
        for x in range(xa, xb + 1):
            c = P.get(x, y)
            if c and c[0] == hud and (y >= 35 or (y >= 31 and (x < xa + 3 + (y - 31) or x > xb - 2 - (y - 31)))):
                P.p(x, y, ("stubb", 2 if c[1] <= 2 else 3))
    P.linje([(18, 19), (25, 19)], (hud, 3)); P.linje([(27, 19), (34, 19)], (hud, 3))   # faldet over auga
    # rolege, alvorlege auge: rett lok, men heile irisen syner, med glans (ikkje søvnige)
    auge(P, har, hud, iris, ["LLLLLL", "LwiphL", " wmGg ", "  ll  "], ["LLLLL", "wiphL", "wmGg ", " ll  "],
         19, 20, 28, 20)
    P.poly([(18, 17), (25, 17), (25, 18.5), (18, 18.5)], (har, 1))                 # tunge, rette bryn
    P.poly([(28, 17), (34, 17), (34, 18.5), (28, 18.5)], (har, 1))
    nase34(P, hud, 26, 21, 29)
    P.linje([(24, 32), (30, 32)], ("munn_iv", 1)); P.linje([(25, 33), (28, 33)], ("munn_iv", 2))
    P.linje([(30, 32), (38, 29)], ("gull", 3)); P.p(39, 28, ("gull", 4))         # strået
    # ---- stuttklypt, sandfarga hår med rett lugg
    harflak(P, har, [(19, 2), (12, 5), (9, 11), (9, 16), (11, 20)],
            [(22, 4), (18, 7), (16, 11), (16, 15), (16, 19)], 3, 2.2, (0.15, 0.3), bolgje=(0.3, 9, 0.0))
    harflak(P, har, [(20, 2), (28, 1), (35, 3), (38, 8), (38, 13)],
            [(21, 5), (27, 6), (32, 8), (35, 11), (36, 15)], 3, 2.2, (0.12, 0.35), bolgje=(0.3, 8, 1.0), ytre_mork=False)
    for x0 in (18, 21, 24, 27, 30, 33):                                          # rett, kort lugg
        lokk(P, har, [(x0 + 1, 5), (x0, 8), (x0, 10)], [1.4, 1.4, 0.4], (0.0, 0.3))


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
    """Den framande: embetsmann frå byen, spegelfiguren. Høfleg og litt uhyggeleg: høg flosshatt
    som går ut av ruta, runde briller der det nære glaset blenkjer kvitt og gøymer auget, bleikt,
    kantete andlet med innsokne kinn, eit tynt smil som berre går opp i den eine munnviken, svart,
    glatt hår, stiv kvit krage med svart halsbind og gullnål. Bak: kaldt mørker med ein blank
    stripe, som i ein spegel."""
    hud, har, iris = "hud_bl6", "har_sv6", "iris_b"
    P.hud = hud
    bak_fyll(P, "spegel", [(47, 1)])
    for y in range(H):
        for x in range(W):
            d = abs(x - 34 + (y - 24) * 0.3)
            if ((x - 25) / 20) ** 2 + ((y - 4) / 12) ** 2 < 1: bak_p(P, x, y, ("spegel", 2))   # kald dis bak hatten
            if d < 7: bak_p(P, x, y, ("spegel", 2))
            if d < 3: bak_p(P, x, y, ("spegel", 3))
            if d < 1: bak_p(P, x, y, ("spegel", 4))
    # ---- frakken, kragen og halsbindet
    P.poly([(2, 48), (5, 41), (14, 37), (22, 37), (32, 37), (42, 41), (46, 48)], ("svart", 2))
    P.poly([(2, 48), (5, 41), (14, 37), (15, 48)], ("svart", 1))
    P.poly([(14, 38), (20, 39), (18, 48), (12, 48)], ("svart", 3))                  # slaga
    P.poly([(31, 39), (37, 38), (39, 48), (33, 48)], ("svart", 4))
    hals(P, hud, 22, 30, 33, 39)
    P.poly([(19, 35), (24, 39), (23, 44), (21, 44)], ("kvit", 3))                   # kragesnippar
    P.poly([(31, 35), (26, 39), (27, 44), (29, 44)], ("kvit", 4))
    P.poly([(22, 39), (28, 39), (27, 45), (23, 45)], ("svart", 1))                  # halsbind
    P.p(25, 41, ("gull", 4)); P.p(25, 42, ("gull", 2))
    P.poly([(16, 24), (21, 27), (23, 36), (17, 36)], (har, 1))                   # nakkehåret bak den smale kjeven
    oyre(P, hud, 12, 19)
    # ---- andletet: tynt og langt, innsokne kinn under skarpe kinnbein, og ei spiss hake
    kantar = kant(11, 38, 17, 34, krune=3, kjeve=0.5, form="spiss", hake=(26, 28), kinn=(24, 33), kinn_inn=1.4)
    andlet(P, hud, kantar, kinn=(20, 26))
    P.linje([(31, 25), (30, 28), (30, 31)], (hud, 3))                           # innsokne kinn: skugge under kinnbeinet
    P.linje([(21, 26), (21, 31)], (hud, 2))
    P.poly([(30, 22), (34, 22), (34.5, 24), (31, 24)], (hud, 5))                 # skarpt kinnbein
    # brillene: det nære glaset blenkjer, det fjerne auget er smalt og kaldt
    P.poly([(18, 19), (25, 19), (25.5, 23), (24, 25), (19, 25), (17.5, 23)], ("glas", 3))
    P.poly([(19, 20), (22, 20), (19, 23)], ("glas", 4)); P.linje([(23, 23), (24, 22)], ("glas", 4))
    P.linje([(18, 19), (25, 19)], ("svart", 1)); P.linje([(17, 22), (19, 25), (24, 25), (26, 22)], ("svart", 1))
    P.linje([(26, 21), (28, 21)], ("svart", 1))
    rute_k(P, 28, 20, ["LLLLL", "LGpgL", " lll "], AUGE_F(har, hud, "iris_is"))   # smalt, kaldt, isblått auge
    P.linje([(28, 19), (33, 19)], ("glas", 2)); P.linje([(33, 19), (34, 24)], ("glas", 2)); P.linje([(28, 25), (33, 25)], ("glas", 2))
    P.linje([(18, 17), (22, 16), (25, 16)], (har, 2)); P.linje([(28, 16), (31, 16), (34, 15)], (har, 2))   # skarpe bryn
    nase34(P, hud, 26, 21, 29)
    P.linje([(24, 32), (29, 32)], ("munn", 1)); P.p(30, 31, ("munn", 1)); P.p(31, 30, ("munn", 1))   # tynt smil
    # ---- svart, glatt hår under hatten
    lokk(P, har, [(19, 10), (17, 16), (16, 22)], [2.2, 2.0, 1.0], (0.1, 0.4))
    lokk(P, har, [(34, 10), (36, 14), (36, 18)], [1.8, 1.6, 0.6], (0.1, 0.4))
    # ---- flosshatten: høg pipe som går ut av ruta, hattband og brei brem
    P.poly([(14, -1), (36, -1), (35, 9), (15, 9)], ("svart", 2))
    P.poly([(28, -1), (34, -1), (33.5, 9), (28.5, 9)], ("svart", 3)); P.linje([(31, 0), (31, 8)], ("svart", 4)); P.linje([(32, 0), (32, 8)], ("svart", 4))
    P.poly([(15, 6), (35, 6), (35, 9), (15, 9)], ("raud", 1))
    P.poly([(7, 11), (13, 9), (37, 9), (42, 11), (38, 13), (11, 13)], ("svart", 2))
    P.linje([(10, 10), (40, 10)], ("svart", 4))


def presten(P):
    """Presten: dansk-utdanna embetsmann i femtiåra, verdig og uroleg. Høg, blank panne med kvitt
    hår strøke bakover på sidene, buskute kvite bryn med den indre enden løfta, rynker i panna,
    lang, rett nase, smal munn med djupe furer, og ein stor, kvit pipekrage over den svarte
    prestekjolen. Bak: den kvitkalka kyrkjeveggen med eit rundboga vindauge i lyset."""
    hud, har, iris = "hud_gm6", "har_kv6", "iris_bg"
    P.hud = hud
    bak_fyll(P, "kalk", [(35, 2), (47, 1)])
    for y in range(36, H):
        for x in range(W):
            if x % 8 == 0: bak_p(P, x, y, ("kalk", 0))                         # brystpanel
    bak_poly(P, [(38, 4), (44, 4), (46, 7), (46, 28), (36, 28), (36, 7)], ("kalk", 4))   # vindauget
    bak_linje(P, [(41, 4), (41, 28)], ("kalk", 3)); bak_linje(P, [(36, 16), (46, 16)], ("kalk", 3))
    for y in range(4, 34):
        for x in range(30, 48):
            if P.bak[y][x] == ("kalk", 2) and (x - 30) + (y - 4) // 3 > 9 and (x + y) % 3: bak_p(P, x, y, ("kalk", 3))
    # ---- kjolen og pipekragen
    P.poly([(0, 48), (3, 43), (12, 40), (36, 40), (46, 44), (48, 48)], ("svart", 2))
    P.poly([(0, 48), (3, 43), (12, 40), (14, 48)], ("svart", 1))
    hals(P, hud, 22, 30, 33, 38)
    ellipse(P, 25, 41, 16, 6, ("kvit", 3))
    for x in range(10, 41, 2):
        dy = abs(x - 25) // 6
        P.linje([(x, 37 + dy), (x, 45 - dy)], ("kvit", 2 if (x // 2) % 2 else 4))
    P.linje([(11, 43), (25, 47), (39, 43)], ("kvit", 2))
    oyre(P, hud, 12, 20)
    # ---- andletet: langt og smalt, med høg, blank panne og ei smal, lang hake
    kantar = kant(3, 37, 17, 34, krune=8, kjeve=0.68, form="oval", hake=(24, 30))
    andlet(P, hud, kantar, kinn=(21, 31))
    P.poly([(26, 4), (31, 5), (33, 9), (28, 8)], (hud, 5))                       # blank panne
    P.linje([(21, 10), (30, 10)], (hud, 3)); P.linje([(22, 12), (30, 12)], (hud, 3))   # rynker i panna
    P.linje([(26, 14), (26, 16)], (hud, 3))                                      # bekymringsfura mellom bryna
    P.linje([(24, 30), (23, 34)], (hud, 3)); P.linje([(31, 30), (31, 33)], (hud, 3))   # djupe furer
    # bekymra auge: vide opne, loket hallar ned mot den ytre kroken, blikket litt opp, poser under
    auge(P, har, hud, iris, ["   LLL ", " LLiphL", "LwwmGgw", " rllll "], ["LLL  ", "iphLL", "mGgwL", " lll "],
         18, 20, 28, 20)
    P.poly([(18, 18.5), (22, 17.5), (25, 15), (25.5, 16.5), (22, 19), (18, 20)], (har, 2))   # buskute bryn, den indre enden løfta
    P.poly([(28, 15), (31, 17), (35, 18.5), (35, 20), (31, 18.5), (27.5, 16.5)], (har, 2))
    P.linje([(19, 18), (24, 16)], (har, 3)); P.linje([(29, 16), (34, 18)], (har, 3))
    nase34(P, hud, 26, 20, 30)
    P.p(23, 34, ("munn", 1)); P.linje([(24, 33), (29, 33)], ("munn", 1)); P.p(30, 34, ("munn", 1))   # smal munn
    # ---- kvitt hår strøke bakover på sidene
    harflak(P, har, [(19, 5), (13, 7), (10, 12), (9, 18), (11, 22)],
            [(21, 7), (17, 9), (16, 13), (16, 17), (16, 20)], 3, 2.0, (0.1, 0.4), bolgje=(0.4, 8, 0.0))
    lokk(P, har, [(33, 7), (36, 11), (37, 16)], [1.6, 1.6, 0.5], (0.1, 0.5))


def haugbonden(P):
    """Haugbonden: den gamle vetten i gravhaugen, gamal og jordnær. Grågrøn hud, stor mosegrodd
    hatt med vid brem som skuggar over auga, bleike, lysande auge i skuggen, ei svær nase, djupe
    rynker og eit langt, kvitt skjegg med røter og lav. Bak: inne i haugen, mørk jord med røter og
    eit svakt grønt lys."""
    hud, har = "hud_ve6", "har_kv6"
    P.hud = hud
    bak_fyll(P, "haug", [(47, 1)])
    for y in range(H):
        for x in range(W):
            if (x * 7 + y * 3) % 23 == 0: bak_p(P, x, y, ("haug", 2))           # jord og småstein
    for pts in [[(0, 8), (6, 12), (9, 20), (8, 30)], [(47, 4), (42, 10), (44, 18)], [(40, 30), (44, 36), (47, 40)],
                [(2, 34), (5, 40), (3, 47)]]:                                   # røter i jordveggen
        bak_linje(P, pts, ("haug", 3))
    for y in range(H):
        for x in range(W):
            if ((x - 24) / 22) ** 2 + ((y - 30) / 16) ** 2 < 1 and P.bak[y][x] == ("haug", 1): bak_p(P, x, y, ("haug", 2))
    for (x, y) in [(6, 26), (42, 22), (38, 8), (10, 6)]: bak_p(P, x, y, ("haug", 4))   # lys i mosen
    # ---- kappa
    P.poly([(0, 48), (2, 40), (10, 35), (38, 35), (46, 40), (48, 48)], ("graa", 2))
    P.poly([(0, 48), (2, 40), (10, 35), (12, 48)], ("graa", 1))
    P.poly([(38, 36), (46, 40), (48, 48), (42, 48)], ("graa", 3))
    # ---- andletet: breitt og knudrete, med kinnbein og kjakar som stikk ut som knortar på ei rot
    kantar = kant(12, 32, 13, 38, krune=2, kjeve=0.6, form="kantete", hake=(19, 32),
                  ujamn={13: (1, 0), 17: (-1, 0), 18: (-1, 1), 19: (0, 1), 21: (1, 0), 22: (1, -1), 24: (-1, 0),
                         25: (-1, 1), 26: (0, 1), 28: (1, 0)})
    andlet(P, hud, kantar, kinn=(19, 28))
    for y in range(12, 17):                                                     # skuggen under bremmen
        for x in range(12, 40):
            if P.get(x, y) and P.get(x, y)[0] == hud: P.p(x, y, (hud, 1 if y < 15 else 2))
    for (a, b) in [((17, 23), (21, 24)), ((33, 23), (35, 25)), ((16, 20), (17, 25)), ((21, 26), (23, 29)),
                   ((34, 18), (36, 19))]:
        P.linje([a, b], (hud, 2))                                               # djupe rynker
    P.linje([(18, 21), (21, 21)], (hud, 2)); P.linje([(31, 21), (33, 21)], (hud, 2))   # posar under auga
    # lysande, runde auge i skuggen under bremmen (bleike, men vakne)
    rute_k(P, 17, 17, [" ggg ", "gGhGg", " ggg "], {"g": ("iris_v", 2), "G": ("iris_v", 3), "h": ("iris_v", 4)})
    rute_k(P, 30, 17, [" gg ", "gGhg", " gg "], {"g": ("iris_v", 2), "G": ("iris_v", 3), "h": ("iris_v", 4)})
    # ---- langt, kvitt skjegg med røter og lav
    harflak(P, har, [(15, 28), (13, 35), (15, 42), (18, 48)], [(37, 28), (38, 35), (35, 42), (32, 48)], 6, 2.2,
            (0.05, 0.3), bolgje=(0.6, 8, 0.0), ytre_mork=False, lys=-0.1)
    lokk(P, har, [(19, 32), (24, 31.5), (27, 32)], [1.6, 1.8, 1.0], (0.0, 0.6))   # barten under nasa
    lokk(P, har, [(35, 32), (30, 31.5), (27, 32)], [1.6, 1.8, 1.0], (0.0, 0.6))
    for (x, y) in [(20, 38), (31, 36), (25, 43), (17, 33)]:                       # røter og lav
        P.linje([(x, y), (x + 2, y + 3), (x + 1, y + 5)], ("tre", 2)); P.p(x - 1, y, ("mose", 3)); P.p(x, y - 1, ("mose", 4))
    # den svære, knollete nasa, som heng ned over barten
    P.poly([(25, 18), (28, 18), (30, 23), (25, 23)], (hud, 4))                   # ryggen
    ellipse(P, 27.5, 27.5, 5, 3.6, (hud, 4))                                     # knollen
    P.poly([(22.5, 23), (25.5, 20), (25.5, 31), (23, 30)], (hud, 2))             # skuggesida
    P.linje([(24, 19), (23, 22), (22, 25), (22, 29), (24, 31)], (hud, 1))        # mørk kant mot venstre
    P.linje([(24, 31), (31, 31)], (hud, 1)); P.p(32, 30, (hud, 1))
    P.p(25, 30, (hud, 0)); P.p(30, 30, (hud, 0))                                 # nasebor
    P.linje([(28, 20), (29, 23)], (hud, 5)); P.linje([(30, 25), (31, 27)], (hud, 5))   # ljos på ryggen og knollen
    # ---- den mosegrodde hatten med vid brem
    P.poly([(13, 0), (35, 0), (36, 10), (12, 10)], ("mose", 2))
    P.poly([(28, 0), (34, 0), (35, 10), (29, 10)], ("mose", 3))
    P.poly([(2, 13), (9, 9), (39, 9), (46, 13), (40, 15), (8, 15)], ("mose", 2))
    P.linje([(5, 11), (43, 11)], ("mose", 4)); P.linje([(8, 14), (40, 14)], ("mose", 1))
    for x in range(7, 44, 5): P.p(x, 12, ("mose", 3))
    P.p(26, 4, ("blom", 3)); P.p(27, 3, ("kvit", 4))                               # ein liten blome i mosen


def syster(P):
    """Syster, om lag ti år: rundt andlet, store auge, raude kinn, blått skaut med kvite prikkar
    knytt under haka, brune hårlokkar framom, og eit breitt smil med glugg i tanngarden. Raudt liv
    over kvit skjorte. Bak: tømmerveggen i stova i varmt lys frå grua."""
    hud, har, iris = "hud_ba6", "har_sy6", "iris_iv"   # brune auge som Ivar (sysken)
    P.hud = hud
    bak_fyll(P, "stove", [(47, 2)])
    for y in range(H):
        for x in range(W):
            if y % 7 == 0: bak_p(P, x, y, ("stove", 0))                        # liggjande tømmer
            elif y % 7 == 1: bak_p(P, x, y, ("stove", 3))
            elif y % 7 == 6: bak_p(P, x, y, ("stove", 1))
    for y in range(H):                                                          # varmt lys frå grua til høgre
        for x in range(36, W):
            c = P.bak[y][x]
            if c[1] in (2, 3) and (x - 36) + abs(y - 30) // 2 > 3: bak_p(P, x, y, ("stove", min(4, c[1] + 1)))
    # ---- livet og skjorta
    P.poly([(7, 48), (10, 43), (17, 40), (31, 40), (38, 43), (41, 48)], ("raud", 3))
    P.poly([(7, 48), (10, 43), (15, 41), (14, 48)], ("raud", 2))
    P.poly([(17, 40), (31, 40), (29, 44), (19, 44)], ("lin", 4))
    for y in range(41, 48, 2): P.p(23, y, ("raud", 1)); P.p(25, y + 1, ("raud", 1))   # snøring
    hals(P, hud, 21, 29, 33, 41)
    # ---- skautet bak hovudet (andletet blir teikna oppå)
    P.poly([(9, 30), (10, 16), (15, 8), (24, 5), (33, 7), (38, 13), (40, 22), (38, 31), (35, 36), (14, 36)], ("skaut_b", 3))
    P.poly([(9, 30), (10, 16), (15, 8), (17, 9), (13, 18), (13, 32), (14, 36)], ("skaut_b", 2))
    P.poly([(30, 7), (35, 9), (38, 14), (35, 12)], ("skaut_b", 4))
    # ---- andletet: rundt barneandlet, kort hake og runde kinn som bular ut
    kantar = kant(13, 35, 16, 35, krune=7, kjeve=0.5, form="rund", hake=(23, 29), kinn=(23, 33), kinn_ut=1)
    andlet(P, hud, kantar, kinn=(22, 31))
    P.linje([(18, 29), (21, 29)], ("kinn", 3)); P.linje([(31, 29), (34, 29)], ("kinn", 3))   # raude kinn
    # store, runde og glade auge med glans: det nedre loket bular litt opp (smilet når auga)
    auge(P, har, hud, iris, [" LLLLL ", "LLwiphL", " wwmGgw", "  lgGl "],
         [" LLLL", "LiphL", "wmGgw", " lgl "], 18, 21, 28, 21,
         bryn=([(18, 19), (20, 17), (23, 17), (24, 18)], [(28, 18), (30, 17), (32, 17), (33, 18)]))
    nase34(P, hud, 26, 25, 29)
    P.p(23, 31, ("munn_iv", 1)); P.p(31, 31, ("munn_iv", 1))                    # breitt, ope smil med glugg
    P.linje([(24, 32), (30, 32)], ("munn_iv", 0)); P.p(26, 32, ("lin", 4)); P.p(28, 32, ("lin", 4))
    P.linje([(25, 33), (29, 33)], ("munn_iv", 2))
    # ---- brune hårlokkar under skautet, og kanten på skautet over panna
    P.poly([(16, 17), (19, 14), (24, 13), (30, 13), (34, 15), (35, 18), (32, 16), (27, 15), (21, 16), (18, 19)], (har, 3))
    P.linje([(19, 16), (23, 14)], (har, 4)); P.linje([(28, 15), (32, 16)], (har, 2))
    P.poly([(16, 16), (17, 21), (16, 26), (15, 22)], (har, 2))                  # lokk framom øyret
    P.poly([(15, 14), (19, 10), (27, 9), (34, 11), (37, 15), (35, 15), (30, 12), (22, 12), (17, 16)], ("skaut_b", 4))
    for (x, y) in [(18, 8), (26, 7), (32, 9), (12, 20), (22, 10), (37, 20), (11, 27)]:   # kvite prikkar
        P.p(x, y, ("kvit", 4))
    # ---- knuten under haka
    P.poly([(24, 35), (30, 35), (29, 39), (26, 40)], ("skaut_b", 3))
    P.poly([(26, 38), (22, 43), (25, 42)], ("skaut_b", 2)); P.poly([(28, 38), (31, 43), (29, 42)], ("skaut_b", 4))


def granne(P):
    """Grannen: gamal og godlynt. Skalla med kvit hårkrans, tjukt kvitt skjegg og bart, rundt og fyldig
    andlet, opne, vennlege auge med smilerynker, raud nase, og ei kritpipe i munnviken med røyk som stig opp. Grå vadmålstrøye.
    Bak: tunet om kvelden, varm himmel over eit torvtak."""
    hud, har, iris = "hud_gm6", "har_kv6", "iris_hz"
    P.hud = hud
    bak_fyll(P, "kveld", [(8, 1), (16, 2), (24, 3), (47, 4)])
    for x in range(W):                                                          # torvtaket
        top = 30 - int(10 * max(0, 1 - abs(x - 12) / 22))
        for y in range(top, H): bak_p(P, x, y, ("kveld", 0))
        if 0 <= top - 1: bak_p(P, x, top - 1, ("gronn", 1))
    # ---- trøya
    P.poly([(2, 48), (5, 41), (14, 37), (34, 37), (43, 41), (46, 48)], ("graa", 3))
    P.poly([(2, 48), (5, 41), (14, 37), (15, 48)], ("graa", 2))
    P.poly([(34, 38), (43, 41), (46, 48), (40, 48)], ("graa", 4))
    oyre(P, hud, 9, 19)
    # rundt og fyldig: stor, rund skalle og runde kjakar som bular ut over skjegget
    kantar = kant(5, 34, 14, 37, krune=9, kjeve=0.7, form="rund", hake=(21, 32), kinn=(20, 32), kinn_ut=1)
    andlet(P, hud, kantar, kinn=(20, 30))
    P.poly([(25, 6), (31, 7), (34, 11), (27, 9)], (hud, 5))                       # blank skalle
    # vennlege, opne auge som smiler: det nedre loket bular opp, smilerynker og posar under
    auge(P, har, hud, iris, [" LLLL ", "LwiphL", "rlmGgl", "r rrr "], ["LLLL ", "iphwL", "lmGlr", " rr r"],
         19, 20, 28, 20)
    P.linje([(17, 20), (18, 19)], (hud, 3)); P.linje([(34, 22), (35, 21)], (hud, 3))   # fleire smilerynker
    P.poly([(18, 18), (21, 16.5), (25, 17.5), (25, 18.5), (18, 19)], (har, 3))     # buskute, bogne bryn
    P.poly([(28, 17.5), (32, 16.5), (35, 18), (35, 19), (28, 18.5)], (har, 3))
    nase34(P, hud, 26, 21, 27)
    P.poly([(27, 25), (30, 25), (31, 27), (28, 28)], ("kinn", 2)); P.p(29, 25, ("kinn", 3))   # raud nase
    # ---- tjukt kvitt skjegg og bart
    harflak(P, har, [(15, 26), (14, 32), (16, 38), (21, 42), (24, 44)],
            [(37, 26), (37, 32), (35, 38), (30, 42), (27, 44)], 5, 2.4, (0.05, 0.3), bolgje=(0.5, 7, 0.0), ytre_mork=False,
            lys=-0.1)
    lokk(P, har, [(22, 30), (26, 29), (28, 29)], [1.6, 1.8, 1.2], (0.0, 0.6))     # barten
    lokk(P, har, [(34, 30), (30, 29), (28, 29)], [1.6, 1.8, 1.2], (0.0, 0.6))
    P.linje([(25, 32), (29, 32)], ("munn", 1))
    # ---- kritpipa med røyk
    P.linje([(30, 32), (37, 33)], ("kvit", 3)); P.poly([(37, 30), (40, 30), (40, 34), (37, 34)], ("tre", 2))
    P.p(38, 31, ("raud", 4)); P.linje([(37, 30), (40, 30)], ("tre", 3))
    for (x, y) in [(39, 27), (40, 24), (39, 20), (41, 16)]: P.p(x, y, ("kvit", 3)); P.p(x + 1, y - 1, ("kvit", 2))   # røyk
    # ---- kvit hårkrans
    harflak(P, har, [(18, 9), (13, 11), (10, 15), (10, 19)], [(20, 10), (17, 12), (16, 15), (16, 18)], 2, 1.8,
            (0.1, 0.5), bolgje=(0.3, 6, 0.0))
    lokk(P, har, [(34, 11), (36, 14), (36, 18)], [1.6, 1.6, 0.5], (0.1, 0.5))


def budeia(P):
    """Budeia: sterk og blid, om lag atten. Raudt skaut knytt i nakken, lys flette over skuldra,
    breitt smil med tenner, raude kinn, oppbretta ermar og blått liv over kvit skjorte. Bak: setra
    med blå himmel, fjell med snø og grøn bakke."""
    hud, har, iris = "hud_iv", "har_hu", "iris_g"
    P.hud = hud
    bak_fyll(P, "himmel", [(6, 1), (14, 2), (47, 3)])
    for x in range(W):                                                          # fjell og bakke
        f = 24 - int(12 * max(0, 1 - abs(x - 34) / 14)) - int(6 * max(0, 1 - abs(x - 8) / 10))
        for y in range(f, H): bak_p(P, x, y, ("himmel", 1))
        for y in range(f, min(H, f + 3)): bak_p(P, x, y, ("himmel", 4))         # snø på toppane
        g = 34 + int(2 * math.sin(x / 6.0))
        for y in range(g, H): bak_p(P, x, y, ("gronn", 3 if y < g + 3 else 2))
    # ---- skjorta, livet og ermane
    P.poly([(4, 48), (7, 41), (15, 37), (33, 37), (41, 41), (44, 48)], ("lin", 3))
    P.poly([(4, 48), (7, 41), (13, 38), (12, 48)], ("lin", 2))
    P.poly([(14, 41), (34, 41), (33, 48), (15, 48)], ("blaa", 3))
    P.poly([(14, 41), (18, 41), (18, 48), (15, 48)], ("blaa", 2))
    P.linje([(34, 41), (33, 48)], ("blaa", 4))
    hals(P, hud, 21, 29, 32, 40)
    # ---- skautet bak hovudet og knuten i nakken
    P.poly([(11, 22), (12, 10), (18, 4), (27, 3), (35, 5), (38, 10), (38, 16), (13, 20)], ("raud", 3))
    P.poly([(11, 22), (12, 10), (18, 4), (15, 11), (14, 20)], ("raud", 2))
    P.poly([(6, 13), (11, 11), (12, 17), (7, 21), (5, 17)], ("raud", 2)); P.poly([(5, 20), (8, 19), (6, 26)], ("raud", 3))
    P.poly([(14, 26), (21, 28), (21, 38), (14, 38)], (har, 1))                   # håret i nakken, bak kjeven
    # ---- andletet: breitt og sunt, med runde, raude kinn og ei brei, mjuk hake
    kantar = kant(10, 35, 15, 36, krune=5, kjeve=0.6, form="rund", hake=(23, 31), kinn=(22, 32), kinn_ut=1)
    andlet(P, hud, kantar, kinn=(21, 30))
    P.poly([(30, 22), (34, 22), (34.5, 24), (31, 24)], (hud, 5))
    P.poly([(18, 26), (22, 26), (21.5, 28), (18.5, 28)], ("kinn", 3)); P.poly([(30, 26), (34, 26), (33.5, 28), (30.5, 28)], ("kinn", 3))
    # glade, opne auge: irisen syner heilt, det nedre loket bular opp av smilet
    auge(P, har, hud, iris, [" LLLLL ", "LwiphwL", " lmGgl ", "  lll  "], [" LLLL", "Liphw", "lmGgl", "  ll "],
         18, 20, 28, 20, bryn=([(18, 18), (20, 16), (23, 16), (24, 17)], [(28, 17), (30, 16), (32, 16), (33, 17)]))
    nase34(P, hud, 26, 21, 27)
    P.p(22, 29, ("munn_iv", 1)); P.p(32, 29, ("munn_iv", 1))                      # breitt smil med tenner
    P.linje([(23, 30), (31, 30)], ("lin", 4)); P.linje([(23, 30), (23, 30)], ("munn_iv", 1))
    P.linje([(24, 31), (30, 31)], ("munn_iv", 0)); P.linje([(25, 32), (29, 32)], ("munn_iv", 2))
    # ---- gullhår i panna under skautet, og kanten på skautet
    harflak(P, har, [(17, 15), (20, 11), (26, 10)], [(18, 17), (22, 13), (27, 12)], 2, 1.6, (0.1, 0.5), bolgje=(0.2, 6, 0))
    harflak(P, har, [(26, 10), (32, 10), (35, 14)], [(27, 12), (32, 12), (34, 16)], 2, 1.6, (0.1, 0.5), bolgje=(0.2, 6, 0))
    P.poly([(14, 15), (18, 9), (27, 7), (35, 9), (37, 13), (33, 11), (26, 9.5), (19, 11), (16, 16)], ("raud", 4))
    # ---- fletta over skuldra
    for i, y in enumerate(range(22, 46, 4)):
        x = 13 + i // 2
        P.poly([(x - 2, y), (x + 2, y), (x + 1.5, y + 4), (x - 2, y + 3)], (har, 3 if i % 2 else 2))
        P.p(x, y + 1, (har, 4)); P.p(x - 1, y + 3, (har, 1))
    P.poly([(14, 46), (18, 46), (17, 48), (14, 48)], ("raud", 3))


# ---------------------------------------------------------------- fellesansikt for bygdefolk
# Som dei generiske portretta i Fire Emblem: same stil, men nøytrale, utan kjenneteikn som
# stel merksemda frå hovudpersonane. Mange småroller deler eitt ansikt (sjå PORTRETT i data.js).
# Bakgrunnen er den same for alle: ein roleg himmel over grøne bakkar. Kvar har si eiga andletsform
# (runde 84): mannen firkanta, kvinna oval, den gamle mannen lang og mager, kona rund og guten liten.


def bak_bygd(P):
    bak_fyll(P, "himmel", [(10, 2), (30, 3), (47, 3)])
    for x in range(W):
        for y in range(7, 10):
            if (x // 6 + y) % 3 == 0 and (x < 9 or x > 39): bak_p(P, x, y, ("himmel", 4))   # skyer ved kantane
        g = 30 + int(3 * math.sin(x / 7.0 + 1))
        for y in range(g, H): bak_p(P, x, y, ("gronn", 3 if y < g + 2 else 2))


def bygd_mann(P):
    """Vaksen bygdemann: brunt hår, stutt skjegg, grå vadmålstrøye over kvit skjorte. Roleg."""
    hud, har, iris = "hud_br6", "har_sy6", "iris_br"
    P.hud = hud; bak_bygd(P)
    P.poly([(2, 48), (5, 41), (14, 37), (34, 37), (43, 41), (46, 48)], ("graa", 3))
    P.poly([(2, 48), (5, 41), (14, 37), (15, 48)], ("graa", 2)); P.poly([(34, 38), (43, 41), (46, 48), (40, 48)], ("graa", 4))
    P.poly([(20, 36), (30, 36), (28, 42), (22, 42)], ("lin", 3))
    hals(P, hud, 20, 31, 31, 37)
    oyre(P, hud, 10, 19)
    kantar = kant(9, 36, 15, 36, krune=4, kjeve=0.7, form="kantete", hake=(21, 32))   # firkanta
    andlet(P, hud, kantar, kinn=(20, 29))
    # opne, rolege auge som ser mot teksten, og bryn med ein liten boge (venleg)
    auge(P, har, hud, iris, ["LLLLLL ", "LwwiphL", " wwmGg ", "   lll "], ["LLLL ", "wiphL", "wmGg ", " ll  "],
         18, 20, 28, 20, bryn=([(18, 18), (21, 16), (24, 17)], [(28, 17), (31, 16), (34, 17)]), tjukk=1)
    nase34(P, hud, 26, 21, 28)
    for y in range(25, 37):                                                     # stutt skjegg langs kjeven og haka
        xa, xb = kantar[y]
        for x in range(xa, xb + 1):
            c = P.get(x, y)
            if c and c[0] == hud and (y >= 33 or x < xa + 2 + (y - 25) // 3 or x > xb - 2 - (y - 25) // 3 or (y == 30 and 23 <= x <= 30)):
                P.p(x, y, (har, 1 if c[1] <= 2 else 2 if c[1] == 3 else 3))
    P.linje([(24, 32), (29, 32)], ("munn", 1))
    # Grunnflate under lokkane, så himmelen ikkje syner gjennom sveisen over panna
    P.poly([(11, 15), (12, 7), (18, 3), (28, 2), (36, 5), (38, 11), (31, 9), (22, 9), (16, 11)], (har, 2))
    harflak(P, har, [(19, 3), (12, 6), (9, 12), (9, 17), (11, 21)], [(22, 6), (18, 8), (16, 12), (16, 16), (16, 19)],
            3, 2.2, (0.15, 0.3), bolgje=(0.4, 9, 0.0))
    harflak(P, har, [(20, 3), (28, 2), (35, 4), (38, 9), (38, 14)], [(21, 7), (27, 8), (32, 10), (35, 12), (36, 16)],
            3, 2.2, (0.12, 0.35), bolgje=(0.4, 8, 1.0), ytre_mork=False)


def bygd_kvinne(P):
    """Vaksen bygdekvinne: mørkt skaut knytt under haka, brunt hår i panna, raudt liv. Mild."""
    hud, har, iris = "hud_iv", "har_sy6", "iris_hg"
    P.hud = hud; bak_bygd(P)
    P.poly([(6, 48), (9, 41), (17, 37), (31, 37), (39, 41), (42, 48)], ("lin", 3))
    P.poly([(14, 40), (20, 41), (22, 48), (13, 48)], ("raud", 2)); P.poly([(28, 41), (34, 40), (35, 48), (26, 48)], ("raud", 3))
    for y in range(42, 48, 2): P.linje([(22, y), (26, y + 1)], ("raud", 1))
    hals(P, hud, 21, 29, 32, 38)
    P.poly([(9, 30), (10, 15), (15, 7), (24, 4), (33, 6), (38, 12), (40, 21), (38, 30), (35, 36), (14, 36)], ("graa", 2))
    P.poly([(9, 30), (10, 15), (15, 7), (17, 8), (13, 17), (13, 32), (14, 36)], ("graa", 1))
    P.poly([(30, 6), (35, 8), (38, 13), (35, 11)], ("graa", 3))
    andlet(P, hud, kant(12, 35, 17, 34, krune=4, kjeve=0.5, form="oval", hake=(25, 30)), kinn=(20, 29))   # ovalt
    # milde mandelauge med ein liten vippesvung ytst, blikket litt ned mot teksten
    auge(P, har, hud, iris, [" LLLLL ", "LLwwiph", " wwmGg ", "  lll  "], [" LLL ", "LiphL", "wmGg ", " ll  "],
         18, 20, 28, 20, bryn=([(19, 18), (21, 17), (24, 17)], [(28, 17), (31, 17), (33, 18)]))
    P.p(17, 20, (har, 0))                                                        # vippesvungen
    nase34(P, hud, 26, 21, 28)
    P.linje([(24, 31), (29, 31)], ("munn", 2)); P.p(30, 30, ("munn", 2))
    P.poly([(16, 16), (19, 13), (24, 12), (30, 12), (34, 14), (35, 17), (32, 15), (27, 14), (21, 15), (18, 18)], (har, 3))
    P.linje([(19, 15), (23, 13)], (har, 4))
    P.poly([(14, 14), (18, 9), (27, 8), (34, 10), (37, 14), (35, 14), (30, 11), (22, 11), (17, 15)], ("graa", 3))
    P.poly([(24, 35), (30, 35), (28, 39), (26, 40)], ("graa", 2))


def bygd_gamal_mann(P):
    """Gamal bygdemann: tunt kvitt hår, skjeggstubb, rynker, brun trøye. Tolmodig."""
    hud, har, iris = "hud_gm6", "har_kv6", "iris_pg"
    P.hud = hud; bak_bygd(P)
    P.poly([(3, 48), (6, 41), (15, 37), (33, 37), (42, 41), (45, 48)], ("brun", 3))
    P.poly([(3, 48), (6, 41), (15, 37), (16, 48)], ("brun", 2)); P.poly([(33, 38), (42, 41), (45, 48), (39, 48)], ("brun", 4))
    hals(P, hud, 22, 30, 33, 38)
    oyre(P, hud, 12, 20)
    # langt og magert: smal panne og hake, innsokne kinn under kinnbeinet
    kantar = kant(7, 37, 17, 34, krune=6, kjeve=0.62, form="oval", hake=(24, 29), kinn=(23, 33), kinn_inn=1.2)
    andlet(P, hud, kantar, kinn=(20, 29))
    P.poly([(26, 8), (31, 9), (33, 12), (28, 11)], (hud, 5))
    for y in range(31, 38):                                                     # skjeggstubb langs kjeven
        xa, xb = kantar[y]
        for x in range(xa, xb + 1):
            c = P.get(x, y)
            if c and c[0] == hud and (y >= 34 or x < xa + 2 or x > xb - 1): P.p(x, y, ("stubb", 2 if c[1] <= 2 else 3))
    for pts in [[(31, 25), (30, 30)], [(22, 27), (23, 31)], [(21, 12), (28, 12)], [(22, 14), (29, 14)]]:
        P.linje(pts, (hud, 3))                                                  # rynker og innsokne kinn
    # djuptliggjande, tolmodige auge: skugge i augeholet over, posar under, men opne og med glans
    P.linje([(18, 19), (25, 19)], (hud, 2)); P.linje([(28, 19), (33, 19)], (hud, 2))
    auge(P, har, hud, iris, ["LLLLLL", "LwiphL", "kwmGgk", " rrrr "], ["LLLLL", "iphwL", "mGgwk", "rrrr "],
         19, 20, 28, 20, bryn=([(18, 18), (21, 17), (24, 17)], [(28, 17), (31, 17), (34, 18)]))
    nase34(P, hud, 26, 21, 29)
    P.linje([(24, 32), (29, 32)], ("munn", 1))
    harflak(P, har, [(19, 6), (13, 8), (10, 12), (10, 18), (12, 22)], [(21, 8), (17, 10), (16, 13), (16, 17), (16, 20)],
            2, 1.8, (0.1, 0.4), bolgje=(0.3, 7, 0.0))
    lokk(P, har, [(33, 9), (36, 12), (37, 17)], [1.4, 1.4, 0.5], (0.1, 0.5))


def bygd_gamal_kone(P):
    """Gamal bygdekone: svart skaut, rynker, milde auge, grå trøye med kvitt sjal."""
    hud, iris = "hud_gm6", "iris_br"
    P.hud = hud; bak_bygd(P)
    P.poly([(5, 48), (8, 41), (16, 37), (32, 37), (40, 41), (43, 48)], ("graa", 2))
    P.poly([(12, 40), (24, 44), (36, 40), (33, 46), (24, 48), (15, 46)], ("lin", 3))
    P.linje([(14, 42), (24, 46), (34, 42)], ("lin", 2))
    hals(P, hud, 21, 29, 32, 38)
    P.poly([(9, 30), (10, 15), (15, 7), (24, 4), (33, 6), (38, 12), (40, 21), (38, 30), (35, 36), (14, 36)], ("svart", 3))
    P.poly([(9, 30), (10, 15), (15, 7), (17, 8), (13, 17), (13, 32), (14, 36)], ("svart", 2))
    P.poly([(30, 6), (35, 8), (38, 13), (35, 11)], ("svart", 4))
    # rundt og rynkete: breie, runde kinn og ei lita, mjuk hake
    andlet(P, hud, kant(12, 34, 15, 36, krune=4, kjeve=0.55, form="rund", hake=(23, 30), kinn=(21, 31), kinn_ut=1),
           kinn=(20, 29))
    for pts in [[(29, 27), (28, 30)], [(33, 28), (34, 31)], [(22, 27), (23, 30)], [(20, 15), (25, 15)]]:
        P.linje(pts, (hud, 3))                                                  # rynker
    # milde, smilande auge som ser litt ned: posar og kråkefot i staden for tunge lok
    auge(P, "svart", hud, iris, [" LLLL ", "LwwphL", "rlmGgl", "r rrr ", " r    "],
         ["LLLL ", "wphwL", "lmGlr", " rr r"], 19, 20, 28, 20)
    P.linje([(19, 18), (22, 17), (24, 18)], ("har_kv6", 2)); P.linje([(28, 18), (31, 17), (33, 18)], ("har_kv6", 2))
    nase34(P, hud, 26, 21, 28)
    P.linje([(24, 31), (29, 31)], ("munn", 1)); P.p(23, 30, ("munn", 1)); P.p(30, 30, ("munn", 1))   # mildt smil
    P.poly([(16, 16), (21, 13), (30, 13), (34, 15), (29, 15), (22, 16), (18, 18)], ("har_kv6", 3))
    P.poly([(14, 14), (18, 9), (27, 8), (34, 10), (37, 14), (35, 14), (30, 11), (22, 11), (17, 15)], ("svart", 4))
    P.poly([(24, 35), (30, 35), (28, 39), (26, 40)], ("svart", 3))


def bygd_gut(P):
    """Gut frå bygda: lyst, stritt hår, runde kinn, lue på snei, brun trøye. Nysgjerrig."""
    hud, har, iris = "hud_ba6", "har_br6", "iris_b"
    P.hud = hud; bak_bygd(P)
    P.poly([(8, 48), (11, 42), (18, 39), (30, 39), (37, 42), (40, 48)], ("brun", 3))
    P.poly([(8, 48), (11, 42), (16, 40), (15, 48)], ("brun", 2)); P.poly([(30, 40), (37, 42), (40, 48), (35, 48)], ("brun", 4))
    hals(P, hud, 21, 29, 33, 40)
    oyre(P, hud, 13, 22)
    # lite og rundt: smalare enn dei vaksne, kort hake og runde kinn
    kantar = kant(14, 34, 18, 34, krune=7, kjeve=0.45, form="rund", hake=(23, 29), kinn=(23, 32), kinn_ut=1)
    andlet(P, hud, kantar, kinn=(22, 31))
    P.linje([(18, 29), (20, 29)], ("kinn", 3)); P.linje([(31, 29), (33, 29)], ("kinn", 3))
    # store, nysgjerrige auge som ser opp mot høgre, med mykje kvitt og tydeleg glans
    auge(P, har, hud, iris, [" LLLLL ", "LLwiphL", " wwmGgw", "  lll  "], ["LLLL ", "iphwL", "mGgww", " lll "],
         18, 22, 28, 22, bryn=([(18, 20), (20, 18), (23, 18), (24, 19)], [(28, 19), (30, 18), (33, 19)]))
    nase34(P, hud, 26, 25, 29)
    P.linje([(25, 32), (29, 32)], ("munn", 2)); P.p(30, 31, ("munn", 2))
    for x0 in (16, 19, 22, 25, 28, 31, 34):                                     # stritt, lyst hår
        lokk(P, har, [(x0 + 1, 11), (x0, 15), (x0 - 1, 18)], [1.8, 1.4, 0.4], (0.0, 0.5))
    harflak(P, har, [(16, 10), (11, 13), (10, 18), (12, 22)], [(19, 12), (16, 15), (16, 18), (16, 21)], 2, 2.0, (0.1, 0.4))
    # lua på snei
    P.poly([(11, 14), (14, 7), (22, 4), (31, 5), (37, 9), (38, 14), (30, 12), (20, 12), (13, 15)], ("brun", 3))
    P.poly([(11, 14), (14, 7), (18, 5), (16, 12)], ("brun", 2)); P.poly([(30, 5), (37, 9), (38, 13), (33, 9)], ("brun", 4))
    P.linje([(12, 14), (38, 14)], ("brun", 1))


PERSONAR = {"ivar": ivar, "storebror": storebror, "huldra": huldra, "framande": framande, "presten": presten,
            "haugbonden": haugbonden, "syster": syster, "granne": granne, "budeia": budeia,
            "bygd-mann": bygd_mann, "bygd-kvinne": bygd_kvinne, "bygd-gamal-mann": bygd_gamal_mann,
            "bygd-gamal-kone": bygd_gamal_kone, "bygd-gut": bygd_gut}


# ---------------------------------------------------------------- ut
def teikn(namn, k=None):
    """Teiknar personen med omriss, men utan bakgrunnen (None der bakgrunnen skal syne)."""
    P = Portrett()
    if k: PERSONAR[namn](P, k)
    else: PERSONAR[namn](P)
    P.omriss()
    if namn in ("huldra", "ivar"): selout(P, "hud_hu" if namn == "huldra" else "hud_iv")
    elif getattr(P, "hud", None): selout(P, P.hud)
    return P


def hol(namn, k=None, minst=1):
    """Finn hol i figuren der bakgrunnen syner gjennom (runde 84): samanhengande bakgrunnsflater som
    ikkje når kanten av ruta, til dømes i håret over panna eller mellom hatt og hår. Gir ei liste med
    (storleik, (x, y)) for kvart hol."""
    P = teikn(namn, k)
    sett, ut = set(), []
    for y0 in range(H):
        for x0 in range(W):
            if P.g[y0][x0] is not None or (x0, y0) in sett: continue
            stakk, flate, kant_ = [(x0, y0)], [], False
            sett.add((x0, y0))
            while stakk:
                x, y = stakk.pop(); flate.append((x, y))
                if x in (0, W - 1) or y in (0, H - 1): kant_ = True
                for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < W and 0 <= ny < H and P.g[ny][nx] is None and (nx, ny) not in sett:
                        sett.add((nx, ny)); stakk.append((nx, ny))
            if not kant_ and len(flate) >= minst: ut.append((len(flate), min(flate, key=lambda p: (p[1], p[0]))))
    return ut


def hakk(namn, k=None, d=3):
    """Smale hakk der bakgrunnen går inn i håret eller hovudplagget (ikkje heilt lukka hol): bakgrunnspikslar
    som har figuren innan d pikslar både til venstre, til høgre, over og under. Gir lista med pikslar."""
    P = teikn(namn, k)
    fig = lambda x, y: 0 <= x < W and 0 <= y < H and P.g[y][x] is not None
    ut = []
    for y in range(H):
        for x in range(W):
            if P.g[y][x] is not None: continue
            if all(any(fig(x + dx * i, y + dy * i) for i in range(1, d + 1)) for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))):
                ut.append((x, y))
    return ut


# Opningar som skal vere der (namn, kjensle, piksel): luft mellom den knytte neven og hovudet til Ivar,
# og mellom røykdottane frå pipa til grannen.
HOL_LOV = {("ivar", "ivrig", (36, 35)), ("ivar", "ivrig", (35, 37)), ("ivar", "ivrig", (36, 37)),
           ("ivar", "ivrig", (35, 38)), ("granne", None, (40, 17)), ("granne", None, (40, 22))}


def lag(namn, k=None):
    P = teikn(namn, k)
    namn = f"{namn}-{k}" if k else namn
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
    if sys.argv[1] == "hol":                                        # hol i hår og hovudplagg (runde 84)
        feil = 0
        for n in sys.argv[2:] or list(PERSONAR):
            for k in (None,) + PORTRETT_KJENSLER.get(n, ()):
                h = [x for x in hol(n, k) if (n, k, x[1]) not in HOL_LOV]
                s = [x for x in hakk(n, k) if (n, k, x) not in HOL_LOV]
                if h or s: feil += 1; print(f"{n}{'-' + k if k else ''}: hol {h} hakk {s}")
        print("ingen hol" if not feil else f"{feil} portrett med hol"); sys.exit(1 if feil else 0)
    val = list(PERSONAR) if sys.argv[1] == "alle" else sys.argv[1:]
    import subprocess
    for n in val:
        for k in (None,) + PORTRETT_KJENSLER.get(n, ()):
            sti, nf = lag(n, k)
            subprocess.run([sys.executable, os.path.join(ROT, "pix.py"), "lag", sti], stdout=subprocess.DEVNULL)
            print(f"{n}{'-' + k if k else ''}: {nf} fargar")
