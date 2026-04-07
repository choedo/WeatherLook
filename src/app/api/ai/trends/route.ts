import { WeeklyTemperatureChartData } from '@/app/(main)/[city]/weekly/_components/weekly-temperature-chart-widget/weekly-temperature-chart';
import { fetchWeeklyTemperatureTrends } from '@/services/ai/fetchWeeklyTemperatureTrends';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { weatherData } = await request.json();
    const info = (weatherData as WeeklyTemperatureChartData[]).map(
      (item) => item.temp,
    );

    const response = await fetchWeeklyTemperatureTrends(info);

    return NextResponse.json(response);
  } catch (error) {
    console.error('AI 추천 아이템 추천 실패 ', error);
    return NextResponse.json(
      { error: 'AI 추천 아이템 추천 실패' },
      { status: 500 },
    );
  }
}
