const fs = require("fs");
const path = require("path");
const PYTHON_DIRECTORY = path.join(process.cwd(), "python/");

const jsonFunctions = fs.readFileSync(
  path.join(PYTHON_DIRECTORY, "streamlit.json"),
  "utf8",
);
const jsonNotes = fs.readFileSync(
  path.join(PYTHON_DIRECTORY, "snowflake.json"),
  "utf8",
);

const STREAMLIT_FUNCTIONS = jsonFunctions ? JSON.parse(jsonFunctions) : {};
const VERSIONS_LIST = Object.keys(STREAMLIT_FUNCTIONS);
const LATEST_OSS_VERSION = VERSIONS_LIST[VERSIONS_LIST.length - 1];
const PLATFORM_NOTES = jsonNotes ? JSON.parse(jsonNotes) : {};
let platformVersions = {};
let latestPlatformVersion = {};
for (const index in Object.keys(PLATFORM_NOTES)) {
  const key = Object.keys(PLATFORM_NOTES)[index];
  platformVersions[key] = Object.keys(PLATFORM_NOTES[key]);
  latestPlatformVersion[key] = Object.keys(PLATFORM_NOTES[key]).at(-1);
}
const PLATFORM_VERSIONS = platformVersions;
const PLATFORM_LATEST_VERSIONS = latestPlatformVersion;
const PLATFORMS = {};
PLATFORMS["sis"] = "Streamlit in Snowflake";
PLATFORMS["na"] = "Snowflake Native Apps";

const IS_DEV = process.env.NODE_ENV === "development";

// IMPORTANT: Keep this in sync with netlify.toml
// prettier-ignore
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
    "https://*.streamlit.app/",
    "wss://*.streamlit.app/",
    "https://streamlit.ghost.io/ghost/api/", // Blog API
    "https://api.segment.io/", // Analytics
    "https://cdn.segment.com/", // Analytics
    "https://*.auryc.com/", // Analytics (Heap)
    "https://www.google-analytics.com/", // Analytics
    "https://stats.g.doubleclick.net/", // Analytics
    "https://px.ads.linkedin.com/", // LinkedIn ad pixel
    "https://*.algolia.net/", // Search
    "https://*.algolianet.com/", // Search
    "https://widget.kapa.ai/kapa-widget.bundle.js", // Kapa.ai
    "https://kapa-widget-proxy-la7dkmplpq-uc.a.run.app/", // Kapa.ai
    "https://www.google.com/recaptcha/api.js", // Recaptcha for Kapa.ai
    "https://www.gstatic.com/recaptcha/releases/", // Recaptchas for Kapa.ai
    "https://www.google.com/recaptcha/enterprise.js", // Recaptchas for Kapa.ai
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
    "'self'",
    "https://s3-us-west-2.amazonaws.com/assets.streamlit.io/", // Videos
  ";",
  "script-src",
    "'self'",
    "'unsafe-inline'", // NextJS payload
    "'unsafe-eval'", // Required for MDXRemote in [...slug].js. Using App Router may fix this.
    "https://cdn.heapanalytics.com/", // Analytics
    "https://cdn.segment.com/", // Analytics
    "https://www.google-analytics.com/", // Analytics
    "https://www.googletagmanager.com/", // Analytics
    "https://identity.netlify.com/", // Netlify dev tools
    "https://netlify-cdp-loader.netlify.app/netlify.js", // Netlify dev tools
    "https://www.youtube.com/iframe_api/", // YouTube Embed
    "https://snap.licdn.com/", // LinkedIn ad pixel
    "https://connect.facebook.net/", // Facebook ad pixel
    "https://*.algolia.net/", // Search
    "https://*.algolianet.com/", // Search
    "https://widget.kapa.ai/kapa-widget.bundle.js", // Kapa.ai
    "https://kapa-widget-proxy-la7dkmplpq-uc.a.run.app/", // Kapa.ai
    "https://www.google.com/recaptcha/api.js", // Recaptcha for Kapa.ai
    "https://www.gstatic.com/recaptcha/releases/", // Recaptchas for Kapa.ai
    "https://www.google.com/recaptcha/enterprise.js", // Recaptchas for Kapa.ai
  ";",
  "style-src",
    "'self'",
    "'unsafe-inline'", // Twitter CSS
  ";",
  "worker-src",
    "'self'",
    "blob:",
  ";",
];

module.exports = {
  serverRuntimeConfig: {
    STREAMLIT_FUNCTIONS,
    VERSIONS_LIST,
    LATEST_OSS_VERSION,
    PLATFORM_NOTES,
    PLATFORM_VERSIONS,
    PLATFORM_LATEST_VERSIONS,
    PLATFORMS,
  },
  publicRuntimeConfig: {
    VERSIONS_LIST,
    LATEST_OSS_VERSION,
    PLATFORM_VERSIONS,
    PLATFORM_LATEST_VERSIONS,
    PLATFORMS,
  },

  output: "export",

  webpack: (configuration) => {
    // Don't try to polyfill the fs module.
    configuration.resolve.fallback = { fs: false };

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
