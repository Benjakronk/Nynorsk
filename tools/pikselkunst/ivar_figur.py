"""Ivar, handteikna figurark (16 x 24 per ramme), etter Locke i Final Fantasy VI.

Hovudpersonen får eige ark i staden for malen i figur.py, så han kan få meir personlegdom:
- Proporsjonar som Locke: hovudet om lag 11 rader, lengre bein og armar.
- Stramt fargeutval (om lag 16 fargar) der dei mørke tonane er delte mellom hår, klede og sko.
- Kjenneteikn: ein hårvirvel som stikk opp, fjørpenn bak øyret, sekk med reimar, og ein
  hasselkjepp i kampen.
- Gange som Locke: neven kjem stort fram framfor magen, armen bak forsvinn, beinet bak
  blir bøygd og løfta. Frå sida søkk kroppen i steget.
- Kjensler: latter (handa bak hovudet), sjokk, sorg, tenkjer, ivrig og les i ei bok.

Arket (48 x 192): rad 0 til 3 gange (ned, opp, venstre, høgre), rad 4 åtak, galdr, skadd,
rad 5 svak og slått ut (24 x 16), rad 6 latter, sjokk, sorg, rad 7 tenkjer, ivrig, les.

  python tools/pikselkunst/ivar_figur.py        skriv bilete/spel/figurar/ivar.png
"""
import os
from PIL import Image

ROT = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(ROT, "..", "..", "bilete", "spel", "figurar", "ivar.png")
W, H = 16, 24

PAL = {
    "o": "#180f18",                                   # omriss, auge
    "R": "#a8763e", "r": "#6e4526", "q": "#3a2218",    # hår (den mørke er delt med bukse og sko)
    "H": "#f8d0a8", "h": "#e6a878", "j": "#b06a4a",    # hud
    "m": "#a04838",                                   # munn
    "A": "#6e92c4", "a": "#43649a", "z": "#283a66",    # blå vadmålstrøye
    "W": "#f2eee2", "w": "#c4bcb0",                   # skjorte og fjør
    "B": "#7a6450", "b": "#56443a",                   # bukse (skugge = q)
    "K": "#c89058", "k": "#8a5a30",                   # sekk og reimar, kjepp
    "g": "#e0b848",                                   # spenne
}

# ---------------------------------------------------------------- rammene
# Kvar ramme er 24 rader à 16 teikn. «.» er gjennomsiktig. Omrisset blir lagt på til slutt.
R = {}

