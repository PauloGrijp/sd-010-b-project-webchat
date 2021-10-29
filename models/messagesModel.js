const connection = require('./connection');

async function CreateMessages(entry) {
  const db = await connection();

  const message = await db.collection('messages').insertOne(entry);

  return message.ops[0];
}

async function GetHistoricMessages() {
  const db = await connection();

  const messageHistory = await db.collection('messages').find().toArray();

  return messageHistory;
}

module.exports = {
  CreateMessages,
  GetHistoricMessages,
};