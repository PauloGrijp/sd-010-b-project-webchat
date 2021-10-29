const socket = window.io();

const inputNickmame = document.querySelector('.nickname');
const sendNickname = document.querySelector('.send_nickname');
const inputMsg = document.querySelector('.messages__item');
const sendMsg = document.querySelector('.send_message');

const generateNewUser = Math.random()
  .toString(16)
  .substr(2, 8) + Math
  .random()
  .toString(16)
  .substr(2, 8);

window.onload = () => {
  const nickname = generateNewUser;
  sessionStorage.setItem('user', nickname);
  socket.emit('usersOnline', nickname);
};

socket.on('usersOnline', (usersOnline) => {
  const ulNicknames = document.querySelector('.nicknames');
  ulNicknames.innerText = '';

  usersOnline.forEach(([nickname, socketID]) => {
    const li = document.createElement('li');
    li.innerText = nickname;
    li.setAttribute('data-testid', 'online-user');
    
    if (socketID === socket.id) {
      ulNicknames.prepend(li);
    } else {
      ulNicknames.appendChild(li);
    }
  });
});

sendNickname.addEventListener('click', (e) => {
  e.preventDefault();

  const nickname = inputNickmame.value;
  sessionStorage.setItem('user', nickname);
  
  socket.emit('changeNickname', nickname);

  inputNickmame.value = '';

  return false;
});

sendMsg.addEventListener('click', (e) => {
  e.preventDefault();
  
  const nickname = sessionStorage.getItem('user');
  socket.emit('message', { nickname, chatMessage: inputMsg.value });

  inputMsg.value = '';

  return false;
});

socket.on('message', (msg) => {
  const ul = document.querySelector('.messages');
  const li = document.createElement('li');
  
  li.setAttribute('data-testid', 'message');
  li.innerText = msg;
  ul.appendChild(li);
});
