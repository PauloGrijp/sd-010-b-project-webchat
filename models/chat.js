// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();

  const messages = await db.collection('messages').find({}).toArray();

  return messages;
};

const addMsg = async (param) => {
  const db = await connection();

  await db.collection('messages').insertOne(param);
};

module.exports = {
  getAll,
  addMsg,
};