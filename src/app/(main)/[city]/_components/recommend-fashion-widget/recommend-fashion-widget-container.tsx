'use client';

import { City } from '@/types/city';
import RecommendFashionWidget from '@/app/(main)/[city]/_components/recommend-fashion-widget/recommend-fashion-widget';
import { useGetCurrentWeather } from '@/hooks/useGetCurrentWeather';

interface Props {
  nx: number;
  ny: number;
  city: City;
}

export default function RecommendFashionWidgetContainer({
  nx,
  ny,
  city,
}: Props) {
  const currentWeather = useGetCurrentWeather({ nx, ny, city });

  return (
    <RecommendFashionWidget
      city={city}
      temp={currentWeather!.temp}
      skyState={currentWeather!.skyState}
      windSpeed={currentWeather!.windSpeed}
      humidity={currentWeather!.humidity}
    />
  );
}
