import { NextPage } from "next";
import ReportText from "../components/reportText";
import { useReport } from "../hooks/useReport";
import {
  DayOfWeek,
  formatTime,
  nextPeriod,
  nextPerson,
  periodLabel,
} from "../libs/report";
import { createReport } from "../types/report";

// TODO: 散歩時間外
// if (!isMorning() && !isNight()) {
//   return (
//     "只今、散歩時間帯外になります。\n" +
//     "散歩時間帯は、以下の通りです。\n" +
//     "・🌞 朝: 04:00-12:00\n" +
//     "・🌛 夜: 16:00-24:00"
//   );
// }

const createReport: createReport = (userName) => {
  const date = new Date();
  return (
    `${periodLabel()} ${formatTime(date.getHours())}:${formatTime(
      date.getMinutes()
    )}\n` +
    `${userName}さんが散歩に行きました。\n\n${nextPeriod()}は${nextPerson(
      date.getDay() as DayOfWeek
    )}さんです`
  );
};

const Report: NextPage = () => {
  useReport(process.env.LIFF_ID_REPORT_APP, createReport);

  return <ReportText periodLabel={periodLabel()} />;
};

export default Report;
