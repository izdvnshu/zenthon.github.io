/* ============ ZENTHON TUTOR — SPLIT-SCREEN BOT LEARNER ============ */

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
const catOrder = {};
CATS.forEach((c, i) => { catOrder[c.id] = i; });

const ALL = (window.PY_DATA || []).filter(e => e && e.id && e.code);
ALL.sort((a, b) => {
  const ca = catOrder[a.cat] === undefined ? 999 : catOrder[a.cat];
  const cb = catOrder[b.cat] === undefined ? 999 : catOrder[b.cat];
  return ca - cb || String(a.id).localeCompare(String(b.id), undefined, { numeric: true });
});
ALL.forEach((e, i) => { e.num = i + 1; });

function catName(id) {
  const c = CATS.find(c => c.id === id);
  return c ? c.name : (id || "GENERAL").toUpperCase();
}
function levelOf(catId) {
  const i = catOrder[catId];
  if (i === undefined) return "CORE";
  if (i < 10) return "BASICS";
  if (i < 20) return "INTERMEDIATE";
  return "ADVANCED";
}

/* ---------- storage ---------- */
const LS_DONE = "zt_tutor_done";
const LS_CODE = "zt_tutor_code";
const LS_LAST = "zt_tutor_last";
function lsGet(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch (e) { return fallback; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
}
let doneSet = new Set(lsGet(LS_DONE, []));
let codeStore = lsGet(LS_CODE, {});

/* ---------- DOM ---------- */
const $ = id => document.getElementById(id);
const railNav = $("railNav"), railSearch = $("railSearch"), railScroll = $("railScroll");
const lessonNumEl = $("lessonNum"), lessonTitleEl = $("lessonTitle"), lessonCatEl = $("lessonCat");
const theoryBody = $("theoryBody"), whyBody = $("whyBody"), refCode = $("refCode"), revealBtn = $("revealBtn");
const botChat = $("botChat"), botStatus = $("botStatus");
const codeTA = $("codeTA"), hlPre = $("hlPre"), hlCode = $("hlCode"), gutter = $("gutter");
const consoleOut = $("consoleOut"), outStatus = $("outStatus");
const inputRow = $("inputRow"), inputValues = $("inputValues");
const engineChip = $("engineChip"), headerProgress = $("headerProgress");
const progressFill = $("progressFill"), progressText = $("progressText");
const nextLessonBtn = $("nextLessonBtn");
const split = $("split"), leftHalf = $("leftHalf"), divider = $("divider");

let cur = -1;
let running = false;
let runCount = 0;

/* ---------- syntax highlight (letter-based placeholders keep digits safe) ---------- */
function idx26(n) {
  if (n === 0) return "a";
  let s = "";
  while (n > 0) { s = String.fromCharCode(97 + (n % 26)) + s; n = Math.floor(n / 26); }
  return s;
}
function unIdx(str) {
  let n = 0;
  for (const ch of str) n = n * 26 + (ch.charCodeAt(0) - 96);
  return n - 1;
}
function hl(code) {
  const esc = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const phs = [];
  const ph = m => { phs.push(m); return "\u0001" + idx26(phs.length - 1) + "\u0001"; };
  let s = esc
    .replace(/("""[\s\S]*?"""|'''[\s\S]*?''')/g, ph)
    .replace(/(".*?"|'.*?')/g, ph)
    .replace(/(#[^\n]*)/g, ph);
  s = s.replace(/\b(def|class|if|elif|else|for|while|in|not|and|or|import|from|as|try|except|finally|raise|with|lambda|pass|break|continue|True|False|None|global|nonlocal|yield|del|is|assert|async|await|return)\b/g, '<span class="kw">$1</span>');
  s = s.replace(/\b(print|input|len|range|int|str|float|list|dict|set|tuple|type|sum|min|max|abs|sorted|map|filter|enumerate|zip|open|help|dir|isinstance|format|round|reversed|any|all|id|hash|chr|ord|hex|bin|oct|super|getattr|setattr|hasattr)\b(?=\s*\()/g, '<span class="fn">$1</span>');
  s = s.replace(/\b(\d+\.?\d*)\b/g, '<span class="nm">$1</span>');
  return s.replace(/\u0001([a-z]+)\u0001/g, (_, t) => {
    const v = phs[unIdx(t)];
    const cls = v[0] === "#" ? "cm" : "st";
    return '<span class="' + cls + '">' + v + "</span>";
  });
}

/* ---------- editor ---------- */
function renderEditor() {
  const v = codeTA.value;
  hlCode.innerHTML = hl(v) + "\n";
  const n = v.split("\n").length;
  let g = "";
  for (let i = 1; i <= n; i++) g += i + "\n";
  gutter.textContent = g;
  syncScroll();
}
function syncScroll() {
  hlPre.scrollTop = codeTA.scrollTop;
  hlPre.scrollLeft = codeTA.scrollLeft;
  gutter.scrollTop = codeTA.scrollTop;
}
let saveTimer = null;
function onEditorInput() {
  renderEditor();
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    if (cur >= 0) { codeStore[ALL[cur].id] = codeTA.value; lsSet(LS_CODE, codeStore); }
  }, 400);
}
function insertAtCursor(text) {
  const s = codeTA.selectionStart, e = codeTA.selectionEnd;
  codeTA.value = codeTA.value.slice(0, s) + text + codeTA.value.slice(e);
  codeTA.selectionStart = codeTA.selectionEnd = s + text.length;
  renderEditor();
  onEditorInput();
}
codeTA.addEventListener("input", onEditorInput);
codeTA.addEventListener("scroll", syncScroll);
codeTA.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey) {
    if (e.key === "Enter") { e.preventDefault(); doRunFromEditor(); }
    return;
  }
  if (e.key === "Tab") {
    e.preventDefault();
    insertAtCursor("    ");
  } else if (e.key === "Enter") {
    e.preventDefault();
    const pos = codeTA.selectionStart;
    const before = codeTA.value.slice(0, pos);
    const line = before.slice(before.lastIndexOf("\n") + 1);
    const indent = (line.match(/^ */) || [""])[0];
    const extra = /:\s*$/.test(line) ? "    " : "";
    insertAtCursor("\n" + indent + extra);
  }
});

