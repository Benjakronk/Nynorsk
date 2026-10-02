"""Utsikta frå Åsen: bakgrunnslag med parallakse og forgrunnselement (bilete/spel/parallakse/).

Åsen fell bratt ned nedst på kartet (stupet), og under ligg Hovdebygda langt nede, som landskapet
under toppen av pyramiden i A Link to the Past. Laga flyttar seg saktare enn kartet (sjå
«Parallakse» i js/rpg/motor.js), og dei er måla med luftperspektiv: lysare, kaldare og med færre
fargar jo lenger borte.

  dal       dalbotnen med Hovdekyrkja, gardane, åkrane, elva og vegen (faktor 0,3). Øvst er
            skogen nedst i åsen vår i dis, nedst skogen på andre sida av dalen, og på sidene
            stig fjellsidene, så laget er ope der (fjella syner gjennom).
  fjell     Sunnmørsalpane rundt dalen og himmelen over dei (faktor 0,12): store fjell med snø
            på sidene og ei fjern fjellrekkje nedst, i dis.
  greiner, greiner-h   bjørkegreiner som heng ned i øvre hjørne (forgrunn, faktor 1,3)
  gras, gras-h         høgt gras og ein tuve i nedre hjørne, framfor utsikta (forgrunn, faktor 1,3)

  python tools/pikselkunst/utsikt.py            skriv alle, og forhand/utsikt-ark.png
  python tools/pikselkunst/utsikt.py dal        berre dalen

Kjelda er dette skriptet. Sjå resultatet i spelet med
  python tools/pikselkunst/skjermbilete.py namn kart=asen m=1 x=22 y=14 stemning=ingen
"""
import os, sys, math
from PIL import Image
import maleri as M

ROT = os.path.dirname(os.path.abspath(__file__))
UT = os.path.abspath(os.path.join(ROT, "..", "..", "bilete", "spel", "parallakse"))
DIS = "#a6b4bc"          # same disfarge som nedst i stupet (DIS i js/rpg/pikslar.js)


class L:
    """Eit lerret med gjennomsikt. p(x, y, farge) set ein piksel (farge som #hex eller (r, g, b))."""
    def __init__(s, w, h):
        s.w, s.h = w, h; s.im = Image.new("RGBA", (w, h), (0, 0, 0, 0)); s.px = s.im.load()
    def p(s, x, y, c):
        x, y = int(x), int(y)
        if 0 <= x < s.w and 0 <= y < s.h:
            c = M.hx(c); s.px[x, y] = (c[0], c[1], c[2], 255)
    def get(s, x, y):
        if 0 <= x < s.w and 0 <= y < s.h:
            c = s.px[int(x), int(y)]
            return c[:3] if c[3] else None
        return None
    def tom(s, x, y):
        if 0 <= x < s.w and 0 <= y < s.h: s.px[int(x), int(y)] = (0, 0, 0, 0)
    def dis(s, x, y, t):
        """Blandar pikselen mot disfargen (luftperspektiv)."""
        c = s.get(x, y)
        if c: s.p(x, y, M.blend(c, DIS, t))


def ss(t): t = max(0.0, min(1.0, t)); return t * t * (3 - 2 * t)


# ---------------------------------------------------------------- dalen
DAL_W, DAL_H = 368, 92

def dalkant(x):
    """Nedre kanten av dalbotnen: skogen på andre sida. Han stig mot sidene, der fjella står."""
    v = ss((70 - x) / 70) ** 1.2 * 36 + ss((x - 290) / 78) ** 1.2 * 38
    return 64 - v + (M.fbm(x / 9, 3, 201, 3) - 0.5) * 5


def elv_y(x): return 50 + 4 * math.sin(x / 41 + 0.6) + 2 * math.sin(x / 15 + 2)
def veg_y(x): return 33 + 2.5 * math.sin(x / 57 + 1.3) + 1.2 * math.sin(x / 19)


