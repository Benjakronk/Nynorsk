/* Exercise renderers + grading. Each type returns a DOM <section> element. */

const Exercises = (() => {

  function normalize(s) {
    return (s || "")
      .toLowerCase()
      .replace(/[.,;:!?"'`´‘’“”]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function eqAny(answer, accepts) {
    const a = normalize(answer);
    return accepts.some(x => normalize(x) === a);
  }

  function el(tag, attrs = {}, children = []) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") e.className = v;
      else if (k === "html") e.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") e.addEventListener(k.slice(2), v);
      else if (v === true) e.setAttribute(k, "");
      else if (v !== false && v !== null && v !== undefined) e.setAttribute(k, v);
    }
    for (const c of [].concat(children)) {
      if (c == null) continue;
      e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return e;
  }

  function feedbackEl(isRight, explanation) {
    const f = el("div", { class: "feedback " + (isRight ? "right" : "wrong") });
    f.appendChild(el("div", {}, isRight ? "Rett!" : "Ikkje heilt — prøv igjen, eller les forklaringa under."));
    if (explanation) {
      const ex = el("div", { class: "explanation", html: "<strong>Forklaring:</strong> " + explanation });
      f.appendChild(ex);
    }
    return f;
  }

  function tag(text) { return el("div", { class: "ex-tag" }, text); }

  /* ---------- Multiple choice ---------- */
  function renderMultipleChoice(s, modId) {
    const root = el("div", { class: "exercise multiplechoice" });
    root.appendChild(tag("Fleirvalg"));
    root.appendChild(el("div", { class: "question", html: s.question }));
    if (s.hint) root.appendChild(el("div", { class: "hint" }, s.hint));

    const choices = el("div", { class: "choices" });
    const inputs = [];
    s.options.forEach((opt, i) => {
      const id = `c-${s.id}-${i}`;
      const input = el("input", { type: "radio", name: `q-${s.id}`, id, value: i });
      inputs.push(input);
      const label = el("label", { class: "choice", for: id }, [input, el("span", { html: opt })]);
      input.addEventListener("change", () => {
        choices.querySelectorAll(".choice").forEach(c => c.classList.remove("selected"));
        label.classList.add("selected");
      });
      choices.appendChild(label);
    });
    root.appendChild(choices);

    // Restore previous answer
    const savedMC = Store.getModule(modId).sections[s.id];
    if (savedMC && typeof savedMC.answer === "number" && inputs[savedMC.answer]) {
      inputs[savedMC.answer].checked = true;
      choices.children[savedMC.answer].classList.add("selected");
    }

    const btns = el("div", { class: "btn-row" });
    const check = el("button", { class: "btn" }, "Sjekk svar");
    btns.appendChild(check);
    root.appendChild(btns);

    const fbHolder = el("div");
    root.appendChild(fbHolder);

    check.addEventListener("click", () => {
      const idx = inputs.findIndex(i => i.checked);
      if (idx < 0) { alert("Vel eit svar først."); return; }
      const correct = idx === s.correct;
      choices.querySelectorAll(".choice").forEach(c => c.classList.remove("right", "wrong"));
      choices.children[idx].classList.add(correct ? "right" : "wrong");
      if (!correct) choices.children[s.correct].classList.add("right");
      fbHolder.innerHTML = "";
      fbHolder.appendChild(feedbackEl(correct, s.explanation));
      Store.recordAnswer(modId, s.id, { correct, answer: idx });
      document.dispatchEvent(new CustomEvent("exercise-answered"));
    });

    return root;
  }

  /* ---------- Fill-in ---------- */
  function renderFillIn(s, modId) {
    const root = el("div", { class: "exercise fillin" });
    root.appendChild(tag("Fyll inn"));
    if (s.question) root.appendChild(el("div", { class: "question", html: s.question }));
    if (s.hint) root.appendChild(el("div", { class: "hint" }, s.hint));

    const items = s.items; // [{prompt: "Eg ___ heim", accept: ["går"]}]
    const inputs = [];

    items.forEach((it, i) => {
      const row = el("div", { class: "fillin-row" });
      const parts = it.prompt.split("___");
      parts.forEach((p, j) => {
        if (p) row.appendChild(document.createTextNode(p));
        if (j < parts.length - 1) {
          const input = el("input", { type: "text", autocomplete: "off", spellcheck: "false" });
          inputs.push({ input, accept: it.accept });
          row.appendChild(input);
        }
      });
      root.appendChild(row);
    });

    // Restore previous answers
    const savedFI = Store.getModule(modId).sections[s.id];
    if (savedFI && Array.isArray(savedFI.answer)) {
      inputs.forEach((obj, i) => {
        if (savedFI.answer[i] != null) obj.input.value = savedFI.answer[i];
      });
    }

    const btns = el("div", { class: "btn-row" });
    const check = el("button", { class: "btn" }, "Sjekk svar");
    btns.appendChild(check);
    root.appendChild(btns);

    const fbHolder = el("div");
    root.appendChild(fbHolder);

    check.addEventListener("click", () => {
      let allRight = true;
      const answers = [];
      inputs.forEach(({ input, accept }) => {
        const ok = eqAny(input.value, accept);
        input.classList.toggle("right", ok);
        input.classList.toggle("wrong", !ok);
        if (!ok) allRight = false;
        answers.push(input.value);
      });
      fbHolder.innerHTML = "";
      fbHolder.appendChild(feedbackEl(allRight, s.explanation || (allRight ? "" : "Sjå rettferda variant i forklaringa eller prøv igjen.")));
      Store.recordAnswer(modId, s.id, { correct: allRight, answer: answers });
      document.dispatchEvent(new CustomEvent("exercise-answered"));
    });

    return root;
  }

  /* ---------- Translate (bokmål → nynorsk) ---------- */
  function renderTranslate(s, modId) {
    const root = el("div", { class: "exercise translate" });
    root.appendChild(tag("Omsetjing til nynorsk"));
    if (s.question) root.appendChild(el("div", { class: "question", html: s.question }));
    root.appendChild(el("div", { class: "callout" }, [
      el("strong", {}, "Bokmål: "),
      document.createTextNode(s.source),
    ]));
    if (s.hint) root.appendChild(el("div", { class: "hint" }, s.hint));

    const ta = el("textarea", { rows: 2, placeholder: "Skriv setninga på nynorsk …", autocomplete: "off", spellcheck: "false" });
    root.appendChild(ta);

    // Restore previous answer
    const savedT = Store.getModule(modId).sections[s.id];
    if (savedT && typeof savedT.answer === "string") ta.value = savedT.answer;

    const btns = el("div", { class: "btn-row" });
    const check = el("button", { class: "btn" }, "Sjekk svar");
    const show = el("button", { class: "btn secondary" }, "Vis eit godkjent svar");
    btns.append(check, show);
    root.appendChild(btns);

    const fbHolder = el("div");
    root.appendChild(fbHolder);

    check.addEventListener("click", () => {
      const ok = eqAny(ta.value, s.accept);
      ta.classList.toggle("right", ok);
      ta.classList.toggle("wrong", !ok);
      fbHolder.innerHTML = "";
      const explain = s.explanation || (ok
        ? "Godkjent svar."
        : `Eit godkjent svar er: <em class="nn">${s.accept[0]}</em>. Andre variantar kan også vere rette.`);
      fbHolder.appendChild(feedbackEl(ok, explain));
      Store.recordAnswer(modId, s.id, { correct: ok, answer: ta.value });
      document.dispatchEvent(new CustomEvent("exercise-answered"));
    });

    show.addEventListener("click", () => {
      fbHolder.innerHTML = "";
      const div = el("div", { class: "feedback right" });
      div.innerHTML = `<strong>Eit godkjent svar:</strong> <em class="nn">${s.accept[0]}</em>`;
      fbHolder.appendChild(div);
    });

    return root;
  }

  /* ---------- Matching (left ↔ right) ---------- */
  function renderMatching(s, modId) {
    const root = el("div", { class: "exercise" });
    root.appendChild(tag("Para saman"));
    if (s.question) root.appendChild(el("div", { class: "question", html: s.question }));
    if (s.hint) root.appendChild(el("div", { class: "hint" }, s.hint));

    // pairs: [[left, right]]
    const lefts = s.pairs.map(p => p[0]);
    const rights = s.pairs.map(p => p[1]);

    const pool = el("div", { class: "pool" });
    const targets = el("div", { class: "targets" });

    let selected = null; // {kind: "pool"|"target", node, value}
    let dragged = null;  // {node, kind, value}

    function attachDrag(node, kind) {
      node.draggable = true;
      node.addEventListener("dragstart", e => {
        dragged = { node, kind, value: node.textContent };
        node.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
        try { e.dataTransfer.setData("text/plain", node.textContent); } catch (err) {}
      });
      node.addEventListener("dragend", () => {
        node.classList.remove("dragging");
        dragged = null;
      });
    }

    function makeChip(val) {
      const chip = el("div", { class: "placed", tabindex: "0" }, val);
      chip.addEventListener("click", e => { e.stopPropagation(); selectItem(chip, "target", chip.textContent); });
      attachDrag(chip, "target");
      return chip;
    }

    function makePoolItem(val) {
      const it = el("div", { class: "match-item", tabindex: "0" }, val);
      it.addEventListener("click", () => selectItem(it, "pool", val));
      it.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); it.click(); } });
      attachDrag(it, "pool");
      return it;
    }

    function dropOntoTarget(target, value, sourceNode, sourceKind) {
      // If target already has chip, send it back to pool
      const existing = target.querySelector(".placed");
      if (existing) {
        pool.appendChild(makePoolItem(existing.textContent));
        existing.remove();
      }
      const slot = target.querySelector(".slot");
      slot.innerHTML = "";
      slot.appendChild(makeChip(value));
      target.classList.add("filled");
      target.classList.remove("right", "wrong");
      if (sourceNode) {
        const fromTarget = sourceNode.closest && sourceNode.closest(".match-target");
        sourceNode.remove();
        if (fromTarget && fromTarget !== target && !fromTarget.querySelector(".placed")) {
          fromTarget.classList.remove("filled");
        }
      }
    }

    function selectItem(node, kind, value) {
      if (selected && selected.node === node) {
        node.style.outline = "";
        selected = null;
        return;
      }
      // Clear previous selection
      root.querySelectorAll(".match-item, .match-target .placed").forEach(n => n.style.outline = "");
      node.style.outline = "2px solid var(--accent)";
      selected = { kind, node, value };
    }

    // Shuffle right values for pool
    const shuffled = rights.slice().sort(() => Math.random() - 0.5);
    shuffled.forEach(r => pool.appendChild(makePoolItem(r)));

    lefts.forEach((leftVal, i) => {
      const t = el("div", { class: "match-target" });
      t.dataset.left = leftVal;
      t.dataset.correctRight = rights[i];
      t.appendChild(el("div", { class: "label" }, leftVal));
      t.appendChild(el("div", { class: "slot" }));
      t.addEventListener("click", () => {
        if (!selected) {
          // Maybe user wants to pick the placed item back
          const placed = t.querySelector(".placed");
          if (placed) selectItem(placed, "target", placed.textContent);
          return;
        }
        if (selected.kind === "pool") {
          // If target already has one, return it to pool first
          const existing = t.querySelector(".placed");
          if (existing) {
            pool.appendChild(makePoolItem(existing.textContent));
            existing.remove();
          }
          const slot = t.querySelector(".slot");
          slot.innerHTML = "";
          const chip = el("div", { class: "placed", tabindex: "0" }, selected.value);
          chip.addEventListener("click", e => { e.stopPropagation(); selectItem(chip, "target", chip.textContent); });
          slot.appendChild(chip);
          t.classList.add("filled");
          selected.node.remove();
          selected = null;
        } else if (selected.kind === "target") {
          // Move between targets
          const fromTarget = selected.node.closest(".match-target");
          const existing = t.querySelector(".placed");
          if (existing) {
            // swap
            const tmp = existing.textContent;
            existing.textContent = selected.value;
            selected.node.textContent = tmp;
          } else {
            const slot = t.querySelector(".slot");
            const chip = el("div", { class: "placed", tabindex: "0" }, selected.value);
            chip.addEventListener("click", e => { e.stopPropagation(); selectItem(chip, "target", chip.textContent); });
            slot.appendChild(chip);
            t.classList.add("filled");
            selected.node.remove();
            if (fromTarget && !fromTarget.querySelector(".placed")) fromTarget.classList.remove("filled");
          }
          selected = null;
          root.querySelectorAll(".match-item, .match-target .placed").forEach(n => n.style.outline = "");
        }
      });
      // Drag-and-drop on the target
      t.addEventListener("dragover", e => {
        if (!dragged) return;
        e.preventDefault();
        t.classList.add("over");
      });
      t.addEventListener("dragleave", () => t.classList.remove("over"));
      t.addEventListener("drop", e => {
        e.preventDefault();
        t.classList.remove("over");
        if (!dragged) return;
        dropOntoTarget(t, dragged.value, dragged.node, dragged.kind);
      });
      targets.appendChild(t);
    });

    // Pool is a drop zone too — drag a placed chip back to release it
    pool.addEventListener("dragover", e => {
      if (!dragged || dragged.kind !== "target") return;
      e.preventDefault();
      pool.classList.add("over");
    });
    pool.addEventListener("dragleave", () => pool.classList.remove("over"));
    pool.addEventListener("drop", e => {
      e.preventDefault();
      pool.classList.remove("over");
      if (!dragged || dragged.kind !== "target") return;
      const fromTarget = dragged.node.closest(".match-target");
      pool.appendChild(makePoolItem(dragged.value));
      dragged.node.remove();
      if (fromTarget && !fromTarget.querySelector(".placed")) fromTarget.classList.remove("filled");
    });

    const grid = el("div", { class: "matching" }, [pool, targets]);
    root.appendChild(grid);

    // Restore previous placements
    const savedM = Store.getModule(modId).sections[s.id];
    if (savedM && savedM.answer && typeof savedM.answer === "object") {
      Object.entries(savedM.answer).forEach(([leftVal, rightVal]) => {
        if (!rightVal) return;
        const target = Array.from(targets.children).find(t => t.dataset.left === leftVal);
        if (!target) return;
        const poolItem = Array.from(pool.children).find(c => c.textContent === rightVal);
        if (!poolItem) return;
        const slot = target.querySelector(".slot");
        slot.appendChild(makeChip(rightVal));
        target.classList.add("filled");
        poolItem.remove();
      });
    }

    const btns = el("div", { class: "btn-row" });
    const check = el("button", { class: "btn" }, "Sjekk svar");
    btns.appendChild(check);
    root.appendChild(btns);

    const fbHolder = el("div");
    root.appendChild(fbHolder);

    check.addEventListener("click", () => {
      let right = 0;
      let total = lefts.length;
      const answers = {};
      targets.querySelectorAll(".match-target").forEach(t => {
        const placed = t.querySelector(".placed");
        const val = placed ? placed.textContent : null;
        answers[t.dataset.left] = val;
        const ok = val && normalize(val) === normalize(t.dataset.correctRight);
        t.classList.toggle("right", !!ok);
        t.classList.toggle("wrong", !ok);
        if (ok) right++;
      });
      const allRight = right === total;
      fbHolder.innerHTML = "";
      fbHolder.appendChild(feedbackEl(allRight, allRight ? s.explanation : `${right} av ${total} rett. ${s.explanation || ""}`));
      Store.recordAnswer(modId, s.id, { correct: allRight, answer: answers });
      document.dispatchEvent(new CustomEvent("exercise-answered"));
    });

    return root;
  }

  /* ---------- Categorize (drop into multiple buckets) ---------- */
  function renderCategorize(s, modId) {
    const root = el("div", { class: "exercise categorize" });
    root.appendChild(tag("Sorter"));
    if (s.question) root.appendChild(el("div", { class: "question", html: s.question }));
    if (s.hint) root.appendChild(el("div", { class: "hint" }, s.hint));

    // categories: { name: [items] }
    const categories = Object.keys(s.categories);
    const correctMap = {};
    categories.forEach(cat => {
      s.categories[cat].forEach(item => { correctMap[item] = cat; });
    });

    const allItems = Object.keys(correctMap);
    const shuffled = allItems.slice().sort(() => Math.random() - 0.5);

    const pool = el("div", { class: "pool" });
    let selectedItem = null;
    let draggedItem = null;

    function makeItem(val) {
      const it = el("div", { class: "pool-item", tabindex: "0" }, val);
      it.addEventListener("click", () => {
        if (selectedItem === it) {
          it.style.outline = "";
          selectedItem = null;
        } else {
          if (selectedItem) selectedItem.style.outline = "";
          it.style.outline = "2px solid var(--accent)";
          selectedItem = it;
        }
      });
      it.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); it.click(); } });
      it.draggable = true;
      it.addEventListener("dragstart", e => {
        draggedItem = it;
        it.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
        try { e.dataTransfer.setData("text/plain", val); } catch (err) {}
      });
      it.addEventListener("dragend", () => {
        it.classList.remove("dragging");
        draggedItem = null;
      });
      return it;
    }

    shuffled.forEach(v => pool.appendChild(makeItem(v)));

    const buckets = el("div", { class: "buckets" });
    categories.forEach(cat => {
      const b = el("div", { class: "bucket" });
      b.dataset.category = cat;
      b.appendChild(el("h4", {}, cat));
      b.addEventListener("click", () => {
        if (!selectedItem) {
          // tap on an item already in bucket to pull it back to pool
          return;
        }
        b.appendChild(selectedItem);
        selectedItem.style.outline = "";
        selectedItem.classList.remove("right", "wrong");
        selectedItem = null;
      });
      b.addEventListener("dragover", e => {
        if (!draggedItem) return;
        e.preventDefault();
        b.classList.add("over");
      });
      b.addEventListener("dragleave", () => b.classList.remove("over"));
      b.addEventListener("drop", e => {
        e.preventDefault();
        b.classList.remove("over");
        if (!draggedItem) return;
        b.appendChild(draggedItem);
        draggedItem.style.outline = "";
        draggedItem.classList.remove("right", "wrong");
      });
      buckets.appendChild(b);
    });

    // Drop on pool to send an item back
    pool.addEventListener("dragover", e => {
      if (!draggedItem) return;
      e.preventDefault();
      pool.classList.add("over");
    });
    pool.addEventListener("dragleave", () => pool.classList.remove("over"));
    pool.addEventListener("drop", e => {
      e.preventDefault();
      pool.classList.remove("over");
      if (!draggedItem) return;
      pool.appendChild(draggedItem);
      draggedItem.style.outline = "";
      draggedItem.classList.remove("right", "wrong");
    });

    // Click on an item already in a bucket to send back to pool
    root.addEventListener("click", e => {
      if (e.target.classList.contains("pool-item")) {
        const inBucket = e.target.closest(".bucket");
        if (inBucket && selectedItem !== e.target) {
          // First click selects; second click on pool returns it
        }
      }
    });

    // Provide "send to pool" by double-click
    function attachReturn(it) {
      it.addEventListener("dblclick", () => {
        pool.appendChild(it);
        it.style.outline = "";
        it.classList.remove("right", "wrong");
      });
    }
    Array.from(pool.children).forEach(attachReturn);
    // Observe new items added later
    const obs = new MutationObserver(muts => {
      muts.forEach(m => m.addedNodes.forEach(n => {
        if (n.classList && n.classList.contains("pool-item")) attachReturn(n);
      }));
    });
    obs.observe(buckets, { childList: true, subtree: true });
    obs.observe(pool, { childList: true });

    root.appendChild(el("div", { class: "hint" }, "Dra eit ord til riktig kategori, eller klikk det og deretter kategorien. Dobbeltklikk eller dra attende til samlinga for å fjerne det."));
    root.appendChild(pool);
    root.appendChild(buckets);

    // Restore previous placements
    const savedC = Store.getModule(modId).sections[s.id];
    if (savedC && savedC.answer && typeof savedC.answer === "object") {
      Object.entries(savedC.answer).forEach(([item, cat]) => {
        const it = Array.from(pool.children).find(c => c.textContent === item);
        const bucket = Array.from(buckets.children).find(b => b.dataset.category === cat);
        if (it && bucket) bucket.appendChild(it);
      });
    }

    const btns = el("div", { class: "btn-row" });
    const check = el("button", { class: "btn" }, "Sjekk svar");
    btns.appendChild(check);
    root.appendChild(btns);

    const fbHolder = el("div");
    root.appendChild(fbHolder);

    check.addEventListener("click", () => {
      let right = 0;
      const placed = {};
      buckets.querySelectorAll(".bucket").forEach(b => {
        const cat = b.dataset.category;
        b.querySelectorAll(".pool-item").forEach(it => {
          const val = it.textContent;
          placed[val] = cat;
          const ok = correctMap[val] === cat;
          it.classList.toggle("right", ok);
          it.classList.toggle("wrong", !ok);
          if (ok) right++;
        });
      });
      // items still in pool count as not placed
      pool.querySelectorAll(".pool-item").forEach(it => {
        it.classList.add("wrong");
        it.classList.remove("right");
      });
      const allRight = right === allItems.length;
      fbHolder.innerHTML = "";
      fbHolder.appendChild(feedbackEl(allRight, allRight ? s.explanation : `${right} av ${allItems.length} rett plasserte. ${s.explanation || ""}`));
      Store.recordAnswer(modId, s.id, { correct: allRight, answer: placed });
      document.dispatchEvent(new CustomEvent("exercise-answered"));
    });

    return root;
  }

  /* ---------- Free text ---------- */
  function renderFreeText(s, modId) {
    const root = el("div", { class: "exercise freetext" });
    root.appendChild(tag("Skriv din eigen tekst"));
    if (s.question) root.appendChild(el("div", { class: "question", html: s.question }));
    if (s.hint) root.appendChild(el("div", { class: "hint" }, s.hint));

    if (s.checklist) {
      const cl = el("div", { class: "checklist" });
      cl.appendChild(el("h4", {}, "Tenk på dette mens du skriv:"));
      const ul = el("ul");
      s.checklist.forEach(item => ul.appendChild(el("li", {}, item)));
      cl.appendChild(ul);
      root.appendChild(cl);
    }

    const existing = Store.getText(modId, s.id);
    const ta = el("textarea", {
      placeholder: "Skriv her … alt blir lagra automatisk.",
      spellcheck: "false",
      class: "no-print",
    });
    ta.value = (existing && existing.value) || "";
    root.appendChild(ta);

    // Ruled writing lines that only appear in print
    const printLines = el("div", { class: "print-only-lines", "aria-hidden": "true" });
    const lineCount = s.minWords ? Math.max(12, Math.ceil(s.minWords / 8)) : 14;
    for (let i = 0; i < lineCount; i++) printLines.appendChild(el("div", { class: "rule" }));
    root.appendChild(printLines);

    const meta = el("div", { class: "meta" });
    const wc = el("span");
    const saved = el("span");
    meta.append(wc, saved);
    root.appendChild(meta);

    function updateWordCount() {
      const words = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0;
      const min = s.minWords ? ` (mål: minst ${s.minWords})` : "";
      wc.textContent = `${words} ord${min}`;
    }
    updateWordCount();

    let saveTimer = null;
    ta.addEventListener("input", () => {
      updateWordCount();
      if (saveTimer) clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        Store.saveText(modId, s.id, ta.value);
        saved.textContent = "Lagra " + new Date().toLocaleTimeString("nn-NO", { hour: "2-digit", minute: "2-digit" });
        saved.className = "saved-flash";
        document.dispatchEvent(new CustomEvent("exercise-answered"));
      }, 500);
    });

    const btns = el("div", { class: "btn-row" });
    const downloadBtn = el("button", { class: "btn secondary small" }, "Last ned som .txt");
    downloadBtn.addEventListener("click", () => {
      const blob = new Blob([ta.value], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${modId}-${s.id}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
    btns.appendChild(downloadBtn);
    root.appendChild(btns);

    return root;
  }

  /* ---------- Reading (passage + sub-questions) ---------- */
  function renderReading(s, modId) {
    const root = el("div", { class: "exercise reading" });
    root.appendChild(tag("Les og svar"));
    if (s.title) root.appendChild(el("div", { class: "question" }, s.title));

    const passage = el("div", { class: "passage", html: s.passage });
    root.appendChild(passage);

    // sub-questions: array of {type, ...} where type is multipleChoice or freeShort
    const inputs = [];
    s.questions.forEach((q, i) => {
      const wrap = el("div", { class: "sub-q" });
      wrap.appendChild(el("div", { class: "question", html: `${i + 1}. ${q.question}` }));
      if (q.type === "multipleChoice") {
        const choices = el("div", { class: "choices" });
        const radios = [];
        q.options.forEach((opt, j) => {
          const id = `rq-${s.id}-${i}-${j}`;
          const input = el("input", { type: "radio", name: `rq-${s.id}-${i}`, id, value: j });
          radios.push(input);
          const label = el("label", { class: "choice", for: id }, [input, el("span", { html: opt })]);
          input.addEventListener("change", () => {
            choices.querySelectorAll(".choice").forEach(c => c.classList.remove("selected"));
            label.classList.add("selected");
          });
          choices.appendChild(label);
        });
        wrap.appendChild(choices);
        inputs.push({ q, radios, type: "mc", choices });
      } else if (q.type === "freeShort") {
        const ta = el("textarea", { rows: 3, placeholder: "Svar med eigne ord …", spellcheck: "false" });
        wrap.appendChild(ta);
        if (q.modelAnswer) {
          const showBtn = el("button", { class: "btn secondary small" }, "Vis døme på svar");
          const md = el("div", { class: "callout", style: "display:none;margin-top:8px" });
          md.innerHTML = "<strong>Døme på svar:</strong> " + q.modelAnswer;
          showBtn.addEventListener("click", () => {
            md.style.display = md.style.display === "none" ? "block" : "none";
          });
          wrap.appendChild(el("div", { class: "btn-row" }, showBtn));
          wrap.appendChild(md);
        }
        inputs.push({ q, ta, type: "free" });
      }
      root.appendChild(wrap);
    });

    // Restore previous answers
    const savedR = Store.getModule(modId).sections[s.id];
    if (savedR && Array.isArray(savedR.answer)) {
      inputs.forEach((item, i) => {
        const a = savedR.answer[i];
        if (a == null) return;
        if (item.type === "mc" && typeof a === "number" && item.radios[a]) {
          item.radios[a].checked = true;
          item.choices.children[a].classList.add("selected");
        } else if (item.type === "free" && typeof a === "string") {
          item.ta.value = a;
        }
      });
    }

    const btns = el("div", { class: "btn-row" });
    const check = el("button", { class: "btn" }, "Sjekk svara");
    btns.appendChild(check);
    root.appendChild(btns);

    const fbHolder = el("div");
    root.appendChild(fbHolder);

    check.addEventListener("click", () => {
      let allRight = true;
      const answers = [];
      let gradable = 0;
      let right = 0;
      inputs.forEach(item => {
        if (item.type === "mc") {
          gradable++;
          const idx = item.radios.findIndex(r => r.checked);
          answers.push(idx);
          const ok = idx === item.q.correct;
          item.choices.querySelectorAll(".choice").forEach(c => c.classList.remove("right", "wrong"));
          if (idx >= 0) item.choices.children[idx].classList.add(ok ? "right" : "wrong");
          if (!ok) item.choices.children[item.q.correct].classList.add("right");
          if (ok) right++; else allRight = false;
        } else {
          answers.push(item.ta.value);
          // free-form not auto-graded; counts as done if non-empty
          if (!item.ta.value.trim()) allRight = false;
        }
      });
      const summary = gradable > 0
        ? `${right} av ${gradable} fleirvalg rett.${inputs.some(i => i.type === "free") ? " Friskriftssvara må du vurdere sjølv eller saman med lærar." : ""}`
        : "Svara dine er lagra. Samanlikn med dømesvara om du vil.";
      fbHolder.innerHTML = "";
      fbHolder.appendChild(feedbackEl(allRight, s.explanation || summary));
      Store.recordAnswer(modId, s.id, { correct: allRight, answer: answers });
      document.dispatchEvent(new CustomEvent("exercise-answered"));
    });

    return root;
  }

  /* ---------- Dispatcher ---------- */
  function render(section, modId) {
    if (section.type === "lesson") {
      const root = el("div", { class: "lesson-body", html: section.content });
      return root;
    }
    if (section.type === "reading") return renderReading(section, modId);
    const map = {
      multipleChoice: renderMultipleChoice,
      fillIn: renderFillIn,
      translate: renderTranslate,
      matching: renderMatching,
      categorize: renderCategorize,
      freeText: renderFreeText,
    };
    const fn = map[section.exerciseType];
    if (!fn) {
      return el("div", {}, "Ukjent oppgåvetype: " + section.exerciseType);
    }
    return fn(section, modId);
  }

  return { render };
})();
