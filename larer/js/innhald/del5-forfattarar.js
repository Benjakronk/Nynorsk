/* Lærarinnhald for Del 5 · Møt nynorskforfattarane og lesemodulane om Vinje,
   Garborg og Duun. Formatet står i larer/README.md. */

Larar.register("nynorskforfattarane", {
  tittelnotat: "Mange elevar trur at nynorsk er eit skulefag og ikkje eit litteraturspråk. I dag møter vi ni forfattarar som har skrive på nynorsk i over 150 år, frå bladet til Vinje på 1800-talet til ein nobelpris i 2023. Sei gjerne at tekstane i lesemodulane er skrivne i stilen til desse forfattarane, så dette er bakgrunnen for alt vi skal lese i Del 5.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>møte <strong>ni forfattarar</strong> som skriv på nynorsk</li>
        <li>sjå korleis <strong>stilen</strong> deira skil seg frå kvarandre</li>
        <li>plassere dei i <strong>tida</strong>: 1800-talet, 1900-talet, i dag</li>
        <li>velje éin vi vil <strong>lese meir av</strong></li>
      </ul>`,
      notes: "Fortel at timen er eit forfattargalleri: vi går kronologisk og stoppar kort ved kvar forfattar. Elevane treng ikkje hugse alt. Målet er at dei skal kjenne att namna og ha eitt eller to stikkord om kvar, og at kvar elev finn éin forfattar dei er nysgjerrige på.",
    },
    {
      type: "diskuter",
      title: "Kva veit vi alt?",
      prompt: `<p>Kjenner de namnet på nokon som skriv, eller har skrive, på nynorsk?</p>
        <p>Har de lese, sett eller høyrt noko på nynorsk utanom skulen?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      notes: "Skriv namna elevane kjem med på tavla og sjå om dei dukkar opp i løpet av timen. Hjelp dei på veg: songtekstar, teaterstykke, NRK-program, bøker frå barneskulen. Mange har høyrt «Ved Rondane» eller dikt frå Haugtussa i tonesetjinga til Grieg utan å vite at teksten er nynorsk. Nokre har kanskje høyrt om Jon Fosse og Nobelprisen i 2023.",
    },
    {
      title: "Tre tider",
      body: `<div class="tre-kol">
          <div class="boks"><h3>1800-talet</h3><p>Vinje, Garborg</p></div>
          <div class="boks"><h3>1900-talet</h3><p>Duun, Tarjei Vesaas, Halldis Moren Vesaas</p></div>
          <div class="boks"><h3>I dag</h3><p>Fosse, Grytten, Eikemo, Nilssen</p></div>
        </div>`,
      steps: [
        "<p class=\"midt\">Dei første skreiv på <strong>landsmål</strong>, like etter at Ivar Aasen laga det skriftlege grunnlaget.</p>",
      ],
      notes: "Kople til Del 1: Aasen gav ut grammatikken og ordboka si, og då måtte nokon vise at språket kunne brukast til skjønnlitteratur, journalistikk og dikt. Det gjorde Vinje og Garborg. Poenget for elevane er at nynorsken ikkje berre er ei rettskrivingsregel, men eit språk med ein lang litterær tradisjon. Denne sorteringa kjem att i oppgåva til slutt i modulen.",
    },
    {
      type: "bilete",
      kicker: "1818–1870",
      title: "Aasmund Olavsson Vinje",
      src: "bilete/vinje.jpg",
      alt: "Portrett av Aasmund Olavsson Vinje",
      caption: "Foto: Nasjonalbiblioteket (ingen kjende restriksjonar)",
      body: `<ul>
          <li>Frå Vinje i Telemark</li>
          <li>Journalist, lyrikar, reiseskildrar</li>
          <li>Grunnla bladet <em class="nn">Dølen</em> i 1858</li>
          <li>Ironisk: blanda høgt og lågt</li>
        </ul>`,
      steps: ["<p><em class=\"nn\">«Ved Rondane»</em>: «No ser eg atter slike fjell og dalar …»</p>"],
      notes: "Vinje voks opp i fattige kår og arbeidde seg fram som lærar, jurist og journalist. Han var ein av dei første som brukte landsmålet til Aasen i praktisk skrift. <em>Dølen</em> skreiv han mest sjølv: reisebrev, meiningar, dikt og kommentarar. Stilen hans kunne skifte frå filosofisk refleksjon til ein vits om kva han åt på krua. Kjende verk: <em>Ferdaminne fraa Sumaren 1860</em> og dikta «Ved Rondane», «Blåmann» og «Den dag kjem aldri at eg deg gløymer». Om du har tid, spel eit opptak av «Ved Rondane» med melodien til Grieg. Mange elevar kjenner att melodien.",
    },
    {
      type: "bilete",
      kicker: "1851–1924",
      title: "Arne Garborg",
      src: "bilete/garborg.jpg",
      alt: "Portrett av Arne Garborg",
      caption: "Foto: Nasjonalbiblioteket (ingen kjende restriksjonar)",
      body: `<ul>
          <li>Frå Time på Jæren</li>
          <li>Skreiv om <strong>indre liv</strong>: tru, tvil, lengsel</li>
          <li><em class="nn">Bondestudentar</em> (1883)</li>
          <li><em class="nn">Haugtussa</em> (1895)</li>
        </ul>`,
      notes: "Garborg var ein av dei sterkaste røystene i nynorskrørsla. Stilen er sosialrealistisk og psykologisk, og han var blant dei første som skreiv om kjenslene, tankane og sjølvransakinga til vanlege folk på nynorsk. <em>Bondestudentar</em> handlar om unge bondegutar som prøver å studere seg fram i byen. <em>Haugtussa</em> er ein diktsyklus om jenta Veslemøy, som har synske evner, og Grieg tonsette delar av han. Andre verk: <em>Trætte Mænd</em> (1891) og <em>Fred</em> (1892). Spør gjerne: kjenner nokon seg att i å flytte frå ein liten stad til ein by?",
    },
    {
      type: "sporsmal",
      question: "Edvard Grieg sette musikk til tekstar av to av forfattarane. Kven?",
      options: ["Duun og Fosse", "Vinje og Garborg", "Grytten og Nilssen", "Tarjei og Halldis Moren Vesaas"],
      correct: 1,
      explain: "Grieg tonsette «Ved Rondane» av Vinje og delar av <em class=\"nn\">Haugtussa</em> av Garborg. Begge levde på 1800-talet, same tid som Grieg.",
      notes: "Eit lett spørsmål som får elevane til å kople forfattarane til tida dei levde i. Om nokon svarer Vesaas, spør: levde Grieg på same tid som dei?",
    },
    {
      type: "bilete",
      kicker: "1876–1939",
      title: "Olav Duun",
      src: "bilete/duun.jpg",
      alt: "Portrett av Olav Duun",
      caption: "Foto: Nasjonalbiblioteket (CC BY 2.0)",
      body: `<ul>
          <li>Frå Jøa i Namdalen</li>
          <li>Episk og dramatisk: liv, død, kamp</li>
          <li><em class="nn">Juvikfolket</em> (1918–1923), seks band</li>
          <li>Nominert til Nobelprisen fleire gonger</li>
        </ul>`,
      notes: "Duun var lærar og voks opp på ei lita øy ved kysten i Trøndelag. <em>Juvikfolket</em> er ein slektsroman om ein gard ved kysten gjennom mange generasjonar, rekna som eit av dei store norske romanverka. Stilen kan minne om islandsk sagalitteratur: sterke karakterar som strir med naturen, kjenslene sine og lagnaden. Andre verk: <em>Medmenneske</em> (1929) og <em>Ragnhild</em> (1931). Forklar ordet slektsroman: ei forteljing som følgjer ei familie gjennom fleire generasjonar.",
    },
    {
      type: "bilete",
      kicker: "1897–1970",
      title: "Tarjei Vesaas",
      src: "bilete/t-vesaas.jpg",
      alt: "Portrett av Tarjei Vesaas",
      caption: "Foto: Nasjonalbiblioteket (ingen kjende restriksjonar)",
      body: `<ul>
          <li>Frå Vinje i Telemark</li>
          <li>Enkle ord, korte setningar, djupe tema</li>
          <li><em class="nn">Fuglane</em> (1957)</li>
          <li><em class="nn">Is-slottet</em> (1963)</li>
        </ul>`,
      notes: "Vesaas budde mesteparten av livet i bygda si og skreiv nokre av dei mest leste romanane på nynorsk i det 20. hundreåret. Stilen er sparsom, poetisk og symbolsk: frykt, einsemd, venskap, naturen som spegel for menneskesinnet. <em>Is-slottet</em> handlar om to jenter og eit dramatisk møte med naturen, og fekk Nordisk råds litteraturpris i 1964. <em>Fuglane</em> handlar om Mattis. <em>Vindane</em> (1952) gav han det internasjonale gjennombrotet. Legg merke til at han kjem frå same bygd som Vinje, og at han var gift med Halldis Moren Vesaas, som kjem på neste lysbilete.",
    },
    {
      type: "bilete",
      kicker: "1907–1995",
      title: "Halldis Moren Vesaas",
      src: "bilete/hm-vesaas.png",
      alt: "Portrett av Halldis Moren Vesaas",
      caption: "Foto via Wikimedia Commons, User:Orland (fri bruk)",
      body: `<ul>
          <li>Frå Trysil</li>
          <li>Lyrikar og gjendiktar</li>
          <li>Kvinneliv, kjærleik, krig, kvardag</li>
          <li><em class="nn">Tung tids tale</em> (1945)</li>
        </ul>`,
      notes: "Ho debuterte tidleg med <em>Harpe og dolk</em> (1929) og vart raskt ein av dei viktigaste lyrikarane i si tid. Ho var gift med Tarjei Vesaas, men forfattarskapen hennar var sjølvstendig. Presiser dette om elevane seier «kona til Vesaas»: ho er ein stor forfattar i eigen rett. <em>Tung tids tale</em> kom i 1945 med dikt skrivne under krigen, og tittelkvadet er eitt av dei mest kjende dikta på nynorsk.",
    },
    {
      type: "diskuter",
      title: "Frå «eg» til «vi»",
      prompt: `<p>Tittelkvadet i <em class="nn">Tung tids tale</em> (1945) seier at det ikkje lenger heiter <em class="nn">eg</em>, men <em class="nn">vi</em>.</p>
        <p>Kvifor kan det vere viktig å seie <em class="nn">vi</em> i ei krigstid?</p>`,
      form: "Snakk i grupper på tre",
      tid: 3,
      notes: "Diktet kom ut i 1945 og er skrive under okkupasjonen. Lat elevane tenkje på fellesskap, samhald og ansvar for kvarandre. Oppfølgingsspørsmål: finst det situasjonar i dag der det er viktig å seie «vi» i staden for «eg»? Tenk på pandemien, klima, ein klasse eller eit lag. Dette peikar fram mot Olaug Nilssen, som lånte tittelen i 2017.",
    },
    {
      type: "sporsmal",
      question: "Kven skreiv med enkle ord og korte setningar om djupe ting som frykt og einsemd?",
      options: ["Olav Duun", "Aasmund Olavsson Vinje", "Tarjei Vesaas", "Arne Garborg"],
      correct: 2,
      explain: "Tarjei Vesaas skriv sparsamt og symbolsk. Duun skriv episk og dramatisk, Vinje ironisk og journalistisk, og Garborg psykologisk om indre liv.",
      notes: "Stil er det elevane oftast blandar. Bruk forklaringa til å repetere eitt stikkord for kvar av dei fire første forfattarane.",
    },
    {
      type: "bilete",
      kicker: "fødd 1959",
      title: "Jon Fosse",
      src: "bilete/fosse.jpg",
      alt: "Portrett av Jon Fosse",
      caption: "Foto: Tom A. Kolstad / Det Norske Samlaget (CC BY-SA 4.0)",
      body: `<ul>
          <li>Frå Haugesund</li>
          <li><strong>Nobelprisen i litteratur 2023</strong></li>
          <li>Lange setningar, gjentaking, lite dialog</li>
          <li><em class="nn">Nokon kjem til å koma</em>, <em class="nn">Morgon og kveld</em></li>
        </ul>`,
      notes: "Fosse er dramatikar, romanforfattar, lyrikar og omsetjar, og ein av dei mest spelte samtidsdramatikarane i verda. Bøkene hans er omsette til over 50 språk. Stilen er minimalistisk og repetitiv: lange setningar utan vanlege punktum, det same blir sagt om att, og det skjer lite på overflata. <em>Morgon og kveld</em> (2000) er ein kort roman om eit liv frå fødsel til død, og ein god inngang. Hovudverket <em>Septologien</em> kom i tre band 2019–2021. Dette er eit godt argument for nynorsk som litteraturspråk: nobelprisen gjekk til ein forfattar som skriv på nynorsk.",
    },
    {
      type: "sporsmal",
      question: "Jon Fosse fekk Nobelprisen i litteratur i 2023. Kor mange nordmenn hadde fått han før?",
      options: ["Ingen", "Éin", "Tre", "Fem"],
      correct: 2,
      explain: "Bjørnstjerne Bjørnson (1903), Knut Hamsun (1920) og Sigrid Undset (1928). Fosse er den fjerde.",
      notes: "Spør etterpå: kvifor trur de det gjekk nesten hundre år mellom den tredje og den fjerde? Ingen fasit, men det er ein fin måte å få fram at prisen er sjeldan og stor.",
    },
    {
      type: "bilete",
      kicker: "fødd 1960",
      title: "Frode Grytten",
      src: "bilete/grytten.jpg",
      alt: "Portrett av Frode Grytten",
      caption: "Foto: Jarvin (CC BY 3.0)",
      body: `<ul>
          <li>Frå industribygda Odda</li>
          <li>Små augneblink i kvardagen</li>
          <li><em class="nn">Bikubesong</em> (1999): naboar i ei blokk</li>
          <li>Fekk Brageprisen</li>
        </ul>`,
      notes: "Grytten er forfattar og journalist, og industriarbeidarane og bygdesamfunnet i Odda pregar mykje av forfattarskapen. Han skriv romanar, kortprosa, songtekstar og aviskommentarar. Stilen er kvardagsleg: han zoomar inn på ein bussreise, eit møte, ein middag, og får det til å vere viktig. <em>Bikubesong</em> er sett saman av mange korte historier, så ein kan lese éi av gongen. Det gjer boka fin å tilrå elevar som ikkje likar lange bøker.",
    },
    {
      kicker: "fødd 1971",
      title: "Marit Eikemo",
      body: `<ul class="stor">
          <li>Òg frå Odda</li>
          <li>Skjønnlitteratur og sakprosa</li>
          <li>Essayistisk: stiller spørsmål om samtida</li>
          <li><em class="nn">Samtidsruinar</em> (2008), <em class="nn">Team Tuva</em> (2021)</li>
        </ul>`,
      notes: "Det finst ikkje eit fritt portrett av Eikemo, så ho står utan bilete. Ho har vore leiar for Litteratursymposiet i Odda og skriv nært på det som skjer med oss og kulturen akkurat no. Ho stiller spørsmål meir enn ho gir svar, og brukar konkrete kvardagsbilete om store spørsmål. <em>Samtidsruinar</em> er ei essaysamling om kva som blir att etter industrisamfunna. Forklar ordet essay: ein personleg, undersøkjande sakprosatekst. Legg merke til at to av dei ni kjem frå Odda.",
    },
    {
      type: "bilete",
      kicker: "fødd 1977",
      title: "Olaug Nilssen",
      src: "bilete/nilssen.jpg",
      alt: "Portrett av Olaug Nilssen",
      caption: "Foto: Olav Helland (CC BY-SA 4.0)",
      body: `<ul>
          <li>Frå Førde i Sunnfjord</li>
          <li>Direkte og ærleg, både morosam og sår</li>
          <li><em class="nn">Få meg på, for faen</em> (2005)</li>
          <li><em class="nn">Tung tids tale</em> (2017)</li>
        </ul>`,
      notes: "Nilssen skriv om ting som ikkje er lette å skrive om: psykisk helse, foreldreskap, kjønn, omsorg. Ho spør kva som er «normalt», og kven som får setje grensene. <em>Få meg på, for faen</em> er ein roman om ungdom og seksualitet og vart òg film. Tittelen kan gi fnising, og det er greitt: han viser at nynorsk kan vere direkte og moderne. <em>Tung tids tale</em> handlar om å vere mor til ein son med autisme og fekk Brageprisen. Kjenner de att tittelen?",
    },
    {
      title: "Tekstar snakkar med kvarandre",
      body: `<div class="to-kol">
          <div class="boks"><h3>1945</h3><p>Halldis Moren Vesaas</p><p><em class="nn">Tung tids tale</em>, dikt frå krigen</p></div>
          <div class="boks"><h3>2017</h3><p>Olaug Nilssen</p><p><em class="nn">Tung tids tale</em>, roman om ein son med autisme</p></div>
        </div>`,
      steps: ["<p class=\"midt stor\">Nilssen: det er ei tung tid for mange foreldre <strong>no òg</strong>.</p>"],
      svar: "Når ein forfattar lånar ein tittel eller ei linje frå ein eldre tekst, kallar vi det ein <strong>referanse</strong> eller ei <strong>allusjon</strong>. Den nye teksten får med seg meininga frå den gamle.",
      notes: "Dette er eit fint døme på at litteraturen er ein samtale over tid. Spør før du viser steget: kvifor vel ein forfattar i 2017 ein tittel frå 1945? Kva får lesaren med seg frå det gamle diktet? Elevane pleier å oversjå at referansen seier noko om korleis Nilssen ser på si eiga tid: det er ikkje krig, men for nokre er det like tungt.",
    },
    {
      type: "sporsmal",
      question: "Kven av desse skreiv <strong>ikkje</strong> på 1800-talet?",
      options: ["Aasmund Olavsson Vinje", "Arne Garborg", "Halldis Moren Vesaas"],
      correct: 2,
      explain: "Halldis Moren Vesaas (1907–1995) høyrer til 1900-talet. Vinje og Garborg var sentrale på 1800-talet, då nynorsken vart bygd opp.",
      notes: "Ein kjapp sjekk før elevane skal sortere forfattarane i modulen. Om mange bommar, gå tilbake til lysbilete 4.",
    },
    {
      type: "diskuter",
      title: "Kven vil du lese?",
      prompt: `<p>Vel éin av dei ni forfattarane du har lyst til å lese ein ekte tekst av.</p>
        <p>Kvifor akkurat han eller henne? Stil, tema, staden dei kjem frå?</p>`,
      form: "Fortel sidemannen",
      tid: 3,
      notes: "Dette er munnleg oppvarming til skriveoppgåva i modulen. Be elevane grunngi med noko konkret frå presentasjonen, ikkje berre «han verkar kul». Lytt etter elevar som vel same forfattar: dei kan samarbeide om å finne ein tekst. Tips til skeptiske lesarar: <em>Bikubesong</em>, fordi historiene er korte, eller «Ved Rondane», som er eit kort dikt.",
    },
    {
      type: "oppgave",
      title: "No arbeider de sjølve",
      body: `<ul>
          <li>Les om kvar forfattar og svar på spørsmålet etterpå.</li>
          <li>Sorter forfattarane etter tid.</li>
          <li>Skriv 80 til 150 ord om forfattaren du vil lese meir av.</li>
        </ul>`,
      tid: 15,
      notes: "Modulen har eitt fleirvalsspørsmål etter kvar forfattar, ei sortering og to skriveoppgåver. Den siste skriveoppgåva, der elevane finn og les ein ekte tekst, passar godt som heimearbeid eller til ei biblioteksøkt. Lenkjene står i modulen: bokselskap.no for Vinje, Garborg og Duun, og Nettbiblioteket (nb.no) for dei andre. Nb.no krev at ein sit i Noreg.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\">Nynorsk har vore eit <strong>litteraturspråk</strong> i over 150 år.</p>",
        "<p class=\"stor\">Vinje og Garborg viste at <strong>landsmålet</strong> kunne brukast til alt.</p>",
        "<p class=\"stor\">Stilane er svært ulike: ironisk, episk, sparsam, repetitiv, direkte.</p>",
        "<p class=\"stor\">I 2023 fekk <strong>Jon Fosse</strong> Nobelprisen.</p>",
      ],
      notes: "Exit-lapp: be elevane skrive namnet på éin forfattar og eitt stikkord om stilen hans eller hennar. Då ser du raskt om stil-omgrepa har sett seg. Fortel at dei neste timane skal vi lese tekstar i stilen til desse forfattarane.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen er inngangen til Del 5 og presenterer ni nynorskforfattarar kronologisk: Vinje og Garborg frå 1800-talet, Duun og dei to Vesaas-forfattarane frå 1900-talet, og Fosse, Grytten, Eikemo og Nilssen frå samtida. For kvar forfattar får elevane bakgrunn, stil og kjende verk, og eit lite spørsmål. Presentasjonen gjer det same på tavla, med vekt på stil og på at nynorsk har ein lang litterær tradisjon. Lesemodulane i Del 5 byggjer på dette, fordi kursteksten i kvar modul er skriven i stilen til ein av forfattarane.</p>",
    mal: [
      "Elevane kan namngi fleire nynorskforfattarar og plassere dei i tid.",
      "Elevane kan skildre stilen til nokre av forfattarane med eigne ord og fagomgrep.",
      "Elevane kan forklare at nynorsk har vore eit litteraturspråk sidan landsmålet vart teke i bruk på 1800-talet.",
      "Elevane kan grunngi kvifor dei vil lese meir av ein bestemt forfattar.",
    ],
    lareplan: [1, 2, 3, 15],
    forkunnskapar: "Elevane bør kjenne hovudtrekka i språkhistoria frå Del 1, særleg Ivar Aasen og landsmålet. Det er ein fordel om dei veit kva ein roman, ei novelle, eit dikt og ein diktsyklus er.",
    forebuing: [
      "Test at portretta visest på tavla.",
      "Finn gjerne eit opptak av «Ved Rondane» eller ein Haugtussa-song med musikken til Grieg (lysbilete 5 og 6).",
      "Ta med ei eller to bøker av forfattarane frå skulebiblioteket, til dømes <em class=\"nn\">Is-slottet</em> eller <em class=\"nn\">Bikubesong</em>.",
      "Ha lappar klare til exit-lappen.",
    ],
    okt: [
      { fase: "Oppstart", min: 4, gjer: "<p>Gå gjennom måla og la elevane samle det dei alt veit. Vis dei tre tidene.</p>", lysbilete: "2 til 4" },
      { fase: "1800-talet og 1900-talet", min: 10, gjer: "<p>Vinje, Garborg, Duun og dei to Vesaas-forfattarane. Ta spørsmålet om Grieg og samtalen om «eg» og «vi».</p>", lysbilete: "5 til 12" },
      { fase: "Samtida", min: 9, gjer: "<p>Fosse, Grytten, Eikemo og Nilssen. Avslutt med dei to tekstane som heiter <em class=\"nn\">Tung tids tale</em>, og ein kjapp tidssjekk.</p>", lysbilete: "13 til 19" },
      { fase: "Val av forfattar", min: 4, gjer: "<p>Elevane vel ein forfattar og fortel sidemannen kvifor.</p>", lysbilete: "20" },
      { fase: "Eigenarbeid", min: 15, gjer: "<p>Elevane arbeider i modulen: spørsmåla, sorteringa og den første skriveoppgåva. Den andre skriveoppgåva kan bli heimearbeid.</p>", lysbilete: "21" },
      { fase: "Avslutning", min: 3, gjer: "<p>Oppsummer og lat elevane skrive exit-lapp med ein forfattar og eitt stikkord om stilen.</p>", lysbilete: "22" },
    ],
    misoppfatningar: [
      { feil: "«Nynorsk er eit skulespråk, ikkje eit ordentleg litteraturspråk.»", hjelp: "Vis tidslinja og nobelprisen til Fosse. Nynorsk har vore brukt i dikt, romanar, drama og journalistikk sidan Vinje grunnla <em class=\"nn\">Dølen</em> i 1858." },
      { feil: "«Tekstane i lesemodulane er skrivne av forfattarane.»", hjelp: "Kurstekstane er skrivne i <em>stilen</em> til forfattarane. Kvar lesemodul har i tillegg ein ekte tekst, merkt tydeleg, i original staving." },
      { feil: "«Halldis Moren Vesaas er mest kjend som kona til Tarjei Vesaas.»", hjelp: "Ho var ein av dei viktigaste lyrikarane i si tid. Tittelkvadet i <em class=\"nn\">Tung tids tale</em> er eitt av dei mest kjende dikta på nynorsk." },
      { feil: "«Gamle forfattarar skreiv same nynorsk som vi.»", hjelp: "Vinje og Garborg skreiv landsmål med stor bokstav i substantiv og <em class=\"nn\">aa</em> for å. Dette ser elevane sjølve i dei ekte tekstane i lesemodulane." },
    ],
    samtale: [
      "Kvifor var det viktig at nokon skreiv dikt og romanar på landsmål, og ikkje berre ordbøker?",
      "Kva har forfattarane frå 1800-talet sams med dei som skriv i dag? Kva er ulikt?",
      "Kvifor trur du Olaug Nilssen lånte tittelen frå Halldis Moren Vesaas?",
      "Kva betyr det for nynorsken at ein nynorskforfattar fekk Nobelprisen?",
      "Kva forfattar ville du tilrådd ein som ikkje likar å lese, og kvifor?",
    ],
    tilpassing: {
      stotte: [
        "Gi elevane ei tabell med tre kolonnar (namn, tid, stil) dei fyller ut undervegs.",
        "La elevane konsentrere seg om tre forfattarar, éin frå kvar tid.",
        "Les forfattarportretta i modulen høgt saman med elevar som les seint.",
      ],
      utfordring: [
        "Be elevane finne og lese «Ved Rondane» eller eit dikt frå <em class=\"nn\">Haugtussa</em> i original staving og seie kva som skil språket frå nynorsk i dag.",
        "La elevane lese første kapittel av ein roman av Fosse, Grytten eller Nilssen og samanlikne stilen med skildringa i modulen.",
      ],
    },
    vurdering: [
      "Spørsmåla i modulen og på tavla viser om elevane har fått med seg dei viktigaste fakta.",
      "Exit-lappen viser om elevane kan knyte eit stilomgrep til ein forfattar.",
      "Kjenneteikn på god måloppnåing: eleven plasserer forfattarane i tid, skildrar stilen med fagomgrep og grunngir valet sitt med konkrete verk og trekk.",
    ],
    vidare: "Gå vidare til lesemodulane i Del 5. Lesemodulane om Vinje, Garborg og Duun passar godt rett etter, fordi elevane der møter både ein kurstekst og ein ekte tekst i original staving. Knyt gjerne an til språkhistoria i Del 1.",
  },
});

