'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import WeatherMapWidgetSkeleton from '@/app/(main)/[city]/_components/weather-map-widget/weather-map-widget-skeleton';
import { useLocationInformation } from '@/store/location-store';
import { useGetShortWeather } from '@/hooks/useGetShortWeather';
import { transformUltraSrtForecast } from '@/lib/weather-formatter';
import { MoveRightIcon } from 'lucide-react';
import { WEATHER_CATEGORIES } from '@/constants/weather';
import WeatherIcon from '@/components/WeatherIcon';

const WeatherMap = dynamic(() => import('@/components/WeatherMap'), {
  ssr: false,
  loading: () => <WeatherMapWidgetSkeleton />,
});

export default function WeatherMapWidget() {
  const { lat, lng, path, nx, ny } = useLocationInformation();

  const {
    data: { ultraSrt },
  } = useGetShortWeather({ city: path, nx, ny });

  const currentWeather = React.useMemo(
    () => transformUltraSrtForecast(ultraSrt)?.[0],
    [ultraSrt],
  );

  return (
    <div
      className={
        'rounded-2xl shadow-xl aspect-video w-full overflow-hidden relative hidden md:block'
      }
    >
      <WeatherMap lat={lat} lng={lng} />
      <div className={'absolute bottom-5 left-5'}>
        <ul className={'flex gap-2'}>
          <li
            className={
              'border rounded-md bg-white/80 p-2 flex flex-col items-center justify-center'
            }
          >
            <MoveRightIcon
              className={`rotate-${currentWeather.windDirection}`}
              size={18}
            />
            <span className={'text-xs font-bold pt-2'}>
              {currentWeather.windSpeed} {WEATHER_CATEGORIES['WSD']['unit']}
            </span>
          </li>

          <li
            className={
              'border rounded-md bg-white/80 p-2 flex flex-col items-center justify-center'
            }
          >
            <WeatherIcon type={currentWeather.skyState} />
            <span className={'text-xs font-bold pt-2'}>
              {currentWeather.skyState}
            </span>
          </li>

          <li
            className={
              'border rounded-md bg-white/80 p-2 flex flex-col items-center justify-center'
            }
          >
            <WeatherIcon type={currentWeather.rainType} />
            <span className={'text-xs font-bold pt-2'}>
              {currentWeather.rainType}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
