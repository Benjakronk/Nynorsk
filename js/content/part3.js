/* Del 3 — Skriving og tekstarbeid */

Modules.register({
  id: "skriving-omsetjing",
  part: 3,
  title: "Frå bokmål til nynorsk — strategiar",
  summary: "Korleis tenkje når du skal setje om frå bokmål.",
  estimatedMinutes: 25,
  sections: [
    {
      type: "lesson",
      title: "Tre tankesteg for omsetjing",
      content: `
        <p>Når du skal setje om frå bokmål til nynorsk, kan du tenkje i tre steg:</p>

        <ol>
          <li><strong>Småord først.</strong> Byt ut <em class="bm">ikke</em>,
              <em class="bm">bare</em>, <em class="bm">fra</em>, <em class="bm">hva</em>,
              <em class="bm">hvordan</em>, <em class="bm">hvorfor</em>, <em class="bm">jeg</em>,
              <em class="bm">dere</em> osv.</li>
          <li><strong>Verb og bøying.</strong> Sjekk presens (-r-formene),
              preteritum (sterke verb) og perfektum.</li>
          <li><strong>Substantiv og samsvar.</strong> Hugs <em class="nn">jenta</em>,
              <em class="nn">boka</em>, <em class="nn">husa</em>, og at adjektivet samsvarer
              i kjønn og tal.</li>
        </ol>

        <h3>Vanlege ord som er heilt ulike</h3>
        <table>
          <thead><tr><th>Bokmål</th><th>Nynorsk</th></tr></thead>
          <tbody>
            <tr><td>spise</td><td>ete</td></tr>
            <tr><td>gjøre</td><td>gjere</td></tr>
            <tr><td>si</td><td>seie</td></tr>
            <tr><td>gå (preteritum: gikk)</td><td>gå (preteritum: gjekk)</td></tr>
            <tr><td>være</td><td>vere</td></tr>
            <tr><td>se</td><td>sjå</td></tr>
            <tr><td>vite</td><td>vite (men: veit i presens)</td></tr>
            <tr><td>øye</td><td>auge</td></tr>
            <tr><td>språk</td><td>språk (likt) / mål</td></tr>
            <tr><td>familie</td><td>familie (likt) / slekt</td></tr>
            <tr><td>skole</td><td>skule</td></tr>
            <tr><td>nå</td><td>no</td></tr>
          </tbody>
        </table>

        <div class="callout">
          <strong>Bruk ordlista:</strong> Når du er usikker, slå opp på
          <em class="nn">Nynorskordboka</em> (ordbokene.no). Mange tilrår òg å bruke
          ein bokmål–nynorsk-ordbok parallelt.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "translate",
      question: "Kort setning — sjå om småorda:",
      source: "Jeg vet ikke hva jeg skal gjøre.",
      accept: [
        "Eg veit ikkje kva eg skal gjere.",
      ],
      hint: "Tenk på «jeg», «ikke», «hva», «gjøre».",
    },
    {
      type: "exercise",
      exerciseType: "translate",
      question: "Pass på verbet:",
      source: "Vi spiser middag klokka fem.",
      accept: [
        "Vi et middag klokka fem.",
        "Me et middag klokka fem.",
      ],
      hint: "«spiser» → presens av «å ete» → «et».",
      explanation: "Verbet å ete har bøyinga: ete – et – åt – har ete.",
    },
    {
      type: "exercise",
      exerciseType: "translate",
      question: "Sterke verb i preteritum:",
      source: "Hun gikk til skolen og så ingen.",
      accept: [
        "Ho gjekk til skulen og såg ingen.",
      ],
      hint: "«hun» → «ho»; «gikk» → «gjekk»; «så» (preteritum av å se) → «såg»; «skolen» → «skulen».",
    },
    {
      type: "exercise",
      exerciseType: "translate",
      question: "Litt vanskelegare:",
      source: "Hvorfor flyttet familien din hit fra Oslo?",
      accept: [
        "Kvifor flytta familien din hit frå Oslo?",
      ],
      hint: "«hvorfor» → «kvifor»; «flyttet» (a-verb) → «flytta»; «fra» → «frå».",
    },
    {
      type: "exercise",
      exerciseType: "translate",
      question: "Substantiv i bestemt form:",
      source: "Boken ligger på bordet i kjøkkenet.",
      accept: [
        "Boka ligg på bordet i kjøkenet.",
        "Boka ligg på bordet i kjøkken.",
        "Boka ligg på bordet på kjøkenet.",
      ],
      hint: "«boken» → «boka» (hokjønn); «ligger» → «ligg»; «kjøkkenet» → «kjøkenet».",
      explanation: "På nynorsk skriv vi <em class=\"nn\">kjøken</em> med éin k. Hovudform i bestemt form er <em class=\"nn\">kjøkenet</em>.",
    },
    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Byt ut dei understreka orda. Skriv berre det nye ordet:",
      items: [
        { prompt: "«hvor» bur du? → ___", accept: ["kvar", "Kvar"] },
        { prompt: "Eg «vet» det. → ___", accept: ["veit"] },
        { prompt: "Han kom «fra» Bergen. → ___", accept: ["frå"] },
        { prompt: "Vi «spiste» middag. → ___", accept: ["åt"] },
        { prompt: "Ho «gikk» heim. → ___", accept: ["gjekk"] },
        { prompt: "Det var «mye» folk. → ___", accept: ["mykje"] },
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Set om ein kort tekst",
      question: "Set om denne bokmålsteksten til nynorsk. Skriv heile teksten på nytt i feltet under.",
      hint: "Bokmål: «Jeg liker å gå på skolen om morgenen. Det er ikke alltid like lett å stå opp, men når jeg først er ute, blir jeg glad. Vennene mine venter på meg, og vi går sammen. Hvis det regner, tar vi bussen.»",
      minWords: 60,
      checklist: [
        "Byt ut alle småord (ikke→ikkje, jeg→eg osv.).",
        "Sjekk verb i presens.",
        "Sjekk «skolen» → «skulen».",
        "Les korrektur til slutt.",
      ],
    },
  ],
});

Modules.register({
  id: "skriving-korte-tekstar",
  part: 3,
  title: "Korte tekstar — melding, e-post, dagbok",
  summary: "Øv på å skrive korte, kvardagslege tekstar på nynorsk.",
  estimatedMinutes: 30,
  sections: [
    {
      type: "lesson",
      title: "Tilpass språket til situasjonen",
      content: `
        <p>Ein kort tekst skal nå fram raskt. Tilpass språket til mottakaren:</p>
        <ul>
          <li><strong>Melding til ein venn</strong> — uformelt, korte setningar, gjerne smilefjes.</li>
          <li><strong>E-post til ein lærar</strong> — høfleg, fullstendige setningar,
              opning og avslutning.</li>
          <li><strong>Dagboknotat</strong> — personleg, kjenslene dine kjem fram.</li>
        </ul>

        <h3>Døme: melding</h3>
        <div class="callout">
          «Hei! Kjem du heim til meg etter skulen? Eg har lyst til å sjå ein film.
          Skriv tilbake :)»
        </div>

        <h3>Døme: e-post til læraren</h3>
        <div class="callout">
          «Hei [Lærar],<br>
          Eg vart sjuk i går og rakk ikkje innleveringa. Kan eg få utsetjing til fredag?<br>
          Helsing [Namn]»
        </div>

        <h3>Døme: dagboknotat</h3>
        <div class="callout">
          «I dag var ein merkeleg dag. Eg gledde meg til turen, men så byrja det å regne, og
          alle vart litt sure. Likevel hadde vi det moro då vi sat i hytta og laga middag
          saman.»
        </div>

        <div class="callout warn">
          <strong>Hugs:</strong> Sjølv ein kort tekst skal vere konsekvent — du kan ikkje
          blande «jeg» og «eg» i same tekst.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva er rett opning på ein høfleg e-post på nynorsk?",
      options: [
        "«Hei du, jeg lurer på …»",
        "«Hei, eg lurer på …»",
        "«Hey, eg lurer på …»",
        "«Hallo der, jeg har ein spørsmål …»",
      ],
      correct: 1,
    },
    {
      type: "exercise",
      exerciseType: "translate",
      question: "Set om denne meldinga:",
      source: "Hei! Kommer du hjem til meg i morgen? Jeg har lyst på pizza.",
      accept: [
        "Hei! Kjem du heim til meg i morgon? Eg har lyst på pizza.",
      ],
      hint: "«kommer» → «kjem»; «hjem» → «heim»; «i morgen» → «i morgon»; «jeg» → «eg».",
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Melding til ein venn",
      question: "Skriv ei kort melding (30–60 ord) på nynorsk til ein venn. Inviter henne/han på noko denne helga.",
      minWords: 30,
      checklist: [
        "Bruk «eg», «kjem», «heim», «morgon».",
        "Hels og avslutt på ein naturleg måte.",
        "Skriv som du verkeleg snakkar.",
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "E-post til ein lærar",
      question: "Skriv ein høfleg e-post (60–120 ord) på nynorsk der du spør læraren om utsetjing på ei innlevering. Forklar grunnen og foreslå ein ny dato.",
      minWords: 60,
      checklist: [
        "Høfleg opning og avslutning.",
        "Tydeleg spørsmål.",
        "Grunngiving.",
        "Forslag til ny dato.",
        "Konsekvent nynorsk.",
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Dagboknotat",
      question: "Skriv eit dagboknotat (80–150 ord) frå ein dag du hugsar godt. Skriv på nynorsk og bruk minst fem ulike verb i preteritum.",
      minWords: 80,
      checklist: [
        "Personleg tone.",
        "Minst fem verb i preteritum (eg gjekk, eg såg, eg åt …).",
        "Skildre kjensler.",
        "Bruk overgangsord (først, så, etterpå, til slutt).",
      ],
    },
  ],
});

Modules.register({
  id: "skriving-lengre-tekstar",
  part: 3,
  title: "Lengre tekstar — fortelje og argumentere",
  summary: "Oppbygging av forteljande og argumenterande tekst.",
  estimatedMinutes: 40,
  sections: [
    {
      type: "lesson",
      title: "Forteljande tekst",
      content: `
        <p>Ein forteljande tekst kan byggjast opp i fem steg:</p>
        <ol>
          <li><strong>Anslag</strong> — opninga som dreg lesaren inn.</li>
          <li><strong>Presentasjon</strong> — kven, kvar og når.</li>
          <li><strong>Stigning</strong> — noko skjer, spenninga aukar.</li>
          <li><strong>Klimaks</strong> — vendepunktet.</li>
          <li><strong>Avrunding</strong> — kva sit lesaren att med?</li>
        </ol>

        <h3>Verkemiddel</h3>
        <ul>
          <li>Skildring (kva du ser, høyrer, kjenner).</li>
          <li>Replikkar (det dei seier — bruk tankestrek: — Eg veit ikkje, sa han.).</li>
          <li>Variasjon i setningslengd.</li>
          <li>Indre tankar hos hovudpersonen.</li>
        </ul>
      `,
    },
    {
      type: "lesson",
      title: "Argumenterande tekst",
      content: `
        <p>Ein argumenterande tekst skal overtyde. Ein vanleg struktur er:</p>
        <ol>
          <li><strong>Innleiing</strong> — tema og standpunkt.</li>
          <li><strong>Hovuddel</strong> — to–tre argument med døme og kjelder.</li>
          <li><strong>Motargument</strong> — vis at du har vurdert det andre synet,
              og forklar kvifor ditt eige argument er sterkare.</li>
          <li><strong>Avslutning</strong> — oppsummering og konklusjon.</li>
        </ol>

        <h3>Argumenttypar</h3>
        <ul>
          <li><strong>Logos</strong> — fakta og fornuft.</li>
          <li><strong>Etos</strong> — truverd, kjelder.</li>
          <li><strong>Patos</strong> — kjensler, eksempel som rørar.</li>
        </ul>

        <div class="callout">
          <strong>Tips:</strong> Eit godt motargument styrkjer teksten din. Det viser at
          du har tenkt grundig.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "matching",
      question: "Para saman omgrep og forklaring:",
      pairs: [
        ["Anslag", "Opninga som fangar lesaren"],
        ["Klimaks", "Vendepunktet i forteljinga"],
        ["Logos", "Argument basert på fakta og fornuft"],
        ["Patos", "Argument som vekkjer kjensler"],
        ["Etos", "Argument som byggjer truverd"],
      ],
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva er føremålet med eit motargument i ein argumenterande tekst?",
      options: [
        "Å gjere teksten lengre.",
        "Å vise at du forstår det andre synet og kan svare på det.",
        "Å forvirre lesaren.",
        "Å unngå å ta standpunkt.",
      ],
      correct: 1,
      explanation: "Eit motargument viser at du har vurdert andre syn — og det gjer ditt eige standpunkt sterkare.",
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Forteljande tekst",
      question: "Skriv ei kort forteljing (200–400 ord) på nynorsk om ein dag som ikkje gjekk som planlagt. Bygg teksten opp med anslag, stigning, klimaks og avrunding.",
      minWords: 200,
      checklist: [
        "Tydeleg anslag — fang lesaren med éin gong.",
        "Skildre kvar og når det skjer.",
        "Bygg opp spenning før klimaks.",
        "Bruk minst éin replikk (med tankestrek).",
        "Variasjon i setningslengd.",
        "Skriv konsekvent på nynorsk.",
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Argumenterande tekst",
      question: "Skriv ein argumenterande tekst (200–400 ord) på nynorsk om dette: «Bør sidemålskarakter behaldast i ungdomsskulen?» Ta eit klart standpunkt.",
      minWords: 200,
      checklist: [
        "Innleiing med tema og standpunkt.",
        "Minst to argument, gjerne med døme.",
        "Eitt motargument du svarar på.",
        "Avslutning som oppsummerer.",
        "Tenk på logos, etos og patos.",
        "Skriv konsekvent på nynorsk.",
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Skildring — kort tekst",
      question: "Skriv ein skildring (100–200 ord) på nynorsk av ein stad du kjenner godt. Bruk alle fem sansane minst éin gong.",
      minWords: 100,
      checklist: [
        "Syn — kva ser du?",
        "Høyrsel — kva høyrer du?",
        "Lukt — kva luktar?",
        "Smak — kva smakar?",
        "Berøring — kva kjenner du?",
        "Bruk minst seks adjektiv i rett form.",
      ],
    },
  ],
});
