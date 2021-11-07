const chatModel = require('../models/chatModel');

const createMessage = async (chatMessage, nickname, date) => { 
  await chatModel.createMessage(chatMessage, nickname, date);
};

const getAllMessages = async () => {
  const messagesDB = await chatModel.getAllMessages();
  return messagesDB;
};

module.exports = {
  createMessage,
  getAllMessages,
};