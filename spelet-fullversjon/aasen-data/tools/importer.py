#!/usr/bin/env python3
"""Importskriptet for Aasen-spelet.

Les markdown-eksporten av designdokumentet og skriv JSON-filene under data/
etter fana «5. Datamodell» (Produksjon). Berre standardbiblioteket.

Bruk:
    python3 tools/importer.py "<mappa med eksporten>" [--ut <mappa for data>]

Skriptet gjev same resultat for same kjelde. Det skriv ingen tidsstempel.
Verdiar som ikkje står i dokumentet, ligg i data/hand/ og blir flette inn.
"""

import json
import os
import re
import sys
import unicodedata
from collections import OrderedDict

HER = os.path.dirname(os.path.abspath(__file__))
ROT = os.path.dirname(HER)

# ---------------------------------------------------------------------------
# ID-ar
# ---------------------------------------------------------------------------

def idify(tekst):
    """Allmenn regel: små bokstavar, æ blir ae, ø blir o, å blir aa,
    mellomrom og bindestrek blir understrek. Andre teikn fell bort."""
    t = tekst.strip().lower()
    t = t.replace("æ", "ae").replace("ø", "o").replace("å", "aa")
    t = t.replace("ä", "ae").replace("ö", "o").replace("þ", "th").replace("ð", "d")
    t = unicodedata.normalize("NFKD", t)
    t = "".join(c for c in t if not unicodedata.combining(c))
    t = re.sub(r"[\s\-–/]+", "_", t)
    t = re.sub(r"[^a-z0-9_.]", "", t)
    t = re.sub(r"_+", "_", t).strip("_")
    return t


# ---------------------------------------------------------------------------
# Markdown
# ---------------------------------------------------------------------------

def unescape(s):
    return re.sub(r"\\([_\[\]\.\*])", r"\1", s)


def celler(line):
    s = line.strip()
    if s.startswith("|"):
        s = s[1:]
    if s.endswith("|"):
        s = s[:-1]
    return [unescape(c.strip()) for c in s.split("|")]


class Tabell:
    def __init__(self, doc, line, header, overskrifter):
        self.doc = doc
        self.line = line              # linenummeret til overskriftsrada (1-basert)
        self.header = header
        self.overskrifter = overskrifter  # liste av (nivå, tittel, line) som tabellen står under
        self.rader = []               # liste av (linenummer, dict)
        self.etter = ""               # første tekstavsnitt etter tabellen

    @property
    def seksjon(self):
        return self.overskrifter[-1][1] if self.overskrifter else ""

    def h(self, nivaa):
        for n, t, l in reversed(self.overskrifter):
            if n == nivaa:
                return t
        return None

    def __iter__(self):
        return iter(self.rader)


class Doc:
    def __init__(self, rot, rel):
        self.rel = rel
        self.namn = os.path.splitext(os.path.basename(rel))[0]
        with open(os.path.join(rot, rel), encoding="utf-8") as f:
            self.lines = f.read().split("\n")
        self.overskrifter = []   # (nivå, tittel, line)
        self.tabellar = []
        self._les()

    def _les(self):
        stakk = []
        i = 0
        n = len(self.lines)
        while i < n:
            l = self.lines[i]
            m = re.match(r"^(#{1,6})\s+(.*)$", l)
            if m:
                nivaa = len(m.group(1))
                tittel = unescape(m.group(2).strip())
                while stakk and stakk[-1][0] >= nivaa:
                    stakk.pop()
                stakk.append((nivaa, tittel, i + 1))
                self.overskrifter.append((nivaa, tittel, i + 1))
                i += 1
                continue
            if l.startswith("|") and i + 1 < n and re.match(r"^\|\s*:?-", self.lines[i + 1]):
                t = Tabell(self, i + 1, celler(l), list(stakk))
                i += 2
                while i < n and self.lines[i].startswith("|"):
                    c = celler(self.lines[i])
                    while len(c) < len(t.header):
                        c.append("")
                    rad = OrderedDict()
                    for k, v in zip(t.header, c):
                        rad[k] = v
                    if len(c) > len(t.header):
                        rad["_ekstra"] = c[len(t.header):]
                    t.rader.append((i + 1, rad))
                    i += 1
                # tekst etter tabellen
                j = i
                while j < n and not self.lines[j].strip():
                    j += 1
                if j < n and not self.lines[j].startswith(("|", "#")):
                    t.etter = self.lines[j].strip()
                self.tabellar.append(t)
                continue
            i += 1

    def tabellar_med(self, *kolonner, seksjon=None):
        ut = []
        for t in self.tabellar:
            if list(t.header[:len(kolonner)]) == list(kolonner):
                if seksjon is None or any(seksjon == o[1] for o in t.overskrifter):
                    ut.append(t)
        return ut

    def tabell(self, *kolonner, seksjon=None):
        ts = self.tabellar_med(*kolonner, seksjon=seksjon)
        return ts[0] if ts else None

    def linjer_under(self, line):
        """Linene under overskrifta på lina «line», fram til neste overskrift på same eller høgare nivå."""
        for idx, (n, t, l) in enumerate(self.overskrifter):
            if l == line:
                slutt = len(self.lines)
                for n2, t2, l2 in self.overskrifter[idx + 1:]:
                    if n2 <= n:
                        slutt = l2 - 1
                        break
                return [(k + 1, self.lines[k]) for k in range(l, slutt)]
        return []

    def seksjon_linjer(self, tittel, nivaa=None):
        """Linene (nr, tekst) under ei overskrift fram til neste overskrift på same eller høgare nivå."""
        for idx, (n, t, l) in enumerate(self.overskrifter):
            if t == tittel and (nivaa is None or n == nivaa):
                slutt = len(self.lines)
                for n2, t2, l2 in self.overskrifter[idx + 1:]:
                    if n2 <= n:
                        slutt = l2 - 1
                        break
                return [(k + 1, self.lines[k]) for k in range(l, slutt)]
        return []


class Kjelde:
    """Heile eksporten. Finn faner på namn."""

    def __init__(self, rot):
        self.rot = rot
        self.docs = OrderedDict()
        for r, ds, fs in os.walk(rot):
            ds.sort()
            for f in sorted(fs):
                if f.endswith(".md"):
                    rel = os.path.relpath(os.path.join(r, f), rot)
                    self.docs[rel] = None

    def __getitem__(self, delnamn):
        treff = [k for k in self.docs if delnamn in k]
        if len(treff) != 1:
            raise KeyError("Fann ikkje éi fane for %r: %r" % (delnamn, treff))
        k = treff[0]
        if self.docs[k] is None:
            self.docs[k] = Doc(self.rot, k)
        return self.docs[k]


# ---------------------------------------------------------------------------
# Rapport
# ---------------------------------------------------------------------------

class Logg:
    def __init__(self):
        self.uklar = []        # det som ikkje kunne tolkast
        self.motseiingar = []  # motseiingar mellom faner
        self.merknader = []    # anna som den som byggjer bør vite

    def ukl(self, doc, line, tekst):
        rel = doc.rel if hasattr(doc, "rel") else str(doc)
        self.uklar.append({"fil": rel, "line": line, "tekst": tekst})

    def mot(self, tekst, *stader):
        self.motseiingar.append({"tekst": tekst, "stader": [s for s in stader if s]})

    def merk(self, tekst):
        self.merknader.append(tekst)


L = Logg()


def stad(doc, line):
    return "%s:%s" % (doc.rel, line)


# ---------------------------------------------------------------------------
# Små tolkarar
# ---------------------------------------------------------------------------

TIDER = ("T1", "T2", "T3", "T4")


def pengar(tekst):
    """«1 spd 40 s» -> 160. Gjev None når teksten ikkje er berre ein pris."""
    if tekst is None:
        return None
    t = tekst.strip()
    m = re.fullmatch(r"(?:(\d+)\s*spd)?\s*(?:(\d+)\s*s)?", t)
    if not m or not (m.group(1) or m.group(2)):
        return None
    return int(m.group(1) or 0) * 120 + int(m.group(2) or 0)


def tal(tekst):
    if tekst is None:
        return None
    t = tekst.strip().replace("\u00a0", " ").replace(" ", "")
    t = t.replace("−", "-").replace(",", ".")
    try:
        if re.fullmatch(r"[+-]?\d+", t):
            return int(t)
        if re.fullmatch(r"[+-]?\d+\.\d+", t):
            return float(t)
    except ValueError:
        pass
    return None


def del_utanfor_parentes(tekst, skilje=";"):
    """Del på skiljeteikn som står utanfor parentes og hermeteikn."""
    ut, buf, djup, sitat = [], "", 0, 0
    for c in tekst:
        if c in "([":
            djup += 1
        elif c in ")]":
            djup = max(0, djup - 1)
        elif c == "«":
            sitat += 1
        elif c == "»":
            sitat = max(0, sitat - 1)
        if c == skilje and djup == 0 and sitat == 0:
            ut.append(buf.strip())
            buf = ""
        else:
            buf += c
    if buf.strip():
        ut.append(buf.strip())
    return ut


def liste_og(tekst):
    """«a, b og c» -> [a, b, c]"""
    deler = []
    for d in del_utanfor_parentes(tekst, ","):
        deler.extend(x.strip() for x in re.split(r"\s+og\s+", d) if x.strip())
    return deler


SCENE_RE = r"(?:S[12]\.\d+[a-z]?(?:\.\d+)?|\d\.\d+[a-z]?)"


def scene_id(nr):
    """«1.3» -> s1_3, «S1.28» -> S1_28, «S2.11.1» -> S2_11 (delscena står som merknad)."""
    nr = nr.strip()
    m = re.fullmatch(r"S([12])\.(\d+[a-z]?)(?:\.(\d+))?", nr)
    if m:
        if m.group(3):
            return "S%s_%s_%s" % (m.group(1), m.group(2), m.group(3))
        return "S%s_%s" % (m.group(1), m.group(2))
    m = re.fullmatch(r"(\d)\.(\d+[a-z]?)", nr)
    if m:
        return "s%s_%s" % (m.group(1), m.group(2))
    return None


def finn_scener(tekst):
    ut = []
    for m in re.finditer(r"(?<![\d.,A-Za-z])(" + SCENE_RE + r")(?![\d])", tekst):
        nr = m.group(1)
        if re.match(r"^\d\.0", nr) or re.match(r"^[89]\.", nr):
            continue  # ordnummer (1.05, 8.32), ikkje scener
        sid = scene_id(nr)
        if sid and sid not in ut:
            ut.append(sid)
    return ut


# ---------------------------------------------------------------------------
# Skriving
# ---------------------------------------------------------------------------

UT = OrderedDict()   # relativ sti -> innhald


def legg(sti, innhald):
    UT[sti] = innhald


def skriv_alt(datamappe):
    for sti, innhald in UT.items():
        full = os.path.join(datamappe, sti)
        os.makedirs(os.path.dirname(full), exist_ok=True)
        with open(full, "w", encoding="utf-8") as f:
            json.dump(innhald, f, ensure_ascii=False, indent=1)
            f.write("\n")


def les_hand(datamappe, namn):
    p = os.path.join(datamappe, "hand", namn)
    if os.path.exists(p):
        with open(p, encoding="utf-8") as f:
            return json.load(f)
    return None


def flett_hand(datamappe):
    """Filer i data/hand/ med same sti som ei datafil (til dømes
    hand/ting/ting.json) blir flette inn: kvar post med same id får felta
    frå handfila lagde over. Felt som har ein verdi frå dokumentet, blir
    ikkje skrivne over, og konflikten går i rapporten."""
    handrot = os.path.join(datamappe, "hand")
    for sti in list(UT.keys()):
        p = os.path.join(handrot, sti)
        if not os.path.exists(p):
            continue
        with open(p, encoding="utf-8") as f:
            hand = json.load(f)
        data = UT[sti]
        if isinstance(data, list) and isinstance(hand, list):
            idx = {d.get("id"): d for d in data if isinstance(d, dict)}
            for h in hand:
                d = idx.get(h.get("id"))
                if d is None:
                    L.merk("hand/%s: id %s finst ikkje i datafila og er ikkje fletta inn" % (sti, h.get("id")))
                    continue
                for k, v in h.items():
                    if k == "id":
                        continue
                    if d.get(k) not in (None, [], {}, "") and d.get(k) != v:
                        L.mot("hand/%s: feltet %s på %s har ein verdi frå dokumentet og ein annan i handfila. Dokumentet gjeld" % (sti, k, h.get("id")))
                        continue
                    d[k] = v


# ---------------------------------------------------------------------------
# Einingane (kvar funksjon les kjeldene sine og legg filer i UT)
# ---------------------------------------------------------------------------

D = {}   # felles oppslag mellom einingane (namn -> id og liknande)

# ===========================================================================
# 1. Ting og utstyr
# ===========================================================================

TING_SLAG = {
    "Mat og lækjing": "mat",
    "Lækjing av statusar og vekking": "laekjing",
    "Verneskikkar og gåver": "vern",
    "Salsvarer": "sal",
}

PLASS = {"reiskap": "reiskap", "klede": "klede", "hovud": "hovud", "lomme": "lomme", "veska": "veska"}


def tolk_ting_verknad(t):
    """Tolkar dei faste formuleringane i verknadskolonnen. Anna gjev None."""
    if not t:
        return None
    v = OrderedDict()
    m = re.match(r"Lækjer (\d+) prosent Liv på (éin|heile partyet)", t)
    if m:
        v["laekje_prosent"] = int(m.group(1))
        v["maal"] = "ein" if m.group(2) == "éin" else "alle"
    m = re.match(r"Lækjer alt Liv på (éin|heile partyet)", t)
    if m:
        v["laekje_prosent"] = 100
        v["maal"] = "ein" if m.group(1) == "éin" else "alle"
    m = re.match(r"Gjev att (\d+) prosent Røyst på (éin|heile partyet)", t)
    if m:
        v["royst_prosent"] = int(m.group(1))
        v["maal"] = "ein" if m.group(2) == "éin" else "alle"
    m = re.match(r"Løftar (.+?) på (éin|heile partyet)$", t)
    if m:
        v["loftar"] = [idify(x) for x in liste_og(m.group(1))]
        v["maal"] = "ein" if m.group(2) == "éin" else "alle"
    m = re.match(r"Vekkjer ein figur som er slegen ut, med (\d+) prosent Liv", t)
    if m:
        v["vekkjer_prosent"] = int(m.group(1))
        v["maal"] = "ein"
    m = re.match(r"Vekkjer ein figur som er slegen ut, med alt Liv", t)
    if m:
        v["vekkjer_prosent"] = 100
        v["maal"] = "ein"
    m = re.match(r"Verneskikk(?:: (.+))?", t)
    if m:
        v["verneskikk"] = True
    return v or None


VERDI_RE = re.compile(r"(Slag|Ord|Vern|Tole|Herdsle|Lukke|Snøggleik|Kraft|Ordkraft)\s*([+−-]?\d+)")
VERDI_ID = {"Slag": "slag", "Ord": "ord", "Vern": "vern", "Tole": "tole", "Herdsle": "herdsle",
            "Lukke": "lukke", "Snøggleik": "snogg", "Kraft": "kraft", "Ordkraft": "ordkraft"}


def tolk_verdi(t):
    if not t:
        return None
    v = OrderedDict()
    rest = t
    for m in VERDI_RE.finditer(t):
        v[VERDI_ID[m.group(1)]] = int(m.group(2).replace("−", "-"))
        rest = rest.replace(m.group(0), "")
    if re.sub(r"[,\s.]", "", rest):
        return None
    return v or None


FIGUR_NAMN = OrderedDict([
    ("unge ivar", "unge_ivar"), ("aasen", "aasen"), ("ivar", "aasen"), ("tussen", "tussen"),
    ("huldra", "huldra"), ("vinje", "vinje"), ("landstad", "landstad"), ("aslaug", "aslaug"),
    ("ravdna", "ravdna"), ("collett", "collett"), ("knudsen", "knudsen"),
    ("asbjørnsen", "asbjornsen"), ("moe", "moe"), ("ole bull", "ole_bull"), ("bull", "ole_bull"),
    ("berte", "berte"), ("jotunen", "jotunen"),
])


def tolk_kven(t):
    """«Aasen, Vinje, Moe», «Alle, gåve», «Alle utanom huldra», «Moe eller Knudsen»."""
    ut = OrderedDict([("kven", []), ("kven_regel", None), ("gaave", False), ("kven_tekst", t)])
    if not t:
        return ut
    m = re.match(r"^Alle utanom (.+?)(, gåve)?$", t)
    if m:
        ut["kven_regel"] = "alle"
        ut["utanom"] = [FIGUR_NAMN.get(x.strip().lower(), idify(x)) for x in re.split(r",|\s+og\s+", m.group(1)) if x.strip()]
        ut["gaave"] = bool(m.group(2))
        return ut
    deler = [d.strip() for d in re.split(r",|\s+og\s+|\s+eller\s+", t) if d.strip()]
    ok = True
    for d in deler:
        dl = d.lower()
        if dl == "gåve":
            ut["gaave"] = True
        elif dl in FIGUR_NAMN:
            ut["kven"].append(FIGUR_NAMN[dl])
        elif dl == "alle":
            ut["kven_regel"] = "alle"
        elif dl == "alle menn":
            ut["kven_regel"] = "alle_menn"
        elif dl == "alle som kan bere skrift":
            ut["kven_regel"] = "alle_som_kan_bere_skrift"
        elif dl.startswith("alle utanom "):
            ut["kven_regel"] = "alle"
            ut["utanom"] = [FIGUR_NAMN.get(x.strip().lower(), idify(x)) for x in re.split(r"\s+og\s+", d[12:])]
        elif dl.startswith("hos "):
            continue
        else:
            ok = False
    if not ok:
        ut["kven"] = []
        ut["kven_regel"] = None
    return ut


def ting_namn_registrer(namn, fil, id_):
    D.setdefault("ting_namn", OrderedDict())
    k = namn.lower()
    if k in D["ting_namn"] and D["ting_namn"][k] != (fil, id_):
        D.setdefault("ting_namn_dobbel", []).append((k, D["ting_namn"][k], (fil, id_)))
        return
    D["ting_namn"][k] = (fil, id_)


# Bøyingsformer som står i innhaldskolonnane. Dei peikar berre på namn som finst i tabellane.
TING_BOYING = {
    "sølvskeier": "sølvskei", "flatbrøda": "flatbrød", "ullsokk": "ullsokkar", "kamferdrope": "kamferdropar",
    "kaffikjelar": "kaffikjelen", "kaffikjele": "kaffikjelen", "ullvott": "ullvottar",
    "gamal mynt": "gamle myntar", "kaffi med kandis": "kaffi med kandis",
    "salmeboka med messinghjørne": "salmeboka med messinghjørne", "kaffikverna": "kaffikverna",
    "trollsteinen": "trollsteinen", "stokk med jarnhol": "stokk med jarnhol",
}


def ting_finn(namn):
    """Namn i fri tekst -> (fil, id) eller None."""
    k = namn.strip().lower().rstrip(".")
    k = re.sub(r"^(ei|ein|eit)\s+", "", k)
    tn = D.get("ting_namn", {})
    if k in tn:
        return tn[k]
    if k in TING_BOYING and TING_BOYING[k] in tn:
        return tn[TING_BOYING[k]]
    return None


def tolk_innhald(tekst):
    """«2 rømmegraut og 1 luktesalt», «1 spd 60 s», «Ullvottar» -> liste.
    Kvar post er {ting, tal} eller {pengar}. Gjev (liste, rest) der rest er det
    som ikkje kunne tolkast."""
    if tekst is None:
        return [], None
    t = tekst.strip()
    hovud, _, merk = t.partition(". ")
    ut, rest = [], []
    p = pengar(hovud.replace("skilling", "s").rstrip("."))
    if p is not None:
        return [OrderedDict([("pengar", p)])], (merk or None)
    for d in liste_og(hovud.rstrip(".")):
        p = pengar(d.replace("skilling", "s"))
        if p is not None:
            ut.append(OrderedDict([("pengar", p)]))
            continue
        m = re.match(r"^(\d+)\s+(.+)$", d)
        n, namn = (int(m.group(1)), m.group(2)) if m else (1, d)
        f = ting_finn(namn)
        if f:
            ut.append(OrderedDict([("ting", f[1]), ("tal", n)]))
        else:
            rest.append(d)
    if rest:
        return ut, "; ".join(rest) + ((". " + merk) if merk else "")
    return ut, (merk or None)


def tid_fraa(t):
    m = re.search(r"\bT([1-4])\b", t or "")
    return ("T" + m.group(1)) if m else None


