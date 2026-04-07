import { City } from '@/types/city';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = { city: City; forecast: string };

export function useGetWeeklyLifeGuide(props: Props) {
  const { city, forecast } = props;

  return useSuspenseQuery({
    queryKey: ['weekly', 'life-guide', city],
    queryFn: async () => {
      const response = await fetch('/api/ai/lifeguide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forecast }),
      });

      if (!response.ok) throw new Error('AI 추천 실패');
      return response.json();
    },
    staleTime: 30 * 60 * 1000,
  });
}
