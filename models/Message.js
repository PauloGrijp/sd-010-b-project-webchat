// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () =>
  connection()
    .then((db) => db.collection('messages').find().toArray())
    .then((messages) => ({ messages }));

const create = async ({ message, nickname, timestamp }) =>
  connection()
    .then((db) =>
      db.collection('messages').insertOne({ message, nickname, timestamp }));
    // .then((result) =>
    //   result.ops.map(({ _id }) => ({ message, nickname, timestamp, _id })));

module.exports = {
  getAll,
  create,
};
