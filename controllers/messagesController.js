const messagesModel = require('../models/messagesModel');

async function GetHistoricMessages(_req, res) {
  try {
    const historicMessages = await messagesModel.GetHistoricMessages();
    return res.status(200).render('chat', { historicMessages });
  } catch (error) {
    return res.status(500).json('message: 500 Internal Server');
  }
}

module.exports = {
  GetHistoricMessages,
};