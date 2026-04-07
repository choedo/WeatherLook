import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { SunIcon } from 'lucide-react';
import { WEATHER_CATEGORIES } from '@/constants/weather';

export default function DailyWeatherWidgetSkeleton() {
  return (
    <ScrollArea>
      <div className={'flex gap-4'}>
        {new Array(24).fill(null).map((_, index) => (
          <Skeleton
            key={`weather-skeleton-${index}`}
            className={
              'flex flex-col items-center justify-center gap-3 py-4 px-6 rounded-full'
            }
          >
            <p className={'text-sm font-medium opacity-0'}>--:--</p>
            <div className={'opacity-0'}>
              <SunIcon />
            </div>
            <h6 className={'text-lg font-bold opacity-0'}>
              00
              {WEATHER_CATEGORIES['T1H']['unit']}
            </h6>
          </Skeleton>
        ))}
      </div>
    </ScrollArea>
  );
}
