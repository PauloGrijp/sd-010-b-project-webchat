const moment = require('moment');
const { save } = require('./models/webChat');

const create = (nickname, chat) => {
  const time = moment().format('DD-MM-YYYY HH:mm:ss A');
  save({ message: chat, nickname, time });
  const mensagem = `${time} - ${nickname}: ${chat}`;
  return mensagem;
};

module.exports = { create };