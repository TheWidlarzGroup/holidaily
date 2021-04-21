module.exports = {
  root: true,
  extends: 'eslint-config-twg/typescript.js',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'import/no-unresolved': 0,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/unbound-method': 0,
    'react/jsx-curly-brace-presence': 0,
  },
  globals: {
    __DEV__: 'readonly',
  },
}
