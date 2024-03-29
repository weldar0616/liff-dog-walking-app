module.exports = {
  // https://nextjs.org/docs/api-reference/next.config.js/rewrites#rewriting-to-an-external-url
  async rewrites() {
    return [
      {
        source: "/bot/message/broadcast",
        destination: "https://api.line.me/v2/bot/message/broadcast",
      },
    ];
  },
  reactStrictMode: true,
  env: {
    LIFF_ID_REPORT_APP: process.env.LIFF_ID_REPORT_APP,
    LIFF_ID_SKIP_APP: process.env.LIFF_ID_SKIP_APP,
    LIFF_ID_TURTLE_APP: process.env.LIFF_ID_TURTLE_APP,
    MESSAGING_API_CHANNEL_ACCESS_TOKEN:
      process.env.MESSAGING_API_CHANNEL_ACCESS_TOKEN,
    GOOGLE_SERVICE_ACCOUNT_ID: process.env.GOOGLE_SERVICE_ACCOUNT_ID,
    GOOGLE_CALENDAR_ID: process.env.GOOGLE_CALENDAR_ID,
    GOOGLE_CALENDAR_URL: process.env.GOOGLE_CALENDAR_URL,
    CALENDAR_API_KEY: process.env.CALENDAR_API_KEY,
  },
};
