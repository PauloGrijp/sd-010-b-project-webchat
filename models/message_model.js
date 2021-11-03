const connection = require('./connection');
const horaCerta = require('../helpers/horaCerta');

const getAllMessages = async () => {
    const db = await connection();
    const messages = await db.collection('messages').find().toArray();
    console.log('Estou aqui getAll');
    return messages;
};

const saveNewMessage = async (chatMessage, nickname) => {
    const db = await connection();
    const message = await db.collection('messages')
    .insertOne({
        chatMessage,
        nickname,
        timestamp: horaCerta(),
    });
    console.log('Estou aqui Save messages', message);
    return message;
};

module.exports = {
    getAllMessages,
    saveNewMessage,
};