/* ---------- console ---------- */
function appendConsole(text, cls) {
  const div = document.createElement("div");
  div.className = cls || "c-out";
  div.textContent = text;
  consoleOut.appendChild(div);
  consoleOut.scrollTop = consoleOut.scrollHeight;
}
function clearConsole() { consoleOut.innerHTML = ""; }
function setOutStatus(txt, cls) {
  outStatus.textContent = txt;
  outStatus.className = "out-status" + (cls ? " " + cls : "");
}

/* =========================================================
   RUN ENGINE — Python 3.14 (Pyodide 314.0.7), Web Worker with
   automatic main-thread fallback (blob workers can be blocked
   when the site is opened from file://). Output is buffered in
   JS and flushed line-by-line, so partial lines (print with
   end="", sys.stdout.write without \n) are never lost.
   ========================================================= */
const INPUT_SETUP_PY = [
  "import builtins, sys",
  "__zen_i = [str(x) for x in __zen_inputs]",
  "def __zen_in(p=''):",
  "    if not __zen_i:",
  "        raise EOFError('NO MORE INPUTS - add one more value (one per line) in the input panel')",
  "    v = __zen_i.pop(0)",
  "    sys.stdout.write(str(p) + v + '\\n')",
  "    sys.stdout.flush()",
  "    return v",
  "builtins.input = __zen_in"
].join("\n");

const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/";

/* shared engine core — runs inside the worker OR on the main thread.
   NOTE: Pyodide 314 calls the `raw` stdout callback once per character
   with a char code (number). We buffer bytes per stream and emit whole
   lines, so nothing is lost (even output without a trailing newline). */
