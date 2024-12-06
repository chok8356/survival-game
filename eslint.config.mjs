import { includeIgnoreFile } from '@eslint/compat'
import eslint from '@eslint/js'
import perfectionist from 'eslint-plugin-perfectionist'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tseslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

export default tseslint.config(
  includeIgnoreFile(gitignorePath),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  perfectionist.configs['recommended-alphabetical'],
)
