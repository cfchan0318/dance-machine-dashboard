import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const appEnv = loadEnv(mode, process.cwd());

  return {
    plugins: [react(),tailwindcss()],
    server: {
      host: true, // Allow the server to be accessible externally
      port: 5173, // Use Vite's default port or specify your own
      proxy: {
        '/api': {
          target: appEnv.VITE_API_URL || 'http://localhost:3000', // Use the API URL from environment variables
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''), // Remove `/api` prefix
        },
      },
    },
  };
});