def eining_ting(K):
    vk = K["13 Varer og kister"]
    niva = K["02 Nivå, eigenskapar og utstyr"]
    ting, utstyr = [], []

    # --- varer frå Varer og kister
    for t in vk.tabellar_med("ID", "Ting"):
        slag = TING_SLAG.get(t.seksjon)
        if t.seksjon == "Kistefunn":
            continue
        for line, r in t:
            id_ = r["ID"]
            prisfelt = r.get("Pris", r.get("Salspris", ""))
            p = pengar(prisfelt)
            verknad = r.get("Verknad")
            s = slag
            if verknad and verknad.startswith("Gåve"):
                s = "gaave"
            post = OrderedDict()
            post["id"] = id_
            post["namn"] = r["Ting"]
            if slag == "sal":
                post["pris"] = None
                post["salspris"] = p
            else:
                post["pris"] = p
            if p is None:
                post["pris_tekst"] = prisfelt
            post["verknad_tekst"] = verknad if verknad is not None else None
            post["verknad"] = tolk_ting_verknad(verknad)
            if slag == "sal":
                post["kvar"] = r.get("Kvar han finst")
                post["forste_butikk"] = None
                post["tid"] = tid_fraa(r.get("Kvar han finst"))
            else:
                post["forste_butikk"] = r.get("Første butikk")
                post["tid"] = tid_fraa(r.get("Første butikk"))
            post["slag"] = s
            post["ny"] = (r.get("Status") == "Ny")
            post["kjelde"] = stad(vk, line)
            ting.append(post)
            ting_namn_registrer(r["Ting"], "ting", id_)

    # --- samanlikning med Brukstinga i butikk (Nivå, kap. 6)
    bt = niva.tabell("Ting", "Pris", "Verknad", seksjon="Brukstinga i butikk")
    if bt:
        for line, r in bt:
            f = ting_finn(r["Ting"])
            if not f:
                L.ukl(niva, line, "Brukstinga i butikk: «%s» finst ikkje i Varer og kister" % r["Ting"])
                continue
            post = next(x for x in ting if x["id"] == f[1])
            if pengar(r["Pris"]) != post.get("pris"):
                L.mot("Prisen på %s er «%s» i Nivå, eigenskapar og utstyr og %s s i Varer og kister"
                      % (r["Ting"], r["Pris"], post.get("pris")), stad(niva, line), post["kjelde"])
            if r["Verknad"].rstrip(".") != (post["verknad_tekst"] or "").rstrip("."):
                v1, v2 = r["Verknad"], post["verknad_tekst"] or ""
                if not (v1.startswith(v2) or v2 in v1):
                    L.mot("Verknaden til %s er «%s» i Nivå, eigenskapar og utstyr og «%s» i Varer og kister"
                          % (r["Ting"], v1, v2), stad(niva, line), post["kjelde"])

    # --- utstyr frå Nivå, kap. 6
    def ny_utstyr(namn, plass, kven, verdi_t, saereige, pris_t, stad_tid, line, doc, id_=None, kistefunn=False, tid=None):
        post = OrderedDict()
        post["id"] = id_ or idify(namn)
        post["namn"] = namn
        post["plass"] = plass
        k = tolk_kven(kven)
        post["kven"] = k["kven"]
        post["kven_regel"] = k["kven_regel"]
        if "utanom" in k:
            post["utanom"] = k["utanom"]
        post["gaave"] = k["gaave"]
        post["kven_tekst"] = kven
        if kven and not k["kven"] and not k["kven_regel"]:
            L.ukl(doc, line, "Kven-kolonnen til %s kunne ikkje tolkast: «%s»" % (namn, kven))
        vd = tolk_verdi(verdi_t)
        post["verdi"] = vd
        if verdi_t and vd is None:
            post["verdi_tekst"] = verdi_t
            L.ukl(doc, line, "Verdien til %s kunne ikkje tolkast: «%s»" % (namn, verdi_t))
        post["saereige"] = saereige
        p = pengar(pris_t) if pris_t else None
        post["pris"] = p
        if pris_t and p is None:
            post["pris_tekst"] = pris_t
        post["stad_og_tid"] = stad_tid
        post["scener"] = finn_scener(stad_tid or "")
        post["kistefunn"] = kistefunn
        if tid:
            post["tid"] = tid
        post["kjelde"] = stad(doc, line)
        return post

    t = niva.tabell("Gjenstand", "Kven", "Verdi", seksjon="Reiskap")
    for line, r in t:
        utstyr.append(ny_utstyr(r["Gjenstand"], "reiskap", r["Kven"], r["Verdi"], r["Særeige"], r["Pris"], r["Stad og tid"], line, niva))
    t = niva.tabell("Gjenstand", "Plass", "Kven", seksjon="Klede og hovud")
    for line, r in t:
        utstyr.append(ny_utstyr(r["Gjenstand"], PLASS.get(r["Plass"].lower()), r["Kven"], r["Verdi"], r["Særeige"], r["Pris"], r["Stad og tid"], line, niva))
    t = niva.tabell("Tilbehøyr", "Kven", "Verknad", seksjon="Lomme")
    for line, r in t:
        utstyr.append(ny_utstyr(r["Tilbehøyr"], "lomme", r["Kven"], None, r["Verknad"], r["Pris"], r["Stad og tid"], line, niva))
    t = niva.tabell("Ting", "Plass", "Kven", "Verknad", "Stad", seksjon="Løn frå villmarkene")
    for line, r in t:
        plass = r["Plass"].lower()
        if plass == "veska":
            post = OrderedDict([("id", idify(r["Ting"])), ("namn", r["Ting"]), ("pris", None),
                                ("pris_tekst", "Ikkje til sals"), ("verknad_tekst", r["Verknad"]),
                                ("verknad", None), ("forste_butikk", None), ("tid", None), ("slag", "veska"),
                                ("kven_tekst", r["Kven"]), ("stad_tekst", r["Stad"]), ("scener", finn_scener(r["Stad"])),
                                ("ny", False), ("kjelde", stad(niva, line))])
            ting.append(post)
            continue
        verdi_t, saer = None, r["Verknad"]
        m = re.match(r"^((?:Slag|Ord|Vern|Tole) \d+)\. (.*)$", r["Verknad"])
        if m:
            verdi_t, saer = m.group(1), m.group(2)
        u = ny_utstyr(r["Ting"], PLASS.get(plass), r["Kven"], verdi_t, saer, None, r["Stad"], line, niva)
        u["pris_tekst"] = "Ikkje til sals"
        u["villmarksloen"] = True
        utstyr.append(u)

    # --- kistefunn frå Varer og kister
    t = vk.tabell("ID", "Ting", "Plass", seksjon="Kistefunn")
    for line, r in t:
        u = ny_utstyr(r["Ting"], PLASS.get(r["Plass"].lower()), r["Kven"], r["Verdi"], r["Særeige"], None,
                      None, line, vk, id_=r["ID"], kistefunn=True, tid=tid_fraa(r["Tid"]))
        u["tid_tekst"] = r["Tid"]
        u["ventekiste"] = "ventekiste" in r["Tid"]
        u["pris_tekst"] = "Berre i kister"
        utstyr.append(u)

    # --- andre ting frå manuset (veska)
    t = niva.tabell("Ting", "Kva det gjer", "Stad", seksjon="Andre ting frå manuset")
    for line, r in t:
        ting.append(OrderedDict([("id", idify(r["Ting"])), ("namn", r["Ting"]), ("pris", None),
                                 ("pris_tekst", None), ("verknad_tekst", r["Kva det gjer"]), ("verknad", None),
                                 ("forste_butikk", None), ("tid", None), ("slag", "veska"),
                                 ("stad_tekst", r["Stad"]), ("scener", finn_scener(r["Stad"])),
                                 ("ny", False), ("kjelde", stad(niva, line))]))

    # dublettar mellom ting og utstyr
    tid_ = {x["id"]: x for x in ting}
    for u in utstyr:
        if u["id"] in tid_:
            L.mot("«%s» står både som vare (%s) og som utstyr (%s). Begge postane er med, i kvar si fil"
                  % (u["namn"], tid_[u["id"]]["kjelde"], u["kjelde"]), tid_[u["id"]]["kjelde"], u["kjelde"])
    for u in utstyr:
        if ting_finn(u["namn"]) is None:
            ting_namn_registrer(u["namn"], "utstyr", u["id"])
    for x in ting:
        if ting_finn(x["namn"]) is None:
            ting_namn_registrer(x["namn"], "ting", x["id"])

    # --- butikktypar
    typar = []
    bt = vk.tabell("Type", "Kvar", "Varer alltid")
    for line, r in bt:
        post = OrderedDict([("id", idify(r["Type"])), ("namn", r["Type"]), ("kvar", r["Kvar"])])
        for felt, kol in (("alltid", "Varer alltid"), ("fraa_T2", "Frå T2"), ("fraa_T4", "Frå T4")):
            tekst = r.get(kol, "")
            ids, anna = [], []
            if tekst and tekst not in ("Ingen endring",):
                for d in liste_og(tekst):
                    f = ting_finn(d)
                    if f:
                        ids.append(f[1])
                    else:
                        anna.append(d)
            post[felt] = ids
            post[felt + "_tekst"] = tekst or None
            if anna:
                post[felt + "_anna"] = anna
        m = re.search(r"Kvile for (\d+) s per figur", r["Varer alltid"])
        post["kvile_pris"] = int(m.group(1)) if m else None
        post["kjelde"] = stad(vk, line)
        typar.append(post)
        D.setdefault("butikktype_namn", {})[r["Type"].lower()] = post["id"]

    # --- tidene
    tider = []
    tt = vk.tabell("Tid", "År", "Delar", "Nivå", seksjon="Tidene")
    for line, r in tt:
        tider.append(OrderedDict([("id", r["Tid"]), ("aar_tekst", r["År"]), ("delar", r["Delar"]),
                                  ("niva_tekst", r["Nivå"]), ("kjelde", stad(vk, line))]))
    D["tider"] = tider

    # --- ventekister
    vks = []
    t = vk.tabell("ID", "Stad", "Grunnen")
    for line, r in t:
        post = OrderedDict([("id", r["ID"]), ("skjerm", None), ("kiste", None), ("stad_tekst", r["Stad"]),
                            ("grunn", r["Grunnen"]), ("line", r["Line ved Lytt"].strip("«»"))])
        inn = OrderedDict()
        for tid in TIDER:
            tekst = r.get(tid, "")
            if not tekst:
                inn[tid] = None
                continue
            liste, rest = tolk_innhald(tekst)
            inn[tid] = OrderedDict([("innhald", liste), ("kjelde_tekst", tekst)])
            if rest:
                inn[tid]["merknad"] = rest
                if not liste:
                    L.ukl(vk, line, "Ventekiste %s, %s: innhaldet «%s» kunne ikkje tolkast" % (r["ID"], tid, tekst))
        post["innhald"] = inn
        post["kjelde"] = stad(vk, line)
        vks.append(post)
    # skjerm frå Kart og rom
    kr = K["07 Kart og rom/00 Kart og rom"]
    t = kr.tabell("Ventekiste", "Kiste", "Skjerm", "Fane")
    idx = {v["id"]: v for v in vks}
    for line, r in t:
        v = idx.get(r["Ventekiste"])
        if not v:
            L.ukl(kr, line, "Ventekista %s finst ikkje i Varer og kister" % r["Ventekiste"])
            continue
        m = re.match(r"([A-Z]{2,4}-\d+[a-z]?)", r["Skjerm"])
        v["skjerm"] = m.group(1) if m else None
        v["kiste"] = r["Kiste"]
        v["fane"] = r["Fane"]
        v["skjerm_tekst"] = r["Skjerm"]

    # ---- kistereglane (Varer og kister, Kister)
    kr_ = OrderedDict([("tal_per_stad", []), ("fordeling", []), ("niva", [])])
    t = vk.tabell("Slag stad", "Kister")
    for line, r in t:
        kr_["tal_per_stad"].append(OrderedDict([("slag_stad", r["Slag stad"]), ("kister", r["Kister"]), ("kjelde", stad(vk, line))]))
    t = vk.tabell("Del av kistene", "Innhald")
    for line, r in t:
        kr_["fordeling"].append(OrderedDict([("del", r["Del av kistene"]), ("innhald", r["Innhald"]), ("kjelde", stad(vk, line))]))
    t = vk.tabell("Nivå", "Mat, lækjing og vern", "Salsvarer", "Utstyr")
    for line, r in t:
        m = re.match(r"(\d+)(?: til (\d+)| og opp)?", r["Nivå"])
        ids, anna = [], []
        for kol in ("Mat, lækjing og vern", "Salsvarer", "Utstyr"):
            tekst = re.sub(r"^Som over,?\s*(og\s+)?", "", r[kol])
            for d in liste_og(tekst):
                f = ting_finn(d)
                if f:
                    ids.append(f[1])
                elif d:
                    anna.append(d)
        kr_["niva"].append(OrderedDict([("fraa_niva", int(m.group(1)) if m else None),
                                        ("til_niva", int(m.group(2)) if m and m.group(2) else None),
                                        ("ting", ids), ("niva_tekst", r["Nivå"]), ("kjelde", stad(vk, line))]))
        for d in anna:
            L.ukl(vk, line, "Kistetabellen etter nivå: «%s» finst ikkje som ting eller utstyr" % d)
    legg("ting/kistereglar.json", kr_)

    legg("ting/ting.json", ting)
    legg("ting/utstyr.json", utstyr)
    legg("ting/butikktypar.json", typar)
    legg("ting/ventekister.json", vks)
    D["ting"] = ting
    D["utstyr"] = utstyr


# ===========================================================================
# 2. Lydfamiliar og trekk
# ===========================================================================

FAM_ID = OrderedDict([
    ("nøkkelord", "nokkel"), ("kv-ord", "kv"), ("småord", "smaa"), ("j-ord", "j"),
    ("diftongar", "diftong"), ("harde konsonantar", "hard"), ("grunnord", "grunn"),
])
FAM_EVNE = {"Vern": "vern", "Åtak": "aatak", "Avsløring": "avsloring", "Lindring": "lindring"}


def fam_id(tekst):
    if not tekst:
        return None
    t = tekst.strip().lower()
    return FAM_ID.get(t)


def sfx_tabell(K, kolonne):
    """{verdi i kolonnen: sfx-id} frå fana Lydeffektar."""
    doc = K["03 Lydeffektar"]
    ut = OrderedDict()
    for t in doc.tabellar:
        if t.header and t.header[0] == "ID" and kolonne in t.header:
            for line, r in t:
                ut.setdefault(r[kolonne], r["ID"])
    return ut


def eining_familiar(K):
    mag = K["01 Magisystemet frå ord til galdr"]
    ob = K["09 Ordboka/00 Ordboka"]
    fam = OrderedDict()
    t = mag.tabell("Familie", "Verknad i kamp", seksjon="Dei sju familiane")
    for line, r in t:
        fid = fam_id(r["Familie"])
        if not fid:
            continue
        evne_t = r["Verknad i kamp"]
        m = re.match(r"^(\w+):", evne_t)
        evne = FAM_EVNE.get(m.group(1)) if m else None
        if evne is None and evne_t.startswith("Raske evner"):
            evne = "raske"
        fam[fid] = OrderedDict([
            ("id", fid), ("namn", r["Familie"]), ("evne", evne), ("evne_tekst", evne_t),
            ("royst_dialekt", None), ("royst_rot", None), ("ande", None), ("farge", None), ("teikn", None),
            ("regel", None), ("regel_nr", None), ("doeme", r["Døme frå ordlistene"]),
            ("oppslag_tal", tal(r["Oppslag i Ordboka"])), ("sfx", None), ("kjelde", stad(mag, line)),
        ])
    # Røyst og Ande
    t = mag.tabell("Familie", "Røyst, dialektform", seksjon="Røyst og Røyst-skalaen")
    for line, r in t:
        fid = fam_id(r["Familie"])
        if fid not in fam:
            L.ukl(mag, line, "Røyst-tabellen: familien «%s» er ukjend" % r["Familie"])
            continue
        for felt, kol in (("royst_dialekt", "Røyst, dialektform"), ("royst_rot", "Røyst, rotform")):
            v = r[kol]
            m = re.fullmatch(r"(\d+)\s*[–-]\s*(\d+)", v)
            fam[fid][felt] = OrderedDict([("min", int(m.group(1))), ("maks", int(m.group(2)))]) if m else None
            if not m:
                fam[fid][felt + "_tekst"] = v
        fam[fid]["ande"] = r["Kva kvar Ande gjev"]
    # Grunnord i Ordboka del 3
    t = ob.tabell("Lydfamilie", "Røyst, dialektform", seksjon="Den sjuande familien: Grunnord")
    if t:
        for line, r in t:
            fid = fam_id(r["Lydfamilie"])
            if fid in fam and fam[fid]["ande"] and fam[fid]["ande"] != r["Kva kvar Ande gjev"]:
                L.mot("Ande for %s: Magisystemet seier «%s», Ordboka del 3 seier «%s»"
                      % (r["Lydfamilie"], fam[fid]["ande"], r["Kva kvar Ande gjev"]),
                      fam[fid]["kjelde"], stad(ob, line))
    # Regelen
    t = ob.tabell("Rekkjefølgje", "Familie", "Regel")
    for line, r in t:
        fid = fam_id(r["Familie"])
        if fid in fam:
            fam[fid]["regel"] = r["Regel"]
            fam[fid]["regel_nr"] = tal(r["Rekkjefølgje"])
            fam[fid]["regel_doeme"] = r["Døme"]
    # storleik i Ordboka del 3 mot Magisystemet
    t = ob.tabell("Familie", "Oppslag", "Del av Ordboka")
    for line, r in t:
        fid = fam_id(r["Familie"])
        if fid in fam and tal(r["Oppslag"]) != fam[fid]["oppslag_tal"]:
            L.mot("Talet på oppslag i familien %s er %s i Ordboka del 3 og %s i Magisystemet"
                  % (r["Familie"], r["Oppslag"], fam[fid]["oppslag_tal"]), stad(ob, line), fam[fid]["kjelde"])
    sfx = sfx_tabell(K, "Familie")
    for fid, f in fam.items():
        for k, v in sfx.items():
            if fam_id(k.split(",")[0]) == fid or k.lower() == f["namn"].lower():
                f["sfx"] = v
                break
    L.merk("Fargane og teikna til lydfamiliane står ikkje i dokumentet (Grafikk og stil har dei ikkje). Fargane finst i prototypen (FAMILIAR i data.js) og høyrer heime i data/hand/ord/familiar.json. Felta farge og teikn er null til då")
    legg("ord/familiar.json", list(fam.values()))
    D["familiar"] = fam

    # ---- trekka
    trekk = []
    sfx = sfx_tabell(K, "Trekk")
    t = mag.tabell("ID", "Trekk", "Kva det gjer", seksjon="Trekket til ordet")
    ande_regel = None
    for nr, l in mag.seksjon_linjer("Trekket til ordet"):
        if l.startswith("Ande verkar som vanleg"):
            ande_regel = (nr, l.strip())
        if l.startswith("Eit trekk har ein pris"):
            royst_regel = (nr, l.strip())
    for line, r in t:
        v = r["Verknad"]
        m = re.fullmatch(r"(\d+)\s*%", v)
        prosent = int(m.group(1)) if m else None
        passar = r["Passar til"]
        if passar == "Alle fem":
            passar_l = ["hard", "j", "diftong", "kv", "smaa"]
        else:
            passar_l = []
            for d in liste_og(passar):
                f = fam_id(d)
                if f:
                    passar_l.append(f)
                else:
                    L.ukl(mag, line, "Trekket %s: «%s» i Passar til er ikkje ein lydfamilie" % (r["ID"], d))
        # Røyst-tillegget for kv-ord og småord står som band i teksten over tabellen
        rt = None
        if prosent is not None:
            if prosent >= 100:
                rt = 0
            elif 80 <= prosent <= 85:
                rt = 1
            elif 70 <= prosent <= 75:
                rt = 2
            elif 60 <= prosent <= 65:
                rt = 3
        post = OrderedDict([
            ("id", r["ID"]), ("namn", r["Trekk"]), ("verknad_tekst", r["Kva det gjer"]),
            ("verknad_prosent", prosent), ("royst_tillegg", rt),
            ("royst_tillegg_gjeld", ["kv", "smaa"]),
            ("passar_til", passar_l), ("passar_til_tekst", passar),
            ("typiske_tydingar", r["Typiske tydingar"]),
            ("ande_regel", ande_regel[1] if (ande_regel and r["ID"] in ("alle", "ekko")) else None),
            ("sfx", sfx.get(r["Trekk"])), ("kjelde", stad(mag, line)),
        ])
        if prosent is None:
            post["verknad_prosent_tekst"] = v
        trekk.append(post)
        D.setdefault("trekk_namn", {})[r["Trekk"].lower()] = r["ID"]
    # fordelinga i Trekka til orda
    tto = K["06 Trekka til orda"]
    D["trekk_fordeling"] = [(line, r) for line, r in tto.tabell("Trekk", "Ord")]
    legg("ord/trekk.json", trekk)
    D["trekk"] = trekk


# ===========================================================================
# 3. Oppslag i Ordboka, kapitla og Lydtreet
# ===========================================================================

SMAAORD_KLASSAR = ("pron.", "konj.", "prep.", "interj.")


def fam_etter_regelen(form, kapittel, ordklasse, oppslag_fam, gn=False):
    """Regelrekkja i Magisystemet, bolken «Regelen steg for steg»."""
    f = (form or "").strip().lower()
    f = re.sub(r"^[^a-zæøåäöþðáéíóúý]+", "", f)
    if not f:
        return None
    if kapittel == 14:
        return "nokkel"
    if f.startswith("kv") or (gn and f.startswith("hv")):
        return "kv"
    if oppslag_fam == "smaa" or any(k in (ordklasse or "") for k in SMAAORD_KLASSAR):
        return "smaa"
    if oppslag_fam == "kv" and "adv." in (ordklasse or ""):
        return "smaa"
    if re.match(r"^[bcdfghklmnpqrstvwxzþð]*j", f):
        return "j"
    if re.search(r"ei|au|øy|ai|oy", f):
        return "diftong"
    m = re.search(r"[aeiouyæøåäöáéíóú]", f)
    if m and re.search(r"[ptk]", f[m.end():]):
        return "hard"
    return "grunn"


def finn_talarar(K):
    """Namna som står som talar (STORE BOKSTAVAR:) i manus."""
    namn = set()
    for rel in list(K.docs.keys()):
        if rel.startswith("04 Manus/"):
            d = K[rel]
            for l in d.lines:
                for m in re.finditer(r"(?:^|\s)([A-ZÆØÅ][A-ZÆØÅ\-]+(?: [A-ZÆØÅ][A-ZÆØÅ\-]+){0,3}):", l):
                    namn.add(m.group(1).lower())
    return namn


GRAM_MERKE = {"f", "m", "n", "er", "ar", "og", "ii", "uu", "oo", "fl", "pl", "adj", "adv", "e'", "i'", "o'", "u'", "ø'"}

FORM_IKKJE = {"bestiariet", "utan stadmerke", "nyare målføre", "partisipp", "lånord", "byggjespelet",
              "bymål", "bymålsform", "blaut konsonant", "grannemål", "svensk", "dansk og bymål", "sagaform",
              "statusen", "tussemål", "òg tussemål", "folkevisestubbe", "ørliten", "oo aasen", "fleire stader"}

AASEN_STAD_RE = re.compile(r"^(?:[A-ZÆØÅ][a-zæøå]{0,7}\.)(?:\s*[A-ZÆØÅ]?[a-zæøå]{0,7}\.)*(?: og fl\.)?$")


def tolk_form(ledd, kapittel, ordklasse, oppslag_fam, talarar):
    post = OrderedDict()
    tekst = ledd.strip()
    gn = False
    t = tekst
    if t.startswith("G.N."):
        gn = True
        t = t[4:].strip()
    m = re.match(r"^([^(]*?)\s*(\(.*)?$", t)
    form = (m.group(1) if m else t).strip()
    form = re.sub(r"[.,]$", "", form)
    parentes = " ".join(re.findall(r"\(([^()]*)\)", t))
    post["form"] = form or None
    dansk = bool(re.search(r"\bdansk\b|rettskriv", parentes)) or "(dansk" in tekst
    # hv-former som ikkje er merkte dansk, blir rekna som gammalnorske (regel 2)
    post["fam"] = fam_etter_regelen(form.split(" ")[0] if form else "", kapittel, ordklasse, oppslag_fam,
                                    gn or (form.lower().startswith("hv") and not dansk))
    stad_, kven, aar, scener = [], [], [], []
    ukontrollert = "ukontrollert" in parentes
    deler = []
    for gi, x in enumerate(del_utanfor_parentes(parentes, ";")):
        deler.extend((gi, y) for y in del_utanfor_parentes(x, ","))
    stad_i_gruppa = set()
    for gi, del_ in deler:
        d = del_.strip()
        if not d or "«" in d or "»" in d or d.startswith(("Aasen", "jf.", "sjå", "fl.")):
            continue
        for y in re.findall(r"\b(1[78]\d\d)\b", d):
            aar.append(int(y))
        for s in finn_scener(d):
            scener.append(s)
        rest = re.sub(r"\b1[78]\d\d\b", "", d)
        rest = re.sub(SCENE_RE, "", rest)
        rest = re.sub(r"\s+", " ", rest).strip(" ,:;")
        if not AASEN_STAD_RE.match(rest):
            rest = rest.rstrip(".").strip()
        if not rest or rest.lower() in ("dansk", "rettskriven", "ukontrollert", "aasen", "aasen 1873", "manuset", "oo", "o'"):
            continue
        if re.search(r"ikkje hos aasen|ikkje i aasen|nyare nynorsk|tolka som|sida viser", rest.lower()):
            continue
        rl = rest.lower()
        if rl in GRAM_MERKE or re.fullmatch(r"[a-zæøå]{1,2}'?", rl) or rl in FORM_IKKJE \
                or rl.startswith(("i ", "som ", "om ", "under ", "nemnde ", "gjennom ")):
            continue
        if AASEN_STAD_RE.match(rest) or re.search(r"stader|\balm\b|fjells|nordover|sørover|landet|stift", rl):
            stad_.append(rest)
            stad_i_gruppa.add(gi)
        elif rest[0].islower():
            kven.append(rest)
        elif rl in talarar or rest.split(" ")[0].lower() in talarar:
            kven.append(rest)
        elif gi in stad_i_gruppa:
            # eit ledd utan tal etter staden er talaren
            kven.append(rest)
        elif len(rest.split()) <= 4:
            stad_.append(rest)
            stad_i_gruppa.add(gi)
    post["stad"] = stad_[0] if stad_ else None
    post["kven"] = kven[0] if kven else None
    post["aar"] = aar[0] if aar else None
    post["scene"] = scener[0] if scener else None
    post["dansk"] = dansk
    if gn:
        post["norront"] = True
    if ukontrollert:
        post["ukontrollert"] = True
    if len(stad_) + len(kven) + len(aar) + len(scener) > 4 or len(aar) > 1 or len(scener) > 1:
        post["fleire"] = OrderedDict([("stader", stad_), ("kven", kven), ("aar", aar), ("scener", scener)])
    post["kjelde_tekst"] = tekst
    return post


