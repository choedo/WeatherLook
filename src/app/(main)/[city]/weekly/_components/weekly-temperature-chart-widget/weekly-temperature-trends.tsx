import { WeeklyTemperatureChartData } from '@/app/(main)/[city]/weekly/_components/weekly-temperature-chart-widget/weekly-temperature-chart';
import Pre from '@/components/typography/pre';
import { useGetWeeklyTemperatureTrends } from '@/hooks/useGetWeeklyTemperatureTrends';
import { City } from '@/types/city';

export default function WeeklyTemperatureTrends(props: {
  city: City;
  data: WeeklyTemperatureChartData[];
}) {
  const { data } = useGetWeeklyTemperatureTrends({
    city: props.city,
    weatherData: props.data,
  });

  const trends = data.replace('\n\n', '\n');

  return <Pre className={'text-md text-(--azure-sky-700)'}>{trends}</Pre>;
}
