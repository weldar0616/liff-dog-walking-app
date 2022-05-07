import { NextPage } from "next";
import ReportText from "../components/reportText";
import { useReport } from "../hooks/useReport";
import {
  formatTime,
  nextPeriod,
  nextPerson,
  periodLabel,
} from "../libs/report";
import { createReport } from "../types/report";

const createReport: createReport = async (userName) => {
  const date = new Date();
  const np = await nextPerson();
  return (
    `${periodLabel()} ${formatTime(date.getHours())}:${formatTime(
      date.getMinutes()
    )}\n` +
    `${userName}さんが散歩をスキップしました。\n\n${nextPeriod()}は${np}さんです`
  );
};

const Skip: NextPage = () => {
  useReport(process.env.LIFF_ID_SKIP_APP, createReport);

  return <ReportText periodLabel={periodLabel()} />;
};

export default Skip;
