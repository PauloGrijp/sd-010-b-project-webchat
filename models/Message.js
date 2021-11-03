const connection = require('./connection');

const getAllMessages = async () => (
    connection().then((db) => db.collection('messages').find().toArray())
);

const createMessage = async (message) => (
    connection().then((db) => db.collection('messages').insertOne(message))
);

module.exports = {
    getAllMessages,
    createMessage,
};