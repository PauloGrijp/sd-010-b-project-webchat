const messageModel = require('../models/Message');

const getMessages = async () => {
    const messages = await messageModel.getAllMessages();
    return messages;
};

const insertMessage = async (message, nickname, timeStamp) => {
    const dbMessageObject = { message, nickname, timeStamp };
    const insertedMessage = await messageModel.createMessage(dbMessageObject);
    return insertedMessage;
};

module.exports = {
    getMessages,
    insertMessage,
};