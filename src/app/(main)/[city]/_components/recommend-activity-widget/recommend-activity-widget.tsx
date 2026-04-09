'use client';

import React from 'react';
import { useGetRecommendActivity } from '@/hooks/useGetRecommendActivity';
import { City } from '@/types/city';
import { RefinedCurrentWeatherProps } from '@/types/weather';
import Pre from '@/components/typography/pre';
import { TreeDeciduousIcon } from 'lucide-react';

type Props = {
  city: City;
} & RefinedCurrentWeatherProps;

export default function RecommendActivityWidget({
  city,
  temp,
  skyState,
  windSpeed,
  humidity,
}: Props) {
  const { data } = useGetRecommendActivity({
    city,
    temp,
    skyState,
    windSpeed,
    humidity,
  });

  const recommendActivity = React.useMemo(() => {
    if (!data) return { title: '', content: '' };

    const [title, content] = data
      .replace('[', '')
      .replace(']', '')
      .replaceAll('\n', '**')
      .split('**');

    return { title, content };
  }, [data]);

  return (
    <div
      className={
        'flex flex-col gap-2 bg-(--golden-amber-400) p-5 rounded-2xl items-start shadow-xl'
      }
    >
      <div
        className={
          'flex flex-row md:flex-col items-center md:items-start gap-2'
        }
      >
        <div className={'p-2 rounded-full bg-[#FFDF9F] mb-2'}>
          <TreeDeciduousIcon color={'#402D00'} />
        </div>
        <h4
          className={
            'text-lg lg:text-xl font-extrabold text-[#402D00] break-keep'
          }
        >
          {recommendActivity.title}
        </h4>
      </div>
      <Pre className={'text-sm text-[#402D00] break-keep'}>
        {recommendActivity.content}
      </Pre>
    </div>
  );
}
