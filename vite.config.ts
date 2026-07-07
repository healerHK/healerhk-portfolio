import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative asset paths make the build work both on the GitHub Pages project URL
  // (/healerhk-portfolio/) and later on a custom domain root.
  base: './',
  plugins: [react()],
  server: {
    port: 5177,
  },
  preview: {
    port: 4177,
  },
});
