import { getWeatherTime } from '@/lib/weather-time';
import { fetchShortWeather } from '@/services/weather/fetchShortWeather';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nx = searchParams.get('nx');
  const ny = searchParams.get('ny');

  if (!nx || !ny)
    return NextResponse.json(
      { error: '좌표 정보(nx, ny)가 필요합니다.' },
      { status: 400 },
    );

  try {
    const { ultra, vilage } = getWeatherTime();

    const [current, ultraSrt, vilageFcst] = await Promise.all([
      fetchShortWeather('/getUltraSrtNcst', {
        nx,
        ny,
        base_date: ultra.date,
        base_time: ultra.time,
      }), // 초단기실황조회
      fetchShortWeather('/getUltraSrtFcst', {
        nx,
        ny,
        base_date: ultra.date,
        base_time: ultra.time,
      }), // 초단기예보조회
      fetchShortWeather('/getVilageFcst', {
        nx,
        ny,
        base_date: vilage.date,
        base_time: vilage.time,
      }), // 단기예보조회
    ]);

    if (!current.length && !ultraSrt.length) {
      return NextResponse.json(
        { error: '데이터를 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    return NextResponse.json({ current, ultraSrt, vilage: vilageFcst });
  } catch (error) {
    return NextResponse.json(
      { error: '기상청 API 통신 실패' },
      { status: 500 },
    );
  }
}
