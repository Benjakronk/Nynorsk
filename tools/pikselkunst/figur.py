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
    "hestehale": {   # etter Terra i Final Fantasy VI: volum, taggete lugg, lokkar langs kinna
        0: del_(1,
            "....rrRRRrrr....",
            "...rRRRRRrrrq...",
            "..rRRRrrrrrrrq..",
            ".rRRrrrrrrrrrqq.",
            ".rRrrRrrrRrrrqq.",
            ".rrr.rr.rr.rrqq.",
            ".rr..........qq.",
            ".rr..........qq.",
            "..r..........q..",
            "..r..........q.."),
        1: del_(1,
            "....rrRRRrrr....",
            "...rRRRRRrrrq...",
            "..rRRRrrrrrrrq..",
            ".rRRrrrrrrrrrqq.",
            ".rRrrrrrrrrrrqq.",
            ".rrrrrrrrrrrrqq.",
            ".rrrrrrrrrrrqqq.",
            "..rrrrrrrrrqqq..",
            "..qrrrrrrrrqq...",
            "...qq.rRr.qq...."),
        2: del_(1,
            ".....rRRRrr.....",
            "....rRRRRrrr....",
            "...rRRRrrrrrq...",
            "..rRRrrrrrrrrq..",
            "..rrrrrrrrrrrqq.",
            "..r.rr.rrrrrrqq.",
            "......rrrrrrqqq.",
            ".......rrrrrqqq.",
            ".......rrrrrqq..",
            "........rrrqq..."),
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

# Kort kjole (etter Terra): smal midje med belte, stutt skjørt med borde, berre bein og føter.
KROPP[("kort", 0, 0)] = kropp(
    "...AAAaSSaaaz...",
    "..AAzDDSsddcaz..",
    "..AAzDDddddcaz..",
    "..AazPPppppzaz..",
    "..hhDDddddddhj..",
    "...DDddddddcc...",
    "...DDdddddddc...",
    "..DDddddddddcc..",
    "..PPPppppppppp..",
    ".....hj..hj.....",
    ".....hh..hh.....")
KROPP[("kort", 2, 0)] = kropp(
    ".....AAaaaz.....",
    "....AAaaaaaz....",
    "....AaAAazdz....",
    "....PpAApppp....",
    "....DDhhjddc....",
    "....DDdddddc....",
    "...DDddddddcc...",
    "...DDdddddddc...",
    "...PPpppppppp...",
    ".....hj.hj......",
    "....hhh.hhh.....")
for _s in (1, 2): KROPP[("kort", 0, _s)] = KROPP[("kort", 0, 0)]; KROPP[("kort", 2, _s)] = KROPP[("kort", 2, 0)]
# Beina under det korte skjørtet i steget (rad 21 og 22).
KORTBEIN = {
    (0, 1): [".....hj..hh.....", "....hhh........."],
    (0, 2): [".....hh..hj.....", ".........hhh...."],
    (2, 1): ["....hj....hj....", "..hhh......hh..."],
    (2, 2): ["....hh....hj....", "...hh.....hhh..."],
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
    1: del_(17, "........Tj......", "........Tj......", ".......Tj.......", ".......Tj.......",
            "......rRq.......", "......rrq......."),
    2: del_(16, "............Tj..", ".............Tj.", ".............Tj.", ".............Tj.",
            "............rRq.", "............rqq."),
}

# Hestehalen heng ned over ryggen (bakfrå, med lyst band midt i) og bak nakken (frå sida).
HESTEHALE = {
    1: del_(10, ".......rRr......", "......rrRrq.....", "......rrRrq.....", "......rrRrq.....", ".......rRq......",
            ".......rRq......", "........q......."),
    2: del_(8, "............IrRq", "............rRRq", "............rRq.", ".............Rq.", ".............rq.",
            "............rq..", "............q..."),
}
# Sjal over skuldrene med spissar, som kappa til Terra.
SJAL = {
    0: del_(12, ".LLLl......llli.", ".LLl........lli.", "..L..........i.."),
    1: del_(12, ".LLLLlllllllli..", ".LLlllllllllii..", "..Llllllllllli..", "...i........i..."),
    2: del_(12, "...LLllllli.....", "..LLl.....lli...", "..L.........i..."),
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
    plagg = u.get("lue") or u.get("hatt") or u.get("flosshatt") or u.get("skaut") or u.get("sjal") or "#8a2638"
    sett("Lli", plagg)
    sett("Yyt", u.get("skjegg", "#d0d0d8"))
    sett("QEu", "#9a6a40")
    p["C"], p["N"] = hx("#b08850"), hx("#4a2e1c")
    p["I"], p["J"] = hx("#f4b0c8"), hx("#f8e070")
    if u.get("band"): p["P"], p["p"] = rampe(u["band"])[0], rampe(u["band"])[2]
    sv = u.get("strompe", "#e4e0d6")
    p["V"], p["v"] = rampe(sv)[1], rampe(sv)[2]
    return p


# ---------------------------------------------------------------- samansetjing
def legg(g, d, dy=0, dx=0):
    rad0, rader = d
    for ry, rad in enumerate(rader):
        assert len(rad) == W, f"rad {rad0 + ry} har {len(rad)} teikn: {rad!r}"
        y = rad0 + ry + dy
        if not 0 <= y < len(g): continue
        for x, c in enumerate(rad):
            if c == "." or not 0 <= x + dx < len(g[0]): continue
            g[y][x + dx] = c


def tom(w=W, h=H): return [["."] * w for _ in range(h)]


def omriss(g):
    """Omriss: tomme pikslar som grensar til figuren (fire naboar)."""
    h, w = len(g), len(g[0])
    ut = [rad[:] for rad in g]
    for y in range(h):
        for x in range(w):
            if g[y][x] != ".": continue
            if any(0 <= y + dy < h and 0 <= x + dx < w and g[y + dy][x + dx] != "."
                   for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))):
                ut[y][x] = "o"
    return ut


