'use client';

import React from 'react';
import { useGetAverageWeather } from '@/hooks/useGetAverageWeather';
import { City } from '@/types/city';
import { WEATHER_CATEGORIES } from '@/constants/weather';
import { ThermometerSnowflakeIcon, ThermometerSunIcon } from 'lucide-react';
import WeatherIcon from '@/components/WeatherIcon';
import { Progress } from '@/components/ui/progress';
import { getPopAdvice, getRehAdvice } from '@/lib/weather-formatter';

interface Props {
  city: City;
  nx: number;
  ny: number;
  selected: number;
}

export default function WeeklyDetailWidget({ city, nx, ny, selected }: Props) {
  const averageWeeklyWeather = useGetAverageWeather({ city, nx, ny });

  const weather = React.useMemo(
    () => averageWeeklyWeather[selected],
    [selected, averageWeeklyWeather],
  );

  const commonClass = 'rounded-2xl p-6';
  const titleClass = 'text-xs font-bold text-(--muted-text-slate-500)';

  return (
    <div className={'grid grid-cols-12 gap-4'}>
      <div className={`col-span-4 ${commonClass} bg-white flex flex-col gap-2`}>
        <h6 className={titleClass}>하늘 상태</h6>
        <p className={'text-xl font-bold'}>
          {weather.sky === '없음' ? '맑음' : weather.sky || '예보 없음'}
        </p>
        <WeatherIcon type={weather.sky} size={32} colorFull />
      </div>
      <div className={`col-span-4 ${commonClass} bg-white flex flex-col gap-2`}>
        <h6 className={titleClass}>습도</h6>
        <p className={'text-xl font-bold'}>{Math.round(weather.avgRehs)}%</p>
        <div className={'flex flex-col gap-2'}>
          <Progress value={Math.round(weather.avgRehs)} />
          <p className={'text-xs text-(--muted-text-slate-500) break-keep'}>
            {getRehAdvice(weather.avgRehs)}
          </p>
        </div>
      </div>
      <div className={`col-span-4 ${commonClass} bg-white flex flex-col gap-2`}>
        <h6 className={titleClass}>강수 확률</h6>
        <p className={'text-xl font-bold'}>{Math.round(weather.avgPops)}%</p>
        <div className={'flex flex-col gap-2'}>
          <Progress value={Math.round(weather.avgPops)} />
          <p className={'text-xs text-(--muted-text-slate-500) break-keep'}>
            {getPopAdvice(weather.avgPops)}
          </p>
        </div>
      </div>
      <div
        className={`col-span-6 ${commonClass} bg-(--azure-sky-600)/10 flex items-center justify-between`}
      >
        <div className={'flex flex-col gap-4'}>
          <h6 className={titleClass}>최고 기온</h6>
          <p className={'text-2xl font-bold'}>
            {weather.maxTemp || '-'}
            {WEATHER_CATEGORIES.T1H.unit}
          </p>
        </div>
        <ThermometerSunIcon fill={'#FBBF24'} color={'#FBBF24'} size={48} />
      </div>
      <div
        className={`col-span-6 ${commonClass} bg-(--azure-sky-600)/10 flex items-center justify-between`}
      >
        <div className={'flex flex-col gap-4'}>
          <h6 className={titleClass}>최저 기온</h6>
          <p className={'text-2xl font-bold'}>
            {weather.minTemp || '-'}
            {WEATHER_CATEGORIES.T1H.unit}
          </p>
        </div>
        <ThermometerSnowflakeIcon
          fill={'#0EA5E9'}
          color={'#0EA5E9'}
          size={48}
        />
      </div>
    </div>
  );
}
