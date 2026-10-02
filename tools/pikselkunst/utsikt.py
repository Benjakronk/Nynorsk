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
  li        lia under stupet (faktor 0,5): bergveggen held fram med hyller med gras, kratt og
            bjørk, ein ny bergvegg og bratt skog som blir mindre og disigare nedover og går
            over i dis nedst (ingen flat dalbotn: han ville gli feil med parallaksen).
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


# ---------------------------------------------------------------- lia under stupet
LI_W, LI_H = 388, 156
BERG = ["#1c1a2c", "#2e2a3a", "#48434a", "#645e5e", "#827a74", "#a0978a", "#bdb4a4"]   # som BERG i pikslar.js


def berg(L_, x, y, skala, s, dis):
    """Ein piksel bergvegg som stupet (Narshe): store knausar med lys side mot venstre og djupe renner.
    skala < 1 gjer formene mindre (lenger borte). dis: kor mykje mot disfargen."""
    kn = lambda X, Y: 0.62 * M.stoy(X / (15 * skala) + Y / (70 * skala), 0.5, s) + 0.38 * M.stoy(X / (5.5 * skala) + Y / (40 * skala), Y / (30 * skala), s + 1)
    d = kn(x, y); helling = kn(x + 1.5, y) - kn(x - 1.5, y)
    l = 0.5 + helling * 5.5 / skala ** 0.5 + (d - 0.5) * 1.1
    if M.h(x // 2, y // 3, s + 2) > 0.87: l += 0.15
    v = max(0, min(6, int(l * 6 + (M.terskel(x, y) - 0.5) * 0.7)))
    if d < 0.3: v = min(v, 1)
    L_.p(x, y, M.blend(BERG[v], DIS, math.floor(dis * 6 + M.terskel(x + 1, y)) / 6))


def li():
    """Lia som stuper ned under stupet: bergveggen held fram med to hyller med gras, kratt og bjørk,
    ein ny, lågare bergvegg, så bratt skog som blir mindre og disigare nedover, og dalen langt nede i
    dis nedst. Alt lenger nede er lenger borte: mindre former og meir dis (luftperspektiv)."""
    L_ = L(LI_W, LI_H)
    gras = M.rampe("#2c4a30", "#3a5e36", "#4e7840", "#68904c", "#88a85a")
    kratt = M.rampe("#162a1e", "#203824", "#2e4a2c", "#3e5e34", "#56743e")
    h1 = lambda x: 46 + 4 * math.sin(x / 37) + (M.fbm(x / 14, 1, 401, 3) - 0.5) * 8      # første hylla, langt nede
    h2 = lambda x: 78 + 3 * math.sin(x / 29 + 1) + (M.fbm(x / 11, 2, 402, 3) - 0.5) * 6  # andre hylla
    skog = lambda x: 94 + 2 * math.sin(x / 23) + (M.fbm(x / 8, 3, 403, 3) - 0.5) * 6      # skogen i lia
    dal = lambda x: 999                                                                 # ingen dalbotn: skogen går over i dis
    hylle = lambda x, k: 4 + int(M.fbm(x / 9, k, 404, 2) * 4)
    for x in range(LI_W):
        a, b, sk, dl = h1(x), h2(x), skog(x), dal(x)
        for y in range(LI_H):
            if y < a: berg(L_, x, y, 1.0, 411, 0.1 + y / 220)                          # stupet held fram
            elif y < a + hylle(x, 1):                                                   # hylla med gras
                k = y - a
                L_.p(x, y, M.blend(gras[4] if k == 0 else gras[3] if k == 1 else gras[2] if k < hylle(x, 1) - 1 else gras[0], DIS, 0.2))
            elif y < b: berg(L_, x, y, 0.75, 421, 0.28 + (y - a) / 160)                 # ny bergvegg, mindre
            elif y < b + hylle(x, 2) - 1:
                k = y - b
                L_.p(x, y, M.blend(gras[4] if k == 0 else gras[2] if k < 3 else gras[0], DIS, 0.32))
            elif y < sk: berg(L_, x, y, 0.55, 431, 0.42)
            elif y < dl:                                                                # bratt skog
                # Skogen blir disigare nedover og går over i disen nedst (ingen flat dalbotn som
                # ville gli feil med parallaksen).
                v = 0.42 + (M.fbm(x / 2.2, y / 1.8, 441, 2) - 0.5) * 1.0 - (y - sk) / 120
                t = 0.3 + (y - sk) / 52 + (M.fbm(x / 18, y / 6, 442, 3) - 0.5) * 0.3
                L_.p(x, y, M.blend(M.tone(kratt, v, x, y), DIS, min(1, math.floor(t * 6 + M.terskel(x, y)) / 6)))
            else:                                                                       # dalen langt nede
                eng = M.rampe("#5e8a50", "#6e9a58", "#80a862", "#9ab874")
                v = 0.5 + (M.fbm(x / 20, y / 3, 451, 3) - 0.5) * 0.9
                if M.h(int(x // 18), int(y // 3), 452) > 0.7: v += 0.35                 # teigar
                c = M.tone(eng, v, x, y)
                ey = dl + 14 + 3 * math.sin(x / 33)
                if abs(y - ey) < 1: c = "#a4c0c8"                                       # elva
                L_.p(x, y, M.blend(c, DIS, min(0.9, 0.42 + (y - dl) / 90)))
    # Kratt, einer og bjørk på hyllene: mørke klumpar med lys topp mot venstre, ei kvit stamme.
    for i in range(150):
        x = M.h(i, 1, 461) * LI_W
        hy = h1(x) if i < 90 else h2(x)
        sk = 1.0 if i < 90 else 0.7
        r = (1.5 + M.h(i, 2, 461) * 2.2) * sk
        if M.h(i, 3, 461) > 0.82:                                                       # ei lita bjørk
            for k in range(int(5 * sk)): L_.p(x, hy + 1 - k, "#cfccc4" if k % 3 else "#3a3640")
            krone(L_, x, hy - 5 * sk, r, M.rampe("#2e4a2c", "#46683a", "#6a8e48", "#8eac5a"), 470 + i)
        else:
            krone(L_, x, hy + 1 - r * 0.5, r, kratt, 470 + i)
    # Trekroner i skogen: større øvst (nærast), mindre og disigare nedover.
    for i in range(240):
        x = M.h(i, 1, 481) * (LI_W + 8) - 4
        sk_ = skog(x)
        t = M.h(i, 2, 481) ** 1.3
        y = sk_ + 2 + t * 20
        r = 2.6 - t * 1.6
        c = M.rampe("#1a3022", "#26402a", "#365434", "#4a6a3e", "#64844a")
        if M.h(i, 3, 481) < 0.45:
            M.gran(L_, int(x), y + r, r * 3, c, fro=i)
        else:
            krone(L_, x, y, r, c, 490 + i)
    # Kronene nedover får same dis som skogen under, så dei ikkje flyt i disen.
    for x in range(LI_W):
        sk_ = skog(x)
        for y in range(int(sk_) + 4, LI_H):
            if L_.get(x, y): L_.dis(x, y, min(0.9, math.floor(((y - sk_) / 48) * 6 + M.terskel(x, y)) / 6))
    return L_.im


# ---------------------------------------------------------------- utsikta frå toppen
DN_W, DN_H = 368, 98

def dal_nord():
    """Utsikta frå toppen av åsen, nærast kanten: til venstre lia opp mot utmarka (skog nedst, så
    fjellbeite med stein og ein bekk, og setra langt oppe), til høgre Hovdebygda (skogen på andre
    sida, teigar, gardar, Hovdekyrkja, vegen og elva). Mellom dei ein skogkledd rygg."""
    L_ = L(DN_W, DN_H)
    skille = 176
    def topp(x):                                                         # silhuetten mot fjella og himmelen
        if x < skille: return 46 - (skille - x) / skille * 40 + (M.fbm(x / 10, 1, 501, 3) - 0.5) * 6
        return 40 + (M.fbm(x / 8, 1, 381, 3) - 0.5) * 6 - max(0, 14 - (x - skille)) * 0.8
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


BILETE = {"li": li, "himmel": himmel, "fjell": fjell, "dal-nord": dal_nord, "naer": naer, "greiner": greiner, "gras": gras}

if __name__ == "__main__":
    namn = sys.argv[1:] or list(BILETE)
    os.makedirs(UT, exist_ok=True)
    for n in namn:
        im = BILETE[n]()
        im.save(os.path.join(UT, f"{n}.png")); print(f"bilete/spel/parallakse/{n}.png")
        if n in ("greiner", "gras"):
            im.transpose(Image.FLIP_LEFT_RIGHT).save(os.path.join(UT, f"{n}-h.png")); print(f"bilete/spel/parallakse/{n}-h.png")
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
