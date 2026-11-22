+++
outputs = ["Reveal"]
weight = 5
+++

{{% section %}}

{{< slide class="amber" >}}

<div class="stage">
  <h1 class="t-huge"><span class="line"><span>AI is a</span></span><span class="line"><span class="d2"><span class="mark" style="--md:0.85s;">multiplier.</span></span></span></h1>
  <p class="t-lead in d5" style="max-width:none;">Whatever habits you bring, it hits 10×.</p>
</div>

{{% note %}}
**0:17 · Keep this concrete.** One idea: AI doesn't replace your habits, it multiplies them. Then a real Java PR they can inspect, then Java4Shell in one minute, no internals.
{{% /note %}}

---

{{< slide class="bleed" >}}

<div class="halves" data-step-fragments>
  <div class="half paper">
    <p class="t-small in">Strong foundation</p>
    <div class="mult-word">
      <span class="mult-x num in d1">10×</span>
      <h2 class="t-big"><span class="line"><span class="d2">leverage.</span></span></h2>
    </div>
  </div>
  <div class="half dark">
    <div class="mult-right fragment">
      <p class="t-small">Paste and pray</p>
      <div class="mult-word">
        <span class="mult-x num">10×</span>
        <h2 class="t-big">the mess.</h2>
      </div>
    </div>
  </div>
</div>

{{% note %}}
**0:18 · 20 seconds (one click for the right side).** Same tool, two outcomes. Strong foundation → 10× leverage. Paste and pray → 10× the mess. Next screen compiles and the happy path works.
{{% /note %}}

---

<div class="stage tight" data-pr-diff data-step-fragments>
  <div class="pr-head">
    <h2 class="t-mid in">What would you refuse to merge?</h2>
    <div class="pr-btns">
      <button type="button" class="pr-btn" data-toggle="trap1" aria-pressed="false">Bug 1</button>
      <button type="button" class="pr-btn" data-toggle="trap2" aria-pressed="false">Bug 2</button>
      <button type="button" class="pr-btn" data-toggle="fix" aria-pressed="false">Fix</button>
    </div>
  </div>
  <div class="pr-shell in d2">
    <div class="pr-bar"><span><span class="pr-open">Open</span>PR #12 · <span class="mono">RefundController.java</span></span><span class="mono">+8 −0</span></div>
    <div class="pr-code">
      <div class="diff-line"><span class="diff-ln">1</span><span class="diff-sign">+</span><span>@PostMapping("/orders/{id}/refund")</span></div>
      <div class="diff-line"><span class="diff-ln">2</span><span class="diff-sign">+</span><span>public void refund(@PathVariable Long id) {</span></div>
      <div class="diff-line" data-trap="1"><span class="diff-ln">3</span><span class="diff-sign">+</span><span>  Order order = orderRepo.findById(id);</span></div>
      <div class="diff-line" data-trap="2"><span class="diff-ln">4</span><span class="diff-sign">+</span><span>  if (order.status.equals("REFUNDED")) return;</span></div>
      <div class="diff-line" data-trap="2"><span class="diff-ln">5</span><span class="diff-sign">+</span><span>  payments.refund(order.paymentId);</span></div>
      <div class="diff-line"><span class="diff-ln">6</span><span class="diff-sign">+</span><span>  order.status = "REFUNDED";</span></div>
      <div class="diff-line"><span class="diff-ln">7</span><span class="diff-sign">+</span><span>  orderRepo.save(order);</span></div>
      <div class="diff-line"><span class="diff-ln">8</span><span class="diff-sign">+</span><span>}</span></div>
    </div>
  </div>
  <div class="pr-notes">
    <div class="pr-note" data-review="1"><b>Bug 1 · No ownership check</b>Never checks <code>order.belongsTo(currentUser)</code>. Anyone can refund anyone’s order.</div>
    <div class="pr-note" data-review="2"><b>Bug 2 · Double refund</b>Click twice fast → both pass line 4 before line 7 saves. Customer gets paid twice.</div>
  </div>
  <div class="pr-fix" data-fix>Fix: verify ownership first (<code>403</code> if not theirs), update status atomically in the DB before refunding, and never trust a single happy-path test.</div>
  <div class="step-triggers" aria-hidden="true">
    <span class="fragment" data-pr-step="1"></span>
    <span class="fragment" data-pr-step="2"></span>
    <span class="fragment" data-pr-step="3"></span>
  </div>
</div>

