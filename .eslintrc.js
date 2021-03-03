module.exports = {
  root: true,
  extends: 'eslint-config-twg/typescript.js',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'import/no-unresolved': 0,
  },
}
