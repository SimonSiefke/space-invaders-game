module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'typescript-eslint-parser',
  },
  extends: ['plugin:vue/recommended', '@vue/prettier', '@vue/typescript'],
  rules: {},
}
