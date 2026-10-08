/* Lyden i spelet: musikk, lydeffektar og miljølydar (prøve med lydane til fullversjonen).

   Filene ligg i lyd/musikk/ og lyd/sfx/ og er henta frå Aasen-spelet (aasen-musikk og aasen-sfx).
   Ei låt som loopar, er éi Ogg-fil med introen og loopen etter kvarandre. Looppunkta står i fila
   (LOOPSTART og LOOPLENGTH, i samplar), og Web Audio hoppar attende til LOOPSTART utan glipp.
   Ein lydeffekt med variantar (sfx.kamp.slag.1 til .3) får ein tilfeldig variant kvar gong.
   I manus er { lyd: "scene.klokke" } ein lydeffekt, { musikk: "id" } eit låtbyte og
   { stikk: "id" } eit stikk (spel.js).

     Lyd.kart(id)        musikken og miljølyden til kartet (KART_LYD under)
     Lyd.musikk(id)      byt låt (null tonar ut). Same låt som spelar, held fram
     Lyd.stikk(id)       eit stikk éin gong, og så låta som spela før
     Lyd.kamp(lag, boss) kampmusikken etter fiendane
     Lyd.sfx(id)         ein lydeffekt, til dømes "meny.peikar" (utan «sfx.» framfor)
     Lyd.av()            M slår lyden av og på, og valet blir hugsa

   Nettlesaren spelar ikkje lyd før spelaren har trykt på noko, så lyden startar ved første
   tastetrykk. Under automatiske testar (?test=1) er lyden heilt av. Utan nett, eller når sida er
   opna som fil, blir filene ikkje henta, og spelet går stille. */
