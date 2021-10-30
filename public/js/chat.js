const socket = window.io();

const ulMessages = document.querySelector('#list-message');
const ulUsers = document.querySelector('#list-nickname');

const btnNickName = document.querySelector('#btn-nickname');
const btnMessage = document.querySelector('#btn-message');

let nickname;

const createMessage = (message) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  ulMessages.appendChild(li);
};

const createUser = (user) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.className = 'users';
  li.innerText = user;
  ulUsers.appendChild(li);
};

btnNickName.addEventListener('click', (e) => {
  e.preventDefault();
  const client = document.querySelector('#input-nickname');
  nickname = client.value;
  socket.emit('nickname', client.value);
  client.value = '';
  return false;
});

btnMessage.addEventListener('click', (e) => {
  e.preventDefault();
  const message = document.querySelector('#input-message');
  socket.emit('message', { chatMessage: message.value, nickname });
  message.value = '';
  return false;
});

socket.on('newConnection', ({ user, historic }) => {
  historic.forEach((e) => createMessage(e));
  nickname = user;
  socket.emit('nickname', user);
});

socket.on('message', (message) => {
  createMessage(message);
});

socket.on('users', (users) => {
  document.querySelectorAll('.users').forEach((e) => {
    ulUsers.removeChild(e);
  });

  createUser(nickname);
  users.forEach((user) => {
    if (user !== nickname) {
      createUser(user);
    }
  });
});
