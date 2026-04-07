'use client';

import RecommendItemsWidget from '@/app/(main)/[city]/_components/recommend-items-widget/recommend-items-widget';
import { City } from '@/types/city';
import { useGetCurrentWeather } from '@/hooks/useGetCurrentWeather';

interface Props {
  nx: number;
  ny: number;
  city: City;
}

export default function RecommendItemsWidgetContainer({ nx, ny, city }: Props) {
  const currentWeather = useGetCurrentWeather({ nx, ny, city });

  return (
    <RecommendItemsWidget
      city={city}
      temp={currentWeather!.temp}
      skyState={currentWeather!.skyState}
      windSpeed={currentWeather!.windSpeed}
      humidity={currentWeather!.humidity}
    />
  );
}
