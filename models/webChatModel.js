const { connection } = require('./connection');

const createMessage = async ({ dateNow: timeStamp, chatMessage: message, nickname }) => {
  const db = await connection();
  await db.collection('messages').insertOne({ timeStamp, message, nickname });
};

const getAllMessages = async () => {
  const db = await connection();
  const allMessages = await db.collection('messages').find().toArray();
  return allMessages;
};

module.exports = {
  createMessage,
  getAllMessages,
};