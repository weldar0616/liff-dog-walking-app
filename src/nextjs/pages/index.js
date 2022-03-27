import Head from "next/head";

function Content(props) {
  const liff = props.liff;
  const liffError = props.liffError;

  if (liffError) {
    return <div>{liffError}</div>;
  }

  if (!liff) {
    return <div>liff is undefined...</div>;
  }

  // if (!liff.isLoggedIn() && !liff.isInClient()) {
  //   liff.login();
  //   return <div>Login...</div>;
  // }

  return (
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
