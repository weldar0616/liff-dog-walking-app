import { useEffect, useState } from "react";
import { Image } from "next";

export default function Report(props) {
  const [profile, setProfile] = useState({
    userId: "",
    displayName: "",
    pictureUrl: "",
    statusMessage: "",
  });

  useEffect(async () => {
    const liff = (await import("@line/liff")).default;
    console.log({ liff });
    await liff.ready;
    const profile = await liff.getProfile();
    setProfile(profile);
    console.log({ profile });
  }, [profile.userId]);

  return (
    <section>
      <h1>Profile</h1>
      <div>
        {profile.pictureUrl && (
          <Image
            src={profile.pictureUrl}
            alt={profile.displayName}
            width={500}
            height={500}
          />
        )}
        <div>Name: {profile.displayName}</div>
      </div>
    </section>
  );
}
