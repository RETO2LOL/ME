import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Keeps the naming predictable so your non-React app can easily reference it
        entryFileNames: 'assets/react-widget.js',
        assetFileNames: 'assets/react-widget.[ext]',
        chunkFileNames: 'assets/[name].js',
      },
    },
  },
});