# Kroppen på sida utan arm, så armen kan leggjast på i ulike stillingar (stav, kamp).
ARMLAUS = {
    "kort": [".....AAaaaz.....", "....AAaaaaaz....", "....Aaaaazdz....", "....Pppppppp....",
             "....DDdddddc....", "....DDdddddc...."],
    "bukse": [".....AAaaaz.....", "....AAaaaaaz....", "....Aaaaaaaz....", "....Aaaaaaaz....",
              "....xxxxxxxx....", ".....nbbbbbn...."],
    "kjole": [".....AAaaaz.....", "....AAaaaaaz....", "....Aaaaaaaz....", "....Dddddddc....",
              "....DDdddddc....", "....DDdddddc...."],
}
# Armar på sida (mot venstre). Radene er absolutte.
ARM = {
    "fram": del_(14, ".hhAAAaz........", ".hhaaaaz........"),                        # åtak: rett fram
    "opp": del_(11, ".hh.............", ".hhA............", "..AAa...........", "...Aaz.........."),  # galdr
    "bak": del_(12, "...........hh...", "..........Aaz...", "..........az...."),       # skadd: slengd bak
    "kne": del_(17, ".....AAaz.......", ".....AAaz.......", "....hhj........."),       # svak: handa på kneet
    "stav": del_(14, ".....AAaz.......", "....AAaz........", "...hhj.........."),      # held staven fram
}
# Bein når figuren sit på kne (svak i kampen).
KNE = {
    "kort": del_(19, "....DDdddddc....", "...DDddddddcc...", "..PPpppppppppp..", "..hhh.....hh...."),
    "bukse": del_(20, "...BBbbbbbn.....", "...Bbn..Bbbbbn..", "..FFf...nnnnnff."),
    "kjole": del_(19, "....DDdddddc....", "...DDddddddcc...", "..DDdddddddddc..", "..DDDddddddddcc."),
}
# Krokrygg: pukkel bak skuldrene (på sida).
PUKKEL = del_(10, "............Aa..", "...........Aaz..", "...........aaz..", "..........aaz...", "..........az....")
# Stav og stokk: (øvste rad, kolonne). Mot oss held figuren staven i høgre hand (til venstre i biletet).
STAV = {
    ("lang", 0): (8, 1), ("lang", 1): (8, 14), ("lang", 2): (8, 2),
    ("stokk", 0): (15, 1), ("stokk", 1): (15, 14), ("stokk", 2): (15, 2),
}
# Ein blome i håret (huldra).
BLOM = {0: del_(4, "...IJ...........", "...I............"), 2: del_(4, "..........IJ....", "..........I....."),
        1: del_(4, "...........JI...", "............I...")}


