import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://mazo-6.onrender.com/api',  // Your backend API URL
        changeOrigin: true,  // Ensures that the 'Origin' header is properly set to the target URL
        rewrite: (path) => path.replace(/^\/api/, ''),  // Optional: removes '/api' prefix when forwarding to backend
      },
    },
  },
});
