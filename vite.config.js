import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite acceso desde cualquier IP en la red
    port: 3000, // Opcional, define el puerto
  },
}));

