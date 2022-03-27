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
      // alert("start liff.init()...");
      await liff.init({ liffId: process.env.LIFF_ID });
      console.log("liff.init() done");
      // alert("liff.init() done");
      setLiffObject(liff);
    } catch (error) {
      console.log(`liff.init() failed: ${error}`);
      if (!process.env.liffId) {
        console.info(
          "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
        );
      }
      // setLiffError(error.toString());
    }
    // if (!liff.isLoggedIn()) {
    //   liff.login();
    // }
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  // pageProps.liffError = liffError;
  return <Component {...pageProps} />;
}

export default MyApp;
