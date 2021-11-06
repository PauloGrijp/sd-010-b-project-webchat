const socket = window.io();
const messageBtn = document.querySelector('#send-button');
const nicknameBtn = document.querySelector('#nickname-button');
let nickname = '';

function setUserNickname() {
  const nicknameInput = document.querySelector('#nicknameInput');
  nickname = nicknameInput.value;
  document.querySelector('#nicknameInput').value = '';
}

function createMessage(message) {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
}

function showOnlineUser(user) {
  const usersUl = document.querySelector('.users');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  
  li.innerText = user;
  usersUl.appendChild(li);
}

function sendMessage() {
  const { value } = document.querySelector('#messageInput');
  const chatMessage = value;
  socket.emit('message', { chatMessage, nickname });
  document.querySelector('#messageInput').value = '';
}

messageBtn.addEventListener('click', (e) => {
  e.preventDefault();
  sendMessage();
});

nicknameBtn.addEventListener('click', (e) => {
  e.preventDefault();
  setUserNickname();
  showOnlineUser();
});

socket.on('message', createMessage);

socket.on('login', (users) => {
  nickname = users[users.length - 1];
  users.forEach((user) => showOnlineUser(user));
});

window.onbeforeunload = (_event) => {
  socket.disconnect();
};