def eining_oppslag(K):
    talarar = finn_talarar(K)
    D["talarar"] = talarar
    trekk_tab = OrderedDict()
    tto = K["06 Trekka til orda"]
    for line, r in tto.tabell("Nr", "Oppslag", "Familie", "Trekk"):
        trekk_tab[r["Nr"]] = (line, r)
    oppslag = []
    sett_nr = set()
    for namn in ("02 Ordlista kapittel 1 til 3", "03 Ordlista kapittel 4 til 7",
                 "04 Ordlista kapittel 8 til 10 og 12", "05 Ordlista kapittel 11, 13 og 14"):
        doc = K[namn]
        for t in doc.tabellar_med("Nr", "Oppslag", "Lydfamilie", "Former og stader"):
            for line, r in t:
                celle = [r[k] for k in t.header] + r.get("_ekstra", [])
                if not any(celle):
                    continue
                nr = r["Nr"]
                if not re.fullmatch(r"\d+\.\d+", nr):
                    # rader der Nr manglar og står i parentes i oppslaget
                    m = re.match(r"^(.*?)\s*\((\d+\.\d+)\)$", r["Nr"])
                    if m:
                        nr = m.group(2)
                        celle = [nr, m.group(1)] + celle[1:]
                        r = OrderedDict(zip(t.header, celle[:len(t.header)]))
                        L.ukl(doc, line, "Rada for %s manglar kolonnen Nr. Nummeret står i parentes etter oppslaget, og kolonnane er flytte eitt steg. Skriptet har lese rada med nummeret frå parentesen" % nr)
                    elif not nr:
                        L.ukl(doc, line, "Rad utan nummer og oppslag (berre «%s» i kolonnen Kjelde i spelet). Ho ser ut til å høyre til rada over. Skriptet har hoppa over henne" % " ".join(c for c in celle if c))
                        continue
                    else:
                        L.ukl(doc, line, "Nummeret «%s» kunne ikkje tolkast" % nr)
                        continue
                if nr in sett_nr:
                    L.ukl(doc, line, "Nummeret %s står to gonger i ordlista" % nr)
                sett_nr.add(nr)
                kap = int(nr.split(".")[0])
                m = re.match(r"^(.*?),\s*(.+)$", r["Oppslag"])
                if m:
                    ord_, klasse = m.group(1).strip(), m.group(2).strip()
                else:
                    ord_, klasse = r["Oppslag"].strip(), None
                    L.ukl(doc, line, "Oppslaget «%s» (%s) har ingen ordklasse" % (r["Oppslag"], nr))
                fam = fam_id(r["Lydfamilie"])
                if fam is None:
                    L.ukl(doc, line, "Lydfamilien «%s» (%s) er ukjend" % (r["Lydfamilie"], nr))
                post = OrderedDict()
                post["id"] = None
                post["nr"] = nr
                post["kapittel"] = kap
                post["oppslag"] = ord_
                post["ordklasse"] = klasse
                post["fam"] = fam
                post["trekk"] = None
                former_t = r["Former og stader"]
                post["former"] = []
                for li, x in enumerate(del_utanfor_parentes(former_t, ";")):
                    f = tolk_form(x, kap, klasse, fam, talarar)
                    f["ledd"] = li + 1
                    ordf = re.split(r"\s+og\s+|,\s*", f["form"] or "")
                    if len(ordf) > 1 and all(re.fullmatch(r"[A-Za-zÆØÅæøåÄÖäöÁÉÍÓÚáéíóúðþǫ'-]+", w) for w in ordf):
                        for w in ordf:
                            g = OrderedDict(f)
                            g["form"] = w
                            g["fam"] = fam_etter_regelen(w, kap, klasse, fam, bool(f.get("norront")) or (w.lower().startswith("hv") and not f["dansk"]))
                            post["former"].append(g)
                    else:
                        post["former"].append(f)
                post["former_tekst"] = former_t
                post["tyding"] = r["Tyding"] or None
                m = re.search(r"G\.N\.\s+([^;,.()]+?)(?:\s+og\s+|[;,.()]|$)", former_t)
                post["norront"] = m.group(1).strip() if m else None
                dansk = None
                for f in post["former"]:
                    if f["dansk"] and f["form"]:
                        dansk = f["form"]
                        break
                post["dansk"] = dansk
                kjelde = r["Kjelde i spelet"]
                post["kjelde_i_spelet"] = finn_scener(kjelde)
                post["kjelde_i_spelet_tekst"] = kjelde
                post["ny_kjelde"] = kjelde.strip().lower().startswith("ny:")
                post["hove"] = r["Høvesbonus"] or None
                post["hove_merke"] = None
                rot = r["Rotform"]
                if rot:
                    mm = re.match(r"^(.*?)\s*\((\d+) former\)", rot)
                    form = None
                    tal_former = None
                    if mm:
                        form = mm.group(1).strip()
                        tal_former = int(mm.group(2))
                        fr = re.search(r"frå (\S+)$", form)
                        if fr:
                            form = fr.group(1)
                    else:
                        L.ukl(doc, line, "Rotforma til %s (%s) kunne ikkje tolkast: «%s»" % (ord_, nr, rot))
                    post["rotform"] = OrderedDict([("form", form), ("former", tal_former), ("kjelde_tekst", rot)])
                else:
                    post["rotform"] = None
                post["felt"] = None
                post["kjelde"] = stad(doc, line)
                # sjekk familien til hovudforma mot regelen
                rf = fam_etter_regelen(ord_.split(" ")[0], kap, klasse, None)
                if fam and rf and rf != fam and not (fam == "smaa" and "adv." in (klasse or "")):
                    post["fam_etter_regelen"] = rf
                # trekk
                if nr in trekk_tab:
                    tl, tr = trekk_tab[nr]
                    tn = tr["Trekk"]
                    mm = re.match(r"^(.*?)\s*\((.+)\)$", tn)
                    tnamn, tmot = (mm.group(1), mm.group(2)) if mm else (tn, None)
                    tid = D.get("trekk_namn", {}).get(tnamn.lower())
                    if tid is None:
                        L.ukl(tto, tl, "Trekket «%s» for %s finst ikkje i katalogen" % (tn, nr))
                    post["trekk"] = tid
                    if tmot:
                        post["trekk_mot"] = tmot
                    post["trekk_grunn"] = tr["Grunngjeving"]
                    if fam_id(tr["Familie"]) != fam:
                        L.mot("%s %s har familien %s i ordlista og %s i Trekka til orda" % (nr, ord_, r["Lydfamilie"], tr["Familie"]),
                              stad(doc, line), stad(tto, tl))
                    o2 = tr["Oppslag"].split(",")[0].strip()
                    if o2 != ord_:
                        L.mot("%s heiter «%s» i ordlista og «%s» i Trekka til orda" % (nr, ord_, o2), stad(doc, line), stad(tto, tl))
                elif fam in ("kv", "smaa", "j", "diftong", "hard"):
                    L.ukl(doc, line, "%s %s er i familien %s, men står ikkje i Trekka til orda" % (nr, ord_, r["Lydfamilie"]))
                oppslag.append(post)
    for nr in trekk_tab:
        if nr not in sett_nr:
            tl, tr = trekk_tab[nr]
            L.ukl(tto, tl, "Trekka til orda har %s, som ikkje finst i ordlista" % nr)
    # ID-ar: oppslagsordet etter regelen, med tal når same ord står fleire gonger
    tel = {}
    for p in oppslag:
        b = idify(re.sub(r"\s*\(.*?\)", "", p["oppslag"]))
        tel.setdefault(b, []).append(p)
    for b, l in tel.items():
        for i, p in enumerate(l):
            p["id"] = b if i == 0 else "%s%d" % (b, i + 1)
        if len(l) > 1:
            L.merk("Oppslagsordet «%s» står %d gonger (%s). Det første har ID-en %s, dei andre har tal etter"
                   % (l[0]["oppslag"], len(l), ", ".join(x["nr"] for x in l), b))
    # Teljinga mot familiane i Magisystemet
    from collections import Counter
    c = Counter(p["fam"] for p in oppslag)
    for fid, f in D.get("familiar", {}).items():
        if f.get("oppslag_tal") is not None and c.get(fid, 0) != f["oppslag_tal"]:
            L.mot("Familien %s har %d oppslag i ordlistene, men %d i tabellen Dei sju familiane i Magisystemet"
                  % (f["namn"], c.get(fid, 0), f["oppslag_tal"]), f["kjelde"])
    avvik = [p for p in oppslag if "fam_etter_regelen" in p]
    for p in avvik:
        L.mot("%s %s står med familien %s, men regelrekkja gjev %s for oppslagsforma"
              % (p["nr"], p["oppslag"], p["fam"], p["fam_etter_regelen"]), p["kjelde"])
    L.merk("Feltet hove_merke er null på alle oppslag. Dokumentet har inga liste over tydingsmerke, og Høvesbonus-kolonnen er fri tekst, så merka kan ikkje lesast sikkert")
    L.merk("Feltet felt (bruk utanfor kamp) er null på alle oppslag. Ordlistene har ingen kolonne for det")
    L.merk("Familien til kvar form (former[].fam) er rekna ut med regelrekkja i Magisystemet. Feltet fam på oppslaget er familien som står i ordlista")
    legg("ord/oppslag.json", oppslag)
    D["oppslag"] = oppslag
    D["ord_nr"] = {p["nr"]: p["id"] for p in oppslag}
    D["ord_namn"] = {}
    for p in oppslag:
        D["ord_namn"].setdefault(p["oppslag"].lower(), p["id"])

    # ---- kapitla
    ob = K["09 Ordboka/00 Ordboka"]
    kap = []
    t = ob.tabell("Nr", "Kapittel", "Plassar", seksjon="Kapitla")
    gaaver = {}
    tg = ob.tabell("Kapittel", "Gåve ved Fullt")
    for line, r in tg:
        m = re.match(r"(\d+)", r["Kapittel"])
        if m:
            gaaver[int(m.group(1))] = (line, r["Gåve ved Fullt"])
    merke = []
    for line, r in ob.tabell("Merke", "Krav", "Løn"):
        merke.append(OrderedDict([("id", idify(r["Merke"])), ("namn", r["Merke"]), ("krav", r["Krav"]),
                                  ("lon", r["Løn"]), ("kjelde", stad(ob, line))]))
    for line, r in t:
        n = tal(r["Nr"])
        if n is None:
            continue
        g = gaaver.get(n)
        plassar = tal(r["Plassar"])
        verkeleg = sum(1 for p in oppslag if p["kapittel"] == n)
        if plassar != verkeleg:
            L.mot("Kapittel %d har %s plassar i Ordboka del 2, men ordlista har %d oppslag" % (n, plassar, verkeleg), stad(ob, line))
        kap.append(OrderedDict([
            ("id", n), ("namn", r["Kapittel"]), ("plassar", plassar), ("former", tal(r["Former"])),
            ("rotformer", tal(r["Rotformer"])), ("ukontrollerte", tal(r["Ukontrollerte"])),
            ("epoke_tekst", r["Epoke"]), ("stadmerke", r["Stadmerke"] or None),
            ("lon_fullt", g[1] if g else None),
            ("oppslag", [p["id"] for p in oppslag if p["kapittel"] == n]),
            ("kjelde", stad(ob, line)),
        ]))
    rangar = []
    for line, r in ob.tabell("Rang", "Krav"):
        rangar.append(OrderedDict([("id", idify(r["Rang"])), ("namn", r["Rang"]), ("krav", r["Krav"]), ("kjelde", stad(ob, line))]))
    legg("ord/kapittel.json", OrderedDict([("kapittel", kap), ("merke", merke), ("rangar", rangar)]))

    # ---- Lydtreet
    fa = K["03 Figurar Aasen til Ravdna"]
    greiner = []
    t = fa.tabell("Del", "Grein", "Opnar seg", seksjon="Lydtreet")
    for line, r in t:
        greiner.append(OrderedDict([("id", idify(r["Grein"])), ("namn", r["Grein"]), ("del", r["Del"]),
                                    ("opnar_seg_tekst", r["Opnar seg"]), ("scener", finn_scener(r["Opnar seg"])),
                                    ("nodar_tekst", r[t.header[3]]), ("kjelde", stad(fa, line))]))
    nodar = []
    t = ob.tabell("Epoke", "Grein", "Node", "Pris før", "Ny pris")
    for line, r in t:
        node_t, pris_t = r["Node"], r["Ny pris"]
        m = re.match(r"^Meistring (I{1,3}) for (.+)$", node_t)
        if m:
            nivaa = m.group(1)
            fl = m.group(2)
            if fl.startswith("alle seks familiane"):
                famar = ["diftong", "hard", "j", "kv", "smaa", "grunn"]
            else:
                famar = [fam_id(x) for x in liste_og(fl)]
            pm = re.match(r"(\d+)", pris_t)
            for f in famar:
                nodar.append(OrderedDict([("id", "meistring_%s_%s" % (nivaa.lower(), f)), ("namn", "Meistring %s" % nivaa),
                                          ("fam", f), ("del", r["Grein"]), ("epoke", r["Epoke"]),
                                          ("pris", int(pm.group(1)) if pm else None), ("kjelde_tekst", node_t + ": " + pris_t),
                                          ("kjelde", stad(ob, line))]))
            continue
        namn_l = [x.strip() for x in node_t.split(" / ")]
        pris_l = [x.strip() for x in pris_t.split(" / ")]
        m = re.match(r"^(.*?), éin node per følgjesvenn, opp til (\d+)$", node_t)
        if m:
            pm = re.match(r"(\d+)", pris_t)
            nodar.append(OrderedDict([("id", idify(m.group(1))), ("namn", m.group(1)), ("del", r["Grein"]),
                                      ("epoke", r["Epoke"]), ("pris", int(pm.group(1)) if pm else None),
                                      ("inntil", int(m.group(2))), ("kjelde_tekst", node_t + ": " + pris_t),
                                      ("kjelde", stad(ob, line))]))
            continue
        if len(namn_l) != len(pris_l):
            # «Hugsen, plass 4 / plass 5» og «Runelesing nivå 2 / nivå 3»: fyrste ledd ber stammen
            L.ukl(ob, line, "Nodane «%s» og prisane «%s» har ulikt tal ledd" % (node_t, pris_t))
            continue
        stamme = None
        for i, (nn, pp) in enumerate(zip(namn_l, pris_l)):
            if i == 0:
                mm = re.match(r"^(.*?)(?:, | )(plass \d+|nivå \d+)$", nn)
                if mm:
                    stamme = mm.group(1)
            elif stamme and re.match(r"^(plass|nivå) \d+$", nn):
                nn = stamme + (", " if "Hugsen" in stamme else " ") + nn
            nodar.append(OrderedDict([("id", idify(nn)), ("namn", nn), ("del", r["Grein"]), ("epoke", r["Epoke"]),
                                      ("pris", tal(pp)), ("pris_for", None), ("kjelde_tekst", node_t + ": " + pris_t),
                                      ("kjelde", stad(ob, line))]))
            pf = [x.strip() for x in r["Pris før"].split(" / ")]
            if len(pf) == len(namn_l):
                nodar[-1]["pris_for"] = tal(pf[i])
    meist = []
    for line, r in ob.tabell("Familie", "Krav I / II / III"):
        k = [tal(x) for x in r["Krav I / II / III"].split("/")]
        meist.append(OrderedDict([("fam", fam_id(r["Familie"])), ("krav", k), ("I", r["I"]), ("II", r["II"]),
                                  ("III", r["III"]), ("kjelde", stad(ob, line))]))
    obn = []
    for line, r in ob.tabell("Ordboka-node", "Verknad"):
        obn.append(OrderedDict([("id", idify(r["Ordboka-node"])), ("verknad_tekst", r["Verknad"]), ("kjelde", stad(ob, line))]))
        for n in nodar:
            if n["id"] == idify(r["Ordboka-node"]):
                n["verknad_tekst"] = r["Verknad"]
    for n in nodar:
        if n["id"].startswith("meistring_"):
            for mm in meist:
                if mm["fam"] == n["fam"]:
                    nv = {"meistring_i": 0, "meistring_ii": 1, "meistring_iii": 2}[n["id"].rsplit("_", 1)[0]]
                    n["krav"] = mm["krav"][nv] if len(mm["krav"]) > nv else None
                    n["verknad_tekst"] = mm[["I", "II", "III"][nv]]
    legg("ord/lydtre.json", OrderedDict([("greiner", greiner), ("nodar", nodar), ("meistring", meist)]))


# ===========================================================================
# 4. Statusar, kurver og epokar
# ===========================================================================

def tal_eller_tekst(v):
    if v is None:
        return None
    t = v.strip()
    if t == "":
        return None
    n = tal(t.replace("%", "").replace(" prosent", ""))
    return n if n is not None else t


def tabell_postar(t, doc, med_kjelde=True):
    ut = []
    for line, r in t:
        p = OrderedDict()
        for k in t.header:
            p[idify(k)] = tal_eller_tekst(r[k])
        if med_kjelde:
            p["kjelde"] = stad(doc, line)
        ut.append(p)
    return ut


def eining_statusar(K):
    gs = K["01 Grunnsystemet"]
    sfx = sfx_tabell(K, "Status")
    statusar = []
    for i, t in enumerate(gs.tabellar_med("Status", "Verknad", "Løftast med")):
        for line, r in t:
            namn = r["Status"]
            sid = idify(namn)
            loft = r["Løftast med"] or None
            statusar.append(OrderedDict([
                ("id", sid), ("namn", namn), ("verknad_tekst", r["Verknad"]),
                ("loftast_med", [x for x in liste_og(loft)] if loft else []),
                ("loftast_med_tekst", loft), ("god", None),
                ("gruppe", "grunn" if i == 0 else "fleire_kampar"),
                ("sfx", sfx.get(namn)), ("ikon", None), ("kjelde", stad(gs, line)),
            ]))
    namn = {s["namn"].lower() for s in statusar}
    for k, v in sfx.items():
        if k.lower() not in namn and not k.lower().startswith(("felles", "ein status")):
            L.ukl(K["03 Lydeffektar"], None, "Lyden %s er for statusen «%s», som ikkje står i Grunnsystemet" % (v, k))
    # Magisystemet har ein eigen tabell over statusar som rammar orda
    mag = K["01 Magisystemet frå ord til galdr"]
    t = mag.tabell("Status", "Kva han gjer med orda")
    if t:
        for line, r in t:
            if r["Status"].lower() not in namn:
                L.mot("Statusen «%s» står i Magisystemet, men ikkje i statustabellane i Grunnsystemet" % r["Status"], stad(mag, line))
    L.merk("Feltet god (sann eller usann) er null på alle statusar. Dokumentet deler ikkje statusane i gode og vonde. Feltet ikon er null av same grunn")
    legg("system/statusar.json", statusar)
    D["statusar"] = statusar

    # ---- kurver
    nv = K["02 Nivå, eigenskapar og utstyr"]
    kurver = OrderedDict()

    def ta(nokkel, *kol, seksjon=None):
        t = nv.tabell(*kol, seksjon=seksjon)
        if t is None:
            L.ukl(nv, None, "Fann ikkje tabellen %s (%s)" % (nokkel, seksjon or kol[0]))
            return
        kurver[nokkel] = OrderedDict([("kjelde", stad(nv, t.line)), ("rader", tabell_postar(t, nv, False))])

    def formel(nokkel, seksjon, byrjar):
        for nr, l in nv.seksjon_linjer(seksjon):
            if l.startswith(byrjar):
                kurver.setdefault(nokkel, OrderedDict())["formel_tekst"] = l.strip()
                kurver[nokkel]["formel_kjelde"] = stad(nv, nr)
                return

    ta("eigenskapar", "Eigenskap", "Kva han gjer", "Tak")
    ta("tidsmaalar", "Snøggleik", "Sekund til full målar")
    formel("tidsmaalar", "Tidsmålaren", "Tid til full målar")
    ta("royst_skala", "Nivå", "Røyst (typisk)", "Røyst-skala")
    ta("kontroll_typisk_figur", "Nivå", "Liv (typisk)")
    ta("fiendar_per_niva", "Nivå", "Liv, vanleg fiende")
    # vekst per figur
    t = nv.tabell("Figur", "Liv-faktor", "Røyst-faktor")
    vekst = []
    eig = [("Kraft", "kraft"), ("Ordkraft", "ordkraft"), ("Herdsle", "herdsle"), ("Tole", "tole"),
           ("Snøggleik", "snogg"), ("Lukke", "lukke")]
    for line, r in t:
        p = OrderedDict([("figur", FIGUR_NAMN.get(r["Figur"].lower(), idify(r["Figur"])))])
        p["liv_faktor"] = tal(r["Liv-faktor"])
        p["royst_faktor"] = tal(r["Røyst-faktor"])
        if p["royst_faktor"] is None:
            p["royst_faktor_tekst"] = r["Røyst-faktor"]
        for kol, k in eig:
            m = re.fullmatch(r"(\d+(?:,\d+)?)\s*\+\s*(\d+(?:,\d+)?)", r[kol])
            p[k] = OrderedDict([("grunn", tal(m.group(1))), ("vekst", tal(m.group(2)))]) if m else None
            if not m:
                L.ukl(nv, line, "Veksten %s for %s kunne ikkje tolkast: «%s»" % (kol, r["Figur"], r[kol]))
        p["kjelde"] = stad(nv, line)
        vekst.append(p)
    kurver["vekst"] = OrderedDict([("kjelde", stad(nv, t.line)), ("rader", vekst)])
    for nr, l in nv.seksjon_linjer("Fast vekst"):
        if l.startswith("Kvar eigenskap følgjer"):
            kurver["vekst"]["formel_tekst"] = l.strip()
            kurver["vekst"]["formel_kjelde"] = stad(nv, nr)
    # tabellane per eigenskap (nivå 1, 10, ... 70)
    per = OrderedDict()
    for seks, k in (("Liv", "liv"), ("Røyst", "royst"), ("Kraft", "kraft"), ("Ordkraft", "ordkraft"),
                    ("Herdsle", "herdsle"), ("Tole", "tole"), ("Snøggleik", "snogg"), ("Lukke", "lukke")):
        t = nv.tabell("Figur", "Nivå 1", seksjon=seks)
        if not t:
            continue
        rader = []
        for line, r in t:
            rader.append(OrderedDict([("figur", FIGUR_NAMN.get(r["Figur"].lower(), idify(r["Figur"])))] +
                                     [(h.replace("Nivå ", ""), tal(r[h])) for h in t.header[1:]]))
        per[k] = OrderedDict([("kjelde", stad(nv, t.line)), ("rader", rader)])
    kurver["eigenskapar_per_niva"] = per
    ta("unge_ivar", "Nivå", "Liv", "Røyst", "Kraft", seksjon="Unge Ivar og tidshoppa")
    ta("huldra_nedskrivne_ord", "Skrivne huldreord, heimr medrekna")
    ta("roynslekurve", "Nivå", "Til neste nivå")
    formel("roynslekurve", "Kurva", "Røynsle til neste nivå")
    for nr, l in nv.seksjon_linjer("Kurva"):
        if l.startswith("Røynsle frå ein vanleg fiende"):
            kurver["roynslekurve"]["fiende_formel_tekst"] = l.strip()
    ta("gummiband", "Fienden over (+) eller under (−) figuren")
    ta("kampar_per_del", "Del", "Nivå", "Nivå i alt")
    ta("tilraadd_niva_per_del", "Del", "Nivå inn", "Nivå ut")
    ta("roynsle_etter_utgang", "Utgang", "Røynsle", "Kjelde")
    ta("eventyrboka_sider", "Side", "Vilje", "Bonus per nivå")
    ta("styrkjeting", "Ting", "Verknad", "Tal i spelet")
    ta("pengar_per_del", "Del", "Pengar spelaren styrer (om lag)")
    ta("pengekjelder", "Kjelde", "Kva spelaren får", "Når")
    ta("bossar_mot_formlane", "Boss", "Nivå", "Figurar", "Liv")
    for nr, l in nv.seksjon_linjer("Speciedalar og skilling"):
        if "120 skilling" in l:
            kurver["pengar"] = OrderedDict([("skilling_per_speciedalar", 120), ("kjelde_tekst", l.strip()), ("kjelde", stad(nv, nr))])
            break
    legg("system/kurver.json", kurver)

    # ---- epokar
    ve = K["06 Verda/00 Verda"]
    gr = K["02 Grafikk og stil"]
    stemning = OrderedDict()
    t = gr.tabell("Epoke", "Stemning")
    for line, r in t:
        stemning[r["Epoke"]] = (line, r["Stemning"])
    tider = D.get("tider", [])
    epokar = []
    t = ve.tabell("Lag", "Tid")
    brukt = set()
    for line, r in t:
        tid_t = r["Tid"]
        aar = [int(x) for x in re.findall(r"\b(1[89]\d\d)\b", tid_t)]
        fraa = aar[0] if aar else None
        til = aar[-1] if aar else None
        # tida T1 til T4 etter åra i Varer og kister
        tid = None
        if fraa is not None:
            if til <= 1841:
                tid = "T1"
            elif fraa >= 1842 and til <= 1847:
                tid = "T2"
            elif fraa >= 1847 and til <= 1850:
                tid = "T3"
            elif fraa >= 1850:
                tid = "T4"
        st = None
        for k, (sl, sv) in stemning.items():
            if k.startswith(r["Lag"]) or (tid_t and tid_t in k):
                st = sv
                brukt.add(k)
                break
        epokar.append(OrderedDict([("id", idify(r["Lag"])), ("namn", r["Lag"]), ("fraa", fraa), ("til", til),
                                   ("tid_tekst", tid_t), ("tid", tid), ("stemning", st), ("kjelde", stad(ve, line))]))
    for k, (sl, sv) in stemning.items():
        if k not in brukt:
            L.mot("Grafikk og stil har stemning for epoken «%s», men lista over lag i Verda (Same stad gjennom tida) har ingen epoke med det namnet eller dei åra" % k,
                  stad(gr, sl), stad(ve, t.line))
    L.merk("Tida T1 til T4 på kvar epoke er sett etter åra i tabellen Tidene i Varer og kister. Etter oppgjeret og Epilogen har fått T4, fordi T4 er «1850 til 1853 og seinare»")
    legg("system/epokar.json", OrderedDict([("epokar", epokar), ("tider", tider)]))
    D["epokar"] = epokar


