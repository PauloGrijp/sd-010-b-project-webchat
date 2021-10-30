const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const getAll = async () => {
  const db = await connection();
  const messagesFromDb = await db.collection('messages').find().toArray();
  console.log('fromDB', messagesFromDb);
  return messagesFromDb;
};

module.exports = { getAll };