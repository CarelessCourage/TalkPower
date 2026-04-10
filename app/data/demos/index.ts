import type { TranscriptResponse, BehaviorAnalysis } from '~/types/meeting';

export interface DemoEntry {
  slug: string;
  title: string;
  video: string;
  transcript: TranscriptResponse;
  labels: BehaviorAnalysis;
  context: string;
}

const loaders: Record<
  string,
  () => Promise<{
    video: string;
    transcript: TranscriptResponse;
    labels: BehaviorAnalysis;
    context: string;
  }>
> = {
  museum: () => import('~/data/demos/museum'),
  'mean-girls': () => import('~/data/demos/mean-girls')
};

export const demos: { slug: string; title: string }[] = [
  { slug: 'museum', title: 'Night at the Museum' },
  { slug: 'mean-girls', title: 'Mean Girls' }
];

export const DEFAULT_DEMO = 'museum';

export const loadDemoData = async (slug: string): Promise<DemoEntry | null> => {
  const loader = loaders[slug];
  if (!loader) return null;
  const data = await loader();
  const meta = demos.find((d) => d.slug === slug)!;
  return {
    slug,
    title: meta.title,
    video: data.video,
    transcript: data.transcript,
    labels: data.labels,
    context: data.context
  };
};
