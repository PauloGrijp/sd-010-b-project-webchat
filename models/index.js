const connection = require('./connection');

const sendMessage = async (msg) => {
  await connection().then((db) => db.collection('messages').insertOne({ msg }));
};

const getAllMessage = async () => connection().then((db) => {
  const result = db.collection('messages').find().toArray();
  return result;
});

module.exports = {
  sendMessage,
  getAllMessage,
};