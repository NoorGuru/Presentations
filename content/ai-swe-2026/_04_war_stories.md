+++
outputs = ["Reveal"]
weight = 6
+++

{{% section %}}

{{< slide class="navy" >}}

<div class="stage">
  <h1 class="t-huge"><span class="line"><span>What the job</span></span><span class="line"><span class="d1">looks like.</span></span></h1>
  <p class="t-lead in d4" style="max-width:none;">Two stories from my work: <b>Java4Shell</b> and <b>EG Wizard.</b></p>
</div>

{{% note %}}
**0:24 · Part door.** Two real stories. First a fire I helped put out last week. Then a tool I build every day: the problem, the naive try, the tool, the result.
{{% /note %}}

---

<div class="stage">
  <div class="j4s-eyebrow in">
    <span class="j4s-pill"><span class="j4s-dot" aria-hidden="true"></span>NOV 17, 2026 · JAVA4SHELL</span>
    <span class="j4s-meta">STORY 1 OF 2 · JDK BASE64 DECODER</span>
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
**0:24 · Story 1. No payload, no CVE lecture unless asked.**
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
**0:25 · Story 1, the response (4 quick clicks).**
- Point at the top asymmetry bar: **1 AI run under $200** triggered an **emergency war room across hundreds of services and days of rollout**.
- Click 1: Audit every service, container, and JDK version.
- Click 2: Mitigate first. Because the bug is inside the JDK itself, you can't just edit your own code. You have to put mitigations in place while waiting for the official JDK fix.
- Click 3: Once the official JDK patch lands, rebuild base images, test, and roll it out safely without breaking live customers.
- Click 4 (Amber card): "This isn't theory. **1 week ago**, my team was rolling this out across our Java systems. Not one microservice. The whole platform."
- Bridge (→): "That's the job AI doesn't remove. And it's not a one-time thing. Apps fall behind every month."
{{% /note %}}

---

<div class="stage">
  <span class="bc-num in">STORY 2 OF 2</span>
  <h2 class="t-huge"><span class="line"><span>One app? Easy.</span></span><span class="line"><span class="d2">Hundreds?</span></span><span class="line"><span class="d3"><span class="mark" style="--md:1.2s;">Build a tool.</span></span></span></h2>
</div>

{{% note %}}
**0:26 · Bridge (no clicks).** "Patching one app by hand is easy. Doing it across hundreds of apps, again and again, is a different job. So you build a tool for it. That's my day job."
{{% /note %}}

---

{{< slide class="navy" >}}

<div class="stage" data-step-fragments>
  <div class="split eg-pain">
    <div class="eg-pain-copy">
      <span class="bc-num in">THE PROBLEM</span>
      <h2 class="t-big"><span class="line"><span>Frameworks</span></span><span class="line"><span class="d1">get old.</span></span></h2>
      <div class="eg-facts">
        <div class="eg-fact fragment"><b>Hundreds</b><span>of apps on old versions</span></div>
        <div class="eg-fact fragment"><b>Weeks</b><span>to upgrade one by hand</span></div>
        <div class="eg-fact fragment"><b>Every repo</b><span>is a little different</span></div>
      </div>
    </div>
    <div class="eg-apps in d2" aria-hidden="true">
      <div class="eg-app is-old"><span>orders-api</span><b>OUTDATED</b></div>
      <div class="eg-app is-old"><span>payments</span><b>OUTDATED</b></div>
      <div class="eg-app is-behind"><span>auth</span><b>BEHIND</b></div>
      <div class="eg-app is-old"><span>search</span><b>OUTDATED</b></div>
      <div class="eg-app is-old"><span>billing</span><b>OUTDATED</b></div>
      <div class="eg-app is-current"><span>gateway</span><b>CURRENT</b></div>
      <div class="eg-app is-old"><span>inventory</span><b>OUTDATED</b></div>
      <div class="eg-app is-behind"><span>checkout</span><b>BEHIND</b></div>
      <div class="eg-app is-old"><span>reports</span><b>OUTDATED</b></div>
      <div class="eg-app is-old"><span>shipping</span><b>OUTDATED</b></div>
      <div class="eg-app is-old"><span>catalog</span><b>OUTDATED</b></div>
      <div class="eg-app is-behind"><span>pricing</span><b>BEHIND</b></div>
      <div class="eg-app is-old"><span>admin-ui</span><b>OUTDATED</b></div>
      <div class="eg-app is-old"><span>ledger</span><b>OUTDATED</b></div>
      <div class="eg-app is-current"><span>profile</span><b>CURRENT</b></div>
      <div class="eg-app is-old"><span>alerts</span><b>OUTDATED</b></div>
      <div class="eg-app is-old"><span>cart</span><b>OUTDATED</b></div>
      <div class="eg-app is-behind"><span>support</span><b>BEHIND</b></div>
      <div class="eg-app is-old"><span>mobile-bff</span><b>OUTDATED</b></div>
      <div class="eg-app is-old"><span>analytics</span><b>OUTDATED</b></div>
      <div class="eg-app-more">+ hundreds more</div>
    </div>
  </div>
