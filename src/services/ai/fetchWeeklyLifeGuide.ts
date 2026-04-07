import { GoogleGenAI } from '@google/genai';

export async function fetchWeeklyLifeGuide(forecast: string) {
  const SERVICE_KEY = process.env.GEMINI_API_KEY;

  const ai = new GoogleGenAI({ apiKey: SERVICE_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `
    다음은 기상청에서 예보한 주간 날씨 정보야. 
    주간 날씨 정보를 참고하여 주간 라이프 가이드를 아이콘, 타이틀, 내용 형태로 짧게 3가지만 추천해주고
    아이콘, 타이틀, 내용 구분은 '##', 문단별로는 '\n'으로 구분해줘. 라이프가이드 내용 말고는 필요없어.
    
    \n\n ${forecast}`,
  });

  return response.text;
}
