const IS_DEV = process.env.NODE_ENV === "development";

// IMPORTANT: Keep this in sync with netlify.toml
const CSP_HEADER = [
  "upgrade-insecure-requests;",
  "frame-ancestors",
  "'self'",
  ";",
  "frame-src",
  "https:",
  ";",
  "connect-src",
  "'self'",
  "https://streamlit.ghost.io/ghost/api/", // Blog API
  ";",
  "default-src 'none';",
  "font-src 'self';",
  "form-action 'self';",
  "img-src",
  "'self'",
  "data:",
  "https:",
  ";",
  "media-src",
  "https://s3-us-west-2.amazonaws.com/assets.streamlit.io/", // Videos
  ";",
  "script-src",
  "'self'",
  "'unsafe-inline'", // NextJS payload
  IS_DEV ? "'unsafe-eval'" : "",
  "https://cdn.heapanalytics.com/", // Analytics
  "https://cdn.segment.com/", // Analytics
  "https://identity.netlify.com/", // Netlify dev tools
  "https://netlify-cdp-loader.netlify.app/netlify.js", // Netlify dev tools
  "https://www.google-analytics.com/", // Analytics
  "https://www.googletagmanager.com/", // Analytics
  ";",
  "style-src",
  "'self'",
  "'unsafe-inline'", // Twitter CSS
  ";",
];

module.exports = {
  output: "export",

  webpack: (configuration) => {
    configuration.module.rules.push(
      {
        test: /\.md$/,
        use: "frontmatter-markdown-loader",
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "file-loader"],
      },
    );
    return configuration;
  },

  async exportPathMap(defaultPathMap) {
    return {
      ...defaultPathMap,
    };
  },

  // IMPORTANT: These headers are only useful in Dev,
  // and are otherwise ignored by Netlify!
  //
  // On Netlify, use netlify.toml
  //
  // Please keep the two files in sync.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: CSP_HEADER.join(" "),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};
