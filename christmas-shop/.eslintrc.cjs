module.exports = {
  root: true,
  env: {
    browser: true,
    es2023: true,
  },
  extends: ['airbnb-base', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2022,
  },
  rules: {
    'no-plusplus': 'off',
    'class-methods-use-this': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],

    'import/extensions': ['error', 'always'],
  },
  plugins: ['prettier'],
  ignorePatterns: ['dist'],
};
