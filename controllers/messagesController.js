const messagesModel = require('../models/messagesModel');

const createMessage = async (message, nickname, timestamp) => {
  await messagesModel.createMessage(message, nickname, timestamp);
};

const getAll = async () => messagesModel.getAll();

module.exports = { createMessage, getAll };