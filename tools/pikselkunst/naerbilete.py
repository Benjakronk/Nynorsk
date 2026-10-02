"""Nærbilete i scenene (Motor.naerbilete), 96 x 72, viste tre gonger så stort midt på skjermen.

  skiftebrev        det danske skiftebrevet etter far, Ørsta 1826, med raudt lakksegl.
                    Kanselliblekket renn ut av bokstavane og samlar seg til ein dråpe.
  kyrkjebok-blekk   kyrkjeboka i arkivet: blekket renn ut av sida.
  kyrkjebok         same sida etter kampen: blekket er borte frå sida, berre namnet til
                    far står att, og ved sida av ei fin, lilla line («Det som er skrive, står.»).

  python tools/pikselkunst/naerbilete.py alle        skriv kjelder/naer-<namn>.pix og lagar PNG
  python tools/pikselkunst/naerbilete.py skiftebrev  berre dette

Kjelda er dette skriptet. .pix-filene blir skrivne på nytt kvar gong.
Lyset kjem frå oppe til venstre. Flater med éin tone kvar, omriss rundt heile tingen.
"""
import os, sys, math, subprocess

ROT = os.path.dirname(os.path.abspath(__file__))
W, H = 96, 72

RAMPER = {
    "papir": ["#4a3420", "#8c6e48", "#bea06c", "#dcc89a", "#f2e6c2"],
    "blekk": ["#080010", "#101028", "#201848", "#383070", "#5848a0", "#8878d0"],
    "auge":  ["#c06810", "#f8d840"],
    "lakk":  ["#2a0610", "#5e1020", "#962430", "#c84040", "#ec7a62"],
    "laer":  ["#1e0e0a", "#3e1e14", "#62321e", "#8a4c2a", "#b07040"],
    "omriss": ["#0a0514"],
}


class Bilete:
    def __init__(s):
        s.g = [[None] * W for _ in range(H)]

    def p(s, x, y, c):
        x, y = int(round(x)), int(round(y))
        if 0 <= x < W and 0 <= y < H: s.g[y][x] = c

    def get(s, x, y): return s.g[y][x] if 0 <= x < W and 0 <= y < H else None

    def rad(s, y, x0, x1, c):
        for x in range(x0, x1 + 1): s.p(x, y, c)

    def rect(s, x, y, w, h, c):
        for yy in range(y, y + h): s.rad(yy, x, x + w - 1, c)

    def ell(s, cx, cy, rx, ry, c, berre=None):
        for y in range(int(cy - ry) - 1, int(cy + ry) + 2):
            for x in range(int(cx - rx) - 1, int(cx + rx) + 2):
                if ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1:
                    if berre is None or (s.get(x, y) and s.get(x, y)[0] == berre): s.p(x, y, c)

    def rute(s, x0, y0, rader, farge):
        for dy, r in enumerate(rader):
            for dx, t in enumerate(r):
                if t in farge: s.p(x0 + dx, y0 + dy, farge[t])

    def omriss(s):
        ut = [r[:] for r in s.g]
        for y in range(H):
            for x in range(W):
                if s.g[y][x] is not None: continue
                if any(s.get(x + dx, y + dy) is not None for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))):
                    ut[y][x] = ("omriss", 0)
        s.g = ut


# ---------------------------------------------------------------- felles
def tal(n):
    """Fast «tilfeldig» tal (same bilete kvar gong)."""
    n = (n * 2654435761) & 0xFFFFFFFF
    return (n ^ (n >> 13)) & 0xFFFF


def skrift(B, x0, x1, y, frø, farge, hopp=()):
    """Ei line med skråskrift: ord av minimar (korte, skrå strok) med bindestrek nedst,
    og ein og annan oppstrek. hopp: x-område som er tomme (der blekket har rent ut)."""
    x = x0
    i = frø
    while x < x1 - 2:
        lengd = 4 + tal(i) % 7
        i += 1
        ende = min(x + lengd, x1)
        for xx in range(x, ende):
            if any(a <= xx <= b for a, b in hopp): continue
            k = xx - x
            if k % 2 == 0:
                B.p(xx, y, farge); B.p(xx + 1, y - 1, farge)       # minim, skrå mot høgre
            elif tal(i * 17 + xx) % 3 == 0:
                B.p(xx, y, farge)                                   # bindestrek
            if k % 2 == 0 and tal(i * 31 + xx) % 7 == 0:
                B.p(xx + 2, y - 2, farge)                           # oppstrek (l, h, d)
        x = ende + 3


