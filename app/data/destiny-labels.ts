import type { BehaviorAnalysis } from '~/types/meeting';

/**
 * Demo context prompt for the Destiny vs Presuppositionalist debate clip.
 * Speaker A = Destiny
 * Speaker B = Christian Presuppositionalist
 */
export const destinyContext =
  "A philosophical debate between Destiny (Speaker A), a popular political streamer known for rigorous Socratic argumentation, and a Christian presuppositionalist (Speaker B). Destiny presents the Euthyphro dilemma: if two people both claim divine revelation but reach opposite moral conclusions, how do you resolve who is right? This exposes a fatal circularity in presuppositional apologetics — grounding morality in God's revelation provides no external arbiter. Speaker B dismisses the argument rather than engaging, then claims straw-manning when cornered. About 66 seconds of dense philosophical exchange.";

/**
 * Pre-generated behavioral labels for the Destiny debate clip.
 * Enriched from gpt-4o-mini analysis.
 */
export const destinyLabels: BehaviorAnalysis = {
  context: destinyContext,
  labels: [
    {
      segmentIndex: 0,
      label: 'constructing the hypothetical',
      category: 'constructive',
      detail:
        'Destiny opens by carefully constructing a thought experiment with clear, simple premises. "Somebody says murder is good, you say murder is bad." By making the setup so elementary, he ensures the audience can follow every logical step — there\'s nowhere to hide behind complexity.'
    },
    {
      segmentIndex: 3,
      label: 'springing the mirror',
      category: 'assertive',
      detail:
        '"Because God told me... because God told me." The power of this move is its symmetry. Both sides use the exact same justification. If divine revelation is your foundation, and two people receive opposite revelations, the foundation cracks. This is the Euthyphro dilemma made conversational.'
    },
    {
      segmentIndex: 5,
      label: 'the unanswerable question',
      category: 'assertive',
      detail:
        '"How do you resolve that disagreement?" — This is the question that presuppositionalism cannot answer without abandoning its own framework. If you appeal to scripture, the other person appeals to different scripture. If you appeal to reason, you\'ve admitted reason is above revelation. There\'s no exit.'
    },
    {
      segmentIndex: 6,
      label: 'contemptuous dismissal',
      category: 'destructive',
      detail:
        '"This is the stupidest hypothetical." Speaker B can\'t answer the question, so he attacks the question itself. Calling a valid philosophical argument "stupid" isn\'t a rebuttal — it\'s a forfeit dressed as confidence. The mocking tone is doing work that logic can\'t.',
      deception:
        'The dismissive laughter performs superiority while actually revealing an inability to engage with the argument'
    },
    {
      segmentIndex: 7,
      label: 'patient repetition',
      category: 'constructive',
      detail:
        "\"Sure, I'll repeat the question to you.\" Destiny doesn't take the bait. He doesn't get angry at being called stupid. He simply restates the argument more carefully. This is elite debate discipline — refusing to match your opponent's emotional register forces them to either engage or keep dodging."
    },
    {
      segmentIndex: 11,
      label: 'naming the flaw',
      category: 'assertive',
      detail:
        '"This is the problem with grounding your meta-ethics with divine revelation." Destiny escalates from hypothetical to thesis. He names the exact philosophical problem — presuppositionalism is circular at its foundation because divine revelation is inaccessible to external verification.'
    },
    {
      segmentIndex: 12,
      label: 'presup takedown',
      category: 'assertive',
      detail:
        "\"It's why presuppositionalism sucks. It's ultimately circular at a foundation that is inaccessible to external parties.\" This is the kill shot — stated plainly, without jargon. Circular reasoning that can't be checked by outside observers isn't a foundation for morality, it's a conversation-stopper."
    },
    {
      segmentIndex: 13,
      label: 'accidental concession',
      category: 'evasive',
      detail:
        '"You\'re right." Speaker B says this before apparently realizing what he\'s agreed to and trying to talk over it. This micro-concession is the most revealing moment in the clip — for a split second, the argument landed.',
      deception:
        'The immediate pivot to talking over Destiny suggests Speaker B recognized the concession and tried to bury it'
    },
    {
      segmentIndex: 15,
      label: 'rhetorical escalation',
      category: 'assertive',
      detail:
        '"I could tell you that God has revealed anything to me, and I automatically win the argument." Destiny makes the absurdity concrete — if divine revelation is self-authenticating, anyone can claim it about anything. The framework doesn\'t distinguish between genuine revelation and manipulation.'
    },
    {
      segmentIndex: 22,
      label: 'straw man accusation',
      category: 'evasive',
      detail:
        '"You\'re straw-manning the argument." This is the last refuge when you can\'t answer the question — accuse your opponent of misrepresenting your position. But Destiny isn\'t straw-manning; he\'s addressing the exact logical structure of presuppositionalism. Speaker B never explains what the "real" argument is.',
      deception:
        'Claims misrepresentation without specifying what was misrepresented — the accusation itself is a deflection'
    },
    {
      segmentIndex: 25,
      label: 'accepting the challenge',
      category: 'constructive',
      detail:
        "\"I'm not str- then can you tell me, then answer the question.\" Destiny immediately offers to be corrected. If he's straw-manning, simply answer the question correctly. This call-to-action is important — it removes the escape hatch. Either answer the question or admit you can't."
    },
    {
      segmentIndex: 27,
      label: 'final restatement',
      category: 'assertive',
      detail:
        '"Two people that both believe in God have a different answer to a moral question. How do you figure out which one is right and which one is wrong?" Destiny restates the question for the third time — each time simpler and more direct. The repetition isn\'t redundant; it\'s a spotlight on the silence where an answer should be.'
    }
  ],
  emotions: [
    {
      segmentIndex: 0,
      emotion: 'focused clarity',
      trigger: 'setting up the argument',
      surface: 'casual conversational tone'
    },
    {
      segmentIndex: 5,
      emotion: 'intellectual anticipation',
      trigger: 'knowing the question has no good answer',
      surface: 'genuine curiosity'
    },
    {
      segmentIndex: 6,
      emotion: 'hostile contempt',
      trigger: 'being presented with an argument he cannot answer',
      surface: 'amused dismissal'
    },
    {
      segmentIndex: 7,
      emotion: 'controlled patience',
      trigger: 'being called stupid',
      surface: 'cheerful willingness to repeat'
    },
    {
      segmentIndex: 12,
      emotion: 'conviction',
      trigger: 'articulating the core flaw',
      surface: 'calm assertiveness'
    },
    {
      segmentIndex: 13,
      emotion: 'momentary panic',
      trigger: 'accidentally conceding the point',
      surface: 'quick agreement'
    },
    {
      segmentIndex: 22,
      emotion: 'cornered defensiveness',
      trigger: 'running out of counter-arguments',
      surface: 'confident accusation'
    },
    {
      segmentIndex: 25,
      emotion: 'determined patience',
      trigger: 'being accused of straw-manning',
      surface: 'open invitation to correct'
    }
  ],
  summary:
    'A compact philosophical exchange that exposes the fundamental weakness of presuppositional apologetics. Destiny presents the Euthyphro dilemma in accessible terms — if two believers receive contradictory revelations, divine command theory offers no resolution. Speaker B never answers the question. His responses follow a predictable retreat: dismissal ("stupidest hypothetical"), accidental concession ("you\'re right"), accusation of straw-manning, then silence. Destiny\'s patience is the weapon — he repeats the same question three times, each time simpler, each time more obviously unanswered.',
  notes: [
    {
      heading: 'The unanswered question',
      body: 'Destiny asks "how do you resolve that disagreement?" three times across 66 seconds. Speaker B never answers — not once. He ridicules it, accidentally concedes, accuses straw-manning, and goes silent. The absence of an answer IS the answer. Presuppositionalism has no mechanism for adjudicating between competing revelations.',
      addressedTo: 'all'
    },
    {
      heading: 'Dismissal is not refutation',
      body: 'Calling an argument "the stupidest hypothetical" feels powerful in the moment but it isn\'t an answer. If the hypothetical is so stupid, it should be trivially easy to defeat. The fact that you can\'t answer a "stupid" question makes you look worse, not better. Next time, engage with the structure of the argument even if you think it\'s flawed.',
      addressedTo: 'Speaker B'
    },
    {
      heading: 'Patience as strategy',
      body: "Destiny's refusal to match Speaker B's contempt is a deliberate strategic choice. By calmly repeating the question, he lets the audience see the contrast: one person has an argument, the other has attitude. The calm repetition also ensures the audience absorbs the point even if Speaker B won't.",
      addressedTo: 'Speaker A'
    },
    {
      heading: 'The accidental "you\'re right"',
      body: 'At segment 13, Speaker B says "you\'re right" before catching himself. This micro-concession is devastating because it shows the argument actually penetrated. Debaters: be careful with reflexive agreements. If your opponent is building toward a conclusion, every "you\'re right" along the way becomes a building block for their case.',
      addressedTo: 'Speaker B'
    },
    {
      heading: 'Straw man as escape hatch',
      body: "Accusing your opponent of straw-manning is only valid if you can state what they got wrong. \"You're straw-manning\" without specifying what the real argument is isn't a defense — it's a retreat. If Destiny is misrepresenting presuppositionalism, the fix is simple: state the correct version and show how it answers the question.",
      addressedTo: 'all'
    }
  ],
  coaching: [
    {
      start: 0,
      end: 6,
      text: 'Watch how carefully the hypothetical is constructed — elementary premises, symmetrical structure, one devastating question. This is how you build an airtight thought experiment.',
      tone: 'insight',
      speaker: 'Speaker A'
    },
    {
      start: 7,
      end: 13,
      text: '"This is the stupidest hypothetical." If it\'s so stupid, why can\'t he answer it? Dismissal without engagement is a forfeit.',
      tone: 'warning',
      speaker: 'Speaker B'
    },
    {
      start: 14,
      end: 22,
      text: "Destiny doesn't escalate. He just calmly repeats the argument and names the exact philosophical problem. The restraint IS the strategy.",
      tone: 'praise',
      speaker: 'Speaker A'
    },
    {
      start: 33,
      end: 42,
      text: '"It\'s why presuppositionalism sucks" — blunt, but backed by the argument. The rudeness works because the logic is airtight. Without the logic, it would just be name-calling.',
      tone: 'insight',
      speaker: 'Speaker A'
    },
    {
      start: 45,
      end: 50,
      text: '"You\'re right" — the accidental concession. Speaker B agrees for a split second before trying to pivot. Once you hear it, you can\'t unhear it.',
      tone: 'insight',
      speaker: 'Speaker B'
    },
    {
      start: 49,
      end: 56,
      text: '"I could tell you God revealed anything to me and automatically win." This makes the circularity impossible to deny. If revelation is self-authenticating, anyone can claim anything.',
      tone: 'insight',
      speaker: 'Speaker A'
    },
    {
      start: 54,
      end: 58,
      text: '"You\'re straw-manning" — but he never says what the real argument is. An accusation without correction is just deflection.',
      tone: 'warning',
      speaker: 'Speaker B'
    },
    {
      start: 56,
      end: 66,
      text: 'Destiny asks the same question a third time. Each repetition is simpler. Each time the silence where an answer should be gets louder.',
      tone: 'insight',
      speaker: 'Speaker A'
    }
  ],
  speakerNames: {
    'Speaker A': 'Destiny',
    'Speaker B': 'Presuppositionalist'
  }
};
