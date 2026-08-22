/* ============ ZENTHON — APP: RENDERER + RUN ENGINE + STUDY + ZEN PET ============ */

const CATS = [
  { id: "getting-started", name: "GETTING STARTED", icon: "01" },
  { id: "variables",       name: "VARIABLES", icon: "02" },
  { id: "datatypes",       name: "DATA TYPES", icon: "03" },
  { id: "io",              name: "INPUT & OUTPUT", icon: "04" },
  { id: "operators",       name: "OPERATORS", icon: "05" },
  { id: "strings",         name: "STRINGS", icon: "06" },
  { id: "numbers",         name: "NUMBERS & MATH", icon: "07" },
  { id: "conditionals",    name: "CONDITIONALS", icon: "08" },
  { id: "loops",           name: "LOOPS", icon: "09" },
  { id: "lists",           name: "LISTS", icon: "10" },
  { id: "tuples",          name: "TUPLES", icon: "11" },
  { id: "sets",            name: "SETS", icon: "12" },
  { id: "dicts",           name: "DICTIONARIES", icon: "13" },
  { id: "comprehensions",  name: "COMPREHENSIONS", icon: "14" },
  { id: "functions",       name: "FUNCTIONS", icon: "15" },
  { id: "oop",             name: "OBJECT ORIENTED", icon: "16" },
  { id: "modules",         name: "MODULES", icon: "17" },
  { id: "errors",          name: "EXCEPTIONS", icon: "18" },
  { id: "files",           name: "FILE HANDLING", icon: "19" },
  { id: "advanced",        name: "ADVANCED TOPICS", icon: "20" },
  { id: "datetime",        name: "DATETIME", icon: "21" },
  { id: "regex",           name: "REGEX", icon: "22" },
  { id: "os-sys",          name: "OS & SYS", icon: "23" },
  { id: "algorithms",      name: "ALGORITHMS", icon: "24" },
  { id: "projects",        name: "MINI PROJECTS", icon: "25" },
  { id: "class11",         name: "SPECIAL 1", icon: "26" }
];

const ALL = (window.PY_DATA || []).filter(e => e && e.id);
const catOrder = {};
CATS.forEach((c, i) => { catOrder[c.id] = i; });

ALL.sort((a, b) => {
  const ca = catOrder[a.cat] === undefined ? 999 : catOrder[a.cat];
  const cb = catOrder[b.cat] === undefined ? 999 : catOrder[b.cat];
  return ca - cb;
});

ALL.forEach((e, i) => { e.num = i + 1; });

