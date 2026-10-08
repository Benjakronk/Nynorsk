"""Lagringsstadene: lykta og bålplassen (runde 86).

Lykta er éi felles lykt (forma frå lykta i utmarka, som brukaren likte best): ein jernkappe sett
ovanfrå, glas med kryss og ein stolpe med steinfot. Ute står ho på stolpen (kartteikna L ute og T),
inne står den same lykta på golvet (L inne). Bålplassen (kartteiknet å) er ein steinring sett skrått
ovanfrå (standardperspektivet), med aske og sot, kubbar som brenn, ein trefot med ei gryte over
elden, og ein sitjestokk som kan setjast ut ved sida av (naturting på kartet). Elden er tre lag:
botnen (ring, aske og ved), flammane (fire rammer, handteikna) og framsida (steinane framme,
trefoten og gryta), så gryta heng framfor flammane. Gnistar og røyk teiknar motoren
(Pikslar.natur, eldstad i pikslar.js), og gløden er glødforma baal i glod.py.

  python tools/pikselkunst/eldstad.py alle      skriv kjelder/natur-*.pix og lagar PNG
  python tools/pikselkunst/eldstad.py vis       forhand/eldstad-8x.png: alle rammene saman på bakken

Bileta hamnar i bilete/spel/natur/. Kjelda er dette skriptet.
"""
import os, sys, subprocess

ROT = os.path.dirname(os.path.abspath(__file__))
PROSJEKT = os.path.abspath(os.path.join(ROT, "..", ".."))

PAL = [
    (".", "-", ""), ("o", "#0a0514", "omriss"),
    ("1", "#262236", "jern djup"), ("2", "#463f5e", "jern"), ("3", "#756d8e", "jern lys"), ("4", "#aaa2c2", "jern glans"),
    ("u", "#e88a28", "glas kant"), ("y", "#f8d840", "glas"), ("Y", "#fff8d0", "glas kjerne"),
    ("a", "#2a1810", "tre djup"), ("b", "#4a2c1c", "tre skugge"), ("c", "#6a4428", "tre"), ("d", "#8a5a34", "tre lys"),
    ("e", "#c08a52", "endeved"), ("h", "#e2b47a", "endeved lys"),
    ("A", "#26242e", "stein djup"), ("B", "#44424e", "stein skugge"), ("C", "#666472", "stein"), ("D", "#8c8a96", "stein lys"),
    ("E", "#b4b2bc", "stein glans"),
    ("s", "#18121a", "sot"), ("S", "#38323a", "aske mørk"), ("g", "#68626a", "aske"), ("G", "#9c968e", "aske lys"),
    ("r", "#7a1a10", "glo mørk"), ("R", "#c83a18", "glo"), ("f", "#f0902a", "flamme"), ("F", "#f8d860", "flamme gul"),
    ("W", "#fff4c0", "flamme kvit"),
    ("K", "#1c1a28", "gryte"), ("L", "#38364e", "gryte lys"), ("M", "#6e6c8c", "gryte glans"),
    ("x", "#dcd6cc", "never"), ("X", "#a09a94", "never skugge"), ("z", "#3a3440", "never merke"),
    ("m", "#4a6a2a", "mose skugge"), ("n", "#6e9038", "mose"),
    ("N", "#6a2c18", "kopar djup"), ("Q", "#b0602e", "kopar"), ("P", "#e09a5a", "kopar lys"),
]
FARGE = {t: f for t, f, _ in PAL}


class Lerret:
    def __init__(s, w, h): s.w, s.h = w, h; s.g = [["." for _ in range(w)] for _ in range(h)]

    def p(s, x, y, c):
        if 0 <= x < s.w and 0 <= y < s.h and c != " ": s.g[y][x] = c

    def stempel(s, x0, y0, rader):
        """Rader med teikn; mellomrom er gjennomsiktig (lèt det under stå)."""
        for dy, r in enumerate(rader):
            for dx, c in enumerate(r):
                if c != " ": s.p(x0 + dx, y0 + dy, c)

    def tekst(s): return ["".join(r) for r in s.g]


