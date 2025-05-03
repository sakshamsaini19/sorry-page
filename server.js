const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Handle reply form submission
app.post('/message', (req, res) => {
  const message = req.body.herMessage || '[No message]';
  const timestamp = new Date().toLocaleString();
  fs.appendFileSync('messages.txt', `\n[${timestamp}] ${message}`);
  res.send(`
    <h2>Thanks for replying 💌</h2>
    <p>Your message was received.</p>
    <a href="/">Back to page</a>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
