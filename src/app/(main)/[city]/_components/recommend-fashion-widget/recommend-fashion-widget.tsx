'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useGetRecommendFashion } from '@/hooks/useGetRecommendFashion';
import Image from 'next/image';
import { City } from '@/types/city';
import { RefinedCurrentWeatherProps } from '@/types/weather';

type Props = {
  city: City;
} & RefinedCurrentWeatherProps;

export default function RecommendFashionWidget({
  city,
  temp,
  skyState,
  windSpeed,
  humidity,
}: Props) {
  const { data } = useGetRecommendFashion({
    city,
    temp,
    skyState,
    windSpeed,
    humidity,
  });

  return (
    <Carousel opts={{ align: 'start' }} className={'w-full'}>
      <CarouselContent className={'-ml-2'}>
        {(data as string[]).map((image, index) => (
          <CarouselItem key={`image-${index}`} className={'pl-2 basis-full'}>
            <div
              className={'relative aspect-video overflow-hidden rounded-2xl'}
            >
              <Image
                src={image}
                alt={`룩북 ${index}`}
                fill
                unoptimized // Base64 에러 방지용 필수 속성
                className={'object-cover shadow-xl rounded-2xl'}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
