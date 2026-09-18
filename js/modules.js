/* Module registry. Each content file calls Modules.register({...}).
   A part may be split into named groups (see PART_GROUPS); modules in such a
   part carry a `group` field and are ordered by group first, then by the order
   they were registered in. */

const Modules = (() => {
  const list = [];

  // Groups per part. Parts without an entry here are rendered as one flat list.
  const PART_GROUPS = {
    2: [
      { id: "omgrep",     title: "Grunnomgrep",   blurb: "Kva er eit ord bygd opp av, kva ordklassar finst, og kva tyder bøying og setningsledd?" },
      { id: "ordklassar", title: "Ordklassar",    blurb: "Substantiv, verb, pronomen og adjektiv: reglane og dei viktigaste skilnadene frå bokmål." },
      { id: "trening",    title: "Mengdetrening", blurb: "Korte rundar med mange oppgåver. Du får nye ord kvar gong, og kan øve på det du bomma på." },
    ],
    4: [
      { id: "skriving", title: "Skriv tekstar", blurb: "Omsetjing, korte kvardagstekstar og lengre forteljande og argumenterande tekstar." },
      { id: "feil",     title: "Typiske feil",  blurb: "Feila elevar oftast gjer på nynorsk, og korleis du finn og rettar dei i eigen tekst." },
    ],
  };

  function register(mod) {
    // Assign stable section ids if missing
    mod.sections.forEach((s, i) => {
      if (!s.id) s.id = `s${i + 1}`;
    });
    list.push(mod);
  }

  function all() { return list.slice(); }
  function byPart(n) { return list.filter(m => m.part === n); }
  function get(id) { return list.find(m => m.id === id) || null; }

  function groupDefs(part) { return PART_GROUPS[part] || []; }

  function groupIndex(part, groupId) {
    const idx = groupDefs(part).findIndex(g => g.id === groupId);
    return idx < 0 ? Number.MAX_SAFE_INTEGER : idx; // unknown/missing group sorts last
  }

  // Modules in a part, ordered by group (if the part has groups), then registration order.
  function orderedByPart(part) {
    const mods = byPart(part);
    if (groupDefs(part).length === 0) return mods;
    return mods
      .map((m, i) => ({ m, i }))
      .sort((a, b) => (groupIndex(part, a.m.group) - groupIndex(part, b.m.group)) || (a.i - b.i))
      .map(x => x.m);
  }

  // [{ group: {id,title,blurb} | null, modules: [...] }] for rendering.
  function groupsFor(part) {
    const defs = groupDefs(part);
    const mods = orderedByPart(part);
    if (defs.length === 0) return [{ group: null, modules: mods }];
    const out = defs.map(g => ({ group: g, modules: mods.filter(m => m.group === g.id) }));
    const stray = mods.filter(m => !defs.some(g => g.id === m.group));
    if (stray.length) out.push({ group: { id: "_", title: "Anna", blurb: "" }, modules: stray });
    return out.filter(g => g.modules.length > 0);
  }

  function groupOf(mod) {
    return groupDefs(mod.part).find(g => g.id === mod.group) || null;
  }

  function exerciseCount(mod) {
    return mod.sections.filter(s => s.type === "exercise" || s.type === "reading").length;
  }

  // For "completed" status: all gradable exercises must be answered (any attempt).
  // Free text counts as done if user has saved any non-empty text.
  function isModuleFullyDone(mod, progress, texts) {
    const moduleTexts = (texts || {})[mod.id] || {};
    for (const s of mod.sections) {
      if (s.type === "exercise") {
        if (s.exerciseType === "freeText") {
          const t = moduleTexts[s.id];
          if (!t || !t.value || !t.value.trim()) return false;
        } else {
          const rec = (progress.sections || {})[s.id];
          if (!rec) return false;
        }
      } else if (s.type === "reading") {
        const rec = (progress.sections || {})[s.id];
        if (!rec) return false;
      }
    }
    return true;
  }

  return { register, all, byPart, get, orderedByPart, groupsFor, groupDefs, groupOf, exerciseCount, isModuleFullyDone };
})();
