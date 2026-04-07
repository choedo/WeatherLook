import { RAIN_TYPES, SKY_STATES } from '@/types/weather';
import {
  CloudHailIcon,
  CloudIcon,
  CloudRainIcon,
  CloudSnowIcon,
  CloudSunRainIcon,
  CloudyIcon,
  SunDimIcon,
} from 'lucide-react';

type WeatherIconType = SKY_STATES | RAIN_TYPES;

interface Props {
  type: WeatherIconType;
  size?: number;
  color?: string;
  fill?: string;
  strokeWidth?: number;
  colorFull?: boolean;
}

export default function WeatherIcon(props: Props) {
  const { type, colorFull, ...iconProps } = props;

  const weatherIcons = (t: WeatherIconType) => {
    switch (t) {
      case '맑음':
      case '없음':
        return (
          <SunDimIcon
            {...(colorFull ? { fill: '#FBBF24', color: '#FBBF24' } : {})}
            {...iconProps}
          />
        );
      case '구름많음':
        return (
          <CloudIcon
            {...iconProps}
            {...(colorFull ? { fill: '#082F49', color: '#082F49' } : {})}
          />
        );
      case '흐림':
        return (
          <CloudyIcon
            {...iconProps}
            {...(colorFull ? { color: '#082F49' } : {})}
          />
        );
      case '비':
      case '빗방울':
        return (
          <CloudRainIcon
            {...(colorFull ? { fill: '#0EA5E9', color: '#0EA5E9' } : {})}
            {...iconProps}
          />
        );
      case '눈':
      case '눈날림':
        return (
          <CloudSnowIcon
            {...(colorFull ? { fill: '#0EA5E9', color: '#0EA5E9' } : {})}
            {...iconProps}
          />
        );
      case '비/눈':
      case '빗방울눈날림':
        return (
          <CloudHailIcon
            {...(colorFull ? { fill: '#0EA5E9', color: '#0EA5E9' } : {})}
            {...iconProps}
          />
        );
      case '소나기':
        return (
          <CloudSunRainIcon
            {...(colorFull ? { fill: '#0EA5E9', color: '#0EA5E9' } : {})}
            {...iconProps}
          />
        );
      default:
        return (
          <SunDimIcon
            {...(colorFull ? { fill: '#FBBF24', color: '#FBBF24' } : {})}
            {...iconProps}
          />
        );
    }
  };

  return weatherIcons(type);
}
