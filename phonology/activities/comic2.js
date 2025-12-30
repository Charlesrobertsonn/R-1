/* phonology/activities/comic2.js */

document.addEventListener("DOMContentLoaded", () => {
  const comicGrid = document.getElementById("comic-grid");
  const pageNumber = document.getElementById("page-number");
  const quizSection = document.getElementById("quiz-section");
  const quizResult = document.getElementById("quiz-result");
  const finishWrapper = document.getElementById("finishWrapper");

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // Comic pages data
  const comicPages = [
    [
      { text: "Tam has a cat.", img: "https://via.placeholder.com/150" },
      { text: "The cat is on the mat.", img: "https://via.placeholder.com/150" },
      { text: "Naf taps the cat.", img: "https://via.placeholder.com/150" },
      { text: "The cat runs to Sab.", img: "https://via.placeholder.com/150" },
      { text: "Sab pets the cat.", img: "https://via.placeholder.com/150" },
      { text: "The cat sits in Sab’s lap.", img: "https://via.placeholder.com/150" }
    ],
    [
      { text: "The dog sees the cat.", img: "https://via.placeholder.com/150" },
      { text: "The cat jumps up high.", img: "https://via.placeholder.com/150" },
      { text: "Sab calls the cat down.", img: "https://via.placeholder.com/150" },
      { text: "The dog sniffs the cat.", img: "https://via.placeholder.com/150" },
      { text: "The cat and dog become friends.", img: "https://via.placeholder.com/150" },
      { text: "Sab smiles at the cat and dog.", img: "https://via.placeholder.com/150" }
    ],
    [
      { text: "Sab gives the cat some food.", img: "https://via.placeholder.com/150" },
      { text: "The dog also gets food.", img: "https://via.placeholder.com/150" },
      { text: "They both eat happily.", img: "https://via.placeholder.com/150" },
      { text: "Sab plays with the cat.", img: "https://via.placeholder.com/150" },
      { text: "Sab takes the dog on a walk.", img: "https://via.placeholder.com/150" },
      { text: "A happy day for everyone!", img: "https://via.placeholder.com/150" }
    ]
  ];

  let currentPage = 0;

  function speakText(text) {
    // Use shared helper if available
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

  function renderComicPage() {
    comicGrid.innerHTML = "";

    comicPages[currentPage].forEach((panel) => {
      const panelDiv = document.createElement("div");
      panelDiv.className = "comic-panel";
      panelDiv.setAttribute("role", "button");
      panelDiv.setAttribute("tabindex", "0");
      panelDiv.setAttribute("aria-label", `Speak: ${panel.text}`);

      panelDiv.innerHTML = `
        <img src="${panel.img}" alt="Comic panel image">
        <p>${panel.text}</p>
      `;

      const activate = () => speakText(panel.text);

      panelDiv.addEventListener("click", activate);
      panelDiv.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      });

      comicGrid.appendChild(panelDiv);
    });

    pageNumber.textContent = `Page ${currentPage + 1} of ${comicPages.length}`;

    const isLastPage = currentPage === comicPages.length - 1;
    quizSection.style.display = isLastPage ? "block" : "none";
    finishWrapper.style.display = isLastPage ? "flex" : "none";

    // Optional: disable nav buttons at ends (nice UX)
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = isLastPage;

    // Clear quiz feedback when leaving/entering last page
    if (!isLastPage) quizResult.textContent = "";
  }

  function nextPage() {
    if (currentPage < comicPages.length - 1) {
      currentPage++;
      renderComicPage();
    }
  }

  function prevPage() {
    if (currentPage > 0) {
      currentPage--;
      renderComicPage();
    }
  }

  function checkAnswer(answer) {
    if (answer === "C") {
      quizResult.textContent = "✅ Correct! Sab petted the cat.";
      quizResult.style.color = "#2e9e53";
    } else {
      quizResult.textContent = "❌ Incorrect! Try again.";
      quizResult.style.color = "#ef4444";
    }
  }

  // Wire up buttons
  prevBtn?.addEventListener("click", prevPage);
  nextBtn?.addEventListener("click", nextPage);

  document.querySelectorAll(".quiz-btn").forEach((btn) => {
    btn.addEventListener("click", () => checkAnswer(btn.dataset.answer));
  });

  // Initial render
  renderComicPage();
});

