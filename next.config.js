module.exports = {
  pageExtensions: ["js", "jsx", "md"],

  webpack: (config) => {
    // Remove markdown rule as it will now be handled by the MDX loader
    config.module.rules = config.module.rules.filter(
      (rule) => rule.test?.source !== "\\.md$"
    );

    config.module.rules.push(
      {
        test: /\.md$/,
        use: [
          "babel-loader",
          {
            loader: "@mdx-js/loader",
            options: {
              remarkPlugins: [
                require("./components/utilities/withLineNumbers"),
              ],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "file-loader"],
      }
    );
    return config;
  },

  async exportPathMap(defaultPathMap) {
    return {
      ...defaultPathMap,
    };
  },
};
