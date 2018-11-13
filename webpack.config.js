const path = require('path');

module.exports = {
  mode: 'production',
  entry: './front/app.js',
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
          path.resolve(__dirname, "app")
        ],
        loader: "json-loader"
      }
    ]
  }
}