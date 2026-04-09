import type { TranscriptResponse } from '~/types/meeting';

/**
 * Simulated 4-person meeting (~3 minutes).
 * Speakers A and B dominate; C barely speaks; D gets interrupted.
 */
export const mockTranscript: TranscriptResponse = {
  duration: 185,
  text: '',
  segments: [
    {
      speaker: 'Speaker A',
      text: "Alright, let's get started. I want to go over the quarterly numbers before we talk about anything else.",
      start: 0,
      end: 6.2
    },
    {
      speaker: 'Speaker B',
      text: "Sure. I've got the deck pulled up. Revenue is up twelve percent, which is solid, but churn increased by three points.",
      start: 6.5,
      end: 14.1
    },
    {
      speaker: 'Speaker A',
      text: "Three points is a lot. We need to dig into that. What's driving it?",
      start: 14.3,
      end: 18.0
    },
    {
      speaker: 'Speaker B',
      text: 'Mostly the mid-tier plans. Customers are downgrading or canceling after the first ninety days. Onboarding might be the issue.',
      start: 18.2,
      end: 26.5
    },
    {
      speaker: 'Speaker C',
      text: 'I actually had a thought on—',
      start: 26.8,
      end: 28.1
    },
    {
      speaker: 'Speaker A',
      text: 'Hold on, let me finish this point. If onboarding is broken, we should look at the activation metrics first.',
      start: 27.9,
      end: 33.5
    },
    {
      speaker: 'Speaker B',
      text: "Agreed. Activation to day seven is only forty-one percent. That's below our target of sixty.",
      start: 34.0,
      end: 40.2
    },
    {
      speaker: 'Speaker A',
      text: 'Okay so we have a clear gap. I think we should restructure the first-week email flow and add an in-app walkthrough. Thoughts?',
      start: 41.0,
      end: 48.8
    },
    {
      speaker: 'Speaker D',
      text: "I've been looking at some competitor onboarding flows and I think we could—",
      start: 49.2,
      end: 53.0
    },
    {
      speaker: 'Speaker A',
      text: "Yeah, competitor analysis is useful but I think we already know the problem. Let's focus on execution.",
      start: 52.8,
      end: 59.1
    },
    {
      speaker: 'Speaker B',
      text: 'I can take the lead on the email redesign. We have some templates from marketing that might work as a starting point.',
      start: 60.0,
      end: 67.4
    },
    {
      speaker: 'Speaker A',
      text: "Good. Let's aim to have a draft ready by Friday. And I want to see the walkthrough prototype too.",
      start: 68.0,
      end: 74.5
    },
    {
      speaker: 'Speaker C',
      text: 'Should we also revisit the pricing on those mid-tier plans? If people are downgrading—',
      start: 76.0,
      end: 81.2
    },
    {
      speaker: 'Speaker A',
      text: "Pricing is a separate conversation. Let's not mix it in here. We'll schedule a dedicated session for that.",
      start: 81.5,
      end: 87.8
    },
    {
      speaker: 'Speaker B',
      text: 'Makes sense. Moving on — the product roadmap. We have three features in the pipeline. The dashboard redesign is the biggest one.',
      start: 89.0,
      end: 97.3
    },
    {
      speaker: 'Speaker A',
      text: 'Where are we on that? Last I checked the design team was still iterating.',
      start: 97.8,
      end: 102.0
    },
    {
      speaker: 'Speaker B',
      text: "They finished last week. Engineering started on Monday. We're estimating three sprints to ship.",
      start: 102.5,
      end: 108.2
    },
    {
      speaker: 'Speaker D',
      text: 'I had some concerns about the scope. The analytics page alone has—',
      start: 108.8,
      end: 112.5
    },
    {
      speaker: 'Speaker B',
      text: "We scoped that down already. We're shipping a minimal version first and iterating after launch.",
      start: 112.3,
      end: 118.0
    },
    {
      speaker: 'Speaker A',
      text: 'Good call. Ship small, learn fast. What about the other two features?',
      start: 119.0,
      end: 123.2
    },
    {
      speaker: 'Speaker B',
      text: 'The API improvements are on track. Should be done this sprint. The integrations piece is blocked on third-party documentation.',
      start: 123.8,
      end: 131.5
    },
    {
      speaker: 'Speaker A',
      text: 'Can we unblock it?',
      start: 132.0,
      end: 133.2
    },
    {
      speaker: 'Speaker B',
      text: "I've reached out to their team. Waiting to hear back.",
      start: 133.5,
      end: 136.8
    },
    {
      speaker: 'Speaker A',
      text: "Follow up again today. Don't let it slip. Anything else from the product side?",
      start: 137.5,
      end: 142.0
    },
    {
      speaker: 'Speaker D',
      text: 'Just a quick note — customer support flagged some UX confusion around the new settings page.',
      start: 143.0,
      end: 148.5
    },
    {
      speaker: 'Speaker A',
      text: "Noted. Can you write that up and send it to the design team? We'll address it in the next cycle.",
      start: 149.0,
      end: 154.8
    },
    {
      speaker: 'Speaker D',
      text: 'Will do.',
      start: 155.0,
      end: 155.8
    },
    {
      speaker: 'Speaker A',
      text: "Great. Last topic — hiring. We're behind on the engineering headcount. We need two more senior devs by end of quarter.",
      start: 157.0,
      end: 164.5
    },
    {
      speaker: 'Speaker B',
      text: 'Recruiting has three candidates in the pipeline. Two look strong. We should be able to close at least one this month.',
      start: 165.0,
      end: 172.0
    },
    {
      speaker: 'Speaker A',
      text: "Push for both. We can't afford to be short-staffed with the roadmap we just discussed. Anything else?",
      start: 172.5,
      end: 179.0
    },
    {
      speaker: 'Speaker C',
      text: 'Nothing from me.',
      start: 180.0,
      end: 181.0
    },
    {
      speaker: 'Speaker A',
      text: "Alright. Good meeting everyone. Let's execute.",
      start: 182.0,
      end: 185.0
    }
  ]
};
