import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'plugin:react/recommended',
      'plugin:tailwindcss/recommended',
    ],
    rules: {
      '@next/next/no-img-element': 'off',
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      'arrow-body-style': ['error', 'as-needed'],
      'arrow-parens': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'block-spacing': ['error', 'always'],
      'comma-dangle': ['error', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'always-multiline',
      }],
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'comma-style': ['error', 'last'],
      'curly': ['error', 'all'],
      'import/order': [
        'error', {
          'newlines-between': 'never',
          'alphabetize': {
            'order': 'asc',
            'caseInsensitive': true,
          },
          'groups': [
            'external',
            'builtin',
            'internal',
            'sibling',
            'parent',
            'index',
          ],
        },
      ],
      'indent': ['error', 2],
      'jsx-quotes': ['error', 'prefer-double'],
      'key-spacing': ['error', {
        'beforeColon': false,
        'afterColon': true,
        'mode': 'strict',
      }],
      'no-trailing-spaces': 'error',
      'prefer-const': 'error',
      'quotes': ['error', 'single', {
        'allowTemplateLiterals': true,
        'avoidEscape': true,
      }],
      'react/prop-types': 0,
      'semi-spacing': ['error', { 'before': false, 'after': true }],
      'semi-style': ['error', 'last'],
      'semi': ['error', 'always'],
    },
  }),
];

export default eslintConfig;
