import { NextPage } from "next";
import { useReport } from "../hooks/useReport";
import {
  formatTime,
} from "../libs/report";
import { createReport } from "../types/report";

const createReport: createReport = async (userName) => {
    const date = new Date();
    return (
      `${formatTime(date.getHours())}:${formatTime(
        date.getMinutes()
      )}\n` +
      `${userName}さんが亀の餌やりをしました。`
    );
  };
  
  const Report: NextPage = () => {
    useReport(process.env.LIFF_ID_TURTLE_APP, createReport);
  
    return <div>亀の餌やりを報告中...</div>
  };
  
  export default Report;
  