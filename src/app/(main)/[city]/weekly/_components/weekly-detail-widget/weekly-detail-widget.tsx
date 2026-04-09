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

  return (
    <div className={'grid grid-cols-12 gap-4'}>
      <WidgetItem
        label={'하늘 상태'}
        value={weather.sky === '없음' ? '맑음' : weather.sky || '예보 없음'}
        direction={'col'}
        span={4}
        className={'bg-white'}
      >
        <WeatherIcon type={weather.sky} size={32} colorFull />
      </WidgetItem>
      <WidgetItem
        label={'습도'}
        value={`${Math.round(weather.avgRehs)}%`}
        direction={'col'}
        span={4}
        className={'bg-white'}
      >
        <div className={'flex flex-col gap-2'}>
          <Progress value={Math.round(weather.avgRehs)} />
          <p className={'text-xs text-(--muted-text-slate-500) break-keep'}>
            {getRehAdvice(weather.avgRehs)}
          </p>
        </div>
      </WidgetItem>
      <WidgetItem
        label={'강수 확률'}
        value={`${Math.round(weather.avgPops)}%`}
        direction={'col'}
        span={4}
        className={'bg-white'}
      >
        <div className={'flex flex-col gap-2'}>
          <Progress value={Math.round(weather.avgPops)} />
          <p className={'text-xs text-(--muted-text-slate-500) break-keep'}>
            {getPopAdvice(weather.avgPops)}
          </p>
        </div>
      </WidgetItem>

      <WidgetItem
        label={'최고 기온'}
        value={`${weather.maxTemp || '-'}
            ${WEATHER_CATEGORIES.T1H.unit}`}
        direction={'row'}
        span={6}
        className={'bg-(--azure-sky-600)/10'}
      >
        <ThermometerSunIcon
          fill={'#FBBF24'}
          color={'#FBBF24'}
          size={48}
          className={'w-8 h-8 md:w-12 md:h-12'}
        />
      </WidgetItem>
      <WidgetItem
        label={'최저 기온'}
        value={`${weather.minTemp || '-'}
            ${WEATHER_CATEGORIES.T1H.unit}`}
        direction={'row'}
        span={6}
        className={'bg-(--azure-sky-600)/10'}
      >
        <ThermometerSnowflakeIcon
          fill={'#0EA5E9'}
          color={'#0EA5E9'}
          size={48}
          className={'w-8 h-8 md:w-12 md:h-12'}
        />
      </WidgetItem>
    </div>
  );
}

function WidgetItem({
  label,
  value,
  children,
  span,
  direction,
  className,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
  span: 4 | 6;
  direction: 'col' | 'row';
  className?: string;
}) {
  const spanClasses = {
    4: 'col-span-12 md:col-span-4',
    6: 'col-span-6',
  };
  return (
    <div
      className={`${spanClasses[span]} rounded-2xl p-6 bg-(--azure-sky-600)/10 flex flex-${direction} ${direction === 'row' ? 'items-center justify-between' : ''} ${className}`}
    >
      <div className={'flex flex-col gap-2 md:gap-4'}>
        <h6
          className={
            'text-[.6rem] md:text-xs font-bold text-(--muted-text-slate-500)'
          }
        >
          {label}
        </h6>
        <p className={'text-lg md:text-2xl font-bold'}>{value}</p>
      </div>
      {children}
    </div>
  );
}
