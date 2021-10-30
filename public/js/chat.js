const socket = window.io();

const ulMessages = document.querySelector('#list-message');

const btnNickName = document.querySelector('#btn-nickname');
const btnMessage = document.querySelector('#btn-message');

let clientName;

const createMessage = (message) => {
  const li = document.createElement('li');
  li.setAttribute = 'data-testid="message"';
  li.innerText = message;
  ulMessages.appendChild(li);
};

const createUser = (user) => {
  const ulUsers = document.querySelector('#list-nickname');
  const li = document.createElement('li');
  li.setAttribute = 'data-testid="online-user"';
  li.className = 'users';
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

socket.on('newConnection', ({ user, historic }) => {
  historic.forEach((e) => createMessage(e));
  clientName = user;
  socket.emit('nickname', clientName);
});

socket.on('message', (message) => {
  createMessage(message);
});

socket.on('users', (users) => {
  document.querySelectorAll('.users').forEach((e) => {
    const ulUsers = document.querySelector('#list-nickname');
    ulUsers.removeChild(e);
  });

  users.forEach((user) => {
      createUser(user);
  });
});
