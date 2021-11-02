const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const getAll = async () => {
  const db = await connection();
  const messagesFromDb = await db.collection('messages').find().toArray();
  return messagesFromDb;
};

const addingMessage = async (message, nickname, timestamp) => {
  const db = await connection();
  await db.collection('messages')
    .insertOne({
      nickname,
      message,
      timestamp,
    });
};

module.exports = {
  getAll,
  addingMessage,
};