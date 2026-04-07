'use client';

import React from 'react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useLocation } from '@/store/location-store';
import { Button } from '@/components/ui/button';
import { dfs_xy_conv, getNearestRegion } from '@/lib/coordinate';
import { useRouter } from 'next/navigation';
import Footer from '@/components/layout/footer';
import { ArchiveIcon, ShirtIcon } from 'lucide-react';
import Image from 'next/image';
import WeatherKbd from '@/components/WeatherKbd';

export default function Home() {
  const router = useRouter();
  const coords = useGeolocation();
  const {
    path,
    actions: { setLocation },
  } = useLocation();

  const handleNavigation = () => {
    router.push(`/${path}`);
  };

  React.useEffect(() => {
    if (coords) {
      const geo = dfs_xy_conv(coords.lat, coords.lng);

      const nearestRegion = getNearestRegion(geo.nx, geo.ny);

      if (nearestRegion) {
        setLocation({
          ...nearestRegion,
          x: geo.nx,
          y: geo.ny,
          lat: coords.lat,
          lng: coords.lng,
        });
      }
    }
  }, [coords, setLocation]);

  return (
    <div className={'h-screen flex flex-col'}>
      <div className={'flex-1 grid grid-cols-12 gap-4 max-w-7xl mx-auto'}>
        <div
          className={
            'col-span-7 p-8 flex flex-col items-start justify-center gap-12'
          }
        >
          <WeatherKbd text={'실시간 날씨 정보'} />

          <div className={'flex flex-col gap-4'}>
            <h1 className={'text-6xl font-extrabold'}>
              Your Day,{' '}
              <i className={'text-(--azure-sky-700)'}>Perfectly Styled</i> by
              the Sky.
            </h1>
            <p
              className={'text-lg text-muted-foreground font-medium break-keep'}
            >
              Weather Look은 복잡한 기상 데이터를 분석해 당신의 라이프스타일에
              딱 맞는 옷차림을 추천합니다. 날씨 때문에 고민하는 일 없는 완벽한
              하루를 시작하세요.
            </p>
          </div>

          <ul className={'flex gap-4 items-start'}>
            <li
              className={
                'flex flex-col gap-1 px-8 py-4 rounded-full bg-[#E5F2FF]'
              }
            >
              <ShirtIcon fill={'#402D00'} />
              <h6 className={'text-lg font-bold'}>스마트 스타일링</h6>
              <p className={'text-xs text-muted-foreground'}>
                기온과 날씨에 맞춘 최적의 코디 추천
              </p>
            </li>

            <li
              className={
                'flex flex-col gap-1 px-8 py-4 rounded-full bg-(--azure-sky-600)/30'
              }
            >
              <ArchiveIcon className={'text-(--azure-sky-700)'} />
              <h6 className={'text-lg font-bold'}>데일리 필수템</h6>
              <p className={'text-xs text-muted-foreground'}>
                날씨에 따라 꼭 챙겨야 할 아이템 가이드
              </p>
            </li>
          </ul>

          <Button
            onClick={handleNavigation}
            size={'lg'}
            variant={'customDefault'}
            className={'rounded-full px-12 py-8 text-xl font-bold'}
          >
            날씨 조회
          </Button>
        </div>
        <div className={'col-span-5 p-8 w-full h-2/3 relative my-auto'}>
          <Image
            src={'/index-image.png'}
            alt={'Weather Look 소개 이미지'}
            fill
            className={'object-cover'}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
