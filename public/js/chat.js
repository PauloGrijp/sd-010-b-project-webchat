const socket = window.io();

let nickname = 'USER';

const formMessage = document.querySelector('.chatInput');
const formNickname = document.querySelector('#nicknameForm');
const inputMessage = document.querySelector('#messageInput');
const inputNickname = document.querySelector('#nicknameInput');
const nicknamePage = document.querySelector('#nickname');

socket.on('start', (randomNickname) => {
  nickname += `${randomNickname}`;
  nicknamePage.innerText = nickname;
  sessionStorage.setItem('nickname', nickname);
  socket.emit('newConnection', nickname);
});

formNickname.addEventListener('submit', (e) => {
  e.preventDefault();
  const oldNickname = nickname;
  nickname = inputNickname.value;
  sessionStorage.setItem('nickname', nickname);
  nicknamePage.innerText = nickname;
  socket.emit('changeNickname', { oldNickname, nickname });
  inputNickname.value = '';
  return false;
});

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, nickname });
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

const createList = (users) => {
  const namesUl = document.querySelector('#names');
  namesUl.innerText = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user;
    namesUl.appendChild(li);
  });
};

socket.on('message', (message) => createMessage(message));
socket.on('nicknameChanged', (message) => createMessage(message));
socket.on('generateList', (users) => createList(users));
