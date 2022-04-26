import { useEffect } from "react";

export const useReport = (createReport) => {
  useEffect(async () => {
    const liff = (await import("@line/liff")).default;
    await liff
      .init({
        liffId: process.env.LIFF_ID_REPORT_APP,
      })
      .catch((error) => {
        alert(`[liff#init error] ${error}`);
      });
    const profile = await liff.getProfile().catch((error) => {
      alert(
        `[liff#getProfile error] ${error}: LIFF ID = ${process.env.LIFF_ID_REPORT_APP}`
      );
    });
    if (!profile) {
      return;
    }

    const headers = new Headers({
      "x-api-key": process.env.AWS_LAMBDA_API_KEY,
    });
    const message = createReport(profile?.displayName);
    const url = encodeURI(
      `${process.env.AWS_LAMBDA_API_URL}?message=${message}`
    );
    fetch(url, {
      headers,
    })
      .then(() => {
        liff.closeWindow();
      })
      .catch((error) => {
        alert(
          `[fetch error] ${error}: AWS LAMBDA API URL = ${process.env.AWS_LAMBDA_API_URL}`
        );
      });
  }, []);
};
