"""Glødformer til lyset i spelet (lys() i js/rpg/motor.js), teikna for hand per lyskjelde.

Som i Final Fantasy VI er gløden rundt eld og lamper ei hardkanta form i to til tre trinn, malt for
hand og tilpassa kjelda: eldlyset frå grua ligg lågt og breitt over golvet og kastar lys opp på
veggen ved sida, eit stearinlys har ein smal og høg glød, ei lykt lyser ned på bakken under seg,
lysekrona lyser ned på golvet. Overgangane har handplasserte dither-pikslar, ikkje eit utrekna
mønster. Kvar form har to eller tre flimmerbilete der forma endrar seg litt (elden meir enn ljos
og lykter), og motoren byter bilete i same takt som elden (150 ms).

Biletet er data, ikkje grafikk: fargen fortel trinnet (nivået) i gløden, og motoren reknar fargen
på pikslane under med innstillingane for nivået (RPGData.STEMNINGAR, glod). Rammene ligg side om
side. Ankeret (der lyskjelda er) er den magenta pikselen i den første ramma.

  .  ingen glød           1  ytste trinnet (#603018)
  2  midtre trinnet (#b06020)    3  kjernen (#f8b040)    @  ankeret, i kjernen (#ff00ff)

Teikneverktøya (koordinatar relativt til ankeret, x mot høgre og y nedover):
  G.rader(nivå, [(y, x0, x1), ...])   fyll rad y frå x0 til x1 (med begge)
  G.profil(nivå, y0, [b, ...])        symmetrisk rundt ankeret: halvbreidda b for rad y0, y0+1, ...
  G.prikk(nivå, [(x, y), ...])        handplasserte dither-pikslar (speil=True: òg på andre sida)
Eit høgare nivå vinn over eit lågare.

  python tools/pikselkunst/glod.py alle      skriv kjelder/lys-<namn>.pix og bilete/spel/lys/<namn>.png
  python tools/pikselkunst/glod.py grue lys  berre desse
  python tools/pikselkunst/glod.py ark       førehandsvising i forhand/lys-ark.png (alle rammene)

Kjelda er dette skriptet. .pix-filene blir skrivne på nytt kvar gong.
"""
import os, sys, subprocess

ROT = os.path.dirname(os.path.abspath(__file__))
PROSJEKT = os.path.abspath(os.path.join(ROT, "..", ".."))
FARGE = {1: "#603018", 2: "#b06020", 3: "#f8b040"}


class Glod:
    def __init__(s):
        s.g = {}                                   # (x, y) -> nivå

    def sett(s, x, y, v):
        if v > s.g.get((x, y), 0): s.g[(x, y)] = v

    def rader(s, v, rader):
        for y, x0, x1 in rader:
            for x in range(x0, x1 + 1): s.sett(x, y, v)

    def profil(s, v, y0, breidder):
        for i, b in enumerate(breidder):
            if b is not None and b >= 0: s.rader(v, [(y0 + i, -b, b)])

    def prikk(s, v, pts, speil=False):
        for x, y in pts:
            s.sett(x, y, v)
            if speil: s.sett(-x, y, v)

    def tak(s, pts):
        """Tek bort pikslar (hakk i kanten)."""
        for p in pts: s.g.pop(p, None)


# ---------------------------------------------------------------- stearinlys
def lys(r):
    """Stearinlys i ein messingstake på golvet (flisa L inne). Ankeret er i flammen; foten står
    om lag 10 pikslar under. Smal og høg glød rundt flammen, og ein liten pøl på golvet."""
    G = Glod()
    topp = [0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5] if r == 0 else [None, 0, 1, 1, 2, 3, 3, 3, 4, 4, 5, 5]
    G.profil(1, -12, topp + [5, 5, 5, 5, 5, 6, 7, 8, 9, 10, 11, 12, 12, 12, 11, 10, 8, 6, 3])
    G.profil(2, -9, ([0, 1, 1, 2, 2, 2, 3, 3, 3] if r == 0 else [None, 0, 1, 1, 2, 2, 3, 3, 3])
             + [3, 3, 3, 3, 3, 3, 3, 4, 5, 6, 7, 8, 8, 7, 6, 4])
    G.profil(3, -7, [0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1] if r == 0 else [None, 0, 0, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1])
    # Dither i kanten, sett for hand: tettast der pølen møter golvet, glissen oppe ved flammen.
    G.prikk(1, [(-7, 3), (-6, -4), (-14, 10), (-14, 12), (-13, 14), (-11, 16), (-9, 17), (-5, 19), (-1, 19)], speil=True)
    G.prikk(1, [(0, -14)] if r == 0 else [(-1, -13), (1, -14)])
    G.prikk(2, [(-7, 8), (-10, 12), (-8, 14), (-4, -5)] if r == 0 else [(-7, 9), (-10, 11), (-9, 14), (-4, -4)], speil=True)
    G.prikk(3, [(-4, -1), (-3, -5)] if r == 0 else [(-4, 0), (-3, -4)], speil=True)
    return G


