"""Køyrer ei testside i tools/ (sjekk-scene.html, sjekk-gange.html) i Microsoft Edge utan skjerm
og skriv ut resultatet frå <div id="ut">.

Bruk: python tools/kjoyr-test.py tools/sjekk-scene.html [virtuell tid i ms, standard 160000]

Tidsavgrensinga i kommandolinja (timeout) er ikkje tilgjengeleg i Git Bash her, så skriptet
avbryt sjølv etter 300 sekund. sjekk-scene.html brukar om lag 130 sekund virtuell tid. Edge brukar
heile budsjettet, og resten etter testen kan gå seint, så budsjettet bør ikkje vere mykje større."""
import os, sys, subprocess, re

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
side = os.path.abspath(sys.argv[1])
budsjett = sys.argv[2] if len(sys.argv) > 2 else "160000"
url = "file:///" + side.replace("\\", "/")
try:
    r = subprocess.run([EDGE, "--headless=new", "--disable-gpu", "--allow-file-access-from-files", "--window-size=1100,760",
                        f"--virtual-time-budget={budsjett}", "--dump-dom", url], capture_output=True, timeout=300)
    dom = r.stdout.decode("utf-8", "replace")
    m = re.search(r'id="ut">(.*?)</div>', dom, re.S)
    sys.stdout.reconfigure(encoding="utf-8")
    print(m.group(1) if m else dom[-1500:])
except subprocess.TimeoutExpired:
    print("TIDSAVBROT")
