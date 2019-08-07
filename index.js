const express = require('express');
const db = require('./data/hubs-model.js');

const server = express();

// request handler

// GET /
server.get('/', (req, res) => {
  res.send('Hello World');
});

// Get /now
// send back a timestamp
server.get('/now', (req, res) => {
  const now = new Date().toLocaleTimeString();
  res.send(now);
});

// GET /hubs
server.get('/hubs', (req, res) => {
  db.find()
    .then(hubs => {
      res.json(hubs);
    })
    .catch(err => {
      res.status(500).json({ err: err });
    });
});

// Should be the last step
server.listen(4000, () => {
  console.log('Server is running on port 4000...');
});
