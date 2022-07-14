module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:testcafe/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'testcafe'
  ],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never']
  }
}
