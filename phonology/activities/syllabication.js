// phonology/activities/syllabication.js

// --- Two-page navigation ---
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const toPage2Btn = document.getElementById("toPage2");
const backToPage1Btn = document.getElementById("backToPage1");

toPage2Btn?.addEventListener("click", () => {
  page1?.classList.remove("active");
  page2?.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

backToPage1Btn?.addEventListener("click", () => {
  page2?.classList.remove("active");
  page1?.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- Check syllables ---
const correctSyllables = {
  word2: ["Bas", "ket"],
  word3: ["Pup", "pet"],
  word4: ["Let", "ter"],
};

function checkSyllables() {
  let score = 0;

  Object.keys(correctSyllables).forEach((key) => {
    const aEl = document.getElementById(key + "a");
    const bEl = document.getElementById(key + "b");

    if (!aEl || !bEl) return;

    const userA = aEl.value.trim().toLowerCase();
    const userB = bEl.value.trim().toLowerCase();

    const correctA = correctSyllables[key][0].toLowerCase();
    const correctB = correctSyllables[key][1].toLowerCase();

    const isCorrect = userA === correctA && userB === correctB;

    if (isCorrect) {
      score += 1;
      aEl.style.borderColor = "#2e7d32";
      bEl.style.borderColor = "#2e7d32";
    } else {
      aEl.style.borderColor = "#c62828";
      bEl.style.borderColor = "#c62828";
    }
  });

  const result = document.getElementById("syllable-result");
  if (!result) return;

  result.textContent =
    score === 3
      ? "Excellent! ✅ You got all correct!"
      : `You got ${score}/3 correct. Try again! ❌`;

  result.style.color = score === 3 ? "green" : "red";
}

document.getElementById("checkBtn")?.addEventListener("click", checkSyllables);

// Reset borders as user types
document.getElementById("syllable-form")?.addEventListener("input", (e) => {
  const target = e.target;
  if (target && target.tagName === "INPUT" && !target.readOnly) {
    target.style.borderColor = "rgba(0,0,0,0.25)";
  }
});

// --- Text-to-speech for word tiles ---
function readWord(word) {
  if (!("speechSynthesis" in window)) return;

  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  utterance.rate = 0.85;

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

document.querySelectorAll(".word").forEach((btn) => {
  btn.addEventListener("click", () => readWord(btn.textContent || ""));
});

// --- Finish Level 1 ---
document.getElementById("finishBtn")?.addEventListener("click", () => {
  // From: /phonology/level-1/syllabication.html
  // To:   /phonology/index.html
  window.location.href = "../index.html";
});

