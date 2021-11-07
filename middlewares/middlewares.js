const getDate = (nickname, chatMessage) => {
  const date = new Date();
  const currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const currentHour = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const dados = `${currentDate} ${currentHour}  - ${nickname}: ${chatMessage}`;
  return dados;
};
module.exports = { getDate };