/* ---------- highlight Python ---------- */
function hl(code) {
  const esc = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const phs = [];
  const ph = m => { phs.push(m); return "\u0001" + (phs.length - 1) + "\u0001"; };
  let s = esc
    .replace(/("""[\s\S]*?"""|'''[\s\S]*?''')/g, ph)
    .replace(/(".*?"|'.*?')/g, ph)
    .replace(/(#[^\n]*)/g, ph);
  const KW = /\b(def|return|if|elif|else|for|while|in|not|and|or|import|from|as|class|try|except|finally|raise|with|lambda|pass|break|continue|True|False|None|global|nonlocal|yield|del|is|assert|print|input)\b/g;
  s = s.replace(KW, '<span class="kw">$1</span>');
  return s.replace(/\u0001(\d+)\u0001/g, (_, i) => {
    const v = phs[+i];
    const cls = v[0] === "#" ? "cm" : "st";
    return '<span class="' + cls + '">' + v + "</span>";
  });
}

/* ---------- DOM ---------- */
const sectionsEl = document.getElementById("sections");
const navEl = document.getElementById("catNav");
const searchEl = document.getElementById("search");
const searchInfo = document.getElementById("searchInfo");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const topBtn = document.getElementById("topBtn");

const labCode = document.getElementById("labCode");
const labRun = document.getElementById("labRun");
const labStop = document.getElementById("labStop");
const labClear = document.getElementById("labClear");
const labInputs = document.getElementById("labInputs");
const labConsole = document.getElementById("labConsole");
const labModal = document.getElementById("lab");

const studyToggle = document.getElementById("studyToggle");
const studyBar = document.getElementById("studyBar");
const studyPrev = document.getElementById("studyPrev");
const studyNext = document.getElementById("studyNext");
const studyExitBtn = document.getElementById("studyExit");
const studyCount = document.getElementById("studyCount");
const studyFill = document.getElementById("studyFill");

const zenPet = document.getElementById("zenPet");
const zenBubble = document.getElementById("zenBubble");
const zenBubbleText = document.getElementById("zenBubbleText");
const zenSprite = document.getElementById("zenSprite");

const inputModal = document.getElementById("inputModal");
const inputModalText = document.getElementById("inputModalText");
const inputModalHint = document.getElementById("inputModalHint");
const inputModalOk = document.getElementById("inputModalOk");
const inputModalCancel = document.getElementById("inputModalCancel");

const DONE_KEY = "zxd-done";
const STUDY_KEY = "zxd-study";
let done = new Set();
try { done = new Set(JSON.parse(localStorage.getItem(DONE_KEY) || "[]")); } catch (e) { done = new Set(); }

function saveDone() {
  try { localStorage.setItem(DONE_KEY, JSON.stringify([...done])); } catch (e) {}
}

const animejs = window.anime || null;

/* ---------- build sections ---------- */
function buildSections() {
  const frag = document.createDocumentFragment();
  CATS.forEach((cat, ci) => {
    const entries = ALL.filter(e => e.cat === cat.id);
    if (!entries.length) return;

    const sec = document.createElement("section");
    sec.className = "sec";
    sec.id = "sec-" + cat.id;

    const head = document.createElement("div");
    head.className = "sec-head";
    head.innerHTML = '<span class="sec-icon">' + cat.icon + "</span>" +
      '<h2 class="sec-title">' + cat.name + "</h2>" +
      '<span class="sec-count">' + entries.length + " CODES</span>";
    sec.appendChild(head);

    entries.forEach(e => {
      const card = document.createElement("article");
      card.className = "topic" + (done.has(e.id) ? " done" : "");
      card.dataset.id = e.id;
      card.dataset.cat = cat.id;
      card.dataset.search = (cat.name + " " + e.title + " " + e.desc + " " + e.code).toLowerCase();

      const headRow = document.createElement("div");
      headRow.className = "t-head";
      const btn = document.createElement("button");
      btn.className = "done-btn";
      btn.title = "Mark as done";
      btn.addEventListener("click", () => toggleDone(card, e.id));
      const title = document.createElement("span");
      title.className = "t-title-text";
      title.textContent = e.title;
      const num = document.createElement("span");
      num.className = "t-num";
      num.textContent = "EX" + String(e.num).padStart(3, "0");
      headRow.append(btn, title, num);
      card.appendChild(headRow);

      const desc = document.createElement("p");
      desc.className = "t-desc";
      desc.textContent = e.desc;
      card.appendChild(desc);

      const codebox = document.createElement("div");
      codebox.className = "codebox";
      const cHead = document.createElement("div");
      cHead.className = "code-head";
      const lang = document.createElement("span");
      lang.className = "code-lang";
      lang.textContent = "PYTHON 3";
      const actions = document.createElement("div");
      actions.className = "code-head-actions";
      const run = document.createElement("button");
      run.className = "run-btn";
      run.textContent = "RUN";
      run.addEventListener("click", () => runCard(card, e, run));
      const copy = document.createElement("button");
      copy.className = "copy-btn";
      copy.textContent = "COPY";
      copy.addEventListener("click", () => copyCode(copy, e.code));
      actions.append(run, copy);
      cHead.append(lang, actions);
      const pre = document.createElement("pre");
      const codeEl = document.createElement("code");
      codeEl.innerHTML = hl(e.code);
      pre.appendChild(codeEl);
      codebox.append(cHead, pre);
      card.appendChild(codebox);

      if (e.output && e.output !== "None") {
        const outbox = document.createElement("div");
        outbox.className = "outbox";
        const oHead = document.createElement("div");
        oHead.className = "out-head";
        oHead.textContent = "OUTPUT";
        const oPre = document.createElement("pre");
        oPre.textContent = e.output;
        outbox.append(oHead, oPre);
        card.appendChild(outbox);
      }

      const explain = document.createElement("p");
      explain.className = "t-explain";
      explain.innerHTML = "<strong>HOW IT WORKS:</strong> " + e.explain;
      card.appendChild(explain);

      sec.appendChild(card);
    });

    frag.appendChild(sec);
  });
  sectionsEl.appendChild(frag);
}

/* ---------- sidebar nav ---------- */
function buildNav() {
  const frag = document.createDocumentFragment();
  CATS.forEach((cat, ci) => {
    const entries = ALL.filter(e => e.cat === cat.id);
    if (!entries.length) return;
    const item = document.createElement("button");
    item.className = "cat-item";
    item.dataset.cat = cat.id;
    item.innerHTML = '<span>' + String(ci + 1).padStart(2, "0") + " " + cat.name + '</span><span class="cat-count">' + entries.length + "</span>";
    item.addEventListener("click", () => {
      const sec = document.getElementById("sec-" + cat.id);
      if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    frag.appendChild(item);
  });
  navEl.appendChild(frag);
}

/* ---------- scroll spy ---------- */
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      const cat = en.target.id.replace("sec-", "");
      document.querySelectorAll(".cat-item").forEach(i => {
        i.classList.toggle("active", i.dataset.cat === cat);
      });
    }
  });
}, { rootMargin: "-20% 0px -70% 0px" });