def omriss(L, ikkje=""):
    """Omriss rundt alt som ikkje er gjennomsiktig (utanom teikna i «ikkje», til dømes flammar)."""
    ut = [r[:] for r in L.g]
    for y in range(L.h):
        for x in range(L.w):
            if L.g[y][x] != ".": continue
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nx, ny = x + dx, y + dy
                if 0 <= nx < L.w and 0 <= ny < L.h and L.g[ny][nx] not in "." + "o" + ikkje:
                    ut[y][x] = "o"; break
    L.g = ut


# ------------------------------------------------------------------ lykta
# Hovudet til lykta (12 breitt): kule og kappe sett ovanfrå (toppflata lys mot venstre), takskjegget,
# glaset med jernkrysset (lyset er sterkast nedst ved veken), og botnplata.
LYKT_HOVUD = [
    ".....oo.....",
    "....o43o....",
    "...o4432o...",
    "..o443322o..",
    ".o12222221o.",
    ".o1yy2yyu1o.",
    ".o1yY2Yyu1o.",
    ".o12222221o.",
    ".o1YY2YYu1o.",
    ".o1yY2Yyu1o.",
    ".o1uu2uuu1o.",
    ".o13332221o.",
]
# Den andre ramma: veken flakkar, kjernen blir mindre.
LYKT_HOVUD_2 = LYKT_HOVUD[:5] + [
    ".o1yy2yyu1o.",
    ".o1yy2Yyu1o.",
    ".o12222221o.",
    ".o1yY2YYu1o.",
    ".o1yy2yyu1o.",
] + LYKT_HOVUD[10:]
LYKT_STOLPE = [
    "..oo1dc1oo..",
    "....odbo....",
    "....odbo....",
    "....odbo....",
    "....odbo....",
    "....odbo....",
    "....odbo....",
    "...odDdbo...",
    "..oEDDdCBo..",
    ".oEDDCCBBBo.",
    "..oooooooo..",
]
LYKT_FOT = [                                   # inne: lykta står på golvet på fire korte føter
    ".o1oooooo1o.",
    ".oo......oo.",
]


def lykt():
    return [LYKT_HOVUD + LYKT_STOLPE, LYKT_HOVUD_2 + LYKT_STOLPE]


def lykt_golv():
    return [LYKT_HOVUD + LYKT_FOT, LYKT_HOVUD_2 + LYKT_FOT]


# ------------------------------------------------------------------ bålplassen
# Lerretet er 20 x 20. Flisa ligg i kolonne 2 til 17 og rad 4 til 19 (botnen av flisa er den
# nedste rada). Ringen fyller flisa og går ein piksel ut på kvar side; flammane stig over flisa.
BW, BH, FX, FY = 20, 20, 2, 4

# Steinringen sett skrått ovanfrå (20 breitt frå kolonne -2 i flisa, flisrad 4 til 14): dei bakre
# steinane syner toppflata (rad 4 til 6) og sida mot elden (rad 7), steinane på sidene er smale,
# inni ligg oska (lys ytst, sot og glør midt under elden), og steinane framme har store toppflater
# (rad 11 og 12) og ei kort, mørk framside (rad 13 og 14). A er fugene mellom steinane.
RING_BAK = [
    "        EEDAED      ",
    "    EEDAEDDCADDEA   ",
    "   EDDCADDCBADDDCE  ",
    "  EDCBBBBBBBBBBBDCE ",
    "  DCBGGgSsssSgGGBDC ",
    "  CBggSsrRRrsSggBCB ",
    "  BAGgSSsssssSSgGBA ",
]
RING_FRAM = [
    "   EEDDAEEDDDAEEDD  ",
    "   DDCCADDCCCADDCC  ",
    "    CBBACCBBBACBB   ",
    "      BBAABBBAAB    ",
]
# Veden: to kubbar i kross under elden, med lyse endar og never på den eine.
VED = [
    "he     dx",
    " ec   cX ",
    "  e   h  ",
]
# Kaffikjelen i kopar står på steinen framme til høgre, med tuten mot elden.
KJEL = [
    "   oo  ",
    "  oPNo ",
    "Po oo  ",
    "oPoPQNo",
    " oPQQNo",
    " oPQNNo",
    "  oooo ",
]


