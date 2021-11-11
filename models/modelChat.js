const connection = require('./connection');

const addMessage = async (chatMessage, nickname, timestamp) => {
  const db = await connection();
  await db.collection('messages').insertOne({ chatMessage, nickname, timestamp });
};

const getAllMessages = async () => {
  const db = await connection();
  const result = db.collection('messages').find().toArray();
  return result;
};

// const insertMessage = async (message, nickname, timestamp) => connection()
//   .then((db) => db.collection('messages').insertOne({ message, nickname, timestamp }));

module.exports = {
  addMessage,
  getAllMessages,
};