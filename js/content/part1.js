/* Del 1: Språkhistorie og debatt */

Modules.register({
  id: "historie-bakgrunn",
  part: 1,
  title: "Norsk språk før 1850",
  summary: "Kvifor skreiv folk i Noreg på dansk, og kva slags språk snakka dei?",
  estimatedMinutes: 20,
  sections: [
    {
      type: "lesson",
      title: "Frå 1380 til 1814: eit dansk skriftspråk",
      content: `
        <figure class="figur brei">
          <img src="bilete/eidsvoll-1814.jpg" alt="Måleri av riksforsamlinga på Eidsvoll i 1814, mange menn i ein stor sal" loading="lazy">
          <figcaption>Riksforsamlinga på Eidsvoll i 1814 gav Noreg ei eiga grunnlov. Skriftspråket var framleis dansk. Måleri av Oscar Wergeland, 1885 (offentleg eigedom).</figcaption>
        </figure>
        <p>I 1380 gjekk Noreg i union med Danmark. Unionen varte i over 400 år, heilt til 1814.
        I løpet av desse hundreåra forsvann det gamalnorske skriftspråket, og dansk vart det
        einaste skriftspråket i Noreg. Embetsmenn, prestar og forfattarar skreiv dansk, og det
        var dansk ein lærde i skulen.</p>
        <figure class="figur halv">
          <img src="bilete/danmark-noreg-1780.png" alt="Kart over Europa der Danmark, Noreg, Island, Færøyane og Grønland er farga raude" loading="lazy">
          <figcaption>Danmark-Noreg i 1780. Riket omfatta òg Island, Færøyane og Grønland. Kart: Derfel73, cthuljew og Kasper Holl (offentleg eigedom).</figcaption>
        </figure>

        <p>Men <em class="nn">talemålet</em> heldt fram med å vere norsk. Folk snakka dialektar
        som var heilt ulike dansk. Ein bonde på Vestlandet, ein fiskar i Nord-Noreg og ein
        handverkar på Austlandet snakka kvar sin variant av eit nedarva norsk talemål, sjølv
        om dei skreiv (om dei i det heile skreiv) på dansk.</p>

        <h3>Embetsmannsspråket</h3>
        <p>I byane voks det fram eit talemål blant embetsmenn og borgarskap som låg nærare
        dansk skrift. Mange uttala dansken med eit litt norsk tonefall, og slik oppstod det
        som ofte blir kalla <em class="nn">dansk-norsk</em> eller embetsmannsspråket.</p>

        <h3>1814: ein ny situasjon</h3>
        <figure class="figur halv">
          <img src="bilete/unionsflagg-1844.png" alt="Det norske flagget med unionsmerket i øvre hjørne, eit merke i norske og svenske fargar" loading="lazy">
          <figcaption>Frå 1844 hadde det norske og det svenske flagget eit felles unionsmerke i hjørnet. Folk kalla det «sildesalaten». Handelsflagget vart «reint» att i 1899, og unionen vart oppløyst i 1905 (offentleg eigedom).</figcaption>
        </figure>
        <p>I 1814 vart Noreg løyst frå Danmark og gjekk inn i union med Sverige. Vi fekk eiga
        grunnlov og eige storting. Men skriftspråket var framleis dansk. Mange byrja å spørje:
        kan eit fritt land verkeleg ha eit anna lands språk som sitt einaste skriftspråk?</p>

        <div class="callout">
          <strong>Kort oppsummering:</strong> Fram til midten av 1800-talet var skriftspråket
          i Noreg dansk, sjølv om folk snakka norske dialektar. Etter 1814 byrja folk å
          tenkje på korleis Noreg kunne få sitt eige skriftspråk.
        </div>
        <h3>Tidslinje</h3>
        <ol class="tidslinje">
          <li><span class="aar">1380</span><span class="hend">Noreg går i union med Danmark. Dansk blir etter kvart det einaste skriftspråket.</span></li>
          <li><span class="aar">1814</span><span class="hend">Eiga grunnlov og eige storting. Kan eit fritt land ha eit anna lands skriftspråk?</span></li>
          <li><span class="aar">1836</span><span class="hend">Ivar Aasen, 22 år gamal, skriv planen om eit norsk skriftspråk bygd på dialektane.</span></li>
          <li><span class="aar">1848–1850</span><span class="hend">Aasen gjev ut grammatikk og ordbok over «det norske Folkesprog».</span></li>
          <li><span class="aar">1885</span><span class="hend">Stortinget jamstiller landsmål og det dansk-norske skriftspråket.</span></li>
          <li><span class="aar">1929</span><span class="hend">Namna blir nynorsk og bokmål.</span></li>
          <li><span class="aar">1981</span><span class="hend">Samnorskpolitikken blir oppgitt. Dei to skriftspråka utviklar seg kvar for seg.</span></li>
          <li><span class="aar">2022</span><span class="hend">Ny språklov: bokmål og nynorsk er likeverdige skriftspråk.</span></li>
        </ol>
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
        "Skriv på nynorsk så godt du kan, og bruk «ikkje», «eg», «kva», «frå».",
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
        <figure class="figur portrett">
          <img src="bilete/aasen-1871.jpg" alt="Portrett av Ivar Aasen i 1871, ein mann med briller og mørk frakk" loading="lazy">
          <figcaption>Ivar Aasen i 1871. Foto: Carl Christian Wischmann / Ivar Aasen-tunet (CC BY-SA 3.0).</figcaption>
        </figure>
        <p><strong>Ivar Aasen</strong> (1813–1896) voks opp på ein liten gard i Ørsta på
        Sunnmøre. Familien var fattig, og Ivar måtte tidleg ut og jobbe. Men han var
        usedvanleg lærenem og lærte seg språk på eiga hand, først dansk og latin, seinare
        tysk, engelsk, fransk og fleire.</p>

        <h3>Reisene 1842–1846</h3>
        <p>Med stipend frå Det Kongelige Norske Videnskabers Selskab reiste Aasen rundt i
        store delar av Noreg i fire år. Han lytta til dialektane, skreiv ned ord og
        bøyingar, og bygde seg eit detaljert bilete av norsk talemål.</p>
        <figure class="figur halv">
          <img src="bilete/dahl-sognefjorden.jpg" alt="Måleri av ein snødekt gard ved Sognefjorden med bratte fjell og ein båt i fjæra" loading="lazy">
          <figcaption>«Vinter ved Sognefjorden» av J.C. Dahl, 1827. Aasen budde i Sogndal vinteren 1842–43 (offentleg eigedom).</figcaption>
        </figure>
        <div class="callout">
          <strong>Følg reisa på kartet:</strong> I <a href="aasen-reise.html">Reisene til
          Ivar Aasen</a> kan du følgje ruta hans på eit 3D-kart over Noreg, kapittel for
          kapittel, med stadene han stoppa på og kva som hende undervegs.
        </div>

        <h3>Grammatikken og ordboka</h3>
        <figure class="figur portrett liten">
          <img src="bilete/grammatik-1848.jpg" alt="Tittelsida til Det norske Folkesprogs Grammatik frå 1848" loading="lazy">
          <figcaption>Tittelsida til <em class="nn">Det norske Folkesprogs Grammatik</em> (1848), den første boka om det nye språket (offentleg eigedom).</figcaption>
        </figure>
        <p>Resultatet vart to banebrytande bøker:</p>
        <ul>
          <li><em class="nn">Det norske Folkesprogs Grammatik</em> (1848)</li>
          <li><em class="nn">Ordbog over det norske Folkesprog</em> (1850)</li>
        </ul>
        <p>I 1853 gav han ut <em class="nn">Prøver af Landsmaalet i Norge</em>, der han
        viste korleis eit nytt norsk skriftspråk kunne sjå ut. Han kalla det
        <strong>landsmål</strong>, språket for heile landet.</p>


        <figure class="figur brei">
          <img src="bilete/brudeferd-hardanger.jpg" alt="Måleri av ein brudefølgje i robåtar på ein blank fjord med fjell og grøne lier" loading="lazy">
          <figcaption>«Brudeferd i Hardanger» (1848) av Adolph Tidemand og Hans Gude. Same år som Aasen gav ut grammatikken, leitte kunstnarar, diktarar og forskarar etter det særnorske i bygdene. Tida blir kalla nasjonalromantikken (offentleg eigedom).</figcaption>
        </figure>
        <h3>Korleis bygde han det opp?</h3>
        <p>Aasen ville ikkje berre velje éin dialekt og gjere han til skriftspråk. I staden
        prøvde han å finne dei eldre, fellesgjeldande formene som dei norske dialektane
        hadde til felles. Han vekta gjerne vestnorske og inste-bygdene sine former, fordi
        dei ofte stod nærare gamalnorsk.</p>

        <div class="callout">
          <strong>Hugs:</strong> Landsmålet vart seinare kalla <em class="nn">nynorsk</em>
          (frå 1929). Ordet «nynorsk» kan forvirre, for det handlar ikkje om eit nytt språk,
          men om eit skriftspråk bygd på det levande norske talemålet.
        </div>
        <figure class="figur brei">
          <img src="bilete/aasentunet.jpg" alt="Ivar Aasen-tunet i Ørsta, eit moderne museumsbygg ved den gamle garden" loading="lazy">
          <figcaption>Ivar Aasen-tunet i Ørsta, museum og dokumentasjonssenter for nynorsk skriftkultur, ligg på heimegarden Åsen. Foto: Andrva (CC BY-SA 3.0).</figcaption>
        </figure>
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
      title: "To liner: Knud Knudsen og Ivar Aasen",
      content: `
        <figure class="figur portrett">
          <img src="bilete/knud-knudsen.jpg" alt="Portrett av Knud Knudsen, ein eldre mann med kvitt hår" loading="lazy">
          <figcaption>Knud Knudsen (1812–1895) ville fornorske dansk skrift steg for steg. Ukjend fotograf (offentleg eigedom).</figcaption>
        </figure>
        <p>Medan Ivar Aasen bygde landsmål frå dialektane, gjekk <strong>Knud Knudsen</strong>
        (1812–1895) ein annan veg. Han ville <em class="nn">fornorske</em> dansk skrift
        steg for steg, slik at skriftspråket gradvis kom nærare det danna talemålet i
        norske byar. Det er denne lina som etter kvart vart <strong>riksmål</strong> og
        seinare <strong>bokmål</strong>.</p>

        <h3>Jamstillingsvedtaket (1885)</h3>
        <p>I 1885 gjorde Stortinget eit historisk vedtak: landsmål og det norsk-danske
        skriftspråket skulle vere <em class="nn">jamstilte</em>. Det vil seie at begge skulle
        vere likeverdige i skule og forvaltning. Dette gav landsmålet ein offisiell status.</p>
        <figure class="figur halv">
          <img src="bilete/stortinget.jpg" alt="Gammalt fotografi av Stortingsbygningen i Kristiania, ein stor bygning i gul murstein" loading="lazy">
          <figcaption>Stortingsbygningen i Kristiania. Her vedtok Stortinget i 1885 at landsmålet skulle vere jamstilt med det norsk-danske skriftspråket. Foto: Marthinius Skøien, mellom 1880 og 1910 (offentleg eigedom).</figcaption>
        </figure>

        <h3>Samnorskpolitikken</h3>
        <p>Frå tidleg 1900-tal og fram til 1960-talet prøvde styresmaktene å føre dei to
        skriftspråka <em class="nn">saman</em> til éitt felles språk, kalla
        <strong>samnorsk</strong>. Tre store rettskrivingsreformer (<strong>1907, 1917, 1938</strong>)
        endra både bokmål og nynorsk i denne retninga.</p>

        <h3>Foreldreaksjonen</h3>
        <p>Mange foreldre, særleg på austlandet og i byane, reagerte sterkt mot reformene.
        På slutten av 1940-talet vart <em class="nn">foreldreaksjonen mot samnorsk</em>
        starta. Dei retta lærebøkene tilbake mot eldre former. Striden var hard på 1950-talet.</p>

        <h3>1981: samnorsklinja oppgitt</h3>
        <p>I 1981 vedtok Stortinget at samnorskpolitikken ikkje lenger skulle gjelde.
        Bokmål og nynorsk skulle få utvikle seg kvar for seg. Seinare har det kome
        moderne rettskrivingar: <strong>2005 for bokmål</strong> og
        <strong>2012 for nynorsk</strong>.</p>

        <div class="callout warn">
          <strong>Viktig omgrep:</strong> «Samnorsk» tyder ikkje at språka vart eitt. Det
          var ein <em>politikk</em> som freista å smelte dei saman. Politikken vart altså
          aldri gjennomført fullt ut, og vart formelt avslutta i 1981.
        </div>
        <h3>Dei to linene i eitt bilete</h3>
        <div class="toliner">
          <div class="line aasen">
            <div class="boks">Dei norske dialektane</div>
            <div class="pil">↓ Ivar Aasen samlar og byggjer</div>
            <div class="boks">Landsmål (1853)</div>
            <div class="pil">↓ nytt namn 1929</div>
            <div class="boks sterk">Nynorsk</div>
          </div>
          <div class="line midt">
            <div class="boks svak">1885: jamstilte</div>
            <div class="boks svak">1907, 1917, 1938: samnorsk-reformer prøver å føre dei saman</div>
            <div class="boks svak">1981: oppgitt, kvar sin veg</div>
          </div>
          <div class="line knudsen">
            <div class="boks">Dansk skriftspråk</div>
            <div class="pil">↓ Knud Knudsen fornorskar steg for steg</div>
            <div class="boks">Riksmål</div>
            <div class="pil">↓ nytt namn 1929</div>
            <div class="boks sterk">Bokmål</div>
          </div>
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
      title: "Foreldreaksjonen: kort kjelde",
      passage: `
        <p>På slutten av 1940-talet og utover 1950-talet retta foreldre rundt om i landet
        sjølv lærebøkene til borna sine. Dei sletta ut samnorske former med blekk og skreiv
        inn dei eldre formene attmed. Aksjonen vart organisert som <em class="nn">Foreldreaksjonen
        mot samnorsk</em> i 1951.</p>
        <p>Mange opplevde at reformene gjorde skriftspråket framand for dei. Andre meinte
        at språket måtte vere meir folkeleg, og at samnorsk var ein god tanke. Striden
        viste at språk handlar om identitet, ikkje berre om reglar.</p>
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
        har bokmål som hovudmål, men alle elevar lærer båe, det eine som <em class="nn">hovudmål</em>
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
          krav i offentleg sektor, og blir brukt av ein stabil del av folket, men
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

Modules.register({
  id: "historie-skriving",
  part: 1,
  title: "Skriv om språkhistoria",
  summary: "Fem skriveoppgåver som byggjer på alt fagstoffet i Del 1.",
  estimatedMinutes: 60,
  sections: [
    {
      type: "lesson",
      title: "Slik skriv du om språkhistorie",
      content: `
        <p>No har du lese om vegen frå dansk skriftspråk til to jamstilte norske skriftspråk.
        I denne modulen skal du bruke det du kan. Her er det ikkje nye fakta som ventar, men
        fem skriveoppgåver av ulikt slag: forklare, samanlikne, formidle, dikte og
        oppsummere.</p>

        <h3>Fakta er ikkje nok</h3>
        <p>Ein svak fagtekst er ei liste: «I 1380 gjekk Noreg i union med Danmark. I 1814 vart
        Noreg fritt. I 1885 kom jamstillingsvedtaket.» Alt er rett, men ingenting heng saman.
        Ein god fagtekst viser <strong>samanhengen</strong>: kvifor det eine førte til det
        andre.</p>
        <table>
          <thead><tr><th>I staden for</th><th>Skriv heller</th></tr></thead>
          <tbody>
            <tr><td>Aasen reiste rundt i Noreg. Han gav ut ei ordbok.</td>
                <td>Fordi Aasen ville byggje skriftspråket på levande talemål, måtte han
                    først reise rundt og samle ord. Resultatet vart ordboka frå 1850.</td></tr>
            <tr><td>I 1885 kom jamstillingsvedtaket.</td>
                <td>Etter tretti år med landsmål i bruk vedtok Stortinget i 1885 at dei to
                    skriftspråka skulle vere likeverdige.</td></tr>
          </tbody>
        </table>

        <h3>Bindeord som viser samanheng</h3>
        <p>Desse orda gjer arbeidet for deg: <em class="nn">fordi, difor, derfor, slik at,
        men, samtidig, seinare, først, deretter, til slutt, likevel, altså</em>.</p>

        <h3>Faktabank: tidslinje</h3>
        <p>Bruk denne når du skriv. Ta med årstal berre når dei betyr noko for poenget ditt.</p>
        <table>
          <thead><tr><th>År</th><th>Hending</th></tr></thead>
          <tbody>
            <tr><td>1380</td><td>Noreg går i union med Danmark. Unionen varer i over 400 år.</td></tr>
            <tr><td>1814</td><td>Noreg blir løyst frå Danmark, får eiga grunnlov og eige storting, men skriftspråket er framleis dansk.</td></tr>
            <tr><td>1842–1846</td><td>Ivar Aasen reiser rundt i Noreg og samlar dialektar.</td></tr>
            <tr><td>1848</td><td><em class="nn">Det norske Folkesprogs Grammatik</em></td></tr>
            <tr><td>1850</td><td><em class="nn">Ordbog over det norske Folkesprog</em></td></tr>
            <tr><td>1853</td><td><em class="nn">Prøver af Landsmaalet i Norge</em>. Aasen kallar språket landsmål.</td></tr>
            <tr><td>1885</td><td>Jamstillingsvedtaket: landsmål og det norsk-danske skriftspråket blir likeverdige.</td></tr>
            <tr><td>1907</td><td>Alle norske elevar skal lære båe skriftspråka. Første rettskrivingsreforma i samnorskretning.</td></tr>
            <tr><td>1917 og 1938</td><td>To nye rettskrivingsreformer i samnorskretning.</td></tr>
            <tr><td>1929</td><td>Landsmål får namnet nynorsk.</td></tr>
            <tr><td>1940-talet</td><td>Foreldreaksjonen mot samnorsk blir starta. Striden er hard på 1950-talet.</td></tr>
            <tr><td>1980</td><td>Staten blir pålagd å bruke begge skriftspråka (mållova).</td></tr>
            <tr><td>1981</td><td>Stortinget gir opp samnorskpolitikken.</td></tr>
            <tr><td>2005 og 2012</td><td>Moderne rettskriving for bokmål (2005) og nynorsk (2012).</td></tr>
            <tr><td>2022</td><td>Ny språklov: norsk er hovudspråket, og bokmål og nynorsk er likeverdige.</td></tr>
          </tbody>
        </table>

        <h3>Faktabank: to menn, to metodar</h3>
        <table>
          <thead><tr><th></th><th>Ivar Aasen (1813–1896)</th><th>Knud Knudsen (1812–1895)</th></tr></thead>
          <tbody>
            <tr><td>Utgangspunkt</td><td>Dei norske dialektane</td><td>Dansk skrift</td></tr>
            <tr><td>Metode</td><td>Samla dei eldre formene dialektane hadde felles</td><td>Fornorska dansk skrift steg for steg</td></tr>
            <tr><td>Førte til</td><td>Landsmål, seinare nynorsk</td><td>Riksmål, seinare bokmål</td></tr>
          </tbody>
        </table>

        <div class="callout">
          <strong>Skriv på nynorsk.</strong> Alle oppgåvene her skal skrivast på nynorsk.
          Hugs <em class="nn">eg, ikkje, kva, frå, mykje</em> og <em class="nn">-a</em> i
          hokjønn bestemt eintal: <em class="nn">boka, historia, tida</em>. Teksten blir
          lagra automatisk, og du kan laste han ned som fil når du er ferdig.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "1. Fortel historia",
      question: "Skriv ein samanhengande tekst (200–300 ord) om korleis nynorsk vart til. Start før 1850 og avslutt med at landsmålet fekk namnet nynorsk. Teksten skal lesast av nokon som ikkje kan noko om emnet frå før.",
      hint: "Tenk på det som ei forteljing med ei årsak: eit land utan eige skriftspråk, ein mann som gjer noko med det, og eit resultat.",
      minWords: 200,
      checklist: [
        "Bruk minst fem årstal frå tidslinja, og bruk dei rett.",
        "Forklar kvifor spørsmålet om skriftspråk vart viktig etter 1814.",
        "Gjer greie for kva Aasen faktisk gjorde på reisene sine.",
        "Forklar kva ordet landsmål tyder, og kvifor han valde nettopp det ordet.",
        "Bind setningane saman med ord som fordi, difor, seinare og til slutt.",
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "2. Samanlikn Aasen og Knudsen",
      question: "Skriv ein samanliknande tekst (150–250 ord) om Ivar Aasen og Knud Knudsen. Dei ville begge gi Noreg eit norsk skriftspråk, men dei gjekk motsett veg. Forklar korleis, og kva dei to linene førte til.",
      hint: "Ein samanliknande tekst kan byggjast på to måtar: enten éin person av gongen, eller eitt punkt av gongen (utgangspunkt, metode, resultat). Vel éin av dei og hald deg til han.",
      minWords: 150,
      checklist: [
        "Gjer greie for kva kvar av dei tok utgangspunkt i.",
        "Forklar metoden til begge med eigne ord.",
        "Nemn kva skriftspråk kvar line førte til i dag.",
        "Peik på minst éin ting dei hadde felles.",
        "Avslutt med kva du sjølv meiner var den beste framgangsmåten, og kvifor.",
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "3. Forklar eit omgrep",
      question: "Vel <strong>eitt</strong> av desse omgrepa: <em class=\"nn\">landsmål</em>, <em class=\"nn\">jamstilling</em>, <em class=\"nn\">samnorsk</em> eller <em class=\"nn\">sidemål</em>. Forklar det (120–200 ord) for ein elev på 6. trinn som aldri har høyrt ordet før.",
      hint: "Skriv omgrepet du valde øvst i teksten. Å forklare noko enkelt er vanskelegare enn å forklare det innfløkt: unngå faguttrykk du ikkje forklarar undervegs.",
      minWords: 120,
      checklist: [
        "Skriv kva omgrepet tyder, med korte setningar.",
        "Gi eit konkret døme som ein sjetteklassing kjenner seg att i.",
        "Ta med minst eitt årstal, og forklar kvifor det året er viktig.",
        "Unngå vanskelege ord, eller forklar dei med ein gong du bruker dei.",
        "Avslutt med éi setning om kvifor omgrepet framleis betyr noko i dag.",
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "4. Dagbok frå reisa",
      question: "Skriv eit dagboknotat (150–250 ord) frå ein dag på ei av reisene til Ivar Aasen, i eg-form, som om du var han. Du dikter sjølv stemninga og staden, men alt det faglege skal stemme med det du har lese.",
      hint: "Reisene gjekk føre seg mellom 1842 og 1846, med stipend frå Det Kongelige Norske Videnskabers Selskab. Vel deg ein stad og ein dato innanfor desse åra.",
      minWords: 150,
      checklist: [
        "Skriv i eg-form og set dato og stad øvst.",
        "Vis minst tre konkrete ting Aasen gjorde: lytta, skreiv ned ord, samanlikna bøyingar frå ulike bygder.",
        "Få fram kvifor han ikkje ville nøye seg med éin einaste dialekt.",
        "Hald deg til fakta frå modulen. Ikkje dikt opp bøker eller årstal.",
        "Skriv på nynorsk, men du treng ikkje skrive slik dei skreiv på 1800-talet.",
      ],
    },
    {
      type: "exercise",
      exerciseType: "freeText",
      title: "5. Frå 1885 til i dag",
      question: "Skriv ein kort fagtekst (180–260 ord) om kva som har skjedd med nynorsken etter jamstillingsvedtaket. Kva har språket oppnådd, og kva er framleis uavklart?",
      hint: "Her skal du bruke stoffet frå dei to siste modulane i Del 1: språkstriden og samnorsk, og nynorsk i dag.",
      minWords: 180,
      checklist: [
        "Forklar kort kva jamstillingsvedtaket frå 1885 innebar.",
        "Gjer greie for samnorskpolitikken og korleis han enda.",
        "Ta med minst to fakta om stillinga i dag, til dømes språklova, kravet om 25 % eller kor mange som har nynorsk som hovudmål.",
        "Skriv minst éi setning om kva som framleis blir diskutert.",
        "Skil klart mellom fakta og dine eigne meiningar.",
      ],
    },
  ],
});

/* Repetisjonsmodulen. Oppgåvene ligg i tre lister som blir trekte tilfeldig av
   drill-motoren i js/drills.js. Dei to første testane tek éi liste kvar, den
   siste blandar alle tre. */
(() => {
  // Korte svar: årstal og tal. Går som skriving eller val.
  const AARSTAL = [
    { key: "rep-aar-union", prompt: "Kva år gjekk Noreg i union med Danmark?", cue: "(årstal)",
      accept: ["1380"], options: ["1814", "1450"],
      why: "Unionen med Danmark varte i over 400 år, frå 1380 til 1814." },
    { key: "rep-aar-1814", prompt: "Kva år vart Noreg løyst frå Danmark?", cue: "(årstal)",
      accept: ["1814"], options: ["1380", "1885"],
      why: "I 1814 gjekk Noreg inn i union med Sverige og fekk eiga grunnlov og eige storting. Skriftspråket var framleis dansk." },
    { key: "rep-aar-grammatik", prompt: "Kva år gav Aasen ut grammatikken sin?", cue: "(årstal)",
      accept: ["1848"], options: ["1850", "1853"],
      why: "<em class=\"nn\">Det norske Folkesprogs Grammatik</em> kom i 1848, to år etter at reisene var over." },
    { key: "rep-aar-ordbog", prompt: "Kva år kom ordboka til Aasen?", cue: "(årstal)",
      accept: ["1850"], options: ["1848", "1853"],
      why: "<em class=\"nn\">Ordbog over det norske Folkesprog</em> kom i 1850." },
    { key: "rep-aar-prover", prompt: "Kva år viste Aasen for første gong korleis landsmålet kunne sjå ut?", cue: "(årstal)",
      accept: ["1853"], options: ["1850", "1885"],
      why: "I 1853 gav han ut <em class=\"nn\">Prøver af Landsmaalet i Norge</em>." },
    { key: "rep-aar-reiser", prompt: "Kor mange år reiste Aasen rundt og samla dialektar?", cue: "(tal)",
      accept: ["fire", "4"], options: ["to", "ti"],
      why: "Reisene varte frå 1842 til 1846, altså fire år." },
    { key: "rep-aar-jamstilling", prompt: "Kva år kom jamstillingsvedtaket?", cue: "(årstal)",
      accept: ["1885"], options: ["1853", "1907"],
      why: "I 1885 vedtok Stortinget at landsmål og det norsk-danske skriftspråket skulle vere jamstilte." },
    { key: "rep-aar-sidemaal", prompt: "Sidan kva år har alle norske elevar lært båe skriftspråka?", cue: "(årstal)",
      accept: ["1907"], options: ["1885", "1938"],
      why: "Sidan 1907 har sidemål vore ein del av skulen for alle." },
    { key: "rep-aar-namnet", prompt: "Kva år fekk landsmålet namnet nynorsk?", cue: "(årstal)",
      accept: ["1929"], options: ["1907", "1938"],
      why: "Namnet vart endra i 1929. Språket var det same." },
    { key: "rep-aar-foreldre", prompt: "Kva tiår vart foreldreaksjonen mot samnorsk starta i?", cue: "(tiår)",
      accept: ["1940-talet", "1940-åra", "40-talet", "1940"], options: ["1950-talet", "1960-talet"],
      why: "Aksjonen vart starta på slutten av 1940-talet. Striden var hardast på 1950-talet." },
    { key: "rep-aar-mallov", prompt: "Kva år vart staten pålagd å bruke begge skriftspråka?", cue: "(årstal)",
      accept: ["1980"], options: ["1981", "2022"],
      why: "Mållova frå 1980 gav staten plikt til å bruke både bokmål og nynorsk." },
    { key: "rep-aar-1981", prompt: "Kva år gav Stortinget opp samnorskpolitikken?", cue: "(årstal)",
      accept: ["1981"], options: ["1938", "1959"],
      why: "I 1981 vart det vedteke at bokmål og nynorsk skulle få utvikle seg kvar for seg." },
    { key: "rep-aar-bokmal2005", prompt: "Kva år fekk bokmål si moderne rettskriving?", cue: "(årstal)",
      accept: ["2005"], options: ["2012", "1981"],
      why: "Bokmål fekk ny rettskriving i 2005, nynorsk i 2012." },
    { key: "rep-aar-nynorsk2012", prompt: "Kva år fekk nynorsk den rettskrivinga som gjeld i dag?", cue: "(årstal)",
      accept: ["2012"], options: ["2005", "2022"],
      why: "Rettskrivingsvedtaket for nynorsk kom i 2012." },
    { key: "rep-aar-spraaklov", prompt: "Kva år fekk Noreg ei ny språklov?", cue: "(årstal)",
      accept: ["2022"], options: ["1980", "2012"],
      why: "Språklova frå 2022 slår fast at norsk er hovudspråket, og at bokmål og nynorsk er likeverdige." },
  ];

  // Korte svar: namn og omgrep. Går som skriving eller val.
  const OMGREP = [
    { key: "rep-om-aasen", prompt: "Kven bygde eit skriftspråk på dei norske dialektane?", cue: "(namn)",
      accept: ["Ivar Aasen", "Aasen"], options: ["Knud Knudsen", "Stortinget"],
      why: "Ivar Aasen samla dialektformer på reisene sine og bygde landsmålet av dei." },
    { key: "rep-om-knudsen", prompt: "Kven ville fornorske dansk skrift steg for steg?", cue: "(namn)",
      accept: ["Knud Knudsen", "Knudsen"], options: ["Ivar Aasen", "foreldreaksjonen"],
      why: "Knud Knudsen (1812–1895) ville endre dansk skrift gradvis mot det danna talemålet i norske byar." },
    { key: "rep-om-landsmaal", prompt: "Kva kalla Aasen skriftspråket sitt?", cue: "(eitt ord)",
      accept: ["landsmål"], options: ["bokmål", "riksmål"],
      why: "Landsmål tyder språket for heile landet. Frå 1929 heitte det nynorsk." },
    { key: "rep-om-bokmal", prompt: "Kva skriftspråk voks fram av lina til Knudsen?", cue: "(eitt ord)",
      accept: ["bokmål"], options: ["nynorsk", "landsmål"],
      why: "Lina til Knudsen vart riksmål og seinare bokmål." },
    { key: "rep-om-orsta", prompt: "Kvar voks Ivar Aasen opp?", cue: "(stad)",
      accept: ["Ørsta", "Ørsta på Sunnmøre", "Sunnmøre"], options: ["Bergen", "Kristiania"],
      why: "Han voks opp på ein liten gard i Ørsta på Sunnmøre." },
    { key: "rep-om-samnorsk", prompt: "Kva heiter politikken som skulle føre bokmål og nynorsk saman til eitt språk?", cue: "(eitt ord)",
      accept: ["samnorsk", "samnorskpolitikken"], options: ["jamstilling", "fornorsking"],
      why: "Samnorsk var ein politikk, ikkje eit ferdig språk. Han vart aldri gjennomført fullt ut." },
    { key: "rep-om-jamstilling", prompt: "Kva heiter vedtaket frå 1885 som gjorde dei to skriftspråka likeverdige?", cue: "(eitt ord)",
      accept: ["jamstillingsvedtaket", "jamstilling"], options: ["språklova", "mållova"],
      why: "Jamstillingsvedtaket gav landsmålet offisiell status i skule og forvaltning." },
    { key: "rep-om-sidemaal", prompt: "Du har bokmål som hovudmål. Kva kallar vi då nynorsk for deg?", cue: "(eitt ord)",
      accept: ["sidemål"], options: ["hovudmål", "landsmål"],
      why: "Har du bokmål som hovudmål, er nynorsk sidemålet ditt, og omvendt." },
    { key: "rep-om-dialektar", prompt: "Kva slags norsk brukte folk medan skriftspråket var dansk?", cue: "(eitt ord)",
      accept: ["dialektar", "dialekt", "talemål"], options: ["gamalnorsk", "riksmål"],
      why: "Skriftspråket var dansk, men talemålet heldt fram med å vere norske dialektar." },
    { key: "rep-om-embetsmann", prompt: "Kva blir talemålet blant embetsmenn og borgarskap i byane ofte kalla?", cue: "(omgrep)",
      accept: ["dansk-norsk", "embetsmannsspråket", "dansknorsk"], options: ["landsmål", "gamalnorsk"],
      why: "Dei uttala dansk med norsk tonefall, og det blir kalla dansk-norsk eller embetsmannsspråket." },
    { key: "rep-om-nrk", prompt: "Kor mange prosent nynorsk må NRK ha i sendingane sine?", cue: "(tal)",
      accept: ["25", "25 prosent"], options: ["10", "50"],
      why: "Kravet er minst 25 %, og det gjeld både tekst og munnleg." },
    { key: "rep-om-dagogtid", prompt: "Kva avis blir skriven berre på nynorsk?", cue: "(namn)",
      accept: ["Dag og Tid"], options: ["Aftenposten", "Bergens Tidende"],
      why: "Dag og Tid kjem ut berre på nynorsk." },
  ];

  // Lengre svar. Desse blir alltid vist som fleirval.
  const KONSEPT = [
    { key: "rep-kon-gamalnorsk", prompt: "Kvifor forsvann det gamalnorske skriftspråket?",
      accept: ["Noreg var i union med Danmark, og dansk vart det einaste skriftspråket"],
      options: ["Folk slutta å snakke norsk", "Ivar Aasen erstatta det med landsmål"],
      why: "Gjennom over 400 år i union skreiv embetsmenn, prestar og forfattarar dansk, og dansk var språket i skulen." },
    { key: "rep-kon-1814", prompt: "Kva var nytt med språkspørsmålet etter 1814?",
      accept: ["Noreg var eit fritt land, men hadde framleis eit anna lands språk som skriftspråk"],
      options: ["Dansk vart forbode i skulen", "Noreg fekk eit ferdig norsk skriftspråk"],
      why: "Med eiga grunnlov og eige storting byrja mange å spørje om eit fritt land kunne skrive dansk." },
    { key: "rep-kon-metode", prompt: "Korleis bygde Aasen opp landsmålet?",
      accept: ["Han fann dei eldre formene som dei norske dialektane hadde felles"],
      options: ["Han valde éin dialekt og gjorde han til skriftspråk", "Han omsette dansk ord for ord"],
      why: "Aasen ville ikkje løfte fram éin dialekt, men finne det fellesgjeldande i mange." },
    { key: "rep-kon-vestnorsk", prompt: "Kvifor vekta Aasen former frå Vestlandet og frå dei indre bygdene?",
      accept: ["Fordi dei ofte stod nærare gamalnorsk"],
      options: ["Fordi flest folk budde der", "Fordi han sjølv ikkje kjende andre dialektar"],
      why: "Desse formene hadde endra seg mindre, og låg difor nærare det gamle språket." },
    { key: "rep-kon-jamstilling", prompt: "Kva innebar jamstillingsvedtaket?",
      accept: ["At landsmål og det norsk-danske skriftspråket skulle vere likeverdige i skule og forvaltning"],
      options: ["At alle måtte skrive landsmål", "At dansk vart forbode i Noreg"],
      why: "Vedtaket gjorde landsmålet offisielt, men tvinga ingen til å bruke det." },
    { key: "rep-kon-samnorsk", prompt: "Kva var målet med samnorskpolitikken?",
      accept: ["Å føre bokmål og nynorsk saman til eitt felles skriftspråk"],
      options: ["Å fjerne nynorsk heilt", "Å gjere dansk til hovudspråk igjen"],
      why: "Tre store rettskrivingsreformer i 1907, 1917 og 1938 endra begge språka i denne retninga." },
    { key: "rep-kon-foreldre", prompt: "Kva gjorde foreldra i foreldreaksjonen mot samnorsk?",
      accept: ["Dei retta lærebøkene tilbake mot eldre former"],
      options: ["Dei kravde meir nynorsk i skulen", "Dei starta ei eiga avis"],
      why: "Aksjonen var sterkast på Austlandet og i byane, og striden var hard på 1950-talet." },
    { key: "rep-kon-1981", prompt: "Kva vart resultatet av at samnorskpolitikken vart gitt opp i 1981?",
      accept: ["Bokmål og nynorsk skulle få utvikle seg kvar for seg"],
      options: ["Nynorsk mista den offisielle statusen sin", "Dei to språka vart slått saman"],
      why: "Etterpå kom moderne rettskrivingar for kvart språk: 2005 for bokmål og 2012 for nynorsk." },
    { key: "rep-kon-spraaklov", prompt: "Kva slår språklova frå 2022 fast?",
      accept: ["At norsk er hovudspråket, og at bokmål og nynorsk er likeverdige skriftspråk"],
      options: ["At nynorsk er hovudspråket i Noreg", "At statsorgan sjølve kan velje éi målform"],
      why: "Lova vidarefører prinsippet frå jamstillingsvedtaket, no i moderne form." },
    { key: "rep-kon-statsorgan", prompt: "Kor mykje nynorsk skal statsorgan bruke i tekstar retta mot ålmenta?",
      accept: ["Minst 25 %"], options: ["Minst 10 %", "Minst 50 %"],
      why: "Kravet er minst 25 % nynorsk og minst 25 % bokmål." },
    { key: "rep-kon-andel", prompt: "Om lag kor stor del av nordmenn har nynorsk som hovudmål?",
      accept: ["Om lag 10–12 %"], options: ["Om lag 25 %", "Om lag 40 %"],
      why: "Delen har halde seg nokså stabil over tid." },
    { key: "rep-kon-kjerne", prompt: "Kvar ligg kjerneområda for nynorsk?",
      accept: ["Vestland, Møre og Romsdal og delar av indre Austlandet"],
      options: ["Oslo og Viken", "Nord-Noreg og Trøndelag"],
      why: "Valdres, Hallingdal og Gudbrandsdalen er dei viktigaste austlandsområda." },
    { key: "rep-kon-argfor", prompt: "Kva er eit vanleg argument som støttar sidemålsopplæring?",
      accept: ["Nynorsk er ein del av kulturarven, og utan opplæring blir språket sett under press"],
      options: ["Nynorsk er lettare å lære enn bokmål", "Sidemål gir betre karakterar i engelsk"],
      why: "Motargumentet er at tida heller kunne brukast på andre fag." },
    { key: "rep-kon-grammatik", prompt: "Kva heiter grammatikken Aasen gav ut i 1848?",
      accept: ["Det norske Folkesprogs Grammatik"],
      options: ["Ordbog over det norske Folkesprog", "Prøver af Landsmaalet i Norge"],
      why: "Grammatikken kom i 1848, ordboka i 1850 og tekstprøvene i 1853." },
    { key: "rep-kon-prover", prompt: "I kva bok viste Aasen korleis eit nytt norsk skriftspråk kunne sjå ut?",
      accept: ["Prøver af Landsmaalet i Norge"],
      options: ["Det norske Folkesprogs Grammatik", "Ordbog over det norske Folkesprog"],
      why: "Boka kom i 1853. Det var her landsmålet vart vist i praksis." },
  ];

  Modules.register({
    id: "historie-repetisjon",
    part: 1,
    title: "Repetisjon: kva hugsar du?",
    summary: "Test deg sjølv med tilfeldig valde oppgåver frå heile Del 1.",
    estimatedMinutes: 25,
    sections: [
      {
        type: "lesson",
        title: "Slik fungerer testen",
        content: `
          <p>Denne modulen inneheld ingen nye fakta. Her skal du finne ut kor mykje som sit
          att etter dei fire første modulane i Del 1.</p>
          <ul>
            <li>Kvar test trekkjer oppgåvene <strong>tilfeldig</strong>, så du får ei ny
                blanding kvar gong.</li>
            <li>Du får éi oppgåve om gongen. Skriv svaret og trykk <strong>Enter</strong>,
                eller vel eit alternativ.</li>
            <li>Du får vite med ein gong om det var rett, og kvifor.</li>
            <li>Etter runden kan du <strong>øve på det du bomma på</strong> før du tek ein ny
                runde.</li>
            <li>Beste resultatet blir lagra. Ein runde med minst 80&nbsp;% rett tel som
                fullført.</li>
          </ul>

          <h3>Tre testar</h3>
          <p>Dei to første er korte og målretta. Den siste er den store prøven på alt.</p>
          <table>
            <thead><tr><th>Test</th><th>Handlar om</th><th>Form</th></tr></thead>
            <tbody>
              <tr><td>Årstal og hendingar</td><td>Tidslinja frå 1380 til 2022</td><td>Skriving eller fleirval</td></tr>
              <tr><td>Personar og omgrep</td><td>Namn, stader og faguttrykk</td><td>Skriving eller fleirval</td></tr>
              <tr><td>Stor test</td><td>Alt, òg dei lengre spørsmåla</td><td>Fleirval</td></tr>
            </tbody>
          </table>

          <div class="callout">
            <strong>Fekk du under 80 %?</strong> Gå tilbake til modulen det gjeld og les
            leksjonen ein gong til:
            <a href="modul.html?id=historie-bakgrunn">Norsk språk før 1850</a>,
            <a href="modul.html?id=historie-aasen">Ivar Aasen og landsmålet</a>,
            <a href="modul.html?id=historie-striden">Språkstriden og samnorsk</a> eller
            <a href="modul.html?id=historie-i-dag">Nynorsk i dag og den moderne debatten</a>.
          </div>
        `,
      },
      {
        type: "exercise",
        exerciseType: "drill",
        title: "Test 1: årstal og hendingar",
        intro: "Åtte tilfeldige spørsmål om tidslinja. Svar med tal.",
        items: AARSTAL,
        perRound: 8,
        mode: "mixed",
      },
      {
        type: "exercise",
        exerciseType: "drill",
        title: "Test 2: personar og omgrep",
        intro: "Åtte tilfeldige spørsmål om namn, stader og faguttrykk.",
        items: OMGREP,
        perRound: 8,
        mode: "mixed",
      },
      {
        type: "exercise",
        exerciseType: "drill",
        title: "Test 3: stor test frå heile Del 1",
        intro: "Femten tilfeldige spørsmål frå alle dei fire modulane, med fleirval. Klarer du 80&nbsp;%?",
        mix: [{ items: AARSTAL }, { items: OMGREP }, { items: KONSEPT }],
        perRound: 15,
        mode: "choice",
      },
    ],
  });
})();
