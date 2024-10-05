// vite.config.js
// Author: Reece Dixon
// Copyright (c) 2024 Reece Dixon. All Rights Reserved.
// Path: Quick-SaaS-Builder-main/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Quick SaaS Builder',
        short_name: 'SaaSBuilder',
        description: 'An AI-powered tool for creating SaaS solutions.',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon'
          },
          {
            src: '/android-chrome-192x192.png',
            type: 'image/png',
            sizes: '192x192'
          },
          {
            src: '/android-chrome-512x512.png',
            type: 'image/png',
            sizes: '512x512'
          }
        ]
      }
    })
  ],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
});