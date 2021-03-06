const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  mode: "production",

  entry: {
    index: './src/index.js',
    print: './src/date.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
   },
  plugins: [
   new HtmlWebpackPlugin({
     template: "./src/template.html",
     title: 'Webpack starter',
     hash: true,
     filename: './index.html', //This has to be "index.html" for it to work on npm start on a local server
   }),
   new HtmlWebpackPlugin({
     filename: 'minesweeper.html',
     title: 'Minesweeper',
     template: './src/minesweeper.html'
   }),
   new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          // without additional settings , this will reference babelrc
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
      test: /\.(svg|png|jpg|gif)$/i,
      type: "asset/resource",
      },
      {
        test: /\.(s[ac]|c)ss$/i,
          use: [
          //   {
          //     loader:MiniCssExtractPlugin.loader,
          //     // options: { publicPath: ""},
          //   },
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
        ],
      },




      // {
      //   test: /\.(svg|png|jpg|gif)$/,
      //     use: {
      //       loader: "file-loader",
      //       options: {
      //         name: "[name].[hash].[ext]",
      //         outputPath: "dist"
      //       }
      //     }
      // },
      // {
      //   test: /\.(svg|png|jpg|gif)$/i,
      //   use: {
      //     loader: "file-loader",
      //     options: {
      //       name: "[name].[hash].[ext]",
      //       outputPath: "imgs"
      //     }
      //   }
      // }
    ]
  },

  // devtool: "source-map",

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    hot: true
  },
}
