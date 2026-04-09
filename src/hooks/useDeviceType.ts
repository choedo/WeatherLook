'use client';

import { useState, useEffect } from 'react';

// Tailwind 브레이크포인트 기준
// Mobile: < 768px
// Tablet: 768px ~ 1023px (md)
// PC: >= 1024px (lg)

export type DeviceType = 'mobile' | 'tablet' | 'pc' | null;

export const useDeviceType = (): DeviceType => {
  const [device, setDevice] = useState<DeviceType>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDevice('mobile');
      } else if (width >= 768 && width < 1024) {
        setDevice('tablet');
      } else {
        setDevice('pc');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return device;
};