def draape(B, x, y0, y1, frø=0, botn=False):
    """Ein blekkstraum som renn nedover og bukter seg litt: smal øvst, breiare nedst,
    lyst glimt på venstre side. Når han ikkje når kanten (botn), endar han i ein dråpe."""
    xx = x
    for y in range(y0 + 1, y1 + 1):
        if y > y0 + 3 and tal(frø * 7 + y) % 6 == 0: xx += 1 if tal(frø + y) % 2 else -1
        brei = 1 if y - y0 < (y1 - y0) // 3 else 2
        for dx in range(brei): B.p(xx + dx, y, ("blekk", 2))
        if brei == 2: B.p(xx, y, ("blekk", 3))
    B.rad(y0, x - 1, x + 1, ("blekk", 2)); B.p(x, y0 - 1, ("blekk", 2))   # bokstaven smeltar
    if not botn:                                        # dråpen nedst
        B.ell(xx + 0.5, y1 + 1, 1.6, 1.8, ("blekk", 2))
        B.p(xx, y1 + 1, ("blekk", 4))
    return xx


def blekkvesen(B, cx, cy, rx, ry):
    """Dråpen med gule auge (same fargar som blekkdropen og Blekklatten)."""
    B.ell(cx, cy, rx, ry, ("blekk", 2))
    B.ell(cx - 1, cy - 1, rx - 1.5, ry - 1.5, ("blekk", 3))
    B.ell(cx - rx * 0.45, cy - ry * 0.45, rx * 0.35, ry * 0.3, ("blekk", 4))
    B.rad(int(cy + ry) - 1, int(cx - rx * 0.5), int(cx + rx * 0.6), ("blekk", 1))
    B.p(cx - rx * 0.55, cy - ry * 0.6, ("blekk", 5)); B.p(cx - rx * 0.55 + 1, cy - ry * 0.6, ("blekk", 5))
    for ax in (int(cx - 4), int(cx + 2)):          # store auge: gult, oransje under, pupill
        ay = int(cy) - 1
        B.rect(ax, ay, 3, 2, ("auge", 1)); B.rad(ay + 2, ax, ax + 2, ("auge", 0))
        B.rect(ax + 1, ay, 1, 3, ("blekk", 0))
    B.rad(int(cy) + 3, int(cx - 2), int(cx + 2), ("blekk", 0))   # munnen


# ---------------------------------------------------------------- skiftebrevet
GOTISK = {   # gotisk kanselliskrift til overskrifta, 8 rader (grunnline nedst)
    "S": ["..##.", ".#..#", ".#...", "..#..", "...#.", "#...#", "#..#.", ".##.."],
    "k": ["#...", "#...", "#...", "#.##", "##..", "#.#.", "#..#", "#..#"],
    "i": ["..", ".#", "..", "#.", "#.", "#.", "#.", ".#"],
    "f": [".##", "#..", "#..", "###", "#..", "#..", "#..", "#.."],
    "t": ["...", ".#.", ".#.", "###", ".#.", ".#.", ".#.", "..#"],
    "e": ["...", "...", "...", ".##", "#.#", "##.", "#..", ".##"],
    "-": ["..", "..", "..", "..", "##", "..", "##", ".."],
    "B": ["####.", "#...#", "#...#", "####.", "#...#", "#...#", "#...#", "####."],
    "r": ["...", "...", "...", "#.#", "##.", "#..", "#..", "#.."],
    "v": ["...", "...", "...", "#.#", "#.#", "#.#", "#.#", ".#."],
}


