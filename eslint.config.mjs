import { fileURLToPath } from "node:url";
import path from "node:path";

import eslintImport from "eslint-plugin-import";
import eslintJs from "@eslint/js";
import eslintReact from "eslint-plugin-react";
import eslintReactHooks from "eslint-plugin-react-hooks";
import eslintSimpleImportSort from "eslint-plugin-simple-import-sort";
import eslintTsParser from "@typescript-eslint/parser";
import eslintUnusedImports from "eslint-plugin-unused-imports";
import eslintVitest from "eslint-plugin-vitest";
import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslintJs.configs.recommended,
  allConfig: eslintJs.configs.all
});

export default [
  ...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended"
  )),
  {
    ignores: ["**/eslint.config.mjs", ".next/**", "playwright-report/**"],
  },
  {
    plugins: {
      import: fixupPluginRules(eslintImport),
      "simple-import-sort": eslintSimpleImportSort,
      "unused-imports": eslintUnusedImports,
      react: fixupPluginRules(eslintReact),
      "react-hooks": fixupPluginRules(eslintReactHooks),
      vitest: fixupPluginRules(eslintVitest)
    },
    languageOptions: {
      parser: eslintTsParser
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"]
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ["tsconfig.json", "packages/*/tsconfig.json"]
        }
      },
      react: { version: "detect" },
      tailwindcss: {
        callees: ["classnames", "clsx", "cva", "cx", "tw", "twx", "classMerge", "ctl"]
      }
    },
    rules: {
      ...eslintReact.configs.recommended.rules,
      ...eslintVitest.configs.recommended.rules,
      "array-callback-return": "error",
      camelcase: "error",
      eqeqeq: ["error", "always"],
      "func-style": ["error", "expression"],
      "import/first": "error",
      "import/no-duplicates": "error",
      "import/no-extraneous-dependencies": "error",
      "import/no-unresolved": "error",
      "max-params": ["error", 3],
      "no-array-constructor": "error",
      "no-await-in-loop": "error",
      "no-console": "error",
      "no-constant-binary-expression": "error",
      "no-constructor-return": "error",
      "lines-between-class-members": ["error", "always", {
        exceptAfterSingleLine: true
      }],
      "no-else-return": ["error", {
        allowElseIf: false
      }],
      "no-extend-native": "error",
      "no-lonely-if": "error",
      "no-param-reassign": "error",
      "no-promise-executor-return": "error",
      "no-self-compare": "error",
      "no-restricted-imports": ["error", {
        patterns: [{
          group: ["./", "../"],
          message: "Relative imports are not allowed."
        }],
      }],
      "no-return-assign": "error",
      "no-template-curly-in-string": "error",
      "no-throw-literal": "error",
      "no-unmodified-loop-condition": "error",
      "no-unreachable-loop": "error",
      "no-unused-private-class-members": "error",
      "no-unused-vars": "off",
      "no-var": "error",
      "object-shorthand": "error",
      "padding-line-between-statements": ["error", {
        blankLine: "always",
        prev: "*",
        next: "return"
      }],
      "prefer-const": "error",
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      "prefer-template": "error",
      "require-atomic-updates": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": "error",
      "vitest/no-disabled-tests": "error",
      "vitest/no-focused-tests": "error",
      "react/jsx-curly-brace-presence": ["error", {
        props: "never",
        children: "never"
      }],
      "react/react-in-jsx-scope": "off",
      "vitest/valid-expect": "off",
    },
  },
  {
    files: ["src/drizzle/**/*.ts"],
    rules: {
      "no-console": "off",
    },
  },
];
