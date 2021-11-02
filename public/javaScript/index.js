const socket = window.io();

const sendBtn = document.querySelector('.send');
const nicknameBtn = document.querySelector('.btn_nickname');
const clientName = document.querySelector('.name');

let nickname;

const createLi = () => {
  const li = document.createElement('li');
  li.className = 'semStyle';
  return li;
};

socket.on('userName', (userName) => {
  clientName.innerHTML = userName;
  nickname = userName;
});

nicknameBtn.addEventListener('click', () => {
  const inputNewNickname = document.querySelector('.nickname');
  clientName.innerHTML = inputNewNickname.value;
  nickname = inputNewNickname.value;
  inputNewNickname.value = '';
  socket.emit('alterName', nickname);
});

const saveMessages = (body) => {
  const url = 'http://localhost:3000';
  const request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-type', 'application/json');
  request.send(JSON.stringify(body));
  request.onload = function ok() {
    console.log(this.responseText);
  };
};

sendBtn.addEventListener('click', () => {
  const inputMessage = document.querySelector('.msgtxt');
  const message = { message: inputMessage.value, nickname };
  saveMessages(message);
  socket.emit('message', { chatMessage: inputMessage.value, nickname });
  inputMessage.value = '';
});

socket.on('message', (message) => {
  const boxMessage = document.querySelector('.chat');
  const li = createLi();
  li.setAttribute('data-testid', 'message');
  li.innerHTML = message;
  sessionStorage.setItem('message', message);
  console.log(message);
  boxMessage.appendChild(li);
});

socket.on('usersOn', (users) => {
  const boxUsers = document.querySelector('.users');
  boxUsers.innerHTML = '';
  users.splice(users.indexOf(nickname), 1);
  users.unshift(nickname);
  console.log(users);
  users.forEach((user) => {
      const li = createLi();
      li.setAttribute('data-testid', 'online-user');
      li.innerHTML = user;
      boxUsers.appendChild(li);
  });
});
