/* ============ CONQUER — NOTEBOOK MODE (run every program cell by cell) ============ */

const CNQ_STORE = "zxd-conquer-book";

let cnqCells = [];
let cnqRunningAll = false;
let cnqEverRun = false;

const conquerModal = document.getElementById("conquerModal");
const conquerBtn = document.getElementById("conquerBtn");
const conquerClose = document.getElementById("conquerClose");
const cnqNotebook = document.getElementById("cnqNotebook");
const cnqStatus = document.getElementById("cnqStatus");
const cnqRunAllBtn = document.getElementById("cnqRunAll");
const cnqAddCellBtn = document.getElementById("cnqAddCell");
const cnqRestartBtn = document.getElementById("cnqRestart");
const cnqClearOutBtn = document.getElementById("cnqClearOut");
const cnqWipeBtn = document.getElementById("cnqWipe");

const CNQ_WELCOME_1 = "# WELCOME TO CONQUER — RUN YOUR CODE CELL BY CELL.\n# EVERY CELL SHARES ONE LIVE STATE, SO VARIABLES CARRY OVER.\n\nname = \"PYTHON\"\nprint(\"HELLO FROM\", name)";
const CNQ_WELCOME_2 = "# THE LAST EXPRESSION OF A CELL IS SHOWN AS OUTPUT.\n\nname * 3";

/* ---------- storage ---------- */
function cnqLoadBook() {
  try {
    const raw = localStorage.getItem(CNQ_STORE);
    if (raw) {
      const data = JSON.parse(raw);
      if (data && Array.isArray(data.cells)) {
        cnqCells = data.cells.map(c => ({
          code: String(c.code || ""),
          inputs: String(c.inputs || ""),
          out: Array.isArray(c.out) ? c.out : []
        }));
        return;
      }
    }
  } catch (e) {}
  cnqCells = [
    { code: CNQ_WELCOME_1, inputs: "", out: [] },
    { code: CNQ_WELCOME_2, inputs: "", out: [] }
  ];
  cnqSaveBook(); /* persist the welcome book on first visit */
}

function cnqSaveBook() {
  const plain = () => JSON.stringify({
    cells: cnqCells.map(c => ({ code: c.code, inputs: c.inputs, out: c.out }))
  });
  try {
    localStorage.setItem(CNQ_STORE, plain());
  } catch (e) {
    /* quota exceeded — retry without inline images */
    try {
      const slim = JSON.stringify({
        cells: cnqCells.map(c => ({
          code: c.code,
          inputs: c.inputs,
          out: (c.out || []).filter(en => en.t !== "img")
        }))
      });
      localStorage.setItem(CNQ_STORE, slim);
    } catch (e2) {}
  }
}

/* ---------- status ---------- */
function cnqSetStatus(text) {
  if (cnqStatus) cnqStatus.textContent = text;
}

/* ---------- output rendering ---------- */
function cnqCellEl(idx) {
  return cnqNotebook.querySelector('.cnq-cell[data-idx="' + idx + '"]');
}

function cnqOutNode(entry) {
  if (entry.t === "img") {
    const img = document.createElement("img");
    img.src = entry.v;
    img.alt = "OUTPUT PLOT";
    return img;
  }
  const d = document.createElement("div");
  d.className = "cnq-line" + (entry.t && entry.t !== "line" ? " " + entry.t : "");
  d.textContent = entry.v;
  return d;
}

function cnqRenderOut(idx) {
  const el = cnqCellEl(idx);
  if (!el) return;
  const out = el.querySelector(".cnq-out");
  out.innerHTML = "";
  const cell = cnqCells[idx];
  if (!cell.out || !cell.out.length) {
    out.classList.remove("show");
    return;
  }
  out.classList.add("show");
  cell.out.forEach(entry => out.appendChild(cnqOutNode(entry)));
  out.scrollTop = out.scrollHeight;
}

