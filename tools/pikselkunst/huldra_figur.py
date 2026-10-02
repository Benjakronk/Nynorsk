"""Huldra, handteikna figurark (16 x 24 per ramme), etter Terra og Celes i Final Fantasy VI.

- Håret til Celes: langt og gyllent, dekkjer heile ryggen, lokkar langs andletet ned til
  brystet, taggete lugg. Ein blome der Terra har sløyfa.
- Kroppen til Terra: fiolett sjal med spissar over skuldrene, grønt liv, gullbelte, stutt
  skjørt med gullborde, berre bein og føter. Kuhala heng under skjørtet bak.
- Kamp: ho slær med strak arm fram, og i galdr breier ho ut armane og syng.
- Kjensler: fnis (handa for munnen), sjokk, sorg, tenkjer (finger mot leppa), lokk (hendene
  rundt munnen, kulokk) og sjenert (raudme, blikket til sida).

  python tools/pikselkunst/huldra_figur.py      skriv bilete/spel/figurar/huldra.png
"""
import os

ROT = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(ROT, "..", "..", "bilete", "spel", "figurar", "huldra.png")

PAL = {
    "o": "#180f18",
    "R": "#fae68e", "r": "#dcb452", "Q": "#b88a3a", "y": "#9a6a2a",   # hår (den mørke er delt med kvisten)
    "H": "#fde2c4", "h": "#f0b88e", "j": "#c07860",    # hud
    "E": "#2e7a52",                                   # grøne auge
    "m": "#c8585a", "p": "#f09a9a",                   # munn, raudme
    "L": "#9a80d8", "l": "#5e4aa0",                   # fiolett sjal
    "G": "#74b25e", "g": "#3e7c40", "d": "#245030",    # grøn kjole
    "W": "#f6f2e8",                                   # kvite ermar og blomeblad
    "Y": "#eac24a",                                   # gull
    "F": "#f6a2c4",                                   # blome
    "T": "#8ac8f0",                                   # tåre
}

