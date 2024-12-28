import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ["**/*.{js,mjs,cjs,jsx}"] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        rules: {
            "prettier/prettier": "warn", // Show Prettier issues as warnings
            "react/react-in-jsx-scope": "off", // Modern React doesn't need this
            "no-unused-vars": "warn", // Warn instead of error for unused variables
        },
    },
];
