'use client';

import React from 'react';
import WeatherKbd from '@/components/WeatherKbd';
import { useGetAverageWeather } from '@/hooks/useGetAverageWeather';
import { City } from '@/types/city';

interface Props {
  city: City;
  nx: number;
  ny: number;
}

export default function WeeklyWeatherTitleKbd({ city, nx, ny }: Props) {
  const weeklyWeather = useGetAverageWeather({ city, nx, ny });

  const averageSky = React.useMemo(() => {
    const skyState = new Map();

    Object.values(weeklyWeather).forEach((weather) => {
      const state = weather.sky;

      if (state === '없음') return;

      if (!skyState.has(state)) skyState.set(state, 1);
      else skyState.set(state, skyState.get(state) + 1);
    });

    let state = '';
    let maxCount = 0;
    for (const [status, count] of skyState) {
      if (count > maxCount) {
        maxCount = count;
        state = status;
      }
    }

    return state;
  }, [weeklyWeather]);

  return <WeatherKbd text={`이번주는 대체로 ${averageSky}`} />;
}