/* ---------- cell rendering ---------- */
function cnqMakeCell(idx) {
  const cell = cnqCells[idx];
  const el = document.createElement("div");
  el.className = "cnq-cell";
  el.dataset.idx = idx;

  const head = document.createElement("div");
  head.className = "cnq-cell-head";

  const num = document.createElement("span");
  num.className = "cnq-cell-num";
  num.textContent = "[ " + (idx + 1) + " ]";

  const runBtn = document.createElement("button");
  runBtn.className = "px-btn green cnq-mini";
  runBtn.textContent = "RUN";
  runBtn.title = "RUN THIS CELL (CTRL+ENTER)";
  runBtn.addEventListener("click", () => cnqRunCell(idx));

  const ioBtn = document.createElement("button");
  ioBtn.className = "px-btn cnq-mini";
  ioBtn.textContent = "IO";
  ioBtn.title = "STDIN LINES FOR input() — ONE PER LINE";
  ioBtn.addEventListener("click", () => el.classList.toggle("show-io"));

  const upBtn = document.createElement("button");
  upBtn.className = "px-btn cnq-mini";
  upBtn.textContent = "^";
  upBtn.title = "MOVE UP";
  upBtn.addEventListener("click", () => cnqMoveCell(idx, -1));

  const downBtn = document.createElement("button");
  downBtn.className = "px-btn cnq-mini";
  downBtn.textContent = "v";
  downBtn.title = "MOVE DOWN";
  downBtn.addEventListener("click", () => cnqMoveCell(idx, 1));

  const delBtn = document.createElement("button");
  delBtn.className = "px-btn red cnq-mini";
  delBtn.textContent = "X";
  delBtn.title = "DELETE CELL";
  delBtn.addEventListener("click", () => cnqDeleteCell(idx));

  const state = document.createElement("span");
  state.className = "cnq-cell-state";
  state.textContent = "IDLE";

  head.append(num, runBtn, ioBtn, upBtn, downBtn, delBtn, state);

  const code = document.createElement("textarea");
  code.className = "cnq-code";
  code.spellcheck = false;
  code.value = cell.code;
  code.placeholder = "# WRITE YOUR PYTHON HERE...";
  code.addEventListener("input", () => {
    cell.code = code.value;
    cnqSaveBook();
  });
  code.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter" && (ev.ctrlKey || ev.shiftKey)) {
      ev.preventDefault();
      cnqRunCell(idx).then(() => {
        if (ev.shiftKey && idx === cnqCells.length - 1 && cell.code.trim()) {
          cnqAddCell(idx + 1, "");
        }
      });
    }
  });

  const inputs = document.createElement("textarea");
  inputs.className = "cnq-inputs";
  inputs.spellcheck = false;
  inputs.value = cell.inputs || "";
  inputs.placeholder = "STDIN — ONE VALUE PER LINE FOR input()...";
  inputs.addEventListener("input", () => {
    cell.inputs = inputs.value;
    cnqSaveBook();
  });

  const out = document.createElement("div");
  out.className = "cnq-out";

  el.append(head, code, inputs, out);
  return el;
}

function cnqRenderBook() {
  cnqNotebook.innerHTML = "";
  if (cnqCells.length === 0) {
    const empty = document.createElement("div");
    empty.className = "cnq-empty";
    empty.textContent = "EMPTY BOOK — ADD A CELL AND START CONQUERING.";
    cnqNotebook.appendChild(empty);
    return;
  }
  cnqCells.forEach((c, i) => {
    const el = cnqMakeCell(i);
    cnqNotebook.appendChild(el);
    cnqRenderOut(i);
  });
}

/* ---------- cell operations ---------- */
function cnqAddCell(afterIdx, code) {
  const at = (afterIdx === undefined || afterIdx === null) ? cnqCells.length : afterIdx;
  cnqCells.splice(at, 0, { code: code || "", inputs: "", out: [] });
  cnqSaveBook();
  cnqRenderBook();
  const el = cnqCellEl(at);
  if (el) {
    el.querySelector(".cnq-code").focus();
    el.scrollIntoView({ block: "nearest" });
  }
}

function cnqDeleteCell(idx) {
  cnqCells.splice(idx, 1);
  cnqSaveBook();
  cnqRenderBook();
}

function cnqMoveCell(idx, dir) {
  const to = idx + dir;
  if (to < 0 || to >= cnqCells.length) return;
  const tmp = cnqCells[idx];
  cnqCells[idx] = cnqCells[to];
  cnqCells[to] = tmp;
  cnqSaveBook();
  cnqRenderBook();
}

