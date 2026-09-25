/* Del 5: Lesing og tekstforståing
   Ein modul per tekst. Tekstane er skrivne for kurset i stilen til kvar forfattar,
   ikkje henta frå forfattarane sjølve. Kvar modul seier dette tydeleg og viser
   kvar ein finn ekte tekstar av forfattaren.
   Modulen «Møt nynorskforfattarane» kjem først og gir oversikta. */


Modules.register({
  id: "nynorskforfattarane",
  part: 5,
  title: "Møt nynorskforfattarane",
  summary: "Bli kjend med ni kjende nynorskforfattarar, frå Vinje til Olaug Nilssen.",
  estimatedMinutes: 40,
  sections: [
    {
      type: "lesson",
      title: "Kvifor møte forfattarane?",
      content: `
        <p>Tekstane du har lese (eller skal lese) i lesetreningsmodulane er originale,
        eg har skrive dei sjølv, men dei er <em class="nn">inspirerte av stilen</em>
        til ni kjende nynorskforfattarar. I denne modulen får du møte dei sjølve.</p>

        <p>Vi går kronologisk, frå 1800-talet og fram til i dag. Etter kvar forfattar
        nemner eg eit par av dei viktigaste verka deira, så du kan finne fram til
        ekte tekstar på biblioteket eller på nettet om du blir nysgjerrig.</p>

        <p>Etter kvar forfattar kjem eit lite spørsmål om det du nettopp har lese, så
        du får festa det viktigaste før du går vidare. Til slutt får du ei skriveoppgåve.</p>
      `,
    },
    {
      type: "lesson",
      title: "1. Aasmund Olavsson Vinje (1818–1870)",
      content: `
        <figure class="figur portrett">
          <img src="bilete/vinje.jpg" alt="Portrett av Aasmund Olavsson Vinje" loading="lazy">
          <figcaption>Aasmund Olavsson Vinje. Foto: Nasjonalbiblioteket (ingen kjende restriksjonar).</figcaption>
        </figure>
        <p><strong>Frå:</strong> Vinje i Telemark.<br>
        <strong>Yrke:</strong> Journalist, lyrikar, reiseskildrar.</p>

        <p>Vinje voks opp i fattige kår og arbeidde seg fram som lærar og seinare jurist
        og journalist. Han var ein av dei første som tok i bruk landsmålet til Ivar
        Aasen i praktisk skrift. I 1858 grunnla han bladet <em class="nn">Dølen</em>,
        som han skreiv mest sjølv, eit slags eit-mannsblad fullt av reisebrev,
        meiningar, dikt og kommentarar.</p>

        <p><strong>Stil:</strong> Han var observant og ironisk, og blanda høgt og lågt
        på ein måte som var ny i norsk skrift. Han kunne skifte frå filosofisk
        refleksjon til ein vits om kva han åt på krua.</p>

        <p><strong>Kjende verk:</strong></p>
        <ul>
          <li><em class="nn">Ferdaminne fraa Sumaren 1860</em>: reiseskildring frå
              turen til kroninga av Karl 15. i Trondheim. Rekna som ein klassikar.</li>
          <li>Dikt: <em class="nn">«Ved Rondane»</em> («No ser eg atter slike fjell og
              dalar …»), <em class="nn">«Blåmann»</em>, <em class="nn">«Den dag kjem
              aldri at eg deg gløymer»</em>.</li>
        </ul>

        <div class="callout">
          <strong>Vil du lese?</strong> «Ved Rondane» er kort, vakker og finst gratis på
          mange nettstader. Mange syng henne òg, for Edvard Grieg sette musikk til.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Vinje grunnla bladet <em class=\"nn\">Dølen</em> i 1858. Kva var spesielt med det?",
      options: ["Det var det første bladet på bokmål.","Det kom berre ut éin gong.","Han skreiv det meste av bladet sjølv, på landsmål.","Det handla berre om musikk."],
      correct: 2,
      explanation: "Dølen var nesten eit eit-mannsblad: reisebrev, meiningar, dikt og kommentarar, det meste skrive av Vinje sjølv. Han var ein av dei første som brukte landsmålet til Aasen i praktisk skrift.",
    },
    {
      type: "lesson",
      title: "2. Arne Garborg (1851–1924)",
      content: `
        <figure class="figur portrett">
          <img src="bilete/garborg.jpg" alt="Portrett av Arne Garborg" loading="lazy">
          <figcaption>Arne Garborg. Foto: Nasjonalbiblioteket (ingen kjende restriksjonar).</figcaption>
        </figure>
        <p><strong>Frå:</strong> Time på Jæren.<br>
        <strong>Yrke:</strong> Romanforfattar, lyrikar, kulturkritikar.</p>

        <p>Garborg var ein av dei sterkaste røystene i nynorsk-bevegelsen på 1800- og
        tidleg 1900-tal. Han skreiv om bondelivet han kom frå, om reisa til byen, om
        unge menneske som strir med tru, tvil og lengsel.</p>

        <p><strong>Stil:</strong> Sosialrealistisk og psykologisk. Han var blant dei
        første som skreiv om indre liv på nynorsk: kjenslene, tankane,
        sjølvransakinga til vanlege folk.</p>

        <p><strong>Kjende verk:</strong></p>
        <ul>
          <li><em class="nn">Bondestudentar</em> (1883): roman om unge bondegutar som
              prøver å studere seg fram i byen.</li>
          <li><em class="nn">Trætte Mænd</em> (1891): roman om livskrise.</li>
          <li><em class="nn">Fred</em> (1892): roman om religiøs uro.</li>
          <li><em class="nn">Haugtussa</em> (1895): diktsyklus om jenta Veslemøy, som
              har synske evner. Edvard Grieg tonsette delar av han.</li>
        </ul>

        <div class="callout">
          <strong>Vil du lese?</strong> Diktet <em class="nn">«Veslemøy»</em> opnar
          Haugtussa og er ein god start. Grieg tonsette mellom anna
          <em class="nn">«Killingdans»</em> og <em class="nn">«Ved Gjætle-bekken»</em> frå
          same samlinga. Sommarstova til Garborg på Jæren, Knudaheio, er i dag eit museum.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva handlar diktsyklusen <em class=\"nn\">Haugtussa</em> om?",
      options: ["Ein bondegut som studerer i byen.","Jenta Veslemøy, som har synske evner.","Ei reise til Trondheim.","Ein gard i Trøndelag gjennom mange generasjonar."],
      correct: 1,
      explanation: "Haugtussa (1895) handlar om Veslemøy, som ser det andre ikkje ser. Edvard Grieg tonsette delar av verket. Bondeguten som studerer i byen, er frå ein annan Garborg-roman, Bondestudentar.",
    },
    {
      type: "lesson",
      title: "3. Olav Duun (1876–1939)",
      content: `
        <figure class="figur portrett">
          <img src="bilete/duun.jpg" alt="Portrett av Olav Duun" loading="lazy">
          <figcaption>Olav Duun. Foto: Nasjonalbiblioteket (CC BY 2.0).</figcaption>
        </figure>
        <p><strong>Frå:</strong> Jøa i Namdalen (Trøndelag).<br>
        <strong>Yrke:</strong> Lærar og romanforfattar.</p>

        <p>Duun voks opp på ei lita øy ved kysten og bar med seg heile livet språket
        og forteljingane derifrå. Hovudverket hans er ein svær slektsroman om
        Juvik-folket, ein gard ved kysten i Trøndelag, gjennom mange generasjonar.</p>

        <p><strong>Stil:</strong> Episk og dramatisk. Duun skreiv om sterke karakterar
        som strir med naturen, med sine eigne kjensler og med lagnaden. Bøkene hans
        kan minne litt om islandsk sagalitteratur: det er liv og død og kamp.</p>

        <p><strong>Kjende verk:</strong></p>
        <ul>
          <li><em class="nn">Juvikfolket</em> (1918–1923, seks band): slektsroman frå
              kysten. Rekna som eit av dei store norske romanverka.</li>
          <li><em class="nn">Medmenneske</em> (1929): roman om val og samvit.</li>
          <li><em class="nn">Ragnhild</em> (1931).</li>
        </ul>

        <div class="callout">
          <strong>Visste du?</strong> Olav Duun vart fleire gonger nominert til
          Nobelprisen i litteratur, men fekk han aldri.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva er Olav Duun mest kjend for?",
      options: ["Diktsyklusen <em class=\"nn\">Haugtussa</em>.","Skodespelet <em class=\"nn\">Nokon kjem til å koma</em>.","Reiseskildringa <em class=\"nn\">Ferdaminne</em>.","Slektsromanen <em class=\"nn\">Juvikfolket</em>."],
      correct: 3,
      explanation: "Juvikfolket (1918–1923) følgjer ei slekt ved kysten i Trøndelag gjennom mange generasjonar, og er rekna som eit av dei store norske romanverka.",
    },
    {
      type: "lesson",
      title: "4. Tarjei Vesaas (1897–1970)",
      content: `
        <figure class="figur portrett">
          <img src="bilete/t-vesaas.jpg" alt="Portrett av Tarjei Vesaas" loading="lazy">
          <figcaption>Tarjei Vesaas. Foto: Nasjonalbiblioteket (ingen kjende restriksjonar).</figcaption>
        </figure>
        <p><strong>Frå:</strong> Vinje i Telemark.<br>
        <strong>Yrke:</strong> Romanforfattar og lyrikar.</p>

        <p>Tarjei Vesaas voks opp på ein gard og budde mesteparten av livet i bygda si.
        Han har skrive nokre av dei mest leste romanane på nynorsk i det 20. hundreåret.
        Han var gift med lyrikaren Halldis Moren Vesaas.</p>

        <p><strong>Stil:</strong> Sparsom, poetisk, symbolsk. Vesaas brukar enkle ord
        og korte setningar, men det han skriv om er ofte djupt: frykt, einsemd,
        venskap, naturen som spegel for menneskesinnet.</p>

        <p><strong>Kjende verk:</strong></p>
        <ul>
          <li><em class="nn">Is-slottet</em> (1963): kort roman om to jenter og eit
              dramatisk møte med naturen. Fekk Nordisk råds litteraturpris i 1964.</li>
          <li><em class="nn">Fuglane</em> (1957): roman om den lett utviklingshemma
              Mattis.</li>
          <li><em class="nn">Kimen</em> (1940): symbolladd roman skriven under
              andre verdskrigen.</li>
          <li><em class="nn">Vindane</em> (1952): novellesamling. Fekk Venezia-prisen i
              1953, og gav Vesaas det internasjonale gjennombrotet.</li>
        </ul>

        <div class="callout">
          <strong>Vil du lese?</strong> <em class="nn">Is-slottet</em> er kort (omtrent
          200 sider), den er omsett til mange språk, og opningskapitla er nokre av dei
          finaste i norsk litteratur.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Korleis skriv Tarjei Vesaas?",
      options: ["Sparsamt og symbolsk, med enkle ord og korte setningar.","Lange setningar utan punktum.","Ironisk og journalistisk.","Episk og dramatisk, som ei saga."],
      correct: 0,
      explanation: "Vesaas brukar enkle ord og korte setningar, men skriv om djupe ting: frykt, einsemd, venskap. Is-slottet (1963) er det mest kjende dømet.",
    },
    {
      type: "lesson",
      title: "5. Halldis Moren Vesaas (1907–1995)",
      content: `
        <figure class="figur portrett">
          <img src="bilete/hm-vesaas.png" alt="Portrett av Halldis Moren Vesaas" loading="lazy">
          <figcaption>Halldis Moren Vesaas. Foto via Wikimedia Commons, User:Orland (fri bruk).</figcaption>
        </figure>
        <p><strong>Frå:</strong> Trysil i Innlandet.<br>
        <strong>Yrke:</strong> Lyrikar, gjendiktar, kulturpersonlegheit.</p>

        <p>Halldis Moren Vesaas debuterte tidleg og vart raskt ein av dei viktigaste
        lyrikarane i si tid. Ho var gift med Tarjei Vesaas og budde med han i Telemark,
        men forfattarskapen hennar var sjølvstendig og kraftig.</p>

        <p><strong>Stil:</strong> Lyrisk og varm, men òg modig. Ho skreiv om kvinneliv,
        om kjærleik og familie, om krig og om det daglege. Mange av dikta hennar har
        ein eigen, stille kraft.</p>

        <p><strong>Kjende verk:</strong></p>
        <ul>
          <li><em class="nn">Harpe og dolk</em> (1929): debutsamling.</li>
          <li><em class="nn">Strender</em> (1933): diktsamling.</li>
          <li><em class="nn">Tung tids tale</em> (1945): dikt skrivne under krigen.
              Tittelkvadet er eitt av dei mest kjende dikta på nynorsk.</li>
          <li><em class="nn">I ein annan skog</em> (1955).</li>
        </ul>

        <div class="callout">
          <strong>Vil du lese?</strong> Tittelkvadet <em class="nn">«Tung tids tale»</em>
          opnar med linjene «Det heiter ikkje: eg — no lenger. Heretter heiter det: vi.»
          Det er kort, sterkt og verdt å lese i kveld.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Når vart dikta i <em class=\"nn\">Tung tids tale</em> skrivne?",
      options: ["På 1800-talet.","I 2017.","Under andre verdskrigen.","Etter at ho fekk Nobelprisen."],
      correct: 2,
      explanation: "Samlinga kom i 1945, og dikta er skrivne under krigen. Tittelkvadet, som opnar med at det ikkje lenger heiter «eg», men «vi», er eitt av dei mest kjende dikta på nynorsk.",
    },
    {
      type: "lesson",
      title: "6. Jon Fosse (1959–)",
      content: `
        <figure class="figur portrett">
          <img src="bilete/fosse.jpg" alt="Portrett av Jon Fosse" loading="lazy">
          <figcaption>Jon Fosse. Foto: Tom A. Kolstad / Det Norske Samlaget (CC BY-SA 4.0).</figcaption>
        </figure>
        <p><strong>Frå:</strong> Haugesund. Bur i dag i æresbustaden Grotten i Oslo, og har
        heim på Frekhaug ved Bergen og i Hainburg i Austerrike.<br>
        <strong>Yrke:</strong> Dramatikar, romanforfattar, lyrikar, omsetjar.</p>

        <p>Jon Fosse fekk <strong>Nobelprisen i litteratur i 2023</strong>, den
        fjerde norske nobelvinnaren i litteratur. Han er ein av dei mest spelte
        samtidsdramatikarane i verda, og bøkene hans er omsette til over 50 språk.</p>

        <p><strong>Stil:</strong> Minimalistisk og repetitiv. Fosse skriv lange setningar
        utan vanlege punktum, dialogen er sparsam, det same blir sagt om att, og det
        skjer ofte lite på overflata, men under ligg det djupe spørsmål om liv, død
        og Gud.</p>

        <p><strong>Kjende verk:</strong></p>
        <ul>
          <li><em class="nn">Nokon kjem til å koma</em> (1996, drama): kanskje hans
              mest spelte stykke.</li>
          <li><em class="nn">Morgon og kveld</em> (2000): kort roman om eit liv frå
              fødsel til død.</li>
          <li><em class="nn">Septologien</em> (2019–2021, tre band): eit hovudverk,
              med tittelen <em class="nn">«Det andre namnet»</em>, <em class="nn">«Eg er
              ein annan»</em> og <em class="nn">«Eit nytt namn»</em>.</li>
          <li><em class="nn">Trilogien</em> (2014): fekk Nordisk råds litteraturpris.</li>
        </ul>

        <div class="callout">
          <strong>Vil du lese?</strong> <em class="nn">Morgon og kveld</em> er kort og
          ein god inngang. Septologien er lang, men mange seier ho er som å bu i ein
          annan persons hovud i ei veke.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kven fekk Nobelprisen i litteratur i 2023?",
      options: ["Tarjei Vesaas","Jon Fosse","Olaug Nilssen","Olav Duun"],
      correct: 1,
      explanation: "Jon Fosse vart den fjerde norske nobelprisvinnaren i litteratur, etter Bjørnstjerne Bjørnson (1903), Knut Hamsun (1920) og Sigrid Undset (1928).",
    },
    {
      type: "lesson",
      title: "7. Frode Grytten (1960–)",
      content: `
        <figure class="figur portrett">
          <img src="bilete/grytten.jpg" alt="Portrett av Frode Grytten" loading="lazy">
          <figcaption>Frode Grytten. Foto: Jarvin (CC BY 3.0).</figcaption>
        </figure>
        <p><strong>Frå:</strong> Odda i Hardanger.<br>
        <strong>Yrke:</strong> Forfattar og journalist.</p>

        <p>Grytten voks opp i industribygda Odda, og industriarbeidarane og
        bygdesamfunnet pregar mykje av forfattarskapen. Han har skrive romanar,
        kortprosa, songtekstar og kommentarar i avisene.</p>

        <p><strong>Stil:</strong> Urban og kvardagsleg. Han skriv ofte korte forteljingar
        som zoomar inn på små augneblink, ein bussreise, eit møte, ein middag, og
        får dei til å vere viktige.</p>

        <p><strong>Kjende verk:</strong></p>
        <ul>
          <li><em class="nn">Bikubesong</em> (1999): roman bygd opp som mange
              forteljingar om naboar i ei blokk i Odda. Brageprisen.</li>
          <li><em class="nn">Flytande bjørn</em> (2005): kortprosasamling.</li>
          <li><em class="nn">Saganatt</em> (2011): roman.</li>
          <li><em class="nn">Menn som ingen treng</em> (2016): noveller.</li>
        </ul>

        <div class="callout">
          <strong>Vil du lese?</strong> <em class="nn">Bikubesong</em> er sett saman av
          mange korte historier, og du kan lese éi av gongen utan å miste samanhengen.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Korleis er romanen <em class=\"nn\">Bikubesong</em> bygd opp?",
      options: ["Som eitt langt brev.","Som ein slektsroman i seks band.","Som ein diktsyklus.","Som mange korte forteljingar om naboar i ei blokk i Odda."],
      correct: 3,
      explanation: "Bikubesong (1999) er sett saman av mange korte historier om folk i same blokka, og ein kan lese éi av gongen. Boka fekk Brageprisen.",
    },
    {
      type: "lesson",
      title: "8. Marit Eikemo (1971–)",
      content: `
        <p><strong>Frå:</strong> Odda i Hardanger.<br>
        <strong>Yrke:</strong> Forfattar, essayist, kulturarbeidar.</p>

        <p>Marit Eikemo skriv både skjønnlitteratur og sakprosa, og har vore leiar
        for Litteratursymposiet i Odda. Ho er kjend for å skrive nært på samtida,
        om kva som skjer med oss og kulturen vår akkurat no.</p>

        <p><strong>Stil:</strong> Essayistisk og reflekterande. Ho stiller spørsmål
        meir enn ho gjev svar, og brukar konkrete kvardagsbilete for å snakke om
        store spørsmål.</p>

        <p><strong>Kjende verk:</strong></p>
        <ul>
          <li><em class="nn">Mellom oss sagt</em> (2006): roman.</li>
          <li><em class="nn">Samtidsruinar</em> (2008): essaysamling om kva som blir att
              etter industrisamfunna.</li>
          <li><em class="nn">Alt inkludert</em> (2015): roman.</li>
          <li><em class="nn">Team Tuva</em> (2021): roman.</li>
        </ul>
      `,
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva kjenneteiknar tekstane til Marit Eikemo?",
      options: ["Dei er essayistiske og stiller spørsmål om samtida, gjerne med konkrete kvardagsbilete.","Dei er reiseskildringar frå 1800-talet.","Dei er skodespel utan dialog.","Dei handlar om Juvik-folket."],
      correct: 0,
      explanation: "Eikemo skriv både skjønnlitteratur og sakprosa, nært på det som skjer med oss og kulturen akkurat no, og stiller spørsmål meir enn ho gjev svar.",
    },
    {
      type: "lesson",
      title: "9. Olaug Nilssen (1977–)",
      content: `
        <figure class="figur portrett">
          <img src="bilete/nilssen.jpg" alt="Portrett av Olaug Nilssen" loading="lazy">
          <figcaption>Olaug Nilssen. Foto: Olav Helland (CC BY-SA 4.0).</figcaption>
        </figure>
        <p><strong>Frå:</strong> Førde i Sunnfjord.<br>
        <strong>Yrke:</strong> Forfattar og dramatikar.</p>

        <p>Olaug Nilssen er ein av dei sterkaste samtidsstemmene på nynorsk. Ho skriv
        ofte rått og personleg, om ting som ikkje er lette å skrive om: psykisk
        helse, foreldreskap, kjønn, omsorg.</p>

        <p><strong>Stil:</strong> Direkte, ærleg, somme gonger humoristisk, somme
        gonger smerteleg. Ho stiller spørsmål ved kva som er «normalt» og kven som
        får setje grensene.</p>

        <p><strong>Kjende verk:</strong></p>
        <ul>
          <li><em class="nn">Få meg på, for faen</em> (2005): roman om ungdom og
              seksualitet. Vart òg film.</li>
          <li><em class="nn">Tung tids tale</em> (2017): roman om å vere mor til
              ein son med autisme. Brageprisen.</li>
          <li><em class="nn">Yt etter evne, få etter behov</em> (2020): roman om
              omsorg, plikt og kva ein familie orkar å bere.</li>
        </ul>

        <div class="callout">
          <strong>Visste du?</strong> Tittelen <em class="nn">«Tung tids tale»</em>
          er ein medviten referanse til Halldis Moren Vesaas sitt dikt frå 1945.
          Nilssen seier at det no òg er ei tung tid for mange foreldre.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Tittelen <em class=\"nn\">Tung tids tale</em> (2017) er ein medviten referanse. Til kva?",
      options: ["Ein roman av Jon Fosse.","Ei vise av Vinje.","Diktet til Halldis Moren Vesaas frå 1945.","Tittelen på ei avis frå Odda."],
      correct: 2,
      explanation: "Nilssen lånte tittelen frå diktet til Halldis Moren Vesaas, og seier at det no òg er ei tung tid for mange foreldre. Romanen handlar om å vere mor til ein son med autisme, og fekk Brageprisen.",
    },
    {
      type: "exercise",
      exerciseType: "categorize",
      title: "Til slutt: kven høyrer til kva tid?",
      question: "Sorter forfattarane etter når dei levde. Årstala står i overskriftene over, så bla gjerne tilbake:",
      categories: {
        "1800-talet": ["Aasmund Olavsson Vinje", "Arne Garborg"],
        "Tidleg 1900-tal": ["Olav Duun", "Tarjei Vesaas", "Halldis Moren Vesaas"],
        "Samtid (fødd etter 1950)": ["Jon Fosse", "Frode Grytten", "Marit Eikemo", "Olaug Nilssen"],
      },
      explanation: "Garborg og Vinje var sentrale på 1800-talet då nynorsken vart bygd opp. Duun og dei to Vesaas-forfattarane prega 1900-talet. Fosse, Grytten, Eikemo og Nilssen skriv i dag.",
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Vel ein forfattar du vil lese meir av",
      question: "Sjå tilbake på dei ni forfattarane. Vel éin du har lyst til å lese ein ekte tekst av, og forklar kvifor. Skriv 80–150 ord.",
      minWords: 80,
      checklist: [
        "Namngi forfattaren.",
        "Nemn minst eitt konkret verk du vil lese.",
        "Forklar kvifor (stil, tema, samanheng med tekst du las i lesetreningsmodulen, eller anna).",
        "Skriv på nynorsk.",
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Stikk innom biblioteket eller nettet",
      question: "Finn éin ekte tekst skriven av ein av forfattarane, og les han. Skriv eit kort referat (60–120 ord) av kva teksten handla om, og samanlikn han med kva du hadde venta ut frå skildringa i denne modulen.<br><br><strong>Her går du rett til tekstane:</strong><ul><li>Vinje: <a href=\"https://www.bokselskap.no/forfattere/vinje\" target=\"_blank\" rel=\"noopener\">alle verka gratis hjå bokselskap.no</a>, til dømes diktet <a href=\"https://no.wikisource.org/wiki/Ved_Rundarne_(1864)\" target=\"_blank\" rel=\"noopener\">«Ved Rundarne»</a></li><li>Garborg: <a href=\"https://www.bokselskap.no/forfattere/garborg\" target=\"_blank\" rel=\"noopener\">alle verka gratis hjå bokselskap.no</a>, til dømes <a href=\"https://www.bokselskap.no/boker/bondestudentar1utg/i\" target=\"_blank\" rel=\"noopener\">«Bondestudentar»</a></li><li>Duun: <a href=\"https://www.bokselskap.no/forfattere/duun\" target=\"_blank\" rel=\"noopener\">alle verka gratis hjå bokselskap.no</a>, til dømes <a href=\"https://www.bokselskap.no/boker/juvikingar/fra-gammalt-av\" target=\"_blank\" rel=\"noopener\">«Juvikingar»</a></li><li>Tarjei Vesaas: <a href=\"https://www.nb.no/items/e29c53bfc2df62f380d47026aece939d\" target=\"_blank\" rel=\"noopener\">«Is-slottet»</a> eller <a href=\"https://www.nb.no/items/858f48335cdd3e4b0ed6b5f180041885\" target=\"_blank\" rel=\"noopener\">«Fuglane»</a></li><li>Halldis Moren Vesaas: <a href=\"https://www.nb.no/items/4d2650a1f63fe15022d4b35e6de4f973\" target=\"_blank\" rel=\"noopener\">«Tung tids tale»</a></li><li>Jon Fosse: <a href=\"https://www.nb.no/items/de8649c24e8bb97d7e73fb1f65af842a\" target=\"_blank\" rel=\"noopener\">«Morgon og kveld»</a></li><li>Frode Grytten: <a href=\"https://www.nb.no/items/5da13cdfb598391234f0d92d8d46d1bf\" target=\"_blank\" rel=\"noopener\">«Bikubesong»</a></li><li>Marit Eikemo: <a href=\"https://www.nb.no/items/8652b8b376b75414f12657124acb0969\" target=\"_blank\" rel=\"noopener\">«Her, no»</a></li><li>Olaug Nilssen: <a href=\"https://www.nb.no/items/a0537db137e7903470f85578c2209ab3\" target=\"_blank\" rel=\"noopener\">«Få meg på, for faen»</a></li></ul>",
      hint: "Bokselskap.no er gratis for alle. Nettbiblioteket (nb.no) er gratis utan innlogging, men du må sitje i Noreg, og du kan lese utan å laste ned. Du treng ikkje lese heile boka: eit dikt, eit kapittel eller nokre sider held.",
      minWords: 60,
      checklist: [
        "Skriv kva tekst du har lese, og av kven.",
        "Kort referat: kva handla teksten om?",
        "Stemde han med det du hadde venta?",
        "Skriv på nynorsk.",
      ],
    },
  ],
});

Modules.register({
  id: "lesing-vinje",
  part: 5,
  title: "«Med toget over vidda»",
  summary: "Reiseskildring skriven for kurset i stilen til Vinje. Modulen har òg eit ekte dikt av han.",
  estimatedMinutes: 40,
  sections: [
    {
      type: "lesson",
      title: "Om teksten",
      content: `
        <p><strong>Aasmund Olavsson Vinje</strong> var journalist, dikter og reiseskildrar, og
        den første som verkeleg brukte landsmålet til noko anna enn ordlister. Han gav ut bladet
        <em class="nn">Dølen</em>, som han skreiv mest sjølv, og reiseboka
        <em class="nn">Ferdaminne fraa Sumaren 1860</em>.</p>
        <p>Stilen hans var observant og ironisk. Han blanda høgt og lågt på ein måte som var ny
        i norsk skrift, og kunne skifte frå filosofisk refleksjon til ein vits om kva han åt på
        krua.</p>

        <figure class="figur halv">
          <img src="bilete/finse-1909.jpg" alt="Svart-kvitt fotografi av jernbanelina over snødekt høgfjell ved Finse" loading="lazy">
          <figcaption>Bergensbanen ved Finse i 1909, same året som banen opna. Foto: Anders Beer Wilse (CC0).</figcaption>
        </figure>
        <h3>Sjå etter dette når du les</h3>
        <ul>
            <li>Kva forteljaren <em>ser</em>, og kva han <em>tenkjer</em> om det han ser.</li>
            <li>Stader der teksten skiftar frå det konkrete til det allmenne.</li>
            <li>Den lune, litt sjølvironiske tonen.</li>
        </ul>

        <h3>Slik les du</h3>
        <ol>
          <li>Les teksten ein gong gjennom utan å stoppe opp.</li>
          <li>Les han ein gong til, no sakte, og tenk gjennom kva som faktisk står der.</li>
          <li>Svar på spørsmåla. Bruk gjerne teksten medan du svarar.</li>
        </ol>
        <p>Spørsmåla er av to typar: fleirval med fasit, og friskrift der du formulerer eit
        kort svar sjølv. På friskrift kan du klikke fram eit dømesvar etter at du har skrive
        ditt eige.</p>

        <div class="callout warn">
          <strong>To tekstar i denne modulen.</strong> Den første er skriven for dette
          kurset, i stilen til Vinje, så du kan øve på moderne nynorsk. Den andre er
          diktet «Ved Rundarne» frå 1864, skriven av Vinje sjølv, i original staving med ordliste.
          Les dei i den rekkjefølgja dei står.
        </div>

        <div class="callout">
          <strong>Vil du lese ekte tekstar av Aasmund Olavsson Vinje (1818–1870)?</strong>
          <p>Vinje døydde i 1870, så alt han skreiv er fritt tilgjengeleg. Du kan lese
        <em class="nn">Ferdaminni</em> og dikta hans gratis hjå
        <a href="https://www.bokselskap.no/forfattere/vinje" target="_blank" rel="noopener">bokselskap.no</a>.
        Merk at han skreiv landsmål slik det såg ut i 1861, med former som
        <em class="nn">ikki</em>, <em class="nn">fyrr</em> og store bokstavar i substantiva.</p>
          <p>Meir om forfattaren i modulen
          <a href="modul.html?id=nynorskforfattarane">Møt nynorskforfattarane</a>.</p>
        </div>
      `,
    },
    {
      type: "reading",
      title: "Les teksten: «Med toget over vidda»",
      passage: `
        <p>Det er noko underleg med å sitje på eit tog og sjå Noreg gli forbi vindauget.
        Eg har sett vidda mange gonger, men kvar gong ho viser seg på nytt, kjenner eg
        meg som ein framand i mitt eige land.</p>

        <p>Ein gut på kanskje seks år sit ved sida av meg og peikar. «Mor, kva er det
        der?» Han spør om eit reinsdyr, eit fjell, ein liten innsjø. Mora hans svarar
        tolmodig, men det er tydeleg at ho sjølv ikkje veit alt. Slik er det med oss
        vaksne òg: vi gjev svar med stødig stemme, sjølv om vi berre delvis veit kva
        vi snakkar om.</p>

        <p>Toget bremsar inn på Finse. «Vi er på Noregs tak», seier konduktøren
        over høgtalaren, og folk reiser seg for å fotografere kvarandre framfor
        stasjonsskiltet. To engelskmenn står med ryggsekkar like store som dei sjølve.
        Dei skal gå over vidda til Aurland, høyrer eg, fire dagar i raude jakker
        mellom kvite stein.</p>

        <p>«Trur du dei klarer det?» spør guten.<br>
        «Sikkert», seier mora.</p>

        <p>Eg sit att med ein liten tanke om at det er noko fint med eit folk som
        framleis går til fots over fjellet. Vi har bilar og fly og hurtigbåtar, og
        likevel finn ein engelskmann ut at det beste han kan gjere i Noreg, er å gå.
        Kanskje han skjønar noko vi har gløymt.</p>

        <p>Lokomotivet plystrar. Vidda opnar seg igjen, og eg ser etter reinsdyr. Det
        er for varmt i dag, seier ein eldre mann i setet bak. Dei held seg i skuggen.
        Vi ser ingen, berre stein og lav og himmel.</p>

        <p>Når vi når Myrdal, har guten sovna. Mora pakkar saman appelsinskal og
        leikar. Toget rullar nedover, og det luktar plutseleg sjø. Slik er Noreg: ein
        dag er du på vidda, neste augneblink kjenner du tang frå fjorden.</p>
      `,
      questions: [
        {
          type: "multipleChoice",
          question: "Kva tenkjer forteljaren om dei to engelskmennene?",
          options: [
            "At dei ser rare ut i raude jakker.",
            "At det er noko fint med at dei vil gå over vidda til fots.",
            "At dei ikkje kjem til å klare turen.",
            "At dei burde tatt toget heile vegen.",
          ],
          correct: 1,
        },
        {
          type: "multipleChoice",
          question: "Korleis omtalar konduktøren stasjonen på Finse?",
          options: [
            "Som «midt i Noreg».",
            "Som «den høgaste stasjonen i Europa».",
            "Som «Noregs tak».",
            "Som «porten til vidda».",
          ],
          correct: 2,
        },
        {
          type: "freeShort",
          question: "Kva trur du forteljaren meiner med setninga «vi gjev svar med stødig stemme, sjølv om vi berre delvis veit kva vi snakkar om»?",
          modelAnswer: "Forteljaren peikar på at vaksne ofte verkar sikre sjølv om dei eigentleg ikkje veit alt. Vi spelar ei rolle som kunnskapsrike for borna, og kanskje for kvarandre, sjølv om vi er meir usikre enn vi vil seie.",
        },
        {
          type: "freeShort",
          question: "Skildra stemninga i teksten med eigne ord. Bruk to til tre setningar.",
          modelAnswer: "Stemninga er roleg, observerande og litt ettertenksam. Forteljaren ser ut av vindauget og legg merke til små ting, både ute i landskapet og inne i kupéen, utan å vere oppskrudd eller dramatisk.",
        },
      ],
    },
    {
      type: "reading",
      title: "Ekte tekst: «Ved Rundarne» (1864)",
      passage: `
        <div class="callout warn">
          <strong>Dette er Vinje sine eigne ord.</strong> Diktet stod i
          <em class="nn">Diktsamling</em> (1864), og er kanskje det mest kjende diktet på
          nynorsk. Stavinga er original, slik Vinje skreiv landsmål for over 160 år sidan:
          substantiva har stor bokstav, og mange ord ser framande ut. Les det sakte, gjerne
          høgt. Ordlista under hjelper deg.
        </div>

        <p><em class="nn">No seer eg atter slike Fjell og Dalar,<br>
        som deim eg i min fyrste Ungdom saag,<br>
        og sama Vind den heite Panna svalar;<br>
        og Gullet ligg paa Snjo, som før det laag.<br>
        Det er eit Barnemaal, som til meg talar,<br>
        og gjer meg tankefull, men endaa fjaag.<br>
        Med Ungdomsminne er den Tala blandad:<br>
        det strøymer paa meg, so eg knapt kan anda.</em></p>

        <p><em class="nn">Ja, Livet strøymer paa meg, som det strøymde,<br>
        naar under Snjo eg saag det grøne Straa.<br>
        Eg drøymer no, som før eg altid drøymde,<br>
        naar slike Fjell eg saag i Lufti blaa.<br>
        Eg gløymer Dagsens Strid, som før eg gløymde,<br>
        naar eg mot Kveld av Sol eit Glimt fekk sjaa.<br>
        Eg finner vel eit Hus, som vil meg hysa,<br>
        naar Soli heim til Notti vil meg lysa.</em></p>

        <p><em class="nn">Alt er som før, men det er meir forklaarat,<br>
        so Dagsens Ljos meg synes meire bjart,<br>
        og det, som beit og skar meg, so det saarat,<br>
        det gjerer sjølve Skuggen mindre svart;<br>
        sjølv det, som til at synda tidt meg daarat,<br>
        sjølv det gjer harde Fjellet mindre hardt.<br>
        Forsonad’ koma atter gamle Tankar;<br>
        det sama Hjarta er, som eldre bankar.</em></p>

        <p><em class="nn">Og hver ein Stein eg som ein Kjenning finner,<br>
        for slik var den, eg flaug ikring som Gut.<br>
        som det var Kjempur, spyr eg, hvem som vinner<br>
        av den og denne andre haage Nut.<br>
        Alt minner meg; det minner, og det minner,<br>
        til Soli burt i Snjoen sloknar ut.<br>
        Og inn i siste Svevn meg eingong huggar<br>
        dei gamle Minne og dei gamle Skuggar.</em></p>

        <h3>Ordliste</h3>
        <table>
          <thead><tr><th>I teksten</th><th>I dag</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">seer</em></td><td>ser</td></tr>
            <tr><td><em class="nn">deim</em></td><td>dei</td></tr>
            <tr><td><em class="nn">saag</em></td><td>såg</td></tr>
            <tr><td><em class="nn">sama</em></td><td>same</td></tr>
            <tr><td><em class="nn">svalar</em></td><td>kjøler</td></tr>
            <tr><td><em class="nn">Snjo</em></td><td>snø</td></tr>
            <tr><td><em class="nn">Barnemaal</em></td><td>morsmål, barnespråk</td></tr>
            <tr><td><em class="nn">fjaag</em></td><td>glad, oppglødd</td></tr>
            <tr><td><em class="nn">anda</em></td><td>puste</td></tr>
            <tr><td><em class="nn">altid</em></td><td>alltid</td></tr>
            <tr><td><em class="nn">hysa</em></td><td>gi hus, ta imot</td></tr>
            <tr><td><em class="nn">Notti</em></td><td>natta</td></tr>
            <tr><td><em class="nn">forklaarat</em></td><td>gjort klarare</td></tr>
            <tr><td><em class="nn">bjart</em></td><td>lyst</td></tr>
            <tr><td><em class="nn">daarat</em></td><td>dåra, lokka</td></tr>
            <tr><td><em class="nn">hver</em></td><td>kvar</td></tr>
            <tr><td><em class="nn">hvem</em></td><td>kven</td></tr>
            <tr><td><em class="nn">haage Nut</em></td><td>høge fjelltoppen</td></tr>
            <tr><td><em class="nn">huggar</em></td><td>trøystar</td></tr>
          </tbody>
        </table>

        <p class="muted">Kjelde: <em class="nn">Diktsamling</em>, J. W. Cappelens Forlag 1864,
        s. 161–162, etter transkripsjonen på
        <a href="https://no.wikisource.org/wiki/Ved_Rundarne_(1864)" target="_blank" rel="noopener">Wikikilden</a>.
        Teksten er fri, sidan Vinje døydde i 1870.</p>
      `,
      questions: [
        {
          type: "multipleChoice",
          question: "Kva er situasjonen i diktet?",
          options: [
            "Forteljaren ser att eit fjellandskap han kjende i ungdomen",
            "Forteljaren ser eit landskap for aller første gong",
            "Forteljaren drøymer om eit land han aldri har vore i",
          ],
          correct: 0,
        },
        {
          type: "multipleChoice",
          question: "Kva ligg i linja «Alt er som før, men det er meir forklaarat»?",
          options: [
            "Landskapet er det same, men forteljaren forstår det betre no",
            "Landskapet har endra seg mykje sidan sist han var der",
            "Nokon har forklart landskapet for forteljaren",
          ],
          correct: 0,
        },
        {
          type: "freeShort",
          question: "«Det er eit Barnemaal, som til meg talar.» Kva trur du Vinje meiner med at landskapet talar eit barnespråk til han?",
          modelAnswer: "Landskapet snakkar til han på det språket han hadde som barn, altså minna og kjenslene frå oppveksten. Fjella seier ikkje noko med ord, men dei vekkjer noko i han som han kjenner att heilt innanfrå, og som ligg djupare enn vaksne tankar.",
        },
        {
          type: "freeShort",
          question: "Samanlikn dette diktet med «Med toget over vidda», som du las tidlegare i modulen. Kva gjer begge tekstane med forholdet mellom det ein ser og det ein tenkjer?",
          modelAnswer: "Begge startar i noko heilt konkret, eit fjellandskap sett frå eit tog eller frå ein veg, og lèt synet føre til ein tanke om noko større: kven vi er, kva vi hugsar, kva vi ikkje veit. Skilnaden er at diktet er tettare og meir høgtidleg, medan kursteksten er lausare i tonen og har med replikkar og humor.",
        },
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Skriv: di eiga reiseskildring",
      question: "Skriv ei kort reiseskildring (150–250 ord) frå ei reise du har gjort, kort eller lang. Bland det du såg med det du tenkte, slik Vinje gjer.",
      hint: "Ei reiseskildring er ikkje ei ruteliste. Vel ut nokre få ting du la merke til, og la tankane henge seg på dei.",
      minWords: 150,
      checklist: [
        "Skriv i eg-form.",
        "Ta med minst tre konkrete ting du såg, høyrde eller lukta.",
        "La minst éin av observasjonane føre til ein tanke om noko større.",
        "Prøv deg på ein lun eller sjølvironisk kommentar.",
        "Skriv på nynorsk.",
      ],
    },
  ],
});

Modules.register({
  id: "lesing-garborg",
  part: 5,
  title: "«Heim att»",
  summary: "Lengre forteljing om ein heimkomst, skriven for kurset i stilen til Garborg. Modulen har òg eit ekte utdrag av han.",
  estimatedMinutes: 50,
  sections: [
    {
      type: "lesson",
      title: "Om teksten",
      content: `
        <p><strong>Arne Garborg</strong> var sosialrealistisk og psykologisk, og blant dei
        første som skreiv om indre liv på nynorsk: kjenslene, tankane og sjølvransakinga til
        vanlege folk. I <em class="nn">Bondestudentar</em> (1883) skreiv han om unge bondegutar
        som kjem til byen, og i <em class="nn">Haugtussa</em> (1895) om jenta Veslemøy.</p>

        <figure class="figur halv">
          <img src="bilete/kielland-jaeren.jpg" alt="Måleri av eit flatt, ope landskap på Jæren med lyng, steinar og ein låg himmel" loading="lazy">
          <figcaption>«Fra Jæren» av Kitty Kielland, 1878. Garborg voks opp på Jæren, og landskapet går att i mange av bøkene hans (offentleg eigedom).</figcaption>
        </figure>
        <h3>Sjå etter dette når du les</h3>
        <ul>
            <li>Kor lite som blir sagt høgt, og kor mykje som ligg under.</li>
            <li>Korleis kjenslene til Anders kjem fram gjennom det han legg merke til.</li>
            <li>Setninga om at når noko var stort, sa ein lite.</li>
        </ul>

        <h3>Slik les du</h3>
        <ol>
          <li>Les teksten ein gong gjennom utan å stoppe opp.</li>
          <li>Les han ein gong til, no sakte, og tenk gjennom kva som faktisk står der.</li>
          <li>Svar på spørsmåla. Bruk gjerne teksten medan du svarar.</li>
        </ol>
        <p>Spørsmåla er av to typar: fleirval med fasit, og friskrift der du formulerer eit
        kort svar sjølv. På friskrift kan du klikke fram eit dømesvar etter at du har skrive
        ditt eige.</p>

        <div class="callout warn">
          <strong>To tekstar i denne modulen.</strong> Den første er skriven for dette
          kurset, i stilen til Garborg, så du kan øve på moderne nynorsk. Den andre er
          eit utdrag frå «Bondestudentar» frå 1883, skriven av Garborg sjølv, i original staving med ordliste.
          Les dei i den rekkjefølgja dei står.
        </div>

        <div class="callout">
          <strong>Vil du lese ekte tekstar av Arne Garborg (1851–1924)?</strong>
          <p>Garborg døydde i 1924, så alt han skreiv er fritt tilgjengeleg. Heile
        <em class="nn">Bondestudentar</em>, <em class="nn">Fred</em> og
        <em class="nn">Haugtussa</em> ligg gratis hjå
        <a href="https://www.bokselskap.no/forfattere/garborg" target="_blank" rel="noopener">bokselskap.no</a>.
        Språket er landsmål frå 1880- og 1890-talet, og ligg nærare moderne nynorsk enn Vinje
        gjer, men er framleis eldre enn det du skriv sjølv.</p>
          <p>Meir om forfattaren i modulen
          <a href="modul.html?id=nynorskforfattarane">Møt nynorskforfattarane</a>.</p>
        </div>
      `,
    },
    {
      type: "reading",
      title: "Les teksten: «Heim att»",
      passage: `
        <p>Han hadde ikkje vore heime på fire år. Då han steig av bussen i bygda, var
        det første han la merke til, at det lukta annleis enn han hugsa. Tang og
        granskog og noko anna, noko han ikkje fekk tak i.</p>

        <p>Anders sette frå seg ryggsekken på stasjonen og såg seg om. Bygda låg der ho
        låg. Tre nye hus oppe i bakken. Men dei gamle, dei var som før. Butikken på
        hjørnet var open. Skiltet på frisørsalongen var det same. Berre dei nye
        målestrøka var ulike.</p>

        <p>Han hadde studert i Oslo. Sosialantropologi. Han hadde tenkt at det skulle
        vere noko som opna verda for han, og det hadde det vore òg, ein periode. Men i
        fjor hadde noko knekt. Han fekk dårlege karakterar i to fag, han slutta å gå på
        førelesingar, han låg i senga frå klokka sju om morgonen til klokka to om
        ettermiddagen. Mor ringde kvar søndag, og han fortalde at alt var bra.</p>

        <p>No skulle han heim eit halvår. Det var ikkje noko han ville fortelje folk.
        Han skulle berre vere her ei stund. Hjelpe far med fjøsen. Lese litt. Tenkje.
        Det var ord han hadde brukt overfor seg sjølv mange gonger, og han kjende at
        dei vart tynnare for kvar gong.</p>

        <p>Mor stod i kjøkenet då han kom inn. Ho sette frå seg kaffekoppen, kom mot
        han, og klemde han lenge utan å seie noko. Det var akkurat det han hadde grua
        seg til og lengta etter på same tid: at ho ikkje skulle spørje. At ho berre
        skulle klemme.</p>

        <p>«Eg har laga grøt», sa ho.<br>
        «Eg er ikkje særleg svolten.»<br>
        «Du må ete litt.»</p>

        <p>Han åt litt. Ho såg på han over bordet, og han kjende auga hennar over heile
        andletet, og han ville sjå opp og smile, men han klarte ikkje.</p>

        <p>Far kom inn etter ein halvtime. «Du er heime», sa han.<br>
        «Ja.»<br>
        «Det var fint.»</p>

        <p>Far gjekk ut att. Det var ikkje mangel på kjærleik. Det var berre måten dei
        var her, alle saman. Når noko var stort, sa ein lite. Når noko var lite, sa ein
        meir. Det var ein logikk Anders hadde dyrka inn i seg som ung, og som han no
        skjøna at han kanskje hadde teke med seg som ein sjukdom inn i livet i byen,
        der folk venta at ein skulle snakke om det viktige.</p>

        <p>Den første natta sov han ikkje. Han låg og høyrde fjøsen. Kyrne snufsa. Ein
        hund glefsa langt borte. Han høyrde elva bak låven, ho som hadde rensa
        kveldsdusta i alle hans somrar. Det var ein lyd som var så velkjend at han
        hadde gløymt at han var der.</p>

        <p>Klokka fem reiste han seg, kledde på seg dei gamle arbeidskleda som hang i
        gangen, og gjekk ut til far. Far snudde seg på fjøsdøra.<br>
        «Du er tidleg ute.»<br>
        «Eg fekk ikkje sove.»</p>

        <p>Far nikka. Det vart ikkje sagt meir. Dei stelte saman. Anders kjende at
        ryggen hugsa det. Bøttene, mjølkemaskina, fôret. Det var som om kroppen hans
        hadde halde på desse rørslene i fire år, venta på at han skulle kome attende og
        bruke dei.</p>

        <p>Då dei var ferdige, sat dei på stabburet og åt brød med ost. Sola kom opp.
        Anders kjende noko som han ikkje hadde kjent på lenge: at han var her, og berre
        her, og at det var nok ein augneblink.</p>

        <p>«Du må gjerne bli», sa far utan å sjå på han. «Så lenge du vil.»<br>
        «Eg veit ikkje kva eg vil.»<br>
        «Det treng du ikkje vite enno.»</p>

        <p>Det var det dei sa om saka. Anders såg ut over enga. Han tenkte: kanskje eg
        blir verande. Kanskje eg reiser igjen. Han visste ikkje. Men for første gong
        sidan i fjor haust, var det å ikkje vite ikkje ein vond ting. Det var berre ein
        ting. Han kunne leve med det ei stund.</p>
      `,
      questions: [
        {
          type: "multipleChoice",
          question: "Kvifor kjem Anders heim?",
          options: [
            "For å hjelpe far med innhausting.",
            "For å arbeide som lærar i bygda.",
            "Han har slita psykisk i Oslo og treng å vere ein stad han kjenner.",
            "Han har fått sparken frå studiet.",
          ],
          correct: 2,
        },
        {
          type: "multipleChoice",
          question: "Korleis tek mor mot han?",
          options: [
            "Med mange spørsmål om kvifor han er heime.",
            "Med stille klem og mat.",
            "Med sinne.",
            "Ho er ikkje heime.",
          ],
          correct: 1,
        },
        {
          type: "multipleChoice",
          question: "Kva gjer fjøsarbeidet med Anders?",
          options: [
            "Han blir lei og slit med å hugse korleis det skal gjerast.",
            "Han kjenner at kroppen hugsar arbeidet, og det gir ein ro.",
            "Han forstår at han aldri vil arbeide i fjøsen att.",
            "Han krangler med far.",
          ],
          correct: 1,
        },
        {
          type: "freeShort",
          question: "Forklar med eigne ord setninga «Når noko var stort, sa ein lite. Når noko var lite, sa ein meir.»",
          modelAnswer: "Setninga seier noko om kommunikasjonsmønsteret i familien: dei store, viktige tinga snakkar dei nesten ikkje om. Dei vert berre der, underforstått. Småtinga kan dei prate om i det uendelege. Det er ein måte å takle alvor på, men det kan òg gjere det vanskeleg å seie det viktige når ein verkeleg treng det.",
        },
        {
          type: "freeShort",
          question: "Korleis vil du skildre Anders som person, ut frå det vi får vite i teksten?",
          modelAnswer: "Anders verkar reflektert og litt sliten. Han har høge tankar om seg sjølv og det han skulle bli i Oslo, men han er òg ærleg om at noko har knekt. Han er stille, har vanskeleg for å seie kva han kjenner, men han tenkjer mykje. Han ser ut til å finne ein liten ro på garden.",
        },
      ],
    },
    {
      type: "reading",
      title: "Ekte tekst: frå «Bondestudentar» (1883)",
      passage: `
        <div class="callout warn">
          <strong>Dette er Garborg sine eigne ord.</strong> Utdraget er frå første kapittel i
          <em class="nn">Bondestudentar</em> (1883). Daniel er ein bondegut som drøymer om å
          bli prest. Stavinga er original landsmål frå 1883: substantiva har stor bokstav, og
          <em class="nn">aa</em> står der vi skriv <em class="nn">å</em> i dag.
        </div>

        <p><em class="nn">Det var ei Soga, som vart fortald med slikt eit Aalvor og slik ein
        Age, som galdt det ein Oskefot, som hadde vunnet eit Kongerike. Og kvar Gong dei kom
        til det, at «no var han Prest og hadde kanskje sine 600 Dalar um Aaret», so lyddest
        det for Daniel som Lurtonar, som lokkad han ut til store Eventyr. Skulde slikt kunna
        henda med honom –? Den Presteskulen var so fælt dyr. Sjølve Jo Kleppe, som no var slik
        ein Riking, døydde som Fant tilslutt, sagde dei, fordi han hadde kostat so mykje ut
        paa Sonen. Og Far, han var nok ikkje nokon Riking, han. – Der var smaae Voner.</em></p>

        <p><em class="nn">Men meir og meir drøymde Daniel um Presteskulen, og meir og meir
        trudde han, at Vaarherre vilde hjelpa han dit. Det kunde snart koma Raad og Hjelp,
        naar han fyrst vilde.</em></p>

        <p><em class="nn">Og det hende tidt nok, at Folk gav desse hans Draumar Næring. «Det
        kunde verta nokot stort av den Guten», fekk han stundom høyra at den elder den hadde
        sagt, «berre det var nokon, som vilde halda han paa Skular». Nokot stort! – Det maatte
        vera Prest, det.</em></p>

        <h3>Ordliste</h3>
        <table>
          <thead><tr><th>I teksten</th><th>I dag</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">Soga</em></td><td>soge, forteljing</td></tr>
            <tr><td><em class="nn">Aalvor</em></td><td>alvor</td></tr>
            <tr><td><em class="nn">Age</em></td><td>age, respekt</td></tr>
            <tr><td><em class="nn">Oskefot</em></td><td>oskeladd</td></tr>
            <tr><td><em class="nn">vunnet</em></td><td>vunne</td></tr>
            <tr><td><em class="nn">lyddest det</em></td><td>lydde det, høyrdest det ut</td></tr>
            <tr><td><em class="nn">Lurtonar</em></td><td>lurtonar, lokketonar</td></tr>
            <tr><td><em class="nn">lokkad</em></td><td>lokka</td></tr>
            <tr><td><em class="nn">honom</em></td><td>han</td></tr>
            <tr><td><em class="nn">Fant</em></td><td>fattig omstreifar</td></tr>
            <tr><td><em class="nn">Riking</em></td><td>rik mann</td></tr>
            <tr><td><em class="nn">Voner</em></td><td>voner, håp</td></tr>
            <tr><td><em class="nn">um</em></td><td>om</td></tr>
            <tr><td><em class="nn">nokot</em></td><td>noko</td></tr>
            <tr><td><em class="nn">elder</em></td><td>eller</td></tr>
            <tr><td><em class="nn">stundom</em></td><td>av og til</td></tr>
            <tr><td><em class="nn">verta</em></td><td>bli</td></tr>
            <tr><td><em class="nn">tidt</em></td><td>ofte</td></tr>
          </tbody>
        </table>

        <p class="muted">Kjelde: <em class="nn">Bondestudentar</em>, første utgåva 1883,
        kapittel I, etter teksten hjå
        <a href="https://www.bokselskap.no/boker/bondestudentar1utg/i" target="_blank" rel="noopener">bokselskap.no</a>.
        Teksten er fri, sidan Garborg døydde i 1924.</p>
      `,
      questions: [
        {
          type: "multipleChoice",
          question: "Kva drøymer Daniel om?",
          options: [
            "Å kome inn på presteskulen og bli prest",
            "Å overta garden etter faren",
            "Å reise til Amerika og bli rik",
          ],
          correct: 0,
        },
        {
          type: "multipleChoice",
          question: "Kvifor er draumen vanskeleg å nå?",
          options: [
            "Presteskulen er svært dyr, og faren hans er ikkje rik",
            "Daniel er for gammal til å byrje på skule",
            "Presten i bygda vil ikkje anbefale han",
          ],
          correct: 0,
        },
        {
          type: "freeShort",
          question: "Folk fortel om presten «med slikt eit Aalvor og slik ein Age, som galdt det ein Oskefot, som hadde vunnet eit Kongerike». Kva fortel denne samanlikninga om bygda Daniel veks opp i?",
          modelAnswer: "Å bli prest blir sett på som noko nesten eventyrleg, like utenkjeleg som at oskeladden vinn kongeriket. Det seier at avstanden mellom bondestanden og embetsstanden var enorm, og at utdanning var ein veg oppover som svært få kom seg inn på. Samtidig viser age-ordet at folk såg opp til presten med respekt og litt frykt.",
        },
        {
          type: "freeShort",
          question: "Samanlikn med «Heim att», teksten du las tidlegare i modulen. Begge handlar om ein ung mann og heimen, men retninga er ulik. Forklar.",
          modelAnswer: "Hjå Garborg går Daniel i tankane bort frå heimen og oppover, mot byen, skulen og eit anna liv. I «Heim att» kjem Anders den motsette vegen, attende til garden etter fire år i byen. Dei to tekstane er to sider av same rørsle: kva det kostar å reise ut, og kva det kostar å kome att.",
        },
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Skriv: å kome attende",
      question: "Skriv ein tekst (150–250 ord) der ein person kjem attende til ein stad han eller ho har vore borte frå. Vis kjenslene gjennom det personen legg merke til, ikkje ved å skrive rett ut kva han eller ho kjenner.",
      hint: "Regelen er streng: du får ikkje bruke orda glad, trist, redd eller sint. Alt må visast gjennom detaljar, handlingar og replikkar.",
      minWords: 150,
      checklist: [
        "Vel ein stad og gjer han konkret med tre eller fire detaljar.",
        "Ikkje skriv kva personen kjenner. Vis det.",
        "Ta med minst ein kort replikkveksling.",
        "La noko vere usagt mellom personane.",
        "Skriv på nynorsk.",
      ],
    },
  ],
});

Modules.register({
  id: "lesing-duun",
  part: 5,
  title: "«Bestefar og stormen»",
  summary: "Dramatisk forteljing om eit gardsbruk i storm, skriven for kurset i stilen til Duun. Modulen har òg eit ekte utdrag av han.",
  estimatedMinutes: 50,
  sections: [
    {
      type: "lesson",
      title: "Om teksten",
      content: `
        <p><strong>Olav Duun</strong> skreiv episk og dramatisk, om sterke karakterar som
        strir med naturen, med sine eigne kjensler og med lagnaden. Bøkene hans kan minne litt
        om islandsk sagalitteratur: det er liv og død og kamp. Hovudverket er
        <em class="nn">Juvikfolket</em> (1918–1923), ein slektsroman i seks band.</p>

        <figure class="figur halv">
          <img src="bilete/balke-storm.jpg" alt="Måleri av eit mørkt, stormfullt hav med tunge skyer og ein liten båt" loading="lazy">
          <figcaption>Storm på havet. Måleri av Peder Balke, 1870 (offentleg eigedom).</figcaption>
        </figure>
        <h3>Sjå etter dette når du les</h3>
        <ul>
            <li>Naturen som ein motstandar med eigen vilje.</li>
            <li>Kor lite personane forklarar, og kor mykje dei gjer.</li>
            <li>Augneblinken der far tek eit val utan å seie eit ord om det.</li>
        </ul>

        <h3>Slik les du</h3>
        <ol>
          <li>Les teksten ein gong gjennom utan å stoppe opp.</li>
          <li>Les han ein gong til, no sakte, og tenk gjennom kva som faktisk står der.</li>
          <li>Svar på spørsmåla. Bruk gjerne teksten medan du svarar.</li>
        </ol>
        <p>Spørsmåla er av to typar: fleirval med fasit, og friskrift der du formulerer eit
        kort svar sjølv. På friskrift kan du klikke fram eit dømesvar etter at du har skrive
        ditt eige.</p>

        <div class="callout warn">
          <strong>To tekstar i denne modulen.</strong> Den første er skriven for dette
          kurset, i stilen til Duun, så du kan øve på moderne nynorsk. Den andre er
          opninga av «Juvikingar» frå 1918, skriven av Duun sjølv, i original staving med ordliste.
          Les dei i den rekkjefølgja dei står.
        </div>

        <div class="callout">
          <strong>Vil du lese ekte tekstar av Olav Duun (1876–1939)?</strong>
          <p>Duun døydde i 1939, så verka hans vart frie i 2010. Heile
        <em class="nn">Juvikfolket</em>, <em class="nn">Medmenneske</em> og
        <em class="nn">Menneske og maktene</em> ligg gratis hjå
        <a href="https://www.bokselskap.no/forfattere/duun" target="_blank" rel="noopener">bokselskap.no</a>.
        Duun skreiv nynorsk frå 1920- og 1930-talet, med ein del trøndsk dialektfarge.</p>
          <p>Meir om forfattaren i modulen
          <a href="modul.html?id=nynorskforfattarane">Møt nynorskforfattarane</a>.</p>
        </div>
      `,
    },
    {
      type: "reading",
      title: "Les teksten: «Bestefar og stormen»",
      passage: `
        <p>Det var den haustkvelden bestefar gjekk ut etter sauene at vi forstod at han
        ikkje var den same lenger.</p>

        <p>Stormen kom inn frå nordvest, slik han alltid gjorde i oktober. Mor høyrde
        det først på vinden i pipa, ho som hadde lytta på den lyden i seksti år.<br>
        «Vi må få sauene inn», sa ho.<br>
        «Eg går», sa far.<br>
        «Eg går òg», sa eg.<br>
        «Du blir her», sa far. «Med bestefar.»</p>

        <p>Bestefar sat ved omnen. Han hadde site der mest heile dagen. Han hadde
        slutta å snakke så mykje det siste året. Det hadde kome langsamt, som ei elv
        som vart smalare og smalare. Først berre at han gløymde namn. Så at han
        gløymde kvar han var. No, somme tider, gløymde han kven vi var, mor og far
        og eg. Men ikkje sauene. Han gløymde aldri sauene.</p>

        <p>Då far hadde gått ut, reiste bestefar seg. Han gjekk til vindauget. Han stod
        der med dei tunge, gamle nevane sine på vindaugskarmen, og han såg ut.<br>
        «Sauene», sa han.<br>
        «Far er ute med dei», sa eg. «Han kjem snart att.»<br>
        Han svara ikkje. Han stod og stod.</p>

        <p>Då snudde han seg mot meg, og auga hans var klåre, klårare enn dei hadde
        vore på månader.<br>
        «Eg må òg.»<br>
        «Nei, bestefar.»<br>
        «Eg må òg, gut.»</p>

        <p>Han var raskare enn eg trudde. Han hadde alt fått på seg jakka før eg fekk
        reist meg. Sjøstøvlane. Den gamle olja.<br>
        «Bestefar, det er storm.»<br>
        «Eg veit kva storm er.»</p>

        <p>Eg sprang opp på loftet etter mor.<br>
        «Bestefar er på veg ut», sa eg.<br>
        Ho slapp glaset, det slo i golvet, og ho sprang ned.</p>

        <p>Då vi kom ned i gangen, var bestefar alt ute. Eg såg han forsvinne mellom
        låven og fjøsen. Vinden reiv i alt han nådde.</p>

        <p>Vi gjekk etter. Mor heldt meg i armen.<br>
        «Vi må hente han heim», sa ho.<br>
        «Far har sauene. Han greier seg», sa eg.<br>
        «Det er ikkje sauene eg er redd for, gut. Det er bestefar.»</p>

        <p>Bestefar gjekk mot beitet. Han gjekk så raskt at vi hadde vondt for å nå
        han. Vinden bles rett i andleta våre. Det byrja å regne òg, men i sidesprut,
        ikkje rett ned. Det var den slags regn som finn deg uansett kva du har på deg.</p>

        <p>«Far!» ropte mor. «Far!»<br>
        Han høyrde ikkje, eller han høyrde det og brydde seg ikkje. Han gjekk vidare.</p>

        <p>Då vi var ved porten, såg eg far. Han stod midt i beitet med tre sauer rundt
        seg, og han prøvde å få dei mot huset, men dei sneia på sida. Ein låg som om
        han var snubla i eit søkk.</p>

        <p>Bestefar gjekk rett mot far. Han ropte noko som eg ikkje høyrde, fordi
        vinden tok orda. Far snudde seg, såg han, og eg såg det, eit gløtt av kva
        han skulle gjere. Skulle han sende bestefar attende? Skulle han gjere det
        rette og bestemte? Eller skulle han la bestefar få vere her, i stormen, med
        sauene som han hadde gått etter i seksti år?</p>

        <p>Far sa ingenting. Han peika berre.<br>
        «Den der, far. Ho heng att i greinene.»</p>

        <p>Bestefar gjekk dit. Han bøygde seg ned, plukka sauen ut frå krattet, sette
        han på beina. Han gjorde det utan å nøle. Som om han hadde gjort det fem
        hundre gonger før, fordi han hadde det.</p>

        <p>Saman gjekk dei to, far og bestefar, med sauene framfor seg. Eg og mor
        venta ved porten. Mor heldt meg framleis i armen, men ikkje så hardt no.</p>

        <p>Då dei kom forbi oss, snudde bestefar seg mot mor.<br>
        «Du må òg ha jakka på, jenta mi.»</p>

        <p>Det var det første han hadde sagt til henne på fjorten dagar. Det var ikkje
        særleg, og det var ikkje noko klokt. Men ho byrja å gråte, mor, der ho stod,
        med regnet og vinden og alt, og eg hadde aldri sett henne gråte før.</p>

        <p>Vi fekk sauene inn. Bestefar gjekk attende til omnen sin. Tre dagar etter
        visste han ikkje lenger kvar fjøsen var.</p>

        <p>Men den kvelden, akkurat den kvelden, var han ute i stormen og redda ein
        sau. Det er den eg vil hugse han med. Ikkje stolen ved omnen. Stormen. Sauen
        i krattet. Mor som gret.</p>
      `,
      questions: [
        {
          type: "multipleChoice",
          question: "Kva er det med bestefar som har endra seg?",
          options: [
            "Han er blitt fysisk svak.",
            "Han har fått ein sjukdom som gjer at han gløymer.",
            "Han har blitt sint på familien.",
            "Han har slutta å like sauene.",
          ],
          correct: 1,
        },
        {
          type: "multipleChoice",
          question: "Kvifor blir bestefar med ut i stormen?",
          options: [
            "Han vil vise familien at han framleis er sterk.",
            "Han er forvirra og forstår ikkje kva som skjer.",
            "Han kjenner att noko han har gjort heile livet: å sjå etter sauene.",
            "Han vil flykte frå familien.",
          ],
          correct: 2,
        },
        {
          type: "multipleChoice",
          question: "Korleis reagerer far når bestefar dukkar opp i stormen?",
          options: [
            "Han kjeftar på bestefar.",
            "Han sender bestefar heim med ein gong.",
            "Han ber bestefar om å hjelpe, utan å lage ei sak ut av det.",
            "Han ignorerer bestefar.",
          ],
          correct: 2,
        },
        {
          type: "freeShort",
          question: "Kvifor trur du forteljaren vil hugse bestefar slik han var denne kvelden, og ikkje slik han elles var?",
          modelAnswer: "Den kvelden var bestefar igjen seg sjølv, den han hadde vore heile livet. Han var ein mann som tok seg av sauene, og det var det han stod for. Forteljaren vil hugse det sterke biletet av bestefar i arbeid, ikkje den stille, gløymsame gamle mannen ved omnen.",
        },
        {
          type: "freeShort",
          question: "Kva betyr det at mor græt på slutten, etter at bestefar har snakka til henne?",
          modelAnswer: "Det er ein blanding av lette og sorg. Lette over at far hennar framleis er der, ein liten augneblink. Sorg fordi ho veit at slike augneblink no er sjeldne, at han for det meste er borte, sjølv om han fysisk er hjå dei.",
        },
      ],
    },
    {
      type: "reading",
      title: "Ekte tekst: frå «Juvikingar» (1918)",
      passage: `
        <div class="callout warn">
          <strong>Dette er Duun sine eigne ord.</strong> Utdraget er opninga av
          <em class="nn">Juvikingar</em> (1918), første bandet i <em class="nn">Juvikfolket</em>.
          Her møter du den aller første juvikingen. Språket er nynorsk frå 1918 med sterk
          trøndsk dialektfarge, og ligg nærare det du skriv sjølv enn Vinje og Garborg gjer.
        </div>

        <p><em class="nn">Den første juvikingen dei veit å fortele om, var kommen sunnant,
        ifrå Sparbun eller Stoe eller kor det no var. Han heitte Per.</em></p>

        <p><em class="nn">Han hadde vore gift, vart det sagt, og havt gar og grunn, og mor si
        hadde han med seg. Kva som hadde jaga han ut, det visste Vårherre. Han bygsla seg ein
        plass under Lines. – Ein dagen kom Lines’n og krevde han etter meir pliktarbeid enn
        dei var forlikte om. Per såg berre på han. Kom gjorde han ikkje. Utpå kvelden hinka
        gamle mora hans oppover til garen, vilde råke matmora sjøl. Veit du kva dem forteler
        borti garane? sa ho. Dei seier det, at rakkjin min skal ha gullbane ditt, – forlate
        meg synda seier dei så ja. På Lines hadde dei berre ei dotter. Dagen etter kom Lines’n
        og sa dem ut; han var grov i måle åt dem. Per vart med han oppetter, og i bjørkeholte
        straks nedanfor garen tok han på husbonden sin, han knegjekk han og han saumfór han så
        det var ei synd. Lines’n tagde og tok med, han var ikkje kleinare kar; han drog seg
        heim med blodvegen etter seg.</em></p>

        <h3>Ordliste</h3>
        <table>
          <thead><tr><th>I teksten</th><th>I dag</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">fortele</em></td><td>fortelje</td></tr>
            <tr><td><em class="nn">sunnant</em></td><td>sørfrå</td></tr>
            <tr><td><em class="nn">havt gar og grunn</em></td><td>hatt gard og jord</td></tr>
            <tr><td><em class="nn">bygsla</em></td><td>leigde</td></tr>
            <tr><td><em class="nn">Ein dagen</em></td><td>ein dag</td></tr>
            <tr><td><em class="nn">forlikte om</em></td><td>samde om</td></tr>
            <tr><td><em class="nn">hinka</em></td><td>halta</td></tr>
            <tr><td><em class="nn">råke</em></td><td>treffe</td></tr>
            <tr><td><em class="nn">matmora</em></td><td>husfrua på garden</td></tr>
            <tr><td><em class="nn">sjøl</em></td><td>sjølv</td></tr>
            <tr><td><em class="nn">dem</em></td><td>dei</td></tr>
            <tr><td><em class="nn">rakkjin min</em></td><td>uslingen min</td></tr>
            <tr><td><em class="nn">gullbane ditt</em></td><td>gullbarnet ditt</td></tr>
            <tr><td><em class="nn">grov i måle</em></td><td>grov i målet, hard i tonen</td></tr>
            <tr><td><em class="nn">knegjekk</em></td><td>gjekk laus på med knea</td></tr>
            <tr><td><em class="nn">saumfór</em></td><td>gjekk grundig laus på</td></tr>
            <tr><td><em class="nn">tagde og tok med</em></td><td>sa ingenting og tok imot</td></tr>
            <tr><td><em class="nn">kleinare</em></td><td>veikare</td></tr>
            <tr><td><em class="nn">blodvegen</em></td><td>blodspor</td></tr>
          </tbody>
        </table>

        <p class="muted">Kjelde: <em class="nn">Juvikingar</em> (1918), kapittelet
        «Frå gammalt av», etter teksten hjå
        <a href="https://www.bokselskap.no/boker/juvikingar/fra-gammalt-av" target="_blank" rel="noopener">bokselskap.no</a>.
        Teksten er fri, sidan Duun døydde i 1939.</p>
      `,
      questions: [
        {
          type: "multipleChoice",
          question: "Kvifor går Per laus på husbonden sin?",
          options: [
            "Husbonden kravde meir pliktarbeid enn dei var samde om, og sa han deretter opp plassen",
            "Husbonden hadde stole frå han",
            "Husbonden nekta han å gifte seg med dottera",
          ],
          correct: 0,
        },
        {
          type: "multipleChoice",
          question: "Kva viser det at Per takkar nei når han får tilbod om å få Mærit?",
          options: [
            "Han vil ikkje ta imot noko som eit oppgjer, han vil stå på eigne bein",
            "Han likar ikkje Mærit i det heile",
            "Han har alt ei kone frå før",
          ],
          correct: 0,
        },
        {
          type: "freeShort",
          question: "«Han var ingen husmanns-larv, vilde dei vita det!» Kva fortel denne setninga om Per, og kvifor står ho heilt til slutt?",
          modelAnswer: "Ho fortel at Per set æra si over alt anna. Han er fattig og eigedomslaus, men han nektar å bli sett på som ein stakkar som kan kjøpast eller kommanderast. At setninga står til slutt gjer henne til ein konklusjon: alt han har gjort i avsnittet, valdet og neitakket, blir forklart av denne eine haldninga.",
        },
        {
          type: "freeShort",
          question: "Duun fortel svært knapt. Finn ei setning der mykje skjer på få ord, og forklar kva han oppnår ved å skrive så kort.",
          modelAnswer: "Eit døme er «Per såg berre på han. Kom gjorde han ikkje.» To korte setningar fortel både om trass, om eit maktforhold og om kva Per kjem til å gjere seinare. Ved å kutte alle forklaringar tvingar Duun lesaren til å fylle ut sjølv, og handlingane får same tørre, uunngåelege tone som i ei ættesoge.",
        },
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Skriv: naturen som motstandar",
      question: "Skriv ei dramatisk scene (150–250 ord) der naturen står imot menneska: uvêr, kulde, sjø, snø eller mørker. Noko skal stå på spel.",
      hint: "Duun let sjeldan personane forklare seg. Dei handlar, og lesaren skjønar resten. Prøv det same.",
      minWords: 150,
      checklist: [
        "Gjer det tydeleg kva som står på spel, utan å seie det rett ut.",
        "Bruk minst fem konkrete sanseinntrykk frå vêret.",
        "La personane snakke lite og gjere mykje.",
        "Ha eit vendepunkt der nokon tek eit val.",
        "Skriv på nynorsk.",
      ],
    },
  ],
});

Modules.register({
  id: "lesing-t-vesaas",
  part: 5,
  title: "«Jenta og isen»",
  summary: "Sparsam, symbolsk tekst om ei jente på isen, skriven for kurset i stilen til Tarjei Vesaas.",
  estimatedMinutes: 40,
  sections: [
    {
      type: "lesson",
      title: "Om teksten",
      content: `
        <p><strong>Tarjei Vesaas</strong> skriv sparsamt, poetisk og symbolsk. Han brukar
        enkle ord og korte setningar, men det han skriv om er ofte djupt: frykt, einsemd,
        venskap og naturen som spegel for menneskesinnet. <em class="nn">Is-slottet</em> (1963)
        og <em class="nn">Fuglane</em> (1957) er dei mest kjende bøkene hans.</p>

        <h3>Sjå etter dette når du les</h3>
        <ul>
            <li>Kor korte avsnitta er, og kva det gjer med tempoet.</li>
            <li>Isen som meir enn berre is.</li>
            <li>Alt som ikkje blir forklart.</li>
        </ul>

        <h3>Slik les du</h3>
        <ol>
          <li>Les teksten ein gong gjennom utan å stoppe opp.</li>
          <li>Les han ein gong til, no sakte, og tenk gjennom kva som faktisk står der.</li>
          <li>Svar på spørsmåla. Bruk gjerne teksten medan du svarar.</li>
        </ol>
        <p>Spørsmåla er av to typar: fleirval med fasit, og friskrift der du formulerer eit
        kort svar sjølv. På friskrift kan du klikke fram eit dømesvar etter at du har skrive
        ditt eige.</p>

        <div class="callout warn">
          <strong>Teksten er ikkje skriven av Tarjei Vesaas.</strong>
          Han er skriven for dette kurset, i stilen til forfattaren, slik at du kan øve på
          moderne nynorsk. Vil du lese ekte tekstar av forfattaren, står det under korleis.
        </div>

        <div class="callout">
          <strong>Vil du lese ekte tekstar av Tarjei Vesaas (1897–1970)?</strong>
          <p>Du kan lese bøkene til Vesaas gratis på nett gjennom Nettbiblioteket til
        <a href="https://www.nb.no" target="_blank" rel="noopener">Nasjonalbiblioteket</a>,
        som har nesten alle norske bøker gitt ut til og med 2005. Både
        <em class="nn">Is-slottet</em> og <em class="nn">Fuglane</em> ligg der. Du må vere i
        Noreg for å lese.</p>
          <p>Nedst i modulen finn du ei oppgåve som tek deg rett dit.</p>
          <p>Meir om forfattaren i modulen
          <a href="modul.html?id=nynorskforfattarane">Møt nynorskforfattarane</a>.</p>
        </div>
      `,
    },
    {
      type: "reading",
      title: "Les teksten: «Jenta og isen»",
      passage: `
        <p>Jenta gjekk åleine ut på isen.<br>
        Det var første gong i år.<br>
        Isen var ny og blank, og det knaka i han, slik ny is gjer.</p>

        <p>Ho stod stilt ei lang stund.<br>
        Stein i hand.<br>
        Slepp han.<br>
        Kanskje han ville sprekke gjennom, kanskje han ville gli og bli liggjande.<br>
        Steinen gleid og stoppa to meter framme.<br>
        Isen heldt.</p>

        <p>Då våga ho seg fram, eit steg om gongen, lyttande.<br>
        Innunder seg såg ho noko mørkt. Ein skugge. Kanskje ein fisk.<br>
        Eller ei grein som hang ned. Det skulle ikkje vere fisk her, tenkte ho. Vatnet er
        for grunt. Men kanskje.</p>

        <p>Lyset frå sola låg som ein veg over isen, like rett som om nokon hadde streka
        han opp med ein linjal.<br>
        Ho gjekk langs vegen.<br>
        Bortover.</p>

        <p>Det var stilt.<br>
        Ein måse skreik langt borte.<br>
        Snøen ved bredda var blå i skuggen, gul der sola tok.<br>
        Heile dalen heldt pusten.</p>

        <p>Då ho hadde gått så langt at huset hennar berre var ein liten prikk, snudde
        ho.<br>
        Det var som ho hadde vore på ei lang reise.<br>
        Nokon ville sjå etter henne snart, mor kanskje, eller veslesyster, og då måtte
        ho vere der.</p>

        <p>Men ho ville gjerne berre stå her ein augneblink til.<br>
        Berre kjenne at ho var åleine.<br>
        Berre ho og isen og dei mørke skuggane under.</p>

        <p>Ein dag, tenkte ho, skulle ho skrive om dette. Ho visste ikkje korleis, og
        ikkje når, men ho skulle hugse det. Den første gongen ho gjekk åleine på isen.
        Den blå snøen. Steinen som ikkje sprakk gjennom.</p>

        <p>Då snudde ho og gjekk heim, og fotspora hennar var dei einaste på isen den dagen.</p>
      `,
      questions: [
        {
          type: "multipleChoice",
          question: "Korleis verkar jenta gjennom teksten?",
          options: [
            "Redd og uroleg.",
            "Sint på mora si.",
            "Full av undring og åleine, men ikkje skremd.",
            "Keisam og lei seg.",
          ],
          correct: 2,
        },
        {
          type: "multipleChoice",
          question: "Kvifor kastar jenta ein stein på isen?",
          options: [
            "For å skremme fisken.",
            "For å teste om isen er sterk nok.",
            "Fordi ho er sint.",
            "For å sjå om steinen flyt.",
          ],
          correct: 1,
        },
        {
          type: "freeShort",
          question: "Kvifor trur du forfattaren brukar så korte avsnitt, somme tider berre éi setning per linje?",
          modelAnswer: "Dei korte avsnitta gjer at lesaren stoppar opp mellom kvart bilete. Det skapar ein roleg, nesten meditativ rytme som passar med stemninga ute på isen: det er stilt, ho går sakte, ho legg merke til ein og ein ting.",
        },
        {
          type: "freeShort",
          question: "Kva tyder setninga «Heile dalen heldt pusten» i denne samanhengen?",
          modelAnswer: "Det er eit bilete på korleis det er heilt stilt og urørleg i dalen, som om naturen sjølv ventar på noko, eller berre held seg roleg medan jenta går ut på isen for første gong.",
        },
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Skriv: berre korte setningar",
      question: "Skriv ein kort tekst (120–200 ord) om nokon som gjer noko dei er redde for. Bruk berre korte setningar og enkle ord, slik Vesaas gjer.",
      hint: "Set deg ei grense: ingen setning får vere lengre enn ti ord. Det tvingar fram Vesaas-rytmen.",
      minWords: 120,
      checklist: [
        "Ingen setning lengre enn ti ord.",
        "Bruk vanlege, enkle ord. Ingen framandord.",
        "La eit element i naturen spegle det personen kjenner.",
        "Ikkje forklar slutten.",
        "Skriv på nynorsk.",
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Les ekte Vesaas på Nettbiblioteket",
      question: "Gå til Nettbiblioteket og les byrjinga av <em class=\"nn\">Is-slottet</em> (1971) av Tarjei Vesaas: <a href=\"https://www.nb.no/items/e29c53bfc2df62f380d47026aece939d\" target=\"_blank\" rel=\"noopener\">opne boka på nb.no</a>. Les minst dei fem første sidene. Vil du heller lese <em class=\"nn\">Fuglane</em> (1957), ligg ho <a href=\"https://www.nb.no/items/858f48335cdd3e4b0ed6b5f180041885\" target=\"_blank\" rel=\"noopener\">her</a>. Skriv deretter 150–250 ord om det du las.",
      hint: "Nettbiblioteket er gratis og krev ingen innlogging, men du må sitje i Noreg. Du kan lese på skjermen, men ikkje laste ned eller skrive ut. Bla med pilene, eller skriv sidetal i feltet øvst. Finn du ikkje boka, søk på tittelen på nb.no.",
      minWords: 150,
      checklist: [
        "Skriv kva bok du valde, og omtrent kor mange sider du las.",
        "Fortel kort kva som skjer.",
        "Peik på to stiltrekk du kjenner att frå «Jenta og isen»: korte setningar, enkle ord, natur som speglar kjensler.",
        "Skriv av éi setning du la merke til, og forklar kvifor.",
        "Skriv kva som overraska deg ved å lese den ekte teksten.",
      ],
    },
  ],
});

Modules.register({
  id: "lesing-hm-vesaas",
  part: 5,
  title: "«Ein morgon»",
  summary: "Lyrisk kvardagstekst om ein heilt vanleg morgon, skriven for kurset i stilen til Halldis Moren Vesaas.",
  estimatedMinutes: 35,
  sections: [
    {
      type: "lesson",
      title: "Om teksten",
      content: `
        <p><strong>Halldis Moren Vesaas</strong> var lyrisk og varm, men òg modig. Ho skreiv
        om kvinneliv, om kjærleik og familie, om krig og om det daglege. Mange av dikta hennar
        har ein eigen, stille kraft. <em class="nn">Tung tids tale</em> (1945) er kanskje det
        mest kjende diktet hennar.</p>

        <figure class="figur portrett">
          <img src="bilete/backer-blatt-interior.jpg" alt="Måleri av ei kvinne som sit og syr i ei stille stove med blå møblar og ei potteplante ved vindauget" loading="lazy">
          <figcaption>«Blått interiør» av Harriet Backer, 1883. Ein heilt vanleg augneblink, måla med stor merksemd på lys og ting (offentleg eigedom).</figcaption>
        </figure>
        <h3>Sjå etter dette når du les</h3>
        <ul>
            <li>Kor små hendingane er, og kor mykje plass dei får.</li>
            <li>Lukter og lydar i staden for forklaringar.</li>
            <li>Den siste tanken om kva vi først skjønar i ettertid.</li>
        </ul>

        <h3>Slik les du</h3>
        <ol>
          <li>Les teksten ein gong gjennom utan å stoppe opp.</li>
          <li>Les han ein gong til, no sakte, og tenk gjennom kva som faktisk står der.</li>
          <li>Svar på spørsmåla. Bruk gjerne teksten medan du svarar.</li>
        </ol>
        <p>Spørsmåla er av to typar: fleirval med fasit, og friskrift der du formulerer eit
        kort svar sjølv. På friskrift kan du klikke fram eit dømesvar etter at du har skrive
        ditt eige.</p>

        <div class="callout warn">
          <strong>Teksten er ikkje skriven av Halldis Moren Vesaas.</strong>
          Han er skriven for dette kurset, i stilen til forfattaren, slik at du kan øve på
          moderne nynorsk. Vil du lese ekte tekstar av forfattaren, står det under korleis.
        </div>

        <div class="callout">
          <strong>Vil du lese ekte tekstar av Halldis Moren Vesaas (1907–1995)?</strong>
          <p>Dikta hennar kan du lese gratis på nett gjennom Nettbiblioteket til
        <a href="https://www.nb.no" target="_blank" rel="noopener">Nasjonalbiblioteket</a>,
        og dei finst på alle bibliotek. Diktet <em class="nn">Tung tids tale</em> står i dei
        fleste norske lyrikkantologiar.</p>
          <p>Nedst i modulen finn du ei oppgåve som tek deg rett dit.</p>
          <p>Meir om forfattaren i modulen
          <a href="modul.html?id=nynorskforfattarane">Møt nynorskforfattarane</a>.</p>
        </div>
      `,
    },
    {
      type: "reading",
      title: "Les teksten: «Ein morgon»",
      passage: `
        <p>Det er ikkje noko stort med ein morgon i april. Sola står opp, slik ho gjer
        kvar dag. Fuglane syng utanfor. Eg ligg under dyna og ser strålane finne vegen
        mellom gardinene og leggje ei lys stripe over golvet.</p>

        <p>Eg veit at i kjøkenet står far. Han kokar kaffe. Vatnet syd, han slår det
        over filteret, og ei lukt, brun og bitter og varm, legg seg over heile huset.
        Det er denne lukta som vekkjer meg, meir enn fuglane, meir enn lyset.</p>

        <p>Eg kjem ned i pysjamasen. Far snur seg ikkje. Han veit at eg er der.<br>
        «Brød på bordet», seier han.<br>
        «Mm.»</p>

        <p>Vi sit, og vi seier ikkje mykje. Det er ikkje fordi vi ikkje har noko å seie.
        Det er fordi det er morgon, og vi har heile dagen til å seie det. No skal vi
        berre vere her, han og eg, med kaffe og brød og lyset som flyttar seg over
        kjøkenbordet.</p>

        <p>Mor søv enno. Ho jobbar kveldsskift, kjem heim seint. Eg går stilt når eg
        skal opp att for å hente skuleboka. Eg lukkar døra utan ein lyd.</p>

        <p>Då eg går ut, vinkar far frå vindauget. Eg vinkar attende. Og det er ingenting
        spesielt med denne morgonen, og det er kanskje difor eg hugsar han. For det
        fanst ei tid då slike morgonar var alle eg hadde. Ein far i kjøkenet. Eit brød.
        Eit lys på golvet. Ei mor som sov.</p>

        <p>Slike ting er det ikkje noko stort med, før dei er borte. Då vert dei det
        største vi har att.</p>
      `,
      questions: [
        {
          type: "multipleChoice",
          question: "Kva tid på året er det i teksten?",
          options: ["Februar", "April", "Juli", "Oktober"],
          correct: 1,
        },
        {
          type: "multipleChoice",
          question: "Korleis verkar forholdet mellom forteljaren og faren?",
          options: [
            "Stilt, varmt og innforstått.",
            "Anstrengt og kjølig.",
            "Konfliktfylt.",
            "Fjernt og likegyldig.",
          ],
          correct: 0,
        },
        {
          type: "freeShort",
          question: "Kva meiner forteljaren med setninga «Slike ting er det ikkje noko stort med, før dei er borte»?",
          modelAnswer: "Forteljaren peikar på at vi sjeldan ser kor verdfulle dei små, kvardagslege augneblinkane er medan vi har dei. Det er først når dei tek slutt, når nokon vert borte, at vi skjønar kor mykje dei betydde.",
        },
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Skriv: ein heilt vanleg morgon",
      question: "Skriv om ein heilt vanleg augneblink heime (120–200 ord), så nøye at lesaren skjønar at han betyr noko. Du får ikkje skrive at han betyr noko.",
      hint: "Vel ein augneblink som varer under eit minutt. Jo mindre som skjer, jo meir presis må du vere.",
      minWords: 120,
      checklist: [
        "Vel éin augneblink, ikkje ein heil dag.",
        "Ta med minst éin lukt og éin lyd.",
        "Ikkje forklar kvifor augneblinken betyr noko.",
        "Avslutt med ei setning som opnar i staden for å lukke.",
        "Skriv på nynorsk.",
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Les ekte dikt på Nettbiblioteket",
      question: "Gå til Nettbiblioteket og les diktsamlinga <em class=\"nn\">Tung tids tale</em> (1945) av Halldis Moren Vesaas: <a href=\"https://www.nb.no/items/4d2650a1f63fe15022d4b35e6de4f973\" target=\"_blank\" rel=\"noopener\">opne boka på nb.no</a>. Les titteldiktet <em class=\"nn\">Tung tids tale</em> og minst to andre dikt frå samlinga. Skriv deretter 150–250 ord.",
      hint: "Nettbiblioteket er gratis og krev ingen innlogging, men du må sitje i Noreg. Du kan lese på skjermen, men ikkje laste ned eller skrive ut. Bla med pilene, eller skriv sidetal i feltet øvst. Finn du ikkje boka, søk på tittelen på nb.no.",
      minWords: 150,
      checklist: [
        "Namngi dei tre dikta du las.",
        "Forklar med eigne ord kva «Det heiter ikkje: eg no lenger. Heretter heiter det: vi» tyder.",
        "Samlinga kom ut i 1945. Skriv kva du trur det har å seie for innhaldet.",
        "Samanlikn tonen i dikta med «Ein morgon», teksten du las tidlegare i modulen.",
        "Skriv på nynorsk.",
      ],
    },
  ],
});

Modules.register({
  id: "lesing-fosse",
  part: 5,
  title: "«Frå hytta»",
  summary: "Lengre tankestraum med mykje gjentaking, skriven for kurset i stilen til Jon Fosse.",
  estimatedMinutes: 50,
  sections: [
    {
      type: "lesson",
      title: "Om teksten",
      content: `
        <p><strong>Jon Fosse</strong> fekk Nobelprisen i litteratur i 2023. Stilen hans er
        minimalistisk og repetitiv: lange setningar utan vanlege punktum, sparsam dialog, det
        same blir sagt om att, og det skjer ofte lite på overflata. Under ligg det djupe
        spørsmål om liv, død og Gud.</p>

        <figure class="figur halv">
          <img src="bilete/hytte-sno.jpg" alt="Ei gammal tømmerhytte med snø på taket i eit kvitt fjellandskap" loading="lazy">
          <figcaption>Ei gammal hytte på Rekdalsetra i Vestnes. Foto: Mænsard vokser (CC BY-SA 4.0).</figcaption>
        </figure>
        <h3>Sjå etter dette når du les</h3>
        <ul>
            <li>Kva ord og setningar som kjem att, og kor ofte.</li>
            <li>Kor lite som faktisk skjer.</li>
            <li>Skilnaden mellom å reise langt og å kome ein annan stad i hovudet.</li>
        </ul>

        <h3>Slik les du</h3>
        <ol>
          <li>Les teksten ein gong gjennom utan å stoppe opp.</li>
          <li>Les han ein gong til, no sakte, og tenk gjennom kva som faktisk står der.</li>
          <li>Svar på spørsmåla. Bruk gjerne teksten medan du svarar.</li>
        </ol>
        <p>Spørsmåla er av to typar: fleirval med fasit, og friskrift der du formulerer eit
        kort svar sjølv. På friskrift kan du klikke fram eit dømesvar etter at du har skrive
        ditt eige.</p>

        <div class="callout warn">
          <strong>Teksten er ikkje skriven av Jon Fosse.</strong>
          Han er skriven for dette kurset, i stilen til forfattaren, slik at du kan øve på
          moderne nynorsk. Vil du lese ekte tekstar av forfattaren, står det under korleis.
        </div>

        <div class="callout">
          <strong>Vil du lese ekte tekstar av Jon Fosse (1959–)?</strong>
          <p><em class="nn">Morgon og kveld</em> (2000) er ei kort bok og ein god stad å byrje.
        Du kan lese henne gratis gjennom Nettbiblioteket til
        <a href="https://www.nb.no" target="_blank" rel="noopener">Nasjonalbiblioteket</a>,
        som har norske bøker gitt ut til og med 2005.</p>
          <p>Nedst i modulen finn du ei oppgåve som tek deg rett dit.</p>
          <p>Meir om forfattaren i modulen
          <a href="modul.html?id=nynorskforfattarane">Møt nynorskforfattarane</a>.</p>
        </div>
      `,
    },
    {
      type: "reading",
      title: "Les teksten: «Frå hytta»",
      passage: `
        <p>Eg sit ved vindauget i hytta og ser ut og snøen fell og det er stilt og eg
        har sett ut sidan klokka åtte, ja eg har sett ut og snøen har falle og det har
        vore stilt heile tida. Det er ingen som veit kvar eg er. Det er ingen som har
        spurt heller. Eg drog hit i går kveld. Eg drog hit fordi eg måtte. Eg veit
        ikkje kvifor eg måtte, men eg måtte, og no er eg her, og snøen fell.</p>

        <p>Det er ei gammal hytte. Ho høyrer til mor og far, men dei brukar henne
        ikkje lenger, dei vart for gamle, og det er ikkje veg heilt fram, du må gå dei
        siste tre hundre meter, og det er for mykje for far no. Så hytta står. Eg har
        nøkkelen i ein skuff heime. Eg tok han med meg. Eg sa ikkje til nokon at eg
        tok han.</p>

        <p>Snøen fell. Det er noko med snø som fell. Det er at han fell, ja, det er
        det. Han fell og han fell, og under han ligg det meir snø, og under det meir,
        og slik er snø, han kjem på toppen av seg sjølv og blir djupare. Eg såg ein
        gong i ein dokumentar at ein nede i Antarktis kunne grave gjennom snø som var
        ti tusen år gamal. Ti tusen år. Eg veit ikkje kvifor eg tenkjer på det no, men
        det er det eg tenkjer på.</p>

        <p>Klokka er kanskje to. Eg har ikkje sett på klokka. Eg ser ikkje på klokka.
        Det er noko frigjerande ved å ikkje sjå på klokka. Klokka går likevel, men ho
        går ikkje for meg no.</p>

        <p>Eg har det ikkje verre. Det er ikkje difor eg drog hit. Eg har det ikkje
        betre heller. Det er ikkje difor. Det er noko anna. Det er at eg ville sjå.
        Sjå noko. Sjå snøen falle, kanskje. Sjå at noko fell, og fell, og fell, og at
        det er greitt at det fell.</p>

        <p>Mor ringjer kanskje. Eg veit ikkje. Telefonen er i jakka i gangen, og eg
        har ikkje vore i gangen sidan i går kveld. Kanskje ho har ringt mange gonger.
        Kanskje ho ikkje har ringt i det heile. Det er noko spesielt med å ikkje vite,
        å berre la noko vere.</p>

        <p>Eg tenkjer på bestefar. Eg veit ikkje kvifor. Han har vore død i seks år.
        Men eg tenkjer på han no. Han brukte å sitje ved dette vindauget, han òg. Han
        sat med ein kopp kaffe. Han sa ikkje mykje. Han sat berre. Eg trudde då at
        han var keisam. Eg trudde han ikkje hadde noko å seie. No skjønar eg at han
        kanskje hadde alt å seie, og at han berre såg ut av vindauget, og at det å sjå
        ut av vindauget var hans måte å seie det på.</p>

        <p>Snøen fell.</p>

        <p>Det er rart med snø. Han er kald, men når du står lenge nok i han, blir det
        varmt på ein måte. Det er ikkje varmt på huda. Det er noko anna. Eg hugsar då
        eg var seks år og fall i ei snøfonn, og eg vart liggjande, og mor måtte hente
        meg, og då eg kom inn att, var det som om eg hadde vore på ei lang reise.</p>

        <p>Det er det same no. Eg har vore på ei lang reise sidan i går kveld. Eg sit
        her og eg har ikkje gått nokon stad, men eg har vore lenger vekk enn nokon
        kan vite.</p>

        <p>Klokka er kanskje tre.</p>

        <p>Eg trur eg blir her natta over. Det er nok ved. Det er pasta i skapet. Mor
        og far rydda ikkje skikkeleg etter siste gong dei var her.</p>

        <p>Snøen fell.</p>

        <p>I morgon skal eg gå ned att. Eg skal seie til mor at eg var hjå Sander. Ho
        kjem ikkje til å tru meg. Men ho kjem ikkje til å spørje meir heller. Vi har
        den slags forhold no.</p>

        <p>Snøen fell, og det er stilt, og eg veit ikkje kva eg gjer her, men det er
        kanskje det eg gjer. Som ikkje veit. Som sit.</p>
      `,
      questions: [
        {
          type: "multipleChoice",
          question: "Korleis kom forteljaren til hytta?",
          options: [
            "Foreldra hans tok han med dit.",
            "Han drog dit åleine, utan å seie det til nokon.",
            "Han vart sendt dit av skulen.",
            "Han kom dit på ein klassetur.",
          ],
          correct: 1,
        },
        {
          type: "multipleChoice",
          question: "Kva tenkjer forteljaren om bestefar?",
          options: [
            "Han er sint på bestefar.",
            "Han skulle ynskje bestefar var her.",
            "Han forstår no at bestefar kanskje hadde mykje å seie, men sa det ved å sitje stille og sjå ut.",
            "Han hugsar ikkje bestefar i det heile.",
          ],
          correct: 2,
        },
        {
          type: "freeShort",
          question: "Korleis brukar forfattaren gjentaking til å skape stemning?",
          modelAnswer: "Forfattaren gjentek ord og setningar som «snøen fell» og «det er stilt» fleire gonger gjennom teksten. Det skapar ein langsam, nesten meditativ rytme, som passar med kva forteljaren gjer (sit og ser ut) og kva han kjenner (noko stilt og uavklart). Gjentakinga gjer at lesaren òg «sit lenge» i teksten.",
        },
        {
          type: "freeShort",
          question: "Korleis tolkar du linja «eg har vore lenger vekk enn nokon kan vite»?",
          modelAnswer: "Sjølv om han ikkje har reist langt fysisk, har han vore på ei indre reise: han har trekt seg unna alt, tenkt mykje, kome ein heilt annan stad i hovudet sitt. Det er ein måte å seie at det viktigaste skjer i sinnet, ikkje på kartet.",
        },
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Skriv: ein tankestraum",
      question: "Skriv ein tankestraum (150–250 ord) frå ein person som sit stille ein stad. Vel eit ord eller ei setning som du gjentek minst fire gonger gjennom teksten.",
      hint: "Gjentaking er ikkje slurv når det er meint. Vel gjentakinga med omhug, og la ho endre tyding litt for kvar gong.",
      minWords: 150,
      checklist: [
        "Vel éi setning eller eitt bilete som kjem att minst fire gonger.",
        "La personen sitje stille. Handlinga skjer inne i hovudet.",
        "Bruk lange setningar bundne saman med og, og lite punktum.",
        "Ingen forklaring til lesaren.",
        "Skriv på nynorsk.",
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Les ekte Fosse på Nettbiblioteket",
      question: "Gå til Nettbiblioteket og les byrjinga av <em class=\"nn\">Morgon og kveld</em> (2000) av Jon Fosse: <a href=\"https://www.nb.no/items/de8649c24e8bb97d7e73fb1f65af842a\" target=\"_blank\" rel=\"noopener\">opne boka på nb.no</a>. Boka er kort, og opninga handlar om ein fødsel. Les minst ti sider. Skriv deretter 150–250 ord.",
      hint: "Nettbiblioteket er gratis og krev ingen innlogging, men du må sitje i Noreg. Du kan lese på skjermen, men ikkje laste ned eller skrive ut. Bla med pilene, eller skriv sidetal i feltet øvst. Finn du ikkje boka, søk på tittelen på nb.no.",
      minWords: 150,
      checklist: [
        "Fortel kort kva som skjer i det du las.",
        "Finn eit ord eller ei setning som blir gjenteken, og skriv ned kor mange gonger du såg henne.",
        "Skriv om korleis Fosse bruker punktum og komma, og kva det gjer med lesinga.",
        "Samanlikn med «Frå hytta», teksten du las tidlegare i modulen.",
        "Skriv kva du synest om å lese ein tekst som er skriven slik.",
      ],
    },
  ],
});

Modules.register({
  id: "lesing-grytten",
  part: 5,
  title: "«Bussen klokka kvart over fem»",
  summary: "Urban kvardagstekst der mykje er underforstått, skriven for kurset i stilen til Frode Grytten.",
  estimatedMinutes: 40,
  sections: [
    {
      type: "lesson",
      title: "Om teksten",
      content: `
        <p><strong>Frode Grytten</strong> skriv urbant og kvardagsleg. Han lagar ofte korte
        forteljingar som zoomar inn på små augneblink, ein bussreise, eit møte, ein middag, og
        får dei til å vere viktige. <em class="nn">Bikubesong</em> (1999) er bygd opp som mange
        korte historier frå same bygard.</p>

        <figure class="figur halv">
          <img src="bilete/odda-1890.jpg" alt="Farga fotografi av Odda innst i Sørfjorden, med kyrkje, hus og høge fjell" loading="lazy">
          <figcaption>Odda i Hardanger rundt 1890–1900. Frode Grytten er frå Odda, og byen går att i tekstane hans. Fotokrom: Detroit Publishing Co. / Library of Congress (ingen kjende restriksjonar).</figcaption>
        </figure>
        <h3>Sjå etter dette når du les</h3>
        <ul>
            <li>Alt teksten ikkje fortel deg om kva som har skjedd.</li>
            <li>Kor mykje som ligg i at ho avviser mora to gonger.</li>
            <li>Den korte, klipte rytmen i setningane.</li>
        </ul>

        <h3>Slik les du</h3>
        <ol>
          <li>Les teksten ein gong gjennom utan å stoppe opp.</li>
          <li>Les han ein gong til, no sakte, og tenk gjennom kva som faktisk står der.</li>
          <li>Svar på spørsmåla. Bruk gjerne teksten medan du svarar.</li>
        </ol>
        <p>Spørsmåla er av to typar: fleirval med fasit, og friskrift der du formulerer eit
        kort svar sjølv. På friskrift kan du klikke fram eit dømesvar etter at du har skrive
        ditt eige.</p>

        <div class="callout warn">
          <strong>Teksten er ikkje skriven av Frode Grytten.</strong>
          Han er skriven for dette kurset, i stilen til forfattaren, slik at du kan øve på
          moderne nynorsk. Vil du lese ekte tekstar av forfattaren, står det under korleis.
        </div>

        <div class="callout">
          <strong>Vil du lese ekte tekstar av Frode Grytten (1960–)?</strong>
          <p><em class="nn">Bikubesong</em> (1999) og <em class="nn">Flytande bjørn</em> (2005)
        kan du lese gratis gjennom Nettbiblioteket til
        <a href="https://www.nb.no" target="_blank" rel="noopener">Nasjonalbiblioteket</a>.
        Han skriv òg kommentarar i avisene, som ofte ligg fritt på nett.</p>
          <p>Nedst i modulen finn du ei oppgåve som tek deg rett dit.</p>
          <p>Meir om forfattaren i modulen
          <a href="modul.html?id=nynorskforfattarane">Møt nynorskforfattarane</a>.</p>
        </div>
      `,
    },
    {
      type: "reading",
      title: "Les teksten: «Bussen klokka kvart over fem»",
      passage: `
        <p>Lina står på busshaldeplassen klokka kvart over fem. Det regnar.</p>

        <p>Ikkje skikkeleg regn, berre den slags som gjer alt litt fuktig utan å gi seg
        utslag i pyttar. Ho har på seg ei tynn jakke. Den nye, frå Zara. Ho er litt for
        kald, men ho vil ikkje gå inn att.</p>

        <p>Mor ringjer.<br>
        Ho svarar ikkje.</p>

        <p>Bussen kjem ti minutt for seint, slik bussar pleier. Ho set seg lengst bak.
        Ein gut ho kjenner litt frå skulen, Marius, set seg ned ved sida av henne.</p>

        <p>«Hei», seier han.<br>
        «Hei.»<br>
        «Skal du heim?»<br>
        «Til Marte.»<br>
        «Å. Du har ikkje sett Sander i dag?»</p>

        <p>Ho seier ikkje noko. Ser ut av vindauget. Marius forstår.</p>

        <p>Bussen rullar gjennom regnet. Forbi Coop Extra, forbi den nye blokka som dei
        reiv vekk parken for. Lina hugsar at ho leikte i den parken då ho var lita. No
        står det bygningar der, og folk bur i dei, og det er sikkert greitt for dei
        som bur der, men ho saknar parken.</p>

        <p>«Det går nok bra», seier Marius. Han veit ikkje kva som har skjedd, men han
        skjønar noko.<br>
        «Mm.»</p>

        <p>Mor ringjer igjen. Ho avviser samtalen.</p>

        <p>Ved Solheim går Marius av.<br>
        «Bra du klemmer på», seier han når han reiser seg. «Du veit. Du må ikkje vere
        åleine om det er noko.»</p>

        <p>Ho nikkar. Han er litt rar, Marius, men nokre gonger seier han slike ting, og
        då veit ein at han har lytta heile tida.</p>

        <p>Bussen tek til venstre opp Fløensbakken. Lina lener panna mot vindauget.
        Kaldt. Bra.</p>

        <p>Heime hjå Marte er det varmt. Marte gjev henne ein tørr genser. Ein kopp te.
        Ingen spørsmål.</p>

        <p>Etter ein time ringjer Lina mor.<br>
        «Eg er hjå Marte. Eg kjem heim i kveld.»<br>
        «Greitt», seier mor.</p>

        <p>Stemma er lita, som om mor òg har grine.</p>

        <p>Då dei legg på, sit Lina lenge på senga til Marte og ser ut. Det regnar enno.
        Men ho er innandørs no, og det luktar te, og det er nesten greitt.</p>
      `,
      questions: [
        {
          type: "multipleChoice",
          question: "Korleis verkar forholdet mellom Lina og mora hennar?",
          options: [
            "Heilt openbart og lett.",
            "Anstrengt: det er noko som ikkje er sagt mellom dei.",
            "Veldig formelt.",
            "Dei kjenner kvarandre dårleg.",
          ],
          correct: 1,
        },
        {
          type: "multipleChoice",
          question: "Kva slags person verkar Marius som?",
          options: [
            "Påtrengjande og høglydd.",
            "Likegyldig.",
            "Stille, men merksam: han skjønar at noko er gale.",
            "Sint.",
          ],
          correct: 2,
        },
        {
          type: "freeShort",
          question: "Korleis brukar forfattaren det at Lina ikkje svarar telefonen frå mora, til å skildre kjenslene hennar?",
          modelAnswer: "Ved å vise at ho avviser mora to gonger utan å seie ein einaste tanke høgt, lar forfattaren oss skjøne at det er noko vondt i forholdet, utan å fortelje oss kva. Vi får kjensla av at Lina er såra eller sint, men sjølv held att informasjonen.",
        },
        {
          type: "freeShort",
          question: "Kvifor trur du teksten er sett saman av så korte setningar og avsnitt?",
          modelAnswer: "Dei korte setningane gjev ein nervøs, klipt rytme som passar med at Lina ikkje vil snakke om det som har skjedd. Det speglar òg ein moderne by-rytme: kjapt, oppstykka, der mykje er underforstått.",
        },
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Skriv: ein augneblink som betyr meir",
      question: "Skriv ei kort forteljing (150–250 ord) frå ein buss, ein butikk eller ein heis. To personar møtest. Noko har skjedd som lesaren aldri får vite heilt kva er.",
      hint: "Det viktigaste i teksten skal aldri seiast rett ut. Lat lesaren gjere jobben.",
      minWords: 150,
      checklist: [
        "Hald deg til éin stad og eit kort tidsrom.",
        "Bruk korte setningar og korte replikkar.",
        "Ikkje forklar kva som har skjedd på førehand.",
        "Ta med minst éin detalj frå omgivnadene som speglar stemninga.",
        "Skriv på nynorsk.",
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Les ekte Grytten på Nettbiblioteket",
      question: "Gå til Nettbiblioteket og les to eller tre kapittel av <em class=\"nn\">Bikubesong</em> (1999) av Frode Grytten: <a href=\"https://www.nb.no/items/5da13cdfb598391234f0d92d8d46d1bf\" target=\"_blank\" rel=\"noopener\">opne boka på nb.no</a>. Boka er bygd opp som mange korte historier frå same bygard i Odda, så du kan byrje kvar som helst. Skriv deretter 150–250 ord.",
      hint: "Nettbiblioteket er gratis og krev ingen innlogging, men du må sitje i Noreg. Du kan lese på skjermen, men ikkje laste ned eller skrive ut. Bla med pilene, eller skriv sidetal i feltet øvst. Finn du ikkje boka, søk på tittelen på nb.no.",
      minWords: 150,
      checklist: [
        "Namngi kapitla eller personane du las om.",
        "Fortel kort kva som skjer i eitt av kapitla.",
        "Peik på to ting som gjer stilen kvardagsleg og urban.",
        "Finn noko teksten ikkje seier rett ut, men som du likevel skjønar.",
        "Samanlikn med «Bussen klokka kvart over fem», teksten du las tidlegare i modulen.",
      ],
    },
  ],
});

Modules.register({
  id: "lesing-eikemo",
  part: 5,
  title: "«Om å lese sakte»",
  summary: "Essayistisk tekst som stiller spørsmål meir enn han svarar, skriven for kurset i stilen til Marit Eikemo.",
  estimatedMinutes: 40,
  sections: [
    {
      type: "lesson",
      title: "Om teksten",
      content: `
        <p><strong>Marit Eikemo</strong> skriv essayistisk og reflekterande. Ho stiller
        spørsmål meir enn ho gjev svar, og brukar konkrete kvardagsbilete for å snakke om store
        spørsmål. Ho har vore leiar for Litteratursymposiet i Odda og skriv både skjønnlitteratur
        og sakprosa.</p>

        <figure class="figur halv">
          <img src="bilete/backer-lampelys.jpg" alt="Måleri av ei kvinne som sit og les ved eit bord med ei oljelampe i ei gammal stove" loading="lazy">
          <figcaption>«Ved lampelys» av Harriet Backer, 1890 (offentleg eigedom).</figcaption>
        </figure>
        <h3>Sjå etter dette når du les</h3>
        <ul>
            <li>Skilnaden mellom eit essay og ein argumenterande tekst.</li>
            <li>Korleis eit kvardagsleg bilete blir brukt til å seie noko stort.</li>
            <li>At teksten ikkje endar i ein fasit.</li>
        </ul>

        <h3>Slik les du</h3>
        <ol>
          <li>Les teksten ein gong gjennom utan å stoppe opp.</li>
          <li>Les han ein gong til, no sakte, og tenk gjennom kva som faktisk står der.</li>
          <li>Svar på spørsmåla. Bruk gjerne teksten medan du svarar.</li>
        </ol>
        <p>Spørsmåla er av to typar: fleirval med fasit, og friskrift der du formulerer eit
        kort svar sjølv. På friskrift kan du klikke fram eit dømesvar etter at du har skrive
        ditt eige.</p>

        <div class="callout warn">
          <strong>Teksten er ikkje skriven av Marit Eikemo.</strong>
          Han er skriven for dette kurset, i stilen til forfattaren, slik at du kan øve på
          moderne nynorsk. Vil du lese ekte tekstar av forfattaren, står det under korleis.
        </div>

        <div class="callout">
          <strong>Vil du lese ekte tekstar av Marit Eikemo (1971–)?</strong>
          <p>Debutboka hennar <em class="nn">Her, no</em> (1999) kan du lese gratis gjennom
        Nettbiblioteket til
        <a href="https://www.nb.no" target="_blank" rel="noopener">Nasjonalbiblioteket</a>.
        Ho skriv òg essay og kommentarar i aviser og tidsskrift.
        <em class="nn">Samtidsruinar</em> (2008) er derimot for ny for Nettbiblioteket, som
        dekkjer bøker til og med 2005.</p>
          <p>Nedst i modulen finn du ei oppgåve som tek deg rett dit.</p>
          <p>Meir om forfattaren i modulen
          <a href="modul.html?id=nynorskforfattarane">Møt nynorskforfattarane</a>.</p>
        </div>
      `,
    },
    {
      type: "reading",
      title: "Les teksten: «Om å lese sakte»",
      passage: `
        <p>Det er noko som har endra seg dei siste åra. Eg les meir enn nokon gong, men
        eg les annleis. Ein artikkel på nettet tek eg i sveip. Eg får tak i hovudpoenget,
        eg sjekkar lengda på kommentarfelta, eg blar ned for å sjå om det kjem ein
        meiningsmotstand. Heile teksten har eg lese på eit halvt minutt. Eg veit kva han
        seier, eg veit kva han prøver å gjere, og eg går vidare.</p>

        <p>Men er det å lese?</p>

        <p>Då eg var tolv år, sat eg i ein lenestol heile laurdagen og las ei bok om
        ein gut som rømde frå ein institusjon. Eg veit at det var ein laurdag fordi mor
        laga middag to gonger, og eg åt på dei begge utan å skjøne kor lang tid det
        hadde gått. Eg hugsar ikkje slutten av boka. Eg hugsar ein scene der guten
        gøymer seg i ein hekk, og lukta av hekk har sidan hatt noko med den scenen å
        gjere, sjølv om eg ikkje veit kva slags hekk det skulle vere, og forfattaren
        neppe har tenkt på lukt i det heile.</p>

        <p>Slik kan ei bok bli. Ho blir ikkje informasjon. Ho blir lukt og rom og kjensle.
        Og det krev tid. Det krev at ein gjev frå seg kontrollen ei lita stund, at ein
        lar teksten skje med ein sjølv.</p>

        <p>Eg er ikkje sikker på at eg kan det lenger. Når eg les ein artikkel på fjorten
        minutt, sit eg og uroleg vippar med foten. Eg har lyst til å gå vidare. Eg veit
        at ingen kjem til å spørje meg ut om teksten. Eg veit at det viktige er at eg
        har lese han, ikkje at eg har lese han godt.</p>

        <p>Men eg meiner at vi taper noko her. Ikkje noko stort, kanskje, men noko
        presist: evna til å bli endra av ein tekst. Ein artikkel kan endre meg dersom eg
        les han sakte, dersom eg blir ståande att i han ei stund. Dersom eg les han
        raskt, blir han berre ein ting eg veit.</p>

        <p>Ein lærar fortalde meg ein gong at ho bad elevane sine lese same dikt tre
        gonger på rad. Første gongen for å skjøne. Andre gongen for å høyre. Tredje
        gongen for å bu i det. Ho sa at det var den tredje gongen som var lesinga. Dei
        to første var berre øvingar.</p>

        <p>Eg trur det stemmer. Og eg trur at vi alle treng å spørje oss sjølve: kva er
        det å lese, eigentleg? Er det å trekke informasjon ut av tekst? Eller er det
        noko meir? Eg veit ikkje kva svaret er. Eg veit berre at eg saknar laurdagar i
        lenestolen.</p>
      `,
      questions: [
        {
          type: "multipleChoice",
          question: "Kva meiner forfattaren om å lese ein artikkel på eit halvt minutt?",
          options: [
            "At det er like godt som sakte lesing.",
            "At det knapt er å lese: ein får informasjon, men ikkje meir.",
            "At det er det moderne mennesket har bruk for.",
            "At det er for sakte.",
          ],
          correct: 1,
        },
        {
          type: "multipleChoice",
          question: "Kva sa læraren om å lese eit dikt tre gonger på rad?",
          options: [
            "At det er bortkasta tid.",
            "At den første gongen er den viktigaste.",
            "At den tredje gongen er den eigentlege lesinga: då bur ein i diktet.",
            "At ein bør memorere det etter tre gonger.",
          ],
          correct: 2,
        },
        {
          type: "freeShort",
          question: "Kva meiner forfattaren med å «bli endra av ein tekst»?",
          modelAnswer: "At ein tekst ikkje berre gir oss informasjon, men kan gjere noko med oss, endre måten vi tenkjer på, kjenslene våre, kanskje korleis vi ser på oss sjølve eller andre. Dette krev at vi les sakte og lar teksten få tid til å verke.",
        },
        {
          type: "freeShort",
          question: "Kva slags lesing gjer du sjølv? Liknar det meir på den raske eller den sakte måten forfattaren skildrar? Grunngi.",
          modelAnswer: "Eit svar kan vere: Eg les for det meste raskt på nettet, særleg når eg skal finne ut noko spesifikt. Men når eg les ei bok eg verkeleg liker, kan eg gløyme tida, og då er det meir lik den sakte lesinga forfattaren skildrar.",
        },
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Skriv: eit lite essay",
      question: "Skriv eit lite essay (150–250 ord) der du stiller spørsmål ved ein vane du sjølv har. Du treng ikkje konkludere.",
      hint: "Eit essay tenkjer høgt. Det er lov å skifte meining undervegs, og det er lov å ende i eit spørsmål.",
      minWords: 150,
      checklist: [
        "Start i noko heilt konkret og kvardagsleg.",
        "Still minst to spørsmål undervegs.",
        "Prøv minst éin tanke som du sjølv avviser etterpå.",
        "Du treng ikkje konkludere, men avslutninga skal vere medviten.",
        "Skriv på nynorsk.",
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Les ekte Eikemo på Nettbiblioteket",
      question: "Gå til Nettbiblioteket og les i <em class=\"nn\">Her, no: møte med unge menneske</em> (1999) av Marit Eikemo: <a href=\"https://www.nb.no/items/8652b8b376b75414f12657124acb0969\" target=\"_blank\" rel=\"noopener\">opne boka på nb.no</a>. Les minst eitt heilt portrett eller kapittel. Skriv deretter 150–250 ord.",
      hint: "Nettbiblioteket er gratis og krev ingen innlogging, men du må sitje i Noreg. Du kan lese på skjermen, men ikkje laste ned eller skrive ut. Bla med pilene, eller skriv sidetal i feltet øvst. Finn du ikkje boka, søk på tittelen på nb.no.",
      minWords: 150,
      checklist: [
        "Fortel kort kva eller kven kapitlet handla om.",
        "Peik på minst eitt spørsmål Eikemo stiller utan å svare på det.",
        "Skriv om korleis ho bruker konkrete detaljar til å seie noko større.",
        "Samanlikn med «Om å lese sakte», teksten du las tidlegare i modulen.",
        "Skriv på nynorsk.",
      ],
    },
  ],
});

Modules.register({
  id: "lesing-nilssen",
  part: 5,
  title: "«Klassebilete»",
  summary: "Direkte og ærleg tekst om eit gammalt klassebilete, skriven for kurset i stilen til Olaug Nilssen.",
  estimatedMinutes: 40,
  sections: [
    {
      type: "lesson",
      title: "Om teksten",
      content: `
        <p><strong>Olaug Nilssen</strong> skriv direkte og ærleg, somme gonger humoristisk,
        somme gonger smerteleg. Ho stiller spørsmål ved kva som er «normalt» og kven som får
        setje grensene. <em class="nn">Tung tids tale</em> (2017) er ein roman om å vere mor til
        eit barn med store hjelpebehov.</p>

        <figure class="figur halv">
          <img src="bilete/klassebilete-1903.jpg" alt="Gammalt svart-kvitt klassebilete av jenter i rader med lærarinnene sine" loading="lazy">
          <figcaption>Klassebilete frå Frk. Christies skole i Trondheim, om lag 1903. Fotograf ukjend, Trondheim byarkiv (CC BY 2.0).</figcaption>
        </figure>
        <h3>Sjå etter dette når du les</h3>
        <ul>
            <li>Den nøkterne tonen når ho fortel om noko vondt.</li>
            <li>Korleis eit bilete blir ein måte å forstå seg sjølv på.</li>
            <li>Kva ho vel å nemne kort, og kva ho dveler ved.</li>
        </ul>

        <h3>Slik les du</h3>
        <ol>
          <li>Les teksten ein gong gjennom utan å stoppe opp.</li>
          <li>Les han ein gong til, no sakte, og tenk gjennom kva som faktisk står der.</li>
          <li>Svar på spørsmåla. Bruk gjerne teksten medan du svarar.</li>
        </ol>
        <p>Spørsmåla er av to typar: fleirval med fasit, og friskrift der du formulerer eit
        kort svar sjølv. På friskrift kan du klikke fram eit dømesvar etter at du har skrive
        ditt eige.</p>

        <div class="callout warn">
          <strong>Teksten er ikkje skriven av Olaug Nilssen.</strong>
          Han er skriven for dette kurset, i stilen til forfattaren, slik at du kan øve på
          moderne nynorsk. Vil du lese ekte tekstar av forfattaren, står det under korleis.
        </div>

        <div class="callout">
          <strong>Vil du lese ekte tekstar av Olaug Nilssen (1977–)?</strong>
          <p><em class="nn">Få meg på, for faen</em> (2005) kan du lese gratis gjennom
        Nettbiblioteket til <a href="https://www.nb.no" target="_blank" rel="noopener">Nasjonalbiblioteket</a>.
        Tittelen <em class="nn">Tung tids tale</em> er ein medviten referanse til diktet til
        Halldis Moren Vesaas frå 1945.</p>
          <p>Nedst i modulen finn du ei oppgåve som tek deg rett dit.</p>
          <p>Meir om forfattaren i modulen
          <a href="modul.html?id=nynorskforfattarane">Møt nynorskforfattarane</a>.</p>
        </div>
      `,
    },
    {
      type: "reading",
      title: "Les teksten: «Klassebilete»",
      passage: `
        <p>Eg har sett på det klassebiletet frå 7. trinn fleire gonger denne hausten. Eg
        veit ikkje kvifor. Det ligg i ein skuff på rommet mitt, saman med gamle prøver
        og eit halvbrukt notathefte. Eg drog det fram ein dag eg skulle rydde, og no
        ligg det øvst, og eg ser på det.</p>

        <p>Tjueåtte ungar. Sju lærarar bak. Eg står på bakerste rad mellom Lisa og
        Henrik. Lisa har raudt hår og smiler så det skin. Henrik ser ned i golvet. Eg
        ser rett i kamera, men eg smiler ikkje. Eg har på meg ein blå hettegenser eg
        hugsar at eg syntest var stygg, men som mor sa eg måtte ha på den dagen fordi
        alt anna var i vasken.</p>

        <p>To av jentene på biletet bur ikkje i landet lenger. Familiane deira flytta.
        Tre av gutane går i klassen min på vidaregåande no, men vi seier ikkje hei
        lenger. Ein gut, Mikkel, døydde i ei ulukke i fjor sommar. Han står lengst
        til venstre, smiler skeivt, har på seg ei Brann-trøye.</p>

        <p>Eg veit ikkje kva eg leitar etter når eg ser på det. Kanskje noko som ein
        gong var rett. Kanskje meg sjølv, slik eg såg meg sjølv den gongen: som ei
        jente som hadde alt framom seg, alt ope, alt mogleg. No er eg femten, og det
        meste er framleis ope, men det er mindre ope enn det var.</p>

        <p>Mor kom inn her om dagen då eg sat med biletet på fanget.<br>
        «Ser du på dei gamle bileta?»<br>
        «Litt.»<br>
        «Var det ikkje noko du skulle gjere?»<br>
        «Jo.»</p>

        <p>Eg la det vekk då. Men neste dag tok eg det fram att.</p>

        <p>Eg trur kanskje vaksne ikkje skjønar at å sjå på eit gamalt bilete kan vere
        arbeid òg. Det er ikkje berre nostalgi. Det er noko ein gjer for å finne ut
        korleis ein er kome hit. Kor mange val og uhell og avskjeder som skal til for
        at den jenta på biletet, ho i den stygge blå hettegenseren, blir til den jenta
        som no sit på senga si og tenkjer.</p>
      `,
      questions: [
        {
          type: "multipleChoice",
          question: "Kvifor likte forteljaren ikkje hettegenseren ho hadde på seg på klassebiletet?",
          options: [
            "Han var for liten.",
            "Ho syntest han var stygg, men måtte ha han på fordi alt anna var i vasken.",
            "Han var for tjukk.",
            "Mor hadde laga han sjølv.",
          ],
          correct: 1,
        },
        {
          type: "multipleChoice",
          question: "Korleis snakkar forteljaren om Mikkel?",
          options: [
            "Med sinne.",
            "Med likegyldigheit.",
            "Sakleg og kort, men med ein nærleik: han er ein av fleire skjebner ho nemner.",
            "Med dramatisk sorg.",
          ],
          correct: 2,
        },
        {
          type: "freeShort",
          question: "Kva meiner forteljaren med at «å sjå på eit gamalt bilete kan vere arbeid»?",
          modelAnswer: "Ho meiner at det ikkje berre er kjekt eller sentimentalt å sjå på gamle bilete. Det er ein måte å forstå seg sjølv på, å sjå kva som har skjedd mellom då og no, og kva som har gjort henne til den ho er.",
        },
        {
          type: "freeShort",
          question: "Korleis viser teksten at livet til forteljaren har endra seg sidan 7. trinn?",
          modelAnswer: "Ho nemner konkrete endringar: to klassevenninner har flytta ut av landet, tre gutar ho ikkje lenger snakkar med, og ein klassekamerat som er død. Ho seier òg at det meste er «mindre ope» enn det var, at val har stengt nokre dører.",
        },
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Skriv: eit bilete du hugsar",
      question: "Vel eit bilete du kjenner godt, eit klassebilete, eit feriebilete eller eit familiebilete. Skriv om det (150–250 ord) slik at lesaren skjønar kva som har endra seg sidan biletet vart teke.",
      hint: "Nilssen skriv nøkternt om det som gjer vondt. Det gjer det sterkare, ikkje svakare.",
      minWords: 150,
      checklist: [
        "Skildre biletet konkret før du seier noko om det.",
        "Nemn minst tre personar eller detaljar frå biletet.",
        "Skriv om minst éin ting som har endra seg.",
        "Hald tonen nøktern, sjølv når innhaldet er alvorleg.",
        "Skriv på nynorsk.",
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Les ekte Nilssen på Nettbiblioteket",
      question: "Gå til Nettbiblioteket og les byrjinga av <em class=\"nn\">Få meg på, for faen</em> (2005) av Olaug Nilssen: <a href=\"https://www.nb.no/items/a0537db137e7903470f85578c2209ab3\" target=\"_blank\" rel=\"noopener\">opne boka på nb.no</a>. Les minst ti sider, og skriv deretter 150–250 ord.",
      hint: "Nettbiblioteket er gratis og krev ingen innlogging, men du må sitje i Noreg. Du kan lese på skjermen, men ikkje laste ned eller skrive ut. Bla med pilene, eller skriv sidetal i feltet øvst. Finn du ikkje boka, søk på tittelen på nb.no.",
      minWords: 150,
      checklist: [
        "Fortel kort kva du las, utan å referere alt.",
        "Peik på to stader der språket ligg tett opp til talemål.",
        "Skriv om korleis Nilssen bruker humor og alvor om kvarandre.",
        "Samanlikn med «Klassebilete», teksten du las tidlegare i modulen.",
        "Skriv på nynorsk.",
      ],
    },
  ],
});

Modules.register({
  id: "lesing-samanlikning",
  part: 5,
  title: "Samanlikn tekstane",
  summary: "Sjå dei ni tekstane i samanheng, og skriv om kva som skil dei.",
  estimatedMinutes: 40,
  sections: [
    {
      type: "lesson",
      title: "Ni tekstar, ni stemmer",
      content: `
        <p>No har du lese ni tekstar som er svært ulike, sjølv om alle er skrivne på nynorsk.
        Nokre er korte og klipte, andre lange og gjentakande. Nokre fortel deg alt, andre held
        nesten alt tilbake.</p>
        <p>I denne modulen skal du sjå dei i samanheng. Det er ofte lettare å seie kva ein tekst
        gjer når du held han opp mot ein annan.</p>
        <table>
          <thead><tr><th>Tekst</th><th>Skriven i stilen til</th><th>Sjanger</th><th>Det mest særmerkte</th></tr></thead>
          <tbody>
            <tr><td>«Med toget over vidda»</td><td>Vinje</td><td>Reiseskildring</td><td>Observasjon som blir til ettertanke</td></tr>
            <tr><td>«Heim att»</td><td>Garborg</td><td>Psykologisk forteljing</td><td>Alt det som ikkje blir sagt</td></tr>
            <tr><td>«Bestefar og stormen»</td><td>Duun</td><td>Dramatisk forteljing</td><td>Naturen som motstandar</td></tr>
            <tr><td>«Jenta og isen»</td><td>Tarjei Vesaas</td><td>Symbolsk kortprosa</td><td>Korte setningar, enkle ord</td></tr>
            <tr><td>«Ein morgon»</td><td>Halldis Moren Vesaas</td><td>Lyrisk kvardagsskildring</td><td>Ein augneblink som får all plassen</td></tr>
            <tr><td>«Frå hytta»</td><td>Jon Fosse</td><td>Tankestraum</td><td>Gjentaking</td></tr>
            <tr><td>«Bussen klokka kvart over fem»</td><td>Frode Grytten</td><td>Urban kortprosa</td><td>Det underforståtte</td></tr>
            <tr><td>«Om å lese sakte»</td><td>Marit Eikemo</td><td>Essay</td><td>Spørsmål utan fasit</td></tr>
            <tr><td>«Klassebilete»</td><td>Olaug Nilssen</td><td>Personleg prosa</td><td>Nøktern tone om noko vondt</td></tr>
          </tbody>
        </table>
      `,
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Vel din favoritt",
      question: "Kva av dei ni tekstane likte du best, og kvifor? Skriv 100–200 ord. Bruk konkrete døme frå teksten du valde.",
      minWords: 100,
      checklist: [
        "Vel ein tekst og namngi han.",
        "Forklar kva du likte ved stilen eller innhaldet.",
        "Bruk minst eitt konkret døme frå teksten.",
        "Skriv kort om kvifor nettopp denne teksten traff deg.",
        "Skriv på nynorsk.",
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Samanlikning",
      question: "Vel to av dei ni tekstane og samanlikn dei. Korleis er stilen og stemninga ulik? Korleis brukar forfattarane setningar og avsnitt for å skape ulike kjensler? Skriv 150–250 ord.",
      hint: "Vel gjerne to som er svært ulike, til dømes Fosse og Grytten, eller Duun og Halldis Moren Vesaas.",
      minWords: 150,
      checklist: [
        "Namngi dei to tekstane du har valt.",
        "Skriv om stil: lange eller korte setningar, gjentaking, dialog.",
        "Skriv om stemning og innhald.",
        "Bruk minst eitt konkret døme frå kvar tekst.",
        "Skriv på nynorsk.",
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Skriv vidare på ein stil",
      question: "Vel éin av dei ni forfattarane og skriv ein ny tekst (150–250 ord) i den stilen, om eit emne forfattaren aldri har skrive om. Skriv namnet på forfattaren du etterliknar øvst.",
      hint: "Dette er same øvinga som tekstane i kurset er laga med. Å etterlikne ein stil er ein av dei beste måtane å oppdage kva stilen faktisk består av.",
      minWords: 150,
      checklist: [
        "Skriv namnet på forfattaren du etterliknar øvst.",
        "Vel eit emne forfattaren aldri ville ha skrive om.",
        "Bruk minst to konkrete stiltrekk frå forfattaren.",
        "Skriv tre linjer til slutt om kva du gjorde for å treffe stilen.",
        "Skriv på nynorsk.",
      ],
    },
  ],
});
