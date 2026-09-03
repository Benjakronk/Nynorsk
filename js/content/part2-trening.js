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
