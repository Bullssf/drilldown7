require('@rushstack/eslint-config/patch/modern-module-resolution');
module.exports = {
  extends: ['@microsoft/eslint-config-spfx/lib/profiles/react'],
  parserOptions: { tsconfigRootDir: __dirname },
  rules: {
    "prefer-const": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "react/no-unescaped-entities": "off",
    "no-unused-expression": "off",
    "eqeqeq": "off",


    "@microsoft/spfx/no-async-await": "off",
    "react/jsx-no-bind": "off",
    "@typescript-eslint/typedef": "off",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@rushstack/eslint-plugin/no-async-await": "off",
    "@jsx-eslint/eslint-plugin-react/jsx-no-bind": "off"
  }
};