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
      type: "sitat",
      text: "Kvart par år kjem det forslag om å fjerne karakter i sidemål, eller å gjere sidemål valfritt.",
      kjelde: "Debattutdraget i modulen",
      notes: "Les heile debattutdraget i modulen høgt, eller la ein elev lese. Poenga der: tilhengjarane meiner det gir meir motiverte elevar, motstandarane meiner karakteren er det som får elevane til å arbeide med faget, og eit kompromiss har vore éin felles norskkarakter.",
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
      notes: "Dette er strukturen elevane skal bruke i skriveoppgåva til slutt i modulen, som krev minst to fakta. Vanleg feil: eleven skriv berre si eiga meining. Minn om at ein drøftingstekst skal vise at du forstår motparten.",
    },
    {
      type: "oppgave",
      title: "No arbeider de sjølve",
      body: `<ul>
          <li>Les fagteksten og gjer oppgåvene om språklova og NRK.</li>
          <li>Sorter argumenta i sidemålsdebatten.</li>
          <li>Les debattutdraget og svar på spørsmåla.</li>
          <li>Skriv drøftingsteksten (150–250 ord) med minst to fakta.</li>
        </ul>`,
      tid: 20,
      notes: "Gå rundt medan elevane skriv drøftinga. Spør: kva er faktumet ditt, og kvar fann du det? Elevar som står fast, kan starte med ei setning frå meiningslinja: kva sa dei då?",
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
    tid: "Éi økt på 60 minutt",
    intro: "<p>Modulen er den siste fagmodulen i Del 1 og knyter språkhistoria til notida: kor mange som skriv nynorsk og kvar, kva språklova frå 2022 seier, kravet om 25 % nynorsk hos statsorgan og NRK, og sidemålsdebatten. Timen har eit tydeleg drøftingspreg: elevane skal kunne skilje fakta frå meining og byggje eigne standpunkt på fakta frå modulen.</p>",
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
      "Sjå til at elevane har tilgang til kurset på eigen maskin.",
    ],
    okt: [
      { fase: "Oppstart", min: 5, gjer: "<p>Gå gjennom måla og la elevane finne døme på nynorsk i kvardagen.</p>", lysbilete: "2 og 3" },
      { fase: "Status og lov", min: 13, gjer: "<p>Gå gjennom talet på brukarar, kjerneområda, hovudmål og sidemål, språklova og 25 %-kravet, med tre spørsmål undervegs.</p>", lysbilete: "4 til 10" },
      { fase: "Sidemålsdebatten", min: 14, gjer: "<p>Vis argumenta for og mot, ta spørsmålet, les debattutdraget og gjennomfør meiningslinja.</p>", lysbilete: "11 til 14" },
      { fase: "Kultur og drøfting", min: 5, gjer: "<p>Vis nynorsk i kulturen og gå gjennom strukturen for ein drøftingstekst.</p>", lysbilete: "15 og 16" },
      { fase: "Eigenarbeid", min: 20, gjer: "<p>Elevane arbeider i modulen og skriv drøftingsteksten.</p>", lysbilete: "17" },
      { fase: "Avslutning", min: 3, gjer: "<p>Oppsummer og lat elevane skrive eitt motargument dei no forstår betre.</p>", lysbilete: "18" },
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
        "La elevane velje to fakta frå oppsummeringslysbiletet før dei byrjar å skrive.",
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
    vidare: "Gå vidare til skrivemodulen Skriv om språkhistoria, der oppgåve 5 byggjer direkte på denne modulen, og til repetisjonen av heile Del 1.",
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
      kjelde: "Døme på ein svak fagtekst, frå modulen",
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
          </tbody>
        </table>`,
      notes: "Peik på fordi og resultatet vart: det er orda som gjer jobben. Modulen har eit døme til, om jamstillingsvedtaket. Be elevane finne det og sjå kva som er lagt til: «Etter tretti år med landsmål i bruk».",
    },
    {
      title: "Bindeord som viser samanheng",
      steps: [
        "<p class=\"stor\"><strong>Årsak:</strong> <em class=\"nn\">fordi, difor, derfor, slik at</em></p>",
        "<p class=\"stor\"><strong>Motsetnad:</strong> <em class=\"nn\">men, likevel, samtidig</em></p>",
        "<p class=\"stor\"><strong>Tid:</strong> <em class=\"nn\">først, deretter, seinare, til slutt</em></p>",
        "<p class=\"stor\"><strong>Oppsummering:</strong> <em class=\"nn\">altså</em></p>",
      ],
      notes: "Grupperinga er ei hjelp frå læraren, modulen listar orda utan grupper. Minn om at <em>difor</em> og <em>derfor</em> begge er rette på nynorsk. Bokmålsforma <em>da</em> finst ikkje: skriv <em>då</em> eller <em>når</em>.",
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
      title: "Faktabanken: bruk tidslinja",
      body: `<ol class="tidslinje">
          <li><span class="aar">1380</span><span class="hend">Union med Danmark</span></li>
          <li><span class="aar">1814</span><span class="hend">Eiga grunnlov, framleis dansk skrift</span></li>
          <li><span class="aar">1848–1850</span><span class="hend">Grammatikken og ordboka til Aasen</span></li>
          <li><span class="aar">1885</span><span class="hend">Jamstillingsvedtaket</span></li>
          <li><span class="aar">1929</span><span class="hend">Namna nynorsk og bokmål</span></li>
          <li><span class="aar">1981</span><span class="hend">Samnorskpolitikken blir oppgitt</span></li>
          <li><span class="aar">2022</span><span class="hend">Ny språklov</span></li>
        </ol>`,
      steps: ["<p class=\"midt\">Ta med årstal berre når dei betyr noko for poenget ditt.</p>"],
      notes: "Den fulle faktabanken står i modulen, med fleire årstal og ein tabell over Aasen og Knudsen. Elevane skal bruke han aktivt. Oppgåve 1 krev minst fem årstal, men åtvar mot å stappe inn årstal som ikkje har noko å gjere i teksten.",
    },
    {
      title: "Oppgåve 1: Fortel historia",
      body: `<p class="liten">200–300 ord, for ein lesar som ikkje kan noko om emnet</p>`,
      steps: [
        "<p class=\"stor\"><strong>Innleiing:</strong> eit land utan eige skriftspråk</p>",
        "<p class=\"stor\"><strong>Hovuddel:</strong> 1814, Aasen og reisene, bøkene</p>",
        "<p class=\"stor\"><strong>Avslutning:</strong> landsmålet får namnet nynorsk</p>",
      ],
      notes: "Hintet i modulen seier: tenk på det som ei forteljing med ei årsak. Sjekklista krev at eleven forklarer kvifor språkspørsmålet vart viktig etter 1814, kva Aasen gjorde på reisene, og kva ordet landsmål tyder. Det siste gløymer mange: landsmål er språket for heile landet.",
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
      notes: "Lytt etter gode kvardagsdøme og la eitt eller to par vise fram. Eit døme kan vere to lag som får like mykje tid på banen. Oppgåve 3 i modulen let eleven velje mellom landsmål, jamstilling, samnorsk og sidemål. Poenget: det er vanskelegare å forklare enkelt enn innfløkt.",
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
      notes: "Reisene gjekk føre seg 1842–1846 med stipend frå Det Kongelige Norske Videnskabers Selskab. Eleven skal vise minst tre konkrete ting Aasen gjorde: lytta, skreiv ned ord, samanlikna bøyingar frå ulike bygder, og få fram kvifor han ikkje nøgde seg med éin dialekt. Tips: la elevane opne Reisene til Ivar Aasen i kurset og velje ein stad på kartet.",
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
      notes: "Be elevane lese gjennom teksten éin gong berre for desse orda før dei leverer. Teksten blir lagra automatisk i modulen, og elevane kan laste han ned som fil når dei er ferdige.",
    },
    {
      type: "oppgave",
      title: "No skriv de",
      body: `<ul>
          <li>Vel éi oppgåve, eller den læraren har valt.</li>
          <li>Bruk faktabanken i modulen.</li>
          <li>Gå gjennom sjekklista før du er ferdig.</li>
        </ul>`,
      tid: 35,
      notes: "Gå rundt og les første avsnitt hos kvar elev. Spør: kva er poenget ditt? Kvar viser du samanhengen? Elevar som står fast, kan starte med modellinnleiinga og skrive vidare. Dei som blir tidleg ferdige, tek ei oppgåve til.",
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
    tid: "Éi økt på 90 minutt, eller to økter på 45 minutt",
    intro: "<p>Skrivemodulen samlar Del 1 i fem skriveoppgåver av ulikt slag: forklare, samanlikne, formidle, dikte og oppsummere. Modulen har ein faktabank med tidslinje og ein tabell over Aasen og Knudsen, og kvar oppgåve har eige ordtal, hint og sjekkliste. Hovudpoenget i undervisninga er at ein god fagtekst viser samanheng, ikkje berre fakta. Presentasjonen går gjennom dette, viser strukturen i kvar oppgåve og gir elevane ei modellinnleiing før dei skriv.</p>",
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
      "Les gjennom sjekklistene for alle fem oppgåvene i modulen.",
      "Vurder om elevane skal levere teksten som nedlasta fil eller på anna vis.",
      "Opne Reisene til Ivar Aasen i kurset om du vil vise kartet ved oppgåve 4.",
    ],
    okt: [
      { fase: "Oppstart", min: 5, gjer: "<p>Gå gjennom måla og dei fem oppgåvene.</p>", lysbilete: "2 og 3" },
      { fase: "Samanheng i fagtekst", min: 13, gjer: "<p>Vis den svake teksten, diskuter kva som manglar, og gå gjennom omskrivinga, bindeorda og tidslinja.</p>", lysbilete: "4 til 9" },
      { fase: "Oppgåvene", min: 20, gjer: "<p>Gå gjennom strukturen i kvar oppgåve med modellinnleiing, spørsmål og ei kort munnleg øving i å forklare enkelt.</p>", lysbilete: "10 til 17" },
      { fase: "Skriving", min: 38, gjer: "<p>Ta nynorsksjekken, og la elevane skrive. Gå rundt og les første avsnitt.</p>", lysbilete: "18 og 19" },
      { fase: "Respons", min: 9, gjer: "<p>Parrespons med konkret oppdrag, og tid til å skrive om éin stad.</p>", lysbilete: "20" },
      { fase: "Avslutning", min: 5, gjer: "<p>Oppsummer og spør kva som var vanskelegast.</p>", lysbilete: "21" },
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
    vidare: "Gå vidare til repetisjonen av heile Del 1. Skrivereglane om tekstbinding og då/når blir følgde opp i Del 4.",
  },
});

Larar.register("historie-repetisjon", {
  tittelnotat: "Repetisjonen er ein tavlequiz over heile Del 1 før elevane tek testane i modulen. Del gjerne klassen i lag og hald poeng. Sei det høgt: målet er ikkje å vinne, men å finne ut kva de må lese om att.",
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
      title: "No testar de dykk sjølve",
      body: `<ul>
          <li><strong>Test 1:</strong> årstal og hendingar</li>
          <li><strong>Test 2:</strong> personar og omgrep</li>
          <li><strong>Test 3:</strong> stor test frå heile Del 1</li>
          <li>Under 80 %? Les leksjonen om att og prøv på nytt.</li>
        </ul>`,
      tid: 15,
      notes: "Testane trekkjer oppgåver tilfeldig, så elevane kan ta dei fleire gonger. Etter kvar runde kan dei øve på det dei bomma på. Minst 80 % rett tel som fullført. Be elevane notere resultatet på Test 3.",
    },
    {
      type: "diskuter",
      title: "Exit-lapp",
      prompt: `<p class="stor">Kva sit best? Kva må du lese om att?</p>
        <p>Skriv ned éin modul du vil gå tilbake til.</p>`,
      form: "Kvar for seg",
      tid: 2,
      notes: "Samle lappane. Dei viser kva modul klassen treng å repetere før ei prøve.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Repetisjonsmodulen har ingen nye fakta. Han har tre testar som trekkjer oppgåver tilfeldig: årstal og hendingar, personar og omgrep, og ein stor test over heile Del 1. Presentasjonen er ein quiz i fire rundar som følgjer dei fire fagmodulane, med ein finale der laga set hendingar i rekkjefølgje. Quizen gir læraren eit raskt bilete av kva klassen kan, og elevane ei oppvarming før dei testar seg sjølve.</p>",
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
      "Sjå til at elevane har tilgang til kurset på eigen maskin.",
    ],
    okt: [
      { fase: "Oppstart", min: 2, gjer: "<p>Forklar reglane og del i lag.</p>", lysbilete: "2" },
      { fase: "Runde 1 og 2", min: 10, gjer: "<p>Før 1850 og Ivar Aasen.</p>", lysbilete: "3 til 11" },
      { fase: "Runde 3 og 4", min: 11, gjer: "<p>Språkstriden og nynorsk i dag.</p>", lysbilete: "12 til 21" },
      { fase: "Finale", min: 4, gjer: "<p>Laga set hendingane i rekkjefølgje. Kår vinnaren og snakk om kva som var vanskelegast.</p>", lysbilete: "22" },
      { fase: "Eigenarbeid", min: 15, gjer: "<p>Elevane tek testane i modulen og øver på det dei bomma på.</p>", lysbilete: "23" },
      { fase: "Avslutning", min: 3, gjer: "<p>Exit-lapp: kva modul vil du gå tilbake til?</p>", lysbilete: "24" },
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
        "La elevane ha tidslinja frå modulen Norsk språk før 1850 framfor seg under runde 1 og 3.",
        "Tilrå Test 1 og Test 2 før den store testen.",
      ],
      utfordring: [
        "Be elevane lage eigne quizspørsmål med tre feilsvar som er truverdige, til dømes rette hendingar med feil årstal.",
        "La elevane forklare munnleg kvifor kvart feilsvar er feil.",
      ],
    },
    vurdering: [
      "Quizen viser kva spørsmål heile klassen bommar på, og dermed kva som må repeterast.",
      "Resultatet på Test 3 i modulen viser kvar eleven står. Minst 80 % rett tel som fullført.",
      "Exit-lappen viser om eleven kan vurdere eigen kunnskap.",
    ],
    vidare: "Elevar som fekk under 80 %, går tilbake til den modulen det gjeld. Deretter går klassen vidare til Del 2 om grammatikk, eller til skrivemodulen om han ikkje er gjennomført.",
  },
});
