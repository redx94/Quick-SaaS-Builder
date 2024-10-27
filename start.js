const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

// SSL options
const options = {
    key: fs.readFileSync('/etc/ssl/private/key.pem'),
    cert: fs.readFileSync('/etc/ssl/certs/cert.pem'),
    rejectUnauthorized: false // Only for development
};

// Middleware to handle SSL certificate verification
app.use((req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }
    next();
});

// Setup server based on the environment
if (process.env.NODE_ENV === 'production') {
    https.createServer(options, app).listen(3000, () => {
        console.log('Server running with HTTPS on port 3000');
    });
} else {
    app.listen(3000, () => {
        console.log('Server running with HTTP on port 3000');
    });
}