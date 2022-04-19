import dynamic from 'next/dynamic'
import { useEffect } from "react";

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
const periodLabel = () => {
  return isMorning() ? "🌞 朝" : isNight() ? "🌛 夜" : "";
};

const nextPeriod = () => {
  return isMorning() ? "🌛 夜" : "🌞 明日の朝";
};
const nextPerson = (day) => {
  const rowIdx = isMorning() ? 1 : 0;
  const nextDay = isMorning() ? day : day === 6 ? 0 : day + 1;
  return rowsList[rowIdx][nextDay];
};

const formatTime = (val) => {
  return String(val).padStart(2, "0");
};

const DynamicComponent = dynamic(() => import("../components/vconsole"), {
  ssr: false,
});

export default function Report(props) {
  const createReport = (userName) => {
    // if (!isMorning() && !isNight()) {
    //   // TODO: ブロードキャストする必要なし
    //   return (
    //     "只今、散歩時間帯外になります。\n" +
    //     "散歩時間帯は、以下の通りです。\n" +
    //     "・🌞 朝: 04:00-12:00\n" +
    //     "・🌛 夜: 16:00-24:00"
    //   );
    // }

    const date = new Date();
    return (
      `${periodLabel()} ${formatTime(date.getHours())}:${formatTime(
        date.getMinutes()
      )}\n` +
      `${userName}さんが散歩に行きました。\n\n${nextPeriod()}は${nextPerson(date.getDay())}さんです`
    );
  };

  useEffect(async () => {
    const liff = (await import("@line/liff")).default;
    await liff
      .init({
        liffId: process.env.LIFF_ID_REPORT_APP,
      })
      .catch((err) => {
        alert("liff_init_error");
        alert(err);
      });
    const profile = await liff.getProfile().catch((err) => {
      alert("liff_get_profile_error");
      alert(err);
    });

    const message = createReport(profile.displayName);
    const url = encodeURI(
      `${process.env.AWS_LAMDA_API_URL}?message=${message}`
    );
    fetch(url).catch((err) => {
      alert(err);
    });
  });

  // TODO: APIのエンドポイントとして使いたい時 Next.jsではどうする?
  return <div>{periodLabel()}の散歩を報告中...<DynamicComponent /></div>;
}
