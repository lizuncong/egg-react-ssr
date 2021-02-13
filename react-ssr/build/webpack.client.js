const path = require('path');
const isWsl = require('is-wsl');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { merge } = require('webpack-merge');
const { devConfig } = require('./config');
const base = require('./webpack.base');

const env = process.env.NODE_ENV;
const isDev = env === 'development';
const target = 'web';

const outputPath = path.resolve(__dirname, '../../dist/web/assets');

const optimization = {
  runtimeChunk: true,
  splitChunks: {
    chunks: 'all',
    name: false,
    cacheGroups: {
      vendors: {
        test: (module) => module.resource
            && /\.js$/.test(module.resource)
            && module.resource.match('node_modules'),
        name: 'vendor',
      },
    },
  },
};
if (!isDev) {
  optimization.minimizer = [
    new TerserPlugin({
      terserOptions: {
        parse: {
          ecma: 8,
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false,
          inline: 2,
          drop_console: true, // 生产环境移除所有的console语句
        },
        mangle: {
          safari10: true,
        },
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true,
        },
      },
      parallel: !isWsl,
      cache: true,
      sourceMap: true,
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        map: {
          inline: false,
          annotation: true,
        },
      },
    }),
  ];
}
const clientConfig = {
  target,
  entry: {
    client: path.resolve(__dirname, '../src/client/index.jsx'),
  },
  output: {
    path: outputPath,
    filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDev ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
    publicPath: isDev ? `http://localhost:${devConfig.port}/public/web/assets/` : 'http://localhost:7001/public/web/assets/',
    // publicPath: '/public/web/assets/',
  },
  optimization,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
    }),
    // new HtmlWebpackPlugin({
    //   index: 'index.html',
    //   template: path.resolve(__dirname, '../src/template.html'),
    // }),
  ].filter(Boolean),
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};

// 开发环境启用dev-server
if (isDev) {
  clientConfig.devServer = {
    host: '0.0.0.0',
    port: devConfig.port,
    contentBase: outputPath,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: {
      index: '/public/web/assets/index.html',
    },
    overlay: {
      errors: true,
    },
  };
}

module.exports = merge(base(target, env), clientConfig);
