'use client';

import React from 'react';
import { City } from '@/types/city';
import { useGetAverageWeather } from '@/hooks/useGetAverageWeather';
import WeeklyTemperatureChart, {
  WeeklyTemperatureChartData,
} from '@/app/(main)/[city]/weekly/_components/weekly-temperature-chart-widget/weekly-temperature-chart';
import AsyncBoundary from '@/components/common/async-boundary';
import WeeklyTemperatureTrends from '@/app/(main)/[city]/weekly/_components/weekly-temperature-chart-widget/weekly-temperature-trends';
import { LoaderPinwheelIcon } from 'lucide-react';

interface Props {
  city: City;
  nx: number;
  ny: number;
}

export default function WeeklyTemperatureChartWidget({ city, nx, ny }: Props) {
  const now = new Date();
  const mmSeconds = 24 * 60 * 60 * 1000;
  const averageWeeklyWeather = useGetAverageWeather({ city, nx, ny });

  const averageWeeklyTemperature = Object.values(averageWeeklyWeather).reduce(
    (acc, cur, idx) => {
      const { minTemp, maxTemp } = cur;

      const avg = Math.round(((minTemp + maxTemp) / 2) * 10) / 10;

      const date = new Date(now.getTime() + idx * mmSeconds);

      acc.push({
        temp: avg,
        date: `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`,
      });
      return acc;
    },
    [] as WeeklyTemperatureChartData[],
  );

  return (
    <div
      className={
        'w-full rounded-2xl shadow-xl bg-white pt-8 pb-4 px-4 grid grid-cols-12'
      }
    >
      <div className={'col-span-5 flex flex-col gap-2'}>
        <h6 className={'text-xl font-bold'}>기온 추이</h6>
        <AsyncBoundary
          fallback={
            <div className={'w-full h-full flex justify-center items-center'}>
              <LoaderPinwheelIcon
                className={'animate-spin duration-300 text-muted-foreground'}
              />
            </div>
          }
          errorFallback={
            <p className={'text-sm font-bold text-destructive'}>
              데이터를 불러오는데 실패하였습니다.
            </p>
          }
        >
          <WeeklyTemperatureTrends
            data={averageWeeklyTemperature}
            city={city}
          />
        </AsyncBoundary>
      </div>
      <div className={'col-span-7 min-w-0 h-40 relative'}>
        <WeeklyTemperatureChart data={averageWeeklyTemperature} />
      </div>
    </div>
  );
}
