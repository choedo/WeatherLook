import { fetchWeeklyLifeGuide } from '@/services/ai/fetchWeeklyLifeGuide';
import { fetchWeeklyTemperatureTrends } from '@/services/ai/fetchWeeklyTemperatureTrends';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { forecast } = await request.json();

    const response = await fetchWeeklyLifeGuide(forecast);

    return NextResponse.json(response);
  } catch (error) {
    console.error('AI 추천 주간 라이프 가이드 실패 ', error);
    return NextResponse.json(
      { error: 'AI 추천 주간 라이프 가이드 실패' },
      { status: 500 },
    );
  }
}
