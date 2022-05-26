module.exports = {
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  root: true,
  extends: ['eslint-config-twg/typescript.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-unresolved': 0,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/unbound-method': 0,
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 0,
    'no-undef': 'off',
    '@typescript-eslint/no-unsafe-argument': 0,
    'react/display-name': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  globals: {
    __DEV__: 'readonly',
  },
}
