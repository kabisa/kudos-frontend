module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    extends: [
        'airbnb-typescript',
    ],
    rules: {
        "react/jsx-props-no-spreading": 0,
        "import/no-cycle": 0,
        "react/destructuring-assignment": 0,
        "import/prefer-default-export": 0,
        "react/jsx-one-expression-per-line": 0,
        "max-len": ["error", {"code": 120}]
    }
};