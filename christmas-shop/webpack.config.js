import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import pkg from 'webpack';

const { ProgressPlugin, DefinePlugin } = pkg;

const BASE_PATH = '/alexandermisyura-JSFE2024Q4/christmas-shop/';

const devPlugins = (isDev) =>
  isDev ? [new ProgressPlugin()] : [new ESLintPlugin({ extensions: ['js'] })];

export default ({ development }) => ({
  mode: development ? 'development' : 'production',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[name][ext][query]',
    clean: true,
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[hash][ext][query]',
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                exportLocalsConvention: 'camel-case-only',
                localIdentName: development
                  ? '[local]_[hash:base64:8]'
                  : '[hash:base64:8]',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Christmas Shop',
      favicon: path.resolve(process.cwd(), 'src/app/assets/icons/favicon.ico'),
    }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new DefinePlugin({
      BASE_PATH: JSON.stringify(development ? '/' : BASE_PATH),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(process.cwd(), 'src/gifts.json'),
        },
      ],
    }),
    ...devPlugins(development),
  ],
});