const CORE_SRC = `
function makeZenCore(post) {
  const CDN = ${JSON.stringify(PYODIDE_CDN)};
  const INPUT_SETUP = ${JSON.stringify(INPUT_SETUP_PY)};
  let pyodide = null;
  const dec = new TextDecoder("utf-8");
  const bytes = { out: [], err: [] };
  function emitLine(stream, text) {
    post({ type: "line", stream: stream, text: String(text) });
  }
  function pushData(stream, data) {
    const arr = bytes[stream];
    if (typeof data === "number") { arr.push(data); return; }
    const u = (data instanceof Uint8Array) ? data : new Uint8Array(data);
    for (let i = 0; i < u.length; i++) arr.push(u[i]);
  }
  function drain(stream, all) {
    const arr = bytes[stream];
    if (!arr.length) return;
    let lastNl = -1;
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] === 10) { lastNl = i; break; }
    }
    if (lastNl === -1) {
      if (all) {
        emitLine(stream, dec.decode(new Uint8Array(arr)).replace(/\\r$/, ""));
        arr.length = 0;
      }
      return;
    }
    const complete = new Uint8Array(arr.slice(0, lastNl));
    const rest = arr.slice(lastNl + 1);
    arr.length = 0;
    for (let i = 0; i < rest.length; i++) arr.push(rest[i]);
    dec.decode(complete).split("\\n").forEach(l => emitLine(stream, l.replace(/\\r$/, "")));
  }
  function write(stream, data) {
    pushData(stream, data);
    drain(stream, false);
  }
  function flushAll() { drain("out", true); drain("err", true); }
  function flushPy() {
    try { pyodide.runPython("import sys; sys.stdout.flush(); sys.stderr.flush()"); } catch (e) {}
  }
  return {
    async load() {
      pyodide = await loadPyodide({ indexURL: CDN });
      let pyver = "";
      try { pyver = pyodide.runPython("import sys; sys.version.split()[0]"); } catch (e) {}
      return pyver;
    },
    async handle(msg) {
      if (msg.type !== "run" || !pyodide) return;
      let g = null;
      try {
        pyodide.setStdout({ raw: b => write("out", b) });
        pyodide.setStderr({ raw: b => write("err", b) });
        g = pyodide.toPy({});
        g.set("__zen_inputs", msg.inputs || []);
        pyodide.runPython(INPUT_SETUP, { globals: g });
        pyodide.runPython(msg.code, { globals: g });
        flushPy();
        flushAll();
        post({ type: "done", seq: msg.seq, ok: true });
      } catch (e) {
        flushPy();
        flushAll();
        post({ type: "done", seq: msg.seq, ok: false, error: String((e && e.message) || e) });
      } finally {
        if (g) { try { g.destroy(); } catch (e2) {} }
      }
    }
  };
}`;

const WORKER_SRC = [
  'importScripts(' + JSON.stringify(PYODIDE_CDN + "pyodide.js") + ');',
  CORE_SRC,
  'const core = makeZenCore(m => self.postMessage(m));',
  'self.onmessage = async (ev) => {',
  '  const msg = ev.data;',
  '  if (msg.type === "load") {',
  '    try {',
  '      const ver = await core.load();',
  '      self.postMessage({ type: "ready", version: ver });',
  '    } catch (e) {',
  '      self.postMessage({ type: "error", message: String((e && e.message) || e) });',
  '    }',
  '    return;',
  '  }',
  '  await core.handle(msg);',
  '};'
].join("\n");

let engine = null;
let engineLoading = null;
let workerFailed = false;

function handleEngineMessage(m) {
  if (!engine) return;
  if (m.type === "line") {
    const h = engine.handlers[m.seq];
    if (h && h.onLine) h.onLine(m.stream || "out", m.text);
  } else if (m.type === "done") {
    const h = engine.handlers[m.seq];
    if (h && h.onDone) h.onDone(m.ok, m.error);
  }
}

function markEngineReady(eng, version) {
  engine = eng;
  engineChip.textContent = "ENGINE: READY — PYTHON " + (version || "3.14");
  engineChip.className = "engine-chip ready";
  return eng;
}

