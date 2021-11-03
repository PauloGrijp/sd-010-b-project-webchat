const connection = require('./connection');

const convertMessageM = async () => {
  const dbConnect = await connection();
  const messageToArray = await dbConnect.collection('messages').find().toArray();
  const messageMap = messageToArray.map((message) =>
  `${message.timestamp} - ${message.nickname}: ${message.message}`);
  return messageMap;
};
const createMessageM = async (data) => {
  const dbConnect = await connection();
  const { chatMessage, nickname, finalDate } = data;
  const createMessage = { message: chatMessage, nickname, timestamp: finalDate };
  return dbConnect.collection('messages').insertOne(createMessage);
};

module.exports = {
  convertMessageM,
  createMessageM,
};