/* Drill engine for mengdetrening.
   Turns the compact word tables in js/content/bank.js into many small items,
   and samples rounds from them. Pure data code: no DOM access, so the same file
   runs in the browser (modul.html) and in node (tools/validate-content.js).

   Drill section spec (in a content file):
     { type: "exercise", exerciseType: "drill", intro: "…",
       bank: "nouns" | "verbs" | "adjectives" | "words" | "sentences",
       tasks: ["defSg", …],          // generators, see TASKS below
       filter: { g: ["f"] },         // field → allowed values (optional)
       only: ["bok", …],             // lemma whitelist (optional)
       exclude: ["…"],               // lemma blacklist (optional)
       set: "pronomen",              // for bank "sentences": which list
       items: [ {…} ],               // inline hand-written items (optional)
       mix: [ spec, spec, … ],       // union of several specs (optional)
       perRound: 10,
       mode: "type" | "choice" | "mixed" }

   Item shape produced by build():
     { key, prompt, cue, accept: [..], options: [..] | null, kind: "type"|"choice"|"either", why }
*/

const Drills = (() => {

  /* ---------- small helpers ---------- */

  function splitAlt(s) {
    return String(s == null ? "" : s).split("|").map(x => x.trim()).filter(Boolean);
  }
  function first(s) { return splitAlt(s)[0] || ""; }

  function normalize(s) {
    return (s || "")
      .toLowerCase()
      .replace(/[.,;:!?"'`´‘’“”«»]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function uniq(arr) {
    const seen = new Set();
    return arr.filter(x => {
      const k = normalize(x);
      if (!k || seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }

  function getBank() {
    if (typeof Bank !== "undefined") return Bank;
    if (typeof globalThis !== "undefined" && globalThis.Bank) return globalThis.Bank;
    return {};
  }

  function stemOf(w) { return /e$/.test(w) ? w.slice(0, -1) : w; }

  const ARTICLE = { m: "ein", f: "ei", n: "eit" };
  const GENDER = { m: "hankjønn", f: "hokjønn", n: "inkjekjønn" };
  const CLASS_NAME = { a: "a-verb", e: "e-verb", j: "j-verb", kort: "kortverb", sterk: "sterkt verb", u: "uregelrett verb" };

  /* ---------- distractor helpers ---------- */

  // Remove anything that is actually an accepted answer, dedupe, and top up
  // from a pool of "borrowed" forms if fewer than `min` remain.
  function finishOptions(correctAccept, candidates, borrowPool, min) {
    const acc = new Set(correctAccept.map(normalize));
    let d = uniq(candidates.filter(c => c && !acc.has(normalize(c))));
    if (d.length < min) {
      const extra = shuffle(uniq((borrowPool || []).filter(c => c && !acc.has(normalize(c)) && !d.some(x => normalize(x) === normalize(c)))));
      d = d.concat(extra.slice(0, min - d.length));
    }
    d = d.slice(0, 3);
    return [correctAccept[0]].concat(d);
  }

  /* ---------- NOUNS ---------- */
  // { w, g, f: [ubest.sg, best.sg, ubest.pl, best.pl], bm? }

  function nounExpected(n) {
    const st = stemOf(n.w);
    if (n.g === "m") return [n.w, st + "en", st + "ar", st + "ane"];
    if (n.g === "f") return [n.w, st + "a", st + "er", st + "ene"];
    return [n.w, st + "et", n.w, st + "a"];
  }
  const NOUN_RULE = {
    m: ["", "Hankjønnsord får -en i bestemt form eintal.", "Hankjønnsord får som regel -ar i fleirtal.", "Hankjønnsord får -ane i bestemt form fleirtal."],
    f: ["", "Hokjønnsord får -a i bestemt form eintal (ikkje -en).", "Hokjønnsord får som regel -er i fleirtal.", "Hokjønnsord får -ene i bestemt form fleirtal."],
    n: ["", "Inkjekjønnsord får -et i bestemt form eintal.", "Inkjekjønnsord har inga ending i ubestemt fleirtal.", "Inkjekjønnsord får -a i bestemt form fleirtal (ikkje -ene)."],
  };
  function nounParadigm(n) {
    return `${ARTICLE[n.g]} ${first(n.f[0])} – ${first(n.f[1])} – ${first(n.f[2])} – ${first(n.f[3])}`;
  }
  function nounWhy(n, formIdx) {
    const exp = nounExpected(n);
    const regular = normalize(first(n.f[formIdx])) === normalize(exp[formIdx]);
    const rule = regular ? " " + NOUN_RULE[n.g][formIdx] : " Dette ordet er uregelrett, så lær heile rekkja.";
    return `${GENDER[n.g].charAt(0).toUpperCase() + GENDER[n.g].slice(1)}: <em class="nn">${nounParadigm(n)}</em>.${rule}`;
  }
  function nounWrongForms(n, formIdx) {
    const st = stemOf(n.w);
    const w = n.w;
    if (formIdx === 1) return [st + "en", st + "et", st + "a"];
    if (formIdx === 2) return [st + "er", st + "ar", st + "e", w];
    if (formIdx === 3) return [st + "ene", st + "ane", st + "a", st + "erne"];
    return [];
  }

  const NOUN_TASKS = {
    gender: (n, all) => ({
      key: `nouns:gender:${n.w}`,
      prompt: `Kva kjønn har «${first(n.f[0])}»?`,
      cue: "Vel rett artikkel.",
      accept: [ARTICLE[n.g]],
      options: ["ein", "ei", "eit"],
      kind: "choice",
      why: nounWhy(n, 1),
    }),
    defSg: (n, all) => formTask(n, all, 1, "Bestemt form eintal", "(denne …)"),
    indefPl: (n, all) => formTask(n, all, 2, "Ubestemt form fleirtal", "(mange …)"),
    defPl: (n, all) => formTask(n, all, 3, "Bestemt form fleirtal", "(alle …)"),
    fromBm: (n, all) => {
      if (!n.bm || normalize(n.bm) === normalize(first(n.f[0]))) return null;
      return {
        key: `nouns:fromBm:${n.w}`,
        prompt: `Kva heiter «${n.bm}» på nynorsk?`,
        cue: "Skriv ordet i ubestemt form eintal, utan artikkel.",
        accept: splitAlt(n.f[0]),
        options: finishOptions(splitAlt(n.f[0]), [n.bm], all.map(x => first(x.f[0])), 2),
        kind: "either",
        why: nounWhy(n, 1),
      };
    },
  };
  function formTask(n, all, idx, label, cue) {
    const accept = splitAlt(n.f[idx]);
    const borrow = all.filter(x => x.g === n.g && x !== n).map(x => first(x.f[idx]));
    return {
      key: `nouns:f${idx}:${n.w}`,
      prompt: `${label} av «${ARTICLE[n.g]} ${first(n.f[0])}»`,
      cue,
      accept,
      options: finishOptions(accept, nounWrongForms(n, idx), borrow, 2),
      kind: "either",
      why: nounWhy(n, idx),
    };
  }

  /* ---------- VERBS ---------- */
  // { inf, cls: "a"|"e"|"j"|"kort"|"sterk", f: [presens, preteritum, perfektum partisipp], bm? }

  const VERB_RULE = {
    a: "A-verb får -ar i presens og -a i preteritum og perfektum.",
    e: "E-verb får -er i presens, -de/-te i preteritum og -d/-t i perfektum.",
    j: "J-verb misser j-en utanom infinitiv: spør – spurde – har spurt.",
    kort: "Kortverb får -r i presens og -dde i preteritum: bur – budde – har budd.",
    sterk: "Sterke verb skifter vokal i preteritum og har inga ending der.",
    u: "Uregelrette verb følgjer ikkje eit mønster, så lær heile rekkja utanåt.",
  };
  function verbParadigm(v) {
    return `å ${first(v.inf)} – ${first(v.f[0])} – ${first(v.f[1])} – har ${first(v.f[2])}`;
  }
  function verbWhy(v) {
    return `${CLASS_NAME[v.cls].charAt(0).toUpperCase() + CLASS_NAME[v.cls].slice(1)}: <em class="nn">${verbParadigm(v)}</em>. ${VERB_RULE[v.cls] || ""}`.trim();
  }
  function verbWrongForms(v, idx) {
    const st = stemOf(v.inf);
    if (idx === 0) return [st + "er", st + "ar", st + "r", v.inf];
    if (idx === 1) return [st + "et", st + "te", st + "a", st + "de"];
    if (idx === 2) return [st + "et", st + "t", st + "a", st + "d"];
    return [];
  }
  const VERB_LABEL = ["Presens", "Preteritum", "Perfektum"];
  const VERB_CUE = ["(i dag …)", "(i går …)", "(har …)"];

  function verbFormTask(v, all, idx) {
    let accept = splitAlt(v.f[idx]);
    if (idx === 2) accept = accept.concat(accept.map(a => "har " + a));
    const borrow = all.filter(x => x !== v).map(x => first(x.f[idx]));
    return {
      key: `verbs:f${idx}:${first(v.inf)}`,
      prompt: `${VERB_LABEL[idx]} av «å ${first(v.inf)}»`,
      cue: VERB_CUE[idx],
      accept,
      options: finishOptions(splitAlt(v.f[idx]), verbWrongForms(v, idx), borrow, 2),
      kind: "either",
      why: verbWhy(v),
    };
  }
  const VERB_TASKS = {
    pres: (v, all) => verbFormTask(v, all, 0),
    pret: (v, all) => verbFormTask(v, all, 1),
    perf: (v, all) => verbFormTask(v, all, 2),
    cls: (v, all) => {
      const others = shuffle(Object.keys(CLASS_NAME).filter(c => c !== v.cls)).slice(0, 3);
      return {
        key: `verbs:cls:${first(v.inf)}`,
        prompt: `Kva slags verb er «å ${first(v.inf)}»?`,
        cue: `Tenk på preteritum: «i går ${first(v.f[1])}».`,
        accept: [CLASS_NAME[v.cls]],
        options: [CLASS_NAME[v.cls]].concat(others.map(c => CLASS_NAME[c])),
        kind: "choice",
        why: verbWhy(v),
      };
    },
    fromBm: (v, all) => {
      if (!v.bm || normalize(v.bm) === normalize(first(v.inf))) return null;
      return {
        key: `verbs:fromBm:${first(v.inf)}`,
        prompt: `Kva heiter «å ${v.bm}» på nynorsk?`,
        cue: "Skriv infinitiv utan «å».",
        accept: splitAlt(v.inf),
        options: finishOptions(splitAlt(v.inf), [v.bm], all.map(x => first(x.inf)), 2),
        kind: "either",
        why: verbWhy(v),
      };
    },
  };

  /* ---------- ADJECTIVES ---------- */
  // { w, f: { n, pl, komp, sup }, bm? }   (w is the hankjønn/hokjønn base form; def form = pl form)

  function adjParadigm(a) {
    return `${a.w} – ${first(a.f.n)} – ${first(a.f.pl)}; ${first(a.f.komp)} – ${first(a.f.sup)}`;
  }
  function adjWhy(a, rule) {
    return `<em class="nn">${adjParadigm(a)}</em>. ${rule}`;
  }
  const ADJ_TASKS = {
    neuter: (a, all) => ({
      key: `adj:n:${a.w}`,
      prompt: `Inkjekjønnsform av «${a.w}»`,
      cue: "(eit … hus)",
      accept: splitAlt(a.f.n),
      options: finishOptions(splitAlt(a.f.n), [a.w, a.w + "e", a.w + "tt"], all.filter(x => x !== a).map(x => first(x.f.n)), 2),
      kind: "either",
      why: adjWhy(a, "Adjektivet får som regel -t i inkjekjønn eintal."),
    }),
    plural: (a, all) => ({
      key: `adj:pl:${a.w}`,
      prompt: `Fleirtalsform av «${a.w}»`,
      cue: "(mange … hus)",
      accept: splitAlt(a.f.pl),
      options: finishOptions(splitAlt(a.f.pl), [a.w, first(a.f.n), a.w + "ar"], all.filter(x => x !== a).map(x => first(x.f.pl)), 2),
      kind: "either",
      why: adjWhy(a, "Adjektivet får -e i fleirtal og i bestemt form."),
    }),
    comp: (a, all) => ({
      key: `adj:komp:${a.w}`,
      prompt: `Komparativ av «${a.w}»`,
      cue: "(… enn)",
      accept: splitAlt(a.f.komp),
      options: finishOptions(splitAlt(a.f.komp), [a.w + "ere", a.w + "are", "meir " + a.w], all.filter(x => x !== a).map(x => first(x.f.komp)), 2),
      kind: "either",
      why: adjWhy(a, "Vanleg gradbøying på nynorsk er -are i komparativ og -ast i superlativ."),
    }),
    sup: (a, all) => ({
      key: `adj:sup:${a.w}`,
      prompt: `Superlativ av «${a.w}»`,
      cue: "(aller …)",
      accept: splitAlt(a.f.sup),
      options: finishOptions(splitAlt(a.f.sup), [a.w + "est", a.w + "ast", "mest " + a.w], all.filter(x => x !== a).map(x => first(x.f.sup)), 2),
      kind: "either",
      why: adjWhy(a, "Vanleg gradbøying på nynorsk er -are i komparativ og -ast i superlativ."),
    }),
  };

  /* ---------- WORDS (småord bokmål → nynorsk) ---------- */
  // { bm, nn: "ikkje" | "også|òg", wrong?: ["ikje"], why?: "…", tags?: ["sporjeord"] }

  const WORD_TASKS = {
    bm2nn: (w, all) => {
      if (normalize(w.bm) === normalize(first(w.nn))) return null;
      return {
        key: `words:bm2nn:${w.bm}`,
        prompt: `Kva heiter «${w.bm}» på nynorsk?`,
        cue: w.cue || "",
        accept: splitAlt(w.nn),
        options: finishOptions(splitAlt(w.nn), [w.bm].concat(w.wrong || []), all.filter(x => x !== w).map(x => first(x.nn)), 2),
        kind: "either",
        why: w.why || `<em class="bm">${w.bm}</em> heiter <em class="nn">${splitAlt(w.nn).join("</em> eller <em class=\"nn\">")}</em> på nynorsk.`,
      };
    },
    pick: (w, all) => {
      const it = WORD_TASKS.bm2nn(w, all);
      if (!it) return null;
      return Object.assign({}, it, { key: `words:pick:${w.bm}`, kind: "choice" });
    },
  };

  /* ---------- SENTENCES (hand-written items) ---------- */
  // Bank.sentences = { setName: [ { prompt: "Eg såg ___ i går.", cue: "(ho/henne)", accept: ["henne"], options?: [...], why: "…" } ] }

  function sentenceItem(it, i, setName) {
    const accept = Array.isArray(it.accept) ? it.accept : splitAlt(it.accept);
    return {
      key: it.key || `sent:${setName}:${i}:${normalize(it.prompt).slice(0, 40)}`,
      prompt: it.prompt,
      cue: it.cue || "",
      accept,
      options: it.options ? [accept[0]].concat(it.options.filter(o => !accept.some(a => normalize(a) === normalize(o)))) : null,
      kind: it.options ? "either" : "type",
      why: it.why || "",
    };
  }

  /* ---------- build ---------- */

  function applyFilter(list, spec, lemmaOf) {
    let out = list;
    if (spec.filter) {
      for (const [field, vals] of Object.entries(spec.filter)) {
        const allowed = [].concat(vals);
        out = out.filter(x => allowed.includes(x[field]) || (Array.isArray(x[field]) && x[field].some(v => allowed.includes(v))));
      }
    }
    if (spec.only) out = out.filter(x => spec.only.includes(lemmaOf(x)));
    if (spec.exclude) out = out.filter(x => !spec.exclude.includes(lemmaOf(x)));
    return out;
  }

  const BANKS = {
    nouns:      { tasks: NOUN_TASKS, lemma: x => x.w },
    verbs:      { tasks: VERB_TASKS, lemma: x => first(x.inf) },
    adjectives: { tasks: ADJ_TASKS,  lemma: x => x.w },
    words:      { tasks: WORD_TASKS, lemma: x => x.bm },
  };

  function build(spec) {
    const bank = getBank();
    let items = [];

    if (spec.mix) {
      spec.mix.forEach(sub => { items = items.concat(build(sub)); });
    }

    if (spec.items) {
      items = items.concat(spec.items.map((it, i) => sentenceItem(it, i, "inline")));
    }

    if (spec.bank === "sentences") {
      const sets = [].concat(spec.set || Object.keys(bank.sentences || {}));
      sets.forEach(name => {
        const list = (bank.sentences || {})[name] || [];
        items = items.concat(list.map((it, i) => sentenceItem(it, i, name)));
      });
    } else if (spec.bank && BANKS[spec.bank]) {
      const def = BANKS[spec.bank];
      const all = bank[spec.bank] || [];
      const list = applyFilter(all, spec, def.lemma);
      const tasks = [].concat(spec.tasks || Object.keys(def.tasks));
      tasks.forEach(t => {
        const gen = def.tasks[t];
        if (!gen) throw new Error(`Ukjend drill-oppgåve «${t}» for banken «${spec.bank}»`);
        list.forEach(entry => {
          const it = gen(entry, all);
          if (it) items.push(it);
        });
      });
    } else if (spec.bank) {
      throw new Error(`Ukjend drill-bank «${spec.bank}»`);
    }

    // Apply mode
    const mode = spec.mode || "mixed";
    items.forEach(it => {
      if (it.kind === "choice") return;               // choice-only stays choice
      if (mode === "type") it.kind = "type";
      else if (mode === "choice") it.kind = it.options && it.options.length >= 2 ? "choice" : "type";
      else it.kind = it.options && it.options.length >= 2 ? "either" : "type";
    });

    // Dedupe on key
    const seen = new Set();
    return items.filter(it => {
      if (seen.has(it.key)) return false;
      seen.add(it.key);
      return true;
    });
  }

  /* ---------- sample ---------- */

  function sample(items, n, recentKeys) {
    const want = Math.min(n, items.length);
    let pool = items;
    if (recentKeys && recentKeys.size && items.length >= 2 * want) {
      const fresh = items.filter(it => !recentKeys.has(it.key));
      if (fresh.length >= want) pool = fresh;
    }
    return shuffle(pool).slice(0, want);
  }

  // Prepare an item for presentation: decide type/choice, shuffle options, find correct index.
  function present(item, forceKind) {
    let kind = forceKind || item.kind;
    if (kind === "either") kind = Math.random() < 0.5 ? "type" : "choice";
    if (kind === "choice" && (!item.options || item.options.length < 2)) kind = "type";
    let options = null, correct = -1;
    if (kind === "choice") {
      options = shuffle(uniq(item.options));
      correct = options.findIndex(o => item.accept.some(a => normalize(a) === normalize(o)));
      if (correct < 0) { kind = "type"; options = null; }
    }
    return { item, kind, options, correct };
  }

  function isRight(item, answer) {
    const a = normalize(answer);
    return item.accept.some(x => normalize(x) === a);
  }

  return { build, sample, present, isRight, shuffle, normalize, splitAlt, first };
})();

if (typeof module !== "undefined" && module.exports) module.exports = Drills;
