import type { BehaviorAnalysis } from '~/types/meeting';

/** Demo context prompt for the Sir Dunkan clip. */
export const sirDunkanContext =
  "A scene from a medieval film. A young squire (Speaker A) and an older knight, Sir Dunkan (Speaker B), sit together in a quiet moment. The squire dreams of becoming a knight but is deeply insecure about being small and puny. Sir Dunkan is gruff and kind in turns — he encourages the boy, then accidentally reveals his own lifelong wound: being told he was stupid. A long silence follows. When the squire gently presses, the knight deflects with defensive gruffness. The scene is a study in mirrored insecurity, mentorship, and the difficulty of opening up — two people bonded by shame who almost connect but can't quite get there.";

/**
 * Pre-generated behavioral labels for the Sir Dunkan demo.
 * Enriched from gpt-4o-mini analysis.
 */
export const sirDunkanLabels: BehaviorAnalysis = {
  context: sirDunkanContext,
  labels: [
    {
      segmentIndex: 0,
      label: 'vulnerable inquiry',
      category: 'constructive',
      detail:
        "\"Do you think I'll ever make a knight one day?\" — The squire opens with his deepest hope, framed as a question. He's not asking for facts; he's asking for permission to dream. This is brave for someone who clearly expects to be told no."
    },
    {
      segmentIndex: 1,
      label: 'casual encouragement',
      category: 'constructive',
      detail:
        '"Sure, why not?" — Sir Dunkan answers with easy warmth. The casualness is the point — he makes the dream feel normal and achievable rather than grandiose. This is exactly how a good mentor disarms insecurity.'
    },
    {
      segmentIndex: 3,
      label: 'preemptive self-deprecation',
      category: 'evasive',
      detail:
        '"I\'m a bit puny." — The squire immediately undermines the encouragement he just received. He\'s testing whether the knight will still believe in him after hearing the worst. This is classic insecurity behaviour: reject yourself before someone else can.'
    },
    {
      segmentIndex: 4,
      label: 'matter-of-fact reassurance',
      category: 'constructive',
      detail:
        "\"You'll grow.\" — Two words, no hesitation. Sir Dunkan doesn't argue or over-explain. He treats the boy's worry as simply temporary. This brevity carries more conviction than a speech would."
    },
    {
      segmentIndex: 6,
      label: 'escalating vulnerability',
      category: 'constructive',
      detail:
        "\"Everyone's always told me so.\" — The squire reveals the wound beneath the insecurity: it's not just that he feels small, it's that other people have confirmed it, repeatedly. He's trusting the knight with something painful."
    },
    {
      segmentIndex: 7,
      label: 'accidental self-disclosure',
      category: 'constructive',
      detail:
        "\"Everyone's always told me I was stupid.\" — This is the scene's pivot. Sir Dunkan mirrors the squire's confession without meaning to. The parallel structure (\"everyone's always told me...\") suggests he's responding from empathy, not strategy. He's momentarily unguarded — and the 12-second silence that follows tells us he immediately regrets it.",
      deception:
        "The gruff delivery disguises the fact that this is one of the most vulnerable things he's ever said aloud"
    },
    {
      segmentIndex: 8,
      label: 'gentle probe',
      category: 'constructive',
      detail:
        '"Hmm? What?" — After a 12-second silence, the squire responds. The softness here matters. He heard what the knight said and is giving him a chance to either repeat it or take it back. It\'s emotionally intelligent for someone so young.'
    },
    {
      segmentIndex: 9,
      label: 'defensive deflection',
      category: 'evasive',
      detail:
        '"What?" — Sir Dunkan pretends he doesn\'t know what the squire is referring to. This is a door closing. He\'s had 12 seconds to realize what he revealed and he wants to un-say it.'
    },
    {
      segmentIndex: 11,
      label: 'defensive dismissal',
      category: 'destructive',
      detail:
        '"What business is that of yours?" — The warmth is gone. Sir Dunkan shifts to authority and distance. This is a man who has spent decades protecting this wound, and a child just walked right up to it. The aggression is proportional to the vulnerability.'
    },
    {
      segmentIndex: 12,
      label: 'stonewalling',
      category: 'destructive',
      detail:
        '"My problems are my own." — A wall goes up. This is the knight\'s core belief: suffering is private, weakness is shameful. He doesn\'t realize that five seconds ago he was doing exactly what the squire needed — showing that even knights carry wounds.'
    },
    {
      segmentIndex: 13,
      label: 'plea for mentorship',
      category: 'constructive',
      detail:
        "\"Why don't you try and help me?\" — The squire doesn't retreat. He pushes through the knight's defensiveness with a direct request. This takes real courage — he's been shut down and he's still asking. He's not asking about the stupidity; he's asking for the relationship."
    },
    {
      segmentIndex: 15,
      label: 'deflection through humour',
      category: 'evasive',
      detail:
        "\"Grow?\" — Sir Dunkan collapses the emotional weight of the moment into a one-word callback to their earlier exchange about being puny. It's funny, it's deflective, and it's sad. He can't quite bring himself to be the mentor the boy needs, so he retreats to safe ground."
    }
  ],
  emotions: [
    {
      segmentIndex: 0,
      emotion: 'anxious hope',
      trigger: 'asking about his dream',
      surface: 'casual curiosity'
    },
    {
      segmentIndex: 3,
      emotion: 'deep insecurity',
      trigger: 'internalized criticism from others',
      surface: 'self-aware humour'
    },
    {
      segmentIndex: 6,
      emotion: 'quiet pain',
      trigger: 'recalling years of being diminished',
      surface: 'matter-of-fact tone'
    },
    {
      segmentIndex: 7,
      emotion: 'raw vulnerability',
      trigger: "empathic mirroring of the squire's confession",
      surface: 'gruff nonchalance'
    },
    {
      segmentIndex: 8,
      emotion: 'tender concern',
      trigger: "hearing the knight's pain",
      surface: 'confused surprise'
    },
    {
      segmentIndex: 9,
      emotion: 'regret and panic',
      trigger: 'realizing what he just revealed',
      surface: 'feigned confusion'
    },
    {
      segmentIndex: 11,
      emotion: 'shame-driven anger',
      trigger: 'the squire pressing on his wound',
      surface: 'authoritative dismissal'
    },
    {
      segmentIndex: 13,
      emotion: 'desperate courage',
      trigger: 'being shut out by someone he admires',
      surface: 'direct frustration'
    },
    {
      segmentIndex: 15,
      emotion: 'bittersweet deflection',
      trigger: 'unable to be vulnerable again',
      surface: 'dry wit'
    }
  ],
  summary:
    "A 45-second scene that contains an entire relationship. The squire opens with hope, reveals insecurity, and asks to be seen. The knight starts warm, accidentally reveals a matching wound, then spends the rest of the scene trying to un-reveal it. The 12-second silence after \"everyone's always told me I was stupid\" is the emotional centre — it's the moment where real connection was possible. The knight's retreat into gruffness isn't cruelty; it's a lifetime habit of protecting himself. The squire's refusal to retreat (\"why don't you try and help me?\") is the bravest moment in the scene. And \"Grow?\" at the end is simultaneously a joke, a deflection, and — maybe — a tiny door left open.",
  notes: [
    {
      heading: 'The mirror structure',
      body: 'The scene is built on a perfect parallel: "everyone\'s always told me [I was puny]" / "everyone\'s always told me I was stupid." Both characters carry the same wound — being diminished by others — but they can\'t quite use it to connect. The squire is open enough to try. The knight is too defended. This is the tragedy of the scene: the thing they share is the thing that could bond them, but it\'s also the thing neither knows how to talk about.',
      addressedTo: 'all'
    },
    {
      heading: 'Your instinct to help was right',
      body: "When you heard his confession and gently asked \"what?\" instead of pushing or laughing, that was exactly right. And when he shut you down, you didn't give up — you asked to be helped. That persistence shows more strength than any knight's armour. The fact that he deflected doesn't mean you failed. It means he's not ready yet.",
      addressedTo: 'Speaker A'
    },
    {
      heading: 'You showed him the way and then closed the door',
      body: '"Everyone\'s always told me I was stupid" was a gift. In that moment, the boy saw that even a knight carries scars — and that made his own scars feel survivable. But then you retreated. "My problems are my own" isn\'t strength, it\'s habit. The boy wasn\'t asking to fix your problems. He was asking you to show him that problems can be survived. You almost did.',
      addressedTo: 'Speaker B'
    },
    {
      heading: 'The silence says everything',
      body: "The 12-second gap between segment 7 and segment 8 is the emotional core of this scene. Sir Dunkan said something he never says. The squire heard it. Both of them sat with it. In that silence, the knight was deciding whether to keep going or shut down. He chose to shut down — but the fact that he hesitated for 12 full seconds means the door isn't locked.",
      addressedTo: 'all'
    },
    {
      heading: '"Grow?" is not just a joke',
      body: 'The final word callbacks to the opening exchange about being puny. On the surface it\'s a deflection — the knight retreating to safe ground. But it\'s also the only advice he knows how to give: keep going, get bigger, survive. In his own clumsy way, this might be Sir Dunkan saying "I believe in you" for the second time, just in a language he can handle.',
      addressedTo: 'all'
    }
  ],
  coaching: [
    {
      start: 0,
      end: 3,
      text: "Opening with your deepest hope takes courage. Framing it as a question shows you're asking for belief, not just information.",
      tone: 'praise',
      speaker: 'Speaker A'
    },
    {
      start: 2.8,
      end: 6,
      text: '"Sure, why not?" — Perfect. The casualness makes the dream feel normal. This is how you encourage without making it a big deal.',
      tone: 'praise',
      speaker: 'Speaker B'
    },
    {
      start: 5,
      end: 9,
      text: "Self-deprecation right after encouragement. You're testing whether he'll still believe in you after seeing the worst. Notice how you're rejecting yourself before he can.",
      tone: 'insight',
      speaker: 'Speaker A'
    },
    {
      start: 10,
      end: 17,
      text: "He shared his wound. You just shared yours — accidentally. The parallel confession is the most connective moment in this conversation. Don't run from it.",
      tone: 'warning',
      speaker: 'Speaker B'
    },
    {
      start: 17,
      end: 31,
      text: '12 seconds of silence. Something important just happened and both of you know it. This is the moment where the relationship could deepen or close off.',
      tone: 'insight'
    },
    {
      start: 31,
      end: 35,
      text: 'Asking "what did he do?" is emotionally brilliant — you\'re not interrogating, you\'re looking for a survival guide from someone who made it through.',
      tone: 'praise',
      speaker: 'Speaker A'
    },
    {
      start: 36,
      end: 40,
      text: 'The wall is going up. "What business is that of yours?" and "my problems are my own" — this is shame talking, not strength. You\'re two sentences away from losing his trust.',
      tone: 'warning',
      speaker: 'Speaker B'
    },
    {
      start: 41,
      end: 43.5,
      text: "He shut you down and you still asked for help. That's not weakness — that's the most knightly thing anyone's done in this scene.",
      tone: 'praise',
      speaker: 'Speaker A'
    },
    {
      start: 43,
      end: 45.2,
      text: '"Grow?" — A joke, a deflection, and maybe a tiny promise all in one word. You couldn\'t say "I\'ll help you" directly, but the callback to "you\'ll grow" says it sideways.',
      tone: 'insight',
      speaker: 'Speaker B'
    }
  ],
  speakerNames: {
    'Speaker A': 'Squire',
    'Speaker B': 'Sir Dunkan'
  }
};