# ---------------------------------------------------------------- lykt på stolpe
def lykt(r):
    """Lykt på ein stolpe ute (flisa L ute og T). Ankeret er midt i lykta, og foten av stolpen står
    11 pikslar under. Rund glorie rundt lykta, smal midje langs stolpen og ein flat pøl på bakken
    med ein sterk flekk rett under lykta."""
    G = Glod()
    G.profil(1, -16, [4, 7, 9, 11, 12, 13, 14, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 14, 13, 12, 12,
                      13, 15, 18, 21, 23, 25, 26, 27, 28, 28, 28, 27, 26, 24, 21, 17, 12, 5])
    G.profil(2, -12, [3, 5, 7, 8, 9, 10, 10, 10, 11, 11, 11, 11, 11, 11, 10, 10, 9, 7, 5, 5, 7, 10, 13, 15, 17, 18,
                      18, 18, 17, 16, 14, 11, 7])
    G.profil(3, -7, [2, 4, 5, 6, 6, 6, 6, 6, 6, 5, 4, 2] if r == 0 else [1, 3, 5, 5, 6, 6, 6, 6, 5, 5, 3, 1])
    G.profil(3, 11, [4, 7, 8, 7, 4] if r == 0 else [3, 6, 7, 6, 3])           # bakken rett under lykta
    G.prikk(1, [(-2, -17), (-9, -15), (-14, -12), (-17, -9), (-18, -5), (-18, 0), (-16, 4), (-14, 7), (-17, 9),
                (-23, 11), (-27, 13), (-29, 15), (-30, 17), (-28, 20), (-23, 22), (-19, 23), (-14, 25), (-7, 26),
                (-1, 26)], speil=True)
    G.prikk(2, [(-9, -10), (-12, -6), (-13, -1), (-12, 3), (-7, 6), (-12, 9), (-17, 11), (-20, 13), (-19, 16),
                (-16, 18), (-9, 20)] if r == 0 else
            [(-9, -11), (-12, -5), (-13, 0), (-12, 4), (-7, 7), (-12, 8), (-17, 10), (-20, 14), (-19, 17),
             (-15, 19), (-9, 21)], speil=True)
    G.prikk(3, [(-8, -4), (-8, 1), (-4, 4), (-10, 13), (-6, 16)] if r == 0 else
            [(-8, -3), (-7, 1), (-3, 4), (-9, 13), (-5, 16)], speil=True)
    return G


# ---------------------------------------------------------------- lysekrone
def krone(r):
    """Den store lysekrona i kyrkja (inne-lysekrone, 56 x 48, heng høgt med parallakse, sett ovanfrå). Ankeret
    er midt i messingkula (Pikslar.LJOS). Små, sterke gloriar rundt dei fjorten ljosa (plassane
    kjem frå KRONE_LJOS i inventar.py) og eit svakt skin rundt heile krona. Pølen på golvet er ei
    eiga form (kronegolv), fordi han ligg fast på golvet medan krona flyttar seg med parallaksen."""
    from inventar import lysekrone, KRONE_LJOS, KRONE_KJEDE
    lysekrone()
    ax, ay = 27, KRONE_KJEDE + 28
    G = Glod()
    # skinet rundt krona: ein flat oval kring kransane
    G.profil(1, -22, [6, 12, 16, 19, 21, 23, 24, 25, 26, 26, 27, 27, 27, 27, 26, 26, 25, 24, 22, 20, 18, 15, 12, 9, 5])
    for i, (x, y) in enumerate(KRONE_LJOS):
        x, y = x - ax, y - ay
        G.rader(1, [(y - 4, x, x), (y - 3, x - 1, x + 1), (y - 2, x - 2, x + 2), (y - 1, x - 3, x + 3),
                    (y, x - 3, x + 3), (y + 1, x - 2, x + 2), (y + 2, x - 1, x + 1)])
        flimmer = (i + r) % 3 == 0
        G.rader(2, [(y - 2, x, x), (y - 1, x - 1, x + 1), (y, x - 2, x + 2), (y + 1, x - 1, x + 1)] if not flimmer
                else [(y - 1, x, x), (y, x - 1, x + 1), (y + 1, x, x)])
        G.rader(3, [(y - 1, x, x), (y, x, x)] if not flimmer else [(y, x, x)])
    G.prikk(1, [(-28, -10), (-29, -6), (-29, -1), (-28, 3), (-24, 7), (-19, 9)] if r == 0
            else [(-28, -9), (-29, -5), (-29, 0), (-27, 4), (-23, 8), (-18, 9)], speil=True)
    G.sett(0, 0, 2)
    return G


