import devtools from 'solid-devtools/vite';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  let generateScopedName = '[local]--[hash:base64:5]';

  if (isProduction) {
    generateScopedName = '[hash:base64:5]';
  }

  return {
    plugins: [
      devtools({
        locator: {
          targetIDE: 'webstorm',
          componentLocation: true,
          jsxLocation: true,
        },
      }),
      solid(),
    ],
    server: {
      port: 3000,
    },
    build: {
      target: 'esnext',
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
        generateScopedName,
      },
    },
  };
});
