import type { VolumeAnalysis } from '~/types/meeting';

/**
 * Synthetic volume data for the demo transcript (argumentAtTheMuseum.mp4).
 * Speaker A is commanding and loud — museum security authority figure.
 * Speaker C challenges frequently, gets heated mid-conversation.
 * Speaker D is measured and calm throughout.
 * Speaker B has a single brief segment.
 */
export const demoVolumeAnalysis: VolumeAnalysis = {
  segments: [
    { segmentIndex: 0, rms: 0.68, peak: 0.84 }, // A — authoritative opening
    { segmentIndex: 1, rms: 0.65, peak: 0.81 }, // A — "well well well"
    { segmentIndex: 2, rms: 0.6, peak: 0.76 }, // A — entrance comment
    { segmentIndex: 3, rms: 0.45, peak: 0.6 }, // B — calm "send recruits back"
    { segmentIndex: 4, rms: 0.72, peak: 0.88 }, // A — assertive
    { segmentIndex: 5, rms: 0.55, peak: 0.7 }, // C — response, measured
    { segmentIndex: 6, rms: 0.75, peak: 0.91 }, // A — raised, confrontational
    { segmentIndex: 7, rms: 0.58, peak: 0.73 }, // C — replying, firm
    { segmentIndex: 8, rms: 0.7, peak: 0.86 }, // A — pressing point
    { segmentIndex: 9, rms: 0.62, peak: 0.78 }, // C — pushback, getting heated
    { segmentIndex: 10, rms: 0.78, peak: 0.93 }, // A — raised voice, arguing
    { segmentIndex: 11, rms: 0.66, peak: 0.82 }, // C — heated response
    { segmentIndex: 12, rms: 0.74, peak: 0.9 }, // A — raised
    { segmentIndex: 13, rms: 0.69, peak: 0.85 }, // C — raised, confrontational
    { segmentIndex: 14, rms: 0.76, peak: 0.92 }, // A — peak assertiveness
    { segmentIndex: 15, rms: 0.71, peak: 0.87 }, // C — raised, arguing back
    { segmentIndex: 16, rms: 0.38, peak: 0.52 }, // D — calm interjection
    { segmentIndex: 17, rms: 0.73, peak: 0.89 }, // A — dismissive, loud
    { segmentIndex: 18, rms: 0.64, peak: 0.8 }, // C — persistent
    { segmentIndex: 19, rms: 0.77, peak: 0.93 }, // A — raised, heated
    { segmentIndex: 20, rms: 0.67, peak: 0.83 }, // C — raised voice
    { segmentIndex: 21, rms: 0.72, peak: 0.88 }, // A — pressing
    { segmentIndex: 22, rms: 0.6, peak: 0.76 }, // C — measured reply
    { segmentIndex: 23, rms: 0.79, peak: 0.95 }, // A — peak volume, shouting
    { segmentIndex: 24, rms: 0.7, peak: 0.86 }, // C — shouting back
    { segmentIndex: 25, rms: 0.42, peak: 0.56 }, // D — calm, mediating
    { segmentIndex: 26, rms: 0.75, peak: 0.91 }, // A — dismisses D, loud
    { segmentIndex: 27, rms: 0.63, peak: 0.79 }, // C — firm
    { segmentIndex: 28, rms: 0.71, peak: 0.87 }, // A — authoritative
    { segmentIndex: 29, rms: 0.59, peak: 0.74 }, // C — cooling slightly
    { segmentIndex: 30, rms: 0.68, peak: 0.84 }, // A — stern
    { segmentIndex: 31, rms: 0.4, peak: 0.54 }, // D — quiet observation
    { segmentIndex: 32, rms: 0.73, peak: 0.89 }, // A — shutting down
    { segmentIndex: 33, rms: 0.56, peak: 0.71 }, // C — conceding slightly
    { segmentIndex: 34, rms: 0.69, peak: 0.85 }, // A — final authority
    { segmentIndex: 35, rms: 0.61, peak: 0.77 }, // C — quiet defiance
    { segmentIndex: 36, rms: 0.44, peak: 0.58 }, // D — calm wrap-up
    { segmentIndex: 37, rms: 0.74, peak: 0.9 }, // A — raised, last word
    { segmentIndex: 38, rms: 0.52, peak: 0.67 }, // C — subdued
    { segmentIndex: 39, rms: 0.67, peak: 0.83 }, // A — commanding close
    { segmentIndex: 40, rms: 0.5, peak: 0.65 }, // C — quiet
    { segmentIndex: 41, rms: 0.36, peak: 0.5 }, // D — calm
    { segmentIndex: 42, rms: 0.7, peak: 0.86 }, // A — firm final
    { segmentIndex: 43, rms: 0.48, peak: 0.63 }, // C — quiet acceptance
    { segmentIndex: 44, rms: 0.66, peak: 0.82 }, // A — authoritative
    { segmentIndex: 45, rms: 0.39, peak: 0.53 }, // D — measured
    { segmentIndex: 46, rms: 0.72, peak: 0.88 }, // A — raised, closing
    { segmentIndex: 47, rms: 0.54, peak: 0.69 }, // C — final remark
    { segmentIndex: 48, rms: 0.65, peak: 0.81 } // A — curtly ends
  ],
  speakers: [
    {
      speaker: 'Speaker A',
      averageRms: 0.71,
      baseline: 0.67,
      peakRms: 0.79,
      raisedVoiceCount: 8,
      raisedVoiceSegments: [6, 10, 12, 14, 19, 23, 26, 37]
    },
    {
      speaker: 'Speaker B',
      averageRms: 0.45,
      baseline: 0.45,
      peakRms: 0.45,
      raisedVoiceCount: 0,
      raisedVoiceSegments: []
    },
    {
      speaker: 'Speaker C',
      averageRms: 0.6,
      baseline: 0.56,
      peakRms: 0.71,
      raisedVoiceCount: 4,
      raisedVoiceSegments: [13, 15, 20, 24]
    },
    {
      speaker: 'Speaker D',
      averageRms: 0.4,
      baseline: 0.4,
      peakRms: 0.44,
      raisedVoiceCount: 0,
      raisedVoiceSegments: []
    }
  ]
};