def altar(r):
    """Altaret og altartavla (inne-altartavle, 88 x 112): ein brei, roleg glød over heile tavla og
    altaret, så dei er det lysaste i den mørke kyrkja (stemninga kyrkjerom). Ankeret er midt i
    hovudfeltet (44, 70 i biletet). Trinn 1 dekkjer tavla med vengene, altaret og golvet framfor,
    trinn 2 hovudetasjen, predellaen og altarduken. Ljosa har eigne gloriar (lys)."""
    G = Glod()
    b1 = [14, 20, 25, 29, 32, 35, 37, 39, 40, 41, 42, 43, 44, 44, 45, 45, 45, 45, 46, 46]
    G.profil(1, -68, b1 + [46] * 80 + [45, 44, 43, 41, 39, 36, 33, 29, 25, 20, 14])
    b2 = [10, 16, 20, 23, 25, 27, 28, 29, 30, 30, 31, 31, 31]
    G.profil(2, -44, b2 + [31] * 40 + [30, 29, 28, 27, 25, 23, 20, 17, 13, 8])
    G.prikk(1, [(-48, -20), (-48, 0), (-48, 20), (-47, 32), (-30, 38), (-10, 39)] if r == 0
            else [(-48, -18), (-48, 2), (-48, 22), (-47, 30), (-29, 39), (-9, 39)], speil=True)
    G.prikk(2, [(-33, -10), (-33, 8), (-32, 26), (-22, 30)] if r == 0 else [(-33, -8), (-33, 10), (-32, 24), (-21, 30)], speil=True)
    G.sett(0, 0, 2)
    return G


def kronegolv(r):
    """Lyspølen på golvet under lysekrona (ankeret er golvet midt under krona). Lågt og breitt,
    golvet sett på skrå, med handplasserte dither-pikslar i kanten. Ligg fast i kartet."""
    G = Glod()
    G.profil(1, -14, [12, 21, 27, 32, 35, 38, 40, 41, 42, 43, 43, 44, 44, 44, 44, 43, 43, 42, 41, 40, 38, 35, 32, 27, 21, 12])
    G.profil(2, -8, [10, 17, 21, 24, 26, 27, 28, 28, 28, 27, 26, 24, 21, 17, 10])
    G.prikk(1, [(-46, -3), (-47, 1), (-46, 5), (-40, 11), (-30, 13), (-16, 14), (-3, 15)] if r == 0
            else [(-46, -2), (-47, 2), (-45, 6), (-39, 12), (-29, 14), (-15, 15), (-2, 15)], speil=True)
    G.prikk(2, [(-30, -2), (-31, 1), (-29, 4), (-22, 8), (-12, 10)] if r == 0
            else [(-30, -1), (-31, 2), (-28, 5), (-21, 8), (-11, 10)], speil=True)
    return G


# ---------------------------------------------------------------- kakkelomn
def kakkelomn(r):
    """Kakkelomnen i prestegarden (24 x 48). Ankeret er nedst midt i omnsdøra; føtene står 8
    pikslar under. Glo i døra, ein varm glorie rundt omnskroppen og ei brei vifte ut over golvet."""
    G = Glod()
    # Trinn 1: glorien rundt omnskroppen (rad -26 til -4) og vifta på golvet (rad -3 til 25).
    G.profil(1, -26, [4, 8, 10, 11, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13,
                      14, 14, 15, 16, 18, 20, 23, 26, 29, 32, 35, 37, 39, 41, 42, 43, 44, 44, 44, 44, 43, 42, 40,
                      38, 35, 31, 26, 20, 12])
    # Trinn 2: rundt døra og vifta.
    G.profil(2, -14, [6, 8, 9, 9] + [10] * 10 + ([11, 12, 14, 16, 19, 22, 24, 26, 28, 29, 30, 31, 31, 31, 30, 29, 27,
                                                25, 22, 18, 13, 7] if r != 1 else
                                               [11, 12, 14, 17, 20, 23, 25, 27, 29, 30, 31, 32, 32, 32, 31, 30, 28,
                                                26, 23, 19, 14, 8]))
    # Kjernen: døra og glo som fell ut på golvet rett framfor.
    G.profil(3, -10, [4, 5, 5, 5, 5, 5, 5, 5, 5, 5] + ([6, 7, 9, 11, 13, 15, 16, 17, 17, 17, 16, 15, 13, 10, 6] if r == 0 else
                                                      [6, 8, 10, 12, 14, 16, 17, 18, 18, 18, 17, 16, 14, 11, 7] if r == 1 else
                                                      [5, 6, 8, 10, 12, 14, 15, 16, 16, 16, 15, 14, 12, 9, 5]))
    G.prikk(1, [(-15, -20), (-15, -10), (-16, -3), (-18, 0), (-22, 2), (-28, 4), (-34, 6), (-39, 8), (-43, 10),
                (-45, 12), (-46, 15), (-44, 18), (-40, 20), (-33, 22), (-22, 24), (-14, 26), (-4, 26)], speil=True)
    G.prikk(2, [(-12, -12), (-12, -4), (-14, 1), (-18, 3), (-24, 5), (-28, 7), (-31, 9), (-33, 12), (-31, 15),
                (-27, 17), (-20, 19), (-15, 20), (-3, 22)] if r != 1 else
            [(-12, -11), (-12, -3), (-14, 0), (-19, 3), (-25, 5), (-29, 7), (-32, 10), (-34, 13), (-32, 16),
             (-28, 18), (-21, 19), (-16, 21), (-4, 23)], speil=True)
    G.prikk(3, [(-7, -9), (-7, -3), (-8, 0), (-13, 3), (-17, 5), (-19, 8), (-17, 11), (-12, 13), (-4, 15)] if r != 2 else
            [(-7, -8), (-7, -2), (-8, 1), (-12, 3), (-16, 5), (-18, 8), (-16, 11), (-11, 13), (-3, 15)], speil=True)
    return G


