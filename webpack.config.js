const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin")

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    popup: "./src/popup.js"
  },
  output: {
    path: path.resolve(__dirname, "dist/")
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  plugins: [
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "rust-wasm-tutorial"),
      outDir: path.resolve(__dirname, "rust-wasm-tutorial/pkg"),
      outName: "rust-wasm-tutorial"
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "static", to: "." }
      ]
    })
  ],
  devtool: "inline-source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".wasm"]
  }
};
