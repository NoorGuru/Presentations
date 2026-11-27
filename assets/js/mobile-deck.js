/* Pocket Stage: mobile companion controller for Reveal.js decks.
   Never activates on desktop or when ?remote= / ?deck= remote control is active. */
(function () {
  "use strict";

  var params = new URLSearchParams(location.search);
  if (
    params.has("remote") ||
    params.has("deck") ||
    sessionStorage.getItem("rm-deck") ||
    document.documentElement.classList.contains("rm-remote")
  ) {
    return;
  }

  var mqWidth = window.matchMedia("(max-width: 767px)");
  var mqLandscapePhone = window.matchMedia("(max-height: 500px) and (max-width: 960px)");

  function isMobile() {
    return mqWidth.matches || mqLandscapePhone.matches;
  }

  function isLandscape() {
    return window.innerWidth > window.innerHeight && window.innerHeight <= 540;
  }

  var MOOD_COLOR = {
    paper: "#ffffff",
    tint: "#eef0f5",
    navy: "#141d38",
    amber: "#f7941d"
  };

  var active = false;
  var cinema = false;
  var currentTab = "read";
  var deckHasNotes = false;
  var slides = [];
  var origConfig = null;
  var ui = null;
  var hudTimer = null;
  var dragging = false;
  var scrubTarget = null;
  var eventsBound = false;

  function setThemeColor(hex) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", hex);
  }

  function getMood(slide) {
    if (!slide) return "paper";
    if (slide.classList.contains("navy")) return "navy";
    if (slide.classList.contains("amber")) return "amber";
    if (slide.classList.contains("tint")) return "tint";
    return "paper";
  }

  function cleanText(node) {
    if (!node) return "";
    var parts = [];
    function walk(n) {
      if (n.nodeType === 3) {
        parts.push(n.nodeValue);
        return;
      }
      if (n.nodeType !== 1) return;
      var tag = n.tagName;
      if (
        tag === "SCRIPT" ||
        tag === "STYLE" ||
        tag === "SVG" ||
        tag === "CANVAS" ||
        (n !== node && (
          tag === "ASIDE" ||
          n.getAttribute("aria-hidden") === "true" ||
          n.classList.contains("step-triggers")
        ))
      ) {
        return;
      }
      var isBlock = /^(DIV|P|H[1-6]|LI|BR|TR|TD|TH|SECTION|BLOCKQUOTE)$/.test(tag) || n.classList.contains("line");
      if (isBlock) parts.push(" ");
      for (var i = 0; i < n.childNodes.length; i++) walk(n.childNodes[i]);
      if (isBlock) parts.push(" ");
    }
    walk(node);
    return parts.join("").replace(/\s+/g, " ").trim();
  }

  function isHiddenInsideSlide(el, slide) {
    if (el.closest("aside.notes")) return true;
    var ah = el.closest('[aria-hidden="true"]');
    return Boolean(ah && ah !== slide && slide.contains(ah));
  }

  function extractSlideTitle(slide, fallbackNum) {
    var candidates = slide.querySelectorAll("h1, h2, h3, .t-mega, .t-huge, .t-big, .t-mid, .mm-title, .mx-title");
    for (var i = 0; i < candidates.length; i++) {
      var el = candidates[i];
      if (isHiddenInsideSlide(el, slide)) continue;
      var txt = cleanText(el);
      if (txt) return txt;
    }
    var paras = slide.querySelectorAll("p, li");
    for (var j = 0; j < paras.length; j++) {
      var p = paras[j];
      if (isHiddenInsideSlide(p, slide)) continue;
      var ptxt = cleanText(p);
      if (ptxt) return ptxt;
    }
    return "Slide " + fallbackNum;
  }

  function hasSlideNotes(slide) {
    if (!slide) return false;
    var aside = slide.querySelector("aside.notes");
    return Boolean(aside && (aside.textContent || "").replace(/\s+/g, " ").trim().length > 0);
  }

  function buildIndex() {
    slides = [];
    deckHasNotes = false;
    var topSections = document.querySelectorAll(".reveal .slides > section");
    var flat = 0;
    for (var h = 0; h < topSections.length; h++) {
      var sec = topSections[h];
      var subs = sec.querySelectorAll(":scope > section");
      if (subs.length > 0) {
        var stackTitle = extractSlideTitle(subs[0], flat + 1);
        for (var v = 0; v < subs.length; v++) {
          flat++;
          var sub = subs[v];
          var notes = hasSlideNotes(sub);
          if (notes) deckHasNotes = true;
          slides.push({
            el: sub,
            h: h,
            v: v,
            flat: flat,
            mood: getMood(sub),
            hasNotes: notes,
            chapter: stackTitle,
            title: extractSlideTitle(sub, flat)
          });
        }
      } else {
        flat++;
        var sNotes = hasSlideNotes(sec);
        if (sNotes) deckHasNotes = true;
        var sTitle = extractSlideTitle(sec, flat);
        slides.push({
          el: sec,
          h: h,
          v: 0,
          flat: flat,
          mood: getMood(sec),
          hasNotes: sNotes,
          chapter: sTitle,
          title: sTitle
        });
      }
    }
  }

  function getTalkTitle() {
    var t = document.title || "Presentation";
    return t.replace(/\s*\|\s*Presentations\s*$/i, "").trim() || "Presentation";
  }

  function createUI() {
    if (ui) return;

    var top = document.createElement("header");
    top.className = "mb-top";
    top.innerHTML =
      '<a class="mb-back" href="/" aria-label="All talks">&#8249; Talks</a>' +
      '<div class="mb-top-title"></div>' +
      '<div class="mb-top-actions">' +
        '<button type="button" class="mb-icon-btn" data-mb-focus aria-label="Expand stage">' +
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<polyline points="10 2 14 2 14 6"/><polyline points="6 14 2 14 2 10"/><line x1="14" y1="2" x2="9.5" y2="6.5"/><line x1="2" y1="14" x2="6.5" y2="9.5"/>' +
          "</svg>" +
        "</button>" +
        '<button type="button" class="mb-icon-btn" data-mb-map aria-label="Slide map">' +
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">' +
            '<line x1="3" y1="4" x2="13" y2="4"/><line x1="3" y1="8" x2="13" y2="8"/><line x1="3" y1="12" x2="10" y2="12"/>' +
          "</svg>" +
        "</button>" +
      "</div>";

    var panel = document.createElement("section");
    panel.className = "mb-panel";
    panel.setAttribute("aria-label", "Slide companion");
    panel.innerHTML =
      '<div class="mb-progress-track"><div class="mb-progress-fill"></div></div>' +
      '<div class="mb-subbar">' +
        '<div class="mb-sub-left">' +
          '<span class="mb-chapter-pill"></span>' +
          '<span class="mb-pips" hidden></span>' +
        "</div>" +
        '<div class="mb-tabs" role="tablist" hidden>' +
          '<button type="button" class="mb-tab is-active" role="tab" aria-selected="true" data-mb-tab="read">Read</button>' +
          '<button type="button" class="mb-tab" role="tab" aria-selected="false" data-mb-tab="notes">Notes<span class="mb-tab-dot" hidden></span></button>' +
        "</div>" +
      "</div>" +
      '<div class="mb-body"></div>' +
      '<footer class="mb-dock">' +
        '<div class="mb-scrub" role="slider" aria-label="Slide scrubber" aria-valuemin="1" aria-valuemax="1" aria-valuenow="1">' +
          '<div class="mb-scrub-tip"></div>' +
          '<div class="mb-scrub-rail"><div class="mb-scrub-fill"></div><div class="mb-scrub-thumb"></div></div>' +
        "</div>" +
        '<div class="mb-nav">' +
          '<button type="button" class="mb-btn" data-mb-prev>&#8249; Prev</button>' +
          '<button type="button" class="mb-btn mb-btn-count" data-mb-map aria-label="Open slide list">1 / 1</button>' +
          '<button type="button" class="mb-btn mb-btn-next" data-mb-next>Next &#8250;</button>' +
        "</div>" +
      "</footer>";

    var hud = document.createElement("div");
    hud.className = "mb-hud";
    hud.innerHTML =
      '<div class="mb-hud-row">' +
        '<div class="mb-hud-pill"><a href="/">&#8249; Talks</a></div>' +
        '<div class="mb-hud-pill">' +
          '<button type="button" data-mb-map>Slides</button>' +
          '<button type="button" data-mb-exit-focus>Reader</button>' +
        "</div>" +
      "</div>" +
      '<div class="mb-hud-center">' +
        '<div class="mb-hud-pill">' +
          '<button type="button" data-mb-prev aria-label="Previous slide">&#8249; Prev</button>' +
          '<span class="mb-hud-count">1 / 1</span>' +
          '<button type="button" data-mb-next aria-label="Next slide">Next &#8250;</button>' +
        "</div>" +
      "</div>";

    var drawerWrap = document.createElement("div");
    drawerWrap.className = "mb-drawer-wrap";
    drawerWrap.hidden = true;
    drawerWrap.innerHTML =
      '<div class="mb-drawer" role="dialog" aria-modal="true" aria-labelledby="mb-drawer-title">' +
        '<div class="mb-drawer-handle"></div>' +
        '<div class="mb-drawer-head">' +
          '<h2 id="mb-drawer-title"></h2>' +
          '<button type="button" class="mb-drawer-close" data-mb-drawer-close>Done</button>' +
        "</div>" +
        '<div class="mb-drawer-list"></div>' +
      "</div>";

    document.body.appendChild(top);
    document.body.appendChild(panel);
    document.body.appendChild(hud);
    document.body.appendChild(drawerWrap);

    ui = {
      top: top,
      topTitle: top.querySelector(".mb-top-title"),
      focusBtn: top.querySelector("[data-mb-focus]"),
      panel: panel,
      progressFill: panel.querySelector(".mb-progress-fill"),
      chapterPill: panel.querySelector(".mb-chapter-pill"),
      pips: panel.querySelector(".mb-pips"),
      tabs: panel.querySelector(".mb-tabs"),
      tabRead: panel.querySelector('[data-mb-tab="read"]'),
      tabNotes: panel.querySelector('[data-mb-tab="notes"]'),
      notesDot: panel.querySelector(".mb-tab-dot"),
      body: panel.querySelector(".mb-body"),
      scrub: panel.querySelector(".mb-scrub"),
      scrubTip: panel.querySelector(".mb-scrub-tip"),
      scrubFill: panel.querySelector(".mb-scrub-fill"),
      scrubThumb: panel.querySelector(".mb-scrub-thumb"),
      prevBtn: panel.querySelector("[data-mb-prev]"),
      countBtn: panel.querySelector(".mb-btn-count"),
      nextBtn: panel.querySelector("[data-mb-next]"),
      hud: hud,
      hudExitFocus: hud.querySelector("[data-mb-exit-focus]"),
      hudCount: hud.querySelector(".mb-hud-count"),
      hudPrev: hud.querySelector("[data-mb-prev]"),
      hudNext: hud.querySelector("[data-mb-next]"),
      drawerWrap: drawerWrap,
      drawerTitle: drawerWrap.querySelector("#mb-drawer-title"),
      drawerList: drawerWrap.querySelector(".mb-drawer-list")
    };

    ui.topTitle.textContent = getTalkTitle();
    ui.drawerTitle.textContent = getTalkTitle();
    bindUIEvents();
  }

  function populateDrawer() {
    if (!ui) return;
    ui.drawerList.innerHTML = "";
    slides.forEach(function (s, idx) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "mb-drawer-item";
      btn.dataset.mbSlideIndex = String(idx);

      var sw = document.createElement("span");
      sw.className = "mb-swatch " + s.mood;

      var num = document.createElement("span");
      num.className = "mb-item-num";
      num.textContent = String(s.flat);

      var title = document.createElement("span");
      title.className = "mb-item-title";
      title.textContent = s.title;

      btn.appendChild(sw);
      btn.appendChild(num);
      btn.appendChild(title);

      if (s.hasNotes) {
        var nb = document.createElement("span");
        nb.className = "mb-item-note";
        nb.textContent = "Notes";
        btn.appendChild(nb);
      }

      ui.drawerList.appendChild(btn);
    });
  }

  function openDrawer() {
    if (!ui) return;
    ui.drawerWrap.hidden = false;
    void ui.drawerWrap.offsetWidth;
    ui.drawerWrap.classList.add("is-open");
    var activeItem = ui.drawerList.querySelector(".mb-drawer-item.is-active");
    if (activeItem) {
      activeItem.scrollIntoView({ block: "center" });
    }
  }

  function closeDrawer() {
    if (!ui || ui.drawerWrap.hidden) return;
    ui.drawerWrap.classList.remove("is-open");
    setTimeout(function () {
      if (ui && !ui.drawerWrap.classList.contains("is-open")) {
        ui.drawerWrap.hidden = true;
      }
    }, 220);
  }

  function resetHudTimer() {
    if (!active) return;
    document.documentElement.classList.remove("mb-hud-idle");
    clearTimeout(hudTimer);
    if (cinema || isLandscape()) {
      hudTimer = setTimeout(function () {
        if (active && (cinema || isLandscape()) && (!ui || ui.drawerWrap.hidden)) {
          document.documentElement.classList.add("mb-hud-idle");
        }
      }, 2600);
    }
  }

  function setCinema(on) {
    cinema = Boolean(on);
    document.documentElement.classList.toggle("mb-cinema", cinema);
    if (window.Reveal && Reveal.isReady()) {
      setTimeout(function () { Reveal.layout(); }, 30);
    }
    resetHudTimer();
  }

  function appendFormattedInline(dest, src) {
    for (var i = 0; i < src.childNodes.length; i++) {
      var n = src.childNodes[i];
      if (n.nodeType === 3) {
        dest.appendChild(document.createTextNode(n.nodeValue));
      } else if (n.nodeType === 1) {
        if (n.tagName === "SCRIPT" || n.tagName === "STYLE" || n.tagName === "SVG" || n.getAttribute("aria-hidden") === "true") continue;
        if (n.classList.contains("fragment") && !n.classList.contains("visible")) continue;
        if (n.classList.contains("mark") || n.classList.contains("mark-f")) {
          var m = document.createElement("span");
          m.className = "mb-mark";
          appendFormattedInline(m, n);
          dest.appendChild(m);
        } else if (n.classList.contains("strike")) {
          var st = document.createElement("span");
          st.className = "mb-strike";
          appendFormattedInline(st, n);
          dest.appendChild(st);
        } else if (n.tagName === "CODE") {
          var c = document.createElement("code");
          c.textContent = n.textContent;
          dest.appendChild(c);
        } else if (n.tagName === "STRONG" || n.tagName === "B") {
          var b = document.createElement("strong");
          appendFormattedInline(b, n);
          dest.appendChild(b);
        } else if (n.tagName === "EM" || n.tagName === "I") {
          var em = document.createElement("em");
          appendFormattedInline(em, n);
          dest.appendChild(em);
        } else if (n.tagName === "BR") {
          dest.appendChild(document.createTextNode(" "));
        } else if (n.classList.contains("line")) {
          if (dest.childNodes.length) dest.appendChild(document.createTextNode(" "));
          appendFormattedInline(dest, n);
        } else {
          appendFormattedInline(dest, n);
        }
      }
    }
  }

  function renderRead(slide) {
    var box = document.createElement("div");
    box.className = "mb-read";

    var links = [];
    var seenLinks = {};

    function collectLinks(el) {
      el.querySelectorAll("a[href]").forEach(function (a) {
        if (a.closest("aside.notes") || a.closest('[aria-hidden="true"]')) return;
        var href = a.getAttribute("href") || "";
        if (!href || href.charAt(0) === "#" || /^javascript:/i.test(href)) return;
        if (seenLinks[href]) return;
        seenLinks[href] = true;
        var label = cleanText(a) || href;
        links.push({ href: href, label: label });
      });
    }
    collectLinks(slide);

    var mixer = slide.querySelector("[data-mixer]");
    var prDiff = slide.querySelector("[data-pr-diff]");
    var mindmap = slide.querySelector("[data-mindmap]");

    if (mixer) {
      var mCard = document.createElement("div");
      mCard.className = "mb-interactive";
      var picks = mixer.querySelector("[data-mx-stage]");
      var pickCount = picks ? Number(picks.dataset.picks || "0") : 0;
      var roleText = cleanText(mixer.querySelector("[data-mx-role]"));
      var whyText = cleanText(mixer.querySelector("[data-mx-why]"));
      var noteText = cleanText(mixer.querySelector("[data-mx-note]"));

      var head = document.createElement("b");
      head.textContent = "Interactive Combo Mixer";
      mCard.appendChild(head);

      var hint = document.createElement("span");
      hint.textContent = "Tap any 1 or 2 trait pads on the stage above to mix a career match.";
      mCard.appendChild(hint);

      if (pickCount > 0 && roleText) {
        var live = document.createElement("div");
        live.className = "mb-mixer-live";
        var rEl = document.createElement("strong");
        rEl.textContent = roleText;
        live.appendChild(rEl);
        if (whyText) {
          var wEl = document.createElement("span");
          wEl.textContent = whyText;
          live.appendChild(wEl);
        }
        if (noteText) {
          var nEl = document.createElement("span");
          nEl.textContent = noteText;
          live.appendChild(nEl);
        }
        mCard.appendChild(live);
      }
      box.appendChild(mCard);
    } else if (prDiff) {
      var dCard = document.createElement("div");
      dCard.className = "mb-interactive";
      dCard.innerHTML = "<b>Interactive Pull Request</b><span>Tap highlighted lines or review pills on the stage above, or press Next to step through each bug.</span>";
      box.appendChild(dCard);
    } else if (mindmap) {
      var mmCard = document.createElement("div");
      mmCard.className = "mb-interactive";
      mmCard.innerHTML = "<b>Interactive Mind Map</b><span>Press Next to reveal branches, or tap any revealed hub above to spotlight its roles.</span>";
      box.appendChild(mmCard);
    }

    function shouldSkip(el) {
      if (el.nodeType !== 1) return true;
      var tag = el.tagName;
      if (
        tag === "ASIDE" ||
        tag === "SCRIPT" ||
        tag === "STYLE" ||
        tag === "SVG" ||
        tag === "CANVAS" ||
        el.getAttribute("aria-hidden") === "true" ||
        el.classList.contains("step-triggers") ||
        el.classList.contains("cv-gaze") ||
        el.classList.contains("cv-timer") ||
        el.classList.contains("cv-stamp") ||
        el.classList.contains("mx-pads") ||
        el.classList.contains("mx-eq") ||
        el.classList.contains("mx-arrow") ||
        el.classList.contains("mx-art-box") ||
        el.classList.contains("mx-controls") ||
        el.classList.contains("mx-result") ||
        el.classList.contains("mx-mystery")
      ) {
        return true;
      }
      if (el.classList.contains("fragment") && !el.classList.contains("visible")) {
        return true;
      }
      return false;
    }

    function walkNode(el) {
      if (shouldSkip(el)) return;
      var tag = el.tagName;

      if (/^H[1-6]$/.test(tag)) {
        var hText = cleanText(el);
        if (!hText) return;
        var hEl = document.createElement(tag === "H1" ? "h2" : "h3");
        hEl.className = tag === "H1" ? "mb-h1" : tag === "H2" ? "mb-h2" : "mb-h3";
        hEl.setAttribute("dir", "auto");
        appendFormattedInline(hEl, el);
        if (cleanText(hEl)) box.appendChild(hEl);
        return;
      }

      if (tag === "P") {
        var pText = cleanText(el);
        if (!pText) return;
        if (el.classList.contains("t-mega") || el.classList.contains("t-huge") || el.classList.contains("t-big")) {
          var big = document.createElement("p");
          big.className = "mb-h1";
          big.setAttribute("dir", "auto");
          appendFormattedInline(big, el);
          box.appendChild(big);
        } else {
          var p = document.createElement("p");
          p.className = "mb-p";
          p.setAttribute("dir", "auto");
          appendFormattedInline(p, el);
          if (cleanText(p)) box.appendChild(p);
        }
        return;
      }

      if (tag === "BLOCKQUOTE") {
        var qText = cleanText(el);
        if (!qText) return;
        var q = document.createElement("blockquote");
        q.className = "mb-quote";
        q.setAttribute("dir", "auto");
        appendFormattedInline(q, el);
        box.appendChild(q);
        return;
      }

      if (tag === "UL" || tag === "OL") {
        var list = document.createElement(tag.toLowerCase());
        list.className = "mb-list";
        var lis = el.querySelectorAll(":scope > li");
        var lastVisibleLi = null;
        for (var i = 0; i < lis.length; i++) {
          var srcLi = lis[i];
          if (shouldSkip(srcLi)) continue;
          var txt = cleanText(srcLi);
          if (!txt) continue;
          var li = document.createElement("li");
          li.setAttribute("dir", "auto");
          appendFormattedInline(li, srcLi);
          if (srcLi.classList.contains("fragment") && srcLi.classList.contains("visible")) {
            lastVisibleLi = li;
          }
          list.appendChild(li);
        }
        if (lastVisibleLi) lastVisibleLi.classList.add("is-current");
        if (list.children.length > 0) box.appendChild(list);
        return;
      }

      if (tag === "PRE") {
        var code = el.querySelector("code") || el;
        var raw = code.textContent || "";
        if (!raw.trim()) return;
        var pre = document.createElement("pre");
        pre.className = "mb-code";
        var codeEl = document.createElement("code");
        codeEl.textContent = raw.replace(/^\n+|\n+$/g, "");
        pre.appendChild(codeEl);
        box.appendChild(pre);
        return;
      }

      if (tag === "TABLE") {
        var wrap = document.createElement("div");
        wrap.className = "mb-table-wrap";
        var clone = el.cloneNode(true);
        wrap.appendChild(clone);
        box.appendChild(wrap);
        return;
      }

      if (el.classList.contains("t-mega") || el.classList.contains("t-huge") || el.classList.contains("t-big") || el.classList.contains("t-mid") || el.classList.contains("t-lead")) {
        var dt = cleanText(el);
        if (!dt) return;
        var dp = document.createElement("p");
        dp.className = el.classList.contains("t-lead") ? "mb-p" : "mb-h1";
        dp.setAttribute("dir", "auto");
        appendFormattedInline(dp, el);
        box.appendChild(dp);
        return;
      }

      for (var c = 0; c < el.children.length; c++) {
        walkNode(el.children[c]);
      }
    }

    walkNode(slide);

    var hiddenFrags = 0;
    var seenHiddenIdx = {};
    slide.querySelectorAll(".fragment").forEach(function (f) {
      if (f.classList.contains("visible")) return;
      var idx = f.getAttribute("data-fragment-index");
      if (idx !== null) {
        if (seenHiddenIdx[idx]) return;
        seenHiddenIdx[idx] = true;
      }
      hiddenFrags++;
    });

    if (hiddenFrags > 0) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "mb-more-chip";
      chip.textContent = hiddenFrags === 1
        ? "1 more reveal on this slide \u00b7 Tap to step \u2192"
        : hiddenFrags + " more reveals on this slide \u00b7 Tap to step \u2192";
      chip.addEventListener("click", function () {
        if (window.Reveal) Reveal.next();
      });
      box.appendChild(chip);
    }

    if (links.length > 0) {
      var linksRow = document.createElement("div");
      linksRow.className = "mb-links";
      links.forEach(function (lk) {
        var a = document.createElement("a");
        a.className = "mb-link-chip";
        a.href = lk.href;
        if (/^https?:\/\//i.test(lk.href)) {
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        }
        a.textContent = lk.label + " \u2197";
        linksRow.appendChild(a);
      });
      box.appendChild(linksRow);
    }

    if (box.children.length === 0) {
      var imgs = slide.querySelectorAll("img[alt]");
      var alts = [];
      imgs.forEach(function (img) {
        var alt = (img.getAttribute("alt") || "").trim();
        if (alt) alts.push(alt);
      });
      var empty = document.createElement("p");
      empty.className = "mb-empty";
      empty.textContent = alts.length ? alts.join(" · ") : "Visual slide — view the live stage above.";
      box.appendChild(empty);
    }

    ui.body.innerHTML = "";
    ui.body.appendChild(box);
  }

  function renderNotes(slide) {
    var html = "";
    if (window.Reveal && Reveal.getSlideNotes) {
      html = Reveal.getSlideNotes(slide) || "";
    }
    if (!html) {
      var aside = slide.querySelector("aside.notes");
      if (aside) html = aside.innerHTML;
    }
    if (html && html.trim()) {
      var wrap = document.createElement("div");
      wrap.className = "mb-notes";
      wrap.setAttribute("dir", "auto");
      wrap.innerHTML = html;
      ui.body.innerHTML = "";
      ui.body.appendChild(wrap);
    } else {
      ui.body.innerHTML = '<p class="mb-empty">No speaker notes on this slide.</p>';
    }
  }

  function getFragmentGroups(slide) {
    var total = 0;
    var visible = 0;
    var groups = {};
    var unindexed = [];
    slide.querySelectorAll(".fragment").forEach(function (f) {
      var idx = f.getAttribute("data-fragment-index");
      if (idx !== null) {
        if (!groups[idx]) groups[idx] = [];
        groups[idx].push(f);
      } else {
        unindexed.push(f);
      }
    });
    Object.keys(groups).forEach(function (k) {
      total++;
      if (groups[k].some(function (el) { return el.classList.contains("visible"); })) {
        visible++;
      }
    });
    unindexed.forEach(function (f) {
      total++;
      if (f.classList.contains("visible")) visible++;
    });
    return { total: total, visible: visible };
  }

  function findCurrentEntry(slide) {
    if (window.Reveal && Reveal.getIndices) {
      var indices = Reveal.getIndices();
      var v = indices.v || 0;
      for (var i = 0; i < slides.length; i++) {
        if (slides[i].h === indices.h && slides[i].v === v) return i;
      }
    }
    for (var j = 0; j < slides.length; j++) {
      if (slides[j].el === slide) return j;
    }
    return 0;
  }

  function render() {
    if (!active || !ui || !window.Reveal || !Reveal.isReady()) return;
    var slide = Reveal.getCurrentSlide();
    if (!slide) return;

    var mood = getMood(slide);
    document.documentElement.dataset.mbMood = mood;
    setThemeColor(MOOD_COLOR[mood] || "#ffffff");

    var idx = findCurrentEntry(slide);
    var entry = slides[idx] || { flat: 1, chapter: getTalkTitle(), title: "", hasNotes: false };
    var total = Math.max(1, slides.length);
    var pct = total > 1 ? (idx / (total - 1)) * 100 : 100;

    ui.progressFill.style.width = pct.toFixed(2) + "%";
    ui.chapterPill.textContent = entry.chapter;

    var fragInfo = getFragmentGroups(slide);
    if (fragInfo.total > 0 && fragInfo.total <= 12) {
      ui.pips.hidden = false;
      ui.pips.innerHTML = "";
      for (var p = 0; p < fragInfo.total; p++) {
        var dot = document.createElement("span");
        dot.className = "mb-pip" + (p < fragInfo.visible ? " is-on" : "");
        ui.pips.appendChild(dot);
      }
    } else {
      ui.pips.hidden = true;
    }

    ui.tabs.hidden = !deckHasNotes;
    if (deckHasNotes) {
      ui.notesDot.hidden = !entry.hasNotes;
      ui.tabRead.classList.toggle("is-active", currentTab === "read");
      ui.tabRead.setAttribute("aria-selected", String(currentTab === "read"));
      ui.tabNotes.classList.toggle("is-active", currentTab === "notes");
      ui.tabNotes.setAttribute("aria-selected", String(currentTab === "notes"));
    } else {
      currentTab = "read";
    }

    if (currentTab === "notes" && deckHasNotes) {
      renderNotes(slide);
    } else {
      renderRead(slide);
    }
    ui.body.scrollTop = 0;

    var countText = entry.flat + " / " + total;
    ui.countBtn.textContent = countText;
    ui.hudCount.textContent = countText;

    if (!dragging) {
      ui.scrubFill.style.width = pct.toFixed(2) + "%";
      ui.scrubThumb.style.left = pct.toFixed(2) + "%";
      ui.scrub.setAttribute("aria-valuemax", String(total));
      ui.scrub.setAttribute("aria-valuenow", String(entry.flat));
    }

    var avail = Reveal.availableRoutes({ includeFragments: true });
    var fragAvail = Reveal.availableFragments();
    var atStart = idx === 0 && !fragAvail.prev;
    var atEnd = idx >= total - 1 && !fragAvail.next;

    ui.prevBtn.disabled = atStart;
    ui.hudPrev.disabled = atStart;
    ui.nextBtn.disabled = atEnd;
    ui.hudNext.disabled = atEnd;

    if (fragAvail.next) {
      ui.nextBtn.textContent = "Reveal \u203a";
      ui.nextBtn.classList.add("is-frag");
    } else {
      ui.nextBtn.textContent = "Next \u203a";
      ui.nextBtn.classList.remove("is-frag");
    }

    ui.drawerList.querySelectorAll(".mb-drawer-item").forEach(function (item, i) {
      item.classList.toggle("is-active", i === idx);
    });
  }

  function bindUIEvents() {
    ui.focusBtn.addEventListener("click", function () {
      setCinema(true);
    });
    ui.hudExitFocus.addEventListener("click", function () {
      setCinema(false);
    });

    ui.top.querySelectorAll("[data-mb-map]").forEach(function (btn) {
      btn.addEventListener("click", openDrawer);
    });
    ui.panel.querySelectorAll("[data-mb-map]").forEach(function (btn) {
      btn.addEventListener("click", openDrawer);
    });
    ui.hud.querySelectorAll("[data-mb-map]").forEach(function (btn) {
      btn.addEventListener("click", openDrawer);
    });

    ui.drawerWrap.addEventListener("click", function (e) {
      if (e.target === ui.drawerWrap || e.target.closest("[data-mb-drawer-close]")) {
        closeDrawer();
        return;
      }
      var item = e.target.closest("[data-mb-slide-index]");
      if (!item) return;
      var target = slides[Number(item.dataset.mbSlideIndex)];
      if (target && window.Reveal) {
        Reveal.slide(target.h, target.v, -1);
      }
      closeDrawer();
    });

    ui.tabRead.addEventListener("click", function () {
      if (currentTab === "read") return;
      currentTab = "read";
      render();
    });
    ui.tabNotes.addEventListener("click", function () {
      if (currentTab === "notes") return;
      currentTab = "notes";
      render();
    });

    ui.panel.querySelector("[data-mb-prev]").addEventListener("click", function () {
      if (window.Reveal) Reveal.prev();
    });
    ui.panel.querySelector("[data-mb-next]").addEventListener("click", function () {
      if (window.Reveal) Reveal.next();
    });
    ui.hudPrev.addEventListener("click", function () {
      resetHudTimer();
      if (window.Reveal) Reveal.prev();
    });
    ui.hudNext.addEventListener("click", function () {
      resetHudTimer();
      if (window.Reveal) Reveal.next();
    });

    function scrubAt(clientX, commit) {
      var rect = ui.scrub.getBoundingClientRect();
      var ratio = rect.width > 0 ? Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)) : 0;
      var total = Math.max(1, slides.length);
      var targetIdx = Math.round(ratio * (total - 1));
      var pct = total > 1 ? (targetIdx / (total - 1)) * 100 : 100;
      ui.scrubFill.style.width = pct.toFixed(2) + "%";
      ui.scrubThumb.style.left = pct.toFixed(2) + "%";
      var target = slides[targetIdx];
      if (target) {
        ui.scrubTip.textContent = target.flat + " \u00b7 " + target.title;
        scrubTarget = target;
        if (commit && window.Reveal) {
          Reveal.slide(target.h, target.v, -1);
        }
      }
    }

    ui.scrub.addEventListener("pointerdown", function (e) {
      if (!active || slides.length < 2) return;
      dragging = true;
      ui.scrub.classList.add("is-dragging");
      if (ui.scrub.setPointerCapture) ui.scrub.setPointerCapture(e.pointerId);
      scrubAt(e.clientX, false);
    });
    ui.scrub.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      scrubAt(e.clientX, true);
    });
    function endScrub(e) {
      if (!dragging) return;
      dragging = false;
      ui.scrub.classList.remove("is-dragging");
      if (scrubTarget && window.Reveal) {
        Reveal.slide(scrubTarget.h, scrubTarget.v, -1);
      }
      scrubTarget = null;
      render();
    }
    ui.scrub.addEventListener("pointerup", endScrub);
    ui.scrub.addEventListener("pointercancel", endScrub);

    document.addEventListener("keydown", function (e) {
      if (active && e.key === "Escape" && ui && !ui.drawerWrap.hidden) {
        closeDrawer();
      }
    });
  }

  function bindGlobalEvents() {
    if (eventsBound) return;
    eventsBound = true;

    var revealEl = document.querySelector(".reveal");
    if (revealEl) {
      var sx = null;
      var sy = null;
      var st = 0;
      var skipTouch = false;

      revealEl.addEventListener("touchstart", function (e) {
        if (!active || e.touches.length !== 1) return;
        skipTouch = Boolean(e.target.closest("a, button, [data-mx-pad], [data-mm-branch], [data-toggle], [data-trap], pre, input, textarea"));
        sx = e.touches[0].clientX;
        sy = e.touches[0].clientY;
        st = Date.now();
      }, { passive: true });

      revealEl.addEventListener("touchend", function (e) {
        if (!active || sx === null || sy === null || e.changedTouches.length !== 1) return;
        var dx = e.changedTouches[0].clientX - sx;
        var dy = e.changedTouches[0].clientY - sy;
        var dt = Date.now() - st;
        sx = null;
        sy = null;

        if (skipTouch) {
          setTimeout(function () {
            if (active && currentTab === "read") render();
          }, 50);
          return;
        }

        if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.2 && dt < 700) {
          if (dx < 0) Reveal.next();
          else Reveal.prev();
          resetHudTimer();
        } else if (Math.abs(dx) < 10 && Math.abs(dy) < 10 && (cinema || isLandscape())) {
          if (document.documentElement.classList.contains("mb-hud-idle")) {
            resetHudTimer();
          } else {
            clearTimeout(hudTimer);
            document.documentElement.classList.add("mb-hud-idle");
          }
        }
      }, { passive: true });

      revealEl.addEventListener("click", function (e) {
        if (!active) return;
        if (e.target.closest("[data-mx-pad], [data-mx-reset], [data-mm-branch], [data-toggle], [data-trap]")) {
          setTimeout(function () {
            if (active && currentTab === "read") render();
          }, 60);
        }
      }, true);
    }

    ["ready", "slidechanged", "fragmentshown", "fragmenthidden"].forEach(function (ev) {
      Reveal.on(ev, function () {
        if (active) render();
      });
    });
  }

  function activate() {
    var root = document.documentElement;
    var land = isLandscape();
    root.classList.add("mb-stage");
    root.classList.toggle("mb-landscape", land);

    if (!origConfig && Reveal.getConfig) {
      var cfg = Reveal.getConfig();
      origConfig = {
        view: cfg.view || null,
        scrollActivationWidth: cfg.scrollActivationWidth,
        controls: cfg.controls,
        progress: cfg.progress,
        touch: cfg.touch,
        margin: cfg.margin,
        transitionSpeed: cfg.transitionSpeed
      };
    }

    createUI();
    bindGlobalEvents();

    if (!active) {
      active = true;
      Reveal.configure({
        view: null,
        scrollActivationWidth: 0,
        controls: false,
        progress: false,
        touch: false,
        margin: 0.02,
        transitionSpeed: "fast"
      });
      Reveal.layout();
    }

    buildIndex();
    populateDrawer();

    ui.top.hidden = false;
    ui.panel.hidden = false;
    ui.hud.hidden = false;

    setTimeout(function () {
      if (!active) return;
      Reveal.layout();
      if (slides.length === 0) {
        buildIndex();
        populateDrawer();
      }
      render();
      resetHudTimer();
    }, 30);
  }

  function deactivate() {
    if (!active) return;
    active = false;
    cinema = false;
    clearTimeout(hudTimer);
    closeDrawer();

    var root = document.documentElement;
    root.classList.remove("mb-stage", "mb-landscape", "mb-cinema", "mb-hud-idle");
    delete root.dataset.mbMood;
    setThemeColor("#ffffff");

    if (ui) {
      ui.top.hidden = true;
      ui.panel.hidden = true;
      ui.hud.hidden = true;
    }

    if (origConfig && window.Reveal) {
      Reveal.configure(origConfig);
      setTimeout(function () { Reveal.layout(); }, 30);
    }
  }

  function syncViewport() {
    if (
      params.has("remote") ||
      params.has("deck") ||
      sessionStorage.getItem("rm-deck") ||
      document.documentElement.classList.contains("rm-remote")
    ) {
      deactivate();
      return;
    }
    if (isMobile()) {
      activate();
    } else {
      deactivate();
    }
  }

  function boot() {
    if (!window.Reveal) return;
    if (Reveal.isReady && Reveal.isReady()) {
      syncViewport();
    } else {
      Reveal.on("ready", syncViewport);
    }

    var resizeTimer = null;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(syncViewport, 50);
    }
    if (mqWidth.addEventListener) {
      mqWidth.addEventListener("change", syncViewport);
      mqLandscapePhone.addEventListener("change", syncViewport);
    } else if (mqWidth.addListener) {
      mqWidth.addListener(syncViewport);
      mqLandscapePhone.addListener(syncViewport);
    }
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
  }

  if (document.readyState === "complete") boot();
  else window.addEventListener("load", boot);
})();
