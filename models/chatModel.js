const connection = require('./connection');

const createMessage = async (message, nickname, timestamp) => {
  const db = await connection();
  db.collection('messages').insertOne({ message, nickname, timestamp });
  return `${timestamp} - ${nickname}: ${message}`;
};

const getAllMessages = async () => {
  const db = await connection();
  const allMessages = await db.collection('messages').find().toArray();
  if (allMessages.length < 1) return '';
  return allMessages.map((msg) => `${msg.timestamp} - ${msg.nickname}: ${msg.message}`);
};

module.exports = {
  createMessage,
  getAllMessages,
};