</div>

{{% note %}}
**0:26 · The pain (3 clicks).** Make it relatable first.
- "Every app runs on a framework. Frameworks release new versions. Old versions stop getting security fixes."
- Click through: hundreds of apps, weeks per app by hand, and every repo is a little different, so one script can't do it.
- "You've all fought dependency hell on a uni project. Now imagine hundreds of them."
{{% /note %}}

---

<div class="stage" data-step-fragments>
  <div class="split eg-try">
    <div class="eg-try-copy">
      <span class="bc-num in">FIRST TRY</span>
      <h2 class="t-big"><span class="line"><span>Just ask</span></span><span class="line"><span class="d1">the AI?</span></span></h2>
      <p class="t-lead fragment" data-fragment-index="3">A clever prompt<br>is not a plan.</p>
    </div>
    <div class="eg-chat">
      <div class="eg-msg is-user in d2">
        <span class="eg-who">You</span>
        <p>“Upgrade this app to the new framework version.”</p>
      </div>
      <div class="eg-msg is-ai in d3">
        <span class="eg-who">AI · very confident</span>
        <div class="eg-step"><b>1</b><span>Bump the version in the build file.</span></div>
        <div class="eg-step"><b>2</b><span>Run <code>fw migrate --auto</code></span><em class="eg-flag fragment" data-fragment-index="1">Doesn’t exist</em></div>
        <div class="eg-step"><b>3</b><span>Delete the old config. Done!</span><em class="eg-flag fragment" data-fragment-index="2">Breaks login</em></div>
      </div>
    </div>
  </div>
</div>

{{% note %}}
**0:27 · The naive try (3 clicks).**
- "First instinct: paste the repo into a chat and ask it to upgrade."
- Click 1: it invents a command that doesn't exist. Click 2: it deletes config that was holding up security.
- Click 3: "A clever prompt is not a plan. The model doesn't know our framework, our rules, or this repo."
{{% /note %}}

---

{{< slide class="navy" >}}

