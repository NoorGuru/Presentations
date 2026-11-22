+++
outputs = ["Reveal"]
weight = 4
+++

{{% section %}}

{{< slide class="amber" >}}

<div class="stage">
  <p class="t-lead in">Five words you hear everywhere.</p>
  <h1 class="t-huge"><span class="line"><span class="d1">The AI stack.</span></span><span class="line"><span class="d2"><span class="mark" style="--md:0.85s;">Plain words.</span></span></span></h1>
  <p class="t-lead in d5" style="max-width:none;">LLMs · MCP · Skills · Agents · Autonomous</p>
</div>

{{% note %}}
**0:12 · New section door (10 sec).**
- Let the room breathe after the day-1 basics.
- "Every day on LinkedIn you hear these five words like they're magic. Let's demystify them: one screen, one real example each. Then connect all five in one bug fix." ↓
{{% /note %}}

---

{{< slide class="navy" >}}

<div class="stack-rail" aria-hidden="true">
  <span class="rail-pill is-now">01 LLMs</span>
  <span class="rail-pill">02 MCP</span>
  <span class="rail-pill">03 Skills</span>
  <span class="rail-pill">04 Agents</span>
  <span class="rail-pill">05 Autonomous</span>
</div>
<div class="stage stack-stage">
  <div class="split stack-split">
    <div class="stack-copy">
      <h2 class="t-huge"><span class="line"><span>LLMs.</span></span></h2>
      <p class="stack-metaphor in d2">A brain in a chat box.</p>
      <p class="t-lead in d3">ChatGPT, Claude, Gemini. Great at explaining and drafting. Blind to your repo unless you paste it in.</p>
    </div>
    <div class="chat-demo in d4">
      <div class="chat-msg is-user">
        <span class="chat-who">You</span>
        <p class="chat-body">Why is <code>LoginService</code> crashing?<span class="chat-paste">+ pasted 40 lines &amp; stack trace</span></p>
      </div>
      <div class="chat-msg is-ai">
        <span class="chat-who">LLM</span>
        <p class="chat-body">Line 14: <code>user</code> can be <code>null</code>. Check before reading <code>user.password</code>.</p>
      </div>
      <div class="chat-limit">Stops here. It can only reply with text.</div>
    </div>
  </div>
</div>

{{% note %}}
**01 · LLMs (30 sec).**
- Start simple: everyone here has used ChatGPT or Claude.
- That's an LLM: a smart brain trapped in a chat box. It doesn't see your project, can't open a file, can't run tests. It only knows what you paste in, and it only replies with text.
{{% /note %}}

---

<div class="stack-rail" aria-hidden="true">
  <span class="rail-pill is-done">01 LLMs</span>
  <span class="rail-pill is-now">02 MCP</span>
  <span class="rail-pill">03 Skills</span>
  <span class="rail-pill">04 Agents</span>
  <span class="rail-pill">05 Autonomous</span>
</div>
<div class="stage stack-stage">
  <div class="split stack-split">
    <div class="stack-copy">
      <h2 class="t-huge"><span class="line"><span>MCP.</span></span></h2>
      <p class="stack-metaphor in d2"><span class="mark" style="--md:0.65s;">USB-C for AI.</span></p>
      <p class="t-lead in d3">One standard plug so AI connects straight to your real tools. No more pasting screenshots.</p>
    </div>
    <div class="mcp-demo in d4">
      <div class="mcp-hub">
        <div class="mcp-brain">LLM</div>
        <div class="mcp-wire"><span>MCP</span></div>
        <div class="mcp-ports">
          <div class="mcp-port"><b>GitHub</b><span>reads PRs &amp; diffs</span></div>
          <div class="mcp-port"><b>Postgres</b><span>inspects your tables</span></div>
          <div class="mcp-port"><b>Team Docs</b><span>reads internal wikis</span></div>
        </div>
      </div>
      <div class="mcp-caption">Ask “Why did PR #12 fail?” → it reads the diff itself.</div>
    </div>
  </div>
</div>

{{% note %}}
**02 · MCP (30–40 sec).**
- Model Context Protocol sounds scary. Just think **USB-C for AI**.
- Before MCP, you pasted logs, SQL schemas, and screenshots into chat. With MCP, you plug GitHub, Postgres, or internal docs directly into the model.
- Example: "Why did PR #12 fail?" It fetches the PR diff on its own.
{{% /note %}}

---

{{< slide class="navy" >}}

