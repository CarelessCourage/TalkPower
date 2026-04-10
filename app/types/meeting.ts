/** A single diarized transcript segment from the OpenAI API */
export interface TranscriptSegment {
  speaker: string;
  text: string;
  /** Start time in seconds */
  start: number;
  /** End time in seconds */
  end: number;
}

/** Full transcript response from the server */
export interface TranscriptResponse {
  segments: TranscriptSegment[];
  /** Total audio duration in seconds */
  duration: number;
  text: string;
}

/** Computed metrics for a single speaker */
export interface SpeakerMetrics {
  speaker: string;
  /** Total speaking time in seconds */
  totalTime: number;
  /** Percentage of total meeting time */
  percentage: number;
  /** Number of speaking turns */
  turns: number;
  /** Average duration of each turn in seconds */
  averageTurnDuration: number;
  /** Duration of longest uninterrupted segment in seconds */
  longestMonologue: number;
  /** Rough count of times this speaker interrupted another */
  interruptions: number;
}

/** Aggregate meeting-level metrics */
export interface MeetingMetrics {
  /** Total meeting duration in seconds */
  totalDuration: number;
  /** Total speaking time across all speakers */
  totalSpeakingTime: number;
  /** Total silence time */
  totalSilence: number;
  /** Number of speaker changes */
  speakerChanges: number;
  /** Per-speaker metrics sorted by total time descending */
  speakers: SpeakerMetrics[];
}

/** A detected interruption event */
export interface Interruption {
  /** The speaker who was interrupted */
  interrupted: string;
  /** The speaker who interrupted */
  interrupter: string;
  /** Time of the interruption in seconds */
  time: number;
  /** Gap between segments in seconds (negative = overlap, zero/small = tight) */
  gap: number;
  /** Soft = tight transition; hard = no breathing room at all */
  severity: 'soft' | 'hard';
}

/** Volume data for a single transcript segment */
export interface SegmentVolume {
  /** Index into the segments array */
  segmentIndex: number;
  /** RMS loudness normalized 0–1 */
  rms: number;
  /** Peak amplitude normalized 0–1 */
  peak: number;
}

/** Per-speaker volume profile */
export interface SpeakerVolume {
  speaker: string;
  /** Average RMS across all their segments */
  averageRms: number;
  /** Their baseline (median) loudness */
  baseline: number;
  /** Peak RMS across all their segments */
  peakRms: number;
  /** Number of segments where volume exceeded baseline by threshold */
  raisedVoiceCount: number;
  /** Segment indices where voice was raised */
  raisedVoiceSegments: number[];
}

/** Complete volume analysis result */
export interface VolumeAnalysis {
  /** Per-segment volume data */
  segments: SegmentVolume[];
  /** Per-speaker volume profile */
  speakers: SpeakerVolume[];
}

/** A dominance insight card */
export interface DominanceInsight {
  label: string;
  value: string;
  detail: string;
  tone: 'neutral' | 'warning' | 'accent';
}

/** Behavioral category used for colorizing labels */
export type BehaviorCategory =
  | 'constructive'
  | 'destructive'
  | 'neutral'
  | 'assertive'
  | 'evasive';

/** AI-generated behavioral label for a transcript segment */
export interface BehaviorLabel {
  /** Index into the segments array */
  segmentIndex: number;
  /** Short label, e.g. "passive-aggressive", "diplomatic" */
  label: string;
  /** Category bucket for color-coding */
  category: BehaviorCategory;
  /** One-line reasoning from the AI */
  detail: string;
  /** When present, describes what's deceptive about this behavior */
  deception?: string;
}

/** AI-detected emotional state for a transcript segment */
export interface EmotionLabel {
  /** Index into the segments array */
  segmentIndex: number;
  /** The TRUE underlying emotion — what they actually feel */
  emotion: string;
  /** What provoked it — "unprovoked" if initiated, or a short description if reactive */
  trigger: string;
  /** The performed/surface emotion when it differs from the true one (e.g. laughing while angry) */
  surface?: string;
}

/** A therapist-style observation or recommendation */
export interface TherapistNote {
  /** Short heading for the note */
  heading: string;
  /** The note body — observation, recommendation, or action item */
  body: string;
  /** Who the note is addressed to: a specific speaker, "all", or "facilitator" */
  addressedTo: string;
}

/** Full behavioral analysis response */
export interface BehaviorAnalysis {
  labels: BehaviorLabel[];
  /** Emotional state readings per segment */
  emotions?: EmotionLabel[];
  /** Optional overall summary of behavioral dynamics */
  summary?: string;
  /** Therapist-style notes with observations and recommendations */
  notes?: TherapistNote[];
  /** The context prompt that produced these labels (used for caching) */
  context?: string;
}

/** Upload state machine */
export type UploadStatus =
  | 'idle'
  | 'uploading'
  | 'processing'
  | 'done'
  | 'error';
