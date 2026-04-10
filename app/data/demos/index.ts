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
  'mean-girls': () => import('~/data/demos/mean-girls'),
  'love-spectrum': () => import('~/data/demos/love-spectrum'),
  'the-office': () => import('~/data/demos/the-office')
};

export const demos: { slug: string; title: string }[] = [
  { slug: 'museum', title: 'Night at the Museum' },
  { slug: 'mean-girls', title: 'Mean Girls' },
  { slug: 'love-spectrum', title: 'Love on the Spectrum' },
  { slug: 'the-office', title: 'The Office' }
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
