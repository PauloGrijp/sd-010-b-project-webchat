const webChatModel = require('../models/webChatModel');
const { STATUS_OK } = require('../models/msgStatusErrors');

const getAllMessages = async (_req, res) => {
  const messages = await webChatModel.getAllMessages();

  const renderMessages = messages.map(({ message, nickname, timestamp }) => (
    `${timestamp} - ${nickname} - ${message}`));
    res.status(STATUS_OK).render('webChat', { renderMessages });
};

module.exports = {
  getAllMessages,
};
