const connection = require('./connection');

const getAllMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find({}).toArray();

  return messages;
};

const createMessage = async ({ message, nickname, timestamp }) => {
  const db = await connection();
  await db.collection('messages').insertOne({ message, nickname, timestamp });
};

module.exports = {
  getAllMessages,
  createMessage,
};