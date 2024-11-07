const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

// SSL options with proper error handling
const getSSLOptions = () => {
    try {
        return {
            key: fs.readFileSync('/etc/ssl/private/key.pem'),
            cert: fs.readFileSync('/etc/ssl/certs/cert.pem'),
            ca: fs.readFileSync('/etc/ssl/certs/ca.pem'), // Include CA certificate
            rejectUnauthorized: process.env.NODE_ENV === 'production' // Only verify in production
        };
    } catch (error) {
        console.error('Error loading SSL certificates:', error);
        process.exit(1); // Exit if there's an error loading certificates
    }
};

// Setup server based on the environment
if (process.env.NODE_ENV === 'production') {
    const options = getSSLOptions();
    https.createServer(options, app).listen(3000, () => {
        console.log('Server running with HTTPS on port 3000');
    });
} else {
    // Development environment: Disable SSL verification
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    app.listen(3000, () => {
        console.log('Server running with HTTP on port 3000');
    });
}
