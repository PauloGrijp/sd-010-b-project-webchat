const getConnection = require('./connection');

const createMessage = async ({ dateNow: timeStamp, chatMessage: message, nickname }) => {
  const db = await getConnection();
  await db.collection('messages').insertOne({ timeStamp, message, nickname });
};

const getAllMessages = async () => {
  const db = await getConnection();
  const allMessages = await db.collection('messages').find().toArray();
  return allMessages;
};

module.exports = {
  createMessage,
  getAllMessages,
};
