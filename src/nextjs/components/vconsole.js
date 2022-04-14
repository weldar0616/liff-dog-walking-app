import { useEffect } from "react";
import vconsole from "vconsole";

export default function VConsole() {
  useEffect(() => {
    /*ISDEV &&*/ new vconsole();
  }, []);
  return <></>;
}
