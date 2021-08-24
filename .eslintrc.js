module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:import/errors'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    camelcase: 0,
    'import/prefer-default-export': 0,
    'import/extensions': ['never'],
    'sort-imports': 0,
    'import/order': [2, { alphabetize: { order: 'asc' } }],
  },
};
