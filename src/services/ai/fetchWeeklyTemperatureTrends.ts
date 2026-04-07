import { GoogleGenAI } from '@google/genai';

export async function fetchWeeklyTemperatureTrends(weatherInfo: number[]) {
  const SERVICE_KEY = process.env.GEMINI_API_KEY;

  const ai = new GoogleGenAI({ apiKey: SERVICE_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `
    다음 배열은 오늘을 기준으로 다음 7일동안의 평균 기온이야.\n 
    ${JSON.stringify(weatherInfo)}.
    기온 데이터를 보고 아래의 예시 형태에 맞춰서 내용만 작성해줘.\n
    \n
    \n
    다음 7일 동안 완만한 기온 상승이 예상되며,\n
    수요일에 최고 기온 28°C를 기록하겠습니다.`,
  });

  return response.text;
}
