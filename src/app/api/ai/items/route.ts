import { transformCurrentWeatherInformation } from '@/lib/weather-formatter';
import { fetchRecommendItem } from '@/services/ai/fetchRecommendItem';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { weatherData } = await request.json();
    const info = transformCurrentWeatherInformation(weatherData);

    const response = await fetchRecommendItem(info);

    return NextResponse.json(response);
  } catch (error) {
    console.error('AI 추천 아이템 추천 실패 ', error);
    return NextResponse.json(
      { error: 'AI 추천 아이템 추천 실패' },
      { status: 500 },
    );
  }
}
