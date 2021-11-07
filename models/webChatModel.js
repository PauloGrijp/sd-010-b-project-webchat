const connection = require('./connection');

const getMessage = async () => {
  const dbConnection = await connection();
  const result = await dbConnection.collection('messages').find().toArray();
  return result;
};

const postMessage = async ({ dateNow, nickname, chatMessage }) => {
  const dbConnection = await connection();
  const result = await dbConnection.collection('messages').insertOne({
     dateNow, nickname, chatMessage, 
    });
  return result;
};

module.exports = {
  getMessage,
  postMessage,
};