import { SunDimIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface Props {
  text: string | ReactNode;
}

export default function WeatherKbd({ text }: Props) {
  return (
    <div
      className={`flex items-center gap-2 
              bg-(--golden-amber-500) 
              py-2 px-3 
              rounded-full`}
    >
      <SunDimIcon fill={'#402D00'} size={16} />
      <p className={'text-sm text-[#402D00] font-bold'}>{text}</p>
    </div>
  );
}