def kroppsrader(u, type_, d, kd, steg):
    rader = KROPP[(type_, kd, steg)][1]
    if d == 1: rader = [r.replace("S", "a").replace("s", "a").replace("g", "x") for r in rader]
    if type_ == "kjole" and kd == 0:   # liv (snøreliv) i kjolefargen over skjorta, som på bunaden
        rader = rader[:]
        rader[1] = rader[1][:4] + ("zDDSsddc" if d == 0 else "zDDddddc") + rader[1][12:]
        rader[2] = rader[2][:4] + "zDDddddc" + rader[2][12:]
    if type_ == "kjole" and u.get("sid"):   # sid kjole heilt ned, med border nedst
        rader = rader[:]
        rader[9] = rader[8].replace("D", "P").replace("d", "p").replace("c", "p")
        rader[10] = rader[8]
    return rader


def fargar_rader(u, type_, rader, fra=0):
    """Byter teikn i kroppsradene etter utsjånaden (belte, knebukser, prestekjole)."""
    if not u.get("belte"): rader = [r.replace("x", "a").replace("g", "a") for r in rader]
    if u.get("strompe") and type_ == "bukse":   # knebukser: kvite strømper under kneet
        rader = [r if fra + i < 7 else r.replace("B", "V").replace("b", "V").replace("n", "v") for i, r in enumerate(rader)]
    if u.get("kappe") and type_ == "kjole":     # prestekjole: heile kroppen i kjolefargen
        rader = [r.replace("A", "D").replace("a", "d").replace("z", "c").replace("S", "d").replace("s", "c") for r in rader]
    return rader


def hovud(g, u, d, hy=0, hx=0, pose=None):
    fris = u.get("frisyre", "kort")
    legg(g, HOVUD[d], hy, hx)
    legg(g, HAR[fris][d], hy, hx)
    for namn in ("lue", "hatt", "flosshatt"):
        if u.get(namn): legg(g, PLAGG[namn][d], hy, hx)
    if u.get("blom") and d in BLOM: legg(g, BLOM[d], hy, hx)
    if u.get("skjegg") and d in SKJEGG: legg(g, SKJEGG[d], hy, hx)
    if u.get("briller") and d in BRILLER: legg(g, BRILLER[d], hy, hx)
    if pose in ("skadd", "ute"):              # attlatne auge: ei vassrett strek
        for y in range(len(g) - 1):
            for x in range(1, len(g[0])):
                if g[y][x] == "e" and g[y + 1][x] == "e": g[y][x] = "h"; g[y + 1][x - 1] = "e"
    if pose == "galdr":                       # open munn, han syng
        for y in range(len(g)):
            for x in range(len(g[0])):
                if g[y][x] == "m": g[y][x] = "e"


# ---------------------------------------------------------------- gange (etter Final Fantasy VI)
# I Final Fantasy VI arbeider heile kroppen når figuren går: armane svingar i motsett takt med
# beina (armen fram kjem innover og ned framfor hofta, armen bak blir kortare), foten på
# beinet fram blir breiare og går litt ut, beinet bak blir løfta. Frå sida er steget langt,
# armen svingar godt fram eller bak, og hovud og overkropp søkk éin piksel i steget.

def _set(g, i, x, tekst):
    for k, c in enumerate(tekst):
        if 0 <= x + k < W and c != ".": g[i][x + k] = c


def gang_framme(rader, type_, steg):
    """Mot oss eller bakfrå: armar og bein i stegstilling. rader er ståramma (rad 12 til 22)."""
    g = [list(r) for r in rader]
    Hh = 5 if type_ == "bukse" else 4                   # rada med hendene (17 eller 16)
    for i in range(1, Hh + 1):                          # ta bort armane frå ståramma
        for x in (2, 3, 12, 13): g[i][x] = "."
    v_arm, h_arm = ("bak", "fram") if steg == 1 else ("fram", "bak")
    v_bein, h_bein = ("fram", "bak") if steg == 1 else ("bak", "fram")
    if type_ == "bukse":
        for i in range(6, 11):
            for x in range(2, 14): g[i][x] = "."
        for (x, lys, tilstand) in ((4, "Bbn", v_bein), (9, "bbn", h_bein)):
            ut = 1 if x == 9 else -1                        # foten fram går litt ut til sida
            if tilstand == "fram":
                for i in (6, 7, 8): _set(g, i, x, lys)
                _set(g, 9, min(x, x + ut), "FFFf"); _set(g, 10, min(x, x + ut), "ffff")
            else:                                           # løfta: stuttare, foten ein rad høgare
                for i in (6, 7): _set(g, i, x, lys)
                _set(g, 8, x, "FFf"); _set(g, 9, x, "fff")
    # armane
    for i in range(1, Hh - 1): _set(g, i, 2, "AA" if i < 3 else "Aa"); _set(g, i, 12, "zz" if i == 1 else "az")
    if v_arm == "fram": _set(g, Hh - 1, 3, "Aa"); _set(g, Hh, 3, "hhh"); _set(g, Hh + 1, 3, "hhj")
    else: _set(g, Hh - 1, 2, "hh")
    if h_arm == "fram": _set(g, Hh - 1, 11, "az"); _set(g, Hh, 10, "hhj"); _set(g, Hh + 1, 10, "hjj")
    else: _set(g, Hh - 1, 12, "hj")
    return ["".join(r) for r in g]


