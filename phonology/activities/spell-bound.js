/* phonology/activities/spell-bound.js */

document.addEventListener("DOMContentLoaded", () => {
  // Drag + drop
  const draggables = document.querySelectorAll(".draggable");
  const droppables = document.querySelectorAll(".droppable");
  const progressBar = document.getElementById("progress-bar");
  const dragFeedback = document.getElementById("dragFeedback");

  let correctCount = 0;
  const totalTasks = droppables.length;

  function updateProgress() {
    const progressPercentage = (correctCount / totalTasks) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  }

  function setFeedback(msg) {
    if (!dragFeedback) return;
    dragFeedback.textContent = msg;
  }

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", draggable.getAttribute("data-word"));
      setFeedback("Drag the word into the correct blank.");
    });
  });

  droppables.forEach((droppable) => {
    droppable.addEventListener("dragover", (e) => e.preventDefault());

    droppable.addEventListener("drop", (e) => {
      e.preventDefault();

      const word = e.dataTransfer.getData("text");
      const target = droppable.getAttribute("data-word");
      const alreadyFilled = droppable.getAttribute("data-filled") === "true";

      if (alreadyFilled) {
        setFeedback("That blank is already filled.");
        return;
      }

      if (word === target) {
        droppable.textContent = word;
        droppable.classList.add("is-correct");
        droppable.setAttribute("data-filled", "true");

        correctCount++;
        updateProgress();
        setFeedback("Nice! Keep going.");
      } else {
        setFeedback("Not quite — try a different word.");
      }
    });
  });

  // Sentence dictation + check
  const sentenceText = document.getElementById("sentence-text");
  const sentenceInput = document.getElementById("sentence-input");
  const resultMessage = document.getElementById("result-message");

  const goBtn = document.getElementById("goBtn");
  const checkBtn = document.getElementById("checkBtn");
  const nextBtn = document.getElementById("nextBtn");
  const hintBtn = document.getElementById("hintBtn");

  const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "She picked a red apple from the tree.",
    "The cat ran across the street."
  ];

  let currentSentenceIndex = 0;

  function speak(text) {
    if (typeof window.safeSpeak === "function") {
      window.safeSpeak(text, { lang: "en-US", rate: 0.9 });
      return;
    }

    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  function resetSentenceUI() {
    sentenceText.textContent = 'Press “Go” to hear the sentence.';
    sentenceInput.value = "";
    resultMessage.textContent = "";
    resultMessage.style.color = "";
  }

  function playSentence() {
    speak(sentences[currentSentenceIndex]);
  }

  function normalise(s) {
    return s
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'");
  }

  function checkSentence() {
    const userSentence = normalise(sentenceInput.value);
    const correctSentence = normalise(sentences[currentSentenceIndex]);

    if (!userSentence) {
      resultMessage.textContent = "Write the sentence first.";
      resultMessage.style.color = "#b45309";
      return;
    }

    if (userSentence === correctSentence) {
      resultMessage.textContent = "Correct!";
      resultMessage.style.color = "#2e9e53";
    } else {
      resultMessage.textContent = "Not quite — try again!";
      resultMessage.style.color = "#ef4444";
    }
  }

  function nextTask() {
    if (currentSentenceIndex < sentences.length - 1) {
      currentSentenceIndex++;
      resetSentenceUI();
    } else {
      resultMessage.textContent = "You have completed all sentences!";
      resultMessage.style.color = "#2e9e53";
    }
  }

  function showHint() {
    resultMessage.textContent = `Hint: ${sentences[currentSentenceIndex]}`;
    resultMessage.style.color = "#111827";
  }

  goBtn?.addEventListener("click", playSentence);
  checkBtn?.addEventListener("click", checkSentence);
  nextBtn?.addEventListener("click", nextTask);
  hintBtn?.addEventListener("click", showHint);

  // Initialise
  updateProgress();
  resetSentenceUI();
});