# ---------------------------------------------------------------- peis
def peis(r):
    """Peisen i muren (flisa f). Ankeret er nedst midt i eldopninga. Lys opp på muren ved sida av
    opninga og ei låg, brei vifte ut over golvet."""
    G = Glod()
    # Trinn 1: muren ved sida (rad -14 til 0) og golvet framfor.
    G.profil(1, -15, [6, 12, 15, 17, 18, 19, 20, 20, 21, 21, 21, 22, 22, 22, 23, 24, 26, 28, 30, 32, 33, 34,
                      35, 35, 36, 36, 36, 35, 34, 33, 31, 28, 24, 19, 13, 6])
    G.profil(2, -10, [7, 10, 12, 13, 13, 14, 14, 14, 14, 15, 16, 18, 20, 22, 23, 24, 25, 25, 25, 24, 23, 21, 18, 14, 9, 3]
             if r != 2 else [6, 9, 11, 12, 13, 13, 14, 14, 14, 15, 16, 18, 20, 22, 24, 25, 26, 26, 25, 24, 22, 20, 17, 13, 8])
    G.profil(3, -8, [3, 4, 4, 5, 5, 5, 5, 5, 5, 6, 7, 9, 11, 12, 13, 13, 12, 11, 8, 4] if r == 0 else
             [None, 3, 4, 4, 5, 5, 5, 5, 5, 6, 8, 10, 12, 13, 14, 14, 13, 11, 9, 5] if r == 1 else
             [None, None, 3, 4, 4, 5, 5, 5, 5, 6, 7, 9, 10, 11, 12, 12, 11, 10, 7, 3])
    G.prikk(1, [(-8, -16), (-14, -15), (-19, -12), (-23, -8), (-24, -3), (-27, 1), (-31, 3), (-35, 6),
                (-37, 9), (-38, 12), (-37, 15), (-33, 18), (-27, 20), (-17, 21), (-8, 21)], speil=True)
    G.prikk(2, [(-9, -11), (-15, -6), (-16, -1), (-21, 2), (-25, 5), (-27, 8), (-26, 11), (-21, 14), (-12, 16)]
            if r != 2 else [(-8, -11), (-15, -5), (-16, 0), (-22, 3), (-26, 6), (-28, 9), (-26, 12), (-20, 14), (-10, 16)],
            speil=True)
    G.prikk(3, [(-7, -6), (-8, -1), (-13, 4), (-15, 7), (-12, 11)] if r != 1 else [(-7, -5), (-8, 0), (-14, 4), (-16, 8), (-12, 12)], speil=True)
    return G


