const socket = window.io();

const msgContainer = document.querySelector('#msgContainer');
const msgInput = document.querySelector('#msgInput');
const msgBtn = document.querySelector('#msgBtn');
const usersContainer = document.querySelector('#usersContainer');
const nickInput = document.querySelector('#nickInput');
const nickBtn = document.querySelector('#nickBtn');
const useR = document.querySelector('#user');
const DATA_TEST_ID = 'data-testid';

let myNickname = '';

const usersList = ({ users, removeUsers = false }) => {
  if (removeUsers) { myNickname = ''; }
  usersContainer.innerHTML = '';
  if (myNickname !== '') {
    const myUserLi = document.createElement('li');
    myUserLi.setAttribute(DATA_TEST_ID, 'online-user');
    myUserLi.innerText = myNickname;
    usersContainer.appendChild(myUserLi);
  }
  users.forEach((user) => {
    if (user.nickname !== myNickname) {
      const userLi = document.createElement('li');
      userLi.setAttribute(DATA_TEST_ID, 'online-user');
      userLi.innerText = user.nickname;
      usersContainer.appendChild(userLi);
    }
  });
};

const createMyNick = ({ nick }) => {
  const myNick = () => (document.querySelector('#myNick'));
  if (!myNick()) {
    myNickname = nick;
    const nickSpan = document.createElement('span');
    nickSpan.setAttribute('id', 'myNick');
    nickSpan.innerText = myNickname;
    useR.appendChild(nickSpan);
  }
};

const updateNick = ({ nick }) => {
  myNickname = nick;
  const myNick = () => (document.querySelector('#myNick'));
  if (!myNick()) createMyNick(nick);
  myNick().innerHTML = nick;
  nickInput.value = '';
};

nickBtn.addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('updateNick', { newNick: nickInput.value });
  updateNick({ nick: nickInput.value });
});

msgBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const chatMessage = msgInput.value;
  socket.emit('message', { chatMessage, nickname: myNickname });
  msgInput.value = '';
});

const addMessage = (msg) => {
  const msgLi = document.createElement('li');
  msgLi.setAttribute(DATA_TEST_ID, 'message');
  msgLi.innerText = msg;
  msgContainer.appendChild(msgLi);
};

const removeNick = ({ users }) => {
  myNickname = '';
  usersList({ users, removeUsers: true });
};

socket.on('connected', ({ nick, users }) => { createMyNick({ nick }); usersList({ users }); });
socket.on('updatedUsers', ({ users }) => usersList({ users }));
socket.on('message', addMessage);
socket.on('disconnectedUser', removeNick);
