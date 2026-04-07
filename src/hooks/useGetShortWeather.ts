import { City } from '@/types/city';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useGetShortWeather({
  city,
  nx,
  ny,
}: {
  city: City;
  nx: number;
  ny: number;
}) {
  return useSuspenseQuery({
    queryKey: ['weather', 'short', city, nx, ny],
    queryFn: async () => {
      const response = await fetch(
        `/api/weather/short?${new URLSearchParams({ nx: String(nx), ny: String(ny) })}`,
      );

      if (!response.ok) {
        throw new Error('단기 날씨 데이터를 가져오는데 실패했습니다.');
      }

      return response.json();
    },
    staleTime: 30 * 60 * 1000,
  });
}
