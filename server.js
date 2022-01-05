/* eslint-disable max-len */
/* eslint-disable no-console */
// Create express app
const express = require('express');
const cors = require('cors');
const path = require('path');

const lib = require('./dbOperationsMongo');

const webapp = express();

webapp.use(cors());
webapp.use(express.json());
webapp.use(
  express.urlencoded({
    extended: true,
  }),
);
let db;
webapp.use(express.static(path.join(__dirname, './client/build')))

// Start server
const port = process.env.PORT || 5000;

// Root endpoint
// TODO: Will need to alter this for deployment
// webapp.get('/', (_req, res) => {
//   res.json({ message: 'Welcome to HW4 Backend' });
// });

// TODO: define all endpoints as specified in REST API
webapp.post('/player/', async (req, res) => {
  try {
    console.log('Create a new player');
    if (!req.body.name) {
      console.log('req body missing params');
      res.status(404).json({ error: 'Missing user params' });
      return;
    }
    // see if user with the same username or email already exists in db
    const checkName = await lib.getUserByName(db, req.body.name);
    if (checkName) {
      console.log('username already exists!');
      res.status(409).json({ error: 'Username already exists!' });
      return;
    }
    const newPlayer = {
      name: req.body.name,
      points: req.body.points,
      maxpoints: req.body.maxpoints,
    };
    console.log('newPlayer is ', newPlayer);
    const result = await lib.createPlayer(db, newPlayer);
    res.status(201).json({ id: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.get('/Players/', async (_req, res) => {
  console.log('READ all players');
  try {
    const results = await lib.getPlayers(db);
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.get('/player/:id', async (req, res) => {
  console.log('READ a player by id');
  try {
    if (req.params.id === undefined) {
      res.status(404).json({ error: 'Player id is missing' });
      return;
    }
    const result = await lib.getPlayerById(db, req.params.id);
    if (result === undefined) {
      res.status(404).json({ error: 'bad user id' });
      return;
    }
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});
// Have to figure out how to request new information to update into the fuanction
webapp.put('/player/:id', async (req, res) => {
  console.log('Update player info with a id!');
  try {
    if (req.params.id === undefined) {
      res.status(404).json({ error: 'Player id missing!' });
      return;
    }
    const results = await lib.updatePlayer(db, req.params.id, req.body.name, req.body.points, req.body.maxpoints);
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.delete('/player/:id', async (req, res) => {
  if (req.params.id === undefined) {
    res.status(404).json({ error: 'id is missing' });
    return;
  }
  console.log('DELETE a player');
  console.log(req.params.id);
  try {
    const result = await lib.deletePlayer(db, req.params.id);
    console.log(`result-->${JSON.stringify(result)}`);
    if (Number(result) === 0) {
      res.status(404).json({ error: 'player not in the system' });
      return;
    }
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.get('/leaders/:n', async (req, res) => {
  console.log(`GET top ${req.params.n} leaders`);
  try {
    if (req.params.n === undefined) {
      res.status(404).json({ error: 'n is missing' });
      return;
    }
    const result = await lib.getLeaders(db, parseInt(req.params.n, 10));
    if (result === undefined) {
      res.status(404).json({ error: 'No players exist' });
      return;
    }
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Default response for any other request
webapp.use((_req, res) => {
  res.status(404);
});

webapp.listen(port, async () => {
  db = await lib.connect();
  console.log(`Server running on port:${port}`);
});
webapp.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});
