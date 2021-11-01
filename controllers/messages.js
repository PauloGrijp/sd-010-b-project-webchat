const { getAllMessages } = require('../models/messageModels');

const getMessagesControllers = async (req, res) => {
  try {
    const answer = await getAllMessages();
    return res.status(200).json({ message: answer });
  } catch (error) {
    console.log(error, '<asdasdasdas--------------------');
    return res.status(500).json({ message: 'Algo de errado nao esta certo!' });
  }
};

module.exports = {
  getMessagesControllers,
};