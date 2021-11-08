
const moment = require('moment');


const create = (name, chat) => {
  const mensagem = `${moment().format('DD-MM-YYYY HH:mm:ss A')} - ${name}: ${chat}`;
  return mensagem;
};


module.exports = { create };