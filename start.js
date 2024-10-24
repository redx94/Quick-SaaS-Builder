const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();

const options = {
    key: fs.readFileSync('path/to/your-key.pem'),
    cert: fs.readFileSync('path/to/your-cert.pem')
};

// Setup server based on the environment
if (process.env.NODE_ENV === 'production') {
    // Use HTTPS in production
    https.createServer(options, app).listen(3000, () => {
        console.log('Server running with HTTPS on port 3000');
    });
} else {
    // Use HTTP for development to avoid SSL issues
    app.listen(3000, () => {
        console.log('Server running with HTTP on port 3000');
    });
}
