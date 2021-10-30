// const {  } = require('mongodb');
const connection = require('./connection');

const create = async ({ message, nickname }) => {
  const db = await connection();
  const timestamp = new Date();
  await db.collection('messages').insertOne({ message, nickname, timestamp });
  return { timestamp };
};

const getAll = async () => {
  try {
    const db = await connection();
    const messages = await db.collection('messages').find({}).toArray();
    return messages.map(({ message, nickname, timestamp }) => {
      const now = timestamp.toLocaleString().replace(/\//g, '-');
      return `${now} - ${nickname} ${message}`;
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  create,
  getAll,
};
