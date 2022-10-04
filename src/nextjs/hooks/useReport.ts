import { Liff } from "@line/liff";
import { useEffect } from "react";
import { createReport } from "../types/report";

const fetchProfile = async (liff: Liff, liffId: string) => {
  await liff.init({ liffId }).catch((error) => {
    alert(`[liff#init error] ${error}`);
  });

  const profile = await liff.getProfile().catch((error) => {
    if (process.env.NODE_ENV !== "test") {
      alert(`[liff#getProfile error] ${error}: LIFF ID = ${liffId}`);
    }
  });
  return profile;
};

const sendReport = async (liffId: string, createReport: createReport) => {
  const liff = (await import("@line/liff")).default;

  const profile = await fetchProfile(liff, liffId);
  if (!profile) return;

  const message = await createReport(profile.displayName);
  const requestData = { message };
  await fetch("/api/line/messaging", {
    method: "POST",
    body: JSON.stringify(requestData),
  }).catch((error) => alert(`[fetch error] ${error}`));

  liff.closeWindow();
};

export const useReport = (liffId: string, createReport: createReport) => {
  useEffect(() => {
    sendReport(liffId, createReport);
  }, []);
};

export const exportedForTesting = {
  fetchProfile,
};