# ===========================================================================
# 5. Figurar og evner
# ===========================================================================

FIGUR_SEKSJON = OrderedDict([
    ("Ivar Aasen", "aasen"), ("Tussen", "tussen"), ("Huldra", "huldra"),
    ("Aasmund Olavsson Vinje", "vinje"), ("Magnus Brostrup Landstad", "landstad"),
    ("Aslaug Tveitli", "aslaug"), ("Ravdna", "ravdna"), ("Camilla Collett", "collett"),
    ("Knud Knudsen", "knudsen"), ("Peter Christen Asbjørnsen", "asbjornsen"),
    ("Jørgen Moe", "moe"), ("Ole Bull", "ole_bull"), ("Berte Kanutte Aarflot", "berte"),
    ("Jotunen", "jotunen"),
])
KORT_NAMN = {"aasen": "Aasen", "unge_ivar": "Unge Ivar", "tussen": "Tussen", "huldra": "Huldra",
             "vinje": "Vinje", "landstad": "Landstad", "aslaug": "Aslaug", "ravdna": "Ravdna",
             "collett": "Collett", "knudsen": "Knudsen", "asbjornsen": "Asbjørnsen", "moe": "Moe",
             "ole_bull": "Ole Bull", "berte": "Berte", "jotunen": "Jotunen", "rasmus": "Rasmus"}
FELLES_KOMMANDO = {"angrip": "Angrip", "lytt": "Lytt", "ting": "Ting", "staa_still": "Stå still"}

# Tabellar med evner. Første kolonne -> (type, kolonne for kostnad, kolonne for verknad, kolonne for lært, under kommando)
EVNE_TABELLAR = {
    "Evne": ("evne", "Kostnad", "Verknad", "Lært", None),
    "Tusseord": ("evne", None, "Verknad", "Kjelde", "eitt_ord"),
    "Slått": ("evne", "Kostnad", "Verknad medan han spelar", "Lært", "spel"),
    "Minnevers": ("evne", "Kostnad", "Verknad", "Lært", "det_staar_skrive"),
    "Bøn": ("evne", "Kostnad", "Verknad medan ho bed", None, "be"),
    "Side": ("evne", "Røyst", "Innskriving og verknad", None, "paakall"),
    "Eventyr": ("evne", None, "Verknad når det er ferdig", "Lært", "fortelje"),
}


def figur_seksjonar(doc):
    """{figur-id: (startline, sluttline)} for ## -bolkane."""
    ut = OrderedDict()
    h2 = [(t, l) for n, t, l in doc.overskrifter if n == 2]
    for i, (t, l) in enumerate(h2):
        slutt = h2[i + 1][1] - 1 if i + 1 < len(h2) else len(doc.lines)
        if t in FIGUR_SEKSJON:
            ut[FIGUR_SEKSJON[t]] = (t, l, slutt)
    return ut


def tolk_kommandoliste(tekst):
    """«Angrip, Gamle ord, Lokk (S1.42), Ord, Lytt og Ting, og frå 5.17 Joiken min.» -> liste av (namn, opnar)"""
    forste = re.split(r"(?<=[a-zæøå)])\.\s", tekst.strip(), maxsplit=1)[0].rstrip(".")
    m = re.match(r"^.*?:\s*(.+)$", forste)
    if m and ("," in m.group(1) or " og " in m.group(1)):
        forste = m.group(1)
    ut = []
    for d in liste_og(forste):
        d = re.sub(r"^og\s+", "", d).strip()
        opnar = None
        mm = re.match(r"^frå (\S+) (.+)$", d)
        if mm:
            opnar, d = mm.group(1), mm.group(2)
        mm = re.match(r"^(.*?)\s*\((.*)\)$", d)
        if mm:
            d, par = mm.group(1), mm.group(2)
            if finn_scener(par):
                opnar = par
        if d:
            ut.append((d.strip(), opnar))
    return ut


def eining_figurar(K):
    fa = K["03 Figurar Aasen til Ravdna"]
    fb = K["04 Figurar Collett til jotunen"]
    nv = K["02 Nivå, eigenskapar og utstyr"]
    mag = K["01 Magisystemet frå ord til galdr"]
    gs = K["01 Grunnsystemet"]
    sfx_felt = sfx_tabell(K, "Kven")
    sfx_kom = sfx_tabell(K, "Kven og kva")
    evner = OrderedDict()

    def ny_evne(eid, figur, namn, type_, doc, line, **kw):
        if eid in evner:
            e = evner[eid]
            for k, v in kw.items():
                if v not in (None, "", []) and e.get(k) in (None, "", []):
                    e[k] = v
            e.setdefault("kjelder", []).append(stad(doc, line))
            return e
        e = OrderedDict([("id", eid), ("figur", figur), ("namn", namn), ("type", type_),
                         ("kostnad", None), ("verknad_tekst", None), ("laert", None), ("laert_scener", []),
                         ("under", None), ("aatferd", None), ("sfx", None), ("kjelde", stad(doc, line))])
        for k, v in kw.items():
            e[k] = v
        if e.get("laert"):
            e["laert_scener"] = finn_scener(e["laert"])
        evner[eid] = e
        return e

    # felles kommandoar
    for eid, namn in FELLES_KOMMANDO.items():
        for nr, l in gs.seksjon_linjer("Felles kommandoar"):
            if namn in l:
                ny_evne(eid, None, namn, "kommando", gs, nr)
                break

    figurar = OrderedDict()
    for doc in (fa, fb):
        for fid, (tittel, start, slutt) in figur_seksjonar(doc).items():
            f = OrderedDict([("id", fid), ("namn", tittel), ("kort_namn", KORT_NAMN.get(fid)),
                             ("blir_med", []), ("profil", None), ("vekst", None), ("meny", []),
                             ("ressurs", None), ("ordplassar", None), ("feltevne", []), ("hugmaalar", None),
                             ("utstyr", None), ("portrett", None), ("kartfigur", None),
                             ("kjelde", stad(doc, start))])
            figurar[fid] = f
            # tabellar i bolken
            for t in doc.tabellar:
                if not (start <= t.line <= slutt):
                    continue
                h0 = t.header[0]
                if h0 == "Kommando":
                    for line, r in t:
                        eid = idify(r["Kommando"])
                        if eid in FELLES_KOMMANDO:
                            f["meny"].append(eid)
                            continue
                        e = ny_evne("%s_%s" % (fid, eid), fid, r["Kommando"], "kommando", doc, line,
                                    verknad_tekst=r["Kva han gjer"], laert=r["Opnar seg"])
                        f["meny"].append(e["id"])
                elif h0 in EVNE_TABELLAR or (h0 == "Ord" and fid in ("huldra", "jotunen")):
                    if h0 == "Ord":
                        type_, kk, vk, lk, under = ("evne", None, "Verknad",
                                                    "Kjelde" if fid == "huldra" else "Lært",
                                                    "gamle_ord" if fid == "huldra" else "eitt_ord")
                    else:
                        type_, kk, vk, lk, under = EVNE_TABELLAR[h0]
                    if t.seksjon.startswith("Ladeevner"):
                        under = "ladeevner"
                    for line, r in t:
                        namn = r[h0]
                        mm = re.match(r"^(.*?)\s*\((.*)\)$", namn)
                        eid = "%s_%s" % (fid, idify(mm.group(1) if mm else namn))
                        kost = r.get(kk) if kk else None
                        e = ny_evne(eid, fid, namn, type_, doc, line, kostnad=kost,
                                    verknad_tekst=r.get(vk), laert=r.get(lk) if lk else None,
                                    under=("%s_%s" % (fid, under)) if under else None)
                        if kost and kost.startswith("Hugmålar"):
                            e["type"] = "hugmaalar"
                elif h0 == "Samspel":
                    pass  # samspela kjem frå den samla lista i Grunnsystemet
            # kommandomenyen som tekst
            for n, tt, l in doc.overskrifter:
                if start <= l <= slutt and n == 3 and tt.startswith(("Kommandomeny", "Kommandomenyen")):
                    linjer = [x for nr, x in doc.linjer_under(l) if x.strip() and not x.startswith("|")]
                    if linjer and not f["meny"]:
                        for namn, opnar in tolk_kommandoliste(linjer[0]):
                            eid = idify(namn)
                            if eid in FELLES_KOMMANDO:
                                f["meny"].append(eid)
                                continue
                            e = ny_evne("%s_%s" % (fid, eid), fid, namn, "kommando", doc, l, laert=opnar)
                            e["type"] = "kommando"
                            f["meny"].append(e["id"])
                        f["meny_tekst"] = linjer[0]
                # hugmålar og feltevne
                if start <= l <= slutt and n == 3 and tt.startswith("Hugmålar-evne: "):
                    namn = tt[len("Hugmålar-evne: "):]
                    tekst = " ".join(x for nr, x in doc.linjer_under(l) if x.strip())
                    e = ny_evne("%s_%s" % (fid, idify(namn)), fid, namn, "hugmaalar", doc, l, verknad_tekst=tekst or None)
                    e["type"] = "hugmaalar"
                    e["laert_scener"] = e["laert_scener"] or finn_scener(namn + " " + tekst[:80])
                    f["hugmaalar"] = e["id"]
                if start <= l <= slutt and n == 3 and tt.startswith("Feltevne: "):
                    tekst = " ".join(x for nr, x in doc.linjer_under(l) if x.strip())
                    for namn in liste_og(tt[len("Feltevne: "):]):
                        eid = "%s_%s" % (fid, idify(namn))
                        if eid in evner and evner[eid]["type"] != "feltevne":
                            eid = "%s_felt_%s" % (fid, idify(namn))
                        e = ny_evne(eid, fid, namn, "feltevne", doc, l, verknad_tekst=tekst or None)
                        e["type"] = "feltevne"
                        e["sfx"] = sfx_felt.get("%s, %s" % (KORT_NAMN.get(fid, ""), namn))
                        if e["sfx"] is None:
                            for k, v in sfx_felt.items():
                                if k.lower().endswith(", " + namn.lower()):
                                    e["sfx"] = v
                        f["feltevne"].append(eid)
            # ressurs: «X er ein målar frå 0 til N» eller «står X, frå 0 til N»
            tekst = "\n".join(doc.lines[start:slutt])
            for rnamn in ("Ekte", "Embete", "Tvil", "Mett", "Tillit", "Vilje", "Snudd"):
                if re.search(r"\b%s\b" % rnamn, tekst):
                    m = re.search(r"\b%s(?:-målar)?\b[^.]*?frå 0 til (\d+)" % rnamn, tekst)
                    m2 = re.search(r"\b%s[^.]*?på (\d+) til (\d+) prikkar" % rnamn, tekst)
                    if re.search(r"%s er ein målar|står %s, frå 0 til|%s-målar|^### .*\b%s\b|^%s blir rekna" % (rnamn, rnamn, rnamn, rnamn, rnamn), tekst, re.M):
                        if f["ressurs"] is None:
                            f["ressurs"] = OrderedDict([("id", idify(rnamn)), ("namn", rnamn),
                                                        ("maks", int(m.group(1)) if m else None), ("ikon", None)])
                            if m2:
                                f["ressurs"]["maks_tekst"] = m2.group(0)

    # unge Ivar som eigen figur
    if "aasen" in figurar:
        ui = OrderedDict([("id", "unge_ivar"), ("namn", "Unge Ivar"), ("kort_namn", "Unge Ivar"),
                          ("blir_med", []), ("profil", None), ("vekst", "kurver.json#unge_ivar"), ("meny", []),
                          ("ressurs", None), ("ordplassar", None), ("feltevne", []), ("hugmaalar", None),
                          ("utstyr", None), ("portrett", None), ("kartfigur", None), ("kjelde", None)])
        for nr, l in fa.seksjon_linjer("Unge Ivar i første akt"):
            if "mindre meny" in l:
                ui["kjelde"] = stad(fa, nr)
                for namn, opnar in tolk_kommandoliste(l):
                    eid = idify(namn)
                    if eid in FELLES_KOMMANDO:
                        ui["meny"].append(eid)
                    elif "aasen_" + eid in evner:
                        ui["meny"].append("aasen_" + eid)
                    else:
                        L.ukl(fa, nr, "Kommandoen «%s» til unge Ivar finst ikkje i kommandomenyen til Aasen" % namn)
                ui["meny_tekst"] = l.strip()
                break
        figurar["unge_ivar"] = ui
    # Rasmus og prologkommandoane
    t = fb.tabell("Figur", "Kommandoar", "Kva spelaren lærer")
    if t:
        for line, r in t:
            fid = FIGUR_NAMN.get(r["Figur"].lower()) or idify(r["Figur"])
            ids = []
            for namn in [x.strip() for x in r["Kommandoar"].split(",")]:
                eid = idify(namn)
                if eid in FELLES_KOMMANDO:
                    ids.append(eid)
                    continue
                full = "%s_%s" % (fid, eid)
                if full not in evner:
                    ny_evne(full, fid, namn, "kommando", fb, line, laert="0.1")
                ids.append(full)
            if fid not in figurar:
                figurar[fid] = OrderedDict([("id", fid), ("namn", r["Figur"]), ("kort_namn", r["Figur"]),
                                            ("blir_med", []), ("profil", None), ("vekst", None), ("meny", ids),
                                            ("ressurs", None), ("ordplassar", None), ("feltevne", []), ("hugmaalar", None),
                                            ("utstyr", None), ("portrett", None), ("kartfigur", None),
                                            ("berre_prologen", True), ("kjelde", stad(fb, line))])
            else:
                figurar[fid]["prolog_meny"] = ids

    # blir med
    t = nv.tabell("Figur", "Blir med", "Nivå", "Tillegg")
    for line, r in t:
        namn = r["Figur"]
        hovud = namn.split(",")[0].strip().lower()
        fids = []
        if hovud == "moe og asbjørnsen":
            fids = ["moe", "asbjornsen"]
        elif hovud == "aasen":
            fids = ["aasen"]
        else:
            fids = [FIGUR_NAMN.get(hovud)]
        for fid in fids:
            if fid not in figurar:
                L.ukl(nv, line, "Figuren «%s» i Nivå når figurane blir med er ukjend" % namn)
                continue
            sc = finn_scener(r["Blir med"])
            figurar[fid]["blir_med"].append(OrderedDict([
                ("scene", sc[0] if sc else None), ("tekst", r["Blir med"]), ("niva", tal(r["Nivå"])),
                ("niva_tekst", r["Nivå"] if tal(r["Nivå"]) is None else None), ("tillegg", r["Tillegg"] or None),
                ("merknad", namn.split(",", 1)[1].strip() if "," in namn else None), ("kjelde", stad(nv, line))]))
    # profil og vekst
    t = nv.tabell("Figur", "Liv-faktor", "Røyst-faktor")
    for line, r in t:
        fid = FIGUR_NAMN.get(r["Figur"].lower())
        if fid not in figurar:
            continue
        p = OrderedDict([("liv", tal(r["Liv-faktor"])), ("royst", tal(r["Røyst-faktor"]))])
        for kol, k in (("Kraft", "kraft"), ("Ordkraft", "ordkraft"), ("Herdsle", "herdsle"), ("Tole", "tole"),
                       ("Snøggleik", "snogg"), ("Lukke", "lukke")):
            m = re.fullmatch(r"(\d+(?:,\d+)?)\s*\+\s*(\d+(?:,\d+)?)", r[kol])
            p[k] = OrderedDict([("grunn", tal(m.group(1))), ("vekst", tal(m.group(2)))]) if m else None
        if p["royst"] is None:
            p["royst_tekst"] = r["Røyst-faktor"]
        figurar[fid]["profil"] = p
        figurar[fid]["vekst"] = "kurver.json#vekst"
    # ordplassar
    t = mag.tabell("Figur", "Ordplassar", "Kva ord", "Eigenart")
    for line, r in t:
        namn = r["Figur"].lower()
        fids = ["tussen", "unge_ivar"] if namn == "tussen og unge ivar" else [FIGUR_NAMN.get(namn)]
        for fid in fids:
            if fid in figurar:
                ko = r["Kva ord"]
                figurar[fid]["ordplassar"] = OrderedDict([
                    ("har", r["Ordplassar"] == "Ja"),
                    ("kva_ord", {"Alle": "begge", "Berre hugsa ord": "hugsa", "Berre skrivne ord": "skrivne"}.get(ko)),
                    ("kva_ord_tekst", ko or None), ("eigenart", r["Eigenart"]), ("kjelde", stad(mag, line))])
    # utstyr
    t = nv.tabell("Figur", "Reiskap", "Klede og hovud", "Lomme")
    for line, r in t:
        fid = FIGUR_NAMN.get(r["Figur"].lower())
        if fid in figurar:
            figurar[fid]["utstyr"] = OrderedDict([("reiskap", r["Reiskap"]), ("klede_og_hovud", r["Klede og hovud"]),
                                                  ("lomme", r["Lomme"]), ("kjelde", stad(nv, line))])
        else:
            L.ukl(nv, line, "Figuren «%s» i Kven kan bere kva er ukjend" % r["Figur"])

    # samspel frå den samla lista i Grunnsystemet
    t = gs.tabell("Samspel", "Figurar", "Verknad", "Opnar seg")
    for line, r in t:
        fl = []
        for d in liste_og(r["Figurar"]):
            fid = FIGUR_NAMN.get(d.lower())
            if fid:
                fl.append(fid)
            else:
                L.ukl(gs, line, "Samspelet %s: figuren «%s» er ukjend" % (r["Samspel"], d))
        ny_evne("samspel_" + idify(r["Samspel"]), fl, r["Samspel"], "samspel", gs, line,
                verknad_tekst=r["Verknad"], laert=r["Opnar seg"])
    # samspeltabellane i figurfanene mot den samla lista
    for doc in (fa, fb):
        for t in doc.tabellar_med("Samspel", "Med", "Verknad", "Opnar seg"):
            for line, r in t:
                eid = "samspel_" + idify(r["Samspel"])
                if eid not in evner:
                    L.mot("Samspelet «%s» står i figurfana, men ikkje i den samla lista i Grunnsystemet" % r["Samspel"], stad(doc, line))
                elif finn_scener(r["Opnar seg"]) and finn_scener(evner[eid]["laert"] or "") and \
                        finn_scener(r["Opnar seg"])[0] != finn_scener(evner[eid]["laert"])[0]:
                    L.mot("Samspelet «%s» opnar seg i %s etter figurfana og i %s etter Grunnsystemet"
                          % (r["Samspel"], r["Opnar seg"], evner[eid]["laert"]), stad(doc, line), evner[eid]["kjelde"])
    # sfx for figurkommandoar
    for k, v in sfx_kom.items():
        hit = None
        for e in evner.values():
            if e["figur"] and isinstance(e["figur"], str) and KORT_NAMN.get(e["figur"]) and \
                    k.lower().startswith(KORT_NAMN[e["figur"]].lower() + ", ") and \
                    k.lower().endswith(e["namn"].lower()):
                hit = e
        if hit and hit["sfx"] is None:
            hit["sfx"] = v

    for e in evner.values():
        if e["type"] in ("kommando", "hugmaalar", "feltevne", "samspel") and e["id"] not in FELLES_KOMMANDO:
            e["aatferd"] = e["id"]
    for fid, f in figurar.items():
        if not f["meny"]:
            L.ukl(K["03 Figurar Aasen til Ravdna"] if fid in ("aasen", "tussen", "huldra", "vinje", "landstad", "aslaug", "ravdna") else fb,
                  None, "Figuren %s har ingen kommandomeny som kunne lesast" % fid)
    L.merk("Felta portrett og kartfigur (filnamn) er null på alle figurar. Dokumentet har ingen filnamn. Prototypen har dei i PORTRETT og U i data.js")
    L.merk("Ressursen til figurane er lesen frå setningar som «Ekte er ein målar frå 0 til 5». Ikonet står ikkje i dokumentet og er null")
    legg("figurar/figurar.json", list(figurar.values()))
    legg("figurar/evner.json", list(evner.values()))
    D["figurar"] = figurar
    D["evner"] = evner


