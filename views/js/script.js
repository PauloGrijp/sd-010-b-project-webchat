const socket = window.io();

let nickname = Math.random().toString(16).substr(2, 8) + Math.random().toString(16).substr(2, 8);

socket.emit('userConnected', nickname);

const btnSendMessage = document.getElementById('send-message');
const inputValue = document.getElementById('input-message');
btnSendMessage.addEventListener('click', (event) => {
  event.preventDefault();
  const chatMessage = inputValue.value;
  console.log(chatMessage);
  socket.emit('message', { nickname, chatMessage });
  inputValue.value = '';
});

const btnChangeNick = document.getElementById('add-new-nick');
const inputNick = document.getElementById('input-nick');
btnChangeNick.addEventListener('click', (event) => {
  event.preventDefault();
  const oldnick = nickname;
  nickname = inputNick.value;
  inputNick.value = '';
  socket.emit('nickUpdate', { nickname, oldnick });
});

const onlineUser = document.querySelector('#ul-online-user');
socket.on('updateList', (array) => {
  onlineUser.innerHTML = '';
  array.forEach((user) => {
    const liUser = document.createElement('li');
    liUser.setAttribute('data-testid', 'online-user');
    liUser.innerText = user.nickname;
      if (socket.id === user.id) {
        onlineUser.prepend(liUser);
      } else {
        onlineUser.appendChild(liUser);
      }
  });
});

const insertMessage = (string) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = string;
  document.getElementById('ul-msg').appendChild(li);
};

socket.on('message', (string) => {
  insertMessage(string);
});

window.onload = async () => {
  const requisition = await fetch('http://localhost:3000/messages');
  const reqJson = await requisition.json();
  reqJson.forEach(({ message, nickname: nick, timestamp }) => {
    const string = `${timestamp} - ${nick} ${message}`;
      insertMessage(string);
    });
};