module.exports = {
  root: true,
  extends: 'eslint-config-twg/typescript.js',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-unresolved': 0,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/unbound-method': 0,
    'react/jsx-curly-brace-presence': 0,
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 0,
    'no-undef': 'off',
  },
  globals: {
    __DEV__: 'readonly',
  },
}
