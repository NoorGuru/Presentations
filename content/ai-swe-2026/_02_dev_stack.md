+++
outputs = ["Reveal"]
weight = 3
+++

{{% section %}}

{{< slide class="amber" >}}

<div class="stage">
  <h1 class="t-huge" style="font-size:184px;"><span class="line"><span>Needed before.</span></span><span class="line"><span class="d1"><span class="mark" style="--md:0.8s;">Essential now.</span></span></span></h1>
  <p class="t-lead in d4" style="max-width:34ch;">Three job basics AI made non-negotiable.</p>
</div>

{{% note %}}
**0:07 · Bridge from Part 1.**
- Part 1 was the 5-skill foundation universities and interviews test.
- This part is the day-1 craft that mattered *before* AI, and matters 10× more *now*: Git & GitHub, APIs, and one language + SQL.
- Ask: "Who can open a branch and a PR without googling the commands?" Hands. That's the gap, not Java syntax.
{{% /note %}}

---

<div class="stage">
  <div class="split" style="grid-template-columns:0.95fr 1.05fr;gap:72px;">
    <div>
      <h2 class="t-big"><span class="line"><span>Git &amp;</span></span><span class="line"><span class="d1">GitHub.</span></span></h2>
      <p class="t-lead in d3" style="margin-top:32px;">Before: how teams didn’t overwrite each other.<br>Now: how bad AI code gets caught.</p>
    </div>
    <div class="git-stack">
      <div class="term in d3">
        <div class="term-tag">Git · your machine</div>
        <span class="prompt">$</span> git switch -c fix-login<br><span class="prompt">$</span> git commit -m "Fix login"<br><span class="prompt">$</span> git push
      </div>
      <div class="gh-card in d5">
        <div class="gh-top"><span class="gh-badge">Open PR</span><span class="gh-title">GitHub · Pull Request</span></div>
        <div class="gh-sub">Where a human reads the diff before AI code hits <code>main</code>.</div>
      </div>
    </div>
  </div>
</div>

{{% note %}}
**Git & GitHub · one minute.**
- Make the split clear: **Git** tracks your changes and branches locally; **GitHub** is where the team reviews them in a Pull Request.
- AI can write 200 lines in a minute. The pull request is where a human says yes or no.
{{% /note %}}

---

{{< slide class="navy" >}}

<div class="stage tight">
  <div>
    <h2 class="t-big" style="font-size:122px;"><span class="line"><span>How apps</span></span><span class="line"><span class="d1"><span class="mark" style="--md:0.75s;">call each other.</span></span></span></h2>
    <p class="t-lead in d3" style="margin-top:20px;max-width:none;">Websites, mobile apps, and AI tools all speak the same language: APIs.</p>
  </div>
  <div class="api-flow in d4">
    <div class="api-node">
      <span class="api-role">Client · App or AI</span>
      <span class="api-code">POST /login</span>
    </div>
    <div class="api-pipe" aria-hidden="true">
      <span class="api-verb">Request →</span>
      <span class="api-line"></span>
      <span class="api-verb is-back">← JSON + Status</span>
    </div>
    <div class="api-node is-server">
      <span class="api-role">Server · API</span>
      <span class="api-code">Checks DB</span>
    </div>
  </div>
  <div class="codes api-codes">
    <div class="code-cell pop d5"><div class="code-num">200</div><div class="code-label">OK</div></div>
    <div class="code-cell pop d5"><div class="code-num">401</div><div class="code-label">Who are you?</div></div>
    <div class="code-cell pop d6"><div class="code-num">404</div><div class="code-label">Not here</div></div>
    <div class="code-cell pop d6"><div class="code-num">500</div><div class="code-label">We broke it</div></div>
  </div>
</div>

{{% note %}}
**APIs · one minute.**
- Walk one example everyone knows: tap Login → your phone sends `POST /login` to a server → the server checks the database and answers `200` (let them in) or `401` (wrong password).
- Why it matters even more now: every AI model, plugin, and MCP tool works the exact same way, by calling APIs. If you can't read a request and a status code, you can't debug an AI tool either.
{{% /note %}}

---

<div class="stage lang-cycle" data-lang-cycle>
  <div class="split" style="grid-template-columns:1.2fr 0.8fr;gap:64px;">
    <div>
      <h2 class="t-huge lang-title"><span data-lang-name class="lang-name">Java</span></h2>
      <p class="t-big in d1" style="margin-top:8px;">is enough.</p>
      <p class="t-big in d4" style="margin-top:28px;"><span class="mark" style="--md:1.1s;">+ SQL</span></p>
      <p class="lang-punch" data-lang-punch style="margin-top:28px;">The language is not the point.</p>
    </div>
    <div class="term in d5" style="font-size:36px;"><span class="prompt">SELECT</span> u.name, o.total<br><span class="prompt">FROM</span> users u<br><span class="prompt">JOIN</span> orders o<br>&nbsp;&nbsp;<span class="prompt">ON</span> o.user_id = u.id<br><span class="prompt">WHERE</span> o.total &gt; 100;</div>
  </div>
  <div class="step-triggers" aria-hidden="true">
    <span class="fragment" data-lang-step="1">&nbsp;</span>
    <span class="fragment" data-lang-step="2">&nbsp;</span>
    <span class="fragment" data-lang-step="3">&nbsp;</span>
    <span class="fragment" data-lang-step="4">&nbsp;</span>
  </div>
</div>

{{% note %}}
**One language + SQL · four clicks (Space or ↓).**
- Opens on Java. Each click: red strike, then the next language.
- Java → JavaScript → Rust → Go → **One language** + “The language is not the point.”
- Land it: "Pick one. Go deep. Plus SQL, because almost every real app stores data in a database." Then → to the AI stack section.
{{% /note %}}

{{% /section %}}