function startWorkerEngine() {
  return new Promise((resolve, reject) => {
    let worker;
    try {
      worker = new Worker(URL.createObjectURL(new Blob([WORKER_SRC], { type: "text/javascript" })));
    } catch (e) { reject(e); return; }
    let settled = false;
    worker.onmessage = (ev) => {
      const m = ev.data;
      if (m.type === "ready") {
        settled = true;
        resolve(markEngineReady({
          mode: "worker", worker: worker, seq: 0, handlers: {},
          send: msg => worker.postMessage(msg)
        }, m.version));
      } else if (m.type === "error") {
        if (!settled) { settled = true; reject(new Error(m.message || "engine failed to load")); }
      } else {
        handleEngineMessage(m);
      }
    };
    worker.onerror = (ev) => {
      if (ev && ev.preventDefault) ev.preventDefault();
      if (!settled) { settled = true; reject(new Error((ev && ev.message) || "worker failed to start")); }
    };
    worker.postMessage({ type: "load" });
  });
}

async function startMainEngine() {
  if (!globalThis.loadPyodide) {
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = PYODIDE_CDN + "pyodide.js";
      s.onload = resolve;
      s.onerror = () => reject(new Error("could not download the Python engine from " + PYODIDE_CDN));
      document.head.appendChild(s);
    });
  }
  if (!globalThis.loadPyodide) throw new Error("Python engine is unavailable");
  const makeCore = new Function(CORE_SRC + "\nreturn makeZenCore;")();
  const core = makeCore(handleEngineMessage);
  const version = await core.load();
  return markEngineReady({ mode: "main", core: core, seq: 0, handlers: {}, send: msg => core.handle(msg) }, version);
}

async function startEngine() {
  if (!workerFailed) {
    try {
      return await startWorkerEngine();
    } catch (e) {
      console.warn("ZEN TUTOR: worker engine unavailable (" + (e && e.message || e) + ") — switching to main-thread engine.");
      workerFailed = true;
    }
  }
  return startMainEngine();
}

function ensureEngine() {
  if (engine) return Promise.resolve(engine);
  if (!engineLoading) {
    engineLoading = startEngine().catch(e => {
      engineLoading = null;
      engineChip.textContent = "ENGINE: OFFLINE";
      engineChip.className = "engine-chip error";
      console.error("ZEN TUTOR: Python engine failed to load:", e);
      throw e;
    });
  }
  return engineLoading;
}
ensureEngine().catch(() => {});

/* watchdog — recovers if a program never finishes (infinite loop) */
const RUN_TIMEOUT_MS = 30000;
let runWatchdog = null;
function clearRunWatchdog() {
  if (runWatchdog) { clearTimeout(runWatchdog); runWatchdog = null; }
}
function abortRun(msg) {
  clearRunWatchdog();
  const eng = engine;
  if (eng && eng.mode === "worker") {
    try { eng.worker.terminate(); } catch (e) {}
    engine = null;
  }
  Object.keys(eng ? eng.handlers : {}).forEach(k => {
    const h = eng.handlers[k];
    delete eng.handlers[k];
    h.onDone(false, msg);
  });
  engineChip.textContent = "ENGINE: RESET";
  engineChip.className = "engine-chip error";
}

function runCode(code, inputs) {
  return ensureEngine().then(eng =>
    new Promise(resolve => {
      const seq = ++eng.seq;
      let output = "";
      eng.handlers[seq] = {
        onLine: (stream, t) => {
          output += (output ? "\n" : "") + t;
          appendConsole(t, stream === "err" ? "c-err" : "c-out");
        },
        onDone: (ok, error) => {
          delete eng.handlers[seq];
          clearRunWatchdog();
          resolve({ ok: ok, output: output, error: error || "" });
        }
      };
      eng.send({ type: "run", seq: seq, code: code, inputs: inputs || [] });
      clearRunWatchdog();
      runWatchdog = setTimeout(() => {
        if (engine && engine.handlers[seq]) {
          abortRun("Program stopped after 30s — possible infinite loop. The engine was restarted; press RUN to try again.");
        } else {
          clearRunWatchdog();
        }
      }, RUN_TIMEOUT_MS);
    })
  );
}

