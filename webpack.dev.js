const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    watchFiles: [
      path.resolve(__dirname, "src/template.html"),
      path.resolve(__dirname, "src/**/*.css"),
      path.resolve(__dirname, "src/**/*.js"),
    ],
    hot: true,
  },
});
