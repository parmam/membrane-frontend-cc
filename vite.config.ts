import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '/@application': path.resolve(__dirname, './src/application'),
      '/@domain': path.resolve(__dirname, './src/domain'),
      '/@shared': path.resolve(__dirname, './src/shared'),
      '/@infrastructure': path.resolve(__dirname, './src/infrastructure'),
    },
  },
});
