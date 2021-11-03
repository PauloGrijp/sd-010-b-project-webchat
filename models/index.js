const connection = require('./connection');

const saveMessages = async (message) => {
    console.log('saveMessages');
    await connection().then((db) => db.collection('messages').insertOne({ message }));
};

const getAllMessages = async () => connection().then((db) => db
.collection('messages').find({}).toArray());

module.exports = { saveMessages, getAllMessages };