# ===========================================================================
# 6. Fiendar: familiar, vanlege, namngjevne og bossar
# ===========================================================================

SEGL_EINTAL = {"tustar": "tust", "tust": "tust", "knutar": "knut", "knut": "knut", "knappar": "knapp",
               "knapp": "knapp", "blekkdropar": "blekkdrope", "blekkdrope": "blekkdrope", "dropar": "blekkdrope",
               "drope": "blekkdrope", "ravnar": "ravn", "ravn": "ravn", "rimkrystallar": "rimkrystall",
               "rimkrystall": "rimkrystall", "bokmerke": "bokmerke", "segl": None}
ROMAR = {"I": 1, "II": 2, "III": 3, "IV": 4, "V": 5}


def segl_slag(ord_):
    w = ord_.lower()
    if w in SEGL_EINTAL:
        return SEGL_EINTAL[w], True
    if w.endswith(("knut", "knutar")):
        return "knut", True
    if w.endswith(("drope", "dropar")):
        return "blekkdrope", True
    return None, False


def tolk_segl(t):
    if t is None:
        return None
    s = t.strip()
    if s == "":
        return None
    if s.lower().startswith("ingen") or s == "0":
        return OrderedDict([("tal", 0), ("slag", []), ("kjelde_tekst", s)])
    m = re.match(r"^(\d+)\s*(?:\((.*)\)|([a-zæøå ]+))?\s*(.*)$", s)
    if not m:
        return OrderedDict([("tal", None), ("slag", None), ("kjelde_tekst", s)])
    n = int(m.group(1))
    slag = []
    ok = True
    if m.group(2):
        for d in liste_og(m.group(2)):
            mm = re.match(r"^(\d+)\s+(\S+)", d)
            sl, kjent = segl_slag(mm.group(2)) if mm else (None, False)
            if mm and sl:
                slag += [sl] * int(mm.group(1))
            else:
                ok = False
    elif m.group(3):
        ord_ = m.group(3).strip().split(" ")[0]
        sl, kjent = segl_slag(ord_)
        if sl:
            slag = [sl] * n
        elif not kjent:
            ok = False
    if slag and len(slag) != n:
        ok = False
    return OrderedDict([("tal", n), ("slag", slag if ok and slag else None), ("kjelde_tekst", s)])


def tolk_sarbar(t):
    if not t:
        return []
    ut = []
    trekk = D.get("trekk_namn", {})
    statusar = {s["namn"].lower(): s["id"] for s in D.get("statusar", [])}
    for d in del_utanfor_parentes(t, ","):
        for x in re.split(r"\s+og\s+", d):
            x = x.strip().rstrip(".")
            if not x:
                continue
            xl = x.lower()
            f = fam_id(xl) or {"diftong": "diftong", "kv-ord": "kv", "harde": "hard"}.get(xl)
            if f:
                ut.append(OrderedDict([("slag", "fam"), ("id", f)]))
                continue
            if xl in trekk:
                ut.append(OrderedDict([("slag", "trekk"), ("id", trekk[xl])]))
                continue
            tg = ting_finn(re.sub(r"\s+(frå|med) (veska|ting)$", "", xl))
            if tg:
                ut.append(OrderedDict([("slag", tg[0]), ("id", tg[1]), ("tekst", x)]))
                continue
            ev = None
            for e in D.get("evner", {}).values():
                if e["namn"].lower() == xl:
                    ev = e["id"]
                    break
            if ev:
                ut.append(OrderedDict([("slag", "evne"), ("id", ev), ("tekst", x)]))
                continue
            ut.append(OrderedDict([("slag", "tekst"), ("tekst", x)]))
    return ut


def ord_indeks():
    if "ord_indeks" in D:
        return D["ord_indeks"]
    idx = {}
    for p in D.get("oppslag", []):
        idx.setdefault(p["oppslag"].lower(), p["id"])
    for p in D.get("oppslag", []):
        for f in p["former"]:
            for w in re.split(r"\s+og\s+|,\s*|\s+", (f["form"] or "").lower()):
                w = w.strip(".«»'()")
                if len(w) > 1:
                    idx.setdefault(w, p["id"])
    D["ord_indeks"] = idx
    return idx


def tolk_ordboka(t):
    if not t:
        return None
    s = t.strip()
    ord_t, line = None, None
    m = re.match(r"^«([^»]+)»[.:]?\s*(.*)$", s)
    if m:
        ord_t, line = m.group(1), m.group(2) or None
    else:
        m = re.match(r"^([^:«]{1,40}?):\s*(.*)$", s)
        if m:
            ord_t, line = m.group(1), m.group(2) or None
    oid = None
    if ord_t:
        k = ord_t.strip().lower()
        k = re.sub(r"\s*\(.*\)$", "", k)
        oid = ord_indeks().get(k)
    return OrderedDict([("ord", oid), ("form", ord_t), ("line", line), ("kjelde_tekst", s)])


def tolk_trinn(t):
    """«II, 15, gull» -> (trinn, nivå, gull)"""
    if not t:
        return None, None, False
    deler = [x.strip() for x in t.split(",")]
    trinn = deler[0] if deler and deler[0] in ROMAR else None
    niva = None
    for d in deler[1:]:
        if re.fullmatch(r"\d+", d):
            niva = int(d)
    return trinn, niva, any(d == "gull" for d in deler)


def aar_til_epokar(tekst):
    aar = [int(x) for x in re.findall(r"\b(18\d\d)\b", tekst or "")]
    ut = []
    for a in aar:
        for e in D.get("epokar", []):
            if e["fraa"] is not None and e["fraa"] <= a <= e["til"] and e["id"] not in ut:
                ut.append(e["id"])
                break
    if "fimbulvinter" in (tekst or "").lower() and "fimbulvinteren" not in ut:
        ut.append("fimbulvinteren")
    return ut


def fiende_namn_registrer(namn, fil, id_):
    D.setdefault("fiende_namn", OrderedDict())
    k = namn.strip().lower()
    if k in D["fiende_namn"]:
        if D["fiende_namn"][k] != (fil, id_):
            D.setdefault("fiende_namn_dobbel", []).append((namn, D["fiende_namn"][k], (fil, id_)))
        return
    D["fiende_namn"][k] = (fil, id_)


def fiende_finn(namn):
    k = namn.strip().lower()
    fn = D.get("fiende_namn", {})
    if k in fn:
        return fn[k]
    k2 = re.sub(r"\s*\(.*?\)\s*", " ", k).strip()
    if k2 in fn:
        return fn[k2]
    return None


def boss_finn(namn):
    """Namn på ein boss, eller starten av namnet («Musekongen» for «Musekongen og hoffet hans»)."""
    n = re.sub(r"\s*\(.*\)$", "", namn.strip()).lower()
    f = fiende_finn(n)
    if f and f[0] == "bossar":
        return f[1]
    treff = [b["id"] for b in D.get("_bossar", []) if b["namn"].lower().startswith(n + " ")]
    if len(treff) == 1:
        return treff[0]
    return None


def lon_fraa_tekst(tekst):
    m = re.search(r"Løn: ([^.]*(?:\.[^A-ZÆØÅ][^.]*)*)\.", tekst or "")
    return m.group(1).strip() if m else None


def eining_fiendar(K):
    va = K["09a Bestiarium vanlege fiendar"]
    # ---- gullfiendar i 09a
    gull = {}
    t = va.tabell("Fiende", "Familie", "Trinn og nivå", "Stad", "Knepet", "Løn")
    for line, r in t:
        gull[r["Fiende"].lower()] = (line, r)
    # ---- familiar og variantar
    familiar, vanlege = [], []
    for t in va.tabellar_med("Namn", "Kvar og når", "Trinn og nivå", "Liv"):
        famnamn = t.seksjon
        hovud = t.h(2)
        fid = idify(famnamn)
        omtale = " ".join(x for nr, x in va.seksjon_linjer(famnamn, 3) if x.strip() and not x.startswith("|"))
        fam = OrderedDict([("id", fid), ("namn", famnamn), ("hovudfamilie", hovud), ("grunnform", None),
                           ("variantar", []), ("omtale", omtale or None), ("aatferd", fid), ("kjelde", stad(va, t.line))])
        familiar.append(fam)
        seglkol = "Segl" if "Segl" in t.header else ("Knappar" if "Knappar" in t.header else None)
        for i, (line, r) in enumerate(t):
            full = r["Namn"]
            mm = re.match(r"^(.*?)\s*\((.*)\)$", full)
            namn = mm.group(1) if mm else full
            vid = idify(namn)
            trinn, niva, er_gull = tolk_trinn(r["Trinn og nivå"])
            p = OrderedDict()
            p["id"] = vid
            p["namn"] = namn
            if mm:
                p["lynne_tekst"] = mm.group(2)
            p["familie"] = fid
            p["grunnform"] = None if i == 0 else fam["grunnform"]
            if i == 0:
                fam["grunnform"] = vid
            fam["variantar"].append(vid)
            p["kvar_og_naar"] = OrderedDict([("soner", []), ("epokar", aar_til_epokar(r["Kvar og når"])),
                                             ("kjelde_tekst", r["Kvar og når"])])
            p["trinn"] = trinn
            p["niva"] = niva
            if trinn is None or niva is None:
                p["trinn_tekst"] = r["Trinn og nivå"]
                L.ukl(va, line, "%s: Trinn og nivå «%s» kunne ikkje tolkast heilt" % (namn, r["Trinn og nivå"]))
            p["liv"] = tal(r["Liv"])
            if p["liv"] is None and r["Liv"]:
                p["liv_tekst"] = r["Liv"]
                L.ukl(va, line, "%s: Liv «%s» er ikkje eit tal" % (namn, r["Liv"]))
            p["segl"] = tolk_segl(r.get(seglkol)) if seglkol else None
            if p["segl"] and p["segl"]["slag"] is None and p["segl"]["tal"]:
                L.ukl(va, line, "%s: slaget av segl i «%s» kunne ikkje tolkast" % (namn, r[seglkol]))
            p["sarbar"] = tolk_sarbar(r["Sårbar"])
            p["sarbar_tekst"] = r["Sårbar"]
            if "Driv og Mot" in r:
                dm = r["Driv og Mot"]
                mm = re.match(r"^(.*?),\s*(\d+)$", dm)
                p["driv"] = mm.group(1) if mm else (dm or None)
                p["mot"] = int(mm.group(2)) if mm else None
                if dm and not mm:
                    p["driv_og_mot_tekst"] = dm
            else:
                p["driv"] = None
                p["mot"] = None
            p["monster"] = r["Mønster"]
            p["start"] = r["Start"]
            p["ordboka"] = tolk_ordboka(r["Ordboka"])
            g = gull.get(namn.lower())
            p["gull"] = bool(er_gull or g)
            if g:
                p["knep"] = g[1]["Knepet"]
                p["lon"] = g[1]["Løn"]
            p["aatferd"] = vid if ("Nytt:" in (r["Mønster"] or "") or p["gull"]) else None
            p["regel"] = r["Mønster"] if p["aatferd"] else None
            p["bilete"] = None if i == 0 else OrderedDict([("grunnform", fam["grunnform"]), ("palett", vid)])
            p["kjelde"] = stad(va, line)
            vanlege.append(p)
            fiende_namn_registrer(namn, "vanlege", vid)
    for k, (line, r) in gull.items():
        if not any(v["namn"].lower() == k for v in vanlege):
            L.ukl(va, line, "Gullfienden «%s» står ikkje i nokon familietabell" % r["Fiende"])
    m = re.search(r"(\d+) familiar med (\d+) variantar", "\n".join(va.lines[:12]))
    if m:
        if int(m.group(1)) != len(familiar):
            L.merk("Kontrollsum: 09a seier %s familiar, skriptet fann %d" % (m.group(1), len(familiar)))
        if int(m.group(2)) != len(vanlege):
            L.merk("Kontrollsum: 09a seier %s variantar, skriptet fann %d" % (m.group(2), len(vanlege)))

    # ---- namngjevne fiendar frå bestiaria
    namngjevne = []
    for dnamn, hovud in (("07 Bestiarium dyr", "dyr"), ("08 Bestiarium fabeldyr og folkevesen", "fabeldyr_og_folkevesen"),
                         ("09 Bestiarium menneske", "menneske")):
        doc = K[dnamn]
        ark = OrderedDict()
        for n, tt, l in doc.overskrifter:
            if n == 4:
                tekst = " ".join(x for nr, x in doc.linjer_under(l) if x.strip())
                namn = tt[len("Fiendeark: "):] if tt.startswith("Fiendeark: ") else tt
                ark[namn.lower()] = (l, tekst)
        for t in doc.tabellar_med("Namn", "Stad og epoke", "Trinn", "Segl"):
            for line, r in t:
                full = r["Namn"]
                mm = re.match(r"^(.*?)\s*\((.*)\)$", full)
                namn = mm.group(1) if mm else full
                p = OrderedDict()
                p["id"] = idify(namn)
                p["namn"] = namn
                if mm:
                    p["lynne_tekst"] = mm.group(2)
                p["familie"] = idify(t.seksjon)
                p["familie_namn"] = t.seksjon
                p["hovudfamilie"] = hovud
                p["grunnform"] = None
                p["kvar_og_naar"] = OrderedDict([("soner", []), ("epokar", aar_til_epokar(r["Stad og epoke"])),
                                                 ("kjelde_tekst", r["Stad og epoke"])])
                p["trinn"] = r["Trinn"] if r["Trinn"] in ROMAR else None
                if p["trinn"] is None:
                    p["trinn_tekst"] = r["Trinn"]
                p["niva"] = None
                p["liv"] = None
                p["segl"] = tolk_segl(r["Segl"])
                p["sarbar"] = tolk_sarbar(r["Sårbar for"])
                p["sarbar_tekst"] = r["Sårbar for"]
                p["driv"] = r.get("Driv") or None
                p["mot"] = tal(r.get("Mot")) if r.get("Mot") else None
                p["monster"] = r["Det som skil han ut"]
                p["start"] = None
                p["ordboka"] = tolk_ordboka(r["Ordboka"])
                p["gull"] = "Gullfiende" in (r["Det som skil han ut"] or "")
                a = ark.get(namn.lower()) or ark.get(full.lower())
                if a:
                    p["fiendeark"] = a[1]
                    p["fiendeark_kjelde"] = stad(doc, a[0])
                    ml = re.search(r"(\d[\d ]*\d|\d+) Liv\b", a[1])
                    if ml:
                        p["liv"] = int(ml.group(1).replace(" ", ""))
                        p["liv_kjelde_tekst"] = ml.group(0)
                p["aatferd"] = p["id"]
                p["regel"] = r["Det som skil han ut"]
                p["bilete"] = None
                p["kjelde"] = stad(doc, line)
                namngjevne.append(p)
                fiende_namn_registrer(namn, "namngjevne", p["id"])
    # sluttkampen i Sagahallen
    fb = K["05 Fiendar og bossar"]
    t = fb.tabell("Fiende", "Veg", "Nivå, Liv og ravnar")
    if t:
        for line, r in t:
            mm = re.match(r"^(\d+),\s*([\d ]+) Liv,\s*(.+)$", r["Nivå, Liv og ravnar"])
            p = OrderedDict([("id", idify(r["Fiende"])), ("namn", r["Fiende"]), ("familie", "sagavesen"),
                             ("familie_namn", "Sagavesen i Sagahallen"), ("hovudfamilie", "sagavesen"), ("grunnform", None),
                             ("kvar_og_naar", OrderedDict([("soner", []), ("epokar", ["den_store_opninga"]),
                                                           ("kjelde_tekst", "Sagahallen, " + r["Veg"])])),
                             ("trinn", "IV"), ("niva", int(mm.group(1)) if mm else None),
                             ("liv", int(mm.group(2).replace(" ", "")) if mm else None),
                             ("segl", tolk_segl(mm.group(3)) if mm else None),
                             ("sarbar", tolk_sarbar(r["Sårbar for"])), ("sarbar_tekst", r["Sårbar for"]),
                             ("driv", None), ("mot", None), ("monster", r["Kva han gjer"]), ("start", None),
                             ("ordboka", None), ("gull", False), ("aatferd", idify(r["Fiende"])),
                             ("regel", r["Kva han gjer"]), ("bilete", None), ("kjelde", stad(fb, line))])
            if not mm:
                L.ukl(fb, line, "%s: «%s» kunne ikkje tolkast" % (r["Fiende"], r["Nivå, Liv og ravnar"]))
            namngjevne.append(p)
            fiende_namn_registrer(r["Fiende"], "namngjevne", p["id"])
    # gullfiendar i oversikta
    ov = K["06 Bestiarium oversikt"]
    t = ov.tabell("Fiende", "Fil", "Stad", "Kva som gjer han sjeldan og verdfull")
    if t:
        for line, r in t:
            f = fiende_finn(r["Fiende"])
            if not f:
                L.ukl(ov, line, "Gullfienden «%s» finst ikkje i bestiaria" % r["Fiende"])
                continue
            for p in (namngjevne if f[0] == "namngjevne" else vanlege):
                if p["id"] == f[1]:
                    p["gull"] = True
                    p.setdefault("knep", r["Kva som gjer han sjeldan og verdfull"])
    # start frå oversikta
    t = ov.tabell("Fiende", "Fil", "Stad", "Start")
    if t:
        for line, r in t:
            f = fiende_finn(r["Fiende"])
            if f:
                for p in (namngjevne if f[0] == "namngjevne" else vanlege):
                    if p["id"] == f[1] and not p.get("start"):
                        p["start"] = r["Start"]

    # ---- bossar
    bossar = []
    D["_bossar"] = bossar

    def ny_boss(namn, doc, line, tekst, **kw):
        b = OrderedDict([("id", idify(namn)), ("namn", namn), ("slag", kw.pop("slag", "boss")),
                         ("scene", None), ("oppdrag", None), ("scener", finn_scener(tekst[:200] if tekst else "")),
                         ("tilraadd_niva", None), ("party_tekst", None), ("fasar", []), ("lon", None),
                         ("sfx", None), ("aatferd", idify(namn)), ("regel", tekst or None),
                         ("kjelde", stad(doc, line))])
        for k, v in kw.items():
            b[k] = v
        for s in b["scener"]:
            if s.startswith("S"):
                b["oppdrag"] = b["oppdrag"] or s
            else:
                b["scene"] = b["scene"] or s
        m = re.search(r"[Nn]ivå:? (\d+)(?:\s*til\s*(\d+))?", tekst or "")
        if m and b["tilraadd_niva"] is None:
            b["tilraadd_niva"] = int(m.group(1))
        m = re.search(r"Party: ([^.]+)\.", tekst or "")
        if m:
            b["party_tekst"] = m.group(1)
        if b["lon"] is None:
            b["lon"] = lon_fraa_tekst(tekst)
        bossar.append(b)
        fiende_namn_registrer(namn, "bossar", b["id"])
        return b

    def fasar_fraa_tabell(t, doc):
        ut = []
        for line, r in t:
            f = OrderedDict()
            f["fase"] = tal(r.get("Fase")) if r.get("Fase") else None
            for k in ("Namn", "Andlet", "Fiendar", "Mål", "Parti"):
                if r.get(k):
                    f[idify(k)] = r[k]
            f["liv"] = tal(re.sub(r"\(.*\)", "", r.get("Liv", "")).strip()) if r.get("Liv") else None
            if r.get("Liv") and f["liv"] is None:
                f["liv_tekst"] = r["Liv"]
            f["segl"] = tolk_segl(re.sub(r"\(.*\)", "", r.get("Segl", "")).strip() or None) if r.get("Segl") else None
            if f["segl"] is not None:
                f["segl"]["kjelde_tekst"] = r["Segl"]
            f["sarbar"] = tolk_sarbar(r.get("Sårbar for"))
            f["sarbar_tekst"] = r.get("Sårbar for")
            f["monster"] = r.get("Mønster og teikn")
            f["kjelde"] = stad(doc, line)
            ut.append(f)
        return ut

    def fasar_fraa_tekst(tekst):
        ut = []
        for m in re.finditer(r"Fase (\d+): ([\d ]+) Liv og (\d+) (?:segl|[a-zæøå]+)", tekst or ""):
            ut.append(OrderedDict([("fase", int(m.group(1))), ("liv", int(m.group(2).replace(" ", ""))),
                                   ("segl", OrderedDict([("tal", int(m.group(3))), ("slag", None), ("kjelde_tekst", m.group(0))])),
                                   ("sarbar", []), ("monster", None)]))
        if ut:
            return ut
        m = re.search(r"\b([\d][\d ]*\d|\d+) Liv(?:,| og) (ingen segl|\d+ [a-zæøå]+(?: [a-zæøå]+)?)", tekst or "")
        if m:
            return [OrderedDict([("fase", 1), ("liv", int(m.group(1).replace(" ", ""))),
                                 ("segl", tolk_segl(m.group(2).replace("ingen segl", "Ingen"))),
                                 ("sarbar", []), ("monster", None), ("kjelde_tekst", m.group(0))])]
        m = re.search(r"Liv ([\d][\d ]*\d|\d+)(?:,| og) (ingen segl|\d+ [a-zæøå]+)", tekst or "")
        if m:
            return [OrderedDict([("fase", 1), ("liv", int(m.group(1).replace(" ", ""))),
                                 ("segl", tolk_segl(m.group(2).replace("ingen segl", "Ingen"))),
                                 ("sarbar", []), ("monster", None), ("kjelde_tekst", m.group(0))])]
        return []

    # Del 2 i Fiendar og bossar: #### -bolkane
    i_del2 = False
    hopp_over = ("Mindre kampar", "Stevmålaren", "Døme på ein tur", "Duellane i spelet", "Sideoppdrag i",
                 "Villmarkene ved", "Villmarkene i")
    for n, tt, l in fb.overskrifter:
        if n == 2:
            i_del2 = tt.startswith("Del 2")
        if not i_del2 or n != 4 or tt.startswith(hopp_over):
            continue
        linjer = fb.linjer_under(l)
        tekst = " ".join(x.strip() for nr, x in linjer if x.strip() and not x.startswith("|"))
        b = ny_boss(tt, fb, l, tekst)
        for t in fb.tabellar:
            if linjer and linjer[0][0] <= t.line <= linjer[-1][0] and t.header[0] in ("Fase", "Mål"):
                b["fasar"] = fasar_fraa_tabell(t, fb)
        if not b["fasar"]:
            b["fasar"] = fasar_fraa_tekst(tekst)
        if not b["fasar"]:
            L.ukl(fb, l, "Bossen %s har ingen fasar med Liv og segl som kunne lesast" % tt)
    # sideoppdrag og villmarker: tabellar og avsnitt
    for t in fb.tabellar_med("Boss", "Oppdrag og nivå", "Liv og segl"):
        for line, r in t:
            tekst = " ".join(r[k] for k in t.header if r.get(k))
            b = ny_boss(r["Boss"], fb, line, r["Oppdrag og nivå"] + ". " + r["På skjermen og mønster"],
                        slag="villmark" if t.seksjon.startswith("Villmark") else "sideoppdrag")
            b["fasar"] = fasar_fraa_tekst(r["Liv og segl"]) or []
            if b["fasar"]:
                b["fasar"][0]["sarbar"] = tolk_sarbar(r["Tek segl"])
                b["fasar"][0]["sarbar_tekst"] = r["Tek segl"]
                b["fasar"][0]["monster"] = r["På skjermen og mønster"]
            else:
                b["liv_og_segl_tekst"] = r["Liv og segl"]
                L.ukl(fb, line, "Bossen %s: «%s» kunne ikkje tolkast som Liv og segl" % (r["Boss"], r["Liv og segl"]))
            b["slutt"] = r["Slutt"]
            b["lon"] = r["Løn"]
            mv = re.search(r"\bV(\d+)\b", r["Oppdrag og nivå"])
            if mv:
                b["villmark"] = "V" + mv.group(1)
    for seks in ("Sideoppdrag i reiseåra", "Sideoppdrag i Christiania og fimbulvinteren",
                 "Villmarkene ved første besøk", "Villmarkene i vinterlaget"):
        for nr, l in fb.seksjon_linjer(seks):
            m = re.match(r"^([A-ZÆØÅ][^()]{2,60}?) \(([^)]*)\) har (.*)$", l.strip())
            if m:
                b = ny_boss(m.group(1), fb, nr, l.strip(),
                            slag="villmark" if seks.startswith("Villmark") else "sideoppdrag")
                b["fasar"] = fasar_fraa_tekst(m.group(3))
                if not b["fasar"]:
                    L.ukl(fb, nr, "Bossen %s har ingen Liv og segl som kunne lesast" % m.group(1))
    # mindre kampar
    for t in fb.tabellar_med("Kamp", "Scene, party, nivå"):
        for line, r in t:
            b = ny_boss(r["Kamp"], fb, line, r["Scene, party, nivå"] + ". " + r["Kva som skjer"], slag="mindre_kamp")
            b["lon"] = r["Løn"]
            b["fasar"] = fasar_fraa_tekst(r["Kva som skjer"])
    # superbossar
    sb = K["10 Superbossar"]
    for n, tt, l in sb.overskrifter:
        er_drake = n == 3 and any(o[1].startswith("Dei åtte bundne drakane") for o in sb.overskrifter if o[0] == 2 and o[2] < l
                                   and all(not (o2[0] == 2 and o[2] < o2[2] < l) for o2 in sb.overskrifter))
        er_super = n == 2 and re.search(r"\((S2\.\d+|løynd)", tt)
        if not (er_drake and not tt.startswith("Felles")) and not er_super:
            continue
        namn = re.sub(r"\s*\(.*\)$", "", tt)
        linjer = sb.linjer_under(l)
        tekst = " ".join(x.strip() for nr, x in linjer if x.strip() and not x.startswith("|") and not x.startswith("#"))
        b = ny_boss(namn, sb, l, tekst, slag="superboss")
        mo = re.search(r"\((S2\.\d+)", tt)
        if mo:
            b["oppdrag"] = scene_id(mo.group(1))
        elif er_drake:
            b["oppdrag"] = "S2_29"
        for t in sb.tabellar:
            if linjer and linjer[0][0] <= t.line <= linjer[-1][0] and t.header[0] == "Fase":
                b["fasar"] = fasar_fraa_tabell(t, sb)
                break
        if not b["fasar"]:
            b["fasar"] = fasar_fraa_tekst(tekst)
        if not b["fasar"]:
            L.ukl(sb, l, "Superbossen %s har ingen fasetabell" % namn)
    t = sb.tabell("Superboss", "Stad", "Tilrådd nivå")
    if t:
        for line, r in t:
            bid = boss_finn(r["Superboss"])
            if bid:
                b = next(x for x in bossar if x["id"] == bid)
                m = re.match(r"(\d+)", r["Tilrådd nivå"])
                if m:
                    b["tilraadd_niva"] = int(m.group(1))
                b["tilraadd_niva_tekst"] = r["Tilrådd nivå"]
                b["lon"] = b["lon"] or r["Løn"]
            else:
                L.ukl(sb, line, "Superbossen «%s» i Oversyn har ingen eigen bolk" % r["Superboss"])
    # vanskekurva
    t = fb.tabell("Boss", "Scene", "Epoke", "Nivå", "Introduserer eller testar")
    for line, r in t:
        namn_l = [r["Boss"]]
        if not boss_finn(r["Boss"]):
            namn_l = [x.strip() for x in re.split(r",|\s+og\s+", r["Boss"].split(":")[-1])]
        for nn in namn_l:
            bid = boss_finn(nn)
            if not bid:
                L.ukl(fb, line, "Vanskekurva: «%s» har ingen eigen bolk som boss" % nn)
                continue
            b = next(x for x in bossar if x["id"] == bid)
            m = re.match(r"(\d+)", r["Nivå"])
            nv = int(m.group(1)) if m else None
            if b["tilraadd_niva"] is not None and nv is not None and b["tilraadd_niva"] != nv and len(namn_l) == 1:
                L.mot("Tilrådd nivå for %s er %s i bolken og %s i Vanskekurva" % (b["namn"], b["tilraadd_niva"], nv),
                      b["kjelde"], stad(fb, line))
            if b["tilraadd_niva"] is None:
                b["tilraadd_niva"] = nv
            b["epoke_tekst"] = r["Epoke"]
            b["test_tekst"] = r["Introduserer eller testar"]
    for (namn, a, b_) in D.get("fiende_namn_dobbel", []):
        L.merk("Fiendenamnet «%s» står i både %s (%s) og %s (%s). Tilvisingar på namn går til den første" % (namn, a[0], a[1], b_[0], b_[1]))
    legg("fiendar/familiar.json", familiar)
    legg("fiendar/vanlege.json", vanlege)
    legg("fiendar/namngjevne.json", namngjevne)
    legg("fiendar/bossar.json", bossar)
    D["vanlege"], D["namngjevne"], D["bossar"], D["fiendefamiliar"] = vanlege, namngjevne, bossar, familiar


