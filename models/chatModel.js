const connection = require('./connection');

const saveMessageModel = async ({ chatMessage, nickname, timestamp }) => {
  const db = await connection();
  const result = db.collection('messages').insertOne({ chatMessage, nickname, timestamp });
  return result;
};

const getAllMessages = async () => {
  const db = await connection();
  const result = await db.collection('messages').find().toArray();
  return result;
};

module.exports = {
  saveMessageModel,
  getAllMessages,
};