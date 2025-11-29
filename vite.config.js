// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/payroll-system/',        // must match repo name exactly
  plugins: [react()],
});
