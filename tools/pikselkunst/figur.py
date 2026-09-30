"""Figurane på kartet (16 x 24) i stil med Final Fantasy VI og The Minish Cap.

Kvar figur blir sett saman av delar som er teikna for hand her: hovud, hår,
hovudplagg, skjegg, kropp (bukse, kjole eller kappe) og tilbehøyr. Utsjånaden
(fargar og delar) blir lesen frå U i js/rpg/data.js, så han finst berre éin stad.

Det vi har lært av referansane (sjå ARBEIDSLOGG.md, runde 6):
- Hovudet er om lag halve figuren (12 av 24 rader), kroppen kort og kompakt.
- Mørkt omriss (nesten svart) rundt heile silhuetten, men ikkje inne i figuren.
  Inne skil vi flatene med mørkare tonar av same farge.
- Tre tonar per materiale (lys, mellom, skugge), ljos frå oppe til venstre.
  11 til 14 fargar per figur.
- Håret er den største fargeflata og har eit lyst band. Auga er mørke streker.
- Gange: tre rammer per retning (stå, steg, steg). Retning høgre er spegla.

  python tools/pikselkunst/figur.py alle          skriv bilete/spel/figurar/<id>.png
  python tools/pikselkunst/figur.py ark           kontaktark i forhand/figurar-ark.png
  python tools/pikselkunst/figur.py ivar bonde    berre desse

Arket er 48 x 96: kolonnane er rammene (stå, steg 1, steg 2), radene er
retningane (ned, opp, venstre, høgre).
"""
import os, re, sys
from PIL import Image

ROT = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(ROT, "..", ".."))
UT = os.path.join(REPO, "bilete", "spel", "figurar")
W, H = 16, 24


# ---------------------------------------------------------------- delane
# Teikn: tre tonar per materiale (lys / mellom / skugge).
#   hud H h j, kinn k, munn m, auge e      hår R r q
#   jakke A a z, skjorte S s              bukse B b n, strømper V v, sko F f
#   kjole D d c, forkle P p               hovudplagg L l i (lue, skaut, hatt)
#   skjegg Y y t, belte x, spenne g       sekk Q E u, krage W w, glas G
#   hale T, omriss o. «.» er gjennomsiktig (eller: behald det som ligg under).
# Delane er lista som (første rad, [rader]). Alle rader er 16 teikn.

def del_(rad0, *rader): return (rad0, list(rader))

HOVUD = {
    0: del_(1,
        "....hhhhhhhh....",
        "...hhhhhhhhhh...",
        "..hhhhhhhhhhhh..",
        "..hhhhhhhhhhhh..",
        "..hhhhhhhhhhhh..",
        "..hHHhhhhhhhhj..",
        "..hHHehhhhehhj..",
        "..hHHehhhhehhj..",
        "..hHkhhhhhhkhj..",
        "...hhhhmmhhhj...",
        "....jhhhhhhj...."),
    1: del_(1,
        "....hhhhhhhh....",
        "...hhhhhhhhhh...",
        "..hhhhhhhhhhhh..",
        "..hhhhhhhhhhhh..",
        "..hhhhhhhhhhhh..",
        "..hHhhhhhhhhhj..",
        "..hHhhhhhhhhhj..",
        "..hhhhhhhhhhjj..",
        "..jhhhhhhhhhjj..",
        "...jhhhhhhhjj...",
        "....jjhhhhjj...."),
    2: del_(1,
        ".....hhhhhh.....",
        "....hhhhhhhh....",
        "...hhhhhhhhhh...",
        "..hhhhhhhhhhhh..",
        "..hhhhhhhhhhhh..",
        "..hHHhhhhhhhhh..",
        ".hHHehhhhhhhhh..",
        ".hHHehhhjhhhhh..",
        "..hHhhhhjhhhhh..",
        "..hkhhhhhhhhh...",
        "...mhhhhhjj....."),
}

