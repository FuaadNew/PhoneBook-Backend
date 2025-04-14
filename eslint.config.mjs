import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import stylisticJs from "@stylistic/eslint-plugin-js";


export default [
  {
  ignores: ['node_modules', 'dist'],
  plugins: {
    "@stylistic/js": stylisticJs,
  },
  rules: {
    "@stylistic/js/indent": ["error", 2],
    "@stylistic/js/linebreak-style": ["error", "unix"],
    "@stylistic/js/quotes": ["error", "single"],
    "@stylistic/js/semi": ["error", "never"],
   
    
  }
},
  
  js.configs.recommended,
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
];
