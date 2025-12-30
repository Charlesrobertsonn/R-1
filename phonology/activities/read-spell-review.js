/* phonology/activities/read-spell-review.js */

document.addEventListener("DOMContentLoaded", () => {
  // Review grid words (12)
  const reviewWords = [
    "bat", "mat", "fan", "rat",
    "lap", "cap", "pen", "sun",
    "dog", "cat", "run", "hat"
  ];

  // Spelling practice words (your original set)
  const practiceWords = ["bat", "mat", "fan", "rat", "lap"];

  const reviewGrid = document.getElementById("reviewGrid");
  const wordContainer = document.getElementById("wordContainer");
  const checkBtn = document.getElementById("checkBtn");
  const spellingResult = document.getElementById("spellingResult");

  const imageBox = document.getElementById("imageBox");
  const wordImage = document.getElementById("wordImage");

  const audioEl = document.getElementById("sharedAudio");
  let audioUnlocked = false;

  function unlockAudioOnce() {
    if (audioUnlocked) return;
    audioUnlocked = true;

    // Attempt play/pause to unlock
    try {
      audioEl.play().then(() => {
        audioEl.pause();
        audioEl.currentTime = 0;
      }).catch(() => {});
    } catch {
      // ignore
    }
  }

  document.addEventListener("pointerdown", unlockAudioOnce, { once: true });

  function playAudio(word) {
    unlockAudioOnce();

    try {
      audioEl.pause();
      audioEl.currentTime = 0;
      audioEl.src = `audio/${word}.mp3`; // relative to /phonology/level-3/
      audioEl.play().catch(() => {});
    } catch {
      // ignore
    }
  }

  function showImage(word) {
    // If you don't want images, just comment this function call where used.
    wordImage.src = `images/${word}.png`; // relative to /phonology/level-3/
    wordImage.alt = word;
    imageBox.classList.add("show");
    imageBox.setAttribute("aria-hidden", "false");
  }

  // Build review grid
  function renderReviewGrid() {
    reviewGrid.innerHTML = "";

    reviewWords.forEach((w) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "word-btn";
      btn.textContent = w;
      btn.addEventListener("click", () => {
        playAudio(w);
        showImage(w); // keep if you want the image popup
      });
      reviewGrid.appendChild(btn);
    });
  }

  // Build practice rows
  function renderPractice() {
    wordContainer.innerHTML = "";

    practiceWords.forEach((word, index) => {
      const row = document.createElement("div");
      row.className = "spelling-section";

      row.innerHTML = `
        <div class="word-label">Word ${index + 1}:</div>
        <button class="play-btn" type="button" aria-label="Play ${word}">🔊 Play</button>
        <input class="word-input" type="text" id="word${index + 1}" aria-label="Type spelling for word ${index + 1}" />
        <span class="mark" id="mark${index + 1}"></span>
      `;

      const playBtn = row.querySelector(".play-btn");
      playBtn.addEventListener("click", () => playAudio(word));

      wordContainer.appendChild(row);
    });
  }

  function normalise(s) {
    return s.trim().toLowerCase().replace(/\s+/g, " ");
  }

  function checkSpelling() {
    let score = 0;

    practiceWords.forEach((word, index) => {
      const inputEl = document.getElementById(`word${index + 1}`);
      const markEl = document.getElementById(`mark${index + 1}`);
      const input = normalise(inputEl.value);

      if (input === word) {
        markEl.textContent = "✔";
        markEl.classList.remove("incorrect");
        markEl.classList.add("correct");
        score++;
      } else {
        markEl.textContent = "✘";
        markEl.classList.remove("correct");
        markEl.classList.add("incorrect");
      }
    });

    if (score === practiceWords.length) {
      spellingResult.textContent = "Excellent! ✅ You got all correct!";
      spellingResult.style.color = "#2e9e53";
    } else {
      spellingResult.textContent = `You got ${score}/${practiceWords.length} correct. Try again! ❌`;
      spellingResult.style.color = "#ef4444";
    }
  }

  checkBtn.addEventListener("click", checkSpelling);

  // Init
  renderReviewGrid();
  renderPractice();
});
