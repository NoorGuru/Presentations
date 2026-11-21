+++
outputs = ["Reveal"]
weight = 3
+++

{{% section %}}

{{< slide class="amber" >}}

<div class="stage">
  <h1 class="t-mega"><span class="line"><span>Basics</span></span><span class="line"><span class="d1"><span class="mark" style="--md:0.8s;">first.</span></span></span></h1>
  <p class="t-lead in d4">The bottom of that tower. Then the buzzwords.</p>
</div>

{{% note %}}
**0:07 · This is the center of the talk.**
- Four basics, one slide each, then the names they'll hear at work, in plain words.
- Ask: "Who can open a branch and a PR without googling the commands?" Hands. That's the gap, not Java syntax.
{{% /note %}}

---

<div class="stage">
  <div class="split">
    <div>
      <h2 class="t-mega"><span class="line"><span>Git.</span></span></h2>
      <p class="t-lead in d3" style="margin-top:32px;">How you show work. How bad AI code gets caught.</p>
    </div>
    <div class="term in d4"><span class="prompt">$</span> git switch -c fix-login<br><span class="prompt">$</span> git commit -m "Fix login"<br><span class="prompt">$</span> git push<br><span class="dim"># open a pull request</span></div>
  </div>
</div>

{{% note %}}
**Git · one minute.** AI can write 200 lines in a minute. The pull request is where a human says yes or no.
{{% /note %}}

---

{{< slide class="navy" >}}

<div class="stage">
  <h2 class="t-big"><span class="line"><span>AI tools just</span></span><span class="line"><span class="d1">call APIs.</span></span></h2>
  <div class="codes" style="margin-top:40px;">
    <div class="code-cell pop d3"><div class="code-num">200</div><div class="code-label">OK</div></div>
    <div class="code-cell pop d4"><div class="code-num">401</div><div class="code-label">Who are you?</div></div>
    <div class="code-cell pop d5"><div class="code-num">404</div><div class="code-label">Not here</div></div>
    <div class="code-cell pop d6"><div class="code-num">500</div><div class="code-label">We broke it</div></div>
  </div>
</div>

{{% note %}}
**HTTP · one minute.** Walk one example they know: login button → request → 200 or 401. If they can't read that, they can't debug an AI tool either, because the tool does the same thing.
{{% /note %}}

---

<div class="stage lang-cycle" data-lang-cycle>
  <div class="split" style="grid-template-columns:1.2fr 0.8fr;gap:64px;">
    <div>
      <h2 class="t-huge"><span class="line"><span><span data-lang-name class="lang-name">Java</span></span></span></h2>
      <p class="t-big in d1" style="margin-top:8px;">is enough.</p>
      <p class="t-big in d4" style="margin-top:28px;"><span class="mark" style="--md:1.1s;">+ SQL</span></p>
      <p class="lang-punch" data-lang-punch style="margin-top:28px;">The language is not the point.</p>
    </div>
    <div class="term in d5" style="font-size:36px;"><span class="prompt">SELECT</span> u.name, o.total<br><span class="prompt">FROM</span> users u<br><span class="prompt">JOIN</span> orders o<br>&nbsp;&nbsp;<span class="prompt">ON</span> o.user_id = u.id<br><span class="prompt">WHERE</span> o.total &gt; 100;</div>
  </div>
  <div class="step-triggers" aria-hidden="true">
    <span class="fragment" data-lang-step="1"></span>
    <span class="fragment" data-lang-step="2"></span>
    <span class="fragment" data-lang-step="3"></span>
    <span class="fragment" data-lang-step="4"></span>
  </div>
</div>

{{% note %}}
**One language + SQL · four clicks.**
- Start on Java (what they already have at JU). Don't linger.
- Click: strike Java → JavaScript. Same idea.
- Click: Rust. Click: Go. Keep it playful and fast — about a second each.
- Last click lands on **One language**. Say: "Pick one. Go deep. Explain every line. Whiteboard a JOIN. The language is not the point."
- Don't collect frameworks. A lot of real bugs are data bugs, and interviews still test this.
{{% /note %}}

---

{{< slide class="navy" >}}

<div class="stage">
  <h2 class="t-mega"><span class="line"><span>Read before</span></span><span class="line"><span class="d1">you write.</span></span></h2>
  <p class="t-lead in d4">One file you didn’t write. Five lines on what it does.</p>
</div>

{{% note %}}
**Reading.** University grades you on a blank file. Your first week at work is a repo that already exists. One file a week, out loud. Take a question here if the room is warm.
{{% /note %}}

---

<div class="stage tight" data-stack-ladder>
  <h2 class="t-mid in">Same ladder. Plain words.</h2>
  <div class="ladder">
    <div class="rungs">
      <button type="button" class="rung" data-step="5" aria-pressed="false">Autonomous</button>
      <button type="button" class="rung" data-step="4" aria-pressed="false">Agents</button>
      <button type="button" class="rung" data-step="3" aria-pressed="false">Skills</button>
      <button type="button" class="rung" data-step="2" aria-pressed="false">MCP</button>
      <button type="button" class="rung" data-step="1" aria-pressed="false">LLMs</button>
      <button type="button" class="rung base is-active" data-step="0" aria-pressed="true">The basics</button>
    </div>
    <div class="ladder-detail" aria-live="polite">
      <h3 class="ladder-title" data-ladder-title>The basics</h3>
      <p class="ladder-metaphor" data-ladder-metaphor>Git, HTTP, SQL, one language</p>
      <p class="ladder-desc" data-ladder-desc>Everything above sits on this. Shaky here, and the tools only make a mess faster.</p>
    </div>
  </div>
  <div class="step-triggers" aria-hidden="true">
    <span class="fragment" data-ladder-step="1"></span>
    <span class="fragment" data-ladder-step="2"></span>
    <span class="fragment" data-ladder-step="3"></span>
    <span class="fragment" data-ladder-step="4"></span>
    <span class="fragment" data-ladder-step="5"></span>
  </div>
</div>

{{% note %}}
**0:13 – 0:17 · One click per step. About 30 seconds each. Don't lecture.**
- Clicker steps up; you can also click a rung or press 0–5.
- **LLM:** a smart chat box. It cannot see your repo unless you show it.
- **MCP:** a plug, so the AI reads GitHub or docs instead of you pasting screenshots.
- **Skills:** a checklist file the AI has to follow.
- **Agent:** the chat box can now run commands, see the error, and try again.
- **Autonomous:** leave it running on a small task. It might open a PR. You still have to read it.
{{% /note %}}

---

{{< slide class="amber" >}}

<div class="stage">
  <p class="t-lead in">You don’t need all five this year.</p>
  <h2 class="t-mega"><span class="line"><span class="d2">Master the</span></span><span class="line"><span class="d3"><span class="mark" style="--md:1.1s;">bottom.</span></span></span></h2>
</div>

{{% note %}}
**Close the part.** "You need the bottom, and you need to stop being scared of the words." →
{{% /note %}}

{{% /section %}}
