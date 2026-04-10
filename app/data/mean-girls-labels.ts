import type { BehaviorAnalysis } from '~/types/meeting';

/** Demo context prompt for the Mean Girls Caesar speech. */
export const meanGirlsContext =
  'This is a high school student giving a passionate speech comparing school social dynamics to Julius Caesar. She is using a class presentation as a vehicle to rally her classmates against the popular girl (the "Caesar" figure). Look for rhetorical manipulation, emotional escalation, mob-building, and any genuine grievances underneath the drama. Also flag healthy moments — is there any real solidarity, courage to speak up, or genuine emotion?';

/**
 * Pre-generated behavioral labels for the Mean Girls demo.
 * Generated via gpt-4o-mini behavioral analysis.
 */
export const meanGirlsLabels: BehaviorAnalysis = {
  context: meanGirlsContext,
  labels: [
    {
      segmentIndex: 0,
      label: 'emotional appeal',
      category: 'constructive',
      detail:
        "Uses a vivid metaphor to express frustration with social hierarchies, appealing to her peers' emotions and shared experience."
    },
    {
      segmentIndex: 2,
      label: 'building coalition',
      category: 'assertive',
      detail:
        'Elevates Brutus as equal to Caesar in attractiveness — framing the underdog as just as worthy to shift peer loyalty.'
    },
    {
      segmentIndex: 5,
      label: 'crowd manipulation',
      category: 'assertive',
      detail:
        'Claims majority consensus ("people totally like Brutus just as much") without evidence — manufacturing social proof to sway the room.',
      deception:
        'Asserts popular opinion as fact when it reflects her own agenda, not actual consensus'
    },
    {
      segmentIndex: 6,
      label: 'questioning authority',
      category: 'constructive',
      detail:
        'The most genuinely principled moment — challenges the idea that one person should dominate everyone else.'
    },
    {
      segmentIndex: 8,
      label: 'invoking shared values',
      category: 'constructive',
      detail:
        'Appeals to what "Rome is about" — using collective identity to ground the argument in something bigger than personal grudge.'
    },
    {
      segmentIndex: 9,
      label: 'inciting aggression',
      category: 'destructive',
      detail:
        'The rhetorical escalation culminates in a call to violence — even as metaphor, it shifts from grievance to mob mentality.'
    }
  ],
  emotions: [
    {
      segmentIndex: 0,
      emotion: 'frustrated',
      surface: 'passionate',
      trigger:
        'unprovoked — channeling personal resentment through a class presentation'
    },
    {
      segmentIndex: 2,
      emotion: 'jealous',
      surface: 'matter-of-fact',
      trigger:
        'unprovoked — the "just as cute" comparison reveals the real wound'
    },
    {
      segmentIndex: 5,
      emotion: 'indignant',
      trigger: 'unprovoked — building momentum through accumulated grievances'
    },
    {
      segmentIndex: 6,
      emotion: 'righteous',
      trigger:
        'unprovoked — genuinely believes in fairness even if the framing is self-serving'
    },
    {
      segmentIndex: 9,
      emotion: 'hostile',
      surface: 'playful',
      trigger:
        'unprovoked — the cheerful delivery masks real aggression toward the target'
    }
  ],
  summary:
    'A masterclass in teenage rhetorical manipulation disguised as a school presentation. Speaker A channels genuine frustration about social hierarchies into an escalating speech that starts with relatable grievances but ends with a call to violence. The real emotion is jealousy and resentment, but the delivery is confident and crowd-pleasing — making it easy to miss how the argument slides from fair point to mob incitement.',
  notes: [
    {
      heading: 'The grievance is real',
      body: 'Underneath the drama, Speaker A is expressing something genuine: frustration with a social structure where one person dominates everyone else. The "stomping around like a giant" metaphor resonates because it captures how power imbalances actually feel. This is a healthy impulse — the problem is where it leads, not where it starts.',
      addressedTo: 'Speaker A'
    },
    {
      heading: 'From solidarity to mob',
      body: "The speech starts by building coalition around shared experience and ends by calling for violence. The transition is seamless and that's what makes it dangerous. A facilitator should help Speaker A separate the legitimate complaint (unfair power dynamics) from the destructive conclusion (let's destroy the person). The two don't have to go together.",
      addressedTo: 'facilitator'
    },
    {
      heading: 'The "just as cute" tell',
      body: 'The pivot from "just as cute" to "just as smart" reveals that this isn\'t purely about fairness — it\'s personal. Speaker A is comparing herself to the popular girl on every dimension. Acknowledging the jealousy honestly would be more productive than channeling it into political rhetoric. It\'s okay to feel envious; it\'s not okay to weaponize a classroom.',
      addressedTo: 'Speaker A'
    }
  ],
  speakerNames: {
    'Speaker A': 'Gretchen Wieners'
  },
  coaching: [
    {
      start: 1.15,
      end: 7,
      text: "Strong opening — she's framing the argument as a fairness issue. This is classic persuasion: make the audience feel like they share your grievance.",
      tone: 'insight',
      speaker: 'Speaker A'
    },
    {
      start: 7.95,
      end: 11,
      text: "'Just as cute, just as smart' — notice the pivot from politics to personal comparison. This isn't about fairness anymore; it's about jealousy.",
      tone: 'insight',
      speaker: 'Speaker A'
    },
    {
      start: 11.7,
      end: 15,
      text: "She's building momentum by stacking claims. Each one sounds reasonable alone, but together they're creating an emotional avalanche heading somewhere dangerous.",
      tone: 'warning',
      speaker: 'Speaker A'
    },
    {
      start: 15.9,
      end: 19,
      text: "'When did it become okay for one person to be the boss of everybody?' — a genuinely fair question. But watch where she takes it.",
      tone: 'tip',
      speaker: 'Speaker A'
    },
    {
      start: 19,
      end: 21,
      text: "The 'huh?' pause — she's reading the room, making sure they're with her before the final escalation. Master crowd work.",
      tone: 'insight',
      speaker: 'Speaker A'
    },
    {
      start: 20.85,
      end: 22.5,
      text: "And there it is — 'let's stab Caesar.' A legitimate grievance just became a call to violence. The speech was never about justice; it was about revenge dressed as revolution.",
      tone: 'warning',
      speaker: 'Speaker A'
    }
  ]
};
