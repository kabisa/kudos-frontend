import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import js from "@eslint/js";

// eslint.config.js
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        process: "readonly",
      },
      parser: tseslint.parser,
    },
    ignores: [
      "build/**",
      "coverage/**",
      "dist/**",
      "jest.config.js",
      ".storybook/*",
      "src/**/*.stories.tsx",
    ],
    plugins: {
      ["react"]: fixupPluginRules(reactPlugin),
      ["react-hooks"]: reactHooksPlugin,
    },
    rules: {
      ...reactPlugin.configs["jsx-runtime"].rules,
      "react/jsx-props-no-spreading": 0,
      "import/no-cycle": 0,
      "react/destructuring-assignment": 0,
      "import/prefer-default-export": 0,
      "max-len": ["error", { code: 120 }],
      "react/button-has-type": 0,
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-vars": 1,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
