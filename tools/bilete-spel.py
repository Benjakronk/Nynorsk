"""Skjermbilete av spelet etter eit JS-skript, med Microsoft Edge utan skjerm.

Bruk: python tools/bilete-spel.py namn skript.js [utmappe]

Skriptet (async JS) får w (vindauget til spelet), d (dokumentet) og vent(ms). Det køyrer
etter at «Ny reise» er valt på tittelskjermen. Biletet blir teke når den virtuelle tida
(40 s) er brukt opp, så skriptet bør setje opp scena og så stå stille."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from edge import kjoyr                                 # eiga profilmappe per køyring, sletta etterpå

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

namn, skript = sys.argv[1], open(sys.argv[2], encoding="utf-8").read()
side = os.path.join(REPO, "tools", f"tmp-bilete-{os.getpid()}.html")   # eiga fil, så fleire kan køyre samstundes
open(side, "w", encoding="utf-8").write("""<!doctype html><meta charset="utf-8"><style>body{margin:0}iframe{width:1100px;height:760px;border:0}</style>
<iframe id="f" src="../spel.html?test=1"></iframe>
<script>
const f=document.getElementById("f"), vent=ms=>new Promise(r=>setTimeout(r,ms));
f.onload=async()=>{const w=f.contentWindow,d=w.document;
for(let n=0;n<200&&!d.querySelector("#rpg-tittel-val button");n++)await vent(50);
d.querySelector("#rpg-tittel-val button").click();await vent(300);
""" + skript + "};</script>")
ut = os.path.join(os.path.abspath(sys.argv[3]) if len(sys.argv) > 3 else os.getcwd(), namn + ".png")
try:
    kjoyr(["--window-size=1100,760", "--hide-scrollbars", "--virtual-time-budget=40000", "--screenshot=" + ut,
           "file:///" + side.replace("\\", "/")], timeout=240)
finally:
    os.remove(side)
print(ut)
