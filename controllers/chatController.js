const chatModel = require('../models/chatModel.js');

const createMessage = async (msg) => {
  await chatModel.createMessage(msg);
};

const getAllMessages = async () => chatModel.getAllMessages();

module.exports = {
  createMessage,
  getAllMessages,
};
