const { build } = require('vite');
const path = require('path');

async function buildApp() {
  try {
    await build({
      mode: 'development',
      configFile: path.resolve(__dirname, '../vite.config.ts'),
      root: path.resolve(__dirname, '../')
    });
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
}

buildApp();