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
**0:17 · Keep this concrete.** One idea: AI doesn't replace your habits—it multiplies them. Then a real Java PR they can inspect, then Java4Shell in one minute, no internals.
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

<div class="stage">
  <h2 class="t-mid in">Not only in the middle.</h2>
  <div class="flow">
    <div class="flow-step before fragment"><span class="flow-when">Before you code</span><span class="flow-what">Poke holes in my idea.</span></div>
    <div class="flow-step during in d2"><span class="flow-when">While you code</span><span class="flow-what">Draft it.</span></div>
    <div class="flow-step after fragment"><span class="flow-when">Before you merge</span><span class="flow-what">Write tests. Then I read it.</span></div>
  </div>
</div>

{{% note %}}
**0:22 · Most of them only use the middle box: "write my code."** The useful moves are before (critique my idea) and after (tests, then I read it).
{{% /note %}}

---

{{< slide class="amber" >}}

<div class="stage">
  <h2 class="t-huge"><span class="line"><span>You explain it,</span></span><span class="line"><span class="d2">or you don’t</span></span><span class="line"><span class="d3"><span class="mark" style="--md:1.1s;">merge it.</span></span></span></h2>
</div>

{{% note %}}
**The rule. Say it slowly.** Then: "And this isn't only student homework. This week, AI found a bug inside Java itself."
{{% /note %}}

---

<div class="stage">
  <p class="t-lead in">Java4Shell · November 2026</p>
  <p class="t-mega num" style="font-size:420px;"><span class="line"><span class="d1">&lt; $<span data-count="200" data-delay="400">200</span></span></span></p>
  <p class="t-lead in d4">of AI found a serious bug in <span class="mark" style="--md:1.2s;">Java itself.</span></p>
</div>

{{% note %}}
**0:23 · One story. No payload, no CVE number unless asked.**
- November 17, 2026. A bug in Java's own Base64 decoder. Serious on some servers.
- The number that matters: under $200 and a few hours of AI. Then companies had to patch Java everywhere.
- If asked "how bad": high risk, depends on the machine. Don't oversell it into Log4Shell.
{{% /note %}}

---

{{< slide class="navy" >}}

<div class="stage">
  <h2 class="t-big"><span class="line"><span><span class="strike" style="--sd:0.7s;">Finding it</span> was cheap.</span></span></h2>
  <h2 class="t-big"><span class="line"><span class="d3">Fixing it everywhere</span></span><span class="line"><span class="d4">was <span class="mark" style="--md:1.2s;">the job.</span></span></span></h2>
  <p class="t-lead fragment">Two days ago, we were still rolling it out.</p>
</div>

{{% note %}}
**0:24 · Your part, said out loud.** About two days ago we were still pushing that fix across our Java systems. Not one service. The platform.
- Bridge: "That's the job AI doesn't remove. Someone has to understand the change and roll it out safely."
{{% /note %}}

{{% /section %}}
