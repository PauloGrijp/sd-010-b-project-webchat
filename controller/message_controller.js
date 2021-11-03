const { getAllMessages } = require('../models/message_model');

const getMessages = async () => 
  /*  try {
    const messages = await getAllMessages();
    return res.status(200).json(messages);
   } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Deu tudo errado' });
   } */
    getAllMessages();

module.exports = {
    getMessages,
};