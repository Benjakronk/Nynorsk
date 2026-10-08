#!/usr/bin/env python3
"""Sjekken for datafilene til Aasen-spelet.

Bruk:
    python3 tools/sjekk.py [data-mappa]

Finn ID-ar som står meir enn éin gong, brotne tilvisingar, utgangar som berre
går éin veg, ord som ingen gjev, scener utan skjerm, møtesoner utan skjerm,
kister med ting frå feil tid, og tal som ikkje stemmer med summane i
dokumentet. Skriv data/rapport.md saman med loggen frå importen
(data/importlogg.json). Returnerer 1 når sjekken finn brotne tilvisingar
eller doble ID-ar, elles 0.
"""

import json
import os
import re
import sys
from collections import OrderedDict, defaultdict

HER = os.path.dirname(os.path.abspath(__file__))
ROT = os.path.dirname(HER)

# Kontrollsummane i fana «5. Datamodell»
SUMMAR = [
    ("Oppslag i Ordboka", "ord/oppslag.json", None, 527),
    ("Familiar av vanlege fiendar", "fiendar/familiar.json", None, 61),
    ("Variantar av vanlege fiendar", "fiendar/vanlege.json", None, 452),
    ("Skjermar", "verda/stader", "skjermar", 625),
    ("Rom i dungeonar", "verda/stader", "rom", 498),
    ("Kister", "verda/stader", "kister", 462),
    ("Rader med butikkar og kvile", "verda/stader", "butikkar", 219),
]


def les(data, sti):
    p = os.path.join(data, sti)
    if not os.path.exists(p):
        return None
    with open(p, encoding="utf-8") as f:
        return json.load(f)


def alle_filer(data):
    ut = []
    for r, ds, fs in os.walk(data):
        ds.sort()
        if os.path.relpath(r, data).split(os.sep)[0] == "hand":
            continue
        for f in sorted(fs):
            if f.endswith(".json") and f not in ("importlogg.json", "filer.json"):
                ut.append(os.path.relpath(os.path.join(r, f), data).replace(os.sep, "/"))
    return ut


def postar(innhald):
    """Gjev {delnamn: liste} for ei fil. Ei liste blir {'': liste}."""
    if isinstance(innhald, list):
        return OrderedDict([("", innhald)])
    if isinstance(innhald, dict):
        return OrderedDict((k, v) for k, v in innhald.items() if isinstance(v, list))
    return OrderedDict()


