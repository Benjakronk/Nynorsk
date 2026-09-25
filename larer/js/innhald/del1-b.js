/* Lærarinnhald for Del 1 · Språkhistorie: nynorsk i dag, skriving og repetisjon. Formatet står i larer/README.md. */

Larar.register("historie-i-dag", {
  tittelnotat: "Etter tre modular med historie kjem vi no til vår eiga tid. Sei det høgt: det de har lese om 1814, Aasen og samnorsk, er grunnen til at de sit med sidemål på timeplanen i dag. Denne timen handlar om korleis det står til no, og om ein debatt de sjølve er ein del av.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>sjå kor mange som skriv <strong>nynorsk</strong> i dag, og kvar</li>
        <li>lære kva <strong>språklova</strong> frå 2022 seier</li>
        <li>forstå kravet om <strong>25 %</strong></li>
        <li>drøfte <strong>sidemålsdebatten</strong> med argument for og mot</li>
      </ul>`,
      notes: "Knyt an til dei tidlegare modulane: jamstillinga i 1885 og samnorskpolitikken som vart gitt opp i 1981. Denne modulen svarer på spørsmålet: kva vart resultatet?",
    },
    {
      type: "diskuter",
      title: "Nynorsk rundt deg",
      prompt: `<p>Kvar har du sett eller høyrt nynorsk den siste veka?</p>
        <p class="liten">Tenk på skilt, nettsider, TV, songtekstar, lærebøker, sosiale medium.</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      notes: "Skriv svara på tavla. Mange elevar oppdagar at dei møter nynorsk oftare enn dei trur: i NRK-tekstar, på offentlege nettsider og i songtekstar. Er klassen på eit nynorskområde, snu spørsmålet: kvar møter de bokmål? Ta vare på lista, du kan vise til ho når de kjem til NRK og 25 %-kravet.",
    },
    {
      title: "Kor mange skriv nynorsk?",
      body: `<p class="kjempe midt">10–12 %</p>
        <p class="midt">av nordmenn har nynorsk som hovudmål</p>`,
      steps: [
        "<p class=\"stor\">Kjerneområde: <strong>Vestland</strong> og <strong>Møre og Romsdal</strong></p>",
        "<p class=\"stor\">og delar av indre Austlandet: <strong>Valdres, Hallingdal, Gudbrandsdalen</strong></p>",
      ],
      notes: "Har de eit kart i klasserommet, peik ut områda. Mange elevar trur nynorsk berre finst på Vestlandet, så få fram at Valdres, Hallingdal og Gudbrandsdalen òg er nynorskområde. Du kan knyte til Aasen: han vekta former frå Vestlandet og dei indre bygdene fordi dei stod nærare gamalnorsk.",
    },
    {
      type: "sporsmal",
      question: "Kvar ligg kjerneområda for nynorsk?",
      options: [
        "Oslo og Viken",
        "Vestland, Møre og Romsdal og delar av indre Austlandet",
        "Nord-Noreg og Trøndelag",
        "Berre i Bergen",
      ],
      correct: 1,
      explain: "Vestland og Møre og Romsdal er kjerneområda, saman med Valdres, Hallingdal og Gudbrandsdalen.",
      notes: "Lat elevane vise svaret med fingrane. Vel nokon «Berre i Bergen», spør: kvifor trur du det? Få fram at kjerneområda er store landsdelar, ikkje éin by.",
    },
    {
      title: "Hovudmål og sidemål",
      body: `<div class="to-kol">
          <div class="boks"><h3>Hovudmål</h3><p>det skriftspråket du lærer først og skriv mest</p></div>
          <div class="boks"><h3>Sidemål</h3><p>det av dei to du <strong>ikkje</strong> har som hovudmål</p></div>
        </div>`,
      steps: ["<p class=\"stor midt\">Sidan <strong>1907</strong> har alle elevar lært båe.</p>"],
      notes: "Poenget er at omgrepa er relative: for ein elev i Ørsta er bokmål sidemålet. Spør klassen: kva er sidemålet for ein elev i Volda? Kva er det for dykk? Mange elevar trur at «sidemål» er eit anna ord for nynorsk. Det er det ikkje.",
    },
    {
      title: "Språklova frå 2022",
      steps: [
        "<p class=\"stor\"><strong>Norsk</strong> er hovudspråket.</p>",
        "<p class=\"stor\"><strong>Bokmål og nynorsk</strong> er likeverdige skriftspråk.</p>",
        "<p class=\"stor\">Ho tok over for <strong>mållova</strong>, som sidan 1980 har pålagt staten å bruke begge.</p>",
      ],
      notes: "Få fram samanhengen bakover: likeverdige i 2022 er same tanke som jamstilte i 1885. Språklova er altså ikkje noko heilt nytt, men ei moderne form av eit gammalt prinsipp. Elevane blandar ofte mållova og språklova: mållova er den gamle frå 1980, språklova den nye frå 2022.",
    },
    {
      type: "sporsmal",
      question: "Kva seier språklova (2022) om bokmål og nynorsk?",
      options: [
        "At bokmål er hovudskriftspråket og nynorsk eit sideskriftspråk",
        "At nynorsk berre skal brukast i Vestland",
        "At dei er likeverdige skriftspråk",
        "At alle må velje eitt av dei innan dei er 18",
      ],
      correct: 2,
      explain: "Språklova slår fast at norsk er hovudspråket, og at bokmål og nynorsk er likeverdige skriftspråk.",
      notes: "Det første alternativet er den vanlegaste misforståinga: at bokmål er «det eigentlege» og nynorsk eit tillegg. Spør: kvar kjem ordet sidemål inn? Svar: i skulen, for den einskilde eleven, ikkje i lova.",
    },
    {
      title: "Kravet om 25 %",
      body: `<p class="kjempe midt">25 %</p>`,
      steps: [
        "<p class=\"stor\"><strong>Statsorgan:</strong> minst 25 % nynorsk og minst 25 % bokmål i tekstar til ålmenta</p>",
        "<p class=\"stor\"><strong>NRK:</strong> minst 25 % nynorsk i sendingane, både tekst og munnleg</p>",
      ],
      notes: "Forklar ordet ålmenta: folk flest, alle som les. Spør: kvifor trur de kravet er 25 % og ikkje 10 %, når berre 10–12 % har nynorsk som hovudmål? La elevane gjette før du hjelper: kravet skal sikre at nynorsk er synleg og i bruk, ikkje spegle talet på brukarar. Dette er eit godt døme på eit argument elevane kan bruke eller kritisere i drøftinga.",
    },
    {
      type: "sporsmal",
      question: "Kor stor del nynorsk skal NRK ha i sendingane sine?",
      options: ["Minst 10 %", "Minst 25 %", "Minst 50 %", "Det er ingen regel"],
      correct: 1,
      explain: "NRK skal ha minst 25 % nynorsk, og kravet gjeld både tekst og munnleg.",
      notes: "Vis til lista frå starten av timen: fann nokon nynorsk hos NRK? Spør kva som tel som munnleg nynorsk på radio og TV. Mange elevar veit ikkje at nynorsk òg kan vere talt.",
    },
    {
      title: "Sidemålsdebatten",
      body: `<div class="to-kol">
          <div class="boks"><h3>For sidemål</h3><ul><li>kulturarv</li><li>utan opplæring kjem nynorsken under press</li><li>nynorskelevar treng lærebøker og institusjonar på eige mål</li></ul></div>
          <div class="boks"><h3>Mot sidemål</h3><ul><li>tungvint å lære to så like variantar</li><li>tida kunne gått til engelsk eller andre fag</li><li>vanskeleg å bli vurdert i to skriftspråk</li></ul></div>
        </div>`,
      notes: "Ver nøytral her. Elevane skal lære å kjenne att og vurdere argument, ikkje ta over standpunktet til læraren. Spør: kva for argument byggjer på fakta, og kva byggjer på kjensler eller verdiar? Begge slag er lovlege i ein debatt, men det er nyttig å skilje dei. Minn om at debatten har gått i bølgjer.",
    },
    {
      type: "sporsmal",
      question: "Kva for eit argument er <strong>mot</strong> sidemålsopplæring?",
      options: [
        "Nynorsk er ein del av norsk kulturarv.",
        "Det styrkjer språkforståinga å kjenne begge variantane.",
        "Elevar med nynorsk som hovudmål treng at fleire kan lese det.",
        "Tida kunne brukast til andre fag.",
      ],
      correct: 3,
      explain: "Argumentet om tid til andre fag er mot. Dei tre andre er argument for sidemålsopplæring.",
      notes: "Etter svaret: be ein elev snu argumentet. Kva ville ein tilhengjar av sidemål svare på «tida kunne brukast til andre fag»? Slik øver dei på motargument, som dei treng i drøftingsteksten.",
    },
    {
      type: "tekst",
      title: "Debattutdrag",
      text: `<p>Kvart par år kjem det forslag om å fjerne karakter i sidemål, eller å gjere
        sidemål valfritt. Tilhengjarane meiner det vil gi meir motiverte elevar, og at
        opplæring framleis kan halde fram utan eigen karakter. Motstandarane meiner det vil
        svekkje stillinga til nynorsken kraftig, fordi karakteren er det som faktisk får
        elevar til å arbeide med faget.</p>
        <p>Eit kompromissforslag har vore å gi <em class="nn">éin felles norskkarakter</em>
        som inkluderer både hovudmål og sidemål. Det er allereie prøvd ut, og diskusjonen
        går framleis.</p>`,
      kjelde: "Debattutdrag",
      notes: "Les utdraget høgt, eller la ein elev lese. Spør så: kva er hovudsplitten i debatten? Svar: om sidemål skal ha eigen karakter eller ikkje. Poenga: tilhengjarane meiner det gir meir motiverte elevar, motstandarane meiner karakteren er det som får elevane til å arbeide med faget, og eit kompromiss har vore éin felles norskkarakter.",
    },
    {
      type: "diskuter",
      title: "Kva meiner du?",
      prompt: `<p class="stor">Bør sidemål ha eigen karakter?</p>
        <p>Still deg på ei linje frå <strong>heilt einig</strong> til <strong>heilt ueinig</strong>. Grunngi med minst eitt argument.</p>`,
      form: "Heile klassen: meiningslinje",
      tid: 8,
      notes: "Meiningslinja: elevane stiller seg langs veggen etter kor einige dei er. Spør nokre frå kvar ende og nokre frå midten. Krev at dei grunngir, og la gjerne ein elev flytte seg om han eller ho blir overtydd. Pass på tonen: sidemål kan vekkje sterke kjensler, og nynorskelevar i klassen skal ikkje kjenne seg som ein debattsak. Til slutt: få fram at dei beste innlegga viste til fakta, til dømes språklova eller 25 %-kravet.",
    },
    {
      title: "Nynorsk i kulturen",
      steps: [
        "<p class=\"stor\"><strong>Avis:</strong> <em class=\"nn\">Dag og Tid</em> kjem ut berre på nynorsk.</p>",
        "<p class=\"stor\"><strong>Musikk:</strong> Odd Nordstoga og Stein Torleif Bjella bruker nynorsk og dialekt.</p>",
        "<p class=\"stor\"><strong>Nett:</strong> nynorsk er synleg i sosiale medium og populærkultur.</p>",
      ],
      notes: "Spel gjerne eit kort utdrag av ein låt med nynorsk tekst og spør: merka de at det var nynorsk? Spør òg: kva skriv de sjølve i meldingar, bokmål, nynorsk eller dialekt? Mange skriv dialekt, og det er ein fin overgang til å snakke om skilnaden mellom talemål og skriftspråk, som var utgangspunktet for heile Del 1.",
    },
    {
      title: "Slik drøftar du",
      body: `<ol class="stor">
          <li>Presenter saka.</li>
          <li>Argument <strong>for</strong>, med fakta.</li>
          <li>Argument <strong>mot</strong>, med fakta.</li>
          <li>Ditt <strong>standpunkt</strong>, grunngitt.</li>
        </ol>`,
      steps: ["<p class=\"midt\">Fakta: språklova, 25 %, 10–12 %, kjerneområde</p>"],
      notes: "Dette er strukturen elevane skal bruke i drøftingsteksten til slutt i timen (lysbilete 18), som krev minst to fakta. Vanleg feil: eleven skriv berre si eiga meining. Minn om at ein drøftingstekst skal vise at du forstår motparten.",
    },
    {
      type: "oppgave",
      title: "Fakta og argument",
      body: `<ol>
          <li>Kor mange prosent av nordmenn har nynorsk som hovudmål?</li>
          <li>Kva år kom den nye språklova?</li>
          <li>Set om til nynorsk: <em class="bm">Alle norske elever lærer både bokmål og nynorsk på skolen.</em></li>
          <li>For eller mot sidemål? Skriv F eller M.<br>
            a) Det er for likt hovudmålet til å vere lærerikt.<br>
            b) Det styrkjer språkforståinga å kjenne begge variantane.<br>
            c) Det er vanskeleg å bli vurdert i to skriftspråk.</li>
        </ol>`,
      form: "Åleine",
      tid: 4,
      svar: "1. Om lag 10–12 %. 2. 2022. 3. <em class=\"nn\">Alle norske elevar lærer både bokmål og nynorsk på skulen.</em> 4. a) M, b) F, c) M.",
      notes: "Ei kort oppvarming før drøftinga. Gå gjennom svara saman. På oppgåve 3 er det to byte: <em>elevar</em> og <em>skulen</em>. På oppgåve 4 kan du be ein elev snu eitt av mot-argumenta til eit for-argument.",
    },
    {
      type: "oppgave",
      title: "Skriv ei drøfting",
      body: `<p class="stor">Kva plass skal nynorsk ha i Noreg i dag?</p>
        <ol>
          <li>Skriv 150–250 ord på nynorsk.</li>
          <li>Bruk minst to fakta: språklova, 25 %, 10–12 %, kjerneområde.</li>
          <li>Få med argument både for og mot.</li>
          <li>Avslutt med ditt eige standpunkt, grunngitt.</li>
        </ol>`,
      form: "Åleine",
      tid: 10,
      notes: "Gå rundt medan elevane skriv. Spør: kva er faktumet ditt, og kvar fann du det? Elevar som står fast, kan starte med ei setning frå meiningslinja: kva sa dei då? Bla gjerne tilbake til lysbilete 16 med strukturen. Dei som ikkje blir ferdige, skriv ferdig som lekse.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\">Om lag <strong>10–12 %</strong> har nynorsk som hovudmål.</p>",
        "<p class=\"stor\">Språklova 2022: bokmål og nynorsk er <strong>likeverdige</strong>.</p>",
        "<p class=\"stor\">Statsorgan og NRK: minst <strong>25 %</strong> nynorsk.</p>",
        "<p class=\"stor\">Sidemålsdebatten kjem att med jamne mellomrom.</p>",
      ],
      notes: "Be elevane skrive eitt argument i sidemålsdebatten dei ikkje var einige i før timen, men som dei no forstår. Det viser om dei har lytta til motparten.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen er den siste fagmodulen i Del 1 og knyter språkhistoria til notida: kor mange som skriv nynorsk og kvar, kva språklova frå 2022 seier, kravet om 25 % nynorsk hos statsorgan og NRK, og sidemålsdebatten. Timen har eit tydeleg drøftingspreg: elevane skal kunne skilje fakta frå meining og byggje eigne standpunkt på fakta frå timen. Til slutt svarer elevane på nokre korte oppgåver og skriv ein drøftingstekst for hand i skriveboka.</p>",
    mal: [
      "Elevane kan gjere greie for kor stor del av folket som har nynorsk som hovudmål, og kvar kjerneområda ligg.",
      "Elevane kan forklare kva språklova frå 2022 seier om bokmål og nynorsk, og kva 25 %-kravet inneber.",
      "Elevane kan forklare omgrepa hovudmål og sidemål.",
      "Elevane kan presentere argument for og mot sidemålsopplæring og grunngi eit eige standpunkt med fakta.",
    ],
    lareplan: [15, 9, 10],
    forkunnskapar: "Elevane bør ha gått gjennom dei tre første modulane i Del 1, særleg jamstillingsvedtaket i 1885 og samnorskpolitikken som vart gitt opp i 1981.",
    forebuing: [
      "Ha klar ein stad i klasserommet der elevane kan stille seg på ei meiningslinje (lysbilete 14).",
      "Finn gjerne eit kort utdrag av ein låt med nynorsk tekst til lysbilete 15.",
      "Tenk gjennom korleis du tek vare på nynorskelevar eller elevar med sterke meiningar i debatten.",
      "Elevane treng skrivebok til oppgåvene og drøftingsteksten til slutt (lysbilete 17 og 18).",
    ],
    okt: [
      { fase: "Oppstart", min: 3, gjer: "<p>Gå gjennom måla og la elevane finne døme på nynorsk i kvardagen.</p>", lysbilete: "2 og 3" },
      { fase: "Status og lov", min: 9, gjer: "<p>Gå gjennom talet på brukarar, kjerneområda, hovudmål og sidemål, språklova og 25 %-kravet, med tre spørsmål undervegs.</p>", lysbilete: "4 til 10" },
      { fase: "Sidemålsdebatten", min: 12, gjer: "<p>Vis argumenta for og mot, ta spørsmålet, les debattutdraget og gjennomfør meiningslinja.</p>", lysbilete: "11 til 14" },
      { fase: "Kultur og drøfting", min: 4, gjer: "<p>Vis nynorsk i kulturen og gå gjennom strukturen for ein drøftingstekst.</p>", lysbilete: "15 og 16" },
      { fase: "Eigenarbeid", min: 14, gjer: "<p>Elevane svarer på dei korte oppgåvene i skriveboka, og de går gjennom svara. Deretter skriv dei drøftingsteksten for hand.</p>", lysbilete: "17 og 18" },
      { fase: "Avslutning", min: 3, gjer: "<p>Oppsummer og lat elevane skrive eitt motargument dei no forstår betre.</p>", lysbilete: "19" },
    ],
    misoppfatningar: [
      { feil: "«Sidemål er det same som nynorsk.»", hjelp: "Sidemål er det skriftspråket du ikkje har som hovudmål. For ein elev med nynorsk som hovudmål er bokmål sidemålet." },
      { feil: "«Nynorsk er berre for Vestlandet.»", hjelp: "Vis kjerneområda: Vestland, Møre og Romsdal og delar av indre Austlandet, som Valdres, Hallingdal og Gudbrandsdalen." },
      { feil: "«Lova seier at bokmål er hovudspråket.»", hjelp: "Lova seier at norsk er hovudspråket, og at bokmål og nynorsk er likeverdige skriftspråk. Skil mellom språket norsk og dei to skriftspråka." },
      { feil: "«25 % betyr at ein fjerdedel av folket skriv nynorsk.»", hjelp: "25 % er eit krav til statsorgan og NRK. Delen av folket med nynorsk som hovudmål er om lag 10–12 %." },
    ],
    samtale: [
      "Kvifor trur du kravet til statsorgan og NRK er høgare enn delen av folket som skriv nynorsk?",
      "Kva er skilnaden på eit argument som byggjer på fakta, og eit som byggjer på verdiar?",
      "Korleis heng språklova frå 2022 saman med jamstillingsvedtaket frå 1885?",
      "Kva skriftspråk eller dialekt bruker du sjølv i meldingar, og kvifor?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane ei skriveramme til drøftinga med startsetningar: «Nokre meiner at …», «Andre peikar på at …», «Eg meiner …».",
        "La elevane velje to fakta frå lysbilete 16 før dei byrjar å skrive.",
        "Sorteringsoppgåva kan gjerast i par før eleven skriv åleine.",
      ],
      utfordring: [
        "Be elevane finne eit nyare debattinnlegg om sidemål og vurdere argumenta der.",
        "La elevane skrive drøftinga frå synsvinkelen til ein elev med nynorsk som hovudmål i ein bokmålsby, eller omvendt.",
      ],
    },
    vurdering: [
      "Spørsmåla på tavla viser om klassen har fått med seg dei sentrale fakta.",
      "Meiningslinja viser om elevane kan grunngi standpunkt med argument.",
      "Kjenneteikn på god måloppnåing i drøftingsteksten: eleven bruker minst to korrekte fakta, presenterer begge sider rettferdig og grunngir eit tydeleg standpunkt, og teksten er skriven på nynorsk.",
    ],
    vidare: "Gå vidare til skrivemodulen Skriv om språkhistoria, der oppgåve 5 byggjer direkte på denne modulen, og til repetisjonen av heile Del 1. Elevmodulen Nynorsk i dag og den moderne debatten kan brukast som frivillig lekse.",
  },
});

