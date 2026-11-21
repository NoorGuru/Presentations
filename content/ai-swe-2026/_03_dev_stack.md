+++
outputs = ["Reveal"]
weight = 4
+++

{{% section %}}

{{< slide class="dark-teal" >}}

<div class="act-wrap">
  <div class="act-ghost-num">03</div>
  <div>
    <span class="eyebrow eyebrow--dark-teal">ACT 03 · 0:09 – 0:20</span>
  </div>
  <h1 class="act-title">The basics, then the stack</h1>
  <p class="act-sub">Spend your time here. The buzzwords only make sense after the basics.</p>
  <div class="act-bar act-bar--teal"></div>
</div>

{{% note %}}
**0:09 · This is the center of the talk**
- Tell them you're going to stay on this act. Two slides: what to practice, then the names they'll hear at work, in plain words.
{{% /note %}}

---

<span class="eyebrow eyebrow--cobalt">WORK ON THESE NOW</span>
<h2 class="slide-title">Four basics. No new framework required.</h2>

<div class="basics-grid">
  <div class="basics-card basics-card--cobalt fragment">
    <div class="basics-kicker">01 · Daily</div>
    <h3 class="basics-title">Git and pull requests</h3>
    <p class="basics-body">Branch, small commits, a pull request someone else can read. This is how you show work, and how bad AI code gets caught.</p>
  </div>
  <div class="basics-card basics-card--teal fragment">
    <div class="basics-kicker">02 · How systems talk</div>
    <h3 class="basics-title">HTTP, JSON, status codes</h3>
    <p class="basics-body">A request, a body, and what 200, 401, 404, and 500 mean. AI tools don't do magic. They call APIs.</p>
  </div>
  <div class="basics-card basics-card--violet fragment">
    <div class="basics-kicker">03 · Go deep, not wide</div>
    <h3 class="basics-title">One language, plus SQL</h3>
    <p class="basics-body">Java is enough. Explain every line out loud. Then SELECT, WHERE, and JOIN. A lot of real bugs are data bugs.</p>
  </div>
  <div class="basics-card basics-card--orange fragment">
    <div class="basics-kicker">04 · The actual job</div>
    <h3 class="basics-title">Read, then change</h3>
    <p class="basics-body">Open one file you didn't write. Say what it does in five lines. Then change one thing without breaking the rest.</p>
  </div>
</div>

{{% note %}}
**0:10 – 0:16 · Stay on this slide. Let them react.**
- Ask: "Who can open a branch and a PR without googling the commands?" Hands. That's the gap, not Java syntax.
- **Git:** a pull request is the habit. AI can write 200 lines in a minute. The PR is where a human says yes or no.
- **HTTP:** walk one example they already know. Login button → request → 200 or 401. If they can't read that, they can't debug an AI tool either, because the tool is doing the same thing.
- **One language + SQL:** don't collect frameworks. Be the person who can whiteboard a JOIN and explain their own Java. Interviews still do this.
- **Reading:** university grades you on a blank file. Your first week at work is a repo that already exists. One file a week, out loud.
- If the room is engaged, take a question here before the ladder.
{{% /note %}}

---

<div data-stack-ladder>
  <span class="eyebrow eyebrow--violet">THEN THE NAMES YOU'LL HEAR</span>
  <h2 class="slide-title" style="margin-bottom: 12px !important;">Same ladder. Plain words.</h2>
  <div class="ladder-layout">
    <div class="ladder-building">
      <div class="ladder-layer-tag">Click a step, or press Next →</div>
      <div class="ladder-rung" data-step="5">
        <div class="ladder-rung-left">
          <span class="ladder-step-num">05</span>
          <span class="ladder-rung-name">Autonomous agents</span>
        </div>
        <span class="ladder-rung-metaphor">Keeps going</span>
      </div>
      <div class="ladder-rung" data-step="4">
        <div class="ladder-rung-left">
          <span class="ladder-step-num">04</span>
          <span class="ladder-rung-name">Agents</span>
        </div>
        <span class="ladder-rung-metaphor">Can use the computer</span>
      </div>
      <div class="ladder-rung" data-step="3">
        <div class="ladder-rung-left">
          <span class="ladder-step-num">03</span>
          <span class="ladder-rung-name">Skills</span>
        </div>
        <span class="ladder-rung-metaphor">A saved checklist</span>
      </div>
      <div class="ladder-rung" data-step="2">
        <div class="ladder-rung-left">
          <span class="ladder-step-num">02</span>
          <span class="ladder-rung-name">MCP</span>
        </div>
        <span class="ladder-rung-metaphor">A plug</span>
      </div>
      <div class="ladder-rung" data-step="1">
        <div class="ladder-rung-left">
          <span class="ladder-step-num">01</span>
          <span class="ladder-rung-name">AI / LLMs</span>
        </div>
        <span class="ladder-rung-metaphor">A smart chat box</span>
      </div>
      <div class="ladder-layer-tag">Under everything</div>
      <div class="ladder-foundation is-active" data-step="0">
        <span class="ladder-foundation-title">Git · HTTP · SQL · one language</span>
        <span class="ladder-foundation-sub">Practice these first</span>
      </div>
    </div>
    <div class="ladder-detail">
      <div>
        <div class="ladder-detail-badge" data-ladder-badge>START HERE</div>
        <h3 class="ladder-detail-title" data-ladder-title>The basics</h3>
        <div class="ladder-detail-metaphor" data-ladder-metaphor>Git, HTTP, SQL, one language</div>
        <p class="ladder-detail-desc" data-ladder-desc>AI sits on top of these. If you can't branch, read a pull request, call an API, or explain your own code, the tools above just make a mess faster.</p>
      </div>
      <div class="ladder-detail-example" data-ladder-example>Practice the basics this semester. Learn the names above them so they stop sounding like magic.</div>
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
**0:16 – 0:20 · One click per step. About 30 seconds each. Don't lecture.**
- Start on the foundation and say the punch line: the top of the ladder is useless if the bottom is shaky.
- **LLM:** ChatGPT / Copilot. A smart chat box. It cannot see your repo unless you show it.
- **MCP:** a plug, so the AI can read GitHub or docs instead of you pasting screenshots. They do not need to build one. They need the idea.
- **Skills:** a checklist file the AI has to follow. Like a README with rules.
- **Agent:** the chat box can now run commands, see the error, and try again.
- **Autonomous:** leave it running on a small task. It might open a PR. You still have to read the PR. That's why Git from the previous slide matters.
- Close the act: "You don't need all five this year. You need the bottom, and you need to stop being scared of the words."
- This whole act is one vertical section: divider → four basics → ladder. → skips ahead to Act 4.
{{% /note %}}

{{% /section %}}
