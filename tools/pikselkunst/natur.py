"""Naturelement som heile figurar: gran, bjørk, stein og gravhaug.

Teknikken er henta frå The Minish Cap (store kroner bygde av runde lauvklumpar
med lys kant oppe til venstre, steinar med tydelege flater og sprekker),
forma og fargane frå norsk natur (sjå konsept/): gran med hengjande greinlag,
bjørk med kvit, kroklete stamme og svarte merke, grå stein med mose og lav.

  python tools/pikselkunst/natur.py alle [--tving]    skriv kjelder/natur-*.pix

Figurane står med botnen midt på flisa si. Motoren teiknar skuggen på bakken.
"""
import sys, os, math

ROT = os.path.dirname(os.path.abspath(__file__))

def h(x, y, s):
    n = (x * 374761393 + y * 668265263 + s * 1442695041) & 0xFFFFFFFF
    n = ((n ^ (n >> 13)) * 1274126177) & 0xFFFFFFFF
    return ((n ^ (n >> 16)) & 0xFFFFFFFF) / 4294967296

PAL = [
    (".", "-", ""), ("o", "#0a0514", "omriss"),
    ("0", "#0c1e1c", "gran djup"), ("1", "#163228", "gran skugge"), ("2", "#1f4a38", "gran"), ("3", "#2e6448", "gran lys"), ("4", "#4a8058", "gran glans"),
    ("a", "#2a1810", "stamme djup"), ("b", "#4a2c1c", "stamme"), ("c", "#6e4428", "stamme lys"),
    ("W", "#3a3440", "bjørk merke"), ("X", "#a8a4a0", "bjørk skugge"), ("Y", "#d8d4cc", "bjørk"), ("Z", "#f4f2ec", "bjørk lys"),
    ("5", "#223a22", "lauv djup"), ("6", "#38582a", "lauv skugge"), ("7", "#567c32", "lauv"), ("8", "#7ea040", "lauv lys"), ("9", "#b0c85e", "lauv glans"),
    ("A", "#26242e", "stein djup"), ("B", "#44424e", "stein skugge"), ("C", "#666472", "stein"), ("D", "#8c8a96", "stein lys"), ("E", "#b4b2bc", "stein glans"),
    ("m", "#4a6a2a", "mose skugge"), ("n", "#6e9038", "mose"), ("p", "#98b44c", "mose lys"), ("l", "#c8b050", "lav"),
    ("q", "#16301f", "villgras djup"), ("r", "#1d3f28", "villgras skugge"), ("s", "#285632", "villgras"), ("u", "#3a7236", "villgras lys"), ("v", "#548f42", "villgras glans"),
    ("g", "#35683a", "gras skugge"), ("G", "#4a8a3f", "gras"), ("H", "#68a84a", "gras lys"), ("J", "#92c65e", "gras glans"),
]


class Lerret:
    def __init__(s, w, h): s.w, s.h = w, h; s.g = [["." for _ in range(w)] for _ in range(h)]
    def p(s, x, y, c):
        if 0 <= x < s.w and 0 <= y < s.h: s.g[y][x] = c
    def get(s, x, y): return s.g[y][x] if 0 <= x < s.w and 0 <= y < s.h else "."
    def disk(s, cx, cy, r, fn):
        for y in range(int(cy - r - 1), int(cy + r + 2)):
            for x in range(int(cx - r - 1), int(cx + r + 2)):
                d = math.hypot(x + .5 - cx, y + .5 - cy)
                if d <= r: s.p(x, y, fn(x, y, (x + .5 - cx) / r, (y + .5 - cy) / r))


def omriss(L):
    ut = [r[:] for r in L.g]
    for y in range(L.h):
        for x in range(L.w):
            if L.g[y][x] == "." and any(L.get(x + dx, y + dy) not in ".o" for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))):
                ut[y][x] = "o"
    L.g = ut


def klump(L, cx, cy, r, tonar, fro):
    """Ein rund lauv- eller barklump: lys kant oppe til venstre, mørk nede til høgre."""
    lys, mid, mork, djup = tonar
    def f(x, y, nx, ny):
        v = -nx * 0.55 - ny * 0.8
        if v > 0.55: return lys
        if v > -0.1: return mid
        if v > -0.6: return mork
        return djup
    L.disk(cx, cy, r, f)


