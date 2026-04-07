'use client';

import React from 'react';
import { useGetShortWeather } from '@/hooks/useGetShortWeather';
import { transformUltraSrtForecast } from '@/lib/weather-formatter';
import { City } from '@/types/city';

export function useGetCurrentWeather({
  nx,
  ny,
  city,
}: {
  nx: number;
  ny: number;
  city: City;
}) {
  const {
    data: { ultraSrt },
  } = useGetShortWeather({ nx, ny, city });

  const currentWeather = React.useMemo(
    () => transformUltraSrtForecast(ultraSrt)?.[0],
    [ultraSrt],
  );

  return currentWeather;
}
