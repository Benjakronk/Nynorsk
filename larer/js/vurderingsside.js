/* Vurderingane til éin del av kurset (larer/vurdering.html?del=<1 til 5>).
   Innhaldet kjem frå larer/js/vurdering/del*.js, sjå larer/README.md. */
document.addEventListener("DOMContentLoaded", () => {
  const E = Larar.esc;
  const N = Vurdering.NIVA;
  const DELNAMN = ["", "Språkhistorie og debatt", "Grammatikk og skrivereglar", "Ordbok og oppslag", "Skriving og tekstarbeid", "Lesing og tekstforståing"];
  const root = document.getElementById("vurd-root");
  const del = Number(new URLSearchParams(location.search).get("del"));
  const v = Vurdering.get(del);
  if (!v) {
    root.innerHTML = `<h1>Fann ikkje vurderinga</h1><p><a href="larer/index.html">Tilbake til lærarsida</a></p>`;
    return;
  }
  document.title = `Vurdering: Del ${del} · Nynorskkurs`;

  const liste = arr => arr && arr.length ? `<ul>${arr.map(x => `<li>${x}</li>`).join("")}</ul>` : "";
  const seksjon = (id, tittel, html) => html ? `<section class="rett-seksjon" id="${id}"><h2>${tittel}</h2>${html}</section>` : "";
  const avsnitt = h => h ? (/^\s*</.test(h) ? h : `<p>${h}</p>`) : "";

  const skjema = rader => rader && rader.length ? `
    <table class="vurd-skjema">
      <thead><tr><th>Vurderingsområde</th>${N.map(n => `<th>${n.namn}<span>${n.karakter}</span></th>`).join("")}</tr></thead>
      <tbody>${rader.map(r => `<tr><th scope="row">${r.omrade}</th>${N.map(n => `<td>${r[n.id]}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>` : "";

  const km = nr => `<ul class="km-liste">${nr.map(n => `<li><span class="km-nr">${n}.</span>${E(Larar.LAREPLAN.mal[n])}</li>`).join("")}</ul>`;

  const modulTittel = id => { const m = Modules.get(id); return m ? m.title : id; };

  // Sluttvurderingane: elevark, fasit og vurderingsskjema.
  const prove = p => {
    const merke = [Vurdering.TYPAR[p.type] || p.type, p.tid, p.form, p.hjelpemiddel].filter(Boolean)
      .map(t => `<span class="vurd-merke">${E(t)}</span>`).join("");
    const poeng = p.poeng ? `
      <p class="vurd-poeng"><strong>Poeng:</strong> ${p.poeng.maks} i alt. ${N.map(n => `${n.namn}: ${E(p.poeng[n.id])}`).join(". ")}.
      Poenggrensene er rettleiande. Sjå heile svaret før du set nivå.</p>` : "";
    return `
    <article class="vurd-prove" id="prove-${E(p.id)}">
      <h3>${p.tittel}</h3>
      <div class="vurd-merkerad">${merke}${p.karaktergrunnlag ? `<span class="vurd-merke vurd-merke-karakter">Kan inngå i karaktergrunnlaget</span>` : `<span class="vurd-merke">Undervegsvurdering</span>`}</div>
      ${p.modular && p.modular.length ? `<p class="liten muted">Byggjer på: ${p.modular.map(id => E(modulTittel(id))).join(" · ")}</p>` : ""}
      ${p.lareplan && p.lareplan.length ? `<p class="liten muted">Kompetansemål: ${p.lareplan.join(", ")}</p>` : ""}
      ${avsnitt(p.lararinfo)}
      <div class="rett-topp">
        <button type="button" class="btn small" data-skriv="elev-${E(p.id)}">Skriv ut elevarket</button>
        <button type="button" class="btn secondary small" data-skriv="larar-${E(p.id)}">Skriv ut fasit og skjema</button>
      </div>
      <div class="vurd-ark" id="elev-${E(p.id)}">
        <div class="vurd-ark-topp"><span>${E(p.tittel.replace(/<[^>]+>/g, ""))}</span><span>Namn: ______________________</span></div>
        ${p.elevark}
      </div>
      <div id="larar-${E(p.id)}">
        <h4 class="vurd-utskrift-tittel">${p.tittel}: fasit og vurderingsskjema</h4>
        ${p.fasit ? `<details class="vurd-fasit"><summary>Fasit og rettleiing</summary>${p.fasit}</details>` : ""}
        ${poeng}
        ${skjema(p.skjema)}
      </div>
    </article>`;
  };

  // Undervegsvurdering til kvar modul i delen, i kursrekkjefølgje.
  const undervegs = () => {
    let html = "";
    for (const { group, modules } of Modules.groupsFor(del)) {
      const kort = modules.filter(m => v.undervegs && v.undervegs[m.id]).map(m => {
        const u = v.undervegs[m.id];
        const q = encodeURIComponent(m.id);
        return `
        <article class="vurd-modul" id="m-${E(m.id)}">
          <h4>${E(m.title)}</h4>
          <div class="vurd-merkerad">
            <span class="vurd-merke">${E(u.tittel)}</span>
            ${u.tid ? `<span class="vurd-merke">${u.tid} min</span>` : ""}
            ${u.form ? `<span class="vurd-merke">${E(u.form)}</span>` : ""}
            <a class="vurd-lenkje" href="larer/rettleiing.html?id=${q}">Rettleiinga</a>
          </div>
          <div class="vurd-ark vurd-ark-liten" id="u-${E(m.id)}">${u.oppgave}</div>
          ${u.fasit ? `<details class="vurd-fasit"><summary>Fasit</summary>${u.fasit}</details>` : ""}
          <div class="vurd-to-kol">
            <div><h5>Sjå etter</h5>${liste(u.sjaa)}</div>
            <div><h5>Framovermelding</h5>${avsnitt(u.framover)}</div>
          </div>
          <button type="button" class="btn secondary small" data-skriv="u-${E(m.id)}">Skriv ut oppgåva</button>
        </article>`;
      }).join("");
      if (!kort) continue;
      if (group) html += `<h3 class="larar-gruppe">${E(group.title)}</h3>`;
      html += kort;
    }
    return html;
  };

  const eigen = v.eigenvurdering && v.eigenvurdering.length ? `
    <p>Eleven kryssar av før og etter arbeidet med delen. Skjemaet er ein samtalereiskap, ikkje eit grunnlag for karakter.</p>
    <div class="vurd-ark" id="eigen">
      <div class="vurd-ark-topp"><span>Eigenvurdering: Del ${del}, ${E(DELNAMN[del])}</span><span>Namn: ______________________</span></div>
      <table class="vurd-eigen">
        <thead><tr><th>Eg kan …</th><th>Ikkje enno</th><th>Delvis</th><th>Ja</th></tr></thead>
        <tbody>${v.eigenvurdering.map(t => `<tr><td>${t}</td><td></td><td></td><td></td></tr>`).join("")}</tbody>
      </table>
      <p class="vurd-skrivelinje">Dette vil eg øve meir på:</p>
      <p class="vurd-skrivelinje">Slik skal eg gjere det:</p>
    </div>
    <div class="rett-topp"><button type="button" class="btn secondary small" data-skriv="eigen">Skriv ut eigenvurderinga</button></div>` : "";

  const forDelar = Vurdering.delar().map(d => d === del
    ? `<strong>Del ${d}</strong>`
    : `<a href="larer/vurdering.html?del=${d}">Del ${d}</a>`).join(" · ");

  root.innerHTML = `
    <div class="crumbs">${E(Larar.DELAR[del])} · Vurdering</div>
    <h1>Vurdering: ${E(DELNAMN[del])}</h1>
    <p class="muted">${forDelar}</p>
    <div class="rett-topp">
      <a class="btn secondary" href="larer/index.html#del-${del}">Modulane i delen</a>
      <button type="button" class="btn secondary" onclick="window.print()">Skriv ut heile sida</button>
    </div>
    <nav class="vurd-innhald" aria-label="Innhald">
      <a href="#om">Om vurderinga</a>
      <a href="#kjenneteikn">Kjenneteikn</a>
      <a href="#provar">Sluttvurdering</a>
      <a href="#undervegs">Undervegsvurdering</a>
      ${eigen ? `<a href="#eigenvurdering">Eigenvurdering</a>` : ""}
    </nav>
    ${seksjon("om", "Om vurderinga", avsnitt(v.intro) + `
      <div class="callout vurd-prinsipp">
        <p><strong>Vurdering i sidemål.</strong> Grunnlaget for vurderinga er kompetansemåla. Innsats, føresetnader, fråvær og åtferd skal ikkje vere med. Kompetansen i skriftleg sidemål viser seg først og fremst i tekstar eleven skriv sjølv, så dei isolerte grammatikkoppgåvene viser berre ein del av han. På 8. og 9. trinn går sidemålet inn i den felles karakteren i norsk skriftleg, og på 10. trinn får eleven ein eigen standpunktkarakter i norsk skriftleg sidemål. Læreplanen seier at læraren skal «ta omsyn til at elevane har hatt lengre tid med formell opplæring i hovudmål enn i sidemål». Ein tekst skriven på bokmål i ei sidemålsoppgåve viser ikkje kompetanse i sidemål.</p>
      </div>`)}
    ${seksjon("kompetansemal", "Kompetansemål", `<p class="muted">Frå ${E(Larar.LAREPLAN.namn)}. Mål for opplæringa er at eleven skal kunne</p>${km(v.lareplan)}<p class="liten"><a href="${Larar.LAREPLAN.url}" target="_blank" rel="noopener">Heile læreplanen på udir.no</a></p>`)}
    ${seksjon("kjenneteikn", "Kjenneteikn på måloppnåing", avsnitt(v.kompetanse) + skjema(v.kjenneteikn) + `<p class="liten muted">Kjenneteikna er rettleiande og byggjer på kjenneteikna til Utdanningsdirektoratet for norsk etter 10. trinn. Dei skildrar kompetanse ved slutten av opplæringa, så elevar på 8. og 9. trinn vil ofte liggje lågare utan at det er grunn til uro.</p>`)}
    ${seksjon("provar", "Sluttvurdering", `<p>Vurderingar som samlar det eleven har arbeidd med i delen. Elevarket kan skrivast ut åleine, og fasiten med vurderingsskjemaet kan skrivast ut for seg.</p>` + (v.provar || []).map(prove).join(""))}
    ${seksjon("undervegs", "Undervegsvurdering til kvar modul", `<p>Korte oppgåver til slutten av ei økt, til dømes som exit-lapp. Dei viser kva eleven meistrar no, og gir grunnlag for framovermelding. Kort og ofte er betre enn langt og sjeldan.</p>` + undervegs())}
    ${seksjon("eigenvurdering", "Eigenvurdering", eigen)}
  `;

  // Utskrift av éin bit: kopien blir lagd i #utskrift, og CSS-en skriv berre ut han.
  const ut = document.getElementById("utskrift");
  root.addEventListener("click", e => {
    const b = e.target.closest("[data-skriv]");
    if (!b) return;
    const kjelde = document.getElementById(b.dataset.skriv);
    if (!kjelde) return;
    ut.innerHTML = kjelde.outerHTML;
    ut.querySelectorAll("details").forEach(d => { d.open = true; });
    document.body.classList.add("skriv-bit");
    window.print();
  });
  window.addEventListener("afterprint", () => {
    document.body.classList.remove("skriv-bit");
    ut.innerHTML = "";
  });
  // Heile sida: opne fasitane så dei kjem med på papiret.
  window.addEventListener("beforeprint", () => {
    if (!document.body.classList.contains("skriv-bit")) root.querySelectorAll("details").forEach(d => { d.open = true; });
  });
});