HAR = {
    "kort": {
        0: del_(1,
            "....rrRRRrrr....",
            "...rRRRRrrrrq...",
            "..rRRRrrrrrrrq..",
            "..rRRrrrrrrrrq..",
            "..rRrrrqrrrqrq..",
            "..rr.r..r..rqq..",
            "..r..........q..",
            "..q..........q.."),
        1: del_(1,
            "....rrRRRrrr....",
            "...rRRRRrrrrq...",
            "..rRRRrrrrrrrq..",
            "..rRRrrrrrrrrq..",
            "..rRrrrrrrrrrq..",
            "..rrrrrrrrrrqq..",
            "..rrrrrrrrrqqq..",
            "..qrrrrrrrrqqq..",
            "..qqrqrrqrqqqq..",
            "...qq.q..q.qq..."),
        2: del_(1,
            ".....rRRRrr.....",
            "....rRRRRrrr....",
            "...rRRRrrrrrq...",
            "..rRRrrrrrrrrq..",
            "..rrrrrrrrrrrq..",
            "..r.rr.rrrrrqq..",
            "........rrrqqq..",
            ".........rrqqq..",
            ".........rqqqq..",
            "..........qqq..."),
    },
    "langt": {
        0: del_(1,
            "....rrRRRrrr....",
            "...rRRRRrrrrq...",
            "..rRRRrrrrrrrq..",
            "..rRRrrrqrrrrq..",
            "..rRrrrq.qrrrq..",
            "..rRr.......rq..",
            "..rr........qq..",
            "..rr........qq..",
            "..rr........qq..",
            "..rr........qq..",
            "..rq........qq.."),
        1: del_(1,
            "....rrRRRrrr....",
            "...rRRRRrrrrq...",
            "..rRRRrrrrrrrq..",
            "..rRRrrrrrrrrq..",
            "..rRrrrrrrrrrq..",
            "..rRrrrrrrrrqq..",
            "..rRrrrrrrrrqq..",
            "..rrrrrrrrrrqq..",
            "..rrrrrrrrrqqq..",
            "..rrrrrrrrrqqq..",
            "..rrrrrrrrrqqq..",
            "...rrrrrrrrqq...",
            "...rrrrrrrrqq...",
            "....rrrrrrqq....",
            ".....qrqrqq....."),
        2: del_(1,
            ".....rRRRrr.....",
            "....rRRRRrrr....",
            "...rRRRrrrrrq...",
            "..rRRrrrrrrrrq..",
            "..rrrrrrrrrrrq..",
            "..r.rr.rrrrrqq..",
            "......rrrrrqqq..",
            ".......rrrrqqq..",
            ".......rrrrqqq..",
            "........rrrqqq..",
            "........rrrqqq..",
            ".........rrqqq..",
            ".........rrqqq..",
            "..........rqq...",
            "..........qq...."),
    },
    "skalle": {
        0: del_(2,
            "......HH........",
            "....HH..........",
            "................",
            "................",
            "..r..........q..",
            "..rr........qq..",
            "..rr........qq..",
            "..q..........q.."),
        1: del_(2,
            "......HH........",
            "....HH..........",
            "................",
            "................",
            "..r..........q..",
            "..rrrrrrrrrrqq..",
            "..rrrrrrrrrqqq..",
            "..qrrrrrrrrqqq..",
            "...qqrqqrqqqq..."),
        2: del_(2,
            ".....HH.........",
            "....H...........",
            "................",
            "................",
            ".........rrrq...",
            ".........rrqqq..",
            ".........rqqqq..",
            "..........qqq..."),
    },
    "skaut": {   # skaut knytt under haka, eit hårband syner under kanten
        0: del_(1,
            "....lLLLLlll....",
            "...lLLLLlllli...",
            "..lLLLllllllli..",
            "..lLLlllllllli..",
            "..lLrrrrrrrrli..",
            "..ll........li..",
            "..l..........i..",
            "..l..........i..",
            "..l..........i..",
            "...l........i...",
            "......lLli......",
            "......iLLi......"),
        1: del_(1,
            "....lLLLLlll....",
            "...lLLLLllllli..",
            "..lLLLlllllllli.",
            "..lLLllllllllli.",
            "..lLlllllllllli.",
            "..llllllllllllii",
            "..lllllllllllii.",
            "..illllllllliii.",
            "...iillllliii...",
            "......iLLi......",
            ".....iL..Li....."),
        2: del_(1,
            ".....lLLLll.....",
            "....lLLLLllli...",
            "...lLLLlllllli..",
            "..lLLlllllllli..",
            "..lrrrrlllllli..",
            "......lllllllq..",
            ".......llllllq..",
            ".......llllllq..",
            "........llllli..",
            "........lllli...",
            "....lLlli.......",
            "....iLi........."),
    },
}

