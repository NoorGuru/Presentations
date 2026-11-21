+++
outputs = ["Reveal"]
weight = 4
+++

{{< slide class="dark-teal" >}}

<div class="act-wrap">
  <div class="act-ghost-num">03</div>
  <div>
    <span class="eyebrow eyebrow--dark-teal">ACT 03 · 0:10 – 0:19</span>
  </div>
  <h1 class="act-title">The 2026 Dev Stack</h1>
  <p class="act-sub">Two layers. And Layer 2 collapses the second Layer 1 is shaky.</p>
  <div class="act-bar act-bar--teal"></div>
</div>

{{% note %}}
**0:10 · Act 3 Transition**
- Everyone throws around buzzwords: MCP, Skills, Agents, Autonomous loops.
- Let's demystify the whole stack in under 9 minutes — starting from the concrete slab underneath it.
{{% /note %}}

---

<span class="eyebrow eyebrow--cobalt">LAYER 1 · THE NON-NEGOTIABLES</span>
<h2 class="slide-title">No AI Replaces Knowing These</h2>

<div class="layer1-grid">
  <div class="layer1-card layer1-card--git fragment">
    <div>
      <div class="layer1-badge">FOUNDATION 01</div>
      <h3 class="layer1-title">Git &amp; Pull Requests</h3>
      <div class="chip-row">
        <span class="chip">Branching</span>
        <span class="chip">Clean Diffs</span>
        <span class="chip">Conflicts</span>
        <span class="chip">Code Review</span>
      </div>
    </div>
    <div class="layer1-punch">A PR is no longer a formality — it's your <strong>main safety gate</strong> against bad AI code.</div>
  </div>
  <div class="layer1-card layer1-card--api fragment">
    <div>
      <div class="layer1-badge">FOUNDATION 02</div>
      <h3 class="layer1-title">APIs &amp; Contracts</h3>
      <div class="chip-row">
        <span class="chip">REST / HTTP</span>
        <span class="chip">Auth</span>
        <span class="chip">Payloads</span>
        <span class="chip">Status Codes</span>
      </div>
    </div>
    <div class="layer1-punch">AI agents don't magically "do things" — they interact with the real world <strong>through APIs</strong>.</div>
  </div>
</div>

{{% note %}}
**0:11 – 0:13 · Layer 1 Basics**
- Emphasize *why* classic engineering fundamentals just went UP in value, not down.
- **Git & PRs:** When AI generates 400 lines in 10 seconds, clean branches, atomic diffs, and ruthless PR review are the only firewall protecting production.
- **APIs:** Every tool call an AI agent makes is an API contract (inputs, auth, errors, retries). If you don't understand HTTP, auth, and schemas, you can't build or debug agents.
{{% /note %}}

---

<div data-stack-ladder>
  <span class="eyebrow eyebrow--violet">LAYER 2 · DEMYSTIFYING THE BUZZWORDS</span>
  <h2 class="slide-title" style="margin-bottom: 12px !important;">The Modern Stack Ladder</h2>
  <div class="ladder-layout">
    <div class="ladder-building">
      <div class="ladder-layer-tag">Layer 2 · AI Stack (click any rung or press Next →)</div>
      <div class="ladder-rung" data-step="5">
        <div class="ladder-rung-left">
          <span class="ladder-step-num">05</span>
          <span class="ladder-rung-name">Autonomous Agents</span>
        </div>
        <span class="ladder-rung-metaphor">Bounded autonomy</span>
      </div>
      <div class="ladder-rung" data-step="4">
        <div class="ladder-rung-left">
          <span class="ladder-step-num">04</span>
          <span class="ladder-rung-name">Agents</span>
        </div>
        <span class="ladder-rung-metaphor">LLM + Tools + Loop</span>
      </div>
      <div class="ladder-rung" data-step="3">
        <div class="ladder-rung-left">
          <span class="ladder-step-num">03</span>
          <span class="ladder-rung-name">Skills</span>
        </div>
        <span class="ladder-rung-metaphor">Versioned playbooks</span>
      </div>
      <div class="ladder-rung" data-step="2">
        <div class="ladder-rung-left">
          <span class="ladder-step-num">02</span>
          <span class="ladder-rung-name">MCP</span>
        </div>
        <span class="ladder-rung-metaphor">USB-C for AI</span>
      </div>
      <div class="ladder-rung" data-step="1">
        <div class="ladder-rung-left">
          <span class="ladder-step-num">01</span>
          <span class="ladder-rung-name">AI / LLMs</span>
        </div>
        <span class="ladder-rung-metaphor">Brain in a jar</span>
      </div>
      <div class="ladder-layer-tag">Layer 1 · Foundation</div>
      <div class="ladder-foundation is-active" data-step="0">
        <span class="ladder-foundation-title">Git · PRs · APIs</span>
        <span class="ladder-foundation-sub">Non-Negotiable Slab</span>
      </div>
    </div>
    <div class="ladder-detail">
      <div>
        <div class="ladder-detail-badge" data-ladder-badge>LAYER 1 · FOUNDATION</div>
        <h3 class="ladder-detail-title" data-ladder-title>Git, PRs &amp; APIs</h3>
        <div class="ladder-detail-metaphor" data-ladder-metaphor>The non-negotiable concrete slab</div>
        <p class="ladder-detail-desc" data-ladder-desc>Without clean Git diffs, PR review discipline, and solid API fluency, every AI layer above collapses into broken production changes.</p>
      </div>
      <div class="ladder-detail-example" data-ladder-example>PR = your safety gate  |  APIs = how agents touch the real world</div>
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
**0:13 – 0:19 · Climbing the Ladder (30–45 sec per rung, zero fluff)**
- Press Next (or click any rung directly) to unlock one layer at a time from bottom → top:
  1. **LLMs:** Brain in a jar. Great for chat/autocomplete, blind to your real codebase & environment.
  2. **MCP (Model Context Protocol):** The "USB-C port for AI" — plug your AI directly into GitHub, DBs, logs, and internal docs instead of copy-pasting screenshots.
  3. **Skills:** Reusable, Git-versioned playbooks encoding team test rules, security checks, or migration steps.
  4. **Agents:** Literally just **LLM + Tools + a Loop**. Reads files, runs terminal commands, reads the error log, fixes itself.
  5. **Autonomous Agents:** Bounded autonomy — handles multi-step async workflows (even overnight) constrained by sandboxes, CI tests, and human PR approvals.
{{% /note %}}
