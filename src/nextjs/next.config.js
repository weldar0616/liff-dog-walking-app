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
    MESSAGING_API_CHANNEL_ACCESS_TOKEN:
      process.env.MESSAGING_API_CHANNEL_ACCESS_TOKEN,
  },
};
