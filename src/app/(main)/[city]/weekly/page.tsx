'use server';

import NotFound from '@/app/not-found-page';
import { City } from '@/types/city';
import { CITIES } from '@/constants/city';
import { REGIONS } from '@/constants/regions';
import AsyncBoundary from '@/components/common/async-boundary';
import WeeklyTemperatureChartWidgetSkeleton from '@/app/(main)/[city]/weekly/_components/weekly-temperature-chart-widget/weekly-temperature-chart-widget-skeleton';
import WeeklyTemperatureChartWidget from '@/app/(main)/[city]/weekly/_components/weekly-temperature-chart-widget/weekly-temperature-chart-widget';
import ErrorWidget from '@/app/(main)/[city]/_components/error-widget';
import WeeklyWeatherWidget from '@/app/(main)/[city]/weekly/_components/weekly-weather-widget/weekly-weather-widget';
import WeeklyWeatherWidgetSkeleton from '@/app/(main)/[city]/weekly/_components/weekly-weather-widget/weekly-weather-widget-skeleton';
import WeeklyWeatherTitleKbd from '@/app/(main)/[city]/weekly/_components/weekly-weather-title-kbd';
import WeatherKbd from '@/components/WeatherKbd';
import {
  AlertCircleIcon,
  ChevronLeftIcon,
  LoaderCircleIcon,
} from 'lucide-react';
import TitleWidgetContainer from '@/components/layout/title-widget-container';
import WeeklyLifeGuideWidgetSkeleton from '@/app/(main)/[city]/weekly/_components/weekly-life-guide-widget/weekly-life-guide-widget-skeleton';
import WeeklyLifeGuideWidgetContainer from '@/app/(main)/[city]/weekly/_components/weekly-life-guide-widget/weekly-life-guide-widget-container';
import WeeklyDetailWidgetContainer from '@/app/(main)/[city]/weekly/_components/weekly-detail-widget/weekly-detail-widget-container';
import Link from 'next/link';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ city: City }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const region = REGIONS[city];

  if (!region) return { title: 'Not Found' };

  const cityName = region.name;

  return {
    title: `${cityName} 주간 날씨 예보`,
    description: `향후 10일간의 ${cityName} 날씨, 기온 추이, 강수 확률을 한눈에 확인하세요. 이번 주말 외출 계획과 주간 라이프 가이드를 제공합니다.`,
    openGraph: {
      title: `${cityName} 주간 날씨 예보 | Weather Look`,
      description: `이번 주 ${cityName} 날씨는 어떨까요? 주간 기온 변화와 비 소식을 미리 확인하세요.`,
      url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${city}/weekly`,
    },
  };
}

export default async function WeeklyPage({ params }: Props) {
  const { city } = await params;

  if (!CITIES.includes(city as City)) return <NotFound />;

  const region = REGIONS[city as City];

  return (
    <div className={'grid grid-cols-12 gap-6'}>
      <div className={'col-span-12 flex flex-col gap-4'}>
        <div className={'flex items-end justify-between'}>
          <div className={'flex items-center gap-2'}>
            <Link href={`/${city}`} className={'cursor-pointer'}>
              <ChevronLeftIcon className={'w-6 h-6 md:w-8 md:h-8'} />
            </Link>

            <div>
              <p
                className={
                  'text-[.6rem] md:text-xs text-(--azure-sky-600) font-bold'
                }
              >
                ATMOSPHERIC INSIGHT
              </p>
              <h2 className={'text-3xl md:text-4xl font-extrabold'}>
                주간 예보
              </h2>
            </div>
          </div>
          <AsyncBoundary
            fallback={
              <WeatherKbd
                text={
                  <LoaderCircleIcon
                    size={16}
                    className={'animate-spin duration-300'}
                  />
                }
              />
            }
            errorFallback={
              <WeatherKbd
                text={
                  <AlertCircleIcon size={16} className={'text-destructive'} />
                }
              />
            }
          >
            <WeeklyWeatherTitleKbd city={city} nx={region.nx} ny={region.ny} />
          </AsyncBoundary>
        </div>

        <AsyncBoundary
          fallback={<WeeklyTemperatureChartWidgetSkeleton />}
          errorFallback={<ErrorWidget />}
        >
          <WeeklyTemperatureChartWidget
            city={city}
            nx={region.nx}
            ny={region.ny}
          />
        </AsyncBoundary>

        <AsyncBoundary
          fallback={<WeeklyWeatherWidgetSkeleton />}
          errorFallback={<ErrorWidget />}
        >
          <WeeklyWeatherWidget city={city} nx={region.nx} ny={region.ny} />
        </AsyncBoundary>
      </div>

      <div className={'col-span-12 lg:col-span-8'}>
        <WeeklyDetailWidgetContainer
          city={city}
          nx={region.nx}
          ny={region.ny}
        />
      </div>
      <div className={'col-span-12 lg:col-span-4'}>
        <TitleWidgetContainer title={'주간 라이프 가이드'}>
          <AsyncBoundary
            fallback={<WeeklyLifeGuideWidgetSkeleton />}
            errorFallback={<ErrorWidget />}
          >
            <WeeklyLifeGuideWidgetContainer city={city} />
          </AsyncBoundary>
        </TitleWidgetContainer>
      </div>
    </div>
  );
}
