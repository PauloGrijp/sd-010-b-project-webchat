// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();

  return messages;
};

const saveMsg = async ({ message, nickname, timestamp }) => {
  const db = await connection();
  const newMessage = await db
    .collection('messages')
    .insertOne({ message, nickname, timestamp });

    return newMessage.ops[0];
};

module.exports = {
  getAll,
  saveMsg,
};