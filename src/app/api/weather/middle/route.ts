import { REGIONS } from '@/constants/regions';
import { fetchMiddleWeather } from '@/services/weather/fetchMiddleWeather';
import { City } from '@/types/city';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') as City;
  const baseDate = searchParams.get('baseDate');
  const baseTime = searchParams.get('baseTime');

  if (!city)
    return NextResponse.json(
      { error: '도시 위치가 필요합니다.' },
      { status: 400 },
    );

  const { stnId, taRegId, landRegId } = REGIONS[city];

  try {
    const [forecast, tempFcst, landFcst] = await Promise.all([
      fetchMiddleWeather('/getMidFcst', {
        stnId,
        tmFc: `${baseDate}${baseTime}`,
      }), // 중기전망조회
      fetchMiddleWeather('/getMidTa', {
        regId: taRegId,
        tmFc: `${baseDate}${baseTime}`,
      }), // 중기기온조회
      fetchMiddleWeather('/getMidLandFcst', {
        regId: landRegId,
        tmFc: `${baseDate}${baseTime}`,
      }), // 중기육상예보조회
    ]);

    return NextResponse.json({
      forecast: forecast[0],
      tempFcst: tempFcst[0],
      landFcst: landFcst[0],
    });
  } catch (error) {
    console.error('[기상청 중기 API 통신 실패]', error);
    return NextResponse.json(
      { error: '기상청 중기 API 통신 실패' },
      { status: 500 },
    );
  }
}
