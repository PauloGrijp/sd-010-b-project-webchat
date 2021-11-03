const socket = window.io();
let nickname = Math.random().toString(16)
.substring(2, 8) + Math.random().toString(16).substring(2, 8);

  const msgHistory = document.getElementById('msgHistory');
  const inputMessage = document.getElementById('message');
  const sendBtn = document.getElementById('sendBtn');
  const user = document.getElementById('user');
  user.innerText = nickname;
  const datatestid = 'data-testid';
  const inputNickname = document.getElementById('nickname');
  const alterNickBtn = document.getElementById('alterNick');

sendBtn.addEventListener('click', (e) => {
e.preventDefault();
let chatMessage = inputMessage.value;
if (chatMessage) {
  socket.emit('message', { chatMessage, nickname });
  chatMessage = '';
}
});

socket.on('message', (msg) => {
  const msgItem = document.createElement('li');
  msgItem.setAttribute(datatestid, 'message');
  msgItem.innerText = msg;
  msgHistory.appendChild(msgItem);
});

socket.emit('user', { nickname });

socket.on('user', (userList) => {
  user.innerHTML = '';
  userList.forEach(({ nickname: nick, id }) => {
    const userItem = document.createElement('li');
    userItem.setAttribute(datatestid, 'online-user');
    userItem.innerText = nick;
    if (id === socket.id) { user.prepend(userItem); } else user.appendChild(userItem);
  });
});

socket.on('messageAll', (msgList) => {
  msgList.forEach(({ timestamp, message, nickname: nick }) => {
    const item = document.createElement('li');
    item.setAttribute(datatestid, 'message');
    item.innerText = `${timestamp} - ${nick} ${message}`;
    msgHistory.appendChild(item);
  });
});

alterNickBtn.addEventListener('click', (e) => {
  e.preventDefault();
  nickname = inputNickname.value;
  user.innerText = nickname;
  inputNickname.value = '';
  socket.emit('user', { nickname });
  });