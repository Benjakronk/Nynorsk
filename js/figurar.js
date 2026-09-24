/* Figurar og små animasjonar i modulane.

   Innhaldsfilene har figurar (bilete med tekst), tidslinjer, ordbygg-figurar
   og andre små diagram som rein HTML med klassar (sjå «Figurar» i
   css/style.css). Dette skriptet gjer tre ting:

   1. Let figurane gli inn når dei kjem til syne (klassen `synleg`), så ei
      side med mange figurar ikkje blinkar inn alt på ein gong.
   2. Startar animasjonane i element med `data-spel` når dei kjem til syne,
      og på nytt når eleven trykkjer «Spel av på nytt».
   3. Styrer V2-demonstrasjonen (`data-v2`): knappen flyttar adverbialet
      fremst, og verbalet blir ståande på andreplass.

   Føretrekkjer eleven mindre rørsle (prefers-reduced-motion), står alt i ro
   frå start, og knappane gjer ingenting anna enn å vise sluttilstanden. */
(function () {
  "use strict";
  const roleg = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function start(el) {
    el.classList.remove("spelar");
    void el.offsetWidth;   // tvingar ny omteikning, så animasjonen startar frå byrjinga
    el.classList.add("spelar");
  }

  // Modulsida byggjer seksjonane sjølv ved DOMContentLoaded, så figurane finst
  // ikkje før etterpå. modul.js kallar Figurar.init() når alt er teikna; som
  // reserve køyrer init òg like etter DOMContentLoaded.
  let starta = false;
  function init() {
    if (starta) return;
    starta = true;
    const alle = document.querySelectorAll(".figur, .tidslinje, .toliner, .ordbygg, .former, .leddsetning, .v2demo, .kjonnkort, .ordartikkel");
    if (roleg || !("IntersectionObserver" in window)) {
      alle.forEach(el => { el.classList.add("synleg"); if (el.hasAttribute("data-spel")) el.classList.add("spelar"); });
    } else {
      const io = new IntersectionObserver(entries => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("synleg");
          if (e.target.hasAttribute("data-spel")) start(e.target);
          io.unobserve(e.target);
        }
      }, { threshold: 0.25 });
      alle.forEach(el => io.observe(el));
    }

    document.querySelectorAll(".spel-btn").forEach(btn => {
      btn.addEventListener("click", () => start(btn.closest("[data-spel]")));
    });

    document.querySelectorAll("[data-v2]").forEach(demo => {
      const btn = demo.querySelector(".v2-btn"), forklar = demo.querySelector(".v2forklar");
      const ledd = [...demo.querySelectorAll(".ledd")];
      let flytta = false;
      btn.addEventListener("click", () => {
        flytta = !flytta;
        // Adverbialet fremst, verbalet på plass 2, subjektet etter.
        const [subj, verb, adv] = ledd;
        const rekkje = flytta ? [adv, verb, subj] : [subj, verb, adv];
        rekkje.forEach((el, i) => { el.style.order = i; el.dataset.plass = i + 1; });
        demo.classList.toggle("flytta", flytta);
        btn.textContent = flytta ? "Flytt «han» fremst att" : "Flytt «i går» fremst";
        forklar.innerHTML = flytta
          ? "No står adverbialet først, og subjektet <em class=\"nn\">han</em> må vike plass: <em class=\"nn\">I går <strong>kom han</strong></em>. Verbalet er framleis på andreplass."
          : "Verbalet <em class=\"nn\">kom</em> står på andreplass same kva som står først.";
      });
    });
  }
  window.Figurar = { init };
  document.addEventListener("DOMContentLoaded", () => setTimeout(init, 0));
})();
