// TODO: 範囲指定 良い方法はないか
type Hour =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24;
type HourRange = {
  start: Hour;
  end: Hour;
};
type Period = {
  morning: HourRange;
  night: HourRange;
};

const period: Period = {
  morning: {
    start: 4,
    end: 12,
  },
  night: {
    start: 16,
    end: 24,
  },
};

// TODO: DB定義
// TODO: duty-rosterと共通化
const USER1: string = process.env.TEST_USER1;
const USER2: string = process.env.TEST_USER2;
const USER3: string = process.env.TEST_USER3;
const roster = [
  [USER3, USER1, USER2, USER2, USER2, USER3, USER3],
  [USER1, USER1, USER3, USER1, USER1, USER1, USER2],
];

// TODO: 時間によっては、renderとsendMessageの時間内判定がずれる可能性アリ
const isWithinRangeHours = (hourRange: HourRange): boolean => {
  const h = new Date().getHours();
  return hourRange.start <= h && h <= hourRange.end;
};
const isMorning = (): boolean => {
  return isWithinRangeHours(period.morning);
};
const isNight = (): boolean => {
  return isWithinRangeHours(period.night);
};
export const periodLabel = (): string => {
  return isMorning() ? "🌞 朝" : isNight() ? "🌛 夜" : "時間外";
};

export const nextPeriod = (): string => {
  return isMorning() ? "🌛 夜" : "🌞 明日の朝";
};
export const nextPerson = (day: number): string => {
  const periodIdx = isMorning() ? 1 : 0;
  const nextDay = isMorning() ? day : day === 6 ? 0 : day + 1;
  return roster[periodIdx][nextDay];
};

export const formatTime = (val: number): string => {
  return String(val).padStart(2, "0");
};
