import { useEffect, useState } from "react";
import Head from "next/head";

function Content(props) {
  const [mounted, setMounted] = useState(false);

  useEffect(async () => {
    const liff = (await import("@line/liff")).default;
    await liff.ready;
    setMounted(true);
  }, []);

  return (
    mounted && (
      <>
        <h1 className="home__title">
          Welcome to <br />
          <a
            className="home__title__link"
            href="https://developers.line.biz/en/docs/liff/overview/"
          >
            LIFF Starter!
          </a>
        </h1>
      </>
    )
  );
}

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>散歩当番</title>
      </Head>
      <div className="home">
        <Content liff={props.liff} liffError={props.liffError} />
      </div>
    </div>
  );
}
