'use client';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useLocationInformation } from '@/store/location-store';
import { MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const { path, name } = useLocationInformation();

  const handleNavigation = (path: string) => {
    router.push(`/${path}`);
  };

  return (
    <header className={'flex justify-between items-center py-4 px-2'}>
      <div
        className={'relative cursor-pointer'}
        onClick={() => handleNavigation('')}
      >
        <Image
          src={'/logo.png'}
          alt={'Weather Look 로고'}
          width={128}
          height={48}
          className={'object-contain'}
          priority
        />
      </div>

      <ul className={'flex gap-2'}>
        <li>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant={'outline'}
                  size={'icon-lg'}
                  onClick={() => handleNavigation(path)}
                  className={'rounded-full'}
                >
                  <MapPinIcon className={'text-(--azure-sky-700)'} />
                </Button>
              }
              delay={0}
              closeDelay={300}
            />
            <TooltipContent>
              <div className={'flex flex-col gap-2'}>
                <h6 className={'text-sm font-bold'}>현위치</h6>
                <p className={'text-xs text-muted-foreground'}>{name}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </li>
      </ul>
    </header>
  );
}