/* ---------- progress ---------- */
function toggleDone(card, id) {
  if (done.has(id)) done.delete(id); else done.add(id);
  saveDone();
  card.classList.toggle("done", done.has(id));
  updateProgress();
}

function updateProgress() {
  const n = ALL.length;
  const d = ALL.filter(e => done.has(e.id)).length;
  progressFill.style.width = n ? (d / n * 100) + "%" : "0%";
  progressText.textContent = d + " / " + n + " COMPLETE";
}

/* ---------- copy ---------- */
function copyCode(btn, code) {
  const fallback = () => {
    const ta = document.createElement("textarea");
    ta.value = code;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(() => flash(btn)).catch(fallback);
  } else {
    fallback();
    flash(btn);
  }
  function flash(b) {
    b.textContent = "COPIED!";
    b.classList.add("copied");
    setTimeout(() => { b.textContent = "COPY"; b.classList.remove("copied"); }, 1400);
  }
}

/* ---------- search ---------- */
let searchTimer = null;
searchEl.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(applySearch, 150);
});

function applySearch() {
  const q = searchEl.value.trim().toLowerCase();
  let shown = 0;
  const matchedCats = new Set();
  document.querySelectorAll(".topic").forEach(card => {
    const hit = !q || card.dataset.search.includes(q);
    card.style.display = hit ? "" : "none";
    if (hit) {
      shown++;
      if (q) matchedCats.add(card.dataset.cat);
    }
  });
  if (q) {
    const names = [...matchedCats].map(id => {
      const c = CATS.find(x => x.id === id);
      return c ? c.name : null;
    }).filter(Boolean);
    const extra = names.length > 3 ? " +" + (names.length - 3) + " MORE" : "";
    const chapters = names.slice(0, 3).join(", ") + extra;
    searchInfo.textContent = shown + " MATCH" + (shown === 1 ? "" : "ES") +
      (names.length ? " — CHAPTERS: " + chapters : "");
    document.querySelectorAll(".sec").forEach(s => {
      const visible = s.querySelectorAll(".topic:not([style*='none'])").length > 0;
      s.style.display = visible ? "" : "none";
    });
  } else {
    searchInfo.textContent = "";
    document.querySelectorAll(".sec").forEach(s => { s.style.display = ""; });
  }
}

/* ---------- top button ---------- */
window.addEventListener("scroll", () => {
  topBtn.classList.toggle("visible", window.scrollY > 500);
});
topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ---------- logo: 1 click = GitHub, 2 clicks = Instagram ---------- */
const logoBlock = document.querySelector(".logo-block");
let logoClickTimer = null;
logoBlock.addEventListener("click", (e) => {
  e.preventDefault();
  clearTimeout(logoClickTimer);
  logoClickTimer = setTimeout(() => {
    window.open("https://github.com/izdvnshu", "_blank", "noopener");
  }, 250);
});
logoBlock.addEventListener("dblclick", (e) => {
  e.preventDefault();
  clearTimeout(logoClickTimer);
  window.open("https://www.instagram.com/devanshu.fps/?hl=en", "_blank", "noopener");
});

/* ---------- hero actions ---------- */
document.getElementById("startBtn").addEventListener("click", () => {
  const first = document.querySelector(".sec");
  if (first) first.scrollIntoView({ behavior: "smooth" });
});

