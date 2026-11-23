/**
 * Stage behaviour for /ai-swe-2026/
 * - footer contrast on navy and amber slides
 * - numbers that count up when their slide opens
 * - the stack ladder (clicker, click, or keys 0-5)
 * - the pull request diff (clicker, buttons, line click, or keys 1-3)
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

  /* ---------- Language cycle ---------- */
  /* Clicker-driven: each step uses the same .strike sweep as the rest of the deck.
     ↓ normally skips fragments. Remap it on this slide so Space and ↓ both step. */

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

  /* ---------- Styled QR ---------- */
  /* Hugo renders a plain QR image at build time. Read its modules and redraw them
     as dots with rounded finder eyes. The <img> stays as the no-JS fallback. */

  var SVG_NS = "http://www.w3.org/2000/svg";

  function svgEl(name, attrs) {
    var el = document.createElementNS(SVG_NS, name);
    Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    return el;
  }

  function readModules(img, scale) {
    var c = document.createElement("canvas");
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    var ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var px = ctx.getImageData(0, 0, c.width, c.height).data;
    var isDark = function (x, y) { return px[(y * c.width + x) * 4] < 128; };
    var minX = c.width, maxX = -1, minY = c.height;
    for (var y = 0; y < c.height; y++) {
      for (var x = 0; x < c.width; x++) {
        if (isDark(x, y)) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
        }
      }
    }
    var n = Math.round((maxX - minX + 1) / scale);
    var grid = [];
    for (var r = 0; r < n; r++) {
      var row = [];
      for (var col = 0; col < n; col++) {
        row.push(isDark(minX + col * scale + (scale >> 1), minY + r * scale + (scale >> 1)));
      }
      grid.push(row);
    }
    return grid;
  }

  function buildQr(img) {
    var grid = readModules(img, Number(img.getAttribute("data-qr")));
    var n = grid.length;
    var badge = img.getAttribute("data-qr-badge");
    var mid = (n - 1) / 2;
    var maxD = Math.sqrt(2) * mid;

    var svg = svgEl("svg", { viewBox: "0 0 " + n + " " + n, class: img.className + " qr-svg", role: "img", "aria-label": img.alt });
    img.replaceWith(svg);

    var pill = null;
    if (badge) {
      /* Text this small renders too big in Safari, so draw it 10x and scale the group down. */
      var S = 10;
      var b = svgEl("g", { class: "qr-badge" });
      var inner = svgEl("g", { transform: "translate(" + n / 2 + " " + n / 2 + ") scale(" + 1 / S + ")" });
      var bg = svgEl("rect", { class: "qr-badge-bg" });
      var t = svgEl("text", { x: 0, y: 0, class: "qr-badge-text", "text-anchor": "middle" });
      var split = badge.indexOf(".");
      var name = svgEl("tspan", {});
      name.textContent = split > 0 ? badge.slice(0, split) : badge;
      t.appendChild(name);
      if (split > 0) {
        var tld = svgEl("tspan", { class: "qr-badge-tld" });
        tld.textContent = badge.slice(split);
        t.appendChild(tld);
      }
      inner.appendChild(bg);
      inner.appendChild(t);
      b.appendChild(inner);
      svg.appendChild(b);

      var cs = getComputedStyle(t);
      var size = parseFloat(cs.fontSize);
      var ctx = document.createElement("canvas").getContext("2d");
      ctx.font = cs.fontWeight + " 100px " + cs.fontFamily;
      var m = ctx.measureText(badge);
      var k = size / 100;
      var asc = m.actualBoundingBoxAscent * k;
      var desc = m.actualBoundingBoxDescent * k;
      t.setAttribute("y", (asc - desc) / 2);
      var tw = Math.max(m.width * k, t.getComputedTextLength());
      var pw = tw + size * 1.4;
      var ph = asc + desc + size * 0.8;
      bg.setAttribute("x", -pw / 2);
      bg.setAttribute("y", -ph / 2);
      bg.setAttribute("width", pw);
      bg.setAttribute("height", ph);
      bg.setAttribute("rx", ph / 2);
      pill = { x: (n - pw / S) / 2, y: (n - ph / S) / 2, w: pw / S, h: ph / S };
    }

    var gap = 0.7;
    var inEye = function (r, c) { return (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7); };
    var inHole = function (r, c) {
      return pill && c + 1 > pill.x - gap && c < pill.x + pill.w + gap && r + 1 > pill.y - gap && r < pill.y + pill.h + gap;
    };
    var dots = svgEl("g", { class: "qr-dots" });
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        if (!grid[r][c] || inEye(r, c) || inHole(r, c)) continue;
        var d = Math.sqrt((r - mid) * (r - mid) + (c - mid) * (c - mid)) / maxD;
        var dot = svgEl("circle", { cx: c + 0.5, cy: r + 0.5, r: 0.43, class: "qr-dot" });
        dot.style.setProperty("--qd", (d * 0.9).toFixed(3) + "s");
        dots.appendChild(dot);
      }
    }
    svg.insertBefore(dots, svg.firstChild);

    [[0, 0], [0, n - 7], [n - 7, 0]].forEach(function (p) {
      var g = svgEl("g", { class: "qr-eye" });
      g.appendChild(svgEl("rect", { x: p[1] + 0.5, y: p[0] + 0.5, width: 6, height: 6, rx: 1.6, class: "qr-eye-ring" }));
      g.appendChild(svgEl("rect", { x: p[1] + 2, y: p[0] + 2, width: 3, height: 3, rx: 0.8, class: "qr-eye-core" }));
      svg.insertBefore(g, pill ? svg.lastChild : null);
    });
  }

  function initQr() {
    var family = getComputedStyle(document.documentElement).getPropertyValue("--font").trim();
    var fonts = document.fonts
      ? Promise.all([document.fonts.ready, family ? document.fonts.load("800 36px " + family).catch(function () {}) : null])
      : Promise.resolve();
    document.querySelectorAll("img[data-qr]").forEach(function (img) {
      var loaded = img.complete && img.naturalWidth ? Promise.resolve() : new Promise(function (res) { img.addEventListener("load", res, { once: true }); });
      Promise.all([loaded, fonts]).then(function () { buildQr(img); });
    });
  }

  function boot() {
    if (!window.Reveal) return;
    initQr();
    initDiff();
    initLangCycle();
    initStepFragments();
    Reveal.on("slidechanged", function (ev) { onSlide(ev.currentSlide); });
    if (Reveal.isReady()) onSlide(Reveal.getCurrentSlide());
    else Reveal.on("ready", function (ev) { onSlide(ev.currentSlide); });
  }

  if (document.readyState === "complete") boot();
  else window.addEventListener("load", boot);
})();
