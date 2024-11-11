const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// SSL configuration based on environment
const getSSLOptions = () => {
  if (process.env.NODE_ENV === 'production') {
    try {
      return {
        key: fs.readFileSync(process.env.SSL_KEY_PATH || '/etc/ssl/private/key.pem'),
        cert: fs.readFileSync(process.env.SSL_CERT_PATH || '/etc/ssl/certs/cert.pem'),
        ca: process.env.SSL_CA_PATH ? fs.readFileSync(process.env.SSL_CA_PATH) : undefined,
        rejectUnauthorized: true // Enforce certificate validation in production
      };
    } catch (error) {
      console.error('Error loading SSL certificates:', error);
      process.exit(1);
    }
  } else {
    // Development: Generate self-signed certificates on the fly
    const selfsigned = require('selfsigned');
    const attrs = [{ name: 'commonName', value: 'localhost' }];
    const pems = selfsigned.generate(attrs, { days: 365 });
    
    return {
      key: pems.private,
      cert: pems.cert,
      rejectUnauthorized: false // Allow self-signed certificates in development
    };
  }
};

// Setup server based on environment
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  const options = getSSLOptions();
  https.createServer(options, app).listen(PORT, () => {
    console.log(`Server running with HTTPS on port ${PORT}`);
  });
} else {
  // Development: Allow HTTP
  app.listen(PORT, () => {
    console.log(`Server running with HTTP on port ${PORT}`);
  });
}