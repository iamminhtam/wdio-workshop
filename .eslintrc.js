module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 13
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        '@typescript-eslint/no-var-requires': 0,
        "semi": ["error", "always"],
        camelcase: 'error',
        'no-param-reassign': 'error',
        'max-classes-per-file': ['error', 1], // single responsibility principle'max-lines': ['error', 500],
        'no-console': 'error',
        'no-use-before-define': 'error',
        'no-return-assign': 'error', // convention, readability
        'no-return-await': 'error'
    }
};