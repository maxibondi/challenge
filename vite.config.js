import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: "./", // Asegura que los assets se carguen bien en producción
  server: command === "serve" ? { host: "0.0.0.0" } : undefined
}));

