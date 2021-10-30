const socket = window.io();
const btnSendMessage = document.getElementById('send-message');
const btnSaveNickname = document.getElementById('save-nickname');
const list = document.querySelector('.list-users');

socket.emit('user:connect');

const appendUser = ({ socketId, nickname }) => {
  const li = document.createElement('li');
  li.classList.add('user');
  li.setAttribute('data-testid', 'online-user');
  li.setAttribute('data-socketid', socketId);
  li.innerText = nickname;
  list.appendChild(li);
};

socket.on('user:connect', (serverPayload, onlineUsers) => {
  if (socket.id.includes(serverPayload.socketId)) {
    onlineUsers.forEach((serverData) => appendUser(serverData));
  } else {
    appendUser(serverPayload);
  }
});

btnSendMessage.addEventListener('click', () => {
  const messageBox = document.getElementById('message-box');
  // const chatMessage = messageBox.value;
  // socket.emit('message', { chatMessage, nickname });
  messageBox.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesContainer = document.querySelector('.messages');
  const messageBox = document.createElement('div');
  messageBox.classList.add('message');
  messageBox.innerText = message;
  messageBox.setAttribute('data-testid', 'message');
  messagesContainer.appendChild(messageBox);
};

socket.on('message', (message) => createMessage(message));

btnSaveNickname.addEventListener('click', () => {
  const nicknameInput = document.getElementById('nickname-box');
  document.querySelector(`li[data-socketid="${socket.id}"]`).innerText = nicknameInput.value;
  const payload = {
    socketId: socket.id,
    nickname: nicknameInput.value,
  };
  nicknameInput.value = '';
  socket.emit('user:update', payload);
  return false;
});

socket.on('user:update', ({ socketId, nickname }) => {
  document.querySelector(`li[data-socketid="${socketId}"]`).innerText = nickname;
});

socket.on('user:disconnect', ({ socketId }) => {
  document.querySelector(`li[data-socketid="${socketId}"]`).remove();
});

window.onbeforeunload = () => {
  socket.disconnect();
};
