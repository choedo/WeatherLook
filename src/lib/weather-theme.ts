import { RAIN_TYPES, SKY_STATES } from '@/types/weather';

export function getWeatherTheme({
  skyState,
  rainType,
}: {
  skyState: SKY_STATES;
  rainType: RAIN_TYPES;
}) {
  if (
    rainType.includes('비') ||
    rainType.includes('빗방울') ||
    rainType === '소나기'
  )
    return 'bg-gradient-to-br from-[#64748B] to-[#334155]';
  else if (rainType.includes('눈'))
    return 'bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]';

  switch (skyState) {
    case '구름많음':
    case '흐림':
      return 'bg-gradient-to-br from-[#64748B] to-[#334155]';
    case '맑음':
    default: {
      const isNight = new Date().getHours() < 6 || new Date().getHours() >= 18;
      if (isNight) return 'bg-gradient-to-br from-[#1E1B4B] to-[#312E81]';
      else return 'bg-gradient-to-br from-[#0EA5E9] to-[#2563EB]';
    }
  }
}