def gran(v):
    W, H = 22, 40
    L = Lerret(W, H)
    cx = 11 + (v - 1) * 0.5
    # stamme
    for y in range(33, 39):
        for x in range(int(cx) - 1, int(cx) + 2): L.p(x, y, "c" if x < cx else "b")
    L.p(int(cx) + 1, 38, "a")
    # greinlag ovanfrå og ned: kvart lag breiare, med sagtakka underkant
    lag = [(2, 2.5), (6, 4), (10, 5.5), (14, 6.8), (19, 8.2), (24, 9.5), (29, 10.6)]
    if v == 2: lag = [(y + 5, r * 0.92) for (y, r) in lag[1:]]
    if v == 3: lag = [(y + 3, r * 1.02) for (y, r) in lag[:1]] + [(y + 1, r) for (y, r) in lag[1:]]
    for i, (y0, r) in enumerate(lag):
        hoyd = 7 if i else 5
        for y in range(y0, y0 + hoyd):
            t = (y - y0) / hoyd
            b = r * (0.35 + 0.65 * t)
            for x in range(W):
                dx = x + .5 - cx
                if abs(dx) > b: continue
                side = dx / max(1, b)
                c = "3" if side < -0.35 else "2" if side < 0.35 else "1"
                if t < 0.25: c = {"3": "4", "2": "3", "1": "2"}[c]
                if t > 0.8: c = {"4": "3", "3": "2", "2": "1", "1": "0"}[c]
                L.p(x, y, c)
        # sagtakk: greinspissar som heng ned under laget
        for x in range(int(cx - r), int(cx + r) + 1, 2):
            if h(x, i, v) > 0.35: L.p(x, y0 + hoyd, "1" if x > cx else "2")
        L.p(int(cx - r * 0.55), y0 + 2, "4"); L.p(int(cx - r * 0.3), y0 + 1, "4")
    L.p(int(cx), lag[0][0] - 2, "3"); L.p(int(cx), lag[0][0] - 1, "4")
    omriss(L)
    return L


