import "../styles/globals.css";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [liffObject, setLiffObject] = useState(null);
  // const [liffError, setLiffError] = useState(null);

  // Execute liff.init() when the app is initialized
  useEffect(async () => {
    // to avoid `window is not defined` error
    const liff = (await import("@line/liff")).default;
    try {
      console.log("start liff.init()...");
      await liff.init({
        liffId: process.env.LIFF_ID_REPORT_APP,
      });
      console.log("liff.init() done");
      setLiffObject(liff);
    } catch (error) {
      console.log(`liff.init() failed: ${error}`);
      if (!process.env.liffId) {
        console.info(
          "LIFF Starter: Please make sure that you provided `LIFF_ID_REPORT_APP` as an environmental variable."
        );
      }
      // setLiffError(error.toString());
    }
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  // pageProps.liffError = liffError;
  return <Component {...pageProps} />;
}

export default MyApp;
