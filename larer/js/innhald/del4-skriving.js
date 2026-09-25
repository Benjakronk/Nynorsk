/* Lærarinnhald for Del 4 · Skriving. Formatet står i larer/README.md. */

Larar.register("skriving-omsetjing", {
  tittelnotat: "Mange elevar skriv sidemål ved å tenkje på bokmål og setje om. Det er ikkje noko gale i det, men det krev ein fast framgangsmåte. Sei det høgt: i dag lærer vi ein metode i tre steg som de kan bruke på alle tekstar, og vi øver på han saman før de prøver sjølve.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>lære <strong>tre tankesteg</strong> for omsetjing</li>
        <li>byte ut <strong>småorda</strong> med ein gong</li>
        <li>sjekke <strong>verb</strong> og <strong>substantiv</strong></li>
        <li>setje om ein kort tekst <strong>saman</strong></li>
      </ul>`,
      notes: "Gå raskt gjennom måla. Fortel at metoden òg er ein korrekturmetode: dei same tre stega kan elevane bruke når dei les over ein tekst dei har skrive på nynorsk frå starten av.",
    },
    {
      type: "diskuter",
      title: "Korleis skriv du sidemål?",
      prompt: `<p>Tenkjer du på bokmål og set om, eller prøver du å tenkje på nynorsk med ein gong?</p>
        <p>Kva ord gløymer du oftast å byte ut?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      notes: "Skriv orda elevane nemner på tavla og ta vare på lista. Som regel kjem <em>ikke</em>, <em>jeg</em>, <em>hva</em> og <em>fra</em> først. Poenget er at elevane skal sjå at feila er få og faste: det er dei same orda som går att. Då kan vi jakte på dei systematisk.",
    },
    {
      title: "Tre tankesteg",
      steps: [
        "<p class=\"stor\">1. <strong>Småord først</strong>: <em class=\"bm\">ikke, jeg, hva, fra</em></p>",
        "<p class=\"stor\">2. <strong>Verb og bøying</strong>: presens, preteritum, perfektum</p>",
        "<p class=\"stor\">3. <strong>Substantiv og samsvar</strong>: <em class=\"nn\">jenta, boka, husa</em></p>",
      ],
      notes: "Dette er metoden i dag. Rekkjefølgja er med vilje: småorda er flest og lettast å rette, så dei tek vi først. Verba er det nest vanlegaste feilområdet. Substantiv og adjektiv krev mest tankearbeid, derfor kjem dei til slutt. Be elevane skrive dei tre stega i margen på arket når dei skriv.",
    },
    {
      title: "Steg 1: småorda",
      body: `<table class="stor">
          <thead><tr><th>Bokmål</th><th>Nynorsk</th></tr></thead>
          <tbody>
            <tr><td><em class="bm">jeg, ikke, bare</em></td><td><em class="nn">eg, ikkje, berre</em></td></tr>
            <tr><td><em class="bm">hva, hvor, hvem</em></td><td><em class="nn">kva, kvar, kven</em></td></tr>
            <tr><td><em class="bm">hvordan, hvorfor</em></td><td><em class="nn">korleis, kvifor</em></td></tr>
            <tr><td><em class="bm">fra, nå, mye</em></td><td><em class="nn">frå, no, mykje</em></td></tr>
          </tbody>
        </table>`,
      steps: ["<p class=\"midt\">Desse orda står i nesten kvar setning. Rett dei først!</p>"],
      notes: "Samanlikn med lista frå samtalen. Nemn at spørjeorda byrjar på <em>kv-</em> på nynorsk, bortsett frå <em>korleis</em> og <em>kor</em>. Pronomenet <em>dere</em> blir <em>de</em> på nynorsk, og <em>dem</em> blir <em>dykk</em> når det viser til dei du snakkar til. Det kan du ta munnleg om klassen er klar for det.",
    },
    {
      type: "sporsmal",
      question: "Kva er rett omsetjing av <em class=\"bm\">Jeg vet ikke hva jeg skal gjøre.</em>?",
      options: [
        "<em class=\"nn\">Eg vet ikkje kva eg skal gjere.</em>",
        "<em class=\"nn\">Eg veit ikkje kva eg skal gjere.</em>",
        "<em class=\"nn\">Eg veit ikkje hva eg skal gjere.</em>",
        "<em class=\"nn\">Eg veit ikkje kva eg skal gjøre.</em>",
      ],
      correct: 1,
      explain: "Fem ord skal byttast: <em class=\"nn\">eg, veit, ikkje, kva</em> og <em class=\"nn\">gjere</em>. Verbet <em class=\"nn\">vite</em> heiter <em class=\"nn\">veit</em> i presens.",
      notes: "Lat elevane vise svaret med fingrane. Dei som vel A, har gløymt at presens av <em>vite</em> er <em>veit</em>. Det er ein fin overgang til steg 2.",
    },
    {
      title: "Steg 2: verba",
      body: `<div class="to-kol">
          <div class="boks"><h3>Presens</h3>
            <p><em class="bm">spiser</em> → <em class="nn">et</em></p>
            <p><em class="bm">kommer</em> → <em class="nn">kjem</em></p>
            <p><em class="bm">ligger</em> → <em class="nn">ligg</em></p>
          </div>
          <div class="boks"><h3>Preteritum</h3>
            <p><em class="bm">gikk</em> → <em class="nn">gjekk</em></p>
            <p><em class="bm">så</em> → <em class="nn">såg</em></p>
            <p><em class="bm">flyttet</em> → <em class="nn">flytta</em></p>
          </div>
        </div>`,
      steps: [
        "<p class=\"midt\">Sterke verb har <strong>inga ending</strong> i presens: <em class=\"nn\">kjem, et, ligg</em>.</p>",
        "<p class=\"midt\">A-verb endar på <strong>-a</strong> i preteritum, aldri <em class=\"bm\">-et</em>.</p>",
      ],
      notes: "Dei to reglane på stega fangar dei fleste verbfeila. Sterke verb får ikkje <em>-er</em> i presens: <em>kjem</em>, ikkje <em>kjemer</em>. Svake verb som <em>flytte</em> og <em>kaste</em> får <em>-a</em> i preteritum. Elevar som skriv <em>flytta</em> på bokmål, er alt vane med forma. Elevar som treng meir, kan ta modulen Verb: sterke og svake i kurset som lekse.",
    },
    {
      type: "drill",
      title: "Sterke verb i preteritum",
      intro: "Les verbet høgt. Klassen seier preteritum før du viser svaret.",
      spec: { bank: "verbs", filter: { cls: ["sterk"] }, tasks: ["pret"], mode: "choice" },
      n: 5,
      notes: "Oppgåvene blir trekte tilfeldig frå ordbanken. Be elevane seie heile rekkja høgt: <em>gå, går, gjekk, har gått</em>. Det festar seg betre enn éi form åleine.",
    },
    {
      title: "Ord som er heilt ulike",
      steps: [
        "<p class=\"stor\"><em class=\"bm\">spise</em> → <em class=\"nn\">ete</em> &nbsp; <em class=\"bm\">se</em> → <em class=\"nn\">sjå</em></p>",
        "<p class=\"stor\"><em class=\"bm\">gjøre</em> → <em class=\"nn\">gjere</em> &nbsp; <em class=\"bm\">si</em> → <em class=\"nn\">seie</em></p>",
        "<p class=\"stor\"><em class=\"bm\">være</em> → <em class=\"nn\">vere</em> &nbsp; <em class=\"bm\">øye</em> → <em class=\"nn\">auge</em></p>",
        "<p class=\"stor\"><em class=\"bm\">skole</em> → <em class=\"nn\">skule</em> &nbsp; <em class=\"bm\">nå</em> → <em class=\"nn\">no</em></p>",
      ],
      notes: "Desse orda ser så ulike ut at elevane ikkje alltid oppdagar at dei må byttast. Spør klassen før kvart steg: kva heiter dette på nynorsk? Nemn at mange ord er like på begge målformer, som <em>familie</em> og <em>språk</em>. Det er ikkje alt som skal endrast, og elevar som overkorrigerer, lagar òg feil.",
    },
    {
      type: "sporsmal",
      question: "Kva er rett omsetjing av <em class=\"bm\">Hun gikk til skolen og så ingen.</em>?",
      options: [
        "<em class=\"nn\">Ho gikk til skulen og så ingen.</em>",
        "<em class=\"nn\">Ho gjekk til skolen og såg ingen.</em>",
        "<em class=\"nn\">Ho gjekk til skulen og såg ingen.</em>",
        "<em class=\"nn\">Hun gjekk til skulen og såg ingen.</em>",
      ],
      correct: 2,
      explain: "<em class=\"nn\">ho, gjekk, skulen, såg</em>: fire ord blir endra. Preteritum av <em class=\"nn\">sjå</em> er <em class=\"nn\">såg</em>.",
      notes: "Kvart feil alternativ har gløymt eitt eller to ord. Be elevane peike på kva ord som er feil i dei andre alternativa. Det er god trening i å lese korrektur.",
    },
    {
      title: "Steg 3: substantiv og samsvar",
      steps: [
        "<p class=\"stor\">Hokjønn: <em class=\"bm\">boken</em> → <em class=\"nn\">boka</em>, <em class=\"bm\">døren</em> → <em class=\"nn\">døra</em></p>",
        "<p class=\"stor\">Inkjekjønn fleirtal: <em class=\"bm\">husene</em> → <em class=\"nn\">husa</em></p>",
        "<p class=\"stor\">Adjektivet følgjer med: <em class=\"nn\">eit stort hus, bøkene er gamle</em></p>",
      ],
      notes: "Mange hokjønnsord har hankjønn på bokmål, og då blir <em>boken</em> ståande. Hugseregel: bestemt form eintal av hokjønn endar på <em>-a</em>. Inkjekjønnsord har òg <em>-a</em> i bestemt fleirtal. Elevane som er usikre på kjønnet, skal slå opp: ordboka skriv <em>f.</em> for hokjønn.",
    },
    {
      type: "sporsmal",
      question: "Kva er rett omsetjing av <em class=\"bm\">Boken ligger på bordet i kjøkkenet.</em>?",
      options: [
        "<em class=\"nn\">Boken ligg på bordet i kjøkenet.</em>",
        "<em class=\"nn\">Boka ligger på bordet i kjøkkenet.</em>",
        "<em class=\"nn\">Boka ligg på bordet i kjøkenet.</em>",
      ],
      correct: 2,
      explain: "<em class=\"nn\">bok</em> er hokjønn, så det blir <em class=\"nn\">boka</em>. <em class=\"nn\">ligge</em> er sterkt og får inga ending: <em class=\"nn\">ligg</em>. Og <em class=\"nn\">kjøken</em> har éin k på nynorsk.",
      notes: "Her er alle tre stega i éi setning. <em>kjøken</em> med éin k overraskar mange. Bruk det som døme på at det er lurt å slå opp når eit ord ser nesten likt ut.",
    },
    {
      type: "sitat",
      kicker: "Vi set om saman",
      text: "<em class=\"bm\">Jeg har en hund som heter Bamse. Hver morgen går vi en tur før skolen. Han er ikke så glad i regn, men han elsker snø. Når vi kommer hjem, spiser han frokost.</em>",
      kjelde: "Bokmålstekst til modellering",
      notes: "Les teksten høgt. Be elevane finne alle småorda først, så verba, så substantiva. Skriv omsetjinga på tavla eller vis neste lysbilete steg for steg. Tenk høgt medan du jobbar: «Her står <em>jeg</em>, det rettar eg med ein gong. Så <em>heter</em>: er det sterkt eller svakt?»",
    },
    {
      title: "Setning for setning",
      steps: [
        "<p class=\"stor\"><em class=\"nn\"><span class=\"merk\">Eg</span> har <span class=\"merk\">ein</span> hund som <span class=\"merk\">heiter</span> Bamse.</em></p>",
        "<p class=\"stor\"><em class=\"nn\"><span class=\"merk\">Kvar morgon</span> går vi <span class=\"merk\">ein</span> tur før <span class=\"merk\">skulen</span>.</em></p>",
        "<p class=\"stor\"><em class=\"nn\">Han er <span class=\"merk\">ikkje</span> så glad i regn, men han <span class=\"merk\">elskar</span> snø.</em></p>",
        "<p class=\"stor\"><em class=\"nn\">Når vi <span class=\"merk\">kjem heim</span>, <span class=\"merk\">et</span> han <span class=\"merk\">frukost</span>.</em></p>",
      ],
      notes: "Vis éi setning om gongen, men la klassen foreslå før du trykkjer. Dei merkte orda er dei som er endra. Legg merke til <em>elskar</em>: a-verb får <em>-ar</em> i presens. <em>frukost</em> er eit ord mange ikkje veit om, så det er ein god grunn til å slå opp. Tel til slutt: tretten ord er endra, resten er likt. Det viser elevane at jobben er avgrensa.",
    },
    {
      title: "Bruk ordboka",
      body: `<ul class="stor">
          <li>Slå opp på <strong>ordbokene.no</strong></li>
          <li>Sjekk <strong>kjønnet</strong> på substantivet</li>
          <li>Opne <strong>bøyingstabellen</strong> til verbet</li>
          <li>Er du usikker, <strong>slå opp</strong>. Ikkje gjett.</li>
        </ul>`,
      notes: "Vis gjerne eit oppslag live, til dømes <em>frukost</em> eller <em>kjøken</em>. Pass på at elevane vel Nynorskordboka og ikkje Bokmålsordboka. Modulane i Del 3 går grundigare inn på ordboka om klassen treng det.",
    },
    {
      title: "Les korrektur i tre rundar",
      steps: [
        "<p class=\"stor\">Runde 1: jakt på <strong>småorda</strong></p>",
        "<p class=\"stor\">Runde 2: sjekk <strong>kvart verb</strong></p>",
        "<p class=\"stor\">Runde 3: sjekk <strong>substantiv og adjektiv</strong></p>",
      ],
      notes: "Å lese med eitt mål om gongen er meir effektivt enn å lese éin gong og leite etter alt. Ver tydeleg på at dette er det elevane skal gjere med tekstomsetjinga på lysbilete 18. Nokre elevar likar å understreke alle verba med blyant før runde 2.",
    },
    {
      type: "oppgave",
      title: "Set om til nynorsk",
      form: "Åleine",
      body: `<ol>
          <li><em class="bm">Vi spiser middag klokka fem.</em></li>
          <li><em class="bm">Hvorfor flyttet familien din hit fra Oslo?</em></li>
          <li><em class="bm">Jeg har ikke sett boken hennes.</em></li>
          <li>Berre orda: <em class="bm">hvor, vet, fra, spiste, gikk, mye</em></li>
        </ol>`,
      tid: 5,
      svar: `<ol>
          <li><em class="nn">Vi et middag klokka fem.</em></li>
          <li><em class="nn">Kvifor flytta familien din hit frå Oslo?</em></li>
          <li><em class="nn">Eg har ikkje sett boka hennar.</em></li>
          <li><em class="nn">kvar, veit, frå, åt, gjekk, mykje</em></li>
        </ol>`,
      notes: "Elevane skriv svara i skriveboka. Kvar setning øver eitt av stega: <em>et</em> er presens av det sterke verbet <em>ete</em>, <em>flytta</em> er eit a-verb i preteritum, og <em>boka</em> er hokjønn. Gå rundt og spør: kva steg er du på no? Gå gjennom fasiten saman før de går vidare til teksten, og la elevane rette med ein annan farge.",
    },
    {
      type: "oppgave",
      title: "Set om teksten",
      form: "Åleine",
      body: `<div class="boks"><p><em class="bm">Jeg liker å gå på skolen om morgenen. Det er ikke alltid like lett å stå opp, men når jeg først er ute, blir jeg glad. Vennene mine venter på meg, og vi går sammen. Hvis det regner, tar vi bussen.</em></p></div>
        <ol>
          <li>Skriv teksten på nynorsk.</li>
          <li>Les korrektur i tre rundar.</li>
          <li>Tel kor mange ord du har endra.</li>
        </ol>`,
      tid: 8,
      svar: `<p><em class="nn">Eg likar å gå på skulen om morgonen. Det er ikkje alltid like lett å stå opp, men når eg først er ute, blir eg glad. Vennene mine ventar på meg, og vi går saman. Viss det regnar, tek vi bussen.</em></p>
        <p>12 ord er endra.</p>`,
      notes: "Gå rundt og spør: kva runde er du på no? Dei tolv endra orda er <em>eg</em> (tre gonger), <em>likar, skulen, morgonen, ikkje, ventar, saman, viss, regnar</em> og <em>tek</em>. <em>Om det regnar</em> er òg rett, og <em>venene</em> er ei jamstilt form av <em>vennene</em>. Mange gløymer at a-verba får <em>-ar</em> i presens: <em>likar, ventar, regnar</em>. Be ein elev som blir tidleg ferdig, forklare kvifor <em>tar</em> blir <em>tek</em>. Elevmodulen har same tekst med språksjekk, og han passar som frivillig lekse eller til reinskriving.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\">Småord først, så verb, så substantiv.</p>",
        "<p class=\"stor\">Ikkje alt skal endrast: mange ord er like.</p>",
        "<p class=\"stor\">Er du usikker, <strong>slå opp</strong>.</p>",
      ],
      notes: "Be elevane skrive ned det ordet dei oftast gløymer å byte ut, på ein lapp dei legg i pennalet. Det blir den personlege sjekklista deira.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen gir elevane ein fast framgangsmåte for å setje om frå bokmål til nynorsk: småord først, så verb og bøying, så substantiv og samsvar. Metoden er like nyttig som korrekturmetode for elevar som skriv nynorsk frå starten av. Presentasjonen modellerer omsetjinga på tavla, setning for setning, før elevane prøver sjølve.</p>",
    mal: [
      "Elevane kan bruke tre tankesteg når dei set om frå bokmål til nynorsk.",
      "Elevane kan byte ut dei vanlegaste småorda og spørjeorda.",
      "Elevane kan bøye vanlege sterke verb og a-verb rett i presens og preteritum.",
      "Elevane kan bruke ordboka og lese korrektur i rundar med eitt mål om gongen.",
    ],
    lareplan: [11, 12, 10],
    forkunnskapar: "Elevane bør kjenne ordklassane og ha møtt skilnaden på sterke og svake verb. Modulane Verb: sterke og svake og Substantiv: kjønn og bøying er gode å ha gjort før.",
    forebuing: [
      "Test presentasjonen på tavla, særleg tavleøvinga på lysbilete 8.",
      "Ha ordbokene.no open i ein fane, så du kan vise eit oppslag live.",
      "Skriv ut bokmålsteksten på lysbilete 13 om du vil at elevane skal notere på papir.",
    ],
    okt: [
      { fase: "Oppstart", min: 5, gjer: "<p>Gå gjennom måla og la elevane snakke om korleis dei skriv sidemål. Skriv orda dei nemner på tavla.</p>", lysbilete: "2 og 3" },
      { fase: "Tre tankesteg", min: 13, gjer: "<p>Innfør metoden og gå gjennom småord, verb og ulike ord, med spørsmål og ein tavlerunde på sterke verb.</p>", lysbilete: "4 til 10" },
      { fase: "Substantiv og modellering", min: 8, gjer: "<p>Ta steg 3 og spørsmålet med alle tre stega. Set om modellteksten saman med klassen, setning for setning.</p>", lysbilete: "11 til 14" },
      { fase: "Verktøy", min: 3, gjer: "<p>Vis eit ordbokoppslag og innfør korrektur i tre rundar.</p>", lysbilete: "15 og 16" },
      { fase: "Eigenarbeid", min: 13, gjer: "<p>Elevane set om setningane på tavla i skriveboka, rettar mot fasiten og set så om den korte teksten.</p>", lysbilete: "17 og 18" },
      { fase: "Avslutning", min: 3, gjer: "<p>Oppsummer og lat elevane skrive ned ordet dei oftast gløymer.</p>", lysbilete: "19" },
    ],
    misoppfatningar: [
      { feil: "«Nynorsk er bokmål med nokre andre ord.»", hjelp: "Vis at bøyinga òg er ulik: <em class=\"nn\">boka, husa, flytta, kjem</em>. Det er ikkje nok å byte ut småorda." },
      { feil: "«Alt skal endrast.»", hjelp: "Mange ord er like, som <em class=\"nn\">familie, hund, regn, bord</em>. Elevar som overkorrigerer, skriv ord som ikkje finst. Tel saman med klassen kor mange ord som faktisk blir endra i modellteksten." },
      { feil: "«A-verb får -et i preteritum, som på bokmål.»", hjelp: "På nynorsk endar a-verba på <em class=\"nn\">-a</em>: <em class=\"nn\">flytta, kasta, snakka</em>. <em class=\"bm\">-et</em> er alltid feil i preteritum." },
      { feil: "«Sterke verb får -er i presens.»", hjelp: "Sterke verb har inga ending i presens: <em class=\"nn\">kjem, et, ligg, skriv</em>. Sei rekkjene høgt: <em class=\"nn\">skrive, skriv, skreiv, har skrive</em>." },
    ],
    samtale: [
      "Kvifor er det lurt å ta småorda først?",
      "Kva ord er like på bokmål og nynorsk, og kva ord ser like ut, men er ulike?",
      "Er det best å tenkje på bokmål og setje om, eller å prøve å tenkje nynorsk frå starten? Kvifor?",
      "Korleis kan dei tre stega hjelpe deg å lese korrektur på eigne tekstar?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane ei huskelapp med dei tre stega og dei tolv vanlegaste småorda.",
        "La elevane setje om éi setning om gongen og få ho godkjend før dei går vidare.",
        "La elevane understreke småord med éin farge og verb med ein annan før dei set om.",
      ],
      utfordring: [
        "Be elevane setje om ein avisartikkel på bokmål og forklare fem av vala dei gjorde.",
        "La elevane finne ord som endar på <em class=\"bm\">-het</em> på bokmål og slå opp kva dei heiter på nynorsk, til dømes <em class=\"nn\">kjærleik</em> og <em class=\"nn\">fridom</em>.",
      ],
    },
    vurdering: [
      "Fleirvalsspørsmåla og tavleøvinga viser raskt kva steg klassen er usikker på.",
      "Omsetjinga av den korte teksten på lysbilete 18 viser om eleven brukar metoden. Samle inn skrivebøkene eller la elevane rette for kvarandre med fasiten.",
      "Kjenneteikn på låg måloppnåing: eleven byter ut dei vanlegaste småorda, men verb og substantiv står att på bokmål.",
      "Kjenneteikn på middels måloppnåing: eleven rettar småord og dei fleste verba, men gløymer hokjønn og samsvar.",
      "Kjenneteikn på høg måloppnåing: eleven set om teksten konsekvent, bøyer verb og substantiv rett, brukar ordboka når det trengst og kan grunngi vala.",
    ],
    vidare: "Elevmodulen har dei same omsetjingane med språksjekk og passar som frivillig lekse. Følg opp med Bokmålsord som snik seg inn og Småord og funksjonsord under Typiske feil i Del 4. Neste skrivemodul er Korte tekstar: melding, e-post, dagbok.",
  },
});

