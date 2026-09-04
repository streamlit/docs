module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_HOSTNAME || "https://docs.streamlit.io",
  generateRobotsTxt: false,
  // next-sitemap stamps every URL with the build time rather than the page's
  // own modification date, so lastmod rewrote all ~5000 entries on each build
  // and made the sitemap differ on every push. Omit it so the sitemap changes
  // only when the set of URLs changes.
  autoLastmod: false,
  exclude: ["/menu", "/.keep", "/style-guide", "/index", "/develop"],
};
