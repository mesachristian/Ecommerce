import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import path from 'path';
import { env } from 'process';

const target = env.ASPNETCORE_URLS
  ? env.ASPNETCORE_URLS.split(';')[0]
  : 'http://localhost:5000';

export default defineConfig({
  plugins: [plugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '^/weatherforecast': {
        target,
        secure: false,
      },
    },
    port: 5173,
    // Removed the 'https' configuration
  },
});