# ===========================================================================
# 7. Møtesoner
# ===========================================================================

MOTERATE = {"ingen": "ingen", "låg": "laag", "vanleg": "vanleg", "høg": "hog", "svært høg": "svaert_hog"}


def eining_mote(K):
    soner = []
    for kort, namn in (("9b", "09b Møtetabellar barndomen til Christiania"),
                       ("9c", "09c Møtetabellar fimbulvinteren og Sagahallen"),
                       ("9d", "09d Møtetabellar villmarkene")):
        doc = K[namn]
        brukt = set()
        for t in doc.tabellar_med("Gruppe", "Fiendar", "Vekt", "Formasjon"):
            tittel = t.seksjon
            h2 = t.h(2) or ""
            zid = idify("%s %s" % (kort, tittel))
            if zid in brukt:
                n = 2
                while "%s_%d" % (zid, n) in brukt:
                    n += 1
                zid = "%s_%d" % (zid, n)
            brukt.add(zid)
            z = OrderedDict([("id", zid), ("namn", tittel), ("del", h2), ("skjermar", []), ("stader", []),
                             ("epoke", None), ("moterate", None), ("niva", None), ("grupper", [])])
            # epoke: år i overskrifta, så i ##-overskrifta
            ep = aar_til_epokar(tittel) or aar_til_epokar(h2)
            if not ep and kort == "9c":
                ep = ["den_store_opninga"] if h2.startswith("Sagahallen") else ["fimbulvinteren"]
            z["epoke"] = ep[0] if ep else None
            if len(ep) > 1:
                z["epokar"] = ep
            if z["epoke"] is None:
                L.ukl(doc, t.overskrifter[-1][2], "Sona «%s» har ikkje noko årstal i overskrifta, så epoken er ukjend" % tittel)
            # møterate og nivå
            linjer = doc.linjer_under(t.overskrifter[-1][2])
            for nr, l in linjer:
                m = re.match(r"^Møterate: ([^.]+)\. Nivå ([^.]+)\.(.*)$", l.strip())
                if m:
                    z["moterate"] = MOTERATE.get(m.group(1).lower())
                    z["moterate_tekst"] = m.group(1)
                    nm = re.fullmatch(r"(\d+)(?: til (\d+))?", m.group(2).strip())
                    if nm:
                        z["niva"] = OrderedDict([("min", int(nm.group(1))), ("maks", int(nm.group(2) or nm.group(1)))])
                    else:
                        z["niva_tekst"] = m.group(2)
                        L.ukl(doc, nr, "Sona «%s»: nivået «%s» kunne ikkje tolkast" % (tittel, m.group(2)))
                    if m.group(3).strip():
                        z["merknad"] = m.group(3).strip()
                    break
            else:
                L.ukl(doc, t.overskrifter[-1][2], "Sona «%s» har inga line med møterate og nivå" % tittel)
            for nr, l in linjer:
                if l.startswith("Synleg:"):
                    z["synleg_tekst"] = l[len("Synleg:"):].strip()
                elif l.startswith("Etter første kampen:"):
                    z["etter_forste_kampen_tekst"] = l.strip()
            for line, r in t:
                g = OrderedDict()
                m = re.match(r"^(\d+)\s*(?:\((.*)\))?$", r["Gruppe"])
                g["gruppe"] = int(m.group(1)) if m else None
                g["sjeldan"] = {"sjeldan": "sjeldan", "svært sjeldan": "svaert_sjeldan"}.get(m.group(2)) if m and m.group(2) else None
                fl = []
                for d in del_utanfor_parentes(r["Fiendar"], ","):
                    mm = re.match(r"^(\d+)\s*×\s*(.+)$", d.strip())
                    if not mm:
                        L.ukl(doc, line, "Sona «%s», gruppe %s: «%s» kunne ikkje lesast som tal × fiende" % (tittel, r["Gruppe"], d))
                        continue
                    fnamn = mm.group(2).strip()
                    f = fiende_finn(fnamn)
                    post = OrderedDict([("id", f[1] if f else None), ("fil", f[0] if f else None), ("tal", int(mm.group(1)))])
                    if not f:
                        post["namn"] = fnamn
                    else:
                        mp = re.search(r"\(([^)]*)\)$", fnamn)
                        if mp and fiende_finn(re.sub(r"\s*\(.*\)$", "", fnamn)):
                            post["merknad"] = mp.group(1)
                    fl.append(post)
                g["fiendar"] = fl
                g["vekt"] = tal(r["Vekt"])
                g["formasjonar"] = [x.strip() for x in r["Formasjon"].split(",") if x.strip()]
                g["kjelde"] = stad(doc, line)
                z["grupper"].append(g)
            z["kjelde"] = stad(doc, t.overskrifter[-1][2])
            soner.append(z)
    # sone-ID-ar på fiendane
    alle = {}
    for fil in ("vanlege", "namngjevne", "bossar"):
        for p in D.get(fil, []):
            alle[(fil, p["id"])] = p
    for z in soner:
        for g in z["grupper"]:
            for f in g["fiendar"]:
                p = alle.get((f["fil"], f["id"]))
                if p is not None and "kvar_og_naar" in p and z["id"] not in p["kvar_og_naar"]["soner"]:
                    p["kvar_og_naar"]["soner"].append(z["id"])
    # startmåten til dei namngjevne fiendane (tabellane nedst i 9b, 9c og 9d)
    for namn in ("09b Møtetabellar barndomen til Christiania", "09c Møtetabellar fimbulvinteren og Sagahallen",
                 "09d Møtetabellar villmarkene"):
        doc = K[namn]
        t = doc.tabell("Fiende", "Fil", "Start")
        if not t:
            continue
        for line, r in t:
            f = fiende_finn(r["Fiende"])
            if not f:
                L.ukl(doc, line, "Startmåten: fienden «%s» finst ikkje i bestiaria" % r["Fiende"])
                continue
            p = alle.get(f)
            if p is not None:
                if p.get("start") and p["start"] != r["Start"]:
                    p.setdefault("start_andre", [])
                    if r["Start"] not in p["start_andre"]:
                        p["start_andre"].append(r["Start"])
                elif not p.get("start"):
                    p["start"] = r["Start"]
    per = OrderedDict()
    for z in soner:
        per.setdefault(z["epoke"] or "utan_epoke", []).append(z)
    for ep, l in per.items():
        legg("fiendar/mote/%s.json" % ep, l)
    D["soner"] = soner


# ===========================================================================
# 8. Stader, skjermar, rom, kister, butikkar og kvile. Verdskartet og villmarkene
# ===========================================================================

SKJERM_RE = re.compile(r"\b([A-Z]{2,4}-\d+[a-z]?)\b")
STAD_STORLEIK = ["storby", "småby", "bygd og kyrkjestad", "kyrkjestad", "bygd", "gard", "grend",
                 "fjellstue", "skysskifte", "villmark", "samband"]


def tolk_epokar_tekst(t):
    """«1816–1841, 1842–1853» -> epokane som overlappar åra. «Alle» -> alle."""
    if not t:
        return []
    if t.strip().lower().startswith("alle"):
        return [e["id"] for e in D.get("epokar", [])]
    ut = []
    for m in re.finditer(r"\b(1[89]\d\d)(?:\s*[–-]\s*(\d{2,4}))?", t):
        a = int(m.group(1))
        b = m.group(2)
        if b:
            b = int(b) if len(b) == 4 else int(str(a)[:2] + b)
        else:
            b = a
        for e in D.get("epokar", []):
            if e["fraa"] is not None and e["fraa"] <= b and a <= e["til"] and e["id"] not in ut:
                ut.append(e["id"])
    if "opninga" in t.lower() and "den_store_opninga" not in ut:
        ut.append("den_store_opninga")
    return ut


def tider_fraa(t):
    if not t:
        return []
    m = re.search(r"T([1-4])\s+til\s+T([1-4])", t)
    if m:
        return ["T%d" % i for i in range(int(m.group(1)), int(m.group(2)) + 1)]
    return sorted(set("T" + x for x in re.findall(r"\bT([1-4])\b", t)))


def idar_i_tekst(t):
    """Skjerm-ID-ar i ein tekst, med «HJF-01 til HJF-03» utvida."""
    ut = []
    for m in re.finditer(r"([A-Z]{2,4})-(\d+)([a-z]?) til ([A-Z]{2,4})-(\d+)([a-z]?)", t):
        if m.group(1) == m.group(4) and not m.group(3) and not m.group(6):
            w = len(m.group(2))
            for n in range(int(m.group(2)), int(m.group(5)) + 1):
                ut.append("%s-%0*d" % (m.group(1), w, n))
    ut += SKJERM_RE.findall(t)
    return list(dict.fromkeys(ut))


def tolk_utgangar(t):
    """Gjev liste av {til, namn, merknad}. til er skjerm-ID, «verdskartet» eller None (namn som må slåast opp)."""
    if not t:
        return []
    if t.strip().lower().startswith("ingen"):
        return []
    deler = []
    for x in del_utanfor_parentes(t, ";"):
        deler.extend(del_utanfor_parentes(x, ","))
    slatt = []
    for d in deler:
        if slatt and d and d[0].islower() and not SKJERM_RE.match(d) and not d.lower().startswith("verdskartet"):
            slatt[-1] = slatt[-1] + ", " + d
        else:
            slatt.append(d)
    ut = []
    for d in slatt:
        d = d.strip()
        merk = None
        mm = re.match(r"^(.*?)\s*\(([^()]*)\)$", d)
        if mm:
            d, merk = mm.group(1).strip(), mm.group(2)
        m = SKJERM_RE.match(d)
        if m:
            post = OrderedDict([("til", m.group(1)), ("namn", d[len(m.group(1)):].strip() or None)])
        elif d.lower().startswith("verdskartet"):
            post = OrderedDict([("til", "verdskartet"), ("namn", None)])
        else:
            post = OrderedDict([("til", None), ("namn", d)])
        if merk:
            post["merknad"] = merk
            if "snarveg" in merk:
                post["snarveg"] = True
        ut.append(post)
    return ut


