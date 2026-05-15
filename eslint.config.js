import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';
import globals from 'globals';
import js from '@eslint/js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  js.configs.recommended,
  // 1. Import the Airbnb rules
  ...compat.extends('eslint-config-airbnb-base'),
  {
    // 2. Set the environments (Globals)
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    // 3. Add your custom rules
    rules: {
      'one-var': 'off',
      'no-underscore-dangle': ['error', { allowAfterThis: true }],
      'array-bracket-spacing': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-console': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