def gotisk(B, x, y, tekst, farge):
    for t in tekst:
        g = GOTISK[t]
        B.rute(x, y, g, {"#": farge})
        x += len(g[0]) + 1
    return x


def skiftebrev(B, blekk=True):
    pap = lambda t: ("papir", t)
    x0, x1, y0, y1 = 10, 85, 3, 59
    B.rect(x0, y0, x1 - x0 + 1, y1 - y0 + 1, pap(3))
    # Lys oppe til venstre (eit breitt felt), skugge langs høgre og nedre kant
    for y in range(y0, y0 + 16):
        B.rad(y, x0, x0 + 34 - 2 * (y - y0), pap(4))
    B.rect(x1 - 1, y0 + 1, 2, y1 - y0, pap(2))
    B.rad(y1, x0 + 1, x1, pap(2)); B.rad(y1 - 1, x0 + 2, x1, pap(2))
    # Bretten: brevet har vore bretta i tre
    for yb in (22, 41):
        B.rad(yb, x0, x1, pap(2)); B.rad(yb + 1, x0, x1 - 2, pap(4))
    # Bretta hjørne oppe til høgre (baksida av papiret)
    for i in range(8):
        for x in range(x1 - 7 + i, x1 + 1): B.p(x, y0 + i, None)
        for x in range(x1 - 7, x1 - 7 + i + 1): B.p(x, y0 + i, pap(2) if x < x1 - 7 + i else pap(1))
    # Gulnande flekker
    for fx, fy in ((70, 30), (26, 50), (78, 16)):
        B.rect(fx, fy, 2, 1, pap(2)); B.p(fx + 1, fy + 1, pap(2))

    ink = ("blekk", 1)
    # Overskrifta, med strek og krusedullar under
    ende = gotisk(B, 25, 6, "Skifte-Brev", ("blekk", 0))
    B.rad(15, 23, ende + 1, ("blekk", 2)); B.p(22, 14, ("blekk", 2)); B.p(ende + 2, 14, ("blekk", 2))
    # Teksten. Der blekket renn ut, er bokstavane borte (hopp)
    kjelder = [(34, 29, 60, 1, True), (42, 32, 60, 2, True), (51, 35, 47, 3, False), (27, 38, 46, 4, False)] if blekk else []
    hopp_line = {}
    for i, y in enumerate((19, 26, 29, 32, 35, 38, 45, 48)):
        venstre = 20 if i in (0, 6) else 16
        skrift(B, venstre, 58 if y == 48 else 80, y, 7 + i * 13, ink, hopp_line.get(y, ()))
    # Underskrift: sorenskrivaren, med krusedull
    B.rute(16, 51, [
        ".##.#..#.##..#.",
        "#..##.#.#..#.#.",
        "#.....#....##..",
        ".########..#...",
    ], {"#": ink})
    B.rad(55, 18, 34, ("blekk", 2))
    # Lakkseglet med band
    cx, cy = 71, 51
    B.rute(cx - 6, cy + 4, ["##.....##", ".##...##.", "..#...#.."], {"#": ("lakk", 1)})
    B.ell(cx, cy, 6.6, 6, ("lakk", 2))
    for x, y in ((cx + 6, cy - 1), (cx - 7, cy + 2), (cx + 3, cy + 6)): B.p(x, y, ("lakk", 2))   # ujamn kant
    B.ell(cx, cy, 4.2, 3.8, ("lakk", 1))      # pressa ring
    B.ell(cx, cy, 3.2, 2.8, ("lakk", 2))
    B.rute(cx - 2, cy - 2, ["..#..", ".###.", "#####", ".###.", "..#.."], {"#": ("lakk", 3)})   # stjerne i seglet
    B.p(cx, cy, ("lakk", 1))
    B.p(cx - 5, cy - 3, ("lakk", 4)); B.p(cx - 4, cy - 4, ("lakk", 4)); B.p(cx - 3, cy - 4, ("lakk", 3))
    B.rad(cy + 5, cx - 2, cx + 3, ("lakk", 1))

    if blekk:
        # Straumar frå bokstavane ned over papiret, og dråpen under kanten
        for x, y, y1, frø, botn in kjelder:
            draape(B, x, y, y1, frø, botn)
        # Bokstavar som lyftar seg frå linja
        for x, y in ((37, 26), (45, 29), (54, 32), (30, 35)):
            B.p(x, y, ink); B.p(x + 1, y - 1, ink)
        blekkvesen(B, 40, 64, 12, 6.5)
        B.ell(28, 66, 3, 2, ("blekk", 2)); B.ell(52, 67, 3, 1.6, ("blekk", 2))


