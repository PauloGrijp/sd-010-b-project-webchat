const socket = window.io();

const ulMessages = document.querySelector('#list-message');
const ulUsers = document.querySelector('#list-nickname');

const btnNickName = document.querySelector('#btn-nickname');
const btnMessage = document.querySelector('#btn-message');

const createMessage = (message) => {
  const li = document.createElement('li');
  li.classList = 'data-testid="message"';
  li.innerText = message;
  ulMessages.appendChild(li);
};

const createUser = (user) => {
  const li = document.createElement('li');
  li.classList = 'data-testid="message"';
  li.innerText = user;
  ulUsers.appendChild(li);
};

btnNickName.addEventListener('click', (e) => {
  e.preventDefault();
  const nickname = document.querySelector('#input-nickname');
  socket.emit('nickname', nickname.value);
  nickname.value = '';
  return false;
});

btnMessage.addEventListener('click', (e) => {
  e.preventDefault();
  const message = document.querySelector('#input-message');
  socket.emit('message', message.value);
  message.value = '';
  return false;
});

socket.on('newUser', ({ user }) => {
  console.log(user);
  createUser(user);
});

socket.on('historicMessage', (messages) => messages.forEach((e) => createMessage(e)));

socket.on('message', (message) => {
  createMessage(message);
});
