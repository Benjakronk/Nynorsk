"""Byggjer skriftene til «Aasen: Språkvandringa» frå handteikna pikselrutenett.

  python tools/skrift/bygg.py            byggjer alle skriftene og prøvearka
  python tools/skrift/bygg.py spelskrift byggjer berre éi

Kjeldene er tekstfiler i same mappe (spelskrift.txt, runeskrift.txt). Formatet står
øvst i spelskrift.txt. Kvar piksel blir eit kvadrat på 128 × 128 einingar (UPM 2048,
16 pikslar per em), og omrisset rundt pikslane blir spora som éin kontur per flate,
så det ikkje blir sømmar mellom pikslane.

Ut:
  fonts/<namn>.woff2 og fonts/<namn>.ttf            skrifta (brukt i css/rpg.css)
  tools/skrift/provark-<namn>.png                    alle glyfane, rutenettet forstørra
  tools/skrift/provark-<namn>-tekst.png              prøvetekst sett med sjølve TTF-fila (PIL),
                                                     så ein ser at fila gir skarpe pikslar

Skriftene er teikna for dette spelet (Claude Opus 5.5, 2026) og er ikkje kopierte frå
andre skrifter. Lisens: same som resten av prosjektet.
"""
import os, re, sys
from fontTools.fontBuilder import FontBuilder
from fontTools.misc.timeTools import timestampNow
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.feaLib.builder import addOpenTypeFeaturesFromString
from PIL import Image, ImageDraw, ImageFont

for _s in (sys.stdout, sys.stderr):
    try: _s.reconfigure(encoding="utf-8")
    except Exception: pass

ROT = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(ROT))
U = 128                  # einingar per piksel
EM = 16                  # pikslar per em: font-size = 16 × pikselstorleiken
ASC, DESC = 12, 3        # pikslar over og under grunnlina (linjeboksen er 15 pikslar)

SKRIFTER = {
    "spelskrift": {"familie": "Spelskrift", "fil": "spelskrift.txt"},
    "runeskrift": {"familie": "Runeskrift", "fil": "runeskrift.txt"},
}
NAMN = {"space": 0x20, "nbsp": 0xA0, "thinsp": 0x2009}


# ---------- Lesing ----------

def er_rad(l):
    return l != "" and set(l) <= {"#", "."}


def les(fil):
    """Gir (merke, glyfar, kern, klassar). Ein glyf er dict med rader, ned, lyft, breidd eller saman."""
    merke, glyfar, kern, klassar = {}, {}, [], {}
    blokk = None
    for nr, rå in enumerate(open(fil, encoding="utf-8").read().splitlines(), 1):
        l = rå.rstrip()
        if blokk is not None and er_rad(l):
            blokk["rader"].append(l); continue
        blokk = None
        if not l or not l.split()[0] in ("glyf", "merke", "kern", "klasse"):
            continue
        ord_ = l.split()
        if ord_[0] == "klasse":                     # klasse @rund = a c d e o
            klassar[ord_[1]] = ord_[3:]
            continue
        if ord_[0] == "kern":                       # kern T @rund -1
            kern.append((ord_[1], ord_[2], int(ord_[3]))); continue
        if ord_[0] == "merke":
            blokk = merke[ord_[1]] = {"rader": []}; continue
        teikn = ord_[1]
        cp = NAMN.get(teikn, ord(teikn) if len(teikn) == 1 else None)
        if cp is None: raise SystemExit(f"{fil}:{nr}: ukjent teikn {teikn!r}")
        g = {"rader": [], "ned": 0, "lyft": 0, "breidd": None, "dx": 0, "x": None, "y": None}
        rest = ord_[2:]
        if rest and rest[0] == "=":                 # glyf á = a + akutt dx=1
            g["saman"] = (rest[1], rest[3])
            rest = rest[4:]
        for k in rest:
            n, v = k.split("=")
            g[n] = int(v)
        glyfar[cp] = g
        if "saman" not in g and g["breidd"] is None: blokk = g
    return merke, glyfar, kern, klassar


def piksler(g):
    """Pikslane i ein glyf som (x, y), y oppover frå grunnlina (botnen av pikselen)."""
    rader = g["rader"]; h = len(rader)
    ut = set()
    for r, rad in enumerate(rader):
        y = (h - 1 - r) - g["ned"] + g["lyft"]
        for x, c in enumerate(rad):
            if c == "#": ut.add((x, y))
    return ut


