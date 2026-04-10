import type { BehaviorAnalysis } from '~/types/meeting';

/** Demo context prompt for The Office who/whomever scene. */
export const theOfficeContext =
  'This is the famous "who vs whomever" grammar debate scene from The Office. Michael (A) tries to delegate a presentation to Ryan (B), who uses "whomever" — triggering a group grammar argument. The scene reveals office power dynamics: Michael is clueless but confident, Ryan is frustrated and knowledgeable, Dwight (D) is loyal but wrong, Kelly (E) is petty, Toby (F) is correct but ignored, and Michael ends by threatening Toby. 8 speakers, roughly 66 seconds of escalating absurdity.';

/**
 * Pre-generated behavioral labels for The Office demo.
 * Generated via gpt-4o-mini behavioral analysis, heavily enriched.
 */
export const theOfficeLabels: BehaviorAnalysis = {
  context: theOfficeContext,
  labels: [
    {
      segmentIndex: 0,
      label: 'delegation dodge',
      category: 'evasive',
      detail:
        'Michael opens by trying to push the presentation onto Ryan. This is his core move: avoid work he doesn\'t understand by framing it as an opportunity for someone else.'
    },
    {
      segmentIndex: 9,
      label: 'patient explanation',
      category: 'constructive',
      detail:
        'Ryan\'s longest turn — calmly explaining that the goal is for Michael to understand the system himself. This is the only moment where actual work is being discussed. It is immediately derailed.'
    },
    {
      segmentIndex: 13,
      label: 'correcting the boss',
      category: 'assertive',
      detail:
        'Ryan pivots from business to grammar, correcting Michael\'s "whomever" to "whoever." He\'s technically wrong here (Ryan\'s original usage was correct), but the impulse to correct the boss reveals frustration that has nothing to do with grammar.',
      deception:
        'Presents confident grammatical authority while actually being wrong about his own correction'
    },
    {
      segmentIndex: 15,
      label: 'reflexive loyalty',
      category: 'neutral',
      detail:
        'Dwight immediately takes the opposing side to Ryan — not because he knows the answer, but because defending Michael is his default mode. The grammar is irrelevant; the allegiance is the point.'
    },
    {
      segmentIndex: 17,
      label: 'overconfident generalization',
      category: 'destructive',
      detail:
        '"Whomever is never actually right" — a sweeping claim that is factually wrong. Ryan doubles down when challenged, preferring to be confidently wrong rather than uncertain.',
      deception:
        'States an absolute claim he cannot back up, covering uncertainty with false confidence'
    },
    {
      segmentIndex: 19,
      label: 'social allegiance over truth',
      category: 'neutral',
      detail:
        'Kelly\'s "Michael is right" has nothing to do with grammar — she\'s picking a side based on social hierarchy. Then she escalates with "it\'s a made-up word used to trick students," which is absurd but delivered with total conviction.',
      deception:
        'Treats social loyalty as grammatical expertise — she has no idea which is correct'
    },
    {
      segmentIndex: 21,
      label: 'confident misinformation',
      category: 'neutral',
      detail:
        'Dwight offers "whomever is the formal version of the word" — not quite right, but closer to truth than anyone else at this point. His confidence outpaces his accuracy, which is the entire room\'s problem.'
    },
    {
      segmentIndex: 22,
      label: 'honest admission',
      category: 'constructive',
      detail:
        'Ryan concedes: "Obviously it\'s a real word, but I don\'t know when to use it correctly." The only person in the room willing to admit ignorance — and he started the argument. This is the healthiest moment in the scene.'
    },
    {
      segmentIndex: 25,
      label: 'weaponized withholding',
      category: 'destructive',
      detail:
        'Kelly claims to know the answer but refuses to share because no one came to her band performance. Using knowledge as a bargaining chip for social grievances — petty but revealing about how she experiences the office.'
    },
    {
      segmentIndex: 28,
      label: 'correct answer, wrong audience',
      category: 'constructive',
      detail:
        'Toby provides the actual grammatical rule: "whom when it\'s the object, who when it\'s the subject." He is completely correct and completely ignored. The scene\'s central irony — the person with the answer has the least social capital.'
    },
    {
      segmentIndex: 30,
      label: 'crowd validation',
      category: 'neutral',
      detail:
        'Kevin\'s "that sounds right" is the room\'s consensus mechanism — vibes over analysis. Nobody actually evaluates Toby\'s answer; they just sense it sounds correct.'
    },
    {
      segmentIndex: 31,
      label: 'authority skepticism',
      category: 'assertive',
      detail:
        'Ryan immediately undermines the correct answer with "it sounds right, but is it" — unable to accept truth from a source the group doesn\'t respect. If Toby said the sky was blue, this room would debate it.'
    },
    {
      segmentIndex: 34,
      label: 'self-deprecating deflection',
      category: 'neutral',
      detail:
        '"Ryan used me as an object" — Toby turns the grammar discussion into a dry joke about how he\'s treated. It\'s funny, but underneath it\'s a genuine observation about his status in the office.'
    },
    {
      segmentIndex: 37,
      label: 'rigorous breakdown',
      category: 'constructive',
      detail:
        'Ryan walks through the full grammatical structure: subject, object, indirect object. This is the most intellectually disciplined moment in the scene — he actually works through the logic and arrives at the correct answer: his original "whomever" was right.'
    },
    {
      segmentIndex: 45,
      label: 'hostile dismissal',
      category: 'destructive',
      detail:
        '"No one asked you anything ever" — Dwight\'s attack on Toby is disproportionate and personal. The grammar debate was already resolved; this is pure social aggression from someone channeling Michael\'s contempt.'
    },
    {
      segmentIndex: 47,
      label: 'violent threat as comedy',
      category: 'destructive',
      detail:
        'The letter opener threat is played for laughs, but it\'s Michael speaking through Dwight: the person who was right gets punished for being right. In any real workplace, this would be a serious HR issue — which is ironic because Toby is HR.'
    },
    {
      segmentIndex: 48,
      label: 'exhausted surrender',
      category: 'evasive',
      detail:
        '"This doesn\'t matter" — Ryan abandons the argument entirely. After proving the grammar was correct all along, he recognizes that being right is irrelevant in this office. The original work task is long forgotten.'
    }
  ],
  emotions: [
    {
      segmentIndex: 0,
      emotion: 'avoidant',
      surface: 'casual',
      trigger:
        'the presentation requires knowledge Michael doesn\'t have — easier to delegate than to learn'
    },
    {
      segmentIndex: 9,
      emotion: 'frustrated',
      surface: 'patient',
      trigger:
        'Ryan has explained this before — the measured tone masks accumulated exasperation'
    },
    {
      segmentIndex: 13,
      emotion: 'irritated',
      surface: 'matter-of-fact',
      trigger:
        'the grammar correction is a displacement for broader frustration with Michael\'s incompetence'
    },
    {
      segmentIndex: 15,
      emotion: 'protective',
      trigger:
        'Dwight\'s instinct to defend Michael overrides any actual opinion about grammar'
    },
    {
      segmentIndex: 20,
      emotion: 'confident',
      surface: 'authoritative',
      trigger:
        'Kelly presents complete nonsense with the certainty of an expert — she genuinely believes social intuition equals knowledge'
    },
    {
      segmentIndex: 22,
      emotion: 'humbled',
      trigger:
        'Ryan realizes he started an argument he can\'t finish — the admission of ignorance is genuine and momentarily vulnerable'
    },
    {
      segmentIndex: 25,
      emotion: 'resentful',
      surface: 'playful',
      trigger:
        'the band snub is a real wound — Kelly uses humor to express hurt she can\'t voice directly'
    },
    {
      segmentIndex: 28,
      emotion: 'calm',
      trigger:
        'Toby states the correct answer without drama — he\'s used to not being heard'
    },
    {
      segmentIndex: 34,
      emotion: 'resigned',
      surface: 'dry humor',
      trigger:
        'making a joke about his own marginalization — the sadness is real but packaged as wit'
    },
    {
      segmentIndex: 37,
      emotion: 'determined',
      trigger:
        'Ryan locks in to prove the grammar — this is intellectual pride refusing to let go'
    },
    {
      segmentIndex: 45,
      emotion: 'hostile',
      surface: 'dismissive',
      trigger:
        'Dwight channels Michael\'s contempt for Toby — the aggression is borrowed authority'
    },
    {
      segmentIndex: 48,
      emotion: 'defeated',
      surface: 'casual',
      trigger:
        'the correct answer changed nothing — Ryan surrenders to the absurdity'
    }
  ],
  summary:
    'A 66-second grammar argument that is really about power, loyalty, and who gets to be right. Ryan starts correctly, talks himself into being wrong, then works his way back to being right — and nobody cares. Dwight defends Michael reflexively, Kelly weaponizes a band grievance, and Toby provides the correct answer only to be threatened with a letter opener. The original work task (a presentation) is never mentioned again. The scene is a perfect miniature of office dynamics: competence is irrelevant, social hierarchy determines truth, and the person who actually knows the answer has the least power.',
  notes: [
    {
      heading: 'Competence ≠ authority',
      body: 'The central irony of this scene: Toby (Speaker F) provides the correct grammatical rule immediately and clearly. He is ignored, dismissed, and ultimately threatened. In an office where social hierarchy determines whose opinion counts, being right is not enough — you also need status. A facilitator should ensure that correct information is acknowledged regardless of its source.',
      addressedTo: 'facilitator'
    },
    {
      heading: 'The admission that matters',
      body: 'You started the grammar argument, escalated it with a false absolute ("whomever is never actually right"), and then did something rare: you admitted you didn\'t know. That moment of honesty was more valuable than the correct answer you eventually provided. The willingness to be wrong publicly is a genuine strength — lean into it instead of leading with overconfidence.',
      addressedTo: 'Speaker B'
    },
    {
      heading: 'Loyalty is not agreement',
      body: 'Dwight (Speaker D) defends Michael\'s position reflexively — not because he understands the grammar, but because defending the boss is his identity. This kind of automatic allegiance feels supportive but actually undermines the group: it adds noise, entrenches wrong answers, and in this case ends with a violent threat against the person who was right. Real loyalty would be helping Michael learn, not shielding him from correction.',
      addressedTo: 'Speaker D'
    },
    {
      heading: 'Grievances are real even when petty',
      body: 'Kelly\'s (Speaker E) refusal to share knowledge because nobody came to her band show reads as petty — and it is. But the underlying feeling is real: she doesn\'t feel valued by her colleagues. The band grievance is a proxy for a deeper sense of being ignored. Addressing the small stuff (showing interest in each other\'s lives) prevents it from weaponizing the big stuff (withholding helpful information).',
      addressedTo: 'Speaker E'
    },
    {
      heading: 'The forgotten task',
      body: 'The scene opens with an actual work question — who should do the presentation? — and it is abandoned within 10 seconds, never to return. The grammar debate consumes everyone because arguing about who is right is more engaging than doing actual work. This is the office\'s core dysfunction: the drama is always more interesting than the job.',
      addressedTo: 'all'
    }
  ]
};
