import { useEffect } from "react";

export default function Report(props) {
  useEffect(async () => {
    const liff = (await import("@line/liff")).default;
    await liff.init({
      liffId: process.env.LIFF_ID_REPORT_APP,
    });
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
  return (
    <></>
  );
}
