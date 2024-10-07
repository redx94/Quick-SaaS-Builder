// vite.config.js
// Author: Reece Dixon
// Copyright (c) 2024 Reece Dixon. All Rights Reserved.
// Path: Quick-SaaS-Builder-main/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'url';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Quick SaaS Builder',
        short_name: 'QuickSaaS',
        description: 'AI-powered SaaS solution builder',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    host: '::',
    port: 8080,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'lib': resolve(__dirname, 'lib')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: mode === 'development'
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
}));
