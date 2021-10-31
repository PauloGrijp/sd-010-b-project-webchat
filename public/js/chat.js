const socket = window.io();

let nickname = 'USER';
const testid = 'data-testid';

const formMessage = document.querySelector('#chatInput');
const formNickname = document.querySelector('#nicknameForm');
const inputMessage = document.querySelector('#messageInput');
const inputNickname = document.querySelector('#nicknameInput');
// const nicknamePage = document.querySelector('#nickname');

socket.on('start', (randomNickname) => {
  nickname += `${randomNickname}`;
  // nicknamePage.innerText = nickname;
  sessionStorage.setItem('nickname', nickname);
  socket.emit('newConnection', nickname);
});

formNickname.addEventListener('submit', (e) => {
  e.preventDefault();
  const oldNickname = nickname;
  nickname = inputNickname.value;
  sessionStorage.setItem('nickname', nickname);
  // nicknamePage.innerText = nickname;
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
  li.setAttribute(testid, 'message');
  messagesUl.appendChild(li);
};

const createUsersList = (users) => {
  const namesUl = document.querySelector('#names');
  namesUl.innerText = '';
  const liFisrt = document.createElement('li');
  liFisrt.innerText = nickname;
  liFisrt.setAttribute(testid, 'online-user');
  namesUl.appendChild(liFisrt);
  users.splice(users.indexOf(nickname), 1);

  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user;
    liFisrt.setAttribute(testid, 'online-user');
    namesUl.appendChild(li);
  });
};

socket.on('message', (message) => {
  createMessage(message);
});

socket.on('generateList', (users) => createUsersList(users));

window.onbeforeunload = () => {
  socket.emit('leftRoom', nickname);
  socket.disconnect();
};