R["ned0"] = [
    "................",
    ".....rRRr..qr...",
    "....rRRRRrrqr...",
    "...rRRRRrrrrrq..",
    "..rRRRrrrrrrrq..",
    "..rRrrrRrrrrqq..",
    "..rrqhrrhhrqrq..",
    "..rqhHHhhhhhqq..",
    "..qhHoHhhhohhq..",
    "...hHoHhhhohj...",
    "...jhhhmmhhj....",
    "....zjjWWjjz....",
    "...aAAKWWaKaz...",
    "..aAAAKWWaKaaz..",
    "..AAaaKWWaKaaz..",
    "..AaaaKWWaKazz..",
    "..hhqqqgqqqqhh..",
    "..jhBbbbbbbbbhj.",
    "....Bbb..bbq....",
    "....Bbb..bbq....",
    "....Bbq..bbq....",
    "....qqq..qqq....",
    "...qqqq..qqqq...",
    "................",
]
R["ned1"] = [
    "................",
    ".....rRRr..qr...",
    "....rRRRRrrqr...",
    "...rRRRRrrrrrq..",
    "..rRRRrrrrrrrq..",
    "..rRrrrRrrrrqq..",
    "..rrqhrrhhrqrq..",
    "..rqhHHhhhhhqq..",
    "..qhHoHhhhohhq..",
    "...hHoHhhhohj...",
    "...jhhhmmhhj....",
    "....zjjWWjjz....",
    "...aAAKWWaKaz...",
    "..AAAAKWWaKaaz..",
    "..AAaaKWWaKaz...",
    "..AaaaKWWhhhj...",
    "..AaqqqgqHhhj...",
    "...qBbbbbbjj....",
    "...Bbbb..bbq....",
    "...Bbb...bbq....",
    "...Bbb...qqq....",
    "..qqqq...qq.....",
    "..qqqqq.........",
    "................",
]
R["ned2"] = [
    "................",
    ".....rRRr..qr...",
    "....rRRRRrrqr...",
    "...rRRRRrrrrrq..",
    "..rRRRrrrrrrrq..",
    "..rRrrrRrrrrqq..",
    "..rrqhrrhhrqrq..",
    "..rqhHHhhhhhqq..",
    "..qhHoHhhhohhq..",
    "...hHoHhhhohj...",
    "...jhhhmmhhj....",
    "....zjjWWjjz....",
    "...aAAKWWaKaz...",
    "..aAAAKWWaKaaz..",
    "...AaaKWWaKaaz..",
    "...hhHKWWaKazz..",
    "...hHhqgqqqqaz..",
    "....jjbbbbbbq...",
    "....Bbb..bbbq...",
    "....Bbb...bbq...",
    "....qqq...bbq...",
    ".....qq...qqqq..",
    ".........qqqqq..",
    "................",
]
R["opp0"] = [
    "................",
    ".....rRRr..qr...",
    "....rRRRRrrqr...",
    "...rRRRRrrrrrq..",
    "..rRRRrrrrrrrq..",
    "..rRRrrrrrrrrq..",
    "..rRrrrrrrrrqq..",
    "..rrrrrrrrrrqq..",
    "..qrrrrrrrrqqq..",
    "...qrrrrrrqqq...",
    "...jqqrqqrqj....",
    "....zjjjjjjz....",
    "...aKKKKKKKKz...",
    "..aAKkkkkkkKaz..",
    "..AAKKKKKKKKaz..",
    "..AaKkkkkkkKzz..",
    "..hhkkkkkkkkhh..",
    "..jhBbbbbbbbbhj.",
    "....Bbb..bbq....",
    "....Bbb..bbq....",
    "....Bbq..bbq....",
    "....qqq..qqq....",
    "...qqqq..qqqq...",
    "................",
]
R["opp1"] = [
    "................",
    ".....rRRr..qr...",
    "....rRRRRrrqr...",
    "...rRRRRrrrrrq..",
    "..rRRRrrrrrrrq..",
    "..rRRrrrrrrrrq..",
    "..rRrrrrrrrrqq..",
    "..rrrrrrrrrrqq..",
    "..qrrrrrrrrqqq..",
    "...qrrrrrrqqq...",
    "...jqqrqqrqj....",
    "....zjjjjjjz....",
    "...aKKKKKKKKz...",
    "..AAKkkkkkkKaz..",
    "..AAKKKKKKKKz...",
    "..hhKkkkkkkKz...",
    "..hjkkkkkkkk....",
    "...qBbbbbbbq....",
    "...Bbb...bbq....",
    "...Bbb...bbq....",
    "...Bbb...qqq....",
    "..qqqq...qq.....",
    "..qqqqq.........",
    "................",
]
R["opp2"] = [
    "................",
    ".....rRRr..qr...",
    "....rRRRRrrqr...",
    "...rRRRRrrrrrq..",
    "..rRRRrrrrrrrq..",
    "..rRRrrrrrrrrq..",
    "..rRrrrrrrrrqq..",
    "..rrrrrrrrrrqq..",
    "..qrrrrrrrrqqq..",
    "...qrrrrrrqqq...",
    "...jqqrqqrqj....",
    "....zjjjjjjz....",
    "...aKKKKKKKKz...",
    "..aAKkkkkkkKaz..",
    "...AKKKKKKKKaz..",
    "...AKkkkkkkKhh..",
    "....kkkkkkkkhj..",
    "....qbbbbbbBq...",
    "....Bbb...bbq...",
    "....Bbb...bbq...",
    "....qqq...bbq...",
    ".....qq...qqqq..",
    ".........qqqqq..",
    "................",
]
# Frå sida (mot venstre): nase, fjørpenn bak øyret, sekken på ryggen.
R["side0"] = [
    ".............w..",
    "......rRRr..wW..",
    ".....rRRRRr.W...",
    "....rRRRRrrrWq..",
    "...rRRrrrrrrrq..",
    "..rRrrrrrrrrrq..",
    "..hhrrrrqrrrqq..",
    ".hHHhhrrjrrrqq..",
    ".hHohhhhjrrrq...",
    "..hohhhjjrrqq...",
    "..hmhhhjjqqq....",
    "...jjhjj........",
    "....zAAaaKKk....",
    "....AAaaKKKKk...",
    "....AaAAaKkkk...",
    "....AaAAaKKKk...",
    "....qqAAqKkk....",
    ".....bhhjbbq....",
    ".....BBbqq......",
    ".....BBbqq......",
    ".....BBbqq......",
    ".....Bbbqq......",
    "...qqqqqqq......",
    "................",
]
R["side1"] = [
    "................",
    ".............w..",
    "......rRRr..wW..",
    ".....rRRRRr.W...",
    "....rRRRRrrrWq..",
    "...rRRrrrrrrrq..",
    "..rRrrrrrrrrrq..",
    "..hhrrrrqrrrqq..",
    ".hHHhhrrjrrrqq..",
    ".hHohhhhjrrrq...",
    "..hohhhjjrrqq...",
    "..hmhhhjjqqq....",
    "...jjhjj........",
    "....zAAaaKKk....",
    "....AAaaKKKKk...",
    "....AaaaAKkkkh..",
    "....AaaaaAhhkj..",
    "....qqqqqqhjk...",
    "....Bbbb.bbq....",
    "...Bbb....bbq...",
    "..Bbb......bbq..",
    ".qqqq.......qq..",
    ".qqqq........q..",
    "................",
]
R["side2"] = [
    "................",
    ".............w..",
    "......rRRr..wW..",
    ".....rRRRRr.W...",
    "....rRRRRrrrWq..",
    "...rRRrrrrrrrq..",
    "..rRrrrrrrrrrq..",
    "..hhrrrrqrrrqq..",
    ".hHHhhrrjrrrqq..",
    ".hHohhhhjrrrq...",
    "..hohhhjjrrqq...",
    "..hmhhhjjqqq....",
    "...jjhjj........",
    "....zAAaaKKk....",
    "...AAAaaKKKKk...",
    "..hAAaaaaKkkk...",
    "..hhjaaaaKKKk...",
    "...qqqqqqKkk....",
    "....bbbb.Bbb....",
    "...bbq....Bbb...",
    "..bbq......Bbq..",
    ".qqq.......qqqq.",
    "q..........qqqq.",
    "................",
]
# Kamp (mot venstre)
R["atak"] = [
    "................",
    "..............w.",
    ".......rRRr..wW.",
    "......rRRRRr.W..",
    ".....rRRRRrrrWq.",
    "....rRRrrrrrrrq.",
    "...rRrrrrrrrrrq.",
    "...hhrrrrqrrrqq.",
    "..hHHhhrrjrrrqq.",
    "..hHohhhhjrrrq..",
    "...hohhhjjrrqq..",
    "...hmhhhjjqqq...",
    "kK..jjhjj.......",
    ".kK.zAAaaKKk....",
    "..kKAAaaKKKKk...",
    "..hhkKaaaKkkk...",
    "..hhjkKaaKKKk...",
    "...qqqkKqKkk....",
    "....bbbbkK.b....",
    "...bbq...kKbb...",
    "..bbq......Bbq..",
    ".qqq.......qqqq.",
    "q..........qqqq.",
    "................",
]
R["galdr"] = [
    "................",
    ".............w..",
    "......rRRr..wW..",
    ".....rRRRRr.W...",
    "....rRRRRrrrWq..",
    "...rRRrrrrrrrq..",
    "..rRrrrrrrrrrq..",
    "..hhrrrrqrrrqq..",
    ".hHHhhrrjrrrqq..",
    "hh.ohhhhjrrrq...",
    "hhHhhhhjjrrqq...",
    ".AAmohhjjqqq....",
    "..AAjhjj........",
    "...AzAAaaKKk....",
    "....AAaaKKKKk...",
    "....AaAAaKkkk...",
    "....AaAAaKKKk...",
    "....qqAAqKkk....",
    ".....bhhjbbq....",
    ".....BBbqq......",
    ".....BBbqq......",
    ".....Bbbqq......",
    "...qqqqqqq......",
    "................",
]
R["skadd"] = [
    "................",
    "................",
    "...............w",
    "........rRRr..wW",
    ".......rRRRRr.W.",
    "......rRRRRrrrWq",
    ".....rRRrrrrrrrq",
    "....rRrrrrrrrrrq",
    "....hhrrrrqrrrqq",
    "...hHHhhrrjrrrqq",
    "...hHoohhhjrrrq.",
    "....hhhhhjjrrqq.",
    "....hohhhjjqqq..",
    ".....jjhjj..hh..",
    ".....zAAaaKKhj..",
    ".....AAaaKKKKk..",
    ".....AaaaaKkkk..",
    ".....AaaaaKKKk..",
    ".....qqqqqKkk...",
    "......Bbbbbq....",
    "......Bbbbbq....",
    ".....Bbb.bbq....",
    "...qqqq..qqqq...",
    "................",
]
R["svak"] = [
    "................",
    "................",
    "................",
    "................",
    "......rRRr......",
    ".....rRRRRr.....",
    "....rRRRRrrrq...",
    "...rRRrrrrrrrq..",
    "..rRrrrrrrrrrq..",
    "..hhrrrrqrrrqq..",
    ".hHHhhrrjrrrqq..",
    ".hHhhhhhjrrrq...",
    "..hoohhjjrrqq...",
    "..hmhhhjjqqq....",
    "...jjhjj........",
    "....zAAaaKKk....",
    "....AAaaKKKKk...",
    "....AaAAaKkkk...",
    "....AahhaKKKk...",
    "...BBbhhjbbq....",
    "..BBbbbbbbbbq...",
    "..Bbq...bbbbbq..",
    ".qqqq...qqqqqqq.",
    "................",
]
# Kjensler (mot oss)
KJ_HOVUD = R["ned0"][:11]
R["latter"] = [
    "................",
    ".....rRRr..qr...",
    "....rRRRRrrqr.hh",
    "...rRRRRrrrrrqhj",
    "..rRRRrrrrrrrqAz",
    "..rRrrrRrrrrqqAz",
    "..rrqhrrhhrqrqAz",
    "..rqhHHhhhhhqqAz",
    "..qhHHHhhhhhhq.a",
    "...hoooHhoooj.az",
    "...jhhmmmmhj..az",
    "....zjjmmjjz.aaz",
    "...aAAKWWaKaaaz.",
    "..aAAAKWWaKaaz..",
    "..AAaaKWWaKaz...",
    "..AaaaKWWaKaz...",
    "..hhqqqgqqqqq...",
    "..jhBbbbbbbbb...",
    "....Bbb..bbq....",
    "....Bbb..bbq....",
    "....Bbq..bbq....",
    "....qqq..qqq....",
    "...qqqq..qqqq...",
    "................",
]
R["sjokk"] = [
    ".....r..r..qr...",
    ".....rRRr.qr....",
    "....rRRRRrrqr...",
    "...rRRRRrrrrrq..",
    "..rRRRrrrrrrrq..",
    "..rRrrrRrrrrqq..",
    "..rrqhrrhhrqrq..",
    "..rqhoohhoohqq..",
    "..qhoWohhoWohq..",
    "...hoohhhoohj...",
    "...jhhhoohhj....",
    "....zjjooWjz....",
    "hh.aAAKWWaKaz.hh",
    "hAaAAAKWWaKaaAAh",
    ".aAAaaKWWaKaaAa.",
    "..AaaaKWWaKazz..",
    "..aaqqqgqqqqaa..",
    "...qBbbbbbbbq...",
    "....Bbb..bbq....",
    "....Bbb..bbq....",
    "....Bbq..bbq....",
    "....qqq..qqq....",
    "...qqqq..qqqq...",
    "................",
]
R["sorg"] = [
    "................",
    "................",
    ".....rRRr..qr...",
    "....rRRRRrrqr...",
    "...rRRRRrrrrrq..",
    "..rRRRrrrrrrrq..",
    "..rRrrrrrrrrqq..",
    "..rrrrrrrrrrrq..",
    "..rrqhrrhhrqrq..",
    "..rqhhhhhhhhqq..",
    "...hoohhhoohj...",
    "...jjhhhhhjj....",
    "....jjhmmhj.....",
    "...zaAKWWaKaz...",
    "..aAAAKWWaKaaz..",
    "..AAaaKWWaKaaz..",
    "..AaaaKWWaKazz..",
    "..hhqqqgqqqqhh..",
    "..jhBbbbbbbbbhj.",
    "....Bbb..bbq....",
    "....Bbq..bbq....",
    "....qqq..qqq....",
    "...qqqq..qqqq...",
    "................",
]
R["tenkje"] = [
    "................",
    ".....rRRr..qr...",
    "....rRRRRrrqr...",
    "...rRRRRrrrrrq..",
    "..rRRRrrrrrrrq..",
    "..rRrrrRrrrrqq..",
    "..rrqhrrhhrqrq..",
    "..rqhHHhhhhhqq..",
    "..qhHHohhhhohq..",
    "...hHHohhhhoj...",
    "...jhhhhmhhj....",
    "....zjhhhjjz....",
    "...aAAhhjaKaz...",
    "..aAAAAAjaKaaz..",
    "..AAaaaAaaKaaz..",
    "..AaaaKWWaKazz..",
    "..hhqqqgqqqqhh..",
    "..jhBbbbbbbbbhj.",
    "....Bbb..bbq....",
    "....Bbb..bbq....",
    "....Bbq..bbq....",
    "....qqq..qqq....",
    "...qqqq..qqqq...",
    "................",
]
R["ivrig"] = [
    "..............hh",
    ".....rRRr..qr.hj",
    "....rRRRRrrqr.Az",
    "...rRRRRrrrrrqAz",
    "..rRRRrrrrrrrqAz",
    "..rRrrrRrrrrqqAz",
    "..rrqhrrhhrqrqAz",
    "..rqhHHhhhhhqqaz",
    "..qhHoHhhhohhqaz",
    "...hHoHhhhohj.az",
    "...jhhmmmmhj.aaz",
    "....zjjmmjjzaaz.",
    "...aAAKWWaKaaz..",
    "..aAAAKWWaKaz...",
    "..AAaaKWWaKaz...",
    "..AaaaKWWaKazz..",
    "..hhqqqgqqqqq...",
    "..jhBbbbbbbbb...",
    "...Bbb...bbq....",
    "...Bbb...bbq....",
    "...Bbq...bbq....",
    "...qqq...qqq....",
    "..qqqq...qqqq...",
    "................",
]
R["les"] = [
    "................",
    "................",
    ".....rRRr..qr...",
    "....rRRRRrrqr...",
    "...rRRRRrrrrrq..",
    "..rRRRrrrrrrrq..",
    "..rRrrrRrrrrqq..",
    "..rrqhrrhhrqrq..",
    "..rqhHHhhhhhqq..",
    "..qhHooHhhoohq..",
    "...hHhhhhhhhj...",
    "...jhhhmhhhj....",
    "....zjjWWjjz....",
    "...aAkkkkkkkaz..",
    "..ahkWWWkWWWkhz.",
    "..AhkWwWkWwWkhz.",
    "..AakWWWkWWWkaz.",
    "..AaqkkkkkkkqAz.",
    "..jhBbbbbbbbbhj.",
    "....Bbb..bbq....",
    "....Bbq..bbq....",
    "....qqq..qqq....",
    "...qqqq..qqqq...",
    "................",
]


