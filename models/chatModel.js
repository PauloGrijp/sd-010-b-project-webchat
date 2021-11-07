const connection = require('./connection');

const createMessage = async (message, nickname, timestamp) => {
  const db = await connection();
  db.collection('messages').insertOne({ message, nickname, timestamp });
};

const getAllMessages = async () => {
  const db = await connection();
  const messagens = await db.collection('messages').find().toArray();
  return messagens;
};

module.exports = {
  createMessage,
  getAllMessages,
};