'use client';

import React from 'react';
import { useGetShortWeather } from '@/hooks/useGetShortWeather';
import { City } from '@/types/city';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { transformUltraSrtForecast } from '@/lib/weather-formatter';
import { WEATHER_CATEGORIES } from '@/constants/weather';
import WeatherIcon from '@/components/WeatherIcon';
import { getWeatherTheme } from '@/lib/weather-theme';
import { InfoIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface Props {
  nx: number;
  ny: number;
  city: City;
  name: string;
}

export default function CurrentWeatherWidget({ nx, ny, city, name }: Props) {
  const {
    data: { ultraSrt },
  } = useGetShortWeather({
    nx,
    ny,
    city,
  });

  const currentWeather = React.useMemo(
    () => transformUltraSrtForecast(ultraSrt)?.[0],
    [ultraSrt],
  );

  return (
    <div
      className={`
        w-full 
        p-8 
        ${getWeatherTheme({ skyState: currentWeather?.skyState || '맑음', rainType: currentWeather?.rainType || '없음' })}
        rounded-2xl 
        flex justify-between 
        text-white 
        shadow-xl`}
    >
      <div className={'flex flex-col items-start gap-6'}>
        <div className={'bg-white/30 py-2 px-4 text-xs font-bold rounded-full'}>
          업데이트 {dayjs(currentWeather?.rawTime, 'YYYYMMDDHHmm').fromNow()}
        </div>
        <div className={'flex flex-col gap-2'}>
          <h4 className={'text-4xl font-bold'}>{name}</h4>
          <p className={'text-sm text-muted'}>
            {currentWeather?.skyState} • {dayjs().format('dddd, M월 DD일')}
          </p>
        </div>
        <p className={'text-9xl'}>
          {currentWeather?.temp}
          <small className={'text-5xl'}>{WEATHER_CATEGORIES.T1H.unit}</small>
        </p>
      </div>
      <div className={'flex flex-col items-center justify-center gap-6'}>
        <div>
          <WeatherIcon type={currentWeather.rainType} size={96} />
        </div>
        <div
          className={'grid grid-cols-3 divide-x-2 divide-white/20 text-white'}
        >
          <div className={'px-4 py-2"'}>
            <p className={'text-sm text-white/60 font-semibold text-center'}>
              풍속
            </p>
            <h6 className={'text-xl font-bold text-center'}>
              {currentWeather?.windSpeed} {WEATHER_CATEGORIES['WSD']['unit']}
            </h6>
          </div>
          <div className={'px-4 py-2"'}>
            <p className={'text-sm text-white/60 font-semibold text-center'}>
              습도
            </p>
            <h6 className={'text-xl font-bold text-center'}>
              {currentWeather?.humidity} {WEATHER_CATEGORIES['REH']['unit']}
            </h6>
          </div>
          <div className={'px-4 py-2"'}>
            <p
              className={
                'text-sm text-white/60 font-semibold text-center flex items-center justify-center gap-1'
              }
            >
              강수
              <Tooltip>
                <TooltipTrigger delay={0} closeDelay={100}>
                  <InfoIcon size={12} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>1시간 강수량</p>
                </TooltipContent>
              </Tooltip>
            </p>
            <h6 className={'text-xl font-bold text-center'}>
              {currentWeather?.precipitation}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
