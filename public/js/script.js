const socket = window.io();
let nick = '';

const formConversations = document.querySelector('#form-convesation');
const inputMessage = document.querySelector('#inputMessage');
const formNickName = document.querySelector('#nickname');
const inputNickName = document.querySelector('#input-nickname');

formNickName.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('passei');
  nick = inputNickName.value;
  socket.emit('send-nickname', inputNickName.value);
  inputNickName.value = '';

  return false;
});

formConversations.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('message', { chatMessage: inputMessage.value, nickname: nick });
  inputMessage.value = '';

  return false;
});

const createMessage = (message) => {
  const containerMessage = document.querySelector('#container-menssage');
  const spanMessage = document.createElement('span');

  spanMessage.innerText = message;
  containerMessage.appendChild(spanMessage);
};

socket.on('welcome', (message) => createMessage(message));
socket.on('message', (message) => createMessage(message));