# Armen på sida (mot venstre) i gange. Rader før skuggesøkket.
SIDEARM = {
    "fram": del_(14, ".....AAa........", "....AAa.........", "...AAz..........", "..hhh...........", "..hhj..........."),
    "bak": del_(14, ".......AAa......", "........AAa.....", ".........AAz....", "..........hhh...", "..........hhj..."),
}
# Bein på sida i steget (rad 19 til 22): steg 1 har det nære beinet fram, steg 2 bak.
SIDEBEIN = {
    1: ["....BBbbbbbn....", "...BBb...bbn....", "..BBb.....bbn...", ".FFFf......ffn.."],
    2: ["....bbbbbBBn....", "...bbn...BBb....", "..bbn.....BBb...", ".fff......FFFb.."],
}
SIDESKO_KJOLE = {1: ".FFf.......ff...", 2: ".ff.......FFf..."}


def samanset(u, dir, steg, pose=None):
    """Teiknrutenett (16 x 24) utan omriss. dir 0 ned, 1 opp, 2 venstre. pose: kampstilling eller None."""
    g = tom()
    d = 0 if dir == 0 else 1 if dir == 1 else 2
    type_ = ("kort" if u.get("kort") else "kjole") if u.get("kjole") else "bukse"
    fris = u.get("frisyre", "kort")
    krok = u.get("krokrygg") and not pose
    stav = u.get("stav") if not pose else None
    hy, hx = (2, -1 if d == 2 else 0) if krok else (0, 0)
    bx = 0
    gang = steg in (1, 2) and not pose
    by = 1 if gang and d == 2 else 0                  # skuggesøkk: overkroppen søkk i steget frå sida
    hy += by
    if pose == "atak": hx, bx = -1, -1
    if pose == "skadd": hx, bx = 2, 1
    if pose == "svak": hy = 3
    if fris == "langt" and d in HAR_BAK: legg(g, HAR_BAK[d], hy, hx)
    if stav and d != 2:                       # staven står bak handa
        y0, x = STAV[(stav, d)]
        for y in range(y0 + hy, 23): g[y][x] = "N" if y in (y0 + hy, 22) or x == 14 else "C"
    kd = 2 if d == 2 else 0
    rader = kroppsrader(u, type_, d, kd, steg if not pose else (2 if pose == "atak" else 0))
    if gang and kd == 0:
        rader = gang_framme(kroppsrader(u, type_, d, kd, 0) if type_ == "bukse" else rader, type_, steg)
        if type_ == "kort": rader = rader[:9] + KORTBEIN[(0, steg)]
        legg(g, (12, fargar_rader(u, type_, rader)), 0, bx)
    elif gang and d == 2:
        torso = ARMLAUS[type_]
        legg(g, (12 + by, fargar_rader(u, type_, torso)), 0, bx)
        if type_ == "bukse": legg(g, (19, fargar_rader(u, type_, SIDEBEIN[steg], 6)), 0, bx)
        elif type_ == "kort": legg(g, (18, rader[6:9] + KORTBEIN[(2, steg)]), 0, bx)
        else: legg(g, (19, fargar_rader(u, type_, rader[7:10] + [SIDESKO_KJOLE[steg]])), 0, bx)
    elif d == 2 and (pose or stav):
        torso = ARMLAUS[type_]
        if pose == "svak":
            legg(g, (15, fargar_rader(u, type_, torso[:5])), 0, bx)
            k = KNE[type_]
            legg(g, (k[0], fargar_rader(u, type_, k[1], 7 if type_ == "bukse" else 0)), 0, bx)
        else:
            legg(g, (12, fargar_rader(u, type_, torso + rader[6:])), 0, bx)
    else:
        legg(g, (12, fargar_rader(u, type_, rader)), 0, bx)
    if krok and d == 2: legg(g, PUKKEL, by)
    if u.get("forkle") and (type_, d) != ("bukse", 1) and ("forkle", d) in TILLEGG and pose != "svak":
        legg(g, TILLEGG[("forkle", d)], by, bx)
    if u.get("sekk") and d == 2: legg(g, TILLEGG[("sekk", 2)], 3 if pose == "svak" else by, bx)
    if u.get("hale") and d == 2 and pose != "svak": legg(g, HALE[2], by, bx)
    if gang and d == 2 and not stav: legg(g, SIDEARM["bak" if steg == 1 else "fram"], by, bx)
    if u.get("sjal"): legg(g, SJAL[d], by if d == 2 else 0, bx)
    hovud(g, u, d, hy, hx, pose)
    if fris == "hestehale" and d == 2: legg(g, HESTEHALE[2], hy, hx)
    if fris == "hestehale" and d == 1: legg(g, HESTEHALE[1], hy, hx)
    if u.get("krage"): legg(g, TILLEGG[("krage", d)], hy, hx)
    if u.get("sekk") and d in (0, 1): legg(g, TILLEGG[("sekk", d)])
    if u.get("hale") and d == 1: legg(g, HALE[1])
    if stav and d == 2:                       # staven framfor figuren, handa rundt
        y0, x = STAV[(stav, 2)]
        x += hx
        for y in range(y0 + hy, 23): g[y][x] = "N" if y in (y0 + hy, 22) else "C"
        legg(g, ARM["stav"], by, hx)
    if stav and d != 2:                       # handa rundt staven
        g[16][STAV[(stav, d)][1]] = "h"
    arm = {"atak": "fram", "galdr": "opp", "skadd": "bak", "svak": "kne"}.get(pose)
    if arm: legg(g, ARM[arm], 0, bx)
    return g