# Hovudplagg som blir lagde oppå håret.
PLAGG = {
    "lue": {   # raud topplue frå Sunnmøre, tuppen heng ned på sida
        0: del_(1,
            "....lLLLlllli...",
            "...lLLLllllllii.",
            "..lLLllllllliii.",
            "..LLLLLLLLLLLli.",
            ".............ii.",
            "..............i."),
        1: del_(1,
            "....lLLLlllli...",
            "...lLLLllllllii.",
            "..lLLllllllliii.",
            "..LLLLLLLLLLLli.",
            ".............ii.",
            "..............i."),
        2: del_(1,
            ".....lLLLlli....",
            "....lLLLllllii..",
            "...lLLllllllliii",
            "..LLLLLLLLLLLlii",
            ".............lii",
            "..............ii"),
    },
    "hatt": {  # vid hatt med bremme
        0: del_(1,
            ".....lLLLll.....",
            ".....lLLlli.....",
            ".....lllllli....",
            ".LLLLLlllllliii.",
            "..iiiiiiiiiiii.."),
        1: del_(1,
            ".....lLLLll.....",
            ".....lLLlli.....",
            ".....lllllli....",
            ".LLLLLlllllliii.",
            "..iiiiiiiiiiii.."),
        2: del_(1,
            ".....lLLLll.....",
            ".....lLLlli.....",
            ".....llllllii...",
            "LLLLLLllllllliii",
            "..iiiiiiiiiiii.."),
    },
    "flosshatt": {  # høg flosshatt for embetsmannen frå byen
        0: del_(0,
            "....lLLlllli....",
            "....lLLlllli....",
            "....lLLlllli....",
            "....xxxxxxxx....",
            "..LLLLllllllii..",
            "...iiiiiiiiii..."),
        1: del_(0,
            "....lLLlllli....",
            "....lLLlllli....",
            "....lLLlllli....",
            "....xxxxxxxx....",
            "..LLLLllllllii..",
            "...iiiiiiiiii..."),
        2: del_(0,
            ".....lLLllli....",
            ".....lLLllli....",
            ".....lLLllli....",
            ".....xxxxxxx....",
            "..LLLLllllllii..",
            "...iiiiiiiiii..."),
    },
}

SKJEGG = {
    0: del_(8,
        "..y..........t..",
        "..yy........tt..",
        "...yyyy..yyyt...",
        "...YyyyyyyyyyT..",
        "....YyyyyyyyT...",
        ".....yyyyyyt....",
        "......yyyt......"),
    2: del_(8,
        ".......y........",
        "......yy........",
        "..y.yyyy........",
        ".Yy.yyyt........",
        ".Yyyyyt.........",
        "..yyyt..........",
        "...yt..........."),
}

BRILLER = {
    0: del_(7, "....oGoooGo.....", "................"),
    2: del_(7, "..oGoooo........", "................"),
}

# Kropp: rad 12 til 22. Nøkkel: (type, retning, ramme).
def kropp(*rader): return (12, list(rader))

