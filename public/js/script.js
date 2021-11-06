const socket = window.io();
const messageBtn = document.querySelector('#send-button');
const nicknameBtn = document.querySelector('#nickname-button');
const usersUl = document.querySelector('.users');
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
  socket.emit('setUserNickname', nickname);
  // showOnlineUser();
});

socket.on('message', createMessage);

socket.on('login', (users) => {
  usersUl.innerHTML = '';
  
  showOnlineUser(nickname);
  users.forEach((user) => {
    if (user !== nickname) showOnlineUser(user);
  });
});

socket.on('currentUser', (user) => { nickname = user; });

window.onbeforeunload = (_event) => {
  socket.disconnect();
};