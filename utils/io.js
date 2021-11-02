const webController = require('../controllers/webControler');
const { dataCerta, horaCerta } = require('./util');

const sendMessage = ({ chatMessage, nickname }) => {
  webController.saveMessages({ message: chatMessage, nickname });
  return `${dataCerta()} ${horaCerta()} - ${nickname}: ${chatMessage}`;
};

module.exports = {
  sendMessage,
};