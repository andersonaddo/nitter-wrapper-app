module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    "eslint:recommended"
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        "semi": 0,
        "quotes": 0,
        "prettier/prettier": 0, 
        "react-native/no-inline-styles": 0,
        "no-trailing-spaces": 0,
        "curly": 0,
        //https://stackoverflow.com/questions/63961803/eslint-says-all-enums-in-typescript-app-are-already-declared-in-the-upper-scope
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"],
        "eol-last": 0,
        "comma-dangle": 0
      },
    },
  ],
};
