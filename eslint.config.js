import js from "@eslint/js";
import globals from "globals";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      "unused-imports": unusedImports,
    },
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      ecmaFeatures: { jsx: true },
    },
    rules: {
      // 🔥 highlight unused imports
      "unused-imports/no-unused-imports": "error",

      // 🔥 highlight unused variables but allow "_var" or "ignoreThis"
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
]);
