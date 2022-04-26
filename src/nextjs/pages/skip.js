import ReportText from "../components/report-text";
import { useReport } from "../hooks/useReport";
import {
  formatTime,
  nextPeriod,
  nextPerson,
  periodLabel,
} from "../libs/report";

const createReport = (userName) => {
  const date = new Date();
  return (
    `${periodLabel()} ${formatTime(date.getHours())}:${formatTime(
      date.getMinutes()
    )}\n` +
    `${userName}さんが散歩をスキップしました。\n\n${nextPeriod()}は${nextPerson(
      date.getDay()
    )}さんです`
  );
};

export default function Skip() {
  useReport(process.env.LIFF_ID_SKIP_APP, createReport);

  return <ReportText periodLabel={periodLabel()} />;
}
