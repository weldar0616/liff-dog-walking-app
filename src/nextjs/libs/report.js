const period = {
  morning: [4, 12],
  night: [16, 24],
};

const USER1 = process.env.TEST_USER1;
const USER2 = process.env.TEST_USER2;
const USER3 = process.env.TEST_USER3;
// TODO: DB定義かduty-rosterと共通化
const rowsList = [
  [USER3, USER1, USER2, USER2, USER2, USER3, USER3],
  [USER1, USER1, USER3, USER1, USER1, USER1, USER2],
];

// TODO: 時間によっては、renderとsendMessageの時間内判定がずれる可能性アリ
const isWithinRangeHours = (targetPriod) => {
  const h = new Date().getHours();
  return targetPriod[0] <= h && h <= targetPriod[1];
};
const isMorning = () => {
  return isWithinRangeHours(period.morning);
};
const isNight = () => {
  return isWithinRangeHours(period.night);
};
export const periodLabel = () => {
  return isMorning() ? "🌞 朝" : isNight() ? "🌛 夜" : "時間外";
};

export const nextPeriod = () => {
  return isMorning() ? "🌛 夜" : "🌞 明日の朝";
};
export const nextPerson = (day) => {
  const rowIdx = isMorning() ? 1 : 0;
  const nextDay = isMorning() ? day : day === 6 ? 0 : day + 1;
  return rowsList[rowIdx][nextDay];
};

export const formatTime = (val) => {
  return String(val).padStart(2, "0");
};