def omriss(g):
    h, w = len(g), len(g[0]); ut = [list(r) for r in g]
    for y in range(h):
        for x in range(w):
            if g[y][x] != ".": continue
            if any(0 <= y + dy < h and 0 <= x + dx < w and g[y + dy][x + dx] != "." for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))):
                ut[y][x] = "o"
    return ut


def hx(s): s = s.lstrip("#"); return tuple(int(s[i:i + 2], 16) for i in (0, 2, 4))


def teikn(im, g, x0, y0, spegl=False):
    for y, rad in enumerate(g):
        for x, c in enumerate(rad):
            if c != ".": im.putpixel((x0 + (len(rad) - 1 - x if spegl else x), y0 + y), hx(PAL[c]) + (255,))


# Skuldervriing i steget (som Locke): overkroppen flyttar seg éin piksel mot armen som svingar fram.
VRI = {"ned1": 1, "ned2": -1, "opp1": -1, "opp2": 1}


def vri(g, dx):
    ut = list(g)
    for y in range(11, 17):
        r = g[y]
        ut[y] = ("." + r[:-1]) if dx > 0 else (r[1:] + ".")
    return ut


def ramme(namn):
    g = R[namn]
    if namn in VRI: g = vri(g, VRI[namn])
    assert len(g) == H and all(len(r) == W for r in g), (namn, [len(r) for r in g])
    return omriss(g)


