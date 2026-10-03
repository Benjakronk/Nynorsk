"""Utsynet frå galleriet ned i skipet (bilete/spel/bygg/inne-skip-utsyn.png, kartet kyrkje-galleri).

Skipet ligg djupt under galleriet, så det blir teikna mindre (halv storleik), mørkare, kaldare og med
færre fargar, rett ovanfrå: toppen av benkeradene, løparen, hovud i benkene og lysekronene sett
ovanfrå under brystninga. På sidene er veggene ned i djupet mørke.

  python tools/pikselkunst/oversikt.py k55-utan kart=kyrkja skala=1 stemning=ingen utanOver=1 utanFolk=1
  python tools/pikselkunst/utsyn_galleri.py

Det første steget lagar forhand/skjerm/k55-utan.png (heile kyrkja utan lys, utan det som heng høgt og
utan folk). Skriptet tek rad 41 til 50, skalerer til halv storleik og målar hovud og kroner oppå.
"""
import os
from PIL import Image

ROT = os.path.dirname(os.path.abspath(__file__))
KJELDE = os.path.join(ROT, "forhand", "skjerm", "k55-utan.png")
UT = os.path.join(ROT, "..", "..", "bilete", "spel", "bygg", "inne-skip-utsyn.png")
W, H = 21 * 16 + 8, 80


def lag():
    full = Image.open(KJELDE).convert("RGB")
    skip = full.crop((0, 41 * 16, 21 * 16, 51 * 16)).reduce(2)            # 168 x 80, rett ovanfrå og langt nede
    skip = skip.quantize(colors=20).convert("RGB")                        # færre fargar, skarpe kantar att
    px = skip.load()
    for y in range(skip.height):                                         # mørkare og kaldare, mest lengst borte
        k = 0.42 + 0.18 * y / skip.height
        for x in range(skip.width):
            r, g, b = px[x, y]
            grå = (r + g + b) / 3
            r, g, b = [c * 0.6 + grå * 0.4 for c in (r, g, b)]            # dempa fargar
            px[x, y] = (int(r * k), int(g * k), int(min(255, b * k + 12)))
    ut = Image.new("RGBA", (W, H), (0, 0, 0, 255))
    ox = (W - skip.width) // 2
    for x in range(W):                                                    # veggene ned i djupet
        d = min(abs(x - ox), abs(x - (ox + skip.width)))
        f = (8 + min(d, 60) // 12, 7 + min(d, 60) // 14, 14 + min(d, 60) // 10)
        for y in range(H): ut.putpixel((x, y), f + (255,))
    ut.paste(skip, (ox, 0))
    def p(x, y, c):
        if 0 <= x < W and 0 <= y < H: ut.putpixel((x, y), c + (255,))
    # hovud i benkene (sett ovanfrå): mørkt hår, kvitt skaut, grått hår
    for (bx, by, c) in [(ox + 24, 19, (40, 28, 22)), (ox + 36, 19, (150, 148, 140)), (ox + 120, 19, (40, 28, 22)),
                        (ox + 30, 35, (150, 148, 140)), (ox + 112, 35, (72, 56, 40)), (ox + 136, 35, (150, 148, 140)),
                        (ox + 20, 51, (72, 56, 40)), (ox + 128, 51, (40, 28, 22)), (ox + 44, 67, (150, 148, 140)), (ox + 108, 67, (40, 28, 22))]:
        p(bx, by, c); p(bx + 1, by, c); p(bx, by + 1, tuple(v // 2 for v in c)); p(bx + 1, by + 1, tuple(v // 2 for v in c))
    # lysekronene sett ovanfrå (rad 47 i kyrkja): ein ring med ljos og ei kule i midten
    for cx in (ox + 44, ox + 124):
        cy = (47 - 41) * 8 + 2
        for i in range(10):
            import math
            a = 2 * math.pi * i / 10
            x, y = round(cx + 7 * math.cos(a)), round(cy + 3 * math.sin(a))
            p(x, y, (150, 112, 40)); p(x, y - 1, (230, 210, 150) if i % 2 == 0 else (150, 112, 40))
        p(cx, cy, (190, 150, 60)); p(cx - 1, cy, (120, 84, 30))
    ut.save(UT)
    print(UT)


if __name__ == "__main__":
    lag()