/* ---------- execution ---------- */
function cnqRunCell(idx) {
  return new Promise((resolve) => {
    const cell = cnqCells[idx];
    const el = cnqCellEl(idx);
    if (!cell || !el || cnqRunningAll) { resolve(); return; }
    if (!String(cell.code || "").trim()) { resolve(); return; }

    cell.out = [];
    el.classList.remove("ok", "err");
    el.classList.add("running");
    const state = el.querySelector(".cnq-cell-state");
    state.textContent = "RUNNING";
    const out = el.querySelector(".cnq-out");
    out.innerHTML = "";
    out.classList.add("show");

    const push = (entry) => {
      cell.out.push(entry);
      out.appendChild(cnqOutNode(entry));
      out.scrollTop = out.scrollHeight;
    };

    if (!cnqEverRun) {
      push({ t: "info", v: "LOADING PYTHON ENGINE... FIRST RUN TAKES ~10 SECONDS!" });
      cnqSetStatus("BOOTING");
    }
    cnqEverRun = true;

    const inputs = String(cell.inputs || "").split("\n");
    while (inputs.length && inputs[inputs.length - 1] === "") inputs.pop();

    ensureEngine().then((eng) => {
      const seq = eng.seq++;
      eng.handlers[seq] = {
        onLine: (text) => {
          String(text).split("\n").forEach(line => push({ t: "line", v: line }));
        },
        onNbDone: (ok, error, result, images) => {
          delete eng.handlers[seq];
          el.classList.remove("running");
          if (ok) {
            if (result) push({ t: "result", v: result });
            (images || []).forEach(src => push({ t: "img", v: src }));
            el.classList.add("ok");
            state.textContent = "DONE";
            cnqSetStatus("IDLE");
          } else {
            String(error || "ERROR").split("\n").forEach(line => push({ t: "error", v: line }));
            el.classList.add("err");
            state.textContent = "ERROR";
            cnqSetStatus("ERROR");
          }
          cnqSaveBook();
          resolve(ok);
        }
      };
      eng.worker.postMessage({ type: "nbRun", seq: seq, code: cell.code, inputs: inputs });
    }).catch((err) => {
      el.classList.remove("running");
      el.classList.add("err");
      state.textContent = "ERROR";
      push({ t: "error", v: "ENGINE ERROR: " + String((err && err.message) || err) });
      cnqSetStatus("ERROR");
      resolve(false);
    });
  });
}

async function cnqRunAll() {
  if (cnqRunningAll) return;
  cnqRunningAll = true;
  cnqRunAllBtn.textContent = "RUNNING...";
  cnqSetStatus("RUNNING ALL");
  for (let i = 0; i < cnqCells.length; i++) {
    if (String(cnqCells[i].code || "").trim()) {
      await cnqRunCell(i);
    }
  }
  cnqRunningAll = false;
  cnqRunAllBtn.textContent = "RUN ALL";
  cnqSetStatus("IDLE");
}

function cnqRestart() {
  if (engine) {
    try { engine.worker.postMessage({ type: "nbReset" }); } catch (e) {}
  }
  cnqCells.forEach(c => { c.out = []; });
  cnqSaveBook();
  cnqRenderBook();
  cnqSetStatus("RESTARTED");
  zenSay("CONQUER STATE CLEARED — FRESH SESSION!");
}

function cnqClearOutputs() {
  cnqCells.forEach(c => { c.out = []; });
  cnqSaveBook();
  cnqRenderBook();
  cnqSetStatus("IDLE");
}

function cnqWipe() {
  if (!confirm("WIPE THE WHOLE BOOK? ALL CELLS AND OUTPUTS WILL BE LOST!")) return;
  cnqCells = [];
  cnqSaveBook();
  cnqRenderBook();
  cnqSetStatus("WIPED");
}

/* ---------- modal ---------- */
conquerBtn.addEventListener("click", () => {
  conquerModal.classList.add("show");
  cnqRenderBook();
});

function closeConquer() {
  conquerModal.classList.remove("show");
  cnqSaveBook();
}

conquerClose.addEventListener("click", closeConquer);
window.addEventListener("keydown", (ev) => {
  if (ev.key === "Escape" && conquerModal.classList.contains("show")) closeConquer();
});

/* ---------- toolbar ---------- */
cnqRunAllBtn.addEventListener("click", cnqRunAll);
cnqAddCellBtn.addEventListener("click", () => cnqAddCell());
cnqRestartBtn.addEventListener("click", cnqRestart);
cnqClearOutBtn.addEventListener("click", cnqClearOutputs);
cnqWipeBtn.addEventListener("click", cnqWipe);

/* ---------- init ---------- */
cnqLoadBook();