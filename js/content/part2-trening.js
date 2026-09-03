/* Del 2 · Mengdetrening
   Modulane her er bygde av «drill»-seksjonar som hentar oppgåver frå ordbankane
   i js/content/bank.js. Sjå toppen av js/drills.js for spesifikasjonen. */

Modules.register({
  id: "trening-substantiv",
  part: 2,
  group: "trening",
  title: "Substantiv – kjønn og bøying",
  summary: "Kjønn, bestemt form og fleirtal for over hundre substantiv. Nye ord i kvar runde.",
  estimatedMinutes: 20,
  sections: [
    {
      type: "lesson",
      title: "Slik trener du",
      content: `
        <p>Kvar treningsøkt gir deg ei handfull oppgåver om gongen, trekte tilfeldig frå ein
        ordbank. Skriv svaret og trykk <strong>Enter</strong>, eller vel eit alternativ. Du får
        vite med ein gong om det var rett, og kvifor.</p>
        <ul>
          <li>Etter runden kan du <strong>øve på feila</strong> før du tek ei ny runde.</li>
          <li>Beste resultatet ditt blir lagra. Ei runde med minst 80&nbsp;% rett tel som fullført.</li>
          <li>Der to former er tillatne (t.d. <em class="nn">barna</em> og <em class="nn">borna</em>), blir begge godtekne.</li>
        </ul>
        <div class="callout">
          <strong>Hugs mønstera:</strong> hankjønn <em class="nn">-en, -ar, -ane</em> ·
          hokjønn <em class="nn">-a, -er, -ene</em> · inkjekjønn <em class="nn">-et, –, -a</em>.
          Treng du repetisjon? Sjå <a href="modul.html?id=grammatikk-substantiv">Substantiv — kjønn og bøying</a>.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Kva kjønn har ordet?",
      intro: "Vel rett artikkel: <em class=\"nn\">ein</em>, <em class=\"nn\">ei</em> eller <em class=\"nn\">eit</em>.",
      bank: "nouns",
      tasks: ["gender"],
      perRound: 12,
      mode: "choice",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Bestemt form eintal",
      intro: "Skriv ordet i bestemt form eintal: <em class=\"nn\">ein gut → guten</em>, <em class=\"nn\">ei jente → jenta</em>, <em class=\"nn\">eit hus → huset</em>.",
      bank: "nouns",
      tasks: ["defSg"],
      perRound: 10,
      mode: "type",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Ubestemt form fleirtal",
      intro: "Skriv ordet i ubestemt form fleirtal: <em class=\"nn\">mange gutar, mange jenter, mange hus</em>.",
      bank: "nouns",
      tasks: ["indefPl"],
      perRound: 10,
      mode: "type",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Bestemt form fleirtal",
      intro: "Skriv ordet i bestemt form fleirtal: <em class=\"nn\">alle gutane, alle jentene, alle husa</em>.",
      bank: "nouns",
      tasks: ["defPl"],
      perRound: 10,
      mode: "type",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Hokjønnsord – her går det oftast gale",
      intro: "Berre hokjønnsord. Pass på <em class=\"nn\">-a</em> i bestemt eintal og omlyd i ord som <em class=\"nn\">bok – bøker</em>.",
      bank: "nouns",
      filter: { g: ["f"] },
      tasks: ["defSg", "indefPl", "defPl"],
      perRound: 12,
      mode: "mixed",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Inkjekjønn i fleirtal",
      intro: "Berre inkjekjønnsord. Hugs: inga ending i ubestemt fleirtal, og <em class=\"nn\">-a</em> i bestemt fleirtal (<em class=\"nn\">husa</em>, ikkje <em class=\"bm\">husene</em>).",
      bank: "nouns",
      filter: { g: ["n"] },
      tasks: ["indefPl", "defPl"],
      perRound: 10,
      mode: "mixed",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Frå bokmål til nynorsk",
      intro: "Kva heiter ordet på nynorsk? Skriv ubestemt form eintal.",
      bank: "nouns",
      tasks: ["fromBm"],
      perRound: 10,
      mode: "mixed",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Blanda substantivøkt",
      intro: "Alt om kvarandre: kjønn, bestemt form og fleirtal. Klarer du 15 på rad?",
      bank: "nouns",
      tasks: ["gender", "defSg", "indefPl", "defPl"],
      perRound: 15,
      mode: "mixed",
    },
  ],
});

Modules.register({
  id: "trening-verb",
  part: 2,
  group: "trening",
  title: "Verb – tider og klassar",
  summary: "Presens, preteritum og perfektum av nesten hundre verb: a-verb, e-verb, j-verb, kortverb og sterke verb.",
  estimatedMinutes: 25,
  sections: [
    {
      type: "lesson",
      title: "Slik trener du",
      content: `
        <p>Verb er der flest nynorskfeil skjer, og der mengdetrening hjelper mest. Her får du
        éi verbform om gongen, trekt tilfeldig frå ein bank med nesten hundre verb. Skriv forma
        og trykk <strong>Enter</strong>. Bommar du, får du heile bøyingsrekkja og regelen med ein gong.</p>
        <table>
          <thead><tr><th>Klasse</th><th>Kjenneteikn</th><th>Døme</th></tr></thead>
          <tbody>
            <tr><td>a-verb</td><td><em class="nn">-ar, -a, -a</em></td><td><em class="nn">kaste – kastar – kasta – har kasta</em></td></tr>
            <tr><td>e-verb</td><td><em class="nn">-er, -de/-te, -d/-t</em></td><td><em class="nn">høyre – høyrer – høyrde – har høyrt</em></td></tr>
            <tr><td>j-verb</td><td>misser j-en, inga ending i presens</td><td><em class="nn">spørje – spør – spurde – har spurt</em></td></tr>
            <tr><td>kortverb</td><td><em class="nn">-r, -dde, -dd</em></td><td><em class="nn">bu – bur – budde – har budd</em></td></tr>
            <tr><td>sterke verb</td><td>vokalskifte, inga ending</td><td><em class="nn">skrive – skriv – skreiv – har skrive</em></td></tr>
          </tbody>
        </table>
        <div class="callout">
          <strong>Hugs:</strong> bokmål <em class="bm">-et</em> i preteritum → a-verb (<em class="nn">kasta</em>);
          bokmål <em class="bm">-te/-de</em> → e-verb (<em class="nn">kjøpte, høyrde</em>). Sterke verb har aldri
          <em class="bm">-er</em> i presens: <em class="nn">kjem, finn, skriv</em>. Repetisjon finn du i
          <a href="modul.html?id=grammatikk-verb">Verb — sterke og svake</a> og
          <a href="modul.html?id=omgrep-boying">Bøyingsomgrep</a>. Der to former er tillatne
          (<em class="nn">gav/ga, blei/vart</em>), blir begge godtekne.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "A-verb i preteritum",
      intro: "Berre a-verb. Skriv preteritum: <em class=\"nn\">å kaste → kasta</em>. Aldri <em class=\"bm\">-et</em>!",
      bank: "verbs",
      filter: { cls: ["a"] },
      tasks: ["pret"],
      perRound: 10,
      mode: "type",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "E-verb i preteritum og perfektum",
      intro: "Berre e-verb. Preteritum får <em class=\"nn\">-de</em> eller <em class=\"nn\">-te</em>, perfektum <em class=\"nn\">-d</em> eller <em class=\"nn\">-t</em>: <em class=\"nn\">høyrde – har høyrt</em>.",
      bank: "verbs",
      filter: { cls: ["e"] },
      tasks: ["pret", "perf"],
      perRound: 10,
      mode: "type",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Presens av svake verb",
      intro: "A-verb får <em class=\"nn\">-ar</em>, e-verb får <em class=\"nn\">-er</em>, j-verb og kortverb har korte former: <em class=\"nn\">kastar, høyrer, spør, bur</em>.",
      bank: "verbs",
      filter: { cls: ["a", "e", "j", "kort"] },
      tasks: ["pres"],
      perRound: 12,
      mode: "mixed",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Sterke verb i preteritum",
      intro: "Berre sterke verb. Vokalen skifter, og det er inga ending: <em class=\"nn\">skreiv, fann, gjekk</em>.",
      bank: "verbs",
      filter: { cls: ["sterk"] },
      tasks: ["pret"],
      perRound: 12,
      mode: "type",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Sterke verb i presens og perfektum",
      intro: "Presens utan <em class=\"bm\">-er</em> (<em class=\"nn\">kjem, skriv</em>) og perfektum på <em class=\"nn\">-e</em> (<em class=\"nn\">har skrive, har funne</em>). Du kan skrive perfektum med eller utan «har».",
      bank: "verbs",
      filter: { cls: ["sterk"] },
      tasks: ["pres", "perf"],
      perRound: 12,
      mode: "mixed",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "J-verb, kortverb og uregelrette verb",
      intro: "Dei små gruppene som ofte blir gløymde: <em class=\"nn\">spør – spurde – spurt</em>, <em class=\"nn\">bur – budde – budd</em>, <em class=\"nn\">seier – sa – sagt</em>.",
      bank: "verbs",
      filter: { cls: ["j", "kort", "u"] },
      tasks: ["pres", "pret", "perf"],
      perRound: 10,
      mode: "mixed",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Kva slags verb er det?",
      intro: "Vel verbklasse. Tenk på preteritum: endar det på <em class=\"nn\">-a</em>, <em class=\"nn\">-de/-te</em>, <em class=\"nn\">-dde</em> – eller skifter det vokal?",
      bank: "verbs",
      tasks: ["cls"],
      perRound: 10,
      mode: "choice",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Frå bokmål til nynorsk",
      intro: "Kva heiter verbet på nynorsk? Skriv infinitiv utan «å»: <em class=\"bm\">å spise</em> → <em class=\"nn\">ete</em>.",
      bank: "verbs",
      tasks: ["fromBm"],
      perRound: 10,
      mode: "mixed",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Blanda verbøkt",
      intro: "Alle klassar og alle tider om kvarandre. Klarer du 15 på rad?",
      bank: "verbs",
      tasks: ["pres", "pret", "perf"],
      perRound: 15,
      mode: "mixed",
    },
  ],
});

