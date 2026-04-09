import { GoogleGenAI } from '@google/genai';

export async function fetchRecommendItem(weatherInfo: string) {
  const SERVICE_KEY = process.env.GEMINI_API_KEY;

  const ai = new GoogleGenAI({ apiKey: SERVICE_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `
    ${weatherInfo} 날씨에 어울리는 아이템 3가지 추천 해줘.
    다른 내용은 필요없고 각 아이템별 "1.아이콘, 이름" 형태로 간단 명료하게 알려줘.
    `,
  });

  return response.text;
}
