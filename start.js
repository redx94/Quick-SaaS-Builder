/**
 * @file start.js
 * @description This file is used to start the backend and frontend servers concurrently.
 * @author Reece Dixon
 * @copyright  2024 Reece Dixon
 */

const { spawn } = require('child_process');
const path = require('path');

// Start the backend chat interface
const backendChatInterface = spawn('python', [path.join(__dirname, 'src', 'backend', 'backend_chat_interface.py')], {
  stdio: 'inherit',
});

// Start the assistant API
const assistantAPI = spawn('python', [path.join(__dirname, 'src', 'backend', 'assistant_api.py')], {
  stdio: 'inherit',
});

// Start the frontend development server
const frontend = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
});

// Handle process termination
process.on('SIGINT', () => {
  backendChatInterface.kill();
  assistantAPI.kill();
  frontend.kill();
  process.exit();
});