R = {}
R["ned0"] = [
    "................",
    ".....rRRRr......",
    "...rrRRRRRrFW...",
    "..rRRRRRRrrrF...",
    "..rRRRrrrrrrry..",
    ".rRRrRrrrrRrry..",
    ".rRrhRrrhrrRry..",
    ".rrhHHhhhhhhry..",
    ".rrhHohhhhohry..",
    ".rrhHEhhhhEhry..",
    ".rrjhhhmhhhjry..",
    ".rr.jjhhhjj.ry..",
    ".rLLLlWWWlLLLy..",
    ".yLlGGGGGGGlLy..",
    "..hLGGgggGGGLh..",
    "..hhGGgggGGGhh..",
    "..jhYYYYYYYYhj..",
    "...gGGGggggggd..",
    "...GGGgggggggd..",
    "..gGGGgggggggdd.",
    "..YYYYYYYYYYYY..",
    ".....hh..hh.....",
    "....hhj..hhj....",
    "................",
]
R["ned1"] = [
    "................",
    ".....rRRRr......",
    "...rrRRRRRrFW...",
    "..rRRRRRRrrrF...",
    "..rRRRrrrrrrry..",
    ".rRRrRrrrrRrry..",
    ".rRrhRrrhrrRry..",
    ".rrhHHhhhhhhry..",
    ".rrhHohhhhohry..",
    ".rrhHEhhhhEhry..",
    ".rrjhhhmhhhjry..",
    "..r.jjhhhjj.ryy.",
    ".rLLLlWWWlLLLy..",
    ".yLlGGGGGGGlLy..",
    "..hLGGgggGGGL...",
    "..jhGGgggGGhh...",
    "...hYYYYYYhhj...",
    "...gGGGggggggd..",
    "...GGGgggggggd..",
    "..gGGGgggggggdd.",
    "..YYYYYYYYYYYY..",
    "....hh....hj....",
    "...hhhj.........",
    "................",
]
R["ned2"] = [
    "................",
    ".....rRRRr......",
    "...rrRRRRRrFW...",
    "..rRRRRRRrrrF...",
    "..rRRRrrrrrrry..",
    ".rRRrRrrrrRrry..",
    ".rRrhRrrhrrRry..",
    ".rrhHHhhhhhhry..",
    ".rrhHohhhhohry..",
    ".rrhHEhhhhEhry..",
    ".rrjhhhmhhhjry..",
    "yyr.jjhhhjj..y..",
    ".rLLLlWWWlLLLy..",
    ".yLlGGGGGGGlLy..",
    "...LGGgggGGGLh..",
    "...hhGgggGGGhj..",
    "...jhhYYYYYYh...",
    "...gGGGggggggd..",
    "...GGGgggggggd..",
    "..gGGGgggggggdd.",
    "..YYYYYYYYYYYY..",
    ".....hj....hh...",
    "..........hhhj..",
    "................",
]
R["opp0"] = [
    "................",
    ".....rRRRr......",
    "...rrRRRRRrFW...",
    "..rRRRRRRrrrF...",
    "..rRRRrrrrrrry..",
    ".rRRrrrrrrrrry..",
    ".rRrrrrrrrrrry..",
    ".rRrrrrrrrrrry..",
    ".rrrRrrrrrrrry..",
    ".rrrRrrrrrrrry..",
    ".rrrRrrrrrrryy..",
    "..rrRrrrrrrryy..",
    ".LLrRrrrrrrryLL.",
    ".hLrRrrrrrrryLh.",
    "..hrrRrrrrrryh..",
    "..hhrRrrrrryhh..",
    "..jYyrRrrrryYj..",
    "...gGyrrrryyd...",
    "...GGGyyyyggd...",
    "..gGGGgggggggd..",
    "..YYYYYhYYYYYY..",
    ".....hhhh.hh....",
    "....hhjrRrhhj...",
    "................",
]
R["opp1"] = [
    "................",
    ".....rRRRr......",
    "...rrRRRRRrFW...",
    "..rRRRRRRrrrF...",
    "..rRRRrrrrrrry..",
    ".rRRrrrrrrrrry..",
    ".rRrrrrrrrrrry..",
    ".rRrrrrrrrrrry..",
    ".rrrRrrrrrrrry..",
    ".rrrRrrrrrrrry..",
    ".rrrRrrrrrrryy..",
    ".rrrRrrrrrrryy..",
    ".LLrRrrrrrrryL..",
    ".hLrRrrrrrrryh..",
    "..hrrRrrrrrry...",
    "..hhrRrrrrryy...",
    "..jYyrRrrrryY...",
    "...gGyrrrryyd...",
    "...GGGyyyyggd...",
    "..gGGGgggggggd..",
    "..YYYYYYhYYYYY..",
    "....hh..hh.hj...",
    "...hhhj.rRr.....",
    "................",
]
R["opp2"] = [
    "................",
    ".....rRRRr......",
    "...rrRRRRRrFW...",
    "..rRRRRRRrrrF...",
    "..rRRRrrrrrrry..",
    ".rRRrrrrrrrrry..",
    ".rRrrrrrrrrrry..",
    ".rRrrrrrrrrrry..",
    ".rrrRrrrrrrrry..",
    ".rrrRrrrrrrrry..",
    "..rrRrrrrrrrry..",
    "..rrRrrrrrrryyy.",
    "..LrRrrrrrrryLL.",
    "..hrRrrrrrrryLh.",
    "...rrRrrrrrryh..",
    "...yrRrrrrryhh..",
    "...YyrRrrrryYj..",
    "...gGyrrrryyd...",
    "...GGGyyyyggd...",
    "..gGGGgggggggd..",
    "..YYYYYhYYYYYY..",
    "....hj..hh..hh..",
    ".......rRr.hhhj.",
    "................",
]
R["side0"] = [
    "................",
    "......rRRRr.....",
    ".....rRRRRRrFW..",
    "....rRRRRRrrrF..",
    "...rRRRrrrrrrry.",
    "..rRRrrrrrrrrry.",
    "..hhRrrrrrrrrry.",
    ".hHHhrrrrrrrrry.",
    ".hHohhrrrrrrry..",
    ".hHEhhjrrrrrry..",
    "..hmhhjrrrrrrry.",
    "...jjhjrrrrrrry.",
    "...LLLLlrrrrry..",
    "..LLlGGGlrrryy..",
    "...hGGGGgrryy...",
    "...hGGGGgyy.....",
    "...jYYYYYYd.....",
    "...gGGGgggd.....",
    "..gGGGggggd.....",
    "..gGGGgggggd.h..",
    "..YYYYYYYYYY.h..",
    "....hh.hj...rRy.",
    "...hhhhhhj..yy..",
    "................",
]
R["side1"] = [
    "................",
    "................",
    "......rRRRr.....",
    ".....rRRRRRrFW..",
    "....rRRRRRrrrF..",
    "...rRRRrrrrrrry.",
    "..rRRrrrrrrrrry.",
    "..hhRrrrrrrrrry.",
    ".hHHhrrrrrrrrrry",
    ".hHohhrrrrrrrry.",
    ".hHEhhjrrrrrrry.",
    "..hmhhjrrrrrrry.",
    "...jjhjrrrrrryy.",
    "...LLLLlrrrryy..",
    "..LLlGGGlrryy...",
    "...GGGGGghhj....",
    "...jYYYYYhj.....",
    "...gGGGgggd.....",
    "..gGGGggggd.....",
    ".gGGGggggggd.h..",
    ".YYYYYYYYYYY.hh.",
    "..hh.....hj..rRy",
    ".hhh......hhj.y.",
    "................",
]
R["side2"] = [
    "................",
    "................",
    "......rRRRr.....",
    ".....rRRRRRrFW..",
    "....rRRRRRrrrF..",
    "...rRRRrrrrrrry.",
    "..rRRrrrrrrrrry.",
    "..hhRrrrrrrrrry.",
    ".hHHhrrrrrrrrrry",
    ".hHohhrrrrrrrry.",
    ".hHEhhjrrrrrrry.",
    "..hmhhjrrrrrrry.",
    "...jjhjrrrrrryy.",
    "...LLLLlrrrryy..",
    "..LLlGGGlrryy...",
    "..hhGGGGgry.....",
    "..hjYYYYYYd.....",
    "...gGGGgggd.....",
    "..gGGGggggd.....",
    ".gGGGggggggd.h..",
    ".YYYYYYYYYYY.h..",
    "...hj.....hh.rRy",
    "..........hhhjy.",
    "................",
]
# Kamp (mot venstre): slag med bjørkekvist, galdr, skadd, svak
R["atak"] = list(R["side2"])          # slag med strak arm fram (sjølve slaget er ein effekt i kampen)
R["atak"][14] = "hhhhGGGGgrryy..."
R["atak"][15] = "hj.GGGGGgyy....."
R["atak"][16] = "...jYYYYYYd....."
R["galdr"] = [
    "................",
    "......rRRRr.....",
    ".....rRRRRRrFW..",
    "....rRRRRRrrrF..",
    "...rRRRrrrrrrry.",
    "..rRRrrrrrrrrry.",
    "..hhRrrrrrrrrry.",
    ".hHHhrrrrrrrrry.",
    ".hHohhrrrrrrry..",
    ".hHEhhjrrrrrry..",
    "..hohhjrrrrrrry.",
    "hh.jjhjrrrrrrry.",
    "hhLLLLlrrrrryhh.",
    ".LLlGGGGlrrryhh.",
    "...GGGGGgrryL...",
    "...GGGGGgyy.....",
    "...jYYYYYYd.....",
    "...gGGGgggd.....",
    "..gGGGggggd.....",
    "..gGGGgggggd.h..",
    "..YYYYYYYYYY.h..",
    "....hh.hj...rRy.",
    "...hhhhhhj..yy..",
    "................",
]
R["skadd"] = [
    "................",
    "................",
    "........rRRRr...",
    ".......rRRRRRrFW",
    "......rRRRRRrrrF",
    ".....rRRRrrrrrry",
    "....rRRrrrrrrrry",
    "....hhRrrrrrrrry",
    "...hHHhrrrrrrrry",
    "...hHjjhrrrrrry.",
    "...hHhhhjrrrrry.",
    "....hohhjrrrrry.",
    ".....jjhjrrrrry.",
    ".....LLLLlrrryhh",
    "....LLlGGGlrryhj",
    ".....GGGGGgry...",
    ".....jYYYYYd....",
    ".....gGGGggd....",
    "....gGGGgggd....",
    "....gGGGggggd.h.",
    "....YYYYYYYYY.h.",
    ".....hh..hj..rRy",
    "....hhh..hhj.yy.",
    "................",
]
R["svak"] = [
    "................",
    "................",
    "................",
    "................",
    "......rRRRr.....",
    ".....rRRRRRrFW..",
    "....rRRRRRrrrF..",
    "...rRRRrrrrrrry.",
    "..rRRrrrrrrrrry.",
    "..hhRrrrrrrrrry.",
    ".hHHhrrrrrrrrry.",
    ".hHhhhrrrrrrry..",
    ".hjjhhjrrrrrry..",
    "..hmhhjrrrrrrry.",
    "...jjhjrrrrrrry.",
    "...LLLLlrrrrry..",
    "..LLlGGGlrrryy..",
    "...GhhGGgrryy...",
    "...jYYYYYYd.....",
    "..gGGGggggggd...",
    ".gGGGgggggggdd..",
    ".YYYYYYYYYYYY.h.",
    "..hhhh...hhhhrRy",
    "................",
]
# Kjensler (mot oss)
R["fnis"] = [
    "................",
    ".....rRRRr......",
    "...rrRRRRRrFW...",
    "..rRRRRRRrrrF...",
    "..rRRRrrrrrrry..",
    ".rRRrRrrrrRrry..",
    ".rRrhRrrhrrRry..",
    ".rrhHHhhhhhhry..",
    ".rrhHHhhhhhhry..",
    ".rrhjjjhhjjjry..",
    ".rrjhphhhhphry..",
    ".rr.jjhhhjj.ry..",
    ".rLLLlWhhhLLLy..",
    ".yLlGGGhhjGlLy..",
    "..hLGGgjGGGGLh..",
    "..hhGGgggGGGhh..",
    "..jhYYYYYYYYhj..",
    "...gGGGggggggd..",
    "...GGGgggggggd..",
    "..gGGGgggggggdd.",
    "..YYYYYYYYYYYY..",
    ".....hh..hh.....",
    "....hhj..hhj....",
    "................",
]
R["sjokk"] = [
    "................",
    ".....rRRRr......",
    "...rrRRRRRrFW...",
    "..rRRRRRRrrrF...",
    "..rRRRrrrrrrry..",
    ".rRRrRrrrrRrry..",
    ".rRrhRrrhrrRry..",
    ".rrhooHhhoohry..",
    ".rrhoWhhhoWhry..",
    ".rrhoEhhhoEhry..",
    ".rrjhhhmhhhjry..",
    ".rr.jjhmhjj.ry..",
    "hhLLLlWWWlLLLyhh",
    "hLLlGGGGGGGlLLLh",
    ".LLLGGgggGGGLL..",
    "...LGGgggGGGL...",
    "...hYYYYYYYYh...",
    "...gGGGggggggd..",
    "...GGGgggggggd..",
    "..gGGGgggggggdd.",
    "..YYYYYYYYYYYY..",
    ".....hh..hh.....",
    "....hhj..hhj....",
    "................",
]
R["sorg"] = [
    "................",
    "................",
    ".....rRRRr......",
    "...rrRRRRRrFW...",
    "..rRRRRRRrrrF...",
    "..rRRRrrrrrrry..",
    ".rRRrrrrrrrrry..",
    ".rRrrrrrrrrrry..",
    ".rRrhRrrhrrRry..",
    ".rrhhhhhhhhhry..",
    ".rrhjjhhhjjhry..",
    ".rrjhhhhhhhjry..",
    ".rr.jjhmhjj.ry..",
    ".rLLLlWWWlLLLy..",
    ".yLlGGGGGGGlLy..",
    "..hLGGgggGGGLh..",
    "..hhGYYYYYYGhh..",
    "..jhgGGgggggdj..",
    "...GGGgggggggd..",
    "..gGGGgggggggdd.",
    "..YYYYYYYYYYYY..",
    ".....hh..hh.....",
    "....hhj..hhj....",
    "................",
]
R["tenkje"] = [
    "................",
    ".....rRRRr......",
    "...rrRRRRRrFW...",
    "..rRRRRRRrrrF...",
    "..rRRRrrrrrrry..",
    ".rRRrRrrrrRrry..",
    ".rRrhRrrhrrRry..",
    ".rrhHoHhhhoHry..",
    ".rrhHEhhhhEhry..",
    ".rrhHhhhhhhhry..",
    ".rrjhhhmhhhjry..",
    ".rr.jjhhhjh.ry..",
    ".rLLLlWWWlhhLy..",
    ".yLlGGGGGGGhLy..",
    "..hLGGgggGGhLh..",
    "..hhGGgggGGGhh..",
    "..jhYYYYYYYYhj..",
    "...gGGGggggggd..",
    "...GGGgggggggd..",
    "..gGGGgggggggdd.",
    "..YYYYYYYYYYYY..",
    ".....hh..hh.....",
    "....hhj..hhj....",
    "................",
]
R["lokk"] = [
    "................",
    ".....rRRRr......",
    "...rrRRRRRrFW...",
    "..rRRRRRRrrrF...",
    "..rRRRrrrrrrry..",
    ".rRRrRrrrrRrry..",
    ".rRrhRrrhrrRry..",
    ".rrhHHhhhhhhry..",
    ".rrhjjhhhjjhry..",
    ".rrhHhhhhhhhry..",
    ".rrjhhhhhhhjry..",
    ".rr.hhhhhhh.ry..",
    ".rLhhhooohhhLy..",
    ".yLlhhhhhhhlLy..",
    "..hLGGgggGGGLh..",
    "...LGGgggGGGL...",
    "...hYYYYYYYYh...",
    "...gGGGggggggd..",
    "...GGGgggggggd..",
    "..gGGGgggggggdd.",
    "..YYYYYYYYYYYY..",
    ".....hh..hh.....",
    "....hhj..hhj....",
    "................",
]
R["sky"] = [
    "................",
    ".....rRRRr......",
    "...rrRRRRRrFW...",
    "..rRRRRRRrrrF...",
    "..rRRRrrrrrrry..",
    ".rRRrRrrrrRrry..",
    ".rRrhRrrhrrRry..",
    ".rrhHHhhhhhhry..",
    ".rrhoHhhhohhry..",
    ".rrhEHhhhEhhry..",
    ".rrjpphmhpphry..",
    ".rr.jjhhhjj.ry..",
    ".rLLLlWWWlLLLy..",
    ".yLlGGGGGGGlLy..",
    "..hLGGgggGGGLh..",
    "...LGhhhhhGGL...",
    "...hYYhhYYYYh...",
    "...gGGGggggggd..",
    "...GGGgggggggd..",
    "..gGGGgggggggdd.",
    "..YYYYYYYYYYYY..",
    "......hh.hh.....",
    ".....hhj.hhj....",
    "................",
]

