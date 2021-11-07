const connection = require('./connection');

const create = async (message) => {
  //  console.log(message);
    const date = new Date();
    const dado = { message: message.chatMessage, nickname: message.nickname, timestamp: date };
    const db = await connection();
    const messageCreated = await db.collection('messages').insertOne(dado);
    return messageCreated;
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