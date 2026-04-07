'use client';

import React from 'react';
import { City } from '@/types/city';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CITIES } from '@/constants/city';
import { Button } from '@/components/ui/button';
import { REGIONS } from '@/constants/regions';
import { useRouter } from 'next/navigation';

interface Props {
  initialValue: City;
}
export default function ScrollCityTabs(props: Props) {
  const { initialValue } = props;

  const router = useRouter();

  const [activeTab] = React.useState(initialValue);

  const handleClick = (city: City) => {
    router.replace(`/${city}`);
  };

  return (
    <ScrollArea className={'w-full'}>
      <div className={'flex items-center gap-1'}>
        {CITIES.map((city) => (
          <Button
            key={city}
            onClick={() => handleClick(city)}
            variant={activeTab === city ? 'customDefault' : 'white'}
            size={'lg'}
            className={`px-5 font-bold rounded-full`}
          >
            {REGIONS[city].name}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}
