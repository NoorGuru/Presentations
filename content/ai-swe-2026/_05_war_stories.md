+++
outputs = ["Reveal"]
weight = 6
+++

{{< slide class="dark-slide" >}}

<div class="act-wrap">
  <div class="act-ghost-num">05</div>
  <div>
    <span class="eyebrow eyebrow--dark">ACT 05 · 0:26 – 0:34</span>
  </div>
  <h1 class="act-title">Real-World War Stories</h1>
  <p class="act-sub">From enterprise-scale migrations to overnight autonomous loops.</p>
  <div class="act-bar act-bar--violet"></div>
</div>

{{% note %}}
**0:26 · Act 5 Transition**
- Shift gears from theory to real production engineering. Two stories: enterprise scale (EG Wizard) and the future already running today (overnight multi-agent loops).
{{% /note %}}

---

<span class="eyebrow eyebrow--violet">STORY 01 · ENTERPRISE SCALE</span>
<h2 class="slide-title">EG Wizard: Grounded Migrations</h2>

<div class="contrast-strip">
  <div class="contrast-pill contrast-pill--bad">✕ Naive Prompting: blind to internal docs · inconsistent diffs · engineers guessing</div>
  <div class="contrast-pill contrast-pill--good">✓ Engineered Workflow: grounded context · deterministic rules · verified output</div>
</div>

<div class="arch-pipeline">
  <div class="arch-node arch-node--1 fragment">
    <div class="arch-tag">ENTRY POINT</div>
    <div class="arch-name">VS Code</div>
    <div class="arch-desc">Embedded directly inside engineers' daily IDE workflow.</div>
  </div>
  <div class="arch-arrow fragment">→</div>
  <div class="arch-node arch-node--2 fragment">
    <div class="arch-tag">CONTEXT</div>
    <div class="arch-name">MCP Servers</div>
    <div class="arch-desc">Grounded internal docs, schemas &amp; real platform context.</div>
  </div>
  <div class="arch-arrow fragment">→</div>
  <div class="arch-node arch-node--3 fragment">
    <div class="arch-tag">PLAYBOOKS</div>
    <div class="arch-name">Agent Skills</div>
    <div class="arch-desc">Versioned, deterministic migration rules &amp; checks.</div>
  </div>
  <div class="arch-arrow fragment">→</div>
  <div class="arch-node arch-node--4 fragment">
    <div class="arch-tag">OUTCOME</div>
    <div class="arch-name">Verified Migration</div>
    <div class="arch-desc">Automated verification + human PR approval.</div>
  </div>
</div>

{{% note %}}
**0:27 – 0:31 · Story 1: EG Wizard (NDA-safe architecture)**
- Share the real pain of large-scale platform migrations across many engineering teams: every repo is slightly different, internal conventions aren't on StackOverflow, and raw prompting hallucinates or breaks builds.
- Walk through how you architected **EG Wizard**: **VS Code integration + MCP + Agent Skills** — giving the AI grounded internal context, deterministic rules, and automated verification steps so engineers migrate safely instead of blindly guessing.
- Key lesson: *The engineering value wasn't writing one clever prompt — it was building the system around the model.*
{{% /note %}}

---

{{< slide class="dark-teal" >}}

<span class="eyebrow eyebrow--dark-teal">STORY 02 · THE FUTURE HAPPENING TODAY</span>
<h2 class="slide-title">Agents Working While You Sleep</h2>

<div class="loop-pipeline">
  <div class="loop-node fragment">
    <div class="loop-time">11:30 PM</div>
    <div class="loop-name">Scoped Task</div>
    <div class="loop-desc">Clear acceptance criteria &amp; tight boundaries.</div>
  </div>
  <div class="arch-arrow fragment">→</div>
  <div class="loop-node fragment">
    <div class="loop-time">01:15 AM</div>
    <div class="loop-name">Agent Loop</div>
    <div class="loop-desc">Reads repo, implements changes, iterates on errors.</div>
  </div>
  <div class="arch-arrow fragment">→</div>
  <div class="loop-node fragment">
    <div class="loop-time">02:00 AM</div>
    <div class="loop-name">Auto-Verify</div>
    <div class="loop-desc">Runs test suites, linters &amp; build gates.</div>
  </div>
  <div class="arch-arrow fragment">→</div>
  <div class="loop-node loop-node--accent fragment">
    <div class="loop-time">09:00 AM</div>
    <div class="loop-name">PR Ready</div>
    <div class="loop-desc">Clean diff waiting for human review.</div>
  </div>
</div>

<div class="guardrail-bar fragment">
  <span><strong>Bounded Autonomy:</strong> never YOLO to main.</span>
  <div class="guardrail-pills">
    <span class="guardrail-pill">Sandboxed</span>
    <span class="guardrail-pill">Test-Gated</span>
    <span class="guardrail-pill">Human-Merged</span>
  </div>
</div>

{{% note %}}
**0:31 – 0:33 · Story 2: Overnight Multi-Agent Loop**
- Paint the vivid picture: agents running asynchronously on scoped tasks overnight — picking up a well-defined task, implementing changes, running verification checks, fixing their own failing tests, and opening PRs ready for your 9 AM coffee review.
- Stress the guardrails: sandboxed execution, automated CI checks, human-in-the-loop merge gate.
{{% /note %}}

---

{{< slide class="dark-slide" >}}

<div class="reflection-wrap">
  <div>
    <span class="eyebrow eyebrow--dark">PAUSE &amp; THINK</span>
  </div>
  <div class="reflection-setup">
    “If a script on a home server can write boilerplate and open PRs while you sleep…”
  </div>
  <div class="reflection-punch fragment">
    What are companies paying <span style="color:#ffffff;text-decoration:underline;text-decoration-color:#f7941d;text-underline-offset:12px;">YOU</span> to do at 9 AM?
  </div>
</div>

{{% note %}}
**0:33 – 0:34 · Let the Room Sit With This**
- Read the setup, pause for 3 full seconds of silence, then reveal the orange punchline.
- Let it land before moving into Act 6: the answer is the 3 human skills that compound.
{{% /note %}}
