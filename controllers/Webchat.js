const Webchat = require('../models/Webchat');

const create = async (data) => {
  await Webchat.create(data);
};

const getAll = async (_req, res) => {
  const messages = await Webchat.getAll();

  res.status(200).render('webchat.ejs', { messages });
};

module.exports = {
  create,
  getAll,
};
