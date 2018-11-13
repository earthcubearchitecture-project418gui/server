const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/front/app.js',
  watch: true,
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "bundle.js",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.json?$/,
        include: [
          path.resolve(__dirname, path.join("src", "schema")),
          path.resolve(__dirname, path.join("src", "share", "jsonld_examples", "datasets")),
          path.resolve(__dirname, path.join("src", "share", "jsonld_examples", "organizations"))
        ]
      }
    ]
  }
}