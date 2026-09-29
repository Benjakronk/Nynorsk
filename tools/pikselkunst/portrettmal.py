"""Portrettmal for «Aasen: Språkvandringa»: 40 x 40, tre kvart mot høgre.

Malen er teikna for hand som flater med tre til fem tonar (cel-skygge, slik
portretta i 16-bits-rollespela er), ikkje rekna ut. Variantane (hår, skaut,
flosshatt, skjegg, briller, alder, kvinne) byggjer på same grunnform, så alle
portretta får same stil. Utgangen er ei .pix-fil som etterpå kan finpussast
for hand og køyrast gjennom pix.py.

  python tools/pikselkunst/portrettmal.py ivar           skriv kjelder/portrett-ivar.pix
  python tools/pikselkunst/portrettmal.py alle
  python tools/pikselkunst/portrettmal.py granne --tving skriv over ei finpussa fil
"""
import sys, os

ROT = os.path.dirname(os.path.abspath(__file__))
W = H = 40

# Fargeskalaer, plukka for hand (mørk til lys). Skuggane dreg mot fiolett, lyset mot varm kvit.
HUD = {"vanleg": ["#6e3c46", "#a8624e", "#d8926a", "#f0b890", "#fcd8b4"],
       "blek": ["#6a4250", "#a47266", "#d6a488", "#eec6aa", "#fbe2cc"],
       "gamal": ["#6a3c44", "#9c5e50", "#cc8c6c", "#e6b08e", "#f4ccb0"]}
HAR = {"brun": ["#2a1418", "#4a2618", "#6e4024", "#96623a", "#c08a50"],
       "ljosbrun": ["#3a2018", "#6a4428", "#946a3a", "#bc9254", "#dcb878"],
       "kvit": ["#3a3448", "#6a6478", "#a8a4b4", "#d4d2dc", "#f4f2f8"],
       "blond": ["#4a2c18", "#8a6030", "#c09048", "#e0bc68", "#f4dc98"],
       "svart": ["#0e0a14", "#1c1624", "#2e2638", "#463c52", "#62586e"]}
KLE = {"blaa": ["#1e2440", "#2e3a60", "#43598a", "#6282b4"],
       "brun": ["#2a1810", "#4a2c1c", "#6e4428", "#946440"],
       "graa": ["#22202c", "#3a3848", "#5a5868", "#7c7a8a"],
       "kvit": ["#6a6478", "#a8a4b8", "#dcdae4", "#f4f2f8"],
       "svart": ["#0e0a14", "#1a1424", "#2a2236", "#3e3450"]}
SKAUT = {"blaa": ["#141c40", "#1e2c62", "#2c4288", "#4a64ac"],
         "raud": ["#3a0e18", "#6a1a2a", "#983040", "#c45a5a"]}

PERSONAR = {
    "ivar": dict(hud="vanleg", har="brun", frisyre="kort", kle="blaa", krage=True, knappar=True),
    "storebror": dict(hud="vanleg", har="ljosbrun", frisyre="kort", kle="brun", krage=True, stubb=True, eldre=True),
    "syster": dict(hud="vanleg", har="brun", frisyre="skaut", skaut="blaa", kle="kvit", kvinne=True),
    "granne": dict(hud="gamal", har="kvit", frisyre="skalle", kle="graa", skjegg=True, gamal=True),
    "budeia": dict(hud="vanleg", har="blond", frisyre="skaut", skaut="raud", kle="kvit", kvinne=True),
    "framande": dict(hud="blek", har="svart", frisyre="kort", kle="svart", krage=True, flosshatt=True, briller=True, smil=True),
}