def baal_botn():
    L = Lerret(BW, BH)
    L.stempel(FX - 2, FY + 4, RING_BAK)
    L.stempel(FX + 4, FY + 8, VED)
    omriss(L)
    return L


def baal_fram():
    L = Lerret(BW, BH)
    L.stempel(FX - 2, FY + 11, RING_FRAM)
    omriss(L)
    L.stempel(FX + 10, FY + 6, KJEL)
    return L


# Flammane: fire rammer, 9 x 13, midt i ringen. R ytst, f, F og W i kjernen. Ingen omriss.
ILD = [
    [
        "    R    ",
        "    R    ",
        "   RfR   ",
        "   RfR R ",
        "  RfFR R ",
        "  RfFfRfR",
        "  RfFWFfR",
        " RfFWWFfR",
        " RfFWWFfR",
        "RffWWWFfR",
        "RfFWWWFFR",
        "RfFFWWFfR",
        " RfFFFFR ",
    ],
    [
        "     R   ",
        "  R  R   ",
        "  R RfR  ",
        "  RfRfR  ",
        "  RfRFR  ",
        "  RfFFfR ",
        " RfFWFfR ",
        " RfFWWFfR",
        "RffWWWFfR",
        "RfFWWWWFR",
        "RfFWWWFfR",
        "RfFFWWFfR",
        " RfFFFfR ",
    ],
    [
        "         ",
        "       R ",
        "   R   R ",
        "   fR Rf ",
        "  RfR RfR",
        "  RFfRFfR",
        " RfFFfFfR",
        " RfFWWFfR",
        "RffFWWWfR",
        "RfFWWWWFR",
        "RfFWWWFfR",
        "RfFFWWFfR",
        " RfFFFfR ",
    ],
    [
        "  R      ",
        "  fR     ",
        "  RfR    ",
        "  RfR R  ",
        "  RFfRfR ",
        " RfFFfR  ",
        " RfFWFfR ",
        "RffFWWFR ",
        "RfFWWWFfR",
        "RfFWWWWFR",
        "RfFWWWFfR",
        "RfFFWWFfR",
        " RfFFFfR ",
    ],
]
ILD_POS = (FX + 4, FY - 2)                     # øvre venstre hjørne av flammeruta i lerretet


def baal_ild():
    ut = []
    for r in ILD:
        L = Lerret(BW, BH); L.stempel(ILD_POS[0], ILD_POS[1], r); ut.append(L.tekst())
    return ut


# ------------------------------------------------------------------ bålplassen med gryte (2 x 1)
# Den store varianten (flisene ÅÅ, runde 87): ein breiare steinring over to fliser, ein trefot av
# bjørkestenger og ei svart gryte som heng i ein kjetting over elden, med damp. Lerretet er 36 x 36:
# paret av fliser ligg i kolonne 2 til 33 og rad 20 til 35. Stengene er lyse (never med mørk
# skuggeside) og utan omriss, så dei står tynt og ikkje blir ein svart klump; den bakre stonga står
# bak flammane, dei to framme står ute ved sidene, så elden syner godt mellom dei. Gryta heng høgt,
# så flammane syner under og ved sidene av henne.
GW, GH, GX, GY = 36, 36, 2, 20


def _brei(rader):
    """Gjer ringen 14 pikslar breiare: midtpartiet (steinane bak og framme) blir gjenteke."""
    return [r[:10] + r[3:17] + r[10:] for r in rader]


def _stong(L, a, b, lys="x", mork="z", merke="X"):
    """Ei stong frå a til b (i flispar-koordinatar): lys venstreside, mørk høgreside, merke i neveren."""
    (x0, y0), (x1, y1) = a, b
    n = max(abs(y1 - y0), abs(x1 - x0))
    for i in range(n + 1):
        x = round(x0 + (x1 - x0) * i / n); y = round(y0 + (y1 - y0) * i / n)
        L.p(GX + x, GY + y, merke if i % 5 == 3 else lys); L.p(GX + x + 1, GY + y, mork)