<div class="stage" data-step-fragments>
  <div class="eg-head">
    <div>
      <span class="bc-num in">SO WE BUILT</span>
      <h2 class="t-big in d1">EG Wizard.</h2>
    </div>
    <div class="eg-modes in d2">
      <span class="eg-mode">Human in the loop</span>
      <span class="eg-mode-or">or</span>
      <span class="eg-mode">Autonomous</span>
    </div>
  </div>
  <p class="t-lead in d2" style="max-width:none;">Upgrades apps to new framework versions. Safely. Consistently.</p>
  <div class="eg-pipe">
    <div class="eg-stage fragment" data-fragment-index="1">
      <span class="eg-stage-num">01</span>
      <span class="eg-stage-title">Check</span>
      <span class="eg-stage-desc">What does this app need? Versions, dependencies, risky code.</span>
      <span class="eg-stage-tag">MCP · reads team docs</span>
    </div>
    <div class="eg-stage fragment" data-fragment-index="2">
      <span class="eg-stage-num">02</span>
      <span class="eg-stage-title">Upgrade</span>
      <span class="eg-stage-desc">Recipes for known changes. AI for the messy, repo-specific parts.</span>
      <span class="eg-stage-tag">Skills · the playbook</span>
    </div>
    <div class="eg-stage fragment" data-fragment-index="3">
      <span class="eg-stage-num">03</span>
      <span class="eg-stage-title">Validate</span>
      <span class="eg-stage-desc">Build, tests, checks. Fails? Read the error, fix, retry.</span>
      <span class="eg-stage-tag">Agent · retry loop</span>
    </div>
    <div class="eg-stage fragment" data-fragment-index="4">
      <span class="eg-stage-num">04</span>
      <span class="eg-stage-title">Summarize</span>
      <span class="eg-stage-desc">Plain-English report: what changed, what needs a human.</span>
      <span class="eg-stage-tag">LLM · explains it</span>
    </div>
  </div>
  <div class="eg-rule fragment" data-fragment-index="5"><b>Either mode:</b> a human reviews every change before it merges.</div>
</div>

{{% note %}}
**0:28 · The tool (5 clicks). This is where Part 2 pays off.**
- One stage per click. Point at the small tag under each one: "Remember the AI stack? Here it is in a real product."
- Check uses MCP to read our docs. Upgrade follows a playbook (Skills): fixed recipes for known changes, AI only for the messy parts. Validate is the agent loop. Summarize is the LLM explaining it in plain words.
- Modes: it can run with a human in the loop, or fully autonomous.
- Click 5: "But either way, a human reviews before anything merges. Always."
{{% /note %}}

---

<div class="stage" data-step-fragments>
  <div class="split eg-result">
    <div class="eg-result-copy">
      <span class="bc-num in">THE RESULT</span>
      <h2 class="t-huge"><span class="line"><span><span class="strike" style="--sd:0.7s;">Weeks.</span></span></span><span class="line"><span class="d2"><span class="mark" style="--md:1.1s;">&lt; 1 hour.</span></span></span></h2>
      <p class="t-lead in d3" style="max-width:none;">Per app.<br>Across hundreds of apps.</p>
    </div>
    <div class="eg-pr in d2">
      <div class="eg-pr-head">
        <span class="eg-pr-open">Open</span>
        <span class="eg-pr-title">EG Wizard · Upgrade to framework vNext</span>
      </div>
      <div class="eg-pr-row"><span class="eg-ok">✓</span>Dependencies upgraded</div>
      <div class="eg-pr-row"><span class="eg-ok">✓</span>Code changes applied</div>
      <div class="eg-pr-row"><span class="eg-ok">✓</span>Build green</div>
      <div class="eg-pr-row"><span class="eg-ok">✓</span>Tests passing</div>
      <div class="eg-pr-row is-human fragment"><span class="eg-warn">!</span>Needs a human: custom security config</div>
      <div class="eg-pr-foot fragment">App team reviews, merges, and picks the rollout date.</div>
    </div>
  </div>
</div>

{{% note %}}
**0:29 · The result (2 clicks).**
- Weeks of manual work per app, down to under 1 hour.
- Click 1: "And this line is my favorite. It knows what it shouldn't touch. It flags it for a human."
- Click 2: "The app team still reviews, merges, and decides when it goes to production."
{{% /note %}}

---

{{< slide class="navy" auto-animate="true" auto-animate-id="morning" >}}

<div class="stage">
  <h2 class="t-big" data-id="setup"><span class="line"><span>EG Wizard can open</span></span><span class="line"><span class="d1">the pull request</span></span><span class="line"><span class="d2">while you sleep.</span></span></h2>
