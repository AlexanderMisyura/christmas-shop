const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = ({ development }) => ({
  mode: development ? 'development' : 'production',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { url: false },
          },
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { url: false },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/index.html',
      filename: 'index.html',
      favicon: path.resolve(__dirname, 'src/assets/icons/favicon.ico'),
      minify: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/gifts/index.html',
      filename: 'gifts/index.html',
      favicon: path.resolve(__dirname, 'src/assets/icons/favicon.ico'),
      minify: false,
    }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, './src/assets'), to: 'assets' },
      ],
    }),
  ],
});
