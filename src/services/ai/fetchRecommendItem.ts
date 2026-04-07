import { GoogleGenAI } from '@google/genai';

export async function fetchRecommendItem(weatherInfo: string) {
  const SERVICE_KEY = process.env.GEMINI_API_KEY;

  const ai = new GoogleGenAI({ apiKey: SERVICE_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `${weatherInfo} 날씨에 어울리는 아이템 3가지 추천 해줘. 아이템 이름과 아이콘만 간단 명료하게 알려줘.`,
  });

  return response.text;
}
