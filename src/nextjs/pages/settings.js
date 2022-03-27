import liff from "@line/liff/dist/lib";
import { useEffect } from "react";

export default function Settings() {
  const [liffObject, setLiffObject] = useState(null);

  useEffect(async () => {
    await liff.init({
      liffId: process.env.LIFF_ID,
    });
    liff.logout();
    alert("Logout")
  })

  return (
    <>
      <h2>設定画面</h2>
      <div>開発中...(ログアウトのデバッグに使用中)</div>
    </>
  );
}