Modules.register({
  id: "trening-adjektiv",
  part: 2,
  group: "trening",
  title: "Adjektiv – samsvar og gradbøying",
  summary: "Inkjekjønn, fleirtal, komparativ og superlativ for over femti adjektiv.",
  estimatedMinutes: 15,
  sections: [
    {
      type: "lesson",
      title: "Slik trener du",
      content: `
        <p>Adjektivet rettar seg etter substantivet: <em class="nn">ein fin dag, ei fin bok, eit fin<strong>t</strong> hus,
        fin<strong>e</strong> dagar</em>. Og det gradbøyer seg: <em class="nn">fin – fin<strong>are</strong> – fin<strong>ast</strong></em>.
        Her øver du på desse formene med eitt adjektiv om gongen.</p>
        <div class="callout">
          <strong>Hugs:</strong> adjektiv på <em class="nn">-leg</em> og <em class="nn">-ig</em> får <strong>ikkje</strong> -t
          i inkjekjønn (<em class="nn">eit vanleg hus, eit viktig val</em>). Nynorsk gradbøyer med
          <em class="nn">-are/-ast</em>, ikkje <em class="bm">-ere/-est</em>. Nokre adjektiv er uregelrette:
          <em class="nn">god – betre – best, liten – mindre – minst, gammal – eldre – eldst</em>.
          Repetisjon: <a href="modul.html?id=grammatikk-adjektiv">Adjektiv — samsvarsbøying</a>.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Inkjekjønn: eit … hus",
      intro: "Skriv adjektivet slik det står framfor eit inkjekjønnsord: <em class=\"nn\">eit stort hus, eit vanleg hus</em>.",
      bank: "adjectives",
      tasks: ["neuter"],
      perRound: 10,
      mode: "type",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Fleirtal: mange … hus",
      intro: "Skriv fleirtalsforma (den same som bestemt form): <em class=\"nn\">mange store hus, det store huset</em>.",
      bank: "adjectives",
      tasks: ["plural"],
      perRound: 10,
      mode: "type",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Komparativ: … enn",
      intro: "Skriv komparativ: <em class=\"nn\">finare, større, betre</em>.",
      bank: "adjectives",
      tasks: ["comp"],
      perRound: 10,
      mode: "mixed",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Superlativ: aller …",
      intro: "Skriv superlativ: <em class=\"nn\">finast, størst, best</em>.",
      bank: "adjectives",
      tasks: ["sup"],
      perRound: 10,
      mode: "mixed",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Blanda adjektivøkt",
      intro: "Samsvar og gradbøying om kvarandre.",
      bank: "adjectives",
      tasks: ["neuter", "plural", "comp", "sup"],
      perRound: 15,
      mode: "mixed",
    },
  ],
});

Modules.register({
  id: "trening-smaord",
  part: 2,
  group: "trening",
  title: "Pronomen, spørjeord og småord",
  summary: "Over hundre småord frå bokmål til nynorsk, pluss setningar med ho/henne, de/dykk, noko/nokon, då/når og sin/hans.",
  estimatedMinutes: 25,
  sections: [
    {
      type: "lesson",
      title: "Slik trener du",
      content: `
        <p>Småorda er dei orda hjernen hoppar over når du les fort – og difor dei som oftast blir
        ståande på bokmål: <em class="bm">ikke, bare, hva, hvordan, noen</em>. Her trener du dei
        på to måtar: først som gloser (kva heiter ordet på nynorsk?), så i setningar der du må velje
        rett form.</p>
        <div class="callout">
          <strong>Dei viktigaste reglane:</strong>
          <ul>
            <li><em class="nn">ho</em> er subjekt, <em class="nn">henne</em> er objekt. <em class="nn">han</em> er begge delar.</li>
            <li><em class="nn">de</em> = «dere» (subjekt), <em class="nn">dykk</em> = «dere» (objekt), <em class="nn">dei</em> = «de/dem».</li>
            <li><em class="nn">nokon</em> (person / hankjønn), <em class="nn">noka</em> (hokjønn), <em class="nn">noko</em> (inkjekjønn / mengd), <em class="nn">nokre</em> (fleirtal).</li>
            <li><em class="nn">då</em> = éin gong i fortida, <em class="nn">når</em> = kvar gong / framtid. <em class="nn">kvar</em> = stad, <em class="nn">kor</em> = grad.</li>
            <li><em class="nn">sin/si/sitt/sine</em> viser tilbake til subjektet; elles <em class="nn">hans/hennar/deira</em>.</li>
          </ul>
          Repetisjon: <a href="modul.html?id=grammatikk-pronomen">Pronomen og spørjeord</a> og
          <a href="modul.html?id=grammatikk-skriveregler">Skrivereglar og vanlege fallgruver</a>.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Spørjeorda",
      intro: "Kva heiter spørjeordet på nynorsk? <em class=\"bm\">hva</em> → <em class=\"nn\">kva</em>, <em class=\"bm\">hvordan</em> → <em class=\"nn\">korleis</em>.",
      bank: "words",
      filter: { tags: ["sporjeord"] },
      tasks: ["bm2nn"],
      perRound: 10,
      mode: "mixed",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Småord frå bokmål til nynorsk",
      intro: "Skriv nynorskordet. Er fleire former tillatne, held det med éi av dei.",
      bank: "words",
      filter: { tags: ["smaord", "pronomen", "adjektiv", "diverse"] },
      tasks: ["bm2nn"],
      perRound: 12,
      mode: "type",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Vel rett form",
      intro: "Same ord, men no vel du mellom alternativ. Pass på dei lure feilformene!",
      bank: "words",
      tasks: ["pick"],
      perRound: 12,
      mode: "choice",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "-het og -else: finst det eit betre ord?",
      intro: "Bokmålsord på <em class=\"bm\">-het</em> og <em class=\"bm\">-else</em> har ofte eit eige nynorskord: <em class=\"bm\">frihet</em> → <em class=\"nn\">fridom</em>, <em class=\"bm\">følelse</em> → <em class=\"nn\">kjensle</em>.",
      bank: "words",
      filter: { tags: ["het"] },
      tasks: ["bm2nn"],
      perRound: 10,
      mode: "mixed",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Pronomen i setning",
      intro: "Set inn rett pronomen: <em class=\"nn\">ho/henne, han/honom, de/dykk, dei, vi/oss</em>.",
      bank: "sentences",
      set: "pronomen",
      perRound: 10,
      mode: "mixed",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Noko, nokon eller nokre?",
      intro: "Set inn rett form.",
      bank: "sentences",
      set: "nokon",
      perRound: 8,
      mode: "mixed",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Då eller når? Kvar eller kor?",
      intro: "«Den gongen då – kvar gong når.» «Kvar bur du? – Kor gammal er du?»",
      bank: "sentences",
      set: ["daNar", "kvarKor"],
      perRound: 10,
      mode: "mixed",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Sin eller hans? Seg eller kvarandre?",
      intro: "Eigedomsord og refleksive pronomen, pluss <em class=\"nn\">enno/endå</em> og <em class=\"nn\">òg/og</em>.",
      bank: "sentences",
      set: ["possessiv", "refleksiv", "ennoEnda", "ogsaa"],
      perRound: 12,
      mode: "mixed",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Blanda småordøkt",
      intro: "Gloser og setningar om kvarandre.",
      mix: [
        { bank: "words", tasks: ["bm2nn"] },
        { bank: "sentences" },
      ],
      perRound: 15,
      mode: "mixed",
    },
  ],
});

