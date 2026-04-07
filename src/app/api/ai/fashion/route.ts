import { transformCurrentWeatherInformation } from '@/lib/weather-formatter';
import { fetchRecommendFashion } from '@/services/ai/fetchRecommendFashion';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { weatherData } = await request.json();
    const info = transformCurrentWeatherInformation(weatherData);

    const imageUrls = await fetchRecommendFashion(info);

    return NextResponse.json(imageUrls);
  } catch (error) {
    console.error('AI 이미지 생성 실패 ', error);
    return NextResponse.json({ error: 'AI 이미지 생성 실패' }, { status: 500 });
  }
}
