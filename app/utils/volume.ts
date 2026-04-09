import type {
  TranscriptSegment,
  SegmentVolume,
  SpeakerVolume,
  VolumeAnalysis
} from '~/types/meeting';

/**
 * Ratio above baseline RMS that counts as "raised voice".
 * 1.5 = 50% louder than their median.
 */
const RAISED_VOICE_THRESHOLD = 1.5;

/** Compute RMS and peak for a slice of audio samples */
const analyzeSlice = (
  channelData: Float32Array,
  startSample: number,
  endSample: number
): { rms: number; peak: number } => {
  const start = Math.max(0, Math.floor(startSample));
  const end = Math.min(channelData.length, Math.floor(endSample));
  if (end <= start) return { rms: 0, peak: 0 };

  let sumSquares = 0;
  let peak = 0;

  for (let i = start; i < end; i++) {
    const sample = channelData[i]!;
    const abs = Math.abs(sample);
    sumSquares += sample * sample;
    if (abs > peak) peak = abs;
  }

  const rms = Math.sqrt(sumSquares / (end - start));
  return { rms, peak };
};

/** Compute the median of a sorted number array */
const median = (values: number[]): number => {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1]! + sorted[mid]!) / 2
    : sorted[mid]!;
};

/**
 * Analyze audio loudness per transcript segment from an ArrayBuffer.
 * Decodes the audio and computes RMS/peak for each segment's time range.
 */
export const analyzeAudioVolumeFromBuffer = async (
  arrayBuffer: ArrayBuffer,
  segments: TranscriptSegment[]
): Promise<VolumeAnalysis> => {
  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  const sampleRate = audioBuffer.sampleRate;
  const channelData = audioBuffer.getChannelData(0);

  /** Find the global peak to normalize */
  let globalPeak = 0;
  for (let i = 0; i < channelData.length; i++) {
    const abs = Math.abs(channelData[i]!);
    if (abs > globalPeak) globalPeak = abs;
  }
  const normFactor = globalPeak > 0 ? 1 / globalPeak : 1;

  const segmentVolumes: SegmentVolume[] = segments.map((seg, i) => {
    const startSample = seg.start * sampleRate;
    const endSample = seg.end * sampleRate;
    const { rms, peak } = analyzeSlice(channelData, startSample, endSample);
    return {
      segmentIndex: i,
      rms: rms * normFactor,
      peak: peak * normFactor
    };
  });

  /** Group segment volumes by speaker */
  const speakerSegments = new Map<string, SegmentVolume[]>();
  for (const sv of segmentVolumes) {
    const speaker = segments[sv.segmentIndex]!.speaker;
    const existing = speakerSegments.get(speaker) ?? [];
    speakerSegments.set(speaker, [...existing, sv]);
  }

  const speakerVolumes: SpeakerVolume[] = [...speakerSegments.entries()].map(
    ([speaker, vols]) => {
      const rmsValues = vols.map((v) => v.rms);
      const averageRms =
        rmsValues.reduce((a, b) => a + b, 0) / rmsValues.length;
      const baseline = median(rmsValues);
      const peakRms = Math.max(...rmsValues);
      const threshold = baseline * RAISED_VOICE_THRESHOLD;

      const raisedVoiceSegments = vols
        .filter((v) => v.rms > threshold)
        .map((v) => v.segmentIndex);

      return {
        speaker,
        averageRms,
        baseline,
        peakRms,
        raisedVoiceCount: raisedVoiceSegments.length,
        raisedVoiceSegments
      };
    }
  );

  await audioContext.close();

  return {
    segments: segmentVolumes,
    speakers: speakerVolumes
  };
};

/**
 * Convenience wrapper: analyze volume from a File object.
 */
export const analyzeAudioVolume = async (
  file: File,
  segments: TranscriptSegment[]
): Promise<VolumeAnalysis> => {
  const arrayBuffer = await file.arrayBuffer();
  return analyzeAudioVolumeFromBuffer(arrayBuffer, segments);
};