Modules.register({
  id: "trening-blanda",
  part: 2,
  group: "trening",
  title: "Blandingsøkt",
  summary: "Alt om kvarandre: substantiv, verb, adjektiv, småord og setningar. Bruk denne som oppvarming eller som prøve på deg sjølv.",
  estimatedMinutes: 15,
  sections: [
    {
      type: "lesson",
      title: "Slik trener du",
      content: `
        <p>I dei andre treningsmodulane øver du på éin ting om gongen. Her kjem alt om kvarandre,
        slik det gjer når du skriv ein tekst: eit substantiv i fleirtal, eit verb i preteritum, eit
        adjektiv i inkjekjønn, eit småord. Det er den beste testen på om kunnskapen sit.</p>
        <div class="callout">
          <strong>Tips:</strong> Ta ei runde her <em>før</em> du skriv ein tekst på nynorsk, som oppvarming –
          og éi etterpå, med dei orda du var usikker på friskt i minnet. Under 80 % rett? Gå tilbake til
          den treningsmodulen som handlar om det du bomma på.
        </div>
      `,
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Alt om kvarandre",
      intro: "Substantiv, verb, adjektiv og småord. 20 oppgåver per runde.",
      mix: [
        { bank: "nouns", tasks: ["gender", "defSg", "indefPl", "defPl"] },
        { bank: "verbs", tasks: ["pres", "pret", "perf"] },
        { bank: "adjectives", tasks: ["neuter", "plural", "comp", "sup"] },
        { bank: "words", tasks: ["bm2nn"] },
      ],
      perRound: 20,
      mode: "mixed",
    },
    {
      type: "exercise",
      exerciseType: "drill",
      title: "Setningar",
      intro: "Alle setningsoppgåvene: pronomen, noko/nokon, då/når, kvar/kor, sin/hans, seg/kvarandre, enno/endå og òg/og.",
      bank: "sentences",
      perRound: 15,
      mode: "mixed",
    },
  ],
});