KROPP = {
    ("bukse", 0, 0): kropp(
        "...AAAaSSaaaz...",
        "..AAAaaSsaaazz..",
        "..AAzaaSsaazaz..",
        "..AazaaSsaazaz..",
        "..Aaxxxgxxxxaz..",
        "..hhnbbbbbbnhj..",
        "....Bbn..bbn....",
        "....Bbn..bbn....",
        "....Bbn..bbn....",
        "....FFf..FFf....",
        "....fff..fff...."),
    ("bukse", 0, 1): kropp(
        "...AAAaSSaaaz...",
        "..AAAaaSsaaazz..",
        "..AAzaaSsaazaz..",
        "..AazaaSsaazaz..",
        "..hhxxxgxxxxaz..",
        "....nbbbbbbnhj..",
        "....Bbn..bbn....",
        "....Bbn..bbn....",
        "....FFf..bbn....",
        "....fff..FFf....",
        ".........fff...."),
    ("bukse", 0, 2): kropp(
        "...AAAaSSaaaz...",
        "..AAAaaSsaaazz..",
        "..AAzaaSsaazaz..",
        "..AazaaSsaazaz..",
        "..Aaxxxgxxxxhj..",
        "..hhnbbbbbbn....",
        "....Bbn..bbn....",
        "....Bbn..bbn....",
        "....Bbn..FFf....",
        "....FFf..fff....",
        "....fff........."),
    ("bukse", 2, 0): kropp(
        ".....AAaaaz.....",
        "....AAaaaaaz....",
        "....AaAAazaz....",
        "....AaAAazaz....",
        "....xxAAazxx....",
        ".....nhhjbbn....",
        ".....Bbbbbn.....",
        ".....Bbbbbn.....",
        ".....Bbbbbn.....",
        "....FFFFfff.....",
        "....fffffff....."),
    ("bukse", 2, 1): kropp(
        ".....AAaaaz.....",
        "....AAaaaaaz....",
        "....AaaaAAzz....",
        "....AaaaAAzz....",
        "....xxxxAAzx....",
        ".....nbbbhhj....",
        "....Bbbn.bbn....",
        "...Bbn...bbn....",
        "...Bbn....bbn...",
        "..FFf.....FFf...",
        "..fff.....fff..."),
    ("bukse", 2, 2): kropp(
        ".....AAaaaz.....",
        "....AAAaaaaz....",
        "....AAAazaaz....",
        "...AAAzaaaaz....",
        "...hhxxxxxxx....",
        ".....nbbbbbn....",
        "....bbbn.Bbn....",
        "...bbn...Bbn....",
        "...bbn....Bbn...",
        "..FFf.....FFf...",
        "..fff.....fff..."),
    ("kjole", 0, 0): kropp(
        "...AAAaSSaaaz...",
        "..AAAaaSsaaazz..",
        "..AAzaaSsaazaz..",
        "..AazDDddddzaz..",
        "..hhDDddddddhj..",
        "...DDddddddddc..",
        "...DDddddddddc..",
        "..DDdddddddddcc.",
        "..DDdddddddddcc.",
        "..DDDddddddddcc.",
        "....FFf..FFf...."),
    ("kjole", 0, 1): kropp(
        "...AAAaSSaaaz...",
        "..AAAaaSsaaazz..",
        "..AAzaaSsaazaz..",
        "..hhzDDddddzaz..",
        "...DDDddddddhj..",
        "...DDddddddddc..",
        "...DDddddddddc..",
        "..DDdddddddddcc.",
        "..DDdddddddddcc.",
        "..DDDddddddddcc.",
        ".........FFf...."),
    ("kjole", 0, 2): kropp(
        "...AAAaSSaaaz...",
        "..AAAaaSsaaazz..",
        "..AAzaaSsaazaz..",
        "..AazDDddddzhj..",
        "..hhDDdddddddc..",
        "...DDddddddddc..",
        "...DDddddddddc..",
        "..DDdddddddddcc.",
        "..DDdddddddddcc.",
        "..DDDddddddddcc.",
        "....FFf........."),
    ("kjole", 2, 0): kropp(
        ".....AAaaaz.....",
        "....AAaaaaaz....",
        "....AaAAazaz....",
        "....DdAAadcc....",
        "....DDhhjddc....",
        "....DDdddddc....",
        "...DDddddddcc...",
        "...DDddddddcc...",
        "...DDdddddddcc..",
        "...DDdddddddcc..",
        "....FFf..ff....."),
    ("kjole", 2, 1): kropp(
        ".....AAaaaz.....",
        "....AAaaaaaz....",
        "....AaaaAAzz....",
        "....DdddAAcc....",
        "....DDddhhjc....",
        "....DDdddddc....",
        "...DDddddddcc...",
        "...DDddddddcc...",
        "...DDdddddddcc..",
        "..DDDdddddddcc..",
        "..FFf......ff..."),
    ("kjole", 2, 2): kropp(
        ".....AAaaaz.....",
        "....AAAaaaaz....",
        "....AAAazaaz....",
        "...AAAzdddcc....",
        "...hhDddddcc....",
        "....DDdddddc....",
        "...DDddddddcc...",
        "...DDddddddcc...",
        "...DDdddddddcc..",
        "...DDddddddddcc.",
        "...ff......FFf.."),
}

