/* Lærarsida: register for vurderingane til kvar del av kurset.

   Kvar fil i larer/js/vurdering/ kallar Vurdering.register(del, { … }) éin gong.
   Formatet er skildra i larer/README.md under «Vurdering», og sida som viser
   innhaldet er larer/vurdering.html?del=<1 til 5>. */

const Vurdering = (() => {
  const data = {};

  function register(del, entry) {
    if (data[del]) throw new Error(`Vurderinga for del ${del} er registrert to gonger`);
    data[del] = entry;
  }
  function get(del) { return data[del] || null; }
  function delar() { return Object.keys(data).map(Number).sort((a, b) => a - b); }

  // Dei tre nivåa i kjenneteikna, i same rekkjefølgje som kolonnane i skjemaa.
  const NIVA = [
    { id: "lag", namn: "Låg måloppnåing", karakter: "karakter 2" },
    { id: "middels", namn: "Middels måloppnåing", karakter: "karakter 3 og 4" },
    { id: "hog", namn: "Høg måloppnåing", karakter: "karakter 5 og 6" },
  ];

  const TYPAR = {
    skriftleg: "Skriftleg prøve",
    skriving: "Skriveoppgåve",
    munnleg: "Munnleg vurdering",
    praktisk: "Praktisk prøve",
  };

  return { register, get, delar, NIVA, TYPAR };
})();

if (typeof module !== "undefined" && module.exports) module.exports = Vurdering;
