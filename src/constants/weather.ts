export const WEATHER_CATEGORIES = {
  // 초단기실황 & 초단기예보 전용
  T1H: { name: '기온', unit: '℃', code: 'temp' },
  RN1: { name: '1시간 강수량', unit: 'mm', code: 'precipitation' },
  LGT: { name: '낙뢰', unit: 'kA', code: 'lightningStrike' },

  // 단기예보 전용
  TMP: { name: '1시간 기온', unit: '℃' },
  TMN: { name: '아침 최저기온', unit: '℃' },
  TMX: { name: '낮 최고기온', unit: '℃' },
  POP: { name: '강수확률', unit: '%' },
  PCP: { name: '1시간 강수량', unit: 'mm' },
  SNO: { name: '1시간 신적설', unit: 'cm' },
  WAV: { name: '파고', unit: 'M' },

  // 공통 요소
  SKY: { name: '하늘상태', unit: '코드', code: 'skyState' },
  PTY: { name: '강수형태', unit: '코드', code: 'rainType' },
  REH: { name: '습도', unit: '%', code: 'humidity' },
  WSD: { name: '풍속', unit: 'm/s', code: 'windSpeed' },
  VEC: { name: '풍향', unit: 'deg', code: 'windDirection' },
  UUU: { name: '풍속(동서)', unit: 'm/s', code: 'eastWestWindComponent' },
  VVV: { name: '풍속(남북)', unit: 'm/s', code: 'northSouthWindComponent' },
} as const;

export const WEATHER_CODES = {
  /** 하늘상태 (SKY) */
  SKY: {
    '1': { label: '맑음', icon: 'Sun' },
    '3': { label: '구름많음', icon: 'CloudSun' },
    '4': { label: '흐림', icon: 'Cloud' },
  },

  /** 강수형태 (PTY) */
  PTY: {
    '0': { label: '없음', icon: null },
    '1': { label: '비', icon: 'CloudRain' },
    '2': { label: '비/눈', icon: 'CloudRainSnow' },
    '3': { label: '눈', icon: 'Snowflake' },
    '4': { label: '소나기', icon: 'CloudDrizzle' },
    // 초단기실황/예보에는 5, 6, 7번 코드가 추가될 수 있음
    '5': { label: '빗방울', icon: 'CloudDrizzle' },
    '6': { label: '빗방울눈날림', icon: 'CloudRainSnow' },
    '7': { label: '눈날림', icon: 'Snowflake' },
  },

  /** 2024.11 연장 정보 (PCP, SNO, WSD 정성적 판단) */
  QUALITATIVE: {
    PCP: {
      '1': '약한 비 (3mm 미만)',
      '2': '보통 비 (3~15mm)',
      '3': '강한 비 (15mm 이상)',
    },
    SNO: {
      '1': '보통 눈 (1cm 미만)',
      '2': '많은 눈 (1cm 이상)',
    },
    WSD_LEVEL: (val: number) => {
      if (val < 4) return '약한 바람';
      if (val < 9) return '약간 강한 바람';
      return '강한 바람';
    },
  },
} as const;