# ---------------------------------------------------------------- grua i bondestova
def grue(r):
    """Den kvitkalka grua i hjørnet (inne-grue, 24 x 44). Ankeret er nedst midt i elden, og grua
    står inntil sideveggen til venstre. Lyset ligg lågt og breitt over golvet framfor grua, lyser
    opp kvitkalken, og kastar ein boge av lys opp på bakveggen til høgre for hetta."""
    G = Glod()
    # Trinn 1. Bakveggen til høgre (rad -29 til -14): bogen søkk mot høgre, bort frå elden.
    boge = [22, 28, 32, 36, 39, 42, 44, 46, 48, 50, 51, 53, 54, 55, 56, 57]
    if r == 1: boge = [None] + boge[1:]           # lyset på veggen pustar med elden
    if r == 2: boge = [24, 29, 33, 37, 40, 43, 45, 47, 49, 51, 52, 54, 55, 56, 57, 58]
    G.rader(1, [(-29 + i, 12 if i < 7 else -24, x1) for i, x1 in enumerate(boge) if x1])
    # Golvet ved sida av grua (rad -13 til -1) og framfor ho (rad 0 til 32).
    G.rader(1, [(-13 + i, -24, x1) for i, x1 in enumerate([58, 59, 59, 60, 60, 61, 61, 62, 62, 63, 63, 64, 64])])
    golv = [65, 65, 66, 66, 67, 67, 67, 68, 68, 68, 68, 68, 67, 67, 66, 66, 65, 64, 63, 61, 60, 58, 56, 54, 51, 48,
            45, 41, 37, 32, 27, 21, 14]
    venstre = [-24] * 21 + [-23, -22, -21, -19, -17, -15, -12, -9, -5, -1, 4, 9]
    G.rader(1, [(y, venstre[y], golv[y]) for y in range(33)])
    # Trinn 2: bakveggen nærast, kvitkalken, sideveggen og golvet framfor.
    G.rader(2, [(-27 + i, 12, x1) for i, x1 in enumerate([18, 22, 25, 27, 29, 31, 32, 33, 34])])
    G.rader(2, [(-18 + i, -20, x1) for i, x1 in enumerate([35, 35, 36, 36, 37, 37, 38, 38, 39, 39, 40, 40, 40, 41,
                                                           41, 41, 42, 42])])
    h2 = ([43, 44, 44, 45, 45, 46, 46, 46, 46, 46, 45, 44, 43, 42, 40, 38, 36, 33, 30, 26, 22, 17, 12] if r != 2 else
          [43, 44, 45, 45, 46, 46, 47, 47, 47, 47, 46, 45, 44, 43, 41, 39, 37, 34, 31, 27, 23, 19, 14])
    v2 = ([-21, -22, -22, -22, -22, -22, -22, -22, -22, -22, -22, -21, -20, -19, -17, -15, -13, -10, -7, -3, 1, 5, 10]
          if r != 2 else
          [-21, -22, -22, -22, -22, -22, -22, -22, -22, -22, -22, -22, -21, -20, -18, -16, -14, -11, -8, -4, 0, 4, 8])
    G.rader(2, [(y, v2[y], h2[y]) for y in range(len(h2))])
    # Trinn 3: elden og ein låg, brei pøl på hellene framfor.
    G.rader(3, [(-14, -6, 5)] + [(y, -7, 6) for y in range(-13, 0)])
    pol = {0: [(-11, 12), (-13, 15), (-14, 18), (-15, 20), (-16, 22), (-16, 23), (-16, 24), (-16, 24), (-15, 24),
               (-14, 23), (-12, 21), (-10, 19), (-7, 16), (-3, 12), (2, 7)],
           1: [(-11, 13), (-13, 16), (-15, 19), (-16, 21), (-17, 23), (-17, 24), (-17, 25), (-17, 25), (-16, 25),
               (-15, 24), (-13, 23), (-11, 21), (-8, 18), (-4, 14), (0, 10), (4, 6)],
           2: [(-10, 11), (-12, 14), (-13, 17), (-14, 19), (-15, 21), (-15, 22), (-15, 23), (-15, 23), (-14, 22),
               (-13, 21), (-11, 19), (-8, 16), (-5, 13), (0, 8)]}[r]
    G.rader(3, [(y, x0, x1) for y, (x0, x1) in enumerate(pol)])
    # Dither for hand: langs kanten av pølen, bogen på veggen og sideveggen.
    G.prikk(1, [(-21, 24), (-17, 26), (-11, 28), (-3, 30), (7, 32), (11, 33), (23, 31), (34, 29), (43, 27), (50, 25),
                (56, 23), (62, 20), (66, 17), (69, 13), (70, 9), (69, 5), (67, 1), (65, -3), (63, -8), (61, -12),
                (58, -15), (55, -18), (52, -20), (48, -22), (44, -24), (38, -26), (34, -27), (30, -28), (24, -29)]
            if r != 1 else
            [(-21, 23), (-16, 26), (-11, 29), (-2, 30), (6, 32), (12, 33), (24, 31), (35, 29), (44, 27), (51, 25),
             (57, 22), (62, 19), (66, 16), (69, 12), (70, 8), (69, 4), (67, 0), (65, -4), (63, -9), (61, -13),
             (58, -16), (55, -19), (52, -21), (48, -23), (44, -25), (39, -26), (34, -28), (30, -28)])
    G.prikk(2, [(11, 23), (-1, 20), (-9, 18), (-15, 16), (-19, 14), (-22, 12), (-24, 6), (19, 21), (28, 19), (35, 17),
                (40, 15), (44, 13), (46, 11), (48, 7), (45, 0), (43, -4), (41, -9), (39, -14), (37, -18), (34, -21),
                (31, -23), (27, -25), (20, -27)] if r != 2 else
            [(13, 24), (0, 21), (-8, 19), (-14, 17), (-18, 15), (-22, 13), (-24, 7), (21, 22), (29, 20), (36, 18),
             (41, 16), (45, 14), (47, 12), (49, 8), (45, 1), (43, -3), (41, -8), (39, -13), (37, -17), (34, -20),
             (31, -22), (27, -24), (20, -26)])
    G.prikk(3, [(-9, -3), (-9, -9), (-13, 0), (-17, 3), (-18, 6), (-16, 9), (-9, 12), (0, 14), (9, 14), (14, 13),
                (18, 12), (21, 11), (26, 8), (25, 5), (20, 2), (14, 0), (8, -4), (8, -11)] if r == 0 else
            [(-9, -2), (-9, -10), (-13, 1), (-18, 3), (-19, 6), (-17, 10), (-10, 13), (-2, 15), (8, 15), (15, 14),
             (19, 13), (23, 11), (27, 8), (26, 4), (21, 1), (15, 0), (8, -5), (8, -10)] if r == 1 else
            [(-9, -4), (-9, -8), (-12, 0), (-16, 3), (-17, 6), (-15, 9), (-8, 11), (2, 13), (10, 13), (15, 12),
             (19, 11), (22, 9), (25, 7), (24, 4), (19, 1), (13, 0), (8, -3), (8, -12)])
    return G


