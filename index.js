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
      //   console.log('hubs', hubs);
      res.json(hubs);
    })
    .catch(err => {
      res.status(500).json({ err: err });
    });
});

server.post('/hubs', (req, res) => {
  const newHub = req.body;
  // console.log('new hub', newHub);
  // validate the hub
  db.add(newHub)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: 'failed to create a new hub'
      });
    });
});

// DESTROY!!!! /hubs/:id
server.delete('/hubs/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deletedHub => {
      deletedHub
        ? res.json(deletedHub)
        : res.status(404).json({ message: 'invalid hub id' });
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: 'failed to delete a hub'
      });
    });
});

server.put('/hubs/:id', (req, res) => {
  const { id } = req.params;
  const { changes } = req.body;

  db.update(id, changes)
    .then(updated => {
      updated
        ? res.json(updated)
        : res.status(404).json({ message: 'invalid hub id' });
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: 'failed to update hub'
      });
    });
});

server.get('hubs/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(hub => {
      hub
        ? res.json(hub)
        : res.status(418).json({ message: 'invalid as heck' });
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: 'failed to get id'
      });
    });
});

// Should be the last step
server.listen(4000, () => {
  console.log('Server is running on port 4000...');
});
