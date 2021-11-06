const connection = require('./connection');

const getAllMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};

const sendMessage = async ({ nickname, message, timestamp }) => {
  const db = await connection();
  await db.collection('messages').insertOne({ nickname, message, timestamp });
};

module.exports = { getAllMessages, sendMessage };