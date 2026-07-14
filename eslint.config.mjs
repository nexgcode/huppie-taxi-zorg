import { createConfigForNuxt } from '@nuxt/eslint-config/flat';
import pluginVue from 'eslint-plugin-vue';

const eslintIgnore = [
  // Build and cache
  '.nuxt',
  '.nitro',
  'dist',
  'build',
  '.cache',
  'output',

  // Dependencies
  'node_modules',

  // Config and environment
  '.husky',
  '.vscode',
  '.codesandbox',
  '.platform',
  '.git',
  '.gitignore',

  // Assets and static files
  'assets',
  'public',
  '*.png',
  '*.jpg',
  '*.jpeg',
  '*.webp',
  '*.gif',
  '*.svg',
  '*.ico',
  '*.mp4',
  '*.mp3',
  '*.woff',
  '*.woff2',
  '*.ttf',

  // Misc files
  '*.md',
  '*.log',

  // Project files
  'package-lock.json',
  'package.json',
  'tsconfig.json',
  '.prettierrc.json',
  '.prettierignore',
];

export default createConfigForNuxt({
  features: {
    tooling: true,
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
      braceStyle: '1tbs',
      arrowParens: 'always',
    },
  },
})
  .append(...pluginVue.configs['flat/recommended'])
  .append({
    rules: {
      '@stylistic/arrow-parens': ['error', 'always'],
      'unicorn/no-negated-condition': 'warn',
      'unicorn/prefer-at': 'warn',
      'no-useless-return': 'warn',
      'vue/no-negated-condition': 'warn',
      'nuxt/nuxt-config-keys-order': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-import-compiler-macros': 'error',
      'vue/no-unused-vars': [
        'error',
        {
          ignorePattern: '^_',
        },
      ],
      'vue/require-macro-variable-name': [
        'error',
        {
          defineProps: 'props',
          defineEmits: 'emit',
          defineSlots: 'slots',
          useSlots: 'slots',
          useAttrs: 'attrs',
        },
      ],
      'vue/block-order': [
        'error',
        {
          order: ['template', 'script', 'style'],
        },
      ],
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/define-emits-declaration': ['error', 'type-based'],
      'vue/prefer-use-template-ref': 'error',
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 3,
          },
          multiline: {
            max: 1,
          },
        },
      ],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      '@typescript-eslint/unified-signatures': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-invalid-void-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  }).prepend({ ignores: eslintIgnore });
