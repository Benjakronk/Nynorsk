/* Lærarrettleiing for éin modul (larer/rettleiing.html?id=<modul>). */
document.addEventListener("DOMContentLoaded", () => {
  const E = Larar.esc;
  const id = new URLSearchParams(location.search).get("id");
  const root = document.getElementById("rett-root");
  const m = id ? Modules.get(id) : null;
  const entry = id ? Larar.get(id) : null;
  if (!m || !entry) {
    root.innerHTML = `<h1>Fann ikkje rettleiinga</h1><p><a href="larer/index.html">Tilbake til lærarsida</a></p>`;
    return;
  }
  const g = entry.guide || {};
  document.title = `Rettleiing: ${m.title} · Nynorskkurs`;

  const liste = (arr, kl) => arr && arr.length ? `<ul${kl ? ` class="${kl}"` : ""}>${arr.map(x => `<li>${x}</li>`).join("")}</ul>` : "";
  const seksjon = (tittel, html) => html ? `<section class="rett-seksjon"><h2>${tittel}</h2>${html}</section>` : "";
  const reintekst = h => String(h || "").replace(/<[^>]+>/g, "");

  const slides = [{ title: m.title, notes: entry.tittelnotat }].concat(entry.slides || []);
  const meta = [
    g.tid ? E(g.tid) : "",
    `${slides.length} lysbilete`,
    m.estimatedMinutes ? `om lag ${m.estimatedMinutes} min for eleven i modulen` : "",
  ].filter(Boolean).join(" · ");

  // Skuletimane er på 45 minutt. Går modulen over fleire økter, får kvar økt si eiga overskrift i tabellen.
  const okt = (() => {
    if (!g.okt || !g.okt.length) return "";
    const total = g.okt.reduce((s, f) => s + (Number(f.min) || 0), 0);
    const økter = Math.max(1, Math.round(total / 45));
    let akk = 0, nr = 1, rader = "";
    g.okt.forEach((f, i) => {
      if (økter > 1 && (i === 0 || akk === 45 * (nr - 1))) rader += `<tr class="okt-skilje"><td colspan="3">Økt ${nr++}</td></tr>`;
      akk += Number(f.min) || 0;
      rader += `
        <tr><td>${E(String(f.fase).replace(/^Økt \d+:\s*/, "").replace(/^./, c => c.toUpperCase()))}</td><td class="min">${f.min ? `${f.min} min` : ""}</td>
        <td>${f.gjer}${f.lysbilete ? `<span class="okt-lb">Lysbilete ${E(f.lysbilete)}</span>` : ""}</td></tr>`;
    });
    return `
    <table class="okt-tabell">
      <thead><tr><th>Fase</th><th>Tid</th><th>Kva de gjer</th></tr></thead>
      <tbody>${rader}</tbody>
    </table>
    <p class="liten muted">Samla tid: ${total} minutt${økter > 1 ? `, fordelt på ${økter} økter à 45 minutt` : ""}.</p>`;
  })();

  const km = g.lareplan && g.lareplan.length ? `
    <p class="muted">Frå ${E(Larar.LAREPLAN.namn)}. Mål for opplæringa er at eleven skal kunne</p>
    <ul class="km-liste">${g.lareplan.map(n => `<li><span class="km-nr">${n}.</span>${E(Larar.LAREPLAN.mal[n])}</li>`).join("")}</ul>
    <p class="liten"><a href="${Larar.LAREPLAN.url}" target="_blank" rel="noopener">Heile læreplanen på udir.no</a></p>` : "";

  const miss = g.misoppfatningar && g.misoppfatningar.length ? `<ul class="misopp">${g.misoppfatningar.map(x => `<li><span class="feil">${x.feil}</span><br>${x.hjelp}</li>`).join("")}</ul>` : "";

  const tilp = g.tilpassing ? `
    <div class="to-kol-rett">
      <div class="kort"><h3>Støtte</h3>${liste(g.tilpassing.stotte)}</div>
      <div class="kort"><h3>Utfordring</h3>${liste(g.tilpassing.utfordring)}</div>
    </div>` : "";

  const manus = `<ol class="manus">${slides.map((s, i) => `
    <li><span class="manus-tittel">${E(reintekst(s.title) || (s.type === "sporsmal" ? "Kva trur du?" : s.type === "drill" ? "Tavleøving" : "Lysbilete " + (i + 1)))}</span>
    ${s.notes ? `<div class="manus-notat">${/^\s*</.test(s.notes) ? s.notes : `<p>${s.notes}</p>`}</div>` : ""}</li>`).join("")}</ol>`;

  const fasit = Larar.fasit(m);
  const fasitHtml = fasit.length ? fasit.map(f => `
    <div class="fasit-oppg">
      <h3>Oppgåve ${f.nr} · ${E(f.type)}${f.tittel ? `: ${E(f.tittel)}` : ""}</h3>
      ${f.html}
      ${f.forklaring ? `<p class="fasit-forklar">${f.forklaring}</p>` : ""}
    </div>`).join("") : `<p class="muted">Oppgåvene i denne modulen er skriveoppgåver eller mengdetrening med nye oppgåver kvar gong, så dei har ingen fast fasit.</p>`;

  root.innerHTML = `
    <div class="crumbs">${E(Larar.kicker(m))} · Lærarrettleiing</div>
    <h1>${E(m.title)}</h1>
    <p class="summary">${E(m.summary)}</p>
    <p class="muted">${meta}</p>
    <div class="rett-topp">
      <a class="btn" href="larer/presentasjon.html?id=${encodeURIComponent(m.id)}" target="_blank" rel="noopener">Start presentasjonen</a>
      <a class="btn secondary" href="${Larar.modulLenkje(m)}" target="_blank" rel="noopener">Opne elevmodulen</a>
      <button type="button" class="btn secondary" onclick="window.print()">Skriv ut</button>
      <a class="btn secondary" href="larer/index.html">Alle modulane</a>
    </div>
    ${seksjon("Om modulen", g.intro || "")}
    ${seksjon("Læringsmål", liste(g.mal))}
    ${seksjon("Kompetansemål", km)}
    ${seksjon("Førehandskunnskapar og førebuing", (g.forkunnskapar ? `<p>${g.forkunnskapar}</p>` : "") + liste(g.forebuing))}
    ${seksjon("Forslag til økt", okt)}
    ${seksjon("Vanlege misoppfatningar", miss)}
    ${seksjon("Samtalespørsmål", liste(g.samtale))}
    ${seksjon("Tilpassa opplæring", tilp)}
    ${seksjon("Vurdering", liste(g.vurdering))}
    ${seksjon("Vidare arbeid", g.vidare ? `<p>${g.vidare}</p>` : "")}
    ${seksjon("Elevmodulen", `<p>${m.sections.filter(s => s.type === "lesson").length} fagtekstar og ${Modules.exerciseCount(m)} oppgåver: ${Larar.oppgaveTal(m).join(", ")}.</p>`)}
    ${seksjon("Manus: lysbileta med notat", manus)}
    ${seksjon("Fasit til elevmodulen", fasitHtml)}
  `;
});
