import { useEffect } from "react";

const period = {
  morning: [4, 12],
  night: [16, 24],
};

const isWithinRangeHours = (targetPriod) => {
  const h = new Date().getHours();
  return targetPriod[0] <= h && h <= targetPriod[1];
}
const isMorning = () => {
  return isWithinRangeHours(period.morning);
};
const isNight = () => {
  return isWithinRangeHours(period.night);
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

    const periodLabel = isMorning() ? "🌞 朝" : isNight() ? "🌛 夜" : "";
    const date = new Date();
    return (
      `${periodLabel} ${date.getHours()}:${date.getMinutes()}\n` +
      `${userName}さんが散歩に行きました。`
    );
  };

  useEffect(async () => {
    const liff = (await import("@line/liff")).default;
    await liff.init({
      liffId: process.env.LIFF_ID_REPORT_APP,
    });
    const profile = await liff.getProfile();
    await liff
      .sendMessages([
        {
          type: "text",
          text: createReport(profile.displayName),
        },
      ])
      .then(() => {
        liff.closeWindow();
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  });

  // TODO: APIのエンドポイントとして使いたい時 Next.jsではどうする?
  return <div>{periodToString()}の散歩を報告中...</div>;
}
