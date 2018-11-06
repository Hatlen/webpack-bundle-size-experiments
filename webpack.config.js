const path = require("path");

process.env.NODE_ENV = "production";

module.exports = ["modern", "false"].map(browserType => ({
  mode: process.env.NODE_ENV,
  entry: ["index"].reduce(
    (entries, entryName) => ({
      ...entries,
      [entryName]: path.resolve(__dirname, `src/${entryName}.js`)
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
            ]
          ],
          plugins: ["@babel/plugin-proposal-class-properties"]
        }
      }
    ]
  }
}));
