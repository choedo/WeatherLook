'use client';

import React from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

interface WeatherMapProps {
  lat: number;
  lng: number;
}

export default function WeatherMap({ lat, lng }: WeatherMapProps) {
  const mapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([lng, lat]),
        zoom: 17,
      }),
    });

    return () => map.setTarget(undefined);
  }, [lat, lng]);

  return <div ref={mapRef} className={`w-full h-full`} />;
}
