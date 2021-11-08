const socket = window.io();

const formMessage = document.querySelector('#message-form');
const inputMessage = document.querySelector('#message-input');
const formnickName = document.querySelector('#nickname-form');
const inputNickName = document.querySelector('#nickname-input');

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = document.querySelector('#users-list').firstElementChild.innerText;
  socket.emit('message', { chatMessage: inputMessage.value, nickname });
  inputMessage.value = '';
  return false;
});

const addMessage = (message) => {
  const messagesUl = document.querySelector('#messages-list');
  const li = document.createElement('li');
  li.innerText = message;
  li.dataset.testid = 'message';
  messagesUl.appendChild(li);
};

formnickName.addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('nicknameChange', inputNickName.value);
  inputNickName.value = '';
  return false;
});

socket.on('message', (message) => addMessage(message));