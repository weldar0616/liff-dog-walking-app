import axios from "axios";
import { useEffect } from "react";

const period = {
  morning: [4, 12],
  night: [16, 24],
};

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
const periodLabel = () => {
  return isMorning() ? "🌞 朝" : isNight() ? "🌛 夜" : "";
};

const formatTime = (val) => {
  return String(val).padStart(2, "0");
};

export default function Report(props) {
  const createReport = (userName) => {
    if (!isMorning() && !isNight()) {
      return (
        "只今、散歩時間帯外になります。\n" +
        "散歩時間帯は、以下の通りです。\n" +
        "・🌞 朝: 04:00-12:00\n" +
        "・🌛 夜: 16:00-24:00"
      );
    }

    const date = new Date();
    return (
      `${periodLabel()} ${formatTime(date.getHours())}:${formatTime(
        date.getMinutes()
      )}\n` + `${userName}さんが散歩に行きました。`
    );
  };

  // useEffect(async () => {
  //   const liff = (await import("@line/liff")).default;
  //   await liff.init({
  //     liffId: process.env.LIFF_ID_REPORT_APP,
  //   });
  const profile = { displayName: "hoge" }; //await liff.getProfile();

  console.log(process.env);
  const headers = {
    Content: "application/json",
    Authorization: `Bearer ${process.env.MESSAGING_API_CHANNEL_ACCESS_TOKEN}`,
  };
  axios
    .post(
      "https://api.line.me/v2/bot/message/broadcast",
      {
        messages: [{ type: "text", text: createReport(profile.displayName) }],
      },
      {
        headers,
      }
    )
    .then(() => {
      liff.closeWindow();
    })
    .catch((error) => {
      window.alert(JSON.stringify(error));
    });
  // });

  // TODO: APIのエンドポイントとして使いたい時 Next.jsではどうする?
  return <div>{periodLabel()}の散歩を報告中...</div>;
}
