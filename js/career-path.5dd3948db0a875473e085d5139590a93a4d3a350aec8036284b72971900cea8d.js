/* Find Your Career Path. Runs after ai-swe-2026.js, which already handles counters, stepping, and the QR.
   This file only drives the "Which one are you?" quiz: the newest visible step picks the statement and the paths that light up. */
(function () {
  function boot() {
    var R = window.Reveal;
    if (!R) return;

    function update(quiz) {
      var step = 0;
      var on = [];
      quiz.querySelectorAll("[data-quiz-step]").forEach(function (f) {
        var n = Number(f.dataset.quizStep);
        if (f.classList.contains("visible") && n > step) {
          step = n;
          on = (f.dataset.quizOn || "").split(" ");
        }
      });
      quiz.dataset.step = String(step);
      quiz.querySelectorAll("[data-path]").forEach(function (card) {
        card.classList.toggle("is-on", on.indexOf(card.dataset.path) !== -1);
      });
    }

    function sync() {
      document.querySelectorAll("[data-quiz]").forEach(update);
    }

    ["ready", "slidechanged", "fragmentshown", "fragmenthidden"].forEach(function (e) {
      R.on(e, sync);
    });
    sync();
  }

  if (document.readyState === "complete") boot();
  else window.addEventListener("load", boot);
})();
