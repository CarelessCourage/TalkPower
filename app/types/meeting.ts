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
}

/** A dominance insight card */
export interface DominanceInsight {
  label: string;
  value: string;
  detail: string;
  tone: 'neutral' | 'warning' | 'accent';
}

/** Upload state machine */
export type UploadStatus =
  | 'idle'
  | 'uploading'
  | 'processing'
  | 'done'
  | 'error';