def bjork(v):
    W, H = 32, 40
    L = Lerret(W, H)
    # kroklete kvit stamme med svarte merke
    x0 = 15 + (v - 1)
    sti = [(x0 + round(math.sin(y / 5 + v) * 1.4), y) for y in range(14, 39)]
    for (x, y) in sti:
        for dx, c in ((-1, "Z"), (0, "Y"), (1, "X")): L.p(x + dx, y, c)
        if h(x, y, v + 3) > 0.72: L.p(x + (0 if h(y, x, v) > 0.5 else -1), y, "W"); L.p(x + 1, y, "W")
    L.p(sti[-1][0] - 2, 38, "X"); L.p(sti[-1][0] + 2, 38, "X")
    # greiner
    for (sy, retn, lengd) in [(20, -1, 6), (17, 1, 6), (24, 1, 5)]:
        x, y = sti[sy - 14]
        for k in range(1, lengd): L.p(x + retn * k, y - k // 2, "X" if k < 3 else "W")
    # krone av lauvklumpar, lett og open (ikkje heilt tett som ei eik)
    for i, (kx, ky, r) in enumerate([(15, 11, 6.5), (10, 13, 4.5), (21, 13, 4.5)]):
        klump(L, kx + (v - 1), ky, r, ("7", "6", "5", "5"), v)
    klumpar = [(15, 7, 5.5), (9, 10, 4.2), (22, 10, 4.4), (12, 4, 3.8), (20, 4, 3.7), (6, 15, 3), (26, 15, 3.2), (16, 2.5, 2.6)]
    if v == 2: klumpar = [(k[0] - 1, k[1] + 1, k[2]) for k in klumpar]
    if v == 3: klumpar = klumpar[:-2] + [(24, 7, 3.4)]
    for i, (kx, ky, r) in enumerate(klumpar):
        kx += (h(i, v, 2) - 0.5) * 2; ky += (h(i, v, 3) - 0.5) * 1.5
        klump(L, kx + (v - 1), ky, r, ("9", "8", "7", "6"), v)
    # små hol i krona der stammen skin gjennom, og nokre mørke lauvtuster
    for i in range(6):
        x = 8 + int(h(i, v, 5) * 16); y = 4 + int(h(i, v, 6) * 11)
        if L.get(x, y) in "678": L.p(x, y, "5")
    for i in range(10):
        x = 5 + int(h(i, v, 7) * 22); y = 2 + int(h(i, v, 8) * 15)
        if L.get(x, y) in "78": L.p(x, y, "9" if y < 9 else "6")
    omriss(L)
    return L


def stein(v):
    W, H = 18, 15
    L = Lerret(W, H)
    if v == 3:
        W, H = 18, 15
    rx, ry = (7.5, 5.8) if v != 2 else (6.2, 5)
    cx, cy = 9, 8.5
    def f(x, y, nx, ny):
        s = -nx * 0.5 - ny * 0.85
        c = "E" if s > 0.62 else "D" if s > 0.18 else "C" if s > -0.35 else "B" if s > -0.75 else "A"
        return c
    for y in range(H):
        for x in range(W):
            nx, ny = (x + .5 - cx) / rx, (y + .5 - cy) / ry
            # litt kanta form: flatare botn
            if ny > 0.55: ny = 0.55 + (ny - 0.55) * 1.8
            if nx * nx + ny * ny <= 1: L.p(x, y, f(x, y, nx, ny))
    # sprekk og flate
    for k in range(4): L.p(int(cx) + 1 + k // 2, 5 + k, "B")
    L.p(int(cx) - 3, 6, "D"); L.p(int(cx) - 2, 6, "D")
    if v in (1, 3):   # mose og lav på toppen
        for x in range(W):
            for y in range(H):
                if L.get(x, y) in "EDC" and y < cy - 1 + math.sin(x * 1.3 + v) * 1.4:
                    L.p(x, y, "p" if y < 4 else "n" if (x + y) % 3 else "m")
        L.p(int(cx) + 4, 9, "l"); L.p(int(cx) + 5, 9, "l"); L.p(int(cx) - 5, 10, "l")
    omriss(L)
    return L


def haug():
    """Gravhaug på 3 x 2 fliser i utmarka: mørkt, tett gras, tydeleg kuvla form,
    ein krans av steinar rundt foten og ei ung bjørk på toppen."""
    W, H = 50, 36
    L = Lerret(W, H)
    cx, cy, rx, ry = 25, 20, 22, 15
    for y in range(H):
        for x in range(W):
            nx, ny = (x + .5 - cx) / rx, (y + .5 - cy) / ry
            if nx * nx + ny * ny <= 1:
                s_ = -nx * 0.35 - ny * 1.1 + 0.15
                c = "v" if s_ > 0.7 else "u" if s_ > 0.25 else "s" if s_ > -0.3 else "r" if s_ > -0.7 else "q"
                L.p(x, y, c)
    # grastuster i rader, lyse oppe og mørke nede
    for rad, y in enumerate(range(12, 32, 4)):
        for x in range(6 + (rad % 2) * 3, 45, 6):
            if L.get(x, y) == ".": continue
            under = L.get(x, y)
            lys = {"v": "v", "u": "v", "s": "u", "r": "s", "q": "r"}[under]
            mork = {"v": "u", "u": "s", "s": "r", "r": "q", "q": "q"}[under]
            L.p(x, y - 1, lys); L.p(x - 1, y, lys); L.p(x + 1, y, mork); L.p(x, y + 1, mork)
    # nokre steinar ved foten framme
    for (x, y) in [(10, 30), (17, 33), (31, 33), (39, 30)]:
        L.p(x, y, "D"); L.p(x + 1, y, "C"); L.p(x, y + 1, "B"); L.p(x + 1, y + 1, "A")
    # ung bjørk på toppen
    for y in range(4, 12): L.p(24, y, "Y" if y % 3 else "W"); L.p(25, y, "X")
    klump(L, 24, 5, 3.2, ("9", "8", "7", "6"), 1); klump(L, 27, 7, 2.4, ("8", "7", "6", "5"), 1)
    omriss(L)
    return L


NATUR = {
    "gran1": lambda: gran(1), "gran2": lambda: gran(2), "gran3": lambda: gran(3),
    "bjork1": lambda: bjork(1), "bjork2": lambda: bjork(2), "bjork3": lambda: bjork(3),
    "stein1": lambda: stein(1), "stein2": lambda: stein(2), "stein3": lambda: stein(3),
    "haug": haug,
}


def pix(namn, L):
    brukt = {c for r in L.g for c in r}
    ut = [f"# namn: natur-{namn}", "# type: fiende", f"# ut: bilete/spel/natur/{namn}.png", f"# storleik: {L.w}x{L.h}", "palett:"]
    ut += [f"  {t} = {f}    {m}".rstrip() for t, f, m in PAL if t in brukt or t == "."]
    ut.append("bilete:"); ut += ["  " + "".join(r) for r in L.g]
    return "\n".join(ut) + "\n"


if __name__ == "__main__":
    tving = "--tving" in sys.argv
    namn = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not namn: print(__doc__); sys.exit(0)
    if namn == ["alle"]: namn = list(NATUR)
    for n in namn:
        sti = os.path.join(ROT, "kjelder", f"natur-{n}.pix")
        if os.path.exists(sti) and not tving: print(f"natur-{n}.pix finst alt (bruk --tving)"); continue
        open(sti, "w", encoding="utf-8").write(pix(n, NATUR[n]())); print(f"skreiv kjelder/natur-{n}.pix")
