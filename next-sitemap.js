module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_HOSTNAME || "https://docs.streamlit.io",
  generateRobotsTxt: false,
  exclude: [
    "/menu",
    "/.keep",
    "/style-guide",
    "/gdpr-banner",
    "/index",
    "/library",
  ],
};
