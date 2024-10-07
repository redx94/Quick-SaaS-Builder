// vite.config.js
// Author: Reece Dixon
// Copyright (c) 2024 Reece Dixon. All Rights Reserved.
// Path: Quick-SaaS-Builder-main/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, join } from 'path';
import { fileURLToPath, URL } from 'url';
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
    host: '::',
    port: 8080,
    open: true,  // Automatically open the browser when the server starts
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'lib': resolve(__dirname, 'lib'),
      'components': fileURLToPath(new URL('./src/components', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',  // Use terser for better minification
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
});