def teikn(p):
    g = [["." for _ in range(W)] for _ in range(H)]
    def pk(x, y, c):
        if 0 <= x < W and 0 <= y < H: g[y][x] = c
    def span(y, x0, x1, c):
        for x in range(x0, x1 + 1): pk(x, y, c)

    # Kle og skuldrer (m = lys, l = middels, k = skugge, j = djup)
    jakke = {30: (12, 27), 31: (8, 31), 32: (6, 33), 33: (5, 34), 34: (4, 35), 35: (4, 35), 36: (3, 36), 37: (3, 36), 38: (3, 36), 39: (3, 36)}
    for y, (a, b) in jakke.items():
        for x in range(a, b + 1):
            c = "l"
            if x > 26: c = "k"
            if x > 32: c = "j"
            if x < 11 and y < 35: c = "m"
            if y == 31 and x < 20: c = "m"
            if y == 32 and 7 < x < 14: c = "m"
            pk(x, y, c)
    if p.get("kvinne"):
        # stakk/bol med snøring i staden for jakkeslag
        for y in range(33, 40): span(y, 13, 26, "k" if y == 33 else "l")
        for y in range(34, 40, 2): pk(18, y, "j"); pk(21, y, "j"); pk(19, y + 1, "j"); pk(20, y + 1, "j")
    else:
        for i, y in enumerate(range(31, 40)):
            pk(15 - i // 2, y, "k")
            if i > 2: pk(16 - i // 2, y, "j")
            pk(24 + i // 2, y, "j"); pk(25 + i // 2, y, "k")
        if p.get("knappar"):
            for y in range(35, 40): pk(19, y, "j"); pk(20, y, "k")
            pk(20, 36, "e"); pk(20, 38, "e")
    # Hals
    for y in range(25, 32):
        span(y, 16, 23, "3")
        for x in range(20, 24): pk(x, y, "2")
    span(26, 17, 23, "1"); span(27, 17, 23, "2")
    # Krage
    if p.get("krage") or p.get("kvinne"):
        for y, (a, b) in {29: (14, 16), 30: (13, 17), 31: (13, 17), 32: (14, 17)}.items(): span(y, a, b, "w")
        for y, (a, b) in {29: (22, 25), 30: (22, 26), 31: (22, 26), 32: (22, 25)}.items(): span(y, a, b, "W")
        pk(17, 29, "W"); pk(18, 32, "w"); pk(21, 32, "W")
        span(32, 18, 21, "2"); span(33, 18, 21, "W"); span(34, 19, 20, "W")
    # Hovud
    hovud = {4: (15, 24), 5: (13, 26), 6: (12, 27), 7: (11, 28), 8: (10, 29)}
    for y in range(9, 19): hovud[y] = (10, 30)
    hovud.update({19: (11, 30), 20: (11, 30), 21: (11, 30), 22: (12, 29), 23: (12, 29), 24: (13, 28), 25: (14, 27), 26: (16, 25), 27: (18, 23)})
    if p.get("kvinne"): hovud.update({23: (12, 28), 24: (13, 27), 25: (15, 26), 26: (17, 24), 27: (19, 22)})
    for y, (a, b) in hovud.items():
        for x in range(a, b + 1):
            c = "3"
            if x >= 29 or y >= 25: c = "2"
            if x >= 30 and y > 21: c = "1"
            if 13 <= x <= 18 and 13 <= y <= 22: c = "4"
            if 14 <= x <= 16 and 15 <= y <= 19: c = "5"
            pk(x, y, c)
    pk(31, 19, "3"); pk(31, 20, "2")
    # Øyre
    for y in range(15, 22): span(y, 8, 11, "3")
    pk(8, 15, "."); pk(8, 21, "."); pk(9, 17, "2"); pk(10, 18, "2"); pk(9, 19, "2"); pk(9, 16, "4"); span(21, 9, 11, "2")

    fr = p.get("frisyre", "kort")
    lugg = {16: 12, 17: 13, 18: 11, 19: 10, 20: 12, 21: 13, 22: 11, 23: 10, 24: 12, 25: 13, 26: 11, 27: 10, 28: 12, 29: 13, 30: 14}
    if fr == "kort":
        har = {1: (17, 23), 2: (14, 26), 3: (12, 28), 4: (10, 29), 5: (9, 30), 6: (8, 31), 7: (8, 31), 8: (8, 31), 9: (8, 31)}
        for y, (a, b) in har.items():
            for x in range(a, b + 1):
                c = "c"
                if y <= 3 and x < 22: c = "d"
                if y <= 2 and 16 <= x <= 20: c = "e"
                if x >= 26: c = "b"
                if x >= 29: c = "a"
                if y == 5 and 11 <= x <= 14: c = "d"
                pk(x, y, c)
        for x, bunn in lugg.items():
            for y in range(10, bunn + 1): pk(x, y, "b" if y == bunn else ("c" if x < 26 else "b"))
        for y in range(10, 21):
            for x in range(8, 16 - (1 if y > 16 else 0)):
                if not (y >= 15 and x <= 11): pk(x, y, "c" if x > 10 else "b")
        for y in range(10, 15): pk(12, y, "d"); pk(13, y + 1, "d")
        span(3, 15, 19, "e"); span(4, 13, 17, "d"); pk(20, 3, "d")
        span(10, 9, 15, "c"); pk(15, 20, "b"); pk(14, 21, "b")
        for x, bunn in lugg.items():
            y = bunn + 1
            if g[y][x] in "345": g[y][x] = "2" if x > 22 else "3"
    elif fr == "skalle":
        # glatt isse med glans, kvitt hår i ein krans bak og på sidene
        span(6, 16, 20, "4"); span(7, 15, 18, "5"); span(8, 14, 17, "4")
        for y in range(11, 22):
            for x in range(8, 15 - (1 if y > 17 else 0)):
                if not (y >= 15 and x <= 11): pk(x, y, "c" if x > 9 else "b")
        span(10, 9, 13, "d"); span(11, 9, 12, "d"); pk(30, 13, "c"); pk(30, 14, "b"); pk(29, 12, "c")
    elif fr == "skaut":
        skaut = {0: (16, 24), 1: (13, 27), 2: (11, 29), 3: (9, 30), 4: (8, 31), 5: (7, 31), 6: (7, 32), 7: (7, 32), 8: (7, 32)}
        for y, (a, b) in skaut.items():
            for x in range(a, b + 1):
                c = "y"
                if y <= 2 and x < 22: c = "z"
                if x >= 27: c = "x"
                if x >= 30: c = "v"
                pk(x, y, c)
        for y in range(9, 27):            # skautet ned langs sida av andletet
            for x in range(7, 14 - (1 if y > 20 else 0)):
                pk(x, y, "x" if x > 10 else "v" if y > 18 else "y")
        for y in range(9, 15): pk(30, y, "x"); pk(31, y, "v")
        for x in range(14, 30): pk(x, 9, "c" if x % 3 else "b")    # hår som stikk fram under skautet
        for x in range(15, 29, 3): pk(x, 10, "b")
        for y in range(26, 31):             # knuten under haka
            for x in range(9, 15): pk(x, y, "y" if (x + y) % 3 else "x")
        pk(8, 29, "z"); pk(9, 30, "v")
        for (x, y) in [(15, 2), (20, 4), (25, 2), (11, 5), (17, 6), (23, 7), (28, 5), (9, 12), (10, 18), (12, 24), (11, 28)]:
            pk(x, y, "w"); pk(x + 1, y, "R")                        # blomster i tøyet
        span(8, 12, 22, "z")                 # fald
    if p.get("flosshatt"):
        for y in range(0, 8): span(y, 13, 28, "F")
        for y in range(0, 8): pk(13, y, "G"); pk(14, y, "G"); pk(27, y, "H"); pk(28, y, "H")
        span(5, 13, 28, "B"); span(6, 13, 28, "B")
        span(8, 7, 33, "H"); span(9, 7, 33, "H"); span(8, 7, 20, "G")
    # Skjegg
    if p.get("skjegg"):
        skj = {20: (13, 29), 21: (12, 30), 22: (12, 30), 23: (12, 30), 24: (13, 29), 25: (14, 29), 26: (15, 28), 27: (16, 27), 28: (17, 26), 29: (18, 25), 30: (19, 24)}
        for y, (a, b) in skj.items():
            for x in range(a, b + 1):
                if y <= 21 and 18 <= x <= 28: continue
                pk(x, y, "d" if x < 18 else "c" if x < 25 else "b")
        span(23, 21, 25, "a"); span(22, 20, 26, "d")      # munn i skjegget og mustasje
        for x in range(14, 28, 3): pk(x, 26, "c"); pk(x + 1, 28, "c")
    if p.get("stubb"):
        # skjeggstubb som ein mjuk skugge langs kjeven, ikkje prikkar
        for y in range(23, 28):
            for x in range(14, 30):
                if g[y][x] in "345" and (y >= 25 or x <= 16 or x >= 27): g[y][x] = "2" if g[y][x] == "3" else "3"
    # Andlet
    if p.get("kvinne"):
        span(14, 18, 21, "a"); span(14, 25, 27, "a")
    else:
        span(14, 17, 21, "a"); span(14, 25, 27, "a"); pk(16, 15, "a")
    span(16, 17, 21, "o")
    pk(17, 17, "s"); pk(18, 17, "s"); pk(19, 17, "I"); pk(20, 17, "i"); pk(21, 17, "o")
    pk(18, 18, "s"); pk(19, 18, "i"); pk(20, 18, "i"); span(19, 18, 20, "3")
    span(16, 25, 27, "o"); pk(25, 17, "s"); pk(26, 17, "I"); pk(27, 17, "i"); pk(26, 18, "i"); pk(25, 18, "s"); pk(27, 18, "3")
    if p.get("kvinne"): pk(16, 16, "o"); pk(28, 16, "o")                 # augevipper
    pk(28, 19, "3"); pk(29, 20, "3"); pk(30, 20, "3"); pk(28, 21, "2"); pk(29, 21, "2"); pk(28, 18, "4")
    if not p.get("skjegg"):
        if p.get("smil"):
            span(24, 22, 24, "r"); pk(25, 23, "r"); pk(26, 22, "2")
        else:
            span(24, 22, 25, "r"); pk(21, 23, "2"); pk(26, 23, "2")
            if p.get("kvinne"): span(25, 23, 24, "R")
        if not p.get("stubb"): pk(17, 21, "p"); pk(18, 21, "p"); pk(26, 22, "p")
    if p.get("gamal") or p.get("eldre"):
        span(11, 18, 21, "2") if p.get("gamal") else None
        pk(22, 19, "2"); pk(23, 20, "2"); pk(28, 15, "2"); pk(29, 16, "2")
        if p.get("gamal"): span(12, 23, 26, "2"); pk(16, 19, "2"); pk(15, 20, "3")
    if p.get("briller"):
        for x in range(16, 22): pk(x, 15, "Q"); pk(x, 19, "Q")
        for y in range(15, 20): pk(16, y, "Q"); pk(21, y, "Q")
        for x in range(24, 29): pk(x, 15, "Q"); pk(x, 19, "Q")
        for y in range(15, 20): pk(24, y, "Q"); pk(28, y, "Q")
        span(16, 22, 23, "Q"); pk(17, 16, "g"); pk(25, 16, "g")
        pk(29, 16, "Q"); pk(30, 16, "Q")
    # Omriss rundt figuren
    ut = [row[:] for row in g]
    for y in range(H):
        for x in range(W):
            if g[y][x] == "." and any(0 <= x + dx < W and 0 <= y + dy < H and g[y + dy][x + dx] not in ".o" for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))):
                ut[y][x] = "o"
    return ut


def pix(namn, p):
    hud, har, kle = HUD[p.get("hud", "vanleg")], HAR[p.get("har", "brun")], KLE[p.get("kle", "blaa")]
    sk = SKAUT.get(p.get("skaut", "blaa"))
    kvit = ["#f0ecf4", "#b8b4cc"] if p.get("kle") != "kvit" else ["#f8f6fa", "#c4c0d4"]
    pal = [(".", "-", ""), ("o", "#0a0514", "omriss")]
    pal += [(str(i + 1), hud[i], "hud") for i in range(5)]
    pal += [("abcde"[i], har[i], "hår") for i in range(5)]
    pal += [("jklm"[i], kle[i], "kle") for i in range(4)]
    pal += [("w", kvit[0], "skjorte"), ("W", kvit[1], "skjorte skugge")]
    pal += [("vxyz"[i], sk[i], "skaut") for i in range(4)]
    pal += [("F", "#1c1624", "hatt"), ("G", "#3a3050", "hatt lys"), ("H", "#0e0a14", "hatt skugge"), ("B", "#5a2a2a", "hattband")]
    pal += [("s", "#f4f0f4", "augekvitt"), ("i", "#2a2848", "iris"), ("I", "#5a78b8", "iris lys"), ("r", "#8a3a3a", "munn"), ("R", "#c46a6a", "lepper"), ("p", "#e8907c", "kinn"), ("Q", "#4a4458", "brilleinnfatning"), ("g", "#e8f4ff", "glas")]
    g = teikn(p)
    brukt = {c for r in g for c in r}
    linjer = [f"# namn: portrett-{namn}", "# type: portrett", f"# ut: bilete/spel/portrett/{namn}.png", "# storleik: 40x40", "palett:"]
    linjer += [f"  {t} = {f}    {m}".rstrip() for t, f, m in pal if t in brukt or t == "."]
    linjer.append("bilete:")
    linjer += ["  " + "".join(r) for r in g]
    return "\n".join(linjer) + "\n"


if __name__ == "__main__":
    tving = "--tving" in sys.argv
    namn = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not namn: print(__doc__); sys.exit(0)
    if namn == ["alle"]: namn = list(PERSONAR)
    os.makedirs(os.path.join(ROT, "kjelder"), exist_ok=True)
    for n in namn:
        sti = os.path.join(ROT, "kjelder", f"portrett-{n}.pix")
        if os.path.exists(sti) and not tving: print(f"portrett-{n}.pix finst alt (bruk --tving for å skrive over)"); continue
        open(sti, "w", encoding="utf-8").write(pix(n, PERSONAR[n])); print(f"skreiv kjelder/portrett-{n}.pix")
