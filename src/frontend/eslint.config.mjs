import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import eslintJsPlugin from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import jest from "eslint-plugin-jest";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  eslintJsPlugin.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  jest.configs['flat/recommended'],
  jsxA11y.flatConfigs.recommended,
  {
    rules: tsPlugin.configs.recommended.rules,
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
  },
  {
    files: ["src/**/*.test.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
  },
  {
    ignores: ["coverage/**", "**/*.css", "**/dist/**"],
  },
];