{{% note %}}
**0:19 – 0:21 · Let them shout. Then reveal.**
- Give them 20–30 seconds. Clicker, Space, ↓, buttons, clicking line 3 or 4–5, or keys 1/2/3 all work.
- Emphasize: **modern AI genuinely writes this.** It compiles, looks clean, and the happy-path test passes!
- **Bug 1 (Line 3):** Missing ownership check (IDOR). Anyone logged in can call `POST /orders/42/refund` and refund someone else's order.
- **Bug 2 (Lines 4–5):** Race condition / double-click. Tap Refund twice in 100ms → both requests read `status != REFUNDED` before either saves → you just refunded real money twice.
- **Fix:** Check `order.userId == currentUser`, flip status atomically in the DB (with a lock/conditional `UPDATE` + idempotency key) before calling the payment provider. "AI wrote clean code. You're the one who thinks about attackers and double clicks."
- Optional if someone spots `findById` returning `null` / `Optional`: great catch! Don't make it a third lecture.
{{% /note %}}

---

{{< slide class="navy" >}}

<div class="stack-rail" aria-hidden="true">
  <span class="rail-pill is-now">01 · Before code</span>
  <span class="rail-pill">02 · While coding</span>
  <span class="rail-pill">03 · After code</span>
  <span class="rail-pill">Big picture</span>
</div>
<div class="stage stack-stage" data-step-fragments>
  <div class="split wf-split">
    <div class="wf-copy">
      <h2 class="t-mid in">Think before<br>you prompt.</h2>
      <div class="wf-list">
        <div class="wf-item in d1"><b>Challenge the design</b><span>Ask AI what can fail, scale poorly, or get abused.</span></div>
        <div class="wf-item in d2"><b>List the edge cases</b><span>Permissions, retries, empty inputs, slow networks.</span></div>
        <div class="wf-item in d3"><b>Agree on a short plan</b><span>Lock down the rules before generating line 1.</span></div>
      </div>
    </div>
    <div class="wf-ex fragment">
      <div class="wf-ex-head"><span>EXAMPLE · PR #12</span><span class="mono">/refund</span></div>
      <div class="wf-prompt-box">
        <span class="wf-tag">YOU → AI</span>
        <p>“Before we code <code>POST /orders/{id}/refund</code>, what security holes and edge cases should we handle?”</p>
      </div>
      <div class="wf-checks">
        <span class="wf-tag is-mint">CAUGHT BEFORE LINE 1</span>
        <div class="wf-check"><span>✓</span><span>Verify the order belongs to the current user (<code>403</code>)</span></div>
        <div class="wf-check"><span>✓</span><span>Block double-clicks with an atomic DB update</span></div>
        <div class="wf-check"><span>✓</span><span>Return <code>404</code> if the order ID does not exist</span></div>
      </div>
    </div>
  </div>
</div>

{{% note %}}
**0:21 · Stage 1 of 3 (1 click for the /refund example).**
- Bridge from PR #12: "Why did AI ship PR #12? Because someone skipped thinking and went straight to typing. Real engineering with AI has three stages."
- Walk through the 3 general habits on the left first: challenge the design, list edge cases, write a short plan. Works for any feature, not just refunds.
- Click for the right card: "Look what happens if you do this on `/refund`. One question before line 1 catches both bugs from PR #12 before any code exists."
{{% /note %}}

---

<div class="stack-rail" aria-hidden="true">
  <span class="rail-pill is-done">01 · Before code</span>
  <span class="rail-pill is-now">02 · While coding</span>
  <span class="rail-pill">03 · After code</span>
  <span class="rail-pill">Big picture</span>
</div>
<div class="stage stack-stage" data-step-fragments>
  <div class="split wf-split">
    <div class="wf-copy">
      <h2 class="t-mid in">Draft in<br>small steps.</h2>
      <p class="wf-sub in d1">Where most people start, and where they stop.</p>
      <div class="wf-list">
        <div class="wf-item in d2"><b>One piece at a time</b><span>One endpoint or function, not a whole app in one shot.</span></div>
        <div class="wf-item in d3"><b>Give it your rules</b><span>Point to existing patterns, types, and <code>AGENTS.md</code>.</span></div>
        <div class="wf-item in d4"><b>Keep diffs small</b><span>Never accept 400 lines you cannot review in 5 minutes.</span></div>
      </div>
    </div>
    <div class="wf-ex is-light fragment">
      <div class="wf-ex-head"><span>EXAMPLE · PR #12</span><span class="mono">/refund</span></div>
      <div class="wf-compare is-bad">
        <span class="wf-tag is-red">LAZY PROMPT</span>
        <p>“Write a refund endpoint.”</p>
        <span class="wf-compare-out">Ships PR #12 with 2 silent production bugs.</span>
      </div>
      <div class="wf-compare is-good">
        <span class="wf-tag is-mint">GUIDED PROMPT</span>
        <p>“Implement <code>/refund</code> using our auth guard, atomic status update, and <code>OrderRepo</code> pattern.”</p>
        <span class="wf-compare-out">Produces a clean, small diff that follows the plan.</span>
      </div>
    </div>
  </div>
