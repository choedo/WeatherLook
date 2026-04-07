import { HomeIcon } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className={
        'flex flex-col gap-8 items-center justify-center h-screen fixed top-0 left-0 w-full bg-white'
      }
    >
      <h1 className={'text-9xl font-extrabold text-(--azure-sky-600)/20'}>
        404
      </h1>
      <h4 className={'text-2xl font-bold text-(--azure-sky-700)'}>
        길을 잃으셨나요?
      </h4>
      <p className={'font-medium text-center text-(--azure-sky-700)/90'}>
        찾으시는 페이지가 구름 뒤로 숨어버린 것 같아요.
        <br />
        새로운 하늘에서 다시 시작해볼까요?
      </p>

      <Link
        href={'/'}
        className={`
          flex items-center gap-2 
          px-6 py-3 
          rounded-full 
          bg-(--azure-sky-700) hover:bg-(--azure-sky-700)/40 transition-colors
          text-white font-semibold `}
      >
        <HomeIcon size={16} />
        홈으로 돌아가기
      </Link>
    </div>
  );
}