def lag_glyfar(merke, glyfar):
    """Løyser opp samansette glyfar. Gir {cp: (pikslar, framsteg)}."""
    ut = {}
    def grunn(cp):
        g = glyfar[cp]
        if cp in ut: return ut[cp]
        if "saman" in g:
            b, m = g["saman"]
            bp, bf = grunn(ord(b))
            mr = merke[m]["rader"]; mw = max(len(r) for r in mr)
            bw = max(x for x, _ in bp) + 1
            topp = max(y for _, y in bp)                     # øvste rekkja i basen
            x0 = (bw - mw + 1) // 2 + g["dx"] if g["x"] is None else g["x"]
            y0 = topp + 2 if g["y"] is None else g["y"]       # éi tom rekkje mellom, eller fast stad (x=, y=)
            p = set(bp)
            for r, rad in enumerate(mr):
                y = y0 + (len(mr) - 1 - r)
                for x, c in enumerate(rad):
                    if c == "#": p.add((x0 + x, y))
            ut[cp] = (p, max(bf, max(x for x, _ in p) + 2)); return ut[cp]
        p = piksler(g)
        if g["breidd"] is not None: f = g["breidd"]
        else: f = max(len(r) for r in g["rader"]) + 1
        ut[cp] = (p, f); return ut[cp]
    for cp in glyfar: grunn(cp)
    return ut


# ---------- Omriss ----------

def omriss(p):
    """Sporar kantane rundt pikselflatene. Gir lister med hjørnepunkt (med klokka for ytre konturar)."""
    kantar = {}
    def leggtil(a, b): kantar.setdefault(a, []).append(b)
    for x, y in p:
        if (x - 1, y) not in p: leggtil((x, y), (x, y + 1))
        if (x, y + 1) not in p: leggtil((x, y + 1), (x + 1, y + 1))
        if (x + 1, y) not in p: leggtil((x + 1, y + 1), (x + 1, y))
        if (x, y - 1) not in p: leggtil((x + 1, y), (x, y))
    konturar = []
    while kantar:
        start = next(iter(kantar))
        kontur = [start]; forrige = None; pkt = start
        while True:
            ut = kantar[pkt]
            if len(ut) == 1 or forrige is None: nxt = ut[0]
            else:
                # Hjørne som berre møtest diagonalt: sving til høgre, så flatene held seg kvar for seg.
                dx, dy = pkt[0] - forrige[0], pkt[1] - forrige[1]
                hogre = (dy, -dx)
                nxt = next((b for b in ut if (b[0] - pkt[0], b[1] - pkt[1]) == hogre), ut[0])
            ut.remove(nxt)
            if not ut: del kantar[pkt]
            forrige, pkt = pkt, nxt
            if pkt == start: break
            kontur.append(pkt)
        # Fjern punkt på rette liner.
        n = len(kontur); rein = []
        for i in range(n):
            a, b, c = kontur[i - 1], kontur[i], kontur[(i + 1) % n]
            if (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]) != 0: rein.append(b)
        konturar.append(rein)
    return konturar


# ---------- Innebygde bitmapar ----------

# Skalaene (skjermpikslar per skriftpiksel) som får ferdige bitmapar i fila (EBLC/EBDT). Windows
# (DirectWrite i Chrome og Edge) teiknar då glyfane som reine pikslar utan kantutjamning når
# skrifta blir brukt i 16 × skala px, i staden for å glatte ut omrisset.
STRIKAR = [1, 2, 3, 4, 5, 6, 8]


