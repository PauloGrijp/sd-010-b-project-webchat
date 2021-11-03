const { convertMessageM, createMessageM } = require('../models/chatModel');

const convertMessageC = async (req, res) => {
  const messages = await convertMessageM();
  res.render('chat.ejs', { messages });
};
const createMessageC = async (message) => {
  try {
    await createMessageM(message);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  convertMessageC,
  createMessageC
};