const connection = require('./connection');

const saveMessageModel = async ({ message, nickName, timestamp }) => {
  const db = await connection();
  const result = db.collection('messages').insertOne({ message, nickName, timestamp });
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