Larar.register("historie-skriving", {
  tittelnotat: "Denne modulen har ingen nye fakta. Elevane skal bruke det dei kan frå Del 1 til å skrive. Sei det tydeleg: i dag handlar det ikkje om å hugse mest mogleg, men om å få fakta til å henge saman.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>skrive om språkhistoria på <strong>nynorsk</strong></li>
        <li>vise <strong>samanheng</strong>, ikkje berre liste opp fakta</li>
        <li>bruke <strong>bindeord</strong> som viser årsak og tid</li>
        <li>velje ei av <strong>fem oppgåver</strong></li>
      </ul>`,
      notes: "Avklar kor mange oppgåver elevane skal skrive. Eit realistisk krav er éi eller to i timen, resten som lekse eller seinare økt. Sjå rettleiinga for forslag.",
    },
    {
      title: "Fem oppgåver, fem måtar å skrive på",
      body: `<table>
          <thead><tr><th>Oppgåve</th><th>Du skal</th></tr></thead>
          <tbody>
            <tr><td>1. Fortel historia</td><td>forklare</td></tr>
            <tr><td>2. Aasen og Knudsen</td><td>samanlikne</td></tr>
            <tr><td>3. Forklar eit omgrep</td><td>formidle</td></tr>
            <tr><td>4. Dagbok frå reisa</td><td>dikte</td></tr>
            <tr><td>5. Frå 1885 til i dag</td><td>oppsummere</td></tr>
          </tbody>
        </table>`,
      notes: "Spør klassen: kva er skilnaden mellom å forklare og å formidle? Formidle handlar om mottakaren, her ein sjetteklassing. Dagboka er den einaste skjønnlitterære oppgåva, men fakta må framleis stemme. Styr gjerne valet: svake skrivarar har ofte godt av oppgåve 3 eller 4, sterke av 2 eller 5.",
    },
    {
      type: "sitat",
      text: "I 1380 gjekk Noreg i union med Danmark. I 1814 vart Noreg fritt. I 1885 kom jamstillingsvedtaket.",
      kjelde: "Døme på ein svak fagtekst",
      notes: "Les teksten høgt med flat stemme. Spør: er noko av dette feil? Nei. Kvifor er det likevel ein svak tekst? Lat elevane svare før neste lysbilete.",
    },
    {
      type: "diskuter",
      title: "Kva manglar?",
      prompt: `<p class="stor">Alt er rett. Kvifor er teksten likevel svak?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      svar: "Ingenting heng saman. Teksten seier kva som skjedde, men ikkje <strong>kvifor</strong> det eine førte til det andre.",
      notes: "Elevane seier ofte «han er for kort». Svar at ein lang tekst kan ha same problem. Leit etter ordet samanheng eller årsak i svara deira.",
    },
    {
      title: "Vis samanhengen",
      body: `<table>
          <thead><tr><th>I staden for</th><th>Skriv heller</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">Aasen reiste rundt i Noreg. Han gav ut ei ordbok.</em></td>
                <td><em class="nn"><strong>Fordi</strong> Aasen ville byggje skriftspråket på levande talemål, måtte han først reise rundt og samle ord. Resultatet vart ordboka frå 1850.</em></td></tr>
            <tr class="steg"><td><em class="nn">I 1885 kom jamstillingsvedtaket.</em></td>
                <td><em class="nn"><strong>Etter tretti år</strong> med landsmål i bruk vedtok Stortinget i 1885 at dei to skriftspråka skulle vere likeverdige.</em></td></tr>
          </tbody>
        </table>`,
      notes: "Peik på fordi og resultatet vart: det er orda som gjer jobben. Vis så den andre rada og spør: kva er lagt til? «Etter tretti år med landsmål i bruk» set vedtaket inn i ein samanheng.",
    },
    {
      title: "Bindeord som viser samanheng",
      steps: [
        "<p class=\"stor\"><strong>Årsak:</strong> <em class=\"nn\">fordi, difor, derfor, slik at</em></p>",
        "<p class=\"stor\"><strong>Motsetnad:</strong> <em class=\"nn\">men, likevel, samtidig</em></p>",
        "<p class=\"stor\"><strong>Tid:</strong> <em class=\"nn\">først, deretter, seinare, til slutt</em></p>",
        "<p class=\"stor\"><strong>Oppsummering:</strong> <em class=\"nn\">altså</em></p>",
      ],
      notes: "Grupperinga hjelper elevane å velje rett ord til rett bruk. Minn om at <em>difor</em> og <em>derfor</em> begge er rette på nynorsk. Bokmålsforma <em>da</em> finst ikkje: skriv <em>då</em> eller <em>når</em>.",
    },
    {
      type: "sporsmal",
      question: "Kva bindeord passar? <em class=\"nn\">Aasen ville byggje på talemålet, ___ reiste han rundt og samla dialektar.</em>",
      options: ["<em class=\"nn\">men</em>", "<em class=\"nn\">difor</em>", "<em class=\"nn\">likevel</em>", "<em class=\"nn\">samtidig</em>"],
      correct: 1,
      explain: "<em class=\"nn\">difor</em> viser at reisene var ein følgje av det Aasen ville. Legg merke til ordstillinga: etter <em class=\"nn\">difor</em> kjem verbalet <em class=\"nn\">reiste</em> før subjektet.",
      notes: "Bruk høvet til å minne om V2-regelen frå Del 2: <em>difor reiste han</em>, ikkje <em>difor han reiste</em>. Det er ein vanleg feil når elevane byrjar å bruke fleire bindeord.",
    },
    {
      title: "Faktabanken: 1380 til 1885",
      body: `<table>
          <thead><tr><th>År</th><th>Hending</th></tr></thead>
          <tbody>
            <tr><td>1380</td><td>Noreg i union med Danmark i over 400 år</td></tr>
            <tr><td>1814</td><td>Eiga grunnlov og eige storting, men framleis dansk skrift</td></tr>
            <tr><td>1842–1846</td><td>Aasen reiser rundt og samlar dialektar</td></tr>
            <tr><td>1848</td><td>Grammatikken til Aasen</td></tr>
            <tr><td>1850</td><td>Ordboka til Aasen</td></tr>
            <tr><td>1853</td><td><em class="nn">Prøver af Landsmaalet i Norge</em>: namnet landsmål</td></tr>
            <tr><td>1885</td><td>Jamstillingsvedtaket: dei to skriftspråka blir likeverdige</td></tr>
          </tbody>
        </table>`,
      steps: ["<p class=\"midt\">Ta med årstal berre når dei betyr noko for poenget ditt.</p>"],
      notes: "Faktabanken står på tavla i tre lysbilete: tidslinja her og på neste lysbilete, og tabellen over Aasen og Knudsen på lysbilete 14. Elevane skal bruke han aktivt når dei skriv, og du kan bla tilbake hit medan dei arbeider. Oppgåve 1 krev minst fem årstal, men åtvar mot å stappe inn årstal som ikkje har noko å gjere i teksten.",
    },
    {
      title: "Faktabanken: 1907 til 2022",
      body: `<table>
          <thead><tr><th>År</th><th>Hending</th></tr></thead>
          <tbody>
            <tr><td>1907</td><td>Alle elevar skal lære båe skriftspråka</td></tr>
            <tr><td>1907, 1917, 1938</td><td>Rettskrivingsreformer i samnorskretning</td></tr>
            <tr><td>1929</td><td>Landsmål får namnet nynorsk</td></tr>
            <tr><td>1940-talet</td><td>Foreldreaksjonen mot samnorsk blir starta</td></tr>
            <tr><td>1980</td><td>Mållova: staten skal bruke begge skriftspråka</td></tr>
            <tr><td>1981</td><td>Stortinget gir opp samnorskpolitikken</td></tr>
            <tr><td>2005 og 2012</td><td>Ny rettskriving for bokmål og for nynorsk</td></tr>
            <tr><td>2022</td><td>Ny språklov: bokmål og nynorsk er likeverdige</td></tr>
          </tbody>
        </table>`,
      notes: "Andre halvdel av tidslinja trengst mest til oppgåve 5. Minn om at striden rundt foreldreaksjonen var hard på 1950-talet, og at 1929 berre gav nye namn: riksmål vart samtidig bokmål, og språka var dei same.",
    },
    {
      title: "Oppgåve 1: Fortel historia",
      body: `<p class="liten">200–300 ord, for ein lesar som ikkje kan noko om emnet. Minst fem årstal.</p>`,
      steps: [
        "<p class=\"stor\"><strong>Innleiing:</strong> eit land utan eige skriftspråk</p>",
        "<p class=\"stor\"><strong>Hovuddel:</strong> 1814, Aasen og reisene, bøkene</p>",
        "<p class=\"stor\"><strong>Avslutning:</strong> landsmålet får namnet nynorsk</p>",
      ],
      notes: "Gi elevane dette rådet: tenk på det som ei forteljing med ei årsak. Sjekklista til oppgåva krev at eleven forklarer kvifor språkspørsmålet vart viktig etter 1814, kva Aasen gjorde på reisene, og kva ordet landsmål tyder. Det siste gløymer mange: landsmål er språket for heile landet.",
    },
    {
      type: "sitat",
      text: "Tenk deg eit land der folk snakkar norsk, men skriv dansk. Slik var det i Noreg i første halvdel av 1800-talet. I over 400 år hadde landet vore i union med Danmark, og dansk var det einaste skriftspråket.",
      kjelde: "Modellinnleiing til oppgåve 1",
      notes: "Dette er ei modellinnleiing laga til presentasjonen. Spør: korleis fangar ho interessa til lesaren? Kva for årstal er brukt, og kvifor treng ho ikkje fleire? Utfordre elevane til å skrive ei betre innleiing sjølve, gjerne med ein annan inngang, til dømes ein bonde som lærer å skrive på eit språk han ikkje snakkar.",
    },
    {
      title: "Oppgåve 2: Aasen og Knudsen",
      body: `<div class="toliner">
          <div class="line aasen">
            <div class="boks">Dei norske dialektane</div>
            <div class="pil">↓ Aasen samlar og byggjer</div>
            <div class="boks sterk">Landsmål → nynorsk</div>
          </div>
          <div class="line knudsen">
            <div class="boks">Dansk skriftspråk</div>
            <div class="pil">↓ Knudsen fornorskar steg for steg</div>
            <div class="boks sterk">Riksmål → bokmål</div>
          </div>
        </div>`,
      steps: [
        "<p><strong>Modell A:</strong> éin person om gongen. <strong>Modell B:</strong> eitt punkt om gongen: utgangspunkt, metode, resultat.</p>",
      ],
      notes: "Modell B er vanskelegare, men gir betre samanlikning, fordi lesaren ser skilnaden punkt for punkt. Sjekklista krev at eleven peikar på minst éin ting dei hadde felles, og avsluttar med eige syn. Minn om at teksten skal ha ord som viser motsetnad: <em>medan, men, i motsetnad til</em>.",
    },
    {
      title: "Faktabanken: to menn, to metodar",
      body: `<table>
          <thead><tr><th></th><th>Ivar Aasen (1813–1896)</th><th>Knud Knudsen (1812–1895)</th></tr></thead>
          <tbody>
            <tr><td><strong>Utgangspunkt</strong></td><td>Dei norske dialektane</td><td>Dansk skrift</td></tr>
            <tr><td><strong>Metode</strong></td><td>Samla dei eldre formene dialektane hadde felles</td><td>Fornorska dansk skrift steg for steg</td></tr>
            <tr><td><strong>Førte til</strong></td><td>Landsmål, seinare nynorsk</td><td>Riksmål, seinare bokmål</td></tr>
          </tbody>
        </table>`,
      notes: "Tabellen er faktabanken til oppgåve 2, og radene passar rett inn i modell B: utgangspunkt, metode, resultat. Spør: kva står ikkje i tabellen, men må med i teksten? Det dei hadde felles, og ditt eige syn.",
    },
    {
      type: "sporsmal",
      question: "Kva hadde Aasen og Knudsen felles?",
      options: [
        "Begge tok utgangspunkt i dialektane.",
        "Begge ville halde fast på dansk skrift.",
        "Begge ville gi Noreg eit norsk skriftspråk.",
        "Begge var med i foreldreaksjonen.",
      ],
      correct: 2,
      explain: "Begge ville ha eit norsk skriftspråk, men dei gjekk motsett veg: Aasen frå dialektane, Knudsen frå dansk skrift.",
      notes: "Det fjerde alternativet er ein tidsfeil: foreldreaksjonen kom på slutten av 1940-talet, lenge etter at begge var døde. Bruk det til å minne om at fakta i ein tekst må stemme med tida.",
    },
    {
      type: "diskuter",
      title: "Oppgåve 3: Forklar for ein sjetteklassing",
      prompt: `<p>Forklar <em class="nn">jamstilling</em> for sidemannen på 30 sekund, som om han eller ho gjekk i 6. klasse.</p>
        <p class="liten">Ingen faguttrykk utan forklaring. Bruk eit døme frå kvardagen.</p>`,
      form: "Par, byt etter 30 sekund",
      tid: 3,
      notes: "Lytt etter gode kvardagsdøme og la eitt eller to par vise fram. Eit døme kan vere to lag som får like mykje tid på banen. Skriveoppgåve 3 (lysbilete 21) let eleven velje mellom landsmål, jamstilling, samnorsk og sidemål. Poenget: det er vanskelegare å forklare enkelt enn innfløkt.",
    },
    {
      type: "bilete",
      title: "Oppgåve 4: Dagbok frå reisa",
      src: "bilete/aasen-1871.jpg",
      alt: "Portrett av Ivar Aasen i 1871, ein mann med briller og mørk frakk",
      caption: "Ivar Aasen i 1871. Foto: Carl Christian Wischmann / Ivar Aasen-tunet (CC BY-SA 3.0).",
      body: `<ul class="stor">
          <li>eg-form, dato og stad øvst</li>
          <li>mellom 1842 og 1846</li>
          <li>dikt stemninga, ikkje fakta</li>
        </ul>`,
      notes: "Reisene gjekk føre seg 1842–1846 med stipend frå Det Kongelige Norske Videnskabers Selskab. Eleven skal vise minst tre konkrete ting Aasen gjorde: lytta, skreiv ned ord, samanlikna bøyingar frå ulike bygder, og få fram kvifor han ikkje nøgde seg med éin dialekt. Tips: vis kartet i Reisene til Ivar Aasen på tavla frå lærarmaskina, og la elevane velje ein stad derifrå.",
    },
    {
      type: "sporsmal",
      question: "Kva er <strong>ikkje</strong> lov i dagboka?",
      options: [
        "Å dikte korleis vêret var",
        "Å skrive i eg-form",
        "Å dikte opp ei bok Aasen gav ut",
        "Å velje ein stad han kan ha vore",
      ],
      correct: 2,
      explain: "Stemning og detaljar kan du dikte, men det faglege skal stemme: ikkje dikt opp bøker eller årstal.",
      notes: "Grensa mellom dikting og fakta er det vanskelegaste i oppgåve 4. Spør: kva med ein samtale med ein bonde? Det er greitt, så lenge det Aasen gjer i samtalen, stemmer med det han faktisk gjorde.",
    },
    {
      title: "Oppgåve 5: Skil fakta og meining",
      body: `<div class="to-kol">
          <div class="boks"><h3>Fakta</h3><p><em class="nn">I 2022 fekk Noreg ei ny språklov.</em></p></div>
          <div class="boks"><h3>Meining</h3><p><em class="nn">Eg meiner kravet om 25 % er for lågt.</em></p></div>
        </div>`,
      steps: ["<p class=\"midt\">Kva har nynorsken oppnådd sidan 1885, og kva er framleis uavklart?</p>"],
      notes: "Oppgåve 5 byggjer på modulane om språkstriden og nynorsk i dag. Sjekklista krev jamstillinga, samnorskpolitikken og korleis han enda, minst to fakta om stillinga i dag og éi setning om kva som framleis blir diskutert. Skilnaden på fakta og meining er det mange elevar slurvar med: meiningar blir skrivne som om dei var fakta.",
    },
    {
      title: "Nynorsksjekken",
      body: `<p class="stor"><em class="nn">eg, ikkje, kva, frå, mykje</em></p>
        <p class="stor">Hokjønn: <em class="nn">boka, historia, tida</em></p>`,
      steps: ["<p>Du treng ikkje skrive slik dei skreiv på 1800-talet.</p>"],
      notes: "Be elevane lese gjennom teksten i skriveboka éin gong berre for desse orda før dei leverer. Vis lysbiletet att i starten av økt 2.",
    },
    {
      type: "oppgave",
      title: "Vel éi oppgåve og skriv",
      body: `<ol>
          <li><strong>Fortel historia</strong> om korleis nynorsk vart til. <span class="liten">200–300 ord</span></li>
          <li><strong>Samanlikn</strong> Aasen og Knudsen. <span class="liten">150–250 ord</span></li>
          <li><strong>Forklar</strong> landsmål, jamstilling, samnorsk eller sidemål for ein sjetteklassing. <span class="liten">120–200 ord</span></li>
          <li><strong>Dagbok</strong> frå ein dag på reisa til Aasen, i eg-form. <span class="liten">150–250 ord</span></li>
          <li><strong>Frå 1885 til i dag:</strong> kva har nynorsken oppnådd, og kva er uavklart? <span class="liten">180–260 ord</span></li>
        </ol>
        <p class="liten">Lag ein plan først. Bruk faktabanken og nynorsksjekken.</p>`,
      form: "Åleine",
      tid: 40,
      notes: "Elevane skriv for hand i skriveboka. La oppgåvelista stå medan dei vel oppgåve og lagar plan. Når dei skriv, kan du bla tilbake til faktabanken (lysbilete 9, 10 og 14) og la han stå, eller til lysbiletet for den oppgåva dei fleste har valt. Gå rundt og les første avsnitt hos kvar elev. Spør: kva er poenget ditt? Kvar viser du samanhengen? Elevar som står fast i oppgåve 1, kan starte med modellinnleiinga på lysbilete 12 og skrive vidare. Dei som blir tidleg ferdige, tek ei oppgåve til.",
    },
    {
      type: "diskuter",
      title: "Respons",
      prompt: `<p>Les teksten til sidemannen.</p>
        <p>Finn <strong>eitt bindeord</strong> som viser samanheng, og <strong>éin stad</strong> som berre listar opp fakta.</p>`,
      form: "Par",
      tid: 7,
      notes: "Responsen er konkret med vilje: elevane skal ikkje seie «bra», men peike. Den som får respons, skriv om den eine staden med eit bindeord før timen er slutt.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\">Fakta er ikkje nok: vis <strong>samanhengen</strong>.</p>",
        "<p class=\"stor\">Bindeord gjer arbeidet: <em class=\"nn\">fordi, difor, seinare, likevel</em>.</p>",
        "<p class=\"stor\">Årstal berre når dei betyr noko.</p>",
        "<p class=\"stor\">Skil <strong>fakta</strong> frå <strong>meining</strong>.</p>",
      ],
      notes: "Spør til slutt: kva var det vanskelegaste med oppgåva du valde? Svara gir deg eit bilete av kva klassen treng meir av.",
    },
  ],
  guide: {
    tid: "To økter på 45 minutt",
    intro: "<p>Skrivetimane samlar Del 1 i fem skriveoppgåver av ulikt slag: forklare, samanlikne, formidle, dikte og oppsummere. Faktabanken står på tavla: tidslinja på lysbilete 9 og 10 og tabellen over Aasen og Knudsen på lysbilete 14. Hovudpoenget i undervisninga er at ein god fagtekst viser samanheng, ikkje berre fakta. Presentasjonen går gjennom dette, viser strukturen i kvar oppgåve og gir elevane ei modellinnleiing. Deretter skriv elevane for hand i skriveboka, med oppgåvelista på lysbilete 21.</p>",
    mal: [
      "Elevane kan skrive ein samanhengande fagtekst om språkhistoria på nynorsk.",
      "Elevane kan bruke bindeord som viser årsak, motsetnad og tid.",
      "Elevane kan velje ut og bruke relevante fakta og årstal frå faktabanken.",
      "Elevane kan tilpasse teksten til mottakar og sjanger, frå fagtekst til dagbok.",
      "Elevane kan skilje mellom fakta og eiga meining.",
    ],
    lareplan: [10, 11, 15, 13],
    forkunnskapar: "Elevane bør ha gått gjennom dei fire fagmodulane i Del 1. Frå Del 2 er det nyttig å kjenne V2-regelen og konjunksjonar og subjunksjonar.",
    forebuing: [
      "Bestem på førehand kor mange oppgåver elevane skal skrive, og om nokon skal få tildelt oppgåve.",
      "Les gjennom sjekklistene til dei fem oppgåvene i elevmodulen, så du kan hjelpe elevane med kva som må med.",
      "Elevane skriv for hand og treng skrivebok i begge øktene. Bestem om du samlar inn bøkene etterpå.",
      "Vil du vise kartet i Reisene til Ivar Aasen ved oppgåve 4, opne det på lærarmaskina på førehand.",
    ],
    okt: [
      { fase: "Økt 1: Oppstart", min: 4, gjer: "<p>Gå gjennom måla og dei fem oppgåvene.</p>", lysbilete: "2 og 3" },
      { fase: "Økt 1: Samanheng i fagtekst", min: 12, gjer: "<p>Vis den svake teksten, diskuter kva som manglar, og gå gjennom omskrivinga, bindeorda og tidslinja i faktabanken.</p>", lysbilete: "4 til 10" },
      { fase: "Økt 1: Oppgåvene", min: 17, gjer: "<p>Gå gjennom strukturen i kvar oppgåve med modellinnleiing, tabellen over Aasen og Knudsen, spørsmål og ei kort munnleg øving i å forklare enkelt.</p>", lysbilete: "11 til 19" },
      { fase: "Økt 1: Skriving", min: 12, gjer: "<p>Ta nynorsksjekken, og la elevane velje oppgåve, lage ein plan og skrive innleiinga i skriveboka.</p>", lysbilete: "20 og 21" },
      { fase: "Økt 2: Oppstart", min: 3, gjer: "<p>Elevane les det dei skreiv sist og ser over planen. Vis nynorsksjekken på lysbilete 20 att.</p>", lysbilete: "20" },
      { fase: "Økt 2: Skriving", min: 28, gjer: "<p>Elevane skriv ferdig i skriveboka. La oppgåvelista eller faktabanken (lysbilete 9, 10 og 14) stå på tavla. Gå rundt og les første avsnitt.</p>", lysbilete: "21" },
      { fase: "Økt 2: Respons", min: 10, gjer: "<p>Parrespons med konkret oppdrag, og tid til å skrive om éin stad.</p>", lysbilete: "22" },
      { fase: "Økt 2: Avslutning", min: 4, gjer: "<p>Oppsummer og spør kva som var vanskelegast.</p>", lysbilete: "23" },
    ],
    misoppfatningar: [
      { feil: "«Jo fleire årstal, jo betre tekst.»", hjelp: "Vis den svake teksten: tre rette årstal utan samanheng. Årstal skal berre med når dei betyr noko for poenget." },
      { feil: "«I dagboka kan eg dikte alt.»", hjelp: "Stemning og detaljar kan diktast, men det faglege skal stemme. Ikkje dikt opp bøker eller årstal." },
      { feil: "«Å forklare enkelt er lett.»", hjelp: "Be eleven lese teksten høgt og stoppe ved kvart faguttrykk: er det forklart? Enkle forklaringar krev at ein forstår stoffet godt." },
      { feil: "«Difor han reiste rundt.»", hjelp: "Etter eit bindeord som <em class=\"nn\">difor</em> først i setninga kjem verbalet på andreplass: <em class=\"nn\">difor reiste han</em>." },
    ],
    samtale: [
      "Kva gjer at ein tekst med berre rette fakta likevel kan vere dårleg?",
      "Kva er skilnaden på å skrive for ein lærar og for ein sjetteklassing?",
      "Kvar går grensa mellom dikting og fakta i ein historisk dagbok?",
      "Kva er fakta og kva er meining i debatten om nynorsk i dag?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane modellinnleiinga som startpunkt i oppgåve 1.",
        "La elevane planleggje med ein enkel tabell: innleiing, hovuddel, avslutning, med stikkord frå faktabanken.",
        "Tilrå oppgåve 3 eller 4, som har kortare ordtal og tydeleg ramme.",
        "Gi ei liste med fem bindeord eleven skal bruke minst tre av.",
      ],
      utfordring: [
        "La eleven skrive oppgåve 2 med modell B, eitt punkt om gongen.",
        "Be eleven skrive oppgåve 5 som eit lesarinnlegg med tydeleg standpunkt, men framleis med fakta som stemmer.",
        "La eleven skrive to oppgåver og samanlikne korleis sjangeren endrar språket.",
      ],
    },
    vurdering: [
      "Sjekklista til kvar oppgåve fungerer som kjenneteikn og kan brukast både til eigenvurdering og lærarvurdering.",
      "Kjenneteikn på god måloppnåing: teksten viser samanheng mellom hendingane, fakta og årstal er rette og relevante, teksten er tilpassa mottakaren, og nynorsken er stort sett korrekt, særleg dei vanlege orda og hokjønnsformene.",
      "Parresponsen viser om elevane kan kjenne att tekstbinding hos andre.",
    ],
    vidare: "Gå vidare til repetisjonen av heile Del 1. Elevar som vil skrive fleire oppgåver, kan gjere det i elevmodulen som frivillig lekse. Skrivereglane om tekstbinding og då/når blir følgde opp i Del 4.",
  },
});

