module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended', // eslint-plugin-react
    'plugin:css-modules/recommended',
  ],
  plugins: ['import', 'css-modules', 'react'],
  globals: {
    __DEV__: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018, // ES9。
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
      webpack: {
        config: './build/webpack.base.js',
      },
    },
  },
  rules: {
    "react/prefer-stateless-function": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "no-console": "off",
    "class-methods-use-this": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    // "react/jsx-one-expression-per-line": "off",
  },
};
