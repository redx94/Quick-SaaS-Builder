import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import autoprefixer from 'autoprefixer';  // Updated import

// https://vitejs.dev/config/
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'lib': path.resolve(__dirname, 'lib'),
      'components': path.resolve(__dirname, './src/components')
    }
  },
  server: {
    host: '::',
    port: 3000,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    sourcemap: true,
    rollupOptions: {
      external: ['html-to-image'],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer,  // Updated import usage
        require('postcss-nested')
      ]
    }
  },
  optimizeDeps: {
    entries: ['src/main.js'],
    exclude: ['some-big-package'],
    include: ['react', 'react-dom']
  }
});