<div class="stack-rail" aria-hidden="true">
  <span class="rail-pill is-done">01 LLMs</span>
  <span class="rail-pill is-done">02 MCP</span>
  <span class="rail-pill is-now">03 Skills</span>
  <span class="rail-pill">04 Agents</span>
  <span class="rail-pill">05 Autonomous</span>
</div>
<div class="stage stack-stage">
  <div class="split stack-split">
    <div class="stack-copy">
      <h2 class="t-huge"><span class="line"><span>Skills.</span></span></h2>
      <p class="stack-metaphor in d2">Your team’s saved playbook.</p>
      <p class="t-lead in d3">A plain markdown file inside your repo with rules the AI has to follow every single time.</p>
    </div>
    <div class="skill-card in d4">
      <div class="skill-bar"><span class="mono">AGENTS.md</span><span class="skill-pill">Repo rules</span></div>
      <ul class="skill-list">
        <li><span class="skill-check">✓</span>Always write JUnit tests</li>
        <li><span class="skill-check">✓</span>Never glue input into SQL</li>
        <li><span class="skill-check">✓</span>Run <code>mvn test</code> before finishing</li>
        <li><span class="skill-check">✓</span>Keep PRs small &amp; readable</li>
      </ul>
    </div>
  </div>
</div>

{{% note %}}
**03 · Skills (30–40 sec).**
- Instead of repeating the same instructions in every prompt, you save them once in a markdown file inside the repo (`AGENTS.md` or `SKILL.md`).
- Now every time AI touches your project, it knows your stack, your rules, and how to test. (We'll come back to writing a 10-line `AGENTS.md` tonight.)
{{% /note %}}

---

<div class="stack-rail" aria-hidden="true">
  <span class="rail-pill is-done">01 LLMs</span>
  <span class="rail-pill is-done">02 MCP</span>
  <span class="rail-pill is-done">03 Skills</span>
  <span class="rail-pill is-now">04 Agents</span>
  <span class="rail-pill">05 Autonomous</span>
</div>
<div class="stage stack-stage">
  <div class="split stack-split">
    <div class="stack-copy">
      <h2 class="t-huge"><span class="line"><span>Agents.</span></span></h2>
      <p class="stack-metaphor in d2"><span class="mark" style="--md:0.65s;">The chat box gets hands.</span></p>
      <p class="t-lead in d3">It edits files, runs commands, sees the error, and tries again in a loop until it passes.</p>
    </div>
    <div class="agent-loop in d4">
      <div class="agent-step"><span class="agent-n">01</span><span>Edits <code>LoginService.java</code></span></div>
      <div class="agent-step is-fail"><span class="agent-n">02</span><span>Runs <code>mvn test</code> → <b>1 test failed</b></span></div>
      <div class="agent-step"><span class="agent-n">03</span><span>Reads the error &amp; fixes the bug</span></div>
      <div class="agent-step is-pass"><span class="agent-n">04</span><span>Re-runs <code>mvn test</code> → <b>All green</b></span></div>
    </div>
  </div>
</div>

{{% note %}}
**04 · Agents (40 sec).**
- Three words to remember: **model, tools, loop.**
- An LLM replies once and stops. An agent edits the file, runs your tests, sees that a test failed, reads the stack trace, fixes it, and runs the tests again until they're green.
{{% /note %}}

---

{{< slide class="navy" >}}

<div class="stack-rail" aria-hidden="true">
  <span class="rail-pill is-done">01 LLMs</span>
  <span class="rail-pill is-done">02 MCP</span>
  <span class="rail-pill is-done">03 Skills</span>
  <span class="rail-pill is-done">04 Agents</span>
  <span class="rail-pill is-now">05 Autonomous</span>
</div>
<div class="stage stack-stage">
  <div class="split stack-split">
    <div class="stack-copy">
      <h2 class="t-big" style="font-size:116px;"><span class="line"><span>Autonomous.</span></span></h2>
      <p class="stack-metaphor in d2">An agent on the night shift.</p>
      <p class="t-lead in d3">Hand it a clear, scoped ticket and close your laptop. You wake up to a pull request.</p>
    </div>
    <div class="shift-timeline in d4">
      <div class="shift-row">
        <span class="shift-time">11:00 PM</span>
        <div class="shift-card"><b>You assign a ticket</b><span>“Upgrade 12 services to Java 21”</span></div>
      </div>
      <div class="shift-row">
        <span class="shift-time">02:14 AM</span>
        <div class="shift-card is-ai"><b>Agent works overnight</b><span>Branches · edits · runs tests · opens 12 PRs</span></div>
      </div>
      <div class="shift-row">
        <span class="shift-time">09:00 AM</span>
        <div class="shift-card is-you"><b>You review &amp; decide</b><span>Read the diffs. Approve or reject.</span></div>
      </div>
    </div>
  </div>
</div>

{{% note %}}
**05 · Autonomous (40 sec).**
- Same agent loop, just running without you babysitting every step.
- 11 PM you assign a scoped task; 2 AM it's opening PRs; 9 AM you still review and decide what ships.
- Next slide: put all five together in one real bug fix.
{{% /note %}}

---

<div class="stage tight" data-step-fragments>
  <div class="bp-head">
    <h2 class="t-mid in">All five, <span class="mark" style="--md:0.55s;">one bug fix.</span></h2>
    <p class="t-small in d2">From broken login ticket to merged pull request</p>
  </div>
  <div class="bp-flow">
    <div class="bp-card fragment" data-fragment-index="1">
      <span class="bp-step">01 · Thinks</span>
      <b class="bp-name">LLM</b>
      <p class="bp-ex">Understands the login crash report</p>
    </div>
    <div class="bp-card fragment" data-fragment-index="2">
      <span class="bp-step">02 · Connects</span>
      <b class="bp-name">MCP</b>
      <p class="bp-ex">Pulls the GitHub issue &amp; DB schema</p>
    </div>
    <div class="bp-card fragment" data-fragment-index="3">
      <span class="bp-step">03 · Follows rules</span>
      <b class="bp-name">Skills</b>
      <p class="bp-ex">Reads <code>AGENTS.md</code>: parameterized SQL + tests</p>
    </div>
    <div class="bp-card fragment" data-fragment-index="4">
      <span class="bp-step">04 · Runs the loop</span>
      <b class="bp-name">Agent</b>
      <p class="bp-ex">Edits code &amp; runs <code>mvn test</code> till green</p>
    </div>
    <div class="bp-card is-amber fragment" data-fragment-index="5">
      <span class="bp-step">05 · Opens PR #12</span>
      <b class="bp-name">Autonomous</b>
      <p class="bp-ex">Ready in GitHub by morning</p>
    </div>
  </div>
  <div class="bp-base">
    <div class="bp-base-left">
      <span class="bp-base-tag">The Foundation</span>
      <span class="bp-base-skills">Git &amp; GitHub · APIs · One language + SQL</span>
    </div>
    <div class="bp-base-you fragment" data-fragment-index="6">YOU review PR #12 &amp; merge</div>
  </div>
</div>

{{% note %}}
**0:16 – 0:17 · The big picture · Six clicks (Space or ↓).**
- Walk the one story left-to-right so the five words stop feeling like separate buzzwords:
  1. **LLM** thinks through the bug report.
  2. **MCP** connects to GitHub and the database so it has real context.
  3. **Skills** (`AGENTS.md`) enforce your team's rules.
  4. **Agent** edits the file and runs the test loop until green.
  5. **Autonomous** opens PR #12 while you sleep.
  6. **Click 6:** And sitting underneath all five? **The Foundation**, because **you** are the one who opens PR #12, reads the diff, and decides whether it ships.
{{% /note %}}

---

{{< slide class="amber" >}}

<div class="stage">
  <p class="t-lead in">You don’t need all five this year.</p>
  <h2 class="t-huge"><span class="line"><span class="d2">Master the</span></span><span class="line"><span class="d3"><span class="mark" style="--md:1.1s;">foundation.</span></span></span></h2>
</div>

{{% note %}}
**Pause here.** "You don't need to build MCP servers or overnight agents before you graduate. Master the foundation, and stop being intimidated by the buzzwords." ↓
{{% /note %}}

---

{{< slide class="navy" >}}

<div class="stage">
  <p class="t-lead in">When AI writes 10× more code:</p>
  <h2 class="t-mega"><span class="line"><span class="d1"><span class="mark" style="--md:0.85s;">Read</span> before</span></span><span class="line"><span class="d2">you write.</span></span></h2>
  <p class="t-lead in d5" style="max-width:34ch;">Your job isn’t typing code faster. It’s understanding what’s about to ship.</p>
</div>

{{% note %}}
**Close the part · The daily muscle.**
- Every layer we just saw, from LLMs to overnight agents, creates more code for *you* to read.
- Weekly habit: open one file you didn't write and explain what it does in five lines, out loud.
- Bridge →: "Let's test that muscle right now. Because AI is fast at bugs, too."
{{% /note %}}

{{% /section %}}