def ramme(u, dir, steg, pose=None): return omriss(samanset(u, dir, steg, pose))


def ute(u):
    """Slått ut: figuren ligg på ryggen (sida, rotert), 24 x 16."""
    g = samanset(u, 2, 0, "ute")
    rot = [[g[H - 1 - x][y] for x in range(H)] for y in range(W)]   # 90 grader med klokka
    return omriss(rot)


# ---------------------------------------------------------------- standardkjensler
# Alle figurar har same sett med kjensler, så manus kan bruke dei til å fortelje historia.
# Rekkjefølgja er fast (rad 6 og 7 i arket). Handteikna ark har i tillegg eigne kjensler i rad 8.
STANDARDKJENSLER = ("glad", "trist", "sint", "sjokk", "tenkje", "nikk")
ANDLET = set("hHjkme")                          # pikslar som høyrer til andletet


def kjensle(u, namn):
    """Ramme mot oss med ei kjensle: endrar auge, bryn, munn og hender der andletet er
    (auga står i kolonne 5 og 10, rad 7 og 8, munnen i rad 10, som i HOVUD)."""
    g = samanset(u, 0, 0)
    hy = 2 if u.get("krokrygg") else 0
    def sett(x, y, c, berre_andlet=True):
        y += hy
        if 0 <= y < H and 0 <= x < W and (not berre_andlet or g[y][x] in ANDLET): g[y][x] = c
    auge = g[7 + hy][5] == "e"                    # auga synlege (ikkje bak briller eller hatt)
    munn = g[10 + hy][7] == "m"
    if namn == "glad":
        if auge:
            for x in (5, 10): sett(x, 8, "h"); sett(x - 1, 8, "e"); sett(x + 1, 8, "e")
        if munn: sett(6, 10, "m"); sett(9, 10, "m"); sett(7, 11, "m"); sett(8, 11, "m")
    elif namn == "trist":
        if auge:
            for x in (5, 10): sett(x, 7, "h")
            sett(11, 9, "G")                                             # ei tåre
        if munn: sett(7, 10, "h"); sett(8, 10, "h"); sett(6, 11, "m"); sett(7, 10, "m"); sett(8, 10, "m"); sett(9, 11, "m")
    elif namn == "sint":
        if auge:
            sett(4, 6, "e"); sett(5, 6, "e"); sett(6, 7, "e"); sett(11, 6, "e"); sett(10, 6, "e"); sett(9, 7, "e")
        if munn:
            for x in (6, 7, 8, 9): sett(x, 10, "e")
    elif namn == "sjokk":
        if auge:
            for x in (5, 10): sett(x, 6, "e"); sett(x + (1 if x == 5 else -1), 7, "W"); sett(x + (1 if x == 5 else -1), 8, "e")
        if munn: sett(7, 10, "e"); sett(8, 10, "e"); sett(7, 11, "e"); sett(8, 11, "e")
        for (x, y) in [(1, 12), (2, 12), (1, 13), (13, 12), (14, 12), (14, 13)]: sett(x, y, "h", False)
    elif namn == "tenkje":
        if auge:
            for x in (5, 10): sett(x, 8, "h"); sett(x + 1, 7, "e")
        if munn: sett(7, 10, "h"); sett(8, 10, "m"); sett(9, 10, "m")
        for (x, y) in [(8, 12), (9, 12), (10, 12), (9, 11)]: sett(x, y, "h", False)
    elif namn == "nikk":                                                 # bukkar: hovudet ned, auga att
        if auge:
            for x in (5, 10): sett(x, 7, "h")
        ny = [r[:] for r in g]
        for y in range(1, 13 + hy):
            for x in range(W):
                over = g[y - 1][x]
                if y <= 11 + hy: ny[y][x] = over
                elif over != ".": ny[y][x] = over
        ny[0] = ["."] * W
        g = ny
    return omriss(g)


