const Model = require('../models/Messages');

async function getAllMessages(req, res) {
  const messages = await Model.getAllMessages();
  return res.status(200).render('chat', { messages });
}

module.exports = {
  getAllMessages,
};