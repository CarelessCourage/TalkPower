import type { BehaviorAnalysis } from '~/types/meeting';

/** Demo context prompt for the Cosmic Skeptic debate clip. */
export const cosmicContext =
  'A philosophical debate about the problem of suffering and the existence of God. Speaker A is a Christian apologist defending the idea that suffering can coexist with a good God, using emotional appeals and personal analogies. Speaker B (Cosmic Skeptic / Alex O\'Connor) is an atheist presenting the logical problem of evil — if God is all-powerful and good, suffering should not exist. The debate is respectful but intellectually pointed. Roughly 49 seconds of dense philosophical exchange.';

/**
 * Pre-generated behavioral labels for the Cosmic Skeptic debate demo.
 * Enriched from gpt-4o-mini analysis.
 */
export const cosmicLabels: BehaviorAnalysis = {
  context: cosmicContext,
  labels: [
    {
      segmentIndex: 0,
      label: 'framing the debate',
      category: 'assertive',
      detail:
        '"Repeat your claim one more time" — Speaker A is controlling the conversational frame. By asking their opponent to restate, they buy time and set up their rebuttal. This is a classic debate tactic: make the other person state their strongest version so you can address it head-on.'
    },
    {
      segmentIndex: 1,
      label: 'clean thesis statement',
      category: 'constructive',
      detail:
        'Speaker B states the problem of evil in one clean sentence. No hedging, no softening. This clarity is a rhetorical strength — it makes the claim easy to understand and hard to dodge.'
    },
    {
      segmentIndex: 2,
      label: 'theological pivot',
      category: 'constructive',
      detail:
        'Speaker A pivots from the logical argument to an emotional-theological one: "our God is not unfamiliar with suffering." This reframes the debate from logic to relationship. It\'s effective rhetoric but doesn\'t actually address the logical problem — it changes the subject while sounding like an answer.'
    },
    {
      segmentIndex: 3,
      label: 'concession with reframe',
      category: 'assertive',
      detail:
        'Speaker B concedes that suffering can be "poetically" beautiful — then immediately undercuts it. This is sophisticated debating: acknowledge the strongest version of your opponent\'s point before dismantling it. Shows intellectual honesty.'
    },
    {
      segmentIndex: 8,
      label: 'thought experiment',
      category: 'assertive',
      detail:
        'The leukemia hypothetical is devastating. Speaker B makes the abstract concrete: "would you tell a grieving parent there\'s beauty in their child\'s suffering?" This forces the audience to feel the problem of evil rather than just think about it.',
      deception:
        'Maintains a calm, almost casual tone while delivering an argument designed to provoke deep emotional discomfort'
    },
    {
      segmentIndex: 11,
      label: 'dark humor as argument',
      category: 'assertive',
      detail:
        '"I\'d be kicked out of the funeral" — Speaker B uses humor to land the point. If the "beauty of suffering" argument sounds absurd when applied to a real funeral, maybe it is absurd. The laughter makes the logical point stick.'
    },
    {
      segmentIndex: 12,
      label: 'graceful concession',
      category: 'constructive',
      detail:
        '"Right. Well..." — Speaker A doesn\'t fight the funeral point. They accept it and pivot to a new analogy. This is good debating: don\'t defend a lost position, move to stronger ground.'
    },
    {
      segmentIndex: 13,
      label: 'analogy shift to childbirth',
      category: 'constructive',
      detail:
        'Speaker A introduces childbirth as a case where suffering leads to something good. It\'s a much stronger case than the leukemia example because the suffering is temporary and purposeful. Smart recovery.'
    },
    {
      segmentIndex: 17,
      label: 'the trap',
      category: 'assertive',
      detail:
        '"But imagine you could have the giving birth without the pain" — Speaker B springs the logical trap. If you could get the good outcome without suffering, wouldn\'t you? This forces Speaker A into a corner: either admit God should remove suffering, or argue suffering is necessary even when it isn\'t.'
    },
    {
      segmentIndex: 20,
      label: 'falling into the trap',
      category: 'evasive',
      detail:
        '"Of course. Yeah." — Speaker A agrees too quickly, not realizing they\'ve just conceded Speaker B\'s core point. If painless childbirth would be preferable, and God could make it so, then suffering isn\'t necessary — which means allowing it demands justification.',
      deception:
        'The quick agreement sounds casual and confident, masking the fact that it undermines their own position'
    },
    {
      segmentIndex: 25,
      label: 'closing the trap',
      category: 'assertive',
      detail:
        '"If God can bring about the good stuff without the bad stuff, there\'s no reason to bring about the bad stuff." Speaker B completes the logical argument. Every concession Speaker A made along the way now supports this conclusion. This is a masterclass in Socratic method.'
    },
    {
      segmentIndex: 27,
      label: 'pivot to burden of proof',
      category: 'assertive',
      detail:
        '"What we have to show is..." — Speaker B shifts from argument to framework. Now it\'s not just "suffering is bad" but "you have the burden to explain why a good God would allow it." This raises the stakes for Speaker A significantly.'
    }
  ],
  emotions: [
    {
      segmentIndex: 0,
      emotion: 'controlled focus',
      trigger: 'initiating the exchange',
      surface: 'calm authority'
    },
    {
      segmentIndex: 2,
      emotion: 'genuine conviction',
      trigger: 'connecting suffering to faith',
      surface: 'warmth'
    },
    {
      segmentIndex: 3,
      emotion: 'intellectual engagement',
      trigger: 'finding the weakness in the opponent\'s framing'
    },
    {
      segmentIndex: 8,
      emotion: 'moral urgency',
      trigger: 'the leukemia thought experiment',
      surface: 'casual tone'
    },
    {
      segmentIndex: 12,
      emotion: 'slight discomfort',
      trigger: 'the funeral point landing',
      surface: 'composed pivot'
    },
    {
      segmentIndex: 17,
      emotion: 'quiet confidence',
      trigger: 'setting up the logical trap',
      surface: 'simple curiosity'
    },
    {
      segmentIndex: 20,
      emotion: 'unaware vulnerability',
      trigger: 'agreeing without seeing the implication',
      surface: 'casual agreement'
    },
    {
      segmentIndex: 25,
      emotion: 'intellectual satisfaction',
      trigger: 'the argument clicking into place',
      surface: 'measured delivery'
    }
  ],
  summary:
    'A compact but philosophically dense exchange about the problem of evil. Speaker A (the apologist) leads with emotional and theological framing — suffering as divine solidarity, childbirth as purposeful pain. Speaker B (the skeptic) systematically dismantles each analogy using the Socratic method: concede the point, follow the logic, reveal the contradiction. The key moment is the childbirth trap — Speaker A agrees that painless birth would be preferable, inadvertently conceding that suffering is not necessary, which is the skeptic\'s entire thesis. The debate is remarkably civil; both speakers listen and respond to actual arguments rather than talking past each other.',
  notes: [
    {
      heading: 'The emotional vs. logical divide',
      body: 'Speaker A\'s strongest moments are emotional (divine suffering, childbirth). Speaker B\'s strongest moments are logical (the funeral test, the childbirth trap). Neither approach is wrong, but they\'re playing different games — and in this exchange, the logical game wins because Speaker A keeps conceding logical ground while scoring emotional points that don\'t address the core question.',
      addressedTo: 'all'
    },
    {
      heading: 'Watch the concessions',
      body: 'You conceded three critical points in under 20 seconds: (1) suffering can feel pointless to the sufferer, (2) painless childbirth would be preferable, and (3) "of course" you\'d choose less suffering. Each concession individually seems harmless, but together they build your opponent\'s case. In future debates, pause before agreeing — ask "where is this going?"',
      addressedTo: 'Speaker A'
    },
    {
      heading: 'The Socratic trap was elegant',
      body: 'The childbirth sequence was a textbook Socratic argument: start with a shared premise (suffering is real), get agreement on a specific case (childbirth hurts), introduce a hypothetical (what if it didn\'t?), extract a concession (you\'d prefer no pain), then generalize (so suffering isn\'t necessary). Each step was small and reasonable. The conclusion was devastating.',
      addressedTo: 'Speaker B'
    },
    {
      heading: 'Civility as strength',
      body: 'Both speakers maintained genuine respect throughout. No interruptions, no dismissals, no raised voices. This is rare in religious debates and it makes both arguments stronger — the audience can focus on the ideas rather than the personalities. This should be the standard, not the exception.',
      addressedTo: 'facilitator'
    },
    {
      heading: 'The unfinished argument',
      body: 'Speaker B\'s final line — "what we have to show is..." — sets up a burden of proof that the clip cuts off before resolving. The apologist now needs to demonstrate either that suffering is logically necessary for some greater good, or that God has morally sufficient reasons we can\'t fully understand. Both paths have well-known philosophical defenses, but the skeptic has made the bar very high.',
      addressedTo: 'all'
    }
  ],
  coaching: [
    {
      start: 0,
      end: 3,
      text: 'Asking your opponent to restate their claim is a power move — it buys you time to think and puts them on the spot. Smart opening.',
      tone: 'insight',
      speaker: 'Speaker A'
    },
    {
      start: 3.5,
      end: 10,
      text: '"Our God is not unfamiliar with suffering" is emotionally powerful but doesn\'t address the logical problem. Watch for the shift from logic to feeling.',
      tone: 'warning',
      speaker: 'Speaker A'
    },
    {
      start: 12,
      end: 18,
      text: 'The concession-then-undercut move is elite debating. "Poetically, sure — but practically?" forces the opponent to choose between poetry and reality.',
      tone: 'praise',
      speaker: 'Speaker B'
    },
    {
      start: 20.6,
      end: 28,
      text: 'The leukemia funeral thought experiment is doing the real argumentative work here. Making abstract philosophy feel personal is how you win audiences.',
      tone: 'insight',
      speaker: 'Speaker B'
    },
    {
      start: 29,
      end: 35,
      text: 'Good recovery — pivoting from a lost point to a stronger analogy (childbirth). Don\'t defend weak ground; move to where you\'re stronger.',
      tone: 'praise',
      speaker: 'Speaker A'
    },
    {
      start: 35,
      end: 40,
      text: '"Imagine giving birth without the pain" — the trap is being set. If you agree, you\'ve just conceded that suffering isn\'t necessary. Careful!',
      tone: 'warning',
      speaker: 'Speaker A'
    },
    {
      start: 39,
      end: 43,
      text: '"Of course" — and there it is. Speaker A just agreed that removing suffering would be preferable, which is the skeptic\'s entire thesis. The concession happened so naturally they didn\'t even notice.',
      tone: 'insight',
      speaker: 'Speaker A'
    },
    {
      start: 43,
      end: 49.5,
      text: 'The trap closes: if God can bring good without bad, why allow the bad? Every earlier concession now supports this conclusion. Textbook Socratic method.',
      tone: 'insight',
      speaker: 'Speaker B'
    }
  ],
  speakerNames: {
    'Speaker A': 'Christian Apologist',
    'Speaker B': 'Alex (Cosmic Skeptic)'
  }
};
