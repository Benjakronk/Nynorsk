"""Malarverktøy for kampbakgrunnane: støy, dithering og luftperspektiv som i Final Fantasy VI.

Kampbakgrunnane i Final Fantasy VI er måla bilete gjorde om til pikslar (26 til 46 fargar):
- Tekstur og dithering overalt (rutemønster mellom to tonar), ikkje flate band.
- Luftperspektiv: det som er langt borte, er blålegare og har mindre kontrast.
- Skyer som lange, stripete formasjonar med lyse kantar, ikkje runde klumpar med omriss.
- Tett tekstur på bakken, og ting som blir større jo nærare dei er.
- Store former i forgrunnen (stammer, bergveggar) som bryt horisonten.
- Ingen svarte omriss.

Verktøya her: fargeskalaer (rampe), ordna dithering (Bayer 4 x 4), verdistøy og fBm (fleire
lag støy), og nokre malarstrøk (gran, gras, stein) som tek imot eit lerret med p(x, y, farge).
"""
import math

BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]]


def hx(h):
    if isinstance(h, tuple): return h
    h = h.lstrip("#"); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def blend(a, b, t):
    a, b = hx(a), hx(b)
    return tuple(round(a[i] * (1 - t) + b[i] * t) for i in range(3))


def rampe(*fargar, steg=None):
    """Ein fargeskala frå mørk til lys. steg: talet på tonar (interpolert mellom fargane)."""
    f = [hx(c) for c in fargar]
    if not steg or steg <= len(f): return f
    ut = []
    for i in range(steg):
        t = i / (steg - 1) * (len(f) - 1); k = min(int(t), len(f) - 2)
        ut.append(blend(f[k], f[k + 1], t - k))
    return ut


def terskel(x, y): return (BAYER[y & 3][x & 3] + 0.5) / 16


def tone(r, v, x, y):
    """Vel ein tone frå skalaen r for verdien v (0 til 1), med ordna dithering mellom tonane."""
    v = min(0.9999, max(0.0, v)); f = v * (len(r) - 1); i = int(f)
    return r[i + 1] if i + 1 < len(r) and (f - i) > terskel(x, y) else r[i]


def _h(ix, iy, s):
    n = (ix * 374761393 + iy * 668265263 + s * 1442695041) & 0xFFFFFFFF
    n = ((n ^ (n >> 13)) * 1274126177) & 0xFFFFFFFF
    return ((n ^ (n >> 16)) & 0xFFFFFFFF) / 4294967296


def h(x, y, s): return _h(int(x), int(y), s)


def stoy(x, y, s):
    """Verdistøy med mjuke overgangar (0 til 1)."""
    ix, iy = math.floor(x), math.floor(y); fx, fy = x - ix, y - iy
    fx, fy = fx * fx * (3 - 2 * fx), fy * fy * (3 - 2 * fy)
    a, b = _h(ix, iy, s), _h(ix + 1, iy, s)
    c, d = _h(ix, iy + 1, s), _h(ix + 1, iy + 1, s)
    return (a + (b - a) * fx) * (1 - fy) + (c + (d - c) * fx) * fy


def fbm(x, y, s, okt=4):
    """Fleire lag støy (fraktal): grove former med finare detaljar oppå."""
    v, a, tot = 0.0, 1.0, 0.0
    for i in range(okt):
        v += stoy(x, y, s + i * 17) * a; tot += a; x *= 2.03; y *= 2.03; a *= 0.5
    return v / tot


def rygg(x, s, okt=5):
    """Fjellrygg: skarpe toppar (omvendt absoluttverdi av støy)."""
    v, a, tot = 0.0, 1.0, 0.0
    for i in range(okt):
        n = 1 - abs(stoy(x, 0.5, s + i * 23) * 2 - 1)
        v += n * n * a; tot += a; x *= 2.1; a *= 0.5
    return v / tot


