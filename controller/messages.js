const modelMessages = require('../models/messages');
// const { io } = require('../server');

const getAll = async (req, res) => {
  try { 
  await modelMessages.getAllModel();
  // return res.status(200).json({ data: messages });
  return res.render('messagesList');
  } catch (err) {
    console.log(err.message);
  }
};

// const createMessage = async (req, res) => {
//   const { message, nickname, timestamp } = req.body;
//   try {
//     const messages = await modelMessages.createMessageModel(message, nickname, timestamp);
//     console.log(messages);
//     console.log('entrei');
//     return res.status(201).json({ message: 'mensagem criada, com sucesso' });
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// const updateMessage = async (req, res) => {
//   const { nickname, oldNick } = req.body;
//   try {
//     const messages = await modelMessages.updateMessage(nickname, oldNick);
//     console.log(messages);
//     const allMessages = await modelMessages.getAllModel();
//   return res.render('messagesList', { data: allMessages });

//     // return res.status(201).json({ message: 'mensagem criada, com sucesso' });
//   } catch (err) {
//     console.log(err.message);
//   }
// };
const getAllUsers = async (req, res) => {
  try {
    const users = await modelMessages.getAllUsers();
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { getAll, getAllUsers,
  // , createMessage, updateMessage 
};