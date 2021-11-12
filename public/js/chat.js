const socket = window.io();

const makeRandomNick = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() 
      * charactersLength));
  }
  return result;
};

let randomNickName = makeRandomNick(16);
let initialNickName = randomNickName;

window.onload = () => {
  socket.emit('nickname', initialNickName);
  sessionStorage.setItem('nickname', initialNickName);
};

// render nickname
socket.on('nickname', (users) => {
  let nicks = '';
  const listUsers = document.getElementById('users');

  const nicknameStorage = sessionStorage.getItem('nickname');

  // const indexUsers = users.findIndex((user) => user === nicknameStorage);  

  const newUsers = users.filter((user) => user !== nicknameStorage);

  newUsers.unshift(nicknameStorage);

  newUsers.forEach((user) => {       
    nicks += `<li data-testid="online-user">${user}</li>`;
  });
  listUsers.innerHTML = nicks;
});

socket.on('allMessages', (messages) => {
  const listMessage = document.getElementById('messages');
  console.log(messages);
  messages.forEach((msg) => {
    const item = document.createElement('li');
    const message = `${msg.timestamp} - ${msg.nickname}: ${msg.message}`;
    item.textContent = message;
    item.setAttribute('data-testid', 'message');
    listMessage.appendChild(item);
  });
});

// change nickname
const formNickname = document.getElementById('form-nickname');
const inputNickname = document.getElementById('input-nickname');

formNickname.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputNickname.value) {         
    console.log(inputNickname.value);
    socket.emit('changeNickname', {
      newNick: inputNickname.value,
      randomNickName,
    });
    initialNickName = inputNickname.value;
    randomNickName = inputNickname.value;
    sessionStorage.setItem('nickname', initialNickName);
    inputNickname.value = '';  
  }
});

// render and insert new message
const formEl = document.getElementById('form');
const inputMessage = document.getElementById('inputMessage');

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputMessage.value) {         
    socket.emit('message', {
      chatMessage: inputMessage.value,
      nickname: initialNickName,
    });
    inputMessage.value = '';   
  }
});

socket.on('message', (message) => {
  const listMessage = document.getElementById('messages');
  const item = document.createElement('li');
  item.textContent = message;
  item.setAttribute('data-testid', 'message');
  listMessage.appendChild(item);
});