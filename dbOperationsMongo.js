/* eslint-disable no-console */
// Import MongoDB module
// Import MongoDB module
const { MongoClient } = require('mongodb');
// Import ObjectID constructor
const { ObjectId } = require('mongodb');

require('dotenv').config();
// get db url
const pswd = process.env.MONGODB_PASSWORD;
const collectionName = process.env.MONGODB_COLLECTION;
const user = process.env.MONGODB_USER;
const url = `mongodb+srv://${user}:${pswd}@cluster0.eymee.mongodb.net/${collectionName}?retryWrites=true&w=majority`;

// Connect to our db on the cloud
async function connect() {
  try {
    const con = (await MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )).db();
    console.log(`Connected to database: ${con.databaseName}`);
    return con;
  } catch (err) {
    console.error(err.message);
    throw new Error(err.message);
  }
}

/* --------------------Users-----------------------*/
// get user by name
async function getUserByName(db, name) {
  console.log('getUser by name');
  try {
    const res = await db.collection('players').findOne({ name });
    console.log(`User: ${JSON.stringify(res)}`);
    return res;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err.message);
  }
}

// get user by id
async function getPlayerById(db, id) {
  console.log('in getPlayer by id');
  try {
    const res = await db.collection('players').findOne({ _id: ObjectId(id) });
    console.log(`Player: ${JSON.stringify(res.data)}`);
    return res.data;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err.message);
  }
}

async function createPlayer(db, newUser) {
  try {
    console.log('in createPlayer');
    const res = await db.collection('players').insertOne(newUser);
    console.log(`Created user with id: ${res.insertedId}`);
    return res;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err.message);
  }
}

// get all users
async function getPlayers(db) {
  try {
    console.log('in getPlayers');
    const results = await db.collection('players').find({}).toArray();
    return results;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err.message);
  }
}

// Update player's points
async function updatePlayer(db, id, name, points, maxpoints) {
  console.log('in updatePlayer');
  console.log(id);
  try {
    const player = await db.collection('players').updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name,
          points,
          maxpoints,
        },
      },
    );
    console.log(`Updated: ${JSON.stringify(player)}`);
    return player;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err.message);
  }
}

async function deletePlayer(db, id) {
  try {
    const res = await db.collection('players').deleteOne({ _id: ObjectId(id) });
    return res;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err.message);
  }
}
// get Leaders
async function getLeaders(db, n) {
  try {
    console.log('in getPlayers');
    const results = await db.collection('players').find({}).sort({ maxpoints: 'desc' }).limit(n)
      .toArray();
    return results;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err.message);
  }
}

// operations();
module.exports = {
  connect,
  createPlayer,
  getPlayers,
  getPlayerById,
  getUserByName,
  updatePlayer,
  deletePlayer,
  getLeaders,
};