class Sjekk:
    def __init__(self, data):
        self.data = data
        self.filer = OrderedDict((f, les(data, f)) for f in alle_filer(data))
        self.brot = defaultdict(list)     # bolk -> liner
        self.dobbel = []
        self.tal = []
        self.ids = defaultdict(set)       # eining -> id-ar

    # ---- hjelparar
    def fil(self, sti):
        return self.filer.get(sti)

    def mapper(self, prefiks):
        return [(k, v) for k, v in self.filer.items() if k.startswith(prefiks + "/")]

    def liste(self, sti, del_=""):
        f = self.fil(sti)
        if f is None:
            return []
        return postar(f).get(del_, [])

    def samle(self, prefiks, del_):
        ut = []
        for k, v in self.mapper(prefiks):
            ut.extend(postar(v).get(del_, []))
        return ut

    def b(self, bolk, tekst):
        self.brot[bolk].append(tekst)

    # ---- sjekkane
    def tel(self):
        for sti, innhald in self.filer.items():
            for d, l in postar(innhald).items():
                self.tal.append((sti, d, len(l)))

    def doble_idar(self):
        einingar = defaultdict(list)
        for sti, innhald in self.filer.items():
            for d, l in postar(innhald).items():
                eining = sti.split("/")[0] + "/" + (d or os.path.basename(sti))
                if sti.startswith("verda/stader/") or sti.startswith("manus/scener/") or sti.startswith("fiendar/mote/"):
                    eining = os.path.dirname(sti) + ":" + (d or "")
                else:
                    eining = sti + (":" + d if d else "")
                for p in l:
                    if isinstance(p, dict) and "id" in p and p["id"] is not None:
                        einingar[eining].append((p["id"], sti))
        for eining, l in einingar.items():
            sett = defaultdict(list)
            for i, sti in l:
                sett[i].append(sti)
            for i, stiar in sett.items():
                if len(stiar) > 1:
                    self.dobbel.append("%s: «%s» står %d gonger (%s)" % (eining, i, len(stiar), ", ".join(sorted(set(stiar)))))
            self.ids[eining] = set(sett)

    def idar(self, sti, del_=""):
        return {p["id"] for p in self.liste(sti, del_) if isinstance(p, dict) and p.get("id")}

    def idar_mappe(self, prefiks, del_=""):
        return {p["id"] for p in self.samle(prefiks, del_) if isinstance(p, dict) and p.get("id")}

    def kontrollsummar(self):
        ut = []
        for namn, sti, del_, venta in SUMMAR:
            if sti.endswith(".json"):
                f = self.fil(sti)
                n = None if f is None else len(postar(f).get("", []))
            else:
                n = len(self.samle(sti, del_)) if self.mapper(sti) else None
            ut.append((namn, sti + ((":" + del_) if del_ else ""), venta, n))
        return ut

    def køyr(self):
        self.tel()
        self.doble_idar()
        for namn in sorted(dir(self)):
            if namn.startswith("r_"):
                getattr(self, namn)()

    # ===== tilvisingar (ein metode per slag, køyrde i alfabetisk rekkjefølgje)

    def _alle(self):
        """Samlar alt sjekken treng, éin gong."""
        if hasattr(self, "_a"):
            return self._a
        a = {}
        a["ting"] = {p["id"]: p for p in self.liste("ting/ting.json")}
        a["utstyr"] = {p["id"]: p for p in self.liste("ting/utstyr.json")}
        a["tingalle"] = set(a["ting"]) | set(a["utstyr"])
        a["oppslag"] = {p["id"]: p for p in self.liste("ord/oppslag.json")}
        a["fam"] = self.idar("ord/familiar.json")
        a["trekk"] = self.idar("ord/trekk.json")
        a["statusar"] = self.idar("system/statusar.json")
        a["figurar"] = self.idar("figurar/figurar.json")
        a["evner"] = {p["id"]: p for p in self.liste("figurar/evner.json")}
        a["fiendar"] = {}
        for fil in ("vanlege", "namngjevne", "bossar"):
            for p in self.liste("fiendar/%s.json" % fil):
                a["fiendar"][(fil, p["id"])] = p
        a["fiendefam"] = self.idar("fiendar/familiar.json")
        a["soner"] = {z["id"]: z for z in self.samle("fiendar/mote", "")}
        a["skjermar"] = {}
        a["stader"] = {}
        a["kister"] = []
        a["butikkar"] = []
        for k, v in self.mapper("verda/stader"):
            for s in v.get("skjermar", []) + v.get("rom", []):
                a["skjermar"][s["id"]] = s
            for st in v.get("stader", []):
                a["stader"][st["id"]] = st
            a["kister"] += v.get("kister", [])
            a["butikkar"] += v.get("butikkar", [])
        a["alias"] = {}
        for s in a["skjermar"].values():
            for x in s.get("alias", []):
                a["alias"][x] = s["id"]
        a["scener"] = {}
        for k, v in self.mapper("manus/scener"):
            for sc in v:
                a["scener"][sc["id"]] = sc
        a["oppdrag"] = {o["id"]: o for o in self.liste("manus/sideoppdrag.json")}
        a["flagg"] = {f["id"]: f for f in self.liste("system/flagg.json")}
        a["sfx"] = self.idar("lyd/sfx.json")
        a["epokar"] = {e["id"] for e in self.liste("system/epokar.json", "epokar")}
        a["butikktypar"] = self.idar("ting/butikktypar.json")
        a["ventekister"] = {v["id"]: v for v in self.liste("ting/ventekister.json")}
        a["kiste_idar"] = {k["id"] for k in a["kister"]}
        self._a = a
        return a

    def skjerm_finst(self, sid):
        a = self._alle()
        return sid in a["skjermar"] or sid in a["alias"]

    def scene_finst(self, sid):
        a = self._alle()
        return sid in a["scener"] or sid in a["oppdrag"]

    def r_a_ting(self):
        a = self._alle()
        if not a["tingalle"]:
            return
        b = "Ting som ikkje finst"
        for bt in self.liste("ting/butikktypar.json"):
            for felt in ("alltid", "fraa_T2", "fraa_T4"):
                for i in bt.get(felt, []):
                    if i not in a["tingalle"]:
                        self.b(b, "Butikktypen %s: tingen «%s» finst ikkje (%s)" % (bt["id"], i, bt["kjelde"]))
        for v in a["ventekister"].values():
            for tid, inn in (v.get("innhald") or {}).items():
                for p in (inn or {}).get("innhald", []):
                    if "ting" in p and p["ting"] not in a["tingalle"]:
                        self.b(b, "Ventekista %s, %s: tingen «%s» finst ikkje" % (v["id"], tid, p["ting"]))
        for k in a["kister"]:
            for p in k.get("innhald", []):
                if "ting" in p and p["ting"] not in a["tingalle"]:
                    self.b(b, "Kista %s: tingen «%s» finst ikkje (%s)" % (k["id"], p["ting"], k["kjelde"]))
        for bu in a["butikkar"]:
            for i in bu.get("ekstra", []):
                if i not in a["tingalle"]:
                    self.b(b, "Butikken på %s: tingen «%s» finst ikkje (%s)" % (bu["skjerm"], i, bu["kjelde"]))
            for d in bu.get("ekstra_anna", []):
                self.b("Varer i butikkar som ikkje finst i ting- eller utstyrstabellane",
                       "Butikken på %s: «%s» (%s)" % (bu["skjerm"], d, bu["kjelde"]))
        for sc in a["scener"].values():
            for i in sc.get("ting", []):
                if i not in a["tingalle"]:
                    self.b(b, "Scena %s: tingen «%s» finst ikkje" % (sc["id"], i))
        for t in a["ting"].values():
            for s in ((t.get("verknad") or {}).get("loftar") or []):
                if a["statusar"] and s not in a["statusar"]:
                    self.b("Statusar som ikkje finst", "Tingen %s løftar «%s», som ikkje står i statustabellane (%s)" % (t["id"], s, t["kjelde"]))

    def r_b_ord(self):
        a = self._alle()
        if not a["oppslag"]:
            return
        b = "Ord som ikkje finst i Ordboka"
        for sc in a["scener"].values():
            for o in sc.get("ord", []):
                if o not in a["oppslag"]:
                    self.b(b, "Scena %s gjev ordet «%s» (%s)" % (sc["id"], o, sc["kjelde"]))
            for o in sc.get("ord_ukjende", []):
                self.b("Ord i utfallet til ei scene som ikkje finst i Ordboka", "Scena %s: «%s» (%s)" % (sc["id"], o, sc["kjelde"]))
        for (fil, fid), p in a["fiendar"].items():
            ob = p.get("ordboka")
            if ob and ob.get("form") and not ob.get("ord"):
                self.b("Ord frå fiendar som ikkje finst i Ordboka", "%s (%s): «%s» (%s)" % (p["namn"], fil, ob["form"], p["kjelde"]))
            elif ob and ob.get("ord") and ob["ord"] not in a["oppslag"]:
                self.b(b, "%s: «%s»" % (p["namn"], ob["ord"]))
        for o in a["oppslag"].values():
            if o.get("fam") and o["fam"] not in a["fam"]:
                self.b("Lydfamiliar som ikkje finst", "%s %s: «%s»" % (o["nr"], o["oppslag"], o["fam"]))
            if o.get("trekk") and o["trekk"] not in a["trekk"]:
                self.b("Trekk som ikkje finst", "%s %s: «%s»" % (o["nr"], o["oppslag"], o["trekk"]))
            for s in o.get("kjelde_i_spelet", []):
                if a["scener"] and not self.scene_finst(s):
                    self.b("Scener i Kjelde i spelet som ikkje finst", "%s %s: %s (%s)" % (o["nr"], o["oppslag"], s, o["kjelde"]))

    def r_c_fiendar(self):
        a = self._alle()
        b = "Fiendar i møtegrupper som ikkje finst"
        for z in a["soner"].values():
            for g in z["grupper"]:
                for f in g["fiendar"]:
                    if f["id"] is None or (f["fil"], f["id"]) not in a["fiendar"]:
                        self.b(b, "Sona %s, gruppe %s: «%s» (%s)" % (z["namn"], g["gruppe"], f.get("namn") or f["id"], g["kjelde"]))
        for (fil, fid), p in a["fiendar"].items():
            if fil == "vanlege":
                if p.get("familie") not in a["fiendefam"]:
                    self.b("Fiendefamiliar som ikkje finst", "%s: «%s»" % (fid, p.get("familie")))
                if p.get("grunnform") and ("vanlege", p["grunnform"]) not in a["fiendar"]:
                    self.b("Grunnformer som ikkje finst", "%s: «%s»" % (fid, p["grunnform"]))
            for s in (p.get("kvar_og_naar") or {}).get("soner", []):
                if s not in a["soner"]:
                    self.b("Soner som ikkje finst", "%s: «%s»" % (fid, s))
            if fil == "bossar":
                for k in ("scene", "oppdrag"):
                    if p.get(k) and a["scener"] and not self.scene_finst(p[k]):
                        self.b("Scener på bossar som ikkje finst", "%s: %s «%s» (%s)" % (p["namn"], k, p[k], p["kjelde"]))

    def r_d_skjermar(self):
        a = self._alle()
        if not a["skjermar"]:
            return
        b = "Utgangar til skjermar som ikkje finst"
        for s in a["skjermar"].values():
            for u in s["utgangar"]:
                if u["til"] == "verdskartet":
                    continue
                if u["til"] is None:
                    self.b("Utgangar med namn som ikkje kunne slåast opp",
                           "%s: «%s»%s (%s)" % (s["id"], u["namn"], (" (fleire treff: %s)" % ", ".join(u["fleire_treff"])) if u.get("fleire_treff") else "", s["kjelde"]))
                elif not self.skjerm_finst(u["til"]):
                    self.b(b, "%s: %s (%s)" % (s["id"], u["til"], s["kjelde"]))
            for sc in s["scener"]:
                if a["scener"] and not self.scene_finst(sc):
                    self.b("Scener på skjermar som ikkje finst", "%s: %s (%s)" % (s["id"], sc, s["kjelde"]))
            for z in s.get("soner", []):
                if z not in a["soner"]:
                    self.b("Soner som ikkje finst", "%s: %s" % (s["id"], z))
            for e in s.get("epokar", []):
                if e not in a["epokar"]:
                    self.b("Epokar som ikkje finst", "%s: %s" % (s["id"], e))
        for k in a["kister"]:
            if not self.skjerm_finst(k["skjerm"]):
                self.b("Kister på skjermar som ikkje finst", "%s: %s (%s)" % (k["id"], k["skjerm"], k["kjelde"]))
            if k.get("ventekiste") and k["ventekiste"] not in a["ventekister"]:
                self.b("Ventekister som ikkje finst", "%s: %s" % (k["id"], k["ventekiste"]))
        for bu in a["butikkar"]:
            for sid in re.findall(r"[A-Z]{2,4}-\d+[a-z]?", bu["skjerm"]):
                if not self.skjerm_finst(sid):
                    self.b("Butikkar på skjermar som ikkje finst", "%s (%s)" % (sid, bu["kjelde"]))
            if bu["type"] and bu["type"] != "kvile" and bu["type"] not in a["butikktypar"]:
                self.b("Butikktypar som ikkje finst", "%s: %s" % (bu["skjerm"], bu["type"]))
        for v in a["ventekister"].values():
            if v.get("skjerm") and not self.skjerm_finst(v["skjerm"]):
                self.b("Ventekister på skjermar som ikkje finst", "%s: %s" % (v["id"], v["skjerm"]))
            if v.get("kiste") and v["kiste"] not in a["kiste_idar"]:
                self.b("Ventekister med kiste som ikkje finst", "%s: %s" % (v["id"], v["kiste"]))
        for z in a["soner"].values():
            for s in z["skjermar"]:
                if not self.skjerm_finst(s):
                    self.b("Skjermar i møtesoner som ikkje finst", "%s: %s" % (z["id"], s))
            if z.get("epoke") and z["epoke"] not in a["epokar"]:
                self.b("Epokar som ikkje finst", "Sona %s: %s" % (z["id"], z["epoke"]))

    def r_e_scener(self):
        a = self._alle()
        if not a["scener"]:
            return
        for sc in a["scener"].values():
            if sc.get("skjerm") and not self.skjerm_finst(sc["skjerm"]):
                self.b("Skjermar på scener som ikkje finst", "%s: %s" % (sc["id"], sc["skjerm"]))
            if sc.get("neste") and not self.scene_finst(sc["neste"]):
                self.b("Neste scene som ikkje finst", "%s: %s (%s)" % (sc["id"], sc["neste"], sc["kjelde"]))
            for f in sc.get("med", []):
                if f not in a["figurar"]:
                    self.b("Figurar som ikkje finst", "Scena %s: %s" % (sc["id"], f))
            for f in sc.get("flagg_set", []) + sc.get("flagg_les", []):
                if f not in a["flagg"]:
                    self.b("Flagg som ikkje finst", "Scena %s: %s" % (sc["id"], f))
        for f in a["flagg"].values():
            for s in f["set_av"]:
                if not self.scene_finst(s):
                    self.b("Flagg som blir sette av noko som ikkje finst", "%s: %s" % (f["id"], s))
            for s in f["lese_av"]:
                if ":" not in s and not self.scene_finst(s) and not self.skjerm_finst(s):
                    self.b("Flagg som blir lesne av noko som ikkje finst", "%s: %s" % (f["id"], s))
            if f["id"].endswith("_val"):
                sid = f["id"][:-4]
                if not self.scene_finst(sid):
                    self.b("Flagg for val i scener som ikkje finst", "%s (lese av %s)" % (f["id"], ", ".join(f["lese_av"])))
        dag = self.fil("manus/dagboka.json") or {}
        for d in dag.get("sider", []):
            if d.get("etter_scene") and not self.scene_finst(d["etter_scene"]):
                self.b("Dagbokssider etter scener som ikkje finst", "%s: %s" % (d["id"], d["etter_scene"]))
        for sp in dag.get("spor", []):
            for s in sp["scener"]:
                if not self.scene_finst(s):
                    self.b("Scener i spor som ikkje finst", "%s: %s" % (sp["id"], s))
        for o in a["oppdrag"].values():
            for s in o["scener"]:
                if s not in a["scener"]:
                    self.b("Scener i sideoppdrag som ikkje finst", "%s: %s" % (o["id"], s))

    def r_f_figurar(self):
        a = self._alle()
        for e in a["evner"].values():
            fl = e["figur"] if isinstance(e["figur"], list) else ([e["figur"]] if e["figur"] else [])
            for f in fl:
                if f not in a["figurar"]:
                    self.b("Figurar som ikkje finst", "Evna %s: %s" % (e["id"], f))
            if e.get("under") and e["under"] not in a["evner"]:
                self.b("Evner som viser til ein kommando som ikkje finst", "%s: %s (%s)" % (e["id"], e["under"], e["kjelde"]))
            for s in e.get("laert_scener", []):
                if a["scener"] and not self.scene_finst(s):
                    self.b("Scener der evner blir lærde, som ikkje finst", "%s: %s" % (e["id"], s))
        for f in self.liste("figurar/figurar.json"):
            for m in f.get("meny", []) + f.get("feltevne", []):
                if m not in a["evner"]:
                    self.b("Evner i menyen som ikkje finst", "%s: %s" % (f["id"], m))
        for u in a["utstyr"].values():
            for f in u.get("kven", []) + u.get("utanom", []):
                if f not in a["figurar"]:
                    self.b("Figurar som ikkje finst", "Utstyret %s: %s" % (u["id"], f))

    def r_g_lyd(self):
        a = self._alle()
        if not a["sfx"]:
            return
        for sti in ("ord/familiar.json", "ord/trekk.json", "system/statusar.json", "figurar/evner.json", "fiendar/bossar.json"):
            for p in self.liste(sti):
                if p.get("sfx") and p["sfx"] not in a["sfx"]:
                    self.b("Lydar som ikkje finst", "%s %s: %s" % (sti, p["id"], p["sfx"]))
        for p in self.liste("lyd/sfx.json"):
            if p.get("same_som") and p["same_som"] not in a["sfx"]:
                self.b("Lydar som ikkje finst", "%s er «same som» %s" % (p["id"], p["same_som"]))
        for sti, felt in (("ord/trekk.json", "Trekk"),):
            for p in self.liste(sti):
                if not p.get("sfx") and p["id"] not in ("ingen", "eiga"):
                    self.b("Einingar utan lyd i fana Lydeffektar", "%s %s" % (sti, p["id"]))

    def r_h_einvegs(self):
        a = self._alle()
        if not a["skjermar"]:
            return
        def peikar_til(s, maal):
            for u in s["utgangar"]:
                t = a["alias"].get(u["til"], u["til"])
                if t == maal:
                    return True
            return False
        for s in a["skjermar"].values():
            for u in s["utgangar"]:
                t = a["alias"].get(u["til"], u["til"])
                if t in (None, "verdskartet") or t not in a["skjermar"]:
                    continue
                if u.get("snarveg") or re.search(r"snarveg|stengd|einveg|éin veg|ingen veg attende|lukkar seg", (u.get("merknad") or "") + " " + s["innhald_tekst"].lower()):
                    continue
                maal = a["skjermar"][t]
                if (maal.get("utgangar_tekst") or "").strip().lower().startswith("ingen"):
                    continue  # dokumentet seier at målet ikkje har utgang
                if not peikar_til(maal, s["id"]):
                    self.b("Utgangar som berre går éin veg", "%s → %s, men %s har inga utgang attende (%s)" % (s["id"], t, t, s["kjelde"]))

    def r_i_ingen_gjev(self):
        a = self._alle()
        if not a["oppslag"] or not a["scener"]:
            return
        gjeve = set()
        for sc in a["scener"].values():
            gjeve.update(sc.get("ord", []))
        for p in a["fiendar"].values():
            if p.get("ordboka") and p["ordboka"].get("ord"):
                gjeve.add(p["ordboka"]["ord"])
        for v in self.liste("verda/villmarker.json"):
            for so in v.get("stadord", []):
                if so.get("ord"):
                    gjeve.add(so["ord"])
        for o in a["oppslag"].values():
            if o["id"] not in gjeve:
                self.b("Oppslag som ingen scene, fiende eller stad gjev",
                       "%s %s (Kjelde i spelet: %s) (%s)" % (o["nr"], o["oppslag"], o.get("kjelde_i_spelet_tekst") or "tom", o["kjelde"]))

    def r_j_scener_utan_skjerm(self):
        a = self._alle()
        if not a["scener"] or not a["skjermar"]:
            return
        for sc in a["scener"].values():
            if not sc.get("skjerm") and not sc.get("samtale"):
                self.b("Scener som ingen skjerm har", "%s %s (%s)" % (sc["id"], sc["namn"], sc["kjelde"]))

    def r_k_soner(self):
        a = self._alle()
        if not a["soner"] or not a["skjermar"]:
            return
        for z in a["soner"].values():
            if not z["skjermar"]:
                self.b("Møtesoner utan skjerm", "%s «%s» (%s)" % (z["id"], z["namn"], z["kjelde"]))
        for s in a["skjermar"].values():
            if not s.get("soner") and re.search(r"tilfeldige kampar|kampar mot|møterate (låg|vanleg|høg)", s["innhald_tekst"].lower()):
                self.b("Skjermar med kampar utan møtesone", "%s %s (%s)" % (s["id"], s["namn"], s["kjelde"]))

    def r_l_kister(self):
        a = self._alle()
        if not a["kister"]:
            return
        tal_t = {"T1": 1, "T2": 2, "T3": 3, "T4": 4}
        for k in a["kister"]:
            if not k["tid"]:
                continue
            seinast = max(tal_t[t] for t in k["tid"])
            for p in k.get("innhald", []):
                if "ting" not in p:
                    continue
                t = a["ting"].get(p["ting"]) or a["utstyr"].get(p["ting"])
                if t and t.get("tid") in tal_t and tal_t[t["tid"]] > seinast:
                    self.b("Kister med ting frå ei seinare tid",
                           "%s (%s): %s kjem først i %s etter Varer og kister (%s)" % (k["id"], k["tid_tekst"], p["ting"], t["tid"], k["kjelde"]))
        # nivåtabellen for kister
        nivaregel = (self.fil("ting/kistereglar.json") or {}).get("niva") or []
        if nivaregel:
            for k in a["kister"]:
                s = a["skjermar"].get(k["skjerm"]) or a["skjermar"].get(a["alias"].get(k["skjerm"], ""))
                if not s:
                    continue
                eptid = {e["id"]: e.get("tid") for e in self.liste("system/epokar.json", "epokar")}
                niva = [a["soner"][z]["niva"]["maks"] for z in s.get("soner", []) if z in a["soner"] and a["soner"][z].get("niva")
                        and eptid.get(a["soner"][z].get("epoke")) in k["tid"]]
                if not niva:
                    continue
                n = max(niva)
                for p in k.get("innhald", []):
                    if "ting" not in p:
                        continue
                    lagast = [r["fraa_niva"] for r in nivaregel if p["ting"] in r["ting"] and r["fraa_niva"] is not None]
                    if lagast and min(lagast) > n:
                        self.b("Kister med ting over nivået på staden",
                               "%s: %s høyrer til nivå %d og opp etter Varer og kister, men sonene på %s i tida %s har nivå %d (%s)"
                               % (k["id"], p["ting"], min(lagast), s["id"], "/".join(k["tid"]), n, k["kjelde"]))


