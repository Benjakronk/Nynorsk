"""Pikselkunst for «Aasen: Språkvandringa»: lag, vis og sjekk grafikk.

Kjelda til kvart bilete er ei .pix-fil (tekst): ein palett der kvart teikn
er ein farge, og eit rutenett med eitt teikn per piksel. Filene ligg i
tools/pikselkunst/kjelder/ og blir versjonerte som vanleg kode.

Bruk (frå rota av prosjektet):
  python tools/pikselkunst/pix.py lag  kjelder/portrett-ivar.pix   PNG til spelet + førehandsvising
  python tools/pikselkunst/pix.py sjekk kjelder/portrett-ivar.pix  sjekk mot stilguiden
  python tools/pikselkunst/pix.py ark                              kontaktark av alle kjeldene
  python tools/pikselkunst/pix.py alle                             lag og sjekk alle kjeldene

Førehandsvisingane hamnar i tools/pikselkunst/forhand/ (ikkje i git):
  <namn>-8x.png          biletet åtte gonger så stort, på rutebakgrunn
  <namn>-samanheng.png   biletet i storleiken det får i spelet, på bakgrunnen det
                         skal stå på (samtaleboks, gras eller kampbakgrunn)

Format for .pix:
  # namn: portrett-ivar
  # type: portrett | figur | fiende | flis
  # ut: bilete/spel/portrett/ivar.png
  # storleik: 40x40
  palett:
    . = -            (gjennomsiktig)
    o = #0a0514      omriss
    h = #e8b890      hud
  bilete:
    ....oooo....
    (ein rad per linje, like lange)
  Fleire rammer (animasjon): «bilete ramme2:» osv. Dei blir lagde side om side.
"""
import sys, os, re, glob, json
from PIL import Image, ImageDraw

for _s in (sys.stdout, sys.stderr):
    try: _s.reconfigure(encoding="utf-8")
    except Exception: pass

ROT = os.path.dirname(os.path.abspath(__file__))
PROSJEKT = os.path.abspath(os.path.join(ROT, "..", ".."))
FORHAND = os.path.join(ROT, "forhand")

# Grenser frå stilguiden (STILGUIDE.md)
MAKS_FARGAR = {"portrett": 40, "figur": 24, "fiende": 32, "flis": 16}
OMRISS_MAKS_LYS = 0.16          # omrisspikslar skal vere nesten svarte
OMRISS_DEL = 0.75               # minst så stor del av kantpikslane skal vere omriss
SAMANHENG_SKALA = {"portrett": 3, "figur": 3, "fiende": 3, "flis": 3}


def les(sti):
    if not os.path.isabs(sti) and not os.path.exists(sti):
        sti = os.path.join(ROT, sti)
    meta, palett, rammer, modus, namn_ramme = {}, {}, {}, None, None
    for linje in open(sti, encoding="utf-8").read().splitlines():
        if linje.startswith("#"):
            m = re.match(r"#\s*(\w+)\s*:\s*(.+)", linje)
            if m: meta[m.group(1)] = m.group(2).strip()
            continue
        if not linje.strip():
            continue
        if linje.strip() == "palett:":
            modus = "palett"; continue
        m = re.match(r"^bilete(?:\s+(\w+))?:\s*$", linje.strip())
        if m:
            modus = "bilete"; namn_ramme = m.group(1) or "ramme1"; rammer[namn_ramme] = []; continue
        if modus == "palett":
            m = re.match(r"^\s+(\S)\s*=\s*(\S+)", linje)
            if m: palett[m.group(1)] = None if m.group(2) == "-" else m.group(2)
        elif modus == "bilete":
            rammer[namn_ramme].append(linje.strip())
    return sti, meta, palett, rammer


def hex2rgba(h):
    h = h.lstrip("#")
    return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16), 255)


