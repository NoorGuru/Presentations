+++
outputs = ["Reveal"]
weight = 5
+++

{{< slide class="dark-coral" >}}

<div class="act-wrap">
  <div class="act-ghost-num">04</div>
  <div>
    <span class="eyebrow eyebrow--dark-coral">ACT 04 · 0:19 – 0:26</span>
  </div>
  <h1 class="act-title">The Velocity Trap</h1>
  <p class="act-sub">Quality, code review, testing &amp; security — where AI actually breaks in production.</p>
  <div class="act-bar act-bar--coral"></div>
</div>

{{% note %}}
**0:19 · Act 4 Transition**
- Now that we see the shiny stack — here is the dark side nobody puts in LinkedIn demos.
{{% /note %}}

---

<span class="eyebrow eyebrow--coral">BEYOND CODE GENERATION</span>
<h2 class="slide-title">Speed Multiplies Everything</h2>

<div class="velocity-grid">
  <div class="velocity-card velocity-card--good">
    <div class="eyebrow eyebrow--teal" style="align-self:flex-start;margin:0;">DISCIPLINED ENGINEER + AI</div>
    <div class="velocity-big">5×</div>
    <div>
      <div class="velocity-label">Real Engineering Leverage</div>
      <div class="velocity-sub">Faster specs, stronger tests, cleaner refactors, verified merges.</div>
    </div>
  </div>
  <div class="velocity-card velocity-card--trap fragment">
    <div class="eyebrow eyebrow--coral" style="align-self:flex-start;margin:0;">BLIND COPY-PASTE + AI</div>
    <div class="velocity-big">5×</div>
    <div>
      <div class="velocity-label">Tech Debt &amp; Vulnerabilities</div>
      <div class="velocity-sub">Shipped in half the time — with zero understanding of what broke.</div>
    </div>
  </div>
</div>

<div class="punch-banner fragment">
  Let's test your eyes right now. <strong>60 seconds on the clock.</strong>
</div>

{{% note %}}
**0:20 – 0:21 · Frame the Velocity Trap**
- AI doesn't magically make bad engineers good — it amplifies whatever habits you already have.
- Tease the crowd challenge on the next slide: "I'm putting a real-looking AI PR on screen. It compiles. It passes a quick curl test. You have 60 seconds to yell out what's wrong."
{{% /note %}}

---

<div data-pr-diff>
  <div class="pr-top">
    <div>
      <span class="eyebrow eyebrow--coral" style="margin-bottom:10px;">60-SECOND CROWD CHALLENGE · SPOT THE AI TRAP</span>
      <h2 class="slide-title" style="font-size:60px !important;margin:0 !important;">Looks clean. Compiles. Would you merge?</h2>
    </div>
    <div class="pr-pills">
      <button type="button" class="pr-btn" data-toggle="trap1">Trap 1: Security</button>
      <button type="button" class="pr-btn" data-toggle="trap2">Trap 2: Data Leak</button>
      <button type="button" class="pr-btn" data-toggle="fix">Show Fix</button>
    </div>
  </div>
  <div class="pr-shell">
    <div class="pr-header">
      <div class="pr-header-left">
        <span class="pr-status-open">Open</span>
        <strong>PR #418</strong>
        <span>src/main/java/com/app/OrderController.java</span>
      </div>
      <span class="pr-diffstat">+13  -0</span>
    </div>
    <div class="pr-code">
      <div class="diff-line"><span class="diff-ln">1</span><span class="diff-sign">+</span><span>@RestController</span></div>
      <div class="diff-line"><span class="diff-ln">2</span><span class="diff-sign">+</span><span>@RequestMapping("/api/orders")</span></div>
      <div class="diff-line"><span class="diff-ln">3</span><span class="diff-sign">+</span><span>public class OrderController {</span></div>
      <div class="diff-line"><span class="diff-ln">4</span><span class="diff-sign">+</span><span></span></div>
      <div class="diff-line" data-trap="1"><span class="diff-ln">5</span><span class="diff-sign">+</span><span>    @GetMapping("/{orderId}")</span></div>
      <div class="diff-line" data-trap="2"><span class="diff-ln">6</span><span class="diff-sign">+</span><span>    public ResponseEntity&lt;Order&gt; getOrder(@PathVariable Long orderId) {</span></div>
      <div class="diff-line" data-trap="1"><span class="diff-ln">7</span><span class="diff-sign">+</span><span>        Order order = orderRepo.findById(orderId)</span></div>
      <div class="diff-line"><span class="diff-ln">8</span><span class="diff-sign">+</span><span>                .orElseThrow(() -&gt; new NotFoundException("Order not found"));</span></div>
      <div class="diff-line"><span class="diff-ln">9</span><span class="diff-sign">+</span><span></span></div>
      <div class="diff-line" data-trap="2"><span class="diff-ln">10</span><span class="diff-sign">+</span><span>        order.setItems(itemRepo.findByOrderId(orderId));</span></div>
      <div class="diff-line" data-trap="2"><span class="diff-ln">11</span><span class="diff-sign">+</span><span>        return ResponseEntity.ok(order);</span></div>
      <div class="diff-line"><span class="diff-ln">12</span><span class="diff-sign">+</span><span>    }</span></div>
      <div class="diff-line"><span class="diff-ln">13</span><span class="diff-sign">+</span><span>}</span></div>
    </div>
  </div>
  <div class="pr-annotations">
    <div class="pr-review-box pr-review-box--coral" data-review="1">
      <div class="pr-review-title">🚨 TRAP #1 · BROKEN ACCESS CONTROL (IDOR)</div>
      <div class="pr-review-text">Zero ownership check! Any logged-in user can hit <code>/api/orders/1002</code> and read someone else's order.</div>
    </div>
    <div class="pr-review-box pr-review-box--amber" data-review="2">
      <div class="pr-review-title">⚠️ TRAP #2 · RAW JPA ENTITY LEAK</div>
      <div class="pr-review-text">Returning <code>Order</code> directly instead of a DTO leaks internal DB fields (payment tokens, PII) &amp; risks lazy-load N+1 serialization.</div>
    </div>
  </div>
  <div class="pr-fix-bar" data-fix-bar>
    ✓ Fix: Inject <strong>@AuthenticationPrincipal User user</strong> → query <strong>findByIdAndUserId(orderId, user.getId())</strong> → map to <strong>OrderResponseDto</strong>
  </div>
  <div class="step-triggers" aria-hidden="true">
    <span class="fragment" data-pr-step="1"></span>
    <span class="fragment" data-pr-step="2"></span>
    <span class="fragment" data-pr-step="3"></span>
  </div>
