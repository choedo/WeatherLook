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
        flex flex-col md:flex-row justify-start items-start md:justify-between 
        text-white 
        shadow-xl`}
    >
      <div className={'flex justify-between items-center w-full md:w-auto'}>
        <div className={'flex flex-col items-start gap-4 lg:gap-6'}>
          <div
            className={`
            hidden md:block
          bg-white/30 
            py-1 px-2 md:py-2 md:px-4
            text-xs font-bold rounded-full
          `}
          >
            업데이트 {dayjs(currentWeather?.rawTime, 'YYYYMMDDHHmm').fromNow()}
          </div>
          <div className={'hidden md:flex flex-col gap-2'}>
            <h4 className={'text-2xl md:text-3xl lg:text-4xl font-bold'}>
              {name}
            </h4>
            <p className={'text-xs md:text-sm text-muted'}>
              {currentWeather?.skyState} • {dayjs().format('dddd, M월 DD일')}
            </p>
          </div>
          <p className={'text-8xl lg:text-9xl'}>
            {currentWeather?.temp}
            <small className={'text-6xl lg:text-5xl'}>
              {WEATHER_CATEGORIES.T1H.unit}
            </small>
          </p>
        </div>

        <div className={'rounded-full bg-white/10 p-4 block md:hidden'}>
          <WeatherIcon type={currentWeather.rainType} className={`w-14 h-14`} />
        </div>
      </div>

      <div className={'flex flex-col items-center justify-center gap-6'}>
        <div className={'rounded-full bg-white/10 p-4 hidden md:block'}>
          <WeatherIcon
            type={currentWeather.rainType}
            className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24`}
          />
        </div>
        <div
          className={'grid grid-cols-3 divide-x-2 divide-white/20 text-white'}
        >
          <WeatherItem
            label={'풍속'}
            value={`${currentWeather?.windSpeed} ${WEATHER_CATEGORIES['WSD']['unit']}`}
          />
          <WeatherItem
            label={'습도'}
            value={`${currentWeather?.humidity} ${WEATHER_CATEGORIES['REH']['unit']}`}
          />
          <WeatherItem
            label={
              <>
                강수
                <Tooltip>
                  <TooltipTrigger delay={0} closeDelay={100}>
                    <InfoIcon size={12} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>1시간 강수량</p>
                  </TooltipContent>
                </Tooltip>
              </>
            }
            value={currentWeather?.precipitation}
          />
        </div>
      </div>
    </div>
  );
}

function WeatherItem({
  label,
  value,
}: {
  label: React.ReactNode;
  value: string;
}) {
  return (
    <div className={'px-2 md:px-4 py-2'}>
      <p
        className={`
          text-xs lg:text-sm 
          text-white/60 
          font-semibold 
          text-center 
          flex items-center justify-center gap-1
        `}
      >
        {label}
      </p>
      <h6
        className={`
          text-md md:text-lg lg:text-xl 
          font-bold 
          text-center
        `}
      >
        {value}
      </h6>
    </div>
  );
}
