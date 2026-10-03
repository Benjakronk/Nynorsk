"""Lagar eit oversiktsbilete av eit heilt kart (alle skjermane sette saman) med Microsoft Edge
utan skjerm, til dømes ei lang kyrkje som ikkje får plass på éin skjerm.

  python tools/pikselkunst/oversikt.py namn kart=kyrkja [m=1] [flagg=latt] [skala=2]

Biletet hamnar i tools/pikselkunst/forhand/skjerm/<namn>.png (ikkje i git), i skala 2 som standard.
Sjå oversikt.html: kameraet blir flytt skjerm for skjerm, og Ivar er usynleg.
"""
import os, sys, re, base64, io, urllib.parse
from PIL import Image

ROT = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(ROT))
from edge import kjoyr                                 # eiga profilmappe per køyring (tools/edge.py)


def ta(namn, skala=2, **param):
    ut = os.path.join(ROT, "forhand", "skjerm"); os.makedirs(ut, exist_ok=True)
    url = "file:///" + os.path.join(ROT, "oversikt.html").replace("\\", "/") + "?" + urllib.parse.urlencode(param)
    dom = kjoyr(["--window-size=1100,760", "--virtual-time-budget=60000", "--dump-dom", url], timeout=240)
    m = re.search(rb'data:image/png;base64,([A-Za-z0-9+/=]+)', dom or b"")
    if not m: print("fekk ikkje noko bilete"); sys.exit(1)
    im = Image.open(io.BytesIO(base64.b64decode(m.group(1))))
    im = im.resize((im.width * skala, im.height * skala), Image.NEAREST)
    fil = os.path.join(ut, namn + ".png"); im.save(fil); print(fil)


if __name__ == "__main__":
    if len(sys.argv) < 2: print(__doc__); sys.exit(0)
    p = dict(a.split("=", 1) for a in sys.argv[2:])
    ta(sys.argv[1], int(p.pop("skala", 2)), **p)
