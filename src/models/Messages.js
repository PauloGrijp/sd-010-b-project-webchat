const connection = require('./connection');

async function getAllMessages() {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
}

async function saveMessages(messages) {
  const db = await connection();
  await db.collection('messages').insertOne(messages);
}

module.exports = {
  getAllMessages,
  saveMessages,
};