# ---------------------------------------------------------------- kyrkjeboka
SMAA = {   # liten skrift til namnet, 6 rader (x-høgd 4), og tal i 5 rader
    "I": ["###", ".#.", ".#.", ".#.", ".#.", "###"],
    "v": ["...", "...", "#.#", "#.#", "#.#", ".#."],
    "a": ["...", "...", ".##", "#.#", "#.#", ".##"],
    "r": ["...", "...", "#.#", "##.", "#..", "#.."],
    "J": ["..#", "..#", "..#", "..#", "#.#", ".#."],
    "o": ["...", "...", ".#.", "#.#", "#.#", ".#."],
    "n": ["...", "...", "##.", "#.#", "#.#", "#.#"],
    "s": ["...", "...", ".##", "#..", "..#", "##."],
    "e": ["...", "...", ".#.", "###", "#..", ".##"],
    "1": [".#", "##", ".#", ".#", ".#"],
    "8": [".#.", "#.#", ".#.", "#.#", ".#."],
    "2": ["##.", "..#", ".#.", "#..", "###"],
    "6": [".##", "#..", "##.", "#.#", ".#."],
    "†": [".#.", "###", ".#.", ".#.", ".#."],
    " ": [".."],
}


def smaa_tekst(B, x, y, tekst, farge):
    for t in tekst:
        g = SMAA[t]
        B.rute(x, y, g, {"#": farge})
        x += len(g[0]) + 1
    return x


