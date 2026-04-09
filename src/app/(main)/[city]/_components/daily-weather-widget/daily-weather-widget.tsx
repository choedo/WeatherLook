'use client';

import React from 'react';
import { useGetShortWeather } from '@/hooks/useGetShortWeather';
import { City } from '@/types/city';
import { transformUltraSrtForecast } from '@/lib/weather-formatter';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WEATHER_CATEGORIES } from '@/constants/weather';
import WeatherIcon from '@/components/WeatherIcon';

interface Props {
  nx: number;
  ny: number;
  city: City;
}

export default function DailyWeatherWidget({ nx, ny, city }: Props) {
  const {
    data: { ultraSrt },
  } = useGetShortWeather({
    nx,
    ny,
    city,
  });

  const now = new Date().getHours().toString();

  const dailyWeather = React.useMemo(
    () => transformUltraSrtForecast(ultraSrt),
    [ultraSrt],
  );

  return (
    <ScrollArea>
      <div className={'flex gap-4'}>
        {dailyWeather?.map((weather) => {
          const isNow = `${now}:00` === weather.time;

          return (
            <div
              key={`weather-${weather.time}`}
              className={`flex flex-col items-center justify-center gap-3 py-4 px-6 ${isNow ? 'bg-white' : 'bg-(--azure-sky-600)/10'} rounded-full text-center`}
            >
              <p
                className={`text-xs md:text-sm font-medium ${isNow ? 'text-(--deep-text-sky)' : 'text-muted-foreground'}`}
              >
                {weather.time}
              </p>
              <div>
                <WeatherIcon type={weather.rainType} colorFull />
              </div>
              <h6
                className={`text-sm md:text-lg font-bold ${isNow ? 'text-(--deep-text-sky)' : 'text-muted-foreground'}`}
              >
                {weather.temp}
                {WEATHER_CATEGORIES['T1H']['unit']}
              </h6>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