Larar.register("lesing-vinje", {
  tittelnotat: "I dag les vi to tekstar: ei reiseskildring skriven for kurset i stilen til Vinje, og eit ekte dikt av Vinje frå 1864. Sei tydeleg frå starten at den første teksten er skriven for kurset, og at den andre er Vinje sine eigne ord, i den stavinga han brukte for over 160 år sidan.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>lese ei <strong>reiseskildring</strong> i stilen til Vinje</li>
        <li>sjå korleis forteljaren går frå det han <strong>ser</strong> til det han <strong>tenkjer</strong></li>
        <li>lese eit <strong>ekte dikt</strong> av Vinje frå 1864</li>
        <li>samanlikne dei to tekstane</li>
      </ul>`,
      notes: "Gå raskt gjennom måla. Punkt to er nøkkelen for heile timen: det er dette trekket elevane skal kjenne att i begge tekstane og bruke i si eiga reiseskildring til slutt.",
    },
    {
      type: "bilete",
      kicker: "1818–1870",
      title: "Aasmund Olavsson Vinje",
      src: "bilete/vinje.jpg",
      alt: "Portrett av Aasmund Olavsson Vinje",
      caption: "Foto: Nasjonalbiblioteket (ingen kjende restriksjonar)",
      body: `<ul>
          <li>Journalist, dikter, reiseskildrar</li>
          <li>Tok landsmålet i bruk i praksis</li>
          <li>Bladet <em class="nn">Dølen</em></li>
          <li><em class="nn">Ferdaminne fraa Sumaren 1860</em></li>
        </ul>`,
      notes: "Om klassen har hatt modulen Møt nynorskforfattarane, spør kva dei hugsar om Vinje før du viser punkta. Stilen hans var observant og ironisk, og han blanda høgt og lågt: frå filosofisk refleksjon til ein vits om kva han åt på krua. <em>Ferdaminne</em> er ei reiseskildring frå turen til kroninga av Karl 15. i Trondheim. Det er difor kursteksten i dag er ei reiseskildring.",
    },
    {
      type: "diskuter",
      title: "Før vi les",
      prompt: `<p>Tenk på ei reise du har gjort med tog, buss, bil eller fly.</p>
        <p>Kva såg du ut av vindauget? Kva tenkte du på medan du såg?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      notes: "Førlesinga aktiverer det elevane veit, og gir dei det viktigaste lesegrepet for timen: skiljet mellom det ein ser og det ein tenkjer. Be eitt par dele. Skriv på tavla i to kolonnar: SÅG og TENKTE. Den same oppstillinga kjem att på lysbilete 9.",
    },
    {
      title: "Ord i teksten",
      steps: [
        "<p class=\"stor\"><em class=\"nn\">vidda</em>: høgfjellet, flatt og ope</p>",
        "<p class=\"stor\"><em class=\"nn\">Noregs tak</em>: Finse, den høgaste stasjonen på Bergensbanen</p>",
        "<p class=\"stor\"><em class=\"nn\">tolmodig</em>: roleg, utan å bli irritert</p>",
        "<p class=\"stor\"><em class=\"nn\">lav</em> og <em class=\"nn\">tang</em>: plantar på fjellet og i sjøen</p>",
      ],
      notes: "Viss du har eit kart, vis ruta over Hardangervidda frå Finse til Myrdal og ned mot fjorden. Mange elevar har aldri vore der, og teksten blir lettare når dei ser at toget går frå snaufjell til fjord på kort tid. Det er poenget i siste avsnitt.",
    },
    {
      title: "Sjå etter dette når du les",
      body: `<ul class="stor">
          <li>Kva forteljaren <strong>ser</strong>, og kva han <strong>tenkjer</strong></li>
          <li>Stader der teksten går frå det <strong>konkrete</strong> til det <strong>allmenne</strong></li>
          <li>Den lune, litt <strong>sjølvironiske</strong> tonen</li>
        </ul>`,
      steps: ["<p class=\"midt\">Les éin gong utan å stoppe. Les så ein gong til, sakte.</p>"],
      notes: "Dette er lesestrategien frå modulen. Forklar sjølvironisk: at ein ler litt av seg sjølv eller av «oss vaksne». Be elevane merke seg ein stad der forteljaren slepper det han ser og byrjar å tenkje. Dei som vil, kan skrive ned ei linje. Elevane pleier å lese reiseskildringar som ei ruteliste, så minn dei på at det er tankane som gjer teksten til litteratur.",
    },
    {
      type: "oppgave",
      title: "Les teksten",
      body: `<p class="stor">Les «Med toget over vidda» to gonger.</p>
        <p>Vent med spørsmåla. Vi snakkar om teksten saman først.</p>`,
      del: "teksten «Med toget over vidda»",
      tid: 6,
      notes: "Alternativ: les teksten høgt for klassen første gongen, og la elevane lese sjølve andre gongen. Høgtlesing hjelper elevar som les seint og gir alle same tempo. Teksten er kort, så seks minutt er nok for to gjennomlesingar.",
    },
    {
      type: "sitat",
      text: "Slik er det med oss vaksne òg: vi gjev svar med stødig stemme, sjølv om vi berre delvis veit kva vi snakkar om.",
      kjelde: "«Med toget over vidda»",
      steps: ["<p>Kva har skjedd rett før denne setninga? Kven er «vi»?</p>"],
      notes: "Rett før spør guten mor si om reinsdyr, fjell og innsjøar, og ho svarer tolmodig utan å vite alt. Forteljaren gjer eit lite augneblink om til ein tanke om alle vaksne, og han tek seg sjølv med: «oss vaksne». Det er det sjølvironiske. Oppfølging: kjenner de att at vaksne svarer sikkert sjølv om dei ikkje veit? Gjer de det sjølve?",
    },
    {
      title: "Frå det han ser til det han tenkjer",
      body: `<table>
          <thead><tr><th>Han ser</th><th>Han tenkjer</th></tr></thead>
          <tbody>
            <tr><td>Mora svarer guten</td><td class="steg">Vaksne veit berre delvis.</td></tr>
            <tr><td>Engelskmenn skal gå over vidda</td><td class="steg"><em class="nn">«Kanskje han skjønar noko vi har gløymt.»</em></td></tr>
            <tr><td>Vidda, så lukt av sjø</td><td class="steg"><em class="nn">«Slik er Noreg»</em></td></tr>
          </tbody>
        </table>`,
      notes: "Vis venstre kolonne først og la elevane seie kva forteljaren tenkjer, før du trykkjer fram høgre kolonne. Dette er det viktigaste verkemiddelet i teksten: ein konkret observasjon blir til ein allmenn tanke. Elevane pleier å oversjå at tankane ofte kjem i ei kort setning heilt til slutt i avsnittet.",
    },
    {
      type: "sporsmal",
      question: "Kva slags tone har teksten?",
      options: ["Sint og dramatisk", "Roleg og lun, litt sjølvironisk", "Trist og fortvila", "Formell og faktaprega"],
      correct: 1,
      explain: "Forteljaren observerer roleg, smiler litt av seg sjølv og av «oss vaksne», og ingenting dramatisk skjer. Tonen er lun.",
      notes: "Be elevane peike på eit ord eller ei setning som viser tonen. Gode døme er replikkane til guten og mora, og ryggsekkane som er «like store som dei sjølve». Den siste er ei overdriving, eit lite komisk verkemiddel.",
    },
    {
      type: "diskuter",
      title: "Kva har vi gløymt?",
      prompt: `<p><em class="nn">«Kanskje han skjønar noko vi har gløymt.»</em></p>
        <p>Kva meiner forteljaren at engelskmannen skjønar? Er du samd?</p>`,
      form: "Snakk i grupper på tre",
      tid: 3,
      notes: "Her kan elevane tolke fritt. Mogelege svar: at det er verdt å gå sakte, at naturen opplevest betre til fots, at vi tek fjellet for gitt. Utfordr dei: er det noko ironisk i at det er ein utlending som må minne nordmenn på dette? Kople gjerne til Vinje, som sjølv gjekk og reiste mykje.",
    },
    {
      title: "Ekte Vinje: «Ved Rundarne» (1864)",
      body: `<table>
          <thead><tr><th>I diktet</th><th>I dag</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">saag</em></td><td>såg</td></tr>
            <tr><td><em class="nn">Snjo</em></td><td>snø</td></tr>
            <tr><td><em class="nn">fjaag</em></td><td>glad, oppglødd</td></tr>
            <tr><td><em class="nn">Barnemaal</em></td><td>morsmål, barnespråk</td></tr>
          </tbody>
        </table>`,
      steps: ["<p>Landsmål frå 1864: <strong>stor bokstav</strong> i substantiv, <em class=\"nn\">aa</em> der vi skriv <em class=\"nn\">å</em>.</p>"],
      notes: "Førlesing til den andre teksten. Vis at språket ser framandt ut, men at det meste blir forståeleg når ein les høgt. Ordlista i modulen har fleire ord. Tittelen er i original staving «Ved Rundarne»; i dag heiter diktet oftast «Ved Rondane». Kople til Del 1: dette er landsmålet slik det såg ut berre nokre år etter at Aasen gav ut grammatikken og ordboka.",
    },
    {
      type: "sitat",
      text: "No seer eg atter slike Fjell og Dalar,<br>som deim eg i min fyrste Ungdom saag,<br>og sama Vind den heite Panna svalar;<br>og Gullet ligg paa Snjo, som før det laag.",
      kjelde: "Aasmund Olavsson Vinje, «Ved Rundarne», 1864",
      steps: ["<p>Kva ser han? Kvar har han sett det før?</p>"],
      notes: "Les strofa høgt, sakte, to gonger. Spel gjerne melodien til Grieg etterpå. Spør: kva er «Gullet» som ligg på snøen? Det er sollyset. Det er ein metafor. Elevane pleier å tru at diktet handlar om første gong han ser fjella, men «atter» betyr igjen: han kjem attende til landskapet frå ungdomen. Det er svaret på det første fleirvalsspørsmålet i modulen.",
    },
    {
      type: "diskuter",
      title: "Landskapet talar",
      prompt: `<p><em class="nn">«Det er eit Barnemaal, som til meg talar»</em></p>
        <p><em class="nn">«Alt er som før, men det er meir forklaarat»</em></p>
        <p>Kva meiner Vinje med desse to linjene?</p>`,
      form: "Snakk med sidemannen",
      tid: 3,
      notes: "Den første linja: landskapet snakkar til han på språket frå barndomen, altså minne og kjensler frå oppveksten. Legg merke til at <em>Barnemaal</em> òg kan lesast som morsmål, eit fint poeng i ein tekst skriven på landsmål. Den andre: landskapet er det same, men han forstår det betre no. Spør: finst det ein stad du har kome attende til og opplevd annleis enn før?",
    },
    {
      title: "Samanlikn tekstane",
      body: `<div class="to-kol">
          <div class="boks"><h3>«Med toget over vidda»</h3><p>laus, lun tone</p><p>replikkar og humor</p><p>prosa</p></div>
          <div class="boks"><h3>«Ved Rundarne»</h3><p>tett, høgtidleg tone</p><p>minne og kjensler</p><p>dikt med rim</p></div>
        </div>`,
      steps: ["<p class=\"midt stor\">Begge: frå det ein <strong>ser</strong> til det ein <strong>tenkjer</strong>.</p>"],
      notes: "La elevane seie kva som er likt før du viser steget. Dette er det siste friskriftsspørsmålet i modulen, så samtalen er ei god førebuing. Be dei finne rimorda i første strofe: Dalar, svalar, talar; saag, laag, fjaag. Det viser at diktet er bygd strengt, medan kursteksten er laus prosa.",
    },
    {
      type: "oppgave",
      title: "No arbeider de sjølve",
      body: `<ul>
          <li>Svar på spørsmåla til begge tekstane.</li>
          <li>Skriv di eiga reiseskildring: 150 til 250 ord.</li>
          <li>Bland det du såg med det du tenkte.</li>
        </ul>`,
      tid: 15,
      notes: "Friskriftsspørsmåla har dømesvar som elevane kan klikke fram etter at dei har skrive sitt eige. Minn dei på å skrive først. I skriveoppgåva er det vanlegaste problemet at elevane lagar ei ruteliste: «Så kom vi til … Så åt vi …». Spør: kva la du merke til, og kva fekk det deg til å tenkje på? Dei som blir tidleg ferdige, kan lese meir Vinje på bokselskap.no.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\">Ei god reiseskildring er ikkje ei <strong>ruteliste</strong>.</p>",
        "<p class=\"stor\">Små observasjonar kan føre til <strong>store tankar</strong>.</p>",
        "<p class=\"stor\">Vinje skreiv <strong>landsmål</strong>: same språk, anna staving.</p>",
      ],
      notes: "Exit-lapp: skriv éin ting du såg på veg til skulen i dag, og éin tanke han fekk deg til å tenkje. Då øver elevane på grepet éin gong til.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen har to tekstar. Den første, «Med toget over vidda», er ei reiseskildring skriven for kurset i stilen til Vinje: ein eg-forteljar tek toget over Hardangervidda og lèt små observasjonar føre til større tankar. Den andre er det ekte diktet «Ved Rundarne» frå 1864 i original staving, med ordliste. Presentasjonen er lagd opp som ei leseøkt med førlesing, lesing, samtale om verkemiddel og tolking, og overgang til spørsmåla og skriveoppgåva i modulen.</p>",
    mal: [
      "Elevane kan skilje mellom det forteljaren ser og det han tenkjer, og forklare korleis teksten går frå det konkrete til det allmenne.",
      "Elevane kan skildre tonen i ein tekst og peike på ord og setningar som skaper han.",
      "Elevane kan lese ein kort tekst på landsmål frå 1864 med hjelp av ordliste og forklare innhaldet.",
      "Elevane kan samanlikne ein moderne prosatekst og eit eldre dikt.",
    ],
    lareplan: [1, 2, 3, 6, 15],
    forkunnskapar: "Elevane bør ha møtt Vinje i modulen Møt nynorskforfattarane og kjenne til landsmålet til Ivar Aasen frå Del 1. Omgrepa metafor og rim er nyttige, men kan introduserast undervegs.",
    forebuing: [
      "Les begge tekstane i modulen på førehand.",
      "Finn gjerne eit kart over Bergensbanen (Finse, Myrdal) og eit opptak av «Ved Rondane» med melodien til Grieg.",
      "Avgjer om du vil lese kursteksten høgt første gongen (lysbilete 7).",
      "Ha lappar klare til exit-lappen.",
    ],
    okt: [
      { fase: "Førlesing", min: 5, gjer: "<p>Gå gjennom måla, presenter Vinje og la elevane snakke om ei reise dei har gjort. Gå gjennom orda og lesestrategien.</p>", lysbilete: "2 til 6" },
      { fase: "Lesing", min: 6, gjer: "<p>Elevane les «Med toget over vidda» to gonger, eller du les høgt første gongen.</p>", lysbilete: "7" },
      { fase: "Samtale om kursteksten", min: 8, gjer: "<p>Samtal om sitatet om vaksne, tabellen over sjå og tenkje, tonen, og tanken om engelskmannen.</p>", lysbilete: "8 til 11" },
      { fase: "Det ekte diktet", min: 8, gjer: "<p>Innfør stavinga, les første strofe høgt og samtal om to nøkkellinjer. Samanlikn tekstane.</p>", lysbilete: "12 til 15" },
      { fase: "Eigenarbeid", min: 15, gjer: "<p>Elevane svarer på spørsmåla og byrjar på reiseskildringa. Resten kan bli heimearbeid.</p>", lysbilete: "16" },
      { fase: "Avslutning", min: 3, gjer: "<p>Oppsummer og lat elevane skrive exit-lapp med éin observasjon og éin tanke.</p>", lysbilete: "17" },
    ],
    misoppfatningar: [
      { feil: "«Kursteksten er skriven av Vinje.»", hjelp: "Den første teksten er skriven for kurset i stilen til Vinje, og handlar om eit moderne tog. Berre diktet «Ved Rundarne» er Vinje sine eigne ord." },
      { feil: "«I diktet ser han fjella for første gong.»", hjelp: "Peik på <em class=\"nn\">atter</em> og <em class=\"nn\">som før det laag</em>: han kjem attende til landskapet frå ungdomen." },
      { feil: "«Ei reiseskildring er å fortelje kva ein gjorde i rekkjefølgje.»", hjelp: "Vis tabellen på lysbilete 9: det er tankane som heng seg på observasjonane, som gjer teksten verd å lese." },
      { feil: "«Vinje skreiv feil, han kunne ikkje nynorsk.»", hjelp: "Han skreiv landsmål slik det var normert og brukt i 1860-åra. Nynorsken har endra seg sidan, som alle skriftspråk gjer." },
    ],
    samtale: [
      "Kvifor trur du forteljaren tek med replikkane til guten og mora?",
      "Kva er skilnaden på å skildre eit landskap og å skildre kva landskapet gjer med ein?",
      "Korleis er det å lese eit dikt på landsmål frå 1864? Kva hjelpte deg mest?",
      "Kva stader i ditt liv er «Barnemaal» for deg, stader som talar til deg frå barndomen?",
    ],
    tilpassing: {
      stotte: [
        "Les begge tekstane høgt for elevane, og la dei følgje med i modulen.",
        "Gi elevane ein tokolonne-mal (SÅG og TENKTE) til reiseskildringa.",
        "La elevar som strevar med diktet, konsentrere seg om første strofe og ordlista.",
      ],
      utfordring: [
        "Be elevane lese eit utdrag frå <em class=\"nn\">Ferdaminne</em> på bokselskap.no og finne ein stad der Vinje blandar høgt og lågt.",
        "La elevane skrive om første strofe av «Ved Rundarne» til moderne nynorsk og diskutere kva som går tapt.",
      ],
    },
    vurdering: [
      "Fleirvalsspørsmåla i modulen viser om elevane har forstått innhaldet i begge tekstane.",
      "Friskriftssvara viser om elevane kan tolke og samanlikne, ikkje berre attgi.",
      "Kjenneteikn på god måloppnåing i reiseskildringa: eleven skriv i eg-form, tek med konkrete sanseinntrykk, lèt minst éin observasjon føre til ein større tanke og prøver ein lun tone.",
    ],
    vidare: "Gå vidare til lesemodulen om Garborg, der elevane møter ein lengre tekst om heimkomst og eit ekte utdrag frå <em class=\"nn\">Bondestudentar</em>. Språket i Garborg-utdraget er landsmål frå 1883 og kan samanliknast med Vinje.",
  },
});

