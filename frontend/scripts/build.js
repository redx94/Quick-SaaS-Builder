import { build } from 'vite';

async function buildApp() {
  try {
    await build({
      mode: 'development',
      configFile: '../vite.config.ts'
    });
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
}

buildApp();