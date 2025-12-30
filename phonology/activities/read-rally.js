/* phonology/activities/read-rally.js */

let stopwatchInterval = null;
let elapsedTime = 0;
let isRunning = false;

const timerText = document.getElementById("timerText");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const wordListEl = document.getElementById("wordList");
const sentenceListEl = document.getElementById("sentenceList");
const togglePhonemesBtn = document.getElementById("togglePhonemesBtn");

const words = [
  { word: "Dip", phonemes: "/d/ /i/ /p/" },
  { word: "Lip", phonemes: "/l/ /i/ /p/" },
  { word: "Sip", phonemes: "/s/ /i/ /p/" },
  { word: "Tip", phonemes: "/t/ /i/ /p/" },
  { word: "Hip", phonemes: "/h/ /i/ /p/" },
  { word: "Rip", phonemes: "/r/ /i/ /p/" },
  { word: "Mat", phonemes: "/m/ /a/ /t/" },
  { word: "Bat", phonemes: "/b/ /a/ /t/" },
  { word: "Cat", phonemes: "/c/ /a/ /t/" },
  { word: "Pat", phonemes: "/p/ /a/ /t/" }
];

const sentences = [
  "Tim sips his drink.",
  "The tip of the lip.",
  "Max has a big bag.",
  "Bill hits a bat.",
  "A pig digs and a cat sits."
];

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `Time: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startStopwatch() {
  if (isRunning) return;
  isRunning = true;

  const startTime = Date.now() - elapsedTime;
  stopwatchInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    timerText.textContent = formatTime(elapsedTime);
  }, 100);
}

function pauseStopwatch() {
  if (stopwatchInterval) clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  isRunning = false;
}

function resetStopwatch() {
  pauseStopwatch();
  elapsedTime = 0;
  timerText.textContent = "Time: 0:00";
}

function speakText(text) {
  // Prefer shared safeSpeak if available
  if (typeof window.safeSpeak === "function") {
    window.safeSpeak(text, { lang: "en-US", rate: 0.9 });
    return;
  }

  // Fallback
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
}

function populateWordGrid(listEl, items) {
  listEl.innerHTML = "";

  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "word";
    div.setAttribute("role", "button");
    div.setAttribute("tabindex", "0");
    div.setAttribute("aria-label", `Speak word ${item.word}`);

    div.innerHTML = `
      <div class="word-text">${item.word}</div>
      <div class="phonemes hidden">${item.phonemes}</div>
      <span class="audio" aria-hidden="true">🔊</span>
    `;

    const activate = () => speakText(item.word);

    div.addEventListener("click", activate);
    div.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    });

    listEl.appendChild(div);
  });
}

function populateSentenceList(listEl, items) {
  listEl.innerHTML = "";

  items.forEach((sentence) => {
    const div = document.createElement("div");
    div.className = "sentence";
    div.setAttribute("role", "button");
    div.setAttribute("tabindex", "0");
    div.setAttribute("aria-label", `Speak sentence: ${sentence}`);

    div.innerHTML = `<span>${sentence}</span><span aria-hidden="true">🔊</span>`;

    const activate = () => speakText(sentence);

    div.addEventListener("click", activate);
    div.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    });

    listEl.appendChild(div);
  });
}

// Phoneme toggle
let phonemesVisible = false;

function togglePhonemes() {
  phonemesVisible = !phonemesVisible;

  document.querySelectorAll(".phonemes").forEach((el) => {
    el.classList.toggle("hidden", !phonemesVisible);
  });

  togglePhonemesBtn.textContent = phonemesVisible ? "Hide phonemes" : "Show phonemes";
}

// Wire up UI events
startBtn?.addEventListener("click", startStopwatch);
pauseBtn?.addEventListener("click", pauseStopwatch);
resetBtn?.addEventListener("click", resetStopwatch);
togglePhonemesBtn?.addEventListener("click", togglePhonemes);

// Render content
populateWordGrid(wordListEl, words);
populateSentenceList(sentenceListEl, sentences);