window.Lyd = (function () {
  "use strict";
  const MAPPE = "lyd/";
  const TEST = /[?&]test=1/.test(location.search);
  const NOKKEL = "aasen-lyd";

  // Kart → låt og miljølyd
  const KART_LYD = {
    "asen": ["o_barndom", "miljo.tun"], "asen-stova": ["o_barndom", "miljo.klokke.stove"],
    "asen-stabbur": ["x_kjellarane"], "minne-far": ["sc_minne"],
    "utmarka": ["utmark", "miljo.skog"], "bygda": ["o_barndom", "miljo.tun"],
    "nedre-hovde": ["o_barndom", "miljo.klokke.stove"], "prestegarden": ["o_barndom", "miljo.klokke.stove"],
    "kyrkja": ["kirke"], "kyrkje-galleri": ["kirke"], "kyrkje-tarn": ["kirke"],
    "kontoret": ["d_blekk"], "arkivet": ["d_blekk"],
    "vegen": ["overworld", "miljo.skog"], "ekset": ["o_ekset", "miljo.tun"], "ekset-stova": ["o_ekset"],
  };
  // Bossar med eiga låt. Blekklatten er kanselliblekket, så han får låta for bossane frå eineveldet.
  const BOSS_LAAT = { kyrkjegrimen: "m_kyrkjegrimen", blekklatten: "danmark" };
  // Stikk som blir spela éin gong: sigerfanfaren og overnattinga (når Ivar søv i senga)
  const EIN_GONG = ["seier_fanfare", "m_overnatting"];
  // Lydeffektar med variantar (talet på filer)
  const VARIANTAR = { "kamp.slag": 3, "kamp.slag.tungt": 2 };
  const STYRKE = { musikk: 0.45, sfx: 0.7, miljo: 0.22 };

  let ctx = null, hovud = null, paa = true, laast = true;
  try { paa = localStorage.getItem(NOKKEL) !== "av"; } catch (e) { }
  const buffer = new Map();                                            // fil → Promise<{ buf, loop }>
  let spel = { musikk: null, miljo: null };                            // { id, kjelde, gain }
  let ynskt = { musikk: null, miljo: null };                           // det som skal spele når lyden er låst opp

  function lagCtx() {
    if (ctx || TEST) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    hovud = ctx.createGain(); hovud.gain.value = paa ? 1 : 0; hovud.connect(ctx.destination);
    return ctx;
  }

  // Looppunkta står i Vorbis-kommentaren (LOOPSTART=… LOOPLENGTH=…), og samplefrekvensen i hovudet.
  function looppunkt(ab) {
    const b = new Uint8Array(ab, 0, Math.min(ab.byteLength, 8192));
    let s = ""; for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
    const st = /LOOPSTART=(\d+)/.exec(s), ln = /LOOPLENGTH=(\d+)/.exec(s), v = s.indexOf("\x01vorbis");
    if (!st || !ln) return null;
    const rate = v >= 0 ? new DataView(ab).getUint32(v + 12, true) : 44100;
    return { start: +st[1] / rate, slutt: (+st[1] + +ln[1]) / rate };
  }
  // XMLHttpRequest i staden for fetch, så testverktøya (Edge med tilgang til lokale filer) òg kan hente.
  function hent(fil) {
    if (buffer.has(fil)) return buffer.get(fil);
    const p = new Promise((res, rej) => {
      const x = new XMLHttpRequest();
      x.open("GET", MAPPE + fil); x.responseType = "arraybuffer";
      x.onload = () => (x.status === 200 || x.status === 0) && x.response ? res(x.response) : rej(new Error(fil));
      x.onerror = () => rej(new Error(fil));
      x.send();
    }).then(ab => {
      const loop = looppunkt(ab);
      return new Promise((res, rej) => ctx.decodeAudioData(ab, buf => res({ buf, loop }), rej));
    });
    p.catch(() => buffer.delete(fil));                                  // prøv att neste gong
    buffer.set(fil, p);
    return p;
  }

  function ton(g, til, ms) {
    const t = ctx.currentTime;
    g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(g.gain.value, t);
    g.gain.linearRampToValueAtTime(til, t + ms / 1000);
  }
  // Spel ei låt eller ein miljølyd i eit spor («musikk» eller «miljo»), med toning mellom dei.
  // etter blir kalla når ei låt som ikkje loopar, er ferdig (og ingen har bytt ho ut).
  function spor(namn, id, fil, loopHeile, etter) {
    ynskt[namn] = id;
    if (!ctx || laast) return;
    const no = spel[namn];
    if (no && no.id === id) return;
    if (no) { ton(no.gain, 0, 500); const k = no.kjelde; setTimeout(() => { try { k && k.stop(); } catch (e) { } }, 600); spel[namn] = null; }
    if (!id) return;
    const ny = { id, kjelde: null, gain: ctx.createGain() };
    ny.gain.gain.value = 0; ny.gain.connect(hovud);
    spel[namn] = ny;
    hent(fil).then(({ buf, loop }) => {
      if (spel[namn] !== ny) return;                                   // bytt igjen medan fila vart henta
      const k = ctx.createBufferSource(); k.buffer = buf;
      if (loop) { k.loop = true; k.loopStart = loop.start; k.loopEnd = loop.slutt; } else if (loopHeile) k.loop = true;
      k.connect(ny.gain); k.start();
      ny.kjelde = k;
      ton(ny.gain, STYRKE[namn], 400);
      if (!k.loop) k.onended = () => { if (spel[namn] === ny) { spel[namn] = null; if (etter) etter(); } };
    }).catch(() => { });
  }

  const Lyd = {
    // Ei låt utan looppunkt (tittellåta) blir spela heilt og byrjar på nytt. Stikka blir spela éin gong.
    musikk(id) { spor("musikk", id || null, "musikk/" + id + ".ogg", !EIN_GONG.includes(id)); },
    // Eit stikk (til dømes overnattinga): spelar éin gong, og så kjem låta som spela før, att.
    stikk(id) {
      const for_ = spel.musikk ? spel.musikk.id : ynskt.musikk;
      spor("musikk", id, "musikk/" + id + ".ogg", false, () => Lyd.musikk(for_));
    },
    miljo(id) { spor("miljo", id || null, "sfx/sfx." + id + ".ogg", true); },
    kart(id) {
      const [m = null, mi = null] = KART_LYD[id] || [];
      if (m) Lyd.musikk(m);                                             // kart utan oppføring held fram med det som spelar
      Lyd.miljo(mi);
    },
    kamp(lag, boss) {
      const b = (lag || []).map(f => BOSS_LAAT[f]).find(Boolean);
      Lyd.miljo(null);
      Lyd.musikk(b || (boss ? "boss" : "kamp"));
    },
    sfx(id) {
      if (!ctx || laast || !paa) return;
      const n = VARIANTAR[id];
      const fil = "sfx/sfx." + id + (n ? "." + (1 + Math.floor(Math.random() * n)) : "") + ".ogg";
      hent(fil).then(({ buf }) => {
        const k = ctx.createBufferSource(), g = ctx.createGain();
        k.buffer = buf; g.gain.value = STYRKE.sfx; k.connect(g); g.connect(hovud); k.start();
      }).catch(() => { });
    },
    av() {
      paa = !paa;
      try { localStorage.setItem(NOKKEL, paa ? "pa" : "av"); } catch (e) { }
      if (ctx) ton(hovud, paa ? 1 : 0, 150);
      return paa;
    },
    get paa() { return paa; },
    // Til tools/sjekk-spel.js, som sjekkar at filene finst og at looppunkta ligg innanfor fila.
    kjelder: { KART_LYD, BOSS_LAAT, VARIANTAR, EIN_GONG, faste: ["tittel", "kamp", "boss", ...EIN_GONG] },
  };
  // Lås opp ved første trykk: lag lydkonteksten og start det som skal spele.
  const lasOpp = () => {
    if (TEST || !laast) return;
    if (!lagCtx()) return;
    const ferdig = () => {
      laast = false;
      const { musikk, miljo } = ynskt; ynskt = { musikk: null, miljo: null };
      Lyd.musikk(musikk); Lyd.miljo(miljo);
    };
    ctx.state === "suspended" ? ctx.resume().then(ferdig, ferdig) : ferdig();
  };
  window.addEventListener("keydown", e => {
    if (e.key === "m" || e.key === "M") { if (!e.repeat) Lyd.av(); return; }
    lasOpp();
  }, true);
  window.addEventListener("pointerdown", lasOpp, true);
  return Lyd;
})();
