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
    f.appendChild(el("div", {}, isRight ? "Rett!" : "Ikkje heilt. Prøv igjen, eller les forklaringa under."));
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

    // Pool is a drop zone too: drag a placed chip back to release it
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
    // Markeringslaget ligg bak skrivefeltet og viser kva ord språksjekken står på
    const taWrap = el("div", { class: "ta-wrap no-print" });
    const overlay = el("div", { class: "ta-overlay", "aria-hidden": "true" });
    taWrap.append(overlay, ta);
    root.appendChild(taWrap);

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
    const spell = spellChecker(ta, overlay);
    btns.appendChild(spell.btn);
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
    root.appendChild(spell.panel);

    return root;
  }

  /* ---------- Språksjekk under skrivefeltet ----------
     Sjekken går på ein knapp, ikkje mens eleven skriv: raude strekar under
     halvskrivne ord stoppar skrivinga meir enn dei hjelper. Sjå js/spell.js.

     Panelet viser eitt funn om gongen, og ordet blir markert i teksten. Ein
     lang tekst kan gi tjue funn, og alle på ein gong er meir enn ein elev
     orkar å ta inn. Markeringa ligg i eit lag bak skrivefeltet, som har same
     skrift og same innrykk, slik at orda hamnar oppå kvarandre. */

  function spellChecker(ta, overlay) {
    const panel = el("div", { class: "spellcheck no-print", hidden: "" });
    if (typeof Spell === "undefined") {
      return { btn: document.createDocumentFragment(), panel };
    }

    // Ordlista blir henta med ein gong modulen er open, så ho er klar til bruk.
    Spell.load().catch(() => {});

    let funn = [];
    let noverande = 0;
    let sjekkaTekst = "";

    function visMarkering() {
      overlay.textContent = "";
      const f = funn[noverande];
      if (!f || ta.value !== sjekkaTekst) return;
      const tekst = ta.value;
      overlay.appendChild(document.createTextNode(tekst.slice(0, f.start)));
      const merke = el("mark", {}, tekst.slice(f.start, f.end));
      overlay.appendChild(merke);
      overlay.appendChild(document.createTextNode(tekst.slice(f.end)));
      // Rull skrivefeltet slik at det markerte ordet er synleg
      const midt = merke.offsetTop - ta.clientHeight / 2 + merke.offsetHeight / 2;
      ta.scrollTop = Math.max(0, midt);
      overlay.scrollTop = ta.scrollTop;
    }

    function tomPanel() {
      funn = [];
      overlay.textContent = "";
    }

    ta.addEventListener("scroll", () => { overlay.scrollTop = ta.scrollTop; });
    ta.addEventListener("input", () => {
      if (!funn.length) return;
      // Teksten er endra, så plasseringane stemmer ikkje lenger
      tomPanel();
      panel.innerHTML = "";
      panel.appendChild(el("p", { class: "muted" }, "Du har endra teksten. Trykk «Sjekk språket» igjen."));
    });

    const btn = el("button", { class: "btn secondary small" }, "Sjekk språket");
    btn.addEventListener("click", () => {
      const tekst = ta.value.trim();
      panel.hidden = false;
      tomPanel();
      if (!tekst) {
        panel.innerHTML = "";
        panel.appendChild(el("p", { class: "muted" }, "Skriv litt tekst først."));
        return;
      }
      panel.innerHTML = "";
      panel.appendChild(el("p", { class: "muted" }, "Sjekkar …"));
      btn.disabled = true;
      Spell.load()
        .catch(() => null)
        .then(() => {
          btn.disabled = false;
          const resultat = Spell.check(ta.value);
          funn = resultat.findings;
          noverande = 0;
          sjekkaTekst = ta.value;
          visFunn(panel, resultat, funn, () => noverande, i => { noverande = i; }, visMarkering);
        });
    });

    return { btn, panel };
  }

  const OVERSKRIFT = {
    bokmal: "Ser ut som bokmål",
    ukjent: "Ord eg ikkje kjenner att",
  };

  // Tegnar heile panelet på nytt for det funnet eleven står på.
  function visFunn(panel, resultat, funn, hentIndeks, settIndeks, visMarkering) {
    panel.innerHTML = "";

    if (!funn.length) {
      panel.appendChild(el("p", { class: "spell-ok" }, resultat.checkedList
        ? "Ingen bokmålsord eller skrivefeil funne. Hugs at sjekken ikkje ser alt."
        : "Ingen bokmålsord funne. Ordlista er ikkje lasta, så skrivefeil er ikkje sjekka."));
      visMarkering();
      return;
    }

    const i = hentIndeks();
    const f = funn[i];

    const topp = el("div", { class: "spell-nav" });
    topp.appendChild(el("span", { class: "spell-head " + (f.type === "bokmal" ? "bm" : "unknown") }, OVERSKRIFT[f.type]));
    const knappar = el("div", { class: "spell-steps" });
    const teljar = el("span", { class: "spell-count" }, `${i + 1} av ${funn.length}`);
    const forrige = el("button", { class: "btn secondary small" }, "‹ Førre");
    const neste = el("button", { class: "btn secondary small" }, "Neste ›");
    forrige.disabled = i === 0;
    neste.disabled = i === funn.length - 1;
    const gaTil = ny => {
      settIndeks(ny);
      visFunn(panel, resultat, funn, hentIndeks, settIndeks, visMarkering);
    };
    forrige.addEventListener("click", () => gaTil(i - 1));
    neste.addEventListener("click", () => gaTil(i + 1));
    knappar.append(teljar, forrige, neste);
    topp.appendChild(knappar);
    panel.appendChild(topp);

    panel.appendChild(el("div", { class: "spell-line" }, [el("span", { class: "spell-word" }, f.word)]));
    if (f.why) panel.appendChild(el("div", { class: "spell-why", html: f.why }));

    if (f.right.length) {
      const sugs = el("ul", { class: "spell-sug" });
      // Berre funnet på skjermen slår opp tydingar, så ein lang tekst ikkje
      // sender tjue oppslag på ein gong. Svara blir mellomlagra i js/ordbok.js.
      // Eit feilstava ord får forslag som er ulike ord, og då treng eleven
      // tydinga på kvart. Eit bokmålsord får bøyingsformer av det same ordet,
      // så der held det med den første.
      f.right.slice(0, 3).forEach((ord, n) => sugs.appendChild(forslagsRad(ord, n === 0 || f.type === "ukjent")));
      panel.appendChild(sugs);
    } else {
      panel.appendChild(el("p", { class: "muted" }, "Sjekken har ingen forslag til dette ordet."));
    }

    if (f.type === "bokmal" && typeof Ordbok !== "undefined") {
      const bmLenkje = el("a", { href: Ordbok.artikkelUrl(f.word, "bm"), target: "_blank", rel: "noopener" },
        `Kva tyder «${f.word}»? Slå opp i Bokmålsordboka`);
      Ordbok.lookup(f.word, "bm").then(treff => { if (treff) bmLenkje.href = treff.url; });
      panel.appendChild(el("div", { class: "spell-links" }, [bmLenkje]));
    }

    const bunn = el("p", { class: "muted spell-source" });
    if (!resultat.checkedList) {
      bunn.appendChild(document.createTextNode("Ordlista er ikkje lasta ned, så vanlege skrivefeil er ikkje sjekka denne gongen. "));
    }
    if (typeof Ordbok !== "undefined") {
      bunn.appendChild(document.createTextNode("Tydingane kjem frå "));
      bunn.appendChild(el("a", { href: "https://ordbokene.no/nno/nn", target: "_blank", rel: "noopener" }, "Nynorskordboka"));
      bunn.appendChild(document.createTextNode(". Du kan òg søkje i "));
      bunn.appendChild(el("a", { href: Ordbok.lexinUrl(), target: "_blank", rel: "noopener" }, "Lexin"));
      bunn.appendChild(document.createTextNode(". Sjekken er ei hjelp, ikkje ein fasit."));
    }
    panel.appendChild(bunn);

    visMarkering();
  }

  function forslagsRad(word, medTyding) {
    const li = el("li");
    if (typeof Ordbok === "undefined") {
      li.appendChild(el("strong", { class: "spell-sug-word" }, word));
      return li;
    }

    const lenkje = el("a", { class: "spell-sug-word", href: Ordbok.artikkelUrl(word), target: "_blank", rel: "noopener" }, word);
    li.appendChild(lenkje);
    const grunnform = el("span", { class: "spell-lemma" });
    li.appendChild(grunnform);
    const tyding = el("span", { class: "spell-def" }, medTyding ? " slår opp …" : "");
    li.appendChild(tyding);

    // Oppslaget gir grunnforma, og lenkja blir retta dit. Utan det hamnar
    // eleven på ei side som berre seier at lærarane er ei bøygd form av lærar.
    Ordbok.lookup(word).then(treff => {
      tyding.textContent = "";
      if (!treff) return;
      lenkje.href = treff.url;
      if (treff.lemma && treff.lemma !== word) {
        grunnform.textContent = " (oppslagsord: " + treff.lemma + ")";
      }
      if (!medTyding) return;
      if (treff.ordklasse) {
        tyding.appendChild(document.createTextNode(" "));
        tyding.appendChild(el("em", { class: "spell-pos" }, treff.ordklasse));
      }
      if (treff.tyding) {
        const kort = treff.tyding.length > 120 ? treff.tyding.slice(0, 117) + "…" : treff.tyding;
        tyding.appendChild(document.createTextNode(" " + kort));
      }
    });
    return li;
  }

  /* ---------- Reading (passage + sub-questions) ---------- */
  function renderReading(s, modId) {
    const root = el("div", { class: "exercise reading" });
    root.appendChild(tag("Les og svar"));
    // Tittelen står alt som overskrift over seksjonen (sjå headingEl i modul.js)

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
        ? `${right} av ${gradable} fleirval rett.${inputs.some(i => i.type === "free") ? " Friskriftssvara må du vurdere sjølv eller saman med lærar." : ""}`
        : "Svara dine er lagra. Samanlikn med dømesvara om du vil.";
      fbHolder.innerHTML = "";
      fbHolder.appendChild(feedbackEl(allRight, s.explanation || summary));
      Store.recordAnswer(modId, s.id, { correct: allRight, answer: answers });
      document.dispatchEvent(new CustomEvent("exercise-answered"));
    });

    return root;
  }

  /* ---------- Drill (mengdetrening) ---------- */
  function renderDrill(s, modId) {
    const root = el("div", { class: "exercise drill" });
    root.appendChild(tag("Mengdetrening"));
    if (s.intro) root.appendChild(el("div", { class: "question", html: s.intro }));
    if (s.hint) root.appendChild(el("div", { class: "hint" }, s.hint));

    let pool = [];
    try {
      pool = (typeof Drills !== "undefined") ? Drills.build(s) : [];
    } catch (e) {
      console.error("Drill-feil:", e);
    }
    if (!pool.length) {
      root.appendChild(el("div", { class: "feedback wrong" }, "Fann ingen oppgåver for denne treninga."));
      return root;
    }

    const perRound = Math.min(s.perRound || 10, pool.length);
    const recent = new Set(); // keys used in the previous full round (session only)
    const forceKind = s.mode === "type" ? "type" : (s.mode === "choice" ? "choice" : null);

    const status = el("div", { class: "drill-status no-print" });
    const stage = el("div", { class: "drill-stage no-print" });
    root.append(status, stage);

    function renderStatus() {
      const rec = Store.getModule(modId).sections[s.id];
      status.innerHTML = "";
      if (rec && rec.answer && rec.answer.best) {
        status.appendChild(el("span", { class: "drill-best" }, `Beste runde: ${rec.answer.best.right}/${rec.answer.best.total}`));
        status.appendChild(el("span", {}, `${rec.answer.rounds} ${rec.answer.rounds === 1 ? "runde" : "rundar"} fullført`));
      } else {
        status.appendChild(el("span", {}, `${pool.length} oppgåver i banken · ${perRound} per runde`));
      }
    }

    function showStart() {
      stage.innerHTML = "";
      const btn = el("button", { class: "btn" }, `Start runde (${perRound} oppgåver)`);
      btn.addEventListener("click", () => startRound(Drills.sample(pool, perRound, recent), false));
      stage.appendChild(el("div", { class: "drill-start" }, [
        el("p", {}, "Du får éi oppgåve om gongen. Skriv svaret og trykk Enter, eller vel eit alternativ. Etter runden kan du øve på det du bomma på."),
        el("div", { class: "btn-row" }, btn),
      ]));
    }

    function startRound(items, practice) {
      if (!practice) {
        recent.clear();
        items.forEach(it => recent.add(it.key));
      }
      showItem({ items, i: 0, right: 0, streak: 0, misses: [], practice });
    }

    function showItem(state) {
      const it = state.items[state.i];
      const p = Drills.present(it, forceKind);
      let phase = "answer";
      stage.innerHTML = "";

      const head = el("div", { class: "drill-head" }, [
        el("span", { class: "drill-count" }, `${state.i + 1} / ${state.items.length}`),
        el("span", { class: "drill-streak" }, state.streak >= 2 ? `${state.streak} på rad` : ""),
        el("span", { class: "drill-score" }, `${state.right} rett`),
      ]);
      const bar = el("div", { class: "drill-bar" }, el("span", { style: `width:${(state.i / state.items.length) * 100}%` }));
      const card = el("div", { class: "drill-card" });
      card.appendChild(el("div", { class: "drill-prompt" }, it.prompt));
      if (it.cue) card.appendChild(el("div", { class: "drill-cue" }, it.cue));

      let getAnswer, focusEl;
      const fb = el("div", { class: "drill-fb" });
      const check = el("button", { class: "btn" }, "Sjekk");
      const next = el("button", { class: "btn secondary", hidden: true }, state.i + 1 < state.items.length ? "Neste →" : "Sjå resultat");

      if (p.kind === "choice") {
        const choices = el("div", { class: "drill-choices" });
        let chosen = -1;
        p.options.forEach((opt, idx) => {
          const b = el("button", { type: "button", class: "drill-choice" }, [el("kbd", {}, String(idx + 1)), " ", opt]);
          b.addEventListener("click", () => {
            if (phase !== "answer") return;
            chosen = idx;
            choices.querySelectorAll(".drill-choice").forEach(c => c.classList.remove("selected"));
            b.classList.add("selected");
            doCheck();
          });
          choices.appendChild(b);
        });
        card.appendChild(choices);
        getAnswer = () => (chosen >= 0 ? p.options[chosen] : "");
        focusEl = choices.querySelector("button");
        check.hidden = true; // choosing checks immediately
      } else {
        const input = el("input", { type: "text", class: "drill-input", autocomplete: "off", autocapitalize: "off", spellcheck: "false", placeholder: "Skriv svaret …" });
        card.appendChild(input);
        getAnswer = () => input.value;
        focusEl = input;
      }

      function doCheck() {
        if (phase !== "answer") return;
        const ans = getAnswer();
        if (!ans.trim()) { if (focusEl) focusEl.focus(); return; }
        phase = "checked";
        const ok = Drills.isRight(it, ans);
        if (ok) { state.right++; state.streak++; }
        else { state.streak = 0; state.misses.push({ item: it, answer: ans }); }
        card.classList.add(ok ? "right" : "wrong");
        if (p.kind === "choice") {
          card.querySelectorAll(".drill-choice").forEach((b, idx) => {
            b.disabled = true;
            if (idx === p.correct) b.classList.add("right");
            else if (b.classList.contains("selected")) b.classList.add("wrong");
          });
        } else {
          focusEl.classList.add(ok ? "right" : "wrong");
          focusEl.readOnly = true;
        }
        fb.innerHTML = "";
        const verdict = el("div", { class: "drill-verdict" }, ok ? "Rett!" : "Rett svar: ");
        if (!ok) verdict.appendChild(el("em", { class: "nn" }, it.accept[0]));
        fb.appendChild(verdict);
        if (it.why) fb.appendChild(el("div", { class: "explanation", html: it.why }));
        check.hidden = true;
        next.hidden = false;
        next.focus();
      }
      function doNext() {
        state.i++;
        if (state.i >= state.items.length) finish(state); else showItem(state);
      }
      check.addEventListener("click", doCheck);
      next.addEventListener("click", doNext);
      card.addEventListener("keydown", e => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (phase === "answer") doCheck(); else doNext();
        } else if (p.kind === "choice" && phase === "answer" && /^[1-4]$/.test(e.key)) {
          const b = card.querySelectorAll(".drill-choice")[Number(e.key) - 1];
          if (b) b.click();
        }
      });
      card.append(el("div", { class: "btn-row" }, [check, next]), fb);
      stage.append(head, bar, card);
      if (focusEl) focusEl.focus();
    }

    function finish(state) {
      const total = state.items.length;
      if (!state.practice) {
        const rec = Store.getModule(modId).sections[s.id];
        const prev = (rec && rec.answer && typeof rec.answer === "object") ? rec.answer : {};
        const better = !prev.best || (state.right / total) > (prev.best.right / prev.best.total);
        const best = better ? { right: state.right, total } : prev.best;
        const answer = {
          rounds: (prev.rounds || 0) + 1,
          best,
          last: { right: state.right, total },
          totalRight: (prev.totalRight || 0) + state.right,
          totalItems: (prev.totalItems || 0) + total,
        };
        Store.recordAnswer(modId, s.id, { correct: best.right / best.total >= 0.8, answer });
        document.dispatchEvent(new CustomEvent("exercise-answered"));
        renderStatus();
      }
      stage.innerHTML = "";
      const pct = Math.round((state.right / total) * 100);
      const sum = el("div", { class: "drill-summary" });
      sum.appendChild(el("div", { class: "drill-result" }, `${state.right} av ${total} rett`));
      sum.appendChild(el("div", { class: "drill-sub" },
        pct === 100 ? "Feilfritt! Ta ei ny runde med nye ord."
          : pct >= 80 ? "Bra jobba! Ta ei ny runde, eller øv på det du bomma på."
          : "Øv på feila dine først, og ta så ei ny runde."));
      if (state.misses.length) {
        const ul = el("ul", { class: "drill-misses" });
        state.misses.forEach(m => ul.appendChild(el("li", {}, [
          el("span", { class: "drill-q" }, m.item.prompt + ": "),
          el("span", { class: "drill-wrong" }, m.answer),
          " → ",
          el("em", { class: "nn" }, m.item.accept[0]),
        ])));
        sum.appendChild(ul);
      }
      const row = el("div", { class: "btn-row" });
      const again = el("button", { class: "btn" }, "Ny runde");
      again.addEventListener("click", () => startRound(Drills.sample(pool, perRound, recent), false));
      row.appendChild(again);
      if (state.misses.length) {
        const prac = el("button", { class: "btn secondary" }, `Øv på feila (${state.misses.length})`);
        prac.addEventListener("click", () => startRound(Drills.shuffle(state.misses.map(m => m.item)), true));
        row.appendChild(prac);
      }
      const done = el("button", { class: "btn secondary" }, "Ferdig");
      done.addEventListener("click", showStart);
      row.appendChild(done);
      sum.appendChild(row);
      stage.appendChild(sum);
      again.focus();
    }

    // Print-only worksheet: a fixed sample with writing space
    const ws = el("div", { class: "drill-print print-only", "aria-hidden": "true" });
    const ol = el("ol");
    Drills.sample(pool, Math.min(20, pool.length), null).forEach(it => {
      ol.appendChild(el("li", {}, [`${it.prompt}${it.cue ? " " + it.cue : ""}: `, el("span", { class: "print-blank" })]));
    });
    ws.appendChild(ol);
    root.appendChild(ws);

    renderStatus();
    showStart();
    return root;
  }

  /* ---------- Find the error (finn feilen) ---------- */
  function tokenizeText(text) {
    const out = [];
    const re = /(\s+)|(\S+)/g;
    let m;
    while ((m = re.exec(text))) {
      if (m[1]) { out.push({ type: "ws", text: m[1] }); continue; }
      const mm = /^([«"“(\[]*)(.*?)([»"”)\].,;:!?…]*)$/.exec(m[2]);
      out.push({ type: "tok", pre: mm[1], core: mm[2], post: mm[3] });
    }
    return out;
  }

  // Map each declared error to a token position: first unused occurrence, or the nth occurrence.
  function resolveErrors(tokens, errors) {
    const used = new Set();
    const at = new Map();
    const unresolved = [];
    errors.forEach(err => {
      const all = tokens.map((t, i) => (t.type === "tok" && t.core === err.token ? i : -1)).filter(i => i >= 0);
      const pos = err.nth ? all[err.nth - 1] : all.find(i => !used.has(i));
      if (pos == null || used.has(pos)) { unresolved.push(err); return; }
      used.add(pos);
      at.set(pos, err);
    });
    return { at, unresolved };
  }

  function renderFindError(s, modId) {
    const root = el("div", { class: "exercise finderror" });
    root.appendChild(tag("Finn feilen"));
    if (s.question) root.appendChild(el("div", { class: "question", html: s.question }));
    if (s.hint) root.appendChild(el("div", { class: "hint" }, s.hint));

    const tokens = tokenizeText(s.text || "");
    const errors = s.errors || [];
    const { at: errAt, unresolved } = resolveErrors(tokens, errors);
    if (unresolved.length) console.warn("Finn feilen: fann ikkje ordet i teksten:", unresolved.map(e => e.token));

    const textEl = el("div", { class: "fe-text" });
    const fixes = el("div", { class: "fe-fixes no-print" });
    const picked = new Map(); // pos -> { btn, input, row }

    function refreshFixes() {
      fixes.innerHTML = "";
      Array.from(picked.keys()).sort((a, b) => a - b).forEach(pos => fixes.appendChild(picked.get(pos).row));
      fixes.hidden = picked.size === 0;
    }
    function resetMarks() {
      root.classList.remove("checked");
      tokens.forEach(t => t.btn && t.btn.classList.remove("right", "wrong", "partly", "missed"));
      picked.forEach(p => p.input.classList.remove("right", "wrong"));
    }
    function toggle(pos, btn, initialFix) {
      if (picked.has(pos)) {
        picked.get(pos).row.remove();
        picked.delete(pos);
        btn.classList.remove("picked");
        btn.setAttribute("aria-pressed", "false");
      } else {
        const input = el("input", { type: "text", autocomplete: "off", autocapitalize: "off", spellcheck: "false", placeholder: "Rett form" });
        if (initialFix) input.value = initialFix;
        const row = el("div", { class: "fe-fix-row" }, [el("span", { class: "fe-fix-word" }, tokens[pos].core), " → ", input]);
        picked.set(pos, { btn, input, row });
        btn.classList.add("picked");
        btn.setAttribute("aria-pressed", "true");
        if (!initialFix) setTimeout(() => input.focus(), 0);
      }
      refreshFixes();
    }

    tokens.forEach((t, pos) => {
      if (t.type === "ws") { textEl.appendChild(document.createTextNode(t.text)); return; }
      if (t.pre) textEl.appendChild(document.createTextNode(t.pre));
      if (t.core) {
        const btn = el("button", { type: "button", class: "fe-token", "aria-pressed": "false" }, t.core);
        btn.addEventListener("click", () => {
          if (root.classList.contains("checked")) resetMarks();
          toggle(pos, btn);
        });
        t.btn = btn;
        textEl.appendChild(btn);
      }
      if (t.post) textEl.appendChild(document.createTextNode(t.post));
    });
    root.append(textEl, fixes);

    // Restore previous answer
    const savedFE = Store.getModule(modId).sections[s.id];
    if (savedFE && Array.isArray(savedFE.answer)) {
      savedFE.answer.forEach(a => {
        const t = tokens[a.i];
        if (t && t.btn && t.core === a.token && !picked.has(a.i)) toggle(a.i, t.btn, a.fix || "");
      });
    }
    refreshFixes();

    const btns = el("div", { class: "btn-row" });
    const check = el("button", { class: "btn" }, "Sjekk svar");
    btns.appendChild(check);
    root.appendChild(btns);
    const fbHolder = el("div");
    root.appendChild(fbHolder);

    check.addEventListener("click", () => {
      resetMarks();
      root.classList.add("checked");
      let allRight = true;
      const answer = [];
      const missed = [];
      tokens.forEach((t, pos) => {
        if (!t.btn) return;
        const err = errAt.get(pos);
        const pk = picked.get(pos);
        if (pk) {
          const fix = pk.input.value;
          answer.push({ i: pos, token: t.core, fix });
          if (err) {
            const ok = eqAny(fix, err.accept);
            t.btn.classList.add(ok ? "right" : "partly");
            pk.input.classList.toggle("right", ok);
            pk.input.classList.toggle("wrong", !ok);
            if (!ok) { allRight = false; missed.push(err); }
          } else {
            t.btn.classList.add("wrong");
            pk.input.classList.add("wrong");
            allRight = false;
          }
        } else if (err) {
          t.btn.classList.add("missed");
          allRight = false;
          missed.push(err);
        }
      });
      const fasit = missed.length
        ? "Fasit: " + missed.map(e => `<em class="bm">${e.token}</em> → <em class="nn">${e.accept[0]}</em>`).join(", ") + ". "
        : "";
      fbHolder.innerHTML = "";
      fbHolder.appendChild(feedbackEl(allRight, (allRight ? "" : fasit) + (s.explanation || "")));
      Store.recordAnswer(modId, s.id, { correct: allRight, answer });
      document.dispatchEvent(new CustomEvent("exercise-answered"));
    });

    // Print: ruled lines for corrections
    const printLines = el("div", { class: "print-only-lines", "aria-hidden": "true" });
    for (let i = 0; i < Math.max(3, errors.length); i++) printLines.appendChild(el("div", { class: "rule" }));
    root.appendChild(printLines);

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
      drill: renderDrill,
      findError: renderFindError,
    };
    const fn = map[section.exerciseType];
    if (!fn) {
      return el("div", {}, "Ukjent oppgåvetype: " + section.exerciseType);
    }
    return fn(section, modId);
  }

  return { render, tokenizeText, resolveErrors };
})();
