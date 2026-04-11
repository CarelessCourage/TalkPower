const colorClasses = [
  'base-accent',
  'base-info',
  'base-warning',
  'base-success',
  'base-yellow'
] as const;

export function useSpeakerColors() {
  const getSpeakerColor = (index: number): string =>
    colorClasses[index % colorClasses.length]!;

  return { colorClasses, getSpeakerColor };
}
