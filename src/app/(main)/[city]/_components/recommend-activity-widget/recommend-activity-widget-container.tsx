'use client';

import { City } from '@/types/city';
import { useGetCurrentWeather } from '@/hooks/useGetCurrentWeather';
import RecommendActivityWidget from '@/app/(main)/[city]/_components/recommend-activity-widget/recommend-activity-widget';

interface Props {
  nx: number;
  ny: number;
  city: City;
}

export default function RecommendActivityWidgetContainer({
  nx,
  ny,
  city,
}: Props) {
  const currentWeather = useGetCurrentWeather({ nx, ny, city });

  return (
    <RecommendActivityWidget
      city={city}
      temp={currentWeather!.temp}
      skyState={currentWeather!.skyState}
      windSpeed={currentWeather!.windSpeed}
      humidity={currentWeather!.humidity}
    />
  );
}
