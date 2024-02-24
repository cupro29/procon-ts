/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "airbnb-base",
    "prettier",
  ],
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  parser: "@typescript-eslint/parser",
  rules: {
    "import/extensions": "off",
    "no-console": "off",
    "no-unused-vars": ["error", { args: "none" }],
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