</div>

{{% note %}}
**0:21 – 0:24 · Interactive "Spot the AI Trap" (60 seconds)**
- Let the room stare at the PR diff for 30–45 seconds and yell out bugs!
- Ask: *"It compiles. Happy-path Postman request returns 200 OK. Who hits Merge?"*
- Advance once (or click **Trap 1**): **IDOR / Broken Access Control** — AI happily wrote `findById(orderId)` without scoping to the authenticated user! Change `1001` to `1002` and you just dumped another customer's order.
- Advance again (or click **Trap 2**): **Raw Entity Leak** — returning the JPA `Order` entity instead of a response DTO leaks internal/PII columns and triggers lazy-loading surprises.
- Advance a third time (or click **Show Fix**): show the clean 1-line fix. Notice how the GitHub PR diff view itself reinforces why PR review is your real superpower!
{{% /note %}}

---

<span class="eyebrow eyebrow--teal">THE REAL AI WORKFLOW</span>
<h2 class="slide-title">Move AI Upstream &amp; Downstream</h2>

<div class="sdlc-flow">
  <div class="sdlc-stage sdlc-stage--up fragment">
    <div class="sdlc-tag">UPSTREAM · BEFORE CODE</div>
    <h3 class="sdlc-title">Think &amp; Stress-Test</h3>
    <ul class="sdlc-list">
      <li>→ Architecture critique</li>
      <li>→ Edge-case discovery</li>
      <li>→ Threat modeling</li>
    </ul>
  </div>
  <div class="sdlc-stage sdlc-stage--mid">
    <div class="sdlc-tag">MIDDLE</div>
    <h3 class="sdlc-title">Code Gen</h3>
    <ul class="sdlc-list">
      <li>→ Fast first drafts</li>
      <li>→ Boilerplate</li>
    </ul>
  </div>
  <div class="sdlc-stage sdlc-stage--down fragment">
    <div class="sdlc-tag">DOWNSTREAM · BEFORE MERGE</div>
    <h3 class="sdlc-title">Verify &amp; Harden</h3>
    <ul class="sdlc-list">
      <li>→ Draft test suites</li>
      <li>→ Pre-PR security checks</li>
      <li>→ Docs &amp; diff review</li>
    </ul>
  </div>
</div>

<div class="merge-rule fragment">
  AI writes drafts. <span>You sign your name on the merge button.</span>
</div>

{{% note %}}
**0:24 – 0:26 · The Golden Rule**
- Most students only use AI in the tiny middle box ("write code").
- Senior engineers push AI **upstream** (roast my design, find edge cases) and **downstream** (generate unit/integration tests, run pre-PR security reviews, catch missing auth checks).
- Deliver the closing line slow and clear: *"AI writes drafts. You sign your name on the merge button."*
{{% /note %}}
