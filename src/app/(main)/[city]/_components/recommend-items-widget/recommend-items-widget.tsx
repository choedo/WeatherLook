'use client';

import React from 'react';
import { City } from '@/types/city';
import { RefinedCurrentWeatherProps } from '@/types/weather';
import { useGetRecommendItems } from '@/hooks/useGetRecommendItems';
import { ListChecksIcon } from 'lucide-react';

type Props = {
  city: City;
} & RefinedCurrentWeatherProps;

export default function RecommendItemsWidget({
  city,
  temp,
  skyState,
  windSpeed,
  humidity,
}: Props) {
  const { data } = useGetRecommendItems({
    city,
    temp,
    skyState,
    windSpeed,
    humidity,
  });

  const recommendItems = React.useMemo(() => {
    if (!data) return ['', '', ''];

    const items = data
      .replace('1. ', '')
      .replace('2. ', '')
      .replace('3. ', '')
      .split('\n');

    return items as string[];
  }, [data]);

  return (
    <div className={'flex flex-col gap-4 p-5 rounded-2xl  shadow-xl bg-white'}>
      <div className={'flex gap-2 items-center'}>
        <ListChecksIcon className={'text-[#294967]'} size={24} />
        <h4 className={'font-bold text-[#294967]'}>오늘의 추천 아이템</h4>
      </div>
      <ul className={'flex flex-col gap-4'}>
        {recommendItems.map((recommend) => {
          const [item, icon] = recommend.split(' ');
          return (
            <li
              key={item}
              className={
                'rounded-full p-3 flex gap-4 items-center bg-[#F0F9FF]'
              }
            >
              <div className={'rounded-full p-2 bg-[#FFEFD4]'}>{icon}</div>
              <p className={'text-sm font-bold'}>{item}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
