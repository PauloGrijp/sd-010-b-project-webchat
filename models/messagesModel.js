const connection = require('./connection');

const createMessage = async (message, nickname, timestamp) => {
  const db = await connection();
  db.collection('messages').insertOne({ message, nickname, timestamp });
};

const getAll = async () => {
  const db = await connection();
    return db.collection('messages').find().toArray();
};

module.exports = { createMessage, getAll };