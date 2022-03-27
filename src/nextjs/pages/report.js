import { useEffect, useState } from "react";

export default function Report(props) {
  const [liffObject, setLiffObject] = useState(null);

  useEffect(async () => {
    const liff = (await import("@line/liff")).default;
    await liff.init({
      liffId: process.env.LIFF_ID_REPORT_APP,
    });
    setLiffObject(liff);
    const profile = await liff.getProfile();
    await liff
      .sendMessages([
        {
          type: "text",
          text: JSON.stringify(profile),
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
  return <></>;
}
