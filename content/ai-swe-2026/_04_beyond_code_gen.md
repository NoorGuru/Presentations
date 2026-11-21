+++
outputs = ["Reveal"]
weight = 5
+++

{{% section %}}

{{< slide class="dark-coral" >}}

<div class="act-wrap">
  <div class="act-ghost-num">04</div>
  <div>
    <span class="eyebrow eyebrow--dark-coral">ACT 04 · 0:20 – 0:28</span>
  </div>
  <h1 class="act-title">AI is fast. Fast at bugs, too.</h1>
  <p class="act-sub">A student-level example, then one story from this week.</p>
  <div class="act-bar act-bar--coral"></div>
</div>

{{% note %}}
**0:20 · Keep this concrete**
- One idea: speed copies your habits. Then a Java snippet they can actually see, then Java4Shell in one minute, no internals.
{{% /note %}}

---

<span class="eyebrow eyebrow--coral">THE TRAP</span>
<h2 class="slide-title">Same tool. Two outcomes.</h2>

<div class="velocity-grid">
  <div class="velocity-card velocity-card--good">
    <div class="eyebrow eyebrow--teal" style="align-self:flex-start;margin:0;">YOU UNDERSTAND THE CODE</div>
    <div class="velocity-big">Faster</div>
    <div>
      <div class="velocity-label">You still know what shipped</div>
      <div class="velocity-sub">AI drafts. You check it, test it, and can explain it.</div>
    </div>
  </div>
  <div class="velocity-card velocity-card--trap fragment">
    <div class="eyebrow eyebrow--coral" style="align-self:flex-start;margin:0;">YOU PASTE AND HOPE</div>
    <div class="velocity-big">Faster</div>
    <div>
      <div class="velocity-label">You ship bugs you can't see</div>
      <div class="velocity-sub">It compiles. The demo works. The bug is still in there.</div>
    </div>
  </div>
</div>

<div class="punch-banner fragment">
  Look at this login method. <strong>What would you refuse to merge?</strong>
</div>

{{% note %}}
**0:21 · 20 seconds, then the code**
- Don't say "technical debt." Say: if you don't understand it, you just get wrong code sooner.
- Tell them the next screen compiles and the happy path works.
{{% /note %}}

---

<div data-pr-diff>
  <div class="pr-top">
    <div>
      <span class="eyebrow eyebrow--coral" style="margin-bottom:10px;">LOOK AT THE CODE · YELL IT OUT</span>
      <h2 class="slide-title" style="font-size:58px !important;margin:0 !important;">It compiles. The demo logs in. What's wrong?</h2>
    </div>
    <div class="pr-pills">
      <button type="button" class="pr-btn" data-toggle="trap1">Bug 1: SQL</button>
      <button type="button" class="pr-btn" data-toggle="trap2">Bug 2: ==</button>
      <button type="button" class="pr-btn" data-toggle="fix">Show the fix</button>
    </div>
  </div>
  <div class="pr-shell">
    <div class="pr-header">
      <div class="pr-header-left">
        <span class="pr-status-open">Open</span>
        <strong>PR #12</strong>
        <span>LoginService.java</span>
      </div>
      <span class="pr-diffstat">+8  -0</span>
    </div>
    <div class="pr-code">
      <div class="diff-line"><span class="diff-ln">1</span><span class="diff-sign">+</span><span>public boolean login(String email, String password) {</span></div>
      <div class="diff-line" data-trap="1"><span class="diff-ln">2</span><span class="diff-sign">+</span><span>    String sql = "SELECT * FROM users WHERE email = '" + email + "'";</span></div>
      <div class="diff-line"><span class="diff-ln">3</span><span class="diff-sign">+</span><span>    User user = db.query(sql);</span></div>
      <div class="diff-line"><span class="diff-ln">4</span><span class="diff-sign">+</span><span></span></div>
      <div class="diff-line" data-trap="2"><span class="diff-ln">5</span><span class="diff-sign">+</span><span>    if (user != null &amp;&amp; user.password == password) {</span></div>
      <div class="diff-line"><span class="diff-ln">6</span><span class="diff-sign">+</span><span>        return true;</span></div>
      <div class="diff-line"><span class="diff-ln">7</span><span class="diff-sign">+</span><span>    }</span></div>
      <div class="diff-line"><span class="diff-ln">8</span><span class="diff-sign">+</span><span>    return false;</span></div>
      <div class="diff-line"><span class="diff-ln">9</span><span class="diff-sign">+</span><span>}</span></div>
    </div>
  </div>
  <div class="pr-annotations">
    <div class="pr-review-box pr-review-box--coral" data-review="1">
      <div class="pr-review-title">BUG 1 · THE EMAIL IS GLUED INTO THE SQL</div>
      <div class="pr-review-text">Whatever the user types becomes part of the query. Use a placeholder, not string concat.</div>
    </div>
    <div class="pr-review-box pr-review-box--amber" data-review="2">
      <div class="pr-review-title">BUG 2 · == IS THE WRONG CHECK</div>
      <div class="pr-review-text">In Java, == asks "same object?", not "same text?". Use equals(). AI writes this a lot.</div>
    </div>
  </div>
  <div class="pr-fix-bar" data-fix-bar>
    Fix: a SQL placeholder for the email, and <strong>password.equals(...)</strong> — then you still read the diff before you merge.
  </div>
  <div class="step-triggers" aria-hidden="true">
    <span class="fragment" data-pr-step="1"></span>
    <span class="fragment" data-pr-step="2"></span>
    <span class="fragment" data-pr-step="3"></span>
  </div>
