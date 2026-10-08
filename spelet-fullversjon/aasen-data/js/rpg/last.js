/* Lastar datafilene til Aasen-spelet.

   Datafilene blir laga av tools/importer.py frå designdokumentet. Lista over
   filer står i data/filer.json, så lastaren treng ikkje vite kva faner,
   epokar eller delar som finst.

   Bruk:
     Spelsdata.last("data/").then(function (d) {
       d.ord.oppslag            // liste med dei 527 oppslaga
       d.verda.stader.christiania.skjermar
       Spelsdata.finn("ting", "flatbrod")
       Spelsdata.finn("skjerm", "ASN-01")
     });

   Resultatet ligg òg i window.Spelsdata.data når lastinga er ferdig.
   Lastaren gjer ingen utrekningar. Formlane står i koden til spelet. */
(function () {
  "use strict";

  var Spelsdata = { data: null, indeks: {} };

  function hent(sti) {
    return fetch(sti).then(function (svar) {
      if (!svar.ok) {
        throw new Error("Fann ikkje " + sti + " (" + svar.status + ")");
      }
      return svar.json();
    });
  }

  /* «verda/stader/christiania.json» blir lagd på d.verda.stader.christiania */
  function legg(rot, sti, innhald) {
    var deler = sti.replace(/\.json$/, "").split("/");
    var node = rot;
    for (var i = 0; i < deler.length - 1; i++) {
      if (!node[deler[i]]) node[deler[i]] = {};
      node = node[deler[i]];
    }
    node[deler[deler.length - 1]] = innhald;
  }

  function leggIndeks(eining, liste) {
    if (!Array.isArray(liste)) return;
    var ix = Spelsdata.indeks[eining] || (Spelsdata.indeks[eining] = {});
    for (var i = 0; i < liste.length; i++) {
      var p = liste[i];
      if (p && p.id !== undefined && p.id !== null) ix[p.id] = p;
    }
  }

  /* Oppslag på id. Eining er t.d. «oppslag», «ting», «utstyr», «fiende»,
     «boss», «skjerm», «kiste», «scene», «oppdrag», «flagg», «sfx», «sone». */
  function byggIndeksar(d) {
    var g = function (sti) {
      var node = d;
      var deler = sti.split(".");
      for (var i = 0; i < deler.length; i++) {
        if (!node) return null;
        node = node[deler[i]];
      }
      return node;
    };
    leggIndeks("oppslag", g("ord.oppslag"));
    leggIndeks("lydfamilie", g("ord.familiar"));
    leggIndeks("trekk", g("ord.trekk"));
    leggIndeks("figur", g("figurar.figurar"));
    leggIndeks("evne", g("figurar.evner"));
    leggIndeks("fiendefamilie", g("fiendar.familiar"));
    leggIndeks("fiende", g("fiendar.vanlege"));
    leggIndeks("fiende", g("fiendar.namngjevne"));
    leggIndeks("boss", g("fiendar.bossar"));
    leggIndeks("ting", g("ting.ting"));
    leggIndeks("utstyr", g("ting.utstyr"));
    leggIndeks("butikktype", g("ting.butikktypar"));
    leggIndeks("ventekiste", g("ting.ventekister"));
    leggIndeks("status", g("system.statusar"));
    leggIndeks("flagg", g("system.flagg"));
    leggIndeks("sfx", g("lyd.sfx"));
    leggIndeks("oppdrag", g("manus.sideoppdrag"));
    var epokar = g("system.epokar");
    if (epokar) leggIndeks("epoke", epokar.epokar);
    var dag = g("manus.dagboka");
    if (dag) {
      leggIndeks("dagbokside", dag.sider);
      leggIndeks("spor", dag.spor);
    }
    var k;
    var mote = g("fiendar.mote") || {};
    for (k in mote) leggIndeks("sone", mote[k]);
    var scener = g("manus.scener") || {};
    for (k in scener) leggIndeks("scene", scener[k]);
    var stader = g("verda.stader") || {};
    for (k in stader) {
      leggIndeks("stad", stader[k].stader);
      leggIndeks("skjerm", stader[k].skjermar);
      leggIndeks("skjerm", stader[k].rom);
      leggIndeks("kiste", stader[k].kister);
    }
    /* Skjermar som står i to faner: den andre ID-en peikar på den same skjermen. */
    var sk = Spelsdata.indeks.skjerm || {};
    for (k in sk) {
      var alias = sk[k].alias || [];
      for (var i = 0; i < alias.length; i++) sk[alias[i]] = sk[k];
    }
  }

  Spelsdata.last = function (base) {
    base = base || "data/";
    if (base.charAt(base.length - 1) !== "/") base += "/";
    return hent(base + "filer.json").then(function (liste) {
      var filer = liste.filer.filter(function (f) { return f !== "filer.json"; });
      return Promise.all(filer.map(function (f) { return hent(base + f); })).then(function (innhald) {
        var d = {};
        for (var i = 0; i < filer.length; i++) legg(d, filer[i], innhald[i]);
        Spelsdata.data = d;
        Spelsdata.indeks = {};
        byggIndeksar(d);
        return d;
      });
    });
  };

  Spelsdata.finn = function (eining, id) {
    var ix = Spelsdata.indeks[eining];
    return ix ? (ix[id] || null) : null;
  };

  window.Spelsdata = Spelsdata;
})();
