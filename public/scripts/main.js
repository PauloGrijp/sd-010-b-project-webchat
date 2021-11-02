const socket = io();
let nickname = '';

const nicknameBox = document.getElementById('nickname-box');
const nicknameButton = document.getElementById('nickname-button');
const messageBox = document.getElementById('message-box');
const sendButton = document.getElementById('send-button');
const messagesContainer = document.getElementById('messages__container');
const usersContainer = document.getElementById('users__container');

socket.on('onlineUsers', (users) => {
  users.forEach(({ username }) => {
    const user = document.createElement('div');

    user.setAttribute('data-testid', 'online-user');
    user.classList.add('user');
    user.textContent = username;
    usersContainer.appendChild(user);
  });
});

const renderMessage = (text) => {
  const message = document.createElement('div');

  message.setAttribute('data-testid', 'message');
  message.innerHTML = text;
  messagesContainer.appendChild(message);
};

sendButton.addEventListener('click', () => {
  if (messageBox.value) {
    const message = {
      chatMessage: messageBox.value,
      nickname,
    };

    socket.emit('message', message);
    messageBox.value = '';
    messageBox.focus();
  }
});

messageBox.addEventListener('keypress', ({ keyCode }) => {
  if (keyCode === 13) {
    sendButton.click();
  }
});

socket.on('message', (message) => {
  renderMessage(message);
});

nicknameButton.addEventListener('click', () => {
  nickname = nicknameBox.value;
  socket.emit('changeUser', nickname);
});

const generateRandomNickname = () => (
  Math.random().toString(36).substring(2, 15)
  + Math.random().toString(36).substring(2, 15)
).substring(0, 16);

window.onload = () => {
  nickname = generateRandomNickname();

  socket.emit('newUser', nickname);
};