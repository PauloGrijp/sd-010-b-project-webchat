const getDate = (chatMessage, nickname) => {
  const date = new Date();
  const dataAtual = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const horaAtual = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const dados = `${dataAtual} ${horaAtual}  - ${nickname}: ${chatMessage}`;
  return dados;
};
module.exports = { getDate };