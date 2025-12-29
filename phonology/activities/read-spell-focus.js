// phonology/activities/read-spell-focus.js

const words = ["cat", "bat", "rat", "hat", "pen", "ten"];

const readingGrid = document.getElementById("readingGrid");
const writingGrid = document.getElementById("writingGrid");
const resultMessage = document.getElementById("result-message");

function speak(word) {
  if (!("speechSynthesis" in window)) {
    alert("Your browser does not support text-to-speech.");
    return;
  }
  const msg = new SpeechSynthesisUtterance(word);
  msg.lang = "en-US";
  msg.rate = 0.85;
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

// ---------- Reading ----------
function generateReadingWords() {
  readingGrid.innerHTML = "";

  words.forEach((word) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "reading-word";
    btn.textContent = word;
    btn.addEventListener("click", () => speak(word));
    readingGrid.appendChild(btn);
  });
}

// ---------- Writing ----------
function shuffle(arr) {
  return [...arr].sort(() => 0.5 - Math.random());
}

function generateWritingTask() {
  writingGrid.innerHTML = "";
  resultMessage.textContent = "";

  // Your original was slice(0,9) but you only have 6 words
  // We'll repeat/shuffle to fill 9 slots for more practice
  const pool = shuffle([...words, ...words, ...words]).slice(0, 9);

  pool.forEach((word) => {
    const block = document.createElement("div");
    block.className = "word-block";

    const soundBtn = document.createElement("button");
    soundBtn.type = "button";
    soundBtn.className = "sound-btn";
    soundBtn.textContent = "🔊";
    soundBtn.addEventListener("click", () => speak(word));

    const input = document.createElement("input");
    input.type = "text";
    input.className = "word-input";
    input.setAttribute("data-word", word);
    input.autocomplete = "off";
    input.spellcheck = false;

    // Reset styling while typing
    input.addEventListener("input", () => {
      input.style.backgroundColor = "white";
      input.style.border = "1px solid rgba(0,0,0,0.25)";
    });

    block.appendChild(soundBtn);
    block.appendChild(input);
    writingGrid.appendChild(block);
  });
}

function checkAnswers() {
  const inputs = writingGrid.querySelectorAll("input[data-word]");
  let correctCount = 0;

  inputs.forEach((input) => {
    const correctWord = input.getAttribute("data-word").toLowerCase();
    const userInput = input.value.trim().toLowerCase();

    if (userInput === correctWord) {
      correctCount += 1;
      input.style.backgroundColor = "#c8e6c9";
      input.style.border = "2px solid #388e3c";
    } else {
      input.style.backgroundColor = "#ffcccb";
      input.style.border = "2px solid #d32f2f";
    }
  });

  resultMessage.textContent = `You got ${correctCount} / ${inputs.length} correct.`;
}

function hint() {
  const inputs = [...writingGrid.querySelectorAll("input[data-word]")];
  const empty = inputs.find((i) => i.value.trim() === "");
  const target = empty || inputs.find((i) => i.style.border.includes("d32f2f"));

  if (!target) {
    resultMessage.textContent = "No hints needed — you're all good!";
    return;
  }

  const word = target.getAttribute("data-word");
  target.value = word.slice(0, 1); // first letter hint
  target.focus();
  resultMessage.textContent = `Hint added (first letter).`;
}

function goToNextSet() {
  generateWritingTask();
  resultMessage.textContent = "New set generated!";
}

function continueToNextActivity() {
  window.location.href = "syllabication.html";
}

// ---------- Button wiring ----------
document.getElementById("btn-go")?.addEventListener("click", () => {
  // "Go" = read all words once (quick model)
  words.forEach((w, i) => setTimeout(() => speak(w), i * 650));
});

document.getElementById("btn-check")?.addEventListener("click", checkAnswers);
document.getElementById("btn-next")?.addEventListener("click", goToNextSet);
document.getElementById("btn-hint")?.addEventListener("click", hint);
document.getElementById("continue-btn")?.addEventListener("click", continueToNextActivity);

// ---------- Init ----------
generateReadingWords();
generateWritingTask();
