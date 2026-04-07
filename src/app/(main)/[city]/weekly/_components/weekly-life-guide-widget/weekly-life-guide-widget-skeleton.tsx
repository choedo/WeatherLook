import { Skeleton } from '@/components/ui/skeleton';

export default function WeeklyLifeGuideSkeleton() {
  return (
    <div className={'flex flex-col gap-4'}>
      {new Array(3).fill(null).map((_, index) => (
        <Skeleton
          key={`weekly-life-guide-item-${index}`}
          className={'w-full h-30 rounded-2xl'}
        />
      ))}
    </div>
  );
}
