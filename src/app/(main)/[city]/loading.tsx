import { LoaderCircleIcon } from 'lucide-react';
import Image from 'next/image';

export default function CityLoading() {
  return (
    <div
      className={`relative w-full h-screen flex flex-col items-center justify-center gap-8`}
    >
      <div
        className={
          'animate-bounce duration-1000 flex flex-col gap-4 items-center justify-center'
        }
      >
        <Image
          src={'/favicon.ico'}
          alt={'Weather Look 로고'}
          width={100}
          height={100}
          className={'aspect-square rounded-full'}
        />
        <h1 className={'text-3xl font-extrabold text-(--deep-text-sky)'}>
          Weather Look
        </h1>
      </div>
      <LoaderCircleIcon
        size={32}
        className={'text-(--azure-sky-600) animate-spin duration-300'}
      />
      <p className={'text-sm text-(--deep-text-sky)/30'}>
        기상 데이터 불러오는 중...
      </p>
    </div>
  );
}