def eining_stader(K):
    kart = [rel for rel in K.docs if rel.startswith("07 Kart og rom/") and not rel.endswith("00 Kart og rom.md")]
    oversikt = K["07 Kart og rom/00 Kart og rom"]
    soner_namn = {z["namn"].lower(): z for z in D.get("soner", [])}
    alle_skjermar = OrderedDict()
    filer = OrderedDict()
    for rel in kart:
        doc = K[rel]
        fane = re.sub(r"^\d+ Kart ", "", doc.namn)
        fid = idify(fane)
        stader, skjermar, rom, kister, butikkar = OrderedDict(), [], [], [], []
        h2 = [(t, l) for n, t, l in doc.overskrifter if n == 2]

        def seksjon_for(line):
            for i, (t, l) in enumerate(h2):
                slutt = h2[i + 1][1] if i + 1 < len(h2) else 10 ** 9
                if l <= line < slutt:
                    return t, l, slutt
            return None, None, None

        def intro(l, slutt):
            ut = []
            for nr, x in doc.linjer_under(l):
                if x.startswith(("|", "#")):
                    if ut:
                        break
                    continue
                if x.strip():
                    ut.append(x.strip())
            return " ".join(ut[:1]) if ut else None

        def stad_for(kode, line, dungeon):
            if kode in stader:
                return stader[kode]
            tittel, l, slutt = seksjon_for(line)
            tekst = intro(l, slutt) if l else None
            st = None
            if dungeon:
                st = "dungeon"
            else:
                for s in STAD_STORLEIK:
                    if re.search(r"\b(?:ein|eit|ei) %s\b" % s, (tekst or "").lower()):
                        st = s
                        break
            stader[kode] = OrderedDict([("id", kode), ("namn", tittel), ("fane", fid), ("storleik", st),
                                        ("skildring", tekst), ("kjelde", stad(doc, l) if l else None)])
            return stader[kode]

        for t in doc.tabellar:
            h = t.header
            if h[:2] == ["ID", "Skjerm"] and "Utgangar" in h:
                for line, r in t:
                    sid = r["ID"]
                    m = re.match(r"^([A-Z]{2,4})-", sid)
                    if not m:
                        L.ukl(doc, line, "ID-en «%s» følgjer ikkje forma KODE-nummer" % sid)
                        continue
                    stad_for(m.group(1), line, False)
                    inn = r["Kva som er der"]
                    par = " ".join(re.findall(r"\(([^()]*)\)", inn))
                    s = OrderedDict([("id", sid), ("stad", m.group(1)), ("omraade", t.h(2)), ("namn", r["Skjerm"]),
                                     ("innhald_tekst", inn), ("scener", finn_scener(par)),
                                     ("utgangar", tolk_utgangar(r["Utgangar"])), ("utgangar_tekst", r["Utgangar"]),
                                     ("epokar", tolk_epokar_tekst(r["Epokar"])), ("epokar_tekst", r["Epokar"]),
                                     ("soner", []), ("alias", []), ("kjelde", stad(doc, line))])
                    skjermar.append(s)
                    alle_skjermar[sid] = s
            elif h[:3] == ["ID", "Rom", "Lag"]:
                tittel = t.h(2)
                for line, r in t:
                    sid = r["ID"]
                    m = re.match(r"^([A-Z]{2,4})-", sid)
                    if not m:
                        L.ukl(doc, line, "ID-en «%s» følgjer ikkje forma KODE-nummer" % sid)
                        continue
                    stad_for(m.group(1), line, True)
                    inn = r["Kva som er der"]
                    il = inn.lower()
                    par = " ".join(re.findall(r"\(([^()]*)\)", inn))
                    s = OrderedDict([("id", sid), ("stad", m.group(1)), ("omraade", t.h(2)), ("dungeon", t.h(3) or tittel), ("lag", r["Lag"]),
                                     ("namn", r["Rom"]), ("innhald_tekst", inn), ("scener", finn_scener(par)),
                                     ("utgangar", tolk_utgangar(r["Utgangar"])), ("utgangar_tekst", r["Utgangar"]),
                                     ("epokar", []), ("kvile", bool(re.search(r"kvilestad|kvileplass|kvilerun|kvile og lagring", il))),
                                     ("snarveg", "snarveg" in il or "snarveg" in r["Utgangar"].lower()),
                                     ("boss", "bossrom" in il), ("gaate", bool(re.search(r"\bgåt[ae]", il))),
                                     ("soner", []), ("alias", []), ("kjelde", stad(doc, line))])
                    rom.append(s)
                    alle_skjermar[sid] = s
            elif h[:3] == ["Kiste", "Skjerm", "Behaldar"]:
                for line, r in t:
                    inn_t = r["Innhald"]
                    vk = re.search(r"\bVK\d\d\b", inn_t + " " + r["Merknad"])
                    if inn_t.lower().startswith("sjå vk"):
                        liste, rest = [], None
                    else:
                        liste, rest = tolk_innhald(inn_t)
                        if rest and not liste:
                            L.ukl(doc, line, "Kista %s: innhaldet «%s» kunne ikkje tolkast" % (r["Kiste"], inn_t))
                        elif rest:
                            L.ukl(doc, line, "Kista %s: «%s» i innhaldet kunne ikkje tolkast" % (r["Kiste"], rest))
                    msk = SKJERM_RE.search(r["Skjerm"])
                    k = OrderedDict([("id", r["Kiste"]), ("skjerm", msk.group(1) if msk else r["Skjerm"]), ("behaldar", r["Behaldar"]),
                                     ("innhald", liste), ("kjelde_tekst", inn_t), ("tid", tider_fraa(r["Tid"])),
                                     ("tid_tekst", r["Tid"]), ("ventekiste", vk.group(0) if vk else None),
                                     ("merknad", r["Merknad"] or None), ("kjelde", stad(doc, line))])
                    if r["Skjerm"] != k["skjerm"]:
                        k["skjerm_tekst"] = r["Skjerm"]
                    if not k["tid"]:
                        L.ukl(doc, line, "Kista %s: tida «%s» kunne ikkje tolkast" % (r["Kiste"], r["Tid"]))
                    kister.append(k)
            elif h[:2] == ["Skjerm", "Butikk eller kvile"]:
                for line, r in t:
                    bt = r["Butikk eller kvile"]
                    btl = bt.lower()
                    typ = None
                    for namn, tid_ in D.get("butikktype_namn", {}).items():
                        if btl.startswith(namn):
                            typ = tid_
                            break
                    if typ is None and re.match(r"^(kvile|fristad|inngangsvarden)", btl):
                        typ = "kvile"
                    if typ is None:
                        L.ukl(doc, line, "Skjermen %s: «%s» er verken ein butikktype eller kvile" % (r["Skjerm"], bt))
                    ekstra, anna, detaljar = [], [], []
                    et = r["Ekstra varer og utstyr"]
                    if et and et.lower() not in ("ingen", "-"):
                        for setn in re.split(r"(?<=[a-zæøå0-9)])\.\s+", et.strip().rstrip(".")):
                            sl = setn.lower()
                            if re.match(r"^(kvile|gratis|same|alle varene|varene i typen|utstyrstabellen|billettar|hest|lampa)", sl) or "varene i typen" in sl or "same varer" in sl:
                                continue
                            fraa = None
                            mf = re.search(r"\s+(frå (?:T[1-4]|\d{4}|[A-ZÆØÅ][^,]*|.*?))$", setn)
                            if mf:
                                fraa = mf.group(1)
                                setn = setn[:mf.start()]
                            if re.match(r"^(ingen|mat er)", sl):
                                continue
                            setn = re.sub(r"^(Frå T[1-4]|I \d{4}|Frå \d{4})\s+", "", setn)
                            for d in liste_og(setn):
                                d2 = re.sub(r"\s*\(.*?\)\s*", " ", d).strip().rstrip(".")
                                d2 = re.sub(r"\s+\d+ spd(?: \d+ s)?\b.*$|\s+\d+ s\b.*$", "", d2)
                                d2 = re.sub(r"\s+frå (T[1-4]|\d{4}).*$", "", d2)
                                d2 = re.sub(r"^(òg|og|berre|også)\s+", "", d2)
                                f = ting_finn(d2)
                                if f:
                                    ekstra.append(f[1])
                                    if fraa:
                                        detaljar.append(OrderedDict([("ting", f[1]), ("fraa", fraa)]))
                                elif d2:
                                    anna.append(d2)
                    b = OrderedDict([("skjerm", r["Skjerm"]), ("type", typ), ("type_tekst", bt), ("kven", r["Kven"]),
                                     ("ekstra", ekstra), ("ekstra_tekst", et or None), ("tid", tider_fraa(r["Tid"])),
                                     ("tid_tekst", r["Tid"]), ("kvile", typ in ("kvile", "gjestgiveri") or "kvile" in btl),
                                     ("kjelde", stad(doc, line))])
                    if detaljar:
                        b["ekstra_fraa"] = detaljar
                    if anna:
                        b["ekstra_anna"] = anna
                    m = re.search(r"(\d+) s per figur", bt)
                    if m:
                        b["kvile_pris"] = int(m.group(1))
                    elif "gratis" in btl:
                        b["kvile_pris"] = 0
                    butikkar.append(b)
        filer[fid] = (doc, OrderedDict([("fane", fane), ("stader", list(stader.values())), ("skjermar", skjermar),
                                        ("rom", rom), ("kister", kister), ("butikkar", butikkar)]))

    # kontrollsummar per fane mot oversikta i Kart og rom
    t = oversikt.tabell("Fane", "Dekkjer", "Skjermar")
    for line, r in t:
        fid = idify(r["Fane"])
        if fid not in filer:
            if r["Fane"] != "Til saman":
                L.ukl(oversikt, line, "Fana «%s» i oversikta finst ikkje i eksporten" % r["Fane"])
            continue
        d = filer[fid][1]
        for kol, k in (("Skjermar", "skjermar"), ("Dungeonrom", "rom"), ("Kister", "kister"), ("Butikkar og kvile", "butikkar")):
            if tal(r[kol]) != len(d[k]):
                L.merk("Kontrollsum: fana %s har %s %s etter oversikta i Kart og rom, men tabellane i fana har %d (%s)"
                       % (r["Fane"], r[kol], kol.lower(), len(d[k]), stad(oversikt, line)))
        # tal i innleiinga til fana
    # stader i to faner: alias
    t = oversikt.tabell("Stad", "Fane som eig han", "Same stad i")
    fjerna = set()
    for line, r in t:
        eig = SKJERM_RE.findall(r["Fane som eig han"])
        same = SKJERM_RE.findall(r["Same stad i"])
        if len(eig) == 1 and len(same) == 1 and eig[0] in alle_skjermar and same[0] in alle_skjermar:
            a, b = alle_skjermar[eig[0]], alle_skjermar[same[0]]
            a["alias"].append(b["id"])
            a["alias_namn"] = b["namn"]
            a["alias_innhald_tekst"] = b["innhald_tekst"]
            for u in b["utgangar"]:
                if u not in a["utgangar"] and u.get("til") != a["id"]:
                    a["utgangar"].append(u)
            for s in b["scener"]:
                if s not in a["scener"]:
                    a["scener"].append(s)
            fjerna.add(b["id"])
            D.setdefault("alias", {})[b["id"]] = a["id"]
        else:
            L.ukl(oversikt, line, "Staden «%s» står i to faner. ID-ane «%s» og «%s» er ikkje to einskilde skjermar. Difor har skriptet ikkje slått dei saman"
                  % (r["Stad"], r["Fane som eig han"], r["Same stad i"]))
    for fid, (doc, d) in filer.items():
        for k in ("skjermar", "rom"):
            n0 = len(d[k])
            d[k] = [s for s in d[k] if s["id"] not in fjerna]
            if len(d[k]) != n0:
                L.merk("Kontrollsum: %d %s i fana %s er slegne saman med skjermen i fana som eig staden (tabellen Stader som står i to faner), og står som alias der"
                       % (n0 - len(d[k]), k, d["fane"]))
    # utgangar som står med namn: slå opp
    namn_idx = {}
    for s in alle_skjermar.values():
        if s["id"] in fjerna:
            continue
        namn_idx.setdefault(s["namn"].lower(), []).append(s["id"])
    def slaa_opp(namn):
        nl = namn.strip().lower()
        kand = namn_idx.get(nl, [])
        if len(kand) == 1:
            return kand
        m = re.match(r"^(.*?)(?:,|:)\s*(.+)$", namn.strip())
        region, rest = (m.group(1), m.group(2)) if m else (namn.strip(), None)
        rl = region.lower()
        mv = re.match(r"^villmark (v\d+)", rl)
        sek = []
        for s2 in alle_skjermar.values():
            if s2["id"] in fjerna:
                continue
            om = (s2.get("omraade") or "").lower()
            if mv:
                if om.startswith(mv.group(1) + " "):
                    sek.append(s2)
            elif om == rl or om.startswith(rl + " ") or om.startswith(rl + ","):
                sek.append(s2)
        if not sek or not rest:
            return [x["id"] for x in sek] if len(sek) == 1 else []
        r_ = rest.lower()
        for test in (lambda x: x["namn"].lower() == r_, lambda x: r_ in x["namn"].lower(),
                     lambda x: r_ in x["innhald_tekst"].lower()):
            c = [x["id"] for x in sek if test(x)]
            if c:
                return c
        return []

    for s in alle_skjermar.values():
        for u in s["utgangar"]:
            if u["til"] in D.get("alias", {}):
                u["alias_for"] = u["til"]
                u["til"] = D["alias"][u["til"]]
            if u["til"] is None:
                kand = slaa_opp(u["namn"])
                if len(kand) == 1:
                    u["til"] = kand[0]
                    u["slatt_opp"] = True
                else:
                    u["fleire_treff"] = kand if kand else None
    # møtesoner: «sona» i kartfanene og tabellen over soner i Christiania
    for fid, (doc, d) in filer.items():
        idx = {s["id"]: s for s in d["skjermar"] + d["rom"]}
        h2 = [(tt, l) for n, tt, l in doc.overskrifter if n == 2]
        for i, (tt, l) in enumerate(h2):
            slutt = h2[i + 1][1] if i + 1 < len(h2) else len(doc.lines) + 1
            seks_skjermar = [s["id"] for s in d["skjermar"] + d["rom"] if l <= int(s["kjelde"].rsplit(":", 1)[1]) < slutt]
            for nr in range(l, slutt - 1):
                line = doc.lines[nr]
                forrige = 0
                for mq in re.finditer(r"«([^»]+)»", line):
                    q = mq.group(1)
                    z = soner_namn.get(q.lower())
                    if not z:
                        # forkorta sonenamn: quote er starten på eitt sonenamn (i fana som står etter)
                        mf = re.match(r"\s*i fana (9[bcd])", line[mq.end():])
                        kand = [zz for zn, zz in soner_namn.items() if zn.startswith(q.lower() + ",") or zn.startswith(q.lower() + " (")
                                or zn.startswith(q.lower() + ":")]
                        if mf:
                            kand = [zz for zz in kand if zz["id"].startswith(mf.group(1))]
                        if len(kand) != 1:
                            continue
                        z = kand[0]
                    if line.startswith("|"):
                        ids = [x for x in SKJERM_RE.findall(line.split("|")[1]) if x in idx]
                        if not ids:
                            ids = seks_skjermar
                    else:
                        ids = [x for x in idar_i_tekst(line[forrige:mq.start()]) if x in seks_skjermar]
                        if not ids:
                            ids = seks_skjermar
                    forrige = mq.end()
                    for sid in ids:
                        if sid not in z["skjermar"]:
                            z["skjermar"].append(sid)
                        if z["id"] not in idx[sid]["soner"]:
                            idx[sid]["soner"].append(z["id"])
        # tabellen Skjerm | 1845 | ... i Christiania
        for t in doc.tabellar:
            if t.header and t.header[0] == "Skjerm" and len(t.header) > 2 and re.match(r"\d{4}", t.header[1]):
                for line, r in t:
                    sk = r["Skjerm"]
                    ids = []
                    for m in re.finditer(r"([A-Z]{2,4})-(\d+)[a-z]? til ([A-Z]{2,4})-(\d+)", sk):
                        for n in range(int(m.group(2)), int(m.group(4)) + 1):
                            ids.append("%s-%02d" % (m.group(1), n))
                    ids += SKJERM_RE.findall(sk)
                    ids = [x for x in dict.fromkeys(ids) if x in idx]
                    for kol in t.header[1:]:
                        celle = r[kol].lower()
                        for zn, z in soner_namn.items():
                            if zn in celle:
                                for sid in ids:
                                    if sid not in z["skjermar"]:
                                        z["skjermar"].append(sid)
                                    if z["id"] not in idx[sid]["soner"]:
                                        idx[sid]["soner"].append(z["id"])
    # namn på sona lik namnet på ein stad (##) eller ein skjerm
    for z in D.get("soner", []):
        if z["skjermar"]:
            continue
        zn = re.sub(r"\s*\(.*\)$", "", z["namn"]).lower()
        for fid, (doc, d) in filer.items():
            for stx in d["stader"]:
                if stx["namn"] and stx["namn"].lower() == zn:
                    for s in d["skjermar"] + d["rom"]:
                        if s["stad"] == stx["id"]:
                            z["skjermar"].append(s["id"])
                            s["soner"].append(z["id"])
            for s in d["skjermar"] + d["rom"]:
                if s["namn"].lower() == zn and s["id"] not in z["skjermar"]:
                    z["skjermar"].append(s["id"])
                    s["soner"].append(z["id"])
    for z in D.get("soner", []):
        z["stader"] = list(dict.fromkeys(alle_skjermar[x]["stad"] for x in z["skjermar"] if x in alle_skjermar))
    for fid, (doc, d) in filer.items():
        legg("verda/stader/%s.json" % fid, d)
    D["skjermar"] = alle_skjermar
    D["kartfiler"] = filer

    # ---- verdskartet
    ak = K["05 Kart Austlandet, innlandet og verdskartet"]
    vk_ = OrderedDict([("epokar", []), ("knutepunkt", []), ("reiser", [])])
    t = ak.tabell("Epoke", "Kartet", "Kva som er ope")
    for line, r in t:
        vk_["epokar"].append(OrderedDict([("epoke_tekst", r["Epoke"]), ("epokar", tolk_epokar_tekst(r["Epoke"])),
                                          ("kartet", r["Kartet"]), ("ope", r["Kva som er ope"]), ("kjelde", stad(ak, line))]))
    t = ak.tabell("ID", "Knutepunkt", "Reisemåte dit")
    for line, r in t:
        vidare = tolk_utgangar(r["Går vidare til"])
        for u in vidare:
            mv = re.match(r"^Villmark (V\d+)", u.get("namn") or "")
            if u["til"] is None and mv:
                u["villmark"] = mv.group(1)
        vk_["knutepunkt"].append(OrderedDict([("id", r["ID"]), ("namn", r["Knutepunkt"]), ("reisemaate", r["Reisemåte dit"]),
                                              ("vidare", vidare), ("vidare_tekst", r["Går vidare til"]),
                                              ("ope_tekst", r["Ope og stengt"]), ("scener", finn_scener(r["Ope og stengt"])),
                                              ("kjelde", stad(ak, line))]))
    m = re.search(r"(\d+) knutepunkt", " ".join(ak.lines[:4]))
    if m and int(m.group(1)) != len(vk_["knutepunkt"]):
        L.mot("Fana Austlandet seier %s knutepunkt, men tabellen har %d" % (m.group(1), len(vk_["knutepunkt"])), stad(ak, 3))
    vr = K["12 Verda og reisene"]
    for tt in vr.tabellar:
        vk_["reiser"].append(OrderedDict([("tabell", tt.seksjon), ("kjelde", stad(vr, tt.line)),
                                          ("rader", tabell_postar(tt, vr, False))]))
    legg("verda/verdskart.json", vk_)

    # ---- villmarkene
    vm = K["06 Villmarkene"]
    villmarker = []
    t = vm.tabell("Nr", "Villmark", "Naturtype")
    for line, r in t:
        v = OrderedDict([("id", r["Nr"]), ("namn", r["Villmark"]), ("naturtype", r["Naturtype"]), ("region", r["Region"]),
                         ("forste_besok", r["Første besøk"]), ("vinterlag", r["Vinterlag"]), ("veg", r["Veg"]),
                         ("niva_tekst", r["Nivå"]), ("dungeon_og_boss", r["Dungeon og boss"]),
                         ("lag", []), ("stadord", []), ("stadord_tekst", None), ("stadminne_tekst", None),
                         ("skjermar", []), ("kjelde", stad(vm, line))])
        villmarker.append(v)
    idx = {v["id"]: v for v in villmarker}
    for n, tt, l in vm.overskrifter:
        m = re.match(r"^(V\d+) ", tt)
        if n != 2 or not m or m.group(1) not in idx:
            continue
        v = idx[m.group(1)]
        linjer = vm.linjer_under(l)
        tabs = [x for x in vm.tabellar if linjer and linjer[0][0] <= x.line <= linjer[-1][0] and x.header[0] == "Etappe"]
        for i, tb in enumerate(tabs):
            lag = OrderedDict([("id", "forste_besok" if i == 0 else "vinterlag"), ("etappar", [])])
            for line, r in tb:
                lag["etappar"].append(OrderedDict([("nr", tal(r["Etappe"])), ("stad", r["Stad"]), ("maal", r["Mål"]),
                                                   ("grep", r.get("Grep og feltevne") or r.get("Grep")),
                                                   ("opnar", r["Opnar"]), ("kjelde", stad(vm, line))]))
            v["lag"].append(lag)
        for nr, x in linjer:
            if x.startswith("Stadord:"):
                v["stadord_tekst"] = x.strip()
                for mm in re.finditer(r"([^,:()]+?) \((\d+\.\d+)\)", x[len("Stadord:"):]):
                    oid = D.get("ord_nr", {}).get(mm.group(2))
                    v["stadord"].append(OrderedDict([("ord", oid), ("form", mm.group(1).replace("I vinterlaget", "").strip(" .:og")),
                                                     ("nr", mm.group(2))]))
                    if oid is None:
                        L.ukl(vm, nr, "%s: stadordet %s (%s) finst ikkje i ordlista" % (v["id"], mm.group(1), mm.group(2)))
                    else:
                        o = next(p for p in D["oppslag"] if p["id"] == oid)
                        if o["oppslag"].lower() not in mm.group(1).lower() and mm.group(1).strip().lower() not in \
                                [((f["form"] or "").lower()) for f in o["former"]]:
                            L.mot("%s: stadordet «%s» har nummeret %s, men %s er «%s» i ordlista"
                                  % (v["id"], mm.group(1).strip(), mm.group(2), mm.group(2), o["oppslag"]), stad(vm, nr), o["kjelde"])
            if x.startswith("Stilleprøva:"):
                v["stadminne_tekst"] = x[len("Stilleprøva:"):].strip()
    legg("verda/villmarker.json", villmarker)


# ===========================================================================
# 9. Lydeffektar
# ===========================================================================

def eining_lyd(K):
    doc = K["03 Lydeffektar"]
    sfx = []
    for t in doc.tabellar:
        if not t.header or t.header[0] != "ID":
            continue
        for line, r in t:
            p = OrderedDict([("id", r["ID"]), ("gruppe", t.seksjon)])
            for k in t.header[1:]:
                if k == "Fase":
                    p["fase"] = tal(r[k])
                else:
                    p[idify(k)] = r[k] or None
            m = re.match(r"^Same som (sfx\.[a-z.]+)", r.get("Lyd", "") or "")
            if m:
                p["same_som"] = m.group(1)
            p["kjelde"] = stad(doc, line)
            sfx.append(p)
    legg("lyd/sfx.json", sfx)
    D["sfx"] = sfx


# ===========================================================================
# 10. Scener og sideoppdrag, flagg og Dagboka
# ===========================================================================

TID_ORD = r"(januar|februar|mars|april|mai|juni|juli|august|september|oktober|november|desember|vår|våren|sommar|sommaren|haust|hausten|vinter|vinteren|jul|jula|julekvelden|kveld|kvelden|natt|natta|morgon|morgonen|morgongry|seinhaustes|dag|dagen|midnatt|skumring|same|klokka|seinare|neste|dagen etter|om|etter|før|\d{4})"
TALAR_RE = re.compile(r"(?:(?<=^)|(?<=\s))([A-ZÆØÅ][A-ZÆØÅ\-]+(?: [A-ZÆØÅ][A-ZÆØÅ\-]+){0,3}):\s")
DELFILER = [("1", "01 Prolog og første akt"), ("2", "02 Reiseårene, første del"), ("3", "03 Reiseårene, andre del"),
            ("4", "04 Christiania"), ("5", "05 Fimbulvinteren, første del"), ("6", "06 Fimbulvinteren, andre del"),
            ("7", "07 Sluttkampen og epilogen")]


def del_stad_tid(t):
    if not t:
        return None, None
    hovud = re.split(r"(?<=[a-zæøå0-9])\. ", t, maxsplit=1)[0]
    deler = [x.strip() for x in hovud.split(",")]
    for i, d in enumerate(deler):
        if i > 0 and re.match(r"^" + TID_ORD + r"\b", d.lower()) or (i > 0 and re.search(r"\b1[89]\d\d\b", d)):
            return ", ".join(deler[:i]) or None, ", ".join(deler[i:])
    if len(deler) == 1 and re.search(r"\b1[89]\d\d\b", deler[0]) and re.match(r"^" + TID_ORD, deler[0].lower()):
        return None, deler[0]
    return hovud, None


def talar_namn(label, med_tekst):
    m = re.search(re.escape(label), med_tekst or "", re.I)
    if m:
        return m.group(0)[0].upper() + m.group(0)[1:]
    ord_ = label.lower().split(" ")
    ut = ["-".join(p.capitalize() for p in ord_[0].split("-"))] + ord_[1:]
    return " ".join(ut)


def figur_fraa_namn(namn, aar):
    n = re.sub(r"\s*\(.*?\)", "", namn).strip().lower()
    n = re.sub(r"^(unge|vesle) ", "", n) if n.startswith(("unge ivar",)) is False else n
    if n in ("ivar", "ivar aasen", "aasen"):
        return "unge_ivar" if (aar is not None and aar <= 1831) else "aasen"
    if n == "unge ivar":
        return "unge_ivar"
    return FIGUR_NAMN.get(n)


def lag_steg(linjer, med_tekst, sid, spel):
    steg = []
    bossnamn = [(b["namn"].lower(), b["id"]) for b in D.get("bossar", [])]
    bossnamn += [(b["id"].replace("_", " "), b["id"]) for b in D.get("bossar", [])]

    def kamp_steg(tekst):
        if re.search(r"\b[Kk]amp\b|[Bb]osskamp|kampen byrjar|[Kk]amp mot|[Hh]istoriekamp", tekst):
            tl = (tekst + " " + (spel or "")).lower()
            for n, bid in sorted(bossnamn, key=lambda x: -len(x[0])):
                if len(n) > 3 and n in tl:
                    return OrderedDict([("kamp", bid)])
        return None

    for nr, l in linjer:
        s = l.strip()
        if not s:
            continue
        if s.startswith(">"):
            steg.append(OrderedDict([("regi", s.lstrip("> ").strip()), ("sitat", True)]))
            continue
        treff = list(TALAR_RE.finditer(s))
        if s.startswith("(") and (not treff or treff[0].start() > s.find(")")):
            # regi i parentes, kanskje med replikkar etter
            djup, slutt = 0, None
            if re.match(r"^\(Val\b", s):
                slutt = s.rfind(")")
            else:
                for i, c in enumerate(s):
                    djup += (c == "(") - (c == ")")
                    if djup == 0:
                        slutt = i
                        break
            regi = s[1:slutt].strip() if slutt else s.strip("()")
            st = OrderedDict([("regi", regi)])
            if regi.startswith("Val"):
                st["val"] = True
            steg.append(st)
            k = kamp_steg(regi)
            if k:
                steg.append(k)
            s = s[slutt + 1:].strip() if slutt is not None else ""
            treff = list(TALAR_RE.finditer(s))
            if not s:
                continue
        if not treff:
            steg.append(OrderedDict([("regi", s), ("utan_parentes", True)]))
            continue
        if treff[0].start() > 0:
            steg.append(OrderedDict([("regi", s[:treff[0].start()].strip()), ("utan_parentes", True)]))
        for i, m in enumerate(treff):
            slutt = treff[i + 1].start() if i + 1 < len(treff) else len(s)
            tekst = s[m.end():slutt].strip()
            st = OrderedDict([("s", talar_namn(m.group(1), med_tekst))])
            mm = re.match(r"^\(([^()]*)\)\s*(.*)$", tekst)
            if mm:
                st["t"] = mm.group(2)
                st["regi"] = mm.group(1)
            else:
                st["t"] = tekst
            steg.append(st)
    return steg


ORD_STOPP = {"med", "dei", "det", "den", "som", "i", "og", "frå", "til", "på", "ein", "eit", "ei", "inn",
             "ny", "nye", "fleire", "former", "forma", "eventuelt", "òg", "same"}


def utan_parentesar(t):
    ut, djup = "", 0
    for c in t:
        if c == "(":
            djup += 1
        elif c == ")":
            djup = max(0, djup - 1)
        elif djup == 0:
            ut += c
    return ut


def setning_fraa(tekst, start):
    """Teksten frå start til slutten av setninga (punktum utanfor parentes og hermeteikn)."""
    djup, sitat = 0, 0
    for i in range(start, len(tekst)):
        c = tekst[i]
        djup += (c == "(") - (c == ")")
        sitat += (c == "«") - (c == "»")
        if c == "." and djup <= 0 and sitat <= 0 and (i + 1 == len(tekst) or tekst[i + 1] == " "):
            return tekst[start:i]
    return tekst[start:]


def ord_liste_fraa(seg):
    """«kvar og kven (spørjeord), kven frå «Kven er du?», og fjøs (j-ord) frå «I fjøset»» -> [kvar, kven, kven, fjøs]"""
    seg = utan_parentesar(seg)
    seg = re.sub(r"\s+frå\s+«[^»]*»", "", seg)
    ut = []
    for d in del_utanfor_parentes(seg, ","):
        for x in re.split(r"\s+og\s+", d):
            x = re.sub(r"^(og|eventuelt|òg)\s+", "", x.strip())
            x = x.replace("«", "").replace("»", "").strip(" .:;")
            if not x:
                continue
            ord_ = x.split()
            if ord_[0].lower() in ORD_STOPP:
                continue
            ut.append(ord_[0].strip(",.:;"))
            if len(ord_) > 3:
                return ut  # resten av setninga er prosa
    return ut


def finn_ord_i_tekst(tekst):
    ut, ukjende = [], []
    tekst = tekst or ""
    kandidatar = []
    # «Ord: ...», «Ord lært: ...», «Ordboka: ...»
    for m in re.finditer(r"(?:^|(?<=\. ))(?:Ord lært|Ord|Ordboka):\s*", tekst):
        kandidatar += ord_liste_fraa(setning_fraa(tekst, m.end()))
    # «Orda draum, gata og bok kjem ...»
    for m in re.finditer(r"\bOrda ((?:[a-zæøåA-ZÆØÅ/'-]+(?:,\s*|\s+og\s+))*[a-zæøåA-ZÆØÅ/'-]+)\s+(?:kjem|blir|står|er|får)\b", tekst):
        kandidatar += ord_liste_fraa(m.group(1))
    # «Ordet heim», «ordet kveda», «Nøkkelordet løyndom opnar seg»
    for m in re.finditer(r"\b(?:[Oo]rdet|[Nn]økkelordet) «?([a-zæøåA-ZÆØÅ/'-]+)»?(\s+opnar seg)?", tekst):
        if m.group(0).lower().startswith("nøkkelordet") and not m.group(2):
            continue
        kandidatar.append(m.group(1))
    for q in re.findall(r"«([^»]+)»", tekst):
        if " " not in q.strip() and len(q) <= 25:
            kandidatar.append(q.strip())
    sett = set()
    for q in kandidatar:
        for k in [q] + (q.split("/") if "/" in q else []):
            k = k.strip().lower().strip(".,:;")
            if not k or k in sett:
                continue
            sett.add(k)
            oid = ord_indeks().get(k)
            if oid:
                if oid not in ut:
                    ut.append(oid)
                break
        else:
            k = q.strip().lower().strip(".,:;")
            if k in D.get("ting_namn", {}) or any(e["namn"].lower() == k for e in D.get("evner", {}).values()) \
                    or any(st["namn"].lower() == k for st in D.get("statusar", [])) or k in ORD_STOPP:
                continue
            if q not in ukjende and not any(ord_indeks().get(x.strip().lower()) for x in q.split("/")):
                ukjende.append(q)
    return ut, ukjende


