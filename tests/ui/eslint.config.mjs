import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import eslintJsPlugin from "@eslint/js";
import globals from "globals";

export default [
  eslintJsPlugin.configs.recommended,

  {
    rules: tsPlugin.configs.recommended.rules,
  },
  // Standard config
  {
    files: ["src/**/*.{ts,tsx}", "test/**/*.spec.ts"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaVersion: "latest",
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
  },
];
