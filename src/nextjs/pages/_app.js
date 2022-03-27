import "../styles/globals.css";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [liffObject, setLiffObject] = useState(null);
  // const [liffError, setLiffError] = useState(null);
  const [liffProfile, setLiffProfile] = useState({
    userId: "",
    displayName: "",
    pictureUrl: "",
    statusMessage: "",
  });

  // Execute liff.init() when the app is initialized
  useEffect(async () => {
    // to avoid `window is not defined` error
    const liff = (await import("@line/liff")).default;
    try {
      console.log("start liff.init()...");
      // alert("start liff.init()...");
      await liff.init({
        liffId: process.env.LIFF_ID,
      });
      console.log("liff.init() done");
      // alert("liff.init() done");
      setLiffObject(liff);
      console.log("useState", { liff });

      const profile = await liff.getProfile();
      setLiffProfile(profile);
      console.log("useState", { profile });
    } catch (error) {
      console.log(`liff.init() failed: ${error}`);
      if (!process.env.liffId) {
        console.info(
          "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
        );
      }
      // setLiffError(error.toString());
    }
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.profile = liffProfile; // TEST: 別コンポーネントで持たせたい
  // pageProps.liffError = liffError;
  return <Component {...pageProps} />;
}

export default MyApp;