def _gammal_finn_ord_i_tekst(tekst):
    ut, ukjende = [], []
    for q in re.findall(r"«([^»]+)»", tekst or ""):
        k = q.strip().lower()
        if " " in k or len(k) > 25:
            continue
        oid = ord_indeks().get(k)
        if oid:
            if oid not in ut:
                ut.append(oid)
        elif k in D.get("ting_namn", {}) or any(e["namn"].lower() == k for e in D.get("evner", {}).values()) \
                or any(st["namn"].lower() == k for st in D.get("statusar", [])):
            continue
        else:
            ukjende.append(q)
    return ut, ukjende


def finn_ting_i_tekst(tekst):
    """Ting som utfallet gjev: namnet må stå etter eit ord som «Gjenstand», «får» eller «gjev» i same setning."""
    ut = []
    if not tekst:
        return ut
    tl = ""
    for setn in re.split(r"(?<=[.!?])\s+", tekst):
        m = re.search(r"gjenstand|får|gjev|gir|løn|ting:|i veska|tek med", setn.lower())
        if m:
            tl += " " + setn.lower()[m.start():]
    for namn, (fil, id_) in D.get("ting_namn", {}).items():
        if len(namn) < 5:
            continue
        if re.search(r"(?<![a-zæøå])" + re.escape(namn) + r"(?![a-zæøå])", tl):
            post = next((x for x in D.get(fil, []) if x["id"] == id_), None)
            if post is None:
                continue
            if fil == "ting" and post.get("slag") in ("mat", "laekjing", "vern", "gaave", "sal"):
                continue
            if id_ not in ut:
                ut.append(id_)
    return ut


VAL_RE = re.compile(r"(?:val ([A-D])(?: og [A-D])?(?:,)? (?:i|frå|etter) (" + SCENE_RE + r"))|(?:(" + SCENE_RE + r")(?:,| med)? val ([A-D]))|(?:valde ([A-D]) i (" + SCENE_RE + r"))")


def finn_val_tilvisingar(tekst):
    ut = []
    for m in VAL_RE.finditer(tekst or ""):
        nr = m.group(2) or m.group(3) or m.group(6)
        bokstav = m.group(1) or m.group(4) or m.group(5)
        sid = scene_id(nr)
        if sid:
            ut.append((sid, bokstav))
    return ut


def eining_manus(K):
    scener_per_del = OrderedDict()
    alle = OrderedDict()
    dagbok = []
    spor = []
    flagg = OrderedDict()

    def ny_flagg(fid, **kw):
        if fid not in flagg:
            flagg[fid] = OrderedDict([("id", fid), ("standard", None), ("verdiar", []), ("set_av", []), ("lese_av", []),
                                      ("skildring", None)])
        f = flagg[fid]
        for k, v in kw.items():
            if isinstance(v, list):
                for x in v:
                    if x not in f[k]:
                        f[k].append(x)
            elif v is not None:
                f[k] = v
        return f

    def les_scene(doc, del_, sid, namn, l_start, linjer, ramme=None):
        hode = OrderedDict()
        kropp = []
        slutt_felt = OrderedDict()
        i = 0
        # hovudlinene
        while i < len(linjer):
            nr, x = linjer[i]
            xs = x.strip()
            if not xs:
                i += 1
                if hode and (i < len(linjer) and not re.match(r"^(Med|Spel):", linjer[i][1].strip())):
                    if any(k in hode for k in ("stad og tid", "stad", "region og tid")):
                        break
                continue
            m = re.match(r"^(Stad og tid|Stad|Region og tid):\s*(.*)$", xs)
            if m or re.match(r"^(Med|Spel|Blir utløyst|Gang gjennom):", xs):
                deler = re.split(r"\s(?=(?:Med|Spel|Blir utløyst|Gang gjennom|Stad og tid|Region og tid):\s)", xs)
                for d in deler:
                    mm = re.match(r"^(Stad og tid|Stad|Region og tid|Med|Spel|Blir utløyst|Gang gjennom):\s*(.*)$", d)
                    if mm:
                        hode[mm.group(1).lower()] = (mm.group(2).rstrip("\\").strip(), nr)
                i += 1
                continue
            break
        for nr, x in linjer[i:]:
            xs = x.strip()
            m = re.match(r"^(Utfall og løn|Utfall|Løn|Overgang|Lukking|Opning):\s*(.*)$", xs)
            if m:
                slutt_felt.setdefault(m.group(1).lower(), []).append((m.group(2), nr))
                continue
            if xs in ("---",):
                continue
            kropp.append((nr, x))
        st_t = (hode.get("stad og tid") or hode.get("stad") or hode.get("region og tid") or (None, None))
        stad_t, tid_t = del_stad_tid(st_t[0])
        aar_m = re.search(r"\b(1[89]\d\d)\b", st_t[0] or "")
        aar = int(aar_m.group(1)) if aar_m else None
        med_t = hode.get("med", (None, None))[0]
        med, andre = [], []
        if med_t:
            for d in del_utanfor_parentes(med_t, ","):
                for x in re.split(r"\s+og\s+", d):
                    x = x.strip()
                    if not x:
                        continue
                    f = figur_fraa_namn(x, aar)
                    if f:
                        if f not in med:
                            med.append(f)
                    else:
                        andre.append(x)
        spel = hode.get("spel", (None, None))[0]
        steg = lag_steg(kropp, med_t, sid, spel)
        utfall = " ".join(t for t, n in slutt_felt.get("utfall", []) + slutt_felt.get("utfall og løn", []) + slutt_felt.get("løn", []))
        overgang = " ".join(t for t, n in slutt_felt.get("overgang", []))
        ord_, ukjende = finn_ord_i_tekst(utfall)
        sc = OrderedDict([("id", sid), ("namn", namn), ("del", del_), ("stad_tekst", stad_t), ("tid_tekst", tid_t),
                          ("stad_og_tid_tekst", st_t[0]), ("skjerm", None), ("aar", aar), ("med", med),
                          ("med_andre", andre), ("med_tekst", med_t), ("spel", spel), ("steg", steg),
                          ("utfall_tekst", utfall or None), ("ord", ord_), ("ting", finn_ting_i_tekst(utfall)),
                          ("flagg_set", []), ("flagg_les", []), ("overgang_tekst", overgang or None), ("neste", None)])
        if ukjende:
            sc["ord_ukjende"] = ukjende
        if slutt_felt.get("lukking"):
            sc["lukking_tekst"] = " ".join(t for t, n in slutt_felt["lukking"])
        if slutt_felt.get("opning"):
            sc["opning_tekst"] = " ".join(t for t, n in slutt_felt["opning"])
        if ramme:
            sc["oppdrag"] = ramme
        sc["kjelde"] = stad(doc, l_start)
        if st_t[0] is None:
            L.ukl(doc, l_start, "Scena %s har inga line «Stad og tid»" % sid)
        # val og flagg
        if any(s.get("val") for s in steg):
            fid = sid + "_val"
            bokstavar = []
            for s in steg:
                if s.get("val"):
                    bokstavar += re.findall(r"(?:^|\s|:)\s*([A-D])\)", s["regi"])
            ny_flagg(fid, set_av=[sid], verdiar=sorted(set(bokstavar)), skildring="Valet i %s %s" % (sid, namn))
            sc["flagg_set"].append(fid)
        tekst_alt = " ".join(x for n, x in linjer)
        for ref, bokstav in finn_val_tilvisingar(tekst_alt):
            if ref != sid:
                fid = ref + "_val"
                ny_flagg(fid, lese_av=[sid])
                if fid not in sc["flagg_les"]:
                    sc["flagg_les"].append(fid)
        m = re.search(r"\(Løynt flagg: ([^)]*)\)", tekst_alt)
        if m:
            fid = sid + "_loynt"
            ny_flagg(fid, set_av=[sid], skildring=m.group(1))
            sc["flagg_set"].append(fid)
        # neste
        mm = re.search(r"(?:Scene )?(" + SCENE_RE + r") startar", overgang or "")
        if mm and scene_id(mm.group(1)) != sid:
            sc["neste"] = scene_id(mm.group(1))
        elif re.search(r"Neste scene startar|Neste scene byrjar", overgang or ""):
            sc["neste"] = "_neste_i_fila"
        return sc

    for del_, namn in DELFILER:
        doc = K["04 Manus/" + namn]
        liste = []
        overskr = doc.overskrifter
        aktiv_spor = None
        for idx, (n, tt, l) in enumerate(overskr):
            if n == 2:
                m = re.match(r"^Spor ([A-H]): (.*)$", tt)
                if m:
                    aktiv_spor = OrderedDict([("id", "spor_" + m.group(1).lower()), ("namn", m.group(2)),
                                              ("epoke", "christiania_aara"), ("tilraadd_niva", None),
                                              ("opnar_seg", None), ("scener", []), ("kjelde", stad(doc, l))])
                    spor.append(aktiv_spor)
                else:
                    aktiv_spor = None
            m = re.match(r"^Scene (\d+\.\d+[a-z]?): (.*)$", tt)
            if n == 3 and m:
                sid = scene_id(m.group(1))
                sc = les_scene(doc, del_, sid, m.group(2), l, doc.linjer_under(l))
                if sid in alle:
                    L.ukl(doc, l, "Scena %s står to gonger" % sid)
                alle[sid] = sc
                liste.append(sc)
                if aktiv_spor is not None:
                    aktiv_spor["scener"].append(sid)
            m = re.match(r"^Dagboka: (.*)$", tt)
            if n == 3 and m:
                tittel = m.group(1)
                tekst = " ".join(x.lstrip("> ").strip() for nr, x in doc.linjer_under(l) if x.startswith(">"))
                deler = [x.strip() for x in tittel.split(",")]
                if len(deler) > 1:
                    stad_, dato = deler[0], ", ".join(deler[1:])
                elif re.search(r"\b1[89]\d\d\b", tittel):
                    stad_, dato = None, tittel
                else:
                    stad_, dato = tittel, None
                did = "dagbok_" + idify(tittel)
                n2 = 2
                while any(d["id"] == did for d in dagbok):
                    did = "dagbok_%s_%d" % (idify(tittel), n2)
                    n2 += 1
                dagbok.append(OrderedDict([("id", did), ("tittel", tittel), ("dato", dato), ("stad", stad_),
                                           ("tekst", tekst or None), ("etter_scene", liste[-1]["id"] if liste else None),
                                           ("del", del_), ("kjelde", stad(doc, l))]))
                if not tekst:
                    L.ukl(doc, l, "Dagbokssida «%s» har ingen tekst i sitatform (>)" % tittel)
        # neste i fila
        for i, sc in enumerate(liste):
            if sc["neste"] == "_neste_i_fila":
                sc["neste"] = liste[i + 1]["id"] if i + 1 < len(liste) else None
        scener_per_del.setdefault("del%s" % del_, []).extend(liste)
        # spor: korleis dei opnar seg
        for nr, x in enumerate(doc.lines):
            for m in re.finditer(r"Spor ([A-H]) startar ([^.]*)", x):
                for sp in spor:
                    if sp["id"] == "spor_" + m.group(1).lower() and sp["opnar_seg"] is None:
                        sp["opnar_seg"] = "Spor %s startar %s" % (m.group(1), m.group(2))

    # sideoppdrag
    oppdrag = []
    for del_, namn in (("S1", "08 Sideoppdrag 1"), ("S2", "09 Sideoppdrag 2")):
        doc = K["04 Manus/" + namn]
        liste = []
        cur = None
        for n, tt, l in doc.overskrifter:
            m = re.match(r"^(S[12]\.\d+[a-z]?)[ :]+(.*)$", tt)
            if n == 3 and m:
                oid = scene_id(m.group(1))
                linjer = doc.linjer_under(l)
                intro = []
                for nr, x in linjer:
                    if x.startswith("#"):
                        break
                    if x.strip():
                        intro.append((nr, x.strip()))
                felt = OrderedDict()
                for nr, x in intro:
                    for d in re.split(r"\s(?=(?:Region og tid|Stad og tid|Blir utløyst|Gang gjennom|Med|Spel|Utfall og løn|Utfall|Løn|Overgang):\s)", x):
                        mm = re.match(r"^(Region og tid|Stad og tid|Blir utløyst|Gang gjennom|Med|Spel|Utfall og løn|Utfall|Løn|Overgang):\s*(.*)$", d)
                        if mm:
                            felt[mm.group(1)] = mm.group(2)
                cur = OrderedDict([("id", oid), ("namn", m.group(2)), ("del", del_), ("omraade", None),
                                   ("region_og_tid", felt.get("Region og tid") or felt.get("Stad og tid")),
                                   ("utloyst", felt.get("Blir utløyst")), ("gang_gjennom", felt.get("Gang gjennom")),
                                   ("med_tekst", felt.get("Med")), ("utfall_tekst", None), ("scener", []),
                                   ("flagg_set", []), ("flagg_les", []), ("kjelde", stad(doc, l))])
                for n2, t2, l2 in doc.overskrifter:
                    if n2 == 2 and l2 < l:
                        cur["omraade"] = t2
                oppdrag.append(cur)
                # scener under oppdraget
                sub = [(n2, t2, l2) for n2, t2, l2 in doc.overskrifter if n2 == 4 and linjer and linjer[0][0] <= l2 <= linjer[-1][0]]
                if not sub:
                    sid = oid + "_1"
                    sc = les_scene(doc, del_, sid, m.group(2), l, linjer, ramme=oid)
                    alle[sid] = sc
                    liste.append(sc)
                    cur["scener"].append(sid)
                for k, (n2, t2, l2) in enumerate(sub):
                    ms = re.match(r"^Scene(?: (S[12]\.\d+[a-z]?\.\d+))?: (.*)$", t2)
                    if not ms:
                        continue
                    sid = scene_id(ms.group(1)) if ms.group(1) else "%s_%d" % (oid, k + 1)
                    sc = les_scene(doc, del_, sid, ms.group(2), l2, doc.linjer_under(l2), ramme=oid)
                    if sid in alle:
                        L.ukl(doc, l2, "Scena %s står to gonger" % sid)
                    alle[sid] = sc
                    liste.append(sc)
                    cur["scener"].append(sid)
                # utfall og løn for heile oppdraget: linene etter siste scene som byrjar med Løn
                ut = []
                for nr, x in linjer:
                    mm = re.match(r"^(Utfall og løn|Løn|Utfall):\s*(.*)$", x.strip())
                    if mm:
                        ut.append(mm.group(2))
                cur["utfall_tekst"] = " ".join(ut) or None
                for sid in cur["scener"]:
                    for f in alle[sid]["flagg_set"]:
                        if f not in cur["flagg_set"]:
                            cur["flagg_set"].append(f)
                    for f in alle[sid]["flagg_les"]:
                        if f not in cur["flagg_les"]:
                            cur["flagg_les"].append(f)
            m = re.match(r"^Samtale (\d+): (.*)$", tt)
            if n == 3 and m:
                sid = "%s_samtale_%s" % (del_, m.group(1))
                sc = les_scene(doc, del_, sid, m.group(2), l, doc.linjer_under(l))
                sc["samtale"] = True
                alle[sid] = sc
                liste.append(sc)
        for i, sc in enumerate(liste):
            if sc["neste"] == "_neste_i_fila":
                sc["neste"] = liste[i + 1]["id"] if i + 1 < len(liste) else None
        scener_per_del[del_] = liste
    L.merk("Scenene i sideoppdraga har ID-en til oppdraget og eit løpenummer (S1_1_1). I S2 står nummeret i manus (S2.1.1 blir S2_1_1). Samtalane undervegs har ID-ar som S1_samtale_1")
    L.merk("Flagga står ikkje med namn i dokumentet. Skriptet lagar eitt flagg per val i manus (<scene>_val, med bokstavane som verdiar) og les tilvisingar som «val B i S1.28» eller «1.17, val B» i manus, sideoppdrag og kartfanene. Standardverdien er null for alle")

    # skjerm til kvar scene frå Kart og rom
    for sk in D.get("skjermar", {}).values():
        for s in sk["scener"]:
            if s in alle:
                sc = alle[s]
                if sc["skjerm"] is None:
                    sc["skjerm"] = sk["id"]
                elif sc["skjerm"] != sk["id"]:
                    sc.setdefault("skjermar", [sc["skjerm"]])
                    if sk["id"] not in sc["skjermar"]:
                        sc["skjermar"].append(sk["id"])
    # ordnummer som står i parentes på skjermar (stadord), ikkje scener
    for sk in D.get("skjermar", {}).values():
        nye = []
        for sc_id in sk["scener"]:
            m = re.fullmatch(r"s(\d)_(\d\d)", sc_id)
            if sc_id not in alle and m and ("%s.%s" % (m.group(1), m.group(2))) in D.get("ord_nr", {}):
                sk.setdefault("ord", []).append(D["ord_nr"]["%s.%s" % (m.group(1), m.group(2))])
            else:
                nye.append(sc_id)
        sk["scener"] = nye
    # skjermar som viser til eit heilt sideoppdrag
    for sk in D.get("skjermar", {}).values():
        for o in oppdrag:
            if o["id"] in sk["scener"]:
                for sc_id in o["scener"]:
                    if alle[sc_id]["skjerm"] is None:
                        alle[sc_id]["skjerm"] = sk["id"]
                        alle[sc_id]["skjerm_fraa_oppdrag"] = True
    chr_ = K["03 Kart Christiania"]
    t = chr_.tabell("Scene", "Skjerm", "Merknad")
    if t:
        for line, r in t:
            for s in finn_scener(r["Scene"]):
                ids = [x for x in SKJERM_RE.findall(r["Skjerm"]) if x in D.get("skjermar", {})]
                if s in alle and ids and alle[s]["skjerm"] is None:
                    alle[s]["skjerm"] = ids[0]
                    if len(ids) > 1:
                        alle[s]["skjermar"] = ids
                elif s in alle and not ids:
                    alle[s]["skjerm_tekst"] = r["Skjerm"]

    # flagg som kartfanene og andre faner les
    for rel in K.docs:
        if not rel.startswith(("07 Kart og rom/", "05 Mekanikk/", "06 Verda/")):
            continue
        doc = K[rel]
        for nr, x in enumerate(doc.lines):
            for ref, bokstav in finn_val_tilvisingar(x):
                fid = ref + "_val"
                ids = SKJERM_RE.findall(x.split("|")[1]) if x.startswith("|") else []
                kven = ids[0] if ids and rel.startswith("07") else "%s:%d" % (rel, nr + 1)
                ny_flagg(fid, lese_av=[kven])
    for f in flagg.values():
        sid = f["id"][:-4] if f["id"].endswith("_val") else None
        if f["id"].endswith("_val") and not f["set_av"]:
            if sid in alle:
                f["set_av"].append(sid)
                f["merknad"] = "Scena har ingen line som byrjar med «(Val», men andre faner viser til eit val her"
            elif sid and re.match(r"^S[12]_\d+[a-z]?$", sid):
                f["set_av"].append(sid)
                f["merknad"] = "Tilvisinga gjeld oppdraget. Valet står i ei av scenene i oppdraget"
    for sp in spor:
        if sp["opnar_seg"] is None:
            L.ukl(K["04 Manus/04 Christiania"], int(sp["kjelde"].rsplit(":", 1)[1]), "Det står ikkje kva som opnar %s" % sp["namn"])
    for del_, l in scener_per_del.items():
        legg("manus/scener/%s.json" % del_, l)
    legg("manus/sideoppdrag.json", oppdrag)
    legg("system/flagg.json", list(flagg.values()))
    legg("manus/dagboka.json", OrderedDict([("sider", dagbok), ("spor", spor)]))
    D["scener"] = alle
    D["oppdrag"] = oppdrag
    # tal mot oversikta i Manus
    ov = K["04 Manus/00 Manus"]
    tekst = " ".join(ov.lines)
    m = re.search(r"sju delar med til saman (\d+) scener", tekst)
    hoved = sum(len(v) for k, v in scener_per_del.items() if k.startswith("del"))
    if m and int(m.group(1)) != hoved:
        per = []
        for nr, x in enumerate(ov.lines):
            mm = re.match(r"^- Tab (.*?)\. (\d+) scener", x)
            if mm:
                per.append((nr + 1, int(mm.group(2))))
        detalj = []
        for (del_, namn), (nr, n) in zip(DELFILER, per):
            fann = len(scener_per_del.get("del" + del_, []))
            if fann != n:
                ekstra = [s["id"] for s in scener_per_del.get("del" + del_, []) if re.search(r"[a-z]$", s["id"]) or s["id"].startswith("s0_")]
                detalj.append("del %s: %d i oversikta, %d overskrifter «Scene» i fana (mellom dei %s)" % (del_, n, fann, ", ".join(ekstra) or "ingen med bokstav"))
        L.mot("Oversikta i Manus seier %s scener i hovudhistoria, men fanene har %d overskrifter «Scene». %s"
              % (m.group(1), hoved, "; ".join(detalj)), stad(ov, 5))
    m = re.search(r"(\d+) oppdrag og (\d+) samtalar", tekst)
    sam = sum(1 for s in alle.values() if s.get("samtale"))
    if m and (int(m.group(1)) != len(oppdrag) or int(m.group(2)) != sam):
        L.mot("Oversikta i Manus seier %s oppdrag og %s samtalar, skriptet fann %d oppdrag og %d samtalar"
              % (m.group(1), m.group(2), len(oppdrag), sam), stad(ov, 5))


#@@EININGAR@@


# ---------------------------------------------------------------------------
# Hovudprogrammet
# ---------------------------------------------------------------------------

def main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 2
    rot = argv[1]
    datamappe = os.path.join(ROT, "data")
    if "--ut" in argv:
        datamappe = argv[argv.index("--ut") + 1]
    K = Kjelde(rot)
    for f in EININGAR:
        f(K)
    flett_hand(datamappe)
    legg("filer.json", OrderedDict([("filer", [k for k in UT.keys()])]))
    skriv_alt(datamappe)
    with open(os.path.join(datamappe, "importlogg.json"), "w", encoding="utf-8") as fil:
        json.dump({"uklar": L.uklar, "motseiingar": L.motseiingar, "merknader": L.merknader},
                  fil, ensure_ascii=False, indent=1)
        fil.write("\n")
    sys.path.insert(0, HER)
    sys.dont_write_bytecode = True
    import sjekk
    return sjekk.main(["sjekk.py", datamappe])


EININGAR = [
    eining_ting,
    eining_familiar,
    eining_oppslag,
    eining_statusar,
    eining_figurar,
    eining_fiendar,
    eining_mote,
    eining_stader,
    eining_lyd,
    eining_manus,
#@@LISTE@@
]

if __name__ == "__main__":
    sys.exit(main(sys.argv))
