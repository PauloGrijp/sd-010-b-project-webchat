const chatModel = require('../models/chatModel');

const inialPage = async (req, res) => {
  const messages = await chatModel.findAll() || [];

  res.status(200).render('chat', { messages });
};

module.exports = {
  inialPage,
};