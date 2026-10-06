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


def skigard(b, x0, x1, y, hoyd, fro):
    """Skigard: par av loddrette stolpar med skrå skier mellom, slik han står langs vegane på Vestlandet."""
    for x in range(x0, x1, 3):                                       # skrå skier
        for k in range(hoyd):
            b.p(x + k // 2, y - k, "#8a6a48" if k % 4 else "#5a4230")
            b.p(x + k // 2 + 1, y - k, "#4a3424")
    for x in range(x0, x1, 14):                                      # stolpar med vidjebind
        for k in range(hoyd + 3):
            b.p(x, y - k, "#6a5038"); b.p(x + 1, y - k, "#3a2a1c")
        b.p(x + 2, y - hoyd // 2, "#a88a60"); b.p(x + 2, y - hoyd + 2, "#a88a60")


def kyrkje():
    """Hovdekyrkja inne: måla stjernehimmel i taket, lys blågrå panelvegg med årer og
    rosemalingsband, altartavle med forgylt ramme, alterring, blå benkar med benkedører,
    plankegolv i perspektiv og ljosstrålar frå vindauga."""
    b = B()
    himl = M.rampe("#141c3c", "#1e2c5a", "#2a3e7a", "#3a5292")
    for y in range(0, 20):                                              # måla himmel i taket
        for x in range(W):
            b.p(x, y, M.tone(himl, 0.7 - y / 20 * 0.5 + (M.fbm(x / 12, y / 4, 141) - 0.5) * 0.4, x, y))
            if M.h(x, y, 142) > 0.988 and y < 17: b.p(x, y, "#f8d840")
    for bx in range(-6, W, 64):                                         # takbjelkar
        for y in range(0, 20):
            for x in range(bx, bx + 7): b.p(x, y, M.tone(M.rampe("#2a1810", "#4a2c1a", "#6a4428"), 0.8 - (x - bx) / 7, x, y))
    panel = M.rampe("#5a6674", "#7a8896", "#98a6b0", "#b8c4c8", "#d4dcdc")
    for y in range(20, 104):                                            # panelvegg med årer
        for x in range(W):
            k = x % 12
            v = 0.55 + (M.fbm(x / 30 + (x // 12) * 5, y / 6, 143, 3) - 0.5) * 0.35
            if k == 0: v = 0.1
            elif k == 1: v += 0.2
            elif k == 11: v -= 0.2
            b.p(x, y, M.tone(panel, v, x, y))
    raud = M.rampe("#3a0e18", "#6a1a2a", "#983040", "#c45a5a")
    for x in range(W):                                                  # rosemalingsband
        for y in range(22, 30):
            b.p(x, y, M.tone(raud, 0.35 if y in (22, 29) else 0.7, x, y))
        yv = 25 + round(math.sin(x / 5) * 2)
        b.p(x, yv, "#f4dc70")
        if x % 10 == 3: b.p(x, 24, "#2c4288"); b.p(x, 27, "#2c4288")
        if x % 10 == 8: b.p(x, yv - 1, "#f8e8a0")
    for y in range(88, 104):                                            # brystpanel i tre
        for x in range(W):
            b.p(x, y, M.tone(M.rampe("#2a1810", "#4a2c1a", "#6a4428", "#8a5c34"), 0.3 if y == 88 else 0.55 + (M.fbm(x / 10, y / 2, 144) - 0.5) * 0.4, x, y))
    for wx in (24, 264):                                                # vindauge med blyglas
        for y in range(36, 80):
            for x in range(wx, wx + 32):
                boge = y < 44 and ((x - wx - 15.5) ** 2 / 256 + (y - 44) ** 2 / 64) > 1
                if boge: continue
                ramme = (x - wx) % 8 == 0 or (y - 36) % 8 == 0 or x == wx + 31
                v = 0.55 + (y - 36) / 88 + (M.h(x // 8, y // 8, 145) - 0.5) * 0.25
                b.p(x, y, "#e8e4d8" if ramme else M.tone(M.rampe("#8aa8c8", "#b8d0e4", "#e4eef6", "#ffffff"), v, x, y))
    cx = 160                                                            # altartavla
    gull = M.rampe("#6a4410", "#9a6a18", "#c89028", "#f0c040", "#fce888")
    for y in range(12, 80):
        for x in range(cx - 32, cx + 33):
            if y < 26 and abs(x - cx) > (y - 12) * 2.3: continue
            kant = abs(x - cx) > 27 or y < 30 or (y < 26)
            if kant:
                v = 0.55 + (M.fbm(x / 2, y / 2, 146, 2) - 0.5) * 0.9
                b.p(x, y, M.tone(gull, v, x, y))
            else:
                v = 0.35 + (M.fbm(x / 8, y / 6, 147, 3) - 0.5) * 0.6
                c = M.tone(M.rampe("#10183a", "#1e2c5a", "#34508c", "#5a78b0"), v, x, y)
                if 40 < y < 74 and abs(x - cx) < 7: c = M.tone(M.rampe("#6a1a2a", "#983040", "#c45a5a"), 0.5 + (x < cx) * 0.3, x, y)
                if 36 < y < 44 and abs(x - cx) < 4: c = M.tone(M.rampe("#b08868", "#e8c8a8"), 0.7, x, y)
                if 30 < y < 38 and abs(x - cx) < 6 and (x - cx) ** 2 + (y - 34) ** 2 < 36: c = M.tone(gull, 0.85, x, y)
                b.p(x, y, c)
    for y in range(80, 102):                                            # altaret med duk og raudt forheng
        for x in range(cx - 26, cx + 27):
            b.p(x, y, M.tone(M.rampe("#c8c6d2", "#f4f2f8"), 0.8, x, y) if y < 84 else M.tone(raud, 0.4 + ((x // 3) % 2) * 0.3, x, y))
    for sx in (cx - 18, cx + 18):                                       # lysestakar
        for y in range(70, 80): b.p(sx, y, M.tone(gull, 0.7, sx, y))
        b.p(sx, 67, "#fffce8"); b.p(sx, 68, "#f8d060"); b.p(sx, 69, "#f8b830")
    golv = M.rampe("#3a2410", "#5a3a1c", "#7a5028", "#9a6c38", "#b8884c", "#d4a868")
    plankegolv(b, 104, 160, 50, golv, 148, breidd=0.2)
    for x in range(cx - 70, cx + 71):                                   # alterringen
        y = 106 + int(((x - cx) / 70) ** 2 * 9)
        for k in range(7): b.p(x, y + k, "#f4f2f8" if k < 2 else (M.tone(raud, 0.6, x, y + k) if k < 4 else "#c8c6d4"))
        if (x - cx) % 9 == 0:
            for k in range(7, 11): b.p(x, y + k, "#b0aebc")
    bla = M.rampe("#10183a", "#1c2c5c", "#2a4288", "#4462ae", "#6c8ad0")
    for k in range(3):                                                  # benkar til venstre framme
        y0 = 124 + k * 26; e = 70 + k * 14
        for y in range(y0, y0 + 18):
            for x in range(0, e):
                v = 0.8 if y < y0 + 2 else 0.55 if y < y0 + 5 else 0.12 if y < y0 + 8 else 0.4
                b.p(x, y, M.tone(bla, v + (M.fbm(x / 8, y, 149, 2) - 0.5) * 0.2, x, y))
        for y in range(y0 - 5, y0 + 18):                                # benkedøra med rosemaling
            for x in range(e - 12, e):
                v = 0.75 if x == e - 12 else 0.1 if x == e - 1 else 0.45
                b.p(x, y, M.tone(bla, v, x, y))
            if y0 + 1 <= y <= y0 + 12 and (y - y0) % 3 == 1: b.p(e - 6, y, "#983040"); b.p(e - 5, y, "#f4dc70")
    for wx in (24, 264):                                                # ljosstrålar skrått ned mot høgre
        for y in range(40, H):
            for x in range(W):
                u = x - wx - 2 - (y - 40) * 0.75
                if 0 < u < 28:
                    a = 0.12 * (1 - abs(u - 14) / 14)
                    t = math.floor(a * 8 + M.terskel(x, y)) / 8
                    if t > 0: b.p(x, y, M.blend(b.get(x, y), "#fff4d8", t * 2))
    morke(b, 0.45, "#0a0c18")
    return b


# ---------------------------------------------------------------- måla bakgrunnar (runde 13)
# Etter kampbakgrunnane i Final Fantasy VI: tekstur og dithering, luftperspektiv, stripete
# skyer med lyse kantar, og ting som blir større nærare oss. Sjå maleri.py.
import maleri as M


def himmel(b, y0, y1, r, s, skyer=None, skyband=(4, 60), tett=0.5):
    """Himmel med glidande overgang (dithering) og stripete skyer med lys kant mot ljoset."""
    for y in range(y0, y1):
        for x in range(W):
            b.p(x, y, M.tone(r, (y - y0) / (y1 - y0), x, y))
    if not skyer: return
    ya, yb = skyband
    for y in range(ya, yb):
        for x in range(W):
            d = M.fbm(x / 70 + y / 40, y / 11, s, 5)
            grense = tett + 0.12 * (y - ya) / (yb - ya) + 0.06 * math.sin(x / 50 + s)
            if d < grense: continue
            lys = d - M.fbm((x + 3) / 70 + (y + 2) / 40, (y + 2) / 11, s, 5)   # lys kant opp mot venstre
            v = 0.35 + (d - grense) * 2.2 + lys * 5 - (y - ya) / (yb - ya) * 0.25
            b.p(x, y, M.tone(skyer, v, x, y))


def fjellrekke(b, basis, topp_y, hoyd, r, sno, s, dis=(None, 0.0), skarp=1.0):
    """Fjell med skarpe toppar. Overflata er ei 2D-støyflate som blir lyssett som eit relieff
    (ljos oppe til venstre), så ein får berghamrar og renner. Snø på toppane, og luftperspektiv
    (dis: fargen og kor mykje)."""
    flate = lambda x, y: M.fbm(x / 13, y / 7, s + 3, 4) + (y / 40.0)
    for x in range(W):
        t = int(basis - hoyd * M.rygg(x / 80 * skarp, s) - topp_y)
        snodjup = 6 + M.fbm(x / 11, 3, s + 5) * 14
        for y in range(max(0, t), basis):
            e = flate(x - 1, y - 1) - flate(x + 1, y + 1)             # relieff: lys mot venstre og opp
            djup = (y - t) / max(1, basis - t)
            if y < t + snodjup and (basis - t) > 14:
                c = M.tone(sno, 0.62 + e * 7, x, y)
            else:
                c = M.tone(r, 0.52 + e * 7 - djup * 0.3, x, y)
            if dis[0]: c = M.blend(c, dis[0], dis[1] * (0.7 + 0.3 * djup))
            b.p(x, y, c)


def tun():
    """Tunet ved fjorden: blå himmel med stripete skyer, Sunnmørsalpane i dis, fjorden med
    speglingar, gardar på andre sida, og ein bø med tett gras, blomar og steinar som blir
    større nærare oss. Granskog til høgre bak partiet, ei bjørk i venstre kant."""
    b = B()
    himmelr = M.rampe("#2c4684", "#4a6aa8", "#7896c4", "#a8c0dc", "#d0dcea", steg=9)
    skyr = M.rampe("#6a78a8", "#9aa6c8", "#cbd2e4", "#eef0f4", "#fff6e6")
    himmel(b, 0, 86, himmelr, 3, skyr, (2, 58), tett=0.52)
    # Sunnmørsalpane langt borte: snø på toppane, bart berg under, blå dis
    fjellrekke(b, 80, 16, 64, M.rampe("#3e4468", "#565e86", "#7a82a6", "#a0a8c4"),
               M.rampe("#8e98c0", "#bcc6e0", "#e6ecf8", "#ffffff"), 11, dis=("#a8b8d8", 0.3))
    # mørke, store åsar i mellomgrunnen (fjordsidene), som i Final Fantasy VI
    fjellrekke(b, 90, 2, 34, M.rampe("#1a2234", "#242e46", "#303c58", "#3e4c6a"), M.rampe("#3e4c6a"), 12,
               dis=("#4a5a80", 0.15), skarp=0.45)
    vass = M.rampe("#1e2a44", "#2a3c5e", "#3e5680", "#6a88b0", "#c8dcf0")
    for x in range(W):                                                  # fjorden: mørk spegling og glitter
        for y in range(90, 97):
            v = 0.3 + (y - 90) / 7 * 0.25 + (M.fbm(x / 20, y / 1.5, 22, 3) - 0.5) * 0.4
            if M.h(x // 4, y, 21) > 0.93 and y < 95: v = 0.95
            b.p(x, y, M.tone(vass, v, x, y))
    for gx in (192, 210, 224):                                          # gardar på andre sida: torvtak, raud vegg
        for x in range(gx, gx + 7): b.p(x, 86, "#5a6a2e"); b.p(x, 87, "#6e7e36")
        for x in range(gx + 1, gx + 6): b.p(x, 88, "#7a3a2c"); b.p(x, 89, "#5a2a22")
        b.p(gx + 3, 88, "#e8d08a")
    gras = M.rampe("#1e3a22", "#2c5230", "#3e6c38", "#568a42", "#74a44c", "#98bc5c", "#c0d67a")
    for y in range(97, H):
        for x in range(W):
            n = M.fbm(x / 38, y / 10, 31, 4) - 0.5                        # solflekkar og skuggar
            f = M.fbm(x / 3, y / 1.6, 32, 2) - 0.5                        # fin tekstur
            v = 0.5 + (y - 97) / (H - 97) * 0.12 + n * 0.45 + f * 0.1
            b.p(x, y, M.tone(gras, v, x, y))
    M.graset(b, 0, W, 97, H, gras, 33, tett=0.7)
    for i in range(70):                                                  # blomar, større nærare
        x = int(M.h(i, 1, 41) * W); t = M.h(i, 2, 41); y = int(97 + t * (H - 97))
        c = ["#f4dc70", "#f4f2f8", "#d87aa0", "#b0a0e8"][i % 4]
        b.p(x, y, c)
        if t > 0.5: b.p(x + 1, y, c); b.p(x, y - 1, M.blend(c, "#ffffff", 0.4))
    steinr = M.rampe("#3a3846", "#5a5868", "#7e7c8c", "#a4a2b0", "#cccad4")
    for i in range(12):                                                  # steinar som veks mot oss
        t = M.h(i, 5, 42); x = int(M.h(i, 6, 42) * (W - 20)) + 10; y = 102 + t * (H - 110)
        if 230 < x < 300 and y < 150: continue                          # ikkje under partiet
        sz = 1.5 + t * 5
        for yy in range(int(y + sz * 0.3), int(y + sz * 0.5) + 2):     # slagskugge
            for xx in range(int(x - sz * 0.6), int(x + sz * 1.3)):
                c = b.get(xx, yy) if 0 <= xx < W and 0 <= yy < H else None
                if c: b.p(xx, yy, M.blend(c, "#14202a", 0.35))
        M.stein(b, x, y, sz, steinr, lys=(-0.6, -0.8))
    granr = M.rampe("#0c1a18", "#142a24", "#1e3e30", "#2c5440", "#3e6c4c")
    for i, x in enumerate(range(252, W + 10, 9)):                         # granskog bak partiet
        M.gran(b, x + int(M.h(i, 1, 51) * 5), 98, 22 + int(M.h(i, 2, 51) * 18), granr, lys=-0.05, fro=i)
    for i, x in enumerate(range(256, W + 10, 13)):
        M.gran(b, x + int(M.h(i, 3, 51) * 5), 100, 14 + int(M.h(i, 4, 51) * 10), granr, lys=0.1, fro=i + 20)
    return b


def bakke(b, y0, r, s, lys=0.5, flekk=0.5, fin=0.12, helling=0.12):
    """Bakke med store flekkar av ljos og skugge og fin tekstur (Final Fantasy VI-skogbotn)."""
    for y in range(y0, H):
        for x in range(W):
            n = M.fbm(x / 34, y / 9, s, 4) - 0.5
            f = M.fbm(x / 3, y / 1.6, s + 1, 2) - 0.5
            b.p(x, y, M.tone(r, lys + (y - y0) / (H - y0) * helling + n * flekk * 2 * 0.45 + f * fin, x, y))


def slagskugge(b, x0, x1, y0, y1, styrke=0.35, farge="#101420"):
    for yy in range(int(y0), int(y1)):
        for xx in range(int(x0), int(x1)):
            if 0 <= xx < W and 0 <= yy < H: b.p(xx, yy, M.blend(b.get(xx, yy), farge, styrke))


def stamme(b, x0, x1, ytop, ybot, r, s, rotter=True):
    """Tjukk stamme i forgrunnen med bork (loddrette sprekker) og røter som breier seg ut."""
    for y in range(ytop, ybot):
        spreid = max(0, (y - (ybot - 18))) ** 1.6 / 6 if rotter else 0
        a, bb = x0 - spreid * 0.6, x1 + spreid
        for x in range(int(a), int(bb) + 1):
            u = (x - a) / max(1, bb - a)
            bork = M.fbm(x / 1.5, y / 9, s, 3) - 0.5
            v = 0.62 - u * 0.5 + bork * 0.7
            if (x * 3 + int(M.fbm(x / 4, y / 30, s + 2) * 8)) % 7 == 0: v -= 0.25
            b.p(x, y, M.tone(r, v, x, y))


def utmark():
    """Utmarka i kveldsljos: stripete kveldsskyer, fiolette fjell, granskog i fleire lag med
    varmt kantljos, ei tjønn som speglar himmelen, mosebotn med lyng og ljosflekkar, og ein
    tjukk granstamme i venstre kant som rammar inn biletet."""
    b = B()
    himmel(b, 0, 84, M.rampe("#1a1236", "#35205a", "#6a3468", "#b85e6c", "#eea07a", steg=10), 5,
           M.rampe("#3a2a50", "#6a4870", "#b06c7c", "#f0a482", "#ffdcaa"), (4, 56), tett=0.5)
    fjellrekke(b, 86, 4, 34, M.rampe("#2e2448", "#42345e", "#5c4a76", "#7c6690"),
               M.rampe("#7a6a9c", "#b496b8", "#eac2cc", "#ffe6e0"), 15, dis=("#b8708a", 0.3))
    fjern = M.rampe("#2a2040", "#342a4e", "#40345c", "#4e4068")
    for i, x in enumerate(range(-4, W + 6, 5)):                         # skogen langt borte, i dis
        M.gran(b, x + int(M.h(i, 1, 81) * 4), 92, 14 + int(M.h(i, 2, 81) * 12), fjern, fro=i)
    naer = M.rampe("#0a0e14", "#101a1e", "#18282a", "#2a3a34", "#8a5a4a")
    for i, x in enumerate(range(-2, W + 6, 7)):                         # nær skogkant, varmt kantljos til venstre
        M.gran(b, x + int(M.h(i, 3, 81) * 5), 99, 22 + int(M.h(i, 4, 81) * 16), naer, lys=-0.12, fro=i + 40)
    mose = M.rampe("#0e1a14", "#16281c", "#203a24", "#2e4e2c", "#426636", "#6a7a3a", "#a08a4a")
    bakke(b, 99, mose, 91, lys=0.4, flekk=0.55)
    vass = M.rampe("#0a0c14", "#161a2a", "#2e2440", "#5a3656", "#9a5a66", "#d08a7a")
    for y in range(102, 120):                                           # tjønna: skogen speglar seg øvst, himmelen nedst
        w = int(60 * math.sqrt(max(0, 1 - ((y - 111) / 9) ** 2)) + (M.fbm(y / 3, 1, 92) - 0.5) * 8)
        for x in range(160 - w, 160 + w):
            v = 0.08 + max(0, (y - 106)) / 14 * 0.7 + (M.fbm(x / 16, y / 1.2, 93, 3) - 0.5) * 0.35
            if M.h(x // 5, y, 94) > 0.975 and y > 110: v = 0.75                # glitter
            b.p(x, y, M.tone(vass, v, x, y))
    M.graset(b, 0, W, 100, H, mose, 94, tett=0.9)
    for i in range(90):                                                 # lyng
        x = int(M.h(i, 1, 95) * W); t = M.h(i, 2, 95); y = int(102 + t * (H - 102))
        c = ["#8a4a7a", "#b0608a", "#6a3a6a"][i % 3]
        b.p(x, y, c)
        if t > 0.5: b.p(x + 1, y, c)
    stein_r = M.rampe("#1c1a26", "#34323e", "#52505e", "#74727e", "#9a8a8e")
    for i in range(7):
        t = M.h(i, 5, 96); x = int(40 + M.h(i, 6, 96) * 180); y = 112 + t * 80
        sz = 2 + t * 5
        slagskugge(b, x - sz * 0.5, x + sz * 1.4, y + sz * 0.3, y + sz * 0.55 + 1)
        M.stein(b, x, y, sz, stein_r)
    stamme(b, -2, 22, 0, H, M.rampe("#0c0a0c", "#1c1414", "#2e2018", "#4a3020", "#7a4a30"), 97)
    return b


def veg():
    """Vegen til Ekset i gyllent kveldsljos: grusveg med hjulspor som svingar inn mot fjella,
    åker med kornband, skigard, bjørker og gardar i lia."""
    b = B()
    himmel(b, 0, 86, M.rampe("#26306c", "#4a5494", "#8a7ca8", "#d49a90", "#f6cc9a", steg=10), 7,
           M.rampe("#6a6090", "#a88aa8", "#e0aa98", "#f8d6aa", "#fff2d8"), (4, 56), tett=0.54)
    fjellrekke(b, 84, 4, 36, M.rampe("#4a4470", "#625a88", "#8478a2", "#a898ba"),
               M.rampe("#a898c0", "#d0bcd4", "#f4dcdc", "#fff4ec"), 17, dis=("#d8a8a0", 0.32))
    fjellrekke(b, 92, 2, 22, M.rampe("#1e3228", "#28422e", "#365838", "#4a6e40"), M.rampe("#4a6e40"), 18,
               dis=("#8a9a70", 0.2), skarp=0.5)
    granl = M.rampe("#0e1a14", "#16281c", "#223a28", "#34503a", "#8a7a52")
    for i, x in enumerate(range(150, W + 6, 6)):                        # granskog i lia bak
        M.gran(b, x + int(M.h(i, 1, 108) * 4), 92, 12 + int(M.h(i, 2, 108) * 12), granl, lys=-0.05, fro=i)
    for gx in (96, 214, 230):                                           # gardar i lia
        for x in range(gx, gx + 7): b.p(x, 83, "#6e7e36"); b.p(x, 84, "#56662c")
        for x in range(gx + 1, gx + 6): b.p(x, 85, "#8a3a2a"); b.p(x, 86, "#5a2a22")
        b.p(gx + 3, 85, "#f4d890")
    gras = M.rampe("#2a3a1c", "#3a5226", "#4e6c30", "#6a8a3a", "#8ca448", "#b8bc5a", "#e0cc7a")
    bakke(b, 92, gras, 101, lys=0.52, flekk=0.4, fin=0.1)
    korn = M.rampe("#6a4a1a", "#8a6424", "#b08a34", "#d0aa48", "#ecca6a", "#fae49a")
    for y in range(92, 110):                                            # åker til venstre: rader med korn
        for x in range(0, 118 - (y - 92) * 3):
            v = 0.55 + (0.2 if (y + x // 7) % 3 == 0 else 0) + (M.fbm(x / 2, y / 1.5, 102, 2) - 0.5) * 0.5
            b.p(x, y, M.tone(korn, v, x, y))
    M.graset(b, 0, W, 108, H, gras, 103, tett=0.7)
    grus = M.rampe("#4a3620", "#6a5030", "#8a6c44", "#a8885a", "#c8a878", "#e4c898")
    for y in range(92, H):                                              # grusvegen med hjulspor
        t = (y - 92) / (H - 92)
        cx = 150 - t * 70 + math.sin(t * 3.2) * 18; hw = 2 + t * 46
        for x in range(int(cx - hw), int(cx + hw) + 1):
            u = (x - cx) / hw
            v = 0.55 - u * 0.1 + (M.fbm(x / 2, y / 1.5, 104, 2) - 0.5) * 0.5
            if abs(abs(u) - 0.5) < 0.1: v -= 0.3                          # hjulspor
            c = M.tone(grus, v, x, y)
            if abs(u) < 0.12 and t > 0.1: c = M.tone(gras, 0.5 + (M.h(x, y, 105) - 0.5) * 0.5, x, y)
            if abs(u) > 0.9 and M.h(x, y, 106) > 0.4: c = M.tone(gras, 0.35, x, y)
            b.p(x, y, c)
    skigard(b, 0, 100, 108, 11, 18)
    skigard(b, 196, 320, 102, 9, 19)
    for x, yb, hh, fr in [(24, 112, 34, 3), (60, 104, 20, 5), (292, 108, 30, 4)]: M.bjork(b, x, yb, hh, fr)
    return b


# ---------------------------------------------------------------- innandørs (måla)
def tommervegg(b, x0, x1, y0, y1, r, s, stokk=8):
    """Laftevegg: runde stokkar med lys overside, mørk sprekk under, årer i treet og kvist."""
    for y in range(y0, y1):
        k = (y - y0) % stokk; nr = (y - y0) // stokk
        for x in range(x0, x1):
            aare = M.fbm(x / 22 + nr * 3.1, k / 1.3 + nr, s, 3) - 0.5
            v = 0.62 - abs(k - stokk * 0.35) / stokk * 0.9 + aare * 0.5 + (M.h(nr, 0, s) - 0.5) * 0.15
            if k == stokk - 1: v = 0.02                                  # sprekk mellom stokkane
            if M.h(x // 6, nr, s + 1) > 0.97 and 2 <= k <= 4: v -= 0.35      # kvist
            b.p(x, y, M.tone(r, v, x, y))


def plankegolv(b, y0, vx, vy, r, s, breidd=0.55):
    """Golv av breie plankar i perspektiv mot eit flukt-punkt, med årer og mørke fuger."""
    for y in range(y0, H):
        for x in range(W):
            u = (x - vx) / max(1, y - vy) / breidd
            plank = math.floor(u); f = u - plank
            aare = M.fbm(plank * 7.3, y / 5, s, 3) - 0.5
            v = 0.5 + (M.h(plank, 0, s) - 0.5) * 0.3 + aare * 0.5 + (y - y0) / (H - y0) * 0.15
            if f < 0.06 or f > 0.96: v = 0.05
            b.p(x, y, M.tone(r, v, x, y))


def ljos(b, cx, cy, radius, farge, styrke, x0=0, x1=None, y0=0, y1=None):
    """Ljos som fell av utover (dithera i fire steg), til dømes frå elden eller eit lys."""
    for y in range(y0, y1 or H):
        for x in range(x0, x1 or W):
            d = math.hypot(x - cx, (y - cy) * 1.2)
            a = max(0.0, 1 - d / radius) ** 1.4 * styrke
            if a <= 0: continue
            t = math.floor(a * 8 + M.terskel(x, y)) / 8
            if t > 0: b.p(x, y, M.blend(b.get(x, y), farge, min(0.6, t)))


def morke(b, styrke=0.55, farge="#0a0608"):
    """Mørke hjørne og kantar (vignett), dithera."""
    for y in range(H):
        for x in range(W):
            d = math.hypot((x - W / 2) / (W / 2), (y - H * 0.55) / (H * 0.6))
            a = max(0.0, d - 0.55) * styrke * 1.6
            t = math.floor(a * 4 + M.terskel(x, y)) / 4
            if t > 0: b.p(x, y, M.blend(b.get(x, y), farge, min(0.8, t)))


def inne():
    """Røykstova: laftevegger med runde stokkar, svart sot under taket, kvitkalka grue med eld
    i hjørnet, hylle med trefat, vindauge, sengebenk med åklede, breie golvplankar i perspektiv,
    varmt ljos frå elden og mørke hjørne."""
    b = B()
    tre = M.rampe("#1a0e08", "#3a2212", "#5a361c", "#7a4c28", "#9a6636", "#b88248")
    tommervegg(b, 0, W, 0, 100, tre, 111)
    for y in range(0, 22):                                              # sot under taket
        for x in range(W):
            a = (1 - y / 22) * 0.9
            if a > M.terskel(x, y) * 0.9: b.p(x, y, M.blend(b.get(x, y), "#0c0808", 0.75))
    for bx in (70, 180, 290):                                           # takbjelkar
        for y in range(0, 18):
            for x in range(bx, bx + 12): b.p(x, y, M.tone(tre, 0.4 - (x - bx) / 12 * 0.35 + (M.h(x, y // 3, 112) - 0.5) * 0.2, x, y))
    # vindauge med småruter og dagsljos
    for y in range(30, 52):
        for x in range(206, 230):
            ramme = (x - 206) % 12 in (0, 11) or (y - 30) % 11 in (0, 10)
            b.p(x, y, "#d8ccb0" if ramme else M.tone(M.rampe("#8aa8c8", "#b8d0e4", "#e4eef6"), 0.4 + (y - 30) / 44, x, y))
    # hylle med trefat og krus
    for x in range(96, 184): b.p(x, 44, "#b08650"); b.p(x, 45, "#6a4424"); b.p(x, 46, "#3a2212")
    for i, cx in enumerate(range(104, 180, 13)):
        for y in range(34, 44):
            for x in range(cx - 5, cx + 6):
                d = math.hypot(x - cx, (y - 39) * 1.1)
                if d <= 5.2: b.p(x, y, M.tone(M.rampe("#5a3a1c", "#8a5a2e", "#b88248", "#dcae6c"), 0.9 - d / 7 + (x < cx) * 0.1, x, y))
        b.p(cx, 39, "#983040" if i % 2 else "#2c4288"); b.p(cx - 1, 39, "#f4dc70")
    # sengebenk med raudt åklede til høgre
    for y in range(62, 100):
        for x in range(250, W):
            if y < 70: b.p(x, y, M.tone(tre, 0.7, x, y)); continue
            rute = ((x + y) // 4) % 3 == 0 or ((x - y) // 4) % 3 == 0
            c = M.tone(M.rampe("#3a0e18", "#6a1a2a", "#983040", "#c8584a"), 0.5 + (M.fbm(x / 3, y / 3, 113) - 0.5) * 0.6, x, y)
            if rute and y > 74: c = "#d8b040" if (x + y) % 2 else "#983040"
            b.p(x, y, c)
    # kvitkalka grue med hette i venstre hjørne, eld og gryte
    kalk = M.rampe("#6a6460", "#9a948c", "#c8c2b8", "#e8e4dc", "#faf8f2")
    for y in range(8, 102):
        w = 48 if y > 44 else int(20 + (y - 8) * 0.78)
        for x in range(4, 4 + w):
            v = 0.85 - (x - 4) / w * 0.45 + (M.fbm(x / 3, y / 3, 114) - 0.5) * 0.3
            b.p(x, y, M.tone(kalk, v, x, y))
    for y in range(28, 60):                                             # sot over opninga
        for x in range(12, 44):
            a = max(0, 1 - abs(x - 28) / 18) * max(0, 1 - (60 - y) / 32)
            if a > M.terskel(x, y): b.p(x, y, M.blend(b.get(x, y), "#2a2420", 0.5))
    for y in range(60, 100):                                            # eldstaden og elden
        for x in range(12, 44):
            b.p(x, y, "#140a08")
    eld = M.rampe("#5a1a0a", "#a02a10", "#e0601c", "#f8a830", "#fce070", "#fff8d0")
    for y in range(70, 100):
        for x in range(14, 42):
            d = M.fbm(x / 3, y / 4 - 0.5, 115, 3)
            midt = 1 - abs(x - 28) / 15
            v = (y - 70) / 30 * 0.8 + midt * 0.5 + (d - 0.5) * 0.9 - 0.25
            if v > 0.12: b.p(x, y, M.tone(eld, v, x, y))
    for y in range(64, 74):                                             # gryta
        for x in range(20, 37):
            if ((x - 28.5) / 8.5) ** 2 + ((y - 68) / 5.5) ** 2 <= 1:
                b.p(x, y, M.tone(M.rampe("#0c0a0e", "#24222a", "#46444e"), 0.6 - (x - 20) / 17 * 0.6 - (y - 64) / 10 * 0.3, x, y))
    for y in range(20, 64): b.p(28, y, "#1c1a20" if y % 2 else "#3a3840")
    golv = M.rampe("#1e1008", "#3a2010", "#5a341a", "#7a4c26", "#9a6834", "#bc8a4a")
    plankegolv(b, 100, 160, 40, golv, 116, breidd=0.15)
    for x in range(W): b.p(x, 100, "#1a0e08"); b.p(x, 101, "#2e1a0c")
    ljos(b, 28, 86, 150, "#ffb060", 0.55)
    ljos(b, 218, 45, 60, "#d8e4f0", 0.3, y1=100)
    morke(b, 0.7)
    return b


def arkiv():
    """Arkivet i kjellaren: kvelvd mur av store steinar, hyller med protokollar i skinn,
    blekk som renn, steinheller i perspektiv, ein blank blekkpytt og ljos frå ein lysestake."""
    b = B()
    stein = M.rampe("#14121c", "#22202c", "#302e3c", "#403e4e", "#545262", "#6a6878")
    for y in range(0, 104):                                             # murveggen
        rad = y // 12
        for x in range(W):
            off = (rad % 2) * 14; blokk = (x + off) // 28
            fuge = (x + off) % 28 == 0 or y % 12 == 0
            v = 0.45 + (M.h(blokk, rad, 121) - 0.5) * 0.3 + (M.fbm(x / 4, y / 4, 122) - 0.5) * 0.4
            v -= ((y % 12) / 12) * 0.12
            b.p(x, y, M.tone(stein, 0.05 if fuge else v, x, y))
    for (bx, bw) in [(0, 70), (250, 70)]:                               # kvelv øvst
        for y in range(0, 26):
            for x in range(bx, bx + bw):
                if (x - (bx + bw / 2)) ** 2 / (bw / 2) ** 2 + (y / 26) ** 2 < 1: continue
                b.p(x, y, M.blend(b.get(x, y), "#06040a", 0.6))
    skinn = ["#4a2418", "#62182a", "#2a2448", "#3a2c1c", "#1e3028", "#5a3a1a"]
    for sx in range(8, W, 64):                                          # hyller med protokollar
        for y in range(18, 100):
            for x in range(sx, sx + 52): b.p(x, y, M.tone(M.rampe("#140a08", "#24140c", "#3a2214"), 0.5 + (M.h(x, y // 4, 123) - 0.5) * 0.3, x, y))
        for hy in range(24, 96, 17):
            x = sx + 3
            while x < sx + 49:
                w = 4 + int(M.h(x, hy, 124) * 4); c = M.hx(skinn[int(M.h(x, hy, 125) * len(skinn))])
                top = hy + int(M.h(x, hy, 126) * 4)
                for yy in range(top, hy + 14):
                    for xx in range(x, min(x + w, sx + 49)):
                        v = 0.7 - (xx - x) / w * 0.5
                        b.p(xx, yy, M.blend(c, "#000000", 0.5 - v * 0.5) if v < 0.5 else M.blend(c, "#ffffff", (v - 0.5) * 0.25))
                if M.h(x, hy, 132) > 0.6:                                   # gulltrykk på somme
                    for xx in range(x + 1, min(x + w - 1, sx + 49)): b.p(xx, top + 3, "#8a7030")
                x += w + 1
            for x in range(sx, sx + 52): b.p(x, hy + 14, "#5a3a22"); b.p(x, hy + 15, "#2a1a10")
        for k in range(2):                                              # blekk som renn nedover
            dx = sx + 10 + k * 26 + int(M.h(sx, k, 127) * 8)
            for y in range(34 + k * 18, 100):
                b.p(dx, y, "#2a2458"); b.p(dx + 1, y, "#181238")
            b.p(dx, 100, "#383070")
    heller = M.rampe("#100e16", "#1c1a24", "#2a2834", "#3a3846", "#4e4c5a")
    for y in range(104, H):                                             # steinheller i perspektiv
        for x in range(W):
            u = (x - 160) / max(1, y - 50) * 1.6; rad = int((y - 104) ** 0.8 / 5)
            fuge = abs(u - round(u)) < 0.05 or (y - 104) ** 0.8 % 5 < 0.35
            v = 0.45 + (M.h(round(u), rad, 128) - 0.5) * 0.3 + (M.fbm(x / 5, y / 3, 129) - 0.5) * 0.4
            b.p(x, y, M.tone(heller, 0.03 if fuge else v, x, y))
    blekk = M.rampe("#08061a", "#140f30", "#201848", "#383070", "#5848a0", "#8878d0")
    for y in range(130, 158):                                           # blank blekkpytt
        w = int(100 * math.sqrt(max(0, 1 - ((y - 144) / 14) ** 2)) + (M.fbm(y / 3, 2, 130) - 0.5) * 16)
        for x in range(120 - w, 120 + w):
            v = 0.3 + (M.fbm(x / 20, y / 3, 131) - 0.5) * 0.4
            if abs(y - 137 - (x - 90) * 0.05) < 1.2 and 70 < x < 140: v = 0.95      # glans
            b.p(x, y, M.tone(blekk, v, x, y))
    for y in range(60, 80): b.p(262, y, "#c08018"); b.p(263, y, "#8a5a18")       # lysestake
    for y in range(80, 84):
        for x in range(256, 270): b.p(x, y, "#8a5a18")
    b.p(262, 57, "#fff4c0"); b.p(262, 58, "#f8b830"); b.p(263, 58, "#f8b830"); b.p(262, 56, "#fffce8")
    ljos(b, 262, 60, 190, "#f8c070", 0.5)
    morke(b, 0.9)
    return b


def stabbur():
    """Stabburet på Åsen inne: mørkt, kaldt tømmer og ingen eldstad. Takbjelke med spekemat som
    heng i snorer, kornbingar med loka oppe og korn i romma, tønner med gjordar av vidje, ein
    kagge og flatbrød i stablar på ein benk, breie golvplankar. Det einaste lyset er dagslys frå
    glugga: ein skrå stråle med støv som fell ned på golvet (flekken der fiendane står)."""
    b = B()
    tre = M.rampe("#0c0a0e", "#1e1618", "#32241e", "#4a3426", "#634632", "#7e5c40")
    tommervegg(b, 0, W, 0, 102, tre, 141, stokk=9)
    # takbjelke på tvers med ei stong under, og spekemat som heng i snorer
    for y in range(16, 28):
        for x in range(W):
            v = 0.62 - (y - 16) / 12 * 0.55 + (M.fbm(x / 9, y / 2, 142) - 0.5) * 0.25
            b.p(x, y, M.tone(tre, v, x, y))
    for x in range(W): b.p(x, 28, "#0c0a0e")
    kjot = M.rampe("#2a0a10", "#4e141c", "#7a2228", "#a43a34", "#c8604a")
    fett = M.rampe("#7a6a5a", "#b8a890", "#e8dcc4")
    for i, (cx, lengd, w) in enumerate([(92, 30, 9), (118, 22, 4), (132, 26, 4), (150, 34, 10), (176, 20, 4), (190, 28, 8)]):
        top = 30 + (i % 2) * 2
        for y in range(28, top): b.p(cx, y, "#c8b490" if y % 2 else "#8a7a60")      # snora
        for y in range(top, top + lengd):
            t = (y - top) / lengd
            hw = w * (math.sin(min(1, t * 1.25) * math.pi * 0.9) * 0.8 + 0.25) if w > 5 else w * 0.6
            for x in range(int(cx - hw), int(cx + hw) + 1):
                v = 0.75 - (x - cx + hw) / (2 * hw + 1) * 0.6 + (M.fbm(x / 2, y / 3, 143 + i) - 0.5) * 0.3
                c = M.tone(kjot, v, x, y)
                if w > 5 and x <= cx - hw + 1: c = M.tone(fett, 0.4 + v * 0.5, x, y)    # svor og feitt i kanten
                if w <= 5 and (y - top) % 6 == 5: c = "#1a0a0c"                           # pølsebind
                b.p(x, y, c)
            if w <= 5: b.p(int(cx - hw) + 1, y, M.tone(kjot, 0.95, x, y))
    # glugga høgt oppe på veggen: dagslys gjennom sprinklar
    for y in range(36, 52):
        for x in range(214, 234):
            kant = x in (214, 233) or y in (36, 51)
            sprinkel = (x - 214) % 5 == 0
            b.p(x, y, "#1a1210" if kant else "#5a4434" if sprinkel else M.tone(M.rampe("#a8bccc", "#d8e4ea", "#f4f6f2"), 0.4 + (51 - y) / 30, x, y))
    # kornbingar mot bakveggen til venstre: rom med korn og mjøl, loka står opp
    for bx, innhald in [(6, "korn"), (52, "mjol"), (98, "korn")]:
        for y in range(54, 102):
            for x in range(bx, bx + 44):
                plank = (y - 54) // 8
                v = 0.5 + (M.h(plank, bx, 144) - 0.5) * 0.25 + (M.fbm(x / 10, y / 1.5, 145) - 0.5) * 0.35
                if (y - 54) % 8 == 7 or x in (bx, bx + 43): v = 0.05
                if x < bx + 3: v += 0.2
                b.p(x, y, M.tone(tre, v, x, y))
        for y in range(34, 54):                                              # loket står opp
            for x in range(bx + 2, bx + 42):
                v = 0.42 + (M.fbm(x / 8, y / 1.5, 146) - 0.5) * 0.3 - (y - 34) / 20 * 0.15
                if (x - bx) % 13 == 0: v = 0.08
                b.p(x, y, M.tone(tre, v, x, y))
        r = M.rampe("#5a4418", "#8a6a28", "#b89440", "#dcbc68") if innhald == "korn" else M.rampe("#8a8478", "#b8b2a4", "#dcd8cc", "#f2f0e8")
        for y in range(54, 60):                                              # korn eller mjøl i romet
            for x in range(bx + 2, bx + 42):
                kuv = 3 * math.sin((x - bx) / 40 * math.pi)
                if y >= 58 - kuv: b.p(x, y, M.tone(r, 0.35 + (M.fbm(x / 2, y, 147) - 0.5) * 0.6 + (59 - y) * 0.06, x, y))
    # benk med flatbrød i stablar, og ein kagge på bukk
    for y in range(80, 84):
        for x in range(150, 206): b.p(x, y, M.tone(tre, 0.7 if y == 80 else 0.35, x, y))
    for lx in (154, 200):
        for y in range(84, 102): b.p(lx, y, "#1e1618"); b.p(lx + 1, y, "#32241e")
    brod = M.rampe("#5a3a18", "#8a6030", "#b88a4a", "#dcb878", "#f0dca8")
    for sx, n in [(162, 6), (180, 9), (196, 4)]:                          # tynne leivar, kantane ujamne
        for k in range(n):
            y = 79 - k
            hw = 9 + int(M.h(k, sx, 152) * 3)
            for x in range(sx - hw, sx + hw + 1):
                v = (0.75 if k % 2 else 0.45) - (x - sx) / hw * 0.3 + (M.h(x, y, 148) - 0.5) * 0.15
                if k == n - 1: v = 0.9 - (x - sx) / hw * 0.2
                b.p(x, y, M.tone(brod, v, x, y))
            b.p(sx + hw, y, M.tone(brod, 0.05, sx, y))
    # tønner med gjordar av vidje til høgre
    for cx, top in [(258, 58), (292, 62)]:
        for y in range(top, 102):
            t = (y - top) / (102 - top)
            hw = 15 + math.sin(t * math.pi) * 3
            for x in range(int(cx - hw), int(cx + hw) + 1):
                u = (x - cx) / hw
                v = 0.6 - u * 0.45 - abs(u) ** 3 * 0.3 + (M.fbm(x / 2, y / 9, 149) - 0.5) * 0.2
                if int((u + 1) * 5) != int((u + 1.04) * 5): v = 0.08               # stavar
                c = M.tone(tre, v, x, y)
                if (y - top) % 14 in (3, 4): c = M.tone(M.rampe("#2a2410", "#4a4220", "#6e6434"), 0.6 - u * 0.5, x, y)
                b.p(x, y, c)
        for x in range(int(cx - 15), int(cx + 16)):                          # lok
            b.p(x, top, M.tone(tre, 0.75, x, top)); b.p(x, top + 1, M.tone(tre, 0.55, x, top))
    golv = M.rampe("#0e0a0c", "#20160f", "#342418", "#4a3422", "#624630", "#7c5c40")
    plankegolv(b, 102, 160, 30, golv, 150, breidd=0.22)
    for x in range(W): b.p(x, 102, "#0c0a0e"); b.p(x, 103, "#1e1618")
    for x0, x1 in [(6, 140), (150, 206), (240, 310)]:                       # slagskugge langs veggen
        for y in range(104, 110):
            for x in range(x0, x1):
                if (110 - y) / 6 * 0.7 > M.terskel(x, y): b.p(x, y, M.blend(b.get(x, y), "#06040a", 0.55))
    # strålen frå glugga: skrå, breiar seg ut, med støv, og ein lys flekk på golvet
    for y in range(52, H):
        t = (y - 52) / (150 - 52)
        if t > 1.05: break
        x0 = 214 + (96 - 214) * t; x1 = 234 + (176 - 234) * t
        for x in range(int(x0), int(x1) + 1):
            kant = min(x - x0, x1 - x) / max(1, (x1 - x0) / 2)
            a = (0.75 - t * 0.3) * min(1, kant * 2.5)
            if a > M.terskel(x, y): b.p(x, y, M.blend(b.get(x, y), "#e8e4cc", 0.2 + 0.14 * (kant > 0.45) + 0.08 * (kant > 0.75)))
    for i in range(45):                                                   # støv som sviv i strålen
        t = M.h(i, 1, 151); y = int(52 + t * 96)
        x = int(214 + (96 - 214) * t + 4 + M.h(i, 2, 151) * (12 + (176 - 96 - 20) * t))
        b.p(x, y, "#fff6dc" if i % 3 else "#d8d0b4")
        if i % 4 == 0: b.p(x + 1, y, "#fff6dc"); b.p(x, y + 1, "#d8d0b4")
    for y in range(136, 166):                                             # flekken på golvet
        for x in range(70, 210):
            d = ((x - 138) / 64) ** 2 + ((y - 150) / 12) ** 2
            if d < 1 and (1 - d) * 1.4 > M.terskel(x, y) * 0.9: b.p(x, y, M.blend(b.get(x, y), "#f0e4c0", 0.32 if d < 0.45 else 0.18))
    morke(b, 1.0, "#06040a")
    return b


def klokketarn():
    """Klokketårnet i Hovdekyrkja (løyndomskampen mot kyrkjegrimen): mørk laftevegg, to lydluker
    med skrå spiler der kaldt, grått dagslys sivar inn, den store bronseklokka i ein grov klokkestol
    med tauet hengjande ned, breie golvplankar og kalde lysstrålar med sot i. Kaldt og mørkt:
    kampen skjer etter at lyset i tårnet har vorte kaldt (scena «kyrkjegrimen»)."""
    b = B()
    tre = M.rampe("#08070c", "#141220", "#221e2c", "#332c38", "#463c46", "#5c4e54")
    tommervegg(b, 0, W, 0, 102, tre, 161, stokk=10)
    # lydlukene: opningar i veggen med skrå spiler, kaldt lys mellom dei
    himmel = M.rampe("#5c6a80", "#8494aa", "#aab8c8", "#d0dae2")
    for lx in (22, 250):
        for y in range(30, 76):
            for x in range(lx, lx + 48):
                kant = x in (lx, lx + 1, lx + 46, lx + 47) or y in (30, 31, 74, 75)
                spile = (y - 32) % 7
                if kant: c = M.tone(tre, 0.12 if x > lx + 40 or y > 72 else 0.55, x, y)
                elif spile <= 3: c = M.tone(tre, 0.62 - spile * 0.12 + (M.fbm(x / 6, y, 162) - 0.5) * 0.2, x, y)
                elif spile == 4: c = M.tone(tre, 0.05, x, y)
                else: c = M.tone(himmel, 0.35 + (75 - y) / 70 + (spile - 5) * 0.2, x, y)
                b.p(x, y, c)
    # klokkestolen: to grove stolpar, ein tverrbjelke og skråband
    stol = M.rampe("#0c0a10", "#1e1818", "#30261e", "#463626", "#5e4a32", "#7a6040")
    def bjelke(x0, x1, y0, y1, loddrett):
        for y in range(y0, y1):
            for x in range(x0, x1):
                u = (x - x0) / max(1, x1 - x0 - 1) if loddrett else (y - y0) / max(1, y1 - y0 - 1)
                v = 0.78 - u * 0.62 + (M.fbm(x / (2 if loddrett else 11), y / (11 if loddrett else 2), 163) - 0.5) * 0.3
                b.p(x, y, M.tone(stol, v, x, y))
    for sx in (92, 216):
        bjelke(sx, sx + 12, 0, 104, True)
    bjelke(80, 240, 10, 22, False)
    for i in range(24):                                                   # skråband i hjørna
        for d in range(5):
            b.p(104 + i, 22 + i + d, M.tone(stol, 0.55 - d * 0.1, 104 + i, 22 + i))
            b.p(215 - i, 22 + i + d, M.tone(stol, 0.35 - d * 0.06, 215 - i, 22 + i))
    # klokka: bronse, lys frå venstre, mørk inni munnen, med åk og kolv
    bronse = M.rampe("#120a06", "#2a1c0e", "#463016", "#644822", "#846232", "#a8844a", "#c8a870")
    bjelke(142, 178, 22, 30, False)                                       # åket
    for y in range(30, 86):
        t = (y - 30) / 56
        # klokkeprofilen: rund skulder, nesten rett liv, og ein mjuk, brei sveif ut mot munnen
        hw = 13 + 5 * math.sqrt(min(1, t / 0.12)) + 4 * t + 15 * max(0, t - 0.6) ** 2 / 0.16
        for x in range(int(160 - hw), int(160 + hw) + 1):
            u = (x - 160) / hw
            v = 0.5 - u * 0.4 - abs(u) ** 4 * 0.25 + (0.14 if -0.6 < u < -0.38 else 0) - t * 0.1
            if y in (40, 41, 74, 75): v -= 0.22                          # list rundt klokka
            if y >= 82: v = 0.26 - u * 0.2
            c = M.tone(bronse, v, x, y)
            if u < -0.86 and y < 82: c = M.blend(c, "#8a96aa", 0.35)       # kaldt kantlys frå lydluka
            b.p(x, y, c)
    for y in range(86, 89):                                               # munnen: mørk inni
        hw = 31 - (y - 86) * 3
        for x in range(160 - hw, 160 + hw + 1):
            b.p(x, y, M.tone(bronse, 0.03, x, y))
    for y in range(84, 96):                                               # kolven heng ned i munnen
        for x in range(156, 165):
            if (x - 160) ** 2 / 10 + (y - 92) ** 2 / 9 < 1 or (x in (159, 160) and y < 90):
                b.p(x, y, M.tone(bronse, 0.42 - (x - 156) * 0.05, x, y))
    # tauet ned frå åket, langs høgre side
    for y in range(26, 104):
        x = 186 + round(math.sin(y / 40) * 1.5)
        b.p(x, y, "#9a8a6a" if (y // 2) % 2 else "#6a5c44"); b.p(x + 1, y, "#4a3e30")
    # golvet: breie, slitne plankar
    golv = M.rampe("#0a0810", "#18141a", "#262024", "#383030", "#4c4240", "#62564e")
    plankegolv(b, 102, 160, 30, golv, 164, breidd=0.24)
    for x in range(W): b.p(x, 102, "#08070c"); b.p(x, 103, "#141220")
    # kalde lysstrålar frå lydlukene ned på golvet, med sot som sviv i dei
    for lx, dx in ((22, 1), (250, -1)):
        for y in range(76, H):
            t = (y - 76) / 90
            if t > 1: break
            x0 = lx + 4 + dx * t * 70; x1 = lx + 44 + dx * t * 80
            x0, x1 = min(x0, x1), max(x0, x1)
            for x in range(int(x0), int(x1) + 1):
                kant = min(x - x0, x1 - x) / max(1, (x1 - x0) / 2)
                a = (0.6 - t * 0.4) * min(1, kant * 2.2)
                if a > M.terskel(x, y): b.p(x, y, M.blend(b.get(x, y), "#b8c8d8", 0.16 + 0.1 * (kant > 0.5)))
    for y in range(120, 150):                                             # flekken der fiendane står
        for x in range(20, 170):
            d = ((x - 92) / 72) ** 2 + ((y - 134) / 13) ** 2
            if d < 1 and (1 - d) * 1.4 > M.terskel(x, y) * 0.9: b.p(x, y, M.blend(b.get(x, y), "#aab8cc", 0.22 if d < 0.45 else 0.12))
    for i in range(50):
        x = int(M.h(i, 1, 165) * W); y = int(20 + M.h(i, 2, 165) * 150)
        b.p(x, y, "#5c5468" if i % 3 else "#3a3446")
        if i % 4 == 0: b.p(x + 1, y - 1, "#3a3446")
    morke(b, 1.2, "#04030a")
    return b


BAKGRUNNAR = {"tun": tun, "utmark": utmark, "inne": inne, "arkiv": arkiv, "veg": veg, "kyrkje": kyrkje, "stabbur": stabbur, "klokketarn": klokketarn}

if __name__ == "__main__":
    namn = sys.argv[1:] or ["alle"]
    if namn == ["alle"]: namn = list(BAKGRUNNAR)
    os.makedirs(UT, exist_ok=True)
    # Løft landskapet 16 pikslar, så partiet (til høgre) står på bakken og ikkje i fjorden:
    # teikn biletet 16 pikslar høgare enn skjermen og skjer av toppen.
    H += LOFT
    for n in namn:
        im = BAKGRUNNAR[n]().im
        im.crop((0, LOFT, W, H)).save(os.path.join(UT, f"{n}.png")); print(f"bilete/spel/kamp/{n}.png")
