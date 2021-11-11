const socket = window.io();

// Source: Ajuda do Anderson Pedrosa - T10 - TB
let nickname = Math.random().toString(16).substr(2, 8) + Math.random().toString(16).substr(2, 8);

// Source: https://developer.mozilla.org/pt-BR/docs/Web/API/Window/sessionStorage
sessionStorage.setItem('nickname', nickname);

socket.emit('joinChat', { nickname });

const inputNicknameForm = document.querySelector('#inputNicknameForm');
const inputMessageForm = document.querySelector('#inputMessageForm');
const inputMessage = document.querySelector('#inputMessage');
const inputNickname = document.querySelector('#inputNickname');
const nicknameLabel = document.querySelector('#nicknameLabel');

nicknameLabel.innerText = nickname;

inputNicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  nicknameLabel.innerText = inputNickname.value;
  sessionStorage.setItem('nickname', inputNickname.value);
  inputNickname.value = '';
  return false;
});

inputMessageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Source: https://developer.mozilla.org/pt-BR/docs/Web/API/Window/sessionStorage
  nickname = sessionStorage.getItem('nickname');
  socket.emit('message', { chatMessage: inputMessage.value, nickname });
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));

window.onbeforeunload = () => {
  socket.disconnect();
};
