import { defineConfig, type UserConfig } from 'vite';
import plugins from './.build/plugins';
import buildConfig from './.build/build';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const __DEV__ = mode === 'development';

  const baseConfig: UserConfig = {
    plugins,
    build: buildConfig,
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, './src/components'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@hooks': path.resolve(__dirname, './src/hooks')
      }
    }
  };

  if (!__DEV__) {
    baseConfig.esbuild = {
      drop: ['console', 'debugger']
    };
  }

  return baseConfig;
});
