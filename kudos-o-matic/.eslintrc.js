module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': ['off'],
    'react/prefer-stateless-function': ['warn'],
    'import/prefer-default-export': ['off'],
    'react/destructuring-assignment': ['off'],
    'jsx-a11y/label-has-associated-control': ['off'],
    'jsx-a11y/label-has-for': ['off'],
  },
  env: {
    browser: true
  }
};
