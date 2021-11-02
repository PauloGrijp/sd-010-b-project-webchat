const moment = require('moment');
const connection = require('./connection');

const savedMessages = async (body) => {
  const db = await connection();
  const { ops } = await db.collection('messages').insertOne({
     ...body, timestamp: moment().format('YYYY-MM-DD h:mm:ss a') });
  const { message, nickname, timestamp } = ops[0];
  return { message, nickname, timestamp };
};

const getAllMessages = async () => connection().then((db) => 
db.collection('messages').find({}).toArray());

module.exports = {
    savedMessages,
    getAllMessages,
};