def lag():
    im = Image.new("RGBA", (W * 3, H * 8), (0, 0, 0, 0))
    for d, pre in enumerate(("ned", "opp", "side")):
        for s in range(3): teikn(im, ramme(f"{pre}{s}"), s * W, d * H)
    for s in range(3): teikn(im, ramme(f"side{s}"), s * W, 3 * H, spegl=True)
    for n, namn in enumerate(("atak", "galdr", "skadd")): teikn(im, ramme(namn), n * W, 4 * H)
    teikn(im, ramme("svak"), 0, 5 * H)
    # slått ut: sida rotert
    g = [r[:] for r in R["side0"]]
    rot = [[g[H - 1 - x][y] for x in range(H)] for y in range(W)]
    rot = [["." if c in "o" else c for c in r] for r in rot]
    for y, r in enumerate(rot):
        for x, c in enumerate(r):
            if c == "o": rot[y][x] = "h"                                # attlatne auge
    teikn(im, omriss(rot), W, 5 * H + 8)
    for n, namn in enumerate(("latter", "sjokk", "sorg")): teikn(im, ramme(namn), n * W, 6 * H)
    for n, namn in enumerate(("tenkje", "ivrig", "les")): teikn(im, ramme(namn), n * W, 7 * H)
    return im


if __name__ == "__main__":
    lag().save(UT); print("bilete/spel/figurar/ivar.png")