</div>

{{% note %}}
**0:22 · Stage 2 of 3 (1 click for the /refund comparison).**
- This is the code generation step everyone knows, done properly: small chunks, feed it your repo rules, keep diffs small enough to actually read.
- Click for the right card: contrast the lazy prompt that produces PR #12 against a guided prompt grounded in the plan and repo conventions.
{{% /note %}}

---

{{< slide class="navy" >}}

<div class="stack-rail" aria-hidden="true">
  <span class="rail-pill is-done">01 · Before code</span>
  <span class="rail-pill is-done">02 · While coding</span>
  <span class="rail-pill is-now">03 · After code</span>
  <span class="rail-pill">Big picture</span>
</div>
<div class="stage stack-stage" data-step-fragments>
  <div class="split wf-split">
    <div class="wf-copy">
      <h2 class="t-mid in">Prove it works<br>before merge.</h2>
      <div class="wf-list">
        <div class="wf-item in d1"><b>AI writes hostile tests</b><span>Test attackers, retries, and bad inputs, not just happy paths.</span></div>
        <div class="wf-item in d2"><b>AI roasts the diff</b><span>Fresh prompt: hunt for security holes and edge cases.</span></div>
        <div class="wf-item in d3"><b>You read every line</b><span>Run it locally, trace the logic, and sign off as owner.</span></div>
      </div>
    </div>
    <div class="wf-ex fragment">
      <div class="wf-ex-head"><span>EXAMPLE · PR #12</span><span class="mono">mvn test</span></div>
      <div class="wf-tests">
        <div class="wf-test"><span class="wf-pass">PASS</span><span>refund_otherUsersOrder_returns403()</span></div>
        <div class="wf-test"><span class="wf-pass">PASS</span><span>refund_twoClicksAtOnce_refundsOnce()</span></div>
        <div class="wf-test"><span class="wf-pass">PASS</span><span>refund_unknownOrder_returns404()</span></div>
      </div>
      <div class="wf-human">
        <span class="wf-human-badge">YOU</span>
        <span>Read the 18-line diff, run it locally, then merge.</span>
      </div>
    </div>
  </div>
</div>

{{% note %}}
**0:22 · Stage 3 of 3 (1 click for the verification card).**
- Crystal clear split between AI and You:
  1. Ask AI to write hostile tests that actively try to break the code.
  2. Ask a fresh AI prompt to review the diff for bugs.
  3. **You** read every line, run it, and decide to merge.
- Click for the right card: the 3 hostile tests passing, followed by the amber YOU sign-off bar.
{{% /note %}}

---

<div class="stack-rail" aria-hidden="true">
  <span class="rail-pill is-done">01 · Before code</span>
  <span class="rail-pill is-done">02 · While coding</span>
  <span class="rail-pill is-done">03 · After code</span>
  <span class="rail-pill is-now">Big picture</span>
</div>
<div class="stage stack-stage">
  <h2 class="t-mid in">Beyond code generation.</h2>
  <p class="t-lead in d1" style="max-width:none;">Typing code is only the middle. The leverage is before and after.</p>
  <div class="flow">
    <div class="flow-step before in d2">
      <span class="flow-when">01 · Before code</span>
      <span class="flow-what">Plan first.</span>
      <ul class="flow-bullets">
        <li>Challenge the design</li>
        <li>List edge cases</li>
        <li>Agree on a short spec</li>
      </ul>
      <span class="flow-out">Prevents bugs before line 1</span>
    </div>
    <div class="flow-step during in d3">
      <span class="flow-when">02 · While coding</span>
      <span class="flow-what">Draft small.</span>
      <ul class="flow-bullets">
        <li>Feed your rules</li>
        <li>Small, readable diffs</li>
      </ul>
      <span class="flow-out">Where most people stop</span>
    </div>
    <div class="flow-step after in d4">
      <span class="flow-when">03 · After code</span>
      <span class="flow-what">Prove &amp; own.</span>
      <ul class="flow-bullets">
        <li>Hostile tests (AI)</li>
        <li>Bug-hunt the diff (AI)</li>
        <li>Read every line (You)</li>
      </ul>
      <span class="flow-out">Verified before you merge</span>
    </div>
  </div>
</div>

{{% note %}}
**0:23 · The Big Picture.**
- Tie back to the exact subtitle of the talk: "Beyond Code Generation."
- Point to the shape: tall Navy on the left, short gray in the middle, tall Amber on the right. Typing code is the small middle step.
- Bridge to the next Amber slide: "Notice the last line on the right: *Read every line (You)*. Because here is the rule..." → `AI wrote it. You own it.`
{{% /note %}}

---

{{< slide class="amber" >}}

