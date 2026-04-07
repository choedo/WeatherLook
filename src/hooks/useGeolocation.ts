'use client';

import { useEffect, useState } from 'react';

export const useGeolocation = () => {
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: 37.5664,
    lng: 126.9778,
  });

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return coords;
};
