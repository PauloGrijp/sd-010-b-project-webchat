const chatty = [];

const addChatty = (nickname, socket) => {
    chatty.push({
      nome: nickname,
      id: socket.id,
    });
  return chatty;
};

const editChatty = (nickname, socket) => {
  const indexAchado = chatty.findIndex((item) => item.id === socket.id);
  chatty[indexAchado].nome = nickname;
};
const getChatty = () => chatty;

const excludeChatty = (socket) => {
  const indexAchado = chatty.findIndex((item) => item.id === socket.id);
  chatty.splice(indexAchado, 1);
  console.log(chatty);
};

module.exports = { addChatty, getChatty, editChatty, excludeChatty };