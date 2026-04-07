import { GoogleGenAI } from '@google/genai';

export async function fetchRecommendActivity(weatherInfo: string) {
  const SERVICE_KEY = process.env.GEMINI_API_KEY;

  const ai = new GoogleGenAI({ apiKey: SERVICE_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `${weatherInfo} 날씨에 어울리는 활동 추천해줘. 타이틀, 내용 형식으로 간단 명료하게 하나만 알려줘.`,
  });

  return response.text;
}
