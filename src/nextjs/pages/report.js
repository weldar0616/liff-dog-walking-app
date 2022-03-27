import { useEffect, useState } from "react";
import { Head, Image } from "next";

export default function Report(props) {
  const [profile, setProfile] = useState({});

  useEffect(async () => {
    const liff = (await import("@line/liff")).default;
    console.log({ liff });
    await liff.ready;
    const profile = await liff.getProfile();
    setProfile(profile);
  }, [profile.userId]);

  return (
    <section>
      <h1>Profile</h1>
      <div>
        {profile.pictureUrl && profile.displayName && (
          <Image
            src={profile.pictureUrl}
            alt={profile.displayName}
            width={500}
            height={500}
          />
        )}
        {profile.displayName && <div>Name: {profile.displayName}</div>}
      </div>
    </section>
  );
}
