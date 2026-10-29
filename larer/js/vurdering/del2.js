/* Vurdering for Del 2: Grammatikk og skrivereglar. Formatet står i larer/README.md under «Vurdering».
   Alle bøyingsformer i fasitane er kontrollerte mot Nynorskordboka (2012-norma). Der fleire former
   er jamstilte, står alle i fasiten. */
(() => {
  const linje = n => '<div class="skrivelinjer"></div>'.repeat(n);
  const nn = t => `<em class="nn">${t}</em>`;
  const bm = t => `<em class="bm">${t}</em>`;

  Vurdering.register(2, {
    intro: `<p>Del 2 gir elevane formverket i nynorsk og fagomgrepa dei treng for å snakke om det: ordbygnad, ordklassar, bøying av substantiv, verb, adjektiv og pronomen, og setningslære med ordstilling og då/når. Modulane går frå omgrep (Grunnomgrep) via reglane (Ordklassar) til Mengdetrening.</p>
      <p>Undervegsvurderingane er korte oppgåver til slutten av kvar økt. Dei skal vise kva eleven meistrar no, og gi grunnlag for framovermelding, ikkje karakter. Sluttvurderinga har tre delar som utfyller kvarandre: ei skriftleg prøve som viser kunnskap om reglane og bruk i korte samanhengar, ei skriveoppgåve der formverket må brukast i samanhengande tekst, og ei munnleg grammatikkforklaring som viser fagomgrepa. Skriveoppgåva veg tyngst, fordi kompetansen i sidemål først og fremst viser seg i tekst.</p>`,
    lareplan: [11, 12, 9],
    kompetanse: `<p>Etter Del 2 skal eleven kunne bøye substantiv, verb, adjektiv og pronomen etter rettskrivinga for nynorsk, bruke dei nynorske småorda og byggje setningar med rett ordstilling, og vise dette i eigne tekstar. Eleven skal òg kunne bruke fagomgrep (kjønn, bestemt form, preteritum, sterkt verb, predikativ, leddsetning og liknande) til å forklare og rette feil i eigne og andre sine tekstar.</p>`,
    kjenneteikn: [
      {
        omrade: "Substantiv: kjønn og bøying",
        lag: `Bøyer vanlege hankjønnsord rett og bruker ofte ${nn("-a")} i bestemt form eintal av hokjønnsord, men blandar inn ${bm("-en")} og ${bm("-ene")} i eigen tekst. Kjenner dei tre artiklane ${nn("ein, ei, eit")}.`,
        middels: `Bøyer substantiv i alle tre kjønn rett i dei fleste tilfelle, også hokjønn i bestemt form (${nn("boka")}) og inkjekjønn i bestemt fleirtal (${nn("husa")}). Feila kjem helst i lengre tekstar og i ord med omlyd.`,
        hog: `Bøyer substantiv rett i alle fire formene, også ord som ${nn("hand, hender")} og ${nn("natt, netter")}, og held formene stabile gjennom heile teksten. Slår opp kjønnet når han eller ho er usikker.`,
      },
      {
        omrade: "Verb: bøying og tempus",
        lag: `Bruker ${nn("-ar")} og ${nn("-a")} på mange a-verb og kan nokre vanlege sterke verb (${nn("var, gjekk, kom")}). Bokmålsformer som ${bm("-et")} og ${bm("-er")} i presens av sterke verb finst framleis i eigne tekstar.`,
        middels: `Skil a-verb, e-verb og sterke verb og bøyer dei vanlegaste verba rett i presens, preteritum og perfektum. Held tempus stabilt i ein tekst. Gjer enkelte feil i j-verb og mindre vanlege sterke verb.`,
        hog: `Bøyer verba rett i eigne tekstar, også j-verb, kortverb og sterke verb som ${nn("ete, seie, gjere, springe")}, og kan grunngi forma med verbklassen. Blandar ikkje bøyingssystem (${nn("tek, har teke")} eller ${nn("tar, har tatt")}).`,
      },
      {
        omrade: "Adjektiv og samsvar",
        lag: `Bøyer adjektivet rett når det står rett framfor eit substantiv i eintal, men gløymer ofte ${nn("-t")} i inkjekjønn og ${nn("-e")} i fleirtal, særleg etter ${nn("er")} og ${nn("blir")}.`,
        middels: `Får samsvar mellom adjektiv og substantiv i dei fleste tilfelle, også i bestemt form og som predikativ. Gradbøyer regelrette adjektiv med ${nn("-are")} og ${nn("-ast")}.`,
        hog: `Bøyer adjektiva rett også når dei står langt frå substantivet, kjenner unntaka (${nn("eit vanleg hus, eit nytt hus, små hus")}) og gradbøyer uregelrette adjektiv rett.`,
      },
      {
        omrade: "Pronomen, småord og ordforråd",
        lag: `Bruker ${nn("eg, ikkje, kva")} og nokre andre vanlege nynorske småord, men har fleire bokmålsord i eigen tekst (${bm("hvordan, noen, uten")}). Blandar ${nn("de")} og ${nn("dei")}.`,
        middels: `Bruker sentrale nynorske pronomen og småord rett, mellom anna ${nn("ho/henne, de/dykk/dei, korleis, kvifor, noko/nokon")}. Har få bokmålsinnslag, og dei rettar eleven når han eller ho les gjennom.`,
        hog: `Bruker pronomen og småord sikkert og med variasjon, vel rett mellom ${nn("sin")} og ${nn("hans/hennar")}, ${nn("noko, nokon, noka")} og ${nn("nokre")}, og bruker ord som er typiske for nynorsk (${nn("fridom, kjærleik, byrje")}) der dei passar.`,
      },
      {
        omrade: "Setningsbygnad, ordstilling og teiknsetjing",
        lag: `Skriv for det meste heilsetningar med verbalet på andreplass, men bryt ofte V2-regelen etter innleiande adverbial og leddsetningar. Vel ${nn("når")} der det skal vere ${nn("då")}.`,
        middels: `Bruker V2 rett i dei fleste heilsetningar, også etter innleiande leddsetningar, og set komma etter leddsetning først i setninga. Skil stort sett mellom ${nn("då")} og ${nn("når")}.`,
        hog: `Varierer mellom heilsetningar og leddsetningar med rett ordstilling, plasserer ${nn("ikkje")} rett i leddsetningar og bruker komma rett mellom setningar.`,
      },
      {
        omrade: "Fagomgrep og forklaring",
        lag: `Kjenner att nokre ordklassar og kan seie at eit ord er «feil», men forklarer sjeldan kvifor. Bruker enkle omgrep som eintal og fleirtal.`,
        middels: `Bruker sentrale fagomgrep (kjønn, bestemt form, preteritum, sterkt og svakt verb, subjekt, verbal) rett når han eller ho forklarer ein feil, og kan gi eit nytt døme på regelen.`,
        hog: `Forklarer reglar presist med fagomgrep, også predikativ, leddsetning, finitt verb og refleksiv eigedom, og bruker kunnskapen til å finne og rette feil i eigen tekst.`,
      },
    ],

    provar: [
      {
        id: "skriftleg-prove-formverk",
        tittel: "Skriftleg prøve i formverk og grammatikk",
        type: "skriftleg",
        tid: "60 minutt",
        form: "Individuelt",
        hjelpemiddel: "Ingen hjelpemiddel",
        karaktergrunnlag: true,
        lareplan: [11, 12],
        modular: ["omgrep-boying", "omgrep-setning", "grammatikk-substantiv", "grammatikk-verb", "grammatikk-pronomen", "grammatikk-adjektiv", "trening-smaord", "trening-setning"],
        lararinfo: `<p><strong>Føremål.</strong> Prøva viser om eleven kan formverket og reglane bak det (substantiv, verb, pronomen og småord, adjektiv og setningslære), og om eleven kan bruke kunnskapen i korte samanhengar. Oppgåve 6 er ein kort tekst med feil der eleven både rettar og forklarer, og ho er den delen som ligg nærast vanleg skriving.</p>
          <p><strong>Gjennomføring.</strong> Gi prøva etter mengdetreninga. Les gjennom oppgåvene saman med klassen før start, særleg oppgåve 5 og 6, så alle veit kva dei skal gjere. Prøva kan delast i to økter (oppgåve 1 til 3 og oppgåve 4 til 6).</p>
          <p><strong>Retting.</strong> Eitt poeng er éi rett form eller éi heil rad. Godta alle jamstilte former som står i fasiten, og godta stavefeil som ikkje gjeld sjølve bøyinga (til dømes <em>stollane</em> for <em>stolane</em> gir poeng om endinga er rett). Ei bokmålsform gir aldri poeng.</p>
          <p><strong>Kva prøva ikkje viser.</strong> Prøva viser delkompetanse. Ho seier lite om korleis eleven meistrar formverket i ein lengre tekst, og ho må difor ikkje stå åleine som grunnlag for karakter i skriftleg sidemål. Bruk ho saman med skriveoppgåva. Elevar med fritak frå karakter i sidemål kan ta prøva som undervegsvurdering.</p>
          <p><strong>Tilpassing.</strong> Oppgåvene kan lesast høgt. For elevar som treng det, kan oppgåve 2c og 6 gjevast med ordbank i margen.</p>`,
        elevark: `
          <h4>Oppgåve 1: Substantiv (10 poeng)</h4>
          <p><strong>a)</strong> Skriv rett artikkel (${nn("ein, ei")} eller ${nn("eit")}) og dei tre andre formene. (6 poeng)</p>
          <table>
            <thead><tr><th>Ubestemt eintal</th><th>Bestemt eintal</th><th>Ubestemt fleirtal</th><th>Bestemt fleirtal</th></tr></thead>
            <tbody>
              <tr><td>____ stol</td><td></td><td></td><td></td></tr>
              <tr><td>____ klokke</td><td></td><td></td><td></td></tr>
              <tr><td>____ tak</td><td></td><td></td><td></td></tr>
              <tr><td>____ hand</td><td></td><td></td><td></td></tr>
              <tr><td>____ bilete</td><td></td><td></td><td></td></tr>
              <tr><td>____ lærar</td><td></td><td></td><td></td></tr>
            </tbody>
          </table>
          <p><strong>b)</strong> Kvar setning har eitt substantiv i feil form. Skriv setninga rett. (4 poeng)</p>
          <ol>
            <li>Døren til klasserommet var låst.${linje(1)}</li>
            <li>Alle husene i gata var kvite.${linje(1)}</li>
            <li>Eg las avisen på bussen.${linje(1)}</li>
            <li>Barnene leika i hagen.${linje(1)}</li>
          </ol>

          <h4>Oppgåve 2: Verb (14 poeng)</h4>
          <p><strong>a)</strong> Fyll ut tabellen. (6 poeng)</p>
          <table>
            <thead><tr><th>Infinitiv</th><th>Presens</th><th>Preteritum</th><th>Perfektum (har …)</th></tr></thead>
            <tbody>
              <tr><td>å snakke</td><td></td><td></td><td>har</td></tr>
              <tr><td>å lære</td><td></td><td></td><td>har</td></tr>
              <tr><td>å velje</td><td></td><td></td><td>har</td></tr>
              <tr><td>å tru</td><td></td><td></td><td>har</td></tr>
              <tr><td>å drikke</td><td></td><td></td><td>har</td></tr>
              <tr><td>å gjere</td><td></td><td></td><td>har</td></tr>
            </tbody>
          </table>
          <p><strong>b)</strong> Kva verbklasse høyrer dei fem første verba i tabellen til? Vel mellom a-verb, e-verb, j-verb, kortverb og sterkt verb. (2 poeng)</p>
          ${linje(2)}
          <p><strong>c)</strong> Skriv verbet i parentes i rett form. (6 poeng)</p>
          <p>I fjor sommar ________ (reise) vi til Danmark. Vi ________ (bu) i telt og ________ (bade) kvar dag. Ein dag ________ (sjå) vi ein delfin! No ________ (lengte) eg tilbake, og eg har ________ (skrive) ei forteljing om turen.</p>

          <h4>Oppgåve 3: Pronomen og småord (8 poeng)</h4>
          <p><strong>a)</strong> Skriv setningane på nynorsk. (4 poeng)</p>
          <ol>
            <li>${bm("Hvor har dere vært?")}${linje(1)}</li>
            <li>${bm("Jeg så ham i går.")}${linje(1)}</li>
            <li>${bm("Hvorfor kommer de ikke?")} (${bm("de")} = fleire personar du snakkar om)${linje(1)}</li>
            <li>${bm("Vi har ikke sett noen.")}${linje(1)}</li>
          </ol>
          <p><strong>b)</strong> Set ring rundt rett ord. (4 poeng)</p>
          <ol>
            <li>Mari ringde til bror (sin / hans). (Det er bror til Mari.)</li>
            <li>(Då / Når) eg gjekk i første klasse, budde vi i Tromsø.</li>
            <li>Eg skal hjelpe (de / dykk / dei) med leksene. (Du snakkar til fleire personar.)</li>
            <li>Har du (noko / nokon / nokre) blyant eg kan låne?</li>
          </ol>

          <h4>Oppgåve 4: Adjektiv (8 poeng)</h4>
          <p><strong>a)</strong> Skriv adjektivet i parentes i rett form. (5 poeng)</p>
          <ol>
            <li>eit ________ (stor) hus</li>
            <li>eit ________ (farleg) dyr</li>
            <li>Bilane var ________ (rask).</li>
            <li>den ________ (raud) jakka</li>
            <li>Vatnet var ________ (kald).</li>
          </ol>
          <p><strong>b)</strong> Gradbøy adjektiva. (3 poeng)</p>
          <table>
            <thead><tr><th>Positiv</th><th>Komparativ</th><th>Superlativ</th></tr></thead>
            <tbody>
              <tr><td>sterk</td><td></td><td></td></tr>
              <tr><td>god</td><td></td><td></td></tr>
              <tr><td>ung</td><td></td><td></td></tr>
            </tbody>
          </table>

          <h4>Oppgåve 5: Setningslære (8 poeng)</h4>
          <p><strong>a)</strong> Finn verbal, subjekt, indirekte objekt, objekt og adverbial i setninga. (5 poeng)</p>
          <p class="stor">Etter kampen gav trenaren spelarane ein ny plan.</p>
          <table>
            <tbody>
              <tr><td>Verbal</td><td style="width:60%"></td></tr>
              <tr><td>Subjekt</td><td></td></tr>
              <tr><td>Indirekte objekt</td><td></td></tr>
              <tr><td>Objekt</td><td></td></tr>
              <tr><td>Adverbial</td><td></td></tr>
            </tbody>
          </table>
          <p><strong>b)</strong> Ordstillinga er feil i setningane. Skriv dei rett. (3 poeng)</p>
          <ol>
            <li>Når det regnar, vi held oss inne.${linje(1)}</li>
            <li>Eg veit at ho likar ikkje fisk.${linje(1)}</li>
            <li>I morgon vi skal reise til byen.${linje(1)}</li>
          </ol>

          <h4>Oppgåve 6: Formverket i ein tekst (12 poeng)</h4>
          <p><strong>a)</strong> Teksten har åtte feil: bokmålsformer, feil bøying og feil ordstilling. Set strek under feila og skriv rett form over. (8 poeng)</p>
          <p class="stor" style="line-height:2.4">Laurdag rodde eg og bestefar ut på vatnet for å fiske. Det var tidleg om morgonen, og vatnet ble heilt blankt då sola kom opp. Bestefar fortalde om den gongen han sjølv var ung og fiska på den same plassen. Han viste meg hvordan eg skulle kaste ut snøret. Etter ein lang time fikk eg en stor fisk på kroken. Hendene mine var kald, men eg gav meg ikkje. Då vi kom heim, vi steikte fisken i panna. Bestemor sa at ho hadde ikkje smakt betre fisk, og til slutt var alle fatene på bordet tomme.</p>
          <p><strong>b)</strong> Vel to av feila du retta. Forklar kvifor dei var feil, og bruk fagomgrep (til dømes hokjønn, fleirtal, preteritum, sterkt verb, predikativ, V2, leddsetning). (4 poeng)</p>
          ${linje(5)}`,
        fasit: `
          <h4>Oppgåve 1 (10 poeng)</h4>
          <p>a) Eitt poeng per heil rad (artikkel og alle tre formene rette):</p>
          <ul>
            <li>${nn("ein stol, stolen, stolar, stolane")}</li>
            <li>${nn("ei klokke, klokka, klokker, klokkene")}</li>
            <li>${nn("eit tak, taket, tak, taka")}</li>
            <li>${nn("ei hand, handa, hender, hendene")}</li>
            <li>${nn("eit bilete, biletet, bilete, bileta")}</li>
            <li>${nn("ein lærar, læraren, lærarar, lærarane")}</li>
          </ul>
          <p>b) Eitt poeng per setning: ${nn("Døra")} til klasserommet var låst. Alle ${nn("husa")} i gata var kvite. Eg las ${nn("avisa")} på bussen. ${nn("Barna")} (eller ${nn("Borna")}) leika i hagen.</p>
          <h4>Oppgåve 2 (14 poeng)</h4>
          <p>a) Eitt poeng per heil rad:</p>
          <ul>
            <li>${nn("snakke, snakkar, snakka, har snakka")}</li>
            <li>${nn("lære, lærer, lærte, har lært")}</li>
            <li>${nn("velje, vel, valde, har valt")}</li>
            <li>${nn("tru, trur, trudde, har trudd")} (${nn("har trutt")} er òg rett)</li>
            <li>${nn("drikke, drikk, drakk, har drukke")}</li>
            <li>${nn("gjere, gjer, gjorde, har gjort")}</li>
          </ul>
          <p>b) ${nn("snakke")}: a-verb, ${nn("lære")}: e-verb, ${nn("velje")}: j-verb, ${nn("tru")}: kortverb, ${nn("drikke")}: sterkt verb. Alle fem rette gir 2 poeng, tre eller fire rette gir 1 poeng.</p>
          <p>c) Eitt poeng per verb: ${nn("reiste, budde, bada, såg, lengtar, skrive")}.</p>
          <h4>Oppgåve 3 (8 poeng)</h4>
          <p>a) Eitt poeng per heil setning:</p>
          <ol>
            <li>${nn("Kvar har de vore?")} (${nn("Kor har de vore?")} og ${nn("Kvar har dokker vore?")} er òg rett.)</li>
            <li>${nn("Eg såg han i går.")} (Forma ${bm("honom")} er ikkje gyldig etter 2012.)</li>
            <li>${nn("Kvifor kjem dei ikkje?")} (${nn("Korfor")} er òg rett.)</li>
            <li>${nn("Vi har ikkje sett nokon.")} (${nn("Me")} er òg rett.)</li>
          </ol>
          <p>b) Eitt poeng per rett val: 1 ${nn("sin")} (Mari er subjektet og eig broren). 2 ${nn("Då")} (éin bestemt periode i fortida; ${nn("da")} er òg gyldig nynorsk og gir poeng om eleven skriv det). 3 ${nn("dykk")} (objektsform; ${nn("dokker")} er òg rett om eleven skriv det). 4 ${nn("nokon")} (hankjønn, i spørsmål).</p>
          <h4>Oppgåve 4 (8 poeng)</h4>
          <p>a) Eitt poeng per form: ${nn("stort")}, ${nn("farleg")} (adjektiv på <em>-leg</em> får ikkje <em>-t</em>), ${nn("raske")}, ${nn("raude")}, ${nn("kaldt")}.</p>
          <p>b) Eitt poeng per heil rad: ${nn("sterk, sterkare, sterkast")}. ${nn("god, betre, best")}. ${nn("ung, yngre, yngst")}.</p>
          <h4>Oppgåve 5 (8 poeng)</h4>
          <p>a) Eitt poeng per ledd: verbal ${nn("gav")}, subjekt ${nn("trenaren")}, indirekte objekt ${nn("spelarane")}, objekt ${nn("ein ny plan")}, adverbial ${nn("etter kampen")}.</p>
          <p>b) Eitt poeng per setning: ${nn("Når det regnar, held vi oss inne.")} ${nn("Eg veit at ho ikkje likar fisk.")} (${nn("liker")} er òg rett.) ${nn("I morgon skal vi reise til byen.")}</p>
          <h4>Oppgåve 6 (12 poeng)</h4>
          <p>a) Eitt poeng per feil som er funnen og retta:</p>
          <ol>
            <li>${bm("ble")} → ${nn("vart")} eller ${nn("blei")} (preteritum av ${nn("bli")}/${nn("verte")})</li>
            <li>${bm("hvordan")} → ${nn("korleis")} (spørjeord)</li>
            <li>${bm("fikk")} → ${nn("fekk")} (sterkt verb, preteritum)</li>
            <li>${bm("en")} → ${nn("ein")} (artikkel i hankjønn)</li>
            <li>${nn("kald")} → ${nn("kalde")} (predikativ i fleirtal: ${nn("hendene")} er fleirtal)</li>
            <li>${nn("vi steikte")} → ${nn("steikte vi")} (V2: leddsetninga først tel som plass 1)</li>
            <li>${nn("hadde ikkje")} → ${nn("ikkje hadde")} (${nn("ikkje")} står framfor verbalet i leddsetning)</li>
            <li>${bm("fatene")} → ${nn("fata")} (inkjekjønn i bestemt fleirtal)</li>
          </ol>
          <p>Trekk eitt poeng (men ikkje under 0) for kvar rett form eleven endrar til ei feil form. ${nn("fortalde")}, ${nn("fiska")}, ${nn("gav")} og ${nn("då")} er rette og skal stå.</p>
          <p>b) To poeng per forklaring: eitt poeng for at regelen er rett, eitt poeng for at eleven bruker relevante fagomgrep. Døme på full forklaring: «${nn("fata")}: ${nn("fat")} er eit inkjekjønnsord, og inkjekjønnsord får ${nn("-a")} i bestemt form fleirtal.» «${nn("steikte vi")}: i ei forteljande heilsetning står verbalet på andreplass. Leddsetninga ${nn("Då vi kom heim")} står på første plass, så verbalet må kome rett etter kommaet.»</p>`,
        poeng: { maks: 60, lag: "18 til 32 poeng", middels: "33 til 49 poeng", hog: "50 til 60 poeng" },
        skjema: [
          {
            omrade: "Bøying av substantiv og verb (oppgåve 1 og 2)",
            lag: "Bøyer vanlege hankjønnsord og a-verb rett, men har bokmålsendingar i hokjønn, inkjekjønn fleirtal og sterke verb.",
            middels: "Bøyer dei fleste substantiva og verba rett, også hokjønn og vanlege sterke verb. Enkelte feil i omlyd, j-verb og kortverb.",
            hog: "Bøyer nesten alle substantiv og verb rett, kjenner verbklassane og bruker rett form i teksten i oppgåve 2c.",
          },
          {
            omrade: "Pronomen, småord og adjektiv (oppgåve 3 og 4)",
            lag: "Skriv nokre nynorske småord og bøyer adjektiv rett framfor substantiv i eintal.",
            middels: "Bruker dei sentrale pronomena og spørjeorda rett og får samsvar i dei fleste adjektiva, også i predikativ.",
            hog: "Vel sikkert mellom sin/hans, de/dykk/dei og noko/nokon, bøyer adjektiva rett i alle stillingar og gradbøyer uregelrette adjektiv.",
          },
          {
            omrade: "Setningslære og ordstilling (oppgåve 5)",
            lag: "Finn verbalet og subjektet og rettar éi av ordstillingssetningane.",
            middels: "Finn dei fleste setningsledda og rettar V2-feila.",
            hog: "Finn alle ledda, også indirekte objekt, og rettar både V2 og plasseringa av ikkje i leddsetning.",
          },
          {
            omrade: "Bruk og forklaring i samanheng (oppgåve 6)",
            lag: "Finn og rettar nokre av dei tydelegaste bokmålsformene. Forklaringa seier at forma er feil, men ikkje kvifor.",
            middels: "Finn dei fleste feila, også ein ordstillingsfeil, og forklarer ein regel med eit relevant fagomgrep.",
            hog: "Finn og rettar alle eller nesten alle feila utan å endre rette former, og forklarer reglane presist med fagomgrep.",
          },
        ],
      },

      {
        id: "omsetjing-og-eigen-tekst",
        tittel: "Formverket i tekst: omsetjing og eigen tekst",
        type: "skriving",
        tid: "90 minutt (to skuletimar)",
        form: "Individuelt",
        hjelpemiddel: "Ordbok (papir eller ordbokene.no). Ikkje omsetjingsverktøy eller retteprogram",
        karaktergrunnlag: true,
        lareplan: [11, 10, 12],
        modular: ["grammatikk-substantiv", "grammatikk-verb", "grammatikk-pronomen", "grammatikk-adjektiv", "trening-blanda", "omgrep-setning"],
        lararinfo: `<p><strong>Føremål.</strong> Dette er hovudvurderinga i Del 2. Sidemålskompetansen viser seg først og fremst i tekst, og her må eleven bruke formverket utan at oppgåva peikar ut kvar reglane gjeld. Del A (omsetjing) viser om eleven kan overføre ein kjend tekst til nynorsk. Del B (eigen tekst) viser om eleven kan formulere seg sjølv på nynorsk, og det er den delen som veg tyngst.</p>
          <p><strong>Gjennomføring.</strong> Om lag 30 minutt til del A og 50 minutt til del B, pluss tid til gjennomlesing. Teksten kan skrivast for hand eller på PC. Skriv eleven på PC, må retteprogrammet vere slått av, og nettlesaren kan berre brukast til ordbokene.no. Minn elevane på å lese gjennom med blikk for éin ting om gongen: endingar på substantiv, verb i preteritum, småord.</p>
          <p><strong>Vurdering.</strong> Bruk skjemaet og sjå på heile teksten før du set nivå. Tel ikkje feil mekanisk: éin feil som går att (til dømes ${bm("-en")} på alle hokjønnsord) viser at éin regel manglar, medan mange ulike feil viser at grunnlaget er svakt. Hugs at elevane har hatt kortare opplæring i sidemål enn i hovudmål. Ein tekst skriven på bokmål viser ikkje kompetanse i sidemål.</p>
          <p><strong>Framovermelding.</strong> Marker éin eller to feiltypar i teksten (selektiv retting) og la eleven rette sjølv før du gir ei skriftleg tilbakemelding med eitt konkret neste steg.</p>`,
        elevark: `
          <h4>Del A: Omset til nynorsk</h4>
          <p>Skriv teksten om til nynorsk. Innhaldet skal vere det same, men alle ord og former skal vere nynorske.</p>
          <div class="callout">
            <p class="bm"><strong>Den første dagen</strong></p>
            <p class="bm">Da Sara begynte på ny skole, var hun nervøs. Hun kjente ingen i klassen, og hun visste ikke hvor hun skulle sitte. Læreren ga henne en plass ved vinduet. I friminuttet kom to jenter bort til henne og spurte hva hun het. De fortalte at de også hadde flyttet dit året før. Etter skolen gikk de hjem sammen, og Sara følte seg ikke lenger alene. Hvis noen hadde sagt til henne om morgenen at dagen skulle bli så fin, hadde hun ikke trodd det.</p>
          </div>
          ${linje(12)}
          <h4>Del B: Skriv ein eigen tekst</h4>
          <p>Skriv ei forteljing på nynorsk (200 til 300 ord) med tittelen <strong>«Ein dag eg ikkje gløymer»</strong>. Det kan vere ein dag du har opplevd, eller ein dag du dikta opp.</p>
          <p>I teksten skal du</p>
          <ul>
            <li>skrive i preteritum (fortid)</li>
            <li>bruke minst tre ulike sterke verb (til dømes ${nn("gjekk, såg, kom, fann, sprang")})</li>
            <li>skildre minst éin stad eller éin person med adjektiv</li>
            <li>byrje minst to setningar med ei leddsetning (til dømes ${nn("Då vi kom fram, …")})</li>
          </ul>
          <p>Når du er ferdig: les gjennom teksten tre gonger. Første gong ser du på endingane på substantiva, andre gong på verba, tredje gong på småorda.</p>
          ${linje(20)}`,
        fasit: `
          <h4>Del A: døme på omsetjing</h4>
          <p class="nn"><strong>Den første dagen</strong><br>Då Sara byrja på ny skule, var ho nervøs. Ho kjende ingen i klassen, og ho visste ikkje kvar ho skulle sitje. Læraren gav henne ein plass ved vindauget. I friminuttet kom to jenter bort til henne og spurde kva ho heitte. Dei fortalde at dei òg hadde flytta dit året før. Etter skulen gjekk dei heim saman, og Sara kjende seg ikkje lenger åleine. Dersom nokon hadde sagt til henne om morgonen at dagen skulle bli så fin, hadde ho ikkje trudd det.</p>
          <p><strong>Desse formene er òg rette og skal godtakast:</strong></p>
          <ul>
            <li>${nn("Da")} for ${nn("Då")}, ${nn("begynte")} for ${nn("byrja")}, ${nn("skole/skolen")} for ${nn("skule/skulen")}, ${nn("fyrste")} for ${nn("første")}</li>
            <li>${nn("kjente")} for ${nn("kjende")} (begge stader), ${nn("følte seg")} for ${nn("kjende seg")}</li>
            <li>${nn("kor")} for ${nn("kvar")}, ${nn("sitte")} for ${nn("sitje")}</li>
            <li>${nn("friminutten")} for ${nn("friminuttet")}, ${nn("het")} for ${nn("heitte")}</li>
            <li>${nn("også")} for ${nn("òg")}, ${nn("flytt")} for ${nn("flytta")}</li>
            <li>${nn("aleine")} for ${nn("åleine")}, ${nn("Viss")} eller ${nn("Om")} for ${nn("Dersom")}, ${nn("ville bli")} eller ${nn("skulle verte")} for ${nn("skulle bli")}, ${nn("trutt")} for ${nn("trudd")}</li>
          </ul>
          <p><strong>Typiske feil å sjå etter:</strong> ${bm("ikke, hvor, hva, ga, en plass, vinduet, spurte, gikk, hjem, sammen, alene, hvis, noen, morgenen, trodd, flyttet")}. ${bm("fortalte")} er ikkje preteritum av ${nn("fortelje")} (rett: ${nn("fortalde")}). ${bm("vindu")} finst ikkje i Nynorskordboka, så rett form er ${nn("vindauge")}, i bestemt form ${nn("vindauget")}.</p>
          <h4>Del B: kva du ser etter</h4>
          <p>Det finst ingen fasit til den eigne teksten. Sjå etter om eleven held preteritum stabilt, bøyer dei sterke verba rett, får samsvar i adjektiva, bruker V2 etter innleiande leddsetningar og set komma etter dei, og om tekstane har bokmålsord som eleven burde ha slått opp.</p>`,
        skjema: [
          {
            omrade: "Ordbøying i eigen tekst (substantiv, verb, adjektiv)",
            lag: "Meistrar sentrale reglar: vanlege substantiv og a-verb er stort sett rette, men bokmålsendingar som -en på hokjønnsord, -ene i inkjekjønn fleirtal og -et i preteritum går att.",
            middels: "Meistrar hovudreglane: substantiv i alle tre kjønn, vanlege sterke og svake verb og adjektivsamsvar er stort sett rette. Feila gjeld mindre vanlege ord.",
            hog: "Meistrar i hovudtrekk ordbøyinga: få eller ingen feil i substantiv, verb og adjektiv, også i ord som ikkje er øvde på.",
          },
          {
            omrade: "Ordforråd og småord",
            lag: "Bruker eit enkelt ordforråd og enkelte typiske nynorskord (ikkje, eg, kva), men fleire småord og pronomen står på bokmål.",
            middels: "Bruker relevant ordforråd og sentrale nynorske ord og uttrykk (korleis, kvifor, nokon, heim, saman) og uttrykkjer seg tenleg.",
            hog: "Bruker eit variert ordforråd med relevante nynorske ord og uttrykk og uttrykkjer seg med presisjon og variasjon.",
          },
          {
            omrade: "Rettskriving, ordstilling og teiknsetjing",
            lag: "Meistrar sentrale reglar for rettskriving og teiknsetjing. V2 blir ofte broten etter innleiande ledd, og komma etter leddsetning manglar.",
            middels: "Meistrar reglar for rettskriving og sentrale reglar for teiknsetjing. V2 og komma etter innleiande leddsetning er stort sett rette.",
            hog: "Meistrar reglar for rettskriving og i hovudtrekk reglar for teiknsetjing. Ordstillinga er rett også i leddsetningar med ikkje.",
          },
          {
            omrade: "Omsetjinga (del A)",
            lag: "Omset dei fleste orda, men mange bokmålsformer og bokmålsord står att.",
            middels: "Omset teksten med få bokmålsformer att. Feila gjeld særleg verb og småord.",
            hog: "Omset heile teksten til nynorsk med rette former og naturlege nynorske ord, og held seg til eitt bøyingssystem.",
          },
        ],
      },

      {
        id: "munnleg-grammatikkforklaring",
        tittel: "Munnleg grammatikkforklaring: rett og forklar",
        type: "munnleg",
        tid: "5 minutt førebuing og 5 minutt samtale per elev",
        form: "Individuelt eller to og to",
        hjelpemiddel: "Lappen eleven har trekt",
        karaktergrunnlag: true,
        lareplan: [12, 9],
        modular: ["omgrep-ordet", "omgrep-ordklassar", "omgrep-boying", "omgrep-setning", "trening-setning"],
        lararinfo: `<p><strong>Føremål.</strong> Samtalen viser om eleven kan bruke fagspråk og kunnskap om grammatikk (kompetansemål 12 og 9), altså om eleven forstår reglane og ikkje berre hugsar formene. Han kan inngå i grunnlaget for karakter i norsk munnleg, og han gir deg eit godt bilete av kva eleven treng å øve meir på før skriveoppgåva.</p>
          <p><strong>Gjennomføring.</strong> Klipp ut lappane. Eleven trekkjer éin lapp, får fem minutt til å førebu seg og skal så (1) lese setninga og rette feilen, (2) forklare regelen med fagomgrep og (3) gi eit nytt døme der regelen gjeld. Still eitt eller to oppfølgingsspørsmål, til dømes «Kva ordklasse er det?», «Kvifor ikkje ${nn("-en")}?» eller «Kva skjer om du flyttar dette leddet fremst?». Medan ein elev snakkar med deg, kan resten av klassen arbeide med mengdetrening.</p>
          <p><strong>Tilpassing.</strong> Elevar som ikkje vil snakke åleine med læraren, kan gjere samtalen to og to der dei forklarer for kvarandre, og du lyttar. Vurder kva eleven forklarer, ikkje kor sikker eleven verkar.</p>`,
        elevark: `
          <p>Trekk ein lapp. Kvar setning har éin feil. Du skal</p>
          <ol>
            <li>lese setninga høgt og rette feilen</li>
            <li>forklare regelen og bruke fagomgrep (til dømes hokjønn, bestemt form, preteritum, sterkt verb, predikativ, subjekt, verbal, leddsetning)</li>
            <li>gi eit nytt døme der same regelen gjeld</li>
          </ol>
          <table>
            <tbody>
              <tr><td>1. Boken ligg på bordet.</td><td>2. Husene i gata er gamle.</td></tr>
              <tr><td>3. I går kaster eg ballen til Ola.</td><td>4. Ho skriver eit langt brev.</td></tr>
              <tr><td>5. Huset er stor.</td><td>6. Etter skulen vi gjekk heim.</td></tr>
              <tr><td>7. Eg sa at eg kunne ikkje kome.</td><td>8. Når eg var liten, budde vi i Bodø.</td></tr>
              <tr><td>9. Per ringde til syster hans. (Det er syster til Per sjølv.)</td><td>10. Har dere sett den nye filmen?</td></tr>
            </tbody>
          </table>`,
        fasit: `
          <ol>
            <li>${nn("Boka")}: ${nn("bok")} er hokjønn, og hokjønnsord får ${nn("-a")} i bestemt form eintal. Nytt døme: ${nn("døra, jenta")}.</li>
            <li>${nn("Husa")}: ${nn("hus")} er inkjekjønn, og inkjekjønnsord får ${nn("-a")} i bestemt form fleirtal. Nytt døme: ${nn("epla, fjella")}.</li>
            <li>${nn("kasta")}: ${nn("i går")} krev preteritum, og ${nn("kaste")} er eit a-verb (bokmål ${bm("kastet")}), så preteritum endar på ${nn("-a")}.</li>
            <li>${nn("skriv")}: ${nn("skrive")} er eit sterkt verb, og sterke verb får inga ending i presens. Nytt døme: ${nn("ho les, han kjem")}.</li>
            <li>${nn("stort")}: ${nn("stor")} er predikativ og rettar seg etter subjektet ${nn("huset")}, som er inkjekjønn eintal, så adjektivet får ${nn("-t")}.</li>
            <li>${nn("Etter skulen gjekk vi heim")}: V2-regelen. Verbalet står på andreplass i ei forteljande heilsetning, og når eit adverbial står først, kjem subjektet etter verbalet.</li>
            <li>${nn("at eg ikkje kunne kome")}: i ei leddsetning står setningsadverbialet ${nn("ikkje")} framfor det finitte verbalet.</li>
            <li>${nn("Då eg var liten")} (${nn("da")} er òg gyldig): ${nn("då")} om éin bestemt gong eller periode i fortida, ${nn("når")} om noko som skjer kvar gong eller i framtida.</li>
            <li>${nn("syster si")}: når eigaren er subjektet i setninga (${nn("Per")}), bruker vi refleksivt eigedomsord ${nn("sin, si, sitt, sine")}, og ${nn("syster")} er hokjønn. ${nn("hans")} ville tyde at det er syster til ein annan.</li>
            <li>${nn("Har de sett den nye filmen?")} (${nn("dokker")} er òg rett): ${nn("de")} er subjektsform i 2. person fleirtal, ${nn("dykk")} er objektsform, og ${nn("dei")} er 3. person.</li>
          </ol>`,
        skjema: [
          {
            omrade: "Rettar feilen",
            lag: "Finn feilen med litt hjelp og seier den rette forma.",
            middels: "Finn og rettar feilen sjølv.",
            hog: "Finn og rettar feilen med ein gong og ser om det finst fleire jamstilte former.",
          },
          {
            omrade: "Forklarer regelen med fagomgrep",
            lag: "Forklarer med kvardagsord («det skal vere sånn på nynorsk») og bruker eitt eller to enkle omgrep.",
            middels: "Forklarer regelen rett og bruker dei sentrale fagomgrepa (til dømes hokjønn, bestemt form, sterkt verb, subjekt).",
            hog: "Forklarer presist og bruker fagomgrepa sikkert, også predikativ, finitt verb, leddsetning og refleksiv eigedom.",
          },
          {
            omrade: "Overfører regelen til nye døme",
            lag: "Gir eit nytt døme som liknar mykje på setninga på lappen.",
            middels: "Gir eit nytt, rett døme og svarer på eitt oppfølgingsspørsmål.",
            hog: "Gir fleire nye døme, svarer sikkert på oppfølgingsspørsmål og kan seie kvar regelen ikkje gjeld.",
          },
        ],
      },
    ],

    undervegs: {
      "omgrep-ordet": {
        tittel: "Exit-lapp",
        tid: 8,
        form: "Åleine",
        oppgave: `<ol>
          <li>Del orda i stamme og ending. Skriv kva endinga fortel.<br>
            ${nn("bilane")} · ${nn("klokka")} · ${nn("hoppar")} · ${nn("høyrde")} · ${nn("varmast")} · ${nn("epla")}${linje(3)}</li>
          <li>Er det bøying eller orddanning? Skriv B eller O. Er det orddanning, skriv om det er avleiing eller samansetning.<br>
            a) ${nn("bil")} → ${nn("bilar")} &nbsp; b) ${nn("lese")} → ${nn("lesar")} &nbsp; c) ${nn("fri")} → ${nn("fridom")} &nbsp; d) ${nn("kaste")} → ${nn("kasta")} &nbsp; e) ${nn("skule")} + ${nn("sekk")} → ${nn("skulesekk")} &nbsp; f) ${nn("farleg")} → ${nn("ufarleg")}${linje(2)}</li>
          <li>Kva artikkel får orda? Forklar kvifor.<br>
            ____ ${nn("skulebok")} · ____ ${nn("sommarferie")} · ____ ${nn("fotballag")}${linje(2)}</li>
        </ol>`,
        fasit: `<ol>
          <li>${nn("bil-")} + ${nn("-ane")}: bestemt form fleirtal. ${nn("klokk-")} + ${nn("-a")}: bestemt form eintal. ${nn("hopp-")} + ${nn("-ar")}: presens. ${nn("høyr-")} + ${nn("-de")}: preteritum. ${nn("varm-")} + ${nn("-ast")}: superlativ. ${nn("epl-")} + ${nn("-a")}: bestemt form fleirtal.</li>
          <li>a) B. b) O, avleiing (etterstaving ${nn("-ar")}). c) O, avleiing (etterstaving ${nn("-dom")}). d) B. e) O, samansetning. f) O, avleiing (forstaving ${nn("u-")}).</li>
          <li>${nn("ei skulebok")}, ${nn("ein sommarferie")}, ${nn("eit fotballag")}. Sisteleddet bestemmer kjønnet: ${nn("bok")} er hokjønn, ${nn("ferie")} er hankjønn og ${nn("lag")} er inkjekjønn.</li>
        </ol>`,
        sjaa: [
          "Stryk eleven -e-en i stamma (jent-, epl-, klokk-), eller blir stamma heile grunnforma?",
          "Bruker eleven omgrepa bestemt form, fleirtal, presens og preteritum når endinga skal forklarast?",
          "Skil eleven bøying (same ord) frå avleiing (nytt ord med ny tyding eller ordklasse)?",
          "Ser eleven at sisteleddet i ei samansetning avgjer kjønnet?",
        ],
        framover: "Elevar som deler feil, kan skrive ordet med to fargar: stamma i éin farge og endinga i ein annan. La dei så byte ut endinga og sjå at ordet framleis er det same. Elevar som blandar bøying og orddanning, kan få testspørsmålet «Er det same ordet i ei anna form, eller eit nytt ord?» som fast sjekk.",
      },

      "omgrep-ordklassar": {
        tittel: "Exit-lapp",
        tid: 10,
        form: "Åleine",
        oppgave: `<ol>
          <li>Skriv ordklassen over kvart av dei understreka orda. Alle ti ordklassane er med.<br>
            <span class="stor">${nn("<u>Uff</u>! <u>Etter</u> <u>skulen</u> <u>sprang</u> <u>den</u> <u>vesle</u> guten <u>fort</u> heim <u>og</u> åt <u>fordi</u> <u>han</u> var svolten.")}</span>${linje(2)}</li>
          <li>Kva ordklasse har det utheva ordet? Skriv kva test du brukte.<br>
            a) Han har ei <strong>høg</strong> stemme. &nbsp;&nbsp; Fuglen flaug <strong>høgt</strong>.<br>
            b) Vi et <strong>etter</strong> treninga. &nbsp;&nbsp; Vi et <strong>etter</strong> at treninga er ferdig.<br>
            c) <strong>Den</strong> sykkelen er ny. &nbsp;&nbsp; Eg kjøpte <strong>den</strong> i går.${linje(3)}</li>
        </ol>`,
        fasit: `<ol>
          <li>${nn("Uff")}: interjeksjon. ${nn("Etter")}: preposisjon. ${nn("skulen")}: substantiv. ${nn("sprang")}: verb. ${nn("den")}: determinativ. ${nn("vesle")}: adjektiv. ${nn("fort")}: adverb. ${nn("og")}: konjunksjon. ${nn("fordi")}: subjunksjon. ${nn("han")}: pronomen.</li>
          <li>a) ${nn("høg")}: adjektiv (beskriv substantivet ${nn("stemme")}). ${nn("høgt")}: adverb (fortel korleis fuglen flaug).<br>
            b) Første ${nn("etter")}: preposisjon (eit substantiv kjem etter). Andre ${nn("etter")}: subjunksjon saman med ${nn("at")} (ei heil setning med subjekt og verbal kjem etter).<br>
            c) Første ${nn("den")}: determinativ (står til substantivet ${nn("sykkelen")}). Andre ${nn("den")}: pronomen (står i staden for ${nn("sykkelen")}).</li>
        </ol>`,
        sjaa: [
          "Avgjer eleven ordklassen ut frå kva ordet gjer i setninga, eller ut frå ordet åleine?",
          "Kan eleven namngi testen (ein/ei/eit framfor, å framfor, kva kjem etter ordet)?",
          "Kva forveksling er vanlegast i klassen: adjektiv og adverb, preposisjon og subjunksjon, eller determinativ og pronomen?",
        ],
        framover: "Gi elevar som gjettar, eit testkort med éin test per ordklasse, og la dei bruke kortet høgt på tre nye setningar. Ta den vanlegaste forvekslinga i klassen opp att som oppstart neste time med to nye setningspar.",
      },

      "omgrep-boying": {
        tittel: "Exit-lapp",
        tid: 12,
        form: "Åleine",
        oppgave: `<ol>
          <li>Bøy orda i alle fire formene: ${nn("ein stol")} · ${nn("ei klokke")} · ${nn("eit tak")}${linje(3)}</li>
          <li>Skriv om utan <em>-s</em>, på to måtar: med ${nn("til")} og med ${nn("sin/si/sitt/sine")}.<br>
            a) ${nn("Karis jakke")} &nbsp; b) ${nn("naboens hus")}${linje(2)}</li>
          <li>Kva heiter tempuset?<br>
            a) Eg har lese boka. b) Eg las boka i går. c) Eg les boka no. d) Eg hadde lese boka før filmen kom.${linje(2)}</li>
          <li>Finn dei finitte og dei infinitte verbformene: ${nn("Ho har prøvd å ringje.")}${linje(1)}</li>
          <li>Bruk bokmålspreteritum som nøkkel. Skriv verbklassen og preteritum på nynorsk.<br>
            ${bm("snakket")} (${nn("snakke")}) · ${bm("kjøpte")} (${nn("kjøpe")}) · ${bm("bodde")} (${nn("bu")}) · ${bm("sang")} (${nn("syngje")})${linje(2)}</li>
        </ol>`,
        fasit: `<ol>
          <li>${nn("stolen, stolar, stolane")}. ${nn("klokka, klokker, klokkene")}. ${nn("taket, tak, taka")}.</li>
          <li>a) ${nn("jakka til Kari")}, ${nn("Kari si jakke")}. b) ${nn("huset til naboen")}, ${nn("naboen sitt hus")}. (s-genitiv er ikkje feil på nynorsk, men lite brukt.)</li>
          <li>a) presens perfektum. b) preteritum. c) presens. d) preteritum perfektum.</li>
          <li>Finitt: ${nn("har")}. Infinitt: ${nn("prøvd")} (perfektum partisipp) og ${nn("ringje")} (infinitiv).</li>
          <li>${nn("snakka")}: a-verb. ${nn("kjøpte")}: e-verb. ${nn("budde")}: kortverb. ${nn("song")}: sterkt verb.</li>
        </ol>`,
        sjaa: [
          "Får hokjønnsordet -a i bestemt eintal og inkjekjønnsordet -a i bestemt fleirtal?",
          "Rettar sin/si/sitt/sine seg etter det som blir eigd (si jakke, sitt hus)?",
          "Skil eleven presens perfektum frå preteritum, og veit eleven at berre den bøygde forma er finitt?",
          "Bruker eleven bokmålspreteritum som nøkkel til verbklassen?",
        ],
        framover: "Elevar som blandar kjønna, kan lage eit eige oppslag med éin modell per kjønn (gut, jente, hus) og samanlikne nye ord med modellen. Elevar som blandar tempus, kan teikne tidslinja frå leksjonen og plassere fire eigne setningar på ho.",
      },

      "omgrep-setning": {
        tittel: "Exit-lapp",
        tid: 10,
        form: "Åleine",
        oppgave: `<ol>
          <li>Finn verbal, subjekt, indirekte objekt, objekt og adverbial: ${nn("I går gav bestemor meg ei ny bok.")}${linje(2)}</li>
          <li>Finn verbal, subjekt, predikativ og adverbial: ${nn("Etter kampen var spelarane trøytte.")}${linje(1)}</li>
          <li>Skriv ${nn("då")} eller ${nn("når")}.<br>
            a) ______ eg var tolv år, budde vi i Bergen.<br>
            b) Eg et alltid frukost ______ eg står opp.<br>
            c) Ring meg ______ du er ferdig.</li>
          <li>Skriv setningane med rett ordstilling.<br>
            a) Når eg kjem heim, eg et middag.<br>
            b) Ho sa at ho kunne ikkje kome.<br>
            c) I morgon vi skal spele kamp.${linje(3)}</li>
        </ol>`,
        fasit: `<ol>
          <li>Verbal ${nn("gav")}, subjekt ${nn("bestemor")}, indirekte objekt ${nn("meg")}, objekt ${nn("ei ny bok")}, adverbial ${nn("i går")}.</li>
          <li>Verbal ${nn("var")}, subjekt ${nn("spelarane")}, predikativ ${nn("trøytte")}, adverbial ${nn("etter kampen")}.</li>
          <li>a) ${nn("Då")} (${nn("da")} er òg gyldig). b) ${nn("når")}. c) ${nn("når")}.</li>
          <li>a) ${nn("Når eg kjem heim, et eg middag.")} b) ${nn("Ho sa at ho ikkje kunne kome.")} c) ${nn("I morgon skal vi spele kamp.")}</li>
        </ol>`,
        sjaa: [
          "Finn eleven verbalet først og bruker spørsmåla kven/kva + verbal for å finne subjektet?",
          "Ser eleven at predikativet trøytte står i fleirtal fordi subjektet er fleirtal?",
          "Bruker eleven då om éin gong i fortida og når om gjentaking og framtid?",
          "Flyttar eleven verbalet fram etter ei innleiande leddsetning, og plasserer eleven ikkje framfor verbalet i leddsetninga?",
        ],
        framover: "Elevar som bryt V2, kan bruke plassmodellen (plass 1, plass 2 = verbalet, resten) på tre setningar frå eigen tekst. Elevar som vel feil mellom då og når, kan skrive hugseregelen «Den gongen då, kvar gong når» i margen og lage to eigne døme.",
      },

      "grammatikk-substantiv": {
        tittel: "Exit-lapp",
        tid: 8,
        form: "Åleine",
        oppgave: `<ol>
          <li>Skriv artikkel og dei tre andre formene.
            <table>
              <thead><tr><th>Ubestemt eintal</th><th>Bestemt eintal</th><th>Ubestemt fleirtal</th><th>Bestemt fleirtal</th></tr></thead>
              <tbody>
                <tr><td>____ bil</td><td></td><td></td><td></td></tr>
                <tr><td>____ dør</td><td></td><td></td><td></td></tr>
                <tr><td>____ eple</td><td></td><td></td><td></td></tr>
                <tr><td>____ bok</td><td></td><td></td><td></td></tr>
                <tr><td>____ hus</td><td></td><td></td><td></td></tr>
              </tbody>
            </table></li>
          <li>Skriv setninga på rett nynorsk: ${nn("Jenten la boken på bordet ved døren, og barna åt alle eplene.")}${linje(2)}</li>
        </ol>`,
        fasit: `<ol>
          <li>${nn("ein bil, bilen, bilar, bilane")}. ${nn("ei dør, døra, dører, dørene")}. ${nn("eit eple, eplet, eple, epla")}. ${nn("ei bok, boka, bøker, bøkene")}. ${nn("eit hus, huset, hus, husa")}.</li>
          <li>${nn("Jenta la boka på bordet ved døra, og barna åt alle epla.")} (${nn("borna")} er òg rett.)</li>
        </ol>`,
        sjaa: [
          "Bruker eleven -a i bestemt eintal av hokjønnsord (døra, boka) og ikkje -en?",
          "Får inkjekjønnsorda -a i bestemt fleirtal (husa, epla) og inga ending i ubestemt fleirtal (hus, eple)?",
          "Hugsar eleven omlyden i bøker og bøkene?",
        ],
        framover: "Elevar med -en på hokjønnsord kan lage ei liste over ti vanlege hokjønnsord frå eigne tekstar og slå opp kjønnet i ordboka. Elevar med -ene i inkjekjønn kan øve med «Inkjekjønn i fleirtal» i mengdetreninga til dei har 80 % rett.",
      },

      "grammatikk-verb": {
        tittel: "Exit-lapp",
        tid: 10,
        form: "Åleine",
        oppgave: `<ol>
          <li>Fyll ut tabellen. Den første rada er eit døme.
            <table>
              <thead><tr><th>Infinitiv</th><th>Presens</th><th>Preteritum</th><th>Perfektum</th></tr></thead>
              <tbody>
                <tr><td>å kaste</td><td>kastar</td><td>kasta</td><td>har kasta</td></tr>
                <tr><td>å vaske</td><td></td><td></td><td>har</td></tr>
                <tr><td>å høyre</td><td></td><td></td><td>har</td></tr>
                <tr><td>å skrive</td><td></td><td></td><td>har</td></tr>
                <tr><td>å ete</td><td></td><td></td><td>har</td></tr>
                <tr><td>å gjere</td><td></td><td></td><td>har</td></tr>
                <tr><td>å seie</td><td></td><td></td><td>har</td></tr>
                <tr><td>å gå</td><td></td><td></td><td>har</td></tr>
              </tbody>
            </table></li>
          <li>Bruk «i går»-testen. Er verbet sterkt eller svakt? ${nn("vaske")} · ${nn("skrive")} · ${nn("høyre")} · ${nn("ete")}${linje(1)}</li>
        </ol>`,
        fasit: `<ol>
          <li>${nn("vaskar, vaska, har vaska")}. ${nn("høyrer, høyrde, har høyrt")}. ${nn("skriv, skreiv, har skrive")}. ${nn("et, åt, har ete")}. ${nn("gjer, gjorde, har gjort")}. ${nn("seier, sa, har sagt")}. ${nn("går, gjekk, har gått")}.</li>
          <li>${nn("vaske")}: svakt (${nn("vaska")}, ending). ${nn("skrive")}: sterkt (${nn("skreiv")}, vokalskifte). ${nn("høyre")}: svakt (${nn("høyrde")}, ending). ${nn("ete")}: sterkt (${nn("åt")}, vokalskifte).</li>
        </ol>`,
        sjaa: [
          "Har a-verba -ar i presens (vaskar), eller står bokmålsforma vasker?",
          "Har dei sterke verba inga ending i presens (skriv, et) og rett form etter har (skrive, ete)?",
          "Kan eleven dei verba som skil seg mest frå bokmål: ete, gjere, seie?",
        ],
        framover: "Elevar som blandar presens og preteritum av a-verb, kan lære hugseregelen «-ar no, -a i går». Elevar som manglar dei sterke verba, kan lage ei eiga liste med ti sterke verb dei bruker ofte, og øve med «Sterke verb i preteritum» i mengdetreninga.",
      },

      "grammatikk-pronomen": {
        tittel: "Exit-lapp",
        tid: 8,
        form: "Åleine",
        oppgave: `<ol>
          <li>Skriv rett pronomen på nynorsk.<br>
            a) Kjem ______ (${bm("dere")}) i kveld?<br>
            b) Eg såg ______ (${bm("dere")}) på kino.<br>
            c) ______ (${bm("de")}) bur i Bergen.<br>
            d) Har du sett ______ (${bm("henne")})? &nbsp; e) ______ (${bm("hun")}) les. &nbsp; f) Vi møtte ______ (${bm("ham")}) på butikken.</li>
          <li>Skriv rett form av eigedomspronomenet.<br>
            ${nn("bilen")} ______ (min) · ${nn("boka")} ______ (min) · ${nn("huset")} ______ (vår) · ${nn("bøkene")} ______ (din)</li>
          <li>Skriv spørjeorda på nynorsk.<br>
            ${bm("hva")} · ${bm("hvem")} · ${bm("hvordan")} · ${bm("hvorfor")} · ${bm("Hvor bor du?")} · ${bm("Hvor gammel er du?")}${linje(2)}</li>
        </ol>`,
        fasit: `<ol>
          <li>a) ${nn("de")} (eller ${nn("dokker")}). b) ${nn("dykk")} (eller ${nn("dokker")}). c) ${nn("Dei")}. d) ${nn("henne")} (${nn("ho")} er òg gyldig som objektsform). e) ${nn("Ho")}. f) ${nn("han")} (forma ${bm("honom")} er ikkje gyldig etter 2012).</li>
          <li>${nn("bilen min, boka mi, huset vårt, bøkene dine")}.</li>
          <li>${nn("kva, kven, korleis, kvifor")} (${nn("korfor")} er òg rett). ${nn("Kvar bur du?")} (${nn("Kor bur du?")} er òg rett.) ${nn("Kor gammal er du?")} (${nn("gamal")} er òg rett.)</li>
        </ol>`,
        sjaa: [
          "Skil eleven de (dere som subjekt), dykk (dere som objekt) og dei (de/dem)?",
          "Bruker eleven ho som subjekt og henne som objekt, og han i begge stillingar?",
          "Rettar eigedomspronomenet seg etter kjønn og tal på substantivet (mi, vårt, dine)?",
          "Skriv eleven korleis og kvifor utan bokmålsformer, og kor framfor gradsord som gammal?",
        ],
        framover: "Elevar som blandar de og dei, kan bruke testen: kan du setje inn dere på bokmål? Då er det de eller dykk. Elevar som manglar spørjeorda, kan skrive dei på ein lapp ved skrivesaka og sjekke kvar tekst mot lappen før dei leverer.",
      },

      "grammatikk-adjektiv": {
        tittel: "Exit-lapp",
        tid: 8,
        form: "Åleine",
        oppgave: `<ol>
          <li>Skriv adjektivet i rett form.<br>
            a) ei ______ (stor) klokke &nbsp; b) eit ______ (stor) hus &nbsp; c) mange ______ (stor) hus<br>
            d) det ______ (gul) huset &nbsp; e) Huset er ______ (fin). &nbsp; f) Bøkene er ______ (gammal).<br>
            g) eit ______ (vanleg) hus &nbsp; h) Jenta er ______ (glad).</li>
          <li>Gradbøy: ${nn("varm")} · ${nn("god")} · ${nn("liten")} · ${nn("gammal")}${linje(2)}</li>
        </ol>`,
        fasit: `<ol>
          <li>a) ${nn("stor")}. b) ${nn("stort")}. c) ${nn("store")}. d) ${nn("gule")}. e) ${nn("fint")}. f) ${nn("gamle")}. g) ${nn("vanleg")}. h) ${nn("glad")}.</li>
          <li>${nn("varm, varmare, varmast")}. ${nn("god, betre, best")}. ${nn("liten, mindre, minst")}. ${nn("gammal, eldre, eldst")} (${nn("gamal")} er òg rett).</li>
        </ol>`,
        sjaa: [
          "Får adjektivet -t i inkjekjønn og -e i fleirtal og bestemt form?",
          "Bøyer eleven adjektivet etter subjektet når det står etter er (fint, gamle)?",
          "Veit eleven at adjektiv på -leg ikkje får -t (eit vanleg hus)?",
          "Gradbøyer eleven med -are og -ast, ikkje -ere og -est?",
        ],
        framover: "Elevar som gløymer samsvaret etter er, kan finne subjektet og dra ei pil frå adjektivet til subjektet i tre setningar frå eigen tekst. Elevar som skriv -ere og -est, kan øve med «Komparativ» og «Superlativ» i mengdetreninga.",
      },

      "trening-substantiv": {
        tittel: "Fingerprøve",
        tid: 10,
        form: "Åleine",
        oppgave: `<p>Skriv artikkel, bestemt form eintal og bestemt form fleirtal. Set ring rundt dei orda du var usikker på.</p>
          <table>
            <thead><tr><th>Ord</th><th>Artikkel</th><th>Bestemt eintal</th><th>Bestemt fleirtal</th></tr></thead>
            <tbody>
              <tr><td>dag</td><td></td><td></td><td></td></tr>
              <tr><td>seng</td><td></td><td></td><td></td></tr>
              <tr><td>brev</td><td></td><td></td><td></td></tr>
              <tr><td>natt</td><td></td><td></td><td></td></tr>
              <tr><td>veke</td><td></td><td></td><td></td></tr>
              <tr><td>fjell</td><td></td><td></td><td></td></tr>
              <tr><td>avis</td><td></td><td></td><td></td></tr>
              <tr><td>tid</td><td></td><td></td><td></td></tr>
              <tr><td>kjøkken</td><td></td><td></td><td></td></tr>
              <tr><td>buss</td><td></td><td></td><td></td></tr>
            </tbody>
          </table>`,
        fasit: `<ul>
          <li>${nn("ein dag, dagen, dagane")} · ${nn("ei seng, senga, sengene")} · ${nn("eit brev, brevet, breva")}</li>
          <li>${nn("ei natt, natta, nettene")} · ${nn("ei veke, veka, vekene")} · ${nn("eit fjell, fjellet, fjella")}</li>
          <li>${nn("ei avis, avisa, avisene")} · ${nn("ei tid, tida, tidene")} · ${nn("eit kjøkken, kjøkkenet, kjøkkena")} · ${nn("ein buss, bussen, bussane")}</li>
        </ul>`,
        sjaa: [
          "Kva kjønn bommar eleven oftast på? Hokjønnsord som seng, avis og tid blir ofte hankjønn hos bokmålselevar.",
          "Skriv eleven -ene i inkjekjønn fleirtal (brevene, fjellene) i staden for -a?",
          "Stemmer ringane rundt usikre ord med feila? Det viser om eleven veit kva han eller ho ikkje kan.",
        ],
        framover: "La eleven skrive dei orda han eller ho bomma på, i ei personleg ordliste med kjønn og bøying frå ordboka, og ta ein ny runde i «Hokjønnsord» eller «Inkjekjønn i fleirtal» i mengdetreninga til runden har minst 80 % rett.",
      },

      "trening-verb": {
        tittel: "Minitekst",
        tid: 10,
        form: "Åleine",
        oppgave: `<ol>
          <li>Skriv verba i preteritum, og det siste i perfektum.<br>
            I går ________ (vakne) eg seint. Eg ________ (ete) frukost i full fart og ________ (springe) ut. Bussen ________ (køyre) akkurat då eg ________ (kome) til haldeplassen, så mamma ________ (ta) meg med i bilen. Eg har aldri ________ (springe) så fort!</li>
          <li>Kva verbklasse er det? Skriv klassen og preteritum.<br>
            ${nn("vaske")} · ${nn("kjøpe")} · ${nn("spørje")} · ${nn("bu")} · ${nn("finne")}${linje(2)}</li>
        </ol>`,
        fasit: `<ol>
          <li>${nn("vakna, åt, sprang, køyrde, kom, tok, sprunge")}.</li>
          <li>${nn("vaske")}: a-verb, ${nn("vaska")}. ${nn("kjøpe")}: e-verb, ${nn("kjøpte")}. ${nn("spørje")}: j-verb, ${nn("spurde")}. ${nn("bu")}: kortverb, ${nn("budde")}. ${nn("finne")}: sterkt verb, ${nn("fann")}.</li>
        </ol>`,
        sjaa: [
          "Skriv eleven bokmålsformer i preteritum, til dømes vaknet, spiste eller kjørte?",
          "Bruker eleven rett perfektum partisipp av sterke verb (har sprunge, ikkje har sprang)?",
          "Kan eleven plassere verba i rett klasse, og stemmer klassen med preteritumsforma eleven skriv?",
        ],
        framover: "Elevar som blandar a-verb og e-verb, kan bruke bokmålspreteritum som nøkkel (-et gir a-verb, -te eller -de gir e-verb). Elevar som manglar sterke verb, kan øve med «Sterke verb i preteritum» og «Sterke verb i presens og perfektum» og skrive tre setningar med kvart verb dei bomma på.",
      },

      "trening-adjektiv": {
        tittel: "Exit-lapp",
        tid: 8,
        form: "Åleine",
        oppgave: `<ol>
          <li>Skriv rett form i inkjekjønn.<br>
            eit ______ (ny) hus · eit ______ (blå) hus · eit ______ (liten) hus · eit ______ (vanleg) hus · eit ______ (raud) hus · eit ______ (viktig) val · eit ______ (norsk) ord</li>
          <li>Skriv rett form i fleirtal: mange ______ (liten) hus · mange ______ (gammal) hus · mange ______ (ny) hus</li>
          <li>Gradbøy: ${nn("lang")} · ${nn("tung")} · ${nn("vakker")} · ${nn("billeg")}${linje(2)}</li>
        </ol>`,
        fasit: `<ol>
          <li>${nn("nytt, blått, lite, vanleg, raudt, viktig, norsk")}.</li>
          <li>${nn("små")} (${nn("småe")} er òg rett), ${nn("gamle")}, ${nn("nye")}.</li>
          <li>${nn("lang, lengre, lengst")}. ${nn("tung, tyngre, tyngst")}. ${nn("vakker, vakrare, vakrast")}. ${nn("billeg, billegare, billegast")}.</li>
        </ol>`,
        sjaa: [
          "Kjenner eleven unntaka i inkjekjønn: -leg, -ig og -sk får ikkje -t, og ny og blå får -tt?",
          "Bøyer eleven liten rett (lite, små)?",
          "Bruker eleven -ast i superlativ (vakrast, billegast), og ikkje -est?",
        ],
        framover: "Elevar som set -t på alle adjektiv, kan lage ein unntaksboks i skriveboka (-leg, -ig, -sk utan -t) og leite etter slike adjektiv i ein nynorsktekst. Elevar som bommar på gradbøyinga, kan øve med «Komparativ» og «Superlativ» i mengdetreninga.",
      },

      "trening-smaord": {
        tittel: "Exit-lapp",
        tid: 10,
        form: "Åleine",
        oppgave: `<ol>
          <li>Skriv på nynorsk: ${bm("ikke · bare · hvis · mye · uten · sammen · hverandre · selv · fra · hjem")}${linje(2)}</li>
          <li>Vel ${nn("noko, nokon, noka")} eller ${nn("nokre")}.<br>
            a) Har du sett ______ katt her? &nbsp; b) Eg har ikkje ______ å gjere. &nbsp; c) ______ elevar kom for seint.<br>
            d) Vil du ha ______ brød? &nbsp; e) Har du ______ jakke eg kan låne?</li>
          <li>Vel ${nn("sin, si, sitt, sine")} eller ${nn("hans")}.<br>
            a) Kari ringde til mora ______. &nbsp; b) Per og Ola vaska bilen ______.<br>
            c) Per har ein ny sykkel. Ola lånte sykkelen ______. &nbsp; d) Lise gav bort bøkene ______.</li>
          <li>Vel ${nn("då")} eller ${nn("når")}.<br>
            a) ______ eg kom heim i går, var huset tomt. &nbsp; b) Eg et alltid frukost ______ eg står opp.</li>
        </ol>`,
        fasit: `<ol>
          <li>${nn("ikkje, berre, viss")} (eller ${nn("dersom, om")}), ${nn("mykje, utan, saman, kvarandre, sjølv, frå, heim")}.</li>
          <li>a) ${nn("nokon")}. b) ${nn("noko")}. c) ${nn("Nokre")}. d) ${nn("noko")}. e) ${nn("noka")}.</li>
          <li>a) ${nn("si")}. b) ${nn("sin")}. c) ${nn("hans")} (sykkelen er Per sin, ikkje Ola sin). d) ${nn("sine")}.</li>
          <li>a) ${nn("Då")} (${nn("da")} er òg gyldig). b) ${nn("når")}.</li>
        </ol>`,
        sjaa: [
          "Kva småord står framleis på bokmål? Ikkje, berre og mykje er dei som oftast glepp.",
          "Skil eleven noko (mengd og inkjekjønn) frå nokon (hankjønn i spørsmål og nekting) og nokre (fleirtal)?",
          "Bruker eleven sin/si/sitt/sine når eigaren er subjektet, og hans når eigaren er ein annan?",
        ],
        framover: "Elevar med mange bokmålssmåord kan søkje etter dei fem vanlegaste (ikke, bare, mye, noen, hva) i sin eigen tekst før dei leverer. Elevar som blandar sin og hans, kan stille spørsmålet «Er eigaren subjektet i setninga?» og øve med «Sin eller hans?» i mengdetreninga.",
      },

      "trening-setning": {
        tittel: "Exit-lapp",
        tid: 10,
        form: "Åleine",
        oppgave: `<ol>
          <li>Set strek under verbalet og ring rundt subjektet.<br>
            a) ${nn("I dag har klassen fri.")} &nbsp; b) ${nn("Etter middagen las far avisa.")} &nbsp; c) ${nn("Kjem du i morgon?")}</li>
          <li>Set klammer rundt leddsetninga.<br>
            a) ${nn("Vi var glade fordi vi vann kampen.")} &nbsp; b) ${nn("Boka som du gav meg, er spennande.")}</li>
          <li>Skriv setningane med rett ordstilling.<br>
            a) I morgon eg skal på trening. &nbsp; b) Han sa at han hadde ikkje tid. &nbsp; c) Fordi det regna, vi var inne.${linje(3)}</li>
          <li>Skriv rett form av adjektivet: a) Husa er ______ (gammal). &nbsp; b) Rommet var ______ (kald).</li>
        </ol>`,
        fasit: `<ol>
          <li>a) verbal ${nn("har")}, subjekt ${nn("klassen")}. b) verbal ${nn("las")}, subjekt ${nn("far")}. c) verbal ${nn("Kjem")}, subjekt ${nn("du")}.</li>
          <li>a) [${nn("fordi vi vann kampen")}]. b) [${nn("som du gav meg")}].</li>
          <li>a) ${nn("I morgon skal eg på trening.")} b) ${nn("Han sa at han ikkje hadde tid.")} c) ${nn("Fordi det regna, var vi inne.")}</li>
          <li>a) ${nn("gamle")}. b) ${nn("kaldt")}.</li>
        </ol>`,
        sjaa: [
          "Finn eleven subjektet også når det står etter verbalet (las far, kjem du)?",
          "Kjenner eleven att leddsetningar på subjunksjonen (fordi, som)?",
          "Flyttar eleven verbalet til andreplass etter eit innleiande adverbial eller ei innleiande leddsetning?",
          "Bøyer eleven predikativet etter subjektet?",
        ],
        framover: "Elevar som ikkje finn subjektet ved inversjon, kan gjere setninga om til eit spørsmål med kven eller kva + verbal. Elevar som bryt V2, kan merke plass 1 og plass 2 i fem setningar frå eigen tekst og øve med «Ordstilling: verbalet på andreplass».",
      },

      "trening-blanda": {
        tittel: "Rett teksten",
        tid: 12,
        form: "Åleine, deretter i par",
        oppgave: `<p>Teksten har åtte feil. Set strek under feila og skriv rett form over. Samanlikn så med sidemannen.</p>
          <p class="stor" style="line-height:2.4">I sommarferien var vi på tur i fjellet. Vi gjekk i fire timar, og alle var trøytt då vi kom fram. Døren til hytta var låst, men pappa fann nøkkelen under ein stein. Vi spiste maten vår og snakket lenge om turen. Då det vart mørkt, vi tende eit lys. Fjellene rundt oss var heilt kvite av snø. Eg visste ikkje hvem som hadde budd der før, men det var tydeleg at dei ikke hadde vore der på lenge.</p>
          <p>Kva slags feil fann du flest av: substantiv, verb, adjektiv, småord eller ordstilling? Kva vil du trene meir på?</p>${linje(2)}`,
        fasit: `<ol>
          <li>${nn("trøytt")} → ${nn("trøytte")} (predikativ i fleirtal)</li>
          <li>${bm("Døren")} → ${nn("Døra")} (hokjønn, bestemt eintal)</li>
          <li>${bm("spiste")} → ${nn("åt")} (${nn("ete, et, åt, har ete")})</li>
          <li>${bm("snakket")} → ${nn("snakka")} (a-verb, preteritum)</li>
          <li>${nn("vi tende")} → ${nn("tende vi")} (V2 etter innleiande leddsetning; ${nn("tente")} er òg rett)</li>
          <li>${bm("Fjellene")} → ${nn("Fjella")} (inkjekjønn, bestemt fleirtal)</li>
          <li>${bm("hvem")} → ${nn("kven")} (spørjeord)</li>
          <li>${bm("ikke")} → ${nn("ikkje")} (småord)</li>
        </ol>`,
        sjaa: [
          "Kor mange av dei åtte feila finn eleven, og kva type feil blir ikkje funne?",
          "Finn eleven ordstillingsfeilen og samsvarsfeilen, som ikkje er bokmålsord og difor er vanskelegare å sjå?",
          "Rettar eleven ord som var rette (budde, vart, fann, vore)?",
          "Stemmer det eleven sjølv meiner han eller ho bør trene på, med feila eleven gjorde?",
        ],
        framover: "La eleven gå til den treningsmodulen som høyrer til feiltypen han eller ho bomma mest på, og ta ein runde der før neste tekst. Elevar som fann alle bokmålsorda, men ikkje ordstillings- og samsvarsfeila, bør lese eigne tekstar éin gong ekstra med berre desse to tinga i tankane.",
      },
    },

    eigenvurdering: [
      "dele eit ord i stamme og ending og skilje bøying frå orddanning",
      "finne ordklassen til eit ord ut frå kva det gjer i setninga",
      "bøye substantiv i alle tre kjønn, også hokjønn i bestemt form (<em class=\"nn\">boka</em>) og inkjekjønn i fleirtal (<em class=\"nn\">husa</em>)",
      "bøye a-verb, e-verb og dei vanlegaste sterke verba i presens, preteritum og perfektum",
      "bøye adjektivet etter substantivet, også etter <em class=\"nn\">er</em> og <em class=\"nn\">blir</em>",
      "bruke nynorske pronomen og småord som <em class=\"nn\">ho, henne, de, dykk, dei, korleis, kvifor, noko</em> og <em class=\"nn\">nokon</em>",
      "velje rett mellom <em class=\"nn\">då</em> og <em class=\"nn\">når</em> og mellom <em class=\"nn\">sin</em> og <em class=\"nn\">hans</em>",
      "finne verbal, subjekt og objekt og setje verbalet på andreplass",
      "plassere <em class=\"nn\">ikkje</em> rett i leddsetningar",
      "finne og rette formfeil i min eigen tekst og forklare dei med fagomgrep",
    ],
  });
})();