<div class="stage">
  <h2 class="t-huge"><span class="line"><span>AI wrote it.</span></span><span class="line"><span class="d2">You <span class="mark" style="--md:0.95s;">own it.</span></span></span></h2>
  <p class="t-lead in d5" style="max-width:none;">Your name is on the PR. Production pages you, not the model.</p>
</div>

{{% note %}}
**The rule. Say it slowly and let it land.**
- Git doesn't put the model's name on the commit. When it breaks at 3 AM, production pages *you*.
- Bridge: "And this isn't just about student projects. Look at what happened in the real world at my company just a week ago."
{{% /note %}}

---

<div class="stage">
  <div class="j4s-eyebrow in">
    <span class="j4s-pill"><span class="j4s-dot" aria-hidden="true"></span>NOV 17, 2026 · JAVA4SHELL</span>
    <span class="j4s-meta">JDK · BASE64 DECODER</span>
  </div>
  <div class="j4s-spark">
    <div class="j4s-cost">
      <p class="j4s-num num"><span class="line"><span class="d1">&lt;$<span data-count="200" data-delay="350">200</span></span></span></p>
      <p class="j4s-cost-sub in d3">One AI run. A few hours.</p>
    </div>
    <div class="j4s-alert in d2">
      <span class="j4s-alert-tag">HIGH-IMPACT RUNTIME BUG</span>
      <p class="j4s-alert-lead">A serious bug inside<br><span class="j4s-hi">Java itself.</span></p>
      <div class="j4s-alert-foot">
        <span><b>Effort to find</b>Tiny prompt budget</span>
        <span><b>Blast radius</b>Millions of servers</span>
      </div>
    </div>
  </div>
</div>

{{% note %}}
**0:23 · Real-world story from work. No payload, no CVE lecture unless asked.**
- November 17, 2026: "Java4Shell", a real bug in Java's own Base64 decoder.
- The shocking number: **under $200 and a few hours of AI** to uncover a serious vulnerability inside a runtime trusted by millions of servers.
- Set up the next click: "Now look at what a $200 AI run forced real companies, including my own team, to do."
{{% /note %}}

---

{{< slide class="navy" >}}

<div class="stage" data-step-fragments>
  <h2 class="t-mid"><span class="line"><span class="j4s-lead-dim">Finding it was $200.</span></span><span class="line"><span class="d2">Fixing it everywhere was <span class="mark" style="--md:0.95s;">the job.</span></span></span></h2>

  <div class="j4s-ratio in d3">
    <div class="j4s-ratio-small"><span>1 AI run · &lt;$200</span></div>
    <span class="j4s-ratio-arrow" aria-hidden="true">━━▶</span>
    <div class="j4s-ratio-big"><span>Emergency war room · Hundreds of services · Days of rollout</span></div>
  </div>

  <div class="j4s-grid">
    <div class="j4s-card fragment" data-fragment-index="1">
      <span class="j4s-step">01 · Audit</span>
      <span class="j4s-card-title">Hunt every runtime</span>
      <span class="j4s-card-desc">Every service, container, and JDK version exposed.</span>
    </div>
    <div class="j4s-card fragment" data-fragment-index="2">
      <span class="j4s-step">02 · Mitigate</span>
      <span class="j4s-card-title">Contain it first</span>
      <span class="j4s-card-desc">Temporary guards while waiting for the official JDK fix.</span>
    </div>
    <div class="j4s-card fragment" data-fragment-index="3">
      <span class="j4s-step">03 · Patch &amp; ship</span>
      <span class="j4s-card-title">Roll out the fix</span>
      <span class="j4s-card-desc">Rebuild images and deploy safely once the JDK patch lands.</span>
    </div>
    <div class="j4s-card is-work fragment" data-fragment-index="4">
      <span class="j4s-step">04 · At my work</span>
      <span class="j4s-card-title">1 week ago.</span>
      <span class="j4s-card-desc">My team was rolling this out across our platform.</span>
    </div>
  </div>
</div>

{{% note %}}
**0:24 · Your personal story from work (4 quick clicks).**
- Point at the top asymmetry bar: **1 AI run under $200** triggered an **emergency war room across hundreds of services and days of rollout**.
- Click 1: Audit every service, container, and JDK version.
- Click 2: Mitigate first. Because the bug is inside the JDK itself, you can't just edit your own code. You have to put mitigations in place while waiting for the official JDK fix.
- Click 3: Once the official JDK patch lands, rebuild base images, test, and roll it out safely without breaking live customers.
- Click 4 (Amber card): "This isn't theory. **1 week ago**, my team was rolling this out across our Java systems. Not one microservice. The whole platform."
- Bridge to Part 4 (→): "That's the job AI doesn't remove. So let's zoom in on what the day-to-day job actually looks like now."
{{% /note %}}

{{% /section %}}
