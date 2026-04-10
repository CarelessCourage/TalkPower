import type { InjectionKey, Ref, ComputedRef } from 'vue';
import type {
  TranscriptResponse,
  MeetingMetrics,
  DominanceInsight,
  Interruption,
  VolumeAnalysis,
  BehaviorAnalysis,
  BehaviorLabel,
  EmotionLabel
} from '~/types/meeting';

/** Shape of the shared meeting state provided by the parent page */
export interface MeetingState {
  transcript: Ref<TranscriptResponse | null>;
  volumeAnalysis: Ref<VolumeAnalysis | null>;
  behaviorAnalysis: Ref<BehaviorAnalysis | null>;
  behaviorContext: Ref<string>;
  analyzingBehavior: Ref<boolean>;
  interruptions: ComputedRef<Interruption[]>;
  interruptionThreshold: Ref<number>;
  metrics: ComputedRef<MeetingMetrics | null>;
  insights: ComputedRef<DominanceInsight[]>;
  hasData: ComputedRef<boolean>;
  analyzeBehavior: (context?: string) => Promise<void>;

  /** Reactive speaker display names map */
  speakerNames: Ref<Record<string, string>>;
  /** Resolve a raw speaker label to its display name */
  displayName: (raw: string) => string;

  /** Derived values provided by the parent page */
  segments: ComputedRef<TranscriptSegment[]>;
  duration: ComputedRef<number>;
  behaviorLabels: ComputedRef<BehaviorLabel[]>;
  emotionLabels: ComputedRef<EmotionLabel[]>;
  hardInterruptions: ComputedRef<number>;
  softInterruptions: ComputedRef<number>;

  /** Player interaction */
  currentTime: Ref<number | undefined>;
  activeIndex: Ref<number>;
  onSeek: (time: number) => void;
}

import type { TranscriptSegment } from '~/types/meeting';

export const meetingStateKey: InjectionKey<MeetingState> =
  Symbol('meetingState');

/** Inject meeting state from the parent page. Throws if not provided. */
export const useMeetingState = (): MeetingState => {
  const state = inject(meetingStateKey);
  if (!state) {
    throw new Error(
      'useMeetingState() called outside of a page that provides meeting state'
    );
  }
  return state;
};