def bitmapar(font, gl, skalaer):
    from fontTools.ttLib import newTable
    from fontTools.ttLib.tables.E_B_L_C_ import Strike, SbitLineMetrics, eblc_index_sub_table_1
    from fontTools.ttLib.tables.E_B_D_T_ import ebdt_bitmap_format_1
    from fontTools.ttLib.tables.BitmapGlyphMetrics import SmallGlyphMetrics
    eblc, ebdt = newTable("EBLC"), newTable("EBDT")
    eblc.version = ebdt.version = 2.0
    eblc.strikes, ebdt.strikeData = [], []
    rekkje = sorted((cp for cp in gl if gl[cp][0]), key=lambda cp: font.getGlyphID(gnamn(cp)))
    for sk in skalaer:
        data = {}
        for cp in rekkje:
            p, f = gl[cp]
            x0, x1 = min(x for x, _ in p), max(x for x, _ in p)
            y0, y1 = min(y for _, y in p), max(y for _, y in p)
            w, h = (x1 - x0 + 1) * sk, (y1 - y0 + 1) * sk
            rader = []
            for r in range(h):
                y = y1 - r // sk
                bitar = [1 if (x0 + c // sk, y) in p else 0 for c in range(w)]
                bitar += [0] * (-len(bitar) % 8)
                rader.append(bytes(int("".join(map(str, bitar[i:i + 8])), 2) for i in range(0, len(bitar), 8)))
            m = SmallGlyphMetrics()
            m.height, m.width, m.BearingX, m.BearingY, m.Advance = h, w, x0 * sk, (y1 + 1) * sk, f * sk
            g = ebdt_bitmap_format_1(None, None); g.metrics = m; g.setRows(rader)
            data[gnamn(cp)] = g
        ebdt.strikeData.append(data)
        st = Strike(); bt = st.bitmapSizeTable
        for retn in ("hori", "vert"):
            lm = SbitLineMetrics()
            lm.ascender, lm.descender, lm.widthMax = ASC * sk, -DESC * sk, min(255, 10 * sk)
            lm.caretSlopeNumerator, lm.caretSlopeDenominator, lm.caretOffset = 1, 0, 0
            lm.minOriginSB, lm.minAdvanceSB, lm.maxBeforeBL, lm.minAfterBL, lm.pad1, lm.pad2 = 0, 0, ASC * sk, -DESC * sk, 0, 0
            setattr(bt, retn, lm)
        bt.colorRef, bt.ppemX, bt.ppemY, bt.bitDepth, bt.flags = 0, EM * sk, EM * sk, 1, 1
        bt.startGlyphIndex = bt.endGlyphIndex = 0
        sub = eblc_index_sub_table_1(None, None)
        sub.indexFormat, sub.imageFormat = 1, 1
        sub.names = [gnamn(cp) for cp in rekkje]
        sub.firstGlyphIndex = sub.lastGlyphIndex = 0
        st.indexSubTables = [sub]
        eblc.strikes.append(st)
    font["EBLC"], font["EBDT"] = eblc, ebdt


# ---------- Bygging ----------

def gnamn(cp):
    return "space" if cp == 0x20 else (f"uni{cp:04X}" if cp <= 0xFFFF else f"u{cp:05X}")


def bygg(id_):
    info = SKRIFTER[id_]
    merke, glyfar, kern, klassar = les(os.path.join(ROT, info["fil"]))
    gl = lag_glyfar(merke, glyfar)
    rekkje = [".notdef"] + [gnamn(cp) for cp in sorted(gl)]
    cmap = {cp: gnamn(cp) for cp in gl}
    glyf, metrikk = {}, {}
    # .notdef: ein open boks
    pen = TTGlyphPen(None)
    boks = {(x, y) for x in range(5) for y in range(9) if x in (0, 4) or y in (0, 8)}
    for k in omriss(boks):
        pen.moveTo((k[0][0] * U, k[0][1] * U))
        for pt in k[1:]: pen.lineTo((pt[0] * U, pt[1] * U))
        pen.closePath()
    glyf[".notdef"] = pen.glyph(); metrikk[".notdef"] = (6 * U, 0)
    for cp, (p, f) in gl.items():
        pen = TTGlyphPen(None)
        for k in omriss(p):
            pen.moveTo((k[0][0] * U, k[0][1] * U))
            for pt in k[1:]: pen.lineTo((pt[0] * U, pt[1] * U))
            pen.closePath()
        n = gnamn(cp)
        glyf[n] = pen.glyph()
        metrikk[n] = (f * U, min((x for x, _ in p), default=0) * U)
    fb = FontBuilder(EM * U, isTTF=True)
    fb.setupGlyphOrder(rekkje)
    fb.setupCharacterMap(cmap)
    fb.setupGlyf(glyf)
    fb.setupHorizontalMetrics(metrikk)
    fb.setupHorizontalHeader(ascent=ASC * U, descent=-DESC * U, lineGap=0)
    fam = info["familie"]
    fb.setupNameTable({
        "familyName": fam, "styleName": "Regular", "uniqueFontIdentifier": f"{fam}-Regular-1.0",
        "fullName": f"{fam} Regular", "psName": f"{fam}-Regular", "version": "Version 1.000",
        "copyright": "Teikna for hand til «Aasen: Språkvandringa» (Claude Opus 5.5, 2026)",
        "description": "Pikselskrift bygd frå rutenett i tools/skrift/ med tools/skrift/bygg.py",
    })
    fb.setupOS2(sTypoAscender=ASC * U, sTypoDescender=-DESC * U, sTypoLineGap=0,
                usWinAscent=ASC * U, usWinDescent=DESC * U, sxHeight=6 * U, sCapHeight=9 * U,
                fsSelection=0x40 | 0x80, achVendID="AASN", usWeightClass=400, version=4)
    fb.setupPost()
    # gasp utan kantutjamning i alle storleikar: Windows (DirectWrite) teiknar då glyfane som reine
    # pikslar (aliased) i staden for gråtonar eller ClearType, så kantane blir skarpe.
    from fontTools.ttLib import newTable
    gasp = newTable("gasp"); gasp.version = 1; gasp.gaspRange = {0xFFFF: 0x0001}
    fb.font["gasp"] = gasp
    bitmapar(fb.font, gl, STRIKAR)
    fb.setupHead(unitsPerEm=EM * U, created=timestampNow(), modified=timestampNow())
    if kern:
        fea = []
        for k, v in klassar.items():
            fea.append(f"{k} = [{' '.join(gnamn(ord(c)) for c in v if ord(c) in gl)}];")
        fea.append("feature kern {")
        def ref(s):
            return s if s.startswith("@") else gnamn(ord(s))
        for a, b, n in kern:
            fea.append(f"  pos {ref(a)} {ref(b)} {n * U};")
        fea.append("} kern;")
        addOpenTypeFeaturesFromString(fb.font, "\n".join(fea))
    os.makedirs(os.path.join(REPO, "fonts"), exist_ok=True)
    ttf = os.path.join(REPO, "fonts", f"{id_}.ttf")
    fb.font.flavor = None; fb.save(ttf)
    fb.font.flavor = "woff2"; fb.save(os.path.join(REPO, "fonts", f"{id_}.woff2"))
    print(f"{fam}: {len(gl)} glyfar -> fonts/{id_}.ttf og .woff2")
    return gl, ttf


# ---------- Prøveark ----------

BLAA = [(58, 76, 176), (20, 26, 82)]


def bakgrunn(b, h):
    im = Image.new("RGB", (b, h))
    d = ImageDraw.Draw(im)
    for y in range(h):
        t = y / max(1, h - 1)
        d.line([(0, y), (b, y)], fill=tuple(int(BLAA[0][i] + (BLAA[1][i] - BLAA[0][i]) * t) for i in range(3)))
    return im


def provark(id_, gl, ttf, tekstfont):
    """Alle glyfane i rutenett (4x), med koden under, sett med spelskrifta sjølv."""
    sk, cel_b, cel_h, kol = 4, 14, 20, 16
    cps = sorted(gl)
    rader = (len(cps) + kol - 1) // kol
    b, h = kol * cel_b * sk, rader * cel_h * sk + 40
    im = bakgrunn(b, h)
    d = ImageDraw.Draw(im)
    def teikn(p, ox, oy, s, farge, skugge=True):
        for x, y in p:
            if skugge: d.rectangle([ox + (x + 1) * s, oy - (y + 1) * s + s, ox + (x + 2) * s - 1, oy - y * s + s - 1], fill=(14, 12, 18))
        for x, y in p:
            d.rectangle([ox + x * s, oy - (y + 1) * s, ox + (x + 1) * s - 1, oy - y * s - 1], fill=farge)
    def skriv(tekst, ox, oy, s, farge):
        for c in tekst:
            if ord(c) not in tekstfont: continue
            p, f = tekstfont[ord(c)]
            teikn(p, ox, oy, s, farge); ox += f * s
    skriv(f"{SKRIFTER[id_]['familie']}: {len(cps)} glyfar", 8, 30, 2, (255, 227, 154))
    for i, cp in enumerate(cps):
        cx, cy = (i % kol) * cel_b * sk, 40 + (i // kol) * cel_h * sk
        base = cy + 13 * sk
        # grunnlina og x-høgda, svakt
        d.line([(cx + 4, base), (cx + cel_b * sk - 4, base)], fill=(90, 100, 170))
        p, f = gl[cp]
        teikn(p, cx + 8, base, sk, (255, 255, 255))
        skriv(f"{cp:04X}", cx + 6, cy + cel_h * sk - 6, 1, (160, 168, 220))
    ut = os.path.join(ROT, f"provark-{id_}.png"); im.save(ut); print(ut)


def provtekst(id_, ttf, linjer, skala=3):
    """Set prøvetekst med sjølve TTF-fila i PIL og forstørrar 3x.

    FreeType i PIL set inn autohinting i små storleikar (pikslar flyttar seg), så teksten blir
    sett åtte gonger så stor (128 px, éin piksel = 8 × 8) og skalert ned med næraste nabo.
    Då ser ein omrisset i fila slik nettlesaren teiknar det, utan hinting."""
    K = 8
    f = ImageFont.truetype(ttf, EM * K)
    b = max(int(f.getlength(l) / K) for l in linjer) + 16
    lh = 16
    h = len(linjer) * lh + 8
    stor = Image.new("L", (b * K, h * K), 0)
    d = ImageDraw.Draw(stor)
    for i, l in enumerate(linjer):
        d.text((8 * K, (4 + i * lh + ASC) * K), l, font=f, fill=255, anchor="ls")
    maske = stor.resize((b, h), Image.NEAREST).point(lambda v: 255 if v >= 128 else 0)
    im = bakgrunn(b, h)
    im.paste((14, 12, 18), (1, 1), maske)
    im.paste((255, 255, 255), (0, 0), maske)
    im = im.resize((b * skala, h * skala), Image.NEAREST)
    ut = os.path.join(ROT, f"provark-{id_}-tekst.png"); im.save(ut); print(ut)


PROVE = {
    "spelskrift": [
        "Aasen: Språkvandringa. Kapittel 1: Ørsta (1826–1831)",
        "«Du må høyre etter, gut. Det er heile kunsta.» Ivar lyttar …",
        "Æ Ø Å æ ø å: «Blåbærsyltetøy på brødskiva!» „Gjæv“ – kvifor?",
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz",
        "0123456789 .,:;!?'\"()[]{}/\\|+-=×*#%&@$ ♪ ♫ ▼ ✓ · •",
        "Norrønt: Þórr, Óðinn, Ǫrvar-Oddr, mǫgr, œgir, Ęgill, Ǽsir, Ǿ",
        "Á á É é Í í Ó ó Ú ú Ý ý Þ þ Ð ð Ǫ ǫ Œ œ Ę ę Ǽ ǽ Ǿ ǿ",
        "Haugbonden: «Eg har høyrt på folket her i tusen år.»",
        "Tavla, Vegen, Yvar, Fjell, P. Torp, LT, rv, ry, f. Kr.",
    ],
    "runeskrift": [
        "ᚠᚢᚦᚨᚱᚲᚷᚹ ᚺᚾᛁᛃᛇᛈᛉᛊ ᛏᛒᛖᛗᛚᛜᛞᛟ",
        "ᚠᚢᚦᚬᚱᚴ ᚼᚾᛁᛅᛋ ᛏᛒᛘᛚᛦ",
        "ᚠᚢᚦᚭᚱᚴ ᚽᚿᛁᛆᛌ ᛐᛓᛙᛚᛧ",
        "ᚱᛅᛁᛋᛏᛁ᛫ᛋᛏᛅᛁᚾ᛫ᚦᛅᚾᛋᛁ᛬ᛅᚠᛏᛁᛦ᛫ᚠᛅᚦᚢᚱ",
    ],
}


if __name__ == "__main__":
    val = sys.argv[1:] or list(SKRIFTER)
    bygde = {}
    for id_ in ["spelskrift"] + [v for v in val if v != "spelskrift"]:
        bygde[id_] = bygg(id_)
    for id_ in val:
        gl, ttf = bygde[id_]
        provark(id_, gl, ttf, bygde["spelskrift"][0])
        provtekst(id_, ttf, PROVE[id_])
