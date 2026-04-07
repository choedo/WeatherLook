import { CircleXIcon } from 'lucide-react';

interface Props {
  message?: string;
  icon?: React.ReactNode;
}

type AspectProps = Props & { aspectRatio?: 'square' | 'video' | 'auto' };
type HeightProps = Props & { height?: number | string };

export default function ErrorWidget(props: AspectProps | HeightProps) {
  const height = 'height' in props ? props.height : undefined;
  const aspectRatio = 'aspectRatio' in props ? props.aspectRatio : undefined;

  return (
    <div
      className={`
        w-full 
        ${aspectRatio ? `aspect-${aspectRatio}` : ''} 
        ${height ? `h-${height}` : ''} 
        rounded-2xl shadow-2xl 
        flex justify-center items-center
        bg-[#E9F1FF]`}
    >
      <div
        className={
          'text-destructive flex flex-col gap-4 items-center justify-center'
        }
      >
        {props.icon || <CircleXIcon />}
        <p className={'text-md font-bold'}>
          {props.message || '데이터를 불러오는데 실패하였습니다.'}
        </p>
      </div>
    </div>
  );
}
