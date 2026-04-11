import type { BehaviorAnalysis } from '~/types/meeting';

/** Demo context prompt for the Sir Dunkan clip. */
export const sirDunkanContext =
  "A scene from a medieval film. A young squire, Egg (Speaker A) and an older knight, Dunk (Speaker B), sit together in a quiet moment.\n\nEgg asks Dunk whether he might one day become a knight. Dunk reassures him casually, saying he seems likely enough, and dismisses Egg's worries about being small by saying he'll grow. Egg reflects that people have always told him the same.\nWhen Egg mentions this, Dunk responds offhandedly that people have always told him he was stupid. Egg takes this as an opening and asks what Dunk did about it, hoping for guidance. Dunk, surprised and unprepared to turn his remark into a lesson, reacts defensively and shuts the topic down, insisting his problems are his own.\nEgg, confused, questions whether Dunk is trying to help him at all. Dunk, still not thinking in terms of mentorship, responds bluntly that the only help he can offer is the obvious one: Egg will grow.";

/**
 * Pre-generated behavioral labels for the Sir Dunkan demo.
 * Enriched from gpt-4o-mini analysis.
 */
export const sirDunkanLabels: BehaviorAnalysis = {
  context: sirDunkanContext,
  labels: [
    {
      segmentIndex: 0,
      label: 'hopeful inquiry',
      category: 'constructive',
      detail:
        "\"Do you think I'll ever make a knight one day?\" — Egg opens with his biggest ambition, framed as a question. He's not looking for facts; he's looking for someone to say it's possible. The directness is disarming."
    },
    {
      segmentIndex: 1,
      label: 'casual encouragement',
      category: 'constructive',
      detail:
        '"Sure, why not?" — Dunk answers with easy warmth. The casualness is the point — he makes the dream feel ordinary and achievable rather than grandiose. No ceremony, no hedging.'
    },
    {
      segmentIndex: 3,
      label: 'preemptive self-deprecation',
      category: 'evasive',
      detail:
        '"I\'m a bit puny." — Egg immediately undermines the encouragement he just received. He\'s putting the obvious objection on the table himself — if Dunk still believes in him after hearing it, maybe it\'s really true.'
    },
    {
      segmentIndex: 4,
      label: 'plain reassurance',
      category: 'constructive',
      detail:
        "\"You'll grow.\" — Two words, no hesitation. Dunk doesn't argue or over-explain. He treats the worry as temporary. This brevity carries more conviction than a speech would."
    },
    {
      segmentIndex: 6,
      label: 'revealing a pattern',
      category: 'constructive',
      detail:
        "\"Everyone's always told me so.\" — Egg reveals that being called small isn't just his own worry — it's something others have reinforced, repeatedly. He's sharing this matter-of-factly, trusting Dunk with it."
    },
    {
      segmentIndex: 7,
      label: 'offhand self-disclosure',
      category: 'constructive',
      detail:
        "\"Everyone's always told me I was stupid.\" — This is the scene's pivot. Dunk mirrors Egg's phrasing without thinking about it — a reflexive, offhanded remark, not a deliberate confession. He's commiserating, not opening up. But the 12-second silence that follows suggests he immediately hears how it sounded.",
      deception:
        'The casual delivery disguises the weight of what he just admitted'
    },
    {
      segmentIndex: 8,
      label: 'gentle probe',
      category: 'constructive',
      detail:
        '"Hmm? What?" — After a long silence, Egg responds. He heard what Dunk said and is giving him a chance to continue or clarify. He\'s treating it as an opening for guidance.'
    },
    {
      segmentIndex: 9,
      label: 'defensive deflection',
      category: 'evasive',
      detail:
        '"What?" — Dunk pretends he doesn\'t know what Egg is referring to. He wasn\'t prepared for his offhand remark to be taken as a teaching moment, and now he doesn\'t know what to do with it.'
    },
    {
      segmentIndex: 11,
      label: 'caught off guard',
      category: 'destructive',
      detail:
        '"What business is that of yours?" — Dunk reacts with surprise and defensiveness. He didn\'t mean to invite a conversation about his past, and he\'s not equipped to turn it into a lesson. The sharpness is about being unprepared, not cruelty.'
    },
    {
      segmentIndex: 12,
      label: 'shutting down',
      category: 'destructive',
      detail:
        '"My problems are my own." — Dunk draws a line. He\'s not a man who thinks in terms of mentorship or shared experience. He said something personal by accident and he wants to move past it.'
    },
    {
      segmentIndex: 13,
      label: 'direct request',
      category: 'constructive',
      detail:
        "\"Why don't you try and help me?\" — Egg doesn't retreat. He pushes through the defensiveness with a straightforward ask. He's confused — Dunk has been kind and encouraging, so why the sudden wall? He's asking for the relationship to continue."
    },
    {
      segmentIndex: 15,
      label: 'blunt callback',
      category: 'evasive',
      detail:
        "\"Grow?\" — Dunk collapses the emotional weight of the moment into a one-word callback to their earlier exchange about being puny. He's not being clever or cruel — he genuinely doesn't know what other help to offer. It's the most honest thing he's said: the only advice he has is \"keep going.\""
    }
  ],
  emotions: [
    {
      segmentIndex: 0,
      emotion: 'hopeful',
      trigger: 'asking about his dream',
      surface: 'casual curiosity'
    },
    {
      segmentIndex: 3,
      emotion: 'insecure',
      trigger: 'internalized criticism from others',
      surface: 'self-aware frankness'
    },
    {
      segmentIndex: 6,
      emotion: 'resigned acceptance',
      trigger: 'recalling years of being told the same thing',
      surface: 'matter-of-fact tone'
    },
    {
      segmentIndex: 7,
      emotion: 'unguarded',
      trigger: "reflexive commiseration with Egg's experience",
      surface: 'offhand delivery'
    },
    {
      segmentIndex: 8,
      emotion: 'curious',
      trigger: "hearing Dunk's accidental admission",
      surface: 'gentle prompting'
    },
    {
      segmentIndex: 9,
      emotion: 'caught off guard',
      trigger: 'realizing his remark was taken seriously',
      surface: 'feigned confusion'
    },
    {
      segmentIndex: 11,
      emotion: 'defensive surprise',
      trigger: "Egg pressing on something Dunk didn't mean to share",
      surface: 'sharp dismissal'
    },
    {
      segmentIndex: 13,
      emotion: 'confused frustration',
      trigger: 'being shut out after being encouraged',
      surface: 'direct challenge'
    },
    {
      segmentIndex: 15,
      emotion: 'blunt simplicity',
      trigger: 'not knowing what else to offer',
      surface: 'dry flatness'
    }
  ],
  summary:
    "A 45-second exchange that reveals two people who almost connect but don't quite know how. Egg opens with hope, shares his insecurity, and looks for guidance. Dunk starts warm and encouraging, then accidentally says something personal — and spends the rest of the scene trying to walk it back. He wasn't trying to mentor; he was just talking. When Egg treats the remark as an opening, Dunk has nothing prepared. \"Grow?\" at the end isn't a joke or a deflection — it's the only advice he actually has. The scene is about the gap between wanting to help and knowing how.",
  notes: [
    {
      heading: 'The accidental parallel',
      body: "The scene turns on a structural echo: \"everyone's always told me [I was puny]\" / \"everyone's always told me I was stupid.\" Egg shares deliberately. Dunk mirrors the phrasing without thinking. The result is a moment that feels like mutual disclosure — but only one of them meant it that way. Egg hears a mentor opening up. Dunk hears himself saying too much.",
      addressedTo: 'all'
    },
    {
      heading: 'You read the room right',
      body: "When Dunk said something personal, you didn't laugh or push too hard — you asked a practical follow-up: what did he do about it? That's exactly the right instinct. You were looking for a survival guide from someone who made it through. The fact that he shut it down doesn't mean you were wrong to ask.",
      addressedTo: 'Speaker A'
    },
    {
      heading: "You weren't ready for the question",
      body: "\"Everyone's always told me I was stupid\" slipped out — you weren't trying to teach a lesson. When Egg asked what you did about it, you didn't have an answer prepared, so you shut it down. That's understandable. But from Egg's side, you went from warm encouragement to a wall in ten seconds. He's not prying — he's treating you like someone worth learning from.",
      addressedTo: 'Speaker B'
    },
    {
      heading: 'The silence matters',
      body: "The 12-second gap between segment 7 and segment 8 is the longest pause in the scene. Dunk said something unplanned. Egg is processing it. In that silence, both of them are figuring out what just happened — and they arrive at different conclusions. Egg thinks it's an invitation. Dunk thinks it's a mistake.",
      addressedTo: 'all'
    },
    {
      heading: '"Grow?" is all he has',
      body: "The final word callbacks to the earlier exchange about being puny. It's not a deflection or a joke — it's Dunk being honest about the limits of what he can offer. He's not a teacher. He doesn't have wisdom to dispense. The only thing he knows for certain is that the boy will get bigger. In its own blunt way, that might be enough.",
      addressedTo: 'all'
    }
  ],
  coaching: [
    {
      start: 0,
      end: 3,
      text: 'Opening with your biggest hope takes nerve. Framing it as a question shows you want honest feedback, not just reassurance.',
      tone: 'praise',
      speaker: 'Speaker A'
    },
    {
      start: 2.8,
      end: 6,
      text: '"Sure, why not?" — Perfect tone. The casualness makes the dream feel normal and reachable. This is how you encourage without making it a big deal.',
      tone: 'praise',
      speaker: 'Speaker B'
    },
    {
      start: 5,
      end: 9,
      text: "Naming your own weakness right after encouragement — you're putting the hardest objection on the table yourself. If he still believes in you after this, it means something.",
      tone: 'insight',
      speaker: 'Speaker A'
    },
    {
      start: 10,
      end: 17,
      text: "That remark slipped out. You weren't trying to open up — but Egg heard it as a shared experience. Now you have a choice: lean in or shut down.",
      tone: 'warning',
      speaker: 'Speaker B'
    },
    {
      start: 17,
      end: 31,
      text: '12 seconds of silence. Something landed and both of you know it. One of you thinks a door opened. The other wishes he could close it.',
      tone: 'insight'
    },
    {
      start: 31,
      end: 35,
      text: "Asking \"what did he do about it?\" is practical and smart — you're not digging into his feelings, you're looking for a strategy. That's exactly the right question.",
      tone: 'praise',
      speaker: 'Speaker A'
    },
    {
      start: 36,
      end: 40,
      text: '"What business is that of yours?" — You\'re caught off guard, not angry. But from his perspective, you just went from warm to cold in ten seconds. He doesn\'t understand the switch.',
      tone: 'warning',
      speaker: 'Speaker B'
    },
    {
      start: 41,
      end: 43.5,
      text: "He shut you down and you still asked for help directly. That's persistence, not pushiness.",
      tone: 'praise',
      speaker: 'Speaker A'
    },
    {
      start: 43,
      end: 45.2,
      text: '"Grow?" — You don\'t have wisdom to offer, so you offer the one thing you\'re sure of. It\'s not poetry, but it\'s honest.',
      tone: 'insight',
      speaker: 'Speaker B'
    }
  ],
  speakerNames: {
    'Speaker A': 'Egg',
    'Speaker B': 'Dunk'
  }
};
