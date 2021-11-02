const connection = require('./connection');

const getAllMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find({}).toArray();
  return messages;
};

const addMessage = async (msg) => {
  const db = await connection();
  const addedMessages = await db.collection('messages').insertOne(msg);
  return addedMessages;
};

module.exports = {
  getAllMessages,
  addMessage,
};