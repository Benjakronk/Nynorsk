/* Del 1 — Språkhistorie og debatt */

Modules.register({
  id: "historie-bakgrunn",
  part: 1,
  title: "Norsk språk før 1850",
  summary: "Kvifor skreiv folk i Noreg på dansk, og kva slags språk snakka dei?",
  estimatedMinutes: 20,
  sections: [
    {
      type: "lesson",
      title: "Frå 1380 til 1814 — eit dansk skriftspråk",
      content: `
        <p>I 1380 gjekk Noreg i union med Danmark. Unionen varte i over 400 år, heilt til 1814.
        I løpet av desse hundreåra forsvann det gamalnorske skriftspråket, og dansk vart det
        einaste skriftspråket i Noreg. Embetsmenn, prestar og forfattarar skreiv dansk, og det
        var dansk ein lærde i skulen.</p>

        <p>Men <em class="nn">talemålet</em> heldt fram med å vere norsk. Folk snakka dialektar
        som var heilt ulike dansk. Ein bonde på Vestlandet, ein fiskar i Nord-Noreg og ein
        handverkar på Austlandet snakka kvar sin variant av eit nedarva norsk talemål — sjølv
        om dei skreiv (om dei i det heile skreiv) på dansk.</p>

        <h3>Embetsmannsspråket</h3>
        <p>I byane voks det fram eit talemål blant embetsmenn og borgarskap som låg nærare
        dansk skrift. Mange uttala dansken med ein litt norsk tonefall, og slik oppstod det
        som ofte blir kalla <em class="nn">dansk-norsk</em> eller embetsmannsspråket.</p>

        <h3>1814 — ein ny situasjon</h3>
        <p>I 1814 vart Noreg løyst frå Danmark og gjekk inn i union med Sverige. Vi fekk eiga
        grunnlov og eige storting. Men skriftspråket var framleis dansk. Mange byrja å spørje:
        kan eit fritt land verkeleg ha eit anna lands språk som sitt einaste skriftspråk?</p>

        <div class="callout">
          <strong>Kort oppsummering:</strong> Fram til midten av 1800-talet var skriftspråket
          i Noreg dansk, sjølv om folk snakka norske dialektar. Etter 1814 byrja folk å
          tenkje på korleis Noreg kunne få sitt eige skriftspråk.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva skriftspråk brukte folk i Noreg på 1700-talet?",
      options: ["Gamalnorsk", "Dansk", "Svensk", "Ein tidleg variant av nynorsk"],
      correct: 1,
      explanation: "Under unionen med Danmark var dansk det einaste offisielle skriftspråket i Noreg.",
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kvifor vart språkspørsmålet viktig <em>etter</em> 1814?",
      options: [
        "Fordi dansk ikkje lenger fanst som språk.",
        "Fordi Noreg vart eit fritt land og mange meinte vi burde ha vårt eige skriftspråk.",
        "Fordi Sverige tvinga oss til å skrive svensk.",
        "Fordi Ivar Aasen alt hadde skrive ei ordbok.",
      ],
      correct: 1,
      explanation: "Med grunnlova i 1814 vart Noreg sjølvstendig på mange område, og det vart naturleg å spørje kvifor vi skulle halde fast på dansk skriftspråk.",
    },
    {
      type: "exercise",
      exerciseType: "matching",
      question: "Para saman omgrep og forklaring:",
      pairs: [
        ["Unionen med Danmark", "Varte frå 1380 til 1814"],
        ["Embetsmannsspråket", "Dansk skrift med norsk uttale"],
        ["Talemålet i Noreg", "Norske dialektar"],
        ["1814", "Året Noreg fekk eiga grunnlov"],
      ],
      explanation: "Skriftspråket var dansk, men talemålet i Noreg var heile tida norske dialektar.",
    },
    {
      type: "reading",
      title: "Les og tenk over",
      passage: `
        <p>Tenk deg at du lever i Noreg rundt 1830. Du veks opp i ei bygd der alle snakkar
        dialekta di. Når du byrjar på skulen, lærer du å lese og skrive på dansk. Læraren
        rettar deg når du skriv slik du snakkar.</p>
        <p>Mange tenkjarar på denne tida meinte at eit folk burde ha eit skriftspråk som
        spegla språket folk faktisk snakka. Andre meinte at dansk fungerte godt nok, og at
        det ville vere upraktisk å byte språk.</p>
      `,
      questions: [
        {
          type: "multipleChoice",
          question: "Kva er hovudtanken i teksten?",
          options: [
            "At dansk er eit dårleg språk.",
            "At det var skilnad mellom talemål og skriftspråk i Noreg på 1800-talet.",
            "At ingen kunne lese i Noreg på 1800-talet.",
            "At dialektar ikkje fanst på 1800-talet.",
          ],
          correct: 1,
        },
        {
          type: "freeShort",
          question: "Skriv kort kva argument du synest er sterkast: å halde på dansk eller å lage eit nytt norsk skriftspråk? Grunngi.",
          modelAnswer: "Ein god grunn for eit nytt skriftspråk er at det blir lettare å lære å lese og skrive når skriftspråket liknar på det ein snakkar. Ein grunn for å halde på dansk kan vere at alle bøker og lover alt var skrivne på dansk.",
        },
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Skriv ein kort refleksjon",
      question: "Skriv 80–150 ord der du forklarar med eigne ord kvifor språk vart eit viktig spørsmål i Noreg etter 1814.",
      minWords: 80,
      checklist: [
        "Nemn unionen med Danmark.",
        "Nemn skilnaden mellom skriftspråk og talemål.",
        "Skriv på nynorsk så godt du kan — bruk «ikkje», «eg», «kva», «frå».",
      ],
    },
  ],
});

Modules.register({
  id: "historie-aasen",
  part: 1,
  title: "Ivar Aasen og landsmålet",
  summary: "Mannen som bygde nynorsk frå norske dialektar.",
  estimatedMinutes: 25,
  sections: [
    {
      type: "lesson",
      title: "Ein språkmann frå Ørsta",
      content: `
        <p><strong>Ivar Aasen</strong> (1813–1896) voks opp på ein liten gard i Ørsta på
        Sunnmøre. Familien var fattig, og Ivar måtte tidleg ut og jobbe. Men han var
        usedvanleg lærenem og lærte seg språk på eiga hand — først dansk og latin, seinare
        tysk, engelsk, fransk og fleire.</p>

        <h3>Reisene 1842–1846</h3>
        <p>Med stipend frå Det Kongelige Norske Videnskabers Selskab reiste Aasen rundt i
        store delar av Noreg i fire år. Han lytta til dialektane, skreiv ned ord og
        bøyingar, og bygde seg eit detaljert bilete av norsk talemål.</p>

        <h3>Grammatikken og ordboka</h3>
        <p>Resultatet vart to banebrytande bøker:</p>
        <ul>
          <li><em class="nn">Det norske Folkesprogs Grammatik</em> (1848)</li>
          <li><em class="nn">Ordbog over det norske Folkesprog</em> (1850)</li>
        </ul>
        <p>I 1853 gav han ut <em class="nn">Prøver af Landsmaalet i Norge</em>, der han
        viste korleis eit nytt norsk skriftspråk kunne sjå ut. Han kalla det
        <strong>landsmål</strong> — språket for heile landet.</p>

        <h3>Korleis bygde han det opp?</h3>
        <p>Aasen ville ikkje berre velje éin dialekt og gjere han til skriftspråk. I staden
        prøvde han å finne dei eldre, fellesgjeldande formene som dei norske dialektane
        hadde til felles. Han vekta gjerne vestnorske og inste-bygdene sine former, fordi
        dei ofte stod nærare gamalnorsk.</p>

        <div class="callout">
          <strong>Hugs:</strong> Landsmålet vart seinare kalla <em class="nn">nynorsk</em>
          (frå 1929). Ordet «nynorsk» kan forvirre — det handlar ikkje om eit nytt språk,
          men om eit skriftspråk bygd på det levande norske talemålet.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "matching",
      question: "Para saman årstal og hending i Ivar Aasen sitt liv:",
      pairs: [
        ["1813", "Ivar Aasen blir fødd i Ørsta"],
        ["1842–1846", "Aasen reiser rundt og samlar dialektar"],
        ["1848", "Grammatikken blir gjeven ut"],
        ["1850", "Ordboka blir gjeven ut"],
        ["1853", "Aasen viser dømetekstar på landsmål"],
        ["1896", "Ivar Aasen døyr"],
      ],
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kvifor reiste Aasen rundt i Noreg i fire år?",
      options: [
        "For å selje bøker.",
        "For å samle dialektar og kartleggje norsk talemål.",
        "For å lære seg dansk betre.",
        "For å undervise i grammatikk.",
      ],
      correct: 1,
      explanation: "Aasen samla dialektmateriale som grunnlag for grammatikken og ordboka si.",
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Korleis bygde Aasen opp landsmålet?",
      options: [
        "Han valde dialekta i Oslo og brukte ho som skriftspråk.",
        "Han brukte dansk som grunnlag og tilpassa litt.",
        "Han søkte etter dei eldre fellesformene i dei norske dialektane.",
        "Han fann opp heilt nye ord som ingen hadde brukt før.",
      ],
      correct: 2,
      explanation: "Aasen ville finne det dialektane hadde til felles, og la særleg vekt på dei eldre formene som stod nær gamalnorsk.",
    },
    {
      type: "exercise",
      exerciseType: "categorize",
      question: "Kva høyrer til Ivar Aasen, og kva høyrer til andre/seinare tid?",
      categories: {
        "Ivar Aasen": [
          "Det norske Folkesprogs Grammatik (1848)",
          "Ordbog over det norske Folkesprog (1850)",
          "Reiser i Noreg 1842–1846",
          "Landsmålet",
        ],
        "Andre eller seinare": [
          "Bokmålet",
          "Samnorsk",
          "Rettskrivinga frå 2012",
          "Knud Knudsen sine reformer",
        ],
      },
      explanation: "Aasen står bak landsmålet og dei tidlege språkverka. Bokmål kjem frå Knud Knudsen sitt arbeid; samnorsk og nye reformer kom på 1900-talet.",
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Fyll ut med rett ord:",
      items: [
        { prompt: "Ivar Aasen vart fødd i ___ i 1813.", accept: ["Ørsta", "ørsta"] },
        { prompt: "Han kalla det nye skriftspråket ___.", accept: ["landsmål", "landsmålet"] },
        { prompt: "Grammatikken kom ut i året ___.", accept: ["1848"] },
        { prompt: "Frå 1929 vart språket kalla ___.", accept: ["nynorsk", "nynorsken"] },
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Reflekter",
      question: "Kvifor kan ein seie at det var viktig at Aasen lytta til folk i ulike delar av landet, og ikkje berre brukte si eiga dialekt? Skriv 60–120 ord på nynorsk.",
      minWords: 60,
      checklist: [
        "Tenk på kva som gjer eit skriftspråk «rettferdig» for ulike grupper.",
        "Bruk minst eitt eksempel.",
      ],
    },
  ],
});

Modules.register({
  id: "historie-striden",
  part: 1,
  title: "Språkstriden og samnorsk",
  summary: "To skriftspråk, mange reformer og ei lang strid.",
  estimatedMinutes: 25,
  sections: [
    {
      type: "lesson",
      title: "To liner — Knud Knudsen og Ivar Aasen",
      content: `
        <p>Medan Ivar Aasen bygde landsmål frå dialektane, gjekk <strong>Knud Knudsen</strong>
        (1812–1895) ein annan veg. Han ville <em class="nn">fornorske</em> dansk skrift
        steg for steg, slik at skriftspråket gradvis kom nærare det danna talemålet i
        norske byar. Det er denne lina som etter kvart vart <strong>riksmål</strong> og
        seinare <strong>bokmål</strong>.</p>

        <h3>Jamstillingsvedtaket (1885)</h3>
        <p>I 1885 gjorde Stortinget eit historisk vedtak: landsmål og det norsk-danske
        skriftspråket skulle vere <em class="nn">jamstilte</em>. Det vil seie at begge skulle
        vere likeverdige i skule og forvaltning. Dette gav landsmålet ein offisiell status.</p>

        <h3>Samnorskpolitikken</h3>
        <p>Frå tidleg 1900-tal og fram til 1960-talet prøvde styresmaktene å føre dei to
        skriftspråka <em class="nn">saman</em> til éitt felles språk, kalla
        <strong>samnorsk</strong>. Tre store rettskrivingsreformer (<strong>1907, 1917, 1938</strong>)
        endra både bokmål og nynorsk i denne retninga.</p>

        <h3>Foreldreaksjonen</h3>
        <p>Mange foreldre, særleg på austlandet og i byane, reagerte sterkt mot reformene.
        På slutten av 1940-talet vart <em class="nn">foreldreaksjonen mot samnorsk</em>
        starta. Dei retta lærebøkene tilbake mot eldre former. Striden var hard på 1950-talet.</p>

        <h3>1981 — samnorsklinja oppgitt</h3>
        <p>I 1981 vedtok Stortinget at samnorskpolitikken ikkje lenger skulle gjelde.
        Bokmål og nynorsk skulle få utvikle seg kvar for seg. Seinare har det kome
        moderne rettskrivingar: <strong>2005 for bokmål</strong> og
        <strong>2012 for nynorsk</strong>.</p>

        <div class="callout warn">
          <strong>Viktig omgrep:</strong> «Samnorsk» tyder ikkje at språka vart eitt — det
          var ein <em>politikk</em> som freista å smelte dei saman. Politikken vart altså
          aldri gjennomført fullt ut, og vart formelt avslutta i 1981.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva tyder jamstillingsvedtaket frå 1885?",
      options: [
        "At landsmål og bokmål skulle vere likeverdige skriftspråk.",
        "At alle måtte velje landsmål.",
        "At dansk vart forbode i Noreg.",
        "At norsk språk skulle smeltast saman til eitt.",
      ],
      correct: 0,
      explanation: "Vedtaket gjorde landsmål og det norsk-danske skriftspråket jamstilte i skule og forvaltning.",
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva var målet med samnorskpolitikken?",
      options: [
        "Å gjere nynorsk til einaste skriftspråk.",
        "Å gjere bokmål til einaste skriftspråk.",
        "Å smelte bokmål og nynorsk saman til éitt felles språk.",
        "Å innføre svensk i Noreg.",
      ],
      correct: 2,
      explanation: "Samnorsk var ein politikk som ville nærme bokmål og nynorsk slik at dei til slutt vart eitt språk. Politikken vart oppgitt i 1981.",
    },
    {
      type: "exercise",
      exerciseType: "matching",
      question: "Para saman person og arbeid/standpunkt:",
      pairs: [
        ["Ivar Aasen", "Bygde landsmål frå dialektar"],
        ["Knud Knudsen", "Ville fornorske dansk skrift"],
        ["Foreldreaksjonen", "Protesterte mot samnorskreformene"],
        ["Stortinget 1885", "Vedtok jamstilling mellom skriftspråka"],
      ],
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Fyll inn årstal og ord:",
      items: [
        { prompt: "Jamstillingsvedtaket vart gjort i året ___.", accept: ["1885"] },
        { prompt: "Samnorskpolitikken vart formelt oppgitt i ___.", accept: ["1981"] },
        { prompt: "Den nye nynorskrettskrivinga kom i ___.", accept: ["2012"] },
        { prompt: "Knud Knudsen ville ___ dansk skrift.", accept: ["fornorske", "fornorska"] },
      ],
    },
    {
      type: "exercise",
      exerciseType: "translate",
      question: "Set om til nynorsk:",
      source: "Stortinget vedtok i 1885 at landsmål og bokmål skulle være likestilte.",
      accept: [
        "Stortinget vedtok i 1885 at landsmål og bokmål skulle vere jamstilte.",
        "Stortinget vedtok i 1885 at landsmål og bokmål skulle vere likestilte.",
        "I 1885 vedtok Stortinget at landsmål og bokmål skulle vere jamstilte.",
      ],
      hint: "«være» heiter «vere» på nynorsk; «likestilte» kan òg heite «jamstilte».",
      explanation: "På nynorsk skriv vi <em class=\"nn\">vere</em> (ikkje «være»). Både «jamstilte» og «likestilte» er gode val, men «jamstilte» er sjølve fagomgrepet frå 1885.",
    },
    {
      type: "reading",
      title: "Foreldreaksjonen — kort kjelde",
      passage: `
        <p>På slutten av 1940-talet og utover 1950-talet retta foreldre rundt om i landet
        sjølv lærebøkene til borna sine. Dei sletta ut samnorske former med blekk og skreiv
        inn dei eldre formene attmed. Aksjonen vart organisert som <em class="nn">Foreldreaksjonen
        mot samnorsk</em> i 1951.</p>
        <p>Mange opplevde at reformene gjorde skriftspråket framand for dei. Andre meinte
        at språket måtte vere meir folkeleg, og at samnorsk var ein god tanke. Striden
        viste at språk handlar om identitet — ikkje berre om reglar.</p>
      `,
      questions: [
        {
          type: "multipleChoice",
          question: "Kva gjorde foreldra i aksjonen mot samnorsk?",
          options: [
            "Dei sende borna sine til skular i utlandet.",
            "Dei retta lærebøkene fysisk med blekk.",
            "Dei nekta borna sine å lære å skrive.",
            "Dei tok bøkene med til Stortinget.",
          ],
          correct: 1,
        },
        {
          type: "freeShort",
          question: "Kva trur du teksten meiner med at «språk handlar om identitet»?",
          modelAnswer: "Det språket du skriv og snakkar, kan kjennast som ein del av kven du er. Når nokon endrar skriftspråket, kan det opplevast som om dei endrar noko ved deg sjølv eller heimstaden din.",
        },
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Drøft kort",
      question: "Burde Noreg ha hatt éitt felles skriftspråk (samnorsk)? Skriv 100–180 ord der du gir både eit argument for og eit argument mot, og avsluttar med ditt eige standpunkt.",
      minWords: 100,
      checklist: [
        "Eitt argument for samnorsk.",
        "Eitt argument mot samnorsk.",
        "Eit avsluttande standpunkt med kort grunngiving.",
        "Skriv på nynorsk så godt du kan.",
      ],
    },
  ],
});

Modules.register({
  id: "historie-i-dag",
  part: 1,
  title: "Nynorsk i dag og den moderne debatten",
  summary: "Mållov, sidemål, NRK og kvar debatten står no.",
  estimatedMinutes: 25,
  sections: [
    {
      type: "lesson",
      title: "Status og bruk",
      content: `
        <p>I dag har om lag <strong>10–12 %</strong> av nordmenn nynorsk som hovudmål.
        Kjerneområda er <strong>Vestland</strong>, <strong>Møre og Romsdal</strong>, samt
        delar av indre Austlandet (Valdres, Hallingdal, Gudbrandsdalen). Resten av landet
        har bokmål som hovudmål, men alle elevar lærer båe — det eine som <em class="nn">hovudmål</em>
        og det andre som <em class="nn">sidemål</em>.</p>

        <h3>Mållova (no: språklova frå 2022)</h3>
        <p>Sidan 1980 har staten vore pålagd å bruke begge skriftspråka. I 2022 fekk Noreg
        ei ny <strong>språklov</strong>. Lova fastslår at <em class="nn">norsk er
        hovudspråket</em>, og at <em class="nn">bokmål og nynorsk er likeverdige skriftspråk</em>.
        Statsorgan skal bruke minst 25 % nynorsk og minst 25 % bokmål i tekstar retta mot
        ålmenta.</p>

        <h3>NRK</h3>
        <p>NRK har eit liknande krav om minst <strong>25 %</strong> nynorsk i sendingane
        sine. Dette gjeld både tekst og munnleg, og blir målt jamleg.</p>

        <h3>Sidemålsdebatten</h3>
        <p>Sidan 1907 har alle norske elevar lært båe skriftspråka. Sidemålet er det av dei
        to du <em>ikkje</em> har som hovudmål. Debatten har gått i bølgjer:</p>
        <ul>
          <li><strong>Mot sidemålskrav:</strong> Mange synest det er tungvint å lære to
              variantar av eit språk som er så like. Argumentet er at tida heller kunne
              brukast til engelsk eller andre fag.</li>
          <li><strong>For sidemålskrav:</strong> Nynorsk er ein del av norsk kulturarv. Utan
              opplæring blir nynorsken sett under press, og elevar med nynorsk som hovudmål
              risikerer å miste tilgangen til lærebøker og institusjonar i si eiga målform.</li>
        </ul>

        <h3>Nynorsk på nettet</h3>
        <p>Nynorsk er òg synleg på nett, i sosiale medium og i populærkulturen. Aviser som
        <em class="nn">Dag og Tid</em> blir skrivne berre på nynorsk. Mange artistar, t.d.
        Odd Nordstoga og Stein Torleif Bjella, brukar nynorsk og dialekt i tekstane sine.</p>

        <div class="callout">
          <strong>Status no:</strong> Nynorsk er likeverdig med bokmål i lov, har faste
          krav i offentleg sektor, og blir brukt av ein stabil del av folket — men
          debatten om plassen til nynorsk i skulen kjem opp att med jamne mellomrom.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva seier språklova (2022) om bokmål og nynorsk?",
      options: [
        "At bokmål er hovudskriftspråket og nynorsk er eit sideskriftspråk.",
        "At dei er likeverdige skriftspråk.",
        "At nynorsk berre skal brukast i Vestland.",
        "At alle må velje eitt av dei innan dei er 18.",
      ],
      correct: 1,
      explanation: "Språklova slår fast at norsk er hovudspråket og at bokmål og nynorsk er likeverdige skriftspråk.",
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kor stor del nynorsk skal NRK ha i sendingane sine?",
      options: ["Minst 10 %", "Minst 25 %", "Minst 50 %", "Det er ingen regel."],
      correct: 1,
    },
    {
      type: "exercise",
      exerciseType: "categorize",
      question: "Sorter argumenta i debatten om sidemål:",
      categories: {
        "For sidemålsopplæring": [
          "Nynorsk er ein del av norsk kulturarv.",
          "Elevar med nynorsk som hovudmål treng at fleire kan lese det.",
          "Det styrkjer språkforståinga å kjenne begge variantane.",
        ],
        "Mot sidemålsopplæring": [
          "Tida kunne brukast til andre fag.",
          "Det er for likt hovudmålet til å vere lærerikt.",
          "Mange elevar synest det er vanskeleg å bli vurdert i to skriftspråk.",
        ],
      },
      explanation: "Det finst gode argument på begge sider. Poenget er å skjøne kva dei byggjer på.",
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Fyll inn:",
      items: [
        { prompt: "I dag har om lag ___ prosent av nordmenn nynorsk som hovudmål.", accept: ["10", "12", "10–12", "10-12", "ca. 10", "ca. 12", "om lag 10", "om lag 12"] },
        { prompt: "Den nye språklova kom i året ___.", accept: ["2022"] },
        { prompt: "Det skriftspråket du ikkje har som hovudmål, kallar vi ___.", accept: ["sidemål", "sidemålet"] },
      ],
    },
    {
      type: "exercise",
      exerciseType: "translate",
      question: "Set om til nynorsk:",
      source: "Alle norske elever lærer både bokmål og nynorsk på skolen.",
      accept: [
        "Alle norske elevar lærer både bokmål og nynorsk på skulen.",
        "Alle norske elevar lærer både bokmål og nynorsk i skulen.",
      ],
      hint: "«elever» → «elevar»; «skolen» → «skulen».",
      explanation: "Vanlege byte: «elever» → <em class=\"nn\">elevar</em>, «skolen» → <em class=\"nn\">skulen</em>.",
    },
    {
      type: "reading",
      title: "Debattutdrag",
      passage: `
        <p>Kvart par år kjem det forslag om å fjerne karakter i sidemål, eller å gjere
        sidemål valfritt. Tilhengjarane meiner det vil gi meir motiverte elevar, og at
        opplæring framleis kan halde fram utan eigen karakter. Motstandarane meiner det vil
        svekkje stillinga til nynorsken kraftig, fordi karakteren er det som faktisk får
        elevar til å arbeide med faget.</p>
        <p>Eit kompromissforslag har vore å gi <em class="nn">éin felles norskkarakter</em>
        som inkluderer både hovudmål og sidemål. Det er allereie prøvd ut, og diskusjonen
        går framleis.</p>
      `,
      questions: [
        {
          type: "multipleChoice",
          question: "Kva er hovudsplitten i debatten i teksten?",
          options: [
            "Om elevar skal lære engelsk eller ikkje.",
            "Om sidemål skal ha eigen karakter eller ikkje.",
            "Om nynorsk skal skrivast på Vestlandet.",
            "Om bokmål skal bli forbode.",
          ],
          correct: 1,
        },
        {
          type: "freeShort",
          question: "Kva meiner du sjølv om karakter i sidemål? Gi minst eitt argument for standpunktet ditt.",
          modelAnswer: "Eit svar kan vere: Eg meiner det bør vere karakter i sidemål, fordi det viser kor viktig det er, og fordi elevar med nynorsk som hovudmål blir tekne på alvor. Eller: Eg meiner karakteren bør fjernast, fordi læring kan skje sjølv utan karakter, og presset blir mindre.",
        },
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Eigen drøfting",
      question: "Skriv ein liten drøftingstekst (150–250 ord) om nynorsk si rolle i Noreg i dag. Bruk minst to fakta frå modulen.",
      minWords: 150,
      checklist: [
        "Bruk minst to fakta (t.d. språklova, NRK-kravet, kjerneområde).",
        "Skriv på nynorsk.",
        "Ha ei klar avslutning med ditt eige standpunkt.",
      ],
    },
  ],
});
