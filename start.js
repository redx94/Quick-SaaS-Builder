const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  try {
    res.send('Hello World!');
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Internal Server Error');
  }
});

const server = app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

server.on('error', (err) => {
  console.error('Failed to start server:', err);
});
