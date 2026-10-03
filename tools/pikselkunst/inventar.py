"""Inventar som heile figurar: kyrkja (bakveggen i koret, altartavle, alterring, preikestol,
døypefont, kyrkjebenker, lysekrone), bondestova
(grue, hylle, sengebenk, rokk, og langbord, benk og kubbestol som eigne bilete i fleire retningar)
embetsmannsheimen (kakkelomn, skatoll, golvur, sofa,
spisebord, skrivepult, bokreolar, lesebord, stol) og stabburet (kornbinge, tønne, kagge,
flatbrødstabel, spekemat, stige, glugge, sekker), skrinet etter far i stova og kista på karta
(kiste, kiste-open).

Etter kyrkjene i Kvernes og Hove og altertavla i Fåberg (sjå konsept/): bondebarokk
med måla felt og forgylt treskurd, kvit altarduk med lysestakar, kvitmåla alterring
med raud knefallspute, brunraud åttekanta preikestol på ei søyle, lysekrone i messing.

  python tools/pikselkunst/inventar.py alle [--tving]     skriv kjelder/inne-*.pix

Figurane følgjer same regel som husa (bygg.py): breidda er fliser x 16 + 8, og dei
står med botnen nedst i den nedste flisraden sin. I kartet står dei under «bygg».
Stolar og benker ein kan sitje på, står i SETE i js/rpg/pikslar.js (sjå SKILL.md).
"""
import sys, os, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from bygg import Lerret, omriss, h

ROT = os.path.dirname(os.path.abspath(__file__))

PAL = [
    (".", "-", ""), ("o", "#0a0514", "omriss"),
    ("r", "#3a0e18", "raud djup"), ("R", "#6a1a2a", "raud"), ("E", "#983040", "raud lys"),
    ("y", "#f8d840", "gull lys"), ("Y", "#d0a030", "gull"), ("Z", "#8a5a18", "gull skugge"),
    ("w", "#f4f2f8", "kvit"), ("W", "#c8c6d4", "kvit skugge"), ("K", "#8a88a0", "kvit djup"),
    ("s", "#e8eef4", "sølv lys"), ("S", "#9aa2b4", "sølv"),
    ("l", "#fff4c0", "ljos"), ("L", "#f8b830", "flamme"),
    ("b", "#1c2448", "bilete djup"), ("B", "#3a4a8a", "bilete blå"), ("h", "#e8c8a8", "hud"), ("H", "#b08868", "hud skugge"),
    ("t", "#4a2418", "tre djup"), ("T", "#7a3a22", "tre brunraud"), ("U", "#a4583a", "tre lys"),
    ("g", "#6a7a8a", "blågrå skugge"), ("G", "#9aaabb", "blågrå"),
    ("k", "#e8e4dc", "kalk"), ("x", "#b8b4ac", "kalk skugge"), ("n", "#6a6070", "sot"), ("N", "#140a08", "eldstad"),
    ("f", "#f8b830", "eld gul"), ("F", "#e86a20", "eld"),
    ("a", "#2e1a10", "furu djup"), ("A", "#5a3a22", "furu skugge"), ("c", "#8a5e36", "furu"), ("C", "#b08650", "furu lys"), ("q", "#d6b070", "furu lysast"),
    ("m", "#2c4288", "rosemaling blå"),
    ("j", "#2a0e0c", "mahogni djup"), ("J", "#5a2418", "mahogni skugge"), ("M", "#8a3a22", "mahogni"), ("O", "#b8683e", "mahogni lys"),
    ("e", "#26402f", "stoff skugge"), ("i", "#3f6a52", "stoff grønt"), ("I", "#72a282", "stoff lys"),
    ("d", "#a88a48", "stripe skugge"), ("D", "#d8c078", "stripe"),
    ("v", "#1a1a24", "jern djup"), ("V", "#34343f", "jern"), ("X", "#5a5a6a", "jern lys"),
    ("p", "#d8d0b8", "papir"), ("P", "#a89e86", "papir skugge"),
    # kyrkja (runde 30): måla himling, blyglas, benker og døypefont av kleberstein
    ("u", "#1e2a5a", "himling djup"), ("z", "#3a4c8a", "himling blå"),
    ("0", "#5e7672", "blyglas skugge"), ("1", "#8eaaa2", "blyglas"), ("2", "#c4dcd0", "blyglas lys"),
    ("3", "#4a5868", "benk djup"), ("4", "#c4d0dc", "benk lys"),
    ("5", "#4e5648", "kleber skugge"), ("6", "#7a8070", "kleber"), ("7", "#a6ac98", "kleber lys"),
    ("8", "#d8d4c8", "kalk lys skugge"),
    ("9", "#4e300c", "messing djup"),
    ("Q", "#5a72b8", "rosemaling blå lys"),                   # loket på kista (runde 59)
]


def altarring():
    """Alterring rundt altaret, 7 fliser brei og 3 rader djup (framsida i den nedste rada, sidene
    går to rader bakover): dreia, kvitmåla balustrar med gyllen handlist, hjørnestolpar med
    knappar, raud knefallspute langs framsida og sidene, og opning midt framme (der presten står).
    Etter Grytten og Hove (konsept/)."""
    W, H = 7 * 16 + 8, 64
    L = Lerret(W, H)
    cx = W // 2
    yf = H - 7                                     # golvlina til framsida
    yt = yf - 10                                   # handlista framme (standardperspektivet: brei toppflate, korte balustrar)
    ys = 22                                        # der sidene sluttar bak
    # sidene (sett ovanfrå og bakfrå): ei smal list med balustrar under, og pute på utsida
    for sx, ut in ((8, -1), (W - 12, 1)):
        for y in range(ys, yt):
            L.p(sx, y, "y" if ut < 0 else "Y"); L.p(sx + 1, y, "Y"); L.p(sx + 2, y, "Z")
            L.p(sx + 3, y, "W" if y % 3 else "K")
            px = sx - 3 if ut < 0 else sx + 4
            for k in range(3): L.p(px + k, y + 10, "E" if k == 0 else "R" if k == 1 else "r")
        for x in range(sx - 1, sx + 4): L.p(x, ys - 1, "y"); L.p(x, ys - 2, "Y")
    # framsida: handlist, balustrar, sokkel og pute
    def framrail(xa, xb):
        for x in range(xa, xb + 1):
            L.p(x, yt - 2, "y"); L.p(x, yt - 1, "y"); L.p(x, yt, "Y"); L.p(x, yt + 1, "Y"); L.p(x, yt + 2, "Z")
            L.p(x, yf - 1, "W"); L.p(x, yf, "K")
        for x in range(xa + 2, xb - 1, 4):                                # dreia balustrar
            for y in range(yt + 3, yf - 1):
                b = 1 if y in (yt + 3, yt + 7, yf - 3) else 0
                L.p(x, y, "w"); L.p(x + 1, y, "W")
                if b: L.p(x - 1, y, "w"); L.p(x + 2, y, "K")
            L.p(x, yt + 9, "W"); L.p(x + 1, yt + 9, "K")
        for x in range(xa + 1, xb):                                       # knefallsputa
            L.p(x, yf + 2, "E"); L.p(x, yf + 3, "R"); L.p(x, yf + 4, "R"); L.p(x, yf + 5, "r")
        L.p(xa + 1, yf + 2, "R"); L.p(xb - 1, yf + 2, "r")
    framrail(6, cx - 9)
    framrail(cx + 8, W - 7)
    # stolpar: i hjørna og ved opninga, med knapp av gull
    for px in (7, cx - 10, cx + 8, W - 10):
        for y in range(yt - 3, yf + 1):
            L.p(px, y, "w"); L.p(px + 1, y, "W"); L.p(px + 2, y, "K")
        L.p(px, yt - 5, "y"); L.p(px + 1, yt - 5, "Y"); L.p(px + 1, yt - 6, "Y"); L.p(px, yt - 4, "Y"); L.p(px + 1, yt - 4, "Z"); L.p(px + 2, yt - 4, "Z")
    omriss(L)
    return L


KRONE_KJEDE = 4            # stubben av kjettingen i biletet; resten opp til taket teiknar motoren (kjede() i motor.js)
KRONE_LJOS = []            # ankera til ljosa (x, y i biletet), fylt av lysekrone() (sjå LJOS i pikslar.js)


def lysekrone():
    """Lysekrone i messing (etter krona i koret i Kvernes og i Grytten, sjå konsept/), sett litt
    ovanfrå: to kransar med S-forma armar (seks oppe, åtte nede) som ligg i ellipsar, ljos i
    lysepipar med dryppskåler, ein dreia stamme med knappar, ei stor kule med blank refleks og ein
    dropp nedst. Ørn på toppen og ein stubb av kjettingen (motoren teiknar resten opp til taket). 3 fliser brei. Heng høgt
    (over: true, faktor over 1 i kartet: parallakse)."""
    W, C = 3 * 16 + 8, KRONE_KJEDE
    H = C + 44
    L = Lerret(W, H)
    cx = W // 2                                                          # stamma står på cx - 1 og cx
    for y in range(0, C):                                                 # kjettingen: ledd på tvers og på langs
        if y % 4 < 2: L.p(cx - 1, y, "Z"); L.p(cx, y, "9")
        else: L.p(cx - 1, y, "Y") if y % 4 == 2 else L.p(cx, y, "Z")
    y0 = C
    # ørna øvst: venger ut, hovud mot venstre
    _stempel(L, cx - 5, y0, ["...yY.....", "Yy.YZ..yZ.", ".YyYYZyZ..", "..YYYZZ...", "...YZ9....", "...Y9....."])
    KRONE_LJOS.clear()

    def arm(vinkel, yk, rx, ry, fram):
        ex, ey = cx - 0.5 + rx * math.cos(vinkel), yk + ry * math.sin(vinkel)
        n = int(abs(ex - cx) * 1.4) + 2
        for i in range(n + 1):
            t = i / n
            x = round(cx - 0.5 + (ex - cx + 0.5) * t)
            y = round(yk + 1 + (ey - yk - 1) * t + 2.4 * math.sin(math.pi * t) - 1.5 * t * t)
            L.p(x, y, "y" if fram and x < cx else "Y"); L.p(x, y + 1, "Z" if fram else "9")
        x, y = round(ex), round(ey - 2)
        for dx in (-2, -1, 0, 1):                                          # dryppskåla, ein liten oval sett ovanfrå
            L.p(x + dx, y, "y" if dx < 0 else "Y"); L.p(x + dx, y + 1, "Z")
        L.p(x - 1, y - 1, "y"); L.p(x, y - 1, "Y")
        L.p(x - 1, y - 1, "Y"); L.p(x, y - 1, "Z")                           # lysepipa
        for k in range(2, 4):                                             # ljoset, kort sett ovanfrå
            L.p(x - 1, y - k, "w"); L.p(x, y - k, "W")
        L.p(x - 1, y - 4, "l"); L.p(x - 1, y - 5, "L"); L.p(x, y - 4, "L")   # flammen
        KRONE_LJOS.append((x - 1, y - 5))

    def krans(yk, n, rx, ry, fase, fram):
        for k in range(n):
            v = 2 * math.pi * (k + fase) / n
            if (math.sin(v) > 0.05) == fram: arm(v, yk, rx, ry, fram)

    def stamme(y_a, y_b):
        for y in range(y_a, y_b):
            b = profil.get(y - y0, 1)
            for x in range(cx - b - 1, cx + b + 1):
                L.p(x, y, "y" if x == cx - b - 1 and b > 1 else "Y" if x < cx else "Z" if x < cx + b else "9")

    # knappar og krager på den dreia stamma (halvbreidd utanom dei to midtpikslane)
    profil = {7: 2, 8: 2, 11: 2, 12: 3, 13: 3, 14: 2, 18: 2, 19: 1, 21: 2, 22: 3, 23: 3, 24: 2}
    # standardperspektivet (STILGUIDE.md): kransane er tydelege ovalar sett ovanfrå, stamma kort.
    # Dei bakre armane, så stamma, så dei fremre.
    krans(y0 + 12, 6, 12, 6, 0.5, False)
    krans(y0 + 23, 8, 22, 10, 0.5, False)
    stamme(y0 + 6, y0 + 26)
    krans(y0 + 12, 6, 12, 6, 0.5, True)
    # kula: blank messing, lys oppe til venstre, mørk refleks nedst og eit glimt
    kx, ky, r = cx - 0.5, y0 + 28.5, 5.6
    for y in range(int(ky - r) - 1, int(ky + r) + 2):
        for x in range(int(kx - r) - 1, int(kx + r) + 2):
            d = ((x - kx) ** 2 + (y - ky) ** 2) ** 0.5
            if d > r: continue
            lx, ly = (x - kx) / r, (y - ky) / r
            c = "y" if lx + ly < -0.75 else "Y" if lx + ly < 0.3 else "Z" if lx + ly < 0.95 else "9"
            if ly > 0.6 and abs(lx) < 0.45: c = "Z"                            # refleks frå golvet
            L.p(x, y, c)
    L.p(cx - 3, y0 + 25, "l"); L.p(cx - 3, y0 + 26, "y")
    krans(y0 + 23, 8, 22, 10, 0.5, True)
    # droppen under kula
    _stempel(L, cx - 2, y0 + 34, [".YZ.", ".Y9.", "..Z."])
    omriss(L)
    return L


def _stempel(L, x0, y0, rader, spegl=False):
    """Teiknar eit lite, handteikna motiv (ein streng per rad, «.» er gjennomsiktig)."""
    for j, r in enumerate(rader):
        if spegl: r = r[::-1]
        for i, c in enumerate(r):
            if c != ".": L.p(x0 + i, y0 + j, c)


# Kalkmåleri og bondebarokk (etter Dale i Luster, Nordfjordeid og Kvernes, sjå konsept/):
# ein vase med tulipanar og akantusblad, i brunraudt, grønt og oker på kvitkalken.
VASE = [
    "..E...E..",
    ".ERE.ERE.",
    "..E.T.E..",
    ".i..T..i.",
    "iI.TTT.Ii",
    ".ii.T.ii.",
    "...TTT...",
    "..ZYYYZ..",
    "..YyYYZ..",
    "...YYZ...",
    "....Z....",
]
# Akantusvengen på sida av altartavla (venstre; den høgre er spegla): forgylt bladverk som krøllar
# seg ut frå søyla, med grøne og raude innslag som i bondebarokken.
MARIA = [
    ".WW..",
    "WhHW.",
    "WWWW.",
    "EEhR.",
    "EERRr",
    "EERRr",
    "EERRr",
    "EERRr",
]
JOHANNES = [
    ".TT..",
    "TThT.",
    ".hH..",
    "IIhi.",
    "IIiie",
    "IIiie",
    "IIiie",
    "IIiie",
]
VENGE = [
    "......YY.",
    ".....Yyy.",
    "....YyZ..",
    "...Yy....",
    "..YyZ.EE.",
    ".Yy...ER.",
    ".YZ.Yy...",
    "..ZYyZ...",
    "....iI...",
    "...iIi...",
    "..Yyi....",
    ".YyZ..Yy.",
    ".YZ..YyZ.",
    "..ZZYyZ..",
    "....YZ...",
    "...ii....",
    "..iIZ....",
    "...YyY...",
]


