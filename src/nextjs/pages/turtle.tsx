import { NextPage } from "next";
import ReportText from "../components/reportText";
import { useReport } from "../hooks/useReport";
import {
  formatTime,
  periodLabel,
} from "../libs/report";
import { createReport } from "../types/report";

const createReport: createReport = async (userName) => {
    const date = new Date();
    return (
      `${periodLabel()} ${formatTime(date.getHours())}:${formatTime(
        date.getMinutes()
      )}\n` +
      `${userName}さんが亀の餌やりをしました。`
    );
  };
  
  const Report: NextPage = () => {
    useReport(process.env.LIFF_ID_TURTLE_APP, createReport);
  
    return <ReportText periodLabel={periodLabel()} />;
  };
  
  export default Report;
  