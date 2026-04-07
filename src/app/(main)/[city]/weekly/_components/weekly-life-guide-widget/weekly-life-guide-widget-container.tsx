'use client';

import WeeklyLifeGuideWidget from '@/app/(main)/[city]/weekly/_components/weekly-life-guide-widget/weekly-life-guide-widget';
import { useGetMiddleWeather } from '@/hooks/useGetMiddleWeather';
import { getMidTermBaseTime } from '@/lib/weather-time';
import { City } from '@/types/city';

interface Props {
  city: City;
}

export default function WeeklyLifeGuideContainer({ city }: Props) {
  const { baseDate, baseTime } = getMidTermBaseTime();
  const {
    data: { forecast },
  } = useGetMiddleWeather({ city, baseDate, baseTime });

  return <WeeklyLifeGuideWidget forecast={forecast} city={city} />;
}
