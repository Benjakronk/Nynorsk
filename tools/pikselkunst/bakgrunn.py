"""Kampbakgrunnar (320 x 192) i stil med Final Fantasy VI, med motiv frå Vestlandet.

Oppbygging etter kampbakgrunnane i Final Fantasy VI: himmel med skyer som har lyse
kantar, fjell i fleire lag (snø på dei fjernaste), skogkant med einskilde gransilhuettar,
eit smalt vassband og ein slette med tekstur og småsteinar. Horisonten ligg om lag ein
tredjedel ned, fordi kampvindauga dekkjer den nedste delen av skjermen.

Motiva er frå konsept/: Hjørundfjorden og Sunnmørsalpane, Hovdebygda, Dahl og Hertervig
(utmarka), Tidemand, Askevold og Bjørnebergstølen (røykstova).

  python tools/pikselkunst/bakgrunn.py alle        skriv bilete/spel/kamp/<namn>.png

Kjelda er dette skriptet (biletet er for stort til å skrivast som .pix for hand).
Sjå på resultatet med  python tools/pikselkunst/skjermbilete.py <namn> kart=... kamp=...
"""
import os, sys, math
from PIL import Image

ROT = os.path.dirname(os.path.abspath(__file__))
UT = os.path.abspath(os.path.join(ROT, "..", "..", "bilete", "spel", "kamp"))
W, H = 320, 192
LOFT = 16   # kor mykje landskapet blir løfta etter at det er teikna


def hx(h): h = h.lstrip("#"); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))
def h_(x, y, s):
    n = (x * 374761393 + y * 668265263 + s * 1442695041) & 0xFFFFFFFF
    n = ((n ^ (n >> 13)) * 1274126177) & 0xFFFFFFFF
    return ((n ^ (n >> 16)) & 0xFFFFFFFF) / 4294967296


class B:
    def __init__(s): s.im = Image.new("RGB", (W, H)); s.px = s.im.load()
    def p(s, x, y, c):
        if 0 <= x < W and 0 <= y < H: s.px[int(x), int(y)] = hx(c) if isinstance(c, str) else c
    def get(s, x, y): return s.px[x, y]
    def rad(s, y, x0, x1, c):
        for x in range(max(0, x0), min(W, x1 + 1)): s.p(x, y, c)
    def band(s, y0, y1, fargar):
        """Vassrette band med rutemønster i overgangane (klassisk 16-bits himmel)."""
        n = len(fargar)
        for y in range(y0, y1):
            t = (y - y0) / max(1, y1 - y0) * (n - 1)
            i = int(t); f = t - i
            for x in range(W):
                c = fargar[min(n - 1, i + 1)] if (f > 0.66 or (f > 0.33 and (x + y) % 2 == 0)) else fargar[i]
                s.p(x, y, c)


def sky(b, cx, cy, rx, ry, fargar, fro):
    """Ei sky av klumpar: lys kant oppe til venstre, mørk undersida, flat botn."""
    lys, mid, mork = fargar
    for k in range(int(rx / 4) + 3):
        kx = cx - rx + (k / (rx / 4 + 2)) * rx * 2 + (h_(k, 1, fro) - 0.5) * 6
        kr = ry * (0.55 + h_(k, 2, fro) * 0.6)
        ky = cy - kr * 0.3
        for y in range(int(ky - kr), int(cy + 2)):
            for x in range(int(kx - kr * 1.3), int(kx + kr * 1.3)):
                d = ((x - kx) / (kr * 1.3)) ** 2 + ((y - ky) / kr) ** 2
                if d <= 1:
                    v = -(x - kx) / (kr * 1.3) * 0.4 - (y - ky) / kr * 0.9
                    c = lys if v > 0.45 else mid if v > -0.35 else mork
                    if abs(v - 0.45) < 0.08 and (x + y) % 2: c = mid
                    b.p(x, y, c)