Larar.register("historie-repetisjon", {
  tittelnotat: "Repetisjonen er ein tavlequiz over heile Del 1, med ein kort skriftleg test i skriveboka til slutt. Del gjerne klassen i lag og hald poeng. Sei det høgt: målet er ikkje å vinne, men å finne ut kva de må lese om att.",
  slides: [
    {
      title: "Slik gjer vi det",
      body: `<ul class="stor">
        <li>Fire rundar: <strong>før 1850, Aasen, striden, i dag</strong></li>
        <li>Svar med fingrane eller på mini-tavle</li>
        <li>Lag på tre til fire: diskuter, så svar</li>
        <li>Eitt poeng per rett svar</li>
      </ul>`,
      notes: "Mini-tavle, papirlapp eller fingrar fungerer alle. Poenget er at alle svarer samtidig, slik at du ser kva klassen kan. Skriv poeng på tavla. Tida per spørsmål bør vere kort: eit halvt til eitt minutt.",
    },
    {
      type: "sporsmal",
      kicker: "Runde 1 · Før 1850",
      question: "Kva skriftspråk brukte folk i Noreg på 1700-talet?",
      options: ["Gamalnorsk", "Svensk", "Ein tidleg variant av nynorsk", "Dansk"],
      correct: 3,
      explain: "Under unionen med Danmark var dansk det einaste skriftspråket i Noreg.",
      notes: "Eit oppvarmingsspørsmål. Vel nokon svensk, minn om at unionen med Sverige kom etter 1814, og at skriftspråket då framleis var dansk.",
    },
    {
      type: "sporsmal",
      kicker: "Runde 1 · Før 1850",
      question: "Kvifor forsvann det gamalnorske skriftspråket?",
      options: [
        "Noreg var i union med Danmark, og dansk vart det einaste skriftspråket.",
        "Folk slutta å snakke norsk.",
        "Ivar Aasen erstatta det med landsmål.",
      ],
      correct: 0,
      explain: "Gjennom over 400 år i union skreiv embetsmenn, prestar og forfattarar dansk, og dansk var språket i skulen.",
      notes: "Det andre alternativet er den viktigaste misoppfatninga i heile Del 1: folk heldt fram med å snakke norske dialektar. Skriftspråket var dansk, talemålet norsk.",
    },
    {
      type: "sporsmal",
      kicker: "Runde 1 · Før 1850",
      question: "Kva er <em class=\"nn\">embetsmannsspråket</em>?",
      options: ["Gamalnorsk", "Dansk skrift med norsk uttale", "Landsmålet til Aasen", "Dialekta i Ørsta"],
      correct: 1,
      explain: "I byane uttala embetsmenn og borgarskap dansk med norsk tonefall. Det blir kalla dansk-norsk eller embetsmannsspråket.",
      notes: "Spør etterpå: kven bygde vidare på dette språket? Knud Knudsen, med fornorskinga av dansk skrift. Det peikar fram mot runde 3.",
    },
    {
      type: "sporsmal",
      kicker: "Runde 1 · Før 1850",
      question: "Kvifor vart språkspørsmålet viktig <strong>etter</strong> 1814?",
      options: [
        "Dansk fanst ikkje lenger som språk.",
        "Sverige tvinga Noreg til å skrive svensk.",
        "Ivar Aasen hadde alt skrive ei ordbok.",
        "Noreg var eit fritt land, men hadde framleis eit anna lands skriftspråk.",
      ],
      correct: 3,
      explain: "Med eiga grunnlov og eige storting byrja mange å spørje om eit fritt land kunne ha eit anna lands språk som einaste skriftspråk.",
      notes: "Alternativet om ordboka er ein tidsfeil: ordboka kom i 1850. Be laga forklare kvifor det er feil.",
    },
    {
      type: "bilete",
      kicker: "Runde 2 · Ivar Aasen",
      title: "Kven er dette?",
      src: "bilete/aasen-1871.jpg",
      alt: "Portrett av Ivar Aasen i 1871, ein mann med briller og mørk frakk",
      caption: "Foto: Carl Christian Wischmann / Ivar Aasen-tunet (CC BY-SA 3.0).",
      body: `<p class="stor">Namn, fødestad og kva han er kjend for.</p>`,
      svar: "Ivar Aasen (1813–1896), frå Ørsta på Sunnmøre. Han bygde landsmålet, som frå 1929 heiter nynorsk.",
      notes: "Gi eitt poeng for kvart av dei tre: namn, stad og kva han er kjend for. Mange vil hugse namnet, færre fødestaden.",
    },
    {
      type: "sporsmal",
      kicker: "Runde 2 · Ivar Aasen",
      question: "Kvifor reiste Aasen rundt i Noreg frå 1842 til 1846?",
      options: [
        "For å selje bøker",
        "For å samle dialektar og kartleggje norsk talemål",
        "For å lære seg dansk betre",
        "For å undervise i grammatikk",
      ],
      correct: 1,
      explain: "Aasen samla dialektmateriale, ord og bøyingar, som grunnlag for grammatikken og ordboka.",
      notes: "Spør òg: kor lenge reiste han? Fire år. Og kven betalte? Det Kongelige Norske Videnskabers Selskab, med stipend.",
    },
    {
      type: "sporsmal",
      kicker: "Runde 2 · Ivar Aasen",
      question: "Korleis bygde Aasen opp landsmålet?",
      options: [
        "Han valde éin dialekt og gjorde han til skriftspråk.",
        "Han omsette dansk ord for ord.",
        "Han fann dei eldre formene som dialektane hadde felles.",
        "Han fann opp heilt nye ord.",
      ],
      correct: 2,
      explain: "Aasen ville ikkje løfte fram éin dialekt, men finne det fellesgjeldande i mange.",
      notes: "Dette er kjernen i heile modulen om Aasen. Følg opp: kva hadde skjedd om han berre hadde brukt dialekta frå Ørsta?",
    },
    {
      type: "sporsmal",
      kicker: "Runde 2 · Ivar Aasen",
      question: "Kvifor vekta Aasen former frå Vestlandet og dei indre bygdene?",
      options: [
        "Fordi flest folk budde der",
        "Fordi dei ofte stod nærare gamalnorsk",
        "Fordi han sjølv ikkje kjende andre dialektar",
      ],
      correct: 1,
      explain: "Desse formene hadde endra seg mindre og låg difor nærare det gamle språket.",
      notes: "Eit vanskeleg spørsmål. Lat laga diskutere i eitt minutt før dei svarer.",
    },
    {
      type: "sporsmal",
      kicker: "Runde 2 · Ivar Aasen",
      question: "Kva kom i 1848?",
      options: [
        "<em class=\"nn\">Ordbog over det norske Folkesprog</em>",
        "<em class=\"nn\">Prøver af Landsmaalet i Norge</em>",
        "<em class=\"nn\">Det norske Folkesprogs Grammatik</em>",
      ],
      correct: 2,
      explain: "Grammatikken kom i 1848, ordboka i 1850 og tekstprøvene i 1853. I tekstprøvene kalla han språket landsmål.",
      notes: "Hugseregel: først reglane (grammatikken), så orda (ordboka), så døma (prøvene).",
    },
    {
      type: "sporsmal",
      kicker: "Runde 3 · Språkstriden",
      question: "Kva ville Knud Knudsen?",
      options: [
        "Byggje eit skriftspråk på dialektane",
        "Fornorske dansk skrift steg for steg",
        "Innføre svensk i skulen",
        "Halde på dansk utan endringar",
      ],
      correct: 1,
      explain: "Knudsen ville endre dansk skrift gradvis mot det danna talemålet i norske byar. Lina hans vart riksmål og seinare bokmål.",
      notes: "Spør: kva blir lina til Knudsen kalla i dag? Bokmål. Og lina til Aasen? Nynorsk.",
    },
    {
      type: "sporsmal",
      kicker: "Runde 3 · Språkstriden",
      question: "Kva tyder jamstillingsvedtaket frå 1885?",
      options: [
        "At alle måtte skrive landsmål",
        "At dansk vart forbode i Noreg",
        "At dei to skriftspråka skulle smeltast saman",
        "At landsmål og det norsk-danske skriftspråket skulle vere likeverdige",
      ],
      correct: 3,
      explain: "Vedtaket gjorde landsmålet offisielt i skule og forvaltning, men tvinga ingen til å bruke det.",
      notes: "Alternativet om å smelte saman er samnorsk, som kom seinare. Mange blandar desse to. Neste spørsmål tek dette.",
    },
    {
      type: "sporsmal",
      kicker: "Runde 3 · Språkstriden",
      question: "Kva var målet med samnorskpolitikken?",
      options: [
        "Å føre bokmål og nynorsk saman til eitt felles skriftspråk",
        "Å fjerne nynorsk heilt",
        "Å gjere dansk til hovudspråk igjen",
      ],
      correct: 0,
      explain: "Rettskrivingsreformene i 1907, 1917 og 1938 endra begge språka i denne retninga. Politikken vart aldri gjennomført fullt ut.",
      notes: "Understrek at samnorsk var ein politikk, ikkje eit ferdig språk.",
    },
    {
      type: "sporsmal",
      kicker: "Runde 3 · Språkstriden",
      question: "Kva gjorde foreldra i foreldreaksjonen mot samnorsk?",
      options: [
        "Dei kravde meir nynorsk i skulen.",
        "Dei starta ei eiga avis.",
        "Dei retta lærebøkene tilbake mot eldre former.",
        "Dei tok bøkene med til Stortinget.",
      ],
      correct: 2,
      explain: "Foreldra sletta samnorske former med blekk og skreiv inn eldre former. Aksjonen vart starta på slutten av 1940-talet, og striden var hard på 1950-talet.",
      notes: "Knyt til eleven sin kvardag: kva ville foreldra dykkar gjort om skulen endra skrivemåten av ord dei var vande med? Språk handlar om identitet.",
    },
    {
      type: "sporsmal",
      kicker: "Runde 3 · Språkstriden",
      question: "Kva skjedde i 1929?",
      options: [
        "Landsmål fekk namnet nynorsk.",
        "Samnorskpolitikken vart gitt opp.",
        "Jamstillingsvedtaket vart gjort.",
        "Aasen gav ut ordboka.",
      ],
      correct: 0,
      explain: "I 1929 fekk landsmål namnet nynorsk, og riksmål fekk namnet bokmål. Språka var dei same.",
      notes: "Mange trur at nynorsk er eit nyare språk enn bokmål fordi det heiter «ny». Namnet er nytt, ikkje språket.",
    },
    {
      type: "sporsmal",
      kicker: "Runde 3 · Språkstriden",
      question: "Kva skjedde i 1981?",
      options: [
        "Ny språklov",
        "Stortinget gav opp samnorskpolitikken",
        "Nynorsk fekk ny rettskriving",
        "Alle elevar fekk sidemål",
      ],
      correct: 1,
      explain: "Frå 1981 skulle bokmål og nynorsk få utvikle seg kvar for seg. Seinare kom nye rettskrivingar: 2005 for bokmål og 2012 for nynorsk.",
      notes: "Dei andre alternativa er rette hendingar med feil årstal: språklova kom i 2022, nynorskrettskrivinga i 2012, og sidemål for alle i 1907. Spør laga om dei kan plassere dei rett.",
    },
    {
      type: "sporsmal",
      kicker: "Runde 4 · Nynorsk i dag",
      question: "Kva slår språklova frå 2022 fast?",
      options: [
        "At nynorsk er hovudspråket i Noreg",
        "At statsorgan sjølve kan velje éi målform",
        "At norsk er hovudspråket, og at bokmål og nynorsk er likeverdige",
      ],
      correct: 2,
      explain: "Lova vidarefører prinsippet frå jamstillingsvedtaket i 1885, no i moderne form.",
      notes: "Spør: kva ord brukte dei i 1885, og kva ord bruker lova i dag? Jamstilte og likeverdige.",
    },
    {
      type: "sporsmal",
      kicker: "Runde 4 · Nynorsk i dag",
      question: "Kor mykje nynorsk skal NRK og statsorgan bruke?",
      options: ["Minst 10 %", "Minst 25 %", "Minst 40 %", "Minst 50 %"],
      correct: 1,
      explain: "Kravet er minst 25 % nynorsk. For statsorgan gjeld òg minst 25 % bokmål.",
      notes: "Følg opp: om lag kor mange har nynorsk som hovudmål? Om lag 10–12 %. Ikkje bland dei to tala.",
    },
    {
      type: "sporsmal",
      kicker: "Runde 4 · Nynorsk i dag",
      question: "Kvar ligg kjerneområda for nynorsk?",
      options: [
        "Oslo og Viken",
        "Nord-Noreg og Trøndelag",
        "Vestland, Møre og Romsdal og delar av indre Austlandet",
      ],
      correct: 2,
      explain: "Valdres, Hallingdal og Gudbrandsdalen er dei viktigaste austlandsområda.",
      notes: "Gi eit bonuspoeng til laget som kan nemne eitt av dei tre austlandsområda.",
    },
    {
      type: "sporsmal",
      kicker: "Runde 4 · Nynorsk i dag",
      question: "Du har nynorsk som hovudmål. Kva er sidemålet ditt?",
      options: ["Nynorsk", "Landsmål", "Bokmål", "Dialekt"],
      correct: 2,
      explain: "Sidemålet er det av dei to skriftspråka du ikkje har som hovudmål.",
      notes: "Eit enkelt spørsmål med vilje, for å avsløre om nokon trur at sidemål er det same som nynorsk.",
    },
    {
      type: "diskuter",
      kicker: "Finale",
      title: "Set i rett rekkjefølgje",
      prompt: `<ul class="stor">
          <li>A. Landsmål får namnet nynorsk</li>
          <li>B. Jamstillingsvedtaket</li>
          <li>C. Ny språklov</li>
          <li>D. Grammatikken til Aasen</li>
          <li>E. Samnorskpolitikken blir oppgitt</li>
        </ul>`,
      form: "I laga, skriv svaret ned",
      tid: 3,
      svar: "D (1848), B (1885), A (1929), E (1981), C (2022)",
      notes: "Gi eitt poeng for rett rekkjefølgje og eitt bonuspoeng for kvart årstal laget har med. Kår vinnarlaget, men bruk heller tid på å spørje kva spørsmål dei fleste bomma på.",
    },
    {
      type: "oppgave",
      kicker: "Test deg sjølv · 1",
      title: "Årstal",
      body: `<ol>
          <li>Kva år kom ordboka til Aasen?</li>
          <li>Kva år kom <em class="nn">Prøver af Landsmaalet i Norge</em>?</li>
          <li>Sidan kva år har alle elevar lært båe skriftspråka?</li>
          <li>Kva år vart staten pålagd å bruke begge skriftspråka?</li>
          <li>Kva år fekk nynorsk rettskrivinga som gjeld i dag?</li>
        </ol>`,
      form: "Åleine",
      tid: 3,
      svar: "1. 1850 &nbsp; 2. 1853 &nbsp; 3. 1907 &nbsp; 4. 1980 &nbsp; 5. 2012",
      notes: "Den skriftlege testen er individuell: elevane skriv svara i skriveboka utan å snakke saman. Etter kvar del viser du svaret, og elevane rettar sjølve og set eitt poeng per rett svar. Mållova frå 1980 og rettskrivinga frå 2012 var ikkje med i quizen, så her ser du om dei har lese tidslinja.",
    },
    {
      type: "oppgave",
      kicker: "Test deg sjølv · 2",
      title: "Personar og omgrep",
      body: `<ol>
          <li>Kva skriftspråk voks fram av lina til Knudsen?</li>
          <li>Kva tyder ordet <em class="nn">landsmål</em>?</li>
          <li>Kva slags norsk snakka folk medan skriftspråket var dansk?</li>
          <li>Kva avis kjem ut berre på nynorsk?</li>
          <li>Du har bokmål som hovudmål. Kva er nynorsk for deg?</li>
        </ol>`,
      form: "Åleine",
      tid: 4,
      svar: "1. Riksmål, seinare bokmål &nbsp; 2. Språket for heile landet &nbsp; 3. Dialektar &nbsp; 4. <em class=\"nn\">Dag og Tid</em> &nbsp; 5. Sidemål",
      notes: "Godta «bokmål» på spørsmål 1 og «talemål» på spørsmål 3. På spørsmål 2 held det at eleven får fram at språket skulle vere for heile landet, ikkje for éin stad.",
    },
    {
      type: "oppgave",
      kicker: "Test deg sjølv · 3",
      title: "Forklar med ei heil setning",
      body: `<ol>
          <li>Kva innebar jamstillingsvedtaket i 1885?</li>
          <li>Kva skjedde med bokmål og nynorsk etter 1981?</li>
          <li>Gi eitt argument for og eitt mot sidemålsopplæring.</li>
        </ol>`,
      form: "Åleine",
      tid: 6,
      svar: "1. Landsmål og det norsk-danske skriftspråket skulle vere likeverdige i skule og forvaltning. 2. Dei skulle få utvikle seg kvar for seg. 3. For: nynorsk er kulturarv, og utan opplæring kjem språket under press. Mot: tida kunne brukast til andre fag.",
      notes: "Gi to poeng per svar: eitt for rett innhald og eitt for ei heil, forståeleg setning. På spørsmål 3 er alle argumenta frå timen om sidemålsdebatten gode svar. Til slutt legg elevane saman poenga frå alle tre delane. Det er 16 poeng i alt, og under 13 poeng er eit teikn på at eleven bør repetere.",
    },
    {
      type: "diskuter",
      title: "Exit-lapp",
      prompt: `<p class="stor">Kva sit best? Kva må du lese om att?</p>
        <p>Skriv ned poenga dine og eitt emne du vil repetere.</p>`,
      form: "Kvar for seg",
      tid: 2,
      notes: "Samle lappane. Dei viser kva emne klassen treng å repetere før ei prøve: før 1850, Aasen, språkstriden eller nynorsk i dag.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Repetisjonen har ingen nye fakta. Presentasjonen er ein quiz i fire rundar som følgjer dei fire fagmodulane, med ein finale der laga set hendingar i rekkjefølgje. Til slutt tek elevane ein kort skriftleg test i tre delar på tavla: årstal, personar og omgrep, og forklaringar. Dei svarer i skriveboka, rettar sjølve og tel poeng. Quizen gir læraren eit raskt bilete av kva klassen kan, og testen viser kvar den einskilde eleven står.</p>",
    mal: [
      "Elevane kan plassere dei viktigaste hendingane i norsk språkhistorie frå 1380 til 2022 i tid.",
      "Elevane kan forklare kva Ivar Aasen og Knud Knudsen gjorde, og kva linene deira førte til.",
      "Elevane kan forklare omgrepa jamstilling, samnorsk, hovudmål og sidemål.",
      "Elevane kan vurdere eigen kunnskap og finne ut kva dei må repetere.",
    ],
    lareplan: [15],
    forkunnskapar: "Elevane skal ha gått gjennom dei fire fagmodulane i Del 1: Norsk språk før 1850, Ivar Aasen og landsmålet, Språkstriden og samnorsk, og Nynorsk i dag.",
    forebuing: [
      "Del klassen i lag på tre til fire elevar.",
      "Ha mini-tavler eller papirlappar klare, og ein stad på tavla til poeng.",
      "Ha lappar klare til exit-lappen.",
      "Elevane treng skrivebok til den skriftlege testen (lysbilete 23 til 25).",
    ],
    okt: [
      { fase: "Oppstart", min: 2, gjer: "<p>Forklar reglane og del i lag.</p>", lysbilete: "2" },
      { fase: "Runde 1 og 2", min: 10, gjer: "<p>Før 1850 og Ivar Aasen.</p>", lysbilete: "3 til 11" },
      { fase: "Runde 3 og 4", min: 11, gjer: "<p>Språkstriden og nynorsk i dag.</p>", lysbilete: "12 til 21" },
      { fase: "Finale", min: 4, gjer: "<p>Laga set hendingane i rekkjefølgje. Kår vinnaren og snakk om kva som var vanskelegast.</p>", lysbilete: "22" },
      { fase: "Skriftleg test", min: 15, gjer: "<p>Elevane svarer åleine i skriveboka på dei tre delane av testen. Vis svaret etter kvar del, og la elevane rette sjølve og telje poeng.</p>", lysbilete: "23 til 25" },
      { fase: "Avslutning", min: 3, gjer: "<p>Exit-lapp: poenga på testen og eitt emne eleven vil repetere.</p>", lysbilete: "26" },
    ],
    misoppfatningar: [
      { feil: "«Folk i Noreg snakka dansk før 1850.»", hjelp: "Skriftspråket var dansk, men talemålet var heile tida norske dialektar. Berre embetsmenn og borgarskap i byane snakka noko som låg nær dansk." },
      { feil: "«Jamstilling og samnorsk er det same.»", hjelp: "Jamstillinga i 1885 gjorde to skriftspråk likeverdige. Samnorsk var ein seinare politikk som ville smelte dei saman til eitt." },
      { feil: "«Nynorsk er yngre enn bokmål.»", hjelp: "Begge fekk namna sine i 1929. Landsmålet til Aasen er frå 1850-talet." },
      { feil: "«Sidemål betyr nynorsk.»", hjelp: "Sidemål er det skriftspråket du ikkje har som hovudmål. For nynorskelevar er bokmål sidemålet." },
    ],
    samtale: [
      "Kva hending i Del 1 meiner du var den viktigaste, og kvifor?",
      "Korleis heng jamstillinga i 1885 saman med språklova i 2022?",
      "Kva hadde skjedd med nynorsken om samnorskpolitikken hadde lukkast?",
    ],
    tilpassing: {
      stotte: [
        "Set saman laga slik at kvart lag har minst éin elev som hugsar stoffet godt.",
        "Gi elevar som treng det, ei utskrift av tidslinja frå Del 1 under runde 1 og 3.",
        "La elevar som treng det, svare munnleg til deg på del 3 av testen i staden for å skrive.",
      ],
      utfordring: [
        "Be elevane lage eigne quizspørsmål med tre feilsvar som er truverdige, til dømes rette hendingar med feil årstal.",
        "La elevane forklare munnleg kvifor kvart feilsvar er feil.",
      ],
    },
    vurdering: [
      "Quizen viser kva spørsmål heile klassen bommar på, og dermed kva som må repeterast.",
      "Den skriftlege testen viser kvar eleven står. Han gir 16 poeng i alt, og minst 13 poeng (om lag 80 %) tyder at eleven kan stoffet godt.",
      "Exit-lappen viser om eleven kan vurdere eigen kunnskap.",
    ],
    vidare: "Elevar som fekk under 13 poeng, repeterer det emnet dei skreiv på exit-lappen. Testane i elevmodulen Repetisjon: kva hugsar du? kan brukast som frivillig lekse. Deretter går klassen vidare til Del 2 om grammatikk, eller til skrivemodulen om han ikkje er gjennomført.",
  },
});
