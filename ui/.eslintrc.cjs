/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  'root': true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended'
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'vue/multi-word-component-names': 'off'
  }
}
