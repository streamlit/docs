const fs = require('fs');

module.exports = {
  webpack: configuration => {
    configuration.module.rules.push({
      test: /\.md$/,
      use: 'frontmatter-markdown-loader',
    });
    configuration.node.fs = 'empty';
    return configuration;
  },
  async exportPathMap(defaultPathMap) {
    return {
      ...defaultPathMap
    };
  },
};