/**
 * Stage behaviour for /ready/, on top of ai-swe-2026.js
 * - the applicant funnel (300 dots, four filters, one left)
 * - the seven-second countdown on the CV scan
 * - the GitHub contribution graph
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Same seed every load, so the funnel looks the same in every rehearsal. */
  function seeded(seed) {
    return function () {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
  }

  function format(n) {
    return Math.round(n).toLocaleString("en-US");
  }

  function tween(el, from, to, duration) {
    if (el._tween) cancelAnimationFrame(el._tween);
    if (reduceMotion || from === to) { el.textContent = format(to); return; }
    var start = performance.now();
    function tick(now) {
      var t = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - t, 4);
      el.textContent = format(from + (to - from) * eased);
      if (t < 1) el._tween = requestAnimationFrame(tick);
    }
    el._tween = requestAnimationFrame(tick);
  }

  /* ---------- Applicant funnel ---------- */

  var COLS = 20;
  var ROWS = 15;
  var KEEP = [300, 60, 15, 4, 1];
  var UNITS = ["applicants", "left after the CV scan", "left after the skills test", "left after interviews", "offer"];

  function initFunnel() {
    var root = document.querySelector("[data-funnel]");
    if (!root) return;
    var field = root.querySelector("[data-fn-field]");
    var countEl = root.querySelector("[data-fn-count]");
    var unitEl = root.querySelector("[data-fn-unit]");
    var tag = field.querySelector(".fn-you-tag");
    var rnd = seeded(20261124);
    var total = COLS * ROWS;
    var youCol = 13;
    var youRow = 7;
    var you = youRow * COLS + youCol;

    var order = [];
    for (var i = 0; i < total; i++) if (i !== you) order.push(i);
    for (var j = order.length - 1; j > 0; j--) {
      var k = Math.floor(rnd() * (j + 1));
      var tmp = order[j]; order[j] = order[k]; order[k] = tmp;
    }
    order.unshift(you);

    var level = new Array(total);
    order.forEach(function (idx, rank) {
      var lv = 0;
      for (var s = 1; s < KEEP.length; s++) if (rank < KEEP[s]) lv = s;
      level[idx] = lv;
    });

    var dots = [];
    for (var d = 0; d < total; d++) {
      var dot = document.createElement("span");
      dot.className = "fn-dot" + (d === you ? " is-you" : "");
      dot.style.setProperty("--fd", (rnd() * 0.7).toFixed(2) + "s");
      dot.style.setProperty("--fi", ((d % COLS) * 0.012 + Math.floor(d / COLS) * 0.02).toFixed(3) + "s");
      field.insertBefore(dot, tag);
      dots.push(dot);
    }
    tag.style.left = ((youCol + 0.5) / COLS * 100) + "%";
    tag.style.top = ((youRow + 0.5) / ROWS * 100) + "%";

    var stages = root.querySelectorAll("[data-fn-stage]");
    var stage = 0;

    function render(next) {
      dots.forEach(function (el, idx) { el.classList.toggle("is-out", level[idx] < next); });
      stages.forEach(function (el) {
        var s = Number(el.dataset.fnStage);
        el.classList.toggle("is-done", s < next);
        el.classList.toggle("is-now", s === next);
      });
      root.dataset.stage = String(next);
      tween(countEl, KEEP[stage], KEEP[next], 900);
      unitEl.textContent = UNITS[next];
      stage = next;
    }

    function fromFragments() {
      var max = 0;
      root.querySelectorAll(".step-triggers .fragment.visible").forEach(function (el) {
        max = Math.max(max, Number(el.dataset.fnStep));
      });
      if (max !== stage) render(max);
    }

    Reveal.on("fragmentshown", fromFragments);
    Reveal.on("fragmenthidden", fromFragments);
    Reveal.on("slidechanged", function (ev) { if (ev.currentSlide.contains(root)) fromFragments(); });
    render(0);
  }

  /* ---------- CV countdown ---------- */

  function initCvTimer() {
    var root = document.querySelector("[data-cv]");
    if (!root) return;
    var el = root.querySelector("[data-cv-timer]");
    var SECONDS = 7;
    var DELAY = 300;
    var frame = null;

    function stop() {
      if (frame) cancelAnimationFrame(frame);
      frame = null;
    }

    function run() {
      stop();
      if (reduceMotion) { el.textContent = "0"; return; }
      var start = performance.now();
      el.textContent = String(SECONDS);
      function tick(now) {
        var left = SECONDS - Math.max(0, now - start - DELAY) / 1000;
        el.textContent = String(Math.max(0, Math.ceil(left)));
        if (left > 0) frame = requestAnimationFrame(tick);
      }
      frame = requestAnimationFrame(tick);
    }

    Reveal.on("slidechanged", function (ev) {
      if (ev.currentSlide.contains(root)) run();
      else { stop(); el.textContent = String(SECONDS); }
    });
    if (Reveal.getCurrentSlide() && Reveal.getCurrentSlide().contains(root)) run();
  }

  /* ---------- GitHub graph ---------- */
  /* Six months of squares. Busier toward the end, so it reads as steady growth. */

  var WEEKS = 26;

  function initGitHub() {
    document.querySelectorAll("[data-gh-grid]").forEach(function (grid) {
      var rnd = seeded(94);
      for (var w = 0; w < WEEKS; w++) {
        for (var day = 0; day < 7; day++) {
          var cell = document.createElement("i");
          var busy = 0.25 + (w / WEEKS) * 0.6;
          var r = rnd();
          var lv = r > busy ? 0 : r > busy * 0.6 ? 1 : r > busy * 0.3 ? 2 : r > busy * 0.12 ? 3 : 4;
          if (day > 4 && rnd() < 0.5) lv = Math.max(0, lv - 2);
          cell.className = "lv" + lv;
          cell.style.setProperty("--gd", (0.4 + w * 0.05 + day * 0.015).toFixed(3) + "s");
          grid.appendChild(cell);
        }
      }
    });
  }

  function boot() {
    if (!window.Reveal) return;
    initFunnel();
    initCvTimer();
    initGitHub();
  }

  if (document.readyState === "complete") boot();
  else window.addEventListener("load", boot);
})();
