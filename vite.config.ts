import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { photographyManifestPlugin } from './vite-plugins/photographyManifest';

export default defineConfig({
  plugins: [react(), photographyManifestPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          gsap: ['gsap', '@gsap/react'],
          motion: ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    port: 5173,
    open: true,
  },
});
