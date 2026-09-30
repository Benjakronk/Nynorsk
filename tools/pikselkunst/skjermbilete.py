"""Tek skjermbilete av spelet med Microsoft Edge utan skjerm (headless).

  python tools/pikselkunst/skjermbilete.py namn kart=asen m=3 x=12 y=7
  python tools/pikselkunst/skjermbilete.py namn kart=utmarka m=1 kamp=vette,irrbloss

Biletet hamnar i tools/pikselkunst/forhand/skjerm/<namn>.png (ikkje i git), og ei
utskoren utgåve utan logg under blir lagra som <namn>-spel.png. Sjå på det med Read.

Tips frå arbeidet:
- Stien til skjermbiletet må vere absolutt, elles blir det ikkje lagra.
- Køyr éin Edge om gongen. Maskina har lite minne.
- Lerretet blir fryst før biletet blir teke (skjerm.html), fordi Edge tek biletet
  først når den virtuelle tida er ute, og då har animasjonane gått vidare.
"""
import os, sys, subprocess, urllib.parse
from PIL import Image

ROT = os.path.dirname(os.path.abspath(__file__))
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"


def ta(namn, **param):
    ut = os.path.join(ROT, "forhand", "skjerm"); os.makedirs(ut, exist_ok=True)
    fil = os.path.join(ut, namn + ".png")
    url = "file:///" + os.path.join(ROT, "skjerm.html").replace("\\", "/") + "?" + urllib.parse.urlencode(param)
    subprocess.run([EDGE, "--headless=new", "--disable-gpu", "--allow-file-access-from-files", "--window-size=1100,760",
                    "--hide-scrollbars", "--virtual-time-budget=30000", f"--screenshot={fil}", url],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=240)
    Image.open(fil).crop((60, 120, 1025, 700)).save(os.path.join(ut, namn + "-spel.png"))
    print(fil)


if __name__ == "__main__":
    if len(sys.argv) < 2: print(__doc__); sys.exit(0)
    ta(sys.argv[1], **dict(a.split("=", 1) for a in sys.argv[2:]))
