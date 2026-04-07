import { City } from '@/types/city';

export interface Region {
  name: string; // 한글 도시명
  path: City; // URL 경로명 (영문)
  nx: number; // 기상청 격자 X
  ny: number; // 기상청 격자 Y
  stnId: string; // 중기전망조회 지역코드
  taRegId: string; // 중기기온조회 지역코드 (Mid-term Temp)
  landRegId: string; // 중기육상예보조회 지역코드 (Mid-term Land)
}

export const REGIONS: Record<City, Region> = {
  seoul: {
    name: '서울',
    path: 'seoul',
    nx: 60,
    ny: 127,
    stnId: '108',
    taRegId: '11B10101',
    landRegId: '11B00000',
  },
  incheon: {
    name: '인천',
    path: 'incheon',
    nx: 55,
    ny: 124,
    stnId: '108',
    taRegId: '11B20201',
    landRegId: '11B00000',
  },
  gyeonggi: {
    name: '경기도',
    path: 'gyeonggi',
    nx: 60,
    ny: 121, // 수원 기준
    stnId: '108',
    taRegId: '11B20601',
    landRegId: '11B00000',
  },
  gangwon: {
    name: '강원도',
    path: 'gangwon',
    nx: 73,
    ny: 134, // 춘천 기준
    stnId: '105',
    taRegId: '11D10301',
    landRegId: '11D10000',
  },
  chungbuk: {
    name: '충북',
    path: 'chungbuk',
    nx: 69,
    ny: 107, // 청주 기준
    stnId: '131',
    taRegId: '11C10301',
    landRegId: '11C10000',
  },
  daejeon: {
    name: '대전',
    path: 'daejeon',
    nx: 67,
    ny: 100,
    stnId: '133',
    taRegId: '11C20401',
    landRegId: '11C20000',
  },
  sejong: {
    name: '세종',
    path: 'sejong',
    nx: 66,
    ny: 103,
    stnId: '133',
    taRegId: '11C20404',
    landRegId: '11C20000',
  },
  chungnam: {
    name: '충남',
    path: 'chungnam',
    nx: 55,
    ny: 106, // 홍성 기준
    stnId: '133',
    taRegId: '11C20104',
    landRegId: '11C20000',
  },
  jeonbuk: {
    name: '전북',
    path: 'jeonbuk',
    nx: 63,
    ny: 89, // 전주 기준
    stnId: '146',
    taRegId: '11C20101',
    landRegId: '11C20000',
  },
  gwangju: {
    name: '광주',
    path: 'gwangju',
    nx: 58,
    ny: 74,
    stnId: '156',
    taRegId: '11F20501',
    landRegId: '11F20000',
  },
  jeonnam: {
    name: '전남',
    path: 'jeonnam',
    nx: 52,
    ny: 71, // 무안 기준
    stnId: '156',
    taRegId: '11F20401',
    landRegId: '11F20000',
  },
  daegu: {
    name: '대구',
    path: 'daegu',
    nx: 89,
    ny: 90,
    stnId: '143',
    taRegId: '11H10701',
    landRegId: '11H10000',
  },
  gyeongbuk: {
    name: '경북',
    path: 'gyeongbuk',
    nx: 91,
    ny: 106, // 안동 기준
    stnId: '143',
    taRegId: '11H10501',
    landRegId: '11H10000',
  },
  busan: {
    name: '부산',
    path: 'busan',
    nx: 98,
    ny: 76,
    stnId: '159',
    taRegId: '11H20201',
    landRegId: '11H20000',
  },
  ulsan: {
    name: '울산',
    path: 'ulsan',
    nx: 102,
    ny: 84,
    stnId: '159',
    taRegId: '11H20101',
    landRegId: '11H20000',
  },
  gyeongnam: {
    name: '경남',
    path: 'gyeongnam',
    nx: 90,
    ny: 77, // 창원 기준
    stnId: '159',
    taRegId: '11H20301',
    landRegId: '11H20000',
  },
  jeju: {
    name: '제주도',
    path: 'jeju',
    nx: 52,
    ny: 38,
    stnId: '184',
    taRegId: '11G00201',
    landRegId: '11G00000',
  },
};
