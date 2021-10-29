const connection = require('./connection');

async function CreateMessages(entry) {
  const db = await connection();

  const message = await db.collection('messages').insertOne(entry);

  return message.ops[0];
}

module.exports = {
  CreateMessages,
};