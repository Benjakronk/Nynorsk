"""Køyrer ei testside i tools/ (sjekk-scene.html, sjekk-gange.html) i Microsoft Edge utan skjerm
og skriv ut resultatet frå <div id="ut">.

Bruk: python tools/kjoyr-test.py tools/sjekk-scene.html [virtuell tid i ms, standard 260000]

Tidsavgrensinga i kommandolinja (timeout) er ikkje tilgjengeleg i Git Bash her, så skriptet
avbryt sjølv etter 300 sekund. sjekk-scene.html brukar om lag 220 sekund virtuell tid (runde 95). Edge brukar
heile budsjettet, og resten etter testen kan gå seint, så budsjettet bør ikkje vere mykje større."""
import os, sys, re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from edge import kjoyr                                 # eiga profilmappe per køyring, sletta etterpå

side = os.path.abspath(sys.argv[1])
budsjett = sys.argv[2] if len(sys.argv) > 2 else "260000"
url = "file:///" + side.replace("\\", "/")
# Edge heng av og til når den virtuelle tida går ut (tilfeldig, uavhengig av testen). Då blir
# prosessen stoppa etter 300 sekund, og testen køyrd på nytt, opptil tre gonger.
sys.stdout.reconfigure(encoding="utf-8")
for forsok in range(3):
    ut = kjoyr(["--window-size=1100,760", f"--virtual-time-budget={budsjett}", "--dump-dom", url], timeout=300)
    if ut is None:
        print(f"TIDSAVBROT (forsøk {forsok + 1} av 3)", file=sys.stderr); continue
    dom = ut.decode("utf-8", "replace")
    m = re.search(r'id="ut">(.*?)</div>', dom, re.S)
    print(m.group(1) if m else dom[-1500:])
    break
else:
    print("TIDSAVBROT")