# Tilbehøyr som blir lagt oppå kroppen. Nøkkel: (namn, retning).
TILLEGG = {
    ("forkle", 0): del_(15, "......PPpp......", "......PPpp......", ".....PPPppp.....", ".....PPPppp.....",
                        ".....PPPppp.....", ".....PPPppp....."),
    ("forkle", 2): del_(15, "....P...........", "....PP..........", "...PPP..........", "...PPP..........",
                        "...PPP..........", "...PPP.........."),
    ("krage", 0): del_(11, "....WWwWWwW.....", "...WWwWWwWWw....", "....wWwwWwWw...."),
    ("krage", 1): del_(11, "....WWwWWwW.....", "...WWwWWwWWw....", "....wwwwwwww...."),
    ("krage", 2): del_(11, "...WWwWWw.......", "...WwWWwWw......", "....wwWwww......"),
    ("sekk", 0): del_(12, ".....u....u.....", "......u..u......", "................"),
    ("sekk", 2): del_(12, "..........QEu...", "..........QEEu..", "..........QEEu..",
                      "..........uuuu..", "..........QEEu..", "...........uu..."),
}
TILLEGG[("sekk", 1)] = del_(12, "....QQEEEEEu....", "....QEEEEEEu....", "....QEEEEEEu....",
                            "....uuuuuuuu....", "....QEEEEEEu....", "....uuuuuuuu....")

# Hala til huldra (ho gøymer ho under skjørtet når ho står mot deg).
HALE = {
    1: del_(18, ".......TT.......", ".......TT.......", "........T.......", "........T.......",
            ".......rrq......"),
    2: del_(17, "..............T.", "..............T.", "..............T.", ".............T..",
            "............rrq.", "............rq.."),
}

# Langt hår heng bak skuldrene når figuren står mot deg eller på sida.
HAR_BAK = {
    0: del_(12, ".rr..........qq.", ".r............q.", ".r............q."),
    2: del_(12, "..........rqq...", "..........rqq...", "...........qq..."),
}


# ---------------------------------------------------------------- fargar
def hx(s): s = s.lstrip("#"); return tuple(int(s[i:i + 2], 16) for i in (0, 2, 4))
def blend(a, b, t): return tuple(round(a[i] * (1 - t) + b[i] * t) for i in range(3))

VARM, KALD = (255, 236, 196), (30, 18, 52)
OMRISS = (24, 16, 32)


def rampe(base):
    """Lys, mellom og skugge. Lyset dreg mot varmt gult, skuggen mot kaldt fiolett.
    Mørke fargar (svarte klede) får eit sterkare lys, elles forsvinn forma."""
    b = hx(base) if isinstance(base, str) else base
    lys = sum(b) / 3
    return blend(b, VARM, 0.42 if lys < 70 else 0.3), b, blend(b, KALD, 0.28 if lys < 70 else 0.42)


