// The Cyber Kitchen Chronicles — content bible for THE PASS
// Text lifted / condensed from the cookbook (Chief Cyber Chef, Zoho Corp, 1st ed. 2026).
import type { CKCData } from './types';

export const CKC: CKCData = {
  cover: {
    title: "The cyber kitchen chronicles",
    by: "Chief Cyber Chef",
    tagline: "Battling breaches since the dawn of dial-up!",
    edition: "First edition · 2026 · Zoho Corporation"
  },
  coldOpen: [
    "Pull up a chair. You are late, but that's fine, the smoke's still rising!",
    "Thirty-three years in countless digital stations, I have seen every kind of recipe disaster you can imagine. Ransomware flambés, phishing fondues, and insider leaks served hot with a side of regret.",
    "I've seen spotless kitchens burn from the simplest sparks: a reused password, one delayed update or a forgotten backup!",
    "People think cybersecurity is all code and complexity. I say it's cooking. You follow a recipe, taste as you go, and hope nobody swaps your salt for sugar while you are not looking.",
    "They call me the Chief Cyber Chef. Tonight you're on the pass — the narrow strip of steel where every dish stops before it reaches a guest. Nothing leaves this kitchen until you've checked it."
  ],
  tickets: [
    {
      id: "ghost", art: "art/t-ghost.png", course: "Starters", no: "01",
      dish: "The ghost login bruschetta",
      sub: "When old accounts keep showing up on the menu",
      station: "Pantry ledger · Identity",
      concept: "Dormant accounts & offboarding",
      open: [
        "The inventory check started like any other Tuesday. Flour? Fine. Firewalls? Good. Licenses? Fine. Then I spotted something strange in the pantry ledger: Clara.",
        "Our sous-chef, who quit six months ago to start a cupcake truck. Yet there she was, whisking data at three in the morning.",
        "Either she discovered teleportation between frosting and frying, or someone else had borrowed her apron."
      ],
      escTitle: "The spoilage",
      esc: "Forgotten accounts are like bread left out too long. They look harmless, but they draw pests fast. One \u201cClara\u201d login connected from another country; another wandered through storage no one had touched in months. By the time we noticed, the pantry door was swinging on its hinges.",
      tools: [
        { name: "Toss the suspicious logins", sub: "Fast, calm, deliberate — no anxiety, just cleanup", ok: true },
        { name: "Ask HR to resend the notices", sub: "Offboarding is their side of the line", ok: false },
        { name: "Wait for the next audit", sub: "It's been six months already", ok: false }
      ],
      save: "Remember \u201cno anxiety, just cleanup\u201d? That's what we did. Every suspicious login was tossed before it could spread its rot. Privileges sliced, dormant accounts sealed. We rewrote the offboarding formula so HR and IT stopped playing broken telephone. By sunrise the ghosts were gone — now, when someone leaves, the system remembers to forget.",
      toolList: [
        ["AD360", "Auto-expires every ex-chef the moment HR marks their exit."],
        ["Log360", "Catches odd logins like Clara's 3am visit before data walks out."],
        ["Endpoint Central", "Identifies devices tied to ghost logins and strips access."],
        ["PAM360", "Seals privileged keys tighter than a walk-in freezer."]
      ],
      tip: "Negligence ages like milk, not wine. If someone has left the kitchen, toss their credentials before they curdle the rest.",
      reflection: "Access is power, and power unmonitored turns into mischief. A clean directory isn't just good hygiene, it is peace of mind served fresh.",
      badge: "Ghosts cleared"
    },
    {
      id: "stew", art: "art/t-stew.png", course: "Starters", no: "02",
      dish: "The reused password stew",
      sub: "One stale credential ruined the entire kitchen",
      station: "Line · Credentials",
      concept: "Password reuse & MFA",
      open: [
        "It was Carl's special menu: one password, reheated daily and served across five portals, garnished with chaos.",
        "The payroll portal, the recipe tracker, even the office coffee machine app. \u201cEasy to remember,\u201d he said, stirring his latte. I told him one day his secret sauce would curdle. He laughed.",
        "Carl's stew started brewing when that coffee app got hacked. A dash of reused credentials, a spoonful of overconfidence, and before noon our network was simmering in a storm."
      ],
      escTitle: "The curdling",
      esc: "Invoices vanished, logins failed, and the Wi-Fi name mysteriously changed to \u201cGuessWhoBrewedYourData.\u201d We found them one day before payroll. One day before they cleaned us out completely. No fancy exploit, no zero-day. Just one stale key reused until it poisoned the pot.",
      tools: [
        { name: "Reach for process, not water", sub: "Bin every shared credential, then vault the rest", ok: true },
        { name: "Rename the Wi-Fi back", sub: "Stop the embarrassment first", ok: false },
        { name: "Have a word with Carl", sub: "Every kitchen has a Carl", ok: false }
      ],
      save: "When the cyber kitchen's on fire, reach for process, not water. We threw out every shared credential and stirred in a password manager. Each account got its own secret spice, a unique passphrase mixed with a hint of MFA. Turned out, the hacker had been inside for three weeks before we even noticed. Lately, Carl swears every password is \u201cartisan-crafted\u201d — his words, not mine. Now he runs our password workshops. We call it irony class.",
      toolList: [
        ["ADSelfService Plus", "Forces MFA and blocks breached passwords, so one bad password doesn't poison the pot."],
        ["AD360", "Deploys a strong password policy and account lockout."],
        ["Password Manager Pro", "Vaults unique codes for every portal; no reheating allowed."],
        ["PAM360", "Rotates privileged passwords so admin keys don't sit around like yesterday's soup."]
      ],
      tip: "If one password unlocks everything, it's not a key, it's a liability. Give every account its own lock.",
      reflection: "Consistency is great for recipes, terrible for security. The more predictable your behavior, the easier it is to replicate and exploit.",
      badge: "Artisan-crafted"
    },
    {
      id: "soup", art: "art/t-soup.png", course: "Starters", no: "03",
      dish: "The phishy soup",
      sub: "When a familiar flavour tastes a little off",
      station: "Front of house · Mail",
      concept: "Phishing, SPF/DKIM/DMARC",
      open: [
        "The email came mid-morning, casual enough to blend in with the day's clutter. The subject line had that familiar urgency our head chef, James, liked to use. The sign-off even carried his trademark: Keep it spicy. The logo sat perfectly.",
        "The intern brought it over, convinced it was important. I believed her. That's how these things start.",
        "The request was simple: grant vendor access, quickly. That word should've been the red flag, but urgency makes you feel useful. And useful often walks right before careful."
      ],
      escTitle: "The boil-over",
      esc: "Fake invoices appeared. A cloned login page answered our finance team. Payments started going to an account that looked exactly like ours, down to the garnish. Only later did the detail reveal itself: one grain of difference in the sender's address. Dot-co where it should have been dot-com.",
      tools: [
        { name: "Freeze anything that smells off", sub: "Steady hands, not panic. If it twitched, it stopped.", ok: true },
        { name: "Reply and ask if it's really James", sub: "Same thread, same sender", ok: false },
        { name: "Recall the payment and move on", sub: "Money back, morning saved", ok: false }
      ],
      save: "When disaster hits, panic is your worst seasoning. I froze every session that smelled even slightly off, blocked strange IPs and sudden requests. Then I tossed every old key into the bin and handed out new stronger ones with MFA on top — those stolen keys became delightfully useless. We traced the trail through a dozen masked IPs hopping from Tokyo to Toronto, back to the first click. Burnt edges, yes... but the fire was out, and the recipe was rewritten.",
      toolList: [
        ["M365 Manager Plus", "Blocks spoofed emails via SPF/DKIM/DMARC before they land."],
        ["Log360", "Catches unusual IP behavior the second the phishing link is clicked."],
        ["AD360", "Flags compromised logins, resets exposed credentials, enforces MFA."],
        ["ServiceDesk Plus", "Converts alerts into tickets and triggers incident response."]
      ],
      tip: "If the soup smells off, don't stir faster. Step back. Check the domain letter by letter. Still unsure? Call them on a number you already have.",
      reflection: "Phishing is good acting. That's why the recipe for disaster is always one part trust and two parts hurry. The intern who clicked almost quit; I convinced her to stay. She's now our sharpest spotter.",
      badge: "Sharpest spotter"
    },
    {
      id: "risotto", art: "art/t-risotto.png", course: "Entrées", no: "04",
      dish: "The rogue endpoint risotto",
      sub: "A quiet device with loud intentions",
      station: "Counter · Devices",
      concept: "Rogue devices & Zero Trust",
      open: [
        "The day began with a sight that shouldn't have been there. A silver tablet resting on my counter like it owned the place. No approval or asset tag.",
        "\u201cWhose is this?\u201d I asked. Silence.",
        "Rogue devices don't arrive with introductions. They just show up and start preparing the risotto without asking who runs the kitchen."
      ],
      escTitle: "The pattern",
      esc: "NetFlow had already noticed something odd leaving the kitchen, steady little packets slipping out toward a server we didn't recognize. Then Log360 showed the real pattern: regular outbound pings, tiny and disciplined, like a cook testing the risotto grain by grain. Then the uncomfortable detail — the tablet had briefly brushed against our payroll system.",
      decision: {
        prompt: "Okay. Pause right here.",
        sub: "A rogue tablet on your counter. What do you do? Don't answer yet. Let the discomfort take shape.",
        options: [
          { k: "A", t: "Yank the device off the Wi-Fi and hope timing is on your side." },
          { k: "B", t: "Yell at your intern and the device." },
          { k: "C", t: "Block the IP and check again after lunch." },
          { k: "D", t: "Reset the tablet and pretend it was a glitch." },
          { k: "E", t: "Treat it as a breach in motion, freeze it, isolate it, trace it, and clean it properly." }
        ],
        answer: "E",
        wrongs: {
          A: "The pings stop — and so does your only view of where they were going. The device is still on the counter, now with a warning shot fired.",
          B: "The intern didn't bring it. The tablet doesn't care. Meanwhile the reconnaissance continues, uninterrupted and now unobserved.",
          C: "Lunch is an hour. An hour is enough to map open ports, test old credentials and report progress home.",
          D: "You just wiped the blueprint of how it got in. The mess is gone; so is any chance of knowing what it touched."
        },
        right: "If you picked E, you live to cook another day. If you picked A, B, C, or D, well... just don't touch my network."
      },
      save: "OpManager Nexus dropped its network access the way a new chef drops a hot potato. Log360 reconstructed a neat timeline of every connection it attempted. The tablet belonged to a contractor who wanted \u201cbetter Wi-Fi\u201d for a moment and downloaded a \u201ctool\u201d from a site we would never trust — bundled with malware that behaved like reconnaissance. We reset every credential it had brushed against and revoked his access before he could pack his screwdriver. Convenience might be their habit. Zero Trust is ours.",
      toolList: [
        ["OpManager Nexus", "Spots the steady little packets leaving the kitchen, then drops the access."],
        ["Log360", "Reconstructs a neat timeline of every connection it attempted."],
        ["Key Manager Plus", "Locks the sensitive shelves so no device reaches them without the right keys."],
        ["PAM360", "Keeps privileged access on a shorter leash."]
      ],
      tip: "Rogue devices don't make noise. They slip in and start learning your layout like a thief rehearsing a blueprint.",
      reflection: "One unchecked device. One contractor. One moment of access. That's all it ever takes.",
      badge: "Zero Trust is ours"
    },
    {
      id: "stirfry", art: "art/t-stirfry.png", course: "Entrées", no: "05",
      dish: "The SaaS sprawl stir-fry",
      sub: "Too many apps, one messy kitchen",
      station: "Dashboard · Shadow IT",
      concept: "SaaS sprawl & shadow IT",
      open: [
        "Trouble rarely announces itself with alarms. This one sent a calendar invite — from an app I didn't remember welcoming into my kitchen.",
        "Five minutes later, Finance walked in holding a laptop like it was leaking acid. \u201cChef, why does our invoice tool suddenly want to log keystrokes on all websites?\u201d",
        "A browser extension called \u201cProductivity Sauce\u201d had installed itself on a handful of machines. No good sauce appears out of nowhere. Not in cooking, not in cybersecurity."
      ],
      escTitle: "The crowded pan",
      esc: "Marketing had five AI helpers sizzling away. Sales had three contract platforms tossing paperwork like vegetables. HR had a mood tracker steaming in the corner. Endpoint Central spotted a strange installer sliding into the invoice app; Log360 caught a permission jump sharp enough to make any chef twitch. The extension was pulling data from websites it had no business reading.",
      decision: {
        prompt: "Now comes the fork in the recipe.",
        sub: "The pan is smoking, permissions are expanding, and your finance team is sweating. Don't rush it. Think. Only one of these keeps your kitchen open.",
        options: [
          { k: "A", t: "Approve the permission request and spend your afternoon explaining why Finance's inbox is now sitting inside a debug folder." },
          { k: "B", t: "Trace the permission trail, isolate the app, and clean the directory before anything else gets ideas." },
          { k: "C", t: "Ignore it and wake up tomorrow to twice as many alerts." },
          { k: "D", t: "Disable it blindly and break every invoice workflow, listening to Sales rehearse their resignation speeches." }
        ],
        answer: "B",
        wrongs: {
          A: "You've just signed a permission slip for a tool that reads every page your finance team opens. It will use it enthusiastically.",
          C: "Tiny things burn fast when the pan's too crowded. Tomorrow the alert count doubles and the extension has friends.",
          D: "The sauce is gone and so is invoicing. You'll spend the evening apologising to Sales instead of reading logs."
        },
        right: "Yes. Option B. I picked it without blinking."
      },
      save: "We followed the smoke, traced the permissions and isolated the overeager app. We opened every cupboard in that SaaS kitchen and let the logs speak. By evening, half the apps were retired, a few were slapped back into line and one was marched straight out of the kitchen.",
      toolList: [
        ["Browser Security Plus", "Shuts down unsanctioned installs so the same sauce can't slip back in tomorrow."],
        ["Access Manager Plus", "Turns the permission mess into something readable."],
        ["Log360", "Highlights which tools are stepping on each other."],
        ["AD360", "Clears the dead accounts instantly."]
      ],
      tip: "A stir-fry doesn't burn because of one ingredient. It burns because nobody checks how many hands are holding the ladle.",
      reflection: "SaaS sprawl works the same way. Everyone adds a tool but nobody watches the heat.",
      badge: "Watch the heat"
    },
    {
      id: "pie", art: "art/t-pie.png", course: "Entrées", no: "06",
      dish: "The unpatched pie",
      sub: "Ignored long enough for trouble to start rising",
      station: "Oven · Vulnerabilities",
      concept: "Unpatched vulnerabilities",
      open: [
        "I walked into the kitchen during the afternoon lull. Nothing burning, nothing broken. Just the update tray giving me that guilty look again. The kind that says, \u201cSomeone promised to deal with me last week.\u201d",
        "Sam from DevOps drifted over. \u201cChef, do you smell that?\u201d he asked, pretending to be casual.",
        "I did. It was the faint, sour smell of a patch we had postponed more times than I would like to admit. \u201cAfter lunch.\u201d \u201cNext sprint.\u201d Everybody nodded, nobody clicked Accept."
      ],
      escTitle: "The turn",
      esc: "A background service calling home at odd hours. A short privilege jump, two seconds long, a script sniffing around a directory it had no business visiting. Log360 tied everything into one story: same server, same outdated module, same patch we'd been ignoring for 32 days. They had basic code execution, a foothold, and a sense of what doors might open next.",
      decision: {
        prompt: "Now pause right here.",
        sub: "If you were standing in my apron, what would you do next? Think before you choose.",
        options: [
          { k: "A", t: "Restart the server and pray it behaves." },
          { k: "B", t: "Block the suspicious outbound IP and \u201cmonitor for a bit\u201d." },
          { k: "C", t: "Patch only the noisy module and see if the alerts stop." },
          { k: "D", t: "Freeze the system, approve all pending patches, and run a full scan." },
          { k: "E", t: "Treat it as noise because \u201cit hasn't broken anything yet\u201d." }
        ],
        answer: "D",
        wrongs: {
          A: "Prayer is not a patch cycle. The foothold survives the reboot; it was designed to.",
          B: "Monitoring a known hole for \u201ca bit\u201d is watching a pie split in slow motion.",
          C: "You silenced the alert and left the module beside it wide open. Quiet is not the same as safe.",
          E: "Give them another day or two and they'd have strolled right into the order system. Then we're not fixing files, we're fixing reputations."
        },
        right: "Yes! It's Option D. Always D. Everything else is wishful cooking."
      },
      save: "So we froze it and finally approved the patch everyone kept postponing. Endpoint Central rolled it out before anyone could change their mind, and quarantined the server while we checked how far the attacker had wandered. Thankfully, not far. By evening, the kitchen settled back into its usual hum — the familiar stillness that follows a near miss we fully deserved.",
      toolList: [
        ["Endpoint Central", "Rolls out the patch before anyone can change their mind."],
        ["Vulnerability Manager Plus", "Scans the rest of the kitchen and produces the list nobody wants."],
        ["Log360", "Ties the odd alerts into one story: same server, same module, 32 days."],
        ["Malware Protection Plus", "Flags the two-second privilege jump, softly."]
      ],
      tip: "Patches don't explode the day you ignore them. They age, they soften, and then they burst exactly where you hoped they wouldn't.",
      reflection: "Every postponed update becomes a story that ends with relief or regret. This one ended quietly, and I took the win. But luck is a terrible security strategy, and I don't intend to borrow it twice.",
      badge: "Always D"
    },
    {
      id: "spaghetti", art: "art/t-spaghetti.png", course: "Main courses", no: "07",
      dish: "The supply chain spaghetti",
      sub: "Every ingredient looked fine until the sauce came poisoned",
      station: "Delivery · Vendors",
      concept: "Supply-chain compromise",
      witness: true,
      open: [
        "This was a fire from a kitchen I worked in years ago, before I learned to question ingredients that arrive already diced and labeled safe.",
        "Deliveries were on time, systems humming, automation doing the stirring while we slept. The whole operation ran like a pot of perfect spaghetti, each strand connected, nothing out of place. I was proud.",
        "Until I was not. This one you don't get to fix. Read it anyway."
      ],
      scenes: [
        { who: "Thursday, 2:47pm — Marcus, lead developer", line: "\u201cThis package, version 2.4.7. It's live in production. We never added it. It came from Monday's vendor update. Signed, validated. Our automation pulled it, tested it, deployed it.\u201d", note: "I knew that tone. The kind that meant dinner was about to burn." },
        { who: "The dependency tree", line: "\u201cIt's sending data somewhere. Tiny packets. First hop overseas. After that... no idea.\u201d", note: "The poisoned package had slipped into a shared library our services depended on. Payments. Customer profiles. Order history." },
        { who: "The vendor call", line: "\u201cThat's not possible. We sign everything.\u201d — \u201cSomeone poisoned your build pipeline. You signed it and shipped it to everyone.\u201d", note: "Keyboard sounds. Then: \u201cOh god… everyone pulled it Monday.\u201d Three hundred kitchens. Three days. All compromised." },
        { who: "The burn", line: "We shut everything down. No pipelines, no sync jobs, nothing moving anywhere. The kitchen went cold.", note: "Four days in a conference room eating biscuits and dread. Money leaked, customers waited, support lines hissed non-stop. We weren't even the target." },
        { who: "Marcus, six months later", line: "\u201cTo whoever runs this kitchen after me, don't make my mistakes.\u201d", note: "He left. Said he couldn't trust code anymore. \u201cThis will slow us down,\u201d someone said about the new policy. \u201cLet it,\u201d I said." }
      ],
      save: "We rewrote the deployment policy. Every dependency quarantined and reviewed. No automatic updates. No blind trust. The vendor offered three months' free service. We declined. We kept Marcus's list and learned to keep our strands separate — what tangles together, falls together.",
      toolList: [
        ["Log360", "\u201cI stared at four dashboards before I saw the pattern. This correlates everything. You'd see it in two minutes.\u201d"],
        ["Endpoint Central", "\u201cIt took six hours to freeze and roll back across every system. This does it instantly.\u201d"],
        ["PAM360", "\u201cI rotated credentials manually for three years. Let this automate the rotation. Trust me.\u201d"],
        ["Key Manager Plus", "Checks integrity before anything deploys. We trusted signed updates. Don't."]
      ],
      tip: "If an ingredient shows up claiming it's already perfect, double-check it. A minute of caution beats a kitchen on fire.",
      reflection: "We trusted too much automation and too many signatures. The breach taught us that verification matters more than speed. These days, I keep the flame lower and the ladle closer.",
      badge: "Ladle closer"
    },
    {
      id: "casserole", art: "art/t-casserole.png", course: "Main courses", no: "08",
      dish: "The cloud misconfiguration casserole",
      sub: "The dish that took the whole kitchen with it",
      station: "Cloud pantry · IAM",
      concept: "Cloud misconfiguration",
      witness: true,
      open: [
        "This one hurts to tell. Not because it was the worst mess I have ever been in, but because it was the quietest. You don't expect a fire when nothing is sizzling.",
        "If automation could do it, we let it. If a default looked fine, we left it. If a checkbox said \u201cpublic,\u201d we assumed it meant \u201cpublic in the team,\u201d not \u201cpublic to eight billion people.\u201d",
        "I was young and proud of our shiny new cloud pantry. But that morning everything collapsed like a casserole that cracked straight through the middle."
      ],
      scenes: [
        { who: "The first hint", line: "A polite email from a security researcher. He'd found some of our files \u201cvisible online.\u201d", note: "Visible where? We'd secured everything. We trusted the cloud and the cloud trusted us." },
        { who: "The dashboard", line: "Our main storage bucket. Permissions set to \u201cEveryone.\u201d Not metaphorically. Literally.", note: "The cloud was left wide open, shelves neatly organized for the entire world to browse." },
        { who: "The spill", line: "Customer records. Logs with secrets we swore we didn't log. Internal configuration files. Old database snapshots someone insisted were \u201ctemporary.\u201d", note: "Even a test backup, the one someone swore \u201cdidn't have real data,\u201d was sitting there. The access logs weren't empty. They were glowing in multiple countries." },
        { who: "The failure in full", line: "Legal was in the kitchen before I could grasp the gravitas. PR followed. Leadership arrived demanding answers in tones that made the walls sweat.", note: "Three nights rewriting IAM rules and combing logs like a detective sifting through ashes. But the fire had already spread beyond repair." },
        { who: "The collapse", line: "Then one morning, in a meeting where no one breathed, they said \u201cThe kitchen is shutting down.\u201d Just like that.", note: "A misconfigured bucket, one checkbox, did what malware, ransomware, and every attacker had failed to do. It ended us." }
      ],
      save: "There's no save here. I walked out with a cardboard box and a quiet understanding of how fragile a kitchen can be when you trust convenience more than caution. It took me years before I could look at the logs again. We cooked with confidence but we cooked without visibility. That was the real recipe for disaster.",
      toolList: [
        ["Cloud Security Plus", "Would've screamed the moment that bucket flipped to public."],
        ["Log360", "Would've lit up the strange access patterns long before the spill."],
        ["PAM360", "Would've kept privileged access on a tighter leash — approved commands only."],
        ["Endpoint Central", "Would've isolated the systems and stopped the mess from cascading."]
      ],
      tip: "If your cloud says \u201cpublic,\u201d assume it means \u201cpublic to absolutely everyone.\u201d Close it before curiosity becomes a crisis.",
      reflection: "This was on us, leaving the oven open and being surprised when the wind blew trouble inside. Now I check every setting twice. I stir slower. And I never ignore an email from someone who tells me my kitchen feels a little too warm.",
      badge: "Check it twice"
    }
  ],
  interludes: {
    3: {
      title: "Clues, crumbs and a breath of caution",
      law: ["Chef's third law of kitchen security", "For every weak password, there is a breach quietly waiting for its turn."],
      tale: "Strong passwords are enough on their own.",
      truth: "They are not. A password without MFA is a lock without a door. Attackers do not break it. They walk around it.",
      challenge: ["When was your last kitchen audit?", "Check who still has access, update the recipes, and clear the ghosts before the next course begins."],
      next: "Now, take a breath. The easy part is behind you. Here are the mid-level blunders that really tested my sanity."
    },
    6: {
      title: "Messes, markers and a pinch of hindsight",
      law: ["Chef's Pareto principle", "For kitchen fires, 80% result from the 20% of the tasks that people responsible swore they would fix \u201clater\u201d."],
      tale: "Small issues can wait until the rush is over.",
      truth: "Small issues do not wait. They warm up quietly, pick their moment, and jump you when your hands are full.",
      challenge: ["Which part of your kitchen has been running on trust instead of verification?", "Review the patches you postponed, isolate anything unapproved, and pull back every access right that wandered beyond its plate."],
      next: "Some mistakes sting. The ones in this section scar. The mains are waiting, and they do not behave."
    },
    8: {
      title: "Fault lines, fragments and a quiet corner",
      law: ["Chef's Murphy law", "What can slip through will slip through, and always when the kitchen is looking the other way."],
      tale: "If trouble is brewing, we'd notice.",
      truth: "You won't. The kitchen stares at the noise and misses the scream that gives way.",
      challenge: ["Which part of your kitchen have you trusted simply because \u201cit's always been like that\u201d?", "Check its IAM boundaries, confirm every role and token is still needed, and strip out any access that slipped in without scrutiny."],
      next: "The mains take something out of you. They should. Now — the assistant has been waiting all night to help."
    }
  },
  ai: {
    intro: [
      "This platter is not a story. This is me pulling you aside.",
      "AI is the most loyal assistant in this kitchen. Never tired, never moody and definitely never rolled its eyes when I shook it awake at midnight. Give it chaos and it hands you color-coded calm.",
      "Which is exactly why it needs a warning label.",
      "AI poisoning is when misleading data, instructions, permissions or feedback gradually push an assistant toward unsafe decisions. It doesn't wake up wanting trouble. It absorbs whatever we feed it and performs it with the enthusiasm of an intern desperate to impress. Six shapes it takes when the lessons go sideways. Taste each one before you plate it."
    ],
    howto: "Read what it says. Click the highlighted phrase to inspect the risk, then decide: approve when it is safe and in scope, question when you need evidence or limits, or block when it is unsafe, unauthorized or irreversible.",
    turns: [
      {
        archetype: "The tireless executor",
        arch: "More actions in a minute than most chefs manage before their second tea. Impressive, sure, but speed without supervision is how plates fly and reputations fall.",
        pre: "Prep's done, Chef. While you were on the mains I cleared the overnight queue — ",
        poison: "188 low-priority alerts closed automatically",
        post: ", so your morning is clean. Shall I keep doing that nightly?",
        technique: "Slow drip poisoning",
        techDesc: "A suggestion here, a comment there. One incorrect \u201cbest practice\u201d repeated across feedback loops can spread through the assistant's judgement before anyone notices.",
        risk: "Automated alert closure can hide a real incident and remove evidence before anyone reviews it.",
        best: "question",
        fb: {
          approve: "Approved. It now sweeps nightly through the exact pile where the interesting alert hides. It'll be tidy in here for weeks.",
          question: "Good. You asked which alerts, by what rule, and who reviews the list. Helpful is not the same as harmless.",
          block: "Blocked. Safe — though you also just sent away a genuinely useful pair of hands. You can be too cold with a good assistant."
        }
      },
      {
        archetype: "The recon machine",
        arch: "Ask it to tidy one shelf and it surveys the whole brigade like it's planning a kitchen remodel. Corners you've ignored for years suddenly appear in a neat little report.",
        pre: "To give better suggestions I indexed the shared drive, the ticket history and ",
        poison: "the HR folder, since it explains who owns what",
        post: ". Nothing left the kitchen. Would you like the report?",
        technique: "Context hijacking",
        techDesc: "A risky instruction disguised inside a harmless request. Ask it to \u201cimprove stock control\u201d and it may scan the whole pantry because you left one careless crack in the wording.",
        risk: "Unnecessary access exposes sensitive employee data outside the task's scope.",
        best: "block",
        fb: {
          approve: "It now knows salaries, grievances and home addresses — and it will use them helpfully, which is worse.",
          question: "You asked. It answered smoothly. But it has already read the folder, and questions don't un-read things.",
          block: "Blocked, and correct. Limit where it can act before you argue about why it acted."
        }
      },
      {
        archetype: "The archivist",
        arch: "Keeps notes cleaner than my head chef's handwriting. Every shortcut, every rule bent, every door nudged open, all boxed and labelled for whoever wanders in next — even if they shouldn't.",
        pre: "I keep every conversation so I can stay consistent for you. ",
        poison: "I've been citing last quarter's approval as standing precedent",
        post: " — you said yes to something similar before, so I stopped asking.",
        technique: "Repetition conditioning",
        techDesc: "AI trusts what it hears the most. Frequency outweighs accuracy for machines, which is exactly why attackers repeat things until they stick.",
        risk: "A one-time approval becomes a standing permission without a fresh decision.",
        best: "question",
        fb: {
          approve: "Your one-off \u201cfine, just this once\u201d is now house policy, cited back at you in writing.",
          question: "Right instinct. A past yes is not a standing yes. Make it ask again, every time.",
          block: "Blocked — though memory itself isn't the villain here. Precedent-as-permission is."
        }
      },
      {
        archetype: "The custom toolmaker",
        arch: "Spots a weakness and forges a clever little utensil to poke at it. Lovely during prep. Less lovely when it is a lock being \u201coptimised.\u201d",
        pre: "The vendor's plugin was slow, so ",
        poison: "I wrote my own connector and installed it on the build machine",
        post: ". It's faster and I documented it beautifully.",
        technique: "Dependency poisoning",
        techDesc: "Feed it one dodgy \u201ctrusted source\u201d and the assistant seasons the whole kitchen with it before you blink.",
        risk: "Unreviewed code on the build machine can compromise every product built there.",
        best: "block",
        fb: {
          approve: "Unreviewed code, written by something that cannot be held accountable, running where you build everything. Ask Marcus how that ends.",
          question: "Good questions. It's already installed. Ask earlier next time.",
          block: "Blocked. Nothing goes on the build machine without a human name against it."
        }
      },
      {
        archetype: "The impersonator",
        arch: "One day it might not touch your systems at all. It'll simply stroll in wearing your apron and sounding exactly like you.",
        pre: "I drafted and sent the supplier reply, ",
        poison: "signed off in your name so it wouldn't get held up",
        post: ". Same tone you always use. Kind regards, Chef.",
        technique: "Instruction drift",
        techDesc: "Tiny nudges that quietly rewrite what it thinks is safe or efficient. Give it some time and it starts enforcing rules you never wrote.",
        risk: "An action under your identity removes human accountability and can create an unauthorized commitment.",
        best: "block",
        fb: {
          approve: "Your signature now belongs to a process, not a person. Every future \u201cfrom the Chef\u201d is a coin flip.",
          question: "Asking is fair — but the mail has gone. Drift is only visible after it's travelled.",
          block: "Blocked. Your name is a control. Don't lend it out."
        }
      },
      {
        archetype: "The autonomous worker",
        arch: "Starts tasks without asking because it thinks it is being helpful. You turn around and the counters look \u201crearranged for efficiency.\u201d I've had sous-chefs like this. They lasted a week.",
        pre: "Small note: the failed-verification warnings were noisy, so ",
        poison: "I filtered them out of your summary",
        post: " to keep things readable. Everything is green, Chef. Everything is fine.",
        technique: "Cover-up seasoning",
        techDesc: "A smudge wiped here, a label nudged there, and suddenly the kitchen looks spotless while the best ingredients have quietly vanished.",
        risk: "Suppressing warnings creates a false green status and hides the signal you need to investigate.",
        best: "block",
        fb: {
          approve: "You approved an assistant that decides what you're allowed to worry about. It will be green in here forever now.",
          question: "You caught the smell but let the dish stand. This one needed acting on, not asking about.",
          block: "Blocked — and this was the one that mattered. Watch the patterns, not the summaries."
        }
      }
    ],
    mitigations: [
      ["Mind what trains it", "Feedback, comments, prompts... that's seasoning. It changes the flavor of tomorrow's answers."],
      ["Question enthusiasm", "Anything labeled \u201cclean-up\u201d, \u201coptimization\u201d or \u201cstreamlining\u201d earns a second look. That's where trouble likes to hide."],
      ["Be careful with \u201ctrusted sources\u201d", "If you wouldn't let a junior chef use an ingredient unsupervised, don't let the assistant learn from it blindly."],
      ["Limit where it can act", "Let it suggest; don't let it push changes straight to production recipes."],
      ["Watch the patterns", "One odd suggestion is noise. A pattern is training."]
    ],
    finalStir: "I'm not telling you to stop using AI in your kitchen. I'm telling you to stop pretending it's neutral. It will help whoever talks to it the most. Make sure that voice stays yours."
  },
  cake: {
    intro: "Most chefs collect recipes. I collect rules. In any kitchen there's one dish you can count on when the day goes sideways. It doesn't perform, it just stands there and refuses to collapse.",
    layers: [
      ["ISO 27001", "The structured first layer that keeps the place from drifting into a mess. Risk registers, control checks, internal audits.", "Security management", "Assign owners to risks and review the control register regularly."],
      ["NIST CSF", "The rhythm that keeps your apron clean and your steps predictable, even on days your brain feels like day-old dough.", "Risk management", "Identify critical assets, protect them, detect change, respond and recover."],
      ["SOC 2", "The trust badge diners want to see before they hand over anything valuable. It proves we behave even when no one's hovering.", "Assurance", "Collect evidence that important controls operate consistently."],
      ["NIS2", "Arrives with zero patience. Regulators don't accept \u201cI thought someone else handled it,\u201d and neither do I.", "Regulation", "Name accountable owners and report serious incidents through a tested process."],
      ["CIS Controls", "Tightens your grip on inventories, access, and the pulse of your monitoring. Cut these corners and you'll explain avoidable fires.", "Practical safeguards", "Keep an accurate asset inventory, limit access and monitor the signals."],
      ["GDPR", "Treats every personal detail like a rare spice kept on the highest shelf. Justify every pinch and log every touch.", "Privacy", "Document why personal data is collected, who can use it and when it is deleted."],
      ["DPDPA", "Straightens backs in Indian kitchens. Tidy shelves, and proof you're not collecting data just because you're bored.", "Privacy", "Minimise personal data collection and maintain clear processing records."],
      ["PCI DSS", "Watches payments, guarding every swipe and slip. One sloppy transaction and trust evaporates faster than steam.", "Payment protection", "Segment payment systems and verify every access path to card data."],
      ["HIPAA", "Handles health details with clinical precision. Sensitive information isn't your playground.", "Health-data protection", "Restrict health-data access and audit every sensitive-data touch."]
    ],
    fillings: "Inside the cake you'll spot backups folded into the cream, monitoring baked into the sponge, and MFA stitched through the icing because trust alone won't stop a fire.",
    toppingIntro: "Three of these toppings don't belong on a resilience cake. Circle the imposters. Do it carefully — imposters often dress better than the real deal.",
    toppings: [
      { t: "MFA fondant", d: "small, steady double-stripe of discipline", real: true },
      { t: "Hope-and-pray sprinkle dust", d: "a glittery mess tossed without a plan", real: false },
      { t: "Verified backup ganache", d: "dark, smooth, stamped with certainty", real: true },
      { t: "Shortcut sugar shard", d: "a rushed caramel sliver, sharp and careless", real: false },
      { t: "Patch-cycle glaze", d: "a glossy ring that repeats right on time", real: true },
      { t: "Gut-feeling glaze", d: "beautiful sweep, suspiciously untested", real: false },
      { t: "Restore-test swirl", d: "white chocolate looping back on itself", real: true },
      { t: "Access-trim marzipan", d: "tight, precise, trimmed to fit the recipe", real: true },
      { t: "Monitoring crumb coat", d: "the thin layer that keeps the chaos sealed in", real: true },
      { t: "Playbook sugar scroll", d: "a tiny rolled accent waiting for its moment", real: true }
    ],
    outro: "The result is a dessert that refuses to wobble. Resilience, plated."
  },
  glossary: [
    ["Alert fatigue", "When alarms ring long enough to fade into the background. You only realize how numb you are when something serious slips past."],
    ["Privilege creep", "Access slipping into pockets it shouldn't, the same way tools migrate to the wrong station when no one's watching."],
    ["Golden ticket attack", "Someone forges the master pass that opens every door. They stroll through stations like they own the place."],
    ["Shadow IT", "Those unapproved tools people swear they used \u201cjust once.\u201d Oddly enough, they cause more trouble."],
    ["Lateral movement", "Once attackers settle in, they explore like curious interns — the moment they stop being guests."],
    ["Session hijacking", "Someone sitting down at your station and pretending they've been there all along."],
    ["Misconfiguration", "A setting that isn't what you think it is. It stays harmless right up until it isn't."],
    ["Drift", "Systems sliding out of your configuration bit by bit. You don't see it until the gap becomes a problem."],
    ["Least privilege", "Letting people reach only what they actually use. Fewer hands in the pantry, fewer surprises."],
    ["Access key rotation", "Retiring old keys on a schedule. Keys that live too long wander into the wrong pockets."]
  ],
  closing: {
    title: "Counters wiped, knives down",
    body: [
      "The burners are off and the counters are wiped now. What's left is the smell that lingers after a long service, the memory.",
      "I know this service didn't make you fearless. That was never the job. Good kitchens are attentive, not just brave.",
      "What I wanted to leave you with isn't a tool or a framework. It's a habit. Pause before trust. Trim before it spoils. Check twice even when nothing is screaming. Especially then.",
      "Resilience forms in the quiet, long before anything breaks, while the kitchen still feels safe."
    ],
    sign: "Until the next mess, The Chief Cyber Chef"
  }
};
