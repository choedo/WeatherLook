'use client';

import ErrorWidget from '@/app/(main)/[city]/_components/error-widget';
import WeeklyDetailWidget from '@/app/(main)/[city]/weekly/_components/weekly-detail-widget/weekly-detail-widget';
import WeeklyDetailWidgetSkeleton from '@/app/(main)/[city]/weekly/_components/weekly-detail-widget/weekly-detail-widget-skeleton';
import AsyncBoundary from '@/components/common/async-boundary';
import TitleWidgetContainer from '@/components/layout/title-widget-container';
import { useGetSelectDay } from '@/store/select-day-store';
import { City } from '@/types/city';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

interface Props {
  city: City;
  nx: number;
  ny: number;
}

export default function WeeklyDetailWidgetContainer({ city, nx, ny }: Props) {
  const selected = useGetSelectDay();

  return (
    <TitleWidgetContainer
      title={'상세예보'}
      extract={
        <p className={'text-sm text-(--azure-sky-700) font-bold'}>
          {dayjs().add(selected, 'day').format('M월 D일 (dd)')}
        </p>
      }
      withLine
    >
      <AsyncBoundary
        fallback={<WeeklyDetailWidgetSkeleton />}
        errorFallback={<ErrorWidget height={'50'} />}
      >
        <WeeklyDetailWidget city={city} nx={nx} ny={ny} selected={selected} />
      </AsyncBoundary>
    </TitleWidgetContainer>
  );
}