Larar.register("lesing-garborg", {
  tittelnotat: "I dag les vi «Heim att», ei forteljing skriven for kurset i stilen til Garborg, om ein ung mann som kjem heim til garden etter fire år i Oslo. Etterpå les vi eit ekte utdrag frå «Bondestudentar» frå 1883. Teksten tek opp at Anders har hatt det tungt psykisk. Ver merksam på at det kan treffe nokon i klassen.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>lese forteljinga <strong>«Heim att»</strong></li>
        <li>sjå kor mykje som ligg <strong>under</strong> det som blir sagt</li>
        <li>lese eit ekte utdrag frå <strong><em class="nn">Bondestudentar</em></strong> (1883)</li>
        <li>samanlikne to unge menn på veg til og frå heimen</li>
      </ul>`,
      notes: "Punkt to er kjernen: i denne teksten seier personane nesten ingenting om det viktigaste. Elevane skal lære å lese det usagde.",
    },
    {
      type: "bilete",
      kicker: "1851–1924",
      title: "Arne Garborg",
      src: "bilete/garborg.jpg",
      alt: "Portrett av Arne Garborg",
      caption: "Foto: Nasjonalbiblioteket (ingen kjende restriksjonar)",
      body: `<ul>
          <li>Frå Time på Jæren</li>
          <li>Sosialrealistisk og psykologisk</li>
          <li>Skreiv om <strong>indre liv</strong> på nynorsk</li>
          <li><em class="nn">Bondestudentar</em> (1883), <em class="nn">Haugtussa</em> (1895)</li>
        </ul>`,
      notes: "Garborg var blant dei første som skreiv om kjenslene, tankane og sjølvransakinga til vanlege folk på nynorsk. I <em>Bondestudentar</em> skreiv han om unge bondegutar som kjem til byen. Forklar sosialrealistisk kort: tekstar som skildrar korleis vanlege folk lever, gjerne med vekt på kår og samfunn. Psykologisk: tekstar som går inn i tankane til personane.",
    },
    {
      type: "diskuter",
      title: "Før vi les",
      prompt: `<p>Forteljinga heiter <strong>«Heim att»</strong>.</p>
        <p>Kva kan ho handle om? Korleis er det å kome heim etter lang tid borte?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      notes: "La elevane gjette handlinga ut frå tittelen, og samle eit par forventingar på tavla. Kom tilbake til dei etter lesinga: stemde det? Mange elevar har erfaring med å kome heim etter ein leir, ei ferie eller ei tid hos den andre forelderen. Knyt gjerne an til det.",
    },
    {
      title: "Ord i teksten",
      steps: [
        "<p class=\"stor\"><em class=\"nn\">sosialantropologi</em>: eit universitetsfag om kulturar og samfunn</p>",
        "<p class=\"stor\"><em class=\"nn\">førelesing</em>: undervisning på universitetet</p>",
        "<p class=\"stor\"><em class=\"nn\">stabbur</em>: gammalt lagerhus på garden</p>",
        "<p class=\"stor\"><em class=\"nn\">grue seg</em> og <em class=\"nn\">lengte</em>: å gru seg til og lengte etter noko <strong>på same tid</strong></p>",
      ],
      notes: "Det siste punktet er ikkje eit vanskeleg ord, men ein nøkkel til teksten: Anders gruar seg til og lengtar etter det same, at mor skal klemme han utan å spørje. Spør om nokon har kjent det slik. Det er eit døme på motstridande kjensler, som er typisk for psykologisk realisme.",
    },
    {
      title: "Sjå etter dette når du les",
      body: `<ul class="stor">
          <li>Kor lite som blir sagt <strong>høgt</strong></li>
          <li>Kva Anders <strong>legg merke til</strong>, og kva det seier om kjenslene hans</li>
          <li>Setninga om at når noko var <strong>stort</strong>, sa ein lite</li>
        </ul>`,
      steps: ["<p class=\"midt\">Teksten er lang. Les éin gong samanhengande, så éin gong sakte.</p>"],
      notes: "Lesestrategi: be elevane merke seg replikkane. Nesten alle er korte, og nesten ingen handlar om kvifor Anders er heime. Elevane pleier å lese forbi dei korte replikkane som om dei var utfyllingsstoff. Dei er det viktigaste i teksten.",
    },
    {
      type: "oppgave",
      title: "Les teksten",
      body: `<p class="stor">Les «Heim att».</p>
        <p>Vent med spørsmåla. Vi snakkar om teksten saman først.</p>`,
      del: "teksten «Heim att»",
      tid: 8,
      notes: "Teksten er lengre enn Vinje-teksten. Vurder å lese dei første fire avsnitta høgt, fram til Anders kjem inn i kjøkenet, og la elevane lese resten sjølve. Dei som les fort, kan lese ein gong til og markere replikkar som seier lite.",
    },
    {
      type: "sitat",
      text: "«Du er heime», sa han.<br>«Ja.»<br>«Det var fint.»",
      kjelde: "«Heim att», far møter Anders",
      steps: ["<p>Kva seier far <strong>eigentleg</strong>?</p>"],
      svar: "Far seier at han er glad for at Anders er heime, og at han ikkje treng forklare seg. Det viktige ligg i det som <strong>ikkje</strong> blir sagt.",
      notes: "Les replikkane høgt, gjerne med to elevar i rollene. Spør: er far kald? Mange elevar svarer ja første gongen. Vis så at teksten sjølv seier: «Det var ikkje mangel på kjærleik.» Dette er det viktigaste å få fram i timen: stillheita er ein måte å vise omsorg på i denne familien.",
    },
    {
      type: "sitat",
      text: "Når noko var stort, sa ein lite. Når noko var lite, sa ein meir.",
      kjelde: "«Heim att»",
      steps: ["<p>Stemmer dette i di familie? Kva er fordelen, og kva er ulempa?</p>"],
      notes: "Denne setninga er nøkkelen til heile teksten, og ho er eit av friskriftsspørsmåla i modulen. Legg merke til oppbygginga: to setningar som speglar kvarandre, med stort og lite bytt om. Det er eit verkemiddel (kiasme eller spegling). Teksten seier sjølv kva ulempa er: Anders har teke med seg denne logikken «som ein sjukdom» til byen, der folk venta at ein skulle snakke om det viktige.",
    },
    {
      title: "Vis, ikkje fortel",
      body: `<table>
          <thead><tr><th>Det står</th><th>Det viser</th></tr></thead>
          <tbody>
            <tr><td><em class="nn">ord … vart tynnare for kvar gong</em></td><td class="steg">Han trur ikkje lenger på sine eigne forklaringar.</td></tr>
            <tr><td><em class="nn">han ville sjå opp og smile, men han klarte ikkje</em></td><td class="steg">Han skjemmest og er nedfor.</td></tr>
            <tr><td><em class="nn">Anders kjende at ryggen hugsa det</em></td><td class="steg">Han finn att noko trygt i kroppen.</td></tr>
          </tbody>
        </table>`,
      notes: "Vis venstre kolonne og la elevane tolke før du viser høgre. Grepet heiter å vise i staden for å fortelje: forfattaren skriv aldri «Anders var deprimert», men viser det gjennom detaljar og handlingar. Dette er akkurat det elevane skal gjere i skriveoppgåva, der dei ikkje får bruke orda glad, trist, redd eller sint.",
    },
    {
      type: "sporsmal",
      question: "Kven ser vi handlinga gjennom?",
      options: ["Mor", "Far", "Anders, fortalt i tredjeperson", "Ein eg-forteljar"],
      correct: 2,
      explain: "Forteljaren brukar <em class=\"nn\">han</em>, men står tett på Anders. Vi får tankane hans, aldri tankane til mor eller far.",
      notes: "Oppfølging: kva ville vore annleis om teksten var fortalt frå far? Vi kunne fått vite kva han tenkjer når han går ut att. Nettopp at vi ikkje veit det, gjer at vi må tolke han slik Anders må.",
    },
    {
      type: "diskuter",
      title: "Slutten",
      prompt: `<p><em class="nn">«for første gong sidan i fjor haust, var det å ikkje vite ikkje ein vond ting»</em></p>
        <p>Er slutten lukkeleg? Kva har endra seg for Anders?</p>`,
      form: "Snakk i grupper på tre",
      tid: 3,
      notes: "Ingenting er løyst: han veit ikkje om han blir eller reiser. Likevel har noko endra seg: usikkerheita er ikkje lenger vond. Dette er ein open slutt. Spør kva far bidrog med: «Det treng du ikkje vite enno.» Teksten handlar om ein ung vaksen som slit, og eit godt spørsmål er: kva hjelper når ein har det tungt? Ver merksam på elevar som kan kjenne seg att.",
    },
    {
      title: "Ekte Garborg: «Bondestudentar» (1883)",
      body: `<ul class="stor">
          <li><strong>Daniel</strong> er ein bondegut som drøymer om å bli <strong>prest</strong></li>
          <li>Presteskulen er dyr, og faren er ikkje rik</li>
        </ul>`,
      steps: ["<p>Landsmål frå 1883: <em class=\"nn\">Aalvor</em> (alvor), <em class=\"nn\">honom</em> (han), <em class=\"nn\">nokot</em> (noko), <em class=\"nn\">verta</em> (bli)</p>"],
      notes: "Førlesing til den andre teksten. Forklar at det å bli prest på den tida var ein av dei få vegane oppover for ein bondegut, og at det kosta mykje. Språket ligg nærare nynorsk i dag enn Vinje, men har framleis stor bokstav i substantiv og <em>aa</em> for å. Be elevane lese høgt for seg sjølve, halvhøgt, og bruke ordlista.",
    },
    {
      type: "sitat",
      text: "Det var ei Soga, som vart fortald med slikt eit Aalvor og slik ein Age, som galdt det ein Oskefot, som hadde vunnet eit Kongerike.",
      kjelde: "Arne Garborg, <em class=\"nn\">Bondestudentar</em>, 1883",
      steps: ["<p>Kva blir det å bli prest samanlikna med?</p>"],
      notes: "Folk i bygda fortel om ein som vart prest, som om det var eventyret om oskeladden som vann kongeriket. Samanlikninga viser kor stor avstanden var mellom bondestanden og embetsstanden. <em>Age</em> betyr respekt, nesten litt frykt. Dette er eit av friskriftsspørsmåla i modulen, så la samtalen vere kort og opne.",
    },
    {
      type: "diskuter",
      title: "To retningar",
      prompt: `<p><strong>Daniel</strong> drøymer seg <strong>bort</strong> frå garden.</p>
        <p><strong>Anders</strong> kjem <strong>heim att</strong> til garden.</p>
        <p>Kva kostar det å reise ut? Kva kostar det å kome att?</p>`,
      form: "Snakk med sidemannen",
      tid: 3,
      notes: "Dette er det siste friskriftsspørsmålet i modulen. Hjelp elevane å sjå at dei to tekstane er to sider av same rørsle, skrivne med 140 års mellomrom. Kople til livssituasjonen til unge i dag: mange må flytte for å ta utdanning. Spør: kva forventingar møter unge som flyttar ut, og som flyttar heim?",
    },
    {
      type: "oppgave",
      title: "No arbeider de sjølve",
      body: `<ul>
          <li>Svar på spørsmåla til begge tekstane.</li>
          <li>Skriv om å kome attende: 150 til 250 ord.</li>
          <li>Forbodne ord: <em class="nn">glad, trist, redd, sint</em>.</li>
        </ul>`,
      tid: 15,
      notes: "Skriveregelen er streng med vilje: alt må visast gjennom detaljar, handlingar og replikkar. Gå rundt og spør: kva gjer personen din med hendene? Kva legg han eller ho merke til? Minn elevane på at ein replikkveksling kan vere berre tre ord, som mellom Anders og far.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\">Det viktigaste står ofte <strong>mellom linjene</strong>.</p>",
        "<p class=\"stor\">Kjensler kan <strong>visast</strong> gjennom detaljar og handling.</p>",
        "<p class=\"stor\">Garborg skreiv om <strong>indre liv</strong> på nynorsk alt i 1883.</p>",
      ],
      notes: "Exit-lapp: skriv éi setning som viser at nokon er nervøs, utan å bruke ordet nervøs. Les nokre høgt neste time.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen har to tekstar. «Heim att» er skriven for kurset i stilen til Garborg: Anders kjem heim til garden etter fire år i Oslo, der noko har «knekt». I familien seier ein lite om det viktige, og kjenslene kjem fram gjennom detaljar og korte replikkar. Den andre teksten er eit ekte utdrag frå første kapittel av <em class=\"nn\">Bondestudentar</em> (1883), om bondeguten Daniel som drøymer om å bli prest. Presentasjonen er lagd opp som ei leseøkt: førlesing, lesing, samtale om det usagde og om å vise i staden for å fortelje, det ekte utdraget, og overgang til spørsmåla og skriveoppgåva.</p>",
    mal: [
      "Elevane kan tolke korte replikkar og forklare kva som ligg under det som blir sagt.",
      "Elevane kan forklare korleis ein tekst viser kjensler gjennom detaljar og handlingar i staden for å namngi dei.",
      "Elevane kan lese eit kort utdrag på landsmål frå 1883 med hjelp av ordliste og forklare innhaldet.",
      "Elevane kan samanlikne korleis to tekstar frå ulike tider framstiller unge menneske og heimen.",
    ],
    lareplan: [1, 2, 3, 5, 6],
    forkunnskapar: "Elevane bør ha møtt Garborg i modulen Møt nynorskforfattarane. Det er nyttig om dei kjenner omgrepa forteljar og replikk. Lesemodulen om Vinje gir ein fin bakgrunn for det eldre språket.",
    forebuing: [
      "Les begge tekstane i modulen på førehand.",
      "Teksten tek opp at Anders har det tungt psykisk. Tenk gjennom om nokon i klassen kan bli særleg treft, og ha eventuelt ein plan for det.",
      "Avgjer om du vil lese byrjinga av «Heim att» høgt (lysbilete 7).",
      "Ha lappar klare til exit-lappen.",
    ],
    okt: [
      { fase: "Førlesing", min: 4, gjer: "<p>Gå gjennom måla, presenter Garborg, la elevane gjette ut frå tittelen, og gå gjennom orda og lesestrategien.</p>", lysbilete: "2 til 6" },
      { fase: "Lesing", min: 8, gjer: "<p>Elevane les «Heim att». Les gjerne byrjinga høgt.</p>", lysbilete: "7" },
      { fase: "Samtale om kursteksten", min: 9, gjer: "<p>Samtal om replikkane til far, setninga om stort og lite, vis-ikkje-fortel, forteljarsynsvinkelen og slutten.</p>", lysbilete: "8 til 12" },
      { fase: "Det ekte utdraget", min: 6, gjer: "<p>Innfør Daniel og stavinga, les sitatet og samanlikn dei to unge mennene.</p>", lysbilete: "13 til 15" },
      { fase: "Eigenarbeid", min: 15, gjer: "<p>Elevane svarer på spørsmåla og byrjar på skriveoppgåva. Resten kan bli heimearbeid.</p>", lysbilete: "16" },
      { fase: "Avslutning", min: 3, gjer: "<p>Oppsummer og lat elevane skrive ei setning som viser nervøsitet utan å namngi han.</p>", lysbilete: "17" },
    ],
    misoppfatningar: [
      { feil: "«Far bryr seg ikkje om Anders, han seier nesten ingenting.»", hjelp: "Vis setninga «Det var ikkje mangel på kjærleik.» Stillheita er måten familien viser omsorg på. Far gir Anders lov til å bli «så lenge du vil»." },
      { feil: "«Ingenting skjer i teksten.»", hjelp: "Det skjer mykje inne i Anders. Be elevane samanlikne korleis han har det første kvelden og på stabburet til slutt." },
      { feil: "«Slutten er uferdig fordi vi ikkje får vite om han blir.»", hjelp: "Det er ein open slutt med vilje. Endringa ligg i at usikkerheita ikkje lenger er vond." },
      { feil: "«Daniel vil bli prest fordi han er veldig religiøs.»", hjelp: "Utdraget viser at draumen òg handlar om å kome seg opp og fram: presten hadde pengar og status, og folk sa at det «kunde verta nokot stort av den Guten»." },
    ],
    samtale: [
      "Kvifor trur du Anders fortalde mor at alt var bra kvar søndag?",
      "Kva betyr det at ryggen hans «hugsa» fjøsarbeidet?",
      "Er det ein styrke eller ein svakheit å seie lite når noko er stort?",
      "Kva forventingar møter unge som reiser ut for å studere, i 1883 og i dag?",
      "Kvifor har forfattaren valt å fortelje berre frå Anders sin ståstad?",
    ],
    tilpassing: {
      stotte: [
        "Les heile «Heim att» høgt, og stopp etter kvart tredje avsnitt for å oppsummere.",
        "Gi elevane ei liste med ord som skildrar kjensler og handlingar, til bruk i skriveoppgåva.",
        "La elevar som strevar med det gamle språket, lese berre første avsnitt av Garborg-utdraget saman med ordlista.",
      ],
      utfordring: [
        "Be elevane skrive same scene, far og Anders på stabburet, frå far sin ståstad.",
        "La elevane lese meir av første kapittel av <em class=\"nn\">Bondestudentar</em> på bokselskap.no og skildre Daniel.",
      ],
    },
    vurdering: [
      "Fleirvalsspørsmåla viser om elevane har fått med seg handlinga i begge tekstane.",
      "Friskriftssvara om setninga med stort og lite og om dei to retningane viser om elevane kan tolke og samanlikne.",
      "Kjenneteikn på god måloppnåing i skriveoppgåva: eleven viser kjensler gjennom konkrete detaljar og handlingar, har ein kort replikkveksling og lèt noko vere usagt.",
    ],
    vidare: "Gå vidare til lesemodulen om Duun, der naturen er ein motstandar og personane handlar meir enn dei snakkar. Grepet med å vise i staden for å fortelje kjem att der.",
  },
});

