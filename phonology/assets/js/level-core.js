/* phonology/assets/js/level-core.js */

(function () {
  // Optional: make buttons feel consistent if you add data-press on links/buttons
  document.querySelectorAll("[data-press]").forEach((el) => {
    el.addEventListener("mousedown", () => el.classList.add("is-pressed"));
    el.addEventListener("mouseup", () => el.classList.remove("is-pressed"));
    el.addEventListener("mouseleave", () => el.classList.remove("is-pressed"));
  });

  // Helpful: if using SpeechSynthesis in activities, cancel before speaking new audio
  // (won't do anything unless an activity calls window.safeSpeak)
  window.safeSpeak = function safeSpeak(text, opts = {}) {
    if (!("speechSynthesis" in window)) return false;

    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = opts.lang || "en-US";
      u.rate = typeof opts.rate === "number" ? opts.rate : 0.85;
      u.pitch = typeof opts.pitch === "number" ? opts.pitch : 1;
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) {
      return false;
    }
  };
})();

