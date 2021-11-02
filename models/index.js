const connection = require('./connection');

const sendMessage = async (msg) => {
  await connection().then((db) => db.collection('messages').insertOne({ msg }));
};

const getAllMessage = async () => connection().then((db) => db.collection('messages').find().toArray());

module.exports = {
  sendMessage,
  getAllMessage,
};