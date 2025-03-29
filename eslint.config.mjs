import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'eslint/config'
import babelParser from '@babel/eslint-parser'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default defineConfig([{
  extends: compat.extends('standard'),

  languageOptions: {
    globals: {
      ...globals.jest,
    },

    parser: babelParser,
  },
}])