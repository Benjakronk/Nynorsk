/* Del 4 — Lesing og tekstforståing
   Tekstane er originale, men skrivne med inspirasjon frå stilen til kjende
   nynorskforfattarar. Forfattaranes namn er nemnde i innleiingane. */

Modules.register({
  id: "lesing-korte-tekstar",
  part: 4,
  title: "Lesetrening — korte tekstar",
  summary: "Åtte korte tekstar i ulik stil, med forståingsspørsmål.",
  estimatedMinutes: 60,
  sections: [
    {
      type: "lesson",
      title: "Slik bruker du modulen",
      content: `
        <p>Her får du åtte korte tekstar i ulik stil. Dei seks første er inspirerte
        av kjende nynorskforfattarar, og dei to siste av den engelske forfattaren
        C.S. Lewis. Namnet på inspirasjonskjelda står i tittelen.</p>
        <p>Vil du lære meir om dei nynorske forfattarane? Sjå modulen
        <em class="nn">Møt nynorskforfattarane</em>.</p>
        <p>Slik gjer du:</p>
        <ol>
          <li>Les teksten ein gong gjennom utan å stoppe opp.</li>
          <li>Les han ein gong til, no sakte og tenk gjennom kva som faktisk står der.</li>
          <li>Svar på spørsmåla. Bruk gjerne teksten medan du svarar.</li>
        </ol>
        <p>Spørsmåla er av to typar: fleirvalg (med fasit) og friskrift (du formulerer
        sjølv eit kort svar). På friskrift kan du klikke fram eit dømesvar etter at du
        har skrive ditt eige.</p>
      `,
    },

    /* ---------- Tekst 1: A.O. Vinje-inspirasjon ---------- */
    {
      type: "reading",
      title: "1. «Med toget over vidda» — inspirert av Aasmund Olavsson Vinje",
      passage: `
        <p>Det er noko underleg med å sitje på eit tog og sjå Noreg gli forbi vindauget.
        Eg har sett vidda mange gonger, men kvar gong ho viser seg på nytt, kjenner eg
        meg som ein framand i mitt eige land.</p>

        <p>Ein gut på kanskje seks år sit ved sida av meg og peikar. — Mor, kva er det
        der? Han spør om eit reinsdyr, eit fjell, ein liten innsjø. Mora hans svarar
        tolmodig, men det er tydeleg at ho sjølv ikkje veit alt. Slik er det med oss
        vaksne òg: vi gjev svar med stødig stemme, sjølv om vi berre delvis veit kva
        vi snakkar om.</p>

        <p>Toget bremsar inn på Finse. «Vi er på taket av Noreg», seier konduktøren
        over høgtalaren, og folk reiser seg for å fotografere kvarandre framfor
        stasjonsskiltet. To engelskmenn står med ryggsekkar like store som dei sjølve.
        Dei skal gå over vidda til Aurland, høyrer eg — fire dagar i raude jakker
        mellom kvite stein.</p>

        <p>— Trur du dei klarer det? spør guten.<br>
        — Sikkert, seier mora.</p>

        <p>Eg sit att med ein liten tanke om at det er noko fint med eit folk som
        framleis går til fots over fjellet. Vi har bilar og fly og hurtigbåtar, og
        likevel finn ein engelskmann ut at det beste han kan gjere i Noreg, er å gå.
        Kanskje han skjønar noko vi har gløymt.</p>

        <p>Lokomotivet plystrar. Vidda opnar seg igjen, og eg ser etter reinsdyr. Det
        er for varmt i dag, seier ein eldre mann i setet bak. Dei held seg i skuggen.
        Vi ser ingen, berre stein og lav og himmel.</p>

        <p>Når vi når Myrdal, har guten sovna. Mora pakkar saman appelsinskal og
        leikar. Toget rular nedover, og det luktar plutseleg sjø. Slik er Noreg: ein
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
            "Som «taket av Noreg».",
            "Som «porten til vidda».",
          ],
          correct: 2,
        },
        {
          type: "freeShort",
          question: "Kva trur du forteljaren meiner med setninga «vi gjev svar med stødig stemme, sjølv om vi berre delvis veit kva vi snakkar om»?",
          modelAnswer: "Forteljaren peikar på at vaksne ofte verkar sikre sjølv om dei eigentleg ikkje veit alt. Vi spelar ein rolle som kunnskapsrike for borna — og kanskje for kvarandre — sjølv om vi er meir usikre enn vi vil seie.",
        },
        {
          type: "freeShort",
          question: "Skildra stemninga i teksten med eigne ord. Bruk to–tre setningar.",
          modelAnswer: "Stemninga er roleg, observerande og litt ettertenksam. Forteljaren ser ut av vindauget og legg merke til små ting, både ute i landskapet og inne i kupéen, utan å vere oppskrudd eller dramatisk.",
        },
      ],
    },

    /* ---------- Tekst 2: Tarjei Vesaas-inspirasjon ---------- */
    {
      type: "reading",
      title: "2. «Jenta og isen» — inspirert av Tarjei Vesaas",
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
          question: "Kvifor trur du forfattaren brukar så korte avsnitt — somme tider berre éi setning per linje?",
          modelAnswer: "Dei korte avsnitta gjer at lesaren stoppar opp mellom kvart bilete. Det skapar ein roleg, nesten meditativ rytme som passar med stemninga ute på isen — det er stilt, ho går sakte, ho legg merke til ein og ein ting.",
        },
        {
          type: "freeShort",
          question: "Kva tyder setninga «Heile dalen heldt pusten» i denne samanhengen?",
          modelAnswer: "Det er eit bilete på korleis det er heilt stilt og urørleg i dalen — som om naturen sjølv ventar på noko, eller berre held seg roleg medan jenta går ut på isen for første gong.",
        },
      ],
    },

    /* ---------- Tekst 3: Frode Grytten-inspirasjon ---------- */
    {
      type: "reading",
      title: "3. «Bussen klokka kvart over fem» — inspirert av Frode Grytten",
      passage: `
        <p>Lina står på busshaldeplassen klokka kvart over fem. Det regnar.</p>

        <p>Ikkje skikkeleg regn, berre den slags som gjer alt litt fuktig utan å gi seg
        utslag i pyttar. Ho har på seg ei tynn jakke. Den nye, frå Zara. Ho er litt for
        kald, men ho vil ikkje gå inn att.</p>

        <p>Mor ringjer.<br>
        Ho svarar ikkje.</p>

        <p>Bussen kjem ti minutt for seint, slik bussar pleier. Ho set seg lengst bak.
        Ein gut ho kjenner litt frå skulen, Marius, set seg ned ved sida av henne.</p>

        <p>— Hei, seier han.<br>
        — Hei.<br>
        — Skal du heim?<br>
        — Til Marte.<br>
        — Å. Du har ikkje sett Sander i dag?</p>

        <p>Ho seier ikkje noko. Ser ut av vindauget. Marius forstår.</p>

        <p>Bussen rular gjennom regnet. Forbi Coop Extra, forbi den nye blokka som dei
        reiv vekk parken for. Lina hugsar at ho leikte i den parken då ho var lita. No
        står det bygningar der, og folk bur i dei, og det er sikkert greitt for dei
        som bur der, men ho saknar parken.</p>

        <p>— Det går nok bra, seier Marius. Han veit ikkje kva som har skjedd, men han
        skjønar noko.<br>
        — Mm.</p>

        <p>Mor ringjer igjen. Ho avviser samtalen.</p>

        <p>Ved Solheim går Marius av.<br>
        — Bra du klemmer på, seier han når han reiser seg. — Du veit. Du må ikkje vere
        åleine om det er noko.</p>

        <p>Ho nikkar. Han er litt rar, Marius, men nokre gonger seier han slike ting, og
        då veit ein at han har lytta heile tida.</p>

        <p>Bussen tek til venstre opp Fløensbakken. Lina lener panna mot vindauget.
        Kaldt. Bra.</p>

        <p>Heime hjå Marte er det varmt. Marte gjev henne ein tørr genser. Ein kopp te.
        Ingen spørsmål.</p>

        <p>Etter ein time ringjer Lina mor.<br>
        — Eg er hjå Marte. Eg kjem heim i kveld.<br>
        — Greitt, seier mor.</p>

        <p>Stemma er liten, som om mor òg har grini.</p>

        <p>Då dei legg på, sit Lina lenge på senga til Marte og ser ut. Det regnar enno.
        Men ho er innandørs no, og det luktar te, og det er nesten greitt.</p>
      `,
      questions: [
        {
          type: "multipleChoice",
          question: "Korleis verkar forholdet mellom Lina og mora hennar?",
          options: [
            "Heilt openbart og lett.",
            "Anstrengt — det er noko som ikkje er sagt mellom dei.",
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
            "Stille, men merksam — han skjønar at noko er gale.",
            "Sint.",
          ],
          correct: 2,
        },
        {
          type: "freeShort",
          question: "Korleis brukar forfattaren det at Lina ikkje svarar telefonen frå mora, til å skildre kjenslene hennar?",
          modelAnswer: "Ved å vise at ho avviser mora to gonger utan å seie ein einaste tanke høgt, lar forfattaren oss skjøne at det er noko vondt i forholdet — utan å fortelje oss kva. Vi får kjensla av at Lina er såra eller sint, men sjølv held att informasjonen.",
        },
        {
          type: "freeShort",
          question: "Kvifor trur du teksten er sett saman av så korte setningar og avsnitt?",
          modelAnswer: "Dei korte setningane gjev ein nervøs, klipt rytme som passar med at Lina ikkje vil snakke om det som har skjedd. Det speglar òg ein moderne by-rytme — kjapt, oppstykka, der mykje er underforstått.",
        },
      ],
    },

    /* ---------- Tekst 4: Halldis Moren Vesaas-inspirasjon ---------- */
    {
      type: "reading",
      title: "4. «Ein morgon» — inspirert av Halldis Moren Vesaas",
      passage: `
        <p>Det er ikkje noko stort med ein morgon i april. Sola står opp, slik ho gjer
        kvar dag. Fuglane syng utanfor. Eg ligg under dyna og ser strålane finne vegen
        mellom gardinene og leggje ein lys stripe over golvet.</p>

        <p>Eg veit at i kjøkenet står far. Han kokar kaffe. Vatnet syd, han slår det
        over filteret, og ein lukt — brun og bitter og varm — legg seg over heile huset.
        Det er denne lukta som vekkjer meg, meir enn fuglane, meir enn lyset.</p>

        <p>Eg kjem ned i pysjamasen. Far snur seg ikkje. Han veit at eg er der.<br>
        — Brød på bordet, seier han.<br>
        — Mm.</p>

        <p>Vi sit, og vi seier ikkje mykje. Det er ikkje fordi vi ikkje har noko å seie.
        Det er fordi det er morgon, og vi har heile dagen til å seie det. No skal vi
        berre vere her, han og eg, med kaffe og brød og lyset som flyttar seg over
        kjøkenbordet.</p>

        <p>Mor søv enno. Ho jobbar kveldsskift, kjem heim seint. Eg går stilt når eg
        skal opp att for å hente skuleboka. Eg lukkar døra utan ein lyd.</p>

        <p>Då eg går ut, vinkar far frå vindauget. Eg vinkar attende. Og det er ingenting
        spesielt med denne morgonen, og det er kanskje difor eg hugsar han. For det
        fanst ein tid då slike morgonar var alle eg hadde. Ein far i kjøkenet. Eit brød.
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
          modelAnswer: "Forteljaren peikar på at vi sjeldan ser kor verdfulle dei små, kvardagslege augneblinkane er medan vi har dei. Det er først når dei tek slutt — når nokon vert borte — at vi skjønar kor mykje dei betydde.",
        },
      ],
    },

    /* ---------- Tekst 5: Olaug Nilssen-inspirasjon ---------- */
    {
      type: "reading",
      title: "5. «Klassebilete» — inspirert av Olaug Nilssen",
      passage: `
        <p>Eg har sett på det klassebilete frå 7. trinn fleire gonger denne hausten. Eg
        veit ikkje kvifor. Det ligg i ein skuff på rommet mitt, saman med gamle prøver
        og eit halvbrukt notathefte. Eg drog det fram ein dag eg skulle rydde, og no
        ligg det øvst, og eg ser på det.</p>

        <p>Tjueåtte ungar. Sju lærarar bak. Eg står på bakerste rad mellom Lisa og
        Henrik. Lisa har raudt hår og smiler så det skin. Henrik ser ned i golvet. Eg
        ser rett i kamera, men eg smiler ikkje. Eg har på meg ein blå hettegenser eg
        hugsar at eg syntest var stygg, men som mor sa eg måtte ha på den dagen fordi
        alt anna var i vasken.</p>

        <p>To av jentene på bilete bur ikkje i landet lenger. Familiane deira flytta.
        Tre av gutane går i klassen min på vidaregåande no, men vi seier ikkje hei
        lenger. Ein gut — Mikkel — døydde i ei ulukke i fjor sommar. Han står lengst
        til venstre, smiler skeivt, har på seg ei Brann-trøye.</p>

        <p>Eg veit ikkje kva eg leitar etter når eg ser på det. Kanskje noko som ein
        gong var rett. Kanskje meg sjølv, slik eg såg meg sjølv den gongen: som ei
        jente som hadde alt framom seg, alt ope, alt mogleg. No er eg femten, og det
        meste er framleis ope, men det er mindre ope enn det var.</p>

        <p>Mor kom inn forleden då eg sat med bilete på fanget.<br>
        — Ser du på dei gamle bilete?<br>
        — Litt.<br>
        — Var det ikkje noko du skulle gjere?<br>
        — Jo.</p>

        <p>Eg la det vekk då. Men neste dag tok eg det fram att.</p>

        <p>Eg trur kanskje vaksne ikkje skjønar at å sjå på eit gamalt bilete kan vere
        arbeid òg. Det er ikkje berre nostalgi. Det er noko ein gjer for å finne ut
        korleis ein er kome hit. Kor mange val og uhell og avskjeder som skal til for
        at den jenta på bilete — ho i den stygge blå hettegenseren — blir til den jenta
        som no sit på senga si og tenkjer.</p>
      `,
      questions: [
        {
          type: "multipleChoice",
          question: "Kvifor likte forteljaren ikkje hettegenseren ho hadde på seg på klassebilete?",
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
            "Sakleg og kort, men med ein nærleik — han er ein av fleire skjebner ho nemner.",
            "Med dramatisk sorg.",
          ],
          correct: 2,
        },
        {
          type: "freeShort",
          question: "Kva meiner forteljaren med at «å sjå på eit gamalt bilete kan vere arbeid»?",
          modelAnswer: "Ho meiner at det ikkje berre er kjekt eller sentimentalt å sjå på gamle bilete. Det er ein måte å forstå seg sjølv på — å sjå kva som har skjedd mellom då og no, og kva som har gjort henne til den ho er.",
        },
        {
          type: "freeShort",
          question: "Korleis viser teksten at livet til forteljaren har endra seg sidan 7. trinn?",
          modelAnswer: "Ho nemner konkrete endringar: to klassevenninner har flytta ut av landet, tre gutar ho ikkje lenger snakkar med, og ein klassekamerat som er død. Ho seier òg at det meste er «mindre ope» enn det var — at val har stengt nokre dører.",
        },
      ],
    },

    /* ---------- Tekst 6: Marit Eikemo-inspirasjon ---------- */
    {
      type: "reading",
      title: "6. «Om å lese sakte» — inspirert av Marit Eikemo",
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
        gjere — sjølv om eg ikkje veit kva slags hekk det skulle vere, og forfattaren
        neppe har tenkt på lukt i det heile.</p>

        <p>Slik kan ei bok bli. Ho blir ikkje informasjon. Ho blir lukt og rom og kjensle.
        Og det krev tid. Det krev at ein gjev frå seg kontrollen ein liten stund, at ein
        lar teksten skje med ein sjølv.</p>

        <p>Eg er ikkje sikker på at eg kan det lenger. Når eg les ein artikkel på fjorten
        minutt, sit eg og uroleg vippar med foten. Eg har lyst til å gå vidare. Eg veit
        at ingen kjem til å spørje meg ut om teksten. Eg veit at det viktige er at eg
        har lese han, ikkje at eg har lese han godt.</p>

        <p>Men eg meiner at vi taper noko her. Ikkje noko stort, kanskje, men noko
        presist: evna til å bli endra av ein tekst. Ein artikkel kan endre meg dersom eg
        les han sakte, dersom eg blir ståande att i han ein stund. Dersom eg les han
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
            "At det knapt er å lese — ein får informasjon, men ikkje meir.",
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
            "At den tredje gongen er den eigentlege lesinga — då bur ein i diktet.",
            "At ein bør memorere det etter tre gonger.",
          ],
          correct: 2,
        },
        {
          type: "freeShort",
          question: "Kva meiner forfattaren med å «bli endra av ein tekst»?",
          modelAnswer: "At ein tekst ikkje berre gir oss informasjon, men kan gjere noko med oss — endre måten vi tenkjer på, kjenslene våre, kanskje korleis vi ser på oss sjølve eller andre. Dette krev at vi les sakte og lar teksten få tid til å verke.",
        },
        {
          type: "freeShort",
          question: "Kva slags lesing gjer du sjølv? Liknar det meir på den raske eller den sakte måten forfattaren skildrar? Grunngi.",
          modelAnswer: "Eit svar kan vere: Eg les for det meste raskt på nettet, særleg når eg skal finne ut noko spesifikt. Men når eg les ei bok eg verkeleg liker, kan eg gløyme tida — og då er det meir lik den sakte lesinga forfattaren skildrar.",
        },
      ],
    },

    /* ---------- Tekst 7: C.S. Lewis-inspirasjon (Sehnsucht) ---------- */
    {
      type: "reading",
      title: "7. «Det vi ikkje har namn på» — inspirert av C.S. Lewis",
      passage: `
        <p>Det finst ei kjensle som du har hatt mange gonger, men som du kanskje aldri
        har gitt eit namn. Ho kjem ofte når du er åleine. Ho kan kome ein søndag
        ettermiddag, når lyset er på veg ned og du sit ved kjøkenbordet med ein kopp
        som har vorte kald. Eller når du står ved busshaldeplassen ein vinter og ser
        himmelen bli rosa. Eller når du les ei setning i ei bok som du aldri kjem til
        å gløyme, sjølv om du ikkje veit kvifor.</p>

        <p>Det er ein slags lengsle. Men ikkje lengsle etter noko du veit kva er. Ikkje
        lengsle etter ein gut eller jente, eller eit kjøp, eller ein stad du har vore.
        Det er som om noko inne i deg peikar mot ein stad, og du ikkje veit kvar staden
        er — berre at han finst.</p>

        <p>Vaksne er ofte redde for denne kjensla. Dei prøver å fylle henne med noko.
        Dei kjøper ein ny telefon, dei flyttar, dei byrjar med yoga eller spring eit
        maraton. Og ofte er kjensla borte for ei stund. Men ho kjem alltid att, kanskje
        sterkare, kanskje med eit anna ansikt, men ho kjem.</p>

        <p>Eg trur ikkje vi skal bli kvitt henne. Eg trur ho fortel oss noko. Ho seier
        kanskje: «Du er meir enn det du ser. Verda er meir enn det du veit. Det du
        leitar etter, finst, sjølv om du ikkje veit kva det er.»</p>

        <p>Ein gut eg kjenner gret ein gong fordi han høyrde ein song. Han kunne ikkje
        forklare det. Songen var ikkje sørgmodig. Han var berre vakker. Då han var
        ferdig med å gråte, sa han: «Det var som om eg hugsa noko eg aldri hadde
        opplevd.»</p>

        <p>Slik er det. Vi hugsar ting vi ikkje har opplevd. Vi lengtar mot stader vi
        aldri har vore. Og dersom vi tek denne kjensla på alvor — ikkje som ein
        sjukdom som skal lækjast, men som ein peikar som vil oss noko — kan ho føre
        oss langt.</p>

        <p>Kva er det du lengtar mot, du som les dette no? Du veit kanskje ikkje. Det
        er heilt greitt. Det er nettopp det som er poenget.</p>
      `,
      questions: [
        {
          type: "multipleChoice",
          question: "Korleis vil forfattaren at vi skal forhalde oss til den underlege lengsla?",
          options: [
            "Bli kvitt henne så fort som mogleg.",
            "Bytte henne ut med noko konkret, t.d. eit nytt kjøp.",
            "Ta henne på alvor som noko som vil seie oss noko viktig.",
            "Sjå på henne som ein sjukdom.",
          ],
          correct: 2,
        },
        {
          type: "multipleChoice",
          question: "Korleis reagerer guten på songen han høyrer?",
          options: [
            "Han ler og syng med.",
            "Han græt, og seier at det var som å hugse noko han ikkje hadde opplevd.",
            "Han slår av musikken.",
            "Han blir sint.",
          ],
          correct: 1,
        },
        {
          type: "freeShort",
          question: "Kva trur du forfattaren meiner med «vi hugsar ting vi ikkje har opplevd»?",
          modelAnswer: "Forfattaren peikar på at vi kan kjenne ein slags gjenkjenning eller heimkomstkjensle ved noko vi aldri har sett før — eit landskap, ein melodi, ei setning. Det er som om noko inne i oss veit at det vi opplever, høyrer til ein større heilskap vi ikkje har tilgang til, men som vi er ein del av.",
        },
        {
          type: "freeShort",
          question: "Har du sjølv kjent på noko liknande som det forfattaren skildrar? Skriv kort om ein situasjon — eller skriv om kvifor det er vanskeleg å setje ord på.",
          modelAnswer: "Eit svar kan vere: Ja, eg har kjent det ein gong i fjor då eg gjekk åleine heim ein kveld og himmelen var raud. Eg vart plutseleg trist, men på ein god måte. Eg veit ikkje kva eg lengta etter, men det kjentest viktig.",
        },
      ],
    },

    /* ---------- Tekst 8: C.S. Lewis-inspirasjon (små val) ---------- */
    {
      type: "reading",
      title: "8. «Den breie og den smale døra» — inspirert av C.S. Lewis",
      passage: `
        <p>Eg trudde lenge at dei store vala var dei viktige. Yrkesvalet. Ekteskapet.
        Flyttinga. Det folk skriv om i sjølvbiografiar. Eg trudde at ein vart den ein
        vart på grunn av få, store korsvegar — kanskje fem eller seks i eit
        menneskeliv.</p>

        <p>No er eg ikkje så sikker.</p>

        <p>Eg har lagt merke til noko. Når eg ser på dei eg kjenner — dei eg verkeleg
        kjenner — kan eg sjeldan peike på eitt val som forklarar kven dei er. Dei er
        meir slik dei er fordi dei tusen gonger har gjort eit lite val på same måte.
        Han som alltid seier sanninga sjølv når det er lite på spel — det er hundre
        tusen gonger han har gjort det, ikkje éin gong. Ho som alltid finn noko
        vennleg å seie til ein ny — det er øving. Ikkje moralsk geni. Ikkje eit stort
        val. Tusen små.</p>

        <p>Det er to dører, har eg byrja å tenkje. Den eine er brei og open. Du går
        gjennom henne fordi det er enklast. Du seier ein liten løgn fordi det er
        ubehageleg å seie sanninga. Du går forbi nokon som er åleine fordi det er
        ubehageleg å gå bort til dei. Du svarar irritert fordi du er sliten. Ingen
        ser det. Det er berre eit lite val. Du gjer det og går vidare.</p>

        <p>Den andre er smal. Du går gjennom henne fordi du veit at det er rett, sjølv
        om det er litt vondt. Du seier sanninga, sjølv når det kostar. Du går bort til
        den som er åleine, sjølv om du skulle gått heim. Du svarar mildt, sjølv om du
        er sliten.</p>

        <p>Det merkelege er at ingen av desse vala synest store. Du tenkjer på dei i
        to sekund. Du tenkjer kanskje at dei ikkje betyr noko.</p>

        <p>Men gjer du same valet hundre tusen gonger, blir du eit menneske. Eit
        bestemt slags menneske. Den breie døra fører til éin person. Den smale til ein
        annan. Og ingen av dei to personane vart til på grunn av eit stort val. Dei
        vart til på grunn av tusen små.</p>

        <p>Du sit kanskje no og tenkjer: dette gjeld ikkje meg, ikkje no, ikkje i
        kveld. Men det gjer det. Det gjer det heile tida.</p>
      `,
      questions: [
        {
          type: "multipleChoice",
          question: "Kva trur forfattaren no formar karakteren vår mest?",
          options: [
            "Eit fåtal store val som yrkesval og ekteskap.",
            "Genetikk og oppvekst.",
            "Tusen små val vi gjer kvar dag, ofte utan å tenkje på dei.",
            "Tilfeldigheiter vi ikkje kan styre.",
          ],
          correct: 2,
        },
        {
          type: "multipleChoice",
          question: "Korleis forklarar forfattaren det at somme menneske alltid finn noko vennleg å seie?",
          options: [
            "Dei er fødd snillare enn andre.",
            "Det er ei øving — dei har gjort det same valet mange gonger.",
            "Det er fordi dei har det godt sjølv.",
            "Det er flaks.",
          ],
          correct: 1,
        },
        {
          type: "freeShort",
          question: "Forklar med eigne ord kva metaforen om «den breie og den smale døra» tyder.",
          modelAnswer: "Dei to dørene står for to slags val — det lette valet, der ein gjer det som er enklast for seg sjølv i augneblinken, og det vanskelege valet, der ein gjer det som er rett sjølv om det kostar litt. Forfattaren meiner at desse to slags val, gjort hundrevis av gonger, formar oss til kven vi blir.",
        },
        {
          type: "freeShort",
          question: "Er du einig i at små val formar oss meir enn store? Grunngi standpunktet ditt.",
          modelAnswer: "Eit døme på svar: Ja, eg trur det. Eit stort val som å velje skule kan bli endra, men måten ein behandlar andre på kvar dag bygger ein vane som er vanskeleg å snu. Eller motsett: Nei, eg trur dei store vala har størst makt, fordi dei opnar eller stengjer dører som ingen små val kan endre.",
        },
      ],
    },

    /* ---------- Avsluttande refleksjon ---------- */
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Eiga reflektering",
      question: "Kva av dei åtte tekstane likte du best, og kvifor? Skriv 100–200 ord. Bruk gjerne konkrete døme frå teksten du valde, og samanlikn han gjerne med éin av dei andre tekstane.",
      minWords: 100,
      checklist: [
        "Vel ein tekst og namngi han.",
        "Forklar kva du likte ved stilen eller innhaldet.",
        "Bruk minst eitt konkret døme frå teksten.",
        "Samanlikn gjerne med ein annan av dei åtte tekstane.",
        "Skriv på nynorsk.",
      ],
    },
  ],
});

