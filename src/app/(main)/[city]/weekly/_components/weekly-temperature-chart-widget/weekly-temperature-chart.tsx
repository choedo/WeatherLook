import { useDeviceType } from '@/hooks/useDeviceType';
import { BarChart, Bar, ResponsiveContainer, Cell } from 'recharts';

export type WeeklyTemperatureChartData = { date: string; temp: number };

export default function WeeklyTemperatureChart({
  data,
}: {
  data: WeeklyTemperatureChartData[];
}) {
  const device = useDeviceType();

  const slice = device === 'tablet' ? 5 : 7;
  const sliceData = data.slice(0, slice);

  const colors = [
    '#E5F2FF',
    '#C9E6FF',
    '#34B5FA',
    '#89CEFF',
    '#C9E6FF',
    '#E5F2FF',
    '#89CEFF',
  ];

  return (
    <ResponsiveContainer width={'99%'} height={'100%'}>
      <BarChart data={sliceData}>
        <Bar
          dataKey={'temp'}
          radius={[24, 24, 0, 0]}
          barSize={`${100 / slice}%`}
        >
          {new Array(slice).fill(null).map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
