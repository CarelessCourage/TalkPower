import type {
  TranscriptSegment,
  SpeakerMetrics,
  MeetingMetrics,
  Interruption,
  DominanceInsight,
  VolumeAnalysis
} from '~/types/meeting';

/** Threshold in seconds — overlapping segments closer than this count as an interruption */
const INTERRUPTION_OVERLAP = 0.5;

/** Group segments by speaker and sum their durations */
const computeSpeakerTime = (
  segments: TranscriptSegment[]
): Map<string, number> => {
  return segments.reduce((acc, seg) => {
    const prev = acc.get(seg.speaker) ?? 0;
    return acc.set(seg.speaker, prev + (seg.end - seg.start));
  }, new Map<string, number>());
};

/** Count speaking turns per speaker */
const computeTurns = (segments: TranscriptSegment[]): Map<string, number> => {
  return segments.reduce((acc, seg) => {
    return acc.set(seg.speaker, (acc.get(seg.speaker) ?? 0) + 1);
  }, new Map<string, number>());
};

/** Find each speaker's longest single segment */
const computeLongestMonologue = (
  segments: TranscriptSegment[]
): Map<string, number> => {
  return segments.reduce((acc, seg) => {
    const duration = seg.end - seg.start;
    const prev = acc.get(seg.speaker) ?? 0;
    return acc.set(seg.speaker, Math.max(prev, duration));
  }, new Map<string, number>());
};

/** Detect rough interruptions based on overlapping timestamps */
export const detectInterruptions = (
  segments: TranscriptSegment[]
): Interruption[] => {
  return segments.reduce<Interruption[]>((acc, seg, i) => {
    if (i === 0) return acc;
    const prev = segments[i - 1]!;
    if (seg.speaker === prev.speaker) return acc;

    const overlap = prev.end - seg.start;
    if (overlap > INTERRUPTION_OVERLAP) {
      return [
        ...acc,
        {
          interrupted: prev.speaker,
          interrupter: seg.speaker,
          time: seg.start,
          overlap
        }
      ];
    }
    return acc;
  }, []);
};

/** Count interruptions per speaker (as the interrupter) */
const countInterruptionsPerSpeaker = (
  interruptions: Interruption[]
): Map<string, number> => {
  return interruptions.reduce((acc, int) => {
    return acc.set(int.interrupter, (acc.get(int.interrupter) ?? 0) + 1);
  }, new Map<string, number>());
};

/** Count speaker changes in the transcript */
const countSpeakerChanges = (segments: TranscriptSegment[]): number => {
  return segments.reduce((count, seg, i) => {
    if (i === 0) return count;
    return seg.speaker !== segments[i - 1]!.speaker ? count + 1 : count;
  }, 0);
};

/** Build complete meeting metrics from raw segments */
export const computeMeetingMetrics = (
  segments: TranscriptSegment[],
  totalDuration: number
): MeetingMetrics => {
  const speakerTimeMap = computeSpeakerTime(segments);
  const turnsMap = computeTurns(segments);
  const longestMap = computeLongestMonologue(segments);
  const interruptions = detectInterruptions(segments);
  const interruptionMap = countInterruptionsPerSpeaker(interruptions);

  const totalSpeakingTime = [...speakerTimeMap.values()].reduce(
    (a, b) => a + b,
    0
  );

  const speakers: SpeakerMetrics[] = [...speakerTimeMap.entries()]
    .map(([speaker, totalTime]) => {
      const turns = turnsMap.get(speaker) ?? 0;
      return {
        speaker,
        totalTime,
        percentage: totalDuration > 0 ? (totalTime / totalDuration) * 100 : 0,
        turns,
        averageTurnDuration: turns > 0 ? totalTime / turns : 0,
        longestMonologue: longestMap.get(speaker) ?? 0,
        interruptions: interruptionMap.get(speaker) ?? 0
      };
    })
    .sort((a, b) => b.totalTime - a.totalTime);

  return {
    totalDuration,
    totalSpeakingTime,
    totalSilence: totalDuration - totalSpeakingTime,
    speakerChanges: countSpeakerChanges(segments),
    speakers
  };
};

/** Generate dominance insight cards from metrics */
export const generateInsights = (
  metrics: MeetingMetrics
): DominanceInsight[] => {
  const { speakers } = metrics;
  if (speakers.length === 0) return [];

  const dominant = speakers[0]!;
  const quietest = speakers.at(-1)!;
  const totalInterruptions = speakers.reduce(
    (s, sp) => s + sp.interruptions,
    0
  );
  const topInterrupter = [...speakers].sort(
    (a, b) => b.interruptions - a.interruptions
  )[0]!;

  const insights: DominanceInsight[] = [
    {
      label: 'Dominated by',
      value: dominant.speaker,
      detail: `${dominant.percentage.toFixed(0)}% of all airtime (${formatSeconds(dominant.totalTime)})`,
      tone: dominant.percentage > 50 ? 'warning' : 'neutral'
    },
    {
      label: 'Least heard',
      value: quietest.speaker,
      detail: `Only ${quietest.percentage.toFixed(0)}% airtime — ${quietest.turns} turn${quietest.turns === 1 ? '' : 's'}`,
      tone: quietest.percentage < 10 ? 'warning' : 'neutral'
    },
    {
      label: 'Longest monologue',
      value: dominant.speaker,
      detail: `${formatSeconds(dominant.longestMonologue)} without interruption`,
      tone: 'neutral'
    }
  ];

  if (totalInterruptions > 0) {
    insights.push({
      label: 'Top interrupter',
      value: topInterrupter.speaker,
      detail: `Interrupted others ${topInterrupter.interruptions} time${topInterrupter.interruptions === 1 ? '' : 's'}`,
      tone: 'accent'
    });
  }

  return insights;
};

/** Format seconds to mm:ss */
export const formatSeconds = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

/** Format seconds to a human-readable short form */
export const formatDuration = (seconds: number): string => {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
};

/** Generate volume-specific insights from analysis data */
export const generateVolumeInsights = (
  volume: VolumeAnalysis
): DominanceInsight[] => {
  if (volume.speakers.length === 0) return [];

  const insights: DominanceInsight[] = [];

  const loudest = [...volume.speakers].sort(
    (a, b) => b.averageRms - a.averageRms
  )[0]!;

  const quietestSpeaker = [...volume.speakers].sort(
    (a, b) => a.averageRms - b.averageRms
  )[0]!;

  insights.push({
    label: 'Loudest speaker',
    value: loudest.speaker,
    detail: `${Math.round(loudest.averageRms * 100)}% average volume`,
    tone: 'neutral'
  });

  if (loudest.speaker !== quietestSpeaker.speaker) {
    const ratio =
      loudest.averageRms / Math.max(quietestSpeaker.averageRms, 0.01);
    insights.push({
      label: 'Quietest speaker',
      value: quietestSpeaker.speaker,
      detail: `${ratio.toFixed(1)}× quieter than ${loudest.speaker}`,
      tone: quietestSpeaker.averageRms < 0.2 ? 'warning' : 'neutral'
    });
  }

  const raisers = volume.speakers.filter((s) => s.raisedVoiceCount > 0);
  if (raisers.length > 0) {
    const topRaiser = [...raisers].sort(
      (a, b) => b.raisedVoiceCount - a.raisedVoiceCount
    )[0]!;
    insights.push({
      label: 'Raised voice most',
      value: topRaiser.speaker,
      detail: `Voice raised in ${topRaiser.raisedVoiceCount} segment${topRaiser.raisedVoiceCount === 1 ? '' : 's'}`,
      tone: 'warning'
    });
  }

  return insights;
};
