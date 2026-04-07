import { Skeleton } from '@/components/ui/skeleton';

export default function WeeklyDetailWidgetSkeleton() {
  return (
    <div className={'grid grid-cols-12 gap-4'}>
      <div className={'col-span-4'}>
        <Skeleton className={'w-full h-40 rounded-2xl'} />
      </div>
      <div className={'col-span-4'}>
        <Skeleton className={'w-full h-40 rounded-2xl'} />
      </div>
      <div className={'col-span-4'}>
        <Skeleton className={'w-full h-40 rounded-2xl'} />
      </div>
      <div className={'col-span-6'}>
        <Skeleton className={'w-full h-30 rounded-2xl'} />
      </div>
      <div className={'col-span-6'}>
        <Skeleton className={'w-full h-30 rounded-2xl'} />
      </div>
    </div>
  );
}
