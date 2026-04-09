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

  const isLoadingLocation = !coords;

  return (
    <div className={'h-screen flex flex-col'}>
      <div
        className={`
          flex-1 
          grid grid-cols-12 gap-4
          max-w-7xl mx-auto
        `}
      >
        <div
          className={`
            col-span-12 lg:col-span-7
            px-4 py-8 lg:px-8
            flex flex-col items-start justify-center gap-4 lg:gap-12 md:gap-8
          `}
        >
          <WeatherKbd text={'실시간 날씨 정보'} />

          <div className={'flex flex-col gap-4'}>
            <h1
              className={`
                text-2xl lg:text-6xl md:text-4xl
                font-extrabold
              `}
            >
              Your Day,{' '}
              <i className={'text-(--azure-sky-700)'}>Perfectly Styled</i> by
              the Sky.
            </h1>
            <p
              className={`
                text-xs lg:text-lg md:text-sm
                text-muted-foreground 
                font-medium 
                break-keep`}
            >
              Weather Look은 복잡한 기상 데이터를 분석해 당신의 라이프스타일에
              딱 맞는 옷차림을 추천합니다. 날씨 때문에 고민하는 일 없는 완벽한
              하루를 시작하세요.
            </p>
          </div>

          <ul className={'flex gap-4 items-start'}>
            <ListItem
              icon={<ShirtIcon fill={'#402D00'} />}
              title={'스마트 스타일링'}
              content={'기온과 날씨에 맞춘 최적의 코디 추천'}
            />
            <ListItem
              icon={<ArchiveIcon className={'text-(--azure-sky-700)'} />}
              title={'데일리 필수템'}
              content={'날씨에 따라 꼭 챙겨야 할 아이템 가이드'}
            />
          </ul>

          <Button
            onClick={handleNavigation}
            onMouseEnter={() => router.prefetch(`/${path}`)}
            size={'lg'}
            variant={'customDefault'}
            disabled={isLoadingLocation}
            className={`
              rounded-full 
              px-8 py-6 lg:px-12 md:px-10 md:py-8
              text-sm lg:text-xl md:text-lg
              font-bold`}
          >
            날씨 조회
          </Button>
        </div>
        <div
          className={`
            lg:col-span-5
            p-8 
            w-full aspect-4/5 my-auto
            relative 
            hidden lg:block
          `}
        >
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

function ListItem({
  icon,
  title,
  content,
}: {
  icon: React.ReactElement<{ className?: string }>;
  title: string;
  content: string;
}) {
  return (
    <li
      className={`
        flex flex-col gap-1 
        px-6 py-4 lg:px-8
        rounded-full
        bg-[#E5F2FF]
      `}
    >
      <div className={`flex gap-1 md:flex-col`}>
        {React.cloneElement(icon, {
          className: `w-3 h-3 lg:w-6 lg:h-6 md:w-5 md:h-5`,
        })}

        <h6 className={`text-xs lg:text-lg md:text-sm font-bold break-keep`}>
          {title}
        </h6>
      </div>
      <p className={`text-xs text-muted-foreground`}>{content}</p>
    </li>
  );
}
