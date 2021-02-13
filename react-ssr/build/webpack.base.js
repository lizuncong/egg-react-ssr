/* eslint-disable no-nested-ternary */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const webpack = require('webpack');
const { getStyleLoaders } = require('./utils');
const pkg = require('../../package');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

module.exports = (target, env) => {
  const isDev = env === 'development';
  const isServer = target === 'node';
  const targets = isServer
    ? {
      node: pkg.engines.node.match(/(\d+\.?)+/)[0],
    }
    : {
      browsers: pkg.browserslist,
    };
  return {
    mode: isDev ? 'development' : 'production',
    bail: !isDev,
    // 生产source-map，开发cheap-module-inline-source-map
    devtool: !isDev ? false : 'cheap-module-inline-source-map',
    output: {
      devtoolModuleFilenameTemplate: (info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: ['node_modules', 'src'],
      alias: {
        src: path.resolve(__dirname, '../src'),
        pages: path.resolve(__dirname, '../src/pages'),
        api: path.resolve(__dirname, '../src/api'),
        components: path.resolve(__dirname, '../src/components'),
        utils: path.resolve(__dirname, '../src/utils'),
      },
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.jsx?$/,
          include: path.resolve(__dirname, '../src'),
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                cacheCompression: false,
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      useBuiltIns: !isServer ? 'usage' : undefined,
                      corejs: !isServer ? 3 : false,
                      targets,
                    },
                  ],
                  '@babel/preset-react',
                ],
                plugins: [
                  '@loadable/babel-plugin',
                  '@babel/plugin-syntax-dynamic-import',
                  [
                    'import',
                    {
                      libraryName: 'antd',
                      // libraryDirectory: "lib", //改成es会有问题
                      style: true, // `style: true` 会加载 less 文件
                    },
                  ],
                ].filter(Boolean),
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|ico)$/i,
          use: {
            loader: 'url-loader',
            options: {
              name: 'media/[name].[hash:8].[ext]',
              limit: 8192,
              emitFile: !isServer,
            },
          },
        },
        {
          test: /\.(eot|ttf|svg|woff)$/i,
          use: {
            loader: 'file-loader',
            options: {
              name: 'media/[name].[hash:8].[ext]',
              emitFile: !isServer,
            },
          },
        },
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: getStyleLoaders(target, env, {
            importLoaders: 1,
            sourceMap: false,
          }),
        },
        {
          test: cssModuleRegex,
          use: getStyleLoaders(target, env, {
            importLoaders: 1,
            sourceMap: false,
            modules: {
              localIdentName: !isDev ? '[hash:base64]' : '[path][name]__[local]',
            },
          }),
        },

        {
          test: lessRegex,
          exclude: lessModuleRegex,
          use: getStyleLoaders(
            target,
            env,
            {
              importLoaders: 2,
              sourceMap: false,
            },
            'less-loader',
            {
              modifyVars: {
                '@primary-color': '#1890FF',
              },
              javascriptEnabled: true,
            },
          ),
        },
        {
          test: lessModuleRegex,
          use: getStyleLoaders(
            target,
            env,
            {
              importLoaders: 2,
              sourceMap: false,
              modules: {
                localIdentName: !isDev ? '[hash:base64]' : '[path][name]__[local]',
              },
            },
            'less-loader',
          ),
        },
      ],
    },
    plugins: [
      new LoadablePlugin({
        writeToDisk: true,
        filename: `loadable-stats-${target}.json`,
      }),
      // 开发环境下，css不能用hash，不然hmr会失效
      new MiniCssExtractPlugin({
        filename: isServer
          ? 'node/static/css/[name].css'
          : (isDev ? 'static/css/[name].css' : 'static/css/[name].[contenthash:8].css'),
        chunkFilename: isServer
          ? 'node/static/css/[name].chunk.css'
          : (isDev ? 'static/css/[name].chunk.css' : 'static/css/[name].[contenthash:8].chunk.css'),
        // ignoreOrder: true,
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // new CompressionPlugin()
    ],
    stats: {
      colors: true,
      timings: true,
    },
  };
};
