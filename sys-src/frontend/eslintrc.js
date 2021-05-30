module.exports = {
    parser: 'vue-eslint-parser',
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:vue/recommended', 'prettier'],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {},
    },
    rules: {
        '@typescript-eslint/no-empty-function': 'off',
    },
};
