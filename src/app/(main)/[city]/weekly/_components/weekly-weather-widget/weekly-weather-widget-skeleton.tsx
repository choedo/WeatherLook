import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

export default function WeeklyWeatherWidgetSkeleton() {
  return (
    <ScrollArea className={'max-w-7xl'}>
      <div className={'flex w-max gap-4 py-10'}>
        {new Array(11).fill(null).map((_, index) => (
          <Skeleton
            key={`weekly-day-skeleton-${index}`}
            className={`
              flex flex-col items-center justify-center gap-4
              px-10 py-4 
              rounded-2xl shadow-xl
              `}
          >
            <p className={'text-xs text-transparent font-bold'}>-</p>

            <div className={'text-center'}>
              <p className={'font-extrabold text-transparent leading-2'}>-</p>
            </div>

            <div className={'w-8 h-8'} />

            <div className={'flex items-center justify-center gap-2'}>
              <p className={'font-bold text-xs text-transparent mt-1'}>-</p>
            </div>
          </Skeleton>
        ))}
      </div>
    </ScrollArea>
  );
}
