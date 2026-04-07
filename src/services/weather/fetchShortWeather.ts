const SERVICE_KEY = process.env.SHORT_WEATHER_FORECAST;
const BASE_URL = process.env.NEXT_PUBLIC_SHORT_WEATHER_BASE_URL;

export async function fetchShortWeather(
  endpoint: string,
  params: Record<string, string>,
) {
  const url = `${BASE_URL}${endpoint}?${new URLSearchParams({
    serviceKey: SERVICE_KEY!,
    dataType: 'JSON',
    pageNo: '1',
    numOfRows: '1000',
    ...params,
  })}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`${endpoint} 호출 실패`);

  const data = await response.json();
  return data.response?.body?.items?.item || [];
}
