/* Find Your Career Path. Runs after ai-swe-2026.js (counters, stepping, QR).
   Drives the Mind Map ("One tap. 13 jobs.") and the Interactive Combo Mixer ("Mix what you love."). */
(function () {
  var TRAITS = {
    visuals: "Visuals",
    code: "Code",
    break: "Breaking stuff",
    numbers: "Numbers",
    puzzles: "Puzzles",
    speed: "Speed",
    people: "People",
    shortcuts: "Shortcuts"
  };

  /* 8 single-trait sparks + all 28 two-trait combos (sorted keys joined by "+"). */
  var COMBOS = {
    /* Singles */
    visuals: {
      role: "UI/UX Design.",
      why: "You spot an ugly button from across the room.",
      note: "Start with Figma · redesign one screen you hate",
      art: "door"
    },
    code: {
      role: "Software Engineering.",
      why: "Give you a blank editor and watch what happens.",
      note: "Start with one language, one real project",
      art: "screen"
    },
    break: {
      role: "QA Automation.",
      why: "Paid to break your friend’s code before users do.",
      note: "Start with Playwright · write 10 tests for a friend",
      art: "hammer"
    },
    numbers: {
      role: "Data.",
      why: "You don’t guess. You check the numbers.",
      note: "Start with SQL · find one surprising chart",
      art: "ai"
    },
    puzzles: {
      role: "Backend & Security.",
      why: "The harder the mystery, the happier you are.",
      note: "Start with one API or a weekend CTF",
      art: "vault"
    },
    speed: {
      role: "DevOps & Cloud.",
      why: "If you do it twice, you automate it.",
      note: "Start with Linux, Docker, and GitHub Actions",
      art: "rocket"
    },
    people: {
      role: "Product Manager.",
      why: "You care about who uses it, not just the library.",
      note: "Talk to real users · write a one-page plan",
      art: "compass"
    },
    shortcuts: {
      role: "Low Code.",
      why: "Why forge steel when you can snap bricks?",
      note: "Start with Power Apps or OutSystems",
      art: "bricks"
    },

    /* All 28 pairs (alphabetical keys) */
    "code+visuals": {
      role: "Frontend & Mobile.",
      why: "You want to design it AND make every pixel move.",
      note: "Start with HTML, CSS, JavaScript, or Flutter",
      art: "screen"
    },
    "break+visuals": {
      role: "Frontend QA.",
      why: "Zero broken layouts survive your eyes.",
      note: "Visual regression testing · Playwright + CSS",
      art: "hammer"
    },
    "numbers+visuals": {
      role: "Data Visualization.",
      why: "Turn 100,000 messy rows into one clear story.",
      note: "Start with SQL, Python, and interactive charts",
      art: "ai"
    },
    "puzzles+visuals": {
      role: "UX Research & Design.",
      why: "Figure out why real humans tap the wrong button.",
      note: "Watch 5 friends use an app · fix what trips them",
      art: "door"
    },
    "speed+visuals": {
      role: "Design Systems.",
      why: "Build fast, reusable UI blocks for 50 engineers.",
      note: "Figma components + React or CSS tokens",
      art: "screen"
    },
    "people+visuals": {
      role: "Product Design.",
      why: "Listen to users, then make the app feel effortless.",
      note: "Start with Figma + user interviews",
      art: "door"
    },
    "shortcuts+visuals": {
      role: "Webflow & No-Code UI.",
      why: "Ship gorgeous sites and prototypes before lunch.",
      note: "Great for freelancing and fast startups",
      art: "bricks"
    },
    "break+code": {
      role: "QA Automation (SDET).",
      why: "Write code whose only job is hunting bugs.",
      note: "Playwright, Selenium, and CI test pipelines",
      art: "hammer"
    },
    "code+numbers": {
      role: "AI & Machine Learning.",
      why: "Teach machines using math, data, and code.",
      note: "Python, linear algebra, and LLM apps",
      art: "ai"
    },
    "code+puzzles": {
      role: "Backend Engineering.",
      why: "Hard logic, scale, and 3 AM mysteries.",
      note: "One language + SQL + Spring or Node.js",
      art: "rocket"
    },
    "code+speed": {
      role: "Backend & DevOps.",
      why: "Make it fast. Make it survive a million users.",
      note: "Docker, CI/CD, cloud servers, and APIs",
      art: "rocket"
    },
    "code+people": {
      role: "Tech Lead / TPM.",
      why: "You speak fluent code AND fluent human.",
      note: "Start as an engineer · lead the group project",
      art: "compass"
    },
    "code+shortcuts": {
      role: "AI Engineering.",
      why: "Build smart tools and agents that skip boring work.",
      note: "LLM APIs, MCP, and automation scripts",
      art: "ai"
    },
    "break+numbers": {
      role: "Performance Testing.",
      why: "Throw 100,000 fake users at it and watch the graphs.",
      note: "Load testing with k6 or JMeter + metrics",
      art: "hammer"
    },
    "break+puzzles": {
      role: "Cyber Security.",
      why: "Break in first, so the bad guys can’t.",
      note: "Start with OWASP Top 10 and TryHackMe CTFs",
      art: "vault"
    },
    "break+speed": {
      role: "Site Reliability (SRE).",
      why: "Break servers on purpose so prod never goes down.",
      note: "Linux, cloud, monitoring, and chaos drills",
      art: "rocket"
    },
    "break+people": {
      role: "Product QA & Security.",
      why: "Protect real users from every edge case.",
      note: "Bug hunting + clear reports teams love",
      art: "hammer"
    },
    "break+shortcuts": {
      role: "Test Automation.",
      why: "Record once. Test a thousand clicks while you sleep.",
      note: "Playwright codegen + GitHub Actions",
      art: "hammer"
    },
    "numbers+puzzles": {
      role: "Data & AI.",
      why: "Find the hidden signal, then teach a machine.",
      note: "Start with SQL, Python, and one real dataset",
      art: "ai"
    },
    "numbers+speed": {
      role: "Data Engineering.",
      why: "Move millions of rows a second without dropping one.",
      note: "SQL, Python, pipelines, and cloud storage",
      art: "rocket"
    },
    "numbers+people": {
      role: "Product Analytics.",
      why: "Use real user data to decide what to build next.",
      note: "SQL + experiments + storytelling",
      art: "compass"
    },
    "numbers+shortcuts": {
      role: "BI & Dashboards.",
      why: "Turn messy spreadsheets into live dashboards fast.",
      note: "SQL + Power BI or Looker",
      art: "bricks"
    },
    "puzzles+speed": {
      role: "Networks & Cloud.",
      why: "How a packet flies across the planet in 28 ms.",
      note: "Packet Tracer, Linux networking, cloud VPCs",
      art: "vault"
    },
    "people+puzzles": {
      role: "Product & Program.",
      why: "Decide what to build, and rally the whole room.",
      note: "Lead a club project · learn how teams ship",
      art: "compass"
    },
    "puzzles+shortcuts": {
      role: "AI Agents & Automation.",
      why: "Wire smart tools together to solve messy tasks.",
      note: "n8n, MCP tools, and small scripts",
      art: "ai"
    },
    "people+speed": {
      role: "Program Manager (TPM).",
      why: "Keep five teams shipping on time without chaos.",
      note: "The friend who saves the graduation project",
      art: "compass"
    },
    "shortcuts+speed": {
      role: "Low Code.",
      why: "Solve the business problem before lunch.",
      note: "Power Apps, OutSystems, plus the basics",
      art: "bricks"
    },
    "people+shortcuts": {
      role: "Solutions & Low Code.",
      why: "Talk to the team at 10 AM. Demo an app at 2 PM.",
      note: "Fast internal tools for banks and big companies",
      art: "bricks"
    }
  };

  function boot() {
    var R = window.Reveal;
    if (!R) return;

    /* ---------- Mind Map ---------- */
    function renderMindmap(mm) {
      var slide = mm.closest("section");
      var step = 0;
      if (slide) {
        slide.querySelectorAll("[data-mm-step]").forEach(function (f) {
          var n = Number(f.dataset.mmStep);
          if (f.classList.contains("visible") && n > step) step = n;
        });
      }
      mm.dataset.step = String(step);
      var focus = Number(mm.dataset.focus || "0");

      mm.querySelectorAll("[data-mm-branch]").forEach(function (b) {
        var n = Number(b.dataset.mmBranch);
        var shown = n <= step || step >= 5;
        b.classList.toggle("is-shown", shown);
        var active = false;
        if (focus > 0) {
          active = n === focus;
        } else if (step >= 5) {
          active = true;
        } else if (step > 0) {
          active = n === step;
        }
        b.classList.toggle("is-active", shown && active);
      });
    }

    document.querySelectorAll("[data-mindmap]").forEach(function (mm) {
      mm.querySelectorAll("[data-mm-branch]").forEach(function (b) {
        b.addEventListener("click", function (e) {
          if (!b.classList.contains("is-shown")) return;
          e.stopPropagation();
          var n = b.dataset.mmBranch;
          mm.dataset.focus = mm.dataset.focus === n ? "0" : n;
          renderMindmap(mm);
        });
      });
    });

    /* ---------- Interactive Combo Mixer ---------- */
    function setupMixer(mx) {
      var stage = mx.querySelector("[data-mx-stage]");
      var slotALabel = mx.querySelector("[data-mx-a-label]");
      var slotBLabel = mx.querySelector("[data-mx-b-label]");
      var result = mx.querySelector("[data-mx-result]");
      var eyebrow = mx.querySelector("[data-mx-eyebrow]");
      var role = mx.querySelector("[data-mx-role]");
      var why = mx.querySelector("[data-mx-why]");
      var note = mx.querySelector("[data-mx-note]");
      var resetBtn = mx.querySelector("[data-mx-reset]");
      var pads = mx.querySelectorAll("[data-mx-pad]");

      var manualPicks = null;
      var lastKey = "";

      function applyPicks(picks, forcePop) {
        var clean = picks.filter(function (id) { return Boolean(TRAITS[id]); }).slice(0, 2);
        var key = clean.slice().sort().join("+");

        pads.forEach(function (pad) {
          pad.classList.toggle("is-on", clean.indexOf(pad.dataset.mxPad) !== -1);
        });

        stage.dataset.picks = String(clean.length);
        resetBtn.hidden = manualPicks === null;

        if (clean.length === 0) {
          lastKey = "";
          return;
        }

        slotALabel.textContent = TRAITS[clean[0]];
        if (clean.length === 2) {
          slotBLabel.textContent = TRAITS[clean[1]];
        }

        var match = COMBOS[key] || COMBOS[clean[0]];
        if (match) {
          eyebrow.textContent = clean.length === 2 ? "COMBO UNLOCKED!" : "YOU’RE GONNA LOVE";
          role.textContent = match.role;
          why.textContent = match.why;
          note.textContent = match.note;
          result.dataset.art = match.art;
        }

        if (forcePop || key !== lastKey) {
          stage.classList.remove("is-pop");
          void stage.offsetWidth;
          stage.classList.add("is-pop");
          lastKey = key;
        }
      }

      function syncFromReveal() {
        manualPicks = null;
        var step = 0;
        var picks = [];
        mx.querySelectorAll("[data-mx-step]").forEach(function (f) {
          var n = Number(f.dataset.mxStep);
          if (f.classList.contains("visible") && n > step) {
            step = n;
            picks = (f.dataset.mxPick || "").split(",").filter(Boolean);
          }
        });
        mx.dataset.step = String(step);
        applyPicks(picks, false);
      }

      pads.forEach(function (pad) {
        pad.addEventListener("click", function (e) {
          e.stopPropagation();
          var id = pad.dataset.mxPad;
          if (!manualPicks) {
            /* Start from current picks if 1 trait is active, otherwise fresh */
            manualPicks = [];
          }
          var idx = manualPicks.indexOf(id);
          if (idx !== -1) {
            manualPicks.splice(idx, 1);
          } else if (manualPicks.length >= 2) {
            manualPicks = [id];
          } else {
            manualPicks.push(id);
          }
          if (manualPicks.length === 0) {
            manualPicks = null;
            applyPicks([], true);
          } else {
            applyPicks(manualPicks, true);
          }
        });
      });

      resetBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        syncFromReveal();
      });

      mx._syncMixer = syncFromReveal;
    }

    document.querySelectorAll("[data-mixer]").forEach(setupMixer);

    function syncAll() {
      document.querySelectorAll("[data-mindmap]").forEach(function (mm) {
        mm.dataset.focus = "0";
        renderMindmap(mm);
      });
      document.querySelectorAll("[data-mixer]").forEach(function (mx) {
        if (mx._syncMixer) mx._syncMixer();
      });
    }

    ["ready", "slidechanged", "fragmentshown", "fragmenthidden"].forEach(function (e) {
      R.on(e, syncAll);
    });
    syncAll();
  }

  if (document.readyState === "complete") boot();
  else window.addEventListener("load", boot);
})();
