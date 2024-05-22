module.exports = {
    root: true,
    env: { browser: true, es2020: true, 'cypress/globals': true },
    extends: ['airbnb', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:react-hooks/recommended', 'prettier', 'plugin:storybook/recommended'],
    ignorePatterns: [
        'dist',
        'vite.config.js',
        'tailwind.config.js',
        'vitest.config.js',
        'cypress.config.js',
    ],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh', 'cypress'],
    rules: {
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-param-reassign': 'off',
        'import/order': 'off',
        'import/no-extraneous-dependencies': 'off',
        'react/jsx-no-target-blank': 'off',
        'react/jsx-filename-extension': [
            'error',
            { extensions: ['.jsx', '.tsx'] },
        ],
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'react/jsx-closing-bracket-location': [
            'warn',
            { selfClosing: 'tag-aligned', nonEmpty: 'after-props' },
        ],
        'react/jsx-props-no-spreading': ['warn', { html: 'ignore' }],
        'react/require-default-props': [
            'warn',
            { functions: 'defaultArguments' },
        ],
    },
};
