const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "src/"),
  },
  output: {
    // 不同类型分文件夹保存,方便 nginx 设置缓存

    // 入口文件
    filename: "static/js/[name].[contenthash:8].js",

    // chunk 文件
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js",

    // 资源文件
    assetModuleFilename: "static/media/[name].[hash][ext]",

    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new WebpackManifestPlugin(),
  ],
  resolve: {
    // 尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。
    extensions: [".tsx", ".ts", ".js"],
  },
};
