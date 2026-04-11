import type { BehaviorAnalysis } from '~/types/meeting';

/**
 * Demo context prompt for the Trump–Zelensky Oval Office confrontation.
 * Speaker A = President Zelensky
 * Speaker B = Vice President Vance
 * Speaker C = President Trump
 * Speaker D = Reporter
 * Speaker E = Press Handler
 */
export const trumpContext =
  "The infamous February 2025 Oval Office confrontation between President Trump (Speaker C) and Ukrainian President Zelensky (Speaker A), with Vice President Vance (Speaker B) acting as enforcer. Trump is factually wrong on nearly everything he claims — Ukraine did not start the war, Zelensky did not refuse to negotiate, and the US minerals deal was a concrete offer. This is not a meeting of two equally good-faith parties. Trump is bullying a wartime leader whose country is under active Russian invasion, using debunked talking points. Zelensky is desperately trying to maintain diplomatic composure while being publicly humiliated by his most important ally. The power dynamic is wildly asymmetric — Trump holds the aid Ukraine needs to survive and uses that leverage to browbeat Zelensky on camera.";

/**
 * Pre-generated behavioral labels for the Trump–Zelensky confrontation.
 * Enriched from gpt-4o-mini analysis with detailed labeling of key moments.
 */
export const trumpLabels: BehaviorAnalysis = {
  context: trumpContext,
  labels: [
    {
      segmentIndex: 0,
      label: 'setting the record',
      category: 'assertive',
      detail:
        'Zelensky opens by stating facts about Russian ceasefire violations and prisoner exchange failures. This is not accusatory — it is a factual accounting of broken agreements. He is trying to establish the reality of the situation before diplomacy begins.'
    },
    {
      segmentIndex: 4,
      label: 'dismissive reframe',
      category: 'destructive',
      detail:
        '"The kind of diplomacy that\'s going to end the destruction of your country" — Vance ignores every fact Zelensky just raised and reframes the conversation as if Zelensky is the obstacle to peace. This is a classic power move: don\'t engage with the substance, change the subject.',
      deception:
        'Implies Zelensky is prolonging the war by raising legitimate grievances about Russian ceasefire violations'
    },
    {
      segmentIndex: 11,
      label: 'public shaming',
      category: 'destructive',
      detail:
        '"I think it\'s disrespectful for you to come into the Oval Office and try to litigate this in front of the American media." Vance frames Zelensky\'s factual statements as disrespect. This is textbook DARVO — the aggressor (who is publicly humiliating a guest) accuses the victim of being disrespectful.',
      deception:
        'Reverses the dynamic — Vance is the one being disrespectful by ambushing an invited ally on camera, but frames it as Zelensky\'s fault'
    },
    {
      segmentIndex: 12,
      label: 'false equivalence',
      category: 'destructive',
      detail:
        '"You guys are going around and forcing conscripts to the front lines because you have manpower problems." Vance frames wartime conscription (which every country at war uses, including the US in WWII) as evidence of Ukrainian dysfunction. This is a Russian talking point, not a legitimate criticism.',
      deception:
        'Presents normal wartime mobilization as something shameful to weaken Zelensky\'s moral standing'
    },
    {
      segmentIndex: 13,
      label: 'demanding gratitude',
      category: 'destructive',
      detail:
        '"You should be thanking the President." The demand for gratitude from the leader of an invaded country is a dominance display. It reframes US military aid — given in America\'s strategic interest — as a personal favor that requires public submission.',
      deception:
        'Frames geopolitical alliance as personal charity, requiring the recipient to perform gratitude'
    },
    {
      segmentIndex: 14,
      label: 'dignified pushback',
      category: 'assertive',
      detail:
        '"Have you ever been to Ukraine?" — Zelensky doesn\'t yell, doesn\'t insult. He asks a simple question that exposes the gap between Vance\'s confident lecturing and his actual knowledge of the situation on the ground.'
    },
    {
      segmentIndex: 19,
      label: 'propaganda accusation',
      category: 'destructive',
      detail:
        '"You bring them on a propaganda tour" — Vance dismisses any firsthand knowledge of Ukraine as propaganda. This pre-emptively discredits all evidence, including from US officials and journalists who have visited. It\'s a closed epistemological loop.',
      deception:
        'Allows Vance to reject any evidence without engaging with it — if seeing is propaganda, nothing can prove him wrong'
    },
    {
      segmentIndex: 29,
      label: 'theatrical framing',
      category: 'destructive',
      detail:
        '"Attack the administration that is trying to prevent the destruction of your country?" — Vance reframes factual disagreement as an attack on America itself. This is a rhetorical escalation designed to make Zelensky\'s position indefensible.',
      deception:
        'Conflates criticism of policy with ingratitude toward the nation, making it impossible for Zelensky to disagree without appearing anti-American'
    },
    {
      segmentIndex: 34,
      label: 'composure under fire',
      category: 'constructive',
      detail:
        '"During the war everybody has problems, even you, but you have nice ocean and don\'t feel now, but you will feel it in the future." Zelensky maintains remarkable composure. Despite being publicly humiliated, he doesn\'t retreat — he calmly points out that America\'s geographic safety is not permanent.'
    },
    {
      segmentIndex: 45,
      label: 'bullying escalation',
      category: 'destructive',
      detail:
        '"Don\'t tell us what we\'re gonna feel. We\'re trying to solve a problem." Trump interrupts Zelensky\'s answer to shut down his point about future consequences. The phrase "we\'re trying to solve a problem" implies Zelensky is the problem.',
      deception:
        'Frames the victim of an invasion as the obstacle to peace'
    },
    {
      segmentIndex: 75,
      label: 'power assertion',
      category: 'destructive',
      detail:
        '"You\'re right now not in a very good position." Trump states the power imbalance explicitly — not to acknowledge it, but to weaponize it. This is the language of a bully reminding someone smaller that they can\'t fight back.'
    },
    {
      segmentIndex: 88,
      label: 'poker metaphor as threat',
      category: 'destructive',
      detail:
        '"You don\'t have the cards right now." Trump reduces a genocidal invasion to a card game. The metaphor strips away the human dimension — the dead, the displaced, the tortured — and turns it into a transaction where only leverage matters.',
      deception:
        'The card game framing normalizes the idea that a country\'s survival is a negotiating chip rather than a moral imperative'
    },
    {
      segmentIndex: 92,
      label: 'cutting through rhetoric',
      category: 'assertive',
      detail:
        '"What playing cards?" — Zelensky refuses to accept Trump\'s poker metaphor for his country\'s survival. This is a dignified moment of pushback: I\'m not playing a game, my people are dying.'
    },
    {
      segmentIndex: 113,
      label: 'blame reversal',
      category: 'destructive',
      detail:
        '"You\'re gambling with World War III." Trump accuses the invaded country of risking world war — not the country that actually invaded. This is a direct inversion of cause and effect.',
      deception:
        'Blames the victim for the consequences of the aggressor\'s actions'
    },
    {
      segmentIndex: 129,
      label: 'loyalty test',
      category: 'destructive',
      detail:
        '"Have you said thank you once this entire meeting?" Trump demands performative gratitude from a wartime leader in the middle of being publicly bullied. The point isn\'t whether Zelensky is grateful — it\'s whether he\'ll submit on camera.'
    },
    {
      segmentIndex: 141,
      label: 'veiled threat',
      category: 'destructive',
      detail:
        '"You went to Pennsylvania and campaigned for the opposition in October." Trump brings up a domestic political grievance to signal that aid to Ukraine is conditional on personal loyalty to Trump, not US strategic interests.',
      deception:
        'Conflates US foreign policy with personal political loyalty — aid depends on Trump\'s feelings, not national interest'
    },
    {
      segmentIndex: 142,
      label: 'gaslighting demand',
      category: 'destructive',
      detail:
        '"Offer some words of appreciation for the United States of America and the president who\'s trying to save your country." Demands a public statement of gratitude in the middle of being humiliated. "The president who\'s trying to save your country" is self-aggrandizing and factually misleading — Trump had been delaying aid and undermining NATO.',
      deception:
        'Reframes delayed, conditional, and politically weaponized aid as selfless heroism'
    },
    {
      segmentIndex: 146,
      label: 'silencing tactic',
      category: 'destructive',
      detail:
        '"He\'s not speaking loudly. Your country is in big trouble." Trump dismisses Zelensky\'s objection and immediately reasserts dominance by reminding him of Ukraine\'s vulnerability. The subtext: you can\'t afford to disagree with me.'
    },
    {
      segmentIndex: 154,
      label: 'shutting down speech',
      category: 'destructive',
      detail:
        '"You\'ve done a lot of talking." Trump literally tells the president of an invaded country that he has talked too much. This is not a conversation — it\'s a performance of dominance where only one side gets to speak.'
    },
    {
      segmentIndex: 171,
      label: 'standing ground with dignity',
      category: 'constructive',
      detail:
        '"We are staying in our country, staying strong from the very beginning of the war, we\'ve been alone and we are thankful." Zelensky finally gets a full sentence out and uses it to affirm Ukrainian resilience while acknowledging American support. Masterful — he gives the gratitude without surrendering his dignity.'
    },
    {
      segmentIndex: 187,
      label: 'inflated leverage',
      category: 'destructive',
      detail:
        '"Three hundred and fifty billion dollars." Trump cites a massive figure to make the aid seem like a personal gift. The actual number is disputed, much of it was equipment transfers valued at replacement cost, and it served American strategic interests.',
      deception:
        'Inflates the figure and presents strategic military aid as personal generosity'
    },
    {
      segmentIndex: 216,
      label: 'counterfactual threat',
      category: 'destructive',
      detail:
        '"This war would have been over in two weeks." Trump implies Ukraine should have fallen quickly, as if that would have been acceptable. The subtext is that Ukraine\'s survival is an inconvenience — they should have lost faster.'
    },
    {
      segmentIndex: 246,
      label: 'dominance repetition',
      category: 'destructive',
      detail:
        '"You have to be thankful. You don\'t have the cards." Both phrases repeated throughout the meeting like a mantra. This is not argument — it\'s conditioning. Repeat the power dynamic until the other person internalizes it.'
    },
    {
      segmentIndex: 260,
      label: 'strawman attack',
      category: 'destructive',
      detail:
        '"I don\'t want a ceasefire. I don\'t want a ceasefire." Trump puts words in Zelensky\'s mouth. Zelensky never said he doesn\'t want a ceasefire — he said he wants one with security guarantees. The difference is everything.',
      deception:
        'Misrepresents Zelensky\'s position to make him look like the obstacle to peace'
    },
    {
      segmentIndex: 268,
      label: 'patient correction',
      category: 'constructive',
      detail:
        '"Of course, we want to stop the war." Zelensky calmly corrects the strawman. He doesn\'t raise his voice. He doesn\'t match the aggression. He simply states the obvious truth that Trump is distorting.'
    },
    {
      segmentIndex: 294,
      label: 'Biden deflection',
      category: 'evasive',
      detail:
        '"That was with a guy named Biden who is not a smart person." When challenged on ceasefire failures, Trump deflects to Biden. This is a pattern — any inconvenient fact is someone else\'s fault.',
      deception:
        'Avoids accountability for current policy by blaming predecessors'
    },
    {
      segmentIndex: 303,
      label: 'personal credit-taking',
      category: 'assertive',
      detail:
        '"That was with Obama who gave you sheets and I gave you javelins." Trump takes personal credit for a bipartisan decision approved by Congress. The "sheets vs javelins" line is a rehearsed talking point designed to make him look uniquely supportive.'
    },
    {
      segmentIndex: 334,
      label: 'Putin sympathy',
      category: 'destructive',
      detail:
        '"Putin went through a hell of a lot with me." Trump expresses sympathy for Putin — the man who invaded Ukraine — in front of Zelensky. This is extraordinary: he\'s empathizing with the aggressor while berating the victim.',
      deception:
        'Frames Putin as a fellow victim of "Democrat scams" while Putin\'s army commits documented war crimes in Ukraine'
    },
    {
      segmentIndex: 340,
      label: 'conspiracy tangent',
      category: 'evasive',
      detail:
        '"It was a Democrat scam." Trump derails the most important diplomatic meeting of the year into a rant about Hunter Biden\'s laptop. The connection to Ukraine policy is nonexistent — this is narcissistic tangent masquerading as geopolitical analysis.'
    },
    {
      segmentIndex: 360,
      label: 'contradictory trust',
      category: 'evasive',
      detail:
        '"He didn\'t break them with me." Trump says Putin kept promises to him while breaking them with everyone else. This is not evidence of diplomatic skill — it\'s evidence that Trump believes personal flattery over documented behavior.',
      deception:
        'Claims special relationship with Putin as proof of deal-making ability while ignoring that Putin\'s concessions to Trump were strategic manipulation'
    },
    {
      segmentIndex: 363,
      label: 'patronizing ownership',
      category: 'destructive',
      detail:
        '"I\'ve empowered you to be a tough guy." Trump takes credit for Zelensky\'s resistance to a full-scale invasion. Zelensky\'s toughness comes from defending his country against genocide, not from Trump\'s permission.',
      deception:
        'Claims ownership of another leader\'s courage and resilience as if it were a gift he gave'
    },
    {
      segmentIndex: 365,
      label: 'ultimatum',
      category: 'destructive',
      detail:
        '"You\'re either going to make a deal or we\'re out." The final threat. Trump reduces the entire relationship — lives, sovereignty, international law — to a binary: submit or be abandoned. This is not negotiation. This is coercion.'
    },
    {
      segmentIndex: 377,
      label: 'entertainment framing',
      category: 'destructive',
      detail:
        '"This is gonna be great television." Trump evaluates a meeting about an active war — where people are dying daily — as a TV moment. This reveals the entire encounter was performance, not diplomacy.'
    },
    {
      segmentIndex: 380,
      label: 'legal objection',
      category: 'assertive',
      detail:
        '"This negotiation is illegal." A reporter points out the legal problem with what just happened. This gets immediately steamrolled — the only moment anyone in the room challenges the legality of the proceeding.'
    },
    {
      segmentIndex: 312,
      label: 'key question ignored',
      category: 'constructive',
      detail:
        '"What if Russia breaks ceasefire? What if Russia breaks peace talks?" The reporter asks the most important question of the meeting — and Trump dismisses it with "what if a bomb drops on your head." The refusal to answer reveals there is no plan for Russian non-compliance.'
    },
    {
      segmentIndex: 321,
      label: 'contemptuous dismissal',
      category: 'destructive',
      detail:
        '"What if a bomb drops on your head right now?" Trump\'s response to a serious question about Russian ceasefire violations is a mocking hypothetical. He has no answer for what happens when Putin breaks the deal, so he ridicules the question.'
    },
    {
      segmentIndex: 333,
      label: 'delusional claim',
      category: 'evasive',
      detail:
        '"They respect me." Trump\'s response to Russian ceasefire violations is that Putin respects him personally. This is unfalsifiable narcissism — when confronted with evidence of Russian bad faith, he asserts personal exceptionalism.',
      deception:
        'Substitutes personal ego for geopolitical analysis — Putin has shown no evidence of "respecting" Trump beyond flattery'
    }
  ],
  emotions: [
    {
      segmentIndex: 0,
      emotion: 'controlled urgency',
      trigger: 'Russian ceasefire violations',
      surface: 'measured diplomatic tone'
    },
    {
      segmentIndex: 4,
      emotion: 'contempt',
      trigger: "Zelensky's factual accounting",
      surface: 'calm condescension'
    },
    {
      segmentIndex: 11,
      emotion: 'calculated aggression',
      trigger: "Zelensky refusing to be silenced",
      surface: 'measured indignation'
    },
    {
      segmentIndex: 14,
      emotion: 'quiet defiance',
      trigger: "Vance's lecturing",
      surface: 'simple curiosity'
    },
    {
      segmentIndex: 34,
      emotion: 'steely composure',
      trigger: 'being publicly humiliated by an ally',
      surface: 'calm factual delivery'
    },
    {
      segmentIndex: 45,
      emotion: 'dominance assertion',
      trigger: "Zelensky's warning about future consequences",
      surface: 'reasonable problem-solving'
    },
    {
      segmentIndex: 88,
      emotion: 'cold intimidation',
      trigger: "Zelensky refusing to submit",
      surface: 'casual observation'
    },
    {
      segmentIndex: 92,
      emotion: 'moral clarity',
      trigger: "Trump's poker metaphor for survival",
      surface: 'genuine bewilderment'
    },
    {
      segmentIndex: 129,
      emotion: 'petulant anger',
      trigger: "Zelensky not performing submission",
      surface: 'righteous indignation'
    },
    {
      segmentIndex: 142,
      emotion: 'wielding power',
      trigger: 'desire for public submission',
      surface: 'reasonable request'
    },
    {
      segmentIndex: 171,
      emotion: 'dignified pain',
      trigger: 'being forced to justify his country\'s survival',
      surface: 'composed gratitude'
    },
    {
      segmentIndex: 260,
      emotion: 'frustrated aggression',
      trigger: "Zelensky's insistence on security guarantees",
      surface: 'exasperated logic'
    },
    {
      segmentIndex: 268,
      emotion: 'exhausted patience',
      trigger: 'having his position repeatedly misrepresented',
      surface: 'calm agreement'
    },
    {
      segmentIndex: 334,
      emotion: 'narcissistic nostalgia',
      trigger: 'discussion of Putin',
      surface: 'authoritative storytelling'
    },
    {
      segmentIndex: 365,
      emotion: 'cold transactional finality',
      trigger: 'end of patience with Zelensky',
      surface: 'matter-of-fact delivery'
    },
    {
      segmentIndex: 377,
      emotion: 'showmanship',
      trigger: 'the spectacle he has created',
      surface: 'casual amusement'
    }
  ],
  summary:
    "A deeply asymmetric confrontation disguised as a diplomatic meeting. Trump and Vance spend seven minutes publicly bullying the leader of an invaded country, demanding performative gratitude while repeating documented falsehoods about the war. Zelensky maintains extraordinary composure — never raising his voice, never matching the aggression — while being told his country's survival is a card game he's losing. The key dynamic: Trump holds the aid Ukraine needs to survive and uses it as personal leverage, while Zelensky tries to maintain dignity under coercion. Vance acts as the opening enforcer, Trump takes over with a mix of threats, self-aggrandizement, and conspiracy tangents. The meeting ends with Trump evaluating the encounter as 'great television' — revealing the entire exercise was performance, not diplomacy.",
  notes: [
    {
      heading: 'The DARVO playbook',
      body: "Vance and Trump consistently Deny responsibility, Attack the victim, and Reverse Victim and Offender. Zelensky raises facts about Russian violations → he's told he's being 'disrespectful.' He tries to speak → he's told he's 'done a lot of talking.' He asks for security guarantees → he's told he 'doesn't want a ceasefire.' Every fact Zelensky raises gets reframed as a character flaw.",
      addressedTo: 'all'
    },
    {
      heading: 'Extraordinary composure',
      body: "Zelensky never raises his voice, never insults, never matches the aggression. When told he 'doesn't have the cards,' he responds 'what playing cards?' When told to be thankful, he calmly states Ukraine has been thankful. When confronted with strawmen, he patiently corrects them. This is world-class diplomatic discipline under extreme duress. The restraint is the strength.",
      addressedTo: 'Speaker A'
    },
    {
      heading: 'The gratitude trap',
      body: "The demand for gratitude is repeated throughout the meeting by both Trump and Vance. It serves a strategic purpose: once Zelensky performs gratitude, he implicitly accepts that aid is a gift rather than a strategic partnership. He can't then negotiate terms — you don't negotiate the terms of a gift. Zelensky threads the needle by expressing thanks for the American people while refusing to perform personal submission.",
      addressedTo: 'all'
    },
    {
      heading: 'Factual accountability',
      body: "Nearly every factual claim Trump makes is wrong or misleading. Ukraine didn't start the war. Zelensky didn't refuse to negotiate. The $350B figure is inflated. Putin hasn't 'respected' any agreements. 'Russia Russia Russia' has nothing to do with Ukrainian sovereignty. A real mediator would have fact-checked in real-time. The absence of accountability enables the bullying.",
      addressedTo: 'facilitator'
    },
    {
      heading: 'The unanswered question',
      body: "A reporter asks 'What if Russia breaks the ceasefire?' — the single most important question for any peace framework. Trump's answer: 'What if a bomb drops on your head right now?' The refusal to address Russian non-compliance reveals there is no plan. Any deal that doesn't answer this question is not a peace deal — it's a surrender.",
      addressedTo: 'all'
    },
    {
      heading: 'Performance over diplomacy',
      body: "Trump's closing line — 'This is gonna be great television' — is the key to the entire encounter. This was never a negotiation. It was a televised dominance display. The cameras were kept rolling deliberately. Zelensky was invited into an ambush. The goal was not to advance peace but to demonstrate power.",
      addressedTo: 'all'
    }
  ],
  coaching: [
    {
      start: 0,
      end: 9,
      text: "Zelensky opens with facts about Russian violations. Watch how quickly these facts get dismissed and reframed as 'disrespect.'",
      tone: 'insight',
      speaker: 'Speaker A'
    },
    {
      start: 15,
      end: 26,
      text: "Vance frames legitimate grievances as disrespect. This is the setup — once you accept that raising facts is rude, you can't disagree without being 'ungrateful.'",
      tone: 'warning',
      speaker: 'Speaker B'
    },
    {
      start: 32,
      end: 40,
      text: "'You should be thanking the President.' The demand for gratitude is a dominance move — once you perform submission, you lose your negotiating position.",
      tone: 'insight',
      speaker: 'Speaker B'
    },
    {
      start: 54,
      end: 63,
      text: "Notice the interruption pattern: Zelensky repeatedly tries to answer and is talked over. He's been asked questions but not allowed to respond.",
      tone: 'warning',
      speaker: 'Speaker B'
    },
    {
      start: 77,
      end: 88,
      text: "\"You don't have the cards\" — Trump reduces Ukraine's survival to a poker game. Zelensky's 'what playing cards?' is a refusal to accept that framing.",
      tone: 'insight',
      speaker: 'Speaker C'
    },
    {
      start: 112,
      end: 125,
      text: "'You're gambling with World War III' — accusing the invaded country of risking world war. This is a complete inversion of cause and effect.",
      tone: 'warning',
      speaker: 'Speaker C'
    },
    {
      start: 135,
      end: 151,
      text: "'Have you said thank you?' Meanwhile Zelensky is being publicly humiliated. The demand for gratitude during an ambush is the cruelty.",
      tone: 'insight',
      speaker: 'Speaker C'
    },
    {
      start: 171,
      end: 183,
      text: "Zelensky finally gets a full sentence: 'We are staying strong, we've been alone, and we are thankful.' Dignity under coercion. Masterful.",
      tone: 'praise',
      speaker: 'Speaker A'
    },
    {
      start: 216,
      end: 227,
      text: "'The war would have been over in two weeks without our equipment' — the implication is that Ukraine should have fallen faster. Think about what that means.",
      tone: 'insight',
      speaker: 'Speaker C'
    },
    {
      start: 258,
      end: 270,
      text: "Zelensky said he wants a ceasefire WITH GUARANTEES. Trump keeps saying Zelensky doesn't want a ceasefire. The strawman is doing all the work.",
      tone: 'warning',
      speaker: 'Speaker C'
    },
    {
      start: 310,
      end: 332,
      text: "'What if Russia breaks the ceasefire?' — the most important question. Trump's answer: 'What if a bomb drops on your head?' There is no plan for Russian non-compliance.",
      tone: 'insight',
      speaker: 'Speaker C'
    },
    {
      start: 334,
      end: 355,
      text: "Trump pivots to defending Putin and ranting about Hunter Biden. He's expressing more sympathy for Putin — who invaded Ukraine — than for Zelensky, who is sitting right there.",
      tone: 'warning',
      speaker: 'Speaker C'
    },
    {
      start: 362,
      end: 376,
      text: "'I empowered you to be a tough guy.' Trump takes credit for Zelensky's courage in resisting a full-scale invasion. The final ultimatum: 'make a deal or we're out.'",
      tone: 'insight',
      speaker: 'Speaker C'
    },
    {
      start: 377,
      end: 400,
      text: "'This is gonna be great television.' That's the tell. This was never about peace. It was about the performance of power.",
      tone: 'insight',
      speaker: 'Speaker C'
    }
  ],
  speakerNames: {
    'Speaker A': 'President Zelensky',
    'Speaker B': 'Vice President Vance',
    'Speaker C': 'President Trump',
    'Speaker D': 'Reporter',
    'Speaker E': 'Press Handler'
  }
};
