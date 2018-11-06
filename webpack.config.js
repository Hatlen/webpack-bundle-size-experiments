const path = require("path");
const fs = require("fs");

process.env.NODE_ENV = "production";

module.exports = ["modern", "false"].map(browserType => ({
  mode: process.env.NODE_ENV,
  entry: fs.readdirSync("./src").reduce(
    (entries, fileName) => ({
      ...entries,
      [fileName.replace(/\.js$/, "")]: path.resolve(
        __dirname,
        `src/${fileName}`
      )
    }),
    {}
  ),
  output: {
    path: path.resolve(__dirname, "dist"), // string
    filename: browserType === "modern" ? "[name].modern.js" : "[name].js"
  },
  optimization: {
    runtimeChunk: {
      name: "runtime"
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src")],
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets:
                  browserType === "modern"
                    ? {
                        esmodules: true
                      }
                    : {
                        ie: 11
                      }
              }
            ],
            "@babel/preset-react"
          ],
          plugins: ["@babel/plugin-proposal-class-properties"]
        }
      }
    ]
  }
}));
