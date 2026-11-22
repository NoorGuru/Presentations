/**
 * Stage behaviour for /ai-swe-2026/
 * - footer contrast on navy and amber slides
 * - numbers that count up when their slide opens
 * - the stack ladder (clicker, click, or keys 0-5)
 * - the pull request diff (clicker, buttons, line click, or keys 1-3)
 * - the weekend checklist
 * - the language cycle (Java → JS → Rust → Go → One language)
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function onSlide(slide) {
    if (!slide) return;
    document.body.classList.toggle("is-dark-slide", slide.classList.contains("navy"));
    document.body.classList.toggle("is-amber-slide", slide.classList.contains("amber"));
    countUp(slide);
  }

  function format(n) {
    return Math.round(n).toLocaleString("en-US");
  }

  function countUp(slide) {
    slide.querySelectorAll("[data-count]").forEach(function (el) {
      var target = Number(el.dataset.count);
      var from = Number(el.dataset.from || 0);
      if (reduceMotion) { el.textContent = format(target); return; }
      var start = performance.now();
      var delay = Number(el.dataset.delay || 150);
      var duration = 1100;
      el.textContent = format(from);
      function tick(now) {
        var t = Math.min(1, Math.max(0, (now - start - delay) / duration));
        var eased = 1 - Math.pow(1 - t, 4);
        el.textContent = format(from + (target - from) * eased);
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  function currentSlideHas(root) {
    var current = window.Reveal && Reveal.getCurrentSlide();
    return !!(current && current.contains(root));
  }

  /* ---------- Pull request diff ---------- */

  function initDiff() {
    var root = document.querySelector("[data-pr-diff]");
    if (!root) return;
    var state = { trap1: false, trap2: false, fix: false };
    var btn = {
      trap1: root.querySelector('[data-toggle="trap1"]'),
      trap2: root.querySelector('[data-toggle="trap2"]'),
      fix: root.querySelector('[data-toggle="fix"]')
    };
    var onClass = { trap1: "is-on-red", trap2: "is-on-amber", fix: "is-on-green" };

    function render() {
      root.querySelectorAll('[data-trap="1"]').forEach(function (el) { el.classList.toggle("trap-1-active", state.trap1); });
      root.querySelectorAll('[data-trap="2"]').forEach(function (el) { el.classList.toggle("trap-2-active", state.trap2); });
      root.querySelector('[data-review="1"]').classList.toggle("is-shown", state.trap1);
      root.querySelector('[data-review="2"]').classList.toggle("is-shown", state.trap2);
      root.querySelector("[data-fix]").classList.toggle("is-shown", state.fix);
      Object.keys(btn).forEach(function (k) {
        btn[k].classList.toggle(onClass[k], state[k]);
        btn[k].setAttribute("aria-pressed", String(state[k]));
      });
    }

    function toggle(k) { state[k] = !state[k]; render(); }

    Object.keys(btn).forEach(function (k) { btn[k].addEventListener("click", function () { toggle(k); }); });
    root.querySelectorAll('[data-trap="1"]').forEach(function (el) { el.addEventListener("click", function () { toggle("trap1"); }); });
    root.querySelectorAll('[data-trap="2"]').forEach(function (el) { el.addEventListener("click", function () { toggle("trap2"); }); });

    document.addEventListener("keydown", function (e) {
      if (!currentSlideHas(root) || e.metaKey || e.ctrlKey || e.altKey) return;
      var map = { "1": "trap1", "2": "trap2", "3": "fix" };
      if (map[e.key]) { e.preventDefault(); toggle(map[e.key]); }
    });

    function fromFragments() {
      ["trap1", "trap2", "fix"].forEach(function (k, i) {
        var t = root.querySelector('.step-triggers [data-pr-step="' + (i + 1) + '"]');
        state[k] = t.classList.contains("visible");
      });
      render();
    }

    Reveal.on("fragmentshown", fromFragments);
    Reveal.on("fragmenthidden", fromFragments);
    Reveal.on("slidechanged", function (ev) { if (ev.currentSlide.contains(root)) fromFragments(); });
    render();
  }

  /* ---------- Weekend checklist ---------- */

  function initChecklist() {
    document.querySelectorAll("[data-checklist] .check").forEach(function (item) {
      function flip() {
        var on = item.classList.toggle("is-checked");
        item.setAttribute("aria-pressed", String(on));
      }
      item.addEventListener("click", flip);
      item.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); flip(); }
      });
    });
  }

  /* ---------- Language cycle ---------- */
  /* Clicker-driven: each step uses the same .strike sweep as the rest of the deck.
     ↓ normally skips fragments — remap it on this slide so Space and ↓ both step. */

  var LANGS = ["Java", "JavaScript", "Rust", "Go", "One language"];
  var LANG_SIZE = { Java: "200px", JavaScript: "112px", Rust: "200px", Go: "200px", "One language": "108px" };

  function initLangCycle() {
    var root = document.querySelector("[data-lang-cycle]");
    if (!root) return;
    var nameEl = root.querySelector("[data-lang-name]");
    var punch = root.querySelector("[data-lang-punch]");
    var step = 0;
    var busy = false;
    var timer = null;
    var queued = null;

    function clearTimer() {
      if (timer) { clearTimeout(timer); timer = null; }
    }

    function paint(next, animate) {
      clearTimer();
      busy = false;
      nameEl.classList.remove("strike", "is-swapping", "is-arriving", "is-final");
      nameEl.style.removeProperty("--sd");
      nameEl.textContent = LANGS[next];
      nameEl.style.fontSize = LANG_SIZE[LANGS[next]] || "160px";
      nameEl.classList.toggle("is-final", next === LANGS.length - 1);
      if (punch) punch.classList.toggle("is-shown", next === LANGS.length - 1);
      if (animate && !reduceMotion) {
        void nameEl.offsetWidth;
        nameEl.classList.add("is-arriving");
      }
      step = next;
      if (queued !== null && queued !== step) {
        var q = queued;
        queued = null;
        goTo(q);
      }
    }

    function swapTo(next) {
      busy = true;
      nameEl.classList.remove("is-arriving", "is-final");
      // Same reviewer's-pen strike used on "syntax" and the habit slides.
      nameEl.style.setProperty("--sd", "0s");
      nameEl.classList.add("strike");
      void nameEl.offsetWidth;
      clearTimer();
      timer = setTimeout(function () {
        nameEl.classList.add("is-swapping");
        timer = setTimeout(function () {
          paint(next, true);
        }, 280);
      }, 520);
    }

    function goTo(next) {
      next = Math.max(0, Math.min(LANGS.length - 1, next));
      if (next === step && !busy) return;
      if (busy) { queued = next; return; }
      if (reduceMotion || next !== step + 1) {
        paint(next, next > step && !reduceMotion);
        return;
      }
      swapTo(next);
    }

    function fromFragments() {
      var max = 0;
      root.querySelectorAll(".step-triggers .fragment.visible").forEach(function (el) {
        max = Math.max(max, Number(el.dataset.langStep));
      });
      goTo(max);
    }

    // ↓ / ↑ step fragments on this slide instead of jumping vertically.
    document.addEventListener("keydown", function (e) {
      if (!currentSlideHas(root) || e.metaKey || e.ctrlKey || e.altKey) return;
      var avail = Reveal.availableFragments();
      if (e.key === "ArrowDown" && avail.next) {
        e.preventDefault();
        e.stopImmediatePropagation();
        Reveal.nextFragment();
      } else if (e.key === "ArrowUp" && avail.prev) {
        e.preventDefault();
        e.stopImmediatePropagation();
        Reveal.prevFragment();
      }
    }, true);

    Reveal.on("fragmentshown", fromFragments);
    Reveal.on("fragmenthidden", fromFragments);
    Reveal.on("slidechanged", function (ev) {
      if (ev.currentSlide.contains(root)) fromFragments();
      else paint(0, false);
    });
    paint(0, false);
  }

  /* ---------- Fragment stepping with ↓ / ↑ ---------- */
  /* Allow ↓ / ↑ to step through fragments on bar-shift and big-picture slides. */

  function initStepFragments() {
    var roots = Array.prototype.slice.call(document.querySelectorAll("[data-bar-steps], [data-step-fragments]"));
    if (!roots.length) return;
    document.addEventListener("keydown", function (e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      var active = roots.some(currentSlideHas);
      if (!active) return;
      var avail = Reveal.availableFragments();
      if (e.key === "ArrowDown" && avail.next) {
        e.preventDefault();
        e.stopImmediatePropagation();
        Reveal.nextFragment();
      } else if (e.key === "ArrowUp" && avail.prev) {
        e.preventDefault();
        e.stopImmediatePropagation();
        Reveal.prevFragment();
      }
    }, true);
  }

  function boot() {
    if (!window.Reveal) return;
    initDiff();
    initChecklist();
    initLangCycle();
    initStepFragments();
    Reveal.on("slidechanged", function (ev) { onSlide(ev.currentSlide); });
    if (Reveal.isReady()) onSlide(Reveal.getCurrentSlide());
    else Reveal.on("ready", function (ev) { onSlide(ev.currentSlide); });
  }

  if (document.readyState === "complete") boot();
  else window.addEventListener("load", boot);
})();
