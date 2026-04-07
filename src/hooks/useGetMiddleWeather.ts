import { City } from '@/types/city';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useGetMiddleWeather({
  city,
  baseDate,
  baseTime,
}: {
  city: City;
  baseDate: string;
  baseTime: string;
}) {
  return useSuspenseQuery({
    queryKey: ['weather', 'middle', city, baseDate, baseTime],
    queryFn: async () => {
      const response = await fetch(
        `/api/weather/middle?${new URLSearchParams({ city, baseDate, baseTime })}`,
      );

      if (!response.ok) {
        throw new Error('단기 날씨 데이터를 가져오는데 실패했습니다.');
      }

      return response.json();
    },
    staleTime: 30 * 60 * 1000,
  });
}
