import type { BehaviorAnalysis } from '~/types/meeting';

/** Demo context prompt for the Night at the Museum argument. */
export const demoContext =
  "This is a negotiation between a pharaoh and a night guard over sharing a magical artifact. I'm concerned about the complete inability to cooperate — one side refuses to share or compromise, using threats instead of finding a mutual solution. Look for patterns around failure to share, refusal to cooperate, and whether anyone attempts a constructive path. But also highlight healthy moments — who stays calm under pressure, who proposes fair exchanges, who de-escalates? Give credit where it's due.";

/**
 * Pre-generated behavioral labels for the demo transcript.
 * Matches segments from demo-transcript.ts (argumentAtTheMuseum.mp4).
 */
export const demoLabels: BehaviorAnalysis = {
  context: demoContext,
  labels: [
    {
      segmentIndex: 0,
      label: 'claiming ownership',
      category: 'assertive',
      detail:
        'Opens by commanding the other party to stop — immediately frames the artifact as something to be surrendered, not shared.'
    },
    {
      segmentIndex: 6,
      label: 'refuses to share',
      category: 'destructive',
      detail:
        'Demands the tablet and combination with zero offer of reciprocity — a textbook refusal to cooperate.'
    },
    {
      segmentIndex: 7,
      label: 'proposing a trade',
      category: 'constructive',
      detail:
        'The only moment where someone offers a genuine exchange — "I\'ll give you X when you give me Y." This is the closest anyone gets to cooperation.'
    },
    {
      segmentIndex: 8,
      label: 'hoarding control',
      category: 'destructive',
      detail:
        'Explicitly states he will release things only on his own terms — refuses the mutual exchange just proposed.'
    },
    {
      segmentIndex: 3,
      label: 'calm under pressure',
      category: 'constructive',
      detail:
        'Despite facing an aggressive opener, responds without matching the hostility — keeps the conversation possible instead of escalating.'
    },
    {
      segmentIndex: 9,
      label: 'mirroring stubbornness',
      category: 'assertive',
      detail:
        'Mirrors the pharaoh\'s "I\'ll do what I want" logic right back — effective, but doubles down on the impasse rather than bridging it.'
    },
    {
      segmentIndex: 10,
      label: 'threats over sharing',
      category: 'destructive',
      detail:
        'Instead of negotiating terms, escalates directly to threatening harm — the ultimate failure to cooperate.'
    },
    {
      segmentIndex: 12,
      label: 'standing firm on fairness',
      category: 'assertive',
      detail:
        'Holds to the conditional trade despite threats — at least one side is trying to maintain a framework for exchange.'
    },
    {
      segmentIndex: 15,
      label: 'fake generosity',
      category: 'evasive',
      detail:
        'Pretends to be "Conrad the Trustworthy" then reveals it was a trick — poisoning any trust that could enable sharing.'
    },
    {
      segmentIndex: 21,
      label: 'punishing attempts to reach',
      category: 'destructive',
      detail:
        'Threatens death for literally reaching toward the shared space — treats any approach as aggression, not cooperation.'
    },
    {
      segmentIndex: 23,
      label: 'drawing territorial lines',
      category: 'destructive',
      detail:
        '"No touching zone" — creates a physical barrier to sharing rather than finding common ground.'
    },
    {
      segmentIndex: 29,
      label: 'leveraging with calm',
      category: 'constructive',
      detail:
        'Calmly reminds the pharaoh that cooperation is required because only they know the combination — power through interdependence.'
    },
    {
      segmentIndex: 33,
      label: 'patient persistence',
      category: 'constructive',
      detail:
        'Keeps returning to the fair-trade framework despite repeated rejection — shows emotional regulation and commitment to a workable outcome.'
    },
    {
      segmentIndex: 38,
      label: 'silencing dissent',
      category: 'destructive',
      detail:
        'Forbids the other party from even speaking — the most extreme form of refusing to engage in cooperative dialogue.'
    },
    {
      segmentIndex: 39,
      label: 'insisting on fair trade',
      category: 'constructive',
      detail:
        'Despite being told to shut up, calmly restates the fair exchange: "after you give me Jed and release my friends."'
    },
    {
      segmentIndex: 47,
      label: 'coercion over cooperation',
      category: 'destructive',
      detail:
        'Final ultimatum with a countdown — when sharing fails entirely, all that remains is force.'
    }
  ],
  summary:
    "A lopsided negotiation where one side consistently undermines cooperation while the other shows real communication skill. Speaker A treats the artifact as solely his and responds to proposals with threats. However, Speaker C/D demonstrate patience, fair-trade framing, and emotional regulation throughout — they keep proposing solutions even under coercion. The healthy behaviors are there; they're just being overwhelmed by one party's refusal to engage.",
  notes: [
    {
      heading: 'Threats replace negotiation',
      body: "Speaker A defaults to threats the moment cooperation is required. This pattern appears at least five times — each time Speaker C/D propose a fair exchange, Speaker A responds with escalation rather than engagement. This isn't a negotiation; it's an attempt to coerce compliance through fear. In a real workplace, this dynamic would shut down all honest input from the team.",
      addressedTo: 'Speaker A'
    },
    {
      heading: 'You have more leverage than you think',
      body: 'Speaker C/D hold the combination — the one thing Speaker A actually needs. Yet they keep offering fair trades instead of pressing this advantage harder. The calm conditional offers ("I\'ll give you X when you give me Y") are the healthiest communication in this entire exchange. Keep doing that, but consider being more explicit about consequences: "If you won\'t cooperate, neither of us gets what we want."',
      addressedTo: 'Speaker C'
    },
    {
      heading: 'No one is listening',
      body: 'Neither party pauses to acknowledge what the other actually wants. Speaker A never says "I understand you want your friends back." Speaker C/D never say "I get that the tablet is important to you." Without basic acknowledgment, every exchange becomes a zero-sum power struggle. Start the next conversation by restating each other\'s needs before proposing solutions.',
      addressedTo: 'all'
    },
    {
      heading: 'The silencing pattern is the biggest red flag',
      body: 'At the 100-second mark, Speaker A forbids Speaker D from even speaking. This is the most damaging moment — it signals that one party believes the other has no right to participate. If this dynamic exists in your meetings, it needs to be addressed immediately. Everyone at the table must have the right to speak, regardless of power dynamics.',
      addressedTo: 'facilitator'
    },
    {
      heading: 'Try a structured exchange next time',
      body: "This negotiation failed because both sides tried to get their thing first. A facilitator should propose a simultaneous exchange or a neutral third-party handoff. The impasse isn't about the items themselves — it's about trust. Neither party will go first because they (correctly) don't trust the other to follow through.",
      addressedTo: 'facilitator'
    },
    {
      heading: 'Speaker C/D are modeling good communication',
      body: 'Despite facing threats, silencing, and bad-faith tricks, Speaker C/D consistently return to calm, conditional proposals. They never match the aggression level. This is exactly the kind of de-escalation and emotional regulation that keeps negotiations from collapsing entirely. Recognize and reinforce these behaviors — they are the foundation for any future resolution.',
      addressedTo: 'all'
    }
  ]
};