Larar.register("lesing-duun", {
  tittelnotat: "I dag les vi «Bestefar og stormen», ei dramatisk forteljing skriven for kurset i stilen til Duun, og opninga av «Juvikingar» frå 1918, skriven av Duun sjølv. Bestefar i kursteksten har ein sjukdom som gjer at han gløymer. Nokre elevar har besteforeldre med demens, så ver merksam i samtalen.",
  slides: [
    {
      title: "I dag skal vi",
      body: `<ul class="stor">
        <li>lese den dramatiske forteljinga <strong>«Bestefar og stormen»</strong></li>
        <li>sjå korleis <strong>naturen</strong> blir ein motstandar</li>
        <li>leggje merke til kor lite personane <strong>seier</strong>, og kor mykje dei <strong>gjer</strong></li>
        <li>lese opninga av <strong><em class="nn">Juvikingar</em></strong> (1918)</li>
      </ul>`,
      notes: "Gå raskt gjennom måla. Dersom klassen har lese Garborg-modulen, peik på at vi held fram med det usagde, men no i ein dramatisk tekst der det står noko på spel.",
    },
    {
      type: "bilete",
      kicker: "1876–1939",
      title: "Olav Duun",
      src: "bilete/duun.jpg",
      alt: "Portrett av Olav Duun",
      caption: "Foto: Nasjonalbiblioteket (CC BY 2.0)",
      body: `<ul>
          <li>Frå Jøa i Namdalen</li>
          <li>Episk og dramatisk</li>
          <li>Sterke karakterar mot natur og lagnad</li>
          <li><em class="nn">Juvikfolket</em> (1918–1923), seks band</li>
        </ul>`,
      notes: "Duun voks opp på ei lita øy ved kysten og tok med seg språket og forteljingane derifrå. Bøkene hans kan minne om islandsk sagalitteratur: liv og død og kamp. <em>Juvikfolket</em> følgjer ei slekt ved kysten i Trøndelag gjennom mange generasjonar. Forklar episk: forteljande, med store linjer over lang tid.",
    },
    {
      type: "diskuter",
      title: "Før vi les",
      prompt: `<p>Forteljinga heiter <strong>«Bestefar og stormen»</strong>.</p>
        <p>Kva trur du skjer? Kva kan ein storm gjere i ei forteljing, i tillegg til å vere vêr?</p>`,
      form: "Snakk med sidemannen",
      tid: 2,
      notes: "Få fram at vêr i litteraturen ofte speglar kjensler eller skaper ein prøve for personane. Samle gjetningar og kom tilbake til dei etterpå. Ikkje avslør at bestefar gløymer. Det er betre at elevane oppdagar det i teksten.",
    },
    {
      title: "Ord i teksten",
      steps: [
        "<p class=\"stor\"><em class=\"nn\">beite</em>: der sauene går og et</p>",
        "<p class=\"stor\"><em class=\"nn\">olja</em>: gamal regnjakke av oljetøy</p>",
        "<p class=\"stor\"><em class=\"nn\">søkk</em>: ei lita grop i terrenget</p>",
        "<p class=\"stor\"><em class=\"nn\">sidesprut</em>: regn som kjem på skrå med vinden</p>",
      ],
      notes: "Elevar frå byen kjenner kanskje ikkje gardslivet. Forklar kort at sauer ute i storm kan skade seg eller setje seg fast, og at det difor hastar å få dei inn.",
    },
    {
      title: "Sjå etter dette når du les",
      body: `<ul class="stor">
          <li>Naturen som ein <strong>motstandar</strong> med eigen vilje</li>
          <li>Kor lite personane <strong>forklarar</strong>, og kor mykje dei <strong>gjer</strong></li>
          <li>Augneblinken der far tek eit <strong>val</strong> utan å seie eit ord</li>
        </ul>`,
      steps: ["<p class=\"midt\">Les éin gong samanhengande, så éin gong sakte.</p>"],
      notes: "Lesestrategi: be elevane teikne ei lita pil i margen, eller notere, der dei trur vendepunktet er. Mange vel augneblinken då bestefar går ut. Vendepunktet teksten peikar på, er når far peikar. Det kjem vi tilbake til.",
    },
    {
      type: "oppgave",
      title: "Les teksten",
      body: `<p class="stor">Les «Bestefar og stormen».</p>
        <p>Vent med spørsmåla. Vi snakkar om teksten saman først.</p>`,
      del: "teksten «Bestefar og stormen»",
      tid: 8,
      notes: "Teksten eignar seg godt til høgtlesing fordi han har mange korte replikkar og aukande spenning. Les gjerne sjølv, og la elevane følgje med. Stopp ikkje undervegs.",
    },
    {
      type: "sitat",
      text: "Det var den haustkvelden bestefar gjekk ut etter sauene at vi forstod at han ikkje var den same lenger.",
      kjelde: "«Bestefar og stormen», første setning",
      steps: ["<p>Kva veit vi allereie etter éi setning?</p>"],
      notes: "Første setning fortel at noko avgjerande skjedde, og at forteljaren ser tilbake på det. Det skaper spenning: vi veit at noko vil skje, men ikkje kva. Spør: kven er «vi»? Og kvifor seier forteljaren «ikkje den same lenger» når det er denne kvelden bestefar faktisk er seg sjølv? Det er ein fin tvitydnad å diskutere.",
    },
    {
      type: "sitat",
      text: "Det hadde kome langsamt, som ei elv som vart smalare og smalare.",
      kjelde: "«Bestefar og stormen»",
      steps: ["<p>Kva slags verkemiddel er dette? Kva viser det?</p>"],
      svar: "Ei <strong>samanlikning</strong> (med <em class=\"nn\">som</em>). Gløymsla kjem gradvis, slik ei elv mistar vatn litt om gongen.",
      notes: "Etter sitatet kjem ei trapp: først namn, så kvar han var, så kven dei var. Men ikkje sauene. Be elevane finne denne rekkja i teksten. Ho viser korleis sjukdomen tek meir og meir, og førebur at sauene er det siste han har att.",
    },
    {
      title: "Naturen som motstandar",
      steps: [
        "<p class=\"stor\"><em class=\"nn\">«Vinden reiv i alt han nådde.»</em></p>",
        "<p class=\"stor\"><em class=\"nn\">«den slags regn som finn deg uansett kva du har på deg»</em></p>",
        "<p class=\"midt\">Vinden og regnet <strong>gjer</strong> ting, som om dei hadde vilje: <strong>besjeling</strong>.</p>",
      ],
      notes: "Besjeling (personifisering) er når noko som ikkje lever, får menneskelege eigenskapar. Regnet som «finn» deg er eit godt døme. Spør: korleis ville stormen verke om han berre vart skildra med vindstyrke og regnmengd? Poenget er at naturen blir ein motpart, slik det ofte er hos Duun.",
    },
    {
      type: "diskuter",
      title: "Far sitt val",
      prompt: `<p><em class="nn">«Far sa ingenting. Han peika berre.»</em></p>
        <p>Kva kunne far ha gjort? Kvifor vel han dette?</p>`,
      form: "Snakk i grupper på tre",
      tid: 3,
      notes: "Teksten stiller spørsmåla sjølv: skulle far sende bestefar attende og gjere det «rette og bestemte», eller la han vere i stormen med sauene han har gått etter i seksti år? Far vel å gi bestefar ei oppgåve, utan å gjere ei sak av det. Det er vendepunktet. Spør: kva gir far bestefar ved å be han om hjelp? Svaret er verdigheit. Samtalen kan bli personleg om nokon har besteforeldre med demens. La dei som vil, fortelje, men press ingen.",
    },
    {
      type: "sporsmal",
      question: "<em class=\"nn\">«Ikkje stolen ved omnen. Stormen. Sauen i krattet. Mor som gret.»</em> Kva kjenneteiknar denne slutten?",
      options: ["Eit retorisk spørsmål", "Korte setningsbitar som blir til bilete", "Rim og rytme som i eit dikt", "Ironi"],
      correct: 1,
      explain: "Forteljaren ramsar opp korte bitar utan verb, som bilete i eit fotoalbum. Slik vel han kva minne han vil halde fast på.",
      notes: "Spør: kvifor ikkje skrive ei vanleg setning, «Eg vil hugse at bestefar redda ein sau i stormen»? Dei korte bitane gjer at kvart bilete får stå åleine, og rytmen blir langsam og høgtidleg. Kople til første setning: teksten byrjar og sluttar med minnet.",
    },
    {
      title: "Ekte Duun: «Juvikingar» (1918)",
      body: `<ul class="stor">
          <li>Opninga av <em class="nn">Juvikfolket</em></li>
          <li>Den aller første juvikingen: <strong>Per</strong></li>
          <li>Nynorsk frå 1918 med <strong>trøndsk</strong> dialektfarge</li>
        </ul>`,
      steps: ["<p><em class=\"nn\">sunnant</em> (sørfrå), <em class=\"nn\">bygsla</em> (leigde), <em class=\"nn\">dem</em> (dei), <em class=\"nn\">kleinare</em> (veikare)</p>"],
      notes: "Førlesing til den ekte teksten. Språket ligg nærare det elevane skriv sjølve enn Vinje og Garborg, men har mange trønderske former. Forklar kort situasjonen: Per er husmann og har bygsla ein plass under garden Lines. Husbonden krev meir pliktarbeid enn dei var samde om. Forklar pliktarbeid: arbeid husmannen måtte gjere for bonden som betaling for plassen.",
    },
    {
      type: "sitat",
      text: "Ein dagen kom Lines’n og krevde han etter meir pliktarbeid enn dei var forlikte om. Per såg berre på han. Kom gjorde han ikkje.",
      kjelde: "Olav Duun, <em class=\"nn\">Juvikingar</em>, 1918",
      steps: ["<p>Kor mykje skjer på desse få orda?</p>"],
      notes: "To korte setningar fortel om trass, eit maktforhold og kva Per kjem til å gjere seinare. Duun forklarar ingenting, og lesaren må fylle ut. Legg merke til ordstillinga i «Kom gjorde han ikkje»: <em>kom</em> er flytta fremst, og <em>gjorde</em> tek plassen som verbal. Det gir trykk. Dette er eitt av friskriftsspørsmåla i modulen, så elevane kan bruke dette dømet eller finne eit anna.",
    },
    {
      type: "diskuter",
      title: "Handling framfor ord",
      prompt: `<p>Far i stormen og Per i <em class="nn">Juvikingar</em> seier begge nesten ingenting.</p>
        <p>Kva viser dei gjennom det dei <strong>gjer</strong>? Kva er ulikt?</p>`,
      form: "Snakk med sidemannen",
      tid: 3,
      notes: "Begge tekstane lèt handlingane tale. Far viser omsorg og respekt ved å peike. Per viser trass og æreskjensle ved å ikkje kome, og seinare ved å slå. Skilnaden: far handlar for å halde familien saman, Per handlar mot ein overmakt. Knyt til Duun sin stil: sterke karakterar som strir med andre, med seg sjølv og med lagnaden.",
    },
    {
      type: "oppgave",
      title: "No arbeider de sjølve",
      body: `<ul>
          <li>Svar på spørsmåla til begge tekstane.</li>
          <li>Skriv ei dramatisk scene: naturen står imot, 150 til 250 ord.</li>
          <li>La personane snakke lite og gjere mykje.</li>
        </ul>`,
      tid: 15,
      notes: "Merk: to av spørsmåla til <em>Juvikingar</em> handlar om at Per takkar nei til Mærit, og om setninga «Han var ingen husmanns-larv, vilde dei vita det!». Dette står ikkje i utdraget i modulen, men lenger ut i kapittelet. Fortel elevane dette, og la dei lese vidare på bokselskap.no eller svare ut frå det spørsmålet sjølv fortel. I skriveoppgåva: minn elevane på at noko må stå på spel, og at det skal vere eit vendepunkt der nokon tek eit val.",
    },
    {
      title: "Oppsummering",
      steps: [
        "<p class=\"stor\">Naturen kan vere ein <strong>motstandar</strong> med eigen vilje.</p>",
        "<p class=\"stor\">Ei <strong>handling</strong> kan seie meir enn mange ord.</p>",
        "<p class=\"stor\">Duun skriv <strong>knapt</strong>: lesaren fyller ut resten.</p>",
      ],
      notes: "Exit-lapp: skriv éi setning der vêret gjer noko, som om det levde. Då øver elevane på besjeling til skriveoppgåva.",
    },
  ],
  guide: {
    tid: "Éi økt på 45 minutt",
    intro: "<p>Modulen har to tekstar. «Bestefar og stormen» er skriven for kurset i stilen til Duun: ein gut fortel om kvelden då bestefaren, som har ein sjukdom som gjer at han gløymer, går ut i stormen etter sauene. Far vel å la han hjelpe til utan å seie eit ord om det. Den andre teksten er opninga av <em class=\"nn\">Juvikingar</em> (1918), første bandet i <em class=\"nn\">Juvikfolket</em>, om husmannen Per som set seg opp mot husbonden sin. Presentasjonen er lagd opp som ei leseøkt med førlesing, lesing, samtale om verkemiddel som samanlikning, besjeling og knapp stil, det ekte utdraget, og overgang til spørsmåla og skriveoppgåva.</p>",
    mal: [
      "Elevane kan forklare korleis naturen fungerer som motstandar i ein tekst, og kjenne att besjeling og samanlikning.",
      "Elevane kan tolke handlingar som seier meir enn replikkane, og peike på vendepunktet i forteljinga.",
      "Elevane kan lese eit kort utdrag frå 1918 med dialektfarge og forklare kva Duun oppnår med ein knapp stil.",
      "Elevane kan skrive ei dramatisk scene der personane handlar meir enn dei snakkar.",
    ],
    lareplan: [1, 2, 3, 6, 13],
    forkunnskapar: "Elevane bør ha møtt Duun i modulen Møt nynorskforfattarane. Det er ein fordel om dei har lese Garborg-modulen, der vi arbeidde med det usagde. Omgrepa samanlikning og vendepunkt blir forklarte undervegs.",
    forebuing: [
      "Les begge tekstane i modulen på førehand.",
      "Bestefar har ein sjukdom som gjer at han gløymer. Tenk gjennom om nokon elevar har besteforeldre med demens.",
      "Merk deg at to av spørsmåla til <em class=\"nn\">Juvikingar</em> viser til delar av kapittelet som ikkje står i utdraget (Per og Mærit, og setninga om «husmanns-larv»). Les vidare på bokselskap.no, eller førebu elevane på det (lysbilete 16).",
      "Ha lappar klare til exit-lappen.",
    ],
    okt: [
      { fase: "Førlesing", min: 4, gjer: "<p>Gå gjennom måla, presenter Duun, la elevane gjette ut frå tittelen, og gå gjennom orda og lesestrategien.</p>", lysbilete: "2 til 6" },
      { fase: "Lesing", min: 8, gjer: "<p>Les «Bestefar og stormen» høgt, eller la elevane lese sjølve.</p>", lysbilete: "7" },
      { fase: "Samtale om kursteksten", min: 9, gjer: "<p>Samtal om første setning, samanlikninga med elva, naturen som motstandar, far sitt val og slutten.</p>", lysbilete: "8 til 12" },
      { fase: "Det ekte utdraget", min: 6, gjer: "<p>Innfør Per og språket, les sitatet og samanlikn far og Per.</p>", lysbilete: "13 til 15" },
      { fase: "Eigenarbeid", min: 15, gjer: "<p>Elevane svarer på spørsmåla og byrjar på skriveoppgåva. Resten kan bli heimearbeid.</p>", lysbilete: "16" },
      { fase: "Avslutning", min: 3, gjer: "<p>Oppsummer og lat elevane skrive ei setning der vêret gjer noko, som om det levde.</p>", lysbilete: "17" },
    ],
    misoppfatningar: [
      { feil: "«Bestefar går ut fordi han er forvirra.»", hjelp: "Vis at auga hans er «klårare enn dei hadde vore på månader». Han kjenner att noko han har gjort heile livet. Det er det rette svaret på fleirvalsspørsmålet i modulen." },
      { feil: "«Far er streng når han berre peikar.»", hjelp: "Les avsnittet før, der forteljaren lurer på om far skal sende bestefar heim. Å peike er å gi bestefar ei oppgåve og la han vere seg sjølv." },
      { feil: "«Mor græt fordi ho er redd.»", hjelp: "Ho græt etter at far hennar snakkar til henne for første gong på fjorten dagar. Det er både lette og sorg." },
      { feil: "«Per er berre valdeleg.»", hjelp: "Duun viser eit maktforhold: husbonden krev meir enn avtalt og seier dei opp. Per forsvarer æra si. Det gjer ikkje valden rett, men han har ein grunn." },
    ],
    samtale: [
      "Kvifor trur du forteljaren vil hugse bestefar slik han var denne kvelden?",
      "Kva hadde skjedd om far sende bestefar heim?",
      "Korleis ville teksten vore om stormen berre var vêr?",
      "Kva er likt og ulikt mellom far i stormen og Per i <em class=\"nn\">Juvikingar</em>?",
      "Kvifor trur du Duun forklarar så lite?",
    ],
    tilpassing: {
      stotte: [
        "Les kursteksten høgt, og stopp ved vendepunktet for å la elevane gjette kva far gjer.",
        "Gi elevane ei liste med vêrverb (riv, pisker, ular, finn) til skriveoppgåva.",
        "La elevar som strevar med dialektforma i <em class=\"nn\">Juvikingar</em>, lese første avsnitt og sitatet med ordlista.",
      ],
      utfordring: [
        "Be elevane lese resten av kapittelet «Frå gammalt av» på bokselskap.no og svare på spørsmåla om Mærit.",
        "La elevane skrive same scene frå far sin ståstad, med tankane han har når han ser bestefar kome.",
      ],
    },
    vurdering: [
      "Fleirvalsspørsmåla viser om elevane har forstått kva som skjer med bestefar, og kvifor Per går laus på husbonden.",
      "Friskriftssvara viser om elevane kan tolke handlingar og forklare verknaden av ein knapp stil.",
      "Kjenneteikn på god måloppnåing i skriveoppgåva: det står noko på spel, vêret er skildra med konkrete sanseinntrykk, personane snakkar lite, og det er eit tydeleg vendepunkt.",
    ],
    vidare: "Gå vidare til lesemodulen om Tarjei Vesaas, som òg brukar naturen, men på ein meir stille og symbolsk måte. Samanlikn gjerne korleis Duun og Vesaas skildrar natur.",
  },
});
