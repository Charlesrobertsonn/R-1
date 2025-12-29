// syllabication.js
// Keeps the exact behaviour you had, just moved out of HTML.

document.addEventListener("DOMContentLoaded", () => {
  // --- Two-page navigation ---
  const page1 = document.getElementById("page1");
  const page2 = document.getElementById("page2");

  const toPage2Btn = document.getElementById("toPage2");
  const backToPage1Btn = document.getElementById("backToPage1");

  if (toPage2Btn) {
    toPage2Btn.addEventListener("click", () => {
      page1?.classList.remove("active");
      page2?.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (backToPage1Btn) {
    backToPage1Btn.addEventListener("click", () => {
      page2?.classList.remove("active");
      page1?.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

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
        score++;
        aEl.style.borderColor = "#15803d";
        bEl.style.borderColor = "#15803d";
      } else {
        aEl.style.borderColor = "#b91c1c";
        bEl.style.borderColor = "#b91c1c";
      }
    });

    const result = document.getElementById("syllable-result");
    if (result) {
      result.textContent =
        score === 3
          ? "Excellent! ✅ You got all correct!"
          : `You got ${score}/3 correct. Try again! ❌`;

      result.style.color = score === 3 ? "#15803d" : "#b91c1c";
    }
  }

  const checkBtn = document.getElementById("checkBtn");
  if (checkBtn) checkBtn.addEventListener("click", checkSyllables);

  // Reset borders as user types
  const form = document.getElementById("syllable-form");
  if (form) {
    form.addEventListener("input", (e) => {
      const t = e.target;
      if (t && t.tagName === "INPUT" && !t.readOnly) {
        t.style.borderColor = "#cfcfcf";
      }
    });
  }

  // --- Text-to-speech for word tiles ---
  function readWord(word) {
    if (!("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-AU";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }

  document.querySelectorAll(".word").forEach((wordEl) => {
    wordEl.addEventListener("click", () => readWord(wordEl.textContent.trim()));
  });

  // --- Finish button ---
  // If your HTML uses onclick="finishLevel()", keep it working:
  window.finishLevel = function finishLevel() {
    window.location.href = "../index.html"; // back to phonology level list
  };
});


