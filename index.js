// Simple wrapper to start n8n
const { spawn } = require('child_process');
console.log('Starting n8n...');

// Set environment variables
process.env.NODE_FUNCTION_ALLOW_EXTERNAL = 'puppeteer';

// Start n8n
const n8n = spawn('npx', ['n8n', 'start'], {
  env: process.env,
  stdio: 'inherit'
});

n8n.on('error', (error) => {
  console.error(`Error starting n8n: ${error.message}`);
});

n8n.on('close', (code) => {
  console.log(`n8n process exited with code ${code}`);
});

// Handle termination signals
process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down...');
  n8n.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down...');
  n8n.kill('SIGTERM');
});
