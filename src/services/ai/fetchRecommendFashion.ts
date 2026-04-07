import { GoogleGenAI } from '@google/genai';

export async function fetchRecommendFashion(weatherInfo: string) {
  const SERVICE_KEY = process.env.GEMINI_API_KEY;

  const ai = new GoogleGenAI({ apiKey: SERVICE_KEY });

  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: `${weatherInfo} 날씨에 어울리는 옷을 입은 커플 룩북 스타일`,
    config: {
      numberOfImages: 4,
      aspectRatio: '16:9',
    },
  });

  if (!response.generatedImages) {
    throw new Error(`AI 이미지 생성 실패`);
  }

  return response.generatedImages.map((generatedImage) => {
    const base64 = generatedImage.image?.imageBytes;
    return `data:image/png;base64,${base64}`;
  });
}
