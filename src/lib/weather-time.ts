export const getWeatherTime = () => {
  const now = new Date();
  const minutes = now.getMinutes();
  const currentHour = now.getHours();

  const getFormattedDate = (date: Date) =>
    date.toISOString().slice(0, 10).replace(/-/g, '');

  // 1. 초단기(실황/예보) 시간 계산
  let ultraHour = currentHour;
  let ultraDate = getFormattedDate(now);

  if (minutes < 45) {
    if (ultraHour === 0) {
      ultraHour = 23;
      const yesterday = new Date(now.setDate(now.getDate() - 1));
      ultraDate = getFormattedDate(yesterday);
    } else {
      ultraHour -= 1;
    }
  }

  // 2. 단기예보(Vilage) 시간 계산
  const vilageReleaseHours = [2, 5, 8, 11, 14, 17, 20, 23];
  let vilageBaseHour =
    vilageReleaseHours.filter((h) => h <= currentHour).pop() || 23;
  let vilageBaseDate = getFormattedDate(new Date());

  if (currentHour < 2 || (currentHour === 2 && minutes < 10)) {
    vilageBaseHour = 23;
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    vilageBaseDate = getFormattedDate(yesterday);
  }

  return {
    ultra: {
      date: ultraDate,
      time: `${ultraHour.toString().padStart(2, '0')}00`,
    },
    vilage: {
      date: vilageBaseDate,
      time: `${vilageBaseHour.toString().padStart(2, '0')}00`,
    },
  };
};

export const getMidTermBaseTime = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = now.getHours();

  let baseDate = `${year}${month}${day}`;
  let baseTime = '';

  if (hours < 6) {
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const yYear = yesterday.getFullYear();
    const yMonth = String(yesterday.getMonth() + 1).padStart(2, '0');
    const yDay = String(yesterday.getDate()).padStart(2, '0');
    baseDate = `${yYear}${yMonth}${yDay}`;
    baseTime = '1800';
  } else if (hours < 18) {
    baseTime = '0600';
  } else {
    baseTime = '1800';
  }

  return { baseDate, baseTime };
};

export function isNightTime(): boolean {
  return new Date().getHours() < 6 || new Date().getHours() >= 18;
}
