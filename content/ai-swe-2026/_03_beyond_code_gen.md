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

<div class="stage" data-step-fragments>
  <h2 class="t-mid in">How you prevent PR #12.</h2>
  <p class="t-lead in d1" style="max-width:none;">Don’t just use AI to type. Use it before and after.</p>
  <div class="flow">
    <div class="flow-step before fragment" data-fragment-index="1">
      <span class="flow-when">01 · Before code</span>
      <span class="flow-what">Plan first.</span>
      <span class="flow-prompt">“What can go wrong with <code>/refund</code>?”</span>
      <span class="flow-out">Catches auth &amp; double-clicks early</span>
    </div>
    <div class="flow-step during in d2">
      <span class="flow-when">02 · Code</span>
      <span class="flow-what">Draft it.</span>
      <span class="flow-prompt">“Write <code>/refund</code>.”</span>
      <span class="flow-out">Where most people stop</span>
    </div>
    <div class="flow-step after fragment" data-fragment-index="2">
      <span class="flow-when">03 · Before merge</span>
      <span class="flow-what">Stress-test it.</span>
      <span class="flow-prompt">“Write tests to break it.<br>Then I read it.”</span>
      <span class="flow-out">Proves it works before you merge</span>
    </div>
  </div>
</div>

{{% note %}}
**0:22 · Direct bridge from PR #12 to the merge rule (2 clicks).**
- Slide opens with only the short middle box (`02 · Code: Draft it`): "Why did AI ship PR #12? Because someone only typed one prompt: 'Write `/refund`.' That's where most people stop."
- Click 1 (`01 · Before code`): "Before a single line of code, ask AI to poke holes in your plan: *What can go wrong with `/refund`?* It flags ownership checks and double-clicks immediately."
- Click 2 (`03 · Before merge`): "After it drafts the code, ask it to write hostile tests to break its own endpoint, and **then you read it**."
- Bridge to next slide: "Notice those last three words: *Then I read it.* Because here's the rule..." → `AI wrote it. You own it.`
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
