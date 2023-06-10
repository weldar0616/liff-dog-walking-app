declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly LIFF_ID_REPORT_APP: string;
    readonly LIFF_ID_SKIP_APP: string;
    readonly LIFF_ID_TURTLE_APP: string;
    readonly MESSAGING_API_CHANNEL_ACCESS_TOKEN: string;
    readonly GOOGLE_SERVICE_ACCOUNT_ID: string;
    readonly GOOGLE_CALENDAR_ID: string;
    readonly GOOGLE_CALENDAR_URL: string;
    readonly CALENDAR_API_KEY: string;
  }
}
