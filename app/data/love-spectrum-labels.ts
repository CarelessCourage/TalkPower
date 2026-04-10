import type { BehaviorAnalysis } from '~/types/meeting';

/** Demo context prompt for the Love on the Spectrum first-date lunch. */
export const loveSpectrumContext =
  'This is a first date between two young adults with disabilities (one with autism, one with a syndrome) from the show Love on the Spectrum. They are having lunch together. Speaker A is very talkative and takes the lead; Speaker B/C are quieter and respond briefly. Look for healthy social behaviors, emotional vulnerability, power dynamics in who controls the conversation, and any moments of genuine connection or discomfort. This is a wholesome and tender scene — flag the warmth alongside the asymmetry.';

/**
 * Pre-generated behavioral labels for the Love on the Spectrum demo.
 * Generated via gpt-4o-mini behavioral analysis, enriched with additional labels.
 */
export const loveSpectrumLabels: BehaviorAnalysis = {
  context: loveSpectrumContext,
  labels: [
    {
      segmentIndex: 0,
      label: 'direct inquiry',
      category: 'assertive',
      detail:
        "Opens the date by asking directly about the other person's disability — skipping small talk entirely. Blunt but genuine; there is no malice, just curiosity without social filtering."
    },
    {
      segmentIndex: 4,
      label: 'sharing vulnerability',
      category: 'constructive',
      detail:
        'Shifts to a heavier topic — bullying — within the first minute. This is a bid for emotional connection: "have you experienced what I have?" The willingness to go deep early signals trust.'
    },
    {
      segmentIndex: 7,
      label: 'self-disclosure',
      category: 'constructive',
      detail:
        'Shares a personal bullying experience and admits to crying. Modeling vulnerability without shame — rare and valuable in any conversation, let alone a first date.'
    },
    {
      segmentIndex: 8,
      label: 'testing boundaries',
      category: 'neutral',
      detail:
        'Asks if she has ever punched someone when angry. The question is jarring but comes from a place of processing his own experience with anger, not aggression.'
    },
    {
      segmentIndex: 12,
      label: 'reassurance giving',
      category: 'constructive',
      detail:
        '"That\'s okay. It happens sometimes when we\'re little." Immediately normalizes and comforts after a potentially awkward question — showing emotional generosity.'
    },
    {
      segmentIndex: 20,
      label: 'leading the conversation',
      category: 'assertive',
      detail:
        '"I think we should say a prayer before we eat." Takes full control of the date\'s rhythm — the other person is given no real choice, just informed of what will happen.'
    },
    {
      segmentIndex: 22,
      label: 'emotional openness',
      category: 'constructive',
      detail:
        "The prayer is unscripted and personal — thanking God for the date, asking for his mother's safety. This moment is the emotional center of the clip: unselfconscious sincerity."
    },
    {
      segmentIndex: 24,
      label: 'care for absent loved one',
      category: 'constructive',
      detail:
        '"I pray that you keep mommy safe wherever she is right now." In the middle of a date, his mind goes to his mother. The vulnerability is striking — no performance, just genuine feeling.'
    },
    {
      segmentIndex: 37,
      label: 'discovery question',
      category: 'assertive',
      detail:
        '"Have you ever been on a date before?" Continues the pattern of direct, unfiltered questions. Each one deepens the conversation — even if the delivery is one-sided.'
    },
    {
      segmentIndex: 40,
      label: 'mutual discovery',
      category: 'constructive',
      detail:
        "They both realize neither has been on a date before — talking over each other in excitement. The overlap is not interruption; it's two people recognizing a shared experience simultaneously."
    },
    {
      segmentIndex: 48,
      label: 'sharing preferences',
      category: 'constructive',
      detail:
        'Opens up about what he wants in a partner — "a girl that\'s a Christian, very talkative, very beautiful and pretty." Unguarded and earnest, modeling how to express desires without pretense.'
    },
    {
      segmentIndex: 52,
      label: 'projecting preferences',
      category: 'neutral',
      detail:
        '"Do you want the boy to be very talkative?" Assumes his own preferences map onto hers. Well-intentioned but reveals the asymmetry: he is leading and she is following.'
    },
    {
      segmentIndex: 54,
      label: 'gentle compliment framing',
      category: 'constructive',
      detail:
        '"Do you want to be a boy that\'s very handsome?" Wraps a compliment inside a question — sweet but also reveals he\'s coaching the conversation toward mutual affirmation.'
    }
  ],
  emotions: [
    {
      segmentIndex: 0,
      emotion: 'curious',
      trigger:
        'unprovoked — genuine desire to understand who he is having lunch with'
    },
    {
      segmentIndex: 4,
      emotion: 'vulnerable',
      surface: 'calm',
      trigger:
        'the bullying question is emotionally loaded but delivered matter-of-factly, masking how personal it is'
    },
    {
      segmentIndex: 7,
      emotion: 'sad',
      surface: 'matter-of-fact',
      trigger:
        'recounting being bullied and crying — the memory hurts but he has processed it enough to share plainly'
    },
    {
      segmentIndex: 12,
      emotion: 'compassionate',
      trigger:
        'her "no" answer prompts immediate reassurance — he does not want her to feel bad about any answer'
    },
    {
      segmentIndex: 22,
      emotion: 'reverent',
      trigger:
        'the prayer is emotionally raw — sincerely grateful for the day and the date'
    },
    {
      segmentIndex: 24,
      emotion: 'tender',
      trigger:
        'thinking of his mother mid-prayer — the love is uncontained and spills into the date naturally'
    },
    {
      segmentIndex: 37,
      emotion: 'confident',
      surface: 'calm',
      trigger:
        'asking about dating history could be nervous territory but he treats it as just another honest question'
    },
    {
      segmentIndex: 40,
      emotion: 'excited',
      trigger:
        'the overlapping speech reveals genuine delight — they are both first-timers and the shared discovery creates a spark'
    },
    {
      segmentIndex: 48,
      emotion: 'hopeful',
      trigger:
        'describing an ideal partner with specific, earnest criteria — looking forward rather than backward'
    },
    {
      segmentIndex: 57,
      emotion: 'content',
      trigger:
        '"And that\'s good." A simple, satisfied conclusion — he feels the date went well'
    }
  ],
  summary:
    'A remarkably tender first date where Speaker A dominates the conversation — asking every question, choosing to pray, directing the flow — while Speaker B/C mostly respond with one-word answers. The asymmetry could read as controlling, but in context it is closer to enthusiasm: Speaker A is doing the emotional labor of keeping the date alive, and doing it with striking sincerity. The prayer is the emotional peak — raw, personal, and completely unselfconscious. The discovery that neither has dated before creates the most genuinely mutual moment. The power dynamic is lopsided but warm.',
  notes: [
    {
      heading: 'Enthusiasm is not control',
      body: 'Speaker A dominates the conversation almost completely — asking every question, choosing the prayer topic, directing the flow of the meal. In most contexts this would be a red flag for controlling behavior. Here it reads differently: Speaker A is doing the social heavy-lifting because the alternative is silence. His energy fills the gaps rather than crowding out anyone who wanted to speak. A facilitator should still gently encourage Speaker B/C to initiate topics when comfortable.',
      addressedTo: 'facilitator'
    },
    {
      heading: 'Vulnerability as connection',
      body: "You shared about being bullied, about crying, about your mother — all within a few minutes of meeting someone new. That kind of openness is unusual and valuable. Not everyone will match it, and that's okay. The fact that you can be this sincere without performing is a genuine strength. Keep modeling it.",
      addressedTo: 'Speaker A'
    },
    {
      heading: 'The prayer moment',
      body: 'The spontaneous prayer was the most emotionally honest moment in the conversation. It revealed priorities (faith, family, safety), demonstrated comfort with silence, and gave the date a shared ritual. The mention of "mommy" grounded the date in real life — this is a person with a full emotional world, not just a participant in a TV show.',
      addressedTo: 'facilitator'
    },
    {
      heading: 'Finding your voice',
      body: "You were mostly quiet — and that's perfectly okay. First dates are nerve-wracking, especially the actual first one. But when you did speak (\"It's my first time\"), it created the best moment of the conversation. Your words have weight precisely because you use them sparingly. As you get more comfortable, try sharing one thing you're excited about — you don't need to match his energy, just add your own.",
      addressedTo: 'Speaker C'
    }
  ],
  speakerNames: {
    'Speaker A': 'Subodh',
    'Speaker B': 'Waitress',
    'Speaker C': 'Kate'
  },
  coaching: [
    {
      start: 0,
      end: 5,
      text: "Opening with a direct personal question — that takes courage. He's leading with vulnerability, which sets a tone of honesty for the whole date.",
      tone: 'praise',
      speaker: 'Speaker A'
    },
    {
      start: 4.7,
      end: 10,
      text: "Asking about bullying so early could feel intense, but he's genuinely trying to understand her experience. The intent is empathy, not interrogation.",
      tone: 'insight',
      speaker: 'Speaker A'
    },
    {
      start: 18,
      end: 25,
      text: "Notice who's doing the emotional labor here — Subodh is asking every question, driving the conversation. Kate's silence isn't disinterest; first dates are terrifying.",
      tone: 'insight'
    },
    {
      start: 34,
      end: 42,
      text: "The spontaneous prayer is the most authentic moment so far. He's completely unselfconscious about his faith. This kind of vulnerability builds real connection.",
      tone: 'praise',
      speaker: 'Speaker A'
    },
    {
      start: 38,
      end: 44,
      text: "'Keep mommy and daddy safe' — he's sharing his deepest priorities: family, faith, safety. This is who he really is, unfiltered.",
      tone: 'insight',
      speaker: 'Speaker A'
    },
    {
      start: 55,
      end: 62,
      text: "Tip for quieter conversationalists: you don't need to match his energy. One genuine question back — 'what do you like most about your job?' — would mean the world.",
      tone: 'tip',
      speaker: 'Speaker C'
    },
    {
      start: 70,
      end: 77,
      text: "'Have you ever been on a date before?' — and the answer creates the most genuinely mutual moment. The shared newness removes the power imbalance entirely.",
      tone: 'praise',
      speaker: 'Speaker A'
    },
    {
      start: 79,
      end: 86,
      text: 'Kate mentioning wanting a Christian partner is her most assertive moment. When she does speak, her words carry weight — because she uses them sparingly.',
      tone: 'praise',
      speaker: 'Speaker C'
    },
    {
      start: 92,
      end: 99,
      text: 'The conversation is winding down warmly. Both people showed up authentically — that matters more than any technique or strategy.',
      tone: 'insight'
    },
    {
      start: 100,
      end: 104,
      text: "Dating takeaway: lead with curiosity, share honestly, and don't be afraid of silence. Subodh did the first two perfectly. Kate owned the third.",
      tone: 'tip'
    }
  ]
};
