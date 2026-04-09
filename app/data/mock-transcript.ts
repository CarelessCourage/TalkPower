import type { TranscriptResponse } from '~/types/meeting';

/**
 * Simulated 4-person budget meeting (~3 minutes) that escalates into a heated argument.
 * Speaker A (VP) wants to cut Speaker D's team budget.
 * Speaker B (Finance) backs A with numbers.
 * Speaker C (HR) tries to mediate but gets talked over.
 * Speaker D (Engineering lead) fights back — lots of interruptions and raised voices.
 */
export const mockTranscript: TranscriptResponse = {
  duration: 192,
  text: '',
  segments: [
    {
      speaker: 'Speaker A',
      text: "Okay, we need to finalize the Q3 budget allocations today. No more delays. I've already flagged engineering as over-budget by eighteen percent.",
      start: 0,
      end: 7.8
    },
    {
      speaker: 'Speaker D',
      text: 'Wait, eighteen percent? Where is that number coming from? We agreed to the expanded scope in—',
      start: 8.1,
      end: 14.0
    },
    {
      speaker: 'Speaker A',
      text: "It's coming from the actuals, which I sent out last week. You're burning through contractor hours faster than any other department.",
      start: 12.8,
      end: 19.5
    },
    {
      speaker: 'Speaker D',
      text: 'Because you approved those contractors! You sat in this room and said we needed to accelerate—',
      start: 18.5,
      end: 24.0
    },
    {
      speaker: 'Speaker A',
      text: 'I approved a temporary ramp, not permanent headcount. That was supposed to end in April.',
      start: 22.8,
      end: 28.8
    },
    {
      speaker: 'Speaker B',
      text: 'If I can jump in with the numbers — engineering is at one point four million against a one point two budget. That gap is real.',
      start: 29.5,
      end: 36.8
    },
    {
      speaker: 'Speaker D',
      text: 'Of course the gap is real because the scope tripled! We took on the platform migration that nobody else wanted to—',
      start: 35.5,
      end: 42.5
    },
    {
      speaker: 'Speaker A',
      text: 'Nobody forced you to take that on. You volunteered.',
      start: 41.2,
      end: 45.0
    },
    {
      speaker: 'Speaker D',
      text: 'Are you serious right now? You literally sent me an email saying, and I quote, make this your top priority.',
      start: 43.8,
      end: 50.8
    },
    {
      speaker: 'Speaker C',
      text: "Hey, let's try to keep this—",
      start: 51.0,
      end: 53.2
    },
    {
      speaker: 'Speaker A',
      text: "The point is we need to cut two hundred K from somewhere. Engineering is the obvious place. The numbers don't lie.",
      start: 51.8,
      end: 58.5
    },
    {
      speaker: 'Speaker D',
      text: "Cut two hundred K? That's three engineers. You want me to ship the platform migration with three fewer people?",
      start: 57.2,
      end: 64.0
    },
    {
      speaker: 'Speaker A',
      text: 'I want you to ship it on budget. Figure it out.',
      start: 62.5,
      end: 66.5
    },
    {
      speaker: 'Speaker D',
      text: "Figure it out? That's your management strategy? Just figure it out?",
      start: 65.2,
      end: 70.0
    },
    {
      speaker: 'Speaker C',
      text: 'Can we just take a step back for a second? I think—',
      start: 70.3,
      end: 73.5
    },
    {
      speaker: 'Speaker A',
      text: "No, we're not stepping back. We've been stepping back for three months and the budget is still blown.",
      start: 72.0,
      end: 78.0
    },
    {
      speaker: 'Speaker B',
      text: 'There might be a middle ground. If we defer the analytics module to Q4, that frees up about ninety K in contractor costs.',
      start: 79.0,
      end: 86.0
    },
    {
      speaker: 'Speaker D',
      text: 'The analytics module that the CEO specifically asked for by September?',
      start: 86.3,
      end: 90.5
    },
    {
      speaker: 'Speaker A',
      text: "I'll handle the CEO. That's not your concern.",
      start: 89.2,
      end: 92.5
    },
    {
      speaker: 'Speaker D',
      text: 'It is absolutely my concern when my team gets blamed for—',
      start: 91.3,
      end: 95.5
    },
    {
      speaker: 'Speaker A',
      text: "Your team isn't getting blamed, they're being held accountable. There's a difference.",
      start: 94.2,
      end: 99.5
    },
    {
      speaker: 'Speaker D',
      text: 'Accountable for scope that was dumped on us without resources! This is—',
      start: 98.2,
      end: 103.0
    },
    {
      speaker: 'Speaker A',
      text: "Enough. I've heard the argument. You've made your point.",
      start: 101.5,
      end: 106.0
    },
    {
      speaker: 'Speaker C',
      text: 'I really think we should hear everyone out here. The team morale data from last month showed—',
      start: 107.0,
      end: 113.0
    },
    {
      speaker: 'Speaker A',
      text: "Morale data? We're talking about two hundred thousand dollars, not a feelings survey.",
      start: 111.5,
      end: 117.0
    },
    {
      speaker: 'Speaker C',
      text: "It's not a feelings survey, it's attrition risk. If we gut the engineering team right before a major—",
      start: 117.3,
      end: 123.0
    },
    {
      speaker: 'Speaker B',
      text: 'She has a point actually. Replacing a senior engineer costs roughly one-fifty K when you factor in recruiting and ramp time.',
      start: 123.5,
      end: 130.5
    },
    {
      speaker: 'Speaker A',
      text: "That's a hypothetical cost. The budget overrun is real money, right now, today.",
      start: 131.0,
      end: 136.0
    },
    {
      speaker: 'Speaker D',
      text: "It's not hypothetical. Two of my seniors already have offers from other companies. You cut this budget and they're gone by August.",
      start: 135.0,
      end: 143.5
    },
    {
      speaker: 'Speaker A',
      text: "Then they're gone. We'll backfill. This isn't a negotiation.",
      start: 142.0,
      end: 147.0
    },
    {
      speaker: 'Speaker D',
      text: 'Not a negotiation? Then why are we even in this meeting?',
      start: 145.5,
      end: 149.5
    },
    {
      speaker: 'Speaker A',
      text: "To align on the plan I've already decided on. I'm cutting one-fifty from engineering and fifty from marketing.",
      start: 148.2,
      end: 155.5
    },
    {
      speaker: 'Speaker C',
      text: 'If the decision is already made then this whole meeting was just—',
      start: 156.0,
      end: 160.0
    },
    {
      speaker: 'Speaker A',
      text: 'It was to get everyone on the same page. And now you are.',
      start: 158.5,
      end: 162.5
    },
    {
      speaker: 'Speaker D',
      text: 'I want it on record that I disagree with this entirely. When the migration fails in Q4, this conversation is why.',
      start: 163.5,
      end: 170.5
    },
    {
      speaker: 'Speaker B',
      text: "For what it's worth, I'll document the risk in the finance review so leadership has full visibility.",
      start: 171.5,
      end: 177.5
    },
    {
      speaker: 'Speaker A',
      text: "Fine. Document whatever you want. The allocations go out tomorrow. We're done here.",
      start: 178.0,
      end: 183.5
    },
    {
      speaker: 'Speaker C',
      text: 'This is not how these meetings should go.',
      start: 185.0,
      end: 187.5
    },
    {
      speaker: 'Speaker D',
      text: "No, it's not.",
      start: 188.5,
      end: 189.8
    },
    {
      speaker: 'Speaker A',
      text: 'Meeting adjourned.',
      start: 191.0,
      end: 192.0
    }
  ]
};
