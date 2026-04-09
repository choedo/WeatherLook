'use client';

import CurrentWeatherWidget from '@/app/(main)/[city]/_components/current-weather-widget/current-weather-widget';
import CurrentWeatherWidgetSkeleton from '@/app/(main)/[city]/_components/current-weather-widget/current-weather-widget-skeleton';
import DailyWeatherWidget from '@/app/(main)/[city]/_components/daily-weather-widget/daily-weather-widget';
import DailyWeatherWidgetSkeleton from '@/app/(main)/[city]/_components/daily-weather-widget/daily-weather-widget-skeleton';
import AsyncBoundary from '@/components/common/async-boundary';
import { Region } from '@/constants/regions';
import Link from 'next/link';
import TitleWidgetContainer from '@/components/layout/title-widget-container';
import ErrorWidget from '@/app/(main)/[city]/_components/error-widget';

interface Props {
  region: Region;
}

export default function WeatherContainer({ region }: Props) {
  const { nx, ny, path, name } = region;

  return (
    <>
      <AsyncBoundary
        fallback={<CurrentWeatherWidgetSkeleton />}
        errorFallback={
          <ErrorWidget
            message={'날씨 정보를 불러오는데 실패하였습니다.'}
            aspectRatio={'video'}
          />
        }
      >
        <CurrentWeatherWidget nx={nx} ny={ny} city={path} name={name} />
      </AsyncBoundary>

      <TitleWidgetContainer
        title={'오늘의 날씨'}
        extract={
          <Link
            href={`/${path}/weekly`}
            className={'text-(--azure-sky-700) text-xs md:text-sm font-bold'}
          >
            주간
          </Link>
        }
      >
        <AsyncBoundary
          fallback={<DailyWeatherWidgetSkeleton />}
          errorFallback={
            <ErrorWidget
              message={'날씨 정보를 불러오는데 실패하였습니다.'}
              height={'[128px]'}
            />
          }
        >
          <DailyWeatherWidget nx={nx} ny={ny} city={path} />
        </AsyncBoundary>
      </TitleWidgetContainer>
    </>
  );
}
