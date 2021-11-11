const { connection } = require('./connection');

const postChatMessage = async ({ message, nickname }) => connection()
  .then((db) => db.collection('messages').insertOne({ nickname, message, timestamp: new Date() }));

const getChatHistoric = async () => connection()
.then((db) => db.collection('messages').find({}));

module.exports = {
  postChatMessage,
  getChatHistoric,
};