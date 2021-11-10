const socket = window.io();

const nickname = 'aaa'; // Comments: Alterar para função que gera randomicamente

socket.emit('joinChat', { nickname });

const form = document.querySelector('form');
const inputMessage = document.querySelector('#inputMessage');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, nickname });
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));

window.onbeforeunload = () => {
  socket.disconnect();
};
