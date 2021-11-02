const userMessagesModel = require('../models/userMessages');

const savedUsersMessages = async (body) => {
  const dataMessages = await userMessagesModel.savedMessages(body);

  return dataMessages;
};

const getAllMessages = async () => userMessagesModel.getAllMessages();

module.exports = {
    savedUsersMessages,
    getAllMessages,
};