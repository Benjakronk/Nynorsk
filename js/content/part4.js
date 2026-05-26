/* Del 4 — Lesing og tekstforståing
   Tekstane er originale, men skrivne med inspirasjon frå stilen til kjende
   nynorskforfattarar. Forfattaranes namn er nemnde i innleiingane. */

Modules.register({
  id: "lesing-korte-tekstar",
  part: 4,
  title: "Lesetrening — korte tekstar",
  summary: "Seks korte tekstar i ulik stil, med forståingsspørsmål.",
  estimatedMinutes: 45,
  sections: [
    {
      type: "lesson",
      title: "Slik bruker du modulen",
      content: `
        <p>Her får du seks korte tekstar i ulik stil. Kvar tekst er skriven med
        inspirasjon frå ein kjend nynorskforfattar — namnet står i innleiinga.</p>
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

    /* ---------- Tekst 9: C.S. Lewis-inspirasjon (tid og minne) ---------- */
    {
      type: "reading",
      title: "9. «Brevet til den eg var» — inspirert av C.S. Lewis",
      passage: `
        <p>Eg har skrive eit brev som eg aldri kjem til å sende. Det er adressert til
        meg sjølv — til den eg var då eg var tolv år gamal.</p>

        <p>Eg skreiv at det går bra. At den dagen ho ikkje ville sitje saman med deg
        i bussen, ho som du tenkte var beste venen din — det var ikkje fordi du var
        vond. Det var fordi ho hadde sine eigne ting, ting du ikkje visste om. De vart
        venner att, faktisk. Eller — kanskje ikkje slik du hadde tenkt. Men ho hugsar
        deg. Ho har sagt det til andre.</p>

        <p>Eg skreiv at det du tenkte var verda — den klassen, den skulen, dei jentene
        — ikkje er heile verda. Det er berre ein liten flekk på eit stort kart. Du kjem
        til å flytte. Du kjem til å møte folk som ikkje veit kven du er, og det kjem
        til å vere fint, ikkje skummelt.</p>

        <p>Eg skreiv at boka i hylla ved senga di — ho du las tre gonger fordi du ikkje
        skjønte at det var lov å lese ho fire — den var god. Det var ikkje noko gale
        med deg. Det finst bøker som er verde å lese ti gonger.</p>

        <p>Eg skreiv at det er ingenting du må gjere fortare enn du gjer. Du tenkjer
        kanskje at du må bli klar for noko snart — for ungdomsskulen, for vidaregåande,
        for vaksenlivet. Du må ikkje. Du blir klar. Det skjer av seg sjølv. Det er
        kroppen og hjernen som veks. Du treng ikkje hjelpe dei.</p>

        <p>Eg skreiv at du er allereie god nok. Du må berre halde fram med å vere her.</p>

        <p>Eg legg ikkje brevet i ein konvolutt. Eg veit jo at han ikkje kan nå
        adressaten. Men eg legg han i ein skuff. For kanskje, om mange år, finn nokon
        han. Kanskje eit barnebarn. Kanskje eg sjølv, eldre. Kanskje ein eller annan
        som treng å lese akkurat dette, frå ein eller annan som ein gong var tolv og
        ikkje visste.</p>
      `,
      questions: [
        {
          type: "multipleChoice",
          question: "Kvifor sender forfattaren ikkje brevet?",
          options: [
            "Han har ikkje frimerke.",
            "Han veit at brevet ikkje kan nå adressaten, som er han sjølv som tolvåring.",
            "Han er flau over innhaldet.",
            "Han har gløymt adressa.",
          ],
          correct: 1,
        },
        {
          type: "multipleChoice",
          question: "Kva for ein tone har brevet?",
          options: [
            "Sint og bebreidande.",
            "Kald og distansert.",
            "Mild, trøystande og varm.",
            "Spøkefull og ironisk.",
          ],
          correct: 2,
        },
        {
          type: "freeShort",
          question: "Kva slags brev ville du sjølv ha skrive til deg sjølv for tre år sidan? Skriv tre setningar.",
          modelAnswer: "Eit døme: «Du treng ikkje vere så redd for å seie noko feil. Folk hugsar ikkje halvparten av det du seier — dei hugsar korleis du fekk dei til å kjenne seg. Den eine venen du tenkte du hadde mista, kjem til å vere venen din om to år.»",
        },
        {
          type: "freeShort",
          question: "Kva tyder linja «du er allereie god nok» i denne samanhengen?",
          modelAnswer: "Forfattaren prøver å fortelje tolvåringen at han eller ho ikkje treng å bli ein annan person for å vere verdt noko. Ein treng ikkje gjere alt rett, ikkje vere som dei andre, ikkje skunde seg å bli vaksen. Det å vere den ein er, der ein er, er nok.",
        },
      ],
    },

    /* ---------- Tekst 10: C.S. Lewis-inspirasjon (venting) ---------- */
    {
      type: "reading",
      title: "10. «Om å vente» — inspirert av C.S. Lewis",
      passage: `
        <p>Eg er ikkje god til å vente. Ingen er det, trur eg, sjølv om somme later som
        dei er.</p>

        <p>Når eg er på legevakta og ventar i to timar, blir eg sint på alle. På
        sjukepleiarane. På han som kom inn etter meg. På meg sjølv, fordi eg gjekk dit.
        Det er ein slags krenking, å vente, eit slags vondt minutt etter minutt.</p>

        <p>Men eg har lagt merke til noko underleg. Det er to slags venting.</p>

        <p>Den eine er den eg gjorde på legevakta. Ho er passiv. Eg sit, eg er irritert,
        eg tek opp telefonen, eg legg han frå meg. Ingenting skjer i meg. Tida går
        utan å skape noko. Når eg endeleg blir kalla inn, går eg ut att etter tjue
        minutt med eit plaster, og kjem heim like tom som då eg drog.</p>

        <p>Den andre slags venting er ulik. Eg har venta slik ein gong, då bestemor låg
        for døden. Vi sat ved sengekanten. Vi visste ikkje når det skulle skje. Det
        kunne vere ein time eller tre dagar. Eg sat der med mor, og eg sat med tante,
        og eg sat for det meste åleine om natta. Og eg venta. Men noko skjedde i meg
        medan eg venta. Eg byrja å sjå bestemor på ein måte eg aldri hadde sett henne
        før. Eg såg den unge jenta i den gamle kvinna. Eg hugsa kvar gong ho hadde
        sagt noko til meg som hadde betydd noko. Eg gret. Eg lo òg, somme tider, eg
        veit ikkje kvifor.</p>

        <p>Den ventinga gjorde meg til ein annan person. Den passive ventinga gjorde
        meg berre sliten.</p>

        <p>Eg tenkjer at det same gjeld for mykje av livet. Det er ting vi ventar på
        fordi vi vil ha dei unna. Og det er ting vi ventar på fordi dei er noko som
        veks i oss medan vi ventar. Det første ventet slit oss ut. Det andre — eg
        veit ikkje noko sterkare ord — det forandrar oss.</p>

        <p>Det krev ein viss type merksemd å skilje dei to. Og det krev mot å velje
        den andre, fordi ho er meir smerteleg. Men ho gjer noko med oss.</p>
      `,
      questions: [
        {
          type: "multipleChoice",
          question: "Korleis skildrar forfattaren dei to typane venting?",
          options: [
            "Begge er like vonde og slitande.",
            "Den eine er passiv og tek krefter; den andre er smerteleg, men forandrar oss.",
            "Den eine er kjedeleg, den andre er morosam.",
            "Den eine skjer på legevakta, den andre på flyplass.",
          ],
          correct: 1,
        },
        {
          type: "multipleChoice",
          question: "Kva skjer med forfattaren medan ho/han ventar ved sengekanten til bestemor?",
          options: [
            "Forfattaren blir berre meir sliten.",
            "Forfattaren søv det meste av tida.",
            "Forfattaren byrjar å sjå bestemor på ein ny måte og blir endra av ventinga.",
            "Forfattaren slår av telefonen og les ei bok.",
          ],
          correct: 2,
        },
        {
          type: "freeShort",
          question: "Kva slags venting har du sjølv vore i? Var det den eine eller den andre typen? Forklar kort.",
          modelAnswer: "Eit døme på svar: Eg har venta på resultata frå ein test. Det var den passive sorten — eg klarte ikkje å tenkje på anna, eg gjorde ingenting nyttig, eg vart berre sliten. Eit anna døme: Eg venta heime då far min var på operasjon. Det er litt meir lik den andre slags venting — eg tenkte mykje på kva han betydde for meg, og eg vart liksom mjukare av det.",
        },
        {
          type: "freeShort",
          question: "Kvifor trur du forfattaren seier at det krev mot å velje den «andre» typen venting?",
          modelAnswer: "Fordi den ventinga ikkje gøymer oss frå det vonde. Vi sit i det, vi kjenner det, og det gjer vondt. Det er enklare å skru på telefonen, scrolle, distrahere seg. Mot er å la ventinga gjere det ho skal — å la henne forandre oss, sjølv om vi ikkje veit nøyaktig korleis.",
        },
      ],
    },

    /* ---------- Avsluttande refleksjon ---------- */
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "Eiga reflektering",
      question: "Kva av dei ti tekstane likte du best, og kvifor? Skriv 100–200 ord. Bruk gjerne konkrete døme frå teksten du valde, og samanlikn han gjerne med éin av dei andre tekstane.",
      minWords: 100,
      checklist: [
        "Vel ein tekst og namngi han.",
        "Forklar kva du likte ved stilen eller innhaldet.",
        "Bruk minst eitt konkret døme frå teksten.",
        "Samanlikn gjerne med ein annan av dei ti tekstane.",
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