GRYTE = [
    "  oooooooo  ",
    " oMMMMMMMMo ",
    "oMLssssssLMo",
    "oLMMMMMMMMLo",
    "oLKKKKKKKKKo",
    "oMLKKKKKKKKo",
    " oLKKKKKKKo ",
    "  orRRRrro  ",
    "   oooooo   ",
]
BOYLE = [(10, -8), (10, -9), (11, -10), (12, -11), (13, -12), (14, -12), (15, -13), (16, -13), (17, -13), (18, -12),
         (19, -12), (20, -11), (21, -10), (22, -9), (22, -8)]


def gryte_botn():
    L = Lerret(GW, GH)
    L.stempel(GX - 1, GY + 4, _brei(RING_BAK))
    L.stempel(GX + 9, GY + 8, VED)
    L.stempel(GX + 14, GY + 8, ["  he   dx", "  ec  cX ", "   e  h  "])
    omriss(L)
    _stong(L, (16, -16), (18, 4))                                    # den bakre stonga, bak elden
    return L


def gryte_fram():
    L = Lerret(GW, GH)
    L.stempel(GX - 1, GY + 11, _brei(RING_FRAM))
    L.stempel(GX + 10, GY - 9, GRYTE)
    omriss(L)
    _stong(L, (16, -16), (0, 13))                                    # framme til venstre
    _stong(L, (16, -16), (31, 13), lys="X", mork="z")                # framme til høgre (i skugge)
    for x, y in BOYLE: L.p(GX + x, GY + y, "3")                     # bøylen
    for y in range(-15, -13): L.p(GX + 16, GY + y, "3" if y % 2 else "2")   # kjettingen
    L.stempel(GX + 15, GY - 18, ["e  e", " ee ", "o22o"])               # surringa i toppen, endane stikk opp
    return L


def gryte_ild():
    """Flammane under gryta: to av dei handteikna flammene side om side (ulik ramme), slått saman
    så den lysaste fargen vinn. Fire rammer."""
    rang = {"R": 1, "f": 2, "F": 3, "W": 4}
    ut = []
    for i in range(4):
        L = Lerret(GW, GH)
        for r, dx in ((ILD[i], 0), (ILD[(i + 2) % 4], 5)):
            for y, rad in enumerate(r):
                for x, c in enumerate(rad):
                    if c == " ": continue
                    px, py = GX + 9 + dx, GY - 2 + y
                    if rang[c] > rang.get(L.g[py][px + x], 0): L.g[py][px + x] = c
        ut.append(L.tekst())
    return ut


def sitjestokk():
    """Ein tømmerstokk å sitje på ved bålet: lagd på langs, toppflata lys, enden med årringar mot
    venstre (lyset), litt mose og ein kvistkul."""
    L = Lerret(20, 10)
    L.stempel(1, 2, [
        "  ohhooooooooooo  ",
        " oheehdddddcddddo ",
        "oheGeedddddddcmno ",
        "oheeheccdcccccmcbo",
        "oehhecbbbbcbbbbbbo",
        " oeeoabbbabbbbabo ",
        "  oo oooooooooooo ",
    ])
    omriss(L)
    return L


def pix(namn, rammer, w, h, merk):
    brukt = {c for r in rammer for rad in r for c in rad}
    ut = [f"# namn: natur-{namn}", "# type: fiende", f"# ut: bilete/spel/natur/{namn}.png", f"# storleik: {w}x{h}",
          f"# {merk}", "# Laga av tools/pikselkunst/eldstad.py. Endre skriptet, ikkje denne fila.", "palett:"]
    ut += [f"  {t} = {f}    {m}".rstrip() for t, f, m in PAL if t in brukt or t == "."]
    for i, r in enumerate(rammer):
        ut.append("bilete:" if i == 0 else f"bilete ramme{i + 1}:")
        ut += ["  " + rad for rad in r]
    return "\n".join(ut) + "\n"