</div>

{{% note %}}
**0:30.** Read it. Wait. ↓ keeps this line and asks the question under it.
{{% /note %}}

---

{{< slide class="navy" auto-animate="true" auto-animate-id="morning" >}}

<div class="stage">
  <h2 class="t-lead muted settled" data-id="setup" style="max-width:none;">EG Wizard can open the pull request while you sleep.</h2>
  <h2 class="t-huge" data-id="question"><span class="line"><span class="d2">So what are</span></span><span class="line"><span class="d3">they paying</span></span><span class="line"><span class="d4"><span class="mark" style="--md:1.2s;">you for?</span></span></span></h2>
</div>

{{% note %}}
**0:30.** Let the room answer. If it's quiet, ↓ answers it.
{{% /note %}}

---

{{< slide auto-animate="true" auto-animate-id="morning" >}}

<div class="stage">
  <h2 class="t-lead muted settled" data-id="question" style="max-width:none;">So what are they paying you for?</h2>
  <div class="who-list">
    <div class="who-row fragment"><span class="who-q">Who builds the tools?</span><span class="who-a">You.</span></div>
    <div class="who-row fragment"><span class="who-q">Who decided what’s safe to automate?</span><span class="who-a">You.</span></div>
    <div class="who-row fragment"><span class="who-q">Who reviews the pull request?</span><span class="who-a">You.</span></div>
    <div class="who-row fragment"><span class="who-q">Who gets paged when it breaks?</span><span class="who-a">You.</span></div>
  </div>
  <p class="t-big who-verdict fragment" data-id="verdict">Not for typing. <span class="mark-f">For judgment.</span></p>
</div>

{{% note %}}
**0:30 – 0:31 · Five clicks. Ask each question out loud and let the room answer before "You." lands.**
- By the third question they'll shout "you" before it appears. That's the point.
- Pivot from my story to theirs: the setup line was EG Wizard, these questions are about any engineer's job.
- Who builds the tools: someone had to understand the framework deeply enough to build EG Wizard and write its playbooks. Who decided what's safe: that's the "Needs a human" line from the last slide. Who reviews: same rule as PR #12. Who gets paged: "AI wrote it. You own it."
- Click 5: "They don't pay you for typing. They pay you for judgment."
- Callback to Part 1: this is the new bar. Use AI on purpose, explain it out loud, prove it's right.
- ↓ keeps the verdict and asks if they're convinced.
{{% /note %}}

---

{{< slide auto-animate="true" auto-animate-id="morning" >}}

<div class="stage">
  <p class="t-lead muted settled" data-id="verdict" style="max-width:none;">Not for typing. For judgment.</p>
  <h2 class="t-huge"><span class="line"><span class="d2">Still not</span></span><span class="line"><span class="d3"><span class="mark" style="--md:1.1s;">convinced?</span></span></span></h2>
  <p class="t-lead in d5" style="max-width:none;">Let’s take an example.</p>
</div>

{{% note %}}
**0:31.** Smile. "Still not convinced? Fine. Here's an example that has nothing to do with code."
{{% /note %}}

---

{{< slide class="navy" auto-animate="true" auto-animate-id="bridge" >}}

