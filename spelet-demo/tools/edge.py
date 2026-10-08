"""Køyrer Microsoft Edge utan skjerm (headless) for testane og skjermbileta, og ryddar etter seg.

Edge lagar ein ny profil (om lag 500 MB) i Temp-mappa kvar gong han startar utan --user-data-dir,
og når han heng og blir stoppa, blir profilen liggjande. Etter nokre dagar med testar låg det
50 GB i Temp. Her får kvar køyring si eiga profilmappe (aasen-edge-*), og ho blir sletta etterpå,
også når Edge heng: då blir heile prosesstreet til denne Edge-en stoppa først (aldri andre
Edge-vindauge, så nettlesaren til brukaren får vere i fred). Restar eldre enn ein time
(aasen-edge-* og HeadlessEdge* frå før) blir rydda ved oppstart.

Edge pakkar òg ut ei innebygd utviding (om lag 380 MB) i ei scoped_dir*-mappe i Temp kvar gong han
startar, utanfor profilen. Desse vart òg liggjande: 158 av dei, 60 GB, etter to dagar. No får Edge
TEMP og TMP inne i profilmappa, så dei blir sletta saman med henne. Gamle scoped_dir* med
CRX_INSTALL (slike som Edge lagar her) eldre enn ein time blir rydda ved oppstart.

  from edge import kjoyr
  ut = kjoyr(["--dump-dom", url], timeout=300)        # gir stdout (bytes), eller None ved tidsavbrot
"""
import os, sys, glob, time, shutil, tempfile, subprocess

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
TEMP = tempfile.gettempdir()
GRUNN = ["--headless=new", "--disable-gpu", "--allow-file-access-from-files", "--no-first-run",
         "--no-default-browser-check", "--disable-extensions", "--disable-component-update"]


def _slett(mappe):
    for _ in range(10):                                  # Edge kan halde filer eit augneblink etter at han er stoppa
        shutil.rmtree(mappe, ignore_errors=True)
        if not os.path.exists(mappe): return
        time.sleep(0.5)


def rydd_gamle(timar=1):
    """Slettar profilmapper frå tidlegare køyringar som er eldre enn timar (dei som er i bruk, er låste)."""
    grense = time.time() - timar * 3600
    for m in glob.glob(os.path.join(TEMP, "aasen-edge-*")) + glob.glob(os.path.join(TEMP, "HeadlessEdge*")):
        try:
            if os.path.getmtime(m) < grense: shutil.rmtree(m, ignore_errors=True)
        except OSError:
            pass
    # Utpakka utvidingar frå Edge-køyringar (scoped_dir*\CRX_INSTALL). Mapper i bruk er låste.
    for m in glob.glob(os.path.join(TEMP, "scoped_dir*")):
        try:
            if os.path.isdir(os.path.join(m, "CRX_INSTALL")) and os.path.getmtime(m) < grense:
                shutil.rmtree(m, ignore_errors=True)
        except OSError:
            pass


def kjoyr(args, timeout=300):
    """Startar Edge utan skjerm med args (i tillegg til GRUNN) og ei eiga profilmappe som blir sletta
    etterpå. Gir stdout som bytes, eller None om Edge ikkje vart ferdig innan timeout sekund."""
    rydd_gamle()
    profil = tempfile.mkdtemp(prefix="aasen-edge-")
    tmp = os.path.join(profil, "tmp"); os.makedirs(tmp)
    env = dict(os.environ, TEMP=tmp, TMP=tmp)            # scoped_dir* hamnar i profilen og blir sletta med henne
    p = subprocess.Popen([EDGE, *GRUNN, f"--user-data-dir={profil}", *args],
                         stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, env=env)
    try:
        ut, _ = p.communicate(timeout=timeout)
        return ut
    except subprocess.TimeoutExpired:
        return None
    finally:
        # Stopp heile prosesstreet til denne Edge-en (barneprosessane kan leve vidare og halde profilen open).
        subprocess.run(["taskkill", "/F", "/T", "/PID", str(p.pid)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        _slett(profil)


if __name__ == "__main__":
    rydd_gamle(float(sys.argv[1]) if len(sys.argv) > 1 else 1)
    print("rydda")