# Hårstrå: mørke og lyse striper nedover håret (som hos Celes), så det ikkje blir ei flat flate.
def _straa(g, fro):
    ut = [list(r) for r in g]
    for y in range(2, 20):
        for x in range(1, 15):
            if g[y][x] != "r" or g[y][x - 1] not in "rRy" or g[y][x + 1] not in "rRy": continue
            if (x + fro + (y // 6)) % 4 == 0: ut[y][x] = "Q"
            elif (x + fro + (y // 6)) % 4 == 2 and y % 3 != 0: ut[y][x] = "R"
    return ["".join(r) for r in ut]


for _n in list(R): R[_n] = _straa(R[_n], {"ned1": 1, "ned2": 3, "opp1": 1, "opp2": 3, "side1": 1, "side2": 3}.get(_n, 0))

# Nye standardkjensler: sint (hendene på hofta, bryn ned) og nikk (hovudet ned, smil).
R["sint"] = list(R["ned0"])
R["sint"][7] = ".rryHHhhhhhyry.."
R["sint"][8] = ".rrhyohhhhoyry.."
R["sint"][10] = ".rrjhhjjjhhjry.."
R["nikk"] = list(R["sorg"])
R["nikk"][12] = ".rr.jmhhhmj.ry.."
R["trist"] = list(R["sorg"])
R["trist"][11] = ".rrjhhhhhhTjry.."
R["glad"] = R["fnis"]

# Posar i scener (rad 9 til 12): knele, sitje og peike, same mål som i figur.py. Framanfrå og
# bakfrå søkk ho tre rader når ho sit og fem når ho kneler (bøygd hovud, kortare overkropp).
# Det stutte skjørtet breier seg ut når ho kneler, med kneet og leggen under. Når ho sit, kviler
# hendene på knea. Kneling frå sida er kroppen frå «svak» med hovudet éi rad lågare og blikket ned.
from handfigur import senk, peik_ut, set_saman, ned_blikk
R["knele_ned"] = ned_blikk(set_saman(R["ned0"], 5, 11, {17: 12, 18: 13, 19: 16, 20: 19,
    21: ".YYYYYYYYYYYYYY.", 22: ".hhj.....jhhj..."}), 13)
R["knele_opp"] = set_saman(R["opp0"], 5, 11, {17: 12, 18: 13, 19: 16, 20: 19,
    21: ".YYYYYYhYYYYYYY.", 22: "..hhj...jhhrRr.."})
R["knele_side"] = ned_blikk(senk(R["side0"], 11, 4)[:16] + R["svak"][16:], 12)
R["sitje_ned"] = set_saman(R["ned0"], 3, 15, {19: "..hhYYYYYYYYhh..", 20: "..ghhGgggggghjd.",
    21: ".YYYYYYYYYYYYYY.", 22: "...jhhj..jhhj..."})
R["sitje_opp"] = set_saman(R["opp0"], 3, 15, {19: "...YyrRrRrQyY...", 20: "..gGGGgggggggdd.",
    21: ".YYYYYYhYYYYYYY.", 22: "....hj.rRr.hj..."})
R["sitje_side"] = set_saman(R["side0"], 3, 14, {18: "...jYYYYYYd.....", 19: "..gGGGGggggd....",
    20: ".hYYYYYYYYYd.h..", 21: ".hj.........rRy.", 22: "hhj..........y.."})
R["peike_ned"] = peik_ut(R["ned0"], 14, 16, "hj", "Lhhh", "hjj")
R["peike_opp"] = peik_ut(R["opp0"], 14, 16, "hj", "Lhhh", "hjj")
_p = list(R["side0"])
_p[13] = ".hhhLlGGlrQryy.."
_p[14] = "..jjGGGGgrQyy..."
_p[15] = "...GGGGGgyy....."
_p[16] = "...YYYYYYYd....."
R["peike_side"] = _p

# Standardkjenslene (same for alle figurar) og så huldra sine eigne.
KJENSLER = ("glad", "trist", "sint", "sjokk", "tenkje", "nikk", "lokk", "sky")


def lag():
    import handfigur
    return handfigur.lag(R, PAL, KJENSLER)


if __name__ == "__main__":
    lag().save(UT); print("bilete/spel/figurar/huldra.png")
