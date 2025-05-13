import { defineConfig } from 'vite'
import plugins from './.build/plugins';
import buildConfig from './.build/build';
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins,
  build: buildConfig,
  esbuild: {
    drop: ['console', 'debugger']
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
    }
  }
})
