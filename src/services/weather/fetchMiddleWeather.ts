const SERVICE_KEY = process.env.MIDDLE_WEATHER_FORECAST;
const BASE_URL = process.env.NEXT_PUBLIC_MIDDLE_WEATHER_BASE_URL;

export async function fetchMiddleWeather(
  endpoint: string,
  params: Record<string, string>,
) {
  const url = `${BASE_URL}${endpoint}?${new URLSearchParams({
    serviceKey: SERVICE_KEY!,
    numOfRows: '10',
    pageNo: '1000',
    dataType: 'JSON',
    ...params,
  })}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`${endpoint} 호출 실패`);

  const data = await response.json();
  return data.response?.body?.items?.item || [];
}
