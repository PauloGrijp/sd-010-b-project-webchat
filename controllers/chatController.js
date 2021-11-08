const chatModel = require('../models/chatModel');

const appChat = async (req, res) => {
  const messages = await chatModel.getMessages();
  res.status(200).render('chat', { messages });
};

module.exports = {
  appChat,
};
