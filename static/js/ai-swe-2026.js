/**
 * Interactive stage enhancements for /ai-swe-2026/
 * 1. Dark-slide chrome adaptation (.slide-meta contrast)
 * 2. Live clickable Salary Poll counter (click cards or press 1-4; 0 to reset)
 * 3. Step-by-step 2026 Dev Stack Ladder (clicker fragments + direct click)
 * 4. GitHub PR Diff "Spot the AI Trap" (clicker fragments + direct toggle buttons)
 */
(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     1. Dark slide detection for bottom .slide-meta bar
     ------------------------------------------------------------------------ */
  function syncDarkChrome(slide) {
    if (!slide) return;
    var isDark =
      slide.classList.contains("hero-slide") ||
      slide.classList.contains("dark-slide") ||
      slide.classList.contains("dark-coral") ||
      slide.classList.contains("dark-teal");
    document.body.classList.toggle("is-dark-slide", isDark);
  }

  /* ------------------------------------------------------------------------
     2. Live Salary Poll Counter
     ------------------------------------------------------------------------ */
  var POLL_KEY = "ai_swe_2026_salary_poll_v1";

  function initSalaryPoll() {
    var root = document.querySelector("[data-salary-poll]");
    if (!root || root.dataset.bound) return;
    root.dataset.bound = "1";

    var counts = [0, 0, 0, 0];
    try {
      var saved = JSON.parse(sessionStorage.getItem(POLL_KEY) || "null");
      if (Array.isArray(saved) && saved.length === 4) {
        counts = saved.map(function (n) { return Math.max(0, Number(n) || 0); });
      }
    } catch (_) {}

    var cards = Array.prototype.slice.call(root.querySelectorAll(".poll-card"));
    var totalEl = root.querySelector("[data-poll-total]");
    var resetBtn = root.querySelector("[data-poll-reset]");

    function save() {
      try { sessionStorage.setItem(POLL_KEY, JSON.stringify(counts)); } catch (_) {}
    }

    function render() {
      var total = counts.reduce(function (a, b) { return a + b; }, 0);
      var maxVal = Math.max.apply(null, counts.concat([1]));
      if (totalEl) totalEl.textContent = String(total);

      cards.forEach(function (card, idx) {
        var val = counts[idx];
        var pct = total > 0 ? Math.round((val / total) * 100) : 0;
        var fillHeight = total > 0 ? Math.round((val / maxVal) * 78) : 0;

        var countEl = card.querySelector("[data-count]");
        var pctEl = card.querySelector("[data-pct]");
        var fillEl = card.querySelector(".poll-fill");

        if (countEl) countEl.textContent = String(val);
        if (pctEl) pctEl.textContent = pct + "%";
        if (fillEl) fillEl.style.height = fillHeight + "%";
        card.classList.toggle("has-votes", val > 0);
      });
    }

    function bump(idx, delta) {
      if (idx < 0 || idx >= counts.length) return;
      counts[idx] = Math.max(0, counts[idx] + delta);
      save();
      render();
      var card = cards[idx];
      if (card) {
        card.classList.add("is-bumping");
        setTimeout(function () { card.classList.remove("is-bumping"); }, 120);
      }
    }

    cards.forEach(function (card, idx) {
      card.addEventListener("click", function (e) {
        if (e.target.closest("[data-minus]")) return;
        bump(idx, e.shiftKey ? -1 : 1);
      });

      var minusBtn = card.querySelector("[data-minus]");
      if (minusBtn) {
        minusBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          bump(idx, -1);
        });
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        counts = [0, 0, 0, 0];
        save();
        render();
      });
    }

    document.addEventListener("keydown", function (e) {
      if (!window.Reveal) return;
      var current = Reveal.getCurrentSlide();
      if (!current || !current.contains(root)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key >= "1" && e.key <= "4") {
        e.preventDefault();
        bump(Number(e.key) - 1, e.shiftKey ? -1 : 1);
      } else if (e.key === "0") {
        e.preventDefault();
        counts = [0, 0, 0, 0];
        save();
        render();
      }
    });

    render();
  }

  /* ------------------------------------------------------------------------
     3. Step-by-Step 2026 Dev Stack Ladder
     ------------------------------------------------------------------------ */
  var LADDER_DATA = {
    "0": {
      badge: "LAYER 1 · FOUNDATION",
      title: "Git, PRs & APIs",
      metaphor: "The non-negotiable concrete slab",
      desc: "Without clean Git diffs, PR review discipline, and solid API fluency, every AI layer above collapses into broken production changes.",
      example: "PR = your safety gate  |  APIs = how agents touch the real world"
    },
    "1": {
      badge: "LAYER 2 · STEP 01",
      title: "AI / LLMs",
      metaphor: "A brain in a jar",
      desc: "Brilliant at syntax, refactoring, and explaining concepts — but completely blind to your repository, logs, tickets, and production state.",
      example: "Chat window + inline autocomplete (zero direct environment access)"
    },
    "2": {
      badge: "LAYER 2 · STEP 02",
      title: "MCP",
      metaphor: "The USB-C port for AI",
      desc: "Model Context Protocol gives your AI one standard plug into GitHub, databases, logs, and internal docs — no more copy-pasting screenshots.",
      example: "IDE / Agent <--[ MCP ]--> GitHub · Postgres · Logs · Internal Docs"
    },
    "3": {
      badge: "LAYER 2 · STEP 03",
      title: "Skills",
      metaphor: "Version-controlled team playbooks",
      desc: "Encode your team's testing rules, security checklists, or migration steps in Git so every engineer's AI follows the exact same standard.",
      example: ".skills/migrate-service/SKILL.md -> deterministic rules, not vibes"
    },
    "4": {
      badge: "LAYER 2 · STEP 04",
      title: "Agents",
      metaphor: "LLM + Tools + a Loop",
      desc: "Instead of only printing text, an agent reads files, runs tests in the terminal, inspects the stack trace, and fixes its own mistakes.",
      example: "Read code -> Edit -> Run mvn test -> See failure -> Fix -> Pass"
    },
    "5": {
      badge: "LAYER 2 · STEP 05",
      title: "Autonomous Agents",
      metaphor: "Bounded autonomy while you sleep",
      desc: "Handles scoped multi-step tasks asynchronously — strictly constrained by sandboxes, automated test gates, and human PR approval.",
      example: "Scoped ticket -> Branch -> Verify CI -> PR waiting for you at 9 AM"
    }
  };

  function initStackLadder() {
    var root = document.querySelector("[data-stack-ladder]");
    if (!root || root.dataset.bound) return;
    root.dataset.bound = "1";

    var rungs = Array.prototype.slice.call(root.querySelectorAll(".ladder-rung"));
    var foundation = root.querySelector(".ladder-foundation");
    var badgeEl = root.querySelector("[data-ladder-badge]");
    var titleEl = root.querySelector("[data-ladder-title]");
    var metaphorEl = root.querySelector("[data-ladder-metaphor]");
    var descEl = root.querySelector("[data-ladder-desc]");
    var exampleEl = root.querySelector("[data-ladder-example]");

    var unlockedUpTo = 0;

    function setActive(stepStr, unlockLevel) {
      var stepNum = Number(stepStr);
      if (typeof unlockLevel === "number") {
        unlockedUpTo = Math.max(0, unlockLevel);
      } else if (stepNum > unlockedUpTo) {
        unlockedUpTo = stepNum;
      }

      if (foundation) {
        foundation.classList.toggle("is-active", stepNum === 0);
      }

      rungs.forEach(function (rung) {
        var rStep = Number(rung.dataset.step);
        rung.classList.toggle("is-unlocked", rStep <= unlockedUpTo);
        rung.classList.toggle("is-active", rStep === stepNum);
      });

      var info = LADDER_DATA[String(stepNum)] || LADDER_DATA["0"];
      if (badgeEl) badgeEl.textContent = info.badge;
      if (titleEl) titleEl.textContent = info.title;
      if (metaphorEl) metaphorEl.textContent = info.metaphor;
      if (descEl) descEl.textContent = info.desc;
      if (exampleEl) exampleEl.textContent = info.example;
    }

    rungs.forEach(function (rung) {
      rung.addEventListener("click", function () {
        var s = Number(rung.dataset.step);
        setActive(s, Math.max(unlockedUpTo, s));
      });
    });

    if (foundation) {
      foundation.addEventListener("click", function () {
        setActive(0, unlockedUpTo);
      });
    }

    function syncFromFragments() {
      var visible = root.querySelectorAll(".step-triggers .fragment.visible");
      var maxStep = 0;
      visible.forEach(function (el) {
        var s = Number(el.dataset.ladderStep || 0);
        if (s > maxStep) maxStep = s;
      });
      setActive(maxStep, maxStep);
    }

    if (window.Reveal) {
      Reveal.on("fragmentshown", syncFromFragments);
      Reveal.on("fragmenthidden", syncFromFragments);
      Reveal.on("slidechanged", function (ev) {
        if (ev.currentSlide && ev.currentSlide.contains(root)) {
          syncFromFragments();
        }
      });
    }

    setActive(0, 0);
  }

  /* ------------------------------------------------------------------------
     4. GitHub-Style PR Diff ("Spot the AI Trap")
     ------------------------------------------------------------------------ */
  function initPrDiff() {
    var root = document.querySelector("[data-pr-diff]");
    if (!root || root.dataset.bound) return;
    root.dataset.bound = "1";

    var state = { trap1: false, trap2: false, fix: false };

    var btn1 = root.querySelector('[data-toggle="trap1"]');
    var btn2 = root.querySelector('[data-toggle="trap2"]');
    var btnFix = root.querySelector('[data-toggle="fix"]');

    var lines1 = root.querySelectorAll('[data-trap="1"]');
    var lines2 = root.querySelectorAll('[data-trap="2"]');
    var box1 = root.querySelector('[data-review="1"]');
    var box2 = root.querySelector('[data-review="2"]');
    var fixBar = root.querySelector("[data-fix-bar]");

    function render() {
      lines1.forEach(function (el) { el.classList.toggle("trap-1-active", state.trap1); });
      lines2.forEach(function (el) { el.classList.toggle("trap-2-active", state.trap2); });
      if (box1) box1.classList.toggle("is-shown", state.trap1);
      if (box2) box2.classList.toggle("is-shown", state.trap2);
      if (fixBar) fixBar.classList.toggle("is-shown", state.fix);

      if (btn1) btn1.classList.toggle("is-on-coral", state.trap1);
      if (btn2) btn2.classList.toggle("is-on-amber", state.trap2);
      if (btnFix) btnFix.classList.toggle("is-on-green", state.fix);
    }

    if (btn1) btn1.addEventListener("click", function () { state.trap1 = !state.trap1; render(); });
    if (btn2) btn2.addEventListener("click", function () { state.trap2 = !state.trap2; render(); });
    if (btnFix) btnFix.addEventListener("click", function () { state.fix = !state.fix; render(); });

    function syncFromFragments() {
      var t1 = root.querySelector('.step-triggers [data-pr-step="1"]');
      var t2 = root.querySelector('.step-triggers [data-pr-step="2"]');
      var t3 = root.querySelector('.step-triggers [data-pr-step="3"]');
      state.trap1 = !!(t1 && t1.classList.contains("visible"));
      state.trap2 = !!(t2 && t2.classList.contains("visible"));
      state.fix = !!(t3 && t3.classList.contains("visible"));
      render();
    }

    if (window.Reveal) {
      Reveal.on("fragmentshown", syncFromFragments);
      Reveal.on("fragmenthidden", syncFromFragments);
      Reveal.on("slidechanged", function (ev) {
        if (ev.currentSlide && ev.currentSlide.contains(root)) {
          syncFromFragments();
        }
      });
    }

    render();
  }

  /* ------------------------------------------------------------------------
     Bootstrap on Reveal Ready
     ------------------------------------------------------------------------ */
  function boot() {
    initSalaryPoll();
    initStackLadder();
    initPrDiff();

    if (window.Reveal) {
      Reveal.on("ready", function (ev) { syncDarkChrome(ev.currentSlide); });
      Reveal.on("slidechanged", function (ev) { syncDarkChrome(ev.currentSlide); });
      if (Reveal.isReady && Reveal.isReady()) {
        syncDarkChrome(Reveal.getCurrentSlide());
      }
    }
  }

  if (document.readyState === "complete") boot();
  else window.addEventListener("load", boot);
})();
