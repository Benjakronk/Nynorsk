/* Module registry. Each content file calls Modules.register({...}). */

const Modules = (() => {
  const list = [];

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

  return { register, all, byPart, get, exerciseCount, isModuleFullyDone };
})();
