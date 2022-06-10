/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_HOSTNAME,
  generateRobotsTxt: false,
};

export default config;