Larar.register("skriving-korte-tekstar", {
  tittelnotat: "Korte tekstar er det elevane skriv mest av i kvardagen, men sjeldan på nynorsk. I dag skal dei sjå at same bodskap blir skriven ulikt til ulike mottakarar, og at sjølv ei kort melding skal vere konsekvent. Start med å spørje kor mange meldingar dei har sendt i dag.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>tilpasse språket til <strong>mottakaren</strong></li>
        <li>sjå på tre sjangrar: <strong>melding, e-post, dagbok</strong></li>
        <li>skrive om ein e-post <strong>saman</strong></li>
        <li>skrive <strong>konsekvent</strong> nynorsk</li>
      </ul>`,
      notes: "Gå raskt gjennom måla. Fortel at elevane skal skrive tre korte tekstar i skriveboka til slutt, og at vi først øver på kva som skil dei.",
    },
    {
      type: "diskuter",
      title: "Same sak, ulike mottakarar",
      prompt: `<p>Du er sjuk og kjem ikkje på skulen i dag.</p>
        <p>Korleis skriv du til <strong>ein venn</strong>? Korleis skriv du til <strong>læraren</strong>?</p>`,
      form: "Snakk med sidemannen",
      tid: 3,
      notes: "Be eit par elevar lese opp det dei ville skrive, eller skriv døma deira på tavla i to kolonnar. Spør kva som er ulikt: lengda, helsinga, smilefjes, fullstendige setningar. Det er desse skilnadene vi kallar å tilpasse teksten til mottakaren.",
    },
    {
      title: "Tilpass språket",
      body: `<div class="tre-kol">
          <div class="boks"><h3>Melding</h3><p>til ein venn</p><p>uformell, kort</p></div>
          <div class="boks"><h3>E-post</h3><p>til ein lærar</p><p>høfleg, heile setningar</p></div>
          <div class="boks"><h3>Dagbok</h3><p>til deg sjølv</p><p>personleg, kjensler</p></div>
        </div>`,
      steps: ["<p class=\"midt stor\">Kven skal lese? Kva skal teksten gjere?</p>"],
      notes: "Dei to spørsmåla på steget er grunnspørsmåla i all skriving: mottakar og formål. Be elevane stille dei før dei skriv éin einaste tekst. Kople til samtalen: meldinga til venen og e-posten til læraren hadde same bodskap, men ulik mottakar.",
    },
    {
      type: "sitat",
      kicker: "Melding",
      text: "<em class=\"nn\">Hei! Kjem du heim til meg etter skulen? Eg har lyst til å sjå ein film. Skriv tilbake :)</em>",
      kjelde: "Døme på ei melding",
      notes: "Les meldinga høgt og spør: kva gjer at dette er ei melding og ikkje ein e-post? Korte setningar, eit spørsmål, eit smilefjes, ingen avslutning. Spør så: kva ord ville vore annleis på bokmål? <em>kjem, heim, skulen, eg, sjå</em>.",
    },
    {
      type: "sporsmal",
      question: "Kva er rett omsetjing av <em class=\"bm\">Kommer du hjem til meg i morgen?</em>?",
      options: [
        "<em class=\"nn\">Kommer du heim til meg i morgon?</em>",
        "<em class=\"nn\">Kjem du heim til meg i morgon?</em>",
        "<em class=\"nn\">Kjem du hjem til meg i morgen?</em>",
      ],
      correct: 1,
      explain: "<em class=\"nn\">kjem, heim, i morgon</em>. Sjølv i ei kort melding skal alle orda vere nynorske.",
      notes: "Elevane skal setje om ei lengre utgåve av meldinga på lysbilete 16. Elevane som vel C, har berre retta verbet. Minn om dei tre tankestega frå omsetjingsmodulen.",
    },
    {
      type: "sitat",
      kicker: "E-post til læraren",
      text: "<em class=\"nn\">Hei [Lærar],<br>Eg vart sjuk i går og rakk ikkje innleveringa. Kan eg få utsetjing til fredag?<br>Helsing [Namn]</em>",
      kjelde: "Døme på ein e-post",
      notes: "Peik på dei tre delane: opning med namn, sjølve saka og ei helsing. E-posten er kort, men han har alt læraren treng: kva som skjedde, kva eleven ber om, og kven som skriv.",
    },
    {
      title: "E-posten bit for bit",
      steps: [
        "<p class=\"stor\"><strong>Opning:</strong> <em class=\"nn\">Hei, Kari</em></p>",
        "<p class=\"stor\"><strong>Grunn:</strong> kva har skjedd?</p>",
        "<p class=\"stor\"><strong>Spørsmål:</strong> kva ber du om?</p>",
        "<p class=\"stor\"><strong>Forslag:</strong> ny dato eller løysing</p>",
        "<p class=\"stor\"><strong>Helsing:</strong> <em class=\"nn\">Helsing Ola</em></p>",
      ],
      notes: "Dette er malen elevane skal bruke i e-postoppgåva. Nemn at <em>Helsing</em> og <em>Venleg helsing</em> er vanlege avslutningar på nynorsk. Eit tydeleg forslag gjer det lettare for mottakaren å svare ja.",
    },
    {
      type: "sporsmal",
      question: "Kva er den beste opninga på ein høfleg e-post på nynorsk?",
      options: [
        "«Hei du, jeg lurer på …»",
        "«Hei, eg lurer på …»",
        "«Hey, eg lurer på …»",
        "«Hallo der, jeg har ein spørsmål …»",
      ],
      correct: 1,
      explain: "Berre B er både høfleg og nynorsk. A og D blandar inn <em class=\"bm\">jeg</em>, C har ei engelsk helsing, og <em class=\"nn\">spørsmål</em> er inkjekjønn: <em class=\"nn\">eit spørsmål</em>.",
      notes: "D har to feil: <em>jeg</em> og <em>ein spørsmål</em>. Spør om nokon fann begge.",
    },
    {
      title: "Vi skriv om ein e-post",
      body: `<div class="boks"><p><em class="bm">hey, jeg var syk i går så eg fekk ikkje levert. kan jeg levere seinare??</em></p></div>`,
      steps: [
        "<p><em class=\"nn\">Hei, Kari</em></p>",
        "<p><em class=\"nn\">Eg var sjuk i går, og derfor fekk eg ikkje levert innleveringa.</em></p>",
        "<p><em class=\"nn\">Kan eg få utsetjing til fredag?</em></p>",
        "<p><em class=\"nn\">Helsing Ola</em></p>",
      ],
      notes: "Les den dårlege e-posten høgt og la klassen seie kva som er gale: engelsk helsing, blanding av <em>jeg</em> og <em>eg</em>, bokmålsordet <em>syk</em>, små forbokstavar, to spørjeteikn og ingen avslutning. Skriv så om saman, éin del om gongen, og la elevane foreslå før du trykkjer. Legg merke til at vi òg gjer spørsmålet meir presist: ikkje berre «seinare», men ein konkret dato.",
    },
    {
      type: "sitat",
      kicker: "Dagboknotat",
      text: "<em class=\"nn\">I dag var ein merkeleg dag. Eg gledde meg til turen, men så byrja det å regne, og alle vart litt sure. Likevel hadde vi det moro då vi sat i hytta og laga middag saman.</em>",
      kjelde: "Døme på eit dagboknotat",
      notes: "Spør: kva skil dette frå meldinga og e-posten? Teksten er skriven til eleven sjølv, han fortel om noko som har skjedd, og kjenslene kjem fram: <em>gledde meg, sure, moro</em>. Legg merke til <em>då</em>: éin bestemt gong i fortida.",
    },
    {
      title: "Dagboka står i preteritum",
      steps: [
        "<p class=\"stor\">Verb: <em class=\"nn\">var, gledde, byrja, vart, hadde, sat, laga</em></p>",
        "<p class=\"stor\">Bindeord: <em class=\"nn\">men, så, og, likevel</em></p>",
        "<p class=\"stor\">Overgangar: <em class=\"nn\">først, så, etterpå, til slutt</em></p>",
      ],
      notes: "Be klassen finne verba i preteritum i teksten før du viser første steg. <em>byrja</em> og <em>laga</em> er a-verb, <em>sat</em> er sterkt. Bindeorda er det som gjer teksten flytande. Skriv overgangsorda på tavla: elevane skal bruke dei i dagbokoppgåva.",
    },
    {
      type: "drill",
      title: "Preteritum til dagboka",
      intro: "Klassen seier preteritum før du viser svaret.",
      spec: { bank: "verbs", tasks: ["pret"], mode: "choice" },
      n: 5,
      notes: "Oppgåvene blir trekte tilfeldig frå ordbanken, både sterke og svake verb. Be elevane seie om verbet er sterkt eller svakt før dei svarer.",
    },
    {
      title: "Ver konsekvent",
      steps: [
        "<p class=\"stor\">Ikkje bland <em class=\"bm\">jeg</em> og <em class=\"nn\">eg</em>.</p>",
        "<p class=\"stor\">Vel <em class=\"nn\">vart</em> eller <em class=\"nn\">blei</em>, og hald deg til det.</p>",
        "<p class=\"stor\">Vel <em class=\"nn\">vi</em> eller <em class=\"nn\">me</em>, og hald deg til det.</p>",
      ],
      notes: "Nynorsk har nokre valfrie former. Både <em>vart</em> og <em>blei</em> er rette, men dei skal ikkje blandast i same tekst. Same med <em>vi</em> og <em>me</em>. Kurset brukar <em>vart</em> og <em>vi</em>. Ein tekst som blandar former, verkar uryddig sjølv om kvar form er rett.",
    },
    {
      type: "diskuter",
      title: "Same sak, tre tekstar",
      prompt: `<p>Du kjem ikkje på treninga i dag.</p>
        <p>Skriv éi setning til <strong>ein venn</strong>, éi til <strong>treneren</strong> og éi i <strong>dagboka</strong>.</p>`,
      form: "Skriv i par",
      tid: 4,
      notes: "La tre eller fire par lese opp. Spør klassen: kva gjorde at vi høyrde kven mottakaren var? Sjekk samtidig nynorsken i døma: <em>kjem</em>, <em>ikkje</em>, <em>i dag</em>. Setninga til dagboka kan gjerne handle om kvifor eleven ikkje kom og korleis det kjendest.",
    },
    {
      type: "oppgave",
      title: "Oppgåve 1: melding",
      form: "Åleine",
      body: `<ol>
          <li>Set om: <em class="bm">Hei! Kommer du hjem til meg i morgen? Jeg har lyst på pizza.</em></li>
          <li>Skriv ei melding til ein venn, 30 til 60 ord. Inviter han eller henne på noko i helga.</li>
        </ol>
        <p class="boks">Hugs <em class="nn">eg, kjem, heim, i morgon</em>. Hels og avslutt naturleg.</p>`,
      tid: 5,
      svar: "<em class=\"nn\">Hei! Kjem du heim til meg i morgon? Eg har lyst på pizza.</em>",
      notes: "Vis fasiten på omsetjinga før elevane skriv si eiga melding, så dei har rette former å byggje på. Meldinga skal vere uformell i tonen, men orda skal vere nynorske. Gå rundt og sjekk <em>eg</em> og <em>kjem</em>: det er dei bokmålsorda som oftast blir ståande.",
    },
    {
      type: "oppgave",
      title: "Oppgåve 2: e-post til læraren",
      form: "Åleine",
      body: `<p>Be om utsetjing på ei innlevering. 60 til 120 ord.</p>
        <ol>
          <li><strong>Opning</strong> med namn</li>
          <li><strong>Grunn:</strong> kva har skjedd?</li>
          <li><strong>Spørsmål</strong> og <strong>forslag</strong> til ny dato</li>
          <li><strong>Helsing</strong> og namnet ditt</li>
        </ol>`,
      tid: 6,
      notes: "Dette er malen frå lysbilete 8, samla i fire punkt. Gå rundt og spør: er e-posten høfleg nok? Har du med ein konkret dato? Minn om at det er lov å vere kort: e-posten på lysbilete 7 er tre linjer.",
    },
    {
      type: "oppgave",
      title: "Oppgåve 3: dagboknotat",
      form: "Åleine",
      body: `<p>Skriv om ein dag du hugsar godt. 80 til 150 ord.</p>
        <ol>
          <li>Bruk minst <strong>fem ulike verb</strong> i preteritum.</li>
          <li>Skriv om <strong>kjenslene</strong> dine.</li>
          <li>Bind saman: <em class="nn">først, så, etterpå, til slutt</em></li>
          <li>Les korrektur: småord, verb, substantiv.</li>
        </ol>`,
      tid: 6,
      notes: "Be elevane understreke verba i preteritum når dei er ferdige, og telje dei. Dei som blir tidleg ferdige, kan byte skrivebok med sidemannen og lese korrektur med dei tre stega frå omsetjinga. Elevmodulen har dei same tre skriveoppgåvene med sjekklister og passar til reinskriving heime.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\">Tenk på <strong>mottakaren</strong> før du skriv.</p>",
        "<p class=\"stor\">E-post: opning, sak, spørsmål, helsing.</p>",
        "<p class=\"stor\">Dagbok: preteritum og kjensler.</p>",
        "<p class=\"stor\">Kort tekst, men <strong>konsekvent</strong> nynorsk.</p>",
      ],
      notes: "Avslutt med å spørje: kva sjanger var lettast å skrive på nynorsk, og kvifor? Mange seier meldinga, fordi ho liknar mest på talemålet.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen handlar om korte kvardagstekstar: melding, e-post og dagboknotat. Elevane lærer å tilpasse språket til mottakar og formål, å byggje opp ein høfleg e-post og å skrive eit dagboknotat i preteritum. Presentasjonen modellerer korleis ein dårleg e-post kan skrivast om, og legg vekt på at sjølv korte tekstar skal vere konsekvente.</p>",
    mal: [
      "Elevane kan tilpasse språk og tone til mottakar og formål.",
      "Elevane kan skrive ein høfleg e-post med opning, sak, spørsmål og helsing.",
      "Elevane kan skrive eit dagboknotat med verb i preteritum og bindeord.",
      "Elevane kan skrive konsekvent nynorsk og velje éi form når det finst fleire.",
    ],
    lareplan: [10, 11, 13],
    forkunnskapar: "Elevane bør ha gjort Frå bokmål til nynorsk: strategiar, så dei kjenner dei tre tankestega. Det er ein fordel om dei har øvd på verb i preteritum.",
    forebuing: [
      "Test presentasjonen på tavla, særleg tavleøvinga på lysbilete 13.",
      "Tenk ut namn til e-postdømet på lysbilete 10, gjerne ditt eige.",
      "Sjå til at elevane har skrivebok. Vil du samle inn tekstane, kan dei skrive på ark.",
    ],
    okt: [
      { fase: "Oppstart", min: 4, gjer: "<p>Gå gjennom måla og la elevane samanlikne ei melding til ein venn og til læraren.</p>", lysbilete: "2 og 3" },
      { fase: "Melding og e-post", min: 10, gjer: "<p>Innfør mottakar og formål, les meldinga og e-posten, ta spørsmåla og skriv om den dårlege e-posten saman.</p>", lysbilete: "4 til 10" },
      { fase: "Dagbok", min: 5, gjer: "<p>Les dagboknotatet, finn verb i preteritum og bindeord, og køyr ein tavlerunde.</p>", lysbilete: "11 til 13" },
      { fase: "Konsekvent og samtale", min: 6, gjer: "<p>Snakk om valfrie former, og la para skrive same bodskap til tre mottakarar.</p>", lysbilete: "14 og 15" },
      { fase: "Eigenarbeid", min: 17, gjer: "<p>Elevane skriv dei tre tekstane i skriveboka etter oppgåvene og sjekkpunkta på tavla. Vis fasiten på omsetjinga i oppgåve 1 før dei skriv meldinga.</p>", lysbilete: "16 til 18" },
      { fase: "Avslutning", min: 3, gjer: "<p>Oppsummer og spør kva sjanger som var lettast å skrive på nynorsk.</p>", lysbilete: "19" },
    ],
    misoppfatningar: [
      { feil: "«Ei melding treng ikkje vere på nynorsk, for det er berre ei melding.»", hjelp: "I oppgåva er poenget å øve nynorsk i ein kvardagssjanger. Meldinga får vere uformell i tonen, men orda skal vere nynorske: <em class=\"nn\">eg, kjem, heim</em>." },
      { feil: "«Høfleg betyr lang og stiv.»", hjelp: "Vis e-posten på lysbilete 7: han er tre linjer og likevel høfleg. Å vere høfleg handlar om opning, tydeleg ærend og helsing, ikkje om lengd." },
      { feil: "«Eg kan skrive både vart og blei i same tekst, for begge er rette.»", hjelp: "Begge formene er rette, men ein tekst skal vere konsekvent. Vel éi form og hald deg til henne." },
      { feil: "«Dagboka skal stå i presens fordi det er i dag.»", hjelp: "Eit dagboknotat fortel om noko som alt har skjedd, derfor står det mest i preteritum: <em class=\"nn\">i dag var, eg gjekk, vi åt</em>." },
    ],
    samtale: [
      "Kva gjer at vi høyrer kven mottakaren er, sjølv om vi ikkje ser namnet?",
      "Når er det greitt å bruke smilefjes, og når er det ikkje?",
      "Kvifor er det viktig å foreslå ein ny dato når du ber om utsetjing?",
      "Korleis skil ei melding på nynorsk seg frå måten du snakkar på?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane malen for e-posten (opning, grunn, spørsmål, forslag, helsing) som stillas.",
        "La elevane starte dagboknotatet med ei gitt setning, til dømes <em class=\"nn\">I dag var ein spesiell dag.</em>",
        "Gi ei liste med ti vanlege verb i preteritum: <em class=\"nn\">gjekk, såg, åt, kom, var, fekk, sa, tok, vart, hadde</em>.",
      ],
      utfordring: [
        "Be elevane skrive same dagboknotat som ei melding til ein venn og forklare kva dei endra.",
        "La elevane skrive ein e-post til rektor der dei foreslår ei endring på skulen, med grunngiving.",
      ],
    },
    vurdering: [
      "Samtalen i par viser om elevane høyrer skilnaden på uformell og formell tone.",
      "Dei tre tekstane i skriveboka viser om eleven kan tilpasse språket og skrive konsekvent nynorsk.",
      "Kjenneteikn på låg måloppnåing: eleven skriv teksten, men tonen passar dårleg til mottakaren, og bokmålsord blir ståande.",
      "Kjenneteikn på middels måloppnåing: eleven tilpassar tonen og har dei viktigaste delane i e-posten, men har nokre feil i verb og småord.",
      "Kjenneteikn på høg måloppnåing: eleven tilpassar tone og innhald tydeleg til mottakaren, skriv konsekvent nynorsk og brukar preteritum og bindeord variert i dagboknotatet.",
    ],
    vidare: "Elevmodulen har dei same skriveoppgåvene med sjekklister og språksjekk, og han passar til reinskriving eller som frivillig lekse. Neste skrivemodul er Lengre tekstar: fortelje og argumentere. Til korrektur av tekstane passar Rettelesing: finn og rett feila i Del 4.",
  },
});

Larar.register("skriving-lengre-tekstar", {
  tittelnotat: "Lengre tekstar krev planlegging. I dag lærer elevane to oppskrifter: éi for å fortelje og éi for å argumentere. Vi les modelltekstar del for del, så elevane ser korleis oppskrifta blir til ein ekte tekst. Sei gjerne at dette er dei same sjangrane dei møter på eksamen.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>byggje opp ei <strong>forteljing</strong> i fem steg</li>
        <li>bruke <strong>verkemiddel</strong> som skildring og replikkar</li>
        <li>byggje opp ein <strong>argumenterande tekst</strong></li>
        <li>binde teksten saman med <strong>bindeord</strong></li>
      </ul>`,
      notes: "Gå raskt gjennom måla. Fortel at første halvdel handlar om å fortelje og andre halvdel om å argumentere. Elevane skal skrive ei forteljing i skriveboka i første økt og ein argumenterande tekst i andre.",
    },
    {
      type: "diskuter",
      title: "Kva får deg til å lese vidare?",
      prompt: `<p>Tenk på ei bok, ein film eller ein serie du likte.</p>
        <p>Kva i starten gjorde at du ville vite meir?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      notes: "Samle stikkord på tavla: noko rart skjer, ein spennande person, eit spørsmål som ikkje blir svart på. Dette er det vi kallar eit anslag. Ta vare på lista til modellteksten.",
    },
    {
      title: "Forteljinga i fem steg",
      steps: [
        "<p class=\"stor\">1. <strong>Anslag:</strong> dreg lesaren inn</p>",
        "<p class=\"stor\">2. <strong>Presentasjon:</strong> kven, kvar og når</p>",
        "<p class=\"stor\">3. <strong>Stigning:</strong> spenninga aukar</p>",
        "<p class=\"stor\">4. <strong>Klimaks:</strong> vendepunktet</p>",
        "<p class=\"stor\">5. <strong>Avrunding:</strong> kva sit lesaren att med?</p>",
      ],
      notes: "Teikn gjerne ei spenningskurve på tavla medan du viser stega: ho stig fram til klimaks og fell i avrundinga. Mange elevar brukar for mykje plass på presentasjonen og for lite på stigninga. Ein god tommelfingerregel er at stigninga skal vere den lengste delen.",
    },
    {
      title: "Modelltekst del for del",
      steps: [
        "<p><strong>Anslag</strong><br><em class=\"nn\">Eg skulle aldri ha sagt ja til den turen.</em></p>",
        "<p><strong>Presentasjon</strong><br><em class=\"nn\">Det var laurdag morgon i september, og Siri og eg skulle gå opp til hytta til bestefar. Sola skein, og sekken var full av matpakker.</em></p>",
        "<p><strong>Stigning</strong><br><em class=\"nn\">Etter ein time kom tåka sigande. Stien forsvann. «Veit du kvar vi er?» spurde Siri. Eg svarte ikkje.</em></p>",
      ],
      notes: "Vis éin del om gongen og spør kva delen gjer. Anslaget er éi setning som vekkjer eit spørsmål: kva skjedde på turen? Presentasjonen svarer på kven, kvar og når. I stigninga blir setningane kortare, og det gjer at tempoet aukar. Legg merke til at eg-personen ikkje svarer: det seier meir om kjensla enn om han hadde sagt «eg er redd».",
    },
    {
      title: "Modelltekst del for del",
      kicker: "Vidare",
      steps: [
        "<p><strong>Klimaks</strong><br><em class=\"nn\">Då såg vi eit lys mellom trea. Bestefar stod på tunet med ei lykt og vinka.</em></p>",
        "<p><strong>Avrunding</strong><br><em class=\"nn\">Om kvelden sat vi framfor peisen og åt vaflar. Siri sa at det var den beste turen ho hadde vore på. Eg er ikkje så sikker. Men no ligg det alltid eit kart i sekken min.</em></p>",
      ],
      notes: "Klimaks er vendepunktet: frå fare til tryggleik. Avrundinga knyter seg til anslaget: no forstår lesaren kvifor eg-personen ikkje skulle ha sagt ja, og kartet i sekken viser kva han lærte. Peik på nynorsken: sterke verb i preteritum som <em>skein, forsvann, stod, sat, åt</em>.",
    },
    {
      type: "sporsmal",
      question: "Kva er det beste anslaget?",
      options: [
        "<em class=\"nn\">Dette er ei forteljing om ein tur.</em>",
        "<em class=\"nn\">Eg skulle aldri ha sagt ja til den turen.</em>",
        "<em class=\"nn\">Ein dag i september gjekk eg på tur. Det var fint vêr.</em>",
      ],
      correct: 1,
      explain: "B vekkjer eit spørsmål hos lesaren: kva gjekk gale? A fortel berre kva teksten handlar om, og C er ein presentasjon, ikkje eit anslag.",
      notes: "Be elevane grunngi svaret. Mange vel C fordi det er slik dei sjølve pleier å byrje. Spør: kva med C får deg til å lese vidare? Svaret er som regel: ingenting.",
    },
    {
      title: "Verkemiddel",
      steps: [
        "<p class=\"stor\"><strong>Skildring:</strong> kva ser, høyrer og kjenner du?</p>",
        "<p class=\"stor\"><strong>Replikkar:</strong> det personane seier</p>",
        "<p class=\"stor\"><strong>Variasjon</strong> i setningslengd</p>",
        "<p class=\"stor\"><strong>Indre tankar</strong> hos hovudpersonen</p>",
      ],
      notes: "Gå tilbake til modellteksten og finn døme på kvart verkemiddel: tåka og lyset er skildring, spørsmålet til Siri er ein replikk, dei korte setningane i stigninga er variasjon, og <em>Eg er ikkje så sikker</em> er ein indre tanke.",
    },
    {
      title: "Replikkar",
      body: `<p class="stor"><em class="nn">«Eg veit ikkje», sa han.</em></p>
        <p class="stor"><em class="nn">«Veit du kvar vi er?» spurde Siri.</em></p>`,
      steps: [
        "<p>Komma <strong>etter</strong> hermeteiknet når replikken er ei vanleg setning.</p>",
        "<p>Spørjeteikn og utropsteikn står <strong>inne i</strong> hermeteiknet.</p>",
        "<p>Ny talar gir <strong>nytt avsnitt</strong>.</p>",
      ],
      notes: "Teiknsetjinga i replikkar er eit område der mange elevar gjer feil. Kurset brukar hermeteikn i døma, men replikkstrek er òg rett, så lenge eleven vel éin måte og held seg til han gjennom heile teksten. Nemn òg at det er lurt å variere verba: <em>sa, spurde, svarte, ropte, kviskra</em>.",
    },
    {
      title: "Vis, ikkje fortel",
      body: `<p class="stor"><em class="nn">Det var skummelt i skogen.</em></p>`,
      steps: [
        "<p class=\"stor\"><em class=\"nn\">Greinene knaka.</em></p>",
        "<p class=\"stor\"><em class=\"nn\">Eg høyrde mitt eige hjarte slå.</em></p>",
        "<p class=\"stor\"><em class=\"nn\">Eg snudde meg. Ingen der.</em></p>",
      ],
      notes: "Modeller korleis ei flat setning kan skrivast om med skildring og sansar. Tenk høgt: «Kva høyrer eg når det er skummelt? Kva kjenner eg i kroppen?» Legg merke til at den siste setninga manglar verbal. Det er eit bevisst verkemiddel i forteljingar, men elevane bør vite at dei bryt ein regel med vilje.",
    },
    {
      type: "diskuter",
      title: "Vis, ikkje fortel",
      prompt: `<p>Skriv om setninga slik at lesaren <strong>ser</strong> det:</p>
        <p class="stor"><em class="nn">Eg var nervøs før kampen.</em></p>`,
      form: "Skriv i par",
      tid: 3,
      notes: "La tre par lese opp. Ros bruk av sansar og kroppsreaksjonar, til dømes <em>hendene skalv</em> eller <em>magen vreid seg</em>. Sjekk nynorsken samtidig: <em>skalv</em> er preteritum av <em>skjelve</em>.",
    },
    {
      type: "oppgave",
      title: "Skriv ei forteljing",
      form: "Åleine",
      body: `<p class="stor"><strong>Ein dag som ikkje gjekk som planlagt</strong></p>
        <ol>
          <li>Planlegg dei fem stega i margen.</li>
          <li>Skriv 200 til 400 ord.</li>
          <li>Ta med minst éin <strong>replikk</strong> og noko du <strong>viser</strong>, ikkje fortel.</li>
          <li>Les korrektur: småord, verb, substantiv.</li>
        </ol>`,
      tid: 22,
      notes: "Elevane skriv for hand i skriveboka. Gå rundt og spør om planen: kva er anslaget ditt? Kvar er klimaks? Elevar som står fast, kan starte med å teikne spenningskurva og skrive eitt stikkord ved kvart steg. Minn om at stigninga skal vere den lengste delen. Dei som ikkje blir ferdige, skriv ferdig heime. Elevmodulen har same oppgåve med sjekkliste og språksjekk, og han kan brukast til reinskriving.",
    },
    {
      type: "oppgave",
      kicker: "Ferdig med forteljinga?",
      title: "Skriv ei skildring",
      form: "Åleine",
      body: `<p class="stor"><strong>Ein stad du kjenner godt</strong></p>
        <ol>
          <li>Skriv 100 til 200 ord.</li>
          <li>Bruk alle fem sansane: syn, høyrsel, lukt, smak og kjensle.</li>
          <li>Bruk minst seks adjektiv i rett form.</li>
        </ol>`,
      tid: 10,
      notes: "Dette er ei ekstraoppgåve for dei som blir tidleg ferdige, eller ei kortare oppgåve for elevar som treng det i staden for forteljinga. Be elevane understreke adjektiva og sjekke samsvaret: <em>ein kald vind, ei kald hand, eit kaldt rom, kalde steinar</em>.",
    },
    {
      title: "Argumenterande tekst",
      steps: [
        "<p class=\"stor\">1. <strong>Innleiing:</strong> tema og standpunkt</p>",
        "<p class=\"stor\">2. <strong>Hovuddel:</strong> to til tre argument med døme</p>",
        "<p class=\"stor\">3. <strong>Motargument:</strong> vis det andre synet, og svar på det</p>",
        "<p class=\"stor\">4. <strong>Avslutning:</strong> oppsummer og konkluder</p>",
      ],
      notes: "No skifter vi sjanger. Samanlikn med forteljinga: her er målet å overtyde, ikkje å underhalde. Standpunktet skal kome allereie i innleiinga, så lesaren veit kva teksten vil. Eitt argument per avsnitt er ein god regel for ungdomsskulen.",
    },
    {
      title: "Tre appellformer",
      body: `<div class="tre-kol">
          <div class="boks"><h3>Logos</h3><p>fakta og fornuft</p></div>
          <div class="boks"><h3>Etos</h3><p>truverd</p></div>
          <div class="boks"><h3>Patos</h3><p>kjensler</p></div>
        </div>`,
      steps: [
        "<p><strong>Logos:</strong> <em class=\"nn\">Når timane byrjar seinare, får elevane meir søvn.</em></p>",
        "<p><strong>Etos:</strong> <em class=\"nn\">Eg har vore tillitselev i tre år og snakka med mange elevar om dette.</em></p>",
        "<p><strong>Patos:</strong> <em class=\"nn\">Tenk deg å sitje i første time og kjempe for å halde auga opne.</em></p>",
      ],
      notes: "Alle døma argumenterer for same sak: at skulen bør starte seinare. Poenget er at dei tre appellformene overtyder på ulike måtar. Ein god tekst brukar gjerne alle tre, men logos bør bere hovudtyngda i ein sakleg tekst. Etos handlar òg om korleis du skriv: ein ryddig tekst med korrekt nynorsk gir truverd.",
    },
    {
      type: "sporsmal",
      question: "Kva appellform er dette? <em class=\"nn\">«Eg har vore trenar for yngre lag i to år, så eg veit kva som skal til.»</em>",
      options: ["Logos", "Etos", "Patos"],
      correct: 1,
      explain: "Skribenten viser til eigen erfaring for å verke truverdig. Det er etos.",
      notes: "Følg opp med å be elevane lage ei patos-setning om same tema. Kva kjensle vil dei vekkje?",
    },
    {
      type: "sitat",
      kicker: "Modellavsnitt",
      text: "<em class=\"nn\">Eg meiner at skulen bør starte klokka ni. For det første treng ungdom meir søvn enn vaksne. Når timane byrjar seinare, kan elevane konsentrere seg betre. Nokon vil kanskje seie at skuledagen då blir for lang. Det er rett at vi må vere lenger på skulen, men det er betre med ein lang dag der vi lærer noko, enn ein kort dag der vi søv i timane.</em>",
      kjelde: "Modelltekst til argumenterande skriving",
      notes: "Les avsnittet høgt og be elevane finne standpunktet, argumentet og motargumentet. Standpunktet står først. <em>For det første</em> signaliserer at fleire argument kjem. <em>Nokon vil kanskje seie</em> innleier motargumentet, og <em>Det er rett at …, men</em> svarer på det. Merk at <em>søv</em> er presens av <em>sove</em>.",
    },
    {
      type: "oppgave",
      title: "Forklar omgrepa",
      form: "Åleine",
      body: `<p class="stor midt"><strong>anslag · klimaks · logos · etos · patos</strong></p>
        <ol>
          <li>Forklar kvart omgrep med éi setning.</li>
          <li>Kvifor bør ein argumenterande tekst ha eit motargument?</li>
        </ol>`,
      tid: 4,
      svar: `<p><strong>Anslag:</strong> opninga som fangar lesaren. <strong>Klimaks:</strong> vendepunktet i forteljinga. <strong>Logos:</strong> argument som byggjer på fakta og fornuft. <strong>Etos:</strong> argument som byggjer truverd. <strong>Patos:</strong> argument som vekkjer kjensler.</p>
        <p>Motargumentet viser at du forstår det andre synet og kan svare på det. Det gjer standpunktet ditt sterkare.</p>`,
      notes: "Ei kort oppsummering av omgrepa frå begge øktene før elevane skal skrive sjølve. Godta forklaringar med eigne ord. Mange blandar etos og logos: spør om argumentet handlar om saka eller om den som skriv. Til spørsmål 2 er det eit vanleg feilsvar at motargumentet gjer teksten lengre.",
    },
    {
      title: "Tekstbinding",
      steps: [
        "<p class=\"stor\">Rekkjefølgje: <em class=\"nn\">for det første, dessutan, til slutt</em></p>",
        "<p class=\"stor\">Motsetnad: <em class=\"nn\">men, likevel, derimot</em></p>",
        "<p class=\"stor\">Årsak: <em class=\"nn\">fordi, derfor, difor</em></p>",
        "<p class=\"stor\">Motargument: <em class=\"nn\">Nokon vil kanskje seie at …</em></p>",
      ],
      notes: "Bindeorda viser lesaren korleis tankane heng saman. Både <em>derfor</em> og <em>difor</em> er rette på nynorsk; vel éi form. Minn om V2: etter eit innleiande bindeord som <em>dessutan</em> eller <em>likevel</em> kjem verbalet på andreplass. <em>Dessutan er det billegare</em>, ikkje <em>Dessutan det er billegare</em>.",
    },
    {
      type: "diskuter",
      title: "Planlegg argumentasjonen",
      prompt: `<p class="stor">Bør sidemålskarakteren behaldast i ungdomsskulen?</p>
        <p>Finn <strong>eitt argument for</strong> og <strong>eitt argument mot</strong>.</p>`,
      form: "Snakk i grupper på tre",
      tid: 4,
      notes: "Dette er temaet i skriveoppgåva på lysbilete 22, så samtalen er ein planleggingsfase. Skriv argumenta på tavla i to kolonnar. Minn elevane om at dei treng begge sider: sitt eige standpunkt og eit motargument dei kan svare på. Ver nøytral sjølv: elevane skal få vurdere saka på eiga hand.",
    },
    {
      title: "Før du leverer",
      steps: [
        "<p class=\"stor\">Har teksten ein tydeleg <strong>struktur</strong>?</p>",
        "<p class=\"stor\">Heng avsnitta saman med <strong>bindeord</strong>?</p>",
        "<p class=\"stor\">Er <strong>teiknsetjinga</strong> rett, også i replikkar?</p>",
        "<p class=\"stor\">Er nynorsken <strong>konsekvent</strong>? Småord, verb, substantiv.</p>",
      ],
      notes: "Dette er ei sjekkliste elevane kan bruke på begge tekstane. Det siste punktet er dei tre korrekturrundane frå omsetjingsmodulen. Be elevane lese teksten høgt for seg sjølve: det avslører både manglande bindeord og tunge setningar.",
    },
    {
      type: "oppgave",
      title: "Skriv ein argumenterande tekst",
      form: "Åleine",
      body: `<p class="stor"><strong>Bør sidemålskarakteren behaldast i ungdomsskulen?</strong></p>
        <ol>
          <li>Innleiing med tema og tydeleg <strong>standpunkt</strong>.</li>
          <li>Minst to <strong>argument</strong> med døme, eitt per avsnitt.</li>
          <li>Eitt <strong>motargument</strong> som du svarer på.</li>
          <li><strong>Avslutning</strong> som oppsummerer. 200 til 400 ord.</li>
        </ol>`,
      tid: 19,
      notes: "Elevane skriv for hand i skriveboka og brukar argumenta frå gruppesamtalen. Gå rundt og spør: kva er standpunktet ditt? Kva motargument har du valt, og korleis svarer du på det? Elevar som står fast, kan skrive eitt argument for og eitt mot i to kolonnar før dei byrjar. Minn om sjekklista på lysbilete 21 og om å tenkje på logos, etos og patos. Det som ikkje blir ferdig, skriv elevane heime. Elevmodulen har same oppgåve med sjekkliste og språksjekk, og han kan brukast til reinskriving.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\">Forteljing: anslag, presentasjon, stigning, klimaks, avrunding.</p>",
        "<p class=\"stor\">Vis, ikkje fortel: bruk sansane.</p>",
        "<p class=\"stor\">Argumentasjon: standpunkt, argument, motargument, konklusjon.</p>",
        "<p class=\"stor\">Bind teksten saman med bindeord.</p>",
      ],
      notes: "Be elevane skrive ned det dei vil bli betre på i neste tekst, til dømes anslaget eller motargumentet. Bruk lappane når du gir tilbakemelding på tekstane.",
    },
  ],
  guide: {
    tid: "To økter på 45 minutt",
    intro: "<p>Modulen handlar om to sentrale skrivesjangrar: den forteljande og den argumenterande teksten. Elevane lærer ein struktur for kvar sjanger, verkemiddel som skildring og replikkar, dei tre appellformene og korleis bindeord bind teksten saman. Presentasjonen viser ein modelltekst del for del, modellerer korleis ei flat setning kan skrivast om, og analyserer eit argumenterande modellavsnitt. Skrivinga er lang, så modulen passar best over to økter.</p>",
    mal: [
      "Elevane kan byggje opp ei forteljing med anslag, presentasjon, stigning, klimaks og avrunding.",
      "Elevane kan bruke skildring, replikkar og variasjon i setningslengd, med rett teiknsetjing.",
      "Elevane kan byggje opp ein argumenterande tekst med standpunkt, argument, motargument og konklusjon.",
      "Elevane kan kjenne att og bruke logos, etos og patos.",
      "Elevane kan binde teksten saman med bindeord og skrive konsekvent nynorsk.",
    ],
    lareplan: [10, 11, 13, 12, 6, 9],
    forkunnskapar: "Elevane bør kunne dei tre tankestega frå Frå bokmål til nynorsk: strategiar og ha skrive korte tekstar på nynorsk. Det er ein fordel om dei kjenner V2-regelen frå Setningar og setningsledd.",
    forebuing: [
      "Test presentasjonen på tavla, særleg lysbileta med steg (5, 6 og 10).",
      "Bestem om elevane skal skrive begge dei lange tekstane, eller velje éin. Elevane skriv for hand i skriveboka eller på ark om du vil samle inn tekstane.",
      "Ha tavleplass klar til spenningskurva og argumenta for og mot.",
    ],
    okt: [
      { fase: "Økt 1: oppstart", min: 4, gjer: "<p>Gå gjennom måla og snakk om kva som får elevane til å lese vidare.</p>", lysbilete: "2 og 3" },
      { fase: "Økt 1: forteljing", min: 9, gjer: "<p>Innfør dei fem stega, les modellteksten del for del og ta spørsmålet om anslag.</p>", lysbilete: "4 til 7" },
      { fase: "Økt 1: verkemiddel", min: 10, gjer: "<p>Gå gjennom verkemiddel og replikkar, modeller «vis, ikkje fortel» og la para prøve sjølve.</p>", lysbilete: "8 til 11" },
      { fase: "Økt 1: skriving", min: 22, gjer: "<p>Elevane skriv forteljinga for hand i skriveboka. Dei som blir tidleg ferdige, eller som treng ei kortare oppgåve, skriv skildringa.</p>", lysbilete: "12 og 13" },
      { fase: "Økt 2: argumentasjon", min: 14, gjer: "<p>Innfør strukturen og appellformene, ta spørsmålet og analyser modellavsnittet saman. Elevane forklarer omgrepa frå begge øktene i skriveboka.</p>", lysbilete: "14 til 18" },
      { fase: "Økt 2: tekstbinding og planlegging", min: 9, gjer: "<p>Gå gjennom bindeorda, la gruppene finne argument for og mot, og vis sjekklista.</p>", lysbilete: "19 til 21" },
      { fase: "Økt 2: skriving", min: 19, gjer: "<p>Elevane skriv den argumenterande teksten i skriveboka og les korrektur med sjekklista.</p>", lysbilete: "22" },
      { fase: "Avslutning", min: 3, gjer: "<p>Oppsummer og lat elevane skrive ned kva dei vil bli betre på.</p>", lysbilete: "23" },
    ],
    misoppfatningar: [
      { feil: "«Ei forteljing byrjar med kven, kvar og når.»", hjelp: "Det er presentasjonen. Eit godt anslag kjem før og vekkjer eit spørsmål. Samanlikn dei tre alternativa på lysbilete 7." },
      { feil: "«Motargument svekkjer teksten min.»", hjelp: "Eit motargument som du svarer på, viser at du har tenkt grundig, og gjer teksten meir truverdig. Det er etos." },
      { feil: "«Patos er det sterkaste argumentet.»", hjelp: "Kjensler kan overtyde, men i ein sakleg tekst bør logos bere hovudtyngda. For mykje patos kan verke manipulerande." },
      { feil: "«Dessutan det er billegare.»", hjelp: "Eit innleiande bindeord tek første plass, så verbalet må kome rett etter: <em class=\"nn\">Dessutan er det billegare.</em>" },
      { feil: "«Replikkar treng ikkje teiknsetjing.»", hjelp: "Vis dei to døma på lysbilete 9: komma etter hermeteiknet, spørjeteikn inne i det, og nytt avsnitt ved ny talar." },
    ],
    samtale: [
      "Kvifor er stigninga ofte den lengste delen av ei forteljing?",
      "Kva er skilnaden på å fortelje at nokon er redd og å vise det?",
      "Når kan det vere lurt å bruke patos, og når bør du vere forsiktig?",
      "Kvifor blir ein argumenterande tekst sterkare med eit motargument?",
      "Kva skil ein forteljande tekst frå ein argumenterande når det gjeld formål og mottakar?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane ein skriveramme med dei fem stega eller dei fire delane, og éi startsetning til kvar del.",
        "La elevane lage tankekart før dei skriv, og få det godkjent av læraren.",
        "Senk kravet til lengd og legg vekt på struktur og korrekt nynorsk.",
      ],
      utfordring: [
        "Be elevane skrive forteljinga med eit tidshopp eller med open slutt, og grunngi valet.",
        "La elevane bruke alle tre appellformene og markere dei med ulike fargar i teksten.",
        "Be elevane skrive eit lesarinnlegg med same tema som den argumenterande teksten, men til ei avis.",
      ],
    },
    vurdering: [
      "Spørsmåla, parøvinga og omgrepsoppgåva på lysbilete 18 viser om elevane kjenner att strukturen og verkemidla.",
      "Dei to lange tekstane er grunnlaget for vurderinga. Vurder struktur, verkemiddel, tekstbinding og nynorsk kvar for seg.",
      "Kjenneteikn på låg måloppnåing: teksten har ein enkel struktur, men delane er lite utvikla, bindeord manglar og det er mange bokmålsformer.",
      "Kjenneteikn på middels måloppnåing: teksten følgjer strukturen, har nokre verkemiddel eller argument med døme, og nynorsken er stort sett korrekt.",
      "Kjenneteikn på høg måloppnåing: teksten har eit fengande anslag eller tydeleg standpunkt, verkemiddel eller appellformer blir brukte medvite, motargumentet blir svart på, tekstbindinga er variert og nynorsken er konsekvent og korrekt.",
    ],
    vidare: "Som frivillig lekse kan elevane reinskrive tekstane sine i elevmodulen, som har språksjekk. Følg opp med Rettelesing: finn og rett feila og Setningsbygnad og stil i Del 4. Lesemodulane i Del 5 gir fleire modelltekstar å samanlikne med.",
  },
});
