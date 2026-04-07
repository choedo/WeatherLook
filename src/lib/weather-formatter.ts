import { WEATHER_CATEGORIES, WEATHER_CODES } from '@/constants/weather';
import {
  CurrentWeather,
  LandWeatherResponse,
  RAIN_TYPES,
  RefinedCurrentWeather,
  SKY_STATES,
  TaWeatherResponse,
  UltraSrtWeather,
  VilageResponse,
  WeatherCategories,
} from '@/types/weather';

export const transformCurrentWeather = (items: CurrentWeather[]) => {
  if (!items || !items.length) return null;

  const rawData = items.reduce(
    (acc, cur) => {
      const category = cur.category;
      const mapping = WEATHER_CATEGORIES[category];

      acc[category] = { ...mapping, ...cur };
      return acc;
    },
    {} as Record<WeatherCategories, Record<string, string | number>>,
  );

  //   const sky = rawData.SKY;
  const rain = rawData.PTY;

  return {
    temp: rawData.T1H, // 기온
    precipitation: rawData.RN1, // 1시간 강수량
    eastWestWindComponent: rawData.UUU, // 동서바람성분
    northSouthWindComponent: rawData.VVV, // 남북바람성분
    humidity: rawData.REH, // 습도
    rainType: rain, // 강수형태 (코드)
    windDirection: rawData.VEC, // 풍향
    windSpeed: rawData.WSD, // 풍속
  };
};

export const transformUltraSrtForecast = (
  items: UltraSrtWeather[],
): RefinedCurrentWeather[] => {
  if (!items || !items.length) return [];

  const groupByTime = items.reduce(
    (acc, cur) => {
      const time = cur.fcstTime;

      if (!acc[time]) {
        acc[time] = { time, date: cur.fcstDate };
      }

      acc[time][cur.category] = cur.fcstValue;
      return acc;
    },
    {} as Record<string, Record<string, string>>,
  );

  return Object.values(groupByTime)
    .map((data) => {
      const pty = data.PTY || '0'; // 강수형태
      const sky = data.SKY || '1'; // 하늘상태

      return {
        date: data.date,
        time: `${data.time.slice(0, 2)}:${data.time.slice(2)}`, // 예보시간
        temp: data.T1H, // 기온
        precipitation: data.RN1, // 1시간 강수량
        skyState:
          WEATHER_CODES.SKY[sky as keyof typeof WEATHER_CODES.SKY]['label'], // 하늘 상태
        eastWestWindComponent: data.UUU, // 동서바람성분
        northSouthWindComponent: data.VVV, // 남북바람성분
        humidity: data.REH, // 습도
        rainType:
          WEATHER_CODES.PTY[pty as keyof typeof WEATHER_CODES.PTY]['label'], // 강수형태
        lightningStrike: data.LGT, // 낙뢰
        windDirection: data.VEC, // 풍향
        windSpeed: data.WSD, // 풍속
        rawTime: `${data.date}${data.time}`,
      };
    })
    .sort((a, b) => Number(a.rawTime) - Number(b.rawTime));
};

export const transformCurrentWeatherInformation = (
  currentWeather: RefinedCurrentWeather,
) => {
  const { temp, skyState, humidity, windSpeed } = currentWeather;

  return `${temp}도, ${skyState}, 습도 ${humidity}, 풍속 ${windSpeed} m/s`;
};

