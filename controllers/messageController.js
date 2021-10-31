const Message = require('../models/Message');

const getAll = async (_req, res) => {
  // console.log('hello');
  const messages = await Message.getAll();

  res.status(200).render('chat', { messages });
};

const create = async ({ message, nickname }) => {
  // const { message } = req.body;
  // const nickname = sessionStorage.getItem('nickname');
  // console.log(message, nickname);
  await Message.create({ message, nickname });
  // res.redirect('/');
  // return res.status(201).json({ message: newMessage[0] });
};

module.exports = {
  getAll,
  create,
};
