module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:import/errors'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['./tsconfig.eslint.json'],
  },
  plugins: ['@typescript-eslint'],
  rules: {
    camelcase: 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'sort-imports': 0,
    'import/order': [2, { alphabetize: { order: 'asc' } }],
    'no-restricted-syntax': 0,
    'no-unused-vars': 0,
  },
  settings: {
    'import/resolver': {
      node: { extensions: ['.ts'] },
    },
  },
};
