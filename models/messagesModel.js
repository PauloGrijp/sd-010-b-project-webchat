const connection = require('./connection');

const create = async (message) => {
    const date = new Date();
    const dado = { message: message.chatMessage, nickname: message.nickname, timestamp: date };
    const db = await connection();
    const createdMessage = await db.collection('messages').insertOne(dado);
    return createdMessage;
};

const getAll = async () => {
    const db = await connection();
    const users = await db.collection('messages').find().toArray();
    return users;
};
module.exports = {
    getAll,
    create,
};