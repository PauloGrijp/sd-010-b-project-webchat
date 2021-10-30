const message = require('../models/Message');

const getAll = async (_req, res) => {
  const messages = await message.getAll();

  res.status(200).render('chat', { messages });
};

const create = async (req, res) => {
  const newMessage = await message.create(req.body);

  return res.status(201).json({ message: newMessage[0] });
};

module.exports = {
  getAll,
  create,
};
