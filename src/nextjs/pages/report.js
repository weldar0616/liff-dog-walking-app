import { useEffect, useState } from "react";
import { Image } from "next";

export default function Report(props) {
  // const [mounted, setMounted] = useState(false);
  // const [profile, setProfile] = useState({
  //   userId: "",
  //   displayName: "",
  //   pictureUrl: "",
  //   statusMessage: "",
  // });

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // useEffect(async () => {
  //   // const liff = (await import("@line/liff")).default;
  //   // console.log({ liff }, liff.isLoggedIn());
  //   const waitUntil = async (conditionCallback, intervalMiliSecond = 100) => {
  //     return new Promise((resolve) => {
  //       if (conditionCallback()) {
  //         return resolve();
  //       }
  //       const iid = setInterval(() => {
  //         if (conditionCallback()) {
  //           console.log({props})
  //           clearInterval(iid);
  //           return resolve();
  //         }
  //       }, intervalMiliSecond);
  //     });
  //   };
  //   console.log("useEffect", props)
  //   await waitUntil(() => props.liff && props.liff.isLoggedIn());
  //   // await liff.ready;
  //   const profile = await props.liff.getProfile();
  //   setProfile(profile);
  //   console.log({ profile }); // ここは取れているが、それ以前でエラー
  //   // Error: Minified React error #130; visit https://reactjs.org/docs/error-decoder.html?invariant=130&args[]=undefined&args[]= for the full message or use the non-minified dev environment for full errors and additional helpful warnings.
  // }, [profile.userId]);

  const { liff, profile } = props;
  console.log(liff, profile);

  return (
    <section>
      <h1>Profile</h1>
      <div>
        てすと
        {/* {profile.pictureUrl && (
          <Image
            src={profile.pictureUrl}
            alt={profile.displayName}
            width={500}
            height={500}
          />
        )}
        <div>Name: {profile.displayName}</div> */}
      </div>
    </section>
  );
}
