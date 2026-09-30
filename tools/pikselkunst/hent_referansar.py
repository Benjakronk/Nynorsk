"""Hentar referansebilete til pikselkunsten: konseptkunst frå Noreg og skjermbilete frå spel.

Konseptkunst (fri lisens) blir lagra i tools/pikselkunst/konsept/ og ført inn i
konsept/KJELDER.md med opphav, lisens og kva biletet skal brukast til. Berre
bilete med fri lisens (public domain eller Creative Commons) blir tekne med.

Skjermbilete frå spel er verna og blir berre lagra i forhand/referansar/, som
ikkje er med i git. Dei er til studium, ikkje til bruk i spelet.

  python tools/pikselkunst/hent_referansar.py sok "steingard Vestland"
      søk på Wikimedia Commons og vis filnamn
  python tools/pikselkunst/hent_referansar.py konsept namn.jpg "File:..." "Kva biletet skal brukast til"
      last ned eit Commons-bilete (900 pikslar breitt) til konsept/ og før det inn i KJELDER.md
  python tools/pikselkunst/hent_referansar.py zelda "TMC Lake Hylia 3.png" ...
      last ned skjermbilete frå Zelda Wiki (The Minish Cap) til forhand/referansar/
  python tools/pikselkunst/hent_referansar.py ark konsept|referansar [prefiks]
      lag eit kontaktark i forhand/ av bileta, til å sjå på med Read

Final Fantasy VI: skjermbilete frå cdn.cavesofnarshe.com/images/ff6/screenshots/images/NNNN.png
(sjå https://www.cavesofnarshe.com/ff6/screenshots.php), lastast ned med curl til forhand/referansar/.
"""
import json, os, re, sys, glob, time, urllib.request, urllib.parse, urllib.error

for _s in (sys.stdout, sys.stderr):
    try: _s.reconfigure(encoding="utf-8")
    except Exception: pass

ROT = os.path.dirname(os.path.abspath(__file__))
KONSEPT = os.path.join(ROT, "konsept")
REF = os.path.join(ROT, "forhand", "referansar")
UA = {"User-Agent": "NynorskKursRef/1.0 (pikselkunst for eit skulekurs)"}
FRI = ("public domain", "cc0", "cc by", "cc-by", "pd")


def opne(url, timeout=60):
    """Opnar ei adresse. Commons avviser for mange førespurnader på kort tid (HTTP 429):
    då ventar vi og prøver att, opptil fem gonger."""
    for forsok in range(6):
        time.sleep(2 if forsok == 0 else 15 * forsok)
        try:
            return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=timeout).read()
        except urllib.error.HTTPError as e:
            if e.code not in (429, 502, 503) or forsok == 5: raise
            print(f"  (for mange førespurnader, ventar {15 * (forsok + 1)} sekund)")


def get(url):
    return json.loads(opne(url, 40))


def last(url, sti):
    open(sti, "wb").write(opne(url))


def sok(tekst):
    d = get("https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srnamespace=6&srlimit=12&srsearch=" + urllib.parse.quote(tekst))
    for r in d["query"]["search"]: print(r["title"])


def konsept(namn, tittel, bruk):
    d = get("https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=900&titles=" + urllib.parse.quote(tittel))
    p = list(d["query"]["pages"].values())[0]
    if "imageinfo" not in p: raise SystemExit(f"Fann ikkje {tittel}")
    ii = p["imageinfo"][0]; m = ii["extmetadata"]
    lis = m.get("LicenseShortName", {}).get("value", "")
    if not any(f in lis.lower() for f in FRI): raise SystemExit(f"{tittel}: lisensen «{lis}» er ikkje fri. Hoppar over.")
    kunst = " ".join(re.sub("<[^>]+>", "", m.get("Artist", {}).get("value", "")).split())[:60]
    os.makedirs(KONSEPT, exist_ok=True)
    last(ii["thumburl"], os.path.join(KONSEPT, namn))
    kj = os.path.join(KONSEPT, "KJELDER.md")
    tekst = open(kj, encoding="utf-8").read().rstrip() + "\n"
    tekst = "\n".join(l for l in tekst.splitlines() if not l.startswith(f"| [{namn}]")) + "\n"
    tekst += f"| [{namn}]({namn}) | {bruk} | [{kunst}]({ii['descriptionurl']}) | {lis} |\n"
    open(kj, "w", encoding="utf-8").write(tekst)
    print(f"{namn} | {kunst} | {lis}")


def zelda(filer):
    os.makedirs(REF, exist_ok=True)
    d = get("https://zeldawiki.wiki/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url&titles=" + urllib.parse.quote("|".join("File:" + f for f in filer)))
    for p in d["query"]["pages"].values():
        if "imageinfo" not in p: print("manglar", p["title"]); continue
        namn = "tmc-" + re.sub(r"[^a-z0-9.]+", "-", p["title"][9:].lower())
        last(p["imageinfo"][0]["url"], os.path.join(REF, namn)); print(namn)


def ark(kjelde, prefiks=""):
    from PIL import Image
    mappe = KONSEPT if kjelde == "konsept" else REF
    filer = sorted(f for f in glob.glob(os.path.join(mappe, prefiks + "*")) if f.lower().endswith((".png", ".jpg", ".jpeg")))
    if not filer: print("Ingen bilete."); return
    w, h, kol = 400, 280, 4
    rader = (len(filer) + kol - 1) // kol
    a = Image.new("RGB", (kol * w, rader * h), (20, 20, 20))
    for i, f in enumerate(filer):
        im = Image.open(f).convert("RGB")
        if im.width <= w // 2 and im.height <= h // 2:
            s = min(w // im.width, h // im.height); im = im.resize((im.width * s, im.height * s), Image.NEAREST)
        else: im.thumbnail((w - 4, h - 4))
        a.paste(im, ((i % kol) * w + 2, (i // kol) * h + 2))
    ut = os.path.join(ROT, "forhand", f"ark-{kjelde}{('-' + prefiks.strip('-')) if prefiks else ''}.png")
    a.save(ut); print(ut); print(", ".join(os.path.basename(f) for f in filer))


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a: print(__doc__)
    elif a[0] == "sok": sok(" ".join(a[1:]))
    elif a[0] == "konsept": konsept(a[1], a[2], a[3])
    elif a[0] == "zelda": zelda(a[1:])
    elif a[0] == "ark": ark(a[1], a[2] if len(a) > 2 else "")
    else: print(__doc__)
