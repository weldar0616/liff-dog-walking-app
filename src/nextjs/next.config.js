module.exports = {
  reactStrictMode: true,
  env: {
    LIFF_ID: process.env.LIFF_ID,
  },
  head: {
    // inspired by https://mamunga.com/nuxt-liff-init.
    script: [{ src: "https://static.line-scdn.net/liff/edge/2/sdk.js" }],
  },
};
