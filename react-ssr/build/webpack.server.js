const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base');

const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;

const env = process.env.NODE_ENV;
const isDev = env === 'development';
const target = 'node';

const serverConfig = {
  target,
  entry: path.resolve(__dirname, '../src/server/index.jsx'),
  externals: [
    nodeExternals({
      whitelist: [reStyle, reImage, /antd\/.*\/style/],
    }),
  ],
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'server-entry.js',
    chunkFilename: isDev ? 'node/[name].[hash:8].js' : 'node/[name].js',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BROWSER': false,
      __DEV__: isDev,
    }),
    // new webpack.BannerPlugin({
    //   banner: 'require("source-map-support").install();',
    //   raw: true,
    //   entryOnly: false,
    // }),
  ].filter(Boolean),
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
};

module.exports = merge(base(target, env), serverConfig);
