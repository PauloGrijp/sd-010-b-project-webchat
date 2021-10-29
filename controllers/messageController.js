const messageModel = require('../models/messageModel');

const listMessages = async (req, res) => {
  const messages = await messageModel.getAll();
  return res.render('board', { messages });
};

module.exports = {
  listMessages,
};