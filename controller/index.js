const { getAllMessage } = require('../models');

const webchatController = async (req, res) => {
 const messages = await getAllMessage();
  res.render('index', { messages });
};

module.exports = {
  webchatController,
};