def fjell(b, basis, toppar, fargar, sno=None, fro=1, taggut=0.0):
    """Fjellrygg: toppar = [(x, høgd, halvbreidd)]. Skuggen følgjer fjellsida: sider som
    vender mot lyset (terrenget stig mot høgre) er lyse, dei andre mørke. Snøkappe med
    ujamn nedre kant og mørke renner nedover."""
    lys, mid, mork = fargar
    topp = []
    for x in range(W):
        y_top = basis
        for (tx, th, tb) in toppar:
            d = abs(x - tx) / tb
            if d < 1: y_top = min(y_top, basis - th * (1 - d ** 1.25))
        y_top -= (h_(x // 2, 3, fro) - 0.5) * taggut * 5
        topp.append(y_top)
    for x in range(W):
        helling = topp[min(W - 1, x + 2)] - topp[max(0, x - 2)]       # negativ: stig mot høgre
        hoyd = basis - topp[x]
        for y in range(int(topp[x]), basis):
            djup = y - topp[x]
            c = lys if helling < -1.2 else mork if helling > 1.2 else mid
            # renner: mørke striper som går skrått nedover frå toppane
            if djup > 3 and ((x * 2 + y) % 23 == 0 or (x * 2 - y) % 31 == 0) and h_(x, y, fro) > 0.3: c = mork
            if djup > hoyd * 0.75 and c == lys: c = mid                 # mørkare nede
            if sno and hoyd > 18 and djup < hoyd * 0.28 + h_(x, 7, fro) * 5:
                c = sno[0] if helling < 0.5 else sno[1]
            b.p(x, y, c)


def gran(b, x, y, hoyd, farge, lys=None):
    for k in range(hoyd):
        bb = int(k * 0.42) + (1 if k % 3 == 2 else 0)
        for dx in range(-bb, bb + 1):
            b.p(x + dx, y - hoyd + k, lys if (lys and dx < -bb // 2 and k % 3 != 2) else farge)


def bjork(b, x, y, fro):
    for k in range(18): b.p(x, y - k, "#e8e4dc" if k % 5 else "#3a3440"); b.p(x + 1, y - k, "#a8a4a0")
    for (dx, dy, r) in [(0, -22, 6), (-4, -18, 5), (5, -17, 5), (0, -14, 4)]:
        for yy in range(-r, r + 1):
            for xx in range(-r, r + 1):
                if xx * xx + yy * yy <= r * r and h_(x + xx, y + yy, fro) > 0.12:
                    v = -xx * 0.5 - yy * 0.8
                    b.p(x + dx + xx, y + dy + yy, "#b0c85e" if v > r * 0.4 else "#7ea040" if v > -r * 0.3 else "#567c32")


def slette(b, y0, y1, fargar, fro, steinar=True, blomar=None):
    mork, mid, lys = fargar
    for y in range(y0, y1):
        for x in range(W):
            v = h_(x, y, fro)
            c = mid
            if v < 0.12: c = mork
            elif v > 0.9: c = lys
            b.p(x, y, c)
    # grastuster, tettare nær (lenger ned)
    for i in range(420):
        x = int(h_(i, 1, fro) * W); y = y0 + 2 + int((h_(i, 2, fro) ** 0.7) * (y1 - y0 - 3))
        b.p(x, y, lys); b.p(x, y + 1, mork); b.p(x + 1, y, mid)
    if steinar:
        for i in range(14):
            x = int(h_(i, 5, fro) * W); y = y0 + 6 + int(h_(i, 6, fro) * (y1 - y0 - 10)); s = 1 + int((y - y0) / 20)
            for dx in range(-s, s + 1): b.p(x + dx, y, "#9a98aa"); b.p(x + dx, y + 1, "#5a586a")
            b.p(x - s, y, "#c4c2cc")
    if blomar:
        for i in range(40):
            x = int(h_(i, 7, fro) * W); y = y0 + 4 + int(h_(i, 8, fro) * (y1 - y0 - 6))
            b.p(x, y, blomar[i % len(blomar)])


def tun():
    b = B()
    b.band(0, 76, ["#3a5a9a", "#4a70b0", "#6088c4", "#7ea2d4", "#a4c0e4"])
    for (cx, cy, rx, ry, fro) in [(60, 22, 42, 9, 1), (190, 14, 56, 10, 2), (290, 30, 34, 7, 3), (130, 40, 28, 5, 4)]:
        sky(b, cx, cy, rx, ry, ("#f4f0f0", "#c8cce0", "#8c94b8"), fro)
    # Sunnmørsalpane: taggete, med snø
    fjell(b, 72, [(40, 30, 40), (95, 44, 46), (150, 34, 40), (210, 50, 52), (275, 38, 44), (320, 30, 30)],
          ("#8a94b4", "#6a7498", "#4c5476"), sno=("#f4f4fa", "#b8c0d8"), fro=2, taggut=1.0)
    fjell(b, 80, [(0, 18, 60), (70, 22, 70), (180, 16, 60), (260, 24, 80)], ("#4a6a78", "#3a5664", "#2a404e"), fro=3)
    # fjorden med kvite striper og ein liten gard på andre sida
    for y in range(80, 90):
        for x in range(W):
            c = "#5a86b4" if y < 84 else "#4a76a4"
            if (x * 7 + y * 13) % 29 == 0: c = "#cfe4f4"
            b.p(x, y, c)
    for (hx_, fr) in [(210, 1), (226, 2)]:
        b.rad(78, hx_, hx_ + 8, "#6a7a34"); b.rad(79, hx_ - 1, hx_ + 9, "#98a648"); b.rad(80, hx_, hx_ + 8, "#664228")
    slette(b, 90, H, ("#3a7236", "#4a8a3f", "#68a84a"), 5, blomar=["#f4dc70", "#f0eef4", "#d87aa0"])
    for i, x in enumerate([6, 14, 24, 300, 310]): gran(b, x, 94 + (i % 2) * 3, 22 + (i % 3) * 4, "#1f4a38", "#2e6448")
    for x, fr in [(34, 1), (286, 2)]: bjork(b, x, 100, fr)
    return b


def utmark():
    b = B()
    b.band(0, 74, ["#241c46", "#3a2658", "#5a3264", "#8a4468", "#c0606a", "#e0906e"])
    for (cx, cy, rx, ry, fro) in [(80, 30, 50, 4, 5), (220, 20, 60, 5, 6), (160, 48, 40, 3, 7)]:
        sky(b, cx, cy, rx, ry, ("#f4b08a", "#9a5a7a", "#5a3a6a"), fro)
    fjell(b, 76, [(60, 34, 60), (170, 46, 70), (280, 36, 60)], ("#4a3e66", "#3a3056", "#2a2444"), sno=("#a898c0", "#7a6a98"), fro=8, taggut=0.6)
    # skogvegg av gran i to lag
    for x in range(-4, W + 6, 5): gran(b, x, 92, 18 + int(h_(x, 1, 9) * 10), "#18262e")
    for x in range(-2, W + 6, 7): gran(b, x, 98, 22 + int(h_(x, 2, 9) * 12), "#0e1a20", "#24343c")
    slette(b, 96, H, ("#1d3f28", "#285632", "#3a7236"), 9, steinar=True, blomar=["#8a4a7a", "#b0608a", "#6a3a6a"])
    # tjønn: mørk spegling av skogen, med ei lys stripe av kveldshimmelen
    for y in range(104, 112):
        w = int(46 * math.sqrt(max(0, 1 - ((y - 108) / 4.5) ** 2)))
        for x in range(160 - w, 160 + w):
            b.p(x, y, "#141c28" if y > 105 else "#2a2444")
        if 106 <= y <= 107: b.rad(y, 160 - w // 2, 160 + w // 3, "#8a4468")
    return b


def inne():
    """Røykstove: tømmervegg med benk og hylle med trefat, kvitkalka grue med eld, bjelkar i taket."""
    b = B()
    for y in range(0, 100):
        k = y % 8
        for x in range(W):
            c = "#6c4024" if k in (1, 2, 3) else "#8c5a32" if k == 0 else "#4a2a18" if k in (4, 5) else "#2a160e"
            if h_(x // 3, y, 11) < 0.05: c = "#4a2a18"
            b.p(x, y, c)
    for y in range(0, 14): b.rad(y, 0, W, "#1c100a" if y < 10 else "#3a2214")   # røyksvart tak
    for bx in (60, 170, 280):                                                      # bjelkar
        for y in range(0, 16):
            for x in range(bx, bx + 10): b.p(x, y, "#5a3a22" if x < bx + 3 else "#3a2214")
    # vindauge med ljos
    for y in range(28, 50):
        for x in range(210, 232): b.p(x, y, "#e8e4d0" if (x - 210) % 11 in (0, 10) or (y - 28) % 11 in (0, 10) else "#9ab8d8")
    # hylle med trefat og krus
    b.rad(40, 100, 180, "#8c5a32"); b.rad(41, 100, 180, "#4a2a18")
    for i, x in enumerate(range(104, 176, 12)):
        for dy in range(-9, 0):
            for dx in range(-4, 5):
                if dx * dx + dy * dy * 0.5 <= 16: b.p(x + dx, 40 + dy, "#c89a60" if dx < 1 else "#a07a48")
        b.p(x - 1, 34, "#8a4428" if i % 2 else "#2c4288")
    # kvitkalka grue med hette til venstre, eld og gryte
    for y in range(18, 100):
        w = 38 if y > 50 else int(18 + (y - 18) * 0.62)
        for x in range(10, 10 + w): b.p(x, y, "#e8e4dc" if x < 10 + w * 0.6 else "#b8b4ac")
    for y in range(66, 98):
        for x in range(16, 42): b.p(x, y, "#140a08")
    for y in range(78, 98):
        for x in range(20, 38):
            v = h_(x, y, 12)
            if v > 0.3 + (98 - y) / 40: b.p(x, y, "#f8b830" if v > 0.75 else "#e86a20")
    for y in range(72, 80):
        for x in range(23, 35): b.p(x, y, "#2a2838" if x < 29 else "#1a1824")
    # rosemaling langs veggen over benken
    for x in range(64, 300, 14):
        b.p(x, 70, "#b03c46"); b.p(x + 1, 69, "#2c4288"); b.p(x + 2, 70, "#b03c46"); b.p(x + 1, 71, "#e8b830")
        b.p(x + 5, 70, "#3a7236"); b.p(x + 8, 70, "#3a7236")
    # gryte på krok over elden
    for y in range(14, 72): b.p(29, y, "#1a1824")
    # sengebenk bak til høgre med raudt åklede
    for y in range(58, 84):
        for x in range(244, 316): b.p(x, y, "#6c4024" if y < 62 else "#8a2638" if (x + y) % 9 else "#d06a64")
    for y in range(52, 84): b.p(244, y, "#4a2a18"); b.p(315, y, "#4a2a18")
    # benk langs veggen
    for y in range(84, 92): b.rad(y, 60, 300, "#8c5a32" if y < 86 else "#6c4024")
    for x in (70, 180, 290):
        for y in range(92, 100): b.p(x, y, "#4a2a18"); b.p(x + 1, y, "#4a2a18")
    # rokk framfor benken
    cx, cy, r = 150, 78, 13
    for a in range(0, 360, 4):
        b.p(cx + int(math.cos(math.radians(a)) * r), cy + int(math.sin(math.radians(a)) * r), "#8a4428")
    for a in range(0, 360, 45):
        for k in range(r): b.p(cx + int(math.cos(math.radians(a)) * k), cy + int(math.sin(math.radians(a)) * k), "#a8683a")
    for k in range(20): b.p(cx - 8 + k, 96 - k // 3, "#6c4024"); b.p(cx - 6 + k // 3, 104 - k // 2, "#4a2a18")
    # golv av breie plankar, mørkare bak
    for y in range(100, H):
        for x in range(W):
            c = "#8e6034" if (x // 11) % 2 == 0 else "#86582e"
            if x % 11 == 0: c = "#4a2e1a"
            if y < 120 and (x + y) % 2 == 0: c = "#6e4626"
            if y == 100: c = "#2a160e"
            b.p(x, y, c)
    # varmt ljos frå elden
    for y in range(H):
        for x in range(W):
            d = math.hypot(x - 30, y - 88)
            r, g, bb = b.get(x, y)
            a = max(0.0, 1 - d / 190)
            m = 0.55 + a * 0.7                                          # mørkt i hjørna, varmt ved elden
            b.p(x, y, (min(255, int(r * m + 40 * a)), min(255, int(g * m + 14 * a)), int(bb * (0.5 + a * 0.3))))
    return b


def arkiv():
    b = B()
    for y in range(0, 100):
        for x in range(W):
            rad = y // 7; blokk = (x + (rad % 2) * 10) // 20
            c = "#2a2838" if (y % 7 == 6 or (x + (rad % 2) * 10) % 20 == 0) else ("#3a3848" if h_(blokk, rad, 13) > 0.5 else "#34323f")
            b.p(x, y, c)
    for sx in range(8, W, 52):                                        # hyller med protokollar
        for y in range(10, 96):
            for x in range(sx, sx + 44): b.p(x, y, "#2a1c20")
        for hy in range(16, 92, 13):
            for x in range(sx + 2, sx + 42): b.p(x, hy + 10, "#4a2e22")
            x = sx + 3
            while x < sx + 41:
                w = 3 + int(h_(x, hy, 14) * 3); c = ["#201848", "#383070", "#62182a", "#2a2838", "#4a2c1c"][int(h_(x, hy, 15) * 5)]
                for yy in range(hy + 1 + int(h_(x, hy, 16) * 2), hy + 10):
                    for xx in range(x, min(x + w, sx + 41)): b.p(xx, yy, c)
                b.p(x, hy + 3, "#c8b050"); x += w + 1
        for k in range(2):                                            # blekk som renn
            dx = sx + 8 + k * 22 + int(h_(sx, k, 17) * 6)
            for y in range(40 + k * 20, 96): b.p(dx, y, "#383070"); b.p(dx + 1, y, "#201848")
    for y in range(100, H):
        for x in range(W): b.p(x, y, "#232030" if (x // 16 + y // 8) % 2 else "#1c1a28")
    for y in range(126, 150):                                          # stor blekkpytt
        w = int(90 * math.sqrt(max(0, 1 - ((y - 138) / 12) ** 2)))
        for x in range(120 - w, 120 + w): b.p(x, y, "#201848" if (x + y) % 5 else "#383070")
    for x in range(80, 110): b.p(x, 131, "#8878d0")
    # ljos frå ein lysestake
    for y in range(H):
        for x in range(W):
            d = math.hypot(x - 250, y - 70); r, g, bb = b.get(x, y)
            a = max(0.0, 1 - d / 160)
            b.p(x, y, (int(r * (0.55 + a * 0.9)), int(g * (0.55 + a * 0.8)), int(bb * (0.6 + a * 0.5))))
    for y in range(58, 76): b.p(250, y, "#c08018"); b.p(251, y, "#8a5a18")
    b.p(250, 55, "#fff4c0"); b.p(250, 56, "#f8b830"); b.p(251, 56, "#f8b830")
    return b


BAKGRUNNAR = {"tun": tun, "utmark": utmark, "inne": inne, "arkiv": arkiv}

if __name__ == "__main__":
    namn = sys.argv[1:] or ["alle"]
    if namn == ["alle"]: namn = list(BAKGRUNNAR)
    os.makedirs(UT, exist_ok=True)
    for n in namn:
        im = BAKGRUNNAR[n]().im
        # Løft landskapet 16 pikslar, så partiet (til høgre) står på bakken og ikkje i fjorden.
        ut = Image.new("RGB", (W, H)); ut.paste(im.crop((0, LOFT, W, H)), (0, 0))
        ut.paste(im.crop((0, H - 2 * LOFT, W, H - LOFT)), (0, H - LOFT))
        ut.save(os.path.join(UT, f"{n}.png")); print(f"bilete/spel/kamp/{n}.png")