/* ---------- HERO: MOVING PYTHON ---------- */
(function () {
  const g = document.getElementById("snakeSegments");
  if (!g) return;

  const NS = "http://www.w3.org/2000/svg";
  const SEGS = 18;

  for (let i = 0; i < SEGS; i++) {
    const p = SEGS - 1 - i; // head at the right
    const head = i === SEGS - 1;
    const x = 10 + p * 5.7;

    const r = document.createElementNS(NS, "rect");
    r.setAttribute("x", head ? x - 1 : x);
    r.setAttribute("y", head ? 61 : 62);
    r.setAttribute("width", head ? 10 : 8);
    r.setAttribute("height", head ? 10 : 8);
    r.setAttribute("fill", head ? "#8affb1" : (i % 2 ? "#3ddc84" : "#2fb96c"));
    r.setAttribute("class", "snake-seg");
    r.style.animationDelay = (p * -0.13).toFixed(2) + "s";
    g.appendChild(r);

    if (head) {
      const eye = document.createElementNS(NS, "rect");
      eye.setAttribute("x", x + 5);
      eye.setAttribute("y", 63);
      eye.setAttribute("width", 2);
      eye.setAttribute("height", 2);
      eye.setAttribute("fill", "#12081f");
      eye.setAttribute("class", "snake-seg");
      eye.style.animationDelay = (p * -0.13).toFixed(2) + "s";
      g.appendChild(eye);
    }
  }
})();

/* ---------- stats ---------- */
function buildStats() {
  const cats = new Set(ALL.map(e => e.cat)).size;
  const lines = ALL.reduce((a, e) => a + e.code.split("\n").length, 0);
  const words = ALL.reduce((a, e) => a + (e.desc + " " + e.explain).split(/\s+/).length, 0);
  document.getElementById("statExamples").textContent = ALL.length;
  document.getElementById("statCats").textContent = cats;
  document.getElementById("statLines").textContent = lines;
  document.getElementById("statWords").textContent = words;
  document.getElementById("headerStats").innerHTML =
    ALL.length + " EXAMPLES<br>" + cats + " CATEGORIES<br>" + lines + " CODE LINES";
}

/* =========================================================
   ZEN PET
   ========================================================= */
const ZEN_TIPS = [
  "READ THE DESCRIPTION FIRST — THEN THE CODE!",
  "TRY RUNNING THE CODE! SEE WHAT IT PRINTS!",
  "COPY THE CODE INTO ZEN LAB AND CHANGE IT!",
  "DONE WITH A TOPIC? CLICK THE SQUARE TO CHECK IT OFF!",
  "USE SEARCH TO FIND ANY CONCEPT FAST!",
  "STUDY MODE TEACHES YOU ONE STEP AT A TIME!",
  "MAKE MISTAKES! THAT IS HOW ZEN LEARNS!",
  "RUN THE CODE, THEN BREAK IT ON PURPOSE!",
  "PYTHON READS CODE TOP TO BOTTOM!",
  "PRACTICE 20 MINUTES A DAY — BECOME ZEN!",
  "CHECK THE OUTPUT BOX BEFORE RUNNING!",
  "PYTHON NAMES MUST START WITH A LETTER OR _!",
  "INDENTATION IS THE HEART OF PYTHON!"
];

let zenTimer = null;

function zenSay(msg, ms) {
  zenBubbleText.textContent = msg;
  zenBubble.classList.add("show");
  clearTimeout(zenTimer);
  zenTimer = setTimeout(() => { zenBubble.classList.remove("show"); }, ms || 6000);
}

zenSprite.addEventListener("click", () => {
  zenSprite.classList.remove("bounce");
  void zenSprite.offsetWidth;
  zenSprite.classList.add("bounce");
  if (studyOn) {
    zenSay("STEP " + (studyIdx + 1) + " OF " + ALL.length + "! UNDERSTAND IT, THEN CLICK NEXT!");
  } else {
    zenSay(ZEN_TIPS[Math.floor(Math.random() * ZEN_TIPS.length)]);
  }
});

/* =========================================================
   STUDY MODE
   ========================================================= */
let studyOn = false;
let studyIdx = 0;

function studyEnter() {
  studyOn = true;
  document.body.classList.add("study-mode");
  studyToggle.classList.add("active");
  studyBar.classList.add("show");
  if (animejs) {
    animejs.animate(studyBar, { translateY: [90, 0], opacity: [0, 1], duration: 380, ease: "out(3)" });
  }
  searchEl.value = "";
  applySearch();
  let saved = parseInt(localStorage.getItem(STUDY_KEY) || "0", 10);
  if (isNaN(saved)) saved = 0;
  studySet(saved);
  zenSay("STUDY MODE ON! FOLLOW THE STEPS IN ORDER!");
}

function studyExit() {
  studyOn = false;
  document.body.classList.remove("study-mode");
  studyToggle.classList.remove("active");
  document.querySelectorAll(".topic.study-active").forEach(t => t.classList.remove("study-active"));
  zenSay("STUDY MODE OFF! EXPLORE FREELY!");
  if (animejs) {
    animejs.animate(studyBar, {
      translateY: 90, opacity: 0, duration: 200, ease: "in(2)",
      complete: () => studyBar.classList.remove("show")
    });
  } else {
    studyBar.classList.remove("show");
  }
}

