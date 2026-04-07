import { WEATHER_CATEGORIES } from '@/constants/weather';

export type WeatherCategories = keyof typeof WEATHER_CATEGORIES;

export type CommonWeather = {
  baseDate: string;
  baseTime: string;
  category: WeatherCategories;
  nx: number;
  ny: number;
};

export type CurrentWeather = {
  obsrValue: string;
} & CommonWeather;

export type UltraSrtWeather = {
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
} & CommonWeather;

export type RefinedCurrentWeather = {
  date: string;
  time: string;
  temp: string;
  precipitation: string;
  skyState: SKY_STATES;
  eastWestWindComponent: string;
  northSouthWindComponent: string;
  humidity: string;
  rainType: RAIN_TYPES;
  lightningStrike: string;
  windDirection: string;
  windSpeed: string;
  rawTime: string;
};

export type RefinedCurrentWeatherProps = Pick<
  RefinedCurrentWeather,
  'temp' | 'skyState' | 'windSpeed' | 'humidity'
>;

export type SKY_STATES = '맑음' | '구름많음' | '흐림';
export type RAIN_TYPES =
  | '없음'
  | '비'
  | '비/눈'
  | '눈'
  | '소나기'
  | '빗방울'
  | '빗방울눈날림'
  | '눈날림';

export interface VilageResponse {
  baseDate: string;
  baseTime: string;
  category: WeatherCategories;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

export interface LandWeatherResponse {
  regId: string; // 예보구역코드
  rnSt4Am: number; // 4일 후 오전 강수 확률
  rnSt4Pm: number; // 4일 후 오후 강수 확률
  rnSt5Am: number; // 5일 후 오전 강수 확률
  rnSt5Pm: number; // 5일 후 오후 강수 확률
  rnSt6Am: number; // 6일 후 오전 강수 확률
  rnSt6Pm: number; // 6일 후 오후 강수 확률
  rnSt7Am: number; // 7일 후 오전 강수 확률
  rnSt7Pm: number; // 7일 후 오후 강수 확률
  rnSt8: number; // 8일 후 강수 확률
  rnSt9: number; // 9일 후 강수 확률
  rnSt10: number; // 10일 후 강수 확률

  wf4Am: string; // 4일 후 오전 날씨 예보
  wf4Pm: string; // 4일 후 오후 날씨 예보
  wf5Am: string; // 5일 후 오전 날씨 예보
  wf5Pm: string; // 5일 후 오후 날씨 예보
  wf6Am: string; // 6일 후 오전 날씨 예보
  wf6Pm: string; // 6일 후 오후 날씨 예보
  wf7Am: string; // 7일 후 오전 날씨 예보
  wf7Pm: string; // 7일 후 오후 날씨 예보
  wf8: string; // 8일 후 오후 날씨 예보
  wf9: string; // 9일 후 오후 날씨 예보
  sf10: string; // 10일 후 오후 날씨 예보
}

export interface TaWeatherResponse {
  regId: string; // 예보구역코드
  taMin4: number; // 4일 후 예상최저기온
  taMin4Low: number; // 4일 후 예상최저기온 하한 범위
  taMin4High: number; // 4일 후 예상최저기온 상한 범위
  taMax4: number; // 4일 후 예상 최고기온
  taMax4Low: number; // 4일 후 예상최고기온 하한 범위
  taMax4High: number; // 4일 후 예상최고기온 상한 범위

  taMin5: number; // 5일 후 예상최저기온
  taMin5Low: number; // 5일 후 예상최저기온 하한 범위
  taMin5High: number; // 5일 후 예상최저기온 상한 범위
  taMax5: number; // 5일 후 예상 최고기온
  taMax5Low: number; // 5일 후 예상최고기온 하한 범위
  taMax5High: number; // 5일 후 예상최고기온 상한 범위

  taMin6: number; // 6일 후 예상최저기온
  taMin6Low: number; // 6일 후 예상최저기온 하한 범위
  taMin6High: number; // 6일 후 예상최저기온 상한 범위
  taMax6: number; // 6일 후 예상 최고기온
  taMax6Low: number; // 6일 후 예상최고기온 하한 범위
  taMax6High: number; // 6일 후 예상최고기온 상한 범위

  taMin7: number; // 7일 후 예상최저기온
  taMin7Low: number; // 7일 후 예상최저기온 하한 범위
  taMin7High: number; // 7일 후 예상최저기온 상한 범위
  taMax7: number; // 7일 후 예상 최고기온
  taMax7Low: number; // 7일 후 예상최고기온 하한 범위
  taMax7High: number; // 7일 후 예상최고기온 상한 범위

  taMin8: number; // 8일 후 예상최저기온
  taMin8Low: number; // 8일 후 예상최저기온 하한 범위
  taMin8High: number; // 8일 후 예상최저기온 상한 범위
  taMax8: number; // 8일 후 예상 최고기온
  taMax8Low: number; // 8일 후 예상최고기온 하한 범위
  taMax8High: number; // 8일 후 예상최고기온 상한 범위

  taMin9: number; // 9일 후 예상최저기온
  taMin9Low: number; // 9일 후 예상최저기온 하한 범위
  taMin9High: number; // 9일 후 예상최저기온 상한 범위
  taMax9: number; // 9일 후 예상 최고기온
  taMax9Low: number; // 9일 후 예상최고기온 하한 범위
  taMax9High: number; // 9일 후 예상최고기온 상한 범위

  taMin10: number; // 10일 후 예상최저기온
  taMin10Low: number; // 10일 후 예상최저기온 하한 범위
  taMin10High: number; // 10일 후 예상최저기온 상한 범위
  taMax10: number; // 10일 후 예상 최고기온
  taMax10Low: number; // 10일 후 예상최고기온 하한 범위
  taMax10High: number; // 10일 후 예상최고기온 상한 범위
}
