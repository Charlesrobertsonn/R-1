/* phonology/activities/sound-deck.js */

document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const letters = Array.from(document.querySelectorAll(".letter"));
  const audioEl = document.getElementById("slideAudio");

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const dotsWrap = document.getElementById("dots");
  const continueContainer = document.getElementById("continueContainer");

  let slideIndex = 0;
  let audioUnlocked = false;

  function unlockAudioOnce() {
    if (audioUnlocked) return;
    audioUnlocked = true;

    // Attempt a tiny play/pause to unlock autoplay policies
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

  // Build dots dynamically to match number of slides
  const dots = slides.map((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "dot";
    b.setAttribute("aria-label", `Go to slide ${i + 1}`);
    b.addEventListener("click", () => goToSlide(i));
    dotsWrap.appendChild(b);
    return b;
  });

  function setContinueVisibility() {
    const isLast = slideIndex === slides.length - 1;
    continueContainer.classList.toggle("show", isLast);
  }

  function updateArrows() {
    prevBtn.disabled = slideIndex === 0;
    nextBtn.disabled = slideIndex === slides.length - 1;
  }

  function updateDots() {
    dots.forEach((d, i) => d.classList.toggle("active", i === slideIndex));
  }

  function showSlide(index) {
    slideIndex = Math.max(0, Math.min(index, slides.length - 1));

    slides.forEach((s, i) => s.classList.toggle("active", i === slideIndex));

    updateDots();
    updateArrows();
    setContinueVisibility();
  }

  function playSlideSound(soundUrl) {
    if (!soundUrl) return;

    try {
      audioEl.pause();
      audioEl.currentTime = 0;
      audioEl.src = soundUrl;
      audioEl.play().catch(() => {});
    } catch {
      // ignore
    }
  }

  function goToSlide(index) {
    showSlide(index);
  }

  function changeSlide(delta) {
    showSlide(slideIndex + delta);
  }

  // Letter click => play that slide's audio
  letters.forEach((btn) => {
    btn.addEventListener("click", () => {
      unlockAudioOnce();
      const slide = btn.closest(".slide");
      playSlideSound(slide?.dataset?.sound);
    });
  });

  // Arrow buttons
  prevBtn.addEventListener("click", () => changeSlide(-1));
  nextBtn.addEventListener("click", () => changeSlide(1));

  // Keyboard nav (optional but nice)
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") changeSlide(-1);
    if (e.key === "ArrowRight") changeSlide(1);
  });

  // Initial render
  showSlide(slideIndex);
});