def palett(u):
    p = {"o": OMRISS, "e": (26, 16, 32), "G": (220, 240, 255), "x": (58, 36, 24), "g": (216, 176, 64),
         "S": (236, 232, 220), "s": (176, 168, 160), "W": (248, 248, 244), "w": (184, 184, 196)}
    def sett(teikn, farge):
        for t, c in zip(teikn, rampe(farge)): p[t] = c
    hud = u.get("hud", "#e8b890")
    sett("Hhj", hud)
    p["k"] = blend(hx(hud), (220, 90, 100), 0.3)
    p["m"] = blend(hx(hud), (110, 40, 40), 0.45)
    p["T"] = hx(hud)
    sett("Rrq", u.get("har", "#6a4428"))
    sett("Aaz", u.get("jakke", "#3a5a8a"))
    sett("Bbn", u.get("bukse", "#4a3a30"))
    sett("Ddc", u.get("kjole", "#2c4288"))
    sett("Ff", u.get("sko", "#3a2a24")); p["F"], p["f"] = rampe(u.get("sko", "#3a2a24"))[1:]
    lp, lm, ld = rampe(u.get("forkle", "#ecebf0")); p["P"], p["p"] = lp if sum(lm) < 600 else lm, blend(lm, KALD, 0.22)
    plagg = u.get("lue") or u.get("hatt") or u.get("flosshatt") or u.get("skaut") or "#8a2638"
    sett("Lli", plagg)
    sett("Yyt", u.get("skjegg", "#d0d0d8"))
    sett("QEu", "#9a6a40")
    sv = u.get("strompe", "#e4e0d6")
    p["V"], p["v"] = rampe(sv)[1], rampe(sv)[2]
    return p


# ---------------------------------------------------------------- samansetjing
def legg(g, d, berre_tomme=False):
    rad0, rader = d
    for dy, rad in enumerate(rader):
        assert len(rad) == W, f"rad {rad0 + dy} har {len(rad)} teikn: {rad!r}"
        y = rad0 + dy
        if not 0 <= y < H: continue
        for x, c in enumerate(rad):
            if c == "." or (berre_tomme and g[y][x] != "."): continue
            g[y][x] = c


def ramme(u, dir, steg):
    """Teiknrutenett (16 x 24) for retning 0 ned, 1 opp, 2 venstre, og steg 0, 1, 2."""
    g = [["."] * W for _ in range(H)]
    d = 0 if dir == 0 else 1 if dir == 1 else 2
    type_ = "kjole" if u.get("kjole") else "bukse"
    fris = u.get("frisyre", "kort")
    if fris == "langt" and d in HAR_BAK: legg(g, HAR_BAK[d])
    # Kroppen. Mot oss og bakfrå har same form; bakfrå utan skjorte og spenne.
    kd = 2 if d == 2 else 0
    k = KROPP[(type_, kd, steg)]
    rader = k[1]
    if d == 1: rader = [r.replace("S", "a").replace("s", "a").replace("g", "x") for r in rader]
    if not u.get("belte"): rader = [r.replace("x", "a").replace("g", "a") for r in rader]
    if u.get("strompe") and type_ == "bukse":   # knebukser: kvite strømper under kneet
        rader = [r if i < 7 else r.replace("B", "V").replace("b", "V").replace("n", "v") for i, r in enumerate(rader)]
    if u.get("kappe") and type_ == "kjole":     # prestekjole: heile kroppen i kjolefargen
        rader = [r.replace("A", "D").replace("a", "d").replace("z", "c").replace("S", "d").replace("s", "c") for r in rader]
    if type_ == "kjole" and kd == 0:   # liv (snøreliv) i kjolefargen over skjorta, som på bunaden
        rader = rader[:]
        rader[1] = rader[1][:4] + ("zDDSsddc" if d == 0 else "zDDddddc") + rader[1][12:]
        rader[2] = rader[2][:4] + "zDDddddc" + rader[2][12:]
    legg(g, (k[0], rader))
    if u.get("forkle") and (type_, d) != ("bukse", 1) and ("forkle", d) in TILLEGG: legg(g, TILLEGG[("forkle", d)])
    if u.get("sekk") and d == 2: legg(g, TILLEGG[("sekk", 2)])
    # Hovud, hår og hovudplagg.
    legg(g, HOVUD[d])
    legg(g, HAR[fris][d])
    for namn in ("lue", "hatt", "flosshatt"):
        if u.get(namn): legg(g, PLAGG[namn][d])
    if u.get("skjegg") and d in SKJEGG: legg(g, SKJEGG[d])
    if u.get("briller") and d in BRILLER: legg(g, BRILLER[d])
    if u.get("krage"): legg(g, TILLEGG[("krage", d)])
    if u.get("sekk") and d in (0, 1): legg(g, TILLEGG[("sekk", d)])
    if u.get("hale") and d in HALE: legg(g, HALE[d])
    # Omriss: tomme pikslar som grensar til figuren (fire naboar).
    ut = [rad[:] for rad in g]
    for y in range(H):
        for x in range(W):
            if g[y][x] != ".": continue
            if any(0 <= y + dy < H and 0 <= x + dx < W and g[y + dy][x + dx] != "."
                   for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))):
                ut[y][x] = "o"
    return ut


