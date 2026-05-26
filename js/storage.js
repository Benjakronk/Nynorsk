/* Local persistence for the nynorsk course.
   Stores:
   - progress[moduleId] = { sections: { [sectionId]: { correct: bool, attempts: int, answer: any } }, completed: bool, lastVisited: iso }
   - texts[moduleId][sectionId] = { value, updated }
   Everything is plain JSON in localStorage under one key. */

const STORAGE_KEY = "nynorskkurs:v1";

const Store = (() => {
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return blank();
      const data = JSON.parse(raw);
      // Ensure shape
      data.progress = data.progress || {};
      data.texts = data.texts || {};
      data.meta = data.meta || { createdAt: new Date().toISOString() };
      return data;
    } catch (e) {
      console.warn("Kunne ikkje lese lagring:", e);
      return blank();
    }
  }

  function blank() {
    return {
      version: 1,
      meta: { createdAt: new Date().toISOString() },
      progress: {},
      texts: {},
    };
  }

  function save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("Kunne ikkje lagre:", e);
    }
  }

  let cache = load();

  function getAll() { return cache; }

  function getModule(modId) {
    if (!cache.progress[modId]) {
      cache.progress[modId] = { sections: {}, completed: false, lastVisited: null };
    }
    return cache.progress[modId];
  }

  function recordAnswer(modId, sectionId, payload) {
    const mod = getModule(modId);
    const prev = mod.sections[sectionId] || { attempts: 0 };
    mod.sections[sectionId] = {
      ...prev,
      ...payload,
      attempts: (prev.attempts || 0) + 1,
      updated: new Date().toISOString(),
    };
    mod.lastVisited = new Date().toISOString();
    save(cache);
  }

  function setCompleted(modId, completed) {
    const mod = getModule(modId);
    mod.completed = !!completed;
    save(cache);
  }

  function getText(modId, sectionId) {
    return (cache.texts[modId] && cache.texts[modId][sectionId]) || null;
  }

  function saveText(modId, sectionId, value) {
    if (!cache.texts[modId]) cache.texts[modId] = {};
    cache.texts[modId][sectionId] = {
      value,
      updated: new Date().toISOString(),
    };
    save(cache);
  }

  function moduleStats(modId) {
    const mod = cache.progress[modId];
    if (!mod) return { done: 0, total: 0, correct: 0, completed: false };
    const sections = Object.values(mod.sections);
    const correct = sections.filter(s => s.correct === true).length;
    return {
      done: sections.length,
      correct,
      completed: !!mod.completed,
    };
  }

  function totals() {
    let completed = 0;
    let correct = 0;
    for (const mod of Object.values(cache.progress)) {
      if (mod.completed) completed++;
      for (const s of Object.values(mod.sections)) {
        if (s.correct === true) correct++;
      }
    }
    let texts = 0;
    for (const m of Object.values(cache.texts)) {
      for (const t of Object.values(m)) {
        if (t.value && t.value.trim().length > 0) texts++;
      }
    }
    return { completed, correct, texts };
  }

  function getIdentity() {
    return cache.meta.identity || null;
  }

  function setIdentity(identity) {
    cache.meta.identity = {
      firstName: (identity.firstName || "").trim(),
      lastName: (identity.lastName || "").trim(),
      className: (identity.className || "").trim(),
      updated: new Date().toISOString(),
    };
    save(cache);
  }

  function exportJSON() {
    return JSON.stringify(cache, null, 2);
  }

  function importJSON(text) {
    const data = JSON.parse(text);
    if (typeof data !== "object" || data === null) throw new Error("Ugyldig fil.");
    if (!data.progress || !data.texts) throw new Error("Filen manglar progresjons- eller tekstdata.");
    cache = {
      version: data.version || 1,
      meta: data.meta || { createdAt: new Date().toISOString() },
      progress: data.progress,
      texts: data.texts,
    };
    save(cache);
  }

  function reset() {
    cache = blank();
    save(cache);
  }

  return {
    getAll, getModule, recordAnswer, setCompleted,
    getText, saveText, moduleStats, totals,
    getIdentity, setIdentity,
    exportJSON, importJSON, reset,
  };
})();