export type VilageRawData = {
  temps: number[];
  skies: number[];
  pties: number[];
  pops: number[];
  rehs: number[];
};
export type TransformMiddleAverageWeather = {
  maxTemp: number;
  minTemp: number;
  avgPops: number;
  avgRehs: number;
  sky: SKY_STATES | RAIN_TYPES;
};
export const transformMiddleAverageWeather = ({
  vilage,
  tempFcst,
  landFcst,
}: {
  vilage: VilageResponse[];
  tempFcst: TaWeatherResponse;
  landFcst: LandWeatherResponse;
}) => {
  const vilageRawData = vilage.reduce(
    (acc, cur) => {
      const { fcstDate, fcstValue, category } = cur;

      if (!acc[fcstDate]) {
        acc[fcstDate] = {
          temps: [],
          skies: [],
          pties: [],
          pops: [],
          rehs: [],
        };
      }

      const value = Number(fcstValue);
      // 강수확률
      if (category === 'POP') acc[fcstDate]['pops'].push(value);
      // 강수형태
      if (category === 'PTY') acc[fcstDate]['pties'].push(value);
      // 하늘상태
      if (category === 'SKY') acc[fcstDate]['skies'].push(value);
      // 1시간 기온
      if (category === 'TMP') acc[fcstDate]['temps'].push(value);
      // 습도
      if (category === 'REH') acc[fcstDate]['rehs'].push(value);

      return acc;
    },
    {} as Record<string, VilageRawData>,
  );

  function averageWeather(info: VilageRawData): TransformMiddleAverageWeather {
    const maxTemp = Math.max(...info.temps);
    const minTemp = Math.min(...info.temps);

    const isRain = info.pties.every((pty) => pty === 0);
    const pty = Math.max(...info.pties);
    const sky = Math.max(...info.skies);

    return {
      maxTemp,
      minTemp,
      avgPops:
        info.pops.reduce((acc, cur) => (acc += cur), 0) / info.pops.length,
      avgRehs:
        info.rehs.reduce((acc, cur) => (acc += cur), 0) / info.rehs.length,
      sky: isRain
        ? WEATHER_CODES.PTY[String(pty) as keyof typeof WEATHER_CODES.PTY][
            'label'
          ]
        : WEATHER_CODES.SKY[String(sky) as keyof typeof WEATHER_CODES.SKY][
            'label'
          ],
    };
  }

  // [오늘, 내일, 모레, 글피, 그글피]
  const [
    _1,
    tomorrow,
    dayAfterTomorrow,
    twoDayAfterTomorrow,
    threeDayAfterTomorrow,
  ] = Object.values(vilageRawData);

  const afterDays = new Array(7).fill(4).reduce((acc, cur, index) => {
    const day: number = cur + index;

    if (day < 8) {
      const amPopKey = `rnSt${day}Am` as keyof LandWeatherResponse;
      const pmPopKey = `rnSt${day}Pm` as keyof LandWeatherResponse;

      const amPop = landFcst[amPopKey] as number;
      const pmPop = landFcst[pmPopKey] as number;

      if (day === 4 && !amPop) {
        acc[day] = averageWeather(threeDayAfterTomorrow);
      } else {
        acc[day] = {
          maxTemp: tempFcst[`taMax${day}` as keyof TaWeatherResponse],
          minTemp: tempFcst[`taMin${day}` as keyof TaWeatherResponse],
          avgPops: (amPop + pmPop) / 2,
          avgRehs: -1,
          sky: landFcst[`wf${day}Am` as keyof LandWeatherResponse] as string,
        };
      }
    } else {
      acc[day] = {
        maxTemp: tempFcst[`taMax${day}` as keyof TaWeatherResponse],
        minTemp: tempFcst[`taMin${day}` as keyof TaWeatherResponse],
        avgPops: landFcst[`rnSt${day}` as keyof LandWeatherResponse],
        avgRehs: -1,
        sky: landFcst[`wf${day}` as keyof LandWeatherResponse] as string,
      };
    }

    return acc;
  }, {} as TransformMiddleAverageWeather);

  console.log(afterDays, tempFcst, landFcst);

  return {
    1: averageWeather(tomorrow),
    2: averageWeather(dayAfterTomorrow),
    3: averageWeather(twoDayAfterTomorrow),
    ...afterDays,
  };
};

export const getPopAdvice = (pop: number): string => {
  if (pop >= 80) return '우산 필수! 종일 비 소식이 있어요. ☔';
  if (pop >= 60) return '비 올 확률 높음, 큰 우산을 챙기세요. 🌂';
  if (pop >= 40) return '작은 우산 하나 가방에 넣어두면 든든해요. 🌦️';
  if (pop >= 20) return '하늘이 흐려질 수 있으니 야외 활동 시 참고하세요. ☁️';
  return '비 소식 없는 맑은 날, 가벼운 발걸음으로! ✨';
};

export const getRehAdvice = (reh: number): string => {
  if (reh >= 90) return '매우 눅눅해요. 제습기 가동이 필요한 날! 💧';
  if (reh >= 70) return '습도가 높아 끈적임이 느껴질 수 있어요. 👕';
  if (reh >= 40) return '보송보송 쾌적한 습도, 빨래하기 딱 좋아요! 🧺';
  if (reh >= 30) return '조금 건조해요. 수분을 충분히 섭취하세요. 💧';
  return '매우 건조한 날씨, 보습에 각별히 신경 쓰세요! 🧴';
};