def kyrkjebok(B, blekk=True):
    pap = lambda t: ("papir", t)
    laer = lambda t: ("laer", t)
    # Permen (skinn) under sidene
    B.rect(3, 9, 90, 56, laer(2))
    B.rad(9, 3, 92, laer(3)); B.rect(3, 9, 1, 55, laer(3))
    B.rect(3, 63, 90, 2, laer(1)); B.rect(91, 10, 2, 54, laer(1))
    # Sidekantane (bladkanten) nedst og på sidene
    for y in (59, 61):
        B.rad(y, 6, 45, pap(2)); B.rad(y, 50, 89, pap(2))
    for y in (60, 62):
        B.rad(y, 6, 45, pap(1)); B.rad(y, 50, 89, pap(1))
    B.rect(5, 8, 1, 54, pap(1)); B.rect(90, 8, 1, 54, pap(1))
    # Sidene: kvelvar ned mot ryggen
    for y in range(5, 59):
        B.rad(y, 6, 46, pap(3)); B.rad(y, 49, 89, pap(3))
    for x in range(6, 90):
        topp = 5 + (2 if 42 <= x <= 53 else 1 if 36 <= x <= 59 else 0)
        for y in range(5, topp): B.p(x, y, None)
    # Lys oppe til venstre på venstresida, skugge inn mot ryggen
    for y in range(5, 22):
        B.rad(y, 6, 6 + 24 - (y - 5), pap(4))
    for y in range(5, 22):
        B.rad(y, 49, 49 + 14 - (y - 5), pap(4)) if y < 19 else None
    for y in range(6, 59):
        B.rad(y, 44, 46, pap(2)); B.rad(y, 49, 50, pap(2))
        B.p(47, y, pap(1)); B.p(48, y, pap(1))
    B.rect(88, 6, 2, 53, pap(2))
    # Linjal: kolonnar i kyrkjeboka (døde i soknet)
    for x in (12, 30, 55, 74):
        for y in range(9, 57): B.p(x, y, pap(2))
    B.rad(12, 7, 43, pap(2)); B.rad(12, 51, 87, pap(2))

    ink = ("blekk", 1)
    # Overskrift på begge sidene
    skrift(B, 14, 28, 10, 3, ink); skrift(B, 57, 72, 10, 5, ink)
    # Postane på venstresida (gamle, alle i blekk)
    for i, y in enumerate(range(17, 57, 5)):
        skrift(B, 8, 11, y, 40 + i, ink)
        skrift(B, 14, 41, y, 60 + i * 7, ink)
    # Høgresida: postane før far. Med blekk: straumar ut frå bokstavane
    straumar = [(86, 17, 58, 5, True), (79, 22, 33, 6, False), (63, 22, 30, 7, False), (70, 17, 26, 8, False), (52, 22, 31, 9, False)] if blekk else []
    for i, y in enumerate((17, 22, 27, 32)):
        f = ink if blekk else pap(2)     # etter kampen har blekket rent ut av sida
        hopp = []
        skrift(B, 51, 54, y, 90 + i, f, hopp)
        skrift(B, 57, 87, y, 120 + i * 5, f, hopp)
    # Den siste posten: namnet til far, med kross og dødsåret
    smaa_tekst(B, 51, 36, "†", ink)
    smaa_tekst(B, 57, 35, "Ivar", ink)
    smaa_tekst(B, 57, 42, "Jonsen", ink)
    smaa_tekst(B, 57, 50, "1826", ink)
    if blekk:
        for x, y, y1, frø, botn in straumar:
            draape(B, x, y, y1, frø, botn)
        for x, y in ((63, 20), (66, 19), (72, 15), (80, 25)):
            B.p(x, y, ink); B.p(x + 1, y - 1, ink)
        blekkvesen(B, 78, 64, 12, 6.5)
        B.ell(63, 67, 3, 1.8, ("blekk", 2))
    else:
        # Fine, fine skrift ved sida av namnet (lilla, som glansen i blekket)
        skrift(B, 74, 87, 38, 11, ("blekk", 5)); skrift(B, 82, 87, 45, 4, ("blekk", 5))


# ---------------------------------------------------------------- skriv
BILETE = {
    "skiftebrev": lambda B: skiftebrev(B, True),
    "kyrkjebok-blekk": lambda B: kyrkjebok(B, True),
    "kyrkjebok": lambda B: kyrkjebok(B, False),
}


def lag(namn):
    B = Bilete()
    BILETE[namn](B)
    B.omriss()
    brukt = sorted({c for r in B.g for c in r if c})
    TEIKN = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    kart = {c: TEIKN[i] for i, c in enumerate(brukt)}
    linjer = [f"# namn: naer-{namn}", "# type: naer", f"# ut: bilete/spel/naer/{namn}.png",
              f"# storleik: {W}x{H}", "# laga med tools/pikselkunst/naerbilete.py", "palett:", "  . = -"]
    linjer += [f"  {kart[c]} = {RAMPER[c[0]][c[1]]}    {c[0]} {c[1]}" for c in brukt]
    linjer.append("bilete:")
    linjer += ["  " + "".join(kart[c] if c else "." for c in r) for r in B.g]
    sti = os.path.join(ROT, "kjelder", f"naer-{namn}.pix")
    open(sti, "w", encoding="utf-8").write("\n".join(linjer) + "\n")
    return sti, len(brukt)


if __name__ == "__main__":
    if len(sys.argv) < 2: print(__doc__); sys.exit(0)
    val = list(BILETE) if sys.argv[1] == "alle" else sys.argv[1:]
    for n in val:
        sti, nf = lag(n)
        subprocess.run([sys.executable, os.path.join(ROT, "pix.py"), "lag", sti], stdout=subprocess.DEVNULL)
        r = subprocess.run([sys.executable, os.path.join(ROT, "pix.py"), "sjekk", sti], capture_output=True, text=True, encoding="utf-8")
        print(r.stdout.strip())
