/*
 *   Copyright (c) 2024 
 *   All rights reserved.
 */
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Function to handle process errors
function handleProcessError(processName, error) {
  console.error(`${processName} encountered an error:`, error);
}

backendChatInterface.on('error', (error) => handleProcessError('Backend Chat Interface', error));


// Handle process termination
process.on('SIGINT', () => {
  backendChatInterface.kill();
  assistantAPI.kill();
  frontend.kill();
  process.exit();
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to handle process errors
function handleProcessError(processName, error) {
  console.error(`${processName} encountered an error:`, error);
}

// Start the backend chat interface
const backendChatInterface = spawn('python', [path.join(__dirname, 'src', 'backend', 'backend_chat_interface.py')], {
  stdio: 'inherit',
});
backendChatInterface.on('error', (error) => handleProcessError('Backend Chat Interface', error));

// Start the assistant API
const assistantAPI = spawn('python', [path.join(__dirname, 'src', 'backend', 'assistant_api.py')], {
  stdio: 'inherit',
});
assistantAPI.on('error', (error) => handleProcessError('Assistant API', error));

// Start the frontend development server
const frontend = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
});
frontend.on('error', (error) => handleProcessError('Frontend', error));

// Handle process termination
process.on('SIGINT', () => {
  backendChatInterface.kill();
  assistantAPI.kill();
  frontend.kill();
  process.exit();
});