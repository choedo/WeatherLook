'use client';

import React from 'react';
import { City } from '@/types/city';
import { useGetMiddleWeather } from '@/hooks/useGetMiddleWeather';
import { getMidTermBaseTime } from '@/lib/weather-time';
import { useGetShortWeather } from '@/hooks/useGetShortWeather';
import {
  TransformMiddleAverageWeather,
  transformMiddleAverageWeather,
} from '@/lib/weather-formatter';

export function useGetAverageWeather({
  city,
  nx,
  ny,
}: {
  city: City;
  nx: number;
  ny: number;
}): Record<number, TransformMiddleAverageWeather> {
  const { baseDate, baseTime } = getMidTermBaseTime();
  const {
    data: { landFcst, tempFcst },
  } = useGetMiddleWeather({ city, baseDate, baseTime });
  const {
    data: { vilage },
  } = useGetShortWeather({ city, nx, ny });

  const avgWeather = React.useMemo(
    () =>
      transformMiddleAverageWeather({
        vilage,
        tempFcst,
        landFcst,
      }),
    [vilage, tempFcst, landFcst],
  );

  return avgWeather;
}