# ---------------------------------------------------------------- malarstrøk
def gran(L, x, ybot, hoyd, r, lys=0.0, fro=1):
    """Gran med sagtakka greinlag: lys kant til venstre (ljoset), mørk til høgre.
    r er ein skala frå mørk til lys. lys legg til ljos (0 til 1) på heile treet."""
    for y in range(int(ybot - hoyd), int(ybot) + 1):
        t = (y - (ybot - hoyd)) / hoyd
        lag = (t * 6) % 1                                              # greinlag: breiare nede i kvart lag
        b = hoyd * 0.24 * t * (0.72 + 0.28 * lag) + 0.5
        b += (h(y, x, fro) - 0.5) * 1.6
        for dx in range(-int(b) - 1, int(b) + 2):
            if abs(dx) > b: continue
            side = dx / max(1.0, b)
            v = 0.55 - side * 0.35 - lag * 0.25 + lys + (h(x + dx, y, fro + 1) - 0.5) * 0.25
            L.p(x + dx, y, tone(r, v, x + dx, y))


def graset(L, x0, x1, y0, y1, r, s, tett=1.0, blad=None):
    """Grasstrå som blir lengre og tydelegare nærare oss (lenger ned)."""
    n = int((x1 - x0) * (y1 - y0) * 0.05 * tett)
    for i in range(n):
        x = x0 + int(h(i, 1, s) * (x1 - x0)); t = h(i, 2, s) ** 0.8; y = int(y0 + t * (y1 - y0))
        lengd = 1 + int(t * 4 + h(i, 3, s) * 1.5)
        lut = -1 if h(i, 4, s) < 0.3 else 1 if h(i, 4, s) > 0.8 else 0
        for k in range(lengd):
            L.p(x + (lut if k > lengd // 2 else 0), y - k, r[min(len(r) - 1, 2 + k * (len(r) - 3) // max(1, lengd))])
        L.p(x, y + 1, r[0])


def stein(L, x, y, s, r, lys=(-0.6, -0.8)):
    """Stein utan omriss: lys flate oppe til venstre, mørk nede, slagskugge på bakken."""
    rx, ry = s, s * 0.62
    for yy in range(int(y - ry) - 1, int(y + ry) + 2):
        for xx in range(int(x - rx) - 1, int(x + rx) + 2):
            nx, ny = (xx + 0.5 - x) / rx, (yy + 0.5 - y) / ry
            if ny > 0.4: ny = 0.4 + (ny - 0.4) * 2
            if nx * nx + ny * ny > 1: continue
            v = 0.55 + (nx * lys[0] + ny * lys[1]) * 0.45 + (h(xx, yy, 7) - 0.5) * 0.2
            L.p(xx, yy, tone(r, v, xx, yy))


def bjork(L, x, ybot, hoyd, fro=1):
    """Bjørk utan omriss: kvit stamme med svarte merke og ei open, lys lauvkrone."""
    stamme = rampe("#5a5460", "#9a96a0", "#d4d0ca", "#f4f2ec")
    lauv = rampe("#2a4424", "#46682c", "#6a8e38", "#98b44a", "#c8d86e")
    top = ybot - hoyd
    for y in range(int(top + hoyd * 0.35), int(ybot)):
        x0 = x + int(math.sin(y / 7 + fro) * 1.2)
        for dx in (-1, 0, 1):
            c = tone(stamme, 0.85 - (dx + 1) * 0.3, x0 + dx, y)
            if h(x0 + dx, y // 2, fro + 60) > 0.84: c = (42, 38, 48)
            L.p(x0 + dx, y, c)
    rx, ry = hoyd * 0.32, hoyd * 0.3
    cy = top + ry
    for y in range(int(top) - 1, int(cy + ry) + 1):
        for xx in range(int(x - rx) - 1, int(x + rx) + 2):
            d = fbm(xx / 4, y / 4, fro + 70, 3)
            k = ((xx - x) / rx) ** 2 + ((y - cy) / ry) ** 2
            if d < 0.22 + k * 0.38: continue
            lys = d - fbm((xx + 1.5) / 4, (y + 1.5) / 4, fro + 70, 3)
            L.p(xx, y, tone(lauv, 0.35 + (d - 0.22 - k * 0.38) * 2 + lys * 6, xx, y))
