/* Lærarsida (larer/index.html): alle modulane med presentasjon og rettleiing,
   og kva kompetansemål kvar modul dekkjer. */
document.addEventListener("DOMContentLoaded", () => {
  const E = Larar.esc;
  const root = document.getElementById("larar-root");
  const DELNAMN = ["", "Språkhistorie og debatt", "Grammatikk og skrivereglar", "Ordbok og oppslag", "Skriving og tekstarbeid", "Lesing og tekstforståing"];

  const rad = m => {
    const l = Larar.get(m.id);
    const tal = l ? (l.slides || []).length + 1 : 0;
    const q = encodeURIComponent(m.id);
    return `<li>
      <div>
        <div class="tittel">${E(m.title)}</div>
        <div class="meta">${l ? `${tal} lysbilete${l.guide && l.guide.tid ? " · " + E(l.guide.tid) : ""}` : `<span class="larar-manglar">Ikkje laga enno</span>`}</div>
      </div>
      <div class="larar-knappar">
        ${l ? `<a class="btn small" href="larer/presentasjon.html?id=${q}" target="_blank" rel="noopener">Presentasjon</a>
        <a class="btn secondary small" href="larer/rettleiing.html?id=${q}">Rettleiing</a>` : ""}
        <a class="btn secondary small" href="${Larar.modulLenkje(m)}" target="_blank" rel="noopener">Elevmodul</a>
      </div>
    </li>`;
  };

  let html = "";
  for (let p = 1; p <= 5; p++) {
    html += `<section class="larar-del" id="del-${p}"><h2>Del ${p}: ${DELNAMN[p]}</h2>`;
    for (const { group, modules } of Modules.groupsFor(p)) {
      if (group) html += `<h3 class="larar-gruppe">${E(group.title)}</h3>`;
      html += `<ul class="larar-liste">${modules.map(rad).join("")}</ul>`;
    }
    html += `</section>`;
  }

  // Kompetansemål og modulane som dekkjer dei.
  const dekning = {};
  Larar.modular().forEach(m => {
    const l = Larar.get(m.id);
    ((l && l.guide && l.guide.lareplan) || []).forEach(n => { (dekning[n] = dekning[n] || []).push(m.title); });
  });
  html += `<section class="larar-del"><h2>Kompetansemål i kurset</h2>
    <p class="muted">${E(Larar.LAREPLAN.namn)}. Lista viser kva modular som arbeider med kvart mål. <a href="${Larar.LAREPLAN.url}" target="_blank" rel="noopener">Læreplanen på udir.no</a></p>
    <table class="km-tabell"><tbody>${Larar.LAREPLAN.mal.slice(1).map((t, i) => {
      const n = i + 1, mods = dekning[n] || [];
      return `<tr><td>${n}.</td><td>${E(t)}${mods.length ? `<div class="km-modular">${mods.map(E).join(" · ")}</div>` : `<div class="km-modular larar-manglar">Ikkje eit hovudmål i kurset</div>`}</td></tr>`;
    }).join("")}</tbody></table></section>`;

  root.insertAdjacentHTML("beforeend", html);
});
