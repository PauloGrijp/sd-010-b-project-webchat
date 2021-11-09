const model = require('../models/messageModel');

const createMessage = async (chatMessage, nickname, date) => {
  await model.createMessage(chatMessage, nickname, date);
};

const getAllMessages = async () => {
  const messagesDB = await model.getAllMessages();
  return messagesDB;
};

module.exports = {
  createMessage,
  getAllMessages,
};