</div>

{{% note %}}
**0:22 – 0:25 · Let them shout. Then reveal.**
- Give them 20–30 seconds. Ask a couple of people before you click.
- **Bug 1:** the email is concatenated into SQL. They've seen this if they took databases. You don't need the attack string. Just: the user controls the query. Fix is a placeholder / prepared statement.
- **Bug 2:** `==` on strings. First-year Java. AI still ships it because the happy path can pass if both sides happen to be the same object.
- **Fix:** say the rule, don't live-code it. "AI wrote a draft. You are the one who knows SQL and Java."
- Optional verbal extra if someone spots it: the password is compared in plain text. Don't turn that into a third lecture.
{{% /note %}}

---

<span class="eyebrow eyebrow--teal">WHERE TO USE AI</span>
<h2 class="slide-title">Not only in the middle.</h2>

<div class="sdlc-flow">
  <div class="sdlc-stage sdlc-stage--up fragment">
    <div class="sdlc-tag">BEFORE YOU CODE</div>
    <h3 class="sdlc-title">Ask it to poke holes</h3>
    <ul class="sdlc-list">
      <li>→ What's weak in this idea?</li>
      <li>→ What input breaks it?</li>
    </ul>
  </div>
  <div class="sdlc-stage sdlc-stage--mid">
    <div class="sdlc-tag">WHILE YOU CODE</div>
    <h3 class="sdlc-title">Let it draft</h3>
    <ul class="sdlc-list">
      <li>→ First version</li>
      <li>→ Boring boilerplate</li>
    </ul>
  </div>
  <div class="sdlc-stage sdlc-stage--down fragment">
    <div class="sdlc-tag">BEFORE YOU SUBMIT</div>
    <h3 class="sdlc-title">Then you check</h3>
    <ul class="sdlc-list">
      <li>→ Ask for tests</li>
      <li>→ Read the diff yourself</li>
    </ul>
  </div>
</div>

<div class="merge-rule fragment">
  AI writes the draft. <span>You explain it, or you don't merge it.</span>
</div>

{{% note %}}
**0:25 – 0:26**
- Most of them only use the middle box: "write my code."
- The useful move is before (critique my idea) and after (tests, then I read it).
- Say the bottom line slowly. Then: "And this isn't only student homework. This week, AI found a bug inside Java itself."
{{% /note %}}

---

{{< slide class="dark-coral" >}}

<span class="eyebrow eyebrow--dark-coral">THIS WEEK · JAVA4SHELL</span>
<h2 class="slide-title" style="font-size:68px !important;">Under $200 of AI. Then every Java system needed a fix.</h2>

<div class="cve-grid">
  <div class="cve-stat cve-stat--orange fragment">
    <div class="cve-stat-tag">WHAT IT COST TO FIND</div>
    <div class="cve-stat-num">&lt; $200</div>
    <div class="cve-stat-desc">A few hours with AI. A researcher pointed it at Java itself and found a serious bug.</div>
  </div>
  <div class="cve-stat cve-stat--coral fragment">
    <div class="cve-stat-tag">WHAT BROKE</div>
    <div class="cve-stat-num">Java</div>
    <div class="cve-stat-desc">Not one app. The runtime. Companies had to patch Java across their systems.</div>
  </div>
  <div class="cve-stat cve-stat--teal fragment">
    <div class="cve-stat-tag">WHAT THAT LOOKS LIKE</div>
    <div class="cve-stat-num">2 days ago</div>
    <div class="cve-stat-desc">We were still rolling that fix out. The whole Java estate, not one repo.</div>
  </div>
</div>

<div class="cve-bottom fragment">
  <div class="cve-quote">
    The AI got there faster. A person still had to understand the bug.
  </div>
  <div class="cve-bridge">
    Finding it was cheap.<br>
    <strong>Fixing it everywhere was the job.</strong>
  </div>
</div>

{{% note %}}
**0:26 – 0:28 · One story. No assembly, no payload, no CVE number unless someone asks.**
- November 17, 2026. Researchers named it Java4Shell. A bug in Java's own Base64 decoder. On some servers it can be serious. You do not need the trigger string or the CPU details on stage.
- The number that matters for this room: under $200 and a few hours of AI. Then companies had to patch Java everywhere.
- Your part, said out loud, not as a logo: about two days ago we were still pushing that fix across our Java systems. It wasn't one service. It was the platform.
- If they ask "how bad": high risk, not "the internet is on fire," and it depends on the machine. Don't oversell it into Log4Shell.
- Bridge: "That's the job AI doesn't remove. Someone has to understand the change and roll it out safely. Which is the next story, told simply."
- This act is one column: trap → login bug → where to use AI → Java4Shell. Space walks down. → jumps to the work story.
{{% /note %}}

{{% /section %}}
