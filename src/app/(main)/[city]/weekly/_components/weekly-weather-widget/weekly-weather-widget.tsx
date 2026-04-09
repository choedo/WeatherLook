'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import WeatherIcon from '@/components/WeatherIcon';
import { WEATHER_CATEGORIES } from '@/constants/weather';
import { useGetAverageWeather } from '@/hooks/useGetAverageWeather';
import { useSelectDay } from '@/store/select-day-store';
import { City } from '@/types/city';
import dayjs from 'dayjs';
import { DropletIcon } from 'lucide-react';

interface Props {
  city: City;
  nx: number;
  ny: number;
}

const DAY_OF_THE_WEEK = {
  0: '일요일',
  1: '월요일',
  2: '화요일',
  3: '수요일',
  4: '목요일',
  5: '금요일',
  6: '일요일',
};

export default function WeeklyWeatherWidget({ city, nx, ny }: Props) {
  const averageWeeklyWeather = useGetAverageWeather({ city, nx, ny });

  const {
    selected,
    actions: { setSelected },
  } = useSelectDay();

  return (
    <ScrollArea className={'max-w-7xl'}>
      <div className={'flex w-max gap-4 py-10'}>
        {Object.entries(averageWeeklyWeather).map(([day, weather]) => {
          const date = dayjs().add(Number(day), 'day');
          const isTomorrow = day === '1';

          return (
            <div
              key={`weekly-day-${day}`}
              className={`
              flex flex-col items-center justify-center gap-4
              px-8 lg:px-10 py-4 
              ${String(selected) === day ? 'bg-white' : 'bg-(--azure-sky-600)/10'}
              rounded-2xl shadow-xl
              cursor-pointer
              `}
              onClick={() => setSelected(Number(day))}
            >
              <p
                className={
                  'text-[.6rem] md:text-xs text-(--deep-text-sky) font-bold'
                }
              >
                {isTomorrow ? '내일' : DAY_OF_THE_WEEK[date.day()]}
              </p>

              <div className={'text-center'}>
                <p
                  className={
                    'text-sm md:text-md font-extrabold text-(--deep-text-slate) leading-2'
                  }
                >
                  {date.format('M월D일')}
                </p>
                {isTomorrow ? (
                  <small
                    className={'text-[.6rem] md:text-xs text-(--deep-text-sky)'}
                  >
                    {DAY_OF_THE_WEEK[date.day()]}
                  </small>
                ) : null}
              </div>

              <WeatherIcon
                type={weather.sky}
                className={'w-6 h-6 md:w-8 md:h-8'}
                colorFull
              />

              <div className={'flex gap-2 text-lg'}>
                <p className={'font-bold text-sm md:text-md'}>
                  {weather.maxTemp || '-'}
                  {WEATHER_CATEGORIES.T1H.unit}
                </p>
                <p className={'font-light text-sm md:text-md'}>
                  {weather.minTemp || '-'}
                  {WEATHER_CATEGORIES.T1H.unit}
                </p>
              </div>

              <div className={'flex items-center justify-center gap-2'}>
                <DropletIcon className={'text-(--azure-sky-600)'} size={14} />
                <p className={'font-bold text-xs text-(--azure-sky-600) mt-1'}>
                  {weather.avgRehs === -1
                    ? '-'
                    : `${Math.round(weather.avgRehs)}%`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
