/* «Blekkrannet»: eit lite spel om Ivar Aasen, bygd på kurset (spel.html).

   Ein blekklatt, fire hundre år med dansk kanselliskrift, har ete opp
   dialektorda, og orda har flykta ut i landskapet. Aasen går ruta si frå
   1842 til 1847 og fangar dei att. Kvart stopp på ruta er eit nivå med eit
   minispel (js/spel-minispel.js), og to av stoppa har ein boss.

   Verdskartet er 3D-kartet frå «Reisene til Ivar Aasen» (js/kart3d.js), med
   dei same stadene og den same figuren. Når eit nivå er klart første gong,
   går Aasen etappen til neste stopp, og neste nivå opnar seg.

   Ordboka: kvart substantiv og sterkt verb eleven svarer rett på, blir
   fanga. Evner: fullførte modular i kurset (lagra av js/storage.js) gjer
   minispela litt lettare. Spelet har sin eigen lagringsnøkkel i
   localStorage, så det kan nullstillast utan å røre framdrifta i kurset. */
(function () {
  "use strict";
  const E = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const STADER = window.AASEN_REISE.stader;

  /* ---------- Nivåa ---------- */
  const TYPENAMN = { kjonn: "Kjønnsportane", vokal: "Vokalskifte-trolldom", v2: "V2-brua", val: "Rytmeval", boss: "Bosskamp" };
  const NIVAA = [
    {
      stad: "aasen", aar: "Hausten 1842", tittel: "Blekkrannet",
      tekst: "Ein haustkveld i 1842 veltar noko i ei skuff: ein blekklatt, fire hundre år gammal og full av dansk kanselliskrift. Han et alle orda han finn. Orda flyktar ut i lyngen. Ivar tek skreppa og notatboka. Orda vil berre bli med heim om du kjenner kjønnet deira.",
      spel: { type: "kjonn", n: 10, falltid: 7000 },
    },
    {
      stad: "sogndal", aar: "Vinteren 1842–43", tittel: "Dei frosne verba",
      rute: ["aasen", "nordfjordeid", "forde", "vadheim", "sogndal"],
      tekst: "Vinteren i Sogn er så kald at verba har frose fast i fortida. Berre den som kan vokalskiftet, tinar dei opp att: drikk, drakk, drukke.",
      spel: { type: "vokal", n: 10, tasks: ["pret"], tid: 10000 },
    },
    {
      stad: "bergen", aar: "1843", tittel: "Byklokka i Bergen",
      rute: ["sogndal", "vik", "sygnefest", "eivindvik", "bergen"],
      tekst: "Blekklatten har søla på byklokka i Bergen. No veit ingen om noko skjedde éin gong, eller om det skjer kvar gong. Hjelp bergensarane: den gongen då, kvar gong når.",
      spel: { type: "val", n: 9, sett: ["daNar"], tid: 8000 },
    },
    {
      stad: "voss", aar: "Våren 1844", tittel: "Brua over Vosso",
      rute: ["bergen", "vaksdal", "evanger", "voss"],
      tekst: "Blekklatten har rive laus plankane i brua over elva. Setningane rasar ut i straumen om ikkje verbalet står på plass to.",
      spel: { type: "v2", n: 6, tid: 30000 },
    },
    {
      stad: "mossige", aar: "Hausten 1844", tittel: "Ordflokken på Jæren",
      rute: ["voss", "granvin", "ullensvang", "skanevik", "etne", "sandeid", "stavanger", "mossige"],
      tekst: "På Jæren har orda gøymt seg mellom sauene. No kjem heile flokken springande over lyngmoen, fortare enn før.",
      spel: { type: "kjonn", n: 14, falltid: 5200 },
    },
    {
      stad: "kristiansand", aar: "Hausten 1844", tittel: "Sildesalaten",
      rute: ["mossige", "egersund", "flekkefjord", "mandal", "sogne", "kristiansand"],
      tekst: "I 1844 fekk det norske og det svenske flagget eit felles unionsmerke i hjørnet. Folk kalla det «sildesalaten». Men blekklatten har blåst liv i merket. No ligg ein sildesalat på torget i Kristiansand og kastar sild på alle som skriv norsk.",
      spel: {
        type: "boss", boss: "sildesalat", bossnamn: "Sildesalaten", hp: 10,
        typar: [{ type: "kjonn", falltid: 6000 }, { type: "vokal", tasks: ["pret"], tid: 9000 }, { type: "val", sett: ["daNar"], tid: 8000 }],
        replikkar: ["Eg er eit sameiningsmerke! Eg sameinar alt!", "Sild! Sild til alle!", "Du skriv jo nesten dansk uansett.", "Eitt flagg, to land, éi salat!", "Blanda er best!"],
      },
    },
    {
      stad: "homme", aar: "Desember 1844", tittel: "Stabburet i Valle",
      rute: ["kristiansand", "haegeland", "longerak", "homme"],
      tekst: "Midt på vinteren kjem Ivar opp Setesdalen. Stabburet i Valle er fullt av verb som har gløymt korleis dei blir bøygde. Nokre står i går, andre har vore.",
      spel: { type: "vokal", n: 12, tasks: ["pret", "perf"], tid: 9000 },
    },
    {
      stad: "seljord", aar: "1845", tittel: "Seljordsormen",
      rute: ["homme", "nissedal", "seljord"],
      tekst: "Seljordsormen i vatnet har slukt alle «ikkje» i bygda og spyr dei ut att på feil stad. I leddsetningar skal «ikkje» stå framfor verbalet.",
      spel: { type: "val", n: 10, sett: ["ikkjePlass"], tid: 11000 },
    },
    {
      stad: "christiania", aar: "1847", tittel: "Blekklatten",
      rute: ["seljord", "heddal", "kongsberg", "christiania"],
      tekst: "Aasen flyttar til Christiania. Der, i ei skuff i eit departement, ligg blekklatten og ventar. Han har ete så mange ord at han er stor som ein okse.",
      spel: {
        type: "boss", boss: "blekk", bossnamn: "Blekklatten", hp: 14,
        typar: [{ type: "kjonn", falltid: 5200 }, { type: "v2", tid: 26000 }, { type: "vokal", tasks: ["pret", "perf"], tid: 8000 }, { type: "val", sett: ["ikkjePlass", "daNar"], tid: 9000 }],
        replikkar: ["Fire hundre år med dansk! Du vinn aldri!", "Skriv som embetsmennene!", "Dialektar er berre bondeprat!", "Eg et ord til frukost!", "Kanselliet vil ha orda sine att!"],
      },
    },
  ];
  NIVAA.forEach((n, i) => { n.nr = i; n.spel.namn = n.tittel; });

  /* ---------- Evner frå kurset ---------- */
  const EVNER = [
    { id: "stipend", namn: "Stipendet", modular: ["historie-aasen"], tekst: "Eitt ekstra hjarte i alle nivå. Aasen fekk òg stipend til reisene sine." },
    { id: "kjonnssans", namn: "Kjønnssansen", modular: ["grammatikk-substantiv", "trening-substantiv"], tekst: "Orda fell saktare i Kjønnsportane." },
    { id: "vokalstav", namn: "Vokalstaven", modular: ["grammatikk-verb", "trening-verb"], tekst: "Meir tid på kvar formel i Vokalskifte-trolldom." },
    { id: "v2kompass", namn: "V2-kompasset", modular: ["omgrep-setning", "trening-setning"], tekst: "Plass nummer to på brua lyser, så du ser kvar verbalet skal." },
    { id: "tidsauga", namn: "Tidsauga", modular: ["feil-smaord", "trening-smaord"], tekst: "Meir tid i Rytmeval." },
    { id: "reisestav", namn: "Reisestaven", modular: ["historie-aasen-reise"], tekst: "Aasen går dobbelt så fort mellom stoppa." },
  ];
  const modulNamn = id => { const m = Modules.get(id); return m ? m.title : id; };
  function evner() {
    const ut = {};
    for (const ev of EVNER) ut[ev.id] = ev.modular.some(id => Store.getModule(id).completed);
    return ut;
  }

  /* ---------- Lagring ---------- */
  const NOKKEL = "nynorskkurs:spel:v1";
  const tom = () => ({ opna: 0, stjerner: {}, ord: { n: {}, v: {} }, intro: false, gatt: 0 });
  let lagra;
  try { lagra = Object.assign(tom(), JSON.parse(localStorage.getItem(NOKKEL) || "{}")); } catch (e) { lagra = tom(); }
  const lagre = () => { try { localStorage.setItem(NOKKEL, JSON.stringify(lagra)); } catch (e) { /* privat modus */ } };
  // «gatt»: kor mange etappar Aasen har gått på kartet (kan vere éin mindre enn «opna» medan han går).

  /* ---------- Ordboka ---------- */
  const SUBST = Bank.nouns, STERKE = Bank.verbs.filter(v => v.cls === "sterk");
  const erFanga = f => !!lagra.ord[f.bank][f.ord];
  const talFanga = () => Object.keys(lagra.ord.n).length + Object.keys(lagra.ord.v).length;
  const talAlle = SUBST.length + STERKE.length;
  const ART = { m: "ein", f: "ei", n: "eit" };
  const forste = s => Drills.first(s);   // første av fleire tillatne former («synge|syngje»)

  /* ---------- Sida ---------- */
  const $ = id => document.getElementById(id);
  const rotEl = $("kart"), canvas = $("kart-lerret"), etikettEl = $("etikettar"), lastEl = $("kart-lastar");
  const kortEl = $("nivaa-kort"), listeEl = $("nivaa-liste"), ordTal = $("ordbok-tal");
  const spelLag = $("spel-lag"), spelRot = $("spel-rot"), panelLag = $("panel-lag"), panelRot = $("panel-rot");

  let valt = Math.min(lagra.opna, NIVAA.length - 1);   // nivået som er vist i panelet
  const stjerner = n => { const s = lagra.stjerner[NIVAA[n].stad] || 0; return `<span class="stjerner" aria-label="${s} av 3 stjerner">${"★".repeat(s)}<span class="tomt">${"★".repeat(3 - s)}</span></span>`; };

  function visKort() {
    const n = NIVAA[valt], s = STADER[n.stad];
    const open = valt <= lagra.opna, gaar = gang && gang.til === valt;
    const ev = evner();
    const relevante = EVNER.filter(e => ({ kjonn: ["kjonnssans"], vokal: ["vokalstav"], v2: ["v2kompass"], val: ["tidsauga"] })[n.spel.type]?.includes(e.id) || e.id === "stipend"
      || (n.spel.type === "boss" && ["kjonnssans", "vokalstav", "v2kompass", "tidsauga"].includes(e.id)));
    kortEl.innerHTML = `
      <p class="nivaa-aar">${E(n.aar)} · ${E(s.namn)}</p>
      <h2>${E(n.tittel)}</h2>
      <p class="nivaa-type">${n.spel.type === "boss" ? `Boss: ${E(n.spel.bossnamn)}` : E(TYPENAMN[n.spel.type])} ${stjerner(valt)}</p>
      <p>${E(n.tekst)}</p>
      ${open ? `<button type="button" class="btn" id="spel-btn"${gaar ? " disabled" : ""}>${gaar ? "Aasen er på veg …" : lagra.stjerner[n.stad] ? "Spel att" : "Spel nivået"}</button>`
        : `<p class="nivaa-last">Klar nivået før for å opne dette.</p>`}
      <p class="nivaa-evner">${relevante.map(e => `<span class="evne-merke${ev[e.id] ? " har" : ""}" title="${E(e.tekst)}">${ev[e.id] ? "✓" : "🔒"} ${E(e.namn)}</span>`).join(" ")}</p>`;
    const b = $("spel-btn");
    if (b) b.addEventListener("click", () => spel(valt));
  }
  function visListe() {
    listeEl.innerHTML = NIVAA.map((n, i) => `<li class="${i === valt ? "aktiv" : ""}${i > lagra.opna ? " last" : ""}${lagra.stjerner[n.stad] ? " klar" : ""}">
      <button type="button" data-i="${i}"${i > lagra.opna ? " disabled" : ""}><span class="nl-nr">${i + 1}</span><span class="nl-namn">${E(n.tittel)}<small>${E(STADER[n.stad].namn)} · ${E(n.aar)}</small></span>${stjerner(i)}</button></li>`).join("");
    listeEl.querySelectorAll("button[data-i]").forEach(b => b.addEventListener("click", () => velNivaa(+b.dataset.i, true)));
    ordTal.textContent = `${talFanga()} / ${talAlle}`;
  }
  function velNivaa(i, fly) {
    valt = i;
    visKort(); visListe(); oppdaterEtikettar();
    if (fly && K) { const p = K.stadXZ(NIVAA[i].stad); K.flyTil({ maal: new THREE.Vector3(p.x, K.hoegdVed(p.x, p.z) * K.EXAG, p.z), avstand: 260, phi: 0.7 }, 1400); }
  }

  /* ---------- Spel eit nivå ---------- */
  async function spel(i) {
    const n = NIVAA[i];
    spelLag.hidden = false;
    document.body.classList.add("spelar");
    const res = await (n.spel.type === "boss" ? Minispel.boss : Minispel.runde)({
      niv: n.spel, rot: spelRot, evner: evner(), erFanga,
      paaFanga: f => { lagra.ord[f.bank][f.ord] = 1; lagre(); ordTal.textContent = `${talFanga()} / ${talAlle}`; },
    });
    const forsteGong = res.fullfort && !lagra.stjerner[n.stad];
    if (res.fullfort) {
      lagra.stjerner[n.stad] = Math.max(lagra.stjerner[n.stad] || 0, res.stjerner);
      if (i === lagra.opna && i < NIVAA.length - 1) lagra.opna = i + 1;
      lagre();
    }
    const nesteNiv = NIVAA[i + 1];
    const ordliste = res.fanga.map(f => f.bank === "n" ? (() => { const o = SUBST.find(x => x.w === f.ord); return o ? `${ART[o.g]} ${forste(o.f[0])}` : f.ord; })() : `å ${f.ord}`);
    spelRot.innerHTML = `
      <div class="ms-slutt">
        <h2>${res.fullfort ? (n.spel.type === "boss" ? `${E(n.spel.bossnamn)} er slegen!` : "Nivået er klart!") : "Blekklatten vann denne gongen"}</h2>
        ${res.fullfort ? `<p class="ms-stjerner">${"★".repeat(res.stjerner)}<span class="tomt">${"★".repeat(3 - res.stjerner)}</span></p>` : ""}
        <p>${res.rett} rette og ${res.feil} feil.${res.fanga.length ? ` Du fanga ${res.fanga.length} ord:` : ""}</p>
        ${ordliste.length ? `<p class="ms-fangst">${[...new Set(ordliste)].map(o => `<span>${E(o)}</span>`).join("")}</p>` : ""}
        ${!res.fullfort ? `<p>Prøv att. Orda du bomma på, er framleis ute i lyngen.</p>` : ""}
        ${forsteGong && nesteNiv ? `<p>Ivar tek skreppa og går vidare mot <strong>${E(STADER[nesteNiv.stad].namn)}</strong>.</p>` : ""}
        ${forsteGong && !nesteNiv ? `<p class="ms-siger">Blekklatten er borte, og orda er heime att. Tre år seinare, i 1850, kjem <em>Ordbog over det norske Folkesprog</em>. Du har ${talFanga()} av ${talAlle} ord i di eiga ordbok.</p>` : ""}
        <div class="ms-knappar">
          <button type="button" class="btn secondary" id="att-btn">Spel att</button>
          <button type="button" class="btn" id="kart-btn">Til kartet</button>
        </div>
      </div>`;
    $("att-btn").addEventListener("click", () => spel(i));
    $("kart-btn").addEventListener("click", () => {
      spelLag.hidden = true;
      document.body.classList.remove("spelar");
      if (forsteGong && nesteNiv) gaaEtappe(i + 1); else { visKort(); visListe(); }
    });
  }

  /* ---------- Kartet ---------- */
  let K = null, gang = null, bygdFor = 0;
  const etikettar = new Map();

  function byggEtikettar() {
    etikettEl.innerHTML = ""; etikettar.clear();
    NIVAA.forEach((n, i) => {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "stad-etikett spel-etikett";
      el.innerHTML = `<span class="stad-namn">${i + 1}. ${E(STADER[n.stad].namn)}</span><span class="stad-dato"></span>`;
      el.addEventListener("click", () => { if (i <= lagra.opna) velNivaa(i, true); });
      etikettEl.appendChild(el);
      etikettar.set(i, el);
    });
    oppdaterEtikettar();
  }
  function oppdaterEtikettar() {
    for (const [i, el] of etikettar) {
      el.classList.toggle("aktiv", i === valt);
      el.classList.toggle("naadd", i <= lagra.gatt);
      el.classList.toggle("last", i > lagra.opna);
      el.querySelector(".stad-dato").innerHTML = lagra.stjerner[NIVAA[i].stad] ? "★".repeat(lagra.stjerner[NIVAA[i].stad]) : i <= lagra.opna ? E(NIVAA[i].tittel) : "";
    }
  }
  const projV = { v: null };
  function plasserEtikettar() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    const viste = [];
    const rekkje = [...etikettar.entries()].sort((a, b) => (b[0] === valt) - (a[0] === valt));
    for (const [i, el] of rekkje) {
      const p = K.stadXZ(NIVAA[i].stad);
      projV.v.set(p.x, K.hoegdVed(p.x, p.z) * K.EXAG, p.z).project(K.camera);
      if (projV.v.z > 1 || Math.abs(projV.v.x) > 1.05 || Math.abs(projV.v.y) > 1.05) { el.style.display = "none"; continue; }
      const x = (projV.v.x + 1) / 2 * w, y = (1 - projV.v.y) / 2 * h;
      el.style.display = "";
      const r = { x1: x - 4, y1: y - 22, x2: x + el.offsetWidth + 6, y2: y + el.offsetHeight - 14 };
      if (i !== valt && viste.some(v => r.x1 < v.x2 && r.x2 > v.x1 && r.y1 < v.y2 && r.y2 > v.y1)) { el.style.display = "none"; continue; }
      viste.push(r);
      el.style.transform = `translate(${x.toFixed(0)}px, ${y.toFixed(0)}px)`;
    }
  }

  // Etappane Aasen har gått, og etappen han går no.
  function byggRuter() {
    const radius = Math.max(0.35, K.kam.avstand * 0.0032);
    K.byggLinjer(radius);
    K.tomGruppe(K.gruppeFor); K.tomGruppe(K.gruppeNo);
    for (let i = 1; i <= lagra.gatt; i++) {
      const m = K.ruteMesh(K.lagRute(NIVAA[i].rute), radius * 0.9, K.materialFor);
      if (m) K.gruppeFor.add(m);
    }
    const kule = new THREE.SphereGeometry(radius * 1.9, 12, 8);
    NIVAA.forEach((n, i) => {
      const p = K.stadXZ(n.stad);
      const dot = new THREE.Mesh(kule, i <= lagra.opna ? K.materialStopp : K.materialFor);
      dot.position.set(p.x, K.hoegdVed(p.x, p.z) * K.EXAG + radius * 1.4 + 0.15 * K.EXAG, p.z);
      K.gruppeNo.add(dot);
    });
    if (gang) {
      gang.mesh = K.ruteMesh(gang.punkt, radius, K.materialNo);
      gang.seg = gang.mesh.geometry.parameters.tubularSegments;
      K.gruppeNo.add(gang.mesh);
    }
    K.figur.g.scale.setScalar(radius * 2.8);
    bygdFor = K.kam.avstand;
    plasserFigur();
  }

  function plasserFigur() {
    const s = K.figur.g.scale.x;
    if (gang && gang.mesh) {
      const u = Math.min(1, Math.max(0, gang.u));
      gang.mesh.geometry.setDrawRange(0, Math.floor(u * gang.seg) * 36);
      const sti = gang.mesh.geometry.parameters.path;
      const p = sti.getPointAt(u), t = sti.getTangentAt(u);
      K.figur.g.position.set(p.x, p.y + s * 0.15, p.z);
      if (t.x || t.z) K.figur.g.rotation.y = Math.atan2(t.x, t.z);
      K.stillFigur((u * gang.lengd) / (1.1 * s) * Math.PI);
      return;
    }
    const p = K.stadXZ(NIVAA[lagra.gatt].stad);
    K.figur.g.position.set(p.x, K.hoegdVed(p.x, p.z) * K.EXAG + 0.1 * K.EXAG, p.z);
    K.stillFigur(0);
  }

  // Aasen går etappen fram til nivå i.
  function gaaEtappe(i) {
    const punkt = K.lagRute(NIVAA[i].rute);
    let km = 0;
    for (let j = 1; j < punkt.length; j++) km += Math.hypot(punkt[j].x - punkt[j - 1].x, punkt[j].z - punkt[j - 1].z);
    const fart = evner().reisestav ? 0.1 : 0.05;   // km per millisekund
    gang = { til: i, punkt, lengd: K.ruteKurve(punkt, 1).getLength(), u: 0, t0: performance.now() + 1500, dur: K.reduserRorsle ? 0 : Math.max(1500, km / fart), mesh: null, seg: 0 };
    K.flyTil(K.passTil(punkt), 1400);
    valt = i;
    visKort(); visListe(); oppdaterEtikettar();
    bygdFor = 0;
  }
  function forRender(no) {
    if (gang) {
      const t = performance.now() - gang.t0;
      if (t >= 0) {
        gang.u = gang.dur ? Math.min(1, t / gang.dur) : 1;
        if (gang.u >= 1) {
          lagra.gatt = gang.til; lagre();
          K.visScene(NIVAA[gang.til].stad);
          gang = null; bygdFor = 0;
          visKort(); oppdaterEtikettar();
        } else plasserFigur();
      }
    }
    if (!bygdFor || Math.abs(K.kam.avstand - bygdFor) > bygdFor * 0.3) byggRuter();
  }

  /* ---------- Panel: ordboka, evner, forteljinga ---------- */
  function opnePanel(html) {
    panelRot.innerHTML = `<button type="button" class="panel-lukk" aria-label="Lukk">×</button>${html}`;
    panelLag.hidden = false;
    panelRot.querySelector(".panel-lukk").addEventListener("click", lukkPanel);
  }
  function lukkPanel() { panelLag.hidden = true; }
  panelLag.addEventListener("click", e => { if (e.target === panelLag) lukkPanel(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !panelLag.hidden) lukkPanel(); });

  function visOrdboka() {
    const nk = SUBST.map(o => {
      const f = lagra.ord.n[o.w];
      return `<li class="${f ? "fanga" : ""}">${f ? `<strong>${ART[o.g]} ${E(forste(o.f[0]))}</strong><small>${E(forste(o.f[1]))} · ${E(forste(o.f[2]))} · ${E(forste(o.f[3]))}</small>` : `<strong>???</strong><small>ikkje fanga</small>`}</li>`;
    }).join("");
    const vk = STERKE.map(v => {
      const f = lagra.ord.v[forste(v.inf)];
      return `<li class="${f ? "fanga" : ""}">${f ? `<strong>å ${E(forste(v.inf))}</strong><small>${E(forste(v.f[0]))} · ${E(forste(v.f[1]))} · har ${E(forste(v.f[2]))}</small>` : `<strong>???</strong><small>ikkje fanga</small>`}</li>`;
    }).join("");
    opnePanel(`
      <h2>Ordboka</h2>
      <p class="muted">Ordbog over det norske Folkesprog, di utgåve. Du har fanga ${talFanga()} av ${talAlle} ord. Ord blir fanga når du svarer rett på dei i minispela.</p>
      <h3>Substantiv (${Object.keys(lagra.ord.n).length} av ${SUBST.length})</h3><ul class="ordbok-rutenett">${nk}</ul>
      <h3>Sterke verb (${Object.keys(lagra.ord.v).length} av ${STERKE.length})</h3><ul class="ordbok-rutenett">${vk}</ul>`);
  }
  function visEvner() {
    const ev = evner();
    opnePanel(`
      <h2>Evner</h2>
      <p class="muted">Evnene får du ved å fullføre modular i kurset. Dei gjer minispela litt lettare.</p>
      <ul class="evne-liste">${EVNER.map(e => `<li class="${ev[e.id] ? "har" : ""}">
        <span class="evne-ikon">${ev[e.id] ? "✓" : "🔒"}</span>
        <div><strong>${E(e.namn)}</strong><p>${E(e.tekst)}</p>
        <p class="evne-krav">${ev[e.id] ? "Opna" : "Opnar seg når du har fullført"} ${e.modular.map(id => `<a href="${Modules.get(id) && Modules.get(id).href ? Modules.get(id).href : `modul.html?id=${id}`}">${E(modulNamn(id))}</a>`).join(" eller ")}.</p></div></li>`).join("")}</ul>`);
  }
  function visIntro() {
    opnePanel(`
      <div class="intro-kunst">${Minispel.KUNST.blekk}</div>
      <h2>Blekkrannet</h2>
      <p>Det er hausten 1842. I fire hundre år har alt i Noreg vore skrive på dansk, og i ei skuff har det samla seg ein blekklatt av gammal kanselliskrift. Ein kveld vaknar han, og han er svolten.</p>
      <p>Han et dialektorda: <em>skreppe</em>, <em>ljore</em>, <em>tun</em>. Orda som slepp unna, flyktar ut i fjellet, fjorden og lyngen.</p>
      <p>Ein ung mann frå Ørsta tek skreppa på ryggen. Han skal gå over heile landet og samle dei att, stad for stad. Han heiter Ivar Aasen, og han treng hjelp.</p>
      <p class="muted">Spel nivåa langs ruta, fang ord til ordboka di, og slå bossane. Fullfører du modular i kurset, får du evner som hjelper deg.</p>
      <button type="button" class="btn" id="intro-ok">Ta skreppa på ryggen</button>`);
    $("intro-ok").addEventListener("click", () => { lagra.intro = true; lagre(); lukkPanel(); });
  }
  $("ordbok-btn").addEventListener("click", visOrdboka);
  $("evner-btn").addEventListener("click", visEvner);
  $("forteljing-btn").addEventListener("click", visIntro);
  $("nullstill-btn").addEventListener("click", () => {
    if (!confirm("Vil du byrje spelet på nytt? Ordboka og stjernene blir sletta. Framdrifta i kurset blir ikkje rørt.")) return;
    lagra = tom(); lagre(); valt = 0; gang = null; bygdFor = 0;
    if (K) { K.byggScener(NIVAA.map(n => n.stad), false); K.visScene(NIVAA[0].stad); }
    visKort(); visListe(); oppdaterEtikettar(); visIntro();
  });
  $("landet-btn").addEventListener("click", () => K && K.flyTil(K.passTil(NIVAA.map(n => K.stadXZ(n.stad))), 1400));

  /* ---------- Start ---------- */
  visKort(); visListe();
  if (!lagra.intro) visIntro();
  K = Kart3D({ rot: rotEl, canvas, stader: STADER, fintKart: () => { bygdFor = 0; } });
  projV.v = new THREE.Vector3();
  K.start({ forRender, etterRender: plasserEtikettar }).then(() => {
    lastEl.hidden = true;
    K.byggScener(NIVAA.map(n => n.stad), false);
    for (let i = 0; i <= lagra.gatt; i++) K.visScene(NIVAA[i].stad);
    byggEtikettar();
    K.figur.g.visible = true;
    // Er eit nivå klart, men Aasen har ikkje gått dit enno (sida vart lukka medan han gjekk), går han no.
    if (lagra.gatt < lagra.opna) gaaEtappe(lagra.gatt + 1);
    else K.flyTil(K.passTil(NIVAA.map(n => K.stadXZ(n.stad)).slice(Math.max(0, lagra.gatt - 1), lagra.gatt + 2)), 1600);
  }).catch(e => {
    lastEl.innerHTML = e.message === "webgl"
      ? "<p>Nettlesaren din kan ikkje vise 3D-grafikk (WebGL), så kartet manglar. Nivåa kan du likevel spele frå lista.</p>"
      : `<p>Kartet kunne ikkje lastast: ${E(e.message)}</p>`;
  });
})();
