const chatty = [];

const addChatty = (nickname, socket) => {
    chatty.push({
      nome: nickname,
      id: socket.id,
    });
  return chatty;
};

const editChatty = (nickname, socket) => {
  const index = chatty.findIndex((item) => item.id === socket.id);
  chatty[index].nome = nickname;
};
const getChatty = () => chatty;

const excludeChatty = (socket) => {
  const index = chatty.findIndex((item) => item.id === socket.id);
  chatty.splice(index, 1);
  console.log(chatty);
};

module.exports = { addChatty, getChatty, editChatty, excludeChatty };