# ---------------------------------------------------------------- ljoset Ivar ber
def ivar(r):
    """Ljoset Ivar ber med seg i arkivet (stemninga mork). Ankeret er der han står (brystet).
    Ein rund lyssirkel i tre trinn, litt større nedover mot golvet, med dithera kantar."""
    G = Glod()
    # Halve sirklar for hand: halvbreidda per rad, frå toppen og ned.
    G.profil(1, -44, [7, 13, 17, 20, 23, 25, 27, 29, 31, 33, 34, 36, 37, 38, 40, 41, 42, 43, 44, 45, 45, 46,
                      47, 48, 48, 49, 49, 50, 50, 51, 51, 51, 52, 52, 52, 52, 53, 53, 53, 53, 53, 53, 53, 53, 53,
                      53, 53, 53, 53, 53, 53, 53, 53, 53, 52, 52, 52, 52, 51, 51, 51, 50, 50, 49, 49, 48, 48, 47,
                      46, 45, 45, 44, 43, 42, 41, 40, 38, 37, 36, 34, 33, 31, 29, 27, 25, 23, 20, 17, 13, 7])
    G.profil(2, -32, [6, 11, 15, 18, 20, 22, 24, 26, 27, 29, 30, 31, 32, 33, 34, 35, 36, 36, 37, 37, 38, 38, 38,
                      39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 38, 38, 38, 37, 37, 36, 36, 35, 34, 33, 32, 31,
                      30, 29, 27, 26, 24, 22, 20, 18, 15, 11, 6] if r == 0 else
             [5, 11, 15, 18, 20, 22, 24, 26, 27, 29, 30, 31, 32, 33, 34, 35, 36, 36, 37, 37, 38, 38, 38,
              39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 38, 38, 38, 37, 37, 36, 36, 35, 34, 33, 32, 31,
              30, 29, 28, 26, 24, 22, 20, 17, 14, 10, 4])
    G.profil(3, -20, [5, 10, 13, 15, 17, 19, 20, 21, 22, 22, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23,
                      23, 22, 22, 21, 20, 19, 17, 15, 13, 10, 5] if r == 0 else
             [4, 9, 13, 15, 17, 18, 20, 21, 21, 22, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 23, 23,
              23, 22, 21, 21, 20, 18, 17, 15, 12, 9, 4])
    G.prikk(1, [(-9, -45), (-19, -42), (-27, -39), (-35, -35), (-40, -31), (-44, -27), (-48, -22), (-50, -17),
                (-52, -12), (-54, -6), (-55, 0), (-55, 6), (-54, 12), (-53, 16), (-51, 21), (-49, 25),
                (-46, 29), (-42, 33), (-37, 37), (-32, 40), (-25, 42), (-15, 45), (-5, 46)], speil=True)
    G.prikk(2, [(-8, -33), (-17, -30), (-24, -26), (-29, -22), (-33, -18), (-36, -14), (-39, -9), (-41, -2),
                (-41, 4), (-40, 9), (-38, 13), (-35, 17), (-31, 21), (-24, 23), (-16, 25)] if r == 0 else
                [(-7, -33), (-18, -30), (-24, -27), (-30, -22), (-33, -17), (-37, -14), (-39, -8), (-41, -1),
                 (-41, 5), (-40, 8), (-37, 13), (-35, 18), (-30, 21), (-23, 23), (-14, 25)], speil=True)
    G.prikk(3, [(-7, -21), (-16, -18), (-20, -14), (-23, -10), (-26, -3), (-26, 3), (-24, 8), (-21, 12), (-15, 15)]
            if r == 0 else [(-6, -21), (-15, -18), (-21, -15), (-24, -9), (-26, -2), (-26, 4), (-24, 9), (-20, 12), (-14, 15)],
            speil=True)
    return G


# ---------------------------------------------------------------- skyskugge
def sky(r):
    """Skuggen av ei sky som driv over kartet om morgonen og kvelden (alle pikslane får nivået
    for skugge). Klumpete overkant, flatare underkant, dithera kant."""
    G = Glod()
    G.rader(1, [(-18, -10, 6), (-17, -14, 10), (-16, -16, 12), (-15, -38, -28), (-15, -18, 14), (-14, -42, -24),
                (-14, -19, 16), (-13, -45, 17), (-12, -47, 18), (-11, -49, 19), (-11, 30, 40), (-10, -50, 20),
                (-10, 27, 44), (-9, -51, 47), (-8, -52, 49), (-7, -52, 51), (-6, -53, 52), (-5, -56, 53),
                (-4, -59, 54), (-3, -61, 55), (-2, -62, 56), (-1, -63, 57), (0, -63, 57), (1, -64, 58),
                (2, -64, 58), (3, -64, 58), (4, -63, 58), (5, -63, 57), (6, -62, 56), (7, -60, 55), (8, -58, 54),
                (9, -55, 52), (10, -51, 50), (11, -46, 47), (12, -40, 43), (13, -33, 38), (14, -24, 31), (15, -14, 22),
                (16, -4, 12)])
    G.prikk(1, [(-8, -19), (2, -19), (-21, -14), (-34, -16), (-44, -15), (19, -13), (24, -11), (33, -12), (46, -10),
                (49, -8), (53, -6), (55, -4), (57, -2), (59, 0), (60, 3), (59, 6), (57, 8), (54, 10), (49, 12),
                (44, 13), (39, 14), (32, 15), (24, 16), (14, 17), (6, 17), (-6, 17), (-16, 16), (-26, 15),
                (-35, 14), (-42, 13), (-48, 12), (-53, 11), (-57, 9), (-60, 8), (-63, 6), (-65, 4), (-66, 2),
                (-65, -1), (-63, -3), (-60, -5), (-57, -6), (-54, -8), (-53, -10), (-51, -12), (-48, -13)])
    return G


# ---------------------------------------------------------------- dagslys i stabburet
def glugge(r):
    """Dagslys gjennom glugga i bakveggen på stabburet (inne-glugge, 24 x 16). Ankeret er midt i
    biletet; opninga er x -2 til 6, y -4 til 3. Sola står oppe til venstre, så strålen går skrått
    ned mot høgre gjennom lufta (svak, med ein smal kjerne) og blir ein lys flekk på golvet, som
    eit parallellogram litt større enn glugga. Rammene skil seg berre i nokre få støvkorn i strålen."""
    G = Glod()
    G.rader(3, [(y, -2, 6) for y in range(-4, 4)])                     # sjølve opninga
    for y in range(4, 22):                                             # strålen gjennom lufta
        s = (y - 4) // 2
        G.rader(1, [(y, -2 + s, 6 + s)])
        G.rader(2, [(y, 0 + s, 4 + s)])
    for y in range(20, 40):                                            # flekken på golvet
        s = (y - 4) // 2
        inn = 0 if y in (20, 39) else 1 if y in (21, 38) else 2
        G.rader(1, [(y, -5 + s + (1 if inn == 0 else 0), 9 + s - (1 if inn == 0 else 0))])
        if inn: G.rader(2, [(y, -4 + s, 8 + s)])
        if inn == 2: G.rader(3, [(y, -2 + s, 6 + s)])
    # dither i kanten av flekken, helst i hjørna, og ein glorie rundt opninga på veggen
    G.prikk(1, [(-3, 19), (0, 18), (13, 41), (17, 40), (-1, 21), (21, 37), (4, 40)])
    G.prikk(1, [(-3, -5), (7, -5), (-4, -2), (8, 1), (-3, 4), (8, -3)])
    G.prikk(2, [(-1, 23), (16, 37), (1, 24), (19, 35)])
    # støv som sviv i strålen
    G.prikk(3, [(3, 8), (6, 13), (5, 17)] if r == 0 else [(2, 10), (7, 12), (8, 18)])
    return G


def dor(r):
    """Dagslys inn gjennom døra på stabburet (flisa E på eit kart med dagslys i stemninga). Ankeret
    er midt i døropninga (x -6 til 5, y -8 til 4). Opninga lyser sjølv, og lyset fell inn over
    golvet framfor som ei vifte som blir breiare og svakare innover, med ein liten knekk mot høgre
    (sola oppe til venstre)."""
    G = Glod()
    G.rader(3, [(y, -6, 5) for y in range(-8, 5)])                     # opninga
    for i, y in enumerate(range(-9, -42, -1)):
        s = i // 6                                                     # vifta går litt mot høgre innover
        b1, b2, b3 = 8 + i * 2 // 5, 7 + i // 3, 6 + i // 4
        if i < 33: G.rader(1, [(y, -b1 + s, b1 - 1 + s)])
        if i < 26: G.rader(2, [(y, -b2 + s, b2 - 1 + s)])
        if i < 17: G.rader(3, [(y, -b3 + s, b3 - 1 + s)])
    G.prikk(1, [(-19, -36), (23, -38), (-14, -42), (2, -42), (14, -42), (-20, -30), (25, -33)])
    G.prikk(2, [(-14, -33), (17, -33), (-8, -35), (10, -35)])
    G.prikk(3, [(-10, -26), (12, -26), (-4, -27), (6, -27)])
    return G


# Rammer per glødform (sjå LYSKJELDER i js/rpg/data.js for rekkjefølgja i flimmeret).
FORMER = {"grue": (grue, 3), "kakkelomn": (kakkelomn, 3), "peis": (peis, 3), "lys": (lys, 2),
          "lykt": (lykt, 2), "krone": (krone, 2), "kronegolv": (kronegolv, 2), "altar": (altar, 2), "ivar": (ivar, 2), "sky": (sky, 1),
          "glugge": (glugge, 2), "dor": (dor, 1)}


def rammer(namn):
    fn, n = FORMER[namn]
    gs = [fn(r) for r in range(n)]
    xs = [x for G in gs for x, _ in G.g] + [0]; ys = [y for G in gs for _, y in G.g] + [0]
    x0, y0 = min(xs), min(ys)
    return gs, x0, y0, max(xs) - x0 + 1, max(ys) - y0 + 1


def lag(namn):
    gs, x0, y0, w, h = rammer(namn)
    linjer = [f"# namn: lys-{namn}", "# type: glod", f"# ut: bilete/spel/lys/{namn}.png", f"# storleik: {w}x{h}",
              f"# anker: {-x0},{-y0} (den magenta pikselen)", "# Laga av tools/pikselkunst/glod.py. Endre skriptet, ikkje denne fila.",
              "palett:", "  . = -"] + [f"  {v} = {FARGE[v]}" for v in (1, 2, 3)] + ["  @ = #ff00ff"]
    for i, G in enumerate(gs):
        linjer.append("bilete:" if i == 0 else f"bilete ramme{i + 1}:")
        for y in range(h):
            rad = ""
            for x in range(w):
                if (x + x0, y + y0) == (0, 0): rad += "@"
                else: rad += str(G.g.get((x + x0, y + y0), 0)).replace("0", ".")
            linjer.append("  " + rad)
    sti = os.path.join(ROT, "kjelder", f"lys-{namn}.pix")
    open(sti, "w", encoding="utf-8").write("\n".join(linjer) + "\n")
    subprocess.run([sys.executable, os.path.join(ROT, "pix.py"), "lag", sti], check=True)
    return sti


def ark():
    """Alle glødformene, kvar ramme for seg, over eit flatt, mørkt golv med fargane frå stemninga
    «inne» (lagt til i 5-bit som i spelet), fire gonger så store. Ankeret er kvitt."""
    from PIL import Image
    trinn = {0: (-5, -6, -4), 1: (-2, -4, -4), 2: (1, -1, -3), 3: (4, 2, -2)}
    rader = []
    for namn in FORMER:
        gs, x0, y0, w, h = rammer(namn)
        rad = Image.new("RGB", ((w + 8) * len(gs), h + 8), (14, 12, 18))
        for i, G in enumerate(gs):
            for y in range(h + 8):
                for x in range(w + 8):
                    gx, gy = x - 4 + x0, y - 4 + y0
                    gol = (128, 84, 48)
                    p = trinn[G.g.get((gx, gy), 0)]
                    c = tuple(max(0, min(31, (v >> 3) + d)) * 8 for v, d in zip(gol, p))
                    if (gx, gy) == (0, 0): c = (255, 255, 255)
                    rad.putpixel((i * (w + 8) + x, y), c)
        rader.append(rad)
    W = max(r.width for r in rader); H = sum(r.height for r in rader)
    ut = Image.new("RGB", (W, H), (14, 12, 18)); y = 0
    for r in rader: ut.paste(r, (0, y)); y += r.height
    ut = ut.resize((W * 4, H * 4), Image.NEAREST)
    sti = os.path.join(ROT, "forhand", "lys-ark.png"); ut.save(sti); return sti


if __name__ == "__main__":
    for _s in (sys.stdout,):
        try: _s.reconfigure(encoding="utf-8")
        except Exception: pass
    if len(sys.argv) < 2: print(__doc__); sys.exit(0)
    if sys.argv[1] == "ark": print(ark()); sys.exit(0)
    for n in (list(FORMER) if sys.argv[1] == "alle" else sys.argv[1:]): print(lag(n))
    print(ark())