/* ---------- run + check flow ---------- */
function needsInput(code) { return /\binput\s*\(/.test(code); }
function normOut(s) {
  return (s || "").replace(/\r/g, "")
    .split("\n").map(l => l.replace(/\s+$/, "")).join("\n")
    .replace(/^\n+/, "").replace(/\n+$/, "").trim();
}
function shortError(err) {
  const lines = String(err).split("\n").filter(l => l.trim());
  return lines.slice(-6).join("\n");
}
function setRunning(on) {
  running = on;
  $("runBtn").disabled = on;
  $("checkBtn").disabled = on;
  botStatus.textContent = on ? "busy" : "online";
  botStatus.className = "bot-status" + (on ? " busy" : "");
}
async function doRunFromEditor() {
  if (running) return;
  const code = codeTA.value;
  if (!code.trim()) { appendConsole("NOTHING TO RUN — EDITOR IS EMPTY", "c-info"); return; }
  if (needsInput(code)) {
    inputRow.hidden = false;
    inputValues.focus();
    appendConsole("This program needs input() values — fill the panel below, then RUN WITH INPUT.", "c-info");
    setOutStatus("WAITING FOR INPUT", "running");
    return;
  }
  await execute(code, []);
}
async function execute(code, inputs) {
  runCount++;
  setRunning(true);
  setOutStatus("RUNNING", "running");
  appendConsole("▶ RUN " + runCount, "c-sys");
  try {
    const res = await runCode(code, inputs);
    if (res.ok) {
      setOutStatus("OK", "ok");
      appendConsole("— finished —", "c-info");
    } else {
      setOutStatus("ERROR", "err");
      appendConsole(shortError(res.error), "c-err");
    }
    return res;
  } catch (e) {
    setOutStatus("ENGINE ERROR", "err");
    appendConsole("Python engine could not load. Check your internet connection and reload.", "c-err");
    return { ok: false, output: "", error: String(e) };
  } finally {
    setRunning(false);
  }
}

/* =========================================================
   ZEN BOT — chat panel
   ========================================================= */
let botQueue = Promise.resolve();
function addMsg(kind, who) {
  const wrap = document.createElement("div");
  wrap.className = "msg " + kind;
  const av = document.createElement("div");
  av.className = "m-av";
  av.textContent = who === "bot" ? "ZB" : "YOU";
  const body = document.createElement("div");
  body.className = "m-body";
  const name = document.createElement("div");
  name.className = "m-name";
  name.textContent = who === "bot" ? "ZEN BOT" : "YOU";
  const text = document.createElement("div");
  text.className = "m-text";
  body.appendChild(name);
  body.appendChild(text);
  wrap.appendChild(av);
  wrap.appendChild(body);
  botChat.appendChild(wrap);
  botChat.scrollTop = botChat.scrollHeight;
  return text;
}
function botSay(text, cls) {
  botQueue = botQueue.then(() => new Promise(resolve => {
    const el = addMsg(cls || "bot", "bot");
    const step = Math.max(1, Math.floor(text.length / 240));
    let i = 0;
    const timer = setInterval(() => {
      i += step;
      el.textContent = text.slice(0, i);
      botChat.scrollTop = botChat.scrollHeight;
      if (i >= text.length) {
        clearInterval(timer);
        el.textContent = text;
        resolve();
      }
    }, 16);
  }));
  return botQueue;
}
function botShow(text, extraHtml, cls) {
  botQueue = botQueue.then(() => {
    const el = addMsg(cls || "bot", "bot");
    el.textContent = text;
    if (extraHtml) el.insertAdjacentHTML("beforeend", extraHtml);
    botChat.scrollTop = botChat.scrollHeight;
  });
  return botQueue;
}
function codeBlockHtml(code) {
  return '<div class="m-expected">' +
    String(code).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") +
    "</div>";
}
function outBlockHtml(out) {
  return '<div class="m-expected">EXPECTED OUTPUT:\n' +
    String(out).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") +
    "</div>";
}

/* ---------- lesson loading ---------- */
function skeletonFor(L) {
  return "# Lesson " + L.num + ": " + L.title + "\n# Chapter: " + catName(L.cat) +
    "\n# Write your program below, then press RUN (Ctrl+Enter):\n\n";
}
function taskText(L) {
  let out = (L.output || "").trim();
  const lines = out.split("\n");
  if (lines.length > 10) out = lines.slice(0, 10).join("\n") + "\n...";
  return "TASK " + L.num + " — " + L.title + "\n\nWrite a Python program for this lesson. " +
    "Read the THEORY and WHY IT WORKS sections above first.\n\n" +
    "Your program's output should be exactly:";
}
function markDone(id) {
  if (doneSet.has(id)) return false;
  doneSet.add(id);
  lsSet(LS_DONE, Array.from(doneSet));
  updateProgressUI();
  updateTicks();
  return true;
}
function updateProgressUI() {
  const n = doneSet.size, total = ALL.length;
  const pct = total ? Math.round(n / total * 100) : 0;
  headerProgress.textContent = n + " / " + total + " DONE";
  progressFill.style.width = pct + "%";
  progressText.textContent = n + " / " + total + " (" + pct + "%)";
}
function loadLesson(i, keepChat) {
  cur = Math.max(0, Math.min(ALL.length - 1, i));
  const L = ALL[cur];
  lsSet(LS_LAST, cur);
  lessonNumEl.textContent = String(L.num).padStart(3, "0") + " / " + ALL.length;
  lessonTitleEl.textContent = L.title;
  lessonCatEl.textContent = catName(L.cat) + " · " + levelOf(L.cat);
  theoryBody.textContent = L.desc || "";
  whyBody.textContent = L.explain || "";
  refCode.innerHTML = hl(L.code);
  refCode.classList.add("blurred");
  revealBtn.textContent = "REVEAL";
  codeTA.value = codeStore[L.id] !== undefined ? codeStore[L.id] : skeletonFor(L);
  renderEditor();
  inputRow.hidden = true;
  inputValues.value = "";
  setOutStatus("IDLE", "");
  nextLessonBtn.classList.remove("pulse");
  updateRailActive();
  if (!keepChat) {
    botChat.innerHTML = "";
    botSay("New lesson loaded: " + L.title + ". " +
      "Theory and the reason behind the code are on the left. I have a task for you.");
    botShow(taskText(L), outBlockHtml(L.output));
    botSay("Write the program in the editor on the right, press RUN to see its output, " +
      "then press RUN & CHECK — I will verify it. Stuck? Ask for a HINT.");
  }
}

/* ---------- check / hint / solution ---------- */
async function runAndCheck() {
  if (running) return;
  const L = ALL[cur];
  const code = codeTA.value;
  if (!code.trim()) {
    botShow("Your editor is empty. Write the program first, then press RUN & CHECK.", null, "fail");
    return;
  }
  if (needsInput(code) && inputRow.hidden) {
    inputRow.hidden = false;
    inputValues.focus();
    appendConsole("This program needs input() values — fill the panel below, then RUN WITH INPUT (or RUN & CHECK again after filling).", "c-info");
    setOutStatus("WAITING FOR INPUT", "running");
    botShow("Your program calls input() — I opened the input panel under the output. " +
      "Type one value per line, then press RUN WITH INPUT.", null, "hintmsg");
    return;
  }
  botShow("Checking your code — running it now...");
  let inputs = [];
  if (needsInput(code)) {
    inputs = inputValues.value.split("\n").map(s => s.trim()).filter(s => s.length);
  }
  const res = await execute(code, inputs);
  if (!res.ok) {
    botShow("Your code crashed:\n" + shortError(res.error) +
      "\n\nRead the error line carefully — it names the problem and the line number. Fix it and check again.", null, "fail");
    return;
  }
  const got = normOut(res.output);
  const want = normOut(L.output);
  if (got === want) {
    const first = markDone(L.id);
    botShow((first ? "PASS ✔ Task " + L.num + " complete — output matches perfectly. " :
      "PASS ✔ Correct again — output matches. ") +
      "Press NEXT LESSON when you are ready to continue.", null, "pass");
    nextLessonBtn.classList.add("pulse");
  } else {
    botShow("Your code ran, but the output does not match yet.\n\n" +
      "YOUR OUTPUT:\n" + (got || "(nothing printed)") + "\n\n" +
      "EXPECTED:\n" + want + "\n\n" +
      "Compare them line by line — check spelling, quotes and commas. " +
      "Need the idea? Press HINT. (Note: lessons using random() may differ on purpose.)", null, "fail");
  }
}
function giveHint() {
  const L = ALL[cur];
  botShow("HINT — why this code works:\n" + (L.explain || "Re-read the theory above.") +
    "\n\nThe reference code (hidden on the left, press REVEAL) shows one way to do it. " +
    "Try writing it in your own words first.", null, "hintmsg");
}
function giveSolution() {
  const L = ALL[cur];
  botShow("One working solution — type it yourself instead of copy-pasting, " +
    "your fingers learn faster than your eyes:", codeBlockHtml(L.code));
  botSay("After trying it, change something small (a string, a number) and see what happens — that is how the lesson sticks.");
}

/* =========================================================
   CHAPTER RAIL
   ========================================================= */
const tickMap = new Map();   // lesson id -> tick element
const lessonBtnMap = new Map(); // lesson id -> button element
const chapMap = new Map();   // cat id -> chapter element

function buildRail() {
  railNav.innerHTML = "";
  tickMap.clear();
  lessonBtnMap.clear();
  chapMap.clear();
  CATS.forEach(cat => {
    const lessons = ALL.filter(l => l.cat === cat.id);
    if (!lessons.length) return;
    const chap = document.createElement("div");
    chap.className = "rail-chap";
    const head = document.createElement("button");
    head.className = "rail-chap-head";
    head.innerHTML = '<span class="chap-icon">' + cat.icon + '</span>' +
      '<span class="chap-name">' + cat.name + '</span>' +
      '<span class="chap-count">' + lessons.length + '</span>';
    head.addEventListener("click", () => {
      const wasOpen = chap.classList.contains("open");
      chap.classList.toggle("open", !wasOpen);
    });
    const list = document.createElement("div");
    list.className = "rail-lessons";
    lessons.forEach(L => {
      const btn = document.createElement("button");
      btn.className = "rail-lesson";
      btn.title = L.title;
      const tick = document.createElement("span");
      tick.className = "tick";
      tick.textContent = doneSet.has(L.id) ? "✔" : "";
      const t = document.createElement("span");
      t.className = "lt";
      t.textContent = L.num + ". " + L.title;
      btn.appendChild(tick);
      btn.appendChild(t);
      btn.addEventListener("click", () => loadLesson(L.num - 1));
      list.appendChild(btn);
      tickMap.set(L.id, tick);
      lessonBtnMap.set(L.id, btn);
    });
    chap.appendChild(head);
    chap.appendChild(list);
    railNav.appendChild(chap);
    chapMap.set(cat.id, chap);
  });
  updateRailActive();
}
function updateRailActive() {
  const L = ALL[cur];
  if (!L) return;
  lessonBtnMap.forEach((btn, id) => btn.classList.toggle("active", id === L.id));
  const chap = chapMap.get(L.cat);
  if (chap) chap.classList.add("open");
  const btn = lessonBtnMap.get(L.id);
  if (btn && railScroll) {
    const top = btn.getBoundingClientRect().top;
    const box = railScroll.getBoundingClientRect();
    if (top < box.top || top > box.bottom) btn.scrollIntoView({ block: "center" });
  }
}
function updateTicks() {
  tickMap.forEach((tick, id) => { tick.textContent = doneSet.has(id) ? "✔" : ""; });
}
railSearch.addEventListener("input", () => {
  const q = railSearch.value.trim().toLowerCase();
  chapMap.forEach((chap, catId) => {
    let any = false;
    lessonBtnMap.forEach((btn, id) => {
      const L = ALL.find(x => x.id === id);
      const matchCat = L && L.cat === catId;
      if (!matchCat) return;
      const show = !q || (L && L.title.toLowerCase().includes(q));
      btn.style.display = show ? "" : "none";
      if (show) any = true;
    });
    chap.style.display = any ? "" : "none";
    if (q && any) chap.classList.add("open");
  });
});

/* =========================================================
   DIVIDER DRAG — resize the two halves
   ========================================================= */
let dragging = false;
divider.addEventListener("pointerdown", (e) => {
  dragging = true;
  document.body.classList.add("dragging");
  divider.setPointerCapture(e.pointerId);
});
divider.addEventListener("pointermove", (e) => {
  if (!dragging) return;
  const rect = split.getBoundingClientRect();
  let pct = (e.clientX - rect.left) / rect.width * 100;
  pct = Math.max(24, Math.min(76, pct));
  leftHalf.style.flex = "0 0 " + pct + "%";
});
divider.addEventListener("pointerup", () => {
  dragging = false;
  document.body.classList.remove("dragging");
});

/* =========================================================
   THEME SWITCHER — dark / light / system
   ========================================================= */
const THEME_KEY = "zt_theme";
const themeBox = $("themeBox");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const themeMq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;

function themePrefLoad() {
  try { return localStorage.getItem(THEME_KEY) || "system"; } catch (e) { return "system"; }
}
function themePrefSave(p) {
  try { localStorage.setItem(THEME_KEY, p); } catch (e) {}
}
function resolveTheme(pref) {
  if (pref === "light" || pref === "dark") return pref;
  return (themeMq && themeMq.matches) ? "light" : "dark";
}
let themePref = themePrefLoad();
function applyTheme(pref) {
  const resolved = resolveTheme(pref);
  document.documentElement.setAttribute("data-theme", resolved);
  themeBox.querySelectorAll(".theme-btn").forEach(b => {
    const on = b.dataset.theme === pref;
    b.classList.toggle("active", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
  if (themeMeta) themeMeta.setAttribute("content", resolved === "light" ? "#f5f4fa" : "#050507");
}
applyTheme(themePref);
themeBox.addEventListener("click", (e) => {
  stopThemeShine();
  const btn = e.target.closest(".theme-btn");
  if (!btn) return;
  themePref = btn.dataset.theme || "system";
  themePrefSave(themePref);
  applyTheme(themePref);
});
if (themeMq && themeMq.addEventListener) {
  themeMq.addEventListener("change", () => { if (themePref === "system") applyTheme("system"); });
}
/* shine — the box starts glowing 3 seconds after load, until it is used */
let themeShineTimer = setTimeout(() => themeBox.classList.add("shine"), 3000);
let themeShineCap = setTimeout(stopThemeShine, 18000);
function stopThemeShine() {
  clearTimeout(themeShineTimer);
  clearTimeout(themeShineCap);
  themeBox.classList.remove("shine");
}

/* =========================================================
   EVENTS + INIT
   ========================================================= */
$("prevBtn").addEventListener("click", () => loadLesson(cur - 1));
$("nextBtn").addEventListener("click", () => loadLesson(cur + 1));
nextLessonBtn.addEventListener("click", () => loadLesson(cur + 1));
$("runBtn").addEventListener("click", doRunFromEditor);
$("checkBtn").addEventListener("click", runAndCheck);
$("hintBtn").addEventListener("click", giveHint);
$("solutionBtn").addEventListener("click", giveSolution);
$("resetBtn").addEventListener("click", () => {
  codeTA.value = skeletonFor(ALL[cur]);
  renderEditor();
  onEditorInput();
  appendConsole("Editor reset to the lesson skeleton.", "c-info");
});
$("clearBtn").addEventListener("click", () => { codeTA.value = ""; renderEditor(); });
$("clearBtn").addEventListener("click", onEditorInput);
$("outClearBtn").addEventListener("click", clearConsole);
revealBtn.addEventListener("click", () => {
  const hidden = refCode.classList.toggle("blurred");
  revealBtn.textContent = hidden ? "REVEAL" : "HIDE";
  if (!hidden) botShow("Solution revealed on the left. Type it in the editor yourself, then RUN & CHECK.");
});
$("inputCancelBtn").addEventListener("click", () => { inputRow.hidden = true; setOutStatus("IDLE", ""); });
$("inputRunBtn").addEventListener("click", async () => {
  if (running) return;
  const code = codeTA.value;
  const inputs = inputValues.value.split("\n").map(s => s.trim()).filter(s => s.length);
  inputRow.hidden = true;
  await execute(code, inputs);
});

updateProgressUI();
buildRail();
loadLesson(Math.min(lsGet(LS_LAST, 0), ALL.length - 1));
botSay("Welcome to ZENTHON TUTOR. I give you small Python tasks; you write the code on the right half and run it live. " +
  "Left half = theory + the reason behind every line. Finish a task and I mark it done. " +
  "Use the chapter rail to jump around — basics to advanced, " + ALL.length + " lessons in total.");

