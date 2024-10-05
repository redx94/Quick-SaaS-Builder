// Description: This file is used to start the backend and frontend servers concurrently.
/**
 * @file start.js
 * @description This file is used to start the backend and frontend servers concurrently.
 * @author Reece Dixon
 * @copyright  2024 Reece Dixon
 */

const { spawn } = require('child_process');
const path = require('path');

// Start the backend server
const backend = spawn('python', [path.join(__dirname, 'backend', 'assistant_api.py')], {
  stdio: 'inherit',
});

// Start the frontend development server
const frontend = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
});

// Handle process termination
process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit();
});