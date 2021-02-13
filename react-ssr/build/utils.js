const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

exports.getStyleLoaders = (target, env, cssOptions, preProcessor, preProcessorOptions) => {
  const loaders = [
    isDev
    && {
      loader: require.resolve('css-hot-loader'),
    },
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: 'postcss-loader',
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(
      {
        loader: preProcessor,
        options: { sourceMap: true, ...preProcessorOptions },
      },
    );
  }
  return loaders;
};