def bilete(u):
    p = palett(u)
    im = Image.new("RGBA", (W * 3, H * 4), (0, 0, 0, 0))
    for dir in range(3):
        for steg in range(3):
            g = ramme(u, dir, steg)
            for y in range(H):
                for x in range(W):
                    c = g[y][x]
                    if c != ".": im.putpixel((steg * W + x, dir * H + y), p[c] + (255,))
    # Høgre er venstre spegla.
    for steg in range(3):
        rute = im.crop((steg * W, 2 * H, steg * W + W, 3 * H)).transpose(Image.FLIP_LEFT_RIGHT)
        im.paste(rute, (steg * W, 3 * H))
    return im


# ---------------------------------------------------------------- utsjånad frå data.js
def les_u():
    s = open(os.path.join(REPO, "js", "rpg", "data.js"), encoding="utf-8").read()
    i = s.index("const U = {"); j = s.index("\n  };", i)
    u = {}
    for m in re.finditer(r"^\s+(\w+): \{(.*)\},?\s*$", s[i:j], re.M):
        verdiar = {}
        for k, v in re.findall(r'(\w+): ("[^"]*"|true|false)', m.group(2)):
            verdiar[k] = v.strip('"') if v.startswith('"') else v == "true"
        u[m.group(1)] = verdiar
    return u


def kontaktark(alle, skala=4):
    namn = list(alle)
    kol = 6
    rader = (len(namn) + kol - 1) // kol
    cw, ch = (W * 4 + 6) * skala, (H + 4) * skala
    ark = Image.new("RGB", (kol * cw, rader * ch), (58, 110, 60))
    for n, id_ in enumerate(namn):
        im = bilete(alle[id_])
        for dir, steg, dx in ((0, 0, 0), (1, 0, 1), (2, 0, 2), (0, 1, 3)):
            rute = im.crop((steg * W, dir * H, steg * W + W, dir * H + H)).resize((W * skala, H * skala), Image.NEAREST)
            ark.paste(rute, ((n % kol) * cw + dx * (W + 1) * skala, (n // kol) * ch + 2 * skala), rute)
    return ark


if __name__ == "__main__":
    if len(sys.argv) < 2: print(__doc__); sys.exit(0)
    alle = les_u()
    if sys.argv[1] == "ark":
        sti = os.path.join(ROT, "forhand", "figurar-ark.png")
        os.makedirs(os.path.dirname(sti), exist_ok=True)
        kontaktark(alle).save(sti); print(sti); sys.exit(0)
    val = list(alle) if sys.argv[1] == "alle" else sys.argv[1:]
    os.makedirs(UT, exist_ok=True)
    for id_ in val:
        bilete(alle[id_]).save(os.path.join(UT, id_ + ".png"))
        print(id_)