<div class="stage br-stage br" data-step-fragments>
  <div class="br-top">
    <div class="br-copy">
      <span class="bc-num in">AN EXAMPLE</span>
      <h2 class="t-mid"><span class="line"><span>Imagine you own</span></span><span class="line"><span class="d1">a bridge.</span></span></h2>
      <div class="br-says in d3">
        <p class="t-lead br-say is-0">A real one. In a very dusty place.</p>
        <p class="t-lead br-say is-1">Dust every day. So you clean it every day.</p>
        <p class="t-lead br-say is-2">No time left to make it better.</p>
        <p class="t-lead br-say is-3">What if you build a tool for the cleaning?</p>
        <p class="t-lead br-say is-4">The tool cleans. <span class="mark-f">You build.</span></p>
      </div>
    </div>
    <div class="br-week" aria-hidden="true">
      <div class="br-week-head"><span>YOUR WEEK</span><span class="br-key"><i class="is-clean"></i>Cleaning<i class="is-build"></i>Building</span></div>
      <div class="br-days">
        <div class="br-day" style="--i:0;"><div class="br-bar"><i class="br-bar-build"></i><i class="br-bar-clean"></i></div><span>SUN</span></div>
        <div class="br-day" style="--i:1;"><div class="br-bar"><i class="br-bar-build"></i><i class="br-bar-clean"></i></div><span>MON</span></div>
        <div class="br-day" style="--i:2;"><div class="br-bar"><i class="br-bar-build"></i><i class="br-bar-clean"></i></div><span>TUE</span></div>
        <div class="br-day" style="--i:3;"><div class="br-bar"><i class="br-bar-build"></i><i class="br-bar-clean"></i></div><span>WED</span></div>
        <div class="br-day" style="--i:4;"><div class="br-bar"><i class="br-bar-build"></i><i class="br-bar-clean"></i></div><span>THU</span></div>
        <div class="br-day" style="--i:5;"><div class="br-bar"><i class="br-bar-build"></i><i class="br-bar-clean"></i></div><span>FRI</span></div>
        <div class="br-day" style="--i:6;"><div class="br-bar"><i class="br-bar-build"></i><i class="br-bar-clean"></i></div><span>SAT</span></div>
      </div>
    </div>
  </div>
  {{< bridge >}}
  <div class="step-triggers" aria-hidden="true">
    <span class="fragment br-t1">&nbsp;</span>
    <span class="fragment br-t2">&nbsp;</span>
    <span class="fragment br-t3">&nbsp;</span>
    <span class="fragment br-t4">&nbsp;</span>
  </div>
</div>

{{% note %}}
**0:31 – 0:32 · The bridge (4 clicks). Tell it like a story. Slow down.**
- "Imagine you own a bridge. A real one, over a wadi, somewhere very dusty."
- Click 1: "Every day the dust comes back. So every day you sweep it." Point at the week: all of it is cleaning.
- Click 2: "So the things you wanted to do stay as dashed lines. New lights. A second bridge. Someday."
- Click 3: "Now what if you build a tool that does the cleaning?" Let the machine finish its run. The week empties out.
- Click 4: "The dust didn't stop. It's still a desert. But now the tool cleans and you build." The lights go on. You move to the next bridge.
{{% /note %}}

---

{{< slide class="navy" auto-animate="true" auto-animate-id="bridge" >}}

<div class="stage br-stage br is-done">
  <p class="t-lead in" style="max-width:none;">That’s <span class="br-eg">EG Wizard</span> for me.</p>
  <h2 class="t-big"><span class="line"><span class="d2">What’s your <span class="mark" style="--md:1.1s;">bridge?</span></span></span></h2>
  {{< bridge tool="EG WIZARD" >}}
</div>

{{% note %}}
**0:32 · Land it. Then pause.**
- "That's EG Wizard for me. Framework upgrades were our dust. Every month, every app. So we built the tool. Now my team spends that time on work that moves us forward."
- "What's your bridge? What's the dusty thing you do every week that you could build a tool for?" Wait three seconds. Let them think.
- Then →: "The model will change."
{{% /note %}}

---

{{< slide class="amber" >}}

<div class="stage">
  <h2 class="t-huge"><span class="line"><span>The model</span></span><span class="line"><span class="d1">will change.</span></span></h2>
  <h2 class="t-huge"><span class="line"><span class="d4"><span class="mark" style="--md:1.2s;">You still decide.</span></span></span></h2>
</div>

{{% note %}}
**0:31 · The punch.** Then →: "Before the four things I want you to take home, one quick fun detour."
{{% /note %}}

{{% /section %}}
