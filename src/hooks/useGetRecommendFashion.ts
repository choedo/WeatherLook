import { City } from '@/types/city';
import { RefinedCurrentWeatherProps } from '@/types/weather';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = { city: City } & RefinedCurrentWeatherProps;

export function useGetRecommendFashion(props: Props) {
  const { city, ...weatherData } = props;
  return useSuspenseQuery({
    queryKey: ['recommend', 'fashion', city],
    queryFn: async () => {
      const response = await fetch('/api/ai/fashion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weatherData }),
      });

      if (!response.ok) throw new Error('AI 추천 실패');
      return response.json();
    },
    staleTime: 30 * 60 * 1000,
  });
}