def hus(L_, x, y, w, tak, vegg, takh=2, veggh=2, gavl=None):
    """Eit lite hus sett ovanfrå på skrå: tak (lys øvst, mørk kant), vegg under med ei dør."""
    t0, t1, t2 = tak
    for i in range(w):
        L_.p(x + i, y, t2 if 0 < i < w - 1 else t1)
        for k in range(1, takh): L_.p(x + i, y + k, t1 if k < takh - 1 else t0)
    for k in range(veggh):
        for i in range(w): L_.p(x + i, y + takh + k, vegg[0] if k == veggh - 1 else vegg[1])
    if w >= 5: L_.p(x + w // 2, y + takh + veggh - 1, "#3a2a24")
    # slagskugge mot høgre og ned
    for k in range(takh + veggh): L_.p(x + w, y + k + 1, M.blend(L_.get(x + w, y + k + 1) or (90, 120, 80), "#2a3a34", 0.45))


def kyrkje(L_, x, y):
    """Hovdekyrkja: kvit langkyrkje med skifertak og tårn med slankt spir i vest."""
    skifer = ("#3e4658", "#566078", "#7a86a0")
    for i in range(12):                                       # skipet: tak og vegg
        L_.p(x + i, y, skifer[2] if 0 < i < 11 else skifer[1])
        L_.p(x + i, y + 1, skifer[1]); L_.p(x + i, y + 2, skifer[0])
        L_.p(x + i, y + 3, "#eef0ea"); L_.p(x + i, y + 4, "#d6dad4"); L_.p(x + i, y + 5, "#aeb4b4")
    for i in (3, 6, 9): L_.p(x + i, y + 4, "#5a6a80")          # rundboga vindauge
    tx = x - 3                                                 # tårnet, med spir og kors
    for k in range(-3, 6):
        L_.p(tx, y + k, "#eef0ea"); L_.p(tx + 1, y + k, "#d6dad4"); L_.p(tx + 2, y + k, "#aeb4b4")
    L_.p(tx + 1, y + 4, "#5a4038"); L_.p(tx + 1, y + 5, "#5a4038")                   # døra
    for k in range(1, 8):
        L_.p(tx + 1, y - 3 - k, skifer[1] if k < 6 else skifer[2])
        if k < 3: L_.p(tx, y - 3 - k, skifer[2]); L_.p(tx + 2, y - 3 - k, skifer[0])
    L_.p(tx + 1, y - 12, "#d8c060"); L_.p(tx, y - 11, "#d8c060"); L_.p(tx + 2, y - 11, "#d8c060")
    for k in range(6): L_.p(x + 12, y + k + 1, M.blend(L_.get(x + 12, y + k + 1) or (100, 140, 90), "#2a3a34", 0.4))


def krone(L_, x, y, r, rampe, s):
    """Ei lita trekrone (bjørk eller older): rund, lys oppe til venstre."""
    for yy in range(int(y - r) - 1, int(y + r) + 1):
        for xx in range(int(x - r) - 1, int(x + r) + 1):
            dx, dy = (xx + 0.5 - x) / r, (yy + 0.5 - y) / r
            if dx * dx + dy * dy > 1 + (M.h(xx, yy, s) - 0.5) * 0.5: continue
            v = 0.6 - dx * 0.28 - dy * 0.38 + (M.h(xx, yy, s + 1) - 0.5) * 0.3
            L_.p(xx, yy, M.tone(rampe, v, xx, yy))


def dal():
    L_ = L(DAL_W, DAL_H)
    eng = M.rampe("#4e7a4a", "#5e8a50", "#6e9a58", "#80a862", "#94b670")
    for y in range(DAL_H):
        for x in range(DAL_W):
            if y > dalkant(x): continue
            v = 0.5 + (M.fbm(x / 26, y / 9, 211, 4) - 0.5) * 0.7 + (M.fbm(x / 3, y / 2, 212, 2) - 0.5) * 0.18
            L_.p(x, y, M.tone(eng, v, x, y))
    # Åkerteigar: skeive firkantar i grønt og gult, med steingard (grå prikkar) imellom.
    teig = [M.rampe("#86aa5c", "#9cba6a"), M.rampe("#b4b066", "#c8c47a"), M.rampe("#6e9850", "#7ea85a"),
            M.rampe("#a2b870", "#b4c680"), M.rampe("#9a8a5a", "#ae9e6c")]
    for i in range(64):
        cx = 20 + M.h(i, 1, 221) * 330; cy = 20 + M.h(i, 2, 221) * 38
        if cy > dalkant(cx) - 6: continue
        w = 10 + int(M.h(i, 3, 221) * 16); hh = 4 + int(M.h(i, 4, 221) * 5); sk = (M.h(i, 5, 221) - 0.5) * 0.5
        r = teig[int(M.h(i, 6, 221) * len(teig))]
        for yy in range(hh):
            for xx in range(w):
                X, Y = int(cx + xx + yy * sk * 2), int(cy + yy)
                if abs(Y - elv_y(X)) < 3 or abs(Y - veg_y(X)) < 2: continue
                if xx == 0 or yy == hh - 1:
                    if M.h(X, Y, 222) > 0.4: L_.p(X, Y, "#8a8c7c")      # steingard
                    continue
                L_.p(X, Y, M.tone(r, 0.5 + (M.h(X // 2, Y, 223) - 0.5) * 0.6 + (0.3 if yy % 2 else 0), X, Y))
    # Vegen langs dalen, lys grus med mørk kant.
    for x in range(DAL_W):
        y = veg_y(x); yi = int(round(y))
        if yi > dalkant(x) - 2: continue
        L_.p(x, yi, "#cabc8e"); L_.p(x, yi + 1, "#a89a72")
        if M.h(x, 0, 231) > 0.7: L_.p(x, yi - 1, "#b0a47c")
    # Elva: buktar seg gjennom dalen, mørk kant mot land, lyse band i straumen.
    vass = M.rampe("#4c6a74", "#62828c", "#7c9ca6", "#a4c0c8", "#c8dce0")
    for x in range(DAL_W):
        yc = elv_y(x); b = 1.8 + 0.6 * math.sin(x / 23)
        for y in range(int(yc - b) - 1, int(yc + b) + 2):
            if y > dalkant(x) - 1: continue
            d = (y + 0.5 - yc) / b
            if abs(d) > 1.25: continue
            if abs(d) > 0.9: L_.p(x, y, "#3e5a5a" if d > 0 else "#5a7a64"); continue
            v = 0.45 + (M.fbm(x / 6, y / 1.2, 241, 2) - 0.5) * 0.6 - d * 0.15
            L_.p(x, y, M.tone(vass, v, x, y))
    # Ei bru over elva der vegen går over.
    for k in range(-3, 4):
        x = 128; L_.p(x, int(elv_y(x)) + k, "#9a8a6a"); L_.p(x + 1, int(elv_y(x)) + k, "#7a6a50")
    # Tre langs elva og i kantane av teigane (older og bjørk).
    tre = M.rampe("#2e4a36", "#3e5e40", "#527448", "#6a8a52", "#86a060")
    for i in range(130):
        x = M.h(i, 1, 251) * DAL_W
        if i < 70: y = elv_y(x) + (-4 if M.h(i, 2, 251) < 0.5 else 4.5)
        else: y = 20 + M.h(i, 3, 251) * 40
        if y > dalkant(x) - 3 or abs(y - veg_y(x)) < 2: continue
        krone(L_, x, y, 1.3 + M.h(i, 4, 251) * 1.2, tre, 252 + i)
    # Gardane: stove med torvtak, løe, eit stabbur, og tunet rundt (lys grus).
    torv = ("#4e5a30", "#6a7838", "#8a9648")
    gardar = [(52, 24), (92, 22), (150, 25), (176, 42), (246, 24), (274, 42), (318, 28), (112, 42), (226, 46), (340, 40), (26, 38)]
    for i, (gx, gy) in enumerate(gardar):
        if gy > dalkant(gx) - 8: continue
        for yy in range(-1, 7):
            for xx in range(-2, 16):
                if M.h(gx + xx, gy + yy, 261) > 0.25: L_.p(gx + xx, gy + yy, M.blend(L_.get(gx + xx, gy + yy) or (120, 150, 90), "#b8ae84", 0.45))
        hus(L_, gx, gy, 6, torv, ("#5a3a2c", "#7a4e38"))
        hus(L_, gx + 8, gy - 1, 7, torv, ("#6a5a48", "#8a7a62"), takh=3)
        if i % 2 == 0: hus(L_, gx + 3, gy + 6, 3, torv, ("#5a3a2c", "#7a4e38"), takh=1, veggh=2)
    # Hovdekyrkja på ein liten haug midt i dalen, med kyrkjegardsmur rundt.
    kx, ky = 200, 27
    for yy in range(-14, 10):
        for xx in range(-8, 20):
            X, Y = kx + xx, ky + yy
            if (xx in (-8, 19) or yy in (-6, 9)) and -6 <= yy <= 9 and M.h(X, Y, 271) > 0.3: L_.p(X, Y, "#9a9c90")
    kyrkje(L_, kx, ky)
    # Skogen nedst i åsen vår, øvst i biletet: kroner som stig opp av disen ved foten av stupet.
    skog = M.rampe("#283e34", "#344e3e", "#46644a", "#5c7c54", "#7a965e")
    gran = M.rampe("#1e3230", "#28403a", "#345046", "#466452")
    for i in range(120):
        x = M.h(i, 1, 281) * (DAL_W + 10) - 5; y = 3 + M.h(i, 2, 281) ** 0.8 * 15
        if M.h(i, 3, 281) < 0.35:
            M.gran(L_, int(x), y + 3, 5 + M.h(i, 4, 281) * 4, gran, fro=i)
        else:
            krone(L_, x, y, 2 + M.h(i, 5, 281) * 2.2, skog, 282 + i)
    # Skogen på andre sida av dalen, nedst: tett, mørk og i dis, med ujamn tregrense nedover.
    for x in range(DAL_W):
        e = dalkant(x)
        for y in range(int(e) - 7, int(e) + 9):
            d = y - (e - 7)
            if d < 0: continue
            if M.fbm(x / 3, y / 2.5, 291, 2) < 0.28 + d * 0.05: continue
            if y > e + 6 + (M.h(x, 0, 292) - 0.5) * 4: continue
            v = 0.45 + (M.fbm(x / 2.5, y / 2, 293, 2) - 0.5) * 0.9 - d * 0.03
            L_.p(x, y, M.tone(skog, v, x, y))
    # Luftperspektiv: alt litt mot disen, mykje øvst (disen ved foten av stupet) og nedst.
    for y in range(DAL_H):
        for x in range(DAL_W):
            if not L_.get(x, y): continue
            t = 0.26
            if y < 18: t += (18 - y) / 18 * 0.62
            e = dalkant(x)
            if y > e - 10: t += max(0, (y - (e - 10))) / 18 * 0.25
            t = min(0.95, t)
            steg = math.floor(t * 6 + M.terskel(x, y)) / 6               # i trinn, med dither
            L_.dis(x, y, steg)
    # Disen øvst: tett slør av skystriper, tynnar ut nedover.
    for y in range(0, 11):
        for x in range(DAL_W):
            d = M.fbm(x / 30 + y / 12, y / 3, 295, 3)
            if d > 0.42 + y * 0.035 and M.terskel(x, y) < 0.9: L_.p(x, y, M.blend(DIS, "#ffffff", 0.18 if d > 0.6 else 0.08))
            elif y < 3: L_.p(x, y, DIS)
    return L_.im


# ---------------------------------------------------------------- fjella og himmelen
FJ_W, FJ_H = 344, 106

def fjellrekkje(L_, topp, stein, sno, s, dis, snodjup=(6, 10)):
    """Alpine toppar som i pikselkunst: kvar topp har ein rygg (ei line som går ned frå toppen og
    lener seg litt mot høgre). Flanken til venstre for ryggen får ljoset (oppe til venstre), flanken
    til høgre ligg i skugge. Renner og hamrar (støy) gir eit trinn lysare eller mørkare, snøen ligg
    øvst med ujamn nedre kant, og disen aukar nedover (luftperspektiv)."""
    X0, X1 = -24, L_.w + 24
    t = {x: topp(x) for x in range(X0, X1)}
    toppar = [x for x in range(X0 + 9, X1 - 9) if t[x] < 900 and t[x] == min(t[x + k] for k in range(-9, 10))]
    for x in range(L_.w):
        if t[x] > 900: continue
        snog = snodjup[0] + M.fbm(x / 7, 3, s + 5) * snodjup[1]
        for y in range(max(0, int(t[x])), L_.h):
            # Ryggen næmast: den med minst avstand til ryggline (lener seg 0,3 mot høgre nedover).
            best, lys = 1e9, True
            for tp in toppar:
                if t[tp] > y: continue
                rx = tp + (y - t[tp]) * 0.3
                if abs(x - rx) < best: best, lys = abs(x - rx), x < rx
            djup = y - t[x]
            renne = M.fbm(x / 3 + y / 9, y / 5, s + 7, 3) - 0.5
            v = (0.78 if lys else 0.3) + renne * 0.5 - min(1, djup / 60) * 0.2
            if djup < snog + renne * 6: c = M.tone(sno, v + 0.1, x, y)
            else: c = M.tone(stein, v, x, y)
            L_.p(x, y, c)
            L_.dis(x, y, math.floor((dis + min(0.25, djup / 140)) * 5 + M.terskel(x, y)) / 5)


def fjell():
    """Sunnmørsalpane rundt dalen: store fjell med snø på sidene og ei fjern, disig fjellrekkje i
    midten, under skogen på andre sida av dalen. Himmelen er lys og disig."""
    L_ = L(FJ_W, FJ_H)
    himl = M.rampe("#94aac2", "#a6b8cc", "#b8c8d6", "#cad6e0", "#d8e0e6")
    for y in range(FJ_H):
        for x in range(FJ_W):
            L_.p(x, y, M.tone(himl, 0.15 + y / 90 * 0.9, x, y))
    stein = M.rampe("#36405a", "#4a5672", "#64708c", "#808ca6", "#a0aac0")
    sno = M.rampe("#9eabc2", "#bcc7d8", "#dbe3ee", "#f6f8fb")
    side = lambda x: (ss((100 - x) / 100), ss((x - 244) / 100))
    # Den fjerne rekkja i midten: spisse toppar rett under skogkanten på andre sida av dalen.
    fjellrekkje(L_, lambda x: 92 - M.rygg(x / 26, 351) * 18 - M.rygg(x / 9, 352) * 3, stein, sno, 353, 0.45, (3, 6))
    # Dei store fjella på sidene, nærare (mindre dis), med toppane høgt oppe.
    def stor(x):
        v, h = side(x)
        if v + h < 0.03: return 999
        return 106 - (v * 58 + h * 56) - M.rygg(x / 14, 354) * 14 * (v + h) ** 0.5 - M.rygg(x / 6, 355) * 3
    fjellrekkje(L_, stor, stein, sno, 356, 0.18, (6, 10))
    return L_.im


# ---------------------------------------------------------------- forgrunnen
def greiner():
    """Hengebjørk framfor kameraet: ei grein frå øvre hjørne med kvister som heng ned og lauvklasar
    langs dei. Nær kameraet og i skugge: mørke, nesten silhuettar, med lys berre i overkanten."""
    w, h = 118, 50
    L_ = L(w, h)
    bork = ["#24202a", "#46424e", "#8a8692"]
    lauv = ["#0c180e", "#14261a", "#1e3822", "#2e4e2a"]
    # Hovudgreina: frå hjørnet, svakt nedover mot høgre, tynnare utover.
    grein = []
    for x in range(0, 112):
        y = 2 + x * 0.1 + math.sin(x / 13) * 1.5
        grein.append((x, y))
        for d in range(2 if x < 50 else 1):
            L_.p(x, y + d, bork[2] if d == 0 and M.h(x // 3, 0, 421) > 0.55 else bork[1] if d == 0 else bork[0])
    # Hengande kvistar: kurver ned frå greina, med klasar av lauv (små ellipsar i tre tonar).
    klasar = []
    for k, x0 in enumerate([5, 14, 29, 45, 63, 86, 104]):
        y0 = grein[x0][1] + 1
        lengd = [38, 24, 44, 18, 30, 14, 9][k] + M.h(k, 1, 422) * 4
        for n in range(int(lengd)):
            t = n / lengd
            x = x0 + math.sin(t * 1.6) * (3 + M.h(k, 2, 422) * 4); y = y0 + n
            L_.p(x, y, bork[0])
            if n % 4 == 2: klasar.append((x + (2 if n % 8 == 2 else -2), y + 1, 2.2 + M.h(k, n, 423) * 1.6))
        klasar.append((x, y + 2, 2.6))
    for (cx, cy, r) in klasar:
        for yy in range(int(cy - r) - 1, int(cy + r) + 2):
            for xx in range(int(cx - r) - 1, int(cx + r) + 2):
                dx, dy = (xx + 0.5 - cx) / r, (yy + 0.5 - cy) / (r * 0.8)
                if dx * dx + dy * dy > 1: continue
                f = lauv[3] if dy < -0.45 and dx < 0.2 else lauv[2] if dy < 0.1 else lauv[1] if dy < 0.6 else lauv[0]
                L_.p(xx, yy, f)
    return L_.im


def gras():
    """Høgt gras og ein grastuve i nedre hjørne: mørke strå framfor utsikta, ein tett botn."""
    w, h = 92, 64
    L_ = L(w, h)
    r = M.rampe("#0c160e", "#142216", "#1c301c", "#284222", "#38562a", "#4e6a30")
    def botn(x): return 30 + (x / w) ** 1.6 * 26 + math.sin(x / 7) * 2
    for x in range(w):
        for y in range(int(botn(x)), h):
            L_.p(x, y, M.tone(r, 0.22 + (M.fbm(x / 6, y / 4, 411, 2) - 0.5) * 0.3, x, y))
    for i in range(70):
        x0 = M.h(i, 1, 412) * w * (0.4 + 0.6 * M.h(i, 5, 412)); y0 = botn(x0) + 2
        lengd = 10 + M.h(i, 2, 412) * 26 * (1 - x0 / w * 0.7)
        lut = (M.h(i, 3, 412) - 0.4) * 0.6
        for k in range(int(lengd)):
            t = k / lengd
            x = x0 + lut * k * t * 1.4; y = y0 - k
            L_.p(x, y, M.tone(r, 0.25 + t * 0.6 + M.h(i, 4, 412) * 0.2, int(x), int(y)))
            if t < 0.4: L_.p(x + 1, y, r[1])
    return L_.im


BILETE = {"dal": dal, "fjell": fjell, "greiner": greiner, "gras": gras}

if __name__ == "__main__":
    namn = sys.argv[1:] or list(BILETE)
    os.makedirs(UT, exist_ok=True)
    for n in namn:
        im = BILETE[n]()
        im.save(os.path.join(UT, f"{n}.png")); print(f"bilete/spel/parallakse/{n}.png")
        if n in ("greiner", "gras"):
            im.transpose(Image.FLIP_LEFT_RIGHT).save(os.path.join(UT, f"{n}-h.png")); print(f"bilete/spel/parallakse/{n}-h.png")
    # Kontaktark: alle laga i 3x, med dalen over fjella slik dei ligg i spelet.
    filer = ["fjell", "dal", "greiner", "gras"]
    ark = Image.new("RGBA", (FJ_W * 3 + 20, 600), (14, 12, 18, 255))
    fj = Image.open(os.path.join(UT, "fjell.png")); da = Image.open(os.path.join(UT, "dal.png"))
    sam = Image.new("RGBA", (DAL_W, 110), (166, 180, 188, 255)); sam.alpha_composite(fj.crop((0, 0, min(FJ_W, DAL_W), 100)), (0, 4)); sam.alpha_composite(da, (0, 0))
    ark.alpha_composite(sam.crop((0, 0, 320, 110)).resize((960, 330), Image.NEAREST), (10, 10))
    x = 10
    for n in ("greiner", "gras"):
        im = Image.open(os.path.join(UT, f"{n}.png")); ark.alpha_composite(im.resize((im.width * 2, im.height * 2), Image.NEAREST), (x, 350)); x += im.width * 2 + 20
    ark.save(os.path.join(ROT, "forhand", "utsikt-ark.png")); print("forhand/utsikt-ark.png")