function studySet(i) {
  if (!ALL.length) return;
  studyIdx = ((i % ALL.length) + ALL.length) % ALL.length;
  try { localStorage.setItem(STUDY_KEY, String(studyIdx)); } catch (e) {}
  document.querySelectorAll(".topic.study-active").forEach(t => t.classList.remove("study-active"));
  const card = document.querySelector('.topic[data-id="' + ALL[studyIdx].id + '"]');
  if (card) {
    card.classList.add("study-active");
    card.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  studyCount.textContent = (studyIdx + 1) + " / " + ALL.length;
  studyFill.style.width = ((studyIdx + 1) / ALL.length * 100) + "%";
}

studyToggle.addEventListener("click", () => { studyOn ? studyExit() : studyEnter(); });
studyPrev.addEventListener("click", () => studySet(studyIdx - 1));
studyNext.addEventListener("click", () => studySet(studyIdx + 1));
studyExitBtn.addEventListener("click", studyExit);

document.addEventListener("keydown", (ev) => {
  if (!studyOn) return;
  if (ev.key === "ArrowLeft") { ev.preventDefault(); studySet(studyIdx - 1); }
  else if (ev.key === "ArrowRight") { ev.preventDefault(); studySet(studyIdx + 1); }
  else if (ev.key === "Escape") { studyExit(); }
});

/* =========================================================
   RUN ENGINE (Pyodide in a Web Worker)
   ========================================================= */
const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";

const WORKER_SRC = [
  'const CDN = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";',
  'importScripts(CDN + "pyodide.js");',
  'let pyodide = null;',
  'self.onmessage = async function (ev) {',
  '  const msg = ev.data;',
  '  if (msg.type === "load") {',
  '    try {',
  '      pyodide = await loadPyodide({ indexURL: CDN });',
  '      self.postMessage({ type: "ready" });',
  '    } catch (e) {',
  '      self.postMessage({ type: "error", message: String((e && e.message) || e) });',
  '    }',
  '    return;',
  '  }',
  '  if (msg.type === "run") {',
  '    const seq = msg.seq;',
  '    let lines = [];',
  '    const flush = function () {',
  '      if (lines.length) {',
  '        self.postMessage({ type: "line", seq: seq, text: lines.join("\\n") });',
  '        lines = [];',
  '      }',
  '    };',
  '    try {',
  '      pyodide.setStdout({ batched: function (s) { lines.push(s); } });',
  '      pyodide.setStderr({ batched: function (s) { lines.push(s); } });',
  '      const g = pyodide.globals.get("dict")();',
  '      g.set("__zen_inputs", msg.inputs || []);',
  '      pyodide.runPython("import builtins\\n__zen_i = [str(x) for x in __zen_inputs]\\ndef __zen_in(p=\'\'):\\n    if not __zen_i:\\n        raise RuntimeError(\'NO MORE INPUTS\')\\n    return __zen_i.pop(0)\\nbuiltins.input = __zen_in", { globals: g });',
  '      pyodide.runPython(msg.code, { globals: g });',
  '      flush();',
  '      self.postMessage({ type: "done", seq: seq, ok: true });',
  '    } catch (e) {',
  '      flush();',
  '      self.postMessage({ type: "done", seq: seq, ok: false, error: String((e && e.message) || e) });',
  '    }',
  '  }',
  '};'
].join("\n");

let engine = null;
let engineLoading = null;
let engineEverLoaded = false;
let activeRun = null;

function ensureEngine() {
  if (engine) return Promise.resolve(engine);
  if (engineLoading) return engineLoading;
  engineLoading = new Promise((resolve, reject) => {
    let worker;
    try {
      worker = new Worker(URL.createObjectURL(new Blob([WORKER_SRC], { type: "text/javascript" })));
    } catch (e) {
      engineLoading = null;
      reject(e);
      return;
    }
    worker.onmessage = (ev) => {
      const m = ev.data;
      if (m.type === "ready") {
        engine = { worker: worker, seq: 0, handlers: {} };
        engineLoading = null;
        engineEverLoaded = true;
        resolve(engine);
      } else if (m.type === "error") {
        engineLoading = null;
        reject(new Error(m.message || "engine failed to load"));
      } else if (m.type === "line") {
        const h = engine && engine.handlers[m.seq];
        if (h && h.onLine) h.onLine(m.text);
      } else if (m.type === "done") {
        const h = engine && engine.handlers[m.seq];
        if (h && h.onDone) h.onDone(m.ok, m.error);
      }
    };
    worker.onerror = (e) => {
      engineLoading = null;
      reject(new Error((e && e.message) || "worker error"));
    };
    worker.postMessage({ type: "load" });
  });
  return engineLoading;
}

function killEngine() {
  if (engine) {
    try { engine.worker.terminate(); } catch (e) {}
    engine = null;
  }
  engineLoading = null;
}

/* ---------- console helpers ---------- */
function addLine(z, text, cls) {
  const d = document.createElement("div");
  d.className = "zline" + (cls ? " " + cls : "");
  d.textContent = text;
  z.appendChild(d);
  const sc = z.parentElement;
  if (sc) sc.scrollTop = sc.scrollHeight;
}

function addLines(z, text) {
  String(text).split("\n").forEach(line => addLine(z, line));
}

function makeCardConsole(card) {
  const box = document.createElement("div");
  box.className = "zen-console";
  const z = document.createElement("div");
  z.className = "zlines";
  box.appendChild(z);
  const anchor = card.querySelector(".outbox") || card.querySelector(".t-explain") || null;
  card.insertBefore(box, anchor);
  return z;
}

/* ---------- run logic ---------- */
function norm(s) {
  const out = (s || "").replace(/\r\n?/g, "\n").split("\n").map(l => l.trimEnd());
  while (out.length && out[out.length - 1] === "") out.pop();
  return out.join("\n");
}

function doRun(opts) {
  const consoleEl = opts.consoleEl || makeCardConsole(opts.card);
  consoleEl.innerHTML = "";
  const interactive = /input\s*\(/.test(opts.code);
  const inputs = Array.isArray(opts.inputs) ? opts.inputs : String(opts.inputs || "").split("\n");
  if (!engineEverLoaded) {
    addLine(consoleEl, "LOADING PYTHON ENGINE... FIRST RUN TAKES ~10 SECONDS!", "zen-info");
    zenSay("LOADING PYTHON ENGINE... FIRST RUN TAKES ~10 SECONDS!");
  } else {
    addLine(consoleEl, "RUNNING...", "zen-info");
  }
  ensureEngine().then(eng => {
    if (activeRun) return;
    const seq = eng.seq++;
    activeRun = { seq: seq, opts: opts, consoleEl: consoleEl, lines: [] };
    if (opts.btn) {
      opts.btn.textContent = "STOP";
      opts.btn.classList.add("stop");
    }
    eng.handlers[seq] = {
      onLine: (text) => {
        if (activeRun && activeRun.seq === seq) {
          activeRun.lines.push(text);
          addLines(consoleEl, text);
        }
      },
      onDone: (ok, error) => onRunDone(seq, ok, error)
    };
    eng.worker.postMessage({ type: "run", seq: seq, code: opts.code, inputs: inputs });
  }).catch(err => {
    addLine(consoleEl, "ENGINE ERROR: " + String((err && err.message) || err), "zen-err");
    zenSay("COULD NOT LOAD THE PYTHON ENGINE! CHECK YOUR INTERNET.");
    if (opts.btn) {
      opts.btn.textContent = "RUN";
      opts.btn.classList.remove("stop");
    }
  });
}

function onRunDone(seq, ok, error) {
  const ar = activeRun;
  if (!ar || ar.seq !== seq) return;
  activeRun = null;
  const opts = ar.opts;
  if (opts.btn) {
    opts.btn.textContent = "RUN";
    opts.btn.classList.remove("stop");
  }
  if (!ok) {
    addLine(ar.consoleEl, "ERROR: " + (error || "UNKNOWN"), "zen-err");
    addLine(ar.consoleEl, "ZEN: RUN FAILED — CHECK THE CODE!", "zen-diff");
    zenSay("ERROR! PYTHON SAYS: " + String(error || "?").slice(0, 60));
    return;
  }
  const actual = ar.lines.join("\n");
  const expected = String(opts.expected || "").trim();
  const interactive = /input\s*\(/.test(opts.code);
  if (interactive) {
    addLine(ar.consoleEl, "ZEN: RUN COMPLETE! (YOU SUPPLIED THE INPUTS)", "zen-info");
    zenSay("RUN COMPLETE! TRY DIFFERENT INPUTS!");
    return;
  }
  if (expected && expected.indexOf("Random") === 0) {
    addLine(ar.consoleEl, "ZEN: RANDOM OUTPUT — RUN IT AGAIN TO SEE IT CHANGE!", "zen-random");
    zenSay("RANDOM! RUN AGAIN TO SEE IT CHANGE!");
    return;
  }
  if (!expected || expected === "None") {
    addLine(ar.consoleEl, "ZEN: RUN COMPLETE!", "zen-ok");
    zenSay("RUN COMPLETE! NICE!");
    return;
  }
  if (norm(expected) === norm(actual)) {
    addLine(ar.consoleEl, "ZEN: CORRECT! OUTPUT MATCHES!", "zen-ok");
    zenSay("PERFECT! YOUR OUTPUT MATCHES!");
  } else {
    addLine(ar.consoleEl, "ZEN: MISMATCH — EXPECTED: " + expected, "zen-diff");
    zenSay("OUTPUT DIFFERS! COMPARE WITH THE OUTPUT BOX!");
  }
}

function stopRun() {
  if (!activeRun) return;
  const ar = activeRun;
  activeRun = null;
  killEngine();
  if (ar.opts.btn) {
    ar.opts.btn.textContent = "RUN";
    ar.opts.btn.classList.remove("stop");
  }
  addLine(ar.consoleEl, "ZEN: RUN STOPPED!", "zen-info");
  zenSay("STOPPED IT! INFINITE LOOP TERMINATED!");
}

function runCard(card, e, btn) {
  if (activeRun) {
    if (activeRun.opts.btn === btn) stopRun();
    else zenSay("ONE RUN AT A TIME! STOP THE CURRENT RUN FIRST.");
    return;
  }
  const code = e.code;
  if (/input\s*\(/.test(code)) {
    askInputs(code, inputs => {
      doRun({ mode: "card", code: code, expected: e.output, btn: btn, card: card, inputs: inputs });
    });
    return;
  }
  doRun({ mode: "card", code: code, expected: e.output, btn: btn, card: card, inputs: [] });
}

/* ---------- input modal ---------- */
let pendingRun = null;

function askInputs(code, cb) {
  const inputLines = code.split("\n").filter(l => /input\s*\(/.test(l));
  inputModalHint.textContent = inputLines.length + " input() CALL(S) FOUND — TYPE ONE ANSWER PER LINE:  " + inputLines.join("  |  ");
  inputModalText.value = "";
  inputModal.classList.add("show");
  pendingRun = cb;
  setTimeout(() => inputModalText.focus(), 50);
}

inputModalOk.addEventListener("click", () => {
  inputModal.classList.remove("show");
  const cb = pendingRun;
  pendingRun = null;
  if (cb) cb(inputModalText.value);
});

inputModalCancel.addEventListener("click", () => {
  inputModal.classList.remove("show");
  pendingRun = null;
});

/* ---------- ANIME.JS ANIMATED DIALOGS (FLIP from button + overlay alpha) ---------- */
function animatedDialog(id, boxSel, btnId, opts) {
  const $dialog = document.getElementById(id);
  const $box = $dialog.querySelector(boxSel);
  const $btn = document.getElementById(btnId);
  let busy = false;

  function flipTargets() {
    const b = $btn.getBoundingClientRect();
    const r = $box.getBoundingClientRect();
    const tx = (b.left + b.width / 2) - (r.left + r.width / 2);
    const ty = (b.top + b.height / 2) - (r.top + r.height / 2);
    const s = Math.min(1, Math.max(b.width / r.width, b.height / r.height));
    return { tx, ty, s };
  }

  function open() {
    if ($dialog.open || busy) return;
    busy = true;
    if (opts.onOpen) opts.onOpen();
    $dialog.style.setProperty("--overlay-alpha", "0");
    $dialog.showModal();
    if (animejs) {
      const { tx, ty, s } = flipTargets();
      animejs.animate($box, {
        translateX: [tx, 0], translateY: [ty, 0], scale: [s, 1],
        duration: 420, ease: "out(3)"
      });
      animejs.animate($dialog, {
        "--overlay-alpha": opts.alpha,
        duration: 260, ease: "out(1)",
        complete: () => { busy = false; }
      });
    } else {
      $dialog.style.setProperty("--overlay-alpha", String(opts.alpha));
      busy = false;
    }
  }

  function close(after) {
    if (!$dialog.open || busy) return;
    busy = true;
    if (opts.onClose) opts.onClose();
    if (animejs) {
      const { tx, ty, s } = flipTargets();
      animejs.animate($box, {
        translateX: [0, tx], translateY: [0, ty], scale: [1, s],
        duration: 300, ease: "in(3)"
      });
      animejs.animate($dialog, {
        "--overlay-alpha": 0,
        duration: 300, ease: "in(2)",
        complete: () => {
          $dialog.close();
          if (after) after();
          busy = false;
        }
      });
    } else {
      $dialog.close();
      if (after) after();
      busy = false;
    }
  }

  $dialog.addEventListener("click", (e) => { if (e.target === $dialog) close(); });
  $dialog.addEventListener("cancel", (e) => { e.preventDefault(); close(); });

  return { open, close, dialog: $dialog };
}

/* ---------- ZEN LAB ---------- */
const labBtn = document.getElementById("labBtn");
const labClose = document.getElementById("labClose");
const labDlg = animatedDialog("lab", ".lab-modal-box", "labBtn", {
  alpha: 0.94,
  onOpen: () => labCode.focus()
});

function closeLab() {
  labDlg.close(() => {
    if (activeRun && activeRun.opts.btn === labRun) stopRun();
  });
}

labBtn.addEventListener("click", () => labDlg.open());
labClose.addEventListener("click", closeLab);

/* ---------- TRACK ---------- */
const trackList = document.getElementById("trackList");
const trackDlg = animatedDialog("trackModal", ".track-box", "trackBtn", { alpha: 0.85 });

document.getElementById("trackBtn").addEventListener("click", () => {
  renderTrack();
  trackDlg.open();
});
document.getElementById("trackClose").addEventListener("click", () => trackDlg.close());

function renderTrack() {
  const total = ALL.length;
  const totalDone = ALL.filter(e => done.has(e.id)).length;

  document.getElementById("trackDone").textContent = totalDone + "/" + total;
  document.getElementById("trackPct").textContent = total ? Math.round(totalDone / total * 100) + "%" : "0%";

  let chaptersDone = 0;
  trackList.innerHTML = "";

  CATS.forEach(cat => {
    const entries = ALL.filter(e => e.cat === cat.id);
    if (!entries.length) return;
    const d = entries.filter(e => done.has(e.id)).length;
    const complete = d === entries.length;
    if (complete) chaptersDone++;

    const row = document.createElement("div");
    row.className = "track-row" + (complete ? " complete" : "");
    row.title = "GO TO " + cat.name;
    row.innerHTML =
      '<div class="track-row-top">' +
        '<span class="track-name">' + cat.icon + " · " + cat.name + "</span>" +
        '<span class="track-count">' + d + "/" + entries.length + "</span>" +
      "</div>" +
      '<div class="progress-bar"><div class="progress-fill" style="width:' + (entries.length ? d / entries.length * 100 : 0) + '%"></div></div>';
    row.addEventListener("click", () => {
      trackDlg.close();
      const target = document.getElementById("sec-" + cat.id);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
    trackList.appendChild(row);
  });

  document.getElementById("trackChapters").textContent = chaptersDone + "/" + CATS.length;
}

labRun.addEventListener("click", () => {
  if (activeRun) {
    if (activeRun.opts.btn === labRun) stopRun();
    else zenSay("ONE RUN AT A TIME! STOP THE CURRENT RUN FIRST.");
    return;
  }
  const code = labCode.value.trim();
  if (!code) {
    addLine(labConsole, "WRITE SOME CODE FIRST!", "zen-diff");
    zenSay("THE LAB IS EMPTY! WRITE SOME CODE!");
    return;
  }
  const inputs = labInputs.value.split("\n").filter(l => l.trim() !== "");
  doRun({ mode: "lab", code: code, expected: "", btn: labRun, card: null, consoleEl: labConsole, inputs: inputs });
});

labStop.addEventListener("click", stopRun);

labClear.addEventListener("click", () => {
  labConsole.innerHTML = "";
  labInputs.value = "";
  addLine(labConsole, "CONSOLE CLEARED!", "zen-info");
});

[labCode, labInputs, inputModalText].forEach(ta => {
  ta.addEventListener("keydown", (ev) => {
    if ((ev.ctrlKey || ev.metaKey) && ev.key === "Enter") {
      ev.preventDefault();
      if (ta === inputModalText) inputModalOk.click();
      else labRun.click();
    }
  });
});

/* ---------- init ---------- */
buildSections();
buildNav();
buildStats();
updateProgress();
document.getElementById("footerYear").textContent = "© 2026 ZENTHON — PIXEL PYTHON ACADEMY";

document.querySelectorAll(".sec").forEach(s => spy.observe(s));

zenSay("HELLO! I'M ZEN, YOUR PYTHON PET. CLICK ME FOR TIPS!");