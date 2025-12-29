// phonology/activities/phonetic-focus.js

// ===== Content =====
const words = ["cat", "bat", "map", "van", "jam", "wax", "rat", "bag", "tag", "lap"];
const selectedWords = words.slice(0, 4);

// ===== Helpers =====
function setActivePage(pageNumber) {
  document.querySelectorAll(".lesson-page").forEach((p) => p.classList.remove("active"));
  const page = document.getElementById(`page-${pageNumber}`);
  if (page) page.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function speakWord(word) {
  if (!("speechSynthesis" in window)) {
    alert("Your browser does not support text-to-speech.");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  utterance.rate = 0.8;
  speechSynthesis.cancel(); // stops stacking
  speechSynthesis.speak(utterance);
}

function playAudio(word) {
  // IMPORTANT: this path is relative to phonology/level-1/phonetic-focus.html
  // So audio should live at: phonology/level-1/audio/<word>.mp3
  const audio = new Audio(`audio/${word}.mp3`);
  audio.play().catch(() => alert(`Audio file for '${word}' not found.`));
}

function generateWordList() {
  const wordListContainer = document.getElementById("word-list");
  if (!wordListContainer) return;

  wordListContainer.innerHTML = "";
  words.forEach((word) => {
    const wordDiv = document.createElement("button");
    wordDiv.type = "button";
    wordDiv.className = "word";
    wordDiv.textContent = word;
    wordDiv.addEventListener("click", () => speakWord(word));
    wordListContainer.appendChild(wordDiv);
  });
}

function generateSpellingList() {
  const spellingContainer = document.getElementById("spelling-list");
  if (!spellingContainer) return;

  spellingContainer.innerHTML = "";

  selectedWords.forEach((word, index) => {
    const row = document.createElement("div");
    row.className = "word-audio";

    const label = document.createElement("p");
    label.style.margin = "0";
    label.textContent = `Word ${index + 1}:`;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "play-btn";
    btn.textContent = "🔊 Play";
    btn.addEventListener("click", () => playAudio(word));

    const input = document.createElement("input");
    input.type = "text";
    input.id = `word${index + 1}`;
    input.autocomplete = "off";
    input.spellcheck = false;

    const feedback = document.createElement("span");
    feedback.id = `feedback${index + 1}`;

    row.appendChild(label);
    row.appendChild(btn);
    row.appendChild(input);
    row.appendChild(feedback);

    spellingContainer.appendChild(row);
  });
}

function checkSpelling() {
  selectedWords.forEach((word, index) => {
    const input = document.getElementById(`word${index + 1}`);
    const feedback = document.getElementById(`feedback${index + 1}`);
    if (!input || !feedback) return;

    const userInput = input.value.toLowerCase().trim();
    const correct = userInput === word;

    feedback.textContent = correct ? " ✅" : " ❌";
    feedback.style.color = correct ? "green" : "red";
  });
}

function goNextActivity() {
  window.location.href = "read-spell-focus.html";
}

// ===== Wire up buttons without inline onclick =====
function bindNavButtons() {
  // Next page buttons
  document.querySelectorAll("[data-next-page]").forEach((btn) => {
    btn.addEventListener("click", () => setActivePage(btn.getAttribute("data-next-page")));
  });

  // Prev page buttons
  document.querySelectorAll("[data-prev-page]").forEach((btn) => {
    btn.addEventListener("click", () => setActivePage(btn.getAttribute("data-prev-page")));
  });

  // Check answers
  const checkBtn = document.getElementById("check-answers-btn");
  if (checkBtn) checkBtn.addEventListener("click", checkSpelling);

  // Continue
  const continueBtn = document.getElementById("continue-btn");
  if (continueBtn) continueBtn.addEventListener("click", goNextActivity);
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  generateWordList();
  generateSpellingList();
  bindNavButtons();
});

