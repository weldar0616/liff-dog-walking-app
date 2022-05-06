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

  const headers = new Headers({
    "x-api-key": process.env.AWS_LAMBDA_API_KEY,
  });
  const message = createReport(profile.displayName);
  const url = encodeURI(`${process.env.AWS_LAMBDA_API_URL}?message=${message}`);
  await fetch(url, { headers }).catch((error) =>
    alert(
      `[fetch error] ${error}: AWS LAMBDA API URL = ${process.env.AWS_LAMBDA_API_URL}`
    )
  );
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