def alle():
    b = baal_botn(); f = baal_fram(); s = sitjestokk()
    return {
        "lykt": (lykt(), 12, 23, "lykta på stolpen (L ute og T), to rammer: veken flakkar"),
        "lykt-golv": (lykt_golv(), 12, 14, "lykta på golvet (L inne), to rammer"),
        "baal": ([b.tekst()], BW, BH, "bålplassen (å): ringen, oska og veden"),
        "baal-ild": (baal_ild(), BW, BH, "flammane i bålet, fire rammer side om side"),
        "baal-fram": ([f.tekst()], BW, BH, "framsida av bålet: steinane framme og kaffikjelen"),
        "sitjestokk": ([s.tekst()], s.w, s.h, "stokken å sitje på ved bålet (naturting)"),
        "baal-gryte": ([gryte_botn().tekst()], GW, GH, "bålplassen med gryte (ÅÅ): ringen, oska, veden og den bakre stonga"),
        "baal-gryte-ild": (gryte_ild(), GW, GH, "flammane under gryta, fire rammer side om side"),
        "baal-gryte-fram": ([gryte_fram().tekst()], GW, GH, "framsida: steinane framme, trefoten, kjettingen og gryta"),
    }


def lag():
    for namn, (rammer, w, h, merk) in alle().items():
        for r in rammer:
            assert len(r) == h and all(len(x) == w for x in r), (namn, [len(x) for x in r], len(r))
        sti = os.path.join(ROT, "kjelder", f"natur-{namn}.pix")
        open(sti, "w", encoding="utf-8").write(pix(namn, rammer, w, h, merk))
        subprocess.run([sys.executable, os.path.join(ROT, "pix.py"), "lag", sti], check=True)


def vis():
    """Alle rammene av bålet og lykta på mørkt villgras, åtte gonger så store."""
    from PIL import Image
    def bilete(rader):
        im = Image.new("RGBA", (len(rader[0]), len(rader)), (0, 0, 0, 0))
        for y, r in enumerate(rader):
            for x, c in enumerate(r):
                if c != ".": im.putpixel((x, y), tuple(int(FARGE[c][i:i + 2], 16) for i in (1, 3, 5)) + (255,))
        return im
    a = alle()
    W = BW * 4 + 16 * 4 + 40
    ut = Image.new("RGBA", (W, BH + 8), (40, 63, 40, 255))
    for x in range(W):
        for y in range(BH + 8):
            if (x * 7 + y * 13) % 11 == 0: ut.putpixel((x, y), (29, 63, 40, 255))
    for i in range(4):
        ut.alpha_composite(bilete(a["baal"][0][0]), (i * BW, 4))
        ut.alpha_composite(bilete(a["baal-ild"][0][i]), (i * BW, 4))
        ut.alpha_composite(bilete(a["baal-fram"][0][0]), (i * BW, 4))
    x = BW * 4 + 4
    ut.alpha_composite(bilete(a["sitjestokk"][0][0]), (x, BH + 4 - 10)); x += 22
    for r in a["lykt"][0]: ut.alpha_composite(bilete(r), (x, BH + 4 - 23)); x += 14
    ut.alpha_composite(bilete(a["lykt-golv"][0][0]), (x, BH + 4 - 14))
    ut = ut.resize((ut.width * 8, ut.height * 8), Image.NEAREST)
    sti = os.path.join(ROT, "forhand", "eldstad-8x.png"); ut.save(sti); print(sti)
    # Bålet med gryte: dei fire rammene på mørkt villgras (kveld) og på lyst gras (dag).
    ut = Image.new("RGBA", (GW * 4, GH * 2), (0, 0, 0, 255))
    for rad, (g1, g2) in enumerate((((40, 63, 40), (29, 63, 40)), ((74, 138, 63), (104, 168, 74)))):
        for x in range(GW * 4):
            for y in range(GH):
                ut.putpixel((x, rad * GH + y), (g2 if (x * 7 + y * 13) % 11 == 0 else g1) + (255,))
        for i in range(4):
            for namn, r in (("baal-gryte", 0), ("baal-gryte-ild", i), ("baal-gryte-fram", 0)):
                ut.alpha_composite(bilete(a[namn][0][r]), (i * GW, rad * GH))
    ut = ut.resize((ut.width * 6, ut.height * 6), Image.NEAREST)
    sti = os.path.join(ROT, "forhand", "eldstad-gryte-6x.png"); ut.save(sti); print(sti)


if __name__ == "__main__":
    for _s in (sys.stdout,):
        try: _s.reconfigure(encoding="utf-8")
        except Exception: pass
    if len(sys.argv) < 2: print(__doc__); sys.exit(0)
    if sys.argv[1] == "alle": lag(); vis()
    elif sys.argv[1] == "vis": vis()