def bilete(u):
    """Arket: rad 0 til 3 gange (ned, opp, venstre, høgre), rad 4 kamp (åtak, galdr, skadd),
    rad 5 svak (på kne) og slått ut (24 x 16, nedst i ruta), rad 6 og 7 standardkjensler."""
    p = palett(u)
    im = Image.new("RGBA", (W * 3, H * 8), (0, 0, 0, 0))
    def teikn(g, x0, y0):
        for y, rad in enumerate(g):
            for x, c in enumerate(rad):
                if c != ".": im.putpixel((x0 + x, y0 + y), p[c] + (255,))
    for dir in range(3):
        for steg in range(3): teikn(ramme(u, dir, steg), steg * W, dir * H)
    for steg in range(3):   # høgre er venstre spegla
        rute = im.crop((steg * W, 2 * H, steg * W + W, 3 * H)).transpose(Image.FLIP_LEFT_RIGHT)
        im.paste(rute, (steg * W, 3 * H))
    for n, pose in enumerate(("atak", "galdr", "skadd")): teikn(ramme(u, 2, 0, pose), n * W, 4 * H)
    teikn(ramme(u, 2, 0, "svak"), 0, 5 * H)
    teikn(ute(u), W, 5 * H + 8)
    for n, namn in enumerate(STANDARDKJENSLER): teikn(kjensle(u, namn), (n % 3) * W, (6 + n // 3) * H)
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


def _ivar():
    import ivar_figur
    return ivar_figur.lag()


# Figurar som har eit eige, handteikna ark (med kjensler) i staden for malen.
def _huldra():
    import huldra_figur
    return huldra_figur.lag()


HANDTEIKNA = {"ivar": _ivar, "huldra": _huldra}


def kontaktark(alle, skala=4):
    namn = list(alle)
    kol = 6
    rader = (len(namn) + kol - 1) // kol
    cw, ch = (W * 4 + 6) * skala, (H + 4) * skala
    ark = Image.new("RGB", (kol * cw, rader * ch), (58, 110, 60))
    for n, id_ in enumerate(namn):
        im = HANDTEIKNA[id_]() if id_ in HANDTEIKNA else bilete(alle[id_])
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
    val = list(alle) + [k for k in HANDTEIKNA if k not in alle] if sys.argv[1] == "alle" else sys.argv[1:]
    os.makedirs(UT, exist_ok=True)
    for id_ in val:
        if id_ in HANDTEIKNA:                                           # hovudpersonar med eige, handteikna ark
            HANDTEIKNA[id_]().save(os.path.join(UT, id_ + ".png")); print(id_, "(handteikna)"); continue
        bilete(alle[id_]).save(os.path.join(UT, id_ + ".png"))
        print(id_)
