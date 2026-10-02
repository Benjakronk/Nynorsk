"""Utsikta frå Åsen: bakgrunnslag med parallakse og forgrunnselement (bilete/spel/parallakse/).

Øvst på kartet sluttar toppen av åsen, og ein ser utover som i Narshe-bileta i Final Fantasy VI:
himmel øvst, fjella under og dalen med Hovdebygda nedst, nærast kanten. Nedst på kartet fell åsen
bratt ned (stupet), og under stuper lia vidare ned mot dalen, med hyller og skog. Laga flyttar seg saktare enn kartet (sjå «Parallakse» i
js/rpg/motor.js), og dei er måla med luftperspektiv: lysare, kaldare og med færre fargar jo lenger
borte.

  himmel    himmelen øvst (faktor 0,04): blå, lysare mot horisonten, skyer med lys kant.
  fjell     Sunnmørsalpane (faktor 0,1): ei fjern, svært disig fjellrekkje med snø og nærare
            fjell på sidene, gjennomsiktig over toppane.
  dal-nord  utsikta frå kanten øvst (faktor 0,3): til venstre lia opp mot utmarka med setra,
            til høgre Hovdebygda med teigar, gardar, Hovdekyrkja, elva og vegen.
  naer      trekronene i lia rett under kanten øvst (faktor 0,6): mørke granar og bjørker som
            stikk opp over graskanten og søkk bak han når kameraet går ned.
  li        lia og dalen under stupet, sett rett ovanfrå som eit kart frå lufta, eit fast lag
            (faktor 1): ur og knausar, skog som trekroner, dalbotnen med teigar, steingardar og
            skigardar, elva, vegen, gardane som tak og kyrkja med tårnet, og skyer under oss.
            Standard nedst (variant «fast»). Øvst ser ein ned langs dalsida (bergveggar,
            hyller og skog skrått framanfrå), som glir over i dalen rett ovanfrå lenger ned.
  elv       elva i dalen som animert lag (4 rammer): lyse band og glimt som flyt nedover.
  skyer     skyene under oss med skuggen på bakken, eit lag som driv sakte bortover.
  li-kort, dal-under   varianten «dal»: lia sluttar i ei tregrense, og under stig dalbotnen med
            Hovdebygda fram nedanfrå (faktor [1, 1,8]) når kameraet glir ned ved stupet.
  greiner, greiner-h   bjørkegreiner som heng ned i øvre hjørne (forgrunn, faktor 1,3)
  gras, gras-h         høgt gras og ein tuve i nedre hjørne, framfor utsikta (forgrunn, faktor 1,3)

  python tools/pikselkunst/utsikt.py            skriv alle, og forhand/utsikt-ark.png
  python tools/pikselkunst/utsikt.py li         berre lia under stupet

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


# ---------------------------------------------------------------- småting i landskapet
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


# ---------------------------------------------------------------- fjella og himmelen
FJ_W, FJ_H = 344, 112

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


HI_W, HI_H = 332, 104

def himmel():
    """Himmelen øvst (faktor 0,04, nesten stillståande): blå, lysare og kaldare ned mot horisonten,
    med lange, flate skyer som har lys kant mot ljoset."""
    L_ = L(HI_W, HI_H)
    himl = M.rampe("#6a88b2", "#7e9ac0", "#94accc", "#aabed8", "#c2d0e0", "#d2dce6")
    for y in range(HI_H):
        for x in range(HI_W):
            L_.p(x, y, M.tone(himl, 0.04 + y / 84 * 0.95, x, y))
    sky = M.rampe("#8ea2c0", "#b2c0d6", "#d4dce8", "#eef2f6", "#fffaf0")
    for y in range(4, 50):
        for x in range(HI_W):
            d = M.fbm(x / 70 + y / 40, y / 6, 361, 5)
            grense = 0.56 + 0.05 * math.sin(x / 50) - (y - 4) / 46 * 0.04
            if d < grense: continue
            lys = d - M.fbm((x + 3) / 70 + (y + 2) / 40, (y + 2) / 6, 361, 5)   # lys kant opp mot venstre
            # skyene lenger nede (nærare horisonten) er lenger borte: lysare og flatare
            L_.p(x, y, M.blend(M.tone(sky, 0.3 + (d - grense) * 2.4 + lys * 5, x, y), "#d2dce6", min(0.6, y / 80)))
    return L_.im


def fjell():
    """Fjella over kanten øvst (faktor 0,1), utan himmel (gjennomsiktig over toppane): ei fjern,
    svært disig fjellrekkje med snø, og nærare, mørkare fjell på sidene."""
    L_ = L(FJ_W, FJ_H)
    stein = M.rampe("#3a4660", "#4e5a76", "#66728e", "#828ea8", "#a2acc2")
    sno = M.rampe("#a0aec4", "#c0cada", "#dee5ef", "#f8fafc")
    fjellrekkje(L_, lambda x: 60 - M.rygg(x / 30, 371) * 22 - M.rygg(x / 11, 372) * 5, stein, sno, 373, 0.42, (3, 5))
    def naer(x):
        v, h = ss((120 - x) / 120), ss((x - 220) / 124)
        if v + h < 0.05: return 999
        return 96 - (v * 34 + h * 36) - M.rygg(x / 16, 374) * 10 * (v + h) - M.rygg(x / 6, 375) * 3
    fjellrekkje(L_, naer, M.rampe("#2e3a4e", "#3e4c62", "#526078", "#6a7890", "#8894a8"), sno, 376, 0.28, (4, 6))
    return L_.im


# ---------------------------------------------------------------- lia og dalen under stupet, sett ovanfrå
LI_W, LI_H = 448, 212                # like breitt som kartet: laget står fast (faktor 1); kartrad 15 til 27
BERG = ["#1c1a2c", "#2e2a3a", "#48434a", "#645e5e", "#827a74", "#a0978a", "#bdb4a4"]   # som BERG i pikslar.js


def ovanfra(W, H, s=0):
    """Landskapet under stupet sett rett ovanfrå, som eit kart frå lufta (landskapet under pyramiden i
    A Link to the Past, verdskartet i FF6): ur og knausar ved foten av stupet, skog som trekroner
    sett ovanfrå (runde klumpar med lys side oppe til venstre og skugge nede til høgre), og dalbotnen
    med teigar som fargefelt med steingardar og skigardar som liner, elva som eit band, vegen som ei
    line, gardane som små torvtak og Hovdekyrkja med tårnet. Alt ligg langt nede: dempa, disig, og
    nokre skyer driv mellom oss og dalen med skuggen sin på bakken under.
    Gir lerretet og funksjonane for kantane (ur, skog, dal) så variantane kan klippe."""
    L_ = L(W, H)
    ur = lambda x: 26 + 3 * math.sin(x / 23) + (M.fbm(x / 7, 1, 701, 3) - 0.5) * 8        # ura ved foten slutt
    skog = lambda x: 70 + 8 * math.sin(x / 61 + 1) + (M.fbm(x / 9, 2, 702, 3) - 0.5) * 14  # skogen slutt, dalen byrjar
    elv = lambda x: 132 + 9 * math.sin(x / 70 + 0.4) + 4 * math.sin(x / 23)
    veg = lambda x: 104 + 4 * math.sin(x / 90 + 2) + 1.5 * math.sin(x / 31)
    eng = M.rampe("#5a8448", "#68924e", "#78a058", "#8aae62")
    gras = M.rampe("#3e5e36", "#4a6e3c", "#5c8044")
    # Botn: ur, skogbotn (skugge mellom kronene) og eng.
    for x in range(W):
        u, sk = ur(x), skog(x)
        for y in range(H):
            if y < u:
                v = 0.45 + (M.fbm(x / 3, y / 3, 703, 2) - 0.5) * 0.9
                L_.p(x, y, M.tone(M.rampe(BERG[2], BERG[3], BERG[4], BERG[5]), v, x, y))
            elif y < sk: L_.p(x, y, "#1a2c20")
            else:
                v = 0.5 + (M.fbm(x / 30, y / 18, 704, 3) - 0.5) * 0.6 + (M.fbm(x / 3, y / 3, 705, 2) - 0.5) * 0.15
                L_.p(x, y, M.tone(eng, v, x, y))
    # Knausar i ura og i skogen: flate berg med lys kant oppe til venstre og mørk nede til høgre.
    for i in range(26):
        cx = M.h(i, 1, 706) * W; cy = 10 + M.h(i, 2, 706) * 46; rx = 3 + M.h(i, 3, 706) * 6; ry = rx * 0.7
        for yy in range(int(cy - ry) - 1, int(cy + ry) + 2):
            for xx in range(int(cx - rx) - 1, int(cx + rx) + 2):
                dx, dy = (xx + 0.5 - cx) / rx, (yy + 0.5 - cy) / ry
                n = dx * dx + dy * dy + (M.h(xx, yy, 707) - 0.5) * 0.3
                if n > 1: continue
                L_.p(xx, yy, BERG[5] if dx + dy < -0.9 else BERG[2] if dx + dy > 0.8 else BERG[4] if n < 0.5 else BERG[3])
    # Teigar: fargefelt med steingard (grå line) eller skigard (brun, prikka line) rundt.
    teig = ["#8eb064", "#a8b468", "#c8bc72", "#7a9a52", "#9c8458", "#b4c07a"]
    for i in range(90):
        cx = M.h(i, 1, 708) * W; cy = 76 + M.h(i, 2, 708) * (H - 80)
        if cy < skog(cx) + 4: continue
        w = 12 + int(M.h(i, 3, 708) * 20); hh = 8 + int(M.h(i, 4, 708) * 12); sk = (M.h(i, 5, 708) - 0.5) * 0.4
        f = teig[int(M.h(i, 6, 708) * len(teig))]; skigard = M.h(i, 7, 708) > 0.6
        for yy in range(hh):
            for xx in range(w):
                X, Y = int(cx + xx + yy * sk), int(cy + yy)
                if Y < skog(X) + 2 or abs(Y - elv(X)) < 5 or abs(Y - veg(X)) < 2: continue
                if xx == 0 or yy == 0 or xx == w - 1 or yy == hh - 1:
                    if skigard: L_.p(X, Y, "#7a5a3a" if (X + Y) % 3 else "#5a4028")
                    else: L_.p(X, Y, "#9a9a8c" if M.h(X, Y, 709) > 0.3 else "#6e6e66")
                    continue
                stripe = (yy % 3 == 0) if f in ("#9c8458", "#c8bc72") else False      # plogfurer og kornrader
                L_.p(X, Y, M.blend(f, "#000000", 0.08) if stripe else f)
    # Vegen: ei lys line med mørk kant, og ei bru over elva.
    for x in range(W):
        y = round(veg(x))
        if y < skog(x) + 2: continue
        L_.p(x, y, "#d2c496"); L_.p(x, y + 1, "#a89a72")
    # Elva: eit band sett ovanfrå, med mørk bredd, lyse straumband og grusører.
    vass = M.rampe("#4a6a76", "#5e808c", "#7a9ca6", "#a8c4cc")
    straum = {}                                                                          # (x, y) -> d, for elva sine rammer
    for x in range(W):
        yc = elv(x); b = 2.6 + 0.8 * math.sin(x / 19)
        for y in range(int(yc - b) - 2, int(yc + b) + 3):
            d = (y + 0.5 - yc) / b
            if abs(d) > 1.5: continue
            if abs(d) > 1.0: L_.p(x, y, "#3a5a40" if d < 0 else "#2e4a38"); continue
            v = 0.45 + (M.fbm(x / 5, y / 1.5, 710, 2) - 0.5) * 0.8 - d * 0.1
            L_.p(x, y, M.tone(vass, v, x, y)); straum[(x, y)] = (d, L_.get(x, y))
        if M.h(x // 9, 0, 711) > 0.8 and abs(x % 9 - 4) < 3: L_.p(x, int(yc + b * 0.6), "#c8bc98")   # grusører
    bx = 236
    for k in range(-4, 5): L_.p(bx, int(elv(bx)) + k, "#b0a07a"); L_.p(bx + 1, int(elv(bx)) + k, "#8a7a5a")
    # Tre langs elva og i teigkantane: små kroner sett ovanfrå.
    tre = ["#1e3424", "#2e4a2e", "#46683a", "#62844a"]
    def krone_ovanfra(cx, cy, r, f=tre):
        for yy in range(int(cy - r) - 1, int(cy + r) + 2):
            for xx in range(int(cx - r) - 1, int(cx + r) + 2):
                dx, dy = (xx + 0.5 - cx) / r, (yy + 0.5 - cy) / r
                n = dx * dx + dy * dy
                kant = 1 + (M.h(xx, yy, 712) - 0.5) * 0.45                    # takka kant (stjerneforma)
                if n > kant: continue
                L_.p(xx, yy, f[3] if dx + dy < -0.7 and n > 0.2 else f[2] if dx + dy < 0.1 else f[1] if n < 0.75 else f[0])
        for k in range(2): L_.p(cx + r + k * 0.5, cy + r * 0.6 + k, "#16261c")      # skugge nede til høgre
    for i in range(160):
        x = M.h(i, 1, 713) * W
        y = elv(x) + (-6 if M.h(i, 2, 713) < 0.5 else 6) if i < 90 else 76 + M.h(i, 3, 713) * (H - 76)
        if y < skog(x) + 3: continue
        krone_ovanfra(x, y, 1.6 + M.h(i, 4, 713) * 1.4)
    # Gardane: små torvtak (med møne) og tunet rundt, kyrkja med tårnet og kyrkjegardsmuren.
    def tak(x, y, w, h, f=("#4e5a30", "#6a7838", "#8a9648")):
        for yy in range(h):
            for xx in range(w):
                L_.p(x + xx, y + yy, f[2] if yy == h // 2 else f[1] if yy < h // 2 else f[0])
        for yy in range(h): L_.p(x + w, y + yy + 1, "#2a3424")                          # skugge
        for xx in range(w): L_.p(x + xx + 1, y + h, "#2a3424")
    for i, (gx, gy) in enumerate([(30, 92), (78, 112), (126, 90), (168, 118), (290, 96), (330, 116), (376, 92), (420, 112), (60, 150), (360, 152)]):
        if gy < skog(gx) + 4: continue
        for yy in range(-2, 10):
            for xx in range(-3, 16):
                if M.h(gx + xx, gy + yy, 714) > 0.3: L_.p(gx + xx, gy + yy, "#b8ae84")
        tak(gx, gy, 6, 4); tak(gx + 8, gy + 1, 7, 5, ("#5a5040", "#7a6a50", "#9a8a68")); tak(gx + 2, gy + 6, 3, 2)
    kx, ky = 222, 96
    for yy in range(-6, 12):
        for xx in range(-6, 22):
            if (xx in (-6, 21) or yy in (-6, 11)) and M.h(kx + xx, ky + yy, 715) > 0.2: L_.p(kx + xx, ky + yy, "#a4a49a")
            elif -6 < xx < 21 and -6 < yy < 11: L_.p(kx + xx, ky + yy, "#7a9c5a")
    for (gx, gy) in [(-2, 8), (4, 8), (10, 8), (16, 8), (-2, -3), (16, -3)]:             # gravsteinar
        L_.p(kx + gx, ky + gy, "#c8c8c0")
    tak(kx, ky, 12, 5, ("#3e4658", "#566078", "#7a86a0"))                                 # skiferak på skipet
    for yy in range(4):
        for xx in range(4): L_.p(kx - 4 + xx, ky + 1 + yy, "#eef0ea" if xx < 2 else "#c8ccc8")   # tårnet
    L_.p(kx - 3, ky + 2, "#3e4658"); L_.p(kx - 2, ky + 2, "#566078")                       # spiret som ein prikk
    for k in range(3): L_.p(kx, ky + 5 + k, "#2a3424")
    # Skogen: tette trekroner sett ovanfrå, større og mørkare (gran) med lysare bjørker innimellom.
    for i in range(1400):
        x = M.h(i, 1, 716) * (W + 8) - 4; y = ur(x) - 2 + M.h(i, 2, 716) * (skog(x) - ur(x) + 4)
        if M.h(i, 3, 716) < 0.25:
            krone_ovanfra(x, y, 2.4 + M.h(i, 4, 716) * 1.4, ["#2a3e28", "#3e5a32", "#5a7a40", "#7a9a52"])   # bjørk
        else:
            krone_ovanfra(x, y, 2.8 + M.h(i, 4, 716) * 1.8, ["#14241a", "#1c3222", "#2a4428", "#3c5a32"])   # gran
    # Langt nede: dempa og disig (meir nedover), og svake lysstrålar på skrå.
    for y in range(H):
        for x in range(W):
            c = L_.get(x, y)
            if not c: continue
            t = 0.26 + y / H * 0.22
            if (x + y * 0.7) % 70 < 16: t -= 0.08
            if (x, y) in straum and straum[(x, y)][1] == c: straum[(x, y)] = (straum[(x, y)][0], t)   # framleis vatn (ikkje dekt av tre)
            elif (x, y) in straum: del straum[(x, y)]
            L_.dis(x, y, math.floor(t * 6 + M.terskel(x, y)) / 6)
    L_.straum = {k: v for k, v in straum.items() if isinstance(v[1], float)}
    return L_, ur, skog


# Kvar lufta byrjar under stupet, per flis-kolonne (kartrad), så skuggen under overhenget kjem rett.
# Må stemme med rader i kartet asen i js/rpg/data.js: platået (17), hylla (20), neset (18), vika (16).
LUFTRAD = [17] * 4 + [19] * 14 + [17] * 3 + [17] * 3 + [17] + [16] * 3   # hylla og neset har overheng (rad 17 og 15)
LI_TOPP = 15                          # biletet byrjar ved kartrad 15


def berg(L_, x, y, skala, s, dis):
    """Ein piksel bergvegg sett framanfrå (Narshe): store knausar med lys side mot venstre og djupe
    renner. skala < 1 gjer formene mindre (lenger borte). dis: kor mykje mot disfargen."""
    kn = lambda X, Y: 0.62 * M.stoy(X / (15 * skala) + Y / (70 * skala), 0.5, s) + 0.38 * M.stoy(X / (5.5 * skala) + Y / (40 * skala), Y / (30 * skala), s + 1)
    d = kn(x, y); helling = kn(x + 1.5, y) - kn(x - 1.5, y)
    l = 0.5 + helling * 5.5 / skala ** 0.5 + (d - 0.5) * 1.1
    if M.h(x // 2, y // 3, s + 2) > 0.87: l += 0.15
    v = max(0, min(6, int(l * 6 + (M.terskel(x, y) - 0.5) * 0.7)))
    if d < 0.3: v = min(v, 1)
    L_.p(x, y, M.blend(BERG[v], DIS, math.floor(dis * 6 + M.terskel(x + 1, y)) / 6))


def li():
    """Lia og dalen under stupet, eit fast lag (faktor 1). Øvst ser ein ned langs dalsida, skrått
    framanfrå: bergveggar med grashyller, ur og bratt skog der trea står opp (granar som spisse
    silhuettar). Nedover blir veggane lågare og hyllene breiare, trea blir runde kroner sett ovanfrå,
    og til slutt ser ein dalbotnen rett ovanfrå som eit kart (ovanfra): perspektivet glir frå dalside
    til kart utan skøyt. Skuggen under overhenget nedst i stupet ligg der lufta byrjar (LUFTRAD)."""
    W, H = LI_W, LI_H
    L_ = L(W, H)
    # Dalbotnen rett ovanfrå: frå skogen og ned, limt inn frå y 84 (der skogen alt er sett ovanfrå).
    dal = ovanfra(W, H - OV + 64)[0].im.crop((0, 64, W, H - OV + 64))
    L_.im.alpha_composite(dal, (0, OV)); L_.px = L_.im.load()
    gras = M.rampe("#2c4a30", "#3a5e36", "#4e7840", "#68904c", "#88a85a")
    kratt = M.rampe("#162a1e", "#203824", "#2e4a2c", "#3e5e34", "#56743e")
    # Hyllene i dalsida: veggane blir lågare og hyllene breiare nedover (perspektivet flatar ut).
    hyller = [(lambda x: 30 + 3 * math.sin(x / 37) + (M.fbm(x / 14, 1, 801, 3) - 0.5) * 8, 5, 1.0, 0.1),
              (lambda x: 50 + 2 * math.sin(x / 29 + 1) + (M.fbm(x / 11, 2, 802, 3) - 0.5) * 6, 7, 0.75, 0.2),
              (lambda x: 64 + 2 * math.sin(x / 23) + (M.fbm(x / 9, 3, 803, 3) - 0.5) * 6, 9, 0.55, 0.28)]
    skogtopp = lambda x: hyller[2][0](x) + 6
    for x in range(W):
        y = 0
        for k, (hy, tj, skala, dis) in enumerate(hyller):
            h0 = hy(x)
            while y < h0: berg(L_, x, y, skala, 811 + k * 10, dis + y / 400); y += 1      # bergveggen
            while y < h0 + tj + int(M.fbm(x / 9, k, 804, 2) * 4):                          # hylla, sett meir ovanfrå
                kk = y - h0
                L_.p(x, y, M.blend(gras[4] if kk == 0 else gras[3] if kk < 2 else gras[2] if M.h(x, y, 805) > 0.3 else gras[1], DIS, dis + 0.1))
                y += 1
        while y < OV + 6:                                                                   # skogbotn i lia
            L_.p(x, y, M.blend(M.tone(kratt, 0.3 + (M.fbm(x / 3, y / 2, 806, 2) - 0.5) * 0.8, x, y), DIS, 0.3)); y += 1
    # Kratt og små bjørker på hyllene (sett skrått: står opp frå hylla).
    for i in range(220):
        x = M.h(i, 1, 807) * W; k = i % 3; hy, tj, skala, dis = hyller[k]
        y = hy(x) + 1 + M.h(i, 2, 807) * tj
        r = (1.4 + M.h(i, 3, 807) * 2) * skala
        if M.h(i, 4, 807) > 0.85:
            for kk in range(int(5 * skala)): L_.p(x, y - kk, "#cfccc4" if kk % 3 else "#3a3640")
            krone(L_, x, y - 5 * skala, r, M.rampe("#2e4a2c", "#46683a", "#6a8e48", "#8eac5a"), 820 + i)
        else: krone(L_, x, y - r * 0.4, r, kratt, 820 + i)
    # Skogen i lia: øvst granar som står opp (spisse silhuettar), nedover fleire runde kroner sett
    # ovanfrå, og dei nedste overlappar dalbiletet, så overgangen blir mjuk.
    gran = M.rampe("#14241a", "#1c3222", "#28422c", "#385636", "#4e6e40")
    for i in range(700):
        x = M.h(i, 1, 830) * (W + 8) - 4; t = M.h(i, 2, 830)
        y = skogtopp(x) + t * (OV + 14 - skogtopp(x))
        ovanfraa = M.h(i, 3, 830) < t * 1.2                                                # meir ovanfrå jo lenger ned
        if ovanfraa:
            r = 2.6 - t * 0.6
            for yy in range(int(y - r) - 1, int(y + r) + 2):
                for xx in range(int(x - r) - 1, int(x + r) + 2):
                    dx, dy = (xx + 0.5 - x) / r, (yy + 0.5 - y) / r; n = dx * dx + dy * dy
                    if n > 1 + (M.h(xx, yy, 831) - 0.5) * 0.45: continue
                    L_.p(xx, yy, gran[3] if dx + dy < -0.7 and n > 0.2 else gran[2] if dx + dy < 0.1 else gran[1] if n < 0.75 else gran[0])
        else:
            M.gran(L_, int(x), y + 3, 7 + (1 - t) * 6, gran, fro=i)
    # Dis: lia øvst er nærast (litt dis), nedover meir, så ho møter disen i dalbiletet.
    for y in range(OV + 14):
        for x in range(W):
            if L_.get(x, y): L_.dis(x, y, math.floor(min(0.3, y / 300) * 6 + M.terskel(x, y)) / 6)
    # Foten av bergveggen der lufta byrjar i kvar kolonne: berget har ein ujamn, open botn (sjå
    # Pikslar.stup), og her held det fram i ei ur av stein i same fargar som botnen av veggen, med
    # kratt og einer, i skuggen under overhenget og litt dis. Ura går 10 pikslar opp bak veggbotnen
    # og ujamt ned i lia, så veggen og dalsida møtest utan skøyt.
    stein = M.rampe(BERG[1], BERG[2], BERG[3], BERG[4], BERG[5])
    kratt = M.rampe("#14261a", "#1e3622", "#2c4a2a", "#3e5e34")
    y0s = [(LUFTRAD[min(len(LUFTRAD) - 1, x // 16)] - LI_TOPP) * 16 for x in range(W)]
    for x in range(W):
        y0 = y0s[x]
        # mjuk overgang mellom kolonnar med ulik høgd: botnen av ura glir over 8 pikslar
        nabo = [y0s[min(W - 1, max(0, x + d))] for d in (-8, 8)]
        top = y0 - 10
        bunn = int(max([y0] + nabo) + 6 + M.fbm(x / 7, y0, 851, 3) * 12)
        for y in range(max(0, top), min(H, bunn)):
            k = (y - top) / max(1, bunn - top)
            bx, by = (x + (y // 2 & 1)) // 2, y // 2
            v = 0.62 - k * 0.3 + (M.h(bx, by, 852) - 0.5) * 0.5
            c = M.tone(stein, v, x, y)
            if k > 0.45 and M.fbm(x / 3, y / 2.5, 853, 2) > 0.62: c = M.tone(kratt, 0.3 + (1 - k) * 0.6, x, y)   # kratt og einer
            if y - top < 8 and M.terskel(x, y) < (8 - (y - top)) / 8: c = M.blend(c, "#1c1a2c", 0.5)          # skuggen under overhenget
            L_.p(x, y, M.blend(c, DIS, 0.12 + k * 0.1))
    return L_.im


OV = 84                               # dalbiletet ovanfrå byrjar her i li (sjå li)


def elv_rammer():
    """Elva i dalbiletet som eit animert lag over li (fire rammer side om side): lyse band og glimt
    som flyt nedover elva (mot høgre), fire pikslar per ramme på ein bølgje på 16, så rundgangen går
    opp utan skøyt. Berre pikslane der elva syner i li (ikkje under tre), med same dis som li."""
    dal = ovanfra(LI_W, LI_H - OV + 64)[0]
    vass = M.rampe("#4a6a76", "#5e808c", "#7a9ca6", "#a8c4cc")
    n = 4
    ark = Image.new("RGBA", (LI_W * n, LI_H), (0, 0, 0, 0)); px = ark.load()
    for f in range(n):
        for (x, yo), (d, t) in dal.straum.items():
            y = yo - 64 + OV
            if not (0 <= y < LI_H): continue
            u = (x - f * 4 + round(2 * math.sin(yo / 2 + x / 13))) % 16
            v = 0.42 - d * 0.12 + (0.32 if u < 3 else 0.14 if u < 5 else 0)
            c = M.tone(vass, v, x, y)
            if u == 8 and abs(d) < 0.35 and M.h(x // 16, 0, 741) > 0.4: c = M.hx("#d8e6ea")      # glimt
            c = M.blend(c, DIS, math.floor(t * 6 + M.terskel(x, y)) / 6)
            px[f * LI_W + x, y] = (c[0], c[1], c[2], 255)
    return ark


def skyer():
    """Skyene under oss som eit eige lag (driv sakte bortover, sjå drift i data.js): kvite flak med lys
    kant oppe til venstre, og skuggen sin på bakken nede til høgre (halvgjennomsiktig). Dei ligg
    innanfor biletet, så laget kan gå rundt utan skøyt."""
    L_ = L(LI_W, LI_H)
    for k, (cx, cy, r) in enumerate([(70, OV + 44, 14), (250, OV + 92, 18), (380, OV + 30, 10)]):
        def inni(xx, yy): return ((xx - cx) / r) ** 2 + ((yy - cy) / (r * 0.55)) ** 2 + (M.fbm(xx / 5, yy / 4, 717 + k, 3) - 0.5) * 1.4 < 1
        for yy in range(int(cy - r), int(cy + r) + 12):
            for xx in range(int(cx - r * 1.4), int(cx + r * 1.4) + 10):
                if inni(xx - 7, yy - 9) and not inni(xx, yy) and M.terskel(xx, yy) < 0.75:
                    L_.im.putpixel((xx % LI_W, yy), (26, 36, 48, 84))                         # skuggen på bakken
        for yy in range(int(cy - r), int(cy + r)):
            for xx in range(int(cx - r * 1.4), int(cx + r * 1.4)):
                if inni(xx, yy):
                    lys = inni(xx + 1, yy + 1) and not inni(xx - 1, yy - 1)
                    L_.p(xx % LI_W, yy, "#f4f6f6" if lys else "#dce2e6" if inni(xx - 1, yy - 1) and inni(xx + 1, yy + 1) else "#c4ccd4")
    return L_.im


def li_kort():
    """Varianten «dal»: berre dalsida øvst (hyllene og skogen); under er det ope, og dalen stig fram."""
    im = li(); L_ = L(LI_W, LI_H); L_.im.alpha_composite(im); L_.px = L_.im.load()
    for x in range(LI_W):
        for y in range(84 + int(M.fbm(x / 6, 1, 840, 2) * 8), LI_H): L_.tom(x, y)
    return L_.im


DU_W, DU_H = 448, 120

def dal_under():
    """Varianten «dal»: dalbotnen sett ovanfrå (same landskapet som li, frå skogkanten og ned)."""
    L_ = ovanfra(DU_W, DU_H + 70)[0]
    return L_.im.crop((0, 70, DU_W, DU_H + 70))


# ---------------------------------------------------------------- utsikta frå toppen
DN_W, DN_H = 368, 98

def dal_nord():
    """Utsikta frå toppen av åsen, nærast kanten: til venstre lia opp mot utmarka (skog nedst, så
    fjellbeite med stein og ein bekk, og setra langt oppe), til høgre Hovdebygda (skogen på andre
    sida, teigar, gardar, Hovdekyrkja, vegen og elva). Mellom dei ein skogkledd rygg."""
    L_ = L(DN_W, DN_H)
    skille = 176
    def topp(x):                                                         # silhuetten mot fjella og himmelen
        # Samanhengande: lia mot utmarka stig mot venstre, ein rund, skogkledd kolle står mellom lia og
        # dalen, og skogen på andre sida av dalen ligg lågt til høgre. Det høgaste av dei tre vinn,
        # så omrisset heng saman utan loddrette stup.
        lia = 46 - (skille - x) / skille * 40 if x < skille else 46 + (x - skille) * 0.5
        kolle = 31 + ((x - 196) / 24) ** 2 * 7
        dal = 40
        return min(lia, kolle, dal) + (M.fbm(x / 8, 1, 381, 3) - 0.5) * 5
    skog = M.rampe("#22362c", "#2c4436", "#3a5642", "#4e6a4c", "#688254")
    beite = M.rampe("#5a7448", "#6a8450", "#7e9658", "#98aa66", "#b4bc7a")
    eng = M.rampe("#4e7a4a", "#5e8a50", "#6e9a58", "#80a862", "#94b670")
    # Skiljet mellom lia (til venstre) og dalen (til høgre) er ein skogkledd rygg som går på skrå
    # nedover mot høgre: nærare oss stikk lia lenger ut.
    rygg = lambda y: skille - 6 + max(0, y - 44) * 1.1 + (M.fbm(y / 5, 4, 506, 2) - 0.5) * 8
    for x in range(DN_W):
        t = topp(x)
        for y in range(int(t), DN_H):
            if x < rygg(y):
                # Lia mot utmarka: fjellbeite øvst, skog nedover (skoggrensa på skrå).
                grense = t + max(0, skille - 24 - x) / skille * 34 + (M.fbm(x / 6, 2, 502, 2) - 0.5) * 8
                if y < grense:
                    v = 0.55 + (M.fbm(x / 7, y / 4, 503, 3) - 0.5) * 0.8 - (y - t) / 60
                    c = M.tone(beite, v, x, y)
                    if M.fbm(x / 3, y / 2, 504, 2) > 0.72: c = M.tone(M.rampe("#6a6872", "#8e8c94", "#b0aeb2"), 0.6, x, y)   # stein
                else:
                    c = M.tone(skog, 0.45 + (M.fbm(x / 2.5, y / 2, 505, 2) - 0.5) * 0.9, x, y)
                L_.p(x, y, c)
            elif y < 52:
                L_.p(x, y, M.tone(skog, 0.4 + (M.fbm(x / 2.5, y / 2, 382, 2) - 0.5) * 0.9, x, y))
            else:
                v = 0.5 + (M.fbm(x / 26, y / 4, 383, 4) - 0.5) * 0.7 + (M.fbm(x / 3, y, 384, 2) - 0.5) * 0.15
                L_.p(x, y, M.tone(eng, v, x, y))
    # Bekken ned lia, og setra langt oppe (lita, med torvtak).
    bx = 70
    for y in range(int(topp(bx)) + 3, DN_H):
        bx += math.sin(y / 5) * 0.6 + 0.35
        L_.p(bx, y, M.blend("#c8dce0", DIS, 0.2))
    hus(L_, 52, int(topp(52)) + 6, 5, ("#4e5a30", "#6a7838", "#8a9648"), ("#5a3a2c", "#7a4e38"), takh=2, veggh=2)
    # Hovdebygda: teigar som blir smalare lenger borte, gardar, kyrkja, vegen og elva.
    teig = [M.rampe("#86aa5c", "#9cba6a"), M.rampe("#b4b066", "#c8c47a"), M.rampe("#6e9850", "#7ea85a"),
            M.rampe("#a2b870", "#b4c680"), M.rampe("#9a8a5a", "#ae9e6c")]
    elv = lambda x: 72 + 1.5 * math.sin(x / 37 + 1) + math.sin(x / 13)
    veg = lambda x: 62 + math.sin(x / 45) * 1.2
    for i in range(50):
        cy = 52 + M.h(i, 2, 385) * 26; hh = 2 + int((cy - 52) / 26 * 3)
        cx = skille + 10 + M.h(i, 1, 385) * (DN_W - skille); w = 12 + int(M.h(i, 3, 385) * 20)
        r = teig[int(M.h(i, 6, 385) * len(teig))]
        for yy in range(hh):
            for xx in range(w):
                X, Y = int(cx + xx), int(cy + yy)
                if abs(Y - elv(X)) < 2 or abs(Y - veg(X)) < 1.5: continue
                if xx == 0 or xx == w - 1: L_.p(X, Y, "#8a8c7c"); continue
                L_.p(X, Y, M.tone(r, 0.5 + (M.h(X // 2, Y, 386) - 0.5) * 0.5, X, Y))
    for x in range(skille + 6, DN_W):
        L_.p(x, round(veg(x)), "#cabc8e")
        y = elv(x)
        L_.p(x, int(y) - 1, "#5a7a64"); L_.p(x, int(y), M.tone(M.rampe("#7c9ca6", "#a4c0c8", "#c8dce0"), M.fbm(x / 5, 1, 387, 2), x, 0)); L_.p(x, int(y) + 1, "#3e5a5a")
    tre = M.rampe("#2e4a36", "#3e5e40", "#527448", "#6a8a52", "#86a060")
    for i in range(45):
        x = skille + 8 + M.h(i, 1, 388) * (DN_W - skille); y = elv(x) - 2 if i < 20 else 54 + M.h(i, 2, 388) * 22
        krone(L_, x, y, 1.0 + M.h(i, 3, 388) * (0.6 + (y - 52) / 30), tre, 389 + i)
    torv = ("#4e5a30", "#6a7838", "#8a9648")
    for gx, gy in [(206, 57), (238, 65), (300, 56), (330, 66), (352, 58), (262, 70)]:
        hus(L_, gx, gy, 5, torv, ("#5a3a2c", "#7a4e38"), takh=1, veggh=2)
        hus(L_, gx + 7, gy - 1, 6, torv, ("#6a5a48", "#8a7a62"), takh=2, veggh=2)
    kyrkje(L_, 278, 60)
    # Luftperspektiv: meir dis øvst (langt borte), mindre nedover.
    for y in range(DN_H):
        for x in range(DN_W):
            if not L_.get(x, y): continue
            t = min(0.9, 0.74 - y / DN_H * 0.5)
            L_.dis(x, y, math.floor(t * 6 + M.terskel(x, y)) / 6)
    return L_.im



# ---------------------------------------------------------------- trekronene under kanten øvst
NA_W, NA_H = 400, 64

def naer():
    """Trekronene i lia rett under kanten øvst (faktor 0,6): granar og bjørker som står lenger nede
    og stikk opp over graskanten. Dei er nær, så mørke, metta og nesten utan dis, og dei glir fort
    forbi og søkk bak kanten når kameraet går ned: det gir høgda."""
    L_ = L(NA_W, NA_H)
    gran = M.rampe("#14241c", "#1c3024", "#28402c", "#365236", "#4a6a40")
    lauv = M.rampe("#1e3422", "#2a4628", "#3c5e32", "#56783e", "#74924c")
    topp = lambda x: 16 + 7 * math.sin(x / 31) + (M.fbm(x / 9, 1, 601, 3) - 0.5) * 10
    for x in range(NA_W):                                              # tett skog under kronene
        for y in range(int(topp(x)) + 10, NA_H):
            L_.p(x, y, M.tone(gran, 0.3 + (M.fbm(x / 3, y / 2.5, 602, 2) - 0.5) * 0.7, x, y))
    for i in range(70):
        x = M.h(i, 1, 603) * (NA_W + 20) - 10; y = topp(x) + M.h(i, 2, 603) * 12
        if M.h(i, 3, 603) < 0.6: M.gran(L_, int(x), y + 22, 18 + M.h(i, 4, 603) * 10, gran, fro=i)
        else: krone(L_, x, y + 6, 5 + M.h(i, 5, 603) * 3, lauv, 604 + i)
    for y in range(NA_H):
        for x in range(NA_W):
            if L_.get(x, y): L_.dis(x, y, 0.08)
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


GRAS_RAMMER = 3

def gras():
    """Høgt gras og ein grastuve i nedre hjørne: mørke strå framfor utsikta, ein tett botn. Tre rammer
    side om side der stråa vaiar i vinden: toppane går 0, 1 og 2 pikslar til sides (dei lange mest),
    rota står fast. Motoren viser dei i rekkja 0, 1, 2, 1 i roleg takt (rammer, rekkje, takt i data.js)."""
    w, h = 92, 64
    ark = L(w * GRAS_RAMMER, h)
    for f in range(GRAS_RAMMER):
        ark.im.alpha_composite(gras_ramme(w, h, f), (f * w, 0))
    return ark.im


def gras_ramme(w, h, vind):
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
            x = x0 + lut * k * t * 1.4 + round(vind * t * t * (0.6 + lengd / 40)); y = y0 - k
            L_.p(x, y, M.tone(r, 0.25 + t * 0.6 + M.h(i, 4, 412) * 0.2, int(x), int(y)))
            if t < 0.4: L_.p(x + 1, y, r[1])
    return L_.im


BILETE = {"li": li, "elv": elv_rammer, "skyer": skyer, "li-kort": li_kort, "dal-under": dal_under, "himmel": himmel, "fjell": fjell, "dal-nord": dal_nord, "naer": naer, "greiner": greiner, "gras": gras}

if __name__ == "__main__":
    namn = sys.argv[1:] or list(BILETE)
    os.makedirs(UT, exist_ok=True)
    for n in namn:
        im = BILETE[n]()
        im.save(os.path.join(UT, f"{n}.png")); print(f"bilete/spel/parallakse/{n}.png")
        if n in ("greiner", "gras"):
            # Spegla, ramme for ramme (så rammene står i same rekkjefølgje).
            r = GRAS_RAMMER if n == "gras" else 1; fw = im.width // r; sp = Image.new("RGBA", im.size, (0, 0, 0, 0))
            for f in range(r): sp.paste(im.crop((f * fw, 0, (f + 1) * fw, im.height)).transpose(Image.FLIP_LEFT_RIGHT), (f * fw, 0))
            sp.save(os.path.join(UT, f"{n}-h.png")); print(f"bilete/spel/parallakse/{n}-h.png")
    # Kontaktark i 3x: utsikta øvst (fjella og dalen sett utover) og lia under stupet.
    ark = Image.new("RGBA", (980, 940), (14, 12, 18, 255))
    fj = Image.open(os.path.join(UT, "fjell.png")); dn = Image.open(os.path.join(UT, "dal-nord.png")); li_ = Image.open(os.path.join(UT, "li.png"))
    hi = Image.open(os.path.join(UT, "himmel.png")); na = Image.open(os.path.join(UT, "naer.png"))
    opp = Image.new("RGBA", (320, 110), (166, 180, 188, 255)); opp.alpha_composite(hi.crop((0, 0, 320, HI_H)), (0, 0))
    opp.alpha_composite(fj.crop((0, 0, 320, 110)), (0, 4)); opp.alpha_composite(dn.crop((0, 0, 320, DN_H)), (0, 36)); opp.alpha_composite(na.crop((0, 0, 320, NA_H)), (0, 78))
    ark.alpha_composite(opp.resize((960, 330), Image.NEAREST), (10, 10))
    ark.alpha_composite(li_.crop((0, 0, 320, 140)).resize((960, 420), Image.NEAREST), (10, 350))
    x = 10
    for n in ("greiner", "gras"):
        im = Image.open(os.path.join(UT, f"{n}.png")); ark.alpha_composite(im.resize((im.width * 2, im.height * 2), Image.NEAREST), (x, 780)); x += im.width * 2 + 20
    ark.save(os.path.join(ROT, "forhand", "utsikt-ark.png")); print("forhand/utsikt-ark.png")
