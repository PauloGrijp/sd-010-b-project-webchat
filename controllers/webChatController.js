const webChatModel = require('../models/webChatModel');

const createMessage = async (msg) => {
  await webChatModel.createMessage(msg);
};

const getAllMessages = async () => webChatModel.getAllMessages();

module.exports = {
  createMessage,
  getAllMessages,
};