"""Ivar, handteikna figurark (16 x 24 per ramme), etter Locke i Final Fantasy VI.

Hovudpersonen får eige ark i staden for malen i figur.py, så han kan få meir personlegdom:
- Proporsjonar som Locke: hovudet om lag 11 rader, lengre bein og armar.
- Stramt fargeutval (om lag 16 fargar) der dei mørke tonane er delte mellom hår, klede og sko.
- Kjenneteikn: ein hårvirvel som stikk opp, fjørpenn bak øyret, sekk med reimar, og ein
  hasselkjepp i kampen.
- Gange som Locke: neven kjem stort fram framfor magen, armen bak forsvinn, beinet bak
  blir bøygd og løfta. Frå sida søkk kroppen i steget. Håret sprett litt (virvel og lugg)
  i gangen opp og ned. (Skuldervriing vart prøvd, men såg ut som dans, og er teken bort.)
- Kjensler: latter (handa bak hovudet), sjokk, sorg, tenkjer, ivrig og les i ei bok.

Arket (48 x 312): rad 0 til 3 gange (ned, opp, venstre, høgre), rad 4 åtak, galdr, skadd,
rad 5 svak og slått ut (24 x 16), rad 6 til 8 kjensler, rad 9 til 12 posane (knele, sitje, peike).

  python tools/pikselkunst/ivar_figur.py        skriv bilete/spel/figurar/ivar.png
"""
import os

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
    "T": "#8ac8f0",                                   # tåre
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


# Håret sprett litt i gangen opp og ned: virvelen og luggen flyttar seg éin piksel
# i takt med stega, så hovudet ser levande ut sjølv om kroppen er roleg.
def _sprett(namn, virvel, lugg):
    g = list(R[namn]); g[1], g[2] = virvel; g[6] = lugg; R[namn] = g
_sprett("ned1", (".....rRRr.qr....", "....rRRRRrqrr..."), "..rrqhrrhhrrqq..")
_sprett("ned2", (".....rRRr...qr..", "....rRRRRrrrqr.."), "..rrqhhrhrrqrq..")
_sprett("opp1", (".....rRRr.qr....", "....rRRRRrqrr..."), R["opp1"][6])
_sprett("opp2", (".....rRRr...qr..", "....rRRRRrrrqr.."), R["opp2"][6])

# Nye standardkjensler: sint (bryna ned mot nasen, stram munn) og nikk (hovudet ned, roleg).
R["sint"] = list(R["ned0"])
R["sint"][7] = "..rqoHHhhhhoqq.."
R["sint"][8] = "..qhooHhhoohhq.."
R["sint"][10] = "...jhhoooohj...."
R["nikk"] = list(R["sorg"])
R["nikk"][12] = "....jjmmmmj....."
R["trist"] = list(R["sorg"])
R["trist"][11] = "...jjhhhhhTj...."
R["trist"][12] = "....jmhhhmj....."
R["glad"] = R["latter"]

# Posar i scener (rad 9 til 12): knele, sitje og peike, same mål som i figur.py. Framanfrå og
# bakfrå søkk den som sit tre rader, og den som kneler fem, med bøygd hovud og kortare overkropp.
# Kneling: eitt kne i golvet og det andre bøygd fram med handa på. Sitjing: korte, lyse lår
# med hendene på knea, leggane i skugge under. Bakfrå: sålen i golvet eller leggane under setet.
# Frå sida er kneling kroppen frå «svak» med hovudet éi rad lågare og blikket ned.
from handfigur import senk, peik_ut, set_saman, ned_blikk
R["knele_ned"] = ned_blikk(set_saman(R["ned0"], 5, 11, {17: 12, 18: 13, 19: ".hhaqqqgqqqqaz..",
    20: ".BBBqbbbbbbqaz..", 21: ".BBbq..Bbbq.hj..", 22: ".qqqq..bqqq....."}), 13)
R["knele_opp"] = set_saman(R["opp0"], 5, 11, {17: 12, 18: 13, 19: 15, 20: "..hhBBbbbbbbqhh.",
    21: "..Bbq...Bbbq....", 22: ".kKKk....qqq...."})
R["knele_side"] = ned_blikk(senk(R["side0"], 11, 4)[:16] + R["svak"][16:], 12)
R["sitje_ned"] = set_saman(R["ned0"], 3, 15, {19: "..Aaqqqgqqqqaz..", 20: "..ahhBBbBBBhjz..",
    21: "...bbqq.bbqq....", 22: "...qqqq.qqqq...."})
R["sitje_opp"] = set_saman(R["opp0"], 3, 15, {19: "...akkkkkkkkz...", 20: "..BBBBbbbbbbqq..",
    21: "....qbq..qbq....", 22: "....qq....qq...."})
R["sitje_side"] = set_saman(R["side0"], 3, 14, {18: "....AAAazKKKk...", 19: "...hhjqqqKkk....",
    20: "..BBBBbbbbbbq...", 21: "..Bbq...........", 22: ".qqqq..........."})
R["peike_ned"] = peik_ut(R["ned0"], 13, 17, "Aazhj", "Aahh", "azj")
R["peike_opp"] = peik_ut(R["opp0"], 13, 17, "Aazhj", "Aahh", "az")
_p = list(R["side0"])
_p[13] = ".hhhAAAaKKKKk..."
_p[14] = "...jaaaaaKkkk..."
_p[15] = "....AaaaaKKKk..."
_p[16] = "....qqqqqKkk...."
_p[17] = ".....bbbbbbq...."
R["peike_side"] = _p

# Standardkjenslene (same for alle figurar) og så Ivar sine eigne.
KJENSLER = ("glad", "trist", "sint", "sjokk", "tenkje", "nikk", "ivrig", "les")


def lag():
    import handfigur
    return handfigur.lag(R, PAL, KJENSLER)


if __name__ == "__main__":
    lag().save(UT); print("bilete/spel/figurar/ivar.png")
