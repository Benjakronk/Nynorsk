"""Prøve: Ivar med auge som i Final Fantasy VI (Locke, Terra, Celes).

I FF6 er eit auge framanfrå 2 x 2 pikslar under ei mørk vippeline: øvst ein kvit piksel
(augekvita) og ein mørk iris, under berre irisen. Frå sida er irisen éin piksel brei med
augekvita bak. I dag har Ivar eitt mørkt strek (1 x 2) per auge.

Skriptet byter augeradene i rammene som har det vanlege andletet, og lagar eit
samanlikningsark: dagens Ivar til venstre, prøva til høgre, og Celes og Locke frå FF6
som referanse. Spelet blir ikkje endra.

  python tools/pikselkunst/ansikt_test.py      skriv forhand/ivar-ansikt-test.png
"""
import os
from PIL import Image, ImageDraw
import ivar_figur as IV
import handfigur

ROT = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(ROT, "forhand", "ivar-ansikt-test.png")

PAL = dict(IV.PAL, I="#26306c")                       # iris: mørk blå, som hjå Celes

# Augeradene i dei vanlege andleta (rad 7 til 9, eller ei rad lenger ned i gangen): gamle -> nye.
FRAMAN = {
    7: ("..rqhHHhhhhhqq..", "..rqooHhhhooqq.."),   # vippeline over begge auga
    8: ("..qhHoHhhhohhq..", "..qhWIHhhhIWhq.."),   # kvit + iris
    9: ("...hHoHhhhohj...", "...hHIHhhhIhj..."),   # iris
}
SIDE = {
    7: (".hHHhhrrjrrrqq..", ".hHoohrrjrrrqq.."),
    8: (".hHohhhhjrrrq...", ".hHIWhhhjrrrq..."),
    9: ("..hohhhjjrrqq...", "..hIhhhjjrrqq..."),
}


def med_nye_auge(R):
    """Byter radene etter innhald, så rammer der hovudet sig ei rad i gangen, òg blir med."""
    byt = {gammal: nytt for byte in (FRAMAN, SIDE) for gammal, nytt in byte.values()}
    return {k: [byt.get(r, r) for r in g] for k, g in R.items()}


def utsnitt(ark, rader, skala):
    """Rad 0 til 2 (ned, opp, side) frå eit figurark, forstørra."""
    b = ark.crop((0, 0, ark.width, 24 * rader))
    return b.resize((b.width * skala, b.height * skala), Image.NEAREST)


def ref(fil, boks, skala):
    p = os.path.join(ROT, "forhand", "referansar", fil)
    if not os.path.exists(p): return None
    im = Image.open(p).convert("RGBA").crop(boks)
    return im.resize((im.width * skala // 10, im.height * skala // 10), Image.NEAREST)


def lag():
    gamal = handfigur.lag(IV.R, IV.PAL, IV.KJENSLER)
    ny = handfigur.lag(med_nye_auge(IV.R), PAL, IV.KJENSLER)
    S = 6
    a, b = utsnitt(gamal, 3, S), utsnitt(ny, 3, S)
    # Ein liten 1:1 og 3:1 versjon også, slik dei ser ut i spelet (spelet skalerer 3 til 4 gonger).
    sma = [utsnitt(x, 3, 3) for x in (gamal, ny)]
    celes = ref("z-celes2.png", (0, 270, 560, 830), S)       # framanfrå og frå sida, 10 px per piksel
    W = a.width + b.width + 60 + (celes.width + 30 if celes else 0)
    H = max(a.height, celes.height if celes else 0) + sma[0].height + 90
    ark = Image.new("RGBA", (W, H), (58, 46, 40, 255))      # golvfarge i stova
    d = ImageDraw.Draw(ark)
    d.text((10, 6), "I dag", fill="white"); d.text((a.width + 30, 6), "Prøve: auge som FF6", fill="white")
    ark.alpha_composite(a, (10, 24)); ark.alpha_composite(b, (a.width + 30, 24))
    if celes:
        d.text((a.width + b.width + 60, 6), "Celes (FF6)", fill="white")
        ark.alpha_composite(celes, (a.width + b.width + 60, 24))
    y = max(a.height, celes.height if celes else 0) + 50
    d.text((10, y - 18), "Om lag storleiken i spelet (3x)", fill="white")
    ark.alpha_composite(sma[0], (10, y)); ark.alpha_composite(sma[1], (a.width + 30, y))
    return ark


if __name__ == "__main__":
    lag().save(UT); print(UT)