Modules.register({
  id: "nynorskforfattarane",
  part: 4,
  title: "Møt nynorskforfattarane",
  summary: "Bli kjend med ni kjende nynorskforfattarar — frå Vinje til Olaug Nilssen.",
  estimatedMinutes: 40,
  sections: [
    {
      type: "lesson",
      title: "Kvifor møte forfattarane?",
      content: `
        <p>Tekstane du har lese (eller skal lese) i lesetreningsmodulane er originale —
        eg har skrive dei sjølv — men dei er <em class="nn">inspirerte av stilen</em>
        til ni kjende nynorskforfattarar. I denne modulen får du møte dei sjølve.</p>

        <p>Vi går kronologisk — frå 1800-talet og fram til i dag. Etter kvar forfattar
        nemner eg eit par av dei viktigaste verka deira, så du kan finne fram til
        ekte tekstar på biblioteket eller på nettet om du blir nysgjerrig.</p>

        <p>Til slutt får du ein liten quiz og ei skriveoppgåve.</p>
      `,
    },

    {
      type: "lesson",
      title: "1. Aasmund Olavsson Vinje (1818–1870)",
      content: `
        <p><strong>Frå:</strong> Vinje i Telemark.<br>
        <strong>Yrke:</strong> Journalist, lyrikar, reiseskildrar.</p>

        <p>Vinje voks opp i fattige kår og arbeidde seg fram som lærar og seinare jurist
        og journalist. Han var ein av dei første som tok i bruk landsmålet til Ivar
        Aasen i praktisk skrift. I 1858 grunnla han bladet <em class="nn">Dølen</em>,
        som han skreiv mest sjølv — eit slags eit-mannsblad fullt av reisebrev,
        meiningar, dikt og kommentarar.</p>

        <p><strong>Stil:</strong> Han var observant og ironisk, og blanda høgt og lågt
        på ein måte som var ny i norsk skrift. Han kunne skifte frå filosofisk
        refleksjon til ein vits om kva han åt på krua.</p>

        <p><strong>Kjende verk:</strong></p>
        <ul>
          <li><em class="nn">Ferdaminne fraa Sumaren 1860</em> — reiseskildring frå
              turen til kroninga av Karl 15. i Trondheim. Rekna som ein klassikar.</li>
          <li>Dikt: <em class="nn">«Ved Rondane»</em> («No ser eg atter slike fjell og
              dalar …»), <em class="nn">«Blåmann»</em>, <em class="nn">«Den dag kjem
              aldri at eg deg gløymer»</em>.</li>
        </ul>

        <div class="callout">
          <strong>Vil du lese?</strong> «Ved Rondane» er kort, vakker og finst gratis på
          mange nettstader. Mange syng henne òg — Edvard Grieg sette musikk til.
        </div>
      `,
    },

    {
      type: "lesson",
      title: "2. Arne Garborg (1851–1924)",
      content: `
        <p><strong>Frå:</strong> Time på Jæren.<br>
        <strong>Yrke:</strong> Romanforfattar, lyrikar, kulturkritikar.</p>

        <p>Garborg var ein av dei sterkaste røystene i nynorsk-bevegelsen på 1800- og
        tidleg 1900-tal. Han skreiv om bondelivet han kom frå, om reisa til byen, om
        unge menneske som strir med tru, tvil og lengsel.</p>

        <p><strong>Stil:</strong> Sosialrealistisk og psykologisk. Han var blant dei
        første som skreiv om indre liv på nynorsk — kjenslene, tankane,
        sjølvransakinga til vanlege folk.</p>

        <p><strong>Kjende verk:</strong></p>
        <ul>
          <li><em class="nn">Bondestudentar</em> (1883) — roman om unge bondegutar som
              prøver å studere seg fram i byen.</li>
          <li><em class="nn">Trætte Mænd</em> (1891) — roman om livskrise.</li>
          <li><em class="nn">Fred</em> (1892) — roman om religiøs uro.</li>
          <li><em class="nn">Haugtussa</em> (1895) — diktsyklus om jenta Veslemøy, som
              har synske evner. Edvard Grieg tonsette delar av han.</li>
        </ul>

        <div class="callout">
          <strong>Vil du lese?</strong> Diktet <em class="nn">«Du ser meg ikkje»</em> frå
          Haugtussa er ein god start. Garborgs gard på Jæren — Knudaheio — er i dag
          eit museum.
        </div>
      `,
    },

    {
      type: "lesson",
      title: "3. Olav Duun (1876–1939)",
      content: `
        <p><strong>Frå:</strong> Jøa i Namdalen (Trøndelag).<br>
        <strong>Yrke:</strong> Lærar og romanforfattar.</p>

        <p>Duun voks opp på ein liten øy ved kysten og bar med seg heile livet språket
        og forteljingane derifrå. Hovudverket hans er ein svær slektsroman om
        Juvik-folket, ein gard ved kysten i Trøndelag, gjennom mange generasjonar.</p>

        <p><strong>Stil:</strong> Episk og dramatisk. Duun skreiv om sterke karakterar
        som strir med naturen, med sine eigne kjensler og med lagnaden. Bøkene hans
        kan minne litt om islandsk sagalitteratur — det er liv og død og kamp.</p>

        <p><strong>Kjende verk:</strong></p>
        <ul>
          <li><em class="nn">Juvikfolket</em> (1918–1923, seks band) — slektsroman frå
              kysten. Rekna som eit av dei store norske romanverka.</li>
          <li><em class="nn">Medmenneske</em> (1929) — roman om val og samvit.</li>
          <li><em class="nn">Ragnhild</em> (1931).</li>
        </ul>

        <div class="callout">
          <strong>Visste du?</strong> Olav Duun vart fleire gonger nominert til
          Nobelprisen i litteratur, men fekk han aldri.
        </div>
      `,
    },

    {
      type: "lesson",
      title: "4. Tarjei Vesaas (1897–1970)",
      content: `
        <p><strong>Frå:</strong> Vinje i Telemark.<br>
        <strong>Yrke:</strong> Romanforfattar og lyrikar.</p>

        <p>Tarjei Vesaas voks opp på ein gard og budde mesteparten av livet i bygda si.
        Han har skrive nokre av dei mest leste romanane på nynorsk i det 20. hundreåret.
        Han var gift med lyrikaren Halldis Moren Vesaas.</p>

        <p><strong>Stil:</strong> Sparsom, poetisk, symbolsk. Vesaas brukar enkle ord
        og korte setningar, men det han skriv om er ofte djupt — frykt, einsemd,
        venskap, naturen som spegel for menneskesinnet.</p>

        <p><strong>Kjende verk:</strong></p>
        <ul>
          <li><em class="nn">Is-slottet</em> (1963) — kort roman om to jenter og eit
              dramatisk møte med naturen. Fekk Nordisk råds litteraturpris i 1964.</li>
          <li><em class="nn">Fuglane</em> (1957) — roman om den lett utviklingshemma
              Mattis.</li>
          <li><em class="nn">Kimen</em> (1940) — symbolladd roman skriven under
              andre verdskrigen.</li>
          <li><em class="nn">Vindane</em> (1952) — diktsamling.</li>
        </ul>

        <div class="callout">
          <strong>Vil du lese?</strong> <em class="nn">Is-slottet</em> er kort (omtrent
          200 sider), den er omsett til mange språk, og opningskapitla er nokre av dei
          finaste i norsk litteratur.
        </div>
      `,
    },

    {
      type: "lesson",
      title: "5. Halldis Moren Vesaas (1907–1995)",
      content: `
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
          <li><em class="nn">Harpe og dolk</em> (1929) — debutsamling.</li>
          <li><em class="nn">Strender</em> (1933) — diktsamling.</li>
          <li><em class="nn">Tung tids tale</em> (1945) — dikt skrivne under krigen.
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
      type: "lesson",
      title: "6. Jon Fosse (1959–)",
      content: `
        <p><strong>Frå:</strong> Haugesund. Bur i dag dels i Oslo, dels i Hardanger.<br>
        <strong>Yrke:</strong> Dramatikar, romanforfattar, lyrikar, omsetjar.</p>

        <p>Jon Fosse fekk <strong>Nobelprisen i litteratur i 2023</strong> — den
        fjerde norske nobelvinnaren i litteratur. Han er ein av dei mest spelte
        samtidsdramatikarane i verda, og bøkene hans er omsette til over 50 språk.</p>

        <p><strong>Stil:</strong> Minimalistisk og repetitiv. Fosse skriv lange setningar
        utan vanlege punktum, dialogen er sparsam, det same blir sagt om att, og det
        skjer ofte lite på overflata — men under ligg det djupe spørsmål om liv, død
        og Gud.</p>

        <p><strong>Kjende verk:</strong></p>
        <ul>
          <li><em class="nn">Nokon kjem til å koma</em> (1996, drama) — kanskje hans
              mest spelte stykke.</li>
          <li><em class="nn">Morgon og kveld</em> (2000) — kort roman om eit liv frå
              fødsel til død.</li>
          <li><em class="nn">Septologien</em> (2019–2021, tre band) — eit hovudverk,
              med tittelen <em class="nn">«Det andre namnet»</em>, <em class="nn">«Eg er
              ein annan»</em> og <em class="nn">«Eit nytt namn»</em>.</li>
          <li><em class="nn">Trilogien</em> (2014) — fekk Nordisk råds litteraturpris.</li>
        </ul>

        <div class="callout">
          <strong>Vil du lese?</strong> <em class="nn">Morgon og kveld</em> er kort og
          ein god inngang. Septologien er lang, men mange seier ho er som å bu i ein
          annan persons hovud i ei veke.
        </div>
      `,
    },

    {
      type: "lesson",
      title: "7. Frode Grytten (1960–)",
      content: `
        <p><strong>Frå:</strong> Odda i Hardanger.<br>
        <strong>Yrke:</strong> Forfattar og journalist.</p>

        <p>Grytten voks opp i industribygda Odda, og industriarbeidarane og
        bygdesamfunnet pregar mykje av forfattarskapen. Han har skrive romanar,
        kortprosa, songtekstar og kommentarar i avisene.</p>

        <p><strong>Stil:</strong> Urban og kvardagsleg. Han skriv ofte korte forteljingar
        som zoomar inn på små augneblink — ein bussreise, eit møte, ein middag — og
        får dei til å vere viktige.</p>

        <p><strong>Kjende verk:</strong></p>
        <ul>
          <li><em class="nn">Bikubesong</em> (1999) — roman bygd opp som mange
              forteljingar om naboar i ein blokk i Odda. Brageprisen.</li>
          <li><em class="nn">Flytande bjørn</em> (2005) — kortprosasamling.</li>
          <li><em class="nn">Saganatt</em> (2011) — roman.</li>
          <li><em class="nn">Menn som ingen treng</em> (2020).</li>
        </ul>

        <div class="callout">
          <strong>Vil du lese?</strong> <em class="nn">Bikubesong</em> er sett saman av
          mange korte historier — du kan lese éi av gongen utan å miste samanhengen.
        </div>
      `,
    },

    {
      type: "lesson",
      title: "8. Marit Eikemo (1971–)",
      content: `
        <p><strong>Frå:</strong> Odda i Hardanger.<br>
        <strong>Yrke:</strong> Forfattar, essayist, kulturarbeidar.</p>

        <p>Marit Eikemo skriv både skjønnlitteratur og sakprosa, og har vore leiar
        for Litteratursymposiet i Odda. Ho er kjend for å skrive nært på samtida —
        om kva som skjer med oss og kulturen vår akkurat no.</p>

        <p><strong>Stil:</strong> Essayistisk og reflekterande. Ho stiller spørsmål
        meir enn ho gjev svar, og brukar konkrete kvardagsbilete for å snakke om
        store spørsmål.</p>

        <p><strong>Kjende verk:</strong></p>
        <ul>
          <li><em class="nn">Samtidsruinar</em> (2005) — sakprosa om kva som blir att
              etter industrisamfunna.</li>
          <li><em class="nn">Etterlatne saker</em> (2007) — roman.</li>
          <li><em class="nn">Anbefalingar</em> (2015) — essay.</li>
          <li><em class="nn">Alt inkludert</em> (2017) — roman.</li>
        </ul>
      `,
    },

    {
      type: "lesson",
      title: "9. Olaug Nilssen (1977–)",
      content: `
        <p><strong>Frå:</strong> Førde i Sunnfjord.<br>
        <strong>Yrke:</strong> Forfattar og dramatikar.</p>

        <p>Olaug Nilssen er ein av dei sterkaste samtidsstemmene på nynorsk. Ho skriv
        ofte rått og personleg, om ting som ikkje er lette å skrive om — psykisk
        helse, foreldreskap, kjønn, omsorg.</p>

        <p><strong>Stil:</strong> Direkte, ærleg, somme gonger humoristisk, somme
        gonger smerteleg. Ho stiller spørsmål ved kva som er «normalt» og kven som
        får setje grensene.</p>

        <p><strong>Kjende verk:</strong></p>
        <ul>
          <li><em class="nn">Få meg på, for faen</em> (2005) — roman om ungdom og
              seksualitet. Vart òg film.</li>
          <li><em class="nn">Tung tids tale</em> (2017) — sakprosa om å vere mor til
              ein son med autisme. Brageprisen.</li>
          <li><em class="nn">Yt etter evne, få etter behov</em> (2020) — sakprosa
              om psykisk helse.</li>
        </ul>

        <div class="callout">
          <strong>Visste du?</strong> Tittelen <em class="nn">«Tung tids tale»</em>
          er ein medviten referanse til Halldis Moren Vesaas sitt dikt frå 1945.
          Nilssen seier at det no òg er ei tung tid for mange foreldre.
        </div>
      `,
    },

    /* ---------- Quiz ---------- */
    {
      type: "exercise",
      exerciseType: "matching",
      question: "Para saman forfattar og verk:",
      pairs: [
        ["Tarjei Vesaas", "Is-slottet"],
        ["Arne Garborg", "Haugtussa"],
        ["Olav Duun", "Juvikfolket"],
        ["Jon Fosse", "Septologien"],
        ["Frode Grytten", "Bikubesong"],
        ["Halldis Moren Vesaas", "Tung tids tale (1945)"],
        ["A. O. Vinje", "Ferdaminne fraa Sumaren 1860"],
      ],
      explanation: "Olaug Nilssen brukte same tittel — <em class=\"nn\">Tung tids tale</em> — i 2017 som ein medviten referanse til diktet til Halldis Moren Vesaas frå 1945.",
    },

    {
      type: "exercise",
      exerciseType: "categorize",
      question: "Sorter forfattarane etter levetid:",
      categories: {
        "1800-talet": ["Aasmund Olavsson Vinje", "Arne Garborg"],
        "Tidleg 1900-tal": ["Olav Duun", "Tarjei Vesaas", "Halldis Moren Vesaas"],
        "Samtid (fødd etter 1950)": ["Jon Fosse", "Frode Grytten", "Marit Eikemo", "Olaug Nilssen"],
      },
      explanation: "Garborg og Vinje var sentrale på 1800-talet då nynorsken vart bygd opp. Duun og dei to Vesaas-forfattarane prega 1900-talet. Fosse, Grytten, Eikemo og Nilssen skriv i dag.",
    },

    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kven fekk Nobelprisen i litteratur i 2023?",
      options: ["Tarjei Vesaas", "Jon Fosse", "Olaug Nilssen", "Olav Duun"],
      correct: 1,
      explanation: "Jon Fosse vart den fjerde norske nobelprisvinnaren i litteratur, etter Bjørnstjerne Bjørnson (1903), Knut Hamsun (1920) og Sigrid Undset (1928).",
    },

    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kven grunnla bladet <em class=\"nn\">Dølen</em> i 1858?",
      options: ["Ivar Aasen", "Arne Garborg", "A. O. Vinje", "Olav Duun"],
      correct: 2,
      explanation: "Vinje skreiv det meste av bladet sjølv — det var nesten eit eit-mannsblad.",
    },

    {
      type: "exercise",
      exerciseType: "multipleChoice",
      question: "Kva er Olav Duun mest kjend for?",
      options: [
        "Diktsyklusen «Haugtussa».",
        "Slektsromanen «Juvikfolket».",
        "Skodespelet «Nokon kjem til å koma».",
        "Reiseskildringa «Ferdaminne».",
      ],
      correct: 1,
    },

    {
      type: "exercise",
      exerciseType: "fillIn",
      question: "Fyll inn rett namn:",
      items: [
        { prompt: "___ Moren Vesaas skreiv «Tung tids tale» i 1945.", accept: ["Halldis"] },
        { prompt: "Tarjei Vesaas fekk Nordisk råds litteraturpris i 1964 for ___.", accept: ["Is-slottet", "Isslottet"] },
        { prompt: "Olaug Nilssen kjem frå ___ i Sunnfjord.", accept: ["Førde", "Forde"] },
        { prompt: "Frode Gryttens roman «Bikubesong» frå ___ vann Brageprisen.", accept: ["1999"] },
      ],
    },

    /* ---------- Avsluttande oppgåver ---------- */
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
      question: "Finn éin ekte tekst skriven av ein av forfattarane (kan vere eit kort dikt, ein side i ei bok, eit utdrag på nettet). Skriv eit kort referat (60–120 ord) av kva teksten handla om, og samanlikn han med kva du hadde venta ut frå skildringa i denne modulen.",
      hint: "Tips: «Ved Rondane» av Vinje, eit dikt frå «Tung tids tale» av Halldis Moren Vesaas, opningskapitlet i «Is-slottet» av Tarjei Vesaas — alle finst lett tilgjengelege.",
      minWords: 60,
      checklist: [
        "Skriv kva tekst du har lese, og av kven.",
        "Kort referat — kva handla teksten om?",
        "Stemde han med det du hadde venta?",
        "Skriv på nynorsk.",
      ],
    },
  ],
});

Modules.register({
  id: "lesing-lange-tekstar",
  part: 4,
  title: "Lesetrening — lengre tekstar",
  summary: "Tre lengre tekstar i ulik stil og sjanger.",
  estimatedMinutes: 60,
  sections: [
    {
      type: "lesson",
      title: "Tre lengre tekstar",
      content: `
        <p>No skal du lese tre lengre tekstar. Sett av tid — det er meininga at du
        skal kunne sjå deg om i teksten, ikkje hoppe over delar. Kvar tekst er
        rundt 700–900 ord.</p>
        <p>Tekstane er svært ulike i form. Den første er ei psykologisk forteljing
        om ein heimkomst, den andre er dramatisk og handlar om eit gardsbruk i
        storm, og den tredje er ein indre tankestraum med mykje gjentaking.</p>
        <p>Etter kvar tekst får du både fleirvalg-spørsmål og friskriftsspørsmål.</p>
      `,
    },

    /* ---------- Tekst 7: Garborg-inspirasjon ---------- */
    {
      type: "reading",
      title: "7. «Heim att» — inspirert av Arne Garborg",
      passage: `
        <p>Han hadde ikkje vore heime på fire år. Då han steig av bussen i bygda, var
        det første han la merke til, at det lukta annleis enn han hugsa. Tang og
        granskog og noko anna, noko han ikkje fekk tak i.</p>

        <p>Anders sette frå seg ryggsekken på stasjonen og såg seg om. Bygda låg der ho
        låg. Tre nye hus oppe i bakken. Men dei gamle, dei var som før. Butikken på
        hjørnet var open. Skiltet på frisørsalongen var det same. Berre dei nye
        målestrøka var ulike.</p>

        <p>Han hadde studert i Oslo. Sosialantropologi. Han hadde tenkt at det skulle
        vere noko som opna verda for han — og det hadde det vore òg, ein periode. Men i
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

        <p>— Eg har laga grøt, sa ho.<br>
        — Eg er ikkje særleg svolten.<br>
        — Du må ete litt.</p>

        <p>Han åt litt. Ho såg på han over bordet, og han kjende auga hennar over heile
        andletet, og han ville sjå opp og smile, men han klarte ikkje.</p>

        <p>Far kom inn etter ein halvtime. — Du er heime, sa han.<br>
        — Ja.<br>
        — Det var fint.</p>

        <p>Far gjekk ut att. Det var ikkje mangel på kjærleik. Det var berre måten dei
        var her, alle saman. Når noko var stort, sa ein lite. Når noko var lite, sa ein
        meir. Det var ein logikk Anders hadde dyrka inn i seg som ung, og som han no
        skjøna at han kanskje hadde teke med seg som ein sjukdom inn i livet i byen —
        der folk venta at ein skulle snakke om det viktige.</p>

        <p>Den første natta sov han ikkje. Han låg og høyrde fjøsen. Kyrne snufsa. Ein
        hund glefsa langt borte. Han høyrde elva bak låven, ho som hadde rensa
        kveldsdusta i alle hans somrar. Det var ein lyd som var så velkjend at han
        hadde gløymt at han var der.</p>

        <p>Klokka fem reiste han seg, kledde på seg dei gamle arbeidskleda som hang i
        gangen, og gjekk ut til far. Far snudde seg på fjøsdøra.<br>
        — Du er tidleg ute.<br>
        — Eg fekk ikkje sove.</p>

        <p>Far nikka. Det vart ikkje sagt meir. Dei stelte saman. Anders kjende at
        ryggen hugsa det. Bøttene, mjølkemaskina, fôret. Det var som om kroppen hans
        hadde halde på desse rørslene i fire år, venta på at han skulle kome attende og
        bruke dei.</p>

        <p>Då dei var ferdige, sat dei på stabburet og åt brød med ost. Sola kom opp.
        Anders kjende noko som han ikkje hadde kjent på lenge: at han var her, og berre
        her, og at det var nok ein augneblink.</p>

        <p>— Du må gjerne bli, sa far utan å sjå på han. — Så lenge du vil.<br>
        — Eg veit ikkje kva eg vil.<br>
        — Det treng du ikkje vite enno.</p>

        <p>Det var det dei sa om saka. Anders såg ut over enga. Han tenkte: kanskje eg
        blir verande. Kanskje eg reiser igjen. Han visste ikkje. Men for første gong
        sidan i fjor haust, var det å ikkje vite ikkje ei vond ting. Det var berre ei
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
          modelAnswer: "Setninga seier noko om kommunikasjonsmønsteret i familien: dei store, viktige tinga snakkar dei nesten ikkje om — dei vert berre der, underforstått. Småtinga kan dei prate om i det uendelege. Det er ein måte å takle alvor på, men det kan òg gjere det vanskeleg å seie det viktige når ein verkeleg treng det.",
        },
        {
          type: "freeShort",
          question: "Korleis vil du skildre Anders som person, ut frå det vi får vite i teksten?",
          modelAnswer: "Anders verkar reflektert og litt sliten. Han har høge tankar om seg sjølv og det han skulle bli i Oslo, men han er òg ærleg om at noko har knekt. Han er stille, har vanskeleg for å seie kva han kjenner, men han tenkjer mykje. Han ser ut til å finne ein liten ro på garden.",
        },
      ],
    },

    /* ---------- Tekst 8: Duun-inspirasjon ---------- */
    {
      type: "reading",
      title: "8. «Bestefar og stormen» — inspirert av Olav Duun",
      passage: `
        <p>Det var den haustkvelden bestefar gjekk ut etter sauene at vi forstod at han
        ikkje var den same lenger.</p>

        <p>Stormen kom inn frå nordvest, slik han alltid gjorde i oktober. Mor høyrde
        det først på vinden i pipa, ho som hadde lytta på den lyden i seksti år.<br>
        — Vi må få sauene inn, sa ho.<br>
        — Eg går, sa far.<br>
        — Eg går òg, sa eg.<br>
        — Du blir her, sa far. — Med bestefar.</p>

        <p>Bestefar sat ved omnen. Han hadde site der mest heile dagen. Han hadde
        slutta å snakke så mykje det siste året. Det hadde kome langsamt, som ei elv
        som vart smalare og smalare. Først berre at han gløymde namn. Så at han
        gløymde kvar han var. No, somme tider, gløymde han kven vi var, mor og far
        og eg. Men ikkje sauene. Han gløymde aldri sauene.</p>

        <p>Då far hadde gått ut, reiste bestefar seg. Han gjekk til vindauget. Han stod
        der med dei tunge, gamle nevane sine på vindaugskarmen, og han såg ut.<br>
        — Sauene, sa han.<br>
        — Far er ute med dei, sa eg. — Han kjem snart att.<br>
        Han svara ikkje. Han stod og stod.</p>

        <p>Då snudde han seg mot meg, og auga hans var klåre — klårare enn dei hadde
        vore på månader.<br>
        — Eg må òg.<br>
        — Nei, bestefar.<br>
        — Eg må òg, gut.</p>

        <p>Han var raskare enn eg trudde. Han hadde alt fått på seg jakka før eg fekk
        reist meg. Sjøstøvlane. Den gamle olja.<br>
        — Bestefar, det er storm.<br>
        — Eg veit kva storm er.</p>

        <p>Eg sprang opp på loftet etter mor.<br>
        — Bestefar er på veg ut, sa eg.<br>
        Ho slapp glaset, det slo i golvet, og ho sprang ned.</p>

        <p>Då vi kom ned i gangen, var bestefar alt ute. Eg såg han forsvinne mellom
        låven og fjøsen. Vinden reiv i alt han nådde.</p>

        <p>Vi gjekk etter. Mor heldt meg i armen.<br>
        — Vi må hente han heim, sa ho.<br>
        — Far har sauene. Han greier seg, sa eg.<br>
        — Det er ikkje sauene eg er redd for, gut. Det er bestefar.</p>

        <p>Bestefar gjekk mot beitet. Han gjekk så raskt at vi hadde vondt for å nå
        han. Vinden bles rett i andleta våre. Det byrja å regne òg, men i sidesprut,
        ikkje rett ned. Det var den slags regn som finn deg uansett kva du har på deg.</p>

        <p>— Far! ropte mor. — Far!<br>
        Han høyrde ikkje, eller han høyrde det og brydde seg ikkje. Han gjekk vidare.</p>

        <p>Då vi var ved porten, såg eg far. Han stod midt i beitet med tre sauer rundt
        seg, og han prøvde å få dei mot huset, men dei sneia på sida. Ein låg som om
        han var snubla i ei søkk.</p>

        <p>Bestefar gjekk rett mot far. Han ropte noko som eg ikkje høyrde, fordi
        vinden tok orda. Far snudde seg, såg han, og eg såg det — eit gløtt av kva
        han skulle gjere. Skulle han sende bestefar attende? Skulle han gjere det
        rette og bestemte? Eller skulle han la bestefar få vere her, i stormen, med
        sauene som han hadde gått etter i seksti år?</p>

        <p>Far sa ingenting. Han peika berre.<br>
        — Den der, far. Ho heng att i greinene.</p>

        <p>Bestefar gjekk dit. Han bøygde seg ned, plukka sauen ut frå krattet, sette
        han på beina. Han gjorde det utan å nøle. Som om han hadde gjort det fem
        hundre gonger før — fordi han hadde det.</p>

        <p>Saman gjekk dei to — far og bestefar — med sauene framfor seg. Eg og mor
        venta ved porten. Mor heldt meg framleis i armen, men ikkje så hardt no.</p>

        <p>Då dei kom forbi oss, snudde bestefar seg mot mor.<br>
        — Du må òg ha jakka på, jenta mi.</p>

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
            "Han kjenner att noko han har gjort heile livet — å sjå etter sauene.",
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
            "Han ber bestefar om å hjelpe — utan å lage ei sak ut av det.",
            "Han ignorerer bestefar.",
          ],
          correct: 2,
        },
        {
          type: "freeShort",
          question: "Kvifor trur du forteljaren vil hugse bestefar slik han var denne kvelden, og ikkje slik han elles var?",
          modelAnswer: "Den kvelden var bestefar igjen seg sjølv — den han hadde vore heile livet. Han var ein mann som tok seg av sauene, og det var det han stod for. Forteljaren vil hugse det sterke biletet av bestefar i arbeid, ikkje den stille, gløymsame gamle mannen ved omnen.",
        },
        {
          type: "freeShort",
          question: "Kva betyr det at mor græt på slutten, etter at bestefar har snakka til henne?",
          modelAnswer: "Det er ein blanding av lette og sorg. Lette over at far hennar framleis er der, ein liten augneblink. Sorg fordi ho veit at slike augneblink no er sjeldne — at han for det meste er borte, sjølv om han fysisk er hjå dei.",
        },
      ],
    },

    /* ---------- Tekst 9: Jon Fosse-inspirasjon ---------- */
    {
      type: "reading",
      title: "9. «Frå hytta» — inspirert av Jon Fosse",
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
        eg var seks år og fall i ein snøfonn, og eg vart liggjande, og mor måtte hente
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
          modelAnswer: "Forfattaren gjentek ord og setningar som «snøen fell» og «det er stilt» fleire gonger gjennom teksten. Det skapar ein langsam, nesten meditativ rytme — som passar med kva forteljaren gjer (sit og ser ut) og kva han kjenner (noko stilt og uavklart). Gjentakinga gjer at lesaren òg «sit lenge» i teksten.",
        },
        {
          type: "freeShort",
          question: "Korleis tolkar du linja «eg har vore lenger vekk enn nokon kan vite»?",
          modelAnswer: "Sjølv om han ikkje har reist langt fysisk, har han vore på ein indre reise — han har trekt seg unna alt, tenkt mykje, kome ein heilt annan stad i hovudet sitt. Det er ein måte å seie at det viktigaste skjer i sinnet, ikkje på kartet.",
        },
      ],
    },

    /* ---------- Avsluttande oppgåve ---------- */
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Samanlikning",
      question: "Vel to av dei tre lengre tekstane og samanlikn dei. Korleis er stilen og stemninga ulik? Korleis brukar forfattarane setningar og avsnitt for å skape ulike kjensler? Skriv 150–250 ord.",
      minWords: 150,
      checklist: [
        "Namngi dei to tekstane du har valt.",
        "Skriv om stil (lange/korte setningar, gjentaking, dialog osv.).",
        "Skriv om stemning og innhald.",
        "Bruk minst eitt konkret døme frå kvar tekst.",
        "Skriv på nynorsk.",
      ],
    },
  ],
});