def teikn(sti):
    sti, meta, palett, rammer = les(sti)
    bilete = []
    for namn, rader in rammer.items():
        b = max(len(r) for r in rader); h = len(rader)
        im = Image.new("RGBA", (b, h), (0, 0, 0, 0))
        px = im.load()
        for y, r in enumerate(rader):
            for x, c in enumerate(r):
                if c not in palett:
                    raise SystemExit(f"{os.path.basename(sti)}: teiknet «{c}» (rad {y + 1}, kolonne {x + 1}) står ikkje i paletten")
                if palett[c]: px[x, y] = hex2rgba(palett[c])
        bilete.append(im)
    w = sum(i.width for i in bilete); h = max(i.height for i in bilete)
    ark = Image.new("RGBA", (w, h), (0, 0, 0, 0)); x = 0
    for i in bilete: ark.paste(i, (x, 0)); x += i.width
    return meta, ark, bilete


def lys(rgb):
    r, g, b = [v / 255 for v in rgb[:3]]
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ruter(w, h, s=8):
    bak = Image.new("RGBA", (w, h), (60, 60, 72, 255)); d = ImageDraw.Draw(bak)
    for y in range(0, h, s):
        for x in range(0, w, s):
            if (x // s + y // s) % 2: d.rectangle([x, y, x + s - 1, y + s - 1], fill=(78, 78, 92, 255))
    return bak


def bakgrunn(type_, w, h):
    """Enkle attgjevingar av bakgrunnane i spelet, til samanhengsbiletet."""
    bak = Image.new("RGBA", (w, h)); d = ImageDraw.Draw(bak)
    if type_ == "portrett":            # samtaleboksen: blå gradient
        for y in range(h):
            t = y / max(1, h - 1)
            d.line([(0, y), (w, y)], fill=(int(58 - 38 * t), int(76 - 50 * t), int(176 - 94 * t), 255))
    elif type_ == "fiende":            # kampbakgrunn i utmarka: kveldshimmel og gras
        for y in range(h):
            t = y / max(1, h - 1)
            f = (int(44 + 120 * t), int(34 + 60 * t), int(80 + 20 * t)) if t < 0.62 else (40, 86, 50)
            d.line([(0, y), (w, y)], fill=f + (255,))
    else:                              # gras
        d.rectangle([0, 0, w, h], fill=(74, 138, 63, 255))
        for i in range(0, w * h // 40):
            x = (i * 97) % w; y = (i * 57) % h
            d.point((x, y), fill=(53, 104, 58, 255) if i % 3 else (104, 168, 74, 255))
    return bak


def lag(sti):
    meta, ark, rammer = teikn(sti)
    namn = meta.get("namn") or os.path.splitext(os.path.basename(sti))[0]
    type_ = meta.get("type", "figur")
    ut = meta.get("ut")
    if ut:
        mål = os.path.join(PROSJEKT, ut)
        os.makedirs(os.path.dirname(mål), exist_ok=True)
        ark.save(mål)
    os.makedirs(FORHAND, exist_ok=True)
    k = 8
    stor = ark.resize((ark.width * k, ark.height * k), Image.NEAREST)
    bak = ruter(stor.width, stor.height)
    bak.alpha_composite(stor)
    bak.save(os.path.join(FORHAND, f"{namn}-8x.png"))
    s = SAMANHENG_SKALA.get(type_, 3)
    pad = 12
    sam = bakgrunn(type_, ark.width * s + pad * 2, ark.height * s + pad * 2)
    sam.alpha_composite(ark.resize((ark.width * s, ark.height * s), Image.NEAREST), (pad, pad))
    sam.save(os.path.join(FORHAND, f"{namn}-samanheng.png"))
    return namn, ut


def sjekk(sti, stille=False):
    meta, ark, rammer = teikn(sti)
    type_ = meta.get("type", "figur")
    merknader = []
    if "storleik" in meta:
        bw, bh = [int(v) for v in meta["storleik"].lower().split("x")]
        for i, r in enumerate(rammer):
            if (r.width, r.height) != (bw, bh):
                merknader.append(f"ramme {i + 1} er {r.width}x{r.height}, ikkje {bw}x{bh}")
    fargar = {ark.getpixel((x, y)) for y in range(ark.height) for x in range(ark.width) if ark.getpixel((x, y))[3] > 0}
    if len(fargar) > MAKS_FARGAR.get(type_, 32):
        merknader.append(f"{len(fargar)} fargar (maks {MAKS_FARGAR.get(type_, 32)} for {type_})")
    for r in rammer:
        px = r.load(); w, h = r.size
        kant = omriss = einsame = fylt = 0
        for y in range(h):
            for x in range(w):
                p = px[x, y]
                if p[3] == 0: continue
                fylt += 1
                nb = [(x + dx, y + dy) for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))]
                if any(0 <= a < w and 0 <= b < h and px[a, b][3] == 0 for a, b in nb):
                    kant += 1
                    if lys(p) <= OMRISS_MAKS_LYS: omriss += 1
                like = sum(1 for dx in (-1, 0, 1) for dy in (-1, 0, 1) if (dx or dy) and 0 <= x + dx < w and 0 <= y + dy < h and px[x + dx, y + dy] == p)
                if like == 0 and lys(p) > OMRISS_MAKS_LYS: einsame += 1
        if type_ != "flis" and kant and omriss / kant < OMRISS_DEL:
            merknader.append(f"berre {round(100 * omriss / kant)} % av kanten er mørkt omriss (mål: {round(100 * OMRISS_DEL)} %)")
        if fylt and einsame / fylt > 0.04:
            merknader.append(f"{einsame} einsame pikslar ({round(100 * einsame / fylt)} %): mykje støy, samle fargane i klyngjer")
        # Lyset skal kome frå oppe til venstre
        if type_ in ("fiende", "figur") and fylt:
            l = [lys(px[x, y]) for y in range(h // 2) for x in range(w // 2) if px[x, y][3] and lys(px[x, y]) > OMRISS_MAKS_LYS]
            rr = [lys(px[x, y]) for y in range(h // 2, h) for x in range(w // 2, w) if px[x, y][3] and lys(px[x, y]) > OMRISS_MAKS_LYS]
            if l and rr and sum(l) / len(l) < sum(rr) / len(rr) - 0.03:
                merknader.append("nedre høgre del er lysare enn øvre venstre: sjekk lysretninga")
    if not stille:
        namn = meta.get("namn", os.path.basename(sti))
        print(f"{namn}: {ark.width}x{ark.height}, {len(rammer)} ramme(r), {len(fargar)} fargar")
        print("  " + ("\n  ".join(merknader) if merknader else "Ser bra ut etter stilguiden."))
    return merknader


def ark_alle():
    kjelder = sorted(glob.glob(os.path.join(ROT, "kjelder", "*.pix")))
    bilete = [teikn(k)[1] for k in kjelder]
    if not bilete: print("Ingen kjelder."); return
    s = 4; pad = 8
    w = sum(b.width * s + pad for b in bilete) + pad; h = max(b.height * s for b in bilete) + pad * 2
    ark = ruter(w, h); x = pad
    for b in bilete:
        ark.alpha_composite(b.resize((b.width * s, b.height * s), Image.NEAREST), (x, pad)); x += b.width * s + pad
    os.makedirs(FORHAND, exist_ok=True)
    ut = os.path.join(FORHAND, "kontaktark.png"); ark.save(ut); print(ut)


if __name__ == "__main__":
    if len(sys.argv) < 2: print(__doc__); sys.exit(0)
    kom = sys.argv[1]
    if kom == "lag":
        for s in sys.argv[2:]:
            namn, ut = lag(s); print(f"{namn}: {ut or '(inga utfil)'} · førehandsvising i tools/pikselkunst/forhand/")
    elif kom == "sjekk":
        feil = sum(len(sjekk(s)) for s in sys.argv[2:]); sys.exit(1 if feil else 0)
    elif kom == "ark":
        ark_alle()
    elif kom == "alle":
        for s in sorted(glob.glob(os.path.join(ROT, "kjelder", "*.pix"))): lag(s); sjekk(s)
        ark_alle()
    else:
        print(__doc__)
