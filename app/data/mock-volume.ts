import type { VolumeAnalysis } from '~/types/meeting';

/**
 * Mock volume data matching the heated budget argument in mock-transcript.ts.
 * Speaker A (VP) is loud and gets louder when challenged.
 * Speaker D (Engineering) starts measured but raises voice when cornered.
 * Speaker B (Finance) stays even-keeled throughout.
 * Speaker C (HR) is soft-spoken — keeps getting talked over.
 */
export const mockVolumeAnalysis: VolumeAnalysis = {
  segments: [
    { segmentIndex: 0, rms: 0.62, peak: 0.79 }, // A — opening, assertive
    { segmentIndex: 1, rms: 0.48, peak: 0.63 }, // D — measured pushback
    { segmentIndex: 2, rms: 0.72, peak: 0.89 }, // A interrupts D — raised
    { segmentIndex: 3, rms: 0.58, peak: 0.74 }, // D — getting heated
    { segmentIndex: 4, rms: 0.76, peak: 0.92 }, // A interrupts D again — raised
    { segmentIndex: 5, rms: 0.5, peak: 0.66 }, // B — calm with numbers
    { segmentIndex: 6, rms: 0.65, peak: 0.82 }, // D — frustrated, louder
    { segmentIndex: 7, rms: 0.74, peak: 0.9 }, // A interrupts D — raised
    { segmentIndex: 8, rms: 0.71, peak: 0.88 }, // D — raised voice, quoting email
    { segmentIndex: 9, rms: 0.3, peak: 0.41 }, // C — soft, trying to calm
    { segmentIndex: 10, rms: 0.78, peak: 0.94 }, // A interrupts C — raised, dismissive
    { segmentIndex: 11, rms: 0.68, peak: 0.85 }, // D — heated response
    { segmentIndex: 12, rms: 0.8, peak: 0.95 }, // A interrupts D — peak raised
    { segmentIndex: 13, rms: 0.73, peak: 0.9 }, // D — retaliating, raised
    { segmentIndex: 14, rms: 0.32, peak: 0.44 }, // C — tries to intervene
    { segmentIndex: 15, rms: 0.82, peak: 0.96 }, // A interrupts C — peak volume
    { segmentIndex: 16, rms: 0.48, peak: 0.64 }, // B — calm middle ground
    { segmentIndex: 17, rms: 0.55, peak: 0.71 }, // D — pointed question
    { segmentIndex: 18, rms: 0.7, peak: 0.87 }, // A interrupts D — dismissive
    { segmentIndex: 19, rms: 0.66, peak: 0.83 }, // D — voice raised
    { segmentIndex: 20, rms: 0.75, peak: 0.91 }, // A interrupts D — raised
    { segmentIndex: 21, rms: 0.69, peak: 0.86 }, // D — raised, frustrated
    { segmentIndex: 22, rms: 0.77, peak: 0.93 }, // A — shutting down discussion
    { segmentIndex: 23, rms: 0.38, peak: 0.52 }, // C — measured, morale data
    { segmentIndex: 24, rms: 0.74, peak: 0.9 }, // A interrupts C — dismissive, raised
    { segmentIndex: 25, rms: 0.42, peak: 0.56 }, // C — persistent, attrition risk
    { segmentIndex: 26, rms: 0.52, peak: 0.68 }, // B — supporting C's point
    { segmentIndex: 27, rms: 0.68, peak: 0.84 }, // A — firm, dismissing
    { segmentIndex: 28, rms: 0.64, peak: 0.81 }, // D — threat of attrition
    { segmentIndex: 29, rms: 0.76, peak: 0.92 }, // A — cold, raised
    { segmentIndex: 30, rms: 0.67, peak: 0.84 }, // D — raised, confrontational
    { segmentIndex: 31, rms: 0.79, peak: 0.94 }, // A — raised, final decree
    { segmentIndex: 32, rms: 0.35, peak: 0.48 }, // C — defeated
    { segmentIndex: 33, rms: 0.72, peak: 0.89 }, // A — sharp, dismissive
    { segmentIndex: 34, rms: 0.6, peak: 0.77 }, // D — measured but angry
    { segmentIndex: 35, rms: 0.46, peak: 0.62 }, // B — diplomatic
    { segmentIndex: 36, rms: 0.65, peak: 0.82 }, // A — closing, firm
    { segmentIndex: 37, rms: 0.34, peak: 0.46 }, // C — quiet disappointment
    { segmentIndex: 38, rms: 0.4, peak: 0.54 }, // D — quiet agreement with C
    { segmentIndex: 39, rms: 0.58, peak: 0.75 } // A — curt adjournment
  ],
  speakers: [
    {
      speaker: 'Speaker A',
      averageRms: 0.73,
      baseline: 0.66,
      peakRms: 0.82,
      raisedVoiceCount: 9,
      raisedVoiceSegments: [2, 4, 7, 10, 12, 15, 20, 24, 31]
    },
    {
      speaker: 'Speaker B',
      averageRms: 0.49,
      baseline: 0.49,
      peakRms: 0.52,
      raisedVoiceCount: 0,
      raisedVoiceSegments: []
    },
    {
      speaker: 'Speaker C',
      averageRms: 0.35,
      baseline: 0.34,
      peakRms: 0.42,
      raisedVoiceCount: 0,
      raisedVoiceSegments: []
    },
    {
      speaker: 'Speaker D',
      averageRms: 0.62,
      baseline: 0.55,
      peakRms: 0.73,
      raisedVoiceCount: 4,
      raisedVoiceSegments: [8, 13, 19, 30]
    }
  ]
};
