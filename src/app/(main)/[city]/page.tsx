'use server';

import ErrorWidget from '@/app/(main)/[city]/_components/error-widget';
import RecommendActivityWidgetContainer from '@/app/(main)/[city]/_components/recommend-activity-widget/recommend-activity-widget-container';
import RecommendActivityWidgetSkeleton from '@/app/(main)/[city]/_components/recommend-activity-widget/recommend-activity-widget-skeleton';
import RecommendFashionWidgetContainer from '@/app/(main)/[city]/_components/recommend-fashion-widget/recommend-fashion-widget-container';
import RecommendFashionWidgetSkeleton from '@/app/(main)/[city]/_components/recommend-fashion-widget/recommend-fashion-widget-skeleton';
import RecommendItemsWidgetContainer from '@/app/(main)/[city]/_components/recommend-items-widget/recommend-items-widget-container';
import RecommendItemsWidgetSkeleton from '@/app/(main)/[city]/_components/recommend-items-widget/recommend-items-widget-skeleton';
import ScrollCityTabs from '@/app/(main)/[city]/_components/scroll-city-tabs';
import WeatherContainer from '@/app/(main)/[city]/_components/weather-container';
import WeatherMapWidget from '@/app/(main)/[city]/_components/weather-map-widget/weather-map-widget';
import NotFound from '@/app/not-found-page';
import AsyncBoundary from '@/components/common/async-boundary';
import TitleWidgetContainer from '@/components/layout/title-widget-container';
import { CITIES } from '@/constants/city';
import { REGIONS } from '@/constants/regions';
import { City } from '@/types/city';

interface Props {
  params: Promise<{ city: City }>;
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;

  if (!CITIES.includes(city as City)) return <NotFound />;

  const region = REGIONS[city as City];

  return (
    <div className={'grid grid-cols-12 gap-6'}>
      <div className={'col-span-8 flex flex-col gap-4'}>
        <ScrollCityTabs initialValue={city} />
        <WeatherContainer region={region} />
        <WeatherMapWidget />
      </div>
      <div className={'col-span-4 flex flex-col gap-4'}>
        <AsyncBoundary
          fallback={<RecommendActivityWidgetSkeleton />}
          errorFallback={
            <ErrorWidget
              message={'오늘의 추천 활동을 불러오는데 실패하였습니다.'}
              aspectRatio={'video'}
            />
          }
        >
          <RecommendActivityWidgetContainer
            nx={region.nx}
            ny={region.ny}
            city={city}
          />
        </AsyncBoundary>

        <TitleWidgetContainer title={'이런 스타일은 어떠세요?'}>
          <AsyncBoundary
            fallback={<RecommendFashionWidgetSkeleton />}
            errorFallback={
              <ErrorWidget
                message={'오늘의 추천 스타일을 불러오는데 실패하였습니다.'}
                aspectRatio={'video'}
              />
            }
          >
            <RecommendFashionWidgetContainer
              nx={region.nx}
              ny={region.ny}
              city={city}
            />
          </AsyncBoundary>
        </TitleWidgetContainer>

        <AsyncBoundary
          fallback={<RecommendItemsWidgetSkeleton />}
          errorFallback={
            <ErrorWidget
              message={'오늘의 추천 아아템을 불러오는데 실패하였습니다.'}
              aspectRatio={'square'}
            />
          }
        >
          <RecommendItemsWidgetContainer
            nx={region.nx}
            ny={region.ny}
            city={city}
          />
        </AsyncBoundary>
      </div>
    </div>
  );
}