def skriv_rapport(s, data):
    logg = les(data, "importlogg.json") or {"uklar": [], "motseiingar": [], "merknader": []}
    o = []
    o.append("# Rapport frå importen og sjekken")
    o.append("")
    o.append("Rapporten er laga av tools/importer.py og tools/sjekk.py. Han blir skriven på nytt kvar gong skripta køyrer. Kvar line viser til fila og lina i eksporten av designdokumentet, så feilen kan rettast i fana.")
    o.append("")
    o.append("## 1 Tal på einingar per fil")
    o.append("")
    o.append("| Fil | Del | Tal |")
    o.append("| --- | --- | --- |")
    for sti, d, n in s.tal:
        o.append("| %s | %s | %d |" % (sti, d or "", n))
    o.append("")
    o.append("### Kontrollsummane i fana Datamodell")
    o.append("")
    o.append("| Eining | Fil | Dokumentet seier | Datafilene har | Avvik |")
    o.append("| --- | --- | --- | --- | --- |")
    for namn, sti, venta, n in s.kontrollsummar():
        if n is None:
            o.append("| %s | %s | %d | ikkje laga enno |  |" % (namn, sti, venta))
        else:
            o.append("| %s | %s | %d | %d | %s |" % (namn, sti, venta, n, "" if n == venta else "%+d" % (n - venta)))
    alias = sum(len(x.get("alias", [])) for x in s.samle("verda/stader", "skjermar"))
    nsk = len(s.samle("verda/stader", "skjermar"))
    if alias:
        o.append("")
        o.append("Tabellane med skjermar i kartfanene har %d rader. %d av skjermane står i to faner og er slegne saman med skjermen i fana som eig staden. Difor har datafilene %d skjermar." % (nsk + alias, alias, nsk))
    forkl = [m for m in logg.get("merknader", []) if m.startswith("Kontrollsum")]
    if forkl:
        o.append("")
        o.append("Forklaring på avvika:")
        o.append("")
        for m in forkl:
            o.append("- " + m)
    o.append("")
    o.append("## 2 Det skriptet ikkje kunne tolke")
    o.append("")
    if not logg["uklar"]:
        o.append("Ingenting.")
    grupper = OrderedDict()
    for u in logg["uklar"]:
        grupper.setdefault(u["fil"], []).append(u)
    for fil, l in grupper.items():
        o.append("### %s" % fil)
        o.append("")
        for u in sorted(l, key=lambda x: (x["line"] or 0)):
            o.append("- Line %s: %s" % (u["line"], u["tekst"]))
        o.append("")
    o.append("## 3 Brotne tilvisingar og andre funn frå sjekken")
    o.append("")
    if s.dobbel:
        o.append("### ID-ar som står meir enn éin gong")
        o.append("")
        for d in s.dobbel:
            o.append("- " + d)
        o.append("")
    if not s.brot and not s.dobbel:
        o.append("Ingenting.")
        o.append("")
    for bolk, liner in s.brot.items():
        o.append("### %s (%d)" % (bolk, len(liner)))
        o.append("")
        for l in liner:
            o.append("- " + l)
        o.append("")
    o.append("## 4 Motseiingar mellom faner")
    o.append("")
    if not logg["motseiingar"]:
        o.append("Ingenting.")
    for m in logg["motseiingar"]:
        st = (" (" + ", ".join(m["stader"]) + ")") if m.get("stader") else ""
        o.append("- " + m["tekst"] + st)
    o.append("")
    andre = [m for m in logg.get("merknader", []) if not m.startswith("Kontrollsum")]
    if andre:
        o.append("## Merknader")
        o.append("")
        for m in andre:
            o.append("- " + m)
        o.append("")
    with open(os.path.join(data, "rapport.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(o))


def main(argv):
    data = argv[1] if len(argv) > 1 else os.path.join(ROT, "data")
    s = Sjekk(data)
    s.køyr()
    skriv_rapport(s, data)
    nbrot = sum(len(v) for v in s.brot.values())
    print("Filer: %d" % len(s.filer))
    for namn, sti, venta, n in s.kontrollsummar():
        print("  %-30s %6s av %d" % (namn, "-" if n is None else n, venta))
    print("Doble ID-ar: %d" % len(s.dobbel))
    for bolk, l in s.brot.items():
        print("  %-40s %d" % (bolk, len(l)))
    print("Funn i alt: %d" % nbrot)
    return 1 if s.dobbel else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
