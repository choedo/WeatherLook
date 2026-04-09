'use client';

import { useGetWeeklyLifeGuide } from '@/hooks/useGetWeeklyLifeGuide';
import { City } from '@/types/city';

interface Props {
  forecast: string;
  city: City;
}

export default function WeeklyLifeGuideWidget({ forecast, city }: Props) {
  const { data } = useGetWeeklyLifeGuide({ forecast, city });

  const weeklyLifeGuide = data
    .split('\n')
    .map((guide: string) => guide.split('##').map((text) => text.trim()));

  return (
    <div className={'flex flex-col gap-4'}>
      {weeklyLifeGuide.map(
        ([icon, title, content]: [string, string, string]) => (
          <div
            key={`life-guide-${title}`}
            className={
              'flex items-start gap-4 py-6 px-4 rounded-2xl bg-(--azure-sky-600)/10'
            }
          >
            <div
              className={'rounded-full p-4 bg-(--golden-amber-400)/20 text-xl'}
            >
              {icon}
            </div>
            <div className={'flex flex-col gap-1'}>
              <h6 className={'text-sm md:text-md font-bold'}>{title}</h6>
              <p
                className={
                  'text-xs md:text-sm text-(--deep-text-sky) break-keep'
                }
              >
                {content}
              </p>
            </div>
          </div>
        ),
      )}
    </div>
  );
}