def korvegg():
    """Bakveggen i koret, fem fliser høg og 11 fliser brei (mellom sideveggene): blåmåla himling
    med gullstjerner, gesims, ein måla draperi-frise, kvitkalka mur med kalkmåleri (rankeverk,
    vase med tulipanar, medaljongar og skriftfelt), to høge rundboga vindauge med blyglas og eit
    marmorert brystpanel nedst. Vindauga står over flisene «u» i kartet (rad 4), der lysstrålane
    startar. Altartavla står midt på veggen og dekkjer midten."""
    W, H = 11 * 16 + 8, 5 * 16
    L = Lerret(W, H)
    x0, x1 = 4, W - 5
    for y in range(H):
        for x in range(x0, x1 + 1): L.p(x, y, "k")
    # himlingen: blå med gullstjerner, mørkast inst
    for x in range(x0, x1 + 1):
        L.p(x, 0, "u"); L.p(x, 1, "z"); L.p(x, 2, "z"); L.p(x, 3, "z")
    for i, x in enumerate(range(x0 + 6, x1 - 2, 11)): L.p(x, 1 + i % 3, "y"); L.p(x + 1, 1 + i % 3, "Y")
    # gesimsen: okerlist, raudt band med gullprikkar, mørk underkant
    for x in range(x0, x1 + 1):
        L.p(x, 4, "D"); L.p(x, 5, "R"); L.p(x, 6, "r")
        if (x - x0) % 8 in (3, 4): L.p(x, 5, "Y")
    # draperiet: raude svaiar som heng frå gesimsen, med dusk av gull der dei er festa
    for x in range(x0, x1 + 1):
        k = (x - x0) % 12
        d = 1 + round(4 * math.sin(math.pi * k / 12))
        for y in range(7, 7 + d): L.p(x, y, "E" if y == 7 else "R")
        L.p(x, 7 + d, "r")
        L.p(x, 8 + d, "8")                                                 # skugge på kalken
        if k == 0:
            L.p(x, 7, "Y"); L.p(x, 8, "Y"); L.p(x, 9, "Z"); L.p(x + 1, 8, "Z"); L.p(x, 10, "Y"); L.p(x, 11, "Z")
    # rankeverk: ei måla ranke i brunraudt og grønt langs veggen under draperiet
    for x in range(x0 + 2, x1 - 1):
        y = 16 + round(1.5 * math.sin(x / 3.2))
        L.p(x, y, "T")
        if x % 7 == 0: L.p(x, y - 1, "i"); L.p(x + 1, y - 2, "i")
        if x % 7 == 3: L.p(x, y + 1, "i"); L.p(x + 1, y + 2, "e")
        if x % 14 == 10: L.p(x, y - 2, "E"); L.p(x + 1, y - 2, "E"); L.p(x, y - 3, "R")
    # brystpanelet: oker handlist, marmorerte felt i blågrått mellom brunraude stolpar
    for x in range(x0, x1 + 1):
        L.p(x, 64, "x"); L.p(x, 65, "D"); L.p(x, 66, "d")
        for y in range(67, H - 1): L.p(x, y, "G")
        L.p(x, 67, "g"); L.p(x, H - 1, "a")
        k = (x - x0) % 16
        if k in (0, 1):
            for y in range(67, H - 1): L.p(x, y, "T" if k == 0 else "t")
        elif k == 2:
            for y in range(67, H - 1): L.p(x, y, "g")
    for i, xf in enumerate(range(x0 + 2, x1 - 12, 16)):                  # årer i marmoren
        a = int(h(i, 1, 61) * 6)
        for k in range(4): L.p(xf + 3 + a + k, 70 + (k // 2), "W")
        L.p(xf + 9 + a // 2, 73, "g"); L.p(xf + 10 + a // 2, 73, "g")
    # vindauga: djup smyg i muren, rundboge, blyglas i små ruter, sprossar og karm
    yt, yb = 20, 63
    for wx in (20, 148):
        for y in range(yt, yb + 1):
            for x in range(wx + 1, wx + 13):
                if y == yt and not 5 <= x - wx <= 8: continue
                if y == yt + 1 and not 3 <= x - wx <= 10: continue
                L.p(x, y, "x" if x - wx <= 2 else "8" if x - wx >= 11 else "K")
        for x in range(wx + 1, wx + 13): L.p(x, yb, "W"); L.p(x, yb + 1, "D")    # benken i vindauget
        for y in range(yt + 2, yb - 1):
            for x in range(wx + 3, wx + 11):
                if y == yt + 2 and not 5 <= x - wx <= 8: continue
                if y == yt + 3 and not 4 <= x - wx <= 9: continue
                bly = (x + y) % 6 == 0 or (x - y) % 6 == 0
                L.p(x, y, "0" if bly else "2" if (y < yt + 14 and x - wx < 7) else "1")
        for ys in (36, 50):
            for x in range(wx + 3, wx + 11): L.p(x, ys, "V")                  # sprossane
        L.p(wx + 6, yt + 2, "V"); L.p(wx + 7, yt + 2, "V")
        for y in range(yt + 3, yb - 1): L.p(wx + 2 if y > yt + 3 else wx + 3, y, "K")
        for y in range(yt + 3, yb - 1): L.p(wx + 11 if y > yt + 3 else wx + 10, y, "W")
        for x in range(wx + 3, wx + 11): L.p(x, yb - 1, "W")
        # medaljong med ei sol over vindauget
        _stempel(L, wx + 3, yt - 3 - 6, ["..ZZZZ..", ".ZyYYYZ.", "ZyYYYYZZ", ".ZYYYZZ.", "..ZZZZ.."])
    # skriftfelt (måla innskrift i ei ramme med krøll øvst) mellom vindauga og altartavla
    for fx in (35, 137):
        for y in range(28, 42):
            for x in range(fx, fx + 12):
                L.p(x, y, "Z" if y in (28, 41) or x in (fx, fx + 11) else "p")
        for x in range(fx + 1, fx + 11): L.p(x, 29, "8")
        for y in (31, 33, 35, 37, 39):
            x = fx + 2
            while x < fx + 10:
                n = 1 + int(h(x, y, 62 + fx) * 3)
                for k in range(min(n, fx + 10 - x)): L.p(x + k, y, "n")
                x += n + 1
        for x in range(fx + 3, fx + 9): L.p(x, 27, "Y")
        L.p(fx + 5, 26, "Y"); L.p(fx + 6, 26, "Z")
    # vasar med tulipanar ytst ved sideveggene
    _stempel(L, x0 + 2, 46, VASE)
    _stempel(L, x1 - 10, 46, VASE, spegl=True)
    omriss(L)
    return L


ALTAR_LJOS = []            # ankera til altarljosa (x, y i biletet), fylt av altartavle() (sjå LJOS i pikslar.js)

# Figurar i nisjane på altartavla (5 x 13): Moses med lovtavlene og Johannes døyparen med staven,
# som i Fåberg og Kvernes. Profetane står på kvar side av krossen i mange bygdetavler.
MOSES = [
    ".WW..",
    "WhHW.",
    "WWWWW",
    "RWhRR",
    "pPRRr",
    "pPRRr",
    "pPERr",
    "RERRr",
    "RERRr",
    "RERRr",
    "RERRr",
    ".ERr.",
    ".hH..",
]
DOYPAREN = [
    "..T.Y",
    ".TTTY",
    ".hHTY",
    "AhHAY",
    "AAcAY",
    "AcAaY",
    "hAcAZ",
    "AcAaZ",
    "AcAaZ",
    ".cAa.",
    ".cAa.",
    ".hH..",
    ".hH..",
]
# Akantusvengen i bondebarokk (venstre; den høgre er spegla): forgylt bladverk som krøllar seg i
# store volutter, med raude og grøne innslag som i Kvernes.
AKANTUS = [
    "..........YYy.",
    "........YYyyZ.",
    "......YYyyZZ..",
    ".....YyyZZ....",
    "....YyyZ..EE..",
    "...YyyZ..EEER.",
    "...YyZ..EERRr.",
    "..YyyZ..ERRr..",
    "..YyZ.YYy.Rr..",
    ".YyyZYyyyZ....",
    ".YyZ.YyZyyZ...",
    ".YyZ.YyZ.yZ...",
    ".YyyZ.ZyyyZ...",
    "..YyZ..ZZZ.II.",
    "..YyyZ....IiI.",
    "...YyyZ..IIie.",
    "...ZYyyZIIie..",
    "....ZYyyyYie..",
    ".....ZZYyyyZ..",
    "....EE..ZYyyZ.",
    "...EERE...YyZ.",
    "...ERRr...YyZ.",
    "..YyRr...YyyZ.",
    "..YyyZ..YyyZ..",
    "...ZYyyyyyZ...",
    "....ZZZZZZ....",
    ".......Yy.....",
    "........YyZ...",
    ".........YZ...",
    "..........Z...",
]
# Vengene i øvste etasjen, mindre.
AKANTUS_SMAA = [
    ".......YYy",
    ".....YYyyZ",
    "....YyyZZ.",
    "...YyyZ.EE",
    "...YyZ.EER",
    "..YyyZ.ERr",
    "..YyZYyy..",
    ".YyyZYyZyZ",
    ".YyZ.ZyyZ.",
    ".YyZ...II.",
    "..YyZ.IiI.",
    "..ZYyZIie.",
    "...ZYyyyZ.",
    "....ZZZYy.",
    ".......ZY.",
]


def altartavle():
    """Altartavla og altaret i koret, 5 fliser breitt og 7 fliser høgt (fem rader bakvegg og to
    rader golv). Bondebarokk som i Fåberg (to etasjar, marmorerte felt, vridde søyler, akantusvenger,
    ein figur med sigersfane øvst) og Kvernes (store fargerike akantusvolutter), med måla bilete som i
    bygdetavlene på Vestlandet kring 1700 til 1840: nattverden i predellaen, krossfestinga i
    hovudfeltet og oppstoda i øvste etasjen. Moses og Johannes døyparen i nisjane. På altaret:
    kvit kniplingsduk, raudt alterklede med gullkross, to messingstakar med ljos, eit krusifiks og
    ein bibel."""
    W, H = 5 * 16 + 8, 7 * 16
    L = Lerret(W, H)
    cx = W // 2                                    # midtlinja går mellom cx - 1 og cx

    def ramme(x0, y0, x1, y1):                     # forgylt ramme med lys oppe til venstre
        for x in range(x0, x1 + 1): L.p(x, y0, "y"); L.p(x, y1, "Z")
        for y in range(y0, y1 + 1): L.p(x0, y, "y"); L.p(x1, y, "Z")
        for x in range(x0 + 1, x1): L.p(x, y0 + 1, "Y"); L.p(x, y1 - 1, "Y")
        for y in range(y0 + 1, y1): L.p(x0 + 1, y, "Y"); L.p(x1 - 1, y, "Y")

    def marmor(x0, y0, x1, y1, s):                 # marmorert felt i blågrått med årer
        for y in range(y0, y1 + 1):
            for x in range(x0, x1 + 1): L.p(x, y, "G")
        for i in range(max(1, (x1 - x0) // 5)):
            ax, ay = x0 + 1 + int(h(i, s, 71) * (x1 - x0 - 2)), y0 + int(h(i, s, 72) * (y1 - y0 + 1))
            L.p(ax, ay, "g"); L.p(ax + 1, ay, "g"); L.p(ax + 1, min(y1, ay + 1), "W")

    def soyle(sx, y0, y1):                         # vriden søyle (3 px) med kapitel og base
        for y in range(y0, y1 + 1):
            for k in range(3):
                L.p(sx + k, y, ("yYZ"[((y + k) // 2) % 3]) if k < 2 else "Z")
        for x in range(sx - 1, sx + 4): L.p(x, y0 - 1, "y"); L.p(x, y1 + 1, "Y"); L.p(x, y1 + 2, "Z")
        for x in range(sx - 1, sx + 4): L.p(x, y0 - 2, "Y" if x < sx + 2 else "Z")

    # --- øvst: figuren med sigersfanen og ei skjel av akantus ---
    _stempel(L, cx - 3, 0, ["..R...", "..RE..", "..Rww.", "..YhH.", "..wwW.", ".YwWW.", "..wW..", "..ZZ.."])
    for j, b in enumerate([3, 6, 8, 10, 11, 12, 12]):                  # skjela: vifte av gull
        y = 8 + j
        for x in range(cx - b, cx + b):
            c = "y" if (x - cx) % 3 == 0 else "Y"
            if x < cx - b + 1: c = "Y"
            if x >= cx + b - 1 or (j == 6 and x % 2): c = "Z"
            L.p(x, y, c)
    for x in range(cx - 2, cx + 2): L.p(x, 14, "R"); L.p(x, 13, "E" if x < cx else "R")
    # --- øvste etasjen: oppstoda i forgylt ramme, små søyler og venger ---
    for x in range(cx - 14, cx + 14): L.p(x, 15, "y"); L.p(x, 16, "Y"); L.p(x, 17, "Z")    # gesims
    marmor(cx - 13, 18, cx + 12, 40, 1)
    ramme(cx - 8, 18, cx + 7, 40)
    for y in range(20, 39):                                                 # biletet: mørk himmel, lys bak Kristus
        for x in range(cx - 6, cx + 6):
            d = abs(x - cx + 0.5) + abs(y - 26) * 0.6
            L.p(x, y, "l" if d < 2.5 else "y" if d < 4.5 else "D" if d < 6.5 else "B" if y < 34 else "b")
    for x in range(cx - 6, cx + 6): L.p(x, 36, "x"); L.p(x, 37, "K"); L.p(x, 38, "n")       # grava
    L.p(cx - 5, 35, "e"); L.p(cx + 4, 35, "e"); L.p(cx - 4, 35, "i")
    _stempel(L, cx - 3, 21, ["..hH..", "..WW..", ".hwwW.", "h.wwW.", "..wWW.", "..wWW.", "..wW..", ".wwWW.", ".hH..."])
    for y in range(19, 30): L.p(cx + 3, y, "Z")                            # fanestonga og fanen
    _stempel(L, cx + 4, 19, ["RE.", "RRE", "Rw.", "R.."])
    soyle(cx - 12, 20, 38)
    soyle(cx + 9, 20, 38)
    _stempel(L, cx - 24, 22, AKANTUS_SMAA)
    _stempel(L, cx + 14, 22, AKANTUS_SMAA, spegl=True)
    # --- gesimsen mellom etasjane, med innskrift ---
    for x in range(cx - 30, cx + 30):
        L.p(x, 41, "y"); L.p(x, 42, "Y"); L.p(x, 43, "R"); L.p(x, 44, "r"); L.p(x, 45, "Z")
        if cx - 22 < x < cx + 22 and (x * 7) % 5 > 1: L.p(x, 43, "y")
    L.p(cx - 31, 42, "Y"); L.p(cx + 30, 42, "Z")
    # --- hovudetasjen: krossfestinga, nisjar med profetane, vridde søyler, store akantusvenger ---
    marmor(cx - 29, 46, cx + 28, 74, 2)
    ramme(cx - 13, 46, cx + 12, 75)
    for y in range(48, 74):
        for x in range(cx - 11, cx + 11):
            L.p(x, y, "b" if y < 54 else "B" if y < 62 else "D" if y < 65 else "e")
    for x in range(cx - 11, cx + 11):
        if (x * 5 + 3) % 7 < 3: L.p(x, 62, "d")                            # lyst band ved horisonten
        if (x * 3) % 5 < 2: L.p(x, 65, "i")
    L.p(cx - 9, 49, "D"); L.p(cx + 7, 51, "D")                              # mørk himmel med glimt
    for y in range(50, 72): L.p(cx - 1, y, "T"); L.p(cx, y, "t")             # krossen
    for x in range(cx - 8, cx + 8): L.p(x, 53, "T"); L.p(x, 54, "t")
    L.p(cx - 2, 50, "w"); L.p(cx - 1, 50, "w"); L.p(cx, 50, "W"); L.p(cx + 1, 50, "W")   # tavla INRI
    for (x, y) in [(cx - 2, 51), (cx + 1, 51), (cx - 2, 52), (cx + 1, 52)]: L.p(x, y, "y")  # glorien
    L.p(cx - 1, 51, "h"); L.p(cx, 51, "H"); L.p(cx - 1, 52, "H"); L.p(cx, 52, "H")         # hovudet, bøygd
    for x in range(cx - 7, cx + 7): L.p(x, 53, "h" if x < cx else "H")         # armane
    L.p(cx - 7, 54, "h"); L.p(cx + 6, 54, "H")
    for y in range(54, 60): L.p(cx - 1, y, "h"); L.p(cx, y, "H")              # kroppen
    L.p(cx - 2, 54, "h"); L.p(cx + 1, 54, "H"); L.p(cx - 2, 55, "h"); L.p(cx + 1, 55, "H")
    for x in range(cx - 2, cx + 2): L.p(x, 58, "w" if x < cx else "W"); L.p(x, 59, "w" if x < cx else "W")
    for y in range(60, 64): L.p(cx - 1, y, "h"); L.p(cx, y, "H")
    _stempel(L, cx - 9, 61, MARIA)                                          # Maria og Johannes ved krossen
    _stempel(L, cx + 4, 61, JOHANNES, spegl=True)
    _stempel(L, cx - 3, 69, [".EEh.", "ERRRr"])                             # Maria Magdalena kneler ved foten
    # nisjane: skugge inst, figurane, og eit skjel øvst
    for nx in (cx - 24, cx + 16):
        for y in range(50, 72):
            for x in range(nx, nx + 8): L.p(x, y, "g" if y < 53 else "3")
        for x in range(nx, nx + 8): L.p(x, 50, "Y" if x % 2 else "Z"); L.p(x, 72, "Y"); L.p(x, 73, "Z")
        L.p(nx + 3, 51, "y"); L.p(nx + 4, 51, "Y")
    _stempel(L, cx - 22, 58, MOSES)
    _stempel(L, cx + 18, 58, DOYPAREN)
    for sx in (cx - 28, cx - 16, cx + 13, cx + 25): soyle(sx, 49, 72)
    _stempel(L, 0, 46, AKANTUS)
    _stempel(L, W - 14, 46, AKANTUS, spegl=True)
    # --- predellaen: nattverden ---
    for x in range(cx - 27, cx + 27):
        L.p(x, 76, "y"); L.p(x, 77, "Z")
        for y in range(78, 85): L.p(x, y, "R")
        L.p(x, 85, "r")
    ramme(cx - 21, 77, cx + 20, 85)
    for y in range(79, 84):
        for x in range(cx - 19, cx + 19): L.p(x, y, "b")
    for i, x in enumerate(range(cx - 19, cx + 18, 3)):                      # dei tolv og Kristus ved bordet
        mid = abs(x - (cx - 1)) <= 1
        L.p(x, 79, "y" if mid else ("T" if i % 3 == 0 else "A" if i % 3 == 1 else "K"))
        L.p(x, 80, "h"); L.p(x + 1, 80, "H")
        L.p(x, 81, ("R" if mid else "B" if i % 2 else "E")); L.p(x + 1, 81, "r" if mid else "b" if i % 2 else "R")
        if mid: L.p(x - 1, 79, "y"); L.p(x + 1, 79, "y")
    for x in range(cx - 19, cx + 19): L.p(x, 82, "w"); L.p(x, 83, "W")        # bordet med duk
    L.p(cx - 8, 82, "Y"); L.p(cx + 6, 82, "Y"); L.p(cx - 1, 82, "y")          # kalk og brød
    # --- altaret: kvit kniplingsduk over raudt alterklede, sett litt ovanfrå ---
    ax0, ax1 = 20, W - 21
    for y in range(87, 94):                                                  # bordplata med duken
        for x in range(ax0, ax1 + 1): L.p(x, y, "W" if y in (87, 93) or x > ax1 - 2 else "w")
    for x in range(ax0 + 3, ax1 - 2, 6): L.p(x, 90, "W"); L.p(x + 1, 90, "W")      # mønster i duken
    for x in range(ax0, ax1 + 1):
        L.p(x, 94, "W" if x % 4 else "K")                                    # kniplingskanten
        L.p(x, 95, "w" if x % 2 else "K"); L.p(x, 96, "W" if (x + 1) % 4 else "K")
        for y in range(97, H - 1):
            L.p(x, y, "E" if x < ax0 + 3 else "r" if x > ax1 - 3 else "R")
        L.p(x, H - 1, "r")
    for x in range(ax0 + 2, ax1 - 1):
        if x % 3 == 0: L.p(x, H - 3, "Y")                                    # gullfrynser nedst
    for y in range(99, 108): L.p(cx - 1, y, "y"); L.p(cx, y, "Y")             # gullkrossen
    for x in range(cx - 4, cx + 4): L.p(x, 102, "y" if x < cx else "Y")
    _stempel(L, ax0 + 6, 101, [".E.", "EyE", ".i."])                          # rosar på alterkledet
    _stempel(L, ax1 - 8, 101, [".E.", "EyE", ".i."])
    # på altaret: krusifiks, bibel og to høge messingstakar med ljos
    _stempel(L, cx - 3, 76, ["..yZ..", "..YZ..", "yYhHYZ", "..hH..", "..YZ..", "..YZ..", "..YZ..", ".yYZZ.", "yYYZZZ", ".ZZZZ."])
    _stempel(L, cx - 13, 88, ["rRRRRr", "rppppr", "rRRRRr"])
    ALTAR_LJOS.clear()
    for sx in (ax0 + 3, ax1 - 4):
        for y in range(80, 90): L.p(sx, y, "y"); L.p(sx + 1, y, "Z")
        for x in range(sx - 1, sx + 3): L.p(x, 80, "Y"); L.p(x, 84, "Y")
        L.p(sx - 1, 84, "y"); L.p(sx + 2, 84, "Z")
        for x in range(sx - 2, sx + 4): L.p(x, 90, "Y" if x < sx + 1 else "Z"); L.p(x, 91, "Z")
        for y in range(75, 80): L.p(sx, y, "w"); L.p(sx + 1, y, "W")        # korte ljos, så profetane i nisjane syner
        L.p(sx, 74, "l"); L.p(sx, 73, "L"); L.p(sx, 72, "F"); L.p(sx + 1, 74, "L")
        ALTAR_LJOS.append((sx, 73))
    omriss(L)
    return L


def preikestol(lag="fram"):
    """Preikestol i bondebarokk (etter Lygra, Kvernes og Nordfjordeid, sjå konsept/) i
    standardperspektivet (STILGUIDE.md): sett ovanfrå, så lydhimlingen er ein stor oval med gylne
    ribber og krone, korga ein open oval med kant og golv, og framsida kort, med måla evangelistar i
    bogefelt og preikestolklede. Bibelen ligg på ei raud pute på kanten. Trappa går ned mot høgre
    med breie trinn. 3 fliser brei og 2 rader djup. Ivar kan stå i korga (hogd i kartet), så biletet
    er delt i to lag med grensa midt i korga: lag="bak" (lydhimlingen, ryggbrettet og den bakre
    halvdelen av korga, éi rad høgare i kartet og difor 16 pikslar lågare bilete) og lag="fram" (den
    fremre kanten, framsida, bibelen, søyla og rekkverket). Trinna i trappa er eit eige, flatt lag
    (lag="trapp", flat: true i kartet), så Ivar står oppå trinnet han er på og rekkverket er framfor."""
    W, H = 5 * 16 + 8, 104                          # 5 fliser: trappa går ut på den fjerde
    L = Lerret(W, H)
    cx = 17
    yb = H - 2
    def oval(ox, oy, rx, ry, fn):
        for y in range(int(oy - ry) - 1, int(oy + ry) + 2):
            for x in range(int(ox - rx) - 1, int(ox + rx) + 2):
                d = ((x + 0.5 - ox) / rx) ** 2 + ((y + 0.5 - oy) / ry) ** 2
                if d <= 1: fn(x, y, d)
    # trappa: seks trinn ned mot høgre, sett skrått ovanfrå: brei, lys tråflate (8 pikslar høg, 10 brei),
    # kort, mørk framside (3) og vangen under. Kvart trinn ligg 8 pikslar til høgre og 9 lågare.
    trinn = [(26 + 8 * i, H - 60 + 9 * i) for i in range(6)]
    T = Lerret(W, H)                                # trinna og vangen: eit flatt lag under den som går i trappa
    for tx, ty in trinn:
        for x in range(tx, tx + 10):
            for y in range(ty, ty + 8): T.p(x, y, "p" if y == ty else "q" if x < tx + 7 else "C")   # tråflata
            for y in range(ty + 8, ty + 11): T.p(x, y, "A" if y < ty + 10 else "a")              # framsida
            for y in range(ty + 11, yb + 1):
                T.p(x, y, "t" if y == yb else "A" if x >= tx + 8 else "T" if (y - ty) % 9 else "c")
        T.p(tx, ty, "U")
    for tx, ty in trinn:                                                       # stolpar på framkanten
        for y in range(ty + 2, ty + 9): L.p(tx + 8, y, "t" if y > ty + 2 else "Y")
    for x in range(26, 80):                                                    # handlista
        y = H - 58 + round((x - 34) * 9 / 8)
        if y < yb - 6: L.p(x, y, "y"); L.p(x, y + 1, "Z")
    for y in range(H - 18, yb + 1): L.p(76, y, "U"); L.p(77, y, "t")           # stolpen nedst
    # søyla og foten
    for y in range(H - 50, yb - 3):
        L.p(cx - 2, y, "U"); L.p(cx - 1, y, "T"); L.p(cx, y, "T"); L.p(cx + 1, y, "t")
    for y in (H - 40, H - 22):
        for x in range(cx - 3, cx + 3): L.p(x, y, "Y" if x < cx + 1 else "Z")
    oval(cx, yb - 2, 6, 2.5, lambda x, y, d: L.p(x, y, "U" if y < yb - 2 else "T"))
    # konsollen som smalnar ned mot søyla
    for j, y in enumerate(range(H - 55, H - 49)):
        b = 11 - j
        for x in range(cx - b, cx + b): L.p(x, y, "U" if x < cx - b + 2 else "t" if x >= cx + b - 2 else "T")
    L.p(cx - 1, H - 49, "Y"); L.p(cx, H - 49, "Z")
    # framsida av korga: kort, tre flater, evangelistar i bogefelt, preikestolkledet
    yk = H - 70
    for y in range(yk, H - 55):
        for x in range(cx - 13, cx + 13): L.p(x, y, "U" if x < cx - 8 else "T" if x < cx + 8 else "t")
    for x in range(cx - 13, cx + 13): L.p(x, H - 56, "Y"); L.p(x, H - 55, "Z")
    for fx in (cx - 7, cx + 3):
        for y in range(yk + 4, H - 58):
            for x in range(fx, fx + 4): L.p(x, y, "B" if y < yk + 7 else "b")
        for y in range(yk + 4, H - 58): L.p(fx - 1, y, "Y"); L.p(fx + 4, y, "Z")
        _stempel(L, fx + 1, yk + 6, [".h", "EE", "ER", "Rr"])
    for y in range(yk + 4, H - 58): L.p(cx - 12, y, "E"); L.p(cx + 11, y, "r")
    for x in range(cx - 1, cx + 1):
        for y in range(yk + 2, yk + 12): L.p(x, y, "E" if x < cx else "R")
    for x in range(cx - 2, cx + 2): L.p(x, yk + 12, "Y" if x % 2 else "Z")
    L.p(cx - 1, yk + 5, "Y"); L.p(cx, yk + 5, "Y"); L.p(cx - 1, yk + 4, "Y"); L.p(cx - 1, yk + 6, "Y")
    # korga sett ovanfrå: gyllen kant og golvet inni (bak) og den fremre kanten (fram)
    oval(cx, yk, 13, 5.5, lambda x, y, d: L.p(x, y, ("Y" if y < yk else "y") if d > 0.62 else "a" if y < yk - 1 else "A"))
    # ryggbrettet langs veggen, med ei due i eit felt
    for y in range(H - 88, yk - 4):
        for x in range(cx - 4, cx + 4): L.p(x, y, "T" if x > cx - 4 else "U")
        L.p(cx - 5, y, "y"); L.p(cx + 4, y, "Z")
    _stempel(L, cx - 3, H - 85, ["..w...", ".wwW..", "wwwWWw", "..wW.."])
    # lydhimlingen: ein kvelva kuppel sett ovanfrå med volum (lys oppe til venstre, mørk nede til
    # høgre), gylne ribber, krone med kule på toppen, gyllen gesims langs kanten, raud lambrekin med
    # bogar og gylne duskar under, og skugge på ryggbrettet under himlingen
    oc, oy = cx, H - 96
    for y in range(oy + 8, oy + 14):
        for x in range(cx - 4, cx + 4): L.p(x, y, "a" if y < oy + 11 else "t")
    def kuppel(x, y, d):
        lx, ly = (x + 0.5 - oc) / 15, (y + 0.5 - oy) / 7.5
        lys = -lx * 0.7 - ly * 0.8 + (1 - d) * 1.0                               # høgast og lysast oppe til venstre
        c = "E" if lys > 0.9 else "R" if lys > 0.0 else "r" if lys > -0.7 else "J"
        if (x - oc) % 5 == 0 and 0.12 < d < 0.9: c = "y" if lys > 0.6 else "Y" if lys > -0.2 else "Z"   # ribber
        L.p(x, y, c)
    oval(oc, oy, 15, 7.5, kuppel)
    for (x, y) in [(oc - 7, oy - 4), (oc - 6, oy - 4), (oc - 7, oy - 3)]: L.p(x, y, "O")                 # glans
    lagt = {}
    for x in range(oc - 15, oc + 16):                                          # nedre kant på ovalen
        for y in range(oy + 7, oy - 8, -1):
            if L.get(x, y) not in ".": lagt[x] = y; break
    for x, yl in lagt.items():
        L.p(x, yl + 1, "y"); L.p(x, yl + 2, "Y" if x < oc + 6 else "Z")        # gesimsen
        boge = 1 + round(math.sin(math.pi * ((x - oc) % 6) / 6))
        for k in range(boge + 1): L.p(x, yl + 3 + k, "r" if k < boge else "Y")   # lambrekin med bogar og gullkant
        if (x - oc) % 6 == 0: L.p(x, yl + 4 + boge, "y"); L.p(x, yl + 5 + boge, "Y"); L.p(x, yl + 6 + boge, "Z")   # duskar
    _stempel(L, oc - 2, oy - 9, ["..y..", ".yYZ.", "..Z..", ".yYZ.", "yYYZZ", ".YZZ."])   # krona: kross og kule
    # bibelen på ei raud pute på den fremre kanten
    for x in range(cx - 5, cx + 4): L.p(x, yk + 4, "E" if x < cx else "R")
    for x in range(cx - 4, cx + 3): L.p(x, yk + 2, "w" if x < cx else "W"); L.p(x, yk + 3, "r")
    L.p(cx, yk + 2, "r")
    grense = yk                                     # over og på denne lina: laget bak
    if lag == "trapp":
        omriss(T)
        return T
    if lag == "bak":
        B = Lerret(W, H - 16)
        for y in range(0, grense + 1):
            for x in range(W): B.p(x, y, L.get(x, y))
        omriss(B)
        return B
    for y in range(0, grense + 1):
        for x in range(W): L.p(x, y, ".")
    omriss(L)
    return L


def kyrkjebenk(dor, n=7, variant=0):
    """Lukka kyrkjebenk sett bakfrå, n fliser lang (7 i den store kyrkja). Benker er eit unntak frå
    standardperspektivet (STILGUIDE.md): ryggen er høg (13 pikslar), så han passar med folka som sit
    og dekkjer beina til den som går i benkerada bak. Ryggen med fyllingar i lyst blågrått, setet som
    ei smal stripe bak handlista, og benkedøra ved midtgangen (dor="h": døra til høgre, "v": til
    venstre) med utskoren topp og rose. Golvet i benken og setet er eit eige, flatt bilete
    (kyrkjebenk-golv), så radene står tett. Fem variantar: 0 tre salmebøker; 1 namneplate, hatt og éi
    bok; 2 sjal, to bøker og slitasje; 3 namneplate, tre bøker og ein stokk; 4 fem bøker. Hatt og sjal
    høyrer til folk som sit i benken (eller er gløymde)."""
    W, H = n * 16 + 8, 20
    L = Lerret(W, H)
    x0, x1 = 4, W - 5
    for x in range(x0, x1 + 1):
        L.p(x, 5, "g"); L.p(x, 6, "G")                                        # setet bak ryggen
        L.p(x, 7, "4"); L.p(x, 8, "G"); L.p(x, 9, "3")                        # handlista
        for y in range(10, 19): L.p(x, y, "G")
        L.p(x, 10, "R")                                                       # måla strek under lista
        L.p(x, 19, "3")
        k = (x - x0) % 16
        if k in (0, 1):                                                       # stolpar mellom fyllingane
            for y in range(11, 19): L.p(x, y, "4" if k == 0 else "g")
        elif k == 2:
            for y in range(11, 18): L.p(x, y, "g")
        if k > 2: L.p(x, 11, "g")
        if k == 15:
            for y in range(12, 18): L.p(x, y, "4")
    for y in range(12, 18): L.p(x1, y, "4")
    inn = (lambda a: x0 + a) if dor == "h" else (lambda a: x1 - a)
    if variant in (2, 3):                                                     # slitt handlist, flekkar
        for a in (10, 11, 12, 40, 41, 74, 75, 76, 77, 100, 101):
            if x0 <= inn(a) <= x1: L.p(inn(a), 7, "C")
        for i, a in enumerate((20, 52, 87)):
            x = inn(a); L.p(x, 13 + i % 3, "W"); L.p(x + 1, 13 + i % 3, "W"); L.p(x + 1, 14 + i % 3, "g")
    boker = {0: (22, 58, 92), 1: (50,), 2: (34, 88), 3: (14, 46, 90), 4: (8, 30, 52, 76, 98)}[variant]
    for a in boker:                                                           # salmebøker på handlista
        bx = inn(a) if dor == "h" else inn(a) - 3
        if not x0 <= bx <= x1 - 3: continue
        for x in range(bx, bx + 4): L.p(x, 6, "r"); L.p(x, 7, "R")
        L.p(bx, 6, "p"); L.p(bx + 3, 7, "r")
    if variant == 1:                                                          # svart hatt på handlista
        hx = inn(84) if dor == "h" else inn(84) - 7
        _stempel(L, hx, 2, ["..vvvv..", "..vVVv..", "..vvvv..", "vvvvvvvv", ".vvvvvv."])
    if variant == 2:                                                          # sjal over ryggen
        sx = inn(56) if dor == "h" else inn(56) - 12
        for j, y in enumerate(range(5, 16)):
            for x in range(sx + (j // 3), sx + 12 - (j // 3)):
                L.p(x, y, "E" if (x + y) % 4 == 0 else "R" if y < 9 else "r" if (x - sx) % 3 == 0 else "R")
        for x in range(sx + 3, sx + 9, 2): L.p(x, 16, "Y")
    if variant == 3:                                                          # stokk som står inntil
        sx = inn(30)
        for y in range(1, 19): L.p(sx, y, "T" if y > 1 else "A")
        L.p(sx + (1 if dor == "h" else -1), 1, "A")
    dx = x1 - 5 if dor == "h" else x0                                         # benkedøra med topp og rose
    _stempel(L, dx, 2, ["..zz..", ".zzzz.", "zzzzzz"])
    for y in range(5, 19):
        for x in range(dx, dx + 6):
            L.p(x, y, "z" if 0 < x - dx < 5 else "B" if (x - dx == 0) == (dor == "v") else "u")
    for x in range(dx, dx + 6): L.p(x, 19, "u")
    rose = {0: ".EE.", 1: ".DD.", 2: ".ww.", 3: ".EE.", 4: ".DD."}[variant]
    _stempel(L, dx + 1, 12 if variant in (1, 3) else 10, [rose, rose[0] + "ww" + rose[3] if variant != 2 else "EwwE", ".RR.", ".Ii."])
    for x in range(dx + 1, dx + 5): L.p(x, 7, "Y"); L.p(x, 16, "Y")
    if variant in (1, 3):                                                     # namneplata til garden
        for x in range(dx + 1, dx + 5): L.p(x, 9, "p"); L.p(x, 10, "P")
        L.p(dx + 2, 9, "n"); L.p(dx + 3, 10, "n")
    omriss(L)
    return L


def kyrkjebenk_golv(n=7):
    """Golvet inne i den lukka benken og sidene, sett ovanfrå (flat: true i kartet, under figurane): to
    rader høgt, frå ryggen på benken framfor ned til ryggen på denne, så benkeradene står tett og
    golvet i kyrkja ikkje syner imellom. Mørke plankar med ei fotfjøl, og blågrå sidebord ved veggen og
    ved døra. Ryggen (kyrkjebenk-h og -v) kjem framfor."""
    W, H = n * 16 + 8, 32
    L = Lerret(W, H)
    x0, x1 = 4, W - 5
    for y in range(0, H - 12):
        for x in range(x0, x1 + 1):
            L.p(x, y, "A" if y % 5 == 4 else "c" if (x + y * 3) % 23 else "C")    # golvplankar i benken
    for x in range(x0, x1 + 1):
        L.p(x, 2, "c"); L.p(x, 3, "a")                                        # fotfjøla framme
        L.p(x, H - 13, "3"); L.p(x, H - 12, "g")                              # skuggen under setet
    for y in range(0, H - 11):                                                # sidebord ved veggen og døra
        for x in (x0, x0 + 1, x1 - 1, x1): L.p(x, y, "G" if x in (x0, x1 - 1) else "g")
    return L


def dopefont():
    """Døypefont av kleberstein med dåpsfat og dåpskanne av messing, i standardperspektivet
    (STILGUIDE.md, som i FF6): kanten og dåpsfatet sett ovanfrå som ein stor, open oval (toppflata er
    det meste av biletet), ei kort, forkorta side på kummen med bogar i relieff, ein låg fot og ein
    sokkel i to trinn der toppflatene syner. 2 fliser brei, 1 rad djup."""
    W, H = 2 * 16 + 8, 34
    L = Lerret(W, H)
    cx = W // 2
    def oval(cy, rx, ry, fn):
        for y in range(int(cy - ry) - 1, int(cy + ry) + 2):
            for x in range(int(cx - rx) - 1, int(cx + rx) + 2):
                d = ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2
                if d <= 1: fn(x, y, d)
    # sokkelen: to trinn med toppflate (lys) og kort framside
    oval(28, 17, 5, lambda x, y, d: L.p(x, y, "7" if y < 28 else "6" if x < cx + 8 else "5"))
    for x in range(cx - 17, cx + 17): L.p(x, 32, "5"); L.p(x, 33, "5" if x > cx + 6 else "6")
    oval(25, 12, 3.5, lambda x, y, d: L.p(x, y, "7" if y < 25 else "6"))
    # foten: kort og tjukk
    for y in range(18, 25):
        for x in range(cx - 5, cx + 5): L.p(x, y, "7" if x < cx - 2 else "5" if x > cx + 1 else "6")
    # kummen: kort side under kanten, smalnar mot foten, bogar i relieff
    for j, y in enumerate(range(12, 19)):
        b = [15, 15, 14, 13, 11, 9, 7][j]
        for x in range(cx - b, cx + b): L.p(x, y, "7" if x < cx - b + 3 else "5" if x >= cx + b - 3 else "6")
    for x in range(cx - 12, cx + 12, 4): L.p(x, 14, "5"); L.p(x + 2, 14, "5"); L.p(x + 1, 13, "5")
    # kanten sett ovanfrå: stor oval med tjukk steinkant, dåpsfatet av messing inni
    oval(8, 16, 7.5, lambda x, y, d: L.p(x, y, "7" if (y < 8 and d > 0.55) else "6" if d > 0.55 else "5"))
    oval(8.5, 11, 4.5, lambda x, y, d: L.p(x, y, "y" if d < 0.35 and x < cx else "Y" if d < 0.75 else "Z"))
    for x in range(cx - 6, cx - 1): L.p(x, 7, "l")                            # glans i fatet
    # dåpskanna står på sokkelen til høgre
    _stempel(L, W - 11, H - 15, ["..yZ...", ".YYZ.Z.", "YyYZZ.Z", "YyYZZZ.", ".YYZZ..", ".YYZZ..", "..YZ..."])
    omriss(L)
    return L


def skipvegg(side):
    """Austveggen i skipet på kvar side av korbogen, 4 fliser brei og 5 høg (same høgd som
    bakveggen i koret): himling, gesims og draperi som i koret, kvitkalka mur og marmorert
    brystpanel, og ein marmorert pilaster med kapitel og byrjinga på korbogen mot koret. Til
    høgre (side="h") heng salmetavla med nummer i ei utskoren ramme. Til venstre står
    preikestolen framfor veggen."""
    W, H = 4 * 16 + 8, 5 * 16
    L = Lerret(W, H)
    x0, x1 = 4, W - 5
    pil = (x1 - 9, x1) if side == "v" else (x0, x0 + 9)                     # pilasteren ved korbogen
    for y in range(H):
        for x in range(x0, x1 + 1): L.p(x, y, "k")
    for x in range(x0, x1 + 1):
        L.p(x, 0, "u"); L.p(x, 1, "z"); L.p(x, 2, "z"); L.p(x, 3, "z")
        L.p(x, 4, "D"); L.p(x, 5, "R"); L.p(x, 6, "r")
        if (x - x0) % 8 in (3, 4): L.p(x, 5, "Y")
        k = (x - x0 + (4 if side == "h" else 0)) % 12
        d = 1 + round(4 * math.sin(math.pi * k / 12))
        for y in range(7, 7 + d): L.p(x, y, "E" if y == 7 else "R")
        L.p(x, 7 + d, "r"); L.p(x, 8 + d, "8")
        if k == 0: L.p(x, 7, "Y"); L.p(x, 8, "Y"); L.p(x, 9, "Z"); L.p(x, 10, "Y"); L.p(x, 11, "Z")
    for i, x in enumerate(range(x0 + 3, x1 - 2, 11)): L.p(x, 1 + i % 3, "y"); L.p(x + 1, 1 + i % 3, "Y")
    # brystpanelet
    for x in range(x0, x1 + 1):
        L.p(x, 64, "x"); L.p(x, 65, "D"); L.p(x, 66, "d")
        for y in range(67, H - 1): L.p(x, y, "G")
        L.p(x, 67, "g"); L.p(x, H - 1, "a")
        k = (x - x0) % 16
        if k in (0, 1):
            for y in range(67, H - 1): L.p(x, y, "T" if k == 0 else "t")
    for xf in range(x0 + 4, x1 - 6, 16): L.p(xf + 2, 71, "W"); L.p(xf + 3, 71, "W"); L.p(xf + 4, 72, "W"); L.p(xf + 7, 74, "g")
    # pilasteren: marmorert, med kapitel øvst og base, og korbogen som byrjar å svinge innover
    a, b = pil
    for y in range(12, H):
        for x in range(a, b + 1):
            c = "W" if x == a else "K" if x == b else "G"
            if (y * 3 + x) % 11 == 0 and a < x < b: c = "g"
            L.p(x, y, c)
    for x in range(a - 1, b + 2):
        L.p(x, 12, "y"); L.p(x, 13, "Y"); L.p(x, 14, "Z"); L.p(x, H - 6, "Y"); L.p(x, H - 5, "Z")
    for j in range(8):                                                       # bogen: raudt band med gull
        bx = (b + 1 + j) if side == "v" else (a - 1 - j)
        for y in range(4, 12 - j // 2):
            if 0 <= bx < W: L.p(bx, y, "R" if y > 5 else "Y")
    if side == "h":
        # salmetavla: svart tavle med kvite nummer i ei utskoren, forgylt ramme
        tx, ty = 16, 24
        _stempel(L, tx + 6, ty - 5, ["...YY...", "..YyyZ..", ".YyZZyZ.", "YZ....ZY"])
        for y in range(ty, ty + 30):
            for x in range(tx, tx + 20): L.p(x, y, "Y" if x == tx or y == ty else "Z" if x == tx + 19 or y == ty + 29 else "v")
        for j in range(4):
            y = ty + 3 + j * 7
            for k, x in enumerate(range(tx + 4, tx + 16, 4)):
                n = int(h(j, k, 91) * 10)
                rader = [["ww", "w.", "ww", ".w", "ww"], ["w.", "w.", "w.", "w.", "w."], ["ww", ".w", "ww", "w.", "ww"]][n % 3]
                _stempel(L, x, y, rader)
        _stempel(L, tx + 7, ty + 30, ["YyZZ", ".YZ."])
    omriss(L)
    return L
def korskilje():
    """Korskiljet under korbogen: ein låg balustrade i blågrønt (som benkene i Grytten) med gyllen
    handlist og opning midt i (der løparen går inn i koret), 11 fliser brei."""
    W, H = 11 * 16 + 8, 26
    L = Lerret(W, H)
    yf = H - 3
    yt = yf - 10                                   # standardperspektivet: brei handlist sett ovanfrå, korte balustrar
    o0, o1 = 4 + 5 * 16 - 1, 4 + 6 * 16                                       # opninga (flisa midt i)
    for xa, xb in ((4, o0 - 2), (o1 + 2, W - 5)):
        for x in range(xa, xb + 1):
            L.p(x, yt - 2, "y"); L.p(x, yt - 1, "y"); L.p(x, yt, "Y"); L.p(x, yt + 1, "Y"); L.p(x, yt + 2, "Z")
            L.p(x, yf - 1, "G"); L.p(x, yf, "3")
        for x in range(xa + 2, xb - 1, 4):
            for y in range(yt + 3, yf - 1):
                L.p(x, y, "4"); L.p(x + 1, y, "G")
                if y in (yt + 3, yt + 7, yf - 3): L.p(x - 1, y, "4"); L.p(x + 2, y, "g")
    for px in (4, o0 - 3, o1 + 1, W - 7):                                     # stolpar med knapp
        for y in range(yt - 3, yf + 1): L.p(px, y, "4"); L.p(px + 1, y, "G"); L.p(px + 2, y, "g")
        L.p(px, yt - 5, "y"); L.p(px + 1, yt - 5, "Y"); L.p(px, yt - 4, "Y"); L.p(px + 1, yt - 4, "Z"); L.p(px + 2, yt - 4, "Z")
    omriss(L)
    return L


def kyrkjeskip():
    """Kyrkjeskip (votivskip) som heng i taket, slik mange kystkyrkjer på Vestlandet har: ein
    fullriggar med svart skrog, gul stripe med kanonportar, tre master med rær og opprulla segl,
    vimplar og ein stubb av kjettingen (motoren teiknar resten opp til taket). 3 fliser breitt. Heng høgt (over: true, faktor over
    1 i kartet: parallakse)."""
    W, C = 3 * 16 + 8, 4                                                 # kjettingstubben (resten: kjede() i motor.js)
    H = C + 44
    L = Lerret(W, H)
    for y in range(0, C + 2): L.p(27, y, "Z"); L.p(28, y, "9")              # kjettingen til stormasta
    y0 = C
    # skroget: svart, gul stripe med portar, kobbar nedst; baugen til venstre
    for x in range(5, 52):
        t = (x - 5) / 46
        top = y0 + 30 - round(3 * (1 - t) ** 3) - round(2 * t ** 4)           # spring: høgare i endane
        bot = y0 + 38 - round(4 * abs(t - 0.55) ** 2 * 4)
        for y in range(top, bot + 1):
            c = "v" if y < top + 2 else "D" if y == top + 2 else "v" if y < bot - 1 else "U"
            if y == top + 2 and x % 4 == 0: c = "V"
            L.p(x, y, c)
        L.p(x, top, "X")
    for x in range(2, 9): L.p(x, y0 + 28 + (x - 2) // 3, "T")               # baugspydet
    _stempel(L, 48, y0 + 24, ["YT..", "TTT.", "TvT.", "vvv."])               # akterkastellet
    # master, rær og opprulla segl
    for mx, topp in ((17, y0 + 6), (28, y0 + 2), (39, y0 + 8)):
        for y in range(topp, y0 + 30): L.p(mx, y, "T")
        for j, (ry, b) in enumerate(((topp + 4, 4), (topp + 10, 6), (topp + 17, 7))):
            for x in range(mx - b, mx + b + 1): L.p(x, ry, "t"); L.p(x, ry - 1, "w" if x < mx else "W")
        L.p(mx, topp - 1, "R"); L.p(mx + 1, topp - 1, "E"); L.p(mx + 2, topp, "R")   # vimpel
    # rigg: stag frå baugen og akter, og vant ned til relinga
    for x in range(4, 17): L.p(x, y0 + 28 - round((x - 4) * 21 / 13), "K")
    for x in range(40, 50): L.p(x, y0 + 9 + round((x - 40) * 16 / 10), "K")
    omriss(L)
    return L


def fattigblokk():
    """Fattigblokka ved inngangen: ein tjukk, raudmåla stokk med jernband, lås og ei sprekk øvst til
    myntane, som i våpenhusa i mange bygdekyrkjer. 1 flis."""
    W, H = 16 + 8, 30
    L = Lerret(W, H)
    for y in range(4, H - 1):
        for x in range(7, 17): L.p(x, y, "E" if x < 9 else "R" if x < 14 else "r")
    for x in range(7, 17): L.p(x, 3, "R"); L.p(x, 2, "E" if x < 12 else "R")          # toppen
    L.p(10, 2, "v"); L.p(11, 2, "v"); L.p(12, 2, "v")                                  # sprekka
    for y in (6, 14, 22):                                                              # jernband
        for x in range(7, 17): L.p(x, y, "X" if x < 10 else "V")
    _stempel(L, 10, 9, ["vVv", "vXv", ".v."])                                           # låsen
    for x in range(5, 19): L.p(x, H - 1, "t"); L.p(x, H - 2, "T" if x < 15 else "t")    # foten
    omriss(L)
    return L


def jernomn():
    """Jernomn (omnen kom inn i mange bygdekyrkjer på 1800-talet): støypejern på fire bein, med
    relieff på sida, ei luke med glo bak (ILD i pikslar.js) og omnsrøyr opp og inn i veggen til
    høgre. Står ved høgre sidevegg. 1 flis."""
    W, H = 16 + 8, 52
    L = Lerret(W, H)
    for y in range(26, 46):
        for x in range(5, 18): L.p(x, y, "X" if x < 7 else "V" if x < 15 else "v")
    for x in range(4, 19): L.p(x, 25, "X"); L.p(x, 24, "V")                           # topplata
    for x in range(4, 19): L.p(x, 46, "V")
    for bx in (5, 16):                                                                 # beina
        for y in range(47, 51): L.p(bx, y, "v"); L.p(bx + 1, y, "V")
    _stempel(L, 7, 28, ["X.X.X", ".XvX.", "X.X.X"])                                    # relieff
    for y in range(36, 42):                                                            # luka
        for x in range(8, 15): L.p(x, y, "v")
    for x in range(8, 15): L.p(x, 35, "X"); L.p(x, 42, "X")
    L.p(14, 38, "X")
    for y in range(4, 24): L.p(10, y, "V"); L.p(11, y, "V"); L.p(12, y, "v"); L.p(9, y, "X")   # røyret
    for y in (10, 18):
        for x in range(9, 13): L.p(x, y, "X")
    for x in range(9, W): L.p(x, 2, "X"); L.p(x, 3, "V"); L.p(x, 4, "v")              # bogen inn i veggen
    omriss(L)
    return L


def epitaf(side):
    """Eit epitafium (minnetavle over ein prest eller ein storbonde) som heng på sideveggen i skipet,
    sett skrått frå rommet: eit smalt, høgt måla felt i forgylt ramme med akantus øvst og ein
    hengjande dropp nedst. side="v" heng på venstre vegg, "h" på høgre. 1 flis (over veggflisa)."""
    W, H = 16 + 8, 44
    L = Lerret(W, H)
    x0 = 16 if side == "v" else 2                                                       # innsida av veggen
    w = 6
    for y in range(10, 34):
        for x in range(x0, x0 + w):
            k = x - x0 if side == "v" else w - 1 - (x - x0)
            c = "y" if k == 0 else "Z" if k == w - 1 else "b" if y < 16 else "B" if y < 26 else "e"
            if y in (10, 33): c = "Y"
            L.p(x, y, c)
    m = x0 + 2
    L.p(m, 15, "h"); L.p(m + 1, 15, "H"); L.p(m, 16, "w"); L.p(m + 1, 16, "W")         # ein prest med krage
    for y in range(17, 24): L.p(m, y, "v"); L.p(m + 1, y, "v")
    for y in (28, 30): L.p(m, y, "p"); L.p(m + 1, y, "P")                               # innskrift
    _stempel(L, x0 - 1, 3, ["..YY....", ".YyyZ...", "YyZ.yZ..", "Yy..YyZ.", ".ZYyyZ..", "...ZZ..."], spegl=(side == "h"))
    _stempel(L, x0 + 1, 34, ["YyZ.", ".YZ.", ".Z..", ".y.."], spegl=(side == "h"))
    omriss(L)
    return L


def trapp():
    """Trappa i våpenhuset opp til galleriet, sett ovanfrå (flat: true, ein går oppå ho): fire trinn
    i furu som stig mot nord (lysare jo høgare), mørk skugge under kvar trinnkant, og handlista langs
    veggen til venstre. 1 flis brei, 3 rader lang."""
    W, H = 16 + 8, 48
    L = Lerret(W, H)
    farge = ["A", "c", "C", "q"]
    for i in range(6):                                                     # seks trinn, øvst lysast
        y0 = 2 + i * 8
        c = farge[min(3, 3 - i * 3 // 5)]
        for y in range(y0, y0 + 8):
            for x in range(5, 20): L.p(x, y, c)
        for x in range(5, 20): L.p(x, y0, "q" if i < 3 else "C"); L.p(x, y0 + 7, "a")
    for y in range(2, H - 1): L.p(4, y, "U"); L.p(3, y, "t")               # handlista mot veggen
    for y in range(2, H - 1, 8): L.p(4, y, "y")
    omriss(L)
    return L


def lydluke():
    """Lydluke i tårnveggen: ei opning i laftet med skrå lamellar, så lyden og lyset slepp ut og inn,
    og himmel i glipene. Står over ei «u»-flis (rad 1), der lysstrålane startar. 1 flis brei, 2 høg."""
    W, H = 16 + 8, 32
    L = Lerret(W, H)
    for y in range(4, 28):
        for x in range(5, 19): L.p(x, y, "A" if x in (5, 18) or y in (4, 27) else "2")
    for y in range(7, 26, 3):                                              # lamellane
        for x in range(6, 18): L.p(x, y, "c"); L.p(x, y + 1, "a")
    for x in range(5, 19): L.p(x, 3, "C")
    omriss(L)
    return L


def klokkestol():
    """Klokkestolen i tårnet, sett skrått ovanfrå: ein solid stol av grove bjelkar (stolpar, toppbjelke,
    knebandsbjelkar og sviller med toppflate), hjulet til høgre og tauet som går ned mot golvet
    (tauenden er vesenet klokketau). Sjølve klokka med åket er vesenet klokke (klokke.py), så ho kan
    svinge når Ivar dreg i tauet. 5 fliser brei, 2 rader djup."""
    W, H = 5 * 16 + 8, 104
    L = Lerret(W, H)
    cx = 42
    def bjelke(x0, y0, x1, y1, topp=True):                                # liggjande bjelke med toppflate
        for y in range(y0, y1 + 1):
            for x in range(x0, x1 + 1):
                L.p(x, y, "C" if topp and y < y0 + 3 else "c" if y < y1 - 2 else "A" if y < y1 else "a")
    # svillene: bakre (høgare opp, lenger inne) og fremre, med sidesviller mellom
    bjelke(6, H - 34, W - 7, H - 28)
    for sx in (6, W - 13):
        for y in range(H - 34, H - 4):
            for x in range(sx, sx + 7): L.p(x, y, "C" if x < sx + 2 else "c" if x < sx + 5 else "A")
    # bakre stolpar (mørkare, bak klokka)
    for sx in (10, W - 15):
        for y in range(8, H - 32):
            L.p(sx, y, "A"); L.p(sx + 1, y, "a"); L.p(sx + 2, y, "a")
    # toppbjelken med toppflate
    bjelke(3, 6, W - 4, 15)
    # (klokka sjølv med åket er eit eige vesen som kan svinge: klokke.py)
    # framre stolpar med knebandsbjelkar opp til toppbjelken
    for sx in (4, W - 10):
        for y in range(6, H - 3):
            L.p(sx, y, "C"); L.p(sx + 1, y, "c"); L.p(sx + 2, y, "c"); L.p(sx + 3, y, "c"); L.p(sx + 4, y, "A"); L.p(sx + 5, y, "a")
    for i in range(14):
        for k in range(3):
            L.p(10 + i, 30 - i + k, "c" if k else "C"); L.p(W - 11 - i, 30 - i + k, "c" if k else "C")
    # framre svilla
    bjelke(2, H - 8, W - 3, H - 1)
    # hjulet til høgre og tauet ned mot golvet
    hx, hy, r = 70, 30, 9
    for a in range(0, 360, 6):
        import math as _m
        x, y = round(hx + r * _m.cos(_m.radians(a))), round(hy + r * 0.5 * _m.sin(_m.radians(a)))
        L.p(x, y, "c"); L.p(x, y + 1, "A")
    for x in range(cx + 10, hx): L.p(x, hy, "A")
    for y in range(hy, H - 8): L.p(76, y, "D" if y % 3 else "d"); L.p(77, y, "d")
    omriss(L)
    return L


def tarnvegg():
    """Bakveggen i tårnet, sett framanfrå: grove laftestokkar med mørke fuger, to lydluker med
    skrå lamellar der himmelen syner (over «u», der lysstrålane startar), og ei smal golvlist. 11
    fliser brei, 3 høg (rad 0 til 2)."""
    W, H = 11 * 16 + 8, 48
    L = Lerret(W, H)
    x0, x1 = 4, W - 5
    for y in range(H):
        for x in range(x0, x1 + 1):
            k = y % 7
            c = "c" if k in (1, 2) else "A" if k in (3, 4) else "a" if k == 5 else "C" if k == 0 else "a"
            L.p(x, y, c)
        if y % 7 == 0:
            for x in range(x0 + (y * 5) % 23, x1, 29): L.p(x, y + 3, "a"); L.p(x + 1, y + 3, "a")   # kvistar
    for wx in (20, 116):                                                   # lydlukene
        for y in range(10, 40):
            for x in range(wx, wx + 16): L.p(x, y, "a" if x in (wx, wx + 15) or y in (10, 39) else "2")
        for y in range(13, 38, 4):
            for x in range(wx + 1, wx + 15): L.p(x, y, "c"); L.p(x, y + 1, "A"); L.p(x, y + 2, "a")
        for x in range(wx - 1, wx + 17): L.p(x, 9, "C"); L.p(x, 40, "C"); L.p(x, 41, "A")
    for x in range(x0, x1 + 1): L.p(x, H - 2, "A"); L.p(x, H - 1, "a")
    omriss(L)
    return L


def tarnbjelke(due=False):
    """Ein grov bjelke tvers over tårnrommet, høgt oppe (over: true, faktor over 1 i kartet:
    parallakse), med klossar, spikarhovud og kvite flekkar av fuglelort. due=True: med ei due som
    sit på bjelken (ikkje i bruk: dua er no eit vesen som kan fly, sjå klokke.py). 13 fliser lang."""
    W, H = 13 * 16 + 8, 22
    L = Lerret(W, H)
    for x in range(4, W - 4):
        for y in range(11, 19):
            L.p(x, y, "C" if y == 11 else "c" if y < 15 else "A" if y < 18 else "a")
        if (x * 7) % 23 == 0: L.p(x, 13, "A"); L.p(x + 1, 14, "A")
    for x in range(4, W - 4, 40): L.p(x + 3, 12, "X"); L.p(x + 3, 16, "V")
    for x in (31, 32, 77, 120, 121, 122, 166):                             # fuglelort
        L.p(x, 11, "w"); L.p(x, 12, "W")
        if x % 2: L.p(x, 15, "w"); L.p(x, 16, "W")
    if due:
        _stempel(L, 140, 3, ["...KK...", "..KwKo..", ".KWWWK..", "KWWWWWK.", "KWWKWWWK", ".KWWWWK.", "..KKKK..", "...h.h.."])
    omriss(L)
    return L


def galleribrystning():
    """Brystninga på galleriet sett frå galleriet (bakfrå), kraftig og mørk i forgrunnen: tjukk
    handlist av mørk eik med lys kant, dreia balustrar med glipe imellom (utsynet ned i skipet syner
    gjennom), stolpar med knapp og ein tung sokkel. 21 fliser."""
    W, H = 21 * 16 + 8, 30
    L = Lerret(W, H)
    x0, x1 = 4, W - 5
    for x in range(x0, x1 + 1):
        L.p(x, 4, "O"); L.p(x, 5, "M"); L.p(x, 6, "M"); L.p(x, 7, "J"); L.p(x, 8, "j")   # handlista
        for y in range(H - 5, H): L.p(x, y, "J" if y < H - 3 else "j")                 # sokkelen
        L.p(x, H - 6, "M")
    for x in range(x0 + 3, x1 - 2, 6):                                     # dreia balustrar
        for y in range(9, H - 6):
            b = 2 if y in (11, 12, H - 9, H - 8) else 1 if y in (10, 13, 18, H - 10) else 0
            for k in range(-b, 3 + b): L.p(x + k, y, "O" if k <= 0 else "M" if k == 1 else "J")
    for x in range(x0, x1 + 1, 48):                                        # stolpar med knapp
        for y in range(1, H):
            for k in range(5): L.p(x + k, y, "O" if k == 0 else "M" if k < 3 else "J" if k < 4 else "j")
        L.p(x + 1, 0, "O"); L.p(x + 2, 0, "M"); L.p(x + 3, 0, "J")
    omriss(L)
    return L


def galleritrinn():
    """Trinnet mellom radene på galleriet (benkene står bratt i trinn): ein mørk opptrinnskant og ei
    lys nase langs heile galleriet, flat på golvet (flat: true). 19 fliser."""
    W, H = 19 * 16 + 8, 16
    L = Lerret(W, H)
    for x in range(4, W - 4):
        L.p(x, 0, "q"); L.p(x, 1, "C"); L.p(x, 2, "A"); L.p(x, 3, "a"); L.p(x, 4, "a")
    return L


def orgel():
    """Eit lite orgel (positiv) i hjørnet på galleriet: kasse i mørk furu med gylne list, ei rekkje
    tinnpiper øvst (høgast i midten), utskorne gitter over pipene, klaviatur og noteboka. 3 fliser
    breitt, går om lag 50 pikslar opp. Organisten sit på benken framfor."""
    W, H = 3 * 16 + 8, 56
    L = Lerret(W, H)
    for y in range(22, H - 1):                                             # kassa
        for x in range(6, 50): L.p(x, y, "U" if x < 9 else "T" if x < 46 else "t")
    for x in range(5, 51): L.p(x, 21, "Y"); L.p(x, H - 1, "t"); L.p(x, 36, "Y")
    for x in range(10, 46): L.p(x, 38, "w" if x % 3 else "v"); L.p(x, 39, "W")   # klaviaturet
    _stempel(L, 22, 33, ["pppppppppppp", "pPPPPpPPPPPp"])                    # noteboka
    for i, x in enumerate(range(10, 46, 3)):                               # pipene
        top = 6 + abs(i - 6) * 2
        for y in range(top, 21): L.p(x, y, "s"); L.p(x + 1, y, "S")
        L.p(x, top - 1, "s")
        L.p(x, 18, "v"); L.p(x + 1, 18, "v")
    for x in range(6, 50): L.p(x, 4 + abs(x - 28) // 3, "Y")                # gitteret over
    omriss(L)
    return L


def grue():
    """Kvitkalka grue med hette i hjørnet, eld og gryte på krok (etter Bjørnebergstølen og Askevold).
    Standardperspektivet: kanten på hetta er boga (ho er rund sett ovanfrå), og grueheller og
    golvet i eldstaden syner som toppflater."""
    W, H = 16 + 8, 2 * 16 + 12
    L = Lerret(W, H)
    for y in range(0, H - 2):
        b = 9 if y > 16 else int(4 + y * 0.32)
        for x in range(12 - b, 12 + b + 1): L.p(x, y, "k" if x < 12 + b * 0.3 else "x")
    for x in range(3, 22):                                                  # kanten på hetta: boge, sot under
        yk = 16 + round(2 * (1 - ((x - 12) / 9.5) ** 2))
        L.p(x, yk - 1, "8"); L.p(x, yk, "x"); L.p(x, yk + 1, "n")
    for y in range(24, H - 3):
        for x in range(5, 19): L.p(x, y, "N")
    for y in range(34, H - 3):
        for x in range(6, 18):
            if h(x, y, 3) > 0.25 + (H - 3 - y) / 14: L.p(x, y, "f" if h(x, y, 4) > 0.6 else "F")
    for x in range(5, 19): L.p(x, H - 5, "n"); L.p(x, H - 4, "n")            # golvet i eldstaden: oske
    for x in (7, 10, 15): L.p(x, H - 4, "x")
    for (x, c) in ((8, "T"), (9, "U"), (10, "T"), (13, "t"), (14, "T"), (15, "U")): L.p(x, H - 6, c)   # vedskier
    for y in range(24, 27): L.p(12, y, "v" if y % 2 else "X")          # kjetting frå hetta
    for (x, y) in [(11, 27), (10, 28), (13, 27), (14, 28)]: L.p(x, y, "v")  # hank
    for x in range(8, 16): L.p(x, 29, "X" if x < 13 else "V")           # gryta i svart jern, lys kant
    for y, (a, b) in {30: (8, 15), 31: (8, 15), 32: (9, 14), 33: (10, 13)}.items():
        for x in range(a, b + 1): L.p(x, y, "X" if x == a + 1 and y < 32 else "v" if x >= b - 1 else "V")
    for x in range(3, 22): L.p(x, H - 3, "8"); L.p(x, H - 2, "x")         # grueheller: toppflate og kort kant
    L.p(3, H - 3, "k")
    omriss(L)
    return L


def hylle():
    """Hylle på veggen med to rosemålte trefat på høgkant og eit ølkrus med lok, hyllebord på to
    knektar. Hyllebordet syner toppflata (3 pikslar) og ein kort kant. 2 fliser breitt."""
    W, H = 2 * 16 + 8, 22
    L = Lerret(W, H)
    for x in range(2, W - 2): L.p(x, 12, "c"); L.p(x, 13, "C"); L.p(x, 14, "q"); L.p(x, 15, "A")   # hyllebordet
    L.p(2, 13, "q"); L.p(W - 3, 13, "A")
    for (kx, retn) in [(6, 1), (W - 7, -1)]:                                             # knektar
        for k in range(4):
            for d in range(4 - k): L.p(kx + retn * d, 16 + k, "c" if d == 0 else "A")
    for cx in (9, 21):                                                                   # trefat på høgkant
        for y in range(2, 13):
            for x in range(cx - 5, cx + 6):
                d = ((x - cx) ** 2 + (y - 7) ** 2) ** 0.5
                if d <= 5.4: L.p(x, y, "T" if d > 4.4 else "C" if d > 3.2 else "U")
        for (dx, dy, c) in [(0, 0, "y"), (-1, 0, "E"), (1, 0, "E"), (0, -1, "E"), (0, 1, "E"),
                            (-2, -2, "m"), (2, -2, "m"), (-2, 2, "m"), (2, 2, "m"), (-3, 0, "m"), (3, 0, "m")]:
            L.p(cx + dx, 7 + dy, c)
        L.p(cx - 3, 4, "w"); L.p(cx - 2, 3, "w")                                         # glans
        for x in range(cx - 3, cx + 4): L.p(x, 13, "A")                                  # skugge på hylla
    for y in range(6, 14):                                                               # ølkrus med lok og hank
        for x in range(28, 35): L.p(x, y, "C" if x < 30 else "c" if x < 33 else "A")
    for x in range(28, 35): L.p(x, 8, "a"); L.p(x, 12, "a")                               # band
    for (x, y, c) in ((28, 4, "U"), (29, 3, "U"), (30, 3, "q"), (31, 3, "U"), (32, 3, "U"), (33, 3, "U"), (34, 4, "T"),
                      (28, 5, "T"), (29, 5, "U"), (30, 4, "q"), (31, 4, "U"), (32, 4, "U"), (33, 4, "U"), (34, 5, "t"),
                      (29, 4, "U"), (30, 5, "U"), (31, 5, "U"), (32, 5, "T"), (33, 5, "T"), (27, 5, "U"), (35, 5, "T")): L.p(x, y, c)
    L.p(31, 2, "T")                                                                      # knappen på loket (ovalt, sett ovanfrå)
    for y in range(7, 12): L.p(36, y, "A")
    L.p(35, 7, "A"); L.p(35, 11, "A")
    for x in range(29, 36): L.p(x, 13, "A")
    omriss(L)
    return L


def sengebenk():
    """Sengebenk i standardperspektivet: sengeflata er ei stor toppflate (kvit pute, laken bretta ned
    og eit raudt, vove åklede med rutemønster, etter sengebenken på Bjørnebergstølen og åklede frå
    Vestlandet), sengestokken framme har ei smal toppflate og ei kort framside, og gavlane syner
    toppkanten ovanfrå: høg hovudgavl til venstre med knott, låg fotgavl til høgre. 2 fliser breitt."""
    W, H = 2 * 16 + 8, 30
    L = Lerret(W, H)
    for x in range(7, 33): L.p(x, 4, "c"); L.p(x, 5, "A")                    # sengestokken bak, mot veggen
    for y in range(6, 21):                                                  # åkledet
        for x in range(7, 33): L.p(x, y, "R")
    for x in range(7, 33): L.p(x, 6, "E"); L.p(x, 7, "y"); L.p(x, 19, "y"); L.p(x, 20, "E")
    for (cx, cy) in [(20, 13), (27, 13), (23, 10), (30, 10), (23, 16), (30, 16)]:   # ruter i åkledet
        for dx, dy in [(0, -2), (-1, -1), (1, -1), (-2, 0), (2, 0), (-1, 1), (1, 1), (0, 2)]: L.p(cx + dx, cy + dy, "y")
        L.p(cx, cy, "w")
    for x in range(8, 33, 2): L.p(x, 21, "r")                               # åkledet heng over sengestokken
    for y in range(6, 22): L.p(15, y, "w"); L.p(16, y, "W")                  # lakenet bretta ned
    for y in range(6, 15):                                                  # puta
        for x in range(7, 15): L.p(x, y, "w" if (y < 13 and x < 13) else "W")
    for x in range(8, 14): L.p(x, 6, "w")
    L.p(8, 7, "K"); L.p(13, 14, "K"); L.p(10, 10, "W"); L.p(11, 10, "W")
    for x in range(6, 34): L.p(x, 22, "q"); L.p(x, 23, "C"); L.p(x, 24, "c"); L.p(x, 25, "A")   # sengestokken framme
    # gavlane: toppkanten sett ovanfrå er ei lys stripe på langs, framsida (endeveden) kort og mørkare
    def gavl(xa, ytopp, yfram):
        for y in range(ytopp, 27):
            for x in range(xa, xa + 5):
                if y < yfram: c = "q" if x == xa else "c" if x == xa + 4 else "C"
                else: c = "c" if x == xa else "a" if x == xa + 4 else "A"
                L.p(x, y, c)
        for x in range(xa, xa + 5): L.p(x, yfram, "U")
        for x in range(xa + 1, xa + 4): L.p(x, ytopp, "U")
    gavl(2, 2, 18)                                                          # hovudgavlen, høg
    gavl(33, 8, 22)                                                         # fotgavlen, låg
    for (x, y) in ((3, 1), (4, 1), (5, 1), (4, 0)): L.p(x, y, "T")          # knotten
    L.p(4, 21, "a"); L.p(4, 23, "a")                                        # skurd i endeveden
    for (x0, x1) in [(3, 5), (34, 36)]:                                     # bein
        for x in range(x0, x1 + 1): L.p(x, 27, "a")
    omriss(L)
    return L


# Møblar til bondestova som kan setjast saman på fleire måtar: langbord, benk og kubbestol.

# Felles mål (sjå SKILL.md): Setet på benken og kubbestolen er SETE_HOGD pikslar over golvet, og
# den som sit, blir lyft like mykje (SETE i js/rpg/pikslar.js). Bordplata ligg BORD_HOGD pikslar
# over golvet, og i standardperspektivet (runde 59) er ho ei stor toppflate (13 pikslar per flis
# djupn) med kort framkant og korte bein, så bordkanten bak går BORD_HOGD - 6 pikslar opp i
# flisraden bak bordet.
SETE_HOGD = 5
BORD_HOGD = 9


def _bordplate(L, x0, x1, y0, y1, langs):
    """Bordplate av furu med plankar på langs (langs="x": vassrette skøytar, "y": loddrette)."""
    for y in range(y0, y1 + 1):
        for x in range(x0, x1 + 1):
            fuge = (y - y0) % 8 == 7 if langs == "x" else (x - x0) % 8 == 7
            L.p(x, y, "c" if fuge else "C")                                 # skøytar mellom plankane
    # årer i treet: korte strekar på langs av plankane, ikkje einsame pikslar
    for i in range((x1 - x0) * (y1 - y0) // 60):
        ax, ay = x0 + 2 + int(h(i, 1, 41) * (x1 - x0 - 6)), y0 + 2 + int(h(i, 2, 41) * (y1 - y0 - 4))
        for k in range(3 + int(h(i, 3, 41) * 3)):
            px, py = (ax + k, ay) if langs == "x" else (ax, ay + k)
            if L.get(px, py) == "C": L.p(px, py, "c")
    for x in range(x0, x1 + 1): L.p(x, y0, "q")                             # kanten bak fangar lyset
    for y in range(y0, y1 + 1): L.p(x0, y, "q"); L.p(x1, y, "A")            # lys kant til venstre, skugge til høgre
    for x in range(x0, x1 + 1):                                             # framkanten
        L.p(x, y1 + 1, "c"); L.p(x, y1 + 2, "A"); L.p(x, y1 + 3, "a")
    L.p(x0, y1 + 1, "C"); L.p(x1, y1 + 1, "A")


def _bordbein(L, x0, x1, ytopp, ybotn):
    """To bein framme med sleid mellom, og mørkt under plata."""
    for x in range(x0 + 2, x1 - 1): L.p(x, ytopp, "a")                      # skugge under plata
    for xb in (x0 + 2, x1 - 4):
        for y in range(ytopp, ybotn + 1): L.p(xb, y, "C"); L.p(xb + 1, y, "c"); L.p(xb + 2, y, "a")
    sy = ybotn - 3
    for x in range(x0 + 5, x1 - 4): L.p(x, sy, "c"); L.p(x, sy + 1, "a")


def _paa_bordet(L, *ting):
    """Teiknar ting på bordplata, kvar med ein smal skugge mot høgre og ned (lyset frå oppe til venstre)."""
    for fn, *arg in ting:
        for_ = [r[:] for r in L.g]
        fn(L, *arg)
        ny = [(x, y) for y in range(L.h) for x in range(L.w) if L.g[y][x] != for_[y][x]]
        sett = set(ny)
        for x, y in ny:
            if (x + 1, y + 1) not in sett and L.get(x + 1, y + 1) in "Cc": L.p(x + 1, y + 1, "A")


def _fat(L, cx, cy):
    """Trefat med graut og smørauge sett ovanfrå (ein brei oval), og ei skei ved sida."""
    for dy in range(-2, 3):
        for dx in range(-5, 6):
            d = dx * dx / 25 + dy * dy / 6.5
            if d <= 1: L.p(cx + dx, cy + dy, "T" if d > 0.5 else "k" if dy < 1 else "x")
    L.p(cx - 5, cy, "U"); L.p(cx + 5, cy, "t"); L.p(cx, cy - 1, "y")
    for k in range(3): L.p(cx + 7 + k, cy - 1 + k // 2, "U")
    L.p(cx + 7, cy - 2, "T")


def _brod(L, cx, cy):
    for dy in range(-2, 3):
        for dx in range(-4, 5):
            if dx * dx / 16 + dy * dy / 4 <= 1: L.p(cx + dx, cy + dy, "U" if dy < 0 else "T")
    L.p(cx - 1, cy - 1, "y"); L.p(cx + 1, cy, "t")


def _flatbrod(L, cx, cy):
    """Ein stabel flatbrød sett ovanfrå: tynne, runde leivar (breie ovalar) med brune flekker."""
    for k in (2, 1, 0):
        for dy in range(-2, 3):
            for dx in range(-6, 7):
                if dx * dx / 36 + dy * dy / 6.5 <= 1: L.p(cx + dx, cy + dy + k, "U" if k else ("q" if dy < 1 else "C"))
    for dx, dy in ((-3, -1), (1, -1), (3, 0), (-1, 1), (4, -1)): L.p(cx + dx, cy + dy, "U")


def _kniv(L, x, y, langs):
    for k in range(5): L.p(*((x + k, y) if langs == "x" else (x, y + k)), "X" if k < 3 else "t")


def _olbolle(L, cx, cy):
    """Måla ølbolle sett ovanfrå: brei oval opning med øl, rosemåla kant."""
    for dy in range(-2, 3):
        for dx in range(-3, 4):
            d = dx * dx / 10 + dy * dy / 4.5
            if d <= 1: L.p(cx + dx, cy + dy, "m" if d > 0.5 and dy >= 0 else "A" if d > 0.5 else "a" if dy > 0 else "c")
    L.p(cx - 2, cy + 1, "E"); L.p(cx, cy + 2, "y"); L.p(cx + 2, cy + 1, "E"); L.p(cx - 1, cy - 1, "U"); L.p(cx - 3, cy, "U")


def langbord():
    """Langbord av furu, liggjande (på tvers), 4 x 2 fliser, utan stolar, i standardperspektivet
    (STILGUIDE.md): plata er ei stor toppflate (26 pikslar for to fliser djupn), framkanten 3 pikslar
    og beina korte. Plata ligg BORD_HOGD pikslar over golvet. Trefat med graut, brød, flatbrød, kniv
    og ei måla ølbolle, sett ovanfrå. Sjå benk() og kubbestol() for seta rundt."""
    W, H = 4 * 16 + 8, 2 * 16 + 4
    L = Lerret(W, H)
    _bordplate(L, 4, W - 5, 1, H - BORD_HOGD - 1, "x")                  # plata: rad 1 til 26
    _bordbein(L, 4, W - 5, H - BORD_HOGD + 3, H - 2)
    _paa_bordet(L, (_flatbrod, 14, 7), (_fat, 26, 16), (_brod, 40, 7), (_kniv, 46, 11, "x"), (_fat, 49, 21), (_olbolle, 60, 12))
    omriss(L)
    return L


def langbord_staande():
    """Langbord av furu, ståande (på langs nedover), 2 x 4 fliser, same plate og same ting."""
    W, H = 2 * 16 + 8, 4 * 16 + 2
    L = Lerret(W, H)
    _bordplate(L, 4, W - 5, 1, H - BORD_HOGD - 1, "y")
    _bordbein(L, 4, W - 5, H - BORD_HOGD + 3, H - 2)
    _paa_bordet(L, (_flatbrod, 13, 7), (_brod, 26, 17), (_kniv, 29, 21, "y"), (_fat, 14, 28), (_fat, 23, 41), (_olbolle, 14, 50))
    omriss(L)
    return L


def benk(n=4):
    """Liggjande benk av furu, n fliser lang, i standardperspektivet: setet er ein tjukk planke sett
    ovanfrå (10 pikslar toppflate), framkanten 2 pikslar og korte bein 3, til saman SETE_HOGD."""
    W, H = n * 16 + 8, 18
    L = Lerret(W, H)
    x0, x1 = 5, W - 6
    for y in range(2, 12):
        for x in range(x0, x1 + 1): L.p(x, y, "c" if y == 2 else "q" if y == 11 else "C")
    for i in range(n * 3):                                         # årer: korte strekar på langs
        ax, ay = x0 + 3 + int(h(i, 1, 43) * (x1 - x0 - 8)), 4 + int(h(i, 2, 43) * 6)
        for k in range(3 + int(h(i, 3, 43) * 4)): L.p(ax + k, ay, "c")
    for i in range(n):                                             # kvister
        L.p(x0 + 6 + int(h(i, 4, 43) * (x1 - x0 - 12)), 5 + int(h(i, 5, 43) * 4), "A")
    for y in range(2, 12): L.p(x0, y, "q"); L.p(x1, y, "A")
    for x in range(x0, x1 + 1): L.p(x, 12, "c"); L.p(x, 13, "A")
    L.p(x0, 12, "C"); L.p(x1, 12, "A")
    for xb in [x0 + 2, x1 - 3] + ([W // 2 - 1] if n > 2 else []):
        for y in range(14, 17): L.p(xb, y, "c"); L.p(xb + 1, y, "a")
    omriss(L)
    return L


def benk_staande(n=4):
    """Ståande benk (på langs nedover), n fliser lang. Same planke, sett frå enden."""
    W, H = 16 + 8, n * 16 + 4
    L = Lerret(W, H)
    x0, x1 = 8, 15
    ybak, yfram = 1, H - 10                                        # setet: golv 2 til n*16-3, lyft 5
    for y in range(ybak, yfram + 1):
        for x in range(x0, x1 + 1):
            L.p(x, y, "q" if x == x0 else "A" if x == x1 else "C")
    for i in range(n * 2):                                         # årer: korte strekar på langs
        ax, ay = x0 + 2 + int(h(i, 1, 44) * 4), ybak + 3 + int(h(i, 2, 44) * (yfram - ybak - 8))
        for k in range(3 + int(h(i, 3, 44) * 3)): L.p(ax, ay + k, "c")
    for x in range(x0, x1 + 1): L.p(x, ybak, "q")
    for x in range(x0, x1 + 1): L.p(x, yfram + 1, "c"); L.p(x, yfram + 2, "A")
    for xb in (x0, x1 - 1):
        for y in range(yfram + 3, yfram + 7): L.p(xb, y, "c" if xb == x0 else "A"); L.p(xb + 1, y, "a")
    for y in range(ybak + 2, yfram + 1): L.p(x1 + 1, y, "a")                  # skuggesida under planken
    omriss(L)
    return L


RETNINGAR = {"ned": (0, -1), "opp": (0, 1), "venstre": (1, 0), "hogre": (-1, 0)}


def kubbestol(retning):
    """Kubbestol i standardperspektivet: ein hol stokk med rundt sete (ein brei oval sett ovanfrå,
    med lys framkant og årringar), og ryggen er resten av stokkveggen som går opp bak den som sit
    og bøyer seg rundt sidene. retning er den vegen den som sit, ser (ned, opp, venstre, høgre), så
    ryggen står på motsett side. 1 x 1 flis, setet er SETE_HOGD pikslar over golvet, midt på
    golvpunktet til figuren (rad H-5). Teikna med fast tone per flate (cel-skugge): toppen lysast,
    flata mot venstre lys, mot oss mellomtone, mot høgre skugge."""
    W, H = 16 + 8, 26
    L = Lerret(W, H)
    cx, base, K = 12, H - 5, 0.42                          # K: kor mykje djupna blir trykt saman
    R, RI = 7.5, 5.5                                       # radius på stokken og inni ryggen
    bx, bd = RETNINGAR[retning]                            # ryggen står mot (bx, bd) frå midten

    def rygg(X, D):
        r = math.hypot(X, D)
        if r > R or r < RI: return 0
        d = (X * bx + D * bd) / r
        return 0 if d < -0.2 else round(2 + 4 * max(0, d))  # høgast midt bak, lågare ut mot sidene

    def fast(X, D, Z):
        r = math.hypot(X, D)
        if r > R or Z < 0: return False
        if Z < SETE_HOGD: return True
        return Z < SETE_HOGD + rygg(X, D)

    vox = [(Z, D, X) for Z in range(0, SETE_HOGD + 11) for D in range(-8, 9) for X in range(-8, 9) if fast(X, D, Z)]
    vox.sort()
    for Z, D, X in vox:
        px, py = cx + X, base - Z + round(D * K)
        r = math.hypot(X, D) or 1
        if not fast(X, D, Z + 1):
            c = "q"                                         # kanten øvst på ryggen er lysast
            if Z == SETE_HOGD - 1:                          # setet, i skugge inntil ryggen
                c = "c" if any(fast(X + dx, D + dd, Z + 1) for dx, dd in ((0, -1), (-1, 0), (1, 0), (0, -2))) else "C"
                if c == "C" and D > 0 and r > R - 1.3: c = "q"  # framkanten av setet fangar lyset
        else:
            nx, nd = X / r, D / r
            if r < (R + RI) / 2: nx, nd = -nx, -nd          # innsida av ryggen
            lys = -nx * 0.8 + nd * 0.4
            c = "C" if lys > 0.55 else "c" if lys > 0 else "A" if lys > -0.6 else "a"
        L.p(px, py, c)
    for a in range(0, 360, 20):                             # årringar på setet: ein brei oval ring midt på
        x, y = cx + round(math.cos(math.radians(a)) * 2.6), base - SETE_HOGD + 1 + round(math.sin(math.radians(a)) * 2.6 * K)
        if L.get(x, y) == "C": L.p(x, y, "c")
    omriss(L)
    return L


def rokk():
    """Rokk (spinnehjul, etter rokken frå Nesset) i standardperspektivet: benken er ein planke sett
    ovanfrå med tre korte bein og trøda under, hjulet står opp over benken (ein stor, litt brei oval)
    med eiker og nav, og rokkehovudet med spole og garn står til venstre. 1 flis."""
    W, H = 16 + 8, 30
    L = Lerret(W, H)
    cx, cy, rx, ry = 14, 10, 7.5, 7
    for y in range(17, 22):                                                 # benken sett ovanfrå (bak hjulet)
        for x in range(3, 21): L.p(x, y, "c" if y == 17 else "q" if y == 21 else "C")
    for x in range(3, 21): L.p(x, 22, "A")
    L.p(3, 21, "C"); L.p(20, 22, "a")
    for (x, y0, dx) in ((4, 23, -1), (19, 23, 1)):                          # beina framme
        for k in range(4): L.p(x + (dx if k >= 2 else 0), y0 + k, "T" if dx < 0 else "t")
    for k in range(2): L.p(12, 23 + k, "t")                                 # beinet bak
    for x in range(8, 15): L.p(x, 25, "c"); L.p(x, 26, "A")                # trøda
    for y in range(cy, 22): L.p(cx, y, "U"); L.p(cx + 1, y, "t")            # hjulstolpen, ned i benken
    for a in range(0, 360, 2):                                              # felgen: to pikslar tjukk
        for k in (0, 1):
            x = cx + round(math.cos(math.radians(a)) * (rx - k)); y = cy + round(math.sin(math.radians(a)) * (ry - k))
            lys = math.cos(math.radians(a + 135))
            L.p(x, y, ("E" if lys > 0.2 else "R") if k == 0 else ("U" if lys > -0.2 else "T"))
    for a in range(0, 360, 45):                                             # eiker, dreidde
        for k in range(1, 6):
            x = cx + round(math.cos(math.radians(a + 22)) * k * (rx - 2) / 5); y = cy + round(math.sin(math.radians(a + 22)) * k * (ry - 2) / 5)
            L.p(x, y, "U" if math.sin(math.radians(a + 22)) < 0.3 else "T")
    for (x, y, c) in ((cx, cy, "Y"), (cx - 1, cy, "T"), (cx + 1, cy, "t"), (cx, cy - 1, "U"), (cx, cy + 1, "t")): L.p(x, y, c)
    # rokkehovudet framfor hjulkanten: to stolpar med spolen imellom, garn på spolen
    for y in range(11, 19): L.p(3, y, "U"); L.p(7, y, "T")
    for x in range(3, 8): L.p(x, 12, "D"); L.p(x, 13, "D"); L.p(x, 14, "d")
    L.p(3, 10, "T"); L.p(7, 10, "t")
    for k in range(3): L.p(8 + k, 12 - k, "k")                              # drivreima til hjulet
    omriss(L)
    return L


# ---- Stabburet på Åsen (runde 28) ----
# Matbua på garden: kornbingar, tønner og kaggar, flatbrød i stablar, spekemat som heng under
# taket, ei glugge og ein stige opp til loftet. Ingen eldstad: lyset kjem gjennom døra og glugga.
# Same furu som i stova, men grovare og meir slite (bruksting, ikkje stasmøblar).

def _plankevegg(L, x0, x1, y0, y1, hogd=5):
    """Framside av liggjande plankar: lys kant øvst på kvar planke, skugge nedst, korte årer."""
    for y in range(y0, y1 + 1):
        k = (y - y0) % hogd
        for x in range(x0, x1 + 1): L.p(x, y, "C" if k == 0 else "A" if k == hogd - 1 else "c")
    for i in range((x1 - x0) * (y1 - y0) // 40):
        ax, ay = x0 + 2 + int(h(i, 5, 51) * (x1 - x0 - 6)), y0 + 1 + int(h(i, 6, 51) * (y1 - y0 - 2))
        if (ay - y0) % hogd in (0, hogd - 1): continue
        for k in range(2 + int(h(i, 7, 51) * 3)):
            if L.get(ax + k, ay) == "c": L.p(ax + k, ay, "A")


def kornbinge():
    """Kornbingar langs veggen: ei stor kiste av plankar delt i tre rom med stolpar. Det venstre
    romet står ope med korn, det midtre er lukka, og det høgre er ope med mjøl og ei trøskjeppe.
    Loka på dei opne romma står opp mot veggen. 3 fliser breitt."""
    W, H = 3 * 16 + 8, 38
    L = Lerret(W, H)
    x0, x1 = 3, W - 4
    ytopp, yfram, ybotn = 9, 17, H - 4                   # toppflata 9 til 16, framsida 17 til H-4
    rom = [(x0 + 3, 19), (22, 34), (37, x1 - 3)]
    # framsida og stolpane
    _plankevegg(L, x0, x1, yfram, ybotn, 5)
    for sx in (x0, 19, 34, x1 - 2):
        for y in range(ytopp, ybotn + 1): L.p(sx, y, "q" if y == ytopp else "C"); L.p(sx + 1, y, "c"); L.p(sx + 2, y, "A")
    for x in range(x0, x1 + 1): L.p(x, ybotn, "a")
    for sx in (x0, x1 - 2):                                                          # føter
        for y in range(ybotn + 1, H - 1): L.p(sx, y, "c"); L.p(sx + 1, y, "A"); L.p(sx + 2, y, "a")
    # toppflata: kanten framme fangar lyset
    for x in range(x0, x1 + 1): L.p(x, yfram - 1, "q"); L.p(x, yfram, "C")
    # det lukka romet i midten: lok av to plankar
    for y in range(ytopp, yfram - 1):
        for x in range(rom[1][0], rom[1][1] + 1): L.p(x, y, "q" if y == ytopp else "C" if y != ytopp + 3 else "c")
    for x in range(rom[1][0] + 4, rom[1][0] + 9): L.p(x, ytopp + 2, "c")
    # dei opne romma: innsida bak i skugge, så kornet eller mjølet
    for (a, b), (lys, mid, mork) in [(rom[0], ("D", "d", "Z")), (rom[2], ("w", "k", "x"))]:
        for x in range(a, b + 1):
            L.p(x, ytopp, "a"); L.p(x, ytopp + 1, "A")
            for y in range(ytopp + 2, yfram - 1): L.p(x, y, mid)
        # haugen: toppen fangar lyset oppe til venstre, skugge mot høgre og inntil framkanten
        for (y, ha, hb) in ((ytopp + 2, a + 3, b - 4), (ytopp + 3, a + 1, b - 2), (ytopp + 4, a + 1, b - 3), (ytopp + 5, a + 2, b - 5)):
            for x in range(ha, hb + 1): L.p(x, y, lys if x < (ha + hb) // 2 + 1 else mid)
        for x in range(a, b + 1): L.p(x, yfram - 2, mork if x > (a + b) // 2 else mid)
        for i in range(5):                                                           # korn: små klumpar
            gx, gy = a + 2 + int(h(i, a, 52) * (b - a - 5)), ytopp + 3 + int(h(i, a, 53) * 3)
            if lys == "D": L.p(gx, gy, mork); L.p(gx + 1, gy, mid)
        # loket står opp mot veggen bak romet
        for y in range(0, ytopp):
            for x in range(a - 1, b + 2): L.p(x, y, "C" if x < a + 1 else "A" if x > b else "c")
        for x in range(a - 1, b + 2): L.p(x, 0, "q"); L.p(x, ytopp - 1, "a")
        for x in range(a + 3, a + 8): L.p(x, 4, "A")
        L.p(a + 1, 6, "X"); L.p(b, 6, "X")                                           # hengsler
    # trøskjeppe i mjølet
    for (x, y, c) in [(41, 12, "T"), (42, 12, "U"), (43, 12, "U"), (44, 12, "T"), (42, 13, "t"), (43, 13, "t"),
                      (45, 11, "U"), (46, 10, "U"), (47, 9, "T")]: L.p(x, y, c)
    omriss(L)
    return L


def tonne():
    """Ståande tønne av stavar med gjordar av vidje, lok og ein stein oppå (sylteflesk i lake). 1 flis."""
    W, H = 16 + 8, 30
    L = Lerret(W, H)
    cx, ytopp, ybotn = 11, 7, H - 3
    for y in range(ytopp, ybotn + 1):
        t = (y - ytopp) / (ybotn - ytopp)
        b = 6 + round(1.4 * (1 - (2 * t - 1) ** 2))                                   # bukar ut på midten
        for x in range(cx - b, cx + b + 1):
            d = (x - (cx - b)) / (2 * b)
            c = "C" if d < 0.3 else "c" if d < 0.72 else "A" if d < 0.92 else "a"
            if (x - cx) % 3 == 0 and 0.15 < d < 0.85 and c != "C": c = "A" if c == "c" else c   # fugene mellom stavane
            L.p(x, y, c)
    for gy in (ytopp + 3, ytopp + 10, ybotn - 3):                                    # gjordar
        for x in range(cx - 8, cx + 9):
            if L.get(x, gy) != ".": L.p(x, gy, "U" if x < cx - 2 else "T" if x < cx + 4 else "t")
            if L.get(x, gy + 1) != ".": L.p(x, gy + 1, "t")
    for y in range(ytopp - 3, ytopp + 1):                                            # lokket sett ovanfrå
        for x in range(cx - 6, cx + 7):
            if ((x - cx) / 6.5) ** 2 + ((y - ytopp + 1.5) / 2.2) ** 2 <= 1: L.p(x, y, "q" if y < ytopp - 1 and x < cx else "C")
    for x in range(cx - 6, cx + 7): L.p(x, ytopp + 1, "a")
    for y in range(ytopp - 6, ytopp - 1):                                            # steinen
        for x in range(cx - 3, cx + 4):
            if ((x - cx) / 3.5) ** 2 + ((y - ytopp + 3.5) / 2.6) ** 2 <= 1: L.p(x, y, "G" if x < cx and y < ytopp - 3 else "g")
    omriss(L)
    return L


def kagge():
    """Liggjande kagge på ein trebukk, sett frå sida: stavar på langs, to gjordar, botnane som
    smale ovalar i kvar ende og ein tapp av tre i den venstre. 1 flis."""
    W, H = 16 + 8, 24
    L = Lerret(W, H)
    x0, x1, y0, y1 = 4, 19, 4, 15
    for x in range(x0, x1 + 1):
        u = (x - x0) / (x1 - x0)
        b = round(1.2 * (1 - (2 * u - 1) ** 2))                                       # bukar ut på midten
        for y in range(y0 - b, y1 + b + 1):
            t = (y - (y0 - b)) / (y1 - y0 + 2 * b)
            c = "q" if t < 0.12 else "C" if t < 0.35 else "c" if t < 0.72 else "A" if t < 0.9 else "a"
            if (y - y0) % 4 == 2 and 0.15 < t < 0.85: c = "A" if c in "Cc" else "a"     # fugene mellom stavane
            L.p(x, y, c)
    for gx in (7, 16):                                                               # gjordar
        for y in range(y0 - 1, y1 + 2):
            if L.get(gx, y) != ".": L.p(gx, y, "U" if y < y0 + 4 else "T" if y < y1 - 1 else "t"); L.p(gx + 1, y, "t")
    for y in range(y0, y1 + 1):                                                      # botnane
        L.p(x0 - 1, y, "C" if y < y0 + 5 else "c"); L.p(x0, y, "A")
        L.p(x1 + 1, y, "A")
    L.p(x0 - 2, 10, "U"); L.p(x0 - 3, 10, "T"); L.p(x0 - 3, 11, "t"); L.p(x0 - 2, 11, "t")   # tappen
    for (xa, xb) in ((5, 9), (14, 18)):                                              # bukken: to krakkar
        for x in range(xa, xb + 1): L.p(x, 17, "C" if x < xa + 2 else "c"); L.p(x, 18, "A")
        for y in range(19, H - 1): L.p(xa, y, "c"); L.p(xa + 1, y, "a"); L.p(xb - 1, y, "c"); L.p(xb, y, "a")
    omriss(L)
    return L


def _stabel(L, cx, ybotn, n):
    """Ein stabel flatbrød sett frå sida: n tynne leivar oppå kvarandre (lyse og brune kantar
    annakvar), toppen ein lys oval med brune flekker."""
    rx = 5
    for k in range(n):
        y = ybotn - k
        for x in range(cx - rx, cx + rx + 1):
            d = (x - (cx - rx)) / (2 * rx)
            if k % 2: c = "U" if d < 0.75 else "T"
            else: c = "q" if d < 0.3 else "C" if d < 0.75 else "c"
            L.p(x, y, c)
    ytopp = ybotn - n
    for dy in range(-2, 3):
        for x in range(cx - rx, cx + rx + 1):
            if ((x - cx) / (rx + 0.5)) ** 2 + (dy / 1.7) ** 2 <= 1: L.p(x, ytopp + dy, "q" if dy < 1 else "C")
    for dx, dy in ((-2, -1), (1, -1), (3, 0), (-1, 1)): L.p(cx + dx, ytopp + dy, "U")


def flatbrodstabel():
    """Låg lagerbenk med tre stablar flatbrød i ulik høgd, med luft mellom. 2 fliser breitt."""
    W, H = 2 * 16 + 8, 30
    L = Lerret(W, H)
    for y in range(17, 21):                                                          # benkeplata
        for x in range(2, W - 2): L.p(x, y, "q" if y == 17 else "C" if y < 19 else "c")
    for x in range(2, W - 2): L.p(x, 21, "A"); L.p(x, 22, "a")
    for xb in (4, W - 7):
        for y in range(23, H - 1): L.p(xb, y, "c"); L.p(xb + 1, y, "A"); L.p(xb + 2, y, "a")
    _stabel(L, 9, 18, 8); _stabel(L, 31, 18, 5); _stabel(L, 20, 19, 12)
    for (x0, x1) in ((15, 15), (26, 26)):                                            # skugge på plata mellom stablane
        for x in range(x0, x1 + 1): L.p(x, 18, "c")
    omriss(L)
    return L


def _skinke(L, cx, y0, y1):
    """Spekeskinke (fenalår) som heng i eit band: smal oppe ved knoken, brei nede, feittkant til venstre."""
    for y in range(y0, y1 + 1):
        t = (y - y0) / (y1 - y0)
        b = round(1 + 4.2 * math.sin(min(1, t * 1.25) * math.pi / 2)) if t < 0.9 else round(5 - (t - 0.9) * 30)
        for x in range(cx - b, cx + b + 1):
            d = (x - (cx - b)) / max(1, 2 * b)
            L.p(x, y, "k" if d < 0.15 else "E" if d < 0.4 else "R" if d < 0.8 else "r")
    for y in range(y0 - 2, y0 + 1): L.p(cx, y, "w"); L.p(cx + 1, y, "W")             # knoken
    L.p(cx - 1, y0 + 4, "x")


def _polse(L, x, y0, lengd, boge):
    """Ei pølse som heng i ein boge frå ein hyssing: raud med lys kant til venstre."""
    for k in range(lengd):
        dx = round(boge * math.sin(k / lengd * math.pi))
        L.p(x + dx, y0 + k, "E"); L.p(x + dx + 1, y0 + k, "R"); L.p(x + dx + 2, y0 + k, "r")
    L.p(x + 1, y0 + lengd, "r")


def spekemat():
    """Spekemat som heng i hyssingar frå takbjelken: to fenalår, pølser i boge og eit band med
    tørka urter. 3 fliser breitt og 2 høgt (står med botnen i rad 1, bjelken ligg øvst i rad 0),
    så maten heng ned i rommet og ikkje i lufta over veggen."""
    W, H = 3 * 16 + 8, 46
    L = Lerret(W, H)
    for (x, y0) in ((12, 16), (21, 16), (24, 16), (30, 16), (41, 16)):               # hyssingar frå bjelken
        for y in range(y0, y0 + 5): L.p(x, y, "p")
        L.p(x, y0, "P")                                                               # knuten rundt bjelken
    _skinke(L, 12, 21, 37)
    _polse(L, 20, 21, 12, 2); _polse(L, 23, 20, 10, -1)
    _polse(L, 29, 21, 14, 1)
    _skinke(L, 41, 21, 35)
    for (x, y) in ((33, 17), (34, 17)):                                              # eit band med urter
        for k in range(11): L.p(x + (k % 3 == 0), y + k, "i" if x == 33 else "e")
    L.p(33, 28, "I"); L.p(35, 27, "e")
    omriss(L)
    return L


def stige():
    """Stige opp til loftet: to vangar og trinn, opp gjennom ei luke i taket der det er mørkt.
    Står mot bakveggen, 1 flis breitt, og går ut over veggen og taket."""
    W, H = 16 + 8, 54
    L = Lerret(W, H)
    # luka: skoren inn i taket ved takbjelken (bjelken ligg 20 til 26 pikslar ned i biletet), med
    # kanten av loftsgolvet (plankar sett nedanfrå) rundt og mørkt rom over
    for y in range(12, 21):
        for x in range(2, W - 2): L.p(x, y, "N")
    for x in range(0, W): L.p(x, 21, "c"); L.p(x, 22, "A"); L.p(x, 23, "a")
    for x in (0, 1, W - 2, W - 1):
        for y in range(12, 21): L.p(x, y, "A" if x < 2 else "a")
    for x in range(0, W): L.p(x, 12, "C")                                            # kanten på luka mot taket
    for (x, y) in ((5, 18), (6, 18), (7, 17), (8, 17), (9, 18)): L.p(x, y, "P")      # ein sekk oppe på loftet
    L.p(6, 17, "p"); L.p(7, 16, "p")
    # vangane og trinna
    for y in range(15, H - 1):
        L.p(6, y, "C"); L.p(7, y, "c"); L.p(16, y, "c"); L.p(17, y, "A")
    for ty in range(19, H - 3, 6):
        for x in range(8, 16): L.p(x, ty, "q" if x < 12 else "C"); L.p(x, ty + 1, "A")
    for x in (6, 7, 16, 17): L.p(x, H - 1, "a")
    omriss(L)
    return L


def takbjelke():
    """Takbjelke tvers over stabburet øvst på bakveggen, med taket (mørke plankar sett nedanfrå)
    bak. Spekematen heng i han, og luka til loftet er skoren inn ved han. 10 fliser breitt (heile
    rommet med veggane), står i rad 0 og går 12 pikslar opp over veggen."""
    W, H = 10 * 16 + 8, 16 + 12
    L = Lerret(W, H)
    for y in range(0, 10):                                                           # taket: mørke plankar
        for x in range(4, W - 4): L.p(x, y, "a" if (x - 4) % 12 == 0 else "N")
    for x in range(4, W - 4):                                                        # bjelken: rund stokk
        L.p(x, 10, "C"); L.p(x, 11, "c"); L.p(x, 12, "c"); L.p(x, 13, "c"); L.p(x, 14, "A"); L.p(x, 15, "A"); L.p(x, 16, "a")
        if (x * 7) % 23 == 0: L.p(x, 12, "A"); L.p(x + 1, 13, "A")                  # kvistar
        if (x * 5) % 31 == 0: L.p(x, 11, "q")
    omriss(L)
    return L


def glugge():
    """Glugge i tømmerveggen: ei lita, firkanta opning med dagslys, to jernstenger og ein lem
    som heng open til venstre. Står på veggen (rad 0). 1 flis."""
    W, H = 16 + 8, 16
    L = Lerret(W, H)
    for y in range(3, 13):                                                           # karmen
        for x in range(9, 20): L.p(x, y, "T" if x == 9 or y == 3 else "t" if x == 19 or y == 12 else "U")
    for y in range(4, 12):                                                           # dagslyset
        for x in range(10, 19): L.p(x, y, "l" if y < 9 else "w")
    for x in range(10, 19): L.p(x, 4, "w")
    for x in (13, 16):
        for y in range(4, 12): L.p(x, y, "V")
    for y in range(4, 12): L.p(10, y, "D")                                           # lyset fell inn langs karmen
    for y in range(3, 14):                                                           # lemmen
        for x in range(2, 8): L.p(x, y, "C" if x == 2 else "A" if x == 7 else "c")
    for x in range(2, 8): L.p(x, 7, "A"); L.p(x, 8, "C")
    L.p(8, 5, "X"); L.p(8, 10, "X")
    omriss(L)
    return L


def _kasse(L, x0, x1, y0, djup, front, lokh, open_, F, rose, inni=None):
    """Kiste eller skrin i standardperspektivet (runde 59). x0..x1 er kassa (loket stikk 1 piksel ut
    på kvar side). Lukka: loket er ei stor toppflate (djup rader frå y0), så kanten på loket, ei
    skuggelinje og ei kort framside (front rader) med lås, og sokkelen. Ope: loket er slått opp
    bakover (lokh rader av innsida syner frå y0), og kassa er open ovanfrå med kant rundt, innvegg
    bak og botn. F: fargane, rose: motivet på loket (strengar), inni: teiknar innhaldet."""
    lx0, lx1 = x0 - 1, x1 + 1
    band = F.get("band", ())
    if not open_:
        yt0, yt1 = y0, y0 + djup - 1                                         # toppflata på loket
        for y in range(yt0, yt1 + 1):
            for x in range(lx0, lx1 + 1): L.p(x, y, F["top"])
        for x in range(lx0, lx1 + 1): L.p(x, yt0, F["topbak"]); L.p(x, yt1, F["toplys"])
        for y in range(yt0, yt1 + 1): L.p(lx0, y, F["toplys"]); L.p(lx1, y, F["topbak"])
        if rose: _stempel(L, (x0 + x1 + 1) // 2 - len(rose[0]) // 2, yt0 + (djup - len(rose)) // 2, rose)
        for bx in band:                                                         # jernband over loket
            for y in range(yt0, yt1 + 1): L.p(bx, y, "X" if (y - yt0) % 4 else "s")
        for x in range(lx0, lx1 + 1): L.p(x, yt1 + 1, F["front"])                # kanten på loket
        L.p(lx0, yt1 + 1, F["frontlys"]); L.p(lx1, yt1 + 1, F["mork"])
        for bx in band: L.p(bx, yt1 + 1, "V")
        for (x, y) in ((lx0, yt0), (lx1, yt0), (lx0, yt1), (lx1, yt1), (lx0, yt1 + 1), (lx1, yt1 + 1)): L.p(x, y, "V")   # hjørnebeslag
        for x in range(x0, x1 + 1): L.p(x, yt1 + 2, F["skugge"])                # skugge under loket
        yf = yt1 + 3
    else:
        ylok1 = y0 + lokh - 1                                                   # loket slått opp bak
        for y in range(y0, ylok1 + 1):
            for x in range(lx0, lx1 + 1):
                kant = x in (lx0, lx1) or y == y0
                L.p(x, y, (F["toplys"] if x == lx0 or y == y0 else F["mork"]) if kant else F["lokinne"])
        for x in range(lx0 + 1, lx1): L.p(x, ylok1, F["lokkant"])
        for y in range(y0 + 1, ylok1 + 1): L.p(lx0 + 1, y, F["lokkant"]); L.p(lx1 - 1, y, F["lokkant"])
        if F.get("lokrose"): _stempel(L, (x0 + x1 + 1) // 2 - len(F["lokrose"][0]) // 2, y0 + 1 + (lokh - 2 - len(F["lokrose"])) // 2, F["lokrose"])
        yb = ylok1 + 1                                                          # kanten bak
        yfr = yb + djup - 1                                                     # kanten framme
        for x in range(x0, x1 + 1): L.p(x, yb, F["top"]); L.p(x, yfr, F["toplys"])
        for y in range(yb, yfr + 1): L.p(x0, y, F["toplys"]); L.p(x1, y, F["topbak"])
        for y in range(yb + 1, yfr):                                            # innsida
            iy = y - yb - 1                                                     # innveggen bak (3 rader), så botnen
            for x in range(x0 + 1, x1):
                L.p(x, y, (F["innmork"] if iy == 0 else F["innvegg"]) if iy < 3 else F["botnskugge"] if iy == 3 or x < x0 + 3 else F["botn"])
            L.p(x0 + 1, y, F["innmork"]); L.p(x1 - 1, y, F["innlys"])          # sideveggene: venstre i skugge, høgre i lys
        if inni: inni(L, x0 + 2, x1 - 2, yb + 2, yfr - 1)
        for bx in band: L.p(bx, yb, "X"); L.p(bx, yfr, "X")
        for (x, y) in ((x0, yb), (x1, yb), (x0, yfr), (x1, yfr)): L.p(x, y, "V")
        yf = yfr + 1
    for y in range(yf, yf + front):                                             # framsida
        for x in range(x0, x1 + 1): L.p(x, y, F["front"])
        L.p(x0, y, F["frontlys"]); L.p(x1, y, F["mork"])
    for bx in band:
        for y in range(yf, yf + front): L.p(bx, y, "V" if (y - yf) % 2 else "X")
    for (x, y) in ((x0, yf), (x1, yf), (x0, yf + front - 1), (x1, yf + front - 1)): L.p(x, y, "V")
    cx = (x0 + x1) // 2
    for (dx, dy, c) in F.get("laas", ()): L.p(cx + dx, yf + dy, c)
    for (dx, dy, c) in F.get("prikk", ()): L.p(cx + dx, yf + dy, c)
    for x in range(lx0, lx1 + 1): L.p(x, yf + front, F["sokkel"])                # sokkelen
    return yf + front


KISTE_ROSE = [".I..I.",
              "iEwwEi",
              "iEyyEi",
              ".EEEE.",
              "i.ii.i"]
KISTE_F = {"top": "Q", "topbak": "z", "toplys": "G", "front": "m", "frontlys": "z", "mork": "b",
           "skugge": "u", "sokkel": "t", "band": (8, 15),
           "lokinne": "R", "lokkant": "E", "lokrose": ["iEyyEi"],
           "innvegg": "A", "innmork": "a", "innlys": "c", "botn": "c", "botnskugge": "A",
           "laas": [(-1, 0, "Y"), (0, 0, "Y"), (1, 0, "Y"), (2, 0, "Z"), (-1, 1, "Y"), (0, 1, "v"), (1, 1, "v"), (2, 1, "Z"),
                    (-1, 2, "Z"), (0, 2, "Y"), (1, 2, "Z"), (2, 2, "Z")],
           "prikk": [(-4, 1, "E"), (-3, 2, "y"), (-4, 3, "E"), (5, 1, "E"), (4, 2, "y"), (5, 3, "E")]}


def kiste(open_=False):
    """Kista på karta (flisa K): ei blåmåla kiste med rosemaling og jernband, i standardperspektivet
    (STILGUIDE.md, som i FF6): loket er ei stor toppflate (10 pikslar) med ei rose og to jernband,
    framsida er kort (4 pikslar) med lås. Den opne kista har loket slått opp bakover (raud innside med
    rosemaling) og syner innsida ovanfrå: kant rundt, innvegg i skugge og ein tom botn.
    1 flis, står nedst i flisa (sjå kisteVed i motor.js)."""
    W, H = 16 + 8, 19 + (2 if open_ else 0)
    L = Lerret(W, H)
    if open_: _kasse(L, 6, 17, 1, 10, 4, 4, True, KISTE_F, None)
    else: _kasse(L, 6, 17, 1, 10, 4, 0, False, KISTE_F, KISTE_ROSE)
    omriss(L)
    return L


def _papir(L, x0, x1, y0, y1):
    """Gulna papir og eit brev med segl i skrinet, sett ovanfrå."""
    for y in range(y0, y1 + 1):
        for x in range(x0, x1 + 1): L.p(x, y, "p" if y < y1 else "P")
    for x in range(x0 + 1, x1 - 1): L.p(x, y0 + 1, "P")
    L.p(x0, y0, "w"); L.p(x0 + 1, y0, "w"); L.p(x1 - 1, y1 - 1, "R"); L.p(x1, y1 - 1, "r")


SKRIN_F = {"top": "U", "topbak": "T", "toplys": "U", "front": "T", "frontlys": "U", "mork": "t", "skugge": "t",
           "sokkel": "t", "lokinne": "R", "lokkant": "T", "lokrose": ["mEyyEm"],
           "innvegg": "t", "innmork": "t", "innlys": "U", "botn": "T", "botnskugge": "t",
           "laas": [(0, 0, "X"), (1, 0, "X"), (0, 1, "v"), (1, 1, "V")]}


def skrin():
    """Skrinet etter far i stova: eit lite skrin av mørk bjørk med jernbeslag i standardperspektivet:
    loket står ope bakover og har ei rosemålt innside, og gulna papir ligg øvst i skrinet, sett
    ovanfrå. Framsida er kort. Står på golvet, 1 flis (kiste med bilete i kartet, sjå kister i data.js)."""
    W, H = 16 + 8, 16
    L = Lerret(W, H)
    _kasse(L, 6, 17, 1, 7, 3, 4, True, SKRIN_F, None, _papir)
    omriss(L)
    return L


def sekker():
    """To mjølsekker av lerret, knytte oppe med hyssing og runde nede, den høgre litt bak. 1 flis."""
    W, H = 16 + 8, 24
    L = Lerret(W, H)
    for (cx, y0, b) in ((15, 7, 5), (8, 5, 6)):                                       # den bakre først
        yb = H - 3
        for y in range(y0, yb + 1):
            t = (y - y0) / (yb - y0)
            bb = 1 if t < 0.08 else round(b * min(1, 0.45 + t * 1.6)) - (1 if t > 0.92 else 0)
            for x in range(cx - bb, cx + bb + 1):
                d = (x - (cx - bb)) / max(1, 2 * bb)
                L.p(x, y, "p" if d < 0.4 and t > 0.1 else "P" if d < 0.75 else "K")
        for x in range(cx - 1, cx + 2): L.p(x, y0 + 2, "T")                          # hyssingen
        L.p(cx - 1, y0 - 1, "p"); L.p(cx, y0 - 1, "P"); L.p(cx, y0 - 2, "p")          # snipp over knuten
        L.p(cx + 2, y0 + 7, "P"); L.p(cx + 3, y0 + 8, "P"); L.p(cx - 1, y0 + 10, "P")    # bretter i lerretet
    omriss(L)
    return L


# ---- Prestegarden, kontoret og boksamlinga på Ekset (runde 7) ----
# Embetsmannsheimen skal sjå dansk og borgarleg ut ved sida av bondestova: mahogni,
# messing, kvite duker, kakkelomn og golvur i staden for grue og furu.

def panel(L, x0, y0, x1, y1, fyll="M", lys="O", mork="j"):
    """Fylling i eit møbel: mørk kant nede og til høgre, lys kant oppe og til venstre."""
    for y in range(y0, y1 + 1):
        for x in range(x0, x1 + 1):
            c = fyll
            if y == y0 or x == x0: c = lys
            if y == y1 or x == x1: c = mork
            L.p(x, y, c)


def kakkelomn():
    """Etasjeomn i støypejern på bein, med relieff, glør i ei luke og røyrpipe opp i veggen."""
    W, H = 16 + 8, 2 * 16 + 16
    L = Lerret(W, H)
    for y in range(0, 12): L.p(10, y, "V"); L.p(11, y, "X"); L.p(12, y, "V"); L.p(13, y, "v")     # røyr
    for x in range(5, 19): L.p(x, 12, "X"); L.p(x, 13, "V")                                           # krone
    for y in range(14, 26):                                                                           # øvre etasje
        for x in range(6, 18): L.p(x, y, "X" if x == 6 else "v" if x == 17 else "V")
    panel(L, 8, 16, 15, 23, "V", "X", "v")
    for x in range(4, 20): L.p(x, 26, "X"); L.p(x, 27, "v")                                           # hylle mellom
    for y in range(28, H - 4):                                                                        # nedre etasje
        for x in range(5, 19): L.p(x, y, "X" if x == 5 else "v" if x == 18 else "V")
    for y in range(31, 39):                                                                           # luke med glør
        for x in range(8, 16): L.p(x, y, "N" if y < 33 else "F" if (x + y) % 3 else "f")
    for x in range(8, 16): L.p(x, 30, "X"); L.p(x, 39, "v")
    for x in range(4, 20): L.p(x, H - 4, "X")
    for x in (6, 17):                                                                                 # bein
        for y in range(H - 3, H): L.p(x, y, "V")
    omriss(L)
    return L


def skatoll():
    """Skatoll (skrivekommode) i mahogni: skuffer nede, skråklaff med papir, skap med dører og krone.
    Ikkje høgare enn at krona held seg innanfor bakveggen."""
    W, H = 2 * 16 + 8, 2 * 16 + 8
    L = Lerret(W, H)
    for x in range(3, W - 3): L.p(x, 0, "O"); L.p(x, 1, "M"); L.p(x, 2, "j")                        # krone
    for y in range(3, 15):                                                                            # skap
        for x in range(5, W - 5): L.p(x, y, "J")
    panel(L, 7, 4, 18, 14); panel(L, 21, 4, 32, 14)
    L.p(18, 9, "Y"); L.p(21, 9, "Y")
    for y in range(15, 22):                                                                           # skråklaff
        for x in range(4 - (y - 15) // 4, W - 4 + (y - 15) // 4): L.p(x, y, "O" if y < 17 else "M")
    for (x, y) in [(10, 18), (11, 18), (12, 18), (13, 19), (26, 18), (27, 18)]: L.p(x, y, "p")          # papir
    L.p(30, 17, "b"); L.p(30, 16, "w")                                                                # blekkhus og fjørpenn
    for y in range(22, H - 3):                                                                        # skuffer
        for x in range(3, W - 3): L.p(x, y, "M")
    for sy in (22, 27, 32):
        for x in range(3, W - 3): L.p(x, sy, "O"); L.p(x, sy + 4, "j")
        L.p(12, sy + 2, "Y"); L.p(27, sy + 2, "Y")
    for x in range(3, W - 3): L.p(x, H - 3, "j")
    for x in (4, 5, W - 6, W - 5): L.p(x, H - 2, "J"); L.p(x, H - 1, "j")                          # føter
    omriss(L)
    return L


def golvur():
    """Golvur med rund urskive, messingpendel bak glas og krone, i mahogni."""
    W, H = 16 + 8, 2 * 16 + 8
    L = Lerret(W, H)
    for x in range(8, 16): L.p(x, 0, "Y")
    for x in range(5, 19): L.p(x, 1, "O"); L.p(x, 2, "J")
    for y in range(3, 17):                                                                            # hovudet med urskiva
        for x in range(4, 20): L.p(x, y, "M" if x > 5 else "O")
    for y in range(4, 16):
        for x in range(6, 18):
            if (x - 11.5) ** 2 + (y - 9.5) ** 2 <= 30: L.p(x, y, "w" if (x - 11.5) ** 2 + (y - 9.5) ** 2 < 20 else "Y")
    for (x, y) in [(11, 6), (11, 7), (11, 8), (11, 9), (12, 9), (13, 9), (14, 10)]: L.p(x, y, "b")      # visarar
    for y in range(17, H - 6):                                                                        # kassa
        for x in range(7, 17): L.p(x, y, "O" if x == 7 else "j" if x == 16 else "M")
    panel(L, 9, 19, 14, 31, "N", "J", "j")
    for y in range(20, 27): L.p(11, y, "Y")
    for y in range(26, 30):
        for x in range(10, 14): L.p(x, y, "y" if x < 12 else "Y")
    for y in range(H - 6, H):                                                                         # fot
        for x in range(5, 19): L.p(x, y, "O" if y == H - 6 else "M" if x < 17 else "j")
    omriss(L)
    return L


def sofa():
    """Empiresofa med svungne armlener i mahogni og grøn, stripete trekk, 3 fliser breitt."""
    W, H = 3 * 16 + 8, 30
    L = Lerret(W, H)
    for y in range(3, 16):                                                                            # rygg
        for x in range(6, W - 6):
            L.p(x, y, "I" if y < 5 else ("i" if (x // 3) % 2 else "e") if y < 14 else "e")
    for x in range(5, W - 5): L.p(x, 2, "O"); L.p(x, 3, "M")                                         # ramme øvst
    for y in range(16, 22):                                                                           # sete
        for x in range(8, W - 8): L.p(x, y, "I" if y == 16 else "i" if (x // 3) % 2 else "e")
    for x in range(5, W - 5): L.p(x, 22, "O"); L.p(x, 23, "M"); L.p(x, 24, "j")                     # framkant
    for (ax, retn) in [(3, 1), (W - 9, -1)]:                                                          # armlener
        for y in range(8, 24):
            for x in range(ax, ax + 6): L.p(x, y, "M" if 0 < x - ax < 5 else "O" if x == ax else "j")
        for x in range(ax - 1, ax + 7): L.p(x, 7, "O"); L.p(x, 8, "M")
        L.p(ax + 2, 10, "Y"); L.p(ax + 3, 10, "Y")
    for x in (6, 7, W - 8, W - 7):                                                                    # føter
        for y in range(25, H - 1): L.p(x, y, "J")
    omriss(L)
    return L


def spisebord():
    """Spisebord med kvit duk, tallerkar og lysestake, to stolar med rygg bak, 2 x 2 fliser."""
    W, H = 2 * 16 + 8, 2 * 16 + 10
    L = Lerret(W, H)
    for cx in (12, 28):                                                                               # stolryggar
        for y in range(0, 12):
            for x in range(cx - 5, cx + 5): L.p(x, y, "O" if x == cx - 5 else "j" if x == cx + 4 else "M")
        for y in range(3, 9):
            for x in range(cx - 2, cx + 2): L.p(x, y, "J")
    for y in range(12, 28):                                                                           # duken
        for x in range(3, W - 3): L.p(x, y, "w" if y < 26 else "W")
    for x in range(3, W - 3):
        for y in range(28, 31): L.p(x, y, "W" if (x + y) % 3 else "K")                               # blondekant
    for (x, y) in [(12, 17), (28, 17)]:                                                               # tallerkar
        for dx in range(-3, 4):
            for dy in range(-2, 3):
                if dx * dx / 9 + dy * dy / 4 <= 1: L.p(x + dx, y + dy, "s" if dx * dx / 9 + dy * dy / 4 < 0.5 else "S")
    for y in range(15, 23): L.p(20, y, "Y")                                                           # lysestake
    L.p(19, 22, "Z"); L.p(21, 22, "Z"); L.p(20, 14, "l"); L.p(20, 13, "L")
    for x in (6, 7, W - 8, W - 7):
        for y in range(31, H): L.p(x, y, "M" if x % 2 == 0 else "j")
    omriss(L)
    return L


def skrivepult():
    """Skrivepult på kontoret: skrå plate med protokoll og papir, blekkhus med fjørpenn, bøker i stabel."""
    W, H = 2 * 16 + 8, 2 * 16 + 10
    L = Lerret(W, H)
    for (x0, y0, c) in [(4, 8, "R"), (5, 4, "m"), (4, 0, "T")]:                                       # stabel med protokollar
        for y in range(y0, y0 + 4):
            for x in range(x0, x0 + 11): L.p(x, y, c if y > y0 else "p")
        L.p(x0 + 10, y0 + 2, "Y")
    for y in range(12, 28):                                                                           # skrå plate
        for x in range(3, W - 3): L.p(x, y, "O" if y < 14 else "M")
    for y in range(15, 25):                                                                           # open protokoll
        for x in range(9, 29): L.p(x, y, "p" if x != 19 else "P")
    for y in (17, 19, 21, 23):
        for x in list(range(11, 18)) + list(range(21, 28)):
            if (x * 7 + y) % 5: L.p(x, y, "g")
    L.p(24, 21, "b"); L.p(25, 22, "b"); L.p(26, 21, "b")                                               # blekkflekk
    for y in range(13, 16):                                                                           # blekkhus
        for x in range(31, 35): L.p(x, y, "b")
    for (x, y) in [(33, 12), (34, 11), (35, 10), (35, 9), (36, 8)]: L.p(x, y, "w")                    # fjørpenn
    for x in range(3, W - 3): L.p(x, 28, "O"); L.p(x, 29, "j")
    for y in range(30, H - 1):                                                                        # skuff og bein
        for x in range(3, W - 3):
            if y < 35: L.p(x, y, "M" if y != 34 else "j")
            elif x in (4, 5, W - 6, W - 5): L.p(x, y, "J")
    L.p(W // 2, 32, "Y")
    omriss(L)
    return L


BOKFARGAR = ["R", "E", "m", "B", "c", "T", "i", "Z", "J"]


def bokhylle_fyll(L, x0, x1, y0, y1, fro):
    """Ei hylle med bokryggar i ulike fargar og høgder, lys kant til venstre og gull på ryggen."""
    x = x0
    while x <= x1:
        w = 2 + int(h(x, y0, fro) * 2); c = BOKFARGAR[int(h(x, y0, fro + 1) * len(BOKFARGAR))]
        top = y0 + int(h(x, y0, fro + 2) * 3)
        if h(x, y0, fro + 3) > 0.9:                                   # ei bok som ligg skrått
            for k in range(w + 2):
                if x + k <= x1: L.p(x + k, y1 - k // 2, c)
            x += w + 3; continue
        for yy in range(top, y1 + 1):
            for xx in range(x, min(x + w, x1 + 1)): L.p(xx, yy, c)
        if h(x, y0, fro + 5) > 0.45: L.p(x, top, "y" if c in "RmJ" else "w")      # lys kant på somme
        if top + 2 <= y1 and h(x, y0, fro + 6) > 0.7: L.p(x + w - 1, top + 2, "Y")   # gulltrykk på få
        x += w + (1 if h(x, y0, fro + 4) > 0.75 else 0)


def bokreol():
    """Høg bokreol i mahogni med fire hyller, 2 x 2 fliser."""
    W, H = 2 * 16 + 8, 2 * 16 + 16
    L = Lerret(W, H)
    for x in range(2, W - 2): L.p(x, 0, "O"); L.p(x, 1, "M"); L.p(x, 2, "j")
    for y in range(3, H - 2):
        for x in range(3, W - 3): L.p(x, y, "J" if x in (3, 4) else "j" if x in (W - 5, W - 4) else "a")
    for k, hy in enumerate((13, 23, 33, 43)):
        bokhylle_fyll(L, 6, W - 7, hy - 9, hy - 1, 30 + k * 7)
        for x in range(3, W - 3): L.p(x, hy, "O"); L.p(x, hy + 1, "j")
    for x in range(2, W - 2): L.p(x, H - 2, "M"); L.p(x, H - 1, "j")
    omriss(L)
    return L


def bokreol_brei():
    """Låg, brei bokreol langs veggen med to hyller, 5 fliser breitt (boksamlinga på Ekset)."""
    W, H = 5 * 16 + 8, 32
    L = Lerret(W, H)
    for x in range(2, W - 2): L.p(x, 0, "O"); L.p(x, 1, "M"); L.p(x, 2, "j")
    for y in range(3, H - 2):
        for x in range(3, W - 3): L.p(x, y, "J" if x in (3, 4) else "j" if x in (W - 5, W - 4) else "a")
    for k, hy in enumerate((15, 27)):
        bokhylle_fyll(L, 6, W - 7, hy - 10, hy - 1, 60 + k * 9)
        for x in range(3, W - 3): L.p(x, hy, "O"); L.p(x, hy + 1, "j")
    for sx in (30, 57):                                                                               # stolpar
        for y in range(3, H - 2): L.p(sx, y, "J"); L.p(sx + 1, y, "j")
    for x in range(2, W - 2): L.p(x, H - 2, "M"); L.p(x, H - 1, "j")
    omriss(L)
    return L


def lesebord():
    """Lesebord med grøn duk, opa bok, lys i stake og ein globus, 3 fliser breitt."""
    W, H = 3 * 16 + 8, 30
    L = Lerret(W, H)
    for y in range(8, 20):
        for x in range(3, W - 3): L.p(x, y, "I" if y < 10 else "i" if y < 18 else "e")
    for x in range(3, W - 3): L.p(x, 20, "M"); L.p(x, 21, "j")
    for x in (5, 6, W - 7, W - 6):
        for y in range(22, H - 1): L.p(x, y, "M" if x % 2 else "J")
    for y in range(11, 17):                                                                           # opa bok
        for x in range(20, 36): L.p(x, y, "p" if x != 28 else "P")
    for y in (12, 14):
        for x in list(range(21, 27)) + list(range(29, 35)): L.p(x, y, "g" if x % 3 else "p")
    for x in range(19, 37): L.p(x, 17, "R")
    for y in range(4, 13): L.p(10, y, "w" if y > 5 else "l")                                          # lys
    L.p(10, 3, "L"); L.p(9, 13, "Y"); L.p(10, 13, "Y"); L.p(11, 13, "Y")
    gx, gy = 45, 5                                                                                    # globus
    for y in range(-5, 6):
        for x in range(-5, 6):
            if x * x + y * y <= 25:
                hav = "B" if x * x + y * y < 12 and x < 1 else "b"
                land = h(x + 3, y + 7, 77) > 0.62
                L.p(gx + x, gy + y + 2, ("i" if x < 1 else "e") if land else hav)
    for y in range(8, 14): L.p(gx, y + 2, "Y")
    for x in range(gx - 3, gx + 4): L.p(x, 16, "Z")
    omriss(L)
    return L


def stol():
    """Stol med høg rygg sett bakfrå (den som sit, ser mot bordet)."""
    W, H = 16 + 8, 26
    L = Lerret(W, H)
    for x in range(6, 18): L.p(x, 1, "O"); L.p(x, 2, "M")
    for y in range(3, 16):
        L.p(6, y, "O"); L.p(7, y, "M"); L.p(16, y, "J"); L.p(17, y, "j")
        if 5 <= y <= 12:
            for x in range(10, 14): L.p(x, y, "M" if x < 13 else "j")
    for y in range(16, 20):
        for x in range(5, 19): L.p(x, y, "i" if y < 18 else "e")
    for x in range(5, 19): L.p(x, 20, "j")
    for x in (6, 17):
        for y in range(21, H - 1): L.p(x, y, "J")
    omriss(L)
    return L


INVENTAR = {
    "kakkelomn": kakkelomn, "skatoll": skatoll, "golvur": golvur, "sofa": sofa, "spisebord": spisebord,
    "skrivepult": skrivepult, "bokreol": bokreol, "bokreol-brei": bokreol_brei, "lesebord": lesebord, "stol": stol,
    "grue": grue, "hylle": hylle, "sengebenk": sengebenk, "langbord": langbord, "langbord-staande": langbord_staande,
    "benk": benk, "benk-kort": lambda: benk(2), "benk-staande": benk_staande, "benk-staande-kort": lambda: benk_staande(2),
    "kubbestol-ned": lambda: kubbestol("ned"), "kubbestol-opp": lambda: kubbestol("opp"),
    "kubbestol-venstre": lambda: kubbestol("venstre"), "kubbestol-hogre": lambda: kubbestol("hogre"),
    "kornbinge": kornbinge, "tonne": tonne, "kagge": kagge, "flatbrodstabel": flatbrodstabel, "spekemat": spekemat,
    "stige": stige, "glugge": glugge, "takbjelke": takbjelke, "sekker": sekker, "skrin": skrin,
    "kiste": kiste, "kiste-open": lambda: kiste(True),
    "rokk": rokk, "korvegg": korvegg, "kyrkjebenk-h": lambda: kyrkjebenk("h"), "kyrkjebenk-v": lambda: kyrkjebenk("v"), "kyrkjebenk-golv": kyrkjebenk_golv,
    **{f"kyrkjebenk-{d}{v}": (lambda d=d, v=v: kyrkjebenk(d, variant=v - 1)) for d in "hv" for v in (2, 3, 4, 5)},
    "dopefont": dopefont, "altartavle": altartavle, "altarring": altarring, "preikestol": preikestol, "preikestol-bak": lambda: preikestol("bak"), "preikestol-trapp": lambda: preikestol("trapp"), "lysekrone": lysekrone,
    "skipvegg-v": lambda: skipvegg("v"), "skipvegg-h": lambda: skipvegg("h"), "korskilje": korskilje, "kyrkjeskip": kyrkjeskip,
    "fattigblokk": fattigblokk, "jernomn": jernomn,
    "epitaf-v": lambda: epitaf("v"), "epitaf-h": lambda: epitaf("h"),
    "trapp": trapp, "galleribrystning": galleribrystning, "klokkestol": klokkestol, "tarnbjelke": tarnbjelke, "lydluke": lydluke,
    "tarnvegg": tarnvegg, "galleritrinn": galleritrinn, "orgel": orgel}


def pix(namn, L):
    brukt = {c for r in L.g for c in r}
    ut = [f"# namn: inne-{namn}", "# type: bygg", f"# ut: bilete/spel/bygg/inne-{namn}.png", f"# storleik: {L.w}x{L.h}", "palett:"]
    ut += [f"  {t} = {f}    {m}".rstrip() for t, f, m in PAL if t in brukt or t == "."]
    ut.append("bilete:"); ut += ["  " + "".join(r) for r in L.g]
    return "\n".join(ut) + "\n"


if __name__ == "__main__":
    tving = "--tving" in sys.argv
    namn = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not namn: print(__doc__); sys.exit(0)
    if namn == ["alle"]: namn = list(INVENTAR)
    for n in namn:
        sti = os.path.join(ROT, "kjelder", f"inne-{n}.pix")
        if os.path.exists(sti) and not tving: print(f"inne-{n}.pix finst alt (bruk --tving)"); continue
        open(sti, "w", encoding="utf-8").write(pix(n, INVENTAR[n]())); print(f"skreiv kjelder/inne-{n}.pix")
