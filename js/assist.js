/* ============ ZEN ASSIST — OPENCODE CLONE (MiMo V2.5 Free via OpenRouter) ============ */

const ASSIST_API_KEY = "zxd-assist-key";
const ASSIST_HISTORY = "zxd-assist-history";
const MIMO_MODEL = "moonshotai/mimo-v2.5-free:free";

let assistConversation = [];
let assistStreaming = false;

const assistModal = document.getElementById("assistModal");
const assistBtn = document.getElementById("assistBtn");
const assistClose = document.getElementById("assistClose");
const assistMessages = document.getElementById("assistMessages");
const assistInput = document.getElementById("assistInput");
const assistSend = document.getElementById("assistSend");
const apiKeyInput = document.getElementById("apiKeyInput");
const saveApiKey = document.getElementById("saveApiKey");

/* ---------- load saved data ---------- */
function loadAssistKey() {
  return localStorage.getItem(ASSIST_API_KEY) || "";
}

function loadAssistHistory() {
  try {
    const raw = localStorage.getItem(ASSIST_HISTORY);
    if (raw) assistConversation = JSON.parse(raw);
  } catch (e) { assistConversation = []; }
}

function saveAssistHistory() {
  try { localStorage.setItem(ASSIST_HISTORY, JSON.stringify(assistConversation)); } catch (e) {}
}

/* ---------- modal ---------- */
assistBtn.addEventListener("click", () => {
  assistModal.classList.add("show");
  assistInput.focus();
  loadAssistKey();
  renderAllMessages();
});

function closeAssist() {
  assistModal.classList.remove("show");
  if (assistStreaming) return;
}

assistClose.addEventListener("click", closeAssist);
window.addEventListener("keydown", (ev) => {
  if (ev.key === "Escape" && assistModal.classList.contains("show")) closeAssist();
});

/* ---------- api key ---------- */
apiKeyInput.value = loadAssistKey();

saveApiKey.addEventListener("click", () => {
  const key = apiKeyInput.value.trim();
  if (key) {
    localStorage.setItem(ASSIST_API_KEY, key);
    zenSay("API KEY SAVED! ZEN ASSIST IS READY!");
  } else {
    zenSay("ENTER A VALID API KEY!");
  }
});

/* ---------- rendering ---------- */
function renderAllMessages() {
  const savedHtml = localStorage.getItem(ASSIST_HISTORY + "-html");
  if (savedHtml && assistConversation.length > 0) {
    assistMessages.innerHTML = savedHtml;
    assistMessages.scrollTop = assistMessages.scrollHeight;
    return;
  }
  if (assistConversation.length === 0) {
    const welcome = assistMessages.querySelector(".assist-msg");
    if (welcome) assistMessages.innerHTML = "";
  }
}

function appendMessage(role, text) {
  const msg = document.createElement("div");
  msg.className = "assist-msg " + role;

  const avatar = document.createElement("div");
  avatar.className = "assist-avatar";
  avatar.textContent = role === "user" ? "U" : "Z";

  const bubble = document.createElement("div");
  bubble.className = "assist-bubble";
  bubble.innerHTML = formatAssistMarkdown(text);

  msg.append(avatar, bubble);
  assistMessages.appendChild(msg);
  assistMessages.scrollTop = assistMessages.scrollHeight;
  return bubble;
}

function appendTyping() {
  const msg = document.createElement("div");
  msg.className = "assist-msg assistant";
  msg.id = "assistTyping";

  const avatar = document.createElement("div");
  avatar.className = "assist-avatar";
  avatar.textContent = "Z";

  const bubble = document.createElement("div");
  bubble.className = "assist-bubble";
  const typing = document.createElement("div");
  typing.className = "assist-typing";
  typing.innerHTML = "<span></span><span></span><span></span>";
  bubble.appendChild(typing);

  msg.append(avatar, bubble);
  assistMessages.appendChild(msg);
  assistMessages.scrollTop = assistMessages.scrollHeight;
  return bubble;
}

function removeTyping() {
  const el = document.getElementById("assistTyping");
  if (el) el.remove();
}

/* ---------- simple markdown for code blocks ---------- */
function formatAssistMarkdown(text) {
  let s = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  s = s.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return '<pre><code>' + code.trim() + '</code></pre>';
  });

  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*(.+?)\*/g, '<em>$1</em>');

  return s;
}

/* ---------- save conversation ---------- */
function saveConversationHtml() {
  try {
    localStorage.setItem(ASSIST_HISTORY + "-html", assistMessages.innerHTML);
  } catch (e) {}
}

/* ---------- send message ---------- */
assistSend.addEventListener("click", sendAssistMessage);

assistInput.addEventListener("keydown", (ev) => {
  if ((ev.ctrlKey || ev.metaKey) && ev.key === "Enter") {
    ev.preventDefault();
    sendAssistMessage();
  }
});

function sendAssistMessage() {
  if (assistStreaming) return;

  const text = assistInput.value.trim();
  if (!text) return;

  const apiKey = loadAssistKey();
  if (!apiKey) {
    zenSay("SET YOUR OPENROUTER API KEY FIRST!");
    apiKeyInput.focus();
    return;
  }

  appendMessage("user", text);
  assistConversation.push({ role: "user", content: text });
  assistInput.value = "";
  assistInput.style.height = "auto";

  const typingBubble = appendTyping();
  assistStreaming = true;
  assistSend.textContent = "STOP";
  assistSend.classList.add("red");

  streamMimoResponse(apiKey, typingBubble);
}

assistInput.addEventListener("input", () => {
  assistInput.style.height = "auto";
  assistInput.style.height = Math.min(assistInput.scrollHeight, 100) + "px";
});

/* ---------- OpenRouter API with streaming ---------- */
async function streamMimoResponse(apiKey, typingBubble) {
  const systemMsg = {
    role: "system",
    content: [
      "You are ZEN ASSIST, an AI coding assistant inside ZENTHON — a Python learning platform.",
      "You are powered by MiMo V2.5 Free (moonshotai/mimo-v2.5-free) via OpenRouter.",
      "Your job is to help users with Python programming, code explanation, debugging, and learning concepts.",
      "Be concise, helpful, and use code examples when appropriate.",
      "Use markdown formatting: **bold**, *italic*, `inline code`, and ```language code blocks```.",
      "Keep responses focused and educational."
    ].join(" ")
  };

  const messages = [systemMsg, ...assistConversation.slice(-20)];

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://zenthon.github.io",
        "X-Title": "ZEN ASSIST"
      },
      body: JSON.stringify({
        model: MIMO_MODEL,
        messages: messages,
        stream: true,
        max_tokens: 2048,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || "API request failed (" + response.status + ")");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = "";
    let buffer = "";

    typingBubble.innerHTML = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop();

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith("data: ")) continue;
        const payload = trimmed.slice(6);
        if (payload === "[DONE]") continue;

        try {
          const json = JSON.parse(payload);
          const delta = json.choices?.[0]?.delta?.content;
          if (delta) {
            fullText += delta;
            typingBubble.innerHTML = formatAssistMarkdown(fullText);
            assistMessages.scrollTop = assistMessages.scrollHeight;
          }
        } catch (e) {}
      }
    }

    removeTyping();

    if (fullText) {
      appendMessage("assistant", fullText);
      assistConversation.push({ role: "assistant", content: fullText });
      saveConversationHtml();
      saveAssistHistory();
    } else {
      appendMessage("assistant", "[NO RESPONSE FROM MiMo V2.5 — CHECK YOUR API KEY OR MODEL]");
    }

  } catch (err) {
    removeTyping();
    const errMsg = "ERROR: " + String(err.message || err);
    appendMessage("assistant", errMsg);
    zenSay("ZEN ASSIST ENCOUNTERED AN ERROR!");
  }

  assistStreaming = false;
  assistSend.textContent = "SEND";
  assistSend.classList.remove("red");
}

/* ---------- clear history ---------- */
function clearAssistHistory() {
  assistConversation = [];
  localStorage.removeItem(ASSIST_HISTORY);
  localStorage.removeItem(ASSIST_HISTORY + "-html");
  assistMessages.innerHTML = "";
  const welcome = document.createElement("div");
  welcome.className = "assist-msg assistant";
  welcome.innerHTML = '<div class="assist-avatar">Z</div><div class="assist-bubble">HISTORY CLEARED! HOW CAN I HELP?</div>';
  assistMessages.appendChild(welcome);
}

/* ---------- init ---------- */
loadAssistHistory();
if (assistConversation.length > 0) {
  renderAllMessages();
}
