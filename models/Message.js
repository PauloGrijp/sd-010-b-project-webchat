// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () =>
  connection()
    .then((db) => db.collection('messages').find().toArray())
    .then((messages) => messages);

const create = async ({ message, nickname }) =>
  connection().then((db) =>
    db.collection('messages').insertOne({
      message,
      nickname,
      timestamp: new Date()
      .toISOString()
      .split('T')
      .join(' ')
      .split('.')[0],
    }));
// .then((result) =>
//   result.ops.map(({ _id }) => ({ message, nickname, timestamp, _id })));

module.exports = {
  getAll,
  create,
};
