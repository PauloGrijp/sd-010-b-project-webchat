const connection = require('./connection');

const addMessage = async (message) => {
  const db = await connection();
  await db.collection('messages').insertOne(message);
};

const getAllMessages = async () => {
  const db = await connection();
  const result = db.collection('messages').find().toArray();
  return result;
};

module.exports = {
  addMessage,